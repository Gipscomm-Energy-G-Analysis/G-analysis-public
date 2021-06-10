

//Ajax Call for the Manuel module serach 16-03-2020
/*mm-new-start*/
/*new-mm-start 26-03-2021*/
function tblAnlPrdktOhneZeitintervallIMwSuchenMethod() {
    $("#tblAnlPrdktMStOhneZeitintervallIMwSearchContainer").css("display", "block");
    /*new-mm-start*/
    //$('#searchImgBtnShowRecordsAnlBtn').show();
    // $('#searchImgBtnShowRecordsAnlBtn').val('1');
    $('#searchImgBtnShowRecordsPrdktAnlMstBtnDiv').show();
    $('#tblMstOhneZeitintervallIMwPrdktSuche_wrapper').show();
    $('#tblMstOhneZeitintervallIMwMessstelleSuche_wrapper').hide();
    var iBdeType = $("input[name='searchImgBetriebsdatenFilter']:checked").val();
    /*new-mm-end*/
    $("#tblAnlPrdktMStOhneZeitintervallIMwSearchContainer").dialog({
        height: $(window).height() - .125 * $(window).height(),
        width: $(window).width() - .125 * $(window).width(),
        resize: "auto",
        show: {
            effect: "fade",
            duration: 300
        },
        hide: {
            effect: "fade",
            duration: 300
        }
    });
    /*new-mm-start 26-03-2021*/
    if(iBdeType == 1){
        $("#tblMstOhneZeitintervallIMwPrdktSuche_wrapper").show();
        $("#tblMstOhneZeitintervallIMwMessstelleSuche_wrapper").hide();
        searchImgprodukteAnlargeDataTable();
    }
    else if(iBdeType == 2){
        $("#tblMstOhneZeitintervallIMwPrdktSuche_wrapper").hide();
        $("#tblMstOhneZeitintervallIMwMessstelleSuche_wrapper").show();
        searchImgMesssetelleIntBDE("2");
    }
    else{
        $("#tblMstOhneZeitintervallIMwPrdktSuche_wrapper").show();
        $("#tblMstOhneZeitintervallIMwMessstelleSuche_wrapper").hide();
        searchImgprodukteAnlargeDataTable();
    }
    /*new-mm-end 26-03-2021*/
}
/*new-mm-end 26-03-2021*/
/*mm-new-end*/
//30-09-2020 dynamic function for validations #zeitintervallAnl
function validateZeitintervallAnlSelectOpt(start,end,zeitintervallAnl,sId,id){
    var startDate = new Date(start);
    var endDate = new Date(end);
    if(zeitintervallAnl == 1){
        /*new-mm-start 07-04-2021*/
        var startarr = start.split('.');
        var endarr = end.split('.');
        startDate = new Date(startarr[2],startarr[1]-1,startarr[0]);
        endDate = new Date(endarr[2],endarr[1]-1,endarr[0]);
        /*new-mm-start 07-04-2021*/
        if (startDate > endDate){
            alert("End days should be greater then start days");
            if(id==1){
                keinZeitIntervallZugewiesenDblClickRow($("#mstID").val(),'infosIntBetriebsdaten');
            }else{
                $("." + sId + " .zeitintervallAnl_1 input").val("");
                $("#tblMasseneingabeDataIMw").remove();
            }
            return false;
        }else{
            return true;
        }
    }
    else if(zeitintervallAnl == 2){


        /*new-mm-start 09-04-2021*/
        var startarr = start.split('-');
        var endarr = end.split('-');

        var weekdiff = endarr[0] - startarr[0];

        if(endarr[0] != '' &&  startarr[0] != '' && endarr[1] != '' &&  startarr[1] != '' && typeof(endarr[0]) != 'undefined' &&  typeof(startarr[0]) != 'undefined' && typeof(endarr[1]) != 'undefined' &&  typeof(startarr[1]) != 'undefined'){
            if (startarr[1] > endarr[1]){
                alert("End year should be greater then start year");
                if(id==1){
                    keinZeitIntervallZugewiesenDblClickRow($("#mstID").val(),'infosIntBetriebsdaten');
                }else{
                    $("." + sId + " .zeitintervallAnl_2 input").val("");
                    $("." + sId + " .zeitintervallAnl_2 select").val("");
                    $("#tblMasseneingabeDataIMw").remove();
                }
                return false;
            }
            else if (startarr[1] == endarr[1]){
                if (weekdiff < 0){
                    alert("This End week should be greater then start week");
                    if(id==1){
                        keinZeitIntervallZugewiesenDblClickRow($("#mstID").val(),'infosIntBetriebsdaten');
                    }else{
                        $("." + sId + " .zeitintervallAnl_2 input").val("");
                        $("." + sId + " .zeitintervallAnl_2 select").val("");
                        $("#tblMasseneingabeDataIMw").remove();
                    }
                    return false;
                }
            }else{
                return true;
            }
        }
        /*new-mm-end 09-04-2021*/

        /*mm-comment  09-04-2021*/
        /*if (startDate > endDate){
                alert("End month should be greater then start month");
                if(id==1){
                      keinZeitIntervallZugewiesenDblClickRow($("#mstID").val(),'infosIntBetriebsdaten');
                }else{
                    $("." + sId + " .zeitintervallAnl_2 input").val("");
                    $("." + sId + " .zeitintervallAnl_2 select").val("");
                    $("#tblMasseneingabeDataIMw").remove();
                }
                return false;
            }else{
                return true;
            }*/
        /*mm-comment*/
    }
    else if(zeitintervallAnl == 3){

        /*new-mm-start 08-04-2021*/
        if(id==6 || id==5 || id==4){

            if(start != ""  && typeof(start) != "undefined"){
                var startarr = start.split('.');
            }
            else{
                return false;
            }
            if(end != ""  && typeof(end) != "undefined"){

                var endarr = end.split('.');
            }
            else{
                return false;
            }

            if(endarr != '' &&  startarr != '' && typeof(endarr) != 'undefined' &&  typeof(startarr) != 'undefined'){
                if(endarr[0] != '' &&  startarr[0] != '' && endarr[1] != '' &&  startarr[1] != '' && typeof(endarr[0]) != 'undefined' &&  typeof(startarr[0]) != 'undefined' && typeof(endarr[1]) != 'undefined' &&  typeof(startarr[1]) != 'undefined'){

                    startDate = new Date(startarr[1],startarr[0]-1,1);
                    endDate = new Date(endarr[1],endarr[0]-1,1);

                }
            }
            else{
                startDate = new Date(start,0,1);
                endDate = new Date(end,0,1);

            }
        }
        else{
            startDate = new Date(start);
            endDate = new Date(end);
        }

        /*new-mm-start 08-04-2021*/
        if (startDate > endDate){
            alert("End month should be greater then start month");
            if(id==1){
                keinZeitIntervallZugewiesenDblClickRow($("#mstID").val(),'infosIntBetriebsdaten');
            }else{
                $("." + sId + " #monateMassEingDataAnlStart" + id + "").val("");
                $("." + sId + " #monateMassEingDataAnlEnde" + id + "").val("");
                $("#tblMasseneingabeDataIMw").remove();
            }
            return false;
        }else{
            return true;
        }
    }else if(zeitintervallAnl == 4){
        if (startDate > endDate){
            alert("End year should be greater then start year");
            if(id==1){
                keinZeitIntervallZugewiesenDblClickRow($("#mstID").val(),'infosIntBetriebsdaten');
            }else{
                $("." + sId + " #jahrMassEingDataAnlStart" + id + "").val("");
                $("." + sId + " #jahrMassEingDataAnlEnde" + id + "").val("");
                $("#tblMasseneingabeDataIMw").remove();
            }
            return false;
        }else{
            return true;
        }
    }

}
/*Prodkte mm 01-03-2021*/
/*new-mm-start*/
function validateZeitintervallAnlPrdktSelectOpt(start,end,zeitintervallAnl,sId,id){

    //getback
    // console.log("start :");
    // console.log(start);
    // console.log("end :");
    // console.log(end);

    var startDate = new Date(start);
    var endDate = new Date(end);

    // console.log("issue in format :");
    // console.log("startDate :");
    // console.log(startDate);
    // console.log("endDate :");
    // console.log(endDate);
    // console.log("diff : ");
    // console.log(endDate-startDate);

    if(zeitintervallAnl == 1){
        /*new-mm-start 07-04-2021*/
        var startarr = start.split('.');
        var endarr = end.split('.');

        startDate = new Date(startarr[2],startarr[1]-1,startarr[0]);
        endDate = new Date(endarr[2],endarr[1]-1,endarr[0]);
        /*new-mm-start 07-04-2021*/

        if (startDate > endDate){
            alert("End days should be greater then start days");
            if(id==1){
                produkteAnlageListingDblClickRow($("#prd_ID").val(),$("#anl_Col").val(),$("#anl_ID").val(),'infosIntEnergiedaten');
            }else{
                $("." + sId + " .zeitintervallAnlPrdkt_1 input").val("");
                $("#tblMasseneingabeDataIMw").remove();
            }
            return false;
        }else{
            return true;
        }
    }
    else if(zeitintervallAnl == 2){
        /*new-mm-start 07-04-2021*/
        var startarr = start.split('-');
        var endarr = end.split('-');

        var weekdiff = endarr[0] - startarr[0];

        if(endarr[0] != '' &&  startarr[0] != '' && endarr[1] != '' &&  startarr[1] != '' && typeof(endarr[0]) != 'undefined' &&  typeof(startarr[0]) != 'undefined' && typeof(endarr[1]) != 'undefined' &&  typeof(startarr[1]) != 'undefined'){
            if (startarr[1] > endarr[1]){
                alert("End year should be greater then start year");
                if(id==1){
                    produkteAnlageListingDblClickRow($("#prd_ID").val(),$("#anl_Col").val(),$("#anl_ID").val(),'infosIntEnergiedaten');
                }else{
                    $("." + sId + " .zeitintervallAnlPrdkt_2 input").val("");
                    $("." + sId + " .zeitintervallAnlPrdkt_2 select").val("");
                    $("#tblMasseneingabeDataIMw").remove();
                }
                return false;
            }
            else if (startarr[1] == endarr[1]){
                if (weekdiff < 0){
                    alert("This End week should be greater then start week");
                    if(id==1){
                        produkteAnlageListingDblClickRow($("#prd_ID").val(),$("#anl_Col").val(),$("#anl_ID").val(),'infosIntEnergiedaten');
                    }else{
                        $("." + sId + " .zeitintervallAnlPrdkt_2 input").val("");
                        $("." + sId + " .zeitintervallAnlPrdkt_2 select").val("");
                        $("#tblMasseneingabeDataIMw").remove();
                    }
                    return false;
                }
            }else{
                return true;
            }
        }
        /*new-mm-end 07-04-2021*/
        /*mm-comment*/
        /*if (startDate > endDate){
                alert("End month should be greater then start month");
                if(id==1){
                      produkteAnlageListingDblClickRow($("#prd_ID").val(),$("#anl_Col").val(),$("#anl_ID").val(),'infosIntEnergiedaten');
                }else{
                    $("." + sId + " .zeitintervallAnlPrdkt_2 input").val("");
                    $("." + sId + " .zeitintervallAnlPrdkt_2 select").val("");
                    $("#tblMasseneingabeDataIMw").remove();
                }
                return false;
            }else{
                return true;
            }*/
        /*mm-comment*/
    }
    else if(zeitintervallAnl == 3){


        /*new-mm-start 08-04-2021*/
        if(id==6){

            if(start != ""  && typeof(start) != "undefined"){
                var startarr = start.split('.');
            }
            else{
                return false;
            }
            if(end != ""  && typeof(end) != "undefined"){

                var endarr = end.split('.');
            }
            else{
                return false;
            }

            if(endarr != '' &&  startarr != '' && typeof(endarr) != 'undefined' &&  typeof(startarr) != 'undefined'){
                if(endarr[0] != '' &&  startarr[0] != '' && endarr[1] != '' &&  startarr[1] != '' && typeof(endarr[0]) != 'undefined' &&  typeof(startarr[0]) != 'undefined' && typeof(endarr[1]) != 'undefined' &&  typeof(startarr[1]) != 'undefined'){

                    startDate = new Date(startarr[1],startarr[0]-1,1);
                    endDate = new Date(endarr[1],endarr[0]-1,1);

                }
            }
            else{
                startDate = new Date(start,0,1);
                endDate = new Date(end,0,1);

            }
        }
        else{
            startDate = new Date(start);
            endDate = new Date(end);
        }

        /*new-mm-start 08-04-2021*/

        /*mm-comment*/
        if (startDate > endDate){
            alert("End month should be greater then start month");
            if(id==1){
                produkteAnlageListingDblClickRow($("#prd_ID").val(),$("#anl_Col").val(),$("#anl_ID").val(),'infosIntEnergiedaten');
            }else{
                $("." + sId + " #monateMassEingDataAnlPrdktStart" + id + "").val("");
                $("." + sId + " #monateMassEingDataAnlPrdktEnde" + id + "").val("");
                $("#tblMasseneingabeDataIMw").remove();
            }
            return false;
        }else{
            return true;
        }
        /*mm-comment*/
    }else if(zeitintervallAnl == 4){
        if (startDate > endDate){
            alert("End year should be greater then start year");
            if(id==1){
                produkteAnlageListingDblClickRow($("#prd_ID").val(),$("#anl_Col").val(),$("#anl_ID").val(),'infosIntEnergiedaten');
            }else{
                $("." + sId + " #jahrMassEingDataAnlPrdktStart" + id + "").val("");
                $("." + sId + " #jahrMassEingDataAnlPrdktEnde" + id + "").val("");
                $("#tblMasseneingabeDataIMw").remove();
            }
            return false;
        }else{
            return true;
        }
    }

}
/*new -mm-end*/
//30-09-2020 dynamic function for validations #zeitintervallAnl
function validateNullValZeitintervallAnlSelectOpt(start,end,zeitintervallAnl){
    if(zeitintervallAnl == 1){
        if (start =='' ||  end ==''){
            alert("Please enter days value into inputs");
            $("#tblMasseneingabeDataIMw").remove();
            return false;
        }else{
            return true;
        }
    }
    else if(zeitintervallAnl == 2){
        var from = start.split("-");
        var startWk = from[0]; //first week selected value
        var startYr = from[1]; //first year input text value

        var to = end.split("-");
        var endWk =  to[0]; //second week selected value
        var endYr =  to[1]; //second year input text value
        if (startWk =='' ||  endWk =='' || startYr =='' ||  endYr ==''){
            alert("Please enter week values into inputs");
            $("#tblMasseneingabeDataIMw").remove();
            return false;
        }else{
            return true;
        }
    }
    else if(zeitintervallAnl == 3){
        if (start =='' ||  end ==''){
            alert("Please enter month value into inputs");
            $("#tblMasseneingabeDataIMw").remove();
            return false;
        }else{
            return true;
        }
    }else if(zeitintervallAnl == 4){
        if (start =='' ||  end ==''){
            alert("Please enter year value into inputs");
            $("#tblMasseneingabeDataIMw").remove();
            return false;
        }else{
            return true;
        }
    }

}
/*new-mm-start 31-03-2021*/
function validateNullValZeitintervallAnlPrdktSelectOpt(start,end,zeitintervallAnl){
    if(zeitintervallAnl == 1){
        if (start =='' ||  end ==''){
            alert("Please enter days value into inputs");
            $("#tblMasseneingabeDataIMw").remove();
            return false;
        }else{
            return true;
        }
    }
    else if(zeitintervallAnl == 2){
        var from = start.split("-");
        var startWk = from[0]; //first week selected value
        var startYr = from[1]; //first year input text value

        var to = end.split("-");
        var endWk =  to[0]; //second week selected value
        var endYr =  to[1]; //second year input text value
        if (startWk =='' ||  endWk =='' || startYr =='' ||  endYr ==''){
            alert("Please enter week values into inputs");
            $("#tblMasseneingabeDataIMw").remove();
            return false;
        }else{
            return true;
        }
    }
    else if(zeitintervallAnl == 3){
        if (start =='' ||  end ==''){
            alert("Please enter month value into inputs");
            $("#tblMasseneingabeDataIMw").remove();
            return false;
        }else{
            return true;
        }
    }else if(zeitintervallAnl == 4){
        if (start =='' ||  end ==''){
            alert("Please enter year value into inputs");
            $("#tblMasseneingabeDataIMw").remove();
            return false;
        }else{
            return true;
        }
    }

}
/*new-mm-end 31-03-2021*/
/*Ajax Call for the Interne Betriebsdaten Speichern 05-10-2020*/
function intBdeIMwHistorieSpeichernPopUp() {
    // alert('test');
    $("#intBdeIMwHistoriePopUp").css("display", "block");
    $("#intBdeIMwHistoriePopUp").dialog({
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
            $("#bemerkungHistIntBdeIMw").val($("#notizBdeIMw").val());
            var zeitintervallAnl = $(".infosIntBetriebsdaten #zeitintervallAnl").val();
            var dates = returnStartDateAndEndDate(zeitintervallAnl,'infosIntBetriebsdaten',1);
            ///console.log(dates);
            var startDate =dates[0];
            var endDate =dates[1];
            zeitintervallAnlInputsVisibleInvisible(zeitintervallAnl,startDate,endDate,'','intBdeIMwHistoriePopUp',3);

            datePickerForInterneBetriebsdaten('intBdeIMwHistoriePopUp',3);
            $("#tageMassEingDataAnlStart3").datepicker("destroy");
            $("#wochenYMassEingDataAnlStart3").datepicker("destroy");
            $("#monateMassEingDataAnlStart3").datepicker("destroy");
            $("#jahrMassEingDataAnlStart3").datepicker("destroy");

            $("#intBdeIMwHistSpeichern").off("click");
            $("#intBdeIMwHistNichtSpeichern").off("click");
            $("#intBdeIMwHistOk").off("click");
            $("#intBdeIMwHistAbbrechen").off("click");
            $("button#intBdeIMwHistSpeichern").on("click", function() {
                $("#infosIntBdeIMwHistoriePopUpDiv, #intBdeIMwHistOk").css("display", "inline");
                $("#intBdeIMwHistSpeichern, #intBdeIMwHistNichtSpeichern").css("display", "none");
            });
            $("#intBdeIMwHistNichtSpeichern").on("click", function() {
                $("#archiviertIntBdeIMw").val("false");
                //instanzSpeichern("intBdeIMwSpeichern");
                $("#intBdeIMwHistoriePopUp").dialog("close");
                interneMesswerteConfigSpeichernMethod();

            });
            $("#intBdeIMwHistOk").on("click", function() {
                $("#archiviertIntBdeIMw").val("true");
                intBdeIMwHistOkSpeichernMethod();
                interneMesswerteConfigSpeichernMethod();
                $("#infosIntBdeIMwHistoriePopUpDiv, #intBdeIMwHistOk").css("display", "none");
                $("#infosIntBdeIMwHistoriePopUpDiv input").val("");
                $("#intBdeIMwHistSpeichern, #intBdeIMwHistNichtSpeichern").css("display", "inline");
                $("#intBdeIMwHistoriePopUp").dialog("close");
            });
            $("#intBdeIMwHistAbbrechen").on("click", function() {
                $("#infosIntBdeIMwHistoriePopUpDiv, #intBdeIMwHistOk").css("display", "none");
                $("#intBdeIMwHistSpeichern, #intBdeIMwHistNichtSpeichern").css("display",
                    "inline");
                $("#infosIntBdeIMwHistoriePopUpDiv input").val("");
                $("#intBdeIMwHistoriePopUp").dialog("close");
            });
        },
        close: function() {
            $("#infosIntBdeIMwHistoriePopUpDiv input").val("");
            $("#infosIntBdeIMwHistoriePopUpDiv, #intBdeIMwHistOk").css("display", "none");
            $("#intBdeIMwHistSpeichern, #intBdeIMwHistNichtSpeichern").css("display", "inline");
        }
    });

}
/* Ajax Call for the
*  Interne Betriebsdaten Module
*  Podukte and Messsetelle Speichern
*  04-03-2021
*/
/*new-mm-start 22-03-2021*/
function intBdePrdktIMwHistorieSpeichernPopUp() {
    // alert('test');
    $("#intBdePrdktIMwHistoriePopUp").css("display", "block");
    $("#intBdePrdktIMwHistoriePopUp").dialog({
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
            $("#bemerkungHistIntBdePrdktIMw").val($("#notizBdeIMwAnlPrdkt").val());
            var zeitintervallAnl = $(".infosIntEnergiedaten #zeitintervallAnlPrdkt").val();
            var dates = returnStartDateAndEndDatePrdkt(zeitintervallAnl,'infosIntEnergiedaten',1);
            ///console.log(dates);
            var startDate =dates[0];
            var endDate =dates[1];
            zeitintervallAnlInputsVisibleInvisiblePrdkt(zeitintervallAnl,startDate,endDate,'','intBdePrdktIMwHistoriePopUp',3);

            datePickerForInterneBetriebsdatenAnlPrdkt('intBdePrdktIMwHistoriePopUp',3);

            $("#tageMassEingDataAnlPrdktStart3").datepicker("destroy");
            $("#wochenYMassEingDataAnlPrdktStart3").datepicker("destroy");
            $("#monateMassEingDataAnlPrdktStart3").datepicker("destroy");
            $("#jahrMassEingDataAnlPrdktStart3").datepicker("destroy");

            $("#intBdePrdktIMwHistSpeichern").off("click");
            $("#intBdePrdktIMwHistNichtSpeichern").off("click");
            $("#intBdePrdktIMwHistOk").off("click");
            $("#intBdePrdktIMwHistAbbrechen").off("click");
            $("button#intBdePrdktIMwHistSpeichern").on("click", function() {
                $("#infosIntBdePrdktIMwHistoriePopUpDiv, #intBdePrdktIMwHistOk").css("display", "inline");
                $("#intBdePrdktIMwHistSpeichern, #intBdePrdktIMwHistNichtSpeichern").css("display", "none");
            });
            $("#intBdePrdktIMwHistNichtSpeichern").on("click", function() {
                $("#archiviertIntBdePrdktIMw").val("false");
                //instanzSpeichern("intBdeIMwSpeichern");
                $("#intBdePrdktIMwHistoriePopUp").dialog("close");
                interneMesswerteConfigSpeichernMethodPrdkt();

            });
            $("#intBdePrdktIMwHistOk").on("click", function() {
                $("#archiviertIntBdePrdktIMw").val("true");
                intBdeIMwHistOkSpeichernMethodPrdkt();
                interneMesswerteConfigSpeichernMethodPrdkt();
                $("#infosIntBdePrdktIMwHistoriePopUpDiv, #intBdePrdktIMwHistOk").css("display", "none");
                $("#infosIntBdePrdktIMwHistoriePopUpDiv input").val("");
                $("#intBdePrdktIMwHistSpeichern, #intBdePrdktIMwHistNichtSpeichern").css("display", "inline");
                $("#intBdePrdktIMwHistoriePopUp").dialog("close");
            });
            $("#intBdePrdktIMwHistAbbrechen").on("click", function() {
                $("#infosIntBdePrdktIMwHistoriePopUpDiv, #intBdePrdktIMwHistOk").css("display", "none");
                $("#intBdePrdktIMwHistSpeichern, #intBdePrdktIMwHistNichtSpeichern").css("display",
                    "inline");
                $("#infosIntBdePrdktIMwHistoriePopUpDiv input").val("");
                $("#intBdePrdktIMwHistoriePopUp").dialog("close");
            });
        },
        close: function() {
            $("#infosIntBdePrdktIMwHistoriePopUpDiv input").val("");
            $("#infosIntBdePrdktIMwHistoriePopUpDiv, #intBdePrdktIMwHistOk").css("display", "none");
            $("#intBdePrdktIMwHistSpeichern, #intBdePrdktIMwHistNichtSpeichern").css("display", "inline");
        }
    });

}
/*new-mm-end 22-03-2021*/
/*Ajax Call for the Manuel module serach 18-09-2020*/
/*new-mm-start 24-03-2021*/
function intBdeIMwHistOkSpeichernMethod(){
    var zeitintervallAnl = $(".infosIntBetriebsdaten #zeitintervallAnl").val();
    var dates = returnStartDateAndEndDate(zeitintervallAnl,'infosIntBetriebsdaten',1);
    var startDate =dates[0];
    var endDate =dates[1];

    $.ajax({
        type: "POST",
        async: !0,
        url: "php/instanzIntoDb.php",
        data: {
            id: "intBdeIMwHistOk",
            modus: "save",
            anlID: $("#anlID").val(),
            nameDB: $("#nameDB").val(),
            liegID: $("#liegID").val(),
            mstID:$("#mstID").val(),
            archiviert: $("#archiviertIntBdeIMw").val(),
            bemerkung: $("#bemerkungHistIntBdeIMw").val(),
            /*gueltigVon: $("#gueltigVonHistIntBdeIMw").val(),
            gueltigBis: $("#gueltigBisHistIntBdeIMw").val(),*/
            gueltigVon: startDate,
            gueltigBis: endDate,
            anlIMw: $("#anlIMw").val(),
            anlNrIMw: $("#anlNrIMw").val(),
            zeitintervallAnl: $("#zeitintervallAnl").val(),
            einheitAnl: $("#einheitAnl").val(),
            notizBdeIMw: $("#notizBdeIMw").val(),
            startDate:startDate,
            endDate:endDate,
            ending:$("#anlIMwNoEnding").val(),
            einheitControlSys:$("#control_system").val(),
        },
        success: function(a) {
            alert(datensatzGespeichert(a));
        }
    });
}
/*new-mm-end 24-03-2021*/
/*Interne Betriebsdaten Module Save History For Produkte And Messsetelle 10-03-2021*/
/*new-mm-start 22-03-2021*/
function intBdeIMwHistOkSpeichernMethodPrdkt(){
    //alert("saving history");
    var zeitintervallAnl = $(".infosIntEnergiedaten #zeitintervallAnlPrdkt").val();
    var dates = returnStartDateAndEndDatePrdkt(zeitintervallAnl,'infosIntEnergiedaten',1);
    var startDate =dates[0];
    var endDate =dates[1];
    var iBdeType = $("input[name='BetriebsdatenFilter']:checked").val();
    $("#archiviertIntBdePrdktIMw").val('true');

    $.ajax({
        type: "POST",
        async: !0,
        url: "php/instanzIntoDb.php",
        data: {
            id: "intBdePrdktIMwHistOkConfig",
            modus: "save",
            //anlID: $("#anlID").val(),
            nameDB: $("#nameDB").val(),
            liegID: $("#liegID").val(),

            mst_ID:$("#mstID").val(),
            prd_ID:  $("#prd_ID").val(),
            anl_ID:  $("#anl_ID").val(),
            anl_Col:  $("#anl_Col").val(),
            archiviert: $("#archiviertIntBdePrdktIMw").val(),
            bemerkung: $("#bemerkungHistIntBdePrdktIMw").val(),
            gueltigVon: startDate,
            gueltigBis: endDate,
            mstIMw:$("#mstIMw").val(),
            artikelnummerIntBde: $(".infosIntEnergiedaten #artikelnummerIntBde").val(),
            bezeichnungIntBde: $(".infosIntEnergiedaten #bezeichnungIntBde").val(),
            anlageIntBde: $(".infosIntEnergiedaten #anlageIntBde").val(),
            anlageMessstelleIntBde: $(".infosIntEnergiedaten #anlageMessstelleIntBde").val(),
            zeitintervallAnl: $("#zeitintervallAnlPrdkt").val(),
            einheitAnl: $("#einheitAnlPrdkt").val(),
            note:$("#notizBdeIMwAnlPrdkt").val(),
            startDate:startDate,
            endDate:endDate,
            ending:$("#anlPrdktIMwNoEnding").val(),
            einheitControlSys:$("#control_system_AnlPrdkt").val(),
            iBdeType: iBdeType,

        },
        success: function(a) {
            alert(datensatzGespeichert(a));
        }
    });
}
/*new-mm-end 22-03-2021*/
/*Get history details*/
function intBdeIMwHistOkGetHistorie(){
    $.ajax({
        type: "POST",
        async: !0,
        url: "php/getHistorie.php",
        data: {
            modus: "intBdeIMwGetHist",
            nameDB: $("#nameDB").val(),
            anlagenNr:$("#anlNrIMw").val(),
            mstID:$("#mstID").val()
        },
        success: function(a) {
            a = JSON.parse(a);
            var b = a.length;
            tblHistorieIntBdeIMw.clear().draw();
            for (var e = 0; e < b; e++){
                tblHistorieIntBdeIMw.row.add( [e + 1,a[e].histID,a[e].mstID, a[e].startDate, a[e].endDate,a[e].unit, a[e].type, a[e].anlIMw, a[e].anlNrIMw, a[e].notizBdeIMw, a[e].bemerkung, a[e].gueltigVon, a[e].gueltigBis]).draw();
                //tblHistorieIntBdeIMw.column([0,1]).visible(!1);
                $("#tblHistorieIntBdeIMw tr").css("cursor", "pointer");
                $("#tblHistorieIntBdeIMw").off("dblclick", "tr");
            }
            var columnHide = tblHistorieIntBdeIMw.columns([0,1,2,3,4]);
            columnHide.visible(! columnHide.visible() );
            $("#tblHistorieIntBdeIMw").on("dblclick", "tr", function() {
                var a = tblHistorieIntBdeIMw.row(this).data();
                intBdeIMwDatensatzAusHistorieEinlesenAnl(a[1],a[2],'intBdeIMwHistorieContainer');
                /*new-mm-start 26-03-2021*/
                $("#mstID").val(a[2]);
                /*new-mm-end 26-03-2021*/
                datePickerForInterneBetriebsdaten('intBdeIMwHistorieContainer',2);
            })
        }
    })
}
/*Get Produkte History*/
/*new-mm-start*/
function intBdeIMwHistOkGetHistoriePrdkt(){
    $.ajax({
        type: "POST",
        async: !0,
        url: "php/getHistorie.php",
        data: {
            modus: "intBdePrdktIMwGetHist",
            nameDB: $("#nameDB").val(),

            prd_ID:  $("#prd_ID").val(),
            anl_ID:  $("#anl_ID").val(),
            anl_Col:  $("#anl_Col").val(),
        },
        success: function(a) {
            a = JSON.parse(a);
            var b = a.length;
            tblHistorieIntBdeIMwPrdkt.clear().draw();
            for (var e = 0; e < b; e++){
                tblHistorieIntBdeIMwPrdkt.row.add( [e + 1,a[e].prdktHist_ID,a[e].prd_id,a[e].anl_ID,a[e].anl_col, a[e].startDate, a[e].endDate,a[e].unit, a[e].type, a[e].mstIMw, a[e].anlageIntBde, a[e].note, a[e].bemerkung, a[e].gueltigVon, a[e].gueltigBis]).draw();
                //tblHistorieIntBdeIMw.column([0,1]).visible(!1);
                $("#tblHistorieIntBdeIMwPrdkt tr").css("cursor", "pointer");
                $("#tblHistorieIntBdeIMwPrdkt").off("dblclick", "tr");
            }
            var columnHide = tblHistorieIntBdeIMwPrdkt.columns([0,1,2,3,4,5,6]);
            columnHide.visible(! columnHide.visible() );
            $("#tblHistorieIntBdeIMwPrdkt").on("dblclick", "tr", function() {
                var a = tblHistorieIntBdeIMwPrdkt.row(this).data();
                intBdePrdktHistorieUpdatePopUp(a[1],a[2],'intBdePrdktIMwHistorieContainer');
                /*new-mm-start 26-03-2021*/
                //$("#prd_ID").val(a[2]);
                //$("#anl_ID").val(a[3]);
                //$("#anl_Col").val(a[4]);
                /*new-mm-end 26-03-2021*/
                datePickerForInterneBetriebsdatenAnlPrdkt('intBdePrdktIMwHistorieContainer',4);
            })
        }
    })
}
/*new-mm-end*/
/*Get Messsetelle History*/
/*new-mm-start*/
function intBdeIMwHistOkGetHistorieMesssetelle(){
    $.ajax({
        type: "POST",
        async: !0,
        url: "php/getHistorie.php",
        data: {
            modus: "intBdeIMwGetMesssetelle",
            nameDB: $("#nameDB").val(),
            mstID:$("#mstID").val()
        },
        success: function(a) {
            a = JSON.parse(a);
            var b = a.length;
            tblHistorieIntBdeIMwMesssetelle.clear().draw();
            for (var e = 0; e < b; e++){
                tblHistorieIntBdeIMwMesssetelle.row.add( [e + 1,a[e].prdktHist_ID,a[e].mst_ID, a[e].startDate, a[e].endDate,a[e].unit, a[e].type, a[e].mstIMw, a[e].anlageMessstelleIntBde, a[e].note, a[e].bemerkung, a[e].gueltigVon, a[e].gueltigBis]).draw();
                //tblHistorieIntBdeIMw.column([0,1]).visible(!1);
                $("#tblHistorieIntBdeIMwMesssetelle tr").css("cursor", "pointer");
                $("#tblHistorieIntBdeIMwMesssetelle").off("dblclick", "tr");
            }
            var columnHide = tblHistorieIntBdeIMwMesssetelle.columns([0,1,2,3,4]);
            columnHide.visible(! columnHide.visible() );
            $("#tblHistorieIntBdeIMwMesssetelle").on("dblclick", "tr", function() {
                var a = tblHistorieIntBdeIMwMesssetelle.row(this).data();
                intBdeMesssetelleHistorieUpdatePopUp(a[1],a[2],'intBdeMesssetelleIMwHistorieContainer');
                /*new-mm-start 26-03-2021*/
                $("#mstID").val(a[2]);
                /*new-mm-end 26-03-2021*/
                datePickerForInterneBetriebsdatenAnlPrdkt('intBdeMesssetelleIMwHistorieContainer',5);
            })
        }
    })
}
/*new-mm-end*/
/*Get history details using anl_ID*/
function intBdeIMwDatensatzAusHistorieEinlesenAnl(histID,mstID,sId){
    $('#intBdeIMwHistorieContainer').dialog({  height: 380,
        width: 910,
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
            $("#intBdeIMwHistSpeichernDblClick").off("click");

            $("button#intBdeIMwHistSpeichernDblClick").on("click", function() {
                $("#archiviertIntBdeIMw").val("true");
                intBdeIMwHistSpeichernMethodDblClickEditorPopUp('intBdeIMwHistorieContainer');
            });
        },
        close: function() {
            $("#intBdeIMwHistorieContainer input").val("");
            $("#intBdeIMwHistorieContainer").dialog("close");
        }
    });
    $.ajax({
        type: "POST",
        async: !0,
        url: "php/getHistorie.php",
        data: {
            modus: "intBdeIMwGetHistSingle",
            nameDB: $("#nameDB").val(),
            mstID: mstID,
            histID:histID
        },
        success: function(a) {
            a = JSON.parse(a);
            var b = a.length;
            //console.log(a);
            $("." + sId + " #anlIMw").val(a[0].anlIMw);
            $("." + sId + " #anlNrIMw").val(a[0].anlNrIMw);
            $("." + sId + " #zeitintervallAnl").val(a[0].zeitintervallAnl);
            $("." + sId + " #einheitAnl").val(a[0].einheitAnl);
            $("." + sId + " #notizBdeIMw").val(a[0].notizBdeIMw);
            $("." + sId + " #anlIDEditor").val(a[0].anl_ID);
            $("." + sId + " #histIDEditor").val(a[0].histID);
            $("." + sId + " #archiviertAnl").val("true");
            $("." + sId + " #bemerkungHistIntBdeIMwEditor").val(a[0].bemerkung);
            $("." + sId + " #gueltigVonHistIntBdeIMwEditor").val(a[0].gueltigVon);
            $("." + sId + " #gueltigBisHistIntBdeIMwEditor").val(a[0].gueltigBis);
            var sDt = convertDateFormateForDataTbl(a[0]['intTp_ID'],a[0]['startDate']);
            var eDt = convertDateFormateForDataTbl(a[0]['intTp_ID'],a[0]['endDate']);
            zeitintervallAnlInputsVisibleInvisible(a[0].zeitintervallAnl,sDt,eDt,a[0].ending,sId,2);
            $("." + sId + " #anlIMwNoEnding").prop('checked', a[0].ending);
            $("." + sId + " #anlIMwNoEnding").val(a[0].ending);
            if(a[0].zeitintervallAnl==2){
                $("." + sId + " #wochenWMassEingDataAnlStart2").val(a[0].startWeek);
                $("." + sId + " #wochenWMassEingDataAnlEnde2").val(a[0].endWeek);
            }

            /*new-mm-start 01-04-2021*/
            $("." + sId + " .control_system_div").show();
            $("." + sId + " #control_system").val(a[0]['einheitControlSys']);
            /*new-mm-end 01-04-2021*/

        }
    })
}

