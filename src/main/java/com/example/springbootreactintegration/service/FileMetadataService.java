package com.example.springbootreactintegration.service;

import com.example.springbootreactintegration.model.FileMetadata;
import java.util.List;

public interface FileMetadataService {
    FileMetadata saveFileMetadata(FileMetadata fileMetadata);

     List<FileMetadata> saveMultipleFileMetadata(List<FileMetadata> fileMetadataList); // New method


    List<FileMetadata> getAllFileMetadata();

    FileMetadata getFileMetadataById(int id);

    FileMetadata updateFileMetadata(int id, FileMetadata fileMetadata);

    void deleteFileMetadata(int id);
}
