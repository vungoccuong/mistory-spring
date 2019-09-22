package com.ltm2019.mistory.model;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;

@Document(collection = "files")
public class FileModel {
    private ObjectId id;
    private String originalname;
    private String encoding;
    private String mimetype;
    private long size;
    private String destination;
    private String filename;
    private String path;
    private ObjectId uploader;
    private Date createdAt = new Date();
    private Date updatedAt = new Date();

    public FileModel(String originalname, String encoding, String mimetype, long size, String destination,
                     String filename, String path, ObjectId uploader, Date createdAt, Date updatedAt) {
        this.originalname = originalname;
        this.encoding = encoding;
        this.mimetype = mimetype;
        this.size = size;
        this.destination = destination;
        this.filename = filename;
        this.path = path;
        this.uploader = uploader;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    private FileModel(String originalname, String contentType, long size) {
        this.originalname = originalname;
        this.encoding = contentType;
        this.mimetype = contentType;
        this.size = size;
    }

    public static FileModel fromMultipartFile(MultipartFile multipartFile) {
        return new FileModel(multipartFile.getOriginalFilename(),
                multipartFile.getContentType(), multipartFile.getSize());
    }

    public ObjectId getId() {
        return id;
    }

    public void setId(ObjectId id) {
        this.id = id;
    }

    public String getOriginalname() {
        return originalname;
    }

    public void setOriginalname(String originalname) {
        this.originalname = originalname;
    }

    public String getEncoding() {
        return encoding;
    }

    public void setEncoding(String encoding) {
        this.encoding = encoding;
    }

    public String getMimetype() {
        return mimetype;
    }

    public void setMimetype(String mimetype) {
        this.mimetype = mimetype;
    }

    public long getSize() {
        return size;
    }

    public void setSize(long size) {
        this.size = size;
    }

    public String getDestination() {
        return destination;
    }

    public void setDestination(String destination) {
        this.destination = destination;
    }

    public String getFilename() {
        return filename;
    }

    public void setFilename(String filename) {
        this.filename = filename;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public ObjectId getUploader() {
        return uploader;
    }

    public void setUploader(ObjectId uploader) {
        this.uploader = uploader;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public Date getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Date updatedAt) {
        this.updatedAt = updatedAt;
    }
}
