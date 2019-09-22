package com.ltm2019.mistory.entities;

import com.ltm2019.mistory.controller.Responsible;
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
