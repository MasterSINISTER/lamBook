package com.lambook.notebookApp.repo;

import com.lambook.notebookApp.pages.Entries;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


public interface LambookRepo extends MongoRepository<Entries, String> {

}
