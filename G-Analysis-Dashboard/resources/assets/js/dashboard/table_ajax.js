function getTableData(){
    $.ajax({
        url:'product/data-table',
        type: 'GET',
    }).done( function(data) {
        $('#example2').dataTable( {
            "aaData": data,
            "columns": [
                { "data": "prd_ID" },
                { "data": "org_ID" },
                { "data": "namePrd" },
                { "data": "datum" },
                { "data": "artikelNrPrd" },
            ]
        })
    })
}
getTableData();
