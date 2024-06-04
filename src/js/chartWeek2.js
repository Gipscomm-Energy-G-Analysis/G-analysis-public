// Depends on fpCore.js
// Depends on fpChart.js
"use strict"

let dataMachine = new DataMachine(),
    tblChartData_1 = $("#tblChartData_1").DataTable({
        dom: 'Bfrtip',
        buttons: [{
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
            }
        ]
    }),
    tblChartData_2 = $("#tblChartData_2").DataTable({
        dom: 'Bfrtip',
        buttons: [{
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
            }
        ]
    }),
    tblChartData_3 = $("#tblChartData_3").DataTable({
        dom: 'Bfrtip',
        buttons: [{
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
            }
        ]
    }),
    year = sessionStorage.getItem("year"),
    monthArr = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"],
    month = sessionStorage.getItem("month"),
    nameDB = sessionStorage.getItem("nameDB"),
    chartType = sessionStorage.getItem("chartType"),
    displayMean = sessionStorage.getItem("displayMean"),
    nameMst = sessionStorage.getItem("nameMst"),
    mstID_1 = sessionStorage.getItem("mstID_1"),
    queryString_1 = sessionStorage.getItem("queryString_1"),
    queryString_2 = sessionStorage.getItem("queryString_2"),
    queryString_3 = sessionStorage.getItem("queryString_3"),
    startWeekDate1 = sessionStorage.getItem("startWeek1"),
    endWeekDate1 = sessionStorage.getItem("endWeek1"),
    startWeekYear1 = sessionStorage.getItem("startWeekYear1"),
    endWeekYear1 = sessionStorage.getItem("endWeekYear1"),

    startWeekDate2 = sessionStorage.getItem("startWeek2"),
    endWeekDate2 = sessionStorage.getItem("endWeek2"),
    startWeekYear2 = sessionStorage.getItem("startWeekYear2"),
    endWeekYear2 = sessionStorage.getItem("endWeekYear2"),

    startWeekDate3 = sessionStorage.getItem("startWeek3"),
    endWeekDate3 = sessionStorage.getItem("endWeek3"),
    startWeekYear3 = sessionStorage.getItem("startWeekYear3"),
    endWeekYear3 = sessionStorage.getItem("endWeekYear3"),
    headerDiagramm = "Energieverbrauch",
    headerDiagramm1 = " Startwoche 1 :- " + startWeekDate1 + "-" + getMonthName(startWeekDate1, startWeekYear1) + "-" + startWeekYear1 + " to Endwoche 1 :- " + (parseInt(endWeekDate1)) + "-" + getMonthName((parseInt(endWeekDate1)), endWeekYear1) + "-" + endWeekYear1,
    headerDiagramm2 = " Startwoche 2 :- " + startWeekDate2 + "-" + getMonthName(startWeekDate2, startWeekYear2) + "-" + startWeekYear2 + " to Endwoche 2 :- " + (parseInt(endWeekDate2)) + "-" + getMonthName((parseInt(endWeekDate2)), endWeekYear2) + "-" + endWeekYear2,
    headerDiagramm3 = " Startwoche 3 :- " + startWeekDate3 + "-" + getMonthName(startWeekDate3, startWeekYear3) + "-" + startWeekYear3 + " to Endwoche 3 :- " + (parseInt(endWeekDate3)) + "-" + getMonthName((parseInt(endWeekDate3)), endWeekYear3) + "-" + endWeekYear3,
    csOptions = null;

let notes = [];
let msts = [];

const getNotesWeek =
    scpChart.getNotes("week","identyear","lineIndex")

const saveNoteWeek =
    scpChart.saveNote("week","line_index")

