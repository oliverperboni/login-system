package com.example.login_system.Controllers;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.login_system.Models.RecoverToken;
import com.example.login_system.Models.User;
import com.example.login_system.Services.AuthenticationService;
import com.example.login_system.Services.RecoverTokenService;
import com.example.login_system.Services.UserDetailsServiceImp;
import com.example.login_system.Utils.EmailRequest;
import com.example.login_system.Utils.EmailSender;
import com.example.login_system.Utils.ResetPasswordRequest;
import com.example.login_system.Utils.TokenGenerator;

@RestController
@RequestMapping("/recover")
public class RecoverTokenController {

    private final RecoverTokenService recoverTokenService;
    private final UserDetailsServiceImp userService;
    private final AuthenticationService authService;

    public RecoverTokenController(RecoverTokenService recoverTokenService, UserDetailsServiceImp userService,
            AuthenticationService authService) {
        this.recoverTokenService = recoverTokenService;
        this.userService = userService;
        this.authService = authService;
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody EmailRequest emailRequest) {
        String email = emailRequest.getEmail();

        try {
            User user = userService.findUserByEmail(email)
                    .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));


            String token = TokenGenerator.generateToken();
            RecoverToken recoverToken = new RecoverToken(user, token, LocalDateTime.now().plusMinutes(15));
            recoverTokenService.createToken(recoverToken);
            EmailSender emailSender = new EmailSender();
            emailSender.sendEmail(email, token);
            return ResponseEntity.ok("Password reset email sent successfully");
        } catch (UsernameNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found with email: " + email);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An error occurred while processing your request");
        }
    }

    // find if exist one user with this email and then generate the token

    // Post Recover token to verify if the token is valid
    // (/valid-token)
    @PostMapping("/valid-token")
    public ResponseEntity<?> resetPassword(@RequestBody ResetPasswordRequest resetPasswordRequest) {
        String token = resetPasswordRequest.getToken();
        String recoverToken = recoverTokenService.getToken(token).getToken();

        return authService.resetPassword(recoverToken);
    }

}
