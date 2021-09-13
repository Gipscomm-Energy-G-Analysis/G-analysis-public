const navigationHook = document.querySelectorAll('.navigation button');
const replaceImageButton = document.getElementById('replace-image-button');
const imageInputField = document.getElementById('machineImage');
const graphDiv = document.getElementById('graph_div');
const anl_ID = document.getElementById('anl_ID').value;
const dbName = document.getElementById("nameDB").value;
const username = document.getElementById("username").value; 
let columns;

let machineDataAjax;
let spinner = new Spinner();
const graphDivHook = (key, value) => {
    let html = `<div class="col-sm-6 main_chart" data_value="${value.id}" data_event="lineChart_${key}">
                    <div class="card card-info">
                        <div class="card-header">
                            <h3 class="card-title">Line Chart for ${key}</h3>
                        </div>
                        <div class="card-body">
                            <div class="chart">
                                <canvas id="lineChart_${key}" style="background:#F1F6FD;" ></canvas>
                            </div>
                        </div>
                    </div>
                </div>`;
    //appending data to graphDiv
    $('#graph_div').append(html);
    lineChartHook('lineChart_'+key, value.label, value.data, key);
}

const getPrimaryKey = () => {
    $.ajax({
        url:'/dashboard/tableColumn',
        type: 'POST',
            data: {
                table:'anlagen'
            },
        }).done( function(response) {
            $('#select_primary_column').html('<option value="">Select</option>');
            $.each(response, function(key, value) {
                $('#select_primary_column').append('<option value="'+ value +'">'+ value +'</option>');
            });
    });
}

const showMachineData = (data) => {
    let even = '';
    let odd = '';
    $.each(data.even, function(key, value) {
        if(value == null) value = '';
        even += `<div class="form-group row">
                    <div class="col-sm-12">
                        <label for="${key}" class="col-form-label capital">${key}</label>
                        <input type="text" class="form-control" id="${key}" placeholder="${key}" value="${value}" readonly>
                    </div>
                </div>`;
    });
    $.each(data.odd, function(key, value) {
        if(value == null) value = '';
        odd += `<div class="form-group row">
                    <div class="col-sm-12">
                        <label for="${key}" class="col-form-label capital">${key}</label>
                        <input type="text" class="form-control" id="${key}" placeholder="${key}" value="${value}" readonly>
                    </div>
                </div>`;
    });
    $('.left_section').html(even);
    $('.right_section').html(odd);
}

const getMachineData = (machine_id, type) => {
    var formData = new FormData();
    let prop_id = document.getElementById("select_prop").value;
    let container = document.getElementById('data-card');
    formData.append("id", machine_id);
    formData.append("type", type);
    formData.append("prop_id", prop_id);
    spinner.spin(container);
    machineDataAjax = $.ajax({
        url:'/dashboard/machine',
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
    }).done( function(response) {
        const data = response.data;
        spinner.stop();
        if(response.code == 200 ){
            graphDiv.innerHTML = '';
            $("#data-card").show();
            $("#bar_chart").show();
            $("#msg").hide();
            $('.navigation').attr('data-value', data.anl_ID);
            $('#anl_ID').val(data.anl_ID);
            showMachineData(response.dynamicData);
            $('#machine-image').attr('src',data.bildAnl);
            $('#timeFilter').val('5');
            $("#machine-image").on("error", function () {
                $(this).attr("src", "images/Blasanlage.jpg");
            });
            $.each( data.chartsData, function( key, value) {
                graphDivHook(key, value);
            });
            
            if(response.subGroupConfig) {
                loadSubGroup(response.subGroupConfig);
            }
        } else if(response.anl_ID !== undefined) {
            toastr.error(response.message);

            $("#data-card").show();
            // $("#not_found_msg").hide();
            $('.navigation').attr('data-value', response.anl_ID);
            $('#anlage').val("");
            $('#programm').val("");
            $('#artikel').val("");
            $('#bestellung').val("");
            // $('#bisher_produziert').val("");
            $('#auftragsmenge').val("");
            $('#gutmenge').val("");
            $('#ausschuss').val("");
            $('#zeit_zyklus').val("");
            $('#letzte_störung').val("");
            $('#werkzeug').val("");
            $('#kavitäten').val("");
            $('#machine-image').attr('src','images/Blasanlage.jpg');
        }
        else{
           $("#data-card").hide();
           $("#bar_chart").hide();
           $("#msg").show();
        }
    });
}