if (chartType == "line") {
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
                height: 10,
                width: 10
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
} else {
    csOptions = {
        tooltip: {
            visible: true
        },
        border: {
            width: 2
        },
        marker: {
            dataLabel: {
                visible: true
            }
        }
    }
}
$("#btnSaveAbbr").click(function () {
    $("#savePopup").dialog("close")
})
$("#btnNoteAbbr").click(function () {
    $("#notePopup").dialog("close")
})
$("#btnNoteOk").click(function () {
    $("#notePopup").dialog("close")

    // empty note list
    $("#bemList").empty()

    // saves the note created in the dialog
    // then updates the note list
    saveNoteWeek(
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
            pipe(scpChart.getChart("#container"), scpChart.getSeries, scpChart.updateNotesOfVisibleSeries("month"))
        )
        .then(
            ["#identNote", "#mstIDNote", "#mstNote", "#colorNote", "#bemerkungNote", "#seriesNote"]
            .forEach(a => $(a).val(""))
        )
    window.location.reload()
    // empty notes array
    notes = []
});
$("#btnSaveOk").click(function () {
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
    let chart = $("#container").ejChart("instance");
    var startdate1 = sessionStorage.getItem("startdate1");
    var enddate1 = sessionStorage.getItem("enddate1");
    var startdate2 = sessionStorage.getItem("startdate2");
    var enddate2 = sessionStorage.getItem("enddate2");
    var startdate3 = sessionStorage.getItem("startdate3");
    var enddate3 = sessionStorage.getItem("enddate3");
    var chartType = sessionStorage.getItem("chartType");
    var liveGraph = sessionStorage.getItem("livegraph");
    var name = $("#name").val();
    var beschreibung = $("#beschreibungSave").val();
    var mstID_1 = sessionStorage.getItem("mstID_1");
    var nameMst1 = nameMst;
    var jsonData = {
        "startWeekDate1": startdate1,
        "endWeekDate1": enddate1,
        "startWeekDate2": startdate2,
        "endWeekDate2": enddate2,
        "startWeekDate3": startdate3,
        "endWeekDate3": enddate3,
        "nameDB": nameDB,
        "chartType": chartType,
        "liveGraph": liveGraph,
        "name": name,
        "mstID_1": mstID_1,
        "nameMst": nameMst1
    }
    $.ajax({
        type: 'POST',
        async: true,
        url: 'php/saveGraphDiag.php',
        data: {
            ins: "saveDiag",
            nameDB,
            name: "Energieverbrauch",
            typ: "week2",
            beschreibung: beschreibung,
            jsonDiag: JSON.stringify(jsonData)
            //jsonDiag: JSON.stringify(chart.model.series.map(a => a.dataSource))
        },
        success: function (records) {
            alert("Daten gespeichert!");
        }
    });
});
$("#diagSpeichern").click(function () {
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
            let weeknumber = $("#container_svg_TrackToolTip").text().split(":")[0].replace(/\s/g, '');
            let monthName = getMonthName(weeknumber, $("#container_svg_LegendItemText2").text().split("-")[2].replace(/\s/g, '').substring(0, 4));
            $("#identNote").val(monthName+'-'+$("#container_svg_TrackToolTip").text().split(":")[0].replace(/\s/g, '')+'-'+$("#container_svg_LegendItemText2").text().split("-")[2].replace(/\s/g, '').substring(0, 4)+'-'+$("#container_svg_TrackToolTip").text().split(":")[1].replace(/\s/g, ''))
            $("#lineIndex").val('2')
        }
        if(args.data.region.SeriesIndex==1){
            let weeknumber = $("#container_svg_TrackToolTip").text().split(":")[0].replace(/\s/g, '');
            let monthName = getMonthName(weeknumber, $("#container_svg_LegendItemText1").text().split("-")[2].replace(/\s/g, '').substring(0, 4));
            $("#identNote").val(monthName+'-'+$("#container_svg_TrackToolTip").text().split(":")[0].replace(/\s/g, '')+'-'+$("#container_svg_LegendItemText1").text().split("-")[2].replace(/\s/g, '').substring(0, 4)+'-'+$("#container_svg_TrackToolTip").text().split(":")[1].replace(/\s/g, ''))
            $("#lineIndex").val('1')
        }
        if(args.data.region.SeriesIndex==0){
            let weeknumber = $("#container_svg_TrackToolTip").text().split(":")[0].replace(/\s/g, '');
            let monthName = getMonthName(weeknumber, $("#container_svg_LegendItemText0").text().split("-")[2].replace(/\s/g, '').substring(0, 4));
            $("#identNote").val(monthName+'-'+$("#container_svg_TrackToolTip").text().split(":")[0].replace(/\s/g, '')+'-'+$("#container_svg_LegendItemText0").text().split("-")[2].replace(/\s/g, '').substring(0, 4)+'-'+$("#container_svg_TrackToolTip").text().split(":")[1].replace(/\s/g, ''))
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
        pipe(scpChart.getChart("#container"), scpChart.getSeries, scpChart.prepareSeries(sender), scpChart.updateNotesOfVisibleSeries("month"))

    },
    //Initializing Primary X Axis
    primaryXAxis: {
        title: {
            text: "Woche"
        },
        range: { interval: 1 },
        //labelIntersectAction : "rotate45"
    },
    //Initializing Primary Y Axis
    primaryYAxis: {
        title: {
            text: "Verbrauch[kWh]"
        }
    },
    //Initializing Axes
    /*axes: [
        {
            majorGridLines: { width: 0 },
            rowIndex: 0, 
            opposedPosition: true,
            //lineStyle: { width: 0 },
            //minimum: 24, maximum: 36, interval: 2,
            name: 'yAxis',
            labelFormat: '{value}',
            majorTickLines: { width: 0 },
            title: {text: "Verbrauch[kWh]"}
        }
    ],*/
    commonSeriesOptions: csOptions,
    //Initializing Chart Series
    series: [
       /* {
            type: 'Line',
            dataSource: [
                { x: 'Sun', y: 35 }, { x: 'Mon', y: 40 },
                { x: 'Tue', y: 80 }, { x: 'Wed', y: 70 }, 
                { x: 'Thu', y: 65 }, { x: 'Fri', y: 55 },
                { x: 'Sat', y: 50 }
            ],
            width: 2,
            xName: 'x', 
            yName: 'y',
            name: 'Germany', 
            marker: { visible: true}
        },
        {
            type: 'Line',
            dataSource: [
                { x: 'Sun', y: 30 }, { x: 'Mon', y: 28 },
                { x: 'Tue', y: 29 }, { x: 'Wed', y: 30 }, 
                { x: 'Thu', y: 33 }, { x: 'Fri', y: 32 },
                { x: 'Sat', y: 34 }
            ],
            xName: 'x', 
            yName: 'y',
            width: 2, 
            yAxisName: 'yAxis',
            name: 'Japan',
            marker: { visible: true}
        }*/
    ]
});

