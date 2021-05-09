const dictionary = {
    name: '',
    result: 'Seu desempenho foi',
    type: 'Tipo:',
    date: 'Data:',
    quantity: 'Quantidade de questões:',
    correct: 'Corretas:',
    blank: 'Em branco:',
    wrong: 'Erradas:',
    positived: 'Positivadas:',
    percentage: 'Porcentagem:'
}

export function createRankingTable(subjects) {
    const table = newElement('table', { id: 'ranking-table' });
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
    formatProof(proof);
    addLines(card, proof);
    const details = card.querySelector(".details");
    if (details) {
        card.addEventListener('click', () => {
            details.classList.contains('disabled') ?
                details.classList.remove('disabled') :
                details.classList.add('disabled');
        });
    }
    return card;
}

function formatProof(proof) {
    proof.date = new Date(proof.date).toLocaleString();
    proof.type = proof.type.replaceAll("_", " ").toLowerCase();
    proof.percentage = proof.percentage + "%";
}

function addLines(card, proof) {
    for (let attr in dictionary) {
        const text = proof[attr];
        const paragraph = newElement('p', null, `${dictionary[attr]} ${text}`);
        if (text !== undefined) {
            card.appendChild(paragraph);
            delete proof[attr];
        }
    }

    for (let attr in proof) {
        if (attr !== 'subjects' && attr !== 'id') {
            const paragraph = newElement('p', null, `${attr}: ${proof[attr]}`);
            card.appendChild(paragraph);
        }
    }

    const subjects = proof.subjects;
    if (subjects) card.appendChild(addTableDetails(subjects));
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
