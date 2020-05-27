// Getting data and filtering, as well as modifying it
function DataMachine(){
  this.originalData = null;
  this.data = null;
  this.filter = null;
  this.query = "";
  }
  DataMachine.prototype.runQuery = function(mode, nameDB, query){
    return performAjaxCall(mode, nameDB, query);
  }

function performAjaxCall(mode, nameDB, query){
    var spinHandle = loadingOverlay.activate();
    let promise = new Promise(function(resolve, reject){
      $.ajax({
        type: 'POST',
        async: true,
        url: 'php/queryData.php',
        data: {
          nameDB: nameDB,
          mode: mode,
          liegID: $("#liegID").val(),
          query: query
        },
        success: function(records){
          if(records.length > 0){
            loadingOverlay.cancel(spinHandle);
            resolve(records);
          }
          else{
            reject("Ajax Call failed!No data has been returned.");
          }
        }
      });
    });
    return promise;
  }
