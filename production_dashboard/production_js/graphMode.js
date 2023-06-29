$(document).on('change', '#graphModeSelector', function(){
    if ($(this).prop('checked')) {
        $('.graph-mode').show();
        $('.history-mode').hide();
    } else {
        $('.graph-mode').hide();
        $('.history-mode').show();
    }
});

$(document).on('change', '#productGraphModeSelector', function(){
    if ($(this).prop('checked')) {
        $('.product-graph-mode').show();
        $('.product-history-mode').hide();
    } else {
        $('.product-graph-mode').hide();
        $('.product-history-mode').show();
    }
});

$(document).on('change', '#mixedGraphModeSelector', function(){
    if ($(this).prop('checked')) {
        $('.mixed-graph-mode').show();
        $('.mixed-history-mode').hide();
    } else {
        $('.mixed-graph-mode').hide();
        $('.mixed-history-mode').show();
    }
});

$("#start_date").datepicker(
    {changeMonth: true,
    changeYear: true,
    dateFormat: 'yy-mm-dd',
    minDate:$('#end_date').val()}
);
$("#end_date").datepicker(
    {changeMonth: true,
    changeYear: true,
    dateFormat: 'yy-mm-dd',
    minDate:$('#start_date').val()}
);

$("#product_start_date").datepicker(
    {changeMonth: true,
    changeYear: true,
    dateFormat: 'yy-mm-dd',
    minDate:$('#product_end_date').val()}
);
$("#product_end_date").datepicker(
    {changeMonth: true,
    changeYear: true,
    dateFormat: 'yy-mm-dd',
    minDate:$('#product_start_date').val()}
);

$("#mixed_start_date").datepicker(
    {changeMonth: true,
    changeYear: true,
    dateFormat: 'yy-mm-dd',
    minDate:$('#mixed_end_date').val()}
);
$("#mixed_end_date").datepicker(
    {changeMonth: true,
    changeYear: true,
    dateFormat: 'yy-mm-dd',
    minDate:$('#mixed_start_date').val()}
);

$(document).on('change', '#periodFilterInterval', function(){
    if ($(this).val() == 'custom') {
        $('.custom_filter').show();
        $('.month_filter').hide();
        $('.year_filter').hide();
    } else if($(this).val() == 'year') {
        $('.custom_filter').hide();
        $('.month_filter').hide();
        $('.year_filter').show();
    } else if($(this).val() == 'month') {
        $('.custom_filter').hide();
        $('.month_filter').show();
        $('.year_filter').show();
    } else {
        $('.custom_filter').hide();
        $('.month_filter').hide();
        $('.year_filter').hide();
    }
});

$(document).on('change', '#productPeriodFilterInterval', function(){
    if ($(this).val() == 'custom') {
        $('.product_custom_filter').show();
        $('.product_month_filter').hide();
        $('.product_year_filter').hide();
    } else if($(this).val() == 'year') {
        $('.product_custom_filter').hide();
        $('.product_month_filter').hide();
        $('.product_year_filter').show();
    } else if($(this).val() == 'month') {
        $('.product_custom_filter').hide();
        $('.product_month_filter').show();
        $('.product_year_filter').show();
    } else {
        $('.product_custom_filter').hide();
        $('.product_month_filter').hide();
        $('.product_year_filter').hide();
    }
});

$(document).on('change', '#mixedPeriodFilterInterval', function(){
    if ($(this).val() == 'custom') {
        $('.mixed_custom_filter').show();
        $('.mixed_month_filter').hide();
        $('.mixed_year_filter').hide();
    } else if($(this).val() == 'year') {
        $('.mixed_custom_filter').hide();
        $('.mixed_month_filter').hide();
        $('.mixed_year_filter').show();
    } else if($(this).val() == 'month') {
        $('.mixed_custom_filter').hide();
        $('.mixed_month_filter').show();
        $('.mixed_year_filter').show();
    } else {
        $('.mixed_custom_filter').hide();
        $('.mixed_month_filter').hide();
        $('.mixed_year_filter').hide();
    }
});

$(document).on('submit', '#historicGraphData', function(e) {
    e.preventDefault();
    createEnergyDataGraph(false);
});

$(document).on('click', '#create_graph_window', function(e) {
    createEnergyDataGraph(true);
});


$(document).on('submit', '#productHistoricGraphData', function(e) {
    e.preventDefault();
    createProductHistoryGraph(product_other_graph,false);
});

