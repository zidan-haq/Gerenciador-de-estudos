package com.haq.gerenciadordeestudos.resources.performance;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.haq.gerenciadordeestudos.dto.performance.Ranking;
import com.haq.gerenciadordeestudos.repositories.performance.RankingRepository;

@RestController
@CrossOrigin
@RequestMapping(value = "/performance/ranking")
public class RankingResource {

	@Autowired
	RankingRepository repository;
	
	@GetMapping
	public ResponseEntity<List<Ranking>> find() {
		return ResponseEntity.ok(repository.getRanking());
	}
}
