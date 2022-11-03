let stopLoader = () => {
    let loader = $('#loader_demo').data('introLoader');
    loader.stop();
}
let dataTableMachine;



function hideAllcharts() {
    //hide energy charts
    $(".energy_graph_div").hide();
    $('.energy_graph_msg').show();
    $('.energy_graph_msg_history').show();

    $(".product_graph_div").hide();
    $('.product_graph_msg').show();
    $('.product_graph_msg_history').show();

    $(".mixed_graph_div").hide();
    $('.mixed_graph_msg').show();
    $('.mixed_graph_msg_history').show();
}

let getProductionDetails = (dataIndex) => {
    $.ajax({
        type: "POST",
        url: "production_dashboard/production_php/ProductionController.php",
        async: false,
        dataType: 'json',
        data: {
            action: "getProductionDetail",
            nameDB: $("#nameDB").val(),
            dataIndex:dataIndex
        },
        success: function(response) {
            console.log('res', response);
            if(response.code == '200') {
                machineDetailsParams(response);
                jsFunction(response.graphPoints);
                getProductionGraphDetails(response.anl_ID);
                getMixedGraphDetails(response.anl_ID); 
            } else if(response.code == '404')  {
                machineDetailsParams(response);
                hideAllcharts();
            } else {
                machineDetailsParams(response);
                hideAllcharts();
            }
        }
    });
}

let machineDetailsParams = (response) => {
    $('#anlageProd').val((response.data.maschine !== undefined && response.data.maschine != '' && response.data.maschine !== null) ? response.data.maschine : 'NULL');
    $('#AuftragsmengeProd').val((response.data.sollmenge !== undefined && response.data.sollmenge != '' && response.data.sollmenge !== null) ? response.data.sollmenge: 'NULL');
    $('#BestellungProd').val((response.data.maschinentyp !== undefined && response.data.maschinentyp != '' && response.data.maschinentyp !== null)? response.data.maschinentyp: 'NULL');
    $('#artikelProd').val((response.data.auftrag !== undefined && response.data.auftrag != '' && response.data.auftrag !== null)? response.data.auftrag: 'NULL');
    $('#GutmengeProd').val((response.data.gutmenge !== undefined && response.data.gutmenge != '' && response.data.gutmenge !== null)? response.data.gutmenge: 'NULL');
    $('#AusschussProd').val((response.data.ausschuss !== undefined && response.data.ausschuss != '' && response.data.ausschuss !== null)? response.data.ausschuss: 'NULL');
    $('#programProd').val((response.data.maschinentyp !== undefined && response.data.maschinentyp != '' && response.data.maschinentyp !== null)? response.data.maschinentyp: 'NULL');
    $('#Zeit_zyklusProd').val((response.data.zykluszeit !== undefined && response.data.zykluszeit != '' && response.data.zykluszeit !== null)? response.data.zykluszeit: 'NULL');
    $('#WerkzeugProd').val((response.data.werkzeug !== undefined && response.data.werkzeug != '' && response.data.werkzeug !== null)? response.data.werkzeug: 'NULL');
    $('#KavitätenProd').val((response.data.nester !== undefined && response.data.nester != '' && response.data.nester !== null)? response.data.nester : 'NULL');
    $('#LetztestörungProd').val((response.data.zeitstempel !== undefined && response.data.zeitstempel != '' && response.data.zeitstempel !== null)? response.data.zeitstempel : 'NULL');
    $('#BisherproduziertProd').val((response.data.gutmenge !== undefined && response.data.gutmenge != '' && response.data.gutmenge !== null)? response.data.gutmenge : 'NULL');
}

let machineCommonAjax = (params) => {
    $(".close_mac_modal").click();
    
    $.ajax({
        type: "POST",
        url: "production_dashboard/production_php/ProductionController.php",
        async: false,
        dataType: 'json',
        data: {
            action: "getMachineDetailOptimized",
            nameDB: $("#nameDB").val(),
            id:params.id,
            dataIndex:params.dataIndex,
            machineIndex:params.machineIndex,
            dataResult:params.dataResult,
            prop_id:params.prop_id
        },
        beforeSend:function(){
            $.loadingBlockShow({
                imgPath: 'production_dashboard/production_js/assets/img/default.svg',
                text: '',
                style: {
                    position: 'fixed',
                    width: '100%',
                    height: '100%',
                    background: 'rgba(0, 0, 0, .8)',
                    left: 0,
                    top: 0,
                    zIndex: 10000
                }
            })
        },
        success: function(response) {
            console.log('here data asfdsaf', response);
            setTimeout($.loadingBlockHide, 2000);
            $(".navigation-production").attr("data-index", params.machineIndex);
            $(".navigation-production").attr("data-graph-points", response.graphPoints);
            if(response.code == '200') {
                $(".navigation-production").attr("data-index", response.currentIndex);
                machineDetailsParams(response);
                jsFunction(response.graphPoints);
            } else if(response.code == '400') {
                machineDetailsParams(response);
                hideAllcharts();
                toastr.warning(response.message);
            } else {
                machineDetailsParams(response);
                hideAllcharts();
                toastr.error(response.message);
            }
        },
        error:function (error) {
            setTimeout($.loadingBlockHide, 2000);
        }
    }); 
}

$(document).on('change','#org-data',function(){
    console.log('organistion value on trigger',this.value );
    getProperty(this.value);
});


