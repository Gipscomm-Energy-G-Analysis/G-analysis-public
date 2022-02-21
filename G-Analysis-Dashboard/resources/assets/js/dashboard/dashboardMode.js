
$(document).on('change', '#modeSelector', function(){
    if ($(this).prop('checked')) {
        $('.view-mode').show();
        $('.edit-mode').hide();
    } else {
        $('.view-mode').hide();
        $('.edit-mode').show();
    }
});


$(document).on('change', '#modeSelectorColumns', function(){
    if ($(this).prop('checked')) {   
        $('.select_group_options_div').show();
        $('.select_group_options_div_alt').hide();
        $('.coustom-column-div').hide();
    } else {
        $('.select_group_options_div').hide();
        $('.select_group_options_div_alt').show();
        $('.coustom-column-div').show();
    }
});

let saveSubGroupConfigurations = (data) => {
    let container = document.getElementById('spin_container');
    spinner.spin(container);
    $.ajax({
        type: "POST",
        url: "/save-configuration-data",
        data:data,
        success:function(result) {
            spinner.stop();
            if(result.status == 200) {
                toastr.success(result.msg);
                getMachineData($('.navigation').attr('data-value'),"current");
            }
        },
        error:function(result) {
            spinner.stop();
            toastr.error(result);
        }
    });
}

let showConfigrationTable = (data , label_data=false) => {
    let html = '';

        $.each(data, function(key, value) {
            let label = value;
            let column = value;
            let graph_value = value;

            if (label_data) {
                label = value.label_name;
                column = value.column_name;
                graph_value = value.graph_value_name;
            }
            html += `<tr>
            <td>${column}<input hidden class="configuration_column_data" value="${column}"></td>
            <td class="custom_label_td" style="text-align:center;">
                <span class="custom_label_span">${label}</span>
                <input style="display:none;" type="text" name="configuration_value_data[]" placeholder="Enter Custom Label Name" value="${label}" class="form-control custom_label_input"/>
                <button type="button" name="remove"  class="btn btn-danger remove_column float-right"><i class="far fa-trash-alt"></i></button>
                <button type="button" name="remove" style="margin-right:5px;" class="btn btn-info edit_label float-right"><i class="fas fa-edit"></i></button>
            </td>
            <td  style="width: 160px; padding-top: 20px; text-align:center;">
            <input type="checkbox" value="${label}" class="graph_checkbox_value" checked data-toggle="toggle" data-on="" data-off="" data-onstyle="success" data-offstyle="info">
            </td>  
            </tr>`;
        });

    $('#configuration_table tbody').html(html);
}

let showPrimaryKey = (data, selected) => {
    let html = '<option value="">Select</option>';
    $.each(data, function(key, value) {
        if(value == selected) {
            html += `<option selected value="${value}">${value}</option>`;
        } else {
            html += `<option value="${value}">${value}</option>`;
        }
        
    });
    $('.primary_key_subGroup').html(html);
}

let showForeignKey = (data, selected) => {
    let html = '<option value="">Select</option>';
    $.each(data, function(key, value) {
        if(value == selected) {
            html += `<option selected value="${value}">${value}</option>`;
        } else {
            html += `<option value="${value}">${value}</option>`;
        }  
    });
    $('.foreign_key_subGroup').html(html);
}

let getGroupData = () => {
    let container = document.getElementById('spin_container');
    spinner.spin(container);
    let groupId = $('#select_group_options').val();
    let table = $('#select_group_table').val();
    
    if(groupId && table) {
        $.ajax({
            type: "POST",
            url: "/get-configuration-data",
            data:{
                'grosubGroupId':groupId,
                'table':table
            },
            success:function(result) {
                spinner.stop();
                if(result.status == 200) {
                    $('.showData').show();
                    $('.hideData').hide();
                    console.log(result);
                    showConfigrationTable(result.table_data, result.legacy);
                    showPrimaryKey(result.primary_key, result.selected_primary_key);
                    showForeignKey(result.foreign_key, result.selected_foreign_key);
                }
            },
            error:function(result) {
                spinner.stop();
                toastr.error(result);
            }
        });
    }
    
}

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

$(document).on('change', '#select_group_table', function(){
    if( $(this).val() && $('#modeSelectorColumns').prop('checked')) {
        getGroupData();
    }
});

$(document).on('click', '.remove_column', function() {
    $(this).parent().parent().remove();
})

$(document).on('change', '#select_group_options', function() {
    $.ajax({
        type: "POST",
        url: "get-selected-configuration-data",
        data:{
            'subGroupId':$('#select_group_options').val(),
        },
        success:function(result) {
            if(result != ''){
                $('.showData').show();
                $('.hideData').hide();
                
            } else {
                $('.showData').hide();
                $('.hideData').show();
            }
            $('#select_group_table').val(result).trigger('change');
        },
        error:function(result) {
            toastr.error(result);
            
        }
    });
}); 

