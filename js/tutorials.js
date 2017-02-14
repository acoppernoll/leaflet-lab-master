// creates mymap variable as an instiantiated map object passed the 'mapid' div element
// numbers in brackets are geographical center of map object (lat, lng) with initial map zoom value following comma
var mymap = L.map('mapid').setView([51.505, -0.09], 13);
//creates tile layer object and adds to mymap passed mapbox style url with proper access token to unlock access_token w/ 18 as max zoom value
L.tileLayer('https://api.mapbox.com/styles/v1/acoppernoll/ciyvqpn82000x2rmu3r62nybs/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYWNvcHBlcm5vbGwiLCJhIjoiY2l5dnFjOTllMDAzOTMybjNsbm9uMDNlZyJ9.tJxgWuFbZYbvi8XIMvKALA', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
}).addTo(mymap);
//creates marker object and adds to mymap at geographic center of map
var marker = L.marker([51.5, -0.09]).addTo(mymap);
//creates circle object at specified lat, lng coords with several optional style properies including a radious of 500 and adds to mymap
var circle = L.circle([51.508, -0.11], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 500
}).addTo(mymap);
//creates a polygon to add to the map with an array of points; a triangle in this case given 3 points
var polygon = L.polygon([
    [51.509, -0.08],
    [51.503, -0.06],
    [51.51, -0.047]
]).addTo(mymap);
//binds a popup element to marker object with HTML content populated within
marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
//does same for circle and polygon objects
circle.bindPopup("I am a circle.");
polygon.bindPopup("I am a polygon.");
//creates popup variable as individual popup object automatically generated at specified .setLatLng() coord values i.e. map center populated by HTML content
var popup = L.popup()
    .setLatLng([51.5, -0.09])
    .setContent("I am a standalone popup.")
    .openOn(mymap);

var popup = L.popup();
//creates mapclick event object at lat,lng coords where mouse clicks
//function/event creates popup that shows HTML string + lat,lng of map click location on map
function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(mymap);
}
//creates map click object
mymap.on('click', onMapClick);
//
var someFeatures = [{
    "type": "Feature",
    "properties": {
        "name": "Coors Field",
        "show_on_map": true
    },
    "geometry": {
        "type": "Point",
        "coordinates": [-104.99404, 39.75621]
    }
}, {
    "type": "Feature",
    "properties": {
        "name": "Busch Field",
        "show_on_map": false
    },
    "geometry": {
        "type": "Point",
        "coordinates": [-104.98404, 39.74621]
    }
}];
//creates geojson layer passed geojson-formatted object with an exclusive filter applied
L.geoJSON(someFeatures, {
    filter: function(feature, layer) {
        return feature.properties.show_on_map;
    }
}).addTo(map);
