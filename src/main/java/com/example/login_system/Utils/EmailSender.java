package com.example.login_system.Utils;


import io.github.cdimascio.dotenv.Dotenv;
import java.util.Properties;
import javax.mail.*;
import javax.mail.internet.*;

public class EmailSender {

    public static void main(String[] args) {

        // Carregar as variáveis do .env
        Dotenv dotenv = Dotenv.load();

        // Obter as variáveis
        String user = dotenv.get("EMAIL_USER");
        String password = dotenv.get("EMAIL_PASSWORD");
        String host = dotenv.get("SMTP_HOST");
        String port = dotenv.get("SMTP_PORT");
        System.out.println(user);
        System.out.println(password);
        System.out.println(host);
        System.out.println(port);


        String to = "oliverperboni@gmail.com";  // email do destinatário

        // Configura as propriedades do sistema
        Properties props = new Properties();
        props.put("mail.smtp.host", host);
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.port", port);
        props.put("mail.smtp.starttls.enable", "true");

        // Obtém a sessão de autenticação
        Session session = Session.getDefaultInstance(props,
                new javax.mail.Authenticator() {
                    protected PasswordAuthentication getPasswordAuthentication() {
                        return new PasswordAuthentication(user, password);
                    }
                });

        try {
            // Cria uma mensagem de email
            MimeMessage message = new MimeMessage(session);
            message.setFrom(new InternetAddress(user));
            message.addRecipient(Message.RecipientType.TO, new InternetAddress(to));
            message.setSubject("Assunto do Email");
            message.setText("Corpo do email");

            // Envia a mensagem
            Transport.send(message);

            System.out.println("Email enviado com sucesso!");

        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }
}

