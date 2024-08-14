package com.example.login_system.Repository;
import com.example.login_system.Models.RecoverToken;

import org.springframework.data.jpa.repository.JpaRepository;


public interface RecoverTokenRepository extends JpaRepository<RecoverToken, Integer> {

    RecoverToken findByToken(String Token);
    
}
