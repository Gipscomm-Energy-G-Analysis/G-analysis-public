const getFormulas = () => {
    console.log('trigger getFromulas');
    $.ajax({
        type: "POST",
        url: "../../php/readKennzahlen.php",
        data: {
            ins: "knzIns",
            nameDB: 'g002_badber',
            orgID: 1
        },
        success: function(b) {
            console.log('read++b', b);
            b = JSON.parse(b);
            console.log('readsds', b);
        }
    })
}
getFormulas();

const getFormulaString = () => {
    $.ajax({
        type: "POST",
        url: "../../php/readKennzahlen.php",
        data: {
            ins: "knzIns",
            nameDB: 'g002_badber',
            orgID: 1
        },
        success: function(b) {
            console.log('sfssfsfs++b', b);
            b = JSON.parse(b);
            console.log('reafffd', b);
        }
    })
}

getFormulaString()


