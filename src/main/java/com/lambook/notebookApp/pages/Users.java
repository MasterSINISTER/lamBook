package com.lambook.notebookApp.pages;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.Setter;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Document(collection = "user")
@Getter
@Setter
@NoArgsConstructor
public class Users {
    @Id
    private ObjectId id;
    @NonNull
    private String name;
    @Indexed(unique = true)
    @NonNull
    private String userName;
    @NonNull
    private String password;
    @NonNull
    private List<String>roles;
    @DBRef
    private List<Entries> entries=new ArrayList<>();
}
