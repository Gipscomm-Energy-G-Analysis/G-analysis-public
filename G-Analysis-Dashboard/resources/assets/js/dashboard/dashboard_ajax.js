$.ajax({
    url:'/dashboard_ajax',
    type: 'POST',
    data: {
        "action": 'getOrganisationData',
        "class": 'Dashboard'
    },
    success: function (response) {
        var response = JSON.parse(response);
        console.log(response);
    }
});