$(".headerDiagramm").text(headerDiagramm);
/*if(startWeekDate1 && endWeekDate1){
$(".headerDiagramm1").text(headerDiagramm1);
}
if(startWeekDate2 && endWeekDate2){
$(".headerDiagramm2").text(headerDiagramm2);
}
if(startWeekDate3 && endWeekDate3){
$(".headerDiagramm3").text(headerDiagramm3);
}*/

if (queryString_1 != "" && queryString_2 != "" && queryString_3 != "") {
    (async () => {
        await firstQuery();
        await secondQuery();
        await thirdQuery();
    })();
} else if (queryString_1 != "" && queryString_2 != "") {
    (async () => {
        await firstQuery();
        await secondQuery();
    })();
} else if (queryString_1 != "") {
    (async () => {
        await firstQuery();
    })();
} else {
    console.log("There're no query data!!");
}

const recordMask =
    a => [a.name, a.x , a.y]

let nubmerList = [];
let diffWeekArray = [];
if (startWeekDate1 && endWeekDate1) {
    let diffWeekDate1 = (endWeekDate1-startWeekDate1)+1;
    diffWeekArray.push(Number(diffWeekDate1));    
}
if (startWeekDate2 && endWeekDate2) {
    let diffWeekDate2 = (endWeekDate2-startWeekDate2)+1;
    diffWeekArray.push(Number(diffWeekDate2)); 
}
if (startWeekDate3 && endWeekDate3) {
    let diffWeekDate3 = (endWeekDate3-startWeekDate3)+1; 
    diffWeekArray.push(Number(diffWeekDate3));    
}
let largestDiffWeekValue = diffWeekArray.sort((a,b)=>a-b).reverse()[0];
    for (let i = 1; i <= largestDiffWeekValue; i++) {
      nubmerList.push(Number(i));
    }
