import { Backend } from './backendConnection.js';
import { createRankingTable, createCard, newElement, appendChildren } from './performanceElements.js';

(function searchRegister() {
    const backendData = new Backend("performance");
    backendData.promisseGET
        .then(response => response.json())
        .then(json => json ? initiate() : notFound())
        .catch(err => {
            alert('Houve um erro ao conectar com a aplicação.');
            notFound()
        });
})();

function notFound() {
    const paragraph = document.createElement('p');
    const noData = document.getElementById('no-data');
    paragraph.innerHTML = 'Nenhum simulado<br>encontrado';
    noData.innerHTML = '';
    noData.appendChild(paragraph);
}

function initiate() {
    const mainHeader = document.getElementById('main-header');
    const noData = document.getElementById('no-data');
    noData.classList.add('disabled');
    mainHeader.classList.remove('disabled');

    header();
    sectionProofs();
}

function header() {
    const backendData = new Backend("performance");

    backendData.promisseGETOne("historic")
        .then(response => response.json())
        .then(json => populateHistoric(json))
        .catch(err => console.log("Não foi possível recuperar os dados do histórico."));

    backendData.promisseGETOne("ranking")
        .then(response => response.json())
        .then(json => populateRanking(json))
        .catch(err => console.log("Não foi possível recuperar os dados do ranking."));
}

function populateHistoric(json) {
    const averageGrade = document.getElementById("average-grade");
    const lastDate = document.getElementById("last-date");
    const quantProofs = document.getElementById("quant-proofs");
    const quantSubjects = document.getElementById("quant-subjects");

    averageGrade.innerText += ` ${json.averageGrade}%`;
    lastDate.innerText += ` ${json.lastDate}`;
    quantProofs.innerText += ` ${json.quantProofs}`;
    quantSubjects.innerText += ` ${json.quantSubjects}`;
}

function populateRanking(json) {
    const rankingMaterias = document.getElementById("ranking-subjects");
    const showTable = document.getElementById("show-table");
    json.sort((subject1, subject2) => subject2.percentage - subject1.percentage);

    showTable.addEventListener('click', () => {
        const table = createRankingTable(json);
        if (showTable.innerText === '▼') {
            rankingMaterias.insertAdjacentElement('afterend', table);
            showTable.innerText = '▲';
        } else {
            document.getElementById('ranking-table').remove();
            showTable.innerText = '▼';
        }
    });
}
(function fieldOrderBy() {
    const selectOrderBy = document.getElementById('order-by');

    selectOrderBy.addEventListener('change', () => {
        sectionProofs()
    });
})();

function sectionProofs() {
    const backendData = new Backend("performance/proofs");
    const btnManageProof = document.getElementById("manage-proof");

    backendData.promisseGET
        .then(response => response.json())
        .then(json => {
            orderBy(json);
            populateSectionProofs(json)
        })
        .catch(err => console.log("Houve um erro ao consultar o banco de dados."));

    btnManageProof.addEventListener('click', e => manageProof());
}

function orderBy(proofs) {
    const value = document.getElementById('order-by').value;

    if (value === 'date') {
        proofs.sort((proof1, proof2) => proof1.date > proof2.date ? -1 : 1);
    } else if (value === 'name') {
        proofs.sort((proof1, proof2) => {
            const first = proof1.name.toLowerCase();
            const second = proof2.name.toLowerCase();
            return first === second ? 0 : first > second ? 1 : -1;
        });
    } else {
        proofs.sort((proof1) => {
            if (proof1.type === 'CERTO_E_ERRADO') return 1;
            if (proof1.type === 'MULTIPLA_ESCOLHA') return -1;
        });
    }
    return proofs;
}

function populateSectionProofs(backendData) {
    const cards = document.getElementById('cards');
    cards.innerHTML = '';
    backendData.forEach(proof => {
        const card = createCard(proof);
        cards.appendChild(card);
    })
}

function manageProof() {

}
