package com.example.springbootreactintegration.repository;

import com.example.springbootreactintegration.model.FileEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface FileRepository extends JpaRepository<FileEntity, Long> {
    List<FileEntity> findByStorageType(String storageType);
    List<FileEntity> findByStorageTypeAndCategory(String storageType, String category);
}
