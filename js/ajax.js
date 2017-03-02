function initialize(){
  jsAjax();
  jqueryAjax()
};

function jsAjax(){
  //create a request object
  var ajaxRequest = new XMLHttpRequest();
  console.log(ajaxRequest);

  //create an event handler for the request
  ajaxRequest.onreadystatechange = function(){
    if (ajaxRequest.readyState == 4) {
      //call the callback
      jsCallback(ajaxRequest.response);
    }
  };

  //open the ajax request
  ajaxRequest.open('GET', 'data/asian_census_data.geojson', true);

  //set the response type of the data
  ajaxRequest.responseType = "json";

  //send the request to the server
  ajaxRequest.send();

};

function jsCallback(data){
  //add response to page as plain text
  var htmlString = "<h3>JavaScript AJAX response test:</h3>";
  htmlString += JSON.stringify(data);
  //make paragraph to hold data
  var p = document.createElement("p");
  p.innerHTML = htmlString;
  document.getElementByID("mydiv").appendChild(p);
};

//ajax demo using jquery
function jqueryAjax(){
  // $.ajax("data/MegaCities.geojson", {
  //   'dataType':  "json",
  //   'success':  jQueryCallback
  // });

  $.getJSON("data/asian_census_data.geojson", jQueryCallback);
};

function jQueryCallback(data){
  console.log(data);
  var htmlString = "<h3>jQuery AJAX response text:</h3>";
  htmlString += JSON.stringify(data);
  $("#mydiv").append("<p>"+htmlString+"</p>");
};

window.onload = initialize();
