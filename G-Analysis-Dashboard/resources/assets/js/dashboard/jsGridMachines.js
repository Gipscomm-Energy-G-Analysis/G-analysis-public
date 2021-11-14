const searchMachine = document.getElementById('searchMachines');
const searchMachineModal = document.getElementById('modal-Machine-list');
let intiated = false;

const searchMachineFunction = () => {
    $('#modal-Machine-list').modal('show');
    jsGridFunction(columns);
    if(!intiated){
     //   jsGridFunction();
 //    customMachineTable();
    }
}


const customMachineTable = () => {
    let container = document.getElementById('custom_machine_table');
    let spinner = new Spinner();
    spinner.spin(container);
    $.ajax({
        type: "GET",
        url: "get-custom-machine-data",
        success:function(result) {
            spinner.stop();
            if(result.status == 200) {
                createCustomThead(result.thead);
                createCustomTbody(result.tbody);
                
            }
        },
        error:function(result) {
            toastr.error(result);
        }
    });
}


const createCustomThead = (thead) => {
    let html = '<tr>';
    $.each(thead, function(key, value) {
        html += `<th>${value}</th>`;
    });
    html += '</tr>'; 
     $('#custom_machine_table thead').html(html);
}

const createCustomTbody = (tbody) => {
    let html = '<tr>';
    $.each(tbody, function(key, value) {
        html += '<tr>';
        $.each(value, function(key1, value1) {
            let dataval = value1;
            if(dataval === null) dataval = '';
            html += `<td>${dataval}</td>`;
        });
        html += '</tr>';
    });
     
    $('#custom_machine_table tbody').html(html);
}

const getCustomColumns = () => {
    $.ajax({
        type: "GET",
        url: "get-custom-machine-columns",
        success:function(result) {
            console.log(result);
            columns = result;
        },
        error:function(result) {
            toastr.error(result);
        }
    });
}
getCustomColumns();

const jsGridFunction = (columns) => {
    intiated = true;
    $("#custom_machine_table").jsGrid({
        height: "100%",
        width: "100%",
        sorting: true,
        paging: true,
        pageIndex: 1,
        pageSize: 10,
        autoload: true,
        pageLoading:true,
        loadIndicator: function(config) {
            let container = config.container[0];
            let spinner = new Spinner();
            container.classList.add("opaque");
            return {
                show: function() {
                    spinner.spin(container);
                },
                hide: function() {
                    container.classList.remove("opaque");
                    spinner.stop()
                }
            };
        },
        rowClick: function(args) {
            $('#modal-Machine-list').modal('hide');
            getMachineData(args.item.anl_ID, 'current');
        },
        controller: {
            loadData: function (filter) {
                const d = $.Deferred();
                $.ajax({
                    url: "get-custom-machine-data",
                    type: 'POST',
                    dataType: "json",
                    data:{
                        'pageIndex':filter.pageIndex,
                        'pageSize':filter.pageSize,
                    }
                }).done(function(response) {
                    d.resolve(response);
                });
                return d.promise();
            }
        },
        fields: columns
    });
}

searchMachine.addEventListener('click', searchMachineFunction);

$("#graph_data_form").validate({
    rules: {
        graph_name: {
            required: true
        },
        label_column: {
            required: true
        },
    },
    submitHandler: function (form) {
        var email = $("#email").val();
        $.ajax({type: "POST",
            url: "product-graph/save",
            data: { 
                graph_name: $('#graph_name').val(), 
                label_name: $('#label_column').val(),
                accordion_setting: $('#accordion_setting').val()
            },
            success:function(result) {
                spinner.stop();
                if(result.status == 200 ){
                    toastr.success(result.msg);
                    getMachineData($('.navigation').attr('data-value'),"current");
                    getGraphConfiguration();
                }
            },
            error:function(result) {
                spinner.stop();
                toastr.success('Internal Server Error!');
            }
        });
    }
});

const getGraphConfiguration = () => {

    $.ajax({
        type: "GET",
        url: "get-graph-configuration",
        success:function(result) {
            if(result.status == 200) {
                getGraphConfigurationHook(result);
            }
        },
        error:function(result) {
            toastr.error(result);
        }
    });
                            
}

const getGraphConfigurationHook = (result) =>{
    let html = '<tr>';
    $.each(result.data, function(key, value) {
            html += `<tr>
            <td>${key+1}</td>
            <td>${value.graph_name}</td>
            <td>${value.label}</td>
            <td><button type="button" name="remove" id="${value.id}" class="btn btn-danger btn_delete_graph_conf"><i class="far fa-trash-alt"></i></button></td>
        </tr>`;
    });
    
    $('#dynamic_subgroup_field tbody').html(html);
}

$(document).on('click','.btn_delete_graph_conf',function() {
    deleteGraphConfiguration($(this).attr('id'));
});

const deleteGraphConfiguration = (id) => {
    $.ajax({
        type: "POST",
        url: "delete-graph-configuration",
        data: { 
            id: id, 
        },
        success:function(result) {
            if(result.status == 200) {
                getGraphConfigurationHook(result);
            }
        },
        error:function(result) {
            toastr.error(result);
        }
    });
}