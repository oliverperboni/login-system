package com.example.login_system.Controllers;

// import com.example.ccpApi.Config.CustomLogoutHandler;
import com.example.login_system.Services.AuthenticationService;
import com.example.login_system.Models.AuthenticationResponse;
import com.example.login_system.Models.User;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthenticationController {

    private final AuthenticationService authService;
    // private final CustomLogoutHandler logoutHandler;

    public AuthenticationController(AuthenticationService authService){ //, CustomLogoutHandler logoutHandler) {
        this.authService = authService;
       // this.logoutHandler = logoutHandler;
    }


    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(
            @RequestBody User request
            ) {
        return ResponseEntity.ok(authService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> login(
            @RequestBody User request
    ) {
        return ResponseEntity.ok(authService.authenticate(request));
    }

    @PostMapping("/refresh_token")
    public ResponseEntity refreshToken(
            HttpServletRequest request,
            HttpServletResponse response
    ) {
        return authService.refreshToken(request, response);
    }
    @PostMapping("/logout")
    public ResponseEntity<Void> logout(
            HttpServletRequest request,
            HttpServletResponse response,
            Authentication authentication
    ) {
       // logoutHandler.logout(request, response, authentication);
        return ResponseEntity.noContent().build();
    }

}
