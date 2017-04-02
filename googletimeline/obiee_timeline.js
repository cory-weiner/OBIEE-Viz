$(window).resize(function(){
  draw();
});
        
function draw_timeline() {
  google.charts.load('current', {'packages':['timeline']});
  google.charts.setOnLoadCallback(draw);
}

function draw(){
  console.log('draw timeline called');
  var container = document.getElementById(window.target);
  var chart = new google.visualization.Timeline(container);
  var dataTable = new google.visualization.DataTable();
  dataTable.addColumn({ type: 'string', id: 'Dim1' });
  if (window.data[0].length > 3){
    dataTable.addColumn({ type: 'string', id: 'Dim2' });
  }
  dataTable.addColumn({ type: 'date', id: 'Start' });
  dataTable.addColumn({ type: 'date', id: 'End' });
  dataTable.addRows(window.data);
  chart.draw(dataTable);
}
