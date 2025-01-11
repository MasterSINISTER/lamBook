package com.lambook.notebookApp.controller;

import com.lambook.notebookApp.pages.Entries;
import com.lambook.notebookApp.pages.Users;
import com.lambook.notebookApp.services.LambookServices;
import com.lambook.notebookApp.services.UserServices;
import lombok.extern.slf4j.Slf4j;
import org.apache.coyote.Response;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import java.util.*;
import java.util.stream.Collectors;

//
//@RestController
//@RequestMapping("/book")
//public class LambookControllerDB {
//    @Autowired
//    private LambookServices lambookService;
//    @Autowired
//    private UserServices userServices;
//
//    @GetMapping
//    public ResponseEntity<?> getEntriesOfUser() {
//        try{
//            Authentication authentication= SecurityContextHolder.getContext().getAuthentication();
//            String username=authentication.getName();
//            Optional<Users> user = userServices.findByUserName(username);
//            List<Entries> list = user.get().getEntries();
//            if (list != null && !list.isEmpty()) {
//                return new ResponseEntity<>(list, HttpStatus.OK);
//            } else {
//                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//            }
//        }
//        catch (Exception e){
//            System.out.println(e);
//        }
//        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
//    }
//
//    @PostMapping
//    public ResponseEntity<Entries> createEntries(@RequestBody Entries entry) {
//        try {
//            Authentication authentication= SecurityContextHolder.getContext().getAuthentication();
//            String username=authentication.getName();
//            lambookService.saveEntry(entry, username);
//            return new ResponseEntity<>(HttpStatus.CREATED);
//        } catch (Exception e) {
//            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
//        }
//
//    }
//
//    @GetMapping("/entries/{id}")
//    public ResponseEntity<Entries> getId(@PathVariable ObjectId id) {
//        Optional<Entries> entries = lambookService.getEntry(id);
//        return entries.map(value -> new ResponseEntity<>(value, HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
//    }
//
//    @DeleteMapping("/delete/{username}/{entryID}")
//    public String deleteId(@PathVariable String username, @PathVariable ObjectId entryID) {
//        lambookService.deleteEntry(username, entryID);
//        return "Entries Deleted Successfully";
//    }
//
//    @DeleteMapping("/deleteAll")
//    public void deleteAll() {
//
//        lambookService.deleteData();
//    }
//
//    @PutMapping("/update/{username}/{entryId}")
//    public ResponseEntity<?> updateId(@PathVariable ObjectId entryId, @RequestBody Entries entry, @PathVariable ObjectId username) {
//        Optional<Entries> old = lambookService.getEntry(entryId);
//        if (old.isPresent()) {
//            Entries existingEntry = old.get();
//            existingEntry.setTitle(!entry.getTitle().isEmpty() ? entry.getTitle() : existingEntry.getTitle());
//            existingEntry.setDescription(!entry.getDescription().isEmpty() ? entry.getDescription() : existingEntry.getDescription());
//            existingEntry.setTag(entry.getTag() != null && !entry.getTag().isEmpty() ? entry.getTag() : existingEntry.getTag());
//            lambookService.saveEntry(existingEntry);
//            return new ResponseEntity<>(old, HttpStatus.OK);
//        } else {
//
//            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
//        }
//
//    }
//}


@Slf4j
@RestController
@RequestMapping("/book")
public class LambookControllerDB {

    @Autowired
    private LambookServices lambookService;
    @Autowired
    private UserServices userServices;

    @GetMapping
    public ResponseEntity<?> getEntriesOfUser() {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String username = authentication.getName();
            log.info("Authenticated username: {}", username);
            Optional<Users> user = userServices.findByUserName(username);
            if (user.isPresent()) {
                log.info("User found: {}", user.get().getUserName());
                List<Entries> list = user.get().getEntries();
                if (list != null && !list.isEmpty()) {
                    log.info("Entries found: {}", list.size());
                    return new ResponseEntity<>(list, HttpStatus.OK);
                } else {
                    log.warn("No entries found for user: {}", username);
                    return new ResponseEntity<>(HttpStatus.NOT_FOUND);
                }
            } else {
                log.error("User not found for username: {}", username);
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            log.error("Error while fetching user entries: ", e);
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }


    @GetMapping("/entries/{id}")
    public ResponseEntity<?> getId(@PathVariable ObjectId id) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();

        Optional<Users> user = userServices.findByUserName(username);

        if (user.isPresent()) {
            Optional<Entries> entry = user.get().getEntries().stream()
                    .filter(x -> x.getId().equals(id))
                    .findFirst();

            if (entry.isPresent()) {
                return new ResponseEntity<>(entry.get(), HttpStatus.OK);
            }
        }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }


    @PostMapping
    public ResponseEntity<Entries> createEntries(@RequestBody Entries entry) {
        try {
//            log.info("Creating new entry...");
//            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//            String username = authentication.getName();
//            log.info("Authenticated username: {}", username);
            lambookService.saveEntry(entry);
//            log.info("Entry created successfully for user: {}", username);
            return new ResponseEntity<>(HttpStatus.CREATED);
        } catch (Exception e) {
            log.error("Error while creating entry: ", e);
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }



    @DeleteMapping("/delete/{entryID}")
    public ResponseEntity<?> deleteId(@PathVariable String entryID) {
        ObjectId entry=new ObjectId(entryID);
        Authentication auth=SecurityContextHolder.getContext().getAuthentication();
        String currentUser=auth.getName();
        log.info("Deleting entry with ID: {} for user: {}", entry, currentUser);
        if(currentUser!=null){
        lambookService.deleteEntry(currentUser, entry);
        return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

//    @DeleteMapping("/deleteAll")
//    public void deleteAll() {
//        log.info("Deleting all entries...");
//        lambookService.deleteData();
//        log.info("All entries deleted successfully.");
//    }

    @PutMapping("/update/{entryId}")
    public ResponseEntity<?> updateId(@PathVariable ObjectId entryId, @RequestBody Entries entry) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String currentUser = auth.getName();
        Optional<Users> user = userServices.findByUserName(currentUser);

        if (user.isPresent() && user.get().getEntries() != null) {
            Optional<Entries> getEntry = user.get().getEntries().stream()
                    .filter(x -> x.getId().equals(entryId))
                    .findFirst();

            if (getEntry.isPresent()) {
                Entries old = getEntry.get();
                old.setTitle(entry.getTitle() != null && !entry.getTitle().isEmpty() ? entry.getTitle() : old.getTitle());
                old.setDescription(entry.getDescription() != null && !entry.getDescription().isEmpty() ? entry.getDescription() : old.getDescription());
                old.setTag(entry.getTag() != null && !entry.getTag().isEmpty() ? entry.getTag() : old.getTag());
                lambookService.updateEntry(old);

                return new ResponseEntity<>(HttpStatus.OK);
            }
        }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }




}
