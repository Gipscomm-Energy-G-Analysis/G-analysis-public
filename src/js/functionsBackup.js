//main part of functions
var d = new Date();

//Datatables
var tblMessstellenBerechnungseditor = $("#tblMessstellenBerechnungseditor").DataTable({
    dom: 'Bfrtip',
    buttons: [],
    paging:false,
    colReorder: true,
    select: true
});
var tblHistorie = $("#tblHistorie").DataTable({
    dom: 'Bfrtip',
    buttons: [
        {
            extend: 'print',
            text: 'Drucken',
            exportOptions: {
                columns: ':visible'
            }
        }
    ],
    pageLength: 15,
    bAutoWidth: false,
    colReorder: true
});
var tblVersorgerHistorie = $("#tblVersorgerHistorie").DataTable({
    dom: 'Bfrtip',
    buttons: [],
    pageLength: 15,
    bAutoWidth: true,
    bFilter: false,
    bPaginate: false,
    lengthChange: false,
    ordering: true,
    oLanguage: {
        sInfo: "",
        sInfoEmpty: ""
    }
});
var tblBerechnungAuswElem = $("#tblBerechnungAuswElem").DataTable({
    dom: 'Bfrtip',
    buttons: [],
    pageLength: 15,
    bAutoWidth: true,
    bFilter: false,
    bPaginate: false,
    lengthChange: false,
    ordering: false,
    oLanguage: {
        sInfo: "",
        sInfoEmpty: ""
    }
});
var tblOptionenGrp = $("#tblOptionenGrp").DataTable({
    dom: 'Bfrtip',
    buttons: [],
    pageLength: 15,
    bAutoWidth: true,
    bFilter: false,
    bPaginate: false,
    lengthChange: false,
    ordering: false,
    oLanguage: {
        sInfo: "",
        sInfoEmpty: ""
    }
});
var tblEnergietraegerSuchen = $("#tblEnergietraegerSuchen").DataTable({
    dom: 'Bfrtip',
    buttons: [
      {
          extend: 'copy',
          text: 'Kopieren',
          exportOptions: {
              columns: ':visible'
          }
      },
        {
            extend: 'csv',
            text: 'CSV-Export',
            exportOptions: {
                columns: ':visible'
            }
        },
        {
            extend: 'print',
            text: 'Drucken',
            exportOptions: {
                columns: ':visible'
            }
          }
    ],
    pageLength: 15,
    bAutoWidth: false,
    colReorder: true
});
var tblEnergieformenSuchen = $("#tblEnergieformenSuchen").DataTable({
    dom: 'Bfrtip',
    buttons: [
      {
          extend: 'copy',
          text: 'Kopieren',
          exportOptions: {
              columns: ':visible'
          }
      },
        {
            extend: 'csv',
            text: 'CSV-Export',
            exportOptions: {
                columns: ':visible'
            }
        },
        {
            extend: 'print',
            text: 'Drucken',
            exportOptions: {
                columns: ':visible'
            }
        }
    ],
    pageLength: 15,
    bAutoWidth: false,
    colReorder: true
});
var tblStandorteSuchen = $("#tblStandorteSuchen").DataTable({
    dom: 'Bfrtip',
    buttons: [
      {
          extend: 'copy',
          text: 'Kopieren',
          exportOptions: {
              columns: ':visible'
          }
      },
        {
            extend: 'csv',
            text: 'CSV-Export',
            exportOptions: {
                columns: ':visible'
            }
        },
        {
            extend: 'print',
            text: 'Drucken',
            exportOptions: {
                columns: ':visible'
            }
        }
    ],
    pageLength: 15,
    bAutoWidth: false,
    colReorder: true
});
var tblStandorteDritterSuchen = $("#tblStandorteDritterSuchen").DataTable({
    dom: 'Bfrtip',
    buttons: [
      {
          extend: 'copy',
          text: 'Kopieren',
          exportOptions: {
              columns: ':visible'
          }
      },
        {
            extend: 'csv',
            text: 'CSV-Export',
            exportOptions: {
                columns: ':visible'
            }
        },
        {
            extend: 'print',
            text: 'Drucken',
            exportOptions: {
                columns: ':visible'
            }
        }
    ],
    pageLength: 15,
    bAutoWidth: false,
    colReorder: true
});
var tblLiegenschaftenSuchen = $("#tblLiegenschaftenSuchen").DataTable({
    dom: 'Bfrtip',
    buttons: [
      {
          extend: 'copy',
          text: 'Kopieren',
          exportOptions: {
              columns: ':visible'
          }
      },
        {
            extend: 'csv',
            text: 'CSV-Export',
            exportOptions: {
                columns: ':visible'
            }
        },
        {
            extend: 'print',
            text: 'Drucken',
            exportOptions: {
                columns: ':visible'
            }
        }
    ],
    pageLength: 15,
    bAutoWidth: false,
    colReorder: true
});
var tblExtDurchleitungenSuchen = $("#tblExtDurchleitungenSuchen").DataTable({
    dom: 'Bfrtip',
    buttons: [
      {
          extend: 'copy',
          text: 'Kopieren',
          exportOptions: {
              columns: ':visible'
          }
      },
        {
            extend: 'csv',
            text: 'CSV-Export',
            exportOptions: {
                columns: ':visible'
            }
        },
        {
            extend: 'print',
            text: 'Drucken',
            exportOptions: {
                columns: ':visible'
            }
        }
    ],
    pageLength: 15,
    bAutoWidth: false,
    colReorder: true
});
var tblMandantenAuswahl =$("#tblMandantenAuswahl").DataTable({
    dom: 'Bfrtip',
    buttons: [],
    pageLength: 15,
    bAutoWidth: true,
    bFilter: false,
    bPaginate: false,
    lengthChange: false,
    ordering: false,
    oLanguage: {
        sInfo: "",
        sInfoEmpty: ""
    }
});
var tblMandantengruppe = $("#tblMandantengruppe").DataTable({
    dom: 'Bfrtip',
    buttons: [],
    pageLength: 15,
    bAutoWidth: true,
    bFilter: false,
    bPaginate: false,
    lengthChange: false,
    ordering: false,
    oLanguage: {
        sInfo: "",
        sInfoEmpty: ""
    }
});
var tblStdDrAuswahl = $("#tblStdDrAuswahl").DataTable({
    dom: 'Bfrtip',
    buttons: [
      {
          extend: 'copy',
          text: 'Kopieren',
          exportOptions: {
              columns: ':visible'
          }
      },
        {
            extend: 'csv',
            text: 'CSV-Export',
            exportOptions: {
                columns: ':visible'
            }
        },
        {
            extend: 'print',
            text: 'Drucken',
            exportOptions: {
                columns: ':visible'
            }
        }
    ],
    pageLength: 15,
    bAutoWidth: false,
    colReorder: true
});
var tblAuswertung1ERng = $("#tblAuswertung1ERng").DataTable(
    {
        dom: 'Bfrtip',
        buttons: [],
        pageLength: 12,
        bAutoWidth: false,
        colReorder: true,
        oLanguage: {
            sInfo: "",
            sInfoEmpty: "",
            oPaginate: {
                sNext: "",
                sPrevious: ""
            }
        },

    });
var tblAuswertung2ERng = $("#tblAuswertung2ERng").DataTable(
    {
        dom: 'Bfrtip',
        buttons: [],
        pageLength: 12,
        bAutoWidth: false,
        colReorder: true,
        oLanguage: {
            sInfo: "",
            sInfoEmpty: "",
            oPaginate: {
                sNext: "",
                sPrevious: ""
            }
        },

    });
var tblExterneRechnungenSuchen = $("#tblExterneRechnungenSuchen").DataTable({
    dom: 'Bfrtip',
    buttons: [
      {
          extend: 'copy',
          text: 'Kopieren',
          exportOptions: {
              columns: ':visible'
          }
      },
        {
            extend: 'csv',
            text: 'CSV-Export',
            exportOptions: {
                columns: ':visible'
            }
        },
        {
            extend: 'print',
            text: 'Drucken',
            exportOptions: {
                columns: ':visible'
            },
            title: "<h2>" + $('.manPfad').text() + "</h2><h3 style='display:inline-block;'>Rechnungsliste vom " + d.getDate() + "." + (d.getMonth() + 1) + "." + d.getFullYear() + "</h2><img id='logo' src='images/g_analysisNeu6.png' alt='G-Analysis Logo' style='clear:right; float:right;height:50px;width:150px;'><div style='height:20px;margin:0px;'></div>"
        }
    ],
    pageLength: 25,
    bAutoWidth: false,
    colReorder: true
});
var tblMessmittel = $("#tblMessmittel").DataTable({
    dom: 'Bfrtip',
    buttons: [
      {
          extend: 'copy',
          text: 'Kopieren',
          exportOptions: {
              columns: ':visible'
          }
      },
        {
            extend: 'csv',
            text: 'CSV-Export',
            exportOptions: {
                columns: ':visible'
            }
        },
        {
            extend: 'print',
            text: 'Drucken',
            exportOptions: {
                columns: ':visible'
            }
        }
    ],
    pageLength: 15,
    bAutoWidth: false,
    colReorder: true
});
var tblMessmittelSuchen = $("#tblMessmittelSuchen").DataTable({
    dom: 'Bfrtip',
    buttons: [
      {
          extend: 'copy',
          text: 'Kopieren',
          exportOptions: {
              columns: ':visible'
          }
      },
        {
            extend: 'csv',
            text: 'CSV-Export',
            exportOptions: {
                columns: ':visible'
            }
        },
        {
            extend: 'print',
            text: 'Drucken',
            exportOptions: {
                columns: ':visible'
            }
        }
    ],
    pageLength: 15,
    bAutoWidth: false,
    colReorder: true
});
var tblLetzteRechnungen = $("#tblLetzteRngs").DataTable({
    dom: 'Bfrtip',
    buttons: [],
    pageLength: 15,
    bAutoWidth: true,
    bFilter: false,
    bPaginate: false,
    lengthChange: false,
    ordering:false,
    oLanguage:{
        sInfo: "",
        sInfoEmpty: ""
    }

});
var tblChannel = $("#channelliste").DataTable({
    dom: 'Bfrtip',
    buttons: [
      {
          extend: 'copy',
          text: 'Kopieren',
          exportOptions: {
              columns: ':visible'
          }
      },
        {
            extend: 'csv',
            text: 'CSV-Export',
            exportOptions: {
                columns: ':visible'
            }
        },
        {
            extend: 'print',
            text: 'Drucken',
            exportOptions: {
                columns: ':visible'
            }
        }
    ],
    pageLength: 15,
    bAutoWidth: false,
    colReorder: true
});
var tblMessstellenSuchen = $("#tblMessstellenSuchen").DataTable({
    dom: 'Bfrtip',
    buttons: [
      {
          extend: 'copy',
          text: 'Kopieren',
          exportOptions: {
              columns: ':visible'
          }
      },
        {
            extend: 'csv',
            text: 'CSV-Export',
            exportOptions: {
                columns: ':visible'
            }
        },
        {
            extend: 'print',
            text: 'Drucken',
            exportOptions: {
                columns: ':visible'
            }
        }
    ],
    pageLength: 50,
    bAutoWidth: false,
    colReorder: true
});
var tblBereichAussuchen = $("#tblBereichelisteBer").DataTable({
    dom: 'Bfrtip',
    buttons: [
      {
          extend: 'copy',
          text: 'Kopieren',
          exportOptions: {
              columns: ':visible'
          }
      },
        {
            extend: 'csv',
            text: 'CSV-Export',
            exportOptions: {
                columns: ':visible'
            }
        },
        {
            extend: 'print',
            text: 'Drucken',
            exportOptions: {
                columns: ':visible'
            }
        }
    ],
    pageLength: 20,
    bAutoWidth: false,
    colReorder: true
});
var tblBereicheSuchen = $("#tblBereicheSuchen").DataTable(
    {
        dom: 'Bfrtip',
        buttons: [
          {
              extend: 'copy',
              text: 'Kopieren',
              exportOptions: {
                  columns: ':visible'
              }
          },
            {
                extend: 'csv',
                text: 'CSV-Export',
                exportOptions: {
                    columns: ':visible'
                }
            },
            {
                extend: 'print',
                text: 'Drucken',
                exportOptions: {
                    columns: ':visible'
                }
            }
        ],
        pageLength: 20,
        bAutoWidth: false,
        colReorder: true
    });
var tblStandorteAuswahl = $("#tblStandorteAuswahl").DataTable({
    dom: 'Bfrtip',
    buttons: [
      {
          extend: 'copy',
          text: 'Kopieren',
          exportOptions: {
              columns: ':visible'
          }
      },
        {
            extend: 'csv',
            text: 'CSV-Export',
            exportOptions: {
                columns: ':visible'
            }
        },
        {
            extend: 'print',
            text: 'Drucken',
            exportOptions: {
                columns: ':visible'
            }
        }
    ],
    pageLength: 20,
    bAutoWidth: false,
    colReorder: true
});
var tblMessstelleAuswahl = $("#tblMessstellenlisteMst").DataTable({
    dom: 'Bfrtip',
    buttons: [
      {
          extend: 'copy',
          text: 'Kopieren',
          exportOptions: {
              columns: ':visible'
          }
      },
        {
            extend: 'csv',
            text: 'CSV-Export',
            exportOptions: {
                columns: ':visible'
            }
        },
        {
            extend: 'print',
            text: 'Drucken',
            exportOptions: {
                columns: ':visible'
            }
        }
    ],
    pageLength: 20,
    bAutoWidth: false,
    colReorder: true
});
var tblAnlagen = $("#anlagenListe").DataTable({
    dom: 'Bfrtip',
    buttons: [
      {
          extend: 'copy',
          text: 'Kopieren',
          exportOptions: {
              columns: ':visible'
          }
      },
        {
            extend: 'csv',
            text: 'CSV-Export',
            exportOptions: {
                columns: ':visible'
            }
        },
        {
            extend: 'print',
            text: 'Drucken',
            exportOptions: {
                columns: ':visible'
            }
        }
    ],
    pageLength: 15,
    bAutoWidth: false,
    colReorder: true
});
var tblAnlagenII = setAnlagenTbl2();

//Datamanager Syncfusion
var dataManager;

//Anlagengruppen, Erweiterungen, Merkmale in
//Auswahltabelle lesen
function getAnlagenAuswahlTblHeader(){
  anlagenGruppenEinlesen();
}
function setAnlagenTbl2(){
  var anlTbl2 = $("#tblAnlagenListe2").DataTable({
     dom: 'Bfrtip',
     buttons: [
         {
             extend: 'excel',
             text: 'Excel-Export',
             exportOptions: {
                 columns: ':visible'
             }
         },
         {
             extend: 'pdf',
             text: 'PDF-Export',
             exportOptions: {
                 columns: ':visible'
             }
         },
         {
             extend: 'print',
             text: 'Drucken',
             exportOptions: {
                 columns: ':visible'
             },
             title: "<h2>" + $('.manPfad').text() + "</h2><h3 style='display:inline-block;'>Anlagenliste vom " + d.getDate() + "." + (d.getMonth() + 1) + "." + d.getFullYear() + "</h2><img id='logo' src='images/g_analysisNeu6.png' alt='G-Analysis Logo' style='clear:right; float:right;height:50px;width:150px;'><div style='height:20px;margin:0px;'></div>"
         }
     ],
     pageLength: 15,
     bAutoWidth: false,
     colReorder: true,
     bDestroy: true
   });
  return anlTbl2;
}

var tblDokumenteAnl = $("#tblDokumenteAnl").DataTable({
    dom: 'Bfrtip',
    buttons: [],
    pageLength: 10,
    bAutoWidth: false,
    colReorder: true,
    oLanguage: {
        sInfo: "",
        sInfoEmpty: "",
        oPaginate: {
            sNext: "",
            sPrevious: ""
        }
    }
});
var tblDokumenteMsm = $("#tblDokumenteMsm").DataTable({
    dom: 'Bfrtip',
    buttons: [],
    pageLength: 10,
    bAutoWidth: false,
    colReorder: true,
    oLanguage: {
        sInfo: "",
        sInfoEmpty: "",
        oPaginate: {
            sNext: "",
            sPrevious: ""
        }
    }
});

//Datensatzoperationen
//Neu erstellten Datensatz speichern
//Datensatz neu erstellen
function instanzErstellen(instanz) {
    if (instanz == "gipscAdmSpeichern") {
      $.ajax({
          type: 'POST',
          async: true,
          url: 'php/instanzIntoDb.php',
          data: {
              modus: "new",
              id: "gipscAdm",
              nameDB: "gipscomm",

              benutzername: $("#benutzernameGipscAdm").val(),
              passwort: getHash($("#passwortGipscAdm").val())
          },
          success: function (echo) {
              //console.log(echo);
              alert("erfolgreich gespeichert!");
              readInstanzen("gipscAdmLast", $("#gipscAdmCount").val());
          }
      });
      betrGrpNavID = $("#betrGrpCount").val();
      betrGrpEinlesen();
    }
    else if (instanz == "betrGrpSpeichern") {
        $.ajax({
            type: 'POST',
            async: true,
            url: 'php/instanzIntoDb.php',
            data: {
                modus: "new",
                id: "betrGrp",
                nameDB: "gipscomm",

                firma: $("#firmaBetrGrp").val(),
                anzahlMitarbeiter: $("#anzahlMitarbeiterBetrGrp").val(),
                anschrift: $("#anschriftBetrGrp").val(),
                plz: $("#plzBetrGrp").val(),
                ort: $("#ortBetrGrp").val(),
                geschaeftsfuehrer: $("#geschaeftsfuehrerBetrGrp").val(),
                telefon: $("#telefonBetrGrp").val(),
                eMail: $("#emailBetrGrp").val(),
                notiz: $("#notizBetrGrp").val()
            },
            success: function (echo) {
                //console.log(echo);
                alert("erfolgreich gespeichert!");
                readInstanzen("betrGrpLast", $("#betrGrpCount").val());
            }
        });
        betrGrpNavID = $("#betrGrpCount").val();
        betrGrpEinlesen();
    }
    else if (instanz == "sAdmSpeichern") {
        $.ajax({
            type: 'POST',
            async: true,
            url: 'php/instanzIntoDb.php',
            data: {
                id:"sAdm",
                nameDB: "gipscomm",
                modus: "new",
                betrGrpID: $("#betrGrpID").val(),

                titel: $("#titelSAdm").val(),
                name: $("#nameSAdm").val(),
                vorname: $("#vornameSAdm").val(),
                eMail: $("#emailSAdm").val(),
                telefon: $("#telefonSAdm").val(),
                fax: $("#faxSAdm").val(),
                mobiltelefon: $("#mobiltelefonSAdm").val(),
                benutzername: $("#benutzernameSAdm").val(),
                passwort: getHash($("#passwortSAdm").val())
            },
            success: function (echo) {
                //console.log(echo);
                alert("erfolgreich gespeichert!");
                readInstanzen("sAdmLast", $("#sAdmCount").val());
            }
        });
        sAdmNavID = $("#sAdmCount").val();
    }
    else if (instanz == "manGrpSpeichern") {
      var arrMandantenIDs = [];

      for(i = 0;i < $("#tblMandantengruppe tbody tr").length;i++){
        arrMandantenIDs[i] = tblMandantengruppe.cell(i, 0).data();
      }

      var mandantenIDs = arrMandantenIDs.join(",");

        $.ajax({
            type: 'POST',
            async: true,
            url: 'php/instanzIntoDb.php',
            data: {
                id:"manGrp",
                nameDB: "gipscomm",
                modus: "new",
                betrGrpID: $("#betrGrpID").val(),

                name: $("#nameManGrp").val(),
                kurz: $("#kurzManGrp").val(),
                notiz: $("#notizManGrp").val(),
                mandatenIDs: mandantenIDs
            },
            success: function (echo) {
                //console.log(echo);
                alert("erfolgreich gespeichert!");
                readInstanzen("manGrpLast", $("#manGrpCount").val());
            }
        });
        manGrpNavID = $("#manGrpCount").val();
        manGrpEinlesen();
    }
    else if (instanz == "admSpeichern") {
      var manOderManGrp;
      var idIns;

      if($("#manOderManGrp").val() == "optMan"){
        manOderManGrp = "man_ID";
        idIns = $("#manRechteID").val();
      }
      else {
        manOderManGrp = "manGrp_ID";
        idIns = $("#manGrpID").val();
      }
        $.ajax({
            type: 'POST',
            async: true,
            url: 'php/instanzIntoDb.php',
            data: {
                id: "adm",
                nameDB: "gipscomm",
                modus: "new",
                ins: manOderManGrp,
                insID: idIns,

                titel: $("#titelAdm").val(),
                name: $("#nameAdm").val(),
                vorname: $("#vornameAdm").val(),
                eMail: $("#emailAdm").val(),
                telefon: $("#telefonAdm").val(),
                fax: $("#faxAdm").val(),
                mobiltelefon: $("#mobiltelefonAdm").val(),
                benutzername: $("#benutzernameAdm").val(),
                passwort: getHash($("#passwortAdm").val())
            },
            success: function (echo) {
                //console.log(echo);
                alert("erfolgreich gespeichert!");
                readInstanzen("admLast", $("#admCount").val());
            }
        });
        admNavID = $("#admCount").val();
    }
    else if (instanz == "benSpeichern") {
      var manOderManGrp;
      var idIns;

      if($("#manOderManGrp").val() == "optMan"){
        manOderManGrp = "man_ID";
        idIns = $("#manRechteID").val();
      }
      else {
        manOderManGrp = "manGrp_ID";
        idIns = $("#manGrpID").val();
      }
        $.ajax({
            type: 'POST',
            async: true,
            url: 'php/instanzIntoDb.php',
            data: {
                id: "ben",
                nameDB: "gipscomm",
                modus: "new",
                ins: manOderManGrp,
                insID: idIns,

                titel: $("#titelBen").val(),
                name: $("#nameBen").val(),
                vorname: $("#vornameBen").val(),
                eMail: $("#emailBen").val(),
                telefon: $("#telefonBen").val(),
                fax: $("#faxBen").val(),
                mobiltelefon: $("#mobiltelefonBen").val(),
                benutzername: $("#benutzernameBen").val(),
                passwort: getHash($("#passwortBen").val())
            },
            success: function (echo) {
                //console.log(echo);
                alert("erfolgreich gespeichert!");
                readInstanzen("benLast", $("#benCount").val());
            }
        });
        benNavID = $("#benCount").val();
    }
    else if (instanz == "manSpeichern") {
        $.ajax({
            type: 'POST',
            async: true,
            url: 'php/mandantIntoDb.php',
            data: {
                modus: "new",
                manID: $("#manID").val(),
                name: $("#nameAllgemeinMan").val(),
                dbKurz: $("#dbKurz").val(),
                holdingstruktur: $("#holdingstrukturAllgemeinMan").is(':checked'),
                liegenschaften: $("#liegenschaftenAllgemeinMan").is(':checked'),
                notiz: $("#notizMan").text()
            },
            success: function (echo) {
                //alert(echo);
                alert("erfolgreich gespeichert!");
                readInstanzen("manLast", $("#manCount").val());
            }
        });
        manNavID = $("#manCount").val();
    }
    else if (instanz == "orgSpeichern") {
        $.ajax({
            type: 'POST',
            async: true,
            url: 'php/instanzIntoDb.php',
            data: {
                id: "org",
                modus: "new",
                nameDB: $("#nameDB").val(),
                nameAllgemein: $("#nameAllgemeinOrg").val(),
                gesellschaftsform: $("#gesellschaftsformAllgemeinOrg").val(),
                firmenanschrift: $("#firmenanschriftAllgemeinOrg").val(),
                land: $("#landAllgemeinOrg").val(),
                plz: $("#plzAllgemeinOrg").val(),
                ort: $("#ortAllgemeinOrg").val(),
                hrbNummer: $("#hrbnummerAllgemeinOrg").val(),
                titelGeschaeftsfuehrung: $("#titelGeschaeftsfuehrungOrg").val(),
                nameGeschaeftsfuehrung: $("#nameGeschaeftsfuehrungOrg").val(),
                vornameGeschaeftsfuehrung: $("#vornameGeschaeftsfuehrungOrg").val(),
                eMailGeschaeftsfuehrung: $("#emailGeschaeftsfuehrungOrg").val(),
                telefonGeschaeftsfuehrung: $("#telefonGeschaeftsfuehrungOrg").val(),
                faxGeschaeftsfuehrung: $("#faxGeschaeftsfuehrungOrg").val(),
                mobiltelefonGeschaeftsfuehrung: $("#mobiltelefonGeschaeftsfuehrungOrg").val(),
                titelEnergiemanagement: $("#titelEnergiemanagementOrg").val(),
                nameEnergiemanagement: $("#nameEnergiemanagementOrg").val(),
                vornameEnergiemanagement: $("#vornameEnergiemanagementOrg").val(),
                eMailEnergiemanagement: $("#emailEnergiemanagementOrg").val(),
                telefonEnergiemanagement: $("#telefonEnergiemanagementOrg").val(),
                faxEnergiemanagement: $("#faxEnergiemanagementOrg").val(),
                mobiltelefonEnergiemanagement: $("#mobiltelefonEnergiemanagementOrg").val()
            },
            success: function (echo) {
                //console.log(echo);
                alert("erfolgreich gespeichert!");
                readInstanzen("orgLast", $("#orgCount").val());
            }
        });
        orgNavID = $("#orgCount").val();
    }
    else if (instanz == "liegSpeichern") {
        $.ajax({
            type: 'POST',
            async: true,
            url: 'php/instanzIntoDb.php',
            data: {
                id: "lieg",
                modus: "new",
                orgID: $("#orgID").val(),
                nameDB: $("#nameDB").val(),
                nameAllgemein: $("#nameAllgemeinLieg").val(),
                kuerzel: $("#kuerzelAllgemeinLieg").val(),
                eigenstaendigeForm: $("#eigenstaendigeformAllgemeinLieg").is(':checked'),
                aktiv: $("#aktivAllgemeinLieg").is(':checked'),
                gesellschaftsform: $("#gesellschaftsformAllgemeinLieg").val(),
                anschrift: $("#anschriftAllgemeinLieg").val(),
                land: $("#landAllgemeinLieg").val(),
                plz: $("#plzAllgemeinLieg").val(),
                ort: $("#ortAllgemeinLieg").val(),
                typ: $("#typAllgemeinLieg").val(),
                hatDl: $("#hatDlAllgemeinLieg").prop("checked"),
                titelAnsprechpartner: $("#titelAnsprechpartnerLieg").val(),
                nameAnsprechpartner: $("#nameAnsprechpartnerLieg").val(),
                vornameAnsprechpartner: $("#vornameAnsprechpartnerLieg").val(),
                eMailAnsprechpartner: $("#emailAnsprechpartnerLieg").val(),
                telefonAnsprechpartner: $("#telefonAnsprechpartnerLieg").val(),
                faxAnsprechpartner: $("#faxAnsprechpartnerLieg").val(),
                mobiltelefonAnsprechpartner: $("#mobiltelefonAnsprechpartnerLieg").val(),
                titelEnergiebeauftragter: $("#titelEnergiebeauftragterLieg").val(),
                nameEnergiebeauftragter: $("#nameEnergiebeauftragterLieg").val(),
                vornameEnergiebeauftragter: $("#vornameEnergiebeauftragterLieg").val(),
                eMailEnergiebeauftragter: $("#emailEnergiebeauftragterLieg").val(),
                telefonEnergiebeauftragter: $("#telefonEnergiebeauftragterLieg").val(),
                faxEnergiebeauftragter: $("#faxEnergiebeauftragterLieg").val(),
                mobiltelefonEnergiebeauftragter: $("#mobiltelefonEnergiebeauftragterLieg").val(),
                energietraeger1: $("#inputEnergietraeger1Lieg").val(),
                energietraeger2: $("#inputEnergietraeger2Lieg").val(),
                energietraeger3: $("#inputEnergietraeger3Lieg").val(),
                energietraeger4: $("#inputEnergietraeger4Lieg").val(),
                energietraeger5: $("#inputEnergietraeger5Lieg").val(),
                energietraeger6: $("#inputEnergietraeger6Lieg").val(),
                energietraeger7: $("#inputEnergietraeger7Lieg").val(),
                energietraeger8: $("#inputEnergietraeger8Lieg").val(),
                energietraeger9: $("#inputEnergietraeger9Lieg").val(),
                energieform1: $("#energieform1Lieg").val(),
                energieform2: $("#energieform2Lieg").val(),
                energieform3: $("#energieform3Lieg").val(),
                energieform4: $("#energieform4Lieg").val(),
                energieform5: $("#energieform5Lieg").val(),
                energieform6: $("#energieform6Lieg").val(),
                energieform7: $("#energieform7Lieg").val(),
                managementsystem1: $("#managementsystem1Lieg").val(),
                erstzertifizierung1: $("#erstzertifizierung1Lieg").val(),
                managementsystem2: $("#managementsystem2Lieg").val(),
                erstzertifizierung2: $("#erstzertifizierung2Lieg").val(),
                managementsystem3: $("#managementsystem3Lieg").val(),
                erstzertifizierung3: $("#erstzertifizierung3Lieg").val()
            },
            success: function (echo) {
                //console.log(echo);
                alert("erfolgreich gespeichert!");
                readInstanzen("liegLast", $("#liegCount").val());
            }
        });
        liegNavID = $("#liegCount").val();
    }
    else if (instanz == "extDlSpeichern") {
        $.ajax({
            type: 'POST',
            async: true,
            url: 'php/instanzIntoDb.php',
            data: {
                id: "extDl",
                modus: "new",
                liegID: $("#liegID").val(),
                nameDB: $("#nameDB").val(),
                nameAllgemein: $("#nameExtDl").val(),
                aktiv: $("#aktivExtDl").is(':checked'),
                gesellschaftsform: $("#gesellschaftsformExtDl").val(),
                anschrift: $("#anschriftExtDl").val(),
                land: $("#landExtDl").val(),
                plz: $("#plzExtDl").val(),
                ort: $("#ortExtDl").val(),
                typ: $("#typExtDl").val(),
                standortdatenDritte: $("#stdExtDl").is(":checked"),
                titelAnsprechpartner: $("#titelAnsprechpartnerExtDl").val(),
                nameAnsprechpartner: $("#nameAnsprechpartnerExtDl").val(),
                vornameAnsprechpartner: $("#vornameAnsprechpartnerExtDl").val(),
                eMailAnsprechpartner: $("#emailAnsprechpartnerExtDl").val(),
                telefonAnsprechpartner: $("#telefonAnsprechpartnerExtDl").val(),
                faxAnsprechpartner: $("#faxAnsprechpartnerExtDl").val(),
                mobiltelefonAnsprechpartner: $("#mobiltelefonAnsprechpartnerExtDl").val(),

                energietraeger1: $("#energietraeger1ExtDl").val(),
                  messstelle1Ent:  $("#messstelle1ExtDl").val(),
                  standort1Ent:  $("#standort1ExtDl").val(),
                energietraeger2: $("#energietraeger2ExtDl").val(),
                  messstelle2Ent:  $("#messstelle2ExtDl").val(),
                  standort2Ent:  $("#standort2ExtDl").val(),
                energietraeger3: $("#energietraeger3ExtDl").val(),
                  messstelle3Ent:  $("#messstelle3ExtDl").val(),
                  standort3Ent:  $("#standort3ExtDl").val(),
                energietraeger4: $("#energietraeger4ExtDl").val(),
                  messstelle4Ent:  $("#messstelle4ExtDl").val(),
                  standort4Ent:  $("#standort4ExtDl").val(),
                energietraeger5: $("#energietraeger5ExtDl").val(),
                  messstelle5Ent:  $("#messstelle5ExtDl").val(),
                  standort5Ent:  $("#standort5ExtDl").val(),
                energietraeger6: $("#energietraeger6ExtDl").val(),
                  messstelle6Ent:  $("#messstelle6ExtDl").val(),
                  standort6Ent:  $("#standort6ExtDl").val(),

                energieRes1: $("#energieRes1ExtDl").val(),
                  messstelle1EnfRes:  $("#messstelleEngRes1ExtDl").val(),
                  standort1EnfRes: $("#standort1EngResExtDl").val(),
                energieRes2: $("#energieRes2ExtDl").val(),
                  messstelle2EnfRes:  $("#messstelleEngRes2ExtDl").val(),
                  standort2EnfRes: $("#standort2EngResExtDl").val(),
                energieRes3: $("#energieRes3ExtDl").val(),
                  messstelle3EnfRes:  $("#messstelleEngRes3ExtDl").val(),
                  standort3EnfRes: $("#standort3EngResExtDl").val(),
                energieRes4: $("#energieRes4ExtDl").val(),
                  messstelle4EnfRes:  $("#messstelleEngRes4ExtDl").val(),
                  standort4EnfRes: $("#standort4EngResExtDl").val(),
                energieRes5: $("#energieRes5ExtDl").val(),
                  messstelle5EnfRes:  $("#messstelleEngRes5ExtDl").val(),
                  standort5EnfRes: $("#standort5EngResExtDl").val(),
                energieRes6: $("#energieRes6ExtDl").val(),
                  messstelle6EnfRes:  $("#messstelleEngRes6ExtDl").val(),
                  standort6EnfRes: $("#standort6EngResExtDl").val()
            },
            success: function (echo) {
                //console.log(echo);
                alert("erfolgreich gespeichert!");
                readInstanzen("extDlLast", $("#extDlCount").val());
            }
        });
        extDlNavID = $("#extDlCount").val();
    }
    else if (instanz == "berSpeichern") {
        $.ajax({
            type: 'POST',
            async: true,
            url: 'php/instanzIntoDb.php',
            data: {
                id: "ber",
                modus: "new",
                liegID: $("#liegID").val(),
                nameDB: $("#nameDB").val(),
                nameAllgemein: $("#nameAllgemeinBer").val(),
                kurzbezeichnung: $("#kurzbezeichnungAllgemeinBer").val(),
                kostenstelle: $("#KostenstelleAllgemeinBer").val(),
                ort: $("#ortBer").val(),
                ausgewaehltesLevel: $("#levelAuswahlAllgemeinBer").val(),
                vorgelagerterBereich1: $("#vorgelagerteBereiche1AllgemeinBer").val(),
                vorgelagerterBereich2: $("#vorgelagerteBereiche2AllgemeinBer").val(),
                notiz: $("#notizAllgemeinBer").val(),
                energietraeger1: $("#energietraeger1AllgemeinBer").val(),
                energietraeger2: $("#energietraeger2AllgemeinBer").val(),
                energietraeger3: $("#energietraeger3AllgemeinBer").val(),
                energietraeger4: $("#energietraeger4AllgemeinBer").val()
            },
            success: function (echo) {
                //console.log(echo);
                alert("erfolgreich gespeichert!");
                readInstanzen("berLast", $("#berCount").val());
            }
        });
        berNavID = $("#berCount").val();
    }
    else if (instanz == "mstSpeichern") {
        $.ajax({
            type: 'POST',
            async: true,
            url: 'php/instanzIntoDb.php',
            data: {
                id: "mst",
                modus: "new",
                berID: $("#berID").val(),
                nameDB: $("#nameDB").val(),
                messstellenbezeichnung: $("#nameMst").val(),
                kurzbezeichnung: $("#kurzbezeichnungMst").val(),
                kostenstelle: $("#kostenstelleMst").val(),
                aktiv: $("#aktivMst").is(":checked"),
                energietraeger: $("#energietraegerMst").val(),
                ort: $("#ortMst").val(),
                messart: $("#messartMst").val(),
                vorgelagerteMessstelle: $("#vorgelagerteMst").val(),
                messmittelBerechnungslogik: $("#messmittelBerechnungslogikMst").val(),
                anlage: $("#anlMst").val(),
                notiz: $("#notizAllgemeinMst").val()
            },
            success: function (echo) {
                //console.log(echo);
                alert("erfolgreich gespeichert!");
                readInstanzen("mstLast", $("#mstCount").val());
            }
        });
        mstNavID = $("#mstCount").val();
    }
    else if (instanz == "stdSpeichern") {
        $.ajax({
            type: 'POST',
            async: true,
            url: 'php/instanzIntoDb.php',
            data: {
                id: "std",
                modus: "new",
                liegID: $("#liegID").val(),
                nameDB: $("#nameDB").val(),
                ort: $("#nameAllgemeinStd").val(),
                kuerzel: $("#kurzbezeichnungAllgemeinStd").val(),
                flaeche: $("#flaecheAllgemeinStd").val(),
                customLabel1: $("#custom1LabelStd").text(),
                customInput1: $("#custom1EingabeStd").val(),
                customLabel2: $("#custom2LabelStd").text(),
                customInput2: $("#custom2EingabeStd").val(),
                customLabel3: $("#custom3LabelStd").text(),
                customInput3: $("#custom3EingabeStd").val(),
                customLabel4: $("#custom4LabelStd").text(),
                customInput4: $("#custom4EingabeStd").val(),
                customLabel5: $("#custom5LabelStd").text(),
                customInput5: $("#custom5EingabeStd").val(),
                customLabel6: $("#custom6LabelStd").text(),
                customInput6: $("#custom6EingabeStd").val(),
                notiz: $("#notizAllgemeinStd").val()
            },
            success: function (echo) {
                //console.log(echo);
                alert("erfolgreich gespeichert!");
                readInstanzen("stdLast", $("#stdCount").val());
            }
        })
        stdNavID = $("#stdCount").val();
    }
    else if (instanz == "stdDrSpeichern") {
        $.ajax({
            type: 'POST',
            async: true,
            url: 'php/instanzIntoDb.php',
            data: {
                id: "stdDr",
                modus: "new",
                liegID: $("#liegID").val(),
                nameDB: $("#nameDB").val(),

                ort: $("#nameAllgemeinStdDr").val(),
                kuerzel: $("#kurzbezeichnungAllgemeinStdDr").val(),
                flaeche: $("#flaecheAllgemeinStdDr").val(),
                customLabel1: $("#custom1LabelStdDr").text(),
                customInput1: $("#custom1EingabeStdDr").val(),
                customLabel2: $("#custom2LabelStdDr").text(),
                customInput2: $("#custom2EingabeStdDr").val(),
                customLabel3: $("#custom3LabelStdDr").text(),
                customInput3: $("#custom3EingabeStdDr").val(),
                customLabel4: $("#custom4LabelStdDr").text(),
                customInput4: $("#custom4EingabeStdDr").val(),
                customLabel5: $("#custom5LabelStdDr").text(),
                customInput5: $("#custom5EingabeStdDr").val(),
                customLabel6: $("#custom6LabelStdDr").text(),
                customInput6: $("#custom6EingabeStdDr").val(),
                notiz: $("#notizAllgemeinStdDr").val()
            },
            success: function (echo) {
                //console.log(echo);
                alert("erfolgreich gespeichert!");
                readInstanzen("stdDrLast", $("#stdDrCount").val());
            }
        });
        stdDrNavID = $("#stdDrCount").val();
    }
    else if (instanz == "anlSpeichern") {
      var bild = $("#bildAllgemeinAnl").prop("src");
      var arr = bild.split($("#nameDB").val());

        $.ajax({
            type: 'POST',
            async: true,
            url: 'php/instanzIntoDb.php',
            data: {
                id: "anl",
                modus: "new",
                liegID: $("#liegID").val(),
                nameDB: $("#nameDB").val(),

                anlagenbild: "uploadsDownloads/images/" + $("#nameDB").val() + arr[1],
                anlagennummer: $("#anlagennummerAllgemeinAnl").val(),
                bezeichnung: $("#bezeichnungAllgemeinAnl").val(),
                aktiv: $("#aktivAllgemeinAnl").is(":checked"),
                typ: $("#typAllgemeinAnl").val(),
                seriennummer: $("#serienNrAllgemeinAnl").val(),
                standort: $("#standortAllgemeinAnl").val(),
                baujahr: $("#baujahrAnl").val(),
                anschaffungsdatum: $("#datumAnschaffungAllgemeinAnl").val(),
                jahresbetriebsstunden: $("#betriebsstundenAllgemeinAnl").val(),
                notizAllgemein: $("#notizAllgemeinAnl").val(),
                produkt: $("#produktAllgemeinAnl").val(),
                produktionsmenge: $("#produktionsmenge1AllgemeinAnl").val(),
                produktionsmengeEinheit: $("#einheitProduktionsmenge1AllgemeinAnl").val(),
                produktnummer: $("#produktnummer1AllgemeinAnl").val(),
                mehrProdukte: $("#mehrProdukteAllgemeinAnl").is(":checked"),

                zugeordneterVerbraucher1: $("#zugeordneterVerbraucher1AllgemeinAnl").val(),
                zugeordneterVerbraucher2: $("#zugeordneterVerbraucher2AllgemeinAnl").val(),
                zugeordneterVerbraucher3: $("#zugeordneterVerbraucher3AllgemeinAnl").val(),
                zugeordneterVerbraucher4: $("#zugeordneterVerbraucher4AllgemeinAnl").val(),
                zugeordneterVerbraucher5: $("#zugeordneterVerbraucher5AllgemeinAnl").val(),
                zugeordneterVerbraucher6: $("#zugeordneterVerbraucher6AllgemeinAnl").val(),

                energietraeger1: $("#energietraeger1AllgemeinAnl").val(),
                energieform1: $("#energieform1AllgemeinAnl").val(),
                einheit1: $("#einheit1Anl").val(),
                anschlussleistung1: $("#anschlussleistung1Anl").val(),
                mittlereAuslastungProzent1: $("#mittlereAuslastungProzent1Anl").val(),
                mittlereAuslastungKw1: $("#mittlereAuslastungKw1Anl").val(),
                betriebstemperatur1: $("#betriebstemperatur1Anl").val(),
                messstelle1: $("#mst1Anl").val(),
                versBereich1: $("#ber1Anl").val(),
                abwaerme1: $("#abwaerme1Anl").val(),
                abwaermeNutzbarkeit1: $("#nutzbarkeitAbwaerme1Anl").val(),
                bewertungAbwaermeNutzbarkeit1: $("#bewertungNutzbarkeitAbwaerme1Anl").val(),
                energietraeger2: $("#energietraeger2AllgemeinAnl").val(),
                energieform2: $("#energieform2AllgemeinAnl").val(),
                einheit2: $("#einheit2Anl").val(),
                anschlussleistung2: $("#anschlussleistung2Anl").val(),
                mittlereAuslastungProzent2: $("#mittlereAuslastungProzent2Anl").val(),
                mittlereAuslastungKw2: $("#mittlereAuslastungKw2Anl").val(),
                betriebstemperatur2: $("#betriebstemperatur2Anl").val(),
                messstelle2: $("#mst2Anl").val(),
                versBereich2: $("#ber2Anl").val(),
                abwaerme2: $("#abwaerme2Anl").val(),
                abwaermeNutzbarkeit2: $("#nutzbarkeitAbwaerme2Anl").val(),
                bewertungAbwaermeNutzbarkeit2: $("#bewertungNutzbarkeitAbwaerme2Anl").val(),
                energietraeger3: $("#energietraeger3AllgemeinAnl").val(),
                energieform3: $("#energieform3AllgemeinAnl").val(),
                einheit3: $("#einheit3Anl").val(),
                anschlussleistung3: $("#anschlussleistung3Anl").val(),
                mittlereAuslastungProzent3: $("#mittlereAuslastungProzent3Anl").val(),
                mittlereAuslastungKw3: $("#mittlereAuslastungKw3Anl").val(),
                betriebstemperatur3: $("#betriebstemperatur3Anl").val(),
                messstelle3: $("#mst3Anl").val(),
                versBereich3: $("#ber3Anl").val(),
                abwaerme3: $("#abwaerme3Anl").val(),
                abwaermeNutzbarkeit3: $("#nutzbarkeitAbwaerme3Anl").val(),
                bewertungAbwaermeNutzbarkeit3: $("#bewertungNutzbarkeitAbwaerme3Anl").val(),
                energietraeger4: $("#energietraeger4AllgemeinAnl").val(),
                energieform4: $("#energieform4AllgemeinAnl").val(),
                einheit4: $("#einheit4Anl").val(),
                anschlussleistung4: $("#anschlussleistung4Anl").val(),
                mittlereAuslastungProzent4: $("#mittlereAuslastungProzent4Anl").val(),
                mittlereAuslastungKw4: $("#mittlereAuslastungKw4Anl").val(),
                betriebstemperatur4: $("#betriebstemperatur4Anl").val(),
                messstelle4: $("#mst4Anl").val(),
                versBereich4: $("#ber4Anl").val(),
                abwaerme4: $("#abwaerme4Anl").val(),
                abwaermeNutzbarkeit4: $("#nutzbarkeitAbwaerme4Anl").val(),
                bewertungAbwaermeNutzbarkeit4: $("#bewertungNutzbarkeitAbwaerme4Anl").val(),
                custom1: $("#custom1Anl").val(),
                custom2: $("#custom2Anl").val(),
                custom3: $("#custom3Anl").val(),
                custom4: $("#custom4Anl").val(),
                custom5: $("#custom5Anl").val(),
                custom6: $("#custom6Anl").val()
            },
            success: function (echo) {
                //console.log(echo);
                alert("erfolgreich gespeichert!");
                readInstanzen("anlLast", $("#anlCount").val());
            }
        });
        anlNavID = $("#anlCount").val();
    }
    else if (instanz == "msmSpeichern") {
      var bild = $("#bildAllgemeinMsm").prop("src");
      var arr = bild.split($("#nameDB").val());
        $.ajax({
            type: 'POST',
            async: true,
            url: 'php/instanzIntoDb.php',
            data: {
                id: "msm",
                modus: "new",
                nameDB: $("#nameDB").val(),
                liegID: $("#liegID").val(),

                nr: $("#messmittelNrAllgemeinMsm").val(),
                messmittelbild: "uploadsDownloads/images/" + $("#nameDB").val() + arr[1],
                bezeichnung: $("#bezeichnungAllgemeinMsm").val(),
                messstelle: $("#messstelleAllgemeinMsm").val(),
                anlage: $("#anlMsm").val(),
                typ: $("#typAllgemeinMsm").val(),
                nrTyp: $("#typNrAllgemeinMsm").val(),
                datumInstallation: $("#installationsdatumAllgemeinMsm").val(),
                energietraeger: $("#entMsm").val(),
                einheit: $("#einheitAllgemeinMsm").val(),
                multibox: $("#multiboxAllgemeinMsm").is(":checked"),
                unit: $("#unitAllgemeinMsm").val(),
                typUnit: $("#unitTypAllgemeinMsm").val(),
                anzahlKanaele: $("#anzahlKanaeleAllgemeinMsm").val(),
                messungsform: $("#messungsformAllgemeinMsm").val(),
                kanal1: $("#kanal1AllgemeinMsm").val(),
                kanal2: $("#kanal2AllgemeinMsm").val(),
                kanal3: $("#kanal3AllgemeinMsm").val(),
                notizAllgemein: $("#notizAllgemeinMsm").val(),
                nameBeauftragter: $("#beauftragterPruefinformationenMsm").val(),
                emailBeauftragter: $("#beauftragterEmailPruefinformationenMsm").val(),
                pruefzyklus: $("#pruefzyklusPruefinformationenMsm").val(),
                letztePruefung: $("#letztePruefungPruefinformationenMsm").val(),
                naechstePruefung: $("#naechstePruefungPruefinformationenMsm").val(),
                notizPruef: $("#notiz2AllgemeinMsm").val(),
                messmethode: $("#messmethodeInformationenConfig").val(),
                messzyklus: $("#messzyklusInformationenConfig").val(),
                messtoleranz: formatNumber("deform",$("#messtoleranzInformationenConfig").val()),
                notizAllgInfos: $("#notiz1InformationenConfig").val(),
                wandlerfaktor: formatNumber("deform",$("#wandlungsfaktorTechnischeDetailsConfig").val()),
                geraetetyp: $("#geraetetypTechnischeDetailsConfig").val(),
                ipAddresse: $("#ipTechnischeDetailsConfig").val(),
                subnetMaske: $("#subnetMaskTechnischeDetailsConfig").val(),
                gateway: $("#gatewayTechnischeDetailsConfig").val(),
                cgiPort: $("#cgiPortTechnischeDetailsConfig").val(),
                modbusPort: $("#modbusPortTechnischeDetailsConfig").val(),
                ftpPort: $("#ftpPortTechnischeDetailsConfig").val(),
                notizTechnDetails: $("#notiz2InformationenConfig").val()
            },
            success: function (echo) {
                //console.log(echo);
                alert("erfolgreich gespeichert!");
                readInstanzen("msmLast", $("#msmCount").val());
            }
        });
        msmNavID = $("#msmCount").val();
    }
    else if (instanz == "entSpeichern") {
        energietrInDBoxLieg();
        energiefrmInDBoxLieg();
        $.ajax({
            type: 'POST',
            async: true,
            url: 'php/instanzIntoDb.php',
            data: {
                id: "ent",
                modus: "new",
                nameDB: entDB,
                entID: "",
                liegID: $("#liegID").val(),
                name: $("#nameEnt").val(),
                kuerzel: $("#kuerzelEnt").val(),
                allgemEnt: $("#allgemEntEnt").val(),
                notiz: $("#notizEnt").val(),

                versorgerEvu: $("#versorgerEvuEnt").val(),
                versorgerUenb: $("#versorgerUenbEnt").val(),
                versorgerMsb: $("#versorgerMsbEnt").val(),
                einheit1: $("#einheit1Ent").val(),
                einheit2: $("#einheit2Ent").val(),
                einheit3: $("#einheit3Ent").val(),
                einh1FaktorKwh: $("#entEinh1FaktorKwh").val(),
                einh2FaktorKwh: $("#entEinh2FaktorKwh").val(),
                einh3FaktorKwh: $("#entEinh3FaktorKwh").val(),
                einh1FaktorCO2: $("#entEinh1FaktorCO2").val(),
                einh2FaktorCO2: $("#entEinh2FaktorCO2").val(),
                einh3FaktorCO2: $("#entEinh3FaktorCO2").val(),
                lblEinh1FaktorX1: $("#lblEntEinh1FaktorX1").text(),
                lblEinh2FaktorX1: $("#lblEntEinh2FaktorX1").text(),
                lblEinh3FaktorX1: $("#lblEntEinh3FaktorX1").text(),
                einh1FaktorX1: $("#entEinh1FaktorX1").val(),
                einh2FaktorX1: $("#entEinh2FaktorX1").val(),
                einh3FaktorX1: $("#entEinh3FaktorX1").val(),
                lblEinh1FaktorX2: $("#lblEntEinh1FaktorX2").text(),
                lblEinh2FaktorX2: $("#lblEntEinh2FaktorX2").text(),
                lblEinh3FaktorX2: $("#lblEntEinh3FaktorX2").text(),
                einh1FaktorX2: $("#entEinh1FaktorX2").val(),
                einh2FaktorX2: $("#entEinh2FaktorX2").val(),
                einh3FaktorX2: $("#entEinh3FaktorX2").val(),
                lblEinh1FaktorX3: $("#lblEntEinh1FaktorX3").text(),
                lblEinh2FaktorX3: $("#lblEntEinh2FaktorX3").text(),
                lblEinh3FaktorX3: $("#lblEntEinh3FaktorX3").text(),
                einh1FaktorX3: $("#entEinh1FaktorX3").val(),
                einh2FaktorX3: $("#entEinh2FaktorX3").val(),
                einh3FaktorX3: $("#entEinh3FaktorX3").val(),
                gueltigVom: $("#gueltigVomEnt").val(),
                gueltigBis: $("#gueltigBisEnt").val()
            },
            success: function (echo) {
                console.log("records: ");
                console.log(echo);
                alert("erfolgreich gespeichert!");
                readInstanzen("entLast", $("#entCount").val());
            }
        });
        entNavID = $("#entCount").val();
    }
    else if (instanz == "enfSpeichern") {
        energietrInDBoxLieg();
        energiefrmInDBoxLieg();
        $.ajax({
            type: 'POST',
            async: true,
            url: 'php/instanzIntoDb.php',
            data: {
                id: "enf",
                modus: "new",
                nameDB: entDB,
                name: $("#nameEnf").val(),
                kuerzel: $("#kuerzelEnf").val(),
                notiz: $("#notizEnf").val(),
                aktiv: $("#aktivEnf").is(":checked"),
                einheit1: $("#einheit1Enf").val(),
                einheit2: $("#einheit2Enf").val(),
                einheit3: $("#einheit3Enf").val(),
                einh1FaktorKwh: $("#enfEinh1FaktorKwh").val(),
                einh2FaktorKwh: $("#enfEinh2FaktorKwh").val(),
                einh3FaktorKwh: $("#enfEinh3FaktorKwh").val(),
                einh1FaktorCO2: $("#enfEinh1FaktorCO2").val(),
                einh2FaktorCO2: $("#enfEinh2FaktorCO2").val(),
                einh3FaktorCO2: $("#enfEinh3FaktorCO2").val(),
                lblEinh1FaktorX1: $("#lblEnfEinh1FaktorX1").text(),
                lblEinh2FaktorX1: $("#lblEnfEinh2FaktorX1").text(),
                lblEinh3FaktorX1: $("#lblEnfEinh3FaktorX1").text(),
                einh1FaktorX1: $("#enfEinh1FaktorX1").val(),
                einh2FaktorX1: $("#enfEinh2FaktorX1").val(),
                einh3FaktorX1: $("#enfEinh3FaktorX1").val(),
                lblEinh1FaktorX2: $("#lblEnfEinh1FaktorX2").text(),
                lblEinh2FaktorX2: $("#lblEnfEinh2FaktorX2").text(),
                lblEinh3FaktorX2: $("#lblEnfEinh3FaktorX2").text(),
                einh1FaktorX2: $("#enfEinh1FaktorX2").val(),
                einh2FaktorX2: $("#enfEinh2FaktorX2").val(),
                einh3FaktorX2: $("#enfEinh3FaktorX2").val(),
                lblEinh1FaktorX3: $("#lblEnfEinh1FaktorX3").text(),
                lblEinh2FaktorX3: $("#lblEnfEinh2FaktorX3").text(),
                lblEinh3FaktorX3: $("#lblEnfEinh3FaktorX3").text(),
                einh1FaktorX3: $("#enfEinh1FaktorX3").val(),
                einh2FaktorX3: $("#enfEinh2FaktorX3").val(),
                einh3FaktorX3: $("#enfEinh3FaktorX3").val(),
                gueltigVom: $("#gueltigVomEnf").val(),
                gueltigBis: $("#gueltigBisEnf").val()
            },
            success: function (echo) {
                //console.log(echo);
                alert("erfolgreich gespeichert!");
                readInstanzen("enfLast", $("#enfCount").val());
            }
        });
        enfNavID = $("#enfCount").val();
    }
    else if (instanz == "eRngSpeichern") {
        $.ajax({
            type: 'POST',
            async: true,
            url: 'php/instanzIntoDb.php',
            data: {
                id: "eRng",
                modus: "new",
                nameDB: $("#nameDB").val(),
                liegID: $("#liegID").val(),
                rechnungsmodus: $("#modusERng").val(),
                versorger: $("#versorgerERng").val(),
                rechnungsnummer: $("#nrERng").val(),
                zaehlpunktnummer: $("#zpNrERng").val(),
                messstelle: $("#mstERng").val(),
                rechnungsdatum: $("#datumERng").val(),
                abrechnungszeitVom: $("#vomERng").val(),
                abrechnungszeitBis: $("#bisERng").val(),
                energietraeger: $("#entERng").val(),
                einheit: $("#einERng").val(),
                menge: formatNumber("deform",$("#mengeERng").val()),
                verbrauch: formatNumber("deform",$("#verbrauchERng").val()),
                kostenstelle: $("#kostenstelleERng").val(),
                kosten: formatNumber("deform",$("#kostenERng").val()),

                tagstromVerbr: formatNumber("deform",$("#tagstromVerbrERng").val()),
                tagstromKost: formatNumber("deform",$("#tagstromKostERng").val()),
                nachtstromVerbr: formatNumber("deform",$("#nachtstromVerbrERng").val()),
                nachtstromKost: formatNumber("deform",$("#nachtstromKostERng").val()),
                blindstrom: formatNumber("deform",$("#blindstromERng").val()),
                lastspitze: formatNumber("deform",$("#lastspitzeERng").val()),
                leistungspreis:formatNumber("deform",$("#leistungspreisERng").val()),
                arbeitspreisWirkstrom: formatNumber("deform",$("#abpWirkERng").val()),
                stromsteuer: formatNumber("deform",$("#strSteuERng").val()),
                arbeitspreisNetz: formatNumber("deform",$("#abpNetzERng").val()),
                konzessionsabgabe: formatNumber("deform",$("#konzERng").val()),

                eegUmlage: formatNumber("deform",$("#eegERng").val()),
                eegUmlageUntMill: formatNumber("deform",$("#eegUntERng").val()),
                eegUmlageUebMill: formatNumber("deform",$("#eegUebERng").val()),
                kwkUnter: formatNumber("deform",$("#kwkUntERng").val()),
                kwkUeber: formatNumber("deform",$("#kwkObERng").val()),
                nevUnter: formatNumber("deform",$("#nevUntERng").val()),
                nevUeber: formatNumber("deform",$("#nevObERng").val()),
                offUnter: formatNumber("deform",$("#offUntERng").val()),
                offUeber: formatNumber("deform",$("#offObERng").val()),

                lblCustom1: $("#lblCustom1ERng").text(),
                Custom1: formatNumber("deform",$("#Custom1ERng").val()),
                lblCustom2: $("#lblCustom2ERng").text(),
                Custom2: formatNumber("deform",$("#Custom2ERng").val()),
                lblCustom3: $("#lblCustom3ERng").text(),
                Custom3: formatNumber("deform",$("#Custom3ERng").val()),
                lblCustom4: $("#lblCustom4ERng").text(),
                Custom4: formatNumber("deform",$("#Custom4ERng").val()),
                lblCustom5: $("#lblCustom5ERng").text(),
                Custom5: formatNumber("deform",$("#Custom5ERng").val()),
                lblCustom6: $("#lblCustom6ERng").text(),
                Custom6: formatNumber("deform",$("#Custom6ERng").val())
            },
            success: function (echo) {
                //console.log(echo);
                alert("erfolgreich gespeichert!");
                readInstanzen("eRngLast", $("#eRngCount").val());
            }
        });
        eRngNavID = $("#eRngCount").val();
    }
    else if (instanz == "iMwSpeichern") {
        $.ajax({
            type: 'POST',
            async: true,
            url: 'php/instanzIntoDb.php',
            data: {
                id: "iMw",
                modus: "new",
                nameDB: $("#nameDB").val(),
                liegID: $("#liegID").val(),

                versorger: $("#versorgerIMw").val(),
                kostenstelle: $("#kostenstelleIMw").val(),
                messstelle: $("#mstIMw").val(),
                ableseDatum: $("#datumIMw").val(),
                vom: $("#vomIMw").val(),
                bis: $("#bisIMw").val(),
                energietraeger: $("#entIMw").val(),
                einheit: $("#einIMw").val(),
                menge: formatNumber("deform",$("#mengeIMw").val()),
                verbrauch: formatNumber("deform",$("#verbrauchIMw").val()),
                notiz: $("#notizIMw").val(),

                lblCustom1: $("#lblCustom1IMw").val(),
                Custom1: $("#custom1IMw").val(),
                lblCustom2: $("#lblCustom2IMw").val(),
                Custom2: $("#custom2IMw").val(),
                lblCustom3: $("#lblCustom3IMw").val(),
                Custom3: $("#custom3IMw").val(),
                lblCustom4: $("#lblCustom4IMw").val(),
                Custom4: $("#custom4IMw").val(),
                lblCustom5: $("#lblCustom5IMw").val(),
                Custom5: $("#custom5IMw").val(),
                lblCustom6: $("#lblCustom6IMw").val(),
                Custom6: $("#custom6IMw").val()
            },
            success: function (echo) {
                //console.log(echo);
                alert("erfolgreich gespeichert!");
                readInstanzen("iMwLast", $("#iMwCount").val());
            }
        });
        iMwNavID = $("#iMwCount").val();
    }
    else if (instanz == "grpSpeichern") {
      var optionen = [];

      for(i = 0;i < $("#tblOptionenGrp tbody tr").length;i++){
        optionen[i] = tblOptionenGrp.cell(i, 0).data();
      }

      var optionenString = optionen.join(",");

        $.ajax({
            type: 'POST',
            async: true,
            url: 'php/instanzIntoDb.php',
            data: {
                id: "grp",
                modus: "new",
                nameDB: $("#nameDB").val(),

                name: $("#nameGrp").val(),
                kurz: $("#kuerzelGrp").val(),
                beschreibung: $("#beschreibungGrp").val(),
                optionen: optionenString
            },
            success: function (echo) {
                //console.log(echo);
                alert("erfolgreich gespeichert!");
                readInstanzen("grpLast", $("#grpCount").val());
            }
        });
        grpNavID = $("#grpCount").val();
    }
    else if (instanz == "zpSpeichern") {
        $.ajax({
            type: 'POST',
            async: true,
            url: 'php/instanzIntoDb.php',
            data: {
                id: "zp",
                modus: "new",
                nameDB: $("#nameDB").val(),
                liegID: $("#liegID").val(),

                nr: $("#zaehlpunktNrZp").val(),
                energietraeger: $("#energietraegerZp").val(),
                messstelle: $("#mstZp").val(),
                messsystem: $("#messsystemZp").val(),
                messgenauigkeit: $("#messgenauZp").val()
            },
            success: function (echo) {
                //console.log(echo);
                alert("erfolgreich gespeichert!");
                readInstanzen("zpLast", $("#zpCount").val());
            }
        });
        zpNavID = $("#zpCount").val();
    }
    $(".lblNeu").css("display", "none");
    $(".lblAendern").css("display", "inline");
}
//Geänderten Datensatz speichern
function instanzSpeichern(instanz) {
    if (instanz == "gipscAdmSpeichern") {
        $.ajax({
            type: 'POST',
            async: true,
            url: 'php/instanzIntoDb.php',
            data: {
                id: "gipscAdm",
                nameDB: "gipscomm",
                gipscAdmID: $("gipscAdmID").val(),
                modus: "save",

                benutzername: $("#benutzernameGipscAdm").val(),
                passwort: getHash($("#passwortGipscAdm").val())
            },
            success: function (echo) {
                //console.log(echo);
                alert("erfolgreich gespeichert!");
            }
        });
    }
    else if (instanz == "betrGrpSpeichern") {
        $.ajax({
            type: 'POST',
            async: true,
            url: 'php/instanzIntoDb.php',
            data: {
                id: "betrGrp",
                nameDB:"gipscomm",
                betrGrpID: $("#betrGrpID").val(),
                modus: "save",

                firma: $("#firmaBetrGrp").val(),
                anzahlMitarbeiter: $("#anzahlMitarbeiterBetrGrp").val(),
                anschrift: $("#anschriftBetrGrp").val(),
                plz: $("#plzBetrGrp").val(),
                ort: $("#ortBetrGrp").val(),
                geschaeftsfuehrer: $("#geschaeftsfuehrerBetrGrp").val(),
                telefon: $("#telefonBetrGrp").val(),
                eMail: $("#emailBetrGrp").val(),
                notiz: $("#notizBetrGrp").val()
            },
            success: function (echo) {
                //console.log(echo);
                alert("erfolgreich gespeichert!");
            }
        });
    }
    else if (instanz == "sAdmSpeichern") {

        $.ajax({
            type: 'POST',
            async: true,
            url: 'php/instanzIntoDb.php',
            data: {
                id:"sAdm",
                nameDB: "gipscomm",
                modus: "save",
                sAdmID: $("#sAdmID").val(),

                titel: $("#titelSAdm").val(),
                name: $("#nameSAdm").val(),
                vorname: $("#vornameSAdm").val(),
                eMail: $("#emailSAdm").val(),
                telefon: $("#telefonSAdm").val(),
                fax: $("#faxSAdm").val(),
                mobiltelefon: $("#mobiltelefonSAdm").val(),
                benutzername: $("#benutzernameSAdm").val(),
                passwort: getHash($("#passwortSAdm").val())
            },
            success: function (echo) {
                //console.log(echo);
                alert("erfolgreich gespeichert!");
            }
        });
    }
    else if (instanz == "manGrpSpeichern") {
      var arrMandantenIDs;

      for(i = 0;i < $("#tblMandantengruppe tbody tr").length;i++){
        arrMandantenIDs[i] = tblMandantengruppe.cell(i, 0).data();
      }

      var mandantenIDs = arrMandantenIDs.join(",");

        $.ajax({
            type: 'POST',
            async: true,
            url: 'php/instanzIntoDb.php',
            data: {
                id:"manGrp",
                nameDB: "gipscomm",
                modus: "save",
                manGrpID: $("#manGrpID").val(),
                mandatenIDs: mandantenIDs,

                name: $("#nameManGrp").val(),
                kurz: $("#kurzManGrp").val(),
                notiz: $("#notizManGrp").val()
            },
            success: function (echo) {
                //console.log(echo);
                alert("erfolgreich gespeichert!");
            }
        });
    }
    else if (instanz == "admSpeichern") {
        $.ajax({
            type: 'POST',
            async: true,
            url: 'php/instanzIntoDb.php',
            data: {
              id:"adm",
              modus: "save",
              nameDB: "gipscomm",
              admID: $("#admID").val(),

              titel: $("#titelAdm").val(),
              name: $("#nameAdm").val(),
              vorname: $("#vornameAdm").val(),
              eMail: $("#emailAdm").val(),
              telefon: $("#telefonAdm").val(),
              fax: $("#faxAdm").val(),
              mobiltelefon: $("#mobiltelefonAdm").val(),
              benutzername: $("#benutzernameAdm").val(),
              passwort: getHash($("#passwortAdm").val())
            },
            success: function (echo) {
                //console.log(echo);
                alert("erfolgreich gespeichert!");
            }
        });
    }
    else if (instanz == "benSpeichern") {
        $.ajax({
            type: 'POST',
            async: true,
            url: 'php/instanzIntoDb.php',
            data: {
              id: "ben",
              modus: "save",
              nameDB: "gipscomm",
              ben_ID: $("#benID").val(),

              titel: $("#titelBen").val(),
              name: $("#nameBen").val(),
              vorname: $("#vornameBen").val(),
              eMail: $("#emailBen").val(),
              telefon: $("#telefonBen").val(),
              fax: $("#faxBen").val(),
              mobiltelefon: $("#mobiltelefonBen").val(),
              benutzername: $("#benutzernameBen").val(),
              passwort: getHash($("#passwortBen").val())
            },
            success: function (echo) {
                //console.log(echo);
                alert("erfolgreich gespeichert!");
            }
        });
    }
    else if (instanz == "manSpeichern") {
        $.ajax({
            type: 'POST',
            async: true,
            url: 'php/mandantIntoDb.php',
            data: {
                modus: "save",
                betrGrpID: $("#betrGrpID").val(),
                manID: $("#manID").val(),
                name: $("#nameAllgemeinMan").val(),
                dbKurz: $("#dbKurz").val(),
                holdingstruktur: $("#holdingstrukturAllgemeinMan").is(':checked'),
                liegenschaften: $("#liegenschaftenAllgemeinMan").is(':checked'),
                notiz: $("#notizMan").text()
            },
            success: function () {
                alert("erfolgreich gespeichert!");
            }
        });
    }
    else if (instanz == "orgSpeichern") {
        $.ajax({
            type: 'POST',
            async: true,
            url: 'php/instanzIntoDb.php',
            data: {
                id: "org",
                modus: "save",
                orgID: $("#orgID").val(),
                nameDB: $("#nameDB").val(),
                nameAllgemein: $("#nameAllgemeinOrg").val(),
                gesellschaftsform: $("#gesellschaftsformAllgemeinOrg").val(),
                firmenanschrift: $("#firmenanschriftAllgemeinOrg").val(),
                land: $("#landAllgemeinOrg").val(),
                plz: $("#plzAllgemeinOrg").val(),
                ort: $("#ortAllgemeinOrg").val(),
                hrbNummer: $("#hrbnummerAllgemeinOrg").val(),
                titelGeschaeftsfuehrung: $("#titelGeschaeftsfuehrungOrg").val(),
                nameGeschaeftsfuehrung: $("#nameGeschaeftsfuehrungOrg").val(),
                vornameGeschaeftsfuehrung: $("#vornameGeschaeftsfuehrungOrg").val(),
                eMailGeschaeftsfuehrung: $("#emailGeschaeftsfuehrungOrg").val(),
                telefonGeschaeftsfuehrung: $("#telefonGeschaeftsfuehrungOrg").val(),
                faxGeschaeftsfuehrung: $("#faxGeschaeftsfuehrungOrg").val(),
                mobiltelefonGeschaeftsfuehrung: $("#mobiltelefonGeschaeftsfuehrungOrg").val(),
                titelEnergiemanagement: $("#titelEnergiemanagementOrg").val(),
                nameEnergiemanagement: $("#nameEnergiemanagementOrg").val(),
                vornameEnergiemanagement: $("#vornameEnergiemanagementOrg").val(),
                eMailEnergiemanagement: $("#emailEnergiemanagementOrg").val(),
                telefonEnergiemanagement: $("#telefonEnergiemanagementOrg").val(),
                faxEnergiemanagement: $("#faxEnergiemanagementOrg").val(),
                mobiltelefonEnergiemanagement: $("#mobiltelefonEnergiemanagementOrg").val()
            },
            success: function () {
                alert("erfolgreich gespeichert!");
            }
        })
    }
    else if (instanz == "liegSpeichern") {
        $.ajax({
            type: 'POST',
            async: true,
            url: 'php/instanzIntoDb.php',
            data: {
                id: "lieg",
                modus: "save",
                liegID: $("#liegID").val(),
                nameDB: $("#nameDB").val(),
                nameAllgemein: $("#nameAllgemeinLieg").val(),
                kuerzel: $("#kuerzelAllgemeinLieg").val(),
                eigenstaendigeForm: $("#eigenstaendigeformAllgemeinLieg").is(':checked'),
                aktiv: $("#aktivAllgemeinLieg").is(':checked'),
                gesellschaftsform: $("#gesellschaftsformAllgemeinLieg").val(),
                anschrift: $("#anschriftAllgemeinLieg").val(),
                land: $("#landAllgemeinLieg").val(),
                plz: $("#plzAllgemeinLieg").val(),
                ort: $("#ortAllgemeinLieg").val(),
                typ: $("#typAllgemeinLieg").val(),
                hatDl: $("#hatDlAllgemeinLieg").prop("checked"),
                titelAnsprechpartner: $("#titelAnsprechpartnerLieg").val(),
                nameAnsprechpartner: $("#nameAnsprechpartnerLieg").val(),
                vornameAnsprechpartner: $("#vornameAnsprechpartnerLieg").val(),
                eMailAnsprechpartner: $("#emailAnsprechpartnerLieg").val(),
                telefonAnsprechpartner: $("#telefonAnsprechpartnerLieg").val(),
                faxAnsprechpartner: $("#faxAnsprechpartnerLieg").val(),
                mobiltelefonAnsprechpartner: $("#mobiltelefonAnsprechpartnerLieg").val(),
                titelEnergiebeauftragter: $("#titelEnergiebeauftragterLieg").val(),
                nameEnergiebeauftragter: $("#nameEnergiebeauftragterLieg").val(),
                vornameEnergiebeauftragter: $("#vornameEnergiebeauftragterLieg").val(),
                eMailEnergiebeauftragter: $("#emailEnergiebeauftragterLieg").val(),
                telefonEnergiebeauftragter: $("#telefonEnergiebeauftragterLieg").val(),
                faxEnergiebeauftragter: $("#faxEnergiebeauftragterLieg").val(),
                mobiltelefonEnergiebeauftragter: $("#mobiltelefonEnergiebeauftragterLieg").val(),
                energietraeger1: $("#inputEnergietraeger1Lieg").val(),
                energietraeger2: $("#inputEnergietraeger2Lieg").val(),
                energietraeger3: $("#inputEnergietraeger3Lieg").val(),
                energietraeger4: $("#inputEnergietraeger4Lieg").val(),
                energietraeger5: $("#inputEnergietraeger5Lieg").val(),
                energietraeger6: $("#inputEnergietraeger6Lieg").val(),
                energietraeger7: $("#inputEnergietraeger7Lieg").val(),
                energietraeger8: $("#inputEnergietraeger8Lieg").val(),
                energietraeger9: $("#inputEnergietraeger9Lieg").val(),
                energieform1: $("#energieform1Lieg").val(),
                energieform2: $("#energieform2Lieg").val(),
                energieform3: $("#energieform3Lieg").val(),
                energieform4: $("#energieform4Lieg").val(),
                energieform5: $("#energieform5Lieg").val(),
                energieform6: $("#energieform6Lieg").val(),
                energieform7: $("#energieform7Lieg").val(),
                managementsystem1: $("#managementsystem1Lieg").val(),
                erstzertifizierung1: $("#erstzertifizierung1Lieg").val(),
                managementsystem2: $("#managementsystem2Lieg").val(),
                erstzertifizierung2: $("#erstzertifizierung2Lieg").val(),
                managementsystem3: $("#managementsystem3Lieg").val(),
                erstzertifizierung3: $("#erstzertifizierung3Lieg").val()
            },
            success: function (echo) {
                alert("erfolgreich gespeichert!");
            }
        })
    }
    else if (instanz == "extDlSpeichern") {
        $.ajax({
            type: 'POST',
            async: true,
            url: 'php/instanzIntoDb.php',
            data: {
                id: "extDl",
                modus: "save",
                extDlID: $("#extDlID").val(),
                nameDB: $("#nameDB").val(),
                nameAllgemein: $("#nameExtDl").val(),
                aktiv: $("#aktivExtDl").is(':checked'),
                gesellschaftsform: $("#gesellschaftsformExtDl").val(),
                anschrift: $("#anschriftExtDl").val(),
                land: $("#landExtDl").val(),
                plz: $("#plzExtDl").val(),
                ort: $("#ortExtDl").val(),
                typ: $("#typExtDl").val(),
                standortdatenDritte: $("#stdExtDl").is(":checked"),
                titelAnsprechpartner: $("#titelAnsprechpartnerExtDl").val(),
                nameAnsprechpartner: $("#nameAnsprechpartnerExtDl").val(),
                vornameAnsprechpartner: $("#vornameAnsprechpartnerExtDl").val(),
                eMailAnsprechpartner: $("#emailAnsprechpartnerExtDl").val(),
                telefonAnsprechpartner: $("#telefonAnsprechpartnerExtDl").val(),
                faxAnsprechpartner: $("#faxAnsprechpartnerExtDl").val(),
                mobiltelefonAnsprechpartner: $("#mobiltelefonAnsprechpartnerExtDl").val(),
                titelEnergiebeauftragter: $("#titelEnergiebeauftragterExtDl").val(),
                nameEnergiebeauftragter: $("#nameEnergiebeauftragterExtDl").val(),
                vornameEnergiebeauftragter: $("#vornameEnergiebeauftragterExtDl").val(),
                eMailEnergiebeauftragter: $("#emailEnergiebeauftragterExtDl").val(),
                telefonEnergiebeauftragter: $("#telefonEnergiebeauftragterExtDl").val(),
                faxEnergiebeauftragter: $("#faxEnergiebeauftragterExtDl").val(),
                mobiltelefonEnergiebeauftragter: $("#mobiltelefonEnergiebeauftragterExtDl").val(),

                energietraeger1: $("#energietraeger1ExtDl").val(),
                  messstelle1Ent:  $("#messstelle1ExtDl").val(),
                  standort1Ent:  $("#standort1ExtDl").val(),
                energietraeger2: $("#energietraeger2ExtDl").val(),
                  messstelle2Ent:  $("#messstelle2ExtDl").val(),
                  standort2Ent:  $("#standort2ExtDl").val(),
                energietraeger3: $("#energietraeger3ExtDl").val(),
                  messstelle3Ent:  $("#messstelle3ExtDl").val(),
                  standort3Ent:  $("#standort3ExtDl").val(),
                energietraeger4: $("#energietraeger4ExtDl").val(),
                  messstelle4Ent:  $("#messstelle4ExtDl").val(),
                  standort4Ent:  $("#standort4ExtDl").val(),
                energietraeger5: $("#energietraeger5ExtDl").val(),
                  messstelle5Ent:  $("#messstelle5ExtDl").val(),
                  standort5Ent:  $("#standort5ExtDl").val(),
                energietraeger6: $("#energietraeger6ExtDl").val(),
                  messstelle6Ent:  $("#messstelle6ExtDl").val(),
                  standort6Ent:  $("#standort6ExtDl").val(),

                energieRes1: $("#energieRes1ExtDl").val(),
                  messstelle1EnfRes:  $("#messstelleEngRes1ExtDl").val(),
                  standort1EnfRes: $("#standort1EngResExtDl").val(),
                energieRes2: $("#energieRes2ExtDl").val(),
                  messstelle2EnfRes:  $("#messstelleEngRes2ExtDl").val(),
                  standort2EnfRes: $("#standort2EngResExtDl").val(),
                energieRes3: $("#energieRes3ExtDl").val(),
                  messstelle3EnfRes:  $("#messstelleEngRes3ExtDl").val(),
                  standort3EnfRes: $("#standort3EngResExtDl").val(),
                energieRes4: $("#energieRes4ExtDl").val(),
                  messstelle4EnfRes:  $("#messstelleEngRes4ExtDl").val(),
                  standort4EnfRes: $("#standort4EngResExtDl").val(),
                energieRes5: $("#energieRes5ExtDl").val(),
                  messstelle5EnfRes:  $("#messstelleEngRes5ExtDl").val(),
                  standort5EnfRes: $("#standort5EngResExtDl").val(),
                energieRes6: $("#energieRes6ExtDl").val(),
                  messstelle6EnfRes:  $("#messstelleEngRes6ExtDl").val(),
                  standort6EnfRes: $("#standort6EngResExtDl").val()
            },
            success: function (echo) {
                //console.log(echo);
                alert("erfolgreich gespeichert!");
            }
        });
    }
    else if (instanz == "berSpeichern") {
        $.ajax({
            type: 'POST',
            async: true,
            url: 'php/instanzIntoDb.php',
            data: {
                id: "ber",
                modus: "save",
                berID: $("#berID").val(),
                nameDB: $("#nameDB").val(),
                nameAllgemein: $("#nameAllgemeinBer").val(),
                kurzbezeichnung: $("#kurzbezeichnungAllgemeinBer").val(),
                kostenstelle: $("#KostenstelleAllgemeinBer").val(),
                ort: $("#ortBer").val(),
                ausgewaehltesLevel: $("#levelAuswahlAllgemeinBer").val(),
                weitereBereiche: $("#weiterebereicheAllgemeinBer").is(":checked"),
                vorgelagerterBereich1: $("#vorgelagerteBereiche1AllgemeinBer").val(),
                vorgelagerterBereich2: $("#vorgelagerteBereiche2AllgemeinBer").val(),
                notiz: $("#notizAllgemeinBer").val(),
                energietraeger1: $("#energietraeger1AllgemeinBer").val(),
                energietraeger2: $("#energietraeger2AllgemeinBer").val(),
                energietraeger3: $("#energietraeger3AllgemeinBer").val(),
                energietraeger4: $("#energietraeger4AllgemeinBer").val()
            },
            success: function (echo) {
                //console.log(echo);
                alert("erfolgreich gespeichert!");
            }
        })
    }
    else if (instanz == "mstSpeichern") {
        $.ajax({
            type: 'POST',
            async: true,
            url: 'php/instanzIntoDb.php',
            data: {
                id: "mst",
                modus: "save",
                mstID: $("#mstID").val(),
                nameDB: $("#nameDB").val(),
                messstellenbezeichnung: $("#nameMst").val(),
                kurzbezeichnung: $("#kurzbezeichnungMst").val(),
                kostenstelle: $("#kostenstelleMst").val(),
                aktiv: $("#aktivMst").is(":checked"),
                energietraeger: $("#energietraegerMst").val(),
                ort: $("#ortMst").val(),
                messart: $("#messartMst").val(),
                vorgelagerteMessstelle: $("#vorgelagerteMst").val(),
                messmittelBerechnungslogik: $("#messmittelBerechnungslogikMst").val(),
                anlage: $("#anlMst").val(),
                notiz: $("#notizAllgemeinMst").val()
            },
            success: function (echo) {
                //console.log(echo);
                alert("erfolgreich gespeichert!");
            }
        })
    }
    else if (instanz == "stdSpeichern") {
        $.ajax({
            type: 'POST',
            async: true,
            url: 'php/instanzIntoDb.php',
            data: {
                id: "std",
                modus: "save",
                stdID: $("#stdID").val(),
                nameDB: $("#nameDB").val(),
                ort: $("#nameAllgemeinStd").val(),
                kuerzel: $("#kurzbezeichnungAllgemeinStd").val(),
                flaeche: $("#flaecheAllgemeinStd").val(),
                customLabel1: $("#custom1LabelStd").text(),
                customInput1: $("#custom1EingabeStd").val(),
                customLabel2: $("#custom2LabelStd").text(),
                customInput2: $("#custom2EingabeStd").val(),
                customLabel3: $("#custom3LabelStd").text(),
                customInput3: $("#custom3EingabeStd").val(),
                customLabel4: $("#custom4LabelStd").text(),
                customInput4: $("#custom4EingabeStd").val(),
                customLabel5: $("#custom5LabelStd").text(),
                customInput5: $("#custom5EingabeStd").val(),
                customLabel6: $("#custom6LabelStd").text(),
                customInput6: $("#custom6EingabeStd").val(),
                notiz: $("#notizAllgemeinStd").val()
            },
            success: function (echo) {
                //console.log(echo);
                alert("erfolgreich gespeichert!");
                readInstanzen("stdLast", $("#stdCount").val());
            }
        })
    }
    else if (instanz == "stdDrSpeichern") {
        $.ajax({
            type: 'POST',
            async: true,
            url: 'php/instanzIntoDb.php',
            data: {
                id: "stdDr",
                modus: "save",
                stdDrID: $("#stdDrID").val(),
                nameDB: $("#nameDB").val(),

                ort: $("#nameAllgemeinStdDr").val(),
                kuerzel: $("#kurzbezeichnungAllgemeinStdDr").val(),
                flaeche: $("#flaecheAllgemeinStdDr").val(),
                customLabel1: $("#custom1LabelStdDr").text(),
                customInput1: $("#custom1EingabeStdDr").val(),
                customLabel2: $("#custom2LabelStdDr").text(),
                customInput2: $("#custom2EingabeStdDr").val(),
                customLabel3: $("#custom3LabelStdDr").text(),
                customInput3: $("#custom3EingabeStdDr").val(),
                customLabel4: $("#custom4LabelStdDr").text(),
                customInput4: $("#custom4EingabeStdDr").val(),
                customLabel5: $("#custom5LabelStdDr").text(),
                customInput5: $("#custom5EingabeStdDr").val(),
                customLabel6: $("#custom6LabelStdDr").text(),
                customInput6: $("#custom6EingabeStdDr").val(),
                notiz: $("#notizAllgemeinStdDr").val()
            },
            success: function (echo) {
                //console.log(echo);
                alert("erfolgreich gespeichert!");
            }
        });
    }
    else if (instanz == "anlSpeichern") {
      var bild = $("#bildAllgemeinAnl").prop("src");
      //console.log(bild);
      var arr = bild.split($("#nameDB").val());
      var trackInfo = changeTracker.getChanges();
      var nTrackInfo = trackInfo.length;
      var info = "";

      for(var inf = 0; inf < nTrackInfo; inf++){
        info += trackInfo[inf].label + ":" + trackInfo[inf].oldValue + " -> " + trackInfo[inf].newValue + ", ";
      }
        $.ajax({
            type: 'POST',
            async: true,
            url: 'php/instanzIntoDb.php',
            data: {
                id: "anl",
                modus: "save",
                anlID: $("#anlID").val(),
                nameDB: $("#nameDB").val(),
                liegID: $("#liegID").val(),
                archiviert: $("#archiviertAnl").val(),
                bemerkung: $("#bemerkungAnlHistFenster").val(),
                info: info,
                gueltigVon: $("#gueltigVonAnlHistFenster").val(),
                gueltigBis: $("#gueltigBisAnlHistFenster").val(),

                anlagenbild: "uploadsDownloads/images/" + $("#nameDB").val() + arr[1],
                anlagennummer: $("#anlagennummerAllgemeinAnl").val(),
                bezeichnung: $("#bezeichnungAllgemeinAnl").val(),
                aktiv: $("#aktivAllgemeinAnl").is(":checked"),
                typ: $("#typAllgemeinAnl").val(),
                seriennummer: $("#serienNrAllgemeinAnl").val(),
                standort: $("#standortAllgemeinAnl").val(),
                baujahr: $("#baujahrAnl").val(),
                anschaffungsdatum: $("#datumAnschaffungAllgemeinAnl").val(),
                jahresbetriebsstunden: $("#betriebsstundenAllgemeinAnl").val(),
                notizAllgemein: $("#notizAllgemeinAnl").val(),
                produkt: $("#produktAllgemeinAnl").val(),
                produktionsmenge: $("#produktionsmenge1AllgemeinAnl").val(),
                produktionsmengeEinheit: $("#einheitProduktionsmenge1AllgemeinAnl").val(),
                produktnummer: $("#produktnummer1AllgemeinAnl").val(),
                mehrProdukte: $("#mehrProdukteAllgemeinAnl").is(":checked"),

                zugeordneterVerbraucher1: $("#zugeordneterVerbraucher1AllgemeinAnl").val(),
                zugeordneterVerbraucher2: $("#zugeordneterVerbraucher2AllgemeinAnl").val(),
                zugeordneterVerbraucher3: $("#zugeordneterVerbraucher3AllgemeinAnl").val(),
                zugeordneterVerbraucher4: $("#zugeordneterVerbraucher4AllgemeinAnl").val(),
                zugeordneterVerbraucher5: $("#zugeordneterVerbraucher5AllgemeinAnl").val(),
                zugeordneterVerbraucher6: $("#zugeordneterVerbraucher6AllgemeinAnl").val(),

                energietraeger1: $("#energietraeger1AllgemeinAnl").val(),
                energieform1: $("#energieform1AllgemeinAnl").val(),
                einheit1: $("#einheit1Anl").val(),
                anschlussleistung1: $("#anschlussleistung1Anl").val(),
                mittlereAuslastungProzent1: $("#mittlereAuslastungProzent1Anl").val(),
                mittlereAuslastungKw1: $("#mittlereAuslastungKw1Anl").val(),
                betriebstemperatur1: $("#betriebstemperatur1Anl").val(),
                messstelle1: $("#mst1Anl").val(),
                versBereich1: $("#ber1Anl").val(),
                abwaerme1: $("#abwaerme1Anl").val(),
                abwaermeNutzbarkeit1: $("#nutzbarkeitAbwaerme1Anl").val(),
                bewertungAbwaermeNutzbarkeit1: $("#bewertungNutzbarkeitAbwaerme1Anl").val(),

                energietraeger2: $("#energietraeger2AllgemeinAnl").val(),
                energieform2: $("#energieform2AllgemeinAnl").val(),
                einheit2: $("#einheit2Anl").val(),
                anschlussleistung2: $("#anschlussleistung2Anl").val(),
                mittlereAuslastungProzent2: $("#mittlereAuslastungProzent2Anl").val(),
                mittlereAuslastungKw2: $("#mittlereAuslastungKw2Anl").val(),
                betriebstemperatur2: $("#betriebstemperatur2Anl").val(),
                messstelle2: $("#mst2Anl").val(),
                versBereich2: $("#ber2Anl").val(),
                abwaerme2: $("#abwaerme2Anl").val(),
                abwaermeNutzbarkeit2: $("#nutzbarkeitAbwaerme2Anl").val(),
                bewertungAbwaermeNutzbarkeit2: $("#bewertungNutzbarkeitAbwaerme2Anl").val(),

                energietraeger3: $("#energietraeger3AllgemeinAnl").val(),
                energieform3: $("#energieform3AllgemeinAnl").val(),
                einheit3: $("#einheit3Anl").val(),
                anschlussleistung3: $("#anschlussleistung3Anl").val(),
                mittlereAuslastungProzent3: $("#mittlereAuslastungProzent3Anl").val(),
                mittlereAuslastungKw3: $("#mittlereAuslastungKw3Anl").val(),
                betriebstemperatur3: $("#betriebstemperatur3Anl").val(),
                messstelle3: $("#mst3Anl").val(),
                versBereich3: $("#ber3Anl").val(),
                abwaerme3: $("#abwaerme3Anl").val(),
                abwaermeNutzbarkeit3: $("#nutzbarkeitAbwaerme3Anl").val(),
                bewertungAbwaermeNutzbarkeit3: $("#bewertungNutzbarkeitAbwaerme3Anl").val(),

                energietraeger4: $("#energietraeger4AllgemeinAnl").val(),
                energieform4: $("#energieform4AllgemeinAnl").val(),
                einheit4: $("#einheit4Anl").val(),
                anschlussleistung4: $("#anschlussleistung4Anl").val(),
                mittlereAuslastungProzent4: $("#mittlereAuslastungProzent4Anl").val(),
                mittlereAuslastungKw4: $("#mittlereAuslastungKw4Anl").val(),
                betriebstemperatur4: $("#betriebstemperatur4Anl").val(),
                messstelle4: $("#mst4Anl").val(),
                versBereich4: $("#ber4Anl").val(),
                abwaerme4: $("#abwaerme4Anl").val(),
                abwaermeNutzbarkeit4: $("#nutzbarkeitAbwaerme4Anl").val(),
                bewertungAbwaermeNutzbarkeit4: $("#bewertungNutzbarkeitAbwaerme4Anl").val(),
                custom1: $("#custom1Anl").val(),
                custom2: $("#custom2Anl").val(),
                custom3: $("#custom3Anl").val(),
                custom4: $("#custom4Anl").val(),
                custom5: $("#custom5Anl").val(),
                custom6: $("#custom6Anl").val()
            },
            success: function (echo) {
                console.log(echo);
                alert("erfolgreich gespeichert!");
            }
        });
    }
    else if (instanz == "anlVerschieben") {
        $.ajax({
            type: 'POST',
            async: true,
            url: 'php/instanzIntoDb.php',
            data: {
                id: "anlVersch",
                nameDB: $("#nameDB").val(),
                anlID: changePath.getAnlagenID(),
                liegID: changePath.getLiegenschaftsID()
            },
            success: function (echo) {
                console.log(echo);
                alert("erfolgreich verschoben!");
                changePath.resetInfos();
            }
        });
    }
    else if (instanz == "anlSpeichernHist") {
      var bild = $("#bildAllgemeinAnl").prop("src");
      //console.log(bild);
      var arr = bild.split($("#nameDB").val());

        $.ajax({
            type: 'POST',
            async: true,
            url: 'php/instanzIntoDb.php',
            data: {
                id: "anlHist",
                modus: "save",
                anlID: $("#anlIDHist").val(),
                nameDB: $("#nameDB").val(),
                liegID: $("#liegID").val(),
                archiviert: 1,

                anlagenbild: "uploadsDownloads/images/" + $("#nameDB").val() + arr[1],
                gueltigVon: $("#gueltigVonAnlHist").val(),
                gueltigBis:$("#gueltigBisAnlHist").val(),
                anlagennummer: $("#anlagennummerAllgemeinAnlHist").val(),
                bezeichnung: $("#bezeichnungAllgemeinAnlHist").val(),
                aktiv: $("#aktivAllgemeinAnlHist").is(":checked"),
                typ: $("#typAllgemeinAnlHist").val(),
                seriennummer: $("#serienNrAllgemeinAnlHist").val(),
                standort: $("#standortAllgemeinAnlHist").val(),
                baujahr: $("#baujahrAnlHist").val(),
                anschaffungsdatum: $("#datumAnschaffungAllgemeinAnlHist").val(),
                jahresbetriebsstunden: $("#betriebsstundenAllgemeinAnlHist").val(),
                notizAllgemein: $("#notizAllgemeinAnlHist").val(),
                produkt: $("#produktAllgemeinAnlHist").val(),
                produktionsmenge: $("#produktionsmenge1AllgemeinAnlHist").val(),
                produktionsmengeEinheit: $("#einheitProduktionsmenge1AllgemeinAnlHist").val(),
                produktnummer: $("#produktnummer1AllgemeinAnlHist").val(),
                mehrProdukte: $("#mehrProdukteAllgemeinAnlHist").is(":checked"),

                zugeordneterVerbraucher1: $("#zugeordneterVerbraucher1AllgemeinAnlHist").val(),
                zugeordneterVerbraucher2: $("#zugeordneterVerbraucher2AllgemeinAnlHist").val(),
                zugeordneterVerbraucher3: $("#zugeordneterVerbraucher3AllgemeinAnlHist").val(),
                zugeordneterVerbraucher4: $("#zugeordneterVerbraucher4AllgemeinAnlHist").val(),
                zugeordneterVerbraucher5: $("#zugeordneterVerbraucher5AllgemeinAnlHist").val(),
                zugeordneterVerbraucher6: $("#zugeordneterVerbraucher6AllgemeinAnlHist").val(),

                energietraeger1: $("#energietraeger1AllgemeinAnlHist").val(),
                energieform1: $("#energieform1AllgemeinAnlHist").val(),
                einheit1: $("#einheit1AnlHist").val(),
                anschlussleistung1: $("#anschlussleistung1AnlHist").val(),
                mittlereAuslastungProzent1: $("#mittlereAuslastungProzent1AnlHist").val(),
                mittlereAuslastungKw1: $("#mittlereAuslastungKw1AnlHist").val(),
                betriebstemperatur1: $("#betriebstemperatur1AnlHist").val(),
                messstelle1: $("#mst1AnlHist").val(),
                versBereich1: $("#ber1AnlHist").val(),
                abwaerme1: $("#abwaerme1AnlHist").val(),
                abwaermeNutzbarkeit1: $("#nutzbarkeitAbwaerme1AnlHist").val(),
                bewertungAbwaermeNutzbarkeit1: $("#bewertungNutzbarkeitAbwaerme1AnlHist").val(),

                energietraeger2: $("#energietraeger2AllgemeinAnlHist").val(),
                energieform2: $("#energieform2AllgemeinAnlHist").val(),
                einheit2: $("#einheit2AnlHist").val(),
                anschlussleistung2: $("#anschlussleistung2AnlHist").val(),
                mittlereAuslastungProzent2: $("#mittlereAuslastungProzent2AnlHist").val(),
                mittlereAuslastungKw2: $("#mittlereAuslastungKw2AnlHist").val(),
                betriebstemperatur2: $("#betriebstemperatur2AnlHist").val(),
                messstelle2: $("#mst2AnlHist").val(),
                versBereich2: $("#ber2AnlHist").val(),
                abwaerme2: $("#abwaerme2AnlHist").val(),
                abwaermeNutzbarkeit2: $("#nutzbarkeitAbwaerme2AnlHist").val(),
                bewertungAbwaermeNutzbarkeit2: $("#bewertungNutzbarkeitAbwaerme2AnlHist").val(),

                energietraeger3: $("#energietraeger3AllgemeinAnlHist").val(),
                energieform3: $("#energieform3AllgemeinAnlHist").val(),
                einheit3: $("#einheit3AnlHist").val(),
                anschlussleistung3: $("#anschlussleistung3Anl").val(),
                mittlereAuslastungProzent3: $("#mittlereAuslastungProzent3AnlHist").val(),
                mittlereAuslastungKw3: $("#mittlereAuslastungKw3AnlHist").val(),
                betriebstemperatur3: $("#betriebstemperatur3AnlHist").val(),
                messstelle3: $("#mst3AnlHist").val(),
                versBereich3: $("#ber3AnlHist").val(),
                abwaerme3: $("#abwaerme3AnlHist").val(),
                abwaermeNutzbarkeit3: $("#nutzbarkeitAbwaerme3AnlHist").val(),
                bewertungAbwaermeNutzbarkeit3: $("#bewertungNutzbarkeitAbwaerme3AnlHist").val(),

                energietraeger4: $("#energietraeger4AllgemeinAnlHist").val(),
                energieform4: $("#energieform4AllgemeinAnlHist").val(),
                einheit4: $("#einheit4AnlHist").val(),
                anschlussleistung4: $("#anschlussleistung4AnlHist").val(),
                mittlereAuslastungProzent4: $("#mittlereAuslastungProzent4AnlHist").val(),
                mittlereAuslastungKw4: $("#mittlereAuslastungKw4AnlHist").val(),
                betriebstemperatur4: $("#betriebstemperatur4AnlHist").val(),
                messstelle4: $("#mst4AnlHist").val(),
                versBereich4: $("#ber4AnlHist").val(),
                abwaerme4: $("#abwaerme4AnlHist").val(),
                abwaermeNutzbarkeit4: $("#nutzbarkeitAbwaerme4AnlHist").val(),
                bewertungAbwaermeNutzbarkeit4: $("#bewertungNutzbarkeitAbwaerme4AnlHist").val(),
                custom1: $("#custom1AnlHist").val(),
                custom2: $("#custom2AnlHist").val(),
                custom3: $("#custom3AnlHist").val(),
                custom4: $("#custom4AnlHist").val(),
                custom5: $("#custom5AnlHist").val(),
                custom6: $("#custom6AnlHist").val()
            },
            success: function (echo) {
                console.log(echo);
                alert("erfolgreich gespeichert!");
            }
        });
    }
    else if (instanz == "msmSpeichern") {
      var bild = $("#bildAllgemeinMsm").prop("src");
      var arr = bild.split($("#nameDB").val());
        $.ajax({
            type: 'POST',
            async: true,
            url: 'php/instanzIntoDb.php',
            data: {
                id: "msm",
                modus: "save",
                nameDB: $("#nameDB").val(),
                msmID: $("#msmID").val(),
                nr: $("#messmittelNrAllgemeinMsm").val(),
                messmittelbild: "uploadsDownloads/images/" + $("#nameDB").val() + arr[1],
                bezeichnung: $("#bezeichnungAllgemeinMsm").val(),
                messstelle: $("#messstelleAllgemeinMsm").val(),
                anlage: $("#anlMsm").val(),
                typ: $("#typAllgemeinMsm").val(),
                nrTyp: $("#typNrAllgemeinMsm").val(),
                datumInstallation: $("#installationsdatumAllgemeinMsm").val(),
                energietraeger: $("#entMsm").val(),
                einheit: $("#einheitAllgemeinMsm").val(),
                multibox: $("#multiboxAllgemeinMsm").is(":checked"),
                unit: $("#unitAllgemeinMsm").val(),
                typUnit: $("#unitTypAllgemeinMsm").val(),
                anzahlKanaele: $("#anzahlKanaeleAllgemeinMsm").val(),
                messungsform: $("#messungsformAllgemeinMsm").val(),
                kanal1: $("#kanal1AllgemeinMsm").val(),
                kanal2: $("#kanal2AllgemeinMsm").val(),
                kanal3: $("#kanal3AllgemeinMsm").val(),
                notizAllgemein: $("#notizAllgemeinMsm").val(),
                nameBeauftragter: $("#beauftragterPruefinformationenMsm").val(),
                emailBeauftragter: $("#beauftragterEmailPruefinformationenMsm").val(),
                pruefzyklus: $("#pruefzyklusPruefinformationenMsm").val(),
                letztePruefung: $("#letztePruefungPruefinformationenMsm").val(),
                naechstePruefung: $("#naechstePruefungPruefinformationenMsm").val(),
                notizPruef: $("#notiz2AllgemeinMsm").val(),
                messmethode: $("#messmethodeInformationenConfig").val(),
                messzyklus: $("#messzyklusInformationenConfig").val(),
                messtoleranz: formatNumber("deform",$("#messtoleranzInformationenConfig").val()),
                notizAllgInfos: $("#notiz1InformationenConfig").val(),
                wandlerfaktor: formatNumber("deform",$("#wandlungsfaktorTechnischeDetailsConfig").val()),
                geraetetyp: $("#geraetetypTechnischeDetailsConfig").val(),
                ipAddresse: $("#ipTechnischeDetailsConfig").val(),
                subnetMaske: $("#subnetMaskTechnischeDetailsConfig").val(),
                gateway: $("#gatewayTechnischeDetailsConfig").val(),
                cgiPort: $("#cgiPortTechnischeDetailsConfig").val(),
                modbusPort: $("#modbusPortTechnischeDetailsConfig").val(),
                ftpPort: $("#ftpPortTechnischeDetailsConfig").val(),
                notizTechnDetails: $("#notiz2InformationenConfig").val()
            },
            success: function (echo) {
                //console.log(echo);
                alert("erfolgreich gespeichert!");
            }
        })
    }
    else if (instanz == "entSpeichern") {
        $.ajax({
            type: 'POST',
            async: true,
            url: 'php/instanzIntoDb.php',
            data: {
                id: "ent",
                modus: "save",
                modusVers: $("#modusVers").val(),
                nameDB: entDB,
                entID: $("#entID").val(),
                versID:$("#versID").val(),
                name: $("#nameEnt").val(),
                kuerzel: $("#kuerzelEnt").val(),
                allgemEnt: $("#allgemEntEnt").val(),
                notiz: $("#notizEnt").val(),

                versorgerEvu: $("#versorgerEvuEnt").val(),
                versorgerUenb: $("#versorgerUenbEnt").val(),
                versorgerMsb: $("#versorgerMsbEnt").val(),
                einheit1: $("#einheit1Ent").val(),
                einheit2: $("#einheit2Ent").val(),
                einheit3: $("#einheit3Ent").val(),
                einh1FaktorKwh: $("#entEinh1FaktorKwh").val(),
                einh2FaktorKwh: $("#entEinh2FaktorKwh").val(),
                einh3FaktorKwh: $("#entEinh3FaktorKwh").val(),
                einh1FaktorCO2: $("#entEinh1FaktorCO2").val(),
                einh2FaktorCO2: $("#entEinh2FaktorCO2").val(),
                einh3FaktorCO2: $("#entEinh3FaktorCO2").val(),
                lblEinh1FaktorX1: $("#lblEntEinh1FaktorX1").text(),
                lblEinh2FaktorX1: $("#lblEntEinh2FaktorX1").text(),
                lblEinh3FaktorX1: $("#lblEntEinh3FaktorX1").text(),
                einh1FaktorX1: $("#entEinh1FaktorX1").val(),
                einh2FaktorX1: $("#entEinh2FaktorX1").val(),
                einh3FaktorX1: $("#entEinh3FaktorX1").val(),
                lblEinh1FaktorX2: $("#lblEntEinh1FaktorX2").text(),
                lblEinh2FaktorX2: $("#lblEntEinh2FaktorX2").text(),
                lblEinh3FaktorX2: $("#lblEntEinh3FaktorX2").text(),
                einh1FaktorX2: $("#entEinh1FaktorX2").val(),
                einh2FaktorX2: $("#entEinh2FaktorX2").val(),
                einh3FaktorX2: $("#entEinh3FaktorX2").val(),
                lblEinh1FaktorX3: $("#lblEntEinh1FaktorX3").text(),
                lblEinh2FaktorX3: $("#lblEntEinh2FaktorX3").text(),
                lblEinh3FaktorX3: $("#lblEntEinh3FaktorX3").text(),
                einh1FaktorX3: $("#entEinh1FaktorX3").val(),
                einh2FaktorX3: $("#entEinh2FaktorX3").val(),
                einh3FaktorX3: $("#entEinh3FaktorX3").val(),
                gueltigVom: $("#gueltigVomEnt").val(),
                gueltigBis: $("#gueltigBisEnt").val()
            },
            success: function (echo) {
                console.log(echo);
                alert("erfolgreich gespeichert!");
            }
        })
    }
    else if (instanz == "enfSpeichern") {
        $.ajax({
            type: 'POST',
            async: true,
            url: 'php/instanzIntoDb.php',
            data: {
                id: "enf",
                modus: "save",
                nameDB: entDB,
                enfID: $("#enfID").val(),
                name: $("#nameEnf").val(),
                kuerzel: $("#kuerzelEnf").val(),
                notiz: $("#notizEnf").val(),
                aktiv: $("#aktivEnf").is(":checked"),
                einheit1: $("#einheit1Enf").val(),
                einheit2: $("#einheit2Enf").val(),
                einheit3: $("#einheit3Enf").val(),
                einh1FaktorKwh: $("#enfEinh1FaktorKwh").val(),
                einh2FaktorKwh: $("#enfEinh2FaktorKwh").val(),
                einh3FaktorKwh: $("#enfEinh3FaktorKwh").val(),
                einh1FaktorCO2: $("#enfEinh1FaktorCO2").val(),
                einh2FaktorCO2: $("#enfEinh2FaktorCO2").val(),
                einh3FaktorCO2: $("#enfEinh3FaktorCO2").val(),
                lblEinh1FaktorX1: $("#lblEnfEinh1FaktorX1").text(),
                lblEinh2FaktorX1: $("#lblEnfEinh2FaktorX1").text(),
                lblEinh3FaktorX1: $("#lblEnfEinh3FaktorX1").text(),
                einh1FaktorX1: $("#enfEinh1FaktorX1").val(),
                einh2FaktorX1: $("#enfEinh2FaktorX1").val(),
                einh3FaktorX1: $("#enfEinh3FaktorX1").val(),
                lblEinh1FaktorX2: $("#lblEnfEinh1FaktorX2").text(),
                lblEinh2FaktorX2: $("#lblEnfEinh2FaktorX2").text(),
                lblEinh3FaktorX2: $("#lblEnfEinh3FaktorX2").text(),
                einh1FaktorX2: $("#enfEinh1FaktorX2").val(),
                einh2FaktorX2: $("#enfEinh2FaktorX2").val(),
                einh3FaktorX2: $("#enfEinh3FaktorX2").val(),
                lblEinh1FaktorX3: $("#lblEnfEinh1FaktorX3").text(),
                lblEinh2FaktorX3: $("#lblEnfEinh2FaktorX3").text(),
                lblEinh3FaktorX3: $("#lblEnfEinh3FaktorX3").text(),
                einh1FaktorX3: $("#enfEinh1FaktorX3").val(),
                einh2FaktorX3: $("#enfEinh2FaktorX3").val(),
                einh3FaktorX3: $("#enfEinh3FaktorX3").val(),
                gueltigVom: $("#gueltigVomEnf").val(),
                gueltigBis: $("#gueltigBisEnf").val()
            },
            success: function (echo) {
                //console.log(echo);
                alert("erfolgreich gespeichert!");
            }
        })
    }
    else if (instanz == "eRngSpeichern") {
        $.ajax({
            type: 'POST',
            async: true,
            url: 'php/instanzIntoDb.php',
            data: {
                id: "eRng",
                modus: "save",
                nameDB: $("#nameDB").val(),
                eRngID: $("#eRngID").val(),
                versorger: $("#versorgerERng").val(),
                rechnungsmodus: $("#modusERng").val(),
                rechnungsnummer: $("#nrERng").val(),
                zaehlpunktnummer: $("#zpNrERng").val(),
                messstelle: $("#mstERng").val(),
                rechnungsdatum: $("#datumERng").val(),
                abrechnungszeitVom: $("#vomERng").val(),
                abrechnungszeitBis: $("#bisERng").val(),
                energietraeger: $("#entERng").val(),
                einheit: $("#einERng").val(),
                menge: formatNumber("deform",$("#mengeERng").val()),
                verbrauch: formatNumber("deform",$("#verbrauchERng").val()),
                kostenstelle: $("#kostenstelleERng").val(),
                kosten: formatNumber("deform",$("#kostenERng").val()),

                tagstromVerbr: formatNumber("deform",$("#tagstromVerbrERng").val()),
                tagstromKost: formatNumber("deform",$("#tagstromKostERng").val()),
                nachtstromVerbr: formatNumber("deform",$("#nachtstromVerbrERng").val()),
                nachtstromKost: formatNumber("deform",$("#nachtstromKostERng").val()),
                blindstrom: formatNumber("deform",$("#blindstromERng").val()),
                lastspitze: formatNumber("deform",$("#lastspitzeERng").val()),
                leistungspreis:formatNumber("deform",$("#leistungspreisERng").val()),
                arbeitspreisWirkstrom: formatNumber("deform",$("#abpWirkERng").val()),
                stromsteuer: formatNumber("deform",$("#strSteuERng").val()),
                arbeitspreisNetz: formatNumber("deform",$("#abpNetzERng").val()),
                konzessionsabgabe: formatNumber("deform",$("#konzERng").val()),

                eegUmlage: formatNumber("deform",$("#eegERng").val()),
                eegUmlageUntMill: formatNumber("deform",$("#eegUntERng").val()),
                eegUmlageUebMill: formatNumber("deform",$("#eegUebERng").val()),
                kwkUnter: formatNumber("deform",$("#kwkUntERng").val()),
                kwkUeber: formatNumber("deform",$("#kwkObERng").val()),
                nevUnter: formatNumber("deform",$("#nevUntERng").val()),
                nevUeber: formatNumber("deform",$("#nevObERng").val()),
                offUnter: formatNumber("deform",$("#offUntERng").val()),
                offUeber: formatNumber("deform",$("#offObERng").val()),

                lblCustom1: $("#lblCustom1ERng").text(),
                Custom1: formatNumber("deform",$("#Custom1ERng").val()),
                lblCustom2: $("#lblCustom2ERng").text(),
                Custom2: formatNumber("deform",$("#Custom2ERng").val()),
                lblCustom3: $("#lblCustom3ERng").text(),
                Custom3: formatNumber("deform",$("#Custom3ERng").val()),
                lblCustom4: $("#lblCustom4ERng").text(),
                Custom4: formatNumber("deform",$("#Custom4ERng").val()),
                lblCustom5: $("#lblCustom5ERng").text(),
                Custom5: formatNumber("deform",$("#Custom5ERng").val()),
                lblCustom6: $("#lblCustom6ERng").text(),
                Custom6: formatNumber("deform",$("#Custom6ERng").val())
            },
            success: function (echo) {
                //console.log(echo);
                alert("erfolgreich gespeichert!");
            }
        });
    }
    else if (instanz == "iMwSpeichern") {
        $.ajax({
            type: 'POST',
            async: true,
            url: 'php/instanzIntoDb.php',
            data: {
                id: "iMw",
                modus: "save",
                nameDB: $("#nameDB").val(),
                iMwID: $("#iMwID").val(),

                versorger: $("#versorgerIMw").val(),
                kostenstelle: $("#versorgerIMw").val(),
                messstelle: $("#mstIMw").val(),
                ableseDatum: $("#datumIMw").val(),
                vom: $("#vomIMw").val(),
                bis: $("#bisIMw").val(),
                energietraeger: $("#entIMw").val(),
                einheit: $("#einIMw").val(),
                menge: formatNumber("deform",$("#mengeIMw").val()),
                verbrauch: formatNumber("deform",$("#verbrauchIMw").val()),
                notiz: $("#notizIMw").val(),

                lblCustom1: $("#lblCustom1IMw").val(),
                Custom1: $("#custom1IMw").val(),
                lblCustom2: $("#lblCustom2IMw").val(),
                Custom2: $("#custom2IMw").val(),
                lblCustom3: $("#lblCustom3IMw").val(),
                Custom3: $("#custom3IMw").val(),
                lblCustom4: $("#lblCustom4IMw").val(),
                Custom4: $("#custom4IMw").val(),
                lblCustom5: $("#lblCustom5IMw").val(),
                Custom5: $("#custom5IMw").val(),
                lblCustom6: $("#lblCustom6IMw").val(),
                Custom6: $("#custom6IMw").val()
            },
            success: function (echo) {
                //console.log(echo);
                alert("erfolgreich gespeichert!");
            }
        });
    }
    else if (instanz == "grpSpeichern") {
      var optionen = [];
      for(i = 0;i < $("#tblOptionenGrp tbody tr").length;i++){
        optionen[i] = tblOptionenGrp.cell(i, 0).data();
      }

      var optionenString = optionen.join(",");

        $.ajax({
            type: 'POST',
            async: true,
            url: 'php/instanzIntoDb.php',
            data: {
                id: "grp",
                modus: "save",
                nameDB: $("#nameDB").val(),
                merkmID: $("#grpID").val(),

                name: $("#nameGrp").val(),
                kurz: $("#kuerzelGrp").val(),
                beschreibung: $("#beschreibungGrp").val(),
                optionen: optionenString
            },
            success: function (echo) {
                //console.log(echo);
                alert("erfolgreich gespeichert!");
            }
        });
    }
    else if (instanz == "zpSpeichern") {
        $.ajax({
            type: 'POST',
            async: true,
            url: 'php/instanzIntoDb.php',
            data: {
                id: "zp",
                modus: "save",
                nameDB: $("#nameDB").val(),

                zpID: $("#zpID").val(),
                energietraeger: $("#energietraegerZp").val(),
                messstelle: $("#mstZp").val(),
                nr: $("#zaehlpunktNrZp").val(),
                messsystem: $("#messsystemZp").val(),
                messgenauigkeit: $("#messgenauZp").val()
            },
            success: function (echo) {
                //console.log(echo);
                alert("erfolgreich gespeichert!");
            }
        });
    }
}
//Datensatz einlesen
function readInstanzen(instanz, index) {
    $(".lblNeu").css("display", "none");
    $(".lblAendern").css("display", "inline");

    if (instanz == "gipscAdmFirst" || instanz == "gipscAdmNext" || instanz == "gipscAdmPrevious" || instanz == "gipscAdmLast") {
        $.ajax({
            type: 'POST',
            async: false,
            url: 'php/readInstanzen.php',
            data: {
                id: "gipscAdm",
                nameDB: "gipscomm"
            },
            fail: function () {
                alert("failed!!");
            },
            success: function (records) {
                var insJson = $.parseJSON(records);
                console.log(insJson);
                //Anzahl Mandanten
                if(insJson.length > 0){
                  $("#gipscAdmCount").val(insJson.length);
                  $("#gipscAdmID").val(insJson[index].gipsAdm_ID);

                  $("#benutzernameGipscAdm").val(insJson[index].username);
                }
                else {
                  clearFields("gipscAdm");
                }
            }
        });
    }
    else if (instanz == "betrGrpFirst" || instanz == "betrGrpNext" || instanz == "betrGrpPrevious" || instanz == "betrGrpLast") {
        $.ajax({
            type: 'POST',
            async: false,
            url: 'php/readInstanzen.php',
            data: {
                id: "betrGrp",
                nameDB: "gipscomm"
            },
            fail: function () {
                alert("failed!!");
            },
            success: function (records) {
                var insJson = $.parseJSON(records);
                //console.log(insJson);
                //Anzahl Mandanten
                if(insJson.length > 0){
                  $("#betrGrpCount").val(insJson.length);
                  $("#betrGrpID").val(insJson[index].betrGrp_ID);

                  $("#firmaBetrGrp").val(insJson[index].firma);
                  $("#anzahlMitarbeiterBetrGrp").val(insJson[index].anzahlMitarbeiter);
                  $("#anschriftBetrGrp").val(insJson[index].anschrift);
                  $("#plzBetrGrp").val(insJson[index].plz);
                  $("#ortBetrGrp").val(insJson[index].ort);
                  $("#geschaeftsfuehrerBetrGrp").val(insJson[index].geschaeftsfuehrer);
                  $("#telefonBetrGrp").val(insJson[index].telefon);
                  $("#emailBetrGrp").val(insJson[index].eMail);
                  $("#notizBetrGrp").val(insJson[index].notiz);
                }
                else {
                  clearFields("betrGrp");
                }
            }
        });
    }
    else if (instanz == "sAdmFirst" || instanz == "sAdmNext" || instanz == "sAdmPrevious" || instanz == "sAdmLast") {
        $.ajax({
            type: 'POST',
            async: false,
            url: 'php/readInstanzen.php',
            data: {
                id: "sAdm",
                nameDB: "gipscomm",
                betrGrpID: $("#betrGrpID").val()
            },
            fail: function () {
                alert("failed!!")
            },
            success: function (records) {
                var insJson = $.parseJSON(records);
                //console.log(insJson);
                if(insJson.length > 0){
                  $("#sAdmCount").val(insJson.length);
                  $("#sAdmID").val(insJson[index].sAdm_ID);

                  $("#titelSAdm").val(insJson[index].titelSAdm);
                  $("#nameSAdm").val(insJson[index].nameSAdm);
                  $("#vornameSAdm").val(insJson[index].vornameSAdm);
                  $("#emailSAdm").val(insJson[index].emailSAdm);
                  $("#telefonSAdm").val(insJson[index].telefonSAdm);
                  $("#faxSAdm").val(insJson[index].faxSAdm);
                  $("#mobiltelefonSAdm").val(insJson[index].mobiltelefonSAdm);
                  $("#benutzernameSAdm").val(insJson[index].benutzernameSAdm);
                }
                else{
                  clearFields("sAdmHinz");
                }
            }
        });
    }
    else if (instanz == "manGrpFirst" || instanz == "manGrpNext" || instanz == "manGrpPrevious" || instanz == "manGrpLast") {
        $.ajax({
            type: 'POST',
            async: false,
            url: 'php/readInstanzen.php',
            data: {
                id: "manGrp",
                nameDB: "gipscomm",
                betrGrpID: $("#betrGrpID").val()
            },
            fail: function () {
                alert("failed!!");
            },
            success: function (records) {
              console.log(records);
                var insJson = $.parseJSON(records);
                if(insJson.length > 0){

                  mandantenInMandantenGruppenTabelleEinlesen(insJson[index].mandantenIDs);

                  $("#manGrpCount").val(insJson.length);
                  $("#manGrpID").val(insJson[index].manGrp_ID);

                  $("#nameManGrp").val(insJson[index].name);
                  $("#kurzManGrp").val(insJson[index].kurz);
                  $("#notizManGrp").val(insJson[index].notiz);
                }
                else {
                  clearFields("manGrpHinz");
                }
            }
        });
    }
    else if (instanz == "admFirst" || instanz == "admNext" || instanz == "admPrevious" || instanz == "admLast") {
      var manOderManGrp;
      var idIns;

      if($("#manOderManGrp").val() == "optMan"){
        manOderManGrp = "man_ID";
        idIns = $("#manRechteID").val();
      }
      else {
        manOderManGrp = "manGrp_ID";
        idIns = $("#manGrpID").val();
      }
        $.ajax({
            type: 'POST',
            async: false,
            url: 'php/readInstanzen.php',
            data: {
                id: "adm",
                nameDB: "gipscomm",
                ins: manOderManGrp,
                insID: idIns
            },
            fail: function () {
                alert("failed!!");
            },
            success: function (records) {
                var insJson = $.parseJSON(records);

                if(insJson.length > 0){
                  $("#admCount").val(insJson.length);
                  $("#admID").val(insJson[index].adm_ID);
                  $("#titelAdm").val(insJson[index].titel);
                  $("#nameAdm").val(insJson[index].name);
                  $("#vornameAdm").val(insJson[index].vorname);
                  $("#emailAdm").val(insJson[index].email);
                  $("#telefonAdm").val(insJson[index].telefon);
                  $("#faxAdm").val(insJson[index].fax);
                  $("#mobiltelefonAdm").val(insJson[index].mobiltelefon);
                  $("#benutzernameAdm").val(insJson[index].benutzername);
                }
                else {
                  clearFields("admHinz");
                }
            }
        });
    }
    else if (instanz == "benFirst" || instanz == "benNext" || instanz == "benPrevious" || instanz == "benLast") {
      var manOderManGrp;
      var idIns;

      if($("#manOderManGrp").val() == "optMan"){
        manOderManGrp = "man_ID";
        idIns = $("#manRechteID").val();
      }
      else {
        manOderManGrp = "manGrp_ID";
        idIns = $("#manGrpID").val();
      }
        $.ajax({
            type: 'POST',
            async: false,
            url: 'php/readInstanzen.php',
            data: {
                id: "ben",
                nameDB: "gipscomm",
                ins: manOderManGrp,
                insID: idIns
            },
            fail: function () {
                alert("failed!!")
            },
            success: function (records) {
                var insJson = $.parseJSON(records);

                if(insJson.length > 0){
                  $("#benCount").val(insJson.length);
                  $("#benID").val(insJson[index].ben_ID);
                  $("#titelBen").val(insJson[index].titel);
                  $("#nameBen").val(insJson[index].name);
                  $("#vornameBen").val(insJson[index].vorname);
                  $("#emailBen").val(insJson[index].eMail);
                  $("#telefonBen").val(insJson[index].telefon);
                  $("#faxBen").val(insJson[index].fax);
                  $("#mobiltelefonBen").val(insJson[index].mobiltelefon);
                  $("#benutzernameBen").val(insJson[index].benutzername);
                }
                else {
                  clearFields("benHinz");
                }
            }
        });
    }
    else if (instanz == "manFirst" || instanz == "manNext" || instanz == "manPrevious" || instanz == "manLast") {
        $.ajax({
            type: 'POST',
            async: false,
            url: 'php/readInstanzen.php',
            data: {
                id: "man",
                nameDB: "gipscomm",
                manID: $("#manID").val()
            },
            fail: function () {
                alert("failed!!")
            },
            success: function (records) {
                var insJson = $.parseJSON(records);
                //Mandantenformular füllen
                $("#manID").val(insJson[0].man_ID);
                $("#nameDB").val(insJson[0].dbName);
                $("#nameAllgemeinMan").val(insJson[0].nameMan);
                $("#holdingstrukturAllgemeinMan").prop('checked', insJson[0].holdingstruktur);
                $("#liegenschaftenAllgemeinMan").prop('checked', insJson[0].liegenschaften);
            }
        });
    }
    else if (instanz == "orgFirst" || instanz == "orgNext" || instanz == "orgPrevious" || instanz == "orgLast") {
        $.ajax({
            type: 'POST',
            async: false,
            url: '../php/readInstanzen.php',
            data: {
                id: "org",
                nameDB: $("#nameDB").val(),
            },
            fail: function () {
                alert("failed!!")
            },
            success: function (records) {
                var insJson = $.parseJSON(records);
                //Anzahl Organisationen
                $("#orgCount").val(insJson.length);
                //Organisation index
                if (insJson.length > 0) {
                    $("#orgID").val(insJson[index].org_ID);
                    //Organisationsformular f�llen
                    $("#nameAllgemeinOrg").val(insJson[index].nameOrg),
                        $("#gesellschaftsformAllgemeinOrg").val(insJson[index].gesellschaftsformOrg),
                        $("#firmenanschriftAllgemeinOrg").val(insJson[index].anschriftOrg),
                        $("#landAllgemeinOrg").val(insJson[index].landOrg),
                        $("#plzAllgemeinOrg").val(insJson[index].plzOrg),
                        $("#ortAllgemeinOrg").val(insJson[index].ortOrg),
                        $("#hrbnummerAllgemeinOrg").val(insJson[index].hrbNummerOrg),
                        $("#titelGeschaeftsfuehrungOrg").val(insJson[index].titelGeschaeftsfuehrungOrg),
                        $("#nameGeschaeftsfuehrungOrg").val(insJson[index].nameGeschaeftsfuehrungOrg),
                        $("#vornameGeschaeftsfuehrungOrg").val(insJson[index].vornameGeschaeftsfuehrungOrg),
                        $("#emailGeschaeftsfuehrungOrg").val(insJson[index].eMailGeschaeftsfuehrungOrg),
                        $("#telefonGeschaeftsfuehrungOrg").val(insJson[index].telefonGeschaeftsfuehrungOrg),
                        $("#faxGeschaeftsfuehrungOrg").val(insJson[index].faxGeschaeftsfuehrungOrg),
                        $("#mobiltelefonGeschaeftsfuehrungOrg").val(insJson[index].mobiltelefonGeschaeftsfuehrungOrg),
                        $("#titelEnergiemanagementOrg").val(insJson[index].titelEnergiemanagementOrg),
                        $("#nameEnergiemanagementOrg").val(insJson[index].nameEnergiemanagementOrg),
                        $("#vornameEnergiemanagementOrg").val(insJson[index].vornameEnergiemanagementOrg),
                        $("#emailEnergiemanagementOrg").val(insJson[index].eMailEnergiemanagementOrg),
                        $("#telefonEnergiemanagementOrg").val(insJson[index].telefonEnergiemanagementOrg),
                        $("#faxEnergiemanagementOrg").val(insJson[index].faxEnergiemanagementOrg),
                        $("#mobiltelefonEnergiemanagementOrg").val(insJson[index].mobiltelefonEnergiemanagementOrg)
                }
                else {
                    clearFields("orgHinz");
                }
            }
        });
    }
    else if (instanz == "liegFirst" || instanz == "liegNext" || instanz == "liegPrevious" || instanz == "liegLast") {
        $.ajax({
            type: 'POST',
            async: false,
            url: 'php/readInstanzen.php',
            data: {
                id: "lieg",
                orgID: $("#orgID").val(),
                nameDB: $("#nameDB").val(),
            },
            fail: function () {
                alert("failed!!")
            },
            success: function (records) {
                var insJson = $.parseJSON(records);
                //Anzahl Organisationen
                $("#liegCount").val(insJson.length);
                //Organisation index
                if (insJson.length > 0) {
                    $("#liegID").val(insJson[index].lieg_ID);
                    //Liegenschaftsformular füllen
                    $("#nameAllgemeinLieg").val(insJson[index].nameLieg);
                    $("#kuerzelAllgemeinLieg").val(insJson[index].kuerzelLieg);
                    $("#eigenstaendigeformAllgemeinLieg").prop("checked", insJson[index].eigenstaendigeFormLieg);
                    $("#aktivAllgemeinLieg").prop("checked", insJson[index].aktivLieg);
                    $("#gesellschaftsformAllgemeinLieg").val(insJson[index].gesellschaftsformLieg);
                    $("#anschriftAllgemeinLieg").val(insJson[index].anschriftLieg);
                    $("#landAllgemeinLieg").val(insJson[index].landLieg);
                    $("#plzAllgemeinLieg").val(insJson[index].plzLieg);
                    $("#ortAllgemeinLieg").val(insJson[index].ortLieg);
                    $("#typAllgemeinLieg").val(insJson[index].typLieg);

                    $("#hatDlAllgemeinLieg").prop("checked", insJson[index].hatDl);
                    toggleExtDl("#hatDlAllgemeinLieg");

                    $("#titelAnsprechpartnerLieg").val(insJson[index].titelAnsprechpartnerLieg);
                    $("#nameAnsprechpartnerLieg").val(insJson[index].nameAnsprechpartnerLieg);
                    $("#vornameAnsprechpartnerLieg").val(insJson[index].vornameAnsprechpartnerLieg);
                    $("#emailAnsprechpartnerLieg").val(insJson[index].eMailAnsprechpartnerLieg);
                    $("#telefonAnsprechpartnerLieg").val(insJson[index].telefonAnsprechpartnerLieg);
                    $("#faxAnsprechpartnerLieg").val(insJson[index].faxAnsprechpartnerLieg);
                    $("#mobiltelefonAnsprechpartnerLieg").val(insJson[index].mobiltelefonAnsprechpartnerLieg);
                    $("#titelEnergiebeauftragterLieg").val(insJson[index].titelEnergiebeauftragterLieg);
                    $("#nameEnergiebeauftragterLieg").val(insJson[index].nameEnergiebeauftragterLieg);
                    $("#vornameEnergiebeauftragterLieg").val(insJson[index].vornameEnergiebeauftragterLieg);
                    $("#emailEnergiebeauftragterLieg").val(insJson[index].eMailEnergiebeauftragterLieg);
                    $("#telefonEnergiebeauftragterLieg").val(insJson[index].telefonEnergiebeauftragterLieg);
                    $("#faxEnergiebeauftragterLieg").val(insJson[index].faxEnergiebeauftragterLieg);
                    $("#mobiltelefonEnergiebeauftragterLieg").val(insJson[index].mobiltelefonEnergiebeauftragterLieg);
                    $("#inputEnergietraeger1Lieg").val(insJson[index].energietraeger1);
                    $("#inputEnergietraeger2Lieg").val(insJson[index].energietraeger2);
                    $("#inputEnergietraeger3Lieg").val(insJson[index].energietraeger3);
                    $("#inputEnergietraeger4Lieg").val(insJson[index].energietraeger4);
                    $("#inputEnergietraeger5Lieg").val(insJson[index].energietraeger5);
                    $("#inputEnergietraeger6Lieg").val(insJson[index].energietraeger6);
                    $("#inputEnergietraeger7Lieg").val(insJson[index].energietraeger7);
                    $("#inputEnergietraeger8Lieg").val(insJson[index].energietraeger8);
                    $("#inputEnergietraeger9Lieg").val(insJson[index].energietraeger9);
                    $("#energieform1Lieg").val(insJson[index].energieform1);
                    $("#energieform2Lieg").val(insJson[index].energieform2);
                    $("#energieform3Lieg").val(insJson[index].energieform3);
                    $("#energieform4Lieg").val(insJson[index].energieform4);
                    $("#energieform5Lieg").val(insJson[index].energieform5);
                    $("#energieform6Lieg").val(insJson[index].energieform6);
                    $("#energieform7Lieg").val(insJson[index].energieform7);
                    $("#managementsystem1Lieg").val(insJson[index].managementsystem1);
                    $("#erstzertifizierung1Lieg").val(insJson[index].erstzertifizierung1);
                    $("#managementsystem2Lieg").val(insJson[index].managementsystem2);
                    $("#erstzertifizierung2Lieg").val(insJson[index].erstzertifizierung2);
                    $("#managementsystem3Lieg").val(insJson[index].managementsystem3);
                    $("#erstzertifizierung3Lieg").val(insJson[index].erstzertifizierung3);

                    if($("#inputEnergietraeger7Lieg").val() != ""){
                      $("#entLiegErweitert").css("display","block");
                    }
                    else {
                      $("#entLiegErweitert").css("display","none");
                    }

                    energietrInDBoxLieg();
                }
                else {
                    clearFields("liegHinz");
                }
            }
        });
        lastNav.setRecordsNavID(liegNavID);
    }
    else if (instanz == "extDlFirst" || instanz == "extDlNext" || instanz == "extDlPrevious" || instanz == "extDlLast") {
        $.ajax({
            type: 'POST',
            async: false,
            url: 'php/readInstanzen.php',
            data: {
                id: "extDl",
                liegID: $("#liegID").val(),
                nameDB: $("#nameDB").val()
            },
            fail: function () {
                alert("failed!!")
            },
            success: function (records) {
                var insJson = $.parseJSON(records);
                //Anzahl Organisationen
                $("#extDlCount").val(insJson.length);
                //Organisation index
                if (insJson.length > 0) {
                    $("#extDlID").val(insJson[index].extDl_ID);
                    //Liegenschaftsformular f�llen
                    $("#nameExtDl").val(insJson[index].nameExtDl);
                        $("#aktivExtDl").prop("checked", insJson[index].aktivExtDl);
                        $("#gesellschaftsformExtDl").val(insJson[index].gesellschaftsformExtDl);
                        $("#anschriftExtDl").val(insJson[index].anschriftExtDl);
                        $("#landExtDl").val(insJson[index].landExtDl);
                        $("#plzExtDl").val(insJson[index].plzExtDl);
                        $("#ortExtDl").val(insJson[index].ortExtDl);
                        $("#typExtDl").val(insJson[index].typExtDl);
                        $("#stdExtDl").prop("checked",insJson[index].standortdatenDritte);
                        toggleStandorteDritter("#stdExtDl");
                        $("#titelAnsprechpartnerExtDl").val(insJson[index].titelAnsprechpartnerExtDl);
                        $("#nameAnsprechpartnerExtDl").val(insJson[index].nameAnsprechpartnerExtDl);
                        $("#vornameAnsprechpartnerExtDl").val(insJson[index].vornameAnsprechpartnerExtDl);
                        $("#emailAnsprechpartnerExtDl").val(insJson[index].eMailAnsprechpartnerExtDl);
                        $("#telefonAnsprechpartnerExtDl").val(insJson[index].telefonAnsprechpartnerExtDl);
                        $("#faxAnsprechpartnerExtDl").val(insJson[index].faxAnsprechpartnerExtDl);
                        $("#mobiltelefonAnsprechpartnerExtDl").val(insJson[index].mobiltelefonAnsprechpartnerExtDl);

                        $("#energietraeger1ExtDl").val(insJson[index].energietraeger1);
                          $("#messstelle1ExtDl").val(insJson[index].messstelle1ExtDl);
                          $("#standort1ExtDl").val(insJson[index].standort1ExtDl);
                        $("#energietraeger2ExtDl").val(insJson[index].energietraeger2);
                          $("#messstelle2ExtDl").val(insJson[index].messstelle2ExtDl);
                          $("#standort2ExtDl").val(insJson[index].standort2ExtDl);
                        $("#energietraeger3ExtDl").val(insJson[index].energietraeger3);
                          $("#messstelle3ExtDl").val(insJson[index].messstelle3ExtDl);
                          $("#standort3ExtDl").val(insJson[index].standort3ExtDl);
                        $("#energietraeger4ExtDl").val(insJson[index].energietraeger4);
                          $("#messstelle4ExtDl").val(insJson[index].messstelle4ExtDl);
                          $("#standort4ExtDl").val(insJson[index].standort4ExtDl);
                        $("#energietraeger5ExtDl").val(insJson[index].energietraeger5);
                          $("#messstelle5ExtDl").val(insJson[index].messstelle5ExtDl);
                          $("#standort5ExtDl").val(insJson[index].standort5ExtDl);
                        $("#energietraeger6ExtDl").val(insJson[index].energietraeger6);
                          $("#messstelle6ExtDl").val(insJson[index].messstelle6ExtDl);
                          $("#standort6ExtDl").val(insJson[index].standort6ExtDl);

                        $("#energieRes1ExtDl").val(insJson[index].energieRes1ExtDl);
                          $("#messstelleEngRes1ExtDl").val(insJson[index].messstelleEngRes1ExtDl);
                           $("#standort1EngResExtDl").val(insJson[index].standortEngRes1ExtDl);
                        $("#energieRes2ExtDl").val(insJson[index].energieRes2ExtDl);
                          $("#messstelleEngRes2ExtDl").val(insJson[index].messstelleEngRes2ExtDl);
                           $("#standort2EngResExtDl").val(insJson[index].standortEngRes2ExtDl);
                        $("#energieRes3ExtDl").val(insJson[index].energieRes3ExtDl);
                          $("#messstelleEngRes3ExtDl").val(insJson[index].messstelleEngRes3ExtDl);
                           $("#standort3EngResExtDl").val(insJson[index].standortEngRes3ExtDl);
                        $("#energieRes4ExtDl").val(insJson[index].energieRes4ExtDl);
                          $("#messstelleEngRes4ExtDl").val(insJson[index].messstelleEngRes4ExtDl);
                           $("#standort4EngResExtDl").val(insJson[index].standortEngRes4ExtDl);
                        $("#energieRes5ExtDl").val(insJson[index].energieRes5ExtDl);
                          $("#messstelleEngRes5ExtDl").val(insJson[index].messstelleEngRes5ExtDl);
                           $("#standort5EngResExtDl").val(insJson[index].standortEngRes5ExtDl);
                        $("#energieRes6ExtDl").val(insJson[index].energieRes6ExtDl);
                          $("#messstelleEngRes6ExtDl").val(insJson[index].messstelleEngRes6ExtDl);
                           $("#standort6EngResExtDl").val(insJson[index].standortEngRes6ExtDl);
                      }
                else {
                    clearFields("extDlHinz");
                }
            }
        });
    }
    else if (instanz == "berFirst" || instanz == "berNext" || instanz == "berPrevious" || instanz == "berLast") {
        $.ajax({
            type: 'POST',
            async: false,
            url: 'php/readInstanzen.php',
            data: {
                id: "ber",
                liegID: $("#liegID").val(),
                nameDB: $("#nameDB").val(),
            },
            fail: function () {
                alert("failed!!")
            },
            success: function (records) {
                var insJson = $.parseJSON(records);
                //Anzahl Organisationen
                $("#berCount").val(insJson.length);
                //Organisation index
                if (insJson.length > 0) {
                    $("#berID").val(insJson[index].ber_ID);
                    $("#nameAllgemeinBer").val(insJson[index].nameBer);
                    $("#ber").text(insJson[index].nameBer);
                    $("#bereichAllgemeinAnl").val(insJson[index].nameBer),
                        $("#kurzbezeichnungAllgemeinBer").val(insJson[index].kurzbezeichnungBer),
                        $("#KostenstelleAllgemeinBer").val(insJson[index].kostenstelleBer),
                        $("#ortBer").val(insJson[index].ortBer),
                        $("#notizAllgemeinBer").val(insJson[index].notizBer)
                    $("#levelAuswahlAllgemeinBer").val(insJson[index].ausgewaehltesLevelBer),

                        $("#vorgelagerteBereiche1AllgemeinBer").val(insJson[index].vorgelagerterBereich1Ber),
                        $("#vorgelagerteBereiche2AllgemeinBer").val(insJson[index].vorgelagerterBereich2Ber),
                        $("#energietraeger1AllgemeinBer").val(insJson[index].energietraeger1Ber),
                        $("#energietraeger2AllgemeinBer").val(insJson[index].energietraeger2Ber),
                        $("#energietraeger3AllgemeinBer").val(insJson[index].energietraeger3Ber),
                        $("#energietraeger4AllgemeinBer").val(insJson[index].energietraeger4Ber)

                }
                else {
                    clearFields("berHinz");
                }
            }
        })
    }
    else if (instanz == "mstFirst" || instanz == "mstNext" || instanz == "mstPrevious" || instanz == "mstLast") {

        $.ajax({
            type: 'POST',
            async: false,
            url: 'php/readInstanzen.php',
            data: {
                id: "mst",
                berID: $("#berID").val(),
                nameDB: $("#nameDB").val(),
            },
            fail: function () {
                alert("failed!!")
            },
            success: function (records) {
                var insJson = $.parseJSON(records);
                //Anzahl Organisationen
                $("#mstCount").val(insJson.length);

                //Organisation index
                if (insJson.length > 0) {
                    $("#mstID").val(insJson[index].mst_ID);
                    $("#nameMst").val(insJson[index].nameMSt),
                        $("#kurzbezeichnungMst").val(insJson[index].kurzbezeichnungMst),
                        $("#kostenstelleMst").val(insJson[index].kostenstelleMst),
                        $("#aktivMst").prop("checked", insJson[index].aktivMst),
                        $("#energietraegerMst").val(insJson[index].energietraegerMst),
                        $("#ortMst").val(insJson[index].ortMst),
                        $("#messartMst").val(insJson[index].messartMst),
                        $("#vorgelagerteMst").val(insJson[index].vorgelagerteMessstelleMst),
                        $("#messmittelBerechnungslogikMst").val(insJson[index].messmittelBerechnungslogikMst),
                        $("#anlMst").val(insJson[index].anlageMst),
                        $("#notizAllgemeinMst").val(insJson[index].notizMst)
                }
                else {
                    clearFields("mstHinz");
                }
            }
        });
    }
    else if (instanz == "stdFirst" || instanz == "stdNext" || instanz == "stdPrevious" || instanz == "stdLast") {
        $.ajax({
            type: 'POST',
            async: false,
            url: 'php/readInstanzen.php',
            data: {
                id: "std",
                liegID: $("#liegID").val(),
                nameDB: $("#nameDB").val()
            },
            fail: function () {
                alert("failed!!")
            },
            success: function (records) {
                var insJson = $.parseJSON(records);
                //Anzahl Organisationen
                $("#stdCount").val(insJson.length);
                //Organisation index
                if (insJson.length > 0) {
                    $("#stdID").val(insJson[index].std_ID);
                    $("#nameAllgemeinStd").val(insJson[index].nameStd);
                    $("#kurzbezeichnungAllgemeinStd").val(insJson[index].kurzbezeichnungStd);
                    $("#flaecheAllgemeinStd").val(insJson[index].flaecheStd);
                    $("#custom1LabelStd").text(insJson[index].custom1LabelStd);
                    $("#custom1EingabeStd").val(insJson[index].custom1InputStd);
                    if ($("#custom1LabelStd").text() == "") {
                        $("#custom1Std").css("display", "none");
                    }
                    else {
                        $("#custom1Std").css("display", "block");
                    }
                    $("#custom2LabelStd").text(insJson[index].custom2LabelStd);
                    $("#custom2EingabeStd").val(insJson[index].custom2InputStd);
                    if ($("#custom2LabelStd").text() == "") {
                        $("#custom2Std").css("display", "none");
                    }
                    else {
                        $("#custom2Std").css("display", "block");
                    }
                    $("#custom3LabelStd").text(insJson[index].custom3LabelStd);
                    $("#custom3EingabeStd").val(insJson[index].custom3InputStd);
                    if ($("#custom3LabelStd").text() == "") {
                        $("#custom3Std").css("display", "none");
                    }
                    else {
                        $("#custom3Std").css("display", "block");
                    }
                    $("#custom4LabelStd").text(insJson[index].custom4LabelStd);
                    $("#custom4EingabeStd").val(insJson[index].custom4InputStd);
                    if ($("#custom4LabelStd").text() == "") {
                        $("#custom4Std").css("display", "none");
                    }
                    else {
                        $("#custom4Std").css("display", "block");
                    }
                    $("#custom5LabelStd").text(insJson[index].custom5LabelStd);
                    $("#custom5EingabeStd").val(insJson[index].custom5InputStd);
                    if ($("#custom5LabelStd").text() == "") {
                        $("#custom5Std").css("display", "none");
                    }
                    else {
                        $("#custom5Std").css("display", "block");
                    }
                    $("#custom6LabelStd").text(insJson[index].custom6LabelStd);
                    $("#custom6EingabeStd").val(insJson[index].custom6InputStd);
                    if ($("#custom6LabelStd").text() == "") {
                        $("#custom6Std").css("display", "none");
                    }
                    else {
                        $("#custom6Std").css("display", "block");
                    }
                    $("#notizAllgemeinStd").val(insJson[index].notizStd);

                }
                else {
                    clearFields("stdHinz");
                }
            }
        });
    }
    else if (instanz == "stdDrFirst" || instanz == "stdDrNext" || instanz == "stdDrPrevious" || instanz == "stdDrLast") {
        $.ajax({
            type: 'POST',
            async: false,
            url: 'php/readInstanzen.php',
            data: {
                id: "stdDr",
                liegID: $("#liegID").val(),
                nameDB: $("#nameDB").val()
            },
            fail: function () {
                alert("failed!!")
            },
            success: function (records) {
                var insJson = $.parseJSON(records);
                //Anzahl Organisationen
                $("#stdDrCount").val(insJson.length);
                //Organisation index
                if (insJson.length > 0) {
                  $("#stdDrID").val(insJson[index].stdDr_ID);
                                  $("#nameAllgemeinStdDr").val(insJson[index].nameStdDr);
                                  $("#kurzbezeichnungAllgemeinStdDr").val(insJson[index].kurzbezeichnungStdDr);
                                  $("#flaecheAllgemeinStdDr").val(insJson[index].flaecheStdDr);
                                  $("#custom1LabelStdDr").text(insJson[index].custom1LabelStdDr);
                                  $("#custom1EingabeStdDr").val(insJson[index].custom1InputStdDr);

                                  $("#custom2LabelStdDr").text(insJson[index].custom2LabelStdDr);
                                  $("#custom2EingabeStdDr").val(insJson[index].custom2InputStdDr);

                                  $("#custom3LabelStdDr").text(insJson[index].custom3LabelStdDr);
                                  $("#custom3EingabeStdDr").val(insJson[index].custom3InputStdDr);

                                  $("#custom4LabelStdDr").text(insJson[index].custom4LabelStdDr);
                                  $("#custom4EingabeStdDr").val(insJson[index].custom4InputStdDr);

                                  $("#custom5LabelStdDr").text(insJson[index].custom5LabelStdDr);
                                  $("#custom5EingabeStdDr").val(insJson[index].custom5InputStdDr);

                                  $("#custom6LabelStdDr").text(insJson[index].custom6LabelStdDr);
                                  $("#custom6EingabeStdDr").val(insJson[index].custom6InputStdDr);

                                  $("#notizAllgemeinStdDr").val(insJson[index].notizStdDr);

                              }
                              else {
                                  clearFields("stdDrHinz");
                              }
            }
        });
    }
    else if (instanz == "anlFirst" || instanz == "anlNext" || instanz == "anlPrevious" || instanz == "anlLast") {
        $.ajax({
            type: 'POST',
            async: false,
            url: 'php/readInstanzen.php',
            data: {
                id: "anl",
                nameDB: $("#nameDB").val(),
                liegID: $("#liegID").val()
            },
            fail: function () {
                alert("failed!!")
            },
            success: function (records) {

                var insJson = $.parseJSON(records);
                //Anzahl Anlagen
                $("#anlCount").val(insJson.length);

                //Anlage index
                if (insJson.length > 0) {
                    $("#anlID").val(insJson[index].anl_ID);
                    $("#idAllgemeinAnl").val(insJson[index].anl_ID);
                    $("#bereichAllgemeinAnl").val(insJson[index].nameBer);
                    $("#berID").val(insJson[index].ber_ID);
                    $("#bildAllgemeinAnl").prop("src",insJson[index].bildAnl);
                    $("#anlagennummerAllgemeinAnl").val(insJson[index].nummerAnl);
                    $("#bezeichnungAllgemeinAnl").val(insJson[index].bezeichnungAnl);
                    $(".anlageAnl").text(insJson[index].bezeichnungAnl);
                    $("#aktivAllgemeinAnl").prop("checked", insJson[index].aktivAnl);
                    $("#typAllgemeinAnl").val(insJson[index].typAnl);
                    $("#serienNrAllgemeinAnl").val(insJson[index].serienNrAnl),
                    $("#standortAllgemeinAnl").val(insJson[index].standortAnl);
                    $("#baujahrAnl").val(insJson[index].baujahrAnl);
                    $("#datumAnschaffungAllgemeinAnl").val(insJson[index].datumAnschaffungAnl);
                    $("#betriebsstundenAllgemeinAnl").val(insJson[index].jahresbetriebsstundenAnl);
                    $("#notizAllgemeinAnl").val(insJson[index].notizAnl);
                    $("#produktAllgemeinAnl").val(insJson[index].produktAnl);
                    $("#produktionsmenge1AllgemeinAnl").val(insJson[index].produktionsmengeAnl);
                    $("#einheitProduktionsmenge1AllgemeinAnl").val(insJson[index].produktionsmengeEinheitAnl);
                    $("#produktnummer1AllgemeinAnl").val(insJson[index].produktnummerAnl);
                    $("#mehrProdukteAllgemeinAnl").prop("checked", insJson[index].mehrProdukteAnl);

                    $("#zugeordneterVerbraucher1AllgemeinAnl").val(insJson[index].zugeordneterVerbraucher1);
                    $("#zugeordneterVerbraucher2AllgemeinAnl").val(insJson[index].zugeordneterVerbraucher2);
                    $("#zugeordneterVerbraucher3AllgemeinAnl").val(insJson[index].zugeordneterVerbraucher3);
                    $("#zugeordneterVerbraucher4AllgemeinAnl").val(insJson[index].zugeordneterVerbraucher4);
                    $("#zugeordneterVerbraucher5AllgemeinAnl").val(insJson[index].zugeordneterVerbraucher5);
                    $("#zugeordneterVerbraucher6AllgemeinAnl").val(insJson[index].zugeordneterVerbraucher6);

                    $("#energietraeger1AllgemeinAnl").val(insJson[index].energietraeger1Anl);
                    $("#energieform1AllgemeinAnl").val(insJson[index].energieform1Anl);
                    $("#einheit1Anl").val(insJson[index].einheitEnergie1Anl);
                    $("#anschlussleistung1Anl").val(insJson[index].anschlussleistung1Anl);
                    $("#mittlereAuslastungProzent1Anl").val(insJson[index].mittlereAuslastungProzent1Anl);
                    $("#mittlereAuslastungKw1Anl").val(insJson[index].mittlereAuslastungKw1Anl);
                    $("#betriebstemperatur1Anl").val(insJson[index].betriebstemperatur1Anl);
                    $("#mst1Anl").val(insJson[index].messstelle1Anl);
                    $("#ber1Anl").val(insJson[index].versBereich1Anl);
                    $("#abwaerme1Anl").val(insJson[index].abwaerme1Anl);
                    $("#nutzbarkeitAbwaerme1Anl").val(insJson[index].abwaermeNutzbarkeit1Anl);
                    $("#bewertungNutzbarkeitAbwaerme1Anl").val(insJson[index].bewertungNutzbarkeitAbwaerme1Anl);

                    $("#energietraeger2AllgemeinAnl").val(insJson[index].energietraeger2Anl);
                    $("#energieform2AllgemeinAnl").val(insJson[index].energieform2Anl);
                    $("#einheit2Anl").val(insJson[index].einheitEnergie2Anl);
                    $("#anschlussleistung2Anl").val(insJson[index].anschlussleistung2Anl);
                    $("#mittlereAuslastungProzent2Anl").val(insJson[index].mittlereAuslastungProzent2Anl);
                    $("#mittlereAuslastungKw2Anl").val(insJson[index].mittlereAuslastungKw2Anl);
                    $("#betriebstemperatur2Anl").val(insJson[index].betriebstemperatur2Anl);
                    $("#mst2Anl").val(insJson[index].messstelle2Anl);
                    $("#ber2Anl").val(insJson[index].versBereich2Anl);
                    $("#abwaerme2Anl").val(insJson[index].abwaerme2Anl);
                    $("#nutzbarkeitAbwaerme2Anl").val(insJson[index].abwaermeNutzbarkeit2Anl);
                    $("#bewertungNutzbarkeitAbwaerme2Anl").val(insJson[index].bewertungNutzbarkeitAbwaerme2Anl);

                    $("#energietraeger3AllgemeinAnl").val(insJson[index].energietraeger3Anl);
                    $("#energieform3AllgemeinAnl").val(insJson[index].energieform3Anl);
                    $("#einheit3Anl").val(insJson[index].einheitEnergie3Anl);
                    $("#anschlussleistung3Anl").val(insJson[index].anschlussleistung3Anl);
                    $("#mittlereAuslastungProzent3Anl").val(insJson[index].mittlereAuslastungProzent3Anl);
                    $("#mittlereAuslastungKw3Anl").val(insJson[index].mittlereAuslastungKw3Anl);
                    $("#betriebstemperatur3Anl").val(insJson[index].betriebstemperatur3Anl);
                    $("#mst3Anl").val(insJson[index].messstelle3Anl);
                    $("#ber3Anl").val(insJson[index].versBereich3Anl);
                    $("#abwaerme3Anl").val(insJson[index].abwaerme3Anl);
                    $("#nutzbarkeitAbwaerme3Anl").val(insJson[index].abwaermeNutzbarkeit3Anl);
                    $("#bewertungNutzbarkeitAbwaerme3Anl").val(insJson[index].bewertungNutzbarkeitAbwaerme3Anl);

                    $("#energietraeger4AllgemeinAnl").val(insJson[index].energietraeger4Anl);
                    $("#energieform4AllgemeinAnl").val(insJson[index].energieform4Anl);
                    $("#einheit4Anl").val(insJson[index].einheitEnergie4Anl);
                    $("#anschlussleistung4Anl").val(insJson[index].anschlussleistung4Anl);
                    $("#mittlereAuslastungProzent4Anl").val(insJson[index].mittlereAuslastungProzent4Anl);
                    $("#mittlereAuslastungKw4Anl").val(insJson[index].mittlereAuslastungKw4Anl);
                    $("#betriebstemperatur4Anl").val(insJson[index].betriebstemperatur4Anl);
                    $("#mst4Anl").val(insJson[index].messstelle4Anl);
                    $("#ber4Anl").val(insJson[index].versBereich4Anl);
                    $("#abwaerme4Anl").val(insJson[index].abwaerme4Anl);
                    $("#nutzbarkeitAbwaerme4Anl").val(insJson[index].abwaermeNutzbarkeit4Anl);
                    $("#bewertungNutzbarkeitAbwaerme4Anl").val(insJson[index].bewertungNutzbarkeitAbwaerme4Anl);
                    $("#custom1Anl").val(insJson[index].custom1Anl);
                    $("#custom2Anl").val(insJson[index].custom2Anl);
                    $("#custom3Anl").val(insJson[index].custom3Anl);
                    $("#custom4Anl").val(insJson[index].custom4Anl);
                    $("#custom5Anl").val(insJson[index].custom5Anl);
                    $("#custom6Anl").val(insJson[index].custom6Anl);
                }
                else {
                    clearFields("anlHinz");
                    console.log($("#anlID").val() + " " + $("#verwaltung").val());
                    dokumentenListeErstellen();
                }
            }
        });
        changeTracker.setRecordsNavID(anlNavID);
        anlagenHistorieInTabelleEinlesen();
    }
    else if (instanz == "msmFirst" || instanz == "msmNext" || instanz == "msmPrevious" || instanz == "msmLast") {
        $.ajax({
            type: 'POST',
            async: false,
            url: 'php/readInstanzen.php',
            data: {
                id: "msm",
                nameDB: $("#nameDB").val(),
                liegID: $("#liegID").val()
            },
            fail: function () {
                alert("failed!!")
            },
            success: function (records) {
                var insJson = $.parseJSON(records);
                //Anzahl Messmittel
                $("#msmCount").val(insJson.length);
                //Messmittel index
                if (insJson.length > 0) {
                    $("#msmID").val(insJson[index].msm_ID);
                    //Messmittelformular f�llen
                    $("#bildAllgemeinMsm").prop("src",insJson[index].bildMsm);
                    $("#messmittelNrAllgemeinMsm").val(insJson[index].nrMsm);
                    $("#bezeichnungAllgemeinMsm").val(insJson[index].bezeichnungMsm);
                    $("#messstelleAllgemeinMsm").val(insJson[index].messstelleMsm);
                    $("#anlMsm").val(insJson[index].anlageMsm);
                    $("#typAllgemeinMsm").val(insJson[index].typMsm);
                    $("#typNrAllgemeinMsm").val(insJson[index].typNrMsm);
                    $("#installationsdatumAllgemeinMsm").val(insJson[index].installationsdatumMsm);
                    $("#entMsm").val(insJson[index].energietraegerMsm);
                    $("#einheitAllgemeinMsm").val(insJson[index].einheitMsm);
                    $("#multiboxAllgemeinMsm").prop("checked", insJson[index].multiboxMsm);
                    $("#unitAllgemeinMsm").val(insJson[index].unitMsm);
                    $("#unitTypAllgemeinMsm").val(insJson[index].unitTypMsm);
                    $("#anzahlKanaeleAllgemeinMsm").val(insJson[index].anzahlKanaeleMsm);
                    $("#messungsformAllgemeinMsm").val(insJson[index].messungsformMsm);
                    $("#kanal1AllgemeinMsm").val(insJson[index].kanal1Msm);
                    $("#kanal2AllgemeinMsm").val(insJson[index].kanal2Msm);
                    $("#kanal3AllgemeinMsm").val(insJson[index].kanal3Msm);
                    $("#notizAllgemeinMsm").val(insJson[index].notizAllgemeinMsm);
                    $("#beauftragterPruefinformationenMsm").val(insJson[index].nameBeauftragterMsm);
                    $("#beauftragterEmailPruefinformationenMsm").val(insJson[index].emailBeauftragterMsm);
                    $("#pruefzyklusPruefinformationenMsm").val(insJson[index].pruefzyklusMsm);
                    $("#letztePruefungPruefinformationenMsm").val(insJson[index].letztePruefungMsm);
                    $("#naechstePruefungPruefinformationenMsm").val(insJson[index].naechstePruefungMsm);
                    $("#notiz2AllgemeinMsm").val(insJson[index].notizPruefungsinformationenMsm);
                    $("#messmethodeInformationenConfig").val(insJson[index].messmethodeConfig);
                    $("#messzyklusInformationenConfig").val(insJson[index].messzyklusConfig);
                    $("#messtoleranzInformationenConfig").val(formatNumber("form",insJson[index].messtoleranzConfig));
                    $("#notiz1InformationenConfig").val(insJson[index].notizAllgemeinConfig);
                    $("#wandlungsfaktorTechnischeDetailsConfig").val(formatNumber("form",insJson[index].wandlungsfaktorMsm));
                    $("#geraetetypTechnischeDetailsConfig").val(insJson[index].geraeteTypMsm);
                    $("#ipTechnischeDetailsConfig").val(insJson[index].ipAdresseConfig);
                    $("#subnetMaskTechnischeDetailsConfig").val(insJson[index].subnetMaskConfig);
                    $("#gatewayTechnischeDetailsConfig").val(insJson[index].gatewayConfig);
                    $("#cgiPortTechnischeDetailsConfig").val(insJson[index].cgiPortConfig);
                    $("#modbusPortTechnischeDetailsConfig").val(insJson[index].modbusPortConfig);
                    $("#ftpPortTechnischeDetailsConfig").val(insJson[index].ftpPortConfig);
                    $("#notiz2InformationenConfig").val(insJson[index].notizTechnischeDetailsConfig);
                }
                else {
                    clearFields("msmHinz");
                    console.log($("#msmID").val() + " " + $("#verwaltung").val());
                    dokumentenListeErstellen();
                }
            }
        })
    }
    else if (instanz == "entFirst" || instanz == "entNext" || instanz == "entPrevious" || instanz == "entLast") {
        $.ajax({
            type: 'POST',
            async: true,
            url: 'php/readInstanzen.php',
            data: {
                id: "ent",
                nameDB: entDB,
                liegID: $("#liegID").val()
            },
            fail: function () {
                alert("failed!!")
            },
            success: function (records) {
                var insJson = $.parseJSON(records);

                console.log(insJson);
                //Anzahl Energietr�ger
                $("#entCount").val(insJson.length);
                //Energietr�ger index
                if (insJson.length > 0) {
                    $("#entID").val(insJson[index].ent_ID);
                    $("#nameEnt").val(insJson[index].nameEnt);
                    $("#kuerzelEnt").val(insJson[index].kuerzelEnt);
                    $("#notizEnt").val(insJson[index].notizEnt);
                    $("#allgemEntEnt").val(insJson[index].allgemeinerEnt);

                    $.ajax({
                        type: 'POST',
                        async: true,
                        url: 'php/readInstanzen.php',
                        data: {
                            id: "vers",
                            nameDB: entDB,
                            entID: $("#entID").val()
                        },
                        fail: function () {
                            alert("failed!!")
                        },
                        success: function (data) {
                            var insVersJson = $.parseJSON(data);

                            console.log(insVersJson);

                            var nRecords = insVersJson.length;
                            if (nRecords > 0) {
                                $("#versID").val(insVersJson[nRecords - 1].vers_ID);
                                $("#versorgerEvuEnt").val(insVersJson[nRecords - 1].versorgerEvu);
                                $("#versorgerUenbEnt").val(insVersJson[nRecords - 1].versorgerUenb);
                                $("#versorgerMsbEnt").val(insVersJson[nRecords - 1].versorgerMsb);
                                $("#einheit1Ent").val(insVersJson[nRecords - 1].einheit1Ent);
                                $("#einheit2Ent").val(insVersJson[nRecords - 1].einheit2Ent);
                                $("#einheit3Ent").val(insVersJson[nRecords - 1].einheit3Ent);
                                $("#entEinh1FaktorKwh").val(insVersJson[nRecords - 1].entEinh1FaktorKwh);
                                $("#entEinh2FaktorKwh").val(insVersJson[nRecords - 1].entEinh2FaktorKwh);
                                $("#entEinh3FaktorKwh").val(insVersJson[nRecords - 1].entEinh3FaktorKwh);
                                $("#entEinh1FaktorCO2").val(insVersJson[nRecords - 1].entEinh1FaktorCO2);
                                $("#entEinh2FaktorCO2").val(insVersJson[nRecords - 1].entEinh2FaktorCO2);
                                $("#entEinh3FaktorCO2").val(insVersJson[nRecords - 1].entEinh3FaktorCO2);
                                $("#lblEntEinh1FaktorX1").text(insVersJson[nRecords - 1].lblEntEinh1FaktorX1);
                                $("#lblEntEinh2FaktorX1").text(insVersJson[nRecords - 1].lblEntEinh2FaktorX1);
                                $("#lblEntEinh3FaktorX1").text(insVersJson[nRecords - 1].lblEntEinh3FaktorX1);
                                $("#entEinh1FaktorX1").val(insVersJson[nRecords - 1].entEinh1FaktorX1);
                                $("#entEinh2FaktorX1").val(insVersJson[nRecords - 1].entEinh2FaktorX1);
                                $("#entEinh3FaktorX1").val(insVersJson[nRecords - 1].entEinh3FaktorX1);
                                $("#lblEntEinh1FaktorX2").text(insVersJson[nRecords - 1].lblEntEinh1FaktorX2);
                                $("#lblEntEinh2FaktorX2").text(insVersJson[nRecords - 1].lblEntEinh2FaktorX2);
                                $("#lblEntEinh3FaktorX2").text(insVersJson[nRecords - 1].lblEntEinh3FaktorX2);
                                $("#entEinh1FaktorX2").val(insVersJson[nRecords - 1].entEinh1FaktorX2);
                                $("#entEinh2FaktorX2").val(insVersJson[nRecords - 1].entEinh2FaktorX2);
                                $("#entEinh3FaktorX2").val(insVersJson[nRecords - 1].entEinh3FaktorX2);
                                $("#lblEntEinh1FaktorX3").text(insVersJson[nRecords - 1].lblEntEinh1FaktorX3);
                                $("#lblEntEinh2FaktorX3").text(insVersJson[nRecords - 1].lblEntEinh2FaktorX3);
                                $("#lblEntEinh3FaktorX3").text(insVersJson[nRecords - 1].lblEntEinh3FaktorX3);
                                $("#entEinh1FaktorX3").val(insVersJson[nRecords - 1].entEinh1FaktorX3);
                                $("#entEinh2FaktorX3").val(insVersJson[nRecords - 1].entEinh2FaktorX3);
                                $("#entEinh3FaktorX3").val(insVersJson[nRecords - 1].entEinh3FaktorX3);
                                $("#gueltigVomEnt").val(insVersJson[nRecords - 1].gueltigVomEnt);
                                $("#gueltigBisEnt").val(insVersJson[nRecords - 1].gueltigBisEnt);

                                var table = tblVersorgerHistorie;

                                table.clear();

                                for(var i = 0;i < nRecords - 1;i++){
                                  table.row.add([
                                    table.rows().count(),
                                    insVersJson[i].versorgerEvu,
                                    insVersJson[i].versorgerUenb,
                                    insVersJson[i].versorgerMsb,
                                    insVersJson[i].gueltigVomEnt + " - " + insVersJson[i].gueltigBisEnt

                                  ]);
                                }
                                table.draw();
                            }
                            else {
                                //nothing
                            }
                        }
                    });
                }
                else {
                    clearFields("entHinz");
                }
            }
        });
    }
    else if (instanz == "enfFirst" || instanz == "enfNext" || instanz == "enfPrevious" || instanz == "enfLast") {
        $.ajax({
            type: 'POST',
            async: true,
            url: 'php/readInstanzen.php',
            data: {
                id: "enf",
                nameDB: entDB,
                liegID: $("#liegID").val()
            },
            fail: function () {
                alert("failed!!")
            },
            success: function (records) {
                var insJson = $.parseJSON(records);
                //Anzahl Energietr�ger
                $("#enfCount").val(insJson.length);
                //Energietr�ger index
                if (insJson.length > 0) {
                    $("#enfID").val(insJson[index].enf_ID);
                    $("#nameEnf").val(insJson[index].nameEnf);
                    $("#kuerzelEnf").val(insJson[index].kuerzelEnf);
                    $("#notizEnf").val(insJson[index].notizEnf);
                    $("#aktivEnf").prop("checked", insJson[index].aktivEnf);
                    $("#einheit1Enf").val(insJson[index].einheit1Enf);
                    $("#einheit2Enf").val(insJson[index].einheit2Enf);
                    $("#einheit3Enf").val(insJson[index].einheit3Enf);
                    $("#enfEinh1FaktorKwh").val(insJson[index].enfEinh1FaktorKwh);
                    $("#enfEinh2FaktorKwh").val(insJson[index].enfEinh2FaktorKwh);
                    $("#enfEinh3FaktorKwh").val(insJson[index].enfEinh3FaktorKwh);
                    $("#enfEinh1FaktorCO2").val(insJson[index].enfEinh1FaktorCO2);
                    $("#enfEinh2FaktorCO2").val(insJson[index].enfEinh2FaktorCO2);
                    $("#enfEinh3FaktorCO2").val(insJson[index].enfEinh3FaktorCO2);
                    $("#lblEnfEinh1FaktorX1").text(insJson[index].lblEnfEinh1FaktorX1);
                    $("#lblEnfEinh2FaktorX1").text(insJson[index].lblEnfEinh2FaktorX1);
                    $("#lblEnfEinh3FaktorX1").text(insJson[index].lblEnfEinh3FaktorX1);
                    $("#enfEinh1FaktorX1").val(insJson[index].enfEinh1FaktorX1);
                    $("#enfEinh2FaktorX1").val(insJson[index].enfEinh2FaktorX1);
                    $("#enfEinh3FaktorX1").val(insJson[index].enfEinh3FaktorX1);
                    $("#lblEnfEinh1FaktorX2").text(insJson[index].lblEnfEinh1FaktorX2);
                    $("#lblEnfEinh2FaktorX2").text(insJson[index].lblEnfEinh2FaktorX2);
                    $("#lblEnfEinh3FaktorX2").text(insJson[index].lblEnfEinh3FaktorX2);
                    $("#enfEinh1FaktorX2").val(insJson[index].enfEinh1FaktorX2);
                    $("#enfEinh2FaktorX2").val(insJson[index].enfEinh2FaktorX2);
                    $("#enfEinh3FaktorX2").val(insJson[index].enfEinh3FaktorX2);
                    $("#lblEnfEinh1FaktorX3").text(insJson[index].lblEnfEinh1FaktorX3);
                    $("#lblEnfEinh2FaktorX3").text(insJson[index].lblEnfEinh2FaktorX3);
                    $("#lblEnfEinh3FaktorX3").text(insJson[index].lblEnfEinh3FaktorX3);
                    $("#enfEinh1FaktorX3").val(insJson[index].enfEinh1FaktorX3);
                    $("#enfEinh2FaktorX3").val(insJson[index].enfEinh2FaktorX3);
                    $("#enfEinh3FaktorX3").val(insJson[index].enfEinh3FaktorX3);
                    $("#gueltigVomEnf").val(insJson[index].gueltigVomEnf);
                    $("#gueltigBisEnf").val(insJson[index].gueltigBisEnf);
                }
                else {
                    clearFields("enfHinz");
                }
            }
        })
    }
    else if (instanz == "eRngFirst" || instanz == "eRngNext" || instanz == "eRngPrevious" || instanz == "eRngLast") {
        $.ajax({
            type: 'POST',
            async: true,
            url: 'php/readInstanzen.php',
            data: {
                id: "eRng",
                nameDB: $("#nameDB").val(),
                liegID: $("#liegID").val(),
                modus: "new",
            },
            fail: function () {
                alert("failed!!")
            },
            success: function (records) {
                var insJson = $.parseJSON(records);
                //Anzahl Energieträger
                if (insJson.length > 0) {
                    $("#eRngID").val(insJson[index].eRng_ID);

                $("#eRngCount").val(insJson.length);
                $("#eRngID").val(insJson[index].eRng_ID);
                $("#entERng").val(insJson[index].entERng);
                versorgerUndEinheitBefuellen();
                $("#modusERng").val(insJson[index].rechnungsmodusERng);
                $("#nrERng").val(insJson[index].nrERng);
                $("#zpNrERng").val(insJson[index].zpNrERng);
                $("#mstERng").val(insJson[index].mstERng);
                $("#datumERng").val(insJson[index].datumERng);
                $("#vomERng").val(insJson[index].vomERng);
                $("#bisERng").val(insJson[index].bisERng);
                $("#einERng").val(insJson[index].einERng);
                $("#mengeERng").val(insJson[index].mengeERng);
                $("#verbrauchERng").val(insJson[index].verbrauchERng);
                $("#kostenERng").val(insJson[index].kostenERng);
                $("#kostenstelleERng").val(insJson[index].kostenstelleERng);
                $("#versorgerERng").val(insJson[index].versorgerERng);
                if (insJson[index].tagstromVerbrERng == 0 && insJson[index].tagstromKostERng == 0
                    && insJson[index].nachtstromVerbrERng == 0 && insJson[index].nachtstromKostERng == 0) {
                    $("#htNt").css("display", "none");
                    $(".htNtInp").val("");
                    $(this).text("HT/NT aktivieren");
                }
                else {
                    $("#htNt").css("display", "block");
                    $(this).text("HT/NT deaktivieren");
                }

                $("#tagstromVerbrERng").val(formatNumber("form",insJson[index].tagstromVerbrERng));
                $("#tagstromKostERng").val(formatNumber("form",insJson[index].tagstromKostERng));
                $("#nachtstromVerbrERng").val(formatNumber("form",insJson[index].nachtstromVerbrERng));
                $("#nachtstromKostERng").val(formatNumber("form",insJson[index].nachtstromKostERng));
                $("#blindstromERng").val(formatNumber("form",insJson[index].blindstromERng));
                $("#lastspitzeERng").val(formatNumber("form",insJson[index].lastspitzeERng));
                $("#leistungspreisERng").val(formatNumber("form",insJson[index].leistungspreisERng));
                $("#abpWirkERng").val(formatNumber("form",insJson[index].abpWirkERng));
                $("#strSteuERng").val(formatNumber("form",insJson[index].strSteuERng));
                $("#eegERng").val(formatNumber("form",insJson[index].eegERng));
                $("#eegUntERng").val(formatNumber("form",insJson[index].eegUntERng)),
                $("#eegUebERng").val(formatNumber("form",insJson[index].eegUebERng)),
                $("#abpNetzERng").val(formatNumber("form",insJson[index].abpNetzERng));
                $("#konzERng").val(formatNumber("form",insJson[index].konzERng));
                $("#kwkUntERng").val(formatNumber("form",insJson[index].kwkUntERng));
                $("#kwkObERng").val(formatNumber("form",insJson[index].kwkObERng));
                $("#nevUntERng").val(formatNumber("form",insJson[index].nevUntERng));
                $("#nevObERng").val(formatNumber("form",insJson[index].nevObERng));
                $("#offUntERng").val(formatNumber("form",insJson[index].offUntERng));
                $("#offObERng").val(formatNumber("form",insJson[index].offObERng));

                $("#lblCustom1ERng").text(insJson[index].lblCustom1ERng);
                $("#Custom1ERng").val(formatNumber("form",insJson[index].Custom1ERng));
                $("#lblCustom2ERng").text(insJson[index].lblCustom2ERng);
                $("#Custom2ERng").val(formatNumber("form",insJson[index].Custom2ERng));
                $("#lblCustom3ERng").text(insJson[index].lblCustom3ERng);
                $("#Custom3ERng").val(formatNumber("form",insJson[index].Custom3ERng));
                $("#lblCustom4ERng").text(insJson[index].lblCustom4ERng);
                $("#Custom4ERng").val(formatNumber("form",insJson[index].Custom4ERng));
                $("#lblCustom5ERng").text(insJson[index].lblCustom5ERng);
                $("#Custom5ERng").val(formatNumber("form",insJson[index].Custom5ERng));
                $("#lblCustom6ERng").text(insJson[index].lblCustom6ERng);
                $("#Custom6ERng").val(formatNumber("form",insJson[index].Custom6ERng));
                verbrauchBerechnen("mengeERng",$("#entERng").val(), $("#einERng").val(),$("#mengeERng").val());
                }
                else {
                    clearFields("eRngHinz");
                }
                $("#modusERng").trigger("change");
                $("#mstERng").trigger("change");
                $("#mengeERng").trigger("change");
                $("#kostenERng").trigger("change");

                console.log($("#eRngID").val() + " " + $("#verwaltung").val());
                dokumentenListeErstellen();
            }
        });
    }
    else if (instanz == "iMwFirst" || instanz == "iMwNext" || instanz == "iMwPrevious" || instanz == "iMwLast") {
        $.ajax({
            type: 'POST',
            async: true,
            url: 'php/readInstanzen.php',
            data: {
                id: "iMw",
                nameDB: $("#nameDB").val(),
                liegID: $("#liegID").val()
            },
            fail: function () {
                alert("failed!!")
            },
            success: function (records) {
                var insJson = $.parseJSON(records);
                //Anzahl Messwerte
                $("#iMwCount").val(insJson.length);

                //console.log(insJson);
                //alert(index + "  " + insJson[index].iMw_ID);

                if (insJson.length > 0) {
                    $("#iMwID").val(insJson[index].iMw_ID);

                    $("#versorgerIMw").val(insJson[index].versorgerIMw);
                    $("#kostenstelleIMw").val(insJson[index].kostenstelleIMw);
                    $("#mstIMw").val(insJson[index].mstIMw);
                    $("#datumIMw").val(insJson[index].datumIMw);
                    $("#vomIMw").val(insJson[index].vomIMw);
                    $("#bisIMw").val(insJson[index].bisIMw);
                    $("#entIMw").val(insJson[index].entIMw);
                    $("#einIMw").val(insJson[index].einIMw);
                    $("#mengeIMw").val(formatNumber("form",insJson[index].mengeIMw));
                    $("#verbrauchIMw").val(formatNumber("form",insJson[index].verbrauchIMw));
                    $("#notizIMw").val(insJson[index].notizIMw);

                    $("#lblCustom1IMw").val(insJson[index].lblCustom1IMw);
                    $("#custom1IMw").val(insJson[index].custom1IMw);
                    $("#lblCustom2IMw").val(insJson[index].lblCustom2IMw);
                    $("#custom2IMw").val(insJson[index].custom2IMw);
                    $("#lblCustom3IMw").val(insJson[index].lblCustom3IMw);
                    $("#custom3IMw").val(insJson[index].custom3IMw);
                    $("#lblCustom4IMw").val(insJson[index].lblCustom4IMw);
                    $("#custom4IMw").val(insJson[index].custom4IMw);
                    $("#lblCustom5IMw").val(insJson[index].lblCustom5IMw);
                    $("#custom5IMw").val(insJson[index].custom5IMw);
                    $("#lblCustom6IMw").val(insJson[index].lblCustom6IMw);
                    $("#custom6IMw").val(insJson[index].custom6IMw);

                }
                else {
                    clearFields("iMwHinz");
                }
            }
        });
    }
    else if (instanz == "grpFirst" || instanz == "grpNext" || instanz == "grpPrevious" || instanz == "grpLast") {
        $.ajax({
            type: 'POST',
            async: true,
            url: 'php/readInstanzen.php',
            data: {
                id: "grp",
                nameDB: $("#nameDB").val(),
            },
            fail: function () {
                alert("failed!!")
            },
            success: function (records) {
                var insJson = $.parseJSON(records);
                //Anzahl Energietr�ger
                $("#grpCount").val(insJson.length);

                //Energieträger index
                if (insJson.length > 0) {
                    $("#grpID").val(insJson[index].merkm_ID);
                    $("#nameGrp").val(insJson[index].name);
                    $("#kuerzelGrp").val(insJson[index].kurz);
                    $("#beschreibungGrp").val(insJson[index].beschreibung);

                    var optionenString = insJson[index].optionen;
                    var optionen = optionenString.split(",");

                    tblOptionenGrp.clear().draw();

                    for(i = 0;i < optionen.length;i++){
                      tblOptionenGrp.row.add([optionen[i]]).draw();
                    }
                }
                else {
                    clearFields("grpHinz");
                }
            }
        });
    }
    else if (instanz == "zpFirst" || instanz == "zpNext" || instanz == "zpPrevious" || instanz == "zpLast") {
        $.ajax({
            type: 'POST',
            async: true,
            url: 'php/readInstanzen.php',
            data: {
                id: "zp",
                nameDB: $("#nameDB").val(),
                liegID: $("#liegID").val()
            },
            fail: function () {
                alert("failed!!")
            },
            success: function (records) {
                var insJson = $.parseJSON(records);
                //Anzahl Energietr�ger
                $("#zpCount").val(insJson.length);

                //Energietr�ger index
                if (insJson.length > 0) {
                    $("#zpID").val(insJson[index].zp_ID);
                    $("#zaehlpunktNrZp").val(insJson[index].zaehlpunktNr);
                    $("#energietraegerZp").val(insJson[index].energietraegerZp);
                    $("#mstZp").val(insJson[index].mstZp);
                    $("#messsystemZp").val(insJson[index].messsystemZp);
                    $("#messgenauZp").val(insJson[index].messgenauigkeitZp);
                }
                else {
                    clearFields("zpHinz");
                }
            }
        });
    }
}
//Datensatz als gelöscht markieren
function fensterLoeschenmeldung(instanz) {
    //Fensterinhalt sichtbar machen
    $("#loeschenMeldungsfenster").css("display", "block");
    //Fenster einblenden
    $("#loeschenMeldungsfenster").dialog({
        height: 200,
        width: 300,
        resize: "auto",
        show: {
            effect: "fade",
            duration: 500
        },
        hide: {
            effect: "fade",
            duration: 500
        },
        open: function () {

            //Event Listener entfernen
            $("#loeschenOk").off("click");
            $("#loeschenAbbrechen").off("click");

            //Event Listener an Buttons binden
            $("#loeschenOk").on("click", function () {
                datensatzLoeschen(instanz);
                $("#loeschenMeldungsfenster").dialog("close");
            });
            $("#loeschenAbbrechen").on("click", function () {
                $("#loeschenMeldungsfenster").dialog("close");
            });

        }
    });
}
function datensatzLoeschen(instanz) {
    if (instanz == "berLoeschen") {
        $.ajax({
            type: 'POST',
            async: true,
            url: 'php/setLoeschen.php',
            data: {
                ins:"ber",
                nameDB: $("#nameDB").val(),
                berID: $("#berID").val()
            },
            success: function (echo) {
                //console.log(echo);
                //alert("erfolgreich gel�scht!");
                readInstanzen("berFirst", 0);
            }
        });
        berNavID = 0;
    }
    else if (instanz == "mstLoeschen") {
        $.ajax({
            type: 'POST',
            async: true,
            url: 'php/setLoeschen.php',
            data: {
                ins:"mst",
                nameDB: $("#nameDB").val(),
                mstID: $("#mstID").val()
            },
            success: function (echo) {
                //console.log(echo);
                //alert("erfolgreich gel�scht!");
                readInstanzen("mstFirst", 0);
            }
        });
        mstNavID = 0;
    }
    else if (instanz == "anlLoeschen") {
        $.ajax({
            type: 'POST',
            async: true,
            url: 'php/setLoeschen.php',
            data: {
                ins: "anl",
                nameDB: $("#nameDB").val(),
                anlID: $("#anlID").val()
            },
            success: function (echo) {
                //console.log(echo);
                //alert("erfolgreich gel�scht!");
                readInstanzen("anlFirst", 0);
            }
        });
        anlNavID = 0;
    }
}

var entOderEnf;
function checkboxenDerEntEnfEinlesen(element) {
    //alert("Checkboxen Funktion!");
    entOderEnf = $(element).prop("value");
    $("#frmEntEnfManZuordnung .controlDiv").remove();
    $.ajax({
        type: 'POST',
        async: true,
        url: 'php/checkboxenDerEntEnfEinlesen.php',
        data: {
            id: $(element).prop("value"),
            nameDB: $("#nameDB").val()
        },
        success: function (records) {
            //alert("Checkboxen Abfrage erfolgreich!");

            var insJson = $.parseJSON(records);
            var status;
            for (i = 0; i < insJson.length; i++) {
                if ($(element).prop("value") == "ent") {
                    if (insJson[i].aktivEnt == 1) {
                        status = "checked";
                    }
                    else {
                        status = "";
                    }
                    $("#frmEntEnfManZuordnung").append("<div class='controlDiv' style='width:230px;margin-right:4px;'><label style='width:160px;'> " + insJson[i].nameEnt + "</br>(" + insJson[i].gueltigkeitEnt + ") </label > <input type='checkbox' style='width:45px;' " + status + " /></div >");
                }
                else {
                    if (insJson[i].aktivEnf == 1) {
                        status = "checked";
                    }
                    else {
                        status = "";
                    }
                    $("#frmEntEnfManZuordnung").append("<div class='controlDiv' style='width:230px;margin-right:4px;'><label style='width:160px;'> " + insJson[i].nameEnf + "</br>(" + insJson[i].gueltigkeitEnf + ") </label > <input type='checkbox' style='width:45px;' " + status + " /></div >");
                }
            }
        }
    });
}
function fensterMitDivOeffnen() {
    $("#frmEntEnfManZuordnung").css("display", "block");
    $("#frmEntEnfManZuordnung").dialog({
        height: 500,
        width: 520,
        resize: "auto"
    });
}
function checkboxenDerEntEnfAlleAnhaken() {
    $("#frmEntEnfManZuordnung input").prop("checked", true);
}
function checkboxenDerEntEnfAlleZuruecksetzen() {
    $("#frmEntEnfManZuordnung input").prop("checked", false);
}
function entEnfStatusSpeichern() {
    var statusArr = [];
    for (i = 0; i < $("#frmEntEnfManZuordnung input").length; i++) {
        statusArr[i] = $("#frmEntEnfManZuordnung input").eq(i).is(":checked");
    }
    $.ajax({
        type: 'POST',
        async: true,
        url: 'php/statusDerEntEnfIntoDB.php',
        data: {
            id: entOderEnf,
            nameDB: $("#nameDB").val(),
            statusArr: statusArr
        },
        success: function (records) {
            //console.log(records);
        }
    });
}
function mapErstellen(untTab, type) {
    $.ajax({
        type: 'POST',
        async: true,
        url: 'php/getDBstructure.php',
        data: {
            nameDB: $("#nameDB").val(),
            activeInstance: $("#activeInstance").val(),
            manID: $("#manID").val(),
            orgID: $("#orgID").val(),
            liegID: $("#liegID").val(),
            berID: $("#berID").val(),
            mstID: $("#mstID").val()
        },
        success: function (echo) {
            var insJson = $.parseJSON(echo);
            var insArrAll = [];
            $("#treeGraph").css("display", "block");
            $("#treeGraph").dialog({
                height: $(window).height() - 1 / 4 * $(window).height(),
                width: $(window).width() - 1 / 4 * $(window).width(),
                position: "center",
                resize: "auto",
                show: {
                    effect: "fade",
                    duration: 500
                },
                hide: {
                    effect: "fade",
                    duration: 500
                },
                close: function(){
                    $("#mapOptionen").css("display","block");
                }
            });
            if (untTab == "manMap" || untTab == "orgMap" || untTab == "liegMap" || untTab == "berMap") {
                if (type == "Speziell") {
                    if (untTab == "manMap" || untTab == "orgMap" || untTab == "liegMap") {
                        var margin = { top: 20, right: 120, bottom: 20, left: 180 },
                            width = 1500 - margin.right - margin.left,
                            height = 600 - margin.top - margin.bottom;
                        // Root node
                        var rootNode = { Content: insJson[0].nameMan, Nodes: [] };
                        // First Level
                        var j = 0;
                        var k = 0;
                        var l = 0;
                        var m = 0;
                        insArrAll[0] = { name: insJson[0].nameMan, parent: "null", level: "gray", children: [] };
                        for (i = 0; i < insJson.length; i++) {
                            l = 0;
                            if (insJson[i].ins == "org") {
                                insArrAll[0].children[j] = { name: insJson[i].nameOrg, parent: insJson[0].nameMan, level: "gray", children: [] };
                                for (k = 0; k < insJson.length; k++) {
                                    if (insJson[k].ins == "lieg") {
                                        if (insJson[k].org_ID == insJson[i].org_ID) {
                                            insArrAll[0].children[j].children[l] = { name: insJson[k].nameLieg, parent: insJson[i].nameOrg, level: "gray", children: [] };
                                            if (insJson[k].energietraeger1 != "") {
                                                insArrAll[0].children[j].children[l].children[m] = { name: insJson[k].energietraeger1, parent: insJson[k].nameLieg, level: "gray", children: [] };
                                                m++;
                                            }
                                            if (insJson[k].energietraeger2 != "") {
                                                insArrAll[0].children[j].children[l].children[m] = { name: insJson[k].energietraeger2, parent: insJson[k].nameLieg, level: "gray", children: [] };
                                                m++;
                                            }
                                            if (insJson[k].energietraeger3 != "") {
                                                insArrAll[0].children[j].children[l].children[m] = { name: insJson[k].energietraeger3, parent: insJson[k].nameLieg, level: "gray", children: [] };
                                                m++;
                                            }
                                            if (insJson[k].energietraeger4 != "") {
                                                insArrAll[0].children[j].children[l].children[m] = { name: insJson[k].energietraeger4, parent: insJson[k].nameLieg, level: "gray", children: [] };
                                                m++;
                                            }
                                            if (insJson[k].energietraeger5 != "") {
                                                insArrAll[0].children[j].children[l].children[m] = { name: insJson[k].energietraeger5, parent: insJson[k].nameLieg, level: "gray", children: [] };
                                                m++;
                                            }
                                            if (insJson[k].energietraeger6 != "") {
                                                insArrAll[0].children[j].children[l].children[m] = { name: insJson[k].energietraeger6, parent: insJson[k].nameLieg, level: "gray", children: [] };
                                                m++;
                                            }
                                            if (insJson[k].energietraeger7 != "") {
                                                insArrAll[0].children[j].children[l].children[m] = { name: insJson[k].energietraeger7, parent: insJson[k].nameLieg, level: "gray", children: [] };
                                                m++;
                                            }
                                            if (insJson[k].energietraeger8 != "") {
                                                insArrAll[0].children[j].children[l].children[m] = { name: insJson[k].energietraeger8, parent: insJson[k].nameLieg, level: "gray", children: [] };
                                                m++;
                                            }
                                            if (insJson[k].energietraeger9 != "") {
                                                insArrAll[0].children[j].children[l].children[m] = { name: insJson[k].energietraeger9, parent: insJson[k].nameLieg, level: "gray", children: [] };
                                                m++;
                                            }
                                            m = 0;
                                            l++;
                                        }
                                    }
                                }
                                j++;
                            }
                        }
                    }
                    else if (untTab == "liegMap") { }
                    else if (untTab == "berMap") { }
                }
                else {
                    var margin = { top: 20, right: 120, bottom: 20, left: 180 },
                        width = 3000 - margin.right - margin.left,
                        height = 1800 - margin.top - margin.bottom;
                    // Root node
                    var rootNode = { Content: insJson[0].nameMan, Nodes: [] };
                    // First Level
                    var j = 0;
                    var k = 0;
                    var l = 0;
                    var m = 0;
                    var n = 0;
                    var o = 0;
                    var p = 0;
                    var q = 0;
                    var r = 0;
                    var s = 0;
                    var t = 0;
                    var u = 0;
                    var y = 0;
                    var z = 0;
                    var ab = 0;
                    var ac = 0;
                    var ad = 0;
                    var ae = 0;
                    var af = 0;
                    insArrAll[0] = { name: insJson[0].nameMan, parent: "null", level: "gray", children: [] };
                    for (i = 0; i < insJson.length; i++) {
                        l = 0;
                        if (insJson[i].ins == "org") {
                            insArrAll[0].children[j] = { name: insJson[i].nameOrg, parent: insJson[0].nameMan, level: "gray", children: [] };
                            for (k = 0; k < insJson.length; k++) {
                                if (insJson[k].ins == "lieg") {
                                    if (insJson[k].org_ID == insJson[i].org_ID) {
                                        insArrAll[0].children[j].children[l] = { name: insJson[k].nameLieg, parent: insJson[i].nameOrg, level: "gray", children: [] };
                                        for (m = 0; m < insJson.length; m++) {
                                            if (insJson[m].ins == "ber") {
                                                if (insJson[m].lieg_ID == insJson[k].lieg_ID &&
                                                    (insJson[m].vorgelagerterBereich1Ber == "" ||
                                                        insJson[m].vorgelagerterBereich1Ber == null)) {
                                                    insArrAll[0].children[j].children[l].children[n] = { name: insJson[m].nameBer, parent: insJson[k].nameLieg, level: "gray", children: [] };
                                                    for (o = 0; o < insJson.length; o++) {
                                                        if (insJson[o].ins == "mst") {
                                                            if (insJson[o].ber_ID == insJson[m].ber_ID) {
                                                                insArrAll[0].children[j].children[l].children[n].children[p] = { name: insJson[o].nameMst, parent: insJson[m].nameBer, level: "orange", children: [] };
                                                                p++;
                                                            }
                                                        }
                                                    }
                                                    for (q = 0; q < insJson.length; q++) {
                                                        if (insJson[q].vorgelagerterBereich1Ber == insJson[m].nameBer) {
                                                            insArrAll[0].children[j].children[l].children[n].children[p] = { name: insJson[q].nameBer, parent: insJson[m].nameBer, level: "gray", children: [] };
                                                            for (f = 0; f < insJson.length; f++) {
                                                                if (insJson[f].vorgelagerterBereich1Ber == insJson[q].nameBer) {
                                                                    insArrAll[0].children[j].children[l].children[n].children[p].children[u] = { name: insJson[f].nameBer, parent: insJson[q].nameBer, level: "gray", children: [] };
                                                                    for (x = 0; x < insJson.length; x++) {
                                                                        if (insJson[x].ins == "ber") {
                                                                            if (insJson[x].vorgelagerterBereich1Ber == insJson[f].nameBer) {
                                                                                insArrAll[0].children[j].children[l].children[n].children[p].children[u].children[y] = { name: insJson[x].nameBer, parent: insJson[f].nameBer, level: "gray", children: [] };
                                                                                for (aa = 0; aa < insJson.length; aa++) {
                                                                                    if (insJson[aa].ins == "ber") {
                                                                                        if (insJson[aa].vorgelagerterBereich1Ber == insJson[x].nameBer) {
                                                                                            insArrAll[0].children[j].children[l].children[n].children[p].children[u].children[y].children[ab] = { name: insJson[aa].nameBer, parent: insJson[x].nameBer, level: "gray", children: [] };
                                                                                            for (cc = 0; cc < insJson.length; cc++) {
                                                                                                if (insJson[cc].ins == "ber") {
                                                                                                    if (insJson[cc].vorgelagerterBereich1Ber == insJson[aa].nameBer) {
                                                                                                        insArrAll[0].children[j].children[l].children[n].children[p].children[u].children[y].children[ab].children[ac] = { name: insJson[cc].nameBer, parent: insJson[aa].nameBer, level: "gray", children: [] };
                                                                                                        for (ee = 0; ee < insJson.length; ee++) {
                                                                                                            if (insJson[ee].ins == "ber") {
                                                                                                                if (insJson[ee].vorgelagerterBereich1Ber == insJson[cc].nameBer) {
                                                                                                                    insArrAll[0].children[j].children[l].children[n].children[p].children[u].children[y].children[ab].children[ac].children[ad] = { name: insJson[ee].nameBer, parent: insJson[cc].nameBer, level: "gray", children: [] };
                                                                                                                    for (gg = 0; gg < insJson.length; gg++) {
                                                                                                                        if (insJson[gg].ins == "ber") {
                                                                                                                            if (insJson[gg].vorgelagerterBereich1Ber == insJson[ee].nameBer) {
                                                                                                                                insArrAll[0].children[j].children[l].children[n].children[p].children[u].children[y].children[ab].children[ac].children[ad].children[ae] = { name: insJson[gg].nameBer, parent: insJson[ee].nameBer, level: "gray", children: [] };
                                                                                                                                for (ii = 0; ii < insJson.length; ii++) {
                                                                                                                                    if (insJson[ii].ins == "ber") {
                                                                                                                                        if (insJson[ii].vorgelagerterBereich1Ber == insJson[gg].nameBer) {
                                                                                                                                            insArrAll[0].children[j].children[l].children[n].children[p].children[u].children[y].children[ab].children[ac].children[ad].children[ae].children[af] = { name: insJson[ii].nameBer, parent: insJson[gg].nameBer, level: "gray", children: [] };
                                                                                                                                            af++;
                                                                                                                                        }
                                                                                                                                    }
                                                                                                                                }
                                                                                                                                for (jj = 0; jj < insJson.length; jj++) {
                                                                                                                                    if (insJson[jj].ins == "mst") {
                                                                                                                                        if (insJson[jj].ber_ID == insJson[gg].ber_ID) {
                                                                                                                                            insArrAll[0].children[j].children[l].children[n].children[p].children[u].children[y].children[ab].children[ac].children[ad].children[ae].children[af] = { name: insJson[jj].nameMst, parent: insJson[gg].nameBer, level: "orange", children: [] };
                                                                                                                                            af++;
                                                                                                                                        }
                                                                                                                                    }
                                                                                                                                }
                                                                                                                                af = 0;
                                                                                                                                ae++;
                                                                                                                            }
                                                                                                                        }
                                                                                                                    }
                                                                                                                    for (hh = 0; hh < insJson.length; hh++) {
                                                                                                                        if (insJson[hh].ins == "mst") {
                                                                                                                            if (insJson[hh].ber_ID == insJson[ee].ber_ID) {
                                                                                                                                insArrAll[0].children[j].children[l].children[n].children[p].children[u].children[y].children[ab].children[ac].children[ad].children[ae] = { name: insJson[hh].nameMst, parent: insJson[ee].nameBer, level: "orange", children: [] };
                                                                                                                                ae++;
                                                                                                                            }
                                                                                                                        }
                                                                                                                    }
                                                                                                                    ae = 0;
                                                                                                                    ad++;
                                                                                                                }
                                                                                                            }
                                                                                                        }
                                                                                                        for (ff = 0; ff < insJson.length; ff++) {
                                                                                                            if (insJson[ff].ins == "mst") {
                                                                                                                if (insJson[ff].ber_ID == insJson[cc].ber_ID) {
                                                                                                                    insArrAll[0].children[j].children[l].children[n].children[p].children[u].children[y].children[ab].children[ac].children[ad] = { name: insJson[ff].nameMst, parent: insJson[cc].nameBer, level: "orange", children: [] };
                                                                                                                    ad++;
                                                                                                                }
                                                                                                            }
                                                                                                        }
                                                                                                        ad = 0;
                                                                                                        ac++;
                                                                                                    }
                                                                                                }
                                                                                            }
                                                                                            for (dd = 0; dd < insJson.length; dd++) {
                                                                                                if (insJson[dd].ins == "mst") {
                                                                                                    if (insJson[dd].ber_ID == insJson[aa].ber_ID) {
                                                                                                        insArrAll[0].children[j].children[l].children[n].children[p].children[u].children[y].children[ab].children[ac] = { name: insJson[dd].nameMst, parent: insJson[ab].nameBer, level: "orange", children: [] };
                                                                                                        ac++;
                                                                                                    }
                                                                                                }
                                                                                            }
                                                                                            ac = 0;
                                                                                            ab++;
                                                                                        }
                                                                                    }
                                                                                }
                                                                                for (bb = 0; bb < insJson.length; bb++) {
                                                                                    if (insJson[bb].ins == "mst") {
                                                                                        if (insJson[bb].ber_ID == insJson[x].ber_ID) {
                                                                                            insArrAll[0].children[j].children[l].children[n].children[p].children[u].children[y].children[ab] = { name: insJson[bb].nameMst, parent: insJson[x].nameBer, level: "orange", children: [] };
                                                                                            ab++;
                                                                                        }
                                                                                    }
                                                                                }
                                                                                ab = 0;
                                                                                y++;
                                                                            }
                                                                        }
                                                                    }
                                                                    for (z = 0; z < insJson.length; z++) {
                                                                        if (insJson[z].ins == "mst") {
                                                                            if (insJson[z].ber_ID == insJson[f].ber_ID) {
                                                                                insArrAll[0].children[j].children[l].children[n].children[p].children[u].children[y] = { name: insJson[z].nameMst, parent: insJson[f].nameBer, level: "orange", children: [] };
                                                                                y++;
                                                                            }
                                                                        }
                                                                    }
                                                                    y = 0;
                                                                    u++;
                                                                }
                                                            }
                                                            for (g = 0; g < insJson.length; g++) {
                                                                if (insJson[g].ins == "mst") {
                                                                    if (insJson[g].ber_ID == insJson[q].ber_ID) {
                                                                        insArrAll[0].children[j].children[l].children[n].children[p].children[u] = { name: insJson[g].nameMst, parent: insJson[q].nameBer, level: "orange", children: [] };
                                                                        u++;
                                                                    }
                                                                }
                                                            }
                                                            u = 0;
                                                            p++;
                                                        }
                                                    }
                                                    p = 0;
                                                    n++;
                                                }
                                            }
                                        }
                                        n = 0;
                                        l++;
                                    }
                                }
                            }
                            l = 0;
                            j++;
                        }
                    }
                    j = 0;
                }
            }
            var treeData = insArrAll;
            //[
            //  {
            //      "name": "Top Level",
            //      "parent": "null",
            //      "children": [
            //        {
            //            "name": "Level 2: A",
            //            "parent": "Top Level",
            //            "children": [
            //              {
            //                  "name": "Son of A",
            //                  "parent": "Level 2: A"
            //              },
            //              {
            //                  "name": "Daughter of A",
            //                  "parent": "Level 2: A"
            //              }
            //            ]
            //        },
            //        {
            //            "name": "Level 2: B",
            //            "parent": "Top Level"
            //        }
            //      ]
            //  }
            //];
            $("svg").remove();
            // ************** Generate the tree diagram	 *****************
            var i = 0,
                duration = 750,
                root;
            var tree = d3.layout.tree()
                .size([height, width]);
            var diagonal = d3.svg.diagonal()
                .projection(function (d) { return [d.y, d.x]; });
            var svg = d3.select("#treeGraph").append("svg")
                .attr("width", width + margin.right + margin.left)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
            root = treeData[0];
            root.x0 = height / 2;
            root.y0 = 0;
            //function collapse(d) {
            //    if (d.children) {
            //        d._children = d.children;
            //        d._children.forEach(collapse);
            //        d.children = null;
            //    }
            //}
            //root.children.forEach(collapse);
            update(root);
            d3.select(self.frameElement).style("height", "500px");
            function update(source) {
                // Compute the new tree layout.
                var nodes = tree.nodes(root).reverse(),
                    links = tree.links(nodes);
                // Normalize for fixed-depth.
                nodes.forEach(function (d) { d.y = d.depth * 180; });
                // Update the nodes�
                var node = svg.selectAll("g.node")
                    .data(nodes, function (d) { return d.id || (d.id = ++i); });
                // Enter any new nodes at the parent's previous position.
                var nodeEnter = node.enter().append("g")
                    .attr("class", "node")
                    .attr("transform", function (d) { return "translate(" + source.y0 + "," + source.x0 + ")"; })
                    .on("click", click);
                nodeEnter.append("circle")
                    .attr("r", 1e-6)
                    .style("fill", function (d) { return d._children ? "lightsteelblue" : "#fff"; });
                nodeEnter.append("text")
                    .attr("x", function (d) { return d.children || d._children ? -13 : 13; })
                    .attr("dy", ".35em")
                    .attr("text-anchor", function (d) { return d.children || d._children ? "end" : "start"; })
                    .text(function (d) { return d.name; })
                    .style("fill-opacity", 1e-6);
                // Transition nodes to their new position.
                var nodeUpdate = node.transition()
                    .duration(duration)
                    .attr("transform", function (d) { return "translate(" + d.y + "," + d.x + ")"; });
                nodeUpdate.select("circle")
                    .attr("r", 5)
                    .style("fill", function (d) { return d._children ? "lightsteelblue" : "#fff"; });
                nodeUpdate.select("text")
                    .style("fill-opacity", 1);
                // Transition exiting nodes to the parent's new position.
                var nodeExit = node.exit().transition()
                    .duration(duration)
                    .attr("transform", function (d) { return "translate(" + source.y + "," + source.x + ")"; })
                    .remove();
                nodeExit.select("circle")
                    .attr("r", 1e-6);
                nodeExit.select("text")
                    .style("fill-opacity", 1e-6);
                // Update the links�
                var link = svg.selectAll("path.link")
                    .data(links, function (d) { return d.target.id; });
                //Enter any new links at the parent's previous position.
                link.enter().insert("path", "g")
                    .attr("class", "link")
                    .style("stroke", function (d) { return d.target.level; })
                    .attr("d", function (d) {
                        var o = { x: source.x0, y: source.y0 };
                        return diagonal({ source: o, target: o });
                    });
                // Transition links to their new position.
                link.transition()
                    .duration(duration)
                    .attr("d", diagonal);
                // Transition exiting nodes to the parent's new position.
                link.exit().transition()
                    .duration(duration)
                    .attr("d", function (d) {
                        var o = { x: source.x, y: source.y };
                        return diagonal({ source: o, target: o });
                    })
                    .remove();
                // Stash the old positions for transition.
                nodes.forEach(function (d) {
                    d.x0 = d.x;
                    d.y0 = d.y;
                });
            }
            // Toggle children on click.
            function click(d) {
                if (d.children) {
                    d._children = d.children;
                    d.children = null;
                } else {
                    d.children = d._children;
                    d._children = null;
                }
                update(d);
            }
        }
    });
}
function mapDrucken(element){
  $("#mapOptionen").css("display","none");
  $(element).printThis();
  setTimeout(mapControlsReset, 2000);
  function mapControlsReset(){
    $("#mapOptionen").css("display","block");
  }
}

var anlagenliste = [];
var Anlage = function (BerID, NameLieg, NameBer, NummerAnl, BezeichnungAnl, StandortAnl, DatumAnschaffung,
    DatumLetzteDurchsicht, Jahresbetriebsstunden, Produkt, ProduktNr, ZugeordneterVerbraucher1, ZugeordneterVerbraucher2,
    Energietraeger1, Energieform1, EinheitEnergie1, Anschlussleistung1, MittlereAuslastungKw1) {
    this.berID = BerID;
    this.nameLieg = NameLieg;
    this.nameBer = NameBer;
    this.nummerAnl = NummerAnl;
    this.bezeichnungAnl = BezeichnungAnl;
    this.standortAnl = StandortAnl;
    this.datumAnschaffung = DatumAnschaffung;
    this.datumLetzteDurchsicht = DatumLetzteDurchsicht;
    this.jahresbetriebsstunden = Jahresbetriebsstunden;
    this.produktAnl = Produkt;
    this.produktnummerAnl = ProduktNr;
    this.zugeordneterVerbraucher1 = ZugeordneterVerbraucher1;
    this.zugeordneterVerbraucher2 = ZugeordneterVerbraucher2;
    this.energietraeger1Anl = Energietraeger1;
    this.energieform1Anl = Energieform1;
    this.einheitEnergie1Anl = EinheitEnergie1;
    this.anschlussleistung1Anl = Anschlussleistung1;
    this.mittlereAuslastungKw1Anl = MittlereAuslastungKw1;
}

//Suchtabellen mit Datensätzen füttern
function liegenschaftenlisteErstellen() {
    //DataTable definieren
    $.ajax({
        type: 'POST',
        async: true,
        url: 'php/getLiegenschaften.php',
        data: {
            nameDB: $("#nameDB").val(),
            orgID: $("#orgID").val()
        },
        success: function (records) {
            var liegJson = JSON.parse(records);

            //Spaltenreihenfolge Resetten
            tblLiegenschaftenSuchen.colReorder.reset();
            //Zeilen leeren
            tblLiegenschaftenSuchen.clear().draw();
            for (var i = 0; i < liegJson.length; i++) {
                tblLiegenschaftenSuchen.row.add([
                    i,
                    liegJson[i].nameLieg,
                    liegJson[i].typLieg,
                    liegJson[i].anschriftLieg,
                    liegJson[i].ortLieg,
                    liegJson[i].nameAnsprechpartnerLieg,
                    liegJson[i].nameEnergiebeauftragterLieg
                ]).draw();
            }
            tblLiegenschaftenSuchen.column(0).visible(false);

            $("#liegenschaftenSuchenContainer").css("display", "block");
            $("#liegenschaftenSuchenContainer").dialog({
                height: $(window).height() - 1 / 8 * $(window).height(),
                width: $(window).width() - 1 / 8 * $(window).width(),
                resize: "auto",
                show: {
                    effect: "fade",
                    duration: 500
                },
                hide: {
                    effect: "fade",
                    duration: 500
                },
                open: function () {
                    //Markieren ausschalten
                    $("#tblLiegenschaftenSuchen").disableSelection();
                    //Hover Cursor festlegen
                    $("#tblLiegenschaftenSuchen tbody tr").css("cursor", "pointer");
                    //Anlage ausw�hlen und in Form einlesen
                    $("#tblLiegenschaftenSuchen tbody").on("dblclick", "tr", function () {
                        var data = tblLiegenschaftenSuchen.row(this).data();

                        $("#liegenschaftenSuchenContainer").dialog("close");
                        readInstanzen("liegFirst", data[0]);
                        readInstanzen("berFirst", 0);
                        readInstanzen("mstFirst", 0);
                    });
                }
            });
        }
    });
}
function extDurchleitungenlisteErstellen() {
    //DataTable definieren
    $.ajax({
        type: 'POST',
        async: true,
        url: 'php/getExtDurchleitungen.php',
        data: {
            nameDB: $("#nameDB").val(),
            liegID: $("#liegID").val()
        },
        success: function (records) {
            var extDlJson = JSON.parse(records);

            //Spaltenreihenfolge Resetten
            tblExtDurchleitungenSuchen.colReorder.reset();
            //Zeilen leeren
            tblExtDurchleitungenSuchen.clear().draw();
            for (var i = 0; i < extDlJson.length; i++) {
                tblExtDurchleitungenSuchen.row.add([
                    i,
                    extDlJson[i].nameExtDl,
                    extDlJson[i].typExtDl,
                    extDlJson[i].anschriftExtDl,
                    extDlJson[i].ortExtDl,
                    extDlJson[i].nameAnsprechpartnerExtDl
                ]).draw();
            }
            tblExtDurchleitungenSuchen.column(0).visible(false);

            $("#extDurchleitungenSuchenContainer").css("display", "block");
            $("#extDurchleitungenSuchenContainer").dialog({
                height: $(window).height() - 1 / 8 * $(window).height(),
                width: $(window).width() - 1 / 8 * $(window).width(),
                resize: "auto",
                show: {
                    effect: "fade",
                    duration: 500
                },
                hide: {
                    effect: "fade",
                    duration: 500
                },
                open: function () {
                    //Markieren ausschalten
                    $("#tblExtDurchleitungenSuchen").disableSelection();
                    //Hover Cursor festlegen
                    $("#tblExtDurchleitungenSuchen tbody tr").css("cursor", "pointer");
                    //Anlage ausw�hlen und in Form einlesen
                    $("#tblExtDurchleitungenSuchen tbody").on("dblclick", "tr", function () {
                        var data = tblExtDurchleitungenSuchen.row(this).data();

                        $("#extDurchleitungenSuchenContainer").dialog("close");
                        readInstanzen("extDlFirst", data[0]);
                    });
                }
            });
        }
    });
}
function standortelisteErstellen() {
    //DataTable definieren
    $.ajax({
        type: 'POST',
        async: true,
        url: 'php/getStandorte.php',
        data: {
            nameDB: $("#nameDB").val(),
            liegID: $("#liegID").val()
        },
        success: function (records) {
            var stdJson = JSON.parse(records);

            //Spaltenreihenfolge Resetten
            tblStandorteSuchen.colReorder.reset();
            //Zeilen leeren
            tblStandorteSuchen.clear().draw();
            for (var i = 0; i < stdJson.length; i++) {
                tblStandorteSuchen.row.add([
                    i,
                    stdJson[i].nameStd,
                    stdJson[i].kurzbezeichnungStd,
                    stdJson[i].flaecheStd
                ]).draw();
            }
            tblStandorteSuchen.column(0).visible(false);

            $("#standorteSuchenContainer").css("display", "block");
            $("#standorteSuchenContainer").dialog({
                height: $(window).height() - 1 / 8 * $(window).height(),
                width: $(window).width() - 1 / 8 * $(window).width(),
                resize: "auto",
                show: {
                    effect: "fade",
                    duration: 500
                },
                hide: {
                    effect: "fade",
                    duration: 500
                },
                open: function () {
                    //Markieren ausschalten
                    $("#tblStandorteSuchen").disableSelection();
                    //Hover Cursor festlegen
                    $("#tblStandorteSuchen tbody tr").css("cursor", "pointer");
                    //Anlage ausw�hlen und in Form einlesen
                    $("#tblStandorteSuchen tbody").on("dblclick", "tr", function () {
                        var data = tblStandorteSuchen.row(this).data();

                        $("#standorteSuchenContainer").dialog("close");
                        readInstanzen("stdFirst", data[0]);
                    });
                }
            });
        }
    });
}
function standorteDritterlisteErstellen() {
    //DataTable definieren
    $.ajax({
        type: 'POST',
        async: true,
        url: 'php/getStandortdatenDritter.php',
        data: {
            nameDB: $("#nameDB").val(),
            liegID: $("#liegID").val()
        },
        success: function (records) {
            var stdDrJson = JSON.parse(records);

            //Spaltenreihenfolge Resetten
            tblStandorteDritterSuchen.colReorder.reset();
            //Zeilen leeren
            tblStandorteDritterSuchen.clear().draw();
            for (var i = 0; i < stdDrJson.length; i++) {
                tblStandorteDritterSuchen.row.add([
                    i,
                    stdDrJson[i].nameStdDr,
                    stdDrJson[i].kurzbezeichnungStdDr,
                    stdDrJson[i].flaecheStdDr
                ]).draw();
            }
            tblStandorteDritterSuchen.column(0).visible(false);

            $("#standorteDritterSuchenContainer").css("display", "block");
            $("#standorteDritterSuchenContainer").dialog({
                height: $(window).height() - 1 / 8 * $(window).height(),
                width: $(window).width() - 1 / 8 * $(window).width(),
                resize: "auto",
                show: {
                    effect: "fade",
                    duration: 500
                },
                hide: {
                    effect: "fade",
                    duration: 500
                },
                open: function () {
                    //Markieren ausschalten
                    $("#tblStandorteDritterSuchen").disableSelection();
                    //Hover Cursor festlegen
                    $("#tblStandorteDritterSuchen tbody tr").css("cursor", "pointer");
                    //Anlage ausw�hlen und in Form einlesen
                    $("#tblStandorteDritterSuchen tbody").on("dblclick", "tr", function () {
                        var data = tblStandorteDritterSuchen.row(this).data();

                        $("#standorteDritterSuchenContainer").dialog("close");
                        readInstanzen("stdDrFirst", data[0]);
                    });
                }
            });
        }
    });
}
function bereichelisteErstellen() {

    //DataTable definieren
    $.ajax({
        type: 'POST',
        async: true,
        url: 'php/getBereiche.php',
        data: {
            id: "berSuchen",
            nameDB: $("#nameDB").val(),
            liegID: $("#liegID").val()
        },
        success: function (records) {
            var berJson = JSON.parse(records);

            //Spaltenreihenfolge Resetten
            tblBereicheSuchen.colReorder.reset();
            //Zeilen leeren
            tblBereicheSuchen.clear().draw();
            for (var i = 0; i < berJson.length; i++) {
                tblBereicheSuchen.row.add([
                    i,
                    berJson[i].nameBer,
                    berJson[i].kurzbezeichnungBer,
                    berJson[i].kostenstelleBer,
                    berJson[i].ortBer,
                    berJson[i].ausgewaehltesLevelBer,
                    berJson[i].vorgelagerterBereich1Ber,
                    berJson[i].vorgelagerterBereich2Ber
                ]).draw();
            }
            tblBereicheSuchen.column(0).visible(false);

            $("#bereichSuchenContainer").css("display", "block");
            $("#bereichSuchenContainer").dialog({
                height: $(window).height() - 1 / 8 * $(window).height(),
                width: $(window).width() - 1 / 8 * $(window).width(),
                resize: "auto",
                show: {
                    effect: "fade",
                    duration: 500
                },
                hide: {
                    effect: "fade",
                    duration: 500
                },
                open: function () {
                    //Markieren ausschalten
                    $("#tblBereicheSuchen").disableSelection();
                    //Hover Cursor festlegen
                    $("#tblBereicheSuchen tbody tr").css("cursor", "pointer");
                    //Anlage ausw�hlen und in Form einlesen
                    $("#tblBereicheSuchen tbody").on("dblclick", "tr", function () {
                        var data = tblBereicheSuchen.row(this).data();

                        $("#bereichSuchenContainer").dialog("close");
                        clearFields("berHinz");
                        clearFields("mstHinz");
                        readInstanzen("berFirst", data[0]);
                        readInstanzen("mstFirst", 0);
                    });
                }
            });
        }
    });
}
function anlagenlisteErstellen() {
    $("#anlListeContainer tr").not("#anlListeContainer tr:nth-child(1)").remove();
    //DataTable definieren
    $.ajax({
        type: 'POST',
        async: true,
        url: 'php/getAnlagen.php',
        data: {
            nameDB: $("#nameDB").val(),
            liegID: $("#liegID").val()
        },
        success: function (records) {
            var anlJson = JSON.parse(records);
            //Spaltenreihenfolge Resetten
            tblAnlagen.colReorder.reset();
            //Zeilen leeren
            tblAnlagen.clear().draw();
            for (var i = 0; i < anlJson.length; i++) {
                tblAnlagen.row.add([
                    i,
                    anlJson[i].lieg_ID,
                    anlJson[i].nameLieg,
                    anlJson[i].nummerAnl,
                    anlJson[i].bezeichnungAnl,
                    anlJson[i].standortAnl,
                    anlJson[i].datumAnschaffungAnl,
                    anlJson[i].baujahrAnl,
                    anlJson[i].jahresbetriebsstundenAnl,
                    anlJson[i].produktAnl,
                    anlJson[i].produktnummerAnl,
                    anlJson[i].zugeordneterVerbraucher1,
                    anlJson[i].zugeordneterVerbraucher2,
                    anlJson[i].energietraeger1Anl,
                    anlJson[i].energieform1Anl,
                    anlJson[i].einheitEnergie1Anl,
                    anlJson[i].anschlussleistung1Anl,
                    anlJson[i].mittlereAuslastungKw1Anl,
                ]).draw();
            }
            tblAnlagen.column(0).visible(false);
            tblAnlagen.column(1).visible(false);
            //Gespeichertes SpaltenSchema einlesen
            anlagenlistenSchemaEinlesen();
            //Gespeicherte SpaltenReihenfolge einlesen
            anlagenlistenSpaltenAnordnungEinlesen();
            $("#anlListeContainer").css("display", "block");
            $("#anlListeContainer").dialog({
                height: $(window).height() - 1 / 8 * $(window).height(),
                width: $(window).width() - 1 / 8 * $(window).width(),
                resize: "auto",
                show: {
                    effect: "fade",
                    duration: 500
                },
                hide: {
                    effect: "fade",
                    duration: 500
                },
                open: function () {
                    //Markieren ausschalten
                    $("#anlagenListe").disableSelection();
                    //Hover Cursor festlegen
                    $("#anlagenListe tbody tr").css("cursor", "pointer");
                    //Anlage ausw�hlen und in Form einlesen
                    $("#anlagenListe tbody").on("dblclick", "tr", function () {
                        var data = tblAnlagen.row(this).data();
                        $("#liegID").val(data[1]);
                        $("#anlListeContainer").dialog("close");
                        clearFields("anlHinz");
                        readInstanzen("anlFirst", data[0]);
                        //$(".liegPfad").val(data[2]);
                        //$(".liegPfad").trigger("change");
                    });
                    //Anlagenliste Optionen(Buttons)
                    $(".anlDialogButton").click(function () {
                        var caseVal = "";
                        caseVal = $(this).text();
                        switch (caseVal) {
                            case "Schema Speichern":
                                break;
                            case "Schlie�en":
                                $("#anlListeContainer").dialog("close");
                        }
                    });
                }
            });
        }
    });
}
function messmittellisteErstellen() {
    //DataTable definieren
    $.ajax({
        type: 'POST',
        async: true,
        url: 'php/getMessmittel.php',
        data: {
            id: "msmSuchen",
            nameDB: $("#nameDB").val(),
            liegID: $("#liegID").val()
        },
        success: function (records) {
            var msmJson = JSON.parse(records);

            //Spaltenreihenfolge Resetten
            tblMessmittelSuchen.colReorder.reset();
            //Zeilen leeren
            tblMessmittelSuchen.clear().draw();
            for (var i = 0; i < msmJson.length; i++) {
                tblMessmittelSuchen.row.add([
                    i,
                    msmJson[i].nrMsm,
                    msmJson[i].bezeichnungMsm,
                    msmJson[i].anlageMsm,
                    msmJson[i].messstelleMsm,
                    msmJson[i].energietraegerMsm,
                    msmJson[i].einheitMsm,
                    msmJson[i].pruefzyklusMsm,
                    msmJson[i].naechstePruefungMsm
                ]).draw();
            }
            tblMessmittelSuchen.column(0).visible(false);

            $("#messmittelSuchenContainer").css("display", "block");
            $("#messmittelSuchenContainer").dialog({
                height: $(window).height() - 1 / 8 * $(window).height(),
                width: $(window).width() - 1 / 8 * $(window).width(),
                resize: "auto",
                show: {
                    effect: "fade",
                    duration: 500
                },
                hide: {
                    effect: "fade",
                    duration: 500
                },
                open: function () {
                    //Markieren ausschalten
                    $("#tblMessmittelSuchen").disableSelection();
                    //Hover Cursor festlegen
                    $("#tblMessmittelSuchen tbody tr").css("cursor", "pointer");
                    //Anlage ausw�hlen und in Form einlesen
                    $("#tblMessmittelSuchen tbody").on("dblclick", "tr", function () {
                        var data = tblMessmittelSuchen.row(this).data();

                        $("#messmittelSuchenContainer").dialog("close");

                        clearFields("msmHinz");
                        readInstanzen("msmFirst", data[0]);
                    });
                }
            });
        }
    });
}
function messstellenlisteErstellen() {
    //DataTable definieren
    $.ajax({
        type: 'POST',
        async: true,
        url: 'php/getMessstellen.php',
        data: {
            ins: "mstSuchen",
            nameDB: $("#nameDB").val(),
            liegID: $("#liegID").val()
        },
        success: function (records) {
            var mstJson = JSON.parse(records);

            //Spaltenreihenfolge Resetten
            tblMessstellenSuchen.colReorder.reset();
            //Zeilen leeren
            tblMessstellenSuchen.clear().draw();
            for (var i = 0; i < mstJson.length; i++) {
                tblMessstellenSuchen.row.add([
                    i,
                    mstJson[i].nameMSt,
                    mstJson[i].kurzbezeichnungMst,
                    mstJson[i].aktivMst,
                    mstJson[i].kostenstelleMst,
                    mstJson[i].energietraegerMst,
                    mstJson[i].messmittelBerechnungslogikMst,
                    mstJson[i].anlageMst,
                    mstJson[i].ortMst
                ]).draw();
            }
            tblMessstellenSuchen.column(0).visible(false);

            $("#messstellenSuchenContainer").css("display", "block");
            $("#messstellenSuchenContainer").dialog({
                height: $(window).height() - 1 / 8 * $(window).height(),
                width: $(window).width() - 1 / 8 * $(window).width(),
                resize: "auto",
                show: {
                    effect: "fade",
                    duration: 500
                },
                hide: {
                    effect: "fade",
                    duration: 500
                },
                open: function () {
                    //Markieren ausschalten
                    $("#tblMessstellenSuchen").disableSelection();
                    //Hover Cursor festlegen
                    $("#tblMessstellenSuchen tbody tr").css("cursor", "pointer");
                    //Anlage ausw�hlen und in Form einlesen
                    $("#tblMessstellenSuchen tbody").on("dblclick", "tr", function () {
                        var data = tblMessstellenSuchen.row(this).data();

                        $("#messstellenSuchenContainer").dialog("close");

                        clearFields("mstHinz");
                        readInstanzen("mstFirst", data[0]);
                    });
                }
            });
        }
    });
}
function externeRechnungenListeErstellen(typ) {
    $.ajax({
        type: 'POST',
        async: true,
        url: 'php/getRechnungen.php',
        data: {
            id: "extRechngSuchen",
            nameMst: "",
            nameDB: $("#nameDB").val(),
            liegID: $("#liegID").val()
        },
        success: function (records) {
            //console.log(records);
            var eRngJson = JSON.parse(records);

            if (typ == "lupe") {
                var eRngJson = JSON.parse(records);
                var verbrauch;
                var kosten;

                //Spaltenreihenfolge Resetten
                tblExterneRechnungenSuchen.colReorder.reset();
                //Zeilen leeren
                tblExterneRechnungenSuchen.clear().draw();
                for (var i = 0; i < eRngJson.length; i++) {
                  verbrauch = formatNumber("form",eRngJson[i].verbrauchERng);
                  kosten = formatNumber("form",eRngJson[i].kostenERng);

                    tblExterneRechnungenSuchen.row.add([
                        i,
                        eRngJson[i].mstERng,
                        eRngJson[i].nrERng,
                        eRngJson[i].kostenstelleERng,
                        eRngJson[i].vomERng,
                        eRngJson[i].bisERng,
                        eRngJson[i].entERng,
                        eRngJson[i].einERng,
                        eRngJson[i].versorgerERng,
                        verbrauch,
                        kosten
                    ]).draw();
                }
                tblExterneRechnungenSuchen.column(0).visible(false);

                $("#externeRechnungenSuchenContainer").css("display", "block");
                $("#externeRechnungenSuchenContainer").dialog({
                    height: $(window).height() - 1 / 8 * $(window).height(),
                    width: $(window).width() - 1 / 8 * $(window).width(),
                    resize: "auto",
                    show: {
                        effect: "fade",
                        duration: 500
                    },
                    hide: {
                        effect: "fade",
                        duration: 500
                    },
                    open: function () {
                        //Markieren ausschalten
                        $("#tblExterneRechnungenSuchen").disableSelection();
                        //Hover Cursor festlegen
                        $("#tblExterneRechnungenSuchen tbody tr").css("cursor", "pointer");
                        //Anlage ausw�hlen und in Form einlesen
                        $("#tblExterneRechnungenSuchen tbody").on("dblclick", "tr", function () {
                            var data = tblExterneRechnungenSuchen.row(this).data();

                            $("#externeRechnungenSuchenContainer").dialog("close");
                            clearFields("eRngHinz");
                            readInstanzen("eRngFirst", data[0]);
                        });
                    }
                });
            }
            else if (typ == "vergleich") {
                tblAuswertung1ERng.clear().draw();
                tblAuswertung2ERng.clear().draw();

                var fullDate;
                var dateSplit = [];
                var quartal;
                var monat;
                var verbrauch;
                var kosten;

                for (i = 0; i < eRngJson.length; i++) {
                    if (eRngJson[i].bisERng.length == 10) {
                        fullDate = eRngJson[i].bisERng;
                        dateSplit = fullDate.split(".");
                        switch (dateSplit[1]) {
                            case "01":
                                quartal = "1.Quartal";
                                monat = "Jan";
                                break;
                            case "02":
                                quartal = "1.Quartal";
                                monat = "Feb";
                                break;
                            case "03":
                                quartal = "1.Quartal";
                                monat = "Mrz"
                                break;
                            case "04":
                                quartal = "2.Quartal";
                                monat = "Apr";
                                break;
                            case "05":
                                quartal = "2.Quartal";
                                monat = "Mai";
                                break;
                            case "06":
                                quartal = "2.Quartal";
                                monat = "Jun";
                                break;
                            case "07":
                                quartal = "3.Quartal";
                                monat = "Jul";
                                break;
                            case "08":
                                quartal = "3.Quartal";
                                monat = "Aug";
                                break;
                            case "09":
                                quartal = "3.Quartal";
                                monat = "Sep";
                                break;
                            case "10":
                                quartal = "4.Quartal";
                                monat = "Okt";
                                break;
                            case "11":
                                quartal = "4.Quartal";
                                monat = "Nov";
                                break;
                            case "12":
                                quartal = "4.Quartal";
                                monat = "Dez";
                                break;
                        }
                    }
                    else {
                        fullDate = "-";
                        dateSplit = ["-", "-", "-"];
                        quartal = "-";
                    }

                    verbrauch = formatNumber("form", eRngJson[i].verbrauchERng);
                    kosten = formatNumber("form", eRngJson[i].kostenERng);

                    tblAuswertung1ERng.row.add([
                        i + 1,
                        eRngJson[i].nrERng,
                        eRngJson[i].mstERng,
                        eRngJson[i].entERng,
                        eRngJson[i].allgemeinerEnt,
                        dateSplit[2],
                        dateSplit[1],
                        monat,
                        quartal,
                        verbrauch,
                        kosten
                    ]).draw();
                    tblAuswertung2ERng.row.add([
                        i + 1,
                        eRngJson[i].nrERng,
                        eRngJson[i].mstERng,
                        eRngJson[i].entERng,
                        eRngJson[i].allgemeinerEnt,
                        dateSplit[2],
                        dateSplit[1],
                        monat,
                        quartal,
                        verbrauch,
                        kosten
                    ]).draw();
                }
                tblAuswertung1ERng.column(0).visible(false);
                tblAuswertung1ERng.column(4).visible(false);
                tblAuswertung1ERng.column(6).visible(false);
                tblAuswertung2ERng.column(0).visible(false);
                tblAuswertung2ERng.column(4).visible(false);
                tblAuswertung2ERng.column(6).visible(false);
            }
        }
    });
}
function energietraegerlisteErstellen() {
    //DataTable definieren
    $.ajax({
        type: 'POST',
        async: true,
        url: 'php/getEnergietraeger.php',
        data: {
            nameDB: $("#nameDB").val()
        },
        success: function (records) {
            var entJson = JSON.parse(records);

            //Spaltenreihenfolge Resetten
            tblEnergietraegerSuchen.colReorder.reset();
            //Zeilen leeren
            tblEnergietraegerSuchen.clear().draw();
            for (var i = 0; i < entJson.length; i++) {
                tblEnergietraegerSuchen.row.add([
                    i,
                    entJson[i].nameEnt,
                    entJson[i].allgemeinerEnt,
                ]).draw();
            }
            tblEnergietraegerSuchen.column(0).visible(false);

            $("#energietraegerSuchenContainer").css("display", "block");
            $("#energietraegerSuchenContainer").dialog({
                height: $(window).height() - 1 / 8 * $(window).height(),
                width: $(window).width() - 1 / 8 * $(window).width(),
                resize: "auto",
                show: {
                    effect: "fade",
                    duration: 500
                },
                hide: {
                    effect: "fade",
                    duration: 500
                },
                open: function () {
                    //Markieren ausschalten
                    $("#tblEnergietraegerSuchen").disableSelection();
                    //Hover Cursor festlegen
                    $("#tblEnergietraegerSuchen tbody tr").css("cursor", "pointer");
                    //Energieträger auswählen und in Form einlesen
                    $("#tblEnergietraegerSuchen tbody").on("dblclick", "tr", function () {
                        var data = tblEnergietraegerSuchen.row(this).data();

                        $("#energietraegerSuchenContainer").dialog("close");
                        readInstanzen("entFirst", data[0]);
                    });
                }
            });
        }
    });
}
function energieformenlisteErstellen() {
    //DataTable definieren
    $.ajax({
        type: 'POST',
        async: true,
        url: 'php/getEnergieformen.php',
        data: {
            nameDB: $("#nameDB").val()
        },
        success: function (records) {
            var enfJson = JSON.parse(records);

            //Spaltenreihenfolge Resetten
            tblEnergieformenSuchen.colReorder.reset();
            //Zeilen leeren
            tblEnergieformenSuchen.clear().draw();
            for (var i = 0; i < enfJson.length; i++) {
                tblEnergieformenSuchen.row.add([
                    i,
                    enfJson[i].nameEnf,
                    enfJson[i].aktivEnf
                ]).draw();
            }
            tblEnergieformenSuchen.column(0).visible(false);

            $("#energieformenSuchenContainer").css("display", "block");
            $("#energieformenSuchenContainer").dialog({
                height: $(window).height() - 1 / 8 * $(window).height(),
                width: $(window).width() - 1 / 8 * $(window).width(),
                resize: "auto",
                show: {
                    effect: "fade",
                    duration: 500
                },
                hide: {
                    effect: "fade",
                    duration: 500
                },
                open: function () {
                    //Markieren ausschalten
                    $("#tblEnergieformenSuchen").disableSelection();
                    //Hover Cursor festlegen
                    $("#tblEnergieformenSuchen tbody tr").css("cursor", "pointer");
                    //Anlage ausw�hlen und in Form einlesen
                    $("#tblEnergieformenSuchen tbody").on("dblclick", "tr", function () {
                        var data = tblEnergieformenSuchen.row(this).data();

                        $("#energieformenSuchenContainer").dialog("close");
                        readInstanzen("enfFirst", data[0]);
                    });
                }
            });
        }
    });
}

//Auswahltabellen füllen
function mandantenAuswahllisteErstellen(){
  $.ajax({
      type: 'POST',
      async: true,
      url: 'php/getMandanten.php',
      data: {
          betrGrpID: $("#betrGrpID").val(),
          nameDB: "gipscomm"
      },
      success: function (records) {
          var manJson = JSON.parse(records);
          tblMandantenAuswahl.clear().draw();
          for (var i = 0; i < manJson.length; i++) {
              tblMandantenAuswahl.row.add([
                  manJson[i].man_ID,
                  manJson[i].nameMan,
                  manJson[i].dbName,
                  manJson[i].holdingstruktur
                  ]).draw();
          }
          tblMandantenAuswahl.column(0).visible(false).draw();

          $("#mandantenlisteAuswahlContainer").css("display", "block");
          $("#mandantenlisteAuswahlContainer").dialog({
              height: 400,
              width: 600,
              resize: "auto",
              show: {
                  effect: "fade",
                  duration: 500
              },
              hide: {
                  effect: "fade",
                  duration: 500
              },
              open: function () {
                  //Markieren ausschalten
                  $("#tblMandantenAuswahl").disableSelection();
                  //Hover Cursor festlegen
                  $("#tblMandantenAuswahl tbody tr").css("cursor", "pointer");
                  //Event Handler entfernen
                  $("#tblMandantenAuswahl tbody").off("dblclick", "tr");
                  //standortdatenDritter auswählen und in Form einlesen
                  $("#tblMandantenAuswahl tbody").on("dblclick", "tr", function () {
                    var data = tblMandantenAuswahl.row(this).data();

                        tblMandantengruppe.row.add([data[0],data[1],data[2],data[3]]).draw();
                        tblMandantengruppe.column(0).visible(false).draw();

                      $("#mandantenlisteAuswahlContainer").dialog("close");
                  });
              }
          });
      }
  });
}
function standortdatenDritteAuswahllisteErstellen(btnID){
  $.ajax({
      type: 'POST',
      async: true,
      url: 'php/getStandortdatenDritter.php',
      data: {
          liegID: $("#liegID").val(),
          nameDB: $("#nameDB").val()
      },
      success: function (records) {
          var stdDrJson = JSON.parse(records);
          tblStdDrAuswahl.clear().draw();
          for (var i = 0; i < stdDrJson.length; i++) {
              tblStdDrAuswahl.row.add([
                  stdDrJson[i].nameStdDr,
                  stdDrJson[i].kurzbezeichnungStdDr,
                  stdDrJson[i].flaecheStdDr,
                  stdDrJson[i].custom1InputStdDr,
                  stdDrJson[i].custom2InputStdDr,
                  stdDrJson[i].custom3InputStdDr,
                  stdDrJson[i].custom4InputStdDr,
                  stdDrJson[i].custom5InputStdDr,
                  stdDrJson[i].custom6InputStdDr
                  ]).draw();
          }

          $("#stdDrAuswahlContainer").css("display", "block");
          $("#stdDrAuswahlContainer").dialog({
              height: 400,
              width: 600,
              resize: "auto",
              show: {
                  effect: "fade",
                  duration: 500
              },
              hide: {
                  effect: "fade",
                  duration: 500
              },
              open: function () {
                  //Markieren ausschalten
                  $("#tblStdDrAuswahl").disableSelection();
                  //Hover Cursor festlegen
                  $("#tblStdDrAuswahl tbody tr").css("cursor", "pointer");
                  //Event Handler entfernen
                  $("#tblStdDrAuswahl tbody").off("dblclick", "tr");
                  //standortdatenDritter auswählen und in Form einlesen
                  $("#tblStdDrAuswahl tbody").on("dblclick", "tr", function () {
                      var data = tblStdDrAuswahl.row(this).data();
                      var str1 = btnID.slice(0,btnID.length - 1);
                      var str2 = btnID.slice(-1);
                      if(str1 == "stdDrSuchenExtDl"){
                          $("#standort" + str2 + "ExtDl").val(data[0]);
                      }
                      else{
                        $("#standort" + str2 + "EngResExtDl").val(data[0]);
                      }
                      $("#stdDrAuswahlContainer").dialog("close");
                  });
              }
          });
      }
  });
}
function bereichsAuswahllisteErstellen(gehoertZu) {
    if (gehoertZu.id == "berSuchenVBereich1" ||
        (gehoertZu.id == "berSuchenVBereich2" && $("#vorgelagerteBereiche2AllgemeinBer").prop("disabled") == false) ||
        gehoertZu.id == "anlAuswahlBer") {
        $.ajax({
            type: 'POST',
            async: true,
            url: 'php/getBereiche.php',
            data: {
                id: "berAuswahl",
                liegID: $("#liegID").val(),
                nameDB: $("#nameDB").val()
            },
            success: function (records) {
              console.log(records);
                var berJson = JSON.parse(records);
                //Spaltenreihenfolge Resetten
                tblBereichAussuchen.colReorder.reset();
                //Zeilen leeren
                tblBereichAussuchen.clear().draw();
                for (var i = 0; i < berJson.length; i++) {
                    tblBereichAussuchen.row.add([
                        berJson[i].ber_ID,
                        berJson[i].nameBer,
                        berJson[i].kurzbezeichnungBer
                    ]).draw();
                }
                tblBereichAussuchen.column(0).visible(false);
                $("#bereichListeContainer").css("display", "block");
                $("#bereichListeContainer").dialog({
                    height: $(window).height() - 1 / 8 * $(window).height(),
                    width: $(window).width() - 1 / 8 * $(window).width(),
                    resize: "auto",
                    show: {
                        effect: "fade",
                        duration: 500
                    },
                    hide: {
                        effect: "fade",
                        duration: 500
                    },
                    open: function () {
                        //Markieren ausschalten
                        $("#tblBereichelisteBer").disableSelection();
                        //Hover Cursor festlegen
                        $("#tblBereichelisteBer tbody tr").css("cursor", "pointer");
                        //Anlage ausw�hlen und in Form einlesen
                        $("#tblBereichelisteBer tbody").off("dblclick");
                        $("#tblBereichelisteBer tbody").on("dblclick", "tr", function () {
                            var data = tblBereichAussuchen.row(this).data();
                            if(gehoertZu.id == "berSuchenVBereich1"){
                              $("#vorgelagerteBereiche1AllgemeinBer").val(data[1]);
                            }
                            else {
                              $("#vorgelagerteBereiche2AllgemeinBer").val(data[1]);
                            }
                            $("#bereichListeContainer").dialog("close");

                        });
                    }
                });
            }
        });
    }
}
function messstellenAuswahllisteErstellen(ins,ent) {
    $.ajax({
        type: 'POST',
        async: true,
        url: 'php/getMessstellen.php',
        data: {
            ins: ins,
            berID: $("#berID").val(),
            liegID: $("#liegID").val(),
            nameEnt: ent,
            nameDB: $("#nameDB").val()
        },
        success: function (records) {
            var MstJson = JSON.parse(records);
            tblMessstelleAuswahl.clear().draw();
            for (var i = 0; i < MstJson.length; i++) {
                tblMessstelleAuswahl.row.add([
                    MstJson[i].nameMSt,
                    MstJson[i].kurzbezeichnungMst,
                    MstJson[i].kostenstelleMst,
                    MstJson[i].messmittelBerechnungslogikMst,
                    //MstJson[i].nameBer
                    ]).draw();
            }
            $("#messstellenAuswahlContainer").css("display", "block");
            $("#messstellenAuswahlContainer").dialog({
                height: 400,
                width: 600,
                resize: "auto",
                show: {
                    effect: "fade",
                    duration: 500
                },
                hide: {
                    effect: "fade",
                    duration: 500
                },
                open: function () {
                    //Markieren ausschalten
                    $("#tblMessstellenlisteMst").disableSelection();
                    //Hover Cursor festlegen
                    $("#tblMessstellenlisteMst tbody tr").css("cursor", "pointer");
                    //Event Handler entfernen
                    $("#tblMessstellenlisteMst tbody").off("dblclick", "tr");
                    //Bereich ausw�hlen und in Form einlesen
                    $("#tblMessstellenlisteMst tbody").on("dblclick", "tr", function () {
                        var data = tblMessstelleAuswahl.row(this).data();
                        if (ins == "vorgMst") {
                            $("#vorgelagerteMst").val(data[0]);
                        }
                        else if (ins == "mstMsm") {
                            $("#messstelleAllgemeinMsm").val(data[0]);
                        }
                        else if (ins == "mstERng") {
                            $("#mstERng").val(data[0]);
                            $("#mstERng").trigger("change");
                        }
                        else if (ins == "mst1Anl") {
                            $("#mst1Anl").val(data[0]);
                            $("#ber1Anl").val(data[2]);
                        }
                        else if (ins == "mst2Anl") {
                            $("#mst2Anl").val(data[0]);
                            $("#ber2Anl").val(data[2]);
                        }
                        else if (ins == "mst3Anl") {
                            $("#mst3Anl").val(data[0]);
                            $("#ber3Anl").val(data[2]);
                        }
                        else if (ins == "mst4Anl") {
                            $("#mst4Anl").val(data[0]);
                            $("#ber4Anl").val(data[2]);
                        }
                        else if (ins == "mstZp") {
                            $("#mstZp").val(data[0]);
                            $("#mstZp").trigger("change");
                        }
                        else if (ins == "berichtSuchenMst1") {
                            // Nachdem eine neue mst in Tab ausgew�hlt und name in das Feld "kurve + i" geschrieben wurde,
                            // passiert folgendes:
                            // Channel und Messwerte werden eingelesen
                            if (data[3] == "" || data[3] == null || data[3] == "undefined"){
                                alert("Der ausgew�hlten Messstelle wurde weder ein Messmittel noch eine Berechnungslogik zugewiesen, deshalb kann sie nicht visualisiert werden.");
                            }
                            else {
                                $("#kurve1").val(data[0]);
                                channelsUndWandlungsfaktorZuweisen($("#kurve1"));
                            }
                        }
                        else if (ins == "berichtSuchenMst2") {
                            if (data[3] == "" || data[3] == null || data[3] == "undefined") {
                                alert("Der ausgew�hlten Messstelle wurde weder ein Messmittel noch eine Berechnungslogik zugewiesen, deshalb kann sie nicht visualisiert werden.");
                            }
                            else {
                                $("#kurve2").val(data[0]);
                                channelsUndWandlungsfaktorZuweisen($("#kurve2"));
                            }
                        }
                        else if (ins == "berichtSuchenMst3") {
                            if (data[3] == "" || data[3] == null || data[3] == "undefined") {
                                alert("Der ausgew�hlten Messstelle wurde weder ein Messmittel noch eine Berechnungslogik zugewiesen, deshalb kann sie nicht visualisiert werden.");
                            }
                            else {
                                $("#kurve3").val(data[0]);
                                channelsUndWandlungsfaktorZuweisen($("#kurve3"));
                            }
                        }

                        else if (ins == "mst1ExtDl") {
                                $("#messstelle1ExtDl").val(data[0]);
                        }
                        else if (ins == "mst2ExtDl") {
                                $("#messstelle2ExtDl").val(data[0]);
                        }
                        else if (ins == "mst3ExtDl") {
                                $("#messstelle3ExtDl").val(data[0]);
                        }
                        else if (ins == "mst4ExtDl") {
                                $("#messstelle4ExtDl").val(data[0]);
                        }
                        else if (ins == "mst5ExtDl") {
                                $("#messstelle5ExtDl").val(data[0]);
                        }
                        else if (ins == "mst6ExtDl") {
                                $("#messstelle6ExtDl").val(data[0]);
                        }

                        else if (ins == "mstEngRes1ExtDl") {
                                $("#messstelleEngRes1ExtDl").val(data[0]);
                        }
                        else if (ins == "mstEngRes2ExtDl") {
                                $("#messstelleEngRes2ExtDl").val(data[0]);
                        }
                        else if (ins == "mstEngRes3ExtDl") {
                                $("#messstelleEngRes3ExtDl").val(data[0]);
                        }
                        else if (ins == "mstEngRes4ExtDl") {
                                $("#messstelleEngRes4ExtDl").val(data[0]);
                        }
                        else if (ins == "mstEngRes5ExtDl") {
                                $("#messstelleEngRes5ExtDl").val(data[0]);
                        }
                        else if (ins == "mstEngRes6ExtDl") {
                                $("#messstelleEngRes6ExtDl").val(data[0]);
                        }
                        $("#messstellenAuswahlContainer").dialog("close");
                    });
                }
            });
        }
    });
}
function anlagenAuswahllisteErstellen(ins) {
    $.ajax({
        type: 'POST',
        async: true,
        url: 'php/getAnlagen.php',
        data: {
            ins: ins,
            nameDB: $("#nameDB").val(),
            liegID: $("#liegID").val()
        },
        success: function (records) {
            var anlJson = JSON.parse(records);
            //Spaltenreihenfolge Resetten
            tblAnlagenII.colReorder.reset();
            //Zeilen leeren
            tblAnlagenII.clear().draw();
            for (var i = 0; i < anlJson.length; i++) {
                tblAnlagenII.row.add([
                    anlJson[i].nummerAnl,
                    anlJson[i].bezeichnungAnl,
                    anlJson[i].typAnl,
                    anlJson[i].custom1Anl,
                    anlJson[i].custom2Anl,
                    anlJson[i].custom3Anl,
                    anlJson[i].custom4Anl,
                    anlJson[i].custom5Anl,
                    anlJson[i].custom6Anl

                ]).draw();
            }
            $("#anlagenlisteAuswahlContainer").css("display", "block");
            $("#anlagenlisteAuswahlContainer").dialog({
                height: $(window).height() - 1 / 8 * $(window).height(),
                width: $(window).width() - 1 / 8 * $(window).width(),
                resize: "auto",
                show: {
                    effect: "fade",
                    duration: 500
                },
                hide: {
                    effect: "fade",
                    duration: 500
                },
                open: function () {
                    //Markieren ausschalten
                    $("#tblAnlagenListe2").disableSelection();
                    //Hover Cursor festlegen
                    $("#tblAnlagenListe2 tbody tr").css("cursor", "pointer");
                    //Anlage ausw�hlen und in Form einlesen
                    $("#tblAnlagenListe2 tbody").off("dblclick");
                    $("#tblAnlagenListe2 tbody").on("dblclick", "tr", function () {
                        var data = tblAnlagenII.row(this).data();
                        var splitZugVerb = [];
                        while (splitZugVerb.length) { splitZugVerb.pop(); }
                        splitZugVerb = ins.split("Verbr");

                        if (ins == "anlMsm") {
                            $("#anlMsm").val(data[0] + " " + data[1]);
                        }
                        else if (ins == "anlMst") {
                            $("#anlMst").val(data[0] + " " + data[1]);
                        }
                        else if (splitZugVerb.length > 0 && splitZugVerb[0]  == "anlAuswahlZug") {
                              $("#zugeordneterVerbraucher" + splitZugVerb[1] + "AllgemeinAnl").val(data[0] + " " + data[1]);
                        }

                        $("#anlagenlisteAuswahlContainer").dialog("close");

                    });
                }
            });
        }
    });
}
function messmittelAuswahllisteErstellen(id) {
    $.ajax({
        type: 'POST',
        async: true,
        url: 'php/getMessmittel.php',
        data: {
            id: id,
            liegID: $("#liegID").val(),
            nameDB: $("#nameDB").val()
        },
        success: function (records) {
            var MsmJson = JSON.parse(records);
            tblMessmittel.clear().draw();
            for (var i = 0; i < MsmJson.length; i++) {
                tblMessmittel.row.add([
                    MsmJson[i].nrMsm,
                    MsmJson[i].typNrMsm,
                    MsmJson[i].anlageMsm,
                    MsmJson[i].energietraegerMsm
                ]).draw();
            }
            $("#messmittelAuswahlContainer").css("display", "block");
            $("#messmittelAuswahlContainer").dialog({
                height: 400,
                width: 600,
                resize: "auto",
                show: {
                    effect: "fade",
                    duration: 500
                },
                hide: {
                    effect: "fade",
                    duration: 500
                },
                open: function () {
                    //Markieren ausschalten
                    $("#tblMessmittel").disableSelection();
                    //Hover Cursor festlegen
                    $("#tblMessmittel tbody tr").css("cursor", "pointer");
                    //Event Handler entfernen
                    $("#tblMessmittel tbody").off("dblclick", "tr");
                    //Bereich ausw�hlen und in Form einlesen
                    $("#tblMessmittel tbody").on("dblclick", "tr", function () {
                        var data = tblMessmittel.row(this).data();
                        if (id == "msmMst") {
                            $("#messmittelBerechnungslogikMst").val(data[0]);
                        }
                        $("#messmittelAuswahlContainer").dialog("close");
                    });
                }
            });
        }
    });
}
function kanalauswahlTabelleErstellen(setChannel) {
    $.ajax({
        type: 'POST',
        async: true,
        url: 'php/getChannel.php',
        data: {
            nameDB: $("#nameDB").val()
        },
        success: function (records) {
            var chaJson = JSON.parse(records);
            tblChannel.clear().draw();
            for (var i = 0; i < chaJson.length; i++) {
                tblChannel.row.add([
                    chaJson[i].channel_id,
                    chaJson[i].description,
                    chaJson[i].name,
                    chaJson[i].phase
                ]).draw();
            }
            $("#ChannellisteContainer").css("display", "block");
            $("#ChannellisteContainer").dialog({
                height: 400,
                width: 600,
                resize: "auto",
                show: {
                    effect: "fade",
                    duration: 500
                },
                hide: {
                    effect: "fade",
                    duration: 500
                },
                open: function () {
                    //Markieren ausschalten
                    $("#tblChannel").disableSelection();
                    //Hover Cursor festlegen
                    $("#channelliste tbody tr").css("cursor", "pointer");
                    //Event Handler entfernen
                    $("#channelliste tbody").off("dblclick", "tr");
                    //Bereich ausw�hlen und in Form einlesen
                    $("#channelliste tbody").on("dblclick", "tr", function () {
                        var data = tblChannel.row(this).data();
                        if (setChannel == "anlSuchenKanal1") {
                            $("#kanal1AllgemeinMsm").val(data[0]);
                        }
                        else if (setChannel == "anlSuchenKanal2") {
                            $("#kanal2AllgemeinMsm").val(data[0]);
                        }
                        else if (setChannel == "anlSuchenKanal3") {
                            $("#kanal3AllgemeinMsm").val(data[0]);
                        }
                        $("#ChannellisteContainer").dialog("close");
                    });
                }
            });
        }
    });
}
function standorteAuswahllisteErstellen(gehoertZu) {
    $.ajax({
        type: 'POST',
        async: true,
        url: 'php/getStandorte.php',
        data: {
            nameDB: $("#nameDB").val(),
            liegID: $("#liegID").val()
        },
        success: function (records) {
            var stdJson = JSON.parse(records);
            //Spaltenreihenfolge Resetten
            tblStandorteAuswahl.colReorder.reset();
            //Zeilen leeren
            tblStandorteAuswahl.clear().draw();
            for (var i = 0; i < stdJson.length; i++) {
                tblStandorteAuswahl.row.add([
                    stdJson[i].nameStd,
                    stdJson[i].kurzbezeichnungStd,
                    stdJson[i].flaecheStd,
                ]).draw();
            }
            $("#standorteAuswahlContainer").css("display", "block");
            $("#standorteAuswahlContainer").dialog({
                height: $(window).height() - 1 / 4 * $(window).height(),
                width: $(window).width() - 1 / 4 * $(window).width(),
                resize: "auto",
                show: {
                    effect: "fade",
                    duration: 500
                },
                hide: {
                    effect: "fade",
                    duration: 500
                },
                open: function () {
                    //Markieren ausschalten
                    $("#tblStandorteAuswahl").disableSelection();
                    //Hover Cursor festlegen
                    $("#tblStandorteAuswahl tbody tr").css("cursor", "pointer");
                    $("#tblStandorteAuswahl tbody").off("dblclick", "tr");
                    //Standort ausw�hlen und in Form einlesen
                    $("#tblStandorteAuswahl tbody").on("dblclick", "tr", function () {
                        var data = tblStandorteAuswahl.row(this).data();
                        if (gehoertZu.id == "berSuchenOrt") {
                            $("#ortBer").val(data[0]);
                        }
                        else if (gehoertZu.id == "ortSuchenMst") {
                            $("#ortMst").val(data[0]);
                        }
                        else if (gehoertZu.id == "anlAuswahlStd") {
                            $("#standortAllgemeinAnl").val(data[0]);
                        }
                        $("#standorteAuswahlContainer").dialog("close");
                    });
                }
            });
        }
    });
}
function orgPfadChange(element) {
    $(".orgPfad").val($(element).val());
    $("#orgID").val(organisationenliste[$(".orgPfad").prop("selectedIndex")].OrgID);
    readInstanzen("orgFirst", $(".orgPfad").prop("selectedIndex"));
    readInstanzen("liegFirst", 0);
    readInstanzen("berFirst", 0);
    readInstanzen("mstFirst", 0);
    readInstanzen("msmFirst", 0);
    readInstanzen("stdFirst", 0);
    readInstanzen("anlFirst", 0);
    readInstanzen("entFirst", 0);
    readInstanzen("enfFirst", 0);
    readInstanzen("eRngFirst", 0);
    readInstanzen("iMwFirst", 0);
    readInstanzen("zpFirst", 0);
    liegenschaftenEinlesen();
}
function liegPfadChange(element) {
    $(".liegPfad").val($(element).val());
    $("#liegID").val(liegenschaftenliste[$(".liegPfad").prop("selectedIndex")].LiegID);
    readInstanzen("liegFirst", $(".liegPfad").prop("selectedIndex"));
    readInstanzen("berFirst", 0);
    readInstanzen("mstFirst", 0);
    readInstanzen("msmFirst", 0);
    readInstanzen("stdFirst", 0);
    readInstanzen("anlFirst", 0);
    readInstanzen("entFirst", 0);
    readInstanzen("enfFirst", 0);
    readInstanzen("eRngFirst", 0);
    readInstanzen("iMwFirst", 0);
    readInstanzen("zpFirst", 0);
}

//TestBranchz Test
//function anlagenlistenSpaltenOptionenSpeichern() {
//    $.ajax({
//        type: 'POST',
//        async: true,
//        url: 'php/get_set_AnlagenlistenOrderUndSchema.php',
//        data: {
//            id: "setAnlSpalten",
//            nameDB: $("#nameDB").val(),
//        },
//        success: function (record) {
//            var anlSpOrdJson = $.parseJSON(record);
//            var anlagenspaltenOrder = [];
//            for (i = 1; i < anlSpOrdJson[0].length; i++) {
//                anlagenspaltenOrder[i] = anlSpOrdJson[0][i];
//            }
//            tblAnlagen.colReorder.order(anlagenspaltenOrder);
//        }
//    });
//}
function anlagenlistenSpaltenAnordnungEinlesen() {
    $.ajax({
        type: 'POST',
        async: true,
        url: 'php/get_set_AnlagenlistenOrderUndSchema.php',
        data: {
            id: "getAnlSpalten",
            nameDB: $("#nameDB").val(),
        },
        success: function (record) {
            var anlSpOrdJson = $.parseJSON(record);
            var anlSpOrdJson = anlSpOrdJson[0].toString().split(",");
            for (i = 0; i < anlSpOrdJson.length - 1; i++) {
            }
            tblAnlagen.colReorder.order(0, 1, anlSpOrdJson);
        }
    });
}
function anlagenlistenSchemaEinlesen() {
    $.ajax({
        type: 'POST',
        async: true,
        url: 'php/get_set_AnlagenlistenOrderUndSchema.php',
        data: {
            id: "getAnlSchema",
            nameDB: $("#nameDB").val(),
        },
        success: function (record) {
            var anlSchJson = $.parseJSON(record);
            var anlSchJson = anlSchJson[0].toString().split(",");
            for (i = 0; i < anlSchJson.length; i++) {
                tblAnlagen.column(i + 2).visible(!!+anlSchJson[i]);
                $(".anlListeCheckboxes").eq(i).prop("checked", !!+anlSchJson[i]);
            }
        }
    });
}

//ein/ausblenden von Formularbereichen
function toggleColumnsOnOff(element) {
    for (i = 0; i < tblAnlagen.columns().nodes().length; i++) {
        if ($(tblAnlagen.column(i).header()).text() == $(element).prop("value"))
            tblAnlagen.column(i).visible($(element).is(":checked"));
        tblAnlagen.columns.adjust().draw();
    }
}
function toggleExtDl(element){
  if($(element).prop("checked") == true){
    $("#tabExtDl").css("display","inline");
  }
  else {
    $("#tabExtDl").css("display","none");
  }
}
function toggleStandorteDritter(element){
  if($(element).prop("checked") == true){
      $(".stdDrExtDl").css("display","inline");
  }
  else{
      $(".stdDrExtDl").css("display","none");
      $(".stdDrExtDl input").val("");
  }
}
function toggleMandantOderMandantengruppe(sel){
  if(sel == "Mandantengruppe"){
      $("#manGruppenForm").css("display","block");
      $("#navDropBoxManGrp img").css("display","inline");

  }
  else{
      $("#manGruppenForm").css("display","none");
      $("#navDropBoxManGrp img").css("display","none");
  }
}
function toggleLabelUndLadenSymbol(){
  if($("#verwaltung").val() == "Anl"){
    ladenSymbolID = "#ladenSymbolAnl, #ladenLblAnl";
  }
  else if($("#verwaltung").val() == "Msm"){
    ladenSymbolID = "#ladenSymbolMsm, #ladenLblMsm";
  }
  else if($("#verwaltung").val() == "ERng") {
    ladenSymbolID = "#ladenSymbolERng, #ladenLblERng";
  }
  else {
    alert("Die Verwaltung konnte nicht festgestellt werden!");
    return false;
  }
  return ladenSymbolID;
}

function benutzerErstellen() {
    $.ajax({
        type: 'POST',
        async: true,
        url: '../php/setBenutzer.php',
        data: {
            id: "ben",
            mandant: $("#manAuswahlBen"),
            aendDatum: Date(),
            name: $("#nameBen").val(),
            vorname: $("#vornameBen").val(),
            benutzername: $("#benutzernameBen").val(),
            passwort: $("#passwortBen").val(),
            sichtAuswertungen: $("#sichtAuswertungenBen").val(),
            editAuswertungen: $("#editAuswertungenBen").val(),
            sichtStammdaten: $("#sichtStammdatenBen").val(),
            editStammdaten: $("#editStammdatenBen").val()
        },
        success: function () {
            alert("erfolgreich gespeichert!");
        }
    });
}
function readinLevel(element) {
    $("#levelAllgemeinBer").val($(element).prop("value"));
}
function vorgelagertenBereichAktivieren(element) {
    if ($(element).prop("value") == "4.1-Umwandlungserzeuger-T1" ||
        $(element).prop("value") == "4.2-Umwandlungserzeuger-T2" ||
        $(element).prop("value") == "5-Wiedereinspeisepunkt") {
        $("#vorgelagerteBereiche2AllgemeinBer").removeAttr("disabled");
    }
    else {
        $("#vorgelagerteBereiche2AllgemeinBer").val("");
        $("#vorgelagerteBereiche2AllgemeinBer").attr("disabled", "disabled");
    }
}
function createCustomField(whom) {
    if (whom == "std") {
        if ($("#custom1Std").css("display") == "none") {
            $("#custom1Std").css("display", "block");
        }
        else if ($("#custom2Std").css("display") == "none") {
            $("#custom2Std").css("display", "block");
        }
        else if ($("#custom3Std").css("display") == "none") {
            $("#custom3Std").css("display", "block");
        }
        else if ($("#custom4Std").css("display") == "none") {
            $("#custom4Std").css("display", "block");
        }
        else if ($("#custom5Std").css("display") == "none") {
            $("#custom5Std").css("display", "block");
        }
        else if ($("#custom6Std").css("display") == "none") {
            $("#custom6Std").css("display", "block");
        }
        else {
            $("#meldungCustomFields").css("display", "block");
            $("#meldungCustomFields").dialog();
        }
    }
    else {
        if ($("#" + whom + "FaktorX1").css("display") == "none") {
            $("#" + whom + "FaktorX1").css("display", "block");
        }
        else if ($("#" + whom + "FaktorX2").css("display") == "none") {
            $("#" + whom + "FaktorX2").css("display", "block");
        }
        else if ($("#" + whom + "FaktorX3").css("display") == "none") {
            $("#" + whom + "FaktorX3").css("display", "block");
        }
        else {
            $("#meldungCustomFields").css("display", "block");
            $("#meldungCustomFields").dialog();
        }
    }
}
function messmittelOderBerechnungslogik(element) {
    if ($(element).prop("value") == "automatisch" || $(element).prop("value") == "manuell") {
        $("#labelMessmittelMst").css("display", "inline-block");
        $("#labelBerechnungslogikMst").css("display", "none");
        $("#linkBerechnungslogikOderEingabemaske").text("Messmittel anlegen");
    }
    else {
        $("#labelMessmittelMst").css("display", "none");
        $("#labelBerechnungslogikMst").css("display", "inline-block");
        $("#linkBerechnungslogikOderEingabemaske").text("Berechnungslogik anlegen");
    }
}
function umlauteZuErsatzzeichenKonvertieren(string){
  var ersatzString = string.replace(/Ä/g,"Ae");
  ersatzString = ersatzString.replace(/ä/g,"ae");
  ersatzString = ersatzString.replace(/Ö/g,"Oe");
  ersatzString = ersatzString.replace(/ö/g,"oe");
  ersatzString = ersatzString.replace(/Ü/g,"Ue");
  ersatzString = ersatzString.replace(/ü/g,"ue");
  ersatzString = ersatzString.replace(/ß/g,"ss");

  return ersatzString;
}

function versorgerInHistorie(){
  var table = tblVersorgerHistorie
  var versorgerEvu = $("#versorgerEvuEnt").val();
  var versorgerUenb = $("#versorgerUenbEnt").val();
  var versorgerMsb = $("#versorgerMsbEnt").val();
  var gueltigkeit = $("#gueltigVomEnt").val() + " - " + $("#gueltigBisEnt").val();
  var rowCount = table.rows().count();

  $("#modusVers").val("neu");

  table
    .row.add([
      rowCount,
      versorgerEvu,
      versorgerUenb,
      versorgerMsb,
      gueltigkeit
      ])
    .column(0).visible(false)
    .order([0,"desc"])
    .draw();
}
function kategorieWaehlen() {
    $("#dokKategorieWaehlenFenster").css("display", "block");
    $("#dokKategorieWaehlenFenster").dialog({
        resize: "auto",
        show: {
            effect: "fade",
            duration: 500
        },
        hide: {
            effect: "fade",
            duration: 500
        }
    });
}
function dokumentAuswaehlenUndEinlesen(evt) {
  //console.log("1.Start dokumentAuswaehlenUndEinlesen");
  var file = evt.target.files[0];
  //console.log(file.name);
  var fileName = file.name;
  fileName = umlauteZuErsatzzeichenKonvertieren(fileName);
  //console.log(umlauteZuErsatzzeichenKonvertieren(fileName));
  var formData = new FormData();
  //console.log("2.Nach Zuweisung file Variable und Instanziierung des FormData Objekts");
  formData.append('file', file);
  formData.append('fileName',fileName);
  formData.append('nameDB',$("#nameDB").val());
  //console.log("3.nach formData.append: file, nameDB");
  var isImg = false;
  var imgVerw = false;
  var firstPartUrl = "uploadsDownloads/php/";
  var dokUploadsUrl = firstPartUrl + "upload.php";

  if (this.id == "imgUploadAnl") {
    var url = firstPartUrl + 'uploadImage.php';
    //console.log("image Upload Url " + url);
    isImg = true;
    imgVerw = "Anl";
  }
  else if (this.id == "imgUploadMsm") {
    var url = firstPartUrl + 'uploadImage.php';
    //console.log("image Upload Url " + url);
    isImg = true;
    imgVerw = "Msm";
  }
  else if (this.id == "dokuAuswahlAnl") {
    //console.log("4.Start der this.id == dokuAuswahlAnl Bedingung");
    formData.append('id',$("#anlID").val());
    formData.append('verwaltung',"Anl");
    formData.append('kategorie',$("#kategorie").val());
    //console.log("5.Nach formData.append: id, verwaltung, kategorie");
    var url = dokUploadsUrl;
    //console.log("6.Nach Zuweisung der Variable: url, also der Pfad zur PHP Datei");
  }
  else if (this.id == "dokuAuswahlMsm") {
    formData.append('id',$("#msmID").val());
    formData.append('verwaltung',"Msm");
    formData.append('kategorie',$("#kategorie").val());
    var url = dokUploadsUrl;
  }
  else if (this.id == "dokuAuswahlERng"){
    formData.append('id',$("#eRngID").val());
    formData.append('verwaltung',"ERng");
    formData.append('kategorie',$("#kategorie").val());
    var url = dokUploadsUrl;
  }

  var ladenSymbolID = toggleLabelUndLadenSymbol();

  $(ladenSymbolID).css("display", "inline");
  $.ajax({
      url: url,
      type: 'POST',
      data:  formData,
      processData: false,  // tell jQuery not to process the data
      contentType: false,  // tell jQuery not to set contentType
      success: function (data) {
        //console.log("7.Nach success Ajax-call");
        $(ladenSymbolID).css("display", "none");
          //console.log(data);
          if(isImg){
            var imgID;

            if(imgVerw == "Anl"){
              imgID = "#bildAllgemeinAnl";
            }
            else {
              imgID = "#bildAllgemeinMsm";
            }
            $(imgID).prop("src","uploadsDownloads/images/" + $("#nameDB").val() + "/" + data);
          }
          else{
            dokumentenListeErstellen();
          }
      }
  });
}
function dokumentAuswaehlenUndAuslesen(dateiName,dokID) {
  $("#dokID").val(dokID);
  dokumenteLoeschen(0,null);

  var ladenSymbolID = toggleLabelUndLadenSymbol();

  $(ladenSymbolID).css("display", "inline");

  $.ajax({
      url: 'uploadsDownloads/php/download.php',
      type: 'POST',
      data: {
          nameDB: $("#nameDB").val(),
          dateiName: dateiName,
          verwaltung: $("#verwaltung").val(),
          id: dokID
      },
      success: function (data) {
          //console.log(data);
          $(ladenSymbolID).css("display", "none");

          $("#downloadLink").prop("href","uploadsDownloads/docs/" + $("#nameDB").val() + "/" + data);
          $("#webViewerLink").prop("href","uploadsDownloads/docs/" + $("#nameDB").val() + "/" + data);

          $("#btnDokLoeschen").css("display","inline-block");
          $("#dokDlOderLoeschenContainer").dialog({
            height: 290,
            width: 240,
            resize: "auto"
          });
      }
  });
}
function dokumenteLoeschen(deleteMode, fileID){
  $.ajax({
      url: 'uploadsDownloads/php/dokumenteLoeschen.php',
      type: 'POST',
      data: {
          nameDB: $("#nameDB").val(),
          deleteMode: deleteMode,
          fileID: fileID
      },
      success: function (data) {
          //console.log(data);
          dokumentenListeErstellen();
      }
  });
}
function dokumentenListeErstellen() {
  var verwaltung = $("#verwaltung").val();
  var selDataTable = new Object;
  var id;

  if (verwaltung == "Anl") {
    id = $("#anlID").val();
    selDataTable = tblDokumenteAnl;

  }
  else if (verwaltung == "Msm") {
    id = $("#msmID").val();
    selDataTable = tblDokumenteMsm;
  }
  else {
    id = $("#eRngID").val();
  }

  $.ajax({
    url: 'php/getDokumente.php',
    type: 'POST',
    data: {
      nameDB: $("#nameDB").val(),
      verwaltung: $("#verwaltung").val(),
      id: id
    },
    fail: function () { alert("Fehler!!!");},
    success: function (records) {
      var selHtmlTable = "#tblDokumente" + verwaltung + " tbody";
      if(records != "null"){
        //console.log(records);
        var dokJson = JSON.parse(records);
        var dokJsonLength = dokJson.length;

        if(dokJsonLength > 0){
          if($("#verwaltung").val() == "ERng"){

            $("#aktuellesDokIDERng").val(dokJson[dokJsonLength - 1].dok_ID);
            $("#aktuellesDokNameERng").val(dokJson[dokJsonLength -1].nameDok);

            //Event Handler entfernen
            $("#aktuellesDokNameERng").off("dblclick");
            //standortdatenDritter auswählen und in Form einlesen
            $("#aktuellesDokNameERng").on("dblclick", function () {
              dokumentAuswaehlenUndAuslesen($("#aktuellesDokNameERng").val(),$("#aktuellesDokIDERng").val());
            });
          }
          else{
            selDataTable.clear().draw();
            for (var i = 0; i < dokJson.length; i++) {
              selDataTable.row.add([
                dokJson[i].dok_ID,
                dokJson[i].nameDok,
                dokJson[i].erweiterungDok,
                dokJson[i].kategorieDok
              ]).draw();
              selDataTable.column(0).visible(false);

              //Markieren ausschalten
              $(selHtmlTable + "tr").disableSelection();
              //Hover Cursor festlegen
              $(selHtmlTable + "tr").css("cursor", "pointer");
              //Event Handler entfernen
              $(selHtmlTable).off("dblclick", "tr");
              //standortdatenDritter auswählen und in Form einlesen
              $(selHtmlTable).on("dblclick", "tr", function () {
                var data = selDataTable.row(this).data();
                dokumentAuswaehlenUndAuslesen(data[1],data[0]);
              });
            }
          }
        }
        else{
          alert("Either no record was uploaded or an error occured, if an error occured, please contact the G-Analysis Team!");
        }
      }
      else{
        if($("#verwaltung").val() == "ERng"){
          $("#aktuellesDokIDERng").val("");
          $("#aktuellesDokNameERng").val("");
          $("#dokuAuswahlERng").val("");
          $("#dokuAuswahlERng").text("");
        }
        else{

        }
      }
    }
  });
}
function historieAendernFensterOeffnen(){
  $("#historieAendernContainerAnl").dialog({
    title: "Editor Anlagenhistorie",
    height: 1200,
    width: 900,

    });
}
function datensatzAusHistorieEinlesen(anlID){
  $.ajax({
    url: 'php/getHistorieDatensatz.php',
    type: 'POST',
    data: {
      nameDB: $("#nameDB").val(),
      anlID: anlID
    },
    fail: function () { alert("Fehler!!!");},
    success: function (records) {
      console.log(records);
        var insJson = JSON.parse(records);
        var nInsJson = insJson.length;

        $("#anlIDHist").val(insJson[0].anl_ID);
        $("#idAllgemeinAnlHist").val(insJson[0].anl_ID);
        $("#bereichAllgemeinAnlHist").val(insJson[0].nameBer);
        $("#berIDHist").val(insJson[0].ber_ID);
        $("#bildAllgemeinAnlHist").prop("src",insJson[0].bildAnl);
        $("#anlagennummerAllgemeinAnlHist").val(insJson[0].nummerAnl);
        $("#bezeichnungAllgemeinAnlHist").val(insJson[0].bezeichnungAnl);
        $("#aktivAllgemeinAnlHist").prop("checked", insJson[0].aktivAnl);
        $("#typAllgemeinAnlHist").val(insJson[0].typAnl);
        $("#serienNrAllgemeinAnlHist").val(insJson[0].serienNrAnl),
        $("#standortAllgemeinAnlHist").val(insJson[0].standortAnl);
        $("#baujahrAnlHist").val(insJson[0].baujahrAnl);
        $("#datumAnschaffungAllgemeinAnlHist").val(insJson[0].datumAnschaffungAnl);
        $("#betriebsstundenAllgemeinAnlHist").val(insJson[0].jahresbetriebsstundenAnl);
        $("#notizAllgemeinAnlHist").val(insJson[0].notizAnl);
        $("#gueltigVonAnlHist").val(insJson[0].gueltigVonAnl);
        $("#gueltigBisAnlHist").val(insJson[0].gueltigBisAnl);
        $("#produktAllgemeinAnlHist").val(insJson[0].produktAnl);
        $("#produktionsmenge1AllgemeinAnlHist").val(insJson[0].produktionsmengeAnl);
        $("#einheitProduktionsmenge1AllgemeinAnlHist").val(insJson[0].produktionsmengeEinheitAnl);
        $("#produktnummer1AllgemeinAnlHist").val(insJson[0].produktnummerAnl);
        $("#mehrProdukteAllgemeinAnlHist").prop("checked", insJson[0].mehrProdukteAnl);

        $("#zugeordneterVerbraucher1AllgemeinAnlHist").val(insJson[0].zugeordneterVerbraucher1);
        $("#zugeordneterVerbraucher2AllgemeinAnlHist").val(insJson[0].zugeordneterVerbraucher2);
        $("#zugeordneterVerbraucher3AllgemeinAnlHist").val(insJson[0].zugeordneterVerbraucher3);
        $("#zugeordneterVerbraucher4AllgemeinAnlHist").val(insJson[0].zugeordneterVerbraucher4);
        $("#zugeordneterVerbraucher5AllgemeinAnlHist").val(insJson[0].zugeordneterVerbraucher5);
        $("#zugeordneterVerbraucher6AllgemeinAnlHist").val(insJson[0].zugeordneterVerbraucher6);

        $("#energietraeger1AllgemeinAnlHist").val(insJson[0].energietraeger1Anl);
        $("#energieform1AllgemeinAnlHist").val(insJson[0].energieform1Anl);
        $("#einheit1AnlHist").val(insJson[0].einheitEnergie1Anl);
        $("#anschlussleistung1AnlHist").val(insJson[0].anschlussleistung1Anl);
        $("#mittlereAuslastungProzent1AnlHist").val(insJson[0].mittlereAuslastungProzent1Anl);
        $("#mittlereAuslastungKw1AnlHist").val(insJson[0].mittlereAuslastungKw1Anl);
        $("#betriebstemperatur1AnlHist").val(insJson[0].betriebstemperatur1Anl);
        $("#mst1AnlHist").val(insJson[0].messstelle1Anl);
        $("#ber1AnlHist").val(insJson[0].versBereich1Anl);
        $("#abwaerme1AnlHist").val(insJson[0].abwaerme1Anl);
        $("#nutzbarkeitAbwaerme1AnlHist").val(insJson[0].abwaermeNutzbarkeit1Anl);
        $("#bewertungNutzbarkeitAbwaerme1AnlHist").val(insJson[0].bewertungNutzbarkeitAbwaerme1Anl);

        $("#energietraeger2AllgemeinAnlHist").val(insJson[0].energietraeger2Anl);
        $("#energieform2AllgemeinAnlHist").val(insJson[0].energieform2Anl);
        $("#einheit2AnlHist").val(insJson[0].einheitEnergie2Anl);
        $("#anschlussleistung2AnlHist").val(insJson[0].anschlussleistung2Anl);
        $("#mittlereAuslastungProzent2AnlHist").val(insJson[0].mittlereAuslastungProzent2Anl);
        $("#mittlereAuslastungKw2AnlHist").val(insJson[0].mittlereAuslastungKw2Anl);
        $("#betriebstemperatur2AnlHist").val(insJson[0].betriebstemperatur2Anl);
        $("#mst2AnlHist").val(insJson[0].messstelle2Anl);
        $("#ber2AnlHist").val(insJson[0].versBereich2Anl);
        $("#abwaerme2AnlHist").val(insJson[0].abwaerme2Anl);
        $("#nutzbarkeitAbwaerme2AnlHist").val(insJson[0].abwaermeNutzbarkeit2Anl);
        $("#bewertungNutzbarkeitAbwaerme2AnlHist").val(insJson[0].bewertungNutzbarkeitAbwaerme2Anl);

        $("#energietraeger3AllgemeinAnlHist").val(insJson[0].energietraeger3Anl);
        $("#energieform3AllgemeinAnlHist").val(insJson[0].energieform3Anl);
        $("#einheit3AnlHist").val(insJson[0].einheitEnergie3Anl);
        $("#anschlussleistung3AnlHist").val(insJson[0].anschlussleistung3Anl);
        $("#mittlereAuslastungProzent3AnlHist").val(insJson[0].mittlereAuslastungProzent3Anl);
        $("#mittlereAuslastungKw3AnlHist").val(insJson[0].mittlereAuslastungKw3Anl);
        $("#betriebstemperatur3AnlHist").val(insJson[0].betriebstemperatur3Anl);
        $("#mst3AnlHist").val(insJson[0].messstelle3Anl);
        $("#ber3AnlHist").val(insJson[0].versBereich3Anl);
        $("#abwaerme3AnlHist").val(insJson[0].abwaerme3Anl);
        $("#nutzbarkeitAbwaerme3AnlHist").val(insJson[0].abwaermeNutzbarkeit3Anl);
        $("#bewertungNutzbarkeitAbwaerme3AnlHist").val(insJson[0].bewertungNutzbarkeitAbwaerme3Anl);

        $("#energietraeger4AllgemeinAnlHist").val(insJson[0].energietraeger4Anl);
        $("#energieform4AllgemeinAnlHist").val(insJson[0].energieform4Anl);
        $("#einheit4AnlHist").val(insJson[0].einheitEnergie4Anl);
        $("#anschlussleistung4AnlHist").val(insJson[0].anschlussleistung4Anl);
        $("#mittlereAuslastungProzent4AnlHist").val(insJson[0].mittlereAuslastungProzent4Anl);
        $("#mittlereAuslastungKw4AnlHist").val(insJson[0].mittlereAuslastungKw4Anl);
        $("#betriebstemperatur4AnlHist").val(insJson[0].betriebstemperatur4Anl);
        $("#mst4AnlHist").val(insJson[0].messstelle4Anl);
        $("#ber4AnlHist").val(insJson[0].versBereich4Anl);
        $("#abwaerme4AnlHist").val(insJson[0].abwaerme4Anl);
        $("#nutzbarkeitAbwaerme4AnlHist").val(insJson[0].abwaermeNutzbarkeit4Anl);
        $("#bewertungNutzbarkeitAbwaerme4AnlHist").val(insJson[0].bewertungNutzbarkeitAbwaerme4Anl);
        $("#custom1AnlHist").val(insJson[0].custom1Anl);
        $("#custom2AnlHist").val(insJson[0].custom2Anl);
        $("#custom3AnlHist").val(insJson[0].custom3Anl);
        $("#custom4AnlHist").val(insJson[0].custom4Anl);
        $("#custom5AnlHist").val(insJson[0].custom5Anl);
        $("#custom6AnlHist").val(insJson[0].custom6Anl);
    }
  });
}
function verbrauchBerechnen(id, energietraeger, einheit, menge) {
    $.ajax({
        type: 'POST',
        async: true,
        url: 'php/energietraegerVersorgerEinlesen.php',
        data: {
            id: id,
            nameDB: $("#nameDB").val(),
            energietraeger: energietraeger,
        },
        success: function (echo) {
            //console.log(echo);

            var insJson = JSON.parse(echo);

            var faktorKwh;
            if(insJson.length > 0){
            if (einheit == insJson[0].einheit1Ent) {
                faktorKwh = insJson[0].entEinh1FaktorKwh;
            }
            else if (einheit == insJson[0].einheit2Ent) {
                faktorKwh = insJson[0].entEinh2FaktorKwh;
            }
            else if (einheit == insJson[0].einheit3Ent) {
                faktorKwh = insJson[0].entEinh3FaktorKwh;
            }
            if(menge.indexOf(",") != -1){
              menge = formatNumber("deform",menge);
            }
            var verbrauch = menge * faktorKwh;
            verbrauch = verbrauch.toFixed(2);

            if (id == "mengeERng" || id == "einERng"){
              $("#mengeERng").val(formatNumber("form",menge));
              $("#verbrauchERng").val(formatNumber("form",verbrauch));
            }
            else if (id == "mengeIMw") {
              $("#mengeIMw").val(formatNumber("form",menge));
              $("#verbrauchIMw").val(formatNumber("form",verbrauch));
            }
          }
        }
    });
}
function einheitenEntEinlesen(energietraeger) {
    $.ajax({
        type: 'POST',
        async: true,
        url: 'php/getEngConsumptionData.php',
        data: {
            nameDB: $("#nameDB").val(),

            energietraeger: energietraeger,

        },
        success: function (echo) {
            //console.log(echo);

            var insJson = JSON.parse(echo);

            $("#einERng").empty();

            if (insJson.length > 0) {

                if (insJson[0].einheit1Ent != "" && insJson[0].einheit1Ent != null) {
                    $("#einERng").append("<option>" + insJson[0].einheit1Ent + "</option>");
                }
                if (insJson[0].einheit2Ent != "" && insJson[0].einheit2Ent != null) {
                    $("#einERng").append("<option>" + insJson[0].einheit2Ent + "</option>");
                }
                if (insJson[0].einheit3Ent != "" && insJson[0].einheit3Ent != null) {
                    $("#einERng").append("<option>" + insJson[0].einheit3Ent + "</option>");
                }
            }
        }
    });
}
function letzteRechnungenInTbl(mst) {
    $.ajax({
        type: 'POST',
        async: true,
        url: 'php/getRechnungen.php',
        data: {
            id: "letzteRng",
            nameMst: mst,
            nameDB: $("#nameDB").val()
        },
        success: function (records) {
            var rngJson = JSON.parse(records);
            var zeitraum;
            var verbrauch;

            tblLetzteRechnungen.clear().draw();
            for (i = 0; i < rngJson.length; i++) {
                zeitraum = rngJson[i].vomERng + "-" + rngJson[i].bisERng;
                verbrauch = rngJson[i].verbrauchERng;
                verbrauch = formatNumber("form", verbrauch);
                tblLetzteRechnungen.row.add([
                    zeitraum,
                    verbrauch
                ]).draw();
            }
            //tblLetzteRechnungen.draw();
        }
    });
}
function tblExterneRechnungenAuswertungsliste() {

};
function passwortAuswertenGipscAdm(){
  $("#gipscAdmZugang").dialog({
                  height: 180,
                  width: 250,
                  resize: "auto",
                  show: {
                      effect: "fade",
                      duration: 500
                  },
                  hide: {
                      effect: "fade",
                      duration: 500
                  }
              });
              $("#zugangOk").off("click");
              $("#zugangOk").on("click",function(){
                $.ajax({
                    type: 'POST',
                    async: true,
                    url: 'php/evalGipscAdmPw.php',
                    data: {
                    },
                    success: function (data) {
                      var pwJson = JSON.parse(data);
                      //console.log(pwJson);

                      var hashDB = pwJson[0].pw;
                      //console.log(hashDB);
                      hashDB.trim();

                      var hashInp = getHash($("#pwGipscAdm").val());
                      //console.log(hashInp);
                      hashInp.trim();

                      if(hashInp == hashDB){
                        $("#tabGipscAdm").css("background-color", "#CED6DE");
                        $("#infosGipscommAdmins").css("display", "block");
                        $("#activeInstance").val("gipscAdm");

                        $("#gipscAdmZugang").dialog("close");
                      }
                      else{
                        alert("Das Passwort ist falsch!");
                        $("#tabGipscAdm").css("background-color", "#B9C0C7");
                        $("#infosGipscommAdmins").css("display", "none");
                        $("#activeInstance").val("gipscAdm");

                        $("#gipscAdmZugang").dialog("close");

                        $("#tabBetrGrp").trigger("click");
                      }
                    }
                });
              });
}
function zaehlpunktNrInFeld(mst) {
    $.ajax({
        type: 'POST',
        async: true,
        url: 'php/getZaehlpunktNr.php',
        data: {
            ins: "zaehlpunkt",
            nameMst: mst,
            nameDB: $("#nameDB").val()
        },
        success: function (records) {
            var zpJson = JSON.parse(records);

            if (zpJson.length > 0){
                $("#zpNrERng").val(zpJson[0].zaehlpunktNr);
            }
        }
    });
}

//SpaEfV Tabelle 1
//Daten eingelesen
function SpaEfVTbl1Erstellen(modus, version, verdichtung, jahreSqlString){
  $.ajax({
      type: 'POST',
      async: true,
      url: 'php/Auswertungen/getSpaEfVTbl1Data.php',
      data: {
          nameDB: $("#nameDB").val(),
          modus: modus,
          version: version,
          verdichtung: verdichtung,
          jahreSqlString: jahreSqlString,
          liegID: $("#liegID").val(),
          orgID: $("#orgID").val()
      },
      success: function (records) {
          //console.log(records);
          var spaEfVJson = JSON.parse(records);
          var instanzName;

          if(modus == "gesamt"){
            if($("#orgCount").val() == 1){
              instanzName = $(".orgPfad").val();
            }
            else {
              instanzName = $(".manPfad").val();
            }
          }
          else if (modus == "organisation") {
            instanzName = $(".orgPfad").val();
          }
          else if (modus == "liegenschaft") {
            instanzName = $(".liegPfad").val();
          }

          //console.log(spaEfVJson);
          var spaEfVString = JSON.stringify(spaEfVJson);
          var einJahr;

          //console.log(spaEfVString);

          if($(".spaEfvJahreAuswahl[checked=true]").length == 1){
            einJahr = true;
          }
          else {
            einJahr = false;
          }
          //console.log($(".spaEfvJahreAuswahl [checked=true]").length);
          sessionStorage.setItem("jsonString", spaEfVString);
          sessionStorage.setItem("einJahr", einJahr);
          sessionStorage.setItem("instanzName", instanzName);
          window.open("SpaEfV_Tabelle_1.html","_blank");
      }
  });
}

//SpaEfV Tabelle 2
//Daten eingelesen
function SpaEfVTbl2Erstellen(modus, version, verdichtung, jahr){
  $.ajax({
      type: 'POST',
      async: true,
      url: 'php/Auswertungen/getSpaEfVTbl2Data.php',
      data: {
          nameDB: $("#nameDB").val(),
          teil: "verbrauch",
          modus: modus,
          version: version,
          verdichtung: verdichtung,
          jahr: jahr,
          liegID: $("#liegID").val(),
          orgID: $("#orgID").val()
      },
      success: function (records) {
          //console.log(records);
          var spaEfVJsonVerbrauch = JSON.parse(records);
          var instanzName;

          console.log("SpaEfVTbl2_Verbrauch");
          console.log(spaEfVJsonVerbrauch);
          var spaEfVVerbrauchString = JSON.stringify(spaEfVJsonVerbrauch);

          sessionStorage.setItem("jsonStringVerbrauch", spaEfVVerbrauchString);
      }
  });
  $.ajax({
      type: 'POST',
      async: true,
      url: 'php/Auswertungen/getSpaEfVTbl2Data.php',
      data: {
          nameDB: $("#nameDB").val(),
          teil: "anlagen",
          modus: modus,
          version: version,
          verdichtung: verdichtung,
          jahr: jahr,
          liegID: $("#liegID").val(),
          orgID: $("#orgID").val()
      },
      success: function (records) {
          //console.log(records);
          var spaEfVJsonAnlagen = JSON.parse(records);

          console.log("SpaEfVTbl2_Anlagen");
          console.log(spaEfVJsonAnlagen);
          var spaEfVAnlagenString = JSON.stringify(spaEfVJsonAnlagen);

          sessionStorage.setItem("jsonStringAnlagen", spaEfVAnlagenString);
      }
  });
  $.ajax({
      type: 'POST',
      async: true,
      url: 'php/Auswertungen/getSpaEfVTbl2Data.php',
      data: {
          nameDB: $("#nameDB").val(),
          teil: "messstellen",
          modus: modus,
          version: version,
          verdichtung: verdichtung,
          jahr: jahr,
          liegID: $("#liegID").val(),
          orgID: $("#orgID").val()
      },
      success: function (records) {
          //console.log(records);
          var spaEfVJsonMessstellen = JSON.parse(records);

          if(modus == "gesamt"){
            if($("#orgCount").val() == 1){
              instanzName = $(".orgPfad").val();
            }
            else {
              instanzName = $(".manPfad").val();
            }
          }
          else if (modus == "organisation") {
            instanzName = $(".orgPfad").val();
          }
          else if (modus == "liegenschaft") {
            instanzName = $(".liegPfad").val();
          }

          console.log("SpaEfVTbl2_Messstellen");
          console.log(spaEfVJsonMessstellen);
          var spaEfVMessstellenString = JSON.stringify(spaEfVJsonMessstellen);

          sessionStorage.setItem("instanzName", instanzName);
          sessionStorage.setItem("jsonStringMessstellen", spaEfVMessstellenString);
          setTimeout(openWindow, 2000);
          function openWindow(){
            window.open("SpaEfV_Tabelle_2.html","_blank");
          }
      }
  });
}

function getModusSpaEfV(tabelle){
  var modus;

  if($("#mandantGesamtSpaEfVTbl" + tabelle).prop("checked")){
      modus = "gesamt";
  }
  else if($("#organisationSpaEfVTbl" + tabelle).prop("checked")){
      modus = "organisation";
  }
  else if ($("#liegenschaftSpaEfVTbl" + tabelle).prop("checked")){
      modus = "liegenschaft";
  }
  else{
    alert("getting the SpaEfV mode failed!! :func getModusSpaEfV(tabelle)");
  }

  return modus;
}
function getVersionSpaEfV(tabelle){
  var version;

  if($("#basisSpaEfVTbl" + tabelle).prop("checked")){
    version = "basis";
  }
  else if ($("#benutzerdefiniertSpaEfVTbl" + tabelle).prop("checked")){
    version = "benutzerdefiniert";
  }
  else {
    alert("getting the SpaEfV version failed!! :func getVersionSpaEfV(tabelle)")
  }
  return version;
}
function detailAuswahlAnzeigenSpaEfV(isDetail , tabelle){
  var displayMode;

  if(isDetail){
    displayMode = "inline";
  }
  else{
    displayMode = "none";
  }
  $(".spaEfVBenutzerdefiniert" + tabelle).css("display", displayMode);
}
function getVerdichtungSpaEfV(tabelle){
  var verdichtung;
  if(tabelle == 1){
    if($("#entsVerdichtetSpaEfVTbl1").prop("checked")){
      verdichtung = "verdichtet";
    }
    else if ($("#entsUnverdichtetSpaEfVTbl1").prop("checked")) {
      verdichtung = "unverdichtet";
    }
  }
  else if (tabelle == 2) {
    if($("#entsVerdichtet1SpaEfVTbl2").prop("checked")){
      verdichtung = "verdichtet1";
    }
    else if($("#entsVerdichtet2SpaEfVTbl2").prop("checked")){
      verdichtung = "verdichtet2";
    }
    else if ($("#entsUnverdichtetSpaEfVTbl2").prop("checked")) {
      verdichtung = "unverdichtet";
    }
  }
  else {
    alert("getting the SpaEfV verdichtung failed!! :func getVerdichtungSpaEfV(tabelle)");
  }
  return verdichtung;
}

function getJahr(){
  console.log("in getJahr");
}
function getRechnungsjahre(modus){
  $.ajax({
      type: 'POST',
      async: true,
      url: 'php/getRechnungsjahre.php',
      data: {
          nameDB: $("#nameDB").val(),
          modus: modus,
          liegID: $("#liegID").val(),
          orgID: $("#orgID").val()
      },
      success: function (records) {
          var spaEfVJahreJson = JSON.parse(records);
          //console.log(spaEfVJahreJson);

          var stringStart = "<input class='spaEfvJahreAuswahl' type='checkbox'/><label>";
          var stringEnd = "</label><br>";
          var stringJahre;

          //Remove old Elements from div
          $("#jahreSpaEfVBenutzerdef").empty();
          for(var i = 0; i < spaEfVJahreJson.length; i++){
            stringJahre = stringStart + spaEfVJahreJson[i].Jahr + stringEnd;
            $("#jahreSpaEfVBenutzerdef").append(stringJahre);
          }
      }
  });
}
function getModusDarzustellendeJahreSpaEfV1(){
  var darzustellendeJahre;

  if($("#jahreLetzte5SpaEfVTbl1").prop("checked")){
    darzustellendeJahre = "letzte5";
  }
  else if ($("#jahreBenutzerdefSpaEfVTbl1").prop("checked")) {
    darzustellendeJahre = "benutzerdefJahre";
  }
  return darzustellendeJahre;
}
function getModusJahrSpaEfV2(){
  var darzustellendesJahr;

  if($("#letztesJahrSpaEfVTbl2").prop("checked")){
    darzustellendesJahr = "letztesJahr";
  }
  else if ($("#benutzerdefJahrSpaEfVTbl2").prop("checked")) {
    darzustellendesJahr = "benutzerdefJahr";
  }
  return darzustellendesJahr;
}
function getJahresstringBenutzerdefSpaEfV1(version, darzustellendeJahre){
  var chk = $(".spaEfvJahreAuswahl");
  var lblChk = $(".spaEfvJahreAuswahl ~ label");
  var nClassElements = chk.length;
  var isFirst = true;
  var sqlString = "";
  var letzte5Jahre = "Jahr > RIGHT(CONVERT(varchar(20), getdate(), 104), 4) - 5 ";

  if(version == "basis"){
    sqlString += letzte5Jahre;
  }
  else if (version == "benutzerdefiniert") {
    if(darzustellendeJahre == "letzte5"){
      sqlString += letzte5Jahre;
    }
    else if (darzustellendeJahre == "benutzerdefJahre") {
      for(var n = 0; n < nClassElements; n++){
        if(chk.eq(n).prop("checked") && isFirst){
          sqlString += "Jahr = '" + lblChk.eq(n).text() + "' ";
          isFirst = false;
        }
        else if(chk.eq(n).prop("checked")){
          sqlString += "OR Jahr = '" + lblChk.eq(n).text() + "' ";
        }
        else if(!chk.eq(n).prop("checked")){
          //Doing nothing
        }
        else {
          alert("getting the SpaEfV Benutzerdefinierte Jahre failed!! :func getJahresstringSpaEfVBenutzerdef()");
        }
      }
    }
    else {
      alert("getting the SpaEfV Jahres Modus failed!! :func getJahresstringSpaEfVBenutzerdef()");
    }
  }
  else {
    alert("getting the SpaEfV Jahresstring failed!! :func getJahresstringSpaEfVBenutzerdef()");
  }
  return sqlString;
}
function resetBenutzerdefJahreSpaEfVTbl1(){
  $(".spaEfvJahreAuswahl").prop("checked", false);
  $("#jahreSpaEfVBenutzerdef").css("display", "none");
}

//Verlauf nach Änderung der Parameter aktualisieren
function vergleichUpdaten(elementID){
  var suchString = [];
  var summeVerbrauch = 0;
  var summeKosten = 0;
  var feldSummeVerbrauch;
  var feldSummeKosten;
  var tabelle;

  if (elementID == "jahr1ERng" || elementID == "monate1ERng" || elementID == "vergEnt1ERng") {
    tabelle = tblAuswertung1ERng;
    //suchString = $("#jahr1ERng").val() + " " + $("#monate1ERng").prop("value") + " " + $("#vergEnt1ERng").val();
    suchString = [$("#jahr1ERng"), $("#monate1ERng"), $("#vergEnt1ERng")];
    feldSummeVerbrauch = $("#summeVerbr1ERng");
    feldSummeKosten = $("#summeKosten1ERng");
  }
  else {
    tabelle = tblAuswertung2ERng;
    suchString = [$("#jahr2ERng"), $("#monate2ERng"), $("#vergEnt2ERng")];
    feldSummeVerbrauch = $("#summeVerbr2ERng");
    feldSummeKosten = $("#summeKosten2ERng");
  }

  tabelle.search("").draw();

  var spalteMonate;
  var sucheMonate;

  tabelle.columns().search("");
  tabelle.columns(5)
  .search(suchString[0].val())
  .draw();
  if (suchString[1].prop("value").length > 2) {
    tabelle.columns(8, { search: 'applied' })
    .search(suchString[1].prop("value"))
    .draw();
  }
  else {
    tabelle.columns(6, { search: 'applied' })
    .search(suchString[1].prop("value"))
    .draw();
  }

  if($("#" + elementID + " option:selected").prop("title") == "gesamt"){
    tabelle.columns(4, { search: 'applied' })
    .search(suchString[2].val())
    .draw();
  }
  else{
    tabelle.columns(3, { search: 'applied' })
    .search(suchString[2].val())
    .draw();
  }
  tabelle.column(9, { search: 'applied' }).data().each(function (value) {
    var number = value;

    number = formatNumber("deform", number);
    number = parseFloat(number)

    summeVerbrauch += number;
  });
  summeVerbrauch = summeVerbrauch.toString();
  var splitNumVerbrauch = summeVerbrauch.split(".");

  if ($.isNumeric(splitNumVerbrauch[1])) {
    if (splitNumVerbrauch[1].length > 3) {
      summeVerbrauch = splitNumVerbrauch[0] + "." + splitNumVerbrauch[1].substr(0, 2);
    }
  }

  tabelle.column(10, { search: 'applied' }).data().each(function (value) {
    var kosten = value;
    var splitNum = kosten.split(".");

    kosten = formatNumber("deform", kosten);
    kosten = parseFloat(kosten);
    summeKosten += kosten;

  });
  summeKosten = summeKosten.toString();
  var splitNumKosten = summeKosten.split(".");

  if ($.isNumeric(splitNumKosten[1])) {
    if (splitNumKosten[1].length > 3) {
      summeKosten = splitNumKosten[0] + "." + splitNumKosten[1].substr(0, 1);
    }
  }

  tabelle.order([6, "asc"]).draw();

  summeVerbrauch = formatNumber("form", summeVerbrauch);
  summeKosten = formatNumber("form", summeKosten);

  feldSummeVerbrauch.val(summeVerbrauch);
  feldSummeKosten.val(summeKosten);

  $("#sumVerbr1ERng").val($("#summeVerbr1ERng").val());
  $("#sumVerbr2ERng").val($("#summeVerbr2ERng").val());
  $("#sumKosten1ERng").val($("#summeKosten1ERng").val());
  $("#sumKosten2ERng").val($("#summeKosten2ERng").val());

  var summeVerb1 = formatNumber("deform", $("#sumVerbr1ERng").val());
  var summeVerb2 = formatNumber("deform", $("#sumVerbr2ERng").val());
  summeVerb1 = parseFloat(summeVerb1);
  summeVerb2 = parseFloat(summeVerb2);

  var diffVerb = summeVerb2 - summeVerb1;
  diffVerb = diffVerb.toFixed(3);
  diffVerb = formatNumber("form", diffVerb);

  var summeKosten1 = formatNumber("deform", $("#sumKosten1ERng").val());
  var summeKosten2 = formatNumber("deform", $("#sumKosten2ERng").val());
  summeKosten1 = parseFloat(summeKosten1);
  summeKosten2 = parseFloat(summeKosten2);

  var diffKosten = summeKosten2 - summeKosten1;
  diffKosten = diffKosten.toFixed(2);
  diffKosten = formatNumber("form", diffKosten);

  $("#diffVerbr12ERng").val(diffVerb);
  $("#diffKosten12ERng").val(diffKosten);
}
function formatNumber(modus, number) {
    var num;

    if($.isNumeric(number)){
        num = number.toString();
    }
    else {
        num = number.toString();
    }

    var numFormatted = "";
    var arr = [];

    arr = num.split(".");

    var j = 0;

    if (modus == "form") {
        for (k = arr[0].length - 1; k > -1; k--) {
            j++;
            if (j == 3 && k != 0) {
                numFormatted = "." + arr[0].charAt(k) + numFormatted;
                j = 0;
            }
            else {
                if(arr[0].charAt(0) )
                numFormatted = arr[0].charAt(k) + numFormatted;
            }
        }
        if ($.isNumeric(arr[1])) {
            numFormatted = numFormatted + "," + arr[1];
        }
        else {
            numFormatted = numFormatted + ",00";
        }
        numFormatted = numFormatted.replace("-.", "-");
    }
    else if (modus == "deform") {
      if(number.indexOf(",")>-1){
        for (l = 0; l < arr.length; l++) {
            numFormatted += arr[l];
        }
      }
      else {
          numFormatted = number;
      }
        numFormatted = numFormatted.replace(",", ".");
    }
    return numFormatted;
}

function menuUndMainZentrieren() {

    var widthLeft;



    widthLeft = 1 / 2 * ($(window).innerWidth() - $("#main").width());

    $("#main").css("left", widthLeft + "px");
    $("#asideRight").css("left", (widthLeft + parseInt($("#main").width())) + "px");
    $("#asideLeft").css("left", (widthLeft - parseInt($("#asideLeft").width())-2) + "px");


    if ($(".manPfad").css("display") != "none") {

        $(".clearfix").css("margin-left", (widthLeft - 20) + "px");

    }

    else {

        $(".clearfix").css("margin-left", ((widthLeft + 55) + "px"));

    }

}
function versorgerUndEinheitBefuellen() {
    var ent = $("#entERng").val();

    if(ent != ""){
      ent = $("#entERng").val()
    }
    else {
      ent = "";
    }
    $.ajax({
        type: 'POST',
        async: true,
        url: 'php/energietraegerVersorgerEinlesen.php',
        data: {
            id:"versEinh",
            nameDB: $("#nameDB").val(),
            energietraeger: ent
        },

        success: function (records) {
            console.log(records);
            var insJson = JSON.parse(records);

            $("#versorgerERng, #versorgerIMw, #einERng").empty();
            if(insJson.length > 0){
              if (insJson[0].versorgerEvu != ""){
                  $("#versorgerERng, #versorgerIMw").append("<option selected>" + insJson[0].versorgerEvu + "</option>");
              }
              if(insJson[0].versorgerUenb != ""){
                  $("#versorgerERng, #versorgerIMw").append("<option>" + insJson[0].versorgerUenb + "</option>");
              }
              if(insJson[0].versorgerMsb != ""){
                 $("#versorgerERng, #versorgerIMw").append("<option>" + insJson[0].versorgerMsb + "</option>");
              }
              if (insJson[0].einheit1Ent != ""){
                  $("#einERng").append("<option selected>" + insJson[0].einheit1Ent + "</option>");
              }
              if(insJson[0].einheit2Ent != ""){
                  $("#einERng").append("<option>" + insJson[0].einheit2Ent + "</option>");
              }
              if(insJson[0].einheit3Ent != ""){
                 $("#einERng").append("<option>" + insJson[0].einheit3Ent + "</option>");
              }
           }
        }
    });
}
var mandantenliste = [];
function mandant (nameDB, manID, name) {
        this.nameDB = nameDB;
        this.manID = manID;
        this.name = name;
 }
function mandantenEinlesen(betrGrpID, ins, manOderManGrpID) {
    $.ajax({
        type: 'POST',
        async: true,
        url: 'php/mandantenEinlesen.php',
        data: {
            betrGrpID: betrGrpID,
            ins : ins,
            manOderManGrpID: manOderManGrpID
        },
        success: function (records) {
            console.log(records);
            var insJson = JSON.parse(records);

            mandantenInDropbox(insJson);
        }
    });
}
function mandantenInDropbox(insJson) {
    $(".manPfad").empty();
    for (var i = 0; i < insJson.length; i++) {

        mandantenliste[i] = new mandant(insJson[i].dbName,
                                        insJson[i].man_ID,
                                        insJson[i].nameMan
                                        );

        $(".manPfad").append("<option>" + mandantenliste[i].name + "</option>");
    }
    $("#manID").val(mandantenliste[0].manID);
    readInstanzen("manFirst",null);
    readInstanzen("orgFirst", 0);
    dbFuerEnergietraegerFestlegen($("#nameDB").val());
    energietrInDBoxLieg();
    energiefrmInDBoxLieg();
    liegenschaftenEinlesen();
                        readInstanzen("liegFirst", 0);
                        liegNavID = 0;
                        energietrInDBoxBer();
                        readInstanzen("berFirst", 0);
                        berNavID = 0;
                        readInstanzen("mstFirst", 0);
                        mstNavID = 0;
                        readInstanzen("msmFirst", 0);
                        msmNavID = 0;
                        readInstanzen("stdFirst", 0);
                        stdNavID = 0;
                        readInstanzen("anlFirst", 0);
                        anlNavID = 0;
                        readInstanzen("entFirst", 0);
                        entNavID = 0;
                        readInstanzen("enfFirst", 0);
                        enfNavID = 0;
                        readInstanzen("eRngFirst", 0);
                        eRngNavID = 0;
                        readInstanzen("iMwFirst", 0);
                        iMwNavID = 0;
                        readInstanzen("zpFirst", 0);
                        zpNavID = 0;
}

var betrGrpListe = [];
function betrGrp (firma, betrGrpID) {
  this.firma = firma;
  this.betrGrpID = betrGrpID;
}
function betrGrpEinlesen(){
  $.ajax({

      type: 'POST',

      async: true,

      url: 'php/betrGrpEinlesen.php',

      data: {

          nameDB: "gipscomm"

      },

      success: function (records) {

          var insJson = JSON.parse(records);

          betrGrpInDropbox(insJson);
      }

  });
}
function betrGrpInDropbox(insJson){
    $(".betrPfad").empty();
    for(n = 0; n < insJson.length; n++){
      betrGrpListe[n] = new betrGrp(insJson[n].firma, insJson[n].betrGrp_ID);
      $(".betrPfad").append("<option>" + betrGrpListe[n].firma + "</option>");
    }
}

var manGrpListe = [];
function manGrp(name, manGrpID){
  this.name = name;
  this.manGrpID = manGrpID;
}
function manGrpEinlesen(){
  $.ajax({
      type: 'POST',
      async: true,
      url: 'php/manGrpEinlesen.php',
      data: {
          nameDB: "gipscomm",
          betrGrpID : $("#betrGrpID").val(),
          manID: $("manID").val()
      },
      success: function (records) {
          var insJson = JSON.parse(records);

          manGrpInDropbox(insJson);
      }
  });
}
function manGrpInDropbox(insJson){
    $(".manGrpPfad").empty();
    $(".manGrpPfad").append("<optgroup label='Mandantengruppen'>");
    $(".manGrpPfad").append("</optgroup>");
    for(n = 0; n < insJson.length; n++){
      manGrpListe[n] = new manGrp(insJson[n].name, insJson[n].manGrp_ID);
      $(".manGrpPfad optgroup").append("<option id='optManGrp_" + n + "'>" + manGrpListe[n].name + "</option>");
    }

    $(".manGrpPfad").append("<optgroup label='Mandanten'>");
    $(".manGrpPfad").append("</optgroup>");

    var nrMandanten = $(".manPfad option").length / $(".manPfad").length;

    for(m = 0;m < nrMandanten;m++){
      $(".manGrpPfad optgroup").eq(1).append("<option id='optMan_" + m + "'>" + $(".manPfad option").eq(m).text() + "</option>");
      $(".manGrpPfad optgroup").eq(3).append("<option id='optMan_" + m + "'>" + $(".manPfad option").eq(m).text() + "</option>");
    }
}

var organisationenliste = [];
var organisation = {
    Name: "",
    OrgID: ""
}
function organisationenEinlesen() {
    $.ajax({
        type: 'POST',
        async: true,
        url: 'php/organisationenEinlesen.php',
        data: {
            nameDB: $("#nameDB").val()
        },
        success: function (records) {
            var insJson = JSON.parse(records);
            console.log(insJson);
            organisationenInDropbox(insJson);
        }
    })
}
function organisationenInDropbox(insJson) {
    $(".orgPfad").empty();
    organisationenliste = [];
    organisation.Name = "";
    organisation.OrgID = "";

    for (var i = 0; i < insJson.length; i++) {
        organisation.Name = insJson[i].nameOrg;
        organisation.OrgID = insJson[i].org_ID;
        organisationenliste[i] = organisation;
        $(".orgPfad").append("<option>" + organisationenliste[i].Name + "</option>");
    }
    liegenschaftenEinlesen();
}

var liegenschaftenliste = [];
var liegenschaft = {
    Name: "",
    LiegID: ""
}
function liegenschaftenEinlesen() {
    $.ajax({
        type: 'POST',
        async: true,
        url: 'php/liegenschaftenEinlesen.php',
        data: {
            nameDB: $("#nameDB").val(),
            orgID: $("#orgID").val()
        },
        success: function (records) {
            var insJson = JSON.parse(records);
            liegenschaftenInDropbox(insJson);
        }
    })
}
function liegenschaftenInDropbox(insJson) {
    $(".liegPfad").empty();
    liegenschaftenliste = [];
    liegenschaft.Name = "";
    liegenschaft.LiegID = "";

    for (var i = 0; i < insJson.length; i++) {
        liegenschaft.Name = insJson[i].nameLieg;
        liegenschaft.LiegID = insJson[i].lieg_ID;
        liegenschaftenliste[i] = liegenschaft;
        $(".liegPfad").append("<option>" + liegenschaftenliste[i].Name + "</option>");

    }

}

var bereicheliste = [];
var Bereich = function(nameOrg, nameLieg, nameBer, berID){

    this.nameOrg = nameOrg;

    this.nameLieg = nameLieg;

    this.nameBer = nameBer;

    this.berID = berID;

}
function bereicheAnzeigenEinlesen(element) {

    $.ajax({

        type: 'POST',

        async: true,

        url: 'php/getBereiche.php',

        data: {

            nameDB: $("#nameDB").val()

        },

        success: function (records) {

            var insJson = JSON.parse(records);



            bereicheInTabelle(element, insJson);

        }

    })



}
function bereicheEinlesen(element) {
    $.ajax({
        type: 'POST',
        async: true,
        url: 'php/getBereiche.php',
        data: {
            nameDB: $("#nameDB").val()
        },
        success: function (records) {
            var insJson = JSON.parse(records);

            bereicheInTabelle(element,insJson);
        }
    });
}
function bereicheInTabelle(element,insJson) {

    $("#bereichWaehlen tr").not("#bereichWaehlen tr:nth-child(1)").remove();

    bereicheliste = [];



    for (var i = 0; i < insJson.length; i++) {



        bereicheliste[i] = new Bereich(insJson[i].nameOrg, insJson[i].nameLieg,

                                        insJson[i].nameBer, insJson[i].ber_ID);



                var tabZeile = "<tr class='bereichX'>";

                tabZeile += "<td>" + bereicheliste[i].nameOrg + "</td>";

                tabZeile += "<td>" + bereicheliste[i].nameLieg + "</td>";

                tabZeile += "<td>" + bereicheliste[i].nameBer + "</td>";

                tabZeile += "<td style='display:none;'>" + bereicheliste[i].berID + "</td>";

                tabZeile += "</tr>";



                $("#tblBereicheAnl").append(tabZeile);

            }



            $("#bereichWaehlen").css("display", "block");

            $("#bereichWaehlen").dialog({

                height: 400,

                width: 500,

                resize: "auto",



                show: {

                    effect: "fade",

                    duration: 500

                },

                hide: {

                    effect: "fade",

                    duration: 500

                },

                open: function () {

                    $("#tblBereicheAnl").disableSelection();

                    $("#sucheBereichAnl").val("");

                    $(".bereichX").on("dblclick", function () {

                        $("#berID").val($(this).children("td:nth-child(4)").text());

                        $("#ber").text($(this).children("td:nth-child(3)").text());

                        $("#bereichAllgemeinAnl").val($(this).children("td:nth-child(3)").text());

                        $("#bereichWaehlen").dialog("close");

                        if (element.id == "ber") {

                            clearFields("anlHinz");

                            readInstanzen("anlFirst", 0);

                        }

                    })

                    $(".berDialogButton").click(function () {

                        $("#bereichWaehlen").dialog("close");

                    });

                    $("#berSuchenAnl, #berResetAnl").click(function () {

                        if(this.id != "berResetAnl"){

                            var suchwort = $("#sucheBereichAnl").val();

                        }

                        else {

                            $("#sucheBereichAnl").val("");

                            suchwort = "";

                        }





                        $("#tblBereicheAnl tr").not("#tblBereicheAnl tr:nth-child(1)").remove();

                        for (var i = 0; i < bereicheliste.length; i++) {

                            var berStr = bereicheliste[i].nameBer;

                            var liegStr = bereicheliste[i].nameLieg;

                            var orgStr = bereicheliste[i].nameOrg;



                            var berVal = berStr.indexOf(suchwort);

                            var liegVal = liegStr.indexOf(suchwort);

                            var orgVal = orgStr.indexOf(suchwort);



                            if (berVal != -1 || liegVal != -1 || orgVal != -1 || suchwort == "") {

                                var tabZeile = "<tr class='bereichX'>";

                                tabZeile += "<td>" + bereicheliste[i].nameOrg + "</td>";

                                tabZeile += "<td>" + bereicheliste[i].nameLieg + "</td>";

                                tabZeile += "<td>" + bereicheliste[i].nameBer + "</td>";

                                tabZeile += "<td style='display:none;'>" + bereicheliste[i].berID + "</td>";

                                tabZeile += "</tr>";



                                $("#tblBereicheAnl tbody").append(tabZeile);

                            }

                            $("#tblBereicheAnl").DataTable({

                                dom: 'Bgrtip',

                                buttons: [

                                    'excel', 'pdf'

                                ]

                            });

                        }

                        $(".bereichX").on("dblclick", function () {

                            $("#berID").val($(this).children("td:nth-child(4)").text());

                            $("#ber").text($(this).children("td:nth-child(3)").text());

                            $("#bereichAllgemeinAnl").val($(this).children("td:nth-child(3)").text());

                            $("#bereichWaehlen").dialog("close");

                            if (element.id == "ber") {

                                clearFields("anlHinz");

                                readInstanzen("anlFirst", 0);

                            }

                        });

                    })



                }

            });

            $("#anlListeContainer").dialog("close");

}
function dbFuerEnergietraegerFestlegen(value){

    if (value == "Global") {

        entDB = "gipscomm";

    }

    else {

        entDB = $("#nameDB").val();

    }

}
function energietrInDBoxBer() {
    //Energietr�ger der jeweiligen Liegenschaft als Auswahl in Bereiche einlesen
    $(".entBer option").remove();

    for (i = 1; i < 5; i++) {
        if ($("#energietraeger" + i + "Lieg").val() != null) {
            $(".entBer").append("<option>" + $('#inputEnergietraeger' + i + 'Lieg').val() + "</option>");
        }
    }

}
function energietrInDBoxLieg() {
    $.ajax({
        type: 'POST',
        async: true,
        url: 'php/energietraegerVersorgerEinlesen.php',
        data: {
          id: "ent",
          nameDB: $("#nameDB").val(),
          liegID: $("#liegID").val()
        },
        success: function (records) {
            var insJson = $.parseJSON(records);

            $(".energietraegerLieg").empty();
            $(".energietraegerLieg").append("<option></option>");
            $(".energietraegerLieg").append("<option>-Energieträger hinzufügen-</option>");

            for (i = 0; i < insJson.length; i++) {
                $(".energietraegerLieg").append("<option>" + insJson[i].nameEnt + "</option>");
            }
            energietrInDBoxBer();
          }
    });
}
function energietrInDBoxERngVergleich() {
    $.ajax({
        type: 'POST',
        async: true,
        url: 'php/energietraegerVersorgerEinlesen.php',
        data: {
          id: "ent",
          nameDB: $("#nameDB").val(),
          liegID: $("#liegID").val()
        },
        success: function (records) {
            var insJson = $.parseJSON(records);
            var test = false
            var hilfsArr = [];
            var dropBoxString = "<option></option>";

            for (var i = 0; i < insJson.length; i++) {
              test = false;
              for(var j = 0; j < hilfsArr.length; j++){
                if(insJson[i].allgemeinerEnt == hilfsArr[j]){
                  test = true;
                  break;
                }
             }
             if(!test){
               dropBoxString += "<optgroup label='" + insJson[i].allgemeinerEnt + "'>";
               dropBoxString += "<option title='gesamt'>" + insJson[i].allgemeinerEnt + "</option>";
               hilfsArr[hilfsArr.length] = insJson[i].allgemeinerEnt;
               for(var k = 0; k < insJson.length; k++){
                 if(insJson[k].allgemeinerEnt == insJson[i].allgemeinerEnt){
                   dropBoxString += "<option>" + insJson[k].nameEnt + "</option>"
                 }
               }
               dropBoxString += "</optgroup>";
             }
           }
           $(".energietraegerVergl").empty();
           console.log(dropBoxString);
           $(".energietraegerVergl").append(dropBoxString);
        }
    });
}
function energiefrmInDBoxLieg() {

    $.ajax({
        type: 'POST',
        async: true,
        url: 'php/checkboxenDerEntEnfEinlesen.php',
        data: {
            id: "enfLieg",
            nameDB: $("#nameDB").val()
        },

        success: function (records) {
            var insJson = $.parseJSON(records);

            $(".energieformenLieg").empty();
            $(".energieformenLieg").append("<option></option>");

            for (i = 0; i < insJson.length; i++) {
                if (insJson[i].aktivEnf == 1) {
                    $(".energieformenLieg").append("<option>" + insJson[i].nameEnf + "</option>");
                }
            }
        }
    });

}
function energieformenEinAusblenden(){
  if($("#interneEnergieformenLieg").css("display") == "block"){
    $("#interneEnergieformenLieg select").val("");
    $("#interneEnergieformenLieg").css("display","none");
  }
  else {
    $("#interneEnergieformenLieg").css("display","block");
  }
}
function anlagenGruppenEinlesen(){
  $.ajax({

      type: 'POST',
      async: true,
      url: 'php/anlGrpEinlesen.php',
      data: {
          nameDB: $("#nameDB").val()
      },

      success: function (records) {

          var insJson = JSON.parse(records);

          $("#lblCustom1Anl, #lblCustom2Anl, #lblCustom3Anl, #lblCustom4Anl, #lblCustom5Anl, #lblCustom6Anl")
            .text("");

          for(i = 0; i < insJson.length; i++){
            $("#lblCustom" + (i+1) + "Anl").text(insJson[i].name);
            $("#tblAnlagenListe2 thead tr th").eq(i + 3).text(insJson[i].name);

            var optionenString = insJson[i].optionen;
            var optionen = optionenString.split(",");

            $("#custom" + (i+1) + "Anl").empty();
            for(j = 0; j < optionen.length; j++){
              $("#custom" + (i+1) + "Anl").append("<option>" + optionen[j] + "</option>");
            }
          }
      }
  });
}
function messstellenInAuswertungsEditorTabelleEinlesen(){
  var id = "";
  var name = "";
  var kuerzel = "";
  var energietraeger = "";
  var messmethode = "";
  var anlage = "";
  $.ajax({
      type: 'POST',
      async: true,
      url: 'php/getMessstellen.php',
      data: {
          ins: "mstSuchen",
          liegID: $("#liegID").val(),
          nameDB: $("#nameDB").val()
      },
      success: function (records) {
          var insJson = JSON.parse(records);
          var nInsJson = insJson.length;

          tblMessstellenBerechnungseditor.clear().draw();
          for (var i = 0; i < nInsJson; i++) {
              id = String(insJson[i].mst_ID);
              id = id.replace(/^\s+|\s+$/gm,'');
              name = String(insJson[i].nameMSt);
              name = name.replace(/^\s+|\s+$/gm,'');
              kuerzel = String(insJson[i].kurzbezeichnungMst);
              kuerzel = kuerzel.replace(/^\s+|\s+$/gm,'');
              energietraeger = String(insJson[i].energietraegerMst);
              energietraeger = energietraeger.replace(/^\s+|\s+$/gm,'');
              messmethode = String(insJson[i].messartMst);
              messmethode = messmethode.replace(/^\s+|\s+$/gm,'');
              anlage = String(insJson[i].anlageMst);
              anlage = anlage.replace(/^\s+|\s+$/gm,'');

              tblMessstellenBerechnungseditor.row.add([
                  id + " ",
                  name + " ",
                  kuerzel + " ",
                  energietraeger + " ",
                  messmethode + " ",
                  anlage
              ]).draw();
              $("tr").css("cursor", "pointer");
              $("tr").draggable({
                helper: "clone",
                start: function(){
                  contents = $(this).text();
                  splitContents = contents.split(" ");
                }
              });
          }
          $("#tblMessstellenBerechnungseditor").disableSelection();
      }
  });
}

//Instancen verschieben
var changePath = new ChangePath();
function anlageVerschieben(){
  instanzSpeichern("anlVerschieben");
}

//Historie
var changeTracker = new ChangeTracker();
function anlagenHistorieInTabelleEinlesen(){
  $.ajax({
      type: 'POST',
      async: true,
      url: 'php/getHistorie.php',
      data: {
          nameDB: $("#nameDB").val(),
          anlagenNr: $("#anlagennummerAllgemeinAnl").val()
      },

      success: function (records) {

          var insJson = JSON.parse(records);
          console.log(insJson);
          var nInsJson = insJson.length;

          tblHistorie.clear().draw();
          for(var i = 0; i < nInsJson; i++){
            tblHistorie.row.add([
              insJson[i].anl_ID,
              i + 1,
              insJson[i].AnlagenNr,
              insJson[i].Bezeichnung,
              insJson[i].Datum,
              insJson[i].Info,
              insJson[i].Bemerkung
            ]).draw();
            tblHistorie.column(0).visible(false);

            //Markieren ausschalten
            $("#tblHistorie tr").disableSelection();
            //Hover Cursor festlegen
            $("#tblHistorie tr").css("cursor", "pointer");
            //Event Handler entfernen
            $("#tblHistorie").off("dblclick", "tr");
            //standortdatenDritter auswählen und in Form einlesen
            $("#tblHistorie").on("dblclick", "tr", function () {
              var data = tblHistorie.row(this).data();
              historieAendernFensterOeffnen();
              datensatzAusHistorieEinlesen(data[0]);
            });
          }
      }
  });
}

// Navigation
var lastNav = new LastNavInfo();
var tabsData = [{
    lengthPath: 1,
    tab: "tabProd",
    idElement: "",
    infos: "infosProduktion",
    aktivInstance: "prod"
  },
  {
    lengthPath: 1,
    tab: "tabBerechnungsformeln",
    idElement: "",
    infos: "infosBerechnungsformeln",
    aktivInstance: "berFrmEditor"
  },
  {
    lengthPath: 1,
    tab: "tabGipscAdm",
    idElement: "gipscAdmID",
    infos: "infosBetreuerGruppen",
    aktivInstance: "gipscAdm"
  },
  {
    lengthPath: 1,
    tab: "tabBetrGrp",
    idElement: "gipscAdmID",
    infos: "infosBetreuerGruppen",
    aktivInstance: "betrGrp"
  },
  {
    lengthPath: 2,
    tab: "tabManGrp",
    idElement: "manGrpID",
    infos: "infosMandantenGruppen",
    aktivInstance: "manGrp"
  },
  {
    lengthPath: 2,
    tab: "tabSAdm",
    idElement: "sAdmID",
    infos: "infosSuperAdmins",
    aktivInstance: "sAdm"
  },
  {
    lengthPath: 3,
    tab: "tabAdm",
    idElement: "admID",
    infos: "infosAdmins",
    aktivInstance: "adm"
  },
  {
    lengthPath: 3,
    tab: "tabBen",
    idElement: "benID",
    infos: "infosBenutzer",
    aktivInstance: "ben"
  },
  {
    lengthPath: 1,
    tab: "tabMan",
    idElement: "manID",
    infos: "infosMandanten",
    aktivInstance: "man"
  },
  {
    lengthPath: 1,
    tab: "tabOrg",
    idElement: "orgID",
    infos: "infosOrganisationen",
    aktivInstance: "org"
  },
  {
    lengthPath: 2,
    tab: "tabLieg",
    idElement: "liegID",
    infos: "infosLiegenschaften",
    aktivInstance: "lieg"
  },
  {
    lengthPath: 3,
    tab: "tabExtDl",
    idElement: "extDlID",
    infos: "infosExtDurchleitungen",
    aktivInstance: "extDl"
  },
  {
    lengthPath: 3,
    tab: "tabStdDr",
    idElement: "stdDrID",
    infos: "infosStandorteDritte",
    aktivInstance: "stdDr"
  },
  {
    lengthPath: 3,
    tab: "tabBer",
    idElement: "berID",
    infos: "infosBereiche",
    aktivInstance: "ber"
  },
  {
    lengthPath: 3,
    tab: "tabStd",
    idElement: "stdID",
    infos: "infosStandorte",
    aktivInstance: "std"
  },
  {
    lengthPath: 3,
    tab: "tabAnl",
    idElement: "anlID",
    infos: "infosAnlagen",
    aktivInstance: "anl"
  },
  {
    lengthPath: 3,
    tab: "tabAnl_energie",
    idElement: "anlID",
    infos: "infosEnergieversorgung",
    aktivInstance: "anlEnVers"
  },
  {
    lengthPath: 3,
    tab: "tabAnl_dokumente",
    idElement: "anlID",
    infos: "infosDokumente",
    aktivInstance: "anlDocs"
  },
  {
    lengthPath: 3,
    tab: "tabAnl_historie",
    idElement: "anlID",
    infos: "infosHistorie",
    aktivInstance: "anlHist"
  },
  {
    lengthPath: 3,
    tab: "tabMsm",
    idElement: "msmID",
    infos: "infosMessmittel",
    aktivInstance: "msm"
  },
  {
    lengthPath: 3,
    tab: "tabConfig",
    idElement: "msmID",
    infos: "infosKonfiguration",
    aktivInstance: "msmConf"
  },
  {
    lengthPath: 3,
    tab: "tabDok_Msm",
    idElement: "msmID",
    infos: "infosDokumenteMsm",
    aktivInstance: "msmDocs"
  },
  {
    lengthPath: 3,
    tab: "tabHis_Msm",
    idElement: "msmID",
    infos: "infosHistorieMsm",
    aktivInstance: "msmHist"
  },
  {
    lengthPath: 3,              //not in use yet
    tab: "tabKnz",
    idElement: "knzID",
    infos: "infosKennzahlen",
    aktivInstance: "knz"
  },
  {
    lengthPath: 3,              //not in use yet
    tab: "tabAlm",
    idElement: "almID",
    infos: "infosAlarme",
    aktivInstance: "alm"
  },
  {
    lengthPath: 3,
    tab: "tabEng",
    idElement: "entID",
    infos: "infosEnergie",
    aktivInstance: "ent"
  },
  {
    lengthPath: 3,              //not in use yet
    tab: "tabGsf",
    idElement: "gsfID",
    infos: "infosGesellschaftsformen",
    aktivInstance: "gsf"
  },
  {
    lengthPath: 3,              //not in use yet
    tab: "tabMgs",
    idElement: "mgsID",
    infos: "infosManagementsysteme",
    aktivInstance: "mgs"
  },
  {
    lengthPath: 3,
    tab: "tabZp",
    idElement: "zpID",
    infos: "infosZaehlpunkte",
    aktivInstance: "zp"
  },
  {
    tab: "tabAnlGrp",
    idElement: "anlGrpID",
    infos: "infosAnlagenGruppen",
    aktivInstance: "anlGrp"
  },
  {
    lengthPath: 3,
    tab: "tabExtRechnungen",
    idElement: "eRngID",
    infos: "infosExtRechnungen",
    aktivInstance: "eRng"
  },
  {
    lengthPath: 3,
    tab: "tabIntMesswerte",
    idElement: "iMwID",
    infos: "infosIntMesswerte",
    aktivInstance: "iMw"
  },
  {
    lengthPath: 3,
    tab: "tabAusw_eRng_iMw",
    idElement: "eRngID",
    infos: "infosAuswertungManuell",
    aktivInstance: "vergl"
  },
  {
    lengthPath: 3,
    tab: "tabSpaEfV_Tbl1",
    idElement: "eRngID",
    infos: "infosSpaEfVTabelle1",
    aktivInstance: "spaefv1"
  },
  {
    lengthPath: 3,
    tab: "tabSpaEfV_Tbl2",
    idElement: "eRngID",
    infos: "infosSpaEfVTabelle2",
    aktivInstance: "spaefv2"
  }];
var nTabsData = tabsData.length;
function mainMenuNav(element) {
  if (element == "menuBerechnungsformeln" || element == "menuProduktionAusw") {
      $("#tabsOptionen").css("display", "none");
      $("#tabsEditor").css("display", "block");
      if (element == "menuBerechnungsformeln") {
          tabControlNav("tabBerechnungsformeln");
      }
      else if (element == "menuProduktionAusw") {
        tabControlNav("tabProd");
      }
  }
  else {
    $("#tabsEditor").css("display", "none");
  }
  if (element == "betrGrpMenu" || element == "manGrpMenu" || element == "sAdmMenu" || element == "admMenu" || element == "benMenu") {
      $("#tabsOptionen").css("display", "none");
      $("#tabsRechteverwaltung, #rechteverwaltung").css("display", "block");
      if (element == "betrGrpMenu") {
          tabControlNav("tabBetrGrp");
      }
      else if (element == "manGrpMenu") {
          tabControlNav("tabManGrp");
      }
      else if (element == "sAdmMenu") {
          tabControlNav("tabSAdm");
      }
      else if (element == "admMenu") {
          tabControlNav("tabAdm");
      }
      else if (element == "benMenu") {
          tabControlNav("tabBen");
      }
  }
  else {
      $("#tabsRechteverwaltung, #rechteverwaltung").css("display", "none");
  }
  if (element == "untMenu" || element == "manMenu" || element == "orgMenu" || element == "liegMenu" || element == "berMenu" || element == "stdMenu" || element == "stdDrMenu") {
      $("#tabsOptionen").css("display", "none");
      $("#tabsUnternehmensstruktur, #unternehmensstruktur").css("display", "block");

      if (element == "untMenu" || element == "manMenu") {
          tabControlNav("tabMan");
      }
      else if (element == "orgMenu") {
          tabControlNav("tabOrg");
      }
      else if (element == "liegMenu") {
          tabControlNav("tabLieg");
      }
      else if (element == "berMenu") {
          energietrInDBoxBer();
          tabControlNav("tabBer");
      }
      else if (element == "stdMenu") {
          tabControlNav("tabStd");
      }
      else if (element == "stdDrMenu") {
          tabControlNav("tabStdDr");
      }
  }
  else {
      $("#tabsUnternehmensstruktur, #unternehmensstruktur").css("display", "none");
  }
  if (element == "anlMenu" || element == "anl_Menu") {
      $("#tabsAnlagenverwaltung, #anlagenverwaltung").css("display", "block");
      $("#bereichAnl").text($("#nameAllgemeinBer").val());
      clearFields("anl");
      readInstanzen("anlFirst", 0);
      tabControlNav("tabAnl");
      $("#verwaltung").val("Anl");
  }
  else {
      $("#tabsAnlagenverwaltung, #anlagenverwaltung").css("display", "none");
  }
  if (element == "pmMenu") {
      $("#tabsPruefungsverwaltung, #pruefungsverwaltung").css("display", "block");
  }
  else {
      $("#tabsPruefungsverwaltung, #pruefungsverwaltung").css("display", "none");
  }
  if (element == "msmMenu") {
      $("#tabsMessmittelverwaltung, #messmittelverwaltung").css("display", "block");
      tabControlNav("tabMsm");
      $("#verwaltung").val("Msm");
  }
  else {
      $("#tabsMessmittelverwaltung, #messmittelverwaltung").css("display", "none");
  }
  if (element == "knz_almMenu" || element == "knzMenu" || element == "almMenu") {
      $("#tabsKennzahlenAlarme, #kennzahlenAlarme").css("display", "block");
      if (element == "knz_almMenu" || element == "knzMenu") {
          tabControlNav("tabKnz");
      }
      else if (element == "almMenu") {
          tabControlNav("tabAlm");
      }
  }
  else {
      $("#tabsKennzahlenAlarme, #kennzahlenAlarme").css("display", "none");
  }
  if (element == "erwAnlMenu" || element == "entMenu" || element == "enfMenu" || element == "gsfMenu" || element == "mgsMenu" || element == "zpMenu") {
      $("#tabsOptionen, #optionen").css("display", "block");
      $("#tabsUnternehmensstruktur").css("display", "none");
      $("#tabsBasisdaten").css("display", "block");
      if (element == "entMenu" || element == "enfMenu") {
          tabControlNav("tabEng");
      }
      else if (element == "gsfMenu") {
          tabControlNav("tabGsf");
      }
      else if (element == "mgsMenu") {
          tabControlNav("tabMgs");
      }
      else if (element = "zpMenu") {
          tabControlNav("tabZp");
      }
      else if (element = "erwAnlMenu") {
          tabControlNav("tabAnlGrp");
      }
  }
  else {
      $("#tabsOptionen, #optionen").css("display", "none");
  }
  if (element == "extRngMenu" || element == "intMswMenu" || element == "eRngVergleichMenu" || element == "spaEfVTab1Menu" || element == "spaEfVTab2Menu") {
      $("#tabsManuell").css("display", "block");
      if (element == "extRngMenu") {
          tabControlNav("tabExtRechnungen");
          $("#verwaltung").val("ERng");
      }
      else if (element == "eRngVergleichMenu") {
          tabControlNav("tabAusw_eRng_iMw");
          $("#verwaltung").val("AusERng");
      }
      else if (element == "intMswMenu") {
          tabControlNav("tabIntMesswerte");
          $("#verwaltung").val("IMw");
      }
      else if (element == "spaEfVTab1Menu") {
          tabControlNav("tabSpaEfV_Tbl1");
      }
      else if (element == "spaEfVTab2Menu") {
          tabControlNav("tabSpaEfV_Tbl2");
      }
  }
  else {
      $("#tabsManuell").css("display", "none");
  }
}
function tabControlNav(tab) {
  var path = [];

  $("#selectMap").val("Speziell");
  for(var tb = 0; tb < nTabsData; tb++){
    if(tab == tabsData[tb].tab && tabsData[tb].info != ""){
      console.log("correct Tab found!");
      $("#" + tabsData[tb].tab).css("background-color", "#CED6DE");
      $("#" + tabsData[tb].infos).css("display", "block");
      $("#activeInstance").val(tabsData[tb].aktivInstance);

      if(tab == "tabGipscAdm"){
        passwortAuswertenGipscAdm();
      }
      else if (tab == "tabOrg") {
        path = [$("#nameDB").val()];
        $("#manPfadOrg").text($("#nameAllgemeinMan").val());
      }
      else if (tab == "tabLieg") {
        path = [$("#nameDB").val(), $(".orgPfad").val(), "", ""];
        readInstanzen("liegFirst", $(".liegPfad").prop("selectedIndex"));
        $("#manPfadLieg").css("display", "none");
        $("#orgPfadLieg").text($("#nameAllgemeinOrg").val());
      }
      else if (tab == "tabExtDl") {
        readInstanzen("extDlFirst", 0);
      }
      else if (tab == "tabStdDr") {
        readInstanzen("stdDrFirst", 0);
      }
      else if (tab == "tabBer") {

        clearFields("berHinz");
        readInstanzen("berFirst", 0);
        $("#manPfadBer").css("display", "none");
        $("#orgPfadBer").css("display", "none");
        $("#liegPfadBer").text($("#nameAllgemeinLieg").val());
      }
      else if (tab == "tabBen") {
        path =["",""];
        readInstanzen("benFirst", 0);
      }
      else if (tab == "tabAnl") {
        anlagenGruppenEinlesen();
        getAnlagenAuswahlTblHeader();
      }
      else if (tab == "tabMsm") {
        getAnlagenAuswahlTblHeader();
      }
      else if (tab == "tabExtRechnungen") {
        $("#asideRight").css("display", "block");
        versorgerUndEinheitBefuellen();
        energietrInDBoxERngVergleich();
      }
      else if (tab == "tabAusw_eRng_iMw") {
        energietrInDBoxERngVergleich();
        externeRechnungenListeErstellen("vergleich");
      }
      else if (tab == "tabBerechnungsformeln") {
        $("#asideLeft").css("display", "block");
        messstellenInAuswertungsEditorTabelleEinlesen();
      }

      if(tabsData[tb].lengthPath < 1){
        alert("The tabsData[tb].lengthPath is to small! It has to be at least 1. :tabControlNav(tab)");
      }
      else if (tabsData[tb].lengthPath > 4) {
        alert("The tabsData[tb].lengthPath is to big! It has to be smaller than 4. :tabControlNav(tab)");
      }
      else{
        //Do nothing
      }
      console.log(path +  "  " + tabsData[tb].aktivInstance);
      lastNav.setBasicNavInfo(path, tabsData[tb].aktivInstance);
      changeTracker.setInstance(tabsData[tb].aktivInstance);
    }
    else{
      $("#" + tabsData[tb].tab).css("background-color", "#B9C0C7");
      $("#" + tabsData[tb].infos).css("display", "none");
      if($("#infosExtRechnungen").css("display") != "block"){
        $("#asideRight").css("display", "none");
      }
      if($("#infosBerechnungsformeln").css("display") != "block"){
        $("#asideLeft").css("display", "none");
      }
    }
  }
}

var formula = new Formula();
function berechnungsformelSpeichern(){
  var formulaObj = formula.getFormulaObject();
  var nFormula = formulaObj.length;

  for(var element = 0; element < nFormula; element++){
    //formulaObj[element].
  }
}
function bereichWaehlen() {
    $("#bereichWaehlen").css("display", "block");
    $("#bereichWaehlen").dialog({
        height: 350,
        width: 250,
        position: "center",
        resize: "none",
        show: {
            effect: "fade",
            duration: 500
        },
        hide: {
            effect: "fade",
            duration: 500
        }
    });
}
function clearFields(instanz) {
    $(".lblNeu").css("display", "inline");
    $(".lblAendern").css("display", "none");
    if (instanz == "gipscAdmHinz") {
        $("#benutzernameGipscAdm").val("");
        $("#passwortGipscAdm").val("");
    }
    else if (instanz == "betrGrpHinz") {
        $("#firmaBetrGrp").val("");
        $("#anzahlMitarbeiterBetrGrp").val("");
        $("#anschriftBetrGrp").val("");
        $("#plzBetrGrp").val("");
        $("#ortBetrGrp").val("");
        $("#geschaeftsfuehrerBetrGrp").val("");
        $("#telefonBetrGrp").val("");
        $("#emailBetrGrp").val("");
        $("#notizBetrGrp").val("");
    }
    else if (instanz == "sAdmHinz") {
        $("#titelSAdm").val("");
        $("#nameSAdm").val("");
        $("#vornameSAdm").val("");
        $("#emailSAdm").val("");
        $("#telefonSAdm").val("");
        $("#faxSAdm").val("");
        $("#mobiltelefonSAdm").val("");
        $("#benutzernameSAdm").val("");
        $("#passwortSAdm").val("");
    }
    else if (instanz == "manGrpHinz") {
        $("#nameManGrp").val("");
        $("#kurzManGrp").val("");

        tblMandantengruppe.clear().draw();
    }
    else if (instanz == "admHinz") {
        $("#titelAdm").val("");
        $("#nameAdm").val("");
        $("#vornameAdm").val("");
        $("#emailAdm").val("");
        $("#telefonAdm").val("");
        $("#faxAdm").val("");
        $("#mobiltelefonAdm").val("");
        $("#benutzernameAdm").val("");
        $("#passwortAdm").val("");
    }
    else if (instanz == "benHinz") {
      $("#titelBen").val("");
      $("#nameBen").val("");
      $("#vornameBen").val("");
      $("#emailBen").val("");
      $("#telefonBen").val("");
      $("#faxBen").val("");
      $("#mobiltelefonBen").val("");
      $("#benutzernameBen").val("");
      $("#passwortBen").val("");
    }
    else if (instanz == "manHinz") {
        //Mandantenformular leeren
        $("#manID").val("");
        $("#nameAllgemeinMan").val("");
        $("#dbKurz").val("");
        $("#holdingstrukturAllgemeinMan").val("");
        $("#liegenschaftenAllgemeinMan").val("");
        $("#titelSystemadminMan").val("");
        $("#nameSystemadminMan").val("");
        $("#vornameSystemadminMan").val("");
        $("#emailSystemadminMan").val("");
        $("#telefonSystemadminMan").val("");
        $("#faxSystemadminMan").val("");
        $("#mobiltelefonSystemadminMan").val("");
        $("#mehrbenutzerMan").prop('checked', false);
        $("#benutzernameSystemadminMan").val("");
        $("#passwortSystemadminMan").val("");
    }
    else if (instanz == "orgHinz") {
        //Organisationsformular leeren
        $("#orgID").val("");
        $("#nameAllgemeinOrg").val("");
        $("#gesellschaftsformAllgemeinOrg").val("");
        $("#firmenanschriftAllgemeinOrg").val("");
        $("#landAllgemeinOrg").val("");
        $("#plzAllgemeinOrg").val("");
        $("#ortAllgemeinOrg").val("");
        $("#hrbnummerAllgemeinOrg").val("");
        $("#titelGeschaeftsfuehrungOrg").val("");
        $("#nameGeschaeftsfuehrungOrg").val("");
        $("#vornameGeschaeftsfuehrungOrg").val("");
        $("#emailGeschaeftsfuehrungOrg").val("");
        $("#telefonGeschaeftsfuehrungOrg").val("");
        $("#faxGeschaeftsfuehrungOrg").val("");
        $("#mobiltelefonGeschaeftsfuehrungOrg").val("");
        $("#titelEnergiemanagementOrg").val("");
        $("#nameEnergiemanagementOrg").val("");
        $("#vornameEnergiemanagementOrg").val("");
        $("#emailEnergiemanagementOrg").val("");
        $("#telefonEnergiemanagementOrg").val("");
        $("#faxEnergiemanagementOrg").val("");
        $("#mobiltelefonEnergiemanagementOrg").val("");
    }
    else if (instanz == "liegHinz") {
        //Liegenschaftsformular leeren
        $("#liegID").val("");
        $("#nameAllgemeinLieg").val("");
        $("#kuerzelAllgemeinLieg").val("");
        $("#eigenstaendigeformAllgemeinLieg").prop('checked', false);
        $("#aktivAllgemeinLieg").prop('checked', false);
        $("#gesellschaftsformAllgemeinLieg").val("");
        $("#anschriftAllgemeinLieg").val("");
        $("#landAllgemeinLieg").val("");
        $("#plzAllgemeinLieg").val("");
        $("#ortAllgemeinLieg").val("");
        $("#typAllgemeinLieg").val("");
        $("#hatDlAllgemeinLieg").prop("checked",false);
        $("#titelAnsprechpartnerLieg").val("");
        $("#nameAnsprechpartnerLieg").val("");
        $("#vornameAnsprechpartnerLieg").val("");
        $("#emailAnsprechpartnerLieg").val("");
        $("#telefonAnsprechpartnerLieg").val("");
        $("#faxAnsprechpartnerLieg").val("");
        $("#mobiltelefonAnsprechpartnerLieg").val("");
        $("#titelEnergiebeauftragterLieg").val("");
        $("#nameEnergiebeauftragterLieg").val("");
        $("#vornameEnergiebeauftragterLieg").val("");
        $("#emailEnergiebeauftragterLieg").val("");
        $("#telefonEnergiebeauftragterLieg").val("");
        $("#faxEnergiebeauftragterLieg").val("");
        $("#mobiltelefonEnergiebeauftragterLieg").val("");
        $("#inputEnergietraeger1Lieg").val("");
        $("#inputEnergietraeger2Lieg").val("");
        $("#inputEnergietraeger3Lieg").val("");
        $("#inputEnergietraeger4Lieg").val("");
        $("#inputEnergietraeger5Lieg").val("");
        $("#inputEnergietraeger6Lieg").val("");
        $("#inputEnergietraeger7Lieg").val("");
        $("#inputEnergietraeger8Lieg").val("");
        $("#inputEnergietraeger9Lieg").val("");
        $("#energietraeger1Lieg").empty();
        $("#energietraeger2Lieg").empty();
        $("#energietraeger3Lieg").empty();
        $("#energietraeger4Lieg").empty();
        $("#energietraeger5Lieg").empty();
        $("#energietraeger6Lieg").empty();
        $("#energietraeger7Lieg").empty();
        $("#energietraeger8Lieg").empty();
        $("#energietraeger9Lieg").empty();
        $("#energieform1Lieg").val("");
        $("#energieform2Lieg").val("");
        $("#energieform3Lieg").val("");
        $("#energieform4Lieg").val("");
        $("#energieform5Lieg").val("");
        $("#energieform6Lieg").val("");
        $("#energieform7Lieg").val("");
        $("#managementsystem1Lieg").val("");
        $("#erstzertifizierung1Lieg").val("");
        $("#managementsystem2Lieg").val("");
        $("#erstzertifizierung2Lieg").val("");
        $("#managementsystem3Lieg").val("");
        $("#erstzertifizierung3Lieg").val("");
        $(".energietraegerLieg").val("");

        $("#entLiegErweitert").css("display", "none");
        $("#weitereEntsLieg").text("weitere Energietr�ger");
    }
    else if (instanz == "extDlHinz") {
        //Externe Durchleitungsformular leeren
        $("#extDlID").val("");
        $("#nameExtDl").val("");
        $("#aktivExtDl").prop('checked', false);
        $("#gesellschaftsformExtDl").val("");
        $("#anschriftExtDl").val("");
        $("#landExtDl").val("");
        $("#plzExtDl").val("");
        $("#ortExtDl").val("");
        $("#typExtDl").val("");
        $("#stdExtDl").prop("checked",false);
        $("#titelAnsprechpartnerExtDl").val("");
        $("#nameAnsprechpartnerExtDl").val("");
        $("#vornameAnsprechpartnerExtDl").val("");
        $("#emailAnsprechpartnerExtDl").val("");
        $("#telefonAnsprechpartnerExtDl").val("");
        $("#faxAnsprechpartnerExtDl").val("");
        $("#mobiltelefonAnsprechpartnerExtDl").val("");

        $("#energietraeger1ExtDl").val("");
          $("#messstelle1ExtDl").val("");
          $("#standort1ExtDl").val("");
        $("#energietraeger2ExtDl").val("");
          $("#messstelle2ExtDl").val("");
          $("#standort2ExtDl").val("");
        $("#energietraeger3ExtDl").val("");
          $("#messstelle3ExtDl").val("");
          $("#standort3ExtDl").val("");
        $("#energietraeger4ExtDl").val("");
          $("#messstelle4ExtDl").val("");
          $("#standort4ExtDl").val("");
        $("#energietraeger5ExtDl").val("");
          $("#messstelle5ExtDl").val("");
          $("#standort5ExtDl").val("");
        $("#energietraeger6ExtDl").val("");
          $("#messstelle6ExtDl").val("");
          $("#standort6ExtDl").val("");

        $("#energieRes1ExtDl").val("");
          $("#messstelleEngRes1ExtDl").val("");
           $("#standort1EngResExtDl").val("");
        $("#energieRes2ExtDl").val("");
          $("#messstelleEngRes2ExtDl").val("");
           $("#standort2EngResExtDl").val("");
        $("#energieRes3ExtDl").val("");
          $("#messstelleEngRes3ExtDl").val("");
           $("#standort3EngResExtDl").val("");
        $("#energieRes4ExtDl").val("");
          $("#messstelleEngRes4ExtDl").val("");
           $("#standort4EngResExtDl").val("");
        $("#energieRes5ExtDl").val("");
          $("#messstelleEngRes5ExtDl").val("");
           $("#standort5EngResExtDl").val("");
        $("#energieRes6ExtDl").val("");
          $("#messstelleEngRes6ExtDl").val("");
           $("#standort6EngResExtDl").val("");
    }
    else if (instanz == "berHinz") {
        $("#nameAllgemeinBer").val("");
        $("#kurzbezeichnungAllgemeinBer").val("");
        $("#KostenstelleAllgemeinBer").val("");
        $("#ortBer").val("");
        $("#levelAuswahlAllgemeinBer").val("");
        $("#vorgelagerteBereiche1AllgemeinBer").val("");
        $("#vorgelagerteBereiche2AllgemeinBer").val("");
        $("#notizAllgemeinBer").val("");
        $("#energietraeger1AllgemeinBer").val("");
        $("#energietraeger2AllgemeinBer").val("");
        $("#energietraeger3AllgemeinBer").val("");
        $("#energietraeger4AllgemeinBer").val("");
    }
    else if (instanz == "mstHinz") {
        $("#nameMst").val("");
        $("#kurzbezeichnungMst").val("");
        $("#kostenstelleMst").val("");
        $("#aktivMst").prop('checked', false);
        $("#energieformMst").val("");
        $("#ortMst").val("");
        $("#messartMst").val("");
        $("#vorgelagerteMst").val("");
        $("#messmittelBerechnungslogikMst").val("");
        $("#notizAllgemeinMst").val("");
    }
    else if (instanz == "stdHinz") {
        $("#nameAllgemeinStd").val("");
        $("#kurzbezeichnungAllgemeinStd").val("");
        $("#flaecheAllgemeinStd").val("");

        $("#custom1LabelStd").text("");
        $("#custom1EingabeStd").val("");
        $("#custom2LabelStd").text("");
        $("#custom2EingabeStd").val("");
        $("#custom3LabelStd").text("");
        $("#custom3EingabeStd").val("");
        $("#custom4LabelStd").text("");
        $("#custom4EingabeStd").val("");
        $("#custom5LabelStd").text("");
        $("#custom5EingabeStd").val("");
        $("#custom6LabelStd").text("");
        $("#custom6EingabeStd").val("");

        $("#notizAllgemeinStd").val("");
    }
    else if (instanz == "stdDrHinz") {
      $("#nameAllgemeinStdDr").val("");
      $("#kurzbezeichnungAllgemeinStdDr").val("");
      $("#flaecheAllgemeinStdDr").val("");

      //$("#custom1LabelStdDr").text("");
      $("#custom1EingabeStdDr").val("");
      //$("#custom2LabelStdDr").text("");
      $("#custom2EingabeStdDr").val("");
      //$("#custom3LabelStdDr").text("");
      $("#custom3EingabeStdDr").val("");
      //$("#custom4LabelStdDr").text("");
      $("#custom4EingabeStdDr").val("");
      //$("#custom5LabelStdDr").text("");
      $("#custom5EingabeStdDr").val("");
      //$("#custom6LabelStdDr").text("");
      $("#custom6EingabeStdDr").val("");

      $("#notizAllgemeinStdDr").val("");
    }
    else if (instanz == "anlHinz") {
        var nameDB = $("#nameDB").val();
        $("#idAllgemeinAnl").val("");
        $("#bereichAllgemeinAnl").val("");
        $("#anlagennummerAllgemeinAnl").val("");
        $("#bezeichnungAllgemeinAnl").val("");
        $("#aktivAllgemeinAnl").prop("checked", false),
        $("#typAllgemeinAnl").val("");
        $("#serienNrAllgemeinAnl").val("");
        $("#standortAllgemeinAnl").val("");
        $("#datumAnschaffungAllgemeinAnl").val("");
        $("#baujahrAnl").val("");
        $("#betriebsstundenAllgemeinAnl").val(0);
        $("#notizAllgemeinAnl").val("");
        $("#produktAllgemeinAnl").val("");
        $("#produktionsmenge1AllgemeinAnl").val(0);
        $("#einheitProduktionsmenge1AllgemeinAnl").val("");
        $("#produktnummer1AllgemeinAnl").val("");
        $("#mehrProdukteAllgemeinAnl").prop("checked", false);
        $("#zugeordneterVerbraucher1AllgemeinAnl").val("");
        $("#zugeordneterVerbraucher2AllgemeinAnl").val("");
        $("#zugeordneterVerbraucher3AllgemeinAnl").val("");
        $("#zugeordneterVerbraucher4AllgemeinAnl").val("");
        $("#zugeordneterVerbraucher5AllgemeinAnl").val("");
        $("#zugeordneterVerbraucher6AllgemeinAnl").val("");
        $("#energietraeger1AllgemeinAnl").val("");
        $("#energieform1AllgemeinAnl").val("");
        $("#einheit1Anl").val("");
        $("#anschlussleistung1Anl").val(0);
        $("#mittlereAuslastungProzent1Anl").val(0);
        $("#mittlereAuslastungKw1Anl").val(0);
        $("#betriebstemperatur1Anl").val(0);
        $("#abwaerme1Anl").val(0);
        $("#nutzbarkeitAbwaerme1Anl").val("");
        $("#bewertungNutzbarkeitAbwaerme1Anl").val("");
        $("#energietraeger2AllgemeinAnl").val("");
        $("#energieform2AllgemeinAnl").val("");
        $("#einheit2Anl").val("");
        $("#anschlussleistung2Anl").val(0);
        $("#mittlereAuslastungProzent2Anl").val(0);
        $("#mittlereAuslastungKw2Anl").val(0);
        $("#betriebstemperatur2Anl").val(0);
        $("#abwaerme2Anl").val(0);
        $("#nutzbarkeitAbwaerme2Anl").val("");
        $("#bewertungNutzbarkeitAbwaerme2Anl").val("");
        $("#energietraeger3AllgemeinAnl").val("");
        $("#energieform3AllgemeinAnl").val("");
        $("#einheit3Anl").val("");
        $("#anschlussleistung3Anl").val(0);
        $("#mittlereAuslastungProzent3Anl").val(0);
        $("#mittlereAuslastungKw3Anl").val(0);
        $("#betriebstemperatur3Anl").val(0);
        $("#abwaerme3Anl").val(0);
        $("#nutzbarkeitAbwaerme3Anl").val("");
        $("#bewertungNutzbarkeitAbwaerme3Anl").val("");
        $("#energietraeger4AllgemeinAnl").val("");
        $("#energieform4AllgemeinAnl").val("");
        $("#einheit4Anl").val("");
        $("#anschlussleistung4Anl").val(0);
        $("#mittlereAuslastungProzent4Anl").val(0);
        $("#mittlereAuslastungKw4Anl").val(0);
        $("#betriebstemperatur4Anl").val(0);
        $("#abwaerme4Anl").val(0);
        $("#nutzbarkeitAbwaerme4Anl").val("");
        $("#bewertungNutzbarkeitAbwaerme4Anl").val("");
        $("#mst1Anl").val("");
        $("#mst2Anl").val("");
        $("#mst3Anl").val("");
        $("#mst4Anl").val("");

        $("#dokuAuswahlAnl").val("");
        $("#bildAllgemeinAnl").prop("src","uploadsDownloads/images/" + nameDB + "noImg.png");

    }
    else if (instanz == "msmHinz") {
        $("#messmittelNrAllgemeinMsm").val("");
        $("#bezeichnungAllgemeinMsm").val("");
        $("#messstelleAllgemeinMsm").val("");
        $("#anlMsm").val("");
        $("#typAllgemeinMsm").val("");
        $("#typNrAllgemeinMsm").val("");
        $("#installationsdatumAllgemeinMsm").val("");
        $("#energieformAllgemeinMsm").val("");
        $("#einheitAllgemeinMsm").val("");
        $("#multiboxAllgemeinMsm").prop("checked", false);
        $("#unitAllgemeinMsm").val("");
        $("#unitTypAllgemeinMsm").val("");
        $("#anzahlKanaeleAllgemeinMsm").val("");
        $("#messungsformAllgemeinMsm").val("");
        $("#kanal1AllgemeinMsm").val("");
        $("#kanal2AllgemeinMsm").val("");
        $("#kanal3AllgemeinMsm").val("");
        $("#notizAllgemeinMsm").val("");
        $("#beauftragterPruefinformationenMsm").val("");
        $("#beauftragterEmailPruefinformationenMsm").val("");
        $("#pruefzyklusPruefinformationenMsm").val("");
        $("#letztePruefungPruefinformationenMsm").val("");
        $("#naechstePruefungPruefinformationenMsm").val("");
        $("#notiz2AllgemeinMsm").val("");
        $("#messmethodeInformationenConfig").val("");
        $("#messzyklusInformationenConfig").val("");
        $("#messtoleranzInformationenConfig").val("");
        $("#notiz1InformationenConfig").val("");
        $("#wandlungsfaktorTechnischeDetailsConfig").val("");
        $("#geraetetypTechnischeDetailsConfig").val("");
        $("#ipTechnischeDetailsConfig").val("");
        $("#subnetMaskTechnischeDetailsConfig").val("");
        $("#gatewayTechnischeDetailsConfig").val("");
        $("#cgiPortTechnischeDetailsConfig").val("");
        $("#modbusPortTechnischeDetailsConfig").val("");
        $("#ftpPortTechnischeDetailsConfig").val("");
        $("#notiz2InformationenConfig").val("");

        $("#dokuAuswahlMsm").val("");
        $("#bildAllgemeinMsm").prop("src","uploadsDownloads/images/noImg.png");

    }
    else if (instanz == "entHinz") {
        $("#nameEnt").val("");
        $("#kuerzelEnt").val("");
        $("#allgemEntEnt").val("");
        $("#notizEnt").val("");
        $("#versorgerEvuEnt").val("");
        $("#versorgerUenbEnt").val("");
        $("#versorgerMsbEnt").val("");
        $("#einheit1Ent").val("");
        $("#einheit2Ent").val("");
        $("#einheit3Ent").val("");
        $("#entEinh1FaktorKwh").val("");
        $("#entEinh2FaktorKwh").val("");
        $("#entEinh3FaktorKwh").val("");
        $("#entEinh1FaktorCO2").val("");
        $("#entEinh2FaktorCO2").val("");
        $("#entEinh3FaktorCO2").val("");
        $("#lblEntEinh1FaktorX1").text("");
        $("#lblEntEinh2FaktorX1").text("");
        $("#lblEntEinh3FaktorX1").text("");
        $("#entEinh1FaktorX1").val("");
        $("#entEinh2FaktorX1").val("");
        $("#entEinh3FaktorX1").val("");
        $("#lblEntEinh1FaktorX2").text("");
        $("#lblEntEinh2FaktorX2").text("");
        $("#lblEntEinh3FaktorX2").text("");
        $("#entEinh1FaktorX2").val("");
        $("#entEinh2FaktorX2").val("");
        $("#entEinh3FaktorX2").val("");
        $("#lblEntEinh1FaktorX3").text("");
        $("#lblEntEinh2FaktorX3").text("");
        $("#lblEntEinh3FaktorX3").text("");
        $("#entEinh1FaktorX3").val("");
        $("#entEinh2FaktorX3").val("");
        $("#entEinh3FaktorX3").val("");
        $("#gueltigVomEnt").val("");
        $("#gueltigBisEnt").val("");
    }
    else if (instanz == "enfHinz") {
        $("#nameEnf").val("");
        $("#kuerzelEnf").val("");
        $("#notizEnf").val("");
        $("#aktivEnf").prop("checked", false);
        $("#einheit1Enf").val("");
        $("#einheit2Enf").val("");
        $("#einheit3Enf").val("");
        $("#enfEinh1FaktorKwh").val("");
        $("#enfEinh2FaktorKwh").val("");
        $("#enfEinh3FaktorKwh").val("");
        $("#enfEinh1FaktorCO2").val("");
        $("#enfEinh2FaktorCO2").val("");
        $("#enfEinh3FaktorCO2").val("");
        $("#lblEnfEinh1FaktorX1").text("");
        $("#lblEnfEinh2FaktorX1").text("");
        $("#lblEnfEinh3FaktorX1").text("");
        $("#enfEinh1FaktorX1").val("");
        $("#enfEinh2FaktorX1").val("");
        $("#enfEinh3FaktorX1").val("");
        $("#lblEnfEinh1FaktorX2").text("");
        $("#lblEnfEinh2FaktorX2").text("");
        $("#lblEnfEinh3FaktorX2").text("");
        $("#enfEinh1FaktorX2").val("");
        $("#enfEinh2FaktorX2").val("");
        $("#enfEinh3FaktorX2").val("");
        $("#lblEnfEinh1FaktorX3").text("");
        $("#lblEnfEinh2FaktorX3").text("");
        $("#lblEnfEinh3FaktorX3").text("");
        $("#enfEinh1FaktorX3").val("");
        $("#enfEinh2FaktorX3").val("");
        $("#enfEinh3FaktorX3").val("");
        $("#gueltigVomEnf").val("");
        $("#gueltigBisEnf").val("");
    }
    else if (instanz == "eRngHinz") {

        $(".standRng").val("");
        $(".evuRng").val("");
        $(".bafaRng").val("");
        $("#zpNrERng").val("");
        $(".htNtInp").val(0);
        $("#aktuellesDokIDERng").val("");
        $("#aktuellesDokNameERng").val("");
        $("#dokuAuswahlERng").val("");
        $("#dokuAuswahlERng").text("");

    }
    else if (instanz == "iMwHinz") {
        $(".iMwHinz").val("");
    }
    else if (instanz == "grpHinz") {
        $("#nameGrp").val("");
        $("#kuerzelGrp").val("");
        $("#beschreibungGrp").val("");
        $("#optionGrp").val("");

        tblOptionenGrp.clear().draw();
    }
    else if (instanz == "zpHinz") {
        $("#zaehlpunktNrZp").val("");
        $("#energietraegerZp").val("");
        $("#mstZp").val("");
        $("#messsystemZp").val("");
        $("#messgenauZp").val("");
    }
    savedNew = true;
}

function mandantenInMandantenGruppenTabelleEinlesen(manIDs){
  tblMandantengruppe.clear().draw();

  var mandantenIDs = manIDs;

  $.ajax({
      type: 'POST',
      async: false,
      url: 'php/readInstanzen.php',
      data: {
          id: "tblMan",
          nameDB: "gipscomm",
          mandantenIDs: mandantenIDs
      },
      fail: function () {
          alert("failed!!");
      },
      success: function (records) {
        console.log(records);
          var insJson = $.parseJSON(records);

          if(insJson.length > 0){
            for(n = 0; n < insJson.length;n++){
                tblMandantengruppe.row.add([insJson[n].man_ID,insJson[n].nameMan,insJson[n].dbName],n).draw();
                tblMandantengruppe.column(0).visible(false).draw();
            }
          }
          else {
            tblMandantengruppe.clear().draw();
          }
        }
  });
}
