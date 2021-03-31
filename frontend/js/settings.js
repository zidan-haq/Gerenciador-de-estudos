(function objetivos() {

    function getSettings() {
        //aqui ele deverá pegar do backend as configurações
        //>>>-----------> Precisa ser implementado <-----------<<<
    }

    const cabecalho = document.getElementById('cabecalho');


    function containerProvaData() {
        return document.querySelectorAll('.container-prova-data');
    }

    const btnAddProvaData = document.getElementById('add-prova-data');
    const msgError = document.querySelector('main .error');
    const btnSave = document.getElementById('btn-save');

    btnAddProvaData.addEventListener('click', e => addProvaData());
    btnSave.addEventListener('click', e => save());

    function addProvaData() {
        let add = true;
        for (let container of containerProvaData()) {
            const prova = container.querySelector('.prova');
            if (!prova.value) {
                msgError.innerText = 'Não é possível realizar esse ação!\nO campo prova está vazio.';
                add = false;
                break;
            }
        }
        if (add) {
            btnAddProvaData.insertAdjacentElement('beforebegin', createContainerProvaData());
            msgError.innerText = '';
        }
    }

    function createContainerProvaData() {
        const container = newElement('div', '', { class: 'container-prova-data' });
        const prova = newElement('input', '', { placeholder: 'Concurso tribunal...', type: 'text', class: 'prova' });
        const data = newElement('input', '', { type: 'date', class: 'data' });
        container.appendChild(prova);
        container.appendChild(data);
        return container;
    }

    //attention! Inform the attributes as objects, where key is attribute's name and value is attribute's value"
    function newElement(type, text, attributes) {
        const element = document.createElement(type);
        if (text) element.innerText = text;
        for (let key in attributes) {
            element.setAttribute(key, attributes[key]);
        }
        return element;
    }

    function save() {
        try {
            if (window.confirm('Deseja realmente salvar as novas configurações?')) {
                JSON.stringify(newSettings());
                /* essa parte precisa ser enviada para o backend!
                >>>-----------> Precisa ser implementado <-----------<<< */
            }
            alert('Operação realizada com sucesso!');
        } catch(err) {
            alert('Não foi possível salvar as novas configurações.');
        }
    }

    class ProvaData {
        constructor(prova, data) {
            prova, data;
        }
    }

    function newSettings() {
        const strCabecalho = cabecalho.value;
        const listprovaData = new Array();
        for (let container of containerProvaData()) {
            const prova = container.querySelector('.prova').value;
            const data = container.querySelector('.data').value;

            if (prova) listprovaData.push(new ProvaData(prova, data)); // it will only add if the 'prova' field is filled
        }

        return {
            cabecalho: strCabecalho,
            provaData: listprovaData
        }
    }

})();