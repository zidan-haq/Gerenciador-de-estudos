import { Backend } from './backendConnection.js';
import { createRankingTable, createCard, newElement, appendChildren } from './performanceElements.js';

(function searchRegister() {
    const backendData = new Backend("performance");
    backendData.promisseGET
        .then(response => response.json())
        .then(json => { if (json) initiate() })
        .catch(err => { console.log(err); alert('Houve um erro ao conectar com a aplicação.') });
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
    //sectionProofs();
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

function sectionProofs() {
    const selectOrderBy = document.getElementById('order-by');

    selectOrderBy.addEventListener('change', () => {
        orderBy(backendData.proofs);
        populateSectionProofs(backendData);
    });

    orderBy(backendData.proofs);
    populateSectionProofs(backendData);
}

function orderBy(proofs) {
    const value = document.getElementById('order-by').value;

    if (value === 'date') {
        proofs.sort((proof1, proof2) => (proof1.date - proof2.date));
    } else if (value === 'name') {
        proofs.sort((proof1, proof2) => {
            const first = proof1.name.toLowerCase();
            const second = proof2.name.toLowerCase();
            return first === second ? 0 : first > second ? 1 : -1;
        });
    } else {
        proofs.sort((proof1) => {
            if (proof1.type === 'certo e errado') return 1;
            if (proof1.type === 'multipla escolha') return -1;
        });
    }
    return proofs;
}

function populateSectionProofs(backendData) {
    const cards = document.getElementById('cards');
    cards.innerHTML = '';
    backendData.proofs.forEach(proof => {
        const card = createCard(proof);
        cards.appendChild(card);
    })
}

function backend() {
    return {
        proofs: [
            {
                id: 1,
                result: 'Seu desempenho foi BAIXO',
                name: 'aolícia Civil - Agente',
                date: 1957,
                type: 'certo-e-errado',
                quantity: "quantidade: 120",
                correct: "corretas: 94",
                blank: "brancas: 6",
                wrong: "erradas: 20",
                positived: "positivadas: 74",
                percentage: "porcentagem: 61.67",
                subjects: [
                    {
                        name: "Direito administrativo da administração pública do distrito federal",
                        percentage: "100,00%",
                        points: "12 de 12"
                    }
                ]
            },
            {
                id: 2,
                result: 'MÉDIO',
                name: 'Escrivão - PCDF',
                date: '15/05/2021',
                type: 'certo-e-errado',
                quantity: "quantidade: 120",
                correct: "corretas: 94",
                blank: "brancas: 6",
                wrong: "erradas: 20",
                positived: "positivadas: 74",
                percentage: "porcentagem: 61.67",
                subjects: [
                    {
                        name: "Direito administrativo da administração pública do distrito federal",
                        percentage: "100,00%",
                        points: "12 de 12"
                    }
                ]
            },
            {
                id: 3,
                result: 'ALTO',
                name: 'abadiania Serpro - Dev. Sistem.',
                date: 2021,
                type: 'multipla escolha',
                quantity: "120",
                correct: "99",
                blank: "12",
                wrong: "9",
                positived: "90",
                percentage: "75,00%",
                subjects: [
                    {
                        name: "Português",
                        percentage: "100,00%",
                        points: "12 de 12"
                    },
                    {
                        name: "Matemática",
                        percentage: "100,00%",
                        points: "15 de 15"
                    },
                    {
                        name: "Legislação",
                        percentage: "100,00%",
                        points: "17 de 20"
                    }, {
                        name: "Ética",
                        percentage: "100,00%",
                        points: "10 de 15"
                    }, {
                        name: "Constitucional",
                        percentage: "100,00%",
                        points: "6 de 6"
                    }
                ]
            }
        ]
    }
}