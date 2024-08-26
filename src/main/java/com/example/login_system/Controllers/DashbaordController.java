package com.example.login_system.Controllers;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.example.login_system.Services.DashboardService;
import com.example.login_system.Utils.UserJSONResquest;

@RestController
@RequestMapping("/dashboard")
public class DashbaordController {
    
    DashboardService dashboardService;


    // post get all the user
    @PostMapping("/get-all-user")
    public List<UserJSONResquest> getAllUser(){
        return dashboardService.getAllUser();
    }


    @GetMapping("/search")
    public List<UserJSONResquest>searchUsers(@RequestParam("q") String query) {
        return dashboardService.searchByNamePrefix(query);
    }




}
