<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $name = $_POST["name"];
  $email = $_POST["email"];
  $subject = $_POST["subject"];
  $message = $_POST["message"];

  // Perform necessary actions with the form data (e.g., send email, save to database)
  $to = "contact@dallasscott.org"; // Replace with the recipient's email address
  $headers = "From: " . $email . "\r\n";
  $headers .= "Reply-To: " . $email . "\r\n";
  $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

  $email_content = "Name: " . $name . "\n";
  $email_content .= "Email: " . $email . "\n";
  $email_content .= "Subject: " . $subject . "\n\n";
  $email_content .= $message;

  // Send the email
  if (mail($to, $subject, $email_content, $headers)) {
    echo "Email sent successfully.";
  } else {
    echo "Error: Unable to send the email.";
  }

  // Redirect back to the contact form or a thank-you page
  header("Location: thank_you.html");
  exit;
}
?>