let getOrganisation = function () {
    $.ajax({
        type: "POST",
        url: "production_dashboard/production_php/ProductionController.php",
        async: false,
        dataType: 'json',
        data: {
            action: "getOrganisationData",
            nameDB: $("#nameDB").val(),
        },
        success: function(result) {
            if(result.code == '200') {
                let html = '<option value="">Please Select</option>';
                $.each(result.data, function (key, value) {
                    if (key == 0) {
                        html += `<option value=${value.org_ID} selected>${value.nameOrg}</option>`;
                    } else {
                        html += `<option value=${value.org_ID}>${value.nameOrg}</option>`;
                    }
                });
                $("#org-data").html(html).trigger('change');
            } else {
                $("#property-data").html('<option value="">Please Select</option>');
            }
        }
      });
}



let getProperty = function (org_id) {
    $.ajax({
        type: "POST",
        url: "production_dashboard/production_php/ProductionController.php",
        async: false,
        dataType: 'json',
        data: {
            action: "getPropertyData",
            org_id:org_id,
            nameDB: $("#nameDB").val(),
        },
        success: function(result) {
            if(result.code == '200') {
                let html = `<option value="">Please Select</option>`;
                $.each(result.data, function (key, value) {
                    if (key == 0) {
                        html += `<option value="${value.lieg_ID}" selected>${value.nameLieg}</option>`;
                    } else {
                        html += `<option value="${value.lieg_ID}">${value.nameLieg}</option>`;
                    }
                });
                $("#property-data").html(html);
            }
            console.log('gefrhasejfkldsjfkldsjsdjgkljds');
            getMachineTable();
            getNavigationDetails();
        }
    });
}

getOrganisation();

$(document).on('click','.navigation-production-li', function() {
    // return false;
    let anl_ID = $('.navigation-production').parent().attr('data-value');
    let index = $(this).parent().attr('data-index');
    let data_array = $(this).parent().attr('data-array');
    let data_result = $(this).parent().attr('data-result');
    let findIndex = calculateNavigationIndex($(this).attr('event-type'), index);
    let params = {
        id:'',
        dataIndex:data_array,
        machineIndex:findIndex,
        dataResult: data_result,
        prop_id:$('#property-data').val()
    }
    machineCommonAjax(params);
    getDynamicProductionColumns(findIndex);
    getProductionGraphDetails(findIndex);
    getMixedGraphDetails(findIndex);
    
});

// Production page switches
$(document).on('change', '#productionPageModeSelector', function(){
    if ($(this).prop('checked')) {
        $('.production-view-mode').show();
        $('.production-edit-mode, #machine_table_configuration').hide();
    } else {
        $('.production-view-mode').hide();
        $('.production-edit-mode, #machine_table_configuration').show();
    }
});

$(document).on('change', '#editSubGroupConfigMode', function(){
    if ($(this).prop('checked')) {
        $('.editSubGroupColumn').show();
        $('.editSubDefaultColumn, #addGroupOptions_btn').hide();
    } else {
        $('.editSubGroupColumn').hide();
        $('.editSubDefaultColumn, #addGroupOptions_btn').show();
    }
});
// Close Production page switches

$(document).ready(function() {
    $('#multi-machine-prioprity').select2();
    $("#machine-table-column-DualListbox").bootstrapDualListbox({
        selectorMinimalHeight: '300'
    });
});

$(document).on('click', '.edit_label', function() {
    let ele = $(this).parent('td');
    $(ele).find('.custom_label_span').val('');
    $(this).hide();
    $(ele).find('.custom_label_span').hide();
    $(ele).find('.custom_label_input').show().focus();
});

$(document).on('focusout', '.custom_label_input', function() {
    let ele = $(this).parent('td');
    let data_value = $(ele).find('.custom_label_span').text();
    if($(this).val() != '') {
        data_value = $(this).val();
    }
    $(ele).find('.custom_label_span').text(data_value).show();
    $(ele).find('.edit_label').show();
    $(ele).find('.custom_label_input').hide();
});

$(document).on('click', '.remove_column', function() {
    $(this).parent().parent().remove();
});

$(document).on('click', '.remove_graph_column', function() {
    $(this).parent().parent().remove();
});

let getPlantGroup = function () {
    $.ajax({
        type: "POST",
        url: "production_dashboard/production_php/ProductionController.php",
        async: false,
        dataType: 'json',
        data: {
            action: "getPlantGroupData",
            nameDB: $("#nameDB").val(),
        },
        success: function(result) {
            if(result.code == '200') {
                let html = '<option value="" selected>Please Select</option>';
                $.each(result.data, function (key, value) {
                    if (key == 0) {
                        html += `<option value="${value.id}">${value.option_name}</option>`;
                    } else {
                        html += `<option value="${value.id}">${value.option_name}</option>`;
                    }
                });
                $("#select_group_options").html(html).trigger('change');
            }
        }
    });
}
getPlantGroup();

let showTables = function () {
    $.ajax({
        type: "POST",
        url: "production_dashboard/production_php/ProductionController.php",
        async: false,
        dataType: 'json',
        data: {
            action: "showTablesList",
            nameDB: $("#nameDB").val(),
        },
        success: function(result) {
            if(result.code == '200') {
                let html = '<option value="" selected>Please Select</option>';
                $.each(result.data, function (key, value) {
                    if (key == 0) {
                        html += `<option value=${value.TABLE_NAME}>${value.TABLE_NAME}</option>`;
                    } else {
                        html += `<option value=${value.TABLE_NAME}>${value.TABLE_NAME}</option>`;
                    }
                });
                $("#select_group_table").html(html).trigger('change');
            }
        }
    });
}
showTables();


