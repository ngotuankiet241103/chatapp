package com.chatappbackend.chapappbackend.service;

import com.chatappbackend.chapappbackend.request.FileRequest;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface UploadImageService {
    String uploadImage(MultipartFile file) throws IOException;
}
