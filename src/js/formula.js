"use strict"

const scpFormula =
    freeze (
        new function () {

        const database =
            id ;

        const file =
            freeze({
                kpis: "php/kpiRecord.php",
                energyData: "php/energyData.php",
                prodData: "php/prodData.php"
            }) ;

        const applyRv =
            arg =>
            fn =>
            apply(fn)(arg) ;

        const json =
            arg =>
            applyRv(arg)(JSON.parse) ;

        const callAjax =
            url =>
            data => {
                return new Promise( function( resolve, reject ) {
                    $.ajax({type: 'POST',async: true,url,data,
                    success: ( records ) => {
                    resolve ( json ( records ) ) ;
                }
                }) ;
            }) ;
        }

        const kpiRecord =
            data =>
            callAjax(file.kpis)(data)
            .then(head) ;

        const energyData =
            callAjax(file.energyData) ;

        const prodData =
            callAjax(file.prodData) ;

        const operators =
            x =>
            x
            .length === 1 ;

        const instances =
            x =>
            x
            .length > 2 ;

        const timeInterval =
            a =>
            ["60min", "30min", "15min", "5min"]
            .filter(equal(a))
            .length > 0 ;

        const underscoreSplit =
            a =>
            a
            .split("_") ;


        this.datasetRaw =
            nameDB =>
            knzID =>
            nRecords =>
            kpiRecord ({nameDB, knzID})
            .then (
                kpi =>
                applyRv (
                    {nameDB, ins: kpi.bezug, id: kpi[`${kpi.bezug}_ID`],nRecords}
                )(
                    timeInterval ( head ( get (instances) (kpi.idString) ) ) ?
                    energyData :
                    prodData
                )
            ) ;

        this.datasetFormula =
            nameDB =>
            knzID =>
            nRecords =>
            kpiRecord ({nameDB, knzID})
            .then (
                kpi =>
                [ applyRv (
                    {nameDB, ins: kpi.bezug, id: kpi[`${kpi.bezug}_ID`], nRecords}
                )(
                    timeInterval ( head ( get (instances) (kpi.idString) ) ) ?
                    energyData :
                    prodData
                ), kpi ]
            )
            .then (
                recs =>
                recs[0]
                .map (
                    (rec) =>
                        atob (recs[1].idString)
                        .split(" ")
                        .map (
                        (ins) => {
                            const insRef =
                                underscoreSplit (ins);

                            const retVal =
                                equal(insRef[0]) ("bdeprod") ?
                                rec[ins.split("-")[1]] :
                                    equal(insRef[0]) ("mst") &&
                                    equal(insRef[1]) (rec.mst_ID) ?
                                    rec.Value :
                                        equal(insRef[0]) ("anl") &&
                                        equal(insRef[1]) (rec.anl_ID) ?
                                        rec.Value :
                                            ins ;

                            return retVal ;
                        }
                    )
                )
                .map(a => a.map(b => String(b).replace(",",".")))
                .map(a => a.reduce((tot, b) => tot + " " + b))
                .map(a => math.eval(String(a)))
            )
    }
)
