package com.haq.gerenciadordeestudos.resources.performance;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.haq.gerenciadordeestudos.dto.performance.GeneralPerformance;

@RestController
@CrossOrigin
@RequestMapping(value = "/performance/general-performance")
public class GeneralPerformanceResource {
	
	@PostMapping
	public ResponseEntity<GeneralPerformance> calculate(@RequestBody GeneralPerformance datas) {
		return ResponseEntity.ok(datas);
	}
}
