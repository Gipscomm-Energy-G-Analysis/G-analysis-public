$(document).ready(function(){ // Test change
    (function(){
        if (sessionStorage.getItem("position") == "gipsAdm") {
            mandantenEinlesen("alle", null, null);
        }
        else {
            if (sessionStorage.getItem("position") == "sAdm") {
                $("#betrGrpMenuLi, #sAdmMenuLi")
                .css("display", "none");
                $("#tabBetrGrp, #tabGipscAdm")
                .css("display", "none");
                $("#betrGrpID").val(sessionStorage.getItem("betrGrp_ID"));
                mandantenEinlesen($("#betrGrpID").val(), null, null);
            }
            else if (sessionStorage.getItem("position") == "adm") {
                $("#betrGrpMenuLi, #sAdmMenuLi, #manGrpMenuLi, #admMenuLi")
                .css("display", "none");
                $("#tabGipscAdm, #tabBetrGrp, #tabManGrp, #tabAdm")
                .css("display", "none");
                if ($.isNumeric(sessionStorage.getItem("man_ID"))) {
                    var ins = "man_ID";
                    mandantenEinlesen(null, "man_ID", sessionStorage.getItem("man_ID"));
                }
                else if ($.isNumeric(sessionStorage.getItem("manGrp_ID"))) {
                    var ins = "manGrp_ID";
                    mandantenEinlesen(null, "manGrp_ID", sessionStorage.getItem("manGrp_ID"));
                }
                readInstanzen("manFirst", 0);
            }
            else if (sessionStorage.getItem("position") == "ben") {
                $("#rechtMenuLi").css("display", "none");
                if ($.isNumeric(sessionStorage.getItem("man_ID"))) {
                    var ins = "man_ID";
                    mandantenEinlesen(null, "man_ID", sessionStorage.getItem("man_ID"));
                }
                else if ($.isNumeric(sessionStorage.getItem("manGrp_ID"))) {
                    var ins = "manGrp_ID";
                    mandantenEinlesen(null, "manGrp_ID", sessionStorage.getItem("manGrp_ID"));
                }
                readInstanzen("manFirst", 0);
            }
        }
        betrGrpEinlesen();
        manGrpEinlesen();
        anlagenGruppenEinlesen();
        erweiterungenProdukteEinlesen();
        organisationenEinlesen();

        //Init Jahr DropBoxen mit dem aktuellen oder letzten Jahr
        $(".currentYear").val(getCurrentYear);
        $(".lastYear").val(decr(getCurrentYear));
        $("#liegRngVergleich").trigger("change");
    })();

    //Logout -> Löscht SessionStorage und refreshed Seite
    $("#logout").click(()=>{
        sessionStorage.clear();
        $.ajax({
            type: 'POST',
            async: true,
            url: 'php/logout.php',
            data: {
            },
            success: function () {
                window.open("index.html","_self");
            }
        });
    });

    $("input, select").focus(function(){
        if(this.id != "" && this.id != null && this.id != "undefined"){
            changeTracker.setChange(TrackValue.LABEL, $("label[for=" + this.id + "]").text());
            changeTracker.setChange(TrackValue.FIELD_ID, this.id);
            changeTracker.setChange(TrackValue.OLD_VALUE, this.value);
        }
    });
    $("input, select").change(function(){
        changeTracker.setChange(TrackValue.NEW_VALUE, this.value);
        changeTracker.setChanges();
    });
    $("#anlVersch").click(function(){
        $("#anlageVerschieben").dialog({
            height:240,
            width:320
        });
        changePath.setInstanceInfo(Instance.ANLAGE, $("#anlID").val());
    });
    $("#verschSpeichern").click(function(){
        changePath.setLiegenschaftsID($("#liegID").val());
        anlageVerschieben();
        $("#anlageVerschieben").dialog("close");
    });
    $("#verschAbbrechen").click(function() {
        $("#anlageVerschieben").dialog("close");
    });
    var entClickString = "#inputEnergietraeger1Lieg, #inputEnergietraeger2Lieg, #inputEnergietraeger2Lieg, #inputEnergietraeger2Lieg, ";
    entClickString += "#inputEnergietraeger3Lieg, #inputEnergietraeger4Lieg, #inputEnergietraeger5Lieg, #inputEnergietraeger6Lieg, ";
    entClickString += "#inputEnergietraeger7Lieg, #inputEnergietraeger8Lieg, #inputEnergietraeger9Lieg";
    $(entClickString).click(function(){
        $(this).val("");
    });
    $("#mapDrucken").click(function(){
        mapDrucken($("#treeGraph"));
    });
    //Öffnet Anlagenliste in prod Verwaltung
    $(".imgBtnAnlagePrd").click(function(){
        anlagenAuswahllisteErstellen(this.id);
    });
    $(".btnFormelSymbol").click(function(){
        var txt = $(this).text();
        if(txt == "AC"){
            mathField.latex("");
            $("#formelStringDarstellung, #formelIdDarstellung").val("");
            formula.resetFormula();
        }
        else if (txt == "CE") {
            mathField.keystroke("Del");

            var frmString = $("#formelStringDarstellung").val();
            var frmID = $("#formelIdDarstellung").val();
            var lastElement = formula.getLastElement();
            var lengthProperties = 0;

            if(formula.formula.length > 1){
                lengthProperties = lastElement.operator.length;
            }
            if(lastElement.operand.type == OperandType.MEASUREMENT_POINT){
                lengthProperties += lastElement.operand.operandObject.name.length;
                lengthProperties += 2;
            }
            else if(lastElement.operand.type == OperandType.NUMERIC_OPERAND){
                lengthProperties += lastElement.operand.operandObject.value.length;
            }
            lengthProperties += Number(lastElement.parentheses.number);


            $("#formelStringDarstellung").val(frmString.substring(0, frmString.length - lengthProperties));
            //$("#formelIdDarstellung").val(frmID.substring(0, frmID.length - lengthPropertiesID));
            formula.removeLastElement();
        }
        else if (txt == "MD") {
            if($("#formelLatexDarstellung").css("display") == "none"){
                $("#formelLatexDarstellung").css("display","block");
                $("#formelStringDarstellung").css("display","none");
            }
            else {
                $("#formelLatexDarstellung").css("display","none");
                $("#formelStringDarstellung").css("display","block");
            }
        }
        else if (txt == "→") {
            mathField.keystroke("Right");
        }
        else if (txt == "←") {
            mathField.keystroke("Left");
        }
        else if (txt == "↑") {
            mathField.keystroke("Up");
        }
        else if (txt == "↓") {
            mathField.keystroke("Down");
        }
        else {
            if(txt == 0 || txt == 1 || txt == 2 || txt == 3 || txt == 4 ||
                txt == 5 || txt == 6 || txt == 7 || txt == 8 || txt == 9){
                    var operand = new NumericOperand(txt);
                    if($("#formelStringDarstellung").val() == ""){
                        formula.setFirstElement(LocationParentheses.NONE, 0, OperandType.NUMERIC_OPERAND, operand);
                    }
                    else {
                        formula.alterElementProperty(formula.formula.length - 1, FormulaProperty.NUMERIC_OPERAND, {
                            type: OperandType.NUMERIC_OPERAND,
                            operandObject: operand});

                        }
                    }
                    if(txt != "(" && txt != ")"){
                        if(txt == " + " || txt == " - " || txt == " * " || txt == " / "){
                            formula.setElement(txt, null, null, null, null);
                        }
                    }
                    else if(txt == "(") {

                        var nParentheses = formula.formula[formula.formula.length - 1].parentheses.number + 1;
                        formula.alterElementProperty(formula.formula.length - 1, FormulaProperty.PARENTHESES, {
                            location: LocationParentheses.BEGINNING,
                            number: nParentheses
                        });
                    }
                    else if(txt == ")") {
                        var nParentheses = formula.formula[formula.formula.length - 1].parentheses.number + 1;
                        formula.alterElementProperty(formula.formula.length - 1, FormulaProperty.PARENTHESES, {
                            location: LocationParentheses.END,
                            number: nParentheses
                        });
                    }
                    let idFrmStr = "";
                    if($("#infosVorlagenformeln").css("display") === "block"){
                        idFrmStr = "#formelVorStringDarstellung";
                    }
                    else {
                        idFrmStr = "#formelStringDarstellung";
                    }
                    var newString = $(idFrmStr).val() + $(this).text();
                    var newIdString = $("#formelIdDarstellung").val() + $(this).text();
                    $(idFrmStr).val(newString);
                    $("#formelIdDarstellung").val(newIdString);
                    mathField.typedText($(this).text());
                }
            });
            $("#formelSpeichern").click(function(){
                let idString = "";

                if ($("#zeitintervallFormel").val() === "") {
                    idString = btoa($("#formelIdDarstellung").val());
                } else {
                    idString = btoa($("#zeitintervallFormel").val() + " , " + $("#formelIdDarstellung").val());
                }

                const formula = {
                    modus: $("#bermstmod").val(),
                    berechneteMstID: $("#berechneteMstID").val().split("_")[1],
                    bezug: $("#inpBezugKnz").val(),
                    formelString: btoa($("#formelStringDarstellung").val()),
                    idString
                };
                writeFormulaToDB(formula);
            });
            $("#formelVorSpeichern").click(function(){
                const bezeichnung = $("#inpBezeichnungVorFrm").val();
                const formula = $("#formelVorStringDarstellung").val();
                const notiz = $("#notizVorlFrm").val();
                writeVorlFormulaToDB(bezeichnung, btoa(formula), notiz);
            });
            var mathFieldSpan = document.getElementById("formelLatexDarstellung");
            var MQ = MathQuill.getInterface(2); // for backcompat
            var mathField = MQ.MathField(mathFieldSpan, {
                spaceBehavesLikeTab: true
            });
            tblMessstellenBerechnungseditor.on("draw", function(){
                $("#tblMessstellenBerechnungseditor tr").css("cursor", "pointer");
                $("#tblMessstellenBerechnungseditor tr").draggable({
                    helper: "clone",
                    start: function(event, ui){
                        let cell = $(this).find("td"),
                        id = "mst_" + cell.prev().text(),
                        name = cell.text();
                        $("#zeitintervallFormel").val($("#zeitInterFrm").val());

                        contents = [id, name];
                    }
                });
            });
            tblAnlagenBerechnungseditor.on("draw", function(){
                $("#tbAnlagennBerechnungseditor tr").css("cursor", "pointer");
                $("#tblAnlagenBerechnungseditor tr").draggable({
                    helper: "clone",
                    start: function(event, ui){
                        let cell = $(this).find("td"),
                        id = "anl_" + cell.prev().text(),
                        name = cell.text();

                        contents = [id, name];
                    }
                });
            });
            tblInterneMesswerteBerechnungseditor.on("draw", function(){
                $("#tblInterneMesswerteBerechnungseditor tr").css("cursor", "pointer");
                $("#tblInterneMesswerteBerechnungseditor tr").draggable({
                    helper: "clone",
                    start: function(event, ui){
                        let cell = $(this).find("td"),
                        id = "staProd_" + cell.prev().text(),
                        name = cell.text();

                        contents = [id, name];
                    }
                });
            });
            tblBdeDynBerechnungseditor.on("draw", function(){
                $("#tblBdeDynBerechnungseditor tr").css("cursor", "pointer");
                $("#tblBdeDynBerechnungseditor tr").draggable({
                    helper: "clone",
                    start: function(event, ui){
                        let cell = $(this).find("td"),
                        id = "bdeProd_" + cell.prev().text(),
                        name = cell.text();

                        contents = [id, name];
                    }
                });
            });
            let cont2 = "";
            tblEinheitenKnzs.on("draw", function(){
                $("#tblEinheitenKnzs tr").css("cursor", "pointer");
                $("#tblEinheitenKnzs tr").draggable({
                    helper: "clone",
                    start: function(event, ui){
                        let cell = $(this).find("td");

                        cont2 = "kWh / " + cell.text();
                    }
                });
            });
            tblProdukte.on("draw", function(){
                $("#tblProdukte tr").css("cursor", "pointer");
                $("#tblProdukte tr").draggable({
                    helper: "clone",
                    start: function(event, ui){
                        let cell = $(this).find("td"),
                        id = "ePrd_" + cell.prev().text(),
                        name = cell.text();

                        contents = [id, name];
                    }
                });
            });
            $(".vorlFrmPlatzhalter").draggable({
                helper: "clone",
                start: function(event, ui){
                    cont = "";
                    switch ($(this).text()) {
                        case "Anlage":
                        cont = "[anl]";
                        break;
                        case "Messstelle":
                        cont = "[mst]";
                        break;
                        case "Formel":
                        cont = "[frm]";
                        break;
                        case "Produkt_Par-VE":
                        cont = "[prd_par_VE]";
                        break;
                        case "Produkt_Par-RohInput":
                        cont = "[prd_par_RohInp]";
                        break;
                    }
                }
            });

            $("#formelVorStringDarstellung").droppable({
                tolerance: "touch",
                drop: function (){
                    let dropFld = $(this);
                    dropFld.val(`${dropFld.val()} ${cont}`);
                }
            });

            $("#einheitKennzahldetail1Knz").droppable({
                tolerance: "touch",
                drop: function (){
                    let dropFld = $(this);
                    dropFld.val(`${cont2}`);
                }
            });
            $("#einheitKennzahldetail2Knz").droppable({
                tolerance: "touch",
                drop: function (){
                    let dropFld = $(this);
                    dropFld.val(`${cont2}`);
                }
            });
            $("#einheitKennzahldetail3Knz").droppable({
                tolerance: "touch",
                drop: function (){
                    let dropFld = $(this);
                    dropFld.val(`${cont2}`);
                }
            });
            $("#einheitKennzahldetail4Knz").droppable({
                tolerance: "touch",
                drop: function (){
                    let dropFld = $(this);
                    dropFld.val(`${cont2}`);
                }
            });
            $("#einheitKennzahldetail5Knz").droppable({
                tolerance: "touch",
                drop: function (){
                    let dropFld = $(this);
                    dropFld.val(`${cont2}`);
                }
            });
            $("#einheitKennzahldetail6Knz").droppable({
                tolerance: "touch",
                drop: function (){
                    let dropFld = $(this);
                    dropFld.val(`${cont2}`);
                }
            });
            $("#einheitKennzahldetail7Knz").droppable({
                tolerance: "touch",
                drop: function (){
                    let dropFld = $(this);
                    dropFld.val(`${cont2}`);
                }
            });
            $("#einheitKennzahldetail8Knz").droppable({
                tolerance: "touch",
                drop: function (){
                    let dropFld = $(this);
                    dropFld.val(`${cont2}`);
                }
            });
            $("#einheitKennzahldetail9Knz").droppable({
                tolerance: "touch",
                drop: function (){
                    let dropFld = $(this);
                    dropFld.val(`${cont2}`);
                }
            });
            $("#einheitKennzahldetail10Knz").droppable({
                tolerance: "touch",
                drop: function (){
                    let dropFld = $(this);
                    dropFld.val(`${cont2}`);
                }
            });

            $("#formelStringDarstellung, #berechneteMstName").droppable({
                tolerance: "touch",
                drop: function (){
                    let drpField = this.id,
                    idDrag = "",
                    nameDrag = "";

                    if (contents[0].split(" ")[0].split("_")[0] === "mst") {
                        idDrag =  contents[0].split(" ")[0];
                        nameDrag =   $("#zeitintervallFormel").val() + " - " + contents[0].split(" ")[1];
                    }
                    else {
                        idDrag = contents[0].split(" ")[0];
                        nameDrag = contents[0].split(" ")[1];
                    }


                    if ($("#formelStringDarstellung").val() === "") {
                        $("#zeitintervallFormel").val("");
                    }

                    formelerweiterungNachDrop(drpField, idDrag, nameDrag, false);
                }
            });

            //Produkteverwaltung öffnen
            $("#btnPrdOeffnen").click(function(){
                mainMenuNav("prdMenu");
            });

            //Aus der Liegenschaft neuen Energieträger Erstellen
            $(".inputEnergietraegerLieg").change(function(){
                if($(this).val() == "-Energieträger hinzufügen-"){
                    if(saveNew){
                        instanzErstellen("liegSpeichern");
                        saveNew = false;
                    }
                    else {
                        instanzSpeichern("liegSpeichern");
                    }

                    lastNav.setRecordsNavID(liegNavID);

                    lastNav.setFieldsNavInfo([{type: "comboBox", id: this.id}]);
                    lastNav.enableJump(true);
                    $("#entHinz").trigger("click");
                    mainMenuNav("entMenu");
                }
            });
            //Disabled Datatables Warnings
            $.fn.dataTableExt.sErrMode = 'throw';
            //Main zentrieren
            $(window).resize(function () {
                menuUndMainZentrieren();
            });
            menuUndMainZentrieren();
            //Untermenu
            $(".sub-menu").menu(
            );
            //Datepicker
            $(".datePicker").datepicker({
                monthNames: ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"],
                dayNamesMin: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
                dateFormat: "dd.mm.yy",
                changeYear: true
            });
            //Benutzerdaten
 var username;
 var position;
 //Stammdaten Variablen
 var navID = 0;
 var mandantenID;
 var mandant;
 var organisation;
 var organisationenIndex;
 var liegenschaft;
 var liegenschaftenIndex;
 var bereich;
 var bereicheIndex;
 var intEngIMwNavID;
 var intBdeIMwNavID;
 //Status
 var saveNew = false;
 //Datenbank für Energieträger
 var entDB;
 //Variablen zurücksetzen
 username = "";
 position = "";
 betrGrpNavID = 0;
 sAdmNavID = 0;
 gipscAdmNavID = 0;
 manGrpNavID = 0;
 admNavID = 0;
 benNavID = 0;
 manNavID = 0;
 orgNavID = 0;
 liegNavID = 0;
 extDlNavID = 0;
 berNavID = 0;
 mstNavID = 0;
 stdNavID = 0;
 stdDrNavID = 0;
 msmNavID = 0;
 anlNavID = 0;
 entNavID = 0;
 enfNavID = 0;
 eRngNavID = 0;
 iMwNavID = 0;
 zpNavID = 0;
 eAnlNavID = 0;
 ePrdNavID = 0;
 prdNavID = 0;
 knzNavID = 0;
 knzInsNavID = 0;
 betrParNavID = 0;
 organisation = "";
 organisationenIndex = "";
 liegenschaft = "";
 liegenschaftenIndex = "";
 bereich = "";
 bereicheIndex = "";
 //hidden fields zurücksetzen
 $("#sAdmID_1").val("");
 $("#sAdmID_2").val("");
 $("#nameDB").val("");
 $("#manCount").val("");
 $("#orgCount").val("");
 $("#liegCount").val("");
 $("#extDlCount").val("");
 $("#berCount").val("");
 $("#mstCount").val("");
 $("#stdCount").val("");
 $("#knzInsCount").val("");
 $("#msmCount").val("");
 $("#anlCount").val("");
 $("#iMwCount").val("");
 $("#betrParCount").val("");
 $("#manID").val("");
 $("#orgID").val("");
 $("#liegID").val("");
 $("#berID").val("");
 $("#mstID").val("");
 $("#stdID").val("");
 $("#knzInsID").val("");
 $("#msmID").val("");
 $("#anlID").val("");
 $("#iMwID").val("");
 $("#manList").val("");
 $("#orgList").val("");
 $("#liegList").val("");
 $("#berList").val("");


            //Rechnungsformular Input überprüfen
            let stringEingabefenster = "#kostenERng, #tagstromVerbrERng, #tagstromKostERng, #nachtstromVerbrERng, #nachtstromKostERng, #lastspitzeERng,";
            stringEingabefenster += "#leistungspreisERng, #abpWirkERng, #abpNetzERng, #strSteuERng, #blindstromERng, #konzERng, #eegERng, #eegUntERng,";
            stringEingabefenster += "#eegUebERng, #kwkUntERng, #nevUntERng, #offUntERng, #kwkObERng, #nevObERng, #offObERng, #custom1ERng, #custom2ERng,";
            stringEingabefenster += "#custom3ERng, #custom4ERng, #custom5ERng, #custom6ERng, #mengeERng";
            let isNotCorrectedFieldExistent = false;
            $(stringEingabefenster).blur(function(){
                if(!isNotCorrectedFieldExistent){
                    let isValid = false;

                    if(this.value === ""){
                        //do nothing
                    }
                    else if ($.isNumeric(formatNumber("deform",this.value))) {
                        isValid = true;
                        if($("#mitUntERng").is(":checked")){
                            $(this).css("background-color", "#4AB872");
                        }
                        isNotCorrectedFieldExistent = false;
                    }
                    else {
                        isValid = false;
                        if($("#mitUntERng").is(":checked")){
                            $(this).css("background-color", "#DB504A");
                        }
                        alert("Das Format des eingegebenen Wertes ist inkorrekt!\nEin Beispiel wie es aussehen sollte: 120233,12 oder 120.233,12");
                        $(this).select();
                        isNotCorrectedFieldExistent = true;
                    }
                }
                else {
                    if($.isNumeric(formatNumber("deform",this.value))){
                        isValid = true;
                        if($("#mitUntERng").is(":checked")){
                            $(this).css("background-color", "#4AB872");
                        }
                        isNotCorrectedFieldExistent = false;
                    }
                }
            });

            $("#mitUntERng").click(()=>{
                let check = !$(this).is(":checked"),
                trgt = ".standRng, .evuRng, .bafaRng",
                prop = "background-color",
                val = "white";
                (()=>{check ?
                    (()=>{$(trgt).css(prop, val);})():()=>{}
                })();
            });

            $("#typDiag").change(function(){

                if (this.value == "line") {
                    $("#exampleLineChart").css("display", "block");
                    $("#exampleColumnChart").css("display", "none");
                }
                else {
                    $("#exampleLineChart").css("display", "none");
                    $("#exampleColumnChart").css("display", "block");
                }
            });

            $("#zeitrDiag").change(function(){
                if(this.value === "Benutzerdefiniert"){
                    $("#btnZeitrmDiag").text("Benutzerdefinierter Zeitraum");
                    $("#btnZeitrmDiag").trigger("click");
                }
                else {
                    $("#btnZeitrmDiag").text("Allgemeiner Zeitraum");
                    $("#btnZeitrmDiag").trigger("click");
                }

                if(this.value === "Jahr"){
                    $("#diagMonatDiv, #diagTagDiv").css("display", "none");
                    $("#diagMonat, #diagTag").prop("selectedIndex", 0);
                }
                else if (this.value === "Monat" || this.value === "Monat 15min") {
                    $("#diagMonatDiv").css("display", "inline-block");
                    $("#diagTagDiv").css("display", "none");
                    $("#diagTag").prop("selectedIndex", 0);
                }
                else if (this.value === "Tag" || this.value === "Tag 15min") {
                    $("#diagMonatDiv, #diagTagDiv").css("display", "inline-block");
                }
            });

            //Benutzerdef Modus für Diag an und aus
            $("#btnZeitrmDiag").click(function(){
                if($("#btnZeitrmDiag").text() == "Benutzerdefinierter Zeitraum"){
                    $(".allgZeitrDiag").css("display", "none");
                    $(".benutzerdefZeitrDiag").css("display", "inline-block");
                    $("#btnZeitrmDiag").text("Allgemeiner Zeitraum");
                }
                else {
                    $(".allgZeitrDiag").css("display", "inline-block");
                    $(".benutzerdefZeitrDiag").css("display", "none");
                    $("#btnZeitrmDiag").text("Benutzerdefinierter Zeitraum");
                }
            });

            //Zuweisung der Tabellen und deren ID
            $("#prdAuswahlZugDynPrdID").click(function() {
                tabellenAuswahllisteErstellen();
            });

            //Überprüftes Feld darf nicht leer sein!
            $(".not-empty").change(
                field => {
                    if(emptyString(field.value)){
                        alert("Dieses Feld darf nicht leer gelassen werden!");
                        field.focus();
                    }
                    else {
                        // Valid value was assigned
                    }
                }
            );

            //Anlagenauswahl bei Produkten
            $( "#btnPlusAnlsPrd" ).click( function() {
                anlagenfelderHinzufuegenProdukteverwaltung () ;
            });

            //Messstellen-Auswahl in Diagramm 'Messstellenvergleich' zurücksetzen
            $("#btnMstResetDiag").click(()=>{
                let felderString = "#mstDiag1, #mstDiag2, #mstDiag3,";
                felderString += "#mstIDDiag1, #mstIDDiag2, #mstIDDiag3";

                $(felderString).val("");
            });
            $("#btnKnzResetDiag").click(()=>{
                let felderString = "#knzDiag1, #knzDiag2, #knzDiag3,";
                felderString += "#knzIDDiag1, #knzIDDiag2, #knzIDDiag3";

                $(felderString).val("");
            });

            //In Zeitvergleich Diagramm je nach Dropbox Auswahl felder ein/ausblenden
            $("#zeitrDiag2").change( function() {
                switch ( this.value ) {
                    case "Jahr" :
                    $( ".monatZeitvergl, .tagZeitvergl" ).css ( "display", "none" ) ;
                    $( ".monatZeitvergl, .tagZeitvergl" ).val( "-" ) ;
                    break ;
                    case "Monat" :
                    $( ".monatZeitvergl" ).css ( "display", "inline-block" ) ;
                    $( ".tagZeitvergl" ).css ( "display", "none" ) ;
                    $( ".tagZeitvergl" ).val( "-" ) ;
                    break ;
                    case "Tag" :
                    $( ".monatZeitvergl, .tagZeitvergl" ).css ( "display", "inline-block" ) ;
                    break ;
                    default :
                    alert ( "$('#zeitrDiag2').change(): No valid time-interval was passed!" ) ;
                }
            });

            //Event Handler für File-Upload
            $("#imgUploadAnl, #imgUploadMsm, #dokuAuswahlAnl, #dokuAuswahlMsm, #dokuAuswahlERng")
            .on("change", dokumentAuswaehlenUndEinlesen);

            //Event Handler für File-Download
            $("#dokuDownAnl, #dokuDownMsm, #dokuDownERng").on("click", dokumentenListeErstellen);
            $("#tblDokumenteAnl tbody, #tblDokumenteMsm tbody")
            .on("dblclick", "tr", function () {
                var data;
                var data = tblDokumente.row(this).data();
                $("#dokID").val(data[0]);
                $("#downloadLink").prop("href", "uploadsDownloads/docs/" + $("#nameDB") + " " + data[1]);

                dokumentAuswaehlenUndAuslesen(data[1]);
            });

            //Wenn msm in Messstellenverwaltung ausgewählt mst in Messmittel Synchronisieren
            $("#messmittelBerechnungslogikMst").change(function(){

            });

            $("#messstelleAllgemeinMsm").change(function(){
                sync.setCurrentLocation(CurrentLocation.MESSMITTELVERWALTUNG);
                sync.setNameMessmittel($("#messmittelNrAllgemeinMsm").val());
                sync.synchronize();
            });

            //Dokument Löschen
            $("#btnDokLoeschen").click(function(){
                $("#dokDlOderLoeschenContainer").dialog("close");
                dokumenteLoeschen(1, $("#dokID").val());
            });

            //Masseneingabe freischalten
            $("#btnMassEingMst, #btnMassEingAnl").click(function(){
                $("#infosMasseneingabe").css("display", "block");
                $("#infosIntEnergiedaten, #infosIntBetriebsdaten")
                .css("display", "none");
            });

            //Masseneingabe aus und Konfiguration an
            $("#btnKonfigMstAnl").click(function() {
                $("#infosMasseneingabe").css("display", "none");
                if($("#activeInstance").val() == "intEngIMw"){
                    $("#infosIntEnergiedaten")
                    .css("display", "block");
                }
                else {
                    $("#infosIntBetriebsdaten")
                    .css("display", "block");
                }
            });

            //Verbrauchsdaten exportieren
            $("#btnVerbrauchsdatenExport").click(function(){
                verbrauchsdatenExportieren();
            });

            //Spezielle Kennzahlen suchen
            $("#spzKnzSuchen").click(function() {
                spezielleKennzahlenlisteErstellen() ;
            });

            //Weitere Kennzahl in Kennzahlenverwaltung hinzufügen
            $("#btnWeitereKnzHinz").click(function () {
                let len = $("#btnTabKnzCont li").length;
                for( let i = 0; i < len; i++ ) {
                    const isNotDisplayed = $("#btnTabKnzCont li").eq(i).css("display") === "none" ;
                    if ( isNotDisplayed ) {
                        if ( $(`formel${ i }Knz`).val () !== "" ) {
                            $("#btnTabKnzCont li").eq(i).css("display", "inline");
                        }
                        else {
                            alert( "Die Zuweisung einer Formel ist notwendig bevor eine neue Kennzahl hinzufügt werden kann!" ) ;
                        }
                        break ;
                    }
                }
            });

            //Instanzauswahlfenster öffnen
            $("#insSuchenKnz").click(function(){
                instanzAuswahllisteErstellen($("#bezugAllgemeinKnz").val());
            });

            //Produkt Custom Felder anzeigen
            $("#bezugAllgemeinKnz").change(function(){
                $("#instanzAllgemeinKnz").val("");
                if(this.value === "prd"){
                    $(".customParPrd").css("display","block");
                }else {
                    $(".customParPrd,.customParDiv").css("display","none");
                    $("#btnProdAnzeigenKnz").text("Produktparameter einblenden");
                }
            });

            //Produktparameter ein/ausblenden
            $("#btnProdAnzeigenKnz").click(function(){
                if ($(this).text() === "Produktparameter einblenden") {
                    $(".customParDiv").css("display", "block");
                    $(this).text("Produktparameter ausblenden");
                }
                else {
                    $(".customParDiv").css("display", "none");
                    $(this).text("Produktparameter einblenden");
                }
            });

            //Bezeichnung von spezialisierten Kennzahlen
            $( document ).on ( "input", ".bezeichnungKnz", function() {
                $( `.knzForms` ).eq (
                    subtract ( 1, extractNumber ( this.id ) )
                )
                .text ( this.value ) ;
            } ) ;

            //Vorlagenformel auswählen und konfigurieren
            $(".btnVorlFormeln").click(function(){
                $("#nrKnz")
                .val(extractNumber(this.id));
                vorlagenformelAuswahllisteErstellen();
            });

            //Gespeicherte Diagramme einlesen
            $("#btnGespDiag").click(function(){
                gespeicherteDiagrammeAuswahllisteErstellen();
            });

            //Von Kennzahlenverwaltung in Berechnungseditor springen
            $(".btnNeueFormelKnz").click(function(){
                mainMenuNav( "menuBerechnungsformeln" );
            });

            //Formel aus Vorlagenformel abbrechen
            $("#btnFrmAusVorlAbbr").click(function(){
                $("#vorlFrmZuordnenContainer").dialog("close");
            });

            //Formel aus Vorlagenformel speichern und in Knz Formular einlesen
            $("#btnFrmAusVorlOk").click(function(){

                const vorlFormel = $("#lblGewVorlagenformel").text();

                const elements = (() => {
                    const lenArr =  $("#vorlFrmFuellen div .vorlString").length;
                    let arrString = [],
                    arrID = [];
                    for(let i = 0; i < lenArr; i++){
                        arrString.push(
                            $("#vorlFrmFuellen div .vorlString").eq(i).val()
                        );
                        arrID.push(
                            $("#vorlFrmFuellen div .vorlID").eq(i).val()
                        );
                    }
                    return { string: arrString, Id: arrID };
                })();

                const operators = filterOperatoren(vorlFormel);

                const assembleFormula = {
                    string: altFuse(elements.string)(operators)
                    .join(" "),
                    id:     altFuse(elements.Id)(operators)
                    .join(" ")
                }

                const formula = {
                    modus: "Kennzahl",
                    berechneteMstID: undefined,
                    bezug: $("#bezugAllgemeinKnz").val(),
                    formelString: btoa(assembleFormula.string),
                    idString: btoa(assembleFormula.id)
                };

                switch ($("#activeInstance").val()) {
                    case "knz":
                    writeFormulaToDB(formula)
                    .then(() => {
                        $("#vorlFrmZuordnenContainer").dialog("close");

                        const currentFrm = $("#nrKnz").val();

                        let frmString = undefined,
                        frmIdString = undefined;

                        $(`#formel${currentFrm}Knz`)
                        .val(assembleFormula.string);

                        getLastID("frm")
                        .then((lastID) => {
                            $(`#formel${currentFrm}IDKnz`).val(lastID);
                        });
                    });
                    break;
                    case "berFrmEditor":
                    $("#vorlFrmZuordnenContainer").dialog("close");
                    $("#formelStringDarstellung").val(assembleFormula.string);
                    $("#formelIdDarstellung").val(assembleFormula.id);
                    break;
                    default:
                    alert("$('#btnFrmAusVorlOk').click(): \nNo valid 'activeInstance' was passed!");
                }
            });

            //Auswahl der Quelltabelle um in der Erweiterung der Produkte
            //die Betriebsparameter festlegen zu können
            $("#tblSuchenEPrd").click(function() {
                tabellenAuswahllisteErstellen( this.id ) ;
            });

            //Alle Checken Checkbox
            $("#chkSpalteEPrd").on ( "click", function () {
                if ( $( this ).is ( ":checked" ) ) {
                    $( ".chkBetriebsparameter" ).prop( "checked", true ) ;
                }
                else {
                    $( ".chkBetriebsparameter" ).prop( "checked", false ) ;
                }
            } );

            //Lupenfeld leeren
            $("[readonly]").on("dblclick", function() {
                switch (this.id) {
                    case "mstDiag1":
                    case "mstDiag2":
                    case "mstDiag3":
                    $("#mstIDDiag" + this.id[this.id.length - 1]).val("");
                    break;
                    case "mstDiag":
                    $("#mstIDDiag").val("");
                    break;
                    case "mstDatenexport":
                    $("#mstIDDatenexport").val("");
                    break;
                    case "anlMst":
                    $("#anlIDMst").val("");
                    break;
                    case "formelKnz":
                    $("#formelIDKnz").val("");
                    break;
                    case "messmittelBerechnungslogikMst":
                    $("#messmittelIDMst, #berechnungslogikMst").val("");
                    break;
                    case "mst1Anl":
                    case "mst2Anl":
                    case "mst3Anl":
                    case "mst4Anl":
                    $("#mst" + this.id[3] + "IDAnl").val("");
                    break;
                    case "messstelleAllgemeinMsm":
                    $("#messstelleIDAllgemeinMsm").val("");
                    break;
                    case "anlMsm":
                    $("#anlIDMsm").val("");
                    break;
                    case "instanzAllgemeinKnz":
                    $("#instanzAllgemeinIDKnz").val("");
                    break;
                    case "berechneteMstName":
                    $("#berechneteMstID").val("");
                    break;
                }
                this.value = "";
            });

            //Wenn Modus global dann werden die Energieträger in die Basistabelle geschrieben
            //sonst in den ausgewählten Mandanten
            $(".manPfadEnt").css("display", "inline");
            $("#modus").change(function () {
                if ($(this).val() == "Global") {
                    $(".manPfadEnt").css("display", "none");
                }
                else {
                    $(".manPfadEnt").css("display", "inline");
                }
            });

            //Nach Mandantenwechsel die Zuordnung neu einlesen
            $(".manPfadEnt select").change(checkboxenDerEntEnfEinlesen($("#entManZuordnung")));

            //Mandantengruppen-Form ein und ausblenden je nach Auswahl
            $("#manOrManGrp").change(function(){
                toggleMandantOderMandantengruppe($(this).val());
            });

            //Mandant für Mandantengruppetabelle auswählen
            $("#manZuManGrpHinz").click(function(){
                mandantenAuswahllisteErstellen();
            });

            //Aus Tagstrom(HT) und Nachtstrom(NT) Gesamtkosten ausrechnen
            $("#tagstromERng, #nachtstromERng").change(function () {
                var tagS = $("#tagstromERng").val();
                var nachtS = $("#nachtstromERng").val();
                var verbrauch = parseFloat(tagS) + parseFloat(nachtS);

                $("#kostenERng").val(formatNumber("form",verbrauch));
                $("#kostenERng").trigger("change");
            })

            //MwSt von Rechnungssumme berechnen
            $("#kostenERng").change(function () {
                if($(this).val().indexOf(",") != -1){
                    $(this).val(formatNumber("deform",$(this).val()));
                }

                //Wenn Lieg Im RngVergleich verändert, Tabelle neu füllen
                $("#liegRngVergleich").change(function(){
                    externeRechnungenListeErstellen("vergleich");
                });

                var kostenOhneMwst = $(this).val();
                kostenOhneMwst = parseFloat(kostenOhneMwst);
                var prozentMwst = 19;
                var mwst = kostenOhneMwst * prozentMwst / 100;
                mwst = mwst.toFixed(2);
                mwst = parseFloat(mwst);
                var kostenMitMwst = kostenOhneMwst + mwst;
                kostenMitMwst = kostenMitMwst.toFixed(2);
                kostenMitMwst = parseFloat(kostenMitMwst);

                $(this).val(formatNumber("form",$(this).val()));
                $("#mwstERng").val(formatNumber("form",mwst));
                $("#kostenMitMwstERng").val(formatNumber("form",kostenMitMwst));
            });

            //SpaEfV Tabelle 1, 2 Daten je nach Auswahl(ganzer Mandant, bestimmte Organisation, bestimmte Liegenschaft)
            $("#btnSpaEfVTbl1Erstellen, #btnSpaEfVTbl2Erstellen").click(function(){
                var modus = getModusSpaEfV(this.name);
                var version = getVersionSpaEfV(this.name);
                var verdichtung = getVerdichtungSpaEfV(this.name);

                if(this.id == "btnSpaEfVTbl1Erstellen"){
                    var darzustellendeJahre = getModusDarzustellendeJahreSpaEfV1();
                    var jahreSqlString = getJahresstringBenutzerdefSpaEfV1(version, darzustellendeJahre);

                    if(version == "basis"){
                        verdichtung = "verdichtet";

                    }
                    else{
                        // Code...
                    }
                    SpaEfVTbl1Erstellen(modus, version, verdichtung, jahreSqlString);
                }
                else if (this.id == "btnSpaEfVTbl2Erstellen") {
                    var currentDate = new Date;

                    if(version == "basis"){
                        verdichtung = "verdichtet1";
                        jahr = currentDate.getFullYear() - 1;
                    }
                    else{
                        // Code...
                    }
                    SpaEfVTbl2Erstellen(modus, version, verdichtung, jahr);
                }
            });

            //Versionsänderung
            $("#benutzerdefiniertSpaEfVTbl1, benutzerdefiniertSpaEfVTbl2").click(function(){
                var modus = getModusSpaEfV(this.value);
                var version = getVersionSpaEfV(this.value);

                resetBenutzerdefJahreSpaEfVTbl1(version);
                detailAuswahlAnzeigenSpaEfV(true, this.value);
                getRechnungsjahre(modus);
            });

            //Benutzerdefinierte Jahre einblenden
            $("#jahreBenutzerdefSpaEfVTbl1").click(function(){
                $("#jahreSpaEfVBenutzerdef").css("display", "block");
            });

            //Benutzerdefinierte Jahre ausblenden
            $("#jahreLetzte5SpaEfVTbl1").click(function(){
                $("#jahreSpaEfVBenutzerdef").css("display", "none");
            });

            //Auswahl der Basisversion blendet Detailauswahl aus
            $("#basisSpaEfVTbl1, #basisSpaEfVTbl2").click(function(){
                var version = getVersionSpaEfV(this.value);

                resetBenutzerdefJahreSpaEfVTbl1(version);
                detailAuswahlAnzeigenSpaEfV(false, this.value);
            });

            //Energieträger, Energieformen Mandanten zuordnen
            $("#entManZuordnung, #enfManZuordnung").click(function () {
                checkboxenDerEntEnfEinlesen(this);
                fensterMitDivOeffnen();
            });

            //Versorger Modus
            $("#modusVers").val("alt");

            //Alle Ent,Enf Anhaken bzw. Zurücksetzen
            $("#alleAnhaken").click(function () {
                checkboxenDerEntEnfAlleAnhaken();
            });
            $("#alleZuruecksetzen").click(function () {
                checkboxenDerEntEnfAlleZuruecksetzen();
            });

            //Versorger zu Energieträger hinzufügen
            $("#entVersorgerHinz").click(function(){
                versorgerInHistorie();
            });

            //Wenn mst in Anlagen verändert, soll gesucht werden ob der jeweiligen mst schon die Anlage zugeordnet wurde
            $("#mst1Anl, #mst2Anl, #mst3Anl, #mst4Anl").change(function(){
                sync.setCurrentLocation(CurrentLocation.ANLAGENVERWALTUNG);
                sync.setNrAnlage($("#anlagennummerAllgemeinAnl").val());
                sync.setNameAnlage($("#bezeichnungAllgemeinAnl").val());
                sync.setNameMessstelle(this.value);
                sync.synchronize();
            });

            //Für SpaEfV Tabelle 1 Auswahloptionen-Logik
            $("#mandantGesamtSpaEfVTbl1").click(function(){
                $("#lblSpeziSpaEfVTble1Lieg, #speziSpaEfVTbl1Lieg, #speziSpaEfVTbl1Org, #lblSpeziSpaEfVTble1Org").css("display","none");
            });
            $("#organisationSpaEfVTbl1").click(function(){
                $("#lblSpeziSpaEfVTble1Lieg, #speziSpaEfVTbl1Lieg").css("display","none");
                $("#speziSpaEfVTbl1Org, #lblSpeziSpaEfVTble1Org").css("display", "inline");
            });
            $("#liegenschaftSpaEfVTbl1").click(function(){
                $("#lblSpeziSpaEfVTble1Lieg, #speziSpaEfVTbl1Lieg, #speziSpaEfVTbl1Org, #lblSpeziSpaEfVTble1Org").css("display","inline");
            });

            //Datenbank in der Energieträger/Energieformen gespeichert werden sollen
            //festlegen
            $("#modus").change(function () {
                dbFuerEnergietraegerFestlegen($(this).val());
            })

            //Organisationen in Auswahlbox
            organisationenEinlesen();

            //Liegenschaften in Auswahlbox
            liegenschaftenEinlesen();

            //Vom Berechnungseditor in Messstellenverwaltung oder Kennzahlenverwaltung springen
            $("#btnInMstVerwaltungSpringen, #btnInKnzVerwaltungSpringen").click(function(){
                let element = "";
                switch (this.id) {
                    case "btnInMstVerwaltungSpringen":
                    element = "berMenu"
                    break;
                    case "btnInKnzVerwaltungSpringen":
                    element = "knzMenu"
                    break;
                }
                mainMenuNav(element);
            });

            //Weitere Energieträger für die Liegenschaft freischalten
            $("#weitereEntsLieg").click(function () {
                if ($("#weitereEntsLieg").text() == "weitere Energieträger zuordnen") {
                    $("#entLiegErweitert").css("display", "block");
                    $("#weitereEntsLieg").text("weniger Energieträger zuordnen");
                    $("#energietraeger7Lieg, #energietraeger8Lieg, #energietraeger9Lieg")
                    .val("");
                }
                else {
                    $("#entLiegErweitert").css("display", "none");
                    $("#weitereEntsLieg").text("weitere Energieträger zuordnen");
                    $("#energietraeger7Lieg, #energietraeger8Lieg, #energietraeger9Lieg")
                    .val("");
                }
            });

            //Durchleitung für Liegenschaft festlegen
            $("#hatDlAllgemeinLieg").click(function(){
                toggleExtDl(this);
            });

            //Ändern von "Erzeuger/Einspeiser" führt zu Änderung des Levels
            $("#levelAuswahlAllgemeinBer").change(function () {
                readinLevel(this);
                vorgelagertenBereichAktivieren(this);
            });

            //In Messtellen Auswahl der Messart verändern
            $("#messartMst").change(function () {
                messmittelOderBerechnungslogik(this);
            });
            $("#mstSuchen").click(function () {
                messstellenlisteErstellen();
            });

            //Mittlere Auslastung in MsmVerwaltung je nach Eingabe in % oder kWh umrechnen
            $(".auslastung").blur(function () {
                if (this.id == "mittlereAuslastungKw1Anl") {
                    var mAkW = $("#mittlereAuslastungKw1Anl").val() * 100 / $("#anschlussleistung1Anl").val();
                    mAkW = mAkW.toFixed(2);
                    $("#mittlereAuslastungProzent1Anl").val(mAkW);
                }
                else if (this.id == "mittlereAuslastungProzent1Anl") {
                    var mAPro = $("#mittlereAuslastungProzent1Anl").val() / 100 * $("#anschlussleistung1Anl").val();
                    mAPro = mAPro.toFixed(3);
                    $("#mittlereAuslastungKw1Anl").val(mAPro);
                }
                else if (this.id == "mittlereAuslastungKw2Anl") {
                    var mAkW = $("#mittlereAuslastungKw2Anl").val() * 100 / $("#anschlussleistung2Anl").val();
                    mAkW = mAkW.toFixed(2);
                    $("#mittlereAuslastungProzent2Anl").val(mAkW);
                }
                else if (this.id == "mittlereAuslastungProzent2Anl") {
                    var mAPro = $("#mittlereAuslastungProzent2Anl").val() / 100 * $("#anschlussleistung2Anl").val();
                    mAPro = mAPro.toFixed(3);
                    $("#mittlereAuslastungKw2Anl").val(mAPro);
                }
                else if (this.id == "mittlereAuslastungKw3Anl") {
                    var mAkW = $("#mittlereAuslastungKw3Anl").val() * 100 / $("#anschlussleistung3Anl").val();
                    mAkW = mAkW.toFixed(2);
                    $("#mittlereAuslastungProzent3Anl").val(mAkW);
                }
                else if (this.id == "mittlereAuslastungProzent3Anl") {
                    var mAPro = $("#mittlereAuslastungProzent3Anl").val() / 100 * $("#anschlussleistung3Anl").val();
                    mAPro = mAPro.toFixed(3);
                    $("#mittlereAuslastungKw3Anl").val(mAPro);
                }
                else if (this.id == "mittlereAuslastungKw4Anl") {
                    var mAkW = $("#mittlereAuslastungKw4Anl").val() * 100 / $("#anschlussleistung4Anl").val();
                    mAkW = mAkW.toFixed(2);
                    $("#mittlereAuslastungProzent4Anl").val(mAkW);
                }
                else if (this.id == "mittlereAuslastungProzent4Anl") {
                    var mAPro = $("#mittlereAuslastungProzent4Anl").val() / 100 * $("#anschlussleistung4Anl").val();
                    mAPro = mAPro.toFixed(3);
                    $("#mittlereAuslastungKw4Anl").val(mAPro);
                }
            });

            //Standorte Custom Feld hinzufügen
            $("#feldHinzufuegenStd").click(function () {
                createCustomField("std");
            });

            //Energieträger Customfelder hinzufügen
            $("#entFaktorHinz, #enfFaktorHinz").click(function () {
                var entOrEnf;
                if (this.id == "entFaktorHinz") {
                    entOrEnf = "ent"
                }
                else {
                    entOrEnf = "enf"
                }
                createCustomField(entOrEnf);
            });

            //Rechnungssplittung
            $("#bisERng").change(function() {
                if ($("#bisERng").val().split(".")[2] !== $("#vomERng").val().split(".")[2]) {
                    alert("Diese Rechnung muss gesplittet werden.");
                    rechnungenSplitten();
                }
            });

            //Formel in Kennzahlenverwaltung auswählen
            $(".imgBtnFormel").click(function() {
                formelAuswahllisteErstellen("knzInt", extractNumber(this.id));
            });

            //Standortdaten 3. freischalten
            $("#stdExtDl").click(function() {
                toggleStandorteDritter(this);
            });

            //Standort auswählen
            var standorteDritterString = "#stdDrSuchenExtDl1, #stdDrSuchenExtDl2, #stdDrSuchenExtDl3, #stdDrSuchenExtDl4, #stdDrSuchenExtDl5, #stdDrSuchenExtDl6,"
            standorteDritterString += "#stdDrSuchenEngResExtDl1, #stdDrSuchenEngResExtDl2, #stdDrSuchenEngResExtDl3, #stdDrSuchenEngResExtDl4, #stdDrSuchenEngResExtDl5, #stdDrSuchenEngResExtDl6"
            $(standorteDritterString).click(function(){
                standortdatenDritteAuswahllisteErstellen(this.id);
            });

            //Auswahlcheckboxen Anlagenliste
            $(".anlListeCheckboxes").change(function () {
                toggleColumnsOnOff(this);
            });

            //Per btn klick in "erweiterungen Anlagen" springen
            $("#btnParHinz").click(function(){
                $("#erwAnlMenu").trigger("click");
            });
            $("#btnAnlOeffnen").click(function(){
                $("#anlMenu").trigger("click");
            });

            //OrtAuswahl in Bereiche
            $("#berSuchenOrt, #ortSuchenMst, #anlAuswahlStd").click(function () {
                standorteAuswahllisteErstellen(this);
            });
            $("#anlAuswahlZugVerbr1, #anlAuswahlZugVerbr2 ,#anlAuswahlZugVerbr3, #anlAuswahlZugVerbr4, #anlAuswahlZugVerbr5, #anlAuswahlZugVerbr6")
            .click(function(){
                anlagenAuswahllisteErstellen(this.id)
            });

            //Vorgelagerter Bereich Auswahl
            $("#berSuchenVBereich1, #berSuchenVBereich2, #anlAuswahlBer").click(function () {
                bereichsAuswahllisteErstellen(this);
            });

            //Mst Auswahl
            var mstString = "#mstSuchenVMessstelle, #anlSuchenMst, #eRngSuchenMst, #anlEnt1SuchenMst, #anlEnt2SuchenMst, #anlEnt3SuchenMst, #anlEnt4SuchenMst,";
            mstString += "#zpSuchenMst, #mstSuchenExtDl1, #mstSuchenExtDl2, #mstSuchenExtDl3, #mstSuchenExtDl4, #mstSuchenExtDl5, #mstSuchenExtDl6,";
            mstString += "#mstSuchenExtDlEngRes1, #mstSuchenExtDlEngRes2, #mstSuchenExtDlEngRes3, #mstSuchenExtDlEngRes4, #mstSuchenExtDlEngRes5, #mstSuchenExtDlEngRes6,";
            mstString += "#imgBtnMstDiag11, #imgBtnMstDiag12, #imgBtnMstDiag13, #imgBtnMstDiag2, #imgBtnMstDatenexport, #mstSuchenVergl1, #mstSuchenVergl2";
            $(mstString)
            .click(function () {
                var ins;
                var ent;
                if (this.id == "mstSuchenVMessstelle") {
                    ins = "vorgMst";
                }
                else if (this.id == "anlSuchenMst") {
                    ins = "mstMsm";
                }
                else if (this.id == "eRngSuchenMst") {
                    ins = "mstERng";
                }
                else if (this.id == "anlEnt1SuchenMst") {
                    ins = "mst1Anl";
                    ent = $("#energietraeger1AllgemeinAnl").val();
                }
                else if (this.id == "anlEnt2SuchenMst") {
                    ins = "mst2Anl";
                    ent = $("#energietraeger2AllgemeinAnl").val();
                }
                else if (this.id == "anlEnt3SuchenMst") {
                    ins = "mst3Anl";
                    ent = $("#energietraeger3AllgemeinAnl").val();
                }
                else if (this.id == "anlEnt4SuchenMst") {
                    ins = "mst4Anl";
                    ent = $("#energietraeger4AllgemeinAnl").val();
                }
                else if (this.id == "zpSuchenMst") {
                    ins = "mstZp";
                }
                else if (this.id == "mstSuchenExtDl1") {
                    ins = "mst1ExtDl";
                }
                else if (this.id == "mstSuchenExtDl2") {
                    ins = "mst2ExtDl";
                }
                else if (this.id == "mstSuchenExtDl3") {
                    ins = "mst3ExtDl";
                }
                else if (this.id == "mstSuchenExtDl4") {
                    ins = "mst4ExtDl";
                }
                else if (this.id == "mstSuchenExtDl5") {
                    ins = "mst5ExtDl";
                }
                else if (this.id == "mstSuchenExtDl6") {
                    ins = "mst6ExtDl";
                }
                else if (this.id == "mstSuchenExtDlEngRes1") {
                    ins = "mstEngRes1ExtDl";
                }
                else if (this.id == "mstSuchenExtDlEngRes2") {
                    ins = "mstEngRes2ExtDl";
                }
                else if (this.id == "mstSuchenExtDlEngRes3") {
                    ins = "mstEngRes3ExtDl";
                }
                else if (this.id == "mstSuchenExtDlEngRes4") {
                    ins = "mstEngRes4ExtDl";
                }
                else if (this.id == "mstSuchenExtDlEngRes5") {
                    ins = "mstEngRes5ExtDl";
                }
                else if (this.id == "mstSuchenExtDlEngRes6") {
                    ins = "mstEngRes6ExtDl";
                }
                else if (this.id == "imgBtnMstDiag11") {
                    ins = "mstDiag1";
                }
                else if (this.id == "imgBtnMstDiag12") {
                    ins = "mstDiag2";
                }
                else if (this.id == "imgBtnMstDiag13") {
                    ins = "mstDiag3";
                }
                else if (this.id == "imgBtnMstDiag2") {
                    ins = "mstCompDiag";
                }
                else if (this.id == "imgBtnMstDatenexport") {
                    ins = "mstDatenexport";
                }
                else if (this.id == "mstSuchenVergl1") {
                    ins = "mstSuchenVergl1";
                }
                else if (this.id == "mstSuchenVergl2") {
                    ins = "mstSuchenVergl2";
                }
                messstellenAuswahllisteErstellen(ins, ent);
            });

            //Messmittel Auswahl
            $("#msmSuchenMst").click(function () {

                switch ($( "#messartMst" ).val()) {
                    case "manuell":
                    case "automatisch":
                    messmittelAuswahllisteErstellen("msmMst");
                    break;
                    case "berechnet":
                    formelAuswahllisteErstellen("frmMst");
                    break;
                    default:
                    alert(`$("#msmSuchenMst").click(): No fitting case !!`);
                }

            });
            $("#msmSuchenAnlage, #mstSuchenAnlage").click(function () {
                var ins;

                if (this.id == "msmSuchenAnlage") {
                    ins = "anlMsm";
                }
                else if (this.id == "mstSuchenAnlage") {
                    ins = "anlMst";
                }
                anlagenAuswahllisteErstellen(ins);
            });
            $(".msmSuchen").click(function () {
                messmittellisteErstellen();
            });

            //Messmittelverwaltung Kanäle frei oder wegschalten
            $("#messungsformAllgemeinMsm").change(function () {
                if ($(this).val() == "1-kanalig") {
                    $(".kanal_2_3").css("visibility", "hidden");
                }
                else {
                    $(".kanal_2_3").css("visibility", "visible");
                }
            });

            //Messmittelverwaltung Kanäle zuweisen
            $("#anlSuchenKanal1,#anlSuchenKanal2,#anlSuchenKanal3").click(function () {
                kanalauswahlTabelleErstellen(this.id);
            });

            //Kennzahl für Diagramm Auswaehlen
            $("#imgBtnknzDiag11, #imgBtnknzDiag12, #imgBtnknzDiag13")
            .click( function () {
                kennzahlenAuswahllisteErstellen(this.id);
            });

            //Rechnungen Eingabemaske erweitern oder einschränken
            $("#modusERng").change(function () {
                if ($(this).val() == "Standard") {
                    $("#standRng").css("display", "block");
                    $("#evuRng").css("display", "none");
                    $("#bafaRng").css("display", "none");
                    $(".evuRng,.bafaRng").val("");
                }
                else if ($(this).val() == "EVU") {
                    $("#standRng").css("display", "block");
                    $("#evuRng").css("display", "block");
                    $("#bafaRng").css("display", "none");
                    $(".bafaRng").val("");
                }
                else if ($(this).val() == "BaFa") {
                    $("#standRng").css("display", "block");
                    $("#evuRng").css("display", "block");
                    $("#bafaRng").css("display", "block");
                }
            });

            //In Rechnung vs. Messwertevergleich, werden die Suchfelder der Vergleichstabelle 2 versteckt
            $("#modusVerglRngMw").change(function () {
                if ($(this).val() == "Messwerte") {
                    $(".suchfelderRngVergl").css("display", "none");
                }
                else {
                    $(".suchfelderRngVergl").css("display", "inline-block");
                }
            });

            //Rechnungs-oder Messwertevergleich
            $("#modusVerglRngMw").change(function (){

            });

            //Anlage Bild hinzufügen
            $("#bildAllgemeinAnl, #bildAllgemeinMsm").click(function (){
                if(this.id == "bildAllgemeinAnl"){
                    $("#imgUploadAnl").trigger("click");
                }
                else{
                    $("#imgUploadMsm").trigger("click");
                }
            });

            //Wenn Menge in Externe Rechnungen/Interne Messwerte verändert wird soll Verbrauch errechnet werden
            $("#mengeERng, #einERng").change(function () {
                var energietraeger = $("#entERng").val();
                var einheit = $("#einERng").val();
                var menge = $("#mengeERng").val();

                verbrauchBerechnen(this.id, energietraeger, einheit, menge);
            });
            $("#mengeIMw").change(function () {
                var energietraeger = $("#entIMw").val();
                var einheit = $("#einIMw").val();
                var menge = $(this).val();

                verbrauchBerechnen(this.id,energietraeger, einheit, menge);
            });

            //Wenn Ent change dann Einheiten neu einlesen
            $("#entERng").change(function () {
                versorgerUndEinheitBefuellen();
            });

            //Tag-,Nachtstromunterteilung ein/ausschalten
            $("#btnHtNt").click(function () {
                if ($("#htNt").css("display") == "none") {
                    $("#htNt").css("display", "block");
                    $(this).text("HT/NT deaktivieren");
                }
                else {
                    $("#htNt").css("display", "none");
                    $(".htNtInp").val("");
                    $(this).text("HT/NT aktivieren");
                }
            });

            //Tag-,Nachtstrom Verbrauch bzw. Kosten aufsummieren
            $("#tagstromVerbrERng, #nachtstromVerbrERng").change(function () {
                var tagS = parseFloat($("#tagstromVerbrERng").val());
                var nachtS = parseFloat($("#nachtstromVerbrERng").val());
                var sum = tagS + nachtS;

                sum = sum.toFixed(2);
                $("#verbrauchERng").val(formatNumber("form",sum));
            });
            $("#tagstromKostERng, #nachtstromKostERng").change( function () {
                var tagS = parseFloat($("#tagstromKostERng").val());
                var nachtS = parseFloat($("#nachtstromKostERng").val());
                var sum = tagS + nachtS;

                sum = sum.toFixed(2);
                $("#kostenERng").val(formatNumber("form",sum));
            });

            //EEG-Umlage gesamt Berechnen
            $("#eegUntERng, #eegUebERng").change( function () {
                var unterMill = parseFloat($("#eegUntERng").val());
                var ueberMill = parseFloat($("#eegUebERng").val());
                var sum = unterMill + ueberMill;

                sum = sum.toFixed(2);
                $("#eegERng").val(sum);
            });

            //Nach Änderung der Messstelle werden die letzten 5 Rechnungen der Mst rechts
            //in die Tabelle eingelesen
            $("#mstERng").change( function () {
                letzteRechnungenInTbl($(this).val());
                zaehlpunktNrInFeld($(this).val());
            });

            //Tabelle der Externen Rechnungen wenn klick auf Lupe
            $("#eRngSuchen").click( function () {
                externeRechnungenListeErstellen("lupe");
            });
            $("#jahr1ERng, #monate1ERng, #vergEnt1ERng, #jahr2ERng, #monate2ERng, #vergEnt2ERng")
            .change(function () {
                vergleichUpdaten(this.id);
            });

            //Auswertungseditor öffnen
            $("#auswEditor").click( function () {

            });

            //Produktion Diagramme ein, ausblenden
            $("#diaProd1AusEin, #diaProd2AusEin").click( function () {
                if (this.id == "diaProd1AusEin" && $(this).text() == "Diagramm ausklappen") {
                    $("#infosProduktion").css("height", ($("#infosProduktion").height() + 300) + "px")
                    $("#diaProd1").css("display", "block");
                    $(this).text("Diagramm einklappen");
                }
                else if (this.id == "diaProd1AusEin" && $(this).text() == "Diagramm einklappen") {
                    $("#diaProd1").css("display", "none");
                    $("#infosProduktion").css("height", ($("#infosProduktion").height() - 300) + "px")
                    $(this).text("Diagramm ausklappen");
                }

                else if (this.id == "diaProd2AusEin" && $(this).text() == "Diagramm ausklappen") {
                    $("#infosProduktion").css("height", ($("#infosProduktion").height() + 300) + "px")
                    $("#diaProd2").css("display", "block");
                    $(this).text("Diagramm einklappen");
                }
                else if (this.id == "diaProd2AusEin" && $(this).text() == "Diagramm einklappen") {
                    $("#diaProd2").css("display", "none");
                    $("#infosProduktion").css("height", ($("#infosProduktion").height() - 300) + "px")
                    $(this).text("Diagramm ausklappen");
                }
            });

            //Produktion Formular einblenden
            $("#menuProduktionAusw").click( function () {
                $("#auswertungen").css("display", "block");
                $("#stammdaten").css("display", "none");
                $(".infoBody").css("display", "inline-block");
                $("#manuell").css("display", "none");
                $("#optionen").css("display", "none");
                $("#bericht").css("display", "none");
            });

            $("#linkBerechnungslogikOderEingabemaske").click( function(){
                var navigationsID = null;
                var menuPunktID = "";
                var fieldIDs = "";

                if($(this).text() == "Berechnunqgslogik anlegen"){
                    navigationsID = mstNavID;
                    menuPunktID = "menuBerechnungsformeln";
                    fieldIDs = ["messmittelBerechnungslogikMst", "berechnungslogikMst"];
                    $("#" + menuPunktID).trigger("click");
                    formelerweiterungNachDrop("berechneteMstName", $("#mstID").val(), $("#nameMst").val(), true);
                }
                else {
                    navigationsID = msmNavID;
                    menuPunktID = "msmMenu";
                    fieldIDs = ["messmittelBerechnungslogikMst"];
                    $("#" + menuPunktID).trigger("click");
                }
                lastNav.setBasicNavInfo({
                    db: $("#nameDB").val(),
                    organisation: $("#orgID").val(),
                    liegenschaft: $("#liegID").val(),
                    bereich: $("#berID").val()
                }, "ber");
                lastNav.setRecordsNavID(navigationsID);
                lastNav.setFieldsNavInfo([
                    {type: "textbox", id: fieldIDs[0]},
                    {type: "textbox", id: fieldIDs[1]}
                ]);
                lastNav.enableJump(true);
            });

            //Liniendiagramm erstellen
            $("#btnDiagrammErst").click( function(){
                chartInNewWindow();
            });
            $("#btnDiagramm2Erst").click( function(){
                chartInNewWindow2();
            });

            $("#btnDiagrammKnzErst").click( function() {
                chartInNewWindowKnz () ;
            });

            //Überprüfen der Länge in input Feldern
            $(".testNumLen").on( "blur", function() {
                switch ( this.value.length > 15 ) {
                    case true:
                    alert("Es sind nur Zahlen mit einer Länge kleiner-gleich 15-Stellen erlaubt!") ;
                    this.value = "" ;
                    break ;
                }
            });

            //Überprüfen der Länge in input Feldern
            $(".testStrLen").on( "blur", function() {
                switch ( this.value.length > 30 ) {
                    case true:
                    alert("Es sind nur Zeichenketten mit maximal 30 Zeichen erlaubt!") ;
                    this.value = "" ;
                    break ;
                }
            });

            //Festlegen der Jahresanzahl und des Startjahres
            $("#anzahlJahreSpaEfVTab1").change( function () {
                var today = new Date();
                var dd = today.getDate();
                var mm = today.getMonth() + 1;

                if (dd < 10) {
                    dd = '0' + dd
                }

                if (mm < 10) {
                    mm = '0' + mm
                }
                switch (mm) {
                    case "02":
                    mm = "Jan";
                    break;
                    case "03":
                    mm = "Feb";
                    break;
                    case "04":
                    mm = "Mrz";
                    break;
                    case "05":
                    mm = "Apr";
                    break;
                    case "06":
                    mm = "Mai";
                    break;
                    case "07":
                    mm = "Jun";
                    break;
                    case "08":
                    mm = "Jul";
                    break;
                    case "09":
                    mm = "Aug";
                    break;
                    case "10":
                    mm = "Sep";
                    break;
                    case "11":
                    mm = "Okt";
                    break;
                    case "12":
                    mm = "Nov";
                    break;
                    case "01":
                    mm = "Dez";
                    break;
                }
                thisYear = today.getFullYear();
                if ($("#startjahrSpaEfVTab1").val() != "") {

                    for (j = 0; j < 6; j++) {
                        $("#jahr" + (j + 1) + "SpaEfV").css("display", "none");
                        $("#chartAusbl" + (j + 1)).text("Ausblenden");
                        $("#chartAusbl" + (j + 1)).css("display", "none");
                    }

                    $("#jahr6SpaEfV").css("display", "inline-block");
                    $("#tbl6SpaEfV caption").text("Energieverbrauchswerte " + thisYear + "  bis " + mm);
                    for (i = 0; i < $(this).val(); i++) {
                        var verbrauchsjahr = $("#startjahrSpaEfVTab1").val();
                        verbrauchsjahr = parseInt(verbrauchsjahr);
                        verbrauchsjahr = verbrauchsjahr + i;
                        $("#jahr" + (i + 1) + "SpaEfV").css("display", "inline-block");
                        $("#chartJahr" + (i + 1)).css("display", "inline");
                        $("#chartAusbl" + (i + 1)).css("display", "inline-block");
                        $("#tbl" + (i + 1) + "SpaEfV caption").text("Energieverbrauchswerte " + verbrauchsjahr);
                    }
                }
            });
            $("#startjahrSpaEfVTab1").change( function () {
                var today = new Date();
                var dd = today.getDate();
                var mm = today.getMonth() + 1;

                if (dd < 10) {
                    dd = '0' + dd
                }

                if (mm < 10) {
                    mm = '0' + mm
                }

                switch (mm) {
                    case "02":
                    mm = "Jan";
                    break;
                    case "03":
                    mm = "Feb";
                    break;
                    case "04":
                    mm = "Mrz";
                    break;
                    case "05":
                    mm = "Apr";
                    break;
                    case "06":
                    mm = "Mai";
                    break;
                    case "07":
                    mm = "Jun";
                    break;
                    case "08":
                    mm = "Jul";
                    break;
                    case "09":
                    mm = "Aug";
                    break;
                    case "10":
                    mm = "Sep";
                    break;
                    case "11":
                    mm = "Okt";
                    break;
                    case "12":
                    mm = "Nov";
                    break;
                    case "01":
                    mm = "Dez";
                    break;
                }
                thisYear = today.getFullYear();
                if ($("#anzahlJahreSpaEfVTab1").val() != "") {
                    for (j = 0; j < 6; j++) {
                        $("#jahr" + (j + 1) + "SpaEfV").css("display", "none");
                        $("#chartAusbl" + (j + 1)).text("Ausblenden");
                        $("#chartAusbl" + (j + 1)).css("display", "none");
                    }

                    var thisYear = new Date();
                    thisYear = thisYear.getFullYear();
                    $("#jahr6SpaEfV").css("display", "inline-block");
                    $("#tbl6SpaEfV caption").text("Energieverbrauchswerte " + thisYear + "  bis " + mm);
                    for (i = 0; i < $("#anzahlJahreSpaEfVTab1").val(); i++) {
                        var verbrauchsjahr = $("#startjahrSpaEfVTab1").val();
                        verbrauchsjahr = parseInt(verbrauchsjahr);
                        verbrauchsjahr = verbrauchsjahr + i;
                        $("#jahr" + (i + 1) + "SpaEfV").css("display", "inline-block");
                        $("#chartAusbl" + (i + 1)).css("display", "inline-block");
                        $("#tbl" + (i + 1) + "SpaEfV caption").text("Energieverbrauchswerte " + verbrauchsjahr);
                    }
                }
            });


            //Charts ein/ausblenden
            $("#chartAusbl1, #chartAusbl2, #chartAusbl3, #chartAusbl4, #chartAusbl5").click( function () {
                if ($(this).text() == "Ausblenden") {
                    var verbrauchsjahr = $("#startjahrSpaEfVTab1").val();
                    verbrauchsjahr = parseInt(verbrauchsjahr);

                    switch (this.id) {
                        case "chartAusbl1":
                        $("#jahr1SpaEfV").css("display", "none");
                        verbrauchsjahr = verbrauchsjahr;
                        break;
                        case "chartAusbl2":
                        $("#jahr2SpaEfV").css("display", "none");
                        verbrauchsjahr = verbrauchsjahr + 1;
                        break;
                        case "chartAusbl3":
                        $("#jahr3SpaEfV").css("display", "none");
                        verbrauchsjahr = verbrauchsjahr + 2;
                        break;
                        case "chartAusbl4":
                        $("#jahr4SpaEfV").css("display", "none");
                        verbrauchsjahr = verbrauchsjahr + 3;
                        break;
                        case "chartAusbl5":
                        $("#jahr5SpaEfV").css("display", "none");
                        verbrauchsjahr = verbrauchsjahr + 4;
                        break;
                    }
                    $(this).text(verbrauchsjahr + " Einblenden");
                }
                else {
                    $(this).text("Ausblenden");
                    switch (this.id) {
                        case "chartAusbl1":
                        $("#jahr1SpaEfV").css("display", "inline-block");
                        break;
                        case "chartAusbl2":
                        $("#jahr2SpaEfV").css("display", "inline-block");
                        break;
                        case "chartAusbl3":
                        $("#jahr3SpaEfV").css("display", "inline-block");
                        break;
                        case "chartAusbl4":
                        $("#jahr4SpaEfV").css("display", "inline-block");
                        break;
                        case "chartAusbl5":
                        $("#jahr5SpaEfV").css("display", "inline-block");
                        break;
                    }
                }
            });

            //Navigation mittels des horizontalen Men�s
            //------------------------------------------------------------------------
            //Stammdaten
            //----------
            var menuStringAuswertungen = "#menuVorlagenformeln, #menuBerechnungsformeln, #menuProduktionAusw, #verbExportMenu, #mstVerglMenu, #zeitVerglMenu, #knzDarst";
            var menuStringStammdaten = "#betrGrpMenu, #sAdmMenu, #manGrpMenu, #admMenu, #benMenu, #untMenu, #anlMenu, #pmMenu, #msmMenu, #knz_almMenu, #manMenu, #orgMenu, #liegMenu, #berMenu, #stdMenu, #stdDrMenu, #anl_Menu, #msgMenu, #knzMenu, #almMenu, #prdMenu,";
            menuStringStammdaten += "#anl_Eng_Menu, #anl_Dok_Menu, #anl_Hist_Menu, #anl_Konfig_Menu,";
            menuStringStammdaten += "#prd_Menu, #prd_Konfig_Menu, #prd_Hist_Menu";
            var menuStringOptionen = "#erwAnlMenu, #entMenu, #enfMenu, #gsfMenu, #mgsMenu, #zpMenu, #erwPrdMenu, #grpDiagMenu";
            var menuStringManuell = "#extRngMenu, #intEngIMwMenu, #intBdeIMwMenu, #eRngVergleichMenu, #spaEfVTab1Menu, #spaEfVTab2Menu";
            var tabKategorienString = "#tabsRechteverwaltung, #tabsUnternehmensstruktur, #tabsAnlagenverwaltung, #tabsPruefmittelverwaltung, #tabsMessmittelverwaltung, #tabsKennzahlenAlarme, #tabsOptionen, #tabsManuell, #tabsAuswertungen";
            $(menuStringAuswertungen).click(function(){
                $("#auswertungen").css("display", "block");
                $("#manuell").css("display", "none");
                $("#optionen").css("display", "none");
                $("#stammdaten").css("display", "none");
                mainMenuNav(this.id);
            });
            $(menuStringStammdaten).click(function () {
                $("#auswertungen").css("display", "none");
                $("#stammdaten").css("display", "block");
                $(".infoBody").css("display", "inline-block");
                $("#manuell").css("display", "none");
                $("#optionen").css("display", "none");
                mainMenuNav(this.id);
            });
            $(menuStringOptionen).click(function () {
                $("#auswertungen").css("display", "none");
                $("#optionen").css("display", "block");
                $("#manuell").css("display", "none");
                $("#stammdaten").css("display", "none");
                mainMenuNav(this.id);
            });
            $(menuStringManuell).click(function () {
                $("#auswertungen").css("display", "none");
                $("#manuell").css("display", "block");
                $("#optionen").css("display", "none");
                $("#stammdaten").css("display", "none");
                mainMenuNav(this.id);
            });

            //Map öffnen
            $("#manMap, #orgMap, #liegMap, #berMap").click(function () {
                mapErstellen(this.id, $("#selectMap").val());
            });
            var insMap;
            $("#selectMap").change(function () {
                if ($("#infosMandanten").css("display") == "block") {
                    insMap = "manMap";
                }
                else if ($("#infosOrganisationen").css("display") == "block") {
                    insMap = "orgMap";
                }
                else if ($("#infosLiegenschaften").css("display") == "block") {
                    insMap = "liegMap";
                }
                else if ($("#infosBereiche").css("display") == "block") {
                    insMap = "berMap";
                }
                var selectedOpt = $("#selectMap").val();
                mapErstellen(insMap, selectedOpt);
            });

            //Anlagenliste öffnen
            $(".anlSuchen").click(function () {
                anlagenlisteErstellen();
            });

            //Bereicheliste erstellen
            $("#berSuchen").click(function () {
                bereichelisteErstellen();
            })

            //Liegenschaftenliste erstellen
            $("#liegSuchen").click(function(){
                liegenschaftenlisteErstellen();
            });

            //ExtDurchleitungenliste erstellen
            $("#extDlSuchen").click(function(){
                extDurchleitungenlisteErstellen();
            });

            //Standortliste erstellen
            $("#stdSuchen").click(function(){
                standortelisteErstellen();
            });

            $("#prdSuchen").click(function(){
                produktelisteErstellen();
            });

            //StandorteDritterliste erstellen
            $("#stdDrSuchen").click(function(){
                standorteDritterlisteErstellen();
            });

            //Energieträgerliste erstellen
            $("#entSuchen").click(function(){
                energietraegerlisteErstellen();
            });

            //Energieformenliste erstellen
            $("#enfSuchen").click(function(){
                energieformenlisteErstellen();
            });

            //Vorlagenformelliste erstellen
            $("#vorlFrmSuchen").click(function(){
                vorlagenformellisteErstellen();
            });


            $("#knzSuchen").click(function(){
                kennzahlInstanzenlisteErstellen();
            });

            //Formelliste erstellen
            $("#frmSuchenBerEdi").click(function(){
                let typ = "";
                switch ($("#bermstmod").val()) {
                    case "Kennzahl":
                    typ = "kennzahl";
                    break;
                    case "Berechnung":
                    typ = "berechnet";
                    break;
                    default:
                    alert("$('#frmSuchenBerEdi').click(): \nAn invalid value was passed!");
                }
                formellisteErstellen( typ );
            });
            $("#formelSuchenTyp").change(function(){
                let formelTyp = "";
                switch ($("#formelSuchenTyp").val()) {
                    case "knz":
                    formelTyp = "kennzahl";
                    break;
                    case "mst":
                    formelTyp = "berechnet";
                    break;
                    default:
                    console.log("$('#formelSuchenTyp').click: \nNo valid 'formeltyp' could be selected!!");
                    break;
                }
                formellisteErstellen( formelTyp );
            });

            //Energieformen einblenden
            $("#erweiternEnfLieg").click(function(){
                energieformenEinAusblenden();
            });

            $("#formelVorfeldLeeren").click(function(){
                $("#formelVorStringDarstellung").val("");
            });

            //Diagrammgruppe Hinzufügen
            $("#btnGruppeHinzDiag").click(function(){
                diagrammGruppeHinzufügen();
            });

            //Berichte einblenden
            var berichtZeitraum;

            //nächstePrüfung Anlagenverwaltung errechnen
            $("#letztePruefungPruefinformationenMsm, #pruefzyklusPruefinformationenMsm").change(function () {
                var str = $("#letztePruefungPruefinformationenMsm").val();
                var year = str.slice(-4);
                var newYear = parseInt(year) + parseInt($("#pruefzyklusPruefinformationenMsm").val());
                $("#naechstePruefungPruefinformationenMsm").val(str.substring(0, 6) + newYear);
            });

            //Je nachdem auf welches tab geklickt wird, wird die Hintergrundfarbe des Tabs
            //verÄndert und die jeweilige div (Org,Lieg,Ber) ein bzw. die anderen ausge-
            //schaltet. Zur Navigation werden jeweilig Droboxen eingelesen
            //------------------------------------------------------------------------
            var tabString = "#tabGipscAdm, #tabBetrGrp, #tabManGrp, #tabSAdm, #tabAdm, #tabBen, #tabMan, #tabOrg, #tabLieg, #tabExtDl, #tabStdDr, #tabBer, #tabStd, #tabBen, #tabMsm, #tabConfig, #tabDok_Msm, #tabHis_Msm, #tabAnl, #tabAnl_energie, #tabAnl_dokumente, #tabAnl_historie, #tabKnz, #tabAlm, #tabExtRechnungen, #tabIntEnergiedatenIMw, #tabIntBetriebsdatenIMw, #tabAusw_eRng_iMw, #tabSpaEfV_Tbl1, #tabSpaEfV_Tbl2, #tabZp, #tabMgs, #tabGsf, #tabEng, #tabEAnl, #tabEPrd, #tabPrd, #tabPrd_historie, #tabBerechnungsformeln, #tabVorlagenformeln, #tabSpaEfV_Tbl1,";
            tabString += "#tabSpaEfV_Tbl2, #tabVerbrauchsdatenExp, #tabLnDiag, #tabTimeCompDiag,";
            tabString += "#tabAnl_energie, #tabAnl_weitereKonfig, tabAnl_dokumente, tabAnl_historie,";
            tabString += "#tabPrd_konfig, #tabDiagKnz, #tabGrpDiag";
            $(tabString).click(function () {
                tabControlNav(this.id);
                $(".lblNeu").css("display", "none");
                $(".lblAendern").css("display", "inline");
            });

            //Pfeilnavigation auf den einzelnen Tabs
            //------------------------------------------------------------------------//
            $(`#gipscAdmFirst, #betrGrpFirst, #sAdmFirst, #manGrpFirst, #admFirst, #benFirst,
                #manFirst, #orgFirst, #liegFirst, #extDlFirst, #berFirst, #mstFirst, #stdFirst,
                #stdDrFirst, #anlFirst, #msmFirst, #entFirst, #enfFirst, #eRngFirst, #intEngIMwFirst,
                #intBdeIMwFirst, #eAnlFirst, #ePrdFirst, #zpFirst, #prdFirst, #knzFirst, #betrParFirst`)
            .click(function () {
                    if (this.id == "gipscAdmFirst") {
                        gipscAdmNavID = 0;
                        readInstanzen(this.id, gipscAdmNavID);
                    }
                    else if (this.id == "betrGrpFirst") {
                        betrGrpNavID = 0;
                        $(".betrPfad").prop("selectedIndex", betrGrpNavID);
                        readInstanzen(this.id, betrGrpNavID);
                    }
                    else if (this.id == "sAdmFirst") {
                        sAdmNavID = 0;
                        readInstanzen(this.id, sAdmNavID);
                    }
                    else if (this.id == "manGrpFirst") {
                        manGrpNavID = 0;
                        readInstanzen(this.id, manGrpNavID);
                    }
                    else if (this.id == "admFirst") {
                        admNavID = 0;
                        readInstanzen(this.id, admNavID);
                    }
                    else if (this.id == "benFirst") {
                        benNavID = 0;
                        readInstanzen(this.id, benNavID);
                    }
                    else if (this.id == "manFirst") {
                        manNavID = 0;
                        $(".manPfad").prop("selectedIndex", manNavID);
                        readInstanzen(this.id, manNavID);
                        organisationenEinlesen();
                        liegenschaftenEinlesen();
                        //clearFields("orgHinz");
                        readInstanzen("orgFirst", 0);
                    }
                    else if (this.id == "orgFirst") {
                        orgNavID = 0;
                        $(".orgPfad").prop("selectedIndex", orgNavID);
                        readInstanzen(this.id, orgNavID);
                        liegenschaftenEinlesen();
                        //clearFields("liegHinz");
                        readInstanzen("liegFirst", 0);
                    }
                    else if (this.id == "liegFirst") {
                        liegNavID = 0;
                        $(".liegPfad").prop("selectedIndex", liegNavID);
                        readInstanzen(this.id, liegNavID);
                        //clearFields("berHinz");
                        readInstanzen("berFirst", 0);
                        //clearFields("mstHinz");
                        readInstanzen("mstFirst", 0);
                        //clearFields("stdHinz");
                        readInstanzen("stdFirst", 0);
                    }
                    else if (this.id == "extDlFirst") {
                        extDlNavID = 0;
                        readInstanzen(this.id,extDlNavID);
                    }
                    else if (this.id == "berFirst") {
                        berNavID = 0;
                        mstNavID = 0;
                        readInstanzen(this.id, berNavID);
                        //clearFields("mstHinz");
                        readInstanzen("mstFirst", 0);
                    }
                    else if (this.id == "mstFirst") {
                        mstNavID = 0;
                        readInstanzen(this.id, mstNavID);
                    }
                    else if (this.id == "stdFirst") {
                        stdNavID = 0;
                        readInstanzen(this.id, stdNavID);
                    }
                    else if (this.id == "stdDrFirst") {
                        stdDrNavID = 0;
                        readInstanzen(this.id, stdDrNavID);
                    }
                    else if (this.id == "anlFirst") {
                        anlNavID = 0;
                        readInstanzen(this.id, anlNavID);
                        dokumentenListeErstellen();
                    }
                    else if (this.id == "msmFirst") {
                        msmNavID = 0;
                        readInstanzen(this.id, msmNavID);
                        dokumentenListeErstellen();
                    }
                    else if (this.id == "prdFirst") {
                        prdNavID = 0;
                        readInstanzen(this.id, prdNavID);
                        dokumentenListeErstellen();
                    }
                    else if (this.id == "entFirst") {
                        entNavID = 0;
                        readInstanzen(this.id, entNavID);
                        $("#modusVers").val("alt");
                        //clearFields("mstHinz");
                    }
                    else if (this.id == "enfFirst") {
                        enfNavID = 0;
                        readInstanzen(this.id, enfNavID);
                    }
                    else if (this.id == "eRngFirst") {
                        eRngNavID = 0;
                        readInstanzen(this.id, eRngNavID);
                    }
                    else if (this.id == "intEngIMwFirst") {
                        intEngIMwNavID = 0;
                        readInstanzen(this.id, intEngIMwNavID);
                    }
                    else if (this.id == "intBdeIMwFirst") {
                        intBdeIMwNavID = 0;
                        readInstanzen(this.id, intBdeIMwNavID);
                    }
                    else if (this.id == "eAnlFirst") {
                        eAnlNavID = 0;
                        readInstanzen(this.id, eAnlNavID);
                    }
                    else if (this.id == "ePrdFirst") {
                        ePrdNavID = 0;
                        readInstanzen(this.id, ePrdNavID);
                    }
                    else if (this.id == "zpFirst") {
                        zpNavID = 0;
                        readInstanzen(this.id, zpNavID);
                    }
                    else if (this.id == "knzFirst") {
                        knzNavID = 0;
                        readInstanzen(this.id, knzNavID);
                    }
                    else if (this.id == "betrParFirst") {
                        betrParNavID = 0 ;
                        readInstanzen( this.id, betrParNavID ) ;
                    }
                    saveNew = false ;
                    $(".lblNeu").css("display", "none") ;
                    $(".lblAendern").css("display", "inline") ;
                });
            $(`#gipscAdmPrevious, #betrGrpPrevious,#sAdmPrevious,#manGrpPrevious,#admPrevious,
                    #benPrevious,#manPrevious, #orgPrevious, #liegPrevious, #extDlPrevious, #berPrevious,
                    #mstPrevious, #stdPrevious, #stdDrPrevious, #anlPrevious, #msmPrevious, #entPrevious,
                    #enfPrevious, #eRngPrevious, #intEngIMwPrevious, #intBdeIMwPrevious, #eAnlPrevious,
                    #ePrdPrevious, #zpPrevious, #prdPrevious, #knzPrevious, #betrParPrevious`)
            .click(function () {
                        if (this.id == "gipscAdmPrevious") {
                            if (gipscAdmNavID > 0) {
                                gipscAdmNavID--;
                                readInstanzen(this.id, gipscAdmNavID);
                            }
                        }
                        else if (this.id == "betrGrpPrevious") {
                            if (betrGrpNavID > 0) {
                                betrGrpNavID--;
                                $(".betrPfad").prop("selectedIndex", betrGrpNavID);
                                readInstanzen(this.id, betrGrpNavID);
                            }
                        }
                        else if (this.id == "sAdmPrevious") {
                            if (sAdmNavID > 0) {
                                sAdmNavID--;
                                readInstanzen(this.id, sAdmNavID);
                            }
                        }
                        else if (this.id == "manGrpPrevious") {
                            if (manGrpNavID > 0) {
                                manGrpNavID--;
                                readInstanzen(this.id, manGrpNavID);
                            }
                        }
                        else if (this.id == "admPrevious") {
                            if (admNavID > 0) {
                                admNavID--;
                                readInstanzen(this.id, admNavID);
                            }
                        }
                        else if (this.id == "benPrevious") {
                            if (benNavID > 0) {
                                benNavID--;
                                readInstanzen(this.id, benNavID);
                            }
                        }
                        else if (this.id == "manPrevious") {
                            if (manNavID > 0) {
                                manNavID--;
                                $(".manPfad").prop("selectedIndex", manNavID);
                                readInstanzen(this.id, manNavID);
                                setTimeout(function(){ organisationenEinlesen();}, 1500);
                                setTimeout(function(){ liegenschaftenEinlesen();}, 2000);

                                //clearFields("orgHinz");
                                readInstanzen("orgFirst", 0);
                            }
                        }
                        else if (this.id == "orgPrevious") {
                            if (orgNavID > 0) {
                                orgNavID--;
                                $(".orgPfad").prop("selectedIndex", orgNavID--);
                                readInstanzen(this.id, orgNavID);
                                liegenschaftenEinlesen();
                                //clearFields("liegHinz");
                                readInstanzen("liegFirst", 0);
                            }
                        }
                        else if (this.id == "liegPrevious") {
                            if (liegNavID > 0) {
                                liegNavID--;
                                $(".liegPfad").prop("selectedIndex", liegNavID);
                                readInstanzen(this.id, liegNavID);
                                //clearFields("berHinz");
                                readInstanzen("berFirst", 0);
                                //clearFields("mstHinz");
                                readInstanzen("mstFirst", 0);
                                //clearFields("stdHinz");
                                readInstanzen("stdFirst", 0);
                            }
                        }
                        else if (this.id == "extDlPrevious") {
                            if (extDlNavID > 0) {
                                extDlNavID--;
                                readInstanzen(this.id, extDlNavID);
                            }
                        }
                        else if (this.id == "berPrevious") {
                            if (berNavID > 0) {
                                berNavID--;
                                mstNavID = 0;
                                readInstanzen(this.id, berNavID);
                                clearFields("mstHinz");
                                readInstanzen("mstFirst", 0);
                                readInstanzen(this.id, berNavID);
                            }
                        }
                        else if (this.id == "mstPrevious") {
                            if (mstNavID > 0) {
                                mstNavID--;
                                readInstanzen(this.id, mstNavID);
                            }
                        }
                        else if (this.id == "stdPrevious") {
                            if (stdNavID > 0) {
                                stdNavID--;
                                readInstanzen(this.id, stdNavID);
                            }
                        }
                        else if (this.id == "stdDrPrevious") {
                            if (stdDrNavID > 0) {
                                stdDrNavID--;
                                readInstanzen(this.id, stdDrNavID);
                            }
                        }
                        else if (this.id == "anlPrevious") {
                            if (anlNavID > 0) {
                                anlNavID--;
                                readInstanzen(this.id, anlNavID);
                                dokumentenListeErstellen();
                            }
                        }
                        else if (this.id == "msmPrevious") {
                            if (msmNavID > 0) {
                                msmNavID--;
                                readInstanzen(this.id, msmNavID);
                                dokumentenListeErstellen();
                            }
                        }
                        else if (this.id == "prdPrevious") {
                            if (prdNavID > 0) {
                                prdNavID--;
                                readInstanzen(this.id, prdNavID);
                                dokumentenListeErstellen();
                            }
                        }
                        else if (this.id == "entPrevious") {
                            if (entNavID > 0) {
                                entNavID--;
                                readInstanzen(this.id, entNavID);
                                $("#modusVers").val("alt");
                            }
                        }
                        else if (this.id == "enfPrevious") {
                            if (enfNavID > 0) {
                                enfNavID--;
                                readInstanzen(this.id, enfNavID);
                            }
                        }
                        else if (this.id == "eRngPrevious") {
                            if (eRngNavID > 0) {
                                eRngNavID--;
                                readInstanzen(this.id, eRngNavID);
                            }
                        }
                        else if (this.id == "intEngIMwPrevious") {
                            if (intEngIMwNavID > 0) {
                                intEngIMwNavID--;
                                readInstanzen(this.id, intEngIMwNavID);
                            }
                        }
                        else if (this.id == "intBdeIMwPrevious") {
                            if (intBdeIMwNavID > 0) {
                                intBdeIMwNavID--;
                                readInstanzen(this.id, intBdeIMwNavID);
                            }
                        }
                        else if (this.id == "eAnlPrevious") {
                            if (eAnlNavID > 0) {
                                eAnlNavID--;
                                readInstanzen(this.id, eAnlNavID);
                            }
                        }
                        else if (this.id == "ePrdPrevious") {
                            if (ePrdNavID > 0) {
                                ePrdNavID--;
                                readInstanzen(this.id, ePrdNavID);
                            }
                        }
                        else if (this.id == "zpPrevious") {
                            if (zpNavID > 0) {
                                zpNavID--;
                                readInstanzen(this.id, zpNavID);
                            }
                        }
                        else if (this.id == "knzPrevious") {
                            if (knzNavID > 0) {
                                knzNavID--;
                                readInstanzen(this.id, knzNavID);
                            }
                        }
                        else if (this.id == "betrParPrevious") {
                            if ( betrParNavID > 0 ) {
                                betrParNavID-- ;
                                readInstanzen ( this.id, betrParNavID ) ;
                            }
                        }
                        saveNew = false;
                        $(".lblNeu").css("display", "none");
                        $(".lblAendern").css("display", "inline");
                    });
            $(`#gipscAdmNext, #betrGrpNext,#sAdmNext,#manGrpNext,#admNext,#benNext,#manNext,
                        #orgNext, #liegNext, #extDlNext, #berNext, #mstNext, #stdNext, #stdDrNext,
                        #anlNext, #msmNext, #entNext, #enfNext, #eRngNext, #intEngIMwNext, #intBdeIMwNext,
                        #eAnlNext, #ePrdNext, #zpNext, #prdNext, #knzNext, #betrParNext`)
            .click(function () {
                            if (this.id == "gipscAdmNext") {
                                if (gipscAdmNavID < $("#gipscAdmCount").val() - 1) {
                                    gipscAdmNavID++;
                                    readInstanzen(this.id, gipscAdmNavID);
                                }
                            }
                            else if (this.id == "betrGrpNext") {
                                if (betrGrpNavID < $("#betrGrpCount").val() - 1) {
                                    betrGrpNavID++;
                                    $(".betrPfad").prop("selectedIndex", betrGrpNavID);
                                    readInstanzen(this.id, betrGrpNavID);
                                }
                            }
                            else if (this.id == "sAdmNext") {
                                if (sAdmNavID < $("#sAdmCount").val() - 1) {
                                    sAdmNavID++;
                                    readInstanzen(this.id, sAdmNavID);
                                }
                            }
                            else if (this.id == "manGrpNext") {
                                if (manGrpNavID < $("#manGrpCount").val() - 1) {
                                    manGrpNavID++;
                                    readInstanzen(this.id, manGrpNavID);
                                }
                            }
                            else if (this.id == "admNext") {
                                if (admNavID < $("#admCount").val() - 1) {
                                    admNavID++;
                                    readInstanzen(this.id, admNavID);
                                }
                            }
                            else if (this.id == "benNext") {
                                if (benNavID < $("#benCount").val() - 1) {
                                    benNavID++;
                                    readInstanzen(this.id, benNavID);
                                }
                            }
                            else if (this.id == "manNext") {
                                if (manNavID < $("#manCount").val() - 1) {
                                    manNavID++;
                                    $(".manPfad").prop("selectedIndex", manNavID);
                                    readInstanzen(this.id, manNavID);
                                    organisationenEinlesen();
                                    liegenschaftenEinlesen();
                                    //clearFields("orgHinz");
                                    readInstanzen("orgFirst", 0);
                                }
                            }
                            else if (this.id == "orgNext") {
                                if (orgNavID < $("#orgCount").val() - 1) {
                                    orgNavID++;
                                    $(".orgPfad").prop("selectedIndex", orgNavID);
                                    readInstanzen(this.id, orgNavID);
                                    liegenschaftenEinlesen();
                                    //clearFields("liegHinz");
                                    readInstanzen("liegFirst", 0);
                                }
                            }
                            else if (this.id == "liegNext") {
                                if (liegNavID < $("#liegCount").val() - 1) {
                                    liegNavID++;
                                    $(".liegPfad").prop("selectedIndex", liegNavID);
                                    readInstanzen(this.id, liegNavID);
                                    //clearFields("berHinz");
                                    readInstanzen("berFirst", 0);
                                    //clearFields("mstHinz");
                                    readInstanzen("mstFirst", 0);
                                    //clearFields("stdHinz");
                                    readInstanzen("stdFirst", 0);
                                }
                            }
                            else if (this.id == "extDlNext") {
                                if (extDlNavID < $("#extDlCount").val() - 1) {
                                    extDlNavID++;
                                    readInstanzen(this.id, extDlNavID);
                                }
                            }
                            else if (this.id == "berNext") {
                                if (berNavID < $("#berCount").val() - 1) {
                                    berNavID++;
                                    mstNavID = 0;
                                    readInstanzen(this.id, berNavID);
                                    clearFields("mstHinz");
                                    readInstanzen("mstFirst", 0);
                                }
                            }
                            else if (this.id == "mstNext") {
                                if (mstNavID < $("#mstCount").val() - 1) {
                                    mstNavID++;
                                    readInstanzen(this.id, mstNavID);
                                }
                            }
                            else if (this.id == "stdNext") {
                                if (stdNavID < $("#stdCount").val() - 1) {
                                    stdNavID++;
                                    readInstanzen(this.id, stdNavID);
                                }
                            }
                            else if (this.id == "stdDrNext") {
                                if (stdDrNavID < $("#stdDrCount").val() - 1) {
                                    stdDrNavID++;
                                    readInstanzen(this.id, stdDrNavID);
                                }
                            }
                            else if (this.id == "anlNext") {
                                if (anlNavID < $("#anlCount").val() - 1) {
                                    anlNavID++;
                                    readInstanzen(this.id, anlNavID);
                                    dokumentenListeErstellen();
                                }
                            }
                            else if (this.id == "msmNext") {
                                if (msmNavID < $("#msmCount").val() - 1) {
                                    msmNavID++;
                                    readInstanzen(this.id, msmNavID);
                                    dokumentenListeErstellen();
                                }
                            }
                            else if (this.id == "prdNext") {
                                if (prdNavID < $("#prdCount").val() - 1) {
                                    prdNavID++;
                                    readInstanzen(this.id, prdNavID);
                                }
                            }
                            else if (this.id == "entNext") {
                                if (entNavID < $("#entCount").val() - 1) {
                                    entNavID++;
                                    readInstanzen(this.id, entNavID);
                                    $("#modusVers").val("alt");
                                }
                            }
                            else if (this.id == "enfNext") {
                                if (enfNavID < $("#enfCount").val() - 1) {
                                    enfNavID++;
                                    readInstanzen(this.id, enfNavID);
                                }
                            }
                            else if (this.id == "eRngNext") {
                                if (eRngNavID < $("#eRngCount").val() - 1) {
                                    eRngNavID++;
                                    readInstanzen(this.id, eRngNavID);
                                }
                            }
                            else if (this.id == "intEngIMwNext") {
                                if (intEngIMwNavID < $("#intEngIMwCount").val() - 1) {
                                    intEngIMwNavID++;
                                    readInstanzen(this.id, intEngIMwNavID);
                                }
                            }
                            else if (this.id == "intBdeIMwNext") {
                                if (intBdeIMwNavID < $("#intBdeIMwCount").val() - 1) {
                                    intBdeIMwNavID++;
                                    readInstanzen(this.id, intBdeIMwNavID);
                                }
                            }
                            else if (this.id == "eAnlNext") {
                                if (eAnlNavID < $("#eAnlCount").val() - 1) {
                                    eAnlNavID++;
                                    readInstanzen(this.id, eAnlNavID);
                                }
                            }
                            else if (this.id == "ePrdNext") {
                                if (ePrdNavID < $("#ePrdCount").val() - 1) {
                                    ePrdNavID++;
                                    readInstanzen(this.id, ePrdNavID);
                                }
                            }
                            else if (this.id == "zpNext") {
                                if (zpNavID < $("#zpCount").val() - 1) {
                                    zpNavID++;
                                    readInstanzen(this.id, zpNavID);
                                }
                            }
                            else if (this.id == "knzNext") {
                                if (knzNavID < $("#knzInsCount").val() - 1) {
                                    knzNavID++;
                                    readInstanzen(this.id, knzNavID);
                                }
                            }
                            else if (this.id == "betrParNext") {
                                if (betrParNavID < $("#betrParCount").val() - 1) {
                                    betrParNavID++;
                                    readInstanzen(this.id, betrParNavID);
                                }
                            }
                            saveNew = false;
                            $(".lblNeu").css("display", "none");
                            $(".lblAendern").css("display", "inline");
                        });
            $(`#gipscAdmLast, #betrGrpLast,#sAdmLast,#manGrpLast,#admLast,#benLast,#manLast,
                            #orgLast, #liegLast, #extDlLast, #berLast, #mstLast, #stdLast, #stdDrLast,
                            #anlLast, #msmLast, #entLast, #enfLast, #eRngLast, #intEngIMwLast, #intBdeIMwLast,
                            #eAnlLast, #ePrdLast, #zpLast, #prdLast, #knzLast, #betrParLast`)
            .click(function () {
                                if (this.id == "gipscAdmLast") {
                                    gipscAdmNavID = $("#gipscAdmCount").val() - 1;
                                    readInstanzen(this.id, gipscAdmNavID);
                                }
                                else if (this.id == "betrGrpLast") {
                                    betrGrpNavID = $("#betrGrpCount").val() - 1;
                                    $(".betrPfad").prop("selectedIndex", betrGrpNavID);
                                    readInstanzen(this.id, betrGrpNavID);
                                }
                                else if (this.id == "sAdmLast") {
                                    sAdmNavID = $("#sAdmCount").val() - 1;
                                    readInstanzen(this.id, sAdmNavID);
                                }
                                else if (this.id == "manGrpLast") {
                                    manGrpNavID = $("#manGrpCount").val() - 1;
                                    readInstanzen(this.id, manGrpNavID);
                                }
                                else if (this.id == "admLast") {
                                    admNavID = $("#admCount").val() - 1;
                                    readInstanzen(this.id, admNavID);
                                }
                                else if (this.id == "benLast") {
                                    benNavID = $("#benCount").val() - 1;
                                    readInstanzen(this.id, benNavID);
                                }
                                else if (this.id == "manLast") {
                                    manNavID = $("#manCount").val() - 1;
                                    $(".manPfad").prop("selectedIndex", manNavID);
                                    readInstanzen(this.id, manNavID);
                                    organisationenEinlesen();
                                    liegenschaftenEinlesen();
                                    //clearFields("orgHinz");
                                    readInstanzen("orgFirst", 0);
                                }
                                else if (this.id == "orgLast") {
                                    orgNavID = $("#orgCount").val() - 1;
                                    $(".orgPfad").prop("selectedIndex", orgNavID);
                                    readInstanzen(this.id, orgNavID);
                                    liegenschaftenEinlesen();
                                    //clearFields("liegHinz");
                                    readInstanzen("liegFirst", 0);
                                }
                                else if (this.id == "liegLast") {
                                    liegNavID = $("#liegCount").val() - 1;
                                    $(".liegPfad").prop("selectedIndex", liegNavID);
                                    readInstanzen(this.id, liegNavID);
                                    //clearFields("berHinz");
                                    readInstanzen("berFirst", 0);
                                    //clearFields("mstHinz");
                                    readInstanzen("mstFirst", 0);
                                    //clearFields("stdHinz");
                                }
                                else if (this.id == "extDlLast") {
                                    extDlNavID = $("#extDlCount").val() - 1;
                                    readInstanzen(this.id, extDlNavID);
                                }
                                else if (this.id == "berLast") {
                                    berNavID = $("#berCount").val() - 1;
                                    mstNavID = 0;
                                    readInstanzen(this.id, berNavID);
                                    clearFields("mstHinz");
                                    readInstanzen("mstFirst", 0);
                                }
                                else if (this.id == "mstLast") {
                                    mstNavID = $("#mstCount").val() - 1;
                                    readInstanzen(this.id, mstNavID);
                                }
                                else if (this.id == "stdLast") {
                                    stdNavID = $("#stdCount").val() - 1;
                                    readInstanzen(this.id, stdNavID);
                                }
                                else if (this.id == "stdDrLast") {
                                    stdDrNavID = $("#stdDrCount").val() - 1;
                                    readInstanzen(this.id, stdDrNavID);
                                }
                                else if (this.id == "anlLast") {
                                    anlNavID = $("#anlCount").val() - 1;
                                    readInstanzen(this.id, anlNavID);
                                    dokumentenListeErstellen();
                                }
                                else if (this.id == "msmLast") {
                                    msmNavID = $("#msmCount").val() - 1;
                                    readInstanzen(this.id, msmNavID);
                                    dokumentenListeErstellen();
                                }
                                else if (this.id == "prdLast") {
                                    prdNavID = $("#prdCount").val() - 1;
                                    readInstanzen(this.id, prdNavID);
                                }
                                else if (this.id == "entLast") {
                                    entNavID = $("#entCount").val() - 1;
                                    enfNavID = 0;
                                    readInstanzen(this.id, entNavID);
                                    clearFields("enfHinz");
                                    readInstanzen("enfFirst", 0);
                                    $("#modusVers").val("alt");
                                }
                                else if (this.id == "enfLast") {
                                    enfNavID = $("#enfCount").val() - 1;
                                    readInstanzen(this.id, enfNavID);
                                }
                                else if (this.id == "eRngLast") {
                                    eRngNavID = $("#eRngCount").val() - 1;
                                    readInstanzen(this.id, eRngNavID);
                                }
                                else if (this.id == "intEngIMwLast") {
                                    intEngIMwNavID = $("#intEngIMwCount").val() - 1;
                                    readInstanzen(this.id, intEngIMwNavID);
                                }
                                else if (this.id == "intBdeIMwLast") {
                                    intBdeIMwNavID = $("#intBdeIMwCount").val() - 1;
                                    readInstanzen(this.id, intBdeIMwNavID);
                                }
                                else if (this.id == "eAnlLast") {
                                    eAnlNavID = $("#eAnlCount").val() - 1;
                                    readInstanzen(this.id, eAnlNavID);
                                }
                                else if (this.id == "ePrdLast") {
                                    ePrdNavID = $("#ePrdCount").val() - 1;
                                    readInstanzen(this.id, ePrdNavID);
                                }
                                else if (this.id == "zpLast") {
                                    zpNavID = $("#zpCount").val() - 1;
                                    readInstanzen(this.id, zpNavID);
                                }
                                else if (this.id == "knzLast") {
                                    knzNavID = $("#knzInsCount").val() - 1;
                                    readInstanzen(this.id, knzNavID);
                                }
                                else if (this.id == "betrParLast") {
                                    betrParNavID = $("#betrParCount").val() - 1;
                                    readInstanzen ( this.id, betrParNavID ) ;
                                }
                                saveNew = false;
                                $(".lblNeu").css("display", "none");
                                $(".lblAendern").css("display", "inline");
                            });

            //Datei zu Dokumenten in der Anlagenverwaltung hinzufügen
            $("#dateiHinz").click(function () {
                                $(this).filepicker();
                            });

            //Make left sidebar menu for Berechnungslogik
            $("#berLogikMenu").menu();
            //Left sidebar menu for interneMesswerte
            $("#intMwMenu").menu();

            //Wenn Monat in Masseneingabe geändert, dann soll die Anzahl der Felder entsprechend geändert werden
            $("#jahrMasseneingabeIMw, #btnAnlagenNummerMassEing, #btnAnlagenBezeichnungMassEing, #einheitMasseneingabeIMw")
            .change(function(){
                                var btnZeitspanne = null;
                                if(this.id == "jahrMasseneingabeIMw"){
                                    ME.resetObj();
                                }
                                else {
                                    ME.loadFromDB();
                                }
                                if($("#masseneingabeTimeInterval").val() == TimeInterval.DAY){
                                    btnZeitspanne = "#btnTageMasseneingabeIMw";
                                }
                                else if ($("#masseneingabeTimeInterval").val() == TimeInterval.WEEK){
                                    btnZeitspanne = "#btnWochenMasseneingabeIMw";
                                }
                                else if ($("#masseneingabeTimeInterval").val() == TimeInterval.MONTH){
                                    btnZeitspanne = "#btnMonateMasseneingabeIMw";
                                }
                                else if ($("#masseneingabeTimeInterval").val() == TimeInterval.YEAR){
                                    btnZeitspanne = "#btnJahreMasseneingabeIMw";
                                }
                                $(btnZeitspanne).trigger("click");
                            });
            $("#monatMasseneingabeIMw").change(function(){
                                masseneingabeInMonatNavigieren($(this).val());
                            });

            $("#btnTageMasseneingabeIMw, #btnWochenMasseneingabeIMw, #btnMonateMasseneingabeIMw, #btnJahreMasseneingabeIMw")
            .click(function(){
                                var zeitspanne = undefined;
                                switch (this.id) {
                                    case "btnTageMasseneingabeIMw":
                                    zeitspanne = TimeInterval.DAY;
                                    break;
                                    case "btnWochenMasseneingabeIMw":
                                    zeitspanne = TimeInterval.WEEK;
                                    break;
                                    case "btnMonateMasseneingabeIMw":
                                    zeitspanne = TimeInterval.MONTH;
                                    break;
                                    case "btnJahreMasseneingabeIMw":
                                    zeitspanne = TimeInterval.YEAR;
                                    break;
                                }
                                masseneingabeZeitintervallAendern(zeitspanne);
                            });

            //Masseneingabe	speichern
            $("#masseneingabeSpeichern").click(function(){
                ME.saveToDB();
            });

            //Daten der Masseneingabe aus DB laden
            $("#masseneingabeLaden").click(function(){
                ME.loadFromDB();
            });


            //Scroll event
            $("#masseneingabeInputIMw").scroll(function(){
                $("#masseneingabeNameIMw")
                .css("margin-top", (-1 * $("#masseneingabeInputIMw").scrollTop()))
                .css("padding-bottom", $("#masseneingabeInputIMw").scrollTop());
                $("#masseneingabeZeitintervallIMw").scrollLeft($("#masseneingabeInputIMw").scrollLeft());

                //Aus- und Einblenden der Zeilenbezeichnungen
                let differ = ($("#masseneingabeZeitintervallContainerIMw").position().top + $("#masseneingabeZeitintervallContainerIMw").height()) - $("#masseneingabeNameIMw input").position().top;
                differ /= 10.5;
                $("#masseneingabeNameIMw input").css("visibility", "visible");
                for(let i = 1; i < Math.floor(differ) + 1; i++){
                    $("#masseneingabeNameIMw input:nth-child(" + i + ")").css("visibility", "hidden");
                }

            });

            //Formelmodus in 'Berechnungsformeln' change
            $("#bermstmod").change(function(){
                if(this.value == "Berechnung"){

                    $(".berFormel")
                    .css("display", "block")

                    $(".knzFormel").css("display", "none");

                    $("#formelSuchenTyp").val("mst");
                }
                else if (this.value == "Kennzahl") {
                    $(".berFormel").css("display", "none");

                    $(".knzFormel")
                    .css("display", "block")

                    $("#formelSuchenTyp").val("knz");
                }
                else {
                    logToConsole('$("#bermstmod").change()', "ERROR", "Something went wrong!");
                }
            });

            //Formelfeld in Berechnungseditor leeren
            $("#formelfeldLeeren").click(function(){
                $("#formelStringDarstellung, #formelIdDarstellung, #berechneteMstName, #berechneteMstID").val("")
            });

            //Left sidebar navigation
            $("#mstBezugstabelleBerLogik, #iMwBezugstabelleBerLogik, #bdeBezugstabelleBerLogik")
            .click(function(){
                if (this.id == "mstBezugstabelleBerLogik") {
                    $("#tblIMwContainer").hide();
                    $("#tblMstContainer").show();
                }
                else if (this.id == "iMwBezugstabelleBerLogik") {
                    $("#tblIMwContainer").show();
                    $("#tblMstContainer").hide();
                }
                else if (this.id == "bdeBezugstabelleBerLogik") {
                    $("#tblBetriebsdatenBerechnungseditor")
                    .show()
                    .parents('div.dataTables_wrapper').first().show();
                    $("#tblMessstellenBerechnungseditor, #tblInterneMesswerteBerechnungseditor")
                    .parents('div.dataTables_wrapper').first().hide();
                    $("#tblMessstellenBerechnungseditor").css("display", "none");
                    tblBetriebsdatenBerechnungseditor.draw();
                }
            });

            //Zeitraumauswahl interneMesswerte
            var zeitraumauswahlString = "#masseneingabeZeitraumTag, #masseneingabeZeitraumWoche, masseneingabeZeitraumMonat, #masseneingabeZeitraumJahr";
            $(zeitraumauswahlString).click(function(){
                $("#zeitraumMasseneingabeIMw option").remove();
                switch (this.id) {
                    case masseneingabeZeitraumTag:
                    $("#zeitraumMasseneingabeIMw")
                    break;
                    default:

                }
            });
            //Option zu Merkmal hinzufügen
            $("#btnOptionHinzEAnl").click(function(){
                var option = $("#optionEAnl").val();

                tblOptionenEAnl.row.add([option]).draw();

                $("#optionEAnl").val("");
            });
            $("#btnOptionHinzEPrd").click(function(){
                var option = $("#optionEPrd").val();

                tblOptionenEPrd.row.add([option]).draw();

                $("#optionEPrd").val("");
            });
            $("#tblOptionenEAnl tbody").on("dblclick","tr",function(){

                tblOptionenEAnl.row(this).remove().draw();

            });
            $("#tblGruppenDiag tbody").on("dblclick","tr",function(){

                tblGruppenDiag.row(this).remove().draw();

            });
            $("#tblOptionenEPrd tbody").on("dblclick","tr",function(){

                                tblOptionenEPrd.row(this).remove().draw();

                            });
            $(".betrPfad").change(function() {
                                $(".betrPfad").val($(this).val());
                                $("#betrGrpID").val(betrGrpListe[$(".betrPfad").prop("selectedIndex")].betrGrpID);
                                readInstanzen("betrGrpFirst", $(".betrPfad").prop("selectedIndex"));
                                readInstanzen("sAdmFirst", 0);
                                readInstanzen("manGrpFirst", 0);
                                manGrpEinlesen();
                                readInstanzen("admFirst", 0);
                                readInstanzen("benFirst", 0);
                            });
            $(".manGrpPfad").change(function() {
                                $(".manGrpPfad").val($(this).val());

                                var manOderManGrp = $(".manGrpPfad  option").eq($(".manGrpPfad").prop("selectedIndex")).prop("id");
                                var arrManOderManGrp =  manOderManGrp.split("_");


                                $("#manOderManGrp").val(arrManOderManGrp[0]);

                                if (arrManOderManGrp[0] == "optManGrp"){
                                    $("#manGrpID").val(manGrpListe[arrManOderManGrp[1]].manGrpID);
                                    readInstanzen("manGrpFirst", $(".manGrpPfad").prop("selectedIndex"));
                                }
                                else {
                                    var test;

                                    if(manGrpListe.length == mandantenliste.length){
                                        test = $(".manGrpPfad").prop("selectedIndex")
                                    }
                                    else {
                                        test = $(".manGrpPfad").prop("selectedIndex") - manGrpListe.length;
                                    }
                                    $("#manRechteID").val(mandantenliste[test].manID);

                                    for(n = 0; n< mandantenliste.length;n++){

                                    }
                                }

                                readInstanzen("admFirst", 0);
                                readInstanzen("benFirst", 0);
                            });

            //Wenn Auswahlbox Mandant geändert dann sollen alle Auswahlfelder mit dem selben Wert belegt
            //werden
            $(".manPfad").change(function () {
                                $(".manPfad").val($(this).val());
                                $("#manID").val(mandantenliste[$(this).prop("selectedIndex")].manID);
                                readInstanzen("manFirst",null);
                                organisationenEinlesen();
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
                                anlagenGruppenEinlesen();
                                erweiterungenProdukteEinlesen();
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
                                standardVorlagenEinlesen();
                                externeRechnungenListeErstellen("vergleich");

                            });
            $(".orgPfad").change(function () {
                                orgPfadChange(this);
                            });
            $(".liegPfad").change(function () {
                                liegPfadChange(this);
                            });

            //Wenn das hinz Symbold geklickt wird,
            //dann wird ein neuer Block aus einem html template in der je-
            //weiligen div erstellt und ein Record in die Datenbank geschrieben
            //------------------------------------------------------------------------
            $("#gipscAdmHinz, #betrGrpHinz, #sAdmHinz, #manGrpHinz, #admHinz, #benHinz, #manHinz, #orgHinz, #liegHinz, #extDlHinz, #berHinz, #mstHinz, #stdHinz, #stdDrHinz, #anlHinz, #msmHinz, #entHinz, #enfHinz, #eRngHinz, #iMwHinz, #eAnlHinz, #ePrdHinz, #prdHinz, #zpHinz, #knzHinz")
            .click(function () {
                                clearFields(this.id);
                                saveNew = true;
                            });
            $(`#gipscAdmSpeichern, #betrGrpSpeichern, #sAdmSpeichern, #manGrpSpeichern,
                                #admSpeichern, #benSpeichern, #manSpeichern, #orgSpeichern, #liegSpeichern,
                                #extDlSpeichern, #berSpeichern, #benSpeichern, #mstSpeichern, #stdSpeichern,
                                #stdDrSpeichern,  #anlSpeichern, #anlSpeichernHist, #msmSpeichern,
                                #entSpeichern, #enfSpeichern, #eRngSpeichern, #intEngIMwSpeichern,
                                #intBdeIMwSpeichern, #eAnlSpeichern, #zpSpeichern, #ePrdSpeichern,
                                #prdSpeichern, #knzSpeichern, #betrParSpeichern, #grpDiagSpeichern`)
            .click(function () {
                                    //Betreuergruppe speichern
                                    if (this.id == "gipscAdmSpeichern") {
                                        if (saveNew == true) {
                                            instanzErstellen(this.id);
                                            saveNew = false;
                                        }
                                        else if (saveNew == false) {
                                            instanzSpeichern(this.id);
                                        }
                                        else {
                                            $("#meldung").css("display", "block");
                                            $("#meldung").dialog({ title: "Meldung!" });
                                        }
                                    }
                                    //Betreuergruppe speichern
                                    else if (this.id == "betrGrpSpeichern") {
                                        if ($("#firmaBetrGrp").val() != "" && saveNew == true) {
                                            instanzErstellen(this.id);
                                            saveNew = false;
                                        }
                                        else if ($("#firmaBetrGrp").val() != "" && saveNew == false) {
                                            instanzSpeichern(this.id);
                                        }
                                        else {
                                            $("#meldung").css("display", "block");
                                            $("#meldung").dialog({ title: "Meldung!" });
                                        }
                                    }
                                    //Superadmin speichern
                                    else if (this.id == "sAdmSpeichern") {
                                        if ($("#nameSAdm").val() != "" && saveNew == true) {
                                            instanzErstellen(this.id);
                                            saveNew = false;
                                        }
                                        else if ($("#nameSAdm").val() != "" && saveNew == false) {
                                            instanzSpeichern(this.id);
                                        }
                                        else {
                                            $("#meldung").css("display", "block");
                                            $("#meldung").dialog({ title: "Meldung!" });
                                        }
                                    }
                                    //Mandantengruppe speichern
                                    else if (this.id == "manGrpSpeichern") {
                                        if ($("#nameManGrp").val() != "" && saveNew == true) {
                                            instanzErstellen(this.id);
                                            saveNew = false;
                                        }
                                        else if ($("#nameManGrp").val() != "" && saveNew == false) {
                                            instanzSpeichern(this.id);
                                        }
                                        else {
                                            $("#meldung").css("display", "block");
                                            $("#meldung").dialog({ title: "Meldung!" });
                                        }
                                    }
                                    //Admin speichern
                                    else if (this.id == "admSpeichern") {
                                        if ($("#nameAdm").val() != "" && saveNew == true) {
                                            instanzErstellen(this.id);
                                            saveNew = false;
                                        }
                                        else if ($("#nameAdm").val() != "" && saveNew == false) {
                                            instanzSpeichern(this.id);
                                        }
                                        else {
                                            $("#meldung").css("display", "block");
                                            $("#meldung").dialog({ title: "Meldung!" });
                                        }
                                    }
                                    //Benutzer speichern
                                    else if (this.id == "benSpeichern") {
                                        if ($("#nameBen").val() != "" && saveNew == true) {
                                            instanzErstellen(this.id);
                                            saveNew = false;
                                        }
                                        else if ($("#nameBen").val() != "" && saveNew == false) {
                                            instanzSpeichern(this.id);
                                        }
                                        else {
                                            $("#meldung").css("display", "block");
                                            $("#meldung").dialog({ title: "Meldung!" });
                                        }
                                    }
                                    //Mandant speichern
                                    else if (this.id == "manSpeichern") {
                                        if ($("#nameAllgemeinMan").val() != "" && saveNew == true) {
                                            instanzErstellen(this.id);
                                            mandantenEinlesen($("#betrGrpID").val(),"man_ID",$("#manID").val());
                                            $(".manPfad").prop("selectedIndex", mandantenliste.length - 1);
                                            saveNew = false;
                                        }
                                        else if ($("#nameAllgemeinMan").val() != "" && saveNew == false) {
                                            instanzSpeichern(this.id);
                                            $(".manPfad").prop("selectedIndex", manNavID);
                                        }
                                        else {
                                            $("#meldung").css("display", "block");
                                            $("#meldung").dialog({ title: "Meldung!" });
                                        }
                                    }
                                    //Organisation speichern
                                    else if (this.id == "orgSpeichern") {
                                        if ($("#nameAllgemeinOrg").val() != "" && saveNew == true) {
                                            instanzErstellen(this.id);
                                            saveNew = false;
                                        }
                                        else if ($("#nameAllgemeinOrg").val() != "" && saveNew == false) {
                                            instanzSpeichern(this.id);
                                        }
                                        else {
                                            $("#meldung").css("display", "block");
                                            $("#meldung").dialog({ title: "Meldung!" });
                                        }
                                    }
                                    //Liegenschaft speichern
                                    else if (this.id == "liegSpeichern") {
                                        if ($("#nameAllgemeinLieg").val() != "" && saveNew == true) {
                                            instanzErstellen(this.id);
                                            saveNew = false;
                                        }
                                        else if ($("#nameAllgemeinLieg").val() != "" && saveNew == false) {
                                            instanzSpeichern(this.id);
                                        }
                                        else {
                                            $("#meldung").css("display", "block");
                                            $("#meldung").dialog({ title: "Meldung!" });
                                        }
                                    }
                                    //externe Durchleitung speichern
                                    else if (this.id == "extDlSpeichern") {
                                        if ($("#nameExtDl").val() != "" && saveNew == true) {
                                            instanzErstellen(this.id);
                                            saveNew = false;
                                        }
                                        else if ($("#nameExtDl").val() != "" && saveNew == false) {
                                            instanzSpeichern(this.id);
                                        }
                                        else {
                                            $("#meldung").css("display", "block");
                                            $("#meldung").dialog({ title: "Meldung!" });
                                        }
                                    }
                                    //Bereich speichern
                                    else if (this.id == "berSpeichern") {
                                        if ($("#nameAllgemeinBer").val() != "" && saveNew == true) {
                                            instanzErstellen(this.id);
                                            berNavID = $("#berCount").val();
                                            saveNew = false;
                                        }
                                        else if ($("#nameAllgemeinBer").val() != "" && saveNew == false) {
                                            instanzSpeichern(this.id);
                                        }
                                        else {
                                            $("#meldung").css("display", "block");
                                            $("#meldung").dialog({ title: "Meldung!" });
                                        }
                                    }
                                    //Messstelle speichern
                                    else if (this.id == "mstSpeichern") {
                                        if ($("#nameMst").val() != "" && saveNew == true) {
                                            // lastNav.setReturnValues([formula.getFormulaString()]);
                                            instanzErstellen(this.id);
                                            saveNew = false;
                                            // lastNav.jump();
                                        }
                                        else if ($("#nameAllgemeinMst").val() != "" && saveNew == false) {
                                            // lastNav.setReturnValues([formula.getFormulaString()]);
                                            instanzSpeichern(this.id);
                                            // lastNav.jump();
                                        }
                                        else {
                                            $("#meldung").css("display", "block");
                                            $("#meldung").dialog({ title: "Meldung!" });
                                        }
                                    }
                                    //Standort speichern
                                    else if (this.id == "stdSpeichern") {
                                        if ($("#nameStd").val() != "" && saveNew == true) {
                                            instanzErstellen(this.id);
                                            saveNew = false;
                                        }
                                        else if ($("#nameStd").val() != "" && saveNew == false) {
                                            instanzSpeichern(this.id);
                                        }
                                        else {
                                            $("#meldung").css("display", "block");
                                            $("#meldung").dialog({ title: "Meldung!" });
                                        }
                                    }
                                    //Standort speichern
                                    else if (this.id == "stdDrSpeichern") {
                                        if ($("#nameStdDr").val() != "" && saveNew == true) {
                                            instanzErstellen(this.id);
                                            saveNew = false;
                                        }
                                        else if ($("#nameStdDr").val() != "" && saveNew == false) {
                                            instanzSpeichern(this.id);
                                        }
                                        else {
                                            $("#meldung").css("display", "block");
                                            $("#meldung").dialog({ title: "Meldung!" });
                                        }
                                    }
                                    //Anlage speichern
                                    else if (this.id == "anlSpeichern") {
                                        if ($("#nummerAllgemeinAnl").val() != "" && saveNew == true) {
                                            $("#archiviertAnl").val(false);
                                            instanzErstellen(this.id);
                                            saveNew = false;
                                        }
                                        else if ($("#nummerAllgemeinAnl").val() != "" && saveNew == false) {

                                            //Fenster einblenden
                                            $("#historyOrNot").dialog({
                                                height: 400,
                                                width: 450,
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
                                                    $("#histSpeichern").off("click");
                                                    $("#histNichtSpeichern").off("click");
                                                    $("#histOk").off("click");
                                                    $("#histAbbrechen").off("click");

                                                    //Event Listener an Buttons binden
                                                    $("#histSpeichern").on("click", function () {
                                                        $("#infosBemerkungHist, #histOk").css("display","inline");
                                                        $("#histSpeichern, #histNichtSpeichern").css("display","none");
                                                    });
                                                    $("#histNichtSpeichern").on("click", function () {

                                                        $("#archiviertAnl").val("false");
                                                        instanzSpeichern("anlSpeichern");
                                                        $("#historyOrNot").dialog("close");
                                                    });
                                                    $("#histOk").on("click", function(){
                                                        $("#archiviertAnl").val("true");
                                                        instanzSpeichern("anlSpeichern");
                                                        instanzErstellen("anlSpeichern");
                                                        $("#infosBemerkungHist, #histOk").css("display","none");
                                                        $("#infosBemerkungHist input").val("");
                                                        $("#histSpeichern, #histNichtSpeichern").css("display","inline");
                                                        $("#historyOrNot").dialog("close");
                                                    }) ;
                                                    $("#histAbbrechen").on("click",function (){
                                                        $("#infosBemerkungHist, #histOk").css("display","none");
                                                        $("#histSpeichern, #histNichtSpeichern").css("display","inline");
                                                        $("#infosBemerkungHist input").val("");
                                                        $("#historyOrNot").dialog("close");
                                                    });
                                                },
                                                close: function(){
                                                    $("#infosBemerkungHist input").val("");
                                                    $("#infosBemerkungHist, #histOk").css("display","none");
                                                    $("#histSpeichern, #histNichtSpeichern").css("display","inline");
                                                }
                                            });
                                        }
                                        else {
                                            $("#meldung").css("display", "block");
                                            $("#meldung").dialog({ title: "Meldung!" });
                                        }
                                    }
                                    //Anlage speichern
                                    else if (this.id == "anlSpeichernHist") {
                                        if ($("#nummerAllgemeinAnl").val() != "" && saveNew == true) {
                                            $("#archiviertAnl").val(false);
                                            instanzErstellen(this.id);
                                            saveNew = false;
                                        }
                                        else if ($("#nummerAllgemeinAnl").val() != "" && saveNew == false) {
                                            $("#archiviertAnl").val(true);
                                            instanzSpeichern(this.id);
                                        }
                                        else {
                                            $("#meldung").css("display", "block");
                                            $("#meldung").dialog({ title: "Meldung!" });
                                        }
                                    }
                                    //Messmittel speichern
                                    else if (this.id == "msmSpeichern") {
                                        if ($("#messmittelNrAllgemeinMsm").val() != "" && saveNew == true) {
                                            lastNav.setReturnValues([$("#bezeichnungAllgemeinMsm").val()]);
                                            instanzErstellen(this.id);
                                            saveNew = false;
                                            lastNav.jump();
                                        }
                                        else if ($("#messmittelNrAllgemeinMsm").val() != "" && saveNew == false) {
                                            lastNav.setReturnValues([$("#bezeichnungAllgemeinMsm").val()]);
                                            instanzSpeichern(this.id);
                                            lastNav.jump();
                                        }
                                        else {
                                            $("#meldung").css("display", "block");
                                            $("#meldung").dialog({ title: "Meldung!" });
                                        }
                                    }
                                    //Energieträger speichern
                                    else if (this.id == "entSpeichern") {
                                        if ($("#nameEnt").val() != "" && saveNew == true) {

                                            lastNav.setReturnValues([$("#nameEnt").val()]);
                                            instanzErstellen(this.id);
                                            saveNew = false;
                                            energietrInDBoxLieg();
                                            lastNav.jump();
                                        }
                                        else if ($("#nameEnt").val() != "" && saveNew == false) {
                                            lastNav.setReturnValues([$("#nameEnt").val()]);
                                            instanzSpeichern(this.id);
                                            energietrInDBoxLieg();
                                            lastNav.jump();
                                        }
                                        else {
                                            $("#meldung").css("display", "block");
                                            $("#meldung").dialog({ title: "Meldung!" });
                                        }
                                    }
                                    //Energieform speichern
                                    else if (this.id == "enfSpeichern") {
                                        if ($("#nameEnf").val() != "" && saveNew == true) {
                                            instanzErstellen(this.id);
                                            saveNew = false;
                                            energiefrmInDBoxLieg();
                                        }
                                        else if ($("#nameEnf").val() != "" && saveNew == false) {
                                            instanzSpeichern(this.id);
                                            energiefrmInDBoxLieg();
                                        }
                                        else {
                                            $("#meldung").css("display", "block");
                                            $("#meldung").dialog({ title: "Meldung!" });
                                        }
                                    }
                                    //extRechnung speichern
                                    else if (this.id == "eRngSpeichern") {
                                        if ($("#nrERng").val() != "" && saveNew == true) {
                                            instanzErstellen(this.id);
                                            saveNew = false;
                                        }
                                        else if ($("#nrERng").val() != "" && saveNew == false) {
                                            instanzSpeichern(this.id);
                                        }
                                        else {
                                            $("#meldung").css("display", "block");
                                            $("#meldung").dialog({ title: "Meldung!" });
                                        }
                                    }
                                    //intMesswerte speichern
                                    else if (this.id == "intEngIMwSpeichern") {
                                        instanzSpeichern(this.id);
                                    }
                                    else if (this.id == "intBdeIMwSpeichern") {
                                        instanzSpeichern(this.id);
                                    }
                                    //Erweiterungen der Anlagen speichern
                                    else if (this.id == "eAnlSpeichern") {
                                        if (saveNew == true) {
                                            instanzErstellen(this.id);
                                            saveNew = false;
                                        }
                                        else if (saveNew == false) {
                                            instanzSpeichern(this.id);
                                        }
                                        else {
                                            $("#meldung").css("display", "block");
                                            $("#meldung").dialog({ title: "Meldung!" });
                                        }
                                    }
                                    else if (this.id == "ePrdSpeichern") {
                                        if (saveNew == true) {
                                            instanzErstellen(this.id);
                                            saveNew = false;
                                        }
                                        else if (saveNew == false) {
                                            instanzSpeichern(this.id);
                                        }
                                        else {
                                            $("#meldung").css("display", "block");
                                            $("#meldung").dialog({ title: "Meldung!" });
                                        }
                                    }
                                    else if (this.id == "grpDiagSpeichern") {
                                        if (saveNew == true) {
                                            instanzErstellen(this.id);
                                            saveNew = false;
                                        }
                                        else if (saveNew == false) {
                                            instanzSpeichern(this.id);
                                        }
                                        else {
                                            $("#meldung").css("display", "block");
                                            $("#meldung").dialog({ title: "Meldung!" });
                                        }
                                    }
                                    else if (this.id == "prdSpeichern") {
                                        if (saveNew == true) {
                                            $("#archiviertPrd").val(false);
                                            instanzErstellen(this.id, "neueGrp");
                                            saveNew = false;
                                        }
                                        else if (saveNew == false) {

                                            //Fenster einblenden
                                            $("#historyOrNot").dialog({
                                                height: 400,
                                                width: 450,
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
                                                    $(`#histSpeichern,
                                                        #histNichtSpeichern,
                                                        #histOk,
                                                        #histAbbrechen`).off("click");

                                                        //Event Listener an Buttons binden
                                                        $("#histSpeichern").on("click", function () {
                                                            $("#infosBemerkungHist, #histOk").css("display","inline");
                                                            $("#histSpeichern, #histNichtSpeichern").css("display","none");
                                                        });
                                                        $("#histNichtSpeichern").on("click", function () {
                                                            $("#archiviertPrd").val("false");
                                                            instanzSpeichern("prdSpeichern");
                                                            $("#historyOrNot").dialog("close");
                                                        });
                                                        $("#histOk").on("click", function(){
                                                            $("#archiviertPrd").val("true");
                                                            instanzSpeichern("prdSpeichern");
                                                            instanzErstellen("prdSpeichern");
                                                            $("#infosBemerkungHist, #histOk").css("display","none");
                                                            $("#infosBemerkungHist input").val("");
                                                            $("#histSpeichern, #histNichtSpeichern").css("display","inline");
                                                            $("#historyOrNot").dialog("close");
                                                        }) ;
                                                        $("#histAbbrechen").on("click",function (){
                                                            $("#infosBemerkungHist, #histOk").css("display","none");
                                                            $("#histSpeichern, #histNichtSpeichern").css("display","inline");
                                                            $("#infosBemerkungHist input").val("");
                                                            $("#historyOrNot").dialog("close");
                                                        });
                                                    },
                                                    close: function(){
                                                        $("#infosBemerkungHist input").val("");
                                                        $("#infosBemerkungHist, #histOk").css("display","none");
                                                        $("#histSpeichern, #histNichtSpeichern").css("display","inline");
                                                    }
                                                });
                                            }
                                            else {
                                                $("#meldung").css("display", "block");
                                                $("#meldung").dialog({ title: "Meldung!" });
                                            }
                                        }
                                        else if (this.id == "knzSpeichern") {
                                            if (saveNew == true) {
                                                instanzErstellen(this.id);
                                                saveNew = false;
                                            }
                                            else if (saveNew == false) {
                                                instanzSpeichern(this.id);
                                            }
                                            else {
                                                $("#meldung").css("display", "block");
                                                $("#meldung").dialog({ title: "Meldung!" });
                                            }
                                        }
                                        //Zählpunkte speichern
                                        else if (this.id == "zpSpeichern") {
                                            if (saveNew == true) {
                                                instanzErstellen(this.id);
                                                saveNew = false;
                                            }
                                            else if (saveNew == false) {
                                                instanzSpeichern(this.id);
                                            }
                                            else {
                                                $("#meldung").css("display", "block");
                                                $("#meldung").dialog({ title: "Meldung!" });
                                            }
                                        }
                                        else if (this.id == "betrParSpeichern") {
                                            if (saveNew == true) {
                                                instanzErstellen(this.id);
                                                saveNew = false;
                                            }
                                            else if (saveNew == false) {
                                                alert (
                                                    "Um die Gültigkeit bereits erstellter Formeln zu garantieren,\n" +
                                                    "ist der 'Ändern-Modus' hier deaktiviert!"
                                                ) ;
                                            }
                                            else {
                                                $("#meldung").css("display", "block");
                                                $("#meldung").dialog({ title: "Meldung!" });
                                            }
                                        }
                                    });
                var loeschenString = "#orgLoeschen, #liegLoeschen, #extDlLoeschen, #berLoeschen,";
                loeschenString += "#mstLoeschen, #stdLoeschen, #stdDrLoeschen, #anlLoeschen,";
                loeschenString += "#msmLoeschen, #eRngLoeschen, #zpLoeschen, #eAnlLoeschen";

                $(loeschenString).click(function () {
                    fensterLoeschenmeldung(this.id);
                });
            });
