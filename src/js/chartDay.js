"use strict"
// Depends on fpCore.js
// Depends on fpChart.js

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

year = sessionStorage.getItem("year"),
monthArr = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
month = sessionStorage.getItem("month"),
day = sessionStorage.getItem("day"),
nameDB = sessionStorage.getItem("nameDB"),
chartType = sessionStorage.getItem("chartType"),
displayMean = sessionStorage.getItem("displayMean"),
nameMst_1 = sessionStorage.getItem("nameMst_1"),
nameMst_2 = sessionStorage.getItem("nameMst_2"),
nameMst_3 = sessionStorage.getItem("nameMst_3"),
queryString_1 = sessionStorage.getItem("queryString_1"),
queryString_2 = sessionStorage.getItem("queryString_2"),
queryString_3 = sessionStorage.getItem("queryString_3"),
headerDiagramm = "Energieverbrauch " + day + " " + monthArr[Number(month) - 1] + " " + year

csOptions = null;

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
        pipe( scpChart.getChart("#container")
            , scpChart.getSeries
            , scpChart.updateNotesOfVisibleSeries("day") )
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
$("#container") .ejChart({
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

        console.log("args");
        console.log(args);

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
        pipe( scpChart.getChart("#container")
            , scpChart.getSeries
            , scpChart.prepareSeries(sender)
            , scpChart.updateNotesOfVisibleSeries("day") )

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

$("h3").text(headerDiagramm);

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
    console.log("There're no query data!!");
}

const recordMask =
    a => [a.name, day + "." + month + "." + year + " " + a.x, a.y]

function firstQuery(){
    dataMachine.runQuery("read", nameDB, queryString_1)
    .then(JSON.parse)
    .then(function(data) {
        let dataTranslator = null,
        chartData = [],
        sumMonth = 0;

        dataTranslator = new DataTranslator(TranslationType.ENERGY_DATA_01, data)

        dataTranslator.sumHours()

        // Translates the data to a format the charts understand
        chartData = dataTranslator.translate(1)

        // Fill table with energy records
        scpChart.fillTable(chartData)(tblChartData_1)(recordMask)

        // Updates the chart and gets the color of the current series as a return value
        const [ colorMst, series ] = scpChart.updateChart(scpChart.Interval.Day)(chartData)(nameMst_1)

        // Sums up all the values of the month for the given Messstelle
        $("#consumption-day_1").text( scpChart.sumSeries(chartData) + " kWh" )

        // Sets the color of the text for the sum of the month
        $("#consumption-day_1").css("color", colorMst)

        msts.push([sessionStorage.getItem("mstID_1"), nameMst_1, colorMst])

        getNotesDay(
            sessionStorage.getItem("mstID_1")
        )(
            nameMst_1
        )(
            colorMst
        )(
            series
        )
    });
}

function secondQuery(){
    dataMachine.runQuery("read", nameDB, queryString_2)
    .then(JSON.parse)
    .then(function(data){
        let dataTranslator = null,
        chartData = [],
        sumMonth = 0;
        dataTranslator = new DataTranslator(TranslationType.ENERGY_DATA_01, data);

        dataTranslator.sumHours()
        chartData = dataTranslator.translate(1);

        // Fill table with energy records
        scpChart.fillTable(chartData)(tblChartData_2)(recordMask)

        // Updates the chart and gets the color of the current series as a return value
        const [ colorMst2, series2 ] = scpChart.updateChart(scpChart.Interval.Day)(chartData)(nameMst_2)

        // Sums up all the values of the month for the given Messstelle
        $("#consumption-day_2").text( scpChart.sumSeries(chartData) + " kWh" )

        // Sets the color of the text for the sum of the month
        $("#consumption-day_2").css("color", colorMst2)

        msts.push([sessionStorage.getItem("mstID_2"), nameMst_2, colorMst2])

        getNotesDay(
            sessionStorage.getItem("mstID_2")
        )(
            sessionStorage.getItem("nameMst_2")
        )(
            colorMst2
        )(
            series2
        )
    });
}

function thirdQuery(){
    dataMachine.runQuery("read", nameDB, queryString_3)
    .then(JSON.parse)
    .then(function(data) {
        let dataTranslator = null,
        chartData = [],
        sumMonth = 0;
        dataTranslator = new DataTranslator(TranslationType.ENERGY_DATA_01, data);

        dataTranslator.sumHours()
        chartData = dataTranslator.translate(1);

        // Fill table with energy records
        scpChart.fillTable(chartData)(tblChartData_3)(recordMask)

        // Updates the chart and gets the color of the current series as a return value
        const [ colorMst3, series3 ] = scpChart.updateChart(scpChart.Interval.Day)(chartData)(nameMst_3)

        // Sums up all the values of the month for the given Messstelle
        $("#consumption-day_3").text( scpChart.sumSeries(chartData) + " kWh" )

        // Sets the color of the text for the sum of the month
        $("#consumption-day_3").css("color", colorMst3)

        msts.push([sessionStorage.getItem("mstID_3"), nameMst_3, colorMst3])

        getNotesDay(
            sessionStorage.getItem("mstID_3")
        )(
            sessionStorage.getItem("nameMst_3")
        )(
            colorMst3
        )(
            series3
        )
    });
}
