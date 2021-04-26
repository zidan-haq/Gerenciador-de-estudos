package com.haq.gerenciadordeestudos.entities.index;

import java.io.Serializable;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

public class Material implements Serializable{
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String url;
	private String alias;
	
	public Material() {
	}
	
	public Material(Long id, String url, String alias) {
		super();
		this.id = id;
		this.url = url;
		this.alias = alias;
	}
	
	public Material(String url, String alias) {
		super();
		this.url = url;
		this.alias = alias;
	}
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public String getAlias() {
		return alias;
	}

	public void setAlias(String alias) {
		this.alias = alias;
	}
}
