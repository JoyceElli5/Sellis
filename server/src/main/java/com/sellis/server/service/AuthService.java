package com.sellis.server.service;

import com.sellis.server.dto.LoginRequest;
import com.sellis.server.dto.LoginResponse;
import com.sellis.server.model.Admin;
import com.sellis.server.repository.AdminRepository;
import com.sellis.server.security.JwtTokenProvider;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private static final Logger log = LoggerFactory.getLogger(AuthService.class);

    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider tokenProvider;
    private final AdminRepository adminRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthService(AuthenticationManager authenticationManager,
                       JwtTokenProvider tokenProvider,
                       AdminRepository adminRepository,
                       PasswordEncoder passwordEncoder) {
        this.authenticationManager = authenticationManager;
        this.tokenProvider = tokenProvider;
        this.adminRepository = adminRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public LoginResponse login(LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        Admin admin = adminRepository.findByEmail(request.getEmail())
                .orElseThrow();

        String token = tokenProvider.generateToken(admin.getEmail(), admin.getRole());

        log.info("Admin logged in: {}", admin.getEmail());

        return new LoginResponse(token, admin.getEmail(), admin.getName(), admin.getRole());
    }
}
