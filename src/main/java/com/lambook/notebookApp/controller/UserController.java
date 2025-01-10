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

@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    private UserServices userService;

    @Autowired
    private WeatherService weatherService;

    private static final PasswordEncoder passwordEncoder=new BCryptPasswordEncoder();

    @PutMapping
    public ResponseEntity<?>updateUser(@RequestBody Users users){
   Authentication authentication= SecurityContextHolder.getContext().getAuthentication();
   String userName=authentication.getName();
       Optional<Users> userInDB=userService.findByUserName(userName);
           userInDB.get().setUserName(users.getUserName());
           userInDB.get().setPassword(passwordEncoder.encode(users.getPassword()));
           userService.saveUser(userInDB.get());
           System.out.println("Success");
       return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }


    @GetMapping
    public ResponseEntity<?> greetings(){
        Authentication auth=SecurityContextHolder.getContext().getAuthentication();
        double currentWeather=((weatherService.getWeather("Indore").getMain().getTemp()-32))/1.8;
        return new ResponseEntity<>("Hi "+auth.getName()+" Weather Feels Like "+ currentWeather,HttpStatus.OK);
    }


}
