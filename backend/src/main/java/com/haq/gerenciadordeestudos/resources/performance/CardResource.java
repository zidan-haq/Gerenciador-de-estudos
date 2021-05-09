package com.haq.gerenciadordeestudos.resources.performance;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.haq.gerenciadordeestudos.dto.performance.Card;
import com.haq.gerenciadordeestudos.repositories.performance.CardRepository;

@RestController
@CrossOrigin
@RequestMapping(value = "/performance/proofs")
public class CardResource {
	
	@Autowired
	private CardRepository repository;
	
	@GetMapping
	public ResponseEntity<List<Card>> findAll() {
		return ResponseEntity.ok(repository.getAll());
	}
	
	@DeleteMapping
	public ResponseEntity<Boolean> removeAll() {
		return ResponseEntity.ok(repository.removeAll());
	}
}
