package com.haq.gerenciadordeestudos.entities.performance.enums;

public enum Result {
	ALTO("Alto"),
	MEDIO("Médio"),
	BAIXO("Baixo");
	
	public String description;
	
	Result(String description) {
		this.description = description;
	}
	
	public String getDescription() {
		return description;
	}
}
