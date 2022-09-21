let knzID_1,knzName_1;
const [ frm, geo ] = [ scpFormula, scpGeometry ] ;
csOptions = null;

const intializeKpiCharts = () => {
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
            visible: true
        }
    }
    $("#kpi_graph_plot_div") .ejChart({
        palette: [ "black", "blue", "red", "green"],
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
        primaryYAxis: {
            title: {
                text: ""
            }
        },
        commonSeriesOptions: csOptions,
        series: [],
        pointRegionClick: function (args) {
            console.log("Clicked on point! PointIndex: " + args.data.region.Region.PointIndex);
            console.log(args.data);
        }
    });
    firstQuery();
    // secondQuery();
    // thirdQuery();
}

// $("h3").text(header);

// $("#kennzahl").val(kennz);
// $("#obergrenze").val(obergr);
// $("#untergrenze").val(untergr);
// $("#zielwert").text(zielwert);

// if(knzID_1 != "" && knzID_2 != "" && knzID_3 != ""){
    
// }

const updateChart =
    newDataSeries =>
    nameSeries =>
    opacity => {
        let chart = $("#kpi_graph_plot_div") .ejChart("instance");

        chart.model.series.push({
            type: chartType,
            dataSource: newDataSeries,
            name: nameSeries,
            xName: "x",
            yName: "y",
            opacity
        });
        chart.redraw();
    }

    const updateLimits =
    () => {
        let chart = $("#kpi_graph_plot_div") .ejChart("instance");

        chart.model.series.pop();
        chart.model.series.pop();
        chart.model.series.pop();

        chart.model.series.push({
            type: chartType,
            dataSource:
                [{name: "Kennzahl", x: $("#startX").val(), y: $("#kennzahl").val()},
                 {name: "Kennzahl", x: $("#endX").val(), y: $("#kennzahl").val()}],
            name: "Kennzahl",
            xName: "x",
            yName: "y",
            opacity: 0.3
        });

        chart.model.series.push({
            type: chartType,
            dataSource:
                [{name: "Obergrenze", x: $("#startX").val(), y: $("#obergrenze").val()},
                 {name: "Obergrenze", x: $("#endX").val(), y: $("#obergrenze").val()}],
            name: "Obergrenze",
            xName: "x",
            yName: "y",
            opacity: 0.3
        });

        chart.model.series.push({
            type: chartType,
            dataSource:
                [{name: "Untergrenze", x: $("#startX").val(), y: $("#untergrenze").val()},
                 {name: "Untergrenze", x: $("#endX").val(), y: $("#untergrenze").val()}],
            name: "Untergrenze",
            xName: "x",
            yName: "y",
            opacity: 0.3
        });

        chart.redraw();
    }

function firstQuery() {
    console.log("nameDB, knzID_1, timeSpan");
    console.log([nameDB, knzID_1, timeSpan]);

    const xAxis =
    frm.datasetRaw(nameDB)(knzID_1)(timeSpan)
    .then(
        dataRaw =>
        frm.datasetFormula(nameDB)(knzID_1)(timeSpan)
        .then(newData => {

            const chartData =
            newData
            .map(
                (data,i)=>
                ({
                    name: knzName_1,
                    x: "A" + (i + 1) + "-" + dataRaw[i].auftrag,
                    y: data
                })
            ),

            

        [startingPoint, endingPoint] =
        [geo.point(head(chartData).x), geo.point(last(chartData).x)]

        indicator =
        geo
        .horizontalLine(startingPoint)(endingPoint);

        $("#startX").val(head(chartData).x);
        $("#endX").val(last(chartData).x);

        $("#lbl_1").text(knzName_1);

        const indicators =
        arr =>
        arr
        .map(
            a => updateChart(indicator(head(tail(a))))(head(a))(0.3)
        )

        const drawChart =
        () => {
            updateChart (chartData) (knzName_1) (1.0);
            indicators (
                [["Kennzahl", kennz],
                ["Obergrenze", obergr],
                ["Untergrenze",untergr]]
            );
        }

        const pointsChart =
            chartData
            .map(a => a.y);

        const minPointsChart =
            math.min(pointsChart)

        const maxPointsChart =
            math.max(pointsChart)


       // drawChart();
        return $( function () {
            $("#sldKennzahl").slider({
                value: kennz,
                min: minPointsChart,
                max: maxPointsChart,
                step: (maxPointsChart - minPointsChart) / 40,
                slide: function(event, ui) {
                    $("#kennzahl").val(Math.round(ui.value * 1000)/ 1000);
                    updateLimits();
                }
            });
            $("#sldObergr").slider({
                value: obergr,
                min: minPointsChart,
                max: maxPointsChart,
                step: (maxPointsChart - minPointsChart) / 40,
                slide: function(event, ui) {
                    $("#obergrenze").val(Math.round(ui.value * 1000)/ 1000);
                    updateLimits();
                }
            });
            $("#sldUntergr").slider({
                value: untergr,
                min: minPointsChart,
                max: maxPointsChart,
                step: (maxPointsChart - minPointsChart) / 40,
                slide: function(event, ui) {
                    $("#untergrenze").val(Math.round(ui.value * 1000)/ 1000);
                    updateLimits();
                }
            });
        });
    })
    )
}

