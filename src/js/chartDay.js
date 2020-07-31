
// Depends on fpChart.js
"use strict"

let dataMachine = new DataMachine(),
tblChartData_1 =  $("#tblChartData_1").DataTable({
    dom: 'Bfrtip',
    buttons: [
      {
        extend: 'copy',
        text: 'Kopieren',
        exportOptions: {
          columns: ':visible'
        }
      },
      {
        extend: 'csv',
        text: 'CSV-Export',
        exportOptions: {
          columns: ':visible'
        }
      },
      {
        extend: 'print',
        text: 'Drucken',
        exportOptions: {
          columns: ':visible'
        }
      }
    ],
    pageLength: 15,
    bAutoWidth: false,
    colReorder: true,
    columnDefs: [{
      width: "33%",
      targets: 0
    },
    {
      width: "33%",
      targets: 1
    },
    {
      width: "33%",
      targets: 2
    }]
  })
tblChartData_2 =  $("#tblChartData_2").DataTable({
    dom: 'Bfrtip',
    buttons: [
      {
        extend: 'copy',
        text: 'Kopieren',
        exportOptions: {
          columns: ':visible'
        }
      },
      {
        extend: 'csv',
        text: 'CSV-Export',
        exportOptions: {
          columns: ':visible'
        }
      },
      {
        extend: 'print',
        text: 'Drucken',
        exportOptions: {
          columns: ':visible'
        }
      }
    ],
    pageLength: 15,
    bAutoWidth: false,
    colReorder: true,
    columnDefs: [{
      width: "33%",
      targets: 0
    },
    {
      width: "33%",
      targets: 1
    },
    {
      width: "33%",
      targets: 2
    }]
  })
tblChartData_3 =  $("#tblChartData_3").DataTable({
    dom: 'Bfrtip',
    buttons: [
      {
        extend: 'copy',
        text: 'Kopieren',
        exportOptions: {
          columns: ':visible'
        }
      },
      {
        extend: 'csv',
        text: 'CSV-Export',
        exportOptions: {
          columns: ':visible'
        }
      },
      {
        extend: 'print',
        text: 'Drucken',
        exportOptions: {
          columns: ':visible'
        }
      }
    ],
    pageLength: 15,
    bAutoWidth: false,
    colReorder: true,
    columnDefs: [{
      width: "33%",
      targets: 0
    },
    {
      width: "33%",
      targets: 1
    },
    {
      width: "33%",
      targets: 2
    }]
  })

year_1 = sessionStorage.getItem("year"),
year_2 = sessionStorage.getItem("year"),
year_3 = sessionStorage.getItem("year"),
monthArr = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
month_1 = sessionStorage.getItem("month"),
month_2 = sessionStorage.getItem("month"),
month_3 = sessionStorage.getItem("month"),
day_1 = sessionStorage.getItem("day"),
day_2 = sessionStorage.getItem("day"),
day_3 = sessionStorage.getItem("day"),
nameDB = sessionStorage.getItem("nameDB"),
chartType = sessionStorage.getItem("chartType"),
displayMean = sessionStorage.getItem("displayMean"),
nameMst_1 = sessionStorage.getItem("nameMst_1"),
nameMst_2 = sessionStorage.getItem("nameMst_2"),
nameMst_3 = sessionStorage.getItem("nameMst_3"),

queryString_1 = sessionStorage.getItem("queryString_1"),
queryString_2 = sessionStorage.getItem("queryString_2"),
queryString_3 = sessionStorage.getItem("queryString_3"),

csOptions = null;
if(chartType == "line"){
  csOptions = {
    tooltip: {
      visible : true
    },
      border : {width: 2},
      marker: {
        shape: 'circle',
        size: {
          height: 10, width: 10
        },
        visible: true
      }
  }
}
else {
  csOptions = {
    tooltip: {
      visible : true
    },
      border : {width: 2},
      marker: {
        dataLabel: {visible: true}
      }
  }
}
$("#container") .ejChart({
      legend: {
        position: "top"
      },
      //Initializing Primary X Axis
      primaryXAxis: {
        title: {
          text: "Uhrzeit"
        }
      },
      //Initializing Primary Y Axis
      primaryYAxis: {
        title: {
          text: "Verbrauch[kWh]"
        }
       },
        commonSeriesOptions: csOptions,
        series: []
      });

