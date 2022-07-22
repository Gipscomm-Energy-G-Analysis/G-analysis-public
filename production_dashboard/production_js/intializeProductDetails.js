
    $(document).on('change','.menu_dashboard_database .manPfad',function() {
    // $("#main-production-loader").css("display", "block");
    // $("#main-production-loader").css("display", "block");
    //$("#main-production-loader").css("display", "none");
        getOrganisation();
        getPlantGroup();
        showTables();
        getMachineName();
        showConfigurationColumn();
        getProdDataColumn();
        customMachineTable();
        getDynamicProductionColumns(0);
    });
