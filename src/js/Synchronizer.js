let CurrentLocation = {
        ANLAGENVERWALTUNG: 1,
        MESSSTELLENVERWALTUNG: 2,
        MESSMITTELVERWALTUNG: 3
    },
    SyncAction = {
        ANLAGE: 1,
        MESSSTELLE: 2,
        MESSMITTEL: 3
    }

function Synchronizer() {
    this.currentLocation = "";
    this.nameAnlage = "";
    this.nrAnlage = "";
    this.idAnlage = "";
    this.idMessstelle = "";
    this.idMessmittel = "";
}
Synchronizer.prototype.setCurrentLocation = function (currentLocation) {
    this.currentLocation = currentLocation;
}
Synchronizer.prototype.getCurrentLocation = function () {
    return this.currentLocation;
}
Synchronizer.prototype.setNameAnlage = function (nameAnlage) {
    try {
        this.nameAnlage = nameAnlage;
    } catch (err) {
        console.log("The property <" + arguments.callee.toString() + "> of an instance of 'Synchronizer' could not be set!");
        console.log("\n\n" + err);
    }
}
Synchronizer.prototype.getNameAnlage = function () {
    return this.nameAnlage;
}
Synchronizer.prototype.setIDAnlage = function (idAnlage) {
    try {
        this.idAnlage = idAnlage;
    } catch (err) {
        console.log("The property <" + arguments.callee.toString() + "> of an instance of 'Synchronizer' could not be set!");
        console.log("\n\n" + err);
    }
}
Synchronizer.prototype.getIDAnlage = function () {
    return this.idAnlage;
}
Synchronizer.prototype.setNrAnlage = function (nrAnlage) {
    try {
        this.nrAnlage = nrAnlage;
    } catch (err) {
        console.log("The property <" + arguments.callee.toString() + "> of an instance of 'Synchronizer' could not be set!");
        console.log("\n\n" + err);
    }
}
Synchronizer.prototype.getNrAnlage = function () {
    return this.nrAnlage;
}
Synchronizer.prototype.setIDMessstelle = function (idMessstelle) {
    try {
        this.idMessstelle = idMessstelle;
    } catch (err) {
        console.log("The property <" + arguments.callee.toString() + "> of an instance of 'Synchronizer' could not be set!");
        console.log("\n\n" + err);
    }
}
Synchronizer.prototype.getIDMessstelle = function () {
    return this.idMessstelle;
}
Synchronizer.prototype.setNameMessstelle = function (nameMessstelle) {
    try {
        this.nameMessstelle = nameMessstelle;
    } catch (err) {
        console.log("The property <" + arguments.callee.toString() + "> of an instance of 'Synchronizer' could not be set!");
        console.log("\n\n" + err);
    }
}
Synchronizer.prototype.getNameMessstelle = function () {
    return this.nameMessstelle;
}
Synchronizer.prototype.setIDMessmittel = function (idMessmittel) {
    try {
        this.idMessmittel = idMessmittel;
    } catch (err) {
        console.log("The property <" + arguments.callee.toString() + "> of an instance of 'Synchronizer' could not be set!");
        console.log("\n\n" + err);
    }
}
Synchronizer.prototype.getIDMessmittel = function () {
    return this.idMessmittel;
}
Synchronizer.prototype.setNameMessmittel = function (nameMessmittel) {
    try {
        this.idMessmittel = nameMessmittel;
    } catch (err) {
        console.log("The property <" + arguments.callee.toString() + "> of an instance of 'Synchronizer' could not be set!");
        console.log("\n\n" + err);
    }
}
Synchronizer.prototype.getNameMessmittel = function () {
    return this.nameMessmittel;
}
Synchronizer.prototype.synchronize = function (syncAction) {
    let own = this;
    // switch (own.currentLocation) {
    //   case CurrentLocation.ANLAGENVERWALTUNG:
    //   switch (syncAction) {
    //     case SyncAction.MESSSTELLE:
    //     let dataMachine = new DataMachine(),
    //     queryString = "SELECT anlageMst, mst_ID ";
    //     queryString += "FROM messstellen ";
    //     queryString += "WHERE anlagenIDMst = " + own.idAnlage + " ";
    //     dataMachine.runQuery("read", $("#nameDB").val(), queryString)
    //     .then(function (data){
    //       let jsonData = null;
    //       try{
    //         jsonData = JSON.parse(data);
    //       }
    //       catch(error){
    //         console.log("Parsing queried data failed: Synchronizer.synchronize()\nData = " + data);
    //       }
    //       if(jsonData.length === 0){
    //         let dataMachine2 = new DataMachine();
    //         /////
    //         console.log("Query vars array");
    //         console.log([own.idAnlage, own.nameAnlage, own.idMessstelle]);
    //         /////
    //         if(own.idAnlage != "" && own.idAnlage != 0 &&
    //         own.nameAnlage != "" &&
    //         own.idMessstelle != "" && own.idMessstelle != 0){
    //           queryString = "UPDATE messstellen ";
    //           queryString += "SET anlagenIDMst = '" + own.idAnlage + "' ";
    //           queryString += "anlageMst = '" + own.nameAnlage + "' ";
    //           queryString += "WHERE mst_ID = '" + own.idMessstelle + "' ";
    //           console.log(queryString);
    //           dataMachine2.runQuery("write", $("#nameDB").val(), queryString);
    //         }
    //         else {
    //           console.log("Synchronizer.synchronize() --> Canceled query due to an invalid member value(1)!");
    //           return;
    //         }
    //       }
    //       else {
    //         $("#meldungSynchronizer p label").text("Messmittel: " + jsonData[0].nameMessmittel);
    //         $("#meldungSynchronizer").dialog();
    //         $("#btnSyncOk, #btnSyncAbbr").off("click");
    //         $("#btnSyncOk").on("click", function(){
    //           $("#meldungSynchronizer").dialog("close");
    //           let dataMachine2 = new DataMachine();
    //           /////
    //           console.log("Query vars array");
    //           console.log([own.idAnlage, own.nameAnlage, own.idMessstelle]);
    //           /////
    //           if(own.idAnlage != "" && own.idAnlage != 0 &&
    //           own.nameAnlage != "" &&
    //           own.idMessstelle != "" && own.idMessstelle != 0){
    //             queryString = "UPDATE messstellen ";
    //             queryString += "SET anlagenIDMst = '" + own.idAnlage + "' ";
    //             queryString += "anlageMst = '" + own.nameAnlage + "' ";
    //             queryString += "WHERE mst_ID = '" + own.idMessstelle + "' ";
    //             console.log(queryString);
    //             dataMachine2.runQuery("write", $("#nameDB").val(), queryString);
    //           }
    //           else {
    //             console.log("Synchronizer.synchronize() --> Canceled query due to an invalid member value(2)!");
    //             return;
    //           }
    //         });
    //         $("#btnSyncAbbr").on("click", function(){
    //           $("#meldungSynchronizer").dialog("close");
    //         });
    //       }
    //     });
    //     break;
    //   }
    //   case CurrentLocation.MESSSTELLENVERWALTUNG:
    //   switch (syncAction) {
    //     case SyncAction.MESSMITTEL:
    //     if(own.idMessmittel !== ""){
    //       let dataMachine = new DataMachine(),
    //       queryString = "SELECT nrMsm AS nrMessmittel, messstelleMsm AS nameMessstelle ";
    //       queryString += "FROM messmittel ";
    //       queryString += "INNER JOIN messstellen ";
    //       queryString += "ON messmittel.messstelleIDMsm = messstellen.mst_ID ";
    //       queryString += "WHERE messstelleIDMsm = '" + own.idMessstelle + "' ";
    //       queryString += "AND lieg_ID = " + $("#liegID").val() + " ";
    //       console.log(queryString);
    //       dataMachine.runQuery("read", $("#nameDB").val(), queryString)
    //       .then(function (data){
    //         let jsonData = null;
    //         try{
    //           jsonData = JSON.parse(data);
    //         }
    //         catch(error){
    //           console.log("Parsing queried data failed: Synchronizer.synchronize()\nData = " + data);
    //         }
    //         console.log(jsonData);
    //         if(jsonData.length === 0){
    //           let dataMachine2 = new DataMachine();
    //           if(own.idMessmittel != "" && own.idMessmittel != 0 &&
    //           own.nameMessstelle != "" &&
    //           own.idMessstelle != "" && own.idMessstelle != 0){
    //             queryString = "UPDATE messmittel ";
    //             queryString += "SET messstelleMsm = '" + own.nameMessstelle + "', ";
    //             queryString += "messstelleIDMsm = '" + own.idMessstelle + "' ";
    //             queryString += "WHERE msm_ID = '" + own.idMessmittel + "' ";
    //             queryString += "AND lieg_ID = " + $("#liegID").val() + " ";
    //             console.log(queryString);
    //             dataMachine2.runQuery("write", $("#nameDB").val(), queryString);
    //           }
    //           else {
    //             console.log("Synchronizer.synchronize() --> Canceled query due to an invalid member value(3)!");
    //             return;
    //           }
    //         }
    //         else {
    //           $("#meldungSynchronizer p label").text("Messstelle: " + jsonData[0].nameMessstelle);
    //           $("#meldungSynchronizer").dialog();
    //           $("#btnSyncOk, #btnSyncAbbr").off("click");
    //           $("#btnSyncOk").on("click", function(){
    //             $("#meldungSynchronizer").dialog("close");
    //             let dataMachine2 = new DataMachine();
    //             if(own.idMessmittel != "" && own.idMessmittel != 0 &&
    //             own.nameMessstelle != "" &&
    //             own.idMessstelle != "" && own.idMessstelle != 0){
    //               queryString = "UPDATE messmittel ";
    //               queryString += "SET messstelleMsm = '" + own.nameMessstelle + "', ";
    //               queryString += "messstelleIDMsm = " + own.idMessstelle + " ";
    //               queryString += "WHERE msm_ID = '" + own.idMessmittel + "' ";
    //               queryString += "AND lieg_ID = " + $("#liegID").val() + " ";
    //               console.log(queryString);
    //               dataMachine2.runQuery("write", $("#nameDB").val(), queryString)
    //             }
    //             else {
    //               console.log("Synchronizer.synchronize() --> Canceled query due to an invalid member value(4)!");
    //               return;
    //             }
    //
    //           });
    //           $("#btnSyncAbbr").on("click", function(){
    //             $("#meldungSynchronizer").dialog("close");
    //           });
    //         }
    //       });
    //     }
    //     break;
    //     case SyncAction.ANLAGE:
    //     let dataMachine = new DataMachine(),
    //     queryString = "SELECT nummerAnl + ' ' + bezeichnungAnl AS nameAnlage, anlageMst, anl_ID ";
    //     queryString += "FROM anlagen ";
    //     queryString += "INNER JOIN messstellen ";
    //     queryString += "ON anlagen.messstelle1IDAnl = messstellen.mst_ID OR ";
    //     queryString += "anlagen.messstelle2IDAnl = messstellen.mst_ID OR ";
    //     queryString += "anlagen.messstelle3IDAnl = messstellen.mst_ID OR ";
    //     queryString += "anlagen.messstelle4IDAnl = messstellen.mst_ID ";
    //     queryString += "WHERE messstelle1IDAnl = '" + own.idMessstelle + "' OR ";
    //     queryString += "messstelle2IDAnl = '" + own.idMessstelle + "' OR ";
    //     queryString += "messstelle3IDAnl = '" + own.idMessstelle + "' OR ";
    //     queryString += "messstelle4IDAnl = '" + own.idMessstelle + "' ";
    //     queryString += "AND lieg_ID = " + $("#liegID").val() + " ";
    //     console.log(queryString);
    //     dataMachine.runQuery("read", $("#nameDB").val(), queryString)
    //     .then(function (data){
    //       let jsonData = null;
    //       try{
    //         jsonData = JSON.parse(data);
    //       }
    //       catch(error){
    //         console.log("Parsing queried data failed: Synchronizer.synchronize()\nData = " + data);
    //       }
    //       // if(jsonData.length === 0){
    //       //   $("#meldungSynchronizer p").text("Diese Messstelle ist der ausgewählten Anlage noch nicht zugeordnet. Wollen Sie dies jetzt tun?");
    //       //   mainMenuNav("anlMenu");
    //       // }
    //       // else {
    //       //   $("#meldungSynchronizer p").text("Die Messstelle: '" + own.nameMessstelle + "' wurde bereits einer Anlage zugewiesen!\nWollen Sie in die entsprechende Anlage springen?");
    //       //   $("#meldungSynchronizer").dialog();
    //       //   $("#btnSyncOk, #btnSyncAbbr").off("click");
    //       //   $("#btnSyncOk").on("click", function(){
    //       //     $("#meldungSynchronizer").dialog("close");
    //       //     readInstanzen("anlFirst", 0, true, jsonData[0].anl_ID);
    //       //   });
    //       //   $("#btnSyncAbbr").on("click", function(){
    //       //     $("#meldungSynchronizer").dialog("close");
    //       //   });
    //       // }
    //     });
    //     break;
    //   }
    //   case CurrentLocation.MESSMITTELVERWALTUNG:
    //   switch (syncAction) {
    //     case SyncAction.MESSSTELLE:
    //     let dataMachine = new DataMachine(),
    //     queryString = "SELECT nrMsm AS nrMessmittel, messstelleMsm AS nameMessstelle ";
    //     queryString += "FROM messmittel ";
    //     queryString += "INNER JOIN messstellen ";
    //     queryString += "ON messmittel.messstelleIDMsm = messstellen.mst_ID ";
    //     queryString += "WHERE mst_ID = '" + own.idMessstelle + "' ";
    //     console.log(queryString);
    //     dataMachine.runQuery("read", $("#nameDB").val(), queryString)
    //     .then(function (data){
    //       let jsonData = null;
    //       try{
    //         jsonData = JSON.parse(data);
    //       }
    //       catch(error){
    //         console.log("Parsing queried data failed: Synchronizer.synchronize()\nData = " + data);
    //       }
    //       if(jsonData.length === 0){
    //         let dataMachine2 = new DataMachine();
    //         if(own.idMessmittel != "" && own.idMessmittel != 0 &&
    //         own.idMessstelle != "" && own.idMessstelle != 0){
    //         queryString = "UPDATE messstellen ";
    //         queryString += "SET messmittelBerechnungslogikMst = '" + $("#messmittelNrAllgemeinMsm").val() + "', ";
    //         queryString += "messmittelIDMst = '" + own.idMessmittel + "' ";
    //         queryString += "WHERE mst_ID = '" + own.idMessstelle + "' ";
    //         console.log(queryString);
    //         dataMachine2.runQuery("write", $("#nameDB").val(), queryString);
    //       }
    //       else {
    //         console.log("Synchronizer.synchronize() --> Canceled query due to an invalid member value(5)!");
    //         return;
    //       }
    //       }
    //       else {
    //         $("#meldungSynchronizer p label").text("Messmittel: " + jsonData[0].nameMessmittel);
    //         $("#meldungSynchronizer").dialog();
    //         $("#btnSyncOk, #btnSyncAbbr").off("click");
    //         $("#btnSyncOk").on("click", function(){
    //           $("#meldungSynchronizer").dialog("close");
    //           let dataMachine2 = new DataMachine();
    //           if(own.idMessmittel != "" && own.idMessmittel != 0 &&
    //           own.idMessstelle != "" && own.idMessstelle != 0){
    //             queryString = "UPDATE messstellen ";
    //             queryString += "SET messmittelBerechnungslogikMst = '" + $("#messmittelNrAllgemeinMsm").val() + "', ";
    //             queryString += "messmittelIDMst = '" + own.idMessmittel + "' ";
    //             queryString += "WHERE mst_ID = '" + own.idMessstelle + "' ";
    //             console.log(queryString);
    //             dataMachine2.runQuery("write", $("#nameDB").val(), queryString);
    //           }
    //           else {
    //             console.log("Synchronizer.synchronize() --> Canceled query due to an invalid member value(6)!");
    //             return;
    //           }
    //         });
    //         $("#btnSyncAbbr").on("click", function(){
    //           $("#meldungSynchronizer").dialog("close");
    //         });
    //       }
    //     });
    //     break;
    //   }
    // }
}
