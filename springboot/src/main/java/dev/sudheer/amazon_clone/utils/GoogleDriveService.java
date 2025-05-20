package dev.sudheer.amazon_clone.utils;

import com.google.api.client.http.ByteArrayContent;
import java.util.*;
import com.google.api.services.drive.Drive;
import com.google.api.services.drive.model.File;
import dev.sudheer.amazon_clone.config.GoogleDriveConfig;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.security.GeneralSecurityException;


@Service
public class GoogleDriveService {
    private static final long MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB limit
    private final Drive drive;
    private final String folderId;

    public GoogleDriveService(Drive drive, GoogleDriveConfig driveConfig) {
        this.drive = drive;
        this.folderId = driveConfig.getFolderId();
    }

    public String uploadFile(byte[] fileBytes, String fileName, String mimeType) 
            throws IOException, GeneralSecurityException {
        
        // Validate inputs
        if (fileBytes == null || fileBytes.length == 0) {
            throw new IllegalArgumentException("File bytes cannot be null or empty");
        }
        if (fileName == null || fileName.trim().isEmpty()) {
            throw new IllegalArgumentException("File name cannot be null or empty");
        }
        if (fileBytes.length > MAX_FILE_SIZE) {
            throw new IllegalArgumentException("File size exceeds maximum limit of 10MB");
        }

        File fileMetadata = new File();
        fileMetadata.setName(fileName);
        if (folderId != null && !folderId.trim().isEmpty()) {
            fileMetadata.setParents(Collections.singletonList(folderId));
        }

        ByteArrayContent mediaContent = new ByteArrayContent(mimeType, fileBytes);

        File file = drive.files().create(fileMetadata, mediaContent)
                .setFields("id, webViewLink")
                .execute();

        // Use webViewLink if available, otherwise fall back to the export URL
        return file.getWebViewLink() != null ? 
               file.getWebViewLink() :
               String.format("https://drive.google.com/uc?export=view&id=%s", file.getId());
    }

    public String uploadBase64File(String base64Data, String fileName, String mimeType) 
            throws IOException, GeneralSecurityException {
        if (base64Data == null || base64Data.isEmpty()) {
            throw new IllegalArgumentException("Base64 data cannot be null or empty");
        }

        // Handle data URL format (optional)
        String base64Image = base64Data.contains(",") ? 
                            base64Data.split(",")[1] : 
                            base64Data;
        
        try {
            byte[] fileBytes = Base64.getDecoder().decode(base64Image);
            return uploadFile(fileBytes, fileName, mimeType);
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Invalid Base64 data", e);
        }
    }
}