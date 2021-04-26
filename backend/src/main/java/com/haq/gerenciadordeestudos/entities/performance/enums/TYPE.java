package com.haq.gerenciadordeestudos.entities.performance.enums;

public enum TYPE {
	MULTIPLA_ESCOLHA("multipla escolha"),
	CERTO_E_ERRADO("certo e errado");
	
	private String description;
	
	TYPE(String description) {
		this.description = description;
	}
	
	public String getDescription() {
		return description;
	}
}
