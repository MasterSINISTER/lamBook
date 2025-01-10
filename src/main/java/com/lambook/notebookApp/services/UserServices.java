package com.lambook.notebookApp.services;


import com.lambook.notebookApp.pages.Users;
import com.lambook.notebookApp.repo.UserRepo;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
public class UserServices {
    @Autowired
    private UserRepo userRepo;

    private static final PasswordEncoder bCrypt = new BCryptPasswordEncoder();

    public void saveNewUser(Users users) {
        if (users == null) {
            throw new IllegalArgumentException("User details cannot be null");
        }

        Optional<Users> existingUser = userRepo.findByUserName(users.getUserName());

        if (existingUser.isPresent() && !existingUser.get().getId().equals(users.getId())) {
            log.error("User Name Already Taken");
            throw new IllegalArgumentException("Username already taken");
        }

        // Always encode the password before saving
        users.setPassword(bCrypt.encode(users.getPassword()));

        userRepo.save(users);
    }

    public void saveUser(Users user) {
        if (user.getId() != null) {  // Check if the user is being updated
            Optional<Users> existingUser = userRepo.findByUserName(user.getUserName());
            if (existingUser.isPresent()) {
                String existingPassword = existingUser.get().getPassword();
                // Only encode the password if the new one is not already hashed
                if (!user.getPassword().equals(existingPassword)) {
                    user.setPassword(bCrypt.encode(user.getPassword()));
                    user.setRoles(Arrays.asList("USER"));
                }
            }
        } else {
            user.setPassword(bCrypt.encode(user.getPassword()));
            user.setRoles(Arrays.asList("USER"));
        }
        userRepo.save(user);

//        user.setPassword(bCrypt.encode(user.getPassword()));
//
//        userRepo.save(us)

    }
    public void saveAdmin(Users user) {
        if (user.getId() != null) {  // Check if the user is being updated
            Optional<Users> existingUser = userRepo.findByUserName(user.getUserName());
            if (existingUser.isPresent()) {
                String existingPassword = existingUser.get().getPassword();
                if (!user.getPassword().equals(existingPassword)) {
                    user.setPassword(bCrypt.encode(user.getPassword()));
                    user.setRoles(Arrays.asList("USER","ADMIN"));
                }
            }
        } else {
            user.setPassword(bCrypt.encode(user.getPassword()));
            user.setRoles(Arrays.asList("USER","ADMIN"));
        }
        userRepo.save(user);
    }

    public List<Users> getUsers() {

        return userRepo.findAll();
    }

    public void deleteUser(String username) {
        Optional<Users> user = userRepo.findByUserName(username);
        if (user.isPresent()) {
            userRepo.delete(user.get());
        } else {
            throw new IllegalArgumentException("User not found: " + username);
        }
    }


    public void deleteAllUser() {

        userRepo.deleteAll();
    }


    public Optional<Users> findByUserName(String userName) {
        if (userName == null || userName.isEmpty()) {
            throw new IllegalArgumentException("Username cannot be null or empty");
        }
        return userRepo.findByUserName(userName);
    }


}
