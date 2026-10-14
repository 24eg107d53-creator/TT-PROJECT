package com.akshay.carrental.controller;

import com.akshay.carrental.dto.AuthResponse;
import com.akshay.carrental.dto.LoginRequest;
import com.akshay.carrental.dto.RegisterRequest;
import com.akshay.carrental.model.User;
import com.akshay.carrental.repository.UserRepository;
import com.akshay.carrental.service.JwtService;
import java.util.Optional;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173") // safer than "*"
public class AuthController {

    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;

    // ================= REGISTER =================
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {

        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Email already exists");
        }

        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role("USER")
                .build();

        userRepository.save(user);

        return ResponseEntity.ok("User registered successfully");
    }


  // ================= LOGIN =================
@PostMapping("/login")
public ResponseEntity<?> login(@RequestBody LoginRequest request) {

    User user = userRepository.findByEmail(request.getEmail())
            .orElse(null);

    if (user == null) {
        return ResponseEntity.status(401).body("Invalid credentials");
    }

    if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
        return ResponseEntity.status(401).body("Invalid credentials");
    }

    String token = jwtService.generateToken(
            user.getEmail(),
            user.getRole(),
            user.getId()
    );

    return ResponseEntity.ok(new AuthResponse(token));
}

    // ================= GET USER =================
    @GetMapping("/user/{email}")
    public ResponseEntity<?> getUserByEmail(@PathVariable String email) {

    Optional<User> user = userRepository.findByEmail(email);

        if (user.isPresent()) {
            return ResponseEntity.ok(user.get());
        }

    return ResponseEntity.status(404).body("User not found");
}
}