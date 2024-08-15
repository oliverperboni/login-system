package com.example.login_system.Services;

import org.springframework.stereotype.Service;

import com.example.login_system.Models.RecoverToken;
import com.example.login_system.Repository.RecoverTokenRepository;

@Service
public class RecoverTokenService {
    

    public final  RecoverTokenRepository repo;

  
    public RecoverTokenService(RecoverTokenRepository recoverTokenRepository) {
        this.repo= recoverTokenRepository;
    }

    public void createToken(RecoverToken recoverToken){
        this.repo.save(recoverToken);
    }

    public RecoverToken getToken(String token){
        return repo.findByToken(token);
    }

    public void invalidateToken(RecoverToken recoverToken) {
        repo.delete(recoverToken);
    }

    
    
}
