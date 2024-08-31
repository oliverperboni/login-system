package com.example.login_system.Services;

import org.springframework.security.core.authority.AuthorityUtils;
import com.example.login_system.Models.AuthenticationResponse;
import com.example.login_system.Models.RecoverToken;
import com.example.login_system.Models.Token;
import com.example.login_system.Models.User;
import com.example.login_system.Repository.RecoverTokenRepository;
import com.example.login_system.Repository.TokenRepository;
import com.example.login_system.Repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class AuthenticationService {

    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    private final TokenRepository tokenRepository;
    private final RecoverTokenService recoverTokenService;

    private final AuthenticationManager authenticationManager;

    public AuthenticationService(UserRepository repository, PasswordEncoder passwordEncoder, JwtService jwtService,
            TokenRepository tokenRepository, RecoverTokenService recoverTokenService,
            AuthenticationManager authenticationManager) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.tokenRepository = tokenRepository;
        this.recoverTokenService = recoverTokenService;
        this.authenticationManager = authenticationManager;
    }

    public AuthenticationResponse register(User request) {

        // check if user already exist. if exist than authenticate the user
        if (repository.findByUsername(request.getUsername()).isPresent()) {
            return new AuthenticationResponse(null, null, "User already exist");
        }

        User user = new User();

        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setEmail(request.getEmail());

        user.setRole(request.getRole());

        user = repository.save(user);
        org.springframework.security.core.userdetails.User springUser = convertToSpringUser(user);
        String accessToken = jwtService.generateAccessToken(springUser);
        String refreshToken = jwtService.generateRefreshToken(springUser);

        // String accessToken = jwtService.generateAccessToken(user);
        // String refreshToken = jwtService.generateRefreshToken(user);

        saveUserToken(accessToken, refreshToken, user);

        return new AuthenticationResponse(accessToken, refreshToken, "User registration was successful");

    }

    private org.springframework.security.core.userdetails.User convertToSpringUser(User user) {

        return new org.springframework.security.core.userdetails.User(
                user.getUsername(),
                user.getPassword(),
                AuthorityUtils.createAuthorityList(user.getRole().name()));
    }

    public AuthenticationResponse authenticate(User request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()));

        User user = repository.findByUsername(request.getUsername()).orElseThrow();
        org.springframework.security.core.userdetails.User springUser = convertToSpringUser(user);
        String accessToken = jwtService.generateAccessToken(springUser);
        String refreshToken = jwtService.generateRefreshToken(springUser);

        revokeAllTokenByUser(user);
        saveUserToken(accessToken, refreshToken, user);

        return new AuthenticationResponse(accessToken, refreshToken, "User login was successful");

    }

    private void revokeAllTokenByUser(User user) {
        List<Token> validTokens = tokenRepository.findAllAccessTokensByUser(user.getId());
        if (validTokens.isEmpty()) {
            return;
        }

        validTokens.forEach(t -> {
            t.setLoggedOut(true);
        });

        tokenRepository.saveAll(validTokens);
    }

    private void saveUserToken(String accessToken, String refreshToken, User user) {
        Token token = new Token();
        token.setAccessToken(accessToken);
        token.setRefreshToken(refreshToken);
        token.setLoggedOut(false);
        token.setUser(user);
        tokenRepository.save(token);
    }

    public ResponseEntity refreshToken(
            HttpServletRequest request,
            HttpServletResponse response) {
        // extract the token from authorization header
        String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return new ResponseEntity(HttpStatus.UNAUTHORIZED);
        }

        String token = authHeader.substring(7);

        // extract username from token
        String username = jwtService.extractUsername(token);

        // check if the user exist in database
        User user = repository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("No user found"));

        // check if the token is valid
        if (jwtService.isValidRefreshToken(token, user)) {
            // generate access token
            org.springframework.security.core.userdetails.User springUser = convertToSpringUser(user);
            String accessToken = jwtService.generateAccessToken(springUser);
            String refreshToken = jwtService.generateRefreshToken(springUser);

            revokeAllTokenByUser(user);
            saveUserToken(accessToken, refreshToken, user);

            return new ResponseEntity(new AuthenticationResponse(accessToken, refreshToken, "New token generated"),
                    HttpStatus.OK);
        }

        return new ResponseEntity(HttpStatus.UNAUTHORIZED);

    }

    public ResponseEntity<String> updatePassword(String username, String newPassword) {
        // Verifica se o usuário existe no banco de dados
        User user = repository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));


        // Codifica a nova senha e atualiza o campo de senha do usuário
        user.setPassword(passwordEncoder.encode(newPassword));
        repository.save(user);

        // Invalida todos os tokens existentes para este usuário
        revokeAllTokenByUser(user);

        // Gera novos tokens (opcional, dependendo do caso de uso)
        org.springframework.security.core.userdetails.User springUser = convertToSpringUser(user);
        String accessToken = jwtService.generateAccessToken(springUser);
        String refreshToken = jwtService.generateRefreshToken(springUser);
        saveUserToken(accessToken, refreshToken, user);

        return new ResponseEntity<>("Senha atualizada com sucesso", HttpStatus.OK);
    }


    // TODO change this method: only confirms if the token is valid or not !!!
    public ResponseEntity<String> resetPassword(String token) {
        // Verifica se o token é válido
        RecoverToken recoverToken = recoverTokenService.getToken(token);
        if (recoverToken == null || !LocalDateTime.now().isBefore(recoverToken.getExpires_at())) {
            return new ResponseEntity<>("Invalid or expired token", HttpStatus.UNAUTHORIZED);
        }

        // RecoverToken validToken = tokenOptional.get();
        // User user = recoverToken.getUser();

        // // Atualiza a senha do usuário
        // user.setPassword(passwordEncoder.encode(newPassword));
        // repository.save(user);

        // Revoga o token após a redefinição da senha

        return new ResponseEntity<>("Token valid", HttpStatus.OK);
    }
}