//adding event listener to navigation buttons
navigationHook.forEach((node)=>{
    node.addEventListener('click', function(){
        spinner.stop();
       if (machineDataAjax) machineDataAjax.abort();
        let type = this.getAttribute('event-type');
        let machine_id = $('.navigation').attr('data-value');
        $(".custom-select").val('');
        let numItems = $('.column-name').length;
        let result=[];
        let out = [];
        for (let i = 0; i < numItems; i++) {
            let col= document.querySelector('.column-name input.column-name_'+i).id;
            result[i] = col;
        }
        getMachineData(machine_id, type);
    });
});

const loadFile = (event) => {
    let file1, img;
    if(event.target.files[0].size > 2000000) {
        toastr.warning('File size should be less than 2mb.');
        return false;
    }
    if(file1 = event.target.files[0]){
        let output = document.getElementById('machine-image');
        img = new Image();
        img.onload = function(){
            //console.log(this.width + "x" + this.height);
            if(this.width <= 870 && this.height <= 621){
                output.src = URL.createObjectURL(event.target.files[0]);
                let myFormData = new FormData();
                let file = event.target.files[0];
                const anl_ID = $('#anl_ID').val();
                myFormData.append('file',file);
                myFormData.append('anl_ID',anl_ID);
                $.ajax({
                    headers:{'X-CSRF-Token':$('meta[name=csrf_token]').attr('content')},
                    type:"post",
                    async: true,
                    contentType: false,
                    cache: false,
                    processData:false,
                    url:`/uploadImage`,
                    data:myFormData,
                    success:function(data){
                        console.log("success");
                    }
                });
            }else{
                alert('Image dimensions should be smaller than or equal to  870 x 621.');
                return false;
            }
           // URL.revokeObjectURL(output.src)
        };
        img.onerror = function() {
            alert( "not a valid file: " + file1.type);
        };
        img.src = URL.createObjectURL(file1);
    }
};


const loadSubGroup = (data) => {
    let even = '';
    let odd = '';
    $.each(data.even, function(key, value) {
        if(value == null) value = '';
        even += `<div class="form-group row">
                    <div class="col-sm-12">
                        <label class="col-form-label">${key}</label>
                        <input type="text" class="form-control" placeholder="${key}" value="${value}" readonly>
                    </div>
                </div>`;
    });
    $.each(data.odd, function(key, value) {
        if(value == null) value = '';
        odd += `<div class="form-group row">
                    <div class="col-sm-12">
                        <label class="col-form-label">${key}</label>
                        <input type="text" class="form-control" placeholder="${key}" value="${value}" readonly>
                    </div>
                </div>`;
    });
    $('.even_sub_data').html(even);
    $('.odd_sub_data').html(odd);
}

//Firing click event on button click
replaceImageButton.addEventListener('click', () => {
    imageInputField.click();
});
imageInputField.addEventListener('change', loadFile);

// var intervalId = window.setInterval(function(){
//     let type = "current";
//     let machine_id = $('.navigation').attr('data-value');
//     let numItems = $('.column-name').length;
//     let result=[];
//     let out = [];
   
//     for (let i = 0; i < numItems; i++) {
//         let col= document.querySelector('.column-name input.column-name_'+i).id;
//         result[i] = col;
//     }
//     getMachineData(machine_id, type, propId='',result);
//   }, 10000);

select_org();
function select_org() {
    let orgId  = document.getElementById("select_org").value;
    let dbName = document.getElementById("nameDB").value;
    $('.liegenschaft').html("");
    $.ajax({
        url:'/dashboard/propertyData',
        type: 'POST',
            data: {
                orgId:orgId,
                dbName:dbName
            },
        }).done( function(response) {
            $('.liegenschaft').append('<option value="">Please Select--</option>');
            $.each(response, function(key, value) {
                if(key == 0) {
                    $('.liegenschaft').append('<option value="'+ value.lieg_ID +'" selected>'+ value.nameLieg +'</option>');
                } else {
                    $('.liegenschaft').append('<option value="'+ value.lieg_ID +'">'+ value.nameLieg +'</option>');
                }

            });
    });
}

function select_table() {
    let table  = document.getElementById("select_table").value;
    let dbName = document.getElementById("nameDB").value;
    $('#select_column').html("");
    $.ajax({
        url:'/dashboard/tableColumn',
        type: 'POST',
            data: {
                table:table,
                dbName:dbName
            },
        }).done( function(response) {
            $('#select_column').html('<option value="">Select</option>');
            $.each(response, function(key, value) {
                $('#select_column').append('<option value="'+ value +'">'+ value +'</option>');
            });
    });
}

$(document).on('change','#select_table', function() {
    select_table();
})


