<?php
include('top-cache.php');
require_once 'vendor/autoload.php';

function eMail($empfaenger, $betreff, $emailText) {

    // Create the Transport
    $transport = (new Swift_SmtpTransport('mail.hostedoffice.ag', 587))
    ->setUsername('g-analysis@energie-gipscomm.de')
    ->setPassword('16785AW1610a')
    ;

    // Create the Mailer using your created Transport
    $mailer = new Swift_Mailer($transport);

    // Create a message
    $message = (new Swift_Message($betreff))
    ->setFrom(['g-analysis@energie-gipscomm.de' => 'Gipscomm - Energie'])
    ->setTo([$empfaenger => 'A name'])
    ->setBody($emailText, 'text/html')
    ;

    // Send the message
    $result = $mailer->send($message);
}
include('bottom-cache.php');
?>
