package com.haq.gerenciadordeestudos.resources.editais;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.haq.gerenciadordeestudos.entities.editais.Comment;
import com.haq.gerenciadordeestudos.repositories.editais.CommentRepository;

@RestController
@CrossOrigin
@RequestMapping(value = "/editais/comment")
public class CommentResource {
	
	@Autowired
	CommentRepository repository;
	
	@GetMapping(value = "/{id}")
	public ResponseEntity<Comment> findLink(@PathVariable("id") String id) {
		try {
			Long idLong = Long.parseLong(id);
			return ResponseEntity.ok(repository.getLink(idLong));
		} catch(NumberFormatException e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
		}
	}
	
	@PutMapping
	public ResponseEntity<Comment> updateLink(@RequestBody Comment comment) {
		return ResponseEntity.ok(repository.setLink(comment));
	}
}
