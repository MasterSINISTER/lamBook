package com.lambook.notebookApp.pages;


import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "lambook_entries")
public class Entries {
    public ObjectId getId() {
        return id;
    }

    public void setId(ObjectId id) {
        this.id = id;
    }

    public @NonNull String getTitle() {
        return Title;
    }

    public void setTitle(@NonNull String title) {
        Title = title;
    }

    public @NonNull String getDescription() {
        return Description;
    }

    public void setDescription(@NonNull String description) {
        Description = description;
    }

    public String getTag() {
        return Tag;
    }

    public void setTag(String tag) {
        Tag = tag;
    }

    public @NonNull String getOwner() {
        return Owner;
    }

    public void setOwner(@NonNull String owner) {
        Owner = owner;
    }

    public long getEntryID() {
        return entryID;
    }

    public void setEntryID(long entryID) {
        this.entryID = entryID;
    }

    @Id
    private ObjectId id;
    @NonNull
    private String Title;
    @NonNull
    private String Description;
    private String Tag;
    @NonNull
    private String Owner;
    @NonNull
    private long entryID;
}
