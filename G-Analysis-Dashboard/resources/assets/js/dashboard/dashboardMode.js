
$(document).on('change', '#modeSelector', function(){
    if ($(this).prop('checked')) {
        $('.view-mode').show();
        $('.edit-mode').hide();
    } else {
        $('.view-mode').hide();
        $('.edit-mode').show();
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
            if (label_data) {
                label = value.label_name;
                column = value.column_name;
            }
            html += `<tr>
            <td>${column}<input hidden class="configuration_column_data" value="${column}"></td>
            <td class="custom_label_td" style="text-align:center;">
                <span class="custom_label_span">${label}</span>
                <input style="display:none;" type="text" name="configuration_value_data[]" placeholder="Enter Custom Label Name" value="${label}" class="form-control custom_label_input"/>
                <button type="button" name="remove" class="btn btn-info edit_label float-right"><i class="fas fa-edit"></i></button>
            </td>
            <td><button type="button" name="remove" class="btn btn-danger remove_column"><i class="far fa-trash-alt"></i></button></td>
            </tr>`;
            
        });

    $('#configuration_table tbody').html(html);
}

let showPrimaryKey = (data, selected) => {
    let html = '';
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
    let html = '';
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
    $(ele).find('.custom_label_input').show();
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
    if( $(this).val()) {
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
    let dataArray = {
        'table': $('#select_group_table').val(),
        'group_id' :$('#select_group_options').val() ,
        'primary_key' :$('#primary_key_subGroup').val() ,
        'foreign_key' : $('#foreign_key_subGroup').val() ,
        'column' : column,
        'label' :label
    }
    saveSubGroupConfigurations(dataArray);
});

$(document).on('change', '#select_primary_column', function() {
    if ($('#select_table').val() == '') {
        toastr.warning('Please select Table!');
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
    if ($('#select_group_table').val() == '') {
        toastr.warning('Please select Group Table!');
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