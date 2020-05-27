var d = new Date();

var tblBereicheMessstellen = $("#tblBereichelisteAnl").DataTable({
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
            title: "<h2>" + $('.manPfad').text() + "</h2><h3 style='display:inline-block;'>Bereiche und Messstellen vom " + d.getDate() + "." + (d.getMonth() + 1) + "." + d.getFullYear() + "</h2><img id='logo' src='images/g_analysisNeu6.png' alt='G-Analysis Logo' style='clear:right; float:right;height:50px;width:150px;'><div style='height:20px;margin:0px;'></div>"

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
            title: "<h2>" + $('.manPfad').text() + "</h2><h3 style='display:inline-block;'>Bereiche vom " + d.getDate() + "." + (d.getMonth() + 1) + "." + d.getFullYear() + "</h2><img id='logo' src='images/g_analysisNeu6.png' alt='G-Analysis Logo' style='clear:right; float:right;height:50px;width:150px;'><div style='height:20px;margin:0px;'></div>"

        }
    ],
    pageLength: 20,
    bAutoWidth: false,
    colReorder: true
});

var tblStandorte = $("#tblStandorteListe").DataTable({
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
            title: "<h2>" + $('.manPfad').text() + "</h2><h3 style='display:inline-block;'>Standorte vom " + d.getDate() + "." + (d.getMonth() + 1) + "." + d.getFullYear() + "</h2><img id='logo' src='images/g_analysisNeu6.png' alt='G-Analysis Logo' style='clear:right; float:right;height:50px;width:150px;'><div style='height:20px;margin:0px;'></div>"

        }
    ],
    pageLength: 20,
    bAutoWidth: false,
    colReorder: true
});

var tblVorgelagerteMessstelleAuswahl = $("#tblMessstellenlisteMst").DataTable({
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
            title: "<h2>" + $('.manPfad').text() + "</h2><h3 style='display:inline-block;'>Bereiche vom " + d.getDate() + "." + (d.getMonth() + 1) + "." + d.getFullYear() + "</h2><img id='logo' src='images/g_analysisNeu6.png' alt='G-Analysis Logo' style='clear:right; float:right;height:50px;width:150px;'><div style='height:20px;margin:0px;'></div>"

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
    colReorder: true
});

var tblDokumente = $("#tblDokumente").DataTable({
    dom: 'Bfrtip',
    pageLength: 15,
    bAutoWidth: false,
    colReorder: true
});

//Unternehmensstruktur erstellen wenn auf speichern Symbol geklickt wird

