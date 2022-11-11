let kennz,obergr,untergr,knzID_1,knzName_1;
const [ frm, geo ] = [ scpFormula, scpGeometry ] ;
csOptions = null;
let formulaStringArray = {};
let chartInstance;
let intializeChart = true;

$(function(){
    $('#kpiTimeFilter').multiselect({
        numberDisplayed: 1
    });
});

$(document).on('click','#headingFour',function(){
    if(intializeChart) {
      //  getFormulas($('#anl_ID').val());
        intializeChart = false;
    }
});
    
const intializeKpiCharts = (sa, formulaStringArray, formulaArray) => {
    if(formulaArray.length == 0) {
        toastr.warning('Please select atleast one option!');
        return false;
    }
    if(chartInstance !== undefined && chartInstance!== null) {
        console.log('chartInstance', chartInstance);
        chartInstance.destroy();
    }
    $("#kennzahl").val(kennz);
    $("#obergrenze").val(obergr);
    $("#untergrenze").val(untergr);
    let firstData = formulaStringArray[formulaArray[0]];
    console.log("formulaStringArray",formulaStringArray);
    console.log("formulaArray",formulaArray);
    csOptions = {
        tooltip: {
            visible : true
        },
        border : {width: 0},
        marker: {
            shape: 'circle',
            size: {
                height: 6, width: 6
            },
            visible: true,
            border :{width : 2,color : "black"},
        },
        tooltip: {visible: true, format: "#point.x# <br/> #series.name# : #point.y#"},
        enableAnimation :true
    }

    $("#kpi_graph_plot_div") .ejChart({
        palette: [ "black", "blue", "red", "green", "yellow", "purple"],
        legend: {
            position: "top"
        },
        //Initializing Primary X Axis
        primaryXAxis: {
            title: {
                text: "Auftrag-Charge"
            },
            labelIntersectAction : "rotate45"
        },
        //Initializing Primary Y Axis
        primaryYAxis:
        {
            labelFormat: '{value}',
            title: { text: firstData.dataName }
        },
        commonSeriesOptions: csOptions,
        series: [],
        pointRegionClick: function (args) {
            console.log("Clicked on point! PointIndex: " + args.data.region.Region.PointIndex);
            console.log(args.data);
        }
    });
    let first_name;
    chartInstance = $("#kpi_graph_plot_div") .ejChart("instance");
    formulaArray.forEach(function (item, index) {

        //NEW code 
        let formullaData = formulaStringArray[item];
        const xAxis =
        frm.datasetRaw(nameDB)(item)(timeSpan)
        .then(
            dataRaw =>
            frm.datasetFormula(nameDB)(item)(timeSpan)
            .then(newData => {
            const chartData =
            newData
            .map(
                (data,i)=>
                ({
                    name: formullaData.dataName,
                    x: "A" + (i + 1) + "-" + dataRaw[i].auftrag,
                    y: data
                })
            )
            if(index == 0) {
                chartInstance.model.series.push({
                    type: chartType,
                    dataSource: chartData,
                    name: formullaData.dataName,
                    xName: "x",
                    yName: "y"
                });
            } else {
                if(formullaData.dataName != 'kennzahl' || formullaData.dataName != 'obergrenze' || formullaData.dataName != 'untergrenze') {
                    chartInstance.model.series.push({
                        type: chartType,
                        dataSource: chartData,
                        name: formullaData.dataName,
                        xName: "x",
                        yName: "y",
                        yAxisName: formullaData.dataName
                    });
                    chartInstance.model.axes.push({
                        orientation: 'Vertical',
                        hidePartialLabels: false,
                        rowIndex: 0,
                        majorGridLines: { visible: true },
                        axisLine: { visible: false },
                        name: formullaData.dataName,
                        labelFormat: '{value}',
                        title: { text: formullaData.dataName },
                        opposedPosition: true
                    });
                }
            }
        }))
    });
    setTimeout(function(){
        chartInstance.redraw();
    }, 5000);
    
}

