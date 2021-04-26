package com.haq.gerenciadordeestudos.repositories.index;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;

import com.haq.gerenciadordeestudos.entities.index.TableCell;

@Component
public class TableCellRepository {
	public TableCellRepository() {
	}

	public List<TableCell> getAll() {
		List<TableCell> list = new ArrayList<>();

		for (int row = 0; row < 4; row++) {
			for (int column = 0; column < 7; column++) {
				TableCell cell = new TableCell(column, row, "Português");
				list.add(cell);
			}
		}
		return list;
	}

	public List<TableCell> setAll(List<TableCell> list) {
		return list;
	}

	public TableCell getCell(Integer column, Integer row, String content) {
		return new TableCell(column, row, content);
	}
}
