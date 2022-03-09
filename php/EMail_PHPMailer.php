<?php
error_reporting( -1 ) ;
ini_set ( 'display_errors', 'On' ) ;
set_error_handler("warning_handler", E_WARNING);

use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;

require 'vendor/phpmailer/phpmailer/src/Exception.php';
require 'vendor/phpmailer/PHPMailer/src/PHPMailer.php';
require 'vendor/phpmailer/PHPMailer/src/SMTP.php';


function eMail($empfaenger, $betreff, $emailText) {
    
    $mail = new PHPMailer();

    $mail->SMTPDebug = SMTP::DEBUG_SERVER;
    $mail->isSMTP();
    $mail->Host = 'mail.hostedoffice.ag';
    $mail->SMTPAuth = true;
    $mail->Username = 'g-analysis@energie-gipscomm.de'; 
    $mail->Password = '16785AW1610a' ;
    $mail->SMTPSecure = 'tls';
    $mail->Port = 587;
    
    $mail->setFrom('g-analysis@energie-gipscomm.de', 'Gipscomm-Energie');
    $mail->addReplyTo('g-analysis@energie-gipscomm.de', 'Gipscomm-Energie');    
    $mail->addAddress($empfaenger, $empfaenger);
    
    $mail->isHTML(true);
    $mail->Subject = $betreff;
    $mail->Body = $emailText;

    if($mail->send()){
        echo 'Message has been sent';
    }else{
        echo 'Message could not be sent.';
        echo 'Mailer Error: ' . $mail->ErrorInfo;
    }
}
?>
