//Count Dashboard Boxes 
function countDashboard(){
    $.ajax({
        type: "POST",
        url: "php/retreive.php",
        async: false,
        dataType: 'json',
        data: {
            action: "getCountDashBoard",
            nameDB: $("#nameDashboardDB").val(),
        },
        fail: function() {
            alert("failed!!")
        },
        success: function(a) {
            (a['energy'] != null) ? $('#energy_count').text(a['energy']) : '';
            (a['mesurement'] != null) ? $('#mesurement_count').text(a['mesurement']) : '';
            (a['product'] != null) ? $('#product_count').text(a['product']) : '';
            (a['energy_consumed'][0] != null) ? $('#energy_consumed_count').text(a['energy_consumed'][0]['']) : '';
            $('#energy_not_consumed_table').html('');
            $('#energy_not_consumed_table').html(a['energy_not_consumed']);
           
        }
    });
}

//Selected Number of Records Mesurement
function getNumberRecordsMesurement(){
    var number_records = $('#measurement_number_record').val();
    var time_interval = $('#measurement_time_interval').val();
    var records_order_by_val = $('#measurement_records_order_by').val();
    if(number_records == ''){
      var tr = "<tr><td colspan='5' class='text-center text-muted'>Please Select No. of Records</td></tr>";
      $('#mesurement_select_table_entries').html(tr);
      $('#pagination_html').html('');
    }
    else{
      $.ajax({
          type: "POST",
          url: "php/retreive.php",
          async: false,
          dataType: 'json',
          data: {
              action: "getNumberRecordsMesurement",
              nameDB: $("#nameDashboardDB").val(),
              number_records : number_records,
              time_interval : time_interval,
              measurement_order_by_val : records_order_by_val
          },
          fail: function() {
              alert("failed!!")
          },
          success: function(a) {
            $('#mesurement_select_table_entries').html(a['measurement_html']);
            $('#pagination_html').html(a['pagination_html']);
          }
      });
    }
}

//Get Number Records Mesurement Pagination
function getNumberRecordsMesurementPagination(page_val){
    var number_records = $('#measurement_number_record').val();
    var time_interval = $('#measurement_time_interval').val();
    var records_order_by_val = $('#measurement_records_order_by').val();
    if(number_records == ''){
      var tr = "<tr><td colspan='5' class='text-center text-muted'>Please Select No. of Records</td></tr>";
      $('#mesurement_select_table_entries').html(tr);
    }
    else{
      $.ajax({
          type: "POST",
          url: "php/retreive.php",
          async: false,
          dataType: 'json',
          data: {
              action: "getNumberRecordsMesurement",
              nameDB: $("#nameDashboardDB").val(),
              number_records : number_records,
              time_interval : time_interval,
              measurement_order_by_val : records_order_by_val,
              page_val : page_val
          },
          fail: function() {
              alert("failed!!")
          },
          success: function(a) {
            $('#mesurement_select_table_entries').html(a['measurement_html']);
            $('#pagination_html').html(a['pagination_html']);
          }
      });
    }

}

//Selected Number of Records Energy
function getNumberRecordsEnergy(){
    var number_records = $('#energy_number_record').val();
    $.ajax({
        type: "POST",
        url: "php/retreive.php",
        async: false,
        dataType: 'json',
        data: {
            action: "getNumberRecordsEnergy",
            nameDB: $("#nameDashboardDB").val(),
            number_records : number_records
        },
        fail: function() {
            alert("failed!!")
        },
        success: function(a) {
           $('#energy_select_table_entries').html(a['energy_html']);
        }
    });
}

//Selected Number of Records Product
function getNumberRecordsProduct(){
    var number_records = $('#product_number_record').val();
    $.ajax({
        type: "POST",
        url: "php/retreive.php",
        async: false,
        dataType: 'json',
        data: {
            action: "getNumberRecordsProduct",
            nameDB: $("#nameDashboardDB").val(),
            number_records : number_records
        },
        fail: function() {
            alert("failed!!")
        },
        success: function(a) {
           $('#product_select_table_entries').html(a['product_html']);
        }
    });
}


//Select Number of Record Producttion Data
function getNumberRecordsProductionData(){
    var number_records = $('#production_data_number_record').val();
    $.ajax({
        type : "POST",
        url : 'php/retreive.php',
        async: false,
        dataType: 'json',
        data: {
            action: "getNumberRecordsProductionData",
            nameDB: $("#nameDashboardDB").val(),
            number_records : number_records
        },
        fail: function() {
            alert("failed!!")
        },
        success: function(a) {
           $('#production_data_select_table_entries').html(a['production_data_html']);
        }
    });
}


