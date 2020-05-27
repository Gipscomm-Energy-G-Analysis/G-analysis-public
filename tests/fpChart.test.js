
const test = require('tape');

const jquery = require('../js/jquery-3.1.1.js');

const core = require('../js/fpCore.js');

const chart = require('../js/fpChart.js');

test('function note : Should return a valid html-string.', function (t) {

    t.comment("#");

    t.plan(6);

    const testSpacePos =
        [{ident: "2018/10/10/10:00"
        , mst: "M124"
        , color: "#E94649"
        , note: "Only those whose curiosity is almost obsessive will be able to look behind the curtain!!"
        },
        {ident: "2018/10/10/08:00"
        , mst: "Mst-Strom-Gesamt"
        , color: "#F6B53F"
        , note: "Be yourself; everyone else is already taken."
        },
        {ident: "2018/10/03"
        , mst: "Mst-KM 2 H8"
        , color: "#B5D3FF"
        , note: "Less is more when more less is!"
        }];

    const testSpaceNeg =
        [{ident: "2006/03/02"
        , mst: "Mst-SGM 803"
        , color: "#6FAAB0"
        , note: "Darkness cannot drive out darkness: only light can do that. Hate cannot drive out hate: only love can do that."
        },
        {ident: "2018/10/10/18:00"
        , mst: "M-SP-07-M9"
        , color: "#b4dce4"
        , note: "Imperfection is beauty, madness is genius and it's better to be absolutely ridiculous than absolutely boring."
        },
        {ident: "2018/07/11"
        , mst: "M-SP-13-M15"
        , color: "#b4c4e4"
        , note: "There are only two ways to live your life. One is as though nothing is a miracle. The other is as though everything is a miracle."
        }];

    const resultPos =
        testSpacePos
        .map(
            a => chart.note (a.ident) (a.mst) (a.color) (a.note)
        );

    const resultNeg =
        testSpaceNeg
        .map(
            a => chart.note (a.ident) (a.mst) (a.color) (a.note)
        );

    const expectedPos =
        [ "<div class='bem'><image src='images/icons/notepad.svg' style='height:18px;width:18px;'/><label style='margin-right:10px;'> &nbsp;2018/10/10/10:00 </label><label style='margin-right:10px;color:#E94649'>M124 </label><label>Only those whose curiosity is almost obsessive will be able to look behind the curtain!! </label></div>"
        , "<div class='bem'><image src='images/icons/notepad.svg' style='height:18px;width:18px;'/><label style='margin-right:10px;'> &nbsp;2018/10/10/08:00 </label><label style='margin-right:10px;color:#F6B53F'>Mst-Strom-Gesamt </label><label>Be yourself; everyone else is already taken. </label></div>"
        , "<div class='bem'><image src='images/icons/notepad.svg' style='height:18px;width:18px;'/><label style='margin-right:10px;'> &nbsp;2018/10/03 </label><label style='margin-right:10px;color:#B5D3FF'>Mst-KM 2 H8 </label><label>Less is more when more less is! </label></div>"
        ];

    const expectedNeg =
        [ "<div class='bem'><image src='images/icons/notepad.svg' style='height:18px;width:18px;'/><label style='margin-right:10px;'> &nbsp;206/03/02 </label><label style='margin-right:10px;color:#6FAAB0'>Mst-SGM 803 </label><label>Darkness cannot drive out darkness: only light can do that. Hate cannot drive out hate: only love can do that. </label></div>"
        , "<div class='bem'><image src='images/icons/notepad.svg' style='height:18px;width:18px;'/><label style='margin-right:10px;'> &nbsp;2018/10/10/18:00 </label><label style='margin-right:10px;color:#b4dce4'> </label><label>Imperfection is beauty, madness is genius and it's better to be absolutely ridiculous than absolutely boring. </label></div>"
        , "<div class='bem'><image src='images/icons/notepad.svg' style='height:18px;width:18px;'/><label style='margin-right:10px;'> &nbsp;2018/07/11 </label><label style='margin-right:10px;color:#99E8A6'>M-SP-13-M15 </label><label>There are only two ways to live your life. One is as though nothing is a miracle. The other is as though everything is a miracle. </label></div>"
        ];

        resultPos
        .forEach(
            (a, i) => t.deepEqual(a, expectedPos[i])
        );

        resultNeg
        .forEach(
            (a, i) => t.notDeepEqual(a, expectedNeg[i])
        );

        t.comment("#");
        t.comment("#");

    t.end();
});

test('function formatDate : Should prepend a zero if val below 10.', function (t) {

    t.comment("#");

    t.plan(6);

    t.deepEqual(chart.formatDate("1"), "01");
    t.deepEqual(chart.formatDate("5"), "05");
    t.deepEqual(chart.formatDate("10"), "10");

    t.notDeepEqual(chart.formatDate("1"), "1");
    t.notDeepEqual(chart.formatDate("5"), 5);
    t.notDeepEqual(chart.formatDate("10"), "100");

    t.comment("#");
    t.comment("#");

    t.end();
});

