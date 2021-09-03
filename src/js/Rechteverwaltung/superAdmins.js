// Depends on fpCore.js
// Depends on https://unpkg.com/dexie@latest/dist/dexie.js
// idxDB is initialized in main.html

"use strict"

const scpRechteverwaltung_superAdmins =
    freeze (
        new function () {

            this.updateIndexedDB =
                () =>
                ajaxPost("php/Rechteverwaltung/SuperAdmins/readSuperAdmins.php")({})
                .then(
                    result => 
                    scpIndexedDB.dataIntoIDB(result)("superAdmins")   
                )

            const getFormData =
                 () => (
                    { modus            : helper.fieldValue("sAdmState")
                    , sAdmID           : helper.fieldValue("sAdmID")
                    , betrGrpID        : helper.fieldValue("betrGrpID")
                    , titelSAdm        : helper.fieldValue("titelSAdm")
                    , nameSAdm         : helper.fieldValue("nameSAdm")
                    , vornameSAdm      : helper.fieldValue("vornameSAdm")
                    , emailSAdm        : helper.fieldValue("emailSAdm")
                    , telefonSAdm      : helper.fieldValue("telefonSAdm")
                    , faxSAdm          : helper.fieldValue("faxSAdm")
                    , mobiltelefonSAdm : helper.fieldValue("mobiltelefonSAdm")
                    , username         : helper.fieldValue("benutzernameSAdm")
                    , passHash         : 
                        emptyString(helper.fieldValue("passwortSAdm")) ? 
                        "" :
                        getHash(helper.fieldValue("passwortSAdm"))
                    , rechteTreeView   : treeSAdm.getValues().join(",")
                    , rechteMenu       : scpTreeView.getSelectedNodes(treeSAdm).join(",")
                    }
                )

            const completeFormData =
                formData => 
                [ "titelSAdm"
                , "nameSAdm"
                , "vornameSAdm"
                , "emailSAdm"
                , "telefonSAdm"
                , "faxSAdm"
                , "mobiltelefonSAdm"
                , "username"
                ]
                .map(field(formData))
                .every(a => !emptyString(a)) &&
                !emptyString(helper.fieldValue("passwortSAdm"))
            
            const save =
                formData =>
                ajaxPost("php/Rechteverwaltung/SuperAdmins/saveSuperAdmin.php")(formData)
                .then(result => alert(datensatzGespeichert(result)))
                .then(this.updateIndexedDB)
                .then(
                    () =>
                    equal($("#sAdmState").val())("new") ?
                    this.readLast() :
                    false
                )

            const nonCompleteDataDialog =
                formData =>
                $("#saveSAdmDialog").dialog({
                    height: 203,
                    width: 329,
                    resize: "auto",
                    show: {
                        effect: "fade",
                        duration: 500
                    },
                    hide: {
                        effect: "fade",
                        duration: 500
                    },
                    modal: true,
                    open: () => {
                        $("#saveSAdmOk").off("click")
                        $("#saveSAdmOk").on("click",
                            () =>
                            ( save(formData)
                            , $("#saveSAdmDialog").dialog("close")
                            )
                        )

                        $("#saveSAdmCancel").off("click")
                        $("#saveSAdmCancel").on("click",
                            () =>
                            $("#saveSAdmDialog").dialog("close")
                        )
                    }
                })

            this.validateAndSave =
                    () => {
                        const formData =
                            getFormData()

                        !completeFormData(formData) ?
                        nonCompleteDataDialog(formData) :
                        save(formData) 
                    }

            this.clearFields =
                () =>
                ( [ "sAdmID"
                  , "titelSAdm"
                  , "nameSAdm"
                  , "vornameSAdm"
                  , "emailSAdm"
                  , "telefonSAdm"
                  , "faxSAdm"
                  , "mobiltelefonSAdm"
                  , "benutzernameSAdm"
                  , "passwortSAdm"
                  ]    
                  .forEach(helper.clearField)
                , scpTreeView.clear(treeSAdm)
                , helper.setState("sAdm")("new")
                )

            const getBetrGrpRefRecords =
                () => 
                idxDB.superAdmins
                .where("betrGrp_ID")
                .equals(Number(helper.fieldValue("betrGrpID")))

            const queryDatasIDB =
                () => 
                getBetrGrpRefRecords()
                .toArray()

            const queryDataIDB =
                idx =>
                queryDatasIDB()
                .then(records => records[idx])

            const readIntoFormFields =
                idx => {
                    queryDataIDB(idx)
                    .then(
                        record => {

                            $("#sAdmIdx").val(idx)
                            $("#sAdmID").val(record.sAdm_ID)
                            $("#titelSAdm").val(record.titelSAdm)
                            $("#nameSAdm").val(record.nameSAdm)
                            $("#vornameSAdm").val(record.vornameSAdm)
                            $("#emailSAdm").val(record.emailSAdm)
                            $("#telefonSAdm").val(record.telefonSAdm)
                            $("#faxSAdm").val(record.faxSAdm)
                            $("#mobiltelefonSAdm").val(record.mobiltelefonSAdm)
                            $("#benutzernameSAdm").val(record.username)
                            $("#passwortSAdm").val("")

                            helper.setState("sAdm")("edit")

                            treeSAdm.setValues(record.rechteTreeView.split(","))
                        }
                    )
                }

            this.readFirst =
                () =>
                getBetrGrpRefRecords()
                .count()
                .then(
                    count =>
                    greaterZero(count) ?
                    readIntoFormFields(0) :
                    this.clearFields()
                )
                
            this.readPrevious =
                () =>
                greaterZero(helper.fieldValue("sAdmIdx")) ?
                readIntoFormFields(decr(helper.fieldValue("sAdmIdx"))) :
                false

            this.readNext =
                () =>
                getBetrGrpRefRecords()
                .count()
                .then( 
                    count => 
                    greater(decr(count))(helper.fieldValue("sAdmIdx")) ?
                    readIntoFormFields(incr(helper.fieldValue("sAdmIdx"))) :
                    false
                )

            this.readLast =
                () =>
                getBetrGrpRefRecords()
                .count()
                .then(
                    count =>
                    greaterZero(count) ?
                    readIntoFormFields(decr(count)) :
                    false
                )

            this.delete =
                () => {
                    const sAdmID = $("#sAdmID").val()

                    ajaxPost("php/Rechteverwaltung/SuperAdmins/deleteSuperAdmin.php")({sAdmID})
                    .then(
                        () =>
                        ( alert("erfolgreich gelöscht!")
                        , this.updateIndexedDB()
                          .then(this.readFirst) 
                        )
                    )
                    
                }

            const prepareData =
                records =>
                records.map(
                    (a, i) =>
                    [ i
                    , a.titelSAdm
                    , a.vornameSAdm + " " + a.nameSAdm
                    , a.username
                    ]
                )

            const fillTbl =
                data => {
                    clearTable(tblSAdmSuchen)
                    intoTable(tblSAdmSuchen)(prepareData(data))
                }

            this.search =
                () => {

                    queryDatasIDB()
                    .then(fillTbl)

                    $("#sAdmSuchenContainer").dialog({
                        height: 450,
                        width: 875,
                        resize: "auto",
                        show: {
                            effect: "fade",
                            duration: 500
                        },
                        hide: {
                            effect: "fade",
                            duration: 500
                        },
                        modal: true,
                        open: function() {
                            $("#tblSAdmSuchen tbody tr").css("cursor", "pointer");
                            $("#tblSAdmSuchen tbody").off("dblclick", "tr");
                            $("#tblSAdmSuchen tbody").on("dblclick", "tr",
                            function() {

                                const selectedRecord =
                                    tblSAdmSuchen.row(this).data()

                                readIntoFormFields(head(selectedRecord))

                                $("#sAdmSuchenContainer").dialog("close")
                            })
                        }
                    })
                }  
        }
    )

let treeSAdm