package com.example.cerena.controller;

import java.io.IOException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import org.springframework.lang.NonNull;
import org.springframework.web.socket.BinaryMessage;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.BinaryWebSocketHandler;

public class VideoStreamHandler extends BinaryWebSocketHandler {
    private final ExecutorService executorService = Executors.newSingleThreadExecutor();

    @Override
    public void afterConnectionEstablished(@NonNull WebSocketSession session) throws Exception {
        System.out.println("Connection established: " + session.getId());
    }

    @Override
    protected void handleBinaryMessage(@NonNull WebSocketSession session, @NonNull BinaryMessage message)
            throws IOException {
        byte[] payload = message.getPayload().array();
        executorService.execute(() -> {
            System.out.println("Received " + payload.length + " bytes");
        });
    }

    @Override
    public void afterConnectionClosed(@NonNull WebSocketSession session, @NonNull CloseStatus status) throws Exception {
        System.out.println("Connection closed: " + session.getId());
        executorService.shutdown();
    }
}