/*Ajax Call for the Manuel module serach 18-09-2020*/
/*mm-commented 22-03-2021*/
/*function intBdeIMwHistSpeichernMethodDblClickEditorPopUp(sId){
    //alert("." + sId + " anlIDEditor");
    //alert("." + sId + " #zeitintervallAnl");
     var zeitintervallAnl = $("." + sId + " #zeitintervallAnl").val();
     var dates = returnStartDateAndEndDate(zeitintervallAnl,'intBdeIMwHistorieContainer',2);
     startDate =dates[0];
     endDate =dates[1];
     $.ajax({
        type: "POST",
        async: !0,
        url: "php/instanzIntoDb.php",
        data: {
            modus: "intBdePrdktIMwGetHistSingle",
            nameDB: $("#nameDB").val(),
            prd_id: prd_id,
            prdktHist_ID:prdktHist_ID
        },
        success: function(a) {
            a = JSON.parse(a);
            var b = a.length;
            //console.log(a);

            $("." + sId + " #prdktHist_IDEditor").val(a[0].prdktHist_ID);
            $("." + sId + " #mstIMw").val(a[0]['mstIMw']).prop('disabled',false);
            $("." + sId + " #artikelnummerIntBde").val(a[0]['artikelnummerIntBde']).prop('disabled',true);
            $("." + sId + " #bezeichnungIntBde").val(a[0]['bezeichnungIntBde']).prop('disabled',true);
            $("." + sId + " #anlageIntBde").val(a[0]['anlageIntBde']).prop('disabled',true);


            var sDt = convertDateFormateForDataTbl(a[0]['zeitintervallAnl'],a[0]['startDate']);
            var eDt = convertDateFormateForDataTbl(a[0]['zeitintervallAnl'],a[0]['endDate']);
            $("." + sId + " #zeitintervallAnlPrdkt").val(a[0]['zeitintervallAnl']);
            $("." + sId + " #einheitAnlPrdkt").val(a[0]['einheitAnl']);
            $("." + sId + " #notizBdeIMwAnlPrdkt").val(a[0]['note']);
            zeitintervallAnlInputsVisibleInvisiblePrdkt(a[0]['zeitintervallAnl'],sDt,eDt,a[0]['ending'],sId,4);


            $("." + sId + " #anlPrdktIMwNoEnding").prop('checked', a[0]['ending']);
            $("." + sId + " #anlPrdktIMwNoEnding").val(a[0]['ending']);
            if(a[0]['zeitintervallAnl']==2){
                $("." + sId + " #wochenWMassEingDataAnlPrdktStart4").val(a[0]['startWeek']);
                $("." + sId + " #wochenWMassEingDataAnlPrdktEnde4").val(a[0]['endWeek']);
            }
            $("." + sId + " .control_system_div_AnlPrdkt").show();
            $("." + sId + " #control_system_AnlPrdkt").val(a[0]['einheitControlSys']);

            $("." + sId + " #bemerkungHistIntBdePrdktIMwEditor").val(a[0].bemerkung);
            $("." + sId + " #gueltigVonHistIntBdePrdktIMwEditor").val(a[0].gueltigVon);
            $("." + sId + " #gueltigBisHistIntBdePrdktIMwEditor").val(a[0].gueltigBis);
            einheitAnlPrdktMstHistOnChangeChildSelectOpt(a[0]['einheitAnl'],sId);
        }
    })
}*/
/*mm-commented 22-03-2021*/

/*IntBde Product History Update Popup 11-03-2021*/
/*new-mm-start*/
function intBdePrdktHistorieUpdatePopUp(prdktHist_ID,prd_id,sId){
    $('#intBdePrdktIMwHistorieContainer').dialog({  height: 380,
        width: 910,
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
            $("#intBdeprdktIMwHistSpeichernDblClick").off("click");
            $("button#intBdePrdktIMwHistSpeichernDblClick").on("click", function() {
                $("#archiviertIntBdeIMw").val("true");
                intBdePrdktMstHistSpeichernMethodDblClickEditorPopUp('intBdePrdktIMwHistorieContainer');
            });
        },
        close: function() {
            $("#intBdePrdktIMwHistorieContainer input").val("");
            $("#intBdePrdktIMwHistorieContainer").dialog("close");
        }
    });
    $.ajax({
        type: "POST",
        async: !0,
        url: "php/getHistorie.php",
        data: {
            modus: "intBdePrdktIMwGetHistSingle",
            nameDB: $("#nameDB").val(),
            prd_id: prd_id,
            prdktHist_ID:prdktHist_ID
        },
        success: function(a) {
            a = JSON.parse(a);
            var b = a.length;
            //console.log(a);

            $("." + sId + " #prdktHist_IDEditor").val(a[0].prdktHist_ID);
            $("." + sId + " #mstIMw").val(a[0]['mstIMw']).prop('disabled',false);
            $("." + sId + " #artikelnummerIntBde").val(a[0]['artikelnummerIntBde']).prop('disabled',true);
            $("." + sId + " #bezeichnungIntBde").val(a[0]['bezeichnungIntBde']).prop('disabled',true);
            $("." + sId + " #anlageIntBde").val(a[0]['anlageIntBde']).prop('disabled',true);


            var sDt = convertDateFormateForDataTbl(a[0]['zeitintervallAnl'],a[0]['startDate']);
            var eDt = convertDateFormateForDataTbl(a[0]['zeitintervallAnl'],a[0]['endDate']);
            $("." + sId + " #zeitintervallAnlPrdkt").val(a[0]['zeitintervallAnl']);
            $("." + sId + " #einheitAnlPrdkt").val(a[0]['einheitAnl']);
            $("." + sId + " #notizBdeIMwAnlPrdkt").val(a[0]['note']);
            zeitintervallAnlInputsVisibleInvisiblePrdkt(a[0]['zeitintervallAnl'],sDt,eDt,a[0]['ending'],sId,4);


            $("." + sId + " #anlPrdktIMwNoEnding").prop('checked', a[0]['ending']);
            $("." + sId + " #anlPrdktIMwNoEnding").val(a[0]['ending']);
            if(a[0]['zeitintervallAnl']==2){
                $("." + sId + " #wochenWMassEingDataAnlPrdktStart4").val(a[0]['startWeek']);
                $("." + sId + " #wochenWMassEingDataAnlPrdktEnde4").val(a[0]['endWeek']);
            }
            $("." + sId + " .control_system_div_AnlPrdkt").show();
            $("." + sId + " #control_system_AnlPrdkt").val(a[0]['einheitControlSys']);

            $("." + sId + " #bemerkungHistIntBdePrdktIMwEditor").val(a[0].bemerkung);
            $("." + sId + " #gueltigVonHistIntBdePrdktIMwEditor").val(a[0].gueltigVon);
            $("." + sId + " #gueltigBisHistIntBdePrdktIMwEditor").val(a[0].gueltigBis);
            einheitAnlPrdktMstHistOnChangeChildSelectOpt(a[0]['einheitAnl'],sId);
        }
    })
}
/*new-mm-end*/
/*IntBde Messsetelle History Update Popup 11-03-2021*/
/*new-mm-start*/
function intBdeMesssetelleHistorieUpdatePopUp(prdktHist_ID,mst_ID,sId){
    $('#intBdeMesssetelleIMwHistorieContainer').dialog({  height: 380,
        width: 910,
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
            $("#intBdeMesssetelleIMwHistSpeichernDblClick").off("click");
            $("button#intBdeMesssetelleIMwHistSpeichernDblClick").on("click", function() {
                $("#archiviertIntBdePrdktIMw").val("true");
                intBdePrdktMstHistSpeichernMethodDblClickEditorPopUp('intBdeMesssetelleIMwHistorieContainer');
            });
        },
        close: function() {
            $("#intBdeMesssetelleIMwHistorieContainer input").val("");
            $("#intBdeMesssetelleIMwHistorieContainer").dialog("close");
        }
    });
    $.ajax({
        type: "POST",
        async: !0,
        url: "php/getHistorie.php",
        data: {
            modus: "intBdeMesssetelleIMwGetHistSingle",
            nameDB: $("#nameDB").val(),
            mst_ID: mst_ID,
            prdktHist_ID:prdktHist_ID
        },
        success: function(a) {
            a = JSON.parse(a);
            var b = a.length;
            //console.log(a);

            $("." + sId + " #prdktHist_IDEditor").val(a[0].prdktHist_ID);
            $("." + sId + " #mstIMw").val(a[0]['mstIMw']).prop('disabled',true);
            //$("." + sId + " #artikelnummerIntBde").val(a[0]['artikelNrPrd']).prop('disabled',true);
            //$("." + sId + " #bezeichnungIntBde").val(a[0]['namePrd']).prop('disabled',true);
            $("." + sId + " #anlageMessstelleIntBde").val(a[0]['anlageMessstelleIntBde']).prop('disabled',true);
            var sDt = convertDateFormateForDataTbl(a[0]['zeitintervallAnl'],a[0]['startDate']);
            var eDt = convertDateFormateForDataTbl(a[0]['zeitintervallAnl'],a[0]['endDate']);
            $("." + sId + " #zeitintervallAnlPrdkt").val(a[0]['zeitintervallAnl']);
            $("." + sId + " #einheitAnlPrdkt").val(a[0]['einheitAnl']);
            $("." + sId + " #notizBdeIMwAnlPrdkt").val(a[0]['note']);
            zeitintervallAnlInputsVisibleInvisiblePrdkt(a[0]['zeitintervallAnl'],sDt,eDt,a[0]['ending'],sId,5);
            $("." + sId + " #anlPrdktIMwNoEnding").prop('checked', a[0]['ending']);
            $("." + sId + " #anlPrdktIMwNoEnding").val(a[0]['ending']);
            if(a[0]['zeitintervallAnl']==2){
                $("." + sId + " #wochenWMassEingDataAnlPrdktStart5").val(a[0]['startWeek']);
                $("." + sId + " #wochenWMassEingDataAnlPrdktEnde5").val(a[0]['endWeek']);
            }
            $("." + sId + " .control_system_div_AnlPrdkt").show();
            $("." + sId + " #control_system_AnlPrdkt").val(a[0]['einheitControlSys']);
            $("." + sId + " #bemerkungHistIntBdePrdktIMwEditor").val(a[0].bemerkung);
            $("." + sId + " #gueltigVonHistIntBdePrdktIMwEditor").val(a[0].gueltigVon);
            $("." + sId + " #gueltigBisHistIntBdePrdktIMwEditor").val(a[0].gueltigBis);
            einheitAnlPrdktMstHistOnChangeChildSelectOpt(a[0]['einheitAnl'],sId);
        }
    })
}
/*new-mm-end*/
/*Ajax Call for the Manuel module serach 18-09-2020*/
/*new-mm-start 24-03-2021*/
function intBdeIMwHistSpeichernMethodDblClickEditorPopUp(sId){
    var zeitintervallAnl = $("." + sId + " #zeitintervallAnl").val();
    var dates = returnStartDateAndEndDate(zeitintervallAnl,'intBdeIMwHistorieContainer',2);
    startDate =dates[0];
    endDate =dates[1];
    $.ajax({
        type: "POST",
        async: !0,
        url: "php/instanzIntoDb.php",
        data: {
            id: "intBdeIMwHistEditor",
            modus: "update",
            anlID: $("." + sId + " #anlIDEditor").val(),
            histID: $("." + sId + " #histIDEditor").val(),
            nameDB: $("#nameDB").val(),
            liegID: $("#liegID").val(),
            mstID: $("#mstID").val(),
            // histID:$("." + sId + " #histIDEditor").val(),
            archiviert: $("." + sId + " #archiviertIntBdeIMw").val(),
            bemerkung: $("." + sId + " #bemerkungHistIntBdeIMwEditor").val(),
            gueltigVon: $("." + sId + " #gueltigVonHistIntBdeIMwEditor").val(),
            gueltigBis: $("." + sId + " #gueltigBisHistIntBdeIMwEditor").val(),
            anlIMw: $("." + sId + " #anlIMw").val(),
            anlNrIMw: $("." + sId + " #anlNrIMw").val(),
            zeitintervallAnl: $("." + sId + " #zeitintervallAnl").val(),
            einheitAnl: $("." + sId + " #einheitAnl").val(),
            notizBdeIMw: $("." + sId + " #notizBdeIMw").val(),
            startDate:startDate,
            endDate:endDate,
            ending:$("." + sId + " #anlIMwNoEnding").val(),
            /*new-mm-start 01-04-2021*/
            einheitControlSys:$("." + sId + " #control_system").val(),
            /*new-mm-end 01-04-2021*/
        },
        success: function(a) {
            alert("Verlauf erfolgreich aktualisiert");
            $("#"+sId+" input").val("");
            $("#"+sId+"").dialog("close");
            intBdeIMwHistOkGetHistorie();
        }
    });
}
/*new-mm-end 24-03-2021*/
/* IntBde Produckte Messsetelle History Update 12-03-2021*/
/*new-mm-start*/
function intBdePrdktMstHistSpeichernMethodDblClickEditorPopUp(sId){
    var zeitintervallAnl = $("." + sId + " #zeitintervallAnlPrdkt").val();
    var iBdeType = $("input[name='BetriebsdatenFilter']:checked").val();
    if (iBdeType == 1){
        var dates = returnStartDateAndEndDatePrdkt(zeitintervallAnl,sId,4);
    }
    else if (iBdeType == 2) {
        var dates = returnStartDateAndEndDatePrdkt(zeitintervallAnl,sId,5);
    }
    //var dates = returnStartDateAndEndDatePrdkt(zeitintervallAnl,sId,4);
    startDate =dates[0];
    endDate =dates[1];
    var iBdeType = $("input[name='BetriebsdatenFilter']:checked").val();
    $("#archiviertIntBdePrdktIMw").val('true');
    $.ajax({
        type: "POST",
        async: !0,
        url: "php/instanzIntoDb.php",
        data: {
            id: "intBdePrdktMstIMwHistEditor",
            modus: "update",
            nameDB: $("#nameDB").val(),
            liegID: $("#liegID").val(),
            prdktHist_ID: $("." + sId + " #prdktHist_IDEditor").val(),
            mst_ID: $("#mstID").val(),
            prd_ID:  $("#prd_ID").val(),
            anl_ID:  $("#anl_ID").val(),
            anl_Col:  $("#anl_Col").val(),
            archiviert: $("#archiviertIntBdePrdktIMw").val(),
            bemerkung: $("." + sId + " #bemerkungHistIntBdePrdktIMwEditor").val(),
            gueltigVon: startDate,
            gueltigBis: endDate,
            mstIMw:$("." + sId + " #mstIMw").val(),
            artikelnummerIntBde: $("." + sId + " #artikelnummerIntBde").val(),
            bezeichnungIntBde: $("." + sId + " #bezeichnungIntBde").val(),
            anlageIntBde: $("." + sId + " #anlageIntBde").val(),
            anlageMessstelleIntBde: $("." + sId + " #anlageMessstelleIntBde").val(),
            zeitintervallAnl: $("." + sId + " #zeitintervallAnlPrdkt").val(),
            einheitAnl: $("." + sId + " #einheitAnlPrdkt").val(),
            note:$("." + sId + " #notizBdeIMwAnlPrdkt").val(),
            startDate:startDate,
            endDate:endDate,
            ending:$("." + sId + " #anlPrdktIMwNoEnding").val(),
            einheitControlSys:$("." + sId + " #control_system_AnlPrdkt").val(),
            iBdeType: iBdeType,
        },
        success: function(a) {
            alert("Verlauf erfolgreich aktualisiert");
            $("#"+sId+" input").val("");
            $("#"+sId+"").dialog("close");
            //intBdeIMwHistOkGetHistorie();
            // $("." + sId + " #prdktHist_IDEditor").val("");
            if(iBdeType == 1){
                tblHistorieIntBdeIMwPrdkt.clear().draw();

                /*new-mm-start 26-03-2021*/
                //intBdeIMwHistOkGetHistoriePrdkt();
                /*new-mm-end 26-03-2021*/

                // $("#prd_ID").val("");
                // $("#anl_ID").val("");
                // $("#anl_Col").val("");
            }
            else if(iBdeType == 2){
                // alert("2");
                tblHistorieIntBdeIMwMesssetelle.clear().draw();
                /*new-mm-start 26-03-2021*/
                //intBdeIMwHistOkGetHistorieMesssetelle();
                /*new-mm-end 26-03-2021*/
            }
        }
    });
}
/*new-mm-end*/
/*Validation for the start date and end date*/

function datePickerForInterneBetriebsdaten(sId,id){
    $("." + sId + " #monateMassEingDataAnlStart" +id+"").datepicker({
        dateFormat: 'mm.yy',
        changeMonth: true,
        changeYear: true,
        showButtonPanel: true,
        onClose: function(dateText, inst) {
            var month = $("#ui-datepicker-div .ui-datepicker-month :selected").val();
            var year = $("#ui-datepicker-div .ui-datepicker-year :selected").val();
            $(this).datepicker('setDate', new Date(year, month, 1));
            var strtStr1 = $(this).val();
            var start1 = strtStr1.split('.');
            var endStr1 = $("." + sId + " #monateMassEingDataAnlEnde" +id+ "").val();
            var end1 = endStr1.split('.');
            if(sId == 'infosMasseneingabeDateRangeDiv' && id==4){
                var zeitintervallAnl = $(".infosMasseneingabeInside button.active").attr('data-id');
            }
            /*new-mm-start 09-04-2021*/
            else if(sId == 'infosMasseneingabeDateRangeDivMesssetelle' && id==5){
                var zeitintervallAnl = $(".infosMasseneingabeInside button.active").attr('data-id');
            }
            /*new-mm-start 09-04-2021*/
            else{
                var zeitintervallAnl = $("." + sId + " #zeitintervallAnl").val();
            }
            /*mm-comment*/
            //validateZeitintervallAnlSelectOpt(start1[1],end1[1],zeitintervallAnl,sId,id);
            /*mm-comment*/
            /*new-mm-start 09-04-2021*/
            if(sId == 'infosMasseneingabeDateRangeDivMesssetelle' && id==5 || sId == 'infosMasseneingabeDateRangeDiv' && id==4){
                validateZeitintervallAnlSelectOpt(strtStr1,endStr1,zeitintervallAnl,sId,id);
            }else{
                validateZeitintervallAnlSelectOpt(start1[1],end1[1],zeitintervallAnl,sId,id);
            }
            /*new-mm-end 09-04-2021*/

            if(id==1){
                alertValidationforStartEndeDate($("#mstID").val(),this.value,zeitintervallAnl);
            }
        }
    });
    $("." + sId + " #monateMassEingDataAnlStart" +id+ "").focus(function () {
        $(".ui-datepicker-calendar").hide();
        $(".ui-widget-content .ui-datepicker-current").hide();
        $("#ui-datepicker-div").position({
            my: "center top",
            at: "center bottom",
            of: $(this)
        });
    });
    $("." + sId + " #monateMassEingDataAnlEnde" +id+ "").datepicker({
        dateFormat: 'mm.yy',
        changeMonth: true,
        changeYear: true,
        showButtonPanel: true,
        onClose: function(dateText, inst) {
            var month = $("#ui-datepicker-div .ui-datepicker-month :selected").val();
            var year = $("#ui-datepicker-div .ui-datepicker-year :selected").val();
            $(this).datepicker('setDate', new Date(year, month, 1));
            var strtStr2 = $("." + sId + " #monateMassEingDataAnlStart" +id+ "").val();
            var start2 = strtStr2.split('.');
            var endStr2 = $(this).val();
            var end2 = endStr2.split('.');
            if(sId == 'infosMasseneingabeDateRangeDiv' && id==4){
                var zeitintervallAnl = $(".infosMasseneingabeInside button.active").attr('data-id');
            }
            /*new-mm-start 09-04-2021*/
            else if(sId == 'infosMasseneingabeDateRangeDivMesssetelle' && id==5){
                var zeitintervallAnl = $(".infosMasseneingabeInside button.active").attr('data-id');
            }
            /*new-mm-end 09-04-2021*/
            else{
                var zeitintervallAnl = $("." + sId + " #zeitintervallAnl").val();
            }
            /*new-mm-start 09-04-2021*/
            if(sId == 'infosMasseneingabeDateRangeDivMesssetelle' && id==5 ){
                validateZeitintervallAnlSelectOpt(strtStr2,endStr2,zeitintervallAnl,sId,id);
            }else{
                validateZeitintervallAnlSelectOpt(start2[1],end2[1],zeitintervallAnl,sId,id);
            }
            /*new-mm-end 09-04-2021*/

            //validateZeitintervallAnlSelectOpt(start2[1],end2[1],zeitintervallAnl,sId,id);

            if(id==1){
                alertValidationforStartEndeDate($("#mstID").val(),this.value,zeitintervallAnl);
            }
        }
    });
    $("." + sId + " #monateMassEingDataAnlEnde" +id+ "").focus(function () {
        $(".ui-datepicker-calendar").hide();
        $(".ui-widget-content .ui-datepicker-current").hide();
        $("#ui-datepicker-div").position({
            my: "center top",
            at: "center bottom",
            of: $(this)
        });
    });

    /*Year*/
    $("." + sId + " #jahrMassEingDataAnlStart" +id+ "").datepicker({
        dateFormat: 'yy',
        changeMonth: true,
        changeYear: true,
        showButtonPanel: true,
        onClose: function(dateText, inst) {
            var month = $("#ui-datepicker-div .ui-datepicker-month :selected").val();
            var year = $("#ui-datepicker-div .ui-datepicker-year :selected").val();
            $(this).datepicker('setDate', new Date(year, month, 1));
            var start3 = $(this).val();
            var end3 = $("." + sId + " #jahrMassEingDataAnlEnde" +id+ "").val();
            if(sId == 'infosMasseneingabeDateRangeDiv' && id==4){
                var zeitintervallAnl = $(".infosMasseneingabeInside button.active").attr('data-id');
            }else{
                var zeitintervallAnl = $("." + sId + " #zeitintervallAnl").val();
            }
            validateZeitintervallAnlSelectOpt(start3,end3,zeitintervallAnl,sId,id);
            if(id==1){
                alertValidationforStartEndeDate($("#mstID").val(),this.value,zeitintervallAnl);
            }
        }
    });
    $("." + sId + " #jahrMassEingDataAnlStart" +id+ "").focus(function () {
        $(".ui-datepicker-calendar").hide();
        $(".ui-datepicker-month").hide();
        $(".ui-widget-content .ui-datepicker-current").hide();
        $("#ui-datepicker-div").position({
            my: "center top",
            at: "center bottom",
            of: $(this)
        });
    });
    $("." + sId + " #jahrMassEingDataAnlEnde" +id+ "").datepicker({
        dateFormat: 'yy',
        changeMonth: true,
        changeYear: true,
        showButtonPanel: true,
        onClose: function(dateText, inst) {
            var month = $("#ui-datepicker-div .ui-datepicker-month :selected").val();
            var year = $("#ui-datepicker-div .ui-datepicker-year :selected").val();
            $(this).datepicker('setDate', new Date(year, month, 1));
            var start4 = $("." + sId + " #jahrMassEingDataAnlStart" +id+ "").val();
            var end4 = $(this).val();
            if(sId == 'infosMasseneingabeDateRangeDiv' && id==4){
                var zeitintervallAnl = $(".infosMasseneingabeInside button.active").attr('data-id');
            }else{
                var zeitintervallAnl = $("." + sId + " #zeitintervallAnl").val();
            }
            validateZeitintervallAnlSelectOpt(start4,end4,zeitintervallAnl,sId,id);
            if(id==1){
                alertValidationforStartEndeDate($("#mstID").val(),this.value,zeitintervallAnl);
            }
        }
    });
    $("." + sId + " #jahrMassEingDataAnlEnde" +id+ "").focus(function () {
        $(".ui-datepicker-calendar").hide();
        $(".ui-datepicker-month").hide();
        $(".ui-widget-content .ui-datepicker-current").hide();
        $("#ui-datepicker-div").position({
            my: "center top",
            at: "center bottom",
            of: $(this)
        });
    });
    /*Year*/
    /*Week Year*/
    $("." + sId + " #wochenYMassEingDataAnlStart" +id+ "").datepicker({
        dateFormat: 'yy',
        changeMonth: true,
        changeYear: true,
        showButtonPanel: true,
        onClose: function(dateText, inst) {
            var month = $("#ui-datepicker-div .ui-datepicker-month :selected").val();
            var year = $("#ui-datepicker-div .ui-datepicker-year :selected").val();
            $(this).datepicker('setDate', new Date(year, month, 1));
            var start3 = $(this).val();
            var end3 = $("." + sId + " #wochenYMassEingDataAnlEnde" +id+ "").val();
            if(sId == 'infosMasseneingabeDateRangeDiv' && id==4){
                var zeitintervallAnl = $(".infosMasseneingabeInside button.active").attr('data-id');
            }
            else if(sId == 'infosMasseneingabeDateRangeDivMesssetelle' && id==5){
                var zeitintervallAnl = $(".infosMasseneingabeInside button.active").attr('data-id');
            }else{
                var zeitintervallAnl = $("." + sId + " #zeitintervallAnl").val();
            }
            validateZeitintervallAnlSelectOpt(start3,end3,zeitintervallAnl,sId,id);
            if(id==1){
                var week= $("." + sId + " #wochenWMassEingDataAnlStart1").val();
                if((week !='' && this.value !='') && (typeof(week) !='undefined' && typeof(this.value) !='undefined')){
                    var date = week+'-'+this.value;
                    alertValidationforStartEndeDate($("#mstID").val(),date,zeitintervallAnl);
                }
            }
        }
    });
    $("." + sId + " #wochenYMassEingDataAnlStart" +id+ "").focus(function () {
        $(".ui-datepicker-calendar").hide();
        $(".ui-datepicker-month").hide();
        $(".ui-widget-content .ui-datepicker-current").hide();
        $("#ui-datepicker-div").position({
            my: "center top",
            at: "center bottom",
            of: $(this)
        });
    });
    $("." + sId + " #wochenYMassEingDataAnlEnde" +id+ "").datepicker({
        dateFormat: 'yy',
        changeMonth: true,
        changeYear: true,
        showButtonPanel: true,
        onClose: function(dateText, inst) {
            var month = $("#ui-datepicker-div .ui-datepicker-month :selected").val();
            var year = $("#ui-datepicker-div .ui-datepicker-year :selected").val();
            $(this).datepicker('setDate', new Date(year, month, 1));
            var start4 = $("." + sId + " #wochenYMassEingDataAnlStart" +id+ "").val();
            var end4 = $(this).val();
            if(sId == 'infosMasseneingabeDateRangeDiv' && id==4){
                var zeitintervallAnl = $(".infosMasseneingabeInside button.active").attr('data-id');
            }
            else if(sId == 'infosMasseneingabeDateRangeDivMesssetelle' && id==5){
                var zeitintervallAnl = $(".infosMasseneingabeInside button.active").attr('data-id');
            }else{
                var zeitintervallAnl = $("." + sId + " #zeitintervallAnl").val();
            }
            validateZeitintervallAnlSelectOpt(start4,end4,zeitintervallAnl,sId,id);
            if(id==1){
                var week= $("." + sId + " #wochenWMassEingDataAnlEnde1").val();
                if((week !='' && this.value !='') && (typeof(week) !='undefined' && typeof(this.value) !='undefined')){
                    var date = week+'-'+this.value;
                    alertValidationforStartEndeDate($("#mstID").val(),date,zeitintervallAnl);
                }
            }
        }
    });
    $("." + sId + " #wochenYMassEingDataAnlEnde" +id+ "").focus(function () {
        $(".ui-datepicker-calendar").hide();
        $(".ui-datepicker-month").hide();
        $(".ui-widget-content .ui-datepicker-current").hide();

        $("#ui-datepicker-div").position({
            my: "center top",
            at: "center bottom",
            of: $(this)
        });
    });
    $("." + sId + " #tageMassEingDataAnlStart" +id+ "").datepicker({
        numberOfMonths: 1,
        dateFormat: 'dd.mm.yy',
        onSelect: function(selected) {
            if(id==1){
                var type = $(".infosIntBetriebsdaten #zeitintervallAnl").val();
                var mstID = $("#mstID").val();var date = $(this).val();
                alertValidationforStartEndeDate(mstID,date,type);
            }
            $("." + sId + " #tageMassEingDataAnlEnde" +id+ "").datepicker("option","minDate", selected)
        }
    });
    $("." + sId + " #tageMassEingDataAnlEnde" +id+ "").datepicker({
        numberOfMonths: 1,
        dateFormat: 'dd.mm.yy',
        onSelect: function(selected) {
            if(id==1){
                var type = $(".infosIntBetriebsdaten #zeitintervallAnl").val();
                var mstID = $("#mstID").val();var date = $(this).val();
                alertValidationforStartEndeDate(mstID,date,type);
            }
            $("." + sId + " #tageMassEingDataAnlStart" +id+ "").datepicker("option","maxDate", selected)
        }
    });
}

/*datePickerForInterneBetriebsdatenAnlPrdkt*/

