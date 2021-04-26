package com.haq.gerenciadordeestudos.entities.editais;

import java.io.Serializable;

public class Box implements Serializable{
	private static final long serialVersionUID = 1L;
	
	private Long id;
	private String urlImage;
	private String content;
	
	public Box() {
	}
	
	public Box(Long id, String urlImage, String content) {
		super();
		this.id = id;
		this.urlImage = urlImage;
		this.content = content;
	}

	public Long getId() {
		return id;
	}
	
	public String getUrlImage() {
		return urlImage;
	}

	public void setUrlImage(String urlImage) {
		this.urlImage = urlImage;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}	
}
