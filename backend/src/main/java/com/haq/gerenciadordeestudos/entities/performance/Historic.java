package com.haq.gerenciadordeestudos.entities.performance;

import java.io.Serializable;
import java.util.Calendar;

public class Historic implements Serializable {
	private static final long serialVersionUID = 1L;

	private Double averageGrade;
	private Calendar lastDate;
	private Integer quantProofs;
	private Integer quantSubjects;
	
	public Historic() {
	}

	public Historic(Double averageGrade, Calendar lastDate, Integer quantProofs, Integer quantSubjects) {
		super();
		this.averageGrade = averageGrade;
		this.lastDate = lastDate;
		this.quantProofs = quantProofs;
		this.quantSubjects = quantSubjects;
	}

	public Double getAverageGrade() {
		return averageGrade;
	}

	public void setAverageGrade(Double averageGrade) {
		this.averageGrade = averageGrade;
	}

	public Calendar getLastDate() {
		return lastDate;
	}

	public void setLastDate(Calendar lastDate) {
		this.lastDate = lastDate;
	}

	public Integer getQuantProofs() {
		return quantProofs;
	}

	public void setQuantProofs(Integer quantProofs) {
		this.quantProofs = quantProofs;
	}

	public Integer getQuantSubjects() {
		return quantSubjects;
	}

	public void setQuantSubjects(Integer quantSubjects) {
		this.quantSubjects = quantSubjects;
	}
}