$(document).on('click', '#product_create_graph_window', function(e) {
    createProductHistoryGraph(product_other_graph,true);
});

$(document).on('submit', '#mixedHistoricGraphData', function(e) {
    e.preventDefault();
    mixedGraphData(mixed_history_graph,false);
});

$(document).on('click', '#mixed_create_graph_window', function(e) {
    mixedGraphData(mixed_history_graph,true);
});

function createEnergyDataGraph(windowTrue) { 
    $("#loader_image_history_charts").show();
    $("#historyChartdiv").hide();
    $.ajax({
        url: "production_dashboard/production_php/GraphController.php",
        type:"POST",
        async: false,
        dataType: 'json',
        data: {
            action: "historicData",
            nameDB: $("#nameDashboardDB").val(),
            periodFilter: $("#periodFilterInterval").val(),
            typeFilter: $("#typeFilterInterval").val(),
            yearFilter: $("#yearFilterInterval").val(),
            monthFilter: $("#monthFilterInterval").val(),
            startDate: $("#start_date").val(),
            endDate: $("#end_date").val(),
            graphPoints: $(".navigation-production").attr("data-graph-points")
        },
        success:function(result) {
            $("#loader_image_history_charts").hide();
            if(result.code == 200) {
                if(showRecord(result.graphData)){  
                    if(windowTrue) {
                        localStorage.setItem('graphData', JSON.stringify(result.graphData));
                        localStorage.setItem('graphType', 'energy');
                        window.open('history_graph.html', '_blank');
                    } else {
                        $("#historyChartdiv").show();
                        $('.historyGraphDiv').show();
                        $('.energy_graph_msg_history').hide();
                        createAmChart(historic_root, result.graphData, true);
                    }
                }else{
                    $('.energy_graph_msg_history').show();
                }  
            }
        },
        error:function(result) {
            $("#loader_image_history_charts").hide();
            $("#historyChartdiv").show();
            toastr.error(result);
        }
    });
}

function createProductHistoryGraph(conId,windowTrue, $limit=5) {
    $("#loader_image_create_graph").show();
    $("#product_historyChartdiv").hide();
    $.ajax({
        type: "POST",
        async: false,
        dataType: 'json',
        url: "production_dashboard/production_php/GraphController.php",
        data: {
            action: "historicDataProduction",
            periodFilter: $("#productPeriodFilterInterval").val(),
            typeFilter: $("#productTypeFilterInterval").val(),
            yearFilter: $("#productYearFilterInterval").val(),
            monthFilter: $("#productMonthFilterInterval").val(),
            startDate: $("#product_start_date").val(),
            endDate: $("#product_end_date").val(),
            limit: $limit
        },
        success:function(result) {
            $("#loader_image_history_charts").hide();
            if(result.code == 200) {
                if(showRecord(result.graphData)){  
                    console.log('pass1');
                    let graph_name = $('#productGraphFilter').val();
                    if(windowTrue) {
                        localStorage.setItem('graphData', JSON.stringify(result.graphData));
                        localStorage.setItem('graphType', 'production');
                        localStorage.setItem('graph_name', graph_name);
                        window.open('history_graph.html', '_blank');
                    } else {
                        $('.product_historyGraphDiv').show();
                        $('#product_historyChartdiv').show();
                        $('.product_graph_msg_history').hide();
                        
                        for (const key in result.graphData) {
                            if(graph_name == result.graphData[key]['name']) {
                                createAmChartCategory(product_other_graph, result.graphData[key]['amData'], true, graph_name, 'single');
                                return false;
                            }
                        }
                    }
                }else{
                    $('.product_graph_msg_history').show();
                }  
            }
        },
        error:function(result) {
            $("#loader_image_create_graph").hide();
            $("#product_historyChartdiv").show();
            toastr.error(result);
        }
    });
}

