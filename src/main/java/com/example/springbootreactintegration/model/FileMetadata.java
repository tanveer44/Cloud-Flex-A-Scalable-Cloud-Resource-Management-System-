package com.example.springbootreactintegration.model;

public class FileMetadata {
    private int id;
    private String storageType;
    private String category;
    private String fileName;

    // Default constructor
    public FileMetadata() {
    }

    // Constructor to initialize all fields
    public FileMetadata(int id, String storageType, String category, String fileName) {
        this.id = id;
        this.storageType = storageType;
        this.category = category;
        this.fileName = fileName;
    }

    // Getters and setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getStorageType() {
        return storageType;
    }

    public void setStorageType(String storageType) {
        this.storageType = storageType;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    // Optional: Override toString method for better logging
    @Override
    public String toString() {
        return "FileMetadata{" +
                "id=" + id +
                ", storageType='" + storageType + '\'' +
                ", category='" + category + '\'' +
                ", fileName='" + fileName + '\'' +
                '}';
    }
}