/* Produkte/Messsetelle mm 01-03-2021*/
/*Validation for the start date and end date*/
/*new-mm-start 06-04-2021*/
function datePickerForInterneBetriebsdatenAnlPrdkt(sId,id){


    $("." + sId + " #monateMassEingDataAnlPrdktStart" +id+"").datepicker({
        dateFormat: 'mm.yy',
        changeMonth: true,
        changeYear: true,
        showButtonPanel: true,
        onClose: function(dateText, inst) {
            var month = $("#ui-datepicker-div .ui-datepicker-month :selected").val();
            var year = $("#ui-datepicker-div .ui-datepicker-year :selected").val();
            $(this).datepicker('setDate', new Date(year, month, 1));
            var strtStr1 = $(this).val();
            var start1 = strtStr1.split('.');
            var endStr1 = $("." + sId + " #monateMassEingDataAnlPrdktEnde" +id+ "").val();
            var end1 = endStr1.split('.');
            if(sId == 'infosMasseneingabeDateRangeDiv' && id==4){
                var zeitintervallAnl = $(".infosMasseneingabeInside button.active").attr('data-id');
            }
            /*new-mm-start 30-03-2021*/
            else if(sId == 'infosMasseneingabeDateRangeDivPrdkt' && id==6){
                var zeitintervallAnl = $(".infosMasseneingabeInside button.active").attr('data-id');
            }
            else if(sId == 'infosMasseneingabeDateRangeDivMesssetelle' && id==5){
                var zeitintervallAnl = $(".infosMasseneingabeInside button.active").attr('data-id');
            }
            /*new-mm-end 30-03-2021*/
            else{
                var zeitintervallAnl = $("." + sId + " #zeitintervallAnlPrdkt").val();
            }

            /*new-mm-start 08-04-2021*/
            if(sId == 'infosMasseneingabeDateRangeDivPrdkt' && id==6 ){
                validateZeitintervallAnlPrdktSelectOpt(strtStr1,endStr1,zeitintervallAnl,sId,id);
            }else{
                validateZeitintervallAnlPrdktSelectOpt(start1[1],end1[1],zeitintervallAnl,sId,id);
            }
            /*new-mm-end 08-04-2021*/


            if(id==1){
                /*new-mm-start 06-04-2021*/
                var type = $(".infosIntEnergiedaten #zeitintervallAnlPrdkt").val();
                var mstID = $("#mstID").val();var date = $(this).val();
                var prd_anl_ID =  $("#nextPrevMstIDPrdktID").val();
                if ($("input[name='BetriebsdatenFilter']:checked").val() == '1') {
                    alertValidationforPrdktStartEndeDate(prd_anl_ID,date,type);
                }
                if ($("input[name='BetriebsdatenFilter']:checked").val() == '2') {
                    alertValidationforStartEndeDateMesssetelle(mstID,date,type);
                }
                /*new-mm-start 06-04-2021*/
            }
        }
    });
    $("." + sId + " #monateMassEingDataAnlPrdktStart" +id+ "").focus(function () {
        $(".ui-datepicker-calendar").hide();
        $(".ui-widget-content .ui-datepicker-current").hide();
        $("#ui-datepicker-div").position({
            my: "center top",
            at: "center bottom",
            of: $(this)
        });
    });
    $("." + sId + " #monateMassEingDataAnlPrdktEnde" +id+ "").datepicker({
        dateFormat: 'mm.yy',
        changeMonth: true,
        changeYear: true,
        showButtonPanel: true,
        onClose: function(dateText, inst) {
            var month = $("#ui-datepicker-div .ui-datepicker-month :selected").val();
            var year = $("#ui-datepicker-div .ui-datepicker-year :selected").val();
            $(this).datepicker('setDate', new Date(year, month, 1));
            var strtStr2 = $("." + sId + " #monateMassEingDataAnlPrdktStart" +id+ "").val();
            var start2 = strtStr2.split('.');
            var endStr2 = $(this).val();
            var end2 = endStr2.split('.');
            if(sId == 'infosMasseneingabeDateRangeDiv' && id==4){
                var zeitintervallAnl = $(".infosMasseneingabeInside button.active").attr('data-id');
            }
            /*new-mm-start 30-03-2021*/
            else if(sId == 'infosMasseneingabeDateRangeDivPrdkt' && id==6){
                var zeitintervallAnl = $(".infosMasseneingabeInside button.active").attr('data-id');
            }
            else if(sId == 'infosMasseneingabeDateRangeDivMesssetelle' && id==6){
                var zeitintervallAnl = $(".infosMasseneingabeInside button.active").attr('data-id');
            }
            /*new-mm-end 30-03-2021*/
            else{
                var zeitintervallAnl = $("." + sId + " #zeitintervallAnlPrdkt").val();
            }
            validateZeitintervallAnlPrdktSelectOpt(start2[1],end2[1],zeitintervallAnl,sId,id);
            if(id==1){
                /*new-mm-start 06-04-2021*/
                var type = $(".infosIntEnergiedaten #zeitintervallAnlPrdkt").val();
                var mstID = $("#mstID").val();var date = $(this).val();
                var prd_anl_ID =  $("#nextPrevMstIDPrdktID").val();
                if ($("input[name='BetriebsdatenFilter']:checked").val() == '1') {
                    alertValidationforPrdktStartEndeDate(prd_anl_ID,date,type);
                }
                if ($("input[name='BetriebsdatenFilter']:checked").val() == '2') {
                    alertValidationforStartEndeDateMesssetelle(mstID,date,type);
                }
                /*new-mm-start 06-04-2021*/
            }
        }
    });
    $("." + sId + " #monateMassEingDataAnlPrdktEnde" +id+ "").focus(function () {
        $(".ui-datepicker-calendar").hide();
        $(".ui-widget-content .ui-datepicker-current").hide();
        $("#ui-datepicker-div").position({
            my: "center top",
            at: "center bottom",
            of: $(this)
        });
    });

    /*Year*/
    $("." + sId + " #jahrMassEingDataAnlPrdktStart" +id+ "").datepicker({
        dateFormat: 'yy',
        changeMonth: true,
        changeYear: true,
        showButtonPanel: true,
        onClose: function(dateText, inst) {
            var month = $("#ui-datepicker-div .ui-datepicker-month :selected").val();
            var year = $("#ui-datepicker-div .ui-datepicker-year :selected").val();
            $(this).datepicker('setDate', new Date(year, month, 1));
            var start3 = $(this).val();
            var end3 = $("." + sId + " #jahrMassEingDataAnlPrdktEnde" +id+ "").val();
            if(sId == 'infosMasseneingabeDateRangeDiv' && id==4){
                var zeitintervallAnl = $(".infosMasseneingabeInside button.active").attr('data-id');
            }
            /*new-mm-start 30-03-2021*/
            else if(sId == 'infosMasseneingabeDateRangeDivPrdkt' && id==6){
                var zeitintervallAnl = $(".infosMasseneingabeInside button.active").attr('data-id');
            }
            else if(sId == 'infosMasseneingabeDateRangeDivMesssetelle' && id==6){
                var zeitintervallAnl = $(".infosMasseneingabeInside button.active").attr('data-id');
            }
            /*new-mm-end 30-03-2021*/
            else{
                var zeitintervallAnl = $("." + sId + " #zeitintervallAnlPrdkt").val();
            }
            validateZeitintervallAnlPrdktSelectOpt(start3,end3,zeitintervallAnl,sId,id);
            if(id==1){
                /*new-mm-start 06-04-2021*/
                var type = $(".infosIntEnergiedaten #zeitintervallAnlPrdkt").val();
                var mstID = $("#mstID").val();var date = $(this).val();
                var prd_anl_ID =  $("#nextPrevMstIDPrdktID").val();
                if ($("input[name='BetriebsdatenFilter']:checked").val() == '1') {
                    alertValidationforPrdktStartEndeDate(prd_anl_ID,date,type);
                }
                if ($("input[name='BetriebsdatenFilter']:checked").val() == '2') {
                    alertValidationforStartEndeDateMesssetelle(mstID,date,type);
                }
                /*new-mm-start 06-04-2021*/
            }
        }
    });
    $("." + sId + " #jahrMassEingDataAnlPrdktStart" +id+ "").focus(function () {
        $(".ui-datepicker-calendar").hide();
        $(".ui-datepicker-month").hide();
        $(".ui-widget-content .ui-datepicker-current").hide();
        $("#ui-datepicker-div").position({
            my: "center top",
            at: "center bottom",
            of: $(this)
        });
    });
    $("." + sId + " #jahrMassEingDataAnlPrdktEnde" +id+ "").datepicker({
        dateFormat: 'yy',
        changeMonth: true,
        changeYear: true,
        showButtonPanel: true,
        onClose: function(dateText, inst) {
            var month = $("#ui-datepicker-div .ui-datepicker-month :selected").val();
            var year = $("#ui-datepicker-div .ui-datepicker-year :selected").val();
            $(this).datepicker('setDate', new Date(year, month, 1));
            var start4 = $("." + sId + " #jahrMassEingDataAnlPrdktStart" +id+ "").val();
            var end4 = $(this).val();
            if(sId == 'infosMasseneingabeDateRangeDiv' && id==4){
                var zeitintervallAnl = $(".infosMasseneingabeInside button.active").attr('data-id');
            }
            /*new-mm-start 30-03-2021*/
            else if(sId == 'infosMasseneingabeDateRangeDivPrdkt' && id==6){
                var zeitintervallAnl = $(".infosMasseneingabeInside button.active").attr('data-id');
            }
            else if(sId == 'infosMasseneingabeDateRangeDivMesssetelle' && id==6){
                var zeitintervallAnl = $(".infosMasseneingabeInside button.active").attr('data-id');
            }
            /*new-mm-end 30-03-2021*/
            else{
                var zeitintervallAnl = $("." + sId + " #zeitintervallAnlPrdkt").val();
            }
            validateZeitintervallAnlPrdktSelectOpt(start4,end4,zeitintervallAnl,sId,id);
            if(id==1){
                /*new-mm-start 06-04-2021*/
                var type = $(".infosIntEnergiedaten #zeitintervallAnlPrdkt").val();
                var mstID = $("#mstID").val();var date = $(this).val();
                var prd_anl_ID =  $("#nextPrevMstIDPrdktID").val();
                if ($("input[name='BetriebsdatenFilter']:checked").val() == '1') {
                    alertValidationforPrdktStartEndeDate(prd_anl_ID,date,type);
                }
                if ($("input[name='BetriebsdatenFilter']:checked").val() == '2') {
                    alertValidationforStartEndeDateMesssetelle(mstID,date,type);
                }
                /*new-mm-start 06-04-2021*/
            }
        }
    });
    $("." + sId + " #jahrMassEingDataAnlPrdktEnde" +id+ "").focus(function () {
        $(".ui-datepicker-calendar").hide();
        $(".ui-datepicker-month").hide();
        $(".ui-widget-content .ui-datepicker-current").hide();
        $("#ui-datepicker-div").position({
            my: "center top",
            at: "center bottom",
            of: $(this)
        });
    });
    /*Year*/
    /*Week Year*/
    $("." + sId + " #wochenYMassEingDataAnlPrdktStart" +id+ "").datepicker({
        dateFormat: 'yy',
        changeMonth: true,
        changeYear: true,
        showButtonPanel: true,
        onClose: function(dateText, inst) {
            var month = $("#ui-datepicker-div .ui-datepicker-month :selected").val();
            var year = $("#ui-datepicker-div .ui-datepicker-year :selected").val();
            $(this).datepicker('setDate', new Date(year, month, 1));
            var start3 = $(this).val();
            var end3 = $("." + sId + " #wochenYMassEingDataAnlPrdktEnde" +id+ "").val();
            if(sId == 'infosMasseneingabeDateRangeDiv' && id==4){
                var zeitintervallAnl = $(".infosMasseneingabeInside button.active").attr('data-id');
            }
            /*new-mm-start 30-03-2021*/
            else if(sId == 'infosMasseneingabeDateRangeDivPrdkt' && id==6){
                var zeitintervallAnl = $(".infosMasseneingabeInside button.active").attr('data-id');
            }
            else if(sId == 'infosMasseneingabeDateRangeDivMesssetelle' && id==6){
                var zeitintervallAnl = $(".infosMasseneingabeInside button.active").attr('data-id');
            }
            /*new-mm-end 30-03-2021*/
            else{
                var zeitintervallAnl = $("." + sId + " #zeitintervallAnlPrdkt").val();
            }
            validateZeitintervallAnlPrdktSelectOpt(start3,end3,zeitintervallAnl,sId,id);
            if(id==1){
                var week= $("." + sId + " #wochenWMassEingDataAnlPrdktStart1").val();
                if((week !='' && this.value !='') && (typeof(week) !='undefined' && typeof(this.value) !='undefined')){
                    var date = week+'-'+this.value;

                    /*new-mm-start 06-04-2021*/
                    var type = $(".infosIntEnergiedaten #zeitintervallAnlPrdkt").val();
                    var mstID = $("#mstID").val();
                    //var date = $(this).val();
                    var prd_anl_ID =  $("#nextPrevMstIDPrdktID").val();
                    if ($("input[name='BetriebsdatenFilter']:checked").val() == '1') {
                        alertValidationforPrdktStartEndeDate(prd_anl_ID,date,type);
                    }
                    if ($("input[name='BetriebsdatenFilter']:checked").val() == '2') {
                        alertValidationforStartEndeDateMesssetelle(mstID,date,type);
                    }
                    /*new-mm-start 06-04-2021*/



                }
            }
        }
    });
    $("." + sId + " #wochenYMassEingDataAnlPrdktStart" +id+ "").focus(function () {
        $(".ui-datepicker-calendar").hide();
        $(".ui-datepicker-month").hide();
        $(".ui-widget-content .ui-datepicker-current").hide();
        $("#ui-datepicker-div").position({
            my: "center top",
            at: "center bottom",
            of: $(this)
        });
    });
    $("." + sId + " #wochenYMassEingDataAnlPrdktEnde" +id+ "").datepicker({
        dateFormat: 'yy',
        changeMonth: true,
        changeYear: true,
        showButtonPanel: true,
        onClose: function(dateText, inst) {
            var month = $("#ui-datepicker-div .ui-datepicker-month :selected").val();
            var year = $("#ui-datepicker-div .ui-datepicker-year :selected").val();
            $(this).datepicker('setDate', new Date(year, month, 1));
            var start4 = $("." + sId + " #wochenYMassEingDataAnlPrdktStart" +id+ "").val();
            var end4 = $(this).val();
            if(sId == 'infosMasseneingabeDateRangeDiv' && id==4){
                var zeitintervallAnl = $(".infosMasseneingabeInside button.active").attr('data-id');
            }
            /*new-mm-start 30-03-2021*/
            else if(sId == 'infosMasseneingabeDateRangeDivPrdkt' && id==6){
                var zeitintervallAnl = $(".infosMasseneingabeInside button.active").attr('data-id');
            }
            else if(sId == 'infosMasseneingabeDateRangeDivMesssetelle' && id==6){
                var zeitintervallAnl = $(".infosMasseneingabeInside button.active").attr('data-id');
            }
            /*new-mm-end 30-03-2021*/
            else{
                var zeitintervallAnl = $("." + sId + " #zeitintervallAnlPrdkt").val();
            }
            validateZeitintervallAnlPrdktSelectOpt(start4,end4,zeitintervallAnl,sId,id);
            if(id==1){
                var week= $("." + sId + " #wochenWMassEingDataAnlPrdktEnde1").val();
                if((week !='' && this.value !='') && (typeof(week) !='undefined' && typeof(this.value) !='undefined')){
                    var date = week+'-'+this.value;

                    /*new-mm-start 06-04-2021*/
                    var type = $(".infosIntEnergiedaten #zeitintervallAnlPrdkt").val();
                    var mstID = $("#mstID").val();
                    //var date = $(this).val();
                    var prd_anl_ID =  $("#nextPrevMstIDPrdktID").val();
                    if ($("input[name='BetriebsdatenFilter']:checked").val() == '1') {
                        alertValidationforPrdktStartEndeDate(prd_anl_ID,date,type);
                    }
                    if ($("input[name='BetriebsdatenFilter']:checked").val() == '2') {
                        alertValidationforStartEndeDateMesssetelle(mstID,date,type);
                    }
                    /*new-mm-start 06-04-2021*/

                }
            }
        }
    });
    $("." + sId + " #wochenYMassEingDataAnlPrdktEnde" +id+ "").focus(function () {
        $(".ui-datepicker-calendar").hide();
        $(".ui-datepicker-month").hide();
        $(".ui-widget-content .ui-datepicker-current").hide();

        $("#ui-datepicker-div").position({
            my: "center top",
            at: "center bottom",
            of: $(this)
        });
    });
    $("." + sId + " #tageMassEingDataAnlPrdktStart" +id+ "").datepicker({
        numberOfMonths: 1,
        dateFormat: 'dd.mm.yy',
        onSelect: function(selected) {
            if(id == 1){
                var type = $(".infosIntEnergiedaten #zeitintervallAnlPrdkt").val();
                var mstID = $("#mstID").val();var date = $(this).val();

                /*new-mm-start 06-04-2021*/
                var prd_anl_ID =  $("#nextPrevMstIDPrdktID").val();
                if ($("input[name='BetriebsdatenFilter']:checked").val() == '1') {

                    alertValidationforPrdktStartEndeDate(prd_anl_ID,date,type);
                }
                if ($("input[name='BetriebsdatenFilter']:checked").val() == '2') {
                    alertValidationforStartEndeDateMesssetelle(mstID,date,type);
                }
                /*new-mm-start 06-04-2021*/
            }

            $("." + sId + " #tageMassEingDataAnlPrdktEnde" +id+ "").datepicker("option","minDate", selected)
        }
    });
    $("." + sId + " #tageMassEingDataAnlPrdktEnde" +id+ "").datepicker({
        numberOfMonths: 1,
        dateFormat: 'dd.mm.yy',
        onSelect: function(selected) {
            if(id==1){
                var type = $(".infosIntEnergiedaten #zeitintervallAnlPrdkt").val();
                var mstID = $("#mstID").val();var date = $(this).val();

                /*new-mm-start 06-04-2021*/
                var prd_anl_ID =  $("#nextPrevMstIDPrdktID").val();
                if ($("input[name='BetriebsdatenFilter']:checked").val() == '1') {

                    alertValidationforPrdktStartEndeDate(prd_anl_ID,date,type);
                }
                if ($("input[name='BetriebsdatenFilter']:checked").val() == '2') {
                    alertValidationforStartEndeDateMesssetelle(mstID,date,type);
                }
                /*new-mm-start 06-04-2021*/

            }
            $("." + sId + " #tageMassEingDataAnlPrdktStart" +id+ "").datepicker("option","maxDate", selected)
        }
    });
}
/*new-mm-start 06-04-2021*/

/* Produkte DataTable Old Cross Apply Query mm 25-02-2021*/
/* new-mm-start */
/*mm-comment*/
// function produkteDataTable(){
//
//     $.ajax({
//         type: "POST",
//         async: !0,
//         url: "php/getManuellInterneData.php",
//         data: {
//             id: "ProdukteTbl",
//             nameDB: $("#nameDB").val()
//         },
//         success: function(a) {
//             a = JSON.parse(a);
//             var b = a.length;
//             //console.log(a);

//             tblMstOhneZeitintervallIMw.clear().draw();
//                 for (var e = 0; e < b; e++){
//                     tblMstOhneZeitintervallIMw.row.add( [a[e].prd_ID,a[e].anl_Col,a[e].anl_ID, a[e].namePrd, a[e].artikelNrPrd,a[e].bezeichnungAnl]).draw();
//                     //tblMstOhneZeitintervallIMw.column([0,1]).visible(!1);

//                     $("#tblMstOhneZeitintervallIMw tr").css("cursor", "pointer");
//                     $("#tblMstOhneZeitintervallIMw").off("dblclick", "tr");

//                 }
//                var columnHide = tblMstOhneZeitintervallIMw.columns([1,2]);
//                columnHide.visible(! columnHide.visible() );


//                 $("#tblMstOhneZeitintervallIMw").on("dblclick", "tr", function() {
//                     var rowdata = tblMstOhneZeitintervallIMw.row(this).data();
//                     //resetFormAllgemein('infosIntEnergiedaten',1);
//                     produkteListingDblClickRow(rowdata[0],rowdata[1],rowdata[2],'infosIntEnergiedaten');
//
//                     //produkteListingDblClickRow($("#prd_ID").val(),$("#anl_Col").val(),$("#anl_ID").val(),'infosIntEnergiedaten');
//                     //var prd_id_data = rowdata[0];
//                     //alert(prd_id_data);
//                     $("#prd_ID").val(rowdata[0]);
//                     $("#anl_Col").val(rowdata[1]);
//                     $("#anl_ID").val(rowdata[2]);
//                     // $("#namePrd").val(rowdata[3]);
//                     // $("#artikelNrPrd").val(rowdata[4]);
//                     // $("#bezeichnungAnl").val(rowdata[5]);

//                     });
//                 }
//     });
// }
/*mm-comment*/
/* new-mm-end */


/* Produkte Anlarge New DataTable mm 02-03-2021*/
/* new-mm-start */
/*new-mm-start 25-03-2021*/
function produkteAnlargeDataTable(){
    $.ajax({
        type: "POST",
        async: !0,
        url: "php/getManuellInterneData.php",
        data: {
            id: "ProdukteAnlDataTblFacityData",
            nameDB: $("#nameDB").val()
        },
        success: function(a) {
            a = JSON.parse(a);
            var b = a.length;
            //console.log(a);
            tblMstOhneZeitintervallIMw.clear().draw();
            for (var e = 0; e < b; e++){
                // tblMstOhneZeitintervallIMw.row.add( [a[e].prd_ID,a[e].anl_Col,a[e].anl_ID, a[e].type,a[e].namePrd, a[e].artikelNrPrd,a[e].bezeichnungAnl]).draw();
                tblMstOhneZeitintervallIMw.row.add( [a[e].id,a[e].prd_id,a[e].anl_col,a[e].anl_id,a[e].type,a[e].artikelNrPrd,a[e].namePrd,a[e].bezeichnungAnl]).draw();
                //tblMstOhneZeitintervallIMw.column([0,1]).visible(!1);
                $("#tblMstOhneZeitintervallIMw tr").css("cursor", "pointer");
                $("#tblMstOhneZeitintervallIMw").off("dblclick", "tr");
            }
            var columnHide = tblMstOhneZeitintervallIMw.columns([0,1,2,3,4]);
            columnHide.visible(! columnHide.visible() );

            $("#tblMstOhneZeitintervallIMw").on("dblclick", "tr", function() {
                var rowdata = tblMstOhneZeitintervallIMw.row(this).data();
                //resetFormAllgemein('infosIntEnergiedaten',1);
                /*produkteListingDblClickRow(rowdata[0],rowdata[1],rowdata[2],'infosIntEnergiedaten');*/
                produkteAnlageListingDblClickRow(rowdata[1],rowdata[2],rowdata[3],'infosIntEnergiedaten');
                $("#prd_ID").val(rowdata[1]);
                $("#anl_Col").val(rowdata[2]);
                $("#anl_ID").val(rowdata[3]);
                /*new-mm-start 25-03-2021*/
                $("#nextPrevMstIDPrdktID").val(rowdata[0]);
                /*new-mm-end 25-03-2021*/
                //alert(rowdata[0]);
                // $("#namePrd").val(rowdata[3]);
                // $("#artikelNrPrd").val(rowdata[4]);
                // $("#bezeichnungAnl").val(rowdata[5]);

                /*new-mm-start 09-04-2021 */
                $('#tageMassEingDataAnlPrdktStart1').datepicker( "option" , { minDate: null, maxDate: null} );
                $('#tageMassEingDataAnlPrdktEnde1').datepicker( "option" , { minDate: null, maxDate: null} );
                /*new-mm-end 09-04-2021*/

            });
        }
    });
}
/*new-mm-start 25-03-2021*/
/* new-mm-end */

/*mm-comment 22-03-2021*/
/*$("#tblMstOhneZeitintervall_IMw").on("dblclick", "tr", function() {
    var rowdata = tblMstOhneZeitintervall_IMw.row(this).data();
    //resetFormAllgemein('infosIntEnergiedaten',1);
    //produkteListingDblClickRow(rowdata[0],rowdata[1],rowdata[2],'infosIntEnergiedaten');
    produkteAnlageListingDblClickRow(rowdata[0],rowdata[1],rowdata[2],'infosIntEnergiedaten');
    $("#prd_ID").val(rowdata[0]);
    $("#anl_Col").val(rowdata[1]);
    $("#anl_ID").val(rowdata[2]);
    // $("#namePrd").val(rowdata[3]);
    // $("#artikelNrPrd").val(rowdata[4]);
    // $("#bezeichnungAnl").val(rowdata[5]);
    });*/
/*mm-comment 22-03-2021*/

/* new-mm-end */

/* Search Image Produkte Anlarge Popup New DataTable 16-03-2021*/
/* new-mm-start */
/*new-mm-start 26-03-2021*/
function searchImgprodukteAnlargeDataTable(){
    $.ajax({
        type: "POST",
        async: !0,
        url: "php/getManuellInterneData.php",
        data: {
            id: "ProdukteAnlDataTbl",
            nameDB: $("#nameDB").val()
        },
        success: function(a) {
            a = JSON.parse(a);
            var b = a.length;
            //console.log(a);
            tblMstOhneZeitintervallIMwPrdktSuche.clear().draw();
            for (var e = 0; e < b; e++){
                // tblMstOhneZeitintervallIMwPrdktSuche.row.add( [a[e].prd_ID,a[e].anl_Col,a[e].anl_ID, a[e].type,a[e].namePrd, a[e].artikelNrPrd,a[e].bezeichnungAnl]).draw();
                tblMstOhneZeitintervallIMwPrdktSuche.row.add( [a[e].id,a[e].prd_id,a[e].anl_col,a[e].anl_id,a[e].type,a[e].artikelNrPrd,a[e].namePrd,a[e].bezeichnungAnl]).draw();
                //tblMstOhneZeitintervallIMw.column([0,1]).visible(!1);
                $("#tblMstOhneZeitintervallIMwPrdktSuche tr").css("cursor", "pointer");
                $("#tblMstOhneZeitintervallIMwPrdktSuche").off("dblclick", "tr");
            }
            var columnHide = tblMstOhneZeitintervallIMwPrdktSuche.columns([0,1,2,3,4]);
            columnHide.visible(! columnHide.visible() );

            $("#tblMstOhneZeitintervallIMwPrdktSuche").on("dblclick", "tr", function() {
                var rowdata = tblMstOhneZeitintervallIMwPrdktSuche.row(this).data();
                //resetFormAllgemein('infosIntEnergiedaten',1);
                /*produkteListingDblClickRow(rowdata[0],rowdata[1],rowdata[2],'infosIntEnergiedaten');*/
                produkteAnlageListingDblClickRow(rowdata[1],rowdata[2],rowdata[3],'infosIntEnergiedaten');
                $("#prd_ID").val(rowdata[1]);
                $("#anl_Col").val(rowdata[2]);
                $("#anl_ID").val(rowdata[3]);
                /*new-mm-start 26-03-2021*/
                $("#nextPrevMstIDPrdktID").val(rowdata[0]);
                /*new-mm-end 26-03-2021*/

                // $("#namePrd").val(rowdata[3]);
                // $("#artikelNrPrd").val(rowdata[4]);
                // $("#bezeichnungAnl").val(rowdata[5]);

                /*new-mm-start 09-04-2021 */
                $('#tageMassEingDataAnlPrdktStart1').datepicker( "option" , { minDate: null, maxDate: null} );
                $('#tageMassEingDataAnlPrdktEnde1').datepicker( "option" , { minDate: null, maxDate: null} );
                /*new-mm-end 09-04-2021*/

                $("#tblAnlPrdktMStOhneZeitintervallIMwSearchContainer").dialog("close");
            });
        }
    });
}
/*new-mm-end 26-03-2021*/
/* new-mm-end */
/*Interne Messwerte Start 20-10-2020*/
function keinZeitIntervallZugewiesen(){
    $.ajax({
        type: "POST",
        async: !0,
        url: "php/getManuellInterneData.php",
        data: {
            id: "KeinZeitintervallTblFacilityData",
            /*new-mm-start 23-03-2021*/
            typ: "energiedaten",
            /*new-mm-end 23-03-2021*/
            nameDB: $("#nameDB").val()
        },
        success: function(a) {
            a = JSON.parse(a);
            var b = a.length;//console.log(a);
            tblAnlOhneZeitintervallIMw.clear().draw();
            for (var e = 0; e < b; e++){
                /*new-mm-start 26-03-2021*/
                tblAnlOhneZeitintervallIMw.row.add( [a[e].T1_mst_ID, a[e].nameMSt, a[e].anlageMst,convertDateFormateForDataTbl(a[e].intTp_ID,a[e].startDate), convertDateFormateForDataTbl(a[e].intTp_ID,a[e].endDate),a[e].unit,typeValueEinheitControlSys(a[e].einheitControlSys), capitalizeLetter(a[e].type), a[e].note]).draw();
                /*new-mm-start 26-03-2021*/
                //tblAnlOhneZeitintervallIMw.column([0,1]).visible(!1);
                $("#tblAnlOhneZeitintervallIMw tr").css("cursor", "pointer");
                $("#tblAnlOhneZeitintervallIMw").off("dblclick", "tr");
            }
            var columnHide = tblAnlOhneZeitintervallIMw.columns([0]);
            columnHide.visible(! columnHide.visible() );
            $("#tblAnlOhneZeitintervallIMw").on("dblclick", "tr", function() {
                var a = tblAnlOhneZeitintervallIMw.row(this).data();
                //console.log(a);
                resetFormAllgemein('infosIntBetriebsdaten',1);
                keinZeitIntervallZugewiesenDblClickRow(a[0],'infosIntBetriebsdaten');
                $("#mstID").val(a[0]);
                $("#anlIMw").val(a[1]);
                $("#anlNrIMw").val(a[2]);
                $("#startDateDB").val(a[3]);
                $("#endDateDB").val(a[4]);

                /*new-mm-start 26-03-2021*/
                $("#nextPrevMstID").val(a[0]);
                /*new-mm-end 26-03-2021*/
                /*new-mm-start 09-04-2021 */
                $('.zeitintervallAnl_1 input').datepicker( "option" , { minDate: null, maxDate: null} );
                /*new-mm-end 09-04-2021*/
                setTimeout(function(){
                    $("#unitIDB").val($(".infosIntBetriebsdaten #einheitAnl").val());
                    $("#controlSysIDDB").val($(".infosIntBetriebsdaten #control_system").val());
                }, 3000);
            });
        }
    });
}

/*checkbox search query*/
/*new-mm-start 22-03-2021*/
function searchKeinZeitIntervallZugewiesen(checkboxSearch){
    $.ajax({
        type: "POST",
        async: !0,
        url: "php/getManuellInterneData.php",
        data: {
            id: "SearchKeinZeitintervallTbl",
            nameDB: $("#nameDB").val(),
            typ: "energiedaten",
            checkboxSearch:checkboxSearch,
        },
        success: function(a) {
            a = JSON.parse(a);
            var b = a.length;
            //console.log(a);
            tblAnlOhneZeitintervallIMw.clear().draw();
            for (var e = 0; e < b; e++){
                /*new-mm-start 26-03-2021*/
                tblAnlOhneZeitintervallIMw.row.add( [a[e].T1_mst_ID, a[e].nameMSt, a[e].anlageMst,convertDateFormateForDataTbl(a[e].intTp_ID,a[e].startDate), convertDateFormateForDataTbl(a[e].intTp_ID,a[e].endDate),a[e].unit,typeValueEinheitControlSys(a[e].einheitControlSys), capitalizeLetter(a[e].type), a[e].note]).draw();
                /*new-mm-end 26-03-2021*/
                //tblAnlOhneZeitintervallIMw.column([0,1]).visible(!1);
                $("#tblAnlOhneZeitintervallIMw tr").css("cursor", "pointer");
                $("#tblAnlOhneZeitintervallIMw").off("dblclick", "tr");
            }
            var columnHide = tblAnlOhneZeitintervallIMw.columns([0]);
            columnHide.visible(! columnHide.visible() );
            $("#tblAnlOhneZeitintervallIMw").on("dblclick", "tr", function() {
                var a = tblAnlOhneZeitintervallIMw.row(this).data();
                //console.log(a);
                resetFormAllgemein('infosIntBetriebsdaten',1);
                keinZeitIntervallZugewiesenDblClickRow(a[0],'infosIntBetriebsdaten');
                $("#mstID").val(a[0]);
                $("#anlIMw").val(a[1]);
                $("#anlNrIMw").val(a[2]);
                $("#startDateDB").val(a[3]);
                $("#endDateDB").val(a[4]);
                /*new-mm-start 26-03-2021*/
                $("#nextPrevMstID").val(a[0]);
                /*new-mm-end 26-03-2021*/

            });
        }
    });
}

function searchImgKeinZeitIntervallZugewiesen(checkboxSearch){
    $.ajax({
        type: "POST",
        async: !0,
        url: "php/getManuellInterneData.php",
        data: {
            id: "SearchKeinZeitintervallTbl",
            nameDB: $("#nameDB").val(),
            checkboxSearch: checkboxSearch,
            typ: "energiedaten",
        },
        success: function(a) {
            a = JSON.parse(a);
            var b = a.length;
            //console.log(a);
            tblAnlOhneZeitintervallIMwSuchen.clear().draw();
            for (var e = 0; e < b; e++){
                /*new-mm-start 26-03-2021*/
                tblAnlOhneZeitintervallIMwSuchen.row.add( [a[e].T1_mst_ID, a[e].nameMSt, a[e].anlageMst,convertDateFormateForDataTbl(a[e].intTp_ID,a[e].startDate), convertDateFormateForDataTbl(a[e].intTp_ID,a[e].endDate),a[e].unit,typeValueEinheitControlSys(a[e].einheitControlSys), capitalizeLetter(a[e].type), a[e].note]).draw();
                /*new-mm-end 26-03-2021*/
                $("#tblAnlOhneZeitintervallIMwSuchen tr").css("cursor", "pointer");
                $("#tblAnlOhneZeitintervallIMwSuchen").off("dblclick", "tr");
            }
            var columnHide = tblAnlOhneZeitintervallIMwSuchen.columns([0]);
            columnHide.visible(! columnHide.visible() );
            $("#tblAnlOhneZeitintervallIMwSuchen").on("dblclick", "tr", function() {
                var a = tblAnlOhneZeitintervallIMwSuchen.row(this).data();
                //console.log(a);
                resetFormAllgemein('infosIntBetriebsdaten',1);
                keinZeitIntervallZugewiesenDblClickRow(a[0],'infosIntBetriebsdaten');
                $("#mstID").val(a[0]);
                $("#anlIMw").val(a[1]);
                $("#anlNrIMw").val(a[2]);

                /*new-mm-start 26-03-2021*/
                $("#nextPrevMstID").val(a[0]);
                /*new-mm-end 26-03-2021*/
                $("#tblAnlOhneZeitintervallIMwSearchContainer").dialog("close");
            });
        }
    });
}
/*new-mm-end 22-03-2021*/
/*Produkte mm 26-02-2021*/
/*new-mm-start*/
function produkteListingDblClickRow(Prd_Id,Anl_Col,Anl_Id,sId){
    $.ajax({
        type: "POST",
        async: !0,
        url: "php/getManuellInterneData.php",
        data: {
            nameDB: $("#nameDB").val(),
            id:'displayDataPrdkt',
            Prd_Id:Prd_Id,
            Anl_Col:Anl_Col,
            Anl_Id:Anl_Id
        },
        success: function(e) {
            a = JSON.parse(e);
            var b = a.length;
            //console.log(a);
            if (b>0) {

                $("#mstIMw").val(a[0]['namePrd']);
                // var sDt = convertDateFormateForDataTbl(a[0]['intTp_ID'],a[0]['startDate']);
                // var eDt = convertDateFormateForDataTbl(a[0]['intTp_ID'],a[0]['endDate']);
                // $("." + sId + " #zeitintervallAnl").val(a[0]['intTp_ID']);
                // $("." + sId + " #einheitAnl").val(a[0]['unt_ID']);
                // $("." + sId + " #notizBdeIMw").val(a[0]['note']);
                // zeitintervallAnlInputsVisibleInvisible(a[0]['intTp_ID'],sDt,eDt,a[0]['ending'],'infosIntBetriebsdaten',1);
                // $("." + sId + " #anlIMwNoEnding").prop('checked', a[0]['ending']);
                // $("." + sId + " #anlIMwNoEnding").val(a[0]['ending']);
                // if(a[0]['intTp_ID']==2){
                //     $("." + sId + " #wochenWMassEingDataAnlStart1").val(a[0]['startWeek']);
                //     $("." + sId + " #wochenWMassEingDataAnlEnde1").val(a[0]['endWeek']);
                // }
                // $("." + sId + " .control_system_div").show();
                // $("." + sId + " #control_system").val(a[0]['einheitControlSys']);
                // einheitAnlOnChangeChildSelectOpt(a[0]['unt_ID']);
            }
        }
    })
}
/*new-mm-end*/
/*Produkte Anlarge mm 03-03-2021*/
/*new-mm-start*/
function produkteAnlageListingDblClickRow(Prd_Id,Anl_Col,Anl_Id,sId){
    $.ajax({
        type: "POST",
        async: !0,
        url: "php/getManuellInterneData.php",
        data: {
            nameDB: $("#nameDB").val(),
            id:'displayDataPrdktAnlage',
            Prd_Id:Prd_Id,
            Anl_Col:Anl_Col,
            Anl_Id:Anl_Id

        },
        success: function(e) {
            a = JSON.parse(e);
            var b = a.length;
            //console.log(a);
            if (b>0) {


                $("." + sId + " #mstIMw").val(a[0]['mstIMw']).prop('disabled',false);
                $("." + sId + " #artikelnummerIntBde").val(a[0]['artikelNrPrd']).prop('disabled',true);
                $("." + sId + " #bezeichnungIntBde").val(a[0]['namePrd']).prop('disabled',true);
                $("." + sId + " #anlageIntBde").val(a[0]['bezeichnungAnl']).prop('disabled',true);



                var sDt = convertDateFormateForDataTbl(a[0]['intTp_ID'],a[0]['startDate']);
                var eDt = convertDateFormateForDataTbl(a[0]['intTp_ID'],a[0]['endDate']);
                $("." + sId + " #zeitintervallAnlPrdkt").val(a[0]['intTp_ID']);
                $("." + sId + " #einheitAnlPrdkt").val(a[0]['unt_ID']);
                $("." + sId + " #notizBdeIMwAnlPrdkt").val(a[0]['note']);
                zeitintervallAnlInputsVisibleInvisiblePrdkt(a[0]['intTp_ID'],sDt,eDt,a[0]['ending'],'infosIntEnergiedaten',1);
                $("." + sId + " #anlPrdktIMwNoEnding").prop('checked', a[0]['ending']);
                $("." + sId + " #anlPrdktIMwNoEnding").val(a[0]['ending']);
                if(a[0]['intTp_ID']==2){
                    $("." + sId + " #wochenWMassEingDataAnlPrdktStart1").val(a[0]['startWeek']);
                    $("." + sId + " #wochenWMassEingDataAnlPrdktEnde1").val(a[0]['endWeek']);
                }
                $("." + sId + " .control_system_div_AnlPrdkt").show();
                $("." + sId + " #control_system_AnlPrdkt").val(a[0]['einheitControlSys']);
                einheitAnlPrdktMstHistOnChangeChildSelectOpt(a[0]['unt_ID'],sId);
                // $("#nextPrevMstIDPrdktID").val(a[0]['iBdePrdktConf_ID']);

                // /**/ $("#nextPrevMstIDPrdktID").val(rowdata[0]);
            }
        }
    })
}
/*new-mm-end*/
/*Messsetelle Produckte double click function 08-03-2021*/
/*new-mm-start*/
function MesssetelleListingDblClickRow(mst_Id,sId){

    $.ajax({
        type: "POST",
        async: !0,
        url: "php/getManuellInterneData.php",
        data: {
            nameDB: $("#nameDB").val(),
            id:'displayDataMesssetelle',
            mst_ID:mst_Id,
            typ : "betriebsdaten",
            iBdeType: "2",

        },
        success: function(e) {
            a = JSON.parse(e);
            var b = a.length;
            //console.log(a);
            if (b>0) {

                //$("." + sId + " #mstIMw").val(a[0]['nameMSt']).prop('disabled',false);
                $("." + sId + " #mstIMw").val(a[0]['nameMSt']);

                if( $("." + sId + " #mstIMw").val() == ""){

                    $("." + sId + " #mstIMw").prop("readonly",false);
                    $("." + sId + " #mstIMw").prop("disabled",false);
                }
                else{
                    $("." + sId + " #mstIMw").prop("readonly",true);
                    $("." + sId + " #mstIMw").prop("disabled",true);
                }
                /*new-mm-start 26-03-2021*/
                //$("." + sId + " #anlageMessstelleIntBde").val(a[0]['anlageMst']).prop('disabled',true);
                /*new-mm-end 26-03-2021*/
                var sDt = convertDateFormateForDataTbl(a[0]['intTp_ID'],a[0]['startDate']);
                var eDt = convertDateFormateForDataTbl(a[0]['intTp_ID'],a[0]['endDate']);
                $("." + sId + " #zeitintervallAnlPrdkt").val(a[0]['intTp_ID']);
                $("." + sId + " #einheitAnlPrdkt").val(a[0]['unt_ID']);
                $("." + sId + " #notizBdeIMwAnlPrdkt").val(a[0]['note']);
                zeitintervallAnlInputsVisibleInvisiblePrdkt(a[0]['intTp_ID'],sDt,eDt,a[0]['ending'],'infosIntEnergiedaten',1);
                $("." + sId + " #anlPrdktIMwNoEnding").prop('checked', a[0]['ending']);
                $("." + sId + " #anlPrdktIMwNoEnding").val(a[0]['ending']);
                if(a[0]['intTp_ID']==2){
                    $("." + sId + " #wochenWMassEingDataAnlPrdktStart1").val(a[0]['startWeek']);
                    $("." + sId + " #wochenWMassEingDataAnlPrdktEnde1").val(a[0]['endWeek']);
                }
                $("." + sId + " .control_system_div_AnlPrdkt").show();
                $("." + sId + " #control_system_AnlPrdkt").val(a[0]['einheitControlSys']);
                einheitAnlPrdktMstHistOnChangeChildSelectOpt(a[0]['unt_ID'],sId);
                // $("#nextPrevMstIDPrdktID").val(a[0]['iBdePrdktConf_ID']);

            }
        }
    })
}
/*new-mm-end*/

