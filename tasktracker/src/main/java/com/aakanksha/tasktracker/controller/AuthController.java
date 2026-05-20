package com.aakanksha.tasktracker.controller;

import com.aakanksha.tasktracker.dto.LoginRequest;
import com.aakanksha.tasktracker.dto.LoginResponse;
import com.aakanksha.tasktracker.dto.SignupRequest;
import com.aakanksha.tasktracker.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/signup")
    public String signup(@RequestBody SignupRequest request) {

        return authService.signup(request);
    }

    @PostMapping("/login")
    public LoginResponse login(
            @RequestBody LoginRequest request
    ) {

        return authService.login(request);
    }
}