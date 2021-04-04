(function searchRegister() {
    /* se não for encontrado registro no banco de dados, essa função deve mostrar a mensagem não há nenhum item cadastrado. >>>-----------> Precisa ser implementado <-----------<<< */

    thereIsregister = true; // deve retornar true se houver provas cadastradas
    if (thereIsregister) initiate();
})();

function initiate() {
    const datas = backend();

    header(datas);
    sectionProofs(datas);
}

function header(datas) {
    const lastRegistered = document.getElementById("last-registered");
    const lastRegisteredDate = document.getElementById("last-registered-date");
    const quantityRegistered = document.getElementById("quantity-registered");
    const averageGrade = document.getElementById("average-grade");
    const rankingTable = document.getElementById("ranking-table");

    /* cada atributo acima receberá o respectivo valor do backend >>>-----------> Precisa ser implementado <-----------<<< */

    const showTable = document.getElementById("show-table");

    showTable.addEventListener('click', () => {
        if (rankingTable.classList.contains('disabled')) {
            rankingTable.classList.remove('disabled');
        } else {
            rankingTable.classList.add('disabled');
        }
        showTable.innerText = showTable.innerText === '▼' ? '▲' : '▼';
    });

    rankingTable.appendChild(rankingTableRow('Geografia', 16, '20%'));
    rankingTable.appendChild(rankingTableRow('Sociologia', 6, '100%'));
    rankingTable.appendChild(rankingTableRow('História', 10, '60%'));

    function rankingTableRow(name, quantity, average) {
        const row = createElement('tr');
        const subjectName = createElement('td');
        const quantityQuestion = createElement('td');
        const averageGrade = createElement('td');
        subjectName.innerText = name;
        quantityQuestion.innerText = quantity;
        averageGrade.innerText = average;
        appendChildren(row, subjectName, quantityQuestion, averageGrade);
        return row;

        function createElement(elementName) {
            return document.createElement(elementName);
        }
        function appendChildren(parent, ...children) {
            children.forEach(child => parent.appendChild(child));
        }
    }
}

function sectionProofs(datas) {
    const selectOrderBy = document.getElementById('order-by');

    selectOrderBy.addEventListener('change', () => {
        orderBy(datas.proofs);
        populateSectionProofs(datas);
    });

    orderBy(datas.proofs);
    populateSectionProofs(datas);
}

function orderBy(proofs) {
    const value = document.getElementById('order-by').value;

    if (value === 'date') {
        proofs.sort((proof1, proof2) => (proof1.date - proof2.date) * -1);
    } else if (value === 'name') {
        proofs.sort((proof1, proof2) => {
            first = proof1.name.toLowerCase();
            second = proof2.name.toLowerCase();
            return first === second ? 0 : first > second ? 1 : -1;
        });
    } else {
        proofs.sort((proof1) => {
            if (proof1.type === 'certo-e-errado') return -1;
            if (proof1.type === 'multipla-escolha') return 1;
        });
    }
    return proofs;
}

function populateSectionProofs(datas) {
    const cards = document.getElementById('cards');


    const cardList = createCard(datas.proofs);
    cards.innerHTML = '';
    cardList.forEach(card => cards.appendChild(card));

    function createCard(proofs) {
        const cardList = new Array();

        proofs.forEach(proof => {
            const card = document.createElement('div');
            cardElements(card);
            addParagraphs(card, proof);

            card.addEventListener('click', () => {
                location.href = "#modal-window";
            });

            cardList.push(card);
        });

        function cardElements(card) {
            card.classList.add('card')
        }

        function addParagraphs(card, proof) {
            for (let paragraph in proof) {
                card.innerHTML += `<p>${proof[paragraph]}</p>`;
            }
        }

        return cardList;
    }
}

function backend() {
    return {
        proofs: [
            {
                name: 'bolícia Federal - Agente',
                date: 1956,
                type: 'multipla-escolha'
            },
            {
                name: 'aolícia Civil - Agente',
                date: 1957,
                type: 'certo-e-errado'
            },
            {
                name: 'Polícia Civil - Escrivão',
                date: 1958,
                type: 'certo-e-errado'
            }
        ]
    }
}