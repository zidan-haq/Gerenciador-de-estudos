package com.haq.gerenciadordeestudos.repositories.editais;

import org.springframework.stereotype.Repository;

import com.haq.gerenciadordeestudos.entities.editais.Edital;

@Repository
public class EditalRepository {
	public EditalRepository() {
	}
	
	public Edital getLink(Long id) {
		return new Edital(id, String.format("http://link.referenteaoid%d.com", id));
	}
	
	public Edital setLink(Edital edital) {
		return edital;
	}
}