let showPrimaryKey = function () {
    $.ajax({
        type: "POST",
        url: "production_dashboard/production_php/ProductionController.php",
        async: false,
        dataType: 'json',
        data: {
            action: "showPrimaryKeyList",
            nameDB: $("#nameDB").val(),
        },
        success: function(result) {
            if(result.code == '200') {
                let html = '<option value="" selected>Please Select</option>';
                $.each(result.data, function (key, value) {
                    if (key == 0) {
                        html += `<option data-type="${value.DATA_TYPE}" value=${value.COLUMN_NAME}>${value.COLUMN_NAME}</option>`;
                    } else {
                        html += `<option data-type="${value.DATA_TYPE}" value=${value.COLUMN_NAME}>${value.COLUMN_NAME}</option>`;
                    }
                });
                $("#primary_key_subGroup").html(html).trigger('change');
                $("#select_primary_column").html(html).trigger('change');
            }
        }
    });
}

let showForeignKey = function () {
    let table_name = $('#select_group_table').val();
    $.ajax({
        type: "POST",
        url: "production_dashboard/production_php/ProductionController.php",
        async: false,
        dataType: 'json',
        data: {
            action: "showForeignKeyList",
            table_name:table_name,
            nameDB: $("#nameDB").val(),
        },
        success: function(result) {
            if(result.code == '200') {
                let html = '<option value="" selected>Please Select</option>';
                $.each(result.data, function (key, value) {
                    if (key == 0) {
                        html += `<option value=${value.COLUMN_NAME}>${value.COLUMN_NAME}</option>`;
                    } else {
                        html += `<option value=${value.COLUMN_NAME}>${value.COLUMN_NAME}</option>`;
                    }
                });
                $("#foreign_key_subGroup").html(html).trigger('change');
            }
        }
    });
}

let getGroupData = function () {
    let groupId = $('#select_group_options').val();
    let table_name = 'anlage';
    $.ajax({
        type: "POST",
        url: "production_dashboard/production_php/ProductionController.php",
        async: false,
        dataType: 'json',
        data: {
            grosubGroupId:groupId,
            table_name:table_name,
            action: "getConfigurationData",
            nameDB: $("#nameDB").val(),
        },
        success: function(result) {
            if(result.code == '200') {
                let html = '';
                $.each(result.data, function (key, value) {
                    let label = value.COLUMN_NAME;
                    let column = value.COLUMN_NAME;
                    let graph_value = value.COLUMN_NAME;
                    html += `<tr>
                    <td>${column}<input hidden class="configuration_column_data" value="${column}"></td>
                    <td class="custom_label_td" style="text-align:center;">
                        <span class="custom_label_span" style="padding-top: 12px; float: left;">${label}</span>
                        <input style="display:none;" type="text" name="configuration_value_data[]" placeholder="Enter Custom Label Name" value="${label}" class="custom_label_input"/>
                        <i class="fa fa-trash-o  float-right remove_column cursor" style="font-size:24px"></i>
                        <i class='fa fa-edit float-right edit_label cursor' style='font-size:24px;margin-right: 10px;margin-top: 2px;'></i>
                    </td>
                    <td class="text-center">
                    <input type="checkbox" value="${graph_value}" class="graph_checkbox_value" checked data-toggle="toggle" data-on="" data-off="" data-onstyle="success" data-offstyle="info">
                    </td>
                    </tr>`;
                });
                $('#configuration_table tbody').html(html);
            }
        }
      });
}

$(document).on('change', '#select_group_options', function() {
    if( $(this).val() ) {
        $('#showData_SubGroupConfigrations').show();
        getGroupData();
    } else {
        $('#showData_SubGroupConfigrations').hide();
    }
});

// let saveSubGroupConfigurations = (data) => {
//     $.ajax({
//         type: "POST",
//         url: "production_dashboard/production_php/ProductionController.php",
//         dataType: 'json',
//         data: { 
//             action: 'saveConfigurationData',
//             data: data,
//             nameDB: $("#nameDashboardDB").val(),
//         },
//         //data:data,
//         success:function(data) {
//             console.log(data);
//             if(result.status == 200) {
//                 alert('success');
//             }
//         },
//         error:function(result) {
//             alert('error');
//         }
//     });
// }

$(document).on('click', '#save_configuration_button', function() {
    if ($('#select_group_options').val() == '') {
        alert('Please select group option!');
        return false;
    } else if($('#select_group_table').val() == '') {
        alert('Please select Table!');
        return false;
    } else if($('#primary_key_subGroup').val() == '') {
        alert('Please select primary key!');
        return false;
    } else if($('#foreign_key_subGroup').val() == '') {
        alert('Please select foreign key!');
        return false;
    }
    let column = $(".configuration_column_data").map(function(){return $(this).val();}).get();
    let label = $(".custom_label_input").map(function(){return $(this).val();}).get();

    var checkbox =$(".graph_checkbox_value").map(function(){
        if($(this).is(":checked")){
            return '1';
        }
        return '0';
    }).get();

    let dataArray = {
        'table': $('#select_group_table').val(),
        'sub_group_id' :$('#select_group_options').val() ,
        'primary_key' :$('#primary_key_subGroup').val() ,
        'foreign_key' : $('#foreign_key_subGroup').val() ,
        'column' : column,
        'label' : label,
        'graph_value':checkbox
    }

    //saveSubGroupConfigurations(dataArray);
    $.ajax({
        type: "POST",
        url: "production_dashboard/production_php/ProductionController.php",
        dataType: 'json',
        data: { 
            action: 'saveConfigurationData',
            data: dataArray,
            nameDB: $("#nameDB").val(),
        },
        success:function(result) {
            if(result.code == 200) {
                getDynamicProductionColumns($('.navigation-production').attr('data-index'));
                toastr.success(result.message);
            } else {
                toastr.error(result.message);
            }
        }
    });
    
});


