function DataMachine() {
    this.filter = this.data = this.originalData = null;
    this.query = ""
}
DataMachine.prototype.runQuery = function(a, d, e) {
    return performAjaxCall(a, d, e)
};

function performAjaxCall(a, d, e) {
    return new Promise(function(resolve, reject) {
        $.ajax({
            type: "POST",
            async: !0,
            url: "php/queryData.php",
            data: {
                nameDB: d,
                mode: a,
                liegID: $("#liegID").val(),
                query: e
            },
            success: result => {
                if(result.length > 0) {
                    resolve(result)
                } else {
                    reject("Ajax Call failed!No data has been returned.")
                }
            }
        })
    })
};
