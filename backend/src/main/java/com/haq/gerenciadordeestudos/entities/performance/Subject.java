package com.haq.gerenciadordeestudos.entities.performance;

import java.io.Serializable;
import java.math.BigDecimal;
import java.math.MathContext;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

public class Subject implements Serializable {
	private static final long serialVersionUID = 1L;

	private Long id;
	private String name;
	@JsonIgnore
	private List<Question> questions;

	public Subject() {
	}

	public Subject(Long id, String name, List<Question> questions) {
		this.id = id;
		this.name = name;
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

	public List<Question> getQuestions() {
		return questions;
	}

	public void setQuestions(List<Question> questions) {
		this.questions = questions;
	}

	public int getPoints() {
		int positives = getQuestions().stream()
				.mapToInt(question -> question.getPoint())
				.reduce(0, (v1, v2) -> v1 + v2);
		return positives;
	}

	public Double getPercentage() {
		BigDecimal points = new BigDecimal(getPoints());
		BigDecimal hundred = new BigDecimal(100);
		BigDecimal quantQuestions = new BigDecimal(getQuestions().size());
		BigDecimal percentage = points.multiply(hundred).divide(quantQuestions);
		percentage = percentage.round(new MathContext(2));
		return percentage.doubleValue();
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((name == null) ? 0 : name.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Subject other = (Subject) obj;
		if (name == null) {
			if (other.name != null)
				return false;
		} else if (!name.equals(other.name))
			return false;
		return true;
	}
}
