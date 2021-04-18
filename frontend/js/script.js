import { Backend } from './backendConnection.js';

(function motivationalPhrase() {
    const backendData = new Backend('index/image');
    const imageSection = document.getElementById("motivational-phrase");
    const nextMotivationalImage = document.querySelector("#pensamento-do-dia .next");
    const defaultPhrase = './images/loading.gif';

    function getMotivationalImage() {
        backendData.promisseGET
            .then(response => response.json())
            .then(json => assignImage(json))
            .catch(err => assignImage(false));

        function assignImage(json) {
            const url = json.url || defaultPhrase;
            imageSection.setAttribute('src', url);
        }
    };
    getMotivationalImage();

    nextMotivationalImage.addEventListener('click', e => getMotivationalImage());
})();

class Table {
    constructor() {
        this.rows = document.querySelectorAll('#controle-semanal .rows');
        this.cells = document.querySelectorAll('#controle-semanal .cells');
        this.quantRows = this.rows.length;
        this.quantColumn = this.cells.length / this.rows.length
    }

    get allCells() {
        return this.cells
    }

    cellPosition(column, row) {
        if (this.quantRows <= row || this.quantColumn <= column) return false;
        const index = this.quantColumn * row + column;
        return this.cells[index];
    }

    get json() {
        const list = [];

        this.allCells.forEach((cell, index) => {
            if (index < this.quantColumn) {
                list.push({
                    column: index,
                    row: 0,
                    content: cell.value
                });
            } else {
                list.push({
                    column: index % this.quantColumn,
                    row: Math.trunc(index / this.quantColumn),
                    content: cell.value
                });
            }
        });
        return JSON.stringify(list);
    }
}

(function controleSemanal() {
    const backendData = new Backend("index/table");
    const table = new Table();
    const btnEdit = document.querySelector('#controle-semanal .btn-edit');
    btnEdit.addEventListener('click', e => editTable());
    const divButtons = document.querySelector('#controle-semanal #buttons');

    function getBackendTable() {
        backendData.promisseGET
            .then(response => response.json())
            .then(json => assignCell(json))
            .catch(err => assignCell([]));

        function assignCell(json) {
            json.forEach(value => {
                const cell = table.cellPosition(value.column, value.row);
                cell.value = value.content;
            });
        }
    };
    getBackendTable();

    function editTable() {
        table.allCells.forEach(cell => cell.removeAttribute('readonly'));
        btnEdit.classList.add('disable');
        createBtnSaveCancel().forEach(btn => divButtons.appendChild(btn))
    }

    function saveEdition() {
        backendData.promissePUT(table.json)
            .then(response => response.json())
            .then(json => { alert(json ? "Operação realizada com sucesso." : 'Não foi possível concluir essa ação.') })
            .catch(err => alert('Houve um erro.'));
    }

    function cancelEdition() {
        table.allCells.forEach(cell => cell.setAttribute('readonly', 'true'));
        btnEdit.classList.remove('disable');
        divButtons.lastChild.remove();
        divButtons.lastChild.remove();
        getBackendTable();
    }

    function createBtnSaveCancel() {
        const btnSave = document.createElement('button');
        const btnCancel = document.createElement('button');
        btnSave.innerHTML = 'Salvar';
        btnCancel.innerText = 'Cancelar';
        btnSave.addEventListener('click', e => saveEdition());
        btnCancel.addEventListener('click', e => cancelEdition());

        return [btnSave, btnCancel];
    }
})();

class DefaultLine {
    constructor(id, url, alias) {
        this.id = id;
        this.url = url;
        this.alias = alias;
    }

    get line() {
        const li = this.newElement('li', '', { class: this.id });
        const link = this.newElement('a', this.alias, { href: this.url, target: '_blank', rel: 'external' });
        const remove = this.newElement('button', '🗑', { class: 'remove' });
        this.appendChildren(li, link, remove);

        return li
    }

    //attention! Inform the attributes as objects, where key is attribute's name and value is attribute's value"
    newElement(type, text, attributes) {
        const element = document.createElement(type);
        if (text) element.innerText = text;
        for (let key in attributes) {
            element.setAttribute(key, attributes[key]);
        }

        return element;
    }

    appendChildren(parent, ...children) {
        for (let child of children) {
            parent.appendChild(child);
        }
    }
}

(function materiais() {
    const backendData = new Backend("index/materials")
    const form = document.querySelector("#materiais form");
    const linksList = document.querySelector("#materiais .links-list")

    function getBackendMaterials() {
        backendData.promisseGET
            .then(response => response.json())
            .then(json => assignMaterials(json))
            .catch(err => assignMaterials(false));

        function assignMaterials(json) {
            if (json) {
                json.forEach(line => {
                    const newLine = new DefaultLine(line.id, line.url, line.alias);
                    lineListener(linksList.appendChild(newLine.line));
                });
            }
        }
    }
    getBackendMaterials();

    form.addEventListener('submit', e => {
        e.preventDefault();
        addLine();
    });

    function addLine() {
        const url = document.querySelector("#materiais .url");
        const alias = document.querySelector("#materiais .alias");

        if (!alias.value) {
            alias.value = url.value.length < 16 ? url.value : url.value.substring(0, 15);
        }

        const line = new DefaultLine(null, url.value, alias.value);

        backendData.promissePOST(JSON.stringify(line))
            .then(response => response.json())
            .then(json => appendLine(json))
            .catch(err => appendLine(false));

        url.value = '';
        alias.value = '';
    }

    function appendLine(json) {
        const newLine = new DefaultLine(json.id, json.url, json.alias);
        if (newLine) {
            const link = linksList.appendChild(newLine.line);
            lineListener(link);
        } else {
            alert('Não foi possível adicionar esse link');
        }
    }

    function lineListener(line) {
        const btnRemove = line.querySelector('.remove');
        btnRemove.addEventListener('click', e => tryRemove(line));
    };

    function tryRemove(line) {
        backendData.promisseDELETE(line.classList.value)
            .then(response => response.json())
            .then(json => removeLine(json, line))
            .catch(err => removeLine(err));
    }

    function removeLine(boolean, line) {
        if (boolean === true) {
            line.remove();
        } else {
            alert('Não foi possivel excluir esta linha.');
        }
    }
})();