let showColumns = function () {
    let table_name = $('#select_table').val();
    $.ajax({
        type: "POST",
        url: "production_dashboard/production_php/ProductionController.php",
        async: false,
        dataType: 'json',
        data: {
            action: "showColumnList",
            table_name:table_name,
            nameDB: $("#nameDB").val(),
        },
        success: function(result) {
            if(result.code == '200') {

                console.log(result);

                let html = '<option value="" selected>Please Select</option>';
                $.each(result.data, function (key, value) {
                    if (key == 0) {
                        html += `<option value=${value.COLUMN_NAME}>${value.COLUMN_NAME}</option>`;
                    } else {
                        html += `<option value=${value.COLUMN_NAME}>${value.COLUMN_NAME}</option>`;
                    }
                });
                $("#select_column").html(html).trigger('change');
            }
        }
    });
}

let showForeignKeyType = function () {
    let table_name = $('#select_table').val();
    let primary_key = $('#select_primary_column').val();
    let primary_key_data_type = $('#select_primary_column').find(':selected').data('type');

    $.ajax({
        type: "POST",
        url: "production_dashboard/production_php/ProductionController.php",
        async: false,
        dataType: 'json',
        data: {
            action: "showForeignKeyTypeList",
            table_name:table_name,
            primary_key:primary_key,
            primary_key_data_type:primary_key_data_type,
            nameDB: $("#nameDB").val(),
        },
        success: function(result) {
            if(result.code == '200') {

                console.log(result);

                let html = '<option value="" selected>Please Select</option>';
                $.each(result.data, function (key, value) {
                    if (key == 0) {
                        if(primary_key_data_type == value.DATA_TYPE) {
                            html += `<option data-type="${value.DATA_TYPE}" value=${value.COLUMN_NAME}>${value.COLUMN_NAME}</option>`;
                        }
                    } else {
                        if(primary_key_data_type == value.DATA_TYPE) {
                            html += `<option data-type="${value.DATA_TYPE}" value=${value.COLUMN_NAME}>${value.COLUMN_NAME}</option>`;
                        }
                    }
                });
                $("#select_foreign_column").html(html).trigger('change');
            }
        }
    });
}

$(document).on('change', '#select_table', function() {
    if( $(this).val() ) {
        showColumns();
        showPrimaryKey();
    }
});

$(document).on('change', '#select_primary_column', function() {
    if( $(this).val() ) {
        showForeignKeyType();
    }
});

$(document).on('click', '#save_field', function() {

    if ($('#add_label_field').val() == '') {
        toastr.warning('Please select label');
        return false;
    } else if($('#select_table').val() == '') {
        toastr.warning('Please select table');
        return false;
    } else if($('#select_column').val() == '') {
        toastr.warning('Please select column');
        return false;
    } else if($('#select_primary_column').val() == '') {
        toastr.warning('Please select primary key');
        return false;
    }
    else if($('#select_foreign_column').val() == '') {
        toastr.warning('Please select foreign key');
        return false;
    }
    else if($('#graph').val() == '') {
        toastr.warning('Please select graph');
        return false;
    }

    let label = $('#add_label_field').val();
    let table = $('#select_table').val();
    let column = $('#select_column').val();
    let primary_key = $('#select_primary_column').val();
    let foreign_key = $('#select_foreig n_column').val();
    let graph = $('#graph').val();
    let anl_ID = $('#anl_ID').val();
    
    $.ajax({
        type: "POST",
        url: "production_dashboard/production_php/ProductionController.php",
        dataType: 'json',
        data: { 
            action:"saveFields",
            label:label,
            table:table,
            column:column,
            primary_key:primary_key,
            foreign_key:foreign_key,
            graph:graph,
            anl_ID:anl_ID,
            nameDB:$("#nameDB").val(),
        },
        success: function (data) {
            if (data.code == 200) {
                getDynamicProductionColumns($('.navigation-production').attr('data-index'));
                toastr.success(data.message);
            }
        },
        error: function (error) {
            toastr.error('Error while saving record.');
        },
    });
    
});

$("#save_subgroup_options").on("click", function (e) {
    let container = document.getElementById("dynamic_subgroup_field");
    let group_id = document.getElementById("group_id").value;
    let sub_group_name = $("input[name='sub_group[]']")
        .map(function () {
            return $(this).val();
        })
        .get();
    let sub_options = $(".name_list").val();
    if (sub_options == "") {
        alert('Please enter suboption name.');
        return false;
    } else {
        $.ajax({ 
            type: "POST",
            url: "production_dashboard/production_php/ProductionController.php",
            dataType: 'json',
            data: { sub_group_name: sub_group_name, 
                    group_id: group_id,
                    action: 'saveGroupOptions'
             },
            success: function (result) {
              if(result.status == 200) {
                  $('#modal-addGroupOptions, .modal-backdrop').hide();
                    toastr.success(result.msg);
                } else {
                    toastr.error(result.msg);
                }   
            },
        });
    }
});

