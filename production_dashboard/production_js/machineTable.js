let newMachineTable;
$(document).on('click','#anlSuchenProd',function(){
    console.log('data',{
                    ins: "anlLieg",
                    nameDB: ($("#nameDB").val())?$("#nameDB").val():'g002_badber',
                    liegID: ($("#property-data").val())?$("#property-data").val():'1'
                });
    getMachineTable();
});


function getMachineTable() {
    console.log('newMachineTable',newMachineTable);
    $('#machineListingTable').DataTable().clear().destroy();
    $('#machineListingTable').DataTable({
            ajax: {
                type: "POST",
                url: "../../php/getAnlagen.php",
                data: {
                    ins: "anlLieg",
                    nameDB: ($("#nameDB").val())?$("#nameDB").val():'g002_badber',
                    liegID: ($("#property-data").val())?$("#property-data").val():'1'
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
    // if(newMachineTable) {
    //     newMachineTable.ajax.reload();
    // } else {
    //     newMachineTable = $('#machineListingTable').DataTable({
    //         ajax: {
    //             type: "POST",
    //             url: "../../php/getAnlagen.php",
    //             data: {
    //                 ins: "anlLieg",
    //                 nameDB: ($("#nameDB").val())?$("#nameDB").val():'g002_badber',
    //                 liegID: ($("#property-data").val())?$("#property-data").val():'1'
    //             },
    //             dataSrc: ''
    //         },
    //         columns: [
    //             { data: 'anl_ID' },
    //             { data: 'lieg_ID' },
    //             { data: 'nameLieg' },
    //             { data: 'nummerAnl' },
    //             { data: 'bezeichnungAnl' },
    //             { data: 'typAnl' },
    //             { data: 'standortAnl' },
    //             { data: 'datumAnschaffungAnl' },
    //             { data: 'produktionsmengeAnl' },
    //             { data: 'abwaermeNutzbarkeit1Anl' },
    //         ],
    //     });
    // }  
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