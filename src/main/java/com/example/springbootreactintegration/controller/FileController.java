package com.example.springbootreactintegration.controller;

import com.example.springbootreactintegration.model.FileEntity;
import com.example.springbootreactintegration.repository.FileRepository;
import com.example.springbootreactintegration.model.FileMetadata;
import com.example.springbootreactintegration.service.FileMetadataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/files")
@CrossOrigin(origins = "http://localhost:3000", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
public class FileController {

    @Autowired
    private FileRepository fileRepository;

    @Autowired
    private FileMetadataService fileMetadataService;

    // Get all files
    @GetMapping
    public List<FileEntity> getAllFiles() {
        return fileRepository.findAll();
    }

    // Get files by storageType and category
    @GetMapping("/search")
    public List<FileEntity> getFilesByStorageTypeAndCategory(
            @RequestParam("storageType") String storageType,
            @RequestParam("category") String category) {

        if ("All".equalsIgnoreCase(category)) {
            return fileRepository.findByStorageType(storageType);
        } else {
            return fileRepository.findByStorageTypeAndCategory(storageType, category);
        }
    }

    // Add a new file metadata
    @PostMapping
    public List<FileMetadata> saveFilesMetadata(@RequestBody List<FileMetadata> fileMetadataList) {
        return fileMetadataService.saveMultipleFileMetadata(fileMetadataList);
    }

    // Delete a file by its ID
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteFileById(@PathVariable("id") Long id) {
        Optional<FileEntity> fileEntityOptional = fileRepository.findById(id);
        
        if (fileEntityOptional.isPresent()) {
            fileRepository.delete(fileEntityOptional.get());
            return ResponseEntity.ok("File deleted successfully.");
        } else {
            return ResponseEntity.status(404).body("File not found.");
        }
    }
}
