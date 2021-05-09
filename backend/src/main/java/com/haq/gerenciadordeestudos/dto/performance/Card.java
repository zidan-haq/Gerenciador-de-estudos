package com.haq.gerenciadordeestudos.dto.performance;

import java.io.Serializable;
import java.util.Calendar;
import java.util.HashSet;
import java.util.Set;

import com.haq.gerenciadordeestudos.entities.performance.Proof;
import com.haq.gerenciadordeestudos.entities.performance.Subject;
import com.haq.gerenciadordeestudos.entities.performance.enums.QuestionStatus;
import com.haq.gerenciadordeestudos.entities.performance.enums.Result;
import com.haq.gerenciadordeestudos.entities.performance.enums.Type;

public class Card implements Serializable {
	private static final long serialVersionUID = 1L;
	
	Proof proof;
	
	public Card() {
	}
	
	public Card(Proof proof) {
		this.proof = proof;
	}
	
	public Long getId() {
		return proof.getId();
	}
	
	public Result getResult() {
		return proof.getResult();
	}
	
	public String getName() {
		return proof.getName();
	}
	
	public Calendar getDate() {
		return proof.getDate();
	}
	
	public Type getType() {
		return proof.getType();
	}
	
	public Integer getQuantity() {
		return proof.getQuestions().size();
	}
	
    public Long getCorrect() {
    	return proof.getQuestions().stream()
    			.filter(question -> question.getStatus().equals(QuestionStatus.CORRECT))
    			.count();
    }
    
    public Long getBlank() {
    	return proof.getQuestions().stream()
    			.filter(question -> question.getStatus().equals(QuestionStatus.BLANK))
    			.count();
    }
    
    public Long getWrong() {
    	return proof.getQuestions().stream()
    			.filter(question -> question.getStatus().equals(QuestionStatus.WRONG))
    			.count();
    }

    public Integer getPositived() {
    	return proof.getPoints();
    }
    
    public Double getPercentage() {
    	return proof.getPercentage();
    }

	public Set<Subject> getSubjects() {
		Set<Subject> subjects = new HashSet<>();
		proof.getQuestions().forEach(question -> subjects.add(question.getSubject()));
		return subjects;
	}
}
