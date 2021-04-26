package com.haq.gerenciadordeestudos.resources.performance;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.haq.gerenciadordeestudos.entities.performance.Historic;
import com.haq.gerenciadordeestudos.repositories.performance.HistoricRepository;

@RestController
@CrossOrigin
@RequestMapping(value = "/performance")
public class HistoricResource {

	@Autowired
	HistoricRepository repository;

	@GetMapping
	public ResponseEntity<Boolean> thereIsRecord() {
		return ResponseEntity.ok(repository.thereIsRecord());
	}

	@GetMapping(value = "/historic")
	public ResponseEntity<Historic> findHistoric() {
		return ResponseEntity.ok(repository.getHistoric());
	}
}
