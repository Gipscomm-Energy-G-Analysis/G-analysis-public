// Depends on fpCore.js
// Depends on fpChart.js
"use strict"

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

const headerDiagramm = "Energiedaten vom " + month_1 + "." + year_1 + ", " + month_2 + "." + year_2 + " und " + month_3 + "." + year_3

let csOptions = null;

let notes = [];
let msts = [];

const getNotesMonth =
    scpChart.getNotes("month","year","identyear","lineIndex")

const saveNoteMonth =
    scpChart.saveNote("month","line_index")

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
}else if (chartType == "column") {
    csOptions = {
        tooltip: {
            visible: true
        },
        border: {
            width: 2
        },
        marker: {
            shape: 'circle',
            size: {
                height: 0,
                width: 0
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
$("#btnSaveAbbr").click(function () {
    $("#savePopup").dialog("close")
})
$("#btnNoteAbbr").click(function() {
    $("#notePopup").dialog("close")
})
$("#btnNoteOk").click(function() {
    $("#notePopup").dialog("close")

    // empty note list
    $("#bemList").empty()

    // saves the note created in the dialog
    // then updates the note list
    saveNoteMonth(
        $("#identNote").val()
    )(
        $("#mstIDNote").val()
    )(
        $("#bemerkungNote").val()
    )(
        $("#lineIndex").val()
    )
    .then(
        () =>
        pipe(scpChart.getChart("#container"),scpChart.getSeries, scpChart.updateNotesOfVisibleSeries("month"))
    )
    .then(
        [ "#identNote", "#mstIDNote", "#mstNote", "#colorNote", "#bemerkungNote", "#seriesNote"]
        .forEach(a => $(a).val(""))
    )
    window.location.reload()
    // empty notes array
    notes = []
});
$("#btnSaveOk").click(function() {
    $(".error").remove();
    if ($('#name').val() == ""){
        $('#name').after('<span class="error" style="color:#E94649;">Name field is required</span>');
        return false;
        }
    if ($('#beschreibungSave').val() == ""){
        $('#beschreibungSave').after('<span class="error" style="color:#E94649;">Beschreibung field is required</span>');
        return false;
    }  
    $("#savePopup").dialog("close");
    let chart = $("#container") .ejChart("instance");
    var year1 = year_1;
    var year2 = year_2;
    var year3 = year_3;
    var month1 = month_1;
    var month2 = month_2;
    var month3 = month_3;
    var chartType = sessionStorage.getItem("chartType");
    var liveGraph = sessionStorage.getItem("livegraph");
    var name = $("#name").val();
    var beschreibung = $("#beschreibungSave").val();
    var mstID = sessionStorage.getItem("mstID_1");
    var nameMst = sessionStorage.getItem("nameMst");
    var username = sessionStorage.getItem("username");
    var jsonData = {
        "year_1": year1,
        "year_2": year2,
        "year_3": year3,
        "month_1": month1,
        "month_2": month2,
        "month_3": month3,
        "nameDB": nameDB,
        "chartType": chartType,
        "liveGraph": liveGraph,
        "name": name,
        "mstID": mstID,
        "nameMst": nameMst
    }
    $.ajax({
        type: 'POST',
        async: true,
        url: 'php/saveGraphDiag.php',
        data: {
            ins: "saveDiag",
            nameDB,
            name: headerDiagramm,
            typ: "month2",
            username: username,
            beschreibung: beschreibung,
            jsonDiag: JSON.stringify(jsonData)
            //jsonDiag: JSON.stringify(chart.model.series.map(a => a.dataSource))
        },
        success: function (records) {
            alert("Daten gespeichert!");
        }
    });
});
$("#diagSpeichern").click(function() {
    //alert("Die Möglichkeit Diagramme zu speichern wird in Zukunft verfügbar sein.")
    $("#name").val('');
    $("#beschreibungSave").val('');
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

        if(args.data.region.SeriesIndex==2){
            var a = $('#container_svg_LegendItemText2').text().split(".");
            var monthName = a[0];
            var yearName = a[1];
            $("#identNote").val(
                yearName + "/" + monthName + "/" + scpChart.formatDate(String(args.data.region.Region.PointIndex + 1))
            )
            $("#lineIndex").val('2')
        }
        if(args.data.region.SeriesIndex==1){
            var a = $('#container_svg_LegendItemText1').text().split(".");
            var monthName = a[0];
            var yearName = a[1];
            $("#identNote").val(
                yearName + "/" + monthName + "/" + scpChart.formatDate(String(args.data.region.Region.PointIndex + 1))
            )
            $("#lineIndex").val('1')
        }
        if(args.data.region.SeriesIndex==0){
            var a = $('#container_svg_LegendItemText0').text().split(".");
            var monthName = a[0];
            var yearName = a[1];
            $("#identNote").val(
                yearName + "/" + monthName + "/" + scpChart.formatDate(String(args.data.region.Region.PointIndex + 1))
            )
            $("#lineIndex").val('0')
        }
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
        pipe(scpChart.getChart("#container"),scpChart.getSeries, scpChart.prepareSeries(sender), scpChart.updateNotesOfVisibleSeries("month"))

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
    (async () => {
        await firstQuery();
        await secondQuery();
        await thirdQuery();
    })();
}
else if (queryString_1 != "" && queryString_2 != "") {
    (async () => {
        await firstQuery();
        await secondQuery();
    })();
}
else if (queryString_1 != "") {
    (async () => {
        await firstQuery();
    })();
}
else {
    console.log("There're no query data!!");
}

async  function firstQuery(){
    dataMachine.runQuery("read", nameDB, queryString_1)
    .then(JSON.parse)
    .then(function(data) {
        let dataTranslator = null
        let chartData = []
        let sumMonth = 0

        const recordMask =
            a => [a.name, a.x + "." + month_1 + "." + year_1, a.y]

        dataTranslator = new DataTranslator(TranslationType.ENERGY_DATA_01, data)

        dataTranslator.sumDays(year_1, month_1)

        // Translates the data to a format the charts understand
        chartData = dataTranslator.translate(4)

        //month series
        let i=1;
        chartData.forEach(element => {
            if(element.x==""){
            if(i < 10){
                    element.x='0'+i;        
                }else{
                    element.x=i;    
                }       
            }else{
                element.x=element.x;   
            }
            i++;
        })

        // Updates the chart and gets the color of the current series as a return value
        //const [ colorMst, series ] = scpChart.updateChart(Number(month_1))(Interval.Month)(chartData)(month_1 + "." + year_1)
        const [ colorMst, series ] = scpChart.updateChart(chartData)(month_1 + "." + year_1)

        // Sums up all the values of the month for the given Messstelle
        $("#consumption-month_1").text( scpChart.sumSeries(chartData) + " kWh" )

        // Sets the color of the text for the sum of the month
        $("#consumption-month_1").css("color", colorMst)

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

        msts.push([sessionStorage.getItem("mstID_1"), nameMst, colorMst])

        getNotesMonth(
            sessionStorage.getItem("mstID_1")
        )(year_1+'/'+month_1)(0)(
            nameMst
        )(
            colorMst
        )(
            series
        )
    });
}

async  function secondQuery(){
    dataMachine.runQuery("read", nameDB, queryString_2)
    .then(JSON.parse)
    .then(function(data){
        let dataTranslator = null,
        chartData = [],
        sumMonth = 0;
        dataTranslator = new DataTranslator(TranslationType.ENERGY_DATA_01, data);

        const recordMask =
            a => [a.name, a.x + "." + month_2 + "." + year_2, a.y]

        dataTranslator.sumDays(year_2, month_2);
        chartData = dataTranslator.translate(4);

        //month series
        let i=1;
        chartData.forEach(element => {
            if(element.x==""){
            if(i < 10){
                    element.x='0'+i;        
                }else{
                    element.x=i;    
                }       
            }else{
                element.x=element.x;   
            }
            i++;
        })

        // Updates the chart and gets the color of the current series as a return value
        //const [ colorMst2, series2 ] = scpChart.updateChart(Number(month_2))(Interval.Month)(chartData)(month_2 + "." + year_2)
        const [ colorMst2, series2 ] = scpChart.updateChart(chartData)(month_2 + "." + year_2)

        // Sums up all the values of the month for the given Messstelle
        $("#consumption-month_2").text( scpChart.sumSeries(chartData) + " kWh" )

        // Sets the color of the text for the sum of the month
        $("#consumption-month_2").css("color", colorMst2)

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

        msts.push([sessionStorage.getItem("mstID_1"), nameMst, colorMst2])

        getNotesMonth(
            sessionStorage.getItem("mstID_1")
        )(year_2+'/'+month_2)(1)(
            sessionStorage.getItem("nameMst")
        )(
            colorMst2
        )(
            series2
        )
    });
}

async  function thirdQuery(){
    dataMachine.runQuery("read", nameDB, queryString_3)
    .then(JSON.parse)
    .then(function(data) {
        let dataTranslator = null,
        chartData = [],
        sumMonth = 0;
        dataTranslator = new DataTranslator(TranslationType.ENERGY_DATA_01, data);

        const recordMask =
            a => [a.name, a.x + "." + month_3 + "." + year_3, a.y]

        dataTranslator.sumDays(year_3, month_3);
        chartData = dataTranslator.translate(4);

        //month series
        let i=1;
        chartData.forEach(element => {
            if(element.x==""){
            if(i < 10){
                    element.x='0'+i;        
                }else{
                    element.x=i;    
                }       
            }else{
                element.x=element.x;   
            }
            i++;
        })

        // Updates the chart and gets the color of the current series as a return value
        //const [ colorMst3, series3 ] = scpChart.updateChart(Number(month_3))(Interval.Month)(chartData)(month_3 + "." + year_3)
        const [ colorMst3, series3 ] = scpChart.updateChart(chartData)(month_3 + "." + year_3)

        // Sums up all the values of the month for the given Messstelle
        $("#consumption-month_3").text( scpChart.sumSeries(chartData) + " kWh" )

        // Sets the color of the text for the sum of the month
        $("#consumption-month_3").css("color", colorMst3)

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

        msts.push([sessionStorage.getItem("mstID_1"), nameMst, colorMst3])

        getNotesMonth(
            sessionStorage.getItem("mstID_1")
        )(year_3+'/'+month_3)(2)(
            sessionStorage.getItem("nameMst")
        )(
            colorMst3
        )(
            series3
        )
    });
}

const formatComma = num => 
    String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, '$1.')
;
