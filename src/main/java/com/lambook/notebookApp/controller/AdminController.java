package com.lambook.notebookApp.controller;


import com.lambook.notebookApp.pages.Users;
import com.lambook.notebookApp.services.UserServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;



@RestController
@RequestMapping("/admin")
public class AdminController {
    @Autowired
    private UserServices userServices;
    @GetMapping("/all-users")
    public ResponseEntity<?> getAllUser(){
        List<Users> users = userServices.getUsers();
        if(users!=null && !users.isEmpty()){
        return new ResponseEntity<>(users, HttpStatus.OK);
        }
        else{
        return new ResponseEntity<>(users,HttpStatus.NOT_FOUND);
        }
    }
    @PostMapping("/create-admin")
    public void createAdmin(@RequestBody Users users){
        userServices.saveAdmin(users);
    }
    @DeleteMapping("/delete-user/{username}")
    public ResponseEntity<?>deleteUser(@PathVariable String username){
        userServices.deleteUser(username);
        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }
    @PutMapping("/update-power/{username}")
    public ResponseEntity<?> updateRole(@PathVariable String username){
        Optional<Users>user=userServices.findByUserName(username);
        if(user.isPresent()){
        user.get().getRoles().add("ADMIN");
        return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
