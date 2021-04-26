package com.haq.gerenciadordeestudos.resources.index;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.haq.gerenciadordeestudos.entities.index.Material;
import com.haq.gerenciadordeestudos.repositories.index.MaterialRepository;

@RestController
@CrossOrigin
@RequestMapping(value = "/index/materials")
public class MaterialResource {

	@Autowired
	MaterialRepository repository;

	@GetMapping
	public ResponseEntity<List<Material>> findAll() {
		return ResponseEntity.ok().body(repository.getAll());
	}

	@PostMapping
	public ResponseEntity<Material> save(@RequestBody Material material) {
		return ResponseEntity.ok().body(repository.save(material));
	}

	@DeleteMapping(value = "/{id}")
	public ResponseEntity<Boolean> remove(@PathVariable("id") String id) {
		try {
			Long idLong = Long.parseLong(id);
			return ResponseEntity.ok(repository.remove(idLong));
		} catch (NumberFormatException e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
		}
	}
}
