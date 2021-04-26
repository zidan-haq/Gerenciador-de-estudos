package com.haq.gerenciadordeestudos.entities.performance.enums;

public enum RESULT {
	ALTO("Alto"),
	MEDIO("Médio"),
	BAIXO("Baixo");
	
	public String description;
	
	RESULT(String description) {
		this.description = description;
	}
	
	public String getDescription() {
		return description;
	}
}