const createGroupTable = (data) => {
    let html = "";
    $.each(data, function (key, value) {
        html += `<tr id="subrow${key}">
            <td>${key}</td>
            <td>
                <div class="form-group">
                    <label for="${value.option_name}" class="col-form-label group-label">${value.option_name}</label>
                    <input type="hidden" name="sub_group[]" class="form-control name_list" value="${value.option_name}" />
                    <button style="float:right;" type="button" name="remove" id="${key}" class="btn btn-sm btn-danger btn_delete">Delete</button>
                </div>
            </td>
        </tr>`;
    });
    $("#dynamic_subgroup_field_body").html(html);
};


$("#add_sub").click(function () {    
    let icount = $("#dynamic_subgroup_field_body").find("tr").length + 1;
    $("#dynamic_subgroup_field_body").append(`<tr id="subrow${icount}">
    <td>${icount}</td>
        <td>
            <div class="row">
                <div class="col-sm-8">
                    <input type="text" name="sub_group[]" placeholder="Enter Subgroup Name" class="form-control name_list" />
                </div>
                <div class="col-sm-4">
                    <button style="float:right;" type="button" name="remove" id="${icount}" class="btn btn-sm btn-danger btn_delete">
                        Delete
                    </button>
                </div>
            </div>
        </td>
    </tr>`);
});

$(document).on("click", ".btn_delete", function () {
    var button_id = $(this).attr("id");
    $("#subrow" + button_id + "").remove();
     
});

let getGroupOptions = function () {
    $.ajax({
        type: "POST",
        url: "production_dashboard/production_php/ProductionController.php",
        async: false,
        dataType: 'json',
        data: {
            action: "getGroupOptionsList",
            nameDB: $("#nameDB").val(),
        },
        success: function(result) {
            if(result.code == '200') {
                let html = '';
                
                $.each(result.data, function (key, value) {
                    html += `<tr id="subrow${key}">
                        <td>${key}</td>
                        <td>
                            <div class="form-group ">
                                <label for="${value.option_name}" class="col-form-label group-label">${value.option_name}</label>
                                <input type="hidden" name="sub_group[]" class="form-control name_list" value="${value.option_name}" />
                                <button style="float:right;" type="button" name="remove" id="${key}" class="btn btn-sm btn-danger btn_delete">Delete</button>
                            </div>
                        </td>
                    </tr>`;
                });
                $("#dynamic_subgroup_field_body").html(html);   
            }
        }
    });
};


$(document).on("click", "#addGroupOptions_btn", function () {
    getGroupOptions();
});

const showMachineData = (data) => {
    let even = "";
    let odd = "";
    $.each(data.even, function (key, value) {
        if (value == null) value = "";
        even += `<div class="dynamicoldiv" style="width:100%;">
                    <label class="fnt" style="width:47%;" for="${key}">${key}</label>
                    <input type="text" class="dynamic-coll" style="width:50%;" id="${key}" placeholder="${key}" value="${value}" readonly>
                </div>`;
    });

    $.each(data.odd, function (key, value) {
        if (value == null) value = "";
        odd += `<div class="dynamicoldiv" style="width:100%;">
                    <label class="fnt" style="width:47%;" for="${key}">${key}</label>
                    <input type="text" style="width:50%;" class="dynamic-coll" id="${key}" placeholder="${key}" value="${value}" readonly>
                </div>`;
    });
    $(".left_section").html(even);
    $(".right_section").html(odd);
};

let getDynamicProductionColumns = (index, anl_ID="") => {
    $.ajax({
        type: "POST",
        url: "production_dashboard/production_php/ProductionController.php",
        async: false,
        dataType: 'json',
        data: {
            action: "getDynamicColumnListing",
            nameDB: $("#nameDB").val(),
            property_id: $('#property-data').val(),
            id:anl_ID,
            dataIndex:$(".navigation-production").attr("data-array"),
            machineIndex:index,
        },
        success: function(result) {
             console.log('result code data',result);
            if(result.code == '200') {
                if(result.data.main.odd != '' || result.data.main.even != ''){
                    showMachineData(result.data.main);
                    $('.error_message').hide();
                }else{
                    $('.dynamic_columns').html('');
                    $('.error_message').show();
                }
                getFormulas(result.anl_id);
                $(".graph-machine-filters").html(`<option value="${result.anl_id}">${result.machine_name}</option>`)
            } else {
                $('.dynamic_columns').html('');
                $('.error_message').show();
            }
        }
    });
}
getDynamicProductionColumns($('.navigation-production').attr('data-index'));

const customMachineTable = function() {
    $.ajax({
        type: "POST",
        url: "production_dashboard/production_php/ProductionController.php",
        async: false,
        dataType: 'json',
        data: {
            action: "getmachineDetails",
            nameDB: $("#nameDB").val(),
        },
        success: function(result) {
            
            if(result.code == '200') {
                // console.log(result);
                var html = '';
                $.each(result.columnName, function(key1, val) {
                    html += '<th>'+val+'</th>';
                });
                $(".column_name").html(html);
                // console.log('dataTableMachine', dataTableMachine);
                // if(dataTableMachine){
                //     $(dataTableMachine).destroy();
                // }
               // $('#custom_machines_table').DataTable().clear().destroy();
               setTimeout(function() {
                    dataTableMachine = $('#custom_machines_table').dataTable( {
                        destroy: true,
                        "bSort" : false,
                        "aaData": result.data,
                        "columns": result.dataTable,
                    })
                }, 1000);
                
            }
        },
    });
}



