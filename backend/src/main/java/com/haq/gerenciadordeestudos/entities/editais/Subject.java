package com.haq.gerenciadordeestudos.entities.editais;

import java.io.Serializable;

public class Subject implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private Long id;
	private String name;
	private String content;
	
	public Subject() {
	}

	public Subject(Long id, String name, String content) {
		super();
		this.id = id;
		this.name = name;
		this.content = content;
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

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}
}