$(document).on('click', '#save_configuration_button', function() {
    if ($('#select_group_options').val() == '') {
        toastr.warning('Please select group option!');
        return false;
    } else if($('#select_group_table').val() == '') {
        toastr.warning('Please select Table!');
        return false;
    } else if($('#primary_key_subGroup').val() == '') {
        toastr.warning('Please select primary key!');
        return false;
    } else if($('#foreign_key_subGroup').val() == '') {
        toastr.warning('Please select foreign key!');
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

    // console.log('checkbox',checkbox );

    let dataArray = {
        'table': $('#select_group_table').val(),
        'group_id' :$('#select_group_options').val() ,
        'primary_key' :$('#primary_key_subGroup').val() ,
        'foreign_key' : $('#foreign_key_subGroup').val() ,
        'column' : column,
        'label' :label,
        'graph_value':checkbox
    }

    // console.log(checkbox);

    saveSubGroupConfigurations(dataArray);
});

$(document).on('change', '#select_primary_column', function() {
    if ($('#select_table').val() == '') {
        toastr.warning('Please select Table!');
        return false;
    }
    if ($(this).val() == '') {
        toastr.warning('Please select primary column!');
        return false;
    }
    $.ajax({
        type: "POST",
        url: "/get-same-type-column",
        data:{
            'column':$(this).val(),
            'foreign_key_table':$('#select_table').val()
        },
        success:function(result) {
            if(result.status == 200) {
                let html = '<option value="">Select</option>';
                $.each(result.data, function(key, value) {
                    html += `<option value="${value}">${value}</option>`;
                });
                $('#select_foreign_column').html(html);
            }
        },
        error:function(result) {
            spinner.stop();
            toastr.error(result);
        }
    });
})


$(document).on('change', '#primary_key_subGroup', function() {
    let container = document.getElementById('spin_container');
    spinner.spin(container);
    if ($('#select_group_table').val() == '') {
        spinner.stop();
        toastr.warning('Please select Group Table!');
        return false;
    } else if ($(this).val() == '') {
        spinner.stop();
        toastr.warning('Please select Primary key!');
        return false;
    }
    $.ajax({
        type: "POST",
        url: "/get-same-type-column",
        data:{
            'column':$(this).val(),
            'foreign_key_table':$('#select_group_table').val()
        },
        success:function(result) {
            spinner.stop();
            if(result.status == 200) {
                let html = '<option value="">Select</option>';
                $.each(result.data, function(key, value) {
                    html += `<option value="${value}">${value}</option>`;
                });
                $('#foreign_key_subGroup').html(html);
            }
        },
        error:function(result) {
            spinner.stop();
            toastr.error(result);
        }
    });
})
                                                                                                       

$(document).on('change', '#select_graph_primary_column', function() {
    let container = document.getElementById('spin_container');
    spinner.spin(container);
    if ($('#select_graph_table').val() == '') {
        spinner.stop();
        toastr.warning('Please select Group Table!');
        return false;
    } else if ($(this).val() == '') {
        spinner.stop();
        toastr.warning('Please select Primary key!');
        return false;
    }
    $.ajax({
        type: "POST",
        url: "/get-same-type-column",
        data:{
            'column':$(this).val(),
            'foreign_key_table':$('#select_graph_table').val()
        },
        success:function(result) {
            spinner.stop();
            if(result.status == 200) {
                let html = '<option value="">Select</option>';
                $.each(result.data, function(key, value) {
                    html += `<option value="${value}">${value}</option>`;
                });
                $('#select_graph_foreign_column').html(html);
            }
        },
        error:function(result) {
            spinner.stop();
            toastr.error(result);
        }
    });
})




const showTableConfigurations = (data) => {
    let html = '';
    $.each(data, function(key, value) {
        html += `<option value="${value.column}" ${value.option}>${value.column}</option>`;
    });
    $(".duallistbox").empty().append(html);
    dualList.bootstrapDualListbox('refresh', true);
}

$(document).on('click', '#machine_table_configuration', function() {
    $.ajax({
        type: "GET",
        url: "/get-table-configurations",
        success:function(result) {
            if(result.status == 200) {
                showTableConfigurations(result.data);
                showMachinePrioritySelect(result.machinePriorityData);
            }
        },
        error:function(result) {
            toastr.error(result);
        }
    });
})

const showMachinePrioritySelect = (data) => {
    let selectHtml = '';
    for(const select_name of data.allMachines) {
        if(data.selected.includes(select_name.anl_ID)){
            selectHtml += `<option value='${select_name.anl_ID}' selected>${select_name.nummerAnl}</option>`;
        } else {
            selectHtml += `<option value='${select_name.anl_ID}'>${select_name.nummerAnl}</option>`;
        }
    }
    $('#multi-machine-prioprity').html(selectHtml).select2();
}

const saveTableConfigurations = (data, priorityMachines) => {
    $.ajax({
        type: "POST",
        url: "/save-table-configurations",
        data: {
            column: data,
            priorityMachines: priorityMachines
        },
        success:function(result) {
            if(result.status == 200) {
                $('#modal-machine-configuration').modal('hide');
                getCustomColumns();
                toastr.success(result.msg);
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
    saveTableConfigurations(selectedColumn, priorityMachines);
})  