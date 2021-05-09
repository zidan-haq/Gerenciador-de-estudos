package com.haq.gerenciadordeestudos.entities.performance;

import java.io.Serializable;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.Calendar;
import java.util.List;

import com.haq.gerenciadordeestudos.entities.performance.enums.Result;
import com.haq.gerenciadordeestudos.entities.performance.enums.Type;

public class Proof implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private Long id;
	private String name;
	private Type type;
	private Calendar date;
	private List<Question> questions;

	public Proof() {
	}

	public Proof(Long id, String name, Type type, Calendar date, List<Question> questions) {
		this.id = id;
		this.name = name;
		this.type = type;
		this.date = date;
		this.questions = questions;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Type getType() {
		return type;
	}

	public void setType(Type type) {
		this.type = type;
	}

	public Calendar getDate() {
		return date;
	}

	public void setDate(Calendar date) {
		this.date = date;
	}

	public List<Question> getQuestions() {
		return questions;
	}

	public void setQuestions(List<Question> questions) {
		this.questions = questions;
	}

	public int getPoints() {
		int positives = getQuestions().stream()
				.mapToInt(question -> question.getPoint())
				.reduce(0, Integer::sum);
		return positives;
	}
	
	public Double getPercentage() {
		BigDecimal points = new BigDecimal(getPoints());
		BigDecimal hundred = new BigDecimal(100);
		BigDecimal quantQuestions = new BigDecimal(getQuestions().size());
		BigDecimal percentage = points.multiply(hundred).divide(quantQuestions);
		percentage = percentage.setScale(2, RoundingMode.HALF_EVEN);
		return percentage.doubleValue();
	}

	public Result getResult() {
		double high = 80;
		double average = 70;
		Double percentage = getPercentage();
		
		if(type == Type.CERTO_E_ERRADO) {
			high = 75;
			average = 66.66;
		}
		
		if (percentage > high) {
			return Result.ALTO;
		}
		if (percentage > average) {
			return Result.MEDIO;
		}
		return Result.BAIXO;
	}
}