const weekArray=nubmerList;
//const weekArray=(nubmerList.sort(function(a, b){return a - b})).filter((item, i, ar) => ar.indexOf(item) === i);
//const weekArray=[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52];
async  function firstQuery() {
    dataMachine.runQuery("read", nameDB, queryString_1)
        .then(JSON.parse)
        .then(function (data) {
            let dataTranslator = null,
                chartData = [],
                sumMonth = 0;

            dataTranslator = new DataTranslator(TranslationType.ENERGY_DATA_01, data)
          
            dataTranslator.sumDaysWeek(startWeekDate1, endWeekDate1)
            
            // Translates the data to a format the charts understand
            chartData = dataTranslator.translate(4)

            let chartDataElement = [];
            weekArray.forEach(weekElement => {
                let elementArrry={};
                let searchData = chartData.find(element => (chartData.indexOf(element) == weekArray.indexOf(weekElement)));
                if(searchData) {
                    elementArrry['name']=searchData.name;
                    elementArrry['x']=weekElement;
                    elementArrry['y']=searchData.y;
                } else {
                    elementArrry['name']="";
                    elementArrry['x']=weekElement;
                    elementArrry['y']=0; 
                }
                chartDataElement.push(elementArrry)
            })
             
            if(chartDataElement.length != 0 && startWeekYear1){
                // Updates the chart and gets the color of the current series as a return value
                const [colorMst, series] = scpChart.updateChart(chartDataElement)(startWeekDate1 + "-" + getMonthName(startWeekDate1, startWeekYear1) + "-" + startWeekYear1 + " to " + (parseInt(endWeekDate1)) + "-" + getMonthName((parseInt(endWeekDate1)), endWeekYear1) + "-" + endWeekYear1)

                // Sums up all the values of the month for the given Messstelle
                $("#consumption-month_1").text(scpChart.sumSeries(chartData) + " kWh")

                // Sets the color of the text for the sum of the month
                $("#consumption-month_1").css("color", colorMst)

                // Replace the y value dot to comma
                let chartDataArray = [];
                chartData.forEach(element => {
                    if (element.y != "" && element.y != 0) {
                        let elementY =element.y;
                        let elementYtoString=elementY.toString();
                        let fristValue =elementYtoString.split('.')[0];
                        let lastValue =elementYtoString.split('.')[1];
                         lastValue = lastValue?','+lastValue:'';
                        let elementYValue= formatComma(fristValue);
                        element.y = elementYValue+lastValue; 
                        chartDataArray.push(element)
                    }
                })
                chartData = chartDataArray;

                // Fill table with energy records
                scpChart.fillTable(chartData)(tblChartData_1)(recordMask)

                msts.push([sessionStorage.getItem("mstID_1"), nameMst, colorMst])

                getNotesWeek(
                    sessionStorage.getItem("mstID_1")
                )(startWeekDate1+'-'+startWeekYear1+','+endWeekDate1+'-'+endWeekYear1)(series)(
                    nameMst
                )(
                    colorMst
                )(
                    series
                )
            }
        });
}

async  function secondQuery() {
    dataMachine.runQuery("read", nameDB, queryString_2)
        .then(JSON.parse)
        .then(function (data) {
            let dataTranslator = null,
                chartData = [],
                sumMonth = 0;
            dataTranslator = new DataTranslator(TranslationType.ENERGY_DATA_01, data);

            dataTranslator.sumDaysWeek(startWeekDate2, endWeekDate2);
            chartData = dataTranslator.translate(4);

            let chartDataElement = [];
            weekArray.forEach(weekElement => {
                let elementArrry={};
                let searchData = chartData.find(element => (chartData.indexOf(element) == weekArray.indexOf(weekElement)));
                if(searchData) {
                    elementArrry['name']=searchData.name;
                    elementArrry['x']=weekElement;
                    elementArrry['y']=searchData.y;
                } else {
                    elementArrry['name']="";
                    elementArrry['x']=weekElement;
                    elementArrry['y']=0; 
                }
                chartDataElement.push(elementArrry)
            })
             
            if(chartDataElement.length != 0 && startWeekYear2){
                // Updates the chart and gets the color of the current series as a return value
                const [colorMst2, series2] = scpChart.updateChart(chartDataElement)(startWeekDate2 + "-" + getMonthName(startWeekDate2, startWeekYear2) + "-" + startWeekYear2 + " to " + (parseInt(endWeekDate2)) + "-" + getMonthName((parseInt(endWeekDate2)), endWeekYear2) + "-" + endWeekYear2)

                // Sums up all the values of the month for the given Messstelle
                $("#consumption-month_2").text(scpChart.sumSeries(chartData) + " kWh")

                // Sets the color of the text for the sum of the month
                $("#consumption-month_2").css("color", colorMst2)

                // Replace the y value dot to comma
                let chartDataArray = [];
                chartData.forEach(element => {
                    if (element.y != "" && element.y != 0) {
                        let elementY =element.y;
                        let elementYtoString=elementY.toString();
                        let fristValue =elementYtoString.split('.')[0];
                        let lastValue =elementYtoString.split('.')[1];
                         lastValue = lastValue?','+lastValue:'';
                        let elementYValue= formatComma(fristValue);
                        element.y = elementYValue+lastValue; 
                        chartDataArray.push(element)
                    }
                })
                chartData = chartDataArray;

                // Fill table with energy records
                scpChart.fillTable(chartData)(tblChartData_2)(recordMask)

                msts.push([sessionStorage.getItem("mstID_1"), nameMst, colorMst2])

                getNotesWeek(
                    sessionStorage.getItem("mstID_1")
                )(startWeekDate2+'-'+startWeekYear2+','+endWeekDate2+'-'+endWeekYear2)(series2)(
                    sessionStorage.getItem("nameMst")
                )(
                    colorMst2
                )(
                    series2
                )
            }
        });
}

