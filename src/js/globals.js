//SDM////////////////+++++++++++++++#
// Enumerations ///++++++++++++++++#
/////////////////+++++++++++++++++#
var Instance = {
  MANDANT: 1,
  ORGANISATION: 2,
  LIEGENSCHAFT: 3,
  BEREICH: 4,
  MESSSTELLE: 5,
  ANLAGE: 6,
  MESSMITTEL: 7
}
var InstanciationMode = {
  EMPTY: 1,
  OBJECT: 2
}
var TrackValue = {
  LABEL: 1,
  FIELD_ID: 2,
  OLD_VALUE: 3,
  NEW_VALUE: 4
}
var Operator = {
  PLUS: 1,
  MINUS: 2,
  TIMES: 3,
  DIVIDE: 4,
  POWER_OF: 5
}
var LocationParentheses = {
  BEGINNING: 1,
  END: 2,
  NONE: 3
}
var FilterBy = {
  ID: 1,
  NAME: 2,
  DATETIME: 3,
  VALUE: 4
}
var FormulaProperty = {
  OPERATOR: 1,
  PARENTHESES: 2,
  MEASUREMENT_POINT: 3
}
var DbTable = {
  MESSSTELLEN: 1,
  KENNZAHLEN: 2
}
var DisplayMode = {
  STRING: 1,
  ID: 2
}

//SDM/////////////////////+++++++++++++++#
// Reference variables //++++++++++++++++#
////////////////////////+++++++++++++++++#
var d = new Date();
var formula = new Formula();
var lastNav = new LastNavInfo();
var changeTracker = new ChangeTracker();
var changePath = new ChangePath();
var Bereich = function(nameOrg, nameLieg, nameBer, berID){

    this.nameOrg = nameOrg;

    this.nameLieg = nameLieg;

    this.nameBer = nameBer;

    this.berID = berID;

}
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

// Datatables
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


//SDM/////////////////+++++++++++++++#
// Value variables //++++++++++++++++#
////////////////////+++++++++++++++++#
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
var entOderEnf;
var betrGrpListe = [];
var manGrpListe = [];
var mandantenliste = [];
var organisationenliste = [];
var organisation = {
    Name: "",
    OrgID: ""
}
var liegenschaftenliste = [];
var liegenschaft = {
    Name: "",
    LiegID: ""
}
var bereicheliste = [];
var anlagenliste = [];
