"use strict"
// Depends on fpCore.js
// DataTables libs
// Syncfusion Chart libs

const Interval = 
    { Year  : 0
    , Month : 1
    , Day   : 2
    }

const scpChart =
    Object
    .freeze (
        new function () {
            this.getChart = sel => $(sel).ejChart("instance")

            this.note = ident => mst => color => note_ =>
                "<div class='bem'>" +
                "<image src='images/icons/notepad.svg' style='height:18px;width:18px;'/>" +
                "<label style='margin-right:10px;'> &nbsp;" + ident + " </label>" +
                "<label style='margin-right:10px;color:" + color + "'>" + mst + " </label>" +
                "<label>" + note_ + " </label>" +
                "</div>"

            this.appendTo = elem => sth => $(elem).append(sth)

            this.formatDate = dt => dt.length === 1 ? "0" + dt : dt

            const colors =
                () =>
                    [ {hex: "#E94649", name: "Red"}
                    , {hex: "#F6B53F", name: "Yellow"}
                    , {hex: "#6FAAB0", name: "Blue"}
                    ]

            this.chooseFlag = hx => head(colors().filter(a => equal(hx)(a.hex))).name

            this.prependZero = n => n < 10 ? "0" + String(n) : String(n)

            this.timeSeriesYear = range(1)(12).map(this.prependZero)

            this.monthArr = [ 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ]

            this.timeSeriesMonth = month => range(1)(this.monthArr[month - 1]).map(this.prependZero)

            this.timeSeriesDay = range(1)(24).map(this.prependZero).map(a => a + ":00")

            this.setXY = x => y => ({x, y})

            this.timeSeriesX = timeSeries => timeSeries.map(flip(this.setXY)())

            this.addName = name => timeSeries => timeSeries.map(a => ({x : a.x, y : a.y, name}))

            this.timeSeriesAssignY =
                dataXY =>
                timeSeriesX_ =>
                timeSeriesX_
                .map(
                    a => {
                        const foundRecord = dataXY.find(b => a.x === b.x)
                        
                        return foundRecord === undefined ? a : foundRecord
                    }
                )

            this.generateDataSeries =
                month =>
                name =>
                interval => 
                data => {
                    let timeSeries = []
                    switch (interval) {
                        case Interval.Year:
                            timeSeries = this.timeSeriesYear
                            break;
                        case Interval.Month:
                            timeSeries = this.timeSeriesMonth(month)
                            break;
                        case Interval.Day:
                            timeSeries = this.timeSeriesDay
                            break;
                    
                    }

                    return pipe_(timeSeries)
                                ( this.timeSeriesX
                                , this.addName(name)
                                , this.timeSeriesAssignY(data)
                                )
                }

            this.updateChart = month => interval => newDataSeries => nameSeries => {

                let chart = this.getChart("#container")
                const nSeries = chart.model.series.length

                chart.model.series.push({
                    type: chartType
                    , name: nameSeries
                    , points: 
                        this.generateDataSeries(interval === Interval.Month ? month : 0)(nameSeries)(interval)(newDataSeries)
                        .map(
                            a => ({name: a.name, x: a.x + " ", y: a.y})
                        )
                    , xName: "x"
                    , yName: "y"
                })

                console.log("chart.model.series")
                console.log(chart.model.series)

                chart.redraw()
                return [chart.model.series[nSeries].fill, nSeries]
            }

            this.sumSeries = data => Math.round(data.map(a => a.y).reduce(sum))

            this.fillTable = data => tbl => recordFn => {
                data
                .filter( a => a.name !== "" )
                .map( recordFn )
                .forEach( tbl.row.add )
                tbl.draw()
            }

            this.selectNotes =
                type =>
                notes_ =>
                equal(type)("day") ?
                notes_.filter(
                    a =>
                    a.ident.split("/")[0] === year
                    && a.ident.split("/")[1] === month
                    && a.ident.split("/")[2] === day
                ) :
                equal(type)("month") ?
                notes_.filter(
                    a =>
                    a.ident.split("/")[0] === year
                    && a.ident.split("/")[1] === month
                ) :
                equal(type)("year") ?
                notes_.filter(
                    a =>
                    a.ident.split("/")[0] === year
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

                    return equal(note_[1])(point_.name)
                    && equal(splittedDate[decr(splittedDate.length)] + " ")(point_.x)
                }

            this.addFlags =
                series =>
                notes_ => {
                    let chart = this.getChart("#container")

                    notes_
                    .forEach(
                        nt =>
                        chart.model.series[series].points
                        .forEach(
                            pt => {
                                if( this.matchNote(nt)(pt) ) {
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

            this.getNotes =
                type =>
                mstID =>
                mstName =>
                mstColor =>
                series =>
                ajaxPost('php/readNote.php')({nameDB, mstID, type})
                .then(this.selectNotes(type))
                .then(this.addToList(mstName)(mstColor))
                .then(this.addFlags(series))

            this.noteExists =
                ident =>
                mstID =>
                notes
                .some(a => equal(a[0])(ident) && equal(a[2])(Number(mstID)))

            this.saveNote =
                type =>
                ident =>
                mstID =>
                bemerkung =>
                ajaxPost('php/saveNote.php')(
                    { nameDB
                    , ins : this.noteExists(ident)(mstID) ? "save" : "new"
                    , ident
                    , mstID
                    , bemerkung
                    , type
                    }
                )

            this.getSeries =
                chartObj =>
                JSON.parse(JSON.stringify(chartObj.model.series))

            this.currentSeriesIndex =
                sender =>
                sender.data.legendItem.Style.SeriesIndex

            this.prepareSeries =
                sender =>
                series => {
                    if(series[this.currentSeriesIndex(sender)].visibility === "visible") {
                        series[this.currentSeriesIndex(sender)].visibility = "hidden"
                    }
                    else {
                        series[this.currentSeriesIndex(sender)].visibility = "visible"
                    }
                    return series
                }

            this.updateNotesOfVisibleSeries =
                type =>
                series =>
                series
                .forEach((item, i) => {
                    if(item.visibility === "visible") {
                        this.getNotes(type)(msts[i][0])(msts[i][1])(msts[i][2])(i)
                    }
                })

    }
);