async  function thirdQuery() {
    dataMachine.runQuery("read", nameDB, queryString_3)
        .then(JSON.parse)
        .then(function (data) {
            let dataTranslator = null,
                chartData = [],
                sumMonth = 0;
            dataTranslator = new DataTranslator(TranslationType.ENERGY_DATA_01, data);

            dataTranslator.sumDaysWeek(startWeekDate3, endWeekDate3);
            chartData = dataTranslator.translate(4);

            let chartDataElement = [];
            weekArray.forEach(weekElement => {
                let elementArrry={};
                let searchData = chartData.find(element => (chartData.indexOf(element) == weekArray.indexOf(weekElement)));
                if(searchData) {
                    elementArrry['name']=searchData.name;
                    elementArrry['x']=weekElement;
                    elementArrry['y']=searchData.y;
                } else {
                    elementArrry['name']="";
                    elementArrry['x']=weekElement;
                    elementArrry['y']=0; 
                }
                chartDataElement.push(elementArrry)
            })

            if(chartDataElement.length != 0 && startWeekYear3){
                // Updates the chart and gets the color of the current series as a return value
                const [colorMst3, series3] = scpChart.updateChart(chartDataElement)(startWeekDate3 + "-" + getMonthName(startWeekDate3, startWeekYear3) + "-" + startWeekYear3 + " to " + (parseInt(endWeekDate3)) + "-" + getMonthName((parseInt(endWeekDate3)), endWeekYear3) + "-" + endWeekYear3)

                // Sums up all the values of the month for the given Messstelle
                $("#consumption-month_3").text(scpChart.sumSeries(chartData) + " kWh")

                // Sets the color of the text for the sum of the month
                $("#consumption-month_3").css("color", colorMst3)

                // Replace the y value dot to comma
                let chartDataArray = [];
                chartData.forEach(element => {
                    if (element.y != "" && element.y != 0) {
                        let elementY =element.y;
                        let elementYtoString=elementY.toString();
                        let fristValue =elementYtoString.split('.')[0];
                        let lastValue =elementYtoString.split('.')[1];
                         lastValue = lastValue?','+lastValue:'';
                        let elementYValue= formatComma(fristValue);
                        element.y = elementYValue+lastValue; 
                        chartDataArray.push(element)
                    }
                })
                chartData = chartDataArray;

                // Fill table with energy records
                scpChart.fillTable(chartData)(tblChartData_3)(recordMask)

                msts.push([sessionStorage.getItem("mstID_1"), nameMst, colorMst3])

                getNotesWeek(
                    sessionStorage.getItem("mstID_1")
                )(startWeekDate3+'-'+startWeekYear3+','+endWeekDate3+'-'+endWeekYear3)(series3)(
                    sessionStorage.getItem("nameMst")
                )(
                    colorMst3
                )(
                    series3
                )
            }
        });
}
function getMonthName(week, year) {
    let d = new Date(year, 0, (week) * 7);
    d.getUTCDay() < 5 ? d.setUTCDate(d.getUTCDate() - d.getUTCDay() + 1) : d.setUTCDate(d.getUTCDate() + 8 - d.getUTCDay());
    return moment().month(("" + d).split(" ")[1]).format("MMMM");
}   

const formatComma = num => 
    String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, '$1.')
;