function resetInterneBetriebsdatenInputs(sId,id){

    //alert("reseting data for produkt module");
    $("#mstID").val("");
    $("#prd_ID").val("");
    $("#anl_Col").val("");
    $("#anl_ID").val("");
    /*new-mm-start 25-03-2021*/
    $("#nextPrevMstIDPrdktID").val("");
    /*new-mm-end 25-03-2021*/


    $("." + sId + " #mstIMw").val("");
    $("." + sId + " #artikelnummerIntBde").val("").prop('disabled',false);
    $("." + sId + " #bezeichnungIntBde").val("").prop('disabled',false);
    $("." + sId + " #anlageIntBde").val("").prop('disabled',false);
    $("." + sId + " #zeitintervallAnlPrdkt").val("0").change();
    $("." + sId + " #einheitAnlPrdkt").val("").change();
    $("." + sId + " #notizBdeIMwAnlPrdkt").val("");
    $("." + sId + " #control_system_AnlPrdkt").val("").change();


    /*for only messsetelle anlage reset*/
    $("#anlageMessstelleIntBde").val("").prop("disabled",true);
    /*for only messsetelle anlage reset*/

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
}

function searchProdukteAnlageIntBDE(checkboxSearch){
    $.ajax({
        type: "POST",
        async: !0,
        url: "php/getManuellInterneData.php",
        data: {
            id: "MesssetelleTblFacilityData",
            typ: "betriebsdaten",
            nameDB: $("#nameDB").val()
        },
        success: function(a) {
            a = JSON.parse(a);
            var b = a.length;
            //console.log(a);
            tblMstOhneZeitintervallIMwMessstelle.clear().draw();
            for (var e = 0; e < b; e++){
                tblMstOhneZeitintervallIMwMessstelle.row.add( [a[e].T1_mst_ID, a[e].nameMSt, a[e].anlageMst,convertDateFormateForDataTbl(a[e].intTp_ID,a[e].startDate), convertDateFormateForDataTbl(a[e].intTp_ID,a[e].endDate),a[e].unit,typeValueEinheitControlSys(a[e].einheitControlSys), capitalizeLetter(a[e].type), a[e].note]).draw();
                //tblMstOhneZeitintervallIMwMessstelle.column([0,1]).visible(!1);
                $("#tblMstOhneZeitintervallIMwMessstelle tr").css("cursor", "pointer");
                $("#tblMstOhneZeitintervallIMwMessstelle").off("dblclick", "tr");
            }
            var columnHide = tblMstOhneZeitintervallIMwMessstelle.columns([0]);
            columnHide.visible(! columnHide.visible() );
            $("#tblMstOhneZeitintervallIMwMessstelle").on("dblclick", "tr", function() {
                var rowdata_messtbl = tblMstOhneZeitintervallIMwMessstelle.row(this).data();
                // console.log(rowdata_messtbl);
                //alert("mstid : "+rowdata_messtbl[0]+"nameMSt"+rowdata_messtbl[1]);
                // resetFormAllgemein('infosIntBetriebsdaten',1);
                // tblMstOhneZeitintervallIMwMessstelleDblClickRow(a[0],'infosIntBetriebsdaten');
                resetInterneBetriebsdatenInputs('infosIntEnergiedaten',1);
                MesssetelleListingDblClickRow(rowdata_messtbl[0],'infosIntEnergiedaten');
                $("#mstID").val(rowdata_messtbl[0]);
                /*new-mm-start 24-03-2021*/
                $("#mstIMw").val(rowdata_messtbl[1]);
                $("#anlageMessstelleIntBde").val(rowdata_messtbl[2]);
                /*new-mm-end 24-03-2021*/
                /*new-mm-start 25-03-2021*/
                $("#nextPrevMstIDPrdktID").val(rowdata_messtbl[0]);
                /*new-mm-end 25-03-2021*/

                //$("#anlIMw").val(a[1]);
                //$("#anlNrIMw").val(a[2]);
                //$("#startDateDB").val(a[3]);
                //$("#endDateDB").val(a[4]);

                /*new-mm-start 09-04-2021*/
                $('#tageMassEingDataAnlPrdktStart1').datepicker( "option" , { minDate: null, maxDate: null} );
                $('#tageMassEingDataAnlPrdktEnde1').datepicker( "option" , { minDate: null, maxDate: null} );
                /*new-mm-end 09-04-2021*/
            });
        }
    });
}
/*new-mm-end*/


/*16-03-2021*/
/*new-mm-start*/
function searchImgMesssetelleIntBDE(checkboxSearch){
    $.ajax({
        type: "POST",
        async: !0,
        url: "php/getManuellInterneData.php",
        data: {
            id: "MesssetelleTbl",
            typ: "betriebsdaten",
            nameDB: $("#nameDB").val()
        },
        success: function(a) {
            a = JSON.parse(a);
            var b = a.length;
            //console.log(a);
            tblMstOhneZeitintervallIMwMessstelleSuche.clear().draw();
            for (var e = 0; e < b; e++){
                tblMstOhneZeitintervallIMwMessstelleSuche.row.add( [a[e].T1_mst_ID, a[e].T1_nameMSt, a[e].T1_anlageMst,convertDateFormateForDataTbl(a[e].intTp_ID,a[e].startDate), convertDateFormateForDataTbl(a[e].intTp_ID,a[e].endDate),a[e].unit,typeValueEinheitControlSys(a[e].einheitControlSys), capitalizeLetter(a[e].type), a[e].note]).draw();
                //tblMstOhneZeitintervallIMwMessstelle.column([0,1]).visible(!1);
                $("#tblMstOhneZeitintervallIMwMessstelleSuche tr").css("cursor", "pointer");
                $("#tblMstOhneZeitintervallIMwMessstelleSuche").off("dblclick", "tr");
            }
            var columnHide = tblMstOhneZeitintervallIMwMessstelleSuche.columns([0]);
            columnHide.visible(! columnHide.visible() );
            $("#tblMstOhneZeitintervallIMwMessstelleSuche").on("dblclick", "tr", function() {
                var rowdata_messtbl = tblMstOhneZeitintervallIMwMessstelleSuche.row(this).data();
                // console.log(rowdata_messtbl);
                //alert("mstid : "+rowdata_messtbl[0]);
                // resetFormAllgemein('infosIntBetriebsdaten',1);
                // tblMstOhneZeitintervallIMwMessstelleDblClickRow(a[0],'infosIntBetriebsdaten');
                resetInterneBetriebsdatenInputs('infosIntEnergiedaten',1);
                MesssetelleListingDblClickRow(rowdata_messtbl[0],'infosIntEnergiedaten');
                $("#mstID").val(rowdata_messtbl[0]);
                /*new-mm-start 23 or 24-03-2021*/
                $("#mstIMw").val(rowdata_messtbl[1]);
                $("#anlageMessstelleIntBde").val(rowdata_messtbl[2]);
                /*new-mm-end 23 or 24-03-2021*/
                /*new-mm-start 25-03-2021*/
                $("#nextPrevMstIDPrdktID").val(rowdata_messtbl[0]);
                /*new-mm-end 25-03-2021*/
                //$("#anlIMw").val(a[1]);
                //$("#anlNrIMw").val(a[2]);
                //$("#startDateDB").val(a[3]);
                //$("#endDateDB").val(a[4]);

                /*new-mm-start 09-04-2021*/
                $('#tageMassEingDataAnlPrdktStart1').datepicker( "option" , { minDate: null, maxDate: null} );
                $('#tageMassEingDataAnlPrdktEnde1').datepicker( "option" , { minDate: null, maxDate: null} );
                /*new-mm-end 09-04-2021*/

                $("#tblAnlPrdktMStOhneZeitintervallIMwSearchContainer").dialog("close");
            });
        }
    });
}
/*new-mm-end*/
function keinZeitIntervallZugewiesenDblClickRow(mstID,sId){
    $.ajax({
        type: "POST",
        async: !0,
        url: "php/getManuellInterneData.php",
        data: {
            nameDB: $("#nameDB").val(),
            id:'displayData',
            mstID:mstID
        },
        success: function(e) {
            a = JSON.parse(e);
            var b = a.length;
            //console.log(a);
            if (b>0) {
                var sDt = convertDateFormateForDataTbl(a[0]['intTp_ID'],a[0]['startDate']);
                var eDt = convertDateFormateForDataTbl(a[0]['intTp_ID'],a[0]['endDate']);
                $("." + sId + " #zeitintervallAnl").val(a[0]['intTp_ID']);
                $("." + sId + " #einheitAnl").val(a[0]['unt_ID']);
                $("." + sId + " #notizBdeIMw").val(a[0]['note']);
                zeitintervallAnlInputsVisibleInvisible(a[0]['intTp_ID'],sDt,eDt,a[0]['ending'],'infosIntBetriebsdaten',1);
                $("." + sId + " #anlIMwNoEnding").prop('checked', a[0]['ending']);
                $("." + sId + " #anlIMwNoEnding").val(a[0]['ending']);
                if(a[0]['intTp_ID']==2){
                    $("." + sId + " #wochenWMassEingDataAnlStart1").val(a[0]['startWeek']);
                    $("." + sId + " #wochenWMassEingDataAnlEnde1").val(a[0]['endWeek']);
                }
                $("." + sId + " .control_system_div").show();
                $("." + sId + " #control_system").val(a[0]['einheitControlSys']);
                einheitAnlOnChangeChildSelectOpt(a[0]['unt_ID']);
            }
        }
    })
}

function zeitintervallAnlInputsVisibleInvisible(zeitIntVal,startDate,endDate,ending,sId,id){
//alert(startDate);alert(endDate);
    $("." + sId + " .zeitintervallAnl_1").hide();
    $("." + sId + " .zeitintervallAnl_2").hide();
    $("." + sId + " .zeitintervallAnl_3").hide();
    $("." + sId + " .zeitintervallAnl_4").hide();
    $("." + sId + " .zeitintervallAnl_NoEnding").hide();

    $("." + sId + " #monateMassEingDataAnlEnde" + id + "").prop('disabled', false);
    $("." + sId + " #jahrMassEingDataAnlEnde" + id + "").prop('disabled', false);
    $("." + sId + " #tageMassEingDataAnlEnde" + id + "").prop('disabled', false);
    $("." + sId + " #anlIMwNoEnding").prop('checked', false);

    $("." + sId + " .zeitintervallAnl_1 input").val("");
    $("." + sId + " .zeitintervallAnl_2 input").val("");
    $("." + sId + " .zeitintervallAnl_3 input").val("");
    $("." + sId + " .zeitintervallAnl_4 input").val("");
    if(zeitIntVal == 1){
        $("." + sId + " .zeitintervallAnl_1").show();
        $("." + sId + " .zeitintervallAnl_2").hide();
        $("." + sId + " .zeitintervallAnl_3").hide();
        $("." + sId + " .zeitintervallAnl_4").hide();
        $("." + sId + " .zeitintervallAnl_NoEnding").show();
        $("." + sId + " #tageMassEingDataAnlStart" + id + "").val(startDate);
        $("." + sId + " #tageMassEingDataAnlEnde" + id + "").val(endDate);

        /*new-mm-start 09-04-2021*/
        $("." + sId + " #tageMassEingDataAnlStart" + id + "").datepicker( "option" , { minDate: null, maxDate: null} );
        $("." + sId + " #tageMassEingDataAnlEnde" + id + "").datepicker( "option" , { minDate: null, maxDate: null} );
        /*new-mm-end 09-04-2021*/

        if(ending==1){
            $("." + sId + " #tageMassEingDataAnlEnde" + id + "").prop('disabled', true);
        }else{
            $("." + sId + " #tageMassEingDataAnlEnde" + id + "").prop('disabled', false);
        }
    }else if(zeitIntVal == 2){
        $("." + sId + " .zeitintervallAnl_1").hide();
        $("." + sId + " .zeitintervallAnl_2").show();
        $("." + sId + " .zeitintervallAnl_3").hide();
        $("." + sId + " .zeitintervallAnl_4").hide();
        $("." + sId + " .zeitintervallAnl_NoEnding").show();
        if(id==3){
            var startDateSplit = startDate.split('-');
            var endDateSplit = endDate.split('-');
            $("." + sId + " #wochenWMassEingDataAnlStart" + id + "").val(startDateSplit[0]);
            $("." + sId + " #wochenWMassEingDataAnlEnde" + id + "").val(endDateSplit[0]);
            $("." + sId + " #wochenYMassEingDataAnlStart" + id + "").val(startDateSplit[1]);
            $("." + sId + " #wochenYMassEingDataAnlEnde" + id + "").val(endDateSplit[1]);
        }else{
            $("." + sId + " #wochenYMassEingDataAnlStart" + id + "").val(startDate);
            $("." + sId + " #wochenYMassEingDataAnlEnde" + id + "").val(endDate);
        }

        if(ending==1){
            $("." + sId + " #wochenWMassEingDataAnlEnde" + id + "").prop('disabled', true);
            $("." + sId + " #wochenYMassEingDataAnlEnde" + id + "").prop('disabled', true);
        }else{
            $("." + sId + " #wochenWMassEingDataAnlEnde" + id + "").prop('disabled', false);
            $("." + sId + " #wochenYMassEingDataAnlEnde" + id + "").prop('disabled', false);
        }
    }else if(zeitIntVal == 3){
        $("." + sId + " .zeitintervallAnl_1").hide();
        $("." + sId + " .zeitintervallAnl_2").hide();
        $("." + sId + " .zeitintervallAnl_3").show();
        $("." + sId + " .zeitintervallAnl_4").hide();
        $("." + sId + " .zeitintervallAnl_NoEnding").show();
        $("." + sId + " #monateMassEingDataAnlStart" + id + "").val(startDate);
        $("." + sId + " #monateMassEingDataAnlEnde" + id + "").val(endDate);
        if(ending==1){
            $("." + sId + " #monateMassEingDataAnlEnde" + id + "").prop('disabled', true);
        }else{
            $("." + sId + " #monateMassEingDataAnlEnde" + id + "").prop('disabled', false);
        }
    }else if(zeitIntVal == 4){
        $("." + sId + " .zeitintervallAnl_1").hide();
        $("." + sId + " .zeitintervallAnl_2").hide();
        $("." + sId + " .zeitintervallAnl_3").hide();
        $("." + sId + " .zeitintervallAnl_4").show();
        $("." + sId + " .zeitintervallAnl_NoEnding").show();
        $("." + sId + " #jahrMassEingDataAnlStart" + id + "").val(startDate);
        $("." + sId + " #jahrMassEingDataAnlEnde" + id + "").val(endDate);
        if(ending==1){
            $("." + sId + " #jahrMassEingDataAnlEnde" + id + "").prop('disabled', true);
        }else{
            $("." + sId + " #jahrMassEingDataAnlEnde" + id + "").prop('disabled', false);
        }
    }else{
        $("#" + sId + " .zeitintervallAnl_1").hide();
        $("#" + sId + " .zeitintervallAnl_2").hide();
        $("#" + sId + " .zeitintervallAnl_3").hide();
        $("#" + sId + " .zeitintervallAnl_4").hide();
        $("#" + sId + " .zeitintervallAnl_NoEnding").hide();
    }
}
/*Produkte 04-03-2021*/
/*new-mm-start 22-03-2021*/
function zeitintervallAnlInputsVisibleInvisiblePrdkt(zeitIntVal,startDate,endDate,ending,sId,id){
//alert(startDate);alert(endDate);
    $("." + sId + " .zeitintervallAnlPrdkt_1").hide();
    $("." + sId + " .zeitintervallAnlPrdkt_2").hide();
    $("." + sId + " .zeitintervallAnlPrdkt_3").hide();
    $("." + sId + " .zeitintervallAnlPrdkt_4").hide();
    $("." + sId + " .zeitintervallAnlPrdkt_NoEnding").hide();

    $("." + sId + " #monateMassEingDataAnlPrdktEnde" + id + "").prop('disabled', false);
    $("." + sId + " #jahrMassEingDataAnlPrdktEnde" + id + "").prop('disabled', false);
    $("." + sId + " #tageMassEingDataAnlPrdktEnde" + id + "").prop('disabled', false);
    $("." + sId + " #anlPrdktIMwNoEnding").prop('checked', false);

    $("." + sId + " .zeitintervallAnlPrdkt_1 input").val("");
    $("." + sId + " .zeitintervallAnlPrdkt_2 input").val("");
    $("." + sId + " .zeitintervallAnlPrdkt_3 input").val("");
    $("." + sId + " .zeitintervallAnlPrdkt_4 input").val("");
    if(zeitIntVal == 1){
        $("." + sId + " .zeitintervallAnlPrdkt_1").show();
        $("." + sId + " .zeitintervallAnlPrdkt_2").hide();
        $("." + sId + " .zeitintervallAnlPrdkt_3").hide();
        $("." + sId + " .zeitintervallAnlPrdkt_4").hide();
        $("." + sId + " .zeitintervallAnlPrdkt_NoEnding").show();
        $("." + sId + " #tageMassEingDataAnlPrdktStart" + id + "").val(startDate);
        $("." + sId + " #tageMassEingDataAnlPrdktEnde" + id + "").val(endDate);

        /*new-mm-start 09-04-2021*/
        $("." + sId + " #tageMassEingDataAnlPrdktStart" + id + "").datepicker( "option" , { minDate: null, maxDate: null} );
        $("." + sId + " #tageMassEingDataAnlPrdktEnde" + id + "").datepicker( "option" , { minDate: null, maxDate: null} );
        /*new-mm-end 09-04-2021*/
        if(ending==1){
            $("." + sId + " #tageMassEingDataAnlPrdktEnde" + id + "").prop('disabled', true);
        }else{
            $("." + sId + " #tageMassEingDataAnlPrdktEnde" + id + "").prop('disabled', false);
        }
    }else if(zeitIntVal == 2){
        $("." + sId + " .zeitintervallAnlPrdkt_1").hide();
        $("." + sId + " .zeitintervallAnlPrdkt_2").show();
        $("." + sId + " .zeitintervallAnlPrdkt_3").hide();
        $("." + sId + " .zeitintervallAnlPrdkt_4").hide();
        $("." + sId + " .zeitintervallAnlPrdkt_NoEnding").show();
        if(id==3){
            var startDateSplit = startDate.split('-');
            var endDateSplit = endDate.split('-');
            $("." + sId + " #wochenWMassEingDataAnlPrdktStart" + id + "").val(startDateSplit[0]);
            $("." + sId + " #wochenWMassEingDataAnlPrdktEnde" + id + "").val(endDateSplit[0]);
            $("." + sId + " #wochenYMassEingDataAnlPrdktStart" + id + "").val(startDateSplit[1]);
            $("." + sId + " #wochenYMassEingDataAnlPrdktEnde" + id + "").val(endDateSplit[1]);
        }else{
            $("." + sId + " #wochenYMassEingDataAnlPrdktStart" + id + "").val(startDate);
            $("." + sId + " #wochenYMassEingDataAnlPrdktEnde" + id + "").val(endDate);
        }

        if(ending==1){
            $("." + sId + " #wochenWMassEingDataAnlPrdktEnde" + id + "").prop('disabled', true);
            $("." + sId + " #wochenYMassEingDataAnlPrdktEnde" + id + "").prop('disabled', true);
        }else{
            $("." + sId + " #wochenWMassEingDataAnlPrdktEnde" + id + "").prop('disabled', false);
            $("." + sId + " #wochenYMassEingDataAnlPrdktEnde" + id + "").prop('disabled', false);
        }
    }else if(zeitIntVal == 3){
        $("." + sId + " .zeitintervallAnlPrdkt_1").hide();
        $("." + sId + " .zeitintervallAnlPrdkt_2").hide();
        $("." + sId + " .zeitintervallAnlPrdkt_3").show();
        $("." + sId + " .zeitintervallAnlPrdkt_4").hide();
        $("." + sId + " .zeitintervallAnlPrdkt_NoEnding").show();
        $("." + sId + " #monateMassEingDataAnlPrdktStart" + id + "").val(startDate);
        $("." + sId + " #monateMassEingDataAnlPrdktEnde" + id + "").val(endDate);
        if(ending==1){
            $("." + sId + " #monateMassEingDataAnlPrdktEnde" + id + "").prop('disabled', true);
        }else{
            $("." + sId + " #monateMassEingDataAnlPrdktEnde" + id + "").prop('disabled', false);
        }
    }else if(zeitIntVal == 4){
        $("." + sId + " .zeitintervallAnlPrdkt_1").hide();
        $("." + sId + " .zeitintervallAnlPrdkt_2").hide();
        $("." + sId + " .zeitintervallAnlPrdkt_3").hide();
        $("." + sId + " .zeitintervallAnlPrdkt_4").show();
        $("." + sId + " .zeitintervallAnlPrdkt_NoEnding").show();
        $("." + sId + " #jahrMassEingDataAnlPrdktStart" + id + "").val(startDate);
        $("." + sId + " #jahrMassEingDataAnlPrdktEnde" + id + "").val(endDate);
        if(ending==1){
            $("." + sId + " #jahrMassEingDataAnlPrdktEnde" + id + "").prop('disabled', true);
        }else{
            $("." + sId + " #jahrMassEingDataAnlPrdktEnde" + id + "").prop('disabled', false);
        }
    }else{
        $("#" + sId + " .zeitintervallAnlPrdkt_1").hide();
        $("#" + sId + " .zeitintervallAnlPrdkt_2").hide();
        $("#" + sId + " .zeitintervallAnlPrdkt_3").hide();
        $("#" + sId + " .zeitintervallAnlPrdkt_4").hide();
        $("#" + sId + " .zeitintervallAnlPrdkt_NoEnding").hide();
    }
}
/*new-mm-end 22-03-2021*/
function interneMesswerteConfigSpeichernMethod(){
    var zeitintervallAnl = $(".infosIntBetriebsdaten #zeitintervallAnl").val();
    var dates = returnStartDateAndEndDate(zeitintervallAnl,'infosIntBetriebsdaten',1);
    startDate =dates[0];
    endDate =dates[1];
    $.ajax({
        type: "POST",
        async: !0,
        url: "php/instanzIntoDb.php",
        data: {
            id: "interneMesswerteConfig",
            modus: "save",
            nameDB: $("#nameDB").val(),
            intTp_ID: $("#zeitintervallAnl").val(),
            unt_ID: $("#einheitAnl").val(),
            mstID:  $("#mstID").val(),
            startDate:startDate,
            endDate:endDate,
            ending:$("#anlIMwNoEnding").val(),
            note:$("#notizBdeIMw").val(),
            einheitControlSys:$("#control_system").val(),

        },
        success: function(a) {
            // alert(datensatzGespeichert(a));
            resetFormAllgemein('infosIntBetriebsdaten',1);
            keinZeitIntervallZugewiesen();
        }
    });
}
/*save Int Bde Produkte Module 04-03-2021*/
/*new-mm-start 22-03-2021*/
function interneMesswerteConfigSpeichernMethodPrdkt(){
    //var zeitintervallAnl = $(".infosIntBetriebsdaten #zeitintervallAnl").val();
    var zeitintervallAnl = $(".infosIntEnergiedaten #zeitintervallAnlPrdkt").val();
    var dates = returnStartDateAndEndDatePrdkt(zeitintervallAnl,'infosIntEnergiedaten',1);
    var iBdeType = $("input[name='BetriebsdatenFilter']:checked").val();

    startDate =dates[0];
    endDate =dates[1];
    $.ajax({
        type: "POST",
        async: !0,
        url: "php/instanzIntoDb.php",
        data: {
            id: "interneBetriebsdatenProduktConfig",
            modus: "save",
            nameDB: $("#nameDB").val(),
            intTp_ID: $("#zeitintervallAnlPrdkt").val(),
            unt_ID: $("#einheitAnlPrdkt").val(),
            mstID:  $("#mstID").val(),
            prd_ID:  $("#prd_ID").val(),
            anl_Col:  $("#anl_Col").val(),
            anl_ID:  $("#anl_ID").val(),
            iBdeType: iBdeType,
            startDate:startDate,
            endDate:endDate,
            ending:$("#anlPrdktIMwNoEnding").val(),
            note:$("#notizBdeIMwAnlPrdkt").val(),
            einheitControlSys:$("#control_system_AnlPrdkt").val(),
            mstIMw:$("#mstIMw").val(),

        },
        success: function(a) {
            // alert(datensatzGespeichert(a));
            //resetFormAllgemein('infosIntBetriebsdaten',1);
            // keinZeitIntervallZugewiesen();
            resetInterneBetriebsdatenInputs('infosIntEnergiedaten',1);
            if(iBdeType == 1){
                produkteAnlargeDataTable();
            }
            else if(iBdeType == 2){
                searchProdukteAnlageIntBDE("2");
            }

        }
    });
}
/*new-mm-end 22-03-2021*/
function resetFormAllgemein(sId,id){
    $("." + sId + " .zeitintervallAnl_1").hide();
    $("." + sId + " .zeitintervallAnl_2").hide();
    $("." + sId + " .zeitintervallAnl_3").hide();
    $("." + sId + " .zeitintervallAnl_4").hide();
    $("." + sId + " .zeitintervallAnl_NoEnding").hide();
    $("." + sId + " #monateMassEingDataAnlEnde" + id + "").prop('disabled', false);
    $("." + sId + " #jahrMassEingDataAnlEnde" + id + "").prop('disabled', false);
    $("." + sId + " #tageMassEingDataAnlEnde" + id + "").prop('disabled', false);
    $("." + sId + " #anlIMwNoEnding").prop('checked', false);
    $("." + sId + " .zeitintervallAnl_1 input").val("");
    $("." + sId + " .zeitintervallAnl_2 input").val("");
    /*new-mm-start 06-04-2021*/
    $("." + sId + " #wochenWMassEingDataAnlStart" + id + "").val("").change();
    $("." + sId + " #wochenWMassEingDataAnlEnde" + id + "").val("").change();
    /*new-mm-end 06-04-2021*/
    $("." + sId + " .zeitintervallAnl_3 input").val("");
    $("." + sId + " .zeitintervallAnl_4 input").val("");
    $("." + sId + " #zeitintervallAnl").val("");
    $("." + sId + " #einheitAnl").val("");
    $("." + sId + " #notizBdeIMw").val("");
    $("." + sId + " #anlIMw").val("");
    $("." + sId + " #anlNrIMw").val("");
    $("." + sId + " #notizBdeIMw").val("");
    $("." + sId + " #control_system").val("");
    $("." + sId + " .control_system_div").hide();
}

