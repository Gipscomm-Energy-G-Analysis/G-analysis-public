$(document).on('change', '#graphModeSelector', function(){
    if ($(this).prop('checked')) {
        $('.graph-mode').show();
        $('.history-mode').hide();
    } else {
        $('.graph-mode').hide();
        $('.history-mode').show();
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

$(document).on('submit', '#historicGraphData', function(e) {
    e.preventDefault();
    if($('#msgraphData').val() === undefined || $('#msgraphData').val() === ''){
        toastr.warning('No measuring points found for the particular record.');
        return false;
    }
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
                localStorage.setItem('graphData', JSON.stringify(result.graphData));
                localStorage.setItem('graphType', result.type);
                window.open('/product-graph/history/data', '_blank');
            }
        },
        error:function(result) {
            toastr.error(result);
        }
    });
});