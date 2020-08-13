"use strict"
// Depends on fpCore.js
// DataTables libs
// Syncfusion Chart libs

const scpChart =
    Object
    .freeze (
        new function () {
            this.getChart = sel => $(sel).ejChart("instance");
            this.note = ident => mst => color => note_ =>
                "<div class='bem'>" +
                "<image src='images/icons/notepad.svg' style='height:18px;width:18px;'/>" +
                "<label style='margin-right:10px;'> &nbsp;" + ident + " </label>" +
                "<label style='margin-right:10px;color:" + color + "'>" + mst + " </label>" +
                "<label>" + note_ + " </label>" +
                "</div>";
            this.appendTo = elem => sth => $(elem).append(sth);
            this.formatDate = dt => dt.length === 1 ? "0" + dt : dt;
            const colors =
                () =>
                    [ {hex: "#E94649", name: "Red"}
                    , {hex: "#F6B53F", name: "Yellow"}
                    , {hex: "#6FAAB0", name: "Blue"}
                    ]
            this.chooseFlag = hx => head(colors().filter(a => equal(hx)(a.hex))).name;
            this.updateChart = newDataSeries => nameSeries => {

                let chart = this.getChart("#container")
                const nSeries = chart.model.series.length
                chart.model.series.push({
                      type: chartType
                    , name: nameSeries
                    , points: newDataSeries.map(
                            a => ({name: a.name, x: a.x + ".", y: a.y})
                        )
                    , xName: "x"
                    , yName: "y"
                })

                chart.redraw()
                return [chart.model.series[nSeries].fill, nSeries]
            };
            this.sumSeries = data => Math.round(data.map(a => a.y).reduce(sum));
            this.fillTable = data => tbl => recordFn => {
                data.map( recordFn ).forEach( tbl.row.add );
                tbl.draw();
            };
            this.selectNotes =
                type =>
                notes_ =>
                equal(type)("month") ?
                notes_.filter(
                    a =>
                    a.ident.split("/")[0] === year
                    && a.ident.split("/")[1] === month
                ) : false

            this.addToList =
                mstName =>
                mstColor =>
                notes_ => {
                notes_
                .forEach(
                    rec => {
                        this.appendTo ("#bemList")
                        ( this.note (rec.ident)(mstName)(mstColor)(rec.bemerkung) )

                        notes.push([rec.ident, mstName, rec.mst_ID, mstColor, rec.bemerkung])
                    }
                )
                return notes
            }

            this.matchNote =
                note_ =>
                point_ => {
                    const splittedDate = head(note_).split("/")

                    console.log("note");
                    console.log(note_);

                    console.log("point");
                    console.log(point_);

                    console.log("is same mst");
                    console.log(note_[1] + " , " + point_.name);

                    console.log("is same date");
                    console.log(splittedDate[decr(splittedDate.length)] + "." + " , " + point_.x);

                    return equal(note_[1])(point_.name)
                    && equal(splittedDate[decr(splittedDate.length)] + ".")(point_.x)

                }

            this.addFlags =
                series =>
                notes_ => {
                    let chart = this.getChart("#container")

                    console.log("in AddFlags");

                    console.log("notes");
                    console.log(notes);

                    notes_
                    .forEach(
                        nt =>
                        chart.model.series[series].points
                        .forEach(
                            pt => {
                                if( this.matchNote(nt)(pt) ) {
                                    console.log("ADD FLAG AT POINT :")
                                    console.log(pt);

                                    pt.marker =
                                        { shape : "image"
                                        , size :
                                            { height : 50
                                            , width : 50
                                            }
                                        , imageUrl : "dist/images/icons/flag3Full" + scpChart.chooseFlag(nt[3]) + ".png"
                                        }
                                }
                            }
                        )
                    )
                    chart.redraw()
                }

            this.updateNotes =
                type =>
                mstID =>
                mstName =>
                mstColor =>
                series =>
                ajaxPost('php/readNote.php')({ins: "read", nameDB, mstID, type})
                .then(this.selectNotes(type))
                .then(this.addToList(mstName)(mstColor))
                .then(this.addFlags(series))





        }
    );