function returnStartDateAndEndDate(val,sId,id){
    if(val ==1){
        var startDate = $("." + sId + " #tageMassEingDataAnlStart" + id + "").val();
        var endDate = $("." + sId + " #tageMassEingDataAnlEnde" + id + "").val();
    }else if(val ==2){
        var startWeek = $("." + sId + " #wochenWMassEingDataAnlStart" + id + "").val();
        var endWeek = $("." + sId + " #wochenWMassEingDataAnlEnde" + id + "").val();
        var startYear = $("." + sId + " #wochenYMassEingDataAnlStart" + id + "").val();
        var endYear= $("." + sId + " #wochenYMassEingDataAnlEnde" + id + "").val();
        var startDate = startWeek + '-' +startYear;
        var endDate = endWeek + '-' +endYear;
    }else if(val ==3){
        var startDate = $("." + sId + " #monateMassEingDataAnlStart" + id + "").val();
        var endDate = $("." + sId + " #monateMassEingDataAnlEnde" + id + "").val();
    }else if(val ==4){
        var startDate = $("." + sId + " #jahrMassEingDataAnlStart" + id + "").val();
        var endDate = $("." + sId + " #jahrMassEingDataAnlEnde" + id + "").val();
    }
    return [startDate, endDate];
}
/*Produkte 04-03-2021*/
/*new-mm-start 22-03-2021*/
function returnStartDateAndEndDatePrdkt(val,sId,id){
    if(val ==1){
        var startDate = $("." + sId + " #tageMassEingDataAnlPrdktStart" + id + "").val();
        var endDate = $("." + sId + " #tageMassEingDataAnlPrdktEnde" + id + "").val();
    }else if(val ==2){
        var startWeek = $("." + sId + " #wochenWMassEingDataAnlPrdktStart" + id + "").val();
        var endWeek = $("." + sId + " #wochenWMassEingDataAnlPrdktEnde" + id + "").val();
        var startYear = $("." + sId + " #wochenYMassEingDataAnlPrdktStart" + id + "").val();
        var endYear= $("." + sId + " #wochenYMassEingDataAnlPrdktEnde" + id + "").val();
        var startDate = startWeek + '-' +startYear;
        var endDate = endWeek + '-' +endYear;
    }else if(val ==3){
        var startDate = $("." + sId + " #monateMassEingDataAnlPrdktStart" + id + "").val();
        var endDate = $("." + sId + " #monateMassEingDataAnlPrdktEnde" + id + "").val();
    }else if(val ==4){
        var startDate = $("." + sId + " #jahrMassEingDataAnlPrdktStart" + id + "").val();
        var endDate = $("." + sId + " #jahrMassEingDataAnlPrdktEnde" + id + "").val();
    }
    return [startDate, endDate];
}
/*new-mm-end 22-03-2021*/
function zeitintervallChange(val,sId,id){

    if(id !=1){
        $("." + sId + " #monateMassEingDataAnlEnde" + id + "").prop('disabled', false);
        $("." + sId + " #jahrMassEingDataAnlEnde" + id + "").prop('disabled', false);
        $("." + sId + " #tageMassEingDataAnlEnde" + id + "").prop('disabled', false);
        $("." + sId + " #anlIMwNoEnding").prop('checked', false);
        $("." + sId + " .zeitintervallAnl_1 input").val("");
        $("." + sId + " .zeitintervallAnl_2 input").val("");
        $("." + sId + " .zeitintervallAnl_3 input").val("");
        $("." + sId + " .zeitintervallAnl_4 input").val("");
    }
    if(val == 1){
        $("." + sId + " .zeitintervallAnl_1").show();
        $("." + sId + " .zeitintervallAnl_2").hide();
        $("." + sId + " .zeitintervallAnl_3").hide();
        $("." + sId + " .zeitintervallAnl_4").hide();
        $("." + sId + " .zeitintervallAnl_NoEnding").show();

        /*new-mm-start 09-04-2021 */
        $('.zeitintervallAnl_1 input').datepicker( "option" , { minDate: null, maxDate: null} );
        /*new-mm-end 09-04-2021*/

    }else if(val == 2){
        $("." + sId + " .zeitintervallAnl_1").hide();
        $("." + sId + " .zeitintervallAnl_2").show();
        $("." + sId + " .zeitintervallAnl_3").hide();
        $("." + sId + " .zeitintervallAnl_4").hide();
        $("." + sId + " .zeitintervallAnl_NoEnding").show();

    }else if(val == 3){
        $("." + sId + " .zeitintervallAnl_1").hide();
        $("." + sId + " .zeitintervallAnl_2").hide();
        $("." + sId + " .zeitintervallAnl_3").show();
        $("." + sId + " .zeitintervallAnl_4").hide();
        $("." + sId + " .zeitintervallAnl_NoEnding").show();
    }else if(val == 4){
        $("." + sId + " .zeitintervallAnl_1").hide();
        $("." + sId + " .zeitintervallAnl_2").hide();
        $("." + sId + " .zeitintervallAnl_3").hide();
        $("." + sId + " .zeitintervallAnl_4").show();
        $("." + sId + " .zeitintervallAnl_NoEnding").show();
    }else{
        $("." + sId + " .zeitintervallAnl_1").hide();
        $("." + sId + " .zeitintervallAnl_2").hide();
        $("." + sId + " .zeitintervallAnl_3").hide();
        $("." + sId + " .zeitintervallAnl_4").hide();
        $("." + sId + " .zeitintervallAnl_NoEnding").hide();
    }
}
/*Produkte mm 01-03-2021*/
/*new-mm-start*/
function zeitintervallAnlPrdktChange(val,sId,id){

    if(id !=1){
        $("." + sId + " #monateMassEingDataAnlPrdktEnde" + id + "").prop('disabled', false);
        $("." + sId + " #jahrMassEingDataAnlPrdktEnde" + id + "").prop('disabled', false);
        $("." + sId + " #tageMassEingDataAnlPrdktEnde" + id + "").prop('disabled', false);
        $("." + sId + " #anlPrdktIMwNoEnding").prop('checked', false);
        $("." + sId + " .zeitintervallAnlPrdkt_1 input").val("");
        $("." + sId + " .zeitintervallAnlPrdkt_2 input").val("");
        $("." + sId + " .zeitintervallAnlPrdkt_3 input").val("");
        $("." + sId + " .zeitintervallAnlPrdkt_4 input").val("");
    }
    if(val == 1){
        $("." + sId + " .zeitintervallAnlPrdkt_1").show();
        $("." + sId + " .zeitintervallAnlPrdkt_2").hide();
        $("." + sId + " .zeitintervallAnlPrdkt_3").hide();
        $("." + sId + " .zeitintervallAnlPrdkt_4").hide();
        $("." + sId + " .zeitintervallAnlPrdkt_NoEnding").show();

        /*new-mm-start 09-04-2021 */
        $('#tageMassEingDataAnlPrdktStart1').datepicker( "option" , { minDate: null, maxDate: null} );
        $('#tageMassEingDataAnlPrdktEnde1').datepicker( "option" , { minDate: null, maxDate: null} );
        /*new-mm-end 09-04-2021*/

    }else if(val == 2){
        $("." + sId + " .zeitintervallAnlPrdkt_1").hide();
        $("." + sId + " .zeitintervallAnlPrdkt_2").show();
        $("." + sId + " .zeitintervallAnlPrdkt_3").hide();
        $("." + sId + " .zeitintervallAnlPrdkt_4").hide();
        $("." + sId + " .zeitintervallAnlPrdkt_NoEnding").show();

    }else if(val == 3){
        $("." + sId + " .zeitintervallAnlPrdkt_1").hide();
        $("." + sId + " .zeitintervallAnlPrdkt_2").hide();
        $("." + sId + " .zeitintervallAnlPrdkt_3").show();
        $("." + sId + " .zeitintervallAnlPrdkt_4").hide();
        $("." + sId + " .zeitintervallAnlPrdkt_NoEnding").show();
    }else if(val == 4){
        $("." + sId + " .zeitintervallAnlPrdkt_1").hide();
        $("." + sId + " .zeitintervallAnlPrdkt_2").hide();
        $("." + sId + " .zeitintervallAnlPrdkt_3").hide();
        $("." + sId + " .zeitintervallAnlPrdkt_4").show();
        $("." + sId + " .zeitintervallAnlPrdkt_NoEnding").show();
    }else{
        $("." + sId + " .zeitintervallAnlPrdkt_1").hide();
        $("." + sId + " .zeitintervallAnlPrdkt_2").hide();
        $("." + sId + " .zeitintervallAnlPrdkt_3").hide();
        $("." + sId + " .zeitintervallAnlPrdkt_4").hide();
        $("." + sId + " .zeitintervallAnlPrdkt_NoEnding").hide();
    }
}
/*new-mm-end*/
function noEndingChange(val,sId,id){
    var zeitintervallAnl = $("." + sId + " #zeitintervallAnl").val();
    if(zeitintervallAnl == 1){
        if(val==true){
            $("." + sId + " #tageMassEingDataAnlEnde" + id + "").prop('disabled', true);
            $("." + sId + " #tageMassEingDataAnlEnde" + id + "").val('');
            $("." + sId + " #anlIMwNoEnding").val(1);
        } else {
            $("." + sId + " #tageMassEingDataAnlEnde" + id + "").prop('disabled', false);
            $("." + sId + " #anlIMwNoEnding").val(0);
        }
    }else if(zeitintervallAnl == 2){
        if(val==true){
            $("." + sId + " #wochenWMassEingDataAnlEnde" + id + "").prop('disabled', true);
            $("." + sId + " #wochenYMassEingDataAnlEnde" + id + "").prop('disabled', true);
            $("." + sId + " #wochenWMassEingDataAnlEnde" + id + "").val('');
            $("." + sId + " #wochenYMassEingDataAnlEnde" + id + "").val('');
            $("." + sId + " #anlIMwNoEnding").val(1);
        } else {
            $("." + sId + " #wochenWMassEingDataAnlEnde" + id + "").prop('disabled', false);
            $("." + sId + " #wochenYMassEingDataAnlEnde" + id + "").prop('disabled', false);
            $("." + sId + " #anlIMwNoEnding").val(0);
        }
    }else if(zeitintervallAnl == 3){
        if(val==true){
            $("." + sId + " #monateMassEingDataAnlEnde" + id + "").prop('disabled', true);
            $("." + sId + " #monateMassEingDataAnlEnde" + id + "").val('');
            $("." + sId + " #anlIMwNoEnding").val(1);
        } else {
            $("." + sId + " #monateMassEingDataAnlEnde" + id + "").prop('disabled', false);
            $("." + sId + " #anlIMwNoEnding").val(0);
        }
    }else if(zeitintervallAnl == 4){
        if(val==true){
            $("." + sId + " #jahrMassEingDataAnlEnde" + id + "").prop('disabled', true);
            $("." + sId + " #jahrMassEingDataAnlEnde" + id + "").val('');
            $("." + sId + " #anlIMwNoEnding").val(1);
        } else {
            $("." + sId + " #jahrMassEingDataAnlEnde" + id + "").prop('disabled', false);
            $("." + sId + " #anlIMwNoEnding").val(0);
        }
    }else{
        $("." + sId + " .zeitintervallAnl_1").hide();
        $("." + sId + " .zeitintervallAnl_2").hide();
        $("." + sId + " .zeitintervallAnl_3").hide();
        $("." + sId + " .zeitintervallAnl_4").hide();
        $("." + sId + " .zeitintervallAnl_NoEnding").hide();
    }
}
/*Produkte mm 01-03-2021*/
/*new-mm-start*/
function noEndingAnlPrdktChange(val,sId,id){
    var zeitintervallAnl = $("." + sId + " #zeitintervallAnlPrdkt").val();
    if(zeitintervallAnl == 1){
        if(val==true){
            $("." + sId + " #tageMassEingDataAnlPrdktEnde" + id + "").prop('disabled', true);
            $("." + sId + " #tageMassEingDataAnlPrdktEnde" + id + "").val('');
            $("." + sId + " #anlPrdktIMwNoEnding").val(1);
        } else {
            $("." + sId + " #tageMassEingDataAnlPrdktEnde" + id + "").prop('disabled', false);
            $("." + sId + " #anlPrdktIMwNoEnding").val(0);
        }
    }else if(zeitintervallAnl == 2){
        if(val==true){
            $("." + sId + " #wochenWMassEingDataAnlPrdktEnde" + id + "").prop('disabled', true);
            $("." + sId + " #wochenYMassEingDataAnlPrdktEnde" + id + "").prop('disabled', true);
            $("." + sId + " #wochenWMassEingDataAnlPrdktEnde" + id + "").val('');
            $("." + sId + " #wochenYMassEingDataAnlPrdktEnde" + id + "").val('');
            $("." + sId + " #anlPrdktIMwNoEnding").val(1);
        } else {
            $("." + sId + " #wochenWMassEingDataAnlPrdktEnde" + id + "").prop('disabled', false);
            $("." + sId + " #wochenYMassEingDataAnlPrdktEnde" + id + "").prop('disabled', false);
            $("." + sId + " #anlPrdktIMwNoEnding").val(0);
        }
    }else if(zeitintervallAnl == 3){
        if(val==true){
            $("." + sId + " #monateMassEingDataAnlPrdktEnde" + id + "").prop('disabled', true);
            $("." + sId + " #monateMassEingDataAnlPrdktEnde" + id + "").val('');
            $("." + sId + " #anlPrdktIMwNoEnding").val(1);
        } else {
            $("." + sId + " #monateMassEingDataAnlPrdktEnde" + id + "").prop('disabled', false);
            $("." + sId + " #anlPrdktIMwNoEnding").val(0);
        }
    }else if(zeitintervallAnl == 4){
        if(val==true){
            $("." + sId + " #jahrMassEingDataAnlPrdktEnde" + id + "").prop('disabled', true);
            $("." + sId + " #jahrMassEingDataAnlPrdktEnde" + id + "").val('');
            $("." + sId + " #anlPrdktIMwNoEnding").val(1);
        } else {
            $("." + sId + " #jahrMassEingDataAnlPrdktEnde" + id + "").prop('disabled', false);
            $("." + sId + " #anlPrdktIMwNoEnding").val(0);
        }
    }else{
        $("." + sId + " .zeitintervallAnlPrdkt_1").hide();
        $("." + sId + " .zeitintervallAnlPrdkt_2").hide();
        $("." + sId + " .zeitintervallAnlPrdkt_3").hide();
        $("." + sId + " .zeitintervallAnlPrdkt_4").hide();
        $("." + sId + " .zeitintervallAnlPrdkt_NoEnding").hide();
    }
}
/*new-mm-end*/
function intBdeIMwNextPrev(key,countRecord,mst_ID){
    $.ajax({
        type: "POST",
        async: !0,
        url: "php/getManuellInterneData.php",
        data: {
            id: "intBdeIMw",
            nameDB: $("#nameDB").val(),
            liegID: $("#liegID").val(),
            key:key,
            countRecord:countRecord,
            mst_ID:mst_ID
        },
        fail: function() {
            alert("failed!!")
        },
        success: function(a) {
            var c = JSON.parse(a);
            var b = c.length;
            //console.log(c);
            if (b>0) {
                var sDt = convertDateFormateForDataTbl(c[0]['intTp_ID'],c[0]['startDate']);
                var eDt = convertDateFormateForDataTbl(c[0]['intTp_ID'],c[0]['endDate']);
                $(".infosIntBetriebsdaten #anlIMw").val(c[0]['nameMSt']);
                $(".infosIntBetriebsdaten #anlNrIMw").val(c[0]['anlageMst']);
                $(".infosIntBetriebsdaten #zeitintervallAnl").val(c[0]['intTp_ID']);
                $(".infosIntBetriebsdaten #einheitAnl").val(c[0]['unt_ID']);
                $(".infosIntBetriebsdaten #notizBdeIMw").val(c[0]['note']);
                zeitintervallAnlInputsVisibleInvisible(c[0]['intTp_ID'],sDt,eDt,c[0]['ending'],'infosIntBetriebsdaten',1);
                $(".infosIntBetriebsdaten #anlIMwNoEnding").prop('checked', c[0]['ending']);
                $(".infosIntBetriebsdaten #anlIMwNoEnding").val(c[0]['ending']);
                /*new-mm-start 26-03-2021*/
                $("#nextPrevMstID").val(c[0].T1_mst_ID);
                $("#mstID").val(c[0].T1_mst_ID);
                //alert(c[0].T1_mst_ID);
                /*new-mm-end 26-03-2021*/
            }
        }
    });
}
/*17-03-2021*/
/*new-mm-start*/
/*new-mm-start 25-03-2021*/
function intBdePrdktIMwNextPrev(key,countRecord,prd_ID){
    $.ajax({
        type: "POST",
        async: !0,
        url: "php/getManuellInterneData.php",
        data: {
            id: "intBdePrdktIMw",
            nameDB: $("#nameDB").val(),
            liegID: $("#liegID").val(),
            key:key,
            countRecord:countRecord,
            iBdePrdktConf_ID:prd_ID
        },
        fail: function() {
            alert("failed!!")
        },
        success: function(a) {
            var a = JSON.parse(a);
            var b = a.length;
            //console.log(c);
            if (b>0) {

                var sId = "infosIntEnergiedaten";

                $("." + sId + " #mstIMw").val(a[0]['mstIMw']).prop('disabled',false);
                $("." + sId + " #artikelnummerIntBde").val(a[0]['artikelNrPrd']).prop('disabled',true);
                $("." + sId + " #bezeichnungIntBde").val(a[0]['namePrd']).prop('disabled',true);
                $("." + sId + " #anlageIntBde").val(a[0]['bezeichnungAnl']).prop('disabled',true);

                var sDt = convertDateFormateForDataTbl(a[0]['intTp_ID'],a[0]['startDate']);
                var eDt = convertDateFormateForDataTbl(a[0]['intTp_ID'],a[0]['endDate']);
                $("." + sId + " #zeitintervallAnlPrdkt").val(a[0]['intTp_ID']);
                $("." + sId + " #einheitAnlPrdkt").val(a[0]['unt_ID']);
                $("." + sId + " #notizBdeIMwAnlPrdkt").val(a[0]['note']);
                zeitintervallAnlInputsVisibleInvisiblePrdkt(a[0]['intTp_ID'],sDt,eDt,a[0]['ending'],'infosIntEnergiedaten',1);
                $("." + sId + " #anlPrdktIMwNoEnding").prop('checked', a[0]['ending']);
                $("." + sId + " #anlPrdktIMwNoEnding").val(a[0]['ending']);
                if(a[0]['intTp_ID']==2){
                    $("." + sId + " #wochenWMassEingDataAnlPrdktStart1").val(a[0]['startWeek']);
                    $("." + sId + " #wochenWMassEingDataAnlPrdktEnde1").val(a[0]['endWeek']);
                }
                $("." + sId + " .control_system_div_AnlPrdkt").show();
                $("." + sId + " #control_system_AnlPrdkt").val(a[0]['einheitControlSys']);
                einheitAnlPrdktMstHistOnChangeChildSelectOpt(a[0]['unt_ID'],sId);
                $("#nextPrevMstIDPrdktID").val(a[0]['id']);
                /*new-mm-start 25-03-2021*/
                //$("#mstID").val(a[0]['id']);
                /*new-mm-end 25-03-2021*/
                //alert("id"+a[0]['id']);
                //mm-last
            }
        }
    });
}
/*new-mm-end 25-03-2021*/
/*new-mm-start 25-03-2021*/
function intBdeMesssetelleIMwNextPrev(key,countRecord,mst_ID){
    $.ajax({
        type: "POST",
        async: !0,
        url: "php/getManuellInterneData.php",
        data: {
            id: "intBdeMesssetelleIMw",
            nameDB: $("#nameDB").val(),
            liegID: $("#liegID").val(),
            key:key,
            countRecord:countRecord,
            iBdePrdktConf_ID:mst_ID
        },
        fail: function() {
            alert("failed!!")
        },
        success: function(a) {
            var a = JSON.parse(a);
            var b = a.length;
            //console.log(c);
            if (b>0) {

                var sId = "infosIntEnergiedaten";
                $("." + sId + " #mstIMw").val(a[0]['nameMSt']).prop('disabled',true);
                $("." + sId + " #anlageMessstelleIntBde").val(a[0]['anlageMst']).prop('disabled',true);

                var sDt = convertDateFormateForDataTbl(a[0]['intTp_ID'],a[0]['startDate']);
                var eDt = convertDateFormateForDataTbl(a[0]['intTp_ID'],a[0]['endDate']);
                $("." + sId + " #zeitintervallAnlPrdkt").val(a[0]['intTp_ID']);
                $("." + sId + " #einheitAnlPrdkt").val(a[0]['unt_ID']);
                $("." + sId + " #notizBdeIMwAnlPrdkt").val(a[0]['note']);
                zeitintervallAnlInputsVisibleInvisiblePrdkt(a[0]['intTp_ID'],sDt,eDt,a[0]['ending'],'infosIntEnergiedaten',1);
                $("." + sId + " #anlPrdktIMwNoEnding").prop('checked', a[0]['ending']);
                $("." + sId + " #anlPrdktIMwNoEnding").val(a[0]['ending']);
                if(a[0]['intTp_ID']==2){
                    $("." + sId + " #wochenWMassEingDataAnlPrdktStart1").val(a[0]['startWeek']);
                    $("." + sId + " #wochenWMassEingDataAnlPrdktEnde1").val(a[0]['endWeek']);
                }
                $("." + sId + " .control_system_div_AnlPrdkt").show();
                $("." + sId + " #control_system_AnlPrdkt").val(a[0]['einheitControlSys']);
                einheitAnlPrdktMstHistOnChangeChildSelectOpt(a[0]['unt_ID'],sId);
                $("#nextPrevMstIDPrdktID").val(a[0]['T1_mst_ID']);
                /*new-mm-start 25-03-2021*/
                $("#mstID").val(a[0]['T1_mst_ID']);
                /*new-mm-end 25-03-2021*/
                //alert("id"+a[0]['T1_mst_ID']);

            }
        }
    });
}
/*new-mm-end 25-03-2021*/
/*new-mm-end*/
/*02-11-2020 btn Masseneingabe IMw functionality*/
function btnMasseneingabeIMwChange(val,sId,id){
    $("." + sId + " .zeitintervallAnl_1 input").val("");
    $("." + sId + " .zeitintervallAnl_2 input").val("");
    $("." + sId + " .zeitintervallAnl_3 input").val("");
    $("." + sId + " .zeitintervallAnl_4 input").val("");
    /*Months Start*/
    var date = new Date();
    var eYY3  =date.getFullYear();
    var eMM3  =("0" + (date.getMonth() + 1)).slice(-2);
    var sDate3_set = date.setMonth(date.getMonth() - 3);
    var sDate3 = new Date(sDate3_set);
    var sYY3 = date.getFullYear();
    var sMM3 = ("0" + (sDate3.getMonth() + 1)).slice(-2);
    var startDate_3 = [sMM3,sYY3].join(".");
    var endDate_3 = [eMM3,eYY3].join(".");
    /*Months End*/
    /*Tage Start*/
    var date1 = new Date();
    var eYY1  =date1.getFullYear();
    var eMM1  =("0" + (date1.getMonth() + 1)).slice(-2);
    var eDD1=("0" + date1.getDate()).slice(-2);
    var sDate1_set = date1.setDate(date1.getDate() - 6);
    var sDate1 = new Date(sDate1_set);
    var sYY1 = date1.getFullYear();
    var sMM1 = ("0" + (sDate1.getMonth() + 1)).slice(-2);
    var sDD1 = ("0" + date1.getDate()).slice(-2);
    var startDate_1 = [sDD1,sMM1,sYY1].join(".");
    var endDate_1 = [eDD1,eMM1,eYY1].join(".");
    /*Tage End*/
    /*Jahr Start*/
    var date4 = new Date();
    var endDate_4  =date4.getFullYear();
    var sDate4_set = date4.setFullYear(date4.getFullYear() - 3);
    var sDate4 = new Date(sDate4_set);
    var startDate_4 = date4.getFullYear();
    /*Jahr End*/
    /*Wochen Start*/
    var date2 = new Date();
    //var startYear_2  =date2.getFullYear();
    var endYear_2  =date2.getFullYear();
    var oneJan =  new Date(date2.getFullYear(), 0, 1);
    var numberOfDays =  Math.floor((date2 - oneJan) / (24 * 60 * 60 * 1000));
    //var startWk_2 = Math.ceil(( date2.getDay() + 1 +numberOfDays - 28) / 7);
    var endWk_2 = Math.ceil(( date2.getDay() + 1 + numberOfDays) / 7);
    //var endWk_2 = 5;
    var weekDiff = endWk_2-6;
    if (weekDiff > 0) {
        var startWk_2 = weekDiff;
        var startYear_2 = date2.getFullYear();
    }else{
        var startWk_2 = 53+weekDiff;
        var sDate2_set = date2.setFullYear(date2.getFullYear() - 1);
        var sDate2 = new Date(sDate2_set);
        var startYear_2 = date2.getFullYear();
    }
    /*Wochen End*/

    if(val == 1){
        $("." + sId + " .zeitintervallAnl_1").show();
        $("." + sId + " .zeitintervallAnl_2").hide();
        $("." + sId + " .zeitintervallAnl_3").hide();
        $("." + sId + " .zeitintervallAnl_4").hide();
        $("." + sId + " .btnMasseneingabeIMwSearchDiv").show();
        $("." + sId + " #tageMassEingDataAnlStart"+id).val(startDate_1);
        $("." + sId + " #tageMassEingDataAnlEnde"+id).val(endDate_1);

        /*new-mm-start 09-04-2021 */
        $('#tageMassEingDataAnlStart'+id).datepicker( "option" , { minDate: null, maxDate: null} );
        $('#tageMassEingDataAnlEnde'+id).datepicker( "option" , { minDate: null, maxDate: null} );
        /*new-mm-end 09-04-2021*/

        //alert(startDate_1);
    }else if(val == 2){
        $("." + sId + " .zeitintervallAnl_1").hide();
        $("." + sId + " .zeitintervallAnl_2").show();
        $("." + sId + " .zeitintervallAnl_3").hide();
        $("." + sId + " .zeitintervallAnl_4").hide();
        $("." + sId + " .btnMasseneingabeIMwSearchDiv").show();
        setTimeout(function(){

            $("." + sId + " #wochenYMassEingDataAnlStart"+id).val(startYear_2);
            $("." + sId + " #wochenYMassEingDataAnlEnde"+id).val(endYear_2);
            $("." + sId + " #wochenWMassEingDataAnlStart"+id).val(startWk_2);
            $("." + sId + " #wochenWMassEingDataAnlEnde"+id).val(endWk_2);
        }, 300);
    }else if(val == 3){
        $("." + sId + " .zeitintervallAnl_1").hide();
        $("." + sId + " .zeitintervallAnl_2").hide();
        $("." + sId + " .zeitintervallAnl_3").show();
        $("." + sId + " .zeitintervallAnl_4").hide();
        $("." + sId + " .btnMasseneingabeIMwSearchDiv").show();
        $("." + sId + " #monateMassEingDataAnlStart"+id).val(startDate_3);
        $("." + sId + " #monateMassEingDataAnlEnde"+id).val(endDate_3);
    }else if(val == 4){
        $("." + sId + " .zeitintervallAnl_1").hide();
        $("." + sId + " .zeitintervallAnl_2").hide();
        $("." + sId + " .zeitintervallAnl_3").hide();
        $("." + sId + " .zeitintervallAnl_4").show();
        $("." + sId + " .btnMasseneingabeIMwSearchDiv").show();
        $("." + sId + " #jahrMassEingDataAnlStart"+id).val(startDate_4);
        $("." + sId + " #jahrMassEingDataAnlEnde"+id).val(endDate_4);
    }else{
        $("." + sId + " .zeitintervallAnl_1").hide();
        $("." + sId + " .zeitintervallAnl_2").hide();
        $("." + sId + " .zeitintervallAnl_3").hide();
        $("." + sId + " .zeitintervallAnl_4").hide();
        $("." + sId + " .btnMasseneingabeIMwSearchDiv").hide();
    }
}

/*new-mm-start 31-03-2021*/
function btnMasseneingabeIMwChangePrdkt(val,sId,id){
    $("." + sId + " .zeitintervallAnlPrdkt_1 input").val("");
    $("." + sId + " .zeitintervallAnlPrdkt_2 input").val("");
    $("." + sId + " .zeitintervallAnlPrdkt_3 input").val("");
    $("." + sId + " .zeitintervallAnlPrdkt_4 input").val("");
    /*Months Start*/
    var date = new Date();
    var eYY3  =date.getFullYear();
    var eMM3  =("0" + (date.getMonth() + 1)).slice(-2);
    var sDate3_set = date.setMonth(date.getMonth() - 3);
    var sDate3 = new Date(sDate3_set);
    var sYY3 = date.getFullYear();
    var sMM3 = ("0" + (sDate3.getMonth() + 1)).slice(-2);
    var startDate_3 = [sMM3,sYY3].join(".");
    var endDate_3 = [eMM3,eYY3].join(".");
    /*Months End*/
    /*Tage Start*/
    var date1 = new Date();
    var eYY1  =date1.getFullYear();
    var eMM1  =("0" + (date1.getMonth() + 1)).slice(-2);
    var eDD1=("0" + date1.getDate()).slice(-2);
    var sDate1_set = date1.setDate(date1.getDate() - 6);
    var sDate1 = new Date(sDate1_set);
    var sYY1 = date1.getFullYear();
    var sMM1 = ("0" + (sDate1.getMonth() + 1)).slice(-2);
    var sDD1 = ("0" + date1.getDate()).slice(-2);
    var startDate_1 = [sDD1,sMM1,sYY1].join(".");
    var endDate_1 = [eDD1,eMM1,eYY1].join(".");
    /*Tage End*/
    /*Jahr Start*/
    var date4 = new Date();
    var endDate_4  =date4.getFullYear();
    var sDate4_set = date4.setFullYear(date4.getFullYear() - 3);
    var sDate4 = new Date(sDate4_set);
    var startDate_4 = date4.getFullYear();
    /*Jahr End*/
    /*Wochen Start*/
    var date2 = new Date();
    //var startYear_2  =date2.getFullYear();
    var endYear_2  =date2.getFullYear();
    var oneJan =  new Date(date2.getFullYear(), 0, 1);
    var numberOfDays =  Math.floor((date2 - oneJan) / (24 * 60 * 60 * 1000));
    //var startWk_2 = Math.ceil(( date2.getDay() + 1 +numberOfDays - 28) / 7);
    var endWk_2 = Math.ceil(( date2.getDay() + 1 + numberOfDays) / 7);
    //var endWk_2 = 5;
    var weekDiff = endWk_2-6;
    if (weekDiff > 0) {
        var startWk_2 = weekDiff;
        var startYear_2 = date2.getFullYear();
    }else{
        var startWk_2 = 53+weekDiff;
        var sDate2_set = date2.setFullYear(date2.getFullYear() - 1);
        var sDate2 = new Date(sDate2_set);
        var startYear_2 = date2.getFullYear();
    }
    /*Wochen End*/

    if(val == 1){
        $("." + sId + " .zeitintervallAnlPrdkt_1").show();
        $("." + sId + " .zeitintervallAnlPrdkt_2").hide();
        $("." + sId + " .zeitintervallAnlPrdkt_3").hide();
        $("." + sId + " .zeitintervallAnlPrdkt_4").hide();
        $("." + sId + " .btnMasseneingabeIMwSearchDiv").show();
        $("." + sId + " #tageMassEingDataAnlPrdktStart"+id).val(startDate_1);
        $("." + sId + " #tageMassEingDataAnlPrdktEnde"+id).val(endDate_1);

        /*new-mm-start 09-04-2021 */
        $('#tageMassEingDataAnlPrdktStart'+id).datepicker( "option" , { minDate: null, maxDate: null} );
        $('#tageMassEingDataAnlPrdktEnde'+id).datepicker( "option" , { minDate: null, maxDate: null} );
        /*new-mm-end 09-04-2021*/


        //alert(startDate_1);
    }else if(val == 2){
        $("." + sId + " .zeitintervallAnlPrdkt_1").hide();
        $("." + sId + " .zeitintervallAnlPrdkt_2").show();
        $("." + sId + " .zeitintervallAnlPrdkt_3").hide();
        $("." + sId + " .zeitintervallAnlPrdkt_4").hide();
        $("." + sId + " .btnMasseneingabeIMwSearchDiv").show();
        setTimeout(function(){

            $("." + sId + " #wochenYMassEingDataAnlPrdktStart"+id).val(startYear_2);
            $("." + sId + " #wochenYMassEingDataAnlPrdktEnde"+id).val(endYear_2);
            $("." + sId + " #wochenWMassEingDataAnlPrdktStart"+id).val(startWk_2);
            $("." + sId + " #wochenWMassEingDataAnlPrdktEnde"+id).val(endWk_2);
        }, 300);
    }else if(val == 3){
        $("." + sId + " .zeitintervallAnlPrdkt_1").hide();
        $("." + sId + " .zeitintervallAnlPrdkt_2").hide();
        $("." + sId + " .zeitintervallAnlPrdkt_3").show();
        $("." + sId + " .zeitintervallAnlPrdkt_4").hide();
        $("." + sId + " .btnMasseneingabeIMwSearchDiv").show();
        $("." + sId + " #monateMassEingDataAnlPrdktStart"+id).val(startDate_3);
        $("." + sId + " #monateMassEingDataAnlPrdktEnde"+id).val(endDate_3);
    }else if(val == 4){
        $("." + sId + " .zeitintervallAnlPrdkt_1").hide();
        $("." + sId + " .zeitintervallAnlPrdkt_2").hide();
        $("." + sId + " .zeitintervallAnlPrdkt_3").hide();
        $("." + sId + " .zeitintervallAnlPrdkt_4").show();
        $("." + sId + " .btnMasseneingabeIMwSearchDiv").show();
        $("." + sId + " #jahrMassEingDataAnlPrdktStart"+id).val(startDate_4);
        $("." + sId + " #jahrMassEingDataAnlPrdktEnde"+id).val(endDate_4);
    }else{
        $("." + sId + " .zeitintervallAnlPrdkt_1").hide();
        $("." + sId + " .zeitintervallAnlPrdkt_2").hide();
        $("." + sId + " .zeitintervallAnlPrdkt_3").hide();
        $("." + sId + " .zeitintervallAnlPrdkt_4").hide();
        $("." + sId + " .btnMasseneingabeIMwSearchDiv").hide();
    }
}
/*new-mm-end 31-03-2021*/

