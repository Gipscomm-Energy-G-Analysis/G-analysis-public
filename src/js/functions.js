/**
*
*  Secure Hash Algorithm (SHA256)
*  http://www.webtoolkit.info/
*
*  Original code by Angel Marin, Paul Johnston.
*
**/

function SHA256(s) {

    let chrsz   = 8;
    let hexcase = 0;

    function safe_add (x, y) {
        let lsw = (x & 0xFFFF) + (y & 0xFFFF);
        let msw = (x >> 16) + (y >> 16) + (lsw >> 16);
        return (msw << 16) | (lsw & 0xFFFF);
    }

    function S (X, n) { return ( X >>> n ) | (X << (32 - n)); }
    function R (X, n) { return ( X >>> n ); }
    function Ch(x, y, z) { return ((x & y) ^ ((~x) & z)); }
    function Maj(x, y, z) { return ((x & y) ^ (x & z) ^ (y & z)); }
    function Sigma0256(x) { return (S(x, 2) ^ S(x, 13) ^ S(x, 22)); }
    function Sigma1256(x) { return (S(x, 6) ^ S(x, 11) ^ S(x, 25)); }
    function Gamma0256(x) { return (S(x, 7) ^ S(x, 18) ^ R(x, 3)); }
    function Gamma1256(x) { return (S(x, 17) ^ S(x, 19) ^ R(x, 10)); }

    function core_sha256 (m, l) {
        let K = new Array(0x428A2F98, 0x71374491, 0xB5C0FBCF, 0xE9B5DBA5, 0x3956C25B, 0x59F111F1, 0x923F82A4, 0xAB1C5ED5, 0xD807AA98, 0x12835B01, 0x243185BE, 0x550C7DC3, 0x72BE5D74, 0x80DEB1FE, 0x9BDC06A7, 0xC19BF174, 0xE49B69C1, 0xEFBE4786, 0xFC19DC6, 0x240CA1CC, 0x2DE92C6F, 0x4A7484AA, 0x5CB0A9DC, 0x76F988DA, 0x983E5152, 0xA831C66D, 0xB00327C8, 0xBF597FC7, 0xC6E00BF3, 0xD5A79147, 0x6CA6351, 0x14292967, 0x27B70A85, 0x2E1B2138, 0x4D2C6DFC, 0x53380D13, 0x650A7354, 0x766A0ABB, 0x81C2C92E, 0x92722C85, 0xA2BFE8A1, 0xA81A664B, 0xC24B8B70, 0xC76C51A3, 0xD192E819, 0xD6990624, 0xF40E3585, 0x106AA070, 0x19A4C116, 0x1E376C08, 0x2748774C, 0x34B0BCB5, 0x391C0CB3, 0x4ED8AA4A, 0x5B9CCA4F, 0x682E6FF3, 0x748F82EE, 0x78A5636F, 0x84C87814, 0x8CC70208, 0x90BEFFFA, 0xA4506CEB, 0xBEF9A3F7, 0xC67178F2);
        let HASH = new Array(0x6A09E667, 0xBB67AE85, 0x3C6EF372, 0xA54FF53A, 0x510E527F, 0x9B05688C, 0x1F83D9AB, 0x5BE0CD19);
        let W = new Array(64);
        let a, b, c, d, e, f, g, h, i, j;
        let T1, T2;

        m[l >> 5] |= 0x80 << (24 - l % 32);
        m[((l + 64 >> 9) << 4) + 15] = l;

        for ( let i = 0; i<m.length; i+=16 ) {
            a = HASH[0];
            b = HASH[1];
            c = HASH[2];
            d = HASH[3];
            e = HASH[4];
            f = HASH[5];
            g = HASH[6];
            h = HASH[7];

            for ( let j = 0; j<64; j++) {
                if (j < 16) W[j] = m[j + i];
                else W[j] = safe_add(safe_add(safe_add(Gamma1256(W[j - 2]), W[j - 7]), Gamma0256(W[j - 15])), W[j - 16]);

                T1 = safe_add(safe_add(safe_add(safe_add(h, Sigma1256(e)), Ch(e, f, g)), K[j]), W[j]);
                T2 = safe_add(Sigma0256(a), Maj(a, b, c));

                h = g;
                g = f;
                f = e;
                e = safe_add(d, T1);
                d = c;
                c = b;
                b = a;
                a = safe_add(T1, T2);
            }

            HASH[0] = safe_add(a, HASH[0]);
            HASH[1] = safe_add(b, HASH[1]);
            HASH[2] = safe_add(c, HASH[2]);
            HASH[3] = safe_add(d, HASH[3]);
            HASH[4] = safe_add(e, HASH[4]);
            HASH[5] = safe_add(f, HASH[5]);
            HASH[6] = safe_add(g, HASH[6]);
            HASH[7] = safe_add(h, HASH[7]);
        }
        return HASH;
    }

    function str2binb (str) {
        let bin = Array();
        let mask = (1 << chrsz) - 1;
        for(let i = 0; i < str.length * chrsz; i += chrsz) {
            bin[i>>5] |= (str.charCodeAt(i / chrsz) & mask) << (24 - i%32);
        }
        return bin;
    }

    function Utf8Encode(string) {
        string = string.replace(/\r\n/g,"\n");
        let utftext = "";

        for (let n = 0; n < string.length; n++) {

            let c = string.charCodeAt(n);

            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }

        return utftext;
    }

    function binb2hex (binarray) {
        let hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
        let str = "";
        for(let i = 0; i < binarray.length * 4; i++) {
            str += hex_tab.charAt((binarray[i>>2] >> ((3 - i%4)*8+4)) & 0xF) +
            hex_tab.charAt((binarray[i>>2] >> ((3 - i%4)*8  )) & 0xF);
        }
        return str;
    }

    s = Utf8Encode(s);
    return binb2hex(core_sha256(str2binb(s), s.length * chrsz));
}

function getHash(string){
    return SHA256(string);
}

const clearTable =
    tbl =>
    tbl.clear().draw()

const intoTable =		// CHANGE: added fn to write data into any DataTable 20.05.2020
    tbl =>
    data =>
    data
    .forEach(a => tbl.row.add(a).draw())

const disableBtn =
    idBtn => {
        $(idBtn).text("Speichert...")
        $(idBtn).prop("disabled","disabled")
        return `Speichert... ->${idBtn}`
    }

const enableBtn =
    idBtn => {
        $(idBtn).prop("disabled","")
        $(idBtn).text("Speichern")
        return `Speichern ->${idBtn}`
    }

try {
    var dateTime = function(a) {
            var b = new Date(1970, 0, 1, 0, 0, 0);
            b.setSeconds(a);
            return {
                year: b.getFullYear(),
                month: b.getMonth() + 1,
                day: b.getDate(),
                hours: b.getHours(),
                minutes: b.getMinutes(),
                seconds: b.getSeconds()
            }
        },
        getLastID = function(a) {
            return new Promise(function(b, e) {
                $.ajax({
                    type: "POST",
                    async: !0,
                    url: "php/lastID.php",
                    data: {
                        nameDB: $("#nameDB").val(),
                        ins: a
                    },
                    fail: function() {
                        alert("failed!!")
                    },
                    success: function(c) {
                        switch (c) {
                            case "error":
                                e();
                                break;
                            default:
                                switch (c = JSON.parse(c), a) {
                                    case "frm":
                                        b(c[0].frm_ID);
                                        break;
                                    default:
                                        e("function getLastID(ins, nrFormel): the instance-type wasn't set!")
                                }
                        }
                    }
                })
            })
        },
        transformDate = function(a) {
            a = a.split(".");
            return a[2] + "-" + a[1] + "-" + a[0]
        },
        logToConsole = function(a, b, e) {
            console.log("\n        " + a + "\n        ---------------------------------------\n        " + b + "\n        " + e + "\n        ---------------------------------------\n        ")
        },
        mkDpCp = function(a, b) {
            var e = !1,
                c = b.length,
                g = null;
            switch (a) {
                case ObjectCopyMode.SHALLOW:
                case ObjectCopyMode.FUSION_SHALLOW:
                    e = !1;
                    break;
                case ObjectCopyMode.DEEP:
                case ObjectCopyMode.FUSION_DEEP:
                    e = !0
            }
            if (a == ObjectCopyMode.SHALLOW || ObjectCopyMode.DEEP) g = $.extend(e, {}, b[0]);
            else if (a == ObjectCopyMode.FUSION_SHALLOW || ObjectCopyMode.FUSION_DEEP)
                for (var f = 0; f < c; f++) g = $.extend(e, {}, g, obj[f]);
            return $.extend(e, {}, g)
        };

        const toGermanDate =
            date =>
            `RIGHT(LEFT(${date}, 10), 2) + '.' + RIGHT(LEFT(${date}, 7), 2) + '.' + LEFT(${date}, 4) + ' ' + RIGHT(LEFT(${date}, 22), 11)`

        chartInNewWindowKnz = function() {
            sessionStorage.setItem("nameDB", $("#nameDB").val());
            sessionStorage.setItem("chartType", $("#typDiagKnz").val());
            sessionStorage.setItem("timeSpan", $("#letzteAuftrDiagKnz").val());
            sessionStorage.setItem("knzID_1", $("#knzIDDiag1").val());
            sessionStorage.setItem("knzID_2", $("#knzIDDiag2").val());
            sessionStorage.setItem("knzID_3", $("#knzIDDiag3").val());
            sessionStorage.setItem("knzName_1", $("#knzDiag1").val());
            sessionStorage.setItem("knzName_2", $("#knzDiag2").val());
            sessionStorage.setItem("knzName_3", $("#knzDiag3").val());
            window.open("chartKennzahlenMst.html", "_blank")
        },
        gespeicherteDiagrammeAuswahllisteErstellen2 = function() {
            var a = "",
                b = "",
                e = "",
                a = $("#nameDB").val(),
                c = $("#mstIDDiag").val(),
                g = $("#mstDiag").val(),
                f = "",
                h = $("#year1Diag").val(),
                q = $("#year2Diag").val(),
                r = $("#year3Diag").val(),
                x = $("#month1Diag").val(),
                u = $("#month2Diag").val(),
                t = $("#month3Diag").val(),
                w = $("#day1Diag").val(),
                y = $("#day2Diag").val(),
                z = $("#day3Diag").val(),
                p = $("#diagJahr").val(),
                A = $("#diagMonat").val(),
                B = $("#diagTag").val(),
                C = $("#vonDiag").val(),
                D = $("#bisDiag").val(),
                v = $("#zeitrDiag2").val(),
                F = $("#typDiag2").val(),
                G = $("#avgDiag2").is(":checked"),
                f = "001_heco" === a || "002_badber" === a || "003_tauchzor" === a ? "value" : "power";
            if ("" != r) {
                a = "SELECT nameMSt AS Name, CONVERT(varchar(20), time_de, 104) + ' ' + CONVERT(varchar(20), time_de, 108) AS Time, phase AS Phase, " +
                    f + " AS Value, wandlungsfaktorMsm AS ConvFactor FROM data_value_15m INNER JOIN channel ON data_value_15m.channel_id = channel.channel_id ";
                a += "INNER JOIN messmittel ";
                a += "ON data_value_15m.channel_id = messmittel.kanal1Msm OR data_value_15m.channel_id = messmittel.kanal2Msm OR data_value_15m.channel_id = messmittel.kanal3Msm ";
                a += "INNER JOIN messstellen ";
                a += "ON messmittel.mst_ID = messstellen.mst_ID ";
                a += "WHERE messstellen.mst_ID = '" + c + "' ";
                if ("Benutzerdefinierter Zeitraum" == $("#btnZeitrmDiag").text())
                    if (a +=
                        "AND LEFT(CONVERT(varchar(20), time_de, 120), 4) = '" + h + "' ", "Tag" == v || "Tag 15min" == v) a += "AND RIGHT(LEFT(CONVERT(varchar(20), time_de, 120), 7), 2) = '" + x + "' ", a += "AND RIGHT(LEFT(CONVERT(varchar(20), time_de, 120), 10), 2) = '" + w + "' ";
                    else {
                        if ("Monat" == v || "Monat 15min" == v) a += "AND RIGHT(LEFT(CONVERT(varchar(20), time_de, 120), 7), 2) = '" + x + "' "
                    }
                else a += "AND time_de BETWEEN '" + transformDate(C) + "' AND '" + transformDate(D) + "' ";
                a += "ORDER by time_de ";
                b = "SELECT nameMSt AS Name, CONVERT(varchar(20), time_de, 104) + ' ' + CONVERT(varchar(20), time_de, 108) AS Time, phase AS Phase, " +
                    f + " AS Value, wandlungsfaktorMsm AS ConvFactor FROM data_value_15m INNER JOIN channel ON data_value_15m.channel_id = channel.channel_id ";
                b += "INNER JOIN messmittel ";
                b += "ON data_value_15m.channel_id = messmittel.kanal1Msm OR data_value_15m.channel_id = messmittel.kanal2Msm OR data_value_15m.channel_id = messmittel.kanal3Msm ";
                b += "INNER JOIN messstellen ";
                b += "ON messmittel.mst_ID = messstellen.mst_ID ";
                b += "WHERE messstellen.mst_ID = '" + c + "' ";
                if ("Benutzerdefinierter Zeitraum" == $("#btnZeitrmDiag").text())
                    if (b +=
                        "AND LEFT(CONVERT(varchar(20), time_de, 120), 4) = '" + q + "' ", "Tag" == v || "Tag 15min" == v) b += "AND RIGHT(LEFT(CONVERT(varchar(20), time_de, 120), 7), 2) = '" + u + "' ", b += "AND RIGHT(LEFT(CONVERT(varchar(20), time_de, 120), 10), 2) = '" + y + "' ";
                    else {
                        if ("Monat" == v || "Monat 15min" == v) b += "AND RIGHT(LEFT(CONVERT(varchar(20), time_de, 120), 7), 2) = '" + u + "' "
                    }
                else b += "AND time_de BETWEEN '" + transformDate(C) + "' AND '" + transformDate(D) + "' ";
                b += "ORDER by time_de ";
                e = "SELECT nameMSt AS Name, CONVERT(varchar(20), time_de, 104) + ' ' + CONVERT(varchar(20), time_de, 108) AS Time, phase AS Phase, " +
                    f + " AS Value, wandlungsfaktorMsm AS ConvFactor FROM data_value_15m INNER JOIN channel ON data_value_15m.channel_id = channel.channel_id ";
                e += "INNER JOIN messmittel ";
                e += "ON data_value_15m.channel_id = messmittel.kanal1Msm OR data_value_15m.channel_id = messmittel.kanal2Msm OR data_value_15m.channel_id = messmittel.kanal3Msm ";
                e += "INNER JOIN messstellen ";
                e += "ON messmittel.mst_ID = messstellen.mst_ID ";
                e += "WHERE messstellen.mst_ID = '" + c + "' ";
                if ("Benutzerdefinierter Zeitraum" == $("#btnZeitrmDiag").text())
                    if (e +=
                        "AND LEFT(CONVERT(varchar(20), time_de, 120), 4) = '" + r + "' ", "Tag" == v || "Tag 15min" == v) e += "AND RIGHT(LEFT(CONVERT(varchar(20), time_de, 120), 7), 2) = '" + t + "' ", e += "AND RIGHT(LEFT(CONVERT(varchar(20), time_de, 120), 10), 2) = '" + z + "' ";
                    else {
                        if ("Monat" == v || "Monat 15min" == v) e += "AND RIGHT(LEFT(CONVERT(varchar(20), time_de, 120), 7), 2) = '" + t + "' "
                    }
                else e += "AND time_de BETWEEN '" + transformDate(C) + "' AND '" + transformDate(D) + "' ";
                e += "ORDER by time_de "
            } else if ("" != q) {
                a = "SELECT nameMSt AS Name, CONVERT(varchar(20), time_de, 104) + ' ' + CONVERT(varchar(20), time_de, 108) AS Time, phase AS Phase, " +
                    f + " AS Value, wandlungsfaktorMsm AS ConvFactor FROM data_value_15m INNER JOIN channel ON data_value_15m.channel_id = channel.channel_id ";
                a += "INNER JOIN messmittel ";
                a += "ON data_value_15m.channel_id = messmittel.kanal1Msm OR data_value_15m.channel_id = messmittel.kanal2Msm OR data_value_15m.channel_id = messmittel.kanal3Msm ";
                a += "INNER JOIN messstellen ";
                a += "ON messmittel.mst_ID = messstellen.mst_ID ";
                a += "WHERE messstellen.mst_ID = '" + c + "' ";
                if ("Benutzerdefinierter Zeitraum" == $("#btnZeitrmDiag").text())
                    if (a +=
                        "AND LEFT(CONVERT(varchar(20), time_de, 120), 4) = '" + h + "' ", "Tag" == v || "Tag 15min" == v) a += "AND RIGHT(LEFT(CONVERT(varchar(20), time_de, 120), 7), 2) = '" + x + "' ", a += "AND RIGHT(LEFT(CONVERT(varchar(20), time_de, 120), 10), 2) = '" + w + "' ";
                    else {
                        if ("Monat" == v || "Monat 15min" == v) a += "AND RIGHT(LEFT(CONVERT(varchar(20), time_de, 120), 7), 2) = '" + x + "' "
                    }
                else a += "AND time_de BETWEEN '" + transformDate(C) + "' AND '" + transformDate(D) + "' ";
                a += "ORDER by time_de ";
                b = "SELECT nameMSt AS Name, CONVERT(varchar(20), time_de, 104) + ' ' + CONVERT(varchar(20), time_de, 108) AS Time, phase AS Phase, " +
                    f + " AS Value, wandlungsfaktorMsm AS ConvFactor FROM data_value_15m INNER JOIN channel ON data_value_15m.channel_id = channel.channel_id ";
                b += "INNER JOIN messmittel ";
                b += "ON data_value_15m.channel_id = messmittel.kanal1Msm OR data_value_15m.channel_id = messmittel.kanal2Msm OR data_value_15m.channel_id = messmittel.kanal3Msm ";
                b += "INNER JOIN messstellen ";
                b += "ON messmittel.mst_ID = messstellen.mst_ID ";
                b += "WHERE messstellen.mst_ID = '" + c + "' ";
                if ("Benutzerdefinierter Zeitraum" == $("#btnZeitrmDiag").text())
                    if (b +=
                        "AND LEFT(CONVERT(varchar(20), time_de, 120), 4) = '" + q + "' ", "Tag" == v || "Tag 15min" == v) b += "AND RIGHT(LEFT(CONVERT(varchar(20), time_de, 120), 7), 2) = '" + u + "' ", b += "AND RIGHT(LEFT(CONVERT(varchar(20), time_de, 120), 10), 2) = '" + y + "' ";
                    else {
                        if ("Monat" == v || "Monat 15min" == v) b += "AND RIGHT(LEFT(CONVERT(varchar(20), time_de, 120), 7), 2) = '" + u + "' "
                    }
                else b += "AND time_de BETWEEN '" + transformDate(C) + "' AND '" + transformDate(D) + "' ";
                b += "ORDER by time_de "
            } else {
                a = "SELECT nameMSt AS Name, CONVERT(varchar(20), time_de, 104) + ' ' + CONVERT(varchar(20), time_de, 108) AS Time, phase AS Phase, " +
                    f + " AS Value FROM data_value_15m INNER JOIN channel ON data_value_15m.channel_id = channel.channel_id ";
                a += "INNER JOIN messmittel ";
                a += "ON data_value_15m.channel_id = messmittel.kanal1Msm OR data_value_15m.channel_id = messmittel.kanal2Msm OR data_value_15m.channel_id = messmittel.kanal3Msm ";
                a += "INNER JOIN messstellen ";
                a += "ON messmittel.mst_ID = messstellen.mst_ID ";
                a += "WHERE messstellen.mst_ID = '" + c + "' ";
                if ("Benutzerdefinierter Zeitraum" == $("#btnZeitrmDiag").text())
                    if (a += "AND LEFT(CONVERT(varchar(20), time_de, 120), 4) = '" +
                        h + "' ", "Tag" == v || "Tag 15min" == v) a += "AND RIGHT(LEFT(CONVERT(varchar(20), time_de, 120), 7), 2) = '" + x + "' ", a += "AND RIGHT(LEFT(CONVERT(varchar(20), time_de, 120), 10), 2) = '" + w + "' ";
                    else {
                        if ("Monat" == v || "Monat 15min" == v) a += "AND RIGHT(LEFT(CONVERT(varchar(20), time_de, 120), 7), 2) = '" + x + "' "
                    }
                else a += "AND time_de BETWEEN '" + transformDate(C) + "' AND '" + transformDate(D) + "' ";
                a += "ORDER by time_de "
            }
            sessionStorage.setItem("year", p);
            sessionStorage.setItem("month", A);
            sessionStorage.setItem("day", B);
            sessionStorage.setItem("from",
                C);
            sessionStorage.setItem("to", D);
            sessionStorage.setItem("chartType", F);
            sessionStorage.setItem("displayMean", G);
            sessionStorage.setItem("nameMst", g);
            sessionStorage.setItem("year_1", h);
            sessionStorage.setItem("year_2", q);
            sessionStorage.setItem("year_3", r);
            sessionStorage.setItem("month_1", x);
            sessionStorage.setItem("month_2", u);
            sessionStorage.setItem("month_3", t);
            sessionStorage.setItem("day_1", w);
            sessionStorage.setItem("day_2", y);
            sessionStorage.setItem("day_3", z);
            sessionStorage.setItem("queryString_1",
                a);
            sessionStorage.setItem("queryString_2", b);
            sessionStorage.setItem("queryString_3", e);
            setTimeout(function() {
                "Jahr" == v ? window.open("chartYearLoad.html", "_blank") : "Monat" == v ? window.open("chartMonthLoad.html", "_blank") : "Monat 15min" == v ? window.open("chartMonth15minLoad.html", "_blank") : "Tag" == v ? window.open("chartDayLoad.html", "_blank") : "Tag 15min" == v ? window.open("chartDay15minLoad.html", "_blank") : window.open("chartBenDef15minLoad.html", "_blank")
            }, 2E3)
        };
        function chartInNewWindow2(){
          let queryString_1 = "",
          queryString_2 = "",
          queryString_3 = "",
          nameDB = $("#nameDB").val(),
          idMst = $("#mstIDDiag").val(),
          nameMst = $("#mstDiag").val(),
          valName = "",
          jahr_1 = $("#year1Diag").val(),
          jahr_2 = $("#year2Diag").val(),
          jahr_3 = $("#year3Diag").val(),
          monat_1 = $("#month1Diag").val(),
          monat_2 = $("#month2Diag").val(),
          monat_3 = $("#month3Diag").val(),
          tag_1 = $("#day1Diag").val(),
          tag_2 = $("#day2Diag").val(),
          tag_3 = $("#day3Diag").val(),
          jahr = $("#diagJahr").val(),
          monat = $("#diagMonat").val(),
          tag = $("#diagTag").val(),
          von = $("#vonDiag").val(),
          bis = $("#bisDiag").val(),
          timeInterval = $("#zeitrDiag2").val(),
          chartType = $("#typDiag2").val(),
          displayMean = $("#avgDiag2").is(":checked"),
          vers = 0;
          valName = "power";

          if(jahr_3 != "") {

            // First MeasurementPoint
            queryString_1 = "SELECT nameMSt AS Name, CONVERT(varchar(20), time_de, 104) + ' ' + CONVERT(varchar(20), time_de, 108) AS Time, phase AS Phase, " + valName + " AS Value, wandlungsfaktorMsm AS ConvFactor FROM data_value_15m ";
            queryString_1 += "INNER JOIN channel ";
            queryString_1 += "ON data_value_15m.channel_id = channel.channel_id ";
            queryString_1 += "INNER JOIN messmittel ";
            queryString_1 += "ON data_value_15m.channel_id = messmittel.kanal1Msm OR data_value_15m.channel_id = messmittel.kanal2Msm OR data_value_15m.channel_id = messmittel.kanal3Msm ";
            queryString_1 += "INNER JOIN messstellen ";
            queryString_1 += "ON messmittel.mst_ID = messstellen.mst_ID ";
            queryString_1 += "WHERE messstellen.mst_ID = '" + idMst + "' ";
            if ($("#btnZeitrmDiag").text() == "Benutzerdefinierter Zeitraum") {
              queryString_1 += "AND LEFT(CONVERT(varchar(20), time_de, 120), 4) = '" + jahr_1 + "' ";
              if(timeInterval == "Tag" || timeInterval == "Tag 15min"){
                queryString_1 += "AND RIGHT(LEFT(CONVERT(varchar(20), time_de, 120), 7), 2) = '" + monat_1 + "' ";
                queryString_1 += "AND RIGHT(LEFT(CONVERT(varchar(20), time_de, 120), 10), 2) = '" + tag_1 + "' ";
              }
              else if (timeInterval == "Monat" || timeInterval == "Monat 15min") {
                queryString_1 += "AND RIGHT(LEFT(CONVERT(varchar(20), time_de, 120), 7), 2) = '" + monat_1 + "' ";
              }
            }
            else {
              queryString_1 += "AND time_de BETWEEN '" + transformDate(von) + "' AND '" + transformDate(bis) + "' ";
            }
            queryString_1 += "ORDER by time_de ";

            // Second MeasurementPoint
            queryString_2 = "SELECT nameMSt AS Name, CONVERT(varchar(20), time_de, 104) + ' ' + CONVERT(varchar(20), time_de, 108) AS Time, phase AS Phase, " + valName + " AS Value, wandlungsfaktorMsm AS ConvFactor FROM data_value_15m ";
            queryString_2 += "INNER JOIN channel ";
            queryString_2 += "ON data_value_15m.channel_id = channel.channel_id ";
            queryString_2 += "INNER JOIN messmittel ";
            queryString_2 += "ON data_value_15m.channel_id = messmittel.kanal1Msm OR data_value_15m.channel_id = messmittel.kanal2Msm OR data_value_15m.channel_id = messmittel.kanal3Msm ";
            queryString_2 += "INNER JOIN messstellen ";
            queryString_2 += "ON messmittel.mst_ID = messstellen.mst_ID ";
            queryString_2 += "WHERE messstellen.mst_ID = '" + idMst + "' ";
            if ($("#btnZeitrmDiag").text() == "Benutzerdefinierter Zeitraum") {
              queryString_2 += "AND LEFT(CONVERT(varchar(20), time_de, 120), 4) = '" + jahr_2 + "' ";
              if(timeInterval == "Tag" || timeInterval == "Tag 15min"){
                queryString_2 += "AND RIGHT(LEFT(CONVERT(varchar(20), time_de, 120), 7), 2) = '" + monat_2 + "' ";
                queryString_2 += "AND RIGHT(LEFT(CONVERT(varchar(20), time_de, 120), 10), 2) = '" + tag_2 + "' ";
              }
              else if (timeInterval == "Monat" || timeInterval == "Monat 15min") {
                queryString_2 += "AND RIGHT(LEFT(CONVERT(varchar(20), time_de, 120), 7), 2) = '" + monat_2 + "' ";
              }
            }
            else {
              queryString_2 += "AND time_de BETWEEN '" + transformDate(von) + "' AND '" + transformDate(bis) + "' ";
            }
            queryString_2 += "ORDER by time_de ";

            // Third MeasurementPoint
            queryString_3 = "SELECT nameMSt AS Name, CONVERT(varchar(20), time_de, 104) + ' ' + CONVERT(varchar(20), time_de, 108) AS Time, phase AS Phase, " + valName + " AS Value, wandlungsfaktorMsm AS ConvFactor FROM data_value_15m ";
            queryString_3 += "INNER JOIN channel ";
            queryString_3 += "ON data_value_15m.channel_id = channel.channel_id ";
            queryString_3 += "INNER JOIN messmittel ";
            queryString_3 += "ON data_value_15m.channel_id = messmittel.kanal1Msm OR data_value_15m.channel_id = messmittel.kanal2Msm OR data_value_15m.channel_id = messmittel.kanal3Msm ";
            queryString_3 += "INNER JOIN messstellen ";
            queryString_3 += "ON messmittel.mst_ID = messstellen.mst_ID ";
            queryString_3 += "WHERE messstellen.mst_ID = '" + idMst + "' ";
            if ($("#btnZeitrmDiag").text() == "Benutzerdefinierter Zeitraum") {
              queryString_3 += "AND LEFT(CONVERT(varchar(20), time_de, 120), 4) = '" + jahr_3 + "' ";
              if(timeInterval == "Tag" || timeInterval == "Tag 15min"){
                queryString_3 += "AND RIGHT(LEFT(CONVERT(varchar(20), time_de, 120), 7), 2) = '" + monat_3 + "' ";
                queryString_3 += "AND RIGHT(LEFT(CONVERT(varchar(20), time_de, 120), 10), 2) = '" + tag_3 + "' ";
              }
              else if (timeInterval == "Monat" || timeInterval == "Monat 15min") {
                queryString_3 += "AND RIGHT(LEFT(CONVERT(varchar(20), time_de, 120), 7), 2) = '" + monat_3 + "' ";
              }
            }
            else {
              queryString_3 += "AND time_de BETWEEN '" + transformDate(von) + "' AND '" + transformDate(bis) + "' ";
            }
            queryString_3 += "ORDER by time_de ";
          }
          else if (jahr_2 != "") {

            // First MeasurementPoint
            queryString_1 = "SELECT nameMSt AS Name, CONVERT(varchar(20), time_de, 104) + ' ' + CONVERT(varchar(20), time_de, 108) AS Time, phase AS Phase, " + valName + " AS Value, wandlungsfaktorMsm AS ConvFactor FROM data_value_15m ";
            queryString_1 += "INNER JOIN channel ";
            queryString_1 += "ON data_value_15m.channel_id = channel.channel_id ";
            queryString_1 += "INNER JOIN messmittel ";
            queryString_1 += "ON data_value_15m.channel_id = messmittel.kanal1Msm OR data_value_15m.channel_id = messmittel.kanal2Msm OR data_value_15m.channel_id = messmittel.kanal3Msm ";
            queryString_1 += "INNER JOIN messstellen ";
            queryString_1 += "ON messmittel.mst_ID = messstellen.mst_ID ";
            queryString_1 += "WHERE messstellen.mst_ID = '" + idMst + "' ";
            if ($("#btnZeitrmDiag").text() == "Benutzerdefinierter Zeitraum") {
              queryString_1 += "AND LEFT(CONVERT(varchar(20), time_de, 120), 4) = '" + jahr_1 + "' ";
              if(timeInterval == "Tag" || timeInterval == "Tag 15min"){
                queryString_1 += "AND RIGHT(LEFT(CONVERT(varchar(20), time_de, 120), 7), 2) = '" + monat_1 + "' ";
                queryString_1 += "AND RIGHT(LEFT(CONVERT(varchar(20), time_de, 120), 10), 2) = '" + tag_1 + "' ";
              }
              else if (timeInterval == "Monat" || timeInterval == "Monat 15min") {
                queryString_1 += "AND RIGHT(LEFT(CONVERT(varchar(20), time_de, 120), 7), 2) = '" + monat_1 + "' ";
              }
            }
            else {
              queryString_1 += "AND time_de BETWEEN '" + transformDate(von) + "' AND '" + transformDate(bis) + "' ";
            }
            queryString_1 += "ORDER by time_de ";

            // Second MeasurementPoint
            queryString_2 = "SELECT nameMSt AS Name, CONVERT(varchar(20), time_de, 104) + ' ' + CONVERT(varchar(20), time_de, 108) AS Time, phase AS Phase, " + valName + " AS Value, wandlungsfaktorMsm AS ConvFactor FROM data_value_15m ";
            queryString_2 += "INNER JOIN channel ";
            queryString_2 += "ON data_value_15m.channel_id = channel.channel_id ";
            queryString_2 += "INNER JOIN messmittel ";
            queryString_2 += "ON data_value_15m.channel_id = messmittel.kanal1Msm OR data_value_15m.channel_id = messmittel.kanal2Msm OR data_value_15m.channel_id = messmittel.kanal3Msm ";
            queryString_2 += "INNER JOIN messstellen ";
            queryString_2 += "ON messmittel.mst_ID = messstellen.mst_ID ";
            queryString_2 += "WHERE messstellen.mst_ID = '" + idMst + "' ";
            if ($("#btnZeitrmDiag").text() == "Benutzerdefinierter Zeitraum") {
              queryString_2 += "AND LEFT(CONVERT(varchar(20), time_de, 120), 4) = '" + jahr_2 + "' ";
              if(timeInterval == "Tag" || timeInterval == "Tag 15min"){
                queryString_2 += "AND RIGHT(LEFT(CONVERT(varchar(20), time_de, 120), 7), 2) = '" + monat_2 + "' ";
                queryString_2 += "AND RIGHT(LEFT(CONVERT(varchar(20), time_de, 120), 10), 2) = '" + tag_2 + "' ";
              }
              else if (timeInterval == "Monat" || timeInterval == "Monat 15min") {
                queryString_2 += "AND RIGHT(LEFT(CONVERT(varchar(20), time_de, 120), 7), 2) = '" + monat_2 + "' ";
              }
            }
            else {
              queryString_2 += "AND time_de BETWEEN '" + transformDate(von) + "' AND '" + transformDate(bis) + "' ";
            }
            queryString_2 += "ORDER by time_de ";
          }
          else {

            // First MeasurementPoint
            queryString_1 = "SELECT nameMSt AS Name, CONVERT(varchar(20), time_de, 104) + ' ' + CONVERT(varchar(20), time_de, 108) AS Time, phase AS Phase, " + valName + " AS Value FROM data_value_15m ";
            queryString_1 += "INNER JOIN channel ";
            queryString_1 += "ON data_value_15m.channel_id = channel.channel_id ";
            queryString_1 += "INNER JOIN messmittel ";
            queryString_1 += "ON data_value_15m.channel_id = messmittel.kanal1Msm OR data_value_15m.channel_id = messmittel.kanal2Msm OR data_value_15m.channel_id = messmittel.kanal3Msm ";
            queryString_1 += "INNER JOIN messstellen ";
            queryString_1 += "ON messmittel.mst_ID = messstellen.mst_ID ";
            queryString_1 += "WHERE messstellen.mst_ID = '" + idMst + "' ";
            if ($("#btnZeitrmDiag").text() == "Benutzerdefinierter Zeitraum") {
              queryString_1 += "AND LEFT(CONVERT(varchar(20), time_de, 120), 4) = '" + jahr_1 + "' ";
              if(timeInterval == "Tag" || timeInterval == "Tag 15min"){
                queryString_1 += "AND RIGHT(LEFT(CONVERT(varchar(20), time_de, 120), 7), 2) = '" + monat_1 + "' ";
                queryString_1 += "AND RIGHT(LEFT(CONVERT(varchar(20), time_de, 120), 10), 2) = '" + tag_1 + "' ";
              }
              else if (timeInterval == "Monat" || timeInterval == "Monat 15min") {
                queryString_1 += "AND RIGHT(LEFT(CONVERT(varchar(20), time_de, 120), 7), 2) = '" + monat_1 + "' ";
              }
            }
            else {
              queryString_1 += "AND time_de BETWEEN '" + transformDate(von) + "' AND '" + transformDate(bis) + "' ";
            }
            queryString_1 += "ORDER by time_de ";
          }
          vers = 2;
          sessionStorage.setItem("nameDB", $("#nameDB").val());

          sessionStorage.setItem("year", jahr);
          sessionStorage.setItem("month", monat);
          sessionStorage.setItem("day", tag);

          sessionStorage.setItem("from", von);
          sessionStorage.setItem("to", bis);

          sessionStorage.setItem("chartType", chartType);
          sessionStorage.setItem("displayMean", displayMean);

          sessionStorage.setItem("nameMst", nameMst);

          sessionStorage.setItem("year_1", jahr_1);
          sessionStorage.setItem("year_2", jahr_2);
          sessionStorage.setItem("year_3", jahr_3);

          sessionStorage.setItem("month_1", monat_1);
          sessionStorage.setItem("month_2", monat_2);
          sessionStorage.setItem("month_3", monat_3);

          sessionStorage.setItem("day_1", tag_1);
          sessionStorage.setItem("day_2", tag_2);
          sessionStorage.setItem("day_3", tag_3);

          sessionStorage.setItem("queryString_1", queryString_1);
          sessionStorage.setItem("queryString_2", queryString_2);
          sessionStorage.setItem("queryString_3", queryString_3);

          setTimeout(openWindow, 2000);
          function openWindow(){
              if(timeInterval == "Jahr"){
                window.open("chartYear2.html","_blank");
              }
              else if (timeInterval == "Monat") {
                window.open("chartMonth2.html","_blank");
              }
              else if (timeInterval == "Monat 15min") {
                window.open("chartMonth15min2.html","_blank");
              }
              else if (timeInterval == "Tag") {
                window.open("chartDay2.html","_blank");
              }
              else if (timeInterval == "Tag 15min") {
                window.open("chartDay15min2.html","_blank");
              }
              else {
                window.open("chartBenDef15min2.html","_blank");
              }
            }
        };
        chartInNewWindow = function() {
            var a = "",
                b = "",
                e = "",
                a = $("#nameDB").val(),
                c = "power",
                g = $("#mstIDDiag1").val(),
                f = $("#mstIDDiag2").val(),
                h = $("#mstIDDiag3").val(),
                q = $("#mstDiag1").val(),
                qa = $("#mstMessart1").val(),
                r = $("#mstDiag2").val(),
                ra = $("#mstMessart2").val(),
                x = $("#mstDiag3").val(),
                xa = $("#mstMessart3").val(),
                u = $("#diagJahr").val(),
                t = $("#diagMonat").val(),
                w = $("#diagTag").val(),
                y = $("#vonDiag").val(),
                z = $("#bisDiag").val(),
                p = $("#zeitrDiag").val(),
                A = $("#typDiag").val(),
                B = $("#avgDiag").is(":checked");
            sessionStorage.setItem("loadDiag", !1);
            if ("" != h) {
                if(qa === "berechnet") {
                    a = "SELECT mst_ID, Name, " + toGermanDate("Time") + " AS Time, Value, ConvFactor FROM berechneteEnergiedaten "
                    a += "WHERE mst_ID = '" + g + "' "
                    if ("Benutzerdefinierter Zeitraum" == $("#btnZeitrmDiag").text())
                        if (a +=
                            "AND LEFT(CONVERT(varchar(20), Time, 120), 4) = '" + u + "' ", "Tag" == p || "Tag 15min" == p) a += "AND RIGHT(LEFT(CONVERT(varchar(20), Time, 120), 7), 2) = '" + t + "' ", a += "AND RIGHT(LEFT(CONVERT(varchar(20), Time, 120), 10), 2) = '" + w + "' ";
                        else {
                            if ("Monat" == p || "Monat 15min" == p) a += "AND RIGHT(LEFT(CONVERT(varchar(20), Time, 120), 7), 2) = '" + t + "' "
                        }
                    else a += "AND Time BETWEEN '" + transformDate(y) + "' AND '" + transformDate(z) + "' ";
                    a += "ORDER by Time ";
                }
                else {
                    a = "SELECT nameMSt AS Name, CONVERT(varchar(20), time_de, 104) + ' ' + CONVERT(varchar(20), time_de, 108) AS Time, phase AS Phase," +
                    c + " AS Value, wandlungsfaktorMsm AS ConvFactor FROM data_value_15m INNER JOIN channel ON data_value_15m.channel_id = channel.channel_id ";
                    a += "INNER JOIN messmittel ";
                    a += "ON data_value_15m.channel_id = messmittel.kanal1Msm OR data_value_15m.channel_id = messmittel.kanal2Msm OR data_value_15m.channel_id = messmittel.kanal3Msm ";
                    a += "INNER JOIN messstellen ";
                    a += "ON messmittel.mst_ID = messstellen.mst_ID ";
                    a += "WHERE messstellen.mst_ID = '" + g + "' ";
                    if ("Benutzerdefinierter Zeitraum" == $("#btnZeitrmDiag").text())
                        if (a +=
                            "AND LEFT(CONVERT(varchar(20), time_de, 120), 4) = '" + u + "' ", "Tag" == p || "Tag 15min" == p) a += "AND RIGHT(LEFT(CONVERT(varchar(20), time_de, 120), 7), 2) = '" + t + "' ", a += "AND RIGHT(LEFT(CONVERT(varchar(20), time_de, 120), 10), 2) = '" + w + "' ";
                        else {
                            if ("Monat" == p || "Monat 15min" == p) a += "AND RIGHT(LEFT(CONVERT(varchar(20), time_de, 120), 7), 2) = '" + t + "' "
                        }
                    else a += "AND time_de BETWEEN '" + transformDate(y) + "' AND '" + transformDate(z) + "' ";
                    a += "ORDER by time_de ";
                }
                if (ra === "berechnet") {
                    b = "SELECT mst_ID, Name, " + toGermanDate("Time") + " AS Time, Value, ConvFactor FROM berechneteEnergiedaten "
                    b += "WHERE mst_ID = '" + f + "' "
                    if ("Benutzerdefinierter Zeitraum" == $("#btnZeitrmDiag").text())
                        if (b +=
                            "AND LEFT(CONVERT(varchar(20), Time, 120), 4) = '" + u + "' ", "Tag" == p || "Tag 15min" == p) b += "AND RIGHT(LEFT(CONVERT(varchar(20), Time, 120), 7), 2) = '" + t + "' ", b += "AND RIGHT(LEFT(CONVERT(varchar(20), Time, 120), 10), 2) = '" + w + "' ";
                        else {
                            if ("Monat" == p || "Monat 15min" == p) b += "AND RIGHT(LEFT(CONVERT(varchar(20), Time, 120), 7), 2) = '" + t + "' "
                        }
                    else b += "AND Time BETWEEN '" + transformDate(y) + "' AND '" + transformDate(z) + "' ";
                    b += "ORDER by Time ";
                }
                else {
                    b = "SELECT nameMSt AS Name, CONVERT(varchar(20), time_de, 104) + ' ' + CONVERT(varchar(20), time_de, 108) AS Time, phase AS Phase, " +
                    c + " AS Value, wandlungsfaktorMsm AS ConvFactor FROM data_value_15m INNER JOIN channel ON data_value_15m.channel_id = channel.channel_id ";
                    b += "INNER JOIN messmittel ";
                    b += "ON data_value_15m.channel_id = messmittel.kanal1Msm OR data_value_15m.channel_id = messmittel.kanal2Msm OR data_value_15m.channel_id = messmittel.kanal3Msm ";
                    b += "INNER JOIN messstellen ";
                    b += "ON messmittel.mst_ID = messstellen.mst_ID ";
                    b += "WHERE messstellen.mst_ID = '" + f + "' ";
                    if ("Benutzerdefinierter Zeitraum" == $("#btnZeitrmDiag").text())
                    if (b +=
                        "AND LEFT(CONVERT(varchar(20), time_de, 120), 4) = '" + u + "' ", "Tag" == p || "Tag 15min" == p) b += "AND RIGHT(LEFT(CONVERT(varchar(20), time_de, 120), 7), 2) = '" + t + "' ", b += "AND RIGHT(LEFT(CONVERT(varchar(20), time_de, 120), 10), 2) = '" + w + "' ";
                        else {
                            if ("Monat" == p || "Monat 15min" == p) b += "AND RIGHT(LEFT(CONVERT(varchar(20), time_de, 120), 7), 2) = '" + t + "' "
                        }
                        else b += "AND time_de BETWEEN '" + transformDate(y) + "' AND '" + transformDate(z) + "' ";
                        b += "ORDER by time_de ";
                }
                if (xa === "berechnet") {
                    e = "SELECT mst_ID, Name, " + toGermanDate("Time") + " AS Time, Value, ConvFactor FROM berechneteEnergiedaten "
                    e += "WHERE mst_ID = '" + h + "' "
                    if ("Benutzerdefinierter Zeitraum" == $("#btnZeitrmDiag").text())
                        if (e +=
                            "AND LEFT(CONVERT(varchar(20), Time, 120), 4) = '" + u + "' ", "Tag" == p || "Tag 15min" == p) e += "AND RIGHT(LEFT(CONVERT(varchar(20), Time, 120), 7), 2) = '" + t + "' ", e += "AND RIGHT(LEFT(CONVERT(varchar(20), Time, 120), 10), 2) = '" + w + "' ";
                        else {
                            if ("Monat" == p || "Monat 15min" == p) e += "AND RIGHT(LEFT(CONVERT(varchar(20), Time, 120), 7), 2) = '" + t + "' "
                        }
                    else e += "AND Time BETWEEN '" + transformDate(y) + "' AND '" + transformDate(z) + "' ";
                    e += "ORDER by Time ";
                }
                else {
                    e = "SELECT nameMSt AS Name, CONVERT(varchar(20), time_de, 104) + ' ' + CONVERT(varchar(20), time_de, 108) AS Time, phase AS Phase, " +
                    c + " AS Value, wandlungsfaktorMsm AS ConvFactor FROM data_value_15m INNER JOIN channel ON data_value_15m.channel_id = channel.channel_id ";
                    e += "INNER JOIN messmittel ";
                    e += "ON data_value_15m.channel_id = messmittel.kanal1Msm OR data_value_15m.channel_id = messmittel.kanal2Msm OR data_value_15m.channel_id = messmittel.kanal3Msm ";
                    e += "INNER JOIN messstellen ";
                    e += "ON messmittel.mst_ID = messstellen.mst_ID ";
                    e += "WHERE messstellen.mst_ID = '" + h + "' ";
                    if ("Benutzerdefinierter Zeitraum" == $("#btnZeitrmDiag").text())
                    if (e +=
                    "AND LEFT(CONVERT(varchar(20), time_de, 120), 4) = '" + u + "' ", "Tag" == p || "Tag 15min" == p) e += "AND RIGHT(LEFT(CONVERT(varchar(20), time_de, 120), 7), 2) = '" + t + "' ", e += "AND RIGHT(LEFT(CONVERT(varchar(20), time_de, 120), 10), 2) = '" + w + "' ";
                    else {
                        if ("Monat" == p || "Monat 15min" == p) e += "AND RIGHT(LEFT(CONVERT(varchar(20), time_de, 120), 7), 2) = '" + t + "' "
                    }
                    else e += "AND time_de BETWEEN '" + transformDate(y) + "' AND '" + transformDate(z) + "' ";
                    e += "ORDER by time_de "
                }
            } else if ("" != f) {
                if(qa === "berechnet") {
                    a = "SELECT mst_ID, Name, " + toGermanDate("Time") + " AS Time, Value, ConvFactor FROM berechneteEnergiedaten "
                    a += "WHERE mst_ID = '" + g + "' "
                    if ("Benutzerdefinierter Zeitraum" == $("#btnZeitrmDiag").text())
                        if (a +=
                            "AND LEFT(CONVERT(varchar(20), Time, 120), 4) = '" + u + "' ", "Tag" == p || "Tag 15min" == p) a += "AND RIGHT(LEFT(CONVERT(varchar(20), Time, 120), 7), 2) = '" + t + "' ", a += "AND RIGHT(LEFT(CONVERT(varchar(20), Time, 120), 10), 2) = '" + w + "' ";
                        else {
                            if ("Monat" == p || "Monat 15min" == p) a += "AND RIGHT(LEFT(CONVERT(varchar(20), Time, 120), 7), 2) = '" + t + "' "
                        }
                    else a += "AND Time BETWEEN '" + transformDate(y) + "' AND '" + transformDate(z) + "' ";
                    a += "ORDER by Time ";
                }
                else {
                    a = "SELECT nameMSt AS Name, CONVERT(varchar(20), time_de, 104) + ' ' + CONVERT(varchar(20), time_de, 108) AS Time, phase AS Phase, " +
                    c + " AS Value, wandlungsfaktorMsm AS ConvFactor FROM data_value_15m INNER JOIN channel ON data_value_15m.channel_id = channel.channel_id ";
                    a += "INNER JOIN messmittel ";
                    a += "ON data_value_15m.channel_id = messmittel.kanal1Msm OR data_value_15m.channel_id = messmittel.kanal2Msm OR data_value_15m.channel_id = messmittel.kanal3Msm ";
                    a += "INNER JOIN messstellen ";
                    a += "ON messmittel.mst_ID = messstellen.mst_ID ";
                    a += "WHERE messstellen.mst_ID = '" + g + "' ";
                    if ("Benutzerdefinierter Zeitraum" == $("#btnZeitrmDiag").text())
                    if (a +=
                        "AND LEFT(CONVERT(varchar(20), time_de, 120), 4) = '" + u + "' ", "Tag" == p || "Tag 15min" == p) a += "AND RIGHT(LEFT(CONVERT(varchar(20), time_de, 120), 7), 2) = '" + t + "' ", a += "AND RIGHT(LEFT(CONVERT(varchar(20), time_de, 120), 10), 2) = '" + w + "' ";
                        else {
                            if ("Monat" == p || "Monat 15min" == p) a += "AND RIGHT(LEFT(CONVERT(varchar(20), time_de, 120), 7), 2) = '" + t + "' "
                        }
                        else a += "AND time_de BETWEEN '" + transformDate(y) + "' AND '" + transformDate(z) + "' ";
                        a += "ORDER by time_de ";
                }
                if(ra === "berechnet") {
                    b = "SELECT mst_ID, Name, " + toGermanDate("Time") + " AS Time, Value, ConvFactor FROM berechneteEnergiedaten "
                    b += "WHERE mst_ID = '" + f + "' "
                    if ("Benutzerdefinierter Zeitraum" == $("#btnZeitrmDiag").text())
                        if (b +=
                            "AND LEFT(CONVERT(varchar(20), Time, 120), 4) = '" + u + "' ", "Tag" == p || "Tag 15min" == p) b += "AND RIGHT(LEFT(CONVERT(varchar(20), Time, 120), 7), 2) = '" + t + "' ", b += "AND RIGHT(LEFT(CONVERT(varchar(20), Time, 120), 10), 2) = '" + w + "' ";
                        else {
                            if ("Monat" == p || "Monat 15min" == p) b += "AND RIGHT(LEFT(CONVERT(varchar(20), Time, 120), 7), 2) = '" + t + "' "
                        }
                    else b += "AND Time BETWEEN '" + transformDate(y) + "' AND '" + transformDate(z) + "' ";
                    b += "ORDER by Time ";
                }
                else {
                    b = "SELECT nameMSt AS Name, CONVERT(varchar(20), time_de, 104) + ' ' + CONVERT(varchar(20), time_de, 108) AS Time, phase AS Phase, " +
                    c + " AS Value, wandlungsfaktorMsm AS ConvFactor FROM data_value_15m INNER JOIN channel ON data_value_15m.channel_id = channel.channel_id ";
                    b += "INNER JOIN messmittel ";
                    b += "ON data_value_15m.channel_id = messmittel.kanal1Msm OR data_value_15m.channel_id = messmittel.kanal2Msm OR data_value_15m.channel_id = messmittel.kanal3Msm ";
                    b += "INNER JOIN messstellen ";
                    b += "ON messmittel.mst_ID = messstellen.mst_ID ";
                    b += "WHERE messstellen.mst_ID = '" + f + "' ";
                    if ("Benutzerdefinierter Zeitraum" == $("#btnZeitrmDiag").text())
                    if (b +=
                        "AND LEFT(CONVERT(varchar(20), time_de, 120), 4) = '" + u + "' ", "Tag" == p || "Tag 15min" == p) b += "AND RIGHT(LEFT(CONVERT(varchar(20), time_de, 120), 7), 2) = '" + t + "' ", b += "AND RIGHT(LEFT(CONVERT(varchar(20), time_de, 120), 10), 2) = '" + w + "' ";
                        else {
                            if ("Monat" == p || "Monat 15min" == p) b += "AND RIGHT(LEFT(CONVERT(varchar(20), time_de, 120), 7), 2) = '" + t + "' "
                        }
                        else b += "AND time_de BETWEEN '" + transformDate(y) + "' AND '" + transformDate(z) + "' ";
                        b += "ORDER by time_de "
                }
            } else {
                if(qa === "berechnet") {
                    a = "SELECT mst_ID, Name, " + toGermanDate("Time") + " AS Time, Value, ConvFactor FROM berechneteEnergiedaten "
                    a += "WHERE mst_ID = '" + g + "' "
                    if ("Benutzerdefinierter Zeitraum" == $("#btnZeitrmDiag").text())
                        if (a +=
                            "AND LEFT(CONVERT(varchar(20), Time, 120), 4) = '" + u + "' ", "Tag" == p || "Tag 15min" == p) a += "AND RIGHT(LEFT(CONVERT(varchar(20), Time, 120), 7), 2) = '" + t + "' ", a += "AND RIGHT(LEFT(CONVERT(varchar(20), Time, 120), 10), 2) = '" + w + "' ";
                        else {
                            if ("Monat" == p || "Monat 15min" == p) a += "AND RIGHT(LEFT(CONVERT(varchar(20), Time, 120), 7), 2) = '" + t + "' "
                        }
                    else a += "AND Time BETWEEN '" + transformDate(y) + "' AND '" + transformDate(z) + "' ";
                    a += "ORDER by Time ";
                }
                else {
                    a = "SELECT nameMSt AS Name, CONVERT(varchar(20), time_de, 104) + ' ' + CONVERT(varchar(20), time_de, 108) AS Time, phase AS Phase, " +
                    c + " AS Value, wandlungsfaktorMsm AS ConvFactor FROM data_value_15m INNER JOIN channel ON data_value_15m.channel_id = channel.channel_id ";
                    a += "INNER JOIN messmittel ";
                    a += "ON data_value_15m.channel_id = messmittel.kanal1Msm OR data_value_15m.channel_id = messmittel.kanal2Msm OR data_value_15m.channel_id = messmittel.kanal3Msm ";
                    a += "INNER JOIN messstellen ";
                    a += "ON messmittel.mst_ID = messstellen.mst_ID ";
                    a += "WHERE messstellen.mst_ID = '" + g + "' ";
                    if ("Benutzerdefinierter Zeitraum" == $("#btnZeitrmDiag").text())
                    if (a +=
                        "AND LEFT(CONVERT(varchar(20), time_de, 120), 4) = '" + u + "' ", "Tag" == p || "Tag 15min" == p) a += "AND RIGHT(LEFT(CONVERT(varchar(20), time_de, 120), 7), 2) = '" + t + "' ", a += "AND RIGHT(LEFT(CONVERT(varchar(20), time_de, 120), 10), 2) = '" + w + "' ";
                        else {
                            if ("Monat" == p || "Monat 15min" == p) a += "AND RIGHT(LEFT(CONVERT(varchar(20), time_de, 120), 7), 2) = '" + t + "' "
                        }
                        else a += "AND time_de BETWEEN '" + transformDate(y) + "' AND '" + transformDate(z) + "' ";
                        a += "ORDER by time_de "
                }
            }
            sessionStorage.setItem("nameDB", $("#nameDB").val());
            sessionStorage.setItem("year", u);
            sessionStorage.setItem("day", w);
            sessionStorage.setItem("from", y);
            sessionStorage.setItem("to", z);
            sessionStorage.setItem("month", t);
            sessionStorage.setItem("chartType", A);
            sessionStorage.setItem("displayMean", B);
            sessionStorage.setItem("nameMst_1", q);
            sessionStorage.setItem("nameMst_2", r);
            sessionStorage.setItem("nameMst_3", x);
            sessionStorage.setItem("mstID_1", g);
            sessionStorage.setItem("mstID_2", f);
            sessionStorage.setItem("mstID_3", h);
            sessionStorage.setItem("queryString_1", a);
            sessionStorage.setItem("queryString_2", b);
            sessionStorage.setItem("queryString_3", e);
            setTimeout(function() {
                "Jahr" == p ? window.open("chartYear.html", "_blank") : "Monat" == p ? window.open("chartMonth.html", "_blank") : "Monat 15min" == p ? window.open("chartMonth15min.html", "_blank") : "Tag" == p ? window.open("chartDay.html", "_blank") : "Tag 15min" == p ? window.open("chartDay15min.html", "_blank") : window.open("chartBenDef15min.html", "_blank")
            }, 2E3)
        };
        function verbrauchsdatenExportieren() {
            let dataMachine = new DataMachine(),
            queryString = "",
            nameDB = $("#nameDB").val(),
            idMst = $("#mstIDDatenexport").val(),
            jahr = $("#VerbrauchsdatenexportJahr").val(),
            monat = $("#VerbrauchsdatenexportMonat").val(),
            vers = 0;
            queryString = "SELECT nameMSt AS Name, CONVERT(varchar(20), time_de, 104) + ' ' + CONVERT(varchar(20), time_de, 108) AS Time, phase AS Phase, power AS Value FROM data_value_15m ";
            queryString += "INNER JOIN channel ";
            queryString += "ON data_value_15m.channel_id = channel.channel_id ";
            queryString += "INNER JOIN messmittel ";
            queryString += "ON data_value_15m.channel_id = messmittel.kanal1Msm OR data_value_15m.channel_id = messmittel.kanal2Msm OR data_value_15m.channel_id = messmittel.kanal3Msm ";
            queryString += "INNER JOIN messstellen ";
            queryString += "ON messmittel.mst_ID = messstellen.mst_ID ";
            queryString += "WHERE messstellen.mst_ID = '" + idMst + "' ";
            queryString += "AND LEFT(CONVERT(varchar(20), time_de, 120), 4) = '" + jahr + "' ";
            if(monat != "-"){
                queryString += "AND RIGHT(LEFT(CONVERT(varchar(20), time_de, 120), 7), 2) = '" + monat + "' ";
            }
            queryString += "ORDER by time_de ";
            vers = 2;


            dataMachine.runQuery("read", $("#nameDB").val(), queryString)
            .then(function(data){
            let jsonData = JSON.parse(data),
            nJsonData = jsonData.length,
            phase = 0,
            value = 0;
            tblVerbrauchsdatenExp.clear();
            for(let i = 0; i < nJsonData; i++){
                if(vers == 1){
                    phase = 1;
                }
                else {
                    phase = jsonData[i].Phase;
                }
                if($.isNumeric(jsonData[i].Value)){
                    value = formatNumber("form", jsonData[i].Value);
                }
                else {
                    value = 0;
                }
                tblVerbrauchsdatenExp.row.add([
                    jsonData[i].Name,
                    jsonData[i].Time,
                    phase,
                    value
                ]);
            }
            tblVerbrauchsdatenExp.draw();
            });
        };
        writeVorlFormulaToDB = function(a, b, e) {
            $.ajax({
                type: "POST",
                async: !0,
                url: "php/instanzIntoDB.php",
                data: {
                    id: "vorlFrm",
                    nameDB: $("#nameDB").val(),
                    bezeichnung: a,
                    formula: b,
                    notiz: e
                },
                fail: function() {
                    alert("failed!!")
                },
                success: function(a) {
                    alert(datensatzGespeichert(a))
                }
            })
        },
        writeFormulaToDB = function(a) {
            var b = a.berechneteMstID,
                e = a.bezug,
                c = a.formelString,
                g = a.idString,
                f = {},
                /*26-02-2020 selection option rename check*/
                f = "Virtuelle Messstelle" === a.modus ? {
                    id: "frm",
                    berechneteMstID: b,
                    formelString: c,
                    idString: g
                } : {
                    id: "frmKnz",
                    bezug: e,
                    formelString: c,
                    idString: g
                };
            f.nameDB = $("#nameDB").val(); /*25-02-2020 Rename Berechnung to Virtuelle Messstelle*/
            return new Promise(function(a, b) {
                $.ajax({
                    type: "POST",
                    async: !0,
                    url: "php/instanzIntoDB.php",
                    data: f,
                    fail: function() {
                        alert("failed!!")
                    },
                    success: function(c) {
                    }
                })
            })
        },
        XOR = function(a, b) {
            return (a || b) && !(a && b)
        },
        masseneingabeZeitintervallAendern = function(a) {
            ME.resetObj();
            var b = void 0;
            "intEngIMw" == $("#activeInstance").val() ? b = InstanceMode.ENERGY : "intBdeIMw" == $("#activeInstance").val() && (b = InstanceMode.BDE);
            $("#masseneingabeTimeInterval").val(a);
            eingabeMaskeMasseneingabeInterneMesswerte(b,
                a)
        },
        masseneingabeInMonatNavigieren = function(a) {
            $("#monatMasseneingabeIMw option[value='" + a + "']").prop("selected", !0);
            $("#masseneingabeZeitintervallIMw label, #masseneingabeInputIMw input").css("display", "inline-block");
            $("#masseneingabeZeitintervallIMw label:not(label[data-month='" + $("#monatMasseneingabeIMw").val() + "'])").css("display", "none");
            $("#masseneingabeInputIMw input:not(input[data-month='" + $("#monatMasseneingabeIMw").val() + "'])").css("display", "none")
        },
        /*mm-commented 22-03-2021*/
        /*mstOderAnlOhneZeitzuordnungInTbl = function(a) {
            var b =
                null,
                e = new DataMachine,
                c = void 0,
                g = [],
                f = void 0,
                h = "",
                q = "SELECT * FROM ",
                r = void 0;
            switch (a) {
                case InstanceMode.ENERGY:
                    b = tblMstOhneZeitintervallIMw;
                    mstOrAnlString = "tblMstOhneZeitintervallIMw";
                    r = ReadInstance.INTERNE_ENERGIEDATEN;
                    c = "messstellen\n ";
                    g = ["mst_ID", "nameMSt", "energietraegerMst", "anlageMst", "ortMst"];
                    f = "zeitintervallMst ";
                    h = "AND messartMst = 'manuell' ";
                    break;
                case InstanceMode.BDE:
                    b = tblAnlOhneZeitintervallIMw, mstOrAnlString = "tblAnlOhneZeitintervallIMw", r = ReadInstance.INTERNE_BETRIEBSDATEN, c = "anlagen\n",
                        g = ["anl_ID", "nummerAnl", "bezeichnungAnl", "messwertIMwAnl", "einheitIMwAnl"], f = "zeitintervallAnl"
            }
            b.clear().draw();
            q += c + " WHERE " + f + " = 0 AND deleted = 0" + h + " ";
            e.runQuery("read", $("#nameDB").val(), q).then(function(a) {
                a = JSON.parse(a);
                for (var c = a.length, e = 0; e < c; e++) b.row.add([e, a[e][g[0]], a[e][g[1]], a[e][g[2]], a[e][g[3]], a[e][g[4]]]).draw(), b.column(0).visible(!1).draw();
                $("#" + mstOrAnlString + " tbody").off("dblclick");
                $("#" + mstOrAnlString + " tbody").on("dblclick", "tr", function() {
                    var a = b.row(this).data();
                    clearFields("intEngIMw");
                    readInstanzNachID(r, a[1])
                })
            })
        },*/
        /*mm-commented 22-03-2021*/
        masseneingabeJahreEinlesen = function(a) {
            ME.resetObj();
            ME.setTimeInterval(TimeInterval.YEAR);
            ME.setModusEngOrBde(a);
            $("#jahrMasseneingabeIMw, #lblJahrMasseneingabeIMw").css("display", "none");
            $("#monatMasseneingabeIMw, #lblMonatMasseneingabeIMw").css("display", "none");
            (new Date).getFullYear();
            var b = "",
                e = "",
                c = "",
                g = "";
            $("#masseneingabeZeitintervallIMw label, #masseneingabeZeitintervallIMw br, #masseneingabeNameIMw input, #masseneingabeNameIMw br, #masseneingabeInputIMw input, #masseneingabeInputIMw div, #masseneingabeInputIMw br").remove();
            for (var f = 0; 16 > f; f++) b = "<label style='display:inline-block;width:120px;'>" + (2010 + f) + "</label>", e += "<input name='" + (f + 1) + "' style='display:inline-block;width:116px;' />", $("#masseneingabeZeitintervallIMw").append(b);
            $("#masseneingabeZeitintervallIMw").append("<br>");
            a == InstanceMode.ENERGY ? g = "SELECT masseneingabeJahre.mst_ID, nameMSt FROM masseneingabeJahre INNER JOIN messstellen ON masseneingabeJahre.mst_ID = messstellen.mst_ID " : a == InstanceMode.BDE && (g = "SELECT masseneingabeJahre.anl_ID, bezeichnungAnl, nummerAnl FROM masseneingabeJahre INNER JOIN anlagen ON masseneingabeJahre.anl_ID = anlagen.anl_ID " +
                ("WHERE einheit = '" + $("#einheitMasseneingabeIMw").val() + "' "));
            (new DataMachine).runQuery("read", $("#nameDB").val(), g).then(function(a) {
                a = JSON.parse(a);
                for (var b = [], g, f = 0; f < a.length; f++) $("#masseneingabeInputIMw").append("<div data-row='" + (f + 1) + "'>" + e + "</div>"), ME.getModusEngOrBde() == InstanceMode.ENERGY ? (c += "<input name='" + (f + 1) + "' readonly style='display:inline-block;width:140px;background-color: transparent;border-color: transparent;' value='" + a[f].nameMSt + "'/><br>", b.push(new MeasurementPoint(a[f].mst_ID,
                    a[f].nameMSt, 16))) : ME.getModusEngOrBde() == InstanceMode.BDE && (g = $("#btnAnlagenNummerMassEing").is(":checked") ? a[f].nummerAnl : a[f].bezeichnungAnl, c += "<input name='" + (f + 1) + "' readonly style='display:inline-block;width:140px;background-color: transparent;border-color: transparent;' value='" + g + "'/><br>", b.push(new Machine(a[f].anl_ID, g, 16)));
                $("#masseneingabeNameIMw").append(c);
                ME.setMeasurementObjects(b)
            })
        },
        masseneingabeMonateEinlesen = function(a) {
            ME.resetObj();
            ME.setTimeInterval(TimeInterval.MONTH);
            ME.setYear($("#jahrMasseneingabeIMw").val());
            ME.setModusEngOrBde(a);
            $("#monatMasseneingabeIMw, #lblMonatMasseneingabeIMw").css("display", "none");
            $("#jahrMasseneingabeIMw, #lblJahrMasseneingabeIMw").css("display", "inline-block");
            var b = $("#jahrMasseneingabeIMw").val();
            monthArray = "Januar Februar M\u00e4rz April Mai Juni Juli August September Oktober November Dezember".split(" ");
            nMonth = monthArray.length;
            queryString = nameString = inputString = labelString = "";
            $("#masseneingabeZeitintervallIMw label, #masseneingabeZeitintervallIMw br, #masseneingabeNameIMw input, #masseneingabeNameIMw br, #masseneingabeInputIMw input, #masseneingabeInputIMw div, #masseneingabeInputIMw br").remove();
            for (var e = 0; e < nMonth; e++) labelString = "<label style='display:inline-block;width:120px;'>" + monthArray[e] + "</label>", inputString += "<input style='display:inline-block;width:116px;' />", $("#masseneingabeZeitintervallIMw").append(labelString);
            $("#masseneingabeZeitintervallIMw").append("<br>");
            a == InstanceMode.ENERGY ? (queryString = "SELECT masseneingabeMonate.mst_ID, nameMSt FROM masseneingabeMonate ", queryString += "INNER JOIN messstellen ", queryString += "ON masseneingabeMonate.mst_ID = messstellen.mst_ID ",
                queryString += "WHERE year = '" + b + "' ") : a == InstanceMode.BDE && (queryString = "SELECT masseneingabeMonate.anl_ID, bezeichnungAnl, nummerAnl FROM masseneingabeMonate\n ", queryString += "INNER JOIN anlagen\n ", queryString += "ON masseneingabeMonate.anl_ID = anlagen.anl_ID\n ", queryString += "WHERE year = '" + b + "' ", queryString += "AND einheit = '" + $("#einheitMasseneingabeIMw").val() + "' ");
            (new DataMachine).runQuery("read", $("#nameDB").val(), queryString).then(function(a) {
                a = JSON.parse(a);
                for (var b = [], c, e = 0; e < a.length; e++) $("#masseneingabeInputIMw").append("<div data-row='" +
                    (e + 1) + "'>" + inputString + "</div>"), ME.getModusEngOrBde() == InstanceMode.ENERGY ? (nameString += "<input name='" + (e + 1) + "' readonly style='display:inline-block;width:140px;background-color: transparent;border-color: transparent;' value='" + a[e].nameMSt + "'/><br>", b.push(new MeasurementPoint(a[e].mst_ID, a[e].nameMSt, nMonth))) : ME.getModusEngOrBde() == InstanceMode.BDE && (c = $("#btnAnlagenNummerMassEing").is(":checked") ? a[e].nummerAnl : a[e].bezeichnungAnl, nameString += "<input name='" + (e + 1) + "' readonly style='display:inline-block;width:140px;background-color: transparent;border-color: transparent;' value='" +
                    c + "'/><br>", b.push(new Machine(a[e].anl_ID, c, nMonth)));
                $("#masseneingabeNameIMw").append(nameString);
                ME.setMeasurementObjects(b)
            })
        },
        masseneingabeWochenEinlesen = function(a) {
            ME.resetObj();
            ME.setTimeInterval(TimeInterval.WEEK);
            ME.setYear($("#jahrMasseneingabeIMw").val());
            ME.setModusEngOrBde(a);
            $("#monatMasseneingabeIMw, #lblMonatMasseneingabeIMw").css("display", "none");
            $("#jahrMasseneingabeIMw, #lblJahrMasseneingabeIMw").css("display", "inline-block");
            var b = $("#jahrMasseneingabeIMw").val(),
                e = "",
                c = "",
                g = "",
                f = "";
            $("#masseneingabeZeitintervallIMw label, #masseneingabeZeitintervallIMw br, #masseneingabeNameIMw input, #masseneingabeNameIMw br, #masseneingabeInputIMw input, #masseneingabeInputIMw div, #masseneingabeInputIMw br").remove();
            for (var h = 0; 52 > h; h++) e = "<label style='display:inline-block;width:120px;'>" + (h + 1) + "-KW</label>", c += "<input style='display:inline-block;width:116px;' />", $("#masseneingabeZeitintervallIMw").append(e);
            $("#masseneingabeZeitintervallIMw").append("<br>");
            a == InstanceMode.ENERGY ?
                f = "SELECT masseneingabeWochen.mst_ID, nameMSt FROM masseneingabeWochen INNER JOIN messstellen ON masseneingabeWochen.mst_ID = messstellen.mst_ID " + ("WHERE year = '" + b + "' ") : a == InstanceMode.BDE && (f = "SELECT masseneingabeWochen.anl_ID, bezeichnungAnl, nummerAnl FROM masseneingabeWochen INNER JOIN anlagen ON masseneingabeWochen.anl_ID = anlagen.anl_ID " + ("WHERE year = '" + b + "' ") + ("AND einheit = '" + $("#einheitMasseneingabeIMw").val() + "' "));
            (new DataMachine).runQuery("read", $("#nameDB").val(), f).then(function(a) {
                a =
                    JSON.parse(a);
                for (var b = [], e, f = 0; f < a.length; f++) $("#masseneingabeInputIMw").append("<div data-row='" + (f + 1) + "'>" + c + "</div>"), ME.getModusEngOrBde() == InstanceMode.ENERGY ? (g += "<input name='" + (f + 1) + "' readonly style='display:inline-block;width:140px;background-color: transparent;border-color: transparent;' value='" + a[f].nameMSt + "'/><br>", b.push(new MeasurementPoint(a[f].mst_ID, a[f].nameMSt, 52))) : ME.getModusEngOrBde() == InstanceMode.BDE && (e = $("#btnAnlagenNummerMassEing").is(":checked") ? a[f].nummerAnl : a[f].bezeichnungAnl,
                    g += "<input name='" + (f + 1) + "' readonly style='display:inline-block;width:140px;background-color: transparent;border-color: transparent;' value='" + e + "'/><br>", b.push(new Machine(a[f].anl_ID, e, 52)));
                $("#masseneingabeNameIMw").append(g);
                ME.setMeasurementObjects(b)
            })
        },
        masseneingabeTageEinlesen = function(a) {
            ME.resetObj();
            ME.setTimeInterval(TimeInterval.DAY);
            ME.setYear($("#jahrMasseneingabeIMw").val());
            ME.setModusEngOrBde(a);
            $("#monatMasseneingabeIMw, #lblMonatMasseneingabeIMw").css("display", "inline-block");
            $("#jahrMasseneingabeIMw, #lblJahrMasseneingabeIMw").css("display", "inline-block");
            var b = $("#jahrMasseneingabeIMw").val();
            d.getMonth();
            var e = 0,
                c = [{
                    month: "Jan",
                    days: 31
                }, {
                    month: "Feb",
                    days: 28
                }, {
                    month: "Mrz",
                    days: 31
                }, {
                    month: "Apr",
                    days: 30
                }, {
                    month: "Mai",
                    days: 31
                }, {
                    month: "Jun",
                    days: 30
                }, {
                    month: "Jul",
                    days: 31
                }, {
                    month: "Aug",
                    days: 31
                }, {
                    month: "Sept",
                    days: 30
                }, {
                    month: "Okt",
                    days: 31
                }, {
                    month: "Nov",
                    days: 30
                }, {
                    month: "Dez",
                    days: 31
                }],
                g = void 0,
                f = g = "",
                h = "",
                q = "";
            c[1].days = daysInMonth(b, 2);
            $("#masseneingabeZeitintervallIMw label, #masseneingabeZeitintervallIMw br, #masseneingabeNameIMw input, #masseneingabeNameIMw br, #masseneingabeInputIMw input, #masseneingabeInputIMw div, #masseneingabeInputIMw br").remove();
            for (var r = 0; r < c.length; r++)
                for (var x = 0; x < c[r].days; x++) g = getWeekday(b, r, x + 1), g = "Samstag" == g || "Sonntag" == g ? "<label data-month='" + r + "' style='display:inline-block;width:120px;color: gray'>" + (x + 1) + " " + c[r].month + ". " + g + "</label>" : "<label data-month='" + r + "' style='display:inline-block;width:120px;'>" + (x + 1) + " " + c[r].month + ". " + g + "</label>", f += "<input data-month='" + r + "' style='display:inline-block;width:116px;' />", $("#masseneingabeZeitintervallIMw").append(g), e++;
            $("#masseneingabeZeitintervallIMw").append("<br>");
            a == InstanceMode.ENERGY ? q = "SELECT masseneingabeTage.mst_ID, nameMSt FROM masseneingabeTage INNER JOIN messstellen ON masseneingabeTage.mst_ID = messstellen.mst_ID " + ("WHERE year = '" + $("#jahrMasseneingabeIMw").val() + "' ") : a == InstanceMode.BDE && (q = "SELECT masseneingabeTage.anl_ID, bezeichnungAnl, nummerAnl FROM masseneingabeTage INNER JOIN anlagen ON masseneingabeTage.anl_ID = anlagen.anl_ID " + ("WHERE year = '" + $("#jahrMasseneingabeIMw").val() + "' "), q += "AND einheit = '" + $("#einheitMasseneingabeIMw").val() +
                "' ");
            (new DataMachine).runQuery("read", $("#nameDB").val(), q).then(function(a) {
                a = JSON.parse(a);
                for (var b = [], c, e = 0; e < a.length; e++) $("#masseneingabeInputIMw").append("<div data-row='" + (e + 1) + "'>" + f + "</div>"), ME.getModusEngOrBde() == InstanceMode.ENERGY ? (h += "<input name='" + (e + 1) + "' readonly style='display:inline-block;width:140px;background-color: transparent;border-color: transparent;' value='" + a[e].nameMSt + "'/><br>", b.push(new MeasurementPoint(a[e].mst_ID, a[e].nameMSt, 366))) : ME.getModusEngOrBde() == InstanceMode.BDE &&
                    (c = $("#btnAnlagenNummerMassEing").is(":checked") ? a[e].nummerAnl : a[e].bezeichnungAnl, h += "<input name='" + (e + 1) + "' readonly style='display:inline-block;width:140px;background-color: transparent;border-color: transparent;' value='" + c + "'/><br>", b.push(new Machine(a[e].anl_ID, c, 366)));
                $("#masseneingabeNameIMw").append(h);
                ME.setMeasurementObjects(b)
            })
        },
        eingabeMaskeMasseneingabeInterneMesswerte = function(a, b) {
            switch (b) {
                case TimeInterval.DAY:
                    masseneingabeTageEinlesen(a);
                    break;
                case TimeInterval.WEEK:
                    masseneingabeWochenEinlesen(a);
                    break;
                case TimeInterval.MONTH:
                    masseneingabeMonateEinlesen(a);
                    break;
                case TimeInterval.YEAR:
                    masseneingabeJahreEinlesen(a)
            }
        },
        getWeekday = function(a, b, e) {
            return "Sonntag Montag Dienstag Mittwoch Donnerstag Freitag Samstag".split(" ")[(new Date(a, b, e)).getDay()]
        },
        daysInMonth = function(a, b) {
            return (new Date(a, b, 0)).getDate()
        },
        getCurrentYear = function() {
            return (new Date).getFullYear()
        },
        formelerweiterungNachDrop = function(a, b, e, c) {
            c = null;
            c = "none" == $("#tblIMwContainer").css("display") ? new MeasurementPoint(b, e, 0) :
                new Machine(b, e, 0);
            "formelStringDarstellung" == a ? ("" == $("#formelIdDarstellung").val() ? formula.setFirstElement(LocationParentheses.NONE, 0, OperandType.MEASUREMENT_POINT, c) : formula.alterElementProperty(formula.formula.length - 1, FormulaProperty.MEASUREMENT_POINT, {
                type: OperandType.MEASUREMENT_POINT,
                operandObject: c
            }), $("#formelStringDarstellung").val($("#formelStringDarstellung").val() + e), $("#formelIdDarstellung").val($("#formelIdDarstellung").val() + b)) : ($("#berechneteMstName").val(e), $("#berechneteMstID").val(mstIdentifier(b)),
                formula.resetFormula(), $("#formelStringDarstellung").val(""), $("#formelIdDarstellung").val(""), formula.setMeasurementObjectToCalculate(c), $("#formelStringDarstellung").val(formula.getMeasurementObjectToCalculate().name + " = "), "" != b ? ($("#berechneteMstName").val(e), $("#berechneteMstID").val(mstIdentifier(b)), formula.readFromDB(DbTable.MESSSTELLEN).then(function(a) {
                    formula.setFormulaObject(a)
                }).then(function() {
                    $("#formelStringDarstellung").val($("#formelStringDarstellung").val() + formula.getFormulaString())
                })) : (formula.resetFormula(),
                    $("#formelStringDarstellung").val(""), $("#formelIdDarstellung").val("")))
        },
        mandantenInMandantenGruppenTabelleEinlesen = function(a) {
            tblMandantengruppe.clear().draw();
            $.ajax({
                type: "POST",
                async: !0,
                url: "php/readInstanzen.php",
                data: {
                    id: "tblMan",
                    nameDB: "gipscomm",
                    mandantenIDs: a
                },
                fail: function() {
                    alert("failed!!")
                },
                success: function(a) {
                    a = $.parseJSON(a);
                    // Checked Value
                    // $.each(a, function(i, item){
                    //     id = 'manCheckbox'+item.man_ID;
                    //     $('#'+id).prop("checked", !0);
                    // });
                    tblMandantengruppe.clear().draw();
                    if (0 < a.length)
                        for (n = 0; n < a.length; n++) tblMandantengruppe.row.add([a[n].man_ID, a[n].nameMan, a[n].dbName], n).draw(), tblMandantengruppe.column(0).visible(!1).draw();
                    else tblMandantengruppe.clear().draw()
                }
            })
        },
        bereichWaehlen = function() {
            $("#bereichWaehlen").css("display", "block");
            $("#bereichWaehlen").dialog({
                height: 350,
                width: 250,
                position: "center",
                resize: "none",
                show: {
                    effect: "fade",
                    duration: 500
                },
                hide: {
                    effect: "fade",
                    duration: 500
                }
            })
        },
        berechnungsformelSpeichern = function() {
            for (var a = formula.getFormulaObject().length, b = 0; b < a; b++);
        },
        knzEinheitenEinlesen = function() {
            $.ajax({
                type: "POST",
                async: !0,
                url: "php/erweiterungenProdukte.php",
                data: {
                    ins: "anlVorlFrm",
                    orgID: $("#orgID").val(),
                    nameDB: $("#nameDB").val()
                },
                success: function(a) {
                    a = JSON.parse(a);
                    var b = a.length;
                    tblEinheitenKnzs.clear().draw();
                    for (var e = 0; e < b; e++) tblEinheitenKnzs.row.add([a[e].name]).draw(), $("tr").css("cursor", "pointer")
                }
            })
        },
        produkteHistorieInTabelleEinlesen = function() {
            $.ajax({
                type: "POST",
                async: !0,
                url: "php/getHistorie.php",
                data: {
                    modus: "prd",
                    nameDB: $("#nameDB").val(),
                    gruppenID: $("#gruppenIDPrd").val()
                },
                success: function(a) {
                    a = JSON.parse(a);
                    var b = a.length;
                    tblHistoriePrd.clear().draw();
                    for (var e = 0; e < b; e++) tblHistoriePrd.row.add([a[e].prd_ID,
                        a[e].ArtikelNr, a[e].Produktbezeichnung, a[e].Datum, a[e].Info, a[e].Bemerkung
                    ]).draw(), tblHistoriePrd.column(0).visible(!1), $("#tblHistoriePrd tr").css("cursor", "pointer"), $("#tblHistoriePrd").off("dblclick", "tr"), $("#tblHistoriePrd").on("dblclick", "tr", function() {
                        var a = tblHistoriePrd.row(this).data();
                        historieAendernFensterOeffnen("#historieAendernContainerPrd");
                        datensatzAusHistorieEinlesenPrd(a[0])
                    })
                }
            })
        },
        anlagenHistorieInTabelleEinlesen = function() {
            $.ajax({
                type: "POST",
                async: !0,
                url: "php/getHistorie.php",
                data: {
                    modus: "anl",
                    nameDB: $("#nameDB").val(),
                    anlagenNr: $("#anlagennummerAllgemeinAnl").val()
                },
                success: function(a) {
                    a = JSON.parse(a);
                    var b = a.length;
                    tblHistorieAnl.clear().draw();
                    for (var e = 0; e < b; e++) tblHistorieAnl.row.add([a[e].anl_ID, e + 1, a[e].AnlagenNr, a[e].Bezeichnung, a[e].Datum, a[e].Info, a[e].Bemerkung]).draw(), tblHistorieAnl.column(0).visible(!1), $("#tblHistorieAnl tr").css("cursor", "pointer"), $("#tblHistorieAnl").off("dblclick", "tr"), $("#tblHistorieAnl").on("dblclick", "tr", function() {
                        var a = tblHistorieAnl.row(this).data();
                        historieAendernFensterOeffnen("#historieAendernContainerAnl");
                        datensatzAusHistorieEinlesenAnl(a[0])
                    })
                }
            })
        },
        anlageVerschieben = function() {
            instanzSpeichern("anlVerschieben")
        },
        dynBdeDatenInAuswertungsEditorTabelleEinlesen =
            () =>
            ajaxPost("php/dynBdeDaten.php")({nameDB: $("#nameDB").val()})
            .then(
                    data => {
                        const prepareTableData =
                            pars =>
                            json(pars.parJson)
                            .filter(a => a.state)
                            .map(
                                a =>
                                [ `${pars.bPar_ID}-${a.col}`
                                , ` [${a.alias}]`
                                , ` ${pars.tblName}`
                                ]
                            )

                        clearTable(tblBdeDynBerechnungseditor)

                        intoTable(tblBdeDynBerechnungseditor)(
                            prepareTableData(data[0])
                        )
                    }
                )
        produkteInFormeleditorEinlesen = function() {
            $.ajax({
                type: "POST",
                async: !0,
                url: "php/erweiterungenProdukte.php",
                data: {
                    nameDB: $("#nameDB").val()
                },
                success: function(a) {
                    a = JSON.parse(a);
                    var b = a.length;
                    tblProdukte.clear().draw();
                    for (var e = 0; e < b; e++) tblProdukte.row.add([a[e].ePrd_ID + " ", "[" + a[e].name + "]", "  ", a[e].beschreibung + " ", a[e].optionen + " "]).draw(), $("tr").css("cursor", "pointer")
                }
            })
        },
        anlagenInAuswertungsEditorTabelleEinlesen = function() {
            var a = "",
                b = "";
            $.ajax({
                type: "POST",
                async: !0,
                url: "php/getAnlagen.php",
                data: {
                    ins: "anlVorlFrm",
                    orgID: $("#orgID").val(),
                    nameDB: $("#nameDB").val()
                },
                success: function(e) {
                    e = JSON.parse(e);
                    var c = e.length;
                    tblAnlagenBerechnungseditor.clear().draw();
                    for (var g = 0; g < c; g++) a = String(e[g].anl_ID), a = a.replace(/^\s+|\s+$/gm, ""), b = String(e[g].nummerAnl + "_" + e[g].bezeichnungAnl), b = "[" + b.replace(/^\s+|\s+$/gm, "") + "]", b = String(b.replace(/\s/g, "_")), typ = String(e[g].typAnl), typ = typ.replace(/^\s+|\s+$/gm, ""), standort = String(e[g].standortAnl), standort = standort.replace(/^\s+|\s+$/gm, ""), baujahr = String(e[g].baujahrAnl), baujahr = baujahr.replace(/^\s+|\s+$/gm,
                        ""), tblAnlagenBerechnungseditor.row.add([a + " ", b + " ", typ + " ", standort + " ", baujahr]).draw(), $("tr").css("cursor", "pointer")
                }
            })
        },
        messstellenInAuswertungsEditorTabelleEinlesen = function() {
            var a = "",
                b = "",
                e = "",
                c = "",
                g = "",
                f = "";
            $.ajax({
                type: "POST",
                async: !0,
                url: "php/getMessstellen.php",
                data: {
                    ins: "mstVorlFrm",
                    orgID: $("#orgID").val(),
                    nameDB: $("#nameDB").val(),
                    liegID: $("#liegID").val()
                },
                success: function(h) {
                    h = JSON.parse(h);
                    var q = h.length;
                    tblMessstellenBerechnungseditor.clear().draw();
                    for (var r = 0; r < q; r++) {
                        a = String(h[r].mst_ID), a = a.replace(/^\s+|\s+$/gm, ""),
                            b = String(h[r].nameMSt), b = "[" + b.replace(/^\s+|\s+$/gm, "") + "]", b = String(b.replace(/\s/g, "_")), e = String(h[r].kurzbezeichnungMst), e = e.replace(/^\s+|\s+$/gm, ""), c = String(h[r].energietraegerMst), c = c.replace(/^\s+|\s+$/gm, ""), f = String(h[r].anlageMst), f = f.replace(/^\s+|\s+$/gm, ""),
                            /*05-03-2020 if messart exist, show formula on tooltip*/
                            p = String(h[r].messmittelBerechnungslogikMstNormal);
                        messartMstData = String(h[r].messartMst);
                        if (messartMstData.length > 0 && messartMstData != 'berechnet') {
                            g = isBase64(String(h[r].messmittelBerechnungslogikMst))
                        } else if (messartMstData.length > 0 && messartMstData == 'berechnet') {
                            g = "<span class='" + messartMstData + "' data-id='" + p + "'>" + isBase64(String(h[r].messmittelBerechnungslogikMst)) + "</span>"
                            //$("tr").addClass(messartMstData);
                        } else if (p.length > 4) {
                            g = "<a class='tooltip_formula_show' data-tooltip='" + p + "'>Formel angelegt</a>"
                        } else {
                            g = ""
                        }
                        /*05-03-2020 if messart exist, show formula on tooltip*/
                        tblMessstellenBerechnungseditor.row.add([a + " ", b + " ", e + " ", c + " ", g + " ", f]).draw(),

                            $("tr").css("cursor", "pointer")
                    }
                }
            })
        },
        erweiterungenProdukteEinlesen = function() {
            $.ajax({
                type: "POST",
                async: !0,
                url: "php/ePrdEinlesen.php",
                data: {
                    nameDB: $("#nameDB").val()
                },
                success: function(a) {
                    a = JSON.parse(a);
                    $("#lblCustom1Prd, #lblCustom2Prd, #lblCustom3Prd, #lblCustom4Prd, #lblCustom5Prd, #lblCustom6Prd").text("");
                    $("#lblCustom1PrdKnz, #lblCustom2PrdKnz, #lblCustom3PrdKnz, #lblCustom4PrdKnz, #lblCustom5PrdKnz, #lblCustom6PrdKnz").text("");
                    $("#custom1PrdKnz, #custom2PrdKnz, #custom3PrdKnz, #custom4PrdKnz, #custom5PrdKnz, #custom6PrdKnz").val("");
                    for (i = 0; i < a.length; i++) {
                        $("#lblCustom" + (i + 1) + "Prd, #lblCustom" +
                            (i + 1) + "PrdKnz").text(a[i].name);
                        var b = a[i].optionen.split(",");
                        $("#custom" + (i + 1) + "Prd").empty();
                        for (j = 0; j < b.length; j++) $("#custom" + (i + 1) + "Prd").append("<option>" + b[j] + "</option>")
                    }
                }
            })
        },
        anlagenGruppenEinlesen = function() {
            const erwAnl =
                  [1, 2, 3, 4, 5, 6]
                  .map(a => $(`#custom${a}Anl`).val())

            $.ajax({
                type: "POST",
                async: !0,
                url: "php/eAnlEinlesen.php",
                data: {
                    nameDB: $("#nameDB").val()
                },
                success: function(a) {
                    a = JSON.parse(a);
                    $("#lblCustom1Anl, #lblCustom2Anl, #lblCustom3Anl, #lblCustom4Anl, #lblCustom5Anl, #lblCustom6Anl").text("");
                    for (i = 0; i < a.length; i++) {
                        $("#lblCustom" + (i + 1) + "Anl").text(a[i].name);
                        $("#tblAnlagenListe2 thead tr th").eq(i + 3).text(a[i].name);
                        var b = a[i].optionen.split(",");
                        $("#custom" + (i + 1) + "Anl").empty();
                        for (j = 0; j < b.length; j++) $("#custom" + (i + 1) + "Anl").append("<option>" + b[j] + "</option>")
                        $("#custom" + (i + 1) + "Anl").val(erwAnl[i])
                    }
                }
            })
        },
        energiefrmInDBoxLieg = function() {
            $.ajax({
                type: "POST",
                async: !0,
                url: "php/checkboxenDerEntEnfEinlesen.php",
                data: {
                    id: "enfLieg",
                    nameDB: $("#nameDB").val()
                },
                success: function(a) {
                    a = $.parseJSON(a);

                    const energieformenAnl =
                        [1, 2, 3, 4]
                        .map(idx => $(`#energieform${idx}AllgemeinAnl`).val())

                    $(".energieformenLieg").empty();
                    $(".energieformenLieg").append("<option></option>");
                    for (i = 0; i < a.length; i++) 1 == a[i].aktivEnf && $(".energieformenLieg").append("<option>" + a[i].nameEnf + "</option>")

                    energieformenAnl
                    .forEach((a, i) => $($(`#energieform${incr(i)}AllgemeinAnl`).val(a)))
                }
            })
        },
        energietrInDBoxERngVergleich = function() {
            $.ajax({
                type: "POST",
                async: !0,
                url: "php/energietraegerVersorgerEinlesen.php",
                data: {
                    id: "ent",
                    nameDB: $("#nameDB").val(),
                    liegID: $("#liegID").val()
                },
                success: function(a) {
                    a = $.parseJSON(a);
                    for (var b, e = [], c = "<option></option>", g = 0; g < a.length; g++) {
                        b = !1;
                        for (var f = 0; f < e.length; f++)
                            if (a[g].allgemeinerEnt == e[f]) {
                                b = !0;
                                break
                            } if (!b) {
                            c += "<optgroup label='" + a[g].allgemeinerEnt + "'>";
                            c += "<option title='gesamt'>" + a[g].allgemeinerEnt + "</option>";
                            e[e.length] = a[g].allgemeinerEnt;
                            for (b = 0; b < a.length; b++) a[b].allgemeinerEnt == a[g].allgemeinerEnt && (c += "<option>" + a[b].nameEnt + "</option>");
                            c += "</optgroup>"
                        }
                    }
                    $(".energietraegerVergl").empty();
                    $(".energietraegerVergl").append(c)
                }
            })
        },
        energietrInDBoxLieg = function() {
            $.ajax({
                type: "POST",
                async: !0,
                url: "php/energietraegerVersorgerEinlesen.php",
                data: {
                    id: "ent",
                    nameDB: $("#nameDB").val(),
                    liegID: $("#liegID").val()
                },
                success: function(a) {
                    a = JSON.parse(a);
                    $(".energietraegerLieg").empty();
                    $(".energietraegerLieg").append("<option></option>");
                    for (i = 0; i < a.length; i++) $(".energietraegerLieg").append("<option>" + a[i].nameEnt + "</option>");
                }
            })
        },
        dbFuerEnergietraegerFestlegen = function(a) {
            entDB = "Global" == a ? "gipscomm" : $("#nameDB").val()
        },
        bereicheVorhanden =
            () => {
                const activeMstTab =
                    $("#activeInstance").val() === "mstE" || $("#activeInstance").val() === "mstB"

                const noBereiche =
                    bereicheliste.length === 0

                if (noBereiche && activeMstTab) {
                    alert("Bitte legen Sie erst einen oder mehrere Bereiche an um dies/em/en Messstellen zuzuordnen !")
                    clearFields("mstEHinz")
                    clearFields("mstBHinz")
                    tabControlNav("tabBer")
                }
                return bereicheliste.length !== 0
            }

        bereicheInDropbox = function(a) {
            bereicheliste = [];

            $(".berPfad").empty()

            const addBereich =
                record =>
                bereicheliste
                .push(new Bereich($(".orgPfad").val(), $(".liegPfad").val(), record.nameBer, record.ber_ID))

            const fillBereicheliste =
                data =>
                data.forEach(addBereich)

            const addOption =
                ber =>
                $(".berPfad").append("<option>" + ber.nameBer + "</option>")

            const fillDropbox =
                () =>
                bereicheliste.forEach(addOption)

            fillBereicheliste(a)
            fillDropbox()
            bereicheVorhanden()
        },
        bereicheEinlesen = function() {
            const id = "berAuswahl"
            const nameDB = $("#nameDB").val()
            const liegID = $("#liegID").val()

            if (liegID !== "") {
                ajaxPost("php/getBereiche.php")({id, nameDB, liegID})
                .then(bereicheInDropbox)
            }
        },
        liegenschaftenInDropbox = function(a) {
            $(".liegPfad").empty();
            liegenschaftenliste = [];
            liegenschaft.Name = "";
            liegenschaft.LiegID = "";
            for (var b = 0; b < a.length; b++) liegenschaft.Name = a[b].nameLieg, liegenschaft.LiegID = a[b].lieg_ID, liegenschaftenliste[b] = liegenschaft, $(".liegPfad").append("<option>" + liegenschaftenliste[b].Name + "</option>")
            bereicheEinlesen()
        },
        liegenschaftenEinlesen = function() {
            "" !== $("#orgID").val() && $.ajax({
                type: "POST",
                async: true,
                url: "php/liegenschaftenEinlesen.php",
                data: {
                    nameDB: $("#nameDB").val(),
                    orgID: $("#orgID").val()
                },
                success: function(a) {
                    a = JSON.parse(a);
                    liegenschaftenInDropbox(a)
                }
            })
        },
        organisationenInDropbox = function(a) {
            $(".orgPfad").empty();
            organisationenliste = [];
            organisation.Name = "";
            organisation.OrgID = "";
            for (var b = 0; b < a.length; b++) organisation.Name = a[b].nameOrg, organisation.OrgID = a[b].org_ID, organisationenliste[b] = organisation, $(".orgPfad").append("<option>" + organisationenliste[b].Name + "</option>");
            liegenschaftenEinlesen()
        },
        organisationenEinlesen = function() {
            if ($("#nameDB").val() !== "") {
                $.ajax({
                  type: "POST",
                  async: true,
                  url: "php/organisationenEinlesen.php",
                  data: {
                    nameDB: $("#nameDB").val()
                  },
                  success: function(a) {
                    a = JSON.parse(a)
                    organisationenInDropbox(a)
                  }
                })
            }
        },
        manGrpInDropbox = function(a) {

            $(".manGrpPfad").empty();
            $(".manGrpPfad").append("<optgroup label='Mandantengruppen'>");
            $(".manGrpPfad").append("</optgroup>");
            for (n = 0; n < a.length; n++) manGrpListe[n] = new manGrp(a[n].name, a[n].manGrp_ID), $(".manGrpPfad optgroup").append("<option id='optManGrp_" + n + "'>" + manGrpListe[n].name + "</option>");
            $(".manGrpPfad").append("<optgroup label='Mandanten'>");
            $(".manGrpPfad").append("</optgroup>");
            a = $(".manPfad option").length / $(".manPfad").length;

            mandantenSelectDBs(function(output){
                $.each( output, function( m, value ) {
                    var dbname = value.nameMan;
                    $(".manGrpPfad optgroup").eq(1).append("<option data-id='"+value.man_ID+"' id='optMan_" + m + "'>" +
                    dbname + "</option>"), $(".manGrpPfad optgroup").eq(3).append("<option data-id='"+value.man_ID+"' id='optMan_" + m + "'>" + dbname + "</option>")
                });
            });

            // for (m = 0; m < a; m++) $(".manGrpPfad optgroup").eq(1).append("<option id='optMan_" + m + "'>" +
            //     $(".manPfad option").eq(m).text() + "</option>"), $(".manGrpPfad optgroup").eq(3).append("<option id='optMan_" + m + "'>" + $(".manPfad option").eq(m).text() + "</option>")
        },
        manGrpEinlesen = function() {
            $.ajax({
                type: "POST",
                async: !0,
                url: "php/manGrpEinlesen.php",
                data: {
                    nameDB: "gipscomm",
                    betrGrpID: $("#betrGrpID").val(),
                    manID: $("manID").val()
                },
                success: function(a) {
                    a = JSON.parse(a);
                    manGrpInDropbox(a)
                }
            })
        },
        manGrp = function(a, b) {
            this.name = a;
            this.manGrpID = b
        },
        betrGrpInDropbox = function(a) {
            $(".betrPfad").empty();
            for (n = 0; n < a.length; n++) betrGrpListe[n] =
                new betrGrp(a[n].firma, a[n].betrGrp_ID), $(".betrPfad").append("<option>" + betrGrpListe[n].firma + "</option>")
        },
        betrGrpEinlesen = function() {
            $.ajax({
                type: "POST",
                async: !0,
                url: "php/betrGrpEinlesen.php",
                data: {
                    nameDB: "gipscomm"
                },
                success: function(a) {
                    a = JSON.parse(a);
                    betrGrpInDropbox(a)
                }
            })
        },
        betrGrp = function(a, b) {
            this.firma = a;
            this.betrGrpID = b
        },
        mandantenInDropbox = function(a) {
            $(".manPfad").empty();
            for (var b = 0; b < a.length; b++) mandantenliste[b] = new mandant(a[b].dbName, a[b].man_ID, a[b].nameMan), $(".manPfad").append("<option>" +
                mandantenliste[b].name + "</option>");
            $("#manID").val(mandantenliste[0].manID);
            readInstanzen("manFirst", null);
            readInstanzen("orgFirst", 0);
            organisationenEinlesen();
            dbFuerEnergietraegerFestlegen($("#nameDB").val());
            energietrInDBoxLieg();
            readInstanzen("liegFirst", 0);
            [ "msm"
            , "std"
            , "anl"
            , "ent"
            , "enf"
            , "eRng"
            , "iMw"
            , "zp" ]
            .forEach(ident => readInstanzen(`${ident}First`, 0))
            liegNavID =
            berNavID =
            mstENavID =
            mstBNavID =
            msmNavID =
            stdNavID =
            anlNavID =
            entNavID =
            enfNavID =
            eRngNavID =
            iMwNavID =
            zpNavID = 0

            scpSchichtdaten.populateIndexedDB()
        },
        mandantenEinlesen = function(a, b, e) {
            $.ajax({
                type: "POST",
                async: !0,
                url: "php/mandantenEinlesen.php",
                data: {
                    betrGrpID: a,
                    ins: b,
                    manOderManGrpID: e
                },
                success: function(a) {
                    a = JSON.parse(a);
                    mandantenInDropbox(a)
                }
            })
        },
        mandant = function(a, b, e) {
            this.nameDB = a;
            this.manID = b;
            this.name = e
        },
        versorgerUndEinheitBefuellen = function() {
            var a =
                $("#inputEntERng").val(),
                a = "" != a ? $("#inputEntERng").val() : "";
            $.ajax({
                type: "POST",
                async: !0,
                url: "php/energietraegerVersorgerEinlesen.php",
                data: {
                    id: "versEinh",
                    nameDB: $("#nameDB").val(),
                    energietraeger: a
                },
                success: function(a) {
                    a = JSON.parse(a);
                    $("#versorgerERng, #versorgerIMw, #einERng").empty();
                    0 < a.length && ("" != a[0].versorgerEvu && $("#versorgerERng, #versorgerIMw").append("<option selected>" + a[0].versorgerEvu + "</option>"), "" != a[0].versorgerUenb && $("#versorgerERng, #versorgerIMw").append("<option>" + a[0].versorgerUenb +
                        "</option>"), "" != a[0].versorgerMsb && $("#versorgerERng, #versorgerIMw").append("<option>" + a[0].versorgerMsb + "</option>"), "" != a[0].einheit1Ent && $("#einERng").append("<option selected>" + a[0].einheit1Ent + "</option>"), "" != a[0].einheit2Ent && $("#einERng").append("<option>" + a[0].einheit2Ent + "</option>"), "" != a[0].einheit3Ent && $("#einERng").append("<option>" + a[0].einheit3Ent + "</option>"))
                }
            })
        },
        menuUndMainZentrieren = function() {
            var a;
            a = .5 * ($(window).innerWidth() - $("#main").width());
            $("#main").css("left", a + "px");
            $("#asideRight, #asideRight2").css("left", a + parseInt($("#main").width()) + "px");
            $("#asideLeft").css("left", a - parseInt($("#asideLeft").width()) - 2 + "px");
            "none" != $(".manPfad").css("display") ? $(".clearfix").css("margin-left", a - 20 + "px") : $(".clearfix").css("margin-left", a + 55 + "px")
        },
        formatNumber = function(a, b) {
            var e;
            if ($.isNumeric(b) || void 0 != b) {
                e = b.toString();
                var c = "";
                e = e.split(".");
                var g = 0;
                if ("form" == a) {
                    for (k = e[0].length - 1; - 1 < k; k--) g++, 3 == g && 0 != k ? (c = "." + e[0].charAt(k) + c, g = 0) : e[0].charAt(0) && (c = e[0].charAt(k) +
                        c);
                    c = $.isNumeric(e[1]) ? c + "," + e[1] : c + ",00";
                    c = c.replace("-.", "-")
                } else if ("deform" == a) {
                    if (-1 < b.indexOf(","))
                        for (l = 0; l < e.length; l++) c += e[l];
                    else c = b;
                    c = c.replace(",", ".")
                }
                $.isNumeric(c);
                return c
            }
        },
        vergleichUpdaten = function(a) {
            var b = [],
                e = 0,
                c = 0,
                g, f, h;
            "jahr1ERng" == a || "monate1ERng" == a || "vergEnt1ERng" == a || "vergMst1ERng" === a ?
            (h = tblAuswertung1ERng
            , b = [$("#jahr1ERng"), $("#monate1ERng"), $("#vergEnt1ERng"), $("#vergMst1ERng")]
            , g = $("#summeVerbr1ERng"), f = $("#summeKosten1ERng")) :
            (h = tblAuswertung2ERng
            , b = [$("#jahr2ERng"), $("#monate2ERng"), $("#vergEnt2ERng"), $("#vergMst2ERng")]
            , g = $("#summeVerbr2ERng"), f = $("#summeKosten2ERng"));
            h.search("").draw();
            h.columns().search("");
            h.columns(5).search(b[0].val()).draw();
            2 < b[1].prop("value").length ? h.columns(8, {
                search: "applied"
            }).search(b[1].prop("value")).draw() : h.columns(6, {
                search: "applied"
            }).search(b[1].prop("value")).draw();
            "gesamt" == $("#" + a + " option:selected").prop("title") ? h.columns(4, {
                search: "applied"
            }).search(b[2].val()).draw() : h.columns(3, {
                search: "applied"
            }).search(b[2].val()).draw();
            h.columns(2, {
                search: "applied"
            }).search(b[3].prop("value")).draw();
            h.column(9, {
                search: "applied"
            }).data().each(function(a) {
                a = formatNumber("deform", a);
                a = parseFloat(a);
                e += a
            });
            e = e.toString();
            a = e.split(".");
            $.isNumeric(a[1]) && 3 < a[1].length && (e = a[0] + "." + a[1].substr(0, 2));
            h.column(10, {
                search: "applied"
            }).data().each(function(a) {
                a.split(".");
                a = formatNumber("deform", a);
                a = parseFloat(a);
                c += a
            });
            c = c.toString();
            a = c.split(".");
            $.isNumeric(a[1]) && 3 < a[1].length && (c = a[0] + "." + a[1].substr(0, 1));
            h.order([6, "asc"]).draw();
            e = formatNumber("form", e);
            c = formatNumber("form", c);
            g.val(e);
            f.val(c);
            $("#sumVerbr1ERng").val($("#summeVerbr1ERng").val());
            $("#sumVerbr2ERng").val($("#summeVerbr2ERng").val());
            $("#sumKosten1ERng").val($("#summeKosten1ERng").val());
            $("#sumKosten2ERng").val($("#summeKosten2ERng").val());
            g = formatNumber("deform", $("#sumVerbr1ERng").val());
            f = formatNumber("deform", $("#sumVerbr2ERng").val());
            g = parseFloat(g);
            f = parseFloat(f);
            g = (f - g).toFixed(3);
            g = formatNumber("form", g);
            f = formatNumber("deform", $("#sumKosten1ERng").val());
            h = formatNumber("deform", $("#sumKosten2ERng").val());
            f = parseFloat(f);
            h = parseFloat(h);
            f = (h - f).toFixed(2);
            f = formatNumber("form", f);
            $("#diffVerbr12ERng").val(g);
            $("#diffKosten12ERng").val(f)
        },
        resetBenutzerdefJahreSpaEfVTbl1 = function() {
            $(".spaEfvJahreAuswahl").prop("checked", !1);
            $("#jahreSpaEfVBenutzerdef").css("display", "none")
        },
        getJahresstringBenutzerdefSpaEfV1 = function(a, b) {
            var e = $(".spaEfvJahreAuswahl"),
                c = $(".spaEfvJahreAuswahl ~ label"),
                g = e.length,
                f = !0,
                h = "";
            if ("basis" == a) h += "Jahr > RIGHT(CONVERT(varchar(20), getdate(), 104), 4) - 5 ";
            else if ("benutzerdefiniert" == a)
                if ("letzte5" == b) h += "Jahr > RIGHT(CONVERT(varchar(20), getdate(), 104), 4) - 5 ";
                else if ("benutzerdefJahre" == b)
                for (var q = 0; q < g; q++) e.eq(q).prop("checked") && f ? (h += "Jahr = '" + c.eq(q).text() + "' ", f = !1) : e.eq(q).prop("checked") ? h += "OR Jahr = '" + c.eq(q).text() + "' " : e.eq(q).prop("checked") && alert("getting the SpaEfV Benutzerdefinierte Jahre failed!! :func getJahresstringSpaEfVBenutzerdef()");
            else alert("getting the SpaEfV Jahres Modus failed!! :func getJahresstringSpaEfVBenutzerdef()");
            else alert("getting the SpaEfV Jahresstring failed!! :func getJahresstringSpaEfVBenutzerdef()");
            return h
        },
        getModusJahrSpaEfV2 = function() {
            var a;
            $("#letztesJahrSpaEfVTbl2").prop("checked") ? a = "letztesJahr" : $("#benutzerdefJahrSpaEfVTbl2").prop("checked") && (a = "benutzerdefJahr");
            return a
        },
        getModusDarzustellendeJahreSpaEfV1 = function() {
            var a;
            $("#jahreLetzte5SpaEfVTbl1").prop("checked") ? a = "letzte5" : $("#jahreBenutzerdefSpaEfVTbl1").prop("checked") && (a = "benutzerdefJahre");
            return a
        },
        getRechnungsjahre = function(a) {
            $.ajax({
                type: "POST",
                async: !0,
                url: "php/getRechnungsjahre.php",
                data: {
                    nameDB: $("#nameDB").val(),
                    modus: a,
                    liegID: $("#liegID").val(),
                    orgID: $("#orgID").val()
                },
                success: function(a) {
                    a = JSON.parse(a);
                    var b;
                    $("#jahreSpaEfVBenutzerdef").empty();
                    for (var c = 0; c < a.length; c++) b = "<input class='spaEfvJahreAuswahl' type='checkbox'/><label>" + a[c].Jahr + "</label><br>", $("#jahreSpaEfVBenutzerdef").append(b)
                }
            })
        },
        getVerdichtungSpaEfV = function(a) {
            var b;
            1 == a ? $("#entsVerdichtetSpaEfVTbl1").prop("checked") ? b = "verdichtet" : $("#entsUnverdichtetSpaEfVTbl1").prop("checked") &&
                (b = "unverdichtet") : 2 == a ? $("#entsVerdichtet1SpaEfVTbl2").prop("checked") ? b = "verdichtet1" : $("#entsVerdichtet2SpaEfVTbl2").prop("checked") ? b = "verdichtet2" : $("#entsUnverdichtetSpaEfVTbl2").prop("checked") && (b = "unverdichtet") : alert("getting the SpaEfV verdichtung failed!! :func getVerdichtungSpaEfV(tabelle)");
            return b
        },
        detailAuswahlAnzeigenSpaEfV = function(a, b) {
            var e;
            e = a ? "inline" : "none";
            $(".spaEfVBenutzerdefiniert" + b).css("display", e)
        },
        getVersionSpaEfV = function(a) {
            var b;
            $("#basisSpaEfVTbl" + a).prop("checked") ?
                b = "basis" : $("#benutzerdefiniertSpaEfVTbl" + a).prop("checked") ? b = "benutzerdefiniert" : alert("getting the SpaEfV version failed!! :func getVersionSpaEfV(tabelle)");
            return b
        },
        getModusSpaEfV = function(a) {
            var b;
            $("#mandantGesamtSpaEfVTbl" + a).prop("checked") ? b = "gesamt" : $("#organisationSpaEfVTbl" + a).prop("checked") ? b = "organisation" : $("#liegenschaftSpaEfVTbl" + a).prop("checked") ? b = "liegenschaft" : alert("getting the SpaEfV mode failed!! :func getModusSpaEfV(tabelle)");
            return b
        },
        SpaEfVTbl2Erstellen = function(a, b,
            e, c) {
            $.ajax({
                type: "POST",
                async: !0,
                url: "php/Auswertungen/getSpaEfVTbl2Data.php",
                data: {
                    nameDB: $("#nameDB").val(),
                    teil: "verbrauch",
                    modus: a,
                    version: b,
                    verdichtung: e,
                    jahr: c,
                    liegID: $("#liegID").val(),
                    orgID: $("#orgID").val()
                },
                success: function(a) {
                    a = JSON.parse(a);
                    a = JSON.stringify(a);
                    sessionStorage.setItem("jsonStringVerbrauch", a)
                }
            });
            $.ajax({
                type: "POST",
                async: !0,
                url: "php/Auswertungen/getSpaEfVTbl2Data.php",
                data: {
                    nameDB: $("#nameDB").val(),
                    teil: "anlagen",
                    modus: a,
                    version: b,
                    verdichtung: e,
                    jahr: c,
                    liegID: $("#liegID").val(),
                    orgID: $("#orgID").val()
                },
                success: function(a) {
                    a = JSON.parse(a);
                    a = JSON.stringify(a);
                    sessionStorage.setItem("jsonStringAnlagen", a)
                }
            });
            $.ajax({
                type: "POST",
                async: !0,
                url: "php/Auswertungen/getSpaEfVTbl2Data.php",
                data: {
                    nameDB: $("#nameDB").val(),
                    teil: "messstellen",
                    modus: a,
                    version: b,
                    verdichtung: e,
                    jahr: c,
                    liegID: $("#liegID").val(),
                    orgID: $("#orgID").val()
                },
                success: function(b) {
                    b = JSON.parse(b);
                    "gesamt" == a ? instanzName = 1 == $("#orgCount").val() ? $(".orgPfad").val() : $(".manPfad").val() : "organisation" == a ? instanzName = $(".orgPfad").val() :
                        "liegenschaft" == a && (instanzName = $(".liegPfad").val());
                    b = JSON.stringify(b);
                    sessionStorage.setItem("instanzName", instanzName);
                    sessionStorage.setItem("jsonStringMessstellen", b)
                }
            });
            $.ajax({
                type: "POST",
                async: !0,
                url: "php/Auswertungen/testMassInput.php",
                data: {
                    nameDB: $("#nameDB").val(),
                    jahr: c,
                    einheit: "Betriebsstunden"
                },
                success: function(a) {
                    a = JSON.parse(a);
                    a = JSON.stringify(a);
                    sessionStorage.setItem("jsonStringMassInput", a);
                    setTimeout(function() {
                        window.open("SpaEfV_Tabelle_2.html", "_blank")
                    }, 2E3)
                }
            })
        },
        SpaEfVTbl1Erstellen =function(a, b, e, c) {
            $.ajax({
                type: "POST",
                async: !0,
                url: "php/Auswertungen/getSpaEfVTbl1Data.php",
                data: {
                    nameDB: $("#nameDB").val(),
                    modus: a,
                    version: b,
                    verdichtung: e,
                    jahreSqlString: c,
                    liegID: $("#liegID").val(),
                    orgID: $("#orgID").val()
                },
                success: function(b) {
                    b = JSON.parse(b);
                    var c;
                    "gesamt" == a ? c = 1 == $("#orgCount").val() ? $(".orgPfad").val() : $(".manPfad").val() : "organisation" == a ? c = $(".orgPfad").val() : "liegenschaft" == a && (c = $(".liegPfad").val());
                    b = JSON.stringify(b);
                    var e;
                    e = 1 == $(".spaEfvJahreAuswahl[checked=true]").length ?
                        !0 : !1;
                    sessionStorage.setItem("jsonString", b);
                    sessionStorage.setItem("einJahr", e);
                    sessionStorage.setItem("instanzName", c);
                    window.open("SpaEfV_Tabelle_1.html", "_blank")
                }
            })
        },
        zaehlpunktNrInFeld = function(a) {
            $.ajax({
                type: "POST",
                async: !0,
                url: "php/getZaehlpunktNr.php",
                data: {
                    ins: "zaehlpunkt",
                    nameMst: a,
                    nameDB: $("#nameDB").val()
                },
                success: function(a) {
                    a = JSON.parse(a);
                    0 < a.length && $("#zpNrERng").val(a[0].zaehlpunktNr)
                }
            })
        },
        passwortAuswertenGipscAdm = function() {
            $("#gipscAdmZugang").dialog({
                height: 180,
                width: 250,
                resize: "auto",
                classes: {"ui-dialog-titlebar-close" : "closeButton"},
                show: {
                    effect: "fade",
                    duration: 500
                },
                hide: {
                    effect: "fade",
                    duration: 500
                },
                modal: true,
                open : () => {
                    $("#zugangOk").off("click");
                    $("#zugangOk").on("click", function() {
                        $.ajax({
                            type: "POST",
                            async: !0,
                            url: "php/evalGipscAdmPw.php",
                            data: {},
                            success: function(a) {
                                a = JSON.parse(a)[0].pw;
                                a.trim();
                                var b = getHash($("#pwGipscAdm").val());
                                b.trim();
                                b == a ? ($("#tabGipscAdm").css("background-color", "#CED6DE"), $("#infosGipscommAdmins").css("display", "block"), $("#activeInstance").val("gipscAdm"), $("#gipscAdmZugang").dialog("close")) : (alert("Das Passwort ist falsch!"),
                                    $("#tabGipscAdm").css("background-color", "#B9C0C7"), $("#infosGipscommAdmins").css("display", "none"), $("#activeInstance").val("gipscAdm"), $("#gipscAdmZugang").dialog("close"), $("#tabBetrGrp").trigger("click"))
                            }
                        })
                    })
                    $("#zugangAbbrechen").on("click", function() {
                        $("#gipscAdmZugang").dialog("close")
                        $("#tabBetrGrp").trigger("click")
                    })
                    $(".closeButton").on("click", function() {
                        $("#closeButton").dialog("close")
                        $("#tabBetrGrp").trigger("click")
                    })
                }
            });
            
        },
        letzteRechnungenInTbl = function(a) {
            $.ajax({
                type: "POST",
                async: !0,
                url: "php/getRechnungen.php",
                data: {
                    id: "letzteRng",
                    nameMst: a,
                    nameDB: $("#nameDB").val(),
                    mstID: $("#mstIDERng").val()
                },
                success: function(a) {
                    a = JSON.parse(a);
                    var b, c;
                    tblLetzteRechnungen.clear().draw();
                    for (i = 0; i < a.length; i++) b = a[i].vomERng + "-" + a[i].bisERng, c = a[i].verbrauchERng,
                        c = formatNumber("form", c), tblLetzteRechnungen.row.add([b, c]).draw()
                }
            })
        },
        einheitenEntEinlesen = function(a) {
            $.ajax({
                type: "POST",
                async: !0,
                url: "php/getEngConsumptionData.php",
                data: {
                    nameDB: $("#nameDB").val(),
                    energietraeger: a
                },
                success: function(a) {
                    a = JSON.parse(a);
                    $("#einERng").empty();
                    0 < a.length && ("" != a[0].einheit1Ent && null != a[0].einheit1Ent && $("#einERng").append("<option>" + a[0].einheit1Ent + "</option>"), "" != a[0].einheit2Ent && null != a[0].einheit2Ent && $("#einERng").append("<option>" + a[0].einheit2Ent + "</option>"),
                        "" != a[0].einheit3Ent && null != a[0].einheit3Ent && $("#einERng").append("<option>" + a[0].einheit3Ent + "</option>"))
                }
            })
        },
        verbrauchBerechnen = function(a, b, e, c) {
            $.ajax({
                type: "POST",
                async: !0,
                url: "php/energietraegerVersorgerEinlesen.php",
                data: {
                    id: a,
                    nameDB: $("#nameDB").val(),
                    energietraeger: b
                },
                success: function(b) {
                    b = JSON.parse(b);
                    var f;
                    0 < b.length && (e == b[0].einheit1Ent ? f = b[0].entEinh1FaktorKwh : e == b[0].einheit2Ent ? f = b[0].entEinh2FaktorKwh : e == b[0].einheit3Ent && (f = b[0].entEinh3FaktorKwh), -1 != c.indexOf(",") && (c = formatNumber("deform",
                        c)), f *= c, f = f.toFixed(2), "mengeERng" == a || "einERng" == a) && ($("#mengeERng").val(formatNumber("form", c)), $("#verbrauchERng").val(formatNumber("form", f)))
                }
            })
        },
        datensatzAusHistorieEinlesenPrd = function(a) {
            $.ajax({
                url: "php/getHistorieDatensatz.php",
                type: "POST",
                data: {
                    modus: "prd",
                    nameDB: $("#nameDB").val(),
                    prdID: a
                },
                fail: function() {
                    alert("Fehler!!!")
                },
                success: function(a) {
                    var b = JSON.parse(a);
                    $("#prdID").val(b[index].prd_ID);
                    [
                        ["#bezeichnungPrdHist", "namePrd"],
                        ["#artklnrPrdHist", "artikelNrPrd"],
                        ["#custom1PrdHist","custom1"],
                        ["#custom2PrdHist", "custom2"],
                        ["#custom3PrdHist", "custom3"],
                        ["#custom4PrdHist", "custom4"],
                        ["#custom5PrdHist", "custom5"],
                        ["#custom6PrdHist", "custom6"],
                        ["#inpAnlage1PrdHist", "anl1"],
                        ["#gueltigVon1PrdHist", "gueltigVon1"],
                        ["#gueltigBis1PrdHist", "gueltigBis1"],
                        ["#inpAnlage2PrdHist", "anl2"],
                        ["#gueltigVon2PrdHist", "gueltigVon2"],
                        ["#gueltigBis2PrdHist", "gueltigBis2"],
                        ["#inpAnlage3PrdHist", "anl3"],
                        ["#gueltigVon3PrdHist", "gueltigVon3"],
                        ["#gueltigBis3PrdHist", "gueltigBis3"],
                        ["#inpAnlage4PrdHist", "anl4"],
                        ["#gueltigVon4PrdHist", "gueltigVon4"],
                        ["#gueltigBis4PrdHist", "gueltigBis4"],
                        ["#inpAnlage5PrdHist", "anl5"],
                        ["#gueltigVon5PrdHist", "gueltigVon5"],
                        ["#gueltigBis5PrdHist", "gueltigBis5"],
                        ["#inpAnlage6PrdHist", "anl6"],
                        ["#gueltigVon6PrdHist", "gueltigVon6"],
                        ["#gueltigBis6PrdHist", "gueltigBis6"],
                        ["#inpAnlage7PrdHist", "anl7"],
                        ["#gueltigVon7PrdHist", "gueltigVon7"],
                        ["#gueltigBis7PrdHist", "gueltigBis7"],
                        ["#inpAnlage8PrdHist", "anl8"],
                        ["#gueltigVon8PrdHist", "gueltigVon8"],
                        ["#gueltigBis8PrdHist", "gueltigBis8"],
                        ["#inpAnlage9PrdHist","anl9"],
                        ["#gueltigVon9PrdHist", "gueltigVon9"],
                        ["#gueltigBis9PrdHist", "gueltigBis9"]
                    ].forEach(function(a) {
                        $(a[0]).val(b[0][a[1]])
                    })
                }
            })
        },
        datensatzAusHistorieEinlesenAnl = function(a) {
            $.ajax({
                url: "php/getHistorieDatensatz.php",
                type: "POST",
                data: {
                    modus: "anl",
                    nameDB: $("#nameDB").val(),
                    anlID: a
                },
                fail: function() {
                    alert("Fehler!!!")
                },
                success: function(a) {
                    var b = JSON.parse(a);
                    $("#aktivAllgemeinAnlHist").prop("checked", b[0].aktivAnl);
                    $("#bildAllgemeinAnlHist").prop("src", b[0].bildAnl);
                    $("#mehrProdukteAllgemeinAnlHist").prop("checked", b[0].mehrProdukteAnl);
                    [
                        ["#anlIDHist", "anl_ID"],
                        ["#idAllgemeinAnlHist", "anl_ID"],
                        ["#bereichAllgemeinAnlHist", "nameBer"],
                        ["#berIDHist", "ber_ID"],
                        ["#anlagennummerAllgemeinAnlHist", "nummerAnl"],
                        ["#bezeichnungAllgemeinAnlHist", "bezeichnungAnl"],
                        ["#typAllgemeinAnlHist", "typAnl"],
                        ["#serienNrAllgemeinAnlHist", "serienNrAnl"],
                        ["#standortAllgemeinAnlHist", "standortAnl"],
                        ["#baujahrAnlHist", "baujahrAnl"],
                        ["#datumAnschaffungAllgemeinAnlHist", "datumAnschaffungAnl"],
                        ["#betriebsstundenAllgemeinAnlHist", "jahresbetriebsstundenAnl"],
                        ["#notizAllgemeinAnlHist", "notizAnl"],
                        ["#gueltigVonAnlHist", "gueltigVonAnl"],
                        ["#gueltigBisAnlHist", "gueltigBisAnl"],
                        ["#produktAllgemeinAnlHist", "produktAnl"],
                        ["#produktionsmenge1AllgemeinAnlHist", "produktionsmengeAnl"],
                        ["#einheitProduktionsmenge1AllgemeinAnlHist", "produktionsmengeEinheitAnl"],
                        ["#produktnummer1AllgemeinAnlHist", "produktnummerAnl"],
                        ["#zugeordneterVerbraucher1AllgemeinAnlHist", "zugeordneterVerbraucher1"],
                        ["#zugeordneterVerbraucher2AllgemeinAnlHist", "zugeordneterVerbraucher2"],
                        ["#zugeordneterVerbraucher3AllgemeinAnlHist",
                            "zugeordneterVerbraucher3"
                        ],
                        ["#zugeordneterVerbraucher4AllgemeinAnlHist", "zugeordneterVerbraucher4"],
                        ["#zugeordneterVerbraucher5AllgemeinAnlHist", "zugeordneterVerbraucher5"],
                        ["#zugeordneterVerbraucher6AllgemeinAnlHist", "zugeordneterVerbraucher6"],
                        ["#energietraeger1AllgemeinAnlHist", "energietraeger1Anl"],
                        ["#energieform1AllgemeinAnlHist", "energieform1Anl"],
                        ["#einheit1AnlHist", "einheitEnergie1Anl"],
                        ["#anschlussleistung1AnlHist", "anschlussleistung1Anl"],
                        ["#mittlereAuslastungProzent1AnlHist", "mittlereAuslastungProzent1Anl"],
                        ["#mittlereAuslastungKw1AnlHist", "mittlereAuslastungKw1Anl"],
                        ["#betriebstemperatur1AnlHist", "betriebstemperatur1Anl"],
                        ["#mst1AnlHist", "messstelle1Anl"],
                        ["#ber1AnlHist", "versBereich1Anl"],
                        ["#abwaerme1AnlHist", "abwaerme1Anl"],
                        ["#nutzbarkeitAbwaerme1AnlHist", "abwaermeNutzbarkeit1Anl"],
                        ["#bewertungNutzbarkeitAbwaerme1AnlHist", "bewertungNutzbarkeitAbwaerme1Anl"],
                        ["#energietraeger2AllgemeinAnlHist", "energietraeger2Anl"],
                        ["#energieform2AllgemeinAnlHist", "energieform2Anl"],
                        ["#einheit2AnlHist", "einheitEnergie2Anl"],
                        ["#anschlussleistung2AnlHist", "anschlussleistung2Anl"],
                        ["#mittlereAuslastungProzent2AnlHist", "mittlereAuslastungProzent2Anl"],
                        ["#mittlereAuslastungKw2AnlHist", "mittlereAuslastungKw2Anl"],
                        ["#betriebstemperatur2AnlHist", "betriebstemperatur2Anl"],
                        ["#mst2AnlHist", "messstelle2Anl"],
                        ["#ber2AnlHist", "versBereich2Anl"],
                        ["#abwaerme2AnlHist", "abwaerme2Anl"],
                        ["#nutzbarkeitAbwaerme2AnlHist", "abwaermeNutzbarkeit2Anl"],
                        ["#bewertungNutzbarkeitAbwaerme2AnlHist", "bewertungNutzbarkeitAbwaerme2Anl"],
                        ["#energietraeger3AllgemeinAnlHist",
                            "energietraeger3Anl"
                        ],
                        ["#energieform3AllgemeinAnlHist", "energieform3Anl"],
                        ["#einheit3AnlHist", "einheitEnergie3Anl"],
                        ["#anschlussleistung3AnlHist", "anschlussleistung3Anl"],
                        ["#mittlereAuslastungProzent3AnlHist", "mittlereAuslastungProzent3Anl"],
                        ["#mittlereAuslastungKw3AnlHist", "mittlereAuslastungKw3Anl"],
                        ["#betriebstemperatur3AnlHist", "betriebstemperatur3Anl"],
                        ["#mst3AnlHist", "messstelle3Anl"],
                        ["#ber3AnlHist", "versBereich3Anl"],
                        ["#abwaerme3AnlHist", "abwaerme3Anl"],
                        ["#nutzbarkeitAbwaerme3AnlHist", "abwaermeNutzbarkeit3Anl"],
                        ["#bewertungNutzbarkeitAbwaerme3AnlHist", "bewertungNutzbarkeitAbwaerme3Anl"],
                        ["#energietraeger4AllgemeinAnlHist", "energietraeger4Anl"],
                        ["#energieform4AllgemeinAnlHist", "energieform4Anl"],
                        ["#einheit4AnlHist", "einheitEnergie4Anl"],
                        ["#anschlussleistung4AnlHist", "anschlussleistung4Anl"],
                        ["#mittlereAuslastungProzent4AnlHist", "mittlereAuslastungProzent4Anl"],
                        ["#mittlereAuslastungKw4AnlHist", "mittlereAuslastungKw4Anl"],
                        ["#betriebstemperatur4AnlHist", "betriebstemperatur4Anl"],
                        ["#mst4AnlHist", "messstelle4Anl"],
                        ["#ber4AnlHist", "versBereich4Anl"],
                        ["#abwaerme4AnlHist", "abwaerme4Anl"],
                        ["#nutzbarkeitAbwaerme4AnlHist", "abwaermeNutzbarkeit4Anl"],
                        ["#bewertungNutzbarkeitAbwaerme4AnlHist", "bewertungNutzbarkeitAbwaerme4Anl"],
                        ["#custom1AnlHist", "custom1Anl"],
                        ["#custom2AnlHist", "custom2Anl"],
                        ["#custom3AnlHist", "custom3Anl"],
                        ["#custom4AnlHist", "custom4Anl"],
                        ["#custom5AnlHist", "custom5Anl"],
                        ["#custom6AnlHist", "custom6Anl"]
                    ].forEach(function(a) {
                        $(a[0]).val(b[0][a[1]])
                    })
                }
            })
        },
        historieAendernFensterOeffnen = function(a) {
            $(a).dialog({
                title: "Editor Anlagenhistorie",
                height: 1200,
                width: 900
            })
        };
        const createDocumentList =
            ins => {
                const nameDB = $("#nameDB").val()
                const verwaltung = ins
                const id =
                    ins === "Anl" ?
                    $("#anlID").val() :
                    ins === "Msm" ?
                    $("#msmID").val() :
                    $("#eRngID").val()

                ajaxPost("php/getDokumente.php")({nameDB, verwaltung, id})
                .then(
                    result => {
                        const len = result.length

                        const tblDataTable =
                            ins === "Anl" ?
                            tblDokumenteAnl :
                            ins === "Msm" ?
                            tblDokumenteMsm :
                            {}

                        if (len > 0) {

                            const tblHtmlSelect = `#tblDokumente${verwaltung} tbody`

                            if (verwaltung === "ERng") {
                                $("#aktuellesDokNameERng").val("")

                                $("#aktuellesDokIDERng").val(result[len - 1].dok_ID)
                                $("#aktuellesDokNameERng").val(result[len - 1].nameDok)

                                $("#aktuellesDokNameERng").off("dblclick")
                                $("#aktuellesDokNameERng").on("dblclick",
                                    () => dokumentAuswaehlenUndAuslesen($("#aktuellesDokNameERng").val(), $("#aktuellesDokIDERng").val())
                                )

                            }
                            else {
                                clearTable(tblDataTable)

                                const prepareTableData =
                                    records =>
                                    records.map(
                                        a =>
                                        [ a.dok_ID
                                        , a.nameDok
                                        , a.erweiterungDok
                                        , a.kategorieDok
                                        ]
                                    )

                                intoTable(tblDataTable)(prepareTableData(result))

                                tblDataTable.column(0).visible(false)

                                $(tblHtmlSelect + "tr").css("cursor", "pointer")
                                $(tblHtmlSelect).off("dblclick", "tr")
                                $(tblHtmlSelect).on("dblclick", "tr",
                                function() {
                                  var a = tblDataTable.row(this).data();
                                  dokumentAuswaehlenUndAuslesen(a[1], a[0])
                                })
                            }
                        }
                        else if (verwaltung === "ERng") {
                            [ "#aktuellesDokIDERng"
                            , "#aktuellesDokNameERng"
                            , "#dokuAuswahlERng"
                            ].forEach(a => $(a).val(""))

                            $("#dokuAuswahlERng").text("")
                        }
                        else {
                            clearTable(tblDataTable)
                        }
                    }
                )
            }
        dokumenteLoeschen = function(a, b) {
            $.ajax({
                url: "uploadsDownloads/php/dokumenteLoeschen.php",
                type: "POST",
                data: {
                    nameDB: $("#nameDB").val(),
                    deleteMode: a,
                    fileID: b
                },
                success: function(a) {
                    [ "Anl"
                    , "Msm"
                    , "ERng"
                    ].forEach(createDocumentList)
                }
            })
        };
        dokumentAuswaehlenUndAuslesen = function(a, b) {
            $("#dokID").val(b);
            dokumenteLoeschen(0, null);
            var e = toggleLabelUndLadenSymbol();
            $(e).css("display", "inline");
            $.ajax({
                url: "uploadsDownloads/php/download.php",
                type: "POST",
                data: {
                    nameDB: $("#nameDB").val(),
                    dateiName: a,
                    verwaltung: $("#verwaltung").val(),
                    id: b
                },
                success: function(a) {
                    $(e).css("display", "none");
                    $("#downloadLink").prop("href", "uploadsDownloads/docs/" + $("#nameDB").val() + "/" + a);
                    $("#webViewerLink").prop("href",
                        "uploadsDownloads/docs/" + $("#nameDB").val() + "/" + a);
                    $("#btnDokLoeschen").css("display", "inline-block");
                    $("#dokDlOderLoeschenContainer").dialog({
                        height: 290,
                        width: 240,
                        resize: "auto"
                    })
                }
            })
        };
        function dokumentAuswaehlenUndEinlesen(evt) {
            var file = evt.target.files[0];

            var fileName = file.name;

            if (fileName.length < 30) {

                fileName = umlauteZuErsatzzeichenKonvertieren(fileName);

                var formData = new FormData();

                formData.append('file', file);
                formData.append('fileName', fileName);
                formData.append('nameDB', $("#nameDB").val());

                var isImg = false;
                var imgVerw = false;
                var firstPartUrl = "uploadsDownloads/php/";
                var dokUploadsUrl = firstPartUrl + "upload.php";

                if (this.id == "imgUploadAnl") {
                    var url = firstPartUrl + 'uploadImage.php';

                    isImg = true;
                    imgVerw = "Anl";
                } else if (this.id == "imgUploadMsm") {
                    var url = firstPartUrl + 'uploadImage.php';

                    isImg = true;
                    imgVerw = "Msm";
                } else if (this.id == "dokuAuswahlAnl") {

                    formData.append('id', $("#anlID").val());
                    formData.append('verwaltung', "Anl");
                    formData.append('kategorie', $("#kategorie").val());

                    var url = dokUploadsUrl;

                } else if (this.id == "dokuAuswahlMsm") {
                    formData.append('id', $("#msmID").val());
                    formData.append('verwaltung', "Msm");
                    formData.append('kategorie', $("#kategorie").val());
                    var url = dokUploadsUrl;
                } else if (this.id == "dokuAuswahlERng") {
                    formData.append('id', $("#eRngID").val());
                    formData.append('verwaltung', "ERng");
                    formData.append('kategorie', $("#kategorie").val());

                    var url = dokUploadsUrl;
                }

                var ladenSymbolID = toggleLabelUndLadenSymbol();

                $(ladenSymbolID).css("display", "inline");

                const idVerwaltung = this.id

                $.ajax({
                    url: url,
                    type: 'POST',
                    data: formData,
                    processData: false, // tell jQuery not to process the data
                    contentType: false, // tell jQuery not to set contentType
                    success: function (data) {
                        result = json(data)

                        $(ladenSymbolID).css("display", "none");

                        if (isImg) {
                            var imgID;

                            if (imgVerw == "Anl") {
                                imgID = "#bildAllgemeinAnl";
                            } else {
                                imgID = "#bildAllgemeinMsm";
                            }
                            $(imgID)
                            .prop("src", "uploadsDownloads/images/" + $("#nameDB")
                            .val() + "/" + data);
                        }
                        else {
                            let table;
                            switch (idVerwaltung) {
                                case "dokuAuswahlAnl" :
                                intoTable(tblDokumenteAnl)([result])  // CHANGE: fills table with Anlagen Dokumente 03.06.2020
                                break;
                                case "dokuAuswahlMsm" :
                                intoTable(tblDokumenteMsm)([result])  // CHANGE: fills table with Messmittel Dokumente 03.06.2020
                                break;
                                default :
                                $("#aktuellesDokNameERng").val(result[1])  // CHANGE: changes name of Downloadfield to name of currently uploaded file 03.06.2020
                                break;
                            }

                        }
                    }
                });
            }
            else {
                alert("Der Dateiname des Dokuments ist zu lang ! (max 30 Zeichen)")
            }
        };
        kategorieWaehlen = function() {
            $("#dokKategorieWaehlenFenster").css("display", "block");
            $("#dokKategorieWaehlenFenster").dialog({
                resize: "auto",
                show: {
                    effect: "fade",
                    duration: 500
                },
                hide: {
                    effect: "fade",
                    duration: 500
                }
            })
        }, versorgerInHistorie = function() {
            var a = tblVersorgerHistorie,
                b = $("#versorgerEvuEnt").val(),
                e = $("#versorgerUenbEnt").val(),
                c = $("#versorgerMsbEnt").val(),
                g = $("#gueltigVomEnt").val() + " - " + $("#gueltigBisEnt").val(),
                f = a.rows().count();
            $("#modusVers").val("neu");
            a.row.add([f, b, e, c, g]).column(0).visible(!1).order([0, "desc"]).draw()
        }, umlauteZuErsatzzeichenKonvertieren = function(a) {
            a = a.replace(/\u00c4/g, "Ae");
            a = a.replace(/\u00e4/g, "ae");
            a =
                a.replace(/\u00d6/g, "Oe");
            a = a.replace(/\u00f6/g, "oe");
            a = a.replace(/\u00dc/g, "Ue");
            a = a.replace(/\u00fc/g, "ue");
            return a = a.replace(/\u00df/g, "ss")
        }, createCustomField = function(a) {
            "std" == a ? "none" == $("#custom1Std").css("display") ? $("#custom1Std").css("display", "block") : "none" == $("#custom2Std").css("display") ? $("#custom2Std").css("display", "block") : "none" == $("#custom3Std").css("display") ? $("#custom3Std").css("display", "block") : "none" == $("#custom4Std").css("display") ? $("#custom4Std").css("display", "block") : "none" == $("#custom5Std").css("display") ? $("#custom5Std").css("display",
                "block") : "none" == $("#custom6Std").css("display") ? $("#custom6Std").css("display", "block") : ($("#meldungCustomFields").css("display", "block"), $("#meldungCustomFields").dialog()) : "none" == $("#" + a + "FaktorX1").css("display") ? $("#" + a + "FaktorX1").css("display", "block") : "none" == $("#" + a + "FaktorX2").css("display") ? $("#" + a + "FaktorX2").css("display", "block") : "none" == $("#" + a + "FaktorX3").css("display") ? $("#" + a + "FaktorX3").css("display", "block") : ($("#meldungCustomFields").css("display", "block"), $("#meldungCustomFields").dialog())
        },
        vorgelagertenBereichAktivieren = function(a) {
            "4.1-Umwandlungserzeuger-T1" == $(a).prop("value") || "4.2-Umwandlungserzeuger-T2" == $(a).prop("value") || "5-Wiedereinspeisepunkt" == $(a).prop("value") ? $("#vorgelagerteBereiche2AllgemeinBer").removeAttr("disabled") : ($("#vorgelagerteBereiche2AllgemeinBer").val(""), $("#vorgelagerteBereiche2AllgemeinBer").attr("disabled", "disabled"))
        }, readinLevel = function(a) {
            $("#levelAllgemeinBer").val($(a).prop("value"))
        }, benutzerErstellen = function() {
            $.ajax({
                type: "POST",
                async: !0,
                url: "../php/setBenutzer.php",
                data: {
                    id: "ben",
                    mandant: $("#manAuswahlBen"),
                    aendDatum: Date(),
                    name: $("#nameBen").val(),
                    vorname: $("#vornameBen").val(),
                    benutzername: $("#benutzernameBen").val(),
                    passwort: $("#passwortBen").val(),
                    sichtAuswertungen: $("#sichtAuswertungenBen").val(),
                    editAuswertungen: $("#editAuswertungenBen").val(),
                    sichtStammdaten: $("#sichtStammdatenBen").val(),
                    editStammdaten: $("#editStammdatenBen").val()
                },
                success: function() {
                    alert("erfolgreich gespeichert!")
                }
            })
        }, toggleLabelUndLadenSymbol = function() {
            "Anl" ==
            $("#verwaltung").val() ? ladenSymbolID = "#ladenSymbolAnl, #ladenLblAnl" : "Msm" == $("#verwaltung").val() ? ladenSymbolID = "#ladenSymbolMsm, #ladenLblMsm" : "ERng" == $("#verwaltung").val() && (ladenSymbolID = "#ladenSymbolERng, #ladenLblERng");
            return ladenSymbolID
        }, toggleMandantOderMandantengruppe = function(a) {
            "Mandantengruppe" == a ? ($("#manGruppenForm").css("display", "block"), $("#navDropBoxManGrp img").css("display", "inline")) : ($("#manGruppenForm").css("display", "none"), $("#navDropBoxManGrp img").css("display", "none"))
        },
        toggleStandorteDritter = function(a) {
            1 == $(a).prop("checked") ? $(".stdDrExtDl").css("display", "inline") : ($(".stdDrExtDl").css("display", "none"), $(".stdDrExtDl input").val(""))
        }, toggleExtDl = function(a) {
            1 == $(a).prop("checked") ? ($("#tabExtDl").css("display", "inline"), $("#tabStdDr").css("display", "inline")) : ($("#tabExtDl").css("display", "none"), $("#tabStdDr").css("display", "none"))
        }, toggleColumnsOnOff = function(a) {
            for (i = 0; i < tblAnlagen.columns().nodes().length; i++) $(tblAnlagen.column(i).header()).text() == $(a).prop("value") &&
                tblAnlagen.column(i).visible($(a).is(":checked")), tblAnlagen.columns.adjust().draw()
        }, diagrammGruppeHinzuf\u00fcgen = function() {
            tblGruppenDiag.row.add([$("#gruppeDiag").val()]).draw();
            $("#gruppeDiag").val("")
        }, anlagenfelderHinzufuegenProdukteverwaltung = function() {
            var a = {
                    hidden: "none" === $("#divAnlPrd2").css("display"),
                    show: function() {
                        $("#divAnlPrd2").css("display", "block")
                    }
                },
                b = {
                    hidden: "none" === $("#divAnlPrd3").css("display"),
                    show: function() {
                        $("#divAnlPrd3").css("display", "block")
                    }
                };
            a.hidden && b.hidden ?
                a.show() : b.hidden ? b.show() : alert("Die maximale Anzahl an Anlagen ist erreicht!")
        }, anlagenlistenSchemaEinlesen = function() {
            $.ajax({
                type: "POST",
                async: !0,
                url: "php/get_set_AnlagenlistenOrderUndSchema.php",
                data: {
                    id: "getAnlSchema",
                    nameDB: $("#nameDB").val()
                },
                success: function(a) {
                    a = $.parseJSON(a);
                    a = a[0].toString().split(",");
                    for (i = 0; i < a.length; i++) tblAnlagen.column(i + 2).visible(!!+a[i]), $(".anlListeCheckboxes").eq(i).prop("checked", !!+a[i])
                }
            })
        }, anlagenlistenSpaltenAnordnungEinlesen = function() {
            $.ajax({
                type: "POST",
                async: !0,
                url: "php/get_set_AnlagenlistenOrderUndSchema.php",
                data: {
                    id: "getAnlSpalten",
                    nameDB: $("#nameDB").val()
                },
                success: function(a) {
                    a = $.parseJSON(a);
                    a = a[0].toString().split(",");
                    for (i = 0; i < a.length - 1; i++);
                    tblAnlagen.colReorder.order(0, 1, a)
                }
            })
        }, berPfadChange = function(this_) {
            $(".berPfad").val($(this_).val());
            $("#berID").val(bereicheliste[$(".berPfad").prop("selectedIndex")].berID)

            readInstanzen("berFirst", $(".berPfad").prop("selectedIndex"))
            readInstanzen("msmFirst", 0)
            readInstanzen("stdFirst", 0)
            readInstanzen("anlFirst", 0)
            readInstanzen("entFirst", 0)
            readInstanzen("enfFirst", 0)
            readInstanzen("eRngFirst", 0)
            readInstanzen("iMwFirst", 0)
            readInstanzen("zpFirst", 0)
        }, liegPfadChange = function(a) {
            $(".liegPfad").val($(a).val())
            if (liegenschaftenliste[$(".liegPfad").prop("selectedIndex")] === "undefined") {
                $("#liegID").val(liegenschaftenliste[$(".liegPfad").prop("selectedIndex")].LiegID);
            } else {
                $("#liegID").val('');
            }

            readInstanzen("liegFirst", $(".liegPfad").prop("selectedIndex"))

            readInstanzen("msmFirst", 0)
            readInstanzen("stdFirst", 0)
            readInstanzen("anlFirst", 0)
            readInstanzen("entFirst", 0)
            readInstanzen("enfFirst", 0)
            readInstanzen("eRngFirst", 0)
            readInstanzen("iMwFirst", 0)
            readInstanzen("zpFirst", 0)
            bereicheEinlesen()
        }, orgPfadChange = function(a) {
            $(".orgPfad").val($(a).val());
            $("#orgID").val(organisationenliste[$(".orgPfad").prop("selectedIndex")].OrgID);
            readInstanzen("orgFirst", $(".orgPfad").prop("selectedIndex"));
            liegenschaftenEinlesen()
        }, tabelleEinlesen = function(a) {
            $.ajax({
                type: "POST",
                async: !0,
                url: "php/tabellen.php",
                data: {
                    ins: "tabelle",
                    nameDB: $("#nameDB").val(),
                    tabelle: a
                },
                success: function(a) {
                    a = JSON.parse(a);
                    var b = "<tr>\n" + Object.keys(a[0]).map(function(a) {
                        return "<th>" + a + "</th>\n"
                    }).join().replace(/,/g, " ") + "</tr>";
                    $("#tblChannelZuordnungProdSuchen thead").empty().append(b);
                    a = a.map(function(a) {
                        return "<tr>\n" + Object.keys(a).map(function(b) {
                            return "<td>" + a[b] + "</td>\n"
                        }).join().replace(/,/g, " ") + "</tr>\n"
                    }).join().replace(/,/g,
                        " ");
                    $("#tblChannelZuordnungProdSuchen tbody").empty().append(a);
                    $("#tblChannelZuordnungProdSuchen thead").on("dblclick", "th", function() {
                        var a = $(this)[0].textContent;
                        $("#zugeordneteDynDataPrdID").val(a)
                    })
                }
            })
        }, kennzahlenAuswahllisteErstellen = function(a) {
            $.ajax({
                type: "POST",
                async: !0,
                url: "php/readKennzahlen.php",
                data: {
                    ins: "knzIns",
                    nameDB: $("#nameDB").val(),
                    orgID: $("#orgID").val()
                },
                success: function(b) {
                    b = JSON.parse(b);
                    tblKennzahlInstanzAuswahl.clear().draw();
                    for (var e = 0; e < b.length; e++) tblKennzahlInstanzAuswahl.row.add([b[e].knzIns_ID,
                        b[e].bezug, b[e].instanz, b[e].beschreibung
                    ]).draw();
                    $("#kennzahlenAuswahlContainer").css("display", "block");
                    $("#kennzahlenAuswahlContainer").dialog({
                        height: $(window).height() - .25 * $(window).height(),
                        width: $(window).width() - .25 * $(window).width(),
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
                            $("#tblKennzahlInstanzAuswahl tbody tr").css("cursor", "pointer");
                            $("#tblKennzahlInstanzAuswahl tbody").off("dblclick", "tr");
                            $("#tblKennzahlInstanzAuswahl tbody").on("dblclick",
                                "tr",
                                function() {
                                    var b = tblKennzahlInstanzAuswahl.row(this).data();
                                    $.ajax({
                                        type: "POST",
                                        async: !0,
                                        url: "php/readKennzahlen.php",
                                        data: {
                                            ins: "knz",
                                            nameDB: $("#nameDB").val(),
                                            knzInsID: b[0]
                                        },
                                        success: function(c) {
                                            c = JSON.parse(c);
                                            tblKennzahlAuswahl.clear().draw();
                                            for (var e = 0; e < c.length; e++) tblKennzahlAuswahl.row.add([c[e].knz_ID, c[e].bezeichnung, c[e].aktiv, c[e].anwendungsbereich, c[e].einheit, atob(c[e].formelString), c[e].kennzahl, c[e].grenzwertO, c[e].grenzwertU, c[e].zielwert, c[e].zielVon, c[e].zielBis]).draw();
                                            $("#tblKennzahlAuswahl tbody tr").css("cursor",
                                                "pointer");
                                            $("#tblKennzahlAuswahl tbody").off("dblclick", "tr");
                                            $("#tblKennzahlAuswahl tbody").on("dblclick", "tr", function() {
                                                var c = tblKennzahlAuswahl.row(this).data();
                                                switch (a) {
                                                    case "imgBtnknzDiag11":
                                                        $("#knzDiag1").val(c[1]);
                                                        $("#knzIDDiag1").val(c[0]);
                                                        sessionStorage.setItem("knz_1_kennz", c[6]);
                                                        sessionStorage.setItem("knz_1_obergr", c[7]);
                                                        sessionStorage.setItem("knz_1_untergr", c[8]);
                                                        sessionStorage.setItem("knz_1_zielwert", c[9]);
                                                        sessionStorage.setItem("knz_1_zielVon", c[10]);
                                                        sessionStorage.setItem("knz_1_zielBis",
                                                            c[11]);
                                                        break;
                                                    case "imgBtnknzDiag12":
                                                        $("#knzDiag2").val(c[1]);
                                                        $("#knzIDDiag2").val(c[0]);
                                                        break;
                                                    case "imgBtnknzDiag13":
                                                        $("#knzDiag3").val(c[1]), $("#knzIDDiag3").val(c[0])
                                                }
                                                sessionStorage.setItem("bezugKnz", b[1]);
                                                sessionStorage.setItem("headerKnz", b[2]);
                                                $("#kennzahlenAuswahlContainer").dialog("close");
                                                tblKennzahlAuswahl.clear().draw();
                                            })
                                        }
                                    })
                                })
                        }
                    })
                }
            })
        }, standorteAuswahllisteErstellen = function(a) {
            const nameDB = $("#nameDB").val()
            const liegID = $("#liegID").val()

            ajaxPost("php/getStandorte.php")({nameDB, liegID})
            .then(result => {

                const prepareTableData =
                    records =>
                    records.map(
                        a =>
                        [ a.nameStd
                        , a.kurzbezeichnungStd
                        , a.flaecheStd
                        ]
                    )

                const fillStandorteTbl =
                    data => {
                        clearTable(tblStandorteAuswahl)
                        intoTable(tblStandorteAuswahl)(prepareTableData(data))
                    }

                const selectionIntoField =
                    this_ => {
                        const selectedData = tblStandorteAuswahl.row(this_).data()

                        "berSuchenOrt" === a.id ? $("#ortBer").val(head(selectedData)) :
                        "ortSuchenMstE" === a.id ? $("#ortMstE").val(head(selectedData)) :
                        "ortSuchenMstB" === a.id ? $("#ortMstB").val(head(selectedData)) :
                        "anlAuswahlStd" === a.id && $("#standortAllgemeinAnl").val(head(selectedData))
                    }

                    fillStandorteTbl(result)

                    $("#standorteAuswahlContainer").css("display", "block");
                    $("#standorteAuswahlContainer").dialog({
                    height: $(window).height() - .25 * $(window).height(),
                    width: $(window).width() - .25 * $(window).width(),
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
                        $("#tblStandorteAuswahl tbody tr").css("cursor", "pointer");
                        $("#tblStandorteAuswahl tbody").off("dblclick", "tr");
                        $("#tblStandorteAuswahl tbody").on("dblclick", "tr",
                        function() {
                            selectionIntoField(this)
                            $("#standorteAuswahlContainer").dialog("close")
                        })
                    }
                })
            })
        }, durchleitungAuswahllisteErstellen = function(a) {
            nameDB = $("#nameDB").val()
            liegID = $("#liegID").val()

            ajaxPost("php/getExtDurchleitungen.php")({nameDB, liegID})
            .then(result => {

                const prepareTableData =
                    records =>
                    records.map(
                        a =>
                        [ a.nameExtDl
                        , a.anschriftExtDl
                        , `${a.nameAnsprechpartnerExtDl}, ${a.vornameAnsprechpartnerExtDl}`
                        , a.extDl_ID
                        ]
                    )

                const fillDurchleitungenTbl =
                    data => {
                        clearTable(tblExtDurchleitungenAuswahl)
                        intoTable(tblExtDurchleitungenAuswahl)(prepareTableData(data))
                    }

                const selectionIntoField =
                    this_ => {
                        const selectedData = tblExtDurchleitungenAuswahl.row(this_).data()

                        "extDlSuchenMstE" === a.id ?
                        ($("#dlAnMstE").val(head(selectedData)), $("#dlAnMstIDE").val(selectedData[3])) :
                        ($("#dlAnMstB").val(head(selectedData)), $("#dlAnMstIDB").val(selectedData[3]))
                    }

                    fillDurchleitungenTbl(result)

                    $("#extDurchleitungenAuswahlContainer").css("display", "block")
                    $("#extDurchleitungenAuswahlContainer").dialog({
                    height: $(window).height() - .25 * $(window).height(),
                    width: $(window).width() - .25 * $(window).width(),
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
                        $("#tblExtDurchleitungenAuswahl tbody tr").css("cursor", "pointer")
                        $("#tblExtDurchleitungenAuswahl tbody").off("dblclick", "tr")
                        $("#tblExtDurchleitungenAuswahl tbody").on("dblclick", "tr",
                        function() {
                            selectionIntoField(this)
                            $("#extDurchleitungenAuswahlContainer").dialog("close")
                        })
                    }
                })
            })
        }, kanalauswahlTabelleErstellen = function(a) {
            $.ajax({
                type: "POST",
                async: !0,
                url: "php/getChannel.php",
                data: {
                    nameDB: $("#nameDB").val()
                },
                success: function(b) {
                    b = JSON.parse(b);
                    tblChannel.clear().draw();
                    for (var e = 0; e < b.length; e++) tblChannel.row.add([b[e].channel_id, b[e].description, b[e].label, b[e].phase]).draw();
                    $("#ChannellisteContainer").css("display", "block");
                    $("#ChannellisteContainer").dialog({
                        height: 400,
                        width: 600,
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
                            $("#channelliste tbody tr").css("cursor", "pointer");
                            $("#channelliste tbody").off("dblclick", "tr");
                            $("#channelliste tbody").on("dblclick",
                                "tr",
                                function() {
                                    var b = tblChannel.row(this).data();
                                    "anlSuchenKanal1" == a ? $("#kanal1AllgemeinMsm").val(b[0]) : "anlSuchenKanal2" == a ? $("#kanal2AllgemeinMsm").val(b[0]) : "anlSuchenKanal3" == a && $("#kanal3AllgemeinMsm").val(b[0]);
                                    $("#ChannellisteContainer").dialog("close")
                                })
                        }
                    })
                }
            })
        }, messmittelAuswahllisteErstellen = function(a) {
            const id = a.id
            const nameDB = $("#nameDB").val()
            const liegID = $("#liegID").val()

            ajaxPost("php/getMessmittel.php")({id, nameDB, liegID})
            .then(result => {

                const prepareTableData =
                    records =>
                    records.map(
                        a =>
                        [ a.nrMsm
                        , a.typNrMsm
                        , a.anlageMsm
                        , a.energietraegerMsm
                        , a.msm_ID
                        ]
                    )

                const fillMessmittelTbl =
                    data => {
                        clearTable(tblMessmittel)
                        intoTable(tblMessmittel)(prepareTableData(data))
                    }

                const selectionIntoField =
                    this_ => {
                        const selectedData = tblMessmittel.row(this_).data()

                        "msmSuchenMstE" === a.id ?
                        ($("#messmittelBerechnungslogikMstE").val(head(selectedData)), $("#messmittelIDMstE").val(selectedData[4])) :
                        ($("#messmittelBerechnungslogikMstB").val(head(selectedData)), $("#messmittelIDMstB").val(selectedData[4]))
                    }

                    fillMessmittelTbl(result)

                    $("#messmittelAuswahlContainer").css("display", "block");
                    $("#messmittelAuswahlContainer").dialog({
                    height: $(window).height() - .25 * $(window).height(),
                    width: $(window).width() - .25 * $(window).width(),
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
                        $("#tblMessmittel tbody tr").css("cursor", "pointer");
                        $("#tblMessmittel tbody").off("dblclick", "tr");
                        $("#tblMessmittel tbody").on("dblclick", "tr",
                        function() {
                            selectionIntoField(this)
                            $("#messmittelAuswahlContainer").dialog("close")
                        })
                    }
                })
            })
        }, anlagenAuswahllisteErstellen = function(a, b) {
            const ins = a
            const nameDB = $("#nameDB").val()
            const liegID = $("#liegID").val()
            const orgID = $("#orgID").val()

            ajaxPost("php/getAnlagen.php")({ins, nameDB, liegID, orgID})
            .then(result => {

                const prepareTableData =
                    records =>
                    records.map(
                        a =>
                        [ a.nummerAnl
                        , a.bezeichnungAnl
                        , a.typAnl
                        , a.custom1Anl
                        , a.custom2Anl
                        , a.custom3Anl
                        , a.custom4Anl
                        , a.custom5Anl
                        , a.custom6Anl
                        , a.anl_ID
                        ]
                    )

                const fillAnlagenTbl =
                    data => {
                        clearTable(tblAnlagenII)
                        intoTable(tblAnlagenII)(prepareTableData(data))
                    }

                const selectionIntoField =
                    this_ => {
                        for (var c = tblAnlagenII.row(this_).data(), e = []; e.length;) e.pop();
                        e = a.split("Verbr");
                        "anlMsm" == a ? ($("#anlMsm").val(c[0] + " " + c[1]), $("#anlIDMsm").val(c[9])) :
                        "anlMstE" == a ? ($("#anlMstE").val(c[0] + " " + c[1]), $("#anlIDMstE").val(c[9])) :
                        "anlMstB" == a ? ($("#anlMstB").val(c[0] + " " + c[1]), $("#anlIDMstB").val(c[9])) :
                        "imgBtnAnlage1Prd" == a ? ($("#inpAnlage1Prd").val(c[0] + " " + c[1]), $("#inpAnlage1IDPrd").val(c[9])) :
                        "imgBtnAnlage2Prd" == a ? ($("#inpAnlage2Prd").val(c[0] + " " + c[1]), $("#inpAnlage2IDPrd").val(c[9])) :
                        "imgBtnAnlage3Prd" == a ? ($("#inpAnlage3Prd").val(c[0] + " " + c[1]), $("#inpAnlage3IDPrd").val(c[9])) :
                        "imgBtnAnlage4Prd" == a ? ($("#inpAnlage4Prd").val(c[0] + " " + c[1]), $("#inpAnlage4IDPrd").val(c[9])) :
                        "imgBtnAnlage5Prd" == a ? ($("#inpAnlage5Prd").val(c[0] + " " + c[1]), $("#inpAnlage5IDPrd").val(c[9])) :
                        "imgBtnAnlage6Prd" == a ? ($("#inpAnlage6Prd").val(c[0] + " " + c[1]), $("#inpAnlage6IDPrd").val(c[9])) :
                        "imgBtnAnlage7Prd" == a ? ($("#inpAnlage7Prd").val(c[0] + " " + c[1]), $("#inpAnlage7IDPrd").val(c[9])) :
                        "imgBtnAnlage8Prd" == a ? ($("#inpAnlage8Prd").val(c[0] + " " + c[1]), $("#inpAnlage8IDPrd").val(c[9])) :
                        "imgBtnAnlage9Prd" == a ? ($("#inpAnlage9Prd").val(c[0] + " " + c[1]), $("#inpAnlage9IDPrd").val(c[9])) :
                        "imgBtnAnlage1PrdHist" == a ? $("#inpAnlage1PrdHist").val(c[0] + " " + c[1]) :
                        "imgBtnAnlage2PrdHist" == a ? $("#inpAnlage2PrdHist").val(c[0] + " " + c[1]) :
                        "imgBtnAnlage3PrdHist" == a ? $("#inpAnlage3PrdHist").val(c[0] + " " + c[1]) :
                        "imgBtnAnlage4PrdHist" == a ? $("#inpAnlage4PrdHist").val(c[0] + " " + c[1]) :
                        "imgBtnAnlage5PrdHist" == a ? $("#inpAnlage5PrdHist").val(c[0] + " " + c[1]) :
                        "imgBtnAnlage6PrdHist" == a ? $("#inpAnlage6PrdHist").val(c[0] + " " + c[1]) :
                        "imgBtnAnlage7PrdHist" == a ? $("#inpAnlage7PrdHist").val(c[0] + " " + c[1]) :
                        "imgBtnAnlage8PrdHist" == a ? $("#inpAnlage8PrdHist").val(c[0] + " " + c[1]) :
                        "imgBtnAnlage9PrdHist" == a ? $("#inpAnlage9PrdHist").val(c[0] + " " + c[1]) :
                        0 < e.length && "anlAuswahlZug" == e[0] ? ($("#zugeordneterVerbraucher" + e[1] + "AllgemeinAnl").val(c[0] + " " + c[1]), $("#zugeordneterVerbraucherID" + e[1] + "AllgemeinAnl").val(c[9])) :
                        "anlVorlFrm" == a && (e = "[" + (c[0] + "_" + c[1]).trim().replace(/\s/g, "_") + "]", c = "anl_" + c[9], $("#inpAuswahlVorlFrmIns" + b).val(e), $("#inpAuswahlVorlFrmIDIns" + b).val(c))
                    }

                    fillAnlagenTbl(result)

                    $("#anlagenlisteAuswahlContainer").css("display", "block");
                    $("#anlagenlisteAuswahlContainer").dialog({
                    height: $(window).height() - .25 * $(window).height(),
                    width: $(window).width() - .25 * $(window).width(),
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
                        $("#tblAnlagenListe2 tbody tr").css("cursor", "pointer");
                        $("#tblAnlagenListe2 tbody").off("dblclick", "tr");
                        $("#tblAnlagenListe2 tbody").on("dblclick", "tr",
                        function() {
                            selectionIntoField(this)
                            $("#anlagenlisteAuswahlContainer").dialog("close")
                        })
                    }
                })
            })
        }, messstellenAuswahllisteErstellen = function(a, b, e) {
            const ins = a
            const nameDB = $("#nameDB").val()
            const orgID = $("#orgID").val()
            const liegID = $("#liegID").val()
            const berID = $("#berID").val()
            const nameEnt = b

            ajaxPost("php/getMessstellen.php")({ins, nameDB, orgID, liegID, berID, nameEnt})
            .then(result => {

                const prepareTableData =
                    records =>
                    records.map(
                        a =>
                        [ a.nameMSt
                        , a.kurzbezeichnungMst
                        , a.kostenstelleMst
                        , a.messmittelBerechnungslogikMst
                        , a.mst_ID
                        , a.messartMst
                        ]
                    )

                const fillMessstellenTbl =
                    data => {
                        clearTable(tblMessstelleAuswahl)
                        intoTable(tblMessstelleAuswahl)(prepareTableData(data))
                    }

                const selectionIntoField =
                    this_ => {
                        const selectedData = tblMessstelleAuswahl.row(this_).data()

                        if ("vorgelagerteMstE" === a) $("#vorgelagerteMstE").val(selectedData[0]), $("#vorgelagerteMstIDE").val(selectedData[4]);
                        else if ("vorgelagerteMstB" === a) $("#vorgelagerteMstB").val(selectedData[0]), $("#vorgelagerteMstIDB").val(selectedData[4]);
                        else if ("mstMsm" == a) $("#messstelleAllgemeinMsm").val(selectedData[0]), $("#messstelleIDAllgemeinMsm").val(selectedData[4]);
                        else if ("mstERng" == a) $("#mstERng").val(selectedData[0]), $("#mstIDERng").val(selectedData[4]), $("#mstERng").trigger("change");
                        else if ("mst1Anl" == a) $("#mst1Anl").val(selectedData[0]), $("#ber1Anl").val(selectedData[2]), $("#mst1IDAnl").val(selectedData[4]);
                        else if ("mst2Anl" == a) $("#mst2Anl").val(selectedData[0]), $("#ber2Anl").val(selectedData[2]), $("#mst2IDAnl").val(selectedData[4]);
                        else if ("mst3Anl" == a) $("#mst3Anl").val(selectedData[0]), $("#ber3Anl").val(selectedData[2]), $("#mst3IDAnl").val(selectedData[4]);
                        else if ("mst4Anl" == a) $("#mst4Anl").val(selectedData[0]), $("#ber4Anl").val(selectedData[2]), $("#mst4IDAnl").val(selectedData[4]);
                        else if ("mstZp" == a) $("#mstZp").val(selectedData[0]), $("#mstZp").trigger("change");
                        else if ("mst1ExtDl" == a) $("#messstelle1ExtDl").val(selectedData[0]);
                        else if ("mst2ExtDl" == a) $("#messstelle2ExtDl").val(selectedData[0]);
                        else if ("mst3ExtDl" == a) $("#messstelle3ExtDl").val(selectedData[0]);
                        else if ("mst4ExtDl" == a) $("#messstelle4ExtDl").val(selectedData[0]);
                        else if ("mst5ExtDl" == a) $("#messstelle5ExtDl").val(selectedData[0]);
                        else if ("mst6ExtDl" == a) $("#messstelle6ExtDl").val(selectedData[0]);
                        else if ("mstEngRes1ExtDl" == a) $("#messstelleEngRes1ExtDl").val(selectedData[0]);
                        else if ("mstEngRes2ExtDl" == a) $("#messstelleEngRes2ExtDl").val(selectedData[0]);
                        else if ("mstEngRes3ExtDl" == a) $("#messstelleEngRes3ExtDl").val(selectedData[0]);
                        else if ("mstEngRes4ExtDl" == a) $("#messstelleEngRes4ExtDl").val(selectedData[0]);
                        else if ("mstEngRes5ExtDl" == a) $("#messstelleEngRes5ExtDl").val(selectedData[0]);
                        else if ("mstEngRes6ExtDl" == a) $("#messstelleEngRes6ExtDl").val(selectedData[0]);
                        else if ("mstDiag1" == a) $("#mstDiag1").val(selectedData[0]), $("#mstIDDiag1").val(selectedData[4]), $("#mstMessart1").val(selectedData[5]);
                        else if ("mstDiag2" == a) $("#mstDiag2").val(selectedData[0]), $("#mstIDDiag2").val(selectedData[4]), $("#mstMessart2").val(selectedData[5]);
                        else if ("mstDiag3" == a) $("#mstDiag3").val(selectedData[0]), $("#mstIDDiag3").val(selectedData[4]), $("#mstMessart3").val(selectedData[5]);
                        else if ("mstCompDiag" == a) $("#mstDiag").val(selectedData[0]), $("#mstIDDiag").val(selectedData[4]);
                        else if ("mstDatenexport" == a) $("#mstDatenexport").val(selectedData[0]), $("#mstIDDatenexport").val(selectedData[4]);
                        else if ("mstSuchenVergl1" == a) $("#vergMst1ERng").val(selectedData[0]), vergleichUpdaten("vergMst1ERng");
                        else if ("mstSuchenVergl2" == a) $("#vergMst2ERng").val(selectedData[0]), vergleichUpdaten("vergMst2ERng");
                        else if ("mstVorlFrm" == a) {
                            var c = "[" + ("" + selectedData[0]).trim().replace(/\s/g, "_") + "]",
                                b = "mst_" + selectedData[4];
                            $("#inpAuswahlVorlFrmIns" + e).val(c);
                            $("#inpAuswahlVorlFrmIDIns" + e).val(b)
                        }
                    }

                    fillMessstellenTbl(result)

                    $("#messstellenAuswahlContainer").css("display", "block")
                    $("#messstellenAuswahlContainer").dialog({
                    height: $(window).height() - .25 * $(window).height(),
                    width: $(window).width() - .25 * $(window).width(),
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
                        $("#tblMessstellenlisteMst tbody tr").css("cursor", "pointer")
                        $("#tblMessstellenlisteMst tbody").off("dblclick", "tr")
                        $("#tblMessstellenlisteMst tbody").on("dblclick", "tr",
                        function() {
                            selectionIntoField(this)
                            $("#messstellenAuswahlContainer").dialog("close")
                        })
                    }
                })
            })
        }, bereichsAuswahllisteErstellen = function(a) {
            ("berSuchenVBereich1" == a.id || "berSuchenVBereich2" == a.id && 0 == $("#vorgelagerteBereiche2AllgemeinBer").prop("disabled") ||
                "anlAuswahlBer" == a.id) && $.ajax({
                type: "POST",
                async: !0,
                url: "php/getBereiche.php",
                data: {
                    id: "berAuswahl",
                    liegID: $("#liegID").val(),
                    nameDB: $("#nameDB").val()
                },
                success: function(b) {
                    b = JSON.parse(b);
                    tblBereichAussuchen.colReorder.reset();
                    tblBereichAussuchen.clear().draw();
                    for (var e = 0; e < b.length; e++) tblBereichAussuchen.row.add([b[e].ber_ID, b[e].nameBer, b[e].kurzbezeichnungBer]).draw();
                    tblBereichAussuchen.column(0).visible(!1);
                    $("#bereichListeContainer").css("display", "block");
                    $("#bereichListeContainer").dialog({
                        height: $(window).height() -
                            .125 * $(window).height(),
                        width: $(window).width() - .125 * $(window).width(),
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
                            $("#tblBereichelisteBer tbody tr").css("cursor", "pointer");
                            $("#tblBereichelisteBer tbody").off("dblclick");
                            $("#tblBereichelisteBer tbody").on("dblclick", "tr", function() {
                                var b = tblBereichAussuchen.row(this).data();
                                "berSuchenVBereich1" == a.id ? $("#vorgelagerteBereiche1AllgemeinBer").val(b[1]) : $("#vorgelagerteBereiche2AllgemeinBer").val(b[1]);
                                $("#bereichListeContainer").dialog("close")
                            })
                        }
                    })
                }
            })
        }, standortdatenDritteAuswahllisteErstellen = function(a) {
            $.ajax({
                type: "POST",
                async: !0,
                url: "php/getStandortdatenDritter.php",
                data: {
                    liegID: $("#liegID").val(),
                    nameDB: $("#nameDB").val()
                },
                success: function(b) {
                    b = JSON.parse(b);
                    tblStdDrAuswahl.clear().draw();
                    for (var e = 0; e < b.length; e++) tblStdDrAuswahl.row.add([b[e].nameStdDr, b[e].kurzbezeichnungStdDr, b[e].flaecheStdDr, b[e].custom1InputStdDr, b[e].custom2InputStdDr, b[e].custom3InputStdDr, b[e].custom4InputStdDr,
                        b[e].custom5InputStdDr, b[e].custom6InputStdDr
                    ]).draw();
                    $("#stdDrAuswahlContainer").css("display", "block");
                    $("#stdDrAuswahlContainer").dialog({
                        height: 400,
                        width: 600,
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
                            $("#tblStdDrAuswahl tbody tr").css("cursor", "pointer");
                            $("#tblStdDrAuswahl tbody").off("dblclick", "tr");
                            $("#tblStdDrAuswahl tbody").on("dblclick", "tr", function() {
                                var b = tblStdDrAuswahl.row(this).data(),
                                    e = a.slice(0, a.length - 1),
                                    f = a.slice(-1);
                                "stdDrSuchenExtDl" ==
                                e ? $("#standort" + f + "ExtDl").val(b[0]) : $("#standort" + f + "EngResExtDl").val(b[0]);
                                $("#stdDrAuswahlContainer").dialog("close")
                            })
                        }
                    })
                }
            })
        }, gespeicherteDiagrammeAuswahllisteErstellen = function() {
            sessionStorage.setItem("nameDB", $("#nameDB").val());
            sessionStorage.setItem("year", "");
            sessionStorage.setItem("month", "");
            sessionStorage.setItem("day", "");
            sessionStorage.setItem("from", "");
            sessionStorage.setItem("to", "");
            sessionStorage.setItem("chartType", "line");
            sessionStorage.setItem("displayMean", "");
            sessionStorage.setItem("nameMst_1",
                "");
            sessionStorage.setItem("nameMst_2", "");
            sessionStorage.setItem("nameMst_3", "");
            sessionStorage.setItem("mstID_1", "");
            sessionStorage.setItem("mstID_2", "");
            sessionStorage.setItem("mstID_3", "");
            sessionStorage.setItem("queryString_1", "");
            sessionStorage.setItem("queryString_2", "");
            sessionStorage.setItem("queryString_3", "");
            $.ajax({
                type: "POST",
                async: !0,
                url: "php/getGespDiagramme.php",
                data: {
                    nameDB: $("#nameDB").val()
                },
                success: function(a) {
                    console.log("type records of: " + typeof a);
                    console.log("type json(records) of: " +
                        typeof JSON.parse(a));
                    tblGespDiagrammeListe.clear();
                    var b = function(a) {
                        return head(a).name
                    };
                    JSON.parse(a).map(function(a) {
                        return [a.gDia_ID, a.name, a.beschreibung, a.typ, JSON.parse(a.jsonDiag).map(b), a.bemerkung]
                    }).forEach(tblGespDiagrammeListe.row.add);
                    tblGespDiagrammeListe.draw();
                    $("#diagrammeAuswahlContainer").dialog({
                        height: 400,
                        width: 900,
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
                            $("#tblGespDiagrammeListe tbody tr").css("cursor", "pointer");
                            $("#tblGespDiagrammeListe tbody").off("dblclick",
                                "tr");
                            $("#tblGespDiagrammeListe tbody").on("dblclick", "tr", function() {
                                var a = tblGespDiagrammeListe.row(this).data();
                                sessionStorage.setItem("loadDiag", !0);
                                sessionStorage.setItem("loadDiagID", a[0]);
                                $("#diagrammeAuswahlContainer").dialog("close");
                                var b = "";
                                switch (a[3]) {
                                    case "year":
                                        b = "chartYear.html";
                                        break;
                                    case "month":
                                        b = "chartMonth.html";
                                        break;
                                    case "month 15min":
                                        b = "chartMonth15min.html";
                                        break;
                                    case "day":
                                        b = "chartDay.html";
                                        break;
                                    case "day 15min":
                                        b = "chartDay15min.html";
                                        break;
                                    case "custom":
                                        b = "chartBenDef15min.html"
                                }
                                sessionStorage.setItem("nameDB",
                                    $("#nameDB").val());
                                window.open(b, "_blank")
                            })
                        }
                    })
                }
            })
        }, mandantenAuswahllisteErstellen = function() {
            $.ajax({
                type: "POST",
                async: !0,
                url: "php/getMandanten.php",
                data: {
                    id: "mandantenBetrGruppen",
                    betrGrpID: $("#betrGrpID").val(),
                    nameDB: "gipscomm"
                },
                success: function(a) {
                    a = JSON.parse(a);
                    tblMandantenAuswahl.clear().draw();
                    for (var b = 0; b < a.length; b++) tblMandantenAuswahl.row.add([a[b].man_ID, a[b].nameMan, a[b].dbName, a[b].holdingstruktur]).draw();
                    tblMandantenAuswahl.column(0).visible(!1).draw();
                    $("#mandantenlisteAuswahlContainer").css("display",
                        "block");
                    $("#mandantenlisteAuswahlContainer").dialog({
                        height: 400,
                        width: 600,
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
                            $("#tblMandantenAuswahl tbody tr").css("cursor", "pointer");
                            $("#tblMandantenAuswahl tbody").off("dblclick", "tr");
                            $("#tblMandantenAuswahl tbody").on("dblclick", "tr", function() {
                                var a = tblMandantenAuswahl.row(this).data();
                                tblMandantengruppe.row.add([a[0], a[1], a[2], a[3]]).draw();
                                tblMandantengruppe.column(0).visible(!1).draw();
                                $("#mandantenlisteAuswahlContainer").dialog("close")
                            })
                        }
                    })
                }
            })
        },
        vorlagenformelAuswahllisteErstellen = function() {
            $.ajax({
                type: "POST",
                async: !0,
                url: "php/getVorlagenformeln.php",
                data: {
                    nameDB: $("#nameDB").val()
                },
                success: function(a) {
                    a = JSON.parse(a);
                    tblVorlFrmZuordnen.clear().draw();
                    a.forEach(function(a) {
                        tblVorlFrmZuordnen.row.add([a.vorlFrm_ID, a.bezeichnung, atob(a.formel)]).draw()
                    });
                    $("#vorlFrmZuordnenContainer").css("display", "block");
                    $("#vorlFrmZuordnenContainer").dialog({
                        height: 800,
                        width: 600,
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
                            $("#tblVorlFrmZuordnen tbody tr").css("cursor", "pointer");
                            $("#tblVorlFrmZuordnen tbody").off("dblclick", "tr");
                            $("#tblVorlFrmZuordnen tbody").on("dblclick", "tr", function() {
                                $("#vorlFrmFuellen div").remove();
                                var a = tblVorlFrmZuordnen.row(this).data();
                                $("#lblGewVorlagenformel").text(a[2]);
                                filterInstanzen(a[2]).forEach(function(a, b) {
                                    $("#vorlFrmFuellen").append('\n                                <div style="font-size: 14px;">\n                                <label id="lblAuswahlVorlFrmIns' +
                                        b + '" style="display: inline-block;width: 200px;"><img id="auswahlVorlFrmIns' + b + '" title="Instanz ausw\u00e4hlen" src="images/search.png" alt="suchen, ausw\u00e4hlen" style="height:10px;width:10px;float:right;" />' + a + '</label>\n                                <input id="inpAuswahlVorlFrmIns' + b + '" class="vorlString" tyle="width:150px; font-size: 12px;" readonly/>\n                                <input id="inpAuswahlVorlFrmIDIns' + b + '" class="vorlID" style="display:none;"/>\n                                </div>\n                                ');
                                    $("#auswahlVorlFrmIns" + b).off("click").hover(function() {
                                        $("#auswahlVorlFrmIns" + b).css("background-color", "white").css("cursor", "pointer")
                                    }, function() {
                                        $("#auswahlVorlFrmIns" + b).css("background-color", "transparent").css("cursor", "default")
                                    }).on("click", function() {
                                        "mst" === a ? messstellenAuswahllisteErstellen("mstVorlFrm", void 0, b) : "anl" === a ? anlagenAuswahllisteErstellen("anlVorlFrm", b) : "frm" === a ? formelAuswahllisteErstellen("frmVorlFrm", b) : produkteAuswahllisteErstellen("prdVorlFrm", b)
                                    })
                                })
                            })
                        }
                    })
                }
            })
        }, produkteAuswahllisteErstellen =
        function(a, b) {
            $.ajax({
                type: "POST",
                async: !0,
                url: "php/getProdukte.php",
                data: {
                    nameDB: $("#nameDB").val(),
                    orgID: $("#orgID").val()
                },
                success: function(e) {
                    e = JSON.parse(e);
                    tblProdukteFenster.clear().draw();
                    for (var c = 0; c < e.length; c++) tblProdukteFenster.row.add([e[c].prd_ID, e[c].artikelNrPrd, e[c].namePrd, e[c].custom1]).draw();
                    $("#produkteFensterAuswahlContainer").css("display", "block");
                    $("#produkteFensterAuswahlContainer").dialog({
                        height: 400,
                        width: 600,
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
                            $("#tblProdukteFenster tbody tr").css("cursor", "pointer");
                            $("#tblProdukteFenster tbody").off("dblclick", "tr");
                            $("#tblProdukteFenster tbody").on("dblclick", "tr", function() {
                                var c = tblProdukteFenster.row(this).data();
                                if ("prdVorlFrm" === a) {
                                    var e = "[" + (c[1] + "_" + c[2]).trim().replace(/\s/g, "_") + "]",
                                        c = "prd_" + c[0];
                                    $("#inpAuswahlVorlFrmIns" + b).val(e);
                                    $("#inpAuswahlVorlFrmIDIns" + b).val(c)
                                }
                                $("#produkteFensterAuswahlContainer").dialog("close")
                            })
                        }
                    })
                }
            })
        };

        const setBdeConfigColumnAndAlias =
            record => {

                const selectNthChild =
                    n =>
                    `#checkEPrd div:nth-child(${n})`

                const selectNthCheckbox =
                    n =>
                    $(`${selectNthChild(n)} .chkBetriebsparameter`)

                const selectNthTextbox =
                    n =>
                    $(`${selectNthChild(n)} .txtBetriebsparameter`)

                const setChecksAndAliases =
                    data =>
                    data
                    .forEach(
                        (a, i) => {
                            selectNthCheckbox(incr(i)).prop("checked", a.state)
                            selectNthTextbox(incr(i)).val(a.alias)
                        }
                    )

                elementsBdeTblConfig(record[0].tblName)

                setTimeout(
                  () => setChecksAndAliases(JSON.parse(record[0].parJson))
                , 750)
            }

        const readBdeConfig =
            nameDB =>
            ajaxPost("php/getBdeConfigInfo.php")({nameDB})
            .then(setBdeConfigColumnAndAlias)

        const elementsBdeTblConfig =
            dbTbl => {
                $("#checkEPrd").empty();
                $("#quellTblEPrd").val(dbTbl);
                var e = mkLabel("EPrd")(""),
                f = mkCheckbox("EPrd")("chkBetriebsparameter"),
                h = mkTextbox("EPrd")("txtBetriebsparameter");
                getDbTableColumns(dbTbl).then(function(a) {
                    appendHtml("#checkEPrd")(a.map(function(a) {
                        return "<div>" +
                        e(a) + f(a) + h(a) + "</div>"
                    }))
                });
            }

        const readBdeConfigSelect =
            function(a) {
                return function() {
                    var b = tblTabellenProdSuchen.row(this).data();
                    switch (a) {
                        case "tblSuchenEPrd":
                            elementsBdeTblConfig(b[1])
                            $("#channelZuordnungProdContainer").dialog("close")
                    }
                }
            }

        tabellenAuswahllisteErstellen =
        function(a) {
            $.ajax({
                type: "POST",
                async: !0,
                url: "php/tabellen.php",
                data: {
                    ins: "tabellenLst",
                    nameDB: $("#nameDB").val()
                },
                success: function(b) {
                    b = JSON.parse(b);
                    tblTabellenProdSuchen.clear().draw();
                    for (var e = 0; e < b.length; e++) tblTabellenProdSuchen.row.add([b[e].object_id, b[e].name, b[e].schema_id]).draw();
                    $("#channelZuordnungProdContainer").css("display", "block");
                    $("#channelZuordnungProdContainer").dialog({
                        height: 600,
                        width: 900,
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
                            $("#tblTabellenProdSuchen tbody tr").css("cursor", "pointer");
                            $("#tblTabellenProdSuchen tbody").off("dblclick", "tr");
                            $("#tblTabellenProdSuchen tbody").on("dblclick", "tr", readBdeConfigSelect(a))
                        }
                    })
                }
            })
        }, formelAuswahllisteErstellen = function(a, b) {
            $.ajax({
                type: "POST",
                async: !0,
                url: "php/getFormeln.php",
                data: {
                    nameDB: $("#nameDB").val()
                },
                success: function(e) {
                    e = JSON.parse(e);
                    tblFormeln.clear().draw();
                    for (var c = 0; c < e.length; c++) tblFormeln.row.add([e[c].frm_ID, atob(e[c].formelString)]).draw();
                    $("#formelnAuswahlContainer").css("display", "block");
                    $("#formelnAuswahlContainer").dialog({
                        height: 400,
                        width: 600,
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
                            $("#tblFormeln tbody tr").css("cursor", "pointer");
                            $("#tblFormeln tbody").off("dblclick", "tr");
                            $("#tblFormeln tbody").on("dblclick", "tr", function() {
                                var c = tblFormeln.row(this).data();
                                switch (a) {
                                    case "knzInt":
                                        $("#formel" + b + "IDKnz").val(c[0]);
                                        $("#formel" + b + "Knz").val(c[1]);
                                        break;
                                    case "frmVorlFrm":
                                        var e = "[" + c[1].trim() + "]",
                                            c = "frm_" + c[0];
                                        $("#inpAuswahlVorlFrmIns" + b).val(e);
                                        $("#inpAuswahlVorlFrmIDIns" + b).val(c);
                                        break;
                                    case "frmMst":
                                        $("#berechnungslogikMst").val(c[0])
                                }
                                $("#formelnAuswahlContainer").dialog("close")
                            })
                        }
                    })
                }
            })
        },
        instanzAuswahllisteErstellen = function(a) {
            $.ajax({
                type: "POST",
                async: !0,
                url: "php/getInstanzen.php",
                data: {
                    nameDB: $("#nameDB").val(),
                    orgID: $("#orgID").val(),
                    bezug: a
                },
                success: function(b) {
                    var e = JSON.parse(b),
                        c = "",
                        g = null;
                    switch (a) {
                        case "mst":
                            $("#div_tblInstanzAnl, #div_tblInstanzPrd").css("display", "none");
                            $("#div_tblInstanzMst").css("display", "block");
                            c = "#tblInstanzMstSuchen";
                            tblInstanzMstSuchen.clear().draw();
                            for (var f = 0; f < e.length; f++) tblInstanzMstSuchen.row.add([e[f].mst_ID, e[f].nameMSt, e[f].energietraegerMst,
                                e[f].messmittelBerechnungslogikMst, e[f].anlageMst, e[f].ortMst
                            ]).draw();
                            g = tblInstanzMstSuchen;
                            break;
                        case "anl":
                            $("#div_tblInstanzMst, #div_tblInstanzPrd").css("display", "none");
                            $("#div_tblInstanzAnl").css("display", "block");
                            c = "#tblInstanzAnlSuchen";
                            tblInstanzAnlSuchen.clear().draw();
                            for (f = 0; f < e.length; f++) tblInstanzAnlSuchen.row.add([e[f].anl_ID, e[f].nummerAnl + " " + e[f].bezeichnungAnl, e[f].messstelle1Anl, e[f].energietraeger1Anl]).draw();
                            g = tblInstanzAnlSuchen;
                            break;
                        case "prd":
                            $("#div_tblInstanzAnl, #div_tblInstanzMst").css("display",
                                "none");
                            $("#div_tblInstanzPrd").css("display", "block");
                            c = "#tblInstanzPrdSuchen";
                            tblInstanzPrdSuchen.clear().draw();
                            for (f = 0; f < e.length; f++) tblInstanzPrdSuchen.row.add([e[f].prd_ID, e[f].namePrd, e[f].artikelNrPrd]).draw();
                            g = tblInstanzPrdSuchen
                    }
                    $("#instanzSuchenContainer").css("display", "block");
                    $("#instanzSuchenContainer").dialog({
                        height: 400,
                        width: 600,
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
                            $(c + " tbody tr").css("cursor", "pointer");
                            $(c + " tbody").off("dblclick",
                                "tr");
                            $(c + " tbody").on("dblclick", "tr", function() {
                                var a = g.row(this).data();
                                if ("#tblInstanzPrdSuchen" === c)
                                    for (f = 0; f < e.length; f++) e[f].prd_ID === a[0] && ($("#custom1PrdKnz").val(e[f].custom1), $("#custom2PrdKnz").val(e[f].custom2), $("#custom3PrdKnz").val(e[f].custom3), $("#custom4PrdKnz").val(e[f].custom4), $("#custom5PrdKnz").val(e[f].custom5), $("#custom6PrdKnz").val(e[f].custom6));
                                $("#instanzAllgemeinIDKnz").val(a[0]);
                                $("#instanzAllgemeinKnz").val(a[1] + "_" + a[2]);
                                $("#bezKnz").val($("#bezugAllgemeinKnz").val() +
                                    "-" + a[1]);
                                $("#instanzSuchenContainer").dialog("close")
                            })
                        }
                    })
                }
            })
        }, spezielleKennzahlenlisteErstellen = function() {
            $.ajax({
                type: "POST",
                async: !0,
                url: "php/readKennzahlen.php",
                data: {
                    nameDB: $("#nameDB").val(),
                    ins: "spzKnz",
                    orgID: $("#orgID").val()
                },
                success: function(a) {
                    a = JSON.parse(a);
                    tblSpezKennzahlSuchen.clear().draw();
                    for (var b = 0; b < a.length; b++) tblSpezKennzahlSuchen.row.add([b, a[b].knzIns_ID, a[b].bezeichnung, a[b].aktiv, a[b].anwendungsbereich, a[b].einheit, a[b].kennzahl, atob(a[b].formelString)]).draw();
                    tblSpezKennzahlSuchen.column(0).visible(!1);
                    $("#spezKennzahlenAuswahlContainer").css("display", "block");
                    $("#spezKennzahlenAuswahlContainer").dialog({
                        height: $(window).height() - .125 * $(window).height(),
                        width: $(window).width() - .125 * $(window).width(),
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
                            $("#tblSpezKennzahlSuchen tbody tr").css("cursor", "pointer");
                            $("#tblSpezKennzahlSuchen tbody").on("dblclick", "tr", function() {
                                tblSpezKennzahlSuchen.row(this).data();
                                $("#VorlagenformelSuchenContainer").dialog("close")
                            })
                        }
                    })
                }
            })
        },
        kennzahlInstanzenlisteErstellen = function() {
            $.ajax({
                type: "POST",
                async: !0,
                url: "php/readKennzahlen.php",
                data: {
                    ins: "knzIns",
                    nameDB: $("#nameDB").val(),
                    orgID: $("#orgID").val()
                },
                success: function(a) {
                    a = JSON.parse(a);
                    tblKennzahlInstanzSuchen.clear().draw();
                    for (var b = 0; b < a.length; b++) {
                        var e = void 0;
                        switch (a[b].bezug) {
                            case "anl":
                                e = "Anlage";
                                break;
                            case "mst":
                                e = "Messstelle";
                                break;
                            case "prd":
                                e = "Produkt";
                                break;
                            default:
                                console.log("function kennzahlInstanzenlisteErstellen(): insJson[i].bezug gives no valid value!")
                        }
                        tblKennzahlInstanzSuchen.row.add([b,
                            e, a[b].instanz, a[b].beschreibung
                        ]).draw()
                    }
                    tblKennzahlInstanzSuchen.column(0).visible(!1);
                    $("#kennzahlInstanzSuchenContainer").css("display", "block");
                    $("#kennzahlInstanzSuchenContainer").dialog({
                        height: $(window).height() - .125 * $(window).height(),
                        width: $(window).width() - .125 * $(window).width(),
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
                            $("#tblKennzahlInstanzSuchen tbody tr").css("cursor", "pointer");
                            $("#tblKennzahlInstanzSuchen tbody").on("dblclick",
                                "tr",
                                function() {
                                    var a = tblKennzahlInstanzSuchen.row(this).data();
                                    $("#kennzahlInstanzSuchenContainer").dialog("close");
                                    readInstanzen("knzFirst", a[0])
                                })
                        }
                    })
                }
            })
        }, vorlagenformellisteErstellen = function() {
            $.ajax({
                type: "POST",
                async: !0,
                url: "php/vorlagenformeln.php",
                data: {
                    nameDB: $("#nameDB").val(),
                    orgID: $("#orgID").val()
                },
                success: function(a) {
                    a = JSON.parse(a);
                    tblVorlagenformelnSuchen.clear().draw();
                    for (var b = 0; b < a.length; b++) tblVorlagenformelnSuchen.row.add([b, a[b].bezeichnung, atob(a[b].formel), a[b].notiz]).draw();
                    tblVorlagenformelnSuchen.column(0).visible(!1);
                    $("#VorlagenformelSuchenContainer").css("display", "block");
                    $("#VorlagenformelSuchenContainer").dialog({
                        height: $(window).height() - .125 * $(window).height(),
                        width: $(window).width() - .125 * $(window).width(),
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
                            $("#tblVorlagenformelnSuchen tbody tr").css("cursor", "pointer");
                            $("#tblVorlagenformelnSuchen tbody").on("dblclick", "tr", function() {
                                var a = tblVorlagenformelnSuchen.row(this).data();
                                frmVorlVal = $("#formelVorStringDarstellung").val();
                                $("#formelVorStringDarstellung").val(frmVorlVal + a[2]);
                                $("#VorlagenformelSuchenContainer").dialog("close")
                            })
                        }
                    })
                }
            })
        }, produktelisteErstellen = function() {
            $.ajax({
                type: "POST",
                async: !0,
                url: "php/getProdukte.php",
                data: {
                    nameDB: $("#nameDB").val(),
                    orgID: $("#orgID").val()
                },
                success: function(a) {
                    a = JSON.parse(a);
                    tblProdukteSuchen.colReorder.reset();
                    tblProdukteSuchen.clear().draw();
                    for (var b = 0; b < a.length; b++) tblProdukteSuchen.row.add([b, a[b].artikelNrPrd, a[b].namePrd,
                        a[b].custom1, a[b].custom2, a[b].custom3
                    ]).draw();
                    tblProdukteSuchen.column(0).visible(!1);
                    $("#produkteSuchenContainer").css("display", "block");
                    $("#produkteSuchenContainer").dialog({
                        height: $(window).height() - .125 * $(window).height(),
                        width: $(window).width() - .125 * $(window).width(),
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
                            $("#tblProdukteSuchen tbody tr").css("cursor", "pointer");
                            $("#tblProdukteSuchen tbody").on("dblclick", "tr", function() {
                                var a = tblProdukteSuchen.row(this).data();
                                $("#produkteSuchenContainer").dialog("close");
                                readInstanzen("prdFirst", a[0])
                            })
                        }
                    })
                }
            })
        }, energieformenlisteErstellen = function() {
            $.ajax({
                type: "POST",
                async: !0,
                url: "php/getEnergieformen.php",
                data: {
                    nameDB: $("#nameDB").val()
                },
                success: function(a) {
                    a = JSON.parse(a);
                    tblEnergieformenSuchen.colReorder.reset();
                    tblEnergieformenSuchen.clear().draw();
                    for (var b = 0; b < a.length; b++) tblEnergieformenSuchen.row.add([b, a[b].nameEnf, a[b].aktivEnf]).draw();
                    tblEnergieformenSuchen.column(0).visible(!1);
                    $("#energieformenSuchenContainer").css("display",
                        "block");
                    $("#energieformenSuchenContainer").dialog({
                        height: $(window).height() - .125 * $(window).height(),
                        width: $(window).width() - .125 * $(window).width(),
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
                            $("#tblEnergieformenSuchen tbody tr").css("cursor", "pointer");
                            $("#tblEnergieformenSuchen tbody").on("dblclick", "tr", function() {
                                var a = tblEnergieformenSuchen.row(this).data();
                                $("#energieformenSuchenContainer").dialog("close");
                                readInstanzen("enfFirst", a[0])
                            })
                        }
                    })
                }
            })
        },
        energietraegerlisteErstellen = function() {
            $.ajax({
                type: "POST",
                async: !0,
                url: "php/getEnergietraeger.php",
                data: {
                    nameDB: $("#nameDB").val()
                },
                success: function(a) {
                    a = JSON.parse(a);
                    tblEnergietraegerSuchen.colReorder.reset();
                    tblEnergietraegerSuchen.clear().draw();
                    for (var b = 0; b < a.length; b++) tblEnergietraegerSuchen.row.add([b, a[b].nameEnt, a[b].allgemeinerEnt]).draw();
                    tblEnergietraegerSuchen.column(0).visible(!1);
                    $("#energietraegerSuchenContainer").css("display", "block");
                    $("#energietraegerSuchenContainer").dialog({
                        height: $(window).height() -
                            .125 * $(window).height(),
                        width: $(window).width() - .125 * $(window).width(),
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
                            $("#tblEnergietraegerSuchen tbody tr").css("cursor", "pointer");
                            $("#tblEnergietraegerSuchen tbody").on("dblclick", "tr", function() {
                                var a = tblEnergietraegerSuchen.row(this).data();
                                $("#energietraegerSuchenContainer").dialog("close");
                                $("#energietraegerSuchenContainer").css("display", "none");
                                readInstanzen("entFirst", a[0])
                            })
                        }
                    })
                }
            })
        }, externeRechnungenListeErstellen = function(a) {
            $.ajax({
                type: "POST",
                async: !0,
                url: "lupe" === a ? "php/readRechnungen.php" : "php/getRechnungenVergleich.php",
                data: {
                    id: "extRechngSuchen",
                    nameMst: "",
                    nameDB: $("#nameDB").val(),
                    liegID: $("#liegID").val()
                },
                success: function(b) {
                    var e = JSON.parse(b);
                    if ("lupe" == a) {
                        var e = JSON.parse(b),
                            c, g;
                        tblExterneRechnungenSuchen.colReorder.reset();
                        tblExterneRechnungenSuchen.clear().draw();
                        for (b = 0; b < e.length; b++) c = formatNumber("form", e[b].verbrauchERng), g = formatNumber("form", e[b].kostenERng), tblExterneRechnungenSuchen.row.add([b, e[b].mst, e[b].nrERng,
                            e[b].kostenstelleERng, e[b].vomERng, e[b].bisERng, e[b].entERng, e[b].einERng, e[b].versorgerERng, c, g
                        ]).draw();
                        tblExterneRechnungenSuchen.column(0).visible(!1);
                        $("#externeRechnungenSuchenContainer").css("display", "block");
                        $("#externeRechnungenSuchenContainer").dialog({
                            height: $(window).height() - .125 * $(window).height(),
                            width: $(window).width() - .125 * $(window).width(),
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
                                $("#tblExterneRechnungenSuchen tbody tr").css("cursor",
                                    "pointer");
                                $("#tblExterneRechnungenSuchen tbody").on("dblclick", "tr", function() {
                                    var a = tblExterneRechnungenSuchen.row(this).data();
                                    $("#externeRechnungenSuchenContainer").dialog("close");
                                    clearFields("eRngHinz");
                                    readInstanzen("eRngFirst", a[0])
                                })
                            }
                        })
                    } else if ("vergleich" == a) {
                        tblAuswertung1ERng.clear().draw();
                        tblAuswertung2ERng.clear().draw();
                        var f = [],
                            h, q;
                        for (b = 0; b < e.length; b++) {
                            if (10 == e[b].bisERng.length) switch (c = e[b].bisERng, f = c.split("."), f[1]) {
                                case "01":
                                    h = "1.Quartal";
                                    q = "Jan";
                                    break;
                                case "02":
                                    h = "1.Quartal";
                                    q = "Feb";
                                    break;
                                case "03":
                                    h = "1.Quartal";
                                    q = "Mrz";
                                    break;
                                case "04":
                                    h = "2.Quartal";
                                    q = "Apr";
                                    break;
                                case "05":
                                    h = "2.Quartal";
                                    q = "Mai";
                                    break;
                                case "06":
                                    h = "2.Quartal";
                                    q = "Jun";
                                    break;
                                case "07":
                                    h = "3.Quartal";
                                    q = "Jul";
                                    break;
                                case "08":
                                    h = "3.Quartal";
                                    q = "Aug";
                                    break;
                                case "09":
                                    h = "3.Quartal";
                                    q = "Sep";
                                    break;
                                case "10":
                                    h = "4.Quartal";
                                    q = "Okt";
                                    break;
                                case "11":
                                    h = "4.Quartal";
                                    q = "Nov";
                                    break;
                                case "12":
                                    h = "4.Quartal", q = "Dez"
                            } else c = "-", f = ["-", "-", "-"], h = "-";
                            c = formatNumber("form", e[b].verbrauchERng);
                            g = formatNumber("form", e[b].kostenERng);
                            tblAuswertung1ERng.row.add([b + 1, e[b].nrERng, e[b].mstERng, e[b].entERng, e[b].allgemeinerEnt, f[2], f[1], q, h, c, g]).draw();
                            tblAuswertung2ERng.row.add([b + 1, e[b].nrERng, e[b].mstERng, e[b].entERng, e[b].allgemeinerEnt, f[2], f[1], q, h, c, g]).draw()
                        }
                        tblAuswertung1ERng.column(0).visible(!1);
                        tblAuswertung1ERng.column(4).visible(!1);
                        tblAuswertung1ERng.column(6).visible(!1);
                        tblAuswertung2ERng.column(0).visible(!1);
                        tblAuswertung2ERng.column(4).visible(!1);
                        tblAuswertung2ERng.column(6).visible(!1)
                    }
                }
            })
        }, messstellenlisteErstellen = function(this_) {

            const ins = this_.id
            const nameDB = $("#nameDB").val()
            const berID = $("#berID").val()

            ajaxPost("php/getMessstellen.php")({ins, nameDB, berID})
            .then(result => {

                const prepareTableData =
                    data =>
                    data.map(
                        (a, i) =>
                        [ i
                        , a.nameMSt
                        , a.kurzbezeichnungMst
                        , a.kostenstelleMst
                        , a.energietraegerMst
                        , a.messmittelBerechnungslogikMst
                        , a.anlageMst
                        , a.ortMst
                        ]
                    )

                const firstColInvisible =
                    () =>
                    tblMessstellenSuchen.column(0).visible(!1)

                const fillMessstellenTbl =
                    data => {
                        clearTable(tblMessstellenSuchen)
                        intoTable(tblMessstellenSuchen)(prepareTableData(data))
                    }

                const readInRecord =
                    this__ => {
                        const rowData = tblMessstellenSuchen.row(this__).data()

                        ins === "mstESuchen" ?
                        (clearFields("mstEHinz"), readInstanzen("mstEFirst", head(rowData))) :
                        (clearFields("mstBHinz"), readInstanzen("mstBFirst", head(rowData)))

                        $("#messstellenSuchenContainer").dialog("close")
                    }

                fillMessstellenTbl(result)
                firstColInvisible()

                $("#messstellenSuchenContainer").css("display", "block");
                $("#messstellenSuchenContainer").dialog({
                    height: $(window).height() - .125 * $(window).height(),
                    width: $(window).width() - .125 * $(window).width(),
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
                        $("#tblMessstellenSuchen tbody tr").css("cursor", "pointer");
                        $("#tblMessstellenSuchen tbody").off("dblclick")
                        $("#tblMessstellenSuchen tbody").on("dblclick", "tr", function() {
                            readInRecord(this)
                        })
                    }
                })
            })
        }, formellisteErstellen = function(a) {
            var b = void 0,
                e = void 0;
            "kennzahl" === a ? (b = "php/getFormeln.php", e = {
                id: "frm_ID",
                name: "nameFormel",
                formelString: "formelString",
                formelIdString: "idString"
            }) : (b = "php/berechnungsformeln.php", e = {
                id: "mst_ID",
                name: "nameMSt",
                formelString: "messmittelBerechnungslogikMst",
                formelIdString: "berLogikIdString"
            });
            $.ajax({
                type: "POST",
                async: !0,
                url: b,
                data: {
                    id: "formelSuchen",
                    nameDB: $("#nameDB").val(),
                    liegID: $("#liegID").val()
                },
                success: function(a) {
                    a = JSON.parse(a);

                    tblformelSuchen.colReorder.reset();
                    tblformelSuchen.clear().draw();
                    for (var b = 0; b < a.length; b++) tblformelSuchen.row.add([a[b][e.id], a[b][e.name], atob(a[b][e.formelString]), atob(a[b][e.formelIdString])]).draw();
                    tblformelSuchen.column(0).visible(!1);
                    $("#formelSuchenContainer").css("display", "block");
                    $("#formelSuchenContainer").dialog({
                        height: $(window).height() - .125 * $(window).height(),
                        width: $(window).width() - .125 * $(window).width(),
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
                            $("#tblformelSuchen tbody tr").css("cursor", "pointer");
                            $("#tblformelSuchen tbody").on("dblclick", "tr", function() {
                                var a = tblformelSuchen.row(this).data();
                                $("#formelStringDarstellung").val(a[2]);
                                $("#formelIdDarstellung").val(a[3]);
                                $("#formelSuchenContainer").dialog("close")
                            })
                        }
                    })
                }
            })
        }, messmittellisteErstellen = function() {
            $.ajax({
                type: "POST",
                async: !0,
                url: "php/getMessmittel.php",
                data: {
                    id: "msmSuchen",
                    nameDB: $("#nameDB").val(),
                    liegID: $("#liegID").val()
                },
                success: function(a) {
                    a =
                        JSON.parse(a);
                    tblMessmittelSuchen.colReorder.reset();
                    tblMessmittelSuchen.clear().draw();
                    for (var b = 0; b < a.length; b++) tblMessmittelSuchen.row.add([b, a[b].nrMsm, a[b].bezeichnungMsm, a[b].anlageMsm, a[b].messstelleMsm, a[b].energietraegerMsm, a[b].einheitMsm, a[b].pruefzyklusMsm, a[b].naechstePruefungMsm]).draw();
                    tblMessmittelSuchen.column(0).visible(!1);
                    $("#messmittelSuchenContainer").css("display", "block");
                    $("#messmittelSuchenContainer").dialog({
                        height: $(window).height() - .125 * $(window).height(),
                        width: $(window).width() -
                            .125 * $(window).width(),
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
                            $("#tblMessmittelSuchen tbody tr").css("cursor", "pointer");
                            $("#tblMessmittelSuchen tbody").on("dblclick", "tr", function() {
                                var a = tblMessmittelSuchen.row(this).data();
                                $("#messmittelSuchenContainer").dialog("close");
                                clearFields("msmHinz");
                                readInstanzen("msmFirst", a[0])
                            })
                        }
                    })
                }
            })
        }, anlagenlisteErstellen = function() {
            $("#anlListeContainer tr").not("#anlListeContainer tr:nth-child(1)").remove();
            $.ajax({
                type: "POST",
                async: !0,
                url: "php/getAnlagen.php",
                data: {
                    ins: "anlLieg",
                    nameDB: $("#nameDB").val(),
                    liegID: $("#liegID").val()
                },
                success: function(a) {
                    a = JSON.parse(a);
                    tblAnlagen.colReorder.reset();
                    tblAnlagen.clear().draw();
                    for (var b = 0; b < a.length; b++) tblAnlagen.row.add([b, a[b].lieg_ID, a[b].nameLieg, a[b].nummerAnl, a[b].bezeichnungAnl, a[b].typAnl, a[b].standortAnl, a[b].datumAnschaffungAnl, a[b].baujahrAnl, a[b].jahresbetriebsstundenAnl, a[b].produktAnl, a[b].produktnummerAnl, a[b].energietraeger1Anl, a[b].energieform1Anl,
                        a[b].einheitEnergie1Anl, a[b].anschlussleistung1Anl, a[b].mittlereAuslastungKw1Anl
                    ]).draw();
                    tblAnlagen.column(0).visible(!1);
                    tblAnlagen.column(1).visible(!1);
                    anlagenlistenSchemaEinlesen();
                    anlagenlistenSpaltenAnordnungEinlesen();
                    $("#anlListeContainer").css("display", "block");
                    $("#anlListeContainer").dialog({
                        height: $(window).height() - .125 * $(window).height(),
                        width: $(window).width() - .125 * $(window).width(),
                        resize: "auto",
                        modal: !0,
                        show: {
                            effect: "fade",
                            duration: 500
                        },
                        hide: {
                            effect: "fade",
                            duration: 500
                        },
                        open: function() {
                            $("#anlagenListe tbody tr").css("cursor",
                                "pointer");
                            $("#anlagenListe tbody").on("dblclick", "tr", function() {
                                var a = tblAnlagen.row(this).data();
                                $("#liegID").val(a[1]);
                                $("#anlListeContainer").dialog("close");
                                clearFields("anlHinz");
                                readInstanzen("anlFirst", a[0])
                            });
                            $(".anlDialogButton").click(function() {
                                switch ($(this).text()) {
                                    case "Schlie\ufffden":
                                        $("#anlListeContainer").dialog("close");
                                        break;
                                    case "Reset":
                                        $("#anlListeContainer .controlDiv .anlListeCheckboxes").prop('checked', false);
                                        anlagenlisteErstellen();
                                        break;
                                }
                            })
                        }
                    })
                }
            })
        };
        const eAnlagenlisteErstellen =
            () =>
            ajaxPost("php/eAnlEinlesen.php")({nameDB : $("#nameDB").val()})
            .then(result => {
                    const prepareTableData =
                        data =>
                        data.map(
                            (rec, i) => [ i
                                        , rec.name
                                        , rec.beschreibung
                                        , rec.optionen
                                        ]
                        )
                    clearTable(tblEAnlSuchen)
                    intoTable(tblEAnlSuchen)(prepareTableData(result))
                    $("#eAnlagenSuchenContainer").css("display", "block")
                    $("#eAnlagenSuchenContainer").dialog({
                        height: $(window).height() - .125 * $(window).height(),
                        width: $(window).width() - .125 * $(window).width(),
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
                            $("#tblEAnlSuchen tbody tr").css("cursor", "pointer")
                            $("#tblEAnlSuchen tbody").on("dblclick", "tr", function() {
                                var data = tblEAnlSuchen.row(this).data()
                                $("#eAnlagenSuchenContainer").dialog("close")
                                $("#eAnlagenSuchenContainer").css("display", "none")
                                clearFields("eAnlHinz")
                                readInstanzen("eAnlFirst", data[0])
                            })
                        }
                    })
                }
            )
        bereichelisteErstellen = function() {
            $.ajax({
                type: "POST",
                async: !0,
                url: "php/getBereiche.php",
                data: {
                    id: "berSuchen",
                    nameDB: $("#nameDB").val(),
                    liegID: $("#liegID").val()
                },
                success: function(a) {
                    a = JSON.parse(a);
                    tblBereicheSuchen.colReorder.reset();
                    tblBereicheSuchen.clear().draw();
                    for (var b = 0; b < a.length; b++) tblBereicheSuchen.row.add([b, a[b].nameBer, a[b].kurzbezeichnungBer, a[b].kostenstelleBer, a[b].ortBer, a[b].ausgewaehltesLevelBer, a[b].vorgelagerterBereich1Ber, a[b].vorgelagerterBereich2Ber]).draw();
                    tblBereicheSuchen.column(0).visible(!1);
                    $("#bereichSuchenContainer").css("display", "block");
                    $("#bereichSuchenContainer").dialog({
                        height: $(window).height() - .125 * $(window).height(),
                        width: $(window).width() - .125 * $(window).width(),
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
                            $("#tblBereicheSuchen tbody tr").css("cursor", "pointer");
                            $("#tblBereicheSuchen tbody").on("dblclick", "tr", function() {
                                var a = tblBereicheSuchen.row(this).data();
                                $("#bereichSuchenContainer").dialog("close");
                                clearFields("berHinz")
                                clearFields("mstEHinz")
                                clearFields("mstBHinz")

                                readInstanzen("berFirst", a[0])
                                readInstanzen("mstEFirst", 0)
                                readInstanzen("mstBFirst", 0)
                            })
                        }
                    })
                }
            })
        }, standorteDritterlisteErstellen = function() {
            $.ajax({
                type: "POST",
                async: !0,
                url: "php/getStandortdatenDritter.php",
                data: {
                    nameDB: $("#nameDB").val(),
                    liegID: $("#liegID").val()
                },
                success: function(a) {
                    a = JSON.parse(a);
                    tblStandorteDritterSuchen.colReorder.reset();
                    tblStandorteDritterSuchen.clear().draw();
                    for (var b = 0; b < a.length; b++) tblStandorteDritterSuchen.row.add([b, a[b].nameStdDr, a[b].kurzbezeichnungStdDr, a[b].flaecheStdDr]).draw();
                    tblStandorteDritterSuchen.column(0).visible(!1);
                    $("#standorteDritterSuchenContainer").css("display", "block");
                    $("#standorteDritterSuchenContainer").dialog({
                        height: $(window).height() -
                            .125 * $(window).height(),
                        width: $(window).width() - .125 * $(window).width(),
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
                            $("#tblStandorteDritterSuchen tbody tr").css("cursor", "pointer");
                            $("#tblStandorteDritterSuchen tbody").on("dblclick", "tr", function() {
                                var a = tblStandorteDritterSuchen.row(this).data();
                                $("#standorteDritterSuchenContainer").dialog("close");
                                readInstanzen("stdDrFirst", a[0])
                            })
                        }
                    })
                }
            })
        }, standortelisteErstellen = function() {
            $.ajax({
                type: "POST",
                async: !0,
                url: "php/getStandorte.php",
                data: {
                    nameDB: $("#nameDB").val(),
                    liegID: $("#liegID").val()
                },
                success: function(a) {
                    a = JSON.parse(a);
                    tblStandorteSuchen.colReorder.reset();
                    tblStandorteSuchen.clear().draw();
                    for (var b = 0; b < a.length; b++) tblStandorteSuchen.row.add([b, a[b].nameStd, a[b].kurzbezeichnungStd, a[b].flaecheStd]).draw();
                    tblStandorteSuchen.column(0).visible(!1);
                    $("#standorteSuchenContainer").css("display", "block");
                    $("#standorteSuchenContainer").dialog({
                        height: $(window).height() - .125 * $(window).height(),
                        width: $(window).width() - .125 * $(window).width(),
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
                            $("#tblStandorteSuchen tbody tr").css("cursor", "pointer");
                            $("#tblStandorteSuchen tbody").on("dblclick", "tr", function() {
                                var a = tblStandorteSuchen.row(this).data();
                                $("#standorteSuchenContainer").dialog("close");
                                readInstanzen("stdFirst", a[0])
                            })
                        }
                    })
                }
            })
        }, extDurchleitungenlisteErstellen = function() {
            $.ajax({
                type: "POST",
                async: !0,
                url: "php/getExtDurchleitungen.php",
                data: {
                    nameDB: $("#nameDB").val(),
                    liegID: $("#liegID").val()
                },
                success: function(a) {
                    a = JSON.parse(a);
                    tblExtDurchleitungenSuchen.colReorder.reset();
                    tblExtDurchleitungenSuchen.clear().draw();
                    for (var b = 0; b < a.length; b++) tblExtDurchleitungenSuchen.row.add([b, a[b].nameExtDl, a[b].typExtDl, a[b].anschriftExtDl, a[b].ortExtDl, a[b].nameAnsprechpartnerExtDl]).draw();
                    tblExtDurchleitungenSuchen.column(0).visible(!1);
                    $("#extDurchleitungenSuchenContainer").css("display", "block");
                    $("#extDurchleitungenSuchenContainer").dialog({
                        height: $(window).height() -
                            .125 * $(window).height(),
                        width: $(window).width() - .125 * $(window).width(),
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
                            $("#tblExtDurchleitungenSuchen tbody tr").css("cursor", "pointer");
                            $("#tblExtDurchleitungenSuchen tbody").on("dblclick", "tr", function() {
                                var a = tblExtDurchleitungenSuchen.row(this).data();
                                $("#extDurchleitungenSuchenContainer").dialog("close");
                                readInstanzen("extDlFirst", a[0])
                            })
                        }
                    })
                }
            })
        }, liegenschaftenlisteErstellen = function() {
            $.ajax({
                type: "POST",
                async: !0,
                url: "php/getLiegenschaften.php",
                data: {
                    nameDB: $("#nameDB").val(),
                    orgID: $("#orgID").val()
                },
                success: function(a) {
                    a = JSON.parse(a);
                    tblLiegenschaftenSuchen.colReorder.reset();
                    tblLiegenschaftenSuchen.clear().draw();
                    for (var b = 0; b < a.length; b++) tblLiegenschaftenSuchen.row.add([b, a[b].nameLieg, a[b].typLieg, a[b].anschriftLieg, a[b].ortLieg, a[b].nameAnsprechpartnerLieg, a[b].nameEnergiebeauftragterLieg]).draw();
                    tblLiegenschaftenSuchen.column(0).visible(!1);
                    $("#liegenschaftenSuchenContainer").css("display",
                        "block");
                    $("#liegenschaftenSuchenContainer").dialog({
                        height: $(window).height() - .125 * $(window).height(),
                        width: $(window).width() - .125 * $(window).width(),
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
                            $("#tblLiegenschaftenSuchen tbody tr").css("cursor", "pointer");
                            $("#tblLiegenschaftenSuchen tbody").on("dblclick", "tr", function() {
                                var a = tblLiegenschaftenSuchen.row(this).data();
                                $("#liegenschaftenSuchenContainer").dialog("close");
                                readInstanzen("liegFirst", a[0])
                                readInstanzen("berFirst", 0)
                                readInstanzen("mstEFirst", 0)
                                readInstanzen("mstBFirst", 0)
                            })
                        }
                    })
                }
            })
        },
            organisationenlisteErstellen = function() {
                const nameDB = $("#nameDB").val()

                ajaxPost("php/getOrganisationen.php")({nameDB})
                .then(result => {
                        const prepareTableData =
                            data =>
                            data.map(
                                (rec, i) => [ i
                                            , rec.nameOrg
                                            , rec.anschriftOrg
                                            , rec.landOrg
                                            , rec.org_ID
                                            ]
                            )
                        clearTable(tblOrganisationenSuchen)
                        intoTable(tblOrganisationenSuchen)(prepareTableData(result))
                        $("#organisationenSuchenContainer").css("display", "block")
                        $("#organisationenSuchenContainer").dialog({
                            height: $(window).height() - .125 * $(window).height(),
                            width: $(window).width() - .125 * $(window).width(),
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
                                $("#tblOrganisationenSuchen tbody tr").css("cursor", "pointer")
                                $("#tblOrganisationenSuchen tbody").on("dblclick", "tr", function() {
                                    var data = tblOrganisationenSuchen.row(this).data()
                                    $("#organisationenSuchenContainer").dialog("close")
                                    $("#organisationenSuchenContainer").css("display", "none")
                                    clearFields("orgHinz")
                                    readInstanzen("orgFirst", data[0])
                                })
                            }
                        })
                    }
                )

        }, mapDrucken = function(a) {
            $("#mapOptionen").css("display", "none");
            $(a).printThis();
            setTimeout(function() {
                $("#mapOptionen").css("display", "block")
            }, 2E3)
        }, mapErstellen = function(a, b) {
            sessionStorage.setItem("nameDB", $("#nameDB").val());
            sessionStorage.setItem("activeInstance", $("#activeInstance").val());
            sessionStorage.setItem("manID", $("#manID").val());
            sessionStorage.setItem("orgID", $("#orgID").val());
            sessionStorage.setItem("liegID", $("#liegID").val());
            sessionStorage.setItem("berID", $("#berID").val());
            sessionStorage.setItem("mstID", $("#mstID").val());
            sessionStorage.setItem("untTab", a);
            sessionStorage.setItem("type", b);
            window.open("TreeChart.html", "_blank")
        }, entEnfStatusSpeichern = function() {
            var a = [];
            for (i = 0; i < $("#frmEntEnfManZuordnung input").length; i++) a[i] = $("#frmEntEnfManZuordnung input").eq(i).is(":checked");
            $.ajax({
                type: "POST",
                async: !0,
                url: "php/statusDerEntEnfIntoDB.php",
                data: {
                    id: entOderEnf,
                    nameDB: $("#nameDB").val(),
                    statusArr: a
                },
                success: function(a) {}
            })
        },
        checkboxenDerEntEnfAlleZuruecksetzen = function() {
            $("#frmEntEnfManZuordnung input").prop("checked", !1)
        }, checkboxenDerEntEnfAlleAnhaken = function() {
            $("#frmEntEnfManZuordnung input").prop("checked", !0)
        }, fensterMitDivOeffnen = function() {
            $("#frmEntEnfManZuordnung").css("display", "block");
            $("#frmEntEnfManZuordnung").dialog({
                height: 500,
                width: 520,
                resize: "auto"
            })
        }, checkboxenDerEntEnfEinlesen = function(a) {
            entOderEnf = $(a).prop("value");
            $("#frmEntEnfManZuordnung .controlDiv").remove();

            if (entOderEnf !== undefined) {
                $.ajax({
                  type: "POST",
                  async: !0,
                  url: "php/checkboxenDerEntEnfEinlesen.php",
                  data: {
                    id: entOderEnf,
                    nameDB: $("#nameDB").val()
                  },
                  success: function(b) {
                    b = $.parseJSON(b);
                    var e;
                    for (i = 0; i < b.length; i++) "ent" == $(a).prop("value") ? (e = 1 == b[i].aktivEnt ? "checked" : "", $("#frmEntEnfManZuordnung").append("<div class='controlDiv' style='width:230px;margin-right:4px;'><label style='width:160px;'> " + b[i].nameEnt + "</br>(" + b[i].gueltigkeitEnt + ") </label > <input type='checkbox' style='width:45px;' " + e + " /></div >")) : (e = 1 == b[i].aktivEnf ? "checked" : "",
                    $("#frmEntEnfManZuordnung").append("<div class='controlDiv' style='width:230px;margin-right:4px;'><label style='width:160px;'> " + b[i].nameEnf + "</br>(" + b[i].gueltigkeitEnf + ") </label > <input type='checkbox' style='width:45px;' " + e + " /></div >"))
                  }
                })
            }

        }, datensatzLoeschen = function(a) {
            var b = "",
                e = 0;
            switch (a) {
                case "orgLoeschen":
                    b = "org";
                    e = $("#orgID").val();
                    orgNavID = 0;
                    break;
                case "liegLoeschen":
                    b = "lieg";
                    e = $("#liegID").val();
                    liegNavID = 0;
                    break;
                case "berLoeschen":
                    b = "ber";
                    e = $("#berID").val();
                    berNavID = 0;
                    break;
                case "mstELoeschen":
                    b = "mstE";
                    e = $("#mstID").val();
                    mstNavID = 0;
                    break;
                case "mstBLoeschen":
                    b = "mstB";
                    e = $("#mstID").val();
                    mstNavID = 0;
                    break;
                case "extDlLoeschen":
                    b = "extDl";
                    e = $("#extDlID").val();
                    extDlNavID = 0;
                    break;
                case "stdLoeschen":
                    b = "std";
                    e = $("#stdID").val();
                    stdNavID = 0;
                    break;
                case "stdDrLoeschen":
                    b = "stdDr";
                    e = $("#stdDrID").val();
                    stdDrNavID = 0;
                    break;
                case "anlLoeschen":
                    b = "anl";
                    e = $("#anlID").val();
                    anlNavID = 0;
                    break;
                case "msmLoeschen":
                    b = "msm";
                    e = $("#msmID").val();
                    msmNavID = 0;
                    break;
                case "eRngLoeschen":
                    b = "eRng";
                    e = $("#eRngID").val();
                    eRngNavID = 0;
                    break;
                case "zpLoeschen":
                    b = "zp";
                    e = $("#zpID").val();
                    zpNavID = 0;
                    break;
                case "eAnlLoeschen":
                    b = "eAnl", e = $("#eAnlID").val(), eAnlNavID = 0;
                    break;
                case "prdLoeschen":
                    b = "prd", e = $("#prdID").val(), prdNavID = 0
                    break;
                case "entLoeschen":
                    b = "ent", e = $("#entID").val(), entNavID = 0
                    break;
            }
            $.ajax({
                type: "POST",
                async: !0,
                url: "php/setLoeschen.php",
                data: {
                    ins: b,
                    nameDB: $("#nameDB").val(),
                    idValue: e
                },
                success: function(a) {
                    alert("erfolgreich gel\u00f6scht!");
                    readInstanzen(b + "First", 0)
                }
            })
        }, fensterLoeschenmeldung = function(a) {
            $("#loeschenMeldungsfenster").css("display", "block");
            $("#loeschenMeldungsfenster").dialog({
                height: 200,
                width: 300,
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
                    $("#loeschenOk").off("click");
                    $("#loeschenAbbrechen").off("click");
                    $("#loeschenOk").on("click", function() {
                        datensatzLoeschen(a);
                        $("#loeschenMeldungsfenster").dialog("close")
                    });
                    $("#loeschenAbbrechen").on("click", function() {
                        $("#loeschenMeldungsfenster").dialog("close")
                    })
                }
            })
        }, clearFields = function(a) {
            $(".lblNeu").css("display", "inline");
            $(".lblAendern").css("display", "none");
            var b = [];
            "gipscAdmHinz" == a ? b = ["#benutzernameGipscAdm", "#passwortGipscAdm"] : "betrGrpHinz" == a ? b = "#firmaBetrGrp #anzahlMitarbeiterBetrGrp #anschriftBetrGrp #plzBetrGrp #ortBetrGrp #geschaeftsfuehrerBetrGrp #telefonBetrGrp #emailBetrGrp #notizBetrGrp".split(" ") :
            "sAdmHinz" == a ? b = "#titelSAdm #nameSAdm #vornameSAdm #emailSAdm #telefonSAdm #faxSAdm #mobiltelefonSAdm #benutzernameSAdm #passwortSAdm".split(" ") : "manGrpHinz" == a ? (b = ["#nameManGrp", "#kurzManGrp"], tblMandantengruppe.clear().draw()) : "admHinz" == a ? b = "#titelAdm #nameAdm #vornameAdm #emailAdm #telefonAdm #faxAdm #mobiltelefonAdm #benutzernameAdm #passwortAdm".split(" ") : "benHinz" == a ? b = "#titelBen #nameBen #vornameBen #emailBen #telefonBen #faxBen #mobiltelefonBen #benutzernameBen #passwortBen".split(" ") :
            "manHinz" == a ? (b = "#manID #nameAllgemeinMan #dbKurz #holdingstrukturAllgemeinMan #liegenschaftenAllgemeinMan #titelSystemadminMan #nameSystemadminMan #vornameSystemadminMan #emailSystemadminMan #telefonSystemadminMan #faxSystemadminMan #mobiltelefonSystemadminMan #benutzernameSystemadminMan #passwortSystemadminMan".split(" "), $("#mehrbenutzerMan").prop("checked", !1)) : "orgHinz" == a ? b = "#orgID #nameAllgemeinOrg #gesellschaftsformAllgemeinOrg #firmenanschriftAllgemeinOrg #landAllgemeinOrg #plzAllgemeinOrg #ortAllgemeinOrg #hrbnummerAllgemeinOrg #titelGeschaeftsfuehrungOrg #nameGeschaeftsfuehrungOrg #vornameGeschaeftsfuehrungOrg #emailGeschaeftsfuehrungOrg #telefonGeschaeftsfuehrungOrg #faxGeschaeftsfuehrungOrg #mobiltelefonGeschaeftsfuehrungOrg #titelEnergiemanagementOrg #nameEnergiemanagementOrg #vornameEnergiemanagementOrg #emailEnergiemanagementOrg #telefonEnergiemanagementOrg #faxEnergiemanagementOrg #mobiltelefonEnergiemanagementOrg".split(" ") :
            "liegHinz" == a ? (b = "#liegID #nameAllgemeinLieg #kuerzelAllgemeinLieg #gesellschaftsformAllgemeinLieg #anschriftAllgemeinLieg #landAllgemeinLieg #plzAllgemeinLieg #ortAllgemeinLieg #typAllgemeinLieg #titelAnsprechpartnerLieg #nameAnsprechpartnerLieg #vornameAnsprechpartnerLieg #emailAnsprechpartnerLieg #telefonAnsprechpartnerLieg #faxAnsprechpartnerLieg #mobiltelefonAnsprechpartnerLieg #titelEnergiebeauftragterLieg #nameEnergiebeauftragterLieg #vornameEnergiebeauftragterLieg #emailEnergiebeauftragterLieg #telefonEnergiebeauftragterLieg #faxEnergiebeauftragterLieg #mobiltelefonEnergiebeauftragterLieg #inputEnergietraeger1Lieg #inputEnergietraeger2Lieg #inputEnergietraeger3Lieg #inputEnergietraeger4Lieg #inputEnergietraeger5Lieg #inputEnergietraeger6Lieg #inputEnergietraeger7Lieg #inputEnergietraeger8Lieg #inputEnergietraeger9Lieg #energieform1Lieg #energieform2Lieg #energieform3Lieg #energieform4Lieg #energieform5Lieg #energieform6Lieg #energieform7Lieg #managementsystem1Lieg #erstzertifizierung1Lieg #managementsystem2Lieg #erstzertifizierung2Lieg #managementsystem3Lieg #erstzertifizierung3Lieg .energietraegerLieg".split(" "),
                    $("#eigenstaendigeformAllgemeinLieg").prop("checked", !1), $("#aktivAllgemeinLieg").prop("checked", !1), $("#hatDlAllgemeinLieg").prop("checked", !1), $("#energietraeger1Lieg").empty(), $("#energietraeger2Lieg").empty(), $("#energietraeger3Lieg").empty(), $("#energietraeger4Lieg").empty(), $("#energietraeger5Lieg").empty(), $("#energietraeger6Lieg").empty(), $("#energietraeger7Lieg").empty(), $("#energietraeger8Lieg").empty(), $("#energietraeger9Lieg").empty(), $("#entLiegErweitert").css("display", "none"), $("#weitereEntsLieg").text("weitere Energietr\u00e4ger")) :
            "extDlHinz" == a ? (b = "#extDlID #nameExtDl #gesellschaftsformExtDl #anschriftExtDl #landExtDl #plzExtDl #ortExtDl #typExtDl #titelAnsprechpartnerExtDl #nameAnsprechpartnerExtDl #vornameAnsprechpartnerExtDl #emailAnsprechpartnerExtDl #telefonAnsprechpartnerExtDl #faxAnsprechpartnerExtDl #mobiltelefonAnsprechpartnerExtDl #energietraeger1ExtDl #messstelle1ExtDl #standort1ExtDl #energietraeger2ExtDl #messstelle2ExtDl #standort2ExtDl #energietraeger3ExtDl #messstelle3ExtDl #standort3ExtDl #energietraeger4ExtDl #messstelle4ExtDl #standort4ExtDl #energietraeger5ExtDl #messstelle5ExtDl #standort5ExtDl #energietraeger6ExtDl #messstelle6ExtDl #standort6ExtDl #energieRes1ExtDl #messstelleEngRes1ExtDl #standort1EngResExtDl #energieRes2ExtDl #messstelleEngRes2ExtDl #standort2EngResExtDl #energieRes3ExtDl #messstelleEngRes3ExtDl #standort3EngResExtDl #energieRes4ExtDl #messstelleEngRes4ExtDl #standort4EngResExtDl #energieRes5ExtDl #messstelleEngRes5ExtDl #standort5EngResExtDl #energieRes6ExtDl #messstelleEngRes6ExtDl #standort6EngResExtDl".split(" "),
                    $("#aktivExtDl").prop("checked", !1), $("#stdExtDl").prop("checked", !1)) :
            "berHinz" == a ? b = "#nameAllgemeinBer #kurzbezeichnungAllgemeinBer #KostenstelleAllgemeinBer #ortBer #levelAuswahlAllgemeinBer #vorgelagerteBereiche1AllgemeinBer #vorgelagerteBereiche2AllgemeinBer #notizAllgemeinBer #energietraeger1AllgemeinBer #energietraeger2AllgemeinBer #energietraeger3AllgemeinBer #energietraeger4AllgemeinBer".split(" ") :
            "mstEHinz" == a ? (b = "#dlAnMstE #dlAnMstIDE #nameMstE #kurzbezeichnungMstE #kostenstelleMstE #energietraegerMstE #energieformMstE #ortMstE #messartMstE #vorgelagerteMstE #vorgelagerteMstIDE #messmittelBerechnungslogikMstE #berechnungslogikMstE #notizAllgemeinMstE #messmittelIDMstE #anlMstE #anlIDMstE".split(" "), $("#aktivMstE").prop("checked", !1)) :
            "mstBHinz" == a ? (b = "#beschreibungMstB #dlAnMstB #dlAnMstIDB #nameMstB #kurzbezeichnungMstB #kostenstelleMstB #ortMstB #messartMstB #vorgelagerteMstB #vorgelagerteMstIDB #messmittelBerechnungslogikMstB #berechnungslogikMstB #notizAllgemeinMstB #messmittelIDMstB #anlMstB #anlIDMstB".split(" "), $("#aktivMstB").prop("checked", !1)) :
            "msmHinz" == a ? (formatNumber("deform", $("#messtoleranzInformationenConfig").val()), formatNumber("deform", $("#wandlungsfaktorTechnischeDetailsConfig").val()), $("#multiboxAllgemeinMsm").is(":checked"), $("#aktivMst").prop("checked", !1), b = "#messmittelNrAllgemeinMsm #bezeichnungAllgemeinMsm #messstelleAllgemeinMsm #messstelleIDAllgemeinMsm #anlMsm #anlIDMsm #typAllgemeinMsm #typNrAllgemeinMsm #installationsdatumAllgemeinMsm #entMsm #einheitAllgemeinMsm #unitAllgemeinMsm #unitTypAllgemeinMsm #anzahlKanaeleAllgemeinMsm #messungsformAllgemeinMsm #kanal1AllgemeinMsm #kanal2AllgemeinMsm #kanal3AllgemeinMsm #notizAllgemeinMsm #beauftragterPruefinformationenMsm #beauftragterEmailPruefinformationenMsm #pruefzyklusPruefinformationenMsm #letztePruefungPruefinformationenMsm #naechstePruefungPruefinformationenMsm #notiz2AllgemeinMsm #messmethodeInformationenConfig #messzyklusInformationenConfig #notiz1InformationenConfig #verbrauchswertbildungConfig #geraetetypTechnischeDetailsConfig #ipTechnischeDetailsConfig #subnetMaskTechnischeDetailsConfig #gatewayTechnischeDetailsConfig #cgiPortTechnischeDetailsConfig #modbusPortTechnischeDetailsConfig #ftpPortTechnischeDetailsConfig #notiz2InformationenConfig".split(" ")) :
            "stdHinz" == a ? (b = "#nameAllgemeinStd #kurzbezeichnungAllgemeinStd #flaecheAllgemeinStd #custom1EingabeStd #custom2EingabeStd #custom3EingabeStd #custom4EingabeStd #custom5EingabeStd #custom6EingabeStd #notizAllgemeinStd".split(" "), $("#custom6LabelStd").text(""), $("#custom5LabelStd").text(""), $("#custom4LabelStd").text(""), $("#custom3LabelStd").text(""), $("#custom2LabelStd").text(""), $("#custom1LabelStd").text("")) : "stdDrHinz" == a ? b = "#nameAllgemeinStdDr #kurzbezeichnungAllgemeinStdDr #flaecheAllgemeinStdDr #custom1EingabeStdDr #custom2EingabeStdDr #custom3EingabeStdDr #custom4EingabeStdDr #custom5EingabeStdDr #custom6EingabeStdDr #notizAllgemeinStdDr".split(" ") :
            "anlHinz" == a ? (b = "#idAllgemeinAnl #bereichAllgemeinAnl #anlagennummerAllgemeinAnl #bezeichnungAllgemeinAnl #typAllgemeinAnl #serienNrAllgemeinAnl #standortAllgemeinAnl #datumAnschaffungAllgemeinAnl #baujahrAnl #notizAllgemeinAnl #produktAllgemeinAnl #einheitProduktionsmenge1AllgemeinAnl #produktnummer1AllgemeinAnl #zugeordneterVerbraucher1AllgemeinAnl #zugeordneterVerbraucher2AllgemeinAnl #zugeordneterVerbraucher3AllgemeinAnl #zugeordneterVerbraucher4AllgemeinAnl #zugeordneterVerbraucher5AllgemeinAnl #zugeordneterVerbraucher6AllgemeinAnl #energietraeger1AllgemeinAnl #energieform1AllgemeinAnl #einheit1Anl #nutzbarkeitAbwaerme1Anl #bewertungNutzbarkeitAbwaerme1Anl #energietraeger2AllgemeinAnl #energieform2AllgemeinAnl #einheit2Anl #nutzbarkeitAbwaerme2Anl #bewertungNutzbarkeitAbwaerme2Anl #energietraeger3AllgemeinAnl #energieform3AllgemeinAnl #einheit3Anl #nutzbarkeitAbwaerme3Anl #bewertungNutzbarkeitAbwaerme3Anl #energietraeger4AllgemeinAnl #energieform4AllgemeinAnl #einheit4Anl #nutzbarkeitAbwaerme4Anl #bewertungNutzbarkeitAbwaerme4Anl #mst1Anl #mst2Anl #mst3Anl #mst4Anl #mst1IDAnl #mst2IDAnl #mst3IDAnl #mst4IDAnl #dokuAuswahlAnl".split(" "),
                    a = $("#nameDB").val(), $(".anlageAnl").text(""), $("#aktivAllgemeinAnl").prop("checked", !1), $("#mehrProdukteAllgemeinAnl").prop("checked", !1), $("#betriebsstundenAllgemeinAnl").val(0), $("#produktionsmenge1AllgemeinAnl").val(0), $("#anschlussleistung1Anl").val(0), $("#mittlereAuslastungProzent1Anl").val(0), $("#mittlereAuslastungKw1Anl").val(0), $("#betriebstemperatur1Anl").val(0), $("#abwaerme1Anl").val(0), $("#anschlussleistung2Anl").val(0), $("#mittlereAuslastungProzent2Anl").val(0),
                    $("#mittlereAuslastungKw2Anl").val(0), $("#betriebstemperatur2Anl").val(0), $("#abwaerme2Anl").val(0), $("#anschlussleistung3Anl").val(0), $("#mittlereAuslastungProzent3Anl").val(0), $("#mittlereAuslastungKw3Anl").val(0), $("#betriebstemperatur3Anl").val(0), $("#abwaerme3Anl").val(0), $("#anschlussleistung4Anl").val(0), $("#mittlereAuslastungProzent4Anl").val(0), $("#mittlereAuslastungKw4Anl").val(0), $("#betriebstemperatur4Anl").val(0), $("#abwaerme4Anl").val(0)) :
            "prdHinz" == a ? b = "#bezeichnungPrd #artklnrPrd #custom1Prd #custom2Prd #custom3Prd #custom4Prd #custom5Prd #custom6Prd #inpAnlage1Prd #inpAnlage1IDPrd #inpAnlage2Prd #inpAnlage2IDPrd #inpAnlage3Prd #inpAnlage3IDPrd #inpAnlage4Prd #inpAnlage4IDPrd #inpAnlage5Prd #inpAnlage5IDPrd #inpAnlage6Prd #inpAnlage6IDPrd #inpAnlage7Prd #inpAnlage7IDPrd #inpAnlage8Prd #inpAnlage8IDPrd #inpAnlage9Prd #inpAnlage9IDPrd".split(" ") :
            "entHinz" == a ? (b = "#nameEnt #kuerzelEnt #allgemEntEnt #notizEnt #versorgerEvuEnt #versorgerUenbEnt #versorgerMsbEnt #einheit1Ent #einheit2Ent #einheit3Ent #entEinh1FaktorKwh #entEinh2FaktorKwh #entEinh3FaktorKwh #entEinh1FaktorCO2 #entEinh2FaktorCO2 #entEinh3FaktorCO2 #entEinh1FaktorX1 #entEinh2FaktorX1 #entEinh3FaktorX1 #entEinh1FaktorX2 #entEinh2FaktorX2 #entEinh3FaktorX2 #entEinh1FaktorX3 #entEinh2FaktorX3 #entEinh3FaktorX3 #gueltigVomEnt #gueltigBisEnt".split(" "), $("#lblEntEinh1FaktorX1").text(""),
                    $("#lblEntEinh2FaktorX1").text(""), $("#lblEntEinh3FaktorX1").text(""), $("#lblEntEinh1FaktorX2").text(""), $("#lblEntEinh2FaktorX2").text(""), $("#lblEntEinh3FaktorX2").text(""), $("#lblEntEinh1FaktorX3").text(""), $("#lblEntEinh2FaktorX3").text(""), $("#lblEntEinh3FaktorX3").text("")) : "enfHinz" == a ? (b = "#nameEnf #kuerzelEnf #notizEnf #einheit1Enf #einheit2Enf #einheit3Enf #enfEinh1FaktorKwh #enfEinh2FaktorKwh #enfEinh3FaktorKwh #enfEinh1FaktorCO2 #enfEinh2FaktorCO2 #enfEinh3FaktorCO2 #enfEinh1FaktorX1 #enfEinh2FaktorX1 #enfEinh3FaktorX1 #enfEinh1FaktorX2 #enfEinh2FaktorX2 #enfEinh3FaktorX2 #enfEinh1FaktorX3 #enfEinh2FaktorX3 #enfEinh3FaktorX3 #gueltigVomEnf #gueltigBisEnf".split(" "),
                    $("#aktivEnf").prop("checked", !1), $("#lblEnfEinh1FaktorX1").text(""), $("#lblEnfEinh2FaktorX1").text(""), $("#lblEnfEinh3FaktorX1").text(""), $("#lblEnfEinh1FaktorX2").text(""), $("#lblEnfEinh2FaktorX2").text(""), $("#lblEnfEinh3FaktorX2").text(""), $("#lblEnfEinh1FaktorX3").text(""), $("#lblEnfEinh2FaktorX3").text(""), $("#lblEnfEinh3FaktorX3").text("")) :
            "eRngHinz" == a ? ($(".htNtInp").val(0), $("#dokuAuswahlERng").text(""), b = ".standRng .evuRng .bafaRng #zpNrERng #aktuellesDokIDERng #aktuellesDokNameERng #dokuAuswahlERng".split(" ")) :
            "iMwHinz" == a ? b = [".iMwHinz"] :
            "intEngIMwFirst" == a ? b = [".iMwEngHinz"] :
            "eAnlHinz" == a ? (b = ["#nameEAnl", "#kuerzelEAnl", "#beschreibungEAnl", "#optionEAnl"], tblOptionenEAnl.clear().draw()) : "ePrdHinz" == a ? (b = ["#nameEPrd", "#kuerzelEPrd", "#beschreibungEPrd", "#optionEPrd"], tblOptionenEPrd.clear().draw()) : "zpHinz" == a ? b = ["#zaehlpunktNrZp", "#energietraegerZp", "#mstZp", "#messsystemZp", "#messgenauZp"] : "knzHinz" == a ? (b = "#bezKnz #instanzAllgemeinKnz #instanzAllgemeinIDKnz #zustaendigerMitarbeiterAllgemeinKnz #beschreibungAllgemeinKnz #bez_1_Knz #anwendungsbereichKennzahldetails1Knz #datumEinfuehrung1Knz #datumLetzteUeberpruefung1Knz #datumDeaktivierung1Knz #einheitKennzahldetail1Knz #formel1Knz #formel1IDKnz #kennzahl1Knz #toleranzgrenzeOben1Knz #toleranzgrenzeUnten1Knz #bez_2_Knz #anwendungsbereichKennzahldetails2Knz #datumEinfuehrung2Knz #datumLetzteUeberpruefung2Knz #datumDeaktivierung2Knz #einheitKennzahldetail2Knz #formel2Knz #formel2IDKnz #kennzahl2Knz #toleranzgrenzeOben2Knz #toleranzgrenzeUnten2Knz #bez_3_Knz #anwendungsbereichKennzahldetails3Knz #datumEinfuehrung3Knz #datumLetzteUeberpruefung3Knz #datumDeaktivierung3Knz #einheitKennzahldetail3Knz #formel3Knz #formel3IDKnz #kennzahl3Knz #toleranzgrenzeOben3Knz #toleranzgrenzeUnten3Knz #bez_4_Knz #anwendungsbereichKennzahldetails4Knz #datumEinfuehrung4Knz #datumLetzteUeberpruefung4Knz #datumDeaktivierung4Knz #einheitKennzahldetail4Knz #formel4Knz #formel4IDKnz #kennzahl4Knz #toleranzgrenzeOben4Knz #toleranzgrenzeUnten4Knz #bez_5_Knz #anwendungsbereichKennzahldetails5Knz #datumEinfuehrung5Knz #datumLetzteUeberpruefung5Knz #datumDeaktivierung5Knz #einheitKennzahldetail5Knz #formel5Knz #formel5IDKnz #kennzahl5Knz #toleranzgrenzeOben5Knz #toleranzgrenzeUnten5Knz #bez_6_Knz #anwendungsbereichKennzahldetails6Knz #datumEinfuehrung6Knz #datumLetzteUeberpruefung6Knz #datumDeaktivierung6Knz #einheitKennzahldetail6Knz #formel6Knz #formel6IDKnz #kennzahl6Knz #toleranzgrenzeOben6Knz #toleranzgrenzeUnten6Knz #bez_7_Knz #anwendungsbereichKennzahldetails7Knz #datumEinfuehrung7Knz #datumLetzteUeberpruefung7Knz #datumDeaktivierung7Knz #einheitKennzahldetail7Knz #formel7Knz #formel7IDKnz #kennzahl7Knz #toleranzgrenzeOben7Knz #toleranzgrenzeUnten7Knz #bez_8_Knz #anwendungsbereichKennzahldetails8Knz #datumEinfuehrung8Knz #datumLetzteUeberpruefung8Knz #datumDeaktivierung8Knz #einheitKennzahldetail8Knz #formel8Knz #formel8IDKnz #kennzahl8Knz #toleranzgrenzeOben8Knz #toleranzgrenzeUnten8Knz #bez_9_Knz #anwendungsbereichKennzahldetails9Knz #datumEinfuehrung9Knz #datumLetzteUeberpruefung9Knz #datumDeaktivierung9Knz #einheitKennzahldetail9Knz #formel9Knz #formel9IDKnz #kennzahl9Knz #toleranzgrenzeOben9Knz #toleranzgrenzeUnten9Knz #bez_10_Knz #anwendungsbereichKennzahldetails10Knz #datumEinfuehrung10Knz #datumLetzteUeberpruefung10Knz #datumDeaktivierung10Knz #einheitKennzahldetail10Knz #formel10Knz #formel10IDKnz #kennzahl10Knz #toleranzgrenzeOben10Knz #toleranzgrenzeUnten10Knz".split(" "),
                    uncheck_Ctrl({
                        firstPart: "#status",
                        secondPart: "Knz"
                    }, 10), a = $("#btnTabKnzCont li").length, hide_Ctrl("#btnTabKnzCont li", a - 1), setText_Ctrl({
                        firstPart: "#ui-id-",
                        secondPart: ""
                    }, {
                        von: 8,
                        bis: 17 })) :
            "knzOhneInstanz" == a && (b = "#bez_1_Knz #anwendungsbereichKennzahldetails1Knz #datumEinfuehrung1Knz #datumLetzteUeberpruefung1Knz #datumDeaktivierung1Knz #einheitKennzahldetail1Knz #formel1Knz #formel1IDKnz #kennzahl1Knz #toleranzgrenzeOben1Knz #toleranzgrenzeUnten1Knz #bez_2_Knz #anwendungsbereichKennzahldetails2Knz #datumEinfuehrung2Knz #datumLetzteUeberpruefung2Knz #datumDeaktivierung2Knz #einheitKennzahldetail2Knz #formel2Knz #formel2IDKnz #kennzahl2Knz #toleranzgrenzeOben2Knz #toleranzgrenzeUnten2Knz #bez_3_Knz #anwendungsbereichKennzahldetails3Knz #datumEinfuehrung3Knz #datumLetzteUeberpruefung3Knz #datumDeaktivierung3Knz #einheitKennzahldetail3Knz #formel3Knz #formel3IDKnz #kennzahl3Knz #toleranzgrenzeOben3Knz #toleranzgrenzeUnten3Knz #bez_4_Knz #anwendungsbereichKennzahldetails4Knz #datumEinfuehrung4Knz #datumLetzteUeberpruefung4Knz #datumDeaktivierung4Knz #einheitKennzahldetail4Knz #formel4Knz #formel4IDKnz #kennzahl4Knz #toleranzgrenzeOben4Knz #toleranzgrenzeUnten4Knz #bez_5_Knz #anwendungsbereichKennzahldetails5Knz #datumEinfuehrung5Knz #datumLetzteUeberpruefung5Knz #datumDeaktivierung5Knz #einheitKennzahldetail5Knz #formel5Knz #formel5IDKnz #kennzahl5Knz #toleranzgrenzeOben5Knz #toleranzgrenzeUnten5Knz #bez_6_Knz #anwendungsbereichKennzahldetails6Knz #datumEinfuehrung6Knz #datumLetzteUeberpruefung6Knz #datumDeaktivierung6Knz #einheitKennzahldetail6Knz #formel6Knz #formel6IDKnz #kennzahl6Knz #toleranzgrenzeOben6Knz #toleranzgrenzeUnten6Knz #bez_7_Knz #anwendungsbereichKennzahldetails7Knz #datumEinfuehrung7Knz #datumLetzteUeberpruefung7Knz #datumDeaktivierung7Knz #einheitKennzahldetail7Knz #formel7Knz #formel7IDKnz #kennzahl7Knz #toleranzgrenzeOben7Knz #toleranzgrenzeUnten7Knz #bez_8_Knz #anwendungsbereichKennzahldetails8Knz #datumEinfuehrung8Knz #datumLetzteUeberpruefung8Knz #datumDeaktivierung8Knz #einheitKennzahldetail8Knz #formel8Knz #formel8IDKnz #kennzahl8Knz #toleranzgrenzeOben8Knz #toleranzgrenzeUnten8Knz #bez_9_Knz #anwendungsbereichKennzahldetails9Knz #datumEinfuehrung9Knz #datumLetzteUeberpruefung9Knz #datumDeaktivierung9Knz #einheitKennzahldetail9Knz #formel9Knz #formel9IDKnz #kennzahl9Knz #toleranzgrenzeOben9Knz #toleranzgrenzeUnten9Knz #bez_10_Knz #anwendungsbereichKennzahldetails10Knz #datumEinfuehrung10Knz #datumLetzteUeberpruefung10Knz #datumDeaktivierung10Knz #einheitKennzahldetail10Knz #formel10Knz #formel10IDKnz #kennzahl10Knz #toleranzgrenzeOben10Knz #toleranzgrenzeUnten10Knz".split(" "),
                    $("#status1Knz").prop("checked", !1), $("#status2Knz").prop("checked", !1), $("#status3Knz").prop("checked", !1), $("#status4Knz").prop("checked", !1), $("#status5Knz").prop("checked", !1), $("#status6Knz").prop("checked", !1), $("#status7Knz").prop("checked", !1), $("#status8Knz").prop("checked", !1), $("#status9Knz").prop("checked", !1), $("#status10Knz").prop("checked", !1), $(".knzForms").eq(0).prop("aria-selected", true));
            b.forEach(function(a) {
                $(a).val("")
            });
            savedNew = !0
        }, readInstanzNachID = function(a, b) {
            var e = new DataMachine,
                c = [],
                g, f, h = "";
            switch (a) {
                case ReadInstance.INTERNE_ENERGIEDATEN:
                    g =
                        "messstellen";
                    f = "mst_ID";
                    c = [{
                        htmlID: "mstID",
                        dbColumnName: "mst_ID"
                    }, {
                        htmlID: "mstIMw",
                        dbColumnName: "nameMSt"
                    }, {
                        htmlID: "energietraegerIMw",
                        dbColumnName: "energietraegerMst"
                    }, {
                        htmlID: "zeitintervallMst",
                        dbColumnName: "zeitintervallMst"
                    }, {
                        htmlID: "einheitMst",
                        dbColumnName: "einheitMst"
                    }, {
                        htmlID: "notizMesswertManuell",
                        dbColumnName: "notizMesswertManuell"
                    }];
                    break;
                case ReadInstance.INTERNE_BETRIEBSDATEN:
                    g = "anlagen", f = "anl_ID", c = [{
                            htmlID: "anlID",
                            dbColumnName: "anl_ID"
                        }, {
                            htmlID: "anlNrIMw",
                            dbColumnName: "nummerAnl"
                        },
                        {
                            htmlID: "anlIMw",
                            dbColumnName: "bezeichnungAnl"
                        }, {
                            htmlID: "zeitintervallAnl",
                            dbColumnName: "zeitintervallAnl"
                        }, {
                            htmlID: "einheitAnl",
                            dbColumnName: "einheitAnl"
                        }, {
                            htmlID: "notizBdeIMw",
                            dbColumnName: "notizMesswertManuell"
                        }
                    ]
            }
            h = "SELECT * FROM " + g + " " + ("WHERE " + f + " = " + b);
            e.runQuery("read", $("#nameDB").val(), h).then(function(a) {
                a = $.parseJSON(a);
                for (var b = c, e = b.length, f = 0; f < e; f++) $("#" + b[f].htmlID).val(a[0][b[f].dbColumnName])
            })
        }, readInstanzen = function(a, b, e) {
            $(".lblNeu").css("display", "none")
            $(".lblAendern").css("display", "inline")
            switch (isInstance(a)) {
                case "gipscAdm":
                    $.ajax({
                        type: "POST",
                        async: !0,
                        url: "php/readInstanzen.php",
                        data: {
                            id: "gipscAdm",
                            nameDB: "gipscomm"
                        },
                        fail: function() {
                            alert("failed!!")
                        },
                        success: function(a) {
                            a = $.parseJSON(a);
                            if(b == -1) {
                                b = a.length - 1;
                            }
                            0 < a.length ? ($("#gipscAdmCount").val(a.length), $("#gipscAdmID").val(a[b].gipsAdm_ID), $("#benutzernameGipscAdm").val(a[b].username)) : clearFields("gipscAdm")
                        }
                    });
                    break;
                case "betrGrp":
                    $.ajax({
                        type: "POST",
                        async: !0,
                        url: "php/readInstanzen.php",
                        data: {
                            id: "betrGrp",
                            nameDB: "gipscomm"
                        },
                        fail: function() {
                            alert("failed!!")
                        },
                        success: function(a) {
                            var c = $.parseJSON(a);
                            if(b == -1) {
                                b = c.length - 1;
                            }
                            0 < c.length ? ($("#betrGrpCount").val(c.length),
                            [
                              ["#betrGrpID", "betrGrp_ID"]
                            , ["#firmaBetrGrp", "firma"]
                            , ["#anzahlMitarbeiterBetrGrp", "anzahlMitarbeiter"]
                            , ["#anschriftBetrGrp", "anschrift"]
                            , ["#plzBetrGrp", "plz"]
                            , ["#ortBetrGrp", "ort"]
                            , ["#geschaeftsfuehrerBetrGrp", "geschaeftsfuehrer"]
                            , ["#telefonBetrGrp", "telefon"]
                            , ["#emailBetrGrp", "eMail"]
                            , ["#notizBetrGrp", "notiz"]
                            ].forEach(function(a) {
                                $(a[0]).val(c[b][a[1]])
                            }),
                            mandantenSuperadminCheckedCheckbox(), readInstanzen("manGrpFirst", 0)
                        , manGrpEinlesen()) : clearFields("betrGrp")
                        }
                    });
                    break;
                case "sAdm":
                    $.ajax({
                        type: "POST",
                        async: !0,
                        url: "php/readInstanzen.php",
                        data: {
                            id: "sAdm",
                            nameDB: "gipscomm",
                            betrGrpID: $("#betrGrpID").val()
                        },
                        fail: function() {
                            alert("failed!!")
                        },
                        success: function(a) {
                            a = $.parseJSON(a);

                            if(b == -1) {
                                b = a.length - 1;
                            }

                            0 < a.length ? ($("#sAdmCount").val(a.length), $("#sAdmID").val(a[b].sAdm_ID), $("#titelSAdm").val(a[b].titelSAdm), $("#nameSAdm").val(a[b].nameSAdm), $("#vornameSAdm").val(a[b].vornameSAdm), $("#emailSAdm").val(a[b].emailSAdm), $("#telefonSAdm").val(a[b].telefonSAdm), $("#faxSAdm").val(a[b].faxSAdm), $("#mobiltelefonSAdm").val(a[b].mobiltelefonSAdm),
                                $("#benutzernameSAdm").val(a[b].username), sAdmGetRollenUndBerechtigungen()) : clearFields("sAdmHinz")
                        }
                    });
                    break;
                case "manGrp":
                    $.ajax({
                        type: "POST",
                        async: !0,
                        url: "php/readInstanzen.php",
                        data: {
                            id: "manGrp",
                            nameDB: "gipscomm",
                            betrGrpID: $("#betrGrpID").val()
                        },
                        fail: function() {
                            alert("failed!!")
                        },
                        success: function(a) {
                            var c = $.parseJSON(a);
                            0 < c.length ? (mandantenInMandantenGruppenTabelleEinlesen(c[b].mandantenIDs), $("#manGrpCount").val(c.length),
                            [
                              ["#manGrpID", "manGrp_ID"]
                            , ["#nameManGrp", "name"]
                            , ["#kurzManGrp", "kurz"]
                            , ["#notizManGrp", "notiz"]
                            ].forEach(function(a) {
                                $(a[0]).val(c[b][a[1]])
                            })) :
                            clearFields("manGrpHinz");
                        }
                    });
                    break;
                case "adm":
                    var record_set = $('#' + a).data("record");
                    //alert($("#manBID").val());
                    "optMan" == $("#manOderManGrp").val() ? (a = "man_ID", e = $("#manRechteID").val()) : (a = "manGrp_ID", e = $("#manGrpID").val());
                    $.ajax({
                        type: "POST",
                        async: !0,
                        url: "php/readInstanzen.php",
                        data: {
                            id: "adm",
                            nameDB: "gipscomm",
                            ins: a,
                            insID: $("#manBID").val(),
                            recordSet:record_set
                        },
                        fail: function() {
                            alert("failed!!")
                        },
                        success: function(a) {
                            var c = $.parseJSON(a);
                            0 < c.length ? ($("#admCount").val(c.length),
                            [
                              ["#admID", "adm_ID"]
                            , ["#titelAdm", "titel"]
                            , ["#nameAdm", "name"]
                            , ["#vornameAdm", "vorname"]
                            , ["#emailAdm", "email"]
                            , ["#telefonAdm", "telefon"]
                            , ["#faxAdm", "fax"]
                            , ["#mobiltelefonAdm", "mobiltelefon"]
                            , ["#benutzernameAdm", "username"]
                            ].forEach(function(a) {
                                $(a[0]).val(c[b][a[1]])
                            })) : clearFields("admHinz")
                        }
                    });
                    break;
                case "ben":
                    var record_set = $('#' + a).data("record");
                    "optMan" == $("#manOderManGrp").val() ? (a = "man_ID", e = $("#manRechteID").val()) : (a = "manGrp_ID", e = $("#manGrpID").val());
                    $.ajax({
                        type: "POST",
                        async: !0,
                        url: "php/readInstanzen.php",
                        data: {
                            id: "ben",
                            nameDB: "gipscomm",
                            ins: a,
                            insID: $("#manBID").val(),//e,
                            recordSet:record_set
                        },
                        fail: function() {
                            alert("failed!!")
                        },

                        success: function(a) {
                            var c = $.parseJSON(a);
                            0 < c.length ? ($("#benCount").val(c.length),
                                [ ["#benID", "ben_ID"]
                                , ["#titelBen", "titel"]
                                , ["#nameBen", "name"]
                                , ["#vornameBen", "vorname"]
                                , ["#emailBen", "eMail"]
                                , ["#telefonBen", "telefon"]
                                , ["#faxBen", "fax"]
                                , ["#mobiltelefonBen", "mobiltelefon"]
                                , ["#benutzernameBen", "username"]
                                ].forEach(function(a) {
                                    $(a[0]).val(c[b][a[1]])
                                })) : clearFields("benHinz")
                        }
                    });
                    break;
                case "man":
                    $.ajax({
                        type: "POST",
                        async: !1,
                        url: "php/readInstanzen.php",
                        data: {
                            id: "man",
                            nameDB: "gipscomm",
                            manID: $("#manID").val()
                        },
                        fail: function() {
                            alert("failed!!")
                        },
                        success: function(a) {
                            a = $.parseJSON(a);
                            $("#manID").val(a[0].man_ID);
                            $("#nameDB").val(a[0].dbName);
                            $("#nameAllgemeinMan").val(a[0].nameMan);
                            $("#holdingstrukturAllgemeinMan").prop("checked", a[0].holdingstruktur);
                            $("#liegenschaftenAllgemeinMan").prop("checked", a[0].liegenschaften)

                            scpSchichtdaten
                            .populateIndexedDB()
                            .then(scpSchichtdaten.readFirst)
                        }
                    });
                    break;
                case "org":
                    $.ajax({
                        type: "POST",
                        async: !1,
                        url: "php/readInstanzen.php",
                        data: {
                            id: "org",
                            nameDB: $("#nameDB").val()
                        },
                        fail: function() {
                            alert("failed!!")
                        },
                        success: function(a) {
                            var c = $.parseJSON(a);
                            $("#orgCount").val(c.length);
                            1 == c.length ? $(".orgPfad, .orgPfadLbl").css("display",
                                "none") : $(".orgPfad, .orgPfadLbl").css("display", "inline");
                            0 < c.length ? ([
                                ["#orgID", "org_ID"],
                                ["#nameAllgemeinOrg", "nameOrg"],
                                ["#gesellschaftsformAllgemeinOrg", "gesellschaftsformOrg"],
                                ["#firmenanschriftAllgemeinOrg", "anschriftOrg"],
                                ["#landAllgemeinOrg", "landOrg"],
                                ["#plzAllgemeinOrg", "plzOrg"],
                                ["#ortAllgemeinOrg", "ortOrg"],
                                ["#hrbnummerAllgemeinOrg", "hrbNummerOrg"],
                                ["#titelGeschaeftsfuehrungOrg", "titelGeschaeftsfuehrungOrg"],
                                ["#nameGeschaeftsfuehrungOrg", "nameGeschaeftsfuehrungOrg"],
                                ["#vornameGeschaeftsfuehrungOrg",
                                    "vornameGeschaeftsfuehrungOrg"
                                ],
                                ["#emailGeschaeftsfuehrungOrg", "eMailGeschaeftsfuehrungOrg"],
                                ["#telefonGeschaeftsfuehrungOrg", "telefonGeschaeftsfuehrungOrg"],
                                ["#faxGeschaeftsfuehrungOrg", "faxGeschaeftsfuehrungOrg"],
                                ["#mobiltelefonGeschaeftsfuehrungOrg", "mobiltelefonGeschaeftsfuehrungOrg"],
                                ["#titelEnergiemanagementOrg", "titelEnergiemanagementOrg"],
                                ["#nameEnergiemanagementOrg", "nameEnergiemanagementOrg"],
                                ["#vornameEnergiemanagementOrg", "vornameEnergiemanagementOrg"],
                                ["#emailEnergiemanagementOrg", "eMailEnergiemanagementOrg"],
                                ["#telefonEnergiemanagementOrg", "telefonEnergiemanagementOrg"],
                                ["#faxEnergiemanagementOrg", "faxEnergiemanagementOrg"],
                                [".orgPfad", "nameOrg"],
                                ["#mobiltelefonEnergiemanagementOrg", "mobiltelefonEnergiemanagementOrg"]
                            ].forEach(function(a) {
                                $(a[0]).val(c[b][a[1]])
                            }),
                            readInstanzen("liegFirst", 0)) :
                            clearFields("orgHinz")
                        }
                    });
                    break;
                case "lieg":
                    $.ajax({
                        type: "POST",
                        async: !1,
                        url: "php/readInstanzen.php",
                        data: {
                            id: "lieg",
                            orgID: $("#orgID").val(),
                            nameDB: $("#nameDB").val()
                        },
                        fail: function() {
                            alert("failed!!")
                        },
                        success: function(a) {
                            var c = $.parseJSON(a)

                            $("#liegCount").val(c.length)

                            0 < c.length ?
                            ($("#eigenstaendigeformAllgemeinLieg").prop("checked", c[b].eigenstaendigeFormLieg),
                            $("#aktivAllgemeinLieg").prop("checked", c[b].aktivLieg),
                            $("#hatDlAllgemeinLieg").prop("checked", c[b].hatDl),
                            [ ["#liegID", "lieg_ID"]
                            , ["#nameAllgemeinLieg", "nameLieg"]
                            , ["#kuerzelAllgemeinLieg", "kuerzelLieg"]
                            , ["#gesellschaftsformAllgemeinLieg", "gesellschaftsformLieg"]
                            , ["#anschriftAllgemeinLieg", "anschriftLieg"]
                            , ["#landAllgemeinLieg", "landLieg"]
                            , ["#plzAllgemeinLieg", "plzLieg"]
                            , ["#ortAllgemeinLieg","ortLieg"]
                            , ["#typAllgemeinLieg", "typLieg"]
                            , ["#titelAnsprechpartnerLieg", "titelAnsprechpartnerLieg"]
                            , ["#nameAnsprechpartnerLieg", "nameAnsprechpartnerLieg"]
                            , ["#vornameAnsprechpartnerLieg", "vornameAnsprechpartnerLieg"]
                            , ["#emailAnsprechpartnerLieg", "eMailAnsprechpartnerLieg"]
                            , ["#telefonAnsprechpartnerLieg", "telefonAnsprechpartnerLieg"]
                            , ["#faxAnsprechpartnerLieg", "faxAnsprechpartnerLieg"]
                            , ["#mobiltelefonAnsprechpartnerLieg", "mobiltelefonAnsprechpartnerLieg"]
                            , ["#titelEnergiebeauftragterLieg", "titelEnergiebeauftragterLieg"]
                            , ["#nameEnergiebeauftragterLieg", "nameEnergiebeauftragterLieg"]
                            , ["#vornameEnergiebeauftragterLieg", "vornameEnergiebeauftragterLieg"]
                            , ["#emailEnergiebeauftragterLieg", "eMailEnergiebeauftragterLieg"]
                            , ["#telefonEnergiebeauftragterLieg", "telefonEnergiebeauftragterLieg"]
                            , ["#faxEnergiebeauftragterLieg", "faxEnergiebeauftragterLieg"]
                            , ["#mobiltelefonEnergiebeauftragterLieg", "mobiltelefonEnergiebeauftragterLieg"]
                            , ["#inputEnergietraeger1Lieg", "energietraeger1"]
                            , ["#inputEnergietraeger2Lieg", "energietraeger2"]
                            , ["#inputEnergietraeger3Lieg", "energietraeger3"]
                            , ["#inputEnergietraeger4Lieg", "energietraeger4"]
                            , ["#inputEnergietraeger5Lieg", "energietraeger5"]
                            , ["#inputEnergietraeger6Lieg", "energietraeger6"]
                            , ["#inputEnergietraeger7Lieg", "energietraeger7"]
                            , ["#inputEnergietraeger8Lieg", "energietraeger8"]
                            , ["#inputEnergietraeger9Lieg", "energietraeger9"]
                            , ["#energieform1Lieg", "energieform1"]
                            , ["#energieform2Lieg", "energieform2"]
                            , ["#energieform3Lieg", "energieform3"]
                            , ["#energieform4Lieg", "energieform4"]
                            , ["#energieform5Lieg", "energieform5"]
                            , ["#energieform6Lieg", "energieform6"]
                            , ["#energieform7Lieg", "energieform7"]
                            , ["#managementsystem1Lieg", "managementsystem1"]
                            , ["#erstzertifizierung1Lieg", "erstzertifizierung1"]
                            , ["#managementsystem2Lieg", "managementsystem2"]
                            , ["#erstzertifizierung2Lieg", "erstzertifizierung2"]
                            , ["#managementsystem3Lieg", "managementsystem3"]
                            , ["#erstzertifizierung3Lieg", "erstzertifizierung3"]
                            ].forEach(function(a) {
                                $(a[0]).val(c[b][a[1]])
                            }), toggleExtDl("#hatDlAllgemeinLieg"),
                            "" != $("#inputEnergietraeger7Lieg").val() ?
                            $("#entLiegErweitert").css("display", "block") :
                            $("#entLiegErweitert").css("display", "none"),
                            energietrInDBoxLieg(),
                            readInstanzen("berFirst", 0)) :
                            clearFields("liegHinz")
                        }
                    });
                    break;
                case "extDl":
                    $.ajax({
                        type: "POST",
                        async: !0,
                        url: "php/readInstanzen.php",
                        data: {
                            id: "extDl",
                            liegID: $("#liegID").val(),
                            nameDB: $("#nameDB").val()
                        },
                        fail: function() {
                            alert("failed!!")
                        },
                        success: function(a) {
                            var c = $.parseJSON(a);
                            $("#extDlCount").val(c.length);
                            0 < c.length ? ($("#stdExtDl").prop("checked",
                                c[b].standortdatenDritte), toggleStandorteDritter("#stdExtDl"), $("#aktivExtDl").prop("checked", c[b].aktivExtDl), [
                                ["#extDlID", "extDl_ID"],
                                ["#nameExtDl", "nameExtDl"],
                                ["#gesellschaftsformExtDl", "gesellschaftsformExtDl"],
                                ["#anschriftExtDl", "anschriftExtDl"],
                                ["#landExtDl", "landExtDl"],
                                ["#plzExtDl", "plzExtDl"],
                                ["#ortExtDl", "ortExtDl"],
                                ["#typExtDl", "typExtDl"],
                                ["#titelAnsprechpartnerExtDl", "titelAnsprechpartnerExtDl"],
                                ["#nameAnsprechpartnerExtDl", "nameAnsprechpartnerExtDl"],
                                ["#vornameAnsprechpartnerExtDl", "vornameAnsprechpartnerExtDl"],
                                ["#emailAnsprechpartnerExtDl", "eMailAnsprechpartnerExtDl"],
                                ["#telefonAnsprechpartnerExtDl", "telefonAnsprechpartnerExtDl"],
                                ["#faxAnsprechpartnerExtDl", "faxAnsprechpartnerExtDl"],
                                ["#mobiltelefonAnsprechpartnerExtDl", "mobiltelefonAnsprechpartnerExtDl"],
                                ["#energietraeger1ExtDl", "energietraeger1"],
                                ["#messstelle1ExtDl", "messstelle1ExtDl"],
                                ["#standort1ExtDl", "standort1ExtDl"],
                                ["#energietraeger2ExtDl", "energietraeger2"],
                                ["#messstelle2ExtDl", "messstelle2ExtDl"],
                                ["#standort2ExtDl", "standort2ExtDl"],
                                ["#energietraeger3ExtDl", "energietraeger3"],
                                ["#messstelle3ExtDl", "messstelle3ExtDl"],
                                ["#standort3ExtDl", "standort3ExtDl"],
                                ["#energietraeger4ExtDl", "energietraeger4"],
                                ["#messstelle4ExtDl", "messstelle4ExtDl"],
                                ["#standort4ExtDl", "standort4ExtDl"],
                                ["#energietraeger5ExtDl", "energietraeger5"],
                                ["#messstelle5ExtDl", "messstelle5ExtDl"],
                                ["#standort5ExtDl", "standort5ExtDl"],
                                ["#energietraeger6ExtDl", "energietraeger6"],
                                ["#messstelle6ExtDl", "messstelle6ExtDl"],
                                ["#standort6ExtDl", "standort6ExtDl"],
                                ["#energieRes1ExtDl", "energieRes1ExtDl"],
                                ["#messstelleEngRes1ExtDl", "messstelleEngRes1ExtDl"],
                                ["#standort1EngResExtDl", "standortEngRes1ExtDl"],
                                ["#energieRes2ExtDl", "energieRes2ExtDl"],
                                ["#messstelleEngRes2ExtDl", "messstelleEngRes2ExtDl"],
                                ["#standort2EngResExtDl", "standortEngRes2ExtDl"],
                                ["#energieRes3ExtDl", "energieRes3ExtDl"],
                                ["#messstelleEngRes3ExtDl", "messstelleEngRes3ExtDl"],
                                ["#standort3EngResExtDl", "standortEngRes3ExtDl"],
                                ["#energieRes4ExtDl", "energieRes4ExtDl"],
                                ["#messstelleEngRes4ExtDl", "messstelleEngRes4ExtDl"],
                                ["#standort4EngResExtDl", "standortEngRes4ExtDl"],
                                ["#energieRes5ExtDl", "energieRes5ExtDl"],
                                ["#messstelleEngRes5ExtDl", "messstelleEngRes5ExtDl"],
                                ["#standort5EngResExtDl", "standortEngRes5ExtDl"],
                                ["#energieRes6ExtDl", "energieRes6ExtDl"],
                                ["#messstelleEngRes6ExtDl", "messstelleEngRes6ExtDl"],
                                ["#standort6EngResExtDl", "standortEngRes6ExtDl"]
                            ].forEach(function(a) {
                                $(a[0]).val(c[b][a[1]])
                            })) : clearFields("extDlHinz")
                        }
                    });
                    break;
                case "ber":
                    $.ajax({
                        type: "POST",
                        async: !1,
                        url: "php/readInstanzen.php",
                        data: {
                            id: "ber",
                            nameDB: $("#nameDB").val(),
                            liegID: $("#liegID").val()
                        },
                        fail: function() {
                            alert("failed!!")
                        },
                        success: function(a) {
                            var c = $.parseJSON(a);

                            $("#berCount").val(c.length);

                            0 < c.length ?
                            ($("#ber").text(c[b].nameBer),
                            [ ["#berID", "ber_ID"]
                            , ["#nameAllgemeinBer", "nameBer"]
                            , ["#bereichAllgemeinAnl", "nameBer"]
                            , ["#kurzbezeichnungAllgemeinBer", "kurzbezeichnungBer"]
                            , ["#KostenstelleAllgemeinBer", "kostenstelleBer"]
                            , ["#ortBer", "ortBer"]
                            , ["#notizAllgemeinBer", "notizBer"]
                            , ["#levelAuswahlAllgemeinBer", "ausgewaehltesLevelBer"]
                            , ["#vorgelagerteBereiche1AllgemeinBer", "vorgelagerterBereich1Ber"]
                            , ["#vorgelagerteBereiche2AllgemeinBer", "vorgelagerterBereich2Ber"]
                            ].forEach(a => $(a[0]).val(c[b][a[1]])),
                            $(".berPfad").val(c[b].nameBer),
                            readInstanzen("mstEFirst", 0),
                            readInstanzen("mstBFirst", 0)) :
                            clearFields("berHinz")
                        }
                    });
                    break;
                case "mstE":
                    berID = $("#berID").val()
                    nameDB = $("#nameDB").val()
                    type = "energiedaten"

                    ajaxPost("php/readMessstellen.php")({berID, nameDB, type})
                    .then(result => {

                        $("#mstECount").val(result.length)

                        0 < result.length ?
                        (toggleMsmBerechnungslogik(result[b].messartMst)("E"),
                        $("#aktivMstE").prop("checked", result[b].aktivMst),
                        $("#istDlMstE").prop("checked", result[b].isDurchleitung),
                        [ ["#mstID", "mst_ID"]
                        , ["#nameMstE", "nameMSt"]
                        , ["#kurzbezeichnungMstE", "kurzbezeichnungMst"]
                        , ["#vorgelagerteMstE", "vorgelMst"]
                        , ["#vorgelagerteMstIDE", "vorgelMst_ID"]
                        , ["#kostenstelleMstE", "kostenstelleMst"]
                        , ["#dlAnMstE", "extDl"]
                        , ["#dlAnMstIDE", "extDl_ID"]
                        , ["#energietraegerMstE", "energietraegerMst"]
                        , ["#energieformMstE", "energieformMst"]
                        , ["#ortMstE", "ortMst"]
                        , ["#messartMstE", "messartMst"]
                        , ["#anlMstE", "anl"]
                        , ["#anlIDMstE", "anl_ID"]
                        , ["#messmittelBerechnungslogikMstE", "msm"]
                        , ["#berechnungslogikMstE", "messmittelBerechnungslogikMstNormal"]
                        , ["#messmittelIDMstE", "msm_ID"]
                        , ["#notizAllgemeinMstE", "notizMst"]
                        ].forEach(a => $(a[0]).val(result[b][a[1]]))) :
                        clearFields("mstEHinz")
                    })
                    break;
                case "mstB":
                    berID = $("#berID").val()
                    nameDB = $("#nameDB").val()
                    type = "betriebsdaten"

                    ajaxPost("php/readMessstellen.php")({berID, nameDB, type})
                    .then(result => {

                        $("#mstBCount").val(result.length)

                        0 < result.length ?
                        (toggleMsmBerechnungslogik(result[b].messartMst)("B"),
                        $("#aktivMstB").prop("checked", result[b].aktivMst),
                        $("#istDlMstB").prop("checked", result[b].isDurchleitung),
                        [ ["#mstID", "mst_ID"]
                        , ["#nameMstB", "nameMSt"]
                        , ["#kurzbezeichnungMstB", "kurzbezeichnungMst"]
                        , ["#vorgelagerteMstB", "vorgelMst"]
                        , ["#vorgelagerteMstIDB", "vorgelMst_ID"]
                        , ["#kostenstelleMstB", "kostenstelleMst"]
                        , ["#dlAnMstB", "extDl"]
                        , ["#dlAnMstIDB", "extDl_ID"]
                        , ["#beschreibungMstB", "beschreibung"]
                        , ["#ortMstB", "ortMst"]
                        , ["#messartMstB", "messartMst"]
                        , ["#anlMstB", "anl"]
                        , ["#anlIDMstB", "anl_ID"]
                        , ["#messmittelBerechnungslogikMstB", "msm"]
                        , ["#berechnungslogikMstB", "messmittelBerechnungslogikMstNormal"]
                        , ["#messmittelIDMstB", "msm_ID"]
                        , ["#notizAllgemeinMstB", "notizMst"]
                        ].forEach(a => $(a[0]).val(result[b][a[1]]))) :
                        clearFields("mstBHinz")
                    })
                    break;
                case "std":
                    $.ajax({
                        type: "POST",
                        async: !0,
                        url: "php/readInstanzen.php",
                        data: {
                            id: "std",
                            liegID: $("#liegID").val(),
                            nameDB: $("#nameDB").val()
                        },
                        fail: function() {
                            alert("failed!!")
                        },
                        success: function(a) {
                            a = $.parseJSON(a);
                            $("#stdCount").val(a.length);
                            0 < a.length ? ($("#stdID").val(a[b].std_ID), $("#nameAllgemeinStd").val(a[b].nameStd), $("#kurzbezeichnungAllgemeinStd").val(a[b].kurzbezeichnungStd), $("#flaecheAllgemeinStd").val(a[b].flaecheStd), $("#custom1LabelStd").text(a[b].custom1LabelStd),
                                $("#custom1EingabeStd").val(a[b].custom1InputStd), "" == $("#custom1LabelStd").text() ? $("#custom1Std").css("display", "none") : $("#custom1Std").css("display", "block"), $("#custom2LabelStd").text(a[b].custom2LabelStd), $("#custom2EingabeStd").val(a[b].custom2InputStd), "" == $("#custom2LabelStd").text() ? $("#custom2Std").css("display", "none") : $("#custom2Std").css("display", "block"), $("#custom3LabelStd").text(a[b].custom3LabelStd), $("#custom3EingabeStd").val(a[b].custom3InputStd), "" == $("#custom3LabelStd").text() ?
                                $("#custom3Std").css("display", "none") : $("#custom3Std").css("display", "block"), $("#custom4LabelStd").text(a[b].custom4LabelStd), $("#custom4EingabeStd").val(a[b].custom4InputStd), "" == $("#custom4LabelStd").text() ? $("#custom4Std").css("display", "none") : $("#custom4Std").css("display", "block"), $("#custom5LabelStd").text(a[b].custom5LabelStd), $("#custom5EingabeStd").val(a[b].custom5InputStd), "" == $("#custom5LabelStd").text() ? $("#custom5Std").css("display", "none") : $("#custom5Std").css("display", "block"),
                                $("#custom6LabelStd").text(a[b].custom6LabelStd), $("#custom6EingabeStd").val(a[b].custom6InputStd), "" == $("#custom6LabelStd").text() ? $("#custom6Std").css("display", "none") : $("#custom6Std").css("display", "block"), $("#notizAllgemeinStd").val(a[b].notizStd)) : clearFields("stdHinz")
                        }
                    });
                    break;
                case "stdDr":
                    $.ajax({
                        type: "POST",
                        async: !0,
                        url: "php/readInstanzen.php",
                        data: {
                            id: "stdDr",
                            liegID: $("#liegID").val(),
                            nameDB: $("#nameDB").val()
                        },
                        fail: function() {
                            alert("failed!!")
                        },
                        success: function(a) {
                            var c = $.parseJSON(a);
                            $("#stdDrCount").val(c.length);
                            0 < c.length ? ([
                                ["#custom1LabelStdDr", "custom1LabelStdDr"],
                                ["#custom2LabelStdDr", "custom2LabelStdDr"],
                                ["#custom3LabelStdDr", "custom3LabelStdDr"],
                                ["#custom4LabelStdDr", "custom4LabelStdDr"],
                                ["#custom5LabelStdDr", "custom5LabelStdDr"],
                                ["#custom6LabelStdDr", "custom6LabelStdDr"]
                            ].forEach(function(a) {
                                $(a[0]).text(c[b][a[1]])
                            }), [
                                ["#stdDrID", "stdDr_ID"],
                                ["#nameAllgemeinStdDr", "nameStdDr"],
                                ["#kurzbezeichnungAllgemeinStdDr", "kurzbezeichnungStdDr"],
                                ["#flaecheAllgemeinStdDr", "flaecheStdDr"],
                                ["#custom5EingabeStdDr", "custom5InputStdDr"],
                                ["#custom1EingabeStdDr", "custom1InputStdDr"],
                                ["#custom6EingabeStdDr", "custom6InputStdDr"],
                                ["#custom2EingabeStdDr", "custom2InputStdDr"],
                                ["#notizAllgemeinStdDr", "notizStdDr"],
                                ["#custom3EingabeStdDr", "custom3InputStdDr"],
                                ["#custom4EingabeStdDr", "custom4InputStdDr"]
                            ].forEach(function(a) {
                                $(a[0]).val(c[b][a[1]])
                            })) : clearFields("stdDrHinz")
                        }
                    });
                    break;
                case "anl":
                    $.ajax({
                        type: "POST",
                        async: !0,
                        url: "php/readAnlagen.php",
                        data: {
                            id: "anl",
                            nameDB: $("#nameDB").val(),
                            liegID: $("#liegID").val()
                        },
                        fail: function() {
                            alert("failed!!")
                        },
                        success: function(a) {
                            var c = $.parseJSON(a);
                            $("#anlCount").val(c.length);
                            0 < c.length ?
                            ($(".anlageAnl").text(c[b].bezeichnungAnl),
                            $("#aktivAllgemeinAnl").prop("checked", c[b].aktivAnl),
                            $("#mehrProdukteAllgemeinAnl").prop("checked", c[b].mehrProdukteAnl),

                            [1, 2, 3, 4]
                            .forEach(
                                a1 => {
                                    [ "anschlussleistung"
                                    , "mittlereAuslastungProzent"
                                    , "mittlereAuslastungKw"
                                    , "abwaerme"
                                    , "betriebstemperatur"
                                    ].forEach(a2 => $(`#${a2}${a1}Anl`).val(formatNumber("form", c[b][`${a2}${a1}Anl`])))
                                }
                            ),

                            [ [ "#anlID", "anl_ID" ]
                            , [ "#idAllgemeinAnl", "anl_ID" ]
                            , [ "#bereichAllgemeinAnl", "nameBer" ]
                            , [ "#anlagennummerAllgemeinAnl", "nummerAnl" ]
                            , [ "#bezeichnungAllgemeinAnl", "bezeichnungAnl" ]
                            , [ "#typAllgemeinAnl", "typAnl" ]
                            , [ "#serienNrAllgemeinAnl", "serienNrAnl" ]
                            , [ "#standortAllgemeinAnl", "standortAnl" ]
                            , [ "#baujahrAnl", "baujahrAnl" ]
                            , [ "#datumAnschaffungAllgemeinAnl", "datumAnschaffungAnl" ]
                            , [ "#betriebsstundenAllgemeinAnl", "jahresbetriebsstundenAnl" ]
                            , [ "#notizAllgemeinAnl", "notizAnl" ]
                            , [ "#produktAllgemeinAnl", "produktAnl" ]
                            , [ "#produktionsmenge1AllgemeinAnl", "produktionsmengeAnl" ]
                            , [ "#einheitProduktionsmenge1AllgemeinAnl", "produktionsmengeEinheitAnl" ]
                            , [ "#produktnummer1AllgemeinAnl", "produktnummerAnl" ]
                            , [ "#zugeordneterVerbraucher1AllgemeinAnl", "zugeordneterVerbraucher1" ]
                            , [ "#zugeordneterVerbraucher2AllgemeinAnl", "zugeordneterVerbraucher2" ]
                            , [ "#zugeordneterVerbraucher3AllgemeinAnl", "zugeordneterVerbraucher3" ]
                            , [ "#zugeordneterVerbraucher4AllgemeinAnl", "zugeordneterVerbraucher4" ]
                            , [ "#zugeordneterVerbraucher5AllgemeinAnl", "zugeordneterVerbraucher5" ]
                            , [ "#zugeordneterVerbraucher6AllgemeinAnl", "zugeordneterVerbraucher6" ]
                            , [ "#zugeordneterVerbraucherID1AllgemeinAnl", "zugeordneterVerbraucherID1" ]
                            , [ "#zugeordneterVerbraucherID2AllgemeinAnl", "zugeordneterVerbraucherID2" ]
                            , [ "#zugeordneterVerbraucherID3AllgemeinAnl", "zugeordneterVerbraucherID3" ]
                            , [ "#zugeordneterVerbraucherID4AllgemeinAnl", "zugeordneterVerbraucherID4" ]
                            , [ "#zugeordneterVerbraucherID5AllgemeinAnl", "zugeordneterVerbraucherID5" ]
                            , [ "#zugeordneterVerbraucherID6AllgemeinAnl", "zugeordneterVerbraucherID6" ]
                            , [ "#energietraeger1AllgemeinAnl", "energietraeger1Anl" ]
                            , [ "#energieform1AllgemeinAnl", "energieform1Anl" ]
                            , [ "#einheit1Anl", "einheitEnergie1Anl" ]
                            , [ "#mst1Anl", "messstelle1Anl" ]
                            , [ "#mst1IDAnl", "messstelle1IDAnl" ]
                            , [ "#ber1Anl", "versBereich1Anl" ]
                            , [ "#nutzbarkeitAbwaerme1Anl", "abwaermeNutzbarkeit1Anl" ]
                            , [ "#bewertungNutzbarkeitAbwaerme1Anl", "bewertungNutzbarkeitAbwaerme1Anl" ]
                            , [ "#energietraeger2AllgemeinAnl","energietraeger2Anl" ]
                            , [ "#energieform2AllgemeinAnl", "energieform2Anl" ]
                            , [ "#einheit2Anl", "einheitEnergie2Anl" ]
                            , [ "#mst2Anl", "messstelle2Anl" ]
                            , [ "#mst2IDAnl", "messstelle2IDAnl" ]
                            , [ "#ber2Anl", "versBereich2Anl" ]
                            , [ "#nutzbarkeitAbwaerme2Anl", "abwaermeNutzbarkeit2Anl" ]
                            , [ "#bewertungNutzbarkeitAbwaerme2Anl", "bewertungNutzbarkeitAbwaerme2Anl" ]
                            , [ "#energietraeger3AllgemeinAnl", "energietraeger3Anl" ]
                            , [ "#energieform3AllgemeinAnl", "energieform3Anl" ]
                            , [ "#einheit3Anl", "einheitEnergie3Anl" ]
                            , [ "#mst3Anl", "messstelle3Anl" ]
                            , [ "#mst3IDAnl", "messstelle3IDAnl" ]
                            , [ "#ber3Anl", "versBereich3Anl" ]
                            , [ "#nutzbarkeitAbwaerme3Anl", "abwaermeNutzbarkeit3Anl" ]
                            , [ "#bewertungNutzbarkeitAbwaerme3Anl", "bewertungNutzbarkeitAbwaerme3Anl" ]
                            , [ "#energietraeger4AllgemeinAnl", "energietraeger4Anl" ]
                            , [ "#energieform4AllgemeinAnl", "energieform4Anl" ]
                            , [ "#einheit4Anl", "einheitEnergie4Anl" ]
                            , [ "#mst4Anl", "messstelle4Anl" ]
                            , [ "#mst4IDAnl", "messstelle4IDAnl" ]
                            , [ "#ber4Anl", "versBereich4Anl" ]
                            , [ "#nutzbarkeitAbwaerme4Anl", "abwaermeNutzbarkeit4Anl" ]
                            , [ "#bewertungNutzbarkeitAbwaerme4Anl", "bewertungNutzbarkeitAbwaerme4Anl" ]
                            , [ "#custom1Anl", "custom1Anl" ]
                            , [ "#custom2Anl", "custom2Anl" ]
                            , [ "#custom3Anl", "custom3Anl" ]
                            , [ "#custom4Anl", "custom4Anl" ]
                            , [ "#custom5Anl", "custom5Anl" ]
                            , [ "#custom6Anl", "custom6Anl" ]
                            ].forEach(function(a) {
                                $(a[0]).val(c[b][a[1]])
                            })) :
                            clearFields("anlHinz")

                            createDocumentList("Anl") // CHANGE : dokument list at the end of success fn erstellen 03.06.2016
                        }
                    });
                    changeTracker.setRecordsNavID(anlNavID);
                    anlagenHistorieInTabelleEinlesen();
                    break;
                case "msm":
                    $.ajax({
                        type: "POST",
                        async: !0,
                        url: "php/readMessmittel.php",
                        data: {
                            id: "msm",
                            nameDB: $("#nameDB").val(),
                            liegID: $("#liegID").val()
                        },
                        fail: function() {
                            alert("failed!!")
                        },
                        success: function(a) {
                            var c = $.parseJSON(a);
                            $("#msmCount").val(c.length);
                            0 < c.length ? ($("#msmID").val(c[b].msm_ID), $("#multiboxAllgemeinMsm").prop("checked", c[b].multiboxMsm), $("#messtoleranzInformationenConfig").val(formatNumber("form", c[b].messtoleranzConfig)), $("#wandlungsfaktorTechnischeDetailsConfig").val(formatNumber("form", c[b].wandlungsfaktorMsm)), [
                                    ["#messmittelNrAllgemeinMsm", "nrMsm"],
                                    ["#bezeichnungAllgemeinMsm", "bezeichnungMsm"],
                                    ["#messstelleAllgemeinMsm", "mst"],
                                    ["#messstelleIDAllgemeinMsm", "mst_ID"],
                                    ["#anlMsm", "anl"],
                                    ["#anlIDMsm", "anl_ID"],
                                    ["#typAllgemeinMsm", "typMsm"],
                                    ["#typNrAllgemeinMsm", "typNrMsm"],
                                    ["#installationsdatumAllgemeinMsm", "installationsdatumMsm"],
                                    ["#entMsm", "energietraegerMsm"],
                                    ["#einheitAllgemeinMsm", "einheitMsm"],
                                    ["#unitAllgemeinMsm", "unitMsm"],
                                    ["#unitTypAllgemeinMsm", "unitTypMsm"],
                                    ["#anzahlKanaeleAllgemeinMsm", "anzahlKanaeleMsm"],
                                    ["#messungsformAllgemeinMsm", "messungsformMsm"],
                                    ["#kanal1AllgemeinMsm", "kanal1Msm"],
                                    ["#kanal2AllgemeinMsm", "kanal2Msm"],
                                    ["#kanal3AllgemeinMsm", "kanal3Msm"],
                                    ["#notizAllgemeinMsm", "notizAllgemeinMsm"],
                                    ["#beauftragterPruefinformationenMsm", "nameBeauftragterMsm"],
                                    ["#beauftragterEmailPruefinformationenMsm", "emailBeauftragterMsm"],
                                    ["#pruefzyklusPruefinformationenMsm", "pruefzyklusMsm"],
                                    ["#letztePruefungPruefinformationenMsm", "letztePruefungMsm"],
                                    ["#naechstePruefungPruefinformationenMsm", "naechstePruefungMsm"],
                                    ["#notiz2AllgemeinMsm", "notizPruefungsinformationenMsm"],
                                    ["#messmethodeInformationenConfig", "messmethodeConfig"],
                                    ["#messzyklusInformationenConfig", "messzyklusConfig"],
                                    ["#notiz1InformationenConfig", "notizAllgemeinConfig"],
                                    ["#verbrauchswertbildungConfig","verbrauchswertbildungConfig"],
                                    ["#geraetetypTechnischeDetailsConfig", "geraeteTypMsm"],
                                    ["#ipTechnischeDetailsConfig", "ipAdresseConfig"],
                                    ["#subnetMaskTechnischeDetailsConfig", "subnetMaskConfig"],
                                    ["#gatewayTechnischeDetailsConfig", "gatewayConfig"],
                                    ["#cgiPortTechnischeDetailsConfig", "cgiPortConfig"],
                                    ["#modbusPortTechnischeDetailsConfig", "modbusPortConfig"],
                                    ["#ftpPortTechnischeDetailsConfig", "ftpPortConfig"],
                                    ["#notiz2InformationenConfig", "notizTechnischeDetailsConfig"]
                                ].forEach(function(a) {
                                    $(a[0]).val(c[b][a[1]])
                                })) :
                                (clearFields("msmHinz"))

                                createDocumentList("Msm") // CHANGE : dokument list at the end of success fn erstellen 03.06.2016
                        }
                    });
                    break;
                case "prd":
                    $.ajax({
                        type: "POST",
                        async: !1,
                        url: "php/readProdukte.php",
                        data: {
                            id: "prd",
                            nameDB: $("#nameDB").val(),
                            orgID: $("#orgID").val()
                        },
                        fail: function() {
                            alert("failed!!")
                        },
                        success: function(a) {
                            var c = $.parseJSON(a);
                            $("#prdCount").val(c.length);
                            if (0 < c.length) {
                                $("#prdID").val(c[b].prd_ID);
                                $("#artikelPrdHistorie").text(c[b].artikelNrPrd);
                                [
                                    ["#bezeichnungPrd", "namePrd"],
                                    ["#artklnrPrd", "artikelNrPrd"],
                                    ["#custom1Prd", "custom1"],
                                    ["#custom2Prd", "custom2"],
                                    ["#custom3Prd", "custom3"],
                                    ["#custom4Prd", "custom4"],
                                    ["#custom5Prd", "custom5"],
                                    ["#custom6Prd", "custom6"],
                                    ["#inpAnlage1Prd", "anl01"],
                                    ["#inpAnlage1IDPrd", "anl01_ID"],
                                    ["#inpAnlage2Prd", "anl02"],
                                    ["#inpAnlage2IDPrd", "anl02_ID"],
                                    ["#inpAnlage3Prd", "anl03"],
                                    ["#inpAnlage3IDPrd", "anl03_ID"],
                                    ["#inpAnlage4Prd", "anl04"],
                                    ["#inpAnlage4IDPrd", "anl04_ID"],
                                    ["#inpAnlage5Prd", "anl05"],
                                    ["#inpAnlage5IDPrd", "anl05_ID"],
                                    ["#inpAnlage6Prd", "anl06"],
                                    ["#inpAnlage6IDPrd", "anl06_ID"],
                                    ["#inpAnlage7Prd", "anl07"],
                                    ["#inpAnlage7IDPrd", "anl07_ID"],
                                    ["#inpAnlage8Prd", "anl08"],
                                    ["#inpAnlage8IDPrd", "anl08_ID"],
                                    ["#inpAnlage9Prd", "anl09"],
                                    ["#inpAnlage9IDPrd", "anl09_ID"],
                                    ["#gruppenIDPrd", "gruppenID"]
                                ].forEach(function(a) {
                                    $(a[0]).val(c[b][a[1]])
                                });
                                $("#divAnlPrd2, #divAnlPrd3").css("display", "none");
                                a = 0 < ["anl04", "anl05", "anl06"].filter(function(a) {
                                    return "" !== c[b][a]
                                }).length;
                                var e = 0 < ["anl04", "anl05", "anl06"].filter(function(a) {
                                    return "" !== c[b][a]
                                }).length;
                                a && e ? $("#divAnlPrd2, #divAnlPrd3").css("display", "block") : a && $("#divAnlPrd2").css("display", "block");
                                produkteHistorieInTabelleEinlesen()
                            } else clearFields("prdHinz")
                        }
                    });
                    break;
                case "ent":
                    $.ajax({
                        type: "POST",
                        async: !1,
                        url: "php/readInstanzen.php",
                        data: {
                            id: "ent",
                            nameDB: entDB,
                            liegID: $("#liegID").val()
                        },
                        fail: function() {
                            alert("failed!!")
                        },
                        success: function(a) {
                            var c = $.parseJSON(a);
                            $("#entCount").val(c.length);
                            0 < c.length ? ([
                                ["#entID", "ent_ID"],
                                ["#nameEnt", "nameEnt"],
                                ["#kuerzelEnt", "kuerzelEnt"],
                                ["#notizEnt", "notizEnt"],
                                ["#allgemEntEnt", "allgemeinerEnt"]
                            ].forEach(function(a) {
                                $(a[0]).val(c[b][a[1]])
                            }), $.ajax({
                                type: "POST",
                                async: !0,
                                url: "php/readInstanzen.php",
                                data: {
                                    id: "vers",
                                    nameDB: entDB,
                                    entID: $("#entID").val()
                                },
                                fail: function() {
                                    alert("failed!!")
                                },
                                success: function(a) {
                                    var b = $.parseJSON(a);
                                    a = b.length;
                                    if (0 < a) {
                                        [ ["#lblEntEinh1FaktorX1", "lblEntEinh1FaktorX1"]
                                        , ["#lblEntEinh2FaktorX1", "lblEntEinh2FaktorX1"]
                                        , ["#lblEntEinh3FaktorX1", "lblEntEinh3FaktorX1"]
                                        , ["#lblEntEinh1FaktorX2", "lblEntEinh1FaktorX2"]
                                        , ["#lblEntEinh2FaktorX2", "lblEntEinh2FaktorX2"]
                                        , ["#lblEntEinh3FaktorX2", "lblEntEinh3FaktorX2"]
                                        , ["#lblEntEinh1FaktorX3", "lblEntEinh1FaktorX3"]
                                        , ["#lblEntEinh2FaktorX3", "lblEntEinh2FaktorX3"]
                                        , ["#lblEntEinh3FaktorX3", "lblEntEinh3FaktorX3"]
                                        ].forEach(
                                            a => $(a[0]).text(last(b)[a[1]])
                                        ),

                                        [ ["#versID", "vers_ID"]
                                        , ["#versorgerEvuEnt", "versorgerEvu"]
                                        , ["#versorgerUenbEnt", "versorgerUenb"]
                                        , ["#versorgerMsbEnt", "versorgerMsb"]
                                        , ["#einheit1Ent", "einheit1Ent"]
                                        , ["#einheit2Ent", "einheit2Ent"]
                                        , ["#einheit3Ent", "einheit3Ent"]
                                        , ["#gueltigVomEnt", "gueltigVomEnt"]
                                        , ["#gueltigBisEnt", "gueltigBisEnt"]
                                        ].forEach(
                                            a => $(a[0]).val(last(b)[a[1]])
                                        ),

                                        [ ["#entEinh1FaktorKwh", "entEinh1FaktorKwh"]
                                        , ["#entEinh2FaktorKwh", "entEinh2FaktorKwh"]
                                        , ["#entEinh3FaktorKwh", "entEinh3FaktorKwh"]
                                        , ["#entEinh1FaktorCO2", "entEinh1FaktorCO2"]
                                        , ["#entEinh2FaktorCO2", "entEinh2FaktorCO2"]
                                        , ["#entEinh3FaktorCO2", "entEinh3FaktorCO2"]
                                        , ["#entEinh1FaktorX1", "entEinh1FaktorX1"]
                                        , ["#entEinh2FaktorX1", "entEinh2FaktorX1"]
                                        , ["#entEinh3FaktorX1", "entEinh3FaktorX1"]
                                        , ["#entEinh1FaktorX2", "entEinh1FaktorX2"]
                                        , ["#entEinh2FaktorX2", "entEinh2FaktorX2"]
                                        , ["#entEinh3FaktorX2", "entEinh3FaktorX2"]
                                        , ["#entEinh1FaktorX3", "entEinh1FaktorX3"]
                                        , ["#entEinh2FaktorX3", "entEinh2FaktorX3"]
                                        , ["#entEinh3FaktorX3", "entEinh3FaktorX3"]
                                        ].forEach(
                                          a => $(a[0]).val(formatNumber("form", last(b)[a[1]]))
                                        )

                                        var c = tblVersorgerHistorie;
                                        c.clear();
                                        for (var e = 0; e < a - 1; e++) c.row.add([c.rows().count(), b[e].versorgerEvu, b[e].versorgerUenb, b[e].versorgerMsb, b[e].gueltigVomEnt + " - " + b[e].gueltigBisEnt]);
                                        c.draw()
                                    }
                                }
                            })) : clearFields("entHinz")
                        }
                    });
                    break;
                case "enf":
                    const elementsData =
                        record =>
                        [ [ "#enfID", "enf_ID" ]
                        , [ "#nameEnf", "nameEnf" ]
                        , [ "#kuerzelEnf", "kuerzelEnf" ]
                        , [ "#notizEnf", "notizEnf" ]
                        , [ "#gueltigVomEnf", "gueltigVomEnf" ]
                        , [ "#gueltigBisEnf", "gueltigBisEnf" ]
                        , [ "#einheit1Enf", "einheit1Enf" ]
                        , [ "#einheit2Enf", "einheit2Enf" ]
                        , [ "#einheit3Enf", "einheit3Enf" ]
                        ].forEach(
                          a => $(head(a)).val(record[last(a)])
                        )

                    const einheitenFaktoren =
                        record =>
                        [1, 2, 3].forEach(
                            idx =>
                            [ `enfEinh${idx}FaktorKwh`
                            , `enfEinh${idx}FaktorCO2`
                            , `enfEinh${idx}FaktorX1`
                            , `enfEinh${idx}FaktorX2`
                            , `enfEinh${idx}FaktorX3`
                            ].forEach(
                                a => $(`#${a}`).val(formatNumber("form", record[a]))
                            )
                        )

                    const labelsFaktoren =
                        record =>
                        [1, 2, 3].forEach(
                            idx =>
                            [ `lblEnfEinh${idx}FaktorX1`
                            , `lblEnfEinh${idx}FaktorX2`
                            , `lblEnfEinh${idx}FaktorX3`
                            ].forEach(
                                a => $(`#${a}`).text(record[a])
                            )
                        )

                    ajaxPost("php/readInstanzen.php")({id: "enf", nameDB: entDB, liegID: $("#liegID").val()})
                    .then(
                        records => {

                            $("#enfCount").val(records.length)

                            if (records.length > 0) {
                                $("#aktivEnf").prop("checked", records[b].aktivEnf)
                                elementsData(records[b])
                                einheitenFaktoren(records[b])
                                labelsFaktoren(records[b])

                            }
                            else {
                                clearFields("enfHinz")
                            }
                        }
                    )
                    break;
                case "eRng":
                    nameDB = $("#nameDB").val()
                    liegID = $("#liegID").val()

                    const noHt =
                        record =>
                        record.tagstromVerbrERng == 0.00
                        && record.tagstromKostERng == 0.00

                    const noNt =
                        record =>
                        record.nachtstromVerbrERng == 0.00
                        && record.nachtstromKostERng == 0.00

                    const hideHtNt =
                        () =>
                        ( $("#htNt").css("display", "none")
                        , $(".htNtInp").val("")
                        , $("#btnHtNt").text("HT/NT aktivieren")
                        )

                    const showHtNt =
                        () =>
                        ( $("#htNt").css("display", "block")
                        , $("#btnHtNt").text("HT/NT deaktivieren")
                        )

                    const activateHtNt =
                        record =>
                        noHt(record) && noNt(record) ?
                        hideHtNt() :
                        showHtNt()

                    ajaxPost("php/readRechnungen.php")({nameDB, liegID})
                    .then(result => {

                        result.length > 0 ?
                        (activateHtNt(result[b]),
                        $("#eRngCount").val(result.length),
                        [ ["#eRngID", "eRng_ID"]
                        , ["#inputEntERng", "entERng"]
                        , ["#modusERng", "rechnungsmodusERng"]
                        , ["#nrERng", "nrERng"]
                        , ["#zpNrERng", "zpNrERng"]
                        , ["#mstERng", "mst"]
                        , ["#mstIDERng", "mst_ID"]
                        , ["#datumERng", "datumERng"]
                        , ["#vomERng", "vomERng"]
                        , ["#bisERng", "bisERng"]
                        , ["#einERng", "einERng"]
                        , ["#kostenstelleERng", "kostenstelleERng"]
                        , ["#versorgerERng", "versorgerERng"]
                        ].forEach(a => $(a[0]).val(result[b][a[1]])),
                        versorgerUndEinheitBefuellen(),

                        [ ["#mengeERng", "mengeERng"]
                        , ["#verbrauchERng", "verbrauchERng"]
                        , ["#kostenERng", "kostenERng"]
                        , ["#mwstPercentERng", "mwstPercentERng"]
                        , ["#tagstromVerbrERng", "tagstromVerbrERng"]
                        , ["#tagstromKostERng", "tagstromKostERng"]
                        , ["#nachtstromVerbrERng", "nachtstromVerbrERng"]
                        , ["#nachtstromKostERng", "nachtstromKostERng"]
                        , ["#lastspitzeERng", "lastspitzeERng"]
                        , ["#leistungspreisERng", "leistungspreisERng"]
                        , ["#abpWirkERng", "abpWirkERng"]
                        , ["#abpNetzERng", "abpNetzERng"]
                        , ["#strSteuERng", "strSteuERng"]
                        , ["#blindstromERng", "blindstromERng"]
                        , ["#konzERng", "konzERng"]
                        , ["#eegUntERng", "eegUntERng"]
                        , ["#eegUebERng", "eegUebERng"]
                        , ["#abpNetzERng", "abpNetzERng"]
                        , ["#konzERng", "konzERng"]
                        , ["#kwkUntERng", "kwkUntERng"]
                        , ["#kwkObERng", "kwkObERng"]
                        , ["#nevUntERng", "nevUntERng"]
                        , ["#nevObERng", "nevObERng"]
                        , ["#offUntERng", "offUntERng"]
                        , ["#offObERng", "offObERng"]
                        , ["#custom1ERng", "Custom1ERng"]
                        , ["#custom2ERng", "Custom2ERng"]
                        , ["#custom3ERng", "Custom3ERng"]
                        , ["#custom4ERng", "Custom4ERng"]
                        , ["#custom5ERng", "Custom5ERng"]
                        , ["#custom6ERng", "Custom6ERng"]
                        ].forEach(a => $(a[0]).val(formatNumber("form", result[b][a[1]]))),

                        [ ["#lblCustom1ERng", "lblCustom1ERng"]
                        , ["#lblCustom2ERng", "lblCustom2ERng"]
                        , ["#lblCustom3ERng", "lblCustom3ERng"]
                        , ["#lblCustom4ERng", "lblCustom4ERng"]
                        , ["#lblCustom5ERng", "lblCustom5ERng"]
                        , ["#lblCustom6ERng", "lblCustom6ERng"]
                        ].forEach(a => $(a[0]).text(result[b][a[1]]))) :
                        clearFields("eRngHinz")

                        $("#modusERng").trigger("change")
                        $("#mstERng").trigger("change")
                        $("#kostenERng").trigger("change")
                        $("#eegUntERng").trigger("change")

                        createDocumentList("ERng")
                    })
                    break;
                /*mm-comment*/
                /*case "intEngIMw":
                    $.ajax({
                        type: "POST",
                        async: !0,
                        url: "php/readInstanzen.php",
                        data: {
                            id: "intEngIMw",
                            nameDB: $("#nameDB").val(),
                            liegID: $("#liegID").val(),
                            intEngIMwID: $("#intEngIMwID").val()
                        },
                        fail: function() {
                            alert("failed!!")
                        },
                        success: function(a) {
                            a = $.parseJSON(a);
                            $("#intEngIMwCount").val(a.length);
                            0 < a.length ? ($("#mstID").val(a[b].mst_ID), $("#mstIMw").val(a[b].nameMSt), $("#energietraegerIMw").val(a[b].energietraegerMst), $("#zeitintervallMst").val(a[b].zeitintervallMst), $("#einheitMst").val(a[b].einheitMst), $("#notizMesswertManuell").val(a[b].notizMesswertManuell)) : clearFields("iMwHinz")
                        }
                    });
                    break;*/
                /*mm-comment*/
                /*17-03-2021*/
                /*new-mm-start*/
                case "intEngIMw":
                    $.ajax({
                        type: "POST",
                        async: !0,
                        url: "php/readInstanzen.php",
                        data: {
                            id: "intEngIMw",
                            nameDB: $("#nameDB").val(),
                            liegID: $("#liegID").val(),
                            intEngIMwID: $("#intEngIMwID").val()
                        },
                        fail: function() {
                            alert("failed!!")
                        },
                        success: function(a) {
                            a = $.parseJSON(a);
                            $("#intEngIMwCount").val(a.length);
                            0 < a.length ? ($("#mstID").val(a[b].mst_ID), $("#mstIMw").val(a[b].nameMSt), $("#energietraegerIMw").val(a[b].energietraegerMst), $("#zeitintervallMst").val(a[b].zeitintervallMst), $("#einheitMst").val(a[b].einheitMst), $("#notizMesswertManuell").val(a[b].notizMesswertManuell)) : clearFields("iMwHinz")
                        }
                    });
                    break;
                /*new-mm-end*/
                case "intBdeIMw":
                    $.ajax({
                        type: "POST",
                        async: !0,
                        url: "php/readInstanzen.php",
                        data: {
                            id: "intBdeIMw",
                            nameDB: $("#nameDB").val(),
                            liegID: $("#liegID").val()
                        },
                        fail: function() {
                            alert("failed!!")
                        },
                        success: function(a) {
                            var c = $.parseJSON(a);
                            $("#intBdeIMwCount").val(c.length);
                            0 < c.length ? ($("#anlID").val(c[b].anl_ID), [
                                ["#anlIMw", "bezeichnungAnl"],
                                ["#anlNrIMw", "nummerAnl"],
                                ["#zeitintervallAnl", "zeitintervallAnl"],
                                ["#einheitAnl", "einheitAnl"],
                                ["#notizBdeIMw", "notizMesswertManuell"]
                            ].forEach(function(a) {
                                $(a[0]).val(c[b][a[1]])
                            })) : clearFields("iMwHinz")
                        }
                    });
                    break;
                case "eAnl":
                    $.ajax({
                        type: "POST",
                        async: !0,
                        url: "php/readInstanzen.php",
                        data: {
                            id: "eAnl",
                            nameDB: $("#nameDB").val()
                        },
                        fail: function() {
                            alert("failed!!")
                        },
                        success: function(a) {
                            var c = $.parseJSON(a);
                            $("#eAnlCount").val(c.length);
                            0 < c.length ? ([
                                ["#eAnlID", "eAnl_ID"],
                                ["#nameEAnl", "name"],
                                ["#kuerzelEAnl", "kurz"],
                                ["#beschreibungEAnl", "beschreibung"]
                            ].forEach(function(a) {
                                $(a[0]).val(c[b][a[1]])
                            }), tblOptionenEAnl.clear().draw(), c[b].optionen.split(",").forEach(function(a) {
                                tblOptionenEAnl.row.add([a]).draw()
                            })) : clearFields("eAnlHinz")
                        }
                    });
                    break;
                case "ePrd":
                    $.ajax({
                        type: "POST",
                        async: !0,
                        url: "php/readInstanzen.php",
                        data: {
                            id: "ePrd",
                            nameDB: $("#nameDB").val()
                        },
                        fail: function() {
                            alert("failed!!")
                        },
                        success: function(a) {
                            var c = $.parseJSON(a);
                            $("#ePrdCount").val(c.length);
                            0 < c.length ? ([
                                ["#ePrdID", "ePrd_ID"],
                                ["#nameEPrd", "name"],
                                ["#kuerzelEPrd", "kurz"],
                                ["#beschreibungEPrd", "beschreibung"]
                            ].forEach(function(a) {
                                $(a[0]).val(c[b][a[1]])
                            }), tblOptionenEPrd.clear().draw(), c[b].optionen.split(",").forEach(function(a) {
                                tblOptionenEPrd.row.add([a]).draw()
                            })) : clearFields("ePrdHinz")
                        }
                    });
                    break;
                case "iMw":
                    messstellenInAuswertungsEditorTabelleEinlesen();
                    break;
                case "zp":
                    $.ajax({
                        type: "POST",
                        async: !0,
                        url: "php/readInstanzen.php",
                        data: {
                            id: "zp",
                            nameDB: $("#nameDB").val(),
                            liegID: $("#liegID").val()
                        },
                        fail: function() {
                            alert("failed!!")
                        },
                        success: function(a) {
                            var c = $.parseJSON(a);
                            $("#zpCount").val(c.length);
                            0 < c.length ? [
                                ["#zpID", "zp_ID"],
                                ["#zaehlpunktNrZp", "zaehlpunktNr"],
                                ["#energietraegerZp", "energietraegerZp"],
                                ["#mstZp", "mstZp"],
                                ["#messsystemZp", "messsystemZp"],
                                ["#messgenauZp", "messgenauigkeitZp"]
                            ].forEach(function(a) {
                                $(a[0]).val(c[b][a[1]])
                            }) : clearFields("zpHinz")
                        }
                    });
                    break;
                case "knz":
                    $.ajax({
                        type: "POST",
                        async: !0,
                        url: "php/readKennzahlen.php",
                        data: {
                            ins: "knzIns",
                            nameDB: $("#nameDB").val(),
                            orgID: $("#orgID").val()
                        },
                        fail: function() {
                            alert("failed!!")
                        },
                        success: function(a) {
                            var c = $.parseJSON(a);
                            $("#knzInsCount").val(c.length);
                            if (0 < c.length) {
                                clearFields("knzHinz");
                                $("#bezKnz").val(c[b].bezug + "_" + c[b].instanz);
                                [
                                    ["#knzInsID", "knzIns_ID"],
                                    ["#bezugAllgemeinKnz", "bezug"],
                                    ["#instanzAllgemeinKnz", "instanz"],
                                    ["#instanzAllgemeinIDKnz", "id"],
                                    ["#zustaendigerMitarbeiterAllgemeinKnz", "zustaendigerMitarbeiter"],
                                    ["#beschreibungAllgemeinKnz", "beschreibung"]
                                ].forEach(function(a) {
                                    $(a[0]).val(c[b][a[1]])
                                });
                                var e = c[b].nKnzs;
                                $.ajax({
                                    type: "POST",
                                    async: !0,
                                    url: "php/readKennzahlen.php",
                                    data: {
                                        ins: "knz",
                                        nameDB: $("#nameDB").val(),
                                        knzInsID: c[b].knzIns_ID
                                    },
                                    fail: function() {
                                        alert("failed!!")
                                    },
                                    success: function(a) {
                                        var b = $.parseJSON(a);
                                        if (0 < b.length) {
                                            a = $("#btnTabKnzCont li").length;
                                            for (var c = 1; c < a; c++) $("#btnTabKnzCont li").eq(c).css("display", "none");
                                            clearFields("knzOhneInstanz");
                                            for (a = {
                                                    i$6: 0
                                                }; a.i$6 < e; a = {
                                                    i$6: a.i$6
                                                }, a.i$6++) $("#btnTabKnzCont li").eq(a.i$6).css("display", "inline"), $("#status" + (a.i$6 + 1) + "Knz").prop("checked",
                                                b[a.i$6].aktiv), $("#formel" + (a.i$6 + 1) + "Knz").val(atob(b[a.i$6].formelString)), $(".knzForms").eq(a.i$6).text(b[a.i$6].bezeichnung), [
                                                ["#bez_" + (a.i$6 + 1) + "_Knz", "bezeichnung"],
                                                ["#anwendungsbereichKennzahldetails" + (a.i$6 + 1) + "Knz", "anwendungsbereich"],
                                                ["#datumEinfuehrung" + (a.i$6 + 1) + "Knz", "datumEinfuehrung"],
                                                ["#datumLetzteUeberpruefung" + (a.i$6 + 1) + "Knz", "letzteUeberpruefung"],
                                                ["#datumDeaktivierung" + (a.i$6 + 1) + "Knz", "datumDeaktivierung"],
                                                ["#einheitKennzahldetail" + (a.i$6 + 1) + "Knz", "einheit"],
                                                ["#formel" + (a.i$6 +
                                                    1) + "IDKnz", "frm_ID"],
                                                ["#kennzahl" + (a.i$6 + 1) + "Knz", "kennzahl"],
                                                ["#toleranzgrenzeOben" + (a.i$6 + 1) + "Knz", "grenzwertO"],
                                                ["#toleranzgrenzeUnten" + (a.i$6 + 1) + "Knz", "grenzwertU"],
                                                ["#zielwert" + (a.i$6 + 1) + "Knz", "zielwert"],
                                                ["#zielVon" + (a.i$6 + 1) + "Knz", "zielVon"],
                                                ["#zielBis" + (a.i$6 + 1) + "Knz", "zielBis"]
                                            ].forEach(function(a) {
                                                return function(c) {
                                                    $(c[0]).val(b[a.i$6][c[1]])
                                                }
                                            }(a));
                                            $(".knzForms").eq(0).trigger("click")
                                        }
                                    }
                                })
                            } else clearFields("knzHinz")
                        }
                    });
                    break;
                case "betrPar":
                    $.ajax({
                        type: "POST",
                        async: !0,
                        url: "php/readInstanzen.php",
                        data: {
                            id: "zp",
                            nameDB: $("#nameDB").val()
                        },
                        fail: function() {
                            alert("failed!!")
                        },
                        success: function(a) {
                            a = $.parseJSON(a);
                            $("#betrParCount").val(a.length);
                            0 < a.length || clearFields("zpHinz")
                        }
                    });
                    break;
                default:
                    console.log('readInstanzen(instanz, index, id) :\n An invalid case ("' + a + '") was encountered!')
            }
        }
        const messmittelOrBerechnungslogik =
            type =>
            "berechnet" == $(`#messartMst${type}`).val() ?
            $(`#berechnungslogikMst${type}`).val() :
            $(`#messmittelBerechnungslogikMst${type}`).val()

        instanzSpeichern = function(a) {
            if ("gipscAdmSpeichern" == a) $.ajax({
                type: "POST",
                async: !0,
                url: "php/instanzIntoDb.php",
                data: {
                    id: "gipscAdm",
                    nameDB: "gipscomm",
                    gipscAdmID: $("gipscAdmID").val(),
                    modus: "save",
                    benutzername: $("#benutzernameGipscAdm").val(),
                    passwort: getHash($("#passwortGipscAdm").val())
                },
                success: function(a) {
                    alert(datensatzGespeichert(a))
                }
            });
            else if ("betrGrpSpeichern" == a) {
                var adminArr = new Array();
                $('span.item').each(function(){
                    var $span = $(this).attr('check-value');
                    if($span == 1) {
                        var spanTxt = $(this).attr('data-id');
                        adminArr.push(spanTxt);
                    }
                });
                $.ajax({
                    type: "POST",
                    async: !0,
                    url: "php/instanzIntoDb.php",
                    data: {
                        id: "betrGrp",
                        nameDB: "gipscomm",
                        betrGrpID: $("#betrGrpID").val(),
                        modus: "save",
                        firma: $("#firmaBetrGrp").val(),
                        anzahlMitarbeiter: $("#anzahlMitarbeiterBetrGrp").val(),
                        anschrift: $("#anschriftBetrGrp").val(),
                        plz: $("#plzBetrGrp").val(),
                        ort: $("#ortBetrGrp").val(),
                        geschaeftsfuehrer: $("#geschaeftsfuehrerBetrGrp").val(),
                        telefon: $("#telefonBetrGrp").val(),
                        eMail: $("#emailBetrGrp").val(),
                        notiz: $("#notizBetrGrp").val(),
                        mandantenIDs: adminArr.toString(),
                    },
                    success: function(a) {
                        alert(datensatzGespeichert(a))
                        betrGrpEinlesen()
                    }
                });
            }
            else if ("sAdmSpeichern" == a) {
            $.ajax({
                type: "POST",
                async: !0,
                url: "php/instanzIntoDb.php",
                data: {
                    id: "sAdm",
                    nameDB: "gipscomm",
                    modus: "save",
                    sAdmID: $("#sAdmID").val(),
                    titel: $("#titelSAdm").val(),
                    name: $("#nameSAdm").val(),
                    vorname: $("#vornameSAdm").val(),
                    eMail: $("#emailSAdm").val(),
                    telefon: $("#telefonSAdm").val(),
                    fax: $("#faxSAdm").val(),
                    mobiltelefon: $("#mobiltelefonSAdm").val(),
                    benutzername: $("#benutzernameSAdm").val(),
                    passwort: getHash($("#passwortSAdm").val()),
                    betrGrpID: $("#betrGrpID").val()
                },
                success: function(a) {
                    sAdmRollenUndBerechtigungen();
                    alert(datensatzGespeichert(a))
                }
            });
            }
            else if ("manGrpSpeichern" == a) {
                const getManIDs =
                    () =>
                    array($("#tblMandantengruppe tbody tr").length)()()
                    .map((_, i) => tblMandantengruppe.cell(i, 0).data())
                    .join(",")

                $.ajax({
                    type: "POST",
                    async: !0,
                    url: "php/instanzIntoDb.php",
                    data: {
                        id: "manGrp",
                        nameDB: "gipscomm",
                        modus: "save",
                        betrGrpID: $("#betrGrpID").val(),
                        manGrpID: $("#manGrpID").val(),
                        mandatenIDs: getManIDs(),
                        name: $("#nameManGrp").val(),
                        kurz: $("#kurzManGrp").val(),
                        notiz: $("#notizManGrp").val()
                    },
                    success: function(a) {
                        alert(datensatzGespeichert(a))
                        manGrpEinlesen()
                    }
                })}
            else if ("admSpeichern" == a) $.ajax({
                type: "POST",
                async: !0,
                url: "php/instanzIntoDb.php",
                data: {
                    id: "adm",
                    modus: "save",
                    nameDB: "gipscomm",
                    admID: $("#admID").val(),
                    titel: $("#titelAdm").val(),
                    name: $("#nameAdm").val(),
                    vorname: $("#vornameAdm").val(),
                    eMail: $("#emailAdm").val(),
                    telefon: $("#telefonAdm").val(),
                    fax: $("#faxAdm").val(),
                    mobiltelefon: $("#mobiltelefonAdm").val(),
                    benutzername: $("#benutzernameAdm").val(),
                    passwort: getHash($("#passwortAdm").val())
                },
                success: function(a) {
                    adminsRollenUndBerechtigungen();
                    alert(datensatzGespeichert(a))
                }
            });
            else if ("benSpeichern" == a) $.ajax({
                type: "POST",
                async: !0,
                url: "php/instanzIntoDb.php",
                data: {
                    id: "ben",
                    modus: "save",
                    nameDB: "gipscomm",
                    ben_ID: $("#benID").val(),
                    titel: $("#titelBen").val(),
                    name: $("#nameBen").val(),
                    vorname: $("#vornameBen").val(),
                    eMail: $("#emailBen").val(),
                    telefon: $("#telefonBen").val(),
                    fax: $("#faxBen").val(),
                    mobiltelefon: $("#mobiltelefonBen").val(),
                    benutzername: $("#benutzernameBen").val(),
                    passwort: getHash($("#passwortBen").val())
                },
                success: function(a) {
                    benutzerRollenUndBerechtigungen();
                    alert(datensatzGespeichert(a))
                }
            });
            else if ("manSpeichern" == a) $.ajax({
                type: "POST",
                async: !0,
                url: "../php/mandantIntoDb.php",
                data: {
                    modus: "save",
                    betrGrpID: $("#betrGrpID").val(),
                    manID: $("#manID").val(),
                    name: $("#nameAllgemeinMan").val(),
                    dbKurz: $("#dbKurz").val(),
                    holdingstruktur: $("#holdingstrukturAllgemeinMan").is(":checked"),
                    liegenschaften: $("#liegenschaftenAllgemeinMan").is(":checked"),
                    notiz: $("#notizMan").text()
                },
                success: function(a) {
                    alert(datensatzGespeichert(a));
                    alert(datensatzGespeichert(a))
                }
            });
            else if ("orgSpeichern" == a) $.ajax({
                type: "POST",
                async: !0,
                url: "php/instanzIntoDb.php",
                data: {
                    id: "org",
                    modus: "save",
                    orgID: $("#orgID").val(),
                    nameDB: $("#nameDB").val(),
                    nameAllgemein: $("#nameAllgemeinOrg").val(),
                    gesellschaftsform: $("#gesellschaftsformAllgemeinOrg").val(),
                    firmenanschrift: $("#firmenanschriftAllgemeinOrg").val(),
                    land: $("#landAllgemeinOrg").val(),
                    plz: $("#plzAllgemeinOrg").val(),
                    ort: $("#ortAllgemeinOrg").val(),
                    hrbNummer: $("#hrbnummerAllgemeinOrg").val(),
                    titelGeschaeftsfuehrung: $("#titelGeschaeftsfuehrungOrg").val(),
                    nameGeschaeftsfuehrung: $("#nameGeschaeftsfuehrungOrg").val(),
                    vornameGeschaeftsfuehrung: $("#vornameGeschaeftsfuehrungOrg").val(),
                    eMailGeschaeftsfuehrung: $("#emailGeschaeftsfuehrungOrg").val(),
                    telefonGeschaeftsfuehrung: $("#telefonGeschaeftsfuehrungOrg").val(),
                    faxGeschaeftsfuehrung: $("#faxGeschaeftsfuehrungOrg").val(),
                    mobiltelefonGeschaeftsfuehrung: $("#mobiltelefonGeschaeftsfuehrungOrg").val(),
                    titelEnergiemanagement: $("#titelEnergiemanagementOrg").val(),
                    nameEnergiemanagement: $("#nameEnergiemanagementOrg").val(),
                    vornameEnergiemanagement: $("#vornameEnergiemanagementOrg").val(),
                    eMailEnergiemanagement: $("#emailEnergiemanagementOrg").val(),
                    telefonEnergiemanagement: $("#telefonEnergiemanagementOrg").val(),
                    faxEnergiemanagement: $("#faxEnergiemanagementOrg").val(),
                    mobiltelefonEnergiemanagement: $("#mobiltelefonEnergiemanagementOrg").val()
                },
                success: function(a) {
                    alert(datensatzGespeichert(a))
                    organisationenEinlesen()
                }
            });
            else if ("liegSpeichern" == a) $.ajax({
                type: "POST",
                async: !0,
                url: "php/instanzIntoDb.php",
                data: {
                    id: "lieg",
                    modus: "save",
                    orgID: $("#orgID").val(),
                    liegID: $("#liegID").val(),
                    nameDB: $("#nameDB").val(),
                    nameAllgemein: $("#nameAllgemeinLieg").val(),
                    kuerzel: $("#kuerzelAllgemeinLieg").val(),
                    eigenstaendigeForm: $("#eigenstaendigeformAllgemeinLieg").is(":checked"),
                    aktiv: $("#aktivAllgemeinLieg").is(":checked"),
                    gesellschaftsform: $("#gesellschaftsformAllgemeinLieg").val(),
                    anschrift: $("#anschriftAllgemeinLieg").val(),
                    land: $("#landAllgemeinLieg").val(),
                    plz: $("#plzAllgemeinLieg").val(),
                    ort: $("#ortAllgemeinLieg").val(),
                    typ: $("#typAllgemeinLieg").val(),
                    hatDl: $("#hatDlAllgemeinLieg").prop("checked"),
                    titelAnsprechpartner: $("#titelAnsprechpartnerLieg").val(),
                    nameAnsprechpartner: $("#nameAnsprechpartnerLieg").val(),
                    vornameAnsprechpartner: $("#vornameAnsprechpartnerLieg").val(),
                    eMailAnsprechpartner: $("#emailAnsprechpartnerLieg").val(),
                    telefonAnsprechpartner: $("#telefonAnsprechpartnerLieg").val(),
                    faxAnsprechpartner: $("#faxAnsprechpartnerLieg").val(),
                    mobiltelefonAnsprechpartner: $("#mobiltelefonAnsprechpartnerLieg").val(),
                    titelEnergiebeauftragter: $("#titelEnergiebeauftragterLieg").val(),
                    nameEnergiebeauftragter: $("#nameEnergiebeauftragterLieg").val(),
                    vornameEnergiebeauftragter: $("#vornameEnergiebeauftragterLieg").val(),
                    eMailEnergiebeauftragter: $("#emailEnergiebeauftragterLieg").val(),
                    telefonEnergiebeauftragter: $("#telefonEnergiebeauftragterLieg").val(),
                    faxEnergiebeauftragter: $("#faxEnergiebeauftragterLieg").val(),
                    mobiltelefonEnergiebeauftragter: $("#mobiltelefonEnergiebeauftragterLieg").val(),
                    energietraeger1: $("#inputEnergietraeger1Lieg").val(),
                    energietraeger2: $("#inputEnergietraeger2Lieg").val(),
                    energietraeger3: $("#inputEnergietraeger3Lieg").val(),
                    energietraeger4: $("#inputEnergietraeger4Lieg").val(),
                    energietraeger5: $("#inputEnergietraeger5Lieg").val(),
                    energietraeger6: $("#inputEnergietraeger6Lieg").val(),
                    energietraeger7: $("#inputEnergietraeger7Lieg").val(),
                    energietraeger8: $("#inputEnergietraeger8Lieg").val(),
                    energietraeger9: $("#inputEnergietraeger9Lieg").val(),
                    energieform1: $("#energieform1Lieg").val(),
                    energieform2: $("#energieform2Lieg").val(),
                    energieform3: $("#energieform3Lieg").val(),
                    energieform4: $("#energieform4Lieg").val(),
                    energieform5: $("#energieform5Lieg").val(),
                    energieform6: $("#energieform6Lieg").val(),
                    energieform7: $("#energieform7Lieg").val(),
                    managementsystem1: $("#managementsystem1Lieg").val(),
                    erstzertifizierung1: $("#erstzertifizierung1Lieg").val(),
                    managementsystem2: $("#managementsystem2Lieg").val(),
                    erstzertifizierung2: $("#erstzertifizierung2Lieg").val(),
                    managementsystem3: $("#managementsystem3Lieg").val(),
                    erstzertifizierung3: $("#erstzertifizierung3Lieg").val()
                },
                success: function(a) {
                    alert(datensatzGespeichert(a))
                }
            });
            else if ("extDlSpeichern" == a) $.ajax({
                type: "POST",
                async: !0,
                url: "php/instanzIntoDb.php",
                data: {
                    id: "extDl",
                    modus: "save",
                    extDlID: $("#extDlID").val(),
                    nameDB: $("#nameDB").val(),
                    nameAllgemein: $("#nameExtDl").val(),
                    aktiv: $("#aktivExtDl").is(":checked"),
                    gesellschaftsform: $("#gesellschaftsformExtDl").val(),
                    anschrift: $("#anschriftExtDl").val(),
                    land: $("#landExtDl").val(),
                    plz: $("#plzExtDl").val(),
                    ort: $("#ortExtDl").val(),
                    typ: $("#typExtDl").val(),
                    standortdatenDritte: $("#stdExtDl").is(":checked"),
                    titelAnsprechpartner: $("#titelAnsprechpartnerExtDl").val(),
                    nameAnsprechpartner: $("#nameAnsprechpartnerExtDl").val(),
                    vornameAnsprechpartner: $("#vornameAnsprechpartnerExtDl").val(),
                    eMailAnsprechpartner: $("#emailAnsprechpartnerExtDl").val(),
                    telefonAnsprechpartner: $("#telefonAnsprechpartnerExtDl").val(),
                    faxAnsprechpartner: $("#faxAnsprechpartnerExtDl").val(),
                    mobiltelefonAnsprechpartner: $("#mobiltelefonAnsprechpartnerExtDl").val(),
                    titelEnergiebeauftragter: $("#titelEnergiebeauftragterExtDl").val(),
                    nameEnergiebeauftragter: $("#nameEnergiebeauftragterExtDl").val(),
                    vornameEnergiebeauftragter: $("#vornameEnergiebeauftragterExtDl").val(),
                    eMailEnergiebeauftragter: $("#emailEnergiebeauftragterExtDl").val(),
                    telefonEnergiebeauftragter: $("#telefonEnergiebeauftragterExtDl").val(),
                    faxEnergiebeauftragter: $("#faxEnergiebeauftragterExtDl").val(),
                    mobiltelefonEnergiebeauftragter: $("#mobiltelefonEnergiebeauftragterExtDl").val(),
                    energietraeger1: $("#energietraeger1ExtDl").val(),
                    messstelle1Ent: $("#messstelle1ExtDl").val(),
                    standort1Ent: $("#standort1ExtDl").val(),
                    energietraeger2: $("#energietraeger2ExtDl").val(),
                    messstelle2Ent: $("#messstelle2ExtDl").val(),
                    standort2Ent: $("#standort2ExtDl").val(),
                    energietraeger3: $("#energietraeger3ExtDl").val(),
                    messstelle3Ent: $("#messstelle3ExtDl").val(),
                    standort3Ent: $("#standort3ExtDl").val(),
                    energietraeger4: $("#energietraeger4ExtDl").val(),
                    messstelle4Ent: $("#messstelle4ExtDl").val(),
                    standort4Ent: $("#standort4ExtDl").val(),
                    energietraeger5: $("#energietraeger5ExtDl").val(),
                    messstelle5Ent: $("#messstelle5ExtDl").val(),
                    standort5Ent: $("#standort5ExtDl").val(),
                    energietraeger6: $("#energietraeger6ExtDl").val(),
                    messstelle6Ent: $("#messstelle6ExtDl").val(),
                    standort6Ent: $("#standort6ExtDl").val(),
                    energieRes1: $("#energieRes1ExtDl").val(),
                    messstelle1EnfRes: $("#messstelleEngRes1ExtDl").val(),
                    standort1EnfRes: $("#standort1EngResExtDl").val(),
                    energieRes2: $("#energieRes2ExtDl").val(),
                    messstelle2EnfRes: $("#messstelleEngRes2ExtDl").val(),
                    standort2EnfRes: $("#standort2EngResExtDl").val(),
                    energieRes3: $("#energieRes3ExtDl").val(),
                    messstelle3EnfRes: $("#messstelleEngRes3ExtDl").val(),
                    standort3EnfRes: $("#standort3EngResExtDl").val(),
                    energieRes4: $("#energieRes4ExtDl").val(),
                    messstelle4EnfRes: $("#messstelleEngRes4ExtDl").val(),
                    standort4EnfRes: $("#standort4EngResExtDl").val(),
                    energieRes5: $("#energieRes5ExtDl").val(),
                    messstelle5EnfRes: $("#messstelleEngRes5ExtDl").val(),
                    standort5EnfRes: $("#standort5EngResExtDl").val(),
                    energieRes6: $("#energieRes6ExtDl").val(),
                    messstelle6EnfRes: $("#messstelleEngRes6ExtDl").val(),
                    standort6EnfRes: $("#standort6EngResExtDl").val()
                },
                success: function(a) {
                    alert(datensatzGespeichert(a))
                }
            });
            else if ("berSpeichern" == a) $.ajax({
                type: "POST",
                async: !0,
                url: "php/instanzIntoDb.php",
                data: {
                    id: "ber",
                    modus: "save",
                    liegID: $("#liegID").val(),
                    berID: $("#berID").val(),
                    nameDB: $("#nameDB").val(),
                    nameAllgemein: $("#nameAllgemeinBer").val(),
                    kurzbezeichnung: $("#kurzbezeichnungAllgemeinBer").val(),
                    kostenstelle: $("#KostenstelleAllgemeinBer").val(),
                    ort: $("#ortBer").val(),
                    ausgewaehltesLevel: $("#levelAuswahlAllgemeinBer").val(),
                    weitereBereiche: $("#weiterebereicheAllgemeinBer").is(":checked"),
                    vorgelagerterBereich1: $("#vorgelagerteBereiche1AllgemeinBer").val(),
                    vorgelagerterBereich2: $("#vorgelagerteBereiche2AllgemeinBer").val(),
                    notiz: $("#notizAllgemeinBer").val(),
                    energietraeger1: $("#energietraeger1AllgemeinBer").val(),
                    energietraeger2: $("#energietraeger2AllgemeinBer").val(),
                    energietraeger3: $("#energietraeger3AllgemeinBer").val(),
                    energietraeger4: $("#energietraeger4AllgemeinBer").val()
                },
                success: function(a) {
                    alert(datensatzGespeichert(a))
                }
            });
            else if ("mstESpeichern" == a) {
                data =
                    { id: "mstE"
                    , modus: "save"
                    , mstID: $("#mstID").val()
                    , nameDB: $("#nameDB").val()
                    , messstellenbezeichnung: $("#nameMstE").val()
                    , kurzbezeichnung: $("#kurzbezeichnungMstE").val()
                    , kostenstelle: $("#kostenstelleMstE").val()
                    , aktiv: $("#aktivMstE").is(":checked")
                    , isDurchleitung: $("#istDlMstE").is(":checked")
                    , extDlID: $("#dlAnMstIDE").val()
                    , energietraeger: $("#energietraegerMstE").val()
                    , energieform: $("#energieformMstE").val()
                    , beschreibung: ""
                    , ort: $("#ortMstE").val()
                    , messart: $("#messartMstE").val()
                    , vorgelMstID: $("#vorgelagerteMstIDE").val()
                    , messmittelBerechnungslogik: messmittelOrBerechnungslogik("E")
                    , msmID: $("#messmittelIDMstE").val()
                    , anlID: $("#anlIDMstE").val()
                    , notiz: $("#notizAllgemeinMstE").val()
                    }

                ajaxPost("php/instanzIntoDb.php")(data)
                .then(result => alert(datensatzGespeichert(result)))
            }
            else if ("mstBSpeichern" == a) {
                data =
                    { id: "mstB"
                    , modus: "save"
                    , mstID: $("#mstID").val()
                    , nameDB: $("#nameDB").val()
                    , messstellenbezeichnung: $("#nameMstB").val()
                    , kurzbezeichnung: $("#kurzbezeichnungMstB").val()
                    , kostenstelle: $("#kostenstelleMstB").val()
                    , aktiv: $("#aktivMstB").is(":checked")
                    , isDurchleitung: $("#istDlMstB").is(":checked")
                    , extDlID: $("#dlAnMstIDB").val()
                    , energietraeger: ""
                    , energieform: ""
                    , beschreibung: $("#beschreibungMstB").val()
                    , ort: $("#ortMstB").val()
                    , messart: $("#messartMstB").val()
                    , vorgelMstID: $("#vorgelagerteMstIDB").val()
                    , messmittelBerechnungslogik: messmittelOrBerechnungslogik("B")
                    , msmID: $("#messmittelIDMstB").val()
                    , anlID: $("#anlIDMstB").val()
                    , notiz: $("#notizAllgemeinMstB").val()
                    }

                ajaxPost("php/instanzIntoDb.php")(data)
                .then(result => alert(datensatzGespeichert(result)))
            }
            else if ("stdSpeichern" == a) $.ajax({
                type: "POST",
                async: !0,
                url: "php/instanzIntoDb.php",
                data: {
                    id: "std",
                    modus: "save",
                    stdID: $("#stdID").val(),
                    nameDB: $("#nameDB").val(),
                    ort: $("#nameAllgemeinStd").val(),
                    kuerzel: $("#kurzbezeichnungAllgemeinStd").val(),
                    flaeche: $("#flaecheAllgemeinStd").val(),
                    customLabel1: $("#custom1LabelStd").text(),
                    customInput1: $("#custom1EingabeStd").val(),
                    customLabel2: $("#custom2LabelStd").text(),
                    customInput2: $("#custom2EingabeStd").val(),
                    customLabel3: $("#custom3LabelStd").text(),
                    customInput3: $("#custom3EingabeStd").val(),
                    customLabel4: $("#custom4LabelStd").text(),
                    customInput4: $("#custom4EingabeStd").val(),
                    customLabel5: $("#custom5LabelStd").text(),
                    customInput5: $("#custom5EingabeStd").val(),
                    customLabel6: $("#custom6LabelStd").text(),
                    customInput6: $("#custom6EingabeStd").val(),
                    notiz: $("#notizAllgemeinStd").val()
                },
                success: function(a) {
                    alert(datensatzGespeichert(a));
                    readInstanzen("stdLast", $("#stdCount").val())
                }
            });
            else if ("stdDrSpeichern" == a) $.ajax({
                type: "POST",
                async: !0,
                url: "php/instanzIntoDb.php",
                data: {
                    id: "stdDr",
                    modus: "save",
                    stdDrID: $("#stdDrID").val(),
                    nameDB: $("#nameDB").val(),
                    ort: $("#nameAllgemeinStdDr").val(),
                    kuerzel: $("#kurzbezeichnungAllgemeinStdDr").val(),
                    flaeche: $("#flaecheAllgemeinStdDr").val(),
                    customLabel1: $("#custom1LabelStdDr").text(),
                    customInput1: $("#custom1EingabeStdDr").val(),
                    customLabel2: $("#custom2LabelStdDr").text(),
                    customInput2: $("#custom2EingabeStdDr").val(),
                    customLabel3: $("#custom3LabelStdDr").text(),
                    customInput3: $("#custom3EingabeStdDr").val(),
                    customLabel4: $("#custom4LabelStdDr").text(),
                    customInput4: $("#custom4EingabeStdDr").val(),
                    customLabel5: $("#custom5LabelStdDr").text(),
                    customInput5: $("#custom5EingabeStdDr").val(),
                    customLabel6: $("#custom6LabelStdDr").text(),
                    customInput6: $("#custom6EingabeStdDr").val(),
                    notiz: $("#notizAllgemeinStdDr").val()
                },
                success: function(a) {
                    alert(datensatzGespeichert(a))
                }
            });
            else if ("anlSpeichern" == a) {
                for (var c = $("#bildAllgemeinAnl").prop("src"), g = c.split($("#nameDB").val()), f = changeTracker.getChanges(), h = f.length,
                        q = "", r = 0; r < h; r++) q += f[r].label + ":" + f[r].oldValue + " -> " + f[r].newValue + ", ";
                $.ajax({
                    type: "POST",
                    async: !0,
                    url: "php/instanzIntoDb.php",
                    data: {
                        id: "anl",
                        modus: "save",
                        anlID: $("#anlID").val(),
                        nameDB: $("#nameDB").val(),
                        liegID: $("#liegID").val(),
                        archiviert: $("#archiviertAnl").val(),
                        bemerkung: $("#bemerkungHistFenster").val(),
                        info: q,
                        gueltigVon: $("#gueltigVonHistFenster").val(),
                        gueltigBis: $("#gueltigBisHistFenster").val(),
                        anlagenbild: "uploadsDownloads/images/" + $("#nameDB").val() + g[1],
                        anlagennummer: $("#anlagennummerAllgemeinAnl").val(),
                        bezeichnung: $("#bezeichnungAllgemeinAnl").val(),
                        aktiv: $("#aktivAllgemeinAnl").is(":checked"),
                        typ: $("#typAllgemeinAnl").val(),
                        seriennummer: $("#serienNrAllgemeinAnl").val(),
                        standort: $("#standortAllgemeinAnl").val(),
                        baujahr: $("#baujahrAnl").val(),
                        anschaffungsdatum: $("#datumAnschaffungAllgemeinAnl").val(),
                        jahresbetriebsstunden: $("#betriebsstundenAllgemeinAnl").val(),
                        notizAllgemein: $("#notizAllgemeinAnl").val(),
                        produkt: $("#produktAllgemeinAnl").val(),
                        produktionsmenge: $("#produktionsmenge1AllgemeinAnl").val(),
                        produktionsmengeEinheit: $("#einheitProduktionsmenge1AllgemeinAnl").val(),
                        produktnummer: $("#produktnummer1AllgemeinAnl").val(),
                        mehrProdukte: $("#mehrProdukteAllgemeinAnl").is(":checked"),
                        zugeordneterVerbraucherID1: $("#zugeordneterVerbraucherID1AllgemeinAnl").val(),
                        zugeordneterVerbraucherID2: $("#zugeordneterVerbraucherID2AllgemeinAnl").val(),
                        zugeordneterVerbraucherID3: $("#zugeordneterVerbraucherID3AllgemeinAnl").val(),
                        zugeordneterVerbraucherID4: $("#zugeordneterVerbraucherID4AllgemeinAnl").val(),
                        zugeordneterVerbraucherID5: $("#zugeordneterVerbraucherID5AllgemeinAnl").val(),
                        zugeordneterVerbraucherID6: $("#zugeordneterVerbraucherID6AllgemeinAnl").val(),
                        energietraeger1: $("#energietraeger1AllgemeinAnl").val(),
                        energieform1: $("#energieform1AllgemeinAnl").val(),
                        einheit1: $("#einheit1Anl").val(),
                        anschlussleistung1: formatNumber("deform", $("#anschlussleistung1Anl").val()),
                        mittlereAuslastungProzent1: formatNumber("deform", $("#mittlereAuslastungProzent1Anl").val()),
                        mittlereAuslastungKw1: formatNumber("deform", $("#mittlereAuslastungKw1Anl").val()),
                        betriebstemperatur1: formatNumber("deform", $("#betriebstemperatur1Anl").val()),
                        messstelle1: $("#mst1Anl").val(),
                        messstelle1ID: $("#mst1IDAnl").val(),
                        versBereich1: $("#ber1Anl").val(),
                        abwaerme1: formatNumber("deform", $("#abwaerme1Anl").val()),
                        abwaermeNutzbarkeit1: $("#nutzbarkeitAbwaerme1Anl").val(),
                        bewertungAbwaermeNutzbarkeit1: $("#bewertungNutzbarkeitAbwaerme1Anl").val(),
                        energietraeger2: $("#energietraeger2AllgemeinAnl").val(),
                        energieform2: $("#energieform2AllgemeinAnl").val(),
                        einheit2: $("#einheit2Anl").val(),
                        anschlussleistung2: formatNumber("deform", $("#anschlussleistung2Anl").val()),
                        mittlereAuslastungProzent2: formatNumber("deform", $("#mittlereAuslastungProzent2Anl").val()),
                        mittlereAuslastungKw2: formatNumber("deform", $("#mittlereAuslastungKw2Anl").val()),
                        betriebstemperatur2: formatNumber("deform", $("#betriebstemperatur2Anl").val()),
                        messstelle2: $("#mst2Anl").val(),
                        messstelle2ID: $("#mst2IDAnl").val(),
                        versBereich2: $("#ber2Anl").val(),
                        abwaerme2: formatNumber("deform", $("#abwaerme2Anl").val()),
                        abwaermeNutzbarkeit2: $("#nutzbarkeitAbwaerme2Anl").val(),
                        bewertungAbwaermeNutzbarkeit2: $("#bewertungNutzbarkeitAbwaerme2Anl").val(),
                        energietraeger3: $("#energietraeger3AllgemeinAnl").val(),
                        energieform3: $("#energieform3AllgemeinAnl").val(),
                        einheit3: $("#einheit3Anl").val(),
                        anschlussleistung3: formatNumber("deform", $("#anschlussleistung3Anl").val()),
                        mittlereAuslastungProzent3: formatNumber("deform", $("#mittlereAuslastungProzent3Anl").val()),
                        mittlereAuslastungKw3: formatNumber("deform", $("#mittlereAuslastungKw3Anl").val()),
                        betriebstemperatur3: formatNumber("deform", $("#betriebstemperatur3Anl").val()),
                        messstelle3: $("#mst3Anl").val(),
                        messstelle3ID: $("#mst3IDAnl").val(),
                        versBereich3: $("#ber3Anl").val(),
                        abwaerme3: formatNumber("deform", $("#abwaerme3Anl").val()),
                        abwaermeNutzbarkeit3: $("#nutzbarkeitAbwaerme3Anl").val(),
                        bewertungAbwaermeNutzbarkeit3: $("#bewertungNutzbarkeitAbwaerme3Anl").val(),
                        energietraeger4: $("#energietraeger4AllgemeinAnl").val(),
                        energieform4: $("#energieform4AllgemeinAnl").val(),
                        einheit4: $("#einheit4Anl").val(),
                        anschlussleistung4: formatNumber("deform", $("#anschlussleistung4Anl").val()),
                        mittlereAuslastungProzent4: formatNumber("deform", $("#mittlereAuslastungProzent4Anl").val()),
                        mittlereAuslastungKw4: formatNumber("deform", $("#mittlereAuslastungKw4Anl").val()),
                        betriebstemperatur4: formatNumber("deform", $("#betriebstemperatur4Anl").val()),
                        messstelle4: $("#mst4Anl").val(),
                        messstelle4ID: $("#mst4IDAnl").val(),
                        versBereich4: $("#ber4Anl").val(),
                        abwaerme4: formatNumber("deform", $("#abwaerme4Anl").val()),
                        abwaermeNutzbarkeit4: $("#nutzbarkeitAbwaerme4Anl").val(),
                        bewertungAbwaermeNutzbarkeit4: $("#bewertungNutzbarkeitAbwaerme4Anl").val(),
                        custom1: $("#custom1Anl").val(),
                        custom2: $("#custom2Anl").val(),
                        custom3: $("#custom3Anl").val(),
                        custom4: $("#custom4Anl").val(),
                        custom5: $("#custom5Anl").val(),
                        custom6: $("#custom6Anl").val()
                    },
                    success: function(a) {
                        alert(datensatzGespeichert(a))
                    }
                })}
            else if ("anlVerschieben" == a) $.ajax({
                type: "POST",
                async: !0,
                url: "php/instanzIntoDb.php",
                data: {
                    id: "anlVersch",
                    nameDB: $("#nameDB").val(),
                    anlID: changePath.getAnlagenID(),
                    liegID: changePath.getLiegenschaftsID()
                },
                success: function(a) {
                    alert("erfolgreich verschoben!");
                    changePath.resetInfos()
                }
            });
            else if ("anlSpeichernHist" == a) c = $("#bildAllgemeinAnl").prop("src"), g = c.split($("#nameDB").val()), $.ajax({
                type: "POST",
                async: !0,
                url: "php/instanzIntoDb.php",
                data: {
                    id: "anlHist",
                    modus: "save",
                    anlID: $("#anlIDHist").val(),
                    nameDB: $("#nameDB").val(),
                    liegID: $("#liegID").val(),
                    archiviert: 1,
                    anlagenbild: "uploadsDownloads/images/" + $("#nameDB").val() + g[1],
                    gueltigVon: $("#gueltigVonAnlHist").val(),
                    gueltigBis: $("#gueltigBisAnlHist").val(),
                    anlagennummer: $("#anlagennummerAllgemeinAnlHist").val(),
                    bezeichnung: $("#bezeichnungAllgemeinAnlHist").val(),
                    aktiv: $("#aktivAllgemeinAnlHist").is(":checked"),
                    typ: $("#typAllgemeinAnlHist").val(),
                    seriennummer: $("#serienNrAllgemeinAnlHist").val(),
                    standort: $("#standortAllgemeinAnlHist").val(),
                    baujahr: $("#baujahrAnlHist").val(),
                    anschaffungsdatum: $("#datumAnschaffungAllgemeinAnlHist").val(),
                    jahresbetriebsstunden: $("#betriebsstundenAllgemeinAnlHist").val(),
                    notizAllgemein: $("#notizAllgemeinAnlHist").val(),
                    produkt: $("#produktAllgemeinAnlHist").val(),
                    produktionsmenge: $("#produktionsmenge1AllgemeinAnlHist").val(),
                    produktionsmengeEinheit: $("#einheitProduktionsmenge1AllgemeinAnlHist").val(),
                    produktnummer: $("#produktnummer1AllgemeinAnlHist").val(),
                    mehrProdukte: $("#mehrProdukteAllgemeinAnlHist").is(":checked"),
                    zugeordneterVerbraucher1: $("#zugeordneterVerbraucher1AllgemeinAnlHist").val(),
                    zugeordneterVerbraucher2: $("#zugeordneterVerbraucher2AllgemeinAnlHist").val(),
                    zugeordneterVerbraucher3: $("#zugeordneterVerbraucher3AllgemeinAnlHist").val(),
                    zugeordneterVerbraucher4: $("#zugeordneterVerbraucher4AllgemeinAnlHist").val(),
                    zugeordneterVerbraucher5: $("#zugeordneterVerbraucher5AllgemeinAnlHist").val(),
                    zugeordneterVerbraucher6: $("#zugeordneterVerbraucher6AllgemeinAnlHist").val(),
                    energietraeger1: $("#energietraeger1AllgemeinAnlHist").val(),
                    energieform1: $("#energieform1AllgemeinAnlHist").val(),
                    einheit1: $("#einheit1AnlHist").val(),
                    anschlussleistung1: $("#anschlussleistung1AnlHist").val(),
                    mittlereAuslastungProzent1: $("#mittlereAuslastungProzent1AnlHist").val(),
                    mittlereAuslastungKw1: $("#mittlereAuslastungKw1AnlHist").val(),
                    betriebstemperatur1: $("#betriebstemperatur1AnlHist").val(),
                    messstelle1: $("#mst1AnlHist").val(),
                    versBereich1: $("#ber1AnlHist").val(),
                    abwaerme1: $("#abwaerme1AnlHist").val(),
                    abwaermeNutzbarkeit1: $("#nutzbarkeitAbwaerme1AnlHist").val(),
                    bewertungAbwaermeNutzbarkeit1: $("#bewertungNutzbarkeitAbwaerme1AnlHist").val(),
                    energietraeger2: $("#energietraeger2AllgemeinAnlHist").val(),
                    energieform2: $("#energieform2AllgemeinAnlHist").val(),
                    einheit2: $("#einheit2AnlHist").val(),
                    anschlussleistung2: $("#anschlussleistung2AnlHist").val(),
                    mittlereAuslastungProzent2: $("#mittlereAuslastungProzent2AnlHist").val(),
                    mittlereAuslastungKw2: $("#mittlereAuslastungKw2AnlHist").val(),
                    betriebstemperatur2: $("#betriebstemperatur2AnlHist").val(),
                    messstelle2: $("#mst2AnlHist").val(),
                    versBereich2: $("#ber2AnlHist").val(),
                    abwaerme2: $("#abwaerme2AnlHist").val(),
                    abwaermeNutzbarkeit2: $("#nutzbarkeitAbwaerme2AnlHist").val(),
                    bewertungAbwaermeNutzbarkeit2: $("#bewertungNutzbarkeitAbwaerme2AnlHist").val(),
                    energietraeger3: $("#energietraeger3AllgemeinAnlHist").val(),
                    energieform3: $("#energieform3AllgemeinAnlHist").val(),
                    einheit3: $("#einheit3AnlHist").val(),
                    anschlussleistung3: $("#anschlussleistung3Anl").val(),
                    mittlereAuslastungProzent3: $("#mittlereAuslastungProzent3AnlHist").val(),
                    mittlereAuslastungKw3: $("#mittlereAuslastungKw3AnlHist").val(),
                    betriebstemperatur3: $("#betriebstemperatur3AnlHist").val(),
                    messstelle3: $("#mst3AnlHist").val(),
                    versBereich3: $("#ber3AnlHist").val(),
                    abwaerme3: $("#abwaerme3AnlHist").val(),
                    abwaermeNutzbarkeit3: $("#nutzbarkeitAbwaerme3AnlHist").val(),
                    bewertungAbwaermeNutzbarkeit3: $("#bewertungNutzbarkeitAbwaerme3AnlHist").val(),
                    energietraeger4: $("#energietraeger4AllgemeinAnlHist").val(),
                    energieform4: $("#energieform4AllgemeinAnlHist").val(),
                    einheit4: $("#einheit4AnlHist").val(),
                    anschlussleistung4: $("#anschlussleistung4AnlHist").val(),
                    mittlereAuslastungProzent4: $("#mittlereAuslastungProzent4AnlHist").val(),
                    mittlereAuslastungKw4: $("#mittlereAuslastungKw4AnlHist").val(),
                    betriebstemperatur4: $("#betriebstemperatur4AnlHist").val(),
                    messstelle4: $("#mst4AnlHist").val(),
                    versBereich4: $("#ber4AnlHist").val(),
                    abwaerme4: $("#abwaerme4AnlHist").val(),
                    abwaermeNutzbarkeit4: $("#nutzbarkeitAbwaerme4AnlHist").val(),
                    bewertungAbwaermeNutzbarkeit4: $("#bewertungNutzbarkeitAbwaerme4AnlHist").val(),
                    custom1: $("#custom1AnlHist").val(),
                    custom2: $("#custom2AnlHist").val(),
                    custom3: $("#custom3AnlHist").val(),
                    custom4: $("#custom4AnlHist").val(),
                    custom5: $("#custom5AnlHist").val(),
                    custom6: $("#custom6AnlHist").val()
                },
                success: function(a) {
                    alert(datensatzGespeichert(a))
                }
            });
            else if ("msmSpeichern" == a) c = $("#bildAllgemeinMsm").prop("src"), g = c.split($("#nameDB").val()), $.ajax({
                type: "POST",
                async: !0,
                url: "php/instanzIntoDb.php",
                data: {
                    id: "msm",
                    modus: "save",
                    nameDB: $("#nameDB").val(),
                    msmID: $("#msmID").val(),
                    liegID: $("#liegID").val(),
                    nr: $("#messmittelNrAllgemeinMsm").val(),
                    messmittelbild: "uploadsDownloads/images/" + $("#nameDB").val() + g[1],
                    bezeichnung: $("#bezeichnungAllgemeinMsm").val(),
                    mstID: $("#messstelleIDAllgemeinMsm").val(),
                    anlID: $("#anlIDMsm").val(),
                    typ: $("#typAllgemeinMsm").val(),
                    nrTyp: $("#typNrAllgemeinMsm").val(),
                    datumInstallation: $("#installationsdatumAllgemeinMsm").val(),
                    energietraeger: $("#entMsm").val(),
                    einheit: $("#einheitAllgemeinMsm").val(),
                    multibox: $("#multiboxAllgemeinMsm").is(":checked"),
                    unit: $("#unitAllgemeinMsm").val(),
                    typUnit: $("#unitTypAllgemeinMsm").val(),
                    anzahlKanaele: $("#anzahlKanaeleAllgemeinMsm").val(),
                    messungsform: $("#messungsformAllgemeinMsm").val(),
                    kanal1: $("#kanal1AllgemeinMsm").val(),
                    kanal2: $("#kanal2AllgemeinMsm").val(),
                    kanal3: $("#kanal3AllgemeinMsm").val(),
                    notizAllgemein: $("#notizAllgemeinMsm").val(),
                    nameBeauftragter: $("#beauftragterPruefinformationenMsm").val(),
                    emailBeauftragter: $("#beauftragterEmailPruefinformationenMsm").val(),
                    pruefzyklus: $("#pruefzyklusPruefinformationenMsm").val(),
                    letztePruefung: $("#letztePruefungPruefinformationenMsm").val(),
                    naechstePruefung: $("#naechstePruefungPruefinformationenMsm").val(),
                    notizPruef: $("#notiz2AllgemeinMsm").val(),
                    messmethode: $("#messmethodeInformationenConfig").val(),
                    messzyklus: $("#messzyklusInformationenConfig").val(),
                    messtoleranz: formatNumber("deform", $("#messtoleranzInformationenConfig").val()),
                    notizAllgInfos: $("#notiz1InformationenConfig").val(),
                    verbrauchswertbildung: $("#verbrauchswertbildungConfig").val(),
                    wandlerfaktor: formatNumber("deform", $("#wandlungsfaktorTechnischeDetailsConfig").val()),
                    geraetetyp: $("#geraetetypTechnischeDetailsConfig").val(),
                    ipAddresse: $("#ipTechnischeDetailsConfig").val(),
                    subnetMaske: $("#subnetMaskTechnischeDetailsConfig").val(),
                    gateway: $("#gatewayTechnischeDetailsConfig").val(),
                    cgiPort: $("#cgiPortTechnischeDetailsConfig").val(),
                    modbusPort: $("#modbusPortTechnischeDetailsConfig").val(),
                    ftpPort: $("#ftpPortTechnischeDetailsConfig").val(),
                    notizTechnDetails: $("#notiz2InformationenConfig").val()
                },
                success: function(a) {
                    alert(datensatzGespeichert(a))
                }
            });
            else if ("prdSpeichern" == a) {
                f = changeTracker.getChanges();
                h = f.length;
                q = "";
                for (r = 0; r < h; r++) q += f[r].label + ":" + f[r].oldValue + " -> " + f[r].newValue + ", ";
                $.ajax({
                    type: "POST",
                    async: !0,
                    url: "php/instanzIntoDb.php",
                    data: {
                        modus: "save",
                        id: "prd",
                        nameDB: $("#nameDB").val(),
                        prdID: $("#prdID").val(),
                        orgID: $("#orgID").val(),
                        bezeichnung: $("#bezeichnungPrd").val(),
                        artikelnummer: $("#artklnrPrd").val().trim(),
                        gruppenID: $("#prdCount").val(),
                        archiviert: $("#archiviertPrd").val(),
                        bemerkung: $("#bemerkungHistFenster").val(),
                        info: q,
                        gueltigVon: $("#gueltigVonHistFenster").val(),
                        gueltigBis: $("#gueltigBisHistFenster").val(),
                        custom1: $("#custom1Prd").val(),
                        custom2: $("#custom2Prd").val(),
                        custom3: $("#custom3Prd").val(),
                        custom4: $("#custom4Prd").val(),
                        custom5: $("#custom5Prd").val(),
                        custom6: $("#custom6Prd").val(),
                        anl01ID: $("#inpAnlage1IDPrd").val(),
                        anl02ID: $("#inpAnlage2IDPrd").val(),
                        anl03ID: $("#inpAnlage3IDPrd").val(),
                        anl04ID: $("#inpAnlage4IDPrd").val(),
                        anl05ID: $("#inpAnlage5IDPrd").val(),
                        anl06ID: $("#inpAnlage6IDPrd").val(),
                        anl07ID: $("#inpAnlage7IDPrd").val(),
                        anl08ID: $("#inpAnlage8IDPrd").val(),
                        anl09ID: $("#inpAnlage9IDPrd").val(),
                        anlType01: $("#messartMstInpAnlage1Prd").val(),
                        anlType02: $("#messartMstInpAnlage2Prd").val(),
                        anlType03: $("#messartMstInpAnlage3Prd").val(),
                        anlType04: $("#messartMstInpAnlage4Prd").val(),
                        anlType05: $("#messartMstInpAnlage5Prd").val(),
                        anlType06: $("#messartMstInpAnlage6Prd").val(),
                        anlType07: $("#messartMstInpAnlage7Prd").val(),
                        anlType08: $("#messartMstInpAnlage8Prd").val(),
                        anlType09: $("#messartMstInpAnlage9Prd").val()
                    },
                    success: function(a) {
                        alert(datensatzGespeichert(a));
                        readInstanzen("prdLast", $("#prdCount").val())
                    }
                });
                /*produkte mm 01-03-2021*/
                /*new-mm-start*/
                /*$.ajax({
                    type: "POST",
                    async: !0,
                    url: "php/instanzIntoDb.php",
                    data: {
                        modus: "save",
                        id: "prdktAnl",
                        nameDB: $("#nameDB").val(),
                        prdID: $("#prdID").val(),
                        orgID: $("#orgID").val(),
                        anl01ID: $("#inpAnlage1IDPrd").val(),
                        anl02ID: $("#inpAnlage2IDPrd").val(),
                        anl03ID: $("#inpAnlage3IDPrd").val(),
                        anl04ID: $("#inpAnlage4IDPrd").val(),
                        anl05ID: $("#inpAnlage5IDPrd").val(),
                        anl06ID: $("#inpAnlage6IDPrd").val(),
                        anl07ID: $("#inpAnlage7IDPrd").val(),
                        anl08ID: $("#inpAnlage8IDPrd").val(),
                        anl09ID: $("#inpAnlage9IDPrd").val(),
                        anlType01: $("#messartMstInpAnlage1Prd").val(),
                        anlType02: $("#messartMstInpAnlage2Prd").val(),
                        anlType03: $("#messartMstInpAnlage3Prd").val(),

                        anlType04: $("#messartMstInpAnlage4Prd").val(),
                        anlType05: $("#messartMstInpAnlage5Prd").val(),
                        anlType06: $("#messartMstInpAnlage6Prd").val(),

                        anlType07: $("#messartMstInpAnlage7Prd").val(),
                        anlType08: $("#messartMstInpAnlage8Prd").val(),
                        anlType09: $("#messartMstInpAnlage9Prd").val()

                    },
                    success: function(a) {
                        alert(datensatzGespeichert(a));
                        readInstanzen("prdLast", $("#prdCount").val())
                    }
                });*/
                /*new-mm-end*/
                prdNavID = $("#prdCount").val()}
            else if ("prdSpeichernHist" == a) {
                f = changeTracker.getChanges();
                h = f.length;
                q = "";
                for (r =
                    0; r < h; r++) q += f[r].label + ":" + f[r].oldValue + " -> " + f[r].newValue + ", ";
                $.ajax({
                    type: "POST",
                    async: !0,
                    url: "php/instanzIntoDb.php",
                    data: {
                        id: "prd",
                        nameDB: $("#nameDB").val(),
                        prdID: $("#prdID").val(),
                        modus: "save",
                        archiviert: $("#archiviertPrd").val(),
                        bemerkung: $("#bemerkungHistFenster").val(),
                        info: q,
                        gueltigVon: $("#gueltigVonPrdHist").val(),
                        gueltigBis: $("#gueltigBisPrdHist").val(),
                        bezeichnung: $("#bezeichnungPrdHist").val(),
                        artikelnummer: $("#artklnrPrdHist").val().trim(),
                        custom1: $("#custom1PrdHist").val(),
                        custom2: $("#custom2PrdHist").val(),
                        custom3: $("#custom3PrdHist").val(),
                        custom4: $("#custom4PrdHist").val(),
                        custom5: $("#custom5PrdHist").val(),
                        custom6: $("#custom6PrdHist").val(),
                        anl1: $("#inpAnlage1PrdHist").val(),
                        anl2: $("#inpAnlage2PrdHist").val(),
                        anl3: $("#inpAnlage3PrdHist").val(),
                        anl4: $("#inpAnlage4PrdHist").val(),
                        anl5: $("#inpAnlage5PrdHist").val(),
                        anl6: $("#inpAnlage6PrdHist").val(),
                        anl7: $("#inpAnlage7PrdHist").val(),
                        anl8: $("#inpAnlage8PrdHist").val(),
                        anl9: $("#inpAnlage9PrdHist").val()
                    },
                    success: function(a) {
                        alert(datensatzGespeichert(a));
                        readInstanzen("prdLast", $("#prdCount").val())
                    }
                });
                prdNavID = $("#prdCount").val()}
            else if ("entSpeichern" == a) $.ajax({
                type: "POST",
                async: !0,
                url: "php/instanzIntoDb.php",
                data: {
                    id: "ent",
                    modus: "save",
                    modusVers: $("#modusVers").val(),
                    nameDB: entDB,
                    entID: $("#entID").val(),
                    versID: $("#versID").val(),
                    name: $("#nameEnt").val(),
                    kuerzel: $("#kuerzelEnt").val(),
                    allgemEnt: $("#allgemEntEnt").val(),
                    notiz: $("#notizEnt").val(),
                    versorgerEvu: $("#versorgerEvuEnt").val(),
                    versorgerUenb: $("#versorgerUenbEnt").val(),
                    versorgerMsb: $("#versorgerMsbEnt").val(),
                    einheit1: $("#einheit1Ent").val(),
                    einheit2: $("#einheit2Ent").val(),
                    einheit3: $("#einheit3Ent").val(),
                    einh1FaktorKwh: formatNumber("deform", $("#entEinh1FaktorKwh").val()),
                    einh2FaktorKwh: formatNumber("deform", $("#entEinh2FaktorKwh").val()),
                    einh3FaktorKwh: formatNumber("deform", $("#entEinh3FaktorKwh").val()),
                    einh1FaktorCO2: formatNumber("deform", $("#entEinh1FaktorCO2").val()),
                    einh2FaktorCO2: formatNumber("deform", $("#entEinh2FaktorCO2").val()),
                    einh3FaktorCO2: formatNumber("deform", $("#entEinh3FaktorCO2").val()),
                    lblEinh1FaktorX1: $("#lblEntEinh1FaktorX1").text(),
                    lblEinh2FaktorX1: $("#lblEntEinh2FaktorX1").text(),
                    lblEinh3FaktorX1: $("#lblEntEinh3FaktorX1").text(),
                    einh1FaktorX1: formatNumber("deform", $("#entEinh1FaktorX1").val()),
                    einh2FaktorX1: formatNumber("deform", $("#entEinh2FaktorX1").val()),
                    einh3FaktorX1: formatNumber("deform", $("#entEinh3FaktorX1").val()),
                    lblEinh1FaktorX2: $("#lblEntEinh1FaktorX2").text(),
                    lblEinh2FaktorX2: $("#lblEntEinh2FaktorX2").text(),
                    lblEinh3FaktorX2: $("#lblEntEinh3FaktorX2").text(),
                    einh1FaktorX2: formatNumber("deform", $("#entEinh1FaktorX2").val()),
                    einh2FaktorX2: formatNumber("deform", $("#entEinh2FaktorX2").val()),
                    einh3FaktorX2: formatNumber("deform", $("#entEinh3FaktorX2").val()),
                    lblEinh1FaktorX3: $("#lblEntEinh1FaktorX3").text(),
                    lblEinh2FaktorX3: $("#lblEntEinh2FaktorX3").text(),
                    lblEinh3FaktorX3: $("#lblEntEinh3FaktorX3").text(),
                    einh1FaktorX3: formatNumber("deform", $("#entEinh1FaktorX3").val()),
                    einh2FaktorX3: formatNumber("deform", $("#entEinh2FaktorX3").val()),
                    einh3FaktorX3: formatNumber("deform", $("#entEinh3FaktorX3").val()),
                    gueltigVom: $("#gueltigVomEnt").val(),
                    gueltigBis: $("#gueltigBisEnt").val()
                },
                success: function(a) {
                    alert(datensatzGespeichert(a))
                }
            });
            else if ("enfSpeichern" == a) $.ajax({
                type: "POST",
                async: !0,
                url: "php/instanzIntoDb.php",
                data: {
                    id: "enf",
                    modus: "save",
                    nameDB: entDB,
                    enfID: $("#enfID").val(),
                    name: $("#nameEnf").val(),
                    kuerzel: $("#kuerzelEnf").val(),
                    notiz: $("#notizEnf").val(),
                    aktiv: $("#aktivEnf").is(":checked"),
                    einheit1: $("#einheit1Enf").val(),
                    einheit2: $("#einheit2Enf").val(),
                    einheit3: $("#einheit3Enf").val(),
                    einh1FaktorKwh: formatNumber("deform", $("#enfEinh1FaktorKwh").val()),
                    einh2FaktorKwh: formatNumber("deform", $("#enfEinh2FaktorKwh").val()),
                    einh3FaktorKwh: formatNumber("deform", $("#enfEinh3FaktorKwh").val()),
                    einh1FaktorCO2: formatNumber("deform", $("#enfEinh1FaktorCO2").val()),
                    einh2FaktorCO2: formatNumber("deform", $("#enfEinh2FaktorCO2").val()),
                    einh3FaktorCO2: formatNumber("deform", $("#enfEinh3FaktorCO2").val()),
                    lblEinh1FaktorX1: $("#lblEnfEinh1FaktorX1").text(),
                    lblEinh2FaktorX1: $("#lblEnfEinh2FaktorX1").text(),
                    lblEinh3FaktorX1: $("#lblEnfEinh3FaktorX1").text(),
                    einh1FaktorX1: formatNumber("deform", $("#enfEinh1FaktorX1").val()),
                    einh2FaktorX1: formatNumber("deform", $("#enfEinh2FaktorX1").val()),
                    einh3FaktorX1: formatNumber("deform", $("#enfEinh3FaktorX1").val()),
                    lblEinh1FaktorX2: $("#lblEnfEinh1FaktorX2").text(),
                    lblEinh2FaktorX2: $("#lblEnfEinh2FaktorX2").text(),
                    lblEinh3FaktorX2: $("#lblEnfEinh3FaktorX2").text(),
                    einh1FaktorX2: formatNumber("deform", $("#enfEinh1FaktorX2").val()),
                    einh2FaktorX2: formatNumber("deform", $("#enfEinh2FaktorX2").val()),
                    einh3FaktorX2: formatNumber("deform", $("#enfEinh3FaktorX2").val()),
                    lblEinh1FaktorX3: $("#lblEnfEinh1FaktorX3").text(),
                    lblEinh2FaktorX3: $("#lblEnfEinh2FaktorX3").text(),
                    lblEinh3FaktorX3: $("#lblEnfEinh3FaktorX3").text(),
                    einh1FaktorX3: formatNumber("deform", $("#enfEinh1FaktorX3").val()),
                    einh2FaktorX3: formatNumber("deform", $("#enfEinh2FaktorX3").val()),
                    einh3FaktorX3: formatNumber("deform", $("#enfEinh3FaktorX3").val()),
                    gueltigVom: $("#gueltigVomEnf").val(),
                    gueltigBis: $("#gueltigBisEnf").val()
                },
                success: function(a) {
                    alert(datensatzGespeichert(a))
                }
            });
            else if ("eRngSpeichern" == a) {
                data =
                    { id: "eRng"
                    , modus: "save"
                    , nameDB: $("#nameDB").val()
                    , eRngID: $("#eRngID").val()
                    , liegID: $("#liegID").val()
                    , versorger: $("#versorgerERng").val()
                    , rechnungsmodus: $("#modusERng").val()
                    , rechnungsnummer: $("#nrERng").val()
                    , zaehlpunktnummer: $("#zpNrERng").val()
                    , mstID: $("#mstIDERng").val()
                    , rechnungsdatum: $("#datumERng").val()
                    , abrechnungszeitVom: $("#vomERng").val()
                    , abrechnungszeitBis: $("#bisERng").val()
                    , energietraeger: $("#inputEntERng").val()
                    , einheit: $("#einERng").val()
                    , menge: formatNumber("deform", $("#mengeERng").val())
                    , verbrauch: formatNumber("deform", $("#verbrauchERng").val())
                    , kostenstelle: $("#kostenstelleERng").val()
                    , kosten: formatNumber("deform", $("#kostenERng").val())
                    , mwst: formatNumber("deform", $("#mwstPercentERng").val())
                    , tagstromVerbr: formatNumber("deform", $("#tagstromVerbrERng").val())
                    , tagstromKost: formatNumber("deform", $("#tagstromKostERng").val())
                    , nachtstromVerbr: formatNumber("deform", $("#nachtstromVerbrERng").val())
                    , nachtstromKost: formatNumber("deform", $("#nachtstromKostERng").val())
                    , blindstrom: formatNumber("deform", $("#blindstromERng").val())
                    , lastspitze: formatNumber("deform", $("#lastspitzeERng").val())
                    , leistungspreis: formatNumber("deform", $("#leistungspreisERng").val())
                    , arbeitspreisWirkstrom: formatNumber("deform", $("#abpWirkERng").val())
                    , stromsteuer: formatNumber("deform", $("#strSteuERng").val())
                    , arbeitspreisNetz: formatNumber("deform", $("#abpNetzERng").val())
                    , konzessionsabgabe: formatNumber("deform", $("#konzERng").val())
                    , eegUmlage: formatNumber("deform", $("#eegERng").val())
                    , eegUmlageUntMill: formatNumber("deform", $("#eegUntERng").val())
                    , eegUmlageUebMill: formatNumber("deform", $("#eegUebERng").val())
                    , kwkUnter: formatNumber("deform", $("#kwkUntERng").val())
                    , kwkUeber: formatNumber("deform", $("#kwkObERng").val())
                    , nevUnter: formatNumber("deform", $("#nevUntERng").val())
                    , nevUeber: formatNumber("deform", $("#nevObERng").val())
                    , offUnter: formatNumber("deform", $("#offUntERng").val())
                    , offUeber: formatNumber("deform", $("#offObERng").val())
                    , lblCustom1: $("#lblCustom1ERng").text()
                    , Custom1: formatNumber("deform", $("#custom1ERng").val())
                    , lblCustom2: $("#lblCustom2ERng").text()
                    , Custom2: formatNumber("deform", $("#custom2ERng").val())
                    , lblCustom3: $("#lblCustom3ERng").text()
                    , Custom3: formatNumber("deform", $("#custom3ERng").val())
                    , lblCustom4: $("#lblCustom4ERng").text()
                    , Custom4: formatNumber("deform", $("#custom4ERng").val())
                    , lblCustom5: $("#lblCustom5ERng").text()
                    , Custom5: formatNumber("deform", $("#custom5ERng").val())
                    , lblCustom6: $("#lblCustom6ERng").text()
                    , Custom6: formatNumber("deform", $("#custom6ERng").val())
                    }

                ajaxPost("php/instanzIntoDb.php")(data)
                .then(result => {
                    alert(datensatzGespeichert(result))
                })
            }
            else if ("intEngIMwSpeichern" == a) {
                var x = "",
                    u = "INSERT INTO ";
                $("#zeitintervallMst").val() == TimeInterval.DAY ? x = "masseneingabeTage" : $("#zeitintervallMst").val() == TimeInterval.WEEK ?
                    x = "masseneingabeWochen" : $("#zeitintervallMst").val() == TimeInterval.MONTH ? x = "masseneingabeMonate" : $("#zeitintervallMst").val() == TimeInterval.YEAR && (x = "masseneingabeJahre");
                u = u + (x + " (mst_ID, engOderBde, year) ") + ("VALUES ( " + $("#mstID").val() + ", " + InstanceMode.ENERGY + ", " + $("#jahrMassEingDataMst").val() + ") ");
                (new DataMachine).runQuery("write", $("#nameDB").val(), u);
                $.ajax({
                    type: "POST",
                    async: !0,
                    url: "php/instanzIntoDb.php",
                    data: {
                        id: "intEngIMw",
                        modus: "save",
                        nameDB: $("#nameDB").val(),
                        mstID: $("#mstID").val(),
                        zeitintervall: $("#zeitintervallMst").val(),
                        einheit: $("#einheitMst").val(),
                        notiz: $("#notizMesswertManuell").val()
                    },
                    success: function(a) {
                        alert(datensatzGespeichert(a));
                        mstOderAnlOhneZeitzuordnungInTbl(InstanceMode.ENERGY)
                    }
                })}
            else if ("intBdeIMwSpeichern" == a) {
                var t = "",
                    u = "INSERT INTO ";
                $("#zeitintervallAnl").val() == TimeInterval.DAY && (t = "masseneingabeTage");
                $("#zeitintervallAnl").val() == TimeInterval.WEEK && (t = "masseneingabeWochen");
                $("#zeitintervallAnl").val() == TimeInterval.MONTH && (t = "masseneingabeMonate");
                $("#zeitintervallAnl").val() == TimeInterval.YEAR && (t = "masseneingabeJahre");
                $("#zeitintervallAnl").val() == TimeInterval.YEAR ? (u += t + " (anl_ID, engOderBde, einheit) ", u += "VALUES ( " + $("#anlID").val() + ", " + InstanceMode.BDE + ", '" + $("#einheitMasseneingabeIMw").val() + "') ") : (u += t + " (anl_ID, engOderBde, einheit, year) ", u += "VALUES ( " + $("#anlID").val() + ", " + InstanceMode.BDE + ", '" + $("#einheitMasseneingabeIMw").val() + "', '" + $("#jahrMassEingDataAnl").val() + "') ");
                (new DataMachine).runQuery("write", $("#nameDB").val(),
                    u);
                $.ajax({
                    type: "POST",
                    async: !0,
                    url: "php/instanzIntoDb.php",
                    data: {
                        id: "intBdeIMw",
                        modus: "save",
                        nameDB: $("#nameDB").val(),
                        anlID: $("#anlID").val(),
                        zeitintervall: $("#zeitintervallAnl").val(),
                        einheit: $("#einheitAnl").val(),
                        notiz: $("#notizBdeIMw").val()
                    },
                    success: function(a) {
                        alert(datensatzGespeichert(a));
                       // mstOderAnlOhneZeitzuordnungInTbl(InstanceMode.BDE)
                    }
                })}
            else if ("eAnlSpeichern" == a) {
                var w = [];
                for (i = 0; i < $("#tblOptionenEAnl tbody tr").length; i++) w[i] = tblOptionenEAnl.cell(i, 0).data();
                var y = w.join(",");
                $.ajax({
                    type: "POST",
                    async: !0,
                    url: "php/instanzIntoDb.php",
                    data: {
                        id: "eAnl",
                        modus: "save",
                        nameDB: $("#nameDB").val(),
                        eAnlID: $("#eAnlID").val(),
                        name: $("#nameEAnl").val(),
                        kurz: $("#kuerzelEAnl").val(),
                        beschreibung: $("#beschreibungEAnl").val(),
                        optionen: y
                    },
                    success: function(a) {
                        alert(datensatzGespeichert(a))
                    }
                })}
            else if ("ePrdSpeichern" == a) {
                w = [];
                for (i = 0; i < $("#tblOptionenEPrd tbody tr").length; i++) w[i] = tblOptionenEPrd.cell(i, 0).data();
                y = w.join(",");
                $.ajax({
                    type: "POST",
                    async: !0,
                    url: "php/instanzIntoDb.php",
                    data: {
                        id: "ePrd",
                        modus: "save",
                        nameDB: $("#nameDB").val(),
                        ePrdID: $("#ePrdID").val(),
                        name: $("#nameEPrd").val(),
                        kurz: $("#kuerzelEPrd").val(),
                        beschreibung: $("#beschreibungEPrd").val(),
                        optionen: y
                    },
                    success: function(a) {
                        alert(datensatzGespeichert(a))
                    }
                })}
            else if ("knzSpeichern" == a) {
                for (var z = $("#btnTabKnzCont li").length, p = 0, A = 0; A < z + 1; A++)
                    if ("none" === $("#btnTabKnzCont li").eq(A).css("display") || 10 === A) {
                        p = A;
                        break
                    } $("#nameDB").val();
                $("#orgID").val();
                $("#knzInsID").val();
                var B = $("#bezugAllgemeinKnz").val(),
                    C = $("#instanzAllgemeinIDKnz").val(),
                    D = $("#zustaendigerMitarbeiterAllgemeinKnz").val(),
                    v = $("#beschreibungAllgemeinKnz").val(),
                    F = $("#bez_1_Knz").val(),
                    G = $("#anwendungsbereichKennzahldetails1Knz").val(),
                    H = $("#status1Knz").prop("checked"),
                    I = $("#datumEinfuehrung1Knz").val(),
                    J = $("#datumLetzteUeberpruefung1Knz").val(),
                    K = $("#datumDeaktivierung1Knz").val(),
                    L = $("#einheitKennzahldetail1Knz").val(),
                    M = $("#formel1IDKnz").val(),
                    N = $("#kennzahl1Knz").val(),
                    O = $("#toleranzgrenzeOben1Knz").val(),
                    P = $("#toleranzgrenzeUnten1Knz").val();
                    $("#zielwert1Knz").val();
                    $("#zielVon1Knz").val();
                    $("#zielBis1Knz").val();
                var Q = $("#bez_2_Knz").val(),
                    R = $("#anwendungsbereichKennzahldetails2Knz").val(),
                    S = $("#status2Knz").prop("checked"),
                    T = $("#datumEinfuehrung2Knz").val(),
                    U = $("#datumLetzteUeberpruefung2Knz").val(),
                    V = $("#datumDeaktivierung2Knz").val(),
                    W = $("#einheitKennzahldetail2Knz").val(),
                    X = $("#formel2IDKnz").val(),
                    Y = $("#kennzahl2Knz").val(),
                    Z = $("#toleranzgrenzeOben2Knz").val(),
                    aa = $("#toleranzgrenzeUnten2Knz").val();
                    $("#zielwert2Knz").val();
                    $("#zielVon2Knz").val();
                    $("#zielBis2Knz").val();
                var ba = $("#bez_3_Knz").val(),
                    ca = $("#anwendungsbereichKennzahldetails3Knz").val(),
                    da = $("#status3Knz").prop("checked"),
                    ea = $("#datumEinfuehrung3Knz").val(),
                    fa = $("#datumLetzteUeberpruefung3Knz").val(),
                    ga = $("#datumDeaktivierung3Knz").val(),
                    ha = $("#einheitKennzahldetail3Knz").val(),
                    ia = $("#formel3IDKnz").val(),
                    ja = $("#kennzahl3Knz").val(),
                    ka = $("#toleranzgrenzeOben3Knz").val(),
                    la = $("#toleranzgrenzeUnten3Knz").val();
                    $("#zielwert3Knz").val();
                    $("#zielVon3Knz").val();
                    $("#zielBis3Knz").val();
                var ma = $("#bez_4_Knz").val(),
                    na = $("#anwendungsbereichKennzahldetails4Knz").val(),
                    oa = $("#status4Knz").prop("checked"),
                    pa = $("#datumEinfuehrung4Knz").val(),
                    qa = $("#datumLetzteUeberpruefung4Knz").val(),
                    ra = $("#datumDeaktivierung4Knz").val(),
                    sa = $("#einheitKennzahldetail4Knz").val(),
                    ta = $("#formel4IDKnz").val(),
                    ua = $("#kennzahl4Knz").val(),
                    va = $("#toleranzgrenzeOben4Knz").val(),
                    wa = $("#toleranzgrenzeUnten4Knz").val();
                    $("#zielwert4Knz").val();
                    $("#zielVon4Knz").val();
                    $("#zielBis4Knz").val();
                var xa = $("#bez_5_Knz").val(),
                    ya = $("#anwendungsbereichKennzahldetails5Knz").val(),
                    za = $("#status5Knz").prop("checked"),
                    Aa = $("#datumEinfuehrung5Knz").val(),
                    Ba = $("#datumLetzteUeberpruefung5Knz").val(),
                    Ca = $("#datumDeaktivierung5Knz").val(),
                    Da = $("#einheitKennzahldetail5Knz").val(),
                    Ea = $("#formel5IDKnz").val(),
                    Fa = $("#kennzahl5Knz").val(),
                    Ga = $("#toleranzgrenzeOben5Knz").val(),
                    Ha = $("#toleranzgrenzeUnten5Knz").val();
                    $("#zielwert5Knz").val();
                    $("#zielVon5Knz").val();
                    $("#zielBis5Knz").val();
                var Ia = $("#bez_6_Knz").val(),
                    Ja = $("#anwendungsbereichKennzahldetails6Knz").val(),
                    Ka = $("#status6Knz").prop("checked"),
                    La = $("#datumEinfuehrung6Knz").val(),
                    Ma = $("#datumLetzteUeberpruefung6Knz").val(),
                    Na = $("#datumDeaktivierung6Knz").val(),
                    Oa = $("#einheitKennzahldetail6Knz").val(),
                    Pa = $("#formel6IDKnz").val(),
                    Qa = $("#kennzahl6Knz").val(),
                    Ra = $("#toleranzgrenzeOben6Knz").val(),
                    Sa = $("#toleranzgrenzeUnten6Knz").val();
                    $("#zielwert6Knz").val();
                    $("#zielVon6Knz").val();
                    $("#zielBis6Knz").val();
                var Ta = $("#bez_7_Knz").val(),
                    Ua = $("#anwendungsbereichKennzahldetails7Knz").val(),
                    Va = $("#status7Knz").prop("checked"),
                    Wa = $("#datumEinfuehrung7Knz").val(),
                    Xa = $("#datumLetzteUeberpruefung7Knz").val(),
                    Ya = $("#datumDeaktivierung7Knz").val(),
                    Za = $("#einheitKennzahldetail7Knz").val(),
                    $a = $("#formel7IDKnz").val(),
                    ab = $("#kennzahl7Knz").val(),
                    bb = $("#toleranzgrenzeOben7Knz").val(),
                    cb = $("#toleranzgrenzeUnten7Knz").val();
                    $("#zielwert7Knz").val();
                    $("#zielVon7Knz").val();
                    $("#zielBis7Knz").val();
                var db = $("#bez_8_Knz").val(),
                    eb = $("#anwendungsbereichKennzahldetails8Knz").val(),
                    fb = $("#status8Knz").prop("checked"),
                    gb = $("#datumEinfuehrung8Knz").val(),
                    hb = $("#datumLetzteUeberpruefung8Knz").val(),
                    ib = $("#datumDeaktivierung8Knz").val(),
                    jb = $("#einheitKennzahldetail8Knz").val(),
                    kb = $("#formel8IDKnz").val(),
                    lb = $("#kennzahl8Knz").val(),
                    mb = $("#toleranzgrenzeOben8Knz").val(),
                    nb = $("#toleranzgrenzeUnten8Knz").val();
                    $("#zielwert8Knz").val();
                    $("#zielVon8Knz").val();
                    $("#zielBis8Knz").val();
                var ob = $("#bez_9_Knz").val(),
                    pb = $("#anwendungsbereichKennzahldetails9Knz").val(),
                    qb = $("#status9Knz").prop("checked"),
                    rb = $("#datumEinfuehrung9Knz").val(),
                    sb = $("#datumLetzteUeberpruefung9Knz").val(),
                    tb = $("#datumDeaktivierung9Knz").val(),
                    ub = $("#einheitKennzahldetail9Knz").val(),
                    vb = $("#formel9IDKnz").val(),
                    wb = $("#kennzahl9Knz").val(),
                    xb = $("#toleranzgrenzeOben9Knz").val(),
                    yb = $("#toleranzgrenzeUnten9Knz").val();
                    $("#zielwert9Knz").val();
                    $("#zielVon9Knz").val();
                    $("#zielBis9Knz").val();
                var zb = $("#bez_10_Knz").val(),
                    Ab = $("#anwendungsbereichKennzahldetails10Knz").val(),
                    Bb = $("#status10Knz").prop("checked"),
                    Cb = $("#datumEinfuehrung10Knz").val(),
                    Db = $("#datumLetzteUeberpruefung10Knz").val(),
                    Eb = $("#datumDeaktivierung10Knz").val(),
                    Fb = $("#einheitKennzahldetail10Knz").val(),
                    Gb = $("#formel10IDKnz").val(),
                    Hb = $("#kennzahl10Knz").val(),
                    Ib = $("#toleranzgrenzeOben10Knz").val(),
                    Jb = $("#toleranzgrenzeUnten10Knz").val();
                    $("#zielwert10Knz").val();
                    $("#zielVon10Knz").val();
                    $("#zielBis10Knz").val();
                var E = new Date,
                    Kb = {
                        dataToLog: "\n            ##########################################################################\n\n            Ge\u00e4ndert\n            ++++++++\n            Datum: " + E.getDate() + "." + (E.getMonth() + 1) + ".2019 " + E.getHours() + ":" + (E.getMinutes() + 1) + "\n\n            bezug: " +
                            B + "\n            instanzID: " + C + "\n            zustaendigerMitarbeiter: " + D + "\n            beschreibung: " + v + "\n\n            nKnzs: " + p + "\n\n            bezeichnung1: " + F + "\n            anwendungsbereich1: " + G + "\n            status1: " + H + "\n            einfuehrung1: " + I + "\n            letzteUeberpruefung1: " + J + "\n            deaktivierung1: " + K + "\n            einheit1: " + L + "\n            formelID1: " + M + "\n            kennzahl1: " + N + "\n            toleranzgrenzeOben1:  " + O + "\n            toleranzgrenzeUnten1: " +
                            P + "\n\n            bezeichnung2: " + Q + "\n            anwendungsbereich2: " + R + "\n            status2: " + S + "\n            einfuehrung2: " + T + "\n            letzteUeberpruefung2: " + U + "\n            deaktivierung2: " + V + "\n            einheit2: " + W + "\n            formelID2: " + X + "\n            kennzahl2: " + Y + "\n            toleranzgrenzeOben2:  " + Z + "\n            toleranzgrenzeUnten2: " + aa + "\n\n            bezeichnung3: " + ba + "\n            anwendungsbereich3: " + ca + "\n            status3: " + da + "\n            einfuehrung3: " +
                            ea + "\n            letzteUeberpruefung3: " + fa + "\n            deaktivierung3: " + ga + "\n            einheit3: " + ha + "\n            formelID3: " + ia + "\n            kennzahl3: " + ja + "\n            toleranzgrenzeOben3:  " + ka + "\n            toleranzgrenzeUnten3: " + la + "\n\n            bezeichnung4: " + ma + "\n            anwendungsbereich4: " + na + "\n            status4: " + oa + "\n            einfuehrung4: " + pa + "\n            letzteUeberpruefung4: " + qa + "\n            deaktivierung4: " + ra + "\n            einheit4: " +
                            sa + "\n            formelID4: " + ta + "\n            kennzahl4: " + ua + "\n            toleranzgrenzeOben4:  " + va + "\n            toleranzgrenzeUnten4: " + wa + "\n\n            bezeichnung5: " + xa + "\n            anwendungsbereich5: " + ya + "\n            status5: " + za + "\n            einfuehrung5: " + Aa + "\n            letzteUeberpruefung5: " + Ba + "\n            deaktivierung5: " + Ca + "\n            einheit5: " + Da + "\n            formelID5: " + Ea + "\n            kennzahl5: " + Fa + "\n            toleranzgrenzeOben5:  " + Ga + "\n            toleranzgrenzeUnten5: " +
                            Ha + "\n\n            bezeichnung6: " + Ia + "\n            anwendungsbereich6: " + Ja + "\n            status6: " + Ka + "\n            einfuehrung6: " + La + "\n            letzteUeberpruefung6: " + Ma + "\n            deaktivierung6: " + Na + "\n            einheit6: " + Oa + "\n            formelID6: " + Pa + "\n            kennzahl6: " + Qa + "\n            toleranzgrenzeOben6:  " + Ra + "\n            toleranzgrenzeUnten6: " + Sa + "\n\n            bezeichnung7: " + Ta + "\n            anwendungsbereich7: " + Ua + "\n            status7: " + Va +
                            "\n            einfuehrung7: " + Wa + "\n            letzteUeberpruefung7: " + Xa + "\n            deaktivierung7: " + Ya + "\n            einheit7: " + Za + "\n            formelID7: " + $a + "\n            kennzahl7: " + ab + "\n            toleranzgrenzeOben7:  " + bb + "\n            toleranzgrenzeUnten7: " + cb + "\n\n            bezeichnung8: " + db + "\n            anwendungsbereich8: " + eb + "\n            status8: " + fb + "\n            einfuehrung8: " + gb + "\n            letzteUeberpruefung8: " + hb + "\n            deaktivierung8: " +
                            ib + "\n            einheit8: " + jb + "\n            formelID8: " + kb + "\n            kennzahl8: " + lb + "\n            toleranzgrenzeOben8:  " + mb + "\n            toleranzgrenzeUnten8: " + nb + "\n\n            bezeichnung9: " + ob + "\n            anwendungsbereich9: " + pb + "\n            status9: " + qb + "\n            einfuehrung9: " + rb + "\n            letzteUeberpruefung9: " + sb + "\n            deaktivierung9: " + tb + "\n            einheit9: " + ub + "\n            formelID9: " + vb + "\n            kennzahl9: " + wb + "\n            toleranzgrenzeOben9:  " +
                            xb + "\n            toleranzgrenzeUnten9: " + yb + "\n\n            bezeichnung10: " + zb + "\n            anwendungsbereich10: " + Ab + "\n            status10: " + Bb + "\n            einfuehrung10: " + Cb + "\n            letzteUeberpruefung10: " + Db + "\n            deaktivierung10: " + Eb + "\n            einheit10: " + Fb + "\n            formelID10: " + Gb + "\n            kennzahl10: " + Hb + "\n            toleranzgrenzeOben10:  " + Ib + "\n            toleranzgrenzeUnten10: " + Jb + "\n            ",
                        ins: "Knz"
                    };
                $.ajax({
                    type: "POST",
                    async: !0,
                    url: "../php/log.php",
                    data: Kb,
                    ins: "Knz",
                    success: function(a) {
                        alert("Logged data!")
                    }
                });
                $.ajax({
                    type: "POST",
                    async: !0,
                    url: "php/instanzIntoDb.php",
                    data: {
                        id: "knz",
                        modus: "save",
                        nameDB: $("#nameDB").val(),
                        orgID: $("#orgID").val(),
                        knzInsID: $("#knzInsID").val(),
                        bezug: $("#bezugAllgemeinKnz").val(),
                        instanzID: $("#instanzAllgemeinIDKnz").val(),
                        zustaendigerMitarbeiter: $("#zustaendigerMitarbeiterAllgemeinKnz").val(),
                        beschreibung: $("#beschreibungAllgemeinKnz").val(),
                        nKnzs: p,
                        bezeichnung1: $("#bez_1_Knz").val(),
                        anwendungsbereich1: $("#anwendungsbereichKennzahldetails1Knz").val(),
                        status1: $("#status1Knz").prop("checked"),
                        einfuehrung1: $("#datumEinfuehrung1Knz").val(),
                        letzteUeberpruefung1: $("#datumLetzteUeberpruefung1Knz").val(),
                        deaktivierung1: $("#datumDeaktivierung1Knz").val(),
                        einheit1: $("#einheitKennzahldetail1Knz").val(),
                        formelID1: $("#formel1IDKnz").val(),
                        kennzahl1: $("#kennzahl1Knz").val(),
                        toleranzgrenzeOben1: $("#toleranzgrenzeOben1Knz").val(),
                        toleranzgrenzeUnten1: $("#toleranzgrenzeUnten1Knz").val(),
                        zielwert1: $("#zielwert1Knz").val(),
                        zielVon1: $("#zielVon1Knz").val(),
                        zielBis1: $("#zielBis1Knz").val(),
                        bezeichnung2: $("#bez_2_Knz").val(),
                        anwendungsbereich2: $("#anwendungsbereichKennzahldetails2Knz").val(),
                        status2: $("#status2Knz").prop("checked"),
                        einfuehrung2: $("#datumEinfuehrung2Knz").val(),
                        letzteUeberpruefung2: $("#datumLetzteUeberpruefung2Knz").val(),
                        deaktivierung2: $("#datumDeaktivierung2Knz").val(),
                        einheit2: $("#einheitKennzahldetail2Knz").val(),
                        formelID2: $("#formel2IDKnz").val(),
                        kennzahl2: $("#kennzahl2Knz").val(),
                        toleranzgrenzeOben2: $("#toleranzgrenzeOben2Knz").val(),
                        toleranzgrenzeUnten2: $("#toleranzgrenzeUnten2Knz").val(),
                        zielwert2: $("#zielwert2Knz").val(),
                        zielVon2: $("#zielVon2Knz").val(),
                        zielBis2: $("#zielBis2Knz").val(),
                        bezeichnung3: $("#bez_3_Knz").val(),
                        anwendungsbereich3: $("#anwendungsbereichKennzahldetails3Knz").val(),
                        status3: $("#status3Knz").prop("checked"),
                        einfuehrung3: $("#datumEinfuehrung3Knz").val(),
                        letzteUeberpruefung3: $("#datumLetzteUeberpruefung3Knz").val(),
                        deaktivierung3: $("#datumDeaktivierung3Knz").val(),
                        einheit3: $("#einheitKennzahldetail3Knz").val(),
                        formelID3: $("#formel3IDKnz").val(),
                        kennzahl3: $("#kennzahl3Knz").val(),
                        toleranzgrenzeOben3: $("#toleranzgrenzeOben3Knz").val(),
                        toleranzgrenzeUnten3: $("#toleranzgrenzeUnten3Knz").val(),
                        zielwert3: $("#zielwert3Knz").val(),
                        zielVon3: $("#zielVon3Knz").val(),
                        zielBis3: $("#zielBis3Knz").val(),
                        bezeichnung4: $("#bez_4_Knz").val(),
                        anwendungsbereich4: $("#anwendungsbereichKennzahldetails4Knz").val(),
                        status4: $("#status4Knz").prop("checked"),
                        einfuehrung4: $("#datumEinfuehrung4Knz").val(),
                        letzteUeberpruefung4: $("#datumLetzteUeberpruefung4Knz").val(),
                        deaktivierung4: $("#datumDeaktivierung4Knz").val(),
                        einheit4: $("#einheitKennzahldetail4Knz").val(),
                        formelID4: $("#formel4IDKnz").val(),
                        kennzahl4: $("#kennzahl4Knz").val(),
                        toleranzgrenzeOben4: $("#toleranzgrenzeOben4Knz").val(),
                        toleranzgrenzeUnten4: $("#toleranzgrenzeUnten4Knz").val(),
                        zielwert4: $("#zielwert4Knz").val(),
                        zielVon4: $("#zielVon4Knz").val(),
                        zielBis4: $("#zielBis4Knz").val(),
                        bezeichnung5: $("#bez_5_Knz").val(),
                        anwendungsbereich5: $("#anwendungsbereichKennzahldetails5Knz").val(),
                        status5: $("#status5Knz").prop("checked"),
                        einfuehrung5: $("#datumEinfuehrung5Knz").val(),
                        letzteUeberpruefung5: $("#datumLetzteUeberpruefung5Knz").val(),
                        deaktivierung5: $("#datumDeaktivierung5Knz").val(),
                        einheit5: $("#einheitKennzahldetail5Knz").val(),
                        formelID5: $("#formel5IDKnz").val(),
                        kennzahl5: $("#kennzahl5Knz").val(),
                        toleranzgrenzeOben5: $("#toleranzgrenzeOben5Knz").val(),
                        toleranzgrenzeUnten5: $("#toleranzgrenzeUnten5Knz").val(),
                        zielwert5: $("#zielwert5Knz").val(),
                        zielVon5: $("#zielVon5Knz").val(),
                        zielBis5: $("#zielBis5Knz").val(),
                        bezeichnung6: $("#bez_6_Knz").val(),
                        anwendungsbereich6: $("#anwendungsbereichKennzahldetails6Knz").val(),
                        status6: $("#status6Knz").prop("checked"),
                        einfuehrung6: $("#datumEinfuehrung6Knz").val(),
                        letzteUeberpruefung6: $("#datumLetzteUeberpruefung6Knz").val(),
                        deaktivierung6: $("#datumDeaktivierung6Knz").val(),
                        einheit6: $("#einheitKennzahldetail6Knz").val(),
                        formelID6: $("#formel6IDKnz").val(),
                        kennzahl6: $("#kennzahl6Knz").val(),
                        toleranzgrenzeOben6: $("#toleranzgrenzeOben6Knz").val(),
                        toleranzgrenzeUnten6: $("#toleranzgrenzeUnten6Knz").val(),
                        zielwert6: $("#zielwert6Knz").val(),
                        zielVon6: $("#zielVon6Knz").val(),
                        zielBis6: $("#zielBis6Knz").val(),
                        bezeichnung7: $("#bez_7_Knz").val(),
                        anwendungsbereich7: $("#anwendungsbereichKennzahldetails7Knz").val(),
                        status7: $("#status7Knz").prop("checked"),
                        einfuehrung7: $("#datumEinfuehrung7Knz").val(),
                        letzteUeberpruefung7: $("#datumLetzteUeberpruefung7Knz").val(),
                        deaktivierung7: $("#datumDeaktivierung7Knz").val(),
                        einheit7: $("#einheitKennzahldetail7Knz").val(),
                        formelID7: $("#formel7IDKnz").val(),
                        kennzahl7: $("#kennzahl7Knz").val(),
                        toleranzgrenzeOben7: $("#toleranzgrenzeOben7Knz").val(),
                        toleranzgrenzeUnten7: $("#toleranzgrenzeUnten7Knz").val(),
                        zielwert7: $("#zielwert7Knz").val(),
                        zielVon7: $("#zielVon7Knz").val(),
                        zielBis7: $("#zielBis7Knz").val(),
                        bezeichnung8: $("#bez_8_Knz").val(),
                        anwendungsbereich8: $("#anwendungsbereichKennzahldetails8Knz").val(),
                        status8: $("#status8Knz").prop("checked"),
                        einfuehrung8: $("#datumEinfuehrung8Knz").val(),
                        letzteUeberpruefung8: $("#datumLetzteUeberpruefung8Knz").val(),
                        deaktivierung8: $("#datumDeaktivierung8Knz").val(),
                        einheit8: $("#einheitKennzahldetail8Knz").val(),
                        formelID8: $("#formel8IDKnz").val(),
                        kennzahl8: $("#kennzahl8Knz").val(),
                        toleranzgrenzeOben8: $("#toleranzgrenzeOben8Knz").val(),
                        toleranzgrenzeUnten8: $("#toleranzgrenzeUnten8Knz").val(),
                        zielwert8: $("#zielwert8Knz").val(),
                        zielVon8: $("#zielVon8Knz").val(),
                        zielBis8: $("#zielBis8Knz").val(),
                        bezeichnung9: $("#bez_9_Knz").val(),
                        anwendungsbereich9: $("#anwendungsbereichKennzahldetails9Knz").val(),
                        status9: $("#status9Knz").prop("checked"),
                        einfuehrung9: $("#datumEinfuehrung9Knz").val(),
                        letzteUeberpruefung9: $("#datumLetzteUeberpruefung9Knz").val(),
                        deaktivierung9: $("#datumDeaktivierung9Knz").val(),
                        einheit9: $("#einheitKennzahldetail9Knz").val(),
                        formelID9: $("#formel9IDKnz").val(),
                        kennzahl9: $("#kennzahl9Knz").val(),
                        toleranzgrenzeOben9: $("#toleranzgrenzeOben9Knz").val(),
                        toleranzgrenzeUnten9: $("#toleranzgrenzeUnten9Knz").val(),
                        zielwert9: $("#zielwert9Knz").val(),
                        zielVon9: $("#zielVon9Knz").val(),
                        zielBis9: $("#zielBis9Knz").val(),
                        bezeichnung10: $("#bez_10_Knz").val(),
                        anwendungsbereich10: $("#anwendungsbereichKennzahldetails10Knz").val(),
                        status10: $("#status10Knz").prop("checked"),
                        einfuehrung10: $("#datumEinfuehrung10Knz").val(),
                        letzteUeberpruefung10: $("#datumLetzteUeberpruefung10Knz").val(),
                        deaktivierung10: $("#datumDeaktivierung10Knz").val(),
                        einheit10: $("#einheitKennzahldetail10Knz").val(),
                        formelID10: $("#formel10IDKnz").val(),
                        kennzahl10: $("#kennzahl10Knz").val(),
                        toleranzgrenzeOben10: $("#toleranzgrenzeOben10Knz").val(),
                        toleranzgrenzeUnten10: $("#toleranzgrenzeUnten10Knz").val(),
                        zielwert10: $("#zielwert10Knz").val(),
                        zielVon10: $("#zielVon10Knz").val(),
                        zielBis10: $("#zielBis10Knz").val()
                    },
                    success: function(a) {
                        alert(datensatzGespeichert(a))
                    }
                })}
            else "zpSpeichern" == a && $.ajax({
                type: "POST",
                async: !0,
                url: "php/instanzIntoDb.php",
                data: {
                    id: "zp",
                    modus: "save",
                    nameDB: $("#nameDB").val(),
                    liegID: $("#liegID").val(),
                    zpID: $("#zpID").val(),
                    energietraeger: $("#energietraegerZp").val(),
                    messstelle: $("#mstZp").val(),
                    nr: $("#zaehlpunktNrZp").val(),
                    messsystem: $("#messsystemZp").val(),
                    messgenauigkeit: $("#messgenauZp").val()
                },
                success: function(a) {
                    alert(datensatzGespeichert(a))
                }
            })
        }, instanzErstellen = function(a, b) {
            if ("gipscAdmSpeichern" == a) $.ajax({
                type: "POST",
                async: !0,
                url: "php/instanzIntoDb.php",
                data: {
                    modus: "new",
                    id: "gipscAdm",
                    nameDB: "gipscomm",
                    benutzername: $("#benutzernameGipscAdm").val(),
                    passwort: getHash($("#passwortGipscAdm").val())
                },
                success: function(a) {
                    alert(datensatzGespeichert(a));
                    readInstanzen("gipscAdmLast",
                        $("#gipscAdmCount").val())
                } }), betrGrpNavID = $("#betrGrpCount").val(), betrGrpEinlesen();
            else if ("betrGrpSpeichern" == a) $.ajax({
                type: "POST",
                async: !0,
                url: "php/instanzIntoDb.php",
                data: {
                    modus: "new",
                    id: "betrGrp",
                    nameDB: "gipscomm",
                    firma: $("#firmaBetrGrp").val(),
                    anzahlMitarbeiter: $("#anzahlMitarbeiterBetrGrp").val(),
                    anschrift: $("#anschriftBetrGrp").val(),
                    plz: $("#plzBetrGrp").val(),
                    ort: $("#ortBetrGrp").val(),
                    geschaeftsfuehrer: $("#geschaeftsfuehrerBetrGrp").val(),
                    telefon: $("#telefonBetrGrp").val(),
                    eMail: $("#emailBetrGrp").val(),
                    notiz: $("#notizBetrGrp").val()
                },
                success: function(a) {
                    alert(datensatzGespeichert(a));
                    readInstanzen("betrGrpLast", $("#betrGrpCount").val())
                    betrGrpEinlesen()
                } }), betrGrpNavID = $("#betrGrpCount").val();
            else if ("sAdmSpeichern" == a) {
            // var adminArr = new Array();
            //     $('span.item').each(function(){
            //         var $span = $(this).attr('check-value');
            //         if($span == 1) {
            //             var spanTxt = $(this).attr('data-id');
            //             adminArr.push(spanTxt);
            //         }
            //     });
            $.ajax({
                type: "POST",
                async: !0,
                url: "php/instanzIntoDb.php",
                data: {
                    id: "sAdm",
                    nameDB: "gipscomm",
                    modus: "new",
                    betrGrpID: $("#betrGrpID").val(),
                    titel: $("#titelSAdm").val(),
                    name: $("#nameSAdm").val(),
                    vorname: $("#vornameSAdm").val(),
                    eMail: $("#emailSAdm").val(),
                    telefon: $("#telefonSAdm").val(),
                    fax: $("#faxSAdm").val(),
                    mobiltelefon: $("#mobiltelefonSAdm").val(),
                    benutzername: $("#benutzernameSAdm").val(),
                    passwort: getHash($("#passwortSAdm").val()),
                    //mandantenIDs: adminArr.toString(),
                },
                success: function(a) {
                    sAdmRollenUndBerechtigungen();
                    alert(datensatzGespeichert(a));
                    readInstanzen("sAdmLast", $("#sAdmCount").val())
                } }), sAdmNavID = $("#sAdmCount").val();
            }
            else if ("manGrpSpeichern" == a) {
                var e = [];
                for (i = 0; i < $("#tblMandantengruppe tbody tr").length; i++) e[i] = tblMandantengruppe.cell(i, 0).data();
                e = e.join(",");
                $.ajax({
                    type: "POST",
                    async: !0,
                    url: "php/instanzIntoDb.php",
                    data: {
                        id: "manGrp",
                        nameDB: "gipscomm",
                        modus: "new",
                        betrGrpID: $("#betrGrpID").val(),
                        name: $("#nameManGrp").val(),
                        kurz: $("#kurzManGrp").val(),
                        notiz: $("#notizManGrp").val(),
                        mandatenIDs: e
                    },
                    success: function(a) {
                        alert(datensatzGespeichert(a));
                        readInstanzen("manGrpLast", $("#manGrpCount").val())
                        manGrpEinlesen()
                    }
                });
                manGrpNavID = $("#manGrpCount").val(); }
            else if ("admSpeichern" == a) {
                var c;
                "optMan" == $("#manOderManGrp").val() ? (e = "man_ID", c = $("#manRechteID").val()) : (e = "manGrp_ID", c = $("#manGrpID").val());
                $.ajax({
                    type: "POST",
                    async: !0,
                    url: "php/instanzIntoDb.php",
                    data: {
                        id: "adm",
                        nameDB: "gipscomm",
                        modus: "new",
                        ins: e,
                        insID: c,
                        titel: $("#titelAdm").val(),
                        name: $("#nameAdm").val(),
                        vorname: $("#vornameAdm").val(),
                        eMail: $("#emailAdm").val(),
                        telefon: $("#telefonAdm").val(),
                        fax: $("#faxAdm").val(),
                        mobiltelefon: $("#mobiltelefonAdm").val(),
                        benutzername: $("#benutzernameAdm").val(),
                        passwort: getHash($("#passwortAdm").val())
                    },
                    success: function(a) {
                        adminsRollenUndBerechtigungen()
                        alert(datensatzGespeichert(a));
                        readInstanzen("admLast", $("#admCount").val())
                    }
                });
                admNavID = $("#admCount").val() }
            else if ("benSpeichern" == a) "optMan" == $("#manOderManGrp").val() ? (e = "man_ID", c = $("#manRechteID").val()) : (e = "manGrp_ID", c = $("#manGrpID").val()), $.ajax({
                type: "POST",
                async: !0,
                url: "php/instanzIntoDb.php",
                data: {
                    id: "ben",
                    nameDB: "gipscomm",
                    modus: "new",
                    ins: e,
                    insID: c,
                    titel: $("#titelBen").val(),
                    name: $("#nameBen").val(),
                    vorname: $("#vornameBen").val(),
                    eMail: $("#emailBen").val(),
                    telefon: $("#telefonBen").val(),
                    fax: $("#faxBen").val(),
                    mobiltelefon: $("#mobiltelefonBen").val(),
                    benutzername: $("#benutzernameBen").val(),
                    passwort: getHash($("#passwortBen").val())
                },
                success: function(a) {
                    benutzerRollenUndBerechtigungen();
                    alert(datensatzGespeichert(a));
                    readInstanzen("benLast", $("#benCount").val())
                } }), benNavID = $("#benCount").val();
            else if ("manSpeichern" == a) $.ajax({
                type: "POST",
                async: !0,
                url: "../php/mandantIntoDb.php",
                data: {
                    modus: "new",
                    manID: $("#manID").val(),
                    name: $("#nameAllgemeinMan").val(),
                    dbKurz: $("#dbKurz").val(),
                    holdingstruktur: $("#holdingstrukturAllgemeinMan").is(":checked"),
                    liegenschaften: $("#liegenschaftenAllgemeinMan").is(":checked"),
                    notiz: $("#notizMan").text()
                },
                success: function(a) {
                    alert(datensatzGespeichert(a));
                    readInstanzen("manLast", $("#manCount").val())
                } }), manNavID = $("#manCount").val();
            else if ("orgSpeichern" == a) $.ajax({
                    type: "POST",
                    async: !0,
                    url: "php/instanzIntoDb.php",
                    data: {
                        id: "org",
                        modus: "new",
                        nameDB: $("#nameDB").val(),
                        nameAllgemein: $("#nameAllgemeinOrg").val(),
                        gesellschaftsform: $("#gesellschaftsformAllgemeinOrg").val(),
                        firmenanschrift: $("#firmenanschriftAllgemeinOrg").val(),
                        land: $("#landAllgemeinOrg").val(),
                        plz: $("#plzAllgemeinOrg").val(),
                        ort: $("#ortAllgemeinOrg").val(),
                        hrbNummer: $("#hrbnummerAllgemeinOrg").val(),
                        titelGeschaeftsfuehrung: $("#titelGeschaeftsfuehrungOrg").val(),
                        nameGeschaeftsfuehrung: $("#nameGeschaeftsfuehrungOrg").val(),
                        vornameGeschaeftsfuehrung: $("#vornameGeschaeftsfuehrungOrg").val(),
                        eMailGeschaeftsfuehrung: $("#emailGeschaeftsfuehrungOrg").val(),
                        telefonGeschaeftsfuehrung: $("#telefonGeschaeftsfuehrungOrg").val(),
                        faxGeschaeftsfuehrung: $("#faxGeschaeftsfuehrungOrg").val(),
                        mobiltelefonGeschaeftsfuehrung: $("#mobiltelefonGeschaeftsfuehrungOrg").val(),
                        titelEnergiemanagement: $("#titelEnergiemanagementOrg").val(),
                        nameEnergiemanagement: $("#nameEnergiemanagementOrg").val(),
                        vornameEnergiemanagement: $("#vornameEnergiemanagementOrg").val(),
                        eMailEnergiemanagement: $("#emailEnergiemanagementOrg").val(),
                        telefonEnergiemanagement: $("#telefonEnergiemanagementOrg").val(),
                        faxEnergiemanagement: $("#faxEnergiemanagementOrg").val(),
                        mobiltelefonEnergiemanagement: $("#mobiltelefonEnergiemanagementOrg").val()
                    },
                    success: function(a) {
                        alert(datensatzGespeichert(a));
                        organisationenEinlesen();
                        readInstanzen("orgLast", $("#orgCount").val())
                    }
                }), orgNavID = $("#orgCount").val();
            else if ("liegSpeichern" == a) $.ajax({
                type: "POST",
                async: !0,
                url: "php/instanzIntoDb.php",
                data: {
                    id: "lieg",
                    modus: "new",
                    orgID: $("#orgID").val(),
                    nameDB: $("#nameDB").val(),
                    nameAllgemein: $("#nameAllgemeinLieg").val(),
                    kuerzel: $("#kuerzelAllgemeinLieg").val(),
                    eigenstaendigeForm: $("#eigenstaendigeformAllgemeinLieg").is(":checked"),
                    aktiv: $("#aktivAllgemeinLieg").is(":checked"),
                    gesellschaftsform: $("#gesellschaftsformAllgemeinLieg").val(),
                    anschrift: $("#anschriftAllgemeinLieg").val(),
                    land: $("#landAllgemeinLieg").val(),
                    plz: $("#plzAllgemeinLieg").val(),
                    ort: $("#ortAllgemeinLieg").val(),
                    typ: $("#typAllgemeinLieg").val(),
                    hatDl: $("#hatDlAllgemeinLieg").prop("checked"),
                    titelAnsprechpartner: $("#titelAnsprechpartnerLieg").val(),
                    nameAnsprechpartner: $("#nameAnsprechpartnerLieg").val(),
                    vornameAnsprechpartner: $("#vornameAnsprechpartnerLieg").val(),
                    eMailAnsprechpartner: $("#emailAnsprechpartnerLieg").val(),
                    telefonAnsprechpartner: $("#telefonAnsprechpartnerLieg").val(),
                    faxAnsprechpartner: $("#faxAnsprechpartnerLieg").val(),
                    mobiltelefonAnsprechpartner: $("#mobiltelefonAnsprechpartnerLieg").val(),
                    titelEnergiebeauftragter: $("#titelEnergiebeauftragterLieg").val(),
                    nameEnergiebeauftragter: $("#nameEnergiebeauftragterLieg").val(),
                    vornameEnergiebeauftragter: $("#vornameEnergiebeauftragterLieg").val(),
                    eMailEnergiebeauftragter: $("#emailEnergiebeauftragterLieg").val(),
                    telefonEnergiebeauftragter: $("#telefonEnergiebeauftragterLieg").val(),
                    faxEnergiebeauftragter: $("#faxEnergiebeauftragterLieg").val(),
                    mobiltelefonEnergiebeauftragter: $("#mobiltelefonEnergiebeauftragterLieg").val(),
                    energietraeger1: $("#inputEnergietraeger1Lieg").val(),
                    energietraeger2: $("#inputEnergietraeger2Lieg").val(),
                    energietraeger3: $("#inputEnergietraeger3Lieg").val(),
                    energietraeger4: $("#inputEnergietraeger4Lieg").val(),
                    energietraeger5: $("#inputEnergietraeger5Lieg").val(),
                    energietraeger6: $("#inputEnergietraeger6Lieg").val(),
                    energietraeger7: $("#inputEnergietraeger7Lieg").val(),
                    energietraeger8: $("#inputEnergietraeger8Lieg").val(),
                    energietraeger9: $("#inputEnergietraeger9Lieg").val(),
                    energieform1: $("#energieform1Lieg").val(),
                    energieform2: $("#energieform2Lieg").val(),
                    energieform3: $("#energieform3Lieg").val(),
                    energieform4: $("#energieform4Lieg").val(),
                    energieform5: $("#energieform5Lieg").val(),
                    energieform6: $("#energieform6Lieg").val(),
                    energieform7: $("#energieform7Lieg").val(),
                    managementsystem1: $("#managementsystem1Lieg").val(),
                    erstzertifizierung1: $("#erstzertifizierung1Lieg").val(),
                    managementsystem2: $("#managementsystem2Lieg").val(),
                    erstzertifizierung2: $("#erstzertifizierung2Lieg").val(),
                    managementsystem3: $("#managementsystem3Lieg").val(),
                    erstzertifizierung3: $("#erstzertifizierung3Lieg").val()
                },
                success: function(a) {
                    alert(datensatzGespeichert(a));
                    liegenschaftenEinlesen();
                    readInstanzen("liegLast", $("#liegCount").val())
                } }), liegNavID = $("#liegCount").val();
            else if ("extDlSpeichern" == a) $.ajax({
                type: "POST",
                async: !0,
                url: "php/instanzIntoDb.php",
                data: {
                    id: "extDl",
                    modus: "new",
                    liegID: $("#liegID").val(),
                    nameDB: $("#nameDB").val(),
                    nameAllgemein: $("#nameExtDl").val(),
                    aktiv: $("#aktivExtDl").is(":checked"),
                    gesellschaftsform: $("#gesellschaftsformExtDl").val(),
                    anschrift: $("#anschriftExtDl").val(),
                    land: $("#landExtDl").val(),
                    plz: $("#plzExtDl").val(),
                    ort: $("#ortExtDl").val(),
                    typ: $("#typExtDl").val(),
                    standortdatenDritte: $("#stdExtDl").is(":checked"),
                    titelAnsprechpartner: $("#titelAnsprechpartnerExtDl").val(),
                    nameAnsprechpartner: $("#nameAnsprechpartnerExtDl").val(),
                    vornameAnsprechpartner: $("#vornameAnsprechpartnerExtDl").val(),
                    eMailAnsprechpartner: $("#emailAnsprechpartnerExtDl").val(),
                    telefonAnsprechpartner: $("#telefonAnsprechpartnerExtDl").val(),
                    faxAnsprechpartner: $("#faxAnsprechpartnerExtDl").val(),
                    mobiltelefonAnsprechpartner: $("#mobiltelefonAnsprechpartnerExtDl").val(),
                    energietraeger1: $("#energietraeger1ExtDl").val(),
                    messstelle1Ent: $("#messstelle1ExtDl").val(),
                    standort1Ent: $("#standort1ExtDl").val(),
                    energietraeger2: $("#energietraeger2ExtDl").val(),
                    messstelle2Ent: $("#messstelle2ExtDl").val(),
                    standort2Ent: $("#standort2ExtDl").val(),
                    energietraeger3: $("#energietraeger3ExtDl").val(),
                    messstelle3Ent: $("#messstelle3ExtDl").val(),
                    standort3Ent: $("#standort3ExtDl").val(),
                    energietraeger4: $("#energietraeger4ExtDl").val(),
                    messstelle4Ent: $("#messstelle4ExtDl").val(),
                    standort4Ent: $("#standort4ExtDl").val(),
                    energietraeger5: $("#energietraeger5ExtDl").val(),
                    messstelle5Ent: $("#messstelle5ExtDl").val(),
                    standort5Ent: $("#standort5ExtDl").val(),
                    energietraeger6: $("#energietraeger6ExtDl").val(),
                    messstelle6Ent: $("#messstelle6ExtDl").val(),
                    standort6Ent: $("#standort6ExtDl").val(),
                    energieRes1: $("#energieRes1ExtDl").val(),
                    messstelle1EnfRes: $("#messstelleEngRes1ExtDl").val(),
                    standort1EnfRes: $("#standort1EngResExtDl").val(),
                    energieRes2: $("#energieRes2ExtDl").val(),
                    messstelle2EnfRes: $("#messstelleEngRes2ExtDl").val(),
                    standort2EnfRes: $("#standort2EngResExtDl").val(),
                    energieRes3: $("#energieRes3ExtDl").val(),
                    messstelle3EnfRes: $("#messstelleEngRes3ExtDl").val(),
                    standort3EnfRes: $("#standort3EngResExtDl").val(),
                    energieRes4: $("#energieRes4ExtDl").val(),
                    messstelle4EnfRes: $("#messstelleEngRes4ExtDl").val(),
                    standort4EnfRes: $("#standort4EngResExtDl").val(),
                    energieRes5: $("#energieRes5ExtDl").val(),
                    messstelle5EnfRes: $("#messstelleEngRes5ExtDl").val(),
                    standort5EnfRes: $("#standort5EngResExtDl").val(),
                    energieRes6: $("#energieRes6ExtDl").val(),
                    messstelle6EnfRes: $("#messstelleEngRes6ExtDl").val(),
                    standort6EnfRes: $("#standort6EngResExtDl").val()
                },
                success: function(a) {
                    alert(datensatzGespeichert(a));
                    readInstanzen("extDlLast", $("#extDlCount").val())
                } }), extDlNavID = $("#extDlCount").val();
            else if ("berSpeichern" == a) $.ajax({
                type: "POST",
                async: !0,
                url: "php/instanzIntoDb.php",
                data: {
                    id: "ber",
                    modus: "new",
                    liegID: $("#liegID").val(),
                    nameDB: $("#nameDB").val(),
                    nameAllgemein: $("#nameAllgemeinBer").val(),
                    kurzbezeichnung: $("#kurzbezeichnungAllgemeinBer").val(),
                    kostenstelle: $("#KostenstelleAllgemeinBer").val(),
                    ort: $("#ortBer").val(),
                    ausgewaehltesLevel: $("#levelAuswahlAllgemeinBer").val(),
                    vorgelagerterBereich1: $("#vorgelagerteBereiche1AllgemeinBer").val(),
                    vorgelagerterBereich2: $("#vorgelagerteBereiche2AllgemeinBer").val(),
                    notiz: $("#notizAllgemeinBer").val()
                },
                success: function(a) {
                    alert(datensatzGespeichert(a));
                    bereicheEinlesen()
                    readInstanzen("berLast", $("#berCount").val())
                } }), berNavID = $("#berCount").val();
            else if ("mstESpeichern" == a) {
                data =
                    { id: "mstE"
                    , modus: "new"
                    , berID: $("#berID").val()
                    , nameDB: $("#nameDB").val()
                    , messstellenbezeichnung: $("#nameMstE").val()
                    , kurzbezeichnung: $("#kurzbezeichnungMstE").val()
                    , kostenstelle: $("#kostenstelleMstE").val()
                    , aktiv: $("#aktivMstE").is(":checked")
                    , isDurchleitung: $("#istDlMstE").is(":checked")
                    , extDlID: $("#dlAnMstIDE").val()
                    , energietraeger: $("#energietraegerMstE").val()
                    , energieform: $("#energieformMstE").val()
                    , beschreibung: ""
                    , ort: $("#ortMstE").val()
                    , messart: $("#messartMstE").val()
                    , vorgelMstID: $("#vorgelagerteMstIDE").val()
                    , messmittelBerechnungslogik: messmittelOrBerechnungslogik("E")
                    , msmID: $("#messmittelIDMstE").val()
                    , anlID: $("#anlIDMstE").val()
                    , notiz: $("#notizAllgemeinMstE").val()
                    }

                ajaxPost("php/instanzIntoDb.php")(data)
                .then(result => {
                    alert(datensatzGespeichert(result))
                    readInstanzen("mstELast", $("#mstECount").val())
                })

                mstENavID = $("#mstECount").val()
            }
            else if ("mstBSpeichern" == a) {
                data =
                    { id: "mstB"
                    , modus: "new"
                    , berID: $("#berID").val()
                    , nameDB: $("#nameDB").val()
                    , messstellenbezeichnung: $("#nameMstB").val()
                    , kurzbezeichnung: $("#kurzbezeichnungMstB").val()
                    , kostenstelle: $("#kostenstelleMstB").val()
                    , aktiv: $("#aktivMstB").is(":checked")
                    , isDurchleitung: $("#istDlMstB").is(":checked")
                    , extDlID: $("#dlAnMstIDB").val()
                    , energietraeger: ""
                    , energieform: ""
                    , beschreibung: $("#beschreibungMstB").val()
                    , ort: $("#ortMstB").val()
                    , messart: $("#messartMstB").val()
                    , vorgelMstID: $("#vorgelagerteMstIDB").val()
                    , messmittelBerechnungslogik: messmittelOrBerechnungslogik("B")
                    , msmID: $("#messmittelIDMstB").val()
                    , anlID: $("#anlIDMstB").val()
                    , notiz: $("#notizAllgemeinMstB").val()
                    }

                ajaxPost("php/instanzIntoDb.php")(data)
                .then(result => {
                    alert(datensatzGespeichert(result))
                    readInstanzen("mstBLast", $("#mstBCount").val())
                })

                mstBNavID = $("#mstBCount").val()
            }
            else if ("stdSpeichern" == a) $.ajax({
                type: "POST",
                async: !0,
                url: "php/instanzIntoDb.php",
                data: {
                    id: "std",
                    modus: "new",
                    liegID: $("#liegID").val(),
                    nameDB: $("#nameDB").val(),
                    ort: $("#nameAllgemeinStd").val(),
                    kuerzel: $("#kurzbezeichnungAllgemeinStd").val(),
                    flaeche: $("#flaecheAllgemeinStd").val(),
                    customLabel1: $("#custom1LabelStd").text(),
                    customInput1: $("#custom1EingabeStd").val(),
                    customLabel2: $("#custom2LabelStd").text(),
                    customInput2: $("#custom2EingabeStd").val(),
                    customLabel3: $("#custom3LabelStd").text(),
                    customInput3: $("#custom3EingabeStd").val(),
                    customLabel4: $("#custom4LabelStd").text(),
                    customInput4: $("#custom4EingabeStd").val(),
                    customLabel5: $("#custom5LabelStd").text(),
                    customInput5: $("#custom5EingabeStd").val(),
                    customLabel6: $("#custom6LabelStd").text(),
                    customInput6: $("#custom6EingabeStd").val(),
                    notiz: $("#notizAllgemeinStd").val()
                },
                success: function(a) {
                    alert(datensatzGespeichert(a));
                    readInstanzen("stdLast", $("#stdCount").val())
                } }), stdNavID = $("#stdCount").val();
            else if ("stdDrSpeichern" == a) $.ajax({
                type: "POST",
                async: !0,
                url: "php/instanzIntoDb.php",
                data: {
                    id: "stdDr",
                    modus: "new",
                    liegID: $("#liegID").val(),
                    nameDB: $("#nameDB").val(),
                    ort: $("#nameAllgemeinStdDr").val(),
                    kuerzel: $("#kurzbezeichnungAllgemeinStdDr").val(),
                    flaeche: $("#flaecheAllgemeinStdDr").val(),
                    customLabel1: $("#custom1LabelStdDr").text(),
                    customInput1: $("#custom1EingabeStdDr").val(),
                    customLabel2: $("#custom2LabelStdDr").text(),
                    customInput2: $("#custom2EingabeStdDr").val(),
                    customLabel3: $("#custom3LabelStdDr").text(),
                    customInput3: $("#custom3EingabeStdDr").val(),
                    customLabel4: $("#custom4LabelStdDr").text(),
                    customInput4: $("#custom4EingabeStdDr").val(),
                    customLabel5: $("#custom5LabelStdDr").text(),
                    customInput5: $("#custom5EingabeStdDr").val(),
                    customLabel6: $("#custom6LabelStdDr").text(),
                    customInput6: $("#custom6EingabeStdDr").val(),
                    notiz: $("#notizAllgemeinStdDr").val()
                },
                success: function(a) {
                    alert(datensatzGespeichert(a));
                    readInstanzen("stdDrLast", $("#stdDrCount").val())
                } }), stdDrNavID = $("#stdDrCount").val();
            else if ("anlSpeichern" == a) e = $("#bildAllgemeinAnl").prop("src"), e = e.split($("#nameDB").val()), $.ajax({
                    type: "POST",
                    async: !0,
                    url: "php/instanzIntoDb.php",
                    data: {
                        id: "anl",
                        modus: "new",
                        liegID: $("#liegID").val(),
                        nameDB: $("#nameDB").val(),
                        anlagenbild: "uploadsDownloads/images/" + $("#nameDB").val() + e[1],
                        anlagennummer: $("#anlagennummerAllgemeinAnl").val(),
                        bezeichnung: $("#bezeichnungAllgemeinAnl").val(),
                        aktiv: $("#aktivAllgemeinAnl").is(":checked"),
                        typ: $("#typAllgemeinAnl").val(),
                        seriennummer: $("#serienNrAllgemeinAnl").val(),
                        standort: $("#standortAllgemeinAnl").val(),
                        baujahr: $("#baujahrAnl").val(),
                        anschaffungsdatum: $("#datumAnschaffungAllgemeinAnl").val(),
                        jahresbetriebsstunden: $("#betriebsstundenAllgemeinAnl").val(),
                        notizAllgemein: $("#notizAllgemeinAnl").val(),
                        produkt: $("#produktAllgemeinAnl").val(),
                        produktionsmenge: $("#produktionsmenge1AllgemeinAnl").val(),
                        produktionsmengeEinheit: $("#einheitProduktionsmenge1AllgemeinAnl").val(),
                        produktnummer: $("#produktnummer1AllgemeinAnl").val(),
                        mehrProdukte: $("#mehrProdukteAllgemeinAnl").is(":checked"),
                        zugeordneterVerbraucherID1: $("#zugeordneterVerbraucherID1AllgemeinAnl").val(),
                        zugeordneterVerbraucherID2: $("#zugeordneterVerbraucherID2AllgemeinAnl").val(),
                        zugeordneterVerbraucherID3: $("#zugeordneterVerbraucherID3AllgemeinAnl").val(),
                        zugeordneterVerbraucherID4: $("#zugeordneterVerbraucherID4AllgemeinAnl").val(),
                        zugeordneterVerbraucherID5: $("#zugeordneterVerbraucherID5AllgemeinAnl").val(),
                        zugeordneterVerbraucherID6: $("#zugeordneterVerbraucherID6AllgemeinAnl").val(),
                        energietraeger1: $("#energietraeger1AllgemeinAnl").val(),
                        energieform1: $("#energieform1AllgemeinAnl").val(),
                        einheit1: $("#einheit1Anl").val(),
                        anschlussleistung1: formatNumber("deform", $("#anschlussleistung1Anl").val()),
                        mittlereAuslastungProzent1: formatNumber("deform", $("#mittlereAuslastungProzent1Anl").val()),
                        mittlereAuslastungKw1: formatNumber("deform", $("#mittlereAuslastungKw1Anl").val()),
                        betriebstemperatur1: formatNumber("deform", $("#betriebstemperatur1Anl").val()),
                        messstelle1: $("#mst1Anl").val(),
                        messstelle1ID: $("#mst1IDAnl").val(),
                        versBereich1: $("#ber1Anl").val(),
                        abwaerme1: formatNumber("deform", $("#abwaerme1Anl").val()),
                        abwaermeNutzbarkeit1: $("#nutzbarkeitAbwaerme1Anl").val(),
                        bewertungAbwaermeNutzbarkeit1: $("#bewertungNutzbarkeitAbwaerme1Anl").val(),
                        energietraeger2: $("#energietraeger2AllgemeinAnl").val(),
                        energieform2: $("#energieform2AllgemeinAnl").val(),
                        einheit2: $("#einheit2Anl").val(),
                        anschlussleistung2: formatNumber("deform", $("#anschlussleistung2Anl").val()),
                        mittlereAuslastungProzent2: formatNumber("deform", $("#mittlereAuslastungProzent2Anl").val()),
                        mittlereAuslastungKw2: formatNumber("deform", $("#mittlereAuslastungKw2Anl").val()),
                        betriebstemperatur2: formatNumber("deform", $("#betriebstemperatur2Anl").val()),
                        messstelle2: $("#mst2Anl").val(),
                        messstelle2ID: $("#mst2IDAnl").val(),
                        versBereich2: $("#ber2Anl").val(),
                        abwaerme2: formatNumber("deform", $("#abwaerme2Anl").val()),
                        abwaermeNutzbarkeit2: $("#nutzbarkeitAbwaerme2Anl").val(),
                        bewertungAbwaermeNutzbarkeit2: $("#bewertungNutzbarkeitAbwaerme2Anl").val(),
                        energietraeger3: $("#energietraeger3AllgemeinAnl").val(),
                        energieform3: $("#energieform3AllgemeinAnl").val(),
                        einheit3: $("#einheit3Anl").val(),
                        anschlussleistung3: formatNumber("deform", $("#anschlussleistung3Anl").val()),
                        mittlereAuslastungProzent3: formatNumber("deform", $("#mittlereAuslastungProzent3Anl").val()),
                        mittlereAuslastungKw3: formatNumber("deform", $("#mittlereAuslastungKw3Anl").val()),
                        betriebstemperatur3: formatNumber("deform", $("#betriebstemperatur3Anl").val()),
                        messstelle3: $("#mst3Anl").val(),
                        messstelle3ID: $("#mst3IDAnl").val(),
                        versBereich3: $("#ber3Anl").val(),
                        abwaerme3: formatNumber("deform", $("#abwaerme3Anl").val()),
                        abwaermeNutzbarkeit3: $("#nutzbarkeitAbwaerme3Anl").val(),
                        bewertungAbwaermeNutzbarkeit3: $("#bewertungNutzbarkeitAbwaerme3Anl").val(),
                        energietraeger4: $("#energietraeger4AllgemeinAnl").val(),
                        energieform4: $("#energieform4AllgemeinAnl").val(),
                        einheit4: $("#einheit4Anl").val(),
                        anschlussleistung4: formatNumber("deform", $("#anschlussleistung4Anl").val()),
                        mittlereAuslastungProzent4: formatNumber("deform", $("#mittlereAuslastungProzent4Anl").val()),
                        mittlereAuslastungKw4: formatNumber("deform", $("#mittlereAuslastungKw4Anl").val()),
                        betriebstemperatur4: formatNumber("deform", $("#betriebstemperatur4Anl").val()),
                        messstelle4: $("#mst4Anl").val(),
                        messstelle4ID: $("#mst4IDAnl").val(),
                        versBereich4: $("#ber4Anl").val(),
                        abwaerme4: formatNumber("deform", $("#abwaerme4Anl").val()),
                        abwaermeNutzbarkeit4: $("#nutzbarkeitAbwaerme4Anl").val(),
                        bewertungAbwaermeNutzbarkeit4: $("#bewertungNutzbarkeitAbwaerme4Anl").val(),
                        custom1: $("#custom1Anl").val(),
                        custom2: $("#custom2Anl").val(),
                        custom3: $("#custom3Anl").val(),
                        custom4: $("#custom4Anl").val(),
                        custom5: $("#custom5Anl").val(),
                        custom6: $("#custom6Anl").val()
                    },
                    success: function(a) {
                        alert(datensatzGespeichert(a));
                        readInstanzen("anlLast", $("#anlCount").val())
                    } }), anlNavID = $("#anlCount").val();
            else if ("msmSpeichern" == a) e = $("#bildAllgemeinMsm").prop("src"), e = e.split($("#nameDB").val()), $.ajax({
                type: "POST",
                async: !0,
                url: "php/instanzIntoDb.php",
                data: {
                    id: "msm",
                    modus: "new",
                    nameDB: $("#nameDB").val(),
                    liegID: $("#liegID").val(),
                    nr: $("#messmittelNrAllgemeinMsm").val(),
                    messmittelbild: "uploadsDownloads/images/" +
                        $("#nameDB").val() + e[1],
                    bezeichnung: $("#bezeichnungAllgemeinMsm").val(),
                    mstID: $("#messstelleIDAllgemeinMsm").val(),
                    anlID: $("#anlIDMsm").val(),
                    typ: $("#typAllgemeinMsm").val(),
                    nrTyp: $("#typNrAllgemeinMsm").val(),
                    datumInstallation: $("#installationsdatumAllgemeinMsm").val(),
                    energietraeger: $("#entMsm").val(),
                    einheit: $("#einheitAllgemeinMsm").val(),
                    multibox: $("#multiboxAllgemeinMsm").is(":checked"),
                    unit: $("#unitAllgemeinMsm").val(),
                    typUnit: $("#unitTypAllgemeinMsm").val(),
                    anzahlKanaele: $("#anzahlKanaeleAllgemeinMsm").val(),
                    messungsform: $("#messungsformAllgemeinMsm").val(),
                    kanal1: $("#kanal1AllgemeinMsm").val(),
                    kanal2: $("#kanal2AllgemeinMsm").val(),
                    kanal3: $("#kanal3AllgemeinMsm").val(),
                    notizAllgemein: $("#notizAllgemeinMsm").val(),
                    nameBeauftragter: $("#beauftragterPruefinformationenMsm").val(),
                    emailBeauftragter: $("#beauftragterEmailPruefinformationenMsm").val(),
                    pruefzyklus: $("#pruefzyklusPruefinformationenMsm").val(),
                    letztePruefung: $("#letztePruefungPruefinformationenMsm").val(),
                    naechstePruefung: $("#naechstePruefungPruefinformationenMsm").val(),
                    notizPruef: $("#notiz2AllgemeinMsm").val(),
                    messmethode: $("#messmethodeInformationenConfig").val(),
                    messzyklus: $("#messzyklusInformationenConfig").val(),
                    messtoleranz: formatNumber("deform", $("#messtoleranzInformationenConfig").val()),
                    notizAllgInfos: $("#notiz1InformationenConfig").val(),
                    verbrauchswertbildung: $("#verbrauchswertbildungConfig").val(),
                    wandlerfaktor: formatNumber("deform", $("#wandlungsfaktorTechnischeDetailsConfig").val()),
                    geraetetyp: $("#geraetetypTechnischeDetailsConfig").val(),
                    ipAddresse: $("#ipTechnischeDetailsConfig").val(),
                    subnetMaske: $("#subnetMaskTechnischeDetailsConfig").val(),
                    gateway: $("#gatewayTechnischeDetailsConfig").val(),
                    cgiPort: $("#cgiPortTechnischeDetailsConfig").val(),
                    modbusPort: $("#modbusPortTechnischeDetailsConfig").val(),
                    ftpPort: $("#ftpPortTechnischeDetailsConfig").val(),
                    notizTechnDetails: $("#notiz2InformationenConfig").val()
                },
                success: function(a) {
                    alert(datensatzGespeichert(a));
                    readInstanzen("msmLast", $("#msmCount").val())
                } }), msmNavID = $("#msmCount").val();
            else if ("prdSpeichern" == a) e = 0, e = "neueGrp" === b ? Number($("#prdCount").val()) + 1 : $("#gruppenIDPrd").val(), $.ajax({
                    type: "POST",
                    async: !0,
                    url: "php/instanzIntoDb.php",
                    data: {
                        id: "prd",
                        nameDB: $("#nameDB").val(),
                        modus: "new",
                        gruppenID: e,
                        orgID: $("#orgID").val(),
                        bezeichnung: $("#bezeichnungPrd").val(),
                        artikelnummer: $("#artklnrPrd").val().trim(),
                        custom1: $("#custom1Prd").val(),
                        custom2: $("#custom2Prd").val(),
                        custom3: $("#custom3Prd").val(),
                        custom4: $("#custom4Prd").val(),
                        custom5: $("#custom5Prd").val(),
                        custom6: $("#custom6Prd").val(),
                        anl01ID: $("#inpAnlage1IDPrd").val(),
                        anl02ID: $("#inpAnlage2IDPrd").val(),
                        anl03ID: $("#inpAnlage3IDPrd").val(),
                        anl04ID: $("#inpAnlage4IDPrd").val(),
                        anl05ID: $("#inpAnlage5IDPrd").val(),
                        anl06ID: $("#inpAnlage6IDPrd").val(),
                        anl07ID: $("#inpAnlage7IDPrd").val(),
                        anl08ID: $("#inpAnlage8IDPrd").val(),
                        anl09ID: $("#inpAnlage9IDPrd").val(),
                        anlType01: $("#messartMstInpAnlage1Prd").val(),
                        anlType02: $("#messartMstInpAnlage2Prd").val(),
                        anlType03: $("#messartMstInpAnlage3Prd").val(),
                        anlType04: $("#messartMstInpAnlage4Prd").val(),
                        anlType05: $("#messartMstInpAnlage5Prd").val(),
                        anlType06: $("#messartMstInpAnlage6Prd").val(),
                        anlType07: $("#messartMstInpAnlage7Prd").val(),
                        anlType08: $("#messartMstInpAnlage8Prd").val(),
                        anlType09: $("#messartMstInpAnlage9Prd").val()
                    },
                    success: function(a) {
                        alert(datensatzGespeichert(a));
                        readInstanzen("prdLast", $("#prdCount").val())
                    } }), prdNavID = $("#prdCount").val();
            else if ("entSpeichern" == a) energietrInDBoxLieg(), $.ajax({
                type: "POST",
                async: !0,
                url: "php/instanzIntoDb.php",
                data: {
                    id: "ent",
                    modus: "new",
                    nameDB: entDB,
                    entID: "",
                    liegID: $("#liegID").val(),
                    name: $("#nameEnt").val(),
                    kuerzel: $("#kuerzelEnt").val(),
                    allgemEnt: $("#allgemEntEnt").val(),
                    notiz: $("#notizEnt").val(),
                    versorgerEvu: $("#versorgerEvuEnt").val(),
                    versorgerUenb: $("#versorgerUenbEnt").val(),
                    versorgerMsb: $("#versorgerMsbEnt").val(),
                    einheit1: $("#einheit1Ent").val(),
                    einheit2: $("#einheit2Ent").val(),
                    einheit3: $("#einheit3Ent").val(),
                    einh1FaktorKwh: formatNumber("deform", $("#entEinh1FaktorKwh").val()),
                    einh2FaktorKwh: formatNumber("deform", $("#entEinh2FaktorKwh").val()),
                    einh3FaktorKwh: formatNumber("deform", $("#entEinh3FaktorKwh").val()),
                    einh1FaktorCO2: formatNumber("deform", $("#entEinh1FaktorCO2").val()),
                    einh2FaktorCO2: formatNumber("deform", $("#entEinh2FaktorCO2").val()),
                    einh3FaktorCO2: formatNumber("deform", $("#entEinh3FaktorCO2").val()),
                    lblEinh1FaktorX1: $("#lblEntEinh1FaktorX1").text(),
                    lblEinh2FaktorX1: $("#lblEntEinh2FaktorX1").text(),
                    lblEinh3FaktorX1: $("#lblEntEinh3FaktorX1").text(),
                    einh1FaktorX1: formatNumber("deform", $("#entEinh1FaktorX1").val()),
                    einh2FaktorX1: formatNumber("deform", $("#entEinh2FaktorX1").val()),
                    einh3FaktorX1: formatNumber("deform", $("#entEinh3FaktorX1").val()),
                    lblEinh1FaktorX2: $("#lblEntEinh1FaktorX2").text(),
                    lblEinh2FaktorX2: $("#lblEntEinh2FaktorX2").text(),
                    lblEinh3FaktorX2: $("#lblEntEinh3FaktorX2").text(),
                    einh1FaktorX2: formatNumber("deform", $("#entEinh1FaktorX2").val()),
                    einh2FaktorX2: formatNumber("deform", $("#entEinh2FaktorX2").val()),
                    einh3FaktorX2: formatNumber("deform", $("#entEinh3FaktorX2").val()),
                    lblEinh1FaktorX3: $("#lblEntEinh1FaktorX3").text(),
                    lblEinh2FaktorX3: $("#lblEntEinh2FaktorX3").text(),
                    lblEinh3FaktorX3: $("#lblEntEinh3FaktorX3").text(),
                    einh1FaktorX3: formatNumber("deform", $("#entEinh1FaktorX3").val()),
                    einh2FaktorX3: formatNumber("deform", $("#entEinh2FaktorX3").val()),
                    einh3FaktorX3: formatNumber("deform", $("#entEinh3FaktorX3").val()),
                    gueltigVom: $("#gueltigVomEnt").val(),
                    gueltigBis: $("#gueltigBisEnt").val()
                },
                success: function(a) {
                    alert(datensatzGespeichert(a));
                    readInstanzen("entFirst", 0)
                } }), entNavID = $("#entCount").val();
            else if ("enfSpeichern" == a) energietrInDBoxLieg(), $.ajax({
                type: "POST",
                async: !0,
                url: "php/instanzIntoDb.php",
                data: {
                    id: "enf",
                    modus: "new",
                    nameDB: entDB,
                    liegID: $("#liegID").val(),
                    name: $("#nameEnf").val(),
                    kuerzel: $("#kuerzelEnf").val(),
                    notiz: $("#notizEnf").val(),
                    aktiv: $("#aktivEnf").is(":checked"),
                    einheit1: $("#einheit1Enf").val(),
                    einheit2: $("#einheit2Enf").val(),
                    einheit3: $("#einheit3Enf").val(),
                    einh1FaktorKwh: formatNumber("deform", $("#enfEinh1FaktorKwh").val()),
                    einh2FaktorKwh: formatNumber("deform", $("#enfEinh2FaktorKwh").val()),
                    einh3FaktorKwh: formatNumber("deform", $("#enfEinh3FaktorKwh").val()),
                    einh1FaktorCO2: formatNumber("deform", $("#enfEinh1FaktorCO2").val()),
                    einh2FaktorCO2: formatNumber("deform", $("#enfEinh2FaktorCO2").val()),
                    einh3FaktorCO2: formatNumber("deform", $("#enfEinh3FaktorCO2").val()),
                    lblEinh1FaktorX1: $("#lblEnfEinh1FaktorX1").text(),
                    lblEinh2FaktorX1: $("#lblEnfEinh2FaktorX1").text(),
                    lblEinh3FaktorX1: $("#lblEnfEinh3FaktorX1").text(),
                    einh1FaktorX1: formatNumber("deform", $("#enfEinh1FaktorX1").val()),
                    einh2FaktorX1: formatNumber("deform", $("#enfEinh2FaktorX1").val()),
                    einh3FaktorX1: formatNumber("deform", $("#enfEinh3FaktorX1").val()),
                    lblEinh1FaktorX2: $("#lblEnfEinh1FaktorX2").text(),
                    lblEinh2FaktorX2: $("#lblEnfEinh2FaktorX2").text(),
                    lblEinh3FaktorX2: $("#lblEnfEinh3FaktorX2").text(),
                    einh1FaktorX2: formatNumber("deform", $("#enfEinh1FaktorX2").val()),
                    einh2FaktorX2: formatNumber("deform", $("#enfEinh2FaktorX2").val()),
                    einh3FaktorX2: formatNumber("deform", $("#enfEinh3FaktorX2").val()),
                    lblEinh1FaktorX3: $("#lblEnfEinh1FaktorX3").text(),
                    lblEinh2FaktorX3: $("#lblEnfEinh2FaktorX3").text(),
                    lblEinh3FaktorX3: $("#lblEnfEinh3FaktorX3").text(),
                    einh1FaktorX3: formatNumber("deform", $("#enfEinh1FaktorX3").val()),
                    einh2FaktorX3: formatNumber("deform", $("#enfEinh2FaktorX3").val()),
                    einh3FaktorX3: formatNumber("deform", $("#enfEinh3FaktorX3").val()),
                    gueltigVom: $("#gueltigVomEnf").val(),
                    gueltigBis: $("#gueltigBisEnf").val()
                },
                success: function(a) {
                    alert(datensatzGespeichert(a));
                    readInstanzen("enfLast", $("#enfCount").val())
                } }), enfNavID = $("#enfCount").val();
            else if ("eRngSpeichern" == a) {
                data =
                    { id: "eRng"
                    , modus: "new"
                    , nameDB: $("#nameDB").val()
                    , liegID: $("#liegID").val()
                    , rechnungsmodus: $("#modusERng").val()
                    , versorger: $("#versorgerERng").val()
                    , rechnungsnummer: $("#nrERng").val()
                    , zaehlpunktnummer: $("#zpNrERng").val()
                    , mstID: $("#mstIDERng").val()
                    , rechnungsdatum: $("#datumERng").val()
                    , abrechnungszeitVom: $("#vomERng").val()
                    , abrechnungszeitBis: $("#bisERng").val()
                    , energietraeger: $("#inputEntERng").val()
                    , einheit: $("#einERng").val()
                    , menge: formatNumber("deform", $("#mengeERng").val())
                    , verbrauch: formatNumber("deform", $("#verbrauchERng").val())
                    , kostenstelle: $("#kostenstelleERng").val()
                    , kosten: formatNumber("deform", $("#kostenERng").val())
                    , mwst: formatNumber("deform", $("#mwstPercentERng").val())
                    , tagstromVerbr: formatNumber("deform", $("#tagstromVerbrERng").val())
                    , tagstromKost: formatNumber("deform", $("#tagstromKostERng").val())
                    , nachtstromVerbr: formatNumber("deform", $("#nachtstromVerbrERng").val())
                    , nachtstromKost: formatNumber("deform", $("#nachtstromKostERng").val())
                    , blindstrom: formatNumber("deform", $("#blindstromERng").val())
                    , lastspitze: formatNumber("deform", $("#lastspitzeERng").val())
                    , leistungspreis: formatNumber("deform", $("#leistungspreisERng").val())
                    , arbeitspreisWirkstrom: formatNumber("deform", $("#abpWirkERng").val())
                    , stromsteuer: formatNumber("deform", $("#strSteuERng").val())
                    , arbeitspreisNetz: formatNumber("deform", $("#abpNetzERng").val())
                    , konzessionsabgabe: formatNumber("deform", $("#konzERng").val())
                    , eegUmlage: formatNumber("deform", $("#eegERng").val())
                    , eegUmlageUntMill: formatNumber("deform", $("#eegUntERng").val())
                    , eegUmlageUebMill: formatNumber("deform", $("#eegUebERng").val())
                    , kwkUnter: formatNumber("deform", $("#kwkUntERng").val())
                    , kwkUeber: formatNumber("deform", $("#kwkObERng").val())
                    , nevUnter: formatNumber("deform", $("#nevUntERng").val())
                    , nevUeber: formatNumber("deform", $("#nevObERng").val())
                    , offUnter: formatNumber("deform", $("#offUntERng").val())
                    , offUeber: formatNumber("deform", $("#offObERng").val())
                    , lblCustom1: $("#lblCustom1ERng").text()
                    , Custom1: formatNumber("deform", $("#custom1ERng").val())
                    , lblCustom2: $("#lblCustom2ERng").text()
                    , Custom2: formatNumber("deform", $("#custom2ERng").val())
                    , lblCustom3: $("#lblCustom3ERng").text()
                    , Custom3: formatNumber("deform", $("#custom3ERng").val())
                    , lblCustom4: $("#lblCustom4ERng").text()
                    , Custom4: formatNumber("deform", $("#custom4ERng").val())
                    , lblCustom5: $("#lblCustom5ERng").text()
                    , Custom5: formatNumber("deform", $("#custom5ERng").val())
                    , lblCustom6: $("#lblCustom6ERng").text()
                    , Custom6: formatNumber("deform", $("#custom6ERng").val())
                    }

                ajaxPost("php/instanzIntoDb.php")(data)
                .then(result => {
                    alert(datensatzGespeichert(result))
                    readInstanzen("eRngLast", $("#eRngCount").val())
                })
                eRngNavID = $("#eRngCount").val()
            }
            else if ("iMwSpeichern" == a) $.ajax({
                type: "POST",
                async: !0,
                url: "php/instanzIntoDb.php",
                data: {
                    id: "iMw",
                    modus: "new",
                    nameDB: $("#nameDB").val(),
                    liegID: $("#liegID").val(),
                    versorger: $("#versorgerIMw").val(),
                    kostenstelle: $("#kostenstelleIMw").val(),
                    messstelle: $("#mstIMw").val(),
                    ableseDatum: $("#datumIMw").val(),
                    vom: $("#vomIMw").val(),
                    bis: $("#bisIMw").val(),
                    energietraeger: $("#entIMw").val(),
                    einheit: $("#einIMw").val(),
                    menge: formatNumber("deform", $("#mengeIMw").val()),
                    verbrauch: formatNumber("deform", $("#verbrauchIMw").val()),
                    notiz: $("#notizIMw").val(),
                    lblCustom1: $("#lblCustom1IMw").val(),
                    Custom1: $("#custom1IMw").val(),
                    lblCustom2: $("#lblCustom2IMw").val(),
                    Custom2: $("#custom2IMw").val(),
                    lblCustom3: $("#lblCustom3IMw").val(),
                    Custom3: $("#custom3IMw").val(),
                    lblCustom4: $("#lblCustom4IMw").val(),
                    Custom4: $("#custom4IMw").val(),
                    lblCustom5: $("#lblCustom5IMw").val(),
                    Custom5: $("#custom5IMw").val(),
                    lblCustom6: $("#lblCustom6IMw").val(),
                    Custom6: $("#custom6IMw").val()
                },
                success: function(a) {
                    alert(datensatzGespeichert(a));
                    readInstanzen("iMwLast",
                        $("#iMwCount").val())
                } }), iMwNavID = $("#iMwCount").val();
            else if ("eAnlSpeichern" == a) {
                e = [];
                for (i = 0; i < $("#tblOptionenEAnl tbody tr").length; i++) e[i] = tblOptionenEAnl.cell(i, 0).data();
                e = e.join(",");
                $("#eAnlFirst").trigger("click")
                $.ajax({
                    type: "POST",
                    async: !0,
                    url: "php/instanzIntoDb.php",
                    data: {
                        id: "eAnl",
                        modus: "new",
                        nameDB: $("#nameDB").val(),
                        name: $("#nameEAnl").val(),
                        kurz: $("#kuerzelEAnl").val(),
                        beschreibung: $("#beschreibungEAnl").val(),
                        optionen: e
                    },
                    success: function(a) {

                        alert(datensatzGespeichert(a));

                        $("#eAnlFirst").trigger("click")
                    }
                });
                eAnlNavID = $("#eAnlCount").val() }
            else if ("ePrdSpeichern" == a) {
                e = [];
                for (i = 0; i < $("#tblOptionenEPrd tbody tr").length; i++) e[i] = tblOptionenEPrd.cell(i, 0).data();
                e = e.join(",");
                $.ajax({
                    type: "POST",
                    async: !0,
                    url: "php/instanzIntoDb.php",
                    data: {
                        id: "ePrd",
                        modus: "new",
                        nameDB: $("#nameDB").val(),
                        name: $("#nameEPrd").val(),
                        kurz: $("#kuerzelEPrd").val(),
                        beschreibung: $("#beschreibungEPrd").val(),
                        optionen: e
                    },
                    success: function(a) {
                        alert(datensatzGespeichert(a));
                        readInstanzen("ePrdLast", $("#ePrdCount").val())
                    }
                });
                ePrdNavID =
                    $("#ePrdCount").val() }
            else if ("knzSpeichern" == a) {
                c = $("#btnTabKnzCont li").length;
                for (var g = e = 0; g < c; g++)
                    if ("none" === $("#btnTabKnzCont li").eq(g).css("display")) {
                        e = g;
                        break
                    } c = {
                    id: "knz",
                    modus: "new",
                    nameDB: $("#nameDB").val(),
                    orgID: $("#orgID").val(),
                    bezug: $("#bezugAllgemeinKnz").val(),
                    instanzID: $("#instanzAllgemeinIDKnz").val(),
                    zustaendigerMitarbeiter: $("#zustaendigerMitarbeiterAllgemeinKnz").val(),
                    beschreibung: $("#beschreibungAllgemeinKnz").val(),
                    nKnzs: e,
                    bezeichnung1: $("#bez_1_Knz").val(),
                    anwendungsbereich1: $("#anwendungsbereichKennzahldetails1Knz").val(),
                    status1: $("#status1Knz").prop("checked"),
                    einfuehrung1: $("#datumEinfuehrung1Knz").val(),
                    letzteUeberpruefung1: $("#datumLetzteUeberpruefung1Knz").val(),
                    deaktivierung1: $("#datumDeaktivierung1Knz").val(),
                    einheit1: $("#einheitKennzahldetail1Knz").val(),
                    formelID1: $("#formel1IDKnz").val(),
                    kennzahl1: $("#kennzahl1Knz").val(),
                    toleranzgrenzeOben1: $("#toleranzgrenzeOben1Knz").val(),
                    toleranzgrenzeUnten1: $("#toleranzgrenzeUnten1Knz").val(),
                    zielwert1: $("#zielwert1Knz").val(),
                    zielVon1: $("#zielVon1Knz").val(),
                    zielBis1: $("#zielBis1Knz").val(),
                    bezeichnung2: $("#bez_2_Knz").val(),
                    anwendungsbereich2: $("#anwendungsbereichKennzahldetails2Knz").val(),
                    status2: $("#status2Knz").prop("checked"),
                    einfuehrung2: $("#datumEinfuehrung2Knz").val(),
                    letzteUeberpruefung2: $("#datumLetzteUeberpruefung2Knz").val(),
                    deaktivierung2: $("#datumDeaktivierung2Knz").val(),
                    einheit2: $("#einheitKennzahldetail2Knz").val(),
                    formelID2: $("#formel2IDKnz").val(),
                    kennzahl2: $("#kennzahl2Knz").val(),
                    toleranzgrenzeOben2: $("#toleranzgrenzeOben2Knz").val(),
                    toleranzgrenzeUnten2: $("#toleranzgrenzeUnten2Knz").val(),
                    zielwert2: $("#zielwert2Knz").val(),
                    zielVon2: $("#zielVon2Knz").val(),
                    zielBis2: $("#zielBis2Knz").val(),
                    bezeichnung3: $("#bez_3_Knz").val(),
                    anwendungsbereich3: $("#anwendungsbereichKennzahldetails3Knz").val(),
                    status3: $("#status3Knz").prop("checked"),
                    einfuehrung3: $("#datumEinfuehrung3Knz").val(),
                    letzteUeberpruefung3: $("#datumLetzteUeberpruefung3Knz").val(),
                    deaktivierung3: $("#datumDeaktivierung3Knz").val(),
                    einheit3: $("#einheitKennzahldetail3Knz").val(),
                    formelID3: $("#formel3IDKnz").val(),
                    kennzahl3: $("#kennzahl3Knz").val(),
                    toleranzgrenzeOben3: $("#toleranzgrenzeOben3Knz").val(),
                    toleranzgrenzeUnten3: $("#toleranzgrenzeUnten3Knz").val(),
                    zielwert3: $("#zielwert3Knz").val(),
                    zielVon3: $("#zielVon3Knz").val(),
                    zielBis3: $("#zielBis3Knz").val(),
                    bezeichnung4: $("#bez_4_Knz").val(),
                    anwendungsbereich4: $("#anwendungsbereichKennzahldetails4Knz").val(),
                    status4: $("#status4Knz").prop("checked"),
                    einfuehrung4: $("#datumEinfuehrung4Knz").val(),
                    letzteUeberpruefung4: $("#datumLetzteUeberpruefung4Knz").val(),
                    deaktivierung4: $("#datumDeaktivierung4Knz").val(),
                    einheit4: $("#einheitKennzahldetail4Knz").val(),
                    formelID4: $("#formel4IDKnz").val(),
                    kennzahl4: $("#kennzahl4Knz").val(),
                    toleranzgrenzeOben4: $("#toleranzgrenzeOben4Knz").val(),
                    toleranzgrenzeUnten4: $("#toleranzgrenzeUnten4Knz").val(),
                    zielwert4: $("#zielwert4Knz").val(),
                    zielVon4: $("#zielVon4Knz").val(),
                    zielBis4: $("#zielBis4Knz").val(),
                    bezeichnung5: $("#bez_5_Knz").val(),
                    anwendungsbereich5: $("#anwendungsbereichKennzahldetails5Knz").val(),
                    status5: $("#status5Knz").prop("checked"),
                    einfuehrung5: $("#datumEinfuehrung5Knz").val(),
                    letzteUeberpruefung5: $("#datumLetzteUeberpruefung5Knz").val(),
                    deaktivierung5: $("#datumDeaktivierung5Knz").val(),
                    einheit5: $("#einheitKennzahldetail5Knz").val(),
                    formelID5: $("#formel5IDKnz").val(),
                    kennzahl5: $("#kennzahl5Knz").val(),
                    toleranzgrenzeOben5: $("#toleranzgrenzeOben5Knz").val(),
                    toleranzgrenzeUnten5: $("#toleranzgrenzeUnten5Knz").val(),
                    zielwert5: $("#zielwert5Knz").val(),
                    zielVon5: $("#zielVon5Knz").val(),
                    zielBis5: $("#zielBis5Knz").val(),
                    bezeichnung6: $("#bez_6_Knz").val(),
                    anwendungsbereich6: $("#anwendungsbereichKennzahldetails6Knz").val(),
                    status6: $("#status6Knz").prop("checked"),
                    einfuehrung6: $("#datumEinfuehrung6Knz").val(),
                    letzteUeberpruefung6: $("#datumLetzteUeberpruefung6Knz").val(),
                    deaktivierung6: $("#datumDeaktivierung6Knz").val(),
                    einheit6: $("#einheitKennzahldetail6Knz").val(),
                    formelID6: $("#formel6IDKnz").val(),
                    kennzahl6: $("#kennzahl6Knz").val(),
                    toleranzgrenzeOben6: $("#toleranzgrenzeOben6Knz").val(),
                    toleranzgrenzeUnten6: $("#toleranzgrenzeUnten6Knz").val(),
                    zielwert6: $("#zielwert6Knz").val(),
                    zielVon6: $("#zielVon6Knz").val(),
                    zielBis6: $("#zielBis6Knz").val(),
                    bezeichnung7: $("#bez_7_Knz").val(),
                    anwendungsbereich7: $("#anwendungsbereichKennzahldetails7Knz").val(),
                    status7: $("#status7Knz").prop("checked"),
                    einfuehrung7: $("#datumEinfuehrung7Knz").val(),
                    letzteUeberpruefung7: $("#datumLetzteUeberpruefung7Knz").val(),
                    deaktivierung7: $("#datumDeaktivierung7Knz").val(),
                    einheit7: $("#einheitKennzahldetail7Knz").val(),
                    formelID7: $("#formel7IDKnz").val(),
                    kennzahl7: $("#kennzahl7Knz").val(),
                    toleranzgrenzeOben7: $("#toleranzgrenzeOben7Knz").val(),
                    toleranzgrenzeUnten7: $("#toleranzgrenzeUnten7Knz").val(),
                    zielwert7: $("#zielwert7Knz").val(),
                    zielVon7: $("#zielVon7Knz").val(),
                    zielBis7: $("#zielBis7Knz").val(),
                    bezeichnung8: $("#bez_8_Knz").val(),
                    anwendungsbereich8: $("#anwendungsbereichKennzahldetails8Knz").val(),
                    status8: $("#status8Knz").prop("checked"),
                    einfuehrung8: $("#datumEinfuehrung8Knz").val(),
                    letzteUeberpruefung8: $("#datumLetzteUeberpruefung8Knz").val(),
                    deaktivierung8: $("#datumDeaktivierung8Knz").val(),
                    einheit8: $("#einheitKennzahldetail8Knz").val(),
                    formelID8: $("#formel8IDKnz").val(),
                    kennzahl8: $("#kennzahl8Knz").val(),
                    toleranzgrenzeOben8: $("#toleranzgrenzeOben8Knz").val(),
                    toleranzgrenzeUnten8: $("#toleranzgrenzeUnten8Knz").val(),
                    zielwert8: $("#zielwert8Knz").val(),
                    zielVon8: $("#zielVon8Knz").val(),
                    zielBis8: $("#zielBis8Knz").val(),
                    bezeichnung9: $("#bez_9_Knz").val(),
                    anwendungsbereich9: $("#anwendungsbereichKennzahldetails9Knz").val(),
                    status9: $("#status9Knz").prop("checked"),
                    einfuehrung9: $("#datumEinfuehrung9Knz").val(),
                    letzteUeberpruefung9: $("#datumLetzteUeberpruefung9Knz").val(),
                    deaktivierung9: $("#datumDeaktivierung9Knz").val(),
                    einheit9: $("#einheitKennzahldetail9Knz").val(),
                    formelID9: $("#formel9IDKnz").val(),
                    kennzahl9: $("#kennzahl9Knz").val(),
                    toleranzgrenzeOben9: $("#toleranzgrenzeOben9Knz").val(),
                    toleranzgrenzeUnten9: $("#toleranzgrenzeUnten9Knz").val(),
                    zielwert9: $("#zielwert9Knz").val(),
                    zielVon9: $("#zielVon9Knz").val(),
                    zielBis9: $("#zielBis9Knz").val(),
                    bezeichnung10: $("#bez_10_Knz").val(),
                    anwendungsbereich10: $("#anwendungsbereichKennzahldetails10Knz").val(),
                    status10: $("#status10Knz").prop("checked"),
                    einfuehrung10: $("#datumEinfuehrung10Knz").val(),
                    letzteUeberpruefung10: $("#datumLetzteUeberpruefung10Knz").val(),
                    deaktivierung10: $("#datumDeaktivierung10Knz").val(),
                    einheit10: $("#einheitKennzahldetail10Knz").val(),
                    formelID10: $("#formel10IDKnz").val(),
                    kennzahl10: $("#kennzahl10Knz").val(),
                    toleranzgrenzeOben10: $("#toleranzgrenzeOben10Knz").val(),
                    toleranzgrenzeUnten10: $("#toleranzgrenzeUnten10Knz").val(),
                    zielwert10: $("#zielwert10Knz").val(),
                    zielVon10: $("#zielVon10Knz").val(),
                    zielBis10: $("#zielBis10Knz").val()
                };
                g = new Date;
                e = {
                    dataToLog: "\n            ##########################################################################\n\n            Neu\n            +++\n            Datum: " +
                        g.getDate() + "." + (g.getMonth() + 1) + ".2019 " + g.getHours() + ":" + (g.getMinutes() + 1) + "\n\n            bezug: " + c.bezug + "\n            instanzID: " + c.instanzID + "\n            zustaendigerMitarbeiter: " + c.zustaendigerMitarbeiter + "\n            beschreibung: " + c.beschreibung + "\n\n            nKnzs: " + e + "\n\n            bezeichnung1: " + c.bezeichnung1 + "\n            anwendungsbereich1: " + c.anwendungsbereich1 + "\n            status1: " + c.status1 + "\n            einfuehrung1: " + c.einfuehrung1 + "\n            letzteUeberpruefung1: " +
                        c.letzteUeberpruefung1 + "\n            deaktivierung1: " + c.deaktivierung1 + "\n            einheit1: " + c.einheit1 + "\n            formelID1: " + c.formelID1 + "\n            kennzahl1: " + c.kennzahl1 + "\n            toleranzgrenzeOben1:  " + c.toleranzgrenzeOben1 + "\n            toleranzgrenzeUnten1: " + c.toleranzgrenzeUnten1 + "\n\n            bezeichnung2: " + c.bezeichnung2 + "\n            anwendungsbereich2: " + c.anwendungsbereich2 + "\n            status2: " + c.status2 + "\n            einfuehrung2: " + c.einfuehrung2 +
                        "\n            letzteUeberpruefung2: " + c.letzteUeberpruefung2 + "\n            deaktivierung2: " + c.deaktivierung2 + "\n            einheit2: " + c.einheit2 + "\n            formelID2: " + c.formelID2 + "\n            kennzahl2: " + c.kennzahl2 + "\n            toleranzgrenzeOben2:  " + c.toleranzgrenzeOben2 + "\n            toleranzgrenzeUnten2: " + c.toleranzgrenzeUnten2 + "\n\n            bezeichnung3: " + c.bezeichnung3 + "\n            anwendungsbereich3: " + c.anwendungsbereich3 + "\n            status3: " + c.status3 + "\n            einfuehrung3: " +
                        c.einfuehrung3 + "\n            letzteUeberpruefung3: " + c.letzteUeberpruefung3 + "\n            deaktivierung3: " + c.deaktivierung3 + "\n            einheit3: " + c.einheit3 + "\n            formelID3: " + c.formelID3 + "\n            kennzahl3: " + c.kennzahl3 + "\n            toleranzgrenzeOben3:  " + c.toleranzgrenzeOben3 + "\n            toleranzgrenzeUnten3: " + c.toleranzgrenzeUnten3 + "\n\n            bezeichnung4: " + c.bezeichnung4 + "\n            anwendungsbereich4: " + c.anwendungsbereich4 + "\n            status4: " + c.status4 +
                        "\n            einfuehrung4: " + c.einfuehrung4 + "\n            letzteUeberpruefung4: " + c.letzteUeberpruefung4 + "\n            deaktivierung4: " + c.deaktivierung4 + "\n            einheit4: " + c.einheit4 + "\n            formelID4: " + c.formelID4 + "\n            kennzahl4: " + c.kennzahl4 + "\n            toleranzgrenzeOben4:  " + c.toleranzgrenzeOben4 + "\n            toleranzgrenzeUnten4: " + c.toleranzgrenzeUnten4 + "\n\n            bezeichnung5: " + c.bezeichnung5 + "\n            anwendungsbereich5: " + c.anwendungsbereich5 +
                        "\n            status5: " + c.status5 + "\n            einfuehrung5: " + c.einfuehrung5 + "\n            letzteUeberpruefung5: " + c.letzteUeberpruefung5 + "\n            deaktivierung5: " + c.deaktivierung5 + "\n            einheit5: " + c.einheit5 + "\n            formelID5: " + c.formelID5 + "\n            kennzahl5: " + c.kennzahl5 + "\n            toleranzgrenzeOben5:  " + c.toleranzgrenzeOben5 + "\n            toleranzgrenzeUnten5: " + c.toleranzgrenzeUnten5 + "\n\n            bezeichnung6: " + c.bezeichnung6 + "\n            anwendungsbereich6: " +
                        c.anwendungsbereich6 + "\n            status6: " + c.status6 + "\n            einfuehrung6: " + c.einfuehrung6 + "\n            letzteUeberpruefung6: " + c.letzteUeberpruefung6 + "\n            deaktivierung6: " + c.deaktivierung6 + "\n            einheit6: " + c.einheit6 + "\n            formelID6: " + c.formelID6 + "\n            kennzahl6: " + c.kennzahl6 + "\n            toleranzgrenzeOben6:  " + c.toleranzgrenzeOben6 + "\n            toleranzgrenzeUnten6: " + c.toleranzgrenzeUnten6 + "\n\n            bezeichnung7: " + c.bezeichnung7 +
                        "\n            anwendungsbereich7: " + c.anwendungsbereich7 + "\n            status7: " + c.status7 + "\n            einfuehrung7: " + c.einfuehrung7 + "\n            letzteUeberpruefung7: " + c.letzteUeberpruefung7 + "\n            deaktivierung7: " + c.deaktivierung7 + "\n            einheit7: " + c.einheit7 + "\n            formelID7: " + c.formelID7 + "\n            kennzahl7: " + c.kennzahl7 + "\n            toleranzgrenzeOben7:  " + c.toleranzgrenzeOben7 + "\n            toleranzgrenzeUnten7: " + c.toleranzgrenzeUnten7 + "\n\n            bezeichnung8: " +
                        c.bezeichnung8 + "\n            anwendungsbereich8: " + c.anwendungsbereich8 + "\n            status8: " + c.status8 + "\n            einfuehrung8: " + c.einfuehrung8 + "\n            letzteUeberpruefung8: " + c.letzteUeberpruefung8 + "\n            deaktivierung8: " + c.deaktivierung8 + "\n            einheit8: " + c.einheit8 + "\n            formelID8: " + c.formelID8 + "\n            kennzahl8: " + c.kennzahl8 + "\n            toleranzgrenzeOben8:  " + c.toleranzgrenzeOben8 + "\n            toleranzgrenzeUnten8: " + c.toleranzgrenzeUnten8 +
                        "\n\n            bezeichnung9: " + c.bezeichnung9 + "\n            anwendungsbereich9: " + c.anwendungsbereich9 + "\n            status9: " + c.status9 + "\n            einfuehrung9: " + c.einfuehrung9 + "\n            letzteUeberpruefung9: " + c.letzteUeberpruefung9 + "\n            deaktivierung9: " + c.deaktivierung9 + "\n            einheit9: " + c.einheit9 + "\n            formelID9: " + c.formelID9 + "\n            kennzahl9: " + c.kennzahl9 + "\n            toleranzgrenzeOben9:  " + c.toleranzgrenzeOben9 + "\n            toleranzgrenzeUnten9: " +
                        c.toleranzgrenzeUnten9 + "\n\n            bezeichnung10: " + c.bezeichnung10 + "\n            anwendungsbereich10: " + c.anwendungsbereich10 + "\n            status10: " + c.status10 + "\n            einfuehrung10: " + c.einfuehrung10 + "\n            letzteUeberpruefung10: " + c.letzteUeberpruefung10 + "\n            deaktivierung10: " + c.deaktivierung10 + "\n            einheit10: " + c.einheit10 + "\n            formelID10: " + c.formelID10 + "\n            kennzahl10: " + c.kennzahl10 + "\n            toleranzgrenzeOben10:  " + c.toleranzgrenzeOben10 +
                        "\n            toleranzgrenzeUnten10: " + c.toleranzgrenzeUnten10 + "\n\n            ",
                    ins: "Knz"
                };
                $.ajax({
                    type: "POST",
                    async: !0,
                    url: "../php/log.php",
                    data: e,
                    success: function(a) {
                        alert("Logged data!")
                    }
                });
                $.ajax({
                    type: "POST",
                    async: !0,
                    url: "php/instanzIntoDb.php",
                    data: c,
                    success: function(a) {
                        alert(datensatzGespeichert(a))
                    }
                });
                knzNavID = $("#knzCount").val() }
            else "zpSpeichern" == a ? ($.ajax({
                type: "POST",
                async: !0,
                url: "php/instanzIntoDb.php",
                data: {
                    id: "zp",
                    modus: "new",
                    nameDB: $("#nameDB").val(),
                    liegID: $("#liegID").val(),
                    nr: $("#zaehlpunktNrZp").val(),
                    energietraeger: $("#energietraegerZp").val(),
                    messstelle: $("#mstZp").val(),
                    messsystem: $("#messsystemZp").val(),
                    messgenauigkeit: $("#messgenauZp").val()
                },
                success: function(a) {
                    alert(datensatzGespeichert(a));
                    readInstanzen("zpLast", $("#zpCount").val())
                } }), zpNavID = $("#zpCount").val()) : "betrParSpeichern" == a && (e = [], 0 < $("#checkEPrd").length && (e = JSON.stringify(Array.from($("#checkEPrd div")).map(function(a) {
                return {
                    col: $("#" + a.children[0].id).text(),
                    state: $("#" + a.children[1].id).is(":checked"),
                    alias: $("#" + a.children[2].id).val()
                }
            }))), $.ajax({
                type: "POST",
                async: !0,
                url: "php/instanzIntoDb.php",
                data: {
                    id: "betrPar",
                    modus: "new",
                    nameDB: $("#nameDB").val(),
                    tblName: $("#quellTblEPrd").val(),
                    parJson: e
                },
                success: function(a) {
                    alert(datensatzGespeichert(a));
                    readInstanzen("betrParLast", $("#betrParCount").val())
                }
            }), betrParNavID = $("#betrParCount").val());
            $(".lblNeu").css("display", "none")
            $(".lblAendern").css("display", "inline")
        }, tabControlNav = function(a) {
            var b = [];
            $("#selectMap").val("Speziell");
            for (var e = 0; e < nTabsData; e++)
                if (a == tabsData[e].tab && "" != tabsData[e].info) {
                    $("#" + tabsData[e].tab).css("background-color", "#CED6DE");
                    $("#" + tabsData[e].infos).css("display", "block");
                    $("#activeInstance").val(tabsData[e].aktivInstance);
                    if ("tabGipscAdm" == a) passwortAuswertenGipscAdm();
                    else if ("tabOrg" == a) b = [$("#nameDB").val()], $("#manPfadOrg").text($("#nameAllgemeinMan").val());
                    else if ("tabLieg" == a) b = [$("#nameDB").val(), $(".orgPfad").val(), "", ""], readInstanzen("liegFirst", $(".liegPfad").prop("selectedIndex")),
                        $("#manPfadLieg").css("display", "none"), $("#orgPfadLieg").text($("#nameAllgemeinOrg").val()), energietrInDBoxLieg(), energiefrmInDBoxLieg();
                    else if ("tabExtDl" == a) readInstanzen("extDlFirst", 0);
                    else if ("tabStdDr" == a) readInstanzen("stdDrFirst", 0);
                    else if ("tabBer" == a) $("#manPfadBer").css("display", "none"), $("#orgPfadBer").css("display", "none"), $("#liegPfadBer").text($("#nameAllgemeinLieg").val()), energiefrmInDBoxLieg();
                    else if ("tabEPrd" == a) readBdeConfig($("#nameDB").val());
                    else if ("tabBen" == a) b = ["", ""], readInstanzen("benFirst", 0);
                    else if ("tabAnl" == a) getAnlagenAuswahlTblHeader(), energiefrmInDBoxLieg();
                    else if ("tabMsm" == a) getAnlagenAuswahlTblHeader();
                    else if ("tabMstE" == a | "tabMstB" == a) bereicheVorhanden();
                    else if ("tabKnz" == a) $("#asideRight2").css("display", "block"), knzEinheitenEinlesen();
                    else if ("tabExtRechnungen" == a) $("#asideRight").css("display", "block"), versorgerUndEinheitBefuellen(), energietrInDBoxERngVergleich(), energietrInDBoxLieg();
                    else if ("tabAusw_eRng_iMw" == a) energietrInDBoxERngVergleich(), energietrInDBoxLieg(), externeRechnungenListeErstellen("vergleich");
                    else if ("tabIntEnergiedatenIMw" == a || "tabIntBetriebsdatenIMw" ==
                        a) $("#berechnungsformelnLeft").css("display", "none"),
                           $("#interneMesswerteLeft, #interneMesswerte").css("display", "block"),
                           $("#infosMasseneingabe").css("display", "none"),

                           /*new-mm-start 30-03-2021*/
                           $("#infosMasseneingabePrdkt").css("display", "none"),
                           $("#infosMasseneingabeMesssetelle").css("display", "none"),
                           /*new-mm-end 30-03-2021*/

                           $("#btnMassEingAnl, #btnMassEingMst").text("Masseneingabe") /*mm-comment 22-03-2021*/  /*,
                           "tabIntEnergiedatenIMw" == a ? mstOderAnlOhneZeitzuordnungInTbl(InstanceMode.ENERGY) : "tabIntBetriebsdatenIMw" == a;*/ /*mm-comment 22-03-2021*/  /*&& mstOderAnlOhneZeitzuordnungInTbl(InstanceMode.BDE);*/
                    else if ("tabBerechnungsformeln" == a || "tabVorlagenformeln" == a) $("#tabsAuswertungen").css("display", "block"), $("#tabBerechnungsformeln, #tabVorlagenformeln").css("display",
                        "inline-block"), $("#asideLeft").css("display", "block"), $("#berechnungsformelnLeft").css("display", "block"), $("#interneMesswerteLeft").css("display", "none"), $("#formelStringDarstellung").val(""), $("#formelIdDarstellung").val(""), $("#berechneteMstName").val(""), messstellenInAuswertungsEditorTabelleEinlesen(), anlagenInAuswertungsEditorTabelleEinlesen(), dynBdeDatenInAuswertungsEditorTabelleEinlesen(), produkteInFormeleditorEinlesen();
                    1 > tabsData[e].lengthPath ? alert("The tabsData[tb].lengthPath is to small! It has to be at least 1. :tabControlNav(tab)") :
                        4 < tabsData[e].lengthPath && alert("The tabsData[tb].lengthPath is to big! It has to be smaller than 4. :tabControlNav(tab)");
                    changeTracker.setInstance(tabsData[e].aktivInstance)
                } else $("#" + tabsData[e].tab).css("background-color", "#B9C0C7"), $("#" + tabsData[e].infos).css("display", "none"), "block" != $("#infosKennzahlen").css("display") && $("#asideRight2").css("display", "none"), "block" != $("#infosExtRechnungen").css("display") && $("#asideRight").css("display",
                    "none"), "block" != $("#infosBerechnungsformeln").css("display") && "block" != $("#infosVorlagenformeln").css("display") && "block" != $("#infosIntEnergiedaten").css("display") && "block" != $("#infosIntBetriebsdaten").css("display") && $("#asideLeft").css("display", "none")
        }, mainMenuNav = function(a) {
            "menuBerechnungsformeln" == a || "menuProduktionAusw" == a || "spaEfVTab1Menu" == a || "spaEfVTab2Menu" == a || "verbExportMenu" == a || "mstVerglMenu" == a || "zeitVerglMenu" == a || "knzDarst" == a || "menuVorlagenformeln" == a ? ($("#tabsAuswertungen, #auswertungen").css("display",
                "block"), $("#tabsOptionen, #interneMesswerte").css("display", "none"), "menuBerechnungsformeln" == a || "menuVorlagenformeln" == a ? ($("#editor, #tabProd").css("display", "block"), "menuBerechnungsformeln" == a ? tabControlNav("tabBerechnungsformeln") : "menuVorlagenformeln" == a && tabControlNav("tabVorlagenformeln")) : $("#editor, #tabBerechnungsformeln, #tabVorlagenformeln").css("display", "none"), "menuProduktionAusw" == a ? ($("#produktion, #tabProd").css("display", "block"), tabControlNav("tabProd")) : $("#produktion, #tabProd").css("display",
                "none"), "verbExportMenu" == a ? ($("#datenexport, #tabVerbrauchsdatenExp").css("display", "block"), tabControlNav("tabVerbrauchsdatenExp")) : $("#datenexport, #tabVerbrauchsdatenExp").css("display", "none"), "mstVerglMenu" == a || "zeitVerglMenu" == a || "knzDarst" == a ? ($("#diagramme, #tabLnDiag, #tabTimeCompDiag, #tabDiagKnz").css("display", "block"), "mstVerglMenu" == a ? tabControlNav("tabLnDiag") : "zeitVerglMenu" == a ? tabControlNav("tabTimeCompDiag") : "knzDarst" == a && tabControlNav("tabDiagKnz")) : $("#diagramme, #tabLnDiag, #tabTimeCompDiag, #tabDiagKnz").css("display",
                "none"), "spaEfVTab1Menu" == a || "spaEfVTab2Menu" == a ? ($("#berichte, #tabSpaEfV_Tbl1, #tabSpaEfV_Tbl2").css("display", "block"), "spaEfVTab1Menu" == a ? (tabControlNav("tabSpaEfV_Tbl1"), $("#verwaltung").val("ausw")) : "spaEfVTab2Menu" == a && (tabControlNav("tabSpaEfV_Tbl2"), $("#verwaltung").val("ausw"))) : $("#berichte, #tabSpaEfV_Tbl1, #tabSpaEfV_Tbl2").css("display", "none")) : $("#tabsAuswertungen, #auswertungen").css("display", "none");
            "betrGrpMenu" == a || "manGrpMenu" == a || "sAdmMenu" == a || "admMenu" == a || "benMenu" == a ? ($("#tabsOptionen, #tabsEditor, #tabsAuswertungen").css("display",
                "none"), $("#tabsRechteverwaltung, #rechteverwaltung, #stammdaten").css("display", "block"), "betrGrpMenu" == a ? tabControlNav("tabBetrGrp") : "manGrpMenu" == a ? tabControlNav("tabManGrp") : "sAdmMenu" == a ? tabControlNav("tabSAdm") : "admMenu" == a ? tabControlNav("tabAdm") : "benMenu" == a && tabControlNav("tabBen")) : $("#tabsRechteverwaltung, #rechteverwaltung").css("display", "none");
            "untMenu" == a || "manMenu" == a || "orgMenu" == a || "liegMenu" == a || "berMenu" == a || "mstEMenu" == a || "mstBMenu" == a || "stdMenu" == a || "stdDrMenu" == a ? ($("#tabsOptionen, #tabsEditor, #tabsAuswertungen").css("display",
                "none"), $("#tabsUnternehmensstruktur, #unternehmensstruktur, #stammdaten").css("display", "block"), "untMenu" == a || "manMenu" == a ? tabControlNav("tabMan") : "orgMenu" == a ? tabControlNav("tabOrg") : "liegMenu" == a ? tabControlNav("tabLieg") : "berMenu" == a ? (tabControlNav("tabBer")) : "mstEMenu" == a ? tabControlNav("tabMstE") : "mstBMenu" == a ? tabControlNav("tabMstB") : "stdMenu" == a ? tabControlNav("tabStd") : "stdDrMenu" == a && tabControlNav("tabStdDr")) : $("#tabsUnternehmensstruktur, #unternehmensstruktur").css("display", "none");
            if ("anlMenu" == a || "anl_Eng_Menu" == a || "anl_Dok_Menu" == a || "anl_Hist_Menu" ==
                a || "anl_Konfig_Menu" == a || "anl_Menu" == a) {
                $("#tabsAnlagenverwaltung, #anlagenverwaltung, #stammdaten").css("display", "block");
                $("#bereichAnl").text($("#nameAllgemeinBer").val());
                clearFields("anl");
                anlagenGruppenEinlesen()
                $("#verwaltung").val("Anl");
                var b = "";
                switch (a) {
                    case "anlMenu":
                    case "anl_Menu":
                        b = "tabAnl";
                        break;
                    case "anl_Eng_Menu":
                        b = "tabAnl_energie";
                        break;
                    case "anl_Dok_Menu":
                        b = "tabAnl_dokumente";
                        break;
                    case "anl_Hist_Menu":
                        b = "tabAnl_historie";
                        break;
                    case "anl_Konfig_Menu":
                        b = "tabAnl_weitereKonfig";
                        break;
                    default:
                        alert("function mainMenuNav(element): \nAn invalid argument has been passed!")
                }
                tabControlNav(b)
            } else $("#tabsAnlagenverwaltung, #anlagenverwaltung").css("display",
                "none");
            "pmMenu" == a ? $("#tabsPruefungsverwaltung, #pruefungsverwaltung").css("display", "block") : $("#tabsPruefungsverwaltung, #pruefungsverwaltung").css("display", "none");
            "msmMenu" == a ? ($("#tabsEditor").css("display", "none"), $("#tabsMessmittelverwaltung, #messmittelverwaltung, #stammdaten").css("display", "block"), tabControlNav("tabMsm"), $("#verwaltung").val("Msm")) : $("#tabsMessmittelverwaltung, #messmittelverwaltung").css("display", "none");
            if ("prdMenu" == a || "prd_Menu" == a || "prd_Konfig_Menu" == a || "prd_Hist_Menu" ==
                a) {
                $("#tabsEditor").css("display", "none");
                $("#tabsProdukteverwaltung, #produkteverwaltung, #stammdaten").css("display", "block");
                erweiterungenProdukteEinlesen();
                $("#verwaltung").val("Prd");
                b = "";
                switch (a) {
                    case "prdMenu":
                    case "prd_Menu":
                        b = "tabPrd";
                        break;
                    case "prd_Konfig_Menu":
                        b = "tabPrd_konfig";
                        break;
                    case "prd_Hist_Menu":
                        b = "tabPrd_historie";
                        break;
                    default:
                        alert("function mainMenuNav(element): \nAn invalid argument has been passed!")
                }
                tabControlNav(b)
            } else $("#tabsProdukteverwaltung, #produkteverwaltung").css("display",
                "none");
            "knz_almMenu" == a || "knzMenu" == a || "almMenu" == a ? ($("#tabsEditor").css("display", "none"), $("#tabsKennzahlenAlarme, #kennzahlenAlarme, #stammdaten").css("display", "block"), "knz_almMenu" == a || "knzMenu" == a ? (erweiterungenProdukteEinlesen(), tabControlNav("tabKnz")) : "almMenu" == a && tabControlNav("tabAlm")) : $("#tabsKennzahlenAlarme, #kennzahlenAlarme").css("display", "none");
            "erwPrdMenu" == a || "erwAnlMenu" == a || "entMenu" == a || "enfMenu" == a || "gsfMenu" == a || "mgsMenu" == a || "zpMenu" == a || "grpDiagMenu" == a || "schtDatMenu" === a || "korrekturFaktorMenu" == a || "korrekturFaktorMenuDynamischer" == a ? ($("#tabsOptionen, #optionen").css("display",
                "block"), $('.navigation_controls').hide(), $("#tabsUnternehmensstruktur, #tabsEditor").css("display", "none"), $("#tabsBasisdaten").css("display", "block"), "entMenu" == a || "enfMenu" == a ? (tabControlNav("tabEng"), $('.no_korrector_tabs').show()) : "gsfMenu" == a ? tabControlNav("tabGsf") : "mgsMenu" == a ? tabControlNav("tabMgs") : "zpMenu" == a ? (tabControlNav("tabZp"), $('.no_korrector_tabs').show()) : "erwAnlMenu" == a ? (tabControlNav("tabEAnl"), $('.no_korrector_tabs').show()) : "grpDiagMenu" == a ? (tabControlNav("tabGrpDiag"), $('.no_korrector_tabs').show()) : "schtDatMenu" === a ? (tabControlNav("tabSchtDat"), $('.no_korrector_tabs').show()) : "korrekturFaktorMenu" == a ? (tabControlNav("tabTaschenrechner"), $('.no_korrector_tabs').hide(), $('#tabTaschenrechner').show(), $('#tabDynamicKorrekturFktr').hide(), getStatischeKorrekturfaktoren()) : "korrekturFaktorMenuDynamischer" == a ? (tabControlNav("tabDynamicKorrekturFktr"), $('.no_korrector_tabs').hide(), $('#tabTaschenrechner').hide(), $('#tabDynamicKorrekturFktr').show()) : "erwPrdMenu" == a && (tabControlNav("tabEPrd"), $('.no_korrector_tabs').show())) : $("#tabsOptionen, #optionen").css("display", "none");
            "intEngIMwMenu" == a || "intBdeIMwMenu" == a || "extRngMenu" ==
                a || "eRngVergleichMenu" == a ? ($("#tabsEditor").css("display", "none"), $("#tabsManuell").css("display", "block"), "intEngIMwMenu" == a || "intBdeIMwMenu" == a ? ($("#tabsIntMesswerte").css("display", "block"), "intEngIMwMenu" == a ? (tabControlNav("tabIntEnergiedatenIMw"),$("#tabIntBetriebsdatenIMw").css("display", "none"),$("#tabIntBetriebsdatenIMwHist").css("display", "none"),$("#tabIntEnergiedatenIMw").css("display", "block"),$("#verwaltung").val("intEngIMw")) : "intBdeIMwMenu" == a && (tabControlNav("tabIntBetriebsdatenIMw"),$("#tabIntBetriebsdatenIMw").css("display", "block"),$("#tabIntBetriebsdatenIMwHist").css("display", "block"),$("#tabIntEnergiedatenIMw").css("display", "none"), $("#verwaltung").val("intBdeIMw"))) : $("#tabsIntMesswerte").css("display", "none"), "extRngMenu" == a || "eRngVergleichMenu" == a ? ($("#tabsEditor").css("display",
                    "none"), $("#tabsExterneRechnungen").css("display", "block"), "extRngMenu" == a ? (tabControlNav("tabExtRechnungen"), $("#verwaltung").val("ERng")) : "eRngVergleichMenu" == a && (tabControlNav("tabAusw_eRng_iMw"), $("#verwaltung").val("AusERng"))) : $("#tabsExterneRechnungen").css("display", "none")) : $("#tabsManuell").css("display", "none")
        }, setAnlagenTbl2 = function() {
            return $("#tblAnlagenListe2").DataTable({
                dom: "Bfrtip",
                buttons: [{
                    extend: "excel",
                    text: "Excel-Export",
                    exportOptions: {
                        columns: ":visible"
                    }
                }, {
                    extend: "pdf",
                    text: "PDF-Export",
                    exportOptions: {
                        columns: ":visible"
                    }
                }, {
                    extend: "print",
                    text: "Drucken",
                    exportOptions: {
                        columns: ":visible"
                    },
                    title: "<h2>" + $(".manPfad").text() + "</h2><h3 style='display:inline-block;'>Anlagenliste vom " + d.getDate() + "." + (d.getMonth() + 1) + "." + d.getFullYear() + "</h2><img id='logo' src='images/g_analysisNeu6.png' alt='G-Analysis Logo' style='clear:right; float:right;height:50px;width:150px;'><div style='height:20px;margin:0px;'></div>"
                }],
                pageLength: 15,
                bAutoWidth: !1,
                colReorder: !0,
                bDestroy: !0
            })
        }, getAnlagenAuswahlTblHeader =
        function() {
            anlagenGruppenEinlesen()
        };
    $(function() {
        $("#tabsTblsBerEdit, #tabsDetailsKnzs").tabs()
    });
    var d = new Date,
        tblInstanzMstSuchen = $("#tblInstanzMstSuchen").DataTable({
            dom: "Bfrtip",
            buttons: [],
            pageLength: 15,
            bAutoWidth: !1,
            colReorder: !0
        }),
        tblformelSuchen = $("#tblformelSuchen").DataTable({
            dom: "Bfrtip",
            buttons: [{
                extend: "copy",
                text: "Kopieren",
                exportOptions: {
                    columns: ":visible"
                }
            }, {
                extend: "csv",
                text: "CSV-Export",
                exportOptions: {
                    columns: ":visible"
                }
            }, {
                extend: "print",
                text: "Drucken",
                exportOptions: {
                    columns: ":visible"
                }
            }],
            pageLength: 15,
            bAutoWidth: !1,
            colReorder: !0
        }),
        tblGespDiagrammeListe = $("#tblGespDiagrammeListe").DataTable({
            dom: "Bfrtip",
            buttons: [{
                extend: "copy",
                text: "Kopieren",
                exportOptions: {
                    columns: ":visible"
                }
            }, {
                extend: "csv",
                text: "CSV-Export",
                exportOptions: {
                    columns: ":visible"
                }
            }, {
                extend: "print",
                text: "Drucken",
                exportOptions: {
                    columns: ":visible"
                }
            }],
            pageLength: 15,
            bAutoWidth: !1,
            colReorder: !0
        }),
        tblEinheitenKnzs = $("#tblEinheitenKnzs").DataTable({
            dom: "Bfrtip",
            buttons: [],
            pageLength: 15,
            bAutoWidth: !0,
            bFilter: !1,
            bPaginate: !1,
            lengthChange: !1,
            ordering: !1,
            oLanguage: {
                sInfo: "",
                sInfoEmpty: ""
            }
        }),
        tblKennzahlInstanzAuswahl = $("#tblKennzahlInstanzAuswahl").DataTable({
            dom: "Bfrtip",
            buttons: [{
                extend: "copy",
                text: "Kopieren",
                exportOptions: {
                    columns: ":visible"
                }
            }, {
                extend: "csv",
                text: "CSV-Export",
                exportOptions: {
                    columns: ":visible"
                }
            }, {
                extend: "print",
                text: "Drucken",
                exportOptions: {
                    columns: ":visible"
                }
            }],
            pageLength: 15,
            bAutoWidth: !1,
            colReorder: !0
        }), // Just for showing Raj GitHub...ok got it, thanks sinan :)
        tblKennzahlAuswahl = $("#tblKennzahlAuswahl").DataTable({
            dom: "Bfrtip",
            buttons: [{
                extend: "copy",
                text: "Kopieren",
                exportOptions: {
                    columns: ":visible"
                }
            }, {
                extend: "csv",
                text: "CSV-Export",
                exportOptions: {
                    columns: ":visible"
                }
            }, {
                extend: "print",
                text: "Drucken",
                exportOptions: {
                    columns: ":visible"
                }
            }],
            pageLength: 15,
            bAutoWidth: !1,
            colReorder: !0
        }),
        tblSpezKennzahlSuchen = $("#tblSpezKennzahlSuchen").DataTable({
            dom: "Bfrtip",
            buttons: [{
                extend: "copy",
                text: "Kopieren",
                exportOptions: {
                    columns: ":visible"
                }
            }, {
                extend: "csv",
                text: "CSV-Export",
                exportOptions: {
                    columns: ":visible"
                }
            }, {
                extend: "print",
                text: "Drucken",
                exportOptions: {
                    columns: ":visible"
                }
            }],
            pageLength: 15,
            bAutoWidth: !1,
            colReorder: !0
        }),
        tblChannelZuordnungProdSuchen = $("#tblChannelZuordnungProdSuchen").DataTable({
            dom: "Bfrtip",
            buttons: [{
                extend: "copy",
                text: "Kopieren",
                exportOptions: {
                    columns: ":visible"
                }
            }, {
                extend: "csv",
                text: "CSV-Export",
                exportOptions: {
                    columns: ":visible"
                }
            }, {
                extend: "print",
                text: "Drucken",
                exportOptions: {
                    columns: ":visible"
                }
            }],
            pageLength: 15,
            bAutoWidth: !1,
            colReorder: !0
        });
    tblTabellenProdSuchen = $("#tblTabellenProdSuchen").DataTable({
        dom: "Bfrtip",
        buttons: [{
            extend: "copy",
            text: "Kopieren",
            exportOptions: {
                columns: ":visible"
            }
        }, {
            extend: "csv",
            text: "CSV-Export",
            exportOptions: {
                columns: ":visible"
            }
        }, {
            extend: "print",
            text: "Drucken",
            exportOptions: {
                columns: ":visible"
            }
        }],
        pageLength: 15,
        bAutoWidth: !1,
        colReorder: !0
    });
    tblVorlagenformelnSuchen = $("#tblVorlagenformelnSuchen").DataTable({
        displayom: "Bfrtip",
        buttons: [{
            extend: "copy",
            text: "Kopieren",
            exportOptions: {
                columns: ":visible"
            }
        }, {
            extend: "csv",
            text: "CSV-Export",
            exportOptions: {
                columns: ":visible"
            }
        }, {
            extend: "print",
            text: "Drucken",
            exportOptions: {
                columns: ":visible"
            }
        }],
        pageLength: 15,
        bAutoWidth: !1,
        colReorder: !0
    });
    tblKennzahlInstanzSuchen = $("#tblKennzahlInstanzSuchen").DataTable({
        dom: "Bfrtip",
        buttons: [{
            extend: "copy",
            text: "Kopieren",
            exportOptions: {
                columns: ":visible"
            }
        }, {
            extend: "csv",
            text: "CSV-Export",
            exportOptions: {
                columns: ":visible"
            }
        }, {
            extend: "print",
            text: "Drucken",
            exportOptions: {
                columns: ":visible"
            }
        }],
        pageLength: 15,
        bAutoWidth: !1,
        colReorder: !0
    });
    tblVorlFrmZuordnen = $("#tblVorlFrmZuordnen").DataTable({
        dom: "Bfrtip",
        buttons: [],
        pageLength: 15,
        bAutoWidth: !1,
        colReorder: !0
    });
    tblProdukte = $("#tblProdukte").DataTable({
        dom: "Bfrtip",
        buttons: [],
        pageLength: 15,
        bAutoWidth: !1,
        colReorder: !0
    });
    /*Correction Factor draw datatable 13-02-2020*/
    tblKorrekturfaktor = $("#tblKorrekturfaktor").DataTable({
        dom: "Bfrtip",
        buttons: [],
        pageLength: 15,
        bAutoWidth: !1,
        colReorder: !0
    });
    /*Correction Factor draw datatable 13-02-2020*/
    tblBdeDynBerechnungseditor = $("#tblBdeDynBerechnungseditor").DataTable({
        dom: "Bfrtip",
        buttons: [],
        pageLength: 15,
        bAutoWidth: !1,
        colReorder: !0
    });
    tblProdukteFenster = $("#tblProdukteFenster").DataTable({
        dom: "Bfrtip",
        buttons: [],
        pageLength: 15,
        bAutoWidth: !1,
        colReorder: !0
    });
    tblFormeln = $("#tblFormeln").DataTable({
        dom: "Bfrtip",
        buttons: [],
        pageLength: 15,
        bAutoWidth: !1,
        colReorder: !0
    });
    tblProdukteSuchen = $("#tblProdukteSuchen").DataTable({
        dom: "Bfrtip",
        buttons: [{
            extend: "copy",
            text: "Kopieren",
            exportOptions: {
                columns: ":visible"
            }
        }, {
            extend: "csv",
            text: "CSV-Export",
            exportOptions: {
                columns: ":visible"
            }
        }, {
            extend: "print",
            text: "Drucken",
            exportOptions: {
                columns: ":visible"
            }
        }],
        pageLength: 15,
        bAutoWidth: !1,
        colReorder: !0
    });
    tblInstanzAnlSuchen = $("#tblInstanzAnlSuchen").DataTable({
        dom: "Bfrtip",
        buttons: [],
        pageLength: 15,
        bAutoWidth: !1,
        colReorder: !0
    });
    tblInstanzPrdSuchen = $("#tblInstanzPrdSuchen").DataTable({
        dom: "Bfrtip",
        buttons: [],
        pageLength: 15,
        bAutoWidth: !1,
        colReorder: !0
    });
    tblMessstellenKnz = $("#tblMessstellenKnz").DataTable({
        dom: "Bfrtip",
        buttons: [],
        pageLength: 15,
        bAutoWidth: !1,
        colReorder: !0
    });
    tblKennzahl = $("#tblKennzahl").DataTable({
        dom: "Bfrtip",
        buttons: [],
        pageLength: 15,
        bAutoWidth: !1,
        colReorder: !0
    });
    tblAnlOhneZeitintervallIMw = $("#tblAnlOhneZeitintervallIMw").DataTable({
        dom: "Bfrtip",
        buttons: [],
        pageLength: 15,
        bAutoWidth: !1,
        colReorder: !0,
         language: {
            emptyTable: "Loading...."
        }
    });
     tblAnlOhneZeitintervallIMwSuchen = $("#tblAnlOhneZeitintervallIMwSuchen").DataTable({
        dom: "Bfrtip",
        buttons: [],
        pageLength: 15,
        bAutoWidth: !1,
        colReorder: !0
    });
    tblMstOhneZeitintervallIMwPrdktSuche = $("#tblMstOhneZeitintervallIMwPrdktSuche").DataTable({
        dom: "Bfrtip",
        buttons: [],
        pageLength: 15,
        bAutoWidth: !1,
        colReorder: !0
    });
    tblMstOhneZeitintervallIMwMessstelleSuche = $("#tblMstOhneZeitintervallIMwMessstelleSuche").DataTable({
        dom: "Bfrtip",
        buttons: [],
        pageLength: 15,
        bAutoWidth: !1,
        colReorder: !0
    });
    tblMstOhneZeitintervallIMw = $("#tblMstOhneZeitintervallIMw").DataTable({
        dom: "Bfrtip",
        buttons: [],
        pageLength: 15,
        bAutoWidth: !1,
        colReorder: !0
    });
    /*new-mm-start 22-03-2021*/
    tblMstOhneZeitintervallIMwMessstelle = $("#tblMstOhneZeitintervallIMwMessstelle").DataTable({
        dom: "Bfrtip",
        buttons: [],
        pageLength: 15,
        bAutoWidth: !1,
        colReorder: !0
    });
    tblMstOhneZeitintervallIMwIE = $("#tblMstOhneZeitintervallIMwIE").DataTable({
        dom: "Bfrtip",
        buttons: [],
        pageLength: 15,
        bAutoWidth: !1,
        colReorder: !0
    });
    /*new-mm-end 22-03-2021*/
    tblVerbrauchsdatenExp = $("#tblVerbrauchsdatenExp").DataTable({
        dom: "Bfrtip",
        buttons: [{
            extend: "copy",
            text: "Kopieren",
            exportOptions: {
                columns: ":visible"
            }
        }, {
            extend: "csv",
            text: "CSV-Export",
            exportOptions: {
                columns: ":visible"
            }
        }, {
            extend: "print",
            text: "Drucken",
            exportOptions: {
                columns: ":visible"
            }
        }],
        pageLength: 45,
        bAutoWidth: !1,
        colReorder: !0
    });
    tblIntEngMasseneingabe = $("#tblIntEngMasseneingabe").DataTable({
        dom: "Bfrtip",
        buttons: [],
        pageLength: 15,
        bAutoWidth: !1,
        colReorder: !0
    });
    tblMessstellenBerechnungseditor = $("#tblMessstellenBerechnungseditor").DataTable({
        dom: "Bfrtip",
        buttons: [],
        pageLength: 15,
        bAutoWidth: !1,
        colReorder: !0
    });
    tblAnlagenBerechnungseditor = $("#tblAnlagenBerechnungseditor").DataTable({
        dom: "Bfrtip",
        buttons: [],
        pageLength: 15,
        bAutoWidth: !1,
        colReorder: !0
    });
    tblInterneMesswerteBerechnungseditor = $("#tblInterneMesswerteBerechnungseditor").DataTable({
        dom: "Bfrtip",
        buttons: [],
        pageLength: 15,
        bAutoWidth: !1,
        colReorder: !0
    });
    tblBetriebsdatenBerechnungseditor = $("#tblBetriebsdatenBerechnungseditor").DataTable({
        dom: "Bfrtip",
        buttons: [],
        pageLength: 15,
        bAutoWidth: !1,
        colReorder: !0
    });
    tblHistorieAnl = $("#tblHistorieAnl").DataTable({
        dom: "Bfrtip",
        buttons: [{
            extend: "print",
            text: "Drucken",
            exportOptions: {
                columns: ":visible"
            }
        }],
        pageLength: 15,
        bAutoWidth: !1,
        colReorder: !0
    });
    tblHistorieIntBdeIMw = $("#tblHistorieIntBdeIMw").DataTable({
        dom: "Bfrtip",
        buttons: [],
        pageLength: 15,
        bAutoWidth: !1,
        colReorder: !0
    });
    /*new-mm-start 23-03-2021*/
    tblHistorieIntBdeIMwPrdkt = $("#tblHistorieIntBdeIMwPrdkt").DataTable({
        dom: "Bfrtip",
        buttons: [],
        pageLength: 15,
        bAutoWidth: !1,
        colReorder: !0
    });
    tblHistorieIntBdeIMwMesssetelle = $("#tblHistorieIntBdeIMwMesssetelle").DataTable({
        dom: "Bfrtip",
        buttons: [],
        pageLength: 15,
        bAutoWidth: !1,
        colReorder: !0
    });
    /*new-mm-end 23-03-2021*/
    tblHistoriePrd = $("#tblHistoriePrd").DataTable({
        dom: "Bfrtip",
        buttons: [{
            extend: "print",
            text: "Drucken",
            exportOptions: {
                columns: ":visible"
            }
        }],
        pageLength: 15,
        bAutoWidth: !1,
        colReorder: !0
    });
    tblVersorgerHistorie = $("#tblVersorgerHistorie").DataTable({
        dom: "Bfrtip",
        buttons: [],
        pageLength: 15,
        bAutoWidth: !0,
        bFilter: !1,
        bPaginate: !1,
        lengthChange: !1,
        ordering: !0,
        oLanguage: {
            sInfo: "",
            sInfoEmpty: ""
        }
    });
    tblBerechnungAuswElem = $("#tblBerechnungAuswElem").DataTable({
        dom: "Bfrtip",
        buttons: [],
        pageLength: 15,
        bAutoWidth: !0,
        bFilter: !1,
        bPaginate: !1,
        lengthChange: !1,
        ordering: !1,
        oLanguage: {
            sInfo: "",
            sInfoEmpty: ""
        }
    });

    tblOptionenEPrd = $("#tblOptionenEPrd").DataTable({
        dom: "Bfrtip",
        buttons: [],
        pageLength: 15,
        bAutoWidth: !0,
        bFilter: !1,
        bPaginate: !1,
        lengthChange: !1,
        ordering: !1,
        oLanguage: {
            sInfo: "",
            sInfoEmpty: ""
        }
    });
    /*19-02-2020 Create Correction factor form and display data (Datatable settings),23-03-2020 add data-id on to first row*/
    tblOptionenEPrdKff = $("#tblOptionenEPrdKff").DataTable({
        paging: false,
        searching: false,
        dom: "Bfrtip",
        buttons: [],
        pageLength: 15,
        bAutoWidth: !1,
        colReorder: !0,
        'createdRow': function(row, data, dataIndex) {
            $(row).find('td:eq(0)').attr('data-id', $("#ePrdIdStore").val());
        }
    });
    /*19-02-2020 Create Correction factor form and display data (Datatable settings),23-03-2020 add data-id on to first row*/
    /*20-03-2020 get Correction factor (Datatable settings)*/
    tblGetStatischeKorrekturfaktoren = $("#tblGetStatischeKorrekturfaktoren").DataTable({
        dom: "Bfrtip",
        buttons: [],
        pageLength: 15,
        bAutoWidth: !1,
        colReorder: !0
    });
    /*20-03-2020 get Correction factor (Datatable settings)*/
    /*03-04-2020 get Dynamic Correction factor (Datatable settings)*/
    tblGetDyanamicheKorrekturfaktoren = $("#tblGetDyanamicheKorrekturfaktoren").DataTable({
        dom: "Bfrtip",
        scrollX: true,
        buttons: [],
        pageLength: 15,
        bAutoWidth: !1,
        colReorder: !0,
        bSort : false
    });

    /*03-04-2020 get Dynamic Correction factor (Datatable settings)*/
    /*06-04-2020 Create Dynamic Correction factor form and display data (Datatable settings)*/
    tblOptionenEPrdDKff = $("#tblOptionenEPrdDKff").DataTable({
        paging: false,
        scrollX: true,
        searching: false,
        dom: "Bfrtip",
        buttons: [],
        pageLength: 15,
        bAutoWidth: !1,
        colReorder: !0,
        bSort : false,
        createdRow: function(row, data, dataIndex) {
            $(row).find("td:eq(0)").attr("data-id", $("#ePrdIdStore").val());
            $(row).attr("data-type", "");
        }
    });

    /*06-04-2020 Create Dynamic Correction factor form and display data (Datatable settings)*/
    /*14-04-2020 Create Dynamic Correction factor search icon display dataTable (Datatable settings)*/
     tblGetDyanamicheKorrekturfaktorenParent = $("#tblGetDyanamicheKorrekturfaktorenParent").DataTable({
        dom: "Bfrtip",
        buttons: [ /*{
            extend: "copy",
            text: "Kopieren",
            exportOptions: {
                columns: ":visible"
            }
        }, {
            extend: "csv",
            text: "CSV-Export",
            exportOptions: {
                columns: ":visible"
            }
        }, {
            extend: "print",
            text: "Drucken",
            exportOptions: {
                columns: ":visible"
            }
        } */],
        pageLength: 50,
        bAutoWidth: !1,
        colReorder: !0
    });
    /*14-04-2020 Create Dynamic Correction factor search icon display dataTable (Datatable settings)*/
tblOptionenEAnl = $("#tblOptionenEAnl").DataTable({
        dom: "Bfrtip",
        buttons: [],
        pageLength: 15,
        bAutoWidth: !0,
        bFilter: !1,
        bPaginate: !1,
        lengthChange: !1,
        ordering: !1,
        oLanguage: {
            sInfo: "",
            sInfoEmpty: ""
        }
    });
    tblGruppenDiag = $("#tblGruppenDiag").DataTable({
        dom: "Bfrtip",
        buttons: [],
        pageLength: 15,
        bAutoWidth: !0,
        bFilter: !1,
        bPaginate: !1,
        lengthChange: !1,
        ordering: !1,
        oLanguage: {
            sInfo: "",
            sInfoEmpty: ""
        }
    });
    tblEnergietraegerSuchen = $("#tblEnergietraegerSuchen").DataTable({
        dom: "Bfrtip",
        buttons: [{
            extend: "copy",
            text: "Kopieren",
            exportOptions: {
                columns: ":visible"
            }
        }, {
            extend: "csv",
            text: "CSV-Export",
            exportOptions: {
                columns: ":visible"
            }
        }, {
            extend: "print",
            text: "Drucken",
            exportOptions: {
                columns: ":visible"
            }
        }],
        pageLength: 15,
        bAutoWidth: !1,
        colReorder: !0
    });
    tblEnergieformenSuchen = $("#tblEnergieformenSuchen").DataTable({
        dom: "Bfrtip",
        buttons: [{
            extend: "copy",
            text: "Kopieren",
            exportOptions: {
                columns: ":visible"
            }
        }, {
            extend: "csv",
            text: "CSV-Export",
            exportOptions: {
                columns: ":visible"
            }
        }, {
            extend: "print",
            text: "Drucken",
            exportOptions: {
                columns: ":visible"
            }
        }],
        pageLength: 15,
        bAutoWidth: !1,
        colReorder: !0
    });
    tblStandorteSuchen = $("#tblStandorteSuchen").DataTable({
        dom: "Bfrtip",
        buttons: [{
            extend: "copy",
            text: "Kopieren",
            exportOptions: {
                columns: ":visible"
            }
        }, {
            extend: "csv",
            text: "CSV-Export",
            exportOptions: {
                columns: ":visible"
            }
        }, {
            extend: "print",
            text: "Drucken",
            exportOptions: {
                columns: ":visible"
            }
        }],
        pageLength: 15,
        bAutoWidth: !1,
        colReorder: !0
    });
    tblStandorteDritterSuchen = $("#tblStandorteDritterSuchen").DataTable({
        dom: "Bfrtip",
        buttons: [{
            extend: "copy",
            text: "Kopieren",
            exportOptions: {
                columns: ":visible"
            }
        }, {
            extend: "csv",
            text: "CSV-Export",
            exportOptions: {
                columns: ":visible"
            }
        }, {
            extend: "print",
            text: "Drucken",
            exportOptions: {
                columns: ":visible"
            }
        }],
        pageLength: 15,
        bAutoWidth: !1,
        colReorder: !0
    });
    tblLiegenschaftenSuchen = $("#tblLiegenschaftenSuchen").DataTable({
        dom: "Bfrtip",
        buttons: [{
            extend: "copy",
            text: "Kopieren",
            exportOptions: {
                columns: ":visible"
            }
        }, {
            extend: "csv",
            text: "CSV-Export",
            exportOptions: {
                columns: ":visible"
            }
        }, {
            extend: "print",
            text: "Drucken",
            exportOptions: {
                columns: ":visible"
            }
        }],
        pageLength: 15,
        bAutoWidth: !1,
        colReorder: !0
    });
    tblExtDurchleitungenSuchen = $("#tblExtDurchleitungenSuchen").DataTable({
        dom: "Bfrtip",
        buttons: [{
            extend: "copy",
            text: "Kopieren",
            exportOptions: {
                columns: ":visible"
            }
        }, {
            extend: "csv",
            text: "CSV-Export",
            exportOptions: {
                columns: ":visible"
            }
        }, {
            extend: "print",
            text: "Drucken",
            exportOptions: {
                columns: ":visible"
            }
        }],
        pageLength: 15,
        bAutoWidth: !1,
        colReorder: !0
    });
    tblMandantenAuswahl = $("#tblMandantenAuswahl").DataTable({
        dom: "Bfrtip",
        buttons: [],
        pageLength: 15,
        bAutoWidth: !0,
        bFilter: !1,
        bPaginate: !1,
        lengthChange: !1,
        ordering: !1,
        oLanguage: {
            sInfo: "",
            sInfoEmpty: ""
        }
    });
    tblMandantengruppe = $("#tblMandantengruppe").DataTable({
        dom: "Bfrtip",
        buttons: [],
        pageLength: 15,
        bAutoWidth: !0,
        bFilter: !1,
        bPaginate: !1,
        lengthChange: !1,
        ordering: !1,
        oLanguage: {
            sInfo: "",
            sInfoEmpty: ""
        }
    });
    tblStdDrAuswahl = $("#tblStdDrAuswahl").DataTable({
        dom: "Bfrtip",
        buttons: [{
            extend: "copy",
            text: "Kopieren",
            exportOptions: {
                columns: ":visible"
            }
        }, {
            extend: "csv",
            text: "CSV-Export",
            exportOptions: {
                columns: ":visible"
            }
        }, {
            extend: "print",
            text: "Drucken",
            exportOptions: {
                columns: ":visible"
            }
        }],
        pageLength: 15,
        bAutoWidth: !1,
        colReorder: !0
    });
    tblAuswertung1ERng = $("#tblAuswertung1ERng").DataTable({
        dom: "Bfrtip",
        buttons: [],
        pageLength: 12,
        bAutoWidth: !1,
        colReorder: !0,
        oLanguage: {
            sInfo: "",
            sInfoEmpty: "",
            oPaginate: {
                sNext: "",
                sPrevious: ""
            }
        }
    });
    tblAuswertung2ERng = $("#tblAuswertung2ERng").DataTable({
        dom: "Bfrtip",
        buttons: [],
        pageLength: 12,
        bAutoWidth: !1,
        colReorder: !0,
        oLanguage: {
            sInfo: "",
            sInfoEmpty: "",
            oPaginate: {
                sNext: "",
                sPrevious: ""
            }
        }
    });
    tblExterneRechnungenSuchen = $("#tblExterneRechnungenSuchen").DataTable({
        dom: "Bfrtip",
        buttons: [{
            extend: "copy",
            text: "Kopieren",
            exportOptions: {
                columns: ":visible"
            }
        }, {
            extend: "csv",
            text: "CSV-Export",
            exportOptions: {
                columns: ":visible"
            }
        }, {
            extend: "print",
            text: "Drucken",
            exportOptions: {
                columns: ":visible"
            },
            title: "<h2>" + $(".manPfad").text() + "</h2><h3 style='display:inline-block;'>Rechnungsliste vom " + d.getDate() + "." + (d.getMonth() + 1) + "." + d.getFullYear() + "</h2><img id='logo' src='images/g_analysisNeu6.png' alt='G-Analysis Logo' style='clear:right; float:right;height:50px;width:150px;'><div style='height:20px;margin:0px;'></div>"
        }],
        pageLength: 25,
        bAutoWidth: !1,
        colReorder: !0
    });
    tblMessmittel = $("#tblMessmittel").DataTable({
        dom: "Bfrtip",
        buttons: [{
            extend: "copy",
            text: "Kopieren",
            exportOptions: {
                columns: ":visible"
            }
        }, {
            extend: "csv",
            text: "CSV-Export",
            exportOptions: {
                columns: ":visible"
            }
        }, {
            extend: "print",
            text: "Drucken",
            exportOptions: {
                columns: ":visible"
            }
        }],
        pageLength: 15,
        bAutoWidth: !1,
        colReorder: !0
    });
    tblMessmittelSuchen = $("#tblMessmittelSuchen").DataTable({
        dom: "Bfrtip",
        buttons: [{
            extend: "copy",
            text: "Kopieren",
            exportOptions: {
                columns: ":visible"
            }
        }, {
            extend: "csv",
            text: "CSV-Export",
            exportOptions: {
                columns: ":visible"
            }
        }, {
            extend: "print",
            text: "Drucken",
            exportOptions: {
                columns: ":visible"
            }
        }],
        pageLength: 15,
        bAutoWidth: !1,
        colReorder: !0
    });
    tblLetzteRechnungen = $("#tblLetzteRngs").DataTable({
        dom: "Bfrtip",
        buttons: [],
        pageLength: 15,
        bAutoWidth: !0,
        bFilter: !1,
        bPaginate: !1,
        lengthChange: !1,
        ordering: !1,
        oLanguage: {
            sInfo: "",
            sInfoEmpty: ""
        }
    });
    tblChannel = $("#channelliste").DataTable({
        dom: "Bfrtip",
        buttons: [{
            extend: "copy",
            text: "Kopieren",
            exportOptions: {
                columns: ":visible"
            }
        }, {
            extend: "csv",
            text: "CSV-Export",
            exportOptions: {
                columns: ":visible"
            }
        }, {
            extend: "print",
            text: "Drucken",
            exportOptions: {
                columns: ":visible"
            }
        }],
        pageLength: 15,
        bAutoWidth: !1,
        colReorder: !0
    });
    tblMessstellenSuchen = $("#tblMessstellenSuchen").DataTable({
        dom: "Bfrtip",
        buttons: [{
            extend: "copy",
            text: "Kopieren",
            exportOptions: {
                columns: ":visible"
            }
        }, {
            extend: "csv",
            text: "CSV-Export",
            exportOptions: {
                columns: ":visible"
            }
        }, {
            extend: "print",
            text: "Drucken",
            exportOptions: {
                columns: ":visible"
            }
        }],
        pageLength: 50,
        bAutoWidth: !1,
        colReorder: !0
    });
    tblOrganisationenSuchen = $("#tblOrganisationenSuchen").DataTable({
        dom: "Bfrtip",
        buttons: [{
            extend: "copy",
            text: "Kopieren",
            exportOptions: {
                columns: ":visible"
            }
        }, {
            extend: "csv",
            text: "CSV-Export",
            exportOptions: {
                columns: ":visible"
            }
        }, {
            extend: "print",
            text: "Drucken",
            exportOptions: {
                columns: ":visible"
            }
        }],
        pageLength: 50,
        bAutoWidth: !1,
        colReorder: !0
    });
    tblBereichAussuchen = $("#tblBereichelisteBer").DataTable({
        dom: "Bfrtip",
        buttons: [{
            extend: "copy",
            text: "Kopieren",
            exportOptions: {
                columns: ":visible"
            }
        }, {
            extend: "csv",
            text: "CSV-Export",
            exportOptions: {
                columns: ":visible"
            }
        }, {
            extend: "print",
            text: "Drucken",
            exportOptions: {
                columns: ":visible"
            }
        }],
        pageLength: 20,
        bAutoWidth: !1,
        colReorder: !0
    });
    tblBereicheSuchen = $("#tblBereicheSuchen").DataTable({
        dom: "Bfrtip",
        buttons: [{
            extend: "copy",
            text: "Kopieren",
            exportOptions: {
                columns: ":visible"
            }
        }, {
            extend: "csv",
            text: "CSV-Export",
            exportOptions: {
                columns: ":visible"
            }
        }, {
            extend: "print",
            text: "Drucken",
            exportOptions: {
                columns: ":visible"
            }
        }],
        pageLength: 20,
        bAutoWidth: !1,
        colReorder: !0
    });
    tblMessstellenCat = $("#tblMessstellenCat").DataTable({
        dom: "Bfrtip",
        buttons: [/*{
            extend: "copy",
            text: "Kopieren",
            exportOptions: {
                columns: ":visible"
            }
        }, {
            extend: "csv",
            text: "CSV-Export",
            exportOptions: {
                columns: ":visible"
            }
        }, {
            extend: "print",
            text: "Drucken",
            exportOptions: {
                columns: ":visible"
            }
        }*/],
        pageLength: 20,
        bAutoWidth: !1,
        colReorder: !0
    });
    tblMessstellenCat2 = $("#tblMessstellenCat2").DataTable({
        dom: "Bfrtip",
        buttons: [/*{
            extend: "copy",
            text: "Kopieren",
            exportOptions: {
                columns: ":visible"
            }
        }, {
            extend: "csv",
            text: "CSV-Export",
            exportOptions: {
                columns: ":visible"
            }
        }, {
            extend: "print",
            text: "Drucken",
            exportOptions: {
                columns: ":visible"
            }
        }*/],
        pageLength: 20,
        bAutoWidth: !1,
        colReorder: !0
    });
    tblExtDurchleitungenAuswahl = $("#tblExtDurchleitungenAuswahl").DataTable({
        dom: "Bfrtip",
        buttons: [{
            extend: "copy",
            text: "Kopieren",
            exportOptions: {
                columns: ":visible"
            }
        }, {
            extend: "csv",
            text: "CSV-Export",
            exportOptions: {
                columns: ":visible"
            }
        }, {
            extend: "print",
            text: "Drucken",
            exportOptions: {
                columns: ":visible"
            }
        }],
        pageLength: 20,
        bAutoWidth: !1,
        colReorder: !0
    });
    tblStandorteAuswahl = $("#tblStandorteAuswahl").DataTable({
        dom: "Bfrtip",
        buttons: [{
            extend: "copy",
            text: "Kopieren",
            exportOptions: {
                columns: ":visible"
            }
        }, {
            extend: "csv",
            text: "CSV-Export",
            exportOptions: {
                columns: ":visible"
            }
        }, {
            extend: "print",
            text: "Drucken",
            exportOptions: {
                columns: ":visible"
            }
        }],
        pageLength: 20,
        bAutoWidth: !1,
        colReorder: !0
    });
    tblMessstelleAuswahl = $("#tblMessstellenlisteMst").DataTable({
        dom: "Bfrtip",
        buttons: [{
                extend: "copy",
                text: "Kopieren",
                exportOptions: {
                    columns: ":visible"
                }
            },
            {
                extend: "csv",
                text: "CSV-Export",
                exportOptions: {
                    columns: ":visible"
                }
            }, {
                extend: "print",
                text: "Drucken",
                exportOptions: {
                    columns: ":visible"
                }
            }
        ],
        pageLength: 20,
        bAutoWidth: !1,
        colReorder: !0
    });
    tblEAnlSuchen = $("#tblEAnlSuchen").DataTable({
        dom: "Bfrtip",
        buttons: [{
                extend: "copy",
                text: "Kopieren",
                exportOptions: {
                    columns: ":visible"
                }
            },
            {
                extend: "csv",
                text: "CSV-Export",
                exportOptions: {
                    columns: ":visible"
                }
            }, {
                extend: "print",
                text: "Drucken",
                exportOptions: {
                    columns: ":visible"
                }
            }
        ],
        pageLength: 20,
        bAutoWidth: !1,
        colReorder: !0
    });
    tblSchichtmodellSuchen = $("#tblSchichtmodellSuchen").DataTable({
        dom: "Bfrtip",
        buttons: [{
                extend: "copy",
                text: "Kopieren",
                exportOptions: {
                    columns: ":visible"
                }
            },
            {
                extend: "csv",
                text: "CSV-Export",
                exportOptions: {
                    columns: ":visible"
                }
            }, {
                extend: "print",
                text: "Drucken",
                exportOptions: {
                    columns: ":visible"
                }
            }
        ],
        pageLength: 20,
        bAutoWidth: !1,
        colReorder: !0
    });
    tblAnlagen = $("#anlagenListe").DataTable({
        dom: "Bfrtip",
        buttons: [{
            extend: "copy",
            text: "Kopieren",
            exportOptions: {
                columns: ":visible"
            }
        }, {
            extend: "csv",
            text: "CSV-Export",
            exportOptions: {
                columns: ":visible"
            }
        }, {
            extend: "print",
            text: "Drucken",
            exportOptions: {
                columns: ":visible"
            }
        }],
        pageLength: 15,
        bAutoWidth: !1,
        colReorder: !0
    });
    tblAdminlisteErstellen = $("#tblAdminlisteErstellen").DataTable({
        dom: "Bfrtip",
        buttons: [{
            extend: "copy",
            text: "Kopieren",
            exportOptions: {
                columns: ":visible"
            }
        }, {
            extend: "csv",
            text: "CSV-Export",
            exportOptions: {
                columns: ":visible"
            }
        }, {
            extend: "print",
            text: "Drucken",
            exportOptions: {
                columns: ":visible"
            }
        }],
        pageLength: 15,
        bAutoWidth: !1,
        colReorder: !0
    });
     tblBenutzerlisteErstellen = $("#tblBenutzerlisteErstellen").DataTable({
        dom: "Bfrtip",
        buttons: [{
            extend: "copy",
            text: "Kopieren",
            exportOptions: {
                columns: ":visible"
            }
        }, {
            extend: "csv",
            text: "CSV-Export",
            exportOptions: {
                columns: ":visible"
            }
        }, {
            extend: "print",
            text: "Drucken",
            exportOptions: {
                columns: ":visible"
            }
        }],
        pageLength: 15,
        bAutoWidth: !1,
        colReorder: !0
    });
    tblBetrGrplisteErstellen = $("#tblBetrGrplisteErstellen").DataTable({
        dom: "Bfrtip",
        buttons: [{
            extend: "copy",
            text: "Kopieren",
            exportOptions: {
                columns: ":visible"
            }
        }, {
            extend: "csv",
            text: "CSV-Export",
            exportOptions: {
                columns: ":visible"
            }
        }, {
            extend: "print",
            text: "Drucken",
            exportOptions: {
                columns: ":visible"
            }
        }],
        pageLength: 15,
        bAutoWidth: !1,
        colReorder: !0
    });
    tblsAdmSuchenlisteErstellen = $("#tblsAdmSuchenlisteErstellen").DataTable({
        dom: "Bfrtip",
        buttons: [{
            extend: "copy",
            text: "Kopieren",
            exportOptions: {
                columns: ":visible"
            }
        }, {
            extend: "csv",
            text: "CSV-Export",
            exportOptions: {
                columns: ":visible"
            }
        }, {
            extend: "print",
            text: "Drucken",
            exportOptions: {
                columns: ":visible"
            }
        }],
        pageLength: 15,
        bAutoWidth: !1,
        colReorder: !0
    });
    tblGipscAdmSuchenlisteErstellen = $("#tblGipscAdmSuchenlisteErstellen").DataTable({
        dom: "Bfrtip",
        buttons: [{
            extend: "copy",
            text: "Kopieren",
            exportOptions: {
                columns: ":visible"
            }
        }, {
            extend: "csv",
            text: "CSV-Export",
            exportOptions: {
                columns: ":visible"
            }
        }, {
            extend: "print",
            text: "Drucken",
            exportOptions: {
                columns: ":visible"
            }
        }],
        pageLength: 15,
        bAutoWidth: !1,
        colReorder: !0
    });
    tblManGrpSuchenlisteErstellen = $("#tblManGrpSuchenlisteErstellen").DataTable({
        dom: "Bfrtip",
        buttons: [{
            extend: "copy",
            text: "Kopieren",
            exportOptions: {
                columns: ":visible"
            }
        }, {
            extend: "csv",
            text: "CSV-Export",
            exportOptions: {
                columns: ":visible"
            }
        }, {
            extend: "print",
            text: "Drucken",
            exportOptions: {
                columns: ":visible"
            }
        }],
        pageLength: 15,
        bAutoWidth: !1,
        colReorder: !0
    });
    tblAnlagenII =
        setAnlagenTbl2();
    var tblDokumenteAnl = $("#tblDokumenteAnl").DataTable({
            dom: "Bfrtip",
            buttons: [],
            pageLength: 10,
            bAutoWidth: !1,
            colReorder: !0,
            oLanguage: {
                sInfo: "",
                sInfoEmpty: "",
                oPaginate: {
                    sNext: "",
                    sPrevious: ""
                }
            }
        }),
        tblDokumenteMsm = $("#tblDokumenteMsm").DataTable({
            dom: "Bfrtip",
            buttons: [],
            pageLength: 10,
            bAutoWidth: !1,
            colReorder: !0,
            oLanguage: {
                sInfo: "",
                sInfoEmpty: "",
                oPaginate: {
                    sNext: "",
                    sPrevious: ""
                }
            }
        }),
        tabsData = [{
                lengthPath: 1,
                tab: "tabSchtDat",
                idElement: "",
                infos: "infosSchichtdaten",
                aktivInstance: "schtDat"
            },{
                lengthPath: 1,
                tab: "tabEPrd",
                idElement: "",
                infos: "infosErweiterungenProdukte",
                aktivInstance: "erwPrd"
            }, {
                lengthPath: 1,
                tab: "tabDiagKnz",
                idElement: "",
                infos: "infosDiagrammKnz",
                aktivInstance: "diag"
            }, /*24-02-2020 Tab group calculator defined*/
            {
                lengthPath: 1,
                tab: "tabTaschenrechner",
                idElement: "",
                infos: "infosKorrekturFaktor",
                aktivInstance: "ePrdKFE"
            },
            /*01-03-2020 Tab dynamic correction factor defined*/
            {
                lengthPath: 1,
                tab: "tabDynamicKorrekturFktr",
                idElement: "",
                infos: "infosDynamicKorrekturFaktor",
                aktivInstance: "ePrdDKFE"
            },
            {
                lengthPath: 1,
                tab: "tabGrpDiag",
                idElement: "",
                infos: "infosGruppierungDiagramme",
                aktivInstance: "grpDiag"
            }, {
                lengthPath: 1,
                tab: "tabAnl_weitereKonfig",
                idElement: "anlID",
                infos: "infosWeitereAnlKonfig",
                aktivInstance: "anl"
            }, {
                lengthPath: 1,
                tab: "tabPrd",
                idElement: "prdID",
                infos: "infosProdukte",
                aktivInstance: "prd"
            }, {
                lengthPath: 1,
                tab: "tabPrd_konfig",
                idElement: "prdID",
                infos: "infosWeiterePrdKonfig",
                aktivInstance: "prd"
            },
            {
                lengthPath: 3,
                tab: "tabPrd_historie",
                idElement: "prdID",
                infos: "infosHistoriePrd",
                aktivInstance: "prd"
            }, {
                lengthPath: 1,
                tab: "tabVorlagenformeln",
                idElement: "",
                infos: "infosVorlagenformeln",
                aktivInstance: "vFrm"
            }, {
                lengthPath: 1,
                tab: "tabTimeCompDiag",
                idElement: "",
                infos: "infosDiagramm2",
                aktivInstance: "diag"
            }, {
                lengthPath: 1,
                tab: "tabLnDiag",
                idElement: "",
                infos: "infosDiagramm",
                aktivInstance: "diag"
            }, {
                lengthPath: 1,
                tab: "tabVerbrauchsdatenExp",
                idElement: "",
                infos: "infosVerbrauchsdatenexport",
                aktivInstance: "dataExp"
            }, {
                lengthPath: 1,
                tab: "tabProd",
                idElement: "",
                infos: "infosProduktion",
                aktivInstance: "prod"
            }, {
                lengthPath: 1,
                tab: "tabBerechnungsformeln",
                idElement: "",
                infos: "infosBerechnungsformeln",
                aktivInstance: "berFrmEditor"
            }, {
                lengthPath: 1,
                tab: "tabGipscAdm",
                idElement: "gipscAdmID",
                infos: "infosGipscommAdmins",
                aktivInstance: "gipscAdm"
            }, {
                lengthPath: 1,
                tab: "tabBetrGrp",
                idElement: "gipscAdmID",
                infos: "infosBetreuerGruppen",
                aktivInstance: "betrGrp"
            }, {
                lengthPath: 2,
                tab: "tabManGrp",
                idElement: "manGrpID",
                infos: "infosMandantenGruppen",
                aktivInstance: "manGrp"
            },
            {
                lengthPath: 2,
                tab: "tabSAdm",
                idElement: "sAdmID",
                infos: "infosSuperAdmins",
                aktivInstance: "sAdm"
            }, {
                lengthPath: 3,
                tab: "tabAdm",
                idElement: "admID",
                infos: "infosAdmins",
                aktivInstance: "adm"
            }, {
                lengthPath: 3,
                tab: "tabBen",
                idElement: "benID",
                infos: "infosBenutzer",
                aktivInstance: "ben"
            }, {
                lengthPath: 1,
                tab: "tabMan",
                idElement: "manID",
                infos: "infosMandanten",
                aktivInstance: "man"
            }, {
                lengthPath: 1,
                tab: "tabOrg",
                idElement: "orgID",
                infos: "infosOrganisationen",
                aktivInstance: "org"
            }, {
                lengthPath: 2,
                tab: "tabLieg",
                idElement: "liegID",
                infos: "infosLiegenschaften",
                aktivInstance: "lieg"
            }, {
                lengthPath: 3,
                tab: "tabExtDl",
                idElement: "extDlID",
                infos: "infosExtDurchleitungen",
                aktivInstance: "extDl"
            }, {
                lengthPath: 3,
                tab: "tabStdDr",
                idElement: "stdDrID",
                infos: "infosStandorteDritte",
                aktivInstance: "stdDr"
            }, {
                lengthPath: 3,
                tab: "tabBer",
                idElement: "berID",
                infos: "infosBereiche",
                aktivInstance: "ber"
            }, {
                lengthPath: 3,
                tab: "tabMstE",
                idElement: "mstID",
                infos: "infosMessstellenEng",
                aktivInstance: "mstE"
            }, {
                lengthPath: 3,
                tab: "tabMstB",
                idElement: "mstID",
                infos: "infosMessstellenBetr",
                aktivInstance: "mstB"
            }, {
                lengthPath: 3,
                tab: "tabStd",
                idElement: "stdID",
                infos: "infosStandorte",
                aktivInstance: "std"
            }, {
                lengthPath: 3,
                tab: "tabAnl",
                idElement: "anlID",
                infos: "infosAnlagen",
                aktivInstance: "anl"
            }, {
                lengthPath: 3,
                tab: "tabAnl_energie",
                idElement: "anlID",
                infos: "infosEnergieversorgung",
                aktivInstance: "anlEnVers"
            }, {
                lengthPath: 3,
                tab: "tabAnl_dokumente",
                idElement: "anlID",
                infos: "infosDokumente",
                aktivInstance: "anlDocs"
            }, {
                lengthPath: 3,
                tab: "tabAnl_historie",
                idElement: "anlID",
                infos: "infosHistorieAnl",
                aktivInstance: "anlHist"
            }, {
                lengthPath: 3,
                tab: "tabMsm",
                idElement: "msmID",
                infos: "infosMessmittel",
                aktivInstance: "msm"
            }, {
                lengthPath: 3,
                tab: "tabConfig",
                idElement: "msmID",
                infos: "infosKonfiguration",
                aktivInstance: "msmConf"
            }, {
                lengthPath: 3,
                tab: "tabDok_Msm",
                idElement: "msmID",
                infos: "infosDokumenteMsm",
                aktivInstance: "msmDocs"
            }, {
                lengthPath: 3,
                tab: "tabHis_Msm",
                idElement: "msmID",
                infos: "infosHistorieMsm",
                aktivInstance: "msmHist"
            }, {
                lengthPath: 3,
                tab: "tabKnz",
                idElement: "knzID",
                infos: "infosKennzahlen",
                aktivInstance: "knz"
            }, {
                lengthPath: 3,
                tab: "tabAlm",
                idElement: "almID",
                infos: "infosAlarme",
                aktivInstance: "alm"
            }, {
                lengthPath: 3,
                tab: "tabEng",
                idElement: "entID",
                infos: "infosEnergie",
                aktivInstance: "ent"
            }, {
                lengthPath: 3,
                tab: "tabGsf",
                idElement: "gsfID",
                infos: "infosGesellschaftsformen",
                aktivInstance: "gsf"
            }, {
                lengthPath: 3,
                tab: "tabMgs",
                idElement: "mgsID",
                infos: "infosManagementsysteme",
                aktivInstance: "mgs"
            }, {
                lengthPath: 3,
                tab: "tabZp",
                idElement: "zpID",
                infos: "infosZaehlpunkte",
                aktivInstance: "zp"
            }, {
                tab: "tabEAnl",
                idElement: "eAnlID",
                infos: "infosErweiterungenAnlagen",
                aktivInstance: "eAnl"
            }, {
                lengthPath: 3,
                tab: "tabExtRechnungen",
                idElement: "eRngID",
                infos: "infosExtRechnungen",
                aktivInstance: "eRng"
            }, {
                lengthPath: 3,
                tab: "tabIntEnergiedatenIMw",
                idElement: "intEngIMwID",
                infos: "infosIntEnergiedaten",
                aktivInstance: "intEngIMw"
            },
            {
                lengthPath: 3,
                tab: "tabIntBetriebsdatenIMw",
                idElement: "intBdeIMwID",
                infos: "infosIntBetriebsdaten",
                aktivInstance: "intBdeIMw"
            },
            {
                lengthPath: 3,
                tab: "tabIntBetriebsdatenIMwHist",
                idElement: "intBdeIMwID",
                infos: "infosIntBetriebsdatenHist",
                aktivInstance: "intBdeIMw"
            }, {
                lengthPath: 3,
                tab: "tabAusw_eRng_iMw",
                idElement: "eRngID",
                infos: "infosAuswertungManuell",
                aktivInstance: "vergl"
            }, {
                lengthPath: 3,
                tab: "tabSpaEfV_Tbl1",
                idElement: "eRngID",
                infos: "infosSpaEfVTabelle1",
                aktivInstance: "spaefv1"
            }, {
                lengthPath: 3,
                tab: "tabSpaEfV_Tbl2",
                idElement: "eRngID",
                infos: "infosSpaEfVTabelle2",
                aktivInstance: "spaefv2"
            }
        ],
        nTabsData = tabsData.length,
        entOderEnf, anlagenliste = [],
        Anlage = function(a, b, e, c, g, f, h, q, r, x, u, t, w, y, z, p, A, B) {
            this.berID = a;
            this.nameLieg = b;
            this.nameBer = e;
            this.nummerAnl = c;
            this.bezeichnungAnl = g;
            this.standortAnl = f;
            this.datumAnschaffung = h;
            this.datumLetzteDurchsicht = q;
            this.jahresbetriebsstunden = r;
            this.produktAnl = x;
            this.produktnummerAnl = u;
            this.zugeordneterVerbraucher1 = t;
            this.zugeordneterVerbraucher2 = w;
            this.energietraeger1Anl = y;
            this.energieform1Anl = z;
            this.einheitEnergie1Anl = p;
            this.anschlussleistung1Anl = A;
            this.mittlereAuslastungKw1Anl = B
        },
        sync = new Synchronizer,
        mandantenliste = [],
        betrGrpListe = [],
        manGrpListe = [],
        organisationenliste = [],
        organisation = {
            Name: "",
            OrgID: ""
        },
        liegenschaftenliste = [],
        liegenschaft = {
            Name: "",
            LiegID: ""
        },
        bereicheliste = [],
        Bereich = function(a, b, e, c) {
            this.nameOrg = a;
            this.nameLieg = b;
            this.nameBer = e;
            this.berID = c
        },
        changePath = new ChangePath,
        changeTracker = new ChangeTracker,
        formula = new Formula,
        masseneingabe = new MassInputMatrix,
        ME = masseneingabe,
        set = id,
        isInstance = function(a) {
            return head(["First", "Next", "Previous", "Last"].map(b => a.split(b)).filter(function(a) {
                return 1 < length_(a)
            }).join().split(","))
        },
        datensatzGespeichert = function(a) {
            const testStr = typeof a === "string" ? a : (a.query)
            return -1 === testStr.search("error") ? "Datensatz wurde erfolgreich gespeichert!" : "ACHTUNG!!! Datensatz konnte nicht gespeichert werden!"
        },
        zerlegeFormel = function(a) {
            return a.split(" ")
        },
        filterInstanzen = function(a) {
            return zerlegeFormel(a).filter(function(a) {
                return "[" === a[0]
            }).map(function(a) {
                a.replace("[", "").replace("]", "")
            })
        },
        filterOperatoren = function(a) {
            return zerlegeFormel(a).filter(function(a) {
                return "[" !== a[0] && "" !== a
            })
        },
        extractNumber = function(a) {
            return Number(a.split("_")[1])
        },
        applyPattern = function(a) {
            return function(b) {
                return b.map(function(b) {
                    return b.map(function(b) {
                        return a[0] + b + a[1]
                    })
                })
            }
        },
        uncheck_Ctrl = function(a, b) {
            var e = a.firstPart,
                c = a.secondPart;
            $("" + e + b + c).prop("checked", !1);
            1 < b ? uncheck_Ctrl({
                firstPart: e,
                secondPart: c
            }, b - 1) : "done"
        },
        setText_Ctrl = function(a, b) {
            var e = a.firstPart,
                c = a.secondPart,
                g = b.von,
                f = b.bis;
            $("" + e + f + c).text("Knz " + (f + 1 - g));
            f > g ? setText_Ctrl({
                firstPart: e,
                secondPart: c
            }, {
                von: g,
                bis: f - 1
            }) : "done"
        },
        hide_Ctrl = function(a, b) {
            $(a).eq(b).css("display", "none");
            1 < b ? hide_Ctrl(a, b - 1) : "done"
        },
        mkLabel = function(a) {
            return function(b) {
                return function(e) {
                    return '\n<label id="lbl_' + e + a + '" class="' + b + '">' + e + "</label>\n"
                }
            }
        },
        mkCheckbox = function(a) {
            return function(b) {
                return function(e) {
                    return '\n<input id="chk_' + e + a + '" class="' + b + '" type="checkbox"/>\n'
                }
            }
        },
        mkTextbox = function(a) {
            return function(b) {
                return function(e) {
                    return '\n<input id="txt_' + e + a + '" class="' + b + '" type="text"/>\n'
                }
            }
        },
        getDbTableColumns = function(a) {
            return new Promise(function(b, e) {
                $.ajax({
                    type: "POST",
                    async: !0,
                    url: "php/spaltenTabelle.php",
                    data: {
                        nameDB: $("#nameDB").val(),
                        tbl: a
                    },
                    fail: function() {
                        alert("failed!!")
                    },
                    success: function(a) {
                        a = JSON.parse(a);
                        b(a.map(function(a) {
                            return a.spaltenname
                        }))
                    }
                })
            })
        },
        appendHtml = function(a) {
            return function(b) {
                $(a).append(b)
            }
        };

} catch (a) {
    console.log("Error: " + a)
};

// Prepares the mst_x identifier
const mstIdentifier =
    ident =>
    ident.split("_").length === 1 ?
    "mst_" + ident :
    ident.split("_").length > 2 ?
    tail(ident.split("_")).join("_") :
    ident

// Tests if a Messstelle is calculated
const isCalculated =
    type =>
    type === "berechnet"

// Depending which messart was chosen labels and txtboxes
// + button are shown or hidden
const toggleMsmBerechnungslogik =
    typeCalc =>
    typeData => {
        if(isCalculated(typeCalc)) {
            $(`#labelMessmittelMst${typeData}`).hide()
            $(`#messmittelBerechnungslogikMst${typeData}`).hide()
            $(`#labelBerechnungslogikMst${typeData}`).show()
            $(`#berechnungslogikMst${typeData}`).show()
            $(`#linkBerechnungslogikOderEingabemaske${typeData}`).show()
        }
        else {
            $(`#linkBerechnungslogikOderEingabemaske${typeData}`).hide()
            $(`#labelBerechnungslogikMst${typeData}`).hide()
            $(`#berechnungslogikMst${typeData}`).hide()
            $(`#labelMessmittelMst${typeData}`).show()
            $(`#messmittelBerechnungslogikMst${typeData}`).show()
        }
    }

// Tests if element is empty string
const isEmpty =
    element =>
    element === ""

// Tests if an element of a formula is an operator(+-*/)
const isOperator =
    element =>
    ["+", "-", "*", "/", ""]
    .filter(a => a === element).length > 0

// Tests if some n is a number
const isNumeric =
    n =>
    !isNaN(parseFloat(n)) && isFinite(n)

// Tests if the element is a unit
const isUnit =
    element =>
    String(element).split("_").length > 1

// Tests if the elements identifier is of type Messstelle
const isMessstelle =
    element =>
    element.split("_")[0] === "mst"

// Tests if the element is an opening parentheses
const isOpeningParentheses =
    element =>
    element === "("

// Tests if the element is a closing parentheses
const isClosingParentheses =
    element =>
    element === ")"

// Tests if there are more opening than closing parentheses
const moreOpeningThanClosingParentheses =
    idString => {
        splittedString = idString.split("")
        countOpening = splittedString.filter(isOpeningParentheses).length
        countClosing = splittedString.filter(isClosingParentheses).length
        return countOpening > countClosing
    }

// Tests if an element of a formula occurs on both sides of the equation
const isSelfReference =
    self =>
    current =>
    self === current

// Gets last element of the formulas idString
const getLastElement =
    idString =>
    idString === "" ?
    "" :
    idString.split(" ").filter(a => a !== "").reverse()[0]

// Tests if all opening parentheses are closed
const allParenthesesClosed =
    idString =>
    idString.split("").filter(isOpeningParentheses).length
    === idString.split("").filter(isClosingParentheses).length

// Verifies if the action(Berechnete Messstelle) is fullfilling all the necessary conditions
const validDropMessstelle =
    idMst =>
    idDragMst =>
    idString =>
    idMst === "" ?
    "REFERENCE" :
    isSelfReference(idMst)(idDragMst) ?
    "SELF" :
    isUnit(getLastElement(idString))
    || isClosingParentheses(getLastElement(idString))
    || isNumeric(getLastElement(idString)) ?
    "ORDER" :
    "VALID"

// Verifies if the action(Kennzahl) is fullfilling all the necessary conditions
const validDropUnit =
    idString =>
    isOperator(getLastElement(idString))
    || isOpeningParentheses(getLastElement(idString))

// Verifies if the action(Number) is fullfilling all the necessary conditions
const validInputNumber =
    idString =>
    isOperator(getLastElement(idString))
    || isNumeric(getLastElement(idString))
    || isOpeningParentheses(getLastElement(idString))

// Verifies if the action(Operator) is fullfilling all the necessary conditions
const validInputOperator =
    idString =>
    isUnit(getLastElement(idString))
    || isNumeric(getLastElement(idString))
    || isClosingParentheses(getLastElement(idString))

// Verifies if the action(Opening parentheses) is fullfilling all the necessary conditions
const validInputOpeningParentheses =
    idString =>
    isEmpty(idString)
    || isOperator(getLastElement(idString))
    || isOpeningParentheses(getLastElement(idString))

// Verifies if the action(Closing parentheses) is fullfilling all the necessary conditions
const validInputClosingParentheses =
    idString =>
    moreOpeningThanClosingParentheses(idString)
    && ( isUnit(getLastElement(idString))
    || isNumeric(getLastElement(idString))
    || isClosingParentheses(getLastElement(idString)) )

// Verifies if the formula is valid and can be saved
const readyToSave =
    idString =>
    allParenthesesClosed(idString)
    && ( isUnit(getLastElement(idString))
    || isNumeric(getLastElement(idString))
    || isClosingParentheses(getLastElement(idString)) )

// Save a Messstellen formula
const saveFormula =
    () => {
        const formula = {
            modus: $("#bermstmod").val(),
            berechneteMstID: $("#berechneteMstID").val().split("_")[1],
            bezug: $("#inpBezugKnz").val(),
            formelString: btoa($("#formelStringDarstellung").val()),
            idString: btoa($("#formelIdDarstellung").val())
        }
        writeFormulaToDB(formula)
        .then(messstellenInAuswertungsEditorTabelleEinlesen)
    }

// Tests if php path were successfully written to DB
const jobSetupSuccess =
    type =>
    result => {
        const jobType =
            equal(type)("history") ?
            "Messstellenhistorie" :
            "Update Startposition"

        const getMsg =
            name =>
            equal(result)("FALSE") ?
            `Die ${name} konnte nicht konfiguriert werden ! Bitte wenden Sie sich an Ihren Ansprechpartner.` :
            `${name} erfolgreich konfiguriert !`

        const retVal =
            getMsg(jobType)

        alert(retVal)

        enableBtn("#formelSpeichern")

        return retVal
    }

// Adds one job as a starting point for the updating
const addOneVirtMessstelleHistoryJob =
    nameDB =>
    mstID =>
    ajaxPost('php/scriptExecPath.php?mode=startupdate')({nameDB, mstID})


// Adds jobs for history calculation
const addVirtMessstelleHistoryJob =
    nameDB =>
    mstID =>
    formula =>
    ajaxPost('php/scriptExecPath.php?mode=history')({nameDB, mstID, formula})

const configureVirtMessstelle =
    job =>
    type => {
        disableBtn("#formelSpeichern")
        saveFormula()
        job
        .then(jobSetupSuccess(type))

        $("#virtMessstelleSave").dialog("close")
    }

// Save a Messstellen formula and calculate historic data
const virtMessstelleWithHistory =
    nameDB =>
    mstID =>
    formula =>
    () =>
    configureVirtMessstelle(addVirtMessstelleHistoryJob(nameDB)(mstID)(formula))("history")


// Save a Messstellen formula without calculating historic data
const virtMessstelleWithoutHistory =
    nameDB =>
    mstID =>
    () =>
    configureVirtMessstelle(addOneVirtMessstelleHistoryJob(nameDB)(mstID))("startupdate")

// Open popup and decide if historic Virtuelle Messstelle
// data should be calculated or only from now on get updated
const virtMessstelleSaveDialog =
    () => {
        const nameDB = $("#nameDB").val()
        const mstID = $("#berechneteMstID").val().split("_")[1]
        const formula = $("#formelIdDarstellung").val()

        $("#virtMessstelleSave").dialog({
            height: 225,
            width: 405,
            resizable: false,
            draggable: false,
            modal: true,
            show: {
                effect: "fade",
                duration: 500
            },
            hide: {
                effect: "fade",
                duration: 500
            },
            open : () => {

                // Save a Messstellen formula and calculate historic data
                $("#histDataJa").off("click")
                $("#histDataJa").on("click",
                    virtMessstelleWithHistory(nameDB)(mstID)(formula)
                )

                // Save a Messstellen formula without historic data calculation
                $("#histDataNein").off("click")
                $("#histDataNein").on("click",
                    virtMessstelleWithoutHistory(nameDB)(mstID)
                )

                // Cancel saving process
                $("#saveMstFormulaAbbrechen").off("click")
                $("#saveMstFormulaAbbrechen").on("click", () => {$("#virtMessstelleSave").dialog("close")})
            }
        })
}

const calcCostWithoutMwst =
    amountWithMwst =>
    percentMwst =>
    round((100 * amountWithMwst) / (100 + percentMwst))(2)

const calcCostWithMwst =
    amountWithoutMwst =>
    percentMwst =>
    round(((percentMwst  * amountWithoutMwst) / 100) + amountWithoutMwst)(2)

// Calculates Kosten in Rechnungen depending on change event
const setCostRng =
    id => {
        const amountWithMwst = parseFloat(formatNumber("deform", $("#kostenMitMwstERng").val()))
        const amountWithoutMwst = parseFloat(formatNumber("deform", $("#kostenERng").val()))
        const percentMwst = parseFloat(formatNumber("deform", $("#mwstPercentERng").val()))
        let amountMwst = 0, cost = 0

        if (id === "kostenMitMwstERng") {
            cost = calcCostWithoutMwst(amountWithMwst)(percentMwst)
            amountMwst = round(amountWithMwst - cost)(2)

            $("#kostenMitMwstERng").val(formatNumber("form", $("#kostenMitMwstERng").val()))
            $("#kostenERng").val(formatNumber("form", cost))
            $("#mwstERng").val(formatNumber("form",amountMwst))
        }
        else {
            cost = calcCostWithMwst(amountWithoutMwst)(percentMwst)
            amountMwst = round(cost - amountWithoutMwst)(2)

            $("#kostenERng").val(formatNumber("form", $("#kostenERng").val()))
            $("#kostenMitMwstERng").val(formatNumber("form", cost))
            $("#mwstERng").val(formatNumber("form", amountMwst))
        }
    }

const getKnzTab =
    (_, i) =>
    $("#btnTabKnzCont li").eq(i)

const getAllKnzTabs =
    () =>
    array($("#btnTabKnzCont li").length)()()
    .map(getKnzTab)

const hiddenKnzTab =
    a =>
    a.css("display") === "none"

const visibleKnzTab =
    a =>
    a.css("display") === "none"

// Adds a new Kennzahl to a Kennzahleninstanz
const addKennzahl =
    () =>
    head(
        getAllKnzTabs()
        .filter(hiddenKnzTab)
    )
    .css("display", "inline")

const activateNewKnzTab =
    () => {
        const tabText =
            last(
                getAllKnzTabs()
                .filter(visibleKnzTab)
            ).text()

        const hrefSelector =
                $(`[href="#tabs-${tabText.split(" ")[1]}_knzForms"]`)

        hrefSelector.trigger("click")
    }

/*24-02-2020 Correction factor add record row wise not quoma saperated,
21-03-2020 send the optionDesc variable into ajax response*/
function KorrekturFaktorEinfügen() {
    optionName = [];
    optionWert = [];
    optionDesc = [];
    optionGroupTxt = [];
    optionGroupID = [];
    for (i = 0; i < $("#tblOptionenEPrdKff tbody tr").length; i++) {
        optionName[i] = tblOptionenEPrdKff.cell(i, 0).data();
        optionWert[i] = tblOptionenEPrdKff.cell(i, 1).data();
        optionDesc[i] = tblOptionenEPrdKff.cell(i, 2).data();

        optionGroupTxt[i] = tblOptionenEPrdKff.cell(i, 3).data();
        var node = tblOptionenEPrdKff.rows(i).nodes()[0];
        optionGroupID[i] = $(node).attr("data-id");
        xOptionName = optionName;
        yOptionWert = optionWert;
        zOptionDesc = optionDesc;
        zOptionGroupTxt = optionGroupTxt;
        zOptionGroupID = optionGroupID;
    }
    $.ajax({
        type: "POST",
        async: !0,
        url: "php/instanzIntoDb.php",
        data: {
            id: "ePrdKFE",
            modus: "save",
            nameDB: $("#nameDB").val(),
            ePrdID: $("#ePrdID").val(),
            xOptionName: xOptionName,
            yOptionWert: yOptionWert,
            zOptionDesc: zOptionDesc,
            zOptionGroupTxt: zOptionGroupTxt,
            zOptionGroupID: zOptionGroupID
        },
        success: function(a) {
            tblOptionenEPrdKff.clear().draw();
            alert(a);
            getStatischeKorrekturfaktoren();
            $("#tblOptionenEPrdKffNotify").hide();
        }
    })
}
/*Correction factor get ajax response 19-03-2020,
21-03-2020 get the description column*/
function getStatischeKorrekturfaktoren(grpId) {
    $.ajax({
        type: "POST",
        async: !0,
        url: "php/staticKorrekturfaktorGruppen.php",
        data: {
            nameDB: $("#nameDB").val(),
            modus: 'getData',
            id: 'ePrdKFEGruppenGetTblData',
            grpId: grpId
        },
        success: function(a) {
            a = json(a);
            var b = a.length;
            tblGetStatischeKorrekturfaktoren.colReorder.reset();
            tblGetStatischeKorrekturfaktoren.clear().draw();
            for (var e = 0; e < b; e++)
                tblGetStatischeKorrekturfaktoren.row.add(
                    [a[e].name,
                        a[e].wert,
                        a[e].description,
                        a[e].grp_name,
                        "<a data-id='" + a[e].ePrdKFE_id + "' grp-id='" + a[e].ePrdKFE_GrpID + "' class='korrekturFaktorMenuEdit'>Edit</a> | <a class='korrekturFaktorMenuDel' data-id='" + a[e].ePrdKFE_id + "'>Delete</a>"
                    ]).draw(),
                $("tr").css("cursor", "pointer")
        }
    })
}

/*Correction factor get ajax response 21-02-2020*/
function getKorrekturfaktor() {
    $.ajax({
        type: "POST",
        async: !0,
        url: "php/getKorrekturfaktor.php",
        data: {
            nameDB: $("#nameDB").val()
        },
        success: function(a) {
            a = json(a);
            var b = a.length;
            tblKorrekturfaktor.colReorder.reset();
            tblKorrekturfaktor.clear().draw();
            for (var e = 0; e < b; e++)
                tblKorrekturfaktor.row.add(
                    [a[e].ePrdKFE_id + " ",
                        "[" + a[e].name.replace(/\s/g, "_") + "]",
                        a[e].wert + " "
                    ]).draw(),
                $("tr").css("cursor", "pointer")
        }
    })
}


/*25-02-2020 if Virtuelle Messstelle selected then hide select field below*/
function virtuelleMessstelle() {
    $('#bermstmod option').each(function() {
        if ($(this).is(':selected')) {
            //alert($(this).val());
            if ($(this).val() == 'Virtuelle Messstelle') {
                $("#tabsTblsBerEdit .tab_hide_virtuelle_messstelle").hide();
                $("#tblMstBerEditorContainer .controlDiv.berFormel").show();
                $("#tblMstBerEditorContainer .controlDiv.knzFormel").hide();

                $("#btnInMstVerwaltungSpringen").show();
                $("#btnInKnzVerwaltungSpringen").hide();
            } else if ($(this).val() == 'Kennzahl') {
                $("#tabsTblsBerEdit .tab_hide_virtuelle_messstelle").show();
                $("#tblMstBerEditorContainer .controlDiv.berFormel").hide();
                $("#tblMstBerEditorContainer .controlDiv.knzFormel").show();

                $("#btnInMstVerwaltungSpringen").hide();
                $("#btnInKnzVerwaltungSpringen").show();
            }
        }
    });
}

/*05-03-2020 check if string base64 encode - it will be work for messmetel column  */
function isBase64(str) {
    if (str === '' || str.trim() === '') {
        return str;
    }
    try {
        var c = btoa(atob(str)) == str;
        //console.log(c);
        if (c == true && str.length >= 8) {
            var d = "<a class='tooltip_formula_show' data-tooltip='" + atob(str) + "'>Formel angelegt</a>";
            return d;
        } else {
            return str;
        }
    } catch (err) {
        return str;
    }
}

/*25-03-2020 Correction factor update record ajax response*/
function KorrekturFaktorEinfügenAktualisieren() {
    var optionName = $('#optionName').val();
    var optionWert = $('#optionWert').val();
    var optionDescription = $('#optionDescription').val();
    var ePrdIdStore = $('#ePrdIdStore').val();
    var optionGrpID = $("#groupStaticCF").val();
    var optionGrpTxt = $("#groupStaticCF option:selected").text();

    var bComma = optionWert.replace(".", ",");

    $.ajax({
        type: "POST",
        async: !0,
        url: "php/instanzIntoDb.php",
        data: {
            id: "ePrdKFEUpdate",
            modus: "update",
            nameDB: $("#nameDB").val(),
            ePrdID: $("#ePrdID").val(),
            optionName: optionName,
            optionWert: bComma,
            optionDescription: optionDescription,
            ePrdIdStore: ePrdIdStore,
            optionGrpID: optionGrpID,
            optionGrpTxt: optionGrpTxt
        },
        success: function(a) {
            alert("Datensatz wurde erfolgreich aktualisiert!");
            $('#optionName').val("");
            $('#optionWert').val("");
            $('#optionDescription').val("");
            $('#ePrdIdStore').val("");
            $("#btnOptionHinzEPrdKffUpdate").hide();
            $("#btnOptionHinzEPrdKffStornieren").hide();
            $("#btnOptionHinzEPrdKff").show();
            $("#kFeSpeichern").show();
            $("#kFeHinz").show();
            $("#groupStaticCFDiv").hide();
            $("#groupStaticCF").val("");
            getStatischeKorrekturfaktoren(optionGrpID);
            $("#groupUpdateStaticCFDiv").hide();
        }
    })
}
/*25-03-2020 Correction factor update record ajax response*/

/*25-03-2020 Correction factor delete record ajax response*/
function KorrekturFaktorEinfügenloschen(id) {
    if (confirm("Möchten Sie sicher löschen?")) {
        var groupSelID = $("#updateGroupSelIDStaticCF").val();

        $.ajax({
            type: "POST",
            async: !0,
            url: "php/instanzIntoDb.php",
            data: {
                id: "ePrdKFEDelete",
                modus: "delete",
                nameDB: $("#nameDB").val(),
                ePrdID: $("#ePrdID").val(),
                ePrdKFE_id: id

            },
            success: function(a) {
                alert("Datensatz wurde erfolgreich gelöscht!");
                getStatischeKorrekturfaktoren(groupSelID);
            }
        });
    }
    return false;
}
/*25-03-2020 Correction factor delete record ajax response*/

/*Dynamische Correction factor get ajax response 13-04-2020*/
function dynamischeKorrekturfaktorenSpeichern() {
    optionName = [];
    optionBezug = [];

    optionBezugStart = [];
    optionBezugEnd = [];
    optionTempStart = [];
    optionTempEnd = [];

    optionFaktore = [];
    optionTemp = []; //15-05-20 New Added filed temperature
    optionBasisFaktorName = [];
    optionBasisFaktorCalc= [];
    optionBasisFaktorWert= [];
    optionBasisFaktorType= [];
    optionBasisResult= [];
    optionFormatDynamicType= [];
    optionBereich= [];

      var optionNameDKff = $("#optionNameDKff").val();
      var optionBeschreibungDKff = $("#optionBeschreibungDKff").val();
      var typeDynamicCF = $(".typeDynamicCF").val();
      var subtypeTimeDynamicCF = $(".subtypeTimeDynamicCF").val();
      var ePrdDMainIdStore = $('#ePrdDMainIdStore').val();
      var basisType = $('.auswahlTypierungFaktorDKff').val();
      var calculationTypeDKff = $('.calculationTypeDKff').val(); //This field for faktor 5
      var saveOptType =  $('#saveOptType').val();

      for (i = 0; i < $("#tblOptionenEPrdDKff tbody tr").length; i++){
       // console.log(i);
         optionName[i] = tblOptionenEPrdDKff.cell(i, 0).data();
         optionBezug[i] = tblOptionenEPrdDKff.cell(i, 1).data();
         optionTemp[i] = tblOptionenEPrdDKff.cell(i, 2).data(); //15-05-20 New Added filed temperature
         optionBezugStart[i] = tblOptionenEPrdDKff.cell(i, 3).data();
         optionBezugEnd[i] = tblOptionenEPrdDKff.cell(i, 4).data();
         optionTempStart[i] = tblOptionenEPrdDKff.cell(i, 5).data();
         optionTempEnd[i] = tblOptionenEPrdDKff.cell(i, 6).data();
         optionFaktore[i] = tblOptionenEPrdDKff.cell(i, 7).data();
         optionBasisFaktorName[i] = tblOptionenEPrdDKff.cell(i, 8).data();
         optionBasisFaktorCalc[i] = tblOptionenEPrdDKff.cell(i, 9).data();
         optionBasisFaktorWert[i] = tblOptionenEPrdDKff.cell(i, 10).data();
         optionBasisResult[i] = tblOptionenEPrdDKff.cell(i, 11).data();
         var nodeFormatDynamic = tblOptionenEPrdDKff.rows( i ).nodes()[0];
         optionFormatDynamicType[i] =  $(nodeFormatDynamic).attr("data-type");

         var nodeBereich = tblOptionenEPrdDKff.rows( i ).nodes()[0];
         optionBereich[i] =  $(nodeBereich).attr("bereich_id");

            xOptionName = optionName;
            yOptionBezug = optionBezug;
            yOptionBezugStart = optionBezugStart;
            yOptionBezugEnd = optionBezugEnd;
            yOptionTempStart = optionTempStart;
            yOptionTempEnd = optionTempEnd;
            tOptionTemp = optionTemp; //15-05-20 New Added filed temperature
            zOptionFaktore = optionFaktore;
            aOptionBasisFaktorName = optionBasisFaktorName;
            bOptionBasisFaktorCalc = optionBasisFaktorCalc;
            cOptionBasisFaktorWert= optionBasisFaktorWert;
            dOptionResults = optionBasisResult;
            formatDynamicType = optionFormatDynamicType;
            bereich_id=optionBereich;
        }
        $.ajax({
            type: "POST",
            async: !0,
            url: "php/instanzIntoDb.php",
            data: {
                id: "ePrdDKFE",
                modus: "save",
                nameDB: $("#nameDB").val(),
                ePrdID: $("#ePrdID").val(),
                xOptionName: xOptionName,
                yOptionBezug:yOptionBezug,
                yOptionBezugStart:yOptionBezugStart,
                yOptionBezugEnd:yOptionBezugEnd,
                yOptionTempStart:yOptionTempStart,
                yOptionTempEnd:yOptionTempEnd,
                tOptionTemp:tOptionTemp,//15-05-20 New Added filed temperature
                zOptionFaktore:zOptionFaktore,
                optionNameDKff:optionNameDKff,
                optionBeschreibungDKff:optionBeschreibungDKff,
                typeDynamicCF:typeDynamicCF,
                subtypeTimeDynamicCF:subtypeTimeDynamicCF,
                ePrdDMainIdStore:ePrdDMainIdStore,
                aOptionBasisFaktorName:aOptionBasisFaktorName,
                bOptionBasisFaktorCalc:bOptionBasisFaktorCalc,
                cOptionBasisFaktorWert:cOptionBasisFaktorWert,
                dOptionResults:dOptionResults,
                formatDynamicType:formatDynamicType,
                basisType:basisType,
                calculationTypeDKff:calculationTypeDKff,
                saveOptType:saveOptType,
                rowResult:rowResult,
                rowCalculator:rowCalculator,
                bereich_id:bereich_id
            },
            success: function(a) {
                if(a !=''){
                    /*console.log(rowResult);
                    console.log(rowCalculator);*/
                    $("#tblOptionenEPrdDKffNotify").hide();
                    $("#optionNameDKff").val("");
                    $("#optionBeschreibungDKff").val("");
                    $(".typeDynamicCF").val("");
                    $(".subtypeTimeDynamicCF").val("");
                    $(".typeDynamicCF").prop('disabled', false);
                    $(".subtypeTimeDynamicCF").prop('disabled', false);
                    $(".auswahlTypierungFaktorDKff").prop('disabled', false);
                    $(".calculationTypeDKff").prop('disabled', false);
                    $("#subtypeTxtOptNameDKff").val("");
                    $("#subtypeTxtoptzBezugDkff").val("");
                    $("#subtypeTxtoptzFaktoreDkff").val("");
                    $(".subtypeTxtDynamicCF").hide();
                    $("#tblOptionenEPrdDKffNotify").hide();
                    $(".sectionDynamicCF").show();
                    $(".calculationTypeDiv").hide();
                    tblOptionenEPrdDKff.rows().remove().draw();
                    tblGetDyanamicheKorrekturfaktoren.rows().remove().draw();

                    var auswahlTypierungVal = $('.auswahlTypierungFaktorDKff').val();
                    var typeDynamicCFVal = $(".typeDynamicCF").val();
                    var subtypeTimeDynamicCFVal = $(".subtypeTimeDynamicCF").val();
                    $("#basicFaktorRow1 input").val("");
                    $("#basicFaktorRow2 input").val("");
                    $("#basicFaktorRow3 input").val("");
                    $("#basicFaktorRow4 input").val("");
                    $("#basicFaktorRow3 select").val("");
                    $("#basicFaktorRow4 select").val("");

                    if(typeDynamicCFVal !='' && subtypeTimeDynamicCFVal !=''){

                        visibleInvisibleColumnDataOnTypeSelection(typeDynamicCFVal,subtypeTimeDynamicCFVal,auswahlTypierungVal);
                        addValidateClassOnRightSelecOptRow2VisibilityBezugTemp(auswahlTypierungVal,typeDynamicCFVal,subtypeTimeDynamicCFVal);
                    }
                    $("#basicFaktorRow1").hide();
                    $("#basicFaktorRow2").hide();
                    $("#basicFaktorRow3").hide();
                    $("#basicFaktorRow4").hide();
                    $('.auswahlTypierungFaktorDKff').val("");
                    $('#tblGetDyanamicheKorrekturfaktoren').parents('div.dataTables_wrapper').first().hide();
                    $('#tblOptionenEPrdDKff').parents('div.dataTables_wrapper').first().hide();
                    $('#saveOptType').val('');
                    alert("Daten erfolgreich gespeichert");
                    emptyArrayAfterPush();
                    $("#DkFeSpeichern").prop('disabled', false);
                }
            }
    })
}
/*Dynamische Correction factor get ajax response 13-04-2020*/

/*get dynamiche Correction factor get ajax response 13-04-2020*/
function getDynamischeKorrekturfaktoren(id) {
    setTimeout(function(){
    var FaktoreType = $(".auswahlTypierungFaktorDKff").val();
    var calculationTypeDKff = $(".calculationTypeDKff").val();
    if(FaktoreType==1 || FaktoreType==6 || FaktoreType==4 || FaktoreType==8){
        $.ajax({
            type: "POST",
            async: !0,
            url: "php/getDKorrekturfaktor.php",
            data: {
                nameDB: $("#nameDB").val(),
                dKff_id:id,
                FaktoreType:FaktoreType
            },
            success: function(a) {
                a = json(a);
                var b = a.length;
                console.log(a);
                tblGetDyanamicheKorrekturfaktoren.colReorder.reset();
                tblGetDyanamicheKorrekturfaktoren.clear().draw();
                for (var e = 0; e < b; e++){
                 var rowNode = tblGetDyanamicheKorrekturfaktoren.row.add(
                        [a[e].subtypeTxtOptNameDKff,
                        a[e].subtypeTxtoptzBezugDkff,
                        a[e].subtypeTxtoptzTempDkff,
                        a[e].bezugStartTxt,
                        a[e].bezugEndTxt,
                        a[e].tempStartTxt,
                        a[e].tempEndTxt,
                        a[e].subtypeTxtoptzFaktoreDkff,
                        "",
                        "",
                        "",
                        "",
                        typeValueSubtypeformatDynamic(a[e].formatDynamicType),
                         a[e].nameBer,
                        "<a data-id='"+a[e].dKffOption_id+"' ber-id='"+a[e].ber_ID+"' data-id-parent='"+a[e].dKff_id+"' class='dyanamicheKorrekturfaktorenMenuEdit'>Edit</a> | <a class='dyanamicheKorrekturfaktorenMenuDel' data-id='"+a[e].dKffOption_id+"'>Delete</a>"]).draw().node();
                       $( rowNode ).attr('data-type',a[e].formatDynamicType).css("cursor", "pointer");
                }
            }
        })
    }else if(FaktoreType==5 || FaktoreType==9){
       // alert(FaktoreType);
          $.ajax({
            type: "POST",
            async: !0,
            url: "php/getDKorrekturfaktor.php",
            data: {
                nameDB: $("#nameDB").val(),
                dKff_id:id,
                FaktoreType:FaktoreType
            },
            success: function(a) {
                a = json(a);
                var b = a.length;
                //console.log(a);
                tblGetDyanamicheKorrekturfaktoren.colReorder.reset();
                tblGetDyanamicheKorrekturfaktoren.clear().draw();
                for (var e = 0; e < b; e++){
                   if(calculationTypeDKff ==4){
                        var editDel = "<a data-id='"+a[e].dKffOption_id+"' ber-id='"+a[e].ber_ID+"' data-id-parent='"+a[e].dKff_id+"' class='dyanamicheKorrekturfaktorenMenuEdit'>Edit</a> | <a class='dyanamicheKorrekturfaktorenMenuDel' data-id='"+a[e].dKffOption_id+"'>Delete</a>";
                     }else{
                        var editDel =  "<a calc-id='"+a[e].calculateID+"'  ber-id='"+a[e].ber_ID+"' data-id='"+a[e].dKffOption_id+"' data-id-parent='"+a[e].dKff_id+"' class='dyanamicheKorrekturfaktorenMenuEdit'>Edit</a>";
                     }
                   var rowNode = tblGetDyanamicheKorrekturfaktoren.row.add(
                        [a[e].subtypeTxtOptNameDKff,
                        a[e].subtypeTxtoptzBezugDkff,
                        a[e].subtypeTxtoptzTempDkff,
                        a[e].bezugStartTxt,
                        a[e].bezugEndTxt,
                        a[e].tempStartTxt,
                        a[e].tempEndTxt,
                        a[e].subtypeTxtoptzFaktoreDkff,
                        a[e].faktorName,
                        a[e].faktorCalc,
                        a[e].faktorWert,
                        a[e].result,
                    typeValueSubtypeformatDynamic(a[e].formatDynamicType),
                        a[e].nameBer,
                       editDel]).draw().node();
                    $( rowNode ).attr('data-type',a[e].formatDynamicType).css("cursor", "pointer");

                   if(e%2!=0 && calculationTypeDKff !=4){
                    var rowData = tblGetDyanamicheKorrekturfaktoren.row(rowNode);
                    rowData.child( tblOptionenRecordAndDelOpt(a[e].calculationType,a[e].calculationResult,a[e].calculateID)).show();
                   }
               }
            }
        })

    }else{
        $.ajax({
            type: "POST",
            async: !0,
            url: "php/getDKorrekturfaktor.php",
            data: {
                nameDB: $("#nameDB").val(),
                dKff_id:id
            },
            success: function(a) {
                a = json(a);
                var b = a.length;
                console.log(a);
                tblGetDyanamicheKorrekturfaktoren.colReorder.reset();
                tblGetDyanamicheKorrekturfaktoren.clear().draw();
                for (var e = 0; e < b; e++){
                 var rowNode = tblGetDyanamicheKorrekturfaktoren.row.add(
                        [a[e].subtypeTxtOptNameDKff,
                        a[e].subtypeTxtoptzBezugDkff,
                        a[e].subtypeTxtoptzTempDkff,
                        a[e].bezugStartTxt,
                        a[e].bezugEndTxt,
                        a[e].tempStartTxt,
                        a[e].tempEndTxt,
                        a[e].subtypeTxtoptzFaktoreDkff,
                        a[e].faktorName,
                        a[e].faktorCalc,
                        a[e].faktorWert,
                        a[e].result,
                        typeValueSubtypeformatDynamic(a[e].formatDynamicType),
                        a[e].nameBer,
                        "<a data-id='"+a[e].dKffOption_id+"'  ber-id='"+a[e].ber_ID+"' data-id-parent='"+a[e].dKff_id+"' class='dyanamicheKorrekturfaktorenMenuEdit'>Edit</a> | <a class='dyanamicheKorrekturfaktorenMenuDel' data-id='"+a[e].dKffOption_id+"'>Delete</a>"]).draw().node();
                    $( rowNode ).attr('data-type',a[e].formatDynamicType).css("cursor", "pointer");
               }
            }
        })
     }
    }, 300);
}
/*get dynamiche Correction factor get ajax response 13-04-2020*/


/*27-04-2020 Group Management in static faktor module create new button click event save data*/
function KorrekturFaktorEinfügenGruppenSpeichern() {
    var addNewGroupTxt = $("#addNewGroupTxtStaticCF").val();
    $.ajax({
        type: "POST",
        async: !0,
        url: "php/staticKorrekturfaktorGruppen.php",
        data: {
            id: "ePrdKFEGruppen",
            modus: "save",
            nameDB: $("#nameDB").val(),
            ePrdID: $("#ePrdID").val(),
            addNewGroupTxt: addNewGroupTxt
        },
        success: function(a) {
            //alert(a);
            if (a == 1) {
                alert("Daten erfolgreich gespeichert");
                $("#groupStaticCF").html('');
                getKorrekturFaktorEinfügenGruppen();
                setTimeout(function() {
                    var selTxt = $("#addNewGroupTxtStaticCF").val();
                    $("#groupStaticCF option").filter(function() {
                        return $(this).text() == selTxt;
                    }).prop("selected", true);
                    $("#addNewGroupTxtStaticCF").val("");
                    $("#groupStaticCFDiv").hide();
                }, 300);
            } else {
                alert("Gruppenname bereits vorhanden, bitte anderen Namen eingeben");
            }
        }
    })
}
/*27-04-2020 Group Management in static faktor module create new button click event save data*/

/*28-04-2020 Group Management in static faktor module get group data into select option */
function getKorrekturFaktorEinfügenGruppen() {
    $("#groupStaticCF").html('');
    $.ajax({
        type: "POST",
        async: !0,
        url: "php/staticKorrekturfaktorGruppen.php",
        data: {
            id: "ePrdKFEGruppenGet",
            modus: "display",
            nameDB: $("#nameDB").val(),
            ePrdID: $("#ePrdIdStore").val()
        },
        success: function(e) {
            e = json(e);
            //console.log(e);
            var toAppend = '';
            for (var c = 0; c < e.length; c++) {
                if (c == 0) {
                    toAppend += '<option value="">--Select--</option>';
                }
                toAppend += '<option value="' + e[c].ePrdKFE_GrpID + '">' + e[c].grp_name + '</option>';

                //$("#groupStaticCF").html(data);
            }
            //console.log(toAppend);
            $("#groupStaticCF").append(toAppend);
        }
    })
}
/*28-04-2020 Group Management in static faktor module get group data into select option */

/*06-05-2020 Group Management in static faktor module update group data into select option update button click */
function updateKorrekturFaktorEinfügenGruppen() {
    var updateGroupTxt = $("#updateGroupTxtStaticCF").val();
    var updateGroupSelID = $("#updateGroupSelIDStaticCF").val();
    $.ajax({
        type: "POST",
        async: !0,
        url: "php/staticKorrekturfaktorGruppen.php",
        data: {
            id: "ePrdKFEGruppenUpdate",
            modus: "update",
            nameDB: $("#nameDB").val(),
            ePrdID: $("#ePrdID").val(),
            updateGroupTxt: updateGroupTxt,
            updateGroupSelID: updateGroupSelID
        },
        success: function(a) {
            if (a == 1) {
                alert("Datensatz wurde erfolgreich aktualisiert!");
                getKorrekturFaktorEinfügenGruppen();
                setTimeout(function() {
                    $("#groupStaticCF").val(updateGroupSelID);
                    // $("#updateGroupTxtStaticCF").val('');
                    //$("#updateGroupSelIDStaticCF").val('');
                    $("#groupUpdateStaticCFDiv").hide();
                    getStatischeKorrekturfaktoren(updateGroupSelID);
                }, 300);
            } else {
                alert("Gruppenname bereits vorhanden, bitte anderen Namen eingeben!");
            }

        }
    })
}
/*06-05-2020 Group Management in static faktor module update group data into select option update button click */

/*06-05-2020 Group Management in static faktor module delete group  */
function korrekturFaktorEinfügenGruppenloschen() {
    var groupSelID = $('#updateGroupSelIDStaticCF').val();
    if (confirm("Möchten Sie sicher löschen?")) {
        $.ajax({
            type: "POST",
            async: !0,
            url: "php/staticKorrekturfaktorGruppen.php",
            data: {
                id: "ePrdKFEGruppenDelete",
                modus: "delete",
                nameDB: $("#nameDB").val(),
                ePrdID: $("#ePrdID").val(),
                groupSelID: groupSelID

            },
            success: function(a) {
                getKorrekturFaktorEinfügenGruppen();
                $("#updateGroupTxtStaticCF").val('');
                //$("#updateGroupSelIDStaticCF").val('');
                $("#groupUpdateStaticCFDiv").hide();
                getStatischeKorrekturfaktoren(groupSelID);
            }
        });
    }
    return false;
}
/*06-05-2020 dynamiche Correction factor delete record ajax response*/

/*14-03-2020 dynamiche Correction factor update record ajax response*/
function DynamischeKorrekturfaktorenAktualisieren() {
    var parentOptName = $("#optionNameDKff").val();
    var parentBeschreibunDesc = $("#optionBeschreibungDKff").val();

     var optionName = $('#subtypeTxtOptNameDKff').val();
     var optionBezug = $('#subtypeTxtoptzBezugDkff').val();
     var optionTemp = $('#subtypeTxtoptzTempDkff').val();
     var optionFaktore = $('#subtypeTxtoptzFaktoreDkff').val();
     var ePrdDIdStore = $('#ePrdDIdStore').val();
     var ePrdDMainIdStore = $('#ePrdDMainIdStore').val();
     var basisFktr2Name = $('#subtypeTxtBasisFaktor2Name').val();
     var basisFktr2Calc = $('.subtypeTxtBasisFaktor2Calc').val();
     var basisFktr2Wert = $('#subtypeTxtBasisFaktor2Wert').val();
     var ePrddKffOptionIDStore = $('#ePrddKffOptionIDStore').val();

     var faktoreDynamictypeVal = $('.formatDynamicSelOptRow1').val();
     //alert(faktoreDynamictypeVal);
     var faktorType = $(".auswahlTypierungFaktorDKff").val();
     var bezugStartTxt = $("#bezugStartTxt").val();
     var bezugEndTxt = $("#bezugEndTxt").val();
     var tempStartTxt = $("#tempStartTxt").val();
     var tempEndTxt = $("#tempEndTxt").val();

     var ePrdDKFECalcResult = $("#ePrdDKFECalcResult").val();
     var messstellenBerecheID = $('#messstellenBerecheID').val();

    /*Faktor 5 or 9 delete option row*/
    var ePrdDKFERow1ID = $('#ePrdDKFERow1ID').val();
    var ePrdDKFERow2ID = $('#ePrdDKFERow2ID').val();
    var updateOptType = $('#updateOptType').val();
    var basisFktr3Name = $('#subtypeTxtBasisFaktor3Name').val();
    var basisFktr3Calc = $('.subtypeTxtBasisFaktor3Calc').val();
    var basisFktr3Wert = $('#subtypeTxtBasisFaktor3Wert').val();

    var optionName2 = $('#subtypeTxtOptNameDKff2').val();
    var optionBezug2 = $('#subtypeTxtoptzBezugDkff2').val();
    var optionTemp2 = $('#subtypeTxtoptzTempDkff2').val();
    var bezugStartTxt2 = $("#bezugStartTxt2").val();
    var bezugEndTxt2 = $("#bezugEndTxt2").val();
    var tempStartTxt2 = $("#tempStartTxt2").val();
    var tempEndTxt2 = $("#tempEndTxt2").val();
    var optionFaktore2 = $('#subtypeTxtoptzFaktoreDkff2').val();
    var faktoreDynamictypeVal2 = $('.formatDynamicSelOptRow2').val();
    var messstellenBerecheID2 = $('#messstellenBerecheID2').val();
    var calculationTypeDKff = $('.calculationTypeDKff').val();


    if(basisFktr2Wert !='' && optionFaktore !=''){
        var faktoreRep = optionFaktore.replace(",", ".");
        var basisFktr2WertRep = basisFktr2Wert.replace(",", ".");

        var faktore2Comma = optionFaktore.replace(".", ",");
        var basisFktrWertComma = basisFktr2Wert.replace(".", ",");
        if(isFloat(faktoreRep)==true && isFloat(basisFktr2WertRep)==true){
            var result2CommaDigit = eval(faktoreRep + basisFktr2Calc + basisFktr2WertRep);
        }else{
            alert("Bitte geben Sie den Textwert in faktore und wert ein");
            return false;
        }
        var result = result2CommaDigit.toFixed(4).replace(".", ",");
    }else{
        var result ='';
    }
    if(faktorType ==4 || faktorType ==1 || faktorType ==5  || faktorType ==6 || faktorType ==8 || faktorType ==9){
        if(optionFaktore !=''){
            var faktoreRep = optionFaktore.replace(",", ".");
            var faktore2CommaRep = optionFaktore.replace(".", ",");
            if(isFloat(faktoreRep)==true){
                var faktore2Comma = faktore2CommaRep;
            }else{
                alert("Bitte geben Sie den Textwert in faktore und wert ein");
                return false;
            }
        }
    }
    if(faktorType ==6 || faktorType ==7 || faktorType==8 || faktorType==9){
        //alert(validateStartEndInputBezugFaktorTypeBasicBetween(faktorType));
        if(validateStartEndInputBezugFaktorTypeBasicBetween(faktorType) != true){
            return false;
        }
    }

    if(faktorType==5 || faktorType==9){

        var calculateID = $('#ePrdDKFECalcID').val();
        var wertRow1 = $('#subtypeTxtBasisFaktor2Wert').val();
        var wertRow2 = $('#ePrdDKFECalcWertR2').val();

        var ePrdDKFECalcWert = $('#ePrdDKFECalcWert').val();
        var ePrdDKFECalcRowType = $('#ePrdDKFECalcRowType').val();

        var faktor = $('#ePrdDKFECalcFaktor').val();

        if(basisFktr3Wert !='' && optionFaktore2 !='' /*&& (calculationTypeDKff ==2 || calculationTypeDKff ==3 )*/){
            var faktoreRep2 = optionFaktore2.replace(",", ".");
            var basisFktr3WertRep = basisFktr3Wert.replace(",", ".");

            var faktore3Comma = optionFaktore2.replace(".", ",");
            var basisFktrWert3Comma = basisFktr3Wert.replace(".", ",");

            if(isFloat(faktoreRep2)==true && isFloat(basisFktr3WertRep)==true){
                var result3CommaDigit = eval(faktoreRep2 + basisFktr3Calc + basisFktr3WertRep);
            }else{
                alert("Bitte geben Sie den Textwert in faktore und wert ein");
                return false;
            }

           // alert('result2=' +result2 );
        }
        if(result3CommaDigit){
             var result2 = result3CommaDigit.toFixed(4).replace(".", ",");
         }else{
             var result2 = '';
         }
        ////////////////////////
        if(updateOptType !='deleteClickUpdate'){
            if(calculationTypeDKff ==3){
                    if(ePrdDKFECalcRowType =='odd' && wertRow1 !=='' && wertRow2 !=''){
                    var calculationType = $('.subtypeTxtBasisFaktor2CalcRght').val();
                    var results = eval(wertRow1 + calculationType + wertRow2);
                    var calcResult = results.toFixed(4).replace(".", ",");
                    //alert('calcResult1='+calcResult);
                    }
                    if(ePrdDKFECalcRowType =='even' && wertRow1 !=='' && ePrdDKFECalcWert !=''){
                    var calculationType = $('.subtypeTxtBasisFaktor2CalcRght').val();
                    var results = eval(wertRow1 + calculationType + ePrdDKFECalcWert);
                    var calcResult = results.toFixed(4).replace(".", ",");
                    //alert('calcResult2='+calcResult);
                    }
            }else{
                var basisFktr2WertRep = basisFktr2Wert.replace(",", ".");
                 if(faktor !=='' && basisFktr2WertRep !=''){
                    var calculationType = $('.subtypeTxtBasisFaktor2CalcRght').val();
                     //alert('basisFktr2WertRep='+basisFktr2WertRep);
                    var results = eval(faktor + calculationType + basisFktr2WertRep);
                    var calcResult = results.toFixed(4).replace(".", ",");
                    //alert('calcResult3='+calcResult);
                }else{
                    var calculationType = $('#ePrdDKFECalcType').val();
                    var results = eval(faktoreRep + calculationType + ePrdDKFECalcWert);
                    var calcResult = results.toFixed(4).replace(".", ",");
                   //alert('calcResult4='+calcResult);
                }

            }
        }else{
        ////////////////////////
        var basisFktr2WertRepRght = basisFktr2Wert.replace(",", ".");
        var basisFktr2WertCommaRght = basisFktr2Wert.replace(".", ",");
        var faktore3RepType5 = optionFaktore2.replace(",", ".");
        var basisFktr3WertRepType5 = basisFktr3Wert.replace(",", ".");
        var basisFktr2CalcRght =$(".subtypeTxtBasisFaktor2CalcRght").val();
        var basisFktr3CalcRght =$(".subtypeTxtBasisFaktor3CalcRght").val();

        if( calculationTypeDKff ==1){
             if(faktore3RepType5 !='' && basisFktr2WertRepRght !=''){
                if(isFloat(faktore3RepType5)==true && isFloat(basisFktr2WertRepRght)==true){
                    var resultCalcRght = eval(faktore3RepType5 + basisFktr2CalcRght + basisFktr2WertRepRght);
                }else{
                    alert("Bitte geben Sie den Textwert in faktore und wert ein");
                    return false;
                }
            var calcResult =resultCalcRght.toFixed(4).replace(".", ",");
            var calculationType =basisFktr2CalcRght;
            //alert('resultCalcRghtFinal1='+calcResult);
           }
        }else if( calculationTypeDKff ==2){
            if(faktoreRep !='' && basisFktr3WertRepType5 !='' && basisFktr3CalcRght !=''){
                if(isFloat(faktoreRep)==true && isFloat(basisFktr3WertRepType5)==true){
                    var resultCalcRght = eval(faktoreRep + basisFktr3CalcRght + basisFktr3WertRepType5);
                }else{
                    alert("Bitte geben Sie den Textwert in faktore und wert ein");
                    return false;
                }
            var calcResult =resultCalcRght.toFixed(4).replace(".", ",");
            var calculationType =basisFktr3CalcRght;
            //alert('resultCalcRghtFinal2='+resultCalcRght);
           }
        }else if(calculationTypeDKff ==3){
            if(basisFktr2WertRepRght !='' && basisFktr3WertRepType5 !='' && basisFktr2CalcRght !=''){
                if(isFloat(basisFktr2WertRepRght)==true && isFloat(basisFktr3WertRepType5)==true){
                    var resultCalcRght = eval(basisFktr2WertRepRght + basisFktr2CalcRght + basisFktr3WertRepType5);
                }else{
                    alert("Bitte geben Sie den Textwert in faktore und wert ein");
                    return false;
                }
            var calcResult =resultCalcRght.toFixed(4).replace(".", ",");
            var calculationType =basisFktr2CalcRght;
            //alert('resultCalcRghtFinal3='+resultCalcRght);
           }
        }
      }
    }
   // validateStartEndInputBezugFaktorTypeBasicBetween(faktorType);
    //alert(optionFaktore);
        $.ajax({
            type: "POST",
            async: !0,
            url: "php/instanzIntoDb.php",
            data: {
                id: "ePrdDKFEUpdate",
                modus: "update",
                nameDB: $("#nameDB").val(),
                ePrdID: $("#ePrdID").val(),
                optionName: optionName,
                optionBezug:optionBezug,
                optionTemp:optionTemp,
                optionFaktore:faktore2Comma,
                ePrdDIdStore:ePrdDIdStore,
                parentOptName:parentOptName,
                parentBeschreibunDesc:parentBeschreibunDesc,
                ePrdDMainIdStore:ePrdDMainIdStore,
                basisFktr2Name:basisFktr2Name,
                basisFktr2Calc:basisFktr2Calc,
                basisFktr2Wert:basisFktrWertComma,
                result:result,
                ePrddKffOptionIDStore:ePrddKffOptionIDStore,
                faktoreDynamictypeVal:faktoreDynamictypeVal,
                faktorType:faktorType,
                bezugStartTxt:bezugStartTxt,
                bezugEndTxt:bezugEndTxt,
                tempStartTxt:tempStartTxt,
                tempEndTxt:tempEndTxt,
                calculationType:calculationType,
                calcResult:calcResult,
                calculateID:calculateID,
                messstellenBerecheID:messstellenBerecheID,
                ePrdDKFERow1ID:ePrdDKFERow1ID,
                ePrdDKFERow2ID:ePrdDKFERow2ID,
                updateOptType:updateOptType,
                basisFktr3Name:basisFktr3Name,
                basisFktr3Calc:basisFktr3Calc,
                basisFktr3Wert:basisFktrWert3Comma,
                optionName2:optionName2,
                optionBezug2:optionBezug2,
                optionTemp2 :optionTemp2,
                bezugStartTxt2:bezugStartTxt2,
                bezugEndTxt2:bezugEndTxt2,
                tempStartTxt2: tempStartTxt2,
                tempEndTxt2 :tempEndTxt2,
                optionFaktore2:optionFaktore2,
                faktoreDynamictypeVal2:faktoreDynamictypeVal2,
                messstellenBerecheID2:messstellenBerecheID2,
                result2:result2

            },
            success: function(a) {
                alert("Datensatz wurde erfolgreich aktualisiert!");
                $('#subtypeTxtOptNameDKff').val("");
                $('#subtypeTxtoptzBezugDkff').val("");
                $('#subtypeTxtoptzTempDkff').val("");
                $('#subtypeTxtoptzFaktoreDkff').val("");
                $('#ePrdDIdStore').val("");
                $("#btnOptionHinzEPrdDKffUpdate").hide();
                $("#btnOptionHinzEPrdDKffStornieren").hide();
                $("#btnOptionHinzEPrdDKff").show();
                $("#DkFeSpeichern").show();
                $("#DkFeHinz").show();
                $("#DkFeFirst").show();
                $("#DkFePrevious").show();
                $("#DkFeNext").show();
                $("#DkFeLast").show();
                $("#DkFeSuchen").show();

                var auswahlTypierungVal = $('.auswahlTypierungFaktorDKff').val();
                var typeDynamicCFVal = $(".typeDynamicCF").val();
                var subtypeTimeDynamicCFVal = $(".subtypeTimeDynamicCF").val();
                var calculationTypeDKff = $(".calculationTypeDKff").val();

                $("#basicFaktorRow1 input").val('');
                $("#basicFaktorRow1 select").val('');
                $("#basicFaktorRow3 input").val('');
                $("#basicFaktorRow3 select").val('');
                $("#basicFaktorRow2 input").val('');
                $("#basicFaktorRow2 select").val('');
                $("#basicFaktorRow4 input").val('');
                $("#basicFaktorRow4 select").val('');
                $('#ePrdDKFERow1ID').val('');
                $('#ePrdDKFERow2ID').val('');
                $('#updateOptType').val('');
                if(typeDynamicCFVal !='' && subtypeTimeDynamicCFVal !=''){
                    visibleInvisibleColumnDataOnTypeSelection(typeDynamicCFVal,subtypeTimeDynamicCFVal,auswahlTypierungVal);
                    addValidateClassOnRightSelecOptRow2VisibilityBezugTemp(auswahlTypierungVal,typeDynamicCFVal,subtypeTimeDynamicCFVal);

                }
                getDynamischeKorrekturfaktoren(ePrdDMainIdStore);
                if(calculationTypeDKff && auswahlTypierungVal == 5){
                    basicPlus2ConditionMultiplayCalculationType(calculationTypeDKff);
                }
            }
    })
}
/*14-04-2020 dynamiche Correction factor update record ajax response*/

/*14-04-2020 dynamiche Correction factor delete record ajax response*/
function dynamischeKorrekturfaktorenloschen(id) {
    var ePrdDMainIdStore = $('#ePrdDMainIdStore').val();
    var faktorType = $(".auswahlTypierungFaktorDKff").val();
    if (confirm("Möchten Sie sicher löschen?")) {
        $.ajax({
            type: "POST",
            async: !0,
            url: "php/instanzIntoDb.php",
            data: {
                id: "ePrdDKFEDelete",
                modus: "delete",
                nameDB: $("#nameDB").val(),
                ePrdID: $("#ePrdID").val(),
                dKffOption_id: id,
                faktorType:faktorType

            },
            success: function(a) {
                alert("Datensatz wurde erfolgreich gelöscht!");
                getDynamischeKorrekturfaktoren(ePrdDMainIdStore);
            }
    });
  }
    return false;
}
/*14-04-2020 dynamiche Correction factor delete record ajax response*/


/*Ajax Call for the dynamische Korrektur faktoren serach 14-04-2020*/
function dynamischeKorrekturfaktorenSuchen() {
     var a = itemSessionGet("nameDB");
     //console.log(a);
    $.ajax({
        type: "POST",
        async: !0,
        url: "php/getDKorrekturfaktorParent.php",
        data: {
            nameDB: $("#nameDB").val()
        },
        success: function(e) {
            //console.log('Working fine');
            e = json(e);
            //console.log(e);
            tblGetDyanamicheKorrekturfaktorenParent.colReorder.reset();
            tblGetDyanamicheKorrekturfaktorenParent.clear().draw();
            for (var c = 0; c < e.length; c++){ console.log(e[c]);
                if(e[c].basisType==1){var basisTypeDesc = 'Basic';
                }else if(e[c].basisType==2){var basisTypeDesc = 'Basic + Multiplay';
                }else if(e[c].basisType==3){var basisTypeDesc = 'Basic + Multiplay 2';
                }else if(e[c].basisType==4){var basisTypeDesc = 'Basic + 2 Conditions';
                }else if(e[c].basisType==5){var basisTypeDesc = 'Basic + 2 Condition & Multiplay';
                }else if(e[c].basisType==6){var basisTypeDesc = 'Basic Between';
                }else if(e[c].basisType==7){var basisTypeDesc = 'Basic Between + Multiplay';
                }else if(e[c].basisType==8){var basisTypeDesc = 'Basic Between + 2 Conditions';
                }else if(e[c].basisType==9){var basisTypeDesc = 'Basic Between + 2 Contition + Multiplay'; }
                var rowNode = tblGetDyanamicheKorrekturfaktorenParent.row.add([
                    e[c].optionNameDKff,
                    e[c].optionBeschreibungDKff,
                    basisTypeDesc,
                    e[c].typeDynamicCF,
                    typeValueSubtypeformatDynamic(e[c].subtypeTimeDynamicCF)
                    ]).draw().node();
                 $( rowNode ).attr('data-id',e[c].dKff_id).attr('data-type',e[c].subtypeTimeDynamicCF).attr('calculation-type',e[c].calculationTypeDKff).css("cursor", "pointer");
            }
            $("#dyanamicheKorrekturfaktorenParentContainer").css("display", "block");
            $("#dyanamicheKorrekturfaktorenParentContainer").dialog({
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
                },
                open: function() {
                    console.log('open popup');
                }
            })
        }
    })
}


/*get single record dynamiche Correction factor get ajax response 16-04-2020*/
function getSingleRecordDynamischeKorrekturfaktoren(parentID) {
    $.ajax({
        type: "POST",
        async: !0,
        url: "php/getDKorrekturfaktorParent.php",
        data: {
            nameDB: $("#nameDB").val(),
            dKff_id:parentID
        },
        success: function(a) {
            a = json(a);
            //var b = a.length;
            //console.log(a);
            var dKff_id = a[0].dKff_id;
            var optionNameDKff = a[0].optionNameDKff;
            var optionBeschreibungDKff = a[0].optionBeschreibungDKff;
            var typeDynamicCF = a[0].typeDynamicCF;
            var subtypeTimeDynamicCF = a[0].subtypeTimeDynamicCF;

            $("#ePrdDMainIdStore").val("");
            $("#optionNameDKff").val(optionNameDKff);
            $("#optionBeschreibungDKff").val(optionBeschreibungDKff);
            $(".typeDynamicCF").val(typeDynamicCF);
            //$(".subtypeTimeDynamicCF").show();
            $(".subtypeTimeDynamicCF").val(subtypeTimeDynamicCF);
            $("#ePrdDMainIdStore").val(dKff_id);
            $(".typeDynamicCF").prop('disabled', 'disabled');
            $(".subtypeTimeDynamicCF").prop('disabled', 'disabled');

            if(subtypeTimeDynamicCF =='year'){
                console.log('year');
                /*$(".subtypeTxtDynamicCF").show();*/
                $("#subtypeTxtoptzBezugDkff").removeClass();
                $("#subtypeTxtoptzBezugDkff").addClass('yearBezugValidate');
            }else if(subtypeTimeDynamicCF =='month'){
                console.log('month');
                /*$(".subtypeTxtDynamicCF").show();*/
                $("#subtypeTxtoptzBezugDkff").removeClass();
                $("#subtypeTxtoptzBezugDkff").addClass('monthBezugValidate');
            }else if(subtypeTimeDynamicCF =='monthYear'){
                console.log('monthYear');
                /*$(".subtypeTxtDynamicCF").show();*/
                $("#subtypeTxtoptzBezugDkff").removeClass();
                $("#subtypeTxtoptzBezugDkff").addClass('monthYearBezugValidate');
            }else if(subtypeTimeDynamicCF =='day'){
                console.log('day');
                /*$(".subtypeTxtDynamicCF").show();*/
                $("#subtypeTxtoptzBezugDkff").removeClass();
                $("#subtypeTxtoptzBezugDkff").addClass('dayBezugValidate');
            }else if(subtypeTimeDynamicCF =='dayMonth'){
                console.log('dayMonth');
                /*$(".subtypeTxtDynamicCF").show();*/
                $("#subtypeTxtoptzBezugDkff").removeClass();
                $("#subtypeTxtoptzBezugDkff").addClass('dayMonthBezugValidate');
            }else if(subtypeTimeDynamicCF ==''){
                console.log('Other');
                $(".subtypeTxtDynamicCF").hide();
                $("#subtypeTxtoptzBezugDkff").removeClass();
            }
        }
    })
}
/*get single record dynamiche Correction factor get ajax response 16-04-2020*/


/*16-04-2020  default page load data id append into the input fields */

function getLastIdDataAppendDynamicKorrektorFaktor(key,parentDataID){
     $.ajax({
        type: "POST",
        async: !0,
        url: "php/getDKorrekturfaktorParentChild.php",
        data: {
            nameDB: $("#nameDB").val(),
            key:key,
            id:parentDataID
        },
        success: function(a) {
            a = json(a);
            //console.log(a);
            if(a.length ==1){
            var dKff_id = a[0].dKff_id;
            var optionNameDKff = a[0].optionNameDKff;
            var optionBeschreibungDKff = a[0].optionBeschreibungDKff;
            var typeDynamicCF = a[0].typeDynamicCF;
            var subtypeTimeDynamicCF = a[0].subtypeTimeDynamicCF;

            $("#ePrdDMainIdStore").val("");
            $("#optionNameDKff").val("");
            $("#optionBeschreibungDKff").val("");
            $(".typeDynamicCF").val("");
            $(".subtypeTimeDynamicCF").val("");
            //$(".subtypeTimeDynamicCF").hide();
            $(".typeDynamicCF").prop('disabled', false);
            $(".subtypeTimeDynamicCF").prop('disabled', false);

            $("#DkFeSpeichern").show();
            $("#DkFeHinz").show();
            $("#DkFeFirst").show();
            $("#DkFePrevious").show();
            $("#DkFeNext").show();
            $("#DkFeLast").show();
            $("#DkFeSuchen").show();
            /*$(".subtypeTxtDynamicCF").show();*/

            /*next previous id assign*/
            //$("#ePrdDMainIdStore").val(dKff_id);
            $("#DkFeNext").attr('data-id',dKff_id);
            $("#DkFePrevious").attr('data-id',dKff_id);
           /* getDynamischeKorrekturfaktoren(dKff_id);*/
            }
        }
    })
}
/*16-04-2020 default page load data id append into the input fields */

/*17-04-2020 default page load data show when next previous click */
function getLastIdDataShowNextPrevDynamicKorrektorFaktor(key,parentDataID){
     $.ajax({
        type: "POST",
        async: !0,
        url: "php/getDKorrekturfaktorParentChild.php",
        data: {
            nameDB: $("#nameDB").val(),
            key:key,
            id:parentDataID
        },
        success: function(a) {
            a = json(a);
            //console.log(a);
            if(a.length ==1){
            var dKff_id = a[0].dKff_id;
            var optionNameDKff = a[0].optionNameDKff;
            var optionBeschreibungDKff = a[0].optionBeschreibungDKff;
            var typeDynamicCF = a[0].typeDynamicCF;
            var subtypeTimeDynamicCF = a[0].subtypeTimeDynamicCF;
            var basisType = a[0].basisType;
            var calculationTypeDKff = a[0].calculationTypeDKff;

            $("#ePrdDMainIdStore").val("");
            $("#optionNameDKff").val(optionNameDKff);
            $("#optionBeschreibungDKff").val(optionBeschreibungDKff);
            $(".typeDynamicCF").val(typeDynamicCF);
            //$(".subtypeTimeDynamicCF").show();
            $(".subtypeTimeDynamicCF").val(subtypeTimeDynamicCF);
            $(".auswahlTypierungFaktorDKff").val(basisType);
            $(".calculationTypeDKff").val(calculationTypeDKff);

            $(".typeDynamicCF").prop('disabled', 'disabled');
            $(".subtypeTimeDynamicCF").prop('disabled', 'disabled');
            $(".auswahlTypierungFaktorDKff").prop('disabled', 'disabled');

            $("#DkFeSpeichern").show();
            $("#DkFeHinz").show();
            $("#DkFeFirst").show();
            $("#DkFePrevious").show();
            $("#DkFeNext").show();
            $("#DkFeLast").show();
            $("#DkFeSuchen").show();
            $(".subtypeTxtDynamicCF").show();

            /*next previous id assign*/

            $("#ePrdDMainIdStore").val(dKff_id);
            $("#DkFeNext").attr('data-id',dKff_id);
            $("#DkFePrevious").attr('data-id',dKff_id);
            getDynamischeKorrekturfaktoren(dKff_id);
            $('#tblGetDyanamicheKorrekturfaktoren').parents('div.dataTables_wrapper').first().show();

            }
        }
    })
}
/*17-04-2020 default page load data show when next previous click*/


/*14-05-2020 reset/destroy dataTable*/

function visibleInvisibleColumnDataOnTypeSelection(typeDynamicCFVal,subtypeTimeDynamicCFVal,auswahlTypierungVal)
        {
            /*alert(typeDynamicCFVal);alert(subtypeTimeDynamicCFVal);alert(auswahlTypierungVal);*/
            tblOptionenEPrdDKff.rows().remove().draw();         /*tblGetDyanamicheKorrekturfaktoren.rows().remove().draw();*/
            $('#tblOptionenEPrdDKff .dataTables_empty').attr('colspan','100%');
            $('#tblGetDyanamicheKorrekturfaktoren .dataTables_empty').attr('colspan','100%');
            $(".subtypeTxtDynamicCFRow2").hide();
            $(".formatDynamicBezugRow2").hide();
            $(".subtypeTxtBasisFaktor2CalcRghtDiv").hide();
            $(".subtypeTxtBasisFaktor3CalcRghtDiv").hide();
            $(".delReset").hide();
            $("#btnOptionHinzEPrdDKff").show();
            $("#btnOptionHinzEPrdDKffUpdate").hide();
            $("#basicFaktorRow1 input").val('');
            $("#basicFaktorRow1 select").val('');
            $("#basicFaktorRow3 input").val('');
            $("#basicFaktorRow3 select").val('');
            $("#basicFaktorRow2 input").val('');
            $("#basicFaktorRow2 select").val('');
            $("#basicFaktorRow4 input").val('');
            $("#basicFaktorRow4 select").val('');
            if(auswahlTypierungVal =='1' && typeDynamicCFVal=='Zeit'){
                $('.calculationTypeDiv').hide();
                $(".subtypeTxtDynamicCF ").show();
                $(".subtypeTxtBasisFaktor2").hide();
                $(".subtypeTxtBasisFaktor3").hide();
                $(".bezugInputMainDiv").show();
                $(".tempInputMainDiv").hide();
                $(".bezugStartDiv").hide();
                $(".bezugEndDiv").hide();
                $(".tempStartDiv").hide();
                $(".tempEndDiv").hide();
                //$(".subtypeTxtDynamicCF div").css("width", "32%");
                //$(".subtypeTxtDynamicCF label").css("width", "44%");
                $('#tblOptionenEPrdDKff').parents('div.dataTables_wrapper').first().show();
                $('#tblGetDyanamicheKorrekturfaktoren').parents('div.dataTables_wrapper').first().show();
                var columnHide = tblGetDyanamicheKorrekturfaktoren.columns([5,6,3,4,2,8,9,10,11,12]);
                columnHide.visible(! columnHide.visible() );

                var columnShow = tblGetDyanamicheKorrekturfaktoren.columns([0,1,7,13,14]);
                columnShow.visible( columnShow.visible() );
                var columnHideMore = tblOptionenEPrdDKff.columns([5,6,3,4,2,8,9,10,11,12]);
                columnHideMore.visible(! columnHideMore.visible() );
                var columnShowMore = tblOptionenEPrdDKff.columns([0,1,7,13]);
                columnShowMore.visible( columnShowMore.visible() );
                $(".formatDynamicBezugRow1").hide();
                $(".subtypeTxtDynamicCFRow2").hide();
                $(".formatDynamicBezugRow2").hide();
                $("#basicFaktorRow1").removeClass("tempMonthCaseWidth");
                $("#basicFaktorRow2").removeClass("tempMonthCaseWidth");
            }else if(auswahlTypierungVal =='2' && typeDynamicCFVal=='Zeit'){
                $('.calculationTypeDiv').hide();
                $(".subtypeTxtDynamicCF ").show();
                $(".subtypeTxtBasisFaktor2").show();
                $(".subtypeTxtBasisFaktor3").hide();
                $(".bezugInputMainDiv").show();
                $(".tempInputMainDiv").hide();
                $(".bezugStartDiv").hide();
                $(".bezugEndDiv").hide();
                $(".tempStartDiv").hide();
                $(".tempEndDiv").hide();
                //$(".subtypeTxtDynamicCF div").css("width", "32%");
                //$(".subtypeTxtDynamicCF label").css("width", "44%");
                $('#tblOptionenEPrdDKff').parents('div.dataTables_wrapper').first().show();
                var columnHide = tblGetDyanamicheKorrekturfaktoren.columns([5,6,3,4,2,12]);

                columnHide.visible( !columnHide.visible() );
                var columnShow = tblGetDyanamicheKorrekturfaktoren.columns([0,1,7,8,9,10,11,13,14]);
                columnShow.visible( columnShow.visible() );

                var columnHideMore = tblOptionenEPrdDKff.columns([5,6,3,4,2,12]);
                columnHideMore.visible(! columnHideMore.visible() );
                var columnShowMore = tblOptionenEPrdDKff.columns([0,1,8,9,10,11,13]);
                columnShowMore.visible( columnShowMore.visible() );
                $(".formatDynamicBezugRow1").hide();
                $(".subtypeTxtDynamicCFRow2").hide();
                $(".formatDynamicBezugRow2").hide();
                $("#basicFaktorRow1").removeClass("tempMonthCaseWidth");
                $("#basicFaktorRow2").removeClass("tempMonthCaseWidth");
            }else if(auswahlTypierungVal =='3' && typeDynamicCFVal=='Zeit'){
                $('.calculationTypeDiv').hide();
                $(".subtypeTxtDynamicCF ").show();
                $(".subtypeTxtBasisFaktor2").show();
                $(".subtypeTxtBasisFaktor3").show();
                $(".bezugInputMainDiv").show();
                $(".tempInputMainDiv").hide();
                $(".bezugStartDiv").hide();
                $(".bezugEndDiv").hide();
                $(".tempStartDiv").hide();
                $(".tempEndDiv").hide();
                //$(".subtypeTxtDynamicCF div").css("width", "32%");
                //$(".subtypeTxtDynamicCF label").css("width", "44%");
                $('#tblOptionenEPrdDKff').parents('div.dataTables_wrapper').first().show();
                var column = tblGetDyanamicheKorrekturfaktoren.columns([5,6,3,4,2,12]);
                column.visible( !column.visible() );
                var columnShowMore = tblGetDyanamicheKorrekturfaktoren.columns([0,1,7,8,9,10,11,13,14]);
                columnShowMore.visible( columnShowMore.visible() );

                var columnHideMore = tblOptionenEPrdDKff.columns([5,6,3,4,2,12]);
                columnHideMore.visible(! columnHideMore.visible() );
                var columnShowMore = tblOptionenEPrdDKff.columns([0,1,7,8,9,10,11,13]);
                columnShowMore.visible( columnShowMore.visible() );
                $(".formatDynamicBezugRow1").hide();
                $(".subtypeTxtDynamicCFRow2").hide();
                $(".formatDynamicBezugRow2").hide();
                $("#basicFaktorRow1").removeClass("tempMonthCaseWidth");
                $("#basicFaktorRow2").removeClass("tempMonthCaseWidth");
            }else if(auswahlTypierungVal =='1' && typeDynamicCFVal=='Temperatur' && subtypeTimeDynamicCFVal=='tempNum'){
                console.log('Temperatur');
                $('.calculationTypeDiv').hide();
                $(".subtypeTxtDynamicCF ").show();
                $(".subtypeTxtBasisFaktor2").hide();
                $(".subtypeTxtBasisFaktor3").hide();
                $(".bezugInputMainDiv").hide();
                $(".tempInputMainDiv").show();
                $(".bezugStartDiv").hide();
                $(".bezugEndDiv").hide();
                $(".tempStartDiv").hide();
                $(".tempEndDiv").hide();
                //$(".subtypeTxtDynamicCF div").css("width", "32%");
                //$(".subtypeTxtDynamicCF label").css("width", "44%");
                $('#tblOptionenEPrdDKff').parents('div.dataTables_wrapper').first().show();
                $('#tblGetDyanamicheKorrekturfaktoren').parents('div.dataTables_wrapper').first().show();

                //$('#tblGetDyanamicheKorrekturfaktoren').parents('div.dataTables_wrapper').first().hide();
                var columnHide = tblGetDyanamicheKorrekturfaktoren.columns([5,6,3,4,1,8,9,10,11,12]);
                columnHide.visible(! columnHide.visible() );
                var columnShow = tblGetDyanamicheKorrekturfaktoren.columns([0,2,7,13,14]);
                columnShow.visible( columnShow.visible() );
                var columnHideMore = tblOptionenEPrdDKff.columns([5,6,3,4,1,8,9,10,11,12]);
                columnHideMore.visible(! columnHideMore.visible());

                var columnShowMore = tblOptionenEPrdDKff.columns([0,2,7,13]);
                columnShowMore.visible( columnShowMore.visible() );

                $("#subtypeTxtoptzTempDkff").removeClass();
                $("#subtypeTxtoptzTempDkff").addClass('temperatureNumValidate');
                $(".formatDynamicBezugRow1").hide();
                $(".subtypeTxtDynamicCFRow2").hide();
                $(".formatDynamicBezugRow2").hide();
                $("#basicFaktorRow1").removeClass("tempMonthCaseWidth");
                $("#basicFaktorRow2").removeClass("tempMonthCaseWidth");
            }else if(auswahlTypierungVal =='1' && typeDynamicCFVal=='Temperatur' && subtypeTimeDynamicCFVal=='tempOnlyMonth'){
                console.log('month');
                $('.calculationTypeDiv').hide();
                $(".subtypeTxtDynamicCF ").show();
                $(".subtypeTxtBasisFaktor2").hide();
                $(".subtypeTxtBasisFaktor3").hide();
                $(".bezugInputMainDiv").show();
                $(".tempInputMainDiv").hide();
                $(".bezugStartDiv").hide();
                $(".bezugEndDiv").hide();
                $(".tempStartDiv").hide();
                $(".tempEndDiv").hide();
                //$(".subtypeTxtDynamicCF div").css("width", "32%");
                //$(".subtypeTxtDynamicCF label").css("width", "44%");
                $('#tblOptionenEPrdDKff').parents('div.dataTables_wrapper').first().show();
                $('#tblGetDyanamicheKorrekturfaktoren').parents('div.dataTables_wrapper').first().show();

                //$('#tblGetDyanamicheKorrekturfaktoren').parents('div.dataTables_wrapper').first().show();
                var columnHide = tblGetDyanamicheKorrekturfaktoren.columns([5,6,3,4,2,8,9,10,11,12]);
                columnHide.visible(! columnHide.visible() );
                var columnShow = tblGetDyanamicheKorrekturfaktoren.columns([0,1,7,13,14]);
                columnShow.visible(columnShow.visible() );
                var columnHideMore = tblOptionenEPrdDKff.columns([5,6,3,4,2,8,9,10,11,12]);
                columnHideMore.visible(! columnHideMore.visible() );
                var columnShowMore = tblOptionenEPrdDKff.columns([0,1,7,13]);
                columnShowMore.visible( columnShowMore.visible() );
                $("#subtypeTxtoptzTempDkff").removeClass();
                $("#subtypeTxtoptzTempDkff").addClass('temperatureNumValidate');
                $("#subtypeTxtoptzBezugDkff").removeClass();
                $("#subtypeTxtoptzBezugDkff").addClass('monthBezugValidate');
                $(".formatDynamicBezugRow1").hide();
                $(".subtypeTxtDynamicCFRow2").hide();
                $(".formatDynamicBezugRow2").hide();
                $("#basicFaktorRow1").removeClass("tempMonthCaseWidth");
                $("#basicFaktorRow2").removeClass("tempMonthCaseWidth");
            }else if(auswahlTypierungVal =='1' && typeDynamicCFVal=='Temperatur' && subtypeTimeDynamicCFVal=='tempPlusMonth'){
                console.log('TempPlusMonth');
                $('.calculationTypeDiv').hide();
                $(".subtypeTxtDynamicCF ").show();
                $(".subtypeTxtBasisFaktor2").hide();
                $(".subtypeTxtBasisFaktor3").hide();
                $(".bezugInputMainDiv").show();
                $(".tempInputMainDiv").show();
                $(".bezugStartDiv").hide();
                $(".bezugEndDiv").hide();
                $(".tempStartDiv").hide();
                $(".tempEndDiv").hide();
                //$(".subtypeTxtDynamicCF div").css("width", "22%");
                //$(".subtypeTxtDynamicCF label").css("width", "35%");
                $('#tblOptionenEPrdDKff').parents('div.dataTables_wrapper').first().show();
                $('#tblGetDyanamicheKorrekturfaktoren').parents('div.dataTables_wrapper').first().show();

                //$('#tblGetDyanamicheKorrekturfaktoren').parents('div.dataTables_wrapper').first().hide();
                var columnHide = tblGetDyanamicheKorrekturfaktoren.columns([5,6,3,4,8,9,10,11,12]);
                columnHide.visible(! columnHide.visible() );
                var columnShow = tblGetDyanamicheKorrekturfaktoren.columns([0,1,2,7,13,14]);
                columnShow.visible( columnShow.visible() );
                var columnHideMore = tblOptionenEPrdDKff.columns([5,6,3,4,8,9,10,11,12]);
                columnHideMore.visible(! columnHideMore.visible() );
                var columnShowMore = tblOptionenEPrdDKff.columns([0,1,2,7,13]);
                columnShowMore.visible( columnShowMore.visible() );
                $("#subtypeTxtoptzTempDkff").removeClass();
                $("#subtypeTxtoptzTempDkff").addClass('temperatureNumValidate');
                $("#subtypeTxtoptzBezugDkff").removeClass();
                $("#subtypeTxtoptzBezugDkff").addClass('monthBezugValidate');
                $(".formatDynamicBezugRow1").hide();
                $(".subtypeTxtDynamicCFRow2").hide();
                $(".formatDynamicBezugRow2").hide();
                $("#basicFaktorRow1").removeClass("tempMonthCaseWidth");
                $("#basicFaktorRow2").removeClass("tempMonthCaseWidth");
            }else if(auswahlTypierungVal =='1' && typeDynamicCFVal=='Temperatur' && subtypeTimeDynamicCFVal=='tempPlusYear'){
                console.log('TempPlusYear');
                $('.calculationTypeDiv').hide();
                $(".subtypeTxtDynamicCF ").show();
                $(".subtypeTxtBasisFaktor2").hide();
                $(".subtypeTxtBasisFaktor3").hide();
                $(".bezugInputMainDiv").show();
                $(".tempInputMainDiv").show();
                $(".bezugStartDiv").hide();
                $(".bezugEndDiv").hide();
                $(".tempStartDiv").hide();
                $(".tempEndDiv").hide();
                //$(".subtypeTxtDynamicCF div").css("width", "22%");
                //$(".subtypeTxtDynamicCF label").css("width", "35%");
                $('#tblOptionenEPrdDKff').parents('div.dataTables_wrapper').first().show();
                $('#tblGetDyanamicheKorrekturfaktoren').parents('div.dataTables_wrapper').first().show();

                //$('#tblGetDyanamicheKorrekturfaktoren').parents('div.dataTables_wrapper').first().hide();
                var columnHide = tblGetDyanamicheKorrekturfaktoren.columns([5,6,3,4,8,9,10,11,12]);
                columnHide.visible(! columnHide.visible() );
                var columnShow = tblGetDyanamicheKorrekturfaktoren.columns([0,1,2,7,13,14]);
                columnShow.visible( columnShow.visible() );
                var columnHideMore = tblOptionenEPrdDKff.columns([5,6,3,4,8,9,10,11,12]);
                columnHideMore.visible(! columnHideMore.visible() );

                var columnShowMore = tblOptionenEPrdDKff.columns([0,1,2,7,13]);
                columnShowMore.visible( columnShowMore.visible() );

                $("#subtypeTxtoptzTempDkff").removeClass();
                $("#subtypeTxtoptzTempDkff").addClass('temperatureNumValidate');
                $("#subtypeTxtoptzBezugDkff").removeClass();
                $("#subtypeTxtoptzBezugDkff").addClass('yearBezugValidate');
                $(".formatDynamicBezugRow1").hide();
                $(".subtypeTxtDynamicCFRow2").hide();
                $(".formatDynamicBezugRow2").hide();
                $("#basicFaktorRow1").removeClass("tempMonthCaseWidth");
                $("#basicFaktorRow2").removeClass("tempMonthCaseWidth");
            }else if(auswahlTypierungVal =='2' && typeDynamicCFVal=='Temperatur' && subtypeTimeDynamicCFVal=='tempNum'){
                console.log('Basis Faktor + 2. Bedingung Temperatur');
                $('.calculationTypeDiv').hide();
                $(".subtypeTxtDynamicCF ").show();
                $(".subtypeTxtBasisFaktor2").show();
                $(".subtypeTxtBasisFaktor3").hide();
                $(".bezugInputMainDiv").hide();
                $(".tempInputMainDiv").show();
                $(".bezugStartDiv").hide();
                $(".bezugEndDiv").hide();
                $(".tempStartDiv").hide();
                $(".tempEndDiv").hide();
                //$(".subtypeTxtDynamicCF div").css("width", "32%");
                //$(".subtypeTxtDynamicCF label").css("width", "44%");
                $('#tblOptionenEPrdDKff').parents('div.dataTables_wrapper').first().show();
                var columnHide = tblGetDyanamicheKorrekturfaktoren.columns([5,6,3,4,1,12]);
                columnHide.visible(! columnHide.visible() );
                var columnShow = tblGetDyanamicheKorrekturfaktoren.columns([0,2,7,8,9,10,11,13,14]);
                columnShow.visible( columnShow.visible() );
                var columnHideMore = tblOptionenEPrdDKff.columns([5,6,3,4,1,12]);
                columnHideMore.visible(! columnHideMore.visible() );

                var columnShowMore = tblOptionenEPrdDKff.columns([0,2,7,8,9,10,11,13]);
                columnShowMore.visible( columnShowMore.visible() );

                $("#subtypeTxtoptzTempDkff").removeClass();
                $("#subtypeTxtoptzTempDkff").addClass('temperatureNumValidate');
                $(".formatDynamicBezugRow1").hide();
                $(".subtypeTxtDynamicCFRow2").hide();
                $(".formatDynamicBezugRow2").hide();
                $("#basicFaktorRow1").removeClass("tempMonthCaseWidth");
                $("#basicFaktorRow2").removeClass("tempMonthCaseWidth");
            }else if(auswahlTypierungVal =='2' && typeDynamicCFVal=='Temperatur' && subtypeTimeDynamicCFVal=='tempOnlyMonth'){
                console.log('Basis Faktor + 2. Bedingung month');
                $('.calculationTypeDiv').hide();
                $(".subtypeTxtDynamicCF ").show();
                $(".subtypeTxtBasisFaktor2").show();
                $(".subtypeTxtBasisFaktor3").hide();
                $(".bezugInputMainDiv").show();
                $(".tempInputMainDiv").hide();
                $(".bezugStartDiv").hide();
                $(".bezugEndDiv").hide();
                $(".tempStartDiv").hide();
                $(".tempEndDiv").hide();
                //$(".subtypeTxtDynamicCF div").css("width", "32%");
                //$(".subtypeTxtDynamicCF label").css("width", "44%");
                $('#tblOptionenEPrdDKff').parents('div.dataTables_wrapper').first().show();
                var columnHide = tblGetDyanamicheKorrekturfaktoren.columns([5,6,3,4,2,12]);
                columnHide.visible(! columnHide.visible() );
                var columnShow = tblGetDyanamicheKorrekturfaktoren.columns([0,1,7,8,9,10,11,13,14]);
                columnShow.visible( columnShow.visible() );
                var columnHideMore = tblOptionenEPrdDKff.columns([5,6,3,4,2,12]);
                columnHideMore.visible(! columnHideMore.visible() );

                var columnShowMore = tblOptionenEPrdDKff.columns([0,1,7,8,9,10,11,13]);
                columnShowMore.visible( columnShowMore.visible() );

                $("#subtypeTxtoptzBezugDkff").removeClass();
                $("#subtypeTxtoptzBezugDkff").addClass('monthBezugValidate');
                $(".formatDynamicBezugRow1").hide();
                $(".subtypeTxtDynamicCFRow2").hide();
                $(".formatDynamicBezugRow2").hide();
                $("#basicFaktorRow1").removeClass("tempMonthCaseWidth");
                $("#basicFaktorRow2").removeClass("tempMonthCaseWidth");
            }else if(auswahlTypierungVal =='2' && typeDynamicCFVal=='Temperatur' && subtypeTimeDynamicCFVal=='tempPlusMonth'){
                console.log('Basis Faktor + 2. Bedingung TempPlusMonth');
                $('.calculationTypeDiv').hide();
                $(".subtypeTxtDynamicCF ").show();
                $(".subtypeTxtBasisFaktor2").show();
                $(".subtypeTxtBasisFaktor3").hide();
                $(".bezugInputMainDiv").show();
                $(".bezugStartDiv").hide();
                $(".bezugEndDiv").hide();
                $(".tempStartDiv").hide();
                $(".tempEndDiv").hide();
                //$(".tempInputMainDiv").show();
                //$(".subtypeTxtDynamicCF div").css("width", "22%");
                //$(".subtypeTxtDynamicCF label").css("width", "35%");
                $('#tblOptionenEPrdDKff').parents('div.dataTables_wrapper').first().show();

                var columnHide = tblGetDyanamicheKorrekturfaktoren.columns([5,6,3,4,12]);
                columnHide.visible(! columnHide.visible() );
                var columnShow = tblGetDyanamicheKorrekturfaktoren.columns([0,1,2,7,8,9,10,11,13,14]);
                columnShow.visible( columnShow.visible() );
                var columnHideMore = tblOptionenEPrdDKff.columns([5,6,3,4,12]);
                columnHideMore.visible(! columnHideMore.visible() );
                var columnShowMore = tblOptionenEPrdDKff.columns([0,1,2,7,8,9,10,11,13]);
                columnShowMore.visible( columnShowMore.visible() );
                $("#subtypeTxtoptzTempDkff").removeClass();
                $("#subtypeTxtoptzTempDkff").addClass('temperatureNumValidate');
                $("#subtypeTxtoptzBezugDkff").removeClass();
                $("#subtypeTxtoptzBezugDkff").addClass('monthBezugValidate');
                $(".formatDynamicBezugRow1").hide();
                $(".subtypeTxtDynamicCFRow2").hide();
                $(".formatDynamicBezugRow2").hide();
                $("#basicFaktorRow1").removeClass("tempMonthCaseWidth");
                $("#basicFaktorRow2").removeClass("tempMonthCaseWidth");
            }else if(auswahlTypierungVal =='2' && typeDynamicCFVal=='Temperatur' && subtypeTimeDynamicCFVal=='tempPlusYear'){
                console.log('Basis Faktor + 2. Bedingung TempPlusYear');
                $('.calculationTypeDiv').hide();
                $(".subtypeTxtDynamicCF ").show();
                $(".subtypeTxtBasisFaktor2").show();
                $(".subtypeTxtBasisFaktor3").hide();
                $(".bezugInputMainDiv").show();
                $(".tempInputMainDiv").show();
                $(".bezugStartDiv").hide();
                $(".bezugEndDiv").hide();
                $(".tempStartDiv").hide();
                $(".tempEndDiv").hide();
                //$(".subtypeTxtDynamicCF div").css("width", "22%");
                //$(".subtypeTxtDynamicCF label").css("width", "35%");
                $('#tblOptionenEPrdDKff').parents('div.dataTables_wrapper').first().show();

                var columnHide = tblGetDyanamicheKorrekturfaktoren.columns([5,6,3,4,12]);
                columnHide.visible(! columnHide.visible() );
                var columnShow = tblGetDyanamicheKorrekturfaktoren.columns([0,1,2,7,8,9,10,11,13,14]);
                columnShow.visible( columnShow.visible() );
                var columnShowMore = tblOptionenEPrdDKff.columns([0,1,2,7,8,9,10,11,13]);
                columnShowMore.visible( columnShowMore.visible() );
                var columnHideMore = tblOptionenEPrdDKff.columns([5,6,3,4,12]);
                columnHideMore.visible(! columnHideMore.visible() );
                $("#subtypeTxtoptzTempDkff").removeClass();
                $("#subtypeTxtoptzTempDkff").addClass('temperatureNumValidate');
                $("#subtypeTxtoptzBezugDkff").removeClass();
                $("#subtypeTxtoptzBezugDkff").addClass('yearBezugValidate');
                $(".formatDynamicBezugRow1").hide();
                $(".subtypeTxtDynamicCFRow2").hide();
                $(".formatDynamicBezugRow2").hide();
                $("#basicFaktorRow1").removeClass("tempMonthCaseWidth");
                $("#basicFaktorRow2").removeClass("tempMonthCaseWidth");
            }else if(auswahlTypierungVal =='3' && typeDynamicCFVal=='Temperatur' && subtypeTimeDynamicCFVal=='tempNum'){
                console.log('Basis Faktor + 3. Bedingung Temperatur');
                $('.calculationTypeDiv').hide();
                $(".subtypeTxtDynamicCF ").show();
                $(".subtypeTxtBasisFaktor2").show();
                $(".subtypeTxtBasisFaktor3").show();
                $(".bezugInputMainDiv").hide();
                $(".tempInputMainDiv").show();
                $(".bezugStartDiv").hide();
                $(".bezugEndDiv").hide();
                $(".tempStartDiv").hide();
                $(".tempEndDiv").hide();
                //$(".subtypeTxtDynamicCF div").css("width", "32%");
                //$(".subtypeTxtDynamicCF label").css("width", "44%");
                $('#tblOptionenEPrdDKff').parents('div.dataTables_wrapper').first().show();
                var columnHide = tblGetDyanamicheKorrekturfaktoren.columns([5,6,3,4,1,12]);
                columnHide.visible(! columnHide.visible() );
                var columnShow = tblGetDyanamicheKorrekturfaktoren.columns([0,2,7,8,9,10,11,13,14]);
                columnShow.visible( columnShow.visible() );
                var columnHideMore = tblOptionenEPrdDKff.columns([5,6,3,4,1,12]);
                columnHideMore.visible(! columnHideMore.visible() );

                var columnShowMore = tblOptionenEPrdDKff.columns([0,2,7,8,9,10,11,13]);
                columnShowMore.visible( columnShowMore.visible() );

                $(".formatDynamicBezugRow1").hide();
                $(".subtypeTxtDynamicCFRow2").hide();
                $(".formatDynamicBezugRow2").hide();
                $("#basicFaktorRow1").removeClass("tempMonthCaseWidth");
                $("#basicFaktorRow2").removeClass("tempMonthCaseWidth");
            }else if(auswahlTypierungVal =='3' && typeDynamicCFVal=='Temperatur' && subtypeTimeDynamicCFVal=='tempOnlyMonth'){
                console.log('Basis Faktor + 3. Bedingung month');
                $('.calculationTypeDiv').hide();
                $(".subtypeTxtDynamicCF ").show();
                $(".subtypeTxtBasisFaktor2").show();
                $(".subtypeTxtBasisFaktor3").show();
                $(".bezugInputMainDiv").show();
                $(".tempInputMainDiv").hide();
                $(".bezugStartDiv").hide();
                $(".bezugEndDiv").hide();
                $(".tempStartDiv").hide();
                $(".tempEndDiv").hide();
                //$(".subtypeTxtDynamicCF div").css("width", "32%");
                //$(".subtypeTxtDynamicCF label").css("width", "44%");
                $('#tblOptionenEPrdDKff').parents('div.dataTables_wrapper').first().show();
                var columnHide = tblGetDyanamicheKorrekturfaktoren.columns([5,6,3,4,6,12]);
                columnHide.visible(! columnHide.visible() );
                var columnShow = tblGetDyanamicheKorrekturfaktoren.columns([0,1,7,8,9,10,11,13,14]);
                columnShow.visible( columnShow.visible() );
                var columnHideMore = tblOptionenEPrdDKff.columns([5,6,3,4,6,12]);
                columnHideMore.visible(! columnHideMore.visible() );

                var columnShowMore = tblOptionenEPrdDKff.columns([0,1,7,8,9,10,11,13]);
                columnShowMore.visible( columnShowMore.visible() );

                $("#subtypeTxtoptzBezugDkff").removeClass();
                $("#subtypeTxtoptzBezugDkff").addClass('monthBezugValidate');
                $(".formatDynamicBezugRow1").hide();
                $(".subtypeTxtDynamicCFRow2").hide();
                $(".formatDynamicBezugRow2").hide();
                $("#basicFaktorRow1").removeClass("tempMonthCaseWidth");
                $("#basicFaktorRow2").removeClass("tempMonthCaseWidth");
            }else if(auswahlTypierungVal =='3' && typeDynamicCFVal=='Temperatur' && subtypeTimeDynamicCFVal=='tempPlusMonth'){
                console.log('Basis Faktor + 3. Bedingung TempPlusMonth');
                $('.calculationTypeDiv').hide();
                $(".subtypeTxtDynamicCF ").show();
                $(".subtypeTxtBasisFaktor2").show();
                $(".subtypeTxtBasisFaktor3").show();
                $(".bezugInputMainDiv").show();
                $(".tempInputMainDiv").show();
                $(".bezugStartDiv").hide();
                $(".bezugEndDiv").hide();
                $(".tempStartDiv").hide();
                $(".tempEndDiv").hide();
                //$(".subtypeTxtDynamicCF div").css("width", "22%");
                //$(".subtypeTxtDynamicCF label").css("width", "35%");

                $('#tblOptionenEPrdDKff').parents('div.dataTables_wrapper').first().show();

                var columnHide = tblGetDyanamicheKorrekturfaktoren.columns([5,6,3,4,12]);
                columnHide.visible(! columnHide.visible() );
                var columnShow = tblGetDyanamicheKorrekturfaktoren.columns([0,1,2,7,8,9,10,11,13,14]);
                columnShow.visible( columnShow.visible() );

                var columnShowMore = tblOptionenEPrdDKff.columns([0,1,2,7,8,9,10,11,13]);
                columnShowMore.visible( columnShowMore.visible() );

                var columnHideMore = tblOptionenEPrdDKff.columns([5,6,3,4,12]);
                columnHideMore.visible(! columnHideMore.visible() );
                $("#subtypeTxtoptzTempDkff").removeClass();
                $("#subtypeTxtoptzTempDkff").addClass('temperatureNumValidate');
                $("#subtypeTxtoptzBezugDkff").removeClass();
                $("#subtypeTxtoptzBezugDkff").addClass('monthBezugValidate');
                $(".formatDynamicBezugRow1").hide();
                $(".subtypeTxtDynamicCFRow2").hide();
                $(".formatDynamicBezugRow2").hide();
                $("#basicFaktorRow1").removeClass("tempMonthCaseWidth");
                $("#basicFaktorRow2").removeClass("tempMonthCaseWidth");

            }else if(auswahlTypierungVal =='3' && typeDynamicCFVal=='Temperatur' && subtypeTimeDynamicCFVal=='tempPlusYear'){
                console.log('Basis Faktor + 3. Bedingung TempPlusYear');
                $('.calculationTypeDiv').hide();
                $(".subtypeTxtDynamicCF ").show();
                $(".subtypeTxtBasisFaktor2").show();
                $(".subtypeTxtBasisFaktor3").show();
                $(".bezugInputMainDiv").show();
                $(".tempInputMainDiv").show();
                $(".bezugStartDiv").hide();
                $(".bezugEndDiv").hide();
                $(".tempStartDiv").hide();
                $(".tempEndDiv").hide();
                //$(".subtypeTxtDynamicCF div").css("width", "22%");
                //$(".subtypeTxtDynamicCF label").css("width", "35%");
                $('#tblOptionenEPrdDKff').parents('div.dataTables_wrapper').first().show();

                var columnHide = tblGetDyanamicheKorrekturfaktoren.columns([5,6,3,4,12]);
                columnHide.visible(! columnHide.visible() );
                var columnShow = tblGetDyanamicheKorrekturfaktoren.columns([0,1,2,7,8,9,10,11,13,14]);
                columnShow.visible( columnShow.visible() );

                var columnShowMore = tblOptionenEPrdDKff.columns([0,1,2,7,8,9,10,11,13]);
                columnShowMore.visible( columnShowMore.visible() );

                var columnHideMore = tblOptionenEPrdDKff.columns([5,6,3,4,12]);
                columnHideMore.visible(! columnHideMore.visible() );
                $("#subtypeTxtoptzTempDkff").removeClass();
                $("#subtypeTxtoptzTempDkff").addClass('temperatureNumValidate');
                $("#subtypeTxtoptzBezugDkff").removeClass();
                $("#subtypeTxtoptzBezugDkff").addClass('yearBezugValidate');
                $(".formatDynamicBezugRow1").hide();
                $(".subtypeTxtDynamicCFRow2").hide();
                $(".formatDynamicBezugRow2").hide();
                $("#basicFaktorRow1").removeClass("tempMonthCaseWidth");
                $("#basicFaktorRow2").removeClass("tempMonthCaseWidth");
            }else if(auswahlTypierungVal =='4' && typeDynamicCFVal=='Zeit'){
                $('.calculationTypeDiv').hide();
                $(".subtypeTxtDynamicCF").show();
                $(".formatDynamicBezugRow1").show();

                $(".subtypeTxtDynamicCFRow2").show();
                $(".formatDynamicBezugRow2").show();

                $(".subtypeTxtBasisFaktor2").hide();
                $(".subtypeTxtBasisFaktor3").hide();
                $(".formatDynamicSelOptRow1").val($(".subtypeTimeDynamicCF").val());
                $(".formatDynamicSelOptRow2").val($(".subtypeTimeDynamicCF").val());

                $(".bezugInputMainDiv").show();
                $(".tempInputMainDiv").hide();
                $(".bezugStartDiv").hide();
                $(".bezugEndDiv").hide();
                $(".tempStartDiv").hide();
                $(".tempEndDiv").hide();
                $(".bezugInputMainDiv2").show();
                $(".tempInputMainDiv2").hide();
                $(".bezugStartDiv2").hide();
                $(".bezugEndDiv2").hide();
                $(".tempStartDiv2").hide();
                $(".tempEndDiv2").hide();
                $('#tblOptionenEPrdDKff').parents('div.dataTables_wrapper').first().show();
                var columnHide = tblGetDyanamicheKorrekturfaktoren.columns([5,6,3,4,2,8,9,10,11]);
                columnHide.visible(! columnHide.visible() );
                var columnShow = tblGetDyanamicheKorrekturfaktoren.columns([0,1,7,12,13,14]);
                columnShow.visible( columnShow.visible() );
                var columnHideMore = tblOptionenEPrdDKff.columns([5,6,3,4,2,8,9,10,11]);
                columnHideMore.visible(! columnHideMore.visible() );
                var columnShowMore = tblOptionenEPrdDKff.columns([0,1,7,12,13]);
                columnShowMore.visible( columnShowMore.visible() );
                $("#basicFaktorRow1").removeClass("tempMonthCaseWidth");
                $("#basicFaktorRow2").removeClass("tempMonthCaseWidth");
            }else if(auswahlTypierungVal =='4' && typeDynamicCFVal=='Temperatur' && subtypeTimeDynamicCFVal=='tempNum'){
                console.log('Basis Faktor + 4. Bedingung Temperatur');
                $('.calculationTypeDiv').hide();
                $(".subtypeTxtDynamicCF").show();
                $(".formatDynamicBezugRow1").show();

                $(".subtypeTxtDynamicCFRow2").show();
                $(".formatDynamicBezugRow2").show();

                $(".subtypeTxtBasisFaktor2").hide();
                $(".subtypeTxtBasisFaktor3").hide();
                $(".formatDynamicSelOptRow1").val($(".subtypeTimeDynamicCF").val());
                $(".formatDynamicSelOptRow2").val($(".subtypeTimeDynamicCF").val());
                $(".bezugInputMainDiv").hide();
                $(".tempInputMainDiv").show();
                $(".bezugStartDiv").hide();
                $(".bezugEndDiv").hide();
                $(".tempStartDiv").hide();
                $(".tempEndDiv").hide();
                $(".bezugInputMainDiv2").hide();
                $(".tempInputMainDiv2").show();
                $(".bezugStartDiv2").hide();
                $(".bezugEndDiv2").hide();
                $(".tempStartDiv2").hide();
                $(".tempEndDiv2").hide();
                $('#tblOptionenEPrdDKff').parents('div.dataTables_wrapper').first().show();


                var columnHide = tblGetDyanamicheKorrekturfaktoren.columns([5,6,3,4,8,9,10,11]);
                columnHide.visible(! columnHide.visible() );
                var columnShow = tblGetDyanamicheKorrekturfaktoren.columns([0,1,2,7,12,13,14]);
                columnShow.visible( columnShow.visible() );
                var columnHideMore = tblOptionenEPrdDKff.columns([5,6,3,4,8,9,10,11]);
                columnHideMore.visible(! columnHideMore.visible() );
                var columnShowMore = tblOptionenEPrdDKff.columns([0,1,2,7,12,13]);
                columnShowMore.visible( columnShowMore.visible() );
                $("#basicFaktorRow1").removeClass("tempMonthCaseWidth");
                $("#basicFaktorRow2").removeClass("tempMonthCaseWidth");
            }else if(auswahlTypierungVal =='4' && typeDynamicCFVal=='Temperatur' && subtypeTimeDynamicCFVal=='tempOnlyMonth'){
                console.log('Basis Faktor + 4. Bedingung month');
                $('.calculationTypeDiv').hide();
                $(".subtypeTxtDynamicCF").show();
                $(".formatDynamicBezugRow1").show();

                $(".subtypeTxtDynamicCFRow2").show();
                $(".formatDynamicBezugRow2").show();

                $(".subtypeTxtBasisFaktor2").hide();
                $(".subtypeTxtBasisFaktor3").hide();
                $(".formatDynamicSelOptRow1").val($(".subtypeTimeDynamicCF").val());
                $(".formatDynamicSelOptRow2").val($(".subtypeTimeDynamicCF").val());
                $(".bezugInputMainDiv").show();
                $(".tempInputMainDiv").hide();
                $(".bezugStartDiv").hide();
                $(".bezugEndDiv").hide();
                $(".tempStartDiv").hide();
                $(".tempEndDiv").hide();
                $(".bezugInputMainDiv2").show();
                $(".tempInputMainDiv2").hide();
                $(".bezugStartDiv2").hide();
                $(".bezugEndDiv2").hide();
                $(".tempStartDiv2").hide();
                $(".tempEndDiv2").hide();
                $('#tblOptionenEPrdDKff').parents('div.dataTables_wrapper').first().show();

                var columnHide = tblGetDyanamicheKorrekturfaktoren.columns([5,6,3,4,8,9,10,11]);
                columnHide.visible(! columnHide.visible() );
                var columnShow = tblGetDyanamicheKorrekturfaktoren.columns([0,1,2,7,12,13,14]);
                columnShow.visible( columnShow.visible() );
                var columnHideMore = tblOptionenEPrdDKff.columns([5,6,3,4,8,9,10,11]);
                columnHideMore.visible(! columnHideMore.visible() );
                var columnShowMore = tblOptionenEPrdDKff.columns([0,1,2,7,12,13]);
                columnShowMore.visible( columnShowMore.visible() );
                $("#basicFaktorRow1").removeClass("tempMonthCaseWidth");
                $("#basicFaktorRow2").removeClass("tempMonthCaseWidth");
            }else if(auswahlTypierungVal =='4' && typeDynamicCFVal=='Temperatur' && subtypeTimeDynamicCFVal=='tempPlusMonth'){
                console.log('Basis Faktor + 4. Bedingung TempPlusMonth');
                $('.calculationTypeDiv').hide();
                $(".subtypeTxtDynamicCF").show();
                $(".formatDynamicBezugRow1").show();

                $(".subtypeTxtDynamicCFRow2").show();
                $(".formatDynamicBezugRow2").show();

                $(".subtypeTxtBasisFaktor2").hide();
                $(".subtypeTxtBasisFaktor3").hide();
                $(".formatDynamicSelOptRow1").val($(".subtypeTimeDynamicCF").val());
                $(".formatDynamicSelOptRow2").val($(".subtypeTimeDynamicCF").val());
                $(".bezugInputMainDiv").show();
                $(".tempInputMainDiv").show();
                $(".bezugStartDiv").hide();
                $(".bezugEndDiv").hide();
                $(".tempStartDiv").hide();
                $(".tempEndDiv").hide();
                $(".bezugInputMainDiv2").show();
                $(".tempInputMainDiv2").show();
                $(".bezugStartDiv2").hide();
                $(".bezugEndDiv2").hide();
                $(".tempStartDiv2").hide();
                $(".tempEndDiv2").hide();
                $('#tblOptionenEPrdDKff').parents('div.dataTables_wrapper').first().show();

                 var columnHide = tblGetDyanamicheKorrekturfaktoren.columns([5,6,3,4,8,9,10,11]);
                columnHide.visible(! columnHide.visible() );
                var columnShow = tblGetDyanamicheKorrekturfaktoren.columns([0,1,2,7,12,13,14]);
                columnShow.visible( columnShow.visible() );
                var columnHideMore = tblOptionenEPrdDKff.columns([5,6,3,4,8,9,10,11]);
                columnHideMore.visible(! columnHideMore.visible() );
                var columnShowMore = tblOptionenEPrdDKff.columns([0,1,2,7,12,13]);
                columnShowMore.visible( columnShowMore.visible() );
                $("#basicFaktorRow1").removeClass("tempMonthCaseWidth");
                $("#basicFaktorRow2").removeClass("tempMonthCaseWidth");
            }else if(auswahlTypierungVal =='4' && typeDynamicCFVal=='Temperatur' && subtypeTimeDynamicCFVal=='tempPlusYear'){
                console.log('Basis Faktor + 4. Bedingung TempPlusYear');
                $('.calculationTypeDiv').hide();
                $(".subtypeTxtDynamicCF").show();
                $(".formatDynamicBezugRow1").show();

                $(".subtypeTxtDynamicCFRow2").show();
                $(".formatDynamicBezugRow2").show();

                $(".subtypeTxtBasisFaktor2").hide();
                $(".subtypeTxtBasisFaktor3").hide();
                $(".formatDynamicSelOptRow1").val($(".subtypeTimeDynamicCF").val());
                $(".formatDynamicSelOptRow2").val($(".subtypeTimeDynamicCF").val());
                $(".bezugInputMainDiv").show();
                $(".tempInputMainDiv").show();
                $(".bezugStartDiv").hide();
                $(".bezugEndDiv").hide();
                $(".tempStartDiv").hide();
                $(".tempEndDiv").hide();
                $(".bezugInputMainDiv2").show();
                $(".tempInputMainDiv2").show();
                $(".bezugStartDiv2").hide();
                $(".bezugEndDiv2").hide();
                $(".tempStartDiv2").hide();
                $(".tempEndDiv2").hide();

                $('#tblOptionenEPrdDKff').parents('div.dataTables_wrapper').first().show();

                var columnHide = tblGetDyanamicheKorrekturfaktoren.columns([5,6,3,4,8,9,10,11]);
                columnHide.visible(! columnHide.visible() );
                var columnShow = tblGetDyanamicheKorrekturfaktoren.columns([0,1,2,7,12,13,14]);
                columnShow.visible( columnShow.visible() );
                var columnHideMore = tblOptionenEPrdDKff.columns([5,6,3,4,8,9,10,11]);
                columnHideMore.visible(! columnHideMore.visible() );
                var columnShowMore = tblOptionenEPrdDKff.columns([0,1,2,7,12,13]);
                columnShowMore.visible( columnShowMore.visible() );
                $("#basicFaktorRow1").removeClass("tempMonthCaseWidth");
                $("#basicFaktorRow2").removeClass("tempMonthCaseWidth");
            }else if(auswahlTypierungVal =='5' && typeDynamicCFVal=='Zeit'){
                $('.calculationTypeDiv').show();
                $('#basicFaktorRow1').show();
                $('#basicFaktorRow3').show();
                $('#basicFaktorRow2').hide();
                $('#basicFaktorRow4').hide();

                $(".formatDynamicBezugRow1").show();
                $(".formatDynamicBezugRow2").show();
                $(".formatDynamicSelOptRow1").val($(".subtypeTimeDynamicCF").val());
                $(".formatDynamicSelOptRow2").val($(".subtypeTimeDynamicCF").val());
                $(".bezugStartDiv").hide();
                $(".bezugEndDiv").hide();
                $(".tempStartDiv").hide();
                $(".tempEndDiv").hide();
                $(".bezugStartDiv2").hide();
                $(".bezugEndDiv2").hide();
                $(".tempStartDiv2").hide();
                $(".tempEndDiv2").hide();
                //$(".formatDynamicSelOptRow1").val("");
                //$(".formatDynamicSelOptRow2").val("");

                $(".bezugInputMainDiv").show();
                $(".tempInputMainDiv").hide();
                $(".bezugInputMainDiv2").show();
                $(".tempInputMainDiv2").hide();

                $('#tblOptionenEPrdDKff').parents('div.dataTables_wrapper').first().show();
                $('#tblGetDyanamicheKorrekturfaktoren').parents('div.dataTables_wrapper').first().show();
                var columnHide = tblGetDyanamicheKorrekturfaktoren.columns([5,6,3,4]);

                columnHide.visible( !columnHide.visible() );
                var columnShow = tblGetDyanamicheKorrekturfaktoren.columns([0,1,2,7,8,9,10,11,12,13,14]);
                columnShow.visible( columnShow.visible() );

                var columnHideMore = tblOptionenEPrdDKff.columns([5,6,3,4]);
                columnHideMore.visible(! columnHideMore.visible() );
                var columnShowMore = tblOptionenEPrdDKff.columns([0,1,2,7,8,9,10,11,12,13]);
                columnShowMore.visible( columnShowMore.visible() );
                $("#basicFaktorRow1").removeClass("tempMonthCaseWidth");
                $("#basicFaktorRow2").removeClass("tempMonthCaseWidth");
            }else if(auswahlTypierungVal =='5' && typeDynamicCFVal=='Temperatur' && subtypeTimeDynamicCFVal=='tempNum'){
                console.log('Basis Faktor + 5. Bedingung Temperatur');
                $('.calculationTypeDiv').show();
                $('#basicFaktorRow1').show();
                $('#basicFaktorRow3').show();
                $('#basicFaktorRow2').hide();
                $('#basicFaktorRow4').hide();

                $(".formatDynamicBezugRow1").show();
                $(".formatDynamicBezugRow2").show();
                $(".formatDynamicSelOptRow1").val($(".subtypeTimeDynamicCF").val());
                $(".formatDynamicSelOptRow2").val($(".subtypeTimeDynamicCF").val());
                //$(".formatDynamicSelOptRow1").val("");
                //$(".formatDynamicSelOptRow2").val("");

                $(".bezugInputMainDiv").hide();
                $(".tempInputMainDiv").show();
                $(".bezugInputMainDiv2").hide();
                $(".tempInputMainDiv2").show();
                $(".bezugStartDiv").hide();
                $(".bezugEndDiv").hide();
                $(".tempStartDiv").hide();
                $(".tempEndDiv").hide();
                $(".bezugStartDiv2").hide();
                $(".bezugEndDiv2").hide();
                $(".tempStartDiv2").hide();
                $(".tempEndDiv2").hide();
                $('#tblOptionenEPrdDKff').parents('div.dataTables_wrapper').first().show();
                $('#tblGetDyanamicheKorrekturfaktoren').parents('div.dataTables_wrapper').first().show();

                var columnHide = tblGetDyanamicheKorrekturfaktoren.columns([5,6,3,4]);
                columnHide.visible(! columnHide.visible() );
                var columnShow = tblGetDyanamicheKorrekturfaktoren.columns([0,1,2,7,8,9,10,11,12,13,14]);
                columnShow.visible( columnShow.visible() );
                var columnHideMore = tblOptionenEPrdDKff.columns([5,6,3,4]);
                columnHideMore.visible(! columnHideMore.visible() );

                var columnShowMore = tblOptionenEPrdDKff.columns([0,1,2,7,8,9,10,11,12,13]);
                columnShowMore.visible( columnShowMore.visible() );

                $("#basicFaktorRow1").removeClass("tempMonthCaseWidth");
                $("#basicFaktorRow2").removeClass("tempMonthCaseWidth");
            }else if(auswahlTypierungVal =='5' && typeDynamicCFVal=='Temperatur' && subtypeTimeDynamicCFVal=='tempOnlyMonth'){
                console.log('Basis Faktor + 5. Bedingung month');
                $('.calculationTypeDiv').show();
                $('#basicFaktorRow1').show();
                $('#basicFaktorRow3').show();
                $('#basicFaktorRow2').hide();
                $('#basicFaktorRow4').hide();
                $(".formatDynamicSelOptRow1").val($(".subtypeTimeDynamicCF").val());
                $(".formatDynamicSelOptRow2").val($(".subtypeTimeDynamicCF").val());
                $(".formatDynamicBezugRow1").show();
                $(".formatDynamicBezugRow2").show();
                $(".bezugStartDiv").hide();
                $(".bezugEndDiv").hide();
                $(".tempStartDiv").hide();
                $(".tempEndDiv").hide();
                $(".bezugStartDiv2").hide();
                $(".bezugEndDiv2").hide();
                $(".tempStartDiv2").hide();
                $(".tempEndDiv2").hide();

                //$(".formatDynamicSelOptRow1").val("");
                //$(".formatDynamicSelOptRow2").val("");

                $(".bezugInputMainDiv").show();
                $(".tempInputMainDiv").hide();
                $(".bezugInputMainDiv2").show();
                $(".tempInputMainDiv2").hide();
                $('#tblOptionenEPrdDKff').parents('div.dataTables_wrapper').first().show();
                $('#tblGetDyanamicheKorrekturfaktoren').parents('div.dataTables_wrapper').first().show();
                var columnHide = tblGetDyanamicheKorrekturfaktoren.columns([5,6,3,4]);
                columnHide.visible(! columnHide.visible() );
                var columnShow = tblGetDyanamicheKorrekturfaktoren.columns([0,1,2,7,8,9,10,11,12,13,14]);
                columnShow.visible( columnShow.visible() );
                var columnHideMore = tblOptionenEPrdDKff.columns([5,6,3,4]);
                columnHideMore.visible(! columnHideMore.visible() );

                var columnShowMore = tblOptionenEPrdDKff.columns([0,1,2,7,8,9,10,11,12,13]);
                columnShowMore.visible( columnShowMore.visible() );

                $("#basicFaktorRow1").removeClass("tempMonthCaseWidth");
                $("#basicFaktorRow2").removeClass("tempMonthCaseWidth");
            }else if(auswahlTypierungVal =='5' && typeDynamicCFVal=='Temperatur' && subtypeTimeDynamicCFVal=='tempPlusMonth'){
                console.log('Basis Faktor + 5. Bedingung TempPlusMonth');
                $('.calculationTypeDiv').show();
                $('#basicFaktorRow1').show();
                $('#basicFaktorRow3').show();
                $('#basicFaktorRow2').hide();
                $('#basicFaktorRow4').hide();
                $(".formatDynamicSelOptRow1").val($(".subtypeTimeDynamicCF").val());
                $(".formatDynamicSelOptRow2").val($(".subtypeTimeDynamicCF").val());
                $(".formatDynamicBezugRow1").show();
                $(".formatDynamicBezugRow2").show();

                //$(".formatDynamicSelOptRow1").val("");
                //$(".formatDynamicSelOptRow2").val("");

                $(".bezugInputMainDiv").show();
                $(".tempInputMainDiv").show();
                $(".bezugInputMainDiv2").show();
                $(".tempInputMainDiv2").show();
                $(".bezugStartDiv").hide();
                $(".bezugEndDiv").hide();
                $(".tempStartDiv").hide();
                $(".tempEndDiv").hide();
                $(".bezugStartDiv2").hide();
                $(".bezugEndDiv2").hide();
                $(".tempStartDiv2").hide();
                $(".tempEndDiv2").hide();

                $('#tblOptionenEPrdDKff').parents('div.dataTables_wrapper').first().show();
                $('#tblGetDyanamicheKorrekturfaktoren').parents('div.dataTables_wrapper').first().show();

                //var columnHide = tblGetDyanamicheKorrekturfaktoren.columns([8]);
                //columnHide.visible(! columnHide.visible() );
                /*var columnShow = tblGetDyanamicheKorrekturfaktoren.columns([0,1,2,7,8,9,10,11,12,13,14]);
                columnShow.visible( columnShow.visible() );
                var columnShowMore = tblOptionenEPrdDKff.columns([0,1,2,7,8,9,10,11,12]);
                columnShowMore.visible( columnShowMore.visible() );*/
                //var columnHideMore = tblOptionenEPrdDKff.columns([8]);
                //columnHideMore.visible(! columnHideMore.visible() );
                var columnHide = tblGetDyanamicheKorrekturfaktoren.columns([5,6,3,4]);
                columnHide.visible(! columnHide.visible() );
                var columnShow = tblGetDyanamicheKorrekturfaktoren.columns([0,1,2,7,8,9,10,11,12,13,14]);
                columnShow.visible( columnShow.visible() );
                var columnHideMore = tblOptionenEPrdDKff.columns([5,6,3,4]);
                columnHideMore.visible(! columnHideMore.visible() );

                var columnShowMore = tblOptionenEPrdDKff.columns([0,1,2,7,8,9,10,11,12,13]);
                columnShowMore.visible( columnShowMore.visible() );

                $("#basicFaktorRow1").removeClass("tempMonthCaseWidth");
                $("#basicFaktorRow2").removeClass("tempMonthCaseWidth");
            }else if(auswahlTypierungVal =='5' && typeDynamicCFVal=='Temperatur' && subtypeTimeDynamicCFVal=='tempPlusYear'){
                console.log('Basis Faktor + 5. Bedingung TempPlusYear');
                $('.calculationTypeDiv').show();
                $('#basicFaktorRow1').show();
                $('#basicFaktorRow3').show();
                $('#basicFaktorRow2').hide();
                $('#basicFaktorRow4').hide();

                $(".formatDynamicBezugRow1").show();
                $(".formatDynamicBezugRow2").show();
                $(".formatDynamicSelOptRow1").val($(".subtypeTimeDynamicCF").val());
                $(".formatDynamicSelOptRow2").val($(".subtypeTimeDynamicCF").val());
                //$(".formatDynamicSelOptRow1").val("");
                //$(".formatDynamicSelOptRow2").val("");

                $(".bezugInputMainDiv").show();
                $(".tempInputMainDiv").show();
                $(".bezugInputMainDiv2").show();
                $(".tempInputMainDiv2").show();
                $(".bezugStartDiv").hide();
                $(".bezugEndDiv").hide();
                $(".tempStartDiv").hide();
                $(".tempEndDiv").hide();
                $(".bezugStartDiv2").hide();
                $(".bezugEndDiv2").hide();
                $(".tempStartDiv2").hide();
                $(".tempEndDiv2").hide();
                $('#tblOptionenEPrdDKff').parents('div.dataTables_wrapper').first().show();
                $('#tblGetDyanamicheKorrekturfaktoren').parents('div.dataTables_wrapper').first().show();

                //var columnHide = tblGetDyanamicheKorrekturfaktoren.columns([8]);
                //columnHide.visible(! columnHide.visible() );
                /*var columnShow = tblGetDyanamicheKorrekturfaktoren.columns([0,1,2,7,8,9,10,11,12,13,14]);
                columnShow.visible( columnShow.visible() );
                var columnShowMore = tblOptionenEPrdDKff.columns([0,1,2,7,8,9,10,11,12]);
                columnShowMore.visible( columnShowMore.visible() );*/
                //var columnHideMore = tblOptionenEPrdDKff.columns([8]);
                //columnHideMore.visible(! columnHideMore.visible() );
                var columnHide = tblGetDyanamicheKorrekturfaktoren.columns([5,6,3,4]);
                columnHide.visible(! columnHide.visible() );
                var columnShow = tblGetDyanamicheKorrekturfaktoren.columns([0,1,2,7,8,9,10,11,12,13,14]);
                columnShow.visible( columnShow.visible() );
                var columnHideMore = tblOptionenEPrdDKff.columns([5,6,3,4]);
                columnHideMore.visible(! columnHideMore.visible() );

                var columnShowMore = tblOptionenEPrdDKff.columns([0,1,2,7,8,9,10,11,12,13]);
                columnShowMore.visible( columnShowMore.visible() );

                $("#basicFaktorRow1").removeClass("tempMonthCaseWidth");
                $("#basicFaktorRow2").removeClass("tempMonthCaseWidth");
            }else if(auswahlTypierungVal =='6' && typeDynamicCFVal=='Zeit'){
                $('.calculationTypeDiv').hide();
                $(".subtypeTxtDynamicCF ").show();
                $(".subtypeTxtBasisFaktor2").hide();
                $(".subtypeTxtBasisFaktor3").hide();
                $(".bezugInputMainDiv").hide();
                $(".tempInputMainDiv").hide();
                $(".formatDynamicBezugRow1").hide();

                $(".bezugStartDiv").show();
                $(".bezugEndDiv").show();
                $(".tempStartDiv").hide();
                $(".tempEndDiv").hide();
                $('#tblOptionenEPrdDKff').parents('div.dataTables_wrapper').first().show();
                $('#tblGetDyanamicheKorrekturfaktoren').parents('div.dataTables_wrapper').first().show();
                var columnHide = tblGetDyanamicheKorrekturfaktoren.columns([5,6,1,2,8,9,10,11,12]);
                columnHide.visible(! columnHide.visible() );

                var columnShow = tblGetDyanamicheKorrekturfaktoren.columns([0,3,4,7,13,14]);
                columnShow.visible( columnShow.visible() );
                var columnHideMore = tblOptionenEPrdDKff.columns([5,6,1,2,8,9,10,11,12]);
                columnHideMore.visible(! columnHideMore.visible() );
                var columnShowMore = tblOptionenEPrdDKff.columns([0,3,4,7,13]);
                columnShowMore.visible( columnShowMore.visible() );

                $(".formatDynamicBezugRow1").hide();
                $(".subtypeTxtDynamicCFRow2").hide();
                $(".formatDynamicBezugRow2").hide();
                $("#basicFaktorRow1").removeClass("tempMonthCaseWidth");
                $("#basicFaktorRow2").removeClass("tempMonthCaseWidth");
            }else if(auswahlTypierungVal =='6' && typeDynamicCFVal=='Temperatur' && subtypeTimeDynamicCFVal=='tempNum'){
                console.log('Temperatur');
                $('.calculationTypeDiv').hide();
                $(".subtypeTxtDynamicCF ").show();
                $(".subtypeTxtBasisFaktor2").hide();
                $(".subtypeTxtBasisFaktor3").hide();
                $(".bezugInputMainDiv").hide();
                $(".tempInputMainDiv").hide();
                $(".bezugStartDiv").hide();
                $(".bezugEndDiv").hide();
                $(".tempStartDiv").show();
                $(".tempEndDiv").show();
                $('#tblOptionenEPrdDKff').parents('div.dataTables_wrapper').first().show();
                $('#tblGetDyanamicheKorrekturfaktoren').parents('div.dataTables_wrapper').first().show();

                var columnHide = tblGetDyanamicheKorrekturfaktoren.columns([3,4,1,2,8,9,10,11,12]);
                columnHide.visible(! columnHide.visible() );

                var columnShow = tblGetDyanamicheKorrekturfaktoren.columns([0,5,6,7,13,14]);
                columnShow.visible( columnShow.visible() );

                var columnHideMore = tblOptionenEPrdDKff.columns([3,4,1,2,8,9,10,11,12]);
                columnHideMore.visible(! columnHideMore.visible() );
                var columnShowMore = tblOptionenEPrdDKff.columns([0,5,6,7,13]);
                columnShowMore.visible( columnShowMore.visible() );
                $("#subtypeTxtoptzTempDkff").removeClass();
                $("#subtypeTxtoptzTempDkff").addClass('temperatureNumValidate');
                $(".formatDynamicBezugRow1").hide();
                $(".subtypeTxtDynamicCFRow2").hide();
                $(".formatDynamicBezugRow2").hide();
                $("#basicFaktorRow1").removeClass("tempMonthCaseWidth");
                $("#basicFaktorRow2").removeClass("tempMonthCaseWidth");
            }else if(auswahlTypierungVal =='6' && typeDynamicCFVal=='Temperatur' && subtypeTimeDynamicCFVal=='tempOnlyMonth'){
                console.log('month');
                $('.calculationTypeDiv').hide();
                $(".subtypeTxtDynamicCF ").show();
                $(".subtypeTxtBasisFaktor2").hide();
                $(".subtypeTxtBasisFaktor3").hide();
                $(".bezugInputMainDiv").hide();
                $(".tempInputMainDiv").hide();
                $(".bezugStartDiv").show();
                $(".bezugEndDiv").show();
                $(".tempStartDiv").hide();
                $(".tempEndDiv").hide();

                $('#tblOptionenEPrdDKff').parents('div.dataTables_wrapper').first().show();
                $('#tblGetDyanamicheKorrekturfaktoren').parents('div.dataTables_wrapper').first().show();


                var columnHide = tblGetDyanamicheKorrekturfaktoren.columns([5,6,1,2,8,9,10,11,12]);
                columnHide.visible(! columnHide.visible() );

                var columnShow = tblGetDyanamicheKorrekturfaktoren.columns([0,3,4,7,13,14]);
                columnShow.visible( columnShow.visible() );

                var columnHideMore = tblOptionenEPrdDKff.columns([5,6,1,2,8,9,10,11,12]);
                columnHideMore.visible(! columnHideMore.visible() );
                var columnShowMore = tblOptionenEPrdDKff.columns([0,3,4,7,13]);
                columnShowMore.visible( columnShowMore.visible() );
                $("#subtypeTxtoptzTempDkff").removeClass();
                $("#subtypeTxtoptzTempDkff").addClass('temperatureNumValidate');
                $("#subtypeTxtoptzBezugDkff").removeClass();
                $("#subtypeTxtoptzBezugDkff").addClass('monthBezugValidate');
                $(".formatDynamicBezugRow1").hide();
                $(".subtypeTxtDynamicCFRow2").hide();
                $(".formatDynamicBezugRow2").hide();
                $("#basicFaktorRow1").removeClass("tempMonthCaseWidth");
                $("#basicFaktorRow2").removeClass("tempMonthCaseWidth");
            }else if(auswahlTypierungVal =='6' && typeDynamicCFVal=='Temperatur' && subtypeTimeDynamicCFVal=='tempPlusMonth'){
                console.log('TempPlusMonth');
                $('.calculationTypeDiv').hide();
                $(".subtypeTxtDynamicCF ").show();
                $(".subtypeTxtBasisFaktor2").hide();
                $(".subtypeTxtBasisFaktor3").hide();
                $(".bezugInputMainDiv").show();
                $(".tempInputMainDiv").hide();
                $(".bezugStartDiv").hide();
                $(".bezugEndDiv").hide();
                $(".tempStartDiv").show();
                $(".tempEndDiv").show();

                $('#tblOptionenEPrdDKff').parents('div.dataTables_wrapper').first().show();
                $('#tblGetDyanamicheKorrekturfaktoren').parents('div.dataTables_wrapper').first().show();

                var columnHide = tblGetDyanamicheKorrekturfaktoren.columns([3,4,2,8,9,10,11,12]);
                columnHide.visible(! columnHide.visible() );

                var columnShow = tblGetDyanamicheKorrekturfaktoren.columns([0,1,5,6,7,13,14]);
                columnShow.visible( columnShow.visible() );

                var columnHideMore = tblOptionenEPrdDKff.columns([3,4,2,8,9,10,11,12]);
                columnHideMore.visible(! columnHideMore.visible() );
                var columnShowMore = tblOptionenEPrdDKff.columns([0,1,5,6,7,13]);
                columnShowMore.visible( columnShowMore.visible() );

                $("#subtypeTxtoptzTempDkff").removeClass();
                $("#subtypeTxtoptzTempDkff").addClass('temperatureNumValidate');
                $("#subtypeTxtoptzBezugDkff").removeClass();
                $("#subtypeTxtoptzBezugDkff").addClass('monthBezugValidate');
                $(".formatDynamicBezugRow1").hide();
                $(".subtypeTxtDynamicCFRow2").hide();
                $(".formatDynamicBezugRow2").hide();
                $("#basicFaktorRow1").removeClass("tempMonthCaseWidth");
                $("#basicFaktorRow2").removeClass("tempMonthCaseWidth");
            }else if(auswahlTypierungVal =='6' && typeDynamicCFVal=='Temperatur' && subtypeTimeDynamicCFVal=='tempPlusYear'){
                console.log('TempPlusYear');
                $('.calculationTypeDiv').hide();
                $(".subtypeTxtDynamicCF ").show();
                $(".subtypeTxtBasisFaktor2").hide();
                $(".subtypeTxtBasisFaktor3").hide();
                $(".bezugInputMainDiv").show();
                $(".tempInputMainDiv").hide();
                $(".bezugStartDiv").hide();
                $(".bezugEndDiv").hide();
                $(".tempStartDiv").show();
                $(".tempEndDiv").show();

                $('#tblOptionenEPrdDKff').parents('div.dataTables_wrapper').first().show();
                $('#tblGetDyanamicheKorrekturfaktoren').parents('div.dataTables_wrapper').first().show();

                var columnHide = tblGetDyanamicheKorrekturfaktoren.columns([3,4,2,8,9,10,11,12]);
                columnHide.visible(! columnHide.visible() );
                var columnShow = tblGetDyanamicheKorrekturfaktoren.columns([0,1,5,6,7,13,14]);
                columnShow.visible( columnShow.visible() );
                var columnHideMore = tblOptionenEPrdDKff.columns([3,4,2,8,9,10,11,12]);
                columnHideMore.visible(! columnHideMore.visible() );
                var columnShowMore = tblOptionenEPrdDKff.columns([0,1,5,6,7,13]);
                columnShowMore.visible( columnShowMore.visible() );

                $("#subtypeTxtoptzTempDkff").removeClass();
                $("#subtypeTxtoptzTempDkff").addClass('temperatureNumValidate');
                $("#subtypeTxtoptzBezugDkff").removeClass();
                $("#subtypeTxtoptzBezugDkff").addClass('yearBezugValidate');
                $(".formatDynamicBezugRow1").hide();
                $(".subtypeTxtDynamicCFRow2").hide();
                $(".formatDynamicBezugRow2").hide();
                $("#basicFaktorRow1").removeClass("tempMonthCaseWidth");
                $("#basicFaktorRow2").removeClass("tempMonthCaseWidth");
            }else if(auswahlTypierungVal =='7' && typeDynamicCFVal=='Zeit'){

                $('.calculationTypeDiv').hide();
                $(".subtypeTxtDynamicCF ").show();
                $(".subtypeTxtBasisFaktor2").show();
                $(".subtypeTxtBasisFaktor3").hide();
                $(".bezugInputMainDiv").hide();
                $(".tempInputMainDiv").hide();
                $(".formatDynamicBezugRow1").hide();

                $(".bezugStartDiv").show();
                $(".bezugEndDiv").show();
                $(".tempStartDiv").hide();
                $(".tempEndDiv").hide();
                $('#tblOptionenEPrdDKff').parents('div.dataTables_wrapper').first().show();
                $('#tblGetDyanamicheKorrekturfaktoren').parents('div.dataTables_wrapper').first().show();
                var columnHide = tblGetDyanamicheKorrekturfaktoren.columns([5,6,1,2,12]);
                columnHide.visible(! columnHide.visible() );

                var columnShow = tblGetDyanamicheKorrekturfaktoren.columns([0,3,4,7,8,9,10,11,13,14]);
                columnShow.visible( columnShow.visible() );
                var columnHideMore = tblOptionenEPrdDKff.columns([5,6,1,2,12]);
                columnHideMore.visible(! columnHideMore.visible() );
                var columnShowMore = tblOptionenEPrdDKff.columns([0,3,4,7,8,9,10,11,13]);
                columnShowMore.visible( columnShowMore.visible() );

                $(".formatDynamicBezugRow1").hide();
                $(".subtypeTxtDynamicCFRow2").hide();
                $(".formatDynamicBezugRow2").hide();
                $("#basicFaktorRow1").removeClass("tempMonthCaseWidth");
                $("#basicFaktorRow2").removeClass("tempMonthCaseWidth");
            }else if(auswahlTypierungVal =='7' && typeDynamicCFVal=='Temperatur' && subtypeTimeDynamicCFVal=='tempNum'){
                console.log('Temperatur');
                $('.calculationTypeDiv').hide();
                $(".subtypeTxtDynamicCF ").show();
                $(".subtypeTxtBasisFaktor2").show();
                $(".subtypeTxtBasisFaktor3").hide();
                $(".bezugInputMainDiv").hide();
                $(".tempInputMainDiv").hide();
                $(".bezugStartDiv").hide();
                $(".bezugEndDiv").hide();
                $(".tempStartDiv").show();
                $(".tempEndDiv").show();
                $('#tblOptionenEPrdDKff').parents('div.dataTables_wrapper').first().show();
                $('#tblGetDyanamicheKorrekturfaktoren').parents('div.dataTables_wrapper').first().show();

                var columnHide = tblGetDyanamicheKorrekturfaktoren.columns([3,4,1,2,12]);
                columnHide.visible(! columnHide.visible() );

                var columnShow = tblGetDyanamicheKorrekturfaktoren.columns([0,5,6,7,8,9,10,11,13,14]);
                columnShow.visible( columnShow.visible() );

                var columnHideMore = tblOptionenEPrdDKff.columns([3,4,1,2,12]);
                columnHideMore.visible(! columnHideMore.visible() );
                var columnShowMore = tblOptionenEPrdDKff.columns([0,5,6,7,8,9,10,11,13]);
                columnShowMore.visible( columnShowMore.visible() );
                $("#subtypeTxtoptzTempDkff").removeClass();
                $("#subtypeTxtoptzTempDkff").addClass('temperatureNumValidate');
                $(".formatDynamicBezugRow1").hide();
                $(".subtypeTxtDynamicCFRow2").hide();
                $(".formatDynamicBezugRow2").hide();
                $("#basicFaktorRow1").removeClass("tempMonthCaseWidth");
                $("#basicFaktorRow2").removeClass("tempMonthCaseWidth");
            }else if(auswahlTypierungVal =='7' && typeDynamicCFVal=='Temperatur' && subtypeTimeDynamicCFVal=='tempOnlyMonth'){
                console.log('month');
                $('.calculationTypeDiv').hide();
                $(".subtypeTxtDynamicCF ").show();
                $(".subtypeTxtBasisFaktor2").show();
                $(".subtypeTxtBasisFaktor3").hide();
                $(".bezugInputMainDiv").hide();
                $(".tempInputMainDiv").hide();
                $(".bezugStartDiv").show();
                $(".bezugEndDiv").show();
                $(".tempStartDiv").hide();
                $(".tempEndDiv").hide();

                $('#tblOptionenEPrdDKff').parents('div.dataTables_wrapper').first().show();
                $('#tblGetDyanamicheKorrekturfaktoren').parents('div.dataTables_wrapper').first().show();

                var columnHide = tblGetDyanamicheKorrekturfaktoren.columns([5,6,1,2,12]);
                columnHide.visible(! columnHide.visible() );

                var columnShow = tblGetDyanamicheKorrekturfaktoren.columns([0,3,4,7,8,9,10,11,13,14]);
                columnShow.visible( columnShow.visible() );

                var columnHideMore = tblOptionenEPrdDKff.columns([5,6,1,2,12]);
                columnHideMore.visible(! columnHideMore.visible() );
                var columnShowMore = tblOptionenEPrdDKff.columns([0,3,4,7,8,9,10,11,13]);
                columnShowMore.visible( columnShowMore.visible() );
                $("#subtypeTxtoptzTempDkff").removeClass();
                $("#subtypeTxtoptzTempDkff").addClass('temperatureNumValidate');
                $("#subtypeTxtoptzBezugDkff").removeClass();
                $("#subtypeTxtoptzBezugDkff").addClass('monthBezugValidate');
                $(".formatDynamicBezugRow1").hide();
                $(".subtypeTxtDynamicCFRow2").hide();
                $(".formatDynamicBezugRow2").hide();
                $("#basicFaktorRow1").removeClass("tempMonthCaseWidth");
                $("#basicFaktorRow2").removeClass("tempMonthCaseWidth");
            }else if(auswahlTypierungVal =='7' && typeDynamicCFVal=='Temperatur' && subtypeTimeDynamicCFVal=='tempPlusMonth'){
                console.log('TempPlusMonth');
                $('.calculationTypeDiv').hide();
                $(".subtypeTxtDynamicCF ").show();
                $(".subtypeTxtBasisFaktor2").show();
                $(".subtypeTxtBasisFaktor3").hide();
                $(".bezugInputMainDiv").show();
                $(".tempInputMainDiv").hide();
                $(".bezugStartDiv").hide();
                $(".bezugEndDiv").hide();
                $(".tempStartDiv").show();
                $(".tempEndDiv").show();

                $('#tblOptionenEPrdDKff').parents('div.dataTables_wrapper').first().show();
                $('#tblGetDyanamicheKorrekturfaktoren').parents('div.dataTables_wrapper').first().show();

                var columnHide = tblGetDyanamicheKorrekturfaktoren.columns([3,4,2,12]);
                columnHide.visible(! columnHide.visible() );

                var columnShow = tblGetDyanamicheKorrekturfaktoren.columns([0,1,5,6,7,8,9,10,11,13,14]);
                columnShow.visible( columnShow.visible() );

                var columnHideMore = tblOptionenEPrdDKff.columns([3,4,2,12]);
                columnHideMore.visible(! columnHideMore.visible() );
                var columnShowMore = tblOptionenEPrdDKff.columns([0,1,5,6,7,8,9,10,11,13]);
                columnShowMore.visible( columnShowMore.visible() );

                $("#subtypeTxtoptzTempDkff").removeClass();
                $("#subtypeTxtoptzTempDkff").addClass('temperatureNumValidate');
                $("#subtypeTxtoptzBezugDkff").removeClass();
                $("#subtypeTxtoptzBezugDkff").addClass('monthBezugValidate');
                $(".formatDynamicBezugRow1").hide();
                $(".subtypeTxtDynamicCFRow2").hide();
                $(".formatDynamicBezugRow2").hide();
                $("#basicFaktorRow1").removeClass("tempMonthCaseWidth");
                $("#basicFaktorRow2").removeClass("tempMonthCaseWidth");
            }else if(auswahlTypierungVal =='7' && typeDynamicCFVal=='Temperatur' && subtypeTimeDynamicCFVal=='tempPlusYear'){
                console.log('TempPlusYear');
                $('.calculationTypeDiv').hide();
                $(".subtypeTxtDynamicCF ").show();
                $(".subtypeTxtBasisFaktor2").show();
                $(".subtypeTxtBasisFaktor3").hide();
                $(".bezugInputMainDiv").show();
                $(".tempInputMainDiv").hide();
                $(".bezugStartDiv").hide();
                $(".bezugEndDiv").hide();
                $(".tempStartDiv").show();
                $(".tempEndDiv").show();
                $('#tblOptionenEPrdDKff').parents('div.dataTables_wrapper').first().show();
                $('#tblGetDyanamicheKorrekturfaktoren').parents('div.dataTables_wrapper').first().show();

                var columnHide = tblGetDyanamicheKorrekturfaktoren.columns([3,4,2,12]);
                columnHide.visible(! columnHide.visible() );

                var columnShow = tblGetDyanamicheKorrekturfaktoren.columns([0,1,5,6,7,8,9,10,11,13,14]);
                columnShow.visible( columnShow.visible() );
                var columnHideMore = tblOptionenEPrdDKff.columns([3,4,2,12]);
                columnHideMore.visible(! columnHideMore.visible() );
                var columnShowMore = tblOptionenEPrdDKff.columns([0,1,5,6,7,8,9,10,11,13]);
                columnShowMore.visible( columnShowMore.visible() );

                $("#subtypeTxtoptzTempDkff").removeClass();
                $("#subtypeTxtoptzTempDkff").addClass('temperatureNumValidate');
                $("#subtypeTxtoptzBezugDkff").removeClass();
                $("#subtypeTxtoptzBezugDkff").addClass('yearBezugValidate');
                $(".formatDynamicBezugRow1").hide();
                $(".subtypeTxtDynamicCFRow2").hide();
                $(".formatDynamicBezugRow2").hide();
                $("#basicFaktorRow1").removeClass("tempMonthCaseWidth");
                $("#basicFaktorRow2").removeClass("tempMonthCaseWidth");
            }else if(auswahlTypierungVal =='8' && typeDynamicCFVal=='Zeit'){
                $('.calculationTypeDiv').hide();
                $(".subtypeTxtDynamicCF ").show();
                $(".subtypeTxtBasisFaktor2").hide();
                $(".subtypeTxtBasisFaktor3").hide();
                $(".bezugInputMainDiv").hide();
                $(".tempInputMainDiv").hide();
                $(".bezugInputMainDiv2").hide();
                $(".tempInputMainDiv2").hide();
                $(".formatDynamicBezugRow1").show();
                $(".tempInputMainDiv2").hide();

                $(".bezugStartDiv").show();
                $(".bezugEndDiv").show();
                $(".tempStartDiv").hide();
                $(".tempEndDiv").hide();
                $(".bezugStartDiv2").show();
                $(".bezugEndDiv2").show();
                $(".tempStartDiv2").hide();
                $(".tempEndDiv2").hide();
                $(".bezugInputMainDiv2").hide();

                $(".formatDynamicSelOptRow1").val($(".subtypeTimeDynamicCF").val());
                $(".formatDynamicSelOptRow2").val($(".subtypeTimeDynamicCF").val());
                $(".formatDynamicBezugRow1").show();
                $(".subtypeTxtDynamicCFRow2").show();
                $(".formatDynamicBezugRow2").show();
                $("#basicFaktorRow1").removeClass("tempMonthCaseWidth");
                $("#basicFaktorRow2").removeClass("tempMonthCaseWidth");

                $('#tblOptionenEPrdDKff').parents('div.dataTables_wrapper').first().show();
                $('#tblGetDyanamicheKorrekturfaktoren').parents('div.dataTables_wrapper').first().show();
                var columnHide = tblGetDyanamicheKorrekturfaktoren.columns([2,8,9,10,11]);
                columnHide.visible(! columnHide.visible() );

                var columnShow = tblGetDyanamicheKorrekturfaktoren.columns([0,1,3,4,5,6,7,12,13,14]);
                columnShow.visible( columnShow.visible() );
                var columnHideMore = tblOptionenEPrdDKff.columns([2,8,9,10,11]);
                columnHideMore.visible(! columnHideMore.visible() );
                var columnShowMore = tblOptionenEPrdDKff.columns([0,1,3,4,5,6,7,12,13]);
                columnShowMore.visible( columnShowMore.visible() );


            }else if(auswahlTypierungVal =='8' && typeDynamicCFVal=='Temperatur' && subtypeTimeDynamicCFVal=='tempNum'){
                console.log('Temperatur');
                $('.calculationTypeDiv').hide();
                $(".subtypeTxtDynamicCF ").show();
                $(".subtypeTxtBasisFaktor2").hide();
                $(".subtypeTxtBasisFaktor3").hide();
                $(".bezugInputMainDiv").hide();
                $(".tempInputMainDiv").hide();
                $(".bezugInputMainDiv2").hide();
                $(".tempInputMainDiv2").hide();
                $(".bezugStartDiv").hide();
                $(".bezugEndDiv").hide();
                $(".tempStartDiv").show();
                $(".tempEndDiv").show();
                $(".bezugStartDiv2").hide();
                $(".bezugEndDiv2").hide();
                $(".tempStartDiv2").show();
                $(".tempEndDiv2").show();

                $("#subtypeTxtoptzTempDkff").removeClass();
                $("#subtypeTxtoptzTempDkff").addClass('temperatureNumValidate');
                $(".formatDynamicSelOptRow1").val($(".subtypeTimeDynamicCF").val());
                $(".formatDynamicSelOptRow2").val($(".subtypeTimeDynamicCF").val());
                $(".formatDynamicBezugRow1").show();
                $(".subtypeTxtDynamicCFRow2").show();
                $(".formatDynamicBezugRow2").show();
                $("#basicFaktorRow1").removeClass("tempMonthCaseWidth");
                $("#basicFaktorRow2").removeClass("tempMonthCaseWidth");

                $('#tblOptionenEPrdDKff').parents('div.dataTables_wrapper').first().show();
                $('#tblGetDyanamicheKorrekturfaktoren').parents('div.dataTables_wrapper').first().show();

                var columnHide = tblGetDyanamicheKorrekturfaktoren.columns([2,8,9,10,11]);
                columnHide.visible(! columnHide.visible() );

                var columnShow = tblGetDyanamicheKorrekturfaktoren.columns([0,1,3,4,5,6,7,12,13,14]);
                columnShow.visible( columnShow.visible() );
                var columnHideMore = tblOptionenEPrdDKff.columns([2,8,9,10,11]);
                columnHideMore.visible(! columnHideMore.visible() );
                var columnShowMore = tblOptionenEPrdDKff.columns([0,1,3,4,5,6,7,12,13]);
                columnShowMore.visible( columnShowMore.visible() );


            }else if(auswahlTypierungVal =='8' && typeDynamicCFVal=='Temperatur' && subtypeTimeDynamicCFVal=='tempOnlyMonth'){
                console.log('month');
                $('.calculationTypeDiv').hide();
                $(".subtypeTxtDynamicCF ").show();
                $(".subtypeTxtBasisFaktor2").hide();
                $(".subtypeTxtBasisFaktor3").hide();
                $(".bezugInputMainDiv").hide();
                $(".tempInputMainDiv").hide();
                $(".bezugInputMainDiv2").hide();
                $(".tempInputMainDiv2").hide();
                $(".bezugStartDiv").show();
                $(".bezugEndDiv").show();
                $(".tempStartDiv").hide();
                $(".tempEndDiv").hide();
                $(".bezugStartDiv2").show();
                $(".bezugEndDiv2").show();
                $(".tempStartDiv2").hide();
                $(".tempEndDiv2").hide();

                $("#subtypeTxtoptzTempDkff").removeClass();
                $("#subtypeTxtoptzTempDkff").addClass('temperatureNumValidate');
                $("#subtypeTxtoptzBezugDkff").removeClass();
                $("#subtypeTxtoptzBezugDkff").addClass('monthBezugValidate');
                $(".formatDynamicSelOptRow1").val($(".subtypeTimeDynamicCF").val());
                $(".formatDynamicSelOptRow2").val($(".subtypeTimeDynamicCF").val());
                $(".formatDynamicBezugRow1").show();
                $(".subtypeTxtDynamicCFRow2").show();
                $(".formatDynamicBezugRow2").show();
                $("#basicFaktorRow1").removeClass("tempMonthCaseWidth");
                $("#basicFaktorRow2").removeClass("tempMonthCaseWidth");
                $('#tblOptionenEPrdDKff').parents('div.dataTables_wrapper').first().show();
                $('#tblGetDyanamicheKorrekturfaktoren').parents('div.dataTables_wrapper').first().show();


                var columnHide = tblGetDyanamicheKorrekturfaktoren.columns([2,8,9,10,11]);
                columnHide.visible(! columnHide.visible() );

                var columnShow = tblGetDyanamicheKorrekturfaktoren.columns([0,1,3,4,5,6,7,12,13,14]);
                columnShow.visible( columnShow.visible() );
                var columnHideMore = tblOptionenEPrdDKff.columns([2,8,9,10,11]);
                columnHideMore.visible(! columnHideMore.visible() );
                var columnShowMore = tblOptionenEPrdDKff.columns([0,1,3,4,5,6,7,12,13]);
                columnShowMore.visible( columnShowMore.visible() );

            }else if(auswahlTypierungVal =='8' && typeDynamicCFVal=='Temperatur' && subtypeTimeDynamicCFVal=='tempPlusMonth'){
                console.log('TempPlusMonth');
                $('.calculationTypeDiv').hide();
                $(".subtypeTxtDynamicCF ").show();
                $(".subtypeTxtBasisFaktor2").hide();
                $(".subtypeTxtBasisFaktor3").hide();
                $(".bezugInputMainDiv").show();
                $(".tempInputMainDiv").hide();
                $(".bezugInputMainDiv2").show();
                $(".tempInputMainDiv2").hide();
                $(".bezugStartDiv").hide();
                $(".bezugEndDiv").hide();
                $(".tempStartDiv").show();
                $(".tempEndDiv").show();
                $(".bezugStartDiv2").hide();
                $(".bezugEndDiv2").hide();
                $(".tempStartDiv2").show();
                $(".tempEndDiv2").show();

                $("#subtypeTxtoptzTempDkff").removeClass();
                $("#subtypeTxtoptzTempDkff").addClass('temperatureNumValidate');
                $("#subtypeTxtoptzBezugDkff").removeClass();
                $("#subtypeTxtoptzBezugDkff").addClass('monthBezugValidate');
                $(".formatDynamicSelOptRow1").val($(".subtypeTimeDynamicCF").val());
                $(".formatDynamicSelOptRow2").val($(".subtypeTimeDynamicCF").val());
                $(".formatDynamicBezugRow1").show();
                $(".subtypeTxtDynamicCFRow2").show();
                $(".formatDynamicBezugRow2").show();
                $("#basicFaktorRow1").addClass("tempMonthCaseWidth");
                $("#basicFaktorRow2").addClass("tempMonthCaseWidth");
                $('#tblOptionenEPrdDKff').parents('div.dataTables_wrapper').first().show();
                $('#tblGetDyanamicheKorrekturfaktoren').parents('div.dataTables_wrapper').first().show();

                var columnHide = tblGetDyanamicheKorrekturfaktoren.columns([2,8,9,10,11]);
                columnHide.visible(! columnHide.visible() );

                var columnShow = tblGetDyanamicheKorrekturfaktoren.columns([0,1,3,4,5,6,7,12,13,14]);
                columnShow.visible( columnShow.visible() );
                var columnHideMore = tblOptionenEPrdDKff.columns([2,8,9,10,11]);
                columnHideMore.visible(! columnHideMore.visible() );
                var columnShowMore = tblOptionenEPrdDKff.columns([0,1,3,4,5,6,7,12,13]);
                columnShowMore.visible( columnShowMore.visible() );

            }else if(auswahlTypierungVal =='8' && typeDynamicCFVal=='Temperatur' && subtypeTimeDynamicCFVal=='tempPlusYear'){
                console.log('TempPlusYear');
                $('.calculationTypeDiv').hide();
                $(".subtypeTxtDynamicCF ").show();
                $(".subtypeTxtBasisFaktor2").hide();
                $(".subtypeTxtBasisFaktor3").hide();
                $(".bezugInputMainDiv").show();
                $(".tempInputMainDiv").hide();
                $(".bezugInputMainDiv2").show();
                $(".tempInputMainDiv2").hide();
                $(".bezugStartDiv").hide();
                $(".bezugEndDiv").hide();
                $(".tempStartDiv").show();
                $(".tempEndDiv").show();
                $(".bezugStartDiv2").hide();
                $(".bezugEndDiv2").hide();
                $(".tempStartDiv2").show();
                $(".tempEndDiv2").show();

                $("#subtypeTxtoptzTempDkff").removeClass();
                $("#subtypeTxtoptzTempDkff").addClass('temperatureNumValidate');
                $("#subtypeTxtoptzBezugDkff").removeClass();
                $("#subtypeTxtoptzBezugDkff").addClass('yearBezugValidate');
                $(".formatDynamicSelOptRow1").val($(".subtypeTimeDynamicCF").val());
                $(".formatDynamicSelOptRow2").val($(".subtypeTimeDynamicCF").val());
                $(".formatDynamicBezugRow1").show();
                $(".subtypeTxtDynamicCFRow2").show();
                $(".formatDynamicBezugRow2").show();
                $("#basicFaktorRow1").addClass("tempMonthCaseWidth");
                $("#basicFaktorRow2").addClass("tempMonthCaseWidth");
                $('#tblOptionenEPrdDKff').parents('div.dataTables_wrapper').first().show();
                $('#tblGetDyanamicheKorrekturfaktoren').parents('div.dataTables_wrapper').first().show();

                var columnHide = tblGetDyanamicheKorrekturfaktoren.columns([2,8,9,10,11]);
                columnHide.visible(! columnHide.visible() );

                var columnShow = tblGetDyanamicheKorrekturfaktoren.columns([0,1,3,4,5,6,7,12,13,14]);
                columnShow.visible( columnShow.visible() );
                var columnHideMore = tblOptionenEPrdDKff.columns([2,8,9,10,11]);
                columnHideMore.visible(! columnHideMore.visible() );
                var columnShowMore = tblOptionenEPrdDKff.columns([0,1,3,4,5,6,7,12,13]);
                columnShowMore.visible( columnShowMore.visible() );

            }else if(auswahlTypierungVal =='9' && typeDynamicCFVal=='Zeit'){
                $('.calculationTypeDiv').show();
                $('#basicFaktorRow1').show();
                $('#basicFaktorRow3').show();
                $('#basicFaktorRow2').hide();
                $('#basicFaktorRow4').hide();

                $(".bezugInputMainDiv").hide();
                $(".tempInputMainDiv").hide();
                $(".bezugInputMainDiv2").hide();
                $(".tempInputMainDiv2").hide();
                $(".formatDynamicBezugRow1").show();
                $(".tempInputMainDiv2").hide();

                $(".bezugStartDiv").show();
                $(".bezugEndDiv").show();
                $(".tempStartDiv").hide();
                $(".tempEndDiv").hide();
                $(".bezugStartDiv2").show();
                $(".bezugEndDiv2").show();
                $(".tempStartDiv2").hide();
                $(".tempEndDiv2").hide();
                $(".bezugInputMainDiv2").hide();

                $(".formatDynamicSelOptRow1").val($(".subtypeTimeDynamicCF").val());
                $(".formatDynamicSelOptRow2").val($(".subtypeTimeDynamicCF").val());
                $(".formatDynamicBezugRow1").show();
                $(".subtypeTxtDynamicCFRow2").show();
                $(".formatDynamicBezugRow2").show();
                $("#basicFaktorRow1").removeClass("tempMonthCaseWidth");
                $("#basicFaktorRow2").removeClass("tempMonthCaseWidth");

                $('#tblOptionenEPrdDKff').parents('div.dataTables_wrapper').first().show();
                $('#tblGetDyanamicheKorrekturfaktoren').parents('div.dataTables_wrapper').first().show();


                var columnHide = tblGetDyanamicheKorrekturfaktoren.columns([2]);
                columnHide.visible(! columnHide.visible() );

                var columnShow = tblGetDyanamicheKorrekturfaktoren.columns([0,1,3,4,5,6,7,8,9,10,11,12,13,14]);
                columnShow.visible( columnShow.visible() );
                var columnHideMore = tblOptionenEPrdDKff.columns([2]);
                columnHideMore.visible(! columnHideMore.visible() );
                var columnShowMore = tblOptionenEPrdDKff.columns([0,1,3,4,5,6,7,8,9,10,11,12,13]);
                columnShowMore.visible( columnShowMore.visible() );

            }else if(auswahlTypierungVal =='9' && typeDynamicCFVal=='Temperatur' && subtypeTimeDynamicCFVal=='tempNum'){
                console.log('Temperatur');
                $('.calculationTypeDiv').show();
                $('#basicFaktorRow1').show();
                $('#basicFaktorRow3').show();
                $('#basicFaktorRow2').hide();
                $('#basicFaktorRow4').hide();

                $(".bezugInputMainDiv").hide();
                $(".tempInputMainDiv").hide();
                $(".bezugInputMainDiv2").hide();
                $(".tempInputMainDiv2").hide();
                $(".bezugStartDiv").hide();
                $(".bezugEndDiv").hide();
                $(".tempStartDiv").show();
                $(".tempEndDiv").show();
                $(".bezugStartDiv2").hide();
                $(".bezugEndDiv2").hide();
                $(".tempStartDiv2").show();
                $(".tempEndDiv2").show();

                $("#subtypeTxtoptzTempDkff").removeClass();
                $("#subtypeTxtoptzTempDkff").addClass('temperatureNumValidate');
                $(".formatDynamicSelOptRow1").val($(".subtypeTimeDynamicCF").val());
                $(".formatDynamicSelOptRow2").val($(".subtypeTimeDynamicCF").val());
                $(".formatDynamicBezugRow1").show();
                $(".subtypeTxtDynamicCFRow2").show();
                $(".formatDynamicBezugRow2").show();
                $("#basicFaktorRow1").removeClass("tempMonthCaseWidth");
                $("#basicFaktorRow2").removeClass("tempMonthCaseWidth");

                $('#tblOptionenEPrdDKff').parents('div.dataTables_wrapper').first().show();
                $('#tblGetDyanamicheKorrekturfaktoren').parents('div.dataTables_wrapper').first().show();

                var columnHide = tblGetDyanamicheKorrekturfaktoren.columns([2]);
                columnHide.visible(! columnHide.visible() );

                var columnShow = tblGetDyanamicheKorrekturfaktoren.columns([0,1,3,4,5,6,7,8,9,10,11,12,13,14]);
                columnShow.visible( columnShow.visible() );
                var columnHideMore = tblOptionenEPrdDKff.columns([2]);
                columnHideMore.visible(! columnHideMore.visible() );
                var columnShowMore = tblOptionenEPrdDKff.columns([0,1,3,4,5,6,7,8,9,10,11,12,13]);
                columnShowMore.visible( columnShowMore.visible() );

            }else if(auswahlTypierungVal =='9' && typeDynamicCFVal=='Temperatur' && subtypeTimeDynamicCFVal=='tempOnlyMonth'){
                console.log('month');
                $('.calculationTypeDiv').show();
                $('#basicFaktorRow1').show();
                $('#basicFaktorRow3').show();
                $('#basicFaktorRow2').hide();
                $('#basicFaktorRow4').hide();

                $(".bezugInputMainDiv").hide();
                $(".tempInputMainDiv").hide();
                $(".bezugInputMainDiv2").hide();
                $(".tempInputMainDiv2").hide();
                $(".bezugStartDiv").show();
                $(".bezugEndDiv").show();
                $(".tempStartDiv").hide();
                $(".tempEndDiv").hide();
                $(".bezugStartDiv2").show();
                $(".bezugEndDiv2").show();
                $(".tempStartDiv2").hide();
                $(".tempEndDiv2").hide();

                $("#subtypeTxtoptzTempDkff").removeClass();
                $("#subtypeTxtoptzTempDkff").addClass('temperatureNumValidate');
                $("#subtypeTxtoptzBezugDkff").removeClass();
                $("#subtypeTxtoptzBezugDkff").addClass('monthBezugValidate');
                $(".formatDynamicSelOptRow1").val($(".subtypeTimeDynamicCF").val());
                $(".formatDynamicSelOptRow2").val($(".subtypeTimeDynamicCF").val());
                $(".formatDynamicBezugRow1").show();
                $(".subtypeTxtDynamicCFRow2").show();
                $(".formatDynamicBezugRow2").show();
                $("#basicFaktorRow1").removeClass("tempMonthCaseWidth");
                $("#basicFaktorRow2").removeClass("tempMonthCaseWidth");
                $('#tblOptionenEPrdDKff').parents('div.dataTables_wrapper').first().show();
                $('#tblGetDyanamicheKorrekturfaktoren').parents('div.dataTables_wrapper').first().show();


                var columnHide = tblGetDyanamicheKorrekturfaktoren.columns([2]);
                columnHide.visible(! columnHide.visible() );

                var columnShow = tblGetDyanamicheKorrekturfaktoren.columns([0,1,3,4,5,6,7,8,9,10,11,12,13,14]);
                columnShow.visible( columnShow.visible() );
                var columnHideMore = tblOptionenEPrdDKff.columns([2]);
                columnHideMore.visible(! columnHideMore.visible() );
                var columnShowMore = tblOptionenEPrdDKff.columns([0,1,3,4,5,6,7,8,9,10,11,12,13]);
                columnShowMore.visible( columnShowMore.visible() );

            }else if(auswahlTypierungVal =='9' && typeDynamicCFVal=='Temperatur' && subtypeTimeDynamicCFVal=='tempPlusMonth'){
                console.log('TempPlusMonth');
                $('.calculationTypeDiv').show();
                $('#basicFaktorRow1').show();
                $('#basicFaktorRow3').show();
                $('#basicFaktorRow2').hide();
                $('#basicFaktorRow4').hide();

                $(".bezugInputMainDiv").show();
                $(".tempInputMainDiv").hide();
                $(".bezugInputMainDiv2").show();
                $(".tempInputMainDiv2").hide();
                $(".bezugStartDiv").hide();
                $(".bezugEndDiv").hide();
                $(".tempStartDiv").show();
                $(".tempEndDiv").show();
                $(".bezugStartDiv2").hide();
                $(".bezugEndDiv2").hide();
                $(".tempStartDiv2").show();
                $(".tempEndDiv2").show();

                $("#subtypeTxtoptzTempDkff").removeClass();
                $("#subtypeTxtoptzTempDkff").addClass('temperatureNumValidate');
                $("#subtypeTxtoptzBezugDkff").removeClass();
                $("#subtypeTxtoptzBezugDkff").addClass('monthBezugValidate');
                $(".formatDynamicSelOptRow1").val($(".subtypeTimeDynamicCF").val());
                $(".formatDynamicSelOptRow2").val($(".subtypeTimeDynamicCF").val());
                $(".formatDynamicBezugRow1").show();
                $(".subtypeTxtDynamicCFRow2").show();
                $(".formatDynamicBezugRow2").show();
                $("#basicFaktorRow1").addClass("tempMonthCaseWidth");
                $("#basicFaktorRow2").addClass("tempMonthCaseWidth");
                $('#tblOptionenEPrdDKff').parents('div.dataTables_wrapper').first().show();
                $('#tblGetDyanamicheKorrekturfaktoren').parents('div.dataTables_wrapper').first().show();

                var columnHide = tblGetDyanamicheKorrekturfaktoren.columns([2]);
                columnHide.visible(! columnHide.visible() );

                var columnShow = tblGetDyanamicheKorrekturfaktoren.columns([0,1,3,4,5,6,7,8,9,10,11,12,13,14]);
                columnShow.visible( columnShow.visible() );
                var columnHideMore = tblOptionenEPrdDKff.columns([2]);
                columnHideMore.visible(! columnHideMore.visible() );
                var columnShowMore = tblOptionenEPrdDKff.columns([0,1,3,4,5,6,7,8,9,10,11,12,13]);
                columnShowMore.visible( columnShowMore.visible() );

            }else if(auswahlTypierungVal =='9' && typeDynamicCFVal=='Temperatur' && subtypeTimeDynamicCFVal=='tempPlusYear'){
                console.log('TempPlusYear');
                $('.calculationTypeDiv').show();
                $('#basicFaktorRow1').show();
                $('#basicFaktorRow3').show();
                $('#basicFaktorRow2').hide();
                $('#basicFaktorRow4').hide();

                $(".bezugInputMainDiv").show();
                $(".tempInputMainDiv").hide();
                $(".bezugInputMainDiv2").show();
                $(".tempInputMainDiv2").hide();
                $(".bezugStartDiv").hide();
                $(".bezugEndDiv").hide();
                $(".tempStartDiv").show();
                $(".tempEndDiv").show();
                $(".bezugStartDiv2").hide();
                $(".bezugEndDiv2").hide();
                $(".tempStartDiv2").show();
                $(".tempEndDiv2").show();

                $("#subtypeTxtoptzTempDkff").removeClass();
                $("#subtypeTxtoptzTempDkff").addClass('temperatureNumValidate');
                $("#subtypeTxtoptzBezugDkff").removeClass();
                $("#subtypeTxtoptzBezugDkff").addClass('yearBezugValidate');
                $(".formatDynamicSelOptRow1").val($(".subtypeTimeDynamicCF").val());
                $(".formatDynamicSelOptRow2").val($(".subtypeTimeDynamicCF").val());
                $(".formatDynamicBezugRow1").show();
                $(".subtypeTxtDynamicCFRow2").show();
                $(".formatDynamicBezugRow2").show();
                $("#basicFaktorRow1").addClass("tempMonthCaseWidth");
                $("#basicFaktorRow2").addClass("tempMonthCaseWidth");
                $('#tblOptionenEPrdDKff').parents('div.dataTables_wrapper').first().show();
                $('#tblGetDyanamicheKorrekturfaktoren').parents('div.dataTables_wrapper').first().show();

                var columnHide = tblGetDyanamicheKorrekturfaktoren.columns([2]);
                columnHide.visible(! columnHide.visible() );

                var columnShow = tblGetDyanamicheKorrekturfaktoren.columns([0,1,3,4,5,6,7,8,9,10,11,12,13,14]);
                columnShow.visible( columnShow.visible() );
                var columnHideMore = tblOptionenEPrdDKff.columns([2]);
                columnHideMore.visible(! columnHideMore.visible() );
                var columnShowMore = tblOptionenEPrdDKff.columns([0,1,3,4,5,6,7,8,9,10,11,12,13]);
                columnShowMore.visible( columnShowMore.visible() );

            }else if(auswahlTypierungVal ==''){
                $('.calculationTypeDiv').hide();
                $(".subtypeTxtDynamicCF").hide();
                $(".subtypeTxtBasisFaktor2").hide();
                $(".subtypeTxtBasisFaktor3").hide();
                $(".bezugInputMainDiv").show();
                $(".tempInputMainDiv").show();
                //$(".subtypeTxtDynamicCF div").css("width", "32%");
                //$(".subtypeTxtDynamicCF label").css("width", "44%");
                $('#tblOptionenEPrdDKff').parents('div.dataTables_wrapper').first().hide();
                $('#tblGetDyanamicheKorrekturfaktoren').parents('div.dataTables_wrapper').first().hide();
                $(".formatDynamicBezugRow1").hide();
                $(".subtypeTxtDynamicCFRow2").hide();
                $(".formatDynamicBezugRow2").hide();
                $(".formatDynamicSelOptRow1").val("");
                $(".formatDynamicSelOptRow2").val("");
                $("#basicFaktorRow1").hide();
                $("#basicFaktorRow2").hide();
                $("#basicFaktorRow3").hide();
                $("#basicFaktorRow4").hide();
                $("#basicFaktorRow1").removeClass("tempMonthCaseWidth");
                $("#basicFaktorRow2").removeClass("tempMonthCaseWidth");

            }
}

/*21-05-2020 Add validate class into inputs*/
function addValidateClassOnFormatDynamicSelection(selectedOption){

    if(selectedOption =='year'){
        console.log('year');
        /*$(".subtypeTxtDynamicCF").show();*/
        $("#subtypeTxtoptzBezugDkff").removeClass();
        $("#subtypeTxtoptzBezugDkff").addClass('yearBezugValidate');
        $("#subtypeTxtoptzTempDkff").removeClass();
    }else if(selectedOption =='month'){
        console.log('month');
        /*$(".subtypeTxtDynamicCF").show();*/
        $("#subtypeTxtoptzBezugDkff").removeClass();
        $("#subtypeTxtoptzBezugDkff").addClass('monthBezugValidate');
        $("#subtypeTxtoptzTempDkff").removeClass();
    }else if(selectedOption =='monthYear'){
        console.log('monthYear');
        /*$(".subtypeTxtDynamicCF").show();*/
        $("#subtypeTxtoptzBezugDkff").removeClass();
        $("#subtypeTxtoptzBezugDkff").addClass('monthYearBezugValidate');
        $("#subtypeTxtoptzTempDkff").removeClass();
    }else if(selectedOption =='day'){
        console.log('day');
        /*$(".subtypeTxtDynamicCF").show();*/
        $("#subtypeTxtoptzBezugDkff").removeClass();
        $("#subtypeTxtoptzBezugDkff").addClass('dayBezugValidate');
        $("#subtypeTxtoptzTempDkff").removeClass();
    }else if(selectedOption =='dayMonth'){
        console.log('dayMonth');
        /*$(".subtypeTxtDynamicCF").show();*/
        $("#subtypeTxtoptzBezugDkff").removeClass();
        $("#subtypeTxtoptzBezugDkff").addClass('dayMonthBezugValidate');
        $("#subtypeTxtoptzTempDkff").removeClass();
    }else if(selectedOption =='tempNum'){
        console.log('tempNum');
        /*$(".subtypeTxtDynamicCF").show();*/
        $("#subtypeTxtoptzBezugDkff").removeClass();
        $("#subtypeTxtoptzTempDkff").removeClass();
        $("#subtypeTxtoptzTempDkff").addClass('temperatureNumValidate');

    }else if(selectedOption =='tempOnlyMonth'){
        console.log('tempOnlyMonth');
        /*$(".subtypeTxtDynamicCF").show();*/
        $("#subtypeTxtoptzBezugDkff").removeClass();
        $("#subtypeTxtoptzBezugDkff").addClass('monthBezugValidate');
        $("#subtypeTxtoptzTempDkff").removeClass();
    }else if(selectedOption =='tempPlusMonth'){
        console.log('tempPlusMonth');
        /*$(".subtypeTxtDynamicCF").show();*/
        $("#subtypeTxtoptzTempDkff").removeClass();
        $("#subtypeTxtoptzTempDkff").addClass('temperatureNumValidate');
        $("#subtypeTxtoptzBezugDkff").removeClass();
        $("#subtypeTxtoptzBezugDkff").addClass('monthBezugValidate');
    }else if(selectedOption =='tempPlusYear'){
        console.log('tempPlusYear');
        /*$(".subtypeTxtDynamicCF").show();*/
        $("#subtypeTxtoptzTempDkff").removeClass();
        $("#subtypeTxtoptzTempDkff").addClass('temperatureNumValidate');
        $("#subtypeTxtoptzBezugDkff").removeClass();
        $("#subtypeTxtoptzBezugDkff").addClass('yearBezugValidate');
    }/*else if(selectedOption ==''){
        $(".subtypeTxtDynamicCF").hide();
        $("#subtypeTxtoptzBezugDkff").removeClass();
        $("#subtypeTxtoptzTempDkff").removeClass();
    }*/

}

/*02-06-2020 Faktor 4 functionality validate row 1 on change select option */
function addValidateClassOnRightSelecOptRow1VisibilityBezugTemp(fktr,type,subtype){
    if(fktr ==4 || fktr ==5 ){
        if(type=='Zeit' && subtype =='year'){
            console.log('year');
            $(".bezugInputMainDiv").show();
            $(".tempInputMainDiv").hide();
            $("#subtypeTxtoptzBezugDkff").removeClass();
            $("#subtypeTxtoptzBezugDkff").addClass('yearBezugValidate');
            $("#subtypeTxtoptzTempDkff").removeClass();
        }else if(type=='Zeit' &&  subtype =='month'){
            console.log('month');
            $(".bezugInputMainDiv").show();
            $(".tempInputMainDiv").hide();
            $("#subtypeTxtoptzBezugDkff").removeClass();
            $("#subtypeTxtoptzBezugDkff").addClass('monthBezugValidate');
            $("#subtypeTxtoptzTempDkff").removeClass();
        }else if(type=='Zeit' &&  subtype =='monthYear'){
            console.log('monthYear');
            $(".bezugInputMainDiv").show();
            $(".tempInputMainDiv").hide();
            $("#subtypeTxtoptzBezugDkff").removeClass();
            $("#subtypeTxtoptzBezugDkff").addClass('monthYearBezugValidate');
            $("#subtypeTxtoptzTempDkff").removeClass();
        }else if(type=='Zeit' &&  subtype =='day'){
            console.log('day');
            $(".bezugInputMainDiv").show();
            $(".tempInputMainDiv").hide();
            $("#subtypeTxtoptzBezugDkff").removeClass();
            $("#subtypeTxtoptzBezugDkff").addClass('dayBezugValidate');
            $("#subtypeTxtoptzTempDkff").removeClass();
        }else if(type=='Zeit' && subtype =='dayMonth'){
            console.log('dayMonth');
            $(".bezugInputMainDiv").show();
            $(".tempInputMainDiv").hide();
            $("#subtypeTxtoptzBezugDkff").removeClass();
            $("#subtypeTxtoptzBezugDkff").addClass('dayMonthBezugValidate');
            $("#subtypeTxtoptzTempDkff").removeClass();
        }else if(type=='Temperatur' && subtype=='tempNum'){
            $(".bezugInputMainDiv").hide();
            $(".tempInputMainDiv").show();
            $("#subtypeTxtoptzTempDkff").removeClass();
            $("#subtypeTxtoptzTempDkff").addClass('temperatureNumValidate');
            $("#subtypeTxtoptzBezugDkff").removeClass();
        }else if(type=='Temperatur' && subtype=='tempOnlyMonth'){
            $(".bezugInputMainDiv").show();
            $(".tempInputMainDiv").hide();
            $("#subtypeTxtoptzBezugDkff").removeClass();
            $("#subtypeTxtoptzBezugDkff").addClass('monthBezugValidate');
            $("#subtypeTxtoptzTempDkff").removeClass();
        }else if(type=='Temperatur' && subtype=='tempPlusMonth'){
            $(".bezugInputMainDiv").show();
            $(".tempInputMainDiv").show();
            $("#subtypeTxtoptzTempDkff").removeClass();
            $("#subtypeTxtoptzTempDkff").addClass('temperatureNumValidate');
            $("#subtypeTxtoptzBezugDkff").removeClass();
            $("#subtypeTxtoptzBezugDkff").addClass('monthBezugValidate');
        }else if(type=='Temperatur' && subtype=='tempPlusYear'){
            $(".bezugInputMainDiv").show();
            $(".tempInputMainDiv").show();
            $("#subtypeTxtoptzTempDkff").removeClass();
            $("#subtypeTxtoptzTempDkff").addClass('temperatureNumValidate');
            $("#subtypeTxtoptzBezugDkff").removeClass();
            $("#subtypeTxtoptzBezugDkff").addClass('yearBezugValidate');
        }
    }
    if(fktr ==8 || fktr ==9){
        if(type=='Zeit' && subtype =='year'){
                console.log('year');
                $(".bezugInputMainDiv").hide();
                $(".tempInputMainDiv").hide();

                $(".bezugStartDiv").show();
                $(".bezugEndDiv").show();
                $(".tempStartDiv").hide();
                $(".tempEndDiv").hide();

                $(".formatDynamicSelOptRow1").val($(".subtypeTimeDynamicCF").val());
                $(".formatDynamicSelOptRow2").val($(".subtypeTimeDynamicCF").val());
                $("#basicFaktorRow1").removeClass("tempMonthCaseWidth");

        }else if(type=='Zeit' &&  subtype =='month'){
                console.log('month');
                $(".bezugInputMainDiv").hide();
                $(".tempInputMainDiv").hide();

                $(".bezugStartDiv").show();
                $(".bezugEndDiv").show();
                $(".tempStartDiv").hide();
                $(".tempEndDiv").hide();

                $(".formatDynamicSelOptRow1").val($(".subtypeTimeDynamicCF").val());
                $(".formatDynamicSelOptRow2").val($(".subtypeTimeDynamicCF").val());
                $("#basicFaktorRow1").removeClass("tempMonthCaseWidth");
        }else if(type=='Zeit' &&  subtype =='monthYear'){
                console.log('monthYear');
                $(".bezugInputMainDiv").hide();
                $(".tempInputMainDiv").hide();

                $(".bezugStartDiv").show();
                $(".bezugEndDiv").show();
                $(".tempStartDiv").hide();
                $(".tempEndDiv").hide();

                $(".formatDynamicSelOptRow1").val($(".subtypeTimeDynamicCF").val());
                $(".formatDynamicSelOptRow2").val($(".subtypeTimeDynamicCF").val());
                $("#basicFaktorRow1").removeClass("tempMonthCaseWidth");
        }else if(type=='Zeit' &&  subtype =='day'){
                console.log('day');
                $(".bezugInputMainDiv").hide();
                $(".tempInputMainDiv").hide();

                $(".bezugStartDiv").show();
                $(".bezugEndDiv").show();
                $(".tempStartDiv").hide();
                $(".tempEndDiv").hide();

                $(".formatDynamicSelOptRow1").val($(".subtypeTimeDynamicCF").val());
                $(".formatDynamicSelOptRow2").val($(".subtypeTimeDynamicCF").val());
                $("#basicFaktorRow1").removeClass("tempMonthCaseWidth");
        }else if(type=='Zeit' && subtype =='dayMonth'){
                console.log('dayMonth');
                $(".bezugInputMainDiv").hide();
                $(".tempInputMainDiv").hide();

                $(".bezugStartDiv").show();
                $(".bezugEndDiv").show();
                $(".tempStartDiv").hide();
                $(".tempEndDiv").hide();

                $(".formatDynamicSelOptRow1").val($(".subtypeTimeDynamicCF").val());
                $(".formatDynamicSelOptRow2").val($(".subtypeTimeDynamicCF").val());
                $("#basicFaktorRow1").removeClass("tempMonthCaseWidth");
        }else if(type=='Temperatur' && subtype=='tempNum'){
                $(".bezugInputMainDiv").hide();
                $(".tempInputMainDiv").hide();

                $(".bezugStartDiv").hide();
                $(".bezugEndDiv").hide();
                $(".tempStartDiv").show();
                $(".tempEndDiv").show();

                $(".formatDynamicSelOptRow1").val($(".subtypeTimeDynamicCF").val());
                $(".formatDynamicSelOptRow2").val($(".subtypeTimeDynamicCF").val());
                $("#basicFaktorRow1").removeClass("tempMonthCaseWidth");

                $("#subtypeTxtoptzBezugDkff").removeClass("monthBezugValidate");
                $("#subtypeTxtoptzBezugDkff").removeClass("yearBezugValidate");
        }else if(type=='Temperatur' && subtype=='tempOnlyMonth'){
                $(".bezugInputMainDiv").hide();
                $(".tempInputMainDiv").hide();

                $(".bezugStartDiv").show();
                $(".bezugEndDiv").show();
                $(".tempStartDiv").hide();
                $(".tempEndDiv").hide();

                $(".formatDynamicSelOptRow1").val($(".subtypeTimeDynamicCF").val());
                $(".formatDynamicSelOptRow2").val($(".subtypeTimeDynamicCF").val());
                $("#basicFaktorRow1").removeClass("tempMonthCaseWidth");
                $("#subtypeTxtoptzBezugDkff").removeClass("monthBezugValidate");
                $("#subtypeTxtoptzBezugDkff").removeClass("yearBezugValidate");
        }else if(type=='Temperatur' && subtype=='tempPlusMonth'){
                $(".bezugInputMainDiv").show();
                $(".tempInputMainDiv").hide();

                $(".bezugStartDiv").hide();
                $(".bezugEndDiv").hide();
                $(".tempStartDiv").show();
                $(".tempEndDiv").show();

                $(".formatDynamicSelOptRow1").val($(".subtypeTimeDynamicCF").val());
                $(".formatDynamicSelOptRow2").val($(".subtypeTimeDynamicCF").val());
                $("#basicFaktorRow1").addClass("tempMonthCaseWidth");
        }else if(type=='Temperatur' && subtype=='tempPlusYear'){
                $(".bezugInputMainDiv").show();
                $(".tempInputMainDiv").hide();

                $(".bezugStartDiv").hide();
                $(".bezugEndDiv").hide();
                $(".tempStartDiv").show();
                $(".tempEndDiv").show();

                $(".formatDynamicSelOptRow1").val($(".subtypeTimeDynamicCF").val());
                $(".formatDynamicSelOptRow2").val($(".subtypeTimeDynamicCF").val());
                $("#basicFaktorRow1").addClass("tempMonthCaseWidth");
        }
    }
}

/*02-06-2020 Faktor 4 functionality validate row 2 on change select option */
function addValidateClassOnRightSelecOptRow2VisibilityBezugTemp(fktr,type,subtype){
    if(fktr ==4 || fktr ==5 ){
        if(type=='Zeit' && subtype =='year'){
            console.log('year');
            $(".bezugInputMainDiv2").show();
            $(".tempInputMainDiv2").hide();
            $("#subtypeTxtoptzBezugDkff2").removeClass();
            $("#subtypeTxtoptzBezugDkff2").addClass('yearBezug2Validate');
            $("#subtypeTxtoptzTempDkff2").removeClass();
        }else if( type=='Zeit' &&  subtype =='month'){
            console.log('month');
            $(".bezugInputMainDiv2").show();
            $(".tempInputMainDiv2").hide();
            $("#subtypeTxtoptzBezugDkff2").removeClass();
            $("#subtypeTxtoptzBezugDkff2").addClass('monthBezug2Validate');
            $("#subtypeTxtoptzTempDkff2").removeClass();
        }else if( type=='Zeit' &&  subtype =='monthYear'){
            console.log('monthYear');
            $(".bezugInputMainDiv2").show();
            $(".tempInputMainDiv2").hide();
            $("#subtypeTxtoptzBezugDkff2").removeClass();
            $("#subtypeTxtoptzBezugDkff2").addClass('monthYearBezug2Validate');
            $("#subtypeTxtoptzTempDkff2").removeClass();
        }else if( type=='Zeit' &&  subtype =='day'){
            console.log('day');
            $(".bezugInputMainDiv2").show();
            $(".tempInputMainDiv2").hide();
            $("#subtypeTxtoptzBezugDkff2").removeClass();
            $("#subtypeTxtoptzBezugDkff2").addClass('dayBezug2Validate');
            $("#subtypeTxtoptzTempDkff2").removeClass();
        }else if( type=='Zeit' && subtype =='dayMonth'){
            console.log('dayMonth');
            $(".bezugInputMainDiv2").show();
            $(".tempInputMainDiv2").hide();
            $("#subtypeTxtoptzBezugDkff2").removeClass();
            $("#subtypeTxtoptzBezugDkff2").addClass('dayMonthBezug2Validate');
            $("#subtypeTxtoptzTempDkff2").removeClass();
        }else if( type=='Temperatur' && subtype=='tempNum'){
            $(".bezugInputMainDiv2").hide();
            $(".tempInputMainDiv2").show();
            $("#subtypeTxtoptzTempDkff2").removeClass();
            $("#subtypeTxtoptzTempDkff2").addClass('temperatureNum2Validate');
            $("#subtypeTxtoptzBezugDkff2").removeClass();
        }else if( type=='Temperatur' && subtype=='tempOnlyMonth'){
            $(".bezugInputMainDiv2").show();
            $(".tempInputMainDiv2").hide();
            $("#subtypeTxtoptzBezugDkff2").removeClass();
            $("#subtypeTxtoptzBezugDkff2").addClass('monthBezug2Validate');
            $("#subtypeTxtoptzTempDkff2").removeClass();
        }else if( type=='Temperatur' && subtype=='tempPlusMonth'){
            $(".bezugInputMainDiv2").show();
            $(".tempInputMainDiv2").show();
            $("#subtypeTxtoptzTempDkff2").removeClass();
            $("#subtypeTxtoptzTempDkff2").addClass('temperatureNum2Validate');
            $("#subtypeTxtoptzBezugDkff2").removeClass();
            $("#subtypeTxtoptzBezugDkff2").addClass('monthBezug2Validate');
        }else if( type=='Temperatur' && subtype=='tempPlusYear'){
            $(".bezugInputMainDiv2").show();
            $(".tempInputMainDiv2").show();
            $("#subtypeTxtoptzTempDkff2").removeClass();
            $("#subtypeTxtoptzTempDkff2").addClass('temperatureNum2Validate');
            $("#subtypeTxtoptzBezugDkff2").removeClass();
            $("#subtypeTxtoptzBezugDkff2").addClass('yearBezug2Validate');
        }
    }
    if(fktr ==8 || fktr ==9){
        if(type=='Zeit' && subtype =='year'){
                console.log('year');
                $(".bezugInputMainDiv2").hide();
                $(".tempInputMainDiv2").hide();

                $(".bezugStartDiv2").show();
                $(".bezugEndDiv2").show();
                $(".tempStartDiv2").hide();
                $(".tempEndDiv2").hide();

                $(".formatDynamicSelOptRow1").val($(".subtypeTimeDynamicCF").val());
                $(".formatDynamicSelOptRow2").val($(".subtypeTimeDynamicCF").val());
                $("#basicFaktorRow2").removeClass("tempMonthCaseWidth");

        }else if(type=='Zeit' &&  subtype =='month'){
                console.log('month');
                $(".bezugInputMainDiv2").hide();
                $(".tempInputMainDiv2").hide();

                $(".bezugStartDiv2").show();
                $(".bezugEndDiv2").show();
                $(".tempStartDiv2").hide();
                $(".tempEndDiv2").hide();

                $(".formatDynamicSelOptRow1").val($(".subtypeTimeDynamicCF").val());
                $(".formatDynamicSelOptRow2").val($(".subtypeTimeDynamicCF").val());
                $("#basicFaktorRow2").removeClass("tempMonthCaseWidth");
        }else if(type=='Zeit' &&  subtype =='monthYear'){
                console.log('monthYear');
                $(".bezugInputMainDiv2").hide();
                $(".tempInputMainDiv2").hide();

                $(".bezugStartDiv2").show();
                $(".bezugEndDiv2").show();
                $(".tempStartDiv2").hide();
                $(".tempEndDiv2").hide();

                $(".formatDynamicSelOptRow1").val($(".subtypeTimeDynamicCF").val());
                $(".formatDynamicSelOptRow2").val($(".subtypeTimeDynamicCF").val());
                $("#basicFaktorRow2").removeClass("tempMonthCaseWidth");
        }else if(type=='Zeit' &&  subtype =='day'){
                console.log('day');
                $(".bezugInputMainDiv2").hide();
                $(".tempInputMainDiv2").hide();

                $(".bezugStartDiv2").show();
                $(".bezugEndDiv2").show();
                $(".tempStartDiv2").hide();
                $(".tempEndDiv2").hide();

                $(".formatDynamicSelOptRow1").val($(".subtypeTimeDynamicCF").val());
                $(".formatDynamicSelOptRow2").val($(".subtypeTimeDynamicCF").val());
                $("#basicFaktorRow2").removeClass("tempMonthCaseWidth");
        }else if(type=='Zeit' && subtype =='dayMonth'){
                console.log('dayMonth');
                $(".bezugInputMainDiv2").hide();
                $(".tempInputMainDiv2").hide();

                $(".bezugStartDiv2").show();
                $(".bezugEndDiv2").show();
                $(".tempStartDiv2").hide();
                $(".tempEndDiv2").hide();

                $(".formatDynamicSelOptRow1").val($(".subtypeTimeDynamicCF").val());
                $(".formatDynamicSelOptRow2").val($(".subtypeTimeDynamicCF").val());
                $("#basicFaktorRow2").removeClass("tempMonthCaseWidth");
        }else if(type=='Temperatur' && subtype=='tempNum'){
                $(".bezugInputMainDiv2").hide();
                $(".tempInputMainDiv2").hide();

                $(".bezugStartDiv2").hide();
                $(".bezugEndDiv2").hide();
                $(".tempStartDiv2").show();
                $(".tempEndDiv2").show();

                $(".formatDynamicSelOptRow1").val($(".subtypeTimeDynamicCF").val());
                $(".formatDynamicSelOptRow2").val($(".subtypeTimeDynamicCF").val());
                $("#basicFaktorRow2").removeClass("tempMonthCaseWidth");

                $("#subtypeTxtoptzBezugDkff2").removeClass("monthBezug2Validate");
                $("#subtypeTxtoptzBezugDkff2").removeClass("yearBezug2Validate");
        }else if(type=='Temperatur' && subtype=='tempOnlyMonth'){
                $(".bezugInputMainDiv2").hide();
                $(".tempInputMainDiv2").hide();

                $(".bezugStartDiv2").show();
                $(".bezugEndDiv2").show();
                $(".tempStartDiv2").hide();
                $(".tempEndDiv2").hide();

                $(".formatDynamicSelOptRow1").val($(".subtypeTimeDynamicCF").val());
                $(".formatDynamicSelOptRow2").val($(".subtypeTimeDynamicCF").val());
                $("#basicFaktorRow2").removeClass("tempMonthCaseWidth");

                $("#subtypeTxtoptzBezugDkff2").removeClass("monthBezug2Validate");
                $("#subtypeTxtoptzBezugDkff2").removeClass("yearBezug2Validate");
        }else if(type=='Temperatur' && subtype=='tempPlusMonth'){
                $(".bezugInputMainDiv2").show();
                $(".tempInputMainDiv2").hide();

                $(".bezugStartDiv2").hide();
                $(".bezugEndDiv2").hide();
                $(".tempStartDiv2").show();
                $(".tempEndDiv2").show();

                $(".formatDynamicSelOptRow1").val($(".subtypeTimeDynamicCF").val());
                $(".formatDynamicSelOptRow2").val($(".subtypeTimeDynamicCF").val());
                $("#basicFaktorRow2").addClass("tempMonthCaseWidth");
        }else if(type=='Temperatur' && subtype=='tempPlusYear'){
                $(".bezugInputMainDiv2").show();
                $(".tempInputMainDiv2").hide();

                $(".bezugStartDiv2").hide();
                $(".bezugEndDiv2").hide();
                $(".tempStartDiv2").show();
                $(".tempEndDiv2").show();

                $(".formatDynamicSelOptRow1").val($(".subtypeTimeDynamicCF").val());
                $(".formatDynamicSelOptRow2").val($(".subtypeTimeDynamicCF").val());
                $("#basicFaktorRow2").addClass("tempMonthCaseWidth");
        }
    }
}



function typeValueSubtypeformatDynamic($val){
    if($val =='year'){
        return 'Jahr (Beispiel 2020)';
    }else if($val =='month'){
        return 'Monat (Beispiel 01)';
    }else if($val =='monthYear'){
        return 'Monat, Jahr (Beispiel 01.2020)';
    }else if($val =='day'){
        return 'Tag (Beispiel 01.01.2020)';
    }else if($val =='dayMonth'){
        return 'Tag, Monat (Beispiel 02.01)';
    }else if($val =='tempNum'){
        return 'Temperatur';
    }else if($val =='tempOnlyMonth'){
        return 'Monat (Beispiel 01)';
    }else if($val =='tempPlusMonth'){
        return 'Monat (Beispiel 01) + Temperatur';
    }else if($val =='tempPlusYear'){
        return 'Jahr (Beispiel 2020) + Temperatur';
    }else{
        return '';
    }
}

/*17-062020 basic plus 2 condtion and multiply calculation option*/
function basicPlus2ConditionMultiplayCalculationType($val){
    if($val =='1'){
        $('#basicFaktorRow1').show();
        $('#basicFaktorRow3').show();
        $('#basicFaktorRow2').show();
        $('#basicFaktorRow4').hide();
        $(".calculationTypeDKff").val(1);
        $('.subtypeTxtBasisFaktor2CalcRghtDiv').show();
        $('.subtypeTxtBasisFaktor3CalcRghtDiv').hide();
    }else if($val =='2'){
        $('#basicFaktorRow1').show();
        $('#basicFaktorRow3').hide();
        $('#basicFaktorRow2').show();
        $('#basicFaktorRow4').show();
        $(".calculationTypeDKff").val(2);
        $('.subtypeTxtBasisFaktor2CalcRghtDiv').hide();
        $('.subtypeTxtBasisFaktor3CalcRghtDiv').show();
    }else if($val =='3'){
        $('#basicFaktorRow1').show();
        $('#basicFaktorRow3').show();
        $('#basicFaktorRow2').show();
        $('#basicFaktorRow4').show();
        $(".calculationTypeDKff").val(3);
        $('.subtypeTxtBasisFaktor2CalcRghtDiv').show();
        $('.subtypeTxtBasisFaktor3CalcRghtDiv').hide();
    }else if($val =='4'){
        $('#basicFaktorRow1').show();
        $('#basicFaktorRow3').hide();
        $('#basicFaktorRow2').show();
        $('#basicFaktorRow4').hide();
        $(".calculationTypeDKff").val(4);
        $('.subtypeTxtBasisFaktor2CalcRghtDiv').hide();
        $('.subtypeTxtBasisFaktor3CalcRghtDiv').hide();

    }
}

/*19-06-2020 Add more after reset dynamische korrektore faktore*/
function addMoreAfterResetDynamischeKorrekturFktor(){
        $("#tblOptionenEPrdDKffNotify").show();
        $(".typeDynamicCF").prop('disabled', 'disabled');
        $(".subtypeTimeDynamicCF").prop('disabled', 'disabled');
        $(".auswahlTypierungFaktorDKff").prop('disabled', 'disabled');
        $(".calculationTypeDKff").prop('disabled', 'disabled');
        $("#basicFaktorRow1 input").val("");
        $("#basicFaktorRow2 input").val("");
        $("#basicFaktorRow3 input").val("");
        $("#basicFaktorRow4 input").val("");
        $("#basicFaktorRow3 select").val("");
        $("#basicFaktorRow4 select").val("");

        $('#tblOptionenEPrdDKff').parents('div.dataTables_wrapper').first().show();
}

/*25-06-2020 set the format dynamic select option value by defualt*/
function setDynamicFaktorDefaultValueIntoSelOpt(val){
    if(val == 'Zeit'){
                $(".formatDynamicSelOptRow1 option.zeitOption").show();
                $(".formatDynamicSelOptRow1 option.temperaturOption").hide();
                $(".formatDynamicSelOptRow2 option.zeitOption").show();
                $(".formatDynamicSelOptRow2 option.temperaturOption").hide();
            }
    if(val == 'Temperatur'){
        $(".formatDynamicSelOptRow1 option.temperaturOption").show();
        $(".formatDynamicSelOptRow1 option.zeitOption").hide();
        $(".formatDynamicSelOptRow2 option.temperaturOption").show();
        $(".formatDynamicSelOptRow2 option.zeitOption").hide();
    }
}


/*30-06-2020 Faktor 6 functionality validate */
function addValidateClassOnBezugRangeFaktoreTypeBasicBetweeen(fktr,type,subtype){
    if(fktr ==6 || fktr ==7 || fktr ==8 || fktr ==9){
        if(type=='Zeit' && subtype =='year'){
            console.log('year');
            /*$(".bezugInputMainDiv2").show();*/
            /*$(".tempInputMainDiv2").hide();*/
            $("#bezugStartTxt").removeClass();
            $("#bezugEndTxt").removeClass();
            $("#bezugStartTxt").addClass('yearStartBezugValidate');
            $("#bezugEndTxt").addClass('yearEndBezugValidate');
        }else if( type=='Zeit' &&  subtype =='month'){
            console.log('month');
            $("#bezugStartTxt").removeClass();
            $("#bezugEndTxt").removeClass();
            $("#bezugStartTxt").addClass('monthStartBezugValidate');
            $("#bezugEndTxt").addClass('monthEndBezugValidate');
        }else if( type=='Zeit' &&  subtype =='monthYear'){
            console.log('monthYear');
            $("#bezugStartTxt").removeClass();
            $("#bezugEndTxt").removeClass();
            $("#bezugStartTxt").addClass('monthYearStartBezugValidate');
            $("#bezugEndTxt").addClass('monthYearEndBezugValidate');
        }else if( type=='Zeit' &&  subtype =='day'){
            console.log('day');
            $("#bezugStartTxt").removeClass();
            $("#bezugEndTxt").removeClass();
            $("#bezugStartTxt").addClass('dayStartBezugValidate');
            $("#bezugEndTxt").addClass('dayEndBezugValidate');
        }else if( type=='Zeit' && subtype =='dayMonth'){
            console.log('dayMonth');

            $("#bezugStartTxt").removeClass();
            $("#bezugEndTxt").removeClass();
            $("#bezugStartTxt").addClass('dayMonthStartBezugValidate');
            $("#bezugEndTxt").addClass('dayMonthEndBezugValidate');
        }else if( type=='Temperatur' && subtype=='tempNum'){

            $("#bezugStartTxt").removeClass();
            $("#bezugEndTxt").removeClass();
            $("#tempStartTxt").removeClass();
            $("#tempEndTxt").removeClass();

            $("#tempStartTxt").addClass('tempNumStartBezugValidate');
            $("#tempEndTxt").addClass('tempNumEndBezugValidate');

            $("#subtypeTxtoptzBezugDkff").removeClass("monthBezugValidate");
            $("#subtypeTxtoptzBezugDkff").removeClass("yearBezugValidate");
        }else if( type=='Temperatur' && subtype=='tempOnlyMonth'){
            $("#bezugStartTxt").removeClass();
            $("#bezugEndTxt").removeClass();
            $("#tempStartTxt").removeClass();
            $("#tempEndTxt").removeClass();

            $("#bezugStartTxt").addClass('monthStartBezugValidate');
            $("#bezugEndTxt").addClass('monthEndBezugValidate');
            $("#subtypeTxtoptzBezugDkff").removeClass("monthBezugValidate");
            $("#subtypeTxtoptzBezugDkff").removeClass("yearBezugValidate");
        }else if( type=='Temperatur' && subtype=='tempPlusMonth'){
            $("#bezugStartTxt").removeClass();
            $("#bezugEndTxt").removeClass();
            $("#tempStartTxt").removeClass();
            $("#tempEndTxt").removeClass();

            $("#tempStartTxt").addClass('tempNumStartTempValidate');
            $("#tempEndTxt").addClass('tempNumEndTempValidate');

            $(".bezugInputMainDiv").show();
            $(".tempInputMainDiv").hide();
            $("#subtypeTxtoptzTempDkff").removeClass();
            $("#subtypeTxtoptzBezugDkff").removeClass();
            $("#subtypeTxtoptzBezugDkff").addClass('monthBezugValidate');
        }else if( type=='Temperatur' && subtype=='tempPlusYear'){
            $("#bezugStartTxt").removeClass();
            $("#bezugEndTxt").removeClass();
            $("#tempStartTxt").removeClass();
            $("#tempEndTxt").removeClass();

            $("#tempStartTxt").addClass('tempNumStartTempValidate');
            $("#tempEndTxt").addClass('tempNumEndTempValidate');

            $(".bezugInputMainDiv").show();
            $(".tempInputMainDiv").hide();
            $("#subtypeTxtoptzTempDkff").removeClass();
            $("#subtypeTxtoptzBezugDkff").removeClass();
            $("#subtypeTxtoptzBezugDkff").addClass('yearBezugValidate');
        }
    }

}
/*30-06-2020 Faktor 6 functionality validate */

/*16-07-2020 Faktor 8 functionality validate */
function addValidateClassOnBezugRangeFaktoreTypeRow2BasicBetweeen(fktr,type,subtype){
    if(fktr ==8 || fktr ==9){
        if(type=='Zeit' && subtype =='year'){
            console.log('year');
            /*$(".bezugInputMainDiv2").show();*/
            /*$(".tempInputMainDiv2").hide();*/
            $("#bezugStartTxt2").removeClass();
            $("#bezugEndTxt2").removeClass();
            $("#bezugStartTxt2").addClass('yearStartBezugValidate2');
            $("#bezugEndTxt2").addClass('yearEndBezugValidate2');
        }else if( type=='Zeit' &&  subtype =='month'){
            console.log('month');
            $("#bezugStartTxt2").removeClass();
            $("#bezugEndTxt2").removeClass();
            $("#bezugStartTxt2").addClass('monthStartBezugValidate2');
            $("#bezugEndTxt2").addClass('monthEndBezugValidate2');
        }else if( type=='Zeit' &&  subtype =='monthYear'){
            console.log('monthYear');
            $("#bezugStartTxt2").removeClass();
            $("#bezugEndTxt2").removeClass();
            $("#bezugStartTxt2").addClass('monthYearStartBezugValidate2');
            $("#bezugEndTxt2").addClass('monthYearEndBezugValidate2');
        }else if( type=='Zeit' &&  subtype =='day'){
            console.log('day');
            $("#bezugStartTxt2").removeClass();
            $("#bezugEndTxt2").removeClass();
            $("#bezugStartTxt2").addClass('dayStartBezugValidate2');
            $("#bezugEndTxt2").addClass('dayEndBezugValidate2');
        }else if( type=='Zeit' && subtype =='dayMonth'){
            console.log('dayMonth');

            $("#bezugStartTxt2").removeClass();
            $("#bezugEndTxt2").removeClass();
            $("#bezugStartTxt2").addClass('dayMonthStartBezugValidate2');
            $("#bezugEndTxt2").addClass('dayMonthEndBezugValidate2');
        }else if( type=='Temperatur' && subtype=='tempNum'){

            $("#bezugStartTxt2").removeClass();
            $("#bezugEndTxt2").removeClass();
            $("#tempStartTxt2").removeClass();
            $("#tempEndTxt2").removeClass();

            $("#tempStartTxt2").addClass('tempNumStartTempValidate2');
            $("#tempEndTxt2").addClass('tempNumEndTempValidate2');
        }else if( type=='Temperatur' && subtype=='tempOnlyMonth'){
            $("#bezugStartTxt2").removeClass();
            $("#bezugEndTxt2").removeClass();
            $("#tempStartTxt2").removeClass();
            $("#tempEndTxt2").removeClass();

            $("#bezugStartTxt2").addClass('monthStartBezugValidate2');
            $("#bezugEndTxt2").addClass('monthEndBezugValidate2');
        }else if( type=='Temperatur' && subtype=='tempPlusMonth'){
            $("#bezugStartTxt2").removeClass();
            $("#bezugEndTxt2").removeClass();
            $("#tempStartTxt2").removeClass();
            $("#tempEndTxt2").removeClass();

            $("#tempStartTxt2").addClass('tempNumStartTempValidate2');
            $("#tempEndTxt2").addClass('tempNumEndTempValidate2');

            $(".bezugInputMainDiv2").show();
            $(".tempInputMainDiv2").hide();
            $("#subtypeTxtoptzTempDkff2").removeClass();
            $("#subtypeTxtoptzBezugDkff2").removeClass();
            $("#subtypeTxtoptzBezugDkff2").addClass('monthBezug2Validate');
        }else if( type=='Temperatur' && subtype=='tempPlusYear'){
            $("#bezugStartTxt2").removeClass();
            $("#bezugEndTxt2").removeClass();
            $("#tempStartTxt2").removeClass();
            $("#tempEndTxt2").removeClass();

            $("#tempStartTxt2").addClass('tempNumStartTempValidate2');
            $("#tempEndTxt2").addClass('tempNumEndTempValidate2');

            $(".bezugInputMainDiv2").show();
            $(".tempInputMainDiv2").hide();
            $("#subtypeTxtoptzTempDkff2").removeClass();
            $("#subtypeTxtoptzBezugDkff2").removeClass();
            $("#subtypeTxtoptzBezugDkff2").addClass('yearBezug2Validate');
        }
    }

}
/*16-07-2020 Faktor 8 functionality validate */
/*01-07-2020 validate faktor 6 text input*/
function validateStartEndInputBezugFaktorTypeBasicBetween(faktorType){
    if(faktorType ==6 || faktorType ==7 ||  faktorType ==8 || faktorType ==9){
        /*basic row 1*/
        var yearValStart = $(".yearStartBezugValidate").val();
        if(yearValStart){
            var yearRegex = /^\s*((?:19|20)\d{2})\s*$/;
            if (!yearRegex.test(yearValStart)) {
                alert('Bitte geben Sie ein gültiges Jahr ein (Beispiel 2020)');
                return false;
            }
        }

        var monthValStart = $(".monthStartBezugValidate").val();
        if(monthValStart){
            var regexMonth = /^\s*(1[012]|0?[1-9])\s*$/;
            if (!regexMonth.test(monthValStart)) {
                alert('Bitte geben Sie einen gültigen Monat ein (Beispiel 01)');
                return false;
            }
        }
        var monthYearValStart = $(".monthYearStartBezugValidate").val();
        if(typeof monthYearValStart != 'undefined'){
        var monthYearValStartSplit =monthYearValStart.split('.');
        var monthYearValStartchk = new Date(monthYearValStartSplit[1]+'.'+monthYearValStartSplit[0]);
        }
        if(monthYearValStart){
            var monthYearRegex = /^\s*(1[012]|0?[1-9])\.((?:19|20)\d{2})\s*$/;
            if (!monthYearRegex.test(monthYearValStart)) {
                alert('Bitte geben Sie ein gültiges Monat Jahr ein (Beispiel 01.2020)');
                return false;
            }
        }
        var dayValStart = $(".dayStartBezugValidate").val();
        var dayValStartchk = new Date(dayValStart);
        if(dayValStart){
            var dayRegex = /^\s*(3[01]|[12][0-9]|0?[1-9])\.(1[012]|0?[1-9])\.((?:19|20)\d{2})\s*$/;
            if (!dayRegex.test(dayValStart)) {
                alert('Bitte geben Sie einen gültigen Tag ein (Beispiel 01.01.2020)');
                return false;
            }
        }
        var dayMonthValStart = $(".dayMonthStartBezugValidate").val();
        if(typeof dayMonthValStart != 'undefined'){
        var dayMonthValStartSplit =dayMonthValStart.split('.');
        var dayMonthValStartchk = new Date(dayMonthValStartSplit[1]+'.'+dayMonthValStartSplit[0]);
        }
        if(dayMonthValStart){
            var dayMonthRegex = /^\s*(3[01]|[12][0-9]|0?[1-9])\.(1[012]|0?[1-9])\s*$/;
            if (!dayMonthRegex.test(dayMonthValStart)) {
                alert('Bitte geben Sie einen gültigen Monat Monat ein (Beispiel 02.01)');
                return false;
            }
        }
        var yearValEnd = $(".yearEndBezugValidate").val();
        if(yearValEnd){
            var yearRegex = /^\s*((?:19|20)\d{2})\s*$/;
            if (!yearRegex.test(yearValEnd)) {
                alert('Bitte geben Sie ein gültiges Jahr ein (Beispiel 2020)');
                return false;
            }
        }
        var monthValEnd = $(".monthEndBezugValidate").val();
        if(monthValEnd){
            var regexMonth = /^\s*(1[012]|0?[1-9])\s*$/;
            if (!regexMonth.test(monthValEnd)) {
                alert('Bitte geben Sie einen gültigen Monat ein (Beispiel 01)');
                return false;
            }
        }
        var monthYearValEnd = $(".monthYearEndBezugValidate").val();
        if(typeof monthYearValEnd != 'undefined'){
        var monthYearValEndSplit =monthYearValEnd.split('.');
        var monthYearValEndchk = new Date(monthYearValEndSplit[1]+'.'+monthYearValEndSplit[0]);
        }
        if(monthYearValEnd){
            var monthYearRegex = /^\s*(1[012]|0?[1-9])\.((?:19|20)\d{2})\s*$/;
            if (!monthYearRegex.test(monthYearValEnd)) {
                alert('Bitte geben Sie ein gültiges Monat Jahr ein (Beispiel 01.2020)');
                return false;
            }
        }
        var dayValEnd = $(".dayEndBezugValidate").val();
        var dayValEndchk = new Date(dayValEnd);
        if(dayValEnd){
            var dayRegex = /^\s*(3[01]|[12][0-9]|0?[1-9])\.(1[012]|0?[1-9])\.((?:19|20)\d{2})\s*$/;
            if (!dayRegex.test(dayValEnd)) {
                alert('Bitte geben Sie einen gültigen Tag ein (Beispiel 01.01.2020)');
                return false;
            }
        }
        var dayMonthValEnd = $(".dayMonthEndBezugValidate").val();
        if(typeof dayMonthValEnd != 'undefined'){
            var dayMonthValEndSplit =dayMonthValEnd.split('.');
            var dayMonthValEndchk = new Date(dayMonthValEndSplit[1]+'.'+dayMonthValEndSplit[0]);
        }

        //alert(dayMonthValS);alert(dayMonthValEnd);
        if(dayMonthValEnd){
            var dayMonthRegex = /^\s*(3[01]|[12][0-9]|0?[1-9])\.(1[012]|0?[1-9])\s*$/;
            if (!dayMonthRegex.test(dayMonthValEnd)) {
                alert('Bitte geben Sie einen gültigen Monat Monat ein (Beispiel 02.01)');
                return false;
            }
        }

        var tempValStart = $(".tempNumStartTempValidate").val();
        var tempValEnd = $(".tempNumEndTempValidate").val();
        /*basic row 2*/
        var yearValStart2 = $(".yearStartBezugValidate2").val();
        if(yearValStart2){
            var yearRegex2 = /^\s*((?:19|20)\d{2})\s*$/;
            if (!yearRegex2.test(yearValStart2)) {
                alert('Bitte geben Sie ein gültiges Jahr ein (Beispiel 2020)');
                return false;
            }
        }

        var monthValStart2 = $(".monthStartBezugValidate2").val();
        if(monthValStart2){
            var regexMonth2 = /^\s*(1[012]|0?[1-9])\s*$/;
            if (!regexMonth2.test(monthValStart2)) {
                alert('Bitte geben Sie einen gültigen Monat ein (Beispiel 01)');
                return false;
            }
        }
        var monthYearValStart2 = $(".monthYearStartBezugValidate2").val();
        if(typeof monthYearValStart2 != 'undefined'){
        var monthYearValStartSplit2 =monthYearValStart2.split('.');
        var monthYearValStartchk2 = new Date(monthYearValStartSplit2[1]+'.'+monthYearValStartSplit2[0]);
        }
        if(monthYearValStart2){
            var monthYearRegex2 = /^\s*(1[012]|0?[1-9])\.((?:19|20)\d{2})\s*$/;
            if (!monthYearRegex2.test(monthYearValStart2)) {
                alert('Bitte geben Sie ein gültiges Monat Jahr ein (Beispiel 01.2020)');
                return false;
            }
        }
        var dayValStart2 = $(".dayStartBezugValidate2").val();
        var dayValStartchk2 = new Date(dayValStart2);
        if(dayValStart2){
            var dayRegex2 = /^\s*(3[01]|[12][0-9]|0?[1-9])\.(1[012]|0?[1-9])\.((?:19|20)\d{2})\s*$/;
            if (!dayRegex2.test(dayValStart2)) {
                alert('Bitte geben Sie einen gültigen Tag ein (Beispiel 01.01.2020)');
                return false;
            }
        }
        var dayMonthValStart2 = $(".dayMonthStartBezugValidate2").val();
        if(typeof dayMonthValStart2 != 'undefined'){
        var dayMonthValStartSplit2 =dayMonthValStart2.split('.');
        var dayMonthValStartchk2 = new Date(dayMonthValStartSplit2[1]+'.'+dayMonthValStartSplit2[0]);
        }
        if(dayMonthValStart2){
            var dayMonthRegex2 = /^\s*(3[01]|[12][0-9]|0?[1-9])\.(1[012]|0?[1-9])\s*$/;
            if (!dayMonthRegex2.test(dayMonthValStart2)) {
                alert('Bitte geben Sie einen gültigen Monat Monat ein (Beispiel 02.01)');
                return false;
            }
        }
        var yearValEnd2 = $(".yearEndBezugValidate2").val();
        if(yearValEnd2){
            var yearRegex2 = /^\s*((?:19|20)\d{2})\s*$/;
            if (!yearRegex2.test(yearValEnd2)) {
                alert('Bitte geben Sie ein gültiges Jahr ein (Beispiel 2020)');
                return false;
            }
        }
        var monthValEnd2 = $(".monthEndBezugValidate2").val();
        if(monthValEnd2){
            var regexMonth2 = /^\s*(1[012]|0?[1-9])\s*$/;
            if (!regexMonth2.test(monthValEnd2)) {
                alert('Bitte geben Sie einen gültigen Monat ein (Beispiel 01)');
                return false;
            }
        }
        var monthYearValEnd2 = $(".monthYearEndBezugValidate2").val();
        if(typeof monthYearValEnd2 != 'undefined'){
        var monthYearValEndSplit2 =monthYearValEnd2.split('.');
        var monthYearValEndchk2 = new Date(monthYearValEndSplit2[1]+'.'+monthYearValEndSplit2[0]);
        }
        if(monthYearValEnd2){
            var monthYearRegex2 = /^\s*(1[012]|0?[1-9])\.((?:19|20)\d{2})\s*$/;
            if (!monthYearRegex2.test(monthYearValEnd2)) {
                alert('Bitte geben Sie ein gültiges Monat Jahr ein (Beispiel 01.2020)');
                return false;
            }
        }
        var dayValEnd2 = $(".dayEndBezugValidate2").val();
        var dayValEndchk2 = new Date(dayValEnd2);
        if(dayValEnd2){
            var dayRegex2 = /^\s*(3[01]|[12][0-9]|0?[1-9])\.(1[012]|0?[1-9])\.((?:19|20)\d{2})\s*$/;
            if (!dayRegex2.test(dayValEnd2)) {
                alert('Bitte geben Sie einen gültigen Tag ein (Beispiel 01.01.2020)');
                return false;
            }
        }
        var dayMonthValEnd2 = $(".dayMonthEndBezugValidate2").val();
        if(typeof dayMonthValEnd2 != 'undefined'){
            var dayMonthValEndSplit2 =dayMonthValEnd2.split('.');
            var dayMonthValEndchk2= new Date(dayMonthValEndSplit2[1]+'.'+dayMonthValEndSplit2[0]);
        }

        //alert(dayMonthValS);alert(dayMonthValEnd);
        if(dayMonthValEnd2){
            var dayMonthRegex2 = /^\s*(3[01]|[12][0-9]|0?[1-9])\.(1[012]|0?[1-9])\s*$/;
            if (!dayMonthRegex2.test(dayMonthValEnd2)) {
                alert('Bitte geben Sie einen gültigen Monat Monat ein (Beispiel 02.01)');
                return false;
            }
        }

         var tempValStart2 = $(".tempNumStartTempValidate2").val();
         var tempValEnd2 = $(".tempNumEndTempValidate2").val();
        if(yearValStart>yearValEnd ||
            monthValStart>monthValEnd ||
        monthYearValStartchk>monthYearValEndchk ||
            dayValStartchk>dayValEndchk ||
            dayMonthValStartchk>dayMonthValEndchk ||
            tempValStart>tempValEnd ||
            yearValStart2>yearValEnd2 ||
            monthValStart2>monthValEnd2 ||
            monthYearValStartchk2>monthYearValEndchk2 ||
            tempValStart2>tempValEnd2
            ){
            alert('Bezug Ende sollte größer sein als Bezug Start');
            return false;
        } else{
            return true;
        }
     }
}


// module.exports =
//     { mstIdentifier
//     , isCalculated
//     , isEmpty
//     , isOperator
//     , isNumeric
//     , isUnit
//     , isMessstelle
//     , isOpeningParentheses
//     , isClosingParentheses
//     , moreOpeningThanClosingParentheses
//     , isSelfReference
//     , getLastElement
//     , allParenthesesClosed
//     , validDropMessstelle
//     , validDropUnit
//     , validInputNumber
//     , validInputOperator
//     , validInputOpeningParentheses
//     , validInputClosingParentheses
//     , readyToSave
//     }

/*10-08-2020 formate result*/
function tblOptionenEPrdDKffFormat ( c,d ) {
     return '<table cellpadding="5" cellspacing="0" border="0" style="padding-right: 26px;float: right;font-weight:bold;">'+
        '<tr>'+
            '<td>Result :</td>'+
            '<td>'+d+'('+c+')</td>'+
        '</tr>'
    '</table>';
}

function tblOptionenRecordAndDelOpt( c,d,e ) {
     return '<table id="childTableGetDFaktr" cellpadding="5" cellspacing="0" border="0" style="padding-right: 26px;float: right;font-weight:bold;">'+
        '<tr>'+
            '<td>Result :</td>'+
            '<td>'+d+'('+c+')</td>'+
            '<td class="dyanamicheKrkturfktrDelFiveOrNine"><button type="button" data-id="'+e+'">Delete</button></td>'+
        '</tr>'
    '</table>';
}
/*dynamischeKorrektorFaktor get calculation type record*/

function getCalculationtypeRecordFiveAndNineFaktor(calculationID,FaktoreType){
         $.ajax({
            type: "POST",
            async: !0,
            url: "php/instanzIntoDb.php",
            data: {
                nameDB: $("#nameDB").val(),
                dKff_id:id,
                FaktoreType:FaktoreType,
                calculationID:calculationID,
                id:'calculationTypeResult'
            },
            success: function(a) {
                a = json(a);
                var b = a.length;
                console.log(a);
                var calculateID = a[0]['calculateID'];
                var calculationType = a[0]['calculationType'];
                var faktorWert = a[0]['faktorWert'];
                var faktorWertR2 = a[1]['faktorWert'];
                var faktor = a[1]['subtypeTxtoptzFaktoreDkff'];
                $('#ePrdDKFECalcID').val(calculateID);
                $('#ePrdDKFECalcType').val(calculationType);
                $('#ePrdDKFECalcWert').val(faktorWert);
                $('#ePrdDKFECalcWertR2').val(faktorWertR2);
                $('#ePrdDKFECalcFaktor').val(faktor);
                $('.subtypeTxtBasisFaktor2CalcRght').val(calculationType);
            }
        });
}


function pushArrayforTheResultArr(c,d){
     rowResult.push(d);
     rowCalculator.push(c);
}


function emptyArrayAfterPush() {
    rowResult.length = 0;
    rowCalculator.length = 0;
    //console.log(rowResult);
    //console.log(rowCalculator);
}


function addExtraWidthToDynamischeFaktor(){
    var $dte = $('#main');
    $('#infosDynamicKorrekturFaktor').is(':visible') ? $dte.addClass('fullWidthDynamischeFktor') : $dte.removeClass('fullWidthDynamischeFktor')
}

function dynamischeKorrekturFaktorenMessstellenCatSel(){
    $.ajax({
        type: "POST",
        async: !0,
        url: "php/getBereiche.php",
        data: {
            id: "dynamicFaktorBereiche",
            nameDB: $("#nameDB").val()
        },
        success: function(a) {
            a = JSON.parse(a);
            tblMessstellenCat.colReorder.reset();
            tblMessstellenCat.clear().draw();
            for (var b = 0; b < a.length; b++) tblMessstellenCat.row.add([a[b].ber_ID, a[b].nameBer, a[b].kurzbezeichnungBer, a[b].kostenstelleBer, a[b].ortBer, a[b].ausgewaehltesLevelBer, a[b].vorgelagerterBereich1Ber, a[b].vorgelagerterBereich2Ber]).draw();
            tblMessstellenCat.column(0).visible(!1);
            $("#dynamischeFaktorMessstellenCatContainer").css("display", "block");
            $("#dynamischeFaktorMessstellenCatContainer").dialog({
                height: $(window).height() - .125 * $(window).height(),
                width: $(window).width() - .125 * $(window).width(),
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
                    $("#tblMessstellenCat tbody tr").css("cursor", "pointer");
                    $("#tblMessstellenCat tbody").on("dblclick", "tr", function() {
                        var rowData = tblMessstellenCat.row(this).data();
                        $("#dynamischeFaktorMessstellenCatContainer").dialog("close");
                        console.log(rowData);
                        $("#messstellenBerecheID").val(rowData[0]);
                        $("#messstellenCatName").val(rowData[1]);
                    });

                }
            });
        }
    });
}

function dynamischeKorrekturFaktorenMessstellenCatSel2(){
    $.ajax({
        type: "POST",
        async: !0,
        url: "php/getBereiche.php",
        data: {
            id: "dynamicFaktorBereiche",
            nameDB: $("#nameDB").val()
        },
        success: function(a) {
            a = JSON.parse(a);
            tblMessstellenCat2.colReorder.reset();
            tblMessstellenCat2.clear().draw();
            for (var b = 0; b < a.length; b++) tblMessstellenCat2.row.add([a[b].ber_ID, a[b].nameBer, a[b].kurzbezeichnungBer, a[b].kostenstelleBer, a[b].ortBer, a[b].ausgewaehltesLevelBer, a[b].vorgelagerterBereich1Ber, a[b].vorgelagerterBereich2Ber]).draw();
            tblMessstellenCat2.column(0).visible(!1);
            $("#dynamischeFaktorMessstellenCat2Container").css("display", "block");
            $("#dynamischeFaktorMessstellenCat2Container").dialog({
                height: $(window).height() - .125 * $(window).height(),
                width: $(window).width() - .125 * $(window).width(),
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
                    $("#tblMessstellenCat2 tbody tr").css("cursor", "pointer");
                    $("#tblMessstellenCat2 tbody").on("dblclick", "tr", function() {
                        var rowData = tblMessstellenCat2.row(this).data();
                        $("#dynamischeFaktorMessstellenCat2Container").dialog("close");
                        console.log(rowData);
                        $("#messstellenBerecheID2").val(rowData[0]);
                        $("#messstellenCatName2").val(rowData[1]);
                    });

                }
            });
        }
    });
}

function getDynamischeKrktrFaktorDeleteOptClickValues(calcID){
         $.ajax({
            type: "POST",
            async: !0,
            url: "php/getDKorrekturfaktor.php",
            data: {
                nameDB: $("#nameDB").val(),
                id:'deleteOrReset',
                calcID:calcID
            },
            success: function(a) {
                formData = json(a);
                var b = formData.length;
                console.log(formData);
                var calculationType = $(".calculationTypeDKff").val();
                if(calculationType == 1){
                    $('#subtypeTxtOptNameDKff').val(formData[0]['subtypeTxtOptNameDKff']);
                    $('#subtypeTxtoptzBezugDkff').val(formData[0]['subtypeTxtoptzBezugDkff']);
                    $('#subtypeTxtoptzTempDkff').val(formData[0]['subtypeTxtoptzTempDkff']);
                    $('#subtypeTxtoptzFaktoreDkff').val(formData[0]['subtypeTxtoptzFaktoreDkff']);

                    $('#bezugStartTxt').val(formData[0]['bezugStartTxt']);
                    $('#bezugEndTxt').val(formData[0]['bezugEndTxt']);
                    $('#tempStartTxt').val(formData[0]['tempStartTxt']);
                    $('#tempEndTxt').val(formData[0]['tempEndTxt']);
                    $('#messstellenCatName').val(formData[0]['nameBer']);
                    $('#messstellenBerecheID').val(formData[0]['ber_ID']);
                    $('.formatDynamicSelOptRow1').val(formData[0]['formatDynamicType']);

                    $("#subtypeTxtBasisFaktor2Name").val(formData[0]['faktorName']);
                    $(".subtypeTxtBasisFaktor2Calc").val(formData[0]['faktorCalc']);
                    $("#subtypeTxtBasisFaktor2Wert").val(formData[0]['faktorWert']);
                    $(".subtypeTxtBasisFaktor2CalcRght").val(formData[0]['calculationType']);
                    $('#subtypeTxtOptNameDKff2').val(formData[1]['subtypeTxtOptNameDKff']);
                    $('#subtypeTxtoptzBezugDkff2').val(formData[1]['subtypeTxtoptzBezugDkff']);
                    $('#subtypeTxtoptzTempDkff2').val(formData[1]['subtypeTxtoptzTempDkff']);
                    $('#subtypeTxtoptzFaktoreDkff2').val(formData[1]['subtypeTxtoptzFaktoreDkff']);

                    $('#bezugStartTxt2').val(formData[1]['bezugStartTxt']);
                    $('#bezugEndTxt2').val(formData[1]['bezugEndTxt']);
                    $('#tempStartTxt2').val(formData[1]['tempStartTxt']);
                    $('#tempEndTxt2').val(formData[1]['tempEndTxt']);
                    $('#messstellenCatName2').val(formData[1]['nameBer']);
                    $('#messstellenBerecheID2').val(formData[1]['ber_ID']);
                    $('.formatDynamicSelOptRow2').val(formData[0]['formatDynamicType']);
                    $('#ePrdDKFERow1ID').val(formData[0]['dKffOption_id']);
                    $('#ePrdDKFERow2ID').val(formData[1]['dKffOption_id']);
                    $('#updateOptType').val('deleteClickUpdate');

                }else if(calculationType == 2){
                    $('#subtypeTxtOptNameDKff').val(formData[1]['subtypeTxtOptNameDKff']);
                    $('#subtypeTxtoptzBezugDkff').val(formData[1]['subtypeTxtoptzBezugDkff']);
                    $('#subtypeTxtoptzTempDkff').val(formData[1]['subtypeTxtoptzTempDkff']);
                    $('#subtypeTxtoptzFaktoreDkff').val(formData[1]['subtypeTxtoptzFaktoreDkff']);

                    $('#bezugStartTxt').val(formData[1]['bezugStartTxt']);
                    $('#bezugEndTxt').val(formData[1]['bezugEndTxt']);
                    $('#tempStartTxt').val(formData[1]['tempStartTxt']);
                    $('#tempEndTxt').val(formData[1]['tempEndTxt']);
                    $('#messstellenCatName').val(formData[1]['nameBer']);
                    $('#messstellenBerecheID').val(formData[1]['ber_ID']);
                    $('.formatDynamicSelOptRow1').val(formData[0]['formatDynamicType']);

                    $('#subtypeTxtOptNameDKff2').val(formData[0]['subtypeTxtOptNameDKff']);
                    $('#subtypeTxtoptzBezugDkff2').val(formData[0]['subtypeTxtoptzBezugDkff']);
                    $('#subtypeTxtoptzTempDkff2').val(formData[0]['subtypeTxtoptzTempDkff']);
                    $('#subtypeTxtoptzFaktoreDkff2').val(formData[0]['subtypeTxtoptzFaktoreDkff']);

                    $('#bezugStartTxt2').val(formData[0]['bezugStartTxt']);
                    $('#bezugEndTxt2').val(formData[0]['bezugEndTxt']);
                    $('#tempStartTxt2').val(formData[0]['tempStartTxt']);
                    $('#tempEndTxt2').val(formData[0]['tempEndTxt']);
                    $('#messstellenCatName2').val(formData[0]['nameBer']);
                    $('#messstellenBerecheID2').val(formData[0]['ber_ID']);
                    $('.formatDynamicSelOptRow2').val(formData[0]['formatDynamicType']);

                    $("#subtypeTxtBasisFaktor3Name").val(formData[0]['faktorName']);
                    $(".subtypeTxtBasisFaktor3Calc").val(formData[0]['faktorCalc']);
                    $("#subtypeTxtBasisFaktor3Wert").val(formData[0]['faktorWert']);
                    $(".subtypeTxtBasisFaktor3CalcRght").val(formData[0]['calculationType']);

                    $('#ePrdDKFERow1ID').val(formData[0]['dKffOption_id']);
                    $('#ePrdDKFERow2ID').val(formData[1]['dKffOption_id']);
                    $('#updateOptType').val('deleteClickUpdate');
                }else if(calculationType == 3){
                    $('#subtypeTxtOptNameDKff').val(formData[0]['subtypeTxtOptNameDKff']);
                    $('#subtypeTxtoptzBezugDkff').val(formData[0]['subtypeTxtoptzBezugDkff']);
                    $('#subtypeTxtoptzTempDkff').val(formData[0]['subtypeTxtoptzTempDkff']);
                    $('#subtypeTxtoptzFaktoreDkff').val(formData[0]['subtypeTxtoptzFaktoreDkff']);

                    $('#bezugStartTxt').val(formData[0]['bezugStartTxt']);
                    $('#bezugEndTxt').val(formData[0]['bezugEndTxt']);
                    $('#tempStartTxt').val(formData[0]['tempStartTxt']);
                    $('#tempEndTxt').val(formData[0]['tempEndTxt']);
                    $('#messstellenCatName').val(formData[0]['nameBer']);
                    $('#messstellenBerecheID').val(formData[0]['ber_ID']);
                    $('.formatDynamicSelOptRow1').val(formData[0]['formatDynamicType']);

                    $("#subtypeTxtBasisFaktor2Name").val(formData[0]['faktorName']);
                    $(".subtypeTxtBasisFaktor2Calc").val(formData[0]['faktorCalc']);
                    $("#subtypeTxtBasisFaktor2Wert").val(formData[0]['faktorWert']);
                    $(".subtypeTxtBasisFaktor2CalcRght").val(formData[0]['calculationType']);

                    $('#subtypeTxtOptNameDKff2').val(formData[1]['subtypeTxtOptNameDKff']);
                    $('#subtypeTxtoptzBezugDkff2').val(formData[1]['subtypeTxtoptzBezugDkff']);
                    $('#subtypeTxtoptzTempDkff2').val(formData[1]['subtypeTxtoptzTempDkff']);
                    $('#subtypeTxtoptzFaktoreDkff2').val(formData[1]['subtypeTxtoptzFaktoreDkff']);

                    $('#bezugStartTxt2').val(formData[1]['bezugStartTxt']);
                    $('#bezugEndTxt2').val(formData[1]['bezugEndTxt']);
                    $('#tempStartTxt2').val(formData[1]['tempStartTxt']);
                    $('#tempEndTxt2').val(formData[1]['tempEndTxt']);
                    $('#messstellenCatName2').val(formData[1]['nameBer']);
                    $('#messstellenBerecheID2').val(formData[1]['ber_ID']);
                    $('.formatDynamicSelOptRow2').val(formData[0]['formatDynamicType']);

                    $("#subtypeTxtBasisFaktor3Name").val(formData[1]['faktorName']);
                    $(".subtypeTxtBasisFaktor3Calc").val(formData[1]['faktorCalc']);
                    $("#subtypeTxtBasisFaktor3Wert").val(formData[1]['faktorWert']);
                    $(".subtypeTxtBasisFaktor3CalcRght").val(formData[1]['calculationType']);

                    $('#ePrdDKFERow1ID').val(formData[0]['dKffOption_id']);
                    $('#ePrdDKFERow2ID').val(formData[1]['dKffOption_id']);
                    $('#updateOptType').val('deleteClickUpdate');
                }

            }
        });
}

/*28-08-2020 dynamiche Correction factor update record Delete option button ajax response*/
function DynamischeKorrekturfaktorenDeleteBtnAktualisieren() {

    //alert('test1');
     var parentOptName = $("#optionNameDKff").val();
     var parentBeschreibunDesc = $("#optionBeschreibungDKff").val();

     var optionName = $('#subtypeTxtOptNameDKff').val();
     var optionBezug = $('#subtypeTxtoptzBezugDkff').val();
     var optionTemp = $('#subtypeTxtoptzTempDkff').val();
     var optionFaktore = $('#subtypeTxtoptzFaktoreDkff').val();
     var ePrdDIdStore = $('#ePrdDIdStore').val();
     var ePrdDMainIdStore = $('#ePrdDMainIdStore').val();
     var basisFktr2Name = $('#subtypeTxtBasisFaktor2Name').val();
     var basisFktr2Calc = $('.subtypeTxtBasisFaktor2Calc').val();
     var basisFktr2Wert = $('#subtypeTxtBasisFaktor2Wert').val();
     var ePrddKffOptionIDStore = $('#ePrddKffOptionIDStore').val();

     var faktoreDynamictypeVal = $('.formatDynamicSelOptRow1').val();
     //alert(faktoreDynamictypeVal);
     var faktorType = $(".auswahlTypierungFaktorDKff").val();
     var bezugStartTxt = $("#bezugStartTxt").val();
     var bezugEndTxt = $("#bezugEndTxt").val();
     var tempStartTxt = $("#tempStartTxt").val();
     var tempEndTxt = $("#tempEndTxt").val();

     var ePrdDKFECalcResult = $("#ePrdDKFECalcResult").val();
     var messstellenBerecheID = $('#messstellenBerecheID').val();

    /*Faktor 5 or 9 delete option row*/
    var ePrdDKFERow1ID = $('#ePrdDKFERow1ID').val();
    var ePrdDKFERow2ID = $('#ePrdDKFERow2ID').val();
    var updateOptType = $('#updateOptType').val();
    var basisFktr3Name = $('#subtypeTxtBasisFaktor3Name').val();
    var basisFktr3Calc = $('.subtypeTxtBasisFaktor3Calc').val();
    var basisFktr3Wert = $('#subtypeTxtBasisFaktor3Wert').val();

    var optionName2 = $('#subtypeTxtOptNameDKff2').val();
    var optionBezug2 = $('#subtypeTxtoptzBezugDkff2').val();
    var optionTemp2 = $('#subtypeTxtoptzTempDkff2').val();
    var bezugStartTxt2 = $("#bezugStartTxt2").val();
    var bezugEndTxt2 = $("#bezugEndTxt2").val();
    var tempStartTxt2 = $("#tempStartTxt2").val();
    var tempEndTxt2 = $("#tempEndTxt2").val();
    var optionFaktore2 = $('#subtypeTxtoptzFaktoreDkff2').val();
    var faktoreDynamictypeVal2 = $('.formatDynamicSelOptRow2').val();
    var messstellenBerecheID2 = $('#messstellenBerecheID2').val();
    var calculationTypeDKff = $('.calculationTypeDKff').val();
    //alert('test2');

    if(basisFktr2Wert !='' && optionFaktore !=''){
        var faktoreRep = optionFaktore.replace(",", ".");
        var basisFktr2WertRep = basisFktr2Wert.replace(",", ".");

        var faktore2Comma = optionFaktore.replace(".", ",");
        var basisFktrWertComma = basisFktr2Wert.replace(".", ",");
        if(isFloat(faktoreRep)==true && isFloat(basisFktr2WertRep)==true){
            var result2CommaDigit = eval(faktoreRep + basisFktr2Calc + basisFktr2WertRep);
        }else{
            alert("Bitte geben Sie den Textwert in faktore und wert ein");
            return false;
        }
        var result = result2CommaDigit.toFixed(4).replace(".", ",");
    }else{
        var result ='';
    }

     if(optionFaktore !=''){
            var faktoreRep = optionFaktore.replace(",", ".");
            var faktore2CommaRep = optionFaktore.replace(".", ",");
            if(isFloat(faktoreRep)==true){
                var faktore2Comma = faktore2CommaRep;
            }else{
                alert("Bitte geben Sie den Textwert in faktore und wert ein");
                return false;
            }
        }
        if(faktorType==9){
            //alert(validateStartEndInputBezugFaktorTypeBasicBetween(faktorType));
            if(validateStartEndInputBezugFaktorTypeBasicBetween(faktorType) != true){
                return false;
            }
        }
        //alert('test3');
        var calculateID = $('#ePrdDKFECalcID').val();
        var wertRow1 = $('#subtypeTxtBasisFaktor2Wert').val();
        var wertRow2 = $('#ePrdDKFECalcWertR2').val();

        var ePrdDKFECalcWert = $('#ePrdDKFECalcWert').val();
        var ePrdDKFECalcRowType = $('#ePrdDKFECalcRowType').val();

        var faktor = $('#ePrdDKFECalcFaktor').val();

        if(basisFktr3Wert !='' && optionFaktore2 !='' /*&& (calculationTypeDKff ==2 || calculationTypeDKff ==3 )*/){
            var faktoreRep2 = optionFaktore2.replace(",", ".");
            var basisFktr3WertRep = basisFktr3Wert.replace(",", ".");

            var faktore3Comma = optionFaktore2.replace(".", ",");
            var basisFktrWert3Comma = basisFktr3Wert.replace(".", ",");

            if(isFloat(faktoreRep2)==true && isFloat(basisFktr3WertRep)==true){
                var result3CommaDigit = eval(faktoreRep2 + basisFktr3Calc + basisFktr3WertRep);
            }else{
                alert("Bitte geben Sie den Textwert in faktore und wert ein");
                return false;
            }
        }
        if(result3CommaDigit){
             var result2 = result3CommaDigit.toFixed(4).replace(".", ",");
         }else{
             var result2 = '';
         }
        var basisFktr2WertRepRght = basisFktr2Wert.replace(",", ".");
        var basisFktr2WertCommaRght = basisFktr2Wert.replace(".", ",");
        var faktore3RepType5 = optionFaktore2.replace(",", ".");
        var basisFktr3WertRepType5 = basisFktr3Wert.replace(",", ".");
        var basisFktr2CalcRght =$(".subtypeTxtBasisFaktor2CalcRght").val();
        var basisFktr3CalcRght =$(".subtypeTxtBasisFaktor3CalcRght").val();

        if( calculationTypeDKff ==1){
             if(faktore3RepType5 !='' && basisFktr2WertRepRght !=''){
                if(isFloat(faktore3RepType5)==true && isFloat(basisFktr2WertRepRght)==true){
                    var resultCalcRght = eval(faktore3RepType5 + basisFktr2CalcRght + basisFktr2WertRepRght);
                }else{
                    alert("Bitte geben Sie den Textwert in faktore und wert ein");
                    return false;
                }
            var calcResult =resultCalcRght.toFixed(4).replace(".", ",");
            var calculationType =basisFktr2CalcRght;
            //alert('resultCalcRghtFinal1='+calcResult);
           }
        }else if( calculationTypeDKff ==2){
            if(faktoreRep !='' && basisFktr3WertRepType5 !='' && basisFktr3CalcRght !=''){
                if(isFloat(faktoreRep)==true && isFloat(basisFktr3WertRepType5)==true){
                    var resultCalcRght = eval(faktoreRep + basisFktr3CalcRght + basisFktr3WertRepType5);
                }else{
                    alert("Bitte geben Sie den Textwert in faktore und wert ein");
                    return false;
                }
            var calcResult =resultCalcRght.toFixed(4).replace(".", ",");
            var calculationType =basisFktr3CalcRght;
            //alert('resultCalcRghtFinal2='+resultCalcRght);
           }
        }else if(calculationTypeDKff ==3){
            if(basisFktr2WertRepRght !='' && basisFktr3WertRepType5 !='' && basisFktr2CalcRght !=''){
                if(isFloat(basisFktr2WertRepRght)==true && isFloat(basisFktr3WertRepType5)==true){
                    var resultCalcRght = eval(basisFktr2WertRepRght + basisFktr2CalcRght + basisFktr3WertRepType5);
                }else{
                    alert("Bitte geben Sie den Textwert in faktore und wert ein");
                    return false;
                }
            var calcResult =resultCalcRght.toFixed(4).replace(".", ",");
            var calculationType =basisFktr2CalcRght;
            //alert('resultCalcRghtFinal3='+resultCalcRght);
           }
        }
   // validateStartEndInputBezugFaktorTypeBasicBetween(faktorType);
        $.ajax({
            type: "POST",
            async: !0,
            url: "php/instanzIntoDb.php",
            data: {
                id: "ePrdDKFEDelUpdate",
                modus: "deleteUpdate",
                nameDB: $("#nameDB").val(),
                ePrdID: $("#ePrdID").val(),
                optionName: optionName,
                optionBezug:optionBezug,
                optionTemp:optionTemp,
                optionFaktore:faktore2Comma,
                ePrdDIdStore:ePrdDIdStore,
                parentOptName:parentOptName,
                parentBeschreibunDesc:parentBeschreibunDesc,
                ePrdDMainIdStore:ePrdDMainIdStore,
                basisFktr2Name:basisFktr2Name,
                basisFktr2Calc:basisFktr2Calc,
                basisFktr2Wert:basisFktrWertComma,
                result:result,
                ePrddKffOptionIDStore:ePrddKffOptionIDStore,
                faktoreDynamictypeVal:faktoreDynamictypeVal,
                faktorType:faktorType,
                bezugStartTxt:bezugStartTxt,
                bezugEndTxt:bezugEndTxt,
                tempStartTxt:tempStartTxt,
                tempEndTxt:tempEndTxt,
                calculationType:calculationType,
                calcResult:calcResult,
                calculateID:calculateID,
                messstellenBerecheID:messstellenBerecheID,
                ePrdDKFERow1ID:ePrdDKFERow1ID,
                ePrdDKFERow2ID:ePrdDKFERow2ID,
                updateOptType:updateOptType,
                basisFktr3Name:basisFktr3Name,
                basisFktr3Calc:basisFktr3Calc,
                basisFktr3Wert:basisFktrWert3Comma,
                optionName2:optionName2,
                optionBezug2:optionBezug2,
                optionTemp2 :optionTemp2,
                bezugStartTxt2:bezugStartTxt2,
                bezugEndTxt2:bezugEndTxt2,
                tempStartTxt2: tempStartTxt2,
                tempEndTxt2 :tempEndTxt2,
                optionFaktore2:optionFaktore2,
                faktoreDynamictypeVal2:faktoreDynamictypeVal2,
                messstellenBerecheID2:messstellenBerecheID2,
                result2:result2,
                calculationTypeDKff:calculationTypeDKff

            },
            success: function(a) {
                alert("Datensatz wurde erfolgreich aktualisiert!");
                $('#subtypeTxtOptNameDKff').val("");
                $('#subtypeTxtoptzBezugDkff').val("");
                $('#subtypeTxtoptzTempDkff').val("");
                $('#subtypeTxtoptzFaktoreDkff').val("");
                $('#ePrdDIdStore').val("");
                $("#btnOptionHinzEPrdDKffUpdate").hide();
                $("#btnOptionHinzEPrdDKffStornieren").hide();
                $("#btnOptionHinzEPrdDKff").show();
                $("#DkFeSpeichern").show();
                $("#DkFeHinz").show();
                $("#DkFeFirst").show();
                $("#DkFePrevious").show();
                $("#DkFeNext").show();
                $("#DkFeLast").show();
                $("#DkFeSuchen").show();

                var auswahlTypierungVal = $('.auswahlTypierungFaktorDKff').val();
                var typeDynamicCFVal = $(".typeDynamicCF").val();
                var subtypeTimeDynamicCFVal = $(".subtypeTimeDynamicCF").val();
                var calculationTypeDKff = $(".calculationTypeDKff").val();
                $("#basicFaktorRow1 input").val('');
                $("#basicFaktorRow1 select").val('');
                $("#basicFaktorRow3 input").val('');
                $("#basicFaktorRow3 select").val('');
                $("#basicFaktorRow2 input").val('');
                $("#basicFaktorRow2 select").val('');
                $("#basicFaktorRow4 input").val('');
                $("#basicFaktorRow4 select").val('');
                $('#ePrdDKFERow1ID').val('');
                $('#ePrdDKFERow2ID').val('');
                $('#updateOptType').val('');
                    if(typeDynamicCFVal !='' && subtypeTimeDynamicCFVal !=''){
                        visibleInvisibleColumnDataOnTypeSelection(typeDynamicCFVal,subtypeTimeDynamicCFVal,auswahlTypierungVal);
                        addValidateClassOnRightSelecOptRow2VisibilityBezugTemp(auswahlTypierungVal,typeDynamicCFVal,subtypeTimeDynamicCFVal);
                    }
                    getDynamischeKorrekturfaktoren(ePrdDMainIdStore);
                    if(calculationTypeDKff && auswahlTypierungVal == 5){
                        basicPlus2ConditionMultiplayCalculationType(calculationTypeDKff);
                    }
            }
    })
}

/*Ajax Call for the Manuel module serach 18-09-2020*/
function tblAnlOhneZeitintervallIMwSuchenMethod() {
        $("#tblAnlOhneZeitintervallIMwSearchContainer").css("display", "block");
        /*new-mm-start 22-03-2021*/
        $('#searchImgBtnShowRecordsAnlBtn').show();
        $('#searchImgBtnShowRecordsAnlBtn').val('1');
        /*new-mm-end 22-03-2021*/
        $("#tblAnlOhneZeitintervallIMwSearchContainer").dialog({
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

         $.ajax({
            type: "POST",
            async: !0,
            url: "php/getManuellInterneData.php",
            data: {
                id: "KeinZeitintervallTbl",
                nameDB: $("#nameDB").val(),
                typ: "energiedaten",
            },
            success: function(a) {
                a = JSON.parse(a);
                var b = a.length;//console.log(a);
                tblAnlOhneZeitintervallIMwSuchen.clear().draw();
                    for (var e = 0; e < b; e++){
                        /*new-mm-start 26-03-2021*/
                        tblAnlOhneZeitintervallIMwSuchen.row.add( [a[e].T1_mst_ID, a[e].nameMSt, a[e].anlageMst,convertDateFormateForDataTbl(a[e].intTp_ID,a[e].startDate), convertDateFormateForDataTbl(a[e].intTp_ID,a[e].endDate),a[e].unit,typeValueEinheitControlSys(a[e].einheitControlSys), capitalizeLetter(a[e].type), a[e].note]).draw();
                        /*new-mm-end 26-03-2021*/
                        //tblAnlOhneZeitintervallIMwSuchen.column([0,1]).visible(!1);
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


                        /*new-mm-start 09-04-2021 */
                        $('.zeitintervallAnl_1 input').datepicker( "option" , { minDate: null, maxDate: null} );
                        /*new-mm-end 09-04-2021*/

                        $("#tblAnlOhneZeitintervallIMwSearchContainer").dialog("close");
                });
            }
        });
}


 /*Ajax Call for the admin 22-02-2021*/
 function adminlisteErstellen() {
    var a = itemSessionGet("nameDB");
    //console.log(a);
    $.ajax({
        type: "POST",
        async: !0,
        url: "php/readInstanzen.php",
        data: {
            id: "admSuchen",
            nameDB: "gipscomm",
            manID: $(".manGrpPfad").val()
        },
        success: function(e) {
            console.log('Working fine');
            e = json(e);
            //console.log(e);

            tblAdminlisteErstellen.colReorder.reset();
            tblAdminlisteErstellen.clear().draw();
            for (var c = 0; c < e.length; c++) {
                //console.log(e[c].email);
                tblAdminlisteErstellen.row.add([
                    e[c].adm_ID,
                    e[c].titel,
                    e[c].name,
                    e[c].vorname,
                    e[c].username,
                    e[c].email,
                    e[c].telefon,
                    e[c].mobiltelefon
                ]).draw();
            }
            $("#admListeContainer").css("display", "block");
            $("#admListeContainer").dialog({
                height: $(window).height() - .125 * $(window).height(),
                width: $(window).width() - .125 * $(window).width(),
                resize: "auto",
                modal: true,
                show: {
                    effect: "fade",
                    duration: 500
                },
                hide: {
                    effect: "fade",
                    duration: 500
                },
                open: function() {
                    console.log('open popup');
                    $("#tblAdminlisteErstellen tbody tr").css("cursor", "pointer");
                    $("#tblAdminlisteErstellen tbody").on("dblclick", "tr", function() {
                        var a = tblAdminlisteErstellen.row(this).data();
                        $("#admListeContainer").dialog("close");
                        //readInstanzen("admFirst", a[0])
                        $.ajax({
                            type: "POST",
                            async: !0,
                            url: "php/readInstanzen.php",
                            data: {
                                id: "adm",
                                nameDB: "gipscomm",
                                admID: a[0]
                            },
                            fail: function() {
                                alert("failed!!")
                            },
                            success: function(a) {
                                var c = $.parseJSON(a);
                                $('#admID').val(c[0].adm_ID);
                                $('#titelAdm').val(c[0].titel);
                                $('#nameAdm').val(c[0].name);
                                $('#vornameAdm').val(c[0].vorname);
                                $('#emailAdm').val(c[0].email);
                                $('#telefonAdm').val(c[0].telefon);
                                $('#faxAdm').val(c[0].fax);
                                $('#mobiltelefonAdm').val(c[0].mobiltelefon);
                                $('#benutzernameAdm').val(c[0].username);
                                adminsGetRollenUndBerechtigungen();
                            }
                        });
                    })
                }
            })
        }
    })
}

function benutzerlisteErstellen() {
    var a = itemSessionGet("nameDB");
    //console.log(a);
    $.ajax({
        type: "POST",
        async: !0,
        url: "php/readInstanzen.php",
        data: {
            id: "benSuchen",
            nameDB: "gipscomm",
            manID: $(".manGrpPfad").val()
        },
        success: function(e) {
            console.log('Working fine');
            e = json(e);
            //console.log(e);

            tblBenutzerlisteErstellen.colReorder.reset();
            tblBenutzerlisteErstellen.clear().draw();
            for (var c = 0; c < e.length; c++) {
                //console.log(e[c].email);
                tblBenutzerlisteErstellen.row.add([
                    e[c].ben_ID,
                    e[c].titel,
                    e[c].name,
                    e[c].vorname,
                    e[c].username,
                    e[c].eMail,
                    e[c].telefon,
                    e[c].mobiltelefon
                ]).draw();
            }
            $("#benutzerListeContainer").css("display", "block");
            $("#benutzerListeContainer").dialog({
                height: $(window).height() - .125 * $(window).height(),
                width: $(window).width() - .125 * $(window).width(),
                resize: "auto",
                modal: true,
                show: {
                    effect: "fade",
                    duration: 500
                },
                hide: {
                    effect: "fade",
                    duration: 500
                },
                open: function() {
                    console.log('open popup');
                    $("#tblBenutzerlisteErstellen tbody tr").css("cursor", "pointer");
                    $("#tblBenutzerlisteErstellen tbody").on("dblclick", "tr", function() {
                        var a = tblBenutzerlisteErstellen.row(this).data();
                        $("#benutzerListeContainer").dialog("close");
                        //readInstanzen("benFirst", a[0])
                        $.ajax({
                            type: "POST",
                            async: !0,
                            url: "php/readInstanzen.php",
                            data: {
                                id: "ben",
                                nameDB: "gipscomm",
                                benID: a[0]
                            },
                            fail: function() {
                                alert("failed!!")
                            },
                            success: function(a) {
                                var c = $.parseJSON(a);
                                $('#benID').val(c[0].ben_ID);
                                $('#titelBen').val(c[0].titel);
                                $('#nameBen').val(c[0].name);
                                $('#vornameBen').val(c[0].vorname);
                                $('#emailBen').val(c[0].eMail);
                                $('#telefonBen').val(c[0].telefon);
                                $('#faxBen').val(c[0].fax);
                                $('#mobiltelefonBen').val(c[0].mobiltelefon);
                                $('#benutzernameBen').val(c[0].username);
                                benutzerGetRollenUndBerechtigungen();
                            }
                        });
                    })
                }
            })
        }
    })
}

function betrGrplisteErstellen() {
    var a = itemSessionGet("nameDB");
    //console.log(a);
    $.ajax({
        type: "POST",
        async: !0,
        url: "php/readInstanzen.php",
        data: {
            id: "betrGrp",
            nameDB: "gipscomm"
        },
        success: function(e) {
            console.log('Working fine');
            e = json(e);
            //console.log(e);

            tblBetrGrplisteErstellen.colReorder.reset();
            tblBetrGrplisteErstellen.clear().draw();
            for (var c = 0; c < e.length; c++) {
                //console.log(e[c].email);
                tblBetrGrplisteErstellen.row.add([
                    c,
                    e[c].firma,
                    e[c].anzahlMitarbeiter,
                    e[c].anschrift,
                    e[c].plz+' '+e[c].ort,
                    e[c].geschaeftsfuehrer,
                    e[c].telefon,
                    e[c].eMail,
                    e[c].notiz,
                ]).draw();
            }
            $("#betrGrpListeContainer").css("display", "block");
            $("#betrGrpListeContainer").dialog({
                height: $(window).height() - .125 * $(window).height(),
                width: $(window).width() - .125 * $(window).width(),
                resize: "auto",
                modal: true,
                show: {
                    effect: "fade",
                    duration: 500
                },
                hide: {
                    effect: "fade",
                    duration: 500
                },
                open: function() {
                    console.log('open popup');
                    $("#tblBetrGrplisteErstellen tbody tr").css("cursor", "pointer");
                    $("#tblBetrGrplisteErstellen tbody").on("dblclick", "tr", function() {
                        var a = tblBetrGrplisteErstellen.row(this).data();
                        $("#betrGrpListeContainer").dialog("close");
                        readInstanzen("betrGrpFirst", a[0])
                    })
                }
            })
        }
    })
}

function sAdmSuchenlisteErstellen() {
    var a = itemSessionGet("nameDB");
    //console.log(a);
    $.ajax({
        type: "POST",
        async: !0,
        url: "php/readInstanzen.php",
        data: {
            id: "sAdm",
            nameDB: "gipscomm",
            betrGrpID: $('#betrGrpID').val()
        },
        success: function(e) {
            console.log('Working fine');
            e = json(e);
            //console.log(e);

            tblsAdmSuchenlisteErstellen.colReorder.reset();
            tblsAdmSuchenlisteErstellen.clear().draw();
            for (var c = 0; c < e.length; c++) {
                //console.log(e[c].email);
                tblsAdmSuchenlisteErstellen.row.add([
                    c,
                    e[c].titelSAdm,
                    e[c].nameSAdm,
                    e[c].emailSAdm,
                    e[c].telefonSAdm,
                    e[c].faxSAdm,
                    e[c].mobiltelefonSAdm,
                    e[c].username,
                    e[c].username,
                ]).draw();
            }
            $("#sAdmSuchenListeContainer").css("display", "block");
            $("#sAdmSuchenListeContainer").dialog({
                height: $(window).height() - .125 * $(window).height(),
                width: $(window).width() - .125 * $(window).width(),
                resize: "auto",
                modal: true,
                show: {
                    effect: "fade",
                    duration: 500
                },
                hide: {
                    effect: "fade",
                    duration: 500
                },
                open: function() {
                    console.log('open popup');
                    $("#tblsAdmSuchenlisteErstellen tbody tr").css("cursor", "pointer");
                    $("#tblsAdmSuchenlisteErstellen tbody").on("dblclick", "tr", function() {
                        var a = tblsAdmSuchenlisteErstellen.row(this).data();
                        $("#sAdmSuchenListeContainer").dialog("close");
                        readInstanzen("sAdmFirst", a[0])
                    })
                }
            })
        }
    })
}

function gipscAdmSuchenlisteErstellen() {
    var a = itemSessionGet("nameDB");
    //console.log(a);
    $.ajax({
        type: "POST",
        async: !0,
        url: "php/readInstanzen.php",
        data: {
            id: "gipscAdm",
            nameDB: "gipscomm"
        },
        success: function(e) {
            console.log('Working fine');
            e = json(e);
            //console.log(e);

            tblGipscAdmSuchenlisteErstellen.colReorder.reset();
            tblGipscAdmSuchenlisteErstellen.clear().draw();
            for (var c = 0; c < e.length; c++) {
                //console.log(e[c].email);
                tblGipscAdmSuchenlisteErstellen.row.add([
                    e[c].username,
                ]).draw();
            }
            $("#gipscAdmSuchenListeContainer").css("display", "block");
            $("#gipscAdmSuchenListeContainer").dialog({
                height: $(window).height() - .125 * $(window).height(),
                width: $(window).width() - .125 * $(window).width(),
                resize: "auto",
                modal: true,
                show: {
                    effect: "fade",
                    duration: 500
                },
                hide: {
                    effect: "fade",
                    duration: 500
                },
                open: function() {
                    console.log('open popup');
                }
            })
        }
    })
}

function manGrpSuchenlisteErstellen() {
    var a = itemSessionGet("nameDB");
    //console.log(a);
    $.ajax({
        type: "POST",
        async: !0,
        url: "php/readInstanzen.php",
        data: {
            id: "manGrp",
            nameDB: "gipscomm",
            betrGrpID: $('#betrGrpID').val()
        },
        success: function(e) {
            console.log('Working fine');
            e = json(e);
            //console.log(e);

            tblManGrpSuchenlisteErstellen.colReorder.reset();
            tblManGrpSuchenlisteErstellen.clear().draw();
            for (var c = 0; c < e.length; c++) {
                //console.log(e[c].email);
                tblManGrpSuchenlisteErstellen.row.add([
                    c,
                    e[c].name,
                    e[c].kurz,
                    e[c].mandantenIDs,
                ]).draw();
            }
            $("#manGrpSuchenListeContainer").css("display", "block");
            $("#manGrpSuchenListeContainer").dialog({
                height: $(window).height() - .125 * $(window).height(),
                width: $(window).width() - .125 * $(window).width(),
                resize: "auto",
                modal: true,
                show: {
                    effect: "fade",
                    duration: 500
                },
                hide: {
                    effect: "fade",
                    duration: 500
                },
                open: function() {
                    console.log('open popup');
                    $("#tblManGrpSuchenlisteErstellen tbody tr").css("cursor", "pointer");
                    $("#tblManGrpSuchenlisteErstellen tbody").on("dblclick", "tr", function() {
                        var a = tblManGrpSuchenlisteErstellen.row(this).data();
                        $("#manGrpSuchenListeContainer").dialog("close");
                        readInstanzen("manGrpFirst", a[0])
                        clearFields("manGrpHinz");
                        tblMandantengruppe.clear().draw()
                    })
                }
            })
        }
    })
}

/** Benutzer Delete Functionality */

function benLoeschen() {
    if (confirm("Benutzer löschen?")) {
        $.ajax({
            type: "POST",
            async: !0,
            url: "php/instanzintoDb.php",
            data: {
                id: 'ben',
                modus: "delete",
                nameDB: 'gipscomm',
                benID: $("#benID").val()
            },
            success: function(a) {
                clearFields("benHinz");
            }
        });
    }
    return false;
}

function admLoeschen() {
    if (confirm("Admins löschen?")) {
        $.ajax({
            type: "POST",
            async: !0,
            url: "php/instanzintoDb.php",
            data: {
                id: 'adm',
                modus: "delete",
                nameDB: 'gipscomm',
                admID: $("#admID").val()
            },
            success: function(a) {
                clearFields("admHinz");
            }
        });
    }
    return false;
}

function betrGrpLoeschen() {
    if (confirm("Betreuergruppen/Superadmins löschen?")) {
        $.ajax({
            type: "POST",
            async: !0,
            url: "php/instanzintoDb.php",
            data: {
                id: 'betrGrp',
                modus: "delete",
                nameDB: 'gipscomm',
                betrGrpID: $("#betrGrpID").val()
            },
            success: function(a) {
                clearFields("betrGrpHinz");
                clearFields("sAdmHinz");
                betrGrpEinlesen();
                mandantenAuswahllisteErstellenCheckbox('', '');
            }
        });
    }
    return false;
}

function sAdmLoeschen() {
    if (confirm("Superadmins löschen?")) {
        $.ajax({
            type: "POST",
            async: !0,
            url: "php/instanzintoDb.php",
            data: {
                id: 'sAdm',
                modus: "delete",
                nameDB: 'gipscomm',
                sAdmID: $("#sAdmID").val()
            },
            success: function(a) {
                clearFields("sAdmHinz");
            }
        });
    }
    return false;
}

function manGrpLoeschen() {
    if (confirm("MandantenGruppen löschen?")) {
        $.ajax({
            type: "POST",
            async: !0,
            url: "php/instanzintoDb.php",
            data: {
                id: 'manGrp',
                modus: "delete",
                nameDB: 'gipscomm',
                manGrpID: $("#manGrpID").val()
            },
            success: function(a) {
                clearFields("manGrpHinz");
            }
        });
    }
    return false;
}


// Roles and Permission Ids According to Users.

/*
    1 - Gipscomm Admin
    2 - SuperAdmin
    3 - Mandantengruppen
    4 - Admins
    5 - Benutzer
*/

function gipscommRollenUndBerechtigungen() {            // Save Gipscomm Admin Roles and Permission
    var gipsArr = new Array();
    // $('input[name="gipsAdmRolesPermission[]"]:checked').each(function() {
    //     gipsArr.push(this.value);
    // });
    $('span.item').each(function(){
        var $span = $(this).attr('check-value');
        if($span == 1) {
            var spanTxt = $(this).attr('data-tab_id');
            gipsArr.push(spanTxt);
        }
    });
    $.ajax({
        type: "POST",
        async: !0,
        url: "php/instanzIntoDb.php",
        data: {
            id: "gipscAdm",
            nameDB: "gipscomm",
            modus: "saveRolePermission",
            role_id: 1,
            tab_id: gipsArr,
            userId: $('#gipscAdmID').val()
        },
        success: function(a) {
            alert(a)
        }
    });
}

function sAdmRollenUndBerechtigungen() {            // Save Superadmin Roles and Permission
    var sAdmArr = new Array();
    $('span.item').each(function(){
        var $span = $(this).attr('check-value');
        if($span == 1) {
            var spanTxt = $(this).attr('data-tab_id');
            if(spanTxt != undefined) {
                sAdmArr.push(spanTxt);
            }
        }
    });
    $.ajax({
        type: "POST",
        async: !0,
        url: "php/instanzIntoDb.php",
        data: {
            id: "sAdm",
            nameDB: "gipscomm",
            modus: "saveRolePermission",
            role_id: 2,
            tab_id: sAdmArr,
            userId: $('#sAdmID').val()
        },
        success: function(a) {
            //alert(a)
        }
    });
}

function adminsRollenUndBerechtigungen() {            // Save Admin Roles and Permission
    var adminArr = new Array();
    $('span.item').each(function(){
        var $span = $(this).attr('check-value');
        if($span == 1) {
            var spanTxt = $(this).attr('data-tab_id');
            if(spanTxt != undefined) {
                adminArr.push(spanTxt);
            }
        }
    });
    $.ajax({
        type: "POST",
        async: !0,
        url: "php/instanzIntoDb.php",
        data: {
            id: "adm",
            nameDB: "gipscomm",
            modus: "saveRolePermission",
            role_id: 4,
            tab_id: adminArr,
            userId: $('#admID').val()
        },
        success: function(a) {
            //alert(a)
        }
    });
}
function benutzerRollenUndBerechtigungen() {        // Save Benutzer Roles and Permission
    var benArr = new Array();
    $('span.item').each(function(){
        var $span = $(this).attr('check-value');
        if($span == 1) {
            var spanTxt = $(this).attr('data-tab_id');
            if(spanTxt != undefined) {
                benArr.push(spanTxt);
            }
        }
    });
    $.ajax({
        type: "POST",
        async: !0,
        url: "php/instanzIntoDb.php",
        data: {
            id: "ben",
            nameDB: "gipscomm",
            modus: "saveRolePermission",
            role_id: 5,
            tab_id: benArr,
            userId: $('#benID').val()
        },
        success: function(a) {
            //alert(a)
        }
    });
}

function gipscommGetRollenUndBerechtigungen() {     // Gipscomm Admin selected checkbox from database
    $.ajax({
        type: "POST",
        async: !0,
        url: "php/readInstanzen.php",
        data: {
            id: "sAdmGetRolePermission",
            nameDB: "gipscomm",
            role_id: 1,
            userId: $('#gipscAdmID').val()
        },
        success: function(a) {
            c = JSON.parse(a)
            console.log(c);
            var gipsArr = new Array();
            if(c.length != 0) {
                $.each(c, function(i, item){
                    $('span.item').each(function(){
                        var spanTxt = $(this).attr('data-tab_id');
                        if(spanTxt == item.tab_id) {
                            gipsArr.push(spanTxt);
                        }
                    });
                });
            } else {
                //$('div#gipscommRollenUndBerechtigungenSuperadmin').html(localStorage.getItem('gipsAdm'));
            }
        }
    });
}

function sAdmGetRollenUndBerechtigungen() {     // Superadmin selected checkbox from database
    //alert(userId);
    $.ajax({
        type: "POST",
        async: !0,
        url: "php/readInstanzen.php",
        data: {
            id: "rollenUndBerechtigungenSuperadmin",
            nameDB: "gipscomm",
            role_id: 2,
            userId: $('#sAdmID').val()
        },
        success: function(a) {
            c = JSON.parse(a)
            if(c.length != 0) {
                //console.log(c);
                $( "div#superadmincommTreeview" ).empty();
                var treeObject = JSON.parse(a);
                var tw = new TreeView(
                    treeObject,
                    {showAlwaysCheckBox:true,fold:false});
                document.getElementById("superadmincommTreeview").appendChild( tw.root	 )
            }
        }
    });
}

function adminsGetRollenUndBerechtigungen() {       // Admin selected checkbox from database
    $.ajax({
        type: "POST",
        async: !0,
        url: "php/readInstanzen.php",
        data: {
            id: "rollenUndBerechtigungenSuperadmin",
            nameDB: "gipscomm",
            role_id: 4,
            userId:$('#admID').val()
        },
        success: function(a) {
            c = JSON.parse(a);
            console.log(c);
            if(c.length != 0) {
                $( "div#admincommTreeview" ).empty();
                var treeObject = JSON.parse(a);
                var tw = new TreeView(
                    treeObject,
                    {showAlwaysCheckBox:true,fold:false});
                document.getElementById("admincommTreeview").appendChild( tw.root	 )
            }
        }
    });
}

function benutzerGetRollenUndBerechtigungen() {       // Admin selected checkbox from database
    $.ajax({
        type: "POST",
        async: !0,
        url: "php/readInstanzen.php",
        data: {
            id: "rollenUndBerechtigungenSuperadmin",
            nameDB: "gipscomm",
            role_id: 5,
            userId: $('#benID').val()
        },
        success: function(a) {
            c = JSON.parse(a)
            console.log(c);
            if(c.length != 0) {
                $( "div#benutzerTreeview" ).empty();
                var treeObject = JSON.parse(a);
                var tw = new TreeView(
                    treeObject,
                    {showAlwaysCheckBox:true,fold:false});
                document.getElementById("benutzerTreeview").appendChild( tw.root	 )
            }
        }
    });
}

function alleNutzerRollenUndBerechtigungen(userName, tableName, roleId, userId) {
    $.ajax({
        type: "POST",
        async: !0,
        url: "php/readInstanzen.php",
        data: {
            id: "alleNutzerGetRolePermission",
            nameDB: "gipscomm",
            role_id: roleId,
            userId: userId,
            tableName: tableName,
            userName: userName
        },
        success: function(a) {
            c = JSON.parse(a)
            if(c.length != 0) {
                $.each(c, function(i, item) {
                    if(roleId != 1) {
                        if(item.tab_id != '') {
                            if(item.user_id == null){
                                $("#"+item.tab_id).css("display", "none");
                                // var res = id.split(",");
                                // if(res.length > 1) {
                                //     for (i=0;i<res.length;i++){
                                //         $("#"+res[i]).css("display", "none");
                                //     }
                                // }
                            } else {
                                $("#"+item.tab_id).css("display", "block");
                            }
                        }
                    }
                });
            }
        }
    });
}

function mandantenSuperadminCheckedCheckbox() {
    $.ajax({
        type: "POST",
        async: !0,
        url: "php/readInstanzen.php",
        data: {
            id: "manBetrGrp",
            nameDB: "gipscomm",
            betrGrpID:  $("#betrGrpID").val(),
        },
        success: function(a) {
            c = JSON.parse(a)
            if(c.length != 0) {
                betrGrpId = $("#betrGrpID").val();
                mandantenIds = c[0].mandantenIDs;
                mandantenAuswahllisteErstellenCheckbox(betrGrpId, mandantenIds)
            } else {
                betrGrpId = $("#betrGrpID").val();
                mandantenIds = '';
                mandantenAuswahllisteErstellenCheckbox(betrGrpId, mandantenIds)
            }

        }
    });
}

function mandantenSelectDBs(handleData) {
    $.ajax({
        type: "POST",
        async: !0,
        url: "php/readInstanzen.php",
        data: {
            id: "manDBs",
            nameDB: "gipscomm",
            betrGrpID:  $("#betrGrpID").val(),
            defaultGrpID: 1
        },
        success: function(a) {
            c = JSON.parse(a)
            handleData(c);
            if(c.length != 0) {
            }

        }
    });
}

function mandantenAuswahllisteErstellenCheckbox(betrGrpId, mandantenIds) {
    $.ajax({
        type: "POST",
        async: !0,
        url: "php/getMandanten.php",
        data: {
            id: "manSuper",
            betrGrpID: betrGrpId,
            nameDB: "gipscomm",
        },
        success: function(a) {
            a = JSON.parse(a);
            var mandanteCheckboxData = [];
            var newArray = [];
            $("#mandanteTreeView").empty();
            var res1 = mandantenIds.split(",");
            if(a.length != 0) {
                $.each(a, function(i, item){
                            var checked = false;

                            for(var i=0; i<res1.length; i++){
                                var id = res1[i];
                                if(id == item.man_ID){
                                  checked = true;
                                  break;
                                }
                              }
                        newArray.push({
                                "text" : item.nameMan,
                                "id" : item.man_ID,
                                "checked" : checked
                                });
                });
                var treeObject = newArray;//JSON.parse(newArray);
                var tw = new TreeView(
                    treeObject,
                    {showAlwaysCheckBox:true,fold:false});
                document.getElementById("mandanteTreeView").appendChild( tw.root	 )
            }
        }
    })
}