test('function chooseFlag : Should parse a hex color-code to plain text.', function (t) {

    t.comment("#");

    t.plan(6);

    const colors =
       () =>
           [ {hex: "#E94649", name: "Red"}
           , {hex: "#F6B53F", name: "Yellow"}
           , {hex: "#6FAAB0", name: "Blue"}
           ]


    t.deepEqual(chart.chooseFlag(colors()[0].hex), "Red");
    t.deepEqual(chart.chooseFlag(colors()[1].hex), "Yellow");
    t.deepEqual(chart.chooseFlag(colors()[2].hex), "Blue");

    t.notDeepEqual(chart.chooseFlag(colors()[2].hex), "Red");
    t.notDeepEqual(chart.chooseFlag(colors()[0].hex), "Blue");
    t.notDeepEqual(chart.chooseFlag(colors()[1].hex), "orange");

    t.comment("#");
    t.comment("#");

    t.end();
});

test('function updateChart : Should update charts with new graphs.', function (t) {

    const expectedInput =
        [ {"name":"M124","x":"00:00","y":36.11}
        , {"name":"M124","x":"01:00","y":34}
        , {"name":"M124","x":"02:00","y":28.48}
        , {"name":"M124","x":"03:00","y":36.16}
        , {"name":"M124","x":"04:00","y":34.55}
        , {"name":"M124","x":"05:00","y":36.21}
        , {"name":"M124","x":"06:00","y":36.16}
        , {"name":"M124","x":"07:00","y":36.22}
        , {"name":"M124","x":"08:00","y":36.22}
        , {"name":"M124","x":"09:00","y":36.18}
        , {"name":"M124","x":"10:00","y":36.17}
        , {"name":"M124","x":"11:00","y":36.19}
        , {"name":"M124","x":"12:00","y":36.13}
        , {"name":"M124","x":"13:00","y":36.07}
        , {"name":"M124","x":"14:00","y":36.1}
        , {"name":"M124","x":"15:00","y":35.14}
        , {"name":"M124","x":"16:00","y":36.12}
        , {"name":"M124","x":"17:00","y":20.93}
        , {"name":"M124","x":"18:00","y":19.34}
        , {"name":"M124","x":"19:00","y":36.11}
        , {"name":"M124","x":"20:00","y":36.09}
        , {"name":"M124","x":"21:00","y":36.09}
        , {"name":"M124","x":"22:00","y":36.07}
        , {"name":"M124","x":"23:00","y":36.06}
        ];

    const expectedOutput =
        [ {"name":"M124","x":"00:00","y":36.11}
        , {"name":"M124","x":"01:00","y":34}
        , {"name":"M124","x":"02:00","y":28.48}
        , {"name":"M124","x":"03:00","y":36.16}
        , {"name":"M124","x":"04:00","y":34.55}
        , {"name":"M124","x":"05:00","y":36.21}
        , {"name":"M124","x":"06:00","y":36.16}
        , {"name":"M124","x":"07:00","y":36.22}
        , {"name":"M124","x":"08:00","y":36.22}
        , {"name":"M124","x":"09:00","y":36.18}
        , {"name":"M124","x":"10:00","y":36.17}
        , {"name":"M124","x":"11:00","y":36.19}
        , {"name":"M124","x":"12:00","y":36.13}
        , {"name":"M124","x":"13:00","y":36.07}
        , {"name":"M124","x":"14:00","y":36.1}
        , {"name":"M124","x":"15:00","y":35.14}
        , {"name":"M124","x":"16:00","y":36.12}
        , {"name":"M124","x":"17:00","y":20.93}
        , {"name":"M124","x":"18:00","y":19.34}
        , {"name":"M124","x":"19:00","y":36.11}
        , {"name":"M124","x":"20:00","y":36.09}
        , {"name":"M124","x":"21:00","y":36.09}
        , {"name":"M124","x":"22:00","y":36.07}
        , {"name":"M124","x":"23:00","y":36.06}
        ];


    const expectedPosName =
        "M125"

    const expectedNeg =
        [ "<div class='bem'><image src='images/icons/notepad.svg' style='height:18px;width:18px;'/><label style='margin-right:10px;'> &nbsp;206/03/02 </label><label style='margin-right:10px;color:#6FAAB0'>Mst-SGM 803 </label><label>Darkness cannot drive out darkness: only light can do that. Hate cannot drive out hate: only love can do that. </label></div>"
        , "<div class='bem'><image src='images/icons/notepad.svg' style='height:18px;width:18px;'/><label style='margin-right:10px;'> &nbsp;2018/10/10/18:00 </label><label style='margin-right:10px;color:#b4dce4'> </label><label>Imperfection is beauty, madness is genius and it's better to be absolutely ridiculous than absolutely boring. </label></div>"
        , "<div class='bem'><image src='images/icons/notepad.svg' style='height:18px;width:18px;'/><label style='margin-right:10px;'> &nbsp;2018/07/11 </label><label style='margin-right:10px;color:#99E8A6'>M-SP-13-M15 </label><label>There are only two ways to live your life. One is as though nothing is a miracle. The other is as though everything is a miracle. </label></div>"
        ];

    t.comment("#");

    t.plan(6);


    t.deepEqual(chart.updateChart(expectedPos)(expectedPosName));
    t.deepEqual(chart.updateChart(colors()[1].hex), "Yellow");
    t.deepEqual(chart.updateChart(colors()[2].hex), "Blue");

    t.notDeepEqual(chart.chooseFlag(colors()[2].hex), "Red");
    t.notDeepEqual(chart.chooseFlag(colors()[0].hex), "Blue");
    t.notDeepEqual(chart.chooseFlag(colors()[1].hex), "orange");

    t.comment("#");
    t.comment("#");

    t.end();
});
