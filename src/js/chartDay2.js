"use strict"
// Depends on fpCore.js
// Depends on fpChart.js

let dataMachine = new DataMachine()
const tblChartData_1 =  $("#tblChartData_1").DataTable({
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
const tblChartData_2 =  $("#tblChartData_2").DataTable({
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
const tblChartData_3 =  $("#tblChartData_3").DataTable({
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

const year_1 = sessionStorage.getItem("year_1")
const year_2 = sessionStorage.getItem("year_2")
const year_3 = sessionStorage.getItem("year_3")

const monthArr = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"]

const day_1 = sessionStorage.getItem("day_1")
const day_2 = sessionStorage.getItem("day_2")
const day_3 = sessionStorage.getItem("day_3")

const month_1 = sessionStorage.getItem("month_1")
const month_2 = sessionStorage.getItem("month_2")
const month_3 = sessionStorage.getItem("month_3")

const nameDB = sessionStorage.getItem("nameDB")
const chartType = sessionStorage.getItem("chartType")
const displayMean = sessionStorage.getItem("displayMean")
const nameMst = sessionStorage.getItem("nameMst")

const queryString_1 = sessionStorage.getItem("queryString_1")
const queryString_2 = sessionStorage.getItem("queryString_2")
const queryString_3 = sessionStorage.getItem("queryString_3")
let csOptions = null

let notes = [];
let msts = [];
const getNotesDay =
    scpChart.getNotes("day")

const saveNoteDay =
    scpChart.saveNote("day")

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

$("#btnNoteAbbr").click(function() {
    $("#notePopup").dialog("close")
})
$("#btnNoteOk").click(function() {
    $("#notePopup").dialog("close")

    // empty note list
    $("#bemList").empty()

    // saves the note created in the dialog
    // then updates the note list
    saveNoteDay(
        $("#identNote").val()
    )(
        $("#mstIDNote").val()
    )(
        $("#bemerkungNote").val()
    )
    .then(
        () =>
        pipe_( scpChart.getChart("#container") )
             ( scpChart.getSeries
             , scpChart.updateNotesOfVisibleSeries("day") 
             )
    )
    .then(
        [ "#identNote"
        , "#mstIDNote"
        , "#mstNote"
        , "#colorNote"
        , "#bemerkungNote"
        , "#seriesNote"
        ]
        .forEach(a => $(a).val(""))
    )

    // empty notes array
    notes = []
});
$("#btnSaveOk").click(function() {
    $("#savePopup").dialog("close");
    let chart = $("#container") .ejChart("instance");
    $.ajax({
        type: 'POST',
        async: true,
        url: 'php/saveDiag.php',
        data: {
            ins: "saveDiag",
            nameDB,
            name: headerDiagramm,
            typ: "month",
            jsonDiag: JSON.stringify(chart.model.series.map(a => a.dataSource))
        },
        success: function (records) {
            alert("Daten gespeichert!");
        }
    });
});
$("#diagSpeichern").click(function() {
    alert("Die Möglichkeit Diagramme zu speichern wird in Zukunft verfügbar sein.")
    // $("#savePopup").dialog({
    //     resize: "auto",
    //     show: {
    //         effect: "fade",
    //         duration: 500
    //     },
    //     hide: {
    //         effect: "fade",
    //         duration: 500
    //     },
    //     width: 425,
    //     height: 250
    // });
});
$("#container").ejChart({
    pointRegionClick: function (args) {

        $("#notePopup").dialog({
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
            height: 295
        });

        $("#identNote").val(
            year + "/" + month + "/" + day + "/" + scpChart.formatDate(String(args.data.region.Region.PointIndex)) + ":00"
        )
        $("#mstIDNote").val(
            msts[args.data.region.SeriesIndex][0]
        )
        $("#mstNote").val(
            msts[args.data.region.SeriesIndex][1]
        )
        $("#colorNote").val(
            msts[args.data.region.SeriesIndex][2]
        )
        $("#seriesNote").val(
            args.data.region.SeriesIndex
        )

        const toTake =
        notes
        .filter(
            a => a[0] === $("#identNote").val() && a[2] == $("#mstIDNote").val()
        )

        $("#bemerkungNote").val(
            toTake.length >= 1 ? toTake[0][4] : ""
        )

    },
    legend: {
        position: "top"
    },
    legendItemClick: function (sender) {

        // empty note list
        $("#bemList").empty()

        // empty notes array
        notes = []

        // select notes which correspond to the visible series
        // and show only those
        pipe_( scpChart.getChart("#container") )
             ( scpChart.getSeries
             , scpChart.prepareSeries(sender)
             , scpChart.updateNotesOfVisibleSeries("day") 
             )

    },
    //Initializing Primary X Axis
    primaryXAxis: {
        title: {
            text: "Tag"
        }
    },
    //Initializing Primary Y Axis
    primaryYAxis: {
        title: {
            text: "Verbrauch[kWh]"
        }
    },
    commonSeriesOptions: csOptions,
    series: [{
        emptyPointSettings: {
             displayMode : "gap",
         } 
      }]
});

$("h3").text("Energieverbrauch " + nameMst)

if(queryString_1 != "" && queryString_2 != "" && queryString_3 != ""){
    firstQuery()
    secondQuery()
    thirdQuery()
}
else if (queryString_1 != "" && queryString_2 != "") {
    firstQuery()
    secondQuery()
}
else if (queryString_1 != "") {
    firstQuery()
}
else {
    console.log("There're no query data!!")
}

function firstQuery(){
    dataMachine.runQuery("read", nameDB, queryString_1)
    .then(JSON.parse)
    .then(function(data) {
        let dataTranslator = null
        let chartData = []
        let recordMask =
            a => 
            [a.name, day_1 + "." + month_1 + "." + year_1 + " " + a.x, a.y]

        dataTranslator = new DataTranslator(TranslationType.ENERGY_DATA_01, data)

        dataTranslator.sumHours()

        // Translates the data to a format the charts understand
        chartData = dataTranslator.translate(1)

        // Updates the chart and gets the color of the current series as a return value
        const [ colorDay, series ] = scpChart.updateChart()(Interval.Day)(chartData)(day_1 + "." + month_1 + "." + year_1)

        // Sums up all the values of the month for the given Messstelle
        $("#consumption-day_1").text( scpChart.sumSeries(chartData) + " kWh" )

        // Sets the color of the text for the sum of the month
        $("#consumption-day_1").css("color", colorDay)

        console.log("chartData1")
        console.log(chartData)

        // Replace the y value dot to comma
        let chartDataArray = []
        chartData.forEach(element => {
            //if (element.y != "") {
                    let elementY =element.y;
                    let elementYtoString=elementY.toString();
                    let fristValue =elementYtoString.split('.')[0];
                    let lastValue =elementYtoString.split('.')[1];
                     lastValue = lastValue?','+lastValue:'';
                    let elementYValue= formatComma(fristValue);
                    element.y = elementYValue+lastValue; 
                    chartDataArray.push(element)
            //}
        })
        chartData = chartDataArray;

        // Fill table with energy records
        scpChart.fillTable(chartData)(tblChartData_1)(recordMask)

        msts.push([sessionStorage.getItem("mstID"), nameMst, colorDay])

        getNotesDay(
            sessionStorage.getItem("mstID")
        )(
            nameMst
        )(
            colorDay
        )(
            series
        )
    });
}

function secondQuery() {
    dataMachine.runQuery("read", nameDB, queryString_2)
    .then(JSON.parse)
    .then(function(data){
        let dataTranslator = null
        let chartData = []
        let recordMask =
            a => 
            [a.name, day_2 + "." + month_2 + "." + year_2 + " " + a.x, a.y]

        dataTranslator = new DataTranslator(TranslationType.ENERGY_DATA_01, data);

        dataTranslator.sumHours()
        chartData = dataTranslator.translate(1);

        console.log("chartData2")
        console.log(chartData)

        // Updates the chart and gets the color of the current series as a return value
        const [ colorDay2, series2 ] = scpChart.updateChart()(Interval.Day)(chartData)(day_2 + "." + month_2 + "." + year_2)

        // Sums up all the values of the month for the given Messstelle
        $("#consumption-day_2").text( scpChart.sumSeries(chartData) + " kWh" )

        // Sets the color of the text for the sum of the month
        $("#consumption-day_2").css("color", colorDay2)

        // Replace the y value dot to comma
        let chartDataArray = []
        chartData.forEach(element => {
            //if (element.y != "") {
                    let elementY =element.y;
                    let elementYtoString=elementY.toString();
                    let fristValue =elementYtoString.split('.')[0];
                    let lastValue =elementYtoString.split('.')[1];
                     lastValue = lastValue?','+lastValue:'';
                    let elementYValue= formatComma(fristValue);
                    element.y = elementYValue+lastValue; 
                    chartDataArray.push(element)
            //}
        })
        chartData = chartDataArray;

        // Fill table with energy records
        scpChart.fillTable(chartData)(tblChartData_2)(recordMask)

        msts.push([sessionStorage.getItem("mstID"), nameMst, colorDay2])

        getNotesDay(
            sessionStorage.getItem("mstID")
        )(
            sessionStorage.getItem("nameMst")
        )(
            colorDay2
        )(
            series2
        )
    });
}

function thirdQuery(){
    dataMachine.runQuery("read", nameDB, queryString_3)
    .then(JSON.parse)
    .then(function(data) {
        let dataTranslator = null
        let chartData = []
        let recordMask =
            a => 
            [ a.name, day_3 + "." + month_3 + "." + year_3 + " " + a.x, a.y ]

        dataTranslator = new DataTranslator(TranslationType.ENERGY_DATA_01, data);

        dataTranslator.sumHours()
        chartData = dataTranslator.translate(1);

        console.log("chartData3")
        console.log(chartData)

        // Updates the chart and gets the color of the current series as a return value
        const [ colorDay3, series3 ] = scpChart.updateChart()(Interval.Day)(chartData)(day_3 + "." + month_3 + "." + year_3)

        // Sums up all the values of the month for the given Messstelle
        $("#consumption-day_3").text( scpChart.sumSeries(chartData) + " kWh" )

        // Sets the color of the text for the sum of the month
        $("#consumption-day_3").css("color", colorDay3)

        // Replace the y value dot to comma
        let chartDataArray = []
        chartData.forEach(element => {
            //if (element.y != "") {
                    let elementY =element.y;
                    let elementYtoString=elementY.toString();
                    let fristValue =elementYtoString.split('.')[0];
                    let lastValue =elementYtoString.split('.')[1];
                     lastValue = lastValue?','+lastValue:'';
                    let elementYValue= formatComma(fristValue);
                    element.y = elementYValue+lastValue; 
                    chartDataArray.push(element)
            //}
        })
        chartData = chartDataArray;

        // Fill table with energy records
        scpChart.fillTable(chartData)(tblChartData_3)(recordMask)

        msts.push([sessionStorage.getItem("mstID"), nameMst, colorDay3])

        getNotesDay(
            sessionStorage.getItem("mstID")
        )(
            sessionStorage.getItem("nameMst")
        )(
            colorDay3
        )(
            series3
        )
    })
}

const formatComma = num => 
    String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, '$1.')
;