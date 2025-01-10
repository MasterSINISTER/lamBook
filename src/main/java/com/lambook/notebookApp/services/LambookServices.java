package com.lambook.notebookApp.services;

import com.lambook.notebookApp.pages.Entries;
import com.lambook.notebookApp.pages.Users;
import com.lambook.notebookApp.repo.LambookRepo;
import lombok.extern.slf4j.Slf4j;
import org.bson.types.ObjectId;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Slf4j
@Component
public class LambookServices {
    @Autowired
    private LambookRepo lambookRepo;
    @Autowired
    private UserServices userServices;

    private final static Logger logger= LoggerFactory.getLogger(LambookServices.class);

    @Transactional
    public void saveEntry(Entries entry) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String getUser = auth.getName();
        Optional<Users> users = userServices.findByUserName(getUser);

        if (users.isPresent()) {
            Users user = users.get();
            Entries saved = lambookRepo.save(entry);
            user.getEntries().add(saved);
            userServices.saveUser(user);
        } else {
            throw new RuntimeException("User not found with username: " + getUser);
        }
    }

    public String updateEntry(Entries entry) {
        lambookRepo.save(entry);
        return "Entry Updated!";
    }

    public List<Entries> getEntries() {
        return lambookRepo.findAll();
    }

    public Optional<Entries> getEntry(ObjectId id) {

        return lambookRepo.findById(String.valueOf(id));
    }

    public void deleteEntry(String username, ObjectId entryID) {
        Optional<Users> user = userServices.findByUserName(username);
        if (user.isPresent()) {
            user.get().getEntries().removeIf(x -> x.getId().equals(entryID));
            userServices.saveUser(user.get());  // Save the updated user
            lambookRepo.deleteById(String.valueOf(entryID));  // Delete the entry
        } else {
            throw new RuntimeException("User not found with id: " + username);  // Or handle as needed
        }
    }

    public void deleteData() {

        lambookRepo.deleteAll();
    }


}
//Controller --> Service --> Repo