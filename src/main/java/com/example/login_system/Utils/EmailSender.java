package com.example.login_system.Utils;

import io.github.cdimascio.dotenv.Dotenv;
import java.util.Properties;
import javax.mail.*;
import javax.mail.internet.*;

public class EmailSender {

    public int sendEmail(String to) {

        Dotenv dotenv = Dotenv.load();

        String user = dotenv.get("EMAIL_USER");
        String password = dotenv.get("EMAIL_PASSWORD");
        String host = dotenv.get("SMTP_HOST");
        String port = dotenv.get("SMTP_PORT");

        Properties props = new Properties();
        props.put("mail.smtp.host", host);
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.port", port);
        props.put("mail.smtp.starttls.enable", "true");

        Session session = Session.getDefaultInstance(props,
                new javax.mail.Authenticator() {
                    protected PasswordAuthentication getPasswordAuthentication() {
                        return new PasswordAuthentication(user, password);
                    }
                });

        try {

            MimeMessage message = new MimeMessage(session);
            message.setFrom(new InternetAddress(user));
            message.addRecipient(Message.RecipientType.TO, new InternetAddress(to));
            message.setSubject("Assunto do Email");
            message.setText("Corpo do email");

        
            Transport.send(message);

            return 1;

        } catch (MessagingException e) {
            e.printStackTrace();
        }
        return -1;
    }
}
