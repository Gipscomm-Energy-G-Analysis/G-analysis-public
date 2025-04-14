//print the table content
function nWin() {
    var w = window.open();
    var html = $("#tblMandantenAuswahl_1").html();
    w.document.title = 'G-Analysis';
    $(w.document.body).html(html);
    w.print();
}
$(function() {
    $("#print").click(nWin);
});
//end print the table content

//table csv export code start
function exportTableToCSV(filename) {
    var csv = [];
    var rows = document.querySelectorAll("#tblMandantenAuswahl_1 tr");
    for (var i = 0; i < rows.length; i++) {
        var row = [],
            cols = rows[i].querySelectorAll("td, th");
        for (var j = 0; j < cols.length; j++)
            row.push(cols[j].innerText);
        csv.push(row.join(","));
    }
    // Download CSV file
    downloadCSV(csv.join("\n"), filename);
}

function downloadCSV(csv, filename) {
    var csvFile;
    var downloadLink;
    // CSV file
    csvFile = new Blob([csv], {
        type: "text/csv"
    });
    // Download link
    downloadLink = document.createElement("a");
    // File name
    downloadLink.download = filename;
    // Create a link to the file
    downloadLink.href = window.URL.createObjectURL(csvFile);
    // Hide download link
    downloadLink.style.display = "none";
    // Add the link to DOM
    document.body.appendChild(downloadLink);
    // Click download link
    downloadLink.click();
}
//table csv export table code end
//start CopyToClipboard code
$("#copy").click(function(event) {
    event.preventDefault();
    CopyToClipboard($("#tblMandantenAuswahl_1").text(), true, "Copy To Clipboard");
});

function CopyToClipboard(value, showNotification, notificationText) {
    var $temp = $("<input>");
    $("body").append($temp);
    $temp.val(value).select();
    document.execCommand("copy");
    $temp.remove();
    if (typeof showNotification === 'undefined') {
        showNotification = true;
    }
    if (typeof notificationText === 'undefined') {
        notificationText = "Copied to clipboard";
    }
    var notificationTag = $("div.copy-notification");
    if (showNotification && notificationTag.length == 0) {
        notificationTag = $("<div/>", {
            "class": "copy-notification",
            text: notificationText
        });
        $("body").append(notificationTag);
        notificationTag.fadeIn("slow", function() {
            setTimeout(function() {
                notificationTag.fadeOut("slow", function() {
                    notificationTag.remove();
                });
            }, 1000);
        });
    }
}
//end CopyToClipboard code