/*Interne Messwerte Start 20-10-2020*/
function getDataMasseneingabeIMwSearch(zeitintervallAnl,startDate,endDate){
    //alert("1");
    $.ajax({
        type: "POST",
        async: !0,
        url: "php/getManuellInterneData.php",
        data: {
            id: "masseneingabeSearch",
            nameDB: $("#nameDB").val(),
            startDate: startDate,
            endDate:endDate,
            zeitintervallAnl:zeitintervallAnl
        },
        fail: function() {
            alert("failed!!")
        },
        success: function(a) {
            a = JSON.parse(a);
            //console.log(a);
            var b = a.query1.length;
            if(b>0){
                if(zeitintervallAnl == 1){
                    var from = startDate.split(".");
                    var to = endDate.split(".");

                    var newStartDate = [from[2],from[1],from[0]].join('-');
                    var newEndDate = [to[2], to[1], to[0]].join('-');

                    var From_date = new Date(newStartDate);
                    var To_date = new Date(newEndDate);
                    var diff_date =  To_date - From_date;

                    var dateArr = getDatesInToArray(From_date, To_date);
                    //console.log('dateArr='+dateArr);
                    //findArrValueByDate('2020-11-15',23,a.query2);

                    var day = 1000 * 60 * 60 * 24;
                    var days = Math.floor(diff_date/day);
                    $("#tblMasseneingabeDataIMw").remove();
                    $row ='<div id="tblMasseneingabeDataIMw"><table id="tblMasseneingabeDataIMwTbl">';
                    for (var e = 0; e < b; e++){
                        if(e==0) {
                            $row += '<tr><td>Anlage</td>';
                            for (var r = 0; r <= days; r++){

                                $row += '<th data-id="'+a.query1[e].mst_ID+'" class="masseneingabeInputLBL">'+convertToDateMonthAndYearformate(dateArr[r])+'</th>';


                            }
                            $row += '</tr>';
                        }
                    }

                    for (var e = 0; e < b; e++){
                        $row += '<tr id="dataEnabledRow-'+e+'" class="enabledRow" data-einheit="'+a.query1[e].einheitControlSys+'"><td>'+a.query1[e].nameMSt+'</td>';
                        //console.log(anlageObj[a.query1[e].mst_ID]);
                        //console.log(anlageObj);
                        var datesOfArr = [];
                        var p=0;var z;
                        for (var r = 0; r <= days; r++){
                            var n='';
                            //console.log(a[e].ending);
                            if(a.query1[e].ending ==0){
                                if(a.query1[e].startDate > dateArr[r]){
                                    n='disabled';
                                }else if(a.query1[e].endDate < dateArr[r]){
                                    n='disabled';
                                }
                            }
                            if(a.query1[e].ending ==1){
                                if(a.query1[e].startDate > dateArr[r]){
                                    n='disabled';
                                }
                            }

                            if(n !='disabled'){
                                if(p < 5){
                                    z="checkAlertRange";
                                }else{
                                    z='';
                                }
                                p++;
                            }
                            var inputVal = findArrValueByDate(dateArr[r],a.query1[e].mst_ID,a.query2);
                            $row += '<td data-id="'+a.query1[e].mst_ID+'"  date="'+dateArr[r]+'" class="masseneingabeInputTD"><input type="text" class="txtBoxSrch isShowPopup '+z+'" id="anlageMainRow_'+r+'"  name="masseneingabeInput'+r+'[]" '+n+' value="'+inputVal+'"/></td>';
                            if(inputVal !=''){
                                datesOfArr.push(dateArr[r]);
                                anlageObj[a.query1[e].mst_ID]=datesOfArr;
                            }else{
                                anlageObj[a.query1[e].mst_ID]=datesOfArr;
                            }
                        }

                        $row += '</tr>';
                        /*Second row for calculation*/
                        $row += '<tr class="calcZeit1RowInputs hide disabledRow" id="dataDisabledRow-'+e+'"><td></td>';
                        for (var r = 0; r <= days; r++){
                            var n='';
                            //console.log(a[e].ending);
                            if(a.query1[e].ending ==0){
                                if(a.query1[e].startDate > dateArr[r]){
                                    n='disabled';
                                }else if(a.query1[e].endDate < dateArr[r]){
                                    n='disabled';
                                }
                            }
                            if(a.query1[e].ending ==1){
                                if(a.query1[e].startDate > dateArr[r]){
                                    n='disabled';
                                }
                            }
                            // console.log('n='+n);
                            var rdOnly = '';
                            if(n !== 'disabled'){
                                rdOnly = 'readonly';
                            }
                            var inputVal = findArrValueByDate(dateArr[r],a.query1[e].mst_ID,a.query3);
                            $row += '<td data-id="'+a.query1[e].mst_ID+'"  date="'+dateArr[r]+'" class="masseneingabeInputTD"><input type="text" id="anlageCalculationRow_'+r+'" name="masseneingabeInput'+r+'[]" '+n+' '+rdOnly+' value="'+inputVal+'"/></td>';
                        }
                        $row += '</tr>';
                    }
                    $row +='</table></div>';
                    $('#timeIntervalWerteEnergiedatenIMw').html( $row );

                }else if(zeitintervallAnl == 2){
                    var from = startDate.split("-");
                    var g = from[0]; //first week selected value
                    var f = from[1]; //first year input text value

                    var to = endDate.split("-");
                    var s =  to[0]; //second week selected value
                    var t =  to[1]; //second year input text value

                    var years =  t - f;

                    $("#tblMasseneingabeDataIMw").remove();
                    $row ='<div id="tblMasseneingabeDataIMw"><table id="tblMasseneingabeDataIMwTbl">';
                    for (var e = 0; e < b; e++){
                        if(e==0) {
                            $row += '<tr><td>Anlage</td>';
                            for (var r = 0; r <= years; r++){
                                var yr = eval(f) + eval(r);
                                var weekNum =53;
                                if(t==yr){
                                    weekNum =s;
                                }
                                for (var i = g; i <= weekNum; i++){
                                    if(a.query1[e].startDate <= yr ){
                                        if(a.query1[e].startDate == yr && a.query1[e].startWeek <= i){
                                            m='';
                                        }
                                        if(a.query1[e].startDate < yr ){
                                            m='';
                                        }
                                    }
                                    if(yr >= a.query1[e].endDate){
                                        if(yr > a.query1[e].endDate){
                                            m='disabled';

                                        }
                                        if(yr == a.query1[e].endDate && a.query1[e].endWeek < i){
                                            m='disabled';
                                        }
                                    }
                                    $row += '<th data-id="'+a.query1[e].mst_ID+'" class="masseneingabeInputLBL">' + i + ' KW ' + yr + '</th>';
                                    if(i>=53){
                                        var g=1;
                                    }
                                }
                            }

                            $row += '</tr>';
                        }
                    }
                    var weekOfArr=[];
                    for (var e = 0; e < b; e++){
                        var from1 = startDate.split("-");
                        var g1 = g2=from1[0]; //first week selected value
                        var f1 = f2=from1[1]; //first year input text value

                        var to1 = endDate.split("-");
                        var s1 =s2=  to1[0]; //second week selected value
                        var t1 =t2=  to1[1]; //second year input text value

                        $row += '<tr id="dataEnabledRow-'+e+'" class="enabledRow"  data-einheit="'+a.query1[e].einheitControlSys+'"><td>'+a.query1[e].nameMSt+'</td>';
                        var count1 = 0;
                        for (var r1 = 0; r1 <= years; r1++){
                            var m='disabled';
                            var yr1 = eval(f1) + eval(r1);
                            var weekNum =53;
                            if(t1==yr1){
                                weekNum =s1;
                            }
                            for (var i1 = g1; i1 <= weekNum; i1++){
                                if(a.query1[e].startDate <= yr1 ){
                                    if(a.query1[e].startDate == yr1 && a.query1[e].startWeek <= i1){
                                        m='';
                                    }
                                    if(a.query1[e].startDate < yr1 ){
                                        m='';
                                    }
                                }
                                if(a.query1[e].ending ==0){
                                    if(yr1 >= a.query1[e].endDate){
                                        if(yr1 > a.query1[e].endDate){
                                            m='disabled';

                                        }
                                        if(yr1 == a.query1[e].endDate && a.query1[e].endWeek < i1){
                                            m='disabled';
                                        }
                                    }
                                }
                                if(a.query1[e].ending ==1){
                                    if(yr1 >= a.query1[e].endDate){
                                        /*if(yr1 > a.query1[e].endDate){
                                                    m='';

                                                 } */
                                        if(yr1 == a.query1[e].endDate && a.query1[e].endWeek < i1){
                                            m='';
                                        }
                                    }
                                }
                                var inputVal =  findArrValueByDateWeek(yr1,i1,a.query1[e].mst_ID,a.query2);
                                $row += '<td data-id="'+a.query1[e].mst_ID+'" class="masseneingabeInputTD" date="' + i1 + '-' + yr1 + '"><input type="text" id="anlageMainRow_'+count1+'" name="masseneingabeInput'+i1+'[]" '+m+' class="txtBoxSrch isShowPopup" value="'+inputVal+'"/></td>';
                                if(i1>=53){
                                    var g1=1;
                                    // console.log('i1='+i1);
                                }
                                if(inputVal !=''){
                                    weekOfArr.push(String(i1 + '-' + yr1));
                                    anlageObj[a.query1[e].mst_ID]=weekOfArr;
                                }/*else{
                                            anlageObj[a.query1[e].mst_ID]=weekOfArr;
                                        }*/
                                // console.log(anlageObj);
                                count1 ++;
                            }
                        }

                        $row += '</tr>';
                        $row += '<tr class="calcZeit2RowInputs hide disabledRow" id="dataDisabledRow-'+e+'"><td></td>';
                        var count2 = 0;
                        for (var r2 = 0; r2 <= years; r2++){
                            var m='disabled';
                            var yr2 = eval(f2) + eval(r2);
                            var weekNum =53;
                            if(t2==yr2){
                                weekNum =s2;
                            }
                            for (var i2 = g2; i2 <= weekNum; i2++){
                                if(a.query1[e].startDate <= yr2 ){
                                    if(a.query1[e].startDate == yr2 && a.query1[e].startWeek <= i2){
                                        m='';
                                    }
                                    if(a.query1[e].startDate < yr2 ){
                                        m='';
                                    }
                                }
                                if(a.query1[e].ending ==0){
                                    if(yr2 >= a.query1[e].endDate){
                                        if(yr2 > a.query1[e].endDate){
                                            m='disabled';

                                        }
                                        if(yr2 == a.query1[e].endDate && a.query1[e].endWeek < i2){
                                            m='disabled';
                                        }
                                    }
                                }
                                if(a.query1[e].ending ==1){
                                    if(yr2 >= a.query1[e].endDate){
                                        /*if(yr2 > a.query1[e].endDate){
                                                    m='';

                                                 } */
                                        if(yr2 == a.query1[e].endDate && a.query1[e].endWeek < i2){
                                            m='';
                                        }
                                    }
                                }
                                var rdOnly = '';
                                if(m !== 'disabled'){
                                    rdOnly = 'readonly';
                                }
                                var inputVal =  findArrValueByDateWeek(yr2,i2,a.query1[e].mst_ID,a.query3);
                                $row += '<td data-id="'+a.query1[e].mst_ID+'" class="masseneingabeInputTD"  date="' + i2 + '-' + yr2 + '"><input type="text" id="anlageCalculationRow_'+count2+'" name="masseneingabeInput'+i2+'[]" '+m+' '+rdOnly+' value="'+inputVal+'"/></td>';
                                if(i2>=53){
                                    var g2=1;
                                    // console.log('i2='+i2);
                                }
                                count2 ++;
                            }
                        }

                        $row += '</tr>';
                    }
                    $row +='</table></div>';
                    $('#timeIntervalWerteEnergiedatenIMw').html( $row );

                }else if(zeitintervallAnl == 3){
                    //alert(3);
                    var from_3 = startDate.split(".");
                    var startMn_3 = from_3[0]; //first week selected value
                    var startYr_3 = from_3[1]; //first year input text value

                    var to_3 = endDate.split(".");
                    var endMn_3 =  to_3[0]; //second week selected value
                    var endYr_3 = to_3[1]; //second year input text value

                    var newStartDate = [startYr_3,startMn_3].join('-');
                    var newEndDate = [endYr_3,endMn_3].join('-');

                    var From_date = new Date(newStartDate);
                    var To_date = new Date(newEndDate);
                    var diff_date =  To_date - From_date;

                    var dateArr = getMonthsInToArray(From_date, To_date);
                    //console.log(dateArr);
                    var day = 1000 * 60 * 60 * 24;
                    var days = Math.ceil(diff_date/day);
                    var months = Math.ceil(days/31);
                    //var years = Math.ceil(months/12);

                    $("#tblMasseneingabeDataIMw").remove();
                    $row ='<div id="tblMasseneingabeDataIMw"><table id="tblMasseneingabeDataIMwTbl">';
                    for (var e = 0; e < b; e++){
                        if(e==0) {
                            $row += '<tr><td>Anlage</td>';
                            for (var r = 0; r <= months; r++){
                                $row += '<th data-id="'+a.query1[e].mst_ID+'" class="masseneingabeInputLBL">' + convertToMonthAndYearformate(dateArr[r]) + '</th>';
                            }
                            $row += '</tr>';
                        }
                    }
                    var monthOfArr=[];
                    for (var e = 0; e < b; e++){
                        $row += '<tr id="dataEnabledRow-'+e+'"  class="enabledRow" data-einheit="'+a.query1[e].einheitControlSys+'"><td>'+a.query1[e].nameMSt+'</td>';
                        for (var r = 0; r <= months; r++){
                            var n='';
                            if(a.query1[e].ending ==0){
                                if(a.query1[e].startDate > dateArr[r]){
                                    n='disabled';
                                }else if(a.query1[e].endDate < dateArr[r]){
                                    n='disabled';
                                }
                            }
                            if(a.query1[e].ending ==1){
                                if(a.query1[e].startDate > dateArr[r]){
                                    n='disabled';
                                }
                            }
                            var inputVal = findArrValueByDate(dateArr[r],a.query1[e].mst_ID,a.query2);
                            $row += '<td data-id="'+a.query1[e].mst_ID+'" class="masseneingabeInputTD" date="' + dateArr[r] + '"><input type="text" name="masseneingabeInput'+r+'[]" '+n+' class="txtBoxSrch isShowPopup" id="anlageMainRow_'+r+'" value="'+inputVal+'" /></td>';
                            if(inputVal !=''){
                                monthOfArr.push(dateArr[r]);
                                anlageObj[a.query1[e].mst_ID]=monthOfArr;
                            }else{
                                anlageObj[a.query1[e].mst_ID]=monthOfArr;
                            }
                        }
                        $row += '</tr>';
                        $row += '<tr class="calcZeit3RowInputs hide disabledRow" id="dataDisabledRow-'+e+'"><td></td>';
                        for (var r = 0; r <= months; r++){
                            var n='';
                            if(a.query1[e].ending ==0){
                                if(a.query1[e].startDate > dateArr[r]){
                                    n='disabled';
                                }else if(a.query1[e].endDate < dateArr[r]){
                                    n='disabled';
                                }
                            }
                            if(a.query1[e].ending ==1){
                                if(a.query1[e].startDate > dateArr[r]){
                                    n='disabled';
                                }
                            }
                            var rdOnly = '';
                            if(n !== 'disabled'){
                                rdOnly = 'readonly';
                            }
                            var inputVal = findArrValueByDate(dateArr[r],a.query1[e].mst_ID,a.query3);
                            $row += '<td data-id="'+a.query1[e].mst_ID+'" class="masseneingabeInputTD" date="' + dateArr[r] + '"><input type="text" name="masseneingabeInput'+r+'[]" '+n+' '+rdOnly+' id="anlageCalculationRow_'+r+'" value="'+inputVal+'"/></td>';
                        }
                        $row += '</tr>';
                    }
                    $row +='</table></div>';
                    $('#timeIntervalWerteEnergiedatenIMw').html( $row );
                }else if(zeitintervallAnl == 4){
                    var years =  endDate - startDate;
                    const getYearsInToArray = (start, end) => Array(end - start + 1)
                        .fill(start)
                        .map((year, index) => year + index);
                    $("#tblMasseneingabeDataIMw").remove();
                    $row ='<div id="tblMasseneingabeDataIMw"><table id="tblMasseneingabeDataIMwTbl">';
                    for (var e = 0; e < b; e++){
                        if(e==0) {
                            $row += '<tr><td>Anlage</td>';
                            for (var r = 0; r <= years; r++){
                                var yr = eval(startDate) + eval(r);
                                $row += '<th data-id="'+a.query1[e].mst_ID+'" class="masseneingabeInputLBL">' + yr + '</th>';
                            }
                            $row += '</tr>';
                        }
                    }
                    var yearOfArr = [];
                    for (var e = 0; e < b; e++){
                        $row += '<tr id="dataEnabledRow-'+e+'" class="enabledRow" data-einheit="'+a.query1[e].einheitControlSys+'"><td>'+a.query1[e].nameMSt+'</td>';

                        for (var r = 0; r <= years; r++){
                            let yearsBw= getYearsInToArray(new Date(startDate).getFullYear(), new Date(endDate).getFullYear());
                            var t='';
                            var yr1 = eval(startDate) + eval(r);
                            if(a.query1[e].ending ==0){
                                if(a.query1[e].startDate > yearsBw[r]){
                                    t='disabled';
                                }else if(a.query1[e].endDate < yearsBw[r]){
                                    t='disabled';
                                }
                            }
                            if(a.query1[e].ending ==1){
                                if(a.query1[e].startDate > yearsBw[r]){
                                    t='disabled';
                                }
                            }
                            var inputVal = findArrValueByDate(yearsBw[r],a.query1[e].mst_ID,a.query2);
                            $row += '<td data-id="'+a.query1[e].mst_ID+'" class="masseneingabeInputTD" date="' + yr1 + '"><input type="text" name="masseneingabeInput'+r+'[]" '+t+' class="txtBoxSrch isShowPopup" id="anlageMainRow_'+r+'" value="'+inputVal+'" /></td>';
                            if(inputVal !=''){
                                yearOfArr.push(String(yearsBw[r]));
                                anlageObj[a.query1[e].mst_ID]=yearOfArr;
                            }else{
                                anlageObj[a.query1[e].mst_ID]=yearOfArr;
                            }
                            //console.log(anlageObj);
                        }
                        $row += '</tr>';

                        $row += '<tr class="calcZeit4RowInputs hide disabledRow" id="dataDisabledRow-'+e+'"><td></td>';
                        for (var r = 0; r <= years; r++){
                            let yearsBw= getYearsInToArray(new Date(startDate).getFullYear(), new Date(endDate).getFullYear());
                            var t='';
                            var yr1 = eval(startDate) + eval(r);
                            if(a.query1[e].ending ==0){
                                if(a.query1[e].startDate > yearsBw[r]){
                                    t='disabled';
                                }else if(a.query1[e].endDate < yearsBw[r]){
                                    t='disabled';
                                }
                            }
                            if(a.query1[e].ending ==1){
                                if(a.query1[e].startDate > yearsBw[r]){
                                    t='disabled';
                                }
                            }
                            var rdOnly = '';
                            if(t !== 'disabled'){
                                rdOnly = 'readonly';
                            }
                            var inputVal = findArrValueByDate(yearsBw[r],a.query1[e].mst_ID,a.query3);
                            $row += '<td data-id="'+a.query1[e].mst_ID+'" class="masseneingabeInputTD" date="' + yr1 + '"><input type="text" name="masseneingabeInput'+r+'[]" '+t+' '+rdOnly+'  id="anlageCalculationRow_'+r+'" value="'+inputVal+'"/></td>';
                        }
                        $row += '</tr>';
                    }
                    $row +='</table></div>';
                    $('#timeIntervalWerteEnergiedatenIMw').html( $row );
                }
            }else{
                $("#tblMasseneingabeDataIMw").remove();
                $noRow ='<div id="tblMasseneingabeDataIMw"><table id="tblMasseneingabeDataIMwTbl" style="border:1px solid #f3f3f3;background:#ccc;"';
                $noRow += '<tr><td style="text-align:center;">No Record Found ! Please enter valid dates into input.</td>';  $noRow += '</tr>';
                $noRow +='</table></div>';
                $('#timeIntervalWerteEnergiedatenIMw').html( $noRow );
            }
        }
    });
}
/*new-mm-start 31-03-2021,05-04-2021*/
function getDataMasseneingabeIMwSearchPrdkt(zeitintervallAnl,startDate,endDate){
    //alert("2");
    $.ajax({
        type: "POST",
        async: !0,
        url: "php/getManuellInterneData.php",
        data: {
            id: "masseneingabePrdktSearch",
            nameDB: $("#nameDB").val(),
            startDate: startDate,
            endDate:endDate,
            zeitintervallAnl:zeitintervallAnl
        },
        fail: function() {
            alert("failed!!")
        },
        success: function(a) {
            a = JSON.parse(a);
            //console.log(a);
            var b = a.query1.length;
            if(b>0){
                if(zeitintervallAnl == 1){
                    var from = startDate.split(".");
                    var to = endDate.split(".");

                    var newStartDate = [from[2],from[1],from[0]].join('-');
                    var newEndDate = [to[2], to[1], to[0]].join('-');

                    var From_date = new Date(newStartDate);
                    var To_date = new Date(newEndDate);
                    var diff_date =  To_date - From_date;

                    var dateArr = getDatesInToArray(From_date, To_date);
                    //console.log('dateArr='+dateArr);
                    //findArrValueByDate('2020-11-15',23,a.query2);

                    var day = 1000 * 60 * 60 * 24;
                    var days = Math.floor(diff_date/day);
                    $("#tblMasseneingabeDataIMw").remove();
                    $row ='<div id="tblMasseneingabeDataIMw"><table id="tblMasseneingabeDataIMwTbl">';
                    for (var e = 0; e < b; e++){
                        if(e==0) {
                            $row += '<tr><td>Anlage</td>';
                            for (var r = 0; r <= days; r++){

                                $row += '<th data-id="'+a.query1[e].id+'" class="masseneingabeInputLBL">'+convertToDateMonthAndYearformate(dateArr[r])+'</th>';


                            }
                            $row += '</tr>';
                        }
                    }

                    for (var e = 0; e < b; e++){
                        $row += '<tr id="dataEnabledRow-'+e+'" class="enabledRow" data-einheit="'+a.query1[e].einheitControlSys+'"><td>'+a.query1[e].bezeichnungAnl+'</td>';
                        //console.log(anlageObj[a.query1[e].mst_ID]);
                        //console.log(anlageObj);
                        var datesOfArr = [];
                        var p=0;var z;
                        for (var r = 0; r <= days; r++){
                            var n='';
                            //console.log(a[e].ending);
                            if(a.query1[e].ending ==0){
                                if(a.query1[e].startDate > dateArr[r]){
                                    n='disabled';
                                }else if(a.query1[e].endDate < dateArr[r]){
                                    n='disabled';
                                }
                            }
                            if(a.query1[e].ending ==1){
                                if(a.query1[e].startDate > dateArr[r]){
                                    n='disabled';
                                }
                            }

                            if(n !='disabled'){
                                if(p < 5){
                                    z="checkAlertRange";
                                }else{
                                    z='';
                                }
                                p++;
                            }

                            var inputVal = findArrValueByDatePrdkt(dateArr[r],a.query1[e].id,a.query2);
                            $row += '<td data-id="'+a.query1[e].id+'"  date="'+dateArr[r]+'" class="masseneingabeInputTD"><input type="text" class="txtBoxSrch isShowPopup '+z+'" id="anlageMainRow_'+r+'"  name="masseneingabeInput'+r+'[]" '+n+' value="'+inputVal+'"/></td>';
                            if(inputVal !=''){
                                datesOfArr.push(dateArr[r]);
                                anlageObj[a.query1[e].id]=datesOfArr;
                            }else{
                                anlageObj[a.query1[e].id]=datesOfArr;
                            }
                        }

                        $row += '</tr>';
                        /*Second row for calculation*/
                        $row += '<tr class="calcZeit1RowInputs hide disabledRow" id="dataDisabledRow-'+e+'"><td></td>';
                        for (var r = 0; r <= days; r++){
                            var n='';
                            //console.log(a[e].ending);
                            if(a.query1[e].ending ==0){
                                if(a.query1[e].startDate > dateArr[r]){
                                    n='disabled';
                                }else if(a.query1[e].endDate < dateArr[r]){
                                    n='disabled';
                                }
                            }
                            if(a.query1[e].ending ==1){
                                if(a.query1[e].startDate > dateArr[r]){
                                    n='disabled';
                                }
                            }
                            // console.log('n='+n);
                            var rdOnly = '';
                            if(n !== 'disabled'){
                                rdOnly = 'readonly';
                            }
                            var inputVal = findArrValueByDatePrdkt(dateArr[r],a.query1[e].id,a.query3);
                            $row += '<td data-id="'+a.query1[e].id+'"  date="'+dateArr[r]+'" class="masseneingabeInputTD"><input type="text" id="anlageCalculationRow_'+r+'" name="masseneingabeInput'+r+'[]" '+n+' '+rdOnly+' value="'+inputVal+'"/></td>';
                        }
                        $row += '</tr>';
                    }
                    $row +='</table></div>';
                    $('#timeIntervalWerteEnergiedatenIMwPrdkt').html( $row );

                }else if(zeitintervallAnl == 2){
                    var from = startDate.split("-");
                    var g = from[0]; //first week selected value
                    var f = from[1]; //first year input text value

                    var to = endDate.split("-");
                    var s =  to[0]; //second week selected value
                    var t =  to[1]; //second year input text value

                    var years =  t - f;

                    $("#tblMasseneingabeDataIMw").remove();
                    $row ='<div id="tblMasseneingabeDataIMw"><table id="tblMasseneingabeDataIMwTbl">';
                    for (var e = 0; e < b; e++){
                        if(e==0) {
                            $row += '<tr><td>Anlage</td>';
                            for (var r = 0; r <= years; r++){
                                var yr = eval(f) + eval(r);
                                var weekNum =53;
                                if(t==yr){
                                    weekNum =s;
                                }
                                for (var i = g; i <= weekNum; i++){
                                    if(a.query1[e].startDate <= yr ){
                                        if(a.query1[e].startDate == yr && a.query1[e].startWeek <= i){
                                            m='';
                                        }
                                        if(a.query1[e].startDate < yr ){
                                            m='';
                                        }
                                    }
                                    if(yr >= a.query1[e].endDate){
                                        if(yr > a.query1[e].endDate){
                                            m='disabled';

                                        }
                                        if(yr == a.query1[e].endDate && a.query1[e].endWeek < i){
                                            m='disabled';
                                        }
                                    }
                                    $row += '<th data-id="'+a.query1[e].id+'" class="masseneingabeInputLBL">' + i + ' KW ' + yr + '</th>';
                                    if(i>=53){
                                        var g=1;
                                    }
                                }
                            }

                            $row += '</tr>';
                        }
                    }
                    var weekOfArr=[];
                    for (var e = 0; e < b; e++){
                        var from1 = startDate.split("-");
                        var g1 = g2=from1[0]; //first week selected value
                        var f1 = f2=from1[1]; //first year input text value

                        var to1 = endDate.split("-");
                        var s1 =s2=  to1[0]; //second week selected value
                        var t1 =t2=  to1[1]; //second year input text value

                        $row += '<tr id="dataEnabledRow-'+e+'" class="enabledRow"  data-einheit="'+a.query1[e].einheitControlSys+'"><td>'+a.query1[e].bezeichnungAnl+'</td>';
                        var count1 = 0;
                        for (var r1 = 0; r1 <= years; r1++){
                            var m='disabled';
                            var yr1 = eval(f1) + eval(r1);
                            var weekNum =53;
                            if(t1==yr1){
                                weekNum =s1;
                            }
                            for (var i1 = g1; i1 <= weekNum; i1++){
                                if(a.query1[e].startDate <= yr1 ){
                                    if(a.query1[e].startDate == yr1 && a.query1[e].startWeek <= i1){
                                        m='';
                                    }
                                    if(a.query1[e].startDate < yr1 ){
                                        m='';   
                                    }
                                }
                                if(a.query1[e].ending ==0){
                                    if(yr1 >= a.query1[e].endDate){
                                        if(yr1 > a.query1[e].endDate){
                                            m='disabled';

                                        }
                                        if(yr1 == a.query1[e].endDate && a.query1[e].endWeek < i1){
                                            m='disabled';
                                        }
                                    }
                                }
                                if(a.query1[e].ending ==1){
                                    if(yr1 >= a.query1[e].endDate){
                                        /*if(yr1 > a.query1[e].endDate){
                                                    m='';

                                                 } */
                                        if(yr1 == a.query1[e].endDate && a.query1[e].endWeek < i1){
                                            m='';
                                        }
                                    }
                                }
                                var inputVal =  findArrValueByDateWeekPrdkt(yr1,i1,a.query1[e].id,a.query2);
                                $row += '<td data-id="'+a.query1[e].id+'" class="masseneingabeInputTD" date="' + i1 + '-' + yr1 + '"><input type="text" id="anlageMainRow_'+count1+'" name="masseneingabeInput'+i1+'[]" '+m+' class="txtBoxSrch isShowPopup" value="'+inputVal+'"/></td>';
                                if(i1>=53){
                                    var g1=1;
                                    // console.log('i1='+i1);
                                }
                                if(inputVal !=''){
                                    weekOfArr.push(String(i1 + '-' + yr1));
                                    anlageObj[a.query1[e].id]=weekOfArr;
                                }/*else{
                                            anlageObj[a.query1[e].mst_ID]=weekOfArr;
                                        }*/
                                // console.log(anlageObj);
                                count1 ++;
                            }
                        }

                        $row += '</tr>';
                        $row += '<tr class="calcZeit2RowInputs hide disabledRow" id="dataDisabledRow-'+e+'"><td></td>';
                        var count2 = 0;
                        for (var r2 = 0; r2 <= years; r2++){
                            var m='disabled';
                            var yr2 = eval(f2) + eval(r2);
                            var weekNum =53;
                            if(t2==yr2){
                                weekNum =s2;
                            }
                            for (var i2 = g2; i2 <= weekNum; i2++){
                                if(a.query1[e].startDate <= yr2 ){
                                    if(a.query1[e].startDate == yr2 && a.query1[e].startWeek <= i2){
                                        m='';
                                    }
                                    if(a.query1[e].startDate < yr2 ){
                                        m='';
                                    }
                                }
                                if(a.query1[e].ending ==0){
                                    if(yr2 >= a.query1[e].endDate){
                                        if(yr2 > a.query1[e].endDate){
                                            m='disabled';

                                        }
                                        if(yr2 == a.query1[e].endDate && a.query1[e].endWeek < i2){
                                            m='disabled';
                                        }
                                    }
                                }
                                if(a.query1[e].ending ==1){
                                    if(yr2 >= a.query1[e].endDate){
                                        /*if(yr2 > a.query1[e].endDate){
                                                    m='';

                                                 } */
                                        if(yr2 == a.query1[e].endDate && a.query1[e].endWeek < i2){
                                            m='';
                                        }
                                    }
                                }
                                var rdOnly = '';
                                if(m !== 'disabled'){
                                    rdOnly = 'readonly';
                                }
                                var inputVal =  findArrValueByDateWeekPrdkt(yr2,i2,a.query1[e].id,a.query3);
                                $row += '<td data-id="'+a.query1[e].id+'" class="masseneingabeInputTD"  date="' + i2 + '-' + yr2 + '"><input type="text" id="anlageCalculationRow_'+count2+'" name="masseneingabeInput'+i2+'[]" '+m+' '+rdOnly+' value="'+inputVal+'"/></td>';
                                if(i2>=53){
                                    var g2=1;
                                    // console.log('i2='+i2);
                                }
                                count2 ++;
                            }
                        }

                        $row += '</tr>';
                    }
                    $row +='</table></div>';
                    $('#timeIntervalWerteEnergiedatenIMwPrdkt').html( $row );

                }else if(zeitintervallAnl == 3){
                    //alert(3);
                    var from_3 = startDate.split(".");
                    var startMn_3 = from_3[0]; //first week selected value
                    var startYr_3 = from_3[1]; //first year input text value

                    var to_3 = endDate.split(".");
                    var endMn_3 =  to_3[0]; //second week selected value
                    var endYr_3 = to_3[1]; //second year input text value

                    var newStartDate = [startYr_3,startMn_3].join('-');
                    var newEndDate = [endYr_3,endMn_3].join('-');

                    var From_date = new Date(newStartDate);
                    var To_date = new Date(newEndDate);
                    var diff_date =  To_date - From_date;

                    var dateArr = getMonthsInToArray(From_date, To_date);
                    //console.log(dateArr);
                    var day = 1000 * 60 * 60 * 24;
                    var days = Math.ceil(diff_date/day);
                    var months = Math.ceil(days/31);
                    //var years = Math.ceil(months/12);

                    $("#tblMasseneingabeDataIMw").remove();
                    $row ='<div id="tblMasseneingabeDataIMw"><table id="tblMasseneingabeDataIMwTbl">';
                    for (var e = 0; e < b; e++){
                        if(e==0) {
                            $row += '<tr><td>Anlage</td>';
                            for (var r = 0; r <= months; r++){
                                $row += '<th data-id="'+a.query1[e].id+'" class="masseneingabeInputLBL">' + convertToMonthAndYearformate(dateArr[r]) + '</th>';
                            }
                            $row += '</tr>';
                        }
                    }
                    var monthOfArr=[];
                    for (var e = 0; e < b; e++){
                        $row += '<tr id="dataEnabledRow-'+e+'"  class="enabledRow" data-einheit="'+a.query1[e].einheitControlSys+'"><td>'+a.query1[e].bezeichnungAnl+'</td>';
                        for (var r = 0; r <= months; r++){
                            var n='';
                            if(a.query1[e].ending ==0){
                                if(a.query1[e].startDate > dateArr[r]){
                                    n='disabled';
                                }else if(a.query1[e].endDate < dateArr[r]){
                                    n='disabled';
                                }
                            }
                            if(a.query1[e].ending ==1){
                                if(a.query1[e].startDate > dateArr[r]){
                                    n='disabled';
                                }
                            }
                            var inputVal = findArrValueByDatePrdkt(dateArr[r],a.query1[e].id,a.query2);
                            $row += '<td data-id="'+a.query1[e].id+'" class="masseneingabeInputTD" date="' + dateArr[r] + '"><input type="text" name="masseneingabeInput'+r+'[]" '+n+' class="txtBoxSrch isShowPopup" id="anlageMainRow_'+r+'" value="'+inputVal+'" /></td>';
                            if(inputVal !=''){
                                monthOfArr.push(dateArr[r]);
                                anlageObj[a.query1[e].id]=monthOfArr;
                            }else{
                                anlageObj[a.query1[e].id]=monthOfArr;
                            }
                        }
                        $row += '</tr>';
                        $row += '<tr class="calcZeit3RowInputs hide disabledRow" id="dataDisabledRow-'+e+'"><td></td>';
                        for (var r = 0; r <= months; r++){
                            var n='';
                            if(a.query1[e].ending ==0){
                                if(a.query1[e].startDate > dateArr[r]){
                                    n='disabled';
                                }else if(a.query1[e].endDate < dateArr[r]){
                                    n='disabled';
                                }
                            }
                            if(a.query1[e].ending ==1){
                                if(a.query1[e].startDate > dateArr[r]){
                                    n='disabled';
                                }
                            }
                            var rdOnly = '';
                            if(n !== 'disabled'){
                                rdOnly = 'readonly';
                            }
                            var inputVal = findArrValueByDatePrdkt(dateArr[r],a.query1[e].id,a.query3);
                            $row += '<td data-id="'+a.query1[e].id+'" class="masseneingabeInputTD" date="' + dateArr[r] + '"><input type="text" name="masseneingabeInput'+r+'[]" '+n+' '+rdOnly+' id="anlageCalculationRow_'+r+'" value="'+inputVal+'"/></td>';
                        }
                        $row += '</tr>';
                    }
                    $row +='</table></div>';
                    $('#timeIntervalWerteEnergiedatenIMwPrdkt').html( $row );
                }else if(zeitintervallAnl == 4){
                    var years =  endDate - startDate;
                    const getYearsInToArray = (start, end) => Array(end - start + 1)
                        .fill(start)
                        .map((year, index) => year + index);
                    $("#tblMasseneingabeDataIMw").remove();
                    $row ='<div id="tblMasseneingabeDataIMw"><table id="tblMasseneingabeDataIMwTbl">';
                    for (var e = 0; e < b; e++){
                        if(e==0) {
                            $row += '<tr><td>Anlage</td>';
                            for (var r = 0; r <= years; r++){
                                var yr = eval(startDate) + eval(r);
                                $row += '<th data-id="'+a.query1[e].id+'" class="masseneingabeInputLBL">' + yr + '</th>';
                            }
                            $row += '</tr>';
                        }
                    }
                    var yearOfArr = [];
                    for (var e = 0; e < b; e++){
                        $row += '<tr id="dataEnabledRow-'+e+'" class="enabledRow" data-einheit="'+a.query1[e].einheitControlSys+'"><td>'+a.query1[e].bezeichnungAnl+'</td>';

                        for (var r = 0; r <= years; r++){
                            let yearsBw= getYearsInToArray(new Date(startDate).getFullYear(), new Date(endDate).getFullYear());
                            var t='';
                            var yr1 = eval(startDate) + eval(r);
                            if(a.query1[e].ending ==0){
                                if(a.query1[e].startDate > yearsBw[r]){
                                    t='disabled';
                                }else if(a.query1[e].endDate < yearsBw[r]){
                                    t='disabled';
                                }
                            }
                            if(a.query1[e].ending ==1){
                                if(a.query1[e].startDate > yearsBw[r]){
                                    t='disabled';
                                }
                            }
                            var inputVal = findArrValueByDatePrdkt(yearsBw[r],a.query1[e].id,a.query2);
                            $row += '<td data-id="'+a.query1[e].id+'" class="masseneingabeInputTD" date="' + yr1 + '"><input type="text" name="masseneingabeInput'+r+'[]" '+t+' class="txtBoxSrch isShowPopup" id="anlageMainRow_'+r+'" value="'+inputVal+'" /></td>';
                            if(inputVal !=''){
                                yearOfArr.push(String(yearsBw[r]));
                                anlageObj[a.query1[e].id]=yearOfArr;
                            }else{
                                anlageObj[a.query1[e].id]=yearOfArr;
                            }
                            //console.log(anlageObj);
                        }
                        $row += '</tr>';

                        $row += '<tr class="calcZeit4RowInputs hide disabledRow" id="dataDisabledRow-'+e+'"><td></td>';
                        for (var r = 0; r <= years; r++){
                            let yearsBw= getYearsInToArray(new Date(startDate).getFullYear(), new Date(endDate).getFullYear());
                            var t='';
                            var yr1 = eval(startDate) + eval(r);
                            if(a.query1[e].ending ==0){
                                if(a.query1[e].startDate > yearsBw[r]){
                                    t='disabled';
                                }else if(a.query1[e].endDate < yearsBw[r]){
                                    t='disabled';
                                }
                            }
                            if(a.query1[e].ending ==1){
                                if(a.query1[e].startDate > yearsBw[r]){
                                    t='disabled';
                                }
                            }
                            var rdOnly = '';
                            if(t !== 'disabled'){
                                rdOnly = 'readonly';
                            }
                            var inputVal = findArrValueByDatePrdkt(yearsBw[r],a.query1[e].id,a.query3);
                            $row += '<td data-id="'+a.query1[e].id+'" class="masseneingabeInputTD" date="' + yr1 + '"><input type="text" name="masseneingabeInput'+r+'[]" '+t+' '+rdOnly+'  id="anlageCalculationRow_'+r+'" value="'+inputVal+'"/></td>';
                        }
                        $row += '</tr>';
                    }
                    $row +='</table></div>';
                    $('#timeIntervalWerteEnergiedatenIMwPrdkt').html( $row );
                }
            }else{
                $("#tblMasseneingabeDataIMw").remove();
                $noRow ='<div id="tblMasseneingabeDataIMw"><table id="tblMasseneingabeDataIMwTbl" style="border:1px solid #f3f3f3;background:#ccc;"';
                $noRow += '<tr><td style="text-align:center;">No Record Found ! Please enter valid dates into input.</td>';  $noRow += '</tr>';
                $noRow +='</table></div>';
                $('#timeIntervalWerteEnergiedatenIMwPrdkt').html( $noRow );
            }
        }
    });
}
/*new-mm-end 31-03-2021,05-04-2021*/
/*new-mm-start 31-03-2021*/
function getDataMasseneingabeIMwSearchMesssetelle(zeitintervallAnl,startDate,endDate){
    //alert("3");
    $.ajax({
        type: "POST",
        async: !0,
        url: "php/getManuellInterneData.php",
        data: {
            id: "masseneingabeMesssetelleSearch",
            nameDB: $("#nameDB").val(),
            startDate: startDate,
            endDate:endDate,
            zeitintervallAnl:zeitintervallAnl
        },
        fail: function() {
            alert("failed!!")
        },
        success: function(a) {
            a = JSON.parse(a);
            //console.log(a);
            var b = a.query1.length;
            if(b>0){
                if(zeitintervallAnl == 1){
                    var from = startDate.split(".");
                    var to = endDate.split(".");

                    var newStartDate = [from[2],from[1],from[0]].join('-');
                    var newEndDate = [to[2], to[1], to[0]].join('-');

                    var From_date = new Date(newStartDate);
                    var To_date = new Date(newEndDate);
                    var diff_date =  To_date - From_date;

                    var dateArr = getDatesInToArray(From_date, To_date);
                    //console.log('dateArr='+dateArr);
                    //findArrValueByDate('2020-11-15',23,a.query2);

                    var day = 1000 * 60 * 60 * 24;
                    var days = Math.floor(diff_date/day);
                    $("#tblMasseneingabeDataIMw").remove();
                    $row ='<div id="tblMasseneingabeDataIMw"><table id="tblMasseneingabeDataIMwTbl">';
                    for (var e = 0; e < b; e++){
                        if(e==0) {
                            $row += '<tr><td>Anlage</td>';
                            for (var r = 0; r <= days; r++){

                                $row += '<th data-id="'+a.query1[e].mst_ID+'" class="masseneingabeInputLBL">'+convertToDateMonthAndYearformate(dateArr[r])+'</th>';


                            }
                            $row += '</tr>';
                        }
                    }

                    for (var e = 0; e < b; e++){
                        $row += '<tr id="dataEnabledRow-'+e+'" class="enabledRow" data-einheit="'+a.query1[e].einheitControlSys+'"><td>'+a.query1[e].nameMSt+'</td>';
                        //console.log(anlageObj[a.query1[e].mst_ID]);
                        //console.log(anlageObj);
                        var datesOfArr = [];
                        var p=0;var z;
                        for (var r = 0; r <= days; r++){
                            var n='';
                            //console.log(a[e].ending);
                            if(a.query1[e].ending ==0){
                                if(a.query1[e].startDate > dateArr[r]){
                                    n='disabled';
                                }else if(a.query1[e].endDate < dateArr[r]){
                                    n='disabled';
                                }
                            }
                            if(a.query1[e].ending ==1){
                                if(a.query1[e].startDate > dateArr[r]){
                                    n='disabled';
                                }
                            }

                            if(n !='disabled'){
                                if(p < 5){
                                    z="checkAlertRange";
                                }else{
                                    z='';
                                }
                                p++;
                            }
                            var inputVal = findArrValueByDate(dateArr[r],a.query1[e].mst_ID,a.query2);
                            $row += '<td data-id="'+a.query1[e].mst_ID+'"  date="'+dateArr[r]+'" class="masseneingabeInputTD"><input type="text" class="txtBoxSrch isShowPopup '+z+'" id="anlageMainRow_'+r+'"  name="masseneingabeInput'+r+'[]" '+n+' value="'+inputVal+'"/></td>';
                            if(inputVal !=''){
                                datesOfArr.push(dateArr[r]);
                                anlageObj[a.query1[e].mst_ID]=datesOfArr;
                            }else{
                                anlageObj[a.query1[e].mst_ID]=datesOfArr;
                            }
                        }

                        $row += '</tr>';
                        /*Second row for calculation*/
                        $row += '<tr class="calcZeit1RowInputs hide disabledRow" id="dataDisabledRow-'+e+'"><td></td>';
                        for (var r = 0; r <= days; r++){
                            var n='';
                            //console.log(a[e].ending);
                            if(a.query1[e].ending ==0){
                                if(a.query1[e].startDate > dateArr[r]){
                                    n='disabled';
                                }else if(a.query1[e].endDate < dateArr[r]){
                                    n='disabled';
                                }
                            }
                            if(a.query1[e].ending ==1){
                                if(a.query1[e].startDate > dateArr[r]){
                                    n='disabled';
                                }
                            }
                            // console.log('n='+n);
                            var rdOnly = '';
                            if(n !== 'disabled'){
                                rdOnly = 'readonly';
                            }
                            var inputVal = findArrValueByDate(dateArr[r],a.query1[e].mst_ID,a.query3);
                            $row += '<td data-id="'+a.query1[e].mst_ID+'"  date="'+dateArr[r]+'" class="masseneingabeInputTD"><input type="text" id="anlageCalculationRow_'+r+'" name="masseneingabeInput'+r+'[]" '+n+' '+rdOnly+' value="'+inputVal+'"/></td>';
                        }
                        $row += '</tr>';
                    }
                    $row +='</table></div>';
                    $('#timeIntervalWerteEnergiedatenIMwMesssetelle').html( $row );

                }else if(zeitintervallAnl == 2){
                    var from = startDate.split("-");
                    var g = from[0]; //first week selected value
                    var f = from[1]; //first year input text value

                    var to = endDate.split("-");
                    var s =  to[0]; //second week selected value
                    var t =  to[1]; //second year input text value

                    var years =  t - f;

                    $("#tblMasseneingabeDataIMw").remove();
                    $row ='<div id="tblMasseneingabeDataIMw"><table id="tblMasseneingabeDataIMwTbl">';
                    for (var e = 0; e < b; e++){
                        if(e==0) {
                            $row += '<tr><td>Anlage</td>';
                            for (var r = 0; r <= years; r++){
                                var yr = eval(f) + eval(r);
                                var weekNum =53;
                                if(t==yr){
                                    weekNum =s;
                                }
                                for (var i = g; i <= weekNum; i++){
                                    if(a.query1[e].startDate <= yr ){
                                        if(a.query1[e].startDate == yr && a.query1[e].startWeek <= i){
                                            m='';
                                        }
                                        if(a.query1[e].startDate < yr ){
                                            m='';
                                        }
                                    }
                                    if(yr >= a.query1[e].endDate){
                                        if(yr > a.query1[e].endDate){
                                            m='disabled';

                                        }
                                        if(yr == a.query1[e].endDate && a.query1[e].endWeek < i){
                                            m='disabled';
                                        }
                                    }
                                    $row += '<th data-id="'+a.query1[e].mst_ID+'" class="masseneingabeInputLBL">' + i + ' KW ' + yr + '</th>';
                                    if(i>=53){
                                        var g=1;
                                    }
                                }
                            }

                            $row += '</tr>';
                        }
                    }
                    var weekOfArr=[];
                    for (var e = 0; e < b; e++){
                        var from1 = startDate.split("-");
                        var g1 = g2=from1[0]; //first week selected value
                        var f1 = f2=from1[1]; //first year input text value

                        var to1 = endDate.split("-");
                        var s1 =s2=  to1[0]; //second week selected value
                        var t1 =t2=  to1[1]; //second year input text value

                        $row += '<tr id="dataEnabledRow-'+e+'" class="enabledRow"  data-einheit="'+a.query1[e].einheitControlSys+'"><td>'+a.query1[e].nameMSt+'</td>';
                        var count1 = 0;
                        for (var r1 = 0; r1 <= years; r1++){
                            var m='disabled';
                            var yr1 = eval(f1) + eval(r1);
                            var weekNum =53;
                            if(t1==yr1){
                                weekNum =s1;
                            }
                            for (var i1 = g1; i1 <= weekNum; i1++){
                                if(a.query1[e].startDate <= yr1 ){
                                    if(a.query1[e].startDate == yr1 && a.query1[e].startWeek <= i1){
                                        m='';
                                    }
                                    if(a.query1[e].startDate < yr1 ){
                                        m='';
                                    }
                                }
                                if(a.query1[e].ending ==0){
                                    if(yr1 >= a.query1[e].endDate){
                                        if(yr1 > a.query1[e].endDate){
                                            m='disabled';

                                        }
                                        if(yr1 == a.query1[e].endDate && a.query1[e].endWeek < i1){
                                            m='disabled';
                                        }
                                    }
                                }
                                if(a.query1[e].ending ==1){
                                    if(yr1 >= a.query1[e].endDate){
                                        /*if(yr1 > a.query1[e].endDate){
                                                    m='';

                                                 } */
                                        if(yr1 == a.query1[e].endDate && a.query1[e].endWeek < i1){
                                            m='';
                                        }
                                    }
                                }
                                var inputVal =  findArrValueByDateWeek(yr1,i1,a.query1[e].mst_ID,a.query2);
                                $row += '<td data-id="'+a.query1[e].mst_ID+'" class="masseneingabeInputTD" date="' + i1 + '-' + yr1 + '"><input type="text" id="anlageMainRow_'+count1+'" name="masseneingabeInput'+i1+'[]" '+m+' class="txtBoxSrch isShowPopup" value="'+inputVal+'"/></td>';
                                if(i1>=53){
                                    var g1=1;
                                    // console.log('i1='+i1);
                                }
                                if(inputVal !=''){
                                    weekOfArr.push(String(i1 + '-' + yr1));
                                    anlageObj[a.query1[e].mst_ID]=weekOfArr;
                                }/*else{
                                            anlageObj[a.query1[e].mst_ID]=weekOfArr;
                                        }*/
                                // console.log(anlageObj);
                                count1 ++;
                            }
                        }

                        $row += '</tr>';
                        $row += '<tr class="calcZeit2RowInputs hide disabledRow" id="dataDisabledRow-'+e+'"><td></td>';
                        var count2 = 0;
                        for (var r2 = 0; r2 <= years; r2++){
                            var m='disabled';
                            var yr2 = eval(f2) + eval(r2);
                            var weekNum =53;
                            if(t2==yr2){
                                weekNum =s2;
                            }
                            for (var i2 = g2; i2 <= weekNum; i2++){
                                if(a.query1[e].startDate <= yr2 ){
                                    if(a.query1[e].startDate == yr2 && a.query1[e].startWeek <= i2){
                                        m='';
                                    }
                                    if(a.query1[e].startDate < yr2 ){
                                        m='';
                                    }
                                }
                                if(a.query1[e].ending ==0){
                                    if(yr2 >= a.query1[e].endDate){
                                        if(yr2 > a.query1[e].endDate){
                                            m='disabled';

                                        }
                                        if(yr2 == a.query1[e].endDate && a.query1[e].endWeek < i2){
                                            m='disabled';
                                        }
                                    }
                                }
                                if(a.query1[e].ending ==1){
                                    if(yr2 >= a.query1[e].endDate){
                                        /*if(yr2 > a.query1[e].endDate){
                                                    m='';

                                                 } */
                                        if(yr2 == a.query1[e].endDate && a.query1[e].endWeek < i2){
                                            m='';
                                        }
                                    }
                                }
                                var rdOnly = '';
                                if(m !== 'disabled'){
                                    rdOnly = 'readonly';
                                }
                                var inputVal =  findArrValueByDateWeek(yr2,i2,a.query1[e].mst_ID,a.query3);
                                $row += '<td data-id="'+a.query1[e].mst_ID+'" class="masseneingabeInputTD"  date="' + i2 + '-' + yr2 + '"><input type="text" id="anlageCalculationRow_'+count2+'" name="masseneingabeInput'+i2+'[]" '+m+' '+rdOnly+' value="'+inputVal+'"/></td>';
                                if(i2>=53){
                                    var g2=1;
                                    // console.log('i2='+i2);
                                }
                                count2 ++;
                            }
                        }

                        $row += '</tr>';
                    }
                    $row +='</table></div>';
                    $('#timeIntervalWerteEnergiedatenIMwMesssetelle').html( $row );

                }else if(zeitintervallAnl == 3){
                    //alert(3);
                    var from_3 = startDate.split(".");
                    var startMn_3 = from_3[0]; //first week selected value
                    var startYr_3 = from_3[1]; //first year input text value

                    var to_3 = endDate.split(".");
                    var endMn_3 =  to_3[0]; //second week selected value
                    var endYr_3 = to_3[1]; //second year input text value

                    var newStartDate = [startYr_3,startMn_3].join('-');
                    var newEndDate = [endYr_3,endMn_3].join('-');

                    var From_date = new Date(newStartDate);
                    var To_date = new Date(newEndDate);
                    var diff_date =  To_date - From_date;

                    var dateArr = getMonthsInToArray(From_date, To_date);
                    //console.log(dateArr);
                    var day = 1000 * 60 * 60 * 24;
                    var days = Math.ceil(diff_date/day);
                    var months = Math.ceil(days/31);
                    //var years = Math.ceil(months/12);

                    $("#tblMasseneingabeDataIMw").remove();
                    $row ='<div id="tblMasseneingabeDataIMw"><table id="tblMasseneingabeDataIMwTbl">';
                    for (var e = 0; e < b; e++){
                        if(e==0) {
                            $row += '<tr><td>Anlage</td>';
                            for (var r = 0; r <= months; r++){
                                $row += '<th data-id="'+a.query1[e].mst_ID+'" class="masseneingabeInputLBL">' + convertToMonthAndYearformate(dateArr[r]) + '</th>';
                            }
                            $row += '</tr>';
                        }
                    }
                    var monthOfArr=[];
                    for (var e = 0; e < b; e++){
                        $row += '<tr id="dataEnabledRow-'+e+'"  class="enabledRow" data-einheit="'+a.query1[e].einheitControlSys+'"><td>'+a.query1[e].nameMSt+'</td>';
                        for (var r = 0; r <= months; r++){
                            var n='';
                            if(a.query1[e].ending ==0){
                                if(a.query1[e].startDate > dateArr[r]){
                                    n='disabled';
                                }else if(a.query1[e].endDate < dateArr[r]){
                                    n='disabled';
                                }
                            }
                            if(a.query1[e].ending ==1){
                                if(a.query1[e].startDate > dateArr[r]){
                                    n='disabled';
                                }
                            }
                            var inputVal = findArrValueByDate(dateArr[r],a.query1[e].mst_ID,a.query2);
                            $row += '<td data-id="'+a.query1[e].mst_ID+'" class="masseneingabeInputTD" date="' + dateArr[r] + '"><input type="text" name="masseneingabeInput'+r+'[]" '+n+' class="txtBoxSrch isShowPopup" id="anlageMainRow_'+r+'" value="'+inputVal+'" /></td>';
                            if(inputVal !=''){
                                monthOfArr.push(dateArr[r]);
                                anlageObj[a.query1[e].mst_ID]=monthOfArr;
                            }else{
                                anlageObj[a.query1[e].mst_ID]=monthOfArr;
                            }
                        }
                        $row += '</tr>';
                        $row += '<tr class="calcZeit3RowInputs hide disabledRow" id="dataDisabledRow-'+e+'"><td></td>';
                        for (var r = 0; r <= months; r++){
                            var n='';
                            if(a.query1[e].ending ==0){
                                if(a.query1[e].startDate > dateArr[r]){
                                    n='disabled';
                                }else if(a.query1[e].endDate < dateArr[r]){
                                    n='disabled';
                                }
                            }
                            if(a.query1[e].ending ==1){
                                if(a.query1[e].startDate > dateArr[r]){
                                    n='disabled';
                                }
                            }
                            var rdOnly = '';
                            if(n !== 'disabled'){
                                rdOnly = 'readonly';
                            }
                            var inputVal = findArrValueByDate(dateArr[r],a.query1[e].mst_ID,a.query3);
                            $row += '<td data-id="'+a.query1[e].mst_ID+'" class="masseneingabeInputTD" date="' + dateArr[r] + '"><input type="text" name="masseneingabeInput'+r+'[]" '+n+' '+rdOnly+' id="anlageCalculationRow_'+r+'" value="'+inputVal+'"/></td>';
                        }
                        $row += '</tr>';
                    }
                    $row +='</table></div>';
                    $('#timeIntervalWerteEnergiedatenIMwMesssetelle').html( $row );
                }else if(zeitintervallAnl == 4){
                    var years =  endDate - startDate;
                    const getYearsInToArray = (start, end) => Array(end - start + 1)
                        .fill(start)
                        .map((year, index) => year + index);
                    $("#tblMasseneingabeDataIMw").remove();
                    $row ='<div id="tblMasseneingabeDataIMw"><table id="tblMasseneingabeDataIMwTbl">';
                    for (var e = 0; e < b; e++){
                        if(e==0) {
                            $row += '<tr><td>Anlage</td>';
                            for (var r = 0; r <= years; r++){
                                var yr = eval(startDate) + eval(r);
                                $row += '<th data-id="'+a.query1[e].mst_ID+'" class="masseneingabeInputLBL">' + yr + '</th>';
                            }
                            $row += '</tr>';
                        }
                    }
                    var yearOfArr = [];
                    for (var e = 0; e < b; e++){
                        $row += '<tr id="dataEnabledRow-'+e+'" class="enabledRow" data-einheit="'+a.query1[e].einheitControlSys+'"><td>'+a.query1[e].nameMSt+'</td>';

                        for (var r = 0; r <= years; r++){
                            let yearsBw= getYearsInToArray(new Date(startDate).getFullYear(), new Date(endDate).getFullYear());
                            var t='';
                            var yr1 = eval(startDate) + eval(r);
                            if(a.query1[e].ending ==0){
                                if(a.query1[e].startDate > yearsBw[r]){
                                    t='disabled';
                                }else if(a.query1[e].endDate < yearsBw[r]){
                                    t='disabled';
                                }
                            }
                            if(a.query1[e].ending ==1){
                                if(a.query1[e].startDate > yearsBw[r]){
                                    t='disabled';
                                }
                            }
                            var inputVal = findArrValueByDate(yearsBw[r],a.query1[e].mst_ID,a.query2);
                            $row += '<td data-id="'+a.query1[e].mst_ID+'" class="masseneingabeInputTD" date="' + yr1 + '"><input type="text" name="masseneingabeInput'+r+'[]" '+t+' class="txtBoxSrch isShowPopup" id="anlageMainRow_'+r+'" value="'+inputVal+'" /></td>';
                            if(inputVal !=''){
                                yearOfArr.push(String(yearsBw[r]));
                                anlageObj[a.query1[e].mst_ID]=yearOfArr;
                            }else{
                                anlageObj[a.query1[e].mst_ID]=yearOfArr;
                            }
                            //console.log(anlageObj);
                        }
                        $row += '</tr>';

                        $row += '<tr class="calcZeit4RowInputs hide disabledRow" id="dataDisabledRow-'+e+'"><td></td>';
                        for (var r = 0; r <= years; r++){
                            let yearsBw= getYearsInToArray(new Date(startDate).getFullYear(), new Date(endDate).getFullYear());
                            var t='';
                            var yr1 = eval(startDate) + eval(r);
                            if(a.query1[e].ending ==0){
                                if(a.query1[e].startDate > yearsBw[r]){
                                    t='disabled';
                                }else if(a.query1[e].endDate < yearsBw[r]){
                                    t='disabled';
                                }
                            }
                            if(a.query1[e].ending ==1){
                                if(a.query1[e].startDate > yearsBw[r]){
                                    t='disabled';
                                }
                            }
                            var rdOnly = '';
                            if(t !== 'disabled'){
                                rdOnly = 'readonly';
                            }
                            var inputVal = findArrValueByDate(yearsBw[r],a.query1[e].mst_ID,a.query3);
                            $row += '<td data-id="'+a.query1[e].mst_ID+'" class="masseneingabeInputTD" date="' + yr1 + '"><input type="text" name="masseneingabeInput'+r+'[]" '+t+' '+rdOnly+'  id="anlageCalculationRow_'+r+'" value="'+inputVal+'"/></td>';
                        }
                        $row += '</tr>';
                    }
                    $row +='</table></div>';
                    $('#timeIntervalWerteEnergiedatenIMwMesssetelle').html( $row );
                }
            }else{
                $("#tblMasseneingabeDataIMw").remove();
                $noRow ='<div id="tblMasseneingabeDataIMw"><table id="tblMasseneingabeDataIMwTbl" style="border:1px solid #f3f3f3;background:#ccc;"';
                $noRow += '<tr><td style="text-align:center;">No Record Found ! Please enter valid dates into input.</td>';  $noRow += '</tr>';
                $noRow +='</table></div>';
                $('#timeIntervalWerteEnergiedatenIMwMesssetelle').html( $noRow );
            }
        }
    });
}
/*new-mm-end 31-03-2021*/

