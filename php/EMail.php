<?php
include('top-cache.php');
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

error_reporting (-1);
ini_set ('display_errors', 'On');

function eMail($empfaenger, $anhangPfad, $betreff, $emailText)
{
$mail = new PHPMailer(true);
try{

  $mail->SMTPDebug = 2;
  $mail->CharSet = "UTF-8";
  $mail->IsSMTP();
  $mail->SMTPAuth = true;
  $mail->SMTPSecure = "tls";
  $mail->Host = "mail.hostedoffice.ag";
  $mail->Port = 587;
  $mail->Username = "g-analysis@energie-gipscomm.de";
  $mail->Password = "16785AW1610a";
  $mail->SetFrom("g-analysis@energie-gipscomm.de", "Gipscomm-Energie");
  $mail->IsHTML(true);

  if(strpos($empfaenger,",") != false){
    $empfaenger = explode(",", $empfaenger);
    $mail->AddAddress($empfaenger[0]);

    for($em = 0;$em < count($empfaenger);$em++){
      $mail->AddCC($empfaenger[$em]);
    }
  }
  else {
    $mail->AddAddress($empfaenger);
  }

  /*if($anhangPfad != false){
    $mail->AddAttachment($anhangPfad);
  }*/

  $mail->Subject = $betreff;
  $mail->Body = $emailText;
  $mail->Send();

    return "Erfolgreich Versendet";
  } catch(Exception $e){

    //Something went bad
    return "Fehlgeschlagen versuchen Sie es später noch einmal. Sollten Sie nach 3 Versuchen mit mindestens 10min Abstand voneinander, immer noch keinen Erfolg haben, kontaktieren Sie bitte unseren Support manuell per E-Mail: [An: sdm@energie-gipscomm.de, CC: info@energie-gipscomm.de, Anlage: Snapshot der Fehlermeldung] oder per Telefon unter: [+49 2192 853712] - Fehler: " . $mail->ErrorInfo;
  }
}
include('bottom-cache.php');
?>
