$( document ).ready(function() {
$(document).on('change','#save_graph_chart',function(){
    var graphId = $(this).val();
    if(graphId !=''){
        $('.default').show();
        $('.msgGraph').hide();
    }else{
        $('.default').hide();
        $('.msgGraph').show(); 
    }
    getParticularSavedGraph(graphId);

});

function getParticularSavedGraph(id){
  $.ajax({
    type: "POST",
    url: "php/getSaveGraph.php",
    async: false,
    dataType: 'json',
    data: {
        action: "getSavedGraph",
        nameDB: $("#nameDashboardDB").val(),
        saveGraphId : id,
    },
    fail: function() {
        alert("failed!!")
    },
    success: function(a) {
      $('#save_graph_chart').prop('disabled', true);
      $("#dashboard_loader_div").show();  
      var name =a[0]['name'];
      var type =a[0]['typ'];
      var commanQuery ="SELECT nameMSt AS Name, CONVERT(varchar(20), time_de, 104) + ' ' + CONVERT(varchar(20), time_de, 108) AS Time, phase AS Phase, power AS Value, wandlungsfaktorMsm AS ConvFactor FROM data_value_15m INNER JOIN channel ON data_value_15m.channel_id = channel.channel_id INNER JOIN messmittel ON data_value_15m.channel_id = messmittel.kanal1Msm OR data_value_15m.channel_id = messmittel.kanal2Msm OR data_value_15m.channel_id = messmittel.kanal3Msm INNER JOIN messstellen ON messmittel.mst_ID = messstellen.mst_ID ";
      var data =JSON.parse(a[0]['jsonDiag']);
      if(type=='year' || type=='month' || type=='month15min' || type=='day' || type=='day15min' || type=='week' || type=='custom'){
        sessionStorage.clear();
        sessionStorage.setItem("nameDB", data.nameDB);
        sessionStorage.setItem("chartType", data.chartType);
        sessionStorage.setItem("nameMst_1", data.nameMst_1);
        sessionStorage.setItem("nameMst_2", data.nameMst_2);
        sessionStorage.setItem("nameMst_3", data.nameMst_3);
        sessionStorage.setItem("mstID_1", data.mstID_1);
        sessionStorage.setItem("mstID_2", data.mstID_2);
        sessionStorage.setItem("mstID_3", data.mstID_3);
         if(type=='year'){
            sessionStorage.setItem("year", data.year);
            if(data.mstID_1 !=''){
              sessionStorage.setItem("queryString_1", commanQuery+" WHERE messstellen.mst_ID = '"+data.mstID_1+"' AND LEFT(CONVERT(varchar(20), time_de, 120), 4) = '"+data.year+"' ORDER by time_de ");
            }
            if(data.mstID_2 !=''){
              sessionStorage.setItem("queryString_2", commanQuery+" WHERE messstellen.mst_ID = '"+data.mstID_2+"' AND LEFT(CONVERT(varchar(20), time_de, 120), 4) = '"+data.year+"' ORDER by time_de ");
            }
            if(data.mstID_3 !=''){
              sessionStorage.setItem("queryString_3", commanQuery+" WHERE messstellen.mst_ID = '"+data.mstID_3+"' AND LEFT(CONVERT(varchar(20), time_de, 120), 4) = '"+data.year+"' ORDER by time_de ");
            }
            let dataMachine = new DataMachine();
            year = sessionStorage.getItem("year");
            nameDB = sessionStorage.getItem("nameDB");
            chartType = sessionStorage.getItem("chartType");
            displayMean = sessionStorage.getItem("displayMean");
            nameMst_1 = sessionStorage.getItem("nameMst_1");
            nameMst_2 = sessionStorage.getItem("nameMst_2");
            nameMst_3 = sessionStorage.getItem("nameMst_3");
            queryString_1 = sessionStorage.getItem("queryString_1");
            queryString_2 = sessionStorage.getItem("queryString_2");
            queryString_3 = sessionStorage.getItem("queryString_3");
            csOptions = null;

            let notes = [];
            let msts = [];
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
            } else if (chartType == "column") {
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
            $("#container").ejChart({
                palette: [ "#E94649", "#F6B53F", "#6FAAB0"],
                legend: {
                    position: "top"
                },
                //Initializing Primary X Axis
                primaryXAxis: {
                    title: {
                        text: "Monat"
                    },
                    labelIntersectAction : "rotate0"
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
            if (queryString_1 != "" && queryString_2 != "" && queryString_3 != "") {
                firstQuery();
                secondQuery();
                thirdQuery();
            } else if (queryString_1 != "" && queryString_2 != "") {
                firstQuery();
                secondQuery();
            } else if (queryString_1 != "") {
                firstQuery();
            } else {
                console.log("There're no query data!!");
            }

            const recordMask =
                a => [a.name, a.x + "." + year, a.y]

            function firstQuery() {
                dataMachine.runQuery("read", nameDB, queryString_1)
                    .then(JSON.parse)
                    .then(function (data) {
                        let dataTranslator = null,
                            chartData = [],
                            sumMonth = 0;

                        dataTranslator = new DataTranslator(TranslationType.ENERGY_DATA_01, data)

                        dataTranslator.sumMonths()

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
                        const [colorMst, series] = scpChart.updateChart(chartData)(nameMst_1)
                        msts.push([sessionStorage.getItem("mstID_1"), nameMst_1, colorMst])
                    });
            }

            function secondQuery() {
                dataMachine.runQuery("read", nameDB, queryString_2)
                    .then(JSON.parse)
                    .then(function (data) {
                        let dataTranslator = null,
                            chartData = [],
                            sumMonth = 0;
                        dataTranslator = new DataTranslator(TranslationType.ENERGY_DATA_01, data);

                        dataTranslator.sumMonths();
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
                        const [colorMst2, series2] = scpChart.updateChart(chartData)(nameMst_2)
                        msts.push([sessionStorage.getItem("mstID_2"), nameMst_2, colorMst2])
                    });
            }

            function thirdQuery() {
                dataMachine.runQuery("read", nameDB, queryString_3)
                    .then(JSON.parse)
                    .then(function (data) {
                        let dataTranslator = null,
                            chartData = [],
                            sumMonth = 0;
                        dataTranslator = new DataTranslator(TranslationType.ENERGY_DATA_01, data);

                        dataTranslator.sumMonths()
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
                        const [colorMst3, series3] = scpChart.updateChart(chartData)(nameMst_3)
                        msts.push([sessionStorage.getItem("mstID_3"), nameMst_3, colorMst3])
                    });
            }

         }
         if(type=='month'){
            sessionStorage.setItem("year", data.year);
            sessionStorage.setItem("month", data.month);
            if(data.mstID_1 !=''){
              sessionStorage.setItem("queryString_1", commanQuery+" WHERE messstellen.mst_ID = '"+data.mstID_1+"' AND LEFT(CONVERT(varchar(20), time_de, 120), 4) = '"+data.year+"' AND RIGHT(LEFT(CONVERT(varchar(20), time_de, 120), 7), 2) = '"+data.month+"' ORDER by time_de ");
            }
            if(data.mstID_2 !=''){
              sessionStorage.setItem("queryString_2", commanQuery+" WHERE messstellen.mst_ID = '"+data.mstID_2+"' AND LEFT(CONVERT(varchar(20), time_de, 120), 4) = '"+data.year+"' AND RIGHT(LEFT(CONVERT(varchar(20), time_de, 120), 7), 2) = '"+data.month+"' ORDER by time_de ");
            }
            if(data.mstID_3 !=''){
              sessionStorage.setItem("queryString_3", commanQuery+" WHERE messstellen.mst_ID = '"+data.mstID_3+"' AND LEFT(CONVERT(varchar(20), time_de, 120), 4) = '"+data.year+"' AND RIGHT(LEFT(CONVERT(varchar(20), time_de, 120), 7), 2) = '"+data.month+"' ORDER by time_de ");
            }

            let dataMachine = new DataMachine();
            year = sessionStorage.getItem("year");
            monthArr = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
            month = sessionStorage.getItem("month");
            nameDB = sessionStorage.getItem("nameDB");
            chartType = sessionStorage.getItem("chartType");
            displayMean = sessionStorage.getItem("displayMean");
            nameMst_1 = sessionStorage.getItem("nameMst_1");
            nameMst_2 = sessionStorage.getItem("nameMst_2");
            nameMst_3 = sessionStorage.getItem("nameMst_3");
            queryString_1 = sessionStorage.getItem("queryString_1");
            queryString_2 = sessionStorage.getItem("queryString_2");
            queryString_3 = sessionStorage.getItem("queryString_3");
            csOptions = null;
            let notes = [];
            let msts = [];
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
            } else if (chartType == "column") {
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
            $("#container").ejChart({
                palette: [ "#E94649", "#F6B53F", "#6FAAB0"],
                legend: {
                    position: "top"
                },
                //Initializing Primary X Axis
                primaryXAxis: {
                    title: {
                        text: "Tag"
                    },
                    labelIntersectAction : "rotate0"
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
            if (queryString_1 != "" && queryString_2 != "" && queryString_3 != "") {
                firstQuery();
                secondQuery();
                thirdQuery();
            } else if (queryString_1 != "" && queryString_2 != "") {
                firstQuery();
                secondQuery();
            } else if (queryString_1 != "") {
                firstQuery();
            } else {
                console.log("There're no query data!!");
            }

            const recordMask =
                a => [a.name, a.x + "." + month + "." + year, a.y]

            function firstQuery() {
                dataMachine.runQuery("read", nameDB, queryString_1)
                    .then(JSON.parse)
                    .then(function (data) {
                        let dataTranslator = null,
                            chartData = [],
                            sumMonth = 0;

                        dataTranslator = new DataTranslator(TranslationType.ENERGY_DATA_01, data)

                        dataTranslator.sumDays(year, month)

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
                        const [colorMst, series] = scpChart.updateChart(chartData)(nameMst_1)
                        msts.push([sessionStorage.getItem("mstID_1"), nameMst_1, colorMst])
                    });
            }

            function secondQuery() {
                dataMachine.runQuery("read", nameDB, queryString_2)
                    .then(JSON.parse)
                    .then(function (data) {
                        let dataTranslator = null,
                            chartData = [],
                            sumMonth = 0;
                        dataTranslator = new DataTranslator(TranslationType.ENERGY_DATA_01, data);

                        dataTranslator.sumDays(year, month);
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
                        const [colorMst2, series2] = scpChart.updateChart(chartData)(nameMst_2)
                        msts.push([sessionStorage.getItem("mstID_2"), nameMst_2, colorMst2])
                    });
            }

            function thirdQuery() {
                dataMachine.runQuery("read", nameDB, queryString_3)
                    .then(JSON.parse)
                    .then(function (data) {
                        let dataTranslator = null,
                            chartData = [],
                            sumMonth = 0;
                        dataTranslator = new DataTranslator(TranslationType.ENERGY_DATA_01, data);

                        dataTranslator.sumDays(year, month);
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
                        const [colorMst3, series3] = scpChart.updateChart(chartData)(nameMst_3)
                        msts.push([sessionStorage.getItem("mstID_3"), nameMst_3, colorMst3])
                    });
            }
         }
         if(type=='month15min'){
            if(!$("#container").is(':empty')){
                $("#container").ejChart("destroy");
            }
            sessionStorage.setItem("year", data.year);
            sessionStorage.setItem("month", data.month);
            if(data.mstID_1 !=''){
              sessionStorage.setItem("queryString_1", commanQuery+" WHERE messstellen.mst_ID = '"+data.mstID_1+"' AND LEFT(CONVERT(varchar(20), time_de, 120), 4) = '"+data.year+"' AND RIGHT(LEFT(CONVERT(varchar(20), time_de, 120), 7), 2) = '"+data.month+"' ORDER by time_de ");
            }
            if(data.mstID_2 !=''){
              sessionStorage.setItem("queryString_2", commanQuery+" WHERE messstellen.mst_ID = '"+data.mstID_2+"' AND LEFT(CONVERT(varchar(20), time_de, 120), 4) = '"+data.year+"' AND RIGHT(LEFT(CONVERT(varchar(20), time_de, 120), 7), 2) = '"+data.month+"' ORDER by time_de ");
            }
            if(data.mstID_3 !=''){
              sessionStorage.setItem("queryString_3", commanQuery+" WHERE messstellen.mst_ID = '"+data.mstID_3+"' AND LEFT(CONVERT(varchar(20), time_de, 120), 4) = '"+data.year+"' AND RIGHT(LEFT(CONVERT(varchar(20), time_de, 120), 7), 2) = '"+data.month+"' ORDER by time_de ");
            }

            let dataMachine = new DataMachine();
            year = sessionStorage.getItem("year");
            monthArr = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober","November", "Dezember"];
            month = sessionStorage.getItem("month");
            day = sessionStorage.getItem("day");
            nameDB = sessionStorage.getItem("nameDB");
            chartType = sessionStorage.getItem("chartType");
            displayMean = sessionStorage.getItem("displayMean");
            nameMst_1 = sessionStorage.getItem("nameMst_1");
            nameMst_2 = sessionStorage.getItem("nameMst_2");
            nameMst_3 = sessionStorage.getItem("nameMst_3");
            queryString_1 = sessionStorage.getItem("queryString_1");
            queryString_2 = sessionStorage.getItem("queryString_2");
            queryString_3 = sessionStorage.getItem("queryString_3");
            csOptions = null;
            if (chartType == "line") {
                csOptions = {
                    tooltip: {
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
                }
            }
            $("#container").ejChart({
                palette: [ "#E94649", "#F6B53F", "#6FAAB0"],
                legend: {
                    position: "top"
                },
                //Initializing Primary X Axis
                primaryXAxis: {
                    title: {
                        text: "Datum / Uhrzeit"
                    },
                    labelIntersectAction : "rotate45",
                    desiredIntervals: 8
                },
                //Initializing Primary Y Axis
                primaryYAxis: {
                    title: {
                        text: "Leistung[kW/15min]"
                    }
                },
                commonSeriesOptions: csOptions,
                series: [],
                zooming: {
                    enable: false,
                    enablePinching: false,
                    enableDeferredZoom: false,
                    enableScrollbar: false,
                    enableMouseWheel: false
                }
            });
            if (queryString_1 != "" && queryString_2 != "" && queryString_3 != "") {
                firstQuery();
                secondQuery();
                thirdQuery();
            } else if (queryString_1 != "" && queryString_2 != "") {
                firstQuery();
                secondQuery();
            } else if (queryString_1 != "") {
                firstQuery();
            } else {
                console.log("There're no query data!!");
            }

            function firstQuery() {
                dataMachine.runQuery("read", nameDB, queryString_1)
                    .then(JSON.parse)
                    .then(function (data) {
                        let dataTranslator = null,
                            chartData = [],
                            sumMonth = 0;
                        dataTranslator = new DataTranslator(TranslationType.ENERGY_DATA_01, data);
                        dataTranslator.sum15minsMonth(year, month);
                        chartData = dataTranslator.translate(4);
                            updateChart(chartData, nameMst_1); //edited on 06-02-2020 raj
                    });
            }

            function secondQuery() {
                dataMachine.runQuery("read", nameDB, queryString_2)
                    .then(JSON.parse)
                    .then(function (data) {
                        let dataTranslator = null,
                            chartData = [],
                            sumMonth = 0;
                        dataTranslator = new DataTranslator(TranslationType.ENERGY_DATA_01, data);
                        dataTranslator.sum15minsMonth(year, month);
                        chartData = dataTranslator.translate(4);
                            updateChart(chartData, nameMst_2);
                    });
            }

            function thirdQuery() {
                dataMachine.runQuery("read", nameDB, queryString_3)
                    .then(JSON.parse)
                    .then(function (data) {
                        let dataTranslator = null,
                            chartData = [],
                            sumMonth = 0;
                        dataTranslator = new DataTranslator(TranslationType.ENERGY_DATA_01, data);
                        dataTranslator.sum15minsMonth(year, month);
                        chartData = dataTranslator.translate(4);
                            updateChart(chartData, nameMst_3);
                    });
            }

            function updateChart(newDataSeries, nameSeries) {
                let chart = $("#container").ejChart("instance");

                chart.model.series.push({
                    type: chartType,
                    name: nameSeries,
                    dataSource: newDataSeries,
                    xName: "x",
                    yName: "y",
                });
                chart.redraw();
            }
         }
         if(type=='day'){
            sessionStorage.setItem("year", data.year);
            sessionStorage.setItem("month", data.month);
            sessionStorage.setItem("day", data.day);
            if(data.mstID_1 !=''){
              sessionStorage.setItem("queryString_1", commanQuery+" WHERE messstellen.mst_ID = '"+data.mstID_1+"' AND LEFT(CONVERT(varchar(20), time_de, 120), 4) = '"+data.year+"' AND RIGHT(LEFT(CONVERT(varchar(20), time_de, 120), 7), 2) = '"+data.month+"' AND RIGHT(LEFT(CONVERT(varchar(20), time_de, 120), 10), 2) = '"+data.day+"' ORDER by time_de ");
            }
            if(data.mstID_2 !=''){
              sessionStorage.setItem("queryString_2", commanQuery+" WHERE messstellen.mst_ID = '"+data.mstID_2+"' AND LEFT(CONVERT(varchar(20), time_de, 120), 4) = '"+data.year+"' AND RIGHT(LEFT(CONVERT(varchar(20), time_de, 120), 7), 2) = '"+data.month+"' AND RIGHT(LEFT(CONVERT(varchar(20), time_de, 120), 10), 2) = '"+data.day+"' ORDER by time_de ");
            }
            if(data.mstID_3 !=''){
              sessionStorage.setItem("queryString_3", commanQuery+" WHERE messstellen.mst_ID = '"+data.mstID_3+"' AND LEFT(CONVERT(varchar(20), time_de, 120), 4) = '"+data.year+"' AND RIGHT(LEFT(CONVERT(varchar(20), time_de, 120), 7), 2) = '"+data.month+"' AND RIGHT(LEFT(CONVERT(varchar(20), time_de, 120), 10), 2) = '"+data.day+"' ORDER by time_de ");
            }

            let dataMachine = new DataMachine();
            year = sessionStorage.getItem("year");
            monthArr = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
            month = sessionStorage.getItem("month");
            day = sessionStorage.getItem("day");
            nameDB = sessionStorage.getItem("nameDB");
            chartType = sessionStorage.getItem("chartType");
            displayMean = sessionStorage.getItem("displayMean");
            nameMst_1 = sessionStorage.getItem("nameMst_1");
            nameMst_2 = sessionStorage.getItem("nameMst_2");
            nameMst_3 = sessionStorage.getItem("nameMst_3");
            queryString_1 = sessionStorage.getItem("queryString_1");
            queryString_2 = sessionStorage.getItem("queryString_2");
            queryString_3 = sessionStorage.getItem("queryString_3");
            csOptions = null;
            let notes = [];
            let msts = [];

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
            } else if (chartType == "column") {
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
            $("#container").ejChart({
                palette: [ "#E94649", "#F6B53F", "#6FAAB0"],
                legend: {
                    position: "top"
                },
                //Initializing Primary X Axis
                primaryXAxis: {
                    title: {
                        text: "Tag"
                    },
                    labelIntersectAction : "rotate45"
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
            if (queryString_1 != "" && queryString_2 != "" && queryString_3 != "") {
                firstQuery();
                secondQuery();
                thirdQuery();
            } else if (queryString_1 != "" && queryString_2 != "") {
                firstQuery();
                secondQuery();
            } else if (queryString_1 != "") {
                firstQuery();
            } else {
                console.log("There're no query data!!");
            }

            const recordMask =
                a => [a.name, day + "." + month + "." + year + " " + a.x, a.y]

            function firstQuery() {
                dataMachine.runQuery("read", nameDB, queryString_1)
                    .then(JSON.parse)
                    .then(function (data) {
                        let dataTranslator = null,
                            chartData = [],
                            sumMonth = 0;

                        dataTranslator = new DataTranslator(TranslationType.ENERGY_DATA_01, data)

                        dataTranslator.sumHours()

                        // Translates the data to a format the charts understand
                        chartData = dataTranslator.translate(1)

                        // Updates the chart and gets the color of the current series as a return value
                        const [colorMst, series] = scpChart.updateChart(chartData)(nameMst_1)
                        msts.push([sessionStorage.getItem("mstID_1"), nameMst_1, colorMst])
                    });
            }

            function secondQuery() {
                dataMachine.runQuery("read", nameDB, queryString_2)
                    .then(JSON.parse)
                    .then(function (data) {
                        let dataTranslator = null,
                            chartData = [],
                            sumMonth = 0;
                        dataTranslator = new DataTranslator(TranslationType.ENERGY_DATA_01, data);

                        dataTranslator.sumHours()
                        chartData = dataTranslator.translate(1);

                        // Updates the chart and gets the color of the current series as a return value
                        const [colorMst2, series2] = scpChart.updateChart(chartData)(nameMst_2)
                        msts.push([sessionStorage.getItem("mstID_2"), nameMst_2, colorMst2])
                    });
            }

            function thirdQuery() {
                dataMachine.runQuery("read", nameDB, queryString_3)
                    .then(JSON.parse)
                    .then(function (data) {
                        let dataTranslator = null,
                            chartData = [],
                            sumMonth = 0;
                        dataTranslator = new DataTranslator(TranslationType.ENERGY_DATA_01, data);

                        dataTranslator.sumHours()
                        chartData = dataTranslator.translate(1);

                        // Updates the chart and gets the color of the current series as a return value
                        const [colorMst3, series3] = scpChart.updateChart(chartData)(nameMst_3)
                        msts.push([sessionStorage.getItem("mstID_3"), nameMst_3, colorMst3])
                    });
            }
         }
         if(type=='day15min'){
            sessionStorage.setItem("year", data.year);
            sessionStorage.setItem("month", data.month);
            sessionStorage.setItem("day", data.day);
            if(data.mstID_1 !=''){
              sessionStorage.setItem("queryString_1", commanQuery+" WHERE messstellen.mst_ID = '"+data.mstID_1+"' AND LEFT(CONVERT(varchar(20), time_de, 120), 4) = '"+data.year+"' AND RIGHT(LEFT(CONVERT(varchar(20), time_de, 120), 7), 2) = '"+data.month+"' AND RIGHT(LEFT(CONVERT(varchar(20), time_de, 120), 10), 2) = '"+data.day+"' ORDER by time_de ");
            }
            if(data.mstID_2 !=''){
              sessionStorage.setItem("queryString_2", commanQuery+" WHERE messstellen.mst_ID = '"+data.mstID_2+"' AND LEFT(CONVERT(varchar(20), time_de, 120), 4) = '"+data.year+"' AND RIGHT(LEFT(CONVERT(varchar(20), time_de, 120), 7), 2) = '"+data.month+"' AND RIGHT(LEFT(CONVERT(varchar(20), time_de, 120), 10), 2) = '"+data.day+"' ORDER by time_de ");
            }
            if(data.mstID_3 !=''){
              sessionStorage.setItem("queryString_3", commanQuery+" WHERE messstellen.mst_ID = '"+data.mstID_3+"' AND LEFT(CONVERT(varchar(20), time_de, 120), 4) = '"+data.year+"' AND RIGHT(LEFT(CONVERT(varchar(20), time_de, 120), 7), 2) = '"+data.month+"' AND RIGHT(LEFT(CONVERT(varchar(20), time_de, 120), 10), 2) = '"+data.day+"' ORDER by time_de ");
            }

            let dataMachine = new DataMachine();
            year = sessionStorage.getItem("year");
            monthArr = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober","November", "Dezember"];
            month = sessionStorage.getItem("month");
            day = sessionStorage.getItem("day");
            nameDB = sessionStorage.getItem("nameDB");
            chartType = sessionStorage.getItem("chartType");
            displayMean = sessionStorage.getItem("displayMean");
            nameMst_1 = sessionStorage.getItem("nameMst_1");
            nameMst_2 = sessionStorage.getItem("nameMst_2");
            nameMst_3 = sessionStorage.getItem("nameMst_3");
            queryString_1 = sessionStorage.getItem("queryString_1");
            queryString_2 = sessionStorage.getItem("queryString_2");
            queryString_3 = sessionStorage.getItem("queryString_3");
            csOptions = null;

            let notes = [];
            let msts = [];
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
                            height: 8,
                            width: 8
                        },
                        visible: true
                    }
                }
            }  else if (chartType == "column") {
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
                    }
                }
            $("#container").ejChart({
                palette: [ "#E94649", "#F6B53F", "#6FAAB0"],
                legend: {
                    position: "top"
                },
                //Initializing Primary X Axis
                primaryXAxis: {
                    title: {
                        text: "Uhrzeit"
                    },
                    labelIntersectAction : "rotate45"
                },
                //Initializing Primary Y Axis
                primaryYAxis: {
                    title: {
                        text: "Leistung[kW/15min]"
                    }
                },
                commonSeriesOptions: csOptions,
                series: []
            });

            if (queryString_1 != "" && queryString_2 != "" && queryString_3 != "") {
                firstQuery();
                secondQuery();
                thirdQuery();
            } else if (queryString_1 != "" && queryString_2 != "") {
                firstQuery();
                secondQuery();
            } else if (queryString_1 != "") {
                firstQuery();
            } else {
                console.log("There're no query data!!");
            }

            function firstQuery() {
                dataMachine.runQuery("read", nameDB, queryString_1)
                    .then(JSON.parse)
                    .then(function (data) {
                        let dataTranslator = null,
                            chartData = [],
                            sumDay = 0;
                        dataTranslator = new DataTranslator(TranslationType.ENERGY_DATA_01, data);

                        dataTranslator.sum15minsDay();
                        chartData = dataTranslator.translate(4);
                            updateChart(chartData, nameMst_1);
                    });
            }

            function secondQuery() {
                dataMachine.runQuery("read", nameDB, queryString_2)
                    .then(JSON.parse)
                    .then(function (data) {
                        let dataTranslator = null,
                            chartData = [],
                            sumDay = 0;
                        dataTranslator = new DataTranslator(TranslationType.ENERGY_DATA_01, data);

                        dataTranslator.sum15minsDay();
                        chartData = dataTranslator.translate(4);
                            updateChart(chartData, nameMst_2);
                    });
            }

            function thirdQuery() {
                dataMachine.runQuery("read", nameDB, queryString_3)
                    .then(JSON.parse)
                    .then(function (data) {
                        let dataTranslator = null,
                            chartData = [],
                            sumDay = 0;
                        dataTranslator = new DataTranslator(TranslationType.ENERGY_DATA_01, data);

                        dataTranslator.sum15minsDay();
                        chartData = dataTranslator.translate(4);
                            updateChart(chartData, nameMst_3);
                    });
            }

            function updateChart(newDataSeries, nameSeries) {
                let chart = $("#container").ejChart("instance");

                chart.model.series.push({
                    type: chartType,
                    name: nameSeries,
                    dataSource: newDataSeries,
                    xName: "x",
                    yName: "y",
                });
                chart.redraw();
            }

         }
         if(type=='week'){
          var startWeekData = data.startWeekDate.split("-");
          var endWeekData = data.endWeekDate.split("-");
          var startYear =startWeekData[0];
          var startWeeknumber =startWeekData[1].substring(1);
          var endYear =endWeekData[0];
          var endWeeknumber =endWeekData[1].substring(1);
          var startWeekDate= dateConvert(weekdate(startYear,startWeeknumber, 0));
          var endWeekDate= dateConvert(weekdate(endYear, endWeeknumber, 6));
          sessionStorage.setItem("startdate", data.startWeekDate);
          sessionStorage.setItem("enddate", data.endWeekDate);
          sessionStorage.setItem("startWeekYear", startYear);
          sessionStorage.setItem("endWeekYear", endYear);
          sessionStorage.setItem("startWeek", startWeeknumber);
          sessionStorage.setItem("endWeek", endWeeknumber);
          if(data.mstID_1 !=''){
            sessionStorage.setItem("queryString_1", "SELECT nameMSt AS Name, convert(varchar(20), time_de, 23) AS Convdate, CONVERT(varchar(20), time_de, 104) + ' ' + CONVERT(varchar(20), time_de, 108) AS Time, phase AS Phase, power as Value, wandlungsfaktorMsm AS ConvFactor FROM data_value_15m INNER JOIN channel ON data_value_15m.channel_id = channel.channel_id INNER JOIN messmittel ON data_value_15m.channel_id = messmittel.kanal1Msm OR data_value_15m.channel_id = messmittel.kanal2Msm OR data_value_15m.channel_id = messmittel.kanal3Msm INNER JOIN messstellen ON messmittel.mst_ID = messstellen.mst_ID WHERE messstellen.mst_ID = '"+data.mstID_1+"' AND convert(varchar(20), time_de, 23) >= '"+startWeekDate+"' AND convert(varchar(20), time_de, 23) <= '"+endWeekDate+"' ORDER by Time ");
          }
          if(data.mstID_2 !=''){
            sessionStorage.setItem("queryString_2", "SELECT nameMSt AS Name, convert(varchar(20), time_de, 23) AS Convdate, CONVERT(varchar(20), time_de, 104) + ' ' + CONVERT(varchar(20), time_de, 108) AS Time, phase AS Phase, power as Value, wandlungsfaktorMsm AS ConvFactor FROM data_value_15m INNER JOIN channel ON data_value_15m.channel_id = channel.channel_id INNER JOIN messmittel ON data_value_15m.channel_id = messmittel.kanal1Msm OR data_value_15m.channel_id = messmittel.kanal2Msm OR data_value_15m.channel_id = messmittel.kanal3Msm INNER JOIN messstellen ON messmittel.mst_ID = messstellen.mst_ID WHERE messstellen.mst_ID = '"+data.mstID_2+"' AND convert(varchar(20), time_de, 23) >= '"+startWeekDate+"' AND convert(varchar(20), time_de, 23) <= '"+endWeekDate+"' ORDER by Time ");
          }
          if(data.mstID_3 !=''){
            sessionStorage.setItem("queryString_3", "SELECT nameMSt AS Name, convert(varchar(20), time_de, 23) AS Convdate, CONVERT(varchar(20), time_de, 104) + ' ' + CONVERT(varchar(20), time_de, 108) AS Time, phase AS Phase, power as Value, wandlungsfaktorMsm AS ConvFactor FROM data_value_15m INNER JOIN channel ON data_value_15m.channel_id = channel.channel_id INNER JOIN messmittel ON data_value_15m.channel_id = messmittel.kanal1Msm OR data_value_15m.channel_id = messmittel.kanal2Msm OR data_value_15m.channel_id = messmittel.kanal3Msm INNER JOIN messstellen ON messmittel.mst_ID = messstellen.mst_ID WHERE messstellen.mst_ID = '"+data.mstID_3+"' AND convert(varchar(20), time_de, 23) >= '"+startWeekDate+"' AND convert(varchar(20), time_de, 23) <= '"+endWeekDate+"' ORDER by Time ");
          }

            let dataMachine = new DataMachine();
            year = sessionStorage.getItem("startWeekYear");
            monthArr = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
            month = sessionStorage.getItem("month");
            nameDB = sessionStorage.getItem("nameDB");
            chartType = sessionStorage.getItem("chartType");
            displayMean = sessionStorage.getItem("displayMean");
            nameMst_1 = sessionStorage.getItem("nameMst_1");
            nameMst_2 = sessionStorage.getItem("nameMst_2");
            nameMst_3 = sessionStorage.getItem("nameMst_3");
            queryString_1 = sessionStorage.getItem("queryString_1");
            queryString_2 = sessionStorage.getItem("queryString_2");
            queryString_3 = sessionStorage.getItem("queryString_3");
            startWeekDate = sessionStorage.getItem("startWeek");
            endWeekDate = sessionStorage.getItem("endWeek");
            startWeekYear = sessionStorage.getItem("startWeekYear");
            endWeekYear = sessionStorage.getItem("endWeekYear");
            csOptions = null;
            let notes = [];
            let msts = [];
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
            } else if (chartType == "column") {
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
            $("#container").ejChart({
                palette: [ "#E94649", "#F6B53F", "#6FAAB0"],
                legend: {
                    position: "top"
                },
                //Initializing Primary X Axis
                primaryXAxis: {
                    title: {
                        text: "Woche"
                    },
                        labelIntersectAction : "rotate45"
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

            function firstQuery() {
                dataMachine.runQuery("read", nameDB, queryString_1)
                    .then(JSON.parse)
                    .then(function (data) {
                        let dataTranslator = null,
                            chartData = [],
                            sumMonth = 0;

                        dataTranslator = new DataTranslator(TranslationType.ENERGY_DATA_01, data);
                      
                        dataTranslator.sumDaysWeek(startWeekDate, endWeekDate);
                        
                        // Translates the data to a format the charts understand
                        chartData = dataTranslator.translate(4);

                        let chartDataElement = [];
                        chartData.forEach(element => {
                            if (element.x != "" && element.y != 0) {
                                chartDataElement.push(element)
                            }
                        })
                        if(chartDataElement.length != 0){
                            // Updates the chart and gets the color of the current series as a return value
                            const [colorMst, series] = scpChart.updateChart(chartDataElement)(nameMst_1)
                            msts.push([sessionStorage.getItem("mstID_1"), nameMst_1, colorMst])
                        }
                    });
            }

            function secondQuery() {
                dataMachine.runQuery("read", nameDB, queryString_2)
                    .then(JSON.parse)
                    .then(function (data) {
                        let dataTranslator = null,
                            chartData = [],
                            sumMonth = 0;
                        dataTranslator = new DataTranslator(TranslationType.ENERGY_DATA_01, data);

                        dataTranslator.sumDaysWeek(startWeekDate, endWeekDate);
                        chartData = dataTranslator.translate(4);

                        let chartDataElement = [];
                        chartData.forEach(element => {
                            if (element.x != "" && element.y != 0) {
                                chartDataElement.push(element)
                            }
                        })
                        if(chartDataElement.length != 0){
                            // Updates the chart and gets the color of the current series as a return value
                            const [colorMst2, series2] = scpChart.updateChart(chartDataElement)(nameMst_2)
                            msts.push([sessionStorage.getItem("mstID_2"), nameMst_2, colorMst2])
                        }    
                    });
            }

            function thirdQuery() {
                dataMachine.runQuery("read", nameDB, queryString_3)
                    .then(JSON.parse)
                    .then(function (data) {
                        let dataTranslator = null,
                            chartData = [],
                            sumMonth = 0;
                        dataTranslator = new DataTranslator(TranslationType.ENERGY_DATA_01, data);

                        dataTranslator.sumDaysWeek(startWeekDate, endWeekDate);
                        chartData = dataTranslator.translate(4);

                        let chartDataElement = [];
                        chartData.forEach(element => {
                            if (element.x != "" && element.y != 0) {
                                chartDataElement.push(element)
                            }
                        })
                        if(chartDataElement.length != 0){
                            // Updates the chart and gets the color of the current series as a return value
                            const [colorMst3, series3] = scpChart.updateChart(chartDataElement)(nameMst_3)
                            msts.push([sessionStorage.getItem("mstID_3"), nameMst_3, colorMst3])
                        }    
                    });
            }
            function getMonthName(week, year) {
                let d = new Date(year, 0, 1 + (week) * 7);
                d.getUTCDay() < 5 ? d.setUTCDate(d.getUTCDate() - d.getUTCDay() + 1) : d.setUTCDate(d.getUTCDate() + 8 - d.getUTCDay());
                return ("" + d).split(" ")[1];
            }   

            const formatComma = num => 
                String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, '$1.')
            ;
         }
         if(type=='custom'){
            if(!$("#container").is(':empty')){
                $("#container").ejChart("destroy");
            }
            sessionStorage.setItem("from", data.from_date);
            sessionStorage.setItem("to", data.to_date);
            if(data.mstID_1 !=''){
              sessionStorage.setItem("queryString_1", commanQuery+" WHERE messstellen.mst_ID = '"+data.mstID_1+"' AND time_de BETWEEN '"+data.from_date+"' AND '"+data.to_date+"' ORDER by time_de ");
            }
            if(data.mstID_2 !=''){
              sessionStorage.setItem("queryString_2", commanQuery+" WHERE messstellen.mst_ID = '"+data.mstID_2+"' AND time_de BETWEEN '"+data.from_date+"' AND '"+data.to_date+"' ORDER by time_de ");
            }
            if(data.mstID_3 !=''){
              sessionStorage.setItem("queryString_3", commanQuery+" WHERE messstellen.mst_ID = '"+data.mstID_3+"' AND time_de BETWEEN '"+data.from_date+"' AND '"+data.to_date+"' ORDER by time_de ");
            }

            let dataMachine = new DataMachine();
            from = sessionStorage.getItem("from");
            to = sessionStorage.getItem("to");
            nameDB = sessionStorage.getItem("nameDB");
            chartType = sessionStorage.getItem("chartType");
            displayMean = sessionStorage.getItem("displayMean");
            nameMst_1 = sessionStorage.getItem("nameMst_1");
            nameMst_2 = sessionStorage.getItem("nameMst_2");
            nameMst_3 = sessionStorage.getItem("nameMst_3");
            queryString_1 = sessionStorage.getItem("queryString_1");
            queryString_2 = sessionStorage.getItem("queryString_2");
            queryString_3 = sessionStorage.getItem("queryString_3");
            csOptions = null;
            if(chartType == "line"){
                csOptions = {
                  tooltip: {
                    visible : true
                  }
                }
            }
            else {
                csOptions = {
                  tooltip: {
                    visible : true
                  },
                    border : {width: 2},
                }
            }
            $("#container").ejChart({
                palette: [ "#E94649", "#F6B53F", "#6FAAB0"],
                legend: {
                  position: "top"
                },
                //Initializing Primary X Axis
                primaryXAxis: {
                  title: {
                    text: "Datum / Uhrzeit"
                  },
                  labelIntersectAction : "rotate45",
                  desiredIntervals: 8
                },
                //Initializing Primary Y Axis
                primaryYAxis: {
                  title: {
                    text: "Leistung[kW/15min]"
                  }
                 },
                  commonSeriesOptions: csOptions,
                  series: [],
                  zooming :{
                    enable: false,
                    enablePinching: false,
                    enableDeferredZoom : false,
                    enableScrollbar : false,
                    enableMouseWheel : false
                  }
                });
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
                .then(function(data){
                  let jsonData = JSON.parse(data);
                  return jsonData;
                })
                .then(function(data){
                  let dataTranslator = null,
                      chartData = [],
                      sumBenDef = 0;
                  if(nameDB == "001_heco" || /*nameDB == "002_badber" || */nameDB == "003_tauchzor"){
                    dataTranslator = new DataTranslator(TranslationType.ENERGY_DATA_02, data);
                  }
                  else {
                    dataTranslator = new DataTranslator(TranslationType.ENERGY_DATA_01, data);
                  }
                  dataTranslator.sum15minsBenDef();
                  chartData = dataTranslator.translate(1);
                   updateChart(chartData, nameMst_1);
                });
            }

            function secondQuery(){
                dataMachine.runQuery("read", nameDB, queryString_2)
                .then(function(data){
                  let jsonData = JSON.parse(data);
                  return jsonData;
                })
                .then(function(data){
                  let dataTranslator = null,
                      chartData = [],
                      sumBenDef = 0;
                  if(nameDB == "001_heco" || /*nameDB == "002_badber" || */ nameDB == "003_tauchzor"){
                    dataTranslator = new DataTranslator(TranslationType.ENERGY_DATA_02, data);
                  }
                  else {
                    dataTranslator = new DataTranslator(TranslationType.ENERGY_DATA_01, data);
                  }

                  dataTranslator.sum15minsBenDef();
                  chartData = dataTranslator.translate(1);
                    updateChart(chartData, nameMst_2);
                });
            }

            function thirdQuery(){
                dataMachine.runQuery("read", nameDB, queryString_3)
                .then(function(data){
                  let jsonData = JSON.parse(data);
                  return jsonData;
                })
                .then(function(data){
                  let dataTranslator = null,
                      chartData = [],
                      sumBenDef = 0;
                  if(nameDB == "001_heco" || /*nameDB == "002_badber" || */nameDB == "003_tauchzor"){
                    dataTranslator = new DataTranslator(TranslationType.ENERGY_DATA_02, data);
                  }
                  else {
                    dataTranslator = new DataTranslator(TranslationType.ENERGY_DATA_01, data);
                  }
                  dataTranslator.sum15minsBenDef();
                  chartData = dataTranslator.translate(1);
                    updateChart(chartData, nameMst_3);
                });
            }
            function updateChart(newDataSeries, nameSeries){
                let chart = $("#container").ejChart("instance");

                chart.model.series.push({
                  type: chartType,
                  name: nameSeries,
                  dataSource: newDataSeries,
                  xName: "x",
                  yName: "y",
                });
                chart.redraw();
            }
          }
          ////
      }
      ////
      if(type=='year2' || type=='month2' || type=='month15min2' || type=='day2' || type=='day15min2' || type=='week2' || type=='custom2'){
        sessionStorage.clear();
        sessionStorage.setItem("nameDB", data.nameDB);
        sessionStorage.setItem("chartType", data.chartType);
        sessionStorage.setItem("nameMst", data.nameMst);
        sessionStorage.setItem("mstID_1", data.mstID);
         if(type=='year2'){
            sessionStorage.setItem("year_1", data.year_1);
            sessionStorage.setItem("year_2", data.year_2);
            sessionStorage.setItem("year_3", data.year_3);
            if(data.year_1 !=''){
              sessionStorage.setItem("queryString_1", commanQuery+" WHERE messstellen.mst_ID = '"+data.mstID+"' AND LEFT(CONVERT(varchar(20), time_de, 120), 4) = '"+data.year_1+"' ORDER by time_de ");
            }
            if(data.year_2 !=''){
              sessionStorage.setItem("queryString_2", commanQuery+" WHERE messstellen.mst_ID = '"+data.mstID+"' AND LEFT(CONVERT(varchar(20), time_de, 120), 4) = '"+data.year_2+"' ORDER by time_de ");
            }
            if(data.year_3 !=''){
              sessionStorage.setItem("queryString_3", commanQuery+" WHERE messstellen.mst_ID = '"+data.mstID+"' AND LEFT(CONVERT(varchar(20), time_de, 120), 4) = '"+data.year_3+"' ORDER by time_de ");
            }

            let dataMachine = new DataMachine();
            const year_1 = sessionStorage.getItem("year_1");
            const year_2 = sessionStorage.getItem("year_2");
            const year_3 = sessionStorage.getItem("year_3");

            const nameDB = sessionStorage.getItem("nameDB");
            const chartType = sessionStorage.getItem("chartType");
            const displayMean = sessionStorage.getItem("displayMean");
            const nameMst = sessionStorage.getItem("nameMst");

            const queryString_1 = sessionStorage.getItem("queryString_1");
            const queryString_2 = sessionStorage.getItem("queryString_2");
            const queryString_3 = sessionStorage.getItem("queryString_3");

            let csOptions = null;

            let notes = [];
            let msts = []; 
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
            } else if (chartType == "column") {
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
            $("#container").ejChart({
                palette: [ "#E94649", "#F6B53F", "#6FAAB0"],
                legend: {
                    position: "top"
                },
                //Initializing Primary X Axis
                primaryXAxis: {
                    title: {
                        text: "Monat"
                    },
                    labelIntersectAction : "rotate0"
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
                    let dataTranslator = null
                    let chartData = []
                    const recordMask =
                        a => [a.name, a.x + "." + year_1 , a.y]
                    dataTranslator = new DataTranslator(TranslationType.ENERGY_DATA_01, data)
                    dataTranslator.sumMonths()
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
                            element.name=nameMst;       
                        }else{
                            element.x=element.x;
                            element.name=nameMst;   
                        }
                        i++;
                    })
                    // Updates the chart and gets the color of the current series as a return value
                    const [ colorMst, series ] = scpChart.updateChart(chartData)(year_1);
                    msts.push([sessionStorage.getItem("mstID_1"), nameMst, colorMst]);
                });
            }

            function secondQuery(){
                dataMachine.runQuery("read", nameDB, queryString_2)
                .then(JSON.parse)
                .then(function(data){
                    let dataTranslator = null
                    let chartData = []
                    const recordMask =
                        a => [a.name, a.x + "." + year_2 , a.y]
                    dataTranslator = new DataTranslator(TranslationType.ENERGY_DATA_01, data);
                    dataTranslator.sumMonths();
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
                            element.name=nameMst;        
                        }else{
                            element.x=element.x;
                            element.name=nameMst;   
                        }
                        i++;
                    })
                    // Updates the chart and gets the color of the current series as a return value
                    const [ colorMst2, series2 ] = scpChart.updateChart(chartData)(year_2);
                    msts.push([sessionStorage.getItem("mstID_1"), nameMst, colorMst2]);
                });
            }

            function thirdQuery(){
                dataMachine.runQuery("read", nameDB, queryString_3)
                .then(JSON.parse)
                .then(function(data) {
                    let dataTranslator = null
                    let chartData = []
                    const recordMask =
                        a => [a.name, a.x + "." + year_3 , a.y]
                    dataTranslator = new DataTranslator(TranslationType.ENERGY_DATA_01, data);
                    dataTranslator.sumMonths()
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
                            element.name=nameMst;
                        }else{
                        element.x=element.x; 
                        element.name=nameMst;  
                        }
                        i++;
                    })
                    // Updates the chart and gets the color of the current series as a return value
                    const [ colorMst3, series3 ] = scpChart.updateChart(chartData)(year_3);
                    msts.push([sessionStorage.getItem("mstID_1"), nameMst, colorMst3]);
                });
            } 
         }
         if(type=='month2'){
            sessionStorage.setItem("year_1", data.year_1);
            sessionStorage.setItem("year_2", data.year_2);
            sessionStorage.setItem("year_3", data.year_3);
            sessionStorage.setItem("month_1", data.month_1);
            sessionStorage.setItem("month_2", data.month_2);
            sessionStorage.setItem("month_3", data.month_3);
            if(data.year_1 !=''){
              sessionStorage.setItem("queryString_1", commanQuery+" WHERE messstellen.mst_ID = '"+data.mstID+"' AND LEFT(CONVERT(varchar(20), time_de, 120), 4) = '"+data.year_1+"' AND RIGHT(LEFT(CONVERT(varchar(20), time_de, 120), 7), 2) = '"+data.month_1+"' ORDER by time_de ");
            }
            if(data.year_2 !=''){
              sessionStorage.setItem("queryString_2", commanQuery+" WHERE messstellen.mst_ID = '"+data.mstID+"' AND LEFT(CONVERT(varchar(20), time_de, 120), 4) = '"+data.year_2+"' AND RIGHT(LEFT(CONVERT(varchar(20), time_de, 120), 7), 2) = '"+data.month_2+"' ORDER by time_de ");
            }
            if(data.year_3 !=''){
              sessionStorage.setItem("queryString_3", commanQuery+" WHERE messstellen.mst_ID = '"+data.mstID+"' AND LEFT(CONVERT(varchar(20), time_de, 120), 4) = '"+data.year_3+"' AND RIGHT(LEFT(CONVERT(varchar(20), time_de, 120), 7), 2) = '"+data.month_3+"' ORDER by time_de ");
            }
            let dataMachine = new DataMachine();
            const year_1 = sessionStorage.getItem("year_1");
            const year_2 = sessionStorage.getItem("year_2");
            const year_3 = sessionStorage.getItem("year_3");

            const monthArr = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];

            const month_1 = sessionStorage.getItem("month_1");
            const month_2 = sessionStorage.getItem("month_2");
            const month_3 = sessionStorage.getItem("month_3");

            const nameDB = sessionStorage.getItem("nameDB");
            const chartType = sessionStorage.getItem("chartType");
            const displayMean = sessionStorage.getItem("displayMean");
            const nameMst = sessionStorage.getItem("nameMst");

            const queryString_1 = sessionStorage.getItem("queryString_1");
            const queryString_2 = sessionStorage.getItem("queryString_2");
            const queryString_3 = sessionStorage.getItem("queryString_3");
            let csOptions = null;
            let notes = [];
            let msts = [];
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
            $("#container").ejChart({
                palette: [ "#E94649", "#F6B53F", "#6FAAB0"],
                legend: {
                    position: "top"
                },
                //Initializing Primary X Axis
                primaryXAxis: {
                    title: {
                        text: "Tag"
                    },
                    labelIntersectAction : "rotate0"
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
                    msts.push([sessionStorage.getItem("mstID_1"), nameMst, colorMst])
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
                    msts.push([sessionStorage.getItem("mstID_1"), nameMst, colorMst2])   
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
                    msts.push([sessionStorage.getItem("mstID_1"), nameMst, colorMst3])
                });
            }
         }
         if(type=='month15min2'){
            if(!$("#container").is(':empty')){
                $("#container").ejChart("destroy");
            }
            sessionStorage.setItem("year_1", data.year_1);
            sessionStorage.setItem("year_2", data.year_2);
            sessionStorage.setItem("year_3", data.year_3);
            sessionStorage.setItem("month_1", data.month_1);
            sessionStorage.setItem("month_2", data.month_2);
            sessionStorage.setItem("month_3", data.month_3);
            if(data.year_1 !=''){
              sessionStorage.setItem("queryString_1", commanQuery+" WHERE messstellen.mst_ID = '"+data.mstID+"' AND LEFT(CONVERT(varchar(20), time_de, 120), 4) = '"+data.year_1+"' AND RIGHT(LEFT(CONVERT(varchar(20), time_de, 120), 7), 2) = '"+data.month_1+"' ORDER by time_de ");
            }
            if(data.year_2 !=''){
              sessionStorage.setItem("queryString_2", commanQuery+" WHERE messstellen.mst_ID = '"+data.mstID+"' AND LEFT(CONVERT(varchar(20), time_de, 120), 4) = '"+data.year_2+"' AND RIGHT(LEFT(CONVERT(varchar(20), time_de, 120), 7), 2) = '"+data.month_2+"' ORDER by time_de ");
            }
            if(data.year_3 !=''){
              sessionStorage.setItem("queryString_3", commanQuery+" WHERE messstellen.mst_ID = '"+data.mstID+"' AND LEFT(CONVERT(varchar(20), time_de, 120), 4) = '"+data.year_3+"' AND RIGHT(LEFT(CONVERT(varchar(20), time_de, 120), 7), 2) = '"+data.month_3+"' ORDER by time_de ");
            }

            let dataMachine = new DataMachine();
            year_1 = sessionStorage.getItem("year_1");
            year_2 = sessionStorage.getItem("year_2");
            year_3 = sessionStorage.getItem("year_3");
            monthArr = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober",
                "November", "Dezember"];
            month_1 = sessionStorage.getItem("month_1");
            month_2 = sessionStorage.getItem("month_2");
            month_3 = sessionStorage.getItem("month_3");
            nameDB = sessionStorage.getItem("nameDB");
            chartType = sessionStorage.getItem("chartType");
            displayMean = sessionStorage.getItem("displayMean");
            nameMst = sessionStorage.getItem("nameMst");
            queryString_1 = sessionStorage.getItem("queryString_1");
            queryString_2 = sessionStorage.getItem("queryString_2");
            queryString_3 = sessionStorage.getItem("queryString_3");
            csOptions = null;
            if (chartType == "line") {
                csOptions = {
                    tooltip: {
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
                }
            }
            $("#container").ejChart({
                palette: [ "#E94649", "#F6B53F", "#6FAAB0"],
                legend: {
                    position: "top"
                },
                //Initializing Primary X Axis
                primaryXAxis: {
                    title: {
                        text: "Datum / Uhrzeit"
                    },
                    labelIntersectAction : "rotate45",
                    desiredIntervals: 8
                },
                //Initializing Primary Y Axis
                primaryYAxis: {
                    title: {
                        text: "Leistung[kW/15min]"
                    }
                },
                commonSeriesOptions: csOptions,
                series: [],
                zooming: {
                    enable: false,
                    enablePinching: false,
                    enableDeferredZoom: false,
                    enableScrollbar: false,
                    enableMouseWheel: false
                }
            });
            if (queryString_1 != "" && queryString_2 != "" && queryString_3 != "") {
                firstQuery();
                secondQuery();
                thirdQuery();
            } else if (queryString_1 != "" && queryString_2 != "") {
                firstQuery();
                secondQuery();
            } else if (queryString_1 != "") {
                firstQuery();
            } else {
                console.log("There're no query data!!");
            }
            function firstQuery() {
                dataMachine.runQuery("read", nameDB, queryString_1)
                    .then(JSON.parse)
                    .then(function (data) {
                        let dataTranslator = null,
                            chartData = [],
                            sumMonth = 0;
                        dataTranslator = new DataTranslator(TranslationType.ENERGY_DATA_01, data);
                        dataTranslator.sum15minsMonth(year_1, month_1);
                        chartData = dataTranslator.translate(1);
                            updateChart(chartData, month_1 + "." + year_1);
                    });
            }

            function secondQuery() {
                dataMachine.runQuery("read", nameDB, queryString_2)
                    .then(JSON.parse)
                    .then(function (data) {
                        let dataTranslator = null,
                            chartData = [],
                            sumMonth = 0;
                        dataTranslator = new DataTranslator(TranslationType.ENERGY_DATA_01, data);
                        dataTranslator.sum15minsMonth(year_2, month_2);
                        chartData = dataTranslator.translate(1);
                            updateChart(chartData, month_2 + "." + year_2);  
                    });
            }

            function thirdQuery() {
                dataMachine.runQuery("read", nameDB, queryString_3)
                    .then(JSON.parse)
                    .then(function (data) {
                        let dataTranslator = null,
                            chartData = [],
                            sumMonth = 0;
                        dataTranslator = new DataTranslator(TranslationType.ENERGY_DATA_01, data);
                        dataTranslator.sum15minsMonth(year_3, month_3);
                        chartData = dataTranslator.translate(1);
                            updateChart(chartData, month_3 + "." + year_3);
                    });
            }
            function updateChart(newDataSeries, nameSeries) {
                let chart = $("#container").ejChart("instance");

                chart.model.series.push({
                    type: chartType,
                    name: nameSeries,
                    dataSource: newDataSeries,
                    xName: "x",
                    yName: "y",
                });
                chart.redraw();
            }
         }
         if(type=='day2'){
            sessionStorage.setItem("year_1", data.year_1);
            sessionStorage.setItem("year_2", data.year_2);
            sessionStorage.setItem("year_3", data.year_3);
            sessionStorage.setItem("month_1", data.month_1);
            sessionStorage.setItem("month_2", data.month_2);
            sessionStorage.setItem("month_3", data.month_3);
            sessionStorage.setItem("day_1", data.day_1);
            sessionStorage.setItem("day_2", data.day_2);
            sessionStorage.setItem("day_3", data.day_3);
            if(data.year_1 !=''){
              sessionStorage.setItem("queryString_1", commanQuery+" WHERE messstellen.mst_ID = '"+data.mstID+"' AND LEFT(CONVERT(varchar(20), time_de, 120), 4) = '"+data.year_1+"' AND RIGHT(LEFT(CONVERT(varchar(20), time_de, 120), 7), 2) = '"+data.month_1+"' AND RIGHT(LEFT(CONVERT(varchar(20), time_de, 120), 10), 2) = '"+data.day_1+"' ORDER by time_de ");
            }
            if(data.year_2 !=''){
              sessionStorage.setItem("queryString_2", commanQuery+" WHERE messstellen.mst_ID = '"+data.mstID+"' AND LEFT(CONVERT(varchar(20), time_de, 120), 4) = '"+data.year_2+"' AND RIGHT(LEFT(CONVERT(varchar(20), time_de, 120), 7), 2) = '"+data.month_2+"' AND RIGHT(LEFT(CONVERT(varchar(20), time_de, 120), 10), 2) = '"+data.day_2+"' ORDER by time_de ");
            }
            if(data.year_3 !=''){
              sessionStorage.setItem("queryString_3", commanQuery+" WHERE messstellen.mst_ID = '"+data.mstID+"' AND LEFT(CONVERT(varchar(20), time_de, 120), 4) = '"+data.year_3+"' AND RIGHT(LEFT(CONVERT(varchar(20), time_de, 120), 7), 2) = '"+data.month_3+"' AND RIGHT(LEFT(CONVERT(varchar(20), time_de, 120), 10), 2) = '"+data.day_3+"' ORDER by time_de ");
            }

            let dataMachine = new DataMachine();
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

            $("#container").ejChart({
                palette: [ "#E94649", "#F6B53F", "#6FAAB0"],
                legend: {
                    position: "top"
                },
                //Initializing Primary X Axis
                primaryXAxis: {
                    title: {
                        text: "Tag"
                    },
                    labelIntersectAction : "rotate45"
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
                    //day series
                    let i=0;
                    chartData.forEach(element => {
                        if(element.x==""){
                        if(i < 10){
                                element.x='0'+i+':00';        
                            }else{
                                element.x=i+':00';    
                            }       
                        }else{
                            element.x=element.x;   
                        }
                        i++;
                    })
                    // Updates the chart and gets the color of the current series as a return value
                    const [ colorDay, series ] = scpChart.updateChart(chartData)(day_1 + "." + month_1 + "." + year_1)
                    msts.push([sessionStorage.getItem("mstID_1"), nameMst, colorDay])
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
                    //day series
                    let i=0;
                    chartData.forEach(element => {
                        if(element.x==""){
                        if(i < 10){
                                element.x='0'+i+':00';        
                            }else{
                                element.x=i+':00';    
                            }       
                        }else{
                            element.x=element.x;   
                        }
                        i++;
                    })
                    // Updates the chart and gets the color of the current series as a return value
                    const [ colorDay2, series2 ] = scpChart.updateChart(chartData)(day_2 + "." + month_2 + "." + year_2)
                    msts.push([sessionStorage.getItem("mstID_1"), nameMst, colorDay2])
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
                    //day series
                    let i=0;
                    chartData.forEach(element => {
                        if(element.x==""){
                        if(i < 10){
                                element.x='0'+i+':00';        
                            }else{
                                element.x=i+':00';    
                            }       
                        }else{
                            element.x=element.x;   
                        }
                        i++;
                    })
                    // Updates the chart and gets the color of the current series as a return value
                    const [ colorDay3, series3 ] = scpChart.updateChart(chartData)(day_3 + "." + month_3 + "." + year_3)
                    msts.push([sessionStorage.getItem("mstID_1"), nameMst, colorDay3])
                })
            }
         }
         if(type=='day15min2'){
            sessionStorage.setItem("year_1", data.year_1);
            sessionStorage.setItem("year_2", data.year_2);
            sessionStorage.setItem("year_3", data.year_3);
            sessionStorage.setItem("month_1", data.month_1);
            sessionStorage.setItem("month_2", data.month_2);
            sessionStorage.setItem("month_3", data.month_3);
            sessionStorage.setItem("day_1", data.day_1);
            sessionStorage.setItem("day_2", data.day_2);
            sessionStorage.setItem("day_3", data.day_3);
            if(data.year_1 !=''){
              sessionStorage.setItem("queryString_1", commanQuery+" WHERE messstellen.mst_ID = '"+data.mstID+"' AND LEFT(CONVERT(varchar(20), time_de, 120), 4) = '"+data.year_1+"' AND RIGHT(LEFT(CONVERT(varchar(20), time_de, 120), 7), 2) = '"+data.month_1+"' AND RIGHT(LEFT(CONVERT(varchar(20), time_de, 120), 10), 2) = '"+data.day_1+"' ORDER by time_de ");
            }
            if(data.year_2 !=''){
              sessionStorage.setItem("queryString_2", commanQuery+" WHERE messstellen.mst_ID = '"+data.mstID+"' AND LEFT(CONVERT(varchar(20), time_de, 120), 4) = '"+data.year_2+"' AND RIGHT(LEFT(CONVERT(varchar(20), time_de, 120), 7), 2) = '"+data.month_2+"' AND RIGHT(LEFT(CONVERT(varchar(20), time_de, 120), 10), 2) = '"+data.day_2+"' ORDER by time_de ");
            }
            if(data.year_3 !=''){
              sessionStorage.setItem("queryString_3", commanQuery+" WHERE messstellen.mst_ID = '"+data.mstID+"' AND LEFT(CONVERT(varchar(20), time_de, 120), 4) = '"+data.year_3+"' AND RIGHT(LEFT(CONVERT(varchar(20), time_de, 120), 7), 2) = '"+data.month_3+"' AND RIGHT(LEFT(CONVERT(varchar(20), time_de, 120), 10), 2) = '"+data.day_3+"' ORDER by time_de ");
            }

            let dataMachine = new DataMachine();
            year_1 = sessionStorage.getItem("year_1");
            year_2 = sessionStorage.getItem("year_2");
            year_3 = sessionStorage.getItem("year_3");
            monthArr = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober","November", "Dezember"];
            month_1 = sessionStorage.getItem("month_1");
            month_2 = sessionStorage.getItem("month_2");
            month_3 = sessionStorage.getItem("month_3");
            day_1 = sessionStorage.getItem("day_1");
            day_2 = sessionStorage.getItem("day_2");
            day_3 = sessionStorage.getItem("day_3");
            nameDB = sessionStorage.getItem("nameDB");
            chartType = sessionStorage.getItem("chartType");
            displayMean = sessionStorage.getItem("displayMean");
            nameMst = sessionStorage.getItem("nameMst");

            queryString_1 = sessionStorage.getItem("queryString_1");
            queryString_2 = sessionStorage.getItem("queryString_2");
            queryString_3 = sessionStorage.getItem("queryString_3");
            csOptions = null;
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
                            height: 8,
                            width: 8
                        },
                        visible: true
                    }
                }
            }  else if (chartType == "column") {
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
                }
            }
            $("#container").ejChart({
                palette: [ "#E94649", "#F6B53F", "#6FAAB0"],
                legend: {
                    position: "top"
                },
                //Initializing Primary X Axis
                primaryXAxis: {
                    title: {
                        text: "Uhrzeit"
                    },
                    labelIntersectAction : "rotate45"
                },
                //Initializing Primary Y Axis
                primaryYAxis: {
                    title: {
                        text: "Leistung[kW/15min]"
                    }
                },
                commonSeriesOptions: csOptions,
                series: []
            });

            if (queryString_1 != "" && queryString_2 != "" && queryString_3 != "") {
                firstQuery();
                secondQuery();
                thirdQuery();
            } else if (queryString_1 != "" && queryString_2 != "") {
                firstQuery();
                secondQuery();
            } else if (queryString_1 != "") {
                firstQuery();
            } else {
                console.log("There're no query data!!");
            }

            function firstQuery() {
                dataMachine.runQuery("read", nameDB, queryString_1)
                    .then(JSON.parse)
                    .then(function (data) {
                        let dataTranslator = null,
                            chartData = [],
                            sumDay = 0;
                        dataTranslator = new DataTranslator(TranslationType.ENERGY_DATA_01, data);
                        dataTranslator.sum15minsDay();
                        chartData = dataTranslator.translate(1);
                            updateChart(chartData, day_1 + "." + month_1 + "." + year_1);
                    });
            }

            function secondQuery() {
                dataMachine.runQuery("read", nameDB, queryString_2)
                    .then(JSON.parse)
                    .then(function (data) {
                        let dataTranslator = null,
                            chartData = [],
                            sumDay = 0;
                        dataTranslator = new DataTranslator(TranslationType.ENERGY_DATA_01, data);
                        dataTranslator.sum15minsDay();
                        chartData = dataTranslator.translate(1);
                            updateChart(chartData, day_2 + "." + month_2 + "." + year_2);
                    });
            }

            function thirdQuery() {
                dataMachine.runQuery("read", nameDB, queryString_3)
                    .then(JSON.parse)
                    .then(function (data) {
                        let dataTranslator = null,
                            chartData = [],
                            sumDay = 0;
                        dataTranslator = new DataTranslator(TranslationType.ENERGY_DATA_01, data);
                        dataTranslator.sum15minsDay();
                        chartData = dataTranslator.translate(1);
                            updateChart(chartData, day_3 + "." + month_3 + "." + year_3);
                    });
            }
            function updateChart(newDataSeries, nameSeries) {
                let chart = $("#container").ejChart("instance");

                chart.model.series.push({
                    type: chartType,
                    name: nameSeries,
                    dataSource: newDataSeries,
                    xName: "x",
                    yName: "y",
                });
                chart.redraw();
            }
         }
         if(type=='week2'){
          var startWeekData1 = data.startWeekDate1.split("-");
          var endWeekData1 = data.endWeekDate1.split("-");
          var startYear1 =startWeekData1[0];
          var startWeeknumber1 =startWeekData1[1].substring(1);
          var endYear1 =endWeekData1[0];
          var endWeeknumber1 =endWeekData1[1].substring(1);
          var startWeekDate1= dateConvert(weekdate(startYear1,startWeeknumber1, 0));
          var endWeekDate1= dateConvert(weekdate(endYear1, endWeeknumber1, 6));

          var startWeekData2 = data.startWeekDate2.split("-");
          var endWeekData2 = data.endWeekDate2.split("-");
          var startYear2 =startWeekData2[0];
          var startWeeknumber2 =startWeekData2[1].substring(1);
          var endYear2 =endWeekData2[0];
          var endWeeknumber2 =endWeekData2[1].substring(1);
          var startWeekDate2= dateConvert(weekdate(startYear2,startWeeknumber2, 0));
          var endWeekDate2= dateConvert(weekdate(endYear2, endWeeknumber2, 6));

          var startWeekData3 = data.startWeekDate3.split("-");
          var endWeekData3 = data.endWeekDate3.split("-");
          var startYear3 =startWeekData3[0];
          var startWeeknumber3 =startWeekData3[1].substring(1);
          var endYear3 =endWeekData3[0];
          var endWeeknumber3 =endWeekData3[1].substring(1);
          var startWeekDate3= dateConvert(weekdate(startYear3,startWeeknumber3, 0));
          var endWeekDate3= dateConvert(weekdate(endYear3, endWeeknumber3, 6));
          sessionStorage.setItem("mstID_1", data.mstID_1);
          sessionStorage.setItem("startdate1", data.startWeekDate1);
          sessionStorage.setItem("enddate1", data.endWeekDate1);
          sessionStorage.setItem("startWeekYear1", startYear1);
          sessionStorage.setItem("endWeekYear1", endYear1);
          sessionStorage.setItem("startWeek1", startWeeknumber1);
          sessionStorage.setItem("endWeek1", endWeeknumber1);

          sessionStorage.setItem("startdate2", data.startWeekDate2);
          sessionStorage.setItem("enddate2", data.endWeekDate2);
          sessionStorage.setItem("startWeekYear2", startYear2);
          sessionStorage.setItem("endWeekYear2", endYear2);
          sessionStorage.setItem("startWeek2", startWeeknumber2);
          sessionStorage.setItem("endWeek2", endWeeknumber2);

          sessionStorage.setItem("startdate3", data.startWeekDate3);
          sessionStorage.setItem("enddate3", data.endWeekDate3);
          sessionStorage.setItem("startWeekYear3", startYear3);
          sessionStorage.setItem("endWeekYear3", endYear3);
          sessionStorage.setItem("startWeek3", startWeeknumber3);
          sessionStorage.setItem("endWeek3", endWeeknumber3);
          if(startWeekDate1 !='' && endWeekDate1 !=''){
            sessionStorage.setItem("queryString_1", "SELECT nameMSt AS Name, convert(varchar(20), time_de, 23) AS Convdate, CONVERT(varchar(20), time_de, 104) + ' ' + CONVERT(varchar(20), time_de, 108) AS Time, phase AS Phase, power AS Value, wandlungsfaktorMsm AS ConvFactor FROM data_value_15m INNER JOIN channel ON data_value_15m.channel_id = channel.channel_id INNER JOIN messmittel ON data_value_15m.channel_id = messmittel.kanal1Msm OR data_value_15m.channel_id = messmittel.kanal2Msm OR data_value_15m.channel_id = messmittel.kanal3Msm INNER JOIN messstellen ON messmittel.mst_ID = messstellen.mst_ID WHERE messstellen.mst_ID = '"+data.mstID_1+"' AND convert(varchar(20), time_de, 23) >= '"+startWeekDate1+"' AND convert(varchar(20), time_de, 23) <= '"+endWeekDate1+"' ORDER by time_de");
          }
          if(startWeekDate2 !='' && endWeekDate2 !=''){
            sessionStorage.setItem("queryString_2", "SELECT nameMSt AS Name, convert(varchar(20), time_de, 23) AS Convdate, CONVERT(varchar(20), time_de, 104) + ' ' + CONVERT(varchar(20), time_de, 108) AS Time, phase AS Phase, power AS Value, wandlungsfaktorMsm AS ConvFactor FROM data_value_15m INNER JOIN channel ON data_value_15m.channel_id = channel.channel_id INNER JOIN messmittel ON data_value_15m.channel_id = messmittel.kanal1Msm OR data_value_15m.channel_id = messmittel.kanal2Msm OR data_value_15m.channel_id = messmittel.kanal3Msm INNER JOIN messstellen ON messmittel.mst_ID = messstellen.mst_ID WHERE messstellen.mst_ID = '"+data.mstID_1+"' AND convert(varchar(20), time_de, 23) >= '"+startWeekDate2+"' AND convert(varchar(20), time_de, 23) <= '"+endWeekDate2+"' ORDER by time_de");
          }
          if(startWeekDate3 !='' && endWeekDate3 !=''){
            sessionStorage.setItem("queryString_3", "SELECT nameMSt AS Name, convert(varchar(20), time_de, 23) AS Convdate, CONVERT(varchar(20), time_de, 104) + ' ' + CONVERT(varchar(20), time_de, 108) AS Time, phase AS Phase, power AS Value, wandlungsfaktorMsm AS ConvFactor FROM data_value_15m INNER JOIN channel ON data_value_15m.channel_id = channel.channel_id INNER JOIN messmittel ON data_value_15m.channel_id = messmittel.kanal1Msm OR data_value_15m.channel_id = messmittel.kanal2Msm OR data_value_15m.channel_id = messmittel.kanal3Msm INNER JOIN messstellen ON messmittel.mst_ID = messstellen.mst_ID WHERE messstellen.mst_ID = '"+data.mstID_1+"' AND convert(varchar(20), time_de, 23) >= '"+startWeekDate3+"' AND convert(varchar(20), time_de, 23) <= '"+endWeekDate3+"' ORDER by time_de");
          }

            let dataMachine = new DataMachine();
            year = sessionStorage.getItem("year");
            monthArr = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
            month = sessionStorage.getItem("month");
            nameDB = sessionStorage.getItem("nameDB");
            chartType = sessionStorage.getItem("chartType");
            displayMean = sessionStorage.getItem("displayMean");
            nameMst = sessionStorage.getItem("nameMst");
            mstID_1 = sessionStorage.getItem("mstID_1");
            queryString_1 = sessionStorage.getItem("queryString_1");
            queryString_2 = sessionStorage.getItem("queryString_2");
            queryString_3 = sessionStorage.getItem("queryString_3");
            startWeekDate1 = sessionStorage.getItem("startWeek1");
            endWeekDate1 = sessionStorage.getItem("endWeek1");
            startWeekYear1 = sessionStorage.getItem("startWeekYear1");
            endWeekYear1 = sessionStorage.getItem("endWeekYear1");

            startWeekDate2 = sessionStorage.getItem("startWeek2");
            endWeekDate2 = sessionStorage.getItem("endWeek2");
            startWeekYear2 = sessionStorage.getItem("startWeekYear2");
            endWeekYear2 = sessionStorage.getItem("endWeekYear2");

            startWeekDate3 = sessionStorage.getItem("startWeek3");
            endWeekDate3 = sessionStorage.getItem("endWeek3");
            startWeekYear3 = sessionStorage.getItem("startWeekYear3");
            endWeekYear3 = sessionStorage.getItem("endWeekYear3");
            csOptions = null;
            let notes = [];
            let msts = [];

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
            $("#container").ejChart({
                palette: [ "#E94649", "#F6B53F", "#6FAAB0"],
                legend: {
                    position: "top"
                },
                //Initializing Primary X Axis
                primaryXAxis: {
                    title: {
                        text: "Woche"
                    },
                    range: { interval: 1 },
                    labelIntersectAction : "rotate0"
                },
                //Initializing Primary Y Axis
                primaryYAxis: {
                    title: {
                        text: "Verbrauch[kWh]"
                    }
                },
                commonSeriesOptions: csOptions,
                //Initializing Chart Series
                series: []
            });
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
                console.log("There're no query data!!")
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
            function firstQuery() {
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
                            msts.push([sessionStorage.getItem("mstID_1"), nameMst, colorMst])
                        }
                    });
            }

            function secondQuery() {
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
                            msts.push([sessionStorage.getItem("mstID_1"), nameMst, colorMst2])
                        }
                    });
            }

            function thirdQuery() {
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
                            msts.push([sessionStorage.getItem("mstID_1"), nameMst, colorMst3])
                        }
                    });
            }
            function getMonthName(week, year) {
                let d = new Date(year, 0, (week) * 7);
                d.getUTCDay() < 5 ? d.setUTCDate(d.getUTCDate() - d.getUTCDay() + 1) : d.setUTCDate(d.getUTCDate() + 8 - d.getUTCDay());
                return moment().month(("" + d).split(" ")[1]).format("MMMM");
            }
          }
          if(type=='custom2'){
            if(!$("#container").is(':empty')){
                $("#container").ejChart("destroy");
            }
            sessionStorage.setItem("from1", data.from1);
            sessionStorage.setItem("to1", data.to1);
            sessionStorage.setItem("from2", data.from2);
            sessionStorage.setItem("to2", data.to2);
            sessionStorage.setItem("from3", data.from3);
            sessionStorage.setItem("to3", data.to3);
            if(data.from1 !='' && data.to1 !=''){
              sessionStorage.setItem("queryString_1", commanQuery+" WHERE messstellen.mst_ID = '"+data.mstID_1+"' AND time_de BETWEEN '"+data.from1+"' AND '"+data.to1+"' ORDER by time_de ");
            }
            if(data.from2 !='' && data.to2 !=''){
              sessionStorage.setItem("queryString_2", commanQuery+" WHERE messstellen.mst_ID = '"+data.mstID_1+"' AND time_de BETWEEN '"+data.from2+"' AND '"+data.to2+"' ORDER by time_de ");
            }
            if(data.from3 !='' && data.to3 !=''){
              sessionStorage.setItem("queryString_3", commanQuery+" WHERE messstellen.mst_ID = '"+data.mstID_1+"' AND time_de BETWEEN '"+data.from3+"' AND '"+data.to3+"' ORDER by time_de ");
            }

            let dataMachine = new DataMachine();
            from = sessionStorage.getItem("from");
            to = sessionStorage.getItem("to");
            from1 = sessionStorage.getItem("from1");
            to1 = sessionStorage.getItem("to1");
            from2 = sessionStorage.getItem("from2");
            to2 = sessionStorage.getItem("to2");
            from3 = sessionStorage.getItem("from3");
            to3 = sessionStorage.getItem("to3");
            nameDB = sessionStorage.getItem("nameDB"),
            chartType = sessionStorage.getItem("chartType"),
            displayMean = sessionStorage.getItem("displayMean"),
            nameMst = sessionStorage.getItem("nameMst"),
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
                  }
                }
              }
            else {
                csOptions = {
                  tooltip: {
                    visible : true
                  },
                    border : {width: 2},
                }
            }

            $("#container").ejChart({
                palette: [ "#E94649", "#F6B53F", "#6FAAB0"],
                legend: {
                  position: "top"
                },
                //Initializing Primary X Axis
                primaryXAxis: {
                  title: {
                    text: "Datum / Uhrzeit"
                  },
                  labelIntersectAction : "rotate45",
                  desiredIntervals: 8
                },
                //Initializing Primary Y Axis
                primaryYAxis: {
                  title: {
                    text: "Leistung[kW/15min]"
                  }
                 },
                  commonSeriesOptions: csOptions,
                  series: [],
                  zooming :{
                    enable: false,
                    enablePinching: false,
                    enableDeferredZoom : false,
                    enableScrollbar : false,
                    enableMouseWheel : false
                  }
            });
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
                .then(function(data){
                  let jsonData = JSON.parse(data);
                  return jsonData;
                })
                .then(function(data){
                  let dataTranslator = null,
                      chartData = [],
                      sumBenDef = 0;
                  if(nameDB == "001_heco" || /*nameDB == "002_badber" || */nameDB == "003_tauchzor"){
                    dataTranslator = new DataTranslator(TranslationType.ENERGY_DATA_02, data);
                  }
                  else {
                    dataTranslator = new DataTranslator(TranslationType.ENERGY_DATA_01, data);
                  }
                  dataTranslator.sum15minsBenDef();
                  chartData = dataTranslator.translate(1);
                    updateChart(chartData, nameMst);
                });
              }

              function secondQuery(){
                dataMachine.runQuery("read", nameDB, queryString_2)
                .then(function(data){
                  let jsonData = JSON.parse(data);
                  return jsonData;
                })
                .then(function(data){
                  let dataTranslator = null,
                      chartData = [],
                      sumBenDef = 0;
                  if(nameDB == "001_heco" || /*nameDB == "002_badber" || */ nameDB == "003_tauchzor"){
                    dataTranslator = new DataTranslator(TranslationType.ENERGY_DATA_02, data);
                  }
                  else {
                    dataTranslator = new DataTranslator(TranslationType.ENERGY_DATA_01, data);
                  }
                  dataTranslator.sum15minsBenDef();
                  chartData = dataTranslator.translate(1); 
                    updateChart(chartData, nameMst);
                });
              }

              function thirdQuery(){
                dataMachine.runQuery("read", nameDB, queryString_3)
                .then(function(data){
                  let jsonData = JSON.parse(data);
                  return jsonData;
                })
                .then(function(data){
                  let dataTranslator = null,
                      chartData = [],
                      sumBenDef = 0;
                  if(nameDB == "001_heco" || /*nameDB == "002_badber" || */nameDB == "003_tauchzor"){
                    dataTranslator = new DataTranslator(TranslationType.ENERGY_DATA_02, data);
                  }
                  else {
                    dataTranslator = new DataTranslator(TranslationType.ENERGY_DATA_01, data);
                  }
                  dataTranslator.sum15minsBenDef();
                  chartData = dataTranslator.translate(1);
                  updateChart(chartData, nameMst);
                });
              }

              function updateChart(newDataSeries, nameSeries){
                let chart = $("#container").ejChart("instance");
                chart.model.series.push({
                  type: chartType,
                  name: nameSeries,
                  dataSource: newDataSeries,
                  xName: "x",
                  yName: "y",
                });
                chart.redraw();
              }

          }
          ////
      }
      if(type=='knz'){
        sessionStorage.clear();
        sessionStorage.setItem("nameDB", data.nameDB);
        sessionStorage.setItem("chartType", data.chartType); 
        sessionStorage.setItem("timeSpan", data.timeSpan);
        sessionStorage.setItem("knzID_1", data.knzID_1);
        sessionStorage.setItem("knzID_2", data.knzID_2);
        sessionStorage.setItem("knzID_3", data.knzID_3);
        sessionStorage.setItem("knzName_1", data.knzName_1);
        sessionStorage.setItem("knzName_2", data.knzName_2);
        sessionStorage.setItem("knzName_3", data.knzName_3);
        sessionStorage.setItem("knz_1_kennz", data.knz_1_kennz);
        sessionStorage.setItem("knz_1_obergr", data.knz_1_obergr);
        sessionStorage.setItem("knz_1_untergr", data.knz_1_untergr);
        sessionStorage.setItem("knz_1_zielwert", data.knz_1_zielwert);
        sessionStorage.setItem("knz_1_zielVon", data.knz_1_zielVon);
        sessionStorage.setItem("knz_1_zielBis", data.knz_1_zielBis);
        sessionStorage.setItem("headerKnz", data.headerKnz); 

        const [ frm, geo ] = [ scpFormula, scpGeometry ];
        nameDB = sessionStorage.getItem("nameDB");
        chartType = sessionStorage.getItem("chartType");
        timeSpan = sessionStorage.getItem("timeSpan");
        knzID_1 = sessionStorage.getItem("knzID_1");
        knzID_2 = sessionStorage.getItem("knzID_2");
        knzID_3 = sessionStorage.getItem("knzID_3");
        knzName_1 = sessionStorage.getItem("knzName_1");
        knzName_2 = sessionStorage.getItem("knzName_2");
        knzName_3 = sessionStorage.getItem("knzName_3");
        kennz = sessionStorage.getItem("knz_1_kennz");
        obergr = sessionStorage.getItem("knz_1_obergr");
        untergr = sessionStorage.getItem("knz_1_untergr");
        zielwert = sessionStorage.getItem("knz_1_zielwert");
        zielVon = sessionStorage.getItem("knz_1_zielVon");
        zielBis = sessionStorage.getItem("knz_1_zielBis");
        header = sessionStorage.getItem("headerKnz");
        csOptions = null;
        if(chartType == "line") {
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
        $("#container").ejChart({
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
        });
        if(knzID_1 != "" && knzID_2 != "" && knzID_3 != ""){
            (async () => {
                await firstQuery();
                await secondQuery();
                await thirdQuery();
            })();
        }
        else if (knzID_1 != "" && knzID_2 != "") {
            (async () => {
                await firstQuery();
                await secondQuery();
            })();
        }
        else if (knzID_1 != "") {
            (async () => {
                await firstQuery();
            })();
        }
        else {
            console.log("There're no query data!!");
        }

        const updateChart =
        newDataSeries =>
        nameSeries =>
        opacity => {
            let chart = $("#container").ejChart("instance");
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

        async function firstQuery() {
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
                $("#lbl_1").text(knzName_1);

                const indicators =
                arr =>
                arr
                .map(
                    a => updateChart(indicator(head(tail(a))))(head(a))(0.3)
                )

                const drawChart =
                () => {
                    updateChart(chartData)(knzName_1)(1.0);
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

                drawChart();
            })
            )
        }

        async function secondQuery() {
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
                updateChart(chartData)(knzName_2)(1.0);
                })
            )
        }

        async function thirdQuery(){
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
                            x: "A" + (i + 1) + "-" + dataRaw[i].auftrag,
                            y: data
                        })
                    );
                updateChart(chartData)(knzName_3)(1.0);
            })
        )
        }

      }
        setTimeout(function() { 
            $('#save_graph_chart').prop('disabled', false);
            $("#dashboard_loader_div").hide(); 
        }, 2000);
    }
  });
}
});