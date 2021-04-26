package com.haq.gerenciadordeestudos.resources.index;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.haq.gerenciadordeestudos.entities.index.MotivationalImage;
import com.haq.gerenciadordeestudos.repositories.index.MotivationalImageRepository;

@RestController
@CrossOrigin(origins = "http://127.0.0.1:5500")
@RequestMapping(value = "/index/image")
public class MotivationalImageResource {
	@Autowired
	MotivationalImageRepository url;
	
	@GetMapping
	public ResponseEntity<MotivationalImage> findUrlImage() {
		return ResponseEntity.ok().body(url.getImageUrl());
	}
}
