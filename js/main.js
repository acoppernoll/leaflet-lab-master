//austin coppernoll
//function to instantiate the Leaflet map
function createMap(){
    //create the map
    var map = L.map('mapid', {
        center: [20, 0],
        zoom: 2
    });

    //add OSM base tilelayer
    L.tileLayer('https://api.mapbox.com/styles/v1/acoppernoll/ciyvqpn82000x2rmu3r62nybs/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYWNvcHBlcm5vbGwiLCJhIjoiY2l5dnFjOTllMDAzOTMybjNsbm9uMDNlZyJ9.tJxgWuFbZYbvi8XIMvKALA', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    }).addTo(map);

    //call getData function
    getData(map);
};

//function to retrieve the data and place it on the map
// function getData(map){
//     //load the data
//     $.ajax("data/MegaCities.geojson", {
//     dataType: "json",
//     success: function(response){
//         //create marker options
//         var geojsonMarkerOptions = {
//             radius: 8,
//             fillColor: "#ff7800",
//             color: "#000",
//             weight: 1,
//             opacity: 1,
//             fillOpacity: 0.8,
//         };

//         //create a Leaflet GeoJSON layer and add it to the map
//         L.geoJson(response, {
//             pointToLayer: function (feature, latlng){
//                 return L.circleMarker(latlng, geojsonMarkerOptions);
//             }
//         }).addTo(map);
//     }
// });
//
// }

// function onEachFeature(feature, layer) {
//     //no property named popupContent; instead, create html string with all properties
//     var popupContent = "";
//     if (feature.properties) {
//         //loop to add feature property names and values to html string
//         for (var property in feature.properties){
//             popupContent += "<p>" + property + ": " + feature.properties[property] + "</p>";
//         }
//         layer.bindPopup(popupContent);
//     };
// };

//function to retrieve the data and place it on the map
function getData(map){
    //load the data
    $.ajax("data/asian_census_data.geojson", {
        dataType: "json",
        success: function(response){

            //create a Leaflet GeoJSON layer and add it to the map
            L.geoJson(response, {
                onEachFeature: onEachFeature
            }).addTo(map);
        }
    });
};

function calcPropRadius(attValue) {
    //scale factor to adjust symbol size evenly
    var scaleFactor = 50;
    //area based on attribute value and scale factor
    var area = attValue * scaleFactor;
    //radius calculated based on area
    var radius = Math.sqrt(area/Math.PI);

    return radius;
};

function createPropSymbols(data, map){
    //create marker options
    var geojsonMarkerOptions = {
        radius: 8,
        fillColor: "#ff7800",
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8


    };
    var attribute = "2015";
    //create a Leaflet GeoJSON layer and add it to the map
    L.geoJson(data, {
        pointToLayer: function (feature, latlng) {
          var attValue = Number(feature.properties[attribute]);

          //examine the attribute value to check that it is correct
          geojsonMarkerOptions.radius = calcPropRadius(attValue);
          console.log(feature.properties, attValue);

          //create circle markers
          return L.circleMarker(latlng, geojsonMarkerOptions);
        }
    }).addTo(map);
};

//Step 2: Import GeoJSON data
function getData(map){
    //load the data
    $.ajax("data/asian_census_data.geojson", {
        dataType: "json",
        success: function(response){
            //call function to create proportional symbols
            createPropSymbols(response, map);
        }
    });
};

$(document).ready(createMap);
