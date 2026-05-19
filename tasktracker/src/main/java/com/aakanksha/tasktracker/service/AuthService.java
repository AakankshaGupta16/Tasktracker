package com.aakanksha.tasktracker.service;

import com.aakanksha.tasktracker.dto.LoginRequest;
import com.aakanksha.tasktracker.dto.SignupRequest;

public interface AuthService {

    String signup(SignupRequest request);

    String login(LoginRequest request);
}