// $(document).on('click','#custom_machines_table tr', function(){
//     let anl_ID = $(this).find("td:first").text();
//     let index = $('.navigation-production').attr('data-index');
//     let data_array = $('.navigation-production').attr('data-array');
//     let data_result = $('.navigation-production').attr('data-result');
    
//     let findIndex = index;
//     let params = {
//     	id:anl_ID,
//         dataIndex:data_array,
//         machineIndex:findIndex,
//         dataResult: data_result,
//         prop_id:$('#property-data').val()
//     }
//     machineCommonAjax(params);
//     getDynamicProductionColumns(findIndex, anl_ID);
// });


setTimeout(function() {
    customMachineTable();
}, 5000);


// $(document).on('click', '#save_configuration_button', function(){
//     getDynamicProductionColumns
// })



const getColumnName = function(data) {
    let html = '';
    $.each(data.data, function (key, value) {
        if (key == 0) {
            html += `<option value=${value.anl_ID}>${value.nummerAnl}</option>`;
        } else {
            html += `<option value=${value.anl_ID}>${value.nummerAnl}</option>`;
        }
    });
    $("#multi-machine-prioprity").html(html).select2().trigger('change');
}

const getMachineName = function() {
    $.ajax({
        type: "POST",
        url: "production_dashboard/production_php/ProductionController.php",
        async: false,
        dataType: 'json',
        data: {
            action: "getMachineColumns",
            nameDB: $("#nameDB").val(),
        },
        fail: function() {
            alert("failed!!")
        },
        success: function(result) {
            getColumnName(result);
            // let html = '';
            // $.each(result.data, function (key, value) {
            //     console.log(value);
            //     if (key == 0) {
            //         html += `<option value=${value.anl_ID}>${value.nummerAnl}</option>`;
            //     } else {
            //         html += `<option value=${value.anl_ID}>${value.nummerAnl}</option>`;
            //     }
            // });
            // $("#multi-machine-prioprity").html(html).select2().trigger('change');
        },
    });
}
getMachineName();

// $(document).on('click', '#save_table_configuration_button', function() {
//     let selectedColumn = $('.duallistbox').val();
//     let priorityMachines = $('#multi-machine-prioprity').val();
//     if(selectedColumn.length == 0 ) {
//         toastr.warning('Please select columns!');
//         return false;
//     }
//     saveTableConfigurations(selectedColumn, priorityMachines);
// })


const showTableConfigurations = (data) => {
    let html = '';
    $.each(data, function(key, value) {
        html += `<option value="${value.column}" ${value.option}>${value.column}</option>`;
    });
    $("#machine-table-column-DualListbox").empty().append(html).bootstrapDualListbox('refresh', true);
}

const showMachinePrioritySelect = (data) => {
    let selectedMachine = data.selected;
    let selectHtml = '';
    for(const select_name of data.allMachines) {
        if(showMacthedValue(selectedMachine, select_name.anl_ID)){
            selectHtml += `<option value='${select_name.anl_ID}' selected>${select_name.nummerAnl}</option>`;
        } else {
            selectHtml += `<option value='${select_name.anl_ID}'>${select_name.nummerAnl}</option>`;
        }
    }
    $('#multi-machine-prioprity').html(selectHtml).select2().trigger('change')
}

const showMacthedValue = (data, value) => {
    for(const select_name of data) {
        if(select_name == value) {
            return true;
        }
    }
    return false;
}

$(document).on('click', '#machine_table_configuration', function() {
    $.ajax({
        type: "POST",
        url: "production_dashboard/production_php/ProductionController.php",
        async: false,
        dataType: 'json',
        data: {
            action: "getMachineConfigurations",
            nameDB: $("#nameDB").val(),
        },
        success:function(result) {
            if(result.status == 200) {
                showTableConfigurations(result.data);
                showMachinePrioritySelect(result.machinePriorityData);
                customMachineTable();
            }
        },
        error:function(result) {
            toastr.error(result);
        }
    });
})

const saveTableConfigurations = function(data, priorityMachines){
    $.ajax({
        type: "POST",
        url: "production_dashboard/production_php/ProductionController.php",
        async: false,
        dataType: 'json',
        data: {
            column: data,
            priorityMachines: priorityMachines,
            action: "saveMachineConfigurations",
            nameDB: $("#nameDB").val(),
        },
        success:function(result) {
            if(result.code == 200) {
                $('#modal-machine-configuration').modal('hide');
                customMachineTable();
                toastr.success(result.message);
            } else {
                toastr.error(result.message);
            }
        },
        error:function(result) {
            toastr.error(result);
        }
    });
}
$(document).on('click', '#save_table_configuration_button', function() {
    let selectedColumn = $('.duallistbox').val();
    let priorityMachines = $('#multi-machine-prioprity').val();
    if(selectedColumn.length == 0 ) {
        toastr.warning('Please select columns!');
        return false;
    }

    if(selectedColumn.length > 8 ) {
        toastr.warning('Please select 6 or less column to be displayed!');
        return false;
    }
    saveTableConfigurations(selectedColumn, priorityMachines);
    $('#modal-machine-configuration, .modal-backdrop').hide();
})


