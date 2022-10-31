<?php
error_reporting(-1);
ini_set ('display_errors', 'On');

require 'DbOperations.php';

$nameDB = $_POST['nameDB'];
$conn = connectToDB($nameDB);


$verwaltung = $_POST['verw'];

$kategorie = $_POST['kategorie'];

$name = $_POST['name'];

$typ = $_POST['typ'];

$groesse = $_POST['groesse'];

$inhalt = $_POST['inhalt'];



if($verwaltung == "anl"){

	$anlID = $_POST['anlID'];

	$query = "INSERT INTO dokumente(anl_ID,kategorieDok,nameDok,typDok,groesseDok,inhalt)";

	$query .= "VALUES('$anlID','$kategorie','$name','$typ','$groesse','$inhalt')";
}

if($verwaltung == "msm"){

	$msmID = $_POST['msmID'];

	$query = "INSERT INTO dokumente(msm_ID,kategorieDok,nameDok,typDok,groesseDok,inhalt)";

	$query .= "VALUES('$msmID','$kategorie','$name','$typ','$groesse','$inhalt')";
}

if($verwaltung == "eRng"){

	$eRngID = $_POST['eRngID'];

	$messstelle = $_POST['messstelle'];

	$query = "INSERT INTO dokumente(eRng_ID,nameMst,kategorieDok,nameDok,typDok,groesseDok,inhalt)";

	$query .= "VALUES('$eRngID','$messstelle','$kategorie','$name','$typ','$groesse','$inhalt')";
}

$records = queryDB($conn, $query, "write");

echo $query;
