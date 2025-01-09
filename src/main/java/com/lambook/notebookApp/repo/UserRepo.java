package com.lambook.notebookApp.repo;

import com.lambook.notebookApp.pages.Users;
import org.bson.types.ObjectId;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Configuration
public interface UserRepo extends MongoRepository<Users, String> {
    Optional<Users> findByUserName(String userName);
}