//Get Alerts
function getAlerts(){
    $.ajax({
        type : "POST",
        url : 'php/retreive.php',
        async: false,
        dataType: 'json',
        data: {
            action: "getAlerts",
            nameDB: $("#nameDashboardDB").val(),
        },
        fail: function() {
            alert("failed!!")
        },
        success: function(a) {
           $('#alerts_min_max_null_mesurement_tables').html(a['alerts_min_max_null_mesurement_tables']);
           $('#alerts_min_max_null_product_tables').html(a['alerts_min_max_null_product_tables']);
           $('#alerts_min_max_null_energy_tables').html(a['alerts_min_max_null_energy_tables']);
        }
    });
}

function dashboardChart(){
    $.ajax({
        type: "POST",
        url: "php/retreive.php",
        async: false,
        dataType: 'json',
        data: {
            action: "getDashBoardChart",
            nameDB: $("#nameDashboardDB").val(),
        },
        fail: function() {
            alert("failed!!")
        },
        success: function(a) {
            var ar = [];

            for(var i = 0; i < a['energy_chart_ar'].length; i++){
                ar.push(a['energy_chart_ar'][i][0]['val'] != null ? a['energy_chart_ar'][i][0]['val']  : 0);
               
            }

            //Circle Chart
            var arTimeInterval = [];
            var totalEnergyConsumed = a['totalEnergyConsumed'][0]['val'] != null ? a['totalEnergyConsumed'][0]['val'] : 0;
            arTimeInterval[0] =  a['daysEnergyConsumed'][0]['val'] != null  ? a['daysEnergyConsumed'][0]['val'] : 0;
            arTimeInterval[1] =  a['weekEnergyConsumed'][0]['val'] != null  ? a['weekEnergyConsumed'][0]['val'] : 0;
            arTimeInterval[2] =  a['monthEnergyConsumed'][0]['val'] != null  ? a['monthEnergyConsumed'][0]['val'] : 0;
            arTimeInterval[3] =  a['yearEnergyConsumed'][0]['val'] != null  ?  a['yearEnergyConsumed'][0]['val'] : 0;
            // console.log('arTimeinterval',arTimeInterval);
            // console.log('totalEnergyConsumed',totalEnergyConsumed);
            (function($) {
                'use strict';
                $(function() {
                  if ($("#sales-chart").length) {
                    var SalesChartCanvas = $("#sales-chart").get(0).getContext("2d");
                    var SalesChart = new Chart(SalesChartCanvas, {
                      type: 'bar',
                      data: {
                        //labels: ["Jan", "Feb", "Mar", "Apr", "May","june", "july","Aug","Sep","Oct","Nov","Dec"],
                        labels: ["5", "10", "15", "20", "25","30"],
                        datasets: [
                          // {
                          //   label: 'Last Months Energy',
                          //   data: [0,10, 30, 40, 10,50,60,70,10,58,14,74],
                          //   backgroundColor: '#8EB0FF'
                          // },
                          {
                            label: 'One Month Energy',
                            data: ar,
                            backgroundColor: '#316FFF'
                          }
                        ]
                      },
                      options: {
                        responsive: true,
                        maintainAspectRatio: true,
                        layout: {
                          padding: {
                            left: 0,
                            right: 0,
                            top: 20,
                            bottom: 0
                          }
                        },
                        scales: {
                          yAxes: [{
                            display: true,
                            gridLines: {
                              display: false,
                              drawBorder: false
                            },
                            ticks: {
                              display: false,
                              min: 0,
                              max: 1500
                            }
                          }],
                          xAxes: [{
                            stacked: false,
                            ticks: {
                              beginAtZero: true,
                              fontColor: "#9fa0a2"
                            },
                            gridLines: {
                              color: "rgba(0, 0, 0, 0)",
                              display: false
                            },
                            barPercentage: 1
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
                      },
                    });
                    document.getElementById('sales-legend').innerHTML = SalesChart.generateLegend();
                  }

                  //Circle Chart
                  if ($("#north-america-chart").length) {
                    var areaData = {
                      labels: ["Days", "Weeks", "Months", "Years"],
                      datasets: [{
                          data: arTimeInterval,
                          backgroundColor: [
                            "#71c016", "#8caaff", "#248afd","#e86425"
                          ],
                          borderColor: "rgba(0,0,0,0)"
                        }
                      ]
                    };
                    var areaOptions = {
                      responsive: true,
                      maintainAspectRatio: true,
                      segmentShowStroke: false,
                      cutoutPercentage: 78,
                      elements: {
                        arc: {
                            borderWidth: 4
                        }
                      },      
                      legend: {
                        display: false
                      },
                      tooltips: {
                        enabled: true
                      },
                      legendCallback: function(chart) { 
                        var text = [];
                        text.push('<div class="report-chart">');
                          text.push('<div class="d-flex justify-content-between mx-4 mx-xl-5 mt-3"><div class="d-flex align-items-center"><div class="mr-3" style="width:20px; height:20px; border-radius: 50%; background-color: ' + chart.data.datasets[0].backgroundColor[0] + '"></div><p class="mb-0">Days</p></div>');
                          text.push('<p class="mb-0">'+arTimeInterval[0]+'</p>');
                          text.push('</div>');
                          text.push('<div class="d-flex justify-content-between mx-4 mx-xl-5 mt-3"><div class="d-flex align-items-center"><div class="mr-3" style="width:20px; height:20px; border-radius: 50%; background-color: ' + chart.data.datasets[0].backgroundColor[1] + '"></div><p class="mb-0">Weeks</p></div>');
                          text.push('<p class="mb-0">'+arTimeInterval[1]+'</p>');
                          text.push('</div>');
                          text.push('<div class="d-flex justify-content-between mx-4 mx-xl-5 mt-3"><div class="d-flex align-items-center"><div class="mr-3" style="width:20px; height:20px; border-radius: 50%; background-color: ' + chart.data.datasets[0].backgroundColor[2] + '"></div><p class="mb-0">Months</p></div>');
                          text.push('<p class="mb-0">'+arTimeInterval[2]+'</p>');
                          text.push('</div>');
                          text.push('<div class="d-flex justify-content-between mx-4 mx-xl-5 mt-3"><div class="d-flex align-items-center"><div class="mr-3" style="width:20px; height:20px; border-radius: 50%; background-color: ' + chart.data.datasets[0].backgroundColor[3] + '"></div><p class="mb-0">Years</p></div>');
                          text.push('<p class="mb-0">'+arTimeInterval[3]+'</p>');
                          text.push('</div>');
                        text.push('</div>');
                        return text.join("");
                      },
                    }
                    var northAmericaChartPlugins = {
                      beforeDraw: function(chart) {
                        var width = chart.chart.width,
                            height = chart.chart.height,
                            ctx = chart.chart.ctx;
                    
                        ctx.restore();
                        var fontSize = 3.125;
                        ctx.font = "600 " + fontSize + "em sans-serif";
                        ctx.textBaseline = "middle";
                        ctx.fillStyle = "#000";
                    
                        var text = totalEnergyConsumed,
                            textX = Math.round((width - ctx.measureText(text).width) / 2),
                            textY = height / 2;
                            // textX = 785,
                            // textY = 900
                    
                        ctx.fillText(text, textX, textY);
                        ctx.save();
                      }
                    }
                    var northAmericaChartCanvas = $("#north-america-chart").get(0).getContext("2d");
                    var northAmericaChart = new Chart(northAmericaChartCanvas, {
                      type: 'doughnut',
                      data: areaData,
                      options: areaOptions,
                      plugins: northAmericaChartPlugins
                    });
                    document.getElementById('north-america-legend').innerHTML = northAmericaChart.generateLegend();
                  }
                });
              })(jQuery);
        }
    });
    
}

function energy_consumed_five_days(){
  $.ajax({
    type : "POST",
    url : 'php/retreive.php',
    async: false,
    dataType: 'json',
    data: {
        action: "getDataFiveDaysEnergyConsumeed",
        nameDB: $("#nameDashboardDB").val(),
    },
    fail: function() {
        alert("failed!!")
    },
    success: function(a) {
       $('#five_days_energy_consumed_table').html(a['five_days_energy_data']);
       $('#five_days_energy_count').text(a['totalSumDataEnergyConsumed'][0]['val']);
    }
  });
}


// <----29-7-2021---
function saveDashboardSelect(arData){
  arData = JSON.stringify(arData);
  $.ajax({
    type : "POST",
    url : 'php/operations.php',
    async: false,
    dataType: 'json',
    data: {
        action: "saveDashboardSelect",
        nameDB: $("#nameDashboardDB").val(),
        arData : arData
    },
    fail: function() {
        alert("failed!!")
    },
    success: function(a) {
      console.log(a);
    }
  });
}


// ---end-->