$(document).on('click', '.btn_delete', function() {
    // console.log('element',this);
    let id = $(this).attr('id');
    $.ajax({
        type: "POST",
        url: "production_dashboard/production_php/ProductionController.php",
        async: false,
        dataType: 'json',
        data: {
            id: id,
            action: "deletesaveGroupOptions",
            nameDB: $("#nameDB").val(),
        },
        success:function(result) {
            if(result.code == 200) {
                toastr.success(result.message);
            } else {
                toastr.error(result.message);
            }
        },
        error:function(result) {
            toastr.error(result);
        }
    });
})

function getNavigationDetails() {
    $.ajax({
        type: "POST",
        url: "production_dashboard/production_php/ProductionController.php",
        async: false,
        dataType: 'json',
        data: {
            id: id,
            action: "getAnlagenDetails",
            prop_id:$('#property-data').val(),
            nameDB: $("#nameDB").val(),
        },
        success:function(result) {
            
            if(result.code == 200) {
                $(".navigation-production").attr("data-array", result.data.group_anl);
                $(".navigation-production").attr("data-result", result.data.group_record);
                $(".navigation-production").attr("data-first", 0);
                $(".navigation-production").attr("data-last", result.data.last);
                getProductionDetails(result.data.group_anl);
                
            }
        },
        error:function(result) {
            toastr.error(result);
        }
    });
}


function calculateNavigationIndex(event, currentIndex) {
    let newIndex = 0;
    let current = parseInt(currentIndex);
    let first = parseInt($('.navigation-production').attr("data-first"));
    let last = parseInt($('.navigation-production').attr("data-last"));
    if(event == 'last') {
        newIndex = last;
    } else if(event == 'next') {
        if(current ==  last) {
            newIndex = current;
        } else {
            newIndex = current+1;
        }
    } else if(event == 'prev') {
        if(current == 0) {
            newIndex = current;
        } else {
            newIndex = current-1;
        }
    } else if(event == 'first') {
        newIndex = first ;
    }
    return newIndex;
}
// let checkmigration = function(){
//     $.ajax({
//         type: "POST",
//         url: "production_dashboard/production_php/ProductionController.php",
//         async: false,
//         dataType: 'json',
//         data: {
//             action: "checkMigration",
//             nameDB: $("#nameDB").val(),
//         },
//         success: function(result) {
//             if(result.code == '200') {
//               console.log('hiii');
//             } else {
//               toastr.warning();
//             }
//         },
//         error:function(result) {
//             alert('error');
//         }
//     });
// }
// checkmigration();

// const getsubGroup = function() {
//     $.ajax({
//         type: "POST",
//         url: "production_dashboard/production_php/ProductionController.php",
//         async: false,
//         dataType: 'json',
//         data: {
//             action: "getSubGoupConfiguration",
//             nameDB: $("#nameDB").val(),
//         },
//         fail: function() {
//             alert("failed!!")
//         },
//         success: function(result) {
//             if(result.status == 200) {
             
//             } else {
             
//             }
          
//         },
//     });
// }
// getsubGroup();

let showGraphColumn = function(result){
    let html = '';
    $.each(result.data, function (key, value) {
        let label = value.graph_text;
        // let column = value.COLUMN_NAME;
        let graph_name = value.graph_name;
        html += `<tr><td>${graph_name}<input hidden class="show_configuration_data"></td>
        <td class="custom_label" style="text-align:center;">
            <span class="custom_label" style="padding-top: 12px; float: left;">${label}</span></td>
            <input style="display:none;" type="text" name="configuration_value_data[]" placeholder="Enter Custom Label Name" value="${label}" class="form-control custom_label_input"/>
        <td>
           <i class="fa fa-trash-o float-right remove_graph_column" data-id="${value.id}" style="font-size:24px"></i>
        </td></tr>`;
    });
    $('#graph_configuration_table tbody').html(html);
}

$(document).on('click', '#save_graph_field', function() {
    if ($('#graph_name').val() == '') {
        alert('Please select label');
        return false;
    } else if($('#label_column').val() == '') {
        alert('Please select table');
        return false;
    }

    let graph = $('#graph_name').val();
    let label = $('#label_column').val();
   // let is_open = $('#accordion_setting').val();
    $.ajax({
        type: "POST",
        url: "production_dashboard/production_php/ProductionController.php",
        dataType: 'json',
        data: { 
            action: "getAddGoupConfiguration",
            label:label,
            is_open: "show",
            graph:graph,
            nameDB: $("#nameDB").val(),
            textDB: $("#label_column option:selected").text()
        },
        success: function (result) {          
            if(result.code == 200) {
                showConfigurationColumn();
                getProductionGraphDetails($('.navigation-production').attr('data-index'));
                getMixedGraphDetails($('.navigation-production').attr('data-index'));
                toastr.success(result.message);
            } else {
                toastr.error(result.message);
            }
         },
    });
});

let showConfigurationColumn = function () {
    $.ajax({
        type: "POST",
        url: "production_dashboard/production_php/ProductionController.php",
        async: false,
        dataType: 'json',
        data: {
            action: "showConfigurationData",
            nameDB: $("#nameDB").val(),
        },
        success: function(result) {
            if(result.code == '200') {
                showGraphColumn(result);
            }
        }
    });
}
showConfigurationColumn();


