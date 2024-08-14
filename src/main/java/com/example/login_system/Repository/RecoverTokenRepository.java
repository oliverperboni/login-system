package com.example.login_system.Repository;
import com.example.login_system.Models.RecoverToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecoverTokenRepository extends JpaRepository<RecoverToken, Integer> {


    
}
