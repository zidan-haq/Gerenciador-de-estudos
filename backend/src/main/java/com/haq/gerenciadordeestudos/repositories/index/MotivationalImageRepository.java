package com.haq.gerenciadordeestudos.repositories.index;

import java.io.IOException;
import java.util.List;
import java.util.Random;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.springframework.stereotype.Component;

import com.haq.gerenciadordeestudos.entities.index.MotivationalImage;

@Component
public class MotivationalImageRepository {
	public MotivationalImageRepository() {
	}

	public MotivationalImage getImageUrl() {
		return new MotivationalImage(findUrl());
	}

	private String findUrl() {
		try {
			int random = new Random().nextInt(10);
			Document doc = random == 0 ?
					Jsoup.connect("https://www.pensador.com/frases_de_motivacao/").get() : 
					Jsoup.connect("https://www.pensador.com/frases_de_motivacao/" + random).get();

			List<String> list = doc.select(".thought-card").eachAttr("data-src");

			return list.get(new Random().nextInt(list.size() - 1));
		} catch (IOException e) {
			return "https://cdn.pensador.com/img/frase/ch/ar/charles_chaplin_a_persistencia_e_o_caminho_do_exito_lpx3e62.jpg";
		}
	}
}
