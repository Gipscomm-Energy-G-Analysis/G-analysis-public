var rowResult =[];
var rowCalculator = [];
//var inputCountValArr = [];
var arrStoreDates = [];
var anlageObj={};
var allPrevVal = [];
$(document).ready(function() {
    var c = this;

    scpRechteverwaltung
    .actionUserPosition(sessionStorage.getItem("position"))

    scpUnternehmensstruktur_mandanten
    .populateIndexedDB()

    betrGrpEinlesen();
    manGrpEinlesen();
    anlagenGruppenEinlesen();
    erweiterungenProdukteEinlesen();
    organisationenEinlesen();
    $(".currentYear").val(getCurrentYear);
    $(".lastYear").val(decr(getCurrentYear));
    $("#liegRngVergleich").trigger("change");
    $("#logout").click(function() {
        sessionStorage.clear();
        localStorage.removeItem('gipsAdm');
        $.ajax({
            type: "POST",
            async: !0,
            url: "php/logout.php",
            data: {},
            success: function() {
                window.open("index.html", "_self")
            }
        })
    });
    $("input, select").focus(function() {
        "" != this.id && null != this.id && "undefined" != this.id && (changeTracker.setChange(TrackValue.LABEL, $("label[for=" + this.id + "]").text()), changeTracker.setChange(TrackValue.FIELD_ID, this.id), changeTracker.setChange(TrackValue.OLD_VALUE, this.value))
    });
    $("input, select").change(function() {
        changeTracker.setChange(TrackValue.NEW_VALUE, this.value);
        changeTracker.setChanges()
    });
    $("#anlVersch").click(function() {
        $("#anlageVerschieben").dialog({
            height: 240,
            width: 320
        });
        changePath.setInstanceInfo(Instance.ANLAGE, $("#anlID").val())
    });
    $("#verschSpeichern").click(function() {
        changePath.setLiegenschaftsID($("#liegID").val());
        anlageVerschieben();
        $("#anlageVerschieben").dialog("close")
    });
    $("#verschAbbrechen").click(function() {
        $("#anlageVerschieben").dialog("close")
    });
    $("#inputEntERng, #inputEnergietraeger1Lieg, #inputEnergietraeger2Lieg, #inputEnergietraeger2Lieg, #inputEnergietraeger2Lieg, #inputEnergietraeger3Lieg, #inputEnergietraeger4Lieg, #inputEnergietraeger5Lieg, #inputEnergietraeger6Lieg, #inputEnergietraeger7Lieg, #inputEnergietraeger8Lieg, #inputEnergietraeger9Lieg, #energieform1Lieg, #energieform2Lieg, #energieform3Lieg, #energieform4Lieg, #energieform5Lieg, #energieform6Lieg, #energieform7Lieg, #energieform1AllgemeinAnl, #energieform2AllgemeinAnl, #energieform3AllgemeinAnl, #energieform4AllgemeinAnl").click(function() {
        $(this).val("")
    });
    $("#mapDrucken").click(function() {
        mapDrucken($("#treeGraph"))
    });
    $(".imgBtnAnlagePrd").click(function() {
        anlagenAuswahllisteErstellen(this.id)
    });
    $(".btnFormelSymbol").click(function() {
        var txt = $(this).text();
        if(txt == "AC"){
            $("#formelStringDarstellung, #formelIdDarstellung").val("");
            formula.resetFormula();
        }
        else if (txt == "CE") {

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
        else {
            if(txt == 0 || txt == 1 || txt == 2 || txt == 3 || txt == 4 ||
                txt == 5 || txt == 6 || txt == 7 || txt == 8 || txt == 9) {
                    if(validInputNumber($("#formelIdDarstellung").val())) {
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
                    else {
                        alert("Bitte fügen Sie einen Operator (+-*/) oder eine oder mehrere öffnende Klammern vor dem Einfügen einer Zahl ein.")
                        return
                    }
            }
            if(txt != "( " && txt != " )"){
                if(txt == " + " || txt == " - " || txt == " * " || txt == " / "){
                    if(validInputOperator($("#formelIdDarstellung").val())) {
                        formula.setElement(txt, null, null, null, null)
                    }
                    else {
                        alert("Es können keine Operatoren als erstes Element oder hintereinander eingefügt werden.")
                        return
                    }
                }
            }
            else if(txt === "( ") {
                if(validInputOpeningParentheses($("#formelIdDarstellung").val())) {
                    if($("#formelIdDarstellung").val() == ""){
                        formula.setFirstElement(LocationParentheses.NONE, 0, OperandType.NUMERIC_OPERAND, operand);
                    } else {
                        var nParentheses = formula.formula[formula.formula.length - 1].parentheses.number + 1;
                        formula.alterElementProperty(formula.formula.length - 1, FormulaProperty.PARENTHESES, {
                            location: LocationParentheses.BEGINNING,
                            number: nParentheses
                        });
                    }
                }
                else {
                    alert("Eine öffnende Klammer, darf nur nach einem Operator oder einer anderen öffnenden Klammer eingefügt werden.")
                    return
                }
            }
            else if(txt === " )") {
                if(validInputClosingParentheses($("#formelIdDarstellung").val())) {
                    var nParentheses = formula.formula[formula.formula.length - 1].parentheses.number + 1;
                    formula.alterElementProperty(formula.formula.length - 1, FormulaProperty.PARENTHESES, {
                    location: LocationParentheses.END,
                    number: nParentheses
                });
                }
                else {
                    alert("Eine schließende Klammer muss eine zugehörige öffnende Klammer aufweisen und darf nur nach einer Instanz, einer Zahl oder einer anderen schließenden Klammer eingefügt werden.")
                    return
                }
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
        }
    });
    $("#formelSpeichern").click(function() {
        if(readyToSave($("#formelIdDarstellung").val())) {
            if ($("#bermstmod").val() === "Virtuelle Messstelle") {
                virtMessstelleSaveDialog()
            }
            else {
                saveFormula()
            }
        }
        else {
            alert("Dies ist keine gültige Formel. Nur wenn alle Klammern geschlossen sind und das letzte Element entweder eine schließende Klammer, eine Zahl oder eine Instanz ist, ist die Formel gültig.")
        }
    });
    $("#formelVorSpeichern").click(function() {
        var a = $("#inpBezeichnungVorFrm").val(),
            e = $("#formelVorStringDarstellung").val(),
            b = $("#notizVorlFrm").val();
        writeVorlFormulaToDB(a, btoa(e), b)
    });
    var k = document.getElementById("formelLatexDarstellung"),
        d = MathQuill.getInterface(2).MathField(k, {
            spaceBehavesLikeTab: !0
        });
    tblMessstellenBerechnungseditor.on("draw", function() {
        $("#tblMessstellenBerechnungseditor tr").css("cursor", "pointer");
        $("#tblMessstellenBerechnungseditor tr").draggable({
            helper: "clone",
            start: function(a, e) {
                var b = $(this).find("td") ;
                    c = "mst_" + b.prev().text(),
                    b = b.text();
                contents = [c, b]
            }
        })
    });
    tblAnlagenBerechnungseditor.on("draw", function() {
        $("#tbAnlagennBerechnungseditor tr").css("cursor", "pointer");
        $("#tblAnlagenBerechnungseditor tr").draggable({
            helper: "clone",
            start: function(a, e) {
                var b = $(this).find("td"),
                    c = "anl_" + b.prev().text(),
                    b = b.text();
                contents = [c, b]
            }
        })
    });
    tblInterneMesswerteBerechnungseditor.on("draw", function() {
        $("#tblInterneMesswerteBerechnungseditor tr").css("cursor", "pointer");
        $("#tblInterneMesswerteBerechnungseditor tr").draggable({
            helper: "clone",
            start: function(a, e) {
                var b = $(this).find("td"),
                    c = "staprod_" + b.prev().text(),
                    b = b.text();
                contents = [c, b]
            }
        })
    });
    tblBdeDynBerechnungseditor.on("draw", function() {
        $("#tblBdeDynBerechnungseditor tr").css("cursor",
            "pointer");
        $("#tblBdeDynBerechnungseditor tr").draggable({
            helper: "clone",
            start: function(a, e) {
                var b = $(this).find("td"),
                    c = "bdeprod_" + b.prev().text(),
                    b = b.text();
                contents = [c, b]
            }
        })
    });
    var f = "";
    tblEinheitenKnzs.on("draw", function() {
        $("#tblEinheitenKnzs tr").css("cursor", "pointer");
        $("#tblEinheitenKnzs tr").draggable({
            helper: "clone",
            start: function(a, e) {
                f = "kWh / " + $(this).find("td").text()
            }
        })
    });

    tblProdukte.on("draw", function() {
        $("#tblProdukte tr").css("cursor", "pointer");
        $("#tblProdukte tr").draggable({
            helper: "clone",
            start: function(a, e) {
                var b = $(this).find("td"),
                    c = "eprd_" + b.prev().text(),
                    b = b.text();
                contents = [c, b]
            }
        })
    });
    /*Create Drag drop functionality for Correction factor 13-02-2020*/
    tblKorrekturfaktor.on("draw", function() {
        $("#tblKorrekturfaktor tr").css("cursor", "pointer");
        $("#tblKorrekturfaktor tr").draggable({
            helper: "clone",
            start: function(a, e) {
                var b = $(this).find("td"),
                    c = "eprdkfe_" + b.prev().text(),
                    b = b.text();
                contents = [c, b]
            }
        })
    });
    /*Create Drag drop functionality for Correction factor 13-02-2020*/

    $(".vorlFrmPlatzhalter").draggable({
        helper: "clone",
        start: function(a, b) {
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
                    cont = "[prd_par_RohInp]"
            }
        }
    });
    $("#formelVorStringDarstellung").droppable({
        tolerance: "touch",
        drop: function() {
            var a = $(this);
            a.val(a.val() + " " + cont)
        }
    });
    $("#einheitKennzahldetail1Knz").droppable({
        tolerance: "touch",
        drop: function() {
            $(this).val("" + f)
        }
    });
    $("#einheitKennzahldetail2Knz").droppable({
        tolerance: "touch",
        drop: function() {
            $(this).val("" + f)
        }
    });
    $("#einheitKennzahldetail3Knz").droppable({
        tolerance: "touch",
        drop: function() {
            $(this).val("" + f)
        }
    });
    $("#einheitKennzahldetail4Knz").droppable({
        tolerance: "touch",
        drop: function() {
            $(this).val("" + f)
        }
    });
    $("#einheitKennzahldetail5Knz").droppable({
        tolerance: "touch",
        drop: function() {
            $(this).val("" +
                f)
        }
    });
    $("#einheitKennzahldetail6Knz").droppable({
        tolerance: "touch",
        drop: function() {
            $(this).val("" + f)
        }
    });
    $("#einheitKennzahldetail7Knz").droppable({
        tolerance: "touch",
        drop: function() {
            $(this).val("" + f)
        }
    });
    $("#einheitKennzahldetail8Knz").droppable({
        tolerance: "touch",
        drop: function() {
            $(this).val("" + f)
        }
    });
    $("#einheitKennzahldetail9Knz").droppable({
        tolerance: "touch",
        drop: function() {
            $(this).val("" + f)
        }
    });
    $("#einheitKennzahldetail10Knz").droppable({
        tolerance: "touch",
        drop: function() {
            $(this).val("" + f)
        }
    });
    /*27-02-2020 Hide this , switch off die Time interval
      30.06.2020 Refactored, reintroduced var names and deleted everything
      related to the time interval
      01.07.2020 Separated formelStringDarstellung and berechneteMstName events*/
    $("#formelStringDarstellung").droppable({
        tolerance: "touch",
        drop: function() {

            let drpField = this.id,
            idDrag = contents[0].split(" ")[0],
            nameDrag = contents[0].split(" ")[1];

            switch ($("#bermstmod").val()) {
                case "Virtuelle Messstelle":
                    switch (validDropMessstelle($("#berechneteMstID").val())(idDrag)($("#formelIdDarstellung").val())) {
                        case "REFERENCE":
                            alert("Die zu berechnende Messstelle wurde noch nicht ausgewählt.")
                            break;
                        case "SELF":
                            alert("Die zu berechnende Messstelle darf nicht in ihrer eigenen Berechnung vorkommen.")
                            break;
                        case "ORDER":
                            alert("Bitte fügen Sie einen Operator (+-*/) oder eine oder mehrere öffnende Klammern vor dem Droppen einer weiteren Messstelle ein.")
                            break;
                        case "VALID":
                            formelerweiterungNachDrop(drpField, idDrag, nameDrag, false);
                            break;
                    }
                    break;
                case "Kennzahl":
                    validDropUnit($("#formelIdDarstellung").val()) ?
                    formelerweiterungNachDrop(drpField, idDrag, nameDrag, false) :
                    alert("Bitte fügen Sie einen Operator (+-*/) oder eine oder mehrere öffnende Klammern vor dem Droppen einer weiteren Instanz ein.")
                    break;
            }
        }
    });
    $("#berechneteMstName").droppable({
        tolerance: "touch",
        drop: function() {

            let drpField = this.id,
            idDrag = contents[0].split(" ")[0],
            nameDrag = contents[0].split(" ")[1];

            isMessstelle(idDrag) ?
            formelerweiterungNachDrop(drpField, idDrag, nameDrag, false) :
            alert("Hier gehört die zu berechnende Messstelle hin !")
        }
    });
    /*27-02-2020 Hide this function, switch off die Time interval*/
    $("#btnPrdOeffnen").click(function() {
        mainMenuNav("prdMenu")
    });
    $.fn.dataTableExt.sErrMode = "throw";
    $(window).resize(function() {
        menuUndMainZentrieren()
    });
    menuUndMainZentrieren();
    $(".sub-menu").menu();
    $(".datePicker").datepicker({
        monthNames: "Januar Februar M\u00e4rz April Mai Juni Juli August September Oktober November Dezember".split(" "),
        dayNamesMin: "So Mo Di Mi Do Fr Sa".split(" "),
        dateFormat: "dd.mm.yy",
        changeYear: !0
    });
    var g, h, b = !1;
    betrParNavID = knzInsNavID = knzNavID = prdNavID = ePrdNavID = eAnlNavID = zpNavID = iMwNavID = eRngNavID = enfNavID = entNavID = anlNavID = msmNavID = stdDrNavID = stdNavID = mstENavID = mstBNavID = berNavID = extDlNavID = liegNavID = orgNavID = manNavID = benNavID = admNavID = manGrpNavID = gipscAdmNavID = sAdmNavID = betrGrpNavID = 0;
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
    var m = !1;
    $("#kostenERng, #tagstromVerbrERng, #tagstromKostERng, #nachtstromVerbrERng, #nachtstromKostERng, #lastspitzeERng,#leistungspreisERng, #abpWirkERng, #abpNetzERng, #strSteuERng, #blindstromERng, #konzERng, #eegERng, #eegUntERng,#eegUebERng, #kwkUntERng, #nevUntERng, #offUntERng, #kwkObERng, #nevObERng, #offObERng, #custom1ERng, #custom2ERng,#custom3ERng, #custom4ERng, #custom5ERng, #custom6ERng, #mengeERng").blur(function() {
        m ?
        $.isNumeric(formatNumber("deform", this.value))
        && (isValid = !0, $("#mitUntERng").is(":checked")
        && $(this).css("background-color", "#4AB872"), m = !1) :
        "" !== this.value && ($.isNumeric(formatNumber("deform", this.value)) ?
        ($("#mitUntERng").is(":checked") && $(this).css("background-color", "#4AB872"), m = !1) :
        ($("#mitUntERng").is(":checked") && $(this).css("background-color", "#DB504A"),
        alert("Das Format des eingegebenen Wertes ist inkorrekt!\nEin Beispiel wie es aussehen sollte: 120233,12 oder 120.233,12"),
        $(this).select(), m = !0))
    });
    $("#mitUntERng").click(function() {
        var a = !$(c).is(":checked");
        (function() {
            a ? $(".standRng, .evuRng, .bafaRng").css("background-color", "white") : function() {}
        })()
    });
    $("#typDiag").change(function() {
        "line" == this.value ? ($("#exampleLineChart").css("display", "block"), $("#exampleColumnChart").css("display", "none")) : ($("#exampleLineChart").css("display", "none"), $("#exampleColumnChart").css("display", "block"))
    });
    $("#zeitrDiag").change(function() {
        "Benutzerdefiniert" === this.value ? $("#btnZeitrmDiag").text("Benutzerdefinierter Zeitraum") : $("#btnZeitrmDiag").text("Allgemeiner Zeitraum");
        $("#btnZeitrmDiag").trigger("click");
        "Jahr" === this.value ?
            ($("#diagMonatDiv, #diagTagDiv").css("display", "none"), $("#diagMonat, #diagTag").prop("selectedIndex", 0)) : "Monat" === this.value || "Monat 15min" === this.value ? ($("#diagMonatDiv").css("display", "inline-block"), $("#diagTagDiv").css("display", "none"), $("#diagTag").prop("selectedIndex", 0)) : "Tag" !== this.value && "Tag 15min" !== this.value || $("#diagMonatDiv, #diagTagDiv").css("display", "inline-block")
    });
    $("#btnZeitrmDiag").click(function() {
        "Benutzerdefinierter Zeitraum" == $("#btnZeitrmDiag").text() ? ($(".allgZeitrDiag").css("display",
            "none"), $(".benutzerdefZeitrDiag").css("display", "inline-block"), $("#btnZeitrmDiag").text("Allgemeiner Zeitraum")) : ($(".allgZeitrDiag").css("display", "inline-block"), $(".benutzerdefZeitrDiag").css("display", "none"), $("#btnZeitrmDiag").text("Benutzerdefinierter Zeitraum"))
    });
    $("#prdAuswahlZugDynPrdID").click(function() {
        tabellenAuswahllisteErstellen()
    });
    $(".not-empty").change(function(a) {
        emptyString(a.value) && (alert("Dieses Feld darf nicht leer gelassen werden!"), a.focus())
    });
    $("#btnPlusAnlsPrd").click(function() {
        anlagenfelderHinzufuegenProdukteverwaltung()
    });
    $("#btnMstResetDiag").click(function() {
        $("#mstDiag1, #mstDiag2, #mstDiag3,#mstIDDiag1, #mstIDDiag2, #mstIDDiag3").val("")
    });
    $("#btnKnzResetDiag").click(function() {
        $("#knzDiag1, #knzDiag2, #knzDiag3,#knzIDDiag1, #knzIDDiag2, #knzIDDiag3").val("")
    });
    $("#zeitrDiag2").change(function() {
        switch (this.value) {
            case "Jahr":
                $(".monatZeitvergl, .tagZeitvergl").css("display", "none");
                $(".monatZeitvergl, .tagZeitvergl").val("-");
                break;
            case "Monat":
                $(".monatZeitvergl").css("display", "inline-block");
                $(".tagZeitvergl").css("display",
                    "none");
                $(".tagZeitvergl").val("-");
                break;
            case "Tag":
                $(".monatZeitvergl, .tagZeitvergl").css("display", "inline-block");
                break;
            default:
                alert("$('#zeitrDiag2').change(): No valid time-interval was passed!")
        }
    });
    $("#imgUploadAnl, #imgUploadMsm, #dokuAuswahlAnl, #dokuAuswahlMsm, #dokuAuswahlERng").on("change", dokumentAuswaehlenUndEinlesen);
    $("#dokuDownAnl, #dokuDownMsm, #dokuDownERng").on("click",
        () =>
        [ "Anl"
        , "Msm"
        , "ERng"
        ].forEach(createDocumentList)
    )
    $("#tblDokumenteAnl tbody, #tblDokumenteMsm tbody").on("dblclick", "tr", function() {
        var a;
        a = tblDokumente.row(this).data();
        $("#dokID").val(a[0]);
        $("#downloadLink").prop("href", "uploadsDownloads/docs/" + $("#nameDB") + " " + a[1]);
        dokumentAuswaehlenUndAuslesen(a[1])
    });
    $("#messmittelBerechnungslogikMst").change(function() {});
    $("#messstelleAllgemeinMsm").change(function() {
        sync.setCurrentLocation(CurrentLocation.MESSMITTELVERWALTUNG);
        sync.setNameMessmittel($("#messmittelNrAllgemeinMsm").val());
        sync.synchronize()
    });
    $("#btnDokLoeschen").click(function() {
        $("#dokDlOderLoeschenContainer").dialog("close");
        dokumenteLoeschen(1, $("#dokID").val())
    });

    /*mm-comment 30-03-2021*/
    /*$("#btnMassEingMst, #btnMassEingAnl").click(function() {
        $("#infosMasseneingabe").css("display", "block");
        $("#infosIntEnergiedaten, #infosIntBetriebsdaten").css("display", "none")
    });*/
    /*mm-comment 30-03-2021*/

    /*new-mm-start 30-03-2021*/
    $("#btnMassEingAnl").click(function() {
        $("#infosMasseneingabe").css("display", "block");
        $("#infosIntBetriebsdaten").css("display", "none");

        $("body").addClass('fullWidthMasseneingabe');
        datePickerForInterneBetriebsdaten('infosMasseneingabeDateRangeDiv',4);
        $("#tblMasseneingabeDataIMw").remove();
    });
    /*new-mm-end 30-03-2021*/
    /*new-mm-start 30-03-2021*/
    $("#btnMassEingPrdkt, #btnMassEingMesssetelle").click(function() {

        if("btnMassEingPrdkt" == this.id){
            $("#infosMasseneingabePrdkt").css("display", "block");
            $("body").addClass('fullWidthMasseneingabe');
            /*new-mm-start 06-04-2021*/
            $('.infosMasseneingabeInside button').removeClass('active');
            $('#btnTageMasseneingabeIMwNwPrdkt').addClass('active');
            /*new-mm-end 06-04-2021*/
            /*new-mm-start 01-04-2021*/
            btnMasseneingabeIMwChangePrdkt(1,'infosMasseneingabeDateRangeDivPrdkt',6);
            /*new-mm-end 01-04-2021*/
            datePickerForInterneBetriebsdatenAnlPrdkt('infosMasseneingabeDateRangeDivPrdkt',6);
            $("#tblMasseneingabeDataIMw").remove();
        }
        else if("btnMassEingMesssetelle" == this.id){
            $("#infosMasseneingabeMesssetelle").css("display", "block");
            $("body").addClass('fullWidthMasseneingabe');
            /*new-mm-start 06-04-2021*/
            $('.infosMasseneingabeInside button').removeClass('active');
            $('#btnTageMasseneingabeIMwNwMesssetelle').addClass('active');
            /*new-mm-end 06-04-2021*/
            /*new-mm-start 01-04-2021*/
            btnMasseneingabeIMwChange(1,'infosMasseneingabeDateRangeDivMesssetelle',5);
            /*new-mm-end 01-04-2021*/
            datePickerForInterneBetriebsdaten('infosMasseneingabeDateRangeDivMesssetelle',5);
            $("#tblMasseneingabeDataIMw").remove();
        }
        else{
            $("#infosMasseneingabePrdkt").css("display", "block");
            $("body").addClass('fullWidthMasseneingabe');
            /*new-mm-start 01-04-2021*/
            btnMasseneingabeIMwChangePrdkt(1,'infosMasseneingabeDateRangeDivPrdkt',6);
            /*new-mm-end 01-04-2021*/
            datePickerForInterneBetriebsdatenAnlPrdkt('infosMasseneingabeDateRangeDivPrdkt',6);
            $("#tblMasseneingabeDataIMw").remove();
        }
        $("#infosIntEnergiedaten").css("display", "none");
    });
    /*new-mm-end 30-03-2021*/

    $("#btnKonfigMstAnl").click(function() {
        $("#infosMasseneingabe").css("display", "none");
        "intEngIMw" == $("#activeInstance").val() ? $("#infosIntEnergiedaten").css("display", "block") : $("#infosIntBetriebsdaten").css("display", "block")

        $("body").removeClass('fullWidthMasseneingabe');
        $("#tblMasseneingabeDataIMw").remove();
        /*new-mm-start 08-04-2021*/
        $('.infosMasseneingabeDateRangeDiv input').datepicker('destroy');
        $('.infosMasseneingabeDateRangeDiv input').datepicker('setDate', null);
        resetInputsSearchMasseneingabe();
        /*new-mm-end 08-04-2021*/
    });

    /*new-mm-start 30-03-2021*/
    $("#btnKonfigPrdkt").click(function() {
        $("#infosMasseneingabePrdkt").css("display", "none");
        "intEngIMw" == $("#activeInstance").val() ? $("#infosIntEnergiedaten").css("display", "block") : $("#infosIntBetriebsdaten").css("display", "block")

        $("body").removeClass('fullWidthMasseneingabe');
        $("#tblMasseneingabeDataIMw").remove();
        /*new-mm-start 08-04-2021*/
        $('.infosMasseneingabeDateRangeDivPrdkt input').datepicker('destroy');
        $('.infosMasseneingabeDateRangeDivPrdkt input').datepicker('setDate', null);
        resetInputsSearchMasseneingabe();
        /*new-mm-end 08-04-2021*/
    });
    $("#btnKonfigMesssetelle").click(function() {
        $("#infosMasseneingabeMesssetelle").css("display", "none");
        "intEngIMw" == $("#activeInstance").val() ? $("#infosIntEnergiedaten").css("display", "block") : $("#infosIntBetriebsdaten").css("display", "block")

        $("body").removeClass('fullWidthMasseneingabe');
        $("#tblMasseneingabeDataIMw").remove();
        /*new-mm-start 08-04-2021*/
        $('.infosMasseneingabeDateRangeDivMesssetelle input').datepicker('destroy');
        $('.infosMasseneingabeDateRangeDivMesssetelle input').datepicker('setDate', null);
        resetInputsSearchMasseneingabe();
        /*new-mm-end 08-04-2021*/

    });
    /*new-mm-end 30-03-2021*/
    $("#btnVerbrauchsdatenExport").click(function() {
        verbrauchsdatenExportieren()
    });
    $("#spzKnzSuchen").click(function() {
        spezielleKennzahlenlisteErstellen()
    });
    $("#btnWeitereKnzHinz").click(function() {
        addKennzahl()
        activateNewKnzTab()
    });
    $("#insSuchenKnz").click(function() {
        instanzAuswahllisteErstellen($("#bezugAllgemeinKnz").val())
    });
    $("#bezugAllgemeinKnz").change(function() {
        $("#instanzAllgemeinKnz").val("");
        "prd" === this.value ? $(".customParPrd").css("display", "block") : ($(".customParPrd,.customParDiv").css("display", "none"), $("#btnProdAnzeigenKnz").text("Produktparameter einblenden"))
    });
    $("#btnProdAnzeigenKnz").click(function() {
        "Produktparameter einblenden" === $(this).text() ? ($(".customParDiv").css("display", "block"), $(this).text("Produktparameter ausblenden")) : ($(".customParDiv").css("display", "none"), $(this).text("Produktparameter einblenden"))
    });
    $(document).on("input", ".bezeichnungKnz", function() {

        $(".knzForms").eq(decr(extractNumber(this.id))).text(this.value)
    });
    $(".btnVorlFormeln").click(function() {
        $("#nrKnz").val(extractNumber(this.id));
        vorlagenformelAuswahllisteErstellen()
    });
    $("#btnGespDiag").click(function() {
        gespeicherteDiagrammeAuswahllisteErstellen()
    });
    $(".btnNeueFormelKnz").click(function() {
        mainMenuNav("menuBerechnungsformeln")
    });
    $("#btnFrmAusVorlAbbr").click(function() {
        $("#vorlFrmZuordnenContainer").dialog("close")
    });
    $("#btnFrmAusVorlOk").click(function() {
        var a =
            $("#lblGewVorlagenformel").text(),
            b = function() {
                for (var a = $("#vorlFrmFuellen div .vorlString").length, b = [], e = [], c = 0; c < a; c++) b.push($("#vorlFrmFuellen div .vorlString").eq(c).val()), e.push($("#vorlFrmFuellen div .vorlID").eq(c).val());
                return {
                    string: b,
                    Id: e
                }
            }(),
            a = filterOperatoren(a),
            c = altFuse(b.string)(a).join(" "),
            b = altFuse(b.Id)(a).join(" "),
            a = {
                modus: "Kennzahl",
                berechneteMstID: void 0,
                bezug: $("#bezugAllgemeinKnz").val(),
                formelString: btoa(c),
                idString: btoa(b)
            };
        switch ($("#activeInstance").val()) {
            case "knz":
                writeFormulaToDB(a).then(function() {
                    $("#vorlFrmZuordnenContainer").dialog("close");
                    var a = $("#nrKnz").val();
                    $("#formel" + a + "Knz").val(c);
                    getLastID("frm").then(function(b) {
                        $("#formel" + a + "IDKnz").val(b)
                    })
                });
                break;
            case "berFrmEditor":
                $("#vorlFrmZuordnenContainer").dialog("close");
                $("#formelStringDarstellung").val(c);
                $("#formelIdDarstellung").val(b);
                break;
            default:
                alert("$('#btnFrmAusVorlOk').click(): \nNo valid 'activeInstance' was passed!")
        }
    });
    $("#tblSuchenEPrd").click(function() {
        tabellenAuswahllisteErstellen(this.id)
    });
    $("#chkSpalteEPrd").on("click", function() {
        $(this).is(":checked") ?
            $(".chkBetriebsparameter").prop("checked", !0) : $(".chkBetriebsparameter").prop("checked", !1)
    });
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
            case "messmittelBerechnungslogikMstE":
                $("#messmittelIDMstE, #berechnungslogikMstE").val("");
                break;
            case "messmittelBerechnungslogikMstB":
                $("#messmittelIDMstB, #berechnungslogikMstB").val("");
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
                $("#berechneteMstID").val("")
        }
        this.value = ""
    });
    $(".manPfadEnt").css("display", "inline");
    $("#modus").change(function() {
        "Global" == $(this).val() ? $(".manPfadEnt").css("display", "none") :
            $(".manPfadEnt").css("display", "inline")
    });
    $(".manPfadEnt select").change(checkboxenDerEntEnfEinlesen($("#entManZuordnung")));
    $("#manOrManGrp").change(function() {
        toggleMandantOderMandantengruppe($(this).val())
    });
    $("#manZuManGrpHinz").click(function() {
        mandantenAuswahllisteErstellen()
    });
    $("#tagstromERng, #nachtstromERng").change(function() {
        var a = $("#tagstromERng").val(),
            b = $("#nachtstromERng").val(),
            a = parseFloat(a) + parseFloat(b);
        $("#kostenERng").val(formatNumber("form", a));
        $("#kostenERng").trigger("change")
    });
    $("#kostenERng, #mwstPercentERng, #kostenMitMwstERng").change(function() {
        -1 != $("#kostenERng").val().indexOf(",") && $("#kostenERng").val(formatNumber("deform", $("#kostenERng").val()));
        $("#liegRngVergleich").change(function() {
            externeRechnungenListeErstellen("vergleich")
        });

        setCostRng(this.id)
    });
    $("#btnSpaEfVTbl1Erstellen, #btnSpaEfVTbl2Erstellen").click(function() {
        var a =
            getModusSpaEfV(this.name),
            b = getVersionSpaEfV(this.name),
            c = getVerdichtungSpaEfV(this.name);
        if ("btnSpaEfVTbl1Erstellen" == this.id) {
            var d = getModusDarzustellendeJahreSpaEfV1(),
                d = getJahresstringBenutzerdefSpaEfV1(b, d);
            "basis" == b && (c = "verdichtet");
            SpaEfVTbl1Erstellen(a, b, c, d)
        } else "btnSpaEfVTbl2Erstellen" == this.id && (d = new Date, "basis" == b && (c = "verdichtet1", jahr = d.getFullYear() - 1), SpaEfVTbl2Erstellen(a, b, c, jahr))
    });
    $("#benutzerdefiniertSpaEfVTbl1, benutzerdefiniertSpaEfVTbl2").click(function() {
        var a = getModusSpaEfV(this.value),
            b = getVersionSpaEfV(this.value);
        resetBenutzerdefJahreSpaEfVTbl1(b);
        detailAuswahlAnzeigenSpaEfV(!0, this.value);
        getRechnungsjahre(a)
    });
    $("#jahreBenutzerdefSpaEfVTbl1").click(function() {
        $("#jahreSpaEfVBenutzerdef").css("display", "block")
    });
    $("#jahreLetzte5SpaEfVTbl1").click(function() {
        $("#jahreSpaEfVBenutzerdef").css("display", "none")
    });
    $("#basisSpaEfVTbl1, #basisSpaEfVTbl2").click(function() {
        var a = getVersionSpaEfV(this.value);
        resetBenutzerdefJahreSpaEfVTbl1(a);
        detailAuswahlAnzeigenSpaEfV(!1, this.value)
    });
    $("#entManZuordnung, #enfManZuordnung").click(function() {
        checkboxenDerEntEnfEinlesen(this);
        fensterMitDivOeffnen()
    });
    $("#modusVers").val("alt");
    $("#alleAnhaken").click(function() {
        checkboxenDerEntEnfAlleAnhaken()
    });
    $("#alleZuruecksetzen").click(function() {
        checkboxenDerEntEnfAlleZuruecksetzen()
    });
    $("#entVersorgerHinz").click(function() {
        versorgerInHistorie()
    });
    $("#mst1Anl, #mst2Anl, #mst3Anl, #mst4Anl").change(function() {
        sync.setCurrentLocation(CurrentLocation.ANLAGENVERWALTUNG);
        sync.setNrAnlage($("#anlagennummerAllgemeinAnl").val());
        sync.setNameAnlage($("#bezeichnungAllgemeinAnl").val());
        sync.setNameMessstelle(this.value);
        sync.synchronize()
    });
    $("#mandantGesamtSpaEfVTbl1").click(function() {
        $("#lblSpeziSpaEfVTble1Lieg, #speziSpaEfVTbl1Lieg, #speziSpaEfVTbl1Org, #lblSpeziSpaEfVTble1Org").css("display", "none")
    });
    $("#organisationSpaEfVTbl1").click(function() {
        $("#lblSpeziSpaEfVTble1Lieg, #speziSpaEfVTbl1Lieg").css("display", "none");
        $("#speziSpaEfVTbl1Org, #lblSpeziSpaEfVTble1Org").css("display", "inline")
    });
    $("#liegenschaftSpaEfVTbl1").click(function() {
        $("#lblSpeziSpaEfVTble1Lieg, #speziSpaEfVTbl1Lieg, #speziSpaEfVTbl1Org, #lblSpeziSpaEfVTble1Org").css("display",
            "inline")
    });
    $("#modus").change(function() {
        dbFuerEnergietraegerFestlegen($(this).val())
    });
    organisationenEinlesen();
    $("#btnInMstVerwaltungSpringen, #btnInKnzVerwaltungSpringen").click(function() {
        var a = "";
        switch (this.id) {
            case "btnInMstVerwaltungSpringen":
                a = "berMenu";
                break;
            case "btnInKnzVerwaltungSpringen":
                a = "knzMenu"
        }
        mainMenuNav(a)
    });
    $("#weitereEntsLieg").click(function() {
        "weitere Energietr\u00e4ger zuordnen" == $("#weitereEntsLieg").text() ? ($("#entLiegErweitert").css("display",
            "block"), $("#weitereEntsLieg").text("weniger Energietr\u00e4ger zuordnen")) : ($("#entLiegErweitert").css("display", "none"), $("#weitereEntsLieg").text("weitere Energietr\u00e4ger zuordnen"));
        $("#energietraeger7Lieg, #energietraeger8Lieg, #energietraeger9Lieg").val("")
    });
    $("#hatDlAllgemeinLieg").click(function() {
        toggleExtDl(this)
    });
    $("#levelAuswahlAllgemeinBer").change(function() {
        readinLevel(this);
        vorgelagertenBereichAktivieren(this)
    });
    /*17-03-2020 js event for the messaMart on change*/
    // 26-08-2020 simplified the logic
    $("#messartMstE, #messartMstB").change(function() {
        let type = ""
        switch (this.id) {
            case "messartMstE":
                type = "E"
                break;
            case "messartMstB":
                type = "B"
                break;
            default:
                console.log("$('#messartMstE, #messartMstB').change -> Some unknown case occured !")
        }
        toggleMsmBerechnungslogik(this.value)(type)
    });
    /*17-03-2020 js event for the messaMart on change*/
    $("#mstESuchen, #mstBSuchen").click(function() {
        messstellenlisteErstellen(this)
    });
    //Mittlere Auslastung in MsmVerwaltung je nach Eingabe in % oder kWh umrechnen
    $(".auslastung").blur(function () {
        if (this.id == "mittlereAuslastungKw1Anl") {
            var mAkW = formatNumber("deform", $("#mittlereAuslastungKw1Anl").val()) * 100 / formatNumber("deform", $("#anschlussleistung1Anl").val());
            mAkW = mAkW.toFixed(2);
            $("#mittlereAuslastungProzent1Anl").val(formatNumber("form", mAkW));
        }
        else if (this.id == "mittlereAuslastungProzent1Anl") {
            var mAPro = formatNumber("deform", $("#mittlereAuslastungProzent1Anl").val()) / 100 * formatNumber("deform", $("#anschlussleistung1Anl").val());
            mAPro = mAPro.toFixed(3);
            $("#mittlereAuslastungKw1Anl").val(formatNumber("form", mAPro));
        }
        else if (this.id == "mittlereAuslastungKw2Anl") {
            var mAkW = formatNumber("deform", $("#mittlereAuslastungKw2Anl").val()) * 100 / formatNumber("deform", $("#anschlussleistung2Anl").val());
            mAkW = mAkW.toFixed(2);
            $("#mittlereAuslastungProzent2Anl").val(formatNumber("form", mAkW));
        }
        else if (this.id == "mittlereAuslastungProzent2Anl") {
            var mAPro = formatNumber("deform", $("#mittlereAuslastungProzent2Anl").val()) / 100 * formatNumber("deform", $("#anschlussleistung2Anl").val());
            mAPro = mAPro.toFixed(3);
            $("#mittlereAuslastungKw2Anl").val(formatNumber("form", mAPro));
        }
        else if (this.id == "mittlereAuslastungKw3Anl") {
            var mAkW = formatNumber("deform", $("#mittlereAuslastungKw3Anl").val()) * 100 / formatNumber("deform", $("#anschlussleistung3Anl").val());
            mAkW = mAkW.toFixed(2);
            $("#mittlereAuslastungProzent3Anl").val(formatNumber("form", mAkW));
        }
        else if (this.id == "mittlereAuslastungProzent3Anl") {
            var mAPro = formatNumber("deform", $("#mittlereAuslastungProzent3Anl").val()) / 100 * formatNumber("deform", $("#anschlussleistung3Anl").val());
            mAPro = mAPro.toFixed(3);
            $("#mittlereAuslastungKw3Anl").val(formatNumber("form", mAPro));
        }
        else if (this.id == "mittlereAuslastungKw4Anl") {
            var mAkW = formatNumber("deform", $("#mittlereAuslastungKw4Anl").val()) * 100 / formatNumber("deform", $("#anschlussleistung4Anl").val());
            mAkW = mAkW.toFixed(2);
            $("#mittlereAuslastungProzent4Anl").val(formatNumber("form", mAkW));
        }
        else if (this.id == "mittlereAuslastungProzent4Anl") {
            var mAPro = formatNumber("deform", $("#mittlereAuslastungProzent4Anl").val()) / 100 * formatNumber("deform", $("#anschlussleistung4Anl").val());
            mAPro = mAPro.toFixed(3);
            $("#mittlereAuslastungKw4Anl").val(formatNumber("form", mAPro));
        }
    });

    $("#feldHinzufuegenStd").click(function() {
        createCustomField("std")
    });
    $("#entFaktorHinz, #enfFaktorHinz").click(function() {
        createCustomField("entFaktorHinz" == this.id ? "ent" : "enf")
    });
    $("#bisERng").change(function() {
        $("#bisERng").val().split(".")[2] !== $("#vomERng").val().split(".")[2] && (alert("Diese Rechnung muss gesplittet werden."), rechnungenSplitten())
    });
    $(".imgBtnFormel").click(function() {
        formelAuswahllisteErstellen("knzInt", extractNumber(this.id))
    });
    $("#stdExtDl").click(function() {
        toggleStandorteDritter(this)
    });
    $("#stdDrSuchenExtDl1, #stdDrSuchenExtDl2, #stdDrSuchenExtDl3, #stdDrSuchenExtDl4, #stdDrSuchenExtDl5, #stdDrSuchenExtDl6,#stdDrSuchenEngResExtDl1, #stdDrSuchenEngResExtDl2, #stdDrSuchenEngResExtDl3, #stdDrSuchenEngResExtDl4, #stdDrSuchenEngResExtDl5, #stdDrSuchenEngResExtDl6").click(function() {
        standortdatenDritteAuswahllisteErstellen(this.id)
    });
    $(".anlListeCheckboxes").change(function() {
        toggleColumnsOnOff(this)
    });
    $("#btnParHinz").click(function() {
        $("#erwAnlMenu").trigger("click")
    });
    $("#btnAnlOeffnen").click(function() {
        $("#anlMenu").trigger("click")
    });
    $("#berSuchenOrt, #ortSuchenMstE, #ortSuchenMstB, #anlAuswahlStd").click(function() {
        standorteAuswahllisteErstellen(this)
    });
    $("#extDlSuchenMstE, #extDlSuchenMstB").click(function() {
        durchleitungAuswahllisteErstellen(this)
    });
    $("#anlAuswahlZugVerbr1, #anlAuswahlZugVerbr2 ,#anlAuswahlZugVerbr3, #anlAuswahlZugVerbr4, #anlAuswahlZugVerbr5, #anlAuswahlZugVerbr6").click(function() {
        anlagenAuswahllisteErstellen(this.id)
    });
    $("#berSuchenVBereich1, #berSuchenVBereich2, #anlAuswahlBer").click(function() {
        bereichsAuswahllisteErstellen(this)
    });
    // Jump from Anlagen to Produkte
    $("#anlPrdLink").click(
      () => {
        mainMenuNav("prdMenu")
      }
    )
    $("#mstSuchenVMessstelleE, #mstSuchenVMessstelleB, #anlSuchenMst, #eRngSuchenMst, #anlEnt1SuchenMst, #anlEnt2SuchenMst, #anlEnt3SuchenMst, #anlEnt4SuchenMst,#zpSuchenMst, #mstSuchenExtDl1, #mstSuchenExtDl2, #mstSuchenExtDl3, #mstSuchenExtDl4, #mstSuchenExtDl5, #mstSuchenExtDl6,#mstSuchenExtDlEngRes1, #mstSuchenExtDlEngRes2, #mstSuchenExtDlEngRes3, #mstSuchenExtDlEngRes4, #mstSuchenExtDlEngRes5, #mstSuchenExtDlEngRes6,#imgBtnMstDiag11, #imgBtnMstDiag12, #imgBtnMstDiag13, #imgBtnMstDiag2, #imgBtnMstDatenexport, #mstSuchenVergl1, #mstSuchenVergl2").click(function() {
        var a,
            b;
        "mstSuchenVMessstelleE" == this.id ? a = "vorgelagerteMstE" :
        "mstSuchenVMessstelleB" == this.id ? a = "vorgelagerteMstB" :
        "anlSuchenMst" == this.id ? a = "mstMsm" :
        "eRngSuchenMst" == this.id ? a = "mstERng" : "anlEnt1SuchenMst" == this.id ? (a = "mst1Anl", b = $("#energietraeger1AllgemeinAnl").val()) : "anlEnt2SuchenMst" == this.id ? (a = "mst2Anl", b = $("#energietraeger2AllgemeinAnl").val()) : "anlEnt3SuchenMst" == this.id ? (a = "mst3Anl", b = $("#energietraeger3AllgemeinAnl").val()) : "anlEnt4SuchenMst" == this.id ? (a = "mst4Anl", b = $("#energietraeger4AllgemeinAnl").val()) :
        "zpSuchenMst" == this.id ? a = "mstZp" :
        "mstSuchenExtDl1" == this.id ? a = "mst1ExtDl" :
        "mstSuchenExtDl2" == this.id ? a = "mst2ExtDl" : "mstSuchenExtDl3" == this.id ? a = "mst3ExtDl" : "mstSuchenExtDl4" == this.id ? a = "mst4ExtDl" : "mstSuchenExtDl5" == this.id ? a = "mst5ExtDl" : "mstSuchenExtDl6" == this.id ? a = "mst6ExtDl" : "mstSuchenExtDlEngRes1" == this.id ? a = "mstEngRes1ExtDl" : "mstSuchenExtDlEngRes2" == this.id ? a = "mstEngRes2ExtDl" : "mstSuchenExtDlEngRes3" == this.id ? a = "mstEngRes3ExtDl" :
        "mstSuchenExtDlEngRes4" == this.id ? a = "mstEngRes4ExtDl":
        "mstSuchenExtDlEngRes5" == this.id ? a = "mstEngRes5ExtDl" :
        "mstSuchenExtDlEngRes6" == this.id ? a = "mstEngRes6ExtDl" :
        "imgBtnMstDiag11" == this.id ? a = "mstDiag1" :
        "imgBtnMstDiag12" == this.id ? a = "mstDiag2" :
        "imgBtnMstDiag13" == this.id ? a = "mstDiag3" :
        "imgBtnMstDiag2" == this.id ? a = "mstCompDiag" :
        "imgBtnMstDatenexport" == this.id ? a = "mstDatenexport" :
        "mstSuchenVergl1" == this.id ? a = "mstSuchenVergl1" :
        a = "mstSuchenVergl2";
        messstellenAuswahllisteErstellen(a, b)
    });
    $("#msmSuchenMstE, #msmSuchenMstB").click(function() {
        messmittelAuswahllisteErstellen(this)
    });
    $("#msmSuchenAnlage, #mstESuchenAnlage, #mstBSuchenAnlage").click(function() {
        const ident =
            "msmSuchenAnlage" == this.id ? "anlMsm" :
            "mstESuchenAnlage" == this.id ? "anlMstE" :
            "anlMstB"

        anlagenAuswahllisteErstellen(ident)
    });
    $(".msmSuchen").click(function() {
        messmittellisteErstellen()
    });
    $("#messungsformAllgemeinMsm").change(function() {
        "1-kanalig" == $(this).val() ? $(".kanal_2_3").css("visibility", "hidden") : $(".kanal_2_3").css("visibility",
            "visible")
    });
    $("#anlSuchenKanal1,#anlSuchenKanal2,#anlSuchenKanal3").click(function() {
        kanalauswahlTabelleErstellen(this.id)
    });
    $("#imgBtnknzDiag11, #imgBtnknzDiag12, #imgBtnknzDiag13").click(function() {
        kennzahlenAuswahllisteErstellen(this.id)
    });
    $("#modusERng").change(function() {
        "Standard" == $(this).val() ? ($("#standRng").css("display", "block"), $("#evuRng").css("display", "none"), $("#bafaRng").css("display", "none"), $(".evuRng,.bafaRng").val("")) : "EVU" == $(this).val() ? ($("#standRng").css("display", "block"),
            $("#evuRng").css("display", "block"), $("#bafaRng").css("display", "none"), $(".bafaRng").val("")) : "BaFa" == $(this).val() && ($("#standRng").css("display", "block"), $("#evuRng").css("display", "block"), $("#bafaRng").css("display", "block"))
    });
    $("#modusVerglRngMw").change(function() {
        "Messwerte" == $(this).val() ? $(".suchfelderRngVergl").css("display", "none") : $(".suchfelderRngVergl").css("display", "inline-block")
    });
    $("#modusVerglRngMw").change(function() {});
    $("#bildAllgemeinAnl, #bildAllgemeinMsm").click(function() {
        "bildAllgemeinAnl" ==
        this.id ? $("#imgUploadAnl").trigger("click") : $("#imgUploadMsm").trigger("click")
    });
    $("#mengeERng, #einERng").change(function() {
        var a = $("#inputEntERng").val(),
            b = $("#einERng").val(),
            c = $("#mengeERng").val();
        verbrauchBerechnen(this.id, a, b, c)
    });
    $("#mengeIMw").change(function() {
        var a = $("#entIMw").val(),
            b = $("#einIMw").val(),
            c = $(this).val();
        verbrauchBerechnen(this.id, a, b, c)
    });
    $("#inputEntERng").change(function() {
        versorgerUndEinheitBefuellen()
    });
    $("#btnHtNt").click(function() {
        "none" == $("#htNt").css("display") ? ($("#htNt").css("display",
            "block"), $(this).text("HT/NT deaktivieren")) : ($("#htNt").css("display", "none"), $(".htNtInp").val(""), $(this).text("HT/NT aktivieren"))
    });
    $("#tagstromVerbrERng, #nachtstromVerbrERng").change(function() {
        var a = parseFloat($("#tagstromVerbrERng").val()),
            b = parseFloat($("#nachtstromVerbrERng").val()),
            a = (a + b).toFixed(2);
        $("#verbrauchERng").val(formatNumber("form", a))
    });
    $("#tagstromKostERng, #nachtstromKostERng").change(function() {
        var a = parseFloat($("#tagstromKostERng").val()),
            b = parseFloat($("#nachtstromKostERng").val()),
            a = (a + b).toFixed(2);
        $("#kostenERng").val(formatNumber("form", a))
    });
    $("#eegUntERng, #eegUebERng").change(function() {
        var a = parseFloat(formatNumber("deform", $("#eegUntERng").val())),
            b = parseFloat(formatNumber("deform", $("#eegUebERng").val())),
            a = (a + b).toFixed(2);
        $("#eegERng").val(formatNumber("form", a))
    });
    $("#mstERng").change(function() {
        letzteRechnungenInTbl($(this).val());
        zaehlpunktNrInFeld($(this).val())
    });
    $("#eRngSuchen").click(function() {
        externeRechnungenListeErstellen("lupe")
    });
    $("#jahr1ERng, #monate1ERng, #vergEnt1ERng, #jahr2ERng, #monate2ERng, #vergEnt2ERng").change(function() {
        vergleichUpdaten(this.id)
    });
    $("#auswEditor").click(function() {});
    $("#diaProd1AusEin, #diaProd2AusEin").click(function() {
        "diaProd1AusEin" == this.id && "Diagramm ausklappen" == $(this).text() ? ($("#infosProduktion").css("height", $("#infosProduktion").height() + 300 + "px"), $("#diaProd1").css("display", "block"), $(this).text("Diagramm einklappen")) : "diaProd1AusEin" == this.id && "Diagramm einklappen" == $(this).text() ? ($("#diaProd1").css("display", "none"), $("#infosProduktion").css("height", $("#infosProduktion").height() - 300 + "px"), $(this).text("Diagramm ausklappen")) :
            "diaProd2AusEin" == this.id && "Diagramm ausklappen" == $(this).text() ? ($("#infosProduktion").css("height", $("#infosProduktion").height() + 300 + "px"), $("#diaProd2").css("display", "block"), $(this).text("Diagramm einklappen")) : "diaProd2AusEin" == this.id && "Diagramm einklappen" == $(this).text() && ($("#diaProd2").css("display", "none"), $("#infosProduktion").css("height", $("#infosProduktion").height() - 300 + "px"), $(this).text("Diagramm ausklappen"))
    });
    $("#menuProduktionAusw").click(function() {
        $("#auswertungen").css("display",
            "block");
        $("#stammdaten").css("display", "none");
        $(".infoBody").css("display", "inline-block");
        $("#manuell").css("display", "none");
        $("#optionen").css("display", "none");
        $("#bericht").css("display", "none")
    });
    $("#linkBerechnungslogikOderEingabemaske").click(function() {
        var a, b;
        "Berechnungslogik anlegen" == $(this).text() ? (a = mstNavID, b = ["messmittelBerechnungslogikMst", "berechnungslogikMst"], $("#menuBerechnungsformeln").trigger("click"), formelerweiterungNachDrop("berechneteMstName", $("#mstID").val(), $("#nameMst").val(),
            !0)) : (a = msmNavID, b = ["messmittelBerechnungslogikMst"], $("#msmMenu").trigger("click"));

    });
    $("#btnDiagrammErst").click(function() {
        chartInNewWindow()
    });
    $("#btnDiagramm2Erst").click(function() {
        chartInNewWindow2()
    });
    $("#btnDiagrammKnzErst").click(function() {
        chartInNewWindowKnz()
    });
    $(".testNumLen").on("blur", function() {
        switch (15 < this.value.length) {
            case !0:
                alert("Es sind nur Zahlen mit einer L\u00e4nge kleiner-gleich 15-Stellen erlaubt!"), this.value = ""
        }
    });
    $(".testStrLen").on("blur", function() {
        switch (30 < this.value.length) {
            case !0:
                alert("Es sind nur Zeichenketten mit maximal 30 Zeichen erlaubt!"), this.value = ""
        }
    });
    $("#anzahlJahreSpaEfVTab1").change(function() {
        var a = new Date;
        a.getDate();
        var b = a.getMonth() + 1;
        10 > b && (b = "0" + b);
        switch (b) {
            case "02":
                b = "Jan";
                break;
            case "03":
                b = "Feb";
                break;
            case "04":
                b = "Mrz";
                break;
            case "05":
                b = "Apr";
                break;
            case "06":
                b = "Mai";
                break;
            case "07":
                b = "Jun";
                break;
            case "08":
                b = "Jul";
                break;
            case "09":
                b = "Aug";
                break;
            case "10":
                b = "Sep";
                break;
            case "11":
                b = "Okt";
                break;
            case "12":
                b = "Nov";
                break;
            case "01":
                b = "Dez"
        }
        thisYear = a.getFullYear();
        if ("" != $("#startjahrSpaEfVTab1").val()) {
            for (j = 0; 6 > j; j++) $("#jahr" + (j + 1) + "SpaEfV").css("display", "none"), $("#chartAusbl" + (j + 1)).text("Ausblenden"), $("#chartAusbl" + (j + 1)).css("display", "none");
            $("#jahr6SpaEfV").css("display", "inline-block");
            $("#tbl6SpaEfV caption").text("Energieverbrauchswerte " +
                thisYear + "  bis " + b);
            for (i = 0; i < $(this).val(); i++) a = $("#startjahrSpaEfVTab1").val(), a = parseInt(a), a += i, $("#jahr" + (i + 1) + "SpaEfV").css("display", "inline-block"), $("#chartJahr" + (i + 1)).css("display", "inline"), $("#chartAusbl" + (i + 1)).css("display", "inline-block"), $("#tbl" + (i + 1) + "SpaEfV caption").text("Energieverbrauchswerte " + a)
        }
    });
    $("#startjahrSpaEfVTab1").change(function() {
        var a = new Date;
        a.getDate();
        var b = a.getMonth() + 1;
        10 > b && (b = "0" + b);
        switch (b) {
            case "02":
                b = "Jan";
                break;
            case "03":
                b = "Feb";
                break;
            case "04":
                b =
                    "Mrz";
                break;
            case "05":
                b = "Apr";
                break;
            case "06":
                b = "Mai";
                break;
            case "07":
                b = "Jun";
                break;
            case "08":
                b = "Jul";
                break;
            case "09":
                b = "Aug";
                break;
            case "10":
                b = "Sep";
                break;
            case "11":
                b = "Okt";
                break;
            case "12":
                b = "Nov";
                break;
            case "01":
                b = "Dez"
        }
        a.getFullYear();
        if ("" != $("#anzahlJahreSpaEfVTab1").val()) {
            for (j = 0; 6 > j; j++) $("#jahr" + (j + 1) + "SpaEfV").css("display", "none"), $("#chartAusbl" + (j + 1)).text("Ausblenden"), $("#chartAusbl" + (j + 1)).css("display", "none");
            a = new Date;
            a = a.getFullYear();
            $("#jahr6SpaEfV").css("display", "inline-block");
            $("#tbl6SpaEfV caption").text("Energieverbrauchswerte " + a + "  bis " + b);
            for (i = 0; i < $("#anzahlJahreSpaEfVTab1").val(); i++) b = $("#startjahrSpaEfVTab1").val(), b = parseInt(b), b += i, $("#jahr" + (i + 1) + "SpaEfV").css("display", "inline-block"), $("#chartAusbl" + (i + 1)).css("display", "inline-block"), $("#tbl" + (i + 1) + "SpaEfV caption").text("Energieverbrauchswerte " + b)
        }
    });
    $("#chartAusbl1, #chartAusbl2, #chartAusbl3, #chartAusbl4, #chartAusbl5").click(function() {
        if ("Ausblenden" == $(this).text()) {
            var a = $("#startjahrSpaEfVTab1").val(),
                a = parseInt(a);
            switch (this.id) {
                case "chartAusbl1":
                    $("#jahr1SpaEfV").css("display", "none");
                    break;
                case "chartAusbl2":
                    $("#jahr2SpaEfV").css("display", "none");
                    a += 1;
                    break;
                case "chartAusbl3":
                    $("#jahr3SpaEfV").css("display", "none");
                    a += 2;
                    break;
                case "chartAusbl4":
                    $("#jahr4SpaEfV").css("display", "none");
                    a += 3;
                    break;
                case "chartAusbl5":
                    $("#jahr5SpaEfV").css("display", "none"), a += 4
            }
            $(this).text(a + " Einblenden")
        } else switch ($(this).text("Ausblenden"), this.id) {
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
                $("#jahr5SpaEfV").css("display", "inline-block")
        }
    });
    $("#menuVorlagenformeln, #menuBerechnungsformeln, #menuProduktionAusw, #verbExportMenu, #mstVerglMenu, #zeitVerglMenu, #knzDarst").click(function() {
        $("#auswertungen").css("display", "block");
        $("#manuell").css("display", "none");
        $("#optionen").css("display", "none");
        $("#stammdaten").css("display", "none");
        mainMenuNav(this.id);
        addExtraWidthToDynamischeFaktor();
        if(this.id =='menuBerechnungsformeln'){
            //$(".liegPfad option:eq(1)").prop('selected', 'selected').trigger('change');
            getKorrekturfaktor();
            virtuelleMessstelle();
        }
        $("body").removeClass('fullWidthMasseneingabe');
    });
    $("#betrGrpMenu, #sAdmMenu, #manGrpMenu, #admMenu, #benMenu, #untMenu, #anlMenu, #pmMenu, #msmMenu, #knz_almMenu, #manMenu, #orgMenu, #liegMenu, #berMenu, #mstEMenu, #mstBMenu, #stdMenu, #stdDrMenu, #anl_Menu, #msgMenu, #knzMenu, #almMenu, #prdMenu,#anl_Eng_Menu, #anl_Dok_Menu, #anl_Hist_Menu, #anl_Konfig_Menu,#prd_Menu, #prd_Konfig_Menu, #prd_Hist_Menu").click(function() {
        $("#auswertungen").css("display", "none");
        $("#stammdaten").css("display", "block");
        $(".infoBody").css("display", "inline-block");
        $("#manuell").css("display", "none");
        $("#optionen").css("display", "none");
        mainMenuNav(this.id)
        addExtraWidthToDynamischeFaktor();
        $("body").removeClass('fullWidthMasseneingabe');
    });
    $("#schtDatMenu, #erwAnlMenu, #entMenu, #enfMenu, #gsfMenu, #mgsMenu, #zpMenu, #erwPrdMenu, #grpDiagMenu,#korrekturFaktorMenu,#korrekturFaktorMenuDynamischer").click(function() {       
        $("#auswertungen").css("display", "none");
        $("#optionen").css("display", "block");
        $("#manuell").css("display", "none");
        $("#stammdaten").css("display", "none");
        mainMenuNav(this.id)
        addExtraWidthToDynamischeFaktor();
        $("body").removeClass('fullWidthMasseneingabe');
    });
    /*new-mm-start 24-03-2021*/
    $("#extRngMenu, #intEngIMwMenu, #intBdeIMwMenu, #eRngVergleichMenu, #spaEfVTab1Menu, #spaEfVTab2Menu").click(function() {
        $("#auswertungen").css("display", "none");
        $("#manuell").css("display", "block");
        $("#optionen").css("display", "none");
        $("#stammdaten").css("display", "none");
        mainMenuNav(this.id)
        addExtraWidthToDynamischeFaktor();
        /*old-mm-comment*/
        //datePickerForInterneBetriebsdaten('infosIntBetriebsdaten',1);
        /*old-mm-comment*/
        $("#nextPrevMstID").val($("#mstID").val());
        $("body").removeClass('fullWidthMasseneingabe');
         //interneEBTblShowHide();

        /*Produkte mm 25-02-2021*/
        if("intEngIMwMenu" == this.id){
            /*new-mm-start 10-03-2021*/
            $("#tabIntBetriebsdatenIMwHistPrdkt").show();
            $("#tabIntBetriebsdatenIMwHistMesssetelle").hide();
            /*new-mm-start 10-03-2021*/
            /*new-mm-start 16-03-2021*/
            $("#nextPrevMstIDPrdktID").val($("#mstID").val());
            /*new-mm-end 16-03-2021*/
            /*new-mm-start 03-03-2021*/
            /*Reset InterneBetriebsdaten Inputs on menu click*/
            resetInterneBetriebsdatenInputs('infosIntEnergiedaten',1);
            /*new-mm-end 03-03-2021*/
            datePickerForInterneBetriebsdatenAnlPrdkt('infosIntEnergiedaten',1);
        }

        /*Produkte mm 01-03-2021*/
        /*new-mm-start*/
        if("intBdeIMwMenu" == this.id){
            /*used resetFormAllgemein function to reset input values */
            /*new-mm-start 24-03-2021*/
            resetFormAllgemein('infosIntBetriebsdaten',1);
            /*new-mm-end 24-03-2021*/
            datePickerForInterneBetriebsdaten('infosIntBetriebsdaten',1);
        }
        /*new-mm-end*/
    });
    /*new-mm-end 24-03-2021*/
    $("#manMap, #orgMap, #liegMap, #berMap").click(function() {
        mapErstellen(this.id, $("#selectMap").val())
    });
    var l;
    $("#selectMap").change(function() {
        "block" == $("#infosMandanten").css("display") ? l = "manMap" : "block" == $("#infosOrganisationen").css("display") ? l = "orgMap" : "block" == $("#infosLiegenschaften").css("display") ? l = "liegMap" : "block" == $("#infosBereiche").css("display") &&
            (l = "berMap");
        var a = $("#selectMap").val();
        mapErstellen(l, a)
    });
    $(".anlSuchen").click(function() {
        anlagenlisteErstellen()
    });
    $("#eAnlSuchen").click(function() {
        eAnlagenlisteErstellen()
    });
    $("#berSuchen").click(function() {
        bereichelisteErstellen()
    });
    $("#liegSuchen").click(function() {
        liegenschaftenlisteErstellen()
    });
    $("#orgSuchen").click(function() {
        organisationenlisteErstellen()
    });
    $("#extDlSuchen").click(function() {
        extDurchleitungenlisteErstellen()
    });
    $("#stdSuchen").click(function() {
        standortelisteErstellen()
    });
    $("#prdSuchen").click(function() {
        produktelisteErstellen()
    });
    $("#stdDrSuchen").click(function() {
        standorteDritterlisteErstellen()
    });
    $("#entSuchen").click(function() {
        energietraegerlisteErstellen()
    });
    $("#enfSuchen").click(function() {
        energieformenlisteErstellen()
    });
    $("#vorlFrmSuchen").click(function() {
        vorlagenformellisteErstellen()
    });
    $("#knzSuchen").click(function() {
        kennzahlInstanzenlisteErstellen()
    });
    $("#admSuchen").click(function() {
        adminlisteErstellen()
    });
    $("#benSuchen").click(function() {
        benutzerlisteErstellen()
    });
    $("#sAdmSuchen").click(function() {
        sAdmSuchenlisteErstellen()
    });
    $("#manGrpSuchen").click(function() {
        manGrpSuchenlisteErstellen()
    });

    $("#frmSuchenBerEdi").click(function() {
        var a = "";
        switch ($("#bermstmod").val()) {
            case "Kennzahl":
                a = "kennzahl";
                break;
            case "Virtuelle Messstelle":
                a = "berechnet";
                break;
            default:
                alert("$('#frmSuchenBerEdi').click(): \nAn invalid value was passed!")
        }
        formellisteErstellen(a)
    });
    $("#formelSuchenTyp").change(function() {
        var a = "";
        switch ($("#formelSuchenTyp").val()) {
            case "knz":
                a = "kennzahl";
                break;
            case "mst":
                a = "berechnet";
                break;
            default:
                console.log("$('#formelSuchenTyp').click: \nNo valid 'formeltyp' could be selected!!")
        }
        formellisteErstellen(a)
    });
    $("#formelVorfeldLeeren").click(function() {
        $("#formelVorStringDarstellung").val("")
    });
    $("#btnGruppeHinzDiag").click(function() {
        diagrammGruppeHinzuf\u00fcgen()
    });
    // if the number of shifts is changed the number of blocks should be adjusted7
    // See Schichtdaten/schichtdaten.js
    $("#anzahlSchtDat").change(function() {

        $("#schichtdatenContainer").empty()

        scpSchichtdaten.generateSchichtBlocks(
            $("#schichtdatenContainer")
        )(
            this.value
        )
    })
    // if the number of shifts is changed the number of blocks should be adjusted7
    // See Schichtdaten/historie.js
    $("#anzahlSchtDatHist").change(function() {

        $("#schichtdatenHistContainer").empty()

        scpSchichtdaten_historie.generateSchichtHistBlocks(
            $("#schichtdatenHistContainer")
        )(
            this.value
        )
    })
    // initializes first shift-blocks
    // See Schichtdaten/schichtdaten.js
    $("#anzahlSchtDat").trigger("change")
    // if the shift definition is without an end date then Gültig Bis should be disabled
    // See Schichtdaten/schichtdaten.js
    $("#bisEndeOffenSchtDat").click(function() {
        scpSchichtdaten.endeOffenOrBis()
    })
    // if the Gültig Von is changed the min date for Gültig Bis = Gültig Von
    // See Schichtdaten/schichtdaten.js
    $("#gueltigVonSchtDat").change(function() {
        scpSchichtdaten.setMinGueltigBis(this.value)
    })
    $("#letztePruefungPruefinformationenMsm, #pruefzyklusPruefinformationenMsm").change(function() {
        var a =
            $("#letztePruefungPruefinformationenMsm").val(),
            b = a.slice(-4),
            b = parseInt(b) + parseInt($("#pruefzyklusPruefinformationenMsm").val());
        $("#naechstePruefungPruefinformationenMsm").val(a.substring(0, 6) + b)
    });
    $("#tabGipscAdm, #tabBetrGrp, #tabManGrp, #tabSAdm, #tabAdm, #tabBen, #tabMan, #tabOrg, #tabLieg, #tabExtDl, #tabStdDr, #tabBer, #tabMstE, #tabMstB, #tabStd, #tabBen, #tabMsm, #tabConfig, #tabDok_Msm, #tabHis_Msm, #tabAnl, #tabAnl_energie, #tabAnl_dokumente, #tabAnl_historie, #tabKnz, #tabAlm, #tabExtRechnungen, #tabIntEnergiedatenIMw, #tabIntBetriebsdatenIMw,#tabIntBetriebsdatenIMwHist, #tabAusw_eRng_iMw, #tabSpaEfV_Tbl1, #tabSpaEfV_Tbl2, #tabZp, #tabMgs, #tabGsf, #tabEng, #tabEAnl, #tabEPrd, #tabPrd, #tabPrd_historie, #tabBerechnungsformeln, #tabVorlagenformeln, #tabSpaEfV_Tbl1,#tabSpaEfV_Tbl2, #tabVerbrauchsdatenExp, #tabLnDiag, #tabTimeCompDiag,#tabAnl_energie, #tabAnl_weitereKonfig, tabAnl_dokumente, tabAnl_historie,#tabPrd_konfig, #tabDiagKnz, #tabGrpDiag, #tabSchtDat, #tabSchtDatHist, #tabTaschenrechner,#tabDynamicKorrekturFktr").click(function() {
        tabControlNav(this.id);
        addExtraWidthToDynamischeFaktor();
        if(this.id=='tabIntBetriebsdatenIMw'){
            $("body").removeClass('fullWidthMasseneingabe');
            $("#tblMasseneingabeDataIMw").remove();
        }
        /*new-mm-start 23-03-2021*/
        if(this.id=='tabIntEnergiedatenIMw'){
            $("body").removeClass('fullWidthMasseneingabe');
            $("#tblMasseneingabeDataIMw").remove();
            $("#infosIntBetriebsdatenHistPrdkt").hide();
            $("#infosIntBetriebsdatenHistMesssetelle").hide();
            $("#tabIntBetriebsdatenIMwHistPrdkt").show();
            $("#tabIntBetriebsdatenIMwHistMesssetelle").hide();
        }
        /*new-mm-end 23-03-2021*/
    });
    $("#sAdmFirst, #manGrpFirst, #admFirst, #benFirst, #manFirst, #orgFirst, #liegFirst, #extDlFirst, #berFirst, #mstEFirst, #mstBFirst, #stdFirst, #stdDrFirst, #anlFirst, #msmFirst, #entFirst, #enfFirst, #eRngFirst, #intEngIMwFirst, #intBdeIMwFirst, #eAnlFirst, #ePrdFirst, #zpFirst, #prdFirst, #knzFirst, #betrParFirst").click(function() {
        "sAdmFirst" == this.id ? (sAdmNavID = 0, readInstanzen(this.id, sAdmNavID)) :
        "manGrpFirst" == this.id ? (manGrpNavID = 0, readInstanzen(this.id, manGrpNavID)) :
        "admFirst" == this.id ? (admNavID = 0, readInstanzen(this.id, admNavID)) :
        "benFirst" == this.id ? (benNavID = 0, readInstanzen(this.id, benNavID)) :
        "manFirst" == this.id ? (manNavID = 0, $(".manPfad").prop("selectedIndex", manNavID), readInstanzen(this.id, manNavID), organisationenEinlesen(), readInstanzen("orgFirst", 0)) :
        "orgFirst" == this.id ? (orgNavID = 0, $(".orgPfad").prop("selectedIndex", orgNavID), readInstanzen(this.id, orgNavID), liegenschaftenEinlesen(), readInstanzen("liegFirst", 0)) :
        "liegFirst" == this.id ? (liegNavID = 0, $(".liegPfad").prop("selectedIndex", liegNavID), readInstanzen(this.id, liegNavID), bereicheEinlesen(), readInstanzen("stdFirst", 0)) :
        "extDlFirst" == this.id ? (extDlNavID = 0, readInstanzen(this.id, extDlNavID)) :
        "berFirst" == this.id ? (mstENavID = mstBNavID = berNavID = 0, $(".berPfad").prop("selectedIndex", berNavID), readInstanzen(this.id, berNavID)) :
        "mstEFirst" == this.id ? (mstENavID = 0, readInstanzen(this.id, mstENavID)) :
        "mstBFirst" == this.id ? (mstBNavID = 0, readInstanzen(this.id, mstBNavID)) :
        "stdFirst" == this.id ? (stdNavID = 0, readInstanzen(this.id, stdNavID)) :
        "stdDrFirst" == this.id ? (stdDrNavID = 0, readInstanzen(this.id, stdDrNavID)) :
        "anlFirst" == this.id ? (anlNavID = 0, readInstanzen(this.id, anlNavID)) :
        "msmFirst" == this.id ? (msmNavID = 0, readInstanzen(this.id, msmNavID)) :
        "prdFirst" == this.id ? (prdNavID = 0, readInstanzen(this.id, prdNavID)) :
        "entFirst" == this.id ? (entNavID = 0, readInstanzen(this.id, entNavID), $("#modusVers").val("alt")) :
        "enfFirst" == this.id ? (enfNavID = 0, readInstanzen(this.id, enfNavID)) :
        "eRngFirst" == this.id ? (eRngNavID = 0, readInstanzen(this.id, eRngNavID)) :
        "intEngIMwFirst" == this.id ? (g = 0, readInstanzen(this.id, g)) :
        "intBdeIMwFirst" == this.id ? (h = 0, readInstanzen(this.id, h)) :
        "eAnlFirst" == this.id ? (eAnlNavID = 0, readInstanzen(this.id, eAnlNavID)) :
        "ePrdFirst" == this.id ? (ePrdNavID = 0, readInstanzen(this.id, ePrdNavID)) :
        "zpFirst" == this.id ? (zpNavID = 0, readInstanzen(this.id, zpNavID)) :
        "knzFirst" == this.id ? (knzNavID = 0, readInstanzen(this.id, knzNavID)) :
        "betrParFirst" == this.id && (betrParNavID = 0, readInstanzen(this.id, betrParNavID));
        b = !1;
        $(".lblNeu").css("display", "none");
        $(".lblAendern").css("display", "inline")
    });

    // Rechteverwaltung
    //
    // GipscommAdmins
    //
    // See Rechteverwaltung/gipscommAdmins.js
    //
    // Arrow Navigation
    //
    $("#gipscAdmFirst").click(scpRechteverwaltung_gipscommAdmins.readFirst)
    $("#gipscAdmPrevious").click(scpRechteverwaltung_gipscommAdmins.readPrevious)
    $("#gipscAdmNext").click(scpRechteverwaltung_gipscommAdmins.readNext)
    $("#gipscAdmLast").click(scpRechteverwaltung_gipscommAdmins.readLast)
    //
    // Search Navigation
    //
    $("#gipscAdmSuchen").click(scpRechteverwaltung_gipscommAdmins.searchGipscommAdmin)
    //
    // Delete Record
    //
    $("#gipscAdmLoeschen").click(scpRechteverwaltung_gipscommAdmins.deleteGipscommAdmin)
    //
    // Clear Fields For Creation Of New Record
    //
    $("#gipscAdmHinz").click(scpRechteverwaltung_gipscommAdmins.clearFields)
    //
    // Create New Or Update Form Data After Form Validation
    //
    $("#gipscAdmSpeichern").click(scpRechteverwaltung_gipscommAdmins.validateAndSaveFormData)
    //
    // Betreuergruppen
    //
    // See Rechteverwaltung/betreuergruppen.js
    //
    // Arrow Navigation
    //
    $("#betrGrpFirst").click(scpRechteverwaltung_betreuergruppen.readFirst)
    $("#betrGrpPrevious").click(scpRechteverwaltung_betreuergruppen.readPrevious)
    $("#betrGrpNext").click(scpRechteverwaltung_betreuergruppen.readNext)
    $("#betrGrpLast").click(scpRechteverwaltung_betreuergruppen.readLast)
    //
    // Search Navigation
    //
    $("#betrGrpSuchen").click(scpRechteverwaltung_betreuergruppen.searchBetreuerGruppen)
    //
    // Delete Record
    //
    $("#betrGrpLoeschen").click(scpRechteverwaltung_betreuergruppen.deleteBetreuerGruppe)
    //
    // Clear Fields For Creation Of New Record
    //
    $("#betrGrpHinz").click(scpRechteverwaltung_betreuergruppen.clearFields)
    //
    // Create New Or Update Form Data After Form Validation
    //
    $("#betrGrpSpeichern").click(scpRechteverwaltung_betreuergruppen.validateAndSaveFormData)
    //
    // Show Mandanten Selection Table
    //
    $("#manZuBetrGrpHinz").click(scpRechteverwaltung_betreuergruppen.showMandantenTablePopUp)
    //
    // Remove Mandant From DB Table
    //
    $("#tblMandantenBetrGrp tbody").on("dblclick", "tr", function() {
        scpRechteverwaltung_betreuergruppen.removeFromMandantenTbl(this)
    });


    // Schichtdaten
    // See Schichtdaten/schichtdaten.js
    //
    // Arrow Navigation
    //
    $("#schtDatFirst").click(scpSchichtdaten.readFirst)
    $("#schtDatPrevious").click(scpSchichtdaten.readPrevious)
    $("#schtDatNext").click(scpSchichtdaten.readNext)
    $("#schtDatLast").click(scpSchichtdaten.readLast)
    //
    // Search Navigation
    //
    $("#schtDatSuchen").click(scpSchichtdaten.searchSchichtModell)
    //
    // Delete Record
    //
    $("#schtDatLoeschen").click(scpSchichtdaten.deleteSchichtModell)
    //
    // Clear Fields For Creation Of New Record
    //
    $("#schtDatHinz").click(scpSchichtdaten.clearFields)
    //
    // Create New Or Update Form Data After Form Validation
    //
    $("#schtDatSpeichern").click(scpSchichtdaten.validateAndSaveFormData)
    //
    // Schichtdaten Historie
    // See Schichtdaten/historie.js
    //
    // Arrow Navigation
    //
    $("#schtDatHistFirst").click(scpSchichtdaten_historie.readFirst)
    $("#schtDatHistPrevious").click(scpSchichtdaten_historie.readPrevious)
    $("#schtDatHistNext").click(scpSchichtdaten_historie.readNext)
    $("#schtDatHistLast").click(scpSchichtdaten_historie.readLast)
    //
    // Search Navigation
    //
    $("#schtDatHistSuchen").click(scpSchichtdaten_historie.searchSchichtModellHist)
    //

    $("#sAdmPrevious,#manGrpPrevious,#admPrevious, #benPrevious,#manPrevious, #orgPrevious, #liegPrevious, #extDlPrevious, #berPrevious, #mstEPrevious, #mstBPrevious, #stdPrevious, #stdDrPrevious, #anlPrevious, #msmPrevious, #entPrevious, #enfPrevious, #eRngPrevious, #intEngIMwPrevious, #intBdeIMwPrevious, #eAnlPrevious, #ePrdPrevious, #zpPrevious, #prdPrevious, #knzPrevious, #betrParPrevious").click(function() {
        "sAdmPrevious" == this.id ? 0 < sAdmNavID && (sAdmNavID--, readInstanzen(this.id, sAdmNavID)) :
        "manGrpPrevious" == this.id ? 0 < manGrpNavID && (manGrpNavID--, readInstanzen(this.id, manGrpNavID)) :
        "admPrevious" == this.id ? 0 < admNavID && (admNavID--, readInstanzen(this.id, admNavID)) :
        "benPrevious" == this.id ? 0 < benNavID && (benNavID--, readInstanzen(this.id, benNavID)) :
        "manPrevious" == this.id ? 0 < manNavID && (manNavID--, $(".manPfad").prop("selectedIndex", manNavID), readInstanzen(this.id, manNavID), setTimeout(function() { organisationenEinlesen() }, 1500), readInstanzen("orgFirst", 0)) :
        "orgPrevious" == this.id ? 0 < orgNavID && (orgNavID--, $(".orgPfad").prop("selectedIndex", orgNavID), readInstanzen(this.id, orgNavID), liegenschaftenEinlesen(), readInstanzen("liegFirst", 0)) :
        "liegPrevious" == this.id ? 0 < liegNavID && (liegNavID--, $(".liegPfad").prop("selectedIndex", liegNavID), readInstanzen(this.id, liegNavID), bereicheEinlesen(), readInstanzen("stdFirst", 0)) :
        "extDlPrevious" == this.id ? 0 < extDlNavID && (extDlNavID--, readInstanzen(this.id, extDlNavID)) :
        "berPrevious" == this.id ? 0 < berNavID && (berNavID--, mstENavID = mstBNavID = 0, $(".berPfad").prop("selectedIndex", berNavID), readInstanzen(this.id, berNavID), clearFields("mstHinz"), readInstanzen(this.id, berNavID)) :
        "mstEPrevious" == this.id ? 0 < mstENavID && (mstENavID--, readInstanzen(this.id, mstENavID)) :
        "mstBPrevious" == this.id ? 0 < mstBNavID && (mstBNavID--, readInstanzen(this.id, mstBNavID)) :
        "stdPrevious" == this.id ? 0 < stdNavID && (stdNavID--, readInstanzen(this.id, stdNavID)) :
        "stdDrPrevious" == this.id ? 0 < stdDrNavID && (stdDrNavID--, readInstanzen(this.id, stdDrNavID)) :
        "anlPrevious" == this.id ? 0 < anlNavID && (anlNavID--, readInstanzen(this.id, anlNavID)) :
        "msmPrevious" == this.id ? 0 < msmNavID && (msmNavID--, readInstanzen(this.id, msmNavID)) :
        "prdPrevious" == this.id ? 0 < prdNavID && (prdNavID--, readInstanzen(this.id, prdNavID)) :
        "entPrevious" == this.id ? 0 < entNavID && (entNavID--, readInstanzen(this.id, entNavID), $("#modusVers").val("alt")) :
        "enfPrevious" == this.id ? 0 < enfNavID && (enfNavID--, readInstanzen(this.id, enfNavID)) :
        "eRngPrevious" == this.id ? 0 < eRngNavID && (eRngNavID--, readInstanzen(this.id, eRngNavID)) :
        "intEngIMwPrevious" == this.id ? 0 < g && (g--, readInstanzen(this.id, g)) :
        "intBdeIMwPrevious" == this.id ? 0 < h && (h--, readInstanzen(this.id, h)) :
        "eAnlPrevious" == this.id ? 0 < eAnlNavID && (eAnlNavID--, readInstanzen(this.id, eAnlNavID)) :
        "ePrdPrevious" == this.id ? 0 < ePrdNavID && (ePrdNavID--, readInstanzen(this.id, ePrdNavID)) :
        "zpPrevious" == this.id ? 0 < zpNavID && (zpNavID--, readInstanzen(this.id, zpNavID)) :
        "knzPrevious" == this.id ? 0 < knzNavID && (knzNavID--, readInstanzen(this.id, knzNavID)) :
        "betrParPrevious" == this.id && 0 < betrParNavID && (betrParNavID--, readInstanzen(this.id, betrParNavID));
        b = !1;
        $(".lblNeu").css("display", "none");
        $(".lblAendern").css("display", "inline")
    });
    $("#sAdmNext,#manGrpNext,#admNext,#benNext,#manNext, #orgNext, #liegNext, #extDlNext, #berNext, #mstENext, #mstBNext, #stdNext, #stdDrNext, #anlNext, #msmNext, #entNext, #enfNext, #eRngNext, #intEngIMwNext, #intBdeIMwNext, #eAnlNext, #ePrdNext, #zpNext, #prdNext, #knzNext, #betrParNext").click(function() {
        "sAdmNext" == this.id ? sAdmNavID < $("#sAdmCount").val() - 1 && (sAdmNavID++, readInstanzen(this.id, sAdmNavID)) :
        "manGrpNext" == this.id ? manGrpNavID < $("#manGrpCount").val() - 1 && (manGrpNavID++, readInstanzen(this.id, manGrpNavID)) :
        "admNext" == this.id ? admNavID < $("#admCount").val() - 1 && (admNavID++, readInstanzen(this.id, admNavID)) :
        "benNext" == this.id ? benNavID < $("#benCount").val() - 1 && (benNavID++, readInstanzen(this.id, benNavID)) :
        "manNext" == this.id ? manNavID < $("#manCount").val() - 1 && (manNavID++, $(".manPfad").prop("selectedIndex", manNavID), readInstanzen(this.id, manNavID), organisationenEinlesen(), readInstanzen("orgFirst", 0)) :
        "orgNext" == this.id ? orgNavID < $("#orgCount").val() - 1 && (orgNavID++, $(".orgPfad").prop("selectedIndex", orgNavID), readInstanzen(this.id, orgNavID), liegenschaftenEinlesen(), readInstanzen("liegFirst", 0)) :
        "liegNext" == this.id ? liegNavID < $("#liegCount").val() - 1 && (liegNavID++, $(".liegPfad").prop("selectedIndex", liegNavID), readInstanzen(this.id, liegNavID), bereicheEinlesen(), readInstanzen("stdFirst", 0)) :
        "extDlNext" == this.id ? extDlNavID < $("#extDlCount").val() - 1 && (extDlNavID++, readInstanzen(this.id, extDlNavID)) :
        "berNext" == this.id ? berNavID < $("#berCount").val() - 1 && (berNavID++, mstENavID = mstBNavID = 0, $(".berPfad").prop("selectedIndex", berNavID), readInstanzen(this.id, berNavID), clearFields("mstHinz")) :
        "mstENext" == this.id ? mstENavID < $("#mstECount").val() - 1 && (mstENavID++, readInstanzen(this.id, mstENavID)) :
        "mstBNext" == this.id ? mstBNavID < $("#mstBCount").val() - 1 && (mstBNavID++, readInstanzen(this.id, mstBNavID)) :
        "stdNext" == this.id ? stdNavID < $("#stdCount").val() - 1 && (stdNavID++, readInstanzen(this.id, stdNavID)) :
        "stdDrNext" == this.id ? stdDrNavID < $("#stdDrCount").val() - 1 && (stdDrNavID++, readInstanzen(this.id, stdDrNavID)) :
        "anlNext" == this.id ? anlNavID < $("#anlCount").val() - 1 && (anlNavID++, readInstanzen(this.id, anlNavID)) :
        "msmNext" == this.id ? msmNavID < $("#msmCount").val() - 1 && (msmNavID++, readInstanzen(this.id, msmNavID)) :
        "prdNext" == this.id ? prdNavID < $("#prdCount").val() - 1 && (prdNavID++, readInstanzen(this.id, prdNavID)) :
        "entNext" == this.id ? entNavID < $("#entCount").val() - 1 && (entNavID++, readInstanzen(this.id, entNavID), $("#modusVers").val("alt")) :
        "enfNext" == this.id ? enfNavID < $("#enfCount").val() - 1 && (enfNavID++, readInstanzen(this.id, enfNavID)) :
        "eRngNext" == this.id ? eRngNavID < $("#eRngCount").val() - 1 && (eRngNavID++, readInstanzen(this.id, eRngNavID)) :
        "intEngIMwNext" == this.id ? g < $("#intEngIMwCount").val() - 1 && (g++, readInstanzen(this.id, g)) :
        "intBdeIMwNext" == this.id ? h < $("#intBdeIMwCount").val() - 1 && (h++, readInstanzen(this.id, h)) :
        "eAnlNext" == this.id ? eAnlNavID < $("#eAnlCount").val() - 1 && (eAnlNavID++, readInstanzen(this.id, eAnlNavID)) :
        "ePrdNext" == this.id ? ePrdNavID < $("#ePrdCount").val() - 1 && (ePrdNavID++, readInstanzen(this.id, ePrdNavID)) :
        "zpNext" == this.id ? zpNavID < $("#zpCount").val() - 1 && (zpNavID++, readInstanzen(this.id, zpNavID)) :
        "knzNext" == this.id ? knzNavID < $("#knzInsCount").val() - 1 && (knzNavID++, readInstanzen(this.id, knzNavID)) :
        "betrParNext" == this.id && betrParNavID < $("#betrParCount").val() - 1 && (betrParNavID++, readInstanzen(this.id, betrParNavID));
        b = !1;
        $(".lblNeu").css("display", "none");
        $(".lblAendern").css("display", "inline")
    });
    $("#sAdmLast,#manGrpLast,#admLast,#benLast,#manLast, #orgLast, #liegLast, #extDlLast, #berLast, #mstELast, #mstBLast, #stdLast, #stdDrLast, #anlLast, #msmLast, #entLast, #enfLast, #eRngLast, #intEngIMwLast, #intBdeIMwLast, #eAnlLast, #ePrdLast, #zpLast, #prdLast, #knzLast, #betrParLast").click(function() {
        "sAdmLast" == this.id ? (sAdmNavID = $("#sAdmCount").val() - 1, readInstanzen(this.id, sAdmNavID)) :
        "manGrpLast" == this.id ? (manGrpNavID = $("#manGrpCount").val() - 1, readInstanzen(this.id, manGrpNavID)) :
        "admLast" == this.id ? (admNavID = $("#admCount").val() - 1, readInstanzen(this.id, admNavID)) :
        "benLast" == this.id ? (benNavID = $("#benCount").val() - 1, readInstanzen(this.id, benNavID)) :
        "manLast" == this.id ? (manNavID = $("#manCount").val() - 1, $(".manPfad").prop("selectedIndex", manNavID), readInstanzen(this.id, manNavID), organisationenEinlesen(), readInstanzen("orgFirst", 0)) :
        "orgLast" == this.id ? (orgNavID = $("#orgCount").val() - 1, $(".orgPfad").prop("selectedIndex", orgNavID), readInstanzen(this.id, orgNavID), liegenschaftenEinlesen(), readInstanzen("liegFirst", 0)) :
        "liegLast" == this.id ? (liegNavID = $("#liegCount").val() - 1, $(".liegPfad").prop("selectedIndex", liegNavID), readInstanzen(this.id, liegNavID), bereicheEinlesen()) :
        "extDlLast" == this.id ? (extDlNavID = $("#extDlCount").val() - 1, readInstanzen(this.id, extDlNavID)) :
        "berLast" == this.id ? (berNavID = $("#berCount").val() - 1, mstENavID = mstBNavID = 0, $(".berPfad").prop("selectedIndex", berNavID), readInstanzen(this.id, berNavID), clearFields("mstEHinz"), clearFields("mstBHinz")) :
        "mstELast" == this.id ? (mstENavID = $("#mstECount").val() - 1, readInstanzen(this.id, mstENavID)) :
        "mstBLast" == this.id ? (mstBNavID = $("#mstBCount").val() - 1, readInstanzen(this.id, mstBNavID)) :
        "stdLast" == this.id ? (stdNavID = $("#stdCount").val() - 1, readInstanzen(this.id, stdNavID)) :
        "stdDrLast" == this.id ? (stdDrNavID = $("#stdDrCount").val() - 1, readInstanzen(this.id, stdDrNavID)) :
        "anlLast" == this.id ? (anlNavID = $("#anlCount").val() - 1, readInstanzen(this.id, anlNavID)) :
        "msmLast" == this.id ? (msmNavID = $("#msmCount").val() - 1, readInstanzen(this.id, msmNavID)) :
        "prdLast" == this.id ? (prdNavID = $("#prdCount").val() - 1, readInstanzen(this.id, prdNavID)) :
        "entLast" == this.id ? (entNavID = $("#entCount").val() - 1, enfNavID = 0, readInstanzen(this.id, entNavID), clearFields("enfHinz"), readInstanzen("enfFirst", 0), $("#modusVers").val("alt")) :
        "enfLast" == this.id ? (enfNavID = $("#enfCount").val() - 1, readInstanzen(this.id, enfNavID)) :
        "eRngLast" == this.id ? (eRngNavID = $("#eRngCount").val() - 1, readInstanzen(this.id, eRngNavID)) :
        "intEngIMwLast" == this.id ? (g = $("#intEngIMwCount").val() - 1, readInstanzen(this.id, g)) :
        "intBdeIMwLast" == this.id ? (h = $("#intBdeIMwCount").val() - 1, readInstanzen(this.id, h)) :
        "eAnlLast" == this.id ? (eAnlNavID = $("#eAnlCount").val() - 1, readInstanzen(this.id, eAnlNavID)) :
        "ePrdLast" == this.id ? (ePrdNavID = $("#ePrdCount").val() - 1, readInstanzen(this.id, ePrdNavID)) :
        "zpLast" == this.id ? (zpNavID = $("#zpCount").val() - 1, readInstanzen(this.id, zpNavID)) :
        "knzLast" == this.id ? (knzNavID = $("#knzInsCount").val() - 1, readInstanzen(this.id, knzNavID)) :
        "betrParLast" == this.id && (betrParNavID = $("#betrParCount").val() - 1, readInstanzen(this.id, betrParNavID));
        b = !1;
        $(".lblNeu").css("display", "none");
        $(".lblAendern").css("display", "inline")
    });
    $("#dateiHinz").click(function() {
        $(this).filepicker()
    });
    $("#berLogikMenu").menu();
    $("#intMwMenu").menu();
    $("#jahrMasseneingabeIMw, #btnAnlagenNummerMassEing, #btnAnlagenBezeichnungMassEing, #einheitMasseneingabeIMw").change(function() {
        var a = null;
        "jahrMasseneingabeIMw" == this.id ? ME.resetObj() : ME.loadFromDB();
        $("#masseneingabeTimeInterval").val() == TimeInterval.DAY ? a = "#btnTageMasseneingabeIMw" : $("#masseneingabeTimeInterval").val() == TimeInterval.WEEK ? a = "#btnWochenMasseneingabeIMw" : $("#masseneingabeTimeInterval").val() == TimeInterval.MONTH ? a = "#btnMonateMasseneingabeIMw" :
            $("#masseneingabeTimeInterval").val() == TimeInterval.YEAR && (a = "#btnJahreMasseneingabeIMw");
        $(a).trigger("click")
    });
    $("#monatMasseneingabeIMw").change(function() {
        masseneingabeInMonatNavigieren($(this).val())
    });
    $("#btnTageMasseneingabeIMw, #btnWochenMasseneingabeIMw, #btnMonateMasseneingabeIMw, #btnJahreMasseneingabeIMw").click(function() {
        var a = void 0;
        switch (this.id) {
            case "btnTageMasseneingabeIMw":
                a = TimeInterval.DAY;
                break;
            case "btnWochenMasseneingabeIMw":
                a = TimeInterval.WEEK;
                break;
            case "btnMonateMasseneingabeIMw":
                a =
                    TimeInterval.MONTH;
                break;
            case "btnJahreMasseneingabeIMw":
                a = TimeInterval.YEAR
        }
        masseneingabeZeitintervallAendern(a)
    });
   /* $("#masseneingabeSpeichern").click(function() {
        //ME.saveToDB()
        alert('Save button working');
    });*/
    $("#masseneingabeLaden").click(function() {
        ME.loadFromDB()
    });
    $("#masseneingabeInputIMw").scroll(function() {
        $("#masseneingabeNameIMw").css("margin-top", -1 * $("#masseneingabeInputIMw").scrollTop()).css("padding-bottom", $("#masseneingabeInputIMw").scrollTop());
        $("#masseneingabeZeitintervallIMw").scrollLeft($("#masseneingabeInputIMw").scrollLeft());
        var a = $("#masseneingabeZeitintervallContainerIMw").position().top + $("#masseneingabeZeitintervallContainerIMw").height() - $("#masseneingabeNameIMw input").position().top,
            a = a / 10.5;
        $("#masseneingabeNameIMw input").css("visibility", "visible");
        for (var b = 1; b < Math.floor(a) + 1; b++) $("#masseneingabeNameIMw input:nth-child(" + b + ")").css("visibility", "hidden")
    });
    $("#bermstmod").change(function() {
        "Virtuelle Messstelle" == this.value ? ($(".berFormel").css("display", "block"), $(".knzFormel").css("display", "none"), $("#formelSuchenTyp").val("mst")) :
            "Kennzahl" == this.value ? ($(".berFormel").css("display", "none"), $(".knzFormel").css("display", "block"), $("#formelSuchenTyp").val("knz")) : logToConsole('$("#bermstmod").change()', "ERROR", "Something went wrong!")
    });
    $("#formelfeldLeeren").click(function() {
        $("#formelStringDarstellung, #formelIdDarstellung, #berechneteMstName, #berechneteMstID").val("")
    });
    $("#mstBezugstabelleBerLogik, #iMwBezugstabelleBerLogik, #bdeBezugstabelleBerLogik").click(function() {
        "mstBezugstabelleBerLogik" == this.id ? ($("#tblIMwContainer").hide(),
            $("#tblMstContainer").show()) : "iMwBezugstabelleBerLogik" == this.id ? ($("#tblIMwContainer").show(), $("#tblMstContainer").hide()) : "bdeBezugstabelleBerLogik" == this.id && ($("#tblBetriebsdatenBerechnungseditor").show().parents("div.dataTables_wrapper").first().show(), $("#tblMessstellenBerechnungseditor, #tblInterneMesswerteBerechnungseditor").parents("div.dataTables_wrapper").first().hide(), $("#tblMessstellenBerechnungseditor").css("display", "none"), tblBetriebsdatenBerechnungseditor.draw())
    });
    $("#masseneingabeZeitraumTag, #masseneingabeZeitraumWoche, masseneingabeZeitraumMonat, #masseneingabeZeitraumJahr").click(function() {
        $("#zeitraumMasseneingabeIMw option").remove();
        switch (this.id) {
            case masseneingabeZeitraumTag:
                $("#zeitraumMasseneingabeIMw")
        }
    });
    $("#btnOptionHinzEAnl").click(function() {
        var a = $("#optionEAnl").val();
        tblOptionenEAnl.row.add([a]).draw();
        $("#optionEAnl").val("")
    });
    $("#btnOptionHinzEPrd").click(function() {
        var a = $("#optionEPrd").val();
        tblOptionenEPrd.row.add([a]).draw();
        $("#optionEPrd").val("")
    });
    $("#tblOptionenEAnl tbody").on("dblclick", "tr", function() {
        tblOptionenEAnl.row(this).remove().draw()
    });
    $("#tblGruppenDiag tbody").on("dblclick", "tr", function() {
        tblGruppenDiag.row(this).remove().draw()
    });
    $("#tblOptionenEPrd tbody").on("dblclick", "tr", function() {
        tblOptionenEPrd.row(this).remove().draw()
    });
    $("#tabAdm, #admMenu").click(function() {
        manGrpEinlesen();
    });
    $(".betrPfad").change(function() {

        $(".betrPfad").val($(this).val());

        $("#betrGrpID").val(betrGrpListe[$(".betrPfad").prop("selectedIndex")].betrGrpID);
        readInstanzen("betrGrpFirst", $(".betrPfad").prop("selectedIndex"));
        readInstanzen("sAdmFirst", 0);
        //manGrpEinlesen();
    });
    $(".manGrpPfad").change(function() {
        $(".manGrpPfad").val($(this).val());

        var a = $(".manGrpPfad  option").eq($(".manGrpPfad").prop("selectedIndex")).prop("id").split("_");

        $("#manOderManGrp").val(a[0]);

        if (head(a) === "optManGrp") {
            $("#manGrpID").val(manGrpListe[last(a)].manGrpID)
            readInstanzen("manGrpFirst", $(".manGrpPfad").prop("selectedIndex"))
        }
        else {
            $("#manBID").val($(this).find('option:selected').data('id'));
            //$("#manRechteID").val(mandantenliste[last(a)].manID)
        }
        readInstanzen("admFirst", 0)
        readInstanzen("benFirst", 0)
    });
    $(".manPfad").change(function() {
        $(".manPfad").val($(this).val());
        $("#manID").val(mandantenliste[$(this).prop("selectedIndex")].manID);
        readInstanzen("manFirst", null);
        organisationenEinlesen();
        readInstanzen("orgFirst", 0);
        dbFuerEnergietraegerFestlegen($("#nameDB").val());
        energietrInDBoxLieg();
        readInstanzen("msmFirst", 0);
        msmNavID = 0;
        readInstanzen("stdFirst", 0);
        stdNavID = 0;
        readInstanzen("anlFirst", 0);
        anlNavID = 0;
        anlagenGruppenEinlesen();
        erweiterungenProdukteEinlesen();
        getKorrekturfaktor();
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
        externeRechnungenListeErstellen("vergleich")
    });
    $(".orgPfad").change(function() {
        orgPfadChange(this)
    });
    $(".liegPfad").change(function() {
        liegPfadChange(this)
    });
    $(".berPfad").change(function() {
        berPfadChange(this)
    });
    $("#sAdmHinz, #manGrpHinz, #admHinz, #benHinz, #manHinz, #orgHinz, #liegHinz, #extDlHinz, #berHinz, #mstEHinz, #mstBHinz, #stdHinz, #stdDrHinz, #anlHinz, #msmHinz, #entHinz, #enfHinz, #eRngHinz, #iMwHinz, #eAnlHinz, #ePrdHinz, #prdHinz, #zpHinz, #knzHinz").click(function() {
        clearFields(this.id);
        b = !0
    });
    $("#sAdmSpeichern, #manGrpSpeichern, #admSpeichern, #benSpeichern, #manSpeichern, #orgSpeichern, #liegSpeichern, #extDlSpeichern, #berSpeichern, #benSpeichern, #mstESpeichern, #mstBSpeichern, #stdSpeichern, #stdDrSpeichern,  #anlSpeichern, #anlSpeichernHist, #msmSpeichern, #entSpeichern, #enfSpeichern, #eRngSpeichern, #intEngIMwSpeichern, #eAnlSpeichern, #zpSpeichern, #ePrdSpeichern, #prdSpeichern, #knzSpeichern, #betrParSpeichern, #grpDiagSpeichern").click(function() {
        "sAdmSpeichern" == this.id ? "" != $("#nameSAdm").val() && 1 == b ? (instanzErstellen(this.id), b = !1) : "" != $("#nameSAdm").val() && 0 == b ? instanzSpeichern(this.id) : ($("#meldung").css("display", "block"), $("#meldung").dialog({
            title: "Meldung!" })) :
        "manGrpSpeichern" == this.id ? "" != $("#nameManGrp").val() && 1 == b ? (instanzErstellen(this.id), b = !1) : "" != $("#nameManGrp").val() && 0 == b ? instanzSpeichern(this.id) : ($("#meldung").css("display", "block"), $("#meldung").dialog({
            title: "Meldung!" })) :
        "admSpeichern" == this.id ? "" != $("#nameAdm").val() && 1 == b ? (instanzErstellen(this.id), b = !1) : "" != $("#nameAdm").val() && 0 == b ? instanzSpeichern(this.id) : ($("#meldung").css("display",
            "block"), $("#meldung").dialog({
            title: "Meldung!" })) :
        "benSpeichern" == this.id ? "" != $("#nameBen").val() && 1 == b ? (instanzErstellen(this.id), b = !1) : "" != $("#nameBen").val() && 0 == b ? instanzSpeichern(this.id) : ($("#meldung").css("display", "block"), $("#meldung").dialog({
            title: "Meldung!" })) :
        "manSpeichern" == this.id ? "" != $("#nameAllgemeinMan").val() && 1 == b ? (instanzErstellen(this.id), mandantenEinlesen($("#betrGrpID").val(), "man_ID", $("#manID").val()), $(".manPfad").prop("selectedIndex", mandantenliste.length - 1), b = !1) : "" != $("#nameAllgemeinMan").val() && 0 == b ? (instanzSpeichern(this.id), $(".manPfad").prop("selectedIndex", manNavID)) : ($("#meldung").css("display", "block"), $("#meldung").dialog({
            title: "Meldung!" })) :
        "orgSpeichern" == this.id ? "" != $("#nameAllgemeinOrg").val() && 1 == b ? (instanzErstellen(this.id), b = !1) : "" != $("#nameAllgemeinOrg").val() && 0 == b ? instanzSpeichern(this.id) : ($("#meldung").css("display", "block"), $("#meldung").dialog({
            title: "Meldung!" })) :
        "liegSpeichern" == this.id ? "" != $("#nameAllgemeinLieg").val() && 1 == b ? (instanzErstellen(this.id), b = !1) : "" != $("#nameAllgemeinLieg").val() && 0 == b ? instanzSpeichern(this.id) : ($("#meldung").css("display", "block"), $("#meldung").dialog({
            title: "Meldung!" })) :
        "extDlSpeichern" == this.id ? "" != $("#nameExtDl").val() && 1 == b ? (instanzErstellen(this.id), b = !1) : "" != $("#nameExtDl").val() && 0 == b ? instanzSpeichern(this.id) : ($("#meldung").css("display", "block"), $("#meldung").dialog({
            title: "Meldung!" })) :
        "berSpeichern" == this.id ? "" != $("#nameAllgemeinBer").val() && 1 == b ? (instanzErstellen(this.id), berNavID = $("#berCount").val(), b = !1) : "" != $("#nameAllgemeinBer").val() && 0 == b ? instanzSpeichern(this.id) : ($("#meldung").css("display", "block"), $("#meldung").dialog({
            title: "Meldung!" })) :
        "mstESpeichern" == this.id ? "" != $("#nameMstE").val() && 1 == b ? (instanzErstellen(this.id), b = !1) : "" != $("#nameMstE").val() && 0 == b ? instanzSpeichern(this.id) : ($("#meldung").css("display", "block"), $("#meldung").dialog({ title: "Meldung!" })) :
        "mstBSpeichern" == this.id ? "" != $("#nameMstB").val() && 1 == b ? (instanzErstellen(this.id), b = !1) : "" != $("#nameMstB").val() && 0 == b ? instanzSpeichern(this.id) : ($("#meldung").css("display", "block"), $("#meldung").dialog({ title: "Meldung!" })) :
        "stdSpeichern" == this.id ? "" != $("#nameStd").val() && 1 == b ? (instanzErstellen(this.id), b = !1) : "" != $("#nameStd").val() && 0 == b ? instanzSpeichern(this.id) : ($("#meldung").css("display", "block"), $("#meldung").dialog({
            title: "Meldung!" })) :
        "stdDrSpeichern" == this.id ? "" != $("#nameStdDr").val() && 1 == b ? (instanzErstellen(this.id), b = !1) : "" != $("#nameStdDr").val() && 0 == b ? instanzSpeichern(this.id) : ($("#meldung").css("display", "block"), $("#meldung").dialog({
            title: "Meldung!" })) :
        "anlSpeichern" == this.id ? "" != $("#nummerAllgemeinAnl").val() && 1 == b ? ($("#archiviertAnl").val(!1), instanzErstellen(this.id), b = !1) : "" != $("#nummerAllgemeinAnl").val() && 0 == b ? $("#historyOrNot").dialog({
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
            open: function() {
                $("#histSpeichern").off("click");
                $("#histNichtSpeichern").off("click");
                $("#histOk").off("click");
                $("#histAbbrechen").off("click");
                $("#histSpeichern").on("click", function() {
                    $("#infosBemerkungHist, #histOk").css("display", "inline");
                    $("#histSpeichern, #histNichtSpeichern").css("display", "none")
                });
                $("#histNichtSpeichern").on("click", function() {
                    $("#archiviertAnl").val("false");
                    instanzSpeichern("anlSpeichern");
                    $("#historyOrNot").dialog("close")
                });
                $("#histOk").on("click", function() {
                    $("#archiviertAnl").val("true");
                    instanzSpeichern("anlSpeichern");
                    instanzErstellen("anlSpeichern");
                    $("#infosBemerkungHist, #histOk").css("display", "none");
                    $("#infosBemerkungHist input").val("");
                    $("#histSpeichern, #histNichtSpeichern").css("display", "inline");
                    $("#historyOrNot").dialog("close")
                });
                $("#histAbbrechen").on("click", function() {
                    $("#infosBemerkungHist, #histOk").css("display", "none");
                    $("#histSpeichern, #histNichtSpeichern").css("display",
                        "inline");
                    $("#infosBemerkungHist input").val("");
                    $("#historyOrNot").dialog("close")
                })
            },
            close: function() {
                $("#infosBemerkungHist input").val("");
                $("#infosBemerkungHist, #histOk").css("display", "none");
                $("#histSpeichern, #histNichtSpeichern").css("display", "inline") } }) : ($("#meldung").css("display", "block"), $("#meldung").dialog({
            title: "Meldung!" })) :
        "anlSpeichernHist" == this.id ? "" != $("#nummerAllgemeinAnl").val() && 1 == b ? ($("#archiviertAnl").val(!1), instanzErstellen(this.id), b = !1) : "" != $("#nummerAllgemeinAnl").val() && 0 == b ? ($("#archiviertAnl").val(!0), instanzSpeichern(this.id)) : ($("#meldung").css("display", "block"), $("#meldung").dialog({
            title: "Meldung!" })) :
        "msmSpeichern" == this.id ? "" != $("#messmittelNrAllgemeinMsm").val() && 1 == b ? (instanzErstellen(this.id), b = !1) : "" != $("#messmittelNrAllgemeinMsm").val() && 0 == b ? (instanzSpeichern(this.id)) : ($("#meldung").css("display",
            "block"), $("#meldung").dialog({
            title: "Meldung!" })) :
        "entSpeichern" == this.id ? "" != $("#nameEnt").val() && 1 == b ? (instanzErstellen(this.id), b = !1, energietrInDBoxLieg()) : "" != $("#nameEnt").val() && 0 == b ? (instanzSpeichern(this.id), energietrInDBoxLieg()) : ($("#meldung").css("display", "block"), $("#meldung").dialog({
            title: "Meldung!" })) :
        "enfSpeichern" == this.id ? "" != $("#nameEnf").val() && 1 == b ? (instanzErstellen(this.id), b = !1) : "" != $("#nameEnf").val() && 0 == b ? (instanzSpeichern(this.id)) : ($("#meldung").css("display", "block"), $("#meldung").dialog({
            title: "Meldung!" })) :
        "eRngSpeichern" == this.id ? "" != $("#nrERng").val() && 1 == b ? (instanzErstellen(this.id), b = !1) : "" != $("#nrERng").val() && 0 == b ? instanzSpeichern(this.id) : ($("#meldung").css("display", "block"), $("#meldung").dialog({
            title: "Meldung!" })) :
        "intEngIMwSpeichern" == this.id ? instanzSpeichern(this.id) : "intBdeIMwSpeichern" == this.id ? instanzSpeichern(this.id) :
        "eAnlSpeichern" == this.id ? 1 == b ? (instanzErstellen(this.id), b = !1) : 0 == b ? instanzSpeichern(this.id) : ($("#meldung").css("display", "block"), $("#meldung").dialog({
            title: "Meldung!" })) :
        "ePrdSpeichern" == this.id ? 1 == b ? (instanzErstellen(this.id), b = !1) : 0 == b ? instanzSpeichern(this.id) : ($("#meldung").css("display", "block"), $("#meldung").dialog({
            title: "Meldung!" })) :
        "grpDiagSpeichern" == this.id ? 1 == b ? (instanzErstellen(this.id), b = !1) : 0 == b ? instanzSpeichern(this.id) : ($("#meldung").css("display", "block"), $("#meldung").dialog({
            title: "Meldung!"
        })) :
        "prdSpeichern" == this.id ? 1 == b ? ($("#archiviertPrd").val(!1), instanzErstellen(this.id, "neueGrp"), b = !1) : 0 == b ? $("#historyOrNot").dialog({
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
            open: function() {
                $("#histSpeichern,\n                                                        #histNichtSpeichern,\n                                                        #histOk,\n                                                        #histAbbrechen").off("click");
                $("#histSpeichern").on("click", function() {
                    $("#infosBemerkungHist, #histOk").css("display", "inline");
                    $("#histSpeichern, #histNichtSpeichern").css("display", "none")
                });
                $("#histNichtSpeichern").on("click", function() {
                    $("#archiviertPrd").val("false");
                    instanzSpeichern("prdSpeichern");
                    $("#historyOrNot").dialog("close")
                });
                $("#histOk").on("click", function() {
                    $("#archiviertPrd").val("true");
                    instanzSpeichern("prdSpeichern");
                    instanzErstellen("prdSpeichern");
                    $("#infosBemerkungHist, #histOk").css("display", "none");
                    $("#infosBemerkungHist input").val("");
                    $("#histSpeichern, #histNichtSpeichern").css("display", "inline");
                    $("#historyOrNot").dialog("close")
                });
                $("#histAbbrechen").on("click", function() {
                    $("#infosBemerkungHist, #histOk").css("display", "none");
                    $("#histSpeichern, #histNichtSpeichern").css("display", "inline");
                    $("#infosBemerkungHist input").val("");
                    $("#historyOrNot").dialog("close")
                })
            },
            close: function() {
                $("#infosBemerkungHist input").val("");
                $("#infosBemerkungHist, #histOk").css("display", "none");
                $("#histSpeichern, #histNichtSpeichern").css("display",
                    "inline") } }) : ($("#meldung").css("display", "block"), $("#meldung").dialog({
            title: "Meldung!" })) :
        "knzSpeichern" == this.id ? 1 == b ? (instanzErstellen(this.id), b = !1) : 0 == b ? instanzSpeichern(this.id) : ($("#meldung").css("display", "block"), $("#meldung").dialog({
            title: "Meldung!" })) :
        "zpSpeichern" == this.id ? 1 == b ? (instanzErstellen(this.id), b = !1) : 0 == b ? instanzSpeichern(this.id) : ($("#meldung").css("display", "block"), $("#meldung").dialog({
            title: "Meldung!" })) :
        "betrParSpeichern" == this.id && (1 == b || 0 == b ? (instanzErstellen(this.id), b = !1) : 0 == b ? alert("Um die G\u00fcltigkeit bereits erstellter Formeln zu garantieren,\nist der '\u00c4ndern-Modus' hier deaktiviert!") : ($("#meldung").css("display", "block"), $("#meldung").dialog({
                title: "Meldung!"
            })))
    });
    $("#orgLoeschen, #liegLoeschen, #extDlLoeschen, #berLoeschen,#mstELoeschen, #mstBLoeschen,#stdLoeschen, #stdDrLoeschen, #anlLoeschen,#msmLoeschen, #eRngLoeschen, #zpLoeschen, #eAnlLoeschen, #prdLoeschen, #entLoeschen").click(function() {
        fensterLoeschenmeldung(this.id)
    })
});


$(".berDialogSchlButton").click(function() {
    $("#messmittelSuchenContainer").dialog("close")
});

$(".berDialogSchlButton3").click(function() {
    $("#bereichListeContainer").dialog("close")
});

$(".berDialogSchlButton1").click(function() {
    $("#messstellenAuswahlContainer").dialog("close")
});

$(".berDialogSchlButton4").click(function() {
    $("#messstellenSuchenContainer").dialog("close")
});

$(".berDialogSchlButton5").click(function() {
    $("#messmittelAuswahlContainer").dialog("close")
});

$(".berDialogSchlButton6").click(function() {
    $("#formelnAuswahlContainer").dialog("close")
});

$(".berDialogSchlButton2").click(function() {
    $("#ChannellisteContainer").dialog("close")
});

$(".berDialogSchlButton7").click(function() {
    $("#externeRechnungenSuchenContainer").dialog("close")
});

$(".anlDialogSchlButton").click(function() {
    $("#anlListeContainer").dialog("close")
});

$(".berDialogButton").click(function() {
    $("#bereichSuchenContainer").dialog("close")
});

/*24-02-2020 Crete correction factor options add more functionality,
21-03-2020 added the description option*/
$("#btnOptionHinzEPrdKff").click(function() {
    var a = $("#optionName").val();
    var b = $("#optionWert").val();
    var c = $("#optionDescription").val();
    var d = $("#groupStaticCF option:selected").text();
    var id = $("#groupStaticCF").val();

    if (b != '') {
        var wertRep = b.replace(",", ".");
        var bComma = b.replace(".", ",");

        var bWithComma = bComma.split(',');
        var bVal = bWithComma[1];
        if (typeof bVal !== "undefined") {
            var bLength = bVal.length;
        } else {
            var bLength = bComma.length;
        }

        if (bLength > 4) {
            alert("Erlaube 4 Stellen nach dem Komma (,) Wert");
            return false;
        }
    }

    if (a != '' && bComma != '' && c != '' && d != '' && id != '') {
        var rowNode = tblOptionenEPrdKff.row.add([a, bComma, c, d]).draw().node();
        $(rowNode).attr('data-id', id);
        $("#optionName").val("");
        $("#optionWert").val("");
        $("#optionDescription").val("");
        $("#tblOptionenEPrdKffNotify").show();
        $("#groupStaticCF").val("");
        $("#groupStaticCFDiv").hide();
        $("#groupUpdateStaticCFDiv").hide();
        $("#updateGroupTxtStaticCF").val("");
        $("#updateGroupSelIDStaticCF").val("");
    } else {
        alert('Bitte alle Felder besetzen, und erneut Speichern!');
    }
});
/*24-02-2020 Crete correction factor dubble click functionality,
 21-03-2020 added the description option*/
$("#tblOptionenEPrdKff tbody").on("dblclick", "tr", function() {
    tblOptionenEPrdKff.row(this).remove().draw()
});


/*24-02-2020 Numeric and decimal value validation*/
jQuery.fn.NumericOnly = function() {
    return this.each(function() {
        $(this).keydown(function(e) {
            var key = e.charCode || e.keyCode || 0;
            // allow backspace, tab, delete, enter, arrows, numbers and keypad numbers ONLY
            // home, end, period, and numpad decimal
            if (key == 8 || key == 9 || key == 13 || key == 46 || key == 110 || key == 190 || (key >= 35 && key <= 40) || (key >= 48 && key <= 57) || (key >= 96 && key <= 105)) {

                return true;
            } else {

                return false;
            }

        });
    });
};

$(document).ready(function() {
    jQuery(".KorrekturFaktorFrm .inp_valid").NumericOnly();
    virtuelleMessstelle(); /*25-02-2020 hide the select box on page load*/
});


/*24-02-2020 Correction factor add record row wise not quoma saperated*/
$("#kFeSpeichern").click(function() {
    KorrekturFaktorEinfügen();
});
/*24-02-2020 Correction factor add record row wise not quoma saperated*/

/*25-02-2020 hide the select box on change Formelmodus select box*/
$("#bermstmod").change(function() {
    virtuelleMessstelle();
});
/*25-02-2020 hide the select box on change Formelmodus select box*/

/*06-03-2020-09-03-2020,16-03-2020  on click enable formelEditor button*/
$(document).ready(function() {

    $('#tblMessstellenBerechnungseditor tbody').on('click', 'tr', function(e) {
        /*alert('formelEditorInfo Event');*/
        var rowData = tblMessstellenBerechnungseditor.row(this).data();
        var berechnet = $(this).find('span').hasClass("berechnet");

        var berechnetAnchor = $(this).find('span.berechnet a').hasClass("tooltip_formula_show");
        //console.log(this);
        var mst_id = 'mst_' + rowData[0];

        var getBerechnetFormula = $(this).find('td span.berechnet').attr('data-id');

        if (berechnet == true) {

            /*16-03-2020, 18-03-2020 button enable check if anchor exist*/

            var setBerechneteMstID = $('#berechneteMstID').val(mst_id);

            $('.FormelEditiernBtnDiv button#FormelEditiernBtn').prop('disabled', false);

            $('.FormelEditiernBtnDiv .berechnetFormula').val(btoa(getBerechnetFormula));

            /*16-03-2020, 18-03-2020 button enable check if anchor exist*/
        } else {
            $('.FormelEditiernBtnDiv button#FormelEditiernBtn').prop('disabled', true);
        }
        //console.log(getFormula);
    });

    $('.FormelEditiernBtnDiv #FormelEditiernBtn').on('click', function(e) {
        var berechnetFormula = $('.FormelEditiernBtnDiv .berechnetFormula').val();
        //alert(berechnetFormula);
        var decryptBerechnetFormula = atob(berechnetFormula);
        //alert(decryptBerechnetFormula);
        $('#formelStringDarstellung').val(decryptBerechnetFormula);

    });
    /*06-03-2020-09-03-2020,16-03-2020  on click enable formelEditor button*/

    /*23-03-2020  on click edit button append data into form textbox */
    $("body").on("click", "#tblGetStatischeKorrekturfaktoren tbody tr .korrekturFaktorMenuEdit", function(e) {
        e.preventDefault();
        $("#btnOptionHinzEPrdKffUpdate").show();
        $("#btnOptionHinzEPrdKffStornieren").show();
        $("#kFeSpeichern").hide();
        $("#kFeHinz").hide();
        $("#btnOptionHinzEPrdKff").hide();
        var parentRow = $(this).closest("tr");
        var ePrdIdStore = $(this).attr("data-id");
        var grpID = $(this).attr("grp-id");
        var rowData = tblGetStatischeKorrekturfaktoren.row(parentRow).data();

        $('#optionName').val(rowData[0]);
        $('#optionWert').val(rowData[1]);
        $('#optionDescription').val(rowData[2]);
        $('#ePrdIdStore').val(ePrdIdStore);
        $('#groupStaticCF').val(grpID);
        $("#groupStaticCFDiv").hide();
        $("#groupUpdateStaticCFDiv").hide();

    });
    /*23-03-2020  on click edit button append data into form textbox */

    /*25-03-2020 Corrector factor update record*/
    $("#btnOptionHinzEPrdKffUpdate").click(function() {
        var a = $("#optionName").val();
        var b = $("#optionWert").val();
        var c = $("#optionDescription").val();
        var d = $("#groupStaticCF").val();

        if (b != '') {
            var wertRep = b.replace(",", ".");
            var bComma = b.replace(".", ",");

            var bWithComma = bComma.split(',');
            var bVal = bWithComma[1];
            if (typeof bVal !== "undefined") {
                var bLength = bVal.length;
            } else {
                var bLength = bComma.length;
            }

            if (bLength > 4) {
                alert("Erlaube 4 Stellen nach dem Komma (,) Wert");
                return false;
            }
        }

        if (a != '' && b != '' && c != '' && d != '') {
            KorrekturFaktorEinfügenAktualisieren();
        } else {
            alert('Bitte geben Sie danach Text ein und klicken Sie auf Speichern!');
        }
    });
    /*25-03-2020 Corrector factor update record*/

    /*25-03-2020 Corrector factor delete record*/
    $("body").on("click", "#tblGetStatischeKorrekturfaktoren tbody tr .korrekturFaktorMenuDel", function(e) {
        e.preventDefault();
        var ePrdIdStore = $(this).attr("data-id");
        KorrekturFaktorEinfügenloschen(ePrdIdStore);
    });
    /*25-03-2020 Corrector factor delete record*/

    /*26-03-2020 Corrector factor cancel option after edit click */
    $("#btnOptionHinzEPrdKffStornieren").on("click", function() {
        $("#btnOptionHinzEPrdKffUpdate").hide();
        $("#btnOptionHinzEPrdKffStornieren").hide();
        $("#kFeSpeichern").show();
        $("#kFeHinz").show();
        $("#btnOptionHinzEPrdKff").show();
        $('#optionName').val("");
        $('#optionWert').val("");
        $('#optionDescription').val("");
        $('#ePrdIdStore').val("");
    });
    /*26-03-2020 Corrector factor cancel option after edit click */

});

/*27-04-2020 Group Management in static faktor module Add new link click event*/
$("#addNewGroupStaticCF").on('click', function() {
    $("#groupStaticCFDiv").show();
});
/*27-04-2020 Group Management in static faktor module Add new link click event*/

/*27-04-2020 Group Management in static faktor module Cancel button click event*/
$("#cancelNewGroupTxtStaticCF").on('click', function() {
    $("#groupStaticCFDiv").hide();
    $("#addNewGroupTxtStaticCF").val("");
    $("#groupStaticCF").val("");
});
/*27-04-2020 Group Management in static faktor module Cancel button click event*/

/*27-04-2020 Group Management in static faktor module create new button click event*/
$("#createNewGroupTxtStaticCF").on('click', function() {
    var grpInput = $("#addNewGroupTxtStaticCF").val();
    if (grpInput != '') {
        KorrekturFaktorEinfügenGruppenSpeichern();
    } else {
        alert('Bitte füllen Sie das Gruppentextfeld aus und klicken Sie erneut auf die Schaltfläche Erstellen!');
    }
});
/*27-04-2020 Group Management in static faktor module create new button click event*/


/*28-04-2020 Group Management in static faktor module top menu click event*/
$("#korrekturFaktorMenu").on('click', function() {
    getKorrekturFaktorEinfügenGruppen();
});
/*28-04-2020 Group Management in static faktor module top menu click event*/

/*29-04-2020 Group Management in static faktor module on change group event*/
$("#groupStaticCF").on('change', function() {
    var groupStaticCFVal = $(this).val();
    if (groupStaticCFVal != '') {
        getStatischeKorrekturfaktoren(groupStaticCFVal);
        var groupStaticCFtxtVal = $(this).find('option:selected').text();
        $("#updateGroupTxtStaticCF").val(groupStaticCFtxtVal);
        $("#updateGroupSelIDStaticCF").val(groupStaticCFVal);
        //$('#groupUpdateStaticCFDiv').show();
    } else {
        getStatischeKorrekturfaktoren();
        $("#updateGroupTxtStaticCF").val('');
        $("#updateGroupSelIDStaticCF").val('');
        $('#groupUpdateStaticCFDiv').hide();
    }
});
/*29-04-2020 Group Management in static faktor module on change group event*/

/*06-05-2020 Group Management in static faktor module Cancel button click event for update*/
$("#cancelGroupBtnStaticCF").on('click', function() {
    $("#updateGroupTxtStaticCF").val('');
    $("#updateGroupSelIDStaticCF").val('');
    $('#groupUpdateStaticCFDiv').hide();
    //$('#groupStaticCF').val('');
});
/*06-05-2020 Group Management in static faktor module Cancel button click event for update*/

/*06-05-2020 Group Management in static faktor module update button click event*/
$("#updateGroupBtnStaticCF").on('click', function() {
    updateKorrekturFaktorEinfügenGruppen();
});
/*06-05-2020 Group Management in static faktor module  update button click event*/

/*06-05-2020 Group Management in static faktor module delete button click event*/
$("#deleteGroupBtnStaticCF").on('click', function() {
    korrekturFaktorEinfügenGruppenloschen();
});
/*06-05-2020 Group Management in static faktor module delete button click event*/

/*08-05-2020 Group Management in static faktor module delete button click event*/
$("#kFeHinz").on('click', function() {
    $("#optionName").val("");
    $("#optionWert").val("");
    $("#optionDescription").val("");
    $(".groupStaticCF").val("");
    $("#updateGroupTxtStaticCF").val("");
    $("#updateGroupSelIDStaticCF").val("");
    $("#addNewGroupTxtStaticCF").val("");
    $("#groupStaticCFDiv").hide();
    $("#groupUpdateStaticCFDiv").hide();
    tblOptionenEPrdKff.rows().remove().draw();
    getStatischeKorrekturfaktoren();
});
/*08-05-2020 Group Management in static faktor module delete button click event*/

/*14-05-2020 edit functionality for the static korrektur faktor*/
$("#editGroupStaticCF").on('click', function() {
    var groupStaticCFVal = $('#groupStaticCF').val();
    if (groupStaticCFVal != '') {
        $("#groupUpdateStaticCFDiv").show();
    } else {
        $("#groupUpdateStaticCFDiv").hide();
        alert('Please select group value first to update');
    }
});
/*14-05-2020 edit functionality for the static korrektur faktor*/



function isFloat(n) {
    return parseFloat(n.match(/^-?\d*(\.\d+)?$/)) > 0;
}


//DYNAMIC KORREKTOR FAKTOR START

/*02-04-2020 on change select box open next input*/
$( document ).ready(function() {

$(".typeDynamicCF").change(function() {
    //console.log($(this).val());
    $("#subtypeTimeDynamicCF").val("");
    $('#tblOptionenEPrdDKff').parents('div.dataTables_wrapper').first().hide();
    var selVal = $(this).val();
    if(selVal =='Zeit'){
        console.log('Zeit');
        $(".subtypeTimeDynamicCF option.zeitOption").show();
        $(".subtypeTimeDynamicCF option.temperaturOption").hide();
        $(".subtypeTimeDynamicCF").prop('disabled', false);

        $(".subtypeTxtBasisFaktor2").hide();
        $(".subtypeTxtBasisFaktor3").hide();
        $(".subtypeTxtDynamicCF").hide();
        $(".subtypeTimeDynamicCF").val("");
        $(".auswahlTypierungFaktorDKff").val("");
        $(".subtypeTimeDynamicCF option.zeitOption").show();
        $(".subtypeTimeDynamicCF option.temperaturOption").hide();

        $("#subtypeTxtBasisFaktor2Name").val("");
        $(".subtypeTxtBasisFaktor2Calc").val("");
        $("#subtypeTxtBasisFaktor2Wert").val("");
        $("#subtypeTxtBasisFaktor3Name").val("");
        $(".subtypeTxtBasisFaktor3Calc").val("");
        $("#subtypeTxtBasisFaktor3Wert").val("");
        $("#subtypeTxtOptNameDKff").val("");
        $("#subtypeTxtoptzBezugDkff").val("");
        $("#subtypeTxtoptzTempDkff").val("");
        $("#subtypeTxtoptzFaktoreDkff").val("");
        $(".subtypeTxtDynamicCFRow2").hide();

        $(".formatDynamicBezugRow1 .formatDynamicSelOptRow1 option.zeitOption").show();
        $(".formatDynamicBezugRow1 .formatDynamicSelOptRow1  option.temperaturOption").hide();

        $(".formatDynamicBezugRow2 .formatDynamicSelOptRow2 option.zeitOption").show();
        $(".formatDynamicBezugRow2 .formatDynamicSelOptRow2  option.temperaturOption").hide();
        $(".calculationTypeDiv").hide();
        $(".calculationTypeDKff").val("");


    }else if(selVal =='Temperatur'){
        $(".subtypeTimeDynamicCF option.zeitOption").hide();
        $(".subtypeTimeDynamicCF option.temperaturOption").show();
        $(".subtypeTimeDynamicCF").prop('disabled', false);

        $(".subtypeTxtBasisFaktor2").hide();
        $(".subtypeTxtBasisFaktor3").hide();
        $(".subtypeTxtDynamicCF").hide();
        $(".subtypeTimeDynamicCF").val("");
        $(".auswahlTypierungFaktorDKff").val("");
        $(".subtypeTimeDynamicCF option.zeitOption").hide();
        $(".subtypeTimeDynamicCF option.temperaturOption").show();

        $("#subtypeTxtBasisFaktor2Name").val("");
        $(".subtypeTxtBasisFaktor2Calc").val("");
        $("#subtypeTxtBasisFaktor2Wert").val("");
        $("#subtypeTxtBasisFaktor3Name").val("");
        $(".subtypeTxtBasisFaktor3Calc").val("");
        $("#subtypeTxtBasisFaktor3Wert").val("");
        $("#subtypeTxtOptNameDKff").val("");
        $("#subtypeTxtoptzBezugDkff").val("");
        $("#subtypeTxtoptzTempDkff").val("");
        $("#subtypeTxtoptzFaktoreDkff").val("");
        $(".subtypeTxtDynamicCFRow2").hide();

        $(".formatDynamicBezugRow1 .formatDynamicSelOptRow1 option.zeitOption").hide();
        $(".formatDynamicBezugRow1 .formatDynamicSelOptRow1  option.temperaturOption").show();

        $(".formatDynamicBezugRow2 .formatDynamicSelOptRow2 option.zeitOption").hide();
        $(".formatDynamicBezugRow2 .formatDynamicSelOptRow2  option.temperaturOption").show();

        $(".calculationTypeDiv").hide();
        $(".calculationTypeDKff").val("");
    }else{
        //console.log('Other');
        //$(".subtypeTimeDynamicCF").hide();
        $(".subtypeTxtBasisFaktor2").hide();
        $(".subtypeTxtBasisFaktor3").hide();
        $(".subtypeTxtDynamicCF").hide();
        $(".subtypeTimeDynamicCF").val("");
        $(".subtypeTimeDynamicCF").prop("disabled","disabled");
        $(".auswahlTypierungFaktorDKff").val("");
        $(".subtypeTimeDynamicCF option.zeitOption").hide();
        $(".subtypeTimeDynamicCF option.temperaturOption").hide();

        $("#subtypeTxtBasisFaktor2Name").val("");
        $(".subtypeTxtBasisFaktor2Calc").val("");
        $("#subtypeTxtBasisFaktor2Wert").val("");
        $("#subtypeTxtBasisFaktor3Name").val("");
        $(".subtypeTxtBasisFaktor3Calc").val("");
        $("#subtypeTxtBasisFaktor3Wert").val("");
        $("#subtypeTxtOptNameDKff").val("");
        $("#subtypeTxtoptzBezugDkff").val("");
        $("#subtypeTxtoptzTempDkff").val("");
        $("#subtypeTxtoptzFaktoreDkff").val("");
        $(".formatDynamicBezugRow1 .formatDynamicSelOptRow1 option.zeitOption").hide();
        $(".formatDynamicBezugRow1 .formatDynamicSelOptRow1  option.temperaturOption").hide();

        $(".formatDynamicBezugRow2 .formatDynamicSelOptRow2 option.zeitOption").hide();
        $(".formatDynamicBezugRow2 .formatDynamicSelOptRow2  option.temperaturOption").hide();
        $(".calculationTypeDiv").hide();
        $(".calculationTypeDKff").val("");
    }
});

$(".subtypeTimeDynamicCF").change(function() {
    //console.log($(this).val());
    $("#subtypeTxtoptzBezugDkff").val("");

    var auswahlTypierung = $(".auswahlTypierungFaktorDKff").val();
    $("#basicFaktorRow1 input").val("");
    $("#basicFaktorRow2 input").val("");
    $("#basicFaktorRow3 input").val("");
    $("#basicFaktorRow4 input").val("");

    $(".subtypeTxtBasisFaktor2").hide();
    $(".subtypeTxtBasisFaktor3").hide();
    $(".subtypeTxtDynamicCF").hide();
    $(".subtypeTxtDynamicCFRow2").hide();
    $(".auswahlTypierungFaktorDKff").val("");
    $(".calculationTypeDiv").hide();
    $(".calculationTypeDKff").val("");
    $('#tblOptionenEPrdDKff').parents('div.dataTables_wrapper').first().hide();
    var selVal = $(this).val();
    var typ = $('.typeDynamicCF').val();
    addValidateClassOnFormatDynamicSelection(selVal);
});

});


/*06-04-2020 Crete dynamic correction factor options add more functionality*/
$("#btnOptionHinzEPrdDKff").click(function() {

    var type = $( ".typeDynamicCF option:selected" ).val();
    var format = $( ".subtypeTimeDynamicCF option:selected" ).val();
    var name =$("#subtypeTxtOptNameDKff").val();
    var bezug =$("#subtypeTxtoptzBezugDkff").val();
    var temprature =$("#subtypeTxtoptzTempDkff").val();

    var faktore =$("#subtypeTxtoptzFaktoreDkff").val();

    var typeVal =$(".auswahlTypierungFaktorDKff").val();

    var basisFktr1Name ='';
    var basisFktr1Calc ='';
    var basisFktr1Wert ='';

    var basisFktr2Name =$("#subtypeTxtBasisFaktor2Name").val();
    var basisFktr2Calc =$(".subtypeTxtBasisFaktor2Calc").val();
    var basisFktr2Wert =$("#subtypeTxtBasisFaktor2Wert").val();

    var basisFktr3Name =$("#subtypeTxtBasisFaktor3Name").val();
    var basisFktr3Calc =$(".subtypeTxtBasisFaktor3Calc").val();
    var basisFktr3Wert =$("#subtypeTxtBasisFaktor3Wert").val();

    var basisFktr2CalcRght =$(".subtypeTxtBasisFaktor2CalcRght").val();
    var basisFktr3CalcRght =$(".subtypeTxtBasisFaktor3CalcRght").val();

    var result1 = '';

    /*02-06-2020 Faktor 4 functionality*/
    var name2 =$("#subtypeTxtOptNameDKff2").val();
    var bezug2 =$("#subtypeTxtoptzBezugDkff2").val();
    var temprature2 =$("#subtypeTxtoptzTempDkff2").val();
    var faktore2 =$("#subtypeTxtoptzFaktoreDkff2").val();
    var formatDynamicRow1 =$(".formatDynamicSelOptRow1").val();
    var formatDynamicRow2 =$(".formatDynamicSelOptRow2").val();

    var formatDynamicRowTxt1 =$(".formatDynamicSelOptRow1 option:selected").text();
    var formatDynamicRowTxt2 =$(".formatDynamicSelOptRow2 option:selected").text();

    /*20-08-2020 BereichName and BereichID popup variable define*/
    var BereichName =$("#messstellenCatName").val();
    var BereichID =$("#messstellenBerecheID").val();
    var BereichName2 =$("#messstellenCatName2").val();
    var BereichID2 =$("#messstellenBerecheID2").val();
    /*20-08-2020 BereichName and BereichID popup variable define*/

    /*02-06-2020 Faktor 4 functionality*/
    /*dynamische Korrekturfaktoren mm 26-02-2021*/
    /*new-mm-start*/

    if(basisFktr2Wert == "" || basisFktr2Wert == null || basisFktr2Wert == 0){
        alert("Wert sollte nicht null sein");
        $("#subtypeTxtBasisFaktor3Wert").val("");
        return false;
    }
    /*else if(basisFktr2Wert < 0 || basisFktr2Wert == null){
        alert("Wert sollte nicht negativ sein");
        $('#optionWert').val("");
        return false;
    }*/
    /*new-mm-end*/

    var calculationType = $(".calculationTypeDKff").val();
     if(typeVal =='1' || typeVal =='4' || typeVal =='5' || typeVal =='6' || typeVal =='7' || typeVal =='8' || typeVal =='9'){

            if(faktore !=''){
                var faktoreRep = faktore.replace(",", ".");

                var faktore1Comma = faktore.replace(".", ",");

                var faktoreWithComma = faktore1Comma.split(',');
                var factorVal = faktoreWithComma[1];
                if(typeof factorVal !== "undefined" ){
                    var factorLength = factorVal.length;
                }else{
                    var factorLength = faktore1Comma.length;
                }

                if(factorLength >4 && isFloat(faktore) ==false){
                    alert("Erlaube 4 Stellen nach dem Komma (,) Wert");
                    return false;
                }
            }
            if(faktore2 !=''){
                var faktore2Rep = faktore2.replace(",", ".");

                var faktore2Comma = faktore2.replace(".", ",");

                var faktore2WithComma = faktore2Comma.split(',');
                var faktore2Val = faktore2WithComma[1];
                if(typeof faktore2Val !== "undefined" ){
                    var faktore2Length = faktore2Val.length;
                }else{
                    var faktore2Length = faktore2Comma.length;
                }

                if(faktore2Length >4 && isFloat(faktore2) ==false){
                    alert("Erlaube 4 Stellen nach dem Komma (,) Wert");
                    return false;
                }
              }
                var faktore3RepType5 = faktore2.replace(",", ".");
                var basisFktr3WertRepType5 = basisFktr3Wert.replace(",", ".");

                var faktore3CommaType5 = faktore2.replace(".", ",");
                var basisFktr3WertCommaType5 = basisFktr3Wert.replace(".", ",");

                if(faktore3RepType5 !='' && basisFktr3WertRepType5 !=''){
                    if(isFloat(faktore3RepType5)==true && isFloat(basisFktr3WertRepType5)==true){
                        var result3CommaDigitType5 = eval(faktore3RepType5 + basisFktr3Calc + basisFktr3WertRepType5);
                    }else{
                        alert("Bitte geben Sie den Textwert in faktore und wert ein");
                        return false;
                    }

                    var result3Type5 =result3CommaDigitType5.toFixed(4).replace(".", ",");
                }
                var faktore3WithCommaType5 = faktore3CommaType5.split(',');
                var factor3ValType5 = faktore3WithCommaType5[1];
                if(typeof factor3ValType5 !== "undefined" ){
                    var factor3LengthType5 = factor3ValType5.length;
                }else{
                    var factor3LengthType5 = faktore3CommaType5.length;
                }

                var basisFktr3WertWithCommaType5 = basisFktr3WertCommaType5.split(',');
                var basisFktr3WertValType5 = basisFktr3WertWithCommaType5[1];
                if(typeof basisFktr3WertValType5 !== "undefined" ){
                    var basisFktr3WertLengthType5 = basisFktr3WertValType5.length;
                }else{
                    var basisFktr3WertLengthType5 = basisFktr3WertCommaType5.length;
                }

                if(factor3LengthType5 >4 || basisFktr3WertLengthType5 >4){
                    alert("Erlaube 4 Stellen nach dem Komma (,) Wert");
                    return false;
                }

               /*Factor 6 get Start and End bezug*/
               var bezugStartTxt =$("#bezugStartTxt").val();
               var bezugEndTxt =$("#bezugEndTxt").val();
               var tempStartTxt =$("#tempStartTxt").val();
               var tempEndTxt =$("#tempEndTxt").val();

               /*Factor 8 get Start and End bezug*/
               var bezugStartTxt2 =$("#bezugStartTxt2").val();
               var bezugEndTxt2 =$("#bezugEndTxt2").val();
               var tempStartTxt2 =$("#tempStartTxt2").val();
               var tempEndTxt2 =$("#tempEndTxt2").val();

                var basisFktr2WertRepRght = basisFktr2Wert.replace(",", ".");
                var basisFktr2WertCommaRght = basisFktr2Wert.replace(".", ",");

               if( (typeVal =='5' ||  typeVal =='9' ) && calculationType ==1){
                     if(faktore3RepType5 !='' && basisFktr2WertRepRght !=''){
                        if(isFloat(faktore3RepType5)==true && isFloat(basisFktr2WertRepRght)==true){
                            var resultCalcRght = eval(faktore3RepType5 + basisFktr2CalcRght + basisFktr2WertRepRght);
                        }else{
                            alert("Bitte geben Sie den Textwert in faktore und wert ein");
                            return false;
                        }
                    var resultCalcRghtFinal =resultCalcRght.toFixed(4).replace(".", ",");
                    //alert('resultCalcRghtFinal1='+resultCalcRghtFinal);
                   }
               }else if( (typeVal =='5' ||  typeVal =='9' ) && calculationType ==2){
                    if(faktoreRep !='' && basisFktr3WertRepType5 !='' && basisFktr3CalcRght !=''){
                        if(isFloat(faktoreRep)==true && isFloat(basisFktr3WertRepType5)==true){
                            var resultCalcRght = eval(faktoreRep + basisFktr3CalcRght + basisFktr3WertRepType5);
                        }else{
                            alert("Bitte geben Sie den Textwert in faktore und wert ein");
                            return false;
                        }
                    var resultCalcRghtFinal =resultCalcRght.toFixed(4).replace(".", ",");
                    //alert('resultCalcRghtFinal2='+resultCalcRghtFinal);
                   }
               }else if( (typeVal =='5' ||  typeVal =='9' ) && calculationType ==3){
                    if(basisFktr2WertRepRght !='' && basisFktr3WertRepType5 !='' && basisFktr2CalcRght !=''){
                        if(isFloat(basisFktr2WertRepRght)==true && isFloat(basisFktr3WertRepType5)==true){
                            var resultCalcRght = eval(basisFktr2WertRepRght + basisFktr2CalcRght + basisFktr3WertRepType5);
                        }else{
                            alert("Bitte geben Sie den Textwert in faktore und wert ein");
                            return false;
                        }
                    var resultCalcRghtFinal =resultCalcRght.toFixed(4).replace(".", ",");
                    //alert('resultCalcRghtFinal3='+resultCalcRghtFinal);
                   }
               }
        }
       if(basisFktr2Wert !='' && basisFktr2Calc !='' && faktore !=''){

            var faktoreRep = faktore.replace(",", ".");
            var basisFktr2WertRep = basisFktr2Wert.replace(",", ".");

            var faktore2Comma = faktore.replace(".", ",");
            var basisFktr2WertComma = basisFktr2Wert.replace(".", ",");
            /*alert(isFloat(faktoreRep));alert(isFloat(basisFktr2WertRep));*/
            if(isFloat(faktoreRep)==true && isFloat(basisFktr2WertRep)==true){
                var result2CommaDigit = eval(faktoreRep + basisFktr2Calc + basisFktr2WertRep);
            }else{
                alert("Bitte geben Sie den Textwert in faktore und wert ein");
                return false;
            }
            var result2 = result2CommaDigit.toFixed(4).replace(".", ",");

            var faktoreWithComma = faktore2Comma.split(',');
            var factorVal = faktoreWithComma[1];
            if(typeof factorVal !== "undefined" ){
                var factorLength = factorVal.length;
            }else{
                var factorLength = faktore2Comma.length;
            }

            var basisFktrWertWithComma = basisFktr2WertComma.split(',');
            var basisFktrWertVal = basisFktrWertWithComma[1];
            if(typeof basisFktrWertVal !== "undefined" ){
                var basisFktrWertLength = basisFktrWertVal.length;
            }else{
                var basisFktrWertLength = basisFktr2WertComma.length;
            }

            if(factorLength >4 || basisFktrWertLength >4){
                alert("Erlaube 4 Stellen nach dem Komma (,) Wert");
                return false;
            }
    }


    if(basisFktr3Wert !='' && basisFktr3Calc !='' && faktore !='' && typeVal !='5'){

            var faktore3Rep = faktore.replace(",", ".");
            var basisFktr3WertRep = basisFktr3Wert.replace(",", ".");

            var faktore3Comma = faktore.replace(".", ",");
            var basisFktr3WertComma = basisFktr3Wert.replace(".", ",");
            if(isFloat(faktore3Rep)==true && isFloat(basisFktr3WertRep)==true){
                var result3CommaDigit = eval(faktore3Rep + basisFktr3Calc + basisFktr3WertRep);
            }else{
                alert("Bitte geben Sie den Textwert in faktore und wert ein");
                return false;
            }
            var result3 =result3CommaDigit.toFixed(4).replace(".", ",");

            var faktore3WithComma = faktore3Comma.split(',');
            var factor3Val = faktore3WithComma[1];
            if(typeof factor3Val !== "undefined" ){
                var factor3Length = factor3Val.length;
            }else{
                var factor3Length = faktore3Comma.length;
            }

            var basisFktr3WertWithComma = basisFktr3WertComma.split(',');
            var basisFktr3WertVal = basisFktr3WertWithComma[1];
            if(typeof basisFktr3WertVal !== "undefined" ){
                var basisFktr3WertLength = basisFktr3WertVal.length;
            }else{
                var basisFktr3WertLength = basisFktr3WertComma.length;
            }

            if(factor3Length >4 || basisFktr3WertLength >4){
                alert("Erlaube 4 Stellen nach dem Komma (,) Wert");
                return false;
            }
    }

    var a = $("#optionNameDKff").val();
    var b = $("#optionBeschreibungDKff").val();

    var yearVal = $(".yearBezugValidate").val();
    if(yearVal){
        var yearRegex = /^\s*((?:19|20)\d{2})\s*$/;
        if (!yearRegex.test(yearVal)) {
            alert('Bitte geben Sie ein gültiges Jahr ein (Beispiel 2020)');
            return false;
        }
    }

    var monthVal = $(".monthBezugValidate").val();
    if(monthVal){
        var regexMonth = /^\s*(1[012]|0?[1-9])\s*$/;
        if (!regexMonth.test(monthVal)) {
            alert('Bitte geben Sie einen gültigen Monat ein (Beispiel 01)');
            return false;
        }
    }

    var month2Val = $(".monthBezug2Validate").val();
    if(month2Val){
        var regexMonth = /^\s*(1[012]|0?[1-9])\s*$/;
        if (!regexMonth.test(month2Val)) {
            alert('Bitte geben Sie einen gültigen Monat ein (Beispiel 01)');
            return false;
        }
    }

    var monthYearVal = $(".monthYearBezugValidate").val();
    if(monthYearVal){
        var monthYearRegex = /^\s*(1[012]|0?[1-9])\.((?:19|20)\d{2})\s*$/;
        if (!monthYearRegex.test(monthYearVal)) {
            alert('Bitte geben Sie ein gültiges Monat Jahr ein (Beispiel 01.2020)');
            return false;
        }
    }

    var dayVal = $(".dayBezugValidate").val();
    if(dayVal){
        var dayRegex = /^\s*(3[01]|[12][0-9]|0?[1-9])\.(1[012]|0?[1-9])\.((?:19|20)\d{2})\s*$/;
        if (!dayRegex.test(dayVal)) {
            alert('Bitte geben Sie einen gültigen Tag ein (Beispiel 01.01.2020)');
            return false;
        }
    }

    var dayMonthVal = $(".dayMonthBezugValidate").val();
    if(dayMonthVal){
        var dayMonthRegex = /^\s*(3[01]|[12][0-9]|0?[1-9])\.(1[012]|0?[1-9])\s*$/;
        if (!dayMonthRegex.test(dayMonthVal)) {
            alert('Bitte geben Sie einen gültigen Monat Monat ein (Beispiel 02.01)');
            return false;
        }
    }

    /*Row 2 faktor 4 functionality*/
    var year2Val = $(".yearBezug2Validate").val();
    if(year2Val){
        var year2Regex = /^\s*((?:19|20)\d{2})\s*$/;
        if (!year2Regex.test(year2Val)) {
            alert('Bitte geben Sie ein gültiges Jahr ein (Beispiel 2020)');
            return false;
        }
    }

    var month2Val = $(".monthBezug2Validate").val();
    if(month2Val){
        var regex2Month = /^\s*(1[012]|0?[1-9])\s*$/;
        if (!regex2Month.test(month2Val)) {
            alert('Bitte geben Sie einen gültigen Monat ein (Beispiel 01)');
            return false;
        }
    }

    var monthYear2Val = $(".monthYearBezug2Validate").val();
    if(monthYear2Val){
        var monthYear2Regex = /^\s*(1[012]|0?[1-9])\.((?:19|20)\d{2})\s*$/;
        if (!monthYear2Regex.test(monthYear2Val)) {
            alert('Bitte geben Sie ein gültiges Monat Jahr ein (Beispiel 01.2020)');
            return false;
        }
    }

    var day2Val = $(".dayBezug2Validate").val();
    if(day2Val){
        var day2Regex = /^\s*(3[01]|[12][0-9]|0?[1-9])\.(1[012]|0?[1-9])\.((?:19|20)\d{2})\s*$/;
        if (!day2Regex.test(day2Val)) {
            alert('Bitte geben Sie einen gültigen Tag ein (Beispiel 01.01.2020)');
            return false;
        }
    }

    var dayMonth2Val = $(".dayMonthBezug2Validate").val();
    if(dayMonth2Val){
        var dayMonth2Regex = /^\s*(3[01]|[12][0-9]|0?[1-9])\.(1[012]|0?[1-9])\s*$/;
        if (!dayMonth2Regex.test(dayMonth2Val)) {
            alert('Bitte geben Sie einen gültigen Monat Monat ein (Beispiel 02.01)');
            return false;
        }
    }


    if(a !='' && b !='' && type !='' && format !='' && name !='' && faktore !='' && typeVal =='1' && BereichName !=''){
            var rowNode = tblOptionenEPrdDKff.row.add([name,bezug,temprature,'','','','',faktore,basisFktr1Name,basisFktr1Calc,basisFktr1Wert,result1,formatDynamicRow1,BereichName]).draw().node();
            $( rowNode ).attr('bereich_id',BereichID);
            addMoreAfterResetDynamischeKorrekturFktor();

    }else if(a !='' && b !='' && type !='' && format !='' && name !='' && faktore2Comma !='' && typeVal =='2' && basisFktr2Name !='' && basisFktr2Calc !='' && basisFktr2Wert !='' && result2 !='' && BereichName !=''){
            var rowNode = tblOptionenEPrdDKff.row.add([name,bezug,temprature,'','','','',faktore2Comma,basisFktr2Name,basisFktr2Calc,basisFktr2WertComma,result2,formatDynamicRow1,BereichName]).draw().node();
            $( rowNode ).attr('bereich_id',BereichID);
            addMoreAfterResetDynamischeKorrekturFktor();

    }else if(a !='' && b !='' && type !='' && format !='' && name !='' && faktore !='' && typeVal =='3' && basisFktr2Name !='' && basisFktr2Calc !='' && basisFktr2Wert !='' && result2 !='' && basisFktr3Name !='' && basisFktr3Calc !='' && basisFktr3Wert !='' && result3 !='' && BereichName !=''){
            var rowNodeTbl1 =tblOptionenEPrdDKff.row.add([name,bezug,temprature,'','','','',faktore2Comma,basisFktr2Name,basisFktr2Calc,basisFktr2WertComma,result2,formatDynamicRow1,BereichName]).draw().node();
            var rowNodeTbl2 = tblOptionenEPrdDKff.row.add([name,bezug,temprature,'','','','',faktore3Comma,basisFktr3Name,basisFktr3Calc,basisFktr3WertComma,result3,formatDynamicRow2,BereichName]).draw().node();
            $( rowNodeTbl1 ).attr('bereich_id',BereichID);
            $( rowNodeTbl2 ).attr('bereich_id',BereichID);
            addMoreAfterResetDynamischeKorrekturFktor();

    }else if(a !='' && b !='' && type !='' && format !='' && name !='' && faktore !='' && typeVal =='1' && BereichName !=''){
            var rowNode = tblOptionenEPrdDKff.row.add([name,bezug,temprature,'','','','',faktore,basisFktr1Name,basisFktr1Calc,basisFktr1Wert,result1,formatDynamicRow1,BereichName]).draw().node();
            $( rowNode ).attr('bereich_id',BereichID);
            addMoreAfterResetDynamischeKorrekturFktor();

    }else if(a !='' && b !='' && type !='' && format !='' && name !='' && faktore !='' && name2 !='' && faktore2 !='' && typeVal =='4' && formatDynamicRow1 !='' && formatDynamicRow2 !='' && BereichName !='' && BereichName2 !=''){
            var rowNodeTbl1 = tblOptionenEPrdDKff.row.add([name,bezug,temprature,'','','','',faktore,basisFktr1Name,basisFktr1Calc,basisFktr1Wert,result1,formatDynamicRowTxt1,BereichName]).draw().node();
            var rowNodeTbl2 = tblOptionenEPrdDKff.row.add([name2,bezug2,temprature2,'','','','',faktore2,basisFktr1Name,basisFktr1Calc,basisFktr1Wert,result1,formatDynamicRowTxt2,BereichName2]).draw().node();
            $( rowNodeTbl1 ).attr('data-type',formatDynamicRow1).attr('bereich_id',BereichID);
            $( rowNodeTbl2 ).attr('data-type',formatDynamicRow2).attr('bereich_id',BereichID2);
            addMoreAfterResetDynamischeKorrekturFktor();
    }else if(a !='' && b !='' && type !='' && format !='' && name !='' && name2 !='' && faktore2Comma !='' && faktore3CommaType5 !='' && typeVal =='5' && calculationType !='' && calculationType==1 && basisFktr2Name !='' && basisFktr2Calc !='' && basisFktr2WertComma !='' && result2 !='' && basisFktr2CalcRght !='' && BereichName !='' && BereichName2 !=''){
                //alert(calculationType);alert(faktore);alert(faktore2);
            var rowNodeTbl1 = tblOptionenEPrdDKff.row.add([name,bezug,temprature,'','','','',faktore1Comma,basisFktr2Name,basisFktr2Calc,basisFktr2WertComma,result2,formatDynamicRowTxt1,BereichName]).draw().node();
            var rowNodeTbl2 = tblOptionenEPrdDKff.row.add([name2,bezug2,temprature2,'','','','',faktore3CommaType5,'-','-','-','-',formatDynamicRowTxt2,BereichName2]).draw().node();

            $( rowNodeTbl1 ).attr('data-type',formatDynamicRow1).attr('bereich_id',BereichID);
            $( rowNodeTbl2 ).attr('data-type',formatDynamicRow2).attr('bereich_id',BereichID2);

            pushArrayforTheResultArr(basisFktr2CalcRght,resultCalcRghtFinal);
            var rowData1 = tblOptionenEPrdDKff.row( rowNodeTbl2 );
            rowData1.child( tblOptionenEPrdDKffFormat(basisFktr2CalcRght,resultCalcRghtFinal) ).show();
            addMoreAfterResetDynamischeKorrekturFktor();
    }else if(a !='' && b !='' && type !='' && format !='' && name !='' && name2 !='' && faktore2Comma !='' && faktore3CommaType5 !='' && typeVal =='5' && calculationType !='' && calculationType==2 && basisFktr3Name !='' && basisFktr3Calc !='' && basisFktr3WertCommaType5 !='' && result3Type5 !='' && basisFktr3CalcRght !='' && BereichName !='' && BereichName2 !=''){
            var rowNodeTbl1 = tblOptionenEPrdDKff.row.add([name2,bezug2,temprature2,'','','','',faktore3CommaType5,basisFktr3Name,basisFktr3Calc,basisFktr3WertCommaType5,result3Type5,formatDynamicRowTxt2,BereichName2]).draw().node();
            var rowNodeTbl2 = tblOptionenEPrdDKff.row.add([name,bezug,temprature,'','','','',faktore1Comma,'-','-','-','-',formatDynamicRowTxt1,BereichName]).draw().node();

            $( rowNodeTbl2 ).attr('data-type',formatDynamicRow2).attr('bereich_id',BereichID2);
            $( rowNodeTbl1 ).attr('data-type',formatDynamicRow1).attr('bereich_id',BereichID);

            pushArrayforTheResultArr(basisFktr3CalcRght,resultCalcRghtFinal);
            var rowData2 = tblOptionenEPrdDKff.row( rowNodeTbl2 );
            rowData2.child( tblOptionenEPrdDKffFormat(basisFktr3CalcRght,resultCalcRghtFinal) ).show();
            addMoreAfterResetDynamischeKorrekturFktor();
    }else if(a !='' && b !='' && type !='' && format !='' && name !='' && name2 !='' && faktore2Comma !='' && faktore3CommaType5 !='' && typeVal =='5' && calculationType !='' && calculationType==3 && basisFktr2Name !='' && basisFktr2Calc !='' && basisFktr2WertComma !='' && result2 !='' && basisFktr3Name !='' && basisFktr3Calc !='' && basisFktr3WertCommaType5 !='' && result3Type5 !='' && basisFktr2CalcRght !='' && BereichName !='' && BereichName2 !=''){
            var rowNodeTbl1 = tblOptionenEPrdDKff.row.add([name,bezug,temprature,'','','','',faktore1Comma,basisFktr2Name,basisFktr2Calc,basisFktr2WertComma,result2,formatDynamicRowTxt1,BereichName]).draw().node();
            var rowNodeTbl2 = tblOptionenEPrdDKff.row.add([name2,bezug2,temprature2,'','','','',faktore3CommaType5,basisFktr3Name,basisFktr3Calc,basisFktr3WertCommaType5,result3Type5,formatDynamicRowTxt2,BereichName2]).draw().node();
            $( rowNodeTbl1 ).attr('data-type',formatDynamicRow1).attr('bereich_id',BereichID);
            $( rowNodeTbl2 ).attr('data-type',formatDynamicRow2).attr('bereich_id',BereichID2);

             pushArrayforTheResultArr(basisFktr2CalcRght,resultCalcRghtFinal);
             var rowData3 = tblOptionenEPrdDKff.row( rowNodeTbl2 );
             rowData3.child( tblOptionenEPrdDKffFormat(basisFktr2CalcRght,resultCalcRghtFinal)).show();
             addMoreAfterResetDynamischeKorrekturFktor();
    }else if(a !='' && b !='' && type !='' && format !='' && name !='' && name2 !='' && faktore2Comma !='' && faktore3CommaType5 !='' && typeVal =='5' && calculationType !='' && calculationType==4 && BereichName !='' && BereichName2 !=''){
            var rowNodeTbl1 =  tblOptionenEPrdDKff.row.add([name,bezug,temprature,'','','','',faktore1Comma,'-','-','-','-',formatDynamicRowTxt1,BereichName]).draw().node();
            var rowNodeTbl2 = tblOptionenEPrdDKff.row.add([name2,bezug2,temprature2,'','','','',faktore3CommaType5,'-','-','-','-',formatDynamicRowTxt2,BereichName2]).draw().node();
            $( rowNodeTbl1 ).attr('data-type',formatDynamicRow1).attr('bereich_id',BereichID);
            $( rowNodeTbl2 ).attr('data-type',formatDynamicRow2).attr('bereich_id',BereichID2);

            $( rowNodeTbl2 ).removeAttr('data-result');
            $( rowNodeTbl2 ).removeAttr('data-calculate');
            addMoreAfterResetDynamischeKorrekturFktor();
    } else if(a !='' && b !='' && type !='' && format !='' && name !='' && faktore !='' /*&& bezugStartTxt !='' && bezugEndTxt !='' && tempStartTxt !='' && tempEndTxt !=''*/ && typeVal =='6' && BereichName !=''){
            ///alert('typeVal='+typeVal);
            validateStartEndInputBezugFaktorTypeBasicBetween(typeVal);
            if(validateStartEndInputBezugFaktorTypeBasicBetween(typeVal) ==true){
               var rowNode= tblOptionenEPrdDKff.row.add([name,bezug,temprature,bezugStartTxt,bezugEndTxt,tempStartTxt,tempEndTxt,faktore,basisFktr1Name,basisFktr1Calc,basisFktr1Wert,result1,formatDynamicRow1,BereichName]).draw().node();
              $( rowNode ).attr('bereich_id',BereichID);
                addMoreAfterResetDynamischeKorrekturFktor();
            }

    }else if(a !='' && b !='' && type !='' && format !='' && name !='' && faktore2Comma !='' && typeVal =='7' && basisFktr2Name !='' && basisFktr2Calc !='' && basisFktr2Wert !='' && result2 !='' && BereichName !=''){
            if(validateStartEndInputBezugFaktorTypeBasicBetween(typeVal) ==true){
                var rowNode= tblOptionenEPrdDKff.row.add([name,bezug,temprature,bezugStartTxt,bezugEndTxt,tempStartTxt,tempEndTxt,faktore2Comma,basisFktr2Name,basisFktr2Calc,basisFktr2WertComma,result2,'',BereichName]).draw().node();
                $( rowNode ).attr('bereich_id',BereichID);
                addMoreAfterResetDynamischeKorrekturFktor();
            }
    }else if(a !='' && b !='' && type !='' && format !='' && name !='' && faktore !='' && name2 !='' && faktore2 !='' && typeVal =='8' && formatDynamicRow1 !='' && formatDynamicRow2 !='' && BereichName !='' && BereichName2 !=''){
            //alert(validateStartEndInputBezugFaktorTypeBasicBetween(typeVal));
            if(validateStartEndInputBezugFaktorTypeBasicBetween(typeVal) ==true){
                var rowNodeTbl1 = tblOptionenEPrdDKff.row.add([name,bezug,temprature,bezugStartTxt,bezugEndTxt,tempStartTxt,tempEndTxt,faktore,'','','','',formatDynamicRowTxt1,BereichName]).draw().node();
                var rowNodeTbl2 = tblOptionenEPrdDKff.row.add([name2,bezug2,temprature2,bezugStartTxt2,bezugEndTxt2,tempStartTxt2,tempEndTxt2,faktore2,'','','','',formatDynamicRowTxt2,BereichName2]).draw().node();
                $( rowNodeTbl1 ).attr('data-type',formatDynamicRow1).attr('bereich_id',BereichID);
                $( rowNodeTbl2 ).attr('data-type',formatDynamicRow2).attr('bereich_id',BereichID2);
                addMoreAfterResetDynamischeKorrekturFktor();
            }
    }else if(a !='' && b !='' && type !='' && format !='' && name !='' && name2 !='' && faktore2Comma !='' && faktore3CommaType5 !='' && typeVal ==9 && calculationType !='' && calculationType==1 && basisFktr2Name !='' && basisFktr2Calc !='' && basisFktr2WertComma !='' && result2 !='' && basisFktr2CalcRght !='' && BereichName !='' && BereichName2 !=''){
                //alert(calculationType);alert(faktore);alert(faktore2);
           if(validateStartEndInputBezugFaktorTypeBasicBetween(typeVal) ==true){
                var rowNodeTbl1 = tblOptionenEPrdDKff.row.add([name,bezug,temprature,bezugStartTxt,bezugEndTxt,tempStartTxt,tempEndTxt,faktore2Comma,basisFktr2Name,basisFktr2Calc,basisFktr2WertComma,result2,formatDynamicRowTxt1,BereichName]).draw().node();
                var rowNodeTbl2 = tblOptionenEPrdDKff.row.add([name2,bezug2,temprature2,bezugStartTxt2,bezugEndTxt2,tempStartTxt2,tempEndTxt2,faktore3CommaType5,'-','-','-','-',formatDynamicRowTxt2,BereichName2]).draw().node();
                $( rowNodeTbl1 ).attr('data-type',formatDynamicRow1).attr('bereich_id',BereichID);
                $( rowNodeTbl2 ).attr('data-type',formatDynamicRow2).attr('bereich_id',BereichID2);

                pushArrayforTheResultArr(basisFktr2CalcRght,resultCalcRghtFinal);
                var rowData1 = tblOptionenEPrdDKff.row( rowNodeTbl2 );
                rowData1.child( tblOptionenEPrdDKffFormat(basisFktr2CalcRght,resultCalcRghtFinal)).show();
                addMoreAfterResetDynamischeKorrekturFktor();
            }
    }else if(a !='' && b !='' && type !='' && format !='' && name !='' && name2 !='' && faktore2Comma !='' && faktore3CommaType5 !='' && typeVal ==9 && calculationType !='' && calculationType==2 && basisFktr3Name !='' && basisFktr3Calc !='' && basisFktr3WertCommaType5 !='' && result3Type5 !='' && basisFktr3CalcRght !='' && BereichName !='' && BereichName2 !=''){
         if(validateStartEndInputBezugFaktorTypeBasicBetween(typeVal) ==true){
            var rowNodeTbl1 = tblOptionenEPrdDKff.row.add([name2,bezug2,temprature2,bezugStartTxt2,bezugEndTxt2,tempStartTxt2,tempEndTxt2,faktore3CommaType5,basisFktr3Name,basisFktr3Calc,basisFktr3WertCommaType5,result3Type5,formatDynamicRowTxt2,BereichName2]).draw().node();
            var rowNodeTbl2 = tblOptionenEPrdDKff.row.add([name,bezug,temprature,bezugStartTxt,bezugEndTxt,tempStartTxt,tempEndTxt,faktore2Comma,'-','-','-','-',formatDynamicRowTxt1,BereichName]).draw().node();

            $( rowNodeTbl2 ).attr('data-type',formatDynamicRow1).attr('bereich_id',BereichID);
            $( rowNodeTbl1 ).attr('data-type',formatDynamicRow2).attr('bereich_id',BereichID2);

            /*$( rowNodeTbl2 ).attr('data-result',resultCalcRghtFinal);
            $( rowNodeTbl2 ).attr('data-calculate',basisFktr3CalcRght);*/
            pushArrayforTheResultArr(basisFktr3CalcRght,resultCalcRghtFinal);
            var rowData2 = tblOptionenEPrdDKff.row( rowNodeTbl2 );
            rowData2.child( tblOptionenEPrdDKffFormat(basisFktr3CalcRght,resultCalcRghtFinal)).show();
            addMoreAfterResetDynamischeKorrekturFktor();
         }
    }else if(a !='' && b !='' && type !='' && format !='' && name !='' && name2 !='' && faktore2Comma !='' && faktore3CommaType5 !='' && typeVal ==9 && calculationType !='' && calculationType==3 && basisFktr2Name !='' && basisFktr2Calc !='' && basisFktr2WertComma !='' && result2 !='' && basisFktr3Name !='' && basisFktr3Calc !='' && basisFktr3WertCommaType5 !='' && result3Type5 !='' && basisFktr2CalcRght !='' && BereichName !='' && BereichName2 !=''){
         if(validateStartEndInputBezugFaktorTypeBasicBetween(typeVal) ==true){
            var rowNodeTbl1 = tblOptionenEPrdDKff.row.add([name,bezug,temprature,bezugStartTxt,bezugEndTxt,tempStartTxt,tempEndTxt,faktore2Comma,basisFktr2Name,basisFktr2Calc,basisFktr2WertComma,result2,formatDynamicRowTxt1,BereichName]).draw().node();
            var rowNodeTbl2 = tblOptionenEPrdDKff.row.add([name2,bezug2,temprature2,bezugStartTxt2,bezugEndTxt2,tempStartTxt2,tempEndTxt2,faktore3CommaType5,basisFktr3Name,basisFktr3Calc,basisFktr3WertCommaType5,result3Type5,formatDynamicRowTxt2,BereichName2]).draw().node();
            $( rowNodeTbl1 ).attr('data-type',formatDynamicRow1).attr('bereich_id',BereichID);
            $( rowNodeTbl2 ).attr('data-type',formatDynamicRow2).attr('bereich_id',BereichID2);

            /*$( rowNodeTbl2 ).attr('data-result',resultCalcRghtFinal);
            $( rowNodeTbl2 ).attr('data-calculate',basisFktr2CalcRght);*/
            pushArrayforTheResultArr(basisFktr2CalcRght,resultCalcRghtFinal);
            var rowData3 = tblOptionenEPrdDKff.row( rowNodeTbl2 );
            rowData3.child( tblOptionenEPrdDKffFormat(basisFktr2CalcRght,resultCalcRghtFinal)).show();

            addMoreAfterResetDynamischeKorrekturFktor();
        }
    }else if(a !='' && b !='' && type !='' && format !='' && name !='' && name2 !='' && faktore2Comma !='' && faktore3CommaType5 !='' && typeVal ==9 && calculationType !='' && calculationType==4 && BereichName !='' && BereichName2 !=''){
         if(validateStartEndInputBezugFaktorTypeBasicBetween(typeVal) ==true){
            var rowNodeTbl1 =  tblOptionenEPrdDKff.row.add([name,bezug,temprature,bezugStartTxt,bezugEndTxt,tempStartTxt,tempEndTxt,faktore2Comma,'-','-','-','-',formatDynamicRowTxt1,BereichName]).draw().node();
            var rowNodeTbl2 = tblOptionenEPrdDKff.row.add([name2,bezug2,temprature2,bezugStartTxt2,bezugEndTxt2,tempStartTxt2,tempEndTxt2,faktore3CommaType5,'-','-','-','-',formatDynamicRowTxt2,BereichName2]).draw().node();
            $( rowNodeTbl1 ).attr('data-type',formatDynamicRow1).attr('bereich_id',BereichID);
            $( rowNodeTbl2 ).attr('data-type',formatDynamicRow2).attr('bereich_id',BereichID2);

            $( rowNodeTbl2 ).removeAttr('data-result');
            $( rowNodeTbl2 ).removeAttr('data-calculate');
            addMoreAfterResetDynamischeKorrekturFktor();
         }
    }else{
            alert('Bitte alle Felder besetzen, und erneut Speichern!');
    }
 });
/*06-04-2020 Crete dynamic correction factor options add more functionality*/
/*$("#tblOptionenEPrdDKff tbody").on("dblclick", "tr", function() {
    tblOptionenEPrdDKff.row(this).remove().draw()
});*/

/*06-04-2020 on load jQuery call the numeric validation */
$( document ).ready(function() {
    jQuery(".DynamicKorrekturFaktorFrm .inp_valid").NumericOnly();
});

/*09-04-2020 Crete dynamic correction factor new button reset functionality*/
$("#DkFeHinz").click(function() {

        $("#optionNameDKff").val("");
        $("#optionBeschreibungDKff").val("");
        $(".typeDynamicCF").val("");
        $(".subtypeTimeDynamicCF").val("");
        $(".typeDynamicCF").prop('disabled', false);
        $(".subtypeTimeDynamicCF").prop('disabled', 'disabled');
        $(".auswahlTypierungFaktorDKff").prop('disabled', false);
        $("#subtypeTxtOptNameDKff").val("");
        $("#subtypeTxtoptzBezugDkff").val("");
        $("#subtypeTxtoptzTempDkff").val("");
        $("#subtypeTxtoptzFaktoreDkff").val("");
        $(".subtypeTxtDynamicCF").hide();
        $("#tblOptionenEPrdDKffNotify").hide();
        $(".calculationTypeDKff").prop('disabled', false);
        $(".calculationTypeDiv").hide();
        $(".sectionDynamicCF").show();
        //$(".subtypeTimeDynamicCF").hide();
        tblOptionenEPrdDKff.rows().remove().draw();
        tblGetDyanamicheKorrekturfaktoren.rows().remove().draw();
        $("#ePrdDMainIdStore").val("");
        $("#subtypeTxtBasisFaktor2Name").val("");
        $("#subtypeTxtBasisFaktor2Name").val("");
        $(".subtypeTxtBasisFaktor2Calc").val("");
        $("#subtypeTxtBasisFaktor2Wert").val("");
        $(".auswahlTypierungFaktorDKff").val("");
        $(".subtypeTxtBasisFaktor2").hide();
        $("#subtypeTxtBasisFaktor3Name").val("");
        $(".subtypeTxtBasisFaktor3Calc").val("");
        $("#subtypeTxtBasisFaktor3Wert").val("");
        $(".subtypeTxtBasisFaktor3").hide();
        /*$("#btnOptionHinzEPrdDKffUpdate").hide();
        $("#btnOptionHinzEPrdDKffStornieren").hide();
        $("#btnOptionHinzEPrdDKff").show();*/
        $(".formatDynamicBezugRow1").hide();
        $(".subtypeTxtDynamicCFRow2").hide();
        $(".formatDynamicBezugRow2").hide();
        $("#tempStartTxt").val("");
        $("#tempEndTxt").val("");
        $("#bezugStartTxt").val("");
        $("#bezugEndTxt").val("");
        $('#tblOptionenEPrdDKff').parents('div.dataTables_wrapper').first().hide();

        $('#tblGetDyanamicheKorrekturfaktoren').parents('div.dataTables_wrapper').first().hide();
        $('#saveOptType').val('');

        $('#ePrdDKFERow1ID').val('');
        $('#ePrdDKFERow2ID').val('');
        $('#updateOptType').val('');
     });
/*09-04-2020 Crete dynamic correction factor new button reset functionality*/

/*13-04-2020 Dynamic Correction factor add record row wise not quoma saperated*/
$("#DkFeSpeichern").click(function() {
    //alert('Call dynamischeKorrekturfaktorenSpeichern');
    $("#DkFeSpeichern").prop('disabled', true);
    dynamischeKorrekturfaktorenSpeichern();
});
/*13-04-2020 Dynamic Correction factor add record row wise not quoma saperated*/

/*14-04-2020  on click edit button append data into form textbox */
    $("body").on("click", "#tblGetDyanamicheKorrekturfaktoren tbody tr .dyanamicheKorrekturfaktorenMenuEdit", function (e) {
        e.preventDefault();
        $("#btnOptionHinzEPrdDKffUpdate").show();
        $("#btnOptionHinzEPrdDKffStornieren").show();
        $("#DkFeSpeichern").hide();
        $("#DkFeHinz").hide();
        $("#DkFeFirst").hide();
        $("#DkFePrevious").hide();
        $("#DkFeNext").hide();
        $("#DkFeLast").hide();
        $("#DkFeSuchen").hide();
        $("#btnOptionHinzEPrdDKff").hide();
        $("#basicFaktorRow1").show();
        $("#basicFaktorRow2").hide();
        $(".delReset").hide();
        var parentRow = $(this).closest("tr");
        var ePrddKffOptionIDStore = $(this).attr("data-id");
        var ePrdDOptIdStore = $(this).attr("data-id-parent");
        var formatDynamicType = $(this).closest("tr").attr("data-type");
        var ber_ID = $(this).attr("ber-id");
        //alert(formatDynamicType);
        var rowData = tblGetDyanamicheKorrekturfaktoren.row(parentRow).data();

         $('#subtypeTxtOptNameDKff').val(rowData[0]);
         $('#subtypeTxtoptzBezugDkff').val(rowData[1]);
         $('#subtypeTxtoptzTempDkff').val(rowData[2]);

         $('#bezugStartTxt').val(rowData[3]);
         $('#bezugEndTxt').val(rowData[4]);
         $('#tempStartTxt').val(rowData[5]);
         $('#tempEndTxt').val(rowData[6]);

         $('#subtypeTxtoptzFaktoreDkff').val(rowData[7]);
         $("#subtypeTxtBasisFaktor2Name").val(rowData[8]);
         $(".subtypeTxtBasisFaktor2Calc").val(rowData[9]);
         $("#subtypeTxtBasisFaktor2Wert").val(rowData[10]);

         $("#ePrddKffOptionIDStore").val(ePrddKffOptionIDStore);
         $('#ePrdDIdStore').val(ePrdDOptIdStore);
         $('.subtypeTxtBasisFaktor3').hide();
         $('#faktoreDynamictypeStore').val(formatDynamicType);
         var calculationTypeDKff = $('.calculationTypeDKff').val();
         var parentID = $(this).attr('data-id-parent');
         getSingleRecordDynamischeKorrekturfaktoren(parentID);

         $("#messstellenBerecheID").val(ber_ID);
         $("#messstellenCatName").val(rowData[13]);

         setTimeout(function(){
            $('.formatDynamicBezugRow1 select').val(formatDynamicType);
         //addValidateClassOnFormatDynamicSelection(formatDynamicType);
         }, 300);
         var fktr = $('.auswahlTypierungFaktorDKff').val();
         var type = $(".typeDynamicCF").val();
        //var subType = $(this).val();
        addValidateClassOnRightSelecOptRow1VisibilityBezugTemp(fktr,type,formatDynamicType);
        addValidateClassOnBezugRangeFaktoreTypeBasicBetweeen(fktr,type,formatDynamicType);
        if((fktr ==5 || fktr ==9) && rowData[8] =='-' && rowData[9] =='-' && rowData[10] =='-'){
            //alert('0');
            $('#basicFaktorRow3').hide();
            $('#basicFaktorRow1').show();
            $('#basicFaktorRow2').hide();
            $('#basicFaktorRow4').hide();
            $("#subtypeTxtBasisFaktor2Name").val('');
            $(".subtypeTxtBasisFaktor2Calc").val('');
            $("#subtypeTxtBasisFaktor2Wert").val('');

        }else if(fktr ==5 || fktr ==9){
            //alert('1');
            $('#basicFaktorRow1').show();
            $('#basicFaktorRow2').hide();
            $('#basicFaktorRow4').hide();
            $('#basicFaktorRow3').show();
            $('.subtypeTxtBasisFaktor2CalcRghtDiv').show();
            $('#ePrdDKFECalcRowType').val($(this).closest("tr").attr('class'));
            var calc_id = $(this).attr('calc-id');
            getCalculationtypeRecordFiveAndNineFaktor(calc_id,fktr);
        }
        $('#ePrdDKFERow1ID').val('');
        $('#ePrdDKFERow2ID').val('');
        $('#updateOptType').val('');
    });
/*14-04-2020 on click edit button append data into form textbox */

/*14-04-2020  dynamische Corrector factor cancel option after edit click */
    $("#btnOptionHinzEPrdDKffStornieren").on("click",function(){
        $("#btnOptionHinzEPrdDKffUpdate").hide();
        $("#btnOptionHinzEPrdDKffStornieren").hide();
        $("#btnOptionHinzEPrdDKff").show();
        $("#DkFeSpeichern").show();
        $("#DkFeHinz").show();
        $("#DkFeFirst").show();
        $("#DkFePrevious").show();
        $("#DkFeNext").show();
        $("#DkFeLast").show();
        $("#DkFeSuchen").show();
        /*$('#subtypeTxtOptNameDKff').val("");
        $('#subtypeTxtoptzBezugDkff').val("");
        $('#subtypeTxtoptzTempDkff').val("");
        $('#subtypeTxtoptzFaktoreDkff').val("");*/
        $('#ePrdDIdStore').val("");
        /*$('#subtypeTxtBasisFaktor2Name').val("");
        $('.subtypeTxtBasisFaktor2Calc').val("");
        $('#subtypeTxtBasisFaktor2Wert').val("");*/

        var auswahlTypierungVal = $('.auswahlTypierungFaktorDKff').val();
        var typeDynamicCFVal = $(".typeDynamicCF").val();
        var subtypeTimeDynamicCFVal = $(".subtypeTimeDynamicCF").val();
        $("#basicFaktorRow1 input").val("");
        $("#basicFaktorRow2 input").val("");
        $("#basicFaktorRow3 input").val("");
        $("#basicFaktorRow4 input").val("");
        $("#basicFaktorRow3 select").val("");
        $("#basicFaktorRow4 select").val("");
        if(typeDynamicCFVal !='' && subtypeTimeDynamicCFVal !=''){
            visibleInvisibleColumnDataOnTypeSelection(typeDynamicCFVal,subtypeTimeDynamicCFVal,auswahlTypierungVal);
            addValidateClassOnRightSelecOptRow2VisibilityBezugTemp(auswahlTypierungVal,typeDynamicCFVal,subtypeTimeDynamicCFVal);
        }
        var calculationTypeDKff = $(".calculationTypeDKff").val();
        if(calculationTypeDKff && (auswahlTypierungVal == 5 || auswahlTypierungVal == 9)){
            basicPlus2ConditionMultiplayCalculationType(calculationTypeDKff);
        }
        $('#ePrdDKFERow1ID').val('');
        $('#ePrdDKFERow2ID').val('');
        $('#updateOptType').val('');
    });
    /*14-04-2020 dynamische Corrector factor cancel option after edit click */

    /*14-04-2020  dynamische Corrector factor update record*/
    $("#btnOptionHinzEPrdDKffUpdate").click(function() {

        var name = $("#optionNameDKff").val();
        var beschreibunDesc = $("#optionBeschreibungDKff").val();

        var a = $("#subtypeTxtOptNameDKff").val();
        var b = $("#subtypeTxtoptzBezugDkff").val();
        var c = $("#subtypeTxtoptzFaktoreDkff").val();
        var d = $('#subtypeTxtBasisFaktor2Name').val();
        var e = $('.subtypeTxtBasisFaktor2Calc').val();
        var f = $('#subtypeTxtBasisFaktor2Wert').val();

        var g = $('#subtypeTxtoptzFaktoreDkff').val();

        var faktore2Comma = g.replace(".", ",");
        var basisFktrWertComma = f.replace(".", ",");

        var faktoreWithComma = faktore2Comma.split(',');
        var factorVal = faktoreWithComma[1];

        if(typeof factorVal !== "undefined" ){
            var factorLength = factorVal.length;
        }else{
            var factorLength = faktore2Comma.length;
        }
        var basisFktrWertWithComma = basisFktrWertComma.split(',');
        var basisFktrWertVal = basisFktrWertWithComma[1];

        if(typeof basisFktrWertVal !== "undefined" ){
            var basisFktrWertLength = basisFktrWertVal.length;
        }else{
            var basisFktrWertLength = basisFktrWertComma.length;
        }

        if(factorLength >4 || basisFktrWertLength >4){
            alert("Erlaube 4 Stellen nach dem Komma (,) Wert");
            return false;
        }

        var yearVal = $(".yearBezugValidate").val();
        if(yearVal){
            var yearRegex = /^\s*((?:19|20)\d{2})\s*$/;
            if (!yearRegex.test(yearVal)) {
                alert('Bitte geben Sie ein gültiges Jahr ein (Beispiel 2020)');
                return false;
            }
        }

        var monthVal = $(".monthBezugValidate").val();
        if(monthVal){
            var regexMonth = /^\s*(1[012]|0?[1-9])\s*$/;
            if (!regexMonth.test(monthVal)) {
                alert('Bitte geben Sie einen gültigen Monat ein (Beispiel 01)');
                return false;
            }
        }

        var monthYearVal = $(".monthYearBezugValidate").val();
        if(monthYearVal){
            var monthYearRegex = /^\s*(1[012]|0?[1-9])\.((?:19|20)\d{2})\s*$/;
            if (!monthYearRegex.test(monthYearVal)) {
                alert('Bitte geben Sie ein gültiges Monat Jahr ein (Beispiel 01.2020)');
                return false;
            }
        }

        var dayVal = $(".dayBezugValidate").val();
        if(dayVal){
            var dayRegex = /^\s*(3[01]|[12][0-9]|0?[1-9])\.(1[012]|0?[1-9])\.((?:19|20)\d{2})\s*$/;
            if (!dayRegex.test(dayVal)) {
                alert('Bitte geben Sie einen gültigen Tag ein (Beispiel 01.01.2020)');
                return false;
            }
        }

        var dayMonthVal = $(".dayMonthBezugValidate").val();
        if(dayMonthVal){
            var dayMonthRegex = /^\s*(3[01]|[12][0-9]|0?[1-9])\.(1[012]|0?[1-9])\s*$/;
            if (!dayMonthRegex.test(dayMonthVal)) {
                alert('Bitte geben Sie einen gültigen Monat Monat ein (Beispiel 02.01)');
                return false;
            }
        }
        if(a !='' && c !='' /*&& d !='' && e !='' && f !=''*/ && name !='' && beschreibunDesc !=''){

           var updateOptType = $('#updateOptType').val();
            if(updateOptType == 'deleteClickUpdate'){
               // alert('deleteEvent');
                DynamischeKorrekturfaktorenDeleteBtnAktualisieren();
            }else{
                // alert('OtherEvent');
                DynamischeKorrekturfaktorenAktualisieren();
            }

        }else{
            alert('Bitte geben Sie danach Text ein und klicken Sie auf Speichern!');
        }
    });
    /*14-04-2020  dynamische Corrector factor update record*/

    /*14-04-2020  dynamische Corrector factor delete record*/
    $("body").on("click", "#tblGetDyanamicheKorrekturfaktoren tbody tr .dyanamicheKorrekturfaktorenMenuDel", function (e) {
        e.preventDefault();
        var ePrdDIdStore = $(this).attr("data-id");
        dynamischeKorrekturfaktorenloschen(ePrdDIdStore);
    });
    /*14-04-2020  dynamische Corrector factor delete record*/

    /*14-04-2020 on click serach icon show popup*/
    $("#DkFeSuchen").click(function() {
            dynamischeKorrekturfaktorenSuchen(this.id);
            $('#ePrdDMainIdStore').val("");
    });
    /*14-04-2020 on click search icon show popup */

    /*15-04-2020 on double click row append data into input and dynamischeKorektorFaktor table data refresh*/
    $("#tblGetDyanamicheKorrekturfaktorenParent tbody").on("dblclick","tr",function(){
        //tblGetDyanamicheKorrekturfaktoren.row(this).remove().draw();
        var id = $(this).attr('data-id');
        getDynamischeKorrekturfaktoren(id);
        var rowData = tblGetDyanamicheKorrekturfaktorenParent.row( this ).data();
        if(rowData[2]=="Basic"){var basisType = '1';
        }else if(rowData[2]=='Basic + Multiplay'){var basisType = '2';
        }else if(rowData[2]=='Basic + Multiplay 2'){var basisType = '3';
        }else if(rowData[2]=='Basic + 2 Conditions'){var basisType = '4';
        }else if(rowData[2]=='Basic + 2 Condition & Multiplay'){var basisType = '5';
        }else if(rowData[2]=='Basic Between'){var basisType = '6';
        }else if(rowData[2]=='Basic Between + Multiplay'){var basisType = '7';
        }else if(rowData[2]=='Basic Between + 2 Conditions'){var basisType = '8';
        }else if(rowData[2]=='Basic Between + 2 Contition + Multiplay'){var basisType = '9'; }

        var subtypeTimeDynamicCFVal = $(this).attr('data-type');
        var calculationTypeDKff = $(this).attr('calculation-type');

        //console.log(rowData);
        $("#optionNameDKff").val(rowData[0]);
        $("#optionBeschreibungDKff").val(rowData[1]);
        $(".auswahlTypierungFaktorDKff").val(basisType);
        $(".typeDynamicCF").val(rowData[3]);
        $(".subtypeTimeDynamicCF").val(subtypeTimeDynamicCFVal);
        $(".calculationTypeDKff").val(calculationTypeDKff);
        //$(".subtypeTimeDynamicCF").show();
        $(".typeDynamicCF").prop('disabled', 'disabled');
        $(".subtypeTimeDynamicCF").prop('disabled', 'disabled');
        $(".auswahlTypierungFaktorDKff").prop('disabled', 'disabled');
        $(".calculationTypeDKff").prop('disabled', 'disabled');
        //alert(id);
        $('#ePrdDMainIdStore').val(id);

        $("#subtypeTxtBasisFaktor2Name").val("");
        $(".subtypeTxtBasisFaktor2Calc").val("");
        $("#subtypeTxtBasisFaktor2Wert").val("");
        $("#subtypeTxtBasisFaktor3Name").val("");
        $(".subtypeTxtBasisFaktor3Calc").val("");
        $("#subtypeTxtBasisFaktor3Wert").val("");
        $("#tblOptionenEPrdDKffNotify").hide();
        $('#tblGetDyanamicheKorrekturfaktoren').parents('div.dataTables_wrapper').first().show();
        $('#saveOptType').val('searchClick');
        $("#dyanamicheKorrekturfaktorenParentContainer").dialog("close");

        var selVal = rowData[3];
        //addValidateClassOnFormatDynamicSelection(selVal);
        setTimeout(function(){
            var typeDynamicCFVal = $(".typeDynamicCF").val();
            if(typeDynamicCFVal == 'Zeit'){
                $(".formatDynamicSelOptRow1 option.zeitOption").show();
                $(".formatDynamicSelOptRow1 option.temperaturOption").hide();
                $(".formatDynamicSelOptRow2 option.zeitOption").show();
                $(".formatDynamicSelOptRow2 option.temperaturOption").hide();
            }
            if(typeDynamicCFVal == 'Temperatur'){
                $(".formatDynamicSelOptRow1 option.temperaturOption").show();
                $(".formatDynamicSelOptRow1 option.zeitOption").hide();
                $(".formatDynamicSelOptRow2 option.temperaturOption").show();
                $(".formatDynamicSelOptRow2 option.zeitOption").hide();
            }
            var calculationTypeDKff = $(".calculationTypeDKff").val();
            //alert(subtypeTimeDynamicCFVal);
            var auswahlTypierungVal = basisType;
           // alert(typeDynamicCFVal);alert(subtypeTimeDynamicCFVal1);alert(auswahlTypierungVal);
            visibleInvisibleColumnDataOnTypeSelection(typeDynamicCFVal,subtypeTimeDynamicCFVal,auswahlTypierungVal);
            //alert(calculationTypeDKff);
            addValidateClassOnFormatDynamicSelection(subtypeTimeDynamicCFVal);
            if(calculationTypeDKff && (auswahlTypierungVal == 5 || auswahlTypierungVal == 9)){
                    basicPlus2ConditionMultiplayCalculationType(calculationTypeDKff);
            }
            if(auswahlTypierungVal ==5 || auswahlTypierungVal ==4 || auswahlTypierungVal ==8 || auswahlTypierungVal ==9){
                addValidateClassOnRightSelecOptRow2VisibilityBezugTemp(auswahlTypierungVal,typeDynamicCFVal,subtypeTimeDynamicCFVal);
            }else{
                $("#subtypeTxtoptzBezugDkff2").removeClass();
            }
            if(auswahlTypierungVal ==6 || auswahlTypierungVal ==7 || auswahlTypierungVal ==8 || auswahlTypierungVal ==9){
                //alert(auswahlTypierungVal);
                addValidateClassOnBezugRangeFaktoreTypeBasicBetweeen(auswahlTypierungVal,typeDynamicCFVal,subtypeTimeDynamicCFVal);
                addValidateClassOnBezugRangeFaktoreTypeRow2BasicBetweeen(auswahlTypierungVal,typeDynamicCFVal,subtypeTimeDynamicCFVal);
            }else{
                $("#bezugStartTxt").removeClass();
                $("#bezugEndTxt").removeClass();
            }
            $('#ePrdDKFERow1ID').val('');
            $('#ePrdDKFERow2ID').val('');
            $('#updateOptType').val('');
        }, 300);
    });
    /*15-04-2020 on double click row append data into input and dynamischeKorektorFaktor table data refresh*/


    /*16-04-2020 default page load data show parent and child get last id */
    $("#korrekturFaktorMenuDynamischer").click(function(){
            getLastIdDataAppendDynamicKorrektorFaktor('',$("#ePrdDMainIdStore").val());
            setTimeout(function(){
                var selVal = $(".subtypeTimeDynamicCF").val();
                var basisType = $(".auswahlTypierungFaktorDKff").val();
                addValidateClassOnFormatDynamicSelection(selVal);
                $(".subtypeTimeDynamicCF").prop('disabled', 'disabled');
                $("#optionNameDKff").val("");
                $("#optionBeschreibungDKff").val("");
                $(".typeDynamicCF").val("");
                $(".subtypeTimeDynamicCF").val("");
                $(".typeDynamicCF").prop('disabled', false);
                $(".subtypeTimeDynamicCF").prop('disabled', 'disabled');
                $(".auswahlTypierungFaktorDKff").prop('disabled', false);
                $(".calculationTypeDKff").prop('disabled', false);
                $(".calculationTypeDiv").hide();
                $("#subtypeTxtOptNameDKff").val("");
                $("#subtypeTxtoptzBezugDkff").val("");
                $("#subtypeTxtoptzTempDkff").val("");
                $("#subtypeTxtoptzFaktoreDkff").val("");
                $("#tblOptionenEPrdDKffNotify").hide();
                $(".sectionDynamicCF").show();
                $("#btnOptionHinzEPrdDKffUpdate").hide();
                $("#btnOptionHinzEPrdDKffStornieren").hide();
                $("#btnOptionHinzEPrdDKff").show();
                //$(".subtypeTimeDynamicCF").hide();
                tblOptionenEPrdDKff.rows().remove().draw();
                tblGetDyanamicheKorrekturfaktoren.rows().remove().draw();
                $("#ePrdDMainIdStore").val("");
                $("#subtypeTxtBasisFaktor2Name").val("");
                $("#subtypeTxtBasisFaktor2Name").val("");
                $(".subtypeTxtBasisFaktor2Calc").val("");
                $("#subtypeTxtBasisFaktor2Wert").val("");
                $(".auswahlTypierungFaktorDKff").val("");
                $(".subtypeTxtBasisFaktor2").hide();
                $("#subtypeTxtBasisFaktor3Name").val("");
                $(".subtypeTxtBasisFaktor3Calc").val("");
                $("#subtypeTxtBasisFaktor3Wert").val("");
                $(".subtypeTxtBasisFaktor3").hide();
                $('#tblOptionenEPrdDKff').parents('div.dataTables_wrapper').first().hide();
                $('#tblGetDyanamicheKorrekturfaktoren').parents('div.dataTables_wrapper').first().hide();
                $('#saveOptType').val('');
                addExtraWidthToDynamischeFaktor();
                $("#basicFaktorRow1").hide();
                $("#basicFaktorRow2").hide();
                $("#basicFaktorRow3").hide();
                $("#basicFaktorRow4").hide();
            }, 300);

            $('#tblGetDyanamicheKorrekturfaktoren').parents('div.dataTables_wrapper').first().hide();

            $('#saveOptType').val('');
    });
    /*16-04-2020 default page load data show parent and child get last id */

    /*16-04-2020 next button functionality for the dynamische korrektor faktor */
    $("#DkFeNext").click(function(){
            var parentDataID = $(this).attr('data-id');

            getLastIdDataShowNextPrevDynamicKorrektorFaktor('DkFeNext',parentDataID);
            setTimeout(function(){
            var selVal = $(".subtypeTimeDynamicCF").val();
            $(".tempInputMainDiv").hide();
            $(".bezugInputMainDiv").show();
            //$(".subtypeTxtDynamicCF div").css("width", "32%");
            //$(".subtypeTxtDynamicCF label").css("width", "44%");

            var auswahlTypierungVal = $('.auswahlTypierungFaktorDKff').val();
            var typeDynamicCFVal = $(".typeDynamicCF").val();
            var subtypeTimeDynamicCFVal = $(".subtypeTimeDynamicCF").val();
            var calculationTypeDKff = $(".calculationTypeDKff").val();
            visibleInvisibleColumnDataOnTypeSelection(typeDynamicCFVal,subtypeTimeDynamicCFVal,auswahlTypierungVal);
            addValidateClassOnFormatDynamicSelection(selVal);
            if(calculationTypeDKff && (auswahlTypierungVal == 5 || auswahlTypierungVal == 9)){
                    $(".calculationTypeDKff").prop('disabled', 'disabled');
                    basicPlus2ConditionMultiplayCalculationType(calculationTypeDKff);
            }
            if(auswahlTypierungVal ==6 || auswahlTypierungVal ==7 || auswahlTypierungVal ==8 || auswahlTypierungVal == 9){
                addValidateClassOnBezugRangeFaktoreTypeBasicBetweeen(auswahlTypierungVal,typeDynamicCFVal,subtypeTimeDynamicCFVal);
            }else{
                $("#bezugStartTxt").removeClass();
                $("#bezugEndTxt").removeClass();
            }
            setDynamicFaktorDefaultValueIntoSelOpt(typeDynamicCFVal);
            }, 500);
            $('#saveOptType').val('');
            $('#saveOptType').val('DkFeNext');
            $("#tempStartTxt").val("");
            $("#tempEndTxt").val("");
            $("#bezugStartTxt").val("");
            $("#bezugEndTxt").val("");
    });
    /*16-04-2020 next button functionality for the dynamische korrektor faktor */

    /*16-04-2020 previous button functionality for the dynamische korrektor faktor */
    $("#DkFePrevious").click(function(){
            var parentDataID = $(this).attr('data-id');
            getLastIdDataShowNextPrevDynamicKorrektorFaktor('DkFePrevious',parentDataID);
            setTimeout(function(){
            var auswahlTypierungVal = $('.auswahlTypierungFaktorDKff').val();
            var typeDynamicCFVal = $(".typeDynamicCF").val();
            var subtypeTimeDynamicCFVal = $(".subtypeTimeDynamicCF").val();
            var calculationTypeDKff = $(".calculationTypeDKff").val();
            //var selVal = $(".subtypeTimeDynamicCF").val();
            visibleInvisibleColumnDataOnTypeSelection(typeDynamicCFVal,subtypeTimeDynamicCFVal,auswahlTypierungVal);
            addValidateClassOnFormatDynamicSelection(subtypeTimeDynamicCFVal);
            if(calculationTypeDKff && (auswahlTypierungVal == 5 || auswahlTypierungVal == 9)){
                    $(".calculationTypeDKff").prop('disabled', 'disabled');
                    basicPlus2ConditionMultiplayCalculationType(calculationTypeDKff);
            }
            if(auswahlTypierungVal ==5 || auswahlTypierungVal ==4 || auswahlTypierungVal == 9){
                addValidateClassOnRightSelecOptRow2VisibilityBezugTemp(auswahlTypierungVal,typeDynamicCFVal,subtypeTimeDynamicCFVal);
            }else{
                $("#subtypeTxtoptzBezugDkff2").removeClass();
            }
            if(auswahlTypierungVal ==6 || auswahlTypierungVal ==7 || auswahlTypierungVal ==8 || auswahlTypierungVal == 9){
                addValidateClassOnBezugRangeFaktoreTypeBasicBetweeen(auswahlTypierungVal,typeDynamicCFVal,subtypeTimeDynamicCFVal);
            }else{
                $("#bezugStartTxt").removeClass();
                $("#bezugEndTxt").removeClass();
            }
            setDynamicFaktorDefaultValueIntoSelOpt(typeDynamicCFVal);
         }, 500);
            $('#saveOptType').val('');
            $('#saveOptType').val('DkFePrevious');
            $("#tempStartTxt").val("");
            $("#tempEndTxt").val("");
            $("#bezugStartTxt").val("");
            $("#bezugEndTxt").val("");
    });
    /*16-04-2020 previous button functionality for the dynamische korrektor faktor */

    /*20-04-2020 On change  auswahl Typierung Faktor - dynamische korrektor faktor */

    $(".auswahlTypierungFaktorDKff").change(function() {
    var auswahlTypierungVal = $(this).val();
    var typeDynamicCFVal = $(".typeDynamicCF").val();
    var subtypeTimeDynamicCFVal = $(".subtypeTimeDynamicCF").val();
    //var calculationTypeVal = $(".calculationTypeDKff").val();

    $("#basicFaktorRow1 input").val("");
    $("#basicFaktorRow2 input").val("");
    $("#basicFaktorRow3 input").val("");
    $("#basicFaktorRow4 input").val("");

        if(typeDynamicCFVal !='' && subtypeTimeDynamicCFVal !=''){

            visibleInvisibleColumnDataOnTypeSelection(typeDynamicCFVal,subtypeTimeDynamicCFVal,auswahlTypierungVal);
            if(auswahlTypierungVal ==5 || auswahlTypierungVal ==9){
                basicPlus2ConditionMultiplayCalculationType(1);
            }
            if(auswahlTypierungVal ==5 || auswahlTypierungVal ==4 || auswahlTypierungVal ==9){
                addValidateClassOnRightSelecOptRow2VisibilityBezugTemp(auswahlTypierungVal,typeDynamicCFVal,subtypeTimeDynamicCFVal);
            }else{
                $("#subtypeTxtoptzBezugDkff2").removeClass();
            }
            if(auswahlTypierungVal ==6 || auswahlTypierungVal ==7 || auswahlTypierungVal ==8 || auswahlTypierungVal ==9){
                addValidateClassOnBezugRangeFaktoreTypeBasicBetweeen(auswahlTypierungVal,typeDynamicCFVal,subtypeTimeDynamicCFVal);
                addValidateClassOnBezugRangeFaktoreTypeRow2BasicBetweeen(auswahlTypierungVal,typeDynamicCFVal,subtypeTimeDynamicCFVal);
            }else{
                $("#bezugStartTxt").removeClass();
                $("#bezugEndTxt").removeClass();
                $("#tempStartTxt").removeClass();
                $("#tempEndTxt").removeClass();
                $("#bezugStartTxt2").removeClass();
                $("#bezugEndTxt2").removeClass();
                $("#tempStartTxt2").removeClass();
                $("#tempEndTxt2").removeClass();
            }
        }
    });
    /*20-04-2020 On change  auswahl Typierung Faktor - dynamische korrektor faktor */

    /*16-06-2020 On change calculation type*/
    $(".calculationTypeDKff").change(function() {
        var calculationTypeVal = $(this).val();
        $("#basicFaktorRow1 input").val("");
        $("#basicFaktorRow2 input").val("");
        $("#basicFaktorRow3 input").val("");
        $("#basicFaktorRow4 input").val("");
        if(calculationTypeVal == ''){
            $('#basicFaktorRow1').hide();
            $('#basicFaktorRow3').hide();
            $('#basicFaktorRow2').hide();
            $('#basicFaktorRow4').hide();
        }
        basicPlus2ConditionMultiplayCalculationType(calculationTypeVal);
    });
    /*16-06-2020 On change calculation type*/

    /*27-04-2020 last button functionality for the dynamische korrektor faktor */
    $("#DkFeLast").click(function(){
            getLastIdDataShowNextPrevDynamicKorrektorFaktor('DkFeLast','');
            setTimeout(function(){
            var auswahlTypierungVal = $('.auswahlTypierungFaktorDKff').val();
            var typeDynamicCFVal = $(".typeDynamicCF").val();
            var subtypeTimeDynamicCFVal = $(".subtypeTimeDynamicCF").val();
            var calculationTypeDKff = $(".calculationTypeDKff").val();
            visibleInvisibleColumnDataOnTypeSelection(typeDynamicCFVal,subtypeTimeDynamicCFVal,auswahlTypierungVal);
            addValidateClassOnFormatDynamicSelection(subtypeTimeDynamicCFVal);
            if(calculationTypeDKff && (auswahlTypierungVal == 5 || auswahlTypierungVal == 9)){
                    $(".calculationTypeDKff").prop('disabled', 'disabled');
                    basicPlus2ConditionMultiplayCalculationType(calculationTypeDKff);
            }
            if(auswahlTypierungVal ==5 || auswahlTypierungVal ==4 || auswahlTypierungVal == 9){
                addValidateClassOnRightSelecOptRow2VisibilityBezugTemp(auswahlTypierungVal,typeDynamicCFVal,subtypeTimeDynamicCFVal);
            }else{
                $("#subtypeTxtoptzBezugDkff2").removeClass();
            }
            if(auswahlTypierungVal ==6 || auswahlTypierungVal ==7 || auswahlTypierungVal ==8 || auswahlTypierungVal == 9){
                addValidateClassOnBezugRangeFaktoreTypeBasicBetweeen(auswahlTypierungVal,typeDynamicCFVal,subtypeTimeDynamicCFVal);
                addValidateClassOnBezugRangeFaktoreTypeRow2BasicBetweeen(auswahlTypierungVal,typeDynamicCFVal,subtypeTimeDynamicCFVal);
            }else{
                $("#bezugStartTxt").removeClass();
                $("#bezugEndTxt").removeClass();
                $("#tempStartTxt").removeClass();
                $("#tempEndTxt").removeClass();
                $("#bezugStartTxt2").removeClass();
                $("#bezugEndTxt2").removeClass();
                $("#tempStartTxt2").removeClass();
                $("#tempEndTxt2").removeClass();
            }
            setDynamicFaktorDefaultValueIntoSelOpt(typeDynamicCFVal);
         }, 500);
            $('#saveOptType').val('');
            $('#saveOptType').val('DkFePrevious');
            $("#tempStartTxt").val("");
            $("#tempEndTxt").val("");
            $("#bezugStartTxt").val("");
            $("#bezugEndTxt").val("");
    });
    /*27-04-2020 last button functionality for the dynamische korrektor faktor */

    /*27-04-2020 first button functionality for the dynamische korrektor faktor */
    $("#DkFeFirst").click(function(){
            getLastIdDataShowNextPrevDynamicKorrektorFaktor('DkFeFirst','');
            setTimeout(function(){
            var auswahlTypierungVal = $('.auswahlTypierungFaktorDKff').val();
            var typeDynamicCFVal = $(".typeDynamicCF").val();
            var subtypeTimeDynamicCFVal = $(".subtypeTimeDynamicCF").val();
            //var selVal = $(".subtypeTimeDynamicCF").val();
            visibleInvisibleColumnDataOnTypeSelection(typeDynamicCFVal,subtypeTimeDynamicCFVal,auswahlTypierungVal);
            addValidateClassOnFormatDynamicSelection(subtypeTimeDynamicCFVal);
            var calculationTypeDKff = $(".calculationTypeDKff").val();
            if(calculationTypeDKff && (auswahlTypierungVal == 5 || auswahlTypierungVal == 9)){
                    $(".calculationTypeDKff").prop('disabled', 'disabled');
                    basicPlus2ConditionMultiplayCalculationType(calculationTypeDKff);
            }
            if(auswahlTypierungVal ==5 || auswahlTypierungVal ==4 || auswahlTypierungVal == 9){
                addValidateClassOnRightSelecOptRow2VisibilityBezugTemp(auswahlTypierungVal,typeDynamicCFVal,subtypeTimeDynamicCFVal);
            }else{
                $("#subtypeTxtoptzBezugDkff2").removeClass();
            }
            if(auswahlTypierungVal ==6 || auswahlTypierungVal ==7 || auswahlTypierungVal ==8 || auswahlTypierungVal == 9){
                addValidateClassOnBezugRangeFaktoreTypeBasicBetweeen(auswahlTypierungVal,typeDynamicCFVal,subtypeTimeDynamicCFVal);
                addValidateClassOnBezugRangeFaktoreTypeRow2BasicBetweeen(auswahlTypierungVal,typeDynamicCFVal,subtypeTimeDynamicCFVal);
            }else{
                $("#bezugStartTxt").removeClass();
                $("#bezugEndTxt").removeClass();
                $("#tempStartTxt").removeClass();
                $("#tempEndTxt").removeClass();
                $("#bezugStartTxt2").removeClass();
                $("#bezugEndTxt2").removeClass();
                $("#tempStartTxt2").removeClass();
                $("#tempEndTxt2").removeClass();
            }
            setDynamicFaktorDefaultValueIntoSelOpt(typeDynamicCFVal);
         }, 500);
            $('#saveOptType').val('');
        $('#saveOptType').val('DkFePrevious');
        $("#tempStartTxt").val("");
        $("#tempEndTxt").val("");
        $("#bezugStartTxt").val("");
        $("#bezugEndTxt").val("");
    });
    /*27-04-2020 first button functionality for the dynamische korrektor faktor */

    $(".formatDynamicSelOptRow1").change(function() {
        //addValidateClassOnFormatDynamicSelection(selectedOptionRow1);
            var fktr = $('.auswahlTypierungFaktorDKff').val();
            var type = $(".typeDynamicCF").val();
            var subType = $(this).val();
            addValidateClassOnRightSelecOptRow1VisibilityBezugTemp(fktr,type,subType);
            addValidateClassOnBezugRangeFaktoreTypeBasicBetweeen(fktr,type,subType);
            $(this).val(subType);
    });

    $(".formatDynamicSelOptRow2").change(function() {
        var fktr = $('.auswahlTypierungFaktorDKff').val();
        var type = $(".typeDynamicCF").val();
        var subType = $(this).val();
        addValidateClassOnRightSelecOptRow2VisibilityBezugTemp(fktr,type,subType);
        addValidateClassOnBezugRangeFaktoreTypeRow2BasicBetweeen(fktr,type,subType);
        $(this).val(subType);
    });

    /*19-08-2020 on click serach icon show popup messstellen Cat Sel */
    $("#messstellenCatSel").click(function() {
            dynamischeKorrekturFaktorenMessstellenCatSel(this.id);
    });

    /*19-08-2020 on click serach icon show popup messstellen Cat Sel 2 */
    $("#messstellenCatSel2").click(function() {
            dynamischeKorrekturFaktorenMessstellenCatSel2(this.id);
    });

    /*Delete option for 5 and 9 faktor type */

    $( "table" ).delegate( "td.dyanamicheKrkturfktrDelFiveOrNine", "click", function() {
        //alert('clicked');
        var calculationTypeDKff = $(".calculationTypeDKff").val();
        basicPlus2ConditionMultiplayCalculationType(calculationTypeDKff);
        $(".delReset").css("display","inline-block");
        $("#btnOptionHinzEPrdDKff").hide();
        $("#btnOptionHinzEPrdDKffUpdate").show();
         $("#btnOptionHinzEPrdDKffStornieren").show();
        var calculationTypeID = $(this).find('button').attr('data-id');
        $("#calculationTypeID").val(calculationTypeID);
        $("#ePrdDKFECalcID").val(calculationTypeID);
        getDynamischeKrktrFaktorDeleteOptClickValues(calculationTypeID);
    });
    /*Reset first row*/
    $("#basicFaktorRow1Reset").click(function() {
        if (window.confirm('Are you sure？')) {
            $("#basicFaktorRow1 input").val('');
            $("#basicFaktorRow1 select").val('');
            $("#basicFaktorRow3 input").val('');
            $("#basicFaktorRow3 select").val('');
        }
    });
    /*Reset second row*/
    $("#basicFaktorRow2Reset").click(function() {
        if (window.confirm('Are you sure？')) {
            $("#basicFaktorRow2 input").val('');
            $("#basicFaktorRow2 select").val('');
            $("#basicFaktorRow4 input").val('');
            $("#basicFaktorRow4 select").val('');
        }
    });

    /*Reset first and second row*/
     $("#basicFaktorDelete").click(function() {
        if (window.confirm('Are you sure？')) {
            $("#basicFaktorRow1 input").val('');
            $("#basicFaktorRow1 select").val('');
            $("#basicFaktorRow3 input").val('');
            $("#basicFaktorRow3 select").val('');
            $("#basicFaktorRow2 input").val('');
            $("#basicFaktorRow2 select").val('');
            $("#basicFaktorRow4 input").val('');
            $("#basicFaktorRow4 select").val('');
            $('#ePrdDKFERow1ID').val('');
            $('#ePrdDKFERow2ID').val('');
            $('#updateOptType').val('');
        }
    });

    /*18-09-2020 on click serach icon show popup for Interne Betriebsdaten */
    $("#intBdeIMwSuchen").click(function(){
        tblAnlOhneZeitintervallIMwSuchenMethod();
    });
   /*18-09-2020 on click serach icon show popup for Interne Betriebsdaten */

    /*16-03-2021 on click serach icon show popup for Interne Betriebsdaten Produkte and Messetelle*/
    /*mm-new-start*/
    $("#intBdePrdktIMwSuchen").click(function(){

        /*new-mm-start 26-03-2021*/
        tblMstOhneZeitintervallIMw.clear();
        $("#tblMstOhneZeitintervallIMw_wrapper").hide();
        $("#searchBtnShowRecordsPrdktAnlMstBtnDiv").hide();
        $("#tblMstOhneZeitintervallIMwMessstelle_wrapper").hide();
        //$('#tblMstOhneZeitintervallIMw').parents('div.dataTables_wrapper').first().hide();
        $("#btnShowRecordsAnlBtnPrdkt").prop("disabled", false);
        resetInterneBetriebsdatenInputs('infosIntEnergiedaten',1);
        /*new-mm-end 26-03-2021*/

        tblAnlPrdktOhneZeitintervallIMwSuchenMethod();
    });
    /*mm-new-end*/

    $(document).ready(function(){
        $('#tblAnlOhneZeitintervallIMw').parents('div.dataTables_wrapper').first().hide();
        /*new-mm-start 22-03-2021*/
        $('#tblMstOhneZeitintervallIMwIE').parents('div.dataTables_wrapper').first().hide();
        $('#searchBtnShowRecordsAnlBtnDiv').hide();
        $('#searchBtnShowRecordsPrdktAnlMstBtnDiv').hide();
        $('#interneEBTblDiv').hide();
        /*new-mm-end 22-03-2021*/
        $("#btnShowRecordsAnlBtn").click(function(){
            //$(this).addClass('showTable');
            $(this).prop("disabled", true);
            tblMstOhneZeitintervallIMw.clear().draw();
            $('#tblAnlOhneZeitintervallIMw').parents('div.dataTables_wrapper').first().toggle();
            keinZeitIntervallZugewiesen(InstanceMode.BDE);
            /*new-mm-start 22-03-2021*/
            $('#searchBtnShowRecordsAnlBtnDiv').show();
            $('#interneEBTblDiv').show();
            $('#searchBtnShowRecordsAnlBtn').val('1');
            /*new-mm-end 22-03-2021*/
        });
        /*Produkte mm show Anlage Data*/
        /*new-mm-start*/
        //tblMstOhneZeitintervallIMw_wrapper
        $('#tblMstOhneZeitintervallIMw').parents('div.dataTables_wrapper').first().hide();
        $('#tblMstOhneZeitintervallIMwMessstelle').parents('div.dataTables_wrapper').first().hide();

        $("#btnShowRecordsAnlBtnPrdkt").click(function(){
            // alert('here');
            $(this).prop("disabled", true);
            $('#searchBtnShowRecordsPrdktAnlMstBtnDiv').show();
            $('#searchBtnShowRecordsPrdktAnlMstBtn').val('1');
            $("#ErgDatenProdukte").prop("checked", true);
            tblMstOhneZeitintervallIMw.clear().draw();
            $('#tblMstOhneZeitintervallIMw').parents('div.dataTables_wrapper').first().toggle();
            //produkteDataTable();
            //resetInterneBetriebsdatenInputs('infosIntEnergiedaten',1);
            /*new-mm-start 06-04-2021*/
            $("#btnMassEingPrdkt").show();
            $("#btnMassEingMesssetelle").hide();
            $('input:radio[name=BetriebsdatenFilter]').change();
            /*new-mm-end 06-04-2021*/
            produkteAnlargeDataTable();

        });
        /*new-mm-end*/
        $(".zeitintervallAnl_1").hide();
        $(".zeitintervallAnl_2").hide();
        $(".zeitintervallAnl_3").hide();
        $(".zeitintervallAnl_4").hide();
        $(".zeitintervallAnl_NoEnding").hide();

        /*Produkte mm 01-03-2021*/
        /*new-mm-start 22-03-2021*/
        $(".zeitintervallAnlPrdkt_1").hide();
        $(".zeitintervallAnlPrdkt_2").hide();
        $(".zeitintervallAnlPrdkt_3").hide();
        $(".zeitintervallAnlPrdkt_4").hide();
        $(".zeitintervallAnlPrdkt_NoEnding").hide();
        /*new-mm-end 22-03-2021*/

        btnMasseneingabeIMwChange(1,'infosMasseneingabeDateRangeDiv',4);
        datePickerForInterneBetriebsdaten('infosMasseneingabeDateRangeDiv',4);
        /*new-mm-start 01-04-2021*/
        btnMasseneingabeIMwChangePrdkt(1,'infosMasseneingabeDateRangeDivPrdkt',6);
        datePickerForInterneBetriebsdatenAnlPrdkt('infosMasseneingabeDateRangeDivPrdkt',6);
        btnMasseneingabeIMwChange(1,'infosMasseneingabeDateRangeDivMesssetelle',5);
        datePickerForInterneBetriebsdaten('infosMasseneingabeDateRangeDivMesssetelle',5);
        /*new-mm-end 01-04-2021*/


        //30-09-2020 On change #zeitintervallAnl select option
        /*$('.txtBoxSrch').click(function(){
            console.log(this);
        }); */
        //$("#tblMasseneingabeDataIMwTbl tr.calcZeit1RowInputs").addClass('hide');
        /*Generate row after click into input*/
        $(".calcZeit1RowInputs").removeClass("show");
        $(".calcZeit1RowInputs").addClass("hide");
        $(".calcZeit2RowInputs").removeClass("show");
        $(".calcZeit2RowInputs").addClass("hide");
        $(".calcZeit3RowInputs").removeClass("show");
        $(".calcZeit3RowInputs").addClass("hide");
        $(".calcZeit4RowInputs").removeClass("show");
        $(".calcZeit4RowInputs").addClass("hide");
        $('body').on('click input', '.txtBoxSrch', function(event){
            //console.log(event);
            $(this).closest('tbody').find('tr').removeClass('show');
            $(this).closest('tbody').find('tr').addClass('hide');

            if ($(this).closest('tr').next('tr').hasClass("hide")) {
                $(this).closest('tr').next('tr').addClass('show');
                $(this).closest('tr').next('tr').removeClass('hide');
            }else{
                $(this).closest('tr').next('tr').removeClass('show');
                $(this).closest('tr').next('tr').addClass('hide');
            }
           event.stopPropagation();
        });
        /*added selector #infosMasseneingabeMesssetelle .txtBoxSrch 05-04-2021*/
        $('body').on('keyup input', '#infosMasseneingabe .txtBoxSrch , #infosMasseneingabeMesssetelle .txtBoxSrch', function(e){
            var zeitIntervallAnl = $(".infosMasseneingabeInside button.active").attr('data-id');
            var inputId=this.id;
            var splitId = inputId.split("_");
            var currID = splitId[1];
            var nextId = eval(splitId[1])+eval(1);
            var bottomPrevId = eval(splitId[1])-eval(1);
            var bottomPrevNextId = eval(bottomPrevId)-eval(1);
            var rowMainIDEn = $(this).closest('tr').attr('id');
            var rowMainIDDs = $(this).closest('tr').next('tr').attr('id');
            //var inptDate = $(this).closest('td').attr('date');

            var inputBottomCurrId = "#"+rowMainIDDs+" #anlageCalculationRow_"+currID;
            var inputBottomPrevId = "#"+rowMainIDDs+" #anlageCalculationRow_"+bottomPrevId;
            var inputCurPrevId = "#"+rowMainIDEn+" #anlageMainRow_"+bottomPrevId;
            var inputCurrId = "#"+rowMainIDEn+" #anlageMainRow_"+currID;
            var inputNextId = "#"+rowMainIDEn+" #anlageMainRow_"+nextId;
            var inputNextBottomId = "#"+rowMainIDDs+" #anlageCalculationRow_"+nextId;
            var inputValBottomPrev=$(inputBottomPrevId).val();
            var inputValBottomCurr=$(inputBottomCurrId).val();
            var inputValCurr=$(inputCurrId).val();

            /*mm_22-01-2021 Start Code to store Previous Last Value */
            var checkPrevVal = $(this).closest('td').prev('td').find('input').val();
            var checkPrevInpDs = $(this).closest('td').prev('td').find('input').attr('disabled');
            var prevId = eval(splitId[1])-eval(1);
            if(checkPrevVal =='' && typeof(checkPrevInpDs) =='undefined'){
                do {
                prevId--;
                var inputIdPrevlast = "#"+rowMainIDEn+" #anlageMainRow_"+prevId;
                var inputVallast = $(inputIdPrevlast).val();
                    if(inputVallast != "")
                    {
                        $('#inputLastValDB').val(inputVallast);
                        $('#inputPrevLastIdDB').val(prevId);
                        $('#inputIdPrevlast').val(inputIdPrevlast);
                        var inputlastBottomPrevId = "#"+rowMainIDDs+" #anlageCalculationRow_"+prevId;
                        var inputIdPrevBottomlastVal = $(inputlastBottomPrevId).val();
                        $('#inputValBottomPrevLastDB').val(inputIdPrevBottomlastVal);
                        $('#inputIdPrevBottomlast').val(inputlastBottomPrevId);
                        break;
                    }
                    else{continue;}
                    }
                while (inputVallast == "");
                // return false;
            }
            var checkNextVal = $(this).closest('td').next('td').find('input').val();
            var checkNextInpDs = $(this).closest('td').next('td').find('input').attr('disabled');

            if(checkNextVal =='' && typeof(checkNextInpDs) =='undefined'){
                do {
                nextId++;
                var inputIdNextlast = "#"+rowMainIDEn+" #anlageMainRow_"+nextId;
                var inputNextLastBottomId = "#"+rowMainIDDs+" #anlageCalculationRow_"+nextId;
                var inputValNextlast = $(inputIdNextlast).val();
                    if(inputValNextlast != "")
                    {
                        $('#inputNextLastIdDB').val(nextId);
                        $('#inputNextLastValDB').val(inputValNextlast);
                        $('#inputIdNextlast').val(inputIdNextlast);
                        $('#inputNextLastBottomId').val(inputNextLastBottomId);
                        break;
                    }
                    else{continue;}
                    }
                while (inputValNextlast == "");
                //return false;
            }

            /*END Code to store Previous Last Value */

            if(e.keyCode != 9){
                if(bottomPrevId>=0){
                    $("#inputCurPrevId").val(inputCurPrevId);
                    $("#inputBottomPrevId").val(inputBottomPrevId);
                }
                $("#currInputID").val(currID);
                $("#inputDeleteBotmId").val(inputBottomCurrId);
                $("#inputCurrId").val(inputCurrId);
                $("#inputNextId").val(inputNextId);
                $("#inputBottomCurrId").val(inputBottomCurrId);
                $("#inputValBottomPrev").val(inputValBottomPrev);
                $("#inputValBottomCurr").val(inputValBottomCurr);
                $("#inputCurrVal").val(inputValCurr);
                $("#rowMainIDDs").val(rowMainIDDs);
                $("#inputDefaultShowPopup").val(true);
                $("#inputNextBottomId").val(inputNextBottomId);
                $("#rowMainIDEn").val(rowMainIDEn);
                $("#inputFocusedId").val(inputCurrId);
                if($("#currInputID").val()==0){ $("#inputCurPrevId").val("");
                }
                $("#masseneingabeSpeichernSrch").prop("disabled",true);
                $("#masseneingabeSpeichernSrchMesssetelle").prop("disabled",true);
            }
            //if(e.keyCode == 9){
                //$("#currInputID").val("");
                //$("#inputCurrId").val("");

               // getLastInputValuesByCurrent(currInputID,rowMainIDDs,4);
               // $("#inputCurrId").val("");
                //resetInputsSearchMasseneingabe();
                //getLastInputValuesByCurrent(currInputID-1,rowMainIDDs,4);
            //}

            //alert($(inputCurrId).val());
            /*if($(inputCurrId).val() == ""){
               // $("#currInputID").val("");
                $("#inputCurrId").val("");
            }*/

            e.stopPropagation();
        });

        /*new-mm-start 05-04-2021*/
        $('body').on('keyup input', '#infosMasseneingabePrdkt .txtBoxSrch', function(e){
            var zeitIntervallAnl = $(".infosMasseneingabeInside button.active").attr('data-id');
            var inputId=this.id;
            var splitId = inputId.split("_");
            var currID = splitId[1];
            var nextId = eval(splitId[1])+eval(1);
            var bottomPrevId = eval(splitId[1])-eval(1);
            var bottomPrevNextId = eval(bottomPrevId)-eval(1);
            var rowMainIDEn = $(this).closest('tr').attr('id');
            var rowMainIDDs = $(this).closest('tr').next('tr').attr('id');
            //var inptDate = $(this).closest('td').attr('date');

            var inputBottomCurrId = "#"+rowMainIDDs+" #anlageCalculationRow_"+currID;
            var inputBottomPrevId = "#"+rowMainIDDs+" #anlageCalculationRow_"+bottomPrevId;
            var inputCurPrevId = "#"+rowMainIDEn+" #anlageMainRow_"+bottomPrevId;
            var inputCurrId = "#"+rowMainIDEn+" #anlageMainRow_"+currID;
            var inputNextId = "#"+rowMainIDEn+" #anlageMainRow_"+nextId;
            var inputNextBottomId = "#"+rowMainIDDs+" #anlageCalculationRow_"+nextId;
            var inputValBottomPrev=$(inputBottomPrevId).val();
            var inputValBottomCurr=$(inputBottomCurrId).val();
            var inputValCurr=$(inputCurrId).val();

            /*mm_22-01-2021 Start Code to store Previous Last Value */
            var checkPrevVal = $(this).closest('td').prev('td').find('input').val();
            var checkPrevInpDs = $(this).closest('td').prev('td').find('input').attr('disabled');
            var prevId = eval(splitId[1])-eval(1);
            if(checkPrevVal =='' && typeof(checkPrevInpDs) =='undefined'){
                do {
                prevId--;
                var inputIdPrevlast = "#"+rowMainIDEn+" #anlageMainRow_"+prevId;
                var inputVallast = $(inputIdPrevlast).val();
                    if(inputVallast != "")
                    {
                        $('#inputLastValDB').val(inputVallast);
                        $('#inputPrevLastIdDB').val(prevId);
                        $('#inputIdPrevlast').val(inputIdPrevlast);
                        var inputlastBottomPrevId = "#"+rowMainIDDs+" #anlageCalculationRow_"+prevId;
                        var inputIdPrevBottomlastVal = $(inputlastBottomPrevId).val();
                        $('#inputValBottomPrevLastDB').val(inputIdPrevBottomlastVal);
                        $('#inputIdPrevBottomlast').val(inputlastBottomPrevId);
                        break;
                    }
                    else{continue;}
                    }
                while (inputVallast == "");
                // return false;
            }
            var checkNextVal = $(this).closest('td').next('td').find('input').val();
            var checkNextInpDs = $(this).closest('td').next('td').find('input').attr('disabled');

            if(checkNextVal =='' && typeof(checkNextInpDs) =='undefined'){
                do {
                nextId++;
                var inputIdNextlast = "#"+rowMainIDEn+" #anlageMainRow_"+nextId;
                var inputNextLastBottomId = "#"+rowMainIDDs+" #anlageCalculationRow_"+nextId;
                var inputValNextlast = $(inputIdNextlast).val();
                    if(inputValNextlast != "")
                    {
                        $('#inputNextLastIdDB').val(nextId);
                        $('#inputNextLastValDB').val(inputValNextlast);
                        $('#inputIdNextlast').val(inputIdNextlast);
                        $('#inputNextLastBottomId').val(inputNextLastBottomId);
                        break;
                    }
                    else{continue;}
                    }
                while (inputValNextlast == "");
                //return false;
            }

            /*END Code to store Previous Last Value */

            if(e.keyCode != 9){
                if(bottomPrevId>=0){
                    $("#inputCurPrevId").val(inputCurPrevId);
                    $("#inputBottomPrevId").val(inputBottomPrevId);
                }
                $("#currInputID").val(currID);
                $("#inputDeleteBotmId").val(inputBottomCurrId);
                $("#inputCurrId").val(inputCurrId);
                $("#inputNextId").val(inputNextId);
                $("#inputBottomCurrId").val(inputBottomCurrId);
                $("#inputValBottomPrev").val(inputValBottomPrev);
                $("#inputValBottomCurr").val(inputValBottomCurr);
                $("#inputCurrVal").val(inputValCurr);
                $("#rowMainIDDs").val(rowMainIDDs);
                $("#inputDefaultShowPopup").val(true);
                $("#inputNextBottomId").val(inputNextBottomId);
                $("#rowMainIDEn").val(rowMainIDEn);
                $("#inputFocusedId").val(inputCurrId);
                if($("#currInputID").val()==0){ $("#inputCurPrevId").val("");
                }
                /*new-mm-start 05-04-2021*/
                $("#masseneingabeSpeichernSrchPrdkt").prop("disabled",true);
                /*new-mm-start 05-04-2021*/
            }

            e.stopPropagation();
        });
        /*new-mm-end 05-04-2021*/


        /*added selector #infosMasseneingabeMesssetelle .txtBoxSrch 05-04-2021*/
        $('body').on('change input', '#infosMasseneingabe .txtBoxSrch , #infosMasseneingabeMesssetelle .txtBoxSrch', function(e){
            var zeitIntervallAnl = $(".infosMasseneingabeInside button.active").attr('data-id');
            var inputId=this.id;
            var inputValFirst=$(this).val();
            $(this).addClass("isShowPopup");
            var splitId = inputId.split("_");
            var currID = splitId[1];
            var nextId = eval(splitId[1])+eval(1);
            var prevId = eval(splitId[1])-eval(1);

            var inputIdNext = "#anlageMainRow_"+nextId;
            var inputIdPrev = "#anlageMainRow_"+prevId;
            var inputValNext=$(this).closest('td').next('td').find(inputIdNext).val();
            var inputValCurrent=$(this).closest('td').prev('td').find(inputIdPrev).val();

            var calcVal = inputValNext-inputValFirst;
            var currCalcVal = inputValFirst-inputValCurrent;
            var inputVal=$(this).val();

            var checkPrevVal = $(this).closest('td').prev('td').find('input').val();
            var checkPrevInpDs = $(this).closest('td').prev('td').find('input').attr('disabled');
            var currInputID = $("#currInputID").val();
            var rowMainIDDs = $("#rowMainIDDs").val();
            var inptDate = $(this).closest('td').attr('date');
            var mst_id = $(this).closest('td').attr('data-id');

            var date = $(this).closest('td').attr('date');
            var checkAlertRangeExist = $(this).hasClass("checkAlertRange");
            var rowMainIDEn = $(this).closest('tr').attr('id');
            var rowMainIDDs = $(this).closest('tr').next('tr').attr('id');
            var inputCurrTopId = "#"+rowMainIDEn+" #anlageMainRow_"+currID;
            var inputCurrBottomId = "#"+rowMainIDDs+" #anlageCalculationRow_"+currID;
            var einheitVal = $(this).closest('tr').attr('data-einheit');
            if((inputValFirst !='' && inputValCurrent !='') && (typeof(inputValFirst) !='undefined' && typeof(inputValCurrent) !='undefined')){
                $(this).closest('tr').next('tr').find("#anlageCalculationRow_"+currID).val(currCalcVal);
                if($.inArray(inptDate, anlageObj[mst_id]) === -1){
                    anlageObj[mst_id].push(inptDate);
                }
            }else{
                $(this).closest('tr').next('tr').find("#anlageCalculationRow_"+currID).val('');
                if($.inArray(inptDate, anlageObj[mst_id]) !== -1){
                    anlageObj[mst_id].pop(inptDate);
                }
            }
            if((inputValFirst !='' && inputValNext !='') && (typeof(inputValFirst) !='undefined' && typeof(inputValNext) !='undefined')){
                 $(this).closest('tr').next('tr').find("#anlageCalculationRow_"+nextId).val(calcVal);
            }else{
                $(this).closest('tr').next('tr').find("#anlageCalculationRow_"+nextId).val('');
            }
            if(this.value ==''){
                //console.log('000');
                deleteFromDBMasseneingabeEingabenSingleInput(zeitIntervallAnl,date,mst_id);
            }
            //console.log(anlageObj);
            if(anlageObj[mst_id]){
                var inputCountLength = anlageObj[mst_id].length;
                if(inputCountLength>4){
                     checkAlertRangeMinMaxServerSide(zeitIntervallAnl,mst_id,date,rowMainIDDs);
                }
            }

            /*MM_21-01-2021 Start:check previous/next value is null and last value*/

            var checkNextVal = $(this).closest('td').next('td').find('input').val();
            var checkNextInpDs = $(this).closest('td').next('td').find('input').attr('disabled');
            var inputNextBottomId = "#"+rowMainIDDs+" #anlageCalculationRow_"+nextId;

            if(checkPrevVal =='' && typeof(checkPrevInpDs) =='undefined'){
                do {
                    prevId--;
                    var inputIdPrevlast = "#"+rowMainIDEn+" #anlageMainRow_"+prevId;
                    //var allPrevVal = [];
                    var inputVallast = $(inputIdPrevlast).val();
                    if(inputVallast != "" && typeof(inputVallast) != 'undefined'){
                        if($.inArray(inputVallast, allPrevVal) === -1){
                            allPrevVal.push(inputVallast);
                        }
                    }

                    if((inputValFirst != "" && typeof(inputValFirst) != 'undefined') && (inputVallast != "" && typeof(inputVallast) != 'undefined') ){
                        var diffval =  eval(inputValFirst) - eval(inputVallast);
                    }
                    else if((inputValFirst == "") && (checkNextVal != "" && typeof(checkNextVal) != 'undefined') && (inputVallast != ""  && typeof(inputVallast) != 'undefined')){
                        var diffNBval = Number(checkNextVal)  - eval(inputVallast);
                        $(inputNextBottomId).val(diffNBval);
                    }
                    else{
                        var diffval = "";
                    }
                    //var checkDay = -365 ;
                    //checkAlertRangeLastInputValueExist(zeitIntervallAnl,mst_id,date,inputCurrTopId,inputCurrBottomId,rowMainIDDs,prevId,checkDay);
                    if(inputVallast != "")
                    {
                        $(inputCurrBottomId).val(diffval);

                        break;
                    }
                    else{
                        continue;
                    }
                }
                while (inputVallast == "");
                //  return false;
                //console.log('inputVallast='+inputVallast);
                if(typeof(inputVallast) =='undefined'){
                     checkAlertRangeLastInputValueExist(zeitIntervallAnl,mst_id,date,inputCurrTopId,inputCurrBottomId,rowMainIDDs,prevId);

                }
            }
            if(checkNextVal =='' && typeof(checkNextInpDs) =='undefined'){
                do {
                    nextId++;
                    var inputIdNextlast = "#"+rowMainIDEn+" #anlageMainRow_"+nextId;
                    var inputNextLastBottomId = "#"+rowMainIDDs+" #anlageCalculationRow_"+nextId;
                    var inputValNextlast = $(inputIdNextlast).val();
                    if((inputValFirst != "" && typeof(inputValFirst) != 'undefined') && (inputValNextlast != "" && typeof(inputValNextlast) != 'undefined')){
                        var diffNextval = eval(inputValNextlast)-eval(inputValFirst);
                    }
                    /*else if((inputValFirst == "") && (inputCurPrevId != "" && typeof(inputCurPrevId) != 'undefined') && (inputValNextlast != ""  && typeof(inputValNextlast) != 'undefined')){

                        var diffNextval = Number($('#inputNextLastValDB').val()) - Number($($(inputCurPrevId).val()).val());
                    }*/
                    else{
                        if($('#inputLastValDB').val()){
                          var diffNextval = $('#inputNextLastValDB').val() - $('#inputLastValDB').val() ;
                        }
                        if($($(inputCurPrevId).val()).val()){
                            var diffNextval = Number($('#inputNextLastValDB').val()) - Number($($(inputCurPrevId).val()).val());
                        }

                    }
                    if(inputValNextlast != "")
                    {
                        $(inputNextLastBottomId).val(diffNextval);
                        break;
                    }
                    else{continue;}
                }
                while (inputValNextlast == "");
                    //return false;
            }
            /*MM_21-01-2021 End:check previous value is null and last value*/

            if($('#currInputID').val() == 0){
                //$('#inputPrevValDB').val("");
                //console.log(0);
                if((inputValFirst == "" && typeof(inputValFirst) != 'undefined') && (inputValNext != "" && typeof(inputValNext) != 'undefined') ){

                    var secBottomValDB = $($('#inputNextId').val()).val() - $('#inputPrevValDB').val();
                    //console.log("currinput0 : secondBottom"+secBottomValDB+"->"+$('#inputPrevValDB').val()+"-"+$($('#inputNextId').val()).val());
                    if($('#inputPrevValDB').val()){
                        $(inputNextBottomId).val(secBottomValDB);
                    }
                    else{
                        $(inputNextBottomId).val("");
                    }
                }
                if((inputValFirst == "" && typeof(inputValFirst) != 'undefined') && (inputValNextlast != "" && typeof(inputValNextlast) != 'undefined')){
                        var lastBottomValDB = $(inputIdNextlast).val() - $('#inputPrevValDB').val();
                        //console.log("currinput0 : lastBottomValDB"+lastBottomValDB+"->"+$(inputIdNextlast).val()+"-"+$('#inputPrevValDB').val());
                        if($('#inputPrevValDB').val()){
                            $(inputNextLastBottomId).val(lastBottomValDB);
                        }
                        else{
                            $(inputNextLastBottomId).val("");
                        }
                        //$(inputNextLastBottomId).val("");
                    }
                //var checkDay = -5 ;
               // checkAlertRangeLastInputValueExist(zeitIntervallAnl,mst_id,date,inputCurrTopId,inputCurrBottomId,rowMainIDDs,prevId,checkDay);
                checkAlertRangeLastInputValueExist(zeitIntervallAnl,mst_id,date,inputCurrTopId,inputCurrBottomId,rowMainIDDs,prevId);
            }
            else if(allPrevVal){
                if(allPrevVal.length == 0 ){
                    if((inputValFirst == "" && typeof(inputValFirst) != 'undefined') && (inputValNext != "" && typeof(inputValNext) != 'undefined') ){
                        var secBottomValDB = $($('#inputNextId').val()).val() - $('#inputPrevValDB').val();
                         //console.log("allPrevVal.length0 : secondBottom"+secBottomValDB+"->"+$('#inputPrevValDB').val()+"-"+$($('#inputNextId').val()).val());
                        if($('#inputPrevValDB').val()){
                            $(inputNextBottomId).val(secBottomValDB);
                        }
                        else
                        {
                         $(inputNextBottomId).val("");
                        }

                    }
                    if((inputValFirst == "" && typeof(inputValFirst) != 'undefined') && (inputValNextlast != "" && typeof(inputValNextlast) != 'undefined')){
                        var lastBottomValDB = $(inputIdNextlast).val() - $('#inputPrevValDB').val();
                        //console.log("allPrevVal.length0 : lastBottomValDB"+lastBottomValDB+"->"+$(inputIdNextlast).val()+"-"+$('#inputPrevValDB').val());
                        if($('#inputPrevValDB').val()){
                            $(inputNextLastBottomId).val(lastBottomValDB);
                        }
                        else{
                            $(inputNextLastBottomId).val("");
                        }
                        //$(inputNextLastBottomId).val("");
                    }


                }
                //console.log('inputValCurrent='+inputValCurrent);
                //if(inputValCurrent==''){
                    //var checkDay = -5 ;
                   // checkAlertRangeLastInputValueExist(zeitIntervallAnl,mst_id,date,inputCurrTopId,inputCurrBottomId,rowMainIDDs,prevId);
                    //checkAlertRangeLastInputValueExist(zeitIntervallAnl,mst_id,date,inputCurrTopId,inputCurrBottomId,rowMainIDDs,prevId,checkDay);

                //}
                //console.log(1);
            }
            /*else{
                //var checkDay = -1 ;
                checkAlertRangeLastInputValueExist(zeitIntervallAnl,mst_id,date,inputCurrTopId,inputCurrBottomId,rowMainIDDs,prevId);
                //checkAlertRangeLastInputValueExist(zeitIntervallAnl,mst_id,date,inputCurrTopId,inputCurrBottomId,rowMainIDDs,prevId,checkDay);
                console.log(2);
            }*/
            e.stopPropagation();

        });
        /*new-mm-start 05-04-2021*/
        $('body').on('change input', '#infosMasseneingabePrdkt .txtBoxSrch', function(e){
            var zeitIntervallAnl = $(".infosMasseneingabeInside button.active").attr('data-id');
            var inputId=this.id;
            var inputValFirst=$(this).val();
            $(this).addClass("isShowPopup");
            var splitId = inputId.split("_");
            var currID = splitId[1];
            var nextId = eval(splitId[1])+eval(1);
            var prevId = eval(splitId[1])-eval(1);

            var inputIdNext = "#anlageMainRow_"+nextId;
            var inputIdPrev = "#anlageMainRow_"+prevId;
            var inputValNext=$(this).closest('td').next('td').find(inputIdNext).val();
            var inputValCurrent=$(this).closest('td').prev('td').find(inputIdPrev).val();

            var calcVal = inputValNext-inputValFirst;
            var currCalcVal = inputValFirst-inputValCurrent;
            var inputVal=$(this).val();

            var checkPrevVal = $(this).closest('td').prev('td').find('input').val();
            var checkPrevInpDs = $(this).closest('td').prev('td').find('input').attr('disabled');
            var currInputID = $("#currInputID").val();
            var rowMainIDDs = $("#rowMainIDDs").val();
            var inptDate = $(this).closest('td').attr('date');
            var mst_id = $(this).closest('td').attr('data-id');

            var date = $(this).closest('td').attr('date');
            var checkAlertRangeExist = $(this).hasClass("checkAlertRange");
            var rowMainIDEn = $(this).closest('tr').attr('id');
            var rowMainIDDs = $(this).closest('tr').next('tr').attr('id');
            var inputCurrTopId = "#"+rowMainIDEn+" #anlageMainRow_"+currID;
            var inputCurrBottomId = "#"+rowMainIDDs+" #anlageCalculationRow_"+currID;
            var einheitVal = $(this).closest('tr').attr('data-einheit');
            if((inputValFirst !='' && inputValCurrent !='') && (typeof(inputValFirst) !='undefined' && typeof(inputValCurrent) !='undefined')){
                $(this).closest('tr').next('tr').find("#anlageCalculationRow_"+currID).val(currCalcVal);
                if($.inArray(inptDate, anlageObj[mst_id]) === -1){
                    anlageObj[mst_id].push(inptDate);
                }
            }else{
                $(this).closest('tr').next('tr').find("#anlageCalculationRow_"+currID).val('');
                if($.inArray(inptDate, anlageObj[mst_id]) !== -1){
                    anlageObj[mst_id].pop(inptDate);
                }
            }
            if((inputValFirst !='' && inputValNext !='') && (typeof(inputValFirst) !='undefined' && typeof(inputValNext) !='undefined')){
                 $(this).closest('tr').next('tr').find("#anlageCalculationRow_"+nextId).val(calcVal);
            }else{
                $(this).closest('tr').next('tr').find("#anlageCalculationRow_"+nextId).val('');
            }
            if(this.value ==''){
                //console.log('000');
                deleteFromDBMasseneingabeEingabenSingleInputPrdkt(zeitIntervallAnl,date,mst_id);
            }
            //console.log(anlageObj);
            if(anlageObj[mst_id]){
                var inputCountLength = anlageObj[mst_id].length;
                if(inputCountLength>4){
                     checkAlertRangeMinMaxServerSidePrdkt(zeitIntervallAnl,mst_id,date,rowMainIDDs);
                }
            }

            /*MM_21-01-2021 Start:check previous/next value is null and last value*/

            var checkNextVal = $(this).closest('td').next('td').find('input').val();
            var checkNextInpDs = $(this).closest('td').next('td').find('input').attr('disabled');
            var inputNextBottomId = "#"+rowMainIDDs+" #anlageCalculationRow_"+nextId;

            if(checkPrevVal =='' && typeof(checkPrevInpDs) =='undefined'){
                do {
                    prevId--;
                    var inputIdPrevlast = "#"+rowMainIDEn+" #anlageMainRow_"+prevId;
                    //var allPrevVal = [];
                    var inputVallast = $(inputIdPrevlast).val();
                    if(inputVallast != "" && typeof(inputVallast) != 'undefined'){
                        if($.inArray(inputVallast, allPrevVal) === -1){
                            allPrevVal.push(inputVallast);
                        }
                    }

                    if((inputValFirst != "" && typeof(inputValFirst) != 'undefined') && (inputVallast != "" && typeof(inputVallast) != 'undefined') ){
                        var diffval =  eval(inputValFirst) - eval(inputVallast);
                    }
                    else if((inputValFirst == "") && (checkNextVal != "" && typeof(checkNextVal) != 'undefined') && (inputVallast != ""  && typeof(inputVallast) != 'undefined')){
                        var diffNBval = Number(checkNextVal)  - eval(inputVallast);
                        $(inputNextBottomId).val(diffNBval);
                    }
                    else{
                        var diffval = "";
                    }
                    //var checkDay = -365 ;
                    //checkAlertRangeLastInputValueExist(zeitIntervallAnl,mst_id,date,inputCurrTopId,inputCurrBottomId,rowMainIDDs,prevId,checkDay);
                    if(inputVallast != "")
                    {
                        $(inputCurrBottomId).val(diffval);

                        break;
                    }
                    else{
                        continue;
                    }
                }
                while (inputVallast == "");
                //  return false;
                //console.log('inputVallast='+inputVallast);
                if(typeof(inputVallast) =='undefined'){
                     checkAlertRangeLastInputValueExistPrdkt(zeitIntervallAnl,mst_id,date,inputCurrTopId,inputCurrBottomId,rowMainIDDs,prevId);

                }
            }
            if(checkNextVal =='' && typeof(checkNextInpDs) =='undefined'){
                do {
                    nextId++;
                    var inputIdNextlast = "#"+rowMainIDEn+" #anlageMainRow_"+nextId;
                    var inputNextLastBottomId = "#"+rowMainIDDs+" #anlageCalculationRow_"+nextId;
                    var inputValNextlast = $(inputIdNextlast).val();
                    if((inputValFirst != "" && typeof(inputValFirst) != 'undefined') && (inputValNextlast != "" && typeof(inputValNextlast) != 'undefined')){
                        var diffNextval = eval(inputValNextlast)-eval(inputValFirst);
                    }
                    /*else if((inputValFirst == "") && (inputCurPrevId != "" && typeof(inputCurPrevId) != 'undefined') && (inputValNextlast != ""  && typeof(inputValNextlast) != 'undefined')){

                        var diffNextval = Number($('#inputNextLastValDB').val()) - Number($($(inputCurPrevId).val()).val());
                    }*/
                    else{
                        if($('#inputLastValDB').val()){
                          var diffNextval = $('#inputNextLastValDB').val() - $('#inputLastValDB').val() ;
                        }
                        if($($(inputCurPrevId).val()).val()){
                            var diffNextval = Number($('#inputNextLastValDB').val()) - Number($($(inputCurPrevId).val()).val());
                        }

                    }
                    if(inputValNextlast != "")
                    {
                        $(inputNextLastBottomId).val(diffNextval);
                        break;
                    }
                    else{continue;}
                }
                while (inputValNextlast == "");
                    //return false;
            }
            /*MM_21-01-2021 End:check previous value is null and last value*/

            if($('#currInputID').val() == 0){
                //$('#inputPrevValDB').val("");
                //console.log(0);
                if((inputValFirst == "" && typeof(inputValFirst) != 'undefined') && (inputValNext != "" && typeof(inputValNext) != 'undefined') ){

                    var secBottomValDB = $($('#inputNextId').val()).val() - $('#inputPrevValDB').val();
                    //console.log("currinput0 : secondBottom"+secBottomValDB+"->"+$('#inputPrevValDB').val()+"-"+$($('#inputNextId').val()).val());
                    if($('#inputPrevValDB').val()){
                        console.log.log('ghghg');
                        $(inputNextBottomId).val(secBottomValDB);
                    }
                    else{
                        $(inputNextBottomId).val("");
                    }
                }
                if((inputValFirst == "" && typeof(inputValFirst) != 'undefined') && (inputValNextlast != "" && typeof(inputValNextlast) != 'undefined')){
                        var lastBottomValDB = $(inputIdNextlast).val() - $('#inputPrevValDB').val();
                        //console.log("currinput0 : lastBottomValDB"+lastBottomValDB+"->"+$(inputIdNextlast).val()+"-"+$('#inputPrevValDB').val());
                        if($('#inputPrevValDB').val()){
                            $(inputNextLastBottomId).val(lastBottomValDB);
                        }
                        else{
                            $(inputNextLastBottomId).val("");
                        }
                        //$(inputNextLastBottomId).val("");
                    }
                //var checkDay = -5 ;
               // checkAlertRangeLastInputValueExist(zeitIntervallAnl,mst_id,date,inputCurrTopId,inputCurrBottomId,rowMainIDDs,prevId,checkDay);
                checkAlertRangeLastInputValueExistPrdkt(zeitIntervallAnl,mst_id,date,inputCurrTopId,inputCurrBottomId,rowMainIDDs,prevId);
            }
            else if(allPrevVal){
                if(allPrevVal.length == 0 ){
                    if((inputValFirst == "" && typeof(inputValFirst) != 'undefined') && (inputValNext != "" && typeof(inputValNext) != 'undefined') ){
                        var secBottomValDB = $($('#inputNextId').val()).val() - $('#inputPrevValDB').val();
                         //console.log("allPrevVal.length0 : secondBottom"+secBottomValDB+"->"+$('#inputPrevValDB').val()+"-"+$($('#inputNextId').val()).val());
                        if($('#inputPrevValDB').val()){
                            $(inputNextBottomId).val(secBottomValDB);
                        }
                        else
                        {
                         $(inputNextBottomId).val("");
                        }

                    }
                    if((inputValFirst == "" && typeof(inputValFirst) != 'undefined') && (inputValNextlast != "" && typeof(inputValNextlast) != 'undefined')){
                        var lastBottomValDB = $(inputIdNextlast).val() - $('#inputPrevValDB').val();
                        //console.log("allPrevVal.length0 : lastBottomValDB"+lastBottomValDB+"->"+$(inputIdNextlast).val()+"-"+$('#inputPrevValDB').val());
                        if($('#inputPrevValDB').val()){
                            $(inputNextLastBottomId).val(lastBottomValDB);
                        }
                        else{
                            $(inputNextLastBottomId).val("");
                        }
                        //$(inputNextLastBottomId).val("");
                    }


                }
                //console.log('inputValCurrent='+inputValCurrent);
                //if(inputValCurrent==''){
                    //var checkDay = -5 ;
                   // checkAlertRangeLastInputValueExist(zeitIntervallAnl,mst_id,date,inputCurrTopId,inputCurrBottomId,rowMainIDDs,prevId);
                    //checkAlertRangeLastInputValueExist(zeitIntervallAnl,mst_id,date,inputCurrTopId,inputCurrBottomId,rowMainIDDs,prevId,checkDay);

                //}
                //console.log(1);
            }
            /*else{
                //var checkDay = -1 ;
                checkAlertRangeLastInputValueExist(zeitIntervallAnl,mst_id,date,inputCurrTopId,inputCurrBottomId,rowMainIDDs,prevId);
                //checkAlertRangeLastInputValueExist(zeitIntervallAnl,mst_id,date,inputCurrTopId,inputCurrBottomId,rowMainIDDs,prevId,checkDay);
                console.log(2);
            }*/
            e.stopPropagation();

        });
        /*new-mm-end 05-04-2021*/

        /*added selector #infosMasseneingabeMesssetelle .txtBoxSrch 05-04-2021*/
        $('body').on('focus', '#infosMasseneingabe .txtBoxSrch , #infosMasseneingabeMesssetelle .txtBoxSrch', function(e){
            var zeitIntervallAnl = $(".infosMasseneingabeInside button.active").attr('data-id');
            var inputId=this.id;
            var splitId = inputId.split("_");
            var currID = splitId[1];
            var currNextID = eval(splitId[1])+eval(1);
            var bottomPrevId = eval(splitId[1])-eval(1);
            var bottomPrevNextId = eval(bottomPrevId)-eval(1);
            var rowMainIDEn = $(this).closest('tr').attr('id');
            var rowMainIDDs = $(this).closest('tr').next('tr').attr('id');
            var rowMstID = $(this).closest('td').attr('data-id');
            var date = $(this).closest('td').attr('date');
            //$("#timeIntervalWerteEnergiedatenIMw .txtBoxSrch").NumericOnly();

            var inputBottomPrevId = "#"+rowMainIDDs+" #anlageCalculationRow_"+bottomPrevId;
            var inputBottomPrevNextId = "#"+rowMainIDDs+" #anlageCalculationRow_"+bottomPrevNextId;
            var inputTopPrevNextId = "#"+rowMainIDEn+" #anlageMainRow_"+bottomPrevNextId;

            var inputCurPrevId = "#"+rowMainIDEn+" #anlageMainRow_"+bottomPrevId;
            var inputNextId = "#"+rowMainIDEn+" #anlageMainRow_"+currID;

            var inputBottomCurrId = "#"+rowMainIDDs+" #anlageCalculationRow_"+currID;

            var einheitVal = $(this).closest('tr').attr('data-einheit');
            var inptCurPrevId = $("#inputCurPrevId").val();
            var inptCurrId= $("#inputCurrId").val();

            var inputCurNextId = $("#inputNextId").val();
            var inputDeleteBotmId = $("#inputDeleteBotmId").val();
            var inputDefaultShowPopup = $("#inputDefaultShowPopup").val();


            /*12-02-2021 new code for enable concern popup*/
            var inputBottomCurrIdNw = $("#inputBottomCurrId").val();
            var inputBottomPrevIdNw = $("#inputBottomPrevId").val();
            var inputBottomCurrValNw = $(inputBottomCurrIdNw).val();
            var inputBottomPrevValNw = $(inputBottomPrevIdNw).val();
            /*12-02-2021 new code for enable concern popup*/

            /*MM_21-01-2021 Start:check previous value is null and last value*/

            var inputVal=$(this).val();
            var checkPrevVal = $(this).closest('td').prev('td').find('input').val();
            var inputCurrId = "#"+rowMainIDEn+" #anlageMainRow_"+currID;
            var inputCurrBottomId = "#"+rowMainIDDs+" #anlageCalculationRow_"+currID;

            //var NextIdCheck = Number(currID);
            //var inputNextBottomId = "#"+rowMainIDDs+" #anlageCalculationRow_"+NextIdCheck;
            var inputNextBottomId = $("#inputNextBottomId").val();
            var inputIdPrevlast = $('#inputLastValDB').val();
            var inputNextLastValDB = $("#inputNextLastValDB").val();
            var nextId = $("#inputNextLastIdDB").val();
            var prevId = $("#inputPrevLastIdDB").val();
            var inputNextLastId = "#"+rowMainIDEn+" #anlageMainRow_"+nextId;
            var inputPrevLastId = "#"+rowMainIDEn+" #anlageMainRow_"+prevId;
            var inputNextLastBottomId = "#"+rowMainIDDs+" #anlageCalculationRow_"+nextId;
            var inputPrevLastBottomId = "#"+rowMainIDDs+" #anlageCalculationRow_"+prevId;

            if(anlageObj[rowMstID]){
                var inputCountLength = anlageObj[rowMstID].length;
                if(inputCountLength>4){
                     checkAlertRangeMinMaxServerSide(zeitIntervallAnl,rowMstID,date,rowMainIDDs);
                }
            }

            if($(inputCurrId).val() !='' && typeof($(inputCurrId)) != 'undefined') {
                //continue..
            }else{
                 $(inputCurrBottomId).val("");
            }

            var nextPrevDiff = inputNextLastValDB -inputIdPrevlast;

            if($(inptCurPrevId).val() == "" && inputIdPrevlast !=""){
                var nextDiff = $(inputCurNextId).val() -  inputIdPrevlast;
            }
            else if($(inptCurPrevId).val() !=""){
                var nextDiff = $(inputCurNextId).val() -  $(inptCurPrevId).val() ;
            }

            //console.log($(inputNextLastBottomId).val());
            var lastNextDiff  =  inputNextLastValDB - $(inptCurPrevId).val();

            //old code 1 line-no-3880 commented for test.
            //$("#inputPrevValDB").val($(inptCurPrevId).val());

            /*bugtest 01-02-2021*/
            /*if(inptCurPrevId){
                if( $(inptCurPrevId) != "" && typeof($(inptCurPrevId.val())) != 'undefined'){
                    $("#inputPrevValDB").val($(inptCurPrevId).val());
                }
            }*/
            /*if($(inputCurNextId).val() != "" && $("#inputPrevValDB").val() != ""){
                var prevDBDiff = $(inputCurNextId).val() - $("#inputPrevValDB").val();
                alert(prevDBDiff);
            }
            */
            /*bugtest 01-02-2021*/


            //var prevDiff = $(inputCurNextId).val() - $(inputCurPrevId).val();
            /*console.log('inputPrevValDB='+$("#inputPrevValDB").val());
            console.log('inptCurrId='+$(inptCurrId).val());
            console.log('inptCurPrevId='+$(inptCurPrevId).val());
            console.log('inptCurPrevId='+$(inptCurPrevId).val());*/

            /*MM_21-01-2021 End:check previous value is null and last value*/

            if((einheitVal==1 || einheitVal==2) && (einheitVal !='' && typeof(einheitVal) !='undefined')){

                if(($(inptCurPrevId).val() !='' && $(inptCurrId).val() !='') && (typeof($(inptCurPrevId).val()) !='undefined' && typeof($(inptCurrId).val()) !='undefined')){
                    if(Number($(inptCurrId).val()) <= Number($(inptCurPrevId).val())){
                        alert('Current value should be greater then previous value!');

                        if($(inputCurNextId).val()!="" && $(inputTopPrevNextId).val() !=""){
                            var prevDiff = $(inputCurNextId).val() - $(inputTopPrevNextId).val();
                            if(prevDiff){ /*Nzp 03-02-2021*/
                                $(inputNextBottomId).val(prevDiff);
                            }else{
                                $(inputNextBottomId).val('');
                            }
                        }
                        /*if($('#currInputID').val() == 0){
                            console.log(prevDBDiff);
                        }*/
                        $(inptCurrId).val('');
                        $(inputDeleteBotmId).val('');
                        $(inputNextLastBottomId).val(lastNextDiff);
                        $(inptCurrId).focus();
                        resetInputsSearchMasseneingabe();
                        return false;
                    }
                }else if(($("#inputPrevValDB").val() !='' && $(inptCurrId).val() !='') && (typeof($("#inputPrevValDB").val()) !='undefined' && typeof($(inptCurrId).val()) !='undefined')){
                    if(Number($(inptCurrId).val()) <= Number($("#inputPrevValDB").val())){
                        alert('Current value should be greater then previous value!');
                        $(inptCurrId).val('');
                        $(inputDeleteBotmId).val('');
                        $(inputNextLastBottomId).val(lastNextDiff);
                        $(inptCurrId).focus();
                        resetInputsSearchMasseneingabe();
                        return false;
                    }
                }

                if(($(inputCurNextId).val() !='' && $(inptCurrId).val() !='') && (typeof($(inputCurNextId).val()) !='undefined' && typeof($(inptCurrId).val()) !='undefined')){
                    if(Number($(inptCurrId).val()) >= Number($(inputCurNextId).val())){
                        alert('Current value should not be greater then next value! ');
                        $(inptCurrId).val('');
                        $(inputDeleteBotmId).val('');
                        console.log(1);
                        if(nextDiff){  /*Nzp 03-02-2021*/
                            $(inputNextBottomId).val(nextDiff);
                        }else{
                            $(inputNextBottomId).val('');
                        }
                        $(inptCurrId).focus();
                        resetInputsSearchMasseneingabe();
                        return false;
                    }
                }
                if(($("#inputLastValDB").val() !='' && $(inptCurrId).val() !='') && (typeof($("#inputLastValDB").val()) !='undefined' && typeof($(inptCurrId).val()) !='undefined')){
                    if(Number($(inptCurrId).val()) <= Number($('#inputLastValDB').val())){
                        if(($($(inputFocusedId).val()).val() !='' && typeof($($(inputFocusedId).val()).val() ) !='undefined')
                         && ($(inptCurPrevId).val() == "" && typeof($(inptCurPrevId).val() ) !='undefined')){ /*nzp 04-02-2021*/
                          alert('Current value should be greater then last value!');
                          //alert('lastbugtest');
                          $(inptCurrId).val('');
                          $(inputDeleteBotmId).val('');
                          $(inputNextLastBottomId).val(nextPrevDiff);
                          if($(inputCurNextId).val() !=''){
                             $(inputNextBottomId).val(nextDiff);
                          }
                          $(inptCurrId).focus();
                          resetInputsSearchMasseneingabe();
                          return false;
                        }

                    }
                }
                if(($("#inputNextLastValDB").val() !='' && $(inptCurrId).val() !='') && (typeof($("#inputNextLastValDB").val()) !='undefined' && typeof($(inptCurrId).val()) !='undefined')){
                   if(Number($(inptCurrId).val()) >= Number($("#inputNextLastValDB").val())){
                      alert('Current value should not be greater then next available value!');
                      $(inptCurrId).val('');
                      $(inputDeleteBotmId).val('');
                      $(inputNextLastBottomId).val(nextPrevDiff);
                      if($(inptCurPrevId).val() !=''){
                             $(inputNextLastBottomId).val(lastNextDiff);
                       }
                      /*new_addon mm-02-02-2021*/
                        if(allPrevVal)
                        {
                            if(allPrevVal.length == 0 && ( $("#inputPrevValDB").val() =='')){
                                $(inputNextLastBottomId).val("");
                            }
                            if( $("#inputLastValDB").val() =='' &&  $("#inputPrevValDB").val() ==''){
                                $(inputNextLastBottomId).val("");
                            }

                        }
                       /*new_addon end mm-02-02-2021*/
                      $(inptCurrId).focus();
                      resetInputsSearchMasseneingabe();
                     return false;
                   }
                }
            }
            if((einheitVal==3 || einheitVal==4) && (einheitVal !='' && typeof(einheitVal) !='undefined')){
                if(($(inptCurPrevId).val() !='' && $(inptCurrId).val() !='') && (typeof($(inptCurPrevId).val()) !='undefined' && typeof($(inptCurrId).val()) !='undefined')){
                   if(checkPositiveValue($(inptCurrId).val())==false || checkPositiveValue($(inptCurPrevId).val())==false
                    ){
                      alert('Current value & previous value should be positive!');
                      $(inptCurrId).val('');
                      $(inputDeleteBotmId).val('');
                      $(inptCurrId).focus();
                      resetInputsSearchMasseneingabe();
                      return false;
                   }
                }else if(($("#inputPrevValDB").val() !='' && $(inptCurrId).val() !='') && (typeof($("#inputPrevValDB").val()) !='undefined' && typeof($(inptCurrId).val()) !='undefined')){
                   if(checkPositiveValue($(inptCurrId).val())==false || checkPositiveValue($("#inputPrevValDB").val())==false
                    ){
                      alert('Current value & previous value should be positive!');
                      $(inptCurrId).val('');
                      $(inputDeleteBotmId).val('');
                      $(inptCurrId).focus();
                      resetInputsSearchMasseneingabe();
                      return false;
                   }
                }
                if(($(inputCurNextId).val() !='' && $(inptCurrId).val() !='') && (typeof($(inputCurNextId).val()) !='undefined' && typeof($(inptCurrId).val()) !='undefined')){
                   if(checkPositiveValue($(inptCurrId).val()) ==false || checkPositiveValue($(inputCurNextId).val())==false){
                      alert('Current value & next value should be positive!');
                      $(inptCurrId).val('');
                      $(inputDeleteBotmId).val('');
                      $(inptCurrId).focus();
                      resetInputsSearchMasseneingabe();
                      return false;
                   }
                }
                if(($("#inputLastValDB").val() !='' && $(inptCurrId).val() !='') && (typeof($("#inputLastValDB").val()) !='undefined' && typeof($(inptCurrId).val()) !='undefined')){
                   if(checkPositiveValue($(inptCurrId).val())==false || checkPositiveValue($("#inputLastValDB").val())==false
                    ){
                      alert('Current value & previous value should be positive!');
                      $(inptCurrId).val('');
                      $(inputDeleteBotmId).val('');
                      $(inptCurrId).focus();
                      resetInputsSearchMasseneingabe();
                      return false;
                   }
                }
                if(($("#inputNextLastValDB").val() !='' && $(inptCurrId).val() !='') && (typeof($("#inputNextLastValDB").val()) !='undefined' && typeof($(inptCurrId).val()) !='undefined')){
                   if(checkPositiveValue($(inptCurrId).val()) ==false || checkPositiveValue($("#inputNextLastValDB").val())==false){
                      alert('Current value & next value should be positive!');
                      $(inptCurrId).val('');
                      $(inputDeleteBotmId).val('');
                      $(inptCurrId).focus();
                      resetInputsSearchMasseneingabe();
                      return false;
                   }
                }
            }
            /*Check greater less condition*/
            $("#inputFocusedId").val(inputNextId);
            var showPopupExist = $(inptCurrId).hasClass("isShowPopup");

            if(($(inputBottomCurrIdNw).val() !='' && $(inputBottomPrevIdNw).val() !='') && (typeof($(inputBottomCurrIdNw).val()) !='undefined' && typeof($(inputBottomPrevIdNw).val()) !='undefined')){
                var inputValBottomPrev= $(inputBottomPrevIdNw).val();
                var inputValBottom=$(inputBottomCurrIdNw).val();
            }else{
                var inputValBottomPrev= $("#inputPrevBtmValDB").val();
                var inputValBottom=$("#inputValBottomCurr").val();
            }
            /*Min and Max condition*/
            var inputBotmMin = $("#inputBotmMin").val();
            var inputBotmMax = $("#inputBotmMax").val();
            var inputValBottomCurr = $("#inputValBottomCurr").val();
            /*console.log('inptCurrId='+inptCurrId);
            console.log('inputValBottom='+inputValBottom);
            console.log('inputValBottomPrev='+inputValBottomPrev);
            console.log('showPopupExist='+showPopupExist);
            console.log('inputDefaultShowPopup='+inputDefaultShowPopup);*/
            if((inputBottomCurrValNw !='' && inputValBottomPrev !='' ) && (typeof(inputValBottom) !='undefined' && typeof(inputValBottomPrev) !='undefined')){
                if(showPopupExist ==true && inputDefaultShowPopup=='true'){
                   if (( inputValBottomCurr !='' && typeof(inputValBottomCurr) !='undefined' && inputBotmMin !='' && inputBotmMax !='' ) && ((inputValBottomCurr <= Number(inputBotmMax)) && (inputValBottomCurr >= Number(inputBotmMin)))){
                    //var currInputID = $("#currInputID").val();
                    var rowMainIDDs = $("#rowMainIDDs").val();
                   // getLastInputValuesByCurrent(currInputID,rowMainIDDs,4);

                   if(anlageObj[rowMstID]){
                        var inputCountLength = anlageObj[rowMstID].length;
                        if(inputCountLength>4){
                             checkAlertRangeMinMaxServerSide(zeitIntervallAnl,rowMstID,date,rowMainIDDs);
                        }
                    }
                    $("#masseneingabeSpeichernSrch").prop("disabled", false);
                    /*new-mm-start 08-04-2021*/
                    $("#masseneingabeSpeichernSrchMesssetelle").prop("disabled",false);
                    /*new-mm-end 08-04-2021*/
                    return false;
                }
                var inputLengthBottom = inputValBottom.length;
                var inputLengthBottomPrev = inputValBottomPrev.length;
                var valLeft = checkPositiveValue(inputValBottomPrev);
                var valRight = checkPositiveValue(inputValBottom);
                var nValBtm = convertToPositive(inputValBottom);
                var nValBtmPrev =convertToPositive(inputValBottomPrev);

                    if(valLeft ==true && valRight ==true) {
                        if(inputLengthBottom != inputLengthBottomPrev){
                            //alert('concern 1');
                            intBdeSearchConcernOrDeletePopUp(inputCurPrevId,inputNextId,inputBottomCurrId,rowMstID);
                        }
                    }else if((valLeft ==true && valRight ==false) || (valLeft ==false && valRight ==true)){
                             //alert('concern 2');
                            intBdeSearchConcernOrDeletePopUp(inputCurPrevId,inputNextId,inputBottomCurrId,rowMstID);
                    }else if(valLeft ==false && valRight ==false) {
                        if(inputLengthBottom != inputLengthBottomPrev){
                             //alert('concern 3');
                            intBdeSearchConcernOrDeletePopUp(inputCurPrevId,inputNextId,inputBottomCurrId,rowMstID);
                        }
                    }
                    //$("#masseneingabeSpeichernSrch").prop("disabled", false);
                }


            }

            /*MM_25-01-2020 Concern popup on if prevlast and current bottom val().length are diffrent*/

            var showLastPopupExist = $(inputCurrId).hasClass("isShowPopup");

            if($(inputPrevLastBottomId).val() !='' && typeof($(inputPrevLastBottomId).val()) !='undefined' && $("#inputValBottomCurr").val() != "" ){
                var inputPrevLastBottomVal = $(inputPrevLastBottomId).val();
                var inputBottomCurrVal = $("#inputValBottomCurr").val();

            }
            if($(inputPrevLastBottomId).val() !='' && typeof($(inputPrevLastBottomId).val()) !='undefined' ){
                if(showLastPopupExist == true && inputDefaultShowPopup=='true'){
                    if(inputPrevLastBottomVal !="" && typeof(inputPrevLastBottomVal) !='undefined'){
                        var inputPrevLastBottomLength = inputPrevLastBottomVal.length;
                    }
                    if(inputBottomCurrVal !="" && typeof(inputBottomCurrVal) !='undefined'){
                       var inputBottomCurrLength = inputBottomCurrVal.length;
                    }
                    var valLastLeft = checkPositiveValue(inputPrevLastBottomVal);
                    var valLastRight = checkPositiveValue(inputBottomCurrVal);

                    if(valLastLeft ==true && valLastRight ==true) {
                        if(inputBottomCurrLength != inputPrevLastBottomLength){
                            //alert('concern 4');
                            intBdeSearchConcernOrDeletePopUp(inputPrevLastId,inputNextId,inputBottomCurrId,rowMstID);
                        }
                    }
                    //$("#masseneingabeSpeichernSrch").prop("disabled", false);
                }
            }
            /*MM_25-01-2020 End Concern popup on if prevlast and current bottom val().length are diffrent*/
             //console.log(e);
                if($('#intBdeConcernOrDeletePopUp').length==0){
                    $("#masseneingabeSpeichernSrch").prop("disabled",false);
                    /*new-mm-start 08-04-2021*/
                    $("#masseneingabeSpeichernSrchMesssetelle").prop("disabled",false);
                    /*new-mm-end 08-04-2021*/
                    /*mm-issue 01-04-2021*/
                    //saveToDBMasseneingabeEingabenSingleRow(zeitIntervallAnl,rowMainIDEn,rowMainIDDs);
                    /*mm-issue 01-04-2021*/

                }
            e.stopPropagation();

        });

        /*new-mm-start 05-04-2021*/
        $('body').on('focus', '#infosMasseneingabePrdkt .txtBoxSrch', function(e){
            var zeitIntervallAnl = $(".infosMasseneingabeInside button.active").attr('data-id');
            var inputId=this.id;
            var splitId = inputId.split("_");
            var currID = splitId[1];
            var currNextID = eval(splitId[1])+eval(1);
            var bottomPrevId = eval(splitId[1])-eval(1);
            var bottomPrevNextId = eval(bottomPrevId)-eval(1);
            var rowMainIDEn = $(this).closest('tr').attr('id');
            var rowMainIDDs = $(this).closest('tr').next('tr').attr('id');
            var rowMstID = $(this).closest('td').attr('data-id');
            var date = $(this).closest('td').attr('date');
            //$("#timeIntervalWerteEnergiedatenIMw .txtBoxSrch").NumericOnly();

            var inputBottomPrevId = "#"+rowMainIDDs+" #anlageCalculationRow_"+bottomPrevId;
            var inputBottomPrevNextId = "#"+rowMainIDDs+" #anlageCalculationRow_"+bottomPrevNextId;
            var inputTopPrevNextId = "#"+rowMainIDEn+" #anlageMainRow_"+bottomPrevNextId;

            var inputCurPrevId = "#"+rowMainIDEn+" #anlageMainRow_"+bottomPrevId;
            var inputNextId = "#"+rowMainIDEn+" #anlageMainRow_"+currID;

            var inputBottomCurrId = "#"+rowMainIDDs+" #anlageCalculationRow_"+currID;

            var einheitVal = $(this).closest('tr').attr('data-einheit');
            var inptCurPrevId = $("#inputCurPrevId").val();
            var inptCurrId= $("#inputCurrId").val();

            var inputCurNextId = $("#inputNextId").val();
            var inputDeleteBotmId = $("#inputDeleteBotmId").val();
            var inputDefaultShowPopup = $("#inputDefaultShowPopup").val();


            /*12-02-2021 new code for enable concern popup*/
            var inputBottomCurrIdNw = $("#inputBottomCurrId").val();
            var inputBottomPrevIdNw = $("#inputBottomPrevId").val();
            var inputBottomCurrValNw = $(inputBottomCurrIdNw).val();
            var inputBottomPrevValNw = $(inputBottomPrevIdNw).val();
            /*12-02-2021 new code for enable concern popup*/

            /*MM_21-01-2021 Start:check previous value is null and last value*/

            var inputVal=$(this).val();
            var checkPrevVal = $(this).closest('td').prev('td').find('input').val();
            var inputCurrId = "#"+rowMainIDEn+" #anlageMainRow_"+currID;
            var inputCurrBottomId = "#"+rowMainIDDs+" #anlageCalculationRow_"+currID;

            //var NextIdCheck = Number(currID);
            //var inputNextBottomId = "#"+rowMainIDDs+" #anlageCalculationRow_"+NextIdCheck;
            var inputNextBottomId = $("#inputNextBottomId").val();
            var inputIdPrevlast = $('#inputLastValDB').val();
            var inputNextLastValDB = $("#inputNextLastValDB").val();
            var nextId = $("#inputNextLastIdDB").val();
            var prevId = $("#inputPrevLastIdDB").val();
            var inputNextLastId = "#"+rowMainIDEn+" #anlageMainRow_"+nextId;
            var inputPrevLastId = "#"+rowMainIDEn+" #anlageMainRow_"+prevId;
            var inputNextLastBottomId = "#"+rowMainIDDs+" #anlageCalculationRow_"+nextId;
            var inputPrevLastBottomId = "#"+rowMainIDDs+" #anlageCalculationRow_"+prevId;

            if(anlageObj[rowMstID]){
                var inputCountLength = anlageObj[rowMstID].length;
                if(inputCountLength>4){
                     checkAlertRangeMinMaxServerSidePrdkt(zeitIntervallAnl,rowMstID,date,rowMainIDDs);
                }
            }

            if($(inputCurrId).val() !='' && typeof($(inputCurrId)) != 'undefined') {
                //continue..
            }else{
                 $(inputCurrBottomId).val("");
            }

            var nextPrevDiff = inputNextLastValDB -inputIdPrevlast;

            if($(inptCurPrevId).val() == "" && inputIdPrevlast !=""){
                var nextDiff = $(inputCurNextId).val() -  inputIdPrevlast;
            }
            else if($(inptCurPrevId).val() !=""){
                var nextDiff = $(inputCurNextId).val() -  $(inptCurPrevId).val() ;
            }

            //console.log($(inputNextLastBottomId).val());
            var lastNextDiff  =  inputNextLastValDB - $(inptCurPrevId).val();

            //old code 1 line-no-3880 commented for test.
            //$("#inputPrevValDB").val($(inptCurPrevId).val());

            /*bugtest 01-02-2021*/
            /*if(inptCurPrevId){
                if( $(inptCurPrevId) != "" && typeof($(inptCurPrevId.val())) != 'undefined'){
                    $("#inputPrevValDB").val($(inptCurPrevId).val());
                }
            }*/
            /*if($(inputCurNextId).val() != "" && $("#inputPrevValDB").val() != ""){
                var prevDBDiff = $(inputCurNextId).val() - $("#inputPrevValDB").val();
                alert(prevDBDiff);
            }
            */
            /*bugtest 01-02-2021*/


            //var prevDiff = $(inputCurNextId).val() - $(inputCurPrevId).val();
            /*console.log('inputPrevValDB='+$("#inputPrevValDB").val());
            console.log('inptCurrId='+$(inptCurrId).val());
            console.log('inptCurPrevId='+$(inptCurPrevId).val());
            console.log('inptCurPrevId='+$(inptCurPrevId).val());*/

            /*MM_21-01-2021 End:check previous value is null and last value*/

            if((einheitVal==1 || einheitVal==2) && (einheitVal !='' && typeof(einheitVal) !='undefined')){

                if(($(inptCurPrevId).val() !='' && $(inptCurrId).val() !='') && (typeof($(inptCurPrevId).val()) !='undefined' && typeof($(inptCurrId).val()) !='undefined')){
                    if(Number($(inptCurrId).val()) <= Number($(inptCurPrevId).val())){
                        alert('Current value should be greater then previous value!');

                        if($(inputCurNextId).val()!="" && $(inputTopPrevNextId).val() !=""){
                            var prevDiff = $(inputCurNextId).val() - $(inputTopPrevNextId).val();
                            if(prevDiff){ /*Nzp 03-02-2021*/
                                $(inputNextBottomId).val(prevDiff);
                            }else{
                                $(inputNextBottomId).val('');
                            }
                        }
                        /*if($('#currInputID').val() == 0){
                            console.log(prevDBDiff);
                        }*/
                        $(inptCurrId).val('');
                        $(inputDeleteBotmId).val('');
                        $(inputNextLastBottomId).val(lastNextDiff);
                        $(inptCurrId).focus();
                        resetInputsSearchMasseneingabe();
                        return false;
                    }
                }else if(($("#inputPrevValDB").val() !='' && $(inptCurrId).val() !='') && (typeof($("#inputPrevValDB").val()) !='undefined' && typeof($(inptCurrId).val()) !='undefined')){
                    if(Number($(inptCurrId).val()) <= Number($("#inputPrevValDB").val())){
                        alert('Current value should be greater then previous value!');
                        $(inptCurrId).val('');
                        $(inputDeleteBotmId).val('');
                        $(inputNextLastBottomId).val(lastNextDiff);
                        $(inptCurrId).focus();
                        resetInputsSearchMasseneingabe();
                        return false;
                    }
                }

                if(($(inputCurNextId).val() !='' && $(inptCurrId).val() !='') && (typeof($(inputCurNextId).val()) !='undefined' && typeof($(inptCurrId).val()) !='undefined')){
                    if(Number($(inptCurrId).val()) >= Number($(inputCurNextId).val())){
                        alert('Current value should not be greater then next value! ');
                        $(inptCurrId).val('');
                        $(inputDeleteBotmId).val('');
                        console.log(1);
                        if(nextDiff){  /*Nzp 03-02-2021*/
                            $(inputNextBottomId).val(nextDiff);
                        }else{
                            $(inputNextBottomId).val('');
                        }
                        $(inptCurrId).focus();
                        resetInputsSearchMasseneingabe();
                        return false;
                    }
                }
                if(($("#inputLastValDB").val() !='' && $(inptCurrId).val() !='') && (typeof($("#inputLastValDB").val()) !='undefined' && typeof($(inptCurrId).val()) !='undefined')){
                    if(Number($(inptCurrId).val()) <= Number($('#inputLastValDB').val())){
                        if(($($(inputFocusedId).val()).val() !='' && typeof($($(inputFocusedId).val()).val() ) !='undefined')
                         && ($(inptCurPrevId).val() == "" && typeof($(inptCurPrevId).val() ) !='undefined')){ /*nzp 04-02-2021*/
                          alert('Current value should be greater then last value!');
                          //alert('lastbugtest');
                          $(inptCurrId).val('');
                          $(inputDeleteBotmId).val('');
                          $(inputNextLastBottomId).val(nextPrevDiff);
                          if($(inputCurNextId).val() !=''){
                             $(inputNextBottomId).val(nextDiff);
                          }
                          $(inptCurrId).focus();
                          resetInputsSearchMasseneingabe();
                          return false;
                        }

                    }
                }
                if(($("#inputNextLastValDB").val() !='' && $(inptCurrId).val() !='') && (typeof($("#inputNextLastValDB").val()) !='undefined' && typeof($(inptCurrId).val()) !='undefined')){
                   if(Number($(inptCurrId).val()) >= Number($("#inputNextLastValDB").val())){
                      alert('Current value should not be greater then next available value!');
                      $(inptCurrId).val('');
                      $(inputDeleteBotmId).val('');
                      $(inputNextLastBottomId).val(nextPrevDiff);
                      if($(inptCurPrevId).val() !=''){
                             $(inputNextLastBottomId).val(lastNextDiff);
                       }
                      /*new_addon mm-02-02-2021*/
                        if(allPrevVal)
                        {
                            if(allPrevVal.length == 0 && ( $("#inputPrevValDB").val() =='')){
                                $(inputNextLastBottomId).val("");
                            }
                            if( $("#inputLastValDB").val() =='' &&  $("#inputPrevValDB").val() ==''){
                                $(inputNextLastBottomId).val("");
                            }

                        }
                       /*new_addon end mm-02-02-2021*/
                      $(inptCurrId).focus();
                      resetInputsSearchMasseneingabe();
                     return false;
                   }
                }
            }
            if((einheitVal==3 || einheitVal==4) && (einheitVal !='' && typeof(einheitVal) !='undefined')){
                if(($(inptCurPrevId).val() !='' && $(inptCurrId).val() !='') && (typeof($(inptCurPrevId).val()) !='undefined' && typeof($(inptCurrId).val()) !='undefined')){
                   if(checkPositiveValue($(inptCurrId).val())==false || checkPositiveValue($(inptCurPrevId).val())==false
                    ){
                      alert('Current value & previous value should be positive!');
                      $(inptCurrId).val('');
                      $(inputDeleteBotmId).val('');
                      $(inptCurrId).focus();
                      resetInputsSearchMasseneingabe();
                      return false;
                   }
                }else if(($("#inputPrevValDB").val() !='' && $(inptCurrId).val() !='') && (typeof($("#inputPrevValDB").val()) !='undefined' && typeof($(inptCurrId).val()) !='undefined')){
                   if(checkPositiveValue($(inptCurrId).val())==false || checkPositiveValue($("#inputPrevValDB").val())==false
                    ){
                      alert('Current value & previous value should be positive!');
                      $(inptCurrId).val('');
                      $(inputDeleteBotmId).val('');
                      $(inptCurrId).focus();
                      resetInputsSearchMasseneingabe();
                      return false;
                   }
                }
                if(($(inputCurNextId).val() !='' && $(inptCurrId).val() !='') && (typeof($(inputCurNextId).val()) !='undefined' && typeof($(inptCurrId).val()) !='undefined')){
                   if(checkPositiveValue($(inptCurrId).val()) ==false || checkPositiveValue($(inputCurNextId).val())==false){
                      alert('Current value & next value should be positive!');
                      $(inptCurrId).val('');
                      $(inputDeleteBotmId).val('');
                      $(inptCurrId).focus();
                      resetInputsSearchMasseneingabe();
                      return false;
                   }
                }
                if(($("#inputLastValDB").val() !='' && $(inptCurrId).val() !='') && (typeof($("#inputLastValDB").val()) !='undefined' && typeof($(inptCurrId).val()) !='undefined')){
                   if(checkPositiveValue($(inptCurrId).val())==false || checkPositiveValue($("#inputLastValDB").val())==false
                    ){
                      alert('Current value & previous value should be positive!');
                      $(inptCurrId).val('');
                      $(inputDeleteBotmId).val('');
                      $(inptCurrId).focus();
                      resetInputsSearchMasseneingabe();
                      return false;
                   }
                }
                if(($("#inputNextLastValDB").val() !='' && $(inptCurrId).val() !='') && (typeof($("#inputNextLastValDB").val()) !='undefined' && typeof($(inptCurrId).val()) !='undefined')){
                   if(checkPositiveValue($(inptCurrId).val()) ==false || checkPositiveValue($("#inputNextLastValDB").val())==false){
                      alert('Current value & next value should be positive!');
                      $(inptCurrId).val('');
                      $(inputDeleteBotmId).val('');
                      $(inptCurrId).focus();
                      resetInputsSearchMasseneingabe();
                      return false;
                   }
                }
            }
            /*Check greater less condition*/
            $("#inputFocusedId").val(inputNextId);
            var showPopupExist = $(inptCurrId).hasClass("isShowPopup");

            if(($(inputBottomCurrIdNw).val() !='' && $(inputBottomPrevIdNw).val() !='') && (typeof($(inputBottomCurrIdNw).val()) !='undefined' && typeof($(inputBottomPrevIdNw).val()) !='undefined')){
                var inputValBottomPrev= $(inputBottomPrevIdNw).val();
                var inputValBottom=$(inputBottomCurrIdNw).val();
            }else{
                var inputValBottomPrev= $("#inputPrevBtmValDB").val();
                var inputValBottom=$("#inputValBottomCurr").val();
            }
            /*Min and Max condition*/
            var inputBotmMin = $("#inputBotmMin").val();
            var inputBotmMax = $("#inputBotmMax").val();
            var inputValBottomCurr = $("#inputValBottomCurr").val();
            /*console.log('inptCurrId='+inptCurrId);
            console.log('inputValBottom='+inputValBottom);
            console.log('inputValBottomPrev='+inputValBottomPrev);
            console.log('showPopupExist='+showPopupExist);
            console.log('inputDefaultShowPopup='+inputDefaultShowPopup);*/
            if((inputBottomCurrValNw !='' && inputValBottomPrev !='' ) && (typeof(inputValBottom) !='undefined' && typeof(inputValBottomPrev) !='undefined')){
                if(showPopupExist ==true && inputDefaultShowPopup=='true'){
                   if (( inputValBottomCurr !='' && typeof(inputValBottomCurr) !='undefined' && inputBotmMin !='' && inputBotmMax !='' ) && ((inputValBottomCurr <= Number(inputBotmMax)) && (inputValBottomCurr >= Number(inputBotmMin)))){
                    //var currInputID = $("#currInputID").val();
                    var rowMainIDDs = $("#rowMainIDDs").val();
                   // getLastInputValuesByCurrent(currInputID,rowMainIDDs,4);

                   if(anlageObj[rowMstID]){
                        var inputCountLength = anlageObj[rowMstID].length;
                        if(inputCountLength>4){
                             checkAlertRangeMinMaxServerSidePrdkt(zeitIntervallAnl,rowMstID,date,rowMainIDDs);
                        }
                    }
                    /*new-mm-start 08-04-2021*/
                    $("#masseneingabeSpeichernSrchPrdkt").prop("disabled",false);
                    /*new-mm-end 08-04-2021*/
                    return false;
                }
                var inputLengthBottom = inputValBottom.length;
                var inputLengthBottomPrev = inputValBottomPrev.length;
                var valLeft = checkPositiveValue(inputValBottomPrev);
                var valRight = checkPositiveValue(inputValBottom);
                var nValBtm = convertToPositive(inputValBottom);
                var nValBtmPrev =convertToPositive(inputValBottomPrev);

                    if(valLeft ==true && valRight ==true) {
                        if(inputLengthBottom != inputLengthBottomPrev){
                            //alert('concern 1');
                            intBdeSearchConcernOrDeletePopUpPrdkt(inputCurPrevId,inputNextId,inputBottomCurrId,rowMstID);
                        }
                    }else if((valLeft ==true && valRight ==false) || (valLeft ==false && valRight ==true)){
                             //alert('concern 2');
                            intBdeSearchConcernOrDeletePopUpPrdkt(inputCurPrevId,inputNextId,inputBottomCurrId,rowMstID);
                    }else if(valLeft ==false && valRight ==false) {
                        if(inputLengthBottom != inputLengthBottomPrev){
                             //alert('concern 3');
                            intBdeSearchConcernOrDeletePopUpPrdkt(inputCurPrevId,inputNextId,inputBottomCurrId,rowMstID);
                        }
                    }
                    //$("#masseneingabeSpeichernSrch").prop("disabled", false);
                }


            }

            /*MM_25-01-2020 Concern popup on if prevlast and current bottom val().length are diffrent*/

            var showLastPopupExist = $(inputCurrId).hasClass("isShowPopup");

            if($(inputPrevLastBottomId).val() !='' && typeof($(inputPrevLastBottomId).val()) !='undefined' && $("#inputValBottomCurr").val() != "" ){
                var inputPrevLastBottomVal = $(inputPrevLastBottomId).val();
                var inputBottomCurrVal = $("#inputValBottomCurr").val();

            }
            if($(inputPrevLastBottomId).val() !='' && typeof($(inputPrevLastBottomId).val()) !='undefined' ){
                if(showLastPopupExist == true && inputDefaultShowPopup=='true'){
                    if(inputPrevLastBottomVal !="" && typeof(inputPrevLastBottomVal) !='undefined'){
                        var inputPrevLastBottomLength = inputPrevLastBottomVal.length;
                    }
                    if(inputBottomCurrVal !="" && typeof(inputBottomCurrVal) !='undefined'){
                       var inputBottomCurrLength = inputBottomCurrVal.length;
                    }
                    var valLastLeft = checkPositiveValue(inputPrevLastBottomVal);
                    var valLastRight = checkPositiveValue(inputBottomCurrVal);

                    if(valLastLeft ==true && valLastRight ==true) {
                        if(inputBottomCurrLength != inputPrevLastBottomLength){
                            //alert('concern 4');
                            intBdeSearchConcernOrDeletePopUpPrdkt(inputPrevLastId,inputNextId,inputBottomCurrId,rowMstID);
                        }
                    }
                    //$("#masseneingabeSpeichernSrch").prop("disabled", false);
                }
            }
            /*MM_25-01-2020 End Concern popup on if prevlast and current bottom val().length are diffrent*/
            //console.log(e);

                if($('#intBdeConcernOrDeletePopUp').length==0){
                    //$("#masseneingabeSpeichernSrch").prop("disabled",false);
                    $("#masseneingabeSpeichernSrchPrdkt").prop("disabled",false);

                    /*mm-issue 01-04-2021*/
                    //saveToDBMasseneingabeEingabenSingleRow(zeitIntervallAnl,rowMainIDEn,rowMainIDDs);
                    /*mm-issue 01-04-2021*/
                    /*mm-issue 05-04-2021 use prdkt fn*/
                    //saveToDBMasseneingabeEingabenSingleRowPrdkt(zeitIntervallAnl,rowMainIDEn,rowMainIDDs);
                    /*mm-issue 05-04-2021*/

                }
            e.stopPropagation();

        });
        /*new-mm-end 05-04-2021*/

        /*added selector #infosMasseneingabeMesssetelle .disabledRow input 05-04-2021*/
        $('body').on('focus', '#infosMasseneingabe .disabledRow input , #infosMasseneingabeMesssetelle .disabledRow input', function(e){
            var zeitIntervallAnl = $(".infosMasseneingabeInside button.active").attr('data-id');
            var inputCurPrevId = $("#inputCurPrevId").val();
            var inputCurrId = $("#inputCurrId").val();
            var inputCurNextId = $("#inputNextId").val();
            var inputBottomCurrId = $("#inputBottomCurrId").val();
            var rowMstID = $(this).closest('td').attr('data-id');

            var einheitVal = $(inputCurrId).closest('tr').attr('data-einheit');

            /*MM_27-01-2021 Start:check previous value is null and last value*/
                    var inputVal=$(this).val();
                    var checkPrevVal = $(this).closest('td').prev('td').find('input').val();
                    var inputCurrBottomId= $("#inputBottomCurrId").val();
                    var inputIdPrevlast = $('#inputLastValDB').val();
                    var inputNextLastValDB = $("#inputNextLastValDB").val();
                    var nextId = $("#inputNextLastIdDB").val();
                    var prevId = $("#inputPrevLastIdDB").val();
                    var inputNextLastId = $("#inputIdNextlast").val();
                    var inputPrevLastId = $("#inputIdPrevlast").val();
                    var inputNextLastBottomId = $("#inputNextLastBottomId").val();
                    var inputPrevLastBottomId = $("#inputIdPrevBottomlast").val();

                    var inputNextBottomId = $("#inputNextBottomId").val();

                    var nextPrevDiff = inputNextLastValDB - inputIdPrevlast;

                    if($("#inputPrevValDB").val() == "" && inputIdPrevlast !=""){
                        var nextDiff = $(inputCurNextId).val() -  inputIdPrevlast;
                    }
                    else if($("#inputPrevValDB").val() !=""){
                        var nextDiff = $(inputCurNextId).val() - $("#inputPrevValDB").val();
                    }
                    var lastNextDiff  =  inputNextLastValDB - $(inputCurPrevId).val();
                    var prevDiff = $(inputCurNextId).val() - $(inputCurPrevId).val();

                    /*MM_27-01-2021 End:check previous value is null and last value*/

                    /*Check greater less condition*/
                    //console.log($(inputCurPrevId).val());
                    //console.log($(inputCurrId).val());
                    if((einheitVal==1 || einheitVal==2) && (einheitVal !='' && typeof(einheitVal) !='undefined')){
                        if(($(inputCurPrevId).val() !='' && $(inputCurrId).val() !='') && (typeof($(inputCurPrevId).val()) !='undefined' && typeof($(inputCurrId).val()) !='undefined')){
                            if(Number($(inputCurrId).val()) <= Number($(inputCurPrevId).val())){
                                alert('Current value should be greater then previous value!');
                                $(inputCurrId).val('');
                                $(inputDeleteBotmId).val('');
                                $(inputNextLastBottomId).val(lastNextDiff);
                                if($(inputCurNextId).val()!="" && $(inputCurPrevId).val() !=""){
                                    $(inputNextBottomId).val(prevDiff);
                                }
                                if($('#currInputID').val() == 0){
                                    if(($(inputCurrId).val() == "" && typeof($(inputCurrId).val()) != 'undefined') && ($(inputCurNextId).val() != "" && typeof($(inputCurNextId).val()) != 'undefined') ){
                                        var secBottomValDB = $($('#inputNextId').val()).val() - $('#inputPrevValDB').val();
                                        //console.log("currinput0 : secondBottom"+secBottomValDB+"->"+$('#inputPrevValDB').val()+"-"+$($('#inputNextId').val()).val());
                                        $(inputNextBottomId).val(secBottomValDB);
                                    }
                                    if(($(inputCurrId).val() == "" && typeof($(inputCurrId).val()) != 'undefined') && (inputNextLastValDB != "" && typeof(inputNextLastValDB) != 'undefined')){
                                        var lastBottomValDB = $("#inputNextLastValDB").val() - $('#inputPrevValDB').val();
                                        //console.log("currinput0 : lastBottomValDB"+lastBottomValDB+"->"+$("#inputNextLastValDB").val()+"-"+$('#inputPrevValDB').val());
                                        $(inputNextLastBottomId).val(lastBottomValDB);
                                        //$(inputNextLastBottomId).val("");
                                    }
                                }
                                $(inputCurrId).focus();
                                resetInputsSearchMasseneingabe();
                                return false;
                            }
                        }else if(($("#inputPrevValDB").val() !='' && $(inputCurrId).val() !='') && (typeof($("#inputPrevValDB").val()) !='undefined' && typeof($(inputCurrId).val()) !='undefined')){
                            if(Number($(inputCurrId).val()) <= Number($("#inputPrevValDB").val())){
                                alert('Current value should be greater then previous value!');

                                $(inputCurrId).val('');
                                $(inputDeleteBotmId).val('');
                                $(inputNextLastBottomId).val(lastNextDiff);
                                if($(inputCurNextId).val()!="" && $(inputCurPrevId).val() !=""){
                                    $(inputNextBottomId).val(prevDiff);
                                }
                                if($('#currInputID').val() == 0){
                                    if(($(inputCurrId).val() == "" && typeof($(inputCurrId).val()) != 'undefined') && ($(inputCurNextId).val() != "" && typeof($(inputCurNextId).val()) != 'undefined') ){
                                        var secBottomValDB = $($('#inputNextId').val()).val() - $('#inputPrevValDB').val();
                                        //console.log("currinput0 : secondBottom"+secBottomValDB+"->"+$('#inputPrevValDB').val()+"-"+$($('#inputNextId').val()).val());
                                        $(inputNextBottomId).val(secBottomValDB);
                                    }
                                    if(($(inputCurrId).val() == "" && typeof($(inputCurrId).val()) != 'undefined') && (inputNextLastValDB != "" && typeof(inputNextLastValDB) != 'undefined')){
                                        var lastBottomValDB = $("#inputNextLastValDB").val() - $('#inputPrevValDB').val();
                                        //console.log("currinput0 : lastBottomValDB"+lastBottomValDB+"->"+$("#inputNextLastValDB").val()+"-"+$('#inputPrevValDB').val());
                                        $(inputNextLastBottomId).val(lastBottomValDB);
                                        //$(inputNextLastBottomId).val("");
                                    }
                                }
                                $(inputCurrId).focus();
                                resetInputsSearchMasseneingabe();
                                return false;
                            }
                        }
                        if(($(inputCurNextId).val() !="" && $(inputCurPrevId).val() !="" && $(inputCurrId).val() !='') && (typeof($(inputCurPrevId).val()) !='undefined' && typeof($(inputCurNextId).val()) !='undefined' && typeof($(inputCurrId).val()) !='undefined')){

                            if(Number($(inputCurrId).val()) >= Number($(inputCurNextId).val())){
                                alert('Current value should not be greater then next value! ');
                                $(inputCurrId).val('');
                                $(inputDeleteBotmId).val('');
                                $(inputNextBottomId).val(prevDiff);
                                $(inputCurrId).focus();
                                resetInputsSearchMasseneingabe();
                                return false;
                            }
                        }
                        if(($(inputCurNextId).val() !='' && $(inputCurrId).val() !='') && (typeof($(inputCurNextId).val()) !='undefined' && typeof($(inputCurrId).val()) !='undefined')){
                            if(Number($(inputCurrId).val()) >= Number($(inputCurNextId).val())){
                                alert('Current value should not be greater then next value! ');
                                $(inputCurrId).val('');
                                $(inputDeleteBotmId).val('');
                                $(inputNextBottomId).val(nextDiff);
                                $(inputCurrId).focus();
                                resetInputsSearchMasseneingabe();
                                return false;
                            }
                        }
                        if(($("#inputLastValDB").val() !='' && $(inputCurrId).val() !='') && (typeof($("#inputLastValDB").val()) !='undefined' && typeof($(inputCurrId).val()) !='undefined')){
                            if(Number($(''+inputCurrId+'').val()) <= Number($('#inputLastValDB').val())){
                                 if(($($(inputFocusedId).val()).val() !='' && typeof($($(inputFocusedId).val()).val() ) !='undefined')
                                    && ($(inputCurPrevId).val() == "" && typeof($(inputCurPrevId).val() ) !='undefined')){ /*nzp 04-02-2021*/
                                    alert('Current value should be greater then last value!');
                                    $(inputCurrId).val('');
                                    $(inputDeleteBotmId).val('');
                                    $(inputNextLastBottomId).val(nextPrevDiff);
                                    if($(inputCurNextId).val() !=''){
                                        $(inputNextBottomId).val(nextDiff);
                                    }
                                    $(inputCurrId).focus();
                                    resetInputsSearchMasseneingabe();
                                    return false;
                                }
                            }
                        }
                        if(($("#inputNextLastValDB").val() !='' && $(inputCurrId).val() !='') && (typeof($("#inputNextLastValDB").val()) !='undefined' && typeof($(inputCurrId).val()) !='undefined')){
                            if(Number($(inputCurrId).val()) >= Number($("#inputNextLastValDB").val())){
                                alert('Current value should not be greater then next available value!');
                                $(inputCurrId).val('');
                                $(inputDeleteBotmId).val('');
                                $(inputNextLastBottomId).val(nextPrevDiff);
                                if($(inputCurPrevId).val() !=''){
                                    $(inputNextLastBottomId).val(lastNextDiff);
                                }
                                if($('#currInputID').val() == 0){

                                    if(($(inputCurrId).val() == "" && typeof($(inputCurrId).val()) != 'undefined') && ($(inputCurNextId).val() != "" && typeof($(inputCurNextId).val()) != 'undefined') ){
                                        var secBottomValDB = $($('#inputNextId').val()).val() - $('#inputPrevValDB').val();
                                        //console.log("currinput0 : secondBottom"+secBottomValDB+"->"+$('#inputPrevValDB').val()+"-"+$($('#inputNextId').val()).val());
                                        $(inputNextBottomId).val(secBottomValDB);
                                    }
                                    if(($(inputCurrId).val() == "" && typeof($(inputCurrId).val()) != 'undefined') && (inputNextLastValDB != "" && typeof(inputNextLastValDB) != 'undefined')){
                                        var lastBottomValDB = $("#inputNextLastValDB").val() - $('#inputPrevValDB').val();
                                        //console.log("currinput0 : lastBottomValDB"+lastBottomValDB+"->"+$("#inputNextLastValDB").val()+"-"+$('#inputPrevValDB').val());
                                        /*new_addon mm-02-02-2021*/
                                        if($('#inputPrevValDB').val() != ""){
                                            $(inputNextLastBottomId).val(lastBottomValDB);
                                        }
                                        //$(inputNextLastBottomId).val("");
                                    }
                                }
                                /*new_addon mm-02-02-2021*/
                                if(allPrevVal)
                                {
                                    if(allPrevVal.length == 0 && ( $("#inputPrevValDB").val() =='')){
                                        $(inputNextLastBottomId).val("");
                                    }
                                }
                                /*new_addon end mm-02-02-2021*/

                                $(inputCurrId).focus();
                                resetInputsSearchMasseneingabe();
                                return false;
                            }
                        }
                    }
                    if((einheitVal==3 || einheitVal==4) && (einheitVal !='' && typeof(einheitVal) !='undefined')){
                        if(($(inputCurPrevId).val() !='' && $(inputCurrId).val() !='') && (typeof($(inputCurPrevId).val()) !='undefined' && typeof($(inputCurrId).val()) !='undefined')){
                            if(checkPositiveValue($(inputCurrId).val())==false || checkPositiveValue($(inputCurPrevId).val())==false){
                                alert('Current value & previous value should be positive!');
                                $(inputCurrId).val('');
                                $(inputBottomCurrId).val('');
                                $(inputCurrId).focus();
                                resetInputsSearchMasseneingabe();
                                return false;
                            }
                        }else if(($("#inputPrevValDB").val() !='' && $(inputCurrId).val() !='') && (typeof($("#inputPrevValDB").val()) !='undefined' && typeof($(inputCurrId).val()) !='undefined')){
                            if(checkPositiveValue($(inputCurrId).val())==false || checkPositiveValue($("#inputPrevValDB").val())==false){
                                alert('Current value & previous value should be positive!');
                                $(inputCurrId).val('');
                                $(inputBottomCurrId).val('');
                                $(inputCurrId).focus();
                                resetInputsSearchMasseneingabe();
                                return false;
                            }
                        }
                        if(($(inputCurNextId).val() !='' && $(inputCurrId).val() !='') && (typeof($(inputCurNextId).val()) !='undefined' && typeof($(inputCurrId).val()) !='undefined')){
                            if(checkPositiveValue($(inputCurrId).val()) ==false || checkPositiveValue($(inputCurNextId).val())==false){
                                alert('Current value & next value should be positive!');
                                $(inputCurrId).val('');
                                $(inputBottomCurrId).val('');
                                $(inputCurrId).focus();
                                resetInputsSearchMasseneingabe();
                                return false;
                            }
                        }
                        if(($("#inputLastValDB").val() !='' && $(inputCurrId).val() !='') && (typeof($("#inputLastValDB").val()) !='undefined' && typeof($(inputCurrId).val()) !='undefined')){
                            if(checkPositiveValue($(inputCurrId).val())==false || checkPositiveValue($("#inputLastValDB").val())==false){
                                alert('Current value & previous value should be positive!');
                                $(inputCurrId).val('');
                                $(inputDeleteBotmId).val('');
                                $(inputCurrId).focus();
                                resetInputsSearchMasseneingabe();
                                return false;
                            }
                        }
                        if(($("#inputNextLastValDB").val() !='' && $(inputCurrId).val() !='') && (typeof($("#inputNextLastValDB").val()) !='undefined' && typeof($(inputCurrId).val()) !='undefined')){
                            if(checkPositiveValue($(inputCurrId).val()) ==false || checkPositiveValue($("#inputNextLastValDB").val())==false){
                                alert('Current value & next value should be positive!');
                                $(inputCurrId).val('');
                                $(inputDeleteBotmId).val('');
                                $(inputCurrId).focus();
                                resetInputsSearchMasseneingabe();
                                return false;
                            }
                        }
                    }
            /*MM_27-01-2021 End:check previous value is null and last value*/

            /*Check greater less condition*/
            $("#inputFocusedId").val(inputCurrId);
            var inputValBottom=$("#inputValBottomCurr").val();
            var inputValBottomPrev=$("#inputValBottomPrev").val();

            /*Min and Max condition*/
            var inputBotmMin = $("#inputBotmMin").val();
            var inputBotmMax = $("#inputBotmMax").val();
            var showPopupExist = $(inputCurrId).hasClass("isShowPopup");
            //saveToDBMasseneingabeEingabenSingleInput(1,inputCurrId,inputBottomCurrId);
           /* console.log('inputValBottom='+inputValBottom);
            console.log('inputValBottomPrev='+inputValBottomPrev);
            console.log('inputBotmMin='+inputBotmMin);
            console.log('inputBotmMax='+inputBotmMax);
            console.log('showPopupExist='+showPopupExist);*/


            if((inputValBottom !='' && inputValBottomPrev !='') && (typeof(inputValBottom) !='undefined' && typeof(inputValBottomPrev) !='undefined')){
                if(showPopupExist ==true){
                    var inputLengthBottom = inputValBottom.length;
                    var inputLengthBottomPrev = inputValBottomPrev.length;
                    var valLeft = checkPositiveValue(inputValBottomPrev);
                    var valRight = checkPositiveValue(inputValBottom);
                    if((inputBotmMin !='' && inputBotmMax !='') && (typeof(inputBotmMin) !='undefined' && typeof(inputBotmMax) !='undefined')){
                         if (( inputValBottom !='' && typeof(inputValBottom) !='undefined' ) && ((inputValBottom <= Number(inputBotmMax)) && (inputValBottom >= Number(inputBotmMin)))){
                           $("#masseneingabeSpeichernSrch").prop("disabled", false);
                           $("#masseneingabeSpeichernSrchMesssetelle").prop("disabled",false);
                             return false;
                        }
                    }
                    if(valLeft ==true && valRight ==true) {
                        if(inputLengthBottom != inputLengthBottomPrev){
                             //alert('concern 5');
                            intBdeSearchConcernOrDeletePopUp(inputCurPrevId,inputNextId,inputBottomCurrId,rowMstID);
                        }
                    }else if((valLeft ==true && valRight ==false) || (valLeft ==false && valRight ==true)){
                         //alert('concern 6');
                        intBdeSearchConcernOrDeletePopUp(inputCurPrevId,inputNextId,inputBottomCurrId,rowMstID);
                    }else if(valLeft ==false && valRight ==false) {
                        if(inputLengthBottom != inputLengthBottomPrev){
                             //alert('concern 7');
                            intBdeSearchConcernOrDeletePopUp(inputCurPrevId,inputNextId,inputBottomCurrId,rowMstID);
                        }
                    }
                }
            }
            /*MM_27-01-2020 Concern popup on if prevlast and current bottom val().length are diffrent*/

            var showLastPopupExist = $(inputCurrId).hasClass("isShowPopup");

            if($(inputPrevLastBottomId).val() !='' && typeof($(inputPrevLastBottomId).val()) !='undefined' && $("#inputValBottomCurr").val() != "" ){
                var inputPrevLastBottomVal = $(inputPrevLastBottomId).val();
                var inputBottomCurrVal = $("#inputValBottomCurr").val();
            }
            if($(inputPrevLastBottomId).val() !='' && typeof($(inputPrevLastBottomId).val()) !='undefined' ){
                if(showLastPopupExist == true ){
                    if(inputPrevLastBottomVal !="" && typeof(inputPrevLastBottomVal) !='undefined'){
                        var inputPrevLastBottomLength = inputPrevLastBottomVal.length;
                    }
                    if(inputBottomCurrVal !="" && typeof(inputBottomCurrVal) !='undefined'){
                       var inputBottomCurrLength = inputBottomCurrVal.length;
                    }
                    var valLastLeft = checkPositiveValue(inputPrevLastBottomVal);
                    var valLastRight = checkPositiveValue(inputBottomCurrVal);

                    if(valLastLeft ==true && valLastRight ==true) {
                        if(inputBottomCurrLength != inputPrevLastBottomLength){
                             //alert('concern 8');
                            intBdeSearchConcernOrDeletePopUp(inputPrevLastId,inputNextId,inputBottomCurrId,rowMstID);
                        }
                    }
                }
            }

            /*MM_27-01-2020 End Concern popup on if prevlast and current bottom val().length are diffrent*/
            if($('#intBdeConcernOrDeletePopUp').length==0){
                $("#masseneingabeSpeichernSrch").prop("disabled",false);
                $("#masseneingabeSpeichernSrchMesssetelle").prop("disabled",false);
            }
            e.stopPropagation();
        });
        /*new-mm-start 08-04-2021*/
        $('body').on('focus', '#infosMasseneingabePrdkt .disabledRow input ', function(e){
            var zeitIntervallAnl = $(".infosMasseneingabeInside button.active").attr('data-id');
            var inputCurPrevId = $("#inputCurPrevId").val();
            var inputCurrId = $("#inputCurrId").val();
            var inputCurNextId = $("#inputNextId").val();
            var inputBottomCurrId = $("#inputBottomCurrId").val();
            var rowMstID = $(this).closest('td').attr('data-id');

            var einheitVal = $(inputCurrId).closest('tr').attr('data-einheit');

            /*MM_27-01-2021 Start:check previous value is null and last value*/
                    var inputVal=$(this).val();
                    var checkPrevVal = $(this).closest('td').prev('td').find('input').val();
                    var inputCurrBottomId= $("#inputBottomCurrId").val();
                    var inputIdPrevlast = $('#inputLastValDB').val();
                    var inputNextLastValDB = $("#inputNextLastValDB").val();
                    var nextId = $("#inputNextLastIdDB").val();
                    var prevId = $("#inputPrevLastIdDB").val();
                    var inputNextLastId = $("#inputIdNextlast").val();
                    var inputPrevLastId = $("#inputIdPrevlast").val();
                    var inputNextLastBottomId = $("#inputNextLastBottomId").val();
                    var inputPrevLastBottomId = $("#inputIdPrevBottomlast").val();

                    var inputNextBottomId = $("#inputNextBottomId").val();

                    var nextPrevDiff = inputNextLastValDB - inputIdPrevlast;

                    if($("#inputPrevValDB").val() == "" && inputIdPrevlast !=""){
                        var nextDiff = $(inputCurNextId).val() -  inputIdPrevlast;
                    }
                    else if($("#inputPrevValDB").val() !=""){
                        var nextDiff = $(inputCurNextId).val() - $("#inputPrevValDB").val();
                    }
                    var lastNextDiff  =  inputNextLastValDB - $(inputCurPrevId).val();
                    var prevDiff = $(inputCurNextId).val() - $(inputCurPrevId).val();

                    /*MM_27-01-2021 End:check previous value is null and last value*/

                    /*Check greater less condition*/
                    //console.log($(inputCurPrevId).val());
                    //console.log($(inputCurrId).val());
                    if((einheitVal==1 || einheitVal==2) && (einheitVal !='' && typeof(einheitVal) !='undefined')){
                        if(($(inputCurPrevId).val() !='' && $(inputCurrId).val() !='') && (typeof($(inputCurPrevId).val()) !='undefined' && typeof($(inputCurrId).val()) !='undefined')){
                            if(Number($(inputCurrId).val()) <= Number($(inputCurPrevId).val())){
                                alert('Current value should be greater then previous value!');
                                $(inputCurrId).val('');
                                $(inputDeleteBotmId).val('');
                                $(inputNextLastBottomId).val(lastNextDiff);
                                if($(inputCurNextId).val()!="" && $(inputCurPrevId).val() !=""){
                                    $(inputNextBottomId).val(prevDiff);
                                }
                                if($('#currInputID').val() == 0){
                                    if(($(inputCurrId).val() == "" && typeof($(inputCurrId).val()) != 'undefined') && ($(inputCurNextId).val() != "" && typeof($(inputCurNextId).val()) != 'undefined') ){
                                        var secBottomValDB = $($('#inputNextId').val()).val() - $('#inputPrevValDB').val();
                                        //console.log("currinput0 : secondBottom"+secBottomValDB+"->"+$('#inputPrevValDB').val()+"-"+$($('#inputNextId').val()).val());
                                        $(inputNextBottomId).val(secBottomValDB);
                                    }
                                    if(($(inputCurrId).val() == "" && typeof($(inputCurrId).val()) != 'undefined') && (inputNextLastValDB != "" && typeof(inputNextLastValDB) != 'undefined')){
                                        var lastBottomValDB = $("#inputNextLastValDB").val() - $('#inputPrevValDB').val();
                                        //console.log("currinput0 : lastBottomValDB"+lastBottomValDB+"->"+$("#inputNextLastValDB").val()+"-"+$('#inputPrevValDB').val());
                                        $(inputNextLastBottomId).val(lastBottomValDB);
                                        //$(inputNextLastBottomId).val("");
                                    }
                                }
                                $(inputCurrId).focus();
                                resetInputsSearchMasseneingabe();
                                return false;
                            }
                        }else if(($("#inputPrevValDB").val() !='' && $(inputCurrId).val() !='') && (typeof($("#inputPrevValDB").val()) !='undefined' && typeof($(inputCurrId).val()) !='undefined')){
                            if(Number($(inputCurrId).val()) <= Number($("#inputPrevValDB").val())){
                                alert('Current value should be greater then previous value!');

                                $(inputCurrId).val('');
                                $(inputDeleteBotmId).val('');
                                $(inputNextLastBottomId).val(lastNextDiff);
                                if($(inputCurNextId).val()!="" && $(inputCurPrevId).val() !=""){
                                    $(inputNextBottomId).val(prevDiff);
                                }
                                if($('#currInputID').val() == 0){
                                    if(($(inputCurrId).val() == "" && typeof($(inputCurrId).val()) != 'undefined') && ($(inputCurNextId).val() != "" && typeof($(inputCurNextId).val()) != 'undefined') ){
                                        var secBottomValDB = $($('#inputNextId').val()).val() - $('#inputPrevValDB').val();
                                        //console.log("currinput0 : secondBottom"+secBottomValDB+"->"+$('#inputPrevValDB').val()+"-"+$($('#inputNextId').val()).val());
                                        $(inputNextBottomId).val(secBottomValDB);
                                    }
                                    if(($(inputCurrId).val() == "" && typeof($(inputCurrId).val()) != 'undefined') && (inputNextLastValDB != "" && typeof(inputNextLastValDB) != 'undefined')){
                                        var lastBottomValDB = $("#inputNextLastValDB").val() - $('#inputPrevValDB').val();
                                        //console.log("currinput0 : lastBottomValDB"+lastBottomValDB+"->"+$("#inputNextLastValDB").val()+"-"+$('#inputPrevValDB').val());
                                        $(inputNextLastBottomId).val(lastBottomValDB);
                                        //$(inputNextLastBottomId).val("");
                                    }
                                }
                                $(inputCurrId).focus();
                                resetInputsSearchMasseneingabe();
                                return false;
                            }
                        }
                        if(($(inputCurNextId).val() !="" && $(inputCurPrevId).val() !="" && $(inputCurrId).val() !='') && (typeof($(inputCurPrevId).val()) !='undefined' && typeof($(inputCurNextId).val()) !='undefined' && typeof($(inputCurrId).val()) !='undefined')){

                            if(Number($(inputCurrId).val()) >= Number($(inputCurNextId).val())){
                                alert('Current value should not be greater then next value! ');
                                $(inputCurrId).val('');
                                $(inputDeleteBotmId).val('');
                                $(inputNextBottomId).val(prevDiff);
                                $(inputCurrId).focus();
                                resetInputsSearchMasseneingabe();
                                return false;
                            }
                        }
                        if(($(inputCurNextId).val() !='' && $(inputCurrId).val() !='') && (typeof($(inputCurNextId).val()) !='undefined' && typeof($(inputCurrId).val()) !='undefined')){
                            if(Number($(inputCurrId).val()) >= Number($(inputCurNextId).val())){
                                alert('Current value should not be greater then next value! ');
                                $(inputCurrId).val('');
                                $(inputDeleteBotmId).val('');
                                $(inputNextBottomId).val(nextDiff);
                                $(inputCurrId).focus();
                                resetInputsSearchMasseneingabe();
                                return false;
                            }
                        }
                        if(($("#inputLastValDB").val() !='' && $(inputCurrId).val() !='') && (typeof($("#inputLastValDB").val()) !='undefined' && typeof($(inputCurrId).val()) !='undefined')){
                            if(Number($(''+inputCurrId+'').val()) <= Number($('#inputLastValDB').val())){
                                 if(($($(inputFocusedId).val()).val() !='' && typeof($($(inputFocusedId).val()).val() ) !='undefined')
                                    && ($(inputCurPrevId).val() == "" && typeof($(inputCurPrevId).val() ) !='undefined')){ /*nzp 04-02-2021*/
                                    alert('Current value should be greater then last value!');
                                    $(inputCurrId).val('');
                                    $(inputDeleteBotmId).val('');
                                    $(inputNextLastBottomId).val(nextPrevDiff);
                                    if($(inputCurNextId).val() !=''){
                                        $(inputNextBottomId).val(nextDiff);
                                    }
                                    $(inputCurrId).focus();
                                    resetInputsSearchMasseneingabe();
                                    return false;
                                }
                            }
                        }
                        if(($("#inputNextLastValDB").val() !='' && $(inputCurrId).val() !='') && (typeof($("#inputNextLastValDB").val()) !='undefined' && typeof($(inputCurrId).val()) !='undefined')){
                            if(Number($(inputCurrId).val()) >= Number($("#inputNextLastValDB").val())){
                                alert('Current value should not be greater then next available value!');
                                $(inputCurrId).val('');
                                $(inputDeleteBotmId).val('');
                                $(inputNextLastBottomId).val(nextPrevDiff);
                                if($(inputCurPrevId).val() !=''){
                                    $(inputNextLastBottomId).val(lastNextDiff);
                                }
                                if($('#currInputID').val() == 0){

                                    if(($(inputCurrId).val() == "" && typeof($(inputCurrId).val()) != 'undefined') && ($(inputCurNextId).val() != "" && typeof($(inputCurNextId).val()) != 'undefined') ){
                                        var secBottomValDB = $($('#inputNextId').val()).val() - $('#inputPrevValDB').val();
                                        //console.log("currinput0 : secondBottom"+secBottomValDB+"->"+$('#inputPrevValDB').val()+"-"+$($('#inputNextId').val()).val());
                                        $(inputNextBottomId).val(secBottomValDB);
                                    }
                                    if(($(inputCurrId).val() == "" && typeof($(inputCurrId).val()) != 'undefined') && (inputNextLastValDB != "" && typeof(inputNextLastValDB) != 'undefined')){
                                        var lastBottomValDB = $("#inputNextLastValDB").val() - $('#inputPrevValDB').val();
                                        //console.log("currinput0 : lastBottomValDB"+lastBottomValDB+"->"+$("#inputNextLastValDB").val()+"-"+$('#inputPrevValDB').val());
                                        /*new_addon mm-02-02-2021*/
                                        if($('#inputPrevValDB').val() != ""){
                                            $(inputNextLastBottomId).val(lastBottomValDB);
                                        }
                                        //$(inputNextLastBottomId).val("");
                                    }
                                }
                                /*new_addon mm-02-02-2021*/
                                if(allPrevVal)
                                {
                                    if(allPrevVal.length == 0 && ( $("#inputPrevValDB").val() =='')){
                                        $(inputNextLastBottomId).val("");
                                    }
                                }
                                /*new_addon end mm-02-02-2021*/

                                $(inputCurrId).focus();
                                resetInputsSearchMasseneingabe();
                                return false;
                            }
                        }
                    }
                    if((einheitVal==3 || einheitVal==4) && (einheitVal !='' && typeof(einheitVal) !='undefined')){
                        if(($(inputCurPrevId).val() !='' && $(inputCurrId).val() !='') && (typeof($(inputCurPrevId).val()) !='undefined' && typeof($(inputCurrId).val()) !='undefined')){
                            if(checkPositiveValue($(inputCurrId).val())==false || checkPositiveValue($(inputCurPrevId).val())==false){
                                alert('Current value & previous value should be positive!');
                                $(inputCurrId).val('');
                                $(inputBottomCurrId).val('');
                                $(inputCurrId).focus();
                                resetInputsSearchMasseneingabe();
                                return false;
                            }
                        }else if(($("#inputPrevValDB").val() !='' && $(inputCurrId).val() !='') && (typeof($("#inputPrevValDB").val()) !='undefined' && typeof($(inputCurrId).val()) !='undefined')){
                            if(checkPositiveValue($(inputCurrId).val())==false || checkPositiveValue($("#inputPrevValDB").val())==false){
                                alert('Current value & previous value should be positive!');
                                $(inputCurrId).val('');
                                $(inputBottomCurrId).val('');
                                $(inputCurrId).focus();
                                resetInputsSearchMasseneingabe();
                                return false;
                            }
                        }
                        if(($(inputCurNextId).val() !='' && $(inputCurrId).val() !='') && (typeof($(inputCurNextId).val()) !='undefined' && typeof($(inputCurrId).val()) !='undefined')){
                            if(checkPositiveValue($(inputCurrId).val()) ==false || checkPositiveValue($(inputCurNextId).val())==false){
                                alert('Current value & next value should be positive!');
                                $(inputCurrId).val('');
                                $(inputBottomCurrId).val('');
                                $(inputCurrId).focus();
                                resetInputsSearchMasseneingabe();
                                return false;
                            }
                        }
                        if(($("#inputLastValDB").val() !='' && $(inputCurrId).val() !='') && (typeof($("#inputLastValDB").val()) !='undefined' && typeof($(inputCurrId).val()) !='undefined')){
                            if(checkPositiveValue($(inputCurrId).val())==false || checkPositiveValue($("#inputLastValDB").val())==false){
                                alert('Current value & previous value should be positive!');
                                $(inputCurrId).val('');
                                $(inputDeleteBotmId).val('');
                                $(inputCurrId).focus();
                                resetInputsSearchMasseneingabe();
                                return false;
                            }
                        }
                        if(($("#inputNextLastValDB").val() !='' && $(inputCurrId).val() !='') && (typeof($("#inputNextLastValDB").val()) !='undefined' && typeof($(inputCurrId).val()) !='undefined')){
                            if(checkPositiveValue($(inputCurrId).val()) ==false || checkPositiveValue($("#inputNextLastValDB").val())==false){
                                alert('Current value & next value should be positive!');
                                $(inputCurrId).val('');
                                $(inputDeleteBotmId).val('');
                                $(inputCurrId).focus();
                                resetInputsSearchMasseneingabe();
                                return false;
                            }
                        }
                    }
            /*MM_27-01-2021 End:check previous value is null and last value*/

            /*Check greater less condition*/
            $("#inputFocusedId").val(inputCurrId);
            var inputValBottom=$("#inputValBottomCurr").val();
            var inputValBottomPrev=$("#inputValBottomPrev").val();

            /*Min and Max condition*/
            var inputBotmMin = $("#inputBotmMin").val();
            var inputBotmMax = $("#inputBotmMax").val();
            var showPopupExist = $(inputCurrId).hasClass("isShowPopup");
            //saveToDBMasseneingabeEingabenSingleInput(1,inputCurrId,inputBottomCurrId);
           /* console.log('inputValBottom='+inputValBottom);
            console.log('inputValBottomPrev='+inputValBottomPrev);
            console.log('inputBotmMin='+inputBotmMin);
            console.log('inputBotmMax='+inputBotmMax);
            console.log('showPopupExist='+showPopupExist);*/


            if((inputValBottom !='' && inputValBottomPrev !='') && (typeof(inputValBottom) !='undefined' && typeof(inputValBottomPrev) !='undefined')){
                if(showPopupExist ==true){
                    var inputLengthBottom = inputValBottom.length;
                    var inputLengthBottomPrev = inputValBottomPrev.length;
                    var valLeft = checkPositiveValue(inputValBottomPrev);
                    var valRight = checkPositiveValue(inputValBottom);
                    if((inputBotmMin !='' && inputBotmMax !='') && (typeof(inputBotmMin) !='undefined' && typeof(inputBotmMax) !='undefined')){
                         if (( inputValBottom !='' && typeof(inputValBottom) !='undefined' ) && ((inputValBottom <= Number(inputBotmMax)) && (inputValBottom >= Number(inputBotmMin)))){
                           $("#masseneingabeSpeichernSrchPrdkt").prop("disabled", false);
                             return false;
                        }
                    }
                    if(valLeft ==true && valRight ==true) {
                        if(inputLengthBottom != inputLengthBottomPrev){
                             //alert('concern 5');
                            intBdeSearchConcernOrDeletePopUpPrdkt(inputCurPrevId,inputNextId,inputBottomCurrId,rowMstID);
                        }
                    }else if((valLeft ==true && valRight ==false) || (valLeft ==false && valRight ==true)){
                         //alert('concern 6');
                        intBdeSearchConcernOrDeletePopUpPrdkt(inputCurPrevId,inputNextId,inputBottomCurrId,rowMstID);
                    }else if(valLeft ==false && valRight ==false) {
                        if(inputLengthBottom != inputLengthBottomPrev){
                             //alert('concern 7');
                            intBdeSearchConcernOrDeletePopUpPrdkt(inputCurPrevId,inputNextId,inputBottomCurrId,rowMstID);
                        }
                    }
                }
            }
            /*MM_27-01-2020 Concern popup on if prevlast and current bottom val().length are diffrent*/

            var showLastPopupExist = $(inputCurrId).hasClass("isShowPopup");

            if($(inputPrevLastBottomId).val() !='' && typeof($(inputPrevLastBottomId).val()) !='undefined' && $("#inputValBottomCurr").val() != "" ){
                var inputPrevLastBottomVal = $(inputPrevLastBottomId).val();
                var inputBottomCurrVal = $("#inputValBottomCurr").val();
            }
            if($(inputPrevLastBottomId).val() !='' && typeof($(inputPrevLastBottomId).val()) !='undefined' ){
                if(showLastPopupExist == true ){
                    if(inputPrevLastBottomVal !="" && typeof(inputPrevLastBottomVal) !='undefined'){
                        var inputPrevLastBottomLength = inputPrevLastBottomVal.length;
                    }
                    if(inputBottomCurrVal !="" && typeof(inputBottomCurrVal) !='undefined'){
                       var inputBottomCurrLength = inputBottomCurrVal.length;
                    }
                    var valLastLeft = checkPositiveValue(inputPrevLastBottomVal);
                    var valLastRight = checkPositiveValue(inputBottomCurrVal);

                    if(valLastLeft ==true && valLastRight ==true) {
                        if(inputBottomCurrLength != inputPrevLastBottomLength){
                             //alert('concern 8');
                            intBdeSearchConcernOrDeletePopUpPrdkt(inputPrevLastId,inputNextId,inputBottomCurrId,rowMstID);
                        }
                    }
                }
            }

            /*MM_27-01-2020 End Concern popup on if prevlast and current bottom val().length are diffrent*/
            if($('#intBdeConcernOrDeletePopUp').length==0){
                $("#masseneingabeSpeichernSrchPrdkt").prop("disabled",false);
            }
            e.stopPropagation();
        });
        /*new-mm-end 08-04-2021*/
        $("body").on('click','#infosMasseneingabe', function (event) {
            if (!$(event.target).closest('#btnTageMasseneingabeIMwNw,#btnWochenMasseneingabeIMwNw,#btnMonateMasseneingabeIMwNw,#btnJahreMasseneingabeIMwNw,#btnMasseneingabeIMwSearch').length) {
                if ($('#timeIntervalWerteEnergiedatenIMw').html() != ""){

                    var inputCurPrevId = $("#inputCurPrevId").val();
                    var inputCurrId= $("#inputCurrId").val();
                    var inputCurNextId = $("#inputNextId").val();
                    var inputBottomCurrId= $("#inputBottomCurrId").val();
                    var inputBottomPrevId= $("#inputBottomPrevId").val();
                    var showPopupExist = $(inputCurrId).hasClass("isShowPopup");
                    var inputDeleteBotmId = $("#inputDeleteBotmId").val();
                    var einheitVal = $(inputCurrId).closest('tr').attr('data-einheit');
                    var inputDefaultShowPopup = $("#inputDefaultShowPopup").val();
                    var rowMstID = $(this).closest('td').attr('data-id');
                    var date = $(this).closest('td').attr('date');
                    var type = $(".infosMasseneingabeInside button.active").attr('data-id');
                    /*MM_27-01-2021 Start:check previous value is null and last value*/

                    var inputVal=$(this).val();
                    var checkPrevVal = $(this).closest('td').prev('td').find('input').val();
                    var inputCurrBottomId= $("#inputBottomCurrId").val();
                    var inputIdPrevlast = $('#inputLastValDB').val();
                    var inputNextLastValDB = $("#inputNextLastValDB").val();
                    var nextId = $("#inputNextLastIdDB").val();
                    var prevId = $("#inputPrevLastIdDB").val();
                    var inputNextLastId = $("#inputIdNextlast").val();
                    var inputPrevLastId = $("#inputIdPrevlast").val();
                    var inputNextLastBottomId = $("#inputNextLastBottomId").val();
                    var inputPrevLastBottomId = $("#inputIdPrevBottomlast").val();

                    var inputNextBottomId = $("#inputNextBottomId").val();

                    /* if($("#inputCurrId").val() !='' && typeof($("#inputCurrId")) != 'undefined') {
                        //Continue...
                    }else{
                        // $(inputCurrBottomId).val("");
                    }
                    */

                    var nextPrevDiff = inputNextLastValDB - inputIdPrevlast;

                    if($("#inputPrevValDB").val() == "" && inputIdPrevlast !=""){
                        var nextDiff = $(inputCurNextId).val() -  inputIdPrevlast;
                    }
                    else if($("#inputPrevValDB").val() !=""){
                        var nextDiff = $(inputCurNextId).val() - $("#inputPrevValDB").val();
                    }
                    var lastNextDiff  =  inputNextLastValDB - $(inputCurPrevId).val();
                    var prevDiff = $(inputCurNextId).val() - $(inputCurPrevId).val();

                    /*MM_27-01-2021 End:check previous value is null and last value*/

                    /*Check greater less condition*/
                    if((einheitVal==1 || einheitVal==2) && (einheitVal !='' && typeof(einheitVal) !='undefined')){
                        if(($(inputCurPrevId).val() !='' && $(inputCurrId).val() !='') && (typeof($(inputCurPrevId).val()) !='undefined' && typeof($(inputCurrId).val()) !='undefined')){
                            if(Number($(inputCurrId).val()) <= Number($(inputCurPrevId).val())){
                                alert('Current value should be greater then previous value!');
                                $(inputCurrId).val('');
                                $(inputDeleteBotmId).val('');
                                $(inputNextLastBottomId).val(lastNextDiff);
                                if($(inputCurNextId).val()!="" && $(inputCurPrevId).val() !=""){
                                    $(inputNextBottomId).val(prevDiff);
                                }
                                if($('#currInputID').val() == 0){
                                    if(($(inputCurrId).val() == "" && typeof($(inputCurrId).val()) != 'undefined') && ($(inputCurNextId).val() != "" && typeof($(inputCurNextId).val()) != 'undefined') ){
                                        var secBottomValDB = $($('#inputNextId').val()).val() - $('#inputPrevValDB').val();
                                        //console.log("currinput0 : secondBottom"+secBottomValDB+"->"+$('#inputPrevValDB').val()+"-"+$($('#inputNextId').val()).val());
                                        $(inputNextBottomId).val(secBottomValDB);
                                    }
                                    if(($(inputCurrId).val() == "" && typeof($(inputCurrId).val()) != 'undefined') && (inputNextLastValDB != "" && typeof(inputNextLastValDB) != 'undefined')){
                                        var lastBottomValDB = $("#inputNextLastValDB").val() - $('#inputPrevValDB').val();
                                        //console.log("currinput0 : lastBottomValDB"+lastBottomValDB+"->"+$("#inputNextLastValDB").val()+"-"+$('#inputPrevValDB').val());
                                        $(inputNextLastBottomId).val(lastBottomValDB);
                                        //$(inputNextLastBottomId).val("");
                                    }
                                }
                                $(inputCurrId).focus();
                                resetInputsSearchMasseneingabe();
                                return false;
                            }
                        }else if(($("#inputPrevValDB").val() !='' && $(inputCurrId).val() !='') && (typeof($("#inputPrevValDB").val()) !='undefined' && typeof($(inputCurrId).val()) !='undefined')){
                            if(Number($(inputCurrId).val()) <= Number($("#inputPrevValDB").val())){
                                alert('Current value should be greater then previous value!');

                                $(inputCurrId).val('');
                                $(inputDeleteBotmId).val('');
                                $(inputNextLastBottomId).val(lastNextDiff);
                                if($(inputCurNextId).val()!="" && $(inputCurPrevId).val() !=""){
                                    $(inputNextBottomId).val(prevDiff);
                                }
                                if($('#currInputID').val() == 0){
                                    if(($(inputCurrId).val() == "" && typeof($(inputCurrId).val()) != 'undefined') && ($(inputCurNextId).val() != "" && typeof($(inputCurNextId).val()) != 'undefined') ){
                                        var secBottomValDB = $($('#inputNextId').val()).val() - $('#inputPrevValDB').val();
                                        //console.log("currinput0 : secondBottom"+secBottomValDB+"->"+$('#inputPrevValDB').val()+"-"+$($('#inputNextId').val()).val());
                                        $(inputNextBottomId).val(secBottomValDB);
                                    }
                                    if(($(inputCurrId).val() == "" && typeof($(inputCurrId).val()) != 'undefined') && (inputNextLastValDB != "" && typeof(inputNextLastValDB) != 'undefined')){
                                        var lastBottomValDB = $("#inputNextLastValDB").val() - $('#inputPrevValDB').val();
                                        //console.log("currinput0 : lastBottomValDB"+lastBottomValDB+"->"+$("#inputNextLastValDB").val()+"-"+$('#inputPrevValDB').val());
                                        $(inputNextLastBottomId).val(lastBottomValDB);
                                        //$(inputNextLastBottomId).val("");
                                    }
                                }
                                $(inputCurrId).focus();
                                resetInputsSearchMasseneingabe();
                                return false;
                            }
                        }
                        if(($(inputCurNextId).val() !="" && $(inputCurPrevId).val() !="" && $(inputCurrId).val() !='') && (typeof($(inputCurPrevId).val()) !='undefined' && typeof($(inputCurNextId).val()) !='undefined' && typeof($(inputCurrId).val()) !='undefined')){

                            if(Number($(inputCurrId).val()) >= Number($(inputCurNextId).val())){
                                alert('Current value should not be greater then next value! ');
                                $(inputCurrId).val('');
                                $(inputDeleteBotmId).val('');
                                $(inputNextBottomId).val(prevDiff);
                                $(inputCurrId).focus();
                                resetInputsSearchMasseneingabe();
                                return false;
                            }
                        }
                        if(($(inputCurNextId).val() !='' && $(inputCurrId).val() !='') && (typeof($(inputCurNextId).val()) !='undefined' && typeof($(inputCurrId).val()) !='undefined')){
                            if(Number($(inputCurrId).val()) >= Number($(inputCurNextId).val())){
                                alert('Current value should not be greater then next value! ');
                                $(inputCurrId).val('');
                                $(inputDeleteBotmId).val('');
                                $(inputNextBottomId).val(nextDiff);
                                $(inputCurrId).focus();
                                resetInputsSearchMasseneingabe();
                                return false;
                            }
                        }
                        if(($("#inputLastValDB").val() !='' && $(inputCurrId).val() !='') && (typeof($("#inputLastValDB").val()) !='undefined' && typeof($(inputCurrId).val()) !='undefined')){
                            if(Number($(''+inputCurrId+'').val()) <= Number($('#inputLastValDB').val())){
                                 if(($($(inputFocusedId).val()).val() !='' && typeof($($(inputFocusedId).val()).val() ) !='undefined')
                                    && ($(inputCurPrevId).val() == "" && typeof($(inputCurPrevId).val() ) !='undefined')){ /*nzp 04-02-2021*/
                                    alert('Current value should be greater then last value!');
                                    $(inputCurrId).val('');
                                    $(inputDeleteBotmId).val('');
                                    $(inputNextLastBottomId).val(nextPrevDiff);
                                    if($(inputCurNextId).val() !=''){
                                        $(inputNextBottomId).val(nextDiff);
                                    }
                                    $(inputCurrId).focus();
                                    resetInputsSearchMasseneingabe();
                                    return false;
                                }
                            }
                        }
                        if(($("#inputNextLastValDB").val() !='' && $(inputCurrId).val() !='') && (typeof($("#inputNextLastValDB").val()) !='undefined' && typeof($(inputCurrId).val()) !='undefined')){
                            if(Number($(inputCurrId).val()) >= Number($("#inputNextLastValDB").val())){
                                alert('Current value should not be greater then next available value!');
                                $(inputCurrId).val('');
                                $(inputDeleteBotmId).val('');
                                $(inputNextLastBottomId).val(nextPrevDiff);
                                if($(inputCurPrevId).val() !=''){
                                    $(inputNextLastBottomId).val(lastNextDiff);
                                }
                                if($('#currInputID').val() == 0){

                                    if(($(inputCurrId).val() == "" && typeof($(inputCurrId).val()) != 'undefined') && ($(inputCurNextId).val() != "" && typeof($(inputCurNextId).val()) != 'undefined') ){
                                        var secBottomValDB = $($('#inputNextId').val()).val() - $('#inputPrevValDB').val();
                                        //console.log("currinput0 : secondBottom"+secBottomValDB+"->"+$('#inputPrevValDB').val()+"-"+$($('#inputNextId').val()).val());
                                        $(inputNextBottomId).val(secBottomValDB);
                                    }
                                    if(($(inputCurrId).val() == "" && typeof($(inputCurrId).val()) != 'undefined') && (inputNextLastValDB != "" && typeof(inputNextLastValDB) != 'undefined')){
                                        var lastBottomValDB = $("#inputNextLastValDB").val() - $('#inputPrevValDB').val();
                                        //console.log("currinput0 : lastBottomValDB"+lastBottomValDB+"->"+$("#inputNextLastValDB").val()+"-"+$('#inputPrevValDB').val());
                                        /*new_addon mm-02-02-2021*/
                                        if($('#inputPrevValDB').val() != ""){
                                            $(inputNextLastBottomId).val(lastBottomValDB);
                                        }
                                        //$(inputNextLastBottomId).val("");
                                    }
                                }
                                /*new_addon mm-02-02-2021*/
                                if(allPrevVal)
                                {
                                    if(allPrevVal.length == 0 && ( $("#inputPrevValDB").val() =='')){
                                        $(inputNextLastBottomId).val("");
                                    }
                                }
                                /*new_addon end mm-02-02-2021*/

                                $(inputCurrId).focus();
                                resetInputsSearchMasseneingabe();
                                return false;
                            }
                        }
                    }
                    if((einheitVal==3 || einheitVal==4) && (einheitVal !='' && typeof(einheitVal) !='undefined')){
                        if(($(inputCurPrevId).val() !='' && $(inputCurrId).val() !='') && (typeof($(inputCurPrevId).val()) !='undefined' && typeof($(inputCurrId).val()) !='undefined')){
                            if(checkPositiveValue($(inputCurrId).val())==false || checkPositiveValue($(inputCurPrevId).val())==false){
                                alert('Current value & previous value should be positive!');
                                $(inputCurrId).val('');
                                $(inputBottomCurrId).val('');
                                $(inputCurrId).focus();
                                resetInputsSearchMasseneingabe();
                                return false;
                            }
                        }else if(($("#inputPrevValDB").val() !='' && $(inputCurrId).val() !='') && (typeof($("#inputPrevValDB").val()) !='undefined' && typeof($(inputCurrId).val()) !='undefined')){
                            if(checkPositiveValue($(inputCurrId).val())==false || checkPositiveValue($("#inputPrevValDB").val())==false){
                                alert('Current value & previous value should be positive!');
                                $(inputCurrId).val('');
                                $(inputBottomCurrId).val('');
                                $(inputCurrId).focus();
                                resetInputsSearchMasseneingabe();
                                return false;
                            }
                        }
                        if(($(inputCurNextId).val() !='' && $(inputCurrId).val() !='') && (typeof($(inputCurNextId).val()) !='undefined' && typeof($(inputCurrId).val()) !='undefined')){
                            if(checkPositiveValue($(inputCurrId).val()) ==false || checkPositiveValue($(inputCurNextId).val())==false){
                                alert('Current value & next value should be positive!');
                                $(inputCurrId).val('');
                                $(inputBottomCurrId).val('');
                                $(inputCurrId).focus();
                                resetInputsSearchMasseneingabe();
                                return false;
                            }
                        }
                        if(($("#inputLastValDB").val() !='' && $(inputCurrId).val() !='') && (typeof($("#inputLastValDB").val()) !='undefined' && typeof($(inputCurrId).val()) !='undefined')){
                            if(checkPositiveValue($(inputCurrId).val())==false || checkPositiveValue($("#inputLastValDB").val())==false){
                                alert('Current value & previous value should be positive!');
                                $(inputCurrId).val('');
                                $(inputDeleteBotmId).val('');
                                $(inputCurrId).focus();
                                resetInputsSearchMasseneingabe();
                                return false;
                            }
                        }
                        if(($("#inputNextLastValDB").val() !='' && $(inputCurrId).val() !='') && (typeof($("#inputNextLastValDB").val()) !='undefined' && typeof($(inputCurrId).val()) !='undefined')){
                            if(checkPositiveValue($(inputCurrId).val()) ==false || checkPositiveValue($("#inputNextLastValDB").val())==false){
                                alert('Current value & next value should be positive!');
                                $(inputCurrId).val('');
                                $(inputDeleteBotmId).val('');
                                $(inputCurrId).focus();
                                resetInputsSearchMasseneingabe();
                                return false;
                            }
                        }
                    }
                    if(($("#inputValBottomCurr").val() !='' && $("#inputValBottomPrev").val() !='') && (typeof($("#inputValBottomCurr").val()) !='undefined' && typeof($("#inputValBottomPrev").val()) !='undefined')){
                        //console.log(1);
                        var inputValBottomCurr= $("#inputValBottomCurr").val();
                        var inputValBottomPrev= $("#inputValBottomPrev").val();
                    }else{
                        //console.log(2);
                        var inputValBottomPrev= $("#inputPrevBtmValDB").val();
                        var inputValBottomCurr=$("#inputValBottomCurr").val();
                    }
                    /*console.log('inputValBottomCurr='+inputValBottomCurr);
                    console.log('inputValBottomPrev='+inputValBottomPrev);
                    console.log('inputBotmMax='+inputBotmMax);
                    console.log('inputBotmMin='+inputBotmMin);
                    console.log('showPopupExist='+showPopupExist);*/

                    /*Min and Max condition*/
                    var inputBotmMin = $("#inputBotmMin").val();
                    var inputBotmMax = $("#inputBotmMax").val();
                    /*Check greater less condition*/
                    if((inputValBottomCurr !='' && inputValBottomPrev !='') && (typeof(inputValBottomCurr) !='undefined' && typeof(inputValBottomPrev) !='undefined')){
                        if(showPopupExist ==true && inputDefaultShowPopup=='true'){
                            if (( inputValBottomCurr !='' && typeof(inputValBottomCurr) !='undefined' && typeof(inputBotmMin) !='undefined' && typeof(inputBotmMax) !='undefined') && ((inputValBottomCurr <= Number(inputBotmMax)) && (inputValBottomCurr >= Number(inputBotmMin)))){
                                //var currInputID = $("#currInputID").val();
                                var rowMainIDDs = $("#rowMainIDDs").val();
                                //getLastInputValuesByCurrent(currInputID,rowMainIDDs,4);
                                if(anlageObj[rowMstID]){
                                    var inputCountLength = anlageObj[rowMstID].length;
                                    if(inputCountLength>4){
                                         checkAlertRangeMinMaxServerSide(type,rowMstID,date,rowMainIDDs);
                                    }
                                }
                                $("#masseneingabeSpeichernSrch").prop("disabled", false);
                                return false;
                            }
                             if((inputBotmMin !='' && inputBotmMax !='') && (typeof(inputBotmMin) !='undefined' && typeof(inputBotmMax) !='undefined')){
                                 if (( inputValBottomCurr !='' && typeof(inputValBottomCurr) !='undefined' ) && ((inputValBottomCurr <= Number(inputBotmMax)) && (inputValBottomCurr >= Number(inputBotmMin)))){
                                     return false;
                                }
                            }
                            var inputLengthBottom = inputValBottomCurr.length;
                            var inputLengthBottomPrev = inputValBottomPrev.length;
                            var valLeft = checkPositiveValue(inputValBottomPrev);
                            var valRight = checkPositiveValue(inputValBottomCurr);

                            if(valLeft ==true && valRight ==true ) {
                                if(inputLengthBottom != inputLengthBottomPrev){
                                     //alert('concern 9');
                                    intBdeSearchConcernOrDeletePopUp(inputCurPrevId,inputCurrId,inputBottomCurrId,rowMstID);
                                }
                            }else if((valLeft ==true && valRight ==false) || (valLeft ==false && valRight ==true)){
                                 //alert('concern 10');
                                    intBdeSearchConcernOrDeletePopUp(inputCurPrevId,inputCurrId,inputBottomCurrId,rowMstID);
                            }else if(valLeft ==false && valRight ==false) {
                                if(inputLengthBottom != inputLengthBottomPrev){
                                     //alert('concern 11');
                                    intBdeSearchConcernOrDeletePopUp(inputCurPrevId,inputCurrId,inputBottomCurrId,rowMstID);
                                }
                            }
                        }
                    }

                    /*MM_27-01-2020 Concern popup on if prevlast and current bottom val().length are diffrent*/

                    var showLastPopupExist = $(inputCurrId).hasClass("isShowPopup");

                    if($(inputPrevLastBottomId).val() !='' && typeof($(inputPrevLastBottomId).val()) !='undefined' && $("#inputValBottomCurr").val() != "" ){
                        var inputPrevLastBottomVal = $(inputPrevLastBottomId).val();
                        var inputBottomCurrVal = $("#inputValBottomCurr").val();
                    }
                    if($(inputPrevLastBottomId).val() !='' && typeof($(inputPrevLastBottomId).val()) !='undefined' ){
                        if(showLastPopupExist == true && inputDefaultShowPopup=='true'){
                            if(inputPrevLastBottomVal !="" && typeof(inputPrevLastBottomVal) !='undefined'){
                                var inputPrevLastBottomLength = inputPrevLastBottomVal.length;
                            }
                            if(inputBottomCurrVal !="" && typeof(inputBottomCurrVal) !='undefined'){
                               var inputBottomCurrLength = inputBottomCurrVal.length;
                            }
                            var valLastLeft = checkPositiveValue(inputPrevLastBottomVal);
                            var valLastRight = checkPositiveValue(inputBottomCurrVal);

                            if(valLastLeft ==true && valLastRight ==true) {
                                if(inputBottomCurrLength != inputPrevLastBottomLength){
                                    // alert('concern 12');
                                    intBdeSearchConcernOrDeletePopUp(inputPrevLastId,inputNextId,inputBottomCurrId,rowMstID);
                                }
                            }
                        }
                    }
                    /*MM_27-01-2020 End Concern popup on if prevlast and current bottom val().length are diffrent*/
                    if($('#intBdeConcernOrDeletePopUp').length==0){
                     $("#masseneingabeSpeichernSrch").prop("disabled",false);
                    }
                }
            }
        });
        /*new-mm-start 01-04-2021*/
        $("body").on('click','#infosMasseneingabePrdkt', function (event) {
            if (!$(event.target).closest('#btnTageMasseneingabeIMwNwPrdkt,#btnWochenMasseneingabeIMwNwPrdkt,#btnMonateMasseneingabeIMwNwPrdkt,#btnJahreMasseneingabeIMwNwPrdkt,#btnMasseneingabeIMwSearchPrdkt').length) {
                if ($('#timeIntervalWerteEnergiedatenIMwPrdkt').html() != ""){

                    var inputCurPrevId = $("#inputCurPrevId").val();
                    var inputCurrId= $("#inputCurrId").val();
                    var inputCurNextId = $("#inputNextId").val();
                    var inputBottomCurrId= $("#inputBottomCurrId").val();
                    var inputBottomPrevId= $("#inputBottomPrevId").val();
                    var showPopupExist = $(inputCurrId).hasClass("isShowPopup");
                    var inputDeleteBotmId = $("#inputDeleteBotmId").val();
                    var einheitVal = $(inputCurrId).closest('tr').attr('data-einheit');
                    var inputDefaultShowPopup = $("#inputDefaultShowPopup").val();
                    var rowMstID = $(this).closest('td').attr('data-id');
                    var date = $(this).closest('td').attr('date');
                    var type = $(".infosMasseneingabeInside button.active").attr('data-id');
                    /*MM_27-01-2021 Start:check previous value is null and last value*/

                    var inputVal=$(this).val();
                    var checkPrevVal = $(this).closest('td').prev('td').find('input').val();
                    var inputCurrBottomId= $("#inputBottomCurrId").val();
                    var inputIdPrevlast = $('#inputLastValDB').val();
                    var inputNextLastValDB = $("#inputNextLastValDB").val();
                    var nextId = $("#inputNextLastIdDB").val();
                    var prevId = $("#inputPrevLastIdDB").val();
                    var inputNextLastId = $("#inputIdNextlast").val();
                    var inputPrevLastId = $("#inputIdPrevlast").val();
                    var inputNextLastBottomId = $("#inputNextLastBottomId").val();
                    var inputPrevLastBottomId = $("#inputIdPrevBottomlast").val();

                    var inputNextBottomId = $("#inputNextBottomId").val();

                    /* if($("#inputCurrId").val() !='' && typeof($("#inputCurrId")) != 'undefined') {
                        //Continue...
                    }else{
                        // $(inputCurrBottomId).val("");
                    }
                    */

                    var nextPrevDiff = inputNextLastValDB - inputIdPrevlast;

                    if($("#inputPrevValDB").val() == "" && inputIdPrevlast !=""){
                        var nextDiff = $(inputCurNextId).val() -  inputIdPrevlast;
                    }
                    else if($("#inputPrevValDB").val() !=""){
                        var nextDiff = $(inputCurNextId).val() - $("#inputPrevValDB").val();
                    }
                    var lastNextDiff  =  inputNextLastValDB - $(inputCurPrevId).val();
                    var prevDiff = $(inputCurNextId).val() - $(inputCurPrevId).val();

                    /*MM_27-01-2021 End:check previous value is null and last value*/

                    /*Check greater less condition*/
                    if((einheitVal==1 || einheitVal==2) && (einheitVal !='' && typeof(einheitVal) !='undefined')){
                        if(($(inputCurPrevId).val() !='' && $(inputCurrId).val() !='') && (typeof($(inputCurPrevId).val()) !='undefined' && typeof($(inputCurrId).val()) !='undefined')){
                            if(Number($(inputCurrId).val()) <= Number($(inputCurPrevId).val())){
                                alert('Current value should be greater then previous value!');
                                $(inputCurrId).val('');
                                $(inputDeleteBotmId).val('');
                                $(inputNextLastBottomId).val(lastNextDiff);
                                if($(inputCurNextId).val()!="" && $(inputCurPrevId).val() !=""){
                                    $(inputNextBottomId).val(prevDiff);
                                }
                                if($('#currInputID').val() == 0){
                                    if(($(inputCurrId).val() == "" && typeof($(inputCurrId).val()) != 'undefined') && ($(inputCurNextId).val() != "" && typeof($(inputCurNextId).val()) != 'undefined') ){
                                        var secBottomValDB = $($('#inputNextId').val()).val() - $('#inputPrevValDB').val();
                                        //console.log("currinput0 : secondBottom"+secBottomValDB+"->"+$('#inputPrevValDB').val()+"-"+$($('#inputNextId').val()).val());
                                        $(inputNextBottomId).val(secBottomValDB);
                                    }
                                    if(($(inputCurrId).val() == "" && typeof($(inputCurrId).val()) != 'undefined') && (inputNextLastValDB != "" && typeof(inputNextLastValDB) != 'undefined')){
                                        var lastBottomValDB = $("#inputNextLastValDB").val() - $('#inputPrevValDB').val();
                                        //console.log("currinput0 : lastBottomValDB"+lastBottomValDB+"->"+$("#inputNextLastValDB").val()+"-"+$('#inputPrevValDB').val());
                                        $(inputNextLastBottomId).val(lastBottomValDB);
                                        //$(inputNextLastBottomId).val("");
                                    }
                                }
                                $(inputCurrId).focus();
                                resetInputsSearchMasseneingabe();
                                return false;
                            }
                        }else if(($("#inputPrevValDB").val() !='' && $(inputCurrId).val() !='') && (typeof($("#inputPrevValDB").val()) !='undefined' && typeof($(inputCurrId).val()) !='undefined')){
                            if(Number($(inputCurrId).val()) <= Number($("#inputPrevValDB").val())){
                                alert('Current value should be greater then previous value!');

                                $(inputCurrId).val('');
                                $(inputDeleteBotmId).val('');
                                $(inputNextLastBottomId).val(lastNextDiff);
                                if($(inputCurNextId).val()!="" && $(inputCurPrevId).val() !=""){
                                    $(inputNextBottomId).val(prevDiff);
                                }
                                if($('#currInputID').val() == 0){
                                    if(($(inputCurrId).val() == "" && typeof($(inputCurrId).val()) != 'undefined') && ($(inputCurNextId).val() != "" && typeof($(inputCurNextId).val()) != 'undefined') ){
                                        var secBottomValDB = $($('#inputNextId').val()).val() - $('#inputPrevValDB').val();
                                        //console.log("currinput0 : secondBottom"+secBottomValDB+"->"+$('#inputPrevValDB').val()+"-"+$($('#inputNextId').val()).val());
                                        $(inputNextBottomId).val(secBottomValDB);
                                    }
                                    if(($(inputCurrId).val() == "" && typeof($(inputCurrId).val()) != 'undefined') && (inputNextLastValDB != "" && typeof(inputNextLastValDB) != 'undefined')){
                                        var lastBottomValDB = $("#inputNextLastValDB").val() - $('#inputPrevValDB').val();
                                        //console.log("currinput0 : lastBottomValDB"+lastBottomValDB+"->"+$("#inputNextLastValDB").val()+"-"+$('#inputPrevValDB').val());
                                        $(inputNextLastBottomId).val(lastBottomValDB);
                                        //$(inputNextLastBottomId).val("");
                                    }
                                }
                                $(inputCurrId).focus();
                                resetInputsSearchMasseneingabe();
                                return false;
                            }
                        }
                        if(($(inputCurNextId).val() !="" && $(inputCurPrevId).val() !="" && $(inputCurrId).val() !='') && (typeof($(inputCurPrevId).val()) !='undefined' && typeof($(inputCurNextId).val()) !='undefined' && typeof($(inputCurrId).val()) !='undefined')){

                            if(Number($(inputCurrId).val()) >= Number($(inputCurNextId).val())){
                                alert('Current value should not be greater then next value! ');
                                $(inputCurrId).val('');
                                $(inputDeleteBotmId).val('');
                                $(inputNextBottomId).val(prevDiff);
                                $(inputCurrId).focus();
                                resetInputsSearchMasseneingabe();
                                return false;
                            }
                        }
                        if(($(inputCurNextId).val() !='' && $(inputCurrId).val() !='') && (typeof($(inputCurNextId).val()) !='undefined' && typeof($(inputCurrId).val()) !='undefined')){
                            if(Number($(inputCurrId).val()) >= Number($(inputCurNextId).val())){
                                alert('Current value should not be greater then next value! ');
                                $(inputCurrId).val('');
                                $(inputDeleteBotmId).val('');
                                $(inputNextBottomId).val(nextDiff);
                                $(inputCurrId).focus();
                                resetInputsSearchMasseneingabe();
                                return false;
                            }
                        }
                        if(($("#inputLastValDB").val() !='' && $(inputCurrId).val() !='') && (typeof($("#inputLastValDB").val()) !='undefined' && typeof($(inputCurrId).val()) !='undefined')){
                            if(Number($(''+inputCurrId+'').val()) <= Number($('#inputLastValDB').val())){
                                 if(($($(inputFocusedId).val()).val() !='' && typeof($($(inputFocusedId).val()).val() ) !='undefined')
                                    && ($(inputCurPrevId).val() == "" && typeof($(inputCurPrevId).val() ) !='undefined')){ /*nzp 04-02-2021*/
                                    alert('Current value should be greater then last value!');
                                    $(inputCurrId).val('');
                                    $(inputDeleteBotmId).val('');
                                    $(inputNextLastBottomId).val(nextPrevDiff);
                                    if($(inputCurNextId).val() !=''){
                                        $(inputNextBottomId).val(nextDiff);
                                    }
                                    $(inputCurrId).focus();
                                    resetInputsSearchMasseneingabe();
                                    return false;
                                }
                            }
                        }
                        if(($("#inputNextLastValDB").val() !='' && $(inputCurrId).val() !='') && (typeof($("#inputNextLastValDB").val()) !='undefined' && typeof($(inputCurrId).val()) !='undefined')){
                            if(Number($(inputCurrId).val()) >= Number($("#inputNextLastValDB").val())){
                                alert('Current value should not be greater then next available value!');
                                $(inputCurrId).val('');
                                $(inputDeleteBotmId).val('');
                                $(inputNextLastBottomId).val(nextPrevDiff);
                                if($(inputCurPrevId).val() !=''){
                                    $(inputNextLastBottomId).val(lastNextDiff);
                                }
                                if($('#currInputID').val() == 0){

                                    if(($(inputCurrId).val() == "" && typeof($(inputCurrId).val()) != 'undefined') && ($(inputCurNextId).val() != "" && typeof($(inputCurNextId).val()) != 'undefined') ){
                                        var secBottomValDB = $($('#inputNextId').val()).val() - $('#inputPrevValDB').val();
                                        //console.log("currinput0 : secondBottom"+secBottomValDB+"->"+$('#inputPrevValDB').val()+"-"+$($('#inputNextId').val()).val());
                                        $(inputNextBottomId).val(secBottomValDB);
                                    }
                                    if(($(inputCurrId).val() == "" && typeof($(inputCurrId).val()) != 'undefined') && (inputNextLastValDB != "" && typeof(inputNextLastValDB) != 'undefined')){
                                        var lastBottomValDB = $("#inputNextLastValDB").val() - $('#inputPrevValDB').val();
                                        //console.log("currinput0 : lastBottomValDB"+lastBottomValDB+"->"+$("#inputNextLastValDB").val()+"-"+$('#inputPrevValDB').val());
                                        /*new_addon mm-02-02-2021*/
                                        if($('#inputPrevValDB').val() != ""){
                                            $(inputNextLastBottomId).val(lastBottomValDB);
                                        }
                                        //$(inputNextLastBottomId).val("");
                                    }
                                }
                                /*new_addon mm-02-02-2021*/
                                if(allPrevVal)
                                {
                                    if(allPrevVal.length == 0 && ( $("#inputPrevValDB").val() =='')){
                                        $(inputNextLastBottomId).val("");
                                    }
                                }
                                /*new_addon end mm-02-02-2021*/

                                $(inputCurrId).focus();
                                resetInputsSearchMasseneingabe();
                                return false;
                            }
                        }
                    }
                    if((einheitVal==3 || einheitVal==4) && (einheitVal !='' && typeof(einheitVal) !='undefined')){
                        if(($(inputCurPrevId).val() !='' && $(inputCurrId).val() !='') && (typeof($(inputCurPrevId).val()) !='undefined' && typeof($(inputCurrId).val()) !='undefined')){
                            if(checkPositiveValue($(inputCurrId).val())==false || checkPositiveValue($(inputCurPrevId).val())==false){
                                alert('Current value & previous value should be positive!');
                                $(inputCurrId).val('');
                                $(inputBottomCurrId).val('');
                                $(inputCurrId).focus();
                                resetInputsSearchMasseneingabe();
                                return false;
                            }
                        }else if(($("#inputPrevValDB").val() !='' && $(inputCurrId).val() !='') && (typeof($("#inputPrevValDB").val()) !='undefined' && typeof($(inputCurrId).val()) !='undefined')){
                            if(checkPositiveValue($(inputCurrId).val())==false || checkPositiveValue($("#inputPrevValDB").val())==false){
                                alert('Current value & previous value should be positive!');
                                $(inputCurrId).val('');
                                $(inputBottomCurrId).val('');
                                $(inputCurrId).focus();
                                resetInputsSearchMasseneingabe();
                                return false;
                            }
                        }
                        if(($(inputCurNextId).val() !='' && $(inputCurrId).val() !='') && (typeof($(inputCurNextId).val()) !='undefined' && typeof($(inputCurrId).val()) !='undefined')){
                            if(checkPositiveValue($(inputCurrId).val()) ==false || checkPositiveValue($(inputCurNextId).val())==false){
                                alert('Current value & next value should be positive!');
                                $(inputCurrId).val('');
                                $(inputBottomCurrId).val('');
                                $(inputCurrId).focus();
                                resetInputsSearchMasseneingabe();
                                return false;
                            }
                        }
                        if(($("#inputLastValDB").val() !='' && $(inputCurrId).val() !='') && (typeof($("#inputLastValDB").val()) !='undefined' && typeof($(inputCurrId).val()) !='undefined')){
                            if(checkPositiveValue($(inputCurrId).val())==false || checkPositiveValue($("#inputLastValDB").val())==false){
                                alert('Current value & previous value should be positive!');
                                $(inputCurrId).val('');
                                $(inputDeleteBotmId).val('');
                                $(inputCurrId).focus();
                                resetInputsSearchMasseneingabe();
                                return false;
                            }
                        }
                        if(($("#inputNextLastValDB").val() !='' && $(inputCurrId).val() !='') && (typeof($("#inputNextLastValDB").val()) !='undefined' && typeof($(inputCurrId).val()) !='undefined')){
                            if(checkPositiveValue($(inputCurrId).val()) ==false || checkPositiveValue($("#inputNextLastValDB").val())==false){
                                alert('Current value & next value should be positive!');
                                $(inputCurrId).val('');
                                $(inputDeleteBotmId).val('');
                                $(inputCurrId).focus();
                                resetInputsSearchMasseneingabe();
                                return false;
                            }
                        }
                    }
                    if(($("#inputValBottomCurr").val() !='' && $("#inputValBottomPrev").val() !='') && (typeof($("#inputValBottomCurr").val()) !='undefined' && typeof($("#inputValBottomPrev").val()) !='undefined')){
                        //console.log(1);
                        var inputValBottomCurr= $("#inputValBottomCurr").val();
                        var inputValBottomPrev= $("#inputValBottomPrev").val();
                    }else{
                        //console.log(2);
                        var inputValBottomPrev= $("#inputPrevBtmValDB").val();
                        var inputValBottomCurr=$("#inputValBottomCurr").val();
                    }
                    /*console.log('inputValBottomCurr='+inputValBottomCurr);
                    console.log('inputValBottomPrev='+inputValBottomPrev);
                    console.log('inputBotmMax='+inputBotmMax);
                    console.log('inputBotmMin='+inputBotmMin);
                    console.log('showPopupExist='+showPopupExist);*/

                    /*Min and Max condition*/
                    var inputBotmMin = $("#inputBotmMin").val();
                    var inputBotmMax = $("#inputBotmMax").val();
                    /*Check greater less condition*/
                    if((inputValBottomCurr !='' && inputValBottomPrev !='') && (typeof(inputValBottomCurr) !='undefined' && typeof(inputValBottomPrev) !='undefined')){
                        if(showPopupExist ==true && inputDefaultShowPopup=='true'){
                            if (( inputValBottomCurr !='' && typeof(inputValBottomCurr) !='undefined' && typeof(inputBotmMin) !='undefined' && typeof(inputBotmMax) !='undefined') && ((inputValBottomCurr <= Number(inputBotmMax)) && (inputValBottomCurr >= Number(inputBotmMin)))){
                                //var currInputID = $("#currInputID").val();
                                var rowMainIDDs = $("#rowMainIDDs").val();
                                //getLastInputValuesByCurrent(currInputID,rowMainIDDs,4);
                                if(anlageObj[rowMstID]){
                                    var inputCountLength = anlageObj[rowMstID].length;
                                    if(inputCountLength>4){
                                         checkAlertRangeMinMaxServerSidePrdkt(type,rowMstID,date,rowMainIDDs);
                                    }
                                }
                                $("#masseneingabeSpeichernSrchPrdkt").prop("disabled", false);
                                return false;
                            }
                             if((inputBotmMin !='' && inputBotmMax !='') && (typeof(inputBotmMin) !='undefined' && typeof(inputBotmMax) !='undefined')){
                                 if (( inputValBottomCurr !='' && typeof(inputValBottomCurr) !='undefined' ) && ((inputValBottomCurr <= Number(inputBotmMax)) && (inputValBottomCurr >= Number(inputBotmMin)))){
                                     return false;
                                }
                            }
                            var inputLengthBottom = inputValBottomCurr.length;
                            var inputLengthBottomPrev = inputValBottomPrev.length;
                            var valLeft = checkPositiveValue(inputValBottomPrev);
                            var valRight = checkPositiveValue(inputValBottomCurr);

                            if(valLeft ==true && valRight ==true ) {
                                if(inputLengthBottom != inputLengthBottomPrev){
                                     //alert('concern 9');
                                    intBdeSearchConcernOrDeletePopUpPrdkt(inputCurPrevId,inputCurrId,inputBottomCurrId,rowMstID);
                                }
                            }else if((valLeft ==true && valRight ==false) || (valLeft ==false && valRight ==true)){
                                 //alert('concern 10');
                                    intBdeSearchConcernOrDeletePopUpPrdkt(inputCurPrevId,inputCurrId,inputBottomCurrId,rowMstID);
                            }else if(valLeft ==false && valRight ==false) {
                                if(inputLengthBottom != inputLengthBottomPrev){
                                     //alert('concern 11');
                                    intBdeSearchConcernOrDeletePopUpPrdkt(inputCurPrevId,inputCurrId,inputBottomCurrId,rowMstID);
                                }
                            }
                        }
                    }

                    /*MM_27-01-2020 Concern popup on if prevlast and current bottom val().length are diffrent*/

                    var showLastPopupExist = $(inputCurrId).hasClass("isShowPopup");

                    if($(inputPrevLastBottomId).val() !='' && typeof($(inputPrevLastBottomId).val()) !='undefined' && $("#inputValBottomCurr").val() != "" ){
                        var inputPrevLastBottomVal = $(inputPrevLastBottomId).val();
                        var inputBottomCurrVal = $("#inputValBottomCurr").val();
                    }
                    if($(inputPrevLastBottomId).val() !='' && typeof($(inputPrevLastBottomId).val()) !='undefined' ){
                        if(showLastPopupExist == true && inputDefaultShowPopup=='true'){
                            if(inputPrevLastBottomVal !="" && typeof(inputPrevLastBottomVal) !='undefined'){
                                var inputPrevLastBottomLength = inputPrevLastBottomVal.length;
                            }
                            if(inputBottomCurrVal !="" && typeof(inputBottomCurrVal) !='undefined'){
                               var inputBottomCurrLength = inputBottomCurrVal.length;
                            }
                            var valLastLeft = checkPositiveValue(inputPrevLastBottomVal);
                            var valLastRight = checkPositiveValue(inputBottomCurrVal);

                            if(valLastLeft ==true && valLastRight ==true) {
                                if(inputBottomCurrLength != inputPrevLastBottomLength){
                                    // alert('concern 12');
                                    intBdeSearchConcernOrDeletePopUpPrdkt(inputPrevLastId,inputNextId,inputBottomCurrId,rowMstID);
                                }
                            }
                        }
                    }
                    /*MM_27-01-2020 End Concern popup on if prevlast and current bottom val().length are diffrent*/
                    if($('#intBdeConcernOrDeletePopUp').length==0){
                        $("#masseneingabeSpeichernSrchPrdkt").prop("disabled",false);
                    }
                }
            }
        });
        /*new-mm-end 01-04-2021*/
        /*new-mm-start 01-04-2021*/
        $("body").on('click','#infosMasseneingabeMesssetelle', function (event) {
            if (!$(event.target).closest('#btnTageMasseneingabeIMwNwMesssetelle,#btnWochenMasseneingabeIMwNwMesssetelle,#btnMonateMasseneingabeIMwNwMesssetelle,#btnJahreMasseneingabeIMwNwMesssetelle,#btnMasseneingabeIMwSearchMesssetelle').length) {
                if ($('#timeIntervalWerteEnergiedatenIMwMesssetelle').html() != ""){

                    var inputCurPrevId = $("#inputCurPrevId").val();
                    var inputCurrId= $("#inputCurrId").val();
                    var inputCurNextId = $("#inputNextId").val();
                    var inputBottomCurrId= $("#inputBottomCurrId").val();
                    var inputBottomPrevId= $("#inputBottomPrevId").val();
                    var showPopupExist = $(inputCurrId).hasClass("isShowPopup");
                    var inputDeleteBotmId = $("#inputDeleteBotmId").val();
                    var einheitVal = $(inputCurrId).closest('tr').attr('data-einheit');
                    var inputDefaultShowPopup = $("#inputDefaultShowPopup").val();
                    var rowMstID = $(this).closest('td').attr('data-id');
                    var date = $(this).closest('td').attr('date');
                    var type = $(".infosMasseneingabeInside button.active").attr('data-id');
                    /*MM_27-01-2021 Start:check previous value is null and last value*/

                    var inputVal=$(this).val();
                    var checkPrevVal = $(this).closest('td').prev('td').find('input').val();
                    var inputCurrBottomId= $("#inputBottomCurrId").val();
                    var inputIdPrevlast = $('#inputLastValDB').val();
                    var inputNextLastValDB = $("#inputNextLastValDB").val();
                    var nextId = $("#inputNextLastIdDB").val();
                    var prevId = $("#inputPrevLastIdDB").val();
                    var inputNextLastId = $("#inputIdNextlast").val();
                    var inputPrevLastId = $("#inputIdPrevlast").val();
                    var inputNextLastBottomId = $("#inputNextLastBottomId").val();
                    var inputPrevLastBottomId = $("#inputIdPrevBottomlast").val();

                    var inputNextBottomId = $("#inputNextBottomId").val();

                    /* if($("#inputCurrId").val() !='' && typeof($("#inputCurrId")) != 'undefined') {
                        //Continue...
                    }else{
                        // $(inputCurrBottomId).val("");
                    }
                    */

                    var nextPrevDiff = inputNextLastValDB - inputIdPrevlast;

                    if($("#inputPrevValDB").val() == "" && inputIdPrevlast !=""){
                        var nextDiff = $(inputCurNextId).val() -  inputIdPrevlast;
                    }
                    else if($("#inputPrevValDB").val() !=""){
                        var nextDiff = $(inputCurNextId).val() - $("#inputPrevValDB").val();
                    }
                    var lastNextDiff  =  inputNextLastValDB - $(inputCurPrevId).val();
                    var prevDiff = $(inputCurNextId).val() - $(inputCurPrevId).val();

                    /*MM_27-01-2021 End:check previous value is null and last value*/

                    /*Check greater less condition*/
                    if((einheitVal==1 || einheitVal==2) && (einheitVal !='' && typeof(einheitVal) !='undefined')){
                        if(($(inputCurPrevId).val() !='' && $(inputCurrId).val() !='') && (typeof($(inputCurPrevId).val()) !='undefined' && typeof($(inputCurrId).val()) !='undefined')){
                            if(Number($(inputCurrId).val()) <= Number($(inputCurPrevId).val())){
                                alert('Current value should be greater then previous value!');
                                $(inputCurrId).val('');
                                $(inputDeleteBotmId).val('');
                                $(inputNextLastBottomId).val(lastNextDiff);
                                if($(inputCurNextId).val()!="" && $(inputCurPrevId).val() !=""){
                                    $(inputNextBottomId).val(prevDiff);
                                }
                                if($('#currInputID').val() == 0){
                                    if(($(inputCurrId).val() == "" && typeof($(inputCurrId).val()) != 'undefined') && ($(inputCurNextId).val() != "" && typeof($(inputCurNextId).val()) != 'undefined') ){
                                        var secBottomValDB = $($('#inputNextId').val()).val() - $('#inputPrevValDB').val();
                                        //console.log("currinput0 : secondBottom"+secBottomValDB+"->"+$('#inputPrevValDB').val()+"-"+$($('#inputNextId').val()).val());
                                        $(inputNextBottomId).val(secBottomValDB);
                                    }
                                    if(($(inputCurrId).val() == "" && typeof($(inputCurrId).val()) != 'undefined') && (inputNextLastValDB != "" && typeof(inputNextLastValDB) != 'undefined')){
                                        var lastBottomValDB = $("#inputNextLastValDB").val() - $('#inputPrevValDB').val();
                                        //console.log("currinput0 : lastBottomValDB"+lastBottomValDB+"->"+$("#inputNextLastValDB").val()+"-"+$('#inputPrevValDB').val());
                                        $(inputNextLastBottomId).val(lastBottomValDB);
                                        //$(inputNextLastBottomId).val("");
                                    }
                                }
                                $(inputCurrId).focus();
                                resetInputsSearchMasseneingabe();
                                return false;
                            }
                        }else if(($("#inputPrevValDB").val() !='' && $(inputCurrId).val() !='') && (typeof($("#inputPrevValDB").val()) !='undefined' && typeof($(inputCurrId).val()) !='undefined')){
                            if(Number($(inputCurrId).val()) <= Number($("#inputPrevValDB").val())){
                                alert('Current value should be greater then previous value!');

                                $(inputCurrId).val('');
                                $(inputDeleteBotmId).val('');
                                $(inputNextLastBottomId).val(lastNextDiff);
                                if($(inputCurNextId).val()!="" && $(inputCurPrevId).val() !=""){
                                    $(inputNextBottomId).val(prevDiff);
                                }
                                if($('#currInputID').val() == 0){
                                    if(($(inputCurrId).val() == "" && typeof($(inputCurrId).val()) != 'undefined') && ($(inputCurNextId).val() != "" && typeof($(inputCurNextId).val()) != 'undefined') ){
                                        var secBottomValDB = $($('#inputNextId').val()).val() - $('#inputPrevValDB').val();
                                        //console.log("currinput0 : secondBottom"+secBottomValDB+"->"+$('#inputPrevValDB').val()+"-"+$($('#inputNextId').val()).val());
                                        $(inputNextBottomId).val(secBottomValDB);
                                    }
                                    if(($(inputCurrId).val() == "" && typeof($(inputCurrId).val()) != 'undefined') && (inputNextLastValDB != "" && typeof(inputNextLastValDB) != 'undefined')){
                                        var lastBottomValDB = $("#inputNextLastValDB").val() - $('#inputPrevValDB').val();
                                        //console.log("currinput0 : lastBottomValDB"+lastBottomValDB+"->"+$("#inputNextLastValDB").val()+"-"+$('#inputPrevValDB').val());
                                        $(inputNextLastBottomId).val(lastBottomValDB);
                                        //$(inputNextLastBottomId).val("");
                                    }
                                }
                                $(inputCurrId).focus();
                                resetInputsSearchMasseneingabe();
                                return false;
                            }
                        }
                        if(($(inputCurNextId).val() !="" && $(inputCurPrevId).val() !="" && $(inputCurrId).val() !='') && (typeof($(inputCurPrevId).val()) !='undefined' && typeof($(inputCurNextId).val()) !='undefined' && typeof($(inputCurrId).val()) !='undefined')){

                            if(Number($(inputCurrId).val()) >= Number($(inputCurNextId).val())){
                                alert('Current value should not be greater then next value! ');
                                $(inputCurrId).val('');
                                $(inputDeleteBotmId).val('');
                                $(inputNextBottomId).val(prevDiff);
                                $(inputCurrId).focus();
                                resetInputsSearchMasseneingabe();
                                return false;
                            }
                        }
                        if(($(inputCurNextId).val() !='' && $(inputCurrId).val() !='') && (typeof($(inputCurNextId).val()) !='undefined' && typeof($(inputCurrId).val()) !='undefined')){
                            if(Number($(inputCurrId).val()) >= Number($(inputCurNextId).val())){
                                alert('Current value should not be greater then next value! ');
                                $(inputCurrId).val('');
                                $(inputDeleteBotmId).val('');
                                $(inputNextBottomId).val(nextDiff);
                                $(inputCurrId).focus();
                                resetInputsSearchMasseneingabe();
                                return false;
                            }
                        }
                        if(($("#inputLastValDB").val() !='' && $(inputCurrId).val() !='') && (typeof($("#inputLastValDB").val()) !='undefined' && typeof($(inputCurrId).val()) !='undefined')){
                            if(Number($(''+inputCurrId+'').val()) <= Number($('#inputLastValDB').val())){
                                 if(($($(inputFocusedId).val()).val() !='' && typeof($($(inputFocusedId).val()).val() ) !='undefined')
                                    && ($(inputCurPrevId).val() == "" && typeof($(inputCurPrevId).val() ) !='undefined')){ /*nzp 04-02-2021*/
                                    alert('Current value should be greater then last value!');
                                    $(inputCurrId).val('');
                                    $(inputDeleteBotmId).val('');
                                    $(inputNextLastBottomId).val(nextPrevDiff);
                                    if($(inputCurNextId).val() !=''){
                                        $(inputNextBottomId).val(nextDiff);
                                    }
                                    $(inputCurrId).focus();
                                    resetInputsSearchMasseneingabe();
                                    return false;
                                }
                            }
                        }
                        if(($("#inputNextLastValDB").val() !='' && $(inputCurrId).val() !='') && (typeof($("#inputNextLastValDB").val()) !='undefined' && typeof($(inputCurrId).val()) !='undefined')){
                            if(Number($(inputCurrId).val()) >= Number($("#inputNextLastValDB").val())){
                                alert('Current value should not be greater then next available value!');
                                $(inputCurrId).val('');
                                $(inputDeleteBotmId).val('');
                                $(inputNextLastBottomId).val(nextPrevDiff);
                                if($(inputCurPrevId).val() !=''){
                                    $(inputNextLastBottomId).val(lastNextDiff);
                                }
                                if($('#currInputID').val() == 0){

                                    if(($(inputCurrId).val() == "" && typeof($(inputCurrId).val()) != 'undefined') && ($(inputCurNextId).val() != "" && typeof($(inputCurNextId).val()) != 'undefined') ){
                                        var secBottomValDB = $($('#inputNextId').val()).val() - $('#inputPrevValDB').val();
                                        //console.log("currinput0 : secondBottom"+secBottomValDB+"->"+$('#inputPrevValDB').val()+"-"+$($('#inputNextId').val()).val());
                                        $(inputNextBottomId).val(secBottomValDB);
                                    }
                                    if(($(inputCurrId).val() == "" && typeof($(inputCurrId).val()) != 'undefined') && (inputNextLastValDB != "" && typeof(inputNextLastValDB) != 'undefined')){
                                        var lastBottomValDB = $("#inputNextLastValDB").val() - $('#inputPrevValDB').val();
                                        //console.log("currinput0 : lastBottomValDB"+lastBottomValDB+"->"+$("#inputNextLastValDB").val()+"-"+$('#inputPrevValDB').val());
                                        /*new_addon mm-02-02-2021*/
                                        if($('#inputPrevValDB').val() != ""){
                                            $(inputNextLastBottomId).val(lastBottomValDB);
                                        }
                                        //$(inputNextLastBottomId).val("");
                                    }
                                }
                                /*new_addon mm-02-02-2021*/
                                if(allPrevVal)
                                {
                                    if(allPrevVal.length == 0 && ( $("#inputPrevValDB").val() =='')){
                                        $(inputNextLastBottomId).val("");
                                    }
                                }
                                /*new_addon end mm-02-02-2021*/

                                $(inputCurrId).focus();
                                resetInputsSearchMasseneingabe();
                                return false;
                            }
                        }
                    }
                    if((einheitVal==3 || einheitVal==4) && (einheitVal !='' && typeof(einheitVal) !='undefined')){
                        if(($(inputCurPrevId).val() !='' && $(inputCurrId).val() !='') && (typeof($(inputCurPrevId).val()) !='undefined' && typeof($(inputCurrId).val()) !='undefined')){
                            if(checkPositiveValue($(inputCurrId).val())==false || checkPositiveValue($(inputCurPrevId).val())==false){
                                alert('Current value & previous value should be positive!');
                                $(inputCurrId).val('');
                                $(inputBottomCurrId).val('');
                                $(inputCurrId).focus();
                                resetInputsSearchMasseneingabe();
                                return false;
                            }
                        }else if(($("#inputPrevValDB").val() !='' && $(inputCurrId).val() !='') && (typeof($("#inputPrevValDB").val()) !='undefined' && typeof($(inputCurrId).val()) !='undefined')){
                            if(checkPositiveValue($(inputCurrId).val())==false || checkPositiveValue($("#inputPrevValDB").val())==false){
                                alert('Current value & previous value should be positive!');
                                $(inputCurrId).val('');
                                $(inputBottomCurrId).val('');
                                $(inputCurrId).focus();
                                resetInputsSearchMasseneingabe();
                                return false;
                            }
                        }
                        if(($(inputCurNextId).val() !='' && $(inputCurrId).val() !='') && (typeof($(inputCurNextId).val()) !='undefined' && typeof($(inputCurrId).val()) !='undefined')){
                            if(checkPositiveValue($(inputCurrId).val()) ==false || checkPositiveValue($(inputCurNextId).val())==false){
                                alert('Current value & next value should be positive!');
                                $(inputCurrId).val('');
                                $(inputBottomCurrId).val('');
                                $(inputCurrId).focus();
                                resetInputsSearchMasseneingabe();
                                return false;
                            }
                        }
                        if(($("#inputLastValDB").val() !='' && $(inputCurrId).val() !='') && (typeof($("#inputLastValDB").val()) !='undefined' && typeof($(inputCurrId).val()) !='undefined')){
                            if(checkPositiveValue($(inputCurrId).val())==false || checkPositiveValue($("#inputLastValDB").val())==false){
                                alert('Current value & previous value should be positive!');
                                $(inputCurrId).val('');
                                $(inputDeleteBotmId).val('');
                                $(inputCurrId).focus();
                                resetInputsSearchMasseneingabe();
                                return false;
                            }
                        }
                        if(($("#inputNextLastValDB").val() !='' && $(inputCurrId).val() !='') && (typeof($("#inputNextLastValDB").val()) !='undefined' && typeof($(inputCurrId).val()) !='undefined')){
                            if(checkPositiveValue($(inputCurrId).val()) ==false || checkPositiveValue($("#inputNextLastValDB").val())==false){
                                alert('Current value & next value should be positive!');
                                $(inputCurrId).val('');
                                $(inputDeleteBotmId).val('');
                                $(inputCurrId).focus();
                                resetInputsSearchMasseneingabe();
                                return false;
                            }
                        }
                    }
                    if(($("#inputValBottomCurr").val() !='' && $("#inputValBottomPrev").val() !='') && (typeof($("#inputValBottomCurr").val()) !='undefined' && typeof($("#inputValBottomPrev").val()) !='undefined')){
                        //console.log(1);
                        var inputValBottomCurr= $("#inputValBottomCurr").val();
                        var inputValBottomPrev= $("#inputValBottomPrev").val();
                    }else{
                        //console.log(2);
                        var inputValBottomPrev= $("#inputPrevBtmValDB").val();
                        var inputValBottomCurr=$("#inputValBottomCurr").val();
                    }
                    /*console.log('inputValBottomCurr='+inputValBottomCurr);
                    console.log('inputValBottomPrev='+inputValBottomPrev);
                    console.log('inputBotmMax='+inputBotmMax);
                    console.log('inputBotmMin='+inputBotmMin);
                    console.log('showPopupExist='+showPopupExist);*/

                    /*Min and Max condition*/
                    var inputBotmMin = $("#inputBotmMin").val();
                    var inputBotmMax = $("#inputBotmMax").val();
                    /*Check greater less condition*/
                    if((inputValBottomCurr !='' && inputValBottomPrev !='') && (typeof(inputValBottomCurr) !='undefined' && typeof(inputValBottomPrev) !='undefined')){
                        if(showPopupExist ==true && inputDefaultShowPopup=='true'){
                            if (( inputValBottomCurr !='' && typeof(inputValBottomCurr) !='undefined' && typeof(inputBotmMin) !='undefined' && typeof(inputBotmMax) !='undefined') && ((inputValBottomCurr <= Number(inputBotmMax)) && (inputValBottomCurr >= Number(inputBotmMin)))){
                                //var currInputID = $("#currInputID").val();
                                var rowMainIDDs = $("#rowMainIDDs").val();
                                //getLastInputValuesByCurrent(currInputID,rowMainIDDs,4);
                                if(anlageObj[rowMstID]){
                                    var inputCountLength = anlageObj[rowMstID].length;
                                    if(inputCountLength>4){
                                         checkAlertRangeMinMaxServerSide(type,rowMstID,date,rowMainIDDs);
                                    }
                                }
                                $("#masseneingabeSpeichernSrchMesssetelle").prop("disabled", false);
                                return false;
                            }
                             if((inputBotmMin !='' && inputBotmMax !='') && (typeof(inputBotmMin) !='undefined' && typeof(inputBotmMax) !='undefined')){
                                 if (( inputValBottomCurr !='' && typeof(inputValBottomCurr) !='undefined' ) && ((inputValBottomCurr <= Number(inputBotmMax)) && (inputValBottomCurr >= Number(inputBotmMin)))){
                                     return false;
                                }
                            }
                            var inputLengthBottom = inputValBottomCurr.length;
                            var inputLengthBottomPrev = inputValBottomPrev.length;
                            var valLeft = checkPositiveValue(inputValBottomPrev);
                            var valRight = checkPositiveValue(inputValBottomCurr);

                            if(valLeft ==true && valRight ==true ) {
                                if(inputLengthBottom != inputLengthBottomPrev){
                                     //alert('concern 9');
                                    intBdeSearchConcernOrDeletePopUp(inputCurPrevId,inputCurrId,inputBottomCurrId,rowMstID);
                                }
                            }else if((valLeft ==true && valRight ==false) || (valLeft ==false && valRight ==true)){
                                 //alert('concern 10');
                                    intBdeSearchConcernOrDeletePopUp(inputCurPrevId,inputCurrId,inputBottomCurrId,rowMstID);
                            }else if(valLeft ==false && valRight ==false) {
                                if(inputLengthBottom != inputLengthBottomPrev){
                                     //alert('concern 11');
                                    intBdeSearchConcernOrDeletePopUp(inputCurPrevId,inputCurrId,inputBottomCurrId,rowMstID);
                                }
                            }
                        }
                    }

                    /*MM_27-01-2020 Concern popup on if prevlast and current bottom val().length are diffrent*/

                    var showLastPopupExist = $(inputCurrId).hasClass("isShowPopup");

                    if($(inputPrevLastBottomId).val() !='' && typeof($(inputPrevLastBottomId).val()) !='undefined' && $("#inputValBottomCurr").val() != "" ){
                        var inputPrevLastBottomVal = $(inputPrevLastBottomId).val();
                        var inputBottomCurrVal = $("#inputValBottomCurr").val();
                    }
                    if($(inputPrevLastBottomId).val() !='' && typeof($(inputPrevLastBottomId).val()) !='undefined' ){
                        if(showLastPopupExist == true && inputDefaultShowPopup=='true'){
                            if(inputPrevLastBottomVal !="" && typeof(inputPrevLastBottomVal) !='undefined'){
                                var inputPrevLastBottomLength = inputPrevLastBottomVal.length;
                            }
                            if(inputBottomCurrVal !="" && typeof(inputBottomCurrVal) !='undefined'){
                               var inputBottomCurrLength = inputBottomCurrVal.length;
                            }
                            var valLastLeft = checkPositiveValue(inputPrevLastBottomVal);
                            var valLastRight = checkPositiveValue(inputBottomCurrVal);

                            if(valLastLeft ==true && valLastRight ==true) {
                                if(inputBottomCurrLength != inputPrevLastBottomLength){
                                    // alert('concern 12');
                                    intBdeSearchConcernOrDeletePopUp(inputPrevLastId,inputNextId,inputBottomCurrId,rowMstID);
                                }
                            }
                        }
                    }
                    /*MM_27-01-2020 End Concern popup on if prevlast and current bottom val().length are diffrent*/
                    if($('#intBdeConcernOrDeletePopUp').length==0){
                     $("#masseneingabeSpeichernSrchMesssetelle").prop("disabled",false);
                    }
                }
            }
        });
        /*new-mm-end 01-04-2021*/
    //e.stopPropagation();
    });

   /*save icon click event for the Interne Betriebsdaten Speichern 05-10-2020*/
    $("#intBdeIMwSpeichern").click(function(){
        //var anlIMw =$("#anlIMw").val();
        var zeitintervallAnl =$("#zeitintervallAnl").val();
        var noEnding =$("#anlIMwNoEnding").is(":checked");
        var validate = validateIntBdeFrm(noEnding,zeitintervallAnl,'infosIntBetriebsdaten',1);
        if(validate==false){
            return false;
        }else{
            intBdeIMwHistorieSpeichernPopUp();
        }
    });
    /* Save icon click event for the
    *  Interne Betriebsdaten Module
    *  Podukte and Messsetelle Speichern
    *  04-03-2021
    */
    /*new-mm-start 22-03-2021*/
    $("#intBdePrdktIMwSpeichern").click(function(){
        //var anlIMw =$("#anlIMw").val();
        var zeitintervallAnlPrdkt =$("#zeitintervallAnlPrdkt").val();
        var NoEndingAnlPrdkt =$("#anlPrdktIMwNoEnding").is(":checked");
        /*var validate = validateIntBdeFrm(noEnding,zeitintervallAnl,'infosIntEnergiedaten',1);
        if(validate==false){
            return false;
        }else{
            intBdeIMwHistorieSpeichernPopUp();
        }*/
        var validatePrdk = validateIntBdePrdktFrm(NoEndingAnlPrdkt,zeitintervallAnlPrdkt,'infosIntEnergiedaten',1);
        if(validatePrdk==false){
            return false;
        }else{
            intBdePrdktIMwHistorieSpeichernPopUp();
        }

    });
    /*new-mm-end 22-03-2021*/
    $("#tabIntBetriebsdatenIMwHist").click(function(){
        intBdeIMwHistOkGetHistorie();
        $("body").removeClass('fullWidthMasseneingabe');
        $("#infosMasseneingabe").hide();
    });
    /*new-mm-start 23-03-2021*/
    $("#tabIntBetriebsdatenIMwHistPrdkt").click(function(){
        intBdeIMwHistOkGetHistoriePrdkt();
        $("body").removeClass('fullWidthMasseneingabe');
        $("#infosMasseneingabe").hide();
    });
    $("#tabIntBetriebsdatenIMwHistMesssetelle").click(function(){
        intBdeIMwHistOkGetHistorieMesssetelle();
        $("body").removeClass('fullWidthMasseneingabe');
        $("#infosMasseneingabe").hide();
    });
    /*new-mm-end 23-03-2021*/
    $("#intBdeIMwLastMst,#intBdeIMwNextMst,#intBdeIMwPreviousMst,#intBdeIMwFirstMst").click(function(){
        //alert(this.id);
            var countRecord = $("#intBdeIMwCount").val();
            var mst_id = $("#nextPrevMstID").val();
            if(this.id =="intBdeIMwNextMst"){
                intBdeIMwNextPrev(this.id,countRecord,mst_id);
            }else if(this.id =="intBdeIMwPreviousMst"){
                intBdeIMwNextPrev(this.id,countRecord,mst_id)
            }else if(this.id =="intBdeIMwLastMst"){
                intBdeIMwNextPrev(this.id,countRecord,mst_id)
            }else if(this.id =="intBdeIMwFirstMst"){
                intBdeIMwNextPrev(this.id,countRecord,mst_id)
            }

     });
    /*Int Bde On Click Image First, Next, Previous, And Last Functionality 17-03-2021*/
    /*new-mm-start*/
    $("#intBdePrdktIMwLastMst,#intBdePrdktIMwNextMst,#intBdePrdktIMwPreviousMst,#intBdePrdktIMwFirstMst").click(function(){
        //alert(this.id);
        if( $("input[name='BetriebsdatenFilter']:checked").val() == '1' )
        {
            var countPrdktRecord = $("#intBdePrdktIMwCount").val();
            var prd_id = $("#nextPrevMstIDPrdktID").val();
            if(this.id == "intBdePrdktIMwNextMst"){
                intBdePrdktIMwNextPrev(this.id,countPrdktRecord,prd_id);
            }else if(this.id =="intBdePrdktIMwPreviousMst"){
                intBdePrdktIMwNextPrev(this.id,countPrdktRecord,prd_id);
            }else if(this.id =="intBdePrdktIMwLastMst"){
                intBdePrdktIMwNextPrev(this.id,countPrdktRecord,prd_id);
            }else if(this.id =="intBdePrdktIMwFirstMst"){
                intBdePrdktIMwNextPrev(this.id,countPrdktRecord,prd_id);
            }
        }
        else if( $("input[name='BetriebsdatenFilter']:checked").val() == '2' ){

            var countPrdktRecord = $("#intBdePrdktIMwCount").val();
            var mst_id = $("#nextPrevMstIDPrdktID").val();
            if(this.id == "intBdePrdktIMwNextMst"){
                intBdeMesssetelleIMwNextPrev(this.id,countPrdktRecord,mst_id);
            }else if(this.id =="intBdePrdktIMwPreviousMst"){
                intBdeMesssetelleIMwNextPrev(this.id,countPrdktRecord,mst_id);
            }else if(this.id =="intBdePrdktIMwLastMst"){
                intBdeMesssetelleIMwNextPrev(this.id,countPrdktRecord,mst_id);
            }else if(this.id =="intBdePrdktIMwFirstMst"){
                intBdeMesssetelleIMwNextPrev(this.id,countPrdktRecord,mst_id);
            }
        }
        else{

            var countPrdktRecord = $("#intBdePrdktIMwCount").val();
            var prd_id = $("#nextPrevMstIDPrdktID").val();
            if(this.id == "intBdePrdktIMwNextMst"){
                intBdePrdktIMwNextPrev(this.id,countPrdktRecord,prd_id);
            }else if(this.id =="intBdePrdktIMwPreviousMst"){
                intBdePrdktIMwNextPrev(this.id,countPrdktRecord,prd_id);
            }else if(this.id =="intBdePrdktIMwLastMst"){
                intBdePrdktIMwNextPrev(this.id,countPrdktRecord,prd_id);
            }else if(this.id =="intBdePrdktIMwFirstMst"){
                intBdePrdktIMwNextPrev(this.id,countPrdktRecord,prd_id);
            }
        }
    });
    /*new-mm-end*/

    $("#btnTageMasseneingabeIMwNw,#btnWochenMasseneingabeIMwNw,#btnMonateMasseneingabeIMwNw,#btnJahreMasseneingabeIMwNw").click(function(){
           $(".infosMasseneingabeInside button").removeClass('active');
            $("#tblMasseneingabeDataIMw").remove();
            $("#intBdeConcernOrDeletePopUp").remove();
            if(this.id =="btnTageMasseneingabeIMwNw"){
                btnMasseneingabeIMwChange(1,'infosMasseneingabeDateRangeDiv',4);
            }else if(this.id =="btnWochenMasseneingabeIMwNw"){
                btnMasseneingabeIMwChange(2,'infosMasseneingabeDateRangeDiv',4);
            }else if(this.id =="btnMonateMasseneingabeIMwNw"){
                btnMasseneingabeIMwChange(3,'infosMasseneingabeDateRangeDiv',4);
            }else if(this.id =="btnJahreMasseneingabeIMwNw"){
                btnMasseneingabeIMwChange(4,'infosMasseneingabeDateRangeDiv',4);
            }
            datePickerForInterneBetriebsdaten('infosMasseneingabeDateRangeDiv',4);
            $(this).addClass('active');
            resetSearchFormMasseneingabe('infosMasseneingabeDateRangeDiv');

    });
    /* Used to Prdkt Show and Hide Tage/Wochen/Monte/Jhare 30-03-2021 */
    /*new-mm-start 30-03-2021*/
    $("#btnTageMasseneingabeIMwNwPrdkt,#btnWochenMasseneingabeIMwNwPrdkt,#btnMonateMasseneingabeIMwNwPrdkt,#btnJahreMasseneingabeIMwNwPrdkt").click(function(){
           $(".infosMasseneingabeInside button").removeClass('active');
            $("#tblMasseneingabeDataIMw").remove();
            $("#intBdeConcernOrDeletePopUp").remove();
            if(this.id =="btnTageMasseneingabeIMwNwPrdkt"){
                btnMasseneingabeIMwChangePrdkt(1,'infosMasseneingabeDateRangeDivPrdkt',6);

            }else if(this.id =="btnWochenMasseneingabeIMwNwPrdkt"){
                btnMasseneingabeIMwChangePrdkt(2,'infosMasseneingabeDateRangeDivPrdkt',6);
            }else if(this.id =="btnMonateMasseneingabeIMwNwPrdkt"){
                btnMasseneingabeIMwChangePrdkt(3,'infosMasseneingabeDateRangeDivPrdkt',6);
            }else if(this.id =="btnJahreMasseneingabeIMwNwPrdkt"){
                btnMasseneingabeIMwChangePrdkt(4,'infosMasseneingabeDateRangeDivPrdkt',6);
            }
            datePickerForInterneBetriebsdatenAnlPrdkt('infosMasseneingabeDateRangeDivPrdkt',6);
            $(this).addClass('active');
            resetSearchFormMasseneingabePrdkt('infosMasseneingabeDateRangeDivPrdkt');

    });
    /*new-mm-end 30-03-2021*/

    /*new-mm-start 31-03-2021*/
    $("#btnTageMasseneingabeIMwNwMesssetelle,#btnWochenMasseneingabeIMwNwMesssetelle,#btnMonateMasseneingabeIMwNwMesssetelle,#btnJahreMasseneingabeIMwNwMesssetelle").click(function(){
            $(".infosMasseneingabeInside button").removeClass('active');
            $("#tblMasseneingabeDataIMw").remove();
            $("#intBdeConcernOrDeletePopUp").remove();
            if(this.id =="btnTageMasseneingabeIMwNwMesssetelle"){
                btnMasseneingabeIMwChange(1,'infosMasseneingabeDateRangeDivMesssetelle',5);
            }else if(this.id =="btnWochenMasseneingabeIMwNwMesssetelle"){
                btnMasseneingabeIMwChange(2,'infosMasseneingabeDateRangeDivMesssetelle',5);
            }else if(this.id =="btnMonateMasseneingabeIMwNwMesssetelle"){
                btnMasseneingabeIMwChange(3,'infosMasseneingabeDateRangeDivMesssetelle',5);
            }else if(this.id =="btnJahreMasseneingabeIMwNwMesssetelle"){
                btnMasseneingabeIMwChange(4,'infosMasseneingabeDateRangeDivMesssetelle',5);
            }
            datePickerForInterneBetriebsdaten('infosMasseneingabeDateRangeDivMesssetelle',5);
            $(this).addClass('active');
            resetSearchFormMasseneingabe('infosMasseneingabeDateRangeDivMesssetelle');

    });
    /*new-mm-end 31-03-2021*/

    $("#btnMasseneingabeIMwSearch").click(function(){
        $("#inputBotmMax").val('');
        $("#inputBotmMin").val('');
        var zeitintervallAnl = $(".infosMasseneingabeInside button.active").attr('data-id');
        var dates = returnStartDateAndEndDate(zeitintervallAnl,'infosMasseneingabeDateRangeDiv',4);
        var sDate =dates[0];
        var eDate =dates[1];
        resetInputsSearchMasseneingabe();
        if(zeitintervallAnl == 2 && sDate != '' && eDate != ''){
            var from = sDate.split("-");
            var g = from[0]; //first week selected value
            var startDate = startDateV = from[1]; //first year input text value

            var to = eDate.split("-");
            var s =  to[0]; //second week selected value
            var endDate = endDateV = to[1]; //second year input text value
            var startDate = dates[0];
            var endDate =dates[1];
        }else{
            var startDate = startDateV = dates[0];
            var endDate = endDateV = dates[1];
        }
        var validateNull= validateNullValZeitintervallAnlSelectOpt(sDate,eDate,zeitintervallAnl,'infosMasseneingabeDateRangeDiv',4);
        var validateSel = validateZeitintervallAnlSelectOpt(startDate,endDate,zeitintervallAnl,'infosMasseneingabeDateRangeDiv',4);
        if(validateNull==false){
            return false;
        }else if(validateSel==false){
            return false;
        }else{
            getDataMasseneingabeIMwSearch(zeitintervallAnl,startDate,endDate);
        }
    });
    /*new-mm-start 31-03-2021*/
    $("#btnMasseneingabeIMwSearchPrdkt").click(function(){
        $("#inputBotmMax").val('');
        $("#inputBotmMin").val('');
        var zeitintervallAnl = $(".infosMasseneingabeInside button.active").attr('data-id');
        var dates = returnStartDateAndEndDatePrdkt(zeitintervallAnl,'infosMasseneingabeDateRangeDivPrdkt',6);
        var sDate =dates[0];
        var eDate =dates[1];
        resetInputsSearchMasseneingabe();
        if(zeitintervallAnl == 2 && sDate != '' && eDate != ''){
            var from = sDate.split("-");
            var g = from[0]; //first week selected value
            var startDate = startDateV = from[1]; //first year input text value

            var to = eDate.split("-");
            var s =  to[0]; //second week selected value
            var endDate = endDateV = to[1]; //second year input text value
            var startDate = dates[0];
            var endDate =dates[1];
        }else{
            var startDate = startDateV = dates[0];
            var endDate = endDateV = dates[1];
        }
        var validateNull= validateNullValZeitintervallAnlPrdktSelectOpt(sDate,eDate,zeitintervallAnl,'infosMasseneingabeDateRangeDivPrdkt',6);
        var validateSel = validateZeitintervallAnlPrdktSelectOpt(startDate,endDate,zeitintervallAnl,'infosMasseneingabeDateRangeDivPrdkt',6);
        if(validateNull==false){
            return false;
        }else if(validateSel==false){
            return false;
        }else{
            getDataMasseneingabeIMwSearchPrdkt(zeitintervallAnl,startDate,endDate);
        }
    });
    /*new-mm-end 31-03-2021*/

    /*new-mm-start 31-03-2021*/
    $("#btnMasseneingabeIMwSearchMesssetelle").click(function(){
        $("#inputBotmMax").val('');
        $("#inputBotmMin").val('');
        var zeitintervallAnl = $(".infosMasseneingabeInside button.active").attr('data-id');
        var dates = returnStartDateAndEndDate(zeitintervallAnl,'infosMasseneingabeDateRangeDivMesssetelle',5);
        var sDate =dates[0];
        var eDate =dates[1];


        resetInputsSearchMasseneingabe();
        if(zeitintervallAnl == 2 && sDate != '' && eDate != ''){
            var from = sDate.split("-");
            var g = from[0]; //first week selected value
            var startDate = startDateV = from[1]; //first year input text value

            var to = eDate.split("-");
            var s =  to[0]; //second week selected value
            var endDate = endDateV = to[1]; //second year input text value
            var startDate = dates[0];
            var endDate =dates[1];
        }

        else{
            var startDate = startDateV = dates[0];
            var endDate = endDateV = dates[1];
        }
        var validateNull= validateNullValZeitintervallAnlSelectOpt(sDate,eDate,zeitintervallAnl,'infosMasseneingabeDateRangeDivMesssetelle',5);

        var validateSel = validateZeitintervallAnlSelectOpt(startDate,endDate,zeitintervallAnl,'infosMasseneingabeDateRangeDivMesssetelle',5);


        if(validateNull==false){
            return false;
        }else if(validateSel==false){
            return false;
        }else{
            getDataMasseneingabeIMwSearchMesssetelle(zeitintervallAnl,startDate,endDate);
        }
    });
    /*new-mm-end 31-03-2021*/

    /*mm-comment 30-03-2021*/
    /*$("#btnMassEingAnl").click(function() {
        $("body").addClass('fullWidthMasseneingabe');
        datePickerForInterneBetriebsdaten('infosMasseneingabeDateRangeDiv',4);
         $("#tblMasseneingabeDataIMw").remove();
         //interneEBTblShowHide(1);
    });*/
    /*mm-comment 30-03-2021*/
    /*mm-comment 30-03-2021*/
    /*$("#btnKonfigMstAnl").click(function() {
        $("body").removeClass('fullWidthMasseneingabe');
        $("#tblMasseneingabeDataIMw").remove();
        //interneEBTblShowHide(1);
    });*/
     /*mm-comment 30-03-2021*/

    $("#masseneingabeSpeichernSrch").click(function() {
        var inputCurrId = $("#inputCurrId").val();
        var showPopupExist = $(inputCurrId).hasClass("isShowPopup");
        //console.log($("#timeIntervalWerteEnergiedatenIMw").html());
        /*new-mm-start*/
        if($("#tblMasseneingabeDataIMw").length !=0){
                //if(showPopupExist==false){
                    $(".save-msg-box").show();
                    $("#masseneingabeSrchImg").show();
                    setTimeout(function(){
                        //if($("#intBdeConcernOrDeletePopUp").length ==0){
                            var key = $(".infosMasseneingabeInside button.active").attr('data-id');
                            saveToDBMasseneingabeEingaben(key);
                        // }
                    }, 300);
                //}
        }else{
            alert("Please generate inputs first.");
        }
        /*old-comment-start*/
        /*  if (confirm("Do you want to save？")) {
            if($("#tblMasseneingabeDataIMw").length !=0){
                //if(showPopupExist==false){
                    $("#masseneingabeSrchImg").show();
                    setTimeout(function(){
                      var key = $(".infosMasseneingabeInside button.active").attr('data-id');
                      saveToDBMasseneingabeEingaben(key);
                    }, 300);
                //}
            }else{
                alert("Please generate inputs first.");
            }
           return true;
         }else{
           return false;
       }*/
    });
    /*new-mm-start 31-03-2021*/
    $("#masseneingabeSpeichernSrchPrdkt").click(function() {
        var inputCurrId = $("#inputCurrId").val();
        var showPopupExist = $(inputCurrId).hasClass("isShowPopup");
        //console.log($("#timeIntervalWerteEnergiedatenIMw").html());
        if($("#tblMasseneingabeDataIMw").length !=0){
                //if(showPopupExist==false){
                    $(".save-msg-box").show();
                    $("#masseneingabeSrchImg").show();
                    setTimeout(function(){
                        //if($("#intBdeConcernOrDeletePopUp").length ==0){
                            var key = $(".infosMasseneingabeInside button.active").attr('data-id');
                             saveToDBMasseneingabePrdkt(key);
                        // }
                    }, 300);
                //}
        }else{
            alert("Please generate inputs first.");
        }

    });
    /*new-mm-end 31-03-2021*/
    /*new-mm-start 31-03-2021*/
    $("#masseneingabeSpeichernSrchMesssetelle").click(function() {
        var inputCurrId = $("#inputCurrId").val();
        var showPopupExist = $(inputCurrId).hasClass("isShowPopup");
        //console.log($("#timeIntervalWerteEnergiedatenIMw").html());
        if($("#tblMasseneingabeDataIMw").length !=0){
                //if(showPopupExist==false){
                    $(".save-msg-box").show();
                    $("#masseneingabeSrchImg").show();
                    setTimeout(function(){
                        //if($("#intBdeConcernOrDeletePopUp").length ==0){
                            var key = $(".infosMasseneingabeInside button.active").attr('data-id');
                             saveToDBMasseneingabeEingaben(key);
                        // }
                    }, 300);
                //}
        }else{
            alert("Please generate inputs first.");
        }
    });
    /*new-mm-end 31-03-2021*/

    /*On change Einheit create Control System select option */
    $(".infosIntBetriebsdaten #einheitAnl,.infosIntBetriebsdaten #control_system").change(function() {
        //var einheitVal  = this.value;
        var type = $(".infosIntBetriebsdaten #zeitintervallAnl").val();
        if(type==1){
            var startDate = $(".infosIntBetriebsdaten #tageMassEingDataAnlStart1").val();
            var endDate = $( ".infosIntBetriebsdaten #tageMassEingDataAnlEnde1" ).val();
        }
        if(type==2){
            var startWeek = $(".infosIntBetriebsdaten #wochenWMassEingDataAnlStart1").val();
            var startYear = $(".infosIntBetriebsdaten #wochenYMassEingDataAnlStart1").val();
            var endWeek = $(".infosIntBetriebsdaten #wochenWMassEingDataAnlEnde1").val();
            var endYear = $( ".infosIntBetriebsdaten #wochenYMassEingDataAnlEnde1" ).val();
            if((startWeek !='' && startYear !='') && (typeof(startWeek) !='undefined' && typeof(startYear) !='undefined')){
                var startDate = startWeek+'-'+startYear;
            }
            if((endWeek !='' && endYear !='') && (typeof(endWeek) !='undefined' && typeof(endYear) !='undefined')){
                var endDate = endWeek+'-'+endYear;
            }
        }
        if(type==3){
            var startDate = $(".infosIntBetriebsdaten #monateMassEingDataAnlStart1").val();
            var endDate = $( ".infosIntBetriebsdaten #monateMassEingDataAnlEnde1" ).val();
        }
        if(type==4){
            var startDate = $(".infosIntBetriebsdaten #jahrMassEingDataAnlStart1").val();
            var endDate = $( ".infosIntBetriebsdaten #jahrMassEingDataAnlEnde1" ).val();
        }
        if(this.id=='einheitAnl'){
            einheitAnlOnChangeChildSelectOpt(this.value);
            alertValidationforEinheitControlSystem(this.id,this.value,startDate,endDate,type);
        }
        if(this.id=='control_system'){
            alertValidationforEinheitControlSystem(this.id,this.value,startDate,endDate,type);
        }
    });
    /*On change Einheit create Control System select option */

    /*On change Einheit create Control System select option  History tab Popup 12-03-2021*/
    /*new-mm-start*/
    $(".intBdeIMwHistorieContainer #einheitAnl,.intBdeIMwHistorieContainer #control_system").change(function() {
        //var einheitVal  = this.value;
        var type = $(".intBdeIMwHistorieContainer #zeitintervallAnl").val();
        if(type==1){
            var startDate = $(".intBdeIMwHistorieContainer #tageMassEingDataAnlStart1").val();
            var endDate = $( ".intBdeIMwHistorieContainer #tageMassEingDataAnlEnde1" ).val();
        }
        if(type==2){
            var startWeek = $(".intBdeIMwHistorieContainer #wochenWMassEingDataAnlStart1").val();
            var startYear = $(".intBdeIMwHistorieContainer #wochenYMassEingDataAnlStart1").val();
            var endWeek = $(".intBdeIMwHistorieContainer #wochenWMassEingDataAnlEnde1").val();
            var endYear = $( ".intBdeIMwHistorieContainer #wochenYMassEingDataAnlEnde1" ).val();
            if((startWeek !='' && startYear !='') && (typeof(startWeek) !='undefined' && typeof(startYear) !='undefined')){
                var startDate = startWeek+'-'+startYear;
            }
            if((endWeek !='' && endYear !='') && (typeof(endWeek) !='undefined' && typeof(endYear) !='undefined')){
                var endDate = endWeek+'-'+endYear;
            }
        }
        if(type==3){
            var startDate = $(".intBdeIMwHistorieContainer #monateMassEingDataAnlStart1").val();
            var endDate = $( ".intBdeIMwHistorieContainer #monateMassEingDataAnlEnde1" ).val();
        }
        if(type==4){
            var startDate = $(".intBdeIMwHistorieContainer #jahrMassEingDataAnlStart1").val();
            var endDate = $( ".intBdeIMwHistorieContainer #jahrMassEingDataAnlEnde1" ).val();
        }
        if(this.id=='einheitAnl'){
            einheitAnlHistOnChangeChildSelectOpt(this.value);
           // alertValidationforEinheitControlSystem(this.id,this.value,startDate,endDate,type);
        }
        if(this.id=='control_system'){
           // alertValidationforEinheitControlSystem(this.id,this.value,startDate,endDate,type);
        }
    });
    /*new-mm-end*/
    /*On change Einheit create Control System select option */



    /*For Produkte Module 08-03-2021*/
    /*On change Einheit Prdkt create Control System Prdkt select option */
    /*new-mm-start*/
    $(".infosIntEnergiedaten #einheitAnlPrdkt,.infosIntEnergiedaten #control_system_AnlPrdkt").change(function() {
        //var einheitVal  = this.value;
        var type = $(".infosIntEnergiedaten #zeitintervallAnlPrdkt").val();
        if(type==1){
            var startDate = $(".infosIntEnergiedaten #tageMassEingDataAnlPrdktStart1").val();
            var endDate = $( ".infosIntEnergiedaten #tageMassEingDataAnlPrdktEnde1" ).val();
        }
        if(type==2){
            var startWeek = $(".infosIntEnergiedaten #wochenWMassEingDataAnlPrdktStart1").val();
            var startYear = $(".infosIntEnergiedaten #wochenYMassEingDataAnlPrdktStart1").val();
            var endWeek = $(".infosIntEnergiedaten #wochenWMassEingDataAnlPrdktEnde1").val();
            var endYear = $( ".infosIntEnergiedaten #wochenYMassEingDataAnlPrdktEnde1" ).val();
            if((startWeek !='' && startYear !='') && (typeof(startWeek) !='undefined' && typeof(startYear) !='undefined')){
                var startDate = startWeek+'-'+startYear;
            }
            if((endWeek !='' && endYear !='') && (typeof(endWeek) !='undefined' && typeof(endYear) !='undefined')){
                var endDate = endWeek+'-'+endYear;
            }
        }
        if(type==3){
            var startDate = $(".infosIntEnergiedaten #monateMassEingDataAnlPrdktStart1").val();
            var endDate = $( ".infosIntEnergiedaten #monateMassEingDataAnlPrdktEnde1" ).val();
        }
        if(type==4){
            var startDate = $(".infosIntEnergiedaten #jahrMassEingDataAnlPrdktStart1").val();
            var endDate = $( ".infosIntEnergiedaten #jahrMassEingDataAnlPrdktEnde1" ).val();
        }
        if(this.id=='einheitAnlPrdkt'){

            einheitAnlPrdktMstHistOnChangeChildSelectOpt(this.value,'infosIntEnergiedaten');
           // alertValidationforEinheitControlSystemPrdkt(this.id,this.value,startDate,endDate,type);
        }
        if(this.id=='control_system_AnlPrdkt'){
           // alertValidationforEinheitControlSystemPrdkt(this.id,this.value,startDate,endDate,type);
        }
    });
    /*new-mm-end*/


   /*For IntBde Produkte History Module 12-03-2021*/
   /*On change Einheit Prdkt create Control System Prdkt select option */
   /*new-mm-start*/
   $(".intBdePrdktIMwHistorieContainer #einheitAnlPrdkt,.intBdePrdktIMwHistorieContainer #control_system_AnlPrdkt").change(function() {
        //var einheitVal  = this.value;
        var type = $(".intBdePrdktIMwHistorieContainer #zeitintervallAnlPrdkt").val();
        if(type==1){
            var startDate = $(".intBdePrdktIMwHistorieContainer #tageMassEingDataAnlPrdktStart2").val();
            var endDate = $( ".intBdePrdktIMwHistorieContainer #tageMassEingDataAnlPrdktEnde2" ).val();
        }
        if(type==2){
            var startWeek = $(".intBdePrdktIMwHistorieContainer #wochenWMassEingDataAnlPrdktStart2").val();
            var startYear = $(".intBdePrdktIMwHistorieContainer #wochenYMassEingDataAnlPrdktStart2").val();
            var endWeek = $(".intBdePrdktIMwHistorieContainer #wochenWMassEingDataAnlPrdktEnde2").val();
            var endYear = $( ".intBdePrdktIMwHistorieContainer #wochenYMassEingDataAnlPrdktEnde2" ).val();
            if((startWeek !='' && startYear !='') && (typeof(startWeek) !='undefined' && typeof(startYear) !='undefined')){
                var startDate = startWeek+'-'+startYear;
            }
            if((endWeek !='' && endYear !='') && (typeof(endWeek) !='undefined' && typeof(endYear) !='undefined')){
                var endDate = endWeek+'-'+endYear;
            }
        }
        if(type==3){
            var startDate = $(".intBdePrdktIMwHistorieContainer #monateMassEingDataAnlPrdktStart2").val();
            var endDate = $( ".intBdePrdktIMwHistorieContainer #monateMassEingDataAnlPrdktEnde2" ).val();
        }
        if(type==4){
            var startDate = $(".intBdePrdktIMwHistorieContainer #jahrMassEingDataAnlPrdktStart2").val();
            var endDate = $( ".intBdePrdktIMwHistorieContainer #jahrMassEingDataAnlPrdktEnde2" ).val();
        }
        if(this.id=='einheitAnlPrdkt'){

            einheitAnlPrdktMstHistOnChangeChildSelectOpt(this.value,'intBdePrdktIMwHistorieContainer');
           // alertValidationforEinheitControlSystemPrdkt(this.id,this.value,startDate,endDate,type);
        }
        if(this.id=='control_system_AnlPrdkt'){
           // alertValidationforEinheitControlSystemPrdkt(this.id,this.value,startDate,endDate,type);
        }
   });
   /*new-mm-end*/
      /*For IntBde MesssetelleintBdePrdktIMwHistorieContainer History Module 12-03-2021*/
   /*On change Einheit Prdkt create Control System Prdkt select option */
   /*new-mm-start*/
   $(".intBdeMesssetelleIMwHistorieContainer #einheitAnlPrdkt,.intBdeMesssetelleIMwHistorieContainer #control_system_AnlPrdkt").change(function() {
        //var einheitVal  = this.value;
        var type = $(".intBdeMesssetelleIMwHistorieContainer #zeitintervallAnlPrdkt").val();
        if(type==1){
            var startDate = $(".intBdeMesssetelleIMwHistorieContainer #tageMassEingDataAnlPrdktStart2").val();
            var endDate = $( ".intBdeMesssetelleIMwHistorieContainer #tageMassEingDataAnlPrdktEnde2" ).val();
        }
        if(type==2){
            var startWeek = $(".intBdeMesssetelleIMwHistorieContainer #wochenWMassEingDataAnlPrdktStart2").val();
            var startYear = $(".intBdeMesssetelleIMwHistorieContainer #wochenYMassEingDataAnlPrdktStart2").val();
            var endWeek = $(".intBdeMesssetelleIMwHistorieContainer #wochenWMassEingDataAnlPrdktEnde2").val();
            var endYear = $( ".intBdeMesssetelleIMwHistorieContainer #wochenYMassEingDataAnlPrdktEnde2" ).val();
            if((startWeek !='' && startYear !='') && (typeof(startWeek) !='undefined' && typeof(startYear) !='undefined')){
                var startDate = startWeek+'-'+startYear;
            }
            if((endWeek !='' && endYear !='') && (typeof(endWeek) !='undefined' && typeof(endYear) !='undefined')){
                var endDate = endWeek+'-'+endYear;
            }
        }
        if(type==3){
            var startDate = $(".intBdeMesssetelleIMwHistorieContainer #monateMassEingDataAnlPrdktStart2").val();
            var endDate = $( ".intBdeMesssetelleIMwHistorieContainer #monateMassEingDataAnlPrdktEnde2" ).val();
        }
        if(type==4){
            var startDate = $(".intBdeMesssetelleIMwHistorieContainer #jahrMassEingDataAnlPrdktStart2").val();
            var endDate = $( ".intBdeMesssetelleIMwHistorieContainer #jahrMassEingDataAnlPrdktEnde2" ).val();
        }
        if(this.id=='einheitAnlPrdkt'){

            einheitAnlPrdktMstHistOnChangeChildSelectOpt(this.value,'intBdeMesssetelleIMwHistorieContainer');
           // alertValidationforEinheitControlSystemPrdkt(this.id,this.value,startDate,endDate,type);
        }
        if(this.id=='control_system_AnlPrdkt'){
           // alertValidationforEinheitControlSystemPrdkt(this.id,this.value,startDate,endDate,type);
        }
   });
   /*new-mm-end*/


  $('body').on('focusin','#tblMasseneingabeDataIMwTbl .txtBoxSrch',function () {
    if (!$(this).closest('tr').hasClass('rowFocus')) {
        $('#tblMasseneingabeDataIMwTbl tr').removeClass('rowFocus');
        $(this).closest('tr').addClass('rowFocus');
         var rowMstID = $(this).closest('td').attr('data-id');
        $('#inputBotmMin').val(''); $('#inputBotmMax').val('');

        }
    });

  /*range check alert validation on form for week*/
    $(".infosIntBetriebsdaten #wochenWMassEingDataAnlStart1,.infosIntBetriebsdaten #wochenWMassEingDataAnlEnde1").change(function() {
        var zeitintervallAnl = $(".infosIntBetriebsdaten #zeitintervallAnl").val();
        if(this.id=='wochenWMassEingDataAnlStart1'){
            var week= $(this).val();
            var year= $("#wochenYMassEingDataAnlStart1").val();
        }
        if(this.id=='wochenWMassEingDataAnlEnde1'){
            var week= $(this).val();
            var year= $("#wochenYMassEingDataAnlEnde1").val();
        }
        if((week !='' && year !='') && (typeof(week) !='undefined' && typeof(year) !='undefined')){
            var date = week+'-'+year;
            alertValidationforStartEndeDate($("#mstID").val(),date,zeitintervallAnl);
        }
    });


/*Datatable CheckBox Query*/
/*new-mm-start*/
$('#searchBtnShowRecordsAnlBtn').on('change', function () {
    var checkboxSearch = $(this).val();
    searchKeinZeitIntervallZugewiesen(checkboxSearch);
});
$('#searchImgBtnShowRecordsAnlBtn').on('change', function () {
    var checkboxSearch = $(this).val();
    searchImgKeinZeitIntervallZugewiesen(checkboxSearch);
});
/*new-mm-end*/
/*Produkte Int BDE mm 03-03-2021*/
/*new-mm-start*/
/*On Select Change Produkte and messettlen DataTable show and Hide*/
$('#searchBtnShowRecordsPrdktAnlMstBtn').on('change', function () {
    var checkboxSearch = $(this).val();
    if(checkboxSearch == 1){
       $("#tblMstOhneZeitintervallIMw_wrapper").show();
       $("#tblMstOhneZeitintervallIMwMessstelle_wrapper").hide();
        produkteAnlargeDataTable();

    }
    else if(checkboxSearch == 2){
        $("#tblMstOhneZeitintervallIMw_wrapper").hide();
        $("#tblMstOhneZeitintervallIMwMessstelle_wrapper").show();
        searchProdukteAnlageIntBDE(checkboxSearch);

    }
});


/*On Radio Check Produkte and messettlen DataTable show and Hide 03-03-2021*/
/*new-start-mm*/
$('input:radio[name=BetriebsdatenFilter]').change(function () {
            if ($("input[name='BetriebsdatenFilter']:checked").val() == '1') {

                $("#tblMstOhneZeitintervallIMw_wrapper").show();
                $("#tblMstOhneZeitintervallIMwMessstelle_wrapper").hide();

                //$("#mstIMw").prop("disabled",false);
               
                //<***14-6-2021---
                //$("#mstIMw").val("").prop("readonly",false); //Old code comment
                $("#mstIMw").val("").prop("readonly",true);
                //end--->

                $("#mstIMw").prop("disabled",false);

                $(".artikelnummerIntBdeDiv").show();
                $(".bezeichnungIntBdeDiv").show();
                $(".anlageIntBdeDiv").show();
                $(".anlageMessstelleIntBdeDiv").hide();

                $("#artikelnummerIntBde").val("").prop("disabled",false);
                $("#bezeichnungIntBde").val("").prop("disabled",false);
                $("#anlageIntBde").val("").prop("disabled",false);
                $("#anlageMessstelleIntBde").val("").prop("disabled",false);

                $("#zeitintervallAnlPrdkt").val("0").change();
                $("#einheitAnlPrdkt").val("").change();
                $("#notizBdeIMwAnlPrdkt").val("");
                $("#control_system_AnlPrdkt").val("").change();

                $("#tageMassEingDataAnlPrdktStart1").val("");
                $("#tageMassEingDataAnlPrdktEnde1").val("");
                $("#anlPrdktIMwNoEnding").val("0").prop("checked",false);

                $("#wochenWMassEingDataAnlPrdktStart1").val("").change();
                $("#wochenYMassEingDataAnlPrdktStart1").val("");
                $("#wochenWMassEingDataAnlPrdktEnde1").val("").change();
                $("#wochenYMassEingDataAnlPrdktEnde1").val("");

                $("#monateMassEingDataAnlPrdktStart1").val("");
                $("#monateMassEingDataAnlPrdktEnde1").val("");

                $("#jahrMassEingDataAnlPrdktStart1").val("");
                $("#jahrMassEingDataAnlPrdktEnde1").val("");

                /*save img*/
                //  $("#intBdeMessetelleIMwSpeichern").hide();
                //  $("#intBdePrdktIMwSpeichern").show();
                $("mstID").val("");

                /*new-mm-start 10-03-2021*/
                $("#tabIntBetriebsdatenIMwHistPrdkt").show();
                $("#tabIntBetriebsdatenIMwHistMesssetelle").hide();
                /*new-mm-start 10-03-2021*/

                /*new-mm-start 30-03-2021*/
                $("#btnMassEingPrdkt").show();
                $("#btnMassEingMesssetelle").hide();
                /*new-mm-start 30-03-2021*/

                produkteAnlargeDataTable();
            }
            if ($("input[name='BetriebsdatenFilter']:checked").val() == '2') {
                $("#tblMstOhneZeitintervallIMw_wrapper").hide();
                $("#tblMstOhneZeitintervallIMwMessstelle_wrapper").show();

                if($("#mstIMw").val() == ""){
                    //<--14-6-2021--
                    // $("#mstIMw").val("").prop("readonly",false); //Old code comment
                    $("#mstIMw").val("").prop("readonly",true);
                    //end-->
                }
                else{
                    $("#mstIMw").val("").prop("readonly",true);
                }

                $(".bezeichnungIntBdeDiv").hide();
                $(".artikelnummerIntBdeDiv").hide();
                $(".anlageIntBdeDiv").hide();
                $(".anlageMessstelleIntBdeDiv").show();
                //$("#anlageMessstelleIntBde").prop("disabled",true);

                $("#artikelnummerIntBde").val("").prop("disabled",false);
                $("#bezeichnungIntBde").val("").prop("disabled",false);
                $("#anlageIntBde").val("").prop("disabled",false);
                $("#anlageMessstelleIntBde").val("").prop("disabled",false);

                $("#zeitintervallAnlPrdkt").val("0").change();
                $("#einheitAnlPrdkt").val("").change();
                $("#notizBdeIMwAnlPrdkt").val("");
                $("#control_system_AnlPrdkt").val("").change();

                $("#tageMassEingDataAnlPrdktStart1").val("");
                $("#tageMassEingDataAnlPrdktEnde1").val("");
                $("#anlPrdktIMwNoEnding").val("0").prop("checked",false);

                $("#wochenWMassEingDataAnlPrdktStart1").val("").change();
                $("#wochenYMassEingDataAnlPrdktStart1").val("");
                $("#wochenWMassEingDataAnlPrdktEnde1").val("").change();
                $("#wochenYMassEingDataAnlPrdktEnde1").val("");

                $("#monateMassEingDataAnlPrdktStart1").val("");
                $("#monateMassEingDataAnlPrdktEnde1").val("");

                $("#jahrMassEingDataAnlPrdktStart1").val("");
                $("#jahrMassEingDataAnlPrdktEnde1").val("");


                /*save img*/
                // $("#intBdePrdktIMwSpeichern").hide();
                // $("#intBdeMessetelleIMwSpeichern").show();

                $("#prd_ID").val("");
                $("#anl_Col").val("");
                $("#anl_ID").val("");
                /*new-mm-start 10-03-2021*/
                $("#tabIntBetriebsdatenIMwHistPrdkt").hide();
                $("#tabIntBetriebsdatenIMwHistMesssetelle").show();
                /*new-mm-start 10-03-2021*/

                /*new-mm-start 30-03-2021*/
                $("#btnMassEingMesssetelle").show();
                $("#btnMassEingPrdkt").hide();
                /*new-mm-start 30-03-2021*/

                searchProdukteAnlageIntBDE("2");
            }
});
/*new-mm-end*/
/*On Radio Check Produkte and messettlen DataTable show and Hide 03-03-2021*/
/*new-start-mm*/
$('input:radio[name=searchImgBetriebsdatenFilter]').change(function () {
            if ($("input[name='searchImgBetriebsdatenFilter']:checked").val() == '1') {

                /*new-mm-start 26-03-2021*/
                $("input[name='BetriebsdatenFilter'][value=1]").prop('checked',true);
                /*new-mm-start 26-03-2021*/
                $("#tblMstOhneZeitintervallIMwPrdktSuche_wrapper").show();
                $("#tblMstOhneZeitintervallIMwMessstelleSuche_wrapper").hide();

                //$("#mstIMw").prop("disabled",false);
                $("#mstIMw").val("").prop("readonly",false);
                $("#mstIMw").prop("disabled",false);

                $(".artikelnummerIntBdeDiv").show();
                $(".bezeichnungIntBdeDiv").show();
                $(".anlageIntBdeDiv").show();
                $(".anlageMessstelleIntBdeDiv").hide();

                $("#artikelnummerIntBde").val("").prop("disabled",false);
                $("#bezeichnungIntBde").val("").prop("disabled",false);
                $("#anlageIntBde").val("").prop("disabled",false);
                $("#anlageMessstelleIntBde").val("").prop("disabled",false);

                $("#zeitintervallAnlPrdkt").val("0").change();
                $("#einheitAnlPrdkt").val("").change();
                $("#notizBdeIMwAnlPrdkt").val("");
                $("#control_system_AnlPrdkt").val("").change();

                $("#tageMassEingDataAnlPrdktStart1").val("");
                $("#tageMassEingDataAnlPrdktEnde1").val("");
                $("#anlPrdktIMwNoEnding").val("0").prop("checked",false);

                $("#wochenWMassEingDataAnlPrdktStart1").val("").change();
                $("#wochenYMassEingDataAnlPrdktStart1").val("");
                $("#wochenWMassEingDataAnlPrdktEnde1").val("").change();
                $("#wochenYMassEingDataAnlPrdktEnde1").val("");

                $("#monateMassEingDataAnlPrdktStart1").val("");
                $("#monateMassEingDataAnlPrdktEnde1").val("");

                $("#jahrMassEingDataAnlPrdktStart1").val("");
                $("#jahrMassEingDataAnlPrdktEnde1").val("");

                /*save img*/
                //  $("#intBdeMessetelleIMwSpeichern").hide();
                //  $("#intBdePrdktIMwSpeichern").show();
                $("mstID").val("");
                /*new-mm-start 25-03-2021*/
                $("#nextPrevMstIDPrdktID").val("");
                /*new-mm-end 25-03-2021*/
                /*new-mm-start 10-03-2021*/
                $("#tabIntBetriebsdatenIMwHistPrdkt").show();
                $("#tabIntBetriebsdatenIMwHistMesssetelle").hide();
                /*new-mm-start 10-03-2021*/

                searchImgprodukteAnlargeDataTable();
            }
            if ($("input[name='searchImgBetriebsdatenFilter']:checked").val() == '2') {

                /*new-mm-start 26-03-2021*/
                $("input[name='BetriebsdatenFilter'][value=2]").prop('checked',true);
                /*new-mm-start 26-03-2021*/

                $("#tblMstOhneZeitintervallIMwPrdktSuche_wrapper").hide();
                $("#tblMstOhneZeitintervallIMwMessstelleSuche_wrapper").show();

                $("#mstIMw").val("").prop("readonly",true);

                $(".bezeichnungIntBdeDiv").hide();
                $(".artikelnummerIntBdeDiv").hide();
                $(".anlageIntBdeDiv").hide();
                $(".anlageMessstelleIntBdeDiv").show();
                //$("#anlageMessstelleIntBde").prop("disabled",true);

                $("#artikelnummerIntBde").val("").prop("disabled",false);
                $("#bezeichnungIntBde").val("").prop("disabled",false);
                $("#anlageIntBde").val("").prop("disabled",false);
                $("#anlageMessstelleIntBde").val("").prop("disabled",false);

                $("#zeitintervallAnlPrdkt").val("0").change();
                $("#einheitAnlPrdkt").val("").change();
                $("#notizBdeIMwAnlPrdkt").val("");
                $("#control_system_AnlPrdkt").val("").change();

                $("#tageMassEingDataAnlPrdktStart1").val("");
                $("#tageMassEingDataAnlPrdktEnde1").val("");
                $("#anlPrdktIMwNoEnding").val("0").prop("checked",false);

                $("#wochenWMassEingDataAnlPrdktStart1").val("").change();
                $("#wochenYMassEingDataAnlPrdktStart1").val("");
                $("#wochenWMassEingDataAnlPrdktEnde1").val("").change();
                $("#wochenYMassEingDataAnlPrdktEnde1").val("");

                $("#monateMassEingDataAnlPrdktStart1").val("");
                $("#monateMassEingDataAnlPrdktEnde1").val("");

                $("#jahrMassEingDataAnlPrdktStart1").val("");
                $("#jahrMassEingDataAnlPrdktEnde1").val("");


                /*save img*/
                // $("#intBdePrdktIMwSpeichern").hide();
                // $("#intBdeMessetelleIMwSpeichern").show();

                $("#prd_ID").val("");
                $("#anl_Col").val("");
                $("#anl_ID").val("");
                /*new-mm-start 25-03-2021*/
                $("#nextPrevMstIDPrdktID").val("");
                /*new-mm-end 25-03-2021*/
                /*new-mm-start 10-03-2021*/
                $("#tabIntBetriebsdatenIMwHistPrdkt").hide();
                $("#tabIntBetriebsdatenIMwHistMesssetelle").show();
                /*new-mm-start 10-03-2021*/
                searchImgMesssetelleIntBDE("2");
            }
});
/*new-mm-end*/
/*new-mm-end*/
/*19-02-2021 radio button check */
/*$("#interneEBTblDiv input[name='interneEBTbl']").on('change', function () {
    interneEBTblShowHide(this.value);
});*/

/*statische Korrekturfaktoren 26-02-2021*/
/* new-mm-start */
$('#optionWert').on('blur', function () {
    var optionWert = $(this).val();
    if(optionWert == 0 || optionWert == null){
        alert("Wert sollte nicht Null sein");
        $('#optionWert').val("");
    }
    /*else if(optionWert < 0 || optionWert == null){
        alert("Wert sollte nicht negativ sein");
        $('#optionWert').val("");
    }*/
});
/* new-mm-end */

/*Hide Datatable*/
/*new-mm-start*/
$(":not(#btnShowRecordsAnlBtn) button , .menu :not(#intBdeIMwMenu) a").click(function() {
    $("#tblAnlOhneZeitintervallIMw_wrapper").hide();
    $("#btnShowRecordsAnlBtn").prop("disabled", false);
    $('#searchBtnShowRecordsAnlBtnDiv').hide();
    $('#interneEBTblDiv').hide();
    /*used resetFormAllgemein function to  reset input values */
    /*new-mm-start 24-03-2021*/
    resetFormAllgemein('infosIntBetriebsdaten',1);
    /*new-mm-end 24-03-2021*/


});
/*Produkte mm 25-02-21*/
/*new-mm-start*/
$(":not(#btnShowRecordsAnlBtnPrdkt) button").click(function() {

    tblMstOhneZeitintervallIMw.clear();
    $("#tblMstOhneZeitintervallIMw_wrapper").hide();
    $("#searchBtnShowRecordsPrdktAnlMstBtnDiv").hide();
    $("#tblMstOhneZeitintervallIMwMessstelle_wrapper").hide();
    //$('#tblMstOhneZeitintervallIMw').parents('div.dataTables_wrapper').first().hide();
    $("#btnShowRecordsAnlBtnPrdkt").prop("disabled", false);
    resetInterneBetriebsdatenInputs('infosIntEnergiedaten',1);
});
/*new-mm-end*/
/*new-mm-end*/
/*Interne Betriebsdaten Modute Hide Produkte and Messsetelle historie Tab  mm 10-03-21*/
/*new-mm-start*/
$(".menu :not(#intEngIMwMenu) a").click(function() {

    tblMstOhneZeitintervallIMw.clear();

    $("#tabIntBetriebsdatenIMwHistPrdkt").hide();
    $("#tabIntBetriebsdatenIMwHistMesssetelle").hide();
    $("#infosIntBetriebsdatenHistPrdkt").hide();
    $("#infosIntBetriebsdatenHistMesssetelle").hide();
    $("#tabIntEnergiedatenIMw").hide();
    $("#infosIntEnergiedaten").hide();
    $("#tblMstOhneZeitintervallIMw_wrapper").hide();
    $("#searchBtnShowRecordsPrdktAnlMstBtnDiv").hide();
    $("#tblMstOhneZeitintervallIMwMessstelle_wrapper").hide();
    $("#btnShowRecordsAnlBtnPrdkt").prop("disabled", false);
    resetInterneBetriebsdatenInputs('infosIntEnergiedaten',1);

});
$("#tabIntBetriebsdatenIMwHistPrdkt").click(function() {
    $("#infosIntEnergiedaten").hide();
    $("#infosIntBetriebsdatenHistMesssetelle").hide();
    $("#infosIntBetriebsdatenHistPrdkt").show();

    /*new-mm-start 30-03-2021*/
    $("#infosMasseneingabePrdkt").hide();
    $("#infosMasseneingabeMesssetelle").hide();
    /*new-mm-end 30-03-2021*/

});
$("#tabIntBetriebsdatenIMwHistMesssetelle").click(function() {
    $("#infosIntEnergiedaten").hide();
    $("#infosIntBetriebsdatenHistPrdkt").hide();
    $("#infosIntBetriebsdatenHistMesssetelle").show();

    /*new-mm-start 30-03-2021*/
    $("#infosMasseneingabePrdkt").hide();
    $("#infosMasseneingabeMesssetelle").hide();
    /*new-mm-end 30-03-2021*/

});
/*new-mm-end*/
/*new-mm-start 25-03-2021*/
$("#intBdePrdktIMwHinz").click(function() {
    resetInterneBetriebsdatenInputs('infosIntEnergiedaten',1);

});
/*new-mm-end 25-03-2021*/

/** Benutzer Delete Functionality */

$("#benLoeschen").on('click', function() {
    benLoeschen();
});

/** Admin Delete Functionality */
$("#admLoeschen").on('click', function() {
    admLoeschen();
});

/** Superadmin Delete Functionality */
$("#sAdmLoeschen").on('click', function() {
    sAdmLoeschen();
});

/** MandantenGruppen Delete Functionality */
$("#manGrpLoeschen").on('click', function() {
    manGrpLoeschen();
});

$("#sAdmHinz").on('click', function(){
    $( "div#superadmincommTreeview" ).empty();
    var treeObject = JSON.parse(localStorage.getItem('gipsAdm'));
    var tw = new TreeView(
        treeObject,
        {showAlwaysCheckBox:true,fold:false});
    document.getElementById("superadmincommTreeview").appendChild( tw.root	 )
});

$("#admHinz").on('click', function(){
    $( "div#admincommTreeview" ).empty();
    var treeObject = JSON.parse(localStorage.getItem('gipsAdm'));
    var tw = new TreeView(
        treeObject,
        {showAlwaysCheckBox:true,fold:false});
    document.getElementById("admincommTreeview").appendChild( tw.root	 )
});
$("#benHinz").on('click', function(){
    $( "div#benutzerTreeview" ).empty();
    var treeObject = JSON.parse(localStorage.getItem('gipsAdm'));
    var tw = new TreeView(
        treeObject,
        {showAlwaysCheckBox:true,fold:false});
    document.getElementById("benutzerTreeview").appendChild( tw.root	 )
});

// ***7-6-2021---
$("#infosIntEnergiedaten_measuring_point").click(function() {
    var a,b;
    "infosIntEnergiedaten_measuring_point" == this.id ? a = "mstIMw" : '';
    infosIntEnergiedaten_measuring_point_function(a,b);
});

//<--16-6-2021---
$('#config_mannual').on('click', function(){
    $('#btnKonfigPrdkt').trigger('click');
});

$('#save_mannual').on('click', function(){
    $('#masseneingabeSpeichernSrchPrdkt').trigger('click');
});

// Oprating Mesuarement
$('#config_mannual_mesurement_operating').on('click', function(){
    $('#btnKonfigMesssetelle').trigger('click');
});

$('#save_mannual_mesurement_operating').on('click', function(){
    $('#masseneingabeSpeichernSrchPrdkt').trigger('click');
});



// Energy Default Button
$('#config_mannual_default_energy').on('click', function(){
    $('#btnKonfigMstAnl').trigger('click');
});

$('#save_mannual_default_energy').on('click', function(){
    $('#masseneingabeSpeichernSrch').trigger('click');
});

//--end-->

