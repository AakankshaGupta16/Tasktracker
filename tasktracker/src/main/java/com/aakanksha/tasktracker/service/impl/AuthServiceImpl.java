package com.aakanksha.tasktracker.service.impl;

import com.aakanksha.tasktracker.dto.LoginRequest;
import com.aakanksha.tasktracker.dto.SignupRequest;
import com.aakanksha.tasktracker.entity.User;
import com.aakanksha.tasktracker.enums.Role;
import com.aakanksha.tasktracker.repository.UserRepository;
import com.aakanksha.tasktracker.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public String signup(SignupRequest request) {

        if(userRepository.findByEmail(request.getEmail()).isPresent()) {
            return "Email already exists";
        }

        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(userRepository.count() == 0 ? Role.ADMIN : Role.MEMBER)
                .build();

        userRepository.save(user);

        return "User registered successfully";
    }

    @Override
    public String login(LoginRequest request) {

        return "Login API pending JWT implementation";
    }
}