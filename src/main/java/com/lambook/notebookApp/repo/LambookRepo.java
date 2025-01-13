package com.lambook.notebookApp.repo;

import com.lambook.notebookApp.pages.Entries;
import org.springframework.context.annotation.Bean;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


public interface LambookRepo extends MongoRepository<Entries, String> {

    void deleteByEntryID(long entryID);
}
