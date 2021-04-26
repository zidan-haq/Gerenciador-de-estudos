function translate(word) {
    const dictionary = {
        name: '',
        type: 'Tipo:',
        date: 'Data:',
        result: 'Seu desempenho foi',
        quantQuestions: 'Quantidade de questões:',
        corrects: 'Corretas:',
        blanks: 'Em branco:',
        wrongs: 'Erradas:',
        positived: 'Positivadas:',
        percentage: 'Porcentagem:'
    }
    const translated = dictionary[word];

    return translated === undefined ? word : translated;
}

export function createRankingTable(subjects) {
    const table = newElement('table', {id: 'ranking-table'});
    const rowHeader = createRow('th', 'Nome da matéria', 'Quantidade de questões', 'Nota média');
    table.appendChild(rowHeader);

    subjects.forEach(subject => {
        const row = createRow('td', subject.name, subject.quantQuestions, subject.percentage);
        table.appendChild(row);
    });

    return table;
}

export function createCard(proof) {
    const card = newElement('div', { id: proof.id, class: 'card' });
    addLines(card, proof);

    card.addEventListener('click', () => {
        const details = card.querySelector(".details");
        if (details.classList.contains('disabled')) {
            details.classList.remove('disabled')
        } else {
            details.classList.add('disabled');
        }
    });

    return card;
}

function addLines(card, proof) {
    for (let attr in proof) {
        if (attr !== 'subjects') {
            const text = translate(attr);
            const paragraph = newElement('p', null, `${text} ${proof[attr]}`);
            card.appendChild(paragraph);
        } else {
            card.appendChild(addTableDetails(proof[attr]));
        }
    }
}

function addTableDetails(subjects) {
    const table = newElement('table', { class: "details" });
    table.classList.add('disabled');
    const rowHeader = createRow('th', 'Matéria', 'Porcentagem', 'Pontos');
    table.appendChild(rowHeader)

    subjects.forEach(subject => {
        const row = createRow('td', subject.name, subject.percentage, subject.points);
        table.appendChild(row);
    });

    return table;
}

function createRow(cellType, ...cellText) {
    const row = document.createElement('tr');
    const columns = cellText.map(value => value = newElement(cellType, null, value));
    columns.forEach(column => row.appendChild(column));

    return row;
}

export function newElement(type, attributes, innerText) {
    const element = document.createElement(type);

    for (let key in attributes) {
        element.setAttribute(key, attributes[key]);
    }

    if (innerText) element.innerText = innerText;

    return element;
}

export function appendChildren(parent, ...children) {
    for (let child of children) {
        parent.appendChild(child);
    }
}
