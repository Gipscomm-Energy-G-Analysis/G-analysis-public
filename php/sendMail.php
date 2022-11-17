<?php

// error_reporting(-1) ;
// ini_set ('display_errors', 'On') ;

require "EMail_PHPMailer.php" ;

$betreff = "G-Analysis Demo-Account Anfrage" ;

$anrede     = $_POST["anrede"] ;
$vorname    = $_POST["vorname"] ;
$nachname   = $_POST["nachname"] ;
$firma      = $_POST["firma"] ;
$empfaenger = $_POST["empfaenger"] ;
$mitteilung = $_POST["mitteilung"] ;

$extMitteilungHeader  = "<h2>Sehr geehrte/r ".$anrede." ".$nachname.",</h2>" ;
$extMitteilungHeader .= "<p>dies ist eine Kopie ihrer Anfrage für einen Demozugang zur " ;
$extMitteilungHeader .= "G-Analysis Energiedatenmanagement Weboberfläche.</p>" ;
$extMitteilungHeader .= "<h3>Ihre Personen- bzw Firmenspezifischen Daten:</h3>" ;

$mainMitteilung  = "<strong>Anrede:</strong> ".$anrede."<br>" ;
$mainMitteilung .= "<strong>Vorname:</strong> ".$vorname."<br>" ;
$mainMitteilung .= "<strong>Nachname:</strong> ".$nachname."<br>" ;
$mainMitteilung .= "<strong>Firma:</strong> ".$firma."<br>" ;
$mainMitteilung .= "<strong>Email:</strong> ".$empfaenger."<br>" ;
$mainMitteilung .= "<strong>Mitteilung:</strong><br>".$mitteilung."<br><br>" ;

$extMitteilungFooter  = "<p><strong>Innerhalb von 48h werden wir Ihnen einen Demozugang zur Verfügung stellen. " ;
$extMitteilungFooter .= "Diesen werden Sie dann für 24h nutzen können.</strong> " ;
$extMitteilungFooter .= "Wir behalten uns vor, weitere Informationen einzuholen bevor wir Ihnen die " ;
$extMitteilungFooter .= "Logindaten zukommen lassen. Dieser Zugang wird Ihnen einen ersten Einblick " ;
$extMitteilungFooter .= "vermitteln.</p><br><br>" ;

$emailText  = $extMitteilungHeader ;
$emailText .= $mainMitteilung ;
$emailText .= $extMitteilungFooter ;

$adresses =
    [ "info@energie-gipscomm.de"
    , "chn@energie-gipscomm.de"
    , "sdm@energie-gipscomm.de"
    ] ;

// Has the E-Mail been send successfully ?    
function sendMail($address) {

    global $empfaenger ;
    global $mainMitteilung ;
    global $emailText ;
    global $betreff ;

    $bodyCustomer =
        $address === $empfaenger ? 
        $emailText : 
        $mainMitteilung ;

    return eMail($address, $betreff, $bodyCustomer) ;
}

// Echo an array of the E-Mails where the process of 
// sending failed.
echo(json_encode(array_filter($adresses, 'sendMail'))) ;

?>
