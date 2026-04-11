package com.sellis.server.controller;

import com.sellis.server.dto.ApiResponse;
import com.mongodb.client.MongoClient;
import org.bson.Document;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;
import java.util.LinkedHashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/health")
public class HealthController {

    private final MongoClient mongoClient;
    private final Instant startedAt = Instant.now();

    public HealthController(MongoClient mongoClient) {
        this.mongoClient = mongoClient;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<Map<String, Object>>> health() {
        Map<String, Object> body = new LinkedHashMap<>();
        body.put("status", "UP");
        body.put("service", "sellis-server");
        body.put("timestamp", Instant.now().toString());
        return ResponseEntity.ok(ApiResponse.ok(body));
    }

    @GetMapping("/ping")
    public ResponseEntity<ApiResponse<Map<String, String>>> ping() {
        return ResponseEntity.ok(ApiResponse.ok(Map.of("message", "pong")));
    }

    @GetMapping("/db")
    public ResponseEntity<ApiResponse<Map<String, Object>>> db() {
        Map<String, Object> body = new LinkedHashMap<>();
        try {
            Document result = mongoClient.getDatabase("admin").runCommand(new Document("ping", 1));
            boolean ok = result.get("ok", Number.class).doubleValue() == 1.0;
            body.put("database", "mongodb");
            body.put("status", ok ? "UP" : "DOWN");
            return ResponseEntity.ok(ApiResponse.ok(body));
        } catch (Exception e) {
            body.put("database", "mongodb");
            body.put("status", "DOWN");
            body.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE)
                    .body(ApiResponse.error("Database unreachable"));
        }
    }

    @GetMapping("/info")
    public ResponseEntity<ApiResponse<Map<String, Object>>> info() {
        Runtime runtime = Runtime.getRuntime();
        Map<String, Object> body = new LinkedHashMap<>();
        body.put("service", "sellis-server");
        body.put("startedAt", startedAt.toString());
        body.put("uptimeSeconds", Instant.now().getEpochSecond() - startedAt.getEpochSecond());
        body.put("javaVersion", System.getProperty("java.version"));
        body.put("memoryMaxMb", runtime.maxMemory() / (1024 * 1024));
        body.put("memoryUsedMb", (runtime.totalMemory() - runtime.freeMemory()) / (1024 * 1024));
        return ResponseEntity.ok(ApiResponse.ok(body));
    }
}
