ymaps.ready(init);

function init() {
  var myMap = new ymaps.Map("map", {
    center: [59.938631, 30.323055],
    zoom: 16,
    controls: []
  });

  var myGeoObject = new ymaps.GeoObject({
    geometry: {
      type: "Point",
      coordinates: [59.938631, 30.323055]
    }
  });

  myMap.geoObjects.add(myGeoObject);
}