$("h3").text("Energieverbrauch " + day_1 + " " + monthArr[Number(month_1) - 1] + " " + year_1);
if(queryString_1 != "" && queryString_2 != "" && queryString_3 != ""){
  firstQuery();
  secondQuery();
  thirdQuery();
}
else if (queryString_1 != "" && queryString_2 != "") {
  firstQuery();
  secondQuery();
}
else if (queryString_1 != "") {
  firstQuery();
}
else {
  window.alert ("There're no query data!!");
}


function firstQuery(){

  dataMachine.runQuery("read", nameDB, queryString_1)
  .then(JSON.parse)
  .then(function(data){
    let dataTranslator = null,
        chartData = [],
        sumDay = 0;
    if(nameDB == "001_heco"/* || nameDB == "002_badber"*/ || nameDB == "003_tauchzor"){
      dataTranslator = new DataTranslator(TranslationType.ENERGY_DATA_02, data);
    }
    else {
      dataTranslator = new DataTranslator(TranslationType.ENERGY_DATA_01, data);
    }

    console.log(chartData);
    dataTranslator.sumHours();
    chartData = dataTranslator.translate(4);
    for(let i = 0; i < chartData.length; i++){
      tblChartData_1.row.add([
        chartData[1].name,
        day_1 + "." + month_1 + "." + year_1 + " " + chartData[i].x,
        chartData[i].y
      ]).draw();
      sumDay += chartData[i].y;
    }

  if(sumDay>0){						 //Edited 06.02.2020 raj
    $("#consumption-day_1").text(Math.round(sumDay) + " kWh");
   updateChart(chartData, nameMst_1); }
  else{$("#consumption-day_1").text(Math.round(sumDay) + " kWh (Data not available/No operation) "+nameMst_1);
      alert("Data not available/No operation in "+nameMst_1);}
  });
}

function secondQuery(){
  dataMachine.runQuery("read", nameDB, queryString_2)
  .then(JSON.parse)
  .then(function(data){
    let dataTranslator = null,
        chartData = [],
        sumDay = 0;
    if(nameDB == "001_heco" /*|| nameDB == "002_badber" */|| nameDB == "003_tauchzor"){
      dataTranslator = new DataTranslator(TranslationType.ENERGY_DATA_02, data);
    }
    else {
      dataTranslator = new DataTranslator(TranslationType.ENERGY_DATA_01, data);
    }
    dataTranslator.sumHours();
    chartData = dataTranslator.translate(4);
    for(let i = 0; i < chartData.length; i++){
      tblChartData_2.row.add([
        chartData[1].name,
        day_2 + "." + month_2 + "." + year_2 + " " + chartData[i].x,
        chartData[i].y
      ]).draw();
      sumDay += chartData[i].y;
    }
  if(sumDay>0){updateChart(chartData, nameMst_2);
    $("#consumption-day_2").text(Math.round(sumDay) + " kWh");}
  else{$("#consumption-day_2").text(sumDay + " kWh (Data not available/No operation) "+nameMst_2);}

  });
}

function thirdQuery(){
  dataMachine.runQuery("read", nameDB, queryString_3)
  .then(JSON.parse)
  .then(function(data){
    let dataTranslator = null,
        chartData = [],
        sumDay = 0;
    if(nameDB == "001_heco" /*|| nameDB == "002_badber" */|| nameDB == "003_tauchzor"){
      dataTranslator = new DataTranslator(TranslationType.ENERGY_DATA_02, data);
    }
    else {
      dataTranslator = new DataTranslator(TranslationType.ENERGY_DATA_01, data);
    }
    dataTranslator.sumHours();
    chartData = dataTranslator.translate(4);
    for(let i = 0; i < chartData.length; i++){
      tblChartData_3.row.add([
        chartData[1].name,
        day_3 + "." + month_3 + "." + year_3 + " " + chartData[i].x,
        chartData[i].y
      ]).draw();
      sumDay += chartData[i].y;
    }

  if(sumDay>0){updateChart(chartData, nameMst_3);
    $("#consumption-day_3").text(Math.round(sumDay) + " kWh");}
  else{$("#consumption-day_3").text(sumDay + " kWh (Data not available/No operation)"+nameMst_3);}
  });
}

function updateChart(newDataSeries, nameSeries){
  let chart = $("#container") .ejChart("instance");

  chart.model.series.push({
    type: chartType,
    name: nameSeries,
    dataSource: newDataSeries,
    xName: "x",
    yName: "y",
  });
  chart.redraw();
}

  $("#diagSpeichern").click(function() {
      $("#savePopup").dialog({
      resize: "auto",
      show: {
          effect: "fade",
          duration: 500
      },
      hide: {
          effect: "fade",
          duration: 500
      },
      width: 425,
      height: 250
          });
  });
