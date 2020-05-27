const scpHistory =
    freeze(
        new function () {

            const showDialog =
            element =>
            height =>
            width =>
            open =>
            close =>
            element.dialog({
                height,
                width,
                show: {
                    effect: "fade",
                    duration: 500
                },
                hide: {
                    effect: "fade",
                    duration: 500
                },
                open,
                close
            });

            const inHistorie =
            showDialog();

            const addEventListener =
            event =>
            response =>
            element =>
            element.on(event, response);

            const rmvEventListener =
            event =>
            element =>
            element.off(event);

            const copy =
                record =>
                id(record);

            const copyRecord =
                oldRecord =>
                copy(oldRecord);

            const markArchived =
                record =>
                record.archiviert = true;

            const markOldRecordAsArchived =
                oldRecord =>
                markArchived(oldRecord);

            const saveChanges =
                record =>
                callAjax(record);

            const saveChangedInfo =
                newRecord =>
                saveChanges(newRecord);
        }
    );


const historyDialog =
() => {
    const elements =
        [$("#histSpeichern"),
        $("#histNichtSpeichern"),
        $("#histOk"),
        $("#histAbbrechen")];

    elements
    .forEach(rmvEventListener("click"));

    elements
    .forEach(addEventListener("click"));
}


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
    close: function() {
        $("#infosBemerkungHist input").val("");
        $("#infosBemerkungHist, #histOk").css("display","none");
        $("#histSpeichern, #histNichtSpeichern").css("display","inline");
    }
});