function mixedGraphData(conId,windowTrue, $limit=5) {
    $.ajax({
        type: "POST",
        async: false,
        dataType: 'json',
        url: "production_dashboard/production_php/GraphController.php",
        data: {
            action: "historicDataProduction",
            periodFilter: $("#mixedPeriodFilterInterval").val(),
            typeFilter: $("#mixedTypeFilterInterval").val(),
            yearFilter: $("#mixedYearFilterInterval").val(),
            monthFilter: $("#mixedMonthFilterInterval").val(),
            startDate: $("#mixed_start_date").val(),
            endDate: $("#mixed_end_date").val(),
            id:'',
            limit: $limit,
            graphType: 'energy'
        },
        success:function(result) {
            $("#loader_image_history_charts").hide();
            console.log(result);
            if(result.code == 200) {
                let graph_name = $('#mixedGraphFilter').val();
                if(showRecord(result.graphData)){  
                    console.log('pass1');
                    if(windowTrue) {
                        console.log('pass1window');
                        localStorage.setItem('graphData', JSON.stringify(result.graphData));
                        localStorage.setItem('graphType', 'mixed');
                        localStorage.setItem('graph_name', graph_name);
                        window.open('history_graph.html', '_blank');
                    } else {
                        $('.mixed_historyGraphDiv').show();
                        $('#mixed_historyGraphDiv').show();
                        $('.mixed_graph_msg_history').hide();
                        for (const key in result.graphData) {
                            if(graph_name == result.graphData[key]['name']) {
                                console.log('amData', result.graphData[key]['amData']);
                                createAmChartCategory(mixed_history_graph, result.graphData[key]['amData'], true, graph_name, 'double');
                                return false;
                            }
                        }
                    }
                }else{
                    $('.mixed_graph_msg_history').show();
                }  
            }
        },
        error:function(result) {
            toastr.error(result);
        }
    });
}

function jsFunction(graphPoints='') {
    $.ajax({
        url: "production_dashboard/production_php/GraphController.php",
        type:"POST",
        async: false,
        dataType: 'json',
        data: {
            action: "getPointsData",
            nameDB: $("#nameDashboardDB").val(),
            limit:$('#timeFilter').val(),
            points:(graphPoints == '')?$(".navigation-production").attr("data-graph-points"):graphPoints
        },
        success:function(data){
            if(data.code == 200) {
                if(showRecord(data.graphData)){
                    $('.energy_graph_msg').hide();
                    $(".energy_graph_div").show();
                    $('.energy_graph_msg').hide();
                    console.log('data.graphData',data.graphData);
                    createAmChart(root, data.graphData, true);
                }else{
                    $('.energy_graph_msg').show();
                }
            }
        },
    });
}


function jsFunctionProduction(anl_Id ='') {  
    $.ajax({
        type: "POST",
        url: "production_dashboard/production_php/GraphController.php",
        dataType: 'json',
        data: {
            action: "getProdDataInfo",
            nameDB: $("#nameDashboardDB").val(),
            limit:$('#timeFilterProduction').val(),
            dataIndex: $('.navigation-production').attr('data-array'),
            machineIndex: $('.navigation-production').attr('data-index'),
            nameDB: $("#nameDB").val(),
        },
        success:function(result) {
            console.log('result production data', result);
            if(result.code == '200') {
                console.log('result production data', result);
                if (showRecord(result.graphData)) {
                    $('.product_graph_msg').hide();
                    $(".product_graph_div").show();
                    createProductInfo('#orderFilterProduction', result['graphData'][0]['prodInfo']);  
                    productionAppButtons('#timeFilterIntervalProduction', result.graphData, 'production');
                } else {
                    $('.product_graph_msg').show();
                }
            }
        },
        error:function(result) {
            $("#loader_image").hide();
            $("#other_graph_div").show();
            toastr.error(result);
        }
    });
}

function jsFunctionMixed() {
    $.ajax({
        url: "production_dashboard/production_php/GraphController.php",
        type:"POST",
        async: false,
        dataType: 'json',
        data: {
            action: "getProdDataInfo",
            nameDB: $("#nameDashboardDB").val(),
            limit:$('#timeFilterMixed').val(),
            dataIndex: $('.navigation-production').attr('data-array'),
            machineIndex: $('.navigation-production').attr('data-index'),
            graphType: 'energy'
        },
        success:function(data){
            if (data.code == 200) {
                if (showRecord(data.graphData)) {
                    $('.mixed_graph_msg').hide();
                    $(".mixed_graph_plot_div").show();
                   // createAmChart(mixed_root, data.graphData, true, 'production');
                    createProductInfo('#orderFilterMixed', data['graphData'][0]['prodInfo']);
                    productionAppButtons('#timeFilterIntervalMixed', data.graphData, 'mixed');
                } else {
                    $('.mixed_graph_msg').show();
                }
            }
        },
    });
}

function hideAllcharts() {
    //hide energy charts
    $(".energy_graph_div").hide();
    $('.energy_graph_msg').show();
}


function showRecord(graphData) {
    for (const key in graphData) {
        if(graphData[key].record){
            return true; 
        }
    }
    return false;
}
  
    
