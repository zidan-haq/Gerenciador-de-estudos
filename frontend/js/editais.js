import { Backend } from './backendConnection.js';
import { getMainSection, createLine, newElement, appendChildren } from './editaisMainSection.js';

// Box-container

class BoxFactory {
    constructor(id, urlImage, description, backendData) {
        this.backendData = backendData;
        this.box = newElement('div', { id, class: 'box' });
        this.boxHeader = newElement('div', { class: 'box-header' });
        this.delete = newElement('img', { class: 'delete-box', src: './images/remove.svg', alt: 'Apagar' });
        this.image = newElement('img', { class: 'box-img', src: urlImage, alt: '🏜' });
        this.edit = newElement('img', { class: 'edit-box', src: './images/edit.svg', alt: 'Editar' })
        this.content = newElement('textarea', { class: 'box-content', maxlength: "30", spellcheck: "false", placeholder: 'Descrição', readonly: 'true' });

        appendChildren(this.boxHeader, this.delete, this.image, this.edit);
        appendChildren(this.box, this.boxHeader, this.content);

        this.boxSelected();
        this.deleteBox();
        this.editBox(urlImage);
        this.content.innerText = description;
        this.limitRows();

        return this.box;
    }

    limitRows() {
        this.content.addEventListener('keyup', e => {
            let text = this.content.value;
            this.content.value = text.replace('\n', '')
        });
    }

    boxSelected() {
        this.box.addEventListener('click', e => {
            if (e.target !== this.image && e.target !== this.content) return null;
            const arrayBox = document.querySelectorAll('#box-container .box');
            const isSelected = this.box.classList.contains('selected');

            arrayBox.forEach(box => box.classList.remove('selected'));
            if (!isSelected) this.box.classList.add('selected');

            populateAndInitialize(isSelected, this.box.getAttribute('id'));
        });
    }

    deleteBox() {
        this.delete.addEventListener('click', e => {
            this.backendData.promisseDELETE(this.box.getAttribute('id'))
                .then(response => response.json())
                .then(json => { if (json === true) { this.box.remove(); cleanMainSection(); } })
                .catch(err => alert("Não foi possível apagar este elmento."));
        });
    }

    editBox(urlImage) {
        this.edit.addEventListener('click', e => {
            editCardLayout(this.box, this.content, urlImage, this.backendData);
        });
    }
}

function editCardLayout(box, content, urlImg, backendData) {
    const div = newElement('div');
    const back = newElement('img', { class: 'back', src: './images/back.svg' });
    const save = newElement('img', { class: 'save-box', src: './images/save.svg' });
    const urlImage = newElement('input', { class: 'url-img', type: 'text', placeholder: 'Endereço da imagem' });
    urlImage.value = urlImg;
    content.removeAttribute('readonly');

    box.innerHTML = '';
    appendChildren(div, back, save);
    appendChildren(box, div, urlImage, content);

    back.addEventListener('click', e => {
        backendData.promisseGETOne(box.getAttribute("id"))
            .then(response => response.json())
            .then(json => replaceBox(json))
            .catch(err => replaceBox(err));
    });

    save.addEventListener('click', e => {
        const boxJson = `{"id": ${box.getAttribute("id")}, "urlImage": "${urlImage.value}", "content": "${content.value}"}`

        backendData.promissePUT(boxJson)
            .then(response => response.json())
            .then(json => replaceBox(json))
            .catch(err => replaceBox(err));

    });

    function replaceBox(json) {
        try {
            const originalBox = new BoxFactory(json.id, json.urlImage, json.content, backendData);
            box.replaceWith(originalBox);
        } catch (e) {
            alert("Houve um erro.");
        }
    }
}

function populateAndInitialize(isSelected, id) {
    const mainSection = document.getElementById("main-section");

    if (!mainSection || !isSelected) {
        const main = document.querySelector("main");
        main.innerHTML = '';

        getMainSection(main)
            .then(response => {
                sectionEdital(id);
                sectionDisciplinas(id);
                sectionObservacoes(id);
            })
            .catch(err => alert("Houve um problema ao carregar os dados desse concurso."))

    } else {
        cleanMainSection();
    }
}

function cleanMainSection() {
    const main = document.querySelector("main");
    main.innerHTML = '';
};

(function boxContainer() {
    const addBox = document.getElementById('add-box');
    const backendData = new Backend("editais");

    addBox.addEventListener('click', e => {
        const boxJson = `{"id": null, "urlImage": "", "content": ""}`
        backendData.promissePOST(boxJson)
            .then(response => response.json())
            .then(json => {
                const box = new BoxFactory(json.id, json.urlImage, json.content, backendData)
                addBox.insertAdjacentElement("beforebegin", box);
            })
            .catch(err => console.log(err));
    });

    backendData.promisseGET
        .then(response => response.json())
        .then(json => populateHeader(json))
        .catch(err => console.log(err));

    function populateHeader(json) {
        json.forEach(box => {
            addBox.insertAdjacentElement("beforebegin", new BoxFactory(box.id, box.urlImage, box.content, backendData));
        });
    }
})();

// Section edital

