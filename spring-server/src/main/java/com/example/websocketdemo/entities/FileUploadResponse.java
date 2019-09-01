package com.example.websocketdemo.entities;

import com.example.websocketdemo.controller.Responsible;
import org.bson.types.ObjectId;

public class FileUploadResponse implements Responsible {
    private String status ="success";
    private String id;

    public FileUploadResponse(ObjectId id) {
        this.id = id.toString();
    }

    public String getStatus() {
        return status;
    }

    public String getId() {
        return id;
    }
}
