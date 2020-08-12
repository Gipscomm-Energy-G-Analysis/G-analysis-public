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
        }
    );
