package com.haq.gerenciadordeestudos.entities.performance;

import java.io.Serializable;
import java.math.BigDecimal;
import java.math.MathContext;
import java.util.Calendar;

import com.haq.gerenciadordeestudos.entities.performance.abstracts.Proof;
import com.haq.gerenciadordeestudos.entities.performance.enums.RESULT;
import com.haq.gerenciadordeestudos.entities.performance.enums.TYPE;

public class MultiplaEscolha extends Proof implements Serializable {
	private static final long serialVersionUID = 1L;

	public MultiplaEscolha() {
		super();
	}

	public MultiplaEscolha(Long id, String name, TYPE type, Calendar date, Integer corrects,
			Integer blanks, Integer wrongs) {
		super(id, name, type, date, corrects, blanks, wrongs);
	}
	
	@Override
	public Double getPercentage() {
		BigDecimal corrects = new BigDecimal(getCorrects().toString());
		BigDecimal hundred = new BigDecimal(100);
		BigDecimal quantQuestions = new BigDecimal(getQuantQuestions().toString());
		BigDecimal percentage = corrects.multiply(hundred).divide(quantQuestions);
		percentage = percentage.round(new MathContext(2));
		return percentage.doubleValue();
	}

	@Override
	public RESULT getResult() {
		Double percentage = getPercentage();
		if(percentage > 80) {
			return RESULT.ALTO;
		}
		if(percentage > 70) {
			return RESULT.MEDIO;
		}
		return RESULT.BAIXO;
	}
}
