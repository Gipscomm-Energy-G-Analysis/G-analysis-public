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
nameDB = sessionStorage.getItem("nameDB"),
chartType = sessionStorage.getItem("chartType"),
displayMean = sessionStorage.getItem("displayMean"),
nameMst_1 = sessionStorage.getItem("nameMst_1"),
nameMst_2 = sessionStorage.getItem("nameMst_2"),
nameMst_3 = sessionStorage.getItem("nameMst_3"),
queryString_1 = sessionStorage.getItem("queryString_1"),
queryString_2 = sessionStorage.getItem("queryString_2"),
queryString_3 = sessionStorage.getItem("queryString_3"),
headerDiagramm = "Energieverbrauch " + monthArr[Number(month) - 1] + " " + year,
csOptions = null;

let notes = [];
let msts = [];

const updateNotesMonth =
    scpChart.updateNotes("month")

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
    $("#notePopup").dialog("close");
});
$("#btnNoteOk").click(function() {
    $("#notePopup").dialog("close");
    $.ajax({
        type: 'POST',
        async: true,
        url: 'php/saveNote.php',
        data: {
            ins: "test",
            nameDB,
            ident: $("#identNote").val(),
            mstID: $("#mstIDNote").val(),
        },
        success: function (records) {
            insJson = JSON.parse(records);

            ins = insJson.length === 0 ? "new" : "save"

            $.ajax({
                type: 'POST',
                async: true,
                url: 'php/saveNote.php',
                data: {
                    ins,
                    nameDB,
                    type: "month",
                    mstID: $("#mstIDNote").val(),
                    ident: $("#identNote").val(),
                    bemerkung: $("#bemerkungNote").val()
                },
                success: function (records) {
                    alert("Daten gespeichert!");

                    scpChart.appendTo ("#bemList")
                    (scpChart.note(
                        $("#identNote").val()
                    )(
                        $("#mstNote").val()
                    )(
                        "black"
                    )(
                        $("#bemerkungNote").val()
                    ))

                    $("#identNote").val("");
                    $("#mstIDNote").val("");
                    $("#mstNote").val("");
                    $("#bemerkungNote").val("");
                }
            });
        }
    });
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

        $("#identNote").val(
            year + "/" + month + "/" + scpChart.formatDate(String(args.data.region.Region.PointIndex + 1))
        )
        $("#mstIDNote").val(
            msts[args.data.region.SeriesIndex][0]
        )
        $("#mstNote").val(
            msts[args.data.region.SeriesIndex][1]
        )

        const toTake =
        notes
        .filter(
            a => a[0] === $("#identNote").val() && a[2] == $("#mstIDNote").val()
        )

        $("#bemerkungNote").val(
            toTake.length === 1 ? toTake[0][4] : ""
        )

    },
    legend: {
        position: "top"
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
    series: []
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

function firstQuery(){
    dataMachine.runQuery("read", nameDB, queryString_1)
    .then(JSON.parse)
    .then(function(data) {
        let dataTranslator = null,
        chartData = [],
        sumMonth = 0;

        dataTranslator = new DataTranslator(TranslationType.ENERGY_DATA_01, data)

        dataTranslator.sumDays(year, month)

        // Translates the data to a format the charts understand
        chartData = dataTranslator.translate(4)

        // Fill table with energy records
        scpChart.fillTable(chartData)(tblChartData_1)(
            a => [a.name, a.x + "." + month + "." + year, a.y]
        )

        // Updates the chart and gets the color of the current series as a return value
        const [ colorMst, series ] = scpChart.updateChart(chartData)(nameMst_1)

        // Sums up all the values of the month for the given Messstelle
        $("#consumption-month_1").text( scpChart.sumSeries(chartData) + " kWh" )

        // Sets the color of the text for the sum of the month
        $("#consumption-month_1").css("color", colorMst)

        msts.push([sessionStorage.getItem("mstID_1"), nameMst_1])

        updateNotesMonth(
            sessionStorage.getItem("mstID_1")
        )(
            nameMst_1
        )(
            colorMst
        )(
            series
        )

        console.log("series :")
        console.log(series)
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

        dataTranslator.sumDays(year, month);
        chartData = dataTranslator.translate(4);

        // Fill table with energy records
        scpChart.fillTable(chartData)(tblChartData_2)(
            a => [a.name, a.x + "." + month + "." + year, a.y]
        )

        // Updates the chart and gets the color of the current series as a return value
        const [ colorMst2, series2 ] = scpChart.updateChart(chartData)(nameMst_2)

        // Sums up all the values of the month for the given Messstelle
        $("#consumption-month_2").text( scpChart.sumSeries(chartData) + " kWh" )

        // Sets the color of the text for the sum of the month
        $("#consumption-month_2").css("color", colorMst2)

        msts.push([sessionStorage.getItem("mstID_2"), nameMst_2])

        updateNotesMonth(
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

        dataTranslator.sumDays(year, month);
        chartData = dataTranslator.translate(4);

        // Fill table with energy records
        scpChart.fillTable(chartData)(tblChartData_3)(
            a => [a.name, a.x + "." + month + "." + year, a.y]
        )

        // Updates the chart and gets the color of the current series as a return value
        const [ colorMst3, series3 ] = scpChart.updateChart(chartData)(nameMst_3)

        // Sums up all the values of the month for the given Messstelle
        $("#consumption-month_3").text( scpChart.sumSeries(chartData) + " kWh" )

        // Sets the color of the text for the sum of the month
        $("#consumption-month_3").css("color", colorMst3)

        msts.push([sessionStorage.getItem("mstID_3"), nameMst_3])

        updateNotesMonth(
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
