import {Map, View} from 'ol';
import { toLonLat } from 'ol/proj.js';
import TileLayer from 'ol/layer/Tile.js';
import OSM from 'ol/source/OSM.js';

const map = new Map({
  target: 'map',
  layers: [
    new TileLayer({
      source: new OSM()
    })
  ],
  view: new View({
    center: [0, 0],
    zoom: 2
  })
});
function simpleReverseGeocoding(lon, lat) {
  fetch('http://nominatim.openstreetmap.org/reverse?format=json&lon=' + lon + '&lat=' + lat).then(function(response) {
    return response.json();
  }).then(function(json) {
    document.getElementById('address').innerHTML = json.display_name;
  })
}
map.on('click', function(e) {
  var coordinate = toLonLat(e.coordinate).map(function(val) {
    return val.toFixed(6);
  });
  var lon = coordinate[0];
  var lat = coordinate[1];
  simpleReverseGeocoding(lon, lat);
});