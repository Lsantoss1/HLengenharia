<?php

    $to = "lucazls129@gmail.com";
    $from = filter_var($_REQUEST['email'], FILTER_SANITIZE_EMAIL);
    $name = strip_tags(trim($_REQUEST['name']));
    $csubject = strip_tags(trim($_REQUEST['subject']));
    $cmessage = strip_tags(trim($_REQUEST['message']));

    // Cabeçalhos para email HTML
    $headers = "From: $from\r\n";
    $headers .= "Reply-To: $from\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";

    // Assunto do email
    $subject = "Mensagem do formulário de contato";

    // Corpo do email em HTML
    $logo = 'img/logo.png';  // ajuste o caminho se necessário
    $link = '#';

    $body = "<!DOCTYPE html><html lang='en'><head><meta charset='UTF-8'><title>Mensagem</title></head><body>";
    $body .= "<table style='width: 100%;'>";
    $body .= "<thead style='text-align: center;'><tr><td colspan='2' style='border:none;'>";
    $body .= "<a href='{$link}'><img src='{$logo}' alt='Logo'></a><br><br>";
    $body .= "</td></tr></thead><tbody><tr>";
    $body .= "<td style='border:none;'><strong>Nome:</strong> {$name}</td>";
    $body .= "<td style='border:none;'><strong>Email:</strong> {$from}</td>";
    $body .= "</tr><tr>";
    $body .= "<td colspan='2' style='border:none;'><strong>Assunto:</strong> {$csubject}</td>";
    $body .= "</tr><tr><td colspan='2' style='border:none;'></td></tr>";
    $body .= "<tr><td colspan='2' style='border:none;'>{$cmessage}</td></tr>";
    $body .= "</tbody></table>";
    $body .= "</body></html>";

    // Envio do email
    if(mail($to, $subject, $body, $headers)){
        echo "Mensagem enviada com sucesso.";
    } else {
        echo "Falha no envio da mensagem.";
    }

?>
