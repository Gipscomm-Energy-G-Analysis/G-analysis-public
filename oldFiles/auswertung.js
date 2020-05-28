//.................................................................................................
//
// Objekte und Funktionen
// Add chart
var charts = [];
function addLineChart(vorl) {
    charts[charts.length] = AmCharts.makeChart("chartDiv" + (charts.length + 1), {
        "type": "serial",
        "theme": "light",
        "titles": [{
                "text": $(".liegPfad")
                    .val()
            },
            {
                "text": ""
            }
            ],
        "marginRight": 80,
        "autoMarginOffset": 20,
        "marginTop": 7,
        "dataDateFormat": "HH:NN",
        "startDuration": 0,
        "categoryAxis": {
            "parseDates": false
        },
        "legend": {
            "enabled": true,
            "useGraphSettings": true
        },
        "valueAxes": [{
            "titel": "Verbrauch[kWh]",
            "axisAlpha": 0.2,
            "dashLength": 1,
            "position": "left"
            }],
        "mouseWheelZoomEnabled": true,
        //"graphs": [],
        "chartScrollbar": {
            "autoGridCount": true,
            "scrollbarHeight": 40
        },
        "chartCursor": {
        },
        "categoryField": "DatumZeit",
        "categoryAxis": {
            "parseDates": false,
            "axisColor": "#DADADA",
            "dashLength": 1,
            "minorGridEnabled": true
        },
        "export": {
            "enabled": true
        }
    });
}
// Add graph and dataset to chart
var graphs = [];
function addGraphAndDataset(messstelle, chart) {
    var j = 0;
    var mstMw = [];
    var colors = ["green", "blue", "orange"];
    for (i = 0; i < messstellen.length - 1; i++) {
        //alert(messstellen[i].name);
        if (messstellen[i].name != "undefined" && messstellen[i].name != null && messstellen[i].name != "") {
            var mstName = messstellen[i].name;
            var g = new AmCharts.AmGraph();
            g.precision = 2;
            g.lineColor = colors[i];
            g.bullet = "round";
            g.bulletBorderThickness = 1;
            g.hideBulletsCount = 30;
            g.title = mstName;
            g.valueField = "Verbrauch" + (j + 1);
            g.fillAlphas = 0;
            if ($("#kurve1")
                .val() != "" && $("#kurve2")
                .val() == "" && $("#kurve3")
                .val() == "") {
                charts[chart].dataProvider = messstellen[i].messwerte;
                if (charts[chart].graphs.length == 1) {
                    charts[chart].removeGraph(charts[chart].graphs[0]);
                }
            } else if ($("#kurve1")
                .val() != "" && $("#kurve2")
                .val() != "" && $("#kurve3")
                .val() == "") {
                for (k = 0; k < messstellen[i].messwerte.length; k++) {
                    mstMw[k] = {
                        DatumZeit: messstellen[0].messwerte[k].DatumZeit,
                        Verbrauch1: messstellen[0].messwerte[k].Verbrauch1,
                        Verbrauch2: messstellen[1].messwerte[k].Verbrauch2
                    }
                }
                if (charts[chart].graphs.length == 2) {
                    charts[chart].removeGraph(charts[chart].graphs[0]);
                }
                charts[chart].dataProvider = mstMw;
            } else {
                for (k = 0; k < messstellen[i].messwerte.length; k++) {
                    mstMw[k] = {
                        DatumZeit: messstellen[0].messwerte[k].DatumZeit,
                        Verbrauch1: messstellen[0].messwerte[k].Verbrauch1,
                        Verbrauch2: messstellen[1].messwerte[k].Verbrauch2,
                        Verbrauch3: messstellen[2].messwerte[k].Verbrauch3
                    }
                }
                charts[chart].dataProvider = mstMw;
            }
            j++;
            charts[chart].addGraph(g);
            g = null;
            //alert(charts[chart].graphs.length);
            if (charts[chart].graphs.length == 4) {
                charts[chart].removeGraph(charts[chart].graphs[0]);
            }
        }
    }
    charts[chart].validateData();
}
//Add guide(to display mean)
//function addGuide(messstelle, chart) {
//    var guide = new AmCharts.Guide();
//        mean(messstelle, 1);
//        //alert(avg);
//        guide.value = avg;
//        guide.label = avg.toFixed(1);
//        guide.color = "red"
//        guide.position = "right";
//        guide.dashLength = 5;
//        guide.lineColor = "red";
//        guide.lineAlpha = 1;
//        guide.lineThickness = 2;
//        charts[chart].valueAxes[charts[chart].valueAxes.length - 1].addGuide(guide);
//        charts[chart].validateNow();
//}
// Remove graphs
function removeGraphs(chart) {
    charts[chart].removeGraph(charts[chart].graphs[0]);
}
function removeGuides(chart) {
    charts[chart].valueAxes[0].guides.pop();
    charts[chart].validateNow();
}
var messstellen = [];
for (i = 0; i < 6; i++) {
    messstellen[i] = new Messstelle();
}
function removeMessstelle(mst) {
    messstellen.splice(messstellen.length - 1, 1);
}
// Eine neue Messstelleninstanz wird erstellt.
function neueMstInstanz(kurve) {
    messstellen[kurve].name = $("#kurve" + (kurve + 1))
        .val();
    messstellen[kurve].channels = channels;
    messstellen[kurve].wandlungsfaktor = wandlungsfaktoren[kurve];
    messstellen[kurve].messwerte = messwerte;
    for (j = 0; j < messstellen.length; j++) {
        console.log(messstellen[j].messwerte);
    }
}
//Objektdeklaration Messstelle
function Messstelle() {
    this.name;
    this.channels;
    this.wandlungsfaktor;
    this.messwerte;
}
//Objektdeklaration EnergietraegerSpaEfV
function EnergietraegerSpaEfV() {
}
//Eigenschaften
//----------------------------------------------------------------------------------
EnergietraegerSpaEfV.prototype.name;
EnergietraegerSpaEfV.prototype.verbrauchProJahr;
EnergietraegerSpaEfV.prototype.kostenProJahr;
EnergietraegerSpaEfV.prototype.messsystem;
EnergietraegerSpaEfV.prototype.genauigkeit;
//Methoden
//----------------------------------------------------------------------------------
//Setter
EnergietraegerSpaEfV.prototype.setName = function (name) {
    if (name == null || name == "undefined" || name == "") {
        this.getNachrichten(0, "name");
    } else if (name.length < 3) {
        this.getNachrichten(2, "name");
    } else {
        this.name = name;
    }
}
EnergietraegerSpaEfV.prototype.setVerbrauchProJahr = function (verbrauchProJahr) {
    if (verbrauchProJahr == null || verbrauchProJahr == "undefined" || verbrauchProJahr == "") {
        this.getNachrichten(0, "verbrauchProJahr");
    } else {
        if ($.isNumeric(verbrauchProJahr)) {
            this.verbrauchProJahr = verbrauchProJahr;
        } else {
            this.getNachrichten(1, "Der Verbrauch");
        }
    }
}
EnergietraegerSpaEfV.prototype.setKostenProJahr = function (kostenProJahr) {
    if (kostenProJahr == null || kostenProJahr == "undefined" || kostenProJahr == "") {
        this.getNachrichten(0, "kostenProJahr");
    } else {
        if ($.isNumeric(kostenProJahr)) {
            this.kostenProJahr = kostenProJahr;
        } else {
            this.getNachrichten(1, "Die Kosten pro Jahr");
        }
    }
}
EnergietraegerSpaEfV.prototype.setMesssystem = function (messsystem) {
    if (messsystem == null || messsystem == "undefined" || messsystem == "") {
        this.getNachrichten(0, "messsystem");
    } else {
        if ($.isNumeric(messsystem)) {
            this.messsystem = messsystem;
        } else {
            this.getNachrichten(1, "Das Messsystem");
        }
    }
}
EnergietraegerSpaEfV.prototype.setGenauigkeit = function (genauigkeit) {
    if (genauigkeit == null || genauigkeit == "undefined" || genauigkeit == "") {
        this.getNachrichten(0, "genauigkeit");
    } else {
        if ($.isNumeric(genauigkeit)) {
            this.genauigkeit = genauigkeit;
        } else {
            this.getNachrichten(1, "Die Genauigkeit");
        }
    }
}
//Getter
EnergietraegerSpaEfV.prototype.getName = function () {
    return this.name;
}
EnergietraegerSpaEfV.prototype.getVerbrauchProJahr = function () {
    return this.verbrauchProJahr;
}
EnergietraegerSpaEfV.prototype.getKostenProJahr = function () {
    return this.kostenProJahr;
}
EnergietraegerSpaEfV.prototype.getMesssystem = function () {
    return this.messsystem;
}
EnergietraegerSpaEfV.prototype.getGenauigkeit = function () {
    return this.genauigkeit;
}
EnergietraegerSpaEfV.prototype.getNachrichten = function (modus, propString) {
    var prop = "Der Eigenschaft ";
    if (modus == 0) {
        alert(prop + String.fromCharCode(34) + propString + String.fromCharCode(34) + " wurde kein Wert �bergeben!");
    } else if (modus == 1) {
        alert(propString + " muss als Zahl �bergeben werden!");
    } else if (modus == 2) {
        alert(prop + String.fromCharCode(34) + propString + String.fromCharCode(34) + " m�ssen mindestens 3 Zeichen �bergeben werden!");
    }
}
EnergietraegerSpaEfV.prototype.getEigenschaftenArray = function () {
    var array = [this.name, this.verbrauchProJahr, this.kostenProJahr, this.messsystem, this.genauigkeit];
}
//Objektdeklaration EnergieverbrauchswerteSpaEfV
function EnergieverbrauchswerteSpaEfV() {
}
EnergieverbrauchswerteSpaEfV.prototype.jahr;
EnergieverbrauchswerteSpaEfV.prototype.ueberschrift;
EnergieverbrauchswerteSpaEfV.prototype.listeEnergietraeger = [];
EnergieverbrauchswerteSpaEfV.prototype.summeVerbrauch = 0;
EnergieverbrauchswerteSpaEfV.prototype.summeKosten = 0;
EnergieverbrauchswerteSpaEfV.prototype.anzahlEnergietraeger = 0;
EnergieverbrauchswerteSpaEfV.prototype.anteileEnergietraeger = {
    verbrauchsanteil: [],
    kostenanteil: []
};
EnergieverbrauchswerteSpaEfV.prototype.setJahr = function (jahr) {
    if (jahr == null || jahr == "undefined" || jahr == "") {
        alert("Der Methode" + String.fromCharCode(34) + "setJahr" + String.fromCharCode(34) + " wurde kein Argument �bergeben");
    } else {
        if ($.isNumeric(jahr) && jahr.length == 4) {
            this.jahr = jahr;
        } else {
            alert("Der Eigenschaft " + String.fromCharCode(34) + "jahr," + String.fromCharCode(34) + " muss eine Jahreszahl im Muster: " + String.fromCharCode(34) + "2015" + String.fromCharCode(34) + " �bergeben werden!");
        }
    }
}
EnergieverbrauchswerteSpaEfV.prototype.setUeberschrift = function (ueberschrift) {
    if (ueberschrift == null || ueberschrift == "undefined" || ueberschrift == "") {
        alert("Der Methode" + String.fromCharCode(34) + "setUeberschrift" + String.fromCharCode(34) + " wurde kein Argument �bergeben");
    } else {
        if (ueberschrift.length < 3) {
            alert("Die �berschrift muss mindestens 3 Zeichen lang sein!");
        } else {
            this.ueberschrift = ueberschrift + " " + this.jahr;
        }
    }
}
EnergieverbrauchswerteSpaEfV.prototype.setListeEnergietraeger = function (listeEnergietraeger) {
    if (listeEnergietraeger == null || listeEnergietraeger == "undefined" || listeEnergietraeger == "") {
        alert("Der Methode" + String.fromCharCode(34) + "setListeEnergietraeger" + String.fromCharCode(34) + " wurde kein Argument �bergeben!");
    } else {
        if (listeEnergietraeger.length == 0) {
            alert("Es wurde ein leeres Array �bergeben!");
        } else {
            this.listeEnergietraeger = listeEnergietraeger;
        }
    }
}
EnergieverbrauchswerteSpaEfV.prototype.setSummeVerbrauch = function () {
    var summeVerbrauch = 0;
    for (f = 0; f < this.listeEnergietraeger.length; f++) {
        summeVerbrauch += parseFloat(this.listeEnergietraeger[f].getVerbrauchProJahr());
    }
    this.summeVerbrauch = summeVerbrauch;
}
EnergieverbrauchswerteSpaEfV.prototype.setSummeKosten = function () {
    var summeKosten = 0;
    for (f = 0; f < this.listeEnergietraeger.length; f++) {
        summeKosten += parseFloat(this.listeEnergietraeger[f].getKostenProJahr());
    }
    this.summeKosten = summeKosten;
}
EnergieverbrauchswerteSpaEfV.prototype.setAnteileEnergietraeger = function () {
    var verbrauchsanteil;
    var kostenanteil;
    for (g = 0; g < this.listeEnergietraeger.length; g++) {
        verbrauchsanteil = this.listeEnergietraeger[g].getVerbrauchProJahr() * 100 / this.summeVerbrauch;
        kostenanteil = this.listeEnergietraeger[g].getKostenProJahr() * 100 / this.summeKosten;
        this.anteileEnergietraeger.verbrauchsanteil[g] = verbrauchsanteil;
        this.anteileEnergietraeger.kostenanteil[g] = kostenanteil;
    }
}
//Getter
EnergieverbrauchswerteSpaEfV.prototype.getJahr = function () {
    return this.jahr;
}
EnergieverbrauchswerteSpaEfV.prototype.getUeberschrift = function () {
    return this.ueberschrift;
}
EnergieverbrauchswerteSpaEfV.prototype.getListeEnergietraeger = function () {
    return this.listeEnergietraeger;
}
EnergieverbrauchswerteSpaEfV.prototype.getSummeVerbrauch = function () {
    return this.summeVerbrauch;
}
EnergieverbrauchswerteSpaEfV.prototype.getSummeKosten = function () {
    return this.summeKosten;
}
EnergieverbrauchswerteSpaEfV.prototype.getAnzahlEnergietraeger = function () {
    return this.listeEnergietraeger.length;
}
EnergieverbrauchswerteSpaEfV.prototype.getAnteileEnergietraeger = function () {
    return this.anteileEnergietraeger;
}
EnergieverbrauchswerteSpaEfV.prototype.addEnergietraeger = function (energietraeger) {
    this.listeEnergietraeger[this.anzahlEnergietraeger] = energietraeger;
}
EnergieverbrauchswerteSpaEfV.prototype.tblPieChartBlockErstellen = function (wrapperID, tblID) {
    var anzahlEnergietraeger = this.listeEnergietraeger.length;
    var tbodyHtmlString = "";
    for (k = 0; k < anzahlEnergietraeger; k++) {
        tbodyHtmlString += "<tr>";
        tbodyHtmlString += "<td>" + this.jahr + "</td>";
        tbodyHtmlString += "<td>" + this.listeEnergietraeger[k].getName() + "</td>";
        tbodyHtmlString += "<td>" + this.listeEnergietraeger[k].getVerbrauchProJahr() + "</td>";
        tbodyHtmlString += "<td>" + this.anteileEnergietraeger.verbrauchsanteil[k] + "</td>";
        tbodyHtmlString += "<td>" + this.listeEnergietraeger[k].getKostenProJahr() + "</td>";
        tbodyHtmlString += "<td>" + this.anteileEnergietraeger.kostenanteil[k] + "</td>";
        tbodyHtmlString += "<td>" + this.listeEnergietraeger[k].getMesssystem() + "</td>";
        tbodyHtmlString += "<td>" + this.listeEnergietraeger[k].getGenauigkeit() + "</td>";
        tbodyHtmlString += "</tr>";
    }
    var htmlString = "<table id='" + tblID + "' class='stripe hover row-border compact dt- left custom' style='font-size:12px; margin - top:10px; text - align:left; border: 1px solid black; margin - right:10px;'>";
    htmlString += "< thead >";
    htmlString += "<tr>";
    htmlString += "<th>Jahr</th>";
    htmlString += "<th>Energietr�ger</th>";
    htmlString += "<th>Jahresverbrauch</th>";
    htmlString += "<th>Verbrauchsanteil</th>";
    htmlString += "<th>Kosten</th>";
    htmlString += "<th>Kostenanteil</th>";
    htmlString += "<th>Messsystem</th>";
    htmlString += "<th>Genauigkeit</th>";
    htmlString += "</tr>";
    htmlString += "</thead >";
    htmlString += "<tbody></tbody>";
    htmlString += "</table >";
    $("#" + wrapperID)
        .append(htmlString);
}
//Objektdeklaration SpaEfVTabelle1
function SpaEfVTabelle1() {
}
SpaEfVTabelle1.prototype.nameMandant;
SpaEfVTabelle1.prototype.energietraegerJahresverbrauchsBlocks = [];
SpaEfVTabelle1.prototype.energietraegerJahresverbrauchZusammenfassung
//Objektdeklaration StandardVorlage
function StandardVorlage(id, typ, name, datentabelle, stundenwerte, tageswerte, wochenwerte, monatswerte, jahreswerte, anzahlKurven) {
    this.id = id;
    this.typ = typ;
    this.name = name;
    this.datentabelle = datentabelle;
    this.stundenwerte = stundenwerte;
    this.tageswerte = tageswerte;
    this.wochenwerte = wochenwerte;
    this.monatswerte = monatswerte;
    this.jahreswerte = jahreswerte;
    this.anzahlKurven = anzahlKurven;
}
var standardVorlagen = [];
function standardVorlagenEinlesen() {
    $.ajax({
        type: 'POST',
        async: true,
        url: 'php/getStandardVorlagen.php',
        data: {
            nameDB: $("#nameDB")
                .val()
        },
        success: function (data) {
            console.log(JSON.parse(data));
            var vorlJson = data;
            getStandardVorlagen(vorlJson);
        }
    });
}
function getStandardVorlagen(vorlJson) {
    var records = JSON.parse(vorlJson);
    $(".liVorl")
        .remove();
    for (i = 0; i < records.length; i++) {
        standardVorlagen[i] = new StandardVorlage(records[i].dia_ID, records[i].typ, records[i].nameVorlage, records[i].datentabelle, records[i].stundenwerte, records[i].tageswerte, records[i].wochenwerte, records[i].monatswerte, records[i].jahreswerte, records[i].anzahlKurven);
        $("#standardBerichteContainer")
            .append("<li class='ui-menu-item liVorl' value='" + i + "'><a tabindex='-1' class='ui-menu-item-wrapper' onclick='standardVorlMenuClick(" + i + ");' role='menuitem' href='#'>" + records[i].nameVorlage + "</a></li>");
    }
}
function mean(messstelle, index) {
    var n;
    n = messstelle.messwerte.length;
    //alert("AnzahlMsts: " + n);
    var sum = 0;
    var verbrauch = 0;
    for (i = 0; i < n; i++) {
        if (messstelle.messwerte[i]["Verbrauch" + index] == null) {
            n--;
        } else {
            verbrauch = messstelle.messwerte[i]["Verbrauch" + index];
            sum += parseFloat(verbrauch);
        }
    }
    avg = sum / n;
    avg = parseFloat(avg);
}
var channels = [];
var wandlungsfaktoren = [];
var messwerte = [];
function channelsUndWandlungsfaktorZuweisen(name) {
    //alert("in channelsUndWandlungsfaktoren->name.val(): " + name.val());
    if (name.val() == null || name.val() == "") {
        alert("Property .name is undefined!");
    } else {
        $.ajax({
            type: 'POST',
            async: true,
            url: 'php/getChannelsWandlungsfaktorForAnalysis.php',
            data: {
                nameDB: $("#nameDB")
                    .val(),
                messstelle: name.val(),
            },
            success: function (data) {
                //console.log(JSON.parse(data));
                var chaJson = data;
                var kurve;
                var id = name.prop("id");
                //alert(id);
                kurve = id.substr(id.length - 1);
                kurve = parseInt(kurve) - 1;
                //alert(kurve);
                getChannelsUndWandlungsfaktor(chaJson, kurve);
                messwerteEinlesen(kurve);
                //alert("ID Kurve: " + kurve);
            }
        });
    }
}
function getChannelsUndWandlungsfaktor(chaJson, kurve) {
    var records = JSON.parse(chaJson);
    console.log(records);
    channels[kurve] = [records[0].kanal1Msm, records[0].kanal2Msm, records[0].kanal3Msm];
    wandlungsfaktoren[kurve] = records[0].wandlungsfaktorMsm;
}
function messwerteEinlesen(kurve) {
    if ($("#nameDB")
        .val() == "001_heco" || $("#nameDB")
        .val() == "002_badber" || $("#nameDB")
        .val() == "003_tauchzor" || $("#nameDB")
        .val() == "008_gipshold") {
        type = 0;
    } else if ($("#nameDB")
        .val() == "004_derhof" || $("#nameDB")
        .val() == "007_linsdr") {
        type = 1;
    }
    var verbrauchString = "Verbrauch" + (kurve + 1);
    //alert("Anzahl Graphen: " + graphs.length);
    //alert(graphs);
    $.ajax({
        type: 'POST',
        async: true,
        url: 'php/getMesswerte.php',
        data: {
            nameDB: $("#nameDB")
                .val(),
            type: type,
            intervall: $(".intervall:checked")
                .prop("value"),
            valueField: verbrauchString,
            wandlungsfaktor: wandlungsfaktoren[kurve],
            channel1: channels[kurve][0],
            channel2: channels[kurve][1],
            channel3: channels[kurve][2]
        },
        success: function (records) {
            var mswJson = records;
            console.log(records);
            getMesswerte(mswJson, kurve);
        }
    });
}
function getMesswerte(mswJson, kurve) {
    var records = JSON.parse(mswJson);
    messwerte = records;
    neueMstInstanz(kurve);
    if (messstellen.length == 0) {
        alert("Es wurde keine Messstelle instanziiert!");
    } else {
        addGraphAndDataset(messstellen[kurve], 0);
        //addGuide(messstellen[kurve], 0);
        // $(this).prop("disabled", true);
    }
}
function standardVorlMenuClick(indexStdVorl) {
    $("#auswertungen")
        .css("display", "none");
    $("#bericht")
        .css("display", "block");
    $("#infoBody")
        .css("display", "none");
    $("#stammdaten")
        .css("display", "none");
    $("#optionen")
        .css("display", "none");
    $("#manuell")
        .css("display", "none");
    var tabKategorienString = "#tabsUnternehmensstruktur, #tabsAnlagenverwaltung, #tabsPruefmittelverwaltung, #tabsMessmittelverwaltung, #tabsKennzahlenAlarme, #tabsOptionen, #tabsManuell";
    //Tabs ausblenden
    $(tabKategorienString)
        .css("display", "none");
    //vorhandenen Chart l�schen
    $(".standard")
        .remove();
    charts = [];
    graphs = [];
    //24h und 7d Charts ausblenden
    $("#chartdivStuDerW1, #chartdivStuDerW2, #chartdivStuBB, #chartdivStuBB2")
        .css("display", "none");
    $("#chartdivStuHeCo1,#chartdivStuHeCo2,#chartdivStuTaucha1,#chartdivStuTaucha2")
        .css("display", "none");
    $("#chartdivStuZorbau1,#chartdivStuZorbau2")
        .css("display", "none");
    //Intervall checken
    $(".intervall")
        .eq(indexStdVorl)
        .prop("checked", true);
    //Chart erstellen
    $("fieldset")
        .prepend("<div id='chartDiv" + (charts.length + 1) + "' class='standard' style='height: 400px; background-color:white;'></div>");
    if (standardVorlagen[indexStdVorl].typ == "line") {
        addLineChart(standardVorlagen[indexStdVorl]);
    } else if (standardVorlagen[indexStdVorl].typ == "column") {
        addColumnChart(standardVorlagen[indexStdVorl]);
    }
};
