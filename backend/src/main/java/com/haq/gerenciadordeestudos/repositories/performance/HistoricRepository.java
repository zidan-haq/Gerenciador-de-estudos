package com.haq.gerenciadordeestudos.repositories.performance;

import java.util.Calendar;

import org.springframework.stereotype.Repository;

import com.haq.gerenciadordeestudos.entities.performance.Historic;

@Repository
public class HistoricRepository {
	public Boolean thereIsRecord() {
		return true;
	}
	
	public Historic getHistoric() {
		return new Historic(68.00, Calendar.getInstance(), 3, 10);
	}
}
