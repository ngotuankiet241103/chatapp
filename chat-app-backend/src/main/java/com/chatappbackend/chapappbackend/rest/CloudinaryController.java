package com.chatappbackend.chapappbackend.rest;

import com.chatappbackend.chapappbackend.request.FileRequest;
import com.chatappbackend.chapappbackend.response.ResponseApi;
import com.chatappbackend.chapappbackend.service.UploadImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class CloudinaryController {
    private final UploadImageService fileUpload;
    @PostMapping("/file/upload")
    public ResponseEntity<?> uploadToCloud(@ModelAttribute FileRequest fileRequest){
        ResponseApi responseApi = new ResponseApi();
        try {
            if (fileRequest.getFile() != null) {
                String url = fileUpload.uploadImage(fileRequest.getFile());
                responseApi.setStatus(HttpStatus.OK.toString());
                responseApi.setMessage("upload file success");
                responseApi.setData(url);
            }
        } catch (IOException e) {
            // TODO Auto-generated catch block
            responseApi.setStatus(HttpStatus.BAD_REQUEST.toString());
            responseApi.setMessage("Upload file fail");
            e.printStackTrace();
        }
        return  ResponseEntity.ok(responseApi);
    }
}
