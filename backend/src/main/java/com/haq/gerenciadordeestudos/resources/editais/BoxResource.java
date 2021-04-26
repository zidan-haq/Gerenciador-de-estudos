package com.haq.gerenciadordeestudos.resources.editais;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.haq.gerenciadordeestudos.entities.editais.Box;
import com.haq.gerenciadordeestudos.repositories.editais.BoxRepository;

@RestController
@CrossOrigin
@RequestMapping(value = "/editais")
public class BoxResource {
	
	@Autowired
	BoxRepository repository;
	
	@GetMapping
	public ResponseEntity<List<Box>> findAll() {
		return ResponseEntity.ok().body(repository.getAll());
	}
	
	@GetMapping(value = "/{id}")
	public ResponseEntity<Box> findBox(@PathVariable("id") String id) {
		try {
			Long idLong = Long.parseLong(id);
			return ResponseEntity.ok().body(repository.getBox(idLong));
		} catch (NumberFormatException e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
		}
	}
	
	@PutMapping
	public ResponseEntity<Box> updateBox(@RequestBody Box box) {
		return ResponseEntity.ok().body(repository.setBox(box));
	}
	
	@PostMapping
	public ResponseEntity<Box> addBox(@RequestBody Box box) {
		return ResponseEntity.ok().body(repository.addBox(box));
	}
	
	@DeleteMapping(value = "/{id}")
	public ResponseEntity<Boolean> removeBox(@PathVariable("id") String id) {
		try {
			Long idLong = Long.parseLong(id);
			return ResponseEntity.ok().body(repository.removeBox(idLong));
		} catch (NumberFormatException e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
		}
	}
}
