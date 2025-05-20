package dev.sudheer.amazon_clone.config;

import com.google.auth.http.HttpCredentialsAdapter;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.http.HttpRequestInitializer;
import com.google.api.client.json.gson.GsonFactory;
import com.google.api.services.drive.Drive;
import com.google.api.services.drive.DriveScopes;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;

import java.io.IOException;
import java.io.InputStream;
import java.security.GeneralSecurityException;
import java.util.Collections;

@Configuration
public class GoogleDriveConfig {

    @Value("${google.drive.service-account-key}")
    private String serviceAccountKeyPath;

    @Value("${google.drive.folder-id}")
    private String folderId;

    @Bean
    public Drive driveService() throws GeneralSecurityException, IOException {
        final var HTTP_TRANSPORT = GoogleNetHttpTransport.newTrustedTransport();
        final var JSON_FACTORY = GsonFactory.getDefaultInstance();

        // Load credentials
        InputStream in = new ClassPathResource(serviceAccountKeyPath).getInputStream();
        GoogleCredentials credentials = GoogleCredentials.fromStream(in)
                .createScoped(Collections.singleton(DriveScopes.DRIVE));

        // Properly wrap credentials
        HttpRequestInitializer requestInitializer = new HttpCredentialsAdapter(credentials);

        return new Drive.Builder(HTTP_TRANSPORT, JSON_FACTORY, requestInitializer)
                .setApplicationName("Amazon Clone")
                .build();
    }

    public String getFolderId() {
        return folderId;
    }
}