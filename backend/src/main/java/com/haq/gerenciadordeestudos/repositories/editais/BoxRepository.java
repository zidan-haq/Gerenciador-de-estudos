package com.haq.gerenciadordeestudos.repositories.editais;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;

import com.haq.gerenciadordeestudos.entities.editais.Box;

@Component
public class BoxRepository {
	public BoxRepository() {
	}
	
	public List<Box> getAll() {
		List<Box> list = new ArrayList<>();
		list.add(new Box(01L, "./images/logo-pcdf.png", "PCDF 2019 Escrivão"));
		list.add(new Box(02L, "./images/logo-pcdf.png", "PCDF 2020 Agente"));
		list.add(new Box(03L, "./images/logo-pf.png", "PF 2020 Agente"));
		list.add(new Box(04L, "https://www.serpro.gov.br/menu/quem-somos/marca-serpro/formatos-marca/copy_of_AssinaturaSerproeGovernoFederalverticalpositiva03.svg", "Serpro 2021 Dev. Sistem."));

		return list;
	}
	
	public Box getBox(Long id) {
		return new Box(id, "./images/logo-pcdf.png", "PCDF 2019 Escrivão");
	}
	
	public Box setBox(Box box) {
		return box;
	}
	
	public Box addBox(Box box) {
		return new Box(17700L, box.getUrlImage(), box.getContent());
	}
	
	public Boolean removeBox(Long id) {
		return true;
	}
}
