package com.haq.gerenciadordeestudos.repositories.performance;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.haq.gerenciadordeestudos.entities.performance.Ranking;

@Repository
public class RankingRepository {
	public List<Ranking> getRanking() {
		List<Ranking> list = new ArrayList<>();
		list.add(new Ranking("Português", 200, 65.00));
		list.add(new Ranking("Matemática", 60, 90.00));
		list.add(new Ranking("Contabilidade", 250, 60.00));
		list.add(new Ranking("Informática", 150, 70.00));
		list.add(new Ranking("Estatística", 50, 85.00));
		list.add(new Ranking("Direito Administrativo", 100, 80.00));
		return list;
	}
}