function sectionEdital(id) {
    const backendData = new Backend("editais/edital");
    const formEditalCompleto = document.getElementById('edital-completo');
    const linkEditalCompleto = document.getElementById('link-edital-completo');
    const btnLinkEditalCompleto = document.getElementById('btn-link-edital-completo');

    backendData.promisseGETOne(id)
        .then(response => response.json())
        .then(json => { if (json.link) linkEditalCompleto.value = json.link })
        .catch(err => console.log("Houve um erro ao recuperar o link para o edital."));

    formEditalCompleto.addEventListener('submit', e => {
        e.preventDefault();

        const json = `{"id": ${id}, "link": "${linkEditalCompleto.value}"}`;
        const msgErr = "Não foi possível salvar o link.";
        if (setReadOnly(linkEditalCompleto, btnLinkEditalCompleto)) updateText(backendData, json, msgErr);
    });
}

// Section disciplinas

function sectionDisciplinas() {
    const backendData = new Backend("editais/subject");
    const addLine = document.getElementById("add-line");

    backendData.promisseGET
        .then(response => response.json())
        .then(json => json.forEach(subject => appendLine(subject, addLine, backendData)))
        .catch(err => console.log("Não foi possível recuperar os dados dessa matéria."));

    addLine.addEventListener('click', e => {
        backendData.promissePOST(null)
            .then(response => response.json())
            .then(subject => appendLine(subject, addLine, backendData))
            .catch(err => console.log("Não foi possível adicionar mais uma matéria."))
    });
}

function appendLine(subjectData, addLine, backendData) {
    const ul = document.querySelector('#subjects ul');
    let subjectName = null;
    if(ul.children.length > 0) {
        subjectName = ul.lastElementChild.querySelector('.subject-name');
    }
    
    if (subjectName === null || subjectName.value) {
        const li = createLine(subjectData);
        const subjectForm = li.querySelector('.subject-form');

        treatSubjectForm(subjectForm, backendData);

        ul.appendChild(li);
    } else if(!document.getElementById('add-line-error')) {
        const span = newElement('span', {id: 'add-line-error'});
        span.innerText = 'Antes de realizar essa ação, é necessário preencher todas as linhas.';
        addLine.insertAdjacentElement('afterend', span);
        setTimeout(() => {
            span.remove();
        }, 3000);
    }
}

function treatSubjectForm(form, backendData) {
    const name = form.querySelector('.subject-name')
    const edit = form.querySelector('.edit-subject-name');
    const del = form.querySelector('.delete-subject-name');
    const more = form.querySelector('.show-more');
    const content = form.querySelector('.subject-content');
    const editContent = form.querySelector('.edit-content');

    edit.addEventListener('click', e => {
        e.preventDefault();
        const json = `{"id": ${form.getAttribute('id')}, "name": "${name.value}", "content": null}`;
        const msgErr = "Não foi possível salvar o nome da matéria.";
        if (setReadOnly(name, edit)) updateText(backendData, json, msgErr);
    });

    del.addEventListener('click', e => {
        e.preventDefault();
        deleteSubject(form, backendData);
    });

    more.addEventListener('click', e => {
        e.preventDefault();
        showMore(more, form);
    });

    editContent.addEventListener('click', e => {
        e.preventDefault();
        const contentValue = content.value.replace(/\n/g, '\\n');
        const json = `{"id": ${form.getAttribute('id')}, "name": null, "content": "${contentValue}"}`;
        const msgErr = "Não foi possível salvar o conteúdo da matéria.";
        if (setReadOnly(content, editContent)) updateText(backendData, json, msgErr);
    })
}

function deleteSubject(form, backendData) {
    if (confirm('Deseja apagar essa matéria?')) {
        const li = form.parentElement;
        const msgErr = "Não foi possível apagar essa matéria.";
        
        backendData.promisseDELETE(form.getAttribute('id'))
            .then(response => response ? li.remove() : alert(msgErr))
            .catch(err => alert(msgErr));
    }
}

function showMore(button, form) {
    const more = form.querySelector('.more');

    if (more.classList.contains('disabled')) {
        more.classList.remove('disabled');
    } else {
        more.classList.add('disabled');
    }
    button.value = button.value === '▼' ? '▲' : '▼';
}

// Section observações

function sectionObservacoes(id) {
    const backendData = new Backend("editais/comment");
    const commentsForm = document.querySelector('#comments form');
    const textarea = document.getElementById('comments-content');
    const buttonEdit = document.getElementById('edit-comments');

    backendData.promisseGETOne(id)
        .then(response => response.json())
        .then(json => { if (json.comments) textarea.value = json.comments })
        .catch(err => console.log("Houve um erro ao recuperar os comentários."));

    commentsForm.addEventListener('submit', e => {
        e.preventDefault();

        const json = `{"id": ${id}, "comments": "${textarea.value}"}`;
        const msgErr = "Não foi possível salvar os comentários.";
        if (setReadOnly(textarea, buttonEdit)) updateText(backendData, json, msgErr);
    });
}

// General purpose functions

function setReadOnly(fieldReadOnly, button) {
    let save = false;
    if (fieldReadOnly.getAttribute('readonly')) {
        fieldReadOnly.removeAttribute('readonly');
    } else {
        fieldReadOnly.setAttribute('readonly', 'true');
        save = true;
    }
    button.value = button.value === '🗒' ? '✔' : '🗒';
    return save;
}

function updateText(backendData, json, msgErr) {
    backendData.promissePUT(json)
        .then(response => response.json())
        .then(json => { if (!json) alert(msgErr) })
        .catch(err => alert(msgErr))
}