function getDatesInToArray(start, end) {
    var arr = new Array();
    var dt = new Date(start);
    while (dt <= end) {
        var date = new Date(dt);
        var year=date.getFullYear();
        var month=("0" + (date.getMonth() + 1)).slice(-2);
        var day=("0" + date.getDate()).slice(-2);
        var formattedDates=year+"-"+month+"-"+day;
        //console.log(formatted);
        arr.push(formattedDates);
        dt.setDate(dt.getDate() + 1);
    }
    return arr;
}

function getMonthsInToArray(start, end) {
    var arr = new Array();
    var dt = new Date(start);
    while (dt <= end) {
        //arr.push(new Date(dt));
        var date = new Date(dt);
        var year=date.getFullYear();
        var month=("0" + (date.getMonth() + 1)).slice(-2);
        // var day=("0" + date.getDate()).slice(-2);
        var formattedDates=year+"-"+month;
        //console.log(formatted);
        arr.push(formattedDates);
        dt = new Date(dt.getFullYear(), dt.getMonth() + 1, 1);
    }
    return arr;
}

function convertToDateMonthAndYearformate(str) {
    var date = new Date(str),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
    return [day,mnth,date.getFullYear() ].join(".");
}

function convertToMonthAndYearformate(str) {
    var date = new Date(str),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
    return [mnth,date.getFullYear() ].join(".");
}

function convertDateFormateForDataTbl(type,str){
    if(str !=''){
        if(type == 1 ){
            var date = new Date(str);
            mnth = ("0" + (date.getMonth() + 1)).slice(-2);
            day = ("0" + date.getDate()).slice(-2);
            var dt= [day,mnth,date.getFullYear() ].join(".");
        }else if(type == 3){
            var date = new Date(str);
            mnth = ("0" + (date.getMonth() + 1)).slice(-2);
            day = ("0" + date.getDate()).slice(-2);
            var dt= [mnth,date.getFullYear() ].join(".");
        }else{
            var dt = str;
        }
    }else{
        var dt = '';
    }
    return dt;
}

function saveToDBMasseneingabeEingaben(key){

    var mstIDEnabled,dateEnabled,myObjEnabled,textValEnabled;
    var postDataEnabled =new Array();
    var enabledRow = [];
    $('#tblMasseneingabeDataIMwTbl tbody tr.enabledRow').each(function (index) {
        enabledRow[index] = {};
        $('td', this).each(function() {
            textValEnabled = $(this).find('input').val();
            mstIDEnabled = $(this).attr("data-id");
            dateEnabled = $(this).attr("date");
            enabledRow.push({
                'textValEnabled': textValEnabled, 'mstIDEnabled': mstIDEnabled, 'dateEnabled': dateEnabled
            });
        });
    });
    var mstIDDisabled,dateDisabled,myObjDisabled,textValDisabled;
    var postDataDisabled =new Array();
    var disabledRow = [];
    $('#tblMasseneingabeDataIMwTbl tbody tr.disabledRow').each(function (index) {
        disabledRow[index] = {};
        $('td', this).each(function() {
            textValDisabled = $(this).find('input').val();
            mstIDDisabled = $(this).attr("data-id");
            dateDisabled = $(this).attr("date");
            disabledRow.push({
                'textValDisabled': textValDisabled, 'mstIDDisabled': mstIDDisabled, 'dateDisabled': dateDisabled
            });
        });
    });

    var postDataEnabled = JSON.stringify(enabledRow);
    var postDataDisabled = JSON.stringify(disabledRow);
    $("#masseneingabeSpeichernSrch").prop('disabled',true);
    $.ajax({
        type: "POST",
        url: "php/saveMasseneingabeEingaben.php",
        async: false,
        dataType: 'json',
        data:{
            modus: "save",
            nameDB: $("#nameDB").val(),
            postDataEnabled: postDataEnabled,
            postDataDisabled:postDataDisabled,
            key:key
        },
        fail: function() {
            alert("failed!!")
        },
        success: function(a) {
            /*new-mm-start 22-03-2021*/
            $("#masseneingabeSpeichernSrch").prop('disabled',false);
            if(a.length >0){
                $(".save-msg-box").append(a);
                $(".save-msg-box").fadeOut(3000, function() { $(this).text(""); });
            }
            $("#masseneingabeSrchImg").hide();
            /*new-mm-end 22-03-2021*/
        }
    });
}
/*new-mm-start 05-04-2021*/
function saveToDBMasseneingabePrdkt(key){

    var mstIDEnabled,dateEnabled,myObjEnabled,textValEnabled;
    var postDataEnabled =new Array();
    var enabledRow = [];
    $('#tblMasseneingabeDataIMwTbl tbody tr.enabledRow').each(function (index) {
        enabledRow[index] = {};
        $('td', this).each(function() {
            textValEnabled = $(this).find('input').val();
            mstIDEnabled = $(this).attr("data-id");
            dateEnabled = $(this).attr("date");
            enabledRow.push({
                'textValEnabled': textValEnabled, 'mstIDEnabled': mstIDEnabled, 'dateEnabled': dateEnabled
            });
        });
    });
    var mstIDDisabled,dateDisabled,myObjDisabled,textValDisabled;
    var postDataDisabled =new Array();
    var disabledRow = [];
    $('#tblMasseneingabeDataIMwTbl tbody tr.disabledRow').each(function (index) {
        disabledRow[index] = {};
        $('td', this).each(function() {
            textValDisabled = $(this).find('input').val();
            mstIDDisabled = $(this).attr("data-id");
            dateDisabled = $(this).attr("date");
            disabledRow.push({
                'textValDisabled': textValDisabled, 'mstIDDisabled': mstIDDisabled, 'dateDisabled': dateDisabled
            });
        });
    });

    var postDataEnabled = JSON.stringify(enabledRow);
    var postDataDisabled = JSON.stringify(disabledRow);
    $("#masseneingabeSpeichernSrch").prop('disabled',true);
    $.ajax({
        type: "POST",
        url: "php/saveMasseneingabeEingaben.php",
        async: false,
        dataType: 'json',
        data:{
            modus: "savePrdkt",
            nameDB: $("#nameDB").val(),
            postDataEnabled: postDataEnabled,
            postDataDisabled:postDataDisabled,
            key:key
        },
        fail: function() {
            alert("failed!!")
        },
        success: function(a) {
            /*new-mm-start 22-03-2021*/
            $("#masseneingabeSpeichernSrch").prop('disabled',false);
            if(a.length >0){
                $(".save-msg-box").append(a);
                $(".save-msg-box").fadeOut(3000, function() { $(this).text(""); });
            }
            $("#masseneingabeSrchImg").hide();
            /*new-mm-end 22-03-2021*/
        }
    });
}
/*new-mm-end 05-04-2021*/

function resetSearchFormMasseneingabe(sId){
    $("." + sId + " .zeitintervallAnl_1").val("");
    $("." + sId + " .zeitintervallAnl_2").val("");
    $("." + sId + " .zeitintervallAnl_2 select").val("");
    $("." + sId + " .zeitintervallAnl_3").val("");
    $("." + sId + " .zeitintervallAnl_4").val("");
}

/*new-mm-start 31-03-2021*/
function resetSearchFormMasseneingabePrdkt(sId){
    $("." + sId + " .zeitintervallAnl_1").val("");
    $("." + sId + " .zeitintervallAnl_2").val("");
    $("." + sId + " .zeitintervallAnl_2 select").val("");
    $("." + sId + " .zeitintervallAnl_3").val("");
    $("." + sId + " .zeitintervallAnl_4").val("");
}
/*new-mm-end 31-03-2021*/

/*new-mm-start 31-03-2021*/
function resetSearchFormMasseneingabeMesssetelle(sId){
    $("." + sId + " .zeitintervallAnl_1").val("");
    $("." + sId + " .zeitintervallAnl_2").val("");
    $("." + sId + " .zeitintervallAnl_2 select").val("");
    $("." + sId + " .zeitintervallAnl_3").val("");
    $("." + sId + " .zeitintervallAnl_4").val("");
}
/*new-mm-end 31-03-2021*/
const capitalizeLetter = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
}

/*validate intern betriedaten form when we save into database*/
function validateIntBdeFrm(noEnding,Zeitintervall,sId,id){
    var anlIMw =$("#anlIMw").val();
    var zeitintervallAnl =$("#zeitintervallAnl").val();
    var notizBdeIMw =$("#notizBdeIMw").val();
    var einheitAnl =$("#einheitAnl").val();

    if(anlIMw =='' || zeitintervallAnl ==0 || notizBdeIMw=='' || einheitAnl==''){
        alert("Bitte füllen Sie die Felder aus");
        return false;
    }else{
        if(Zeitintervall == 1){
            if(noEnding==true){
                if($("." + sId + " #tageMassEingDataAnlStart" + id + "").val()==''){
                    alert('Please enter start tage');
                    return false;
                }else{
                    return true;
                }
            }else if(noEnding==false) {
                if($("." + sId + " #tageMassEingDataAnlStart" + id + "").val()=='' || $("." + sId + " #tageMassEingDataAnlEnde" + id + "").val()==''){
                    alert('start tage or end tage should not be empty');
                    return false;
                }else{
                    return true;
                }
            }
        }else if(Zeitintervall == 2){
            if(noEnding==true){
                if($("." + sId + " #wochenWMassEingDataAnlStart" + id + "").val()=='' || $("." + sId + " #wochenYMassEingDataAnlStart" + id + "").val()==''  ){
                    alert('Please enter start week');
                    return false;
                }else{
                    return true;
                }
            }else if(noEnding==false) {
                if($("." + sId + " #wochenWMassEingDataAnlStart" + id + "").val()=='' || $("." + sId + " #wochenYMassEingDataAnlStart" + id + "").val()=='' || $("." + sId + " #wochenWMassEingDataAnlEnde" + id + "").val()=='' || $("." + sId + " #wochenYMassEingDataAnlEnde" + id + "").val()==''){
                    alert('start week or end week should not be empty');
                    return false;
                }else{
                    return true;
                }
            }
        }else if(Zeitintervall == 3){
            if(noEnding==true){
                if($("." + sId + " #monateMassEingDataAnlStart" + id + "").val()==''){
                    alert('Please enter start Monate');
                    return false;
                }else{
                    return true;
                }
            }else if(noEnding==false) {
                if($("." + sId + " #monateMassEingDataAnlStart" + id + "").val()=='' || $("." + sId + " #monateMassEingDataAnlEnde" + id + "").val()==''){
                    alert('start Monate or end Monate should not be empty');
                    return false;
                }else{
                    return true;
                }
            }
        }else if(Zeitintervall == 4){
            if(noEnding==true){
                if($("." + sId + " #jahrMassEingDataAnlStart" + id + "").val()==''){
                    alert('Please enter start Jahr');
                    return false;
                }else{
                    return true;
                }
            }else if(noEnding==false) {
                if($("." + sId + " #jahrMassEingDataAnlStart" + id + "").val()=='' || $("." + sId + " #jahrMassEingDataAnlEnde" + id + "").val()==''){
                    alert('start Jahr or end Jahr should not be empty');
                    return false;
                }else{
                    return true;
                }
            }
        }
    }
}

/* Validate Before Save
*  Interne Betriebsdaten Module
*  Podukte and Messsetelle Speichern
*  03-03-2021
*/
/*new-mm-start 23-03-2021*/
function validateIntBdePrdktFrm(noEnding,Zeitintervall,sId,id){
    var mstIMw =$("#mstIMw").val();
    var zeitintervallAnlPrdkt =$("#zeitintervallAnlPrdkt").val();
    var notizBdeIMwAnlPrdkt =$("#notizBdeIMwAnlPrdkt").val();
    var einheitAnlPrdkt =$("#einheitAnlPrdkt").val();

    if(mstIMw =='' || zeitintervallAnlPrdkt == 0 || notizBdeIMwAnlPrdkt=='' || einheitAnlPrdkt==''){
        alert("Bitte füllen Sie die Felder aus");
        return false;
    }else{
        if(Zeitintervall == 1){
            if(noEnding==true){
                if($("." + sId + " #tageMassEingDataAnlPrdktStart" + id + "").val()==''){
                    alert('Please enter start tage');
                    return false;
                }else{
                    return true;
                }
            }else if(noEnding==false) {
                if($("." + sId + " #tageMassEingDataAnlStart" + id + "").val()=='' || $("." + sId + " #tageMassEingDataAnlPrdktEnde" + id + "").val()==''){
                    alert('start tage or end tage should not be empty');
                    return false;
                }else{
                    return true;
                }
            }
        }else if(Zeitintervall == 2){
            if(noEnding==true){
                if($("." + sId + " #wochenWMassEingDataAnlPrdktStart" + id + "").val()=='' || $("." + sId + " #wochenYMassEingDataAnlPrdktStart" + id + "").val()==''  ){
                    alert('Please enter start week');
                    return false;
                }else{
                    return true;
                }
            }else if(noEnding==false) {
                if($("." + sId + " #wochenWMassEingDataAnlPrdktStart" + id + "").val()=='' || $("." + sId + " #wochenYMassEingDataAnlPrdktStart" + id + "").val()=='' || $("." + sId + " #wochenWMassEingDataAnlPrdktEnde" + id + "").val()=='' || $("." + sId + " #wochenYMassEingDataAnlPrdktEnde" + id + "").val()==''){
                    alert('start week or end week should not be empty');
                    return false;
                }else{
                    return true;
                }
            }
        }else if(Zeitintervall == 3){
            if(noEnding==true){
                if($("." + sId + " #monateMassEingDataAnlPrdktStart" + id + "").val()==''){
                    alert('Please enter start Monate');
                    return false;
                }else{
                    return true;
                }
            }else if(noEnding==false) {
                if($("." + sId + " #monateMassEingDataAnlPrdktStart" + id + "").val()=='' || $("." + sId + " #monateMassEingDataAnlPrdktEnde" + id + "").val()==''){
                    alert('start Monate or end Monate should not be empty');
                    return false;
                }else{
                    return true;
                }
            }
        }else if(Zeitintervall == 4){
            if(noEnding==true){
                if($("." + sId + " #jahrMassEingDataAnlPrdktStart" + id + "").val()==''){
                    alert('Please enter start Jahr');
                    return false;
                }else{
                    return true;
                }
            }else if(noEnding==false) {
                if($("." + sId + " #jahrMassEingDataAnlPrdktStart" + id + "").val()=='' || $("." + sId + " #jahrMassEingDataAnlPrdktEnde" + id + "").val()==''){
                    alert('start Jahr or end Jahr should not be empty');
                    return false;
                }else{
                    return true;
                }
            }
        }
    }
}
/*new-mm-end 23-03-2021*/
/*Concern Delete popup for the search functionality 05-10-2020*/
/*new-mm-start 01-04-2021*/
function intBdeSearchConcernOrDeletePopUp(prevID,nextID,prevBottomID,rowMstID) {
    $("#intBdeConcernOrDeletePopUp").remove();
    $("<div id='intBdeConcernOrDeletePopUp' class='intBdeConcernOrDeletePopUp' style='display:none;'> <p>Warnung: Sie haben einen Wert besetzt, <br>der nicht mit der bereits gesetzten Datenlagen<br>in der Abfolge übereinstimmen kann.</p><div id='intBdeConcernOrDeletePopUpDiv'><button id='intBdeConcern' >Concern</button><button id='intBdeDelete'>Delete</button></div></div>").dialog({
        height: 250,
        width: 450,
        resize: "auto",
        show: {
            effect: "fade",
            duration: 500,
            closeOnEscape: false,
            dialogClass: "no-close",
        },
        hide: {
            effect: "fade",
            duration: 500
        },
        open: function(event, ui) {
            $("#intBdeConcern").on("click", function() {

                var inputCurrId = $("#inputCurrId").val();
                var inputCurPrevId = $("#inputCurPrevId").val();
                var inputBottomCurrId = $("#inputBottomCurrId").val();
                var currInputID = $("#currInputID").val();
                var rowMainIDEn = $("#rowMainIDEn").val();
                var rowMainIDDs = $("#rowMainIDDs").val();
                $("" + prevID + "").removeClass("isShowPopup");
                $("#inputValBottomCurr").val("");    //new
                $("#inputCurrId").val("");           //new

                $("" + inputCurrId + "").removeClass("isShowPopup");
                $("#intBdeConcernOrDeletePopUp").remove();
                if(currInputID==0){
                    $("#inputPrevValDB").val("");
                }
                var inputDeleteBotmId = $("#inputDeleteBotmId").val();
                var zeitIntervallAnl = $(".infosMasseneingabeInside button.active").attr('data-id');
                var date =$(""+inputDeleteBotmId+"").closest('td').attr("date");

                saveToDBMasseneingabeEingabenSingleRow(zeitIntervallAnl,rowMainIDEn,rowMainIDDs);
                if(anlageObj[rowMstID]){
                    var inputCountLength = anlageObj[rowMstID].length;
                    if(inputCountLength>4){
                        checkAlertRangeMinMaxServerSide(zeitIntervallAnl,rowMstID,date,rowMainIDDs);
                    }
                }
                $($("#inputFocusedId").val()).focus();
                $("#masseneingabeSpeichernSrch").prop("disabled", false);
                /*new-mm-start 01-04-2021*/
                $("#masseneingabeSpeichernSrchPrdkt").prop("disabled", false);
                $("#masseneingabeSpeichernSrchMesssetelle").prop("disabled", false);
                /*new-mm-end 01-04-2021*/
                //$($("#inputFocusedId").val()).change();
            });

            $("#intBdeDelete").on("click", function() {
                var inputCurrId = $("#inputCurrId").val();
                //var rowMainIDEn = $("#rowMainIDEn").val();   //new
                var inputDeleteBotmId = $("#inputDeleteBotmId").val();
                $("" + inputCurrId + "").val("");
                $("#inputValBottomCurr").val("");  //new
                $("#inputCurrId").val("");         //new
                $(inputDeleteBotmId).val("");
                $("" + inputCurrId + "").focus();
                $("" + prevID + "").removeClass("isShowPopup");
                $("" + inputCurrId + "").removeClass("isShowPopup");
                $("#intBdeConcernOrDeletePopUp").remove();
                var currInputID = $("#currInputID").val();
                var rowMainIDDs = $("#rowMainIDDs").val();
                $("#masseneingabeSpeichernSrch").prop("disabled", false);
                /*new-mm-start 01-04-2021*/
                $("#masseneingabeSpeichernSrchPrdkt").prop("disabled", false);
                $("#masseneingabeSpeichernSrchMesssetelle").prop("disabled", false);
                /*new-mm-end 01-04-2021*/
            });
        }
    });
    $("#intBdeConcernOrDeletePopUp").parent('div').find(".ui-dialog-titlebar-close").hide();
}
/*new-mm-end 01-04-2021*/



