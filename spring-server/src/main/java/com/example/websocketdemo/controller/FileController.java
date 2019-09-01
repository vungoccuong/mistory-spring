package com.example.websocketdemo.controller;

import com.example.websocketdemo.dao.FileDao;
import com.example.websocketdemo.entities.FileUploadResponse;
import com.example.websocketdemo.model.FileModel;
import com.example.websocketdemo.model.UserModel;
import com.example.websocketdemo.service.FileStorageService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

@RestController
@RequestMapping("/file")
public class FileController {
    private static final Logger logger = LoggerFactory.getLogger(FileController.class);
    private final FileStorageService fileStorageService;
    private final FileDao fileDao;

    public FileController(FileStorageService fileStorageService, FileDao fileDao) {
        this.fileStorageService = fileStorageService;
        this.fileDao = fileDao;
    }

    @PostMapping(value = "/")
    public Responsible submit(@RequestParam("file") MultipartFile multipartFile, ModelMap modelMap,
                              Authentication authentication) {
        UserModel userModel = (UserModel) authentication.getCredentials();
        modelMap.addAttribute("file", multipartFile);
        FileModel model = FileModel.fromMultipartFile(multipartFile);
        model.setUploader(userModel.getId());
        model = fileDao.insert(model);
        fileStorageService.storeFile(multipartFile);
        return new FileUploadResponse(model.getId());
    }

    @GetMapping("/{name:.+}")
    public ResponseEntity<Resource> download(@PathVariable String name, HttpServletRequest request) {
        Resource resource = fileStorageService.loadFileAsResource(name);
        String contentType = null;
        try {
            contentType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());
        } catch (IOException ex) {
            logger.info("Could not determine file type.");
        }

        // Fallback to the default content type if type could not be determined
        if (contentType == null) {
            contentType = "application/octet-stream";
        }

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                .body(resource);
    }

}
