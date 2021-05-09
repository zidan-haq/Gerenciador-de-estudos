package com.haq.gerenciadordeestudos.entities.performance;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.haq.gerenciadordeestudos.entities.performance.enums.QuestionStatus;
import com.haq.gerenciadordeestudos.entities.performance.enums.Type;

public class Question implements Serializable {
	private static final long serialVersionUID = 1L;

	private Long id;
	
	@JsonIgnore
	private Subject subject;
	@JsonIgnore
	private Proof proof;
	
	private Type type;
	private QuestionStatus status;

	public Question() {
	}

	public Question(Long id, Subject subject, Proof proof, QuestionStatus status, Type type) {
		this.id = id;
		this.subject = subject;
		this.proof = proof;
		this.status = status;
		this.type = type;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Subject getSubject() {
		return subject;
	}

	public void setSubject(Subject subject) {
		this.subject = subject;
	}

	public Proof getProof() {
		return proof;
	}

	public void setProof(Proof proof) {
		this.proof = proof;
	}

	public Type getType() {
		return type;
	}

	public void setType(Type type) {
		this.type = type;
	}

	public QuestionStatus getStatus() {
		return status;
	}

	public void setStatus(QuestionStatus status) {
		this.status = status;
	}

	public int getPoint() {
		if (type == Type.CERTO_E_ERRADO) {
			return status.getCode();
		}
		if (status == QuestionStatus.CORRECT) {
			return 1;
		}
		return 0;
	}
}
