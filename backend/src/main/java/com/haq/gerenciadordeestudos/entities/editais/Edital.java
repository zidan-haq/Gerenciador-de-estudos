package com.haq.gerenciadordeestudos.entities.editais;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonIgnore;

public class Edital implements Serializable {
	private static final long serialVersionUID = 1L;

	private Long id;
	private String link;
	
	public Edital() {
	}
	
	public Edital(Long id, String link) {
		super();
		this.id = id;
		this.link = link;
	}
	
	@JsonIgnore
	public Long getId() {
		return id;
	}
	
	public void setId(Long id) {
		this.id = id;
	}
	
	public String getLink() {
		return link;
	}

	public void setLink(String link) {
		this.link = link;
	}
}
