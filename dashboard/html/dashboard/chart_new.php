<?php
session_start();
$session_val = $_SESSION["login_state"];
if($session_val == 'false'){
  $url_path = $_SERVER['REQUEST_URI']; 
  $ar_url_path = explode('/',$url_path);
  $redirect_path = '';
  if(count($ar_url_path) > 3){
    $redirect_path = "/$ar_url_path[1]/index.html";
  }
  else{
    $redirect_path = "/index.html";
  }
  header('Location:'.$redirect_path);
  die;
}
// include_once("..\..\/headerfiles.php");
?>

<!DOCTYPE html>
<html lang="en">

<head>
  <!-- Required meta tags -->
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <title>G-Analysis</title>
  <!-- plugins:css -->
  <link rel="stylesheet" href="..\..\/vendors/ti-icons/css/themify-icons.css">
  <link rel="stylesheet" href="..\..\/vendors/base/vendor.bundle.base.css">
  <!-- endinject -->
  <!-- plugin css for this page -->
  <!-- End plugin css for this page -->
  <!-- inject:css -->
  <link rel="stylesheet" href="..\..\/css/style.css">
  <link rel="stylesheet" href="..\..\/css/custom.css">
  <!-- endinject -->
  <link rel="shortcut icon" href="..\..\/images/G-Analysis/favicon.png" />

  <link  rel="stylesheet" href="..\..\/css/jquery.multiselect.css" />
  <!-- 7-9-2021-- -->
  <link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
  <!-- --end -->
  <style type="text/css">
    .text-muted {
         /* color: #0a0a0a !important; */
      }
      body{
         font-family: Calibri,Arial, Helvetica, sans-serif !important;
      }

      #chart_div_new{
          height: 90%;
          width: 90%;
          margin: 5px 5% 0px 5%;
          text-align: center;
      }

  </style>
</head>
<body>


<div class="container-fluid">
    <h3 class="text-muted text-center" id='upper_label'>Chart</h3>
    <div id="chart_div_new">
    </div>

    <div id="table_div_new">
        <table id="table_html" class="table table-striped table-bordered table-hover">
        </table>
    </div>

</div>

<!-- plugins:js -->
<script src="..\..\/vendors/base/vendor.bundle.base.js"></script>
<script type="..\..\/text/javascript" src="html2canvas-master/dist/html2canvas.js"></script>
<script src="..\..\/vendors/chart.js/Chart.min.js"></script>
<script src="..\..\/js/off-canvas.js"></script>
<script src="..\..\/js/hoverable-collapse.js"></script>
<script src="..\..\/js/template.js"></script>
<script src="..\..\/js/todolist.js"></script>
<script src="..\..\/js/chart.js"></script>
<script src="..\..\/js/dashboard.js"></script>
<script src="..\..\/js/jquery.multiselect.js"></script>
<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>

