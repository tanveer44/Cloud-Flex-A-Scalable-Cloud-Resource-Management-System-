package com.example.springbootreactintegration.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Column;

@Entity
@Table(name = "siddharth_fileentity") // Specify your table name here
public class FileEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "storageType")
    private String storageType;

    @Column(name = "category")
    private String category;

    @Column(name = "fileName")
    private String fileName;

   

    public FileEntity() {}

    public FileEntity(String storageType, String category, String fileName) {
        this.storageType = storageType;
        this.category = category;
        this.fileName = fileName;
        
    }

    // Getters
    public Long getId() {
        return id;
    }

    public String getStorageType() {
        return storageType;
    }

    public String getCategory() {
        return category;
    }

    public String getFileName() {
        return fileName;
    }

  

    // Setters
    public void setId(Long id) {
        this.id = id;
    }

    public void setStorageType(String storageType) {
        this.storageType = storageType;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

   
}
