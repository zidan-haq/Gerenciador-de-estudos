package com.haq.gerenciadordeestudos.entities.performance.enums;

public enum QuestionStatus {
	WRONG(-1),
	BLANK(0),
	CORRECT(1);
	
	private int code;
	
	QuestionStatus(int code) {
		this.code = code;
	}
	
	public int getCode() {
		return code;
	}
	
	public static QuestionStatus valueOf(int code) {
		for(QuestionStatus value : QuestionStatus.values()) {
			if(value.getCode() == code) {
				return value;
			}
		}
		throw new IllegalArgumentException("Invalid QuestionStatus code.");
	}
}
