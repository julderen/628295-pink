"use strict";

var gulp = require("gulp");
var less = require("gulp-less");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var postcssInputStyle = require("postcss-input-style");
var server = require("browser-sync").create();
var csso = require("gulp-csso");
var imagemin = require("gulp-imagemin");
var webp = require("gulp-webp");
var svgstore = require("gulp-svgstore");
var posthtml = require("gulp-posthtml");
var include = require("posthtml-include");
var del = require("del");
var rename = require("gulp-rename");
var htmlmin = require("gulp-htmlmin");
var uglify = require("gulp-uglify");

//Вспомогательные
gulp.task("copy", function () {
  return gulp.src([
    "source/fonts/**/*.{woff,woff2}",
    "source/img/**"
  ], {
    base: "source"
  })
    .pipe(gulp.dest("build"));
});

gulp.task("refresh", function (done) {
  server.reload();
  done();
});

gulp.task("clean", function () {
  return del("build");
});

//Одноразовая оптимизация графики
gulp.task("create_webp", function () {
  return gulp.src("source/img/**/*.{png,jpg}")
    .pipe(webp({quality: 80}))
    .pipe(gulp.dest("source/img"));
});

gulp.task("optimize_images", function () {
  return gulp.src("source/img/**/*.{png,jpg,svg}")
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true}),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest("source/img"));
});


//Общие
gulp.task("build_js", function () {
  return gulp.src("source/js/*.js")
    .pipe(uglify())
    .pipe(gulp.dest("build/js"));
});

gulp.task("build_html", function () {
  return gulp.src("source/*.html")
    .pipe(posthtml([
      include()
    ]))
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("build"));
});

gulp.task("create_svg_sprite", function () {
  return gulp.src("source/img/*.svg")
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img"));
});

gulp.task("build_css", function () {
  return gulp.src("source/less/style.less")
    .pipe(plumber())
    .pipe(less())
    .pipe(postcss([
      postcssInputStyle(),
      autoprefixer()
    ]))
    .pipe(csso())
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

gulp.task("server", function () {
  server.init({
    server: "build/",
    notify: false,
    open: false,
    cors: true,
    ui: false
  });

  gulp.watch("source/less/**/*.less", gulp.series("build_css"));
  gulp.watch("source/img/*.svg", gulp.series("create_svg_sprite", "build_html", "refresh"));
  gulp.watch("source/js/*.js", gulp.series("build_js", "refresh"));
  gulp.watch("source/*.html", gulp.series("build_html", "refresh"));
});

gulp.task("build", gulp.series(
  "clean",
  "copy",
  "build_js",
  "build_css",
  "create_svg_sprite",
  "build_html"
));

gulp.task("start", gulp.series("build", "server"));
