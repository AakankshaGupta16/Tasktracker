package com.aakanksha.tasktracker.service.impl;

import com.aakanksha.tasktracker.dto.LoginRequest;
import com.aakanksha.tasktracker.dto.LoginResponse;
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

        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            return "Email already exists";
        }

        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.valueOf(request.getRole()))
                .build();

        userRepository.save(user);

        return "User registered successfully";
    }

    @Override
    public LoginResponse login(
            LoginRequest request
    ) {

        User user = userRepository
                .findByEmail(request.getEmail())
                .orElseThrow(() ->
                        new RuntimeException(
                                "User not found"
                        )
                );

        boolean matches =
                passwordEncoder.matches(
                        request.getPassword(),
                        user.getPassword()
                );

        if (!matches) {

            throw new RuntimeException(
                    "Invalid password"
            );
        }

        return new LoginResponse(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRole().name()
        );
    }
}