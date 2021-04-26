package com.haq.gerenciadordeestudos.repositories.index;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;

import com.haq.gerenciadordeestudos.entities.index.Material;

@Component
public class MaterialRepository {
	public MaterialRepository() {
	}
	
	public List<Material> getAll() {
		List<Material> list = new ArrayList<>();
		list.add(new Material("https://www.estrategiaconcursos.com.br/blog/resumos-policia-federal/", "Resumão em vídeo PF"));
		list.add(new Material("file:///home/manjaro/Documentos/Resumo HTML, CSS e JavaScript.odt", "Resumo Frontend"));
		list.add(new Material("https://validator.w3.org/#validate_by_upload+with_options", "Validação de HTML"));
		list.add(new Material("https://developer.mozilla.org/pt-BR/docs/Learn/Front-end_web_developer", "Curso MDN Front-end"));
		return list;
	}
	
	public Material save(Material material) {
		return new Material(123L, material.getUrl(), material.getAlias());
	}
	
	public Boolean remove(Long id) {
		return true;
	}
}
