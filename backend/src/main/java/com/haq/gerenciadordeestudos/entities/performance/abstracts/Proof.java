package com.haq.gerenciadordeestudos.entities.performance.abstracts;

import java.util.Calendar;

import com.haq.gerenciadordeestudos.entities.performance.enums.RESULT;
import com.haq.gerenciadordeestudos.entities.performance.enums.TYPE;

public abstract class Proof {
	private Long id;
	private String name;
	private TYPE type;
	private Calendar date;
	private Integer corrects;
	private Integer blanks;
	private Integer wrongs;

	public Proof() {
	}
	
	public Proof(Long id, String name, TYPE type, Calendar date, Integer corrects,
			Integer blanks, Integer wrongs) {
		this.id = id;
		this.name = name;
		this.type = type;
		this.date = date;
		this.corrects = corrects;
		this.blanks = blanks;
		this.wrongs = wrongs;
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

	public TYPE getType() {
		return type;
	}

	public void setType(TYPE type) {
		this.type = type;
	}

	public Calendar getDate() {
		return date;
	}

	public void setDate(Calendar date) {
		this.date = date;
	}

	public Integer getCorrects() {
		return corrects;
	}

	public void setCorrects(Integer corrects) {
		this.corrects = corrects;
	}

	public Integer getBlanks() {
		return blanks;
	}

	public void setBlanks(Integer blanks) {
		this.blanks = blanks;
	}

	public Integer getWrongs() {
		return wrongs;
	}

	public void setWrongs(Integer wrongs) {
		this.wrongs = wrongs;
	}
	
	public Integer getQuantQuestions() {
		return corrects + blanks + wrongs;
	}
	
	public abstract Double getPercentage();
	public abstract RESULT getResult();
}
