package com.haq.gerenciadordeestudos.repositories.performance;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.GregorianCalendar;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.haq.gerenciadordeestudos.dto.performance.Card;
import com.haq.gerenciadordeestudos.entities.performance.Proof;
import com.haq.gerenciadordeestudos.entities.performance.Question;
import com.haq.gerenciadordeestudos.entities.performance.Subject;
import com.haq.gerenciadordeestudos.entities.performance.enums.QuestionStatus;
import com.haq.gerenciadordeestudos.entities.performance.enums.Type;

@Repository
public class CardRepository {
	public List<Card> getAll() {
		List<Card> cards = new ArrayList<>();
		List<Question> questions1 = new ArrayList<>();
		List<Question> questions2 = new ArrayList<>();
		List<Question> questions3 = new ArrayList<>();
		List<Question> questions4 = new ArrayList<>();
		
		Proof proof1 = new Proof(1L, "Simulado PCDF", Type.CERTO_E_ERRADO, new GregorianCalendar(2017, 1, 1), questions1);
		questions1.add(new Question(1L, new Subject(1L, "Matemática", questions1), proof1, QuestionStatus.WRONG, Type.CERTO_E_ERRADO));
		questions1.add(new Question(1L, new Subject(1L, "Português", questions1), proof1, QuestionStatus.BLANK, Type.CERTO_E_ERRADO));
		questions1.add(new Question(1L, new Subject(1L, "Informática", questions1), proof1, QuestionStatus.CORRECT, Type.CERTO_E_ERRADO));
		questions1.add(new Question(1L, new Subject(1L, "Contabilidade", questions1), proof1, QuestionStatus.WRONG, Type.CERTO_E_ERRADO));
		questions1.add(new Question(1L, new Subject(1L, "Penal", questions1), proof1, QuestionStatus.BLANK, Type.CERTO_E_ERRADO));
		questions1.add(new Question(1L, new Subject(1L, "Processual Penal", questions1), proof1, QuestionStatus.CORRECT, Type.CERTO_E_ERRADO));
		questions1.add(new Question(1L, new Subject(1L, "Legislação", questions1), proof1, QuestionStatus.WRONG, Type.CERTO_E_ERRADO));
		questions1.add(new Question(1L, new Subject(1L, "Constitucional", questions1), proof1, QuestionStatus.BLANK, Type.CERTO_E_ERRADO));
		Proof proof2 = new Proof(1L, "Simulado PF", Type.MULTIPLA_ESCOLHA, new GregorianCalendar(2018, 2, 0), questions2);
		questions2.add(new Question(1L, new Subject(1L, "Matemática", questions2), proof2, QuestionStatus.WRONG, Type.MULTIPLA_ESCOLHA));
		questions2.add(new Question(1L, new Subject(1L, "Português", questions2), proof2, QuestionStatus.WRONG, Type.MULTIPLA_ESCOLHA));
		questions2.add(new Question(1L, new Subject(1L, "Informática", questions2), proof2, QuestionStatus.WRONG, Type.MULTIPLA_ESCOLHA));
		questions2.add(new Question(1L, new Subject(1L, "Contabilidade", questions2), proof2, QuestionStatus.WRONG, Type.MULTIPLA_ESCOLHA));
		questions2.add(new Question(1L, new Subject(1L, "Penal", questions2), proof2, QuestionStatus.WRONG, Type.MULTIPLA_ESCOLHA));
		questions2.add(new Question(1L, new Subject(1L, "Processual Penal", questions2), proof2, QuestionStatus.WRONG, Type.MULTIPLA_ESCOLHA));
		questions2.add(new Question(1L, new Subject(1L, "Legislação", questions2), proof2, QuestionStatus.WRONG, Type.MULTIPLA_ESCOLHA));
		questions2.add(new Question(1L, new Subject(1L, "Constitucional", questions2), proof2, QuestionStatus.WRONG, Type.MULTIPLA_ESCOLHA));
		Proof proof3 = new Proof(1L, "Simulado Serpro", Type.CERTO_E_ERRADO, new GregorianCalendar(2019, 5, 8), questions3);
		questions3.add(new Question(1L, new Subject(1L, "Matemática", questions3), proof3, QuestionStatus.BLANK, Type.CERTO_E_ERRADO));
		questions3.add(new Question(1L, new Subject(1L, "Português", questions3), proof3, QuestionStatus.BLANK, Type.CERTO_E_ERRADO));
		questions3.add(new Question(1L, new Subject(1L, "Informática", questions3), proof3, QuestionStatus.BLANK, Type.CERTO_E_ERRADO));
		questions3.add(new Question(1L, new Subject(1L, "Contabilidade", questions3), proof3, QuestionStatus.BLANK, Type.CERTO_E_ERRADO));
		questions3.add(new Question(1L, new Subject(1L, "Penal", questions3), proof3, QuestionStatus.BLANK, Type.CERTO_E_ERRADO));
		questions3.add(new Question(1L, new Subject(1L, "Processual Penal", questions3), proof3, QuestionStatus.BLANK, Type.CERTO_E_ERRADO));
		questions3.add(new Question(1L, new Subject(1L, "Legislação", questions3), proof3, QuestionStatus.BLANK, Type.CERTO_E_ERRADO));
		questions3.add(new Question(1L, new Subject(1L, "Constitucional", questions3), proof3, QuestionStatus.BLANK, Type.CERTO_E_ERRADO));	
		Proof proof4 = new Proof(1L, "Simulado Stefanini", Type.MULTIPLA_ESCOLHA, Calendar.getInstance(), questions4);
		questions4.add(new Question(1L, new Subject(1L, "Matemática", questions4), proof4, QuestionStatus.CORRECT, Type.MULTIPLA_ESCOLHA));
		questions4.add(new Question(1L, new Subject(1L, "Português", questions4), proof4, QuestionStatus.CORRECT, Type.MULTIPLA_ESCOLHA));
		questions4.add(new Question(1L, new Subject(1L, "Informática", questions4), proof4, QuestionStatus.CORRECT, Type.MULTIPLA_ESCOLHA));
		questions4.add(new Question(1L, new Subject(1L, "Contabilidade", questions4), proof4, QuestionStatus.CORRECT, Type.MULTIPLA_ESCOLHA));
		questions4.add(new Question(1L, new Subject(1L, "Penal", questions4), proof4, QuestionStatus.CORRECT, Type.MULTIPLA_ESCOLHA));
		questions4.add(new Question(1L, new Subject(1L, "Processual Penal", questions4), proof4, QuestionStatus.CORRECT, Type.MULTIPLA_ESCOLHA));
		questions4.add(new Question(1L, new Subject(1L, "Legislação", questions4), proof4, QuestionStatus.CORRECT, Type.MULTIPLA_ESCOLHA));
		questions4.add(new Question(1L, new Subject(1L, "Constitucional", questions4), proof4, QuestionStatus.CORRECT, Type.MULTIPLA_ESCOLHA));
		
		Card card1 = new Card(proof1);
		Card card2 = new Card(proof2);
		Card card3 = new Card(proof3);
		Card card4 = new Card(proof4);
		
		cards.add(card1);
		cards.add(card2);
		cards.add(card4);
		cards.add(card3);

		return cards;
	}

	public Boolean removeAll() {
		return true;
	}

}
