package dev.sudheer.amazon_clone.service;

import java.util.Base64;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.fasterxml.jackson.databind.node.ArrayNode;

@Service
public class OpenAIService {

    @Value("${openai.api.key}")
    private String apiKey;

    private static final String VISION_MODEL = "gpt-4-turbo";

    public String analyzeImageCategory(byte[] imageBytes, String imageUrl) throws Exception {
        if (apiKey == null || apiKey.isEmpty()) {
            throw new IllegalStateException("OpenAI API key is not configured");
        }

        String prompt = "Analyze this product image and respond with ONLY the most relevant product category " +
                      "from these options: Mobile, watches, headphones. " +
                      "Just return the single most relevant category name, nothing else.";

        CloseableHttpClient client = HttpClients.createDefault();
        HttpPost post = new HttpPost("https://api.openai.com/v1/chat/completions");
        post.setHeader("Authorization", "Bearer " + apiKey);
        post.setHeader("Content-Type", "application/json");

        ObjectMapper mapper = new ObjectMapper();
        ObjectNode requestBody = mapper.createObjectNode();
        
        // Create messages array (ArrayNode)
        ArrayNode messagesArray = mapper.createArrayNode();
        
        // Create message object (ObjectNode)
        ObjectNode message = mapper.createObjectNode();
        message.put("role", "user");
        
        // Create content array (ArrayNode)
        ArrayNode contentArray = mapper.createArrayNode();
        
        // Add text prompt (ObjectNode)
        ObjectNode textContent = mapper.createObjectNode();
        textContent.put("type", "text");
        textContent.put("text", prompt);
        contentArray.add(textContent);
        
        // Add image content (ObjectNode)
        ObjectNode imageContent = mapper.createObjectNode();
        imageContent.put("type", "image_url");
        
        // Create image_url object (ObjectNode)
        ObjectNode imageUrlObject = mapper.createObjectNode();
        
        if (imageBytes != null) {
            String base64Image = Base64.getEncoder().encodeToString(imageBytes);
            imageUrlObject.put("url", "data:image/jpeg;base64," + base64Image);
        } else if (imageUrl != null) {
            imageUrlObject.put("url", imageUrl);
        } else {
            throw new IllegalArgumentException("Either imageBytes or imageUrl must be provided");
        }
        
        imageContent.set("image_url", imageUrlObject);
        contentArray.add(imageContent);
        
        message.set("content", contentArray);
        messagesArray.add(message);
        requestBody.set("messages", messagesArray);
        requestBody.put("model", VISION_MODEL);
        requestBody.put("max_tokens", 300);
        requestBody.put("temperature", 0.0);
        
        post.setEntity(new StringEntity(mapper.writeValueAsString(requestBody)));

        try (CloseableHttpResponse response = client.execute(post)) {
            String responseBody = EntityUtils.toString(response.getEntity());
            System.out.println("Raw API Response: " + responseBody);
            
            JsonNode responseJson = mapper.readTree(responseBody);
            
            if (responseJson.has("error")) {
                throw new RuntimeException("OpenAI API error: " + 
                    responseJson.path("error").path("message").asText());
            }
            
            String category = responseJson.path("choices")
                .path(0)
                .path("message")
                .path("content")
                .asText()
                .trim()
                .toLowerCase();
                
            System.out.println("Extracted Category: " + category);
            
            if (!category.matches("mobile|watches|headphones")) {
                throw new RuntimeException("Unexpected category: " + category);
            }
            
            return category;
        }
    }
}