function instanzErstellen(instanz) {

    if(instanz == "manSpeichern"){
        $.ajax({
            type: 'POST',
            async: true,
            url: 'php/mandantIntoDb.php',
            data: {
                modus: "new",
                manID: $("#manID").val(),
                name: $("#nameAllgemeinMan").val(),
                dbKurz: $("#dbKurz").val(),
                sAdm_ID_1: $("#sAdmID_1").val(),
                sAdm_ID_2: $("#sAdmID_2").val(),
                holdingstruktur: $("#holdingstrukturAllgemeinMan").is(':checked'),
                liegenschaften: $("#liegenschaftenAllgemeinMan").is(':checked'),
                titelAdmin: $("#titelSystemadminMan").val(),
                nameAdmin: $("#nameSystemadminMan").val(),
                vornameAdmin: $("#vornameSystemadminMan").val(),
                eMailAdmin: $("#emailSystemadminMan").val(),
                telefonAdmin: $("#telefonSystemadminMan").val(),
                faxAdmin: $("#faxSystemadminMan").val(),
                mobiltelefonAdmin: $("#mobiltelefonSystemadminMan").val(),
                mehrbenutzer: $("#mehrbenutzerMan").is(':checked'),
                benutzernameAdmin: $("#benutzernameSystemadminMan").val(),
                passwortAdmin: $("#passwortSystemadminMan").val()
            },
            success: function (echo) {
                //alert(echo);
                alert("erfolgreich gespeichert!");
                readInstanzen("manLast", $("#manCount").val());
            }

        });
        manNavID = $("#manCount").val();
    }
    else if(instanz == "orgSpeichern"){
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
                console.log(echo);
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
                eigenstaendigeForm: $("#eigenstaendigeformAllgemeinLieg").is(':checked'),
                aktiv: $("#aktivAllgemeinLieg").is(':checked'),
                gesellschaftsform: $("#gesellschaftsformAllgemeinLieg").val(),
                anschrift: $("#anschriftAllgemeinLieg").val(),
                land: $("#landAllgemeinLieg").val(),
                plz: $("#plzAllgemeinLieg").val(),
                ort: $("#ortAllgemeinLieg").val(),
                typ: $("#typAllgemeinLieg").val(),
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
                energietraeger1: $("#energietraeger1Lieg").val(),
                energietraeger2: $("#energietraeger2Lieg").val(),
                energietraeger3: $("#energietraeger3Lieg").val(),
                energietraeger4: $("#energietraeger4Lieg").val(),
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
                console.log(echo);
                alert("erfolgreich gespeichert!");
                readInstanzen("liegLast", $("#liegCount").val());
            }
        });
        liegNavID = $("#liegCount").val();
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
                console.log(echo);
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
                energieform: $("#energieformMst").val(),
                ort: $("#ortMst").val(),
                messart: $("#messartMst").val(),
                vorgelagerteMessstelle: $("#vorgelagerteMst").val(),
                messmittelBerechnungslogik: $("#messmittelBerechnungslogikMst").val(),
                notiz: $("#notizAllgemeinMst").val()
            },
            success: function (echo) {
                console.log(echo);
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
                console.log(echo);
                alert("erfolgreich gespeichert!");
                readInstanzen("stdLast", $("#stdCount").val());
            }
        })
        stdNavID = $("#stdCount").val();
    }
    else if (instanz == "anlSpeichern") {
        $.ajax({
            type: 'POST',
            async: true,
            url: 'php/instanzIntoDb.php',
            data: {
                id: "anl",
                modus: "new",
                berID: $("#berID").val(),
                nameDB: $("#nameDB").val(),

                //anlagenbild: $("#bildAllgemeinAnl").src(),
                anlagennummer: $("#anlagennummerAllgemeinAnl").val(),
                bezeichnung: $("#bezeichnungAllgemeinAnl").val(),
                aktiv: $("#aktivAllgemeinAnl").is(":checked"),
                typ: $("#typAllgemeinAnl").val(),
                standort: $("#standortAllgemeinAnl").val(),
                anschaffungsdatum: $("#datumAnschaffungAllgemeinAnl").val(),
                letzteDurchsichtDatum: $("#datumLetzteDurchsichtAllgemeinAnl").val(),
                jahresbetriebsstunden: $("#betriebsstundenAllgemeinAnl").val(),
                notizAllgemein: $("#notizAllgemeinAnl").val(),
                produkt: $("#produktAllgemeinAnl").val(),
                produktionsmenge: $("#produktionsmenge1AllgemeinAnl").val(),
                produktionsmengeEinheit: $("#einheitProduktionsmenge1AllgemeinAnl").val(),
                produktnummer: $("#produktnummer1AllgemeinAnl").val(),
                mehrProdukte: $("#mehrProdukteAllgemeinAnl").is(":checked"),
                zugeordneterVerbraucher1: $("#zugeordneterVerbraucher1AllgemeinAnl").val(),
                zugeordneterVerbraucher2: $("#zugeordneterVerbraucher2AllgemeinAnl").val(),

                energietraeger1: $("#energietraeger1AllgemeinAnl").val(),
                energieform1: $("#energieform1AllgemeinAnl").val(),
                einheit1: $("#einheit1Anl").val(),
                anschlussleistung1: $("#anschlussleistung1Anl").val(),
                mittlereAuslastungProzent1: $("#mittlereAuslastungProzent1Anl").val(),
                mittlereAuslastungKw1: $("#mittlereAuslastungKw1Anl").val(),
                betriebstemperatur1: $("#betriebstemperatur1Anl").val(),
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
                abwaerme4: $("#abwaerme4Anl").val(),
                abwaermeNutzbarkeit4: $("#nutzbarkeitAbwaerme4Anl").val(),
                bewertungAbwaermeNutzbarkeit4: $("#bewertungNutzbarkeitAbwaerme4Anl").val()
               
            },
            success: function (echo) {
                console.log(echo);
                alert("erfolgreich gespeichert!");               
                readInstanzen("anlLast", $("#anlCount").val());
            }
        })
        anlNavID = $("#anlCount").val();
    }
    else if (instanz == "msmSpeichern") {
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
                bezeichnung: $("#bezeichnungAllgemeinMsm").val(),
                messstelle: $("#messstelleAllgemeinMsm").val(),
                typ: $("#typAllgemeinMsm").val(),
                nrTyp: $("#typNrAllgemeinMsm").val(),
                datumInstallation: $("#installationsdatumAllgemeinMsm").val(),
                energieform: $("#energieformAllgemeinMsm").val(),
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
                messtoleranz: $("#messtoleranzInformationenConfig").val(),
                notizAllgInfos: $("#notiz1InformationenConfig").val(),
                wandlerfaktor: $("#wandlungsfaktorTechnischeDetailsConfig").val(),
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
                console.log(echo);
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

                name: $("#nameEnt").val(),
                kuerzel: $("#kuerzelEnt").val(),
                notiz: $("#notizEnt").val(),
                aktiv: $("#aktivEnt").is(":checked"),

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
                console.log(echo);
                alert("erfolgreich gespeichert!");
                readInstanzen("enfLast", $("#enfCount").val());
            }
        });
        enfNavID = $("#enfCount").val();
    }
    $(".lblNeu").css("display", "none");
    $(".lblAendern").css("display", "inline");
}

