package com.example.login_system.Controllers;

import org.springframework.web.bind.annotation.RestController;

import com.example.login_system.Services.RecoverTokenService;

@RestController
public class RecoverTokenController {


    RecoverTokenService recoverTokenService;

    public RecoverTokenController(RecoverTokenService recoverTokenService) {
        this.recoverTokenService = recoverTokenService;
    }

    //Get Recover Token for change de password


    //Post Recover token to change the password
  
    
}
