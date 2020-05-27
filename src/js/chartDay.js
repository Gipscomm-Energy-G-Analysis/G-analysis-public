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
loadDiag = sessionStorage.getItem("loadDiag"),
loadDiagID = sessionStorage.getItem("loadDiagID"),
headerDiagramm = "Energieverbrauch " + day + " " + monthArr[Number(month) - 1] + " " + year,
//headerDiagramm = "Energieverbrauch " + monthArr[Number(month) - 1] + " " + year,

csOptions = null;

if(equal(chartType)("line")) {
    csOptions = {
        type: "spline",
        tooltip: {
            visible : true
        },
        border : {
            width: 2
        },
        marker: {
            shape: 'circle',
            size: {
                height: 10,
                width: 10
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
        border : {
            width: 2
        },
        marker: {
            dataLabel: {
                visible: true
            }
        }
    }
}

let notes = [];
let msts = [];

const splitSlashes =
    str =>
    str.split("/");

const updateNotes =
mstID =>
mstName =>
mstColor =>
ser =>
fetch('php/readNote.php',
    { method: 'POST'
    , body:
        { ins: "read"
        , nameDB
        , mstID
        , type: "day"
        }
    })
    .json()
    .then(records => {

            if (greaterZero(length_(records))) {
                records
                .filter(
                    a => head(splitSlashes(a.ident)) === year && a.ident.split("/")[1] === month && a.ident.split("/")[2] === scpChart.formatDate(day)
                )
                .forEach(
                    a => {
                        scpChart.appendTo ("#bemList")
                        (scpChart.note(
                            a.ident
                        )(
                            mstName
                        )(
                            mstColor
                        )(
                            a.bemerkung
                        ));

                        notes.push([a.ident, mstName, a.mst_ID, mstColor, a.bemerkung]);
                    }
                )
            }


            notes
            .forEach(
                a =>
                scpChart
                .getChart
                .model
                .series[ser]
                .points
                .map (
                    b => {
                        if( equal( a[1] ) ( b.name ) && equal( head(a).split( "/" )[3] ) ( b.x ) )
                        {
                            b.marker = {
                                shape: 'image',
                                size: {
                                    height: 50, width: 50
                                },
                                imageUrl: "images/icons/flag3" + scpChart.chooseFlag(a[3]) + ".png"
                            }
                        }
                    }
                )
            )
            chart.redraw();
        })



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
                    type: "day",
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

    let chart = $("#container").ejChart("instance");

    $.ajax({
        type: 'POST',
        async: true,
        url: 'php/saveDiag.php',
        data: {
            ins: "saveDiag",
            nameDB: nameDB,
            name: $("#nameSave").val(),
            beschreibung: headerDiagramm,
            bemerkung: $("#bemerkungSave").val(),
            typ: "day",
            jsonDiag:
                JSON.stringify(
                    chart
                    .model
                    .series
                    .map(
                        a => a.points
                    )
                    .map(
                        a => a.map(
                            b => ({name:b.name,x:b.x, y:b.y})
                        )
                    )
                )
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
        );

        const toTake =
        notes
        .filter(
            a => a[0] === $("#identNote").val() && a[2] == $("#mstIDNote").val()
        );

        $("#bemerkungNote").val(
            toTake.length === 1 ? toTake[0][4] : ""
        );

    },
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


if (loadDiag === "true") {
    $.ajax({
        type: 'POST',
        async: true,
        url: 'php/loadDiag.php',
        data: {
            nameDB: nameDB,
            gDiaID: loadDiagID
        },
        success: function (records) {
            $("h3").text(
                head(JSON
                .parse(records))
                .beschreibung
            );

            JSON
            .parse(
                head(
                    JSON
                    .parse(records)
                ).jsonDiag
            )
            .forEach(
                a => scpChart.updateChart(a)(head(a).name)
            );
        }
    });
}
else {
    $("h3").text("Energieverbrauch " + day + " " + monthArr[Number(month) - 1] + " " + year);

    if(queryString_1 != "" && queryString_2 != "" && queryString_3 != "") {
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

    const recordHour =
    rec =>
    [ rec.name
    , day + "." + month + "." + year + " " + rec.x
    , rec.y
    ]

    function firstQuery() {
        dataMachine.runQuery("read", nameDB, queryString_1)
        .then(JSON.parse)
        .then(function(data) {
            let chart = $("#container") .ejChart("instance"),
            dataTranslator = null,
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

            scpChart.fillTable(chartData)(tblChartData_1)(recordHour);

            $("#consumption-day_1").text(
                Math.round(scpChart.sumSeries(chartData)) + " kWh"
            );

            [colorMst, series] = scpChart.updateChart(chartData)(nameMst_1);

            msts.push([sessionStorage.getItem("mstID_1"),nameMst_1]);

            updateNotes (
                sessionStorage.getItem("mstID_1")
            )(
                sessionStorage.getItem("nameMst_1")
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
            sumDay = 0;
            if(nameDB == "001_heco" /*|| nameDB == "002_badber"*/ || nameDB == "003_tauchzor"){
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
                    day + "." + month + "." + year + " " + chartData[i].x,
                    chartData[i].y
                ]).draw();
                sumDay += chartData[i].y;
            }
            $("#consumption-day_2").text(Math.round(sumDay) + " kWh");

            [colorMst2, series] = scpChart.updateChart(chartData)(nameMst_2);

            msts.push([sessionStorage.getItem("mstID_2"),nameMst_2]);

            updateNotes(
                sessionStorage.getItem("mstID_2")
            )(
                sessionStorage.getItem("nameMst_2")
            )(
                colorMst2
            )(
                series
            )
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
                    day + "." + month + "." + year + " " + chartData[i].x,
                    chartData[i].y
                ]).draw();
                sumDay += chartData[i].y;
            }

            $("#consumption-day_3").text(Math.round(sumDay) + " kWh");

            [colorMst3, series] = scpChart.updateChart(chartData)(nameMst_3);

            msts.push([sessionStorage.getItem("mstID_3"),nameMst_3]);

            updateNotes(
                sessionStorage.getItem("mstID_3")
            )(
                sessionStorage.getItem("nameMst_3")
            )(
                colorMst3
            )(
                series
            );
        });
    }
}
