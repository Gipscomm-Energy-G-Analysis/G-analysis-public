const searchMachine = document.getElementById('searchMachines');
const searchMachineModal = document.getElementById('modal-Machine-list');
let intiated = false;

const searchMachineFunction = () => {
    $('#modal-Machine-list').modal('show');
    jsGridFunction();
    if(!intiated){
        jsGridFunction();
    //  customMachineTable();
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

const jsGridFunction = () => {
    intiated = true;
    $("#custom_machine_table").jsGrid({
        height: "100%",
        width: "100%",
        sorting: true,
        paging: true,
        pageIndex: 1,
        pageSize: 15,
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
                    url: "/dashboard/getMachineTableData",
                    type: 'POST',
                    dataType: "json",
                    data:{
                        'pageIndex':filter.pageIndex,
                        'pageSize':filter.pageSize,
                    }
                }).done(function(response) {
                    d.resolve(response)
                });
                return d.promise();
            }
        },

        fields: [
            { name: "anl_ID", type: "number", width: 50, title: "ID", align: "center" },
            { name: "datumAnl", type: "date", width: 50, title: "Date", align: "center" },
            { name: "nummerAnl", type: "number", width: 50, title: "Machine Name", align: "center" },
            { name: "bezeichnungAnl", type: "description", title: "Description", align: "center" }
        ]
    });
}

searchMachine.addEventListener('click', searchMachineFunction);