$(document).on('click', '.remove_graph_column', function() {
    let id = $(this).attr('data-id');
    $.ajax({
        type: "POST",
        url: "production_dashboard/production_php/ProductionController.php",
        async: false,
        dataType: 'json',
        data: {
            id: id,
            action: "deleteGraphConfiguration",
            nameDB: $("#nameDB").val(),
        },
        success:function(result) {
            if(result.code == 200) {
                getProductionGraphDetails($('.navigation-production').attr('data-index'));
                getMixedGraphDetails($('.navigation-production').attr('data-index'));
                toastr.success(result.message);
            } else {
                toastr.error(result.message);
            }
        },
        error:function(result) {
            toastr.error(result);
        }
    });
});


$(document).on('click','#custom_machines_table tr', function(){
    let anl_ID = $(this).find("td:first").text();
    let index = $('.navigation-production').attr('data-index');
    let data_array = $('.navigation-production').attr('data-array');
    let data_result = $('.navigation-production').attr('data-result');
    
    let findIndex = index;
    let params = {
    	id:anl_ID,
        dataIndex:data_array,
        machineIndex:findIndex,
        dataResult: data_result,
        prop_id:$('#property-data').val()
    }
    machineCommonAjax(params);
    getDynamicProductionColumns(findIndex, anl_ID);
    getProductionGraphDetails(findIndex, anl_ID);
    getMixedGraphDetails(findIndex, anl_ID);
});

const createProductInfo = (element, data) => {
    console.log('data',data);
    let html = '';
    $.each(data, function (key, value) {           
        html += `<option value='${key}'>${value}</option>`;
    });
    $(element).html(html);
    
}

let getProductionGraphDetails = (index, anl_ID="") => {
    $.ajax({
        type: "POST",
        url: "production_dashboard/production_php/GraphController.php",
        async: false,
        dataType: 'json',
        data: {
            id:anl_ID,
            dataIndex:$(".navigation-production").attr("data-array"),
            machineIndex:index,
            action: "getProdDataInfo",
            nameDB: $("#nameDB").val(),
        },
        success:function(result) {
            console.log('here data');
            if(result.code == '200') {
                if (showRecord(result.graphData)) {
                    $('.product_graph_msg').hide();
                    $(".product_graph_div").show();
                    console.log("result['graphData'][0]['prodInfo']",result['graphData'][0]['prodInfo']);
                    createProductInfo('#orderFilterProduction', result['graphData'][0]['prodInfo']);
                  //  createAmChart(root_other_graph, result.graphData, true, 'production'); 
                    productionAppButtons('#timeFilterIntervalProduction', result.graphData, 'production');
                   // createAmChartCategory(root_other_graph, result.graphData, true, 'production');
                } else {
                    $('.product_graph_msg').show();
                }
            }
        },
        error:function(result) {
            console.log('Error in function getProdDataInfo() Please check');
        }
    });
}

const getProdDataColumn = () => {
    $.ajax({
        type: "POST",
        url: "production_dashboard/production_php/ProductionController.php",
        dataType: 'json',
        data: {
            action: "getProdDataColumn",
            nameDB: $("#nameDB").val(),
        },
        success: function(result) {
            if(result.code == '200') {
                let html = '';
                $.each(result.data, function (key, value) {           
                    html += `<option value='${value.COLUMN_NAME}'>${value.COLUMN_NAME}</option>`;
                });
                $('#label_column').html(html);
            }
        }
    });
}
getProdDataColumn();

const getAnlagenColumn = () => {
    $.ajax({
        type: "POST",
        url: "production_dashboard/production_php/ProductionController.php",
        dataType: 'json',
        data: {
            action: "getAnlagenColumn",
            nameDB: $("#nameDB").val(),
        },
        success: function(result) {
            if(result.code == '200') {
                let html = '';
                $.each(result.data, function (key, value) {           
                    html += `<option value='${value.COLUMN_NAME}'>${value.COLUMN_NAME}</option>`;
                });
                $('#machine-table-column-DualListbox').html(html);
            }
        }
    });
}
getAnlagenColumn();
// let graphConfiguration = function () {
//     $.ajax({
//         type: "POST",
//         url: "production_dashboard/production_php/ProductionController.php",
//         async: false,
//         dataType: 'json',
//         data: {
//             action: "getGraphConfiguration",
//             nameDB: $("#nameDB").val(),
//         },
//         fail: function() {
//             alert("failed!!")
//         },
//         success: function(result) {
//             console.log('graph', result);
//             if(result.code == '200') {
//                 console.log('here isrfsadgd');
//             }
//         }
//       });
// }
// graphConfiguration();

let getMixedGraphDetails = (index, anl_ID="") => {
    $.ajax({
        type: "POST",
        url: "production_dashboard/production_php/GraphController.php",
        async: false,
        dataType: 'json',
        data: {
            id:anl_ID,
            dataIndex:$(".navigation-production").attr("data-array"),
            machineIndex:index,
            action: "getProdDataInfo",
            nameDB: $("#nameDB").val(),
            graphType: 'energy'
        },
        success:function(result) {
            if(result.code == '200') {
                if(showRecord(result.graphData)){
                    $('.mixed_graph_msg').hide();
                    $(".mixed_graph_div").show();
                    console.log("result['graphData'][0]['prodInfo']",result['graphData'][0]['prodInfo']);
                    createProductInfo('#orderFilterMixed', result['graphData'][0]['prodInfo']);
                    productionAppButtons('#timeFilterIntervalMixed', result.graphData, 'mixed');
                    // createAmChartCategory(mixed_root, result.graphData, true, 'production');
                }else{
                    $('.mixed_graph_msg').show();
                }
            }
        },
        error:function(result) {
            console.log('Error in function getProdDataInfo() Please check');
        }
    });
}