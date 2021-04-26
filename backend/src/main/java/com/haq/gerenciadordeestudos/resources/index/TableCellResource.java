package com.haq.gerenciadordeestudos.resources.index;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.haq.gerenciadordeestudos.entities.index.TableCell;
import com.haq.gerenciadordeestudos.repositories.index.TableCellRepository;

@RestController
@CrossOrigin
@RequestMapping(value = "/index/table")
public class TableCellResource {
	
	@Autowired
	TableCellRepository repository;
	
	@GetMapping
	public ResponseEntity<List<TableCell>> findAll() {
		return ResponseEntity.ok().body(repository.getAll());
	}
	
	@GetMapping(value = "/{position}")
	public ResponseEntity<TableCell> findCell(@PathVariable("position") String position) {
		return ResponseEntity.ok().body(repository.getCell(Integer.parseInt(position.substring(0,1)), 
				Integer.parseInt(position.substring(1)), "Matemática"));
	}
	
	@PutMapping
	public ResponseEntity<Boolean> saveAll(@RequestBody List<TableCell> list) {
		return ResponseEntity.ok().body(true);
	}
}
