"use strict"
// Depends on fpCore.js
// DataTables libs
// Syncfusion Chart libs

const scpChart =
    Object
    .freeze (
        new function () {
            this.getChart = sel => $(sel).ejChart("instance");
            this.note = ident => mst => color => note =>
                "<div class='bem'>" +
                "<image src='images/icons/notepad.svg' style='height:18px;width:18px;'/>" +
                "<label style='margin-right:10px;'> &nbsp;" + ident + " </label>" +
                "<label style='margin-right:10px;color:" + color + "'>" + mst + " </label>" +
                "<label>" + note + " </label>" +
                "</div>";
            this.appendTo = elem => sth => $(elem).append(sth);
            this.formatDate = dt => dt.length === 1 ? "0" + dt : dt;
            const colors =
                () =>
                    [ {hex: "#E94649", name: "Red"}
                    , {hex: "#F6B53F", name: "Yellow"}
                    , {hex: "#6FAAB0", name: "Blue"}
                    ]
            this.chooseFlag = hx => scpCore.head(colors().filter(a => scpCore.equal(hx)(a.hex))).name;
            this.updateChart = newDataSeries => nameSeries => {

                let chart = $("#container").ejChart("instance");
                const nSeries = chart.model.series.length;
                chart.model.series.push({
                      type: chartType
                    , name: nameSeries
                    , points: newDataSeries
                    , xName: "x"
                    , yName: "y"
                });

                chart.redraw();
                return [chart.model.series[nSeries].fill, nSeries];
            };
            this.sumSeries = data => data.map(a => a.y).reduce(scpCore.sum);
            this.fillTable = data => tbl => record => {
                const addRow = tbl => tbl.row.add;
                data.map( record ).forEach( addRow );

                tbl.draw();
            };
            this.updateNotes =
                mstID =>
                mstName =>
                mstColor =>
                ser =>
                fetch('php/readNote.php',
                    { method: 'POST'
                    , body:
                        { ins: "read"
                        , nameDB
                        , mstID
                        , type: "day"
                        }
                    })
                    .then(JSON.parse)
                    .then(records => {



                            console.log("this.updateNotes : records");
                            console.log(records);

                            if (greaterZero(records)) {
                                records
                                .filter(
                                    a => head(splitSlashes(a.ident)) === year && a.ident.split("/")[1] === month && a.ident.split("/")[2] === scpChart.formatDate(day)
                                )
                                .forEach(
                                    a => {
                                        scpChart.appendTo ("#bemList")
                                        (scpChart.note(
                                            a.ident
                                        )(
                                            mstName
                                        )(
                                            mstColor
                                        )(
                                            a.bemerkung
                                        ));

                                        notes.push([a.ident, mstName, a.mst_ID, mstColor, a.bemerkung]);
                                    }
                                )
                            }

                            let chart = $("#container") .ejChart("instance");

                            notes
                            .forEach(
                                a =>
                                chart
                                .model
                                .series[ser]
                                .points
                                .forEach (
                                    b => {
                                        if(a[1] === b.name && head(a).split("/")[3] === b.x)
                                        {
                                            b.marker = {
                                                shape: 'image',
                                                size: {
                                                    height: 50, width: 50
                                                },
                                                imageUrl: "images/icons/flag3" + scpChart.chooseFlag(a[3]) + ".png"
                                            }
                                        }
                                    }
                                )
                            )
                            chart.redraw();
                        });
        }
    );
