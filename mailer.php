<?php

  $name = $_POST["name"];
  $body = $_POST["body"];
  $email = $_POST["email"];
  $likedSite = $_POST["liked"];

  $to      = 'parks.kendrick@gmail.com';
  $subject = 'Contact form From Portfolio';
  $message = "Message from Portfolio Page: \r\n" . $body . "\r\n Liked Site: " . $likedSite . "\r\n";
  $header = "To: Kendrick <parks.kendrick@gmail.com>\r\n";
  $header.= "From: Portfolio <contact@kendrickparks.com>\r\n"; 
  $header.= "MIME-Version: 1.0\r\n"; 
  $header.= "Content-Type: text/plain; charset=utf-8\r\n"; 
  $header.= "X-Priority: 1\r\n"; 
  $header.= 'X-Mailer: PHP/' . phpversion();
  $header.= "Reply-To: " . $email . "\r\n";

  //function that sends the mail
  //much have a to, subject, message, and a header with From in it (check your host for the right formatting on the header)
  //the from in the header must also be an email address on the server
  mail($to, $subject, $message, $header);
  //redirect page
  header( "Location: http://www.kendrickparks.com" );
  exit();



?>