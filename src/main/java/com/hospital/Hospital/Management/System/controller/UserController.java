package com.hospital.Hospital.Management.System.controller;

import java.util.List;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import com.hospital.Hospital.Management.System.dto.LoginRequest;
import com.hospital.Hospital.Management.System.dto.LoginResponse;
import com.hospital.Hospital.Management.System.entity.User;
import com.hospital.Hospital.Management.System.security.JwtService;
import com.hospital.Hospital.Management.System.service.UserService;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public UserController(UserService userService,
                          JwtService jwtService,
                          AuthenticationManager authenticationManager) {

        this.userService = userService;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
    }

    @PostMapping
    public User saveUser(@RequestBody User user) {
        return userService.saveUser(user);
    }

    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/{username}")
    public User getUserByUsername(@PathVariable String username) {
        return userService.getUserByUsername(username);
    }

 @PostMapping("/login")
public LoginResponse login(@RequestBody LoginRequest request) {

    System.out.println("===== LOGIN METHOD CALLED =====");
    System.out.println("Username: " + request.getUsername());

    authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                    request.getUsername(),
                    request.getPassword()));

    String token = jwtService.generateToken(request.getUsername());

    System.out.println("===== LOGIN SUCCESS =====");

    return new LoginResponse(token);
}
}