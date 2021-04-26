package com.haq.gerenciadordeestudos.repositories.editais;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.haq.gerenciadordeestudos.entities.editais.Subject;

@Repository
public class SubjectRepository {
	public SubjectRepository() {
	}
	
	public List<Subject> getAll() {
		List<Subject> list = new ArrayList<>();
		list.add(new Subject(1L, "Português", "redação oficial\nAnálise e interpretação de texto\nRegência varbal"));
		list.add(new Subject(2L, "Raciocínio Lógico e Matemático", "Conjuntos numéricos\nProbabilidade\nProposições Lógicas"));
		list.add(new Subject(3L, "Contabilidade", "Escrituração contábil\nmétodo das partidas dobradas\nCPC 00"));
		list.add(new Subject(4L, "Informática", "Big Data Analitics\nSegurança da informação\nTGS"));
		list.add(new Subject(1L, "Estatística", "ANOVA\nAnálise de resíduos\nAmostragem"));		
		return list;
	}
	
	public Subject setSubject(Subject subject) {
		Subject newSubject = new Subject(1L, "O nome não foi alterado", "O conteúdo não foi alterado");
		newSubject.setId(subject.getId());
		if(subject.getName() != null) {
			newSubject.setName(subject.getName());
		}
		if(subject.getContent() != null) {
			newSubject.setContent(subject.getContent());
		}
		return (subject);
	}
	
	public Boolean removeSubject(Long id) {
		return true;
	}
	
	public Subject addSubject() {
		return (new Subject(4545L, "Foi criado com id 4545L", null));
	}
}
