package com.haq.gerenciadordeestudos.entities.performance.enums;

public enum Type {
	MULTIPLA_ESCOLHA("multipla escolha"),
	CERTO_E_ERRADO("certo e errado");
	
	private String description;
	
	Type(String description) {
		this.description = description;
	}
	
	public String getDescription() {
		return description;
	}
}
