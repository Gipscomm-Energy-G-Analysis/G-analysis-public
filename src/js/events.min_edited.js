var $jscomp = {
    scope: {},
    findInternal: function(c, h, e) {
        c instanceof String && (c = String(c));
        for (var f = c.length, g = 0; g < f; g++) {
            var b = c[g];
            if (h.call(e, b, g, c))
                return {
                    i: g,
                    v: b
                }
        }
        return {
            i: -1,
            v: void 0
        }
    }
};
$jscomp.defineProperty = "function" == typeof Object.defineProperties ? Object.defineProperty : function(c, h, e) {
    if (e.get || e.set)
        throw new TypeError("ES3 does not support getters and setters.");
    c != Array.prototype && c != Object.prototype && (c[h] = e.value)
}
;
$jscomp.getGlobal = function(c) {
    return "undefined" != typeof window && window === c ? c : "undefined" != typeof global && null != global ? global : c
}
;
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.polyfill = function(c, h, e, f) {
    if (h) {
        e = $jscomp.global;
        c = c.split(".");
        for (f = 0; f < c.length - 1; f++) {
            var g = c[f];
            g in e || (e[g] = {});
            e = e[g]
        }
        c = c[c.length - 1];
        f = e[c];
        h = h(f);
        h != f && null != h && $jscomp.defineProperty(e, c, {
            configurable: !0,
            writable: !0,
            value: h
        })
    }
}
;
$jscomp.polyfill("Array.prototype.find", function(c) {
    return c ? c : function(c, e) {
        return $jscomp.findInternal(this, c, e).v
    }
}, "es6-impl", "es3");
$(function() {
    var c = this;
    $("#logout").click(function() {
        sessionStorage.clear();
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
        "" != this.id && null != this.id && "undefined" != this.id && (changeTracker.setChange(TrackValue.LABEL, $("label[for=" + this.id + "]").text()),
        changeTracker.setChange(TrackValue.FIELD_ID, this.id),
        changeTracker.setChange(TrackValue.OLD_VALUE, this.value))
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

    
    $("#inputEnergietraeger1Lieg, #inputEnergietraeger2Lieg, #inputEnergietraeger2Lieg, #inputEnergietraeger2Lieg, #inputEnergietraeger3Lieg, #inputEnergietraeger4Lieg, #inputEnergietraeger5Lieg, #inputEnergietraeger6Lieg, #inputEnergietraeger7Lieg, #inputEnergietraeger8Lieg, #inputEnergietraeger9Lieg").click(function() {
        $(this).val("")
    });
    $("#mapDrucken").click(function() {
        mapDrucken($("#treeGraph"))
    });
    $(".imgBtnAnlagePrd").click(function() {
        anlagenAuswahllisteErstellen(this.id)
    });
    $(".btnFormelSymbol").click(function() {
        var a = $(this).text();
        if ("AC" == a)
            e.latex(""),
            $("#formelStringDarstellung, #formelIdDarstellung").val(""),
            formula.resetFormula();
        else if ("CE" == a) {
            e.keystroke("Del");
            a = $("#formelStringDarstellung").val();
            $("#formelIdDarstellung").val();
            var d = formula.getLastElement()
              , b = 0;
            1 < formula.formula.length && (b = d.operator.length);
            d.operand.type == OperandType.MEASUREMENT_POINT ? (b += d.operand.operandObject.name.length,
            b += 2) : d.operand.type == OperandType.NUMERIC_OPERAND && (b += d.operand.operandObject.value.length);
            b += Number(d.parentheses.number);
            $("#formelStringDarstellung").val(a.substring(0, a.length - b));
            formula.removeLastElement()
        } else if ("MD" == a)
            "none" == $("#formelLatexDarstellung").css("display") ? ($("#formelLatexDarstellung").css("display", "block"),
            $("#formelStringDarstellung").css("display", "none")) : ($("#formelLatexDarstellung").css("display", "none"),
            $("#formelStringDarstellung").css("display", "block"));
        else if ("\u2192" == a)
            e.keystroke("Right");
        else if ("\u2190" == a)
            e.keystroke("Left");
        else if ("\u2191" == a)
            e.keystroke("Up");
        else if ("\u2193" == a)
            e.keystroke("Down");
        else {
            if (0 == a || 1 == a || 2 == a || 3 == a || 4 == a || 5 == a || 6 == a || 7 == a || 8 == a || 9 == a)
                d = new NumericOperand(a),
                "" == $("#formelStringDarstellung").val() ? formula.setFirstElement(LocationParentheses.NONE, 0, OperandType.NUMERIC_OPERAND, d) : formula.alterElementProperty(formula.formula.length - 1, FormulaProperty.NUMERIC_OPERAND, {
                    type: OperandType.NUMERIC_OPERAND,
                    operandObject: d
                });
            "(" != a && ")" != a ? " + " != a && " - " != a && " * " != a && " / " != a || formula.setElement(a, null, null, null, null) : "(" == a ? (a = formula.formula[formula.formula.length - 1].parentheses.number + 1,
            formula.alterElementProperty(formula.formula.length - 1, FormulaProperty.PARENTHESES, {
                location: LocationParentheses.BEGINNING,
                number: a
            })) : ")" == a && (a = formula.formula[formula.formula.length - 1].parentheses.number + 1,
            formula.alterElementProperty(formula.formula.length - 1, FormulaProperty.PARENTHESES, {
                location: LocationParentheses.END,
                number: a
            }));
            a = "block" === $("#infosVorlagenformeln").css("display") ? "#formelVorStringDarstellung" : "#formelStringDarstellung";
            d = $(a).val() + $(this).text();
            b = $("#formelIdDarstellung").val() + $(this).text();
            $(a).val(d);
            $("#formelIdDarstellung").val(b);
            e.typedText($(this).text())
        }
    });
    $("#formelSpeichern").click(function() {
        var a;
        a = "" === $("#zeitintervallFormel").val() ? btoa($("#formelIdDarstellung").val()) : btoa($("#zeitintervallFormel").val() + " , " + $("#formelIdDarstellung").val());
        a = {
            modus: $("#bermstmod").val(),
            berechneteMstID: $("#berechneteMstID").val().split("_")[1],
            bezug: $("#inpBezugKnz").val(),
            formelString: btoa($("#formelStringDarstellung").val()),
            idString: a
        };
        writeFormulaToDB(a)
    });
    $("#formelVorSpeichern").click(function() {
        var a = $("#inpBezeichnungVorFrm").val()
          , d = $("#formelVorStringDarstellung").val()
          , b = $("#notizVorlFrm").val();
        writeVorlFormulaToDB(a, btoa(d), b)
    });
    var h = document.getElementById("formelLatexDarstellung")
      , e = MathQuill.getInterface(2).MathField(h, {
        spaceBehavesLikeTab: !0
    });
    tblMessstellenBerechnungseditor.on("draw", function() {
        $("#tblMessstellenBerechnungseditor tr").css("cursor", "pointer");
        $("#tblMessstellenBerechnungseditor tr").draggable({
            helper: "clone",
            start: function(a, d) {
                var b = $(this).find("td")
                  , c = "mst_" + b.prev().text()
                  , b = b.text();
                $("#zeitintervallFormel").val($("#zeitInterFrm").val());
                contents = [c, b]
            }
        })
    });
    tblAnlagenBerechnungseditor.on("draw", function() {
        $("#tbAnlagennBerechnungseditor tr").css("cursor", "pointer");
        $("#tblAnlagenBerechnungseditor tr").draggable({
            helper: "clone",
            start: function(a, d) {
                var b = $(this).find("td")
                  , c = "anl_" + b.prev().text()
                  , b = b.text();
                contents = [c, b]
            }
        })
    });
    tblInterneMesswerteBerechnungseditor.on("draw", function() {
        $("#tblInterneMesswerteBerechnungseditor tr").css("cursor", "pointer");
        $("#tblInterneMesswerteBerechnungseditor tr").draggable({
            helper: "clone",
            start: function(a, d) {
                var b = $(this).find("td")
                  , c = "staProd_" + b.prev().text()
                  , b = b.text();
                contents = [c, b]
            }
        })
    });
    tblBdeDynBerechnungseditor.on("draw", function() {
        $("#tblBdeDynBerechnungseditor tr").css("cursor", "pointer");
        $("#tblBdeDynBerechnungseditor tr").draggable({
            helper: "clone",
            start: function(a, d) {
                var b = $(this).find("td")
                  , c = "bdeProd_" + b.prev().text()
                  , b = b.text();
                contents = [c, b]
            }
        })
    });
    tblEinheitenKnzs.on("draw", function() {
        $("#tblEinheitenKnzs tr").css("cursor", "pointer");
        $("#tblEinheitenKnzs tr").draggable({
            helper: "clone",
            start: function(a, b) {
                cont2 = "kWh / " + $(this).find("td").text()
            }
        })
    });
    tblProdukte.on("draw", function() {
        $("#tblProdukte tr").css("cursor", "pointer");
        $("#tblProdukte tr").draggable({
            helper: "clone",
            start: function(a, b) {
                var d = $(this).find("td")
                  , c = "ePrd_" + d.prev().text()
                  , d = d.text();
                contents = [c, d]
            }
        })
    });
    $(".vorlFrmPlatzhalter").draggable({
        helper: "clone",
        start: function(a, d) {
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
            $(this).val("" + cont2)
        }
    });
    $("#einheitKennzahldetail2Knz").droppable({
        tolerance: "touch",
        drop: function() {
            $(this).val("" + cont2)
        }
    });
    $("#einheitKennzahldetail3Knz").droppable({
        tolerance: "touch",
        drop: function() {
            $(this).val("" + cont2)
        }
    });
    $("#einheitKennzahldetail4Knz").droppable({
        tolerance: "touch",
        drop: function() {
            $(this).val("" + cont2)
        }
    });
    $("#einheitKennzahldetail5Knz").droppable({
        tolerance: "touch",
        drop: function() {
            $(this).val("" + cont2)
        }
    });
    $("#einheitKennzahldetail6Knz").droppable({
        tolerance: "touch",
        drop: function() {
            $(this).val("" + cont2)
        }
    });
    $("#einheitKennzahldetail7Knz").droppable({
        tolerance: "touch",
        drop: function() {
            $(this).val("" + cont2)
        }
    });
    $("#einheitKennzahldetail8Knz").droppable({
        tolerance: "touch",
        drop: function() {
            $(this).val("" + cont2)
        }
    });
    $("#einheitKennzahldetail9Knz").droppable({
        tolerance: "touch",
        drop: function() {
            $(this).val("" + cont2)
        }
    });
    $("#einheitKennzahldetail10Knz").droppable({
        tolerance: "touch",
        drop: function() {
            $(this).val("" + cont2)
        }
    });
    $("#formelStringDarstellung, #berechneteMstName").droppable({
        tolerance: "touch",
        drop: function() {
            var a = this.id, d, b;
            "mst" === contents[0].split(" ")[0].split("_")[0] ? (d = contents[0].split(" ")[0],
            b = $("#zeitintervallFormel").val() + " - " + contents[0].split(" ")[1]) : (d = contents[0].split(" ")[0],
            b = contents[0].split(" ")[1]);
            "" === $("#formelStringDarstellung").val() && $("#zeitintervallFormel").val("");
            formelerweiterungNachDrop(a, d, b, !1)
        }
    });
    $("#btnPrdOeffnen").click(function() {
        mainMenuNav("prdMenu")
    });
    $(".inputEnergietraegerLieg").change(function() {
        "-Energietr\u00e4ger hinzuf\u00fcgen-" == $(this).val() && (b ? (instanzErstellen("liegSpeichern"),
        b = !1) : instanzSpeichern("liegSpeichern"),
        lastNav.setRecordsNavID(liegNavID),
        lastNav.setFieldsNavInfo([{
            type: "comboBox",
            id: this.id
        }]),
        lastNav.enableJump(!0),
        $("#entHinz").trigger("click"),
        mainMenuNav("entMenu"))
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
    var f, g, b = !1;
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
    var l = !1;
    $("#kostenERng, #tagstromVerbrERng, #tagstromKostERng, #nachtstromVerbrERng, #nachtstromKostERng, #lastspitzeERng,#leistungspreisERng, #abpWirkERng, #abpNetzERng, #strSteuERng, #blindstromERng, #konzERng, #eegERng, #eegUntERng,#eegUebERng, #kwkUntERng, #nevUntERng, #offUntERng, #kwkObERng, #nevObERng, #offObERng, #custom1ERng, #custom2ERng,#custom3ERng, #custom4ERng, #custom5ERng, #custom6ERng, #mengeERng").blur(function() {
        l ? $.isNumeric(formatNumber("deform", this.value)) && (isValid = !0,
        $("#mitUntERng").is(":checked") && $(this).css("background-color", "#4AB872"),
        l = !1) : "" !== this.value && ($.isNumeric(formatNumber("deform", this.value)) ? ($("#mitUntERng").is(":checked") && $(this).css("background-color", "#4AB872"),
        l = !1) : ($("#mitUntERng").is(":checked") && $(this).css("background-color", "#DB504A"),
        alert("Das Format des eingegebenen Wertes ist inkorrekt!\nEin Beispiel wie es aussehen sollte: 120233,12 oder 120.233,12"),
        $(this).select(),
        l = !0))
    });
    $("#mitUntERng").click(function() {
        var a = !$(c).is(":checked");
        (function() {
            a ? $(".standRng, .evuRng, .bafaRng").css("background-color", "white") : function() {}
        }
        )()
    });
    $("#typDiag").change(function() {
        "line" == this.value ? ($("#exampleLineChart").css("display", "block"),
        $("#exampleColumnChart").css("display", "none")) : ($("#exampleLineChart").css("display", "none"),
        $("#exampleColumnChart").css("display", "block"))
    });
    $("#zeitrDiag").change(function() {
        "Benutzerdefiniert" === this.value ? $("#btnZeitrmDiag").text("Benutzerdefinierter Zeitraum") : $("#btnZeitrmDiag").text("Allgemeiner Zeitraum");
        $("#btnZeitrmDiag").trigger("click");
        "Jahr" === this.value ? ($("#diagMonatDiv, #diagTagDiv").css("display", "none"),
        $("#diagMonat, #diagTag").prop("selectedIndex", 0)) : "Monat" === this.value || "Monat 15min" === this.value ? ($("#diagMonatDiv").css("display", "inline-block"),
        $("#diagTagDiv").css("display", "none"),
        $("#diagTag").prop("selectedIndex", 0)) : "Tag" !== this.value && "Tag 15min" !== this.value || $("#diagMonatDiv, #diagTagDiv").css("display", "inline-block")
    });
    $("#btnZeitrmDiag").click(function() {
        "Benutzerdefinierter Zeitraum" == $("#btnZeitrmDiag").text() ? ($(".allgZeitrDiag").css("display", "none"),
        $(".benutzerdefZeitrDiag").css("display", "inline-block"),
        $("#btnZeitrmDiag").text("Allgemeiner Zeitraum")) : ($(".allgZeitrDiag").css("display", "inline-block"),
        $(".benutzerdefZeitrDiag").css("display", "none"),
        $("#btnZeitrmDiag").text("Benutzerdefinierter Zeitraum"))
    });
    $("#prdAuswahlZugDynPrdID").click(function() {
        tabellenAuswahllisteErstellen()
    });
    $(".not-empty").change(function(a) {
        emptyString(a.value) && (alert("Dieses Feld darf nicht leer gelassen werden!"),
        a.focus())
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
            $(".tagZeitvergl").css("display", "none");
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
    $("#btnMassEingMst, #btnMassEingAnl").click(function() {
        $("#infosMasseneingabe").css("display", "block");
        $("#infosIntEnergiedaten, #infosIntBetriebsdaten").css("display", "none")
    });
    $("#btnKonfigMstAnl").click(function() {
        $("#infosMasseneingabe").css("display", "none");
        "intEngIMw" == $("#activeInstance").val() ? $("#infosIntEnergiedaten").css("display", "block") : $("#infosIntBetriebsdaten").css("display", "block")
    });
    $("#btnVerbrauchsdatenExport").click(function() {
        verbrauchsdatenExportieren()
    });
    $("#spzKnzSuchen").click(function() {
        spezielleKennzahlenlisteErstellen()
    });
    $("#btnWeitereKnzHinz").click(function() {
        for (var a = $("#btnTabKnzCont li").length, b = 0; b < a; b++)
            if ("none" === $("#btnTabKnzCont li").eq(b).css("display")) {
                "" !== $("formel" + b + "Knz").val() ? $("#btnTabKnzCont li").eq(b).css("display", "inline") : alert("Die Zuweisung einer Formel ist notwendig bevor eine neue Kennzahl hinzuf\u00fcgt werden kann!");
                break
            }
    });
    $("#insSuchenKnz").click(function() {
        instanzAuswahllisteErstellen($("#bezugAllgemeinKnz").val())
    });
    $("#bezugAllgemeinKnz").change(function() {
        $("#instanzAllgemeinKnz").val("");
        "prd" === this.value ? $(".customParPrd").css("display", "block") : ($(".customParPrd,.customParDiv").css("display", "none"),
        $("#btnProdAnzeigenKnz").text("Produktparameter einblenden"))
    });
    $("#btnProdAnzeigenKnz").click(function() {
        "Produktparameter einblenden" === $(this).text() ? ($(".customParDiv").css("display", "block"),
        $(this).text("Produktparameter ausblenden")) : ($(".customParDiv").css("display", "none"),
        $(this).text("Produktparameter einblenden"))
    });
    $(document).on("input", ".bezeichnungKnz", function() {
        $(".knzForms").eq(subtract(1, extractNumber(this.id))).text(this.value)
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
        var a = $("#lblGewVorlagenformel").text()
          , b = function() {
            for (var a = $("#vorlFrmFuellen div .vorlString").length, b = [], d = [], c = 0; c < a; c++)
                b.push($("#vorlFrmFuellen div .vorlString").eq(c).val()),
                d.push($("#vorlFrmFuellen div .vorlID").eq(c).val());
            return {
                string: b,
                Id: d
            }
        }()
          , a = filterOperatoren(a)
          , c = altFuse(b.string)(a).join(" ")
          , b = altFuse(b.Id)(a).join(" ")
          , a = {
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
        $(this).is(":checked") ? $(".chkBetriebsparameter").prop("checked", !0) : $(".chkBetriebsparameter").prop("checked", !1)
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
            $("#berechneteMstID").val("")
        }
        this.value = ""
    });
    $(".manPfadEnt").css("display", "inline");
    $("#modus").change(function() {
        "Global" == $(this).val() ? $(".manPfadEnt").css("display", "none") : $(".manPfadEnt").css("display", "inline")
    });
    $(".manPfadEnt select").change(checkboxenDerEntEnfEinlesen($("#entManZuordnung")));
    $("#manOrManGrp").change(function() {
        toggleMandantOderMandantengruppe($(this).val())
    });
    $("#manZuManGrpHinz").click(function() {
        mandantenAuswahllisteErstellen()
    });
    $("#tagstromERng, #nachtstromERng").change(function() {
        var a = $("#tagstromERng").val()
          , b = $("#nachtstromERng").val()
          , a = parseFloat(a) + parseFloat(b);
        $("#kostenERng").val(formatNumber("form", a));
        $("#kostenERng").trigger("change")
    });
    $("#kostenERng").change(function() {
        -1 != $(this).val().indexOf(",") && $(this).val(formatNumber("deform", $(this).val()));
        $("#liegRngVergleich").change(function() {
            externeRechnungenListeErstellen("vergleich")
        });
        var a = $(this).val(), a = parseFloat(a), b;
        b = (19 * a / 100).toFixed(2);
        b = parseFloat(b);
        a = (a + b).toFixed(2);
        a = parseFloat(a);
        $(this).val(formatNumber("form", $(this).val()));
        $("#mwstERng").val(formatNumber("form", b));
        $("#kostenMitMwstERng").val(formatNumber("form", a))
    });
    $("#btnSpaEfVTbl1Erstellen, #btnSpaEfVTbl2Erstellen").click(function() {
        var a = getModusSpaEfV(this.name)
          , b = getVersionSpaEfV(this.name)
          , c = getVerdichtungSpaEfV(this.name);
        if ("btnSpaEfVTbl1Erstellen" == this.id) {
            var e = getModusDarzustellendeJahreSpaEfV1()
              , e = getJahresstringBenutzerdefSpaEfV1(b, e);
            "basis" == b && (c = "verdichtet");
            SpaEfVTbl1Erstellen(a, b, c, e)
        } else
            "btnSpaEfVTbl2Erstellen" == this.id && (e = new Date,
            "basis" == b && (c = "verdichtet1",
            jahr = e.getFullYear() - 1),
            SpaEfVTbl2Erstellen(a, b, c, jahr))
    });
    $("#benutzerdefiniertSpaEfVTbl1, benutzerdefiniertSpaEfVTbl2").click(function() {
        var a = getModusSpaEfV(this.value)
          , b = getVersionSpaEfV(this.value);
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
        $("#lblSpeziSpaEfVTble1Lieg, #speziSpaEfVTbl1Lieg, #speziSpaEfVTbl1Org, #lblSpeziSpaEfVTble1Org").css("display", "inline")
    });
    $("#modus").change(function() {
        dbFuerEnergietraegerFestlegen($(this).val())
    });
    organisationenEinlesen();
    liegenschaftenEinlesen();
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
        "weitere Energietr\u00e4ger zuordnen" == $("#weitereEntsLieg").text() ? ($("#entLiegErweitert").css("display", "block"),
        $("#weitereEntsLieg").text("weniger Energietr\u00e4ger zuordnen")) : ($("#entLiegErweitert").css("display", "none"),
        $("#weitereEntsLieg").text("weitere Energietr\u00e4ger zuordnen"));
        $("#energietraeger7Lieg, #energietraeger8Lieg, #energietraeger9Lieg").val("")
    });
    $("#hatDlAllgemeinLieg").click(function() {
        toggleExtDl(this)
    });
    $("#levelAuswahlAllgemeinBer").change(function() {
        readinLevel(this);
        vorgelagertenBereichAktivieren(this)
    });
    $("#messartMst").change(function() {
        messmittelOderBerechnungslogik(this)
    });
    $("#mstSuchen").click(function() {
        messstellenlisteErstellen()
    });
    $(".auslastung").blur(function() {
        if ("mittlereAuslastungKw1Anl" == this.id) {
            var a = 100 * $("#mittlereAuslastungKw1Anl").val() / $("#anschlussleistung1Anl").val()
              , a = a.toFixed(2);
            $("#mittlereAuslastungProzent1Anl").val(a)
        } else
            "mittlereAuslastungProzent1Anl" == this.id ? (a = $("#mittlereAuslastungProzent1Anl").val() / 100 * $("#anschlussleistung1Anl").val(),
            a = a.toFixed(3),
            $("#mittlereAuslastungKw1Anl").val(a)) : "mittlereAuslastungKw2Anl" == this.id ? (a = 100 * $("#mittlereAuslastungKw2Anl").val() / $("#anschlussleistung2Anl").val(),
            a = a.toFixed(2),
            $("#mittlereAuslastungProzent2Anl").val(a)) : "mittlereAuslastungProzent2Anl" == this.id ? (a = $("#mittlereAuslastungProzent2Anl").val() / 100 * $("#anschlussleistung2Anl").val(),
            a = a.toFixed(3),
            $("#mittlereAuslastungKw2Anl").val(a)) : "mittlereAuslastungKw3Anl" == this.id ? (a = 100 * $("#mittlereAuslastungKw3Anl").val() / $("#anschlussleistung3Anl").val(),
            a = a.toFixed(2),
            $("#mittlereAuslastungProzent3Anl").val(a)) : "mittlereAuslastungProzent3Anl" == this.id ? (a = $("#mittlereAuslastungProzent3Anl").val() / 100 * $("#anschlussleistung3Anl").val(),
            a = a.toFixed(3),
            $("#mittlereAuslastungKw3Anl").val(a)) : "mittlereAuslastungKw4Anl" == this.id ? (a = 100 * $("#mittlereAuslastungKw4Anl").val() / $("#anschlussleistung4Anl").val(),
            a = a.toFixed(2),
            $("#mittlereAuslastungProzent4Anl").val(a)) : "mittlereAuslastungProzent4Anl" == this.id && (a = $("#mittlereAuslastungProzent4Anl").val() / 100 * $("#anschlussleistung4Anl").val(),
            a = a.toFixed(3),
            $("#mittlereAuslastungKw4Anl").val(a))
    });
    $("#feldHinzufuegenStd").click(function() {
        createCustomField("std")
    });
    $("#entFaktorHinz, #enfFaktorHinz").click(function() {
        createCustomField("entFaktorHinz" == this.id ? "ent" : "enf")
    });
    $("#bisERng").change(function() {
        $("#bisERng").val().split(".")[2] !== $("#vomERng").val().split(".")[2] && (alert("Diese Rechnung muss gesplittet werden."),
        rechnungenSplitten())
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
    $("#berSuchenOrt, #ortSuchenMst, #anlAuswahlStd").click(function() {
        standorteAuswahllisteErstellen(this)
    });
    $("#anlAuswahlZugVerbr1, #anlAuswahlZugVerbr2 ,#anlAuswahlZugVerbr3, #anlAuswahlZugVerbr4, #anlAuswahlZugVerbr5, #anlAuswahlZugVerbr6").click(function() {
        anlagenAuswahllisteErstellen(this.id)
    });
    $("#berSuchenVBereich1, #berSuchenVBereich2, #anlAuswahlBer").click(function() {
        bereichsAuswahllisteErstellen(this)
    });
    $("#mstSuchenVMessstelle, #anlSuchenMst, #eRngSuchenMst, #anlEnt1SuchenMst, #anlEnt2SuchenMst, #anlEnt3SuchenMst, #anlEnt4SuchenMst,#zpSuchenMst, #mstSuchenExtDl1, #mstSuchenExtDl2, #mstSuchenExtDl3, #mstSuchenExtDl4, #mstSuchenExtDl5, #mstSuchenExtDl6,#mstSuchenExtDlEngRes1, #mstSuchenExtDlEngRes2, #mstSuchenExtDlEngRes3, #mstSuchenExtDlEngRes4, #mstSuchenExtDlEngRes5, #mstSuchenExtDlEngRes6,#imgBtnMstDiag11, #imgBtnMstDiag12, #imgBtnMstDiag13, #imgBtnMstDiag2, #imgBtnMstDatenexport, #mstSuchenVergl1, #mstSuchenVergl2").click(function() {
        var a, b;
        "mstSuchenVMessstelle" == this.id ? a = "vorgMst" : "anlSuchenMst" == this.id ? a = "mstMsm" : "eRngSuchenMst" == this.id ? a = "mstERng" : "anlEnt1SuchenMst" == this.id ? (a = "mst1Anl",
        b = $("#energietraeger1AllgemeinAnl").val()) : "anlEnt2SuchenMst" == this.id ? (a = "mst2Anl",
        b = $("#energietraeger2AllgemeinAnl").val()) : "anlEnt3SuchenMst" == this.id ? (a = "mst3Anl",
        b = $("#energietraeger3AllgemeinAnl").val()) : "anlEnt4SuchenMst" == this.id ? (a = "mst4Anl",
        b = $("#energietraeger4AllgemeinAnl").val()) : "zpSuchenMst" == this.id ? a = "mstZp" : "mstSuchenExtDl1" == this.id ? a = "mst1ExtDl" : "mstSuchenExtDl2" == this.id ? a = "mst2ExtDl" : "mstSuchenExtDl3" == this.id ? a = "mst3ExtDl" : "mstSuchenExtDl4" == this.id ? a = "mst4ExtDl" : "mstSuchenExtDl5" == this.id ? a = "mst5ExtDl" : "mstSuchenExtDl6" == this.id ? a = "mst6ExtDl" : "mstSuchenExtDlEngRes1" == this.id ? a = "mstEngRes1ExtDl" : "mstSuchenExtDlEngRes2" == this.id ? a = "mstEngRes2ExtDl" : "mstSuchenExtDlEngRes3" == this.id ? a = "mstEngRes3ExtDl" : "mstSuchenExtDlEngRes4" == this.id ? a = "mstEngRes4ExtDl" : "mstSuchenExtDlEngRes5" == this.id ? a = "mstEngRes5ExtDl" : "mstSuchenExtDlEngRes6" == this.id ? a = "mstEngRes6ExtDl" : "imgBtnMstDiag11" == this.id ? a = "mstDiag1" : "imgBtnMstDiag12" == this.id ? a = "mstDiag2" : "imgBtnMstDiag13" == this.id ? a = "mstDiag3" : "imgBtnMstDiag2" == this.id ? a = "mstCompDiag" : "imgBtnMstDatenexport" == this.id ? a = "mstDatenexport" : "mstSuchenVergl1" == this.id ? a = "mstSuchenVergl1" : "mstSuchenVergl2" == this.id && (a = "mstSuchenVergl2");
        messstellenAuswahllisteErstellen(a, b)
    });
    $("#msmSuchenMst").click(function() {
        switch ($("#messartMst").val()) {
        case "manuell":
        case "automatisch":
            messmittelAuswahllisteErstellen("msmMst");
            break;
        case "berechnet":
            formelAuswahllisteErstellen("frmMst");
            break;
        default:
            alert('$("#msmSuchenMst").click(): No fitting case !!')
        }
    });
    $("#msmSuchenAnlage, #mstSuchenAnlage").click(function() {
        var a;
        "msmSuchenAnlage" == this.id ? a = "anlMsm" : "mstSuchenAnlage" == this.id && (a = "anlMst");
        anlagenAuswahllisteErstellen(a)
    });
    $(".msmSuchen").click(function() {
        messmittellisteErstellen()
    });
    $("#messungsformAllgemeinMsm").change(function() {
        "1-kanalig" == $(this).val() ? $(".kanal_2_3").css("visibility", "hidden") : $(".kanal_2_3").css("visibility", "visible")
    });
    $("#anlSuchenKanal1,#anlSuchenKanal2,#anlSuchenKanal3").click(function() {
        kanalauswahlTabelleErstellen(this.id)
    });
    $("#imgBtnknzDiag11, #imgBtnknzDiag12, #imgBtnknzDiag13").click(function() {
        kennzahlenAuswahllisteErstellen(this.id)
    });
    $("#modusERng").change(function() {
        "Standard" == $(this).val() ? ($("#standRng").css("display", "block"),
        $("#evuRng").css("display", "none"),
        $("#bafaRng").css("display", "none"),
        $(".evuRng,.bafaRng").val("")) : "EVU" == $(this).val() ? ($("#standRng").css("display", "block"),
        $("#evuRng").css("display", "block"),
        $("#bafaRng").css("display", "none"),
        $(".bafaRng").val("")) : "BaFa" == $(this).val() && ($("#standRng").css("display", "block"),
        $("#evuRng").css("display", "block"),
        $("#bafaRng").css("display", "block"))
    });
    $("#modusVerglRngMw").change(function() {
        "Messwerte" == $(this).val() ? $(".suchfelderRngVergl").css("display", "none") : $(".suchfelderRngVergl").css("display", "inline-block")
    });
    $("#modusVerglRngMw").change(function() {});
    $("#bildAllgemeinAnl, #bildAllgemeinMsm").click(function() {
        "bildAllgemeinAnl" == this.id ? $("#imgUploadAnl").trigger("click") : $("#imgUploadMsm").trigger("click")
    });
    $("#mengeERng, #einERng").change(function() {
        var a = $("#entERng").val()
          , b = $("#einERng").val()
          , c = $("#mengeERng").val();
        verbrauchBerechnen(this.id, a, b, c)
    });
    $("#mengeIMw").change(function() {
        var a = $("#entIMw").val()
          , b = $("#einIMw").val()
          , c = $(this).val();
        verbrauchBerechnen(this.id, a, b, c)
    });
    $("#entERng").change(function() {
        versorgerUndEinheitBefuellen()
    });
    $("#btnHtNt").click(function() {
        "none" == $("#htNt").css("display") ? ($("#htNt").css("display", "block"),
        $(this).text("HT/NT deaktivieren")) : ($("#htNt").css("display", "none"),
        $(".htNtInp").val(""),
        $(this).text("HT/NT aktivieren"))
    });
    $("#tagstromVerbrERng, #nachtstromVerbrERng").change(function() {
        var a = parseFloat($("#tagstromVerbrERng").val())
          , b = parseFloat($("#nachtstromVerbrERng").val())
          , a = (a + b).toFixed(2);
        $("#verbrauchERng").val(formatNumber("form", a))
    });
    $("#tagstromKostERng, #nachtstromKostERng").change(function() {
        var a = parseFloat($("#tagstromKostERng").val())
          , b = parseFloat($("#nachtstromKostERng").val())
          , a = (a + b).toFixed(2);
        $("#kostenERng").val(formatNumber("form", a))
    });
    $("#eegUntERng, #eegUebERng").change(function() {
        var a = parseFloat($("#eegUntERng").val())
          , b = parseFloat($("#eegUebERng").val())
          , a = (a + b).toFixed(2);
        $("#eegERng").val(a)
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
        "diaProd1AusEin" == this.id && "Diagramm ausklappen" == $(this).text() ? ($("#infosProduktion").css("height", $("#infosProduktion").height() + 300 + "px"),
        $("#diaProd1").css("display", "block"),
        $(this).text("Diagramm einklappen")) : "diaProd1AusEin" == this.id && "Diagramm einklappen" == $(this).text() ? ($("#diaProd1").css("display", "none"),
        $("#infosProduktion").css("height", $("#infosProduktion").height() - 300 + "px"),
        $(this).text("Diagramm ausklappen")) : "diaProd2AusEin" == this.id && "Diagramm ausklappen" == $(this).text() ? ($("#infosProduktion").css("height", $("#infosProduktion").height() + 300 + "px"),
        $("#diaProd2").css("display", "block"),
        $(this).text("Diagramm einklappen")) : "diaProd2AusEin" == this.id && "Diagramm einklappen" == $(this).text() && ($("#diaProd2").css("display", "none"),
        $("#infosProduktion").css("height", $("#infosProduktion").height() - 300 + "px"),
        $(this).text("Diagramm ausklappen"))
    });
    $("#menuProduktionAusw").click(function() {
        $("#auswertungen").css("display", "block");
        $("#stammdaten").css("display", "none");
        $(".infoBody").css("display", "inline-block");
        $("#manuell").css("display", "none");
        $("#optionen").css("display", "none");
        $("#bericht").css("display", "none")
    });
    $("#linkBerechnungslogikOderEingabemaske").click(function() {
        var a, b;
        "Berechnungslogik anlegen" == $(this).text() ? (a = mstNavID,
        b = ["messmittelBerechnungslogikMst", "berechnungslogikMst"],
        $("#menuBerechnungsformeln").trigger("click"),
        formelerweiterungNachDrop("berechneteMstName", $("#mstID").val(), $("#nameMst").val(), !0)) : (a = msmNavID,
        b = ["messmittelBerechnungslogikMst"],
        $("#msmMenu").trigger("click"));
        lastNav.setBasicNavInfo({
            db: $("#nameDB").val(),
            organisation: $("#orgID").val(),
            liegenschaft: $("#liegID").val(),
            bereich: $("#berID").val()
        }, "ber");
        lastNav.setRecordsNavID(a);
        lastNav.setFieldsNavInfo([{
            type: "textbox",
            id: b[0]
        }, {
            type: "textbox",
            id: b[1]
        }]);
        lastNav.enableJump(!0)
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
            alert("Es sind nur Zahlen mit einer L\u00e4nge kleiner-gleich 15-Stellen erlaubt!"),
            this.value = ""
        }
    });
    $(".testStrLen").on("blur", function() {
        switch (30 < this.value.length) {
        case !0:
            alert("Es sind nur Zeichenketten mit maximal 30 Zeichen erlaubt!"),
            this.value = ""
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
            for (j = 0; 6 > j; j++)
                $("#jahr" + (j + 1) + "SpaEfV").css("display", "none"),
                $("#chartAusbl" + (j + 1)).text("Ausblenden"),
                $("#chartAusbl" + (j + 1)).css("display", "none");
            $("#jahr6SpaEfV").css("display", "inline-block");
            $("#tbl6SpaEfV caption").text("Energieverbrauchswerte " + thisYear + "  bis " + b);
            for (i = 0; i < $(this).val(); i++)
                a = $("#startjahrSpaEfVTab1").val(),
                a = parseInt(a),
                a += i,
                $("#jahr" + (i + 1) + "SpaEfV").css("display", "inline-block"),
                $("#chartJahr" + (i + 1)).css("display", "inline"),
                $("#chartAusbl" + (i + 1)).css("display", "inline-block"),
                $("#tbl" + (i + 1) + "SpaEfV caption").text("Energieverbrauchswerte " + a)
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
        a.getFullYear();
        if ("" != $("#anzahlJahreSpaEfVTab1").val()) {
            for (j = 0; 6 > j; j++)
                $("#jahr" + (j + 1) + "SpaEfV").css("display", "none"),
                $("#chartAusbl" + (j + 1)).text("Ausblenden"),
                $("#chartAusbl" + (j + 1)).css("display", "none");
            a = new Date;
            a = a.getFullYear();
            $("#jahr6SpaEfV").css("display", "inline-block");
            $("#tbl6SpaEfV caption").text("Energieverbrauchswerte " + a + "  bis " + b);
            for (i = 0; i < $("#anzahlJahreSpaEfVTab1").val(); i++)
                b = $("#startjahrSpaEfVTab1").val(),
                b = parseInt(b),
                b += i,
                $("#jahr" + (i + 1) + "SpaEfV").css("display", "inline-block"),
                $("#chartAusbl" + (i + 1)).css("display", "inline-block"),
                $("#tbl" + (i + 1) + "SpaEfV caption").text("Energieverbrauchswerte " + b)
        }
    });
    $("#chartAusbl1, #chartAusbl2, #chartAusbl3, #chartAusbl4, #chartAusbl5").click(function() {
        if ("Ausblenden" == $(this).text()) {
            var a = $("#startjahrSpaEfVTab1").val()
              , a = parseInt(a);
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
                $("#jahr5SpaEfV").css("display", "none"),
                a += 4
            }
            $(this).text(a + " Einblenden")
        } else
            switch ($(this).text("Ausblenden"),
            this.id) {
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
        mainMenuNav(this.id)
    });
    $("#betrGrpMenu, #sAdmMenu, #manGrpMenu, #admMenu, #benMenu, #untMenu, #anlMenu, #pmMenu, #msmMenu, #knz_almMenu, #manMenu, #orgMenu, #liegMenu, #berMenu, #stdMenu, #stdDrMenu, #anl_Menu, #msgMenu, #knzMenu, #almMenu, #prdMenu,#anl_Eng_Menu, #anl_Dok_Menu, #anl_Hist_Menu, #anl_Konfig_Menu,#prd_Menu, #prd_Konfig_Menu, #prd_Hist_Menu").click(function() {
        $("#auswertungen").css("display", "none");
        $("#stammdaten").css("display", "block");
        $(".infoBody").css("display", "inline-block");
        $("#manuell").css("display", "none");
        $("#optionen").css("display", "none");
        mainMenuNav(this.id)
    });
    $("#erwAnlMenu, #entMenu, #enfMenu, #gsfMenu, #mgsMenu, #zpMenu, #erwPrdMenu, #grpDiagMenu").click(function() {
        $("#auswertungen").css("display", "none");
        $("#optionen").css("display", "block");
        $("#manuell").css("display", "none");
        $("#stammdaten").css("display", "none");
        mainMenuNav(this.id)
    });
    $("#extRngMenu, #intEngIMwMenu, #intBdeIMwMenu, #eRngVergleichMenu, #spaEfVTab1Menu, #spaEfVTab2Menu").click(function() {
        $("#auswertungen").css("display", "none");
        $("#manuell").css("display", "block");
        $("#optionen").css("display", "none");
        $("#stammdaten").css("display", "none");
        mainMenuNav(this.id)
    });
    $("#manMap, #orgMap, #liegMap, #berMap").click(function() {
        mapErstellen(this.id, $("#selectMap").val())
    });
    var k;
    $("#selectMap").change(function() {
        "block" == $("#infosMandanten").css("display") ? k = "manMap" : "block" == $("#infosOrganisationen").css("display") ? k = "orgMap" : "block" == $("#infosLiegenschaften").css("display") ? k = "liegMap" : "block" == $("#infosBereiche").css("display") && (k = "berMap");
        var a = $("#selectMap").val();
        mapErstellen(k, a)
    });
    $(".anlSuchen").click(function() {
        anlagenlisteErstellen()
    });
    $("#berSuchen").click(function() {
        bereichelisteErstellen()
    });
    $("#liegSuchen").click(function() {
        liegenschaftenlisteErstellen()
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
    $("#frmSuchenBerEdi").click(function() {
        var a = "";
        switch ($("#bermstmod").val()) {
        case "Kennzahl":
            a = "kennzahl";
            break;
        case "Berechnung":
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
    $("#erweiternEnfLieg").click(function() {
        energieformenEinAusblenden()
    });
    $("#formelVorfeldLeeren").click(function() {
        $("#formelVorStringDarstellung").val("")
    });
    $("#btnGruppeHinzDiag").click(function() {
        diagrammGruppeHinzuf\u00fcgen()
    });
    $("#letztePruefungPruefinformationenMsm, #pruefzyklusPruefinformationenMsm").change(function() {
        var a = $("#letztePruefungPruefinformationenMsm").val()
          , b = a.slice(-4)
          , b = parseInt(b) + parseInt($("#pruefzyklusPruefinformationenMsm").val());
        $("#naechstePruefungPruefinformationenMsm").val(a.substring(0, 6) + b)
    });
    $("#tabGipscAdm, #tabBetrGrp, #tabManGrp, #tabSAdm, #tabAdm, #tabBen, #tabMan, #tabOrg, #tabLieg, #tabExtDl, #tabStdDr, #tabBer, #tabStd, #tabBen, #tabMsm, #tabConfig, #tabDok_Msm, #tabHis_Msm, #tabAnl, #tabAnl_energie, #tabAnl_dokumente, #tabAnl_historie, #tabKnz, #tabAlm, #tabExtRechnungen, #tabIntEnergiedatenIMw, #tabIntBetriebsdatenIMw, #tabAusw_eRng_iMw, #tabSpaEfV_Tbl1, #tabSpaEfV_Tbl2, #tabZp, #tabMgs, #tabGsf, #tabEng, #tabEAnl, #tabEPrd, #tabPrd, #tabPrd_historie, #tabBerechnungsformeln, #tabVorlagenformeln, #tabSpaEfV_Tbl1,#tabSpaEfV_Tbl2, #tabVerbrauchsdatenExp, #tabLnDiag, #tabTimeCompDiag,#tabAnl_energie, #tabAnl_weitereKonfig, tabAnl_dokumente, tabAnl_historie,#tabPrd_konfig, #tabDiagKnz, #tabGrpDiag").click(function() {
        tabControlNav(this.id);
        $(".lblNeu").css("display", "none");
        $(".lblAendern").css("display", "inline")
    });
    $("#gipscAdmFirst, #betrGrpFirst, #sAdmFirst, #manGrpFirst, #admFirst, #benFirst,\n                #manFirst, #orgFirst, #liegFirst, #extDlFirst, #berFirst, #mstFirst, #stdFirst,\n                #stdDrFirst, #anlFirst, #msmFirst, #entFirst, #enfFirst, #eRngFirst, #intEngIMwFirst,\n                #intBdeIMwFirst, #eAnlFirst, #ePrdFirst, #zpFirst, #prdFirst, #knzFirst, #betrParFirst").click(function() {
        "gipscAdmFirst" == this.id ? (gipscAdmNavID = 0,
        readInstanzen(this.id, gipscAdmNavID)) : "betrGrpFirst" == this.id ? (betrGrpNavID = 0,
        $(".betrPfad").prop("selectedIndex", betrGrpNavID),
        readInstanzen(this.id, betrGrpNavID)) : "sAdmFirst" == this.id ? (sAdmNavID = 0,
        readInstanzen(this.id, sAdmNavID)) : "manGrpFirst" == this.id ? (manGrpNavID = 0,
        readInstanzen(this.id, manGrpNavID)) : "admFirst" == this.id ? (admNavID = 0,
        readInstanzen(this.id, admNavID)) : "benFirst" == this.id ? (benNavID = 0,
        readInstanzen(this.id, benNavID)) : "manFirst" == this.id ? (manNavID = 0,
        $(".manPfad").prop("selectedIndex", manNavID),
        readInstanzen(this.id, manNavID),
        organisationenEinlesen(),
        liegenschaftenEinlesen(),
        readInstanzen("orgFirst", 0)) : "orgFirst" == this.id ? (orgNavID = 0,
        $(".orgPfad").prop("selectedIndex", orgNavID),
        readInstanzen(this.id, orgNavID),
        liegenschaftenEinlesen(),
        readInstanzen("liegFirst", 0)) : "liegFirst" == this.id ? (liegNavID = 0,
        $(".liegPfad").prop("selectedIndex",liegNavID),
        readInstanzen(this.id, liegNavID),
        readInstanzen("berFirst", 0),
        readInstanzen("mstFirst", 0),
        readInstanzen("stdFirst", 0)) : "extDlFirst" == this.id ? (extDlNavID = 0,
        readInstanzen(this.id, extDlNavID)) : "berFirst" == this.id ? (mstNavID = berNavID = 0,
        readInstanzen(this.id, berNavID),
        readInstanzen("mstFirst", 0)) : "mstFirst" == this.id ? (mstNavID = 0,
        readInstanzen(this.id, mstNavID)) : "stdFirst" == this.id ? (stdNavID = 0,
        readInstanzen(this.id, stdNavID)) : "stdDrFirst" == this.id ? (stdDrNavID = 0,
        readInstanzen(this.id, stdDrNavID)) : "anlFirst" == this.id ? (anlNavID = 0,
        readInstanzen(this.id, anlNavID)) : "msmFirst" == this.id ? (msmNavID = 0,
        readInstanzen(this.id, msmNavID)) : "prdFirst" == this.id ? (prdNavID = 0,
        readInstanzen(this.id, prdNavID)) : "entFirst" == this.id ? (entNavID = 0,
        readInstanzen(this.id, entNavID),
        $("#modusVers").val("alt")) : "enfFirst" == this.id ? (enfNavID = 0,
        readInstanzen(this.id, enfNavID)) : "eRngFirst" == this.id ? (eRngNavID = 0,
        readInstanzen(this.id, eRngNavID)) : "intEngIMwFirst" == this.id ? (f = 0,
        readInstanzen(this.id, f)) : "intBdeIMwFirst" == this.id ? (g = 0,
        readInstanzen(this.id, g)) : "eAnlFirst" == this.id ? (eAnlNavID = 0,
        readInstanzen(this.id, eAnlNavID)) : "ePrdFirst" == this.id ? (ePrdNavID = 0,
        readInstanzen(this.id, ePrdNavID)) : "zpFirst" == this.id ? (zpNavID = 0,
        readInstanzen(this.id, zpNavID)) : "knzFirst" == this.id ? (knzNavID = 0,
        readInstanzen(this.id, knzNavID)) : "betrParFirst" == this.id && (betrParNavID = 0,
        readInstanzen(this.id, betrParNavID));
        b = !1;
        $(".lblNeu").css("display", "none");
        $(".lblAendern").css("display", "inline")
    });
    $("#gipscAdmPrevious, #betrGrpPrevious,#sAdmPrevious,#manGrpPrevious,#admPrevious,\n                    #benPrevious,#manPrevious, #orgPrevious, #liegPrevious, #extDlPrevious, #berPrevious,\n                    #mstPrevious, #stdPrevious, #stdDrPrevious, #anlPrevious, #msmPrevious, #entPrevious,\n                    #enfPrevious, #eRngPrevious, #intEngIMwPrevious, #intBdeIMwPrevious, #eAnlPrevious,\n                    #ePrdPrevious, #zpPrevious, #prdPrevious, #knzPrevious, #betrParPrevious").click(function() {
        "gipscAdmPrevious" == this.id ? 0 < gipscAdmNavID && (gipscAdmNavID--,
        readInstanzen(this.id, gipscAdmNavID)) : "betrGrpPrevious" == this.id ? 0 < betrGrpNavID && (betrGrpNavID--,
        $(".betrPfad").prop("selectedIndex", betrGrpNavID),
        readInstanzen(this.id, betrGrpNavID)) : "sAdmPrevious" == this.id ? 0 < sAdmNavID && (sAdmNavID--,
        readInstanzen(this.id, sAdmNavID)) : "manGrpPrevious" == this.id ? 0 < manGrpNavID && (manGrpNavID--,
        readInstanzen(this.id, manGrpNavID)) : "admPrevious" == this.id ? 0 < admNavID && (admNavID--,
        readInstanzen(this.id, admNavID)) : "benPrevious" == this.id ? 0 < benNavID && (benNavID--,
        readInstanzen(this.id, benNavID)) : "manPrevious" == this.id ? 0 < manNavID && (manNavID--,
        $(".manPfad").prop("selectedIndex", manNavID),
        readInstanzen(this.id, manNavID),
        setTimeout(function() {
            organisationenEinlesen()
        }, 1500),
        setTimeout(function() {
            liegenschaftenEinlesen()
        }, 2E3),
        readInstanzen("orgFirst", 0)) : "orgPrevious" == this.id ? 0 < orgNavID && (orgNavID--,
        $(".orgPfad").prop("selectedIndex", orgNavID--),
        readInstanzen(this.id, orgNavID),
        liegenschaftenEinlesen(),
        readInstanzen("liegFirst", 0)) : "liegPrevious" == this.id ? 0 < liegNavID && (liegNavID--,
        $(".liegPfad").prop("selectedIndex", liegNavID),
        readInstanzen(this.id, liegNavID),
        readInstanzen("berFirst", 0),
        readInstanzen("mstFirst", 0),
        readInstanzen("stdFirst", 0)) : "extDlPrevious" == this.id ? 0 < extDlNavID && (extDlNavID--,
        readInstanzen(this.id, extDlNavID)) : "berPrevious" == this.id ? 0 < berNavID && (berNavID--,
        mstNavID = 0,
        readInstanzen(this.id, berNavID),
        clearFields("mstHinz"),
        readInstanzen("mstFirst", 0),
        readInstanzen(this.id, berNavID)) : "mstPrevious" == this.id ? 0 < mstNavID && (mstNavID--,
        readInstanzen(this.id, mstNavID)) : "stdPrevious" == this.id ? 0 < stdNavID && (stdNavID--,
        readInstanzen(this.id, stdNavID)) : "stdDrPrevious" == this.id ? 0 < stdDrNavID && (stdDrNavID--,
        readInstanzen(this.id, stdDrNavID)) : "anlPrevious" == this.id ? 0 < anlNavID && (anlNavID--,
        readInstanzen(this.id, anlNavID)) : "msmPrevious" == this.id ? 0 < msmNavID && (msmNavID--,
        readInstanzen(this.id, msmNavID)) : "prdPrevious" == this.id ? 0 < prdNavID && (prdNavID--,
        readInstanzen(this.id, prdNavID)) : "entPrevious" == this.id ? 0 < entNavID && (entNavID--,
        readInstanzen(this.id, entNavID),
        $("#modusVers").val("alt")) : "enfPrevious" == this.id ? 0 < enfNavID && (enfNavID--,
        readInstanzen(this.id, enfNavID)) : "eRngPrevious" == this.id ? 0 < eRngNavID && (eRngNavID--,
        readInstanzen(this.id, eRngNavID)) : "intEngIMwPrevious" == this.id ? 0 < f && (f--,
        readInstanzen(this.id, f)) : "intBdeIMwPrevious" == this.id ? 0 < g && (g--,
        readInstanzen(this.id, g)) : "eAnlPrevious" == this.id ? 0 < eAnlNavID && (eAnlNavID--,
        readInstanzen(this.id, eAnlNavID)) : "ePrdPrevious" == this.id ? 0 < ePrdNavID && (ePrdNavID--,
        readInstanzen(this.id, ePrdNavID)) : "zpPrevious" == this.id ? 0 < zpNavID && (zpNavID--,
        readInstanzen(this.id, zpNavID)) : "knzPrevious" == this.id ? 0 < knzNavID && (knzNavID--,
        readInstanzen(this.id, knzNavID)) : "betrParPrevious" == this.id && 0 < betrParNavID && (betrParNavID--,
        readInstanzen(this.id, betrParNavID));
        b = !1;
        $(".lblNeu").css("display", "none");
        $(".lblAendern").css("display", "inline")
    });
    $("#gipscAdmNext, #betrGrpNext,#sAdmNext,#manGrpNext,#admNext,#benNext,#manNext,\n                        #orgNext, #liegNext, #extDlNext, #berNext, #mstNext, #stdNext, #stdDrNext,\n                        #anlNext, #msmNext, #entNext, #enfNext, #eRngNext, #intEngIMwNext, #intBdeIMwNext,\n                        #eAnlNext, #ePrdNext, #zpNext, #prdNext, #knzNext, #betrParNext").click(function() {
        "gipscAdmNext" == this.id ? gipscAdmNavID < $("#gipscAdmCount").val() - 1 && (gipscAdmNavID++,
        readInstanzen(this.id, gipscAdmNavID)) : "betrGrpNext" == this.id ? betrGrpNavID < $("#betrGrpCount").val() - 1 && (betrGrpNavID++,
        $(".betrPfad").prop("selectedIndex", betrGrpNavID),
        readInstanzen(this.id, betrGrpNavID)) : "sAdmNext" == this.id ? sAdmNavID < $("#sAdmCount").val() - 1 && (sAdmNavID++,
        readInstanzen(this.id, sAdmNavID)) : "manGrpNext" == this.id ? manGrpNavID < $("#manGrpCount").val() - 1 && (manGrpNavID++,
        readInstanzen(this.id, manGrpNavID)) : "admNext" == this.id ? admNavID < $("#admCount").val() - 1 && (admNavID++,
        readInstanzen(this.id, admNavID)) : "benNext" == this.id ? benNavID < $("#benCount").val() - 1 && (benNavID++,
        readInstanzen(this.id, benNavID)) : "manNext" == this.id ? manNavID < $("#manCount").val() - 1 && (manNavID++,
        $(".manPfad").prop("selectedIndex", manNavID),
        readInstanzen(this.id, manNavID),
        organisationenEinlesen(),
        liegenschaftenEinlesen(),
        readInstanzen("orgFirst", 0)) : "orgNext" == this.id ? orgNavID < $("#orgCount").val() - 1 && (orgNavID++,
        $(".orgPfad").prop("selectedIndex", orgNavID),
        readInstanzen(this.id, orgNavID),
        liegenschaftenEinlesen(),
        readInstanzen("liegFirst", 0)) : "liegNext" == this.id ? liegNavID < $("#liegCount").val() - 1 && (liegNavID++,
        $(".liegPfad").prop("selectedIndex", liegNavID),
        readInstanzen(this.id, liegNavID),
        readInstanzen("berFirst", 0),
        readInstanzen("mstFirst", 0),
        readInstanzen("stdFirst", 0)) : "extDlNext" == this.id ? extDlNavID < $("#extDlCount").val() - 1 && (extDlNavID++,
        readInstanzen(this.id, extDlNavID)) : "berNext" == this.id ? berNavID < $("#berCount").val() - 1 && (berNavID++,
        mstNavID = 0,
        readInstanzen(this.id, berNavID),
        clearFields("mstHinz"),
        readInstanzen("mstFirst", 0)) : "mstNext" == this.id ? mstNavID < $("#mstCount").val() - 1 && (mstNavID++,
        readInstanzen(this.id, mstNavID)) : "stdNext" == this.id ? stdNavID < $("#stdCount").val() - 1 && (stdNavID++,
        readInstanzen(this.id, stdNavID)) : "stdDrNext" == this.id ? stdDrNavID < $("#stdDrCount").val() - 1 && (stdDrNavID++,
        readInstanzen(this.id, stdDrNavID)) : "anlNext" == this.id ? anlNavID < $("#anlCount").val() - 1 && (anlNavID++,
        readInstanzen(this.id, anlNavID)) : "msmNext" == this.id ? msmNavID < $("#msmCount").val() - 1 && (msmNavID++,
        readInstanzen(this.id, msmNavID)) : "prdNext" == this.id ? prdNavID < $("#prdCount").val() - 1 && (prdNavID++,
        readInstanzen(this.id, prdNavID)) : "entNext" == this.id ? entNavID < $("#entCount").val() - 1 && (entNavID++,
        readInstanzen(this.id, entNavID),
        $("#modusVers").val("alt")) : "enfNext" == this.id ? enfNavID < $("#enfCount").val() - 1 && (enfNavID++,
        readInstanzen(this.id, enfNavID)) : "eRngNext" == this.id ? eRngNavID < $("#eRngCount").val() - 1 && (eRngNavID++,
        readInstanzen(this.id, eRngNavID)) : "intEngIMwNext" == this.id ? f < $("#intEngIMwCount").val() - 1 && (f++,
        readInstanzen(this.id, f)) : "intBdeIMwNext" == this.id ? g < $("#intBdeIMwCount").val() - 1 && (g++,
        readInstanzen(this.id, g)) : "eAnlNext" == this.id ? eAnlNavID < $("#eAnlCount").val() - 1 && (eAnlNavID++,
        readInstanzen(this.id, eAnlNavID)) : "ePrdNext" == this.id ? ePrdNavID < $("#ePrdCount").val() - 1 && (ePrdNavID++,
        readInstanzen(this.id, ePrdNavID)) : "zpNext" == this.id ? zpNavID < $("#zpCount").val() - 1 && (zpNavID++,
        readInstanzen(this.id, zpNavID)) : "knzNext" == this.id ? knzNavID < $("#knzInsCount").val() - 1 && (knzNavID++,
        readInstanzen(this.id, knzNavID)) : "betrParNext" == this.id && betrParNavID < $("#betrParCount").val() - 1 && (betrParNavID++,
        readInstanzen(this.id, betrParNavID));
        b = !1;
        $(".lblNeu").css("display", "none");
        $(".lblAendern").css("display", "inline")
    });
    $("#gipscAdmLast, #betrGrpLast,#sAdmLast,#manGrpLast,#admLast,#benLast,#manLast,\n                            #orgLast, #liegLast, #extDlLast, #berLast, #mstLast, #stdLast, #stdDrLast,\n                            #anlLast, #msmLast, #entLast, #enfLast, #eRngLast, #intEngIMwLast, #intBdeIMwLast,\n                            #eAnlLast, #ePrdLast, #zpLast, #prdLast, #knzLast, #betrParLast").click(function() {
        "gipscAdmLast" == this.id ? (gipscAdmNavID = $("#gipscAdmCount").val() - 1,
        readInstanzen(this.id, gipscAdmNavID)) : "betrGrpLast" == this.id ? (betrGrpNavID = $("#betrGrpCount").val() - 1,
        $(".betrPfad").prop("selectedIndex", betrGrpNavID),
        readInstanzen(this.id, betrGrpNavID)) : "sAdmLast" == this.id ? (sAdmNavID = $("#sAdmCount").val() - 1,
        readInstanzen(this.id, sAdmNavID)) : "manGrpLast" == this.id ? (manGrpNavID = $("#manGrpCount").val() - 1,
        readInstanzen(this.id, manGrpNavID)) : "admLast" == this.id ? (admNavID = $("#admCount").val() - 1,
        readInstanzen(this.id, admNavID)) : "benLast" == this.id ? (benNavID = $("#benCount").val() - 1,
        readInstanzen(this.id, benNavID)) : "manLast" == this.id ? (manNavID = $("#manCount").val() - 1,
        $(".manPfad").prop("selectedIndex", manNavID),
        readInstanzen(this.id, manNavID),
        organisationenEinlesen(),
        liegenschaftenEinlesen(),
        readInstanzen("orgFirst", 0)) : "orgLast" == this.id ? (orgNavID = $("#orgCount").val() - 1,
        $(".orgPfad").prop("selectedIndex", orgNavID),
        readInstanzen(this.id, orgNavID),
        liegenschaftenEinlesen(),
        readInstanzen("liegFirst", 0)) : "liegLast" == this.id ? (liegNavID = $("#liegCount").val() - 1,
        $(".liegPfad").prop("selectedIndex", liegNavID),
        readInstanzen(this.id, liegNavID),
        readInstanzen("berFirst", 0),
        readInstanzen("mstFirst", 0)) : "extDlLast" == this.id ? (extDlNavID = $("#extDlCount").val() - 1,
        readInstanzen(this.id, extDlNavID)) : "berLast" == this.id ? (berNavID = $("#berCount").val() - 1,
        mstNavID = 0,
        readInstanzen(this.id, berNavID),
        clearFields("mstHinz"),
        readInstanzen("mstFirst", 0)) : "mstLast" == this.id ? (mstNavID = $("#mstCount").val() - 1,
        readInstanzen(this.id, mstNavID)) : "stdLast" == this.id ? (stdNavID = $("#stdCount").val() - 1,
        readInstanzen(this.id, stdNavID)) : "stdDrLast" == this.id ? (stdDrNavID = $("#stdDrCount").val() - 1,
        readInstanzen(this.id, stdDrNavID)) : "anlLast" == this.id ? (anlNavID = $("#anlCount").val() - 1,
        readInstanzen(this.id, anlNavID)) : "msmLast" == this.id ? (msmNavID = $("#msmCount").val() - 1,
        readInstanzen(this.id, msmNavID)) : "prdLast" == this.id ? (prdNavID = $("#prdCount").val() - 1,
        readInstanzen(this.id, prdNavID)) : "entLast" == this.id ? (entNavID = $("#entCount").val() - 1,
        enfNavID = 0,
        readInstanzen(this.id, entNavID),
        clearFields("enfHinz"),
        readInstanzen("enfFirst", 0),
        $("#modusVers").val("alt")) : "enfLast" == this.id ? (enfNavID = $("#enfCount").val() - 1,
        readInstanzen(this.id, enfNavID)) : "eRngLast" == this.id ? (eRngNavID = $("#eRngCount").val() - 1,
        readInstanzen(this.id, eRngNavID)) : "intEngIMwLast" == this.id ? (f = $("#intEngIMwCount").val() - 1,
        readInstanzen(this.id, f)) : "intBdeIMwLast" == this.id ? (g = $("#intBdeIMwCount").val() - 1,
        readInstanzen(this.id, g)) : "eAnlLast" == this.id ? (eAnlNavID = $("#eAnlCount").val() - 1,
        readInstanzen(this.id, eAnlNavID)) : "ePrdLast" == this.id ? (ePrdNavID = $("#ePrdCount").val() - 1,
        readInstanzen(this.id, ePrdNavID)) : "zpLast" == this.id ? (zpNavID = $("#zpCount").val() - 1,
        readInstanzen(this.id, zpNavID)) : "knzLast" == this.id ? (knzNavID = $("#knzInsCount").val() - 1,
        readInstanzen(this.id, knzNavID)) : "betrParLast" == this.id && (betrParNavID = $("#betrParCount").val() - 1,
        readInstanzen(this.id, betrParNavID));
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
        $("#masseneingabeTimeInterval").val() == TimeInterval.DAY ? a = "#btnTageMasseneingabeIMw" : $("#masseneingabeTimeInterval").val() == TimeInterval.WEEK ? a = "#btnWochenMasseneingabeIMw" : $("#masseneingabeTimeInterval").val() == TimeInterval.MONTH ? a = "#btnMonateMasseneingabeIMw" : $("#masseneingabeTimeInterval").val() == TimeInterval.YEAR && (a = "#btnJahreMasseneingabeIMw");
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
            a = TimeInterval.MONTH;
            break;
        case "btnJahreMasseneingabeIMw":
            a = TimeInterval.YEAR
        }
        masseneingabeZeitintervallAendern(a)
    });
    $("#masseneingabeSpeichern").click(function() {
        ME.saveToDB()
    });
    $("#masseneingabeLaden").click(function() {
        ME.loadFromDB()
    });
    $("#masseneingabeInputIMw").scroll(function() {
        $("#masseneingabeNameIMw").css("margin-top", -1 * $("#masseneingabeInputIMw").scrollTop()).css("padding-bottom", $("#masseneingabeInputIMw").scrollTop());
        $("#masseneingabeZeitintervallIMw").scrollLeft($("#masseneingabeInputIMw").scrollLeft());
        var a = $("#masseneingabeZeitintervallContainerIMw").position().top + $("#masseneingabeZeitintervallContainerIMw").height() - $("#masseneingabeNameIMw input").position().top
          , a = a / 10.5;
        $("#masseneingabeNameIMw input").css("visibility", "visible");
        for (var b = 1; b < Math.floor(a) + 1; b++)
            $("#masseneingabeNameIMw input:nth-child(" + b + ")").css("visibility", "hidden")
    });
    $("#bermstmod").change(function() {
        "Berechnung" == this.value ? ($(".berFormel").css("display", "block"),
        $(".knzFormel").css("display", "none"),
        $("#formelSuchenTyp").val("mst")) : "Kennzahl" == this.value ? ($(".berFormel").css("display", "none"),
        $(".knzFormel").css("display", "block"),
        $("#formelSuchenTyp").val("knz")) : logToConsole('$("#bermstmod").change()', "ERROR", "Something went wrong!")
    });
    $("#formelfeldLeeren").click(function() {
        $("#formelStringDarstellung, #formelIdDarstellung, #berechneteMstName, #berechneteMstID").val("")
    });
    $("#mstBezugstabelleBerLogik, #iMwBezugstabelleBerLogik, #bdeBezugstabelleBerLogik").click(function() {
        "mstBezugstabelleBerLogik" == this.id ? ($("#tblIMwContainer").hide(),
        $("#tblMstContainer").show()) : "iMwBezugstabelleBerLogik" == this.id ? ($("#tblIMwContainer").show(),
        $("#tblMstContainer").hide()) : "bdeBezugstabelleBerLogik" == this.id && ($("#tblBetriebsdatenBerechnungseditor").show().parents("div.dataTables_wrapper").first().show(),
        $("#tblMessstellenBerechnungseditor, #tblInterneMesswerteBerechnungseditor").parents("div.dataTables_wrapper").first().hide(),
        $("#tblMessstellenBerechnungseditor").css("display", "none"),
        tblBetriebsdatenBerechnungseditor.draw())
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
    $(".betrPfad").change(function() {
        $(".betrPfad").val($(this).val());
        $("#betrGrpID").val(betrGrpListe[$(".betrPfad").prop("selectedIndex")].betrGrpID);
        readInstanzen("betrGrpFirst", $(".betrPfad").prop("selectedIndex"));
        readInstanzen("sAdmFirst", 0);
        readInstanzen("manGrpFirst", 0);
        manGrpEinlesen();
        readInstanzen("admFirst", 0);
        readInstanzen("benFirst", 0)
    });
    $(".manGrpPfad").change(function() {
        $(".manGrpPfad").val($(this).val());
        var a = $(".manGrpPfad  option").eq($(".manGrpPfad").prop("selectedIndex")).prop("id").split("_");
        $("#manOderManGrp").val(a[0]);
        if ("optManGrp" == a[0])
            $("#manGrpID").val(manGrpListe[a[1]].manGrpID),
            readInstanzen("manGrpFirst", $(".manGrpPfad").prop("selectedIndex"));
        else
            for (a = manGrpListe.length == mandantenliste.length ? $(".manGrpPfad").prop("selectedIndex") : $(".manGrpPfad").prop("selectedIndex") - manGrpListe.length,
            $("#manRechteID").val(mandantenliste[a].manID),
            n = 0; n < mandantenliste.length; n++)
                ;
        readInstanzen("admFirst", 0);
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
        externeRechnungenListeErstellen("vergleich")
    });
    $(".orgPfad").change(function() {
        orgPfadChange(this)
    });
    $(".liegPfad").change(function() {
        liegPfadChange(this)
    });
    $("#gipscAdmHinz, #betrGrpHinz, #sAdmHinz, #manGrpHinz, #admHinz, #benHinz, #manHinz, #orgHinz, #liegHinz, #extDlHinz, #berHinz, #mstHinz, #stdHinz, #stdDrHinz, #anlHinz, #msmHinz, #entHinz, #enfHinz, #eRngHinz, #iMwHinz, #eAnlHinz, #ePrdHinz, #prdHinz, #zpHinz, #knzHinz").click(function() {
        clearFields(this.id);
        b = !0
    });
    $("#gipscAdmSpeichern, #betrGrpSpeichern, #sAdmSpeichern, #manGrpSpeichern,\n                                #admSpeichern, #benSpeichern, #manSpeichern, #orgSpeichern, #liegSpeichern,\n                                #extDlSpeichern, #berSpeichern, #benSpeichern, #mstSpeichern, #stdSpeichern,\n                                #stdDrSpeichern,  #anlSpeichern, #anlSpeichernHist, #msmSpeichern,\n                                #entSpeichern, #enfSpeichern, #eRngSpeichern, #intEngIMwSpeichern,\n                                #intBdeIMwSpeichern, #eAnlSpeichern, #zpSpeichern, #ePrdSpeichern,\n                                #prdSpeichern, #knzSpeichern, #betrParSpeichern, #grpDiagSpeichern").click(function() {
        "gipscAdmSpeichern" == this.id ? 1 == b ? (instanzErstellen(this.id),
        b = !1) : 0 == b ? instanzSpeichern(this.id) : ($("#meldung").css("display", "block"),
        $("#meldung").dialog({
            title: "Meldung!"
        })) : "betrGrpSpeichern" == this.id ? "" != $("#firmaBetrGrp").val() && 1 == b ? (instanzErstellen(this.id),
        b = !1) : "" != $("#firmaBetrGrp").val() && 0 == b ? instanzSpeichern(this.id) : ($("#meldung").css("display", "block"),
        $("#meldung").dialog({
            title: "Meldung!"
        })) : "sAdmSpeichern" == this.id ? "" != $("#nameSAdm").val() && 1 == b ? (instanzErstellen(this.id),
        b = !1) : "" != $("#nameSAdm").val() && 0 == b ? instanzSpeichern(this.id) : ($("#meldung").css("display", "block"),
        $("#meldung").dialog({
            title: "Meldung!"
        })) : "manGrpSpeichern" == this.id ? "" != $("#nameManGrp").val() && 1 == b ? (instanzErstellen(this.id),
        b = !1) : "" != $("#nameManGrp").val() && 0 == b ? instanzSpeichern(this.id) : ($("#meldung").css("display", "block"),
        $("#meldung").dialog({
            title: "Meldung!"
        })) : "admSpeichern" == this.id ? "" != $("#nameAdm").val() && 1 == b ? (instanzErstellen(this.id),
        b = !1) : "" != $("#nameAdm").val() && 0 == b ? instanzSpeichern(this.id) : ($("#meldung").css("display", "block"),
        $("#meldung").dialog({
            title: "Meldung!"
        })) : "benSpeichern" == this.id ? "" != $("#nameBen").val() && 1 == b ? (instanzErstellen(this.id),
        b = !1) : "" != $("#nameBen").val() && 0 == b ? instanzSpeichern(this.id) : ($("#meldung").css("display", "block"),
        $("#meldung").dialog({
            title: "Meldung!"
        })) : "manSpeichern" == this.id ? "" != $("#nameAllgemeinMan").val() && 1 == b ? (instanzErstellen(this.id),
        mandantenEinlesen($("#betrGrpID").val(), "man_ID", $("#manID").val()),
        $(".manPfad").prop("selectedIndex", mandantenliste.length - 1),
        b = !1) : "" != $("#nameAllgemeinMan").val() && 0 == b ? (instanzSpeichern(this.id),
        $(".manPfad").prop("selectedIndex", manNavID)) : ($("#meldung").css("display", "block"),
        $("#meldung").dialog({
            title: "Meldung!"
        })) : "orgSpeichern" == this.id ? "" != $("#nameAllgemeinOrg").val() && 1 == b ? (instanzErstellen(this.id),
        b = !1) : "" != $("#nameAllgemeinOrg").val() && 0 == b ? instanzSpeichern(this.id) : ($("#meldung").css("display", "block"),
        $("#meldung").dialog({
            title: "Meldung!"
        })) : "liegSpeichern" == this.id ? "" != $("#nameAllgemeinLieg").val() && 1 == b ? (instanzErstellen(this.id),
        b = !1) : "" != $("#nameAllgemeinLieg").val() && 0 == b ? instanzSpeichern(this.id) : ($("#meldung").css("display", "block"),
        $("#meldung").dialog({
            title: "Meldung!"
        })) : "extDlSpeichern" == this.id ? "" != $("#nameExtDl").val() && 1 == b ? (instanzErstellen(this.id),
        b = !1) : "" != $("#nameExtDl").val() && 0 == b ? instanzSpeichern(this.id) : ($("#meldung").css("display", "block"),
        $("#meldung").dialog({
            title: "Meldung!"
        })) : "berSpeichern" == this.id ? "" != $("#nameAllgemeinBer").val() && 1 == b ? (instanzErstellen(this.id),
        berNavID = $("#berCount").val(),
        b = !1) : "" != $("#nameAllgemeinBer").val() && 0 == b ? instanzSpeichern(this.id) : ($("#meldung").css("display", "block"),
        $("#meldung").dialog({
            title: "Meldung!"
        })) : "mstSpeichern" == this.id ? "" != $("#nameMst").val() && 1 == b ? (instanzErstellen(this.id),
        b = !1) : "" != $("#nameAllgemeinMst").val() && 0 == b ? instanzSpeichern(this.id) : ($("#meldung").css("display", "block"),
        $("#meldung").dialog({
            title: "Meldung!"
        })) : "stdSpeichern" == this.id ? "" != $("#nameStd").val() && 1 == b ? (instanzErstellen(this.id),
        b = !1) : "" != $("#nameStd").val() && 0 == b ? instanzSpeichern(this.id) : ($("#meldung").css("display", "block"),
        $("#meldung").dialog({
            title: "Meldung!"
        })) : "stdDrSpeichern" == this.id ? "" != $("#nameStdDr").val() && 1 == b ? (instanzErstellen(this.id),
        b = !1) : "" != $("#nameStdDr").val() && 0 == b ? instanzSpeichern(this.id) : ($("#meldung").css("display", "block"),
        $("#meldung").dialog({
            title: "Meldung!"
        })) : "anlSpeichern" == this.id ? "" != $("#nummerAllgemeinAnl").val() && 1 == b ? ($("#archiviertAnl").val(!1),
        instanzErstellen(this.id),
        b = !1) : "" != $("#nummerAllgemeinAnl").val() && 0 == b ? $("#historyOrNot").dialog({
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
                    $("#histSpeichern, #histNichtSpeichern").css("display", "inline");
                    $("#infosBemerkungHist input").val("");
                    $("#historyOrNot").dialog("close")
                })
            },
            close: function() {
                $("#infosBemerkungHist input").val("");
                $("#infosBemerkungHist, #histOk").css("display", "none");
                $("#histSpeichern, #histNichtSpeichern").css("display", "inline")
            }
        }) : ($("#meldung").css("display", "block"),
        $("#meldung").dialog({
            title: "Meldung!"
        })) : "anlSpeichernHist" == this.id ? "" != $("#nummerAllgemeinAnl").val() && 1 == b ? ($("#archiviertAnl").val(!1),
        instanzErstellen(this.id),
        b = !1) : "" != $("#nummerAllgemeinAnl").val() && 0 == b ? ($("#archiviertAnl").val(!0),
        instanzSpeichern(this.id)) : ($("#meldung").css("display", "block"),
        $("#meldung").dialog({
            title: "Meldung!"
        })) : "msmSpeichern" == this.id ? "" != $("#messmittelNrAllgemeinMsm").val() && 1 == b ? (lastNav.setReturnValues([$("#bezeichnungAllgemeinMsm").val()]),
        instanzErstellen(this.id),
        b = !1,
        lastNav.jump()) : "" != $("#messmittelNrAllgemeinMsm").val() && 0 == b ? (lastNav.setReturnValues([$("#bezeichnungAllgemeinMsm").val()]),
        instanzSpeichern(this.id),
        lastNav.jump()) : ($("#meldung").css("display", "block"),
        $("#meldung").dialog({
            title: "Meldung!"
        })) : "entSpeichern" == this.id ? "" != $("#nameEnt").val() && 1 == b ? (lastNav.setReturnValues([$("#nameEnt").val()]),
        instanzErstellen(this.id),
        b = !1,
        energietrInDBoxLieg(),
        lastNav.jump()) : "" != $("#nameEnt").val() && 0 == b ? (lastNav.setReturnValues([$("#nameEnt").val()]),
        instanzSpeichern(this.id),
        energietrInDBoxLieg(),
        lastNav.jump()) : ($("#meldung").css("display", "block"),
        $("#meldung").dialog({
            title: "Meldung!"
        })) : "enfSpeichern" == this.id ? "" != $("#nameEnf").val() && 1 == b ? (instanzErstellen(this.id),
        b = !1,
        energiefrmInDBoxLieg()) : "" != $("#nameEnf").val() && 0 == b ? (instanzSpeichern(this.id),
        energiefrmInDBoxLieg()) : ($("#meldung").css("display", "block"),
        $("#meldung").dialog({
            title: "Meldung!"
        })) : "eRngSpeichern" == this.id ? "" != $("#nrERng").val() && 1 == b ? (instanzErstellen(this.id),
        b = !1) : "" != $("#nrERng").val() && 0 == b ? instanzSpeichern(this.id) : ($("#meldung").css("display", "block"),
        $("#meldung").dialog({
            title: "Meldung!"
        })) : "intEngIMwSpeichern" == this.id ? instanzSpeichern(this.id) : "intBdeIMwSpeichern" == this.id ? instanzSpeichern(this.id) : "eAnlSpeichern" == this.id ? 1 == b ? (instanzErstellen(this.id),
        b = !1) : 0 == b ? instanzSpeichern(this.id) : ($("#meldung").css("display", "block"),
        $("#meldung").dialog({
            title: "Meldung!"
        })) : "ePrdSpeichern" == this.id ? 1 == b ? (instanzErstellen(this.id),
        b = !1) : 0 == b ? instanzSpeichern(this.id) : ($("#meldung").css("display", "block"),
        $("#meldung").dialog({
            title: "Meldung!"
        })) : "grpDiagSpeichern" == this.id ? 1 == b ? (instanzErstellen(this.id),
        b = !1) : 0 == b ? instanzSpeichern(this.id) : ($("#meldung").css("display", "block"),
        $("#meldung").dialog({
            title: "Meldung!"
        })) : "prdSpeichern" == this.id ? 1 == b ? ($("#archiviertPrd").val(!1),
        instanzErstellen(this.id, "neueGrp"),
        b = !1) : 0 == b ? $("#historyOrNot").dialog({
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
                $("#histSpeichern, #histNichtSpeichern").css("display", "inline")
            }
        }) : ($("#meldung").css("display", "block"),
        $("#meldung").dialog({
            title: "Meldung!"
        })) : "knzSpeichern" == this.id ? 1 == b ? (instanzErstellen(this.id),
        b = !1) : 0 == b ? instanzSpeichern(this.id) : ($("#meldung").css("display", "block"),
        $("#meldung").dialog({
            title: "Meldung!"
        })) : "zpSpeichern" == this.id ? 1 == b ? (instanzErstellen(this.id),
        b = !1) : 0 == b ? instanzSpeichern(this.id) : ($("#meldung").css("display", "block"),
        $("#meldung").dialog({
            title: "Meldung!"
        })) : "betrParSpeichern" == this.id && (1 == b ? (instanzErstellen(this.id),
        b = !1) : 0 == b ? alert("Um die G\u00fcltigkeit bereits erstellter Formeln zu garantieren,\nist der '\u00c4ndern-Modus' hier deaktiviert!") : ($("#meldung").css("display", "block"),
        $("#meldung").dialog({
            title: "Meldung!"
        })))
    });
    $("#orgLoeschen, #liegLoeschen, #extDlLoeschen, #berLoeschen,#mstLoeschen, #stdLoeschen, #stdDrLoeschen, #anlLoeschen,#msmLoeschen, #eRngLoeschen, #zpLoeschen, #eAnlLoeschen").click(function() {
        fensterLoeschenmeldung(this.id)
    })
});


/*$(".berDialogSchlButton").click(function(){
	var id=$(this).attr('id');
        $("#"+id).dialog("close")
    });*/


	$(".berDialogSchlButton").click(function(){
        $("#messmittelSuchenContainer").dialog("close")
    	});

	$(".berDialogSchlButton3").click(function(){
        $("#bereichListeContainer").dialog("close")
    	});

	$(".berDialogSchlButton1").click(function(){
        $("#messstellenAuswahlContainer").dialog("close")
    	});
	
	$(".berDialogSchlButton4").click(function(){
        $("#messstellenSuchenContainer").dialog("close")
    	});

	$(".berDialogSchlButton5").click(function(){
        $("#messmittelAuswahlContainer").dialog("close")
    	});
	
	$(".berDialogSchlButton6").click(function(){
        $("#formelnAuswahlContainer").dialog("close")
    	});
	
	$(".berDialogSchlButton2").click(function(){
        $("#ChannellisteContainer").dialog("close")
    	});
	
	$(".berDialogSchlButton7").click(function(){
        $("#externeRechnungenSuchenContainer").dialog("close")
    	}); 

	$(".anlDialogSchlButton").click(function(){
	$("#anlListeContainer").dialog("close")
	});

	$(".berDialogButton").click(function(){
	$("#bereichSuchenContainer").dialog("close")
	});

	
/*Click event for search spies 21-01-2020*/
$(".orgSuchenSpies").click(function() {
        spiesOrganisationenSearch(this.id);
        
});