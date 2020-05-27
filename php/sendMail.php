<?php
include('top-cache.php');
require 'EMail.php';

//Set Vars
$betreff = "G-Analysis Demo-Account Anfrage";

//Get Vars From Ajax-call
$anrede = $_POST['anrede'];
$vorname = $_POST['vorname'];
$nachname = $_POST['nachname'];
$firma = $_POST['firma'];
$empfaenger = $_POST['empfaenger'];
$mitteilung = $_POST['mitteilung'];
$anhangPfad = $_POST['anhangPfad'];

$extMitteilungHeader = "<h2>Sehr geehrte/r ".$anrede." ".$nachname.",</h2>";
$extMitteilungHeader.= "<p>dies ist eine Kopie ihrer Anfrage für einen Demozugang zur ";
$extMitteilungHeader.= "G-Analysis Energiedatenmanagement Weboberfläche.</p>";
$extMitteilungHeader.= "<h3>Ihre Personen- bzw Firmenspezifischen Daten:</h3>";

$mainMitteilung = "<strong>Anrede:</strong> ".$anrede."<br>";
$mainMitteilung.= "<strong>Vorname:</strong> ".$vorname."<br>";
$mainMitteilung.= "<strong>Nachname:</strong> ".$nachname."<br>";
$mainMitteilung.= "<strong>Firma:</strong> ".$firma."<br>";
$mainMitteilung.= "<strong>Email:</strong> ".$empfaenger."<br>";
$mainMitteilung.= "<strong>Mitteilung:</strong><br>".$mitteilung."<br><br>";

$extMitteilungFooter = "<p><strong>Innerhalb von 48h werden wir Ihnen einen Demozugang zur Verfügung stellen. ";
$extMitteilungFooter .= "Diesen werden Sie dann für 24h nutzen können.</strong> ";
$extMitteilungFooter .= "Wir behalten uns vor, weitere Informationen einzuholen bevor wir Ihnen die ";
$extMitteilungFooter .= "Logindaten zukommen lassen. Dieser Zugang wird Ihnen einen ersten Einblick ";
$extMitteilungFooter .= "vermitteln.</p><br><br>";
//$extMitteilungFooter .= "Im Anhang finden Sie schon einmal eine Präsentation über die G-Analysis ";
//$extMitteilungFooter .= "Plattform. <br>";

$emailText = $extMitteilungHeader;
$emailText .= $mainMitteilung;
$emailText .= $extMitteilungFooter;

$emailResponse = eMail($empfaenger, $anhangPfad, $betreff, $emailText);

eMail("info@energie-gipscomm.de,sdm@energie-gipscomm.de", false, $betreff, $mainMitteilung);

echo "E-Mail wurde versandt";
include('bottom-cache.php');
?>