function instanzSpeichern(instanz) {
    if (instanz == "manSpeichern") {
        $.ajax({
            type: 'POST',
            async: true,
            url: 'php/mandantIntoDb.php',
            data: {
                manID: $("#manID").val(),
                modus: "save",

                name: $("#nameAllgemeinMan").val(),
                sAdm_ID_1: $("#sAdmID_1").val(),
                sAdm_ID_2: $("#sAdmID_2").val(),
                holdingstruktur: $("#holdingstrukturAllgemeinMan").is(':checked'),
                liegenschaften: $("#liegenschaftenAllgemeinMan").is(':checked'),
                titelAdmin: $("#titelSystemadminMan").val(),
                nameAdmin: $("#nameSystemadminMan").val(),
                vornameAdmin: $("#vornameSystemadminMan").val(),
                eMailAdmin: $("#emailSystemadminMan").val(),
                telefonAdmin: $("#telefonSystemadminMan").val(),
                faxAdmin: $("#faxSystemadminMan").val(),
                mobiltelefonAdmin: $("#mobiltelefonSystemadminMan").val(),
                mehrbenutzer: $("#mehrbenutzerMan").is(':checked'),
                benutzernameAdmin: $("#benutzernameSystemadminMan").val(),
                passwortAdmin: $("#passwortSystemadminMan").val()
            },
            success: function () {
               
                alert("erfolgreich gespeichert!");
            }
        })
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
                liegID:$("#liegID").val(),
                nameDB: $("#nameDB").val(),

                nameAllgemein: $("#nameAllgemeinLieg").val(),
                eigenstaendigeForm: $("#eigenstaendigeformAllgemeinLieg").is(':checked'),
                aktiv: $("#aktivAllgemeinLieg").is(':checked'),
                gesellschaftsform: $("#gesellschaftsformAllgemeinLieg").val(),
                anschrift: $("#anschriftAllgemeinLieg").val(),
                land: $("#landAllgemeinLieg").val(),
                plz: $("#plzAllgemeinLieg").val(),
                ort: $("#ortAllgemeinLieg").val(),
                typ: $("#typAllgemeinLieg").val(),
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
                energietraeger1: $("#energietraeger1Lieg").val(),
                energietraeger2: $("#energietraeger2Lieg").val(),
                energietraeger3: $("#energietraeger3Lieg").val(),
                energietraeger4: $("#energietraeger4Lieg").val(),
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
                console.log(echo);
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
                energieform: $("#energieformMst").val(),
                ort: $("#ortMst").val(),
                messart: $("#messartMst").val(),
                vorgelagerteMessstelle: $("#vorgelagerteMst").val(),
                messmittelBerechnungslogik: $("#messmittelBerechnungslogikMst").val(),
                notiz: $("#notizAllgemeinMst").val()
            },
            success: function (echo) {
                console.log(echo);
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
                console.log(echo);
                alert("erfolgreich gespeichert!");
                readInstanzen("stdLast", $("#stdCount").val());
            }
        })
    }
    else if (instanz == "anlSpeichern") {
        $.ajax({
            type: 'POST',
            async: true,
            url: 'php/instanzIntoDb.php',
            data: {
                id: "anl",
                modus: "save",
                anlID: $("#anlID").val(),
                nameDB: $("#nameDB").val(),

                //anlagenbild: $("#bildAllgemeinAnl").src(),
                berID: $("#berID").val(),
                anlagennummer: $("#anlagennummerAllgemeinAnl").val(),
                bezeichnung: $("#bezeichnungAllgemeinAnl").val(),
                aktiv: $("#aktivAllgemeinAnl").is(":checked"),
                typ: $("#typAllgemeinAnl").val(),
                standort: $("#standortAllgemeinAnl").val(),
                anschaffungsdatum: $("#datumAnschaffungAllgemeinAnl").val(),
                letzteDurchsichtDatum: $("#datumLetzteDurchsichtAllgemeinAnl").val(),
                jahresbetriebsstunden: $("#betriebsstundenAllgemeinAnl").val(),
                notizAllgemein: $("#notizAllgemeinAnl").val(),
                produkt: $("#produktAllgemeinAnl").val(),
                produktionsmenge: $("#produktionsmenge1AllgemeinAnl").val(),
                produktionsmengeEinheit: $("#einheitProduktionsmenge1AllgemeinAnl").val(),
                produktnummer: $("#produktnummer1AllgemeinAnl").val(),
                mehrProdukte: $("#mehrProdukteAllgemeinAnl").is(":checked"),
                zugeordneterVerbraucher1: $("#zugeordneterVerbraucher1AllgemeinAnl").val(),
                zugeordneterVerbraucher2: $("#zugeordneterVerbraucher2AllgemeinAnl").val(),

                energietraeger1: $("#energietraeger1AllgemeinAnl").val(),
                energieform1: $("#energieform1AllgemeinAnl").val(),
                einheit1: $("#einheit1Anl").val(),
                anschlussleistung1: $("#anschlussleistung1Anl").val(),
                mittlereAuslastungProzent1: $("#mittlereAuslastungProzent1Anl").val(),
                mittlereAuslastungKw1: $("#mittlereAuslastungKw1Anl").val(),
                betriebstemperatur1: $("#betriebstemperatur1Anl").val(),
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
                abwaerme4: $("#abwaerme4Anl").val(),
                abwaermeNutzbarkeit4: $("#nutzbarkeitAbwaerme4Anl").val(),
                bewertungAbwaermeNutzbarkeit4: $("#bewertungNutzbarkeitAbwaerme4Anl").val()
            },
            success: function (echo) {
                console.log(echo);
                alert("erfolgreich gespeichert!");
            }
        })
    }
    else if (instanz == "msmSpeichern") {
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
                bezeichnung: $("#bezeichnungAllgemeinMsm").val(),
                messstelle: $("#messstelleAllgemeinMsm").val(),
                typ: $("#typAllgemeinMsm").val(),
                nrTyp: $("#typNrAllgemeinMsm").val(),
                datumInstallation: $("#installationsdatumAllgemeinMsm").val(),
                energieform: $("#energieformAllgemeinMsm").val(),
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
                messtoleranz: $("#messtoleranzInformationenConfig").val(),
                notizAllgInfos: $("#notiz1InformationenConfig").val(),
                wandlerfaktor: $("#wandlungsfaktorTechnischeDetailsConfig").val(),
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
                console.log(echo);
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
                nameDB: entDB,
                entID: $("#entID").val(),

                name: $("#nameEnt").val(),
                kuerzel: $("#kuerzelEnt").val(),
                notiz: $("#notizEnt").val(),
                aktiv: $("#aktivEnt").is(":checked"),

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
                console.log(echo);
                alert("erfolgreich gespeichert!");              
            }
        })
    }
}

