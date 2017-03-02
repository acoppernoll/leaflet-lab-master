//austin coppernoll
//function to instantiate the Leaflet map
function createMap(){
    //create the map
    var map = L.map('mapid', {
        center: [35, -80],
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
    var scaleFactor = .0009;
    //area based on attribute value and scale factor
    var area = attValue * scaleFactor;
    //radius calculated based on area
    var radius = Math.sqrt(area/Math.PI);

    return radius;
};

function pointToLayer(feature, latlng, attributes){

    //create marker options
    var attribute = attributes[0];
    //check

    var options = {
        radius: 8,
        fillColor: "#ff7800",
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8

    };

    var attValue = Number(feature.properties[attribute]);

    options.radius = calcPropRadius(attValue);

    var layer = L.circleMarker(latlng, options);

    //var popupContent = "<p><b>City:</b> " + feature.properties.City + "</p><p><b>" + attribute + ":</b> " + feature.properties[attribute] + "</p>";
    var popupContent = "<p><b>City:</b> " + feature.properties.Name + "</p>";

    //add formatted attribute to popup content string
    var year = attribute.split("_")[1];
    popupContent += "<p><b>Asian Population in " + attribute + ":</b> " + feature.properties[attribute] + " Individuals</p>";

    layer.bindPopup(popupContent, {
        offset: new L.Point(0,-options.radius)
    });


    return layer;
};

function createPropSymbols(data, map, attributes){

    L.geoJson(data, {
      pointToLayer: function(feature, latlng){
            return pointToLayer(feature, latlng, attributes);
      }
    }).addTo(map);
    //create a Leaflet GeoJSON layer and add it to the map
    //L.geoJson(data, {
        //pointToLayer: function (feature, latlng) {


          //examine the attribute value to check that it is correct

          //console.log(feature.properties[attribute], attValue);

          //create circle markers
          //return L.circleMarker(latlng, geojsonMarkerOptions);


};

function updatePropSymbols(map, attribute){

  map.eachLayer(function(layer){
       if (layer.feature && layer.feature.properties[attribute]){
         var props = layer.feature.properties;

            //update each feature's radius based on new attribute values
            var radius = calcPropRadius(props[attribute]);
            layer.setRadius(radius);

            //add city to popup content string
            var popupContent = "<p><b>City:</b> " + props.Name + "</p>";

            //add formatted attribute to panel content string
            if (props[attribute] == 0){
              var radius = calcPropRadius(0);
            };
            var year = attribute.split("_")[1];
            popupContent += "<p><b>Asian Population in " + attribute + ":</b> " + props[attribute] + " Individuals</p>";


            //replace the layer popup
            layer.bindPopup(popupContent, {
                offset: new L.Point(0,-radius)
            });

           //update the layer style and popup
       };
   });
};

function createSequenceControls(map, attributes){
    //create range input element (slider)
    $('#panel').append('<input class="range-slider" type="range">');

    //set slider attributes
    $('.range-slider').attr({
        max: 6,
        min: 0,
        value: 0,
        step: 1
    });

    $('.range-slider').on('input', function(){
        var index = $(this).val();
        $('.range-slider').val(index);
        updatePropSymbols(map, attributes[index]);
    });
};

function processData(data){
    //empty array to hold attributes
    var attributes = [];

    //properties of the first feature in the dataset
    var properties = data.features[0].properties;

    //push each attribute name into attributes array
    for (var attribute in properties){
        //only take attributes with population values
        if (attribute.indexOf("20") > -1){
            attributes.push(attribute);
        };
    };

    //check result

    return attributes;
};

//Step 2: Import GeoJSON data
function getData(map){
    //load the data
    $.ajax("data/asian_census_data.geojson", {
        dataType: "json",
        success: function(response){

            //create an attributes array
            var attributes = processData(response);

            //call function to create proportional symbols
            createPropSymbols(response, map, attributes);
            createSequenceControls(map, attributes);
        }
    });
};

$(document).ready(createMap);
