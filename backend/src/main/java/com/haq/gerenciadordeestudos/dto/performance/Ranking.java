package com.haq.gerenciadordeestudos.dto.performance;

public class Ranking {
	private String name;
	private Integer quantQuestions;
	private Double percentage;
	
	public Ranking() {
	}
	
	public Ranking(String name, Integer quantQuestions, Double percentage) {
		this.name = name;
		this.quantQuestions = quantQuestions;
		this.percentage = percentage;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Integer getQuantQuestions() {
		return quantQuestions;
	}

	public void setQuantQuestions(Integer quantQuestions) {
		this.quantQuestions = quantQuestions;
	}

	public Double getPercentage() {
		return percentage;
	}

	public void setPercentage(Double percentage) {
		this.percentage = percentage;
	}
}
