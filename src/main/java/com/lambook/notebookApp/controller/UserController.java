package com.lambook.notebookApp.controller;
import com.lambook.notebookApp.pages.Users;
import com.lambook.notebookApp.services.UserServices;
import com.lambook.notebookApp.services.WeatherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.*;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.swing.text.html.Option;

@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    private UserServices userService;

    @Autowired
    private WeatherService weatherService;

    private static final PasswordEncoder passwordEncoder=new BCryptPasswordEncoder();

    @PutMapping
    public ResponseEntity<?> updateUser(@RequestBody Users users) {
        // Get the currently authenticated user
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userName = authentication.getName();

        // Find the user in the database
        Optional<Users> userInDB = userService.findByUserName(userName);

        if (userInDB.isPresent()) {
            Users existingUser = userInDB.get();

            // Update the username
            existingUser.setUserName(users.getUserName());
            existingUser.setName(users.getUserName().substring(0,4));

            // Update the password only if it's provided and not empty
            if (users.getPassword() != null && !users.getPassword().isEmpty()) {
                existingUser.setPassword(passwordEncoder.encode(users.getPassword()));
                existingUser.setName(users.getUserName().substring(0,4));
            }

            // Save the updated user

            userService.saveUser(existingUser);

            System.out.println("Update Success");
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            System.out.println("User not found");
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


    @GetMapping("/verify")
    public ResponseEntity<?>userExist(){
        Authentication auth=SecurityContextHolder.getContext().getAuthentication();
        String getUser=auth.getName();
        Optional<Users>user=userService.findByUserName(getUser);
        if(user.isPresent()){
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping
    public ResponseEntity<?> greetings(){
        Authentication auth=SecurityContextHolder.getContext().getAuthentication();
        double currentWeather=((weatherService.getWeather("Indore").getMain().getTemp()-32))/1.8;
        return new ResponseEntity<>("Hi "+auth.getName()+" Weather Feels Like "+ currentWeather,HttpStatus.OK);
    }


}
