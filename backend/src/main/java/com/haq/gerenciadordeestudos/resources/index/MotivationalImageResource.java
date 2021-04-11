package com.haq.gerenciadordeestudos.resources.index;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.haq.gerenciadordeestudos.entities.index.MotivationalImage;

@RestController
@RequestMapping(value = "/index/image")
public class MotivationalImageResource {
	
	@GetMapping
	public ResponseEntity<MotivationalImage> findUrlImage() {
		
		MotivationalImage url = new MotivationalImage("https://cdn.pensador.com/img/frase/ch/ar/charles_chaplin_a_persistencia_e_o_caminho_do_exito_lpx3e62.jpg");
		
		return ResponseEntity.ok().body(url);
	}
}
