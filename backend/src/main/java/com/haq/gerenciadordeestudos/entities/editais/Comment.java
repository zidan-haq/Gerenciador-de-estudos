package com.haq.gerenciadordeestudos.entities.editais;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonIgnore;

public class Comment implements Serializable {
	private static final long serialVersionUID = 1L;

	private Long id;
	private String comments;
	
	public Comment() {
	}
	
	public Comment(Long id, String comments) {
		this.id = id;
		this.comments = comments;
	}

	@JsonIgnore
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getComments() {
		return comments;
	}

	public void setComments(String comments) {
		this.comments = comments;
	}
}
