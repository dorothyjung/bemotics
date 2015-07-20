// Load the Visualization API and the piechart package.
google.load('visualization', '1.0', {'packages':['corechart']});

// Set a callback to run when the Google Visualization API is loaded.
google.setOnLoadCallback(drawChart);

// Callback that creates and populates a data table,
// instantiates the pie chart, passes in the data and
// draws it.
function drawChart() {

  // Create the data table.
  var data = google.visualization.arrayToDataTable(
    [['seconds', 'Engagement', 'Frustration', 'Meditation', 'Excitement'], ['1.000', '0.641123', '0', '0.316708', '0.00186492'], ['2.000', '0.641123', '0', '0.316708', '0.00186492'], ['3.000', '0.641123', '0', '0.316708', '0.00186492'], ['4.000', '0.720896', '0', '0.301749', '0.00577296'], ['5.000', '0.720896', '0', '0.301749', '0.00577296'], ['6.000', '0.720896', '0', '0.301749', '0.00577296'], ['7.000', '0.720896', '0', '0.301749', '0.00577296'], ['8.000', '0.720896', '0', '0.301749', '0.00577296'], ['9.000', '0.747991', '0', '0.296636', '0.0114218'], ['10.000', '0.747991', '0', '0.296636', '0.0114218'], ['11.000', '0.747991', '0', '0.296636', '0.0114218'], ['12.000', '0.747991', '0', '0.296636', '0.0114218'], ['13.000', '0.75829', '0', '0.299419', '0.0180803'], ['14.000', '0.75829', '0', '0.299419', '0.0180803'], ['15.000', '0.767428', '0', '0.302485', '0.0411644'], ['16.000', '0.767428', '0', '0.302485', '0.0411644'], ['17.000', '0.767428', '0', '0.302485', '0.0411644'], ['18.000', '0.768346', '0', '0.305284', '0.0733166']]
  );

  // Set chart options
  var options = {'title':'Brainwave Readings'};

  var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
  chart.draw(data, options);

}

