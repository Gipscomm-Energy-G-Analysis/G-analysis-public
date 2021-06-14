<?php
error_reporting ( -1 ) ;
ini_set ( 'display_errors', 'On' ) ;

require '../DbOperations.php' ;

$conn = connectToDB($_POST['nameDB']) ;

$modus = $_POST['modus'];
$archived = $_POST['archived'];
$liegID = $_POST['liegID'];

$modellBezSchtDat = $_POST["modellBezSchtDat"] ;
$anzahlSchtDat = $_POST["anzahlSchtDat"] ;
$gueltigVonSchtDat = $_POST["gueltigVonSchtDat"] ;
$gueltigBisSchtDat = $_POST["gueltigBisSchtDat"] ;
$notizSchtDat = $_POST["notizSchtDat"] ;
$schichten = $_POST["schichten"] ;

function valueString($last, $record) {
    return $last.
    "(".schtMdlID.", "
    .$record[0].", '"
    .$record[1]."', '"
    .$record[2]."', '"
    .$record[3]."', '"
    .$record[4]."', '"
    .$record[5]."')," ;
}

function buildValuesString($records) {
    return substr(array_reduce($records, 'valueString'), 0, -1) ;
}

if($modus === "new") {

    if ($archived === "true") {
        $insertSchichtmodellHist =  "INSERT INTO schichtModelleHist(lieg_ID,modellBez,anzahl,gueltigVon,gueltigBis, notiz) " ;
        $insertSchichtmodellHist .= "VALUES ('$liegID','$modellBezSchtDat', $anzahlSchtDat,'$gueltigVonSchtDat','$gueltigBisSchtDat', '$notizSchtDat') ";

        queryDB($conn, $insertSchichtmodellHist, "write") ;

        $selectLastID = "SELECT IDENT_CURRENT('schichtModelleHist') AS last_ID " ;

        define("schtMdlID", queryDB($conn, $selectLastID, "read")[0]["last_ID"]) ;

        $schichtenHist  =  "INSERT INTO schichtenHist(schtMdl_ID, nr, bezeichnung, uhrzeitVon, uhrzeitBis, tagVon, tagBis) " ;
        $schichtenHist .= "VALUES ".buildValuesString($schichten) ;

        queryDB($conn, $schichtenHist, "write") ;

        echo json_encode(["query" => $insertSchichtmodellHist." ".$schichtenHist]) ;
    }
    else {
        $insertSchichtmodell =  "INSERT INTO schichtModelle(lieg_ID,modellBez,anzahl,gueltigVon, notiz) " ;
        $insertSchichtmodell .= "VALUES ('$liegID','$modellBezSchtDat', $anzahlSchtDat,'$gueltigVonSchtDat', '$notizSchtDat') ";

        queryDB($conn, $insertSchichtmodell, "write") ;

        $tsqlSelectLastID = "SELECT IDENT_CURRENT('schichtModelle') AS last_ID " ;

        define("schtMdlID", queryDB($conn, $tsqlSelectLastID, "read")[0]["last_ID"]) ;

        $schichten_ =  "INSERT INTO schichten(schtMdl_ID, nr, bezeichnung, uhrzeitVon, uhrzeitBis, tagVon, tagBis) " ;
        $schichten_ .= "VALUES ".buildValuesString($schichten) ;

        queryDB($conn, $schichten_, "write") ;

        echo json_encode(["query" => $insertSchichtmodell." ".$schichten_]) ;
    }
}
else {

    if ($archived === "true") {
        define("schtMdlID_", $_POST['schtMdlID']) ;

        $insertSchichtmodellHist =  "INSERT INTO schichtModelleHist(lieg_ID,modellBez,anzahl,gueltigVon,gueltigBis, notiz) " ;
        $insertSchichtmodellHist .= "VALUES ('$liegID','$modellBezSchtDat', $anzahlSchtDat,'$gueltigVonSchtDat','$gueltigBisSchtDat', '$notizSchtDat') ";

        queryDB($conn, $insertSchichtmodellHist, "write") ;

        $selectLastID = "SELECT IDENT_CURRENT('schichtModelleHist') AS last_ID " ;

        define("schtMdlID", queryDB($conn, $selectLastID, "read")[0]["last_ID"]) ;

        $schichtenHist  =  "INSERT INTO schichtenHist(schtMdl_ID, nr, bezeichnung, uhrzeitVon, uhrzeitBis, tagVon, tagBis) " ;
        $schichtenHist .= "VALUES ".buildValuesString($schichten) ;

        $deleteSchichten  = "DELETE FROM schichten " ;
        $deleteSchichten .= "WHERE schtMdl_ID = ".schtMdlID_." " ;

        $deleteSchichtmodell  = "DELETE FROM schichtModelle " ;
        $deleteSchichtmodell .= "WHERE schtMdl_ID = ".schtMdlID_." " ;

        $joinedQueries =
            $schichtenHist." "
            .$deleteSchichten." "
            .$deleteSchichtmodell." " ;

        queryDB($conn, $joinedQueries, "write") ;

        echo json_encode(["query" => $joinedQueries]) ;
    }
    else {
        define("schtMdlID", $_POST['schtMdlID']) ;

        $updateSchichtmodell = "UPDATE schichtModelle SET datum = getdate(), modellBez = '$modellBezSchtDat', anzahl = $anzahlSchtDat, " ;
        $updateSchichtmodell .= "gueltigVon = '$gueltigVonSchtDat', " ;
        $updateSchichtmodell .= "notiz = '$notizSchtDat' " ;
        $updateSchichtmodell .= "WHERE schtMdl_ID = ".schtMdlID." " ;

        $updateSchichten =  "UPDATE schicht " ;
        $updateSchichten .= "SET bezeichnung = val.bezeichnung " ;
        $updateSchichten .= ", uhrzeitVon = val.uhrzeitVon " ;
        $updateSchichten .= ", uhrzeitBis = val.uhrzeitBis " ;
        $updateSchichten .= ", tagVon = val.tagVon " ;
        $updateSchichten .= ", tagBis = val.tagBis " ;
        $updateSchichten .= "FROM schichten AS schicht " ;
        $updateSchichten .= "JOIN( " ;
        $updateSchichten .= "  VALUES ".buildValuesString($schichten) ;
        $updateSchichten .= ") AS val (schtMdl_ID, nr, bezeichnung, uhrzeitVon, uhrzeitBis, tagVon, tagBis) " ;
        $updateSchichten .= "ON val.schtMdl_ID = schicht.schtMdl_ID AND val.nr = schicht.nr " ;

        $joinedQueries =
            $updateSchichtmodell." "
            .$updateSchichten." " ;

        queryDB($conn, $joinedQueries, "write") ;

        echo json_encode(["query" => $joinedQueries]) ;
    }
}
?>
