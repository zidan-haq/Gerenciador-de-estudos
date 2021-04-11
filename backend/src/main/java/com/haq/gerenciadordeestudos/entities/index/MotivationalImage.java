package com.haq.gerenciadordeestudos.entities.index;

import java.io.Serializable;

public class MotivationalImage implements Serializable {
	private static final long serialVersionUID = 1L;

	private Long id;
	private String url;
	
	public MotivationalImage(String url) {
		this.url = url;
	}
	
	public String getUrl() {
		return url;
	}
	
	public void setUrl(String url) {
		this.url = url;
	}
}