const updateChart =
    newDataSeries =>
    nameSeries =>
    opacity => itration => {
        let chart = $("#kpi_graph_plot_div") .ejChart("instance");
        
        if(itration == 1) {
            chart.model.series.push({
                type: chartType,
                dataSource: newDataSeries,
                name: nameSeries,
                xName: "x",
                yName: "y",
                opacity
            });
        } else {
            if(nameSeries != 'kennzahl' || nameSeries != 'obergrenze' || nameSeries != 'untergrenze') {
                chart.model.series.push({
                    type: chartType,
                    dataSource: newDataSeries,
                    name: nameSeries,
                    xName: "x",
                    yName: "y",
                    yAxisName: nameSeries,
                    opacity
                });
                chart.model.axes.push({
                    orientation: 'Vertical',
                    hidePartialLabels: false,
                    rowIndex: 0,
                    majorGridLines: { visible: true },
                    axisLine: { visible: false },
                    name: nameSeries,
                    labelFormat: '{value}',
                    title: { text: nameSeries },
                    opposedPosition: true
                });
            }
        }
        chart.redraw();
        return chart;
    }

    const updateLimits =
    (formullaData) => {
        let chart = $("#kpi_graph_plot_div") .ejChart("instance");

        chart.model.series.pop();
        chart.model.series.pop();
        chart.model.series.pop();
        
        chart.model.series.push({
            type: chartType,
            dataSource:
                [{name: "Kennzahl", x: $("#startX").val(), y: formullaData.kennz},
                 {name: "Kennzahl", x: $("#endX").val(), y: formullaData.kennz}],
            name: "Kennzahl",
            xName: "x",
            yName: "y",
            opacity: 0.3
        });

        chart.model.series.push({
            type: chartType,
            dataSource:
                [{name: "Obergrenze", x: $("#startX").val(), y: formullaData.obergr},
                 {name: "Obergrenze", x: $("#endX").val(), y: formullaData.obergr}],
            name: "Obergrenze",
            xName: "x",
            yName: "y",
            opacity: 0.3
        });
        chart.model.series.push({
            type: chartType,
            dataSource:
                [{name: "Untergrenze", x: $("#startX").val(), y: formullaData.untergr},
                 {name: "Untergrenze", x: $("#endX").val(), y: formullaData.untergr}],
            name: "Untergrenze",
            xName: "x",
            yName: "y",
            opacity: 0.3
        });

        chart.redraw();
    }

function firstQuery(knzID, formullaData) {
    console.log("nameDB, knzID, timeSpan");
    console.log([nameDB, knzID, timeSpan]);
    console.log(["Kennzahl", kennz],
    ["Obergrenze", obergr],
    ["Untergrenze",untergr])
    const xAxis =
    frm.datasetRaw(nameDB)(knzID)(timeSpan)
    .then(
        dataRaw =>
        frm.datasetFormula(nameDB)(knzID)(timeSpan)
        .then(newData => {

            const chartData =
            newData
            .map(
                (data,i)=>
                ({
                    name: formullaData.dataName,
                    x: "A" + (i + 1) + "-" + dataRaw[i].auftrag,
                    y: data
                })
            ),
        [startingPoint, endingPoint] =
        [geo.point(head(chartData).x), geo.point(last(chartData).x)]

        console.log('charData', chartData);
        indicator =
        geo
        .horizontalLine(startingPoint)(endingPoint);
        $("#startX").val(head(chartData).x);
        $("#endX").val(last(chartData).x);
        $("#lbl_1").text(knzID);
        const drawChart =
        () => {
            updateChart (chartData) (formullaData.dataName) (1.0)(1);
        }
        return drawChart();
    })
    )
}

function secondQuery(knzID, formullaData) {
    const xAxis =
    frm.datasetRaw(nameDB)(knzID)(timeSpan)
    .then(
        dataRaw =>
        frm.datasetFormula(nameDB)(knzID)(timeSpan)
        .then(newData =>{
            const chartData =
            newData
            .map(
                (data,i)=>
                ({
                    name: formullaData.dataName,
                    x: "A" + (i + 1) + "-" + dataRaw[i].auftrag,
                    y: data
                })
            );
        $("#lbl_2").text(formullaData.dataName);
        updateChart(chartData)(formullaData.dataName)(1.0)(2);
        })
    )
}

