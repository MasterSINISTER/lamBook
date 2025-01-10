package com.lambook.notebookApp.pages;

import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "lambook_entries")
@Getter
@Setter
public class Entries {
    @Id
    private ObjectId id;
    @NonNull
    private String Title;
    @NonNull
    private String Description;
    private String Tag;
    @NonNull
    private String Owner;
}