function secondQuery() {
    const xAxis =
    frm.datasetRaw(nameDB)(knzID_2)(timeSpan)
    .then(
        dataRaw =>
        frm.datasetFormula(nameDB)(knzID_2)(timeSpan)
        .then(newData =>{
            const chartData =
            newData
            .map(
                (data,i)=>
                ({
                    name: knzName_2,
                    x: "A" + (i + 1) + "-" + dataRaw[i].auftrag,
                    y: data
                })
            );

            const fillTable =
            dataRaw
            .forEach((col,n) =>
            tblChartData_2.row.add ([
                col.artikelnummer.split("-")[0],
                "A" + (n + 1) + "-" + dataRaw[n].auftrag,
                col.anlageMst,
                col.gutmenge,
                roundWithZeros(chartData[n].y)(3),
                col.timeUnlock.split(".")[0],
                col.timeClose.split(".")[0]
            ]).draw()
            )
        $("#lbl_2").text(knzName_2);
        updateChart(chartData)(knzName_2)(1.0);
        })
    )
}

function thirdQuery(){
    const xAxis =
    frm.datasetRaw(nameDB)(knzID_3)(timeSpan)
    .then(
        dataRaw =>
        frm.datasetFormula(nameDB)(knzID_3)(timeSpan)
        .then(newData => {
            const chartData =
            newData
            .map(
                (data,i)=>
                ({
                    name: knzName_3,
                    x: "A" + (i + 1) + "-" + dataRaw[i].artikelnummer.split("-")[1],
                    y: data
                })
            );

            const fillTable =
            dataRaw
            .forEach((col,n) =>
            tblChartData_3.row.add([
                col.artikelnummer.split("-")[0],
                "A" + (n + 1) + "-" + col.artikelnummer.split("-")[1],
                col.nameMSt,
                col.istMenge,
                roundWithZeros(chartData[n].y)(3),
                col.timeUnlock.split(".")[0],
                col.timeClose.split(".")[0]
            ]).draw()
        )
        $("#lbl_3").text(knzName_3);
        updateChart(chartData)(knzName_3)(1.0);
    })
)
}


//kpi graphs

const getFormulas = () => {
    console.log('trigger getFromulas');
    $.ajax({
        type: "POST",
        url: "../../php/readKennzahlen.php",
        data: {
            ins: "knzIns",
            nameDB: 'g002_badber',
            orgID: $('#org-data').val() != ""?$('#org-data').val():1
        },
        success: function(response) {
            response = JSON.parse(response);
            let html = '';
            $.each(response, function (key, value) {           
                html += `<option value='${value.knzIns_ID}'>${value.instanz}</option>`;
            });
            $("#kpiFormula").html(html).trigger('change');
        }
    })
}
getFormulas();

const getFormulaString = (knzInsID) => {
    $.ajax({
        type: "POST",
        url: "../../php/readKennzahlen.php",
        data: {
            ins: "knz",
            nameDB: 'g002_badber',
            knzInsID: knzInsID
        },
        success: function(response) {
            response = JSON.parse(response);
            console.log('reafffd', response);
            let html = '';
            $.each(response, function (key, value) {           
                html += `<option value='${value.knz_ID}' data-name='${value.bezeichnung}'>${value.bezeichnung}</option>`;
            });
            $("#kpiTimeFilter").html(html).trigger('change');
        }
    })
}


$(document).on('change','#kpiFormula',function(){
    let org_id = $('#org-data').val();
    let knzInsID = $("#kpiFormula").val();
    getFormulaString(knzInsID);
});


$(document).on('change','#kpiTimeFilter',function(){
    nameDB = "g002_badber";
    chartType =  "line";
    timeSpan = "10";
    knzID_1 = $(this).val();
    knzName_1 = $(this).text();
    intializeKpiCharts(knzInsID);
});