<script>
$(document).ready( function(){
    var chart_tile_click_data = localStorage.getItem('chart_tile_click_data');
    if(chart_tile_click_data != null && chart_tile_click_data != undefined)
    {
        chart_tile_click_data = JSON.parse(chart_tile_click_data);
        var tile_click_type = chart_tile_click_data['tile_click_type'];
        
        if(tile_click_type == 'chart')
        {
            $('#table_div_new').hide();
            $('#upper_label').text('Chart')
            getClickDashboardChart();
        }
        else if(tile_click_type == 'table'){
            $('#chart_div_new').hide();
            $('#upper_label').text('Table')
            getClickDashboardTable();
        }
        localStorage.removeItem('chart_tile_click_data');

    }

    // function getClickDashboardChart(count_days,count_val,chart_type){
    function getClickDashboardChart(){
        
        var count_days = chart_tile_click_data['count_days'];
        var count_val = chart_tile_click_data['count_val'];
        var chart_type = chart_tile_click_data['chart_type'];
        
        if(chart_type == "line_chart"){
            var html_canvas_chart = "<canvas id='lineChartNew'></canvas>";
            $('#chart_div_new').html('');
            $('#chart_div_new').html(html_canvas_chart);
            var data = {
            labels: count_days,
            datasets: [{
                label: 'Consumption',
                data: count_val,
                backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1,
                fill: false
            }]
            };

            var options = {
            scales: {
                yAxes: [{
                ticks: {
                    beginAtZero: true
                }
                }]
            },
            legend: {
                display: false
            },
            elements: {
                point: {
                radius: 0
                }
            }
        
            };

            if ($("#lineChartNew").length) {
            var lineChartCanvas = $("#lineChartNew").get(0).getContext("2d");
            var lineChart = new Chart(lineChartCanvas, {
                type: 'line',
                data: data,
                options: options
            });
            }
          
        }
        else if (chart_type == "area_chart"){
            var html_canvas_chart = "<canvas id='areaChartNew'></canvas>";
            $('#chart_div_new').html('');
            $('#chart_div_new').html(html_canvas_chart);
            var areaData = {
                // <--X Axis Value---
                // labels: ["2013", "2014", "2015", "2016", "2017","2019","2021","2023"],
                labels: count_days,
                datasets: [{
                label: 'Consumption',
                // <--Y Axix Value--
                // data: [12, 19, 3, 5, 2, 3,25,105],
                // data : [], 
                data: count_val,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1,
                fill: true, // 3: no fill
                }]
            };

            var areaOptions = {
                plugins: {
                filler: {
                    propagate: true
                }
                }
            }

            if ($('#areaChartNew').length) {
                var areaChartCanvas = $("#areaChartNew").get(0).getContext("2d");
                var areaChart = new Chart(areaChartCanvas, {
                type: 'line',
                data: areaData,
                options: areaOptions
                });
            }
            
        }
        else if(chart_type == "pie_chart"){
            var html_canvas_chart = "<canvas id='pieChartNew'></canvas>";
            $('#chart_div_new').html('');
            $('#chart_div_new').html(html_canvas_chart);
            var doughnutPieData = {
            datasets: [{
                //data: [1, 2, 3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50],
                data : count_val,
                backgroundColor: [
                // 1
                'rgba(255, 99, 132, 0.5)',
                'rgba(54, 162, 235, 0.5)',
                'rgba(255, 206, 86, 0.5)',
                'rgba(75, 192, 192, 0.5)',
                'rgba(153, 102, 255, 0.5)',
                'rgba(255, 159, 64, 0.5)',

                // 2
                'rgba(255, 99, 132, 0.5)',
                'rgba(54, 162, 235, 0.5)',
                'rgba(255, 206, 86, 0.5)',
                'rgba(75, 192, 192, 0.5)',
                'rgba(153, 102, 255, 0.5)',
                'rgba(255, 159, 64, 0.5)',

                // 3
                'rgba(255, 99, 132, 0.5)',
                'rgba(54, 162, 235, 0.5)',
                'rgba(255, 206, 86, 0.5)',
                'rgba(75, 192, 192, 0.5)',
                'rgba(153, 102, 255, 0.5)',
                'rgba(255, 159, 64, 0.5)',

                // 4
                'rgba(255, 99, 132, 0.5)',
                'rgba(54, 162, 235, 0.5)',
                'rgba(255, 206, 86, 0.5)',
                'rgba(75, 192, 192, 0.5)',
                'rgba(153, 102, 255, 0.5)',
                'rgba(255, 159, 64, 0.5)',

                // 5
                'rgba(255, 99, 132, 0.5)',
                'rgba(54, 162, 235, 0.5)',
                'rgba(255, 206, 86, 0.5)',
                'rgba(75, 192, 192, 0.5)',
                'rgba(153, 102, 255, 0.5)',
                'rgba(255, 159, 64, 0.5)',

                // 6
                'rgba(255, 99, 132, 0.5)',
                'rgba(54, 162, 235, 0.5)',
                'rgba(255, 206, 86, 0.5)',
                'rgba(75, 192, 192, 0.5)',
                'rgba(153, 102, 255, 0.5)',
                'rgba(255, 159, 64, 0.5)',

                // 7
                'rgba(255, 99, 132, 0.5)',
                'rgba(54, 162, 235, 0.5)',
                'rgba(255, 206, 86, 0.5)',
                'rgba(75, 192, 192, 0.5)',
                'rgba(153, 102, 255, 0.5)',
                'rgba(255, 159, 64, 0.5)',

                // 8
                'rgba(255, 99, 132, 0.5)',
                'rgba(54, 162, 235, 0.5)',
                'rgba(255, 206, 86, 0.5)',
                'rgba(75, 192, 192, 0.5)',
                'rgba(153, 102, 255, 0.5)',
                'rgba(255, 159, 64, 0.5)',

                'rgba(255, 99, 132, 0.5)',
                'rgba(54, 162, 235, 0.5)',
                // 'rgba(255, 206, 86, 0.5)',
                // 'rgba(75, 192, 192, 0.5)',
                // 'rgba(153, 102, 255, 0.5)',
                // 'rgba(255, 159, 64, 0.5)'

            
                ],
                borderColor: [
                // 1
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',

                // 2
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',

                // 3
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',

                //4
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',

                // 5
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',

                // 6
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',

                // 7
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',

                // 8
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',

                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                ],
            }],
        
            // These labels appear in the legend and in the tooltips when hovering different arcs
            labels : count_days
            
            
            };
            var doughnutPieOptions = {
            responsive: true,
            animation: {
                animateScale: true,
                animateRotate: true
            }
            };
            
            if ($("#pieChartNew").length) {
            var pieChartCanvas = $("#pieChartNew").get(0).getContext("2d");
            var pieChart = new Chart(pieChartCanvas, {
                type: 'pie',
                data: doughnutPieData,
                options: doughnutPieOptions
            });
            }
        }
        else if(chart_type == "bar_chart"){
            var html_canvas_chart = "<canvas id='barChartNew'></canvas>";
            $('#chart_div_new').html('');
            $('#chart_div_new').html(html_canvas_chart);

            var data = {
            labels: count_days,
            datasets: [{
                label: 'Consumption',
                // data: [10, 19, 3, 5, 2, 3],
                data : count_val,
                backgroundColor: [
                // 1
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',

                // 2
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',

                // 3
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',

                // 4
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',

                // 5
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',

                // 6
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',

                // 7
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',

                // 8
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',

                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                ],
                borderColor: [
                // 1
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',

                // 2
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                
                // 3
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',

                // 4
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',

                // 5
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',

                // 6
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                
                // 7
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',

                // 8
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',

                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                ],
                borderWidth: 1,
                fill: false
            }]
            };

            var options = {
            scales: {
                yAxes: [{
                ticks: {
                    beginAtZero: true
                }
                }]
            },
            legend: {
                display: false
            },
            elements: {
                point: {
                radius: 0
                }
            }
        
            };


            if($("#barChartNew").length) {
            var barChartCanvas = $("#barChartNew").get(0).getContext("2d");
            // This will get the first returned node in the jQuery collection.
            var barChart = new Chart(barChartCanvas, {
                type: 'bar',
                data: data,
                options: options
            });
            }
        }
        

    }


    function getClickDashboardTable(){
        var table_html = chart_tile_click_data['table_html'];
        $('#table_html').html(table_html);
    }

});
</script>

</body>

</html>


