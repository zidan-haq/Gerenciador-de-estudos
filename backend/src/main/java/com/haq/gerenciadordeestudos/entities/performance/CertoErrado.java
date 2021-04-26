package com.haq.gerenciadordeestudos.entities.performance;

import java.io.Serializable;
import java.math.BigDecimal;
import java.math.MathContext;
import java.util.Calendar;

import com.haq.gerenciadordeestudos.entities.performance.abstracts.Proof;
import com.haq.gerenciadordeestudos.entities.performance.enums.RESULT;
import com.haq.gerenciadordeestudos.entities.performance.enums.TYPE;

public class CertoErrado extends Proof implements Serializable {
	private static final long serialVersionUID = 1L;

	public CertoErrado() {
		super();
	}
	
	public CertoErrado(Long id, String name, TYPE type, Calendar date, Integer corrects,
			Integer blanks, Integer wrongs) {
		super(id, name, type, date, corrects, blanks, wrongs);
	}

	public Integer getPositives() {
		Integer positives = getCorrects() - getWrongs();
		return positives;
	}
	
	@Override
	public Double getPercentage() {
		BigDecimal positives = new BigDecimal(getPositives().toString());
		BigDecimal hundred = new BigDecimal(100);
		BigDecimal quantQuestions = new BigDecimal(getQuantQuestions().toString());
		BigDecimal percentage = positives.multiply(hundred).divide(quantQuestions);
		percentage = percentage.round(new MathContext(2));
		return percentage.doubleValue();
	}

	@Override
	public RESULT getResult() {
		Double percentage = getPercentage();
		if(percentage > 75) {
			return RESULT.ALTO;
		}
		if(percentage > 66.66) {
			return RESULT.MEDIO;
		}
		return RESULT.BAIXO;
	}
}
