package com.lambook.notebookApp.controller;

import com.lambook.notebookApp.pages.Entries;
import com.lambook.notebookApp.pages.Users;
import com.lambook.notebookApp.services.UserServices;
import org.apache.catalina.User;
import org.apache.coyote.Response;
import org.bson.types.ObjectId;
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

    @DeleteMapping("/delete")
    public ResponseEntity<?>deleteUser(){
        Authentication authentication= SecurityContextHolder.getContext().getAuthentication();
        String username=authentication.getName();
        userService.deleteUser(username);
        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }
}
