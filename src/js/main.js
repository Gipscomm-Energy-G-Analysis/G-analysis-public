var listeOrganisationen = [];

//Klassenstruktur
//--------------------------------------------------------------

//Klasse Mandant
function Mandant() {

    this.name;
    this.organisationen();

    this.neueMandantUI = function () {

    }
}

//Klasse Organisation
function Organisation(organisation,mandant) {
        
    this.organisation = organisation;
    this.mandant = mandant;
    this.nameAllgemein;
    this.gesellschaftsform;
    this.firmenanschrift;
    this.land;
    this.plz;
    this.ort;
    this.holdingstruktur;
    this.hrbNummer;
    this.titelGeschaeftsfuehrung;
    this.nameGeschaeftsfuehrung;
    this.vornameGeschaeftsfuehrung;
    this.eMailGeschaeftsfuehrung;
    this.telefonGeschaeftsfuehrung;
    this.faxGeschaeftsfuehrung;
    this.mobiltelefonGeschaeftsfuehrung;
    this.titelEnergiemanagement;
    this.nameEnergiemanagement;
    this.vornameEnergiemanagement;
    this.eMailEnergiemanagement;
    this.telefonEnergiemanagement;
    this.faxEnergiemanagement;
    this.mobiltelefonEnergiemanagement;
    this.unterorganisationen();
    this.liegenschaften();

    this.neueOrganisationUI = function () {

    }    
}

//Klasse Liegenschaft
function Liegenschaft(liegenschaft,organisation) {
    
    this.liegenschaft = liegenschaft;
    this.organisation = organisation;
    this.nameAllgemein;
    this.eigenstaendigeForm;
    this.gesellschaftsform;
    this.anschrift;
    this.land;
    this.plz;
    this.ort;
    this.titelAnsprechpartner;
    this.nameAnsprechpartner;
    this.vornameAnsprechpartner;
    this.eMailAnsprechpartner;
    this.telefonAnsprechpartner;
    this.faxAnsprechpartner;
    this.mobiltelefonAnsprechpartner;
    this.titelEnergiebeauftragter;
    this.nameEnergiebeauftragter;
    this.vornameEnergiebeauftragter;
    this.eMailEnergiebeauftragter;
    this.telefonEnergiebeauftragter;
    this.faxEnergiebeauftragter;
    this.mobiltelefonEnergiebeauftragter;
    this.managementsysteme();
    this.energieformen();
    this.unterliegenschaften();
    this.bereiche();
        
    this.neueLiegenschaftUI = function () {

    }
}

//Klasse Bereich
function Bereich(bereich, liegenschaft) {

    this.bereich = bereich;
    this.liegenschaft = liegenschaft;
    this.nameAllgemein;
    this.kurzbezeichnung;
    this.kostenstelle;
    this.unterbereiche();
    this.messpunkte();
    
    this.neueBereichUI = function () {

    }
}

//Klasse Messpunkt
function Messpunkt(bereich,messmittel){
    
    this.bereich = bereich;
    this.messmittel = messmittel;
    this.messstellenNr;
    this.messstelle;
    this.kurzbezeichnung;
    this.kostenstelle;    
}

//Klasse Messmittel
function Messmittel(){

    this.messpunkt;
}


//Eventmethoden
//--------------------------------------------------------------

//Organisation erstellen
function organisationErstellen() {
    listeOrganisationen[listeOrganisationen.length] = new Organisation(null, Agrodur);
}

for (var i = 0; i < 5; i++) {
    organisationErstellen();
}

for (var i = 0; i < 5; i++) {
    alert(listeOrganisationen[i].mandant);
}

//Überschrift der Liegenschaft wenn inputbox Name changed einlesen
function changeLiegenschaftName(newText) {

    var liegenschaftNameDiv = document.getElementsByClassName("liegenschaftHeader");

    var liegenschaftsNameLabel = liegenschaftNameDiv[0];

    var changeLabel = liegenschaftsNameLabel.innerHTML = newText;

   
}

//Bei Klick auf Ja wird die bgcolor vom Button geändert
function changeEigenstaendigeFormValue(element) {

    
    if (element.name == "ja") {
        var buttonBestaetigt = element.style.backgroundColor = "white";
        var buttonNichtBestaetigt=element
    }
}