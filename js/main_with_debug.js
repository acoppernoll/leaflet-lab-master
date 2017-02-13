//initialize function called when the script loads
function initialize(){
	cities();
};

//function to create a table with cities and their populations
function cities(){
	//define two arrays for cities and population
	var cityPop = [
		{
			city: 'San Francisco',
			population: 864816
		},
		{
			city: 'New York City',
			population: 8550405
		},
		{
			city: 'Houston',
			population: 2099451
		},
		{
			city: 'Monona',
			population: 7533
		}
	];

	//append the table element to the div
	$("#mydiv").append("<table>");

	//append a header row to the table
	$("table").append("<tr>");

	//add the "City" and "Population" columns to the header row
	$("tr").append("<th>City</th><th>Population</th>");

	//loop to add a new row for each city
    for (var i = 0; i < cityPop.length; i++){
        //assign longer html strings to a variable
        var rowHtml = "<tr><td>" + cityPop[i].city + "</td><td>" + cityPop[i].population + "</td></tr>";
        //add the row's html string to the table
        $("table").append(rowHtml);
    };
		//Call addcolumn, addevents, and newly added debug functions instantiated below
    addColumns(cityPop);
    addEvents();
		debugAjax();
};
//function to create city size column with unique population-based labels
function addColumns(cityPop){
		//loop through each row of spreadsheet (i)
    $('tr').each(function(i){
			//if first row then...
    	if (i == 0){
				//append text string "city size" as header element to current element
    		$(this).append('<th>City Size</th>');
			//else if not first row...
			} else {
				//create variable citySize; don't set value
    		var citySize;
				//if population value is less than 100,000, classify/label city as small
    		if (cityPop[i-1].population < 100000){
    			citySize = 'Small';
					//else if population value is less than 500,000 but greater than 100,000 label city as medium
    		} else if (cityPop[i-1].population < 500000){
    			citySize = 'Medium';
					//in any other case (greater than 500,000 population) label as large
    		} else {
    			citySize = 'Large';
    		};
				//finally, append value of citySize variable as determined above as a cell within current element
    		$(this).append('<td>' + citySize + '</td>');
    	};
    });
};
//creates mouseover event function to randomly change color upon mouseover
//also creates click event function to bring up a popup window indicating a click to user
function addEvents(){
	//grabs the only table element on the page and adds a mouseover event function
	$('table').mouseover(function(){
		//creates color variable and starts value with string "rgb("
		var color = "rgb(";
		//for every "i" or value set i=0, ensure i doesn't exceed 3 values and add 1 to i
		for (var i=0; i<3; i++){
			//creates random variable using math.round function to round rgb value to nearest integer...
			//then return a random floating-point number between 0 (inclusive) and 1 (exclusive) multiplied by 255
			var random = Math.round(Math.random() * 255);
			//appends the value of variable random determined above to color variable
			color += random;
			//in the case that i is less than 2 (first and second value with offsets of 0 and 1), insert a comma
			if (i<2){
				color += ",";
			//otherwise in every other case (when i<2/third rgb value) add a closing parenthese
			} else {
				color += ")";
		};
		//uses css method for property color (all text) using values determined by color variable above
		$(this).css('color', color);
	};
});
	//creates a click event function within addEvents function
	function clickme(){
		//alerts user of click with a text popup window
		alert('Hey, you clicked me!');
	};
	//
	$('table').on('click', clickme);
};

//call the initialize function when the document has loaded
$(document).ready(initialize);

function debugCallback(response){

	$('#mydiv').append('GeoJSON data: ' + JSON.stringify(response));
};

function debugAjax(){


	$.ajax("data/MegaCities.geojson", {
		dataType: "json",
		success: debugCallback
	});

	$('#mydiv').append('<br>GeoJSON data:</br>' + JSON.stringify(response));

};

$('#mydiv').append('GeoJSON data: ' + JSON.stringify(response));
