
    $(document).on('change','.manPfad',function() {
    // $("#main-production-loader").css("display", "block");
    // $("#main-production-loader").css("display", "block");
    //$("#main-production-loader").css("display", "none");
        
        getProductionDetails();
        getOrganisation();
        jsFunction(5,"31,290");
        getDynamicProductionColumns();
    });