var entOderEnf;

function checkboxenDerEntEnfEinlesen(element) {
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
            var insJson = $.parseJSON(records);

            var status;

            for (i = 0; i < insJson.length; i++) {
                if ($(element).prop("value") == "ent"){
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
            console.log(records);
        }
    });
}

function mapErstellen(untTab) {
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
                }
            });

            var rootNode;

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
            if (untTab == "manMap") {
                // Root node
                rootNode = { Content: insJson[0].nameMan, Nodes: [] };

                insArrAll[0] = { name: insJson[0].nameMan, parent: "null", children: [] };
                for (i = 0; i < insJson.length; i++) {                
                    l = 0;
                    if (insJson[i].ins == "org") {
                        insArrAll[0].children[j] = { name: insJson[i].nameOrg, parent: insJson[0].nameMan, children: [] };
                        for (k = 0; k < insJson.length; k++) {
                            if (insJson[k].ins == "lieg") {
                                if (insJson[k].org_ID == insJson[i].org_ID) {
                                    insArrAll[0].children[j].children[l] = { name: insJson[k].nameLieg, parent: insJson[i].nameOrg, children: [] };                               
                                        for (m = 0; m < insJson.length; m++) {          
                                            if (insJson[m].ins == "ber") {
                                                if (insJson[m].lieg_ID == insJson[k].lieg_ID &&
                                                   (insJson[m].vorgelagerterBereich1Ber == "" ||
                                                    insJson[m].vorgelagerterBereich1Ber == null)) {
                                                    insArrAll[0].children[j].children[l].children[n] = { name: insJson[m].nameBer, parent: insJson[k].nameLieg, children: [] };

                                                    for (o = 0; o < insJson.length; o++) {
                                                        if(insJson[o].ins == "mst"){
                                                            if (insJson[o].ber_ID == insJson[m].ber_ID) {
                                                                insArrAll[0].children[j].children[l].children[n].children[p] = { name: insJson[o].nameMst, parent: insJson[m].nameBer, level: "orange",children: [] };
                                                                p++;
                                                            }
                                                        }
                                                    }                                        
                                                    for (q = 0; q < insJson.length; q++) {
                                                        if (insJson[q].vorgelagerterBereich1Ber == insJson[m].nameBer) {
                                                            insArrAll[0].children[j].children[l].children[n].children[p] = { name: insJson[q].nameBer, parent: insJson[m].nameBer, children: [] };                                                        
                                                            for (f = 0; f < insJson.length; f++) {                                                               
                                                                    if (insJson[f].vorgelagerterBereich1Ber == insJson[q].nameBer) {
                                                                        insArrAll[0].children[j].children[l].children[n].children[p].children[u] = { name: insJson[f].nameBer, parent: insJson[q].nameBer, children: [] };     
                                                                        for (x = 0; x < insJson.length; x++) {
                                                                            if(insJson[x].ins == "ber"){
                                                                                if (insJson[x].vorgelagerterBereich1Ber == insJson[f].nameBer) {
                                                                                    insArrAll[0].children[j].children[l].children[n].children[p].children[u].children[y] = { name: insJson[x].nameBer, parent: insJson[f].nameBer, children: [] };    
                                                                                    for (aa = 0; aa < insJson.length; aa++) {
                                                                                        if (insJson[aa].ins == "ber") {
                                                                                            if (insJson[aa].vorgelagerterBereich1Ber == insJson[x].nameBer) {
                                                                                                insArrAll[0].children[j].children[l].children[n].children[p].children[u].children[y].children[ab] = { name: insJson[aa].nameBer, parent: insJson[x].nameBer, children: [] };  
                                                                                                for (cc = 0; cc < insJson.length; cc++) {
                                                                                                    if (insJson[cc].ins == "ber") {
                                                                                                        if (insJson[cc].vorgelagerterBereich1Ber == insJson[aa].nameBer) {
                                                                                                            insArrAll[0].children[j].children[l].children[n].children[p].children[u].children[y].children[ab].children[ac] = { name: insJson[cc].nameBer, parent: insJson[aa].nameBer, children: [] };  
                                                                                                            for (ee = 0; ee < insJson.length; ee++) {
                                                                                                                if (insJson[ee].ins == "ber") {
                                                                                                                    if (insJson[ee].vorgelagerterBereich1Ber == insJson[cc].nameBer) {
                                                                                                                        insArrAll[0].children[j].children[l].children[n].children[p].children[u].children[y].children[ab].children[ac].children[ad] = { name: insJson[ee].nameBer, parent: insJson[cc].nameBer, children: [] };  
                                                                                                                        for (gg = 0; gg < insJson.length; gg++) {
                                                                                                                            if (insJson[gg].ins == "ber") {
                                                                                                                                if (insJson[gg].vorgelagerterBereich1Ber == insJson[ee].nameBer) {
                                                                                                                                    insArrAll[0].children[j].children[l].children[n].children[p].children[u].children[y].children[ab].children[ac].children[ad].children[ae] = { name: insJson[gg].nameBer, parent: insJson[ee].nameBer, children: [] };  
                                                                                                                                    for (ii = 0; ii < insJson.length; ii++) {
                                                                                                                                        if (insJson[ii].ins == "ber") {
                                                                                                                                            if (insJson[ii].vorgelagerterBereich1Ber == insJson[gg].nameBer) {
                                                                                                                                                insArrAll[0].children[j].children[l].children[n].children[p].children[u].children[y].children[ab].children[ac].children[ad].children[ae].children[af] = { name: insJson[ii].nameBer, parent: insJson[gg].nameBer, children: [] };  
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
                                                                                                                    if (insJson[ff].ber_ID == insJson[cc].ber_ID ) {
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
            else if (untTab == "orgMap") {
               
                for (i = 0; i < insJson.length; i++) {
                    l = 0;
                    if (insJson[i].ins == "org" && insJson[i].nameOrg == $("#nameAllgemeinOrg").val()) {
                        insArrAll[0] = { name: insJson[i].nameOrg, parent: "null", children: [] };
                        for (k = 0; k < insJson.length; k++) {
                            if (insJson[k].ins == "lieg") {
                                if (insJson[k].org_ID == insJson[i].org_ID) {
                                    insArrAll[0].children[j] = { name: insJson[k].nameLieg, parent: insJson[i].nameOrg, children: [] };
                                    for (m = 0; m < insJson.length; m++) {
                                        if (insJson[m].ins == "ber") {
                                            if (insJson[m].lieg_ID == insJson[k].lieg_ID &&
                                                (insJson[m].vorgelagerterBereich1Ber == "" ||
                                                    insJson[m].vorgelagerterBereich1Ber == null)) {
                                                insArrAll[0].children[j].children[l] = { name: insJson[m].nameBer, parent: insJson[k].nameLieg, children: [] };

                                                for (o = 0; o < insJson.length; o++) {
                                                    if (insJson[o].ins == "mst") {
                                                        if (insJson[o].ber_ID == insJson[m].ber_ID) {
                                                            insArrAll[0].children[j].children[l].children[n] = { name: "Mst-" + insJson[o].nameMst, parent: insJson[m].nameBer, level: "orange", children: [] };
                                                            p++;
                                                        }
                                                    }
                                                }
                                                for (q = 0; q < insJson.length; q++) {
                                                    if (insJson[q].vorgelagerterBereich1Ber == insJson[m].nameBer) {
                                                        insArrAll[0].children[j].children[l].children[n] = { name: insJson[q].nameBer, parent: insJson[m].nameBer, children: [] };
                                                        for (f = 0; f < insJson.length; f++) {
                                                            if (insJson[f].ins == "ber") {
                                                                if (insJson[f].vorgelagerterBereich1Ber == insJson[q].nameBer) {
                                                                    insArrAll[0].children[j].children[l].children[n].children[p] = { name: insJson[f].nameBer, parent: insJson[q].nameBer, children: [] };
                                                                    u++;
                                                                }
                                                            }
                                                        }
                                                        for (g = 0; g < insJson.length; g++) {
                                                            if (insJson[g].ins == "mst") {
                                                                if (insJson[g].ber_ID == insJson[q].ber_ID) {
                                                                    insArrAll[0].children[j].children[l].children[n].children[p] = { name: insJson[g].nameMst, parent: insJson[q].nameBer, level: "orange", children: [] };
                                                                    p++;
                                                                }
                                                            }
                                                        }
                                                        p = 0;
                                                        n++;
                                                    }
                                                }
                                                n = 0;
                                                l++;
                                            }
                                        }
                                    }
                                    n = 0;
                                    j++;
                                }
                            }
                        }
                        j = 0;                       
                    }
                }
            }
            else if (untTab == "lieg") {

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
            var margin = { top: 20, right: 120, bottom: 20, left: 180 },
                width = 3000 - margin.right - margin.left,
                height = 1800 - margin.top - margin.bottom;

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

            function collapse(d) {
                if (d.children) {
                    d._children = d.children;
                    d._children.forEach(collapse);
                    d.children = null;
                }
            }

            root.children.forEach(collapse);

            update(root);

            d3.select(self.frameElement).style("height", "500px"); 

          
            function update(source) {

                // Compute the new tree layout.
                var nodes = tree.nodes(root).reverse(),
                    links = tree.links(nodes);

                // Normalize for fixed-depth.
                nodes.forEach(function (d) { d.y = d.depth * 180; });

                // Update the nodes…
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

                // Update the links…
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

function bereichsAuswahllisteErstellen(gehoertZu) {
    if (gehoertZu.id == "berSuchenVBereich1" ||
        (gehoertZu.id == "berSuchenVBereich2" && $("#vorgelagerteBereiche2AllgemeinBer").prop("disabled") == false) ||
        gehoertZu.id == "anlAuswahlBer") {
    $.ajax({
        type: 'POST',
        async: true,
        url: 'php/getBereiche.php',
        data: {
            id:"berAuswahl",
            liegID: $("#liegID").val(),
            nameDB: $("#nameDB").val()
        },
        success: function (records) {
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
                    $("#tblBereichelisteBer").disableSelection();

                    //Hover Cursor festlegen
                    $("#tblBereichelisteBer tbody tr").css("cursor", "pointer");

                    //Event Handler entfernen
                    $("#tblBereichelisteBer tbody").off("dblclick", "tr");

                    //Bereich auswählen und in Form einlesen
                    $("#tblBereichelisteBer tbody").on("dblclick", "tr", function () {
                        var data = tblBereichAussuchen.row(this).data();

                        if (gehoertZu.id == "berSuchenVBereich1"){
                            $("#vorgelagerteBereiche1AllgemeinBer").val(data[1]);
                        }
                        if (gehoertZu.id == "berSuchenVBereich2") {
                            $("#vorgelagerteBereiche2AllgemeinBer").val(data[1]);
                        }
                        if (gehoertZu.id == "anlAuswahlBer") {
                            $("#bereichAllgemeinAnl").val(data[1]);
                            $("#berID").val(data[0]);
                        }
                        $("#bereichListeContainer").dialog("close");
                    });
                }
            });
        }
    });
    }
}

function messstellenAuswahllisteErstellen() {
    $.ajax({
        type: 'POST',
        async: true,
        url: 'php/getMessstellen.php',
        data: {
            berID: $("#berID").val(),
            nameDB: $("#nameDB").val()
        },
        success: function (records) {
            var MstJson = JSON.parse(records);

            //Spaltenreihenfolge Resetten
            tblVorgelagerteMessstelleAuswahl.colReorder.reset();

            //Zeilen leeren
            tblVorgelagerteMessstelleAuswahl.clear().draw();

            for (var i = 0; i < MstJson.length; i++) {

                tblVorgelagerteMessstelleAuswahl.row.add([
                    MstJson[i].nameMSt,
                    MstJson[i].kurzbezeichnungMst
                ]).draw();
            }

            $("#messstellenListeContainer").css("display", "block");
            $("#messstellenListeContainer").dialog({
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

                    //Bereich auswählen und in Form einlesen
                    $("#tblMessstellenlisteMst tbody").on("dblclick", "tr", function () {
                        var data = tblVorgelagerteMessstelleAuswahl.row(this).data();

                        $("#vorgelagerteMst").val(data[0]);
                 
                        $("#messstellenListeContainer").dialog("close");
                    });
                }
            });
        }
    });
}

function bereicheMessstellenlisteErstellen() {
    $("#anlListeContainer tr").not("#anlListeContainer tr:nth-child(1)").remove();
    //DataTable definieren

    $.ajax({
        type: 'POST',
        async: true,
        url: 'php/getBereiche.php',
        data: {
            id:"berMstListe",
            nameDB: $("#nameDB").val()
        },
        success: function (records) {
            var berJson = JSON.parse(records);

            //Spaltenreihenfolge Resetten
            tblBereicheMessstellen.colReorder.reset();

            //Zeilen leeren
            tblBereicheMessstellen.clear().draw();

            for (var i = 0; i < berJson.length; i++) {

                tblBereicheMessstellen.row.add([
                    berJson[i].nameBer,
                    berJson[i].vorgelagerterBereich1Ber,
                    berJson[i].vorgelagerterBereich2Ber,
                    berJson[i].nameMSt                  
                ]).draw();
            }

            $("#bereichMesstellenListe").css("display", "block");
            $("#bereichMesstellenListe").dialog({
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
                    $("#tblBereichelisteAnl").disableSelection();

                    //Hover Cursor festlegen
                    $("#tblBereichelisteAnl tbody tr").css("cursor", "pointer");

                    ////Anlage auswählen und in Form einlesen
                    //$("#tblBereichelisteAnl tbody").on("dblclick", "tr", function () {
                    //    var data = tblAnlagen.row(this).data();

                    //    $("#bereichAllgemeinAnl").val(data[3]);
                    //    $("#anlListeContainer").dialog("close");

                    //    clearFields("anlHinz");
                    //    readInstanzen("anlFirst", data[0]);
                    //});

                    ////Anlagenliste Optionen(Buttons)
                    //$(".anlDialogButton").click(function () {
                    //    var caseVal = "";
                    //    caseVal = $(this).text();
                    //    switch (caseVal) {
                    //        case "Schema Speichern":
                    //            break;
                    //        case "Schließen":
                    //            $("#anlListeContainer").dialog("close");
                    //    }
                    //});
                }
            });

        }
    });

}

function standorteListeErstellen(gehoertZu) {
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
            tblStandorte.colReorder.reset();

            //Zeilen leeren
            tblStandorte.clear().draw();

            for (var i = 0; i < stdJson.length; i++) {

                tblStandorte.row.add([
                    stdJson[i].nameStd,
                    stdJson[i].kurzbezeichnungStd,
                    stdJson[i].flaecheStd,
                ]).draw();
            }

            $("#stdListeContainer").css("display", "block");
            $("#stdListeContainer").dialog({
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
                    $("#tblStandorteListe").disableSelection();

                    //Hover Cursor festlegen
                    $("#tblStandorteListe tbody tr").css("cursor", "pointer");   

                    $("#tblStandorteListe tbody").off("dblclick", "tr");

                    //Standort auswählen und in Form einlesen
                    $("#tblStandorteListe tbody").on("dblclick", "tr", function () {
                        var data = tblStandorte.row(this).data();

                        if (gehoertZu.id == "berSuchenOrt") {
                            $("#ortBer").val(data[0]);
                        }
                        else if (gehoertZu.id == "ortSuchenMst") {
                            $("#ortMst").val(data[0]);
                        }
                        else if (gehoertZu.id == "anlAuswahlStd") {
                            $("#standortAllgemeinAnl").val(data[0]);
                        }
                        $("#stdListeContainer").dialog("close");
                        
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
                    anlJson[i].ber_ID,
                    anlJson[i].nameLieg,                   
                    anlJson[i].nameBer,
                    anlJson[i].nummerAnl,
                    anlJson[i].bezeichnungAnl,
                    anlJson[i].standortAnl,
                    anlJson[i].datumAnschaffungAnl,
                    anlJson[i].datumLetzteDurchsichtAnl,
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

                    //Anlage auswählen und in Form einlesen
                    $("#anlagenListe tbody").on("dblclick", "tr", function () {
                        var data = tblAnlagen.row(this).data();                        

                        $("#berID").val(data[1]);
                        $("#bereichAllgemeinAnl").val(data[3]);
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
                            case "Schließen":
                                $("#anlListeContainer").dialog("close");
                        }
                    });
                }
            });

        }
    });
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

}

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

            for (i = 0; i < anlSpOrdJson.length-1; i++) {
            }
            tblAnlagen.colReorder.order(0, 1, anlSpOrdJson);
        }

    });
}

function anlagenlistenSchemaEinlesen () {
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

function toggleColumnsOnOff(element) {
    for (i = 0; i < tblAnlagen.columns().nodes().length; i++) {
        if ($(tblAnlagen.column(i).header()).text() == $(element).prop("value"))
            tblAnlagen.column(i).visible($(element).is(":checked"));
        tblAnlagen.columns.adjust().draw();
    } 
}

function benutzerErstellen() {

    $.ajax({
        type: 'POST',
        async: true,
        url: '../php/companyStructureIntoDb.php',
        data: {
            id:"ben",
            mandant:$("#manAuswahlBen"),
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
    if(whom == "std"){
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
    else{
        if ($("#"+ whom + "FaktorX1").css("display") == "none") {
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

