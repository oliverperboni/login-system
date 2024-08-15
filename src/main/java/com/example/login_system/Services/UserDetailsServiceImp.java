package com.example.login_system.Services;


import com.example.login_system.Models.User;
import com.example.login_system.Repository.*;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class UserDetailsServiceImp implements UserDetailsService {

    private final UserRepository repository;

    public UserDetailsServiceImp(UserRepository repository) {
        this.repository = repository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return repository.findByUsername(username).orElseThrow(()-> new UsernameNotFoundException("User not found"));
    }

    public Optional<User> findUserByEmail(String email) {
        System.out.println("-------------------------EMAIL NO SERVICO :: "+ email);
        return repository.findByEmail(email);
    }


}
