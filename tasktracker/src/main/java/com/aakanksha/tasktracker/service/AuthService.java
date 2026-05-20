package com.aakanksha.tasktracker.service;

import com.aakanksha.tasktracker.dto.LoginRequest;
import com.aakanksha.tasktracker.dto.LoginResponse;
import com.aakanksha.tasktracker.dto.SignupRequest;

public interface AuthService {

    String signup(SignupRequest request);

    LoginResponse login(LoginRequest request);
}