$("#save_field").on("click", function(e) {
    console.log('here');
    let container = document.getElementById('dynamic_subgroup_field');
    spinner.spin(container);
    let label  = document.getElementById("add_label_field").value;
    let table  = document.getElementById("select_table").value;
    let column = document.getElementById("select_column").value;
    let primary = document.getElementById("select_primary_column").value;
    let foreign = document.getElementById("select_foreign_column").value;
    if (label == '') {
        toastr.warning('Please Enter Label!');
        return false;
    } else if(table == ''){
        toastr.warning('Please select table!');
        return false;
    } else if(column == ''){
        toastr.warning('Please select custom column!');
        return false;
    } else if(primary == '') {
        toastr.warning('Please select primary column!');
        return false;
    } else if(foreign == '') {
        toastr.warning('Please select foreign column!');
        return false;
    } else {
        $('#modal-default').modal('hide');
        $.ajax({type: "POST",
            url: "/dashboard/saveFields",
            data: { anl_ID: anl_ID, 
                username: username, 
                dbName: dbName,
                label: label, 
                tableName: table,
                columnName: column,
                primaryKey: primary,
                foreignKey: foreign
            },
            success:function(result) {
                spinner.stop();
                if(result.status == 200 ){
                    toastr.success(result.msg);
                    getMachineData($('.navigation').attr('data-value'),"current");
                }
            },
            error:function(result) {
                spinner.stop();
                toastr.success('Internal Server Error!');
            }
        });
    }
});

$("#save_subgroup_options").on("click", function(e) {
    let container = document.getElementById('dynamic_subgroup_field');
    spinner.spin(container);
    let group_id    = document.getElementById("group_id").value;
    let sub_group_name  = $("input[name='sub_group[]']").map(function(){return $(this).val();}).get();
    let sub_options = $(".name_list").val();
    if (sub_options == '') {
        toastr.warning('"Please enter suboption name.');
        return false;
    } else {   
        $.ajax({
            type: "POST",
            url: "/dashboard/saveGroupOptions",
            data: { sub_group_name: sub_group_name, group_id: group_id},
            success:function(result) {
                spinner.stop();
                if(result.status == 200) {
                    createGroupTable(result.data);
                    toastr.success(result.msg);
                }
            },
            error:function(result) {
                spinner.stop();
                alert('error');
            }
        });
    }
});

// const createSubGroupSelect = () => {
//     let html = 
//     $.each(data, function(key, value) {
//         html += `<tr id="subrow${key}">
//             <td>${key}</td>
//             <td>
//                 <div class="form-group ">
//                     <label for="${value.option_name}" class="col-form-label group-label">${value.option_name}</label>
//                     <input type="hidden" name="sub_group[]" class="form-control name_list" value="${value.option_name}" />
//                     <button style="float:right;" type="button" name="remove" id="${key}" class="btn btn-danger btn_delete"><i class="far fa-trash-alt"></i></button>
//                 </div>
//             </td>
//         </tr>`;
//     });
// }


const createGroupTable = (data) => {
    let html = '';
    $.each(data, function(key, value) {
        html += `<tr id="subrow${key}">
            <td>${key}</td>
            <td>
                <div class="form-group ">
                    <label for="${value.option_name}" class="col-form-label group-label">${value.option_name}</label>
                    <input type="hidden" name="sub_group[]" class="form-control name_list" value="${value.option_name}" />
                    <button style="float:right;" type="button" name="remove" id="${key}" class="btn btn-danger btn_delete"><i class="far fa-trash-alt"></i></button>
                </div>
            </td>
        </tr>`;
    });
    $('#dynamic_subgroup_field tbody').html(html);
}

$('#add_sub').click(function() {
    let icount = $('#dynamic_subgroup_field tbody').find('tr').length+1;
    $('#dynamic_subgroup_field tbody').append(`<tr id="subrow${icount}">
        <td>${icount}</td>
            <td>
                <div class="row">
                    <div class="col-sm-8">
                        <input type="text" name="sub_group[]" placeholder="Enter Subgroup Name" class="form-control name_list" />
                    </div>
                    <div class="col-sm-4">
                        <button style="float:right;" type="button" name="remove" id="${icount}" class="btn btn-danger btn_delete">
                            <i class="far fa-trash-alt"></i>
                        </button>
                    </div>
                </div>
            </td>
        </tr>`);
});
        
$(document).on('click', '.btn_delete', function() {
    var button_id = $(this).attr("id");
    $('#subrow' + button_id + '').remove();
});


getPrimaryKey();