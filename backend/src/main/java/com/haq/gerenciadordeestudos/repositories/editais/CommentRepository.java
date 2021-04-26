package com.haq.gerenciadordeestudos.repositories.editais;

import org.springframework.stereotype.Repository;

import com.haq.gerenciadordeestudos.entities.editais.Comment;

@Repository
public class CommentRepository {
	public CommentRepository() {
	}
	
	public Comment getLink(Long id) {
		return new Comment(id, String.format("Comentários referentes ao concurso de id: %d", id));
	}
	
	public Comment setLink(Comment comment) {
		return comment;
	}
}
