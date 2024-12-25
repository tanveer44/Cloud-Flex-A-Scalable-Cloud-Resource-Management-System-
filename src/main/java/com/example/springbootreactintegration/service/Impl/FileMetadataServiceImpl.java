package com.example.springbootreactintegration.service.impl;

import com.example.springbootreactintegration.model.FileMetadata;
import com.example.springbootreactintegration.service.FileMetadataService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Service
public class FileMetadataServiceImpl implements FileMetadataService {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public FileMetadataServiceImpl(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public FileMetadata saveFileMetadata(FileMetadata fileMetadata) {
        String sql = "INSERT INTO siddharth_fileentity (storage_type, category, file_name) VALUES (?, ?, ?)";
        jdbcTemplate.update(sql, fileMetadata.getStorageType(), fileMetadata.getCategory(), fileMetadata.getFileName());
        return fileMetadata; // Optionally, fetch the saved entity for updated ID
    }

    @Override
    public List<FileMetadata> saveMultipleFileMetadata(List<FileMetadata> fileMetadataList) {
        String sql = "INSERT INTO siddharth_fileentity (storage_type, category, file_name) VALUES (?, ?, ?)";
        for (FileMetadata fileMetadata : fileMetadataList) {
            jdbcTemplate.update(sql, fileMetadata.getStorageType(), fileMetadata.getCategory(), fileMetadata.getFileName());
        }
        return fileMetadataList;
    }

    @Override
    public List<FileMetadata> getAllFileMetadata() {
        String sql = "SELECT * FROM siddharth_fileentity";
        return jdbcTemplate.query(sql, this::mapRowToFileMetadata);
    }

    @Override
    public FileMetadata getFileMetadataById(int id) {
        String sql = "SELECT * FROM siddharth_fileentity WHERE id = ?";
        return jdbcTemplate.queryForObject(sql, this::mapRowToFileMetadata, id);
    }

    @Override
    public FileMetadata updateFileMetadata(int id, FileMetadata updatedFileMetadata) {
        String sql = "UPDATE siddharth_fileentity SET storage_type = ?, category = ?, file_name = ? WHERE id = ?";
        jdbcTemplate.update(sql, updatedFileMetadata.getStorageType(), updatedFileMetadata.getCategory(),
                updatedFileMetadata.getFileName(), id);
        return updatedFileMetadata;
    }

    @Override
    public void deleteFileMetadata(int id) {
        String sql = "DELETE FROM siddharth_fileentity WHERE id = ?";
        jdbcTemplate.update(sql, id);
    }

    private FileMetadata mapRowToFileMetadata(ResultSet rs, int rowNum) throws SQLException {
        return new FileMetadata(
                rs.getInt("id"),
                rs.getString("storage_type"),
                rs.getString("category"),
                rs.getString("file_name")
        );
    }
}
