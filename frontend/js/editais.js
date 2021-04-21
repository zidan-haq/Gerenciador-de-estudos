import { Backend } from './backendConnection.js';

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

            populateAndInitialize(isSelected);
        });
    }

    deleteBox() {
        this.delete.addEventListener('click', e => {
            this.backendData.promisseDELETE(this.box.getAttribute('id'))
                .then(response => response.json())
                .then(json => {
                    if (json === true) {
                        this.box.remove()
                        const mainSection = document.getElementById("main-section");
                        if (!mainSection.classList.contains('disabled')) mainSection.classList.add('disabled');
                    }
                })
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

(function boxContainer() {
    const addBox = document.getElementById('add-box');
    const backendData = new Backend("editais");

    addBox.addEventListener('click', e => {
        const boxJson = `{"id": null, "urlImage": "#", "content": ""}`
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

function populateAndInitialize(isSelected) {
    const mainSection = document.getElementById("main-section");
    if (mainSection.classList.contains('disabled') || !isSelected) {
        mainSection.classList.remove('disabled');
        //popule os campos aqui;
    } else {
        mainSection.classList.add('disabled');
    }
    /*
    sectionEdital();
    sectionDisciplinas();
    sectionObservacoes(); */
}

// Section edital

function sectionEdital() {

    const formEditalCompleto = document.getElementById('edital-completo');
    const linkEditalCompleto = document.getElementById('link-edital-completo');
    const btnLinkEditalCompleto = document.getElementById('btn-link-edital-completo');

    formEditalCompleto.addEventListener('submit', e => {
        e.preventDefault();
        setReadOnly(linkEditalCompleto, btnLinkEditalCompleto);
    });
}

function sectionDisciplinas() {
    const subjectForms = () => document.querySelectorAll('.subject-form');
    const subjectContentForms = () => document.querySelectorAll('.subject-content-form');
    const addLine = document.getElementById('add-line');

    subjectForms().forEach(form => treatSubjectForm(form));
    subjectContentForms().forEach(form => treatSubjectContentForm(form));

    function treatSubjectForm(form) {
        const edit = form.querySelector('.edit-subject-name');
        const del = form.querySelector('.delete-subject-name');
        const more = form.querySelector('.show-more');

        edit.addEventListener('click', e => {
            e.preventDefault();
            editSubjectName(edit, form);
        });

        del.addEventListener('click', e => {
            e.preventDefault();
            deleteSubjectName(subjectForms().length, form);
        });

        more.addEventListener('click', e => {
            e.preventDefault();
            showMore(more, form);
        });
    }

    function treatSubjectContentForm(form) {
        form.addEventListener('submit', e => {
            e.preventDefault();
            const subjectContent = form.querySelector('.subject-content');
            const saveMore = form.querySelector('.save-more');
            setReadOnly(subjectContent, saveMore);
        });
    }

    function editSubjectName(button, form) {
        const subjectName = form.querySelector(".subject-name");
        setReadOnly(subjectName, button);
    }

    function deleteSubjectName(quantity, form) {
        if (confirm('Deseja apagar essa matéria?')) {
            const li = form.parentElement;
            if (quantity === 1) {
                const subject = form.querySelector(".subject-name");
                const subjectContent = li.querySelector(".subject-content-form .subject-content")
                subject.value = '';
                subjectContent.value = '';

                /* Nessa parte a exclusão dos elementos é salva no backend, deve ser o mesmo método usado no else logo abaixo >>>--------------> Falta implementar <--------------<<< */
            } else {
                li.remove();

                /* Nessa parte a exclusão dos elementos é salva no backend >>>--------------> Falta implementar <--------------<<< */
            }
        }
    }

    function showMore(button, form) {
        const li = form.parentElement;
        const more = li.querySelector('.more');

        if (more.classList.contains('disabled')) {
            more.classList.remove('disabled');
        } else {
            more.classList.add('disabled');
        }
        button.value = button.value === '▼' ? '▲' : '▼';
    }

    addLine.addEventListener('click', () => {
        const ul = document.querySelector('#subjects ul');
        const subjectName = ul.lastElementChild.querySelector('.subject-name');

        if (subjectName.value) {
            const li = createLine();
            const subjectForm = li.querySelector('.subject-form');
            const subjectContentForm = li.querySelector('.subject-content-form');

            treatSubjectForm(subjectForm);
            treatSubjectContentForm(subjectContentForm);

            ul.appendChild(li);
        } else {
            const span = document.createElement('span');
            span.innerText = 'Antes de realizar essa ação, é necessário preencher todas as linhas.';
            span.setAttribute('id', 'add-line-error')
            addLine.insertAdjacentElement('afterend', span);
            setTimeout(() => {
                document.getElementById('add-line-error').remove();
            }, 3000);
        }
    })
}

function sectionObservacoes() {
    const commentsForm = document.querySelector('#comments form');
    const textarea = document.getElementById('comments-content');
    const buttonEdit = document.getElementById('edit-comments');

    commentsForm.addEventListener('submit', e => {
        e.preventDefault();
        setReadOnly(textarea, buttonEdit);
    })
}

/* Nessa parte os elementos são povoados pelo backend >>>--------------> Falta implementar <--------------<<< */
function populateFields(dados) {

};

function setReadOnly(fieldReadOnly, button) {
    if (fieldReadOnly.getAttribute('readonly')) {
        fieldReadOnly.removeAttribute('readonly');
    } else {
        fieldReadOnly.setAttribute('readonly', 'true');
        /* Nessa parte os elementos são salvos no backend >>>--------------> Falta implementar <--------------<<< */
    }
    button.value = button.value === '🗒' ? '✔' : '🗒';
}

function createLine() {
    const liMain = newElement('li');
    const subjectForm = newElement('form', { class: 'subject-form' });
    const subjectName = newElement('input', { class: 'subject-name', type: 'text', placeholder: 'Nome da matéria', readonly: 'true' });
    const editSubjectName = newElement('input', { class: 'edit-subject-name', type: "submit", value: '🗒' });
    const deleteSubjectName = newElement('input', { class: "delete-subject-name", type: "submit", value: '🗑' });
    const showMore = newElement('input', { class: "show-more", type: "submit", value: '▼' });
    const ul = newElement('ul');
    const liSub = newElement('li', { class: "more disabled" });
    const subjectContentForm = newElement('form', { class: "subject-content-form" });
    const subjectContent = newElement('textarea', { class: "subject-content", cols: "30", rows: "10", readonly: 'true' });
    const saveMore = newElement('input', { class: "save-more", type: "submit", value: '🗒' });

    appendChildren(subjectContentForm, subjectContent, saveMore);
    appendChildren(liSub, subjectContentForm);
    appendChildren(ul, liSub);
    appendChildren(subjectForm, subjectName, editSubjectName, deleteSubjectName, showMore);
    appendChildren(liMain, subjectForm, ul);

    return liMain;
}

function newElement(type, attributes) {
    const element = document.createElement(type);
    for (let key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
    return element;
}

function appendChildren(parent, ...children) {
    for (let child of children) {
        parent.appendChild(child);
    }
}
