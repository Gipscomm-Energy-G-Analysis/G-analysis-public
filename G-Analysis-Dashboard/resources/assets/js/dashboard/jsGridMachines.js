const searchMachine = document.getElementById('searchMachines');
const searchMachineModal = document.getElementById('modal-Machine-list');
let intiated = false;

const searchMachineFunction = () => {
    $('#modal-Machine-list').modal('show');
    if(!intiated){
        jsGridFunction()
    }
}

const jsGridFunction = () => {
    intiated = true;
    $("#jsGrid1").jsGrid({
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
                    console.log(response);
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

