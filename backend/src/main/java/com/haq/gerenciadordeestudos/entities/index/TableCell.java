package com.haq.gerenciadordeestudos.entities.index;

import java.io.Serializable;

public class TableCell implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private Integer column;
	private Integer row;
	private String content;
	
	public TableCell() {
	}
	
	public TableCell(Integer column, Integer row, String content) {
		this.row = row;
		this.column = column;
		this.content = content;
	}
	
	public Integer getColumn() {
		return column;
	}

	public void setColumn(Integer column) {
		this.column = column;
	}

	public Integer getRow() {
		return row;
	}
	
	public void setRow(Integer row) {
		this.row = row;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((content == null) ? 0 : content.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		TableCell other = (TableCell) obj;
		if (content == null) {
			if (other.content != null)
				return false;
		} else if (!content.equals(other.content))
			return false;
		return true;
	}
}
