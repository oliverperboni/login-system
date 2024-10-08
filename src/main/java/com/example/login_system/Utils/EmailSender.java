package com.example.login_system.Utils;

import io.github.cdimascio.dotenv.Dotenv;
import java.util.Properties;
import javax.mail.*;
import javax.mail.internet.*;

public class EmailSender {

    public int sendEmail(String to, String token) {

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
            message.setSubject("Recuperar senha");

            String htmlContent = "<html>" +
                    "<body style='font-family: \"Quicksand\", sans-serif; color: white; background: linear-gradient(135deg, #1f2a38 0%, #3c5061 100%); margin: 0; padding: 40px;'>"
                    +
                    "<div style='max-width: 700px; margin: auto; background-color: #2c3e50; padding: 30px; border-radius: 25px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);'>"
                    +
                    "<h1 style='color: white; text-align: center;'>Recuperar Senha!</h1>" +
                    "<p style='font-size: 16px; line-height: 1.5; color: white; text-align: center;'>Olá,</p>" +
                    "<p style='font-size: 16px; line-height: 1.5; color: white; text-align: center;'>Recebemos uma solicitação para recuperar a sua senha. Use o token abaixo para continuar o processo:</p>"
                    +
                    "<p style='font-size: 18px; color: white; font-weight: bold; text-align: center;'>" + token
                    + "</p>" +
                    "<p style='font-size: 16px; color: white; line-height: 1.5; text-align: center;'>Se você não solicitou a recuperação de senha, ignore este email. Sua conta está segura.</p>"
                    +
                    "<p style='font-size: 16px; color: white; line-height: 1.5; text-align: center;'>Obrigado,</p>" +
                    "<p style='font-size: 16px; color: white; line-height: 1.5; text-align: center;'>Equipe de Suporte</p>" +
                    "</div>" +
                    "</body>" +
                    "</html>";

            message.setContent(htmlContent, "text/html; charset=UTF-8");

            Transport.send(message);

            return 1;

        } catch (MessagingException e) {
            e.printStackTrace();
        }
        return -1;
    }
}