function thirdQuery(knzID, formullaData){
    const xAxis =
    frm.datasetRaw(nameDB)(knzID)(timeSpan)
    .then(
        dataRaw =>
        frm.datasetFormula(nameDB)(knzID)(timeSpan)
        .then(newData => {
            const chartData =
            newData
            .map(
                (data,i)=>
                ({
                    name: formullaData.dataName,
                    x: "A" + (i + 1) + "-" + dataRaw[i].auftrag,
                    y: data
                })
            );

        $("#lbl_3").text(formullaData.dataName);
        updateChart(chartData)(formullaData.dataName)(1.0)(3);
    })
)
}

//kpi graphs
const getFormulas = (anlId="") => {
    console.log('trigger getFromulas', anlId);
    $.ajax({
        type: "POST",
        url: "../../php/readKennzahlen.php",
        data: {
            ins: "knzCustom",
            anlID: anlId == ""?265:anlId,
            nameDB: $("#nameDB").val(),
            orgID: $('#org-data').val() != ""?$('#org-data').val():1
        },
        success: function(response) {
            response = JSON.parse(response);
            console.log('kpiarrayresponse',response)
            if(response.length==0){
                $('.kpi_graph_msg').show();
                $('.kpi_graph_div').hide(); 
            }else{
                $('.kpi_graph_div').show(); 
                $('.kpi_graph_msg').hide(); 
            }
            let html = '';
            $.each(response, function (key, value) {           
                html += `<option value='${value.knzIns_ID}'>${value.instanz}</option>`;
            });
            $("#kpiFormula").html(html).trigger('change');
        }
    })
}

const getFormulaString = (knzInsID, triggerChange=false) => {
    $.ajax({
        type: "POST",
        url: "../../php/readKennzahlen.php",
        data: {
            ins: "knz",
            nameDB: $("#nameDB").val(),
            knzInsID: knzInsID
        },
        success: function(response) {
            response = JSON.parse(response);
            console.log('reafffd', response);
            let html = '';
            formulaStringArray = {};
            $.each(response, function (key, value) {     
                formulaStringArray[value.knz_ID] = {
                    "knz_ID" : value.knz_ID,
                    "dataName" : value.bezeichnung,
                    "kennz" : value.kennzahl,
                    "obergr" : value.grenzwertO,
                    "untergr" : value.grenzwertU,
                };
                if(key === 0) {
                    html += `<option value='${value.knz_ID}' data-name='${value.bezeichnung}' data-kennzahl='${value.kennzahl}' data-obergr='${value.grenzwertO}' data-untergr='${value.grenzwertU}' Selected >${value.bezeichnung}</option>`;
                }  else {
                    html += `<option value='${value.knz_ID}' data-name='${value.bezeichnung}' data-kennzahl='${value.kennzahl}' data-obergr='${value.grenzwertO}' data-untergr='${value.grenzwertU}' >${value.bezeichnung}</option>`;
                }
                
            });
            setTimeout(function(){
                
           }, 2000);
           $("#kpiTimeFilter").html(html).multiselect('rebuild').trigger('change');
            
        }
    })
}


$(document).on('change','#kpiFormula',function(){
    let org_id = $('#org-data').val();
    let knzInsID = $("#kpiFormula").val();
    getFormulaString(knzInsID);
});


$(document).on('change','#kpiTimeFilter',function(){
    let formulaArray = $(this).val();
    nameDB = $("#nameDB").val();
    chartType =  "line";
    timeSpan = $('#kpiRecordFilter').val();
    knzID_1 = $(this).val();
    knzName_1 = $('option:selected', this).text();
    kennz = $('option:selected', this).attr('data-kennzahl');
    obergr = $('option:selected', this).attr('data-obergr');
    untergr = $('option:selected', this).attr('data-untergr');
    intializeKpiCharts(knzID_1, formulaStringArray, formulaArray);
});

$(document).on('change','#kpiRecordFilter',function(){
    nameDB = $("#nameDB").val();
    chartType =  "line";
    timeSpan = $(this).val();
    let formulaArray = $('#kpiTimeFilter').val();
    knzID_1 = $('option:selected', '#kpiTimeFilter').val();
    knzName_1 = $('option:selected', '#kpiTimeFilter').text();
    kennz = $('option:selected', '#kpiTimeFilter').attr('data-kennzahl');
    obergr = $('option:selected', '#kpiTimeFilter').attr('data-obergr');
    untergr = $('option:selected', '#kpiTimeFilter').attr('data-untergr');
    intializeKpiCharts(knzID_1, formulaStringArray, formulaArray);
});
