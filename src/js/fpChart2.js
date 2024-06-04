"use strict"
// Depends on fpCore.js
// DataTables libs
// Syncfusion Chart libs

const scpChart =
    Object
    .freeze (
        new function () {
            this.getChart = sel => $(sel).ejChart("instance")

            this.note = ident => mst => color => note_ => bemDiag_ID =>
                "<div class='bem'>" +
                "<image src='images/icons/notepad.svg' style='height:18px;width:18px;'/>" +
                "<label style='margin-right:10px;'> &nbsp;" + ident + " </label>" +
                "<label style='margin-right:10px;color:" + color + "'>" + mst + " </label>" +
                "<label>" + note_ + " </label>" +
                "<image src='images/delete.png' class='deleteButton' id='"+ bemDiag_ID +"' style='height: 14px;width: 14px;margin-left: 5px;cursor: pointer;'/>" +
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

            this.updateChart = newDataSeries => nameSeries => {

                let chart = this.getChart("#container")
                let chartType =sessionStorage.getItem("chartType")
                const nSeries = chart.model.series.length
                chart.model.series.push({
                      type: chartType
                    , name: nameSeries
                    , points: newDataSeries.map(
                            a => ({name: a.name, x: a.x + " ", y: a.y})
                        )
                    , xName: "x"
                    , yName: "y"
                })

                chart.redraw()
                return [chart.model.series[nSeries].fill, nSeries]
            }

            this.updateChart2 = newDataSeries => nameSeries => id => chartType =>{
                let chart = this.getChart(".container_"+id+"")
                const nSeries = chart.model.series.length
                chart.model.series.push({
                      type: chartType
                    , name: nameSeries
                    , points: newDataSeries.map(
                            a => ({name: a.name, x: a.x + " ", y: a.y})
                        )
                    , xName: "x"
                    , yName: "y"
                })

                chart.redraw()
                return [chart.model.series[nSeries].fill, nSeries]
            }

            this.sumSeries = data => Math.round(data.map(a => a.y).reduce(sum))

            this.fillTable = data => tbl => recordFn => {
                data.map( recordFn ).forEach( tbl.row.add )
                tbl.draw()
            }

            this.selectNotes =
                type =>
                notes_ =>
                equal(type)("day") ?
                notes_.filter(
                    a =>
                    a.ident.split("/")[0] === year_1
                    || a.ident.split("/")[1] === month_1
                    || a.ident.split("/")[2] === day_1
                    || a.ident.split("/")[0] === year_2
                    || a.ident.split("/")[1] === month_2
                    || a.ident.split("/")[2] === day_2
                    || a.ident.split("/")[0] === year_3
                    || a.ident.split("/")[1] === month_3
                    || a.ident.split("/")[2] === day_3
                ) :
                equal(type)("month") ?
                notes_.filter(
                    a =>
                    a.ident.split("/")[0] === year_1
                    || a.ident.split("/")[1] === month_1
                    || a.ident.split("/")[0] === year_2
                    || a.ident.split("/")[1] === month_2
                    || a.ident.split("/")[0] === year_3
                    || a.ident.split("/")[1] === month_3
                ) :
                equal(type)("year") ?
                notes_.filter(
                    a =>
                    a.ident.split("/")[0] === year_1
                    || a.ident.split("/")[0] === year_2
                    || a.ident.split("/")[0] === year_3
                ) :
                equal(type)("week") ?
                notes_.filter(
                    a =>
                    a.ident.split("-")[2] === startWeekYear1
                    || a.ident.split("-")[2] === startWeekYear2
                    || a.ident.split("-")[2] === startWeekYear3
                ) : false

            this.addToList =
                mstName =>
                mstColor =>
                notes_ => {
                    notes_
                    .forEach(
                        rec => {
                            this.appendTo ("#bemList")
                            ( this.note (rec.ident)(mstName)(mstColor)(rec.bemerkung)(rec.bemDiag_ID) )

                            notes.push([rec.ident, mstName, rec.mst_ID, mstColor, rec.bemerkung, rec.bemDiag_ID])
                        }
                    )
                    return notes
            }

            this.matchNote =
                note_ =>
                point_ =>
                year =>  {
                    /*console.log('year',year);
                    console.log('note_',note_[0].split("/")[0]);
                    console.log('note_',note_);
                    console.log('note_',note_[0]);*/
                    // let year = '';
                    // //New Code for scp charts
                    // if(lineIndex==2){
                    //     year = year_1
                    // }
                    // if(lineIndex==1){
                    //     year = year_2
                    // }
                    // if(lineIndex==0){
                    //     year = year_3
                    // }
                    //New Code for scp charts

                   
                    // const noteYear = note_[1].ident.split("/")[0];
                    //  console.log('lineIndex',lineIndex);
                    // console.log('noteYear',noteYear);
                    // console.log('note_[1]',note_);
                    // console.log(parseInt(point_.YValues[0]));
                    //console.log(note_[0].split("-")[3]);
                    // return;
                    const splittedDate = head(note_).split("/")
                    //console.log(splittedDate[decr(splittedDate.length)] + " ")
                    
                    if((note_[0].length > 18) || (note_[0].split("-")[3]) ){//week
                       return equal(note_[0].split("-")[2])(year.split("-")[2].replace(/\s/g, '').substring(0, 4)) && equal(parseInt(note_[0].split("-")[3]))(parseInt(point_.YValues[0]))
                       && equal((splittedDate[decr(splittedDate.length)] + " ").split("-")[1]+' ')(point_.x) 
                       && equal(note_[0].split("-")[1]+' ')(point_.x)
                    }
                    if(note_[0].length >= 17 && note_[0].length < 18){
                        return equal(note_[0].split("/")[0])(year) && equal(note_[1])(point_.name)
                        && equal(splittedDate[decr(splittedDate.length)] + " ")(point_.x)
                    }
                    else if(note_[0].length==10){//month
                        let yearValue=year.split(".")
                        year = yearValue[1];
                        let month = yearValue[0];
                        return equal(note_[0].split("/")[0])(year) && equal(note_[0].split("/")[1])(month) /*&& equal(note_[1])(point_.name)*/
                        && equal(splittedDate[decr(splittedDate.length)] + " ")(point_.x)    
                    }
                    else if(note_[0].length == 16){//day
                        let yearValue=year.split(".")
                        year = yearValue[2];
                        let month = yearValue[1];
                        let day = yearValue[0];
                        return equal(note_[0].split("/")[0])(year) && equal(note_[0].split("/")[1])(month) && equal(note_[0].split("/")[2])(day) /*&& equal(note_[1])(point_.name)*/
                        && equal(splittedDate[decr(splittedDate.length)] + " ")(point_.x)
                    }
                    //year
                    return equal(note_[0].split("/")[0])(year) /*&& equal(note_[1])(point_.name)*/
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

                                if( this.matchNote(nt)(pt)(chart.model.series[series].name)) {
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
                identyear =>
                lineIndex =>
                mstName =>
                mstColor =>
                series =>
                ajaxPost('php/readNote.php')({nameDB, mstID, type, identyear, lineIndex})
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
                line_index =>
                ajaxPost('php/saveNote.php')(
                    { nameDB
                    , ins : this.noteExists(ident)(mstID) ? "save" : "new"
                    , ident
                    , mstID
                    , bemerkung
                    , type,
                    line_index
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
//delete flag data
$(document).on("click",".deleteButton",function() {
    let id = this.id;
    $(this).parent().remove();
       $.ajax({
        type : "POST",
        url : 'php/deleteNote.php',
        async: false,
        dataType: 'json',
        data: {
            id: id,
            nameDB: sessionStorage.getItem("nameDB")
        },
        fail: function() {
            alert("failed!!")
        },
        success: function(a) {
            window.location.reload();
        }
    });
});