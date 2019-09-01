package com.example.websocketdemo.controller;

import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

@RestController
@RequestMapping("/file")
public class FileController {
    @PostMapping(value = "/")
    public String submit(@RequestParam("file") MultipartFile multipartFile, ModelMap modelMap) {
        modelMap.addAttribute("file", multipartFile);
        String fileName = multipartFile.getOriginalFilename();
        assert fileName != null;
        File file = new File("src/resource/static/file", fileName);
        try {
            multipartFile.transferTo(file);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return "fileUploadView";
    }
}
