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

$("#start_date").datepicker(
    {changeMonth: true,
    changeYear: true,
    minDate:$('#end_date').val()}
);
$("#end_date").datepicker(
    {changeMonth: true,
    changeYear: true,
    minDate:$('#start_date').val()}
);


$("#product_start_date").datepicker(
    {changeMonth: true,
    changeYear: true,
    minDate:$('#product_end_date').val()}
);
$("#product_end_date").datepicker(
    {changeMonth: true,
    changeYear: true,
    minDate:$('#product_start_date').val()}
);

$("#mixed_start_date").datepicker(
    {changeMonth: true,
    changeYear: true,
    minDate:$('#mixed_end_date').val()}
);
$("#mixed_end_date").datepicker(
    {changeMonth: true,
    changeYear: true,
    minDate:$('#mixed_start_date').val()}
);

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
    if($('#msgraphData').val() === undefined || $('#msgraphData').val() === ''){
        toastr.warning('No measuring points found for the particular record.');
        return false;
    }
    $("#loader_image_history_charts").show();
    $("#historyChartdiv").hide();
    $.ajax({
        type: "POST",
        url: "product-graph/history",
        data: {
            periodFilter: $("#periodFilterInterval").val(),
            typeFilter: $("#typeFilterInterval").val(),
            yearFilter: $("#yearFilterInterval").val(),
            monthFilter: $("#monthFilterInterval").val(),
            startDate: $("#start_date").val(),
            endDate: $("#end_date").val(),
            graphPoints: $('#msgraphData').val()
        },
        success:function(result) {
            if(result.code == 200) {
                $("#loader_image_history_charts").hide(); 
                $("#historyChartdiv").show();
                if(windowTrue) {
                    localStorage.setItem('graphData', JSON.stringify(result.graphData));
                    localStorage.setItem('graphType', 'energy');
                    window.open('/product/index.php/product-graph/history/data', '_blank');
                } else {
                    $('.historyGraphDiv').show();
                    createAmChart(historic_root, result.graphData, true);
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
        url: "product-graph/history/product",
        data: {
            periodFilter: $("#productPeriodFilterInterval").val(),
            typeFilter: $("#productTypeFilterInterval").val(),
            yearFilter: $("#productYearFilterInterval").val(),
            monthFilter: $("#productMonthFilterInterval").val(),
            startDate: $("#product_start_date").val(),
            endDate: $("#product_end_date").val(),
            anl_ID:$('.navigation').attr('data-value'),
            limit: $limit
        },
        success:function(result) {
            if(result.code == 200) {
                $("#loader_image_create_graph").hide();
                $("#product_historyChartdiv").show();
                if(windowTrue) {
                    localStorage.setItem('graphData', JSON.stringify(result.graphData));
                    localStorage.setItem('graphType', 'production');
                    window.open('/product/index.php/product-graph/history/data', '_blank');
                } else {
                    $("#loader_image_create_graph").hide();
                    $("#product_historyChartdiv").show();
                    $('.product_historyGraphDiv').show();
                    let product_key = $('.active_prod_graph').attr('data_key');
                    console.log(result.graphData);
                    createAmChartCategory(conId, result.graphData[product_key]['amData'], true, result.graphData[product_key]['name']);
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
        url: "mixed-graph/history/product",
        data: {
            periodFilter: $("#mixedPeriodFilterInterval").val(),
            typeFilter: $("#mixedTypeFilterInterval").val(),
            yearFilter: $("#mixedYearFilterInterval").val(),
            monthFilter: $("#mixedMonthFilterInterval").val(),
            startDate: $("#mixed_start_date").val(),
            endDate: $("#mixed_end_date").val(),
            anl_ID:$('.navigation').attr('data-value'),
            limit: $limit,
            points:$('#msgraphData').val(),
            graphPoints: $('#msgraphData').val()
        },
        success:function(result) {
            if(result.code == 200) {
                if(windowTrue) {
                    localStorage.setItem('graphData', JSON.stringify(result.graphData));
                    localStorage.setItem('graphType', 'mixed');
                    window.open('/product/index.php/product-graph/history/data', '_blank');
                } else {
                    $('.mixed_historyGraphDiv').show();
                    createAmChart(conId, result.graphData, true);
                }
            }
        },
        error:function(result) {
            toastr.error(result);
        }
    });
}

function jsFunctionProduction(value) {  
$("#loader_image").show();
$("#other_graph_div").hide();
    $.ajax({
        type: "POST",
        url: "product-graph/history/product",
        data: {
            periodFilter: $("#productPeriodFilterInterval").val(),
            typeFilter: $("#productTypeFilterInterval").val(),
            yearFilter: $("#productYearFilterInterval").val(),
            monthFilter: $("#productMonthFilterInterval").val(),
            startDate: $("#product_start_date").val(),
            endDate: $("#product_end_date").val(),
            anl_ID:$('.navigation').attr('data-value'),
            limit: value

        },
        success:function(result) {

            if(result.code == 200) {
                $("#loader_image").hide();
                $("#other_graph_div").show();
                let product_key=$(".active_prod_graph").attr('data_key');
                productionDataTmp = result.graphData;
                createAmChartCategory(root_other_graph, productionDataTmp[product_key]['amData'], true, productionDataTmp[product_key]['name']);
            }
        },
        error:function(result) {
            $("#loader_image").hide();
            $("#other_graph_div").show();
            toastr.error(result);
        }
    });
}

function jsFunctionMixed(value) {  
    $.ajax({
        type: "POST",
        url: "product-graph/history/product",
        data: {
            periodFilter: $("#productPeriodFilterInterval").val(),
            typeFilter: $("#productTypeFilterInterval").val(),
            yearFilter: $("#productYearFilterInterval").val(),
            monthFilter: $("#productMonthFilterInterval").val(),
            startDate: $("#product_start_date").val(),
            endDate: $("#product_end_date").val(),
            anl_ID:$('.navigation').attr('data-value'),
            limit: value
        },
        success:function(result) {
            if(result.code == 200) {
                createAmChart(root_other_graph, result.graphData, true); 
            }
        },
        error:function(result) {
            toastr.error(result);
        }
    });
}