/*new-mm-start 05-04-2021*/
function intBdeSearchConcernOrDeletePopUpPrdkt(prevID,nextID,prevBottomID,rowMstID) {
    $("#intBdeConcernOrDeletePopUp").remove();
    $("<div id='intBdeConcernOrDeletePopUp' class='intBdeConcernOrDeletePopUp' style='display:none;'> <p>Warnung: Sie haben einen Wert besetzt, <br>der nicht mit der bereits gesetzten Datenlagen<br>in der Abfolge übereinstimmen kann.</p><div id='intBdeConcernOrDeletePopUpDiv'><button id='intBdeConcern' >Concern</button><button id='intBdeDelete'>Delete</button></div></div>").dialog({
        height: 250,
        width: 450,
        resize: "auto",
        show: {
            effect: "fade",
            duration: 500,
            closeOnEscape: false,
            dialogClass: "no-close",
        },
        hide: {
            effect: "fade",
            duration: 500
        },
        open: function(event, ui) {
            $("#intBdeConcern").on("click", function() {

                var inputCurrId = $("#inputCurrId").val();
                var inputCurPrevId = $("#inputCurPrevId").val();
                var inputBottomCurrId = $("#inputBottomCurrId").val();
                var currInputID = $("#currInputID").val();
                var rowMainIDEn = $("#rowMainIDEn").val();
                var rowMainIDDs = $("#rowMainIDDs").val();
                $("" + prevID + "").removeClass("isShowPopup");
                $("#inputValBottomCurr").val("");    //new
                $("#inputCurrId").val("");           //new

                $("" + inputCurrId + "").removeClass("isShowPopup");
                $("#intBdeConcernOrDeletePopUp").remove();
                if(currInputID==0){
                    $("#inputPrevValDB").val("");
                }
                var inputDeleteBotmId = $("#inputDeleteBotmId").val();
                var zeitIntervallAnl = $(".infosMasseneingabeInside button.active").attr('data-id');
                var date =$(""+inputDeleteBotmId+"").closest('td').attr("date");

                saveToDBMasseneingabeEingabenSingleRowPrdkt(zeitIntervallAnl,rowMainIDEn,rowMainIDDs);
                if(anlageObj[rowMstID]){
                    var inputCountLength = anlageObj[rowMstID].length;
                    if(inputCountLength>4){
                        checkAlertRangeMinMaxServerSidePrdkt(zeitIntervallAnl,rowMstID,date,rowMainIDDs);
                    }
                }
                $($("#inputFocusedId").val()).focus();
                $("#masseneingabeSpeichernSrch").prop("disabled", false);
                /*new-mm-start 01-04-2021*/
                $("#masseneingabeSpeichernSrchPrdkt").prop("disabled", false);
                $("#masseneingabeSpeichernSrchMesssetelle").prop("disabled", false);
                /*new-mm-end 01-04-2021*/
                //$($("#inputFocusedId").val()).change();
            });

            $("#intBdeDelete").on("click", function() {
                var inputCurrId = $("#inputCurrId").val();
                //var rowMainIDEn = $("#rowMainIDEn").val();   //new
                var inputDeleteBotmId = $("#inputDeleteBotmId").val();
                $("" + inputCurrId + "").val("");
                $("#inputValBottomCurr").val("");  //new
                $("#inputCurrId").val("");         //new
                $(inputDeleteBotmId).val("");
                $("" + inputCurrId + "").focus();
                $("" + prevID + "").removeClass("isShowPopup");
                $("" + inputCurrId + "").removeClass("isShowPopup");
                $("#intBdeConcernOrDeletePopUp").remove();
                var currInputID = $("#currInputID").val();
                var rowMainIDDs = $("#rowMainIDDs").val();
                $("#masseneingabeSpeichernSrch").prop("disabled", false);
                /*new-mm-start 01-04-2021*/
                $("#masseneingabeSpeichernSrchPrdkt").prop("disabled", false);
                $("#masseneingabeSpeichernSrchMesssetelle").prop("disabled", false);
                /*new-mm-end 01-04-2021*/
            });
        }
    });
    $("#intBdeConcernOrDeletePopUp").parent('div').find(".ui-dialog-titlebar-close").hide();
}
/*new-mm-end 05-04-2021*/

function checkPositiveValue(val){
    if (val>0) {
        return true;
    } else {
        return false;
    }
}
function convertToPositive(a) {
    if (a < 0) {
        a = a * -1;
    }
    return a;
}

function findArrValueByDate(date,mst_ID,arrName){
    let inpVal='';
    const index = arrName.findIndex((element, index) => {
        if (element.on_date == date && element.mst_ID == mst_ID) {
            inpVal += element.val;
        }
    });
    return inpVal;
}
function findArrValueByDateWeek(date,week,mst_ID,arrName){
    let inpVal='';
    const index = arrName.findIndex((element, index) => {
        if (element.on_date == date && element.mst_ID == mst_ID && element.on_week == week) {
            inpVal += element.val;
        }
    });
    return inpVal;
}

/*new-mm-start 05-04-2021*/
function findArrValueByDatePrdkt(date,ID,arrName){
    let inpVal='';
    const index = arrName.findIndex((element, index) => {
        if (element.on_date == date && element.prd_anl_ID == ID) {
            inpVal += element.val;
        }
    });
    return inpVal;
}
/*new-mm-end 05-04-2021*/

/*new-mm-start 05-04-2021*/
function findArrValueByDateWeekPrdkt(date,week,ID,arrName){
    let inpVal='';
    const index = arrName.findIndex((element, index) => {
        if (element.on_date == date && element.prd_anl_ID == ID && element.on_week == week) {
            inpVal += element.val;
        }
    });
    return inpVal;
}
/*new-mm-end 05-04-2021*/

function resetInputsSearchMasseneingabe(){
    $("#inputCurPrevId").val("");
    $("#inputCurrId").val("");
    $("#inputBottomCurrId").val("");
    $("#inputBottomPrevId").val("");
    $("#inputValBottomPrev").val("");
    $("#inputValBottomCurr").val("");
    $("#inputFocusedId").val("");
    $("#inputNextId").val("");
    //$("#inputBotmMin").val("");
    //$("#inputBotmMax").val("");
    $("#inputPrevValDB").val("");
    $("#inputPrevBtmValDB").val("");
    $('#inputLastValDB').val("");
    $('#inputNextLastValDB').val("");
    $('#inputNextLastIdDB').val("");
    $('#inputPrevLastIdDB').val("");
    $('#inputValBottomPrevLastDB').val("");
    $('#inputIdPrevlast').val("");
    $('#inputIdPrevBottomlast').val("");
    $('#inputIdNextlast').val("");
    $('#inputNextLastBottomId').val("");
    $('#inputNextBottomId').val("");

    $("#inputDefaultShowPopup").val(false);
}

function einheitAnlOnChangeChildSelectOpt(einheitAnlVal){
    $('.infosIntBetriebsdaten #control_system > option').each(function(){
        if(this.value != ''){
            $(this).addClass('invisible');
            $(this).removeClass('visible');
        }
    });
    if(einheitAnlVal != ''){
        if(einheitAnlVal ==1 ){
            //console.log('1/2');
            $(".infosIntBetriebsdaten .control_system_div").show();
            $(".infosIntBetriebsdaten #control_system option[value='1']").addClass('visible');
            $(".infosIntBetriebsdaten #control_system option[value='2']").addClass('visible');
            $(".infosIntBetriebsdaten #control_system option[value='1']").removeClass('invisible');
            $(".infosIntBetriebsdaten #control_system option[value='2']").removeClass('invisible');
        }else{
            //console.log('2/4');
            $(".infosIntBetriebsdaten .control_system_div").show();
            $(".infosIntBetriebsdaten #control_system option[value='2']").addClass('visible');
            $(".infosIntBetriebsdaten #control_system option[value='4']").addClass('visible');
            $(".infosIntBetriebsdaten #control_system option[value='2']").removeClass('invisible');
            $(".infosIntBetriebsdaten #control_system option[value='4']").removeClass('invisible');
        }
    }else{
        $(".infosIntBetriebsdaten .control_system_div").hide();
    }
}
/*For Interne Energiedaten Module 12-03-2021*/
/*On change Einheit History Tab PopUp History Update From
Create Control System Select option inner function */
/*new-mm-start*/
function einheitAnlHistOnChangeChildSelectOpt(einheitAnlVal){
    $('.intBdeIMwHistorieContainer #control_system > option').each(function(){
        if(this.value != ''){
            $(this).addClass('invisible');
            $(this).removeClass('visible');
        }
    });
    if(einheitAnlVal != ''){
        if(einheitAnlVal ==1 ){
            //console.log('1/2');
            $(".intBdeIMwHistorieContainer .control_system_div").show();
            $(".intBdeIMwHistorieContainer #control_system option[value='1']").addClass('visible');
            $(".intBdeIMwHistorieContainer #control_system option[value='2']").addClass('visible');
            $(".intBdeIMwHistorieContainer #control_system option[value='1']").removeClass('invisible');
            $(".intBdeIMwHistorieContainer #control_system option[value='2']").removeClass('invisible');
        }else{
            //console.log('2/4');
            $(".intBdeIMwHistorieContainer .control_system_div").show();
            $(".intBdeIMwHistorieContainer #control_system option[value='2']").addClass('visible');
            $(".intBdeIMwHistorieContainer #control_system option[value='4']").addClass('visible');
            $(".intBdeIMwHistorieContainer #control_system option[value='2']").removeClass('invisible');
            $(".intBdeIMwHistorieContainer #control_system option[value='4']").removeClass('invisible');
        }
    }else{
        $(".intBdeIMwHistorieContainer .control_system_div").hide();
    }
}
/*new-mm-end*/

/*For Produkte Module 08-03-2021*/
/*On change Einheit Prdkt create Control System Prdkt select option inner function */
/*new-mm-start*/
/*function einheitAnlPrdktMstHistOnChangeChildSelectOpt(einheitAnlVal){
       $('.infosIntEnergiedaten #control_system_AnlPrdkt > option').each(function(){
            if(this.value != ''){
                $(this).addClass('invisible');
                $(this).removeClass('visible');
            }
        });
        if(einheitAnlVal != ''){
            if(einheitAnlVal ==1 ){
                //console.log('1/2');
                $(".infosIntEnergiedaten .control_system_div_AnlPrdkt").show();
                $(".infosIntEnergiedaten #control_system_AnlPrdkt option[value='1']").addClass('visible');
                $(".infosIntEnergiedaten #control_system_AnlPrdkt option[value='2']").addClass('visible');
                $(".infosIntEnergiedaten #control_system_AnlPrdkt option[value='1']").removeClass('invisible');
                $(".infosIntEnergiedaten #control_system_AnlPrdkt option[value='2']").removeClass('invisible');
            }else{
                //console.log('2/4');
                $(".infosIntEnergiedaten .control_system_div_AnlPrdkt").show();
                $(".infosIntEnergiedaten #control_system_AnlPrdkt option[value='2']").addClass('visible');
                $(".infosIntEnergiedaten #control_system_AnlPrdkt option[value='4']").addClass('visible');
                $(".infosIntEnergiedaten #control_system_AnlPrdkt option[value='2']").removeClass('invisible');
                $(".infosIntEnergiedaten #control_system_AnlPrdkt option[value='4']").removeClass('invisible');
        }
    }else{
        $(".infosIntEnergiedaten .control_system_div_AnlPrdkt").hide();
    }
}*/
function einheitAnlPrdktMstHistOnChangeChildSelectOpt(einheitAnlVal,sId){
    $("." + sId + " #control_system_AnlPrdkt > option").each(function(){
        if(this.value != ''){
            $(this).addClass('invisible');
            $(this).removeClass('visible');
        }
    });
    if(einheitAnlVal != ''){
        if(einheitAnlVal ==1 ){
            //console.log('1/2');
            $("." + sId + " .control_system_div_AnlPrdkt").show();
            $("." + sId + " #control_system_AnlPrdkt option[value='1']").addClass('visible');
            $("." + sId + " #control_system_AnlPrdkt option[value='2']").addClass('visible');
            $("." + sId + " #control_system_AnlPrdkt option[value='1']").removeClass('invisible');
            $("." + sId + " #control_system_AnlPrdkt option[value='2']").removeClass('invisible');
        }else{
            //console.log('2/4');
            $("." + sId + " .control_system_div_AnlPrdkt").show();
            $("." + sId + " #control_system_AnlPrdkt option[value='2']").addClass('visible');
            $("." + sId + " #control_system_AnlPrdkt option[value='4']").addClass('visible');
            $("." + sId + " #control_system_AnlPrdkt option[value='2']").removeClass('invisible');
            $("." + sId + " #control_system_AnlPrdkt option[value='4']").removeClass('invisible');
        }
    }else{
        $("." + sId + " .control_system_div_AnlPrdkt").hide();
    }
}
/*new-mm-end*/

/*For IntBde Produkte Module 12-03-2021*/
/*On change Einheit Prdkt History Tab PopUp History Update From create Control System Prdkt select option inner function */
/*new-mm-start*/
function einheitAnlPrdktHistOnChangeChildSelectOpt(einheitAnlVal){
    $('.infosIntEnergiedaten #control_system_AnlPrdkt > option').each(function(){
        if(this.value != ''){
            $(this).addClass('invisible');
            $(this).removeClass('visible');
        }
    });
    if(einheitAnlVal != ''){
        if(einheitAnlVal ==1 ){
            //console.log('1/2');
            $(".infosIntEnergiedaten .control_system_div_AnlPrdkt").show();
            $(".infosIntEnergiedaten #control_system_AnlPrdkt option[value='1']").addClass('visible');
            $(".infosIntEnergiedaten #control_system_AnlPrdkt option[value='2']").addClass('visible');
            $(".infosIntEnergiedaten #control_system_AnlPrdkt option[value='1']").removeClass('invisible');
            $(".infosIntEnergiedaten #control_system_AnlPrdkt option[value='2']").removeClass('invisible');
        }else{
            //console.log('2/4');
            $(".infosIntEnergiedaten .control_system_div_AnlPrdkt").show();
            $(".infosIntEnergiedaten #control_system_AnlPrdkt option[value='2']").addClass('visible');
            $(".infosIntEnergiedaten #control_system_AnlPrdkt option[value='4']").addClass('visible');
            $(".infosIntEnergiedaten #control_system_AnlPrdkt option[value='2']").removeClass('invisible');
            $(".infosIntEnergiedaten #control_system_AnlPrdkt option[value='4']").removeClass('invisible');
        }
    }else{
        $(".infosIntEnergiedaten .control_system_div_AnlPrdkt").hide();
    }
}
/*new-mm-end*/

function typeValueEinheitControlSys($val){
    var opt;
    if($val ==1){
        opt= 'Count Up Stunden';
    }else if($val ==2){
        opt= 'Count Up Energie';
    }else if($val ==3){
        opt= 'genullte Stunden';
    }else if($val ==4){
        opt= 'genullte Energiewerte';
    }else{
        opt= '';
    }
    return opt;
}

function checkAlertRangeMinMaxServerSide(zeitintervallAnl,mstID,date,rowMainIDDs){
    $.ajax({
        type: "POST",
        async: !0,
        url: "php/getManuellInterneData.php",
        data: {
            id: "masseneingabeAlertRangeMinMax",
            nameDB: $("#nameDB").val(),
            mstID: mstID,
            date:date,
            zeitintervallAnl:zeitintervallAnl
        },
        fail: function() {
            alert("failed!!")
        },
        success: function(a) {
            a = JSON.parse(a);
            //console.log(a);
            var arr=[];
            if(a.lastDBDates[0]){
                for (var i=0; i<a.lastDBDates.length; i++){
                    if($.inArray(a.lastDBDates[i].on_date, anlageObj[mstID]) === -1){
                        anlageObj[mstID].push(a.lastDBDates[i].on_date);
                    }
                }
            }
            if($.inArray(date, anlageObj[mstID]) === -1){
                anlageObj[mstID].push(date);
            }
            if(a.values){
                for (i = 0; i <= a.values.length; i++) {
                    if(a.values[i] !='' && typeof(a.values[i]) !='undefined'){
                        arr.push(a.values[i].val);
                    }
                }
                arr.sort(function(a, b) { return a - b });

                var minVal = arr[0]; // min
                var maxVal = arr[arr.length - 1]; // max
                $("#inputBotmMin").val(minVal);
                $("#inputBotmMax").val(maxVal);

            }
            //console.log(anlageObj);

        }
    });
}
/*new-mm-start 07-04-2021*/
function checkAlertRangeMinMaxServerSidePrdkt(zeitintervallAnl,prdAnlID,date,rowMainIDDs){
    $.ajax({
        type: "POST",
        async: !0,
        url: "php/getManuellInterneData.php",
        data: {
            id: "masseneingabeAlertRangeMinMaxPrdkt",
            nameDB: $("#nameDB").val(),
            prdAnlID: prdAnlID,
            date:date,
            zeitintervallAnl:zeitintervallAnl
        },
        fail: function() {
            alert("failed!!")
        },
        success: function(a) {
            a = JSON.parse(a);
            //console.log(a);
            // alert("test:checkAlertRangeMinMaxServerSidePrdkt");
            var arr=[];
            if(a.lastDBDates[0]){
                for (var i=0; i<a.lastDBDates.length; i++){
                    if($.inArray(a.lastDBDates[i].on_date, anlageObj[prdAnlID]) === -1){
                        anlageObj[prdAnlID].push(a.lastDBDates[i].on_date);
                    }
                }
            }
            if($.inArray(date, anlageObj[prdAnlID]) === -1){
                anlageObj[prdAnlID].push(date);
            }
            if(a.values){
                for (i = 0; i <= a.values.length; i++) {
                    if(a.values[i] !='' && typeof(a.values[i]) !='undefined'){
                        arr.push(a.values[i].val);
                    }
                }
                arr.sort(function(a, b) { return a - b });

                var minVal = arr[0]; // min
                var maxVal = arr[arr.length - 1]; // max
                $("#inputBotmMin").val(minVal);
                $("#inputBotmMax").val(maxVal);

            }
            //console.log(anlageObj);

        }
    });
}
/*new-mm-end 07-04-2021*/
function checkAlertRangeLastInputValueExist(zeitintervallAnl,mstID,date,inputCurrTopId,inputCurrBottomId,rowMainIDDs,prevId){
    $.ajax({
        type: "POST",
        async: !0,
        url: "php/getManuellInterneData.php",
        data: {
            id: "masseneingabeAlertRangeLastInptValue",
            nameDB: $("#nameDB").val(),
            mstID: mstID,
            date:date,
            /* checkDay:checkDay,*/
            zeitintervallAnl:zeitintervallAnl
        },
        fail: function() {
            alert("failed!!")
        },
        success: function(a) {
            a = JSON.parse(a);

            //console.log(a);
            if(a.bottom[0]){
                var b = a.bottom[0].val.length;
                if(b>0){
                    var currTopVal = $(inputCurrTopId).val();
                    if((currTopVal !='' && a.top[0].val !='') && (typeof(currTopVal) !='undefined' && typeof(a.top[0].val) !='undefined')){
                        var calculate = currTopVal-a.top[0].val;
                        $(inputCurrBottomId).val(calculate);
                    }else{
                        $(inputCurrBottomId).val("");
                    }
                    $("#inputPrevValDB").val(a.top[0].val);
                    $("#inputPrevBtmValDB").val(a.bottom[0].val);
                    $("#inputValBottomCurr").val($(inputCurrBottomId).val());

                    /*add last prev value*/
                    //$("#inputLastValDB").val(a.top[0].val);
                    //$("#inputValBottomPrevLastDB").val(a.bottom[0].val);
                    //checkAlertRangeMinMaxServerSide(zeitintervallAnl,mstID,date,rowMainIDDs,prevId);
                }
            }
        }
    });
}
/*new-mm-start 07-04-2021*/
function checkAlertRangeLastInputValueExistPrdkt(zeitintervallAnl,prdAnlID,date,inputCurrTopId,inputCurrBottomId,rowMainIDDs,prevId){
    $.ajax({
        type: "POST",
        async: !0,
        url: "php/getManuellInterneData.php",
        data: {
            id: "masseneingabeAlertRangeLastInptValuePrdkt",
            nameDB: $("#nameDB").val(),
            prdAnlID: prdAnlID,
            date:date,
            /* checkDay:checkDay,*/
            zeitintervallAnl:zeitintervallAnl
        },
        fail: function() {
            alert("failed!!")
        },
        success: function(a) {
            a = JSON.parse(a);
            //console.log(a);
            //alert("test:checkAlertRangeLastInputValueExistPrdkt");
            if(a.bottom[0]){
                var b = a.bottom[0].val.length;
                if(b>0){
                    var currTopVal = $(inputCurrTopId).val();
                    if((currTopVal !='' && a.top[0].val !='') && (typeof(currTopVal) !='undefined' && typeof(a.top[0].val) !='undefined')){
                        var calculate = currTopVal-a.top[0].val;
                        $(inputCurrBottomId).val(calculate);
                    }else{
                        $(inputCurrBottomId).val("");
                    }
                    $("#inputPrevValDB").val(a.top[0].val);
                    $("#inputPrevBtmValDB").val(a.bottom[0].val);
                    $("#inputValBottomCurr").val($(inputCurrBottomId).val());

                    /*add last prev value*/
                    //$("#inputLastValDB").val(a.top[0].val);
                    //$("#inputValBottomPrevLastDB").val(a.bottom[0].val);
                    //checkAlertRangeMinMaxServerSide(zeitintervallAnl,mstID,date,rowMainIDDs,prevId);
                }
            }
        }
    });
}
/*new-mm-end 07-04-2021*/

function saveToDBMasseneingabeEingabenSingleInput(key,inputCurrTopId,inputCurrBottomId){
    //console.log('save running');
    var mstIDEnabled,dateEnabled,myObjEnabled,textValEnabled;
    var postDataEnabled =new Array();
    var enabledRow = [];
    //enabledRow[index] = {};
    //console.log(key);console.log(inputCurrTopId);console.log(inputCurrBottomId);
    textValEnabled = $(""+inputCurrTopId+"").val();
    mstIDEnabled = $(""+inputCurrTopId+"").closest('td').attr("data-id");
    dateEnabled = $(""+inputCurrTopId+"").closest('td').attr("date");
    enabledRow.push({
        'textValEnabled': textValEnabled, 'mstIDEnabled': mstIDEnabled, 'dateEnabled': dateEnabled
    });
    var mstIDDisabled,dateDisabled,myObjDisabled,textValDisabled;
    var postDataDisabled =new Array();
    var disabledRow = [];

    textValDisabled = $(""+inputCurrBottomId+"").val();
    mstIDDisabled = $(""+inputCurrBottomId+"").closest('td').attr("data-id");
    dateDisabled = $(""+inputCurrBottomId+"").closest('td').attr("date");
    disabledRow.push({
        'textValDisabled': textValDisabled, 'mstIDDisabled': mstIDDisabled, 'dateDisabled': dateDisabled
    });
    var postDataEnabled = JSON.stringify(enabledRow);//console.log(postDataEnabled);
    var postDataDisabled = JSON.stringify(disabledRow);//console.log(postDataDisabled);
    //$("#masseneingabeSpeichernSrch").prop('disabled',true);
    $.ajax({
        type: "POST",
        url: "php/saveMasseneingabeEingaben.php",
        async: false,
        dataType: 'json',
        data:{
            modus: "saveSingleRecord",
            nameDB: $("#nameDB").val(),
            postDataEnabled: postDataEnabled,
            postDataDisabled:postDataDisabled,
            key:key
        },
        fail: function() {
            alert("failed!!")
        },
        success: function(a) {
            // alert(a);
            /*$("#masseneingabeSpeichernSrch").prop('disabled',false);
                   $("#masseneingabeSrchImg").hide(); */
        }
    });
}

function saveToDBMasseneingabeEingabenSingleRow(key,rowMainIDEn,rowMainIDDs){
    var mstIDEnabled,dateEnabled,myObjEnabled,textValEnabled;
    var postDataEnabled =new Array();
    var enabledRow = [];
    $("#"+rowMainIDEn).each(function (index) {
        enabledRow[index] = {};
        $('td', this).each(function() {
            textValEnabled = $(this).find('input').val();
            mstIDEnabled = $(this).attr("data-id");
            dateEnabled = $(this).attr("date");
            enabledRow.push({
                'textValEnabled': textValEnabled, 'mstIDEnabled': mstIDEnabled, 'dateEnabled': dateEnabled
            });
        });
    });
    var mstIDDisabled,dateDisabled,myObjDisabled,textValDisabled;
    var postDataDisabled =new Array();
    var disabledRow = [];
    $("#"+rowMainIDDs).each(function (index) {
        disabledRow[index] = {};
        $('td', this).each(function() {
            textValDisabled = $(this).find('input').val();
            mstIDDisabled = $(this).attr("data-id");
            dateDisabled = $(this).attr("date");
            disabledRow.push({
                'textValDisabled': textValDisabled, 'mstIDDisabled': mstIDDisabled, 'dateDisabled': dateDisabled
            });
        });
    });

    var postDataEnabled = JSON.stringify(enabledRow);
    var postDataDisabled = JSON.stringify(disabledRow);
    //$("#masseneingabeSpeichernSrch").prop('disabled',true);
    $.ajax({
        type: "POST",
        url: "php/saveMasseneingabeEingaben.php",
        async: false,
        dataType: 'json',
        data:{
            modus: "saveCurrentRow",
            nameDB: $("#nameDB").val(),
            postDataEnabled: postDataEnabled,
            postDataDisabled:postDataDisabled,
            key:key
        },
        fail: function() {
            alert("failed!!")
        },
        success: function(a) {

            //alert(a);
            //$("#masseneingabeSpeichernSrch").prop('disabled',false);
            //$("#masseneingabeSrchImg").hide();
            /* $('#tblMasseneingabeDataIMwTbl tbody td input').val("");*/
        }
    });
}

/*new-mm-start 05-04-2021*/
function saveToDBMasseneingabeEingabenSingleRowPrdkt(key,rowMainIDEn,rowMainIDDs){
    var mstIDEnabled,dateEnabled,myObjEnabled,textValEnabled;
    var postDataEnabled =new Array();
    var enabledRow = [];
    $("#"+rowMainIDEn).each(function (index) {
        enabledRow[index] = {};
        $('td', this).each(function() {
            textValEnabled = $(this).find('input').val();
            mstIDEnabled = $(this).attr("data-id");
            dateEnabled = $(this).attr("date");
            enabledRow.push({
                'textValEnabled': textValEnabled, 'mstIDEnabled': mstIDEnabled, 'dateEnabled': dateEnabled
            });
        });
    });
    var mstIDDisabled,dateDisabled,myObjDisabled,textValDisabled;
    var postDataDisabled =new Array();
    var disabledRow = [];
    $("#"+rowMainIDDs).each(function (index) {
        disabledRow[index] = {};
        $('td', this).each(function() {
            textValDisabled = $(this).find('input').val();
            mstIDDisabled = $(this).attr("data-id");
            dateDisabled = $(this).attr("date");
            disabledRow.push({
                'textValDisabled': textValDisabled, 'mstIDDisabled': mstIDDisabled, 'dateDisabled': dateDisabled
            });
        });
    });

    var postDataEnabled = JSON.stringify(enabledRow);
    var postDataDisabled = JSON.stringify(disabledRow);
    //$("#masseneingabeSpeichernSrch").prop('disabled',true);
    $.ajax({
        type: "POST",
        url: "php/saveMasseneingabeEingaben.php",
        async: false,
        dataType: 'json',
        data:{
            modus: "saveCurrentRowPrdkt",
            nameDB: $("#nameDB").val(),
            postDataEnabled: postDataEnabled,
            postDataDisabled:postDataDisabled,
            key:key
        },
        fail: function() {
            alert("failed!!")
        },
        success: function(a) {

            //alert(a);
            //$("#masseneingabeSpeichernSrch").prop('disabled',false);
            //$("#masseneingabeSrchImg").hide();
            /* $('#tblMasseneingabeDataIMwTbl tbody td input').val("");*/
        }
    });
}
/*new-mm-end 05-04-2021*/

/*Check alert validation for the start Date and end Date*/
function alertValidationforStartEndeDate(mstID,date,type){
    $.ajax({
        type: "POST",
        async: !0,
        url: "php/getManuellInterneData.php",
        data: {
            id: "startDateRangeCheckValidation",
            nameDB: $("#nameDB").val(),
            mstID: mstID,
            date: date,
            type:type
        },
        fail: function() {
            alert("failed!!")
        },
        success: function(a) {
            a = JSON.parse(a);
            var b=a.length;
            //console.log(a);
            if(b>0){
                alert('Selected date value already filled up in record list. Please select other date.');
                keinZeitIntervallZugewiesenDblClickRow(mstID,'infosIntBetriebsdaten');

                /*new-mm-start 09-04-2021*/
                $('.zeitintervallAnl_1 input').datepicker( "option" , { minDate: null, maxDate: null} );
                /*new-mm-end 09-04-2021*/
            }
        }
    });
}
/*new-mm-start 06-04-2021*/
function alertValidationforStartEndeDateMesssetelle(mstID,date,type){
    $.ajax({
        type: "POST",
        async: !0,
        url: "php/getManuellInterneData.php",
        data: {
            id: "startDateRangeCheckValidation",
            nameDB: $("#nameDB").val(),
            mstID: mstID,
            date: date,
            type:type
        },
        fail: function() {
            alert("failed!!")
        },
        success: function(a) {
            a = JSON.parse(a);
            var b=a.length;
            //console.log(a);
            if(b>0){
                alert('Selected date value already filled up in record list. Please select other date.');
                /*new-mm-start 06-04-2021*/
                if ($("input[name='BetriebsdatenFilter']:checked").val() == '2') {
                    MesssetelleListingDblClickRow(mstID,'infosIntEnergiedaten');
                }
                /*new-mm-end 06-04-2021*/
                /*new-mm-start 09-04-2021*/
                $('.zeitintervallAnlPrdkt_1 input').datepicker( "option" , { minDate: null, maxDate: null} );
                /*new-mm-end 09-04-2021*/
            }
        }
    });
}
/*new-mm-end 06-04-2021*/
/*Prodkte mm 01-03-2021*/
/*new-mm-start 22-03-2021*/
function alertValidationforPrdktStartEndeDate(prd_anl_ID,date,type){
    $.ajax({
        type: "POST",
        async: !0,
        url: "php/getManuellInterneData.php",
        data: {
            id: "startDateRangeCheckValidationPrdkt",
            nameDB: $("#nameDB").val(),
            prd_anl_ID: prd_anl_ID,
            date: date,
            type:type
        },
        fail: function() {
            alert("failed!!")
        },
        success: function(a) {
            a = JSON.parse(a);
            var b=a.length;
            //console.log(a);
            if(b>0){
                alert('Selected date value already filled up in record list. Please select other date.');
                //keinZeitIntervallZugewiesenDblClickRow(mstID,'infosIntBetriebsdaten');
                produkteAnlageListingDblClickRow($("#prd_ID").val(),$("#anl_Col").val(),$("#anl_ID").val(),'infosIntEnergiedaten');
                /*new-mm-start 09-04-2021*/
                $('.zeitintervallAnlPrdkt_1 input').datepicker( "option" , { minDate: null, maxDate: null} );
                /*new-mm-end 09-04-2021*/
            }
        }
    });
}
/*new-mm-end 22-03-2021*/
function alertValidationforEinheitControlSystem(inputId,selVal,startDate,endDate,type){
    if(inputId =='einheitAnl'){
        $.ajax({
            type: "POST",
            async: !0,
            url: "php/getManuellInterneData.php",
            data: {
                id: "startEndDateEinheitTypeCheckValidation",
                nameDB: $("#nameDB").val(),
                mstID: $("#mstID").val(),
                einheitVal:selVal,
                startDate: startDate,
                endDate:endDate,
                type:type
            },
            fail: function() {
                alert("failed!!")
            },
            success: function(a){
                a = JSON.parse(a);
                var b = a.length;
                if(b>0){
                    alert('You could not set einheit. Please select different dates.');
                    keinZeitIntervallZugewiesenDblClickRow($("#mstID").val(),'infosIntBetriebsdaten');
                }
            }
        });
    }
    if(inputId =='control_system'){
        $.ajax({
            type: "POST",
            async: !0,
            url: "php/getManuellInterneData.php",
            data: {
                id: "startEndDatecontrolSysTypeCheckValidation",
                nameDB: $("#nameDB").val(),
                mstID: $("#mstID").val(),
                controlSystem:selVal,
                startDate: startDate,
                endDate:endDate,
                type:type
            },
            fail: function() {
                alert("failed!!")
            },
            success: function(a){
                a = JSON.parse(a); //console.log(a);
                var b=a.length;
                if(b>0){
                    alert('You could not set control system. Please select different dates.');
                    keinZeitIntervallZugewiesenDblClickRow($("#mstID").val(),'infosIntBetriebsdaten');
                }
            }
        });
    }
}

/*new-mm-start 22-03-2021*/
function alertValidationforEinheitControlSystemPrdkt(inputId,selVal,startDate,endDate,type){
    if(inputId =='einheitAnlPrdkt'){
        $.ajax({
            type: "POST",
            async: !0,
            url: "php/getManuellInterneData.php",
            data: {
                id: "startEndDateEinheitTypeCheckValidation_prdkt_mm",
                nameDB: $("#nameDB").val(),
                mstID: $("#mstID").val(),
                einheitVal:selVal,
                startDate: startDate,
                endDate:endDate,
                type:type
            },
            fail: function() {
                alert("failed!!")
            },
            success: function(a){
                a = JSON.parse(a);
                var b = a.length;
                if(b>0){
                    alert('You could not set einheit. Please select different dates.');
                    //keinZeitIntervallZugewiesenDblClickRow($("#mstID").val(),'infosIntEnergiedaten');
                    produkteAnlageListingDblClickRow($("#prd_ID").val(),$("#anl_Col").val(),$("#anl_ID").val(),'infosIntEnergiedaten');

                }
            }
        });
    }
    if(inputId =='control_system_AnlPrdkt'){
        $.ajax({
            type: "POST",
            async: !0,
            url: "php/getManuellInterneData.php",
            data: {
                id: "startEndDatecontrolSysTypeCheckValidation_prdkt_mm",
                nameDB: $("#nameDB").val(),
                mstID: $("#mstID").val(),
                controlSystem:selVal,
                startDate: startDate,
                endDate:endDate,
                type:type
            },
            fail: function() {
                alert("failed!!")
            },
            success: function(a){
                a = JSON.parse(a);
                //console.log(a);
                var b=a.length;
                if(b>0){
                    alert('You could not set control system. Please select different dates.');
                    //keinZeitIntervallZugewiesenDblClickRow($("#mstID").val(),'infosIntEnergiedaten');
                    produkteAnlageListingDblClickRow($("#prd_ID").val(),$("#anl_Col").val(),$("#anl_ID").val(),'infosIntEnergiedaten');

                }
            }
        });
    }
}
/*new-mm-end 22-03-2021*/

/*new-mm-start 22-03-2021*/
function deleteFromDBMasseneingabeEingabenSingleInput(key,currentDate,mstID){
    $.ajax({
        type: "POST",
        url: "php/saveMasseneingabeEingaben.php",
        async: false,
        dataType: 'json',
        data:{
            modus: "deleteCurrentInput",
            nameDB: $("#nameDB").val(),
            currentDate: currentDate,
            mstID:mstID,
            key:key
        },
        fail: function() {
            alert("failed!!")
        },
        success: function(a) {
            if(a==1){
                setTimeout(function(){
                    $("#masseneingabeSpeichernSrch").prop("disabled",false);
                }, 300);
            }
        }
    });
}
/*new-mm-end 22-03-2021*/

/*new-mm-start 06-04-2021*/
function deleteFromDBMasseneingabeEingabenSingleInputPrdkt(key,currentDate,mstID){
    $.ajax({
        type: "POST",
        url: "php/saveMasseneingabeEingaben.php",
        async: false,
        dataType: 'json',
        data:{
            modus: "deleteCurrentInputPrdkt",
            nameDB: $("#nameDB").val(),
            currentDate: currentDate,
            mstID:mstID,
            key:key
        },
        fail: function() {
            alert("failed!!")
        },
        success: function(a) {
            if(a==1){
                setTimeout(function(){
                    $("#masseneingabeSpeichernSrchprdkt").prop("disabled",false);
                }, 300);
            }
        }
    });
}
/*new-mm-end 06-04-2021*/

/*19-02-2021 interne Energiedaten Betriebsdaten table show hide*/
/* function interneEBTblShowHide(id){
        $('#tblMstOhneZeitintervallIMwIE').parents('div.dataTables_wrapper').first().hide();
        $('#tblAnlOhneZeitintervallIMw').parents('div.dataTables_wrapper').first().hide();
        if(id==1){
            $("#tblMstOhneZeitintervallIMwIE").hide();
            $('#tblMstOhneZeitintervallIMwIE').parents('div.dataTables_wrapper').first().hide();
            $("#searchBtnShowRecordsAnlBtnDiv").show();
            $('#tblAnlOhneZeitintervallIMw').parents('div.dataTables_wrapper').first().show();
            $('#searchBtnShowRecordsAnlBtn').val(1);
            searchKeinZeitIntervallZugewiesen(1);
            $("#interneEnergiedatenTbl").prop("checked",true);
        }
        if(id==2){
            $("#searchBtnShowRecordsAnlBtnDiv").hide();
            $('#tblAnlOhneZeitintervallIMw').parents('div.dataTables_wrapper').first().hide();
            $("#tblMstOhneZeitintervallIMwIE").show();
            $('#tblMstOhneZeitintervallIMwIE').parents('div.dataTables_wrapper').first().show();
            $("#interneBetriebsdatenTbl").prop("checked",true);
        }
    }*/