package com.haq.gerenciadordeestudos.dto.performance;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;

import com.haq.gerenciadordeestudos.entities.performance.Proof;
import com.haq.gerenciadordeestudos.entities.performance.Question;
import com.haq.gerenciadordeestudos.entities.performance.enums.QuestionStatus;
import com.haq.gerenciadordeestudos.entities.performance.enums.Result;
import com.haq.gerenciadordeestudos.entities.performance.enums.Type;

@Component
public class GeneralPerformance implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private Type type;
	private Integer wrongs;
	private Integer corrects;
	private Integer blank;
	
	public GeneralPerformance() {
	}
	
	public GeneralPerformance(Type type, Integer wrongs, Integer corrects, Integer blank) {
		this.type = type;
		this.wrongs = wrongs;
		this.corrects = corrects;
		this.blank = blank;		
	}
	
	public void setType(Type type) {
		this.type = type;
	}
	
	public void setWrongs(Integer wrongs) {
		this.wrongs = wrongs;
	}
	
	public void setCorrects(Integer corrects) {
		this.corrects = corrects;
	}
	
	public void setBlank(Integer blank) {
		this.blank = blank;
	}
	
	public Integer getPoints() {
		return createProof().getPoints();
	}
	
	public Double getPercentage() {
		return createProof().getPercentage();
	}
	
	public Result getResult() {
		return createProof().getResult();
	}

	private Proof createProof() {
		List<Question> list = new ArrayList<>();
		addQuestions(list, wrongs, QuestionStatus.WRONG, type);
		addQuestions(list, corrects, QuestionStatus.CORRECT, type);
		addQuestions(list, blank, QuestionStatus.BLANK, type);

		Proof proof = new Proof(null, null, type, null, list);

		return proof;
	}
	
	private void addQuestions(List<Question> list, Integer quantity, QuestionStatus status, Type type) {
		for(int x = 1; x <= quantity; x++) {
			list.add(new Question(null, null, null, status, type));
		}
	}
	
	@Override
	public String toString() {
		return String.format("Points: %d, Percentage: %.2f, Result: %s", getPoints(), getPercentage(), getResult());
	}
	
}
