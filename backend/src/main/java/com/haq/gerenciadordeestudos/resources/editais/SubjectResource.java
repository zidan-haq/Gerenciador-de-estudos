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

import com.haq.gerenciadordeestudos.entities.editais.Subject;
import com.haq.gerenciadordeestudos.repositories.editais.SubjectRepository;

@RestController
@CrossOrigin
@RequestMapping(value = "/editais/subject")
public class SubjectResource {
	
	@Autowired
	SubjectRepository repository;
	
	@GetMapping
	public ResponseEntity<List<Subject>> findAll() {
		return ResponseEntity.ok(repository.getAll());
	}
	
	@PutMapping
	public ResponseEntity<Subject> updateSubject(@RequestBody Subject subject) {
		return ResponseEntity.ok(repository.setSubject(subject));
	}
	
	@DeleteMapping(value = "/{id}")
	public ResponseEntity<Boolean> removeSubject(@PathVariable("id") String id) {
		try {
			Long idLong = Long.parseLong(id);
			return ResponseEntity.ok(repository.removeSubject(idLong));
		} catch (NumberFormatException e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
		}
	}
	
	@PostMapping
	public ResponseEntity<Subject> addSubject() {
		return ResponseEntity.ok(repository.addSubject());
	}
}
