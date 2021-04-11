class Backend {
    constructor(path) {
        this.path = path;
    }
    get promisse() {
        return fetch(`http://127.0.0.1:8080/${this.path}`);
    }
}

(function motivationalPhrase() {
    const backendData = new Backend('index/image');
    const imageSection = document.getElementById("motivational-phrase");
    const nextMotivationalImage = document.querySelector("#pensamento-do-dia .next");
    const defaultPhrase = './images/loading.gif';
    
    function getMotivationalImage() {
        backendData.promisse
        .then(response => response.json())
        .then(json => assignImage(json))
        .catch(assignImage(false));
        
        function assignImage(json) {
            const url = json.url || defaultPhrase;
            imageSection.setAttribute('src', url);
        }
    };
    getMotivationalImage();

    nextMotivationalImage.addEventListener('click', e => getMotivationalImage());

})();

(function controleSemanal() {

    /*
    * >>>-----------> Precisa ser implementado <-----------<<<
    */
    (function getBackendTable() {
        // Nessa parte o backend deve fornecer a tabela em formato json;
        console.log('em breve será implementado');
    })();

    const btnEdit = document.querySelector('#controle-semanal .btn-edit');
    btnEdit.addEventListener('click', e => editTable());
    const cells = document.querySelectorAll('#controle-semanal .cells');
    const divButtons = document.querySelector('#controle-semanal #buttons');

    function editTable() {
        cells.forEach(cell => cell.removeAttribute('readonly'));
        btnEdit.classList.add('disable');

        createBtnSaveCancel().forEach(btn => divButtons.appendChild(btn))
    }

    /*
    * >>>-----------> Precisa ser implementado <-----------<<<
    */
    function saveEdition() {
        //pegue todas as células (const cells acima) e envie em formato json para o backend;
    }

    function cancelEdition() {
        cells.forEach(cell => cell.setAttribute('readonly', 'true'));
        btnEdit.classList.remove('disable');
        divButtons.lastChild.remove();
        divButtons.lastChild.remove();
        //aqui ele deverá pedir do backend os valores da tabela >>>-----------> Precisa ser implementado <-----------<<<
    }

    function createBtnSaveCancel() {
        const btnSave = document.createElement('button');
        const btnCancel = document.createElement('button');
        btnSave.innerHTML = 'Salvar';
        btnCancel.innerText = 'Cancelar';
        btnSave.addEventListener('click', e => console.log('salvar'));
        btnCancel.addEventListener('click', e => cancelEdition());

        return [btnSave, btnCancel];
    }
})();



(function materiais() {

    lineButtons()

    class DefaultLine {
        constructor(url, alias) {
            this.li = this.newElement('li');
            const link = this.newElement('a', alias, { href: url, target: '_blank', rel: 'external' });
            const remove = this.newElement('button', '🗑', { class: 'remove' });

            this.appendChildren(this.line, link, remove);
        }

        get line() {
            return this.li
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

    const form = document.querySelector("#materiais form");

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

        const newLine = new DefaultLine(url.value, alias.value);
        document.querySelector("#materiais .links-list").appendChild(newLine.line);
        lineButtons();
        url.value = '';
        alias.value = '';
    }

    function lineButtons() {
        const lines = document.querySelectorAll("#materiais .links-list li");
        lines.forEach(line => {
            line.querySelector('.remove').addEventListener('click', e => removeLine(e));
        });
    };

    function removeLine(e) {
        const element = e.target;
        element.parentElement.remove();
    }

})();
