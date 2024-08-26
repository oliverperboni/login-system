package com.example.login_system.Services;

import java.util.List;

import com.example.login_system.Repository.UserRepository;
import com.example.login_system.Utils.UserJSONResquest;

public class DashboardService {


    private final UserRepository repository;

    public DashboardService(UserRepository repository) {
        this.repository = repository;
    }

    
    public List<UserJSONResquest> getAllUser(){
        return UserJSONResquest.convert(repository.findAll());
    }

    public List<UserJSONResquest> searchByNamePrefix(String prefix) {
        return UserJSONResquest.convert(repository.findByUsernameStartingWith(prefix));
    }
    

    
}
