package com.bookportal.backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/test")
public class TestController {
    @GetMapping("/public")
    public String publicEndpoint() {
        return "Public endpoint working";
    }

    @GetMapping("/private")
    public String privateEndpoint() {
        return "Only accesible with jwt";
    }
}
