let newMachineTable;
$(document).on('click','#anlSuchenProd',function(){
    getMachineTable();
});


function getMachineTable() {
    newMachineTable = $('#machineListingTable').DataTable({
        ajax: {
            type: "POST",
            url: "../../php/getAnlagen.php",
            data: {
                ins: "anlLieg",
                nameDB: 'g002_badber',
                liegID: '1'
            },
            dataSrc: ''
        },
        columns: [
            { data: 'anl_ID' },
            { data: 'lieg_ID' },
            { data: 'nameLieg' },
            { data: 'nummerAnl' },
            { data: 'bezeichnungAnl' },
            { data: 'typAnl' },
            { data: 'standortAnl' },
            { data: 'datumAnschaffungAnl' },
            { data: 'produktionsmengeAnl' },
            { data: 'abwaermeNutzbarkeit1Anl' },
        ],
    });
    console.log('here_data');
    
}



function testFunction(){
    $.ajax({
        type: "POST",
        async: !0,
        url: "../../php/getAnlagen.php",
        data: {
            ins: "anlLieg",
            nameDB: 'g002_badber',
            liegID: '1'
        },
        success: function(response) {
            a = JSON.parse(response);
            
            console.log('res_listing', a);
        }
    })
}
testFunction();


$(document).on('click','.custom-check-box-display',function(){
    // Get the column API object
    var column = newMachineTable.column($(this).attr('data-column'));
 
    // Toggle the visibility
    column.visible(!column.visible());
});