(function headerBoxes() {
    const arrayBox = document.querySelectorAll('#main-container .box');

    for (let box of arrayBox) {
        box.addEventListener('click', e => {
            boxSelected(box);
        })
    }

    function boxSelected(box) {
        arrayBox.forEach(box => box.classList.remove('selected'));
        if (!box.classList.contains('selected')) box.classList.add('selected');

        sectionEditais(new Backend(box));
    }
})();

class Backend {
    constructor(box) {
        box;
    }

    datasOf(box) {
        /* é necessário implementar essa parte para receber os dados do backend e fornêce-los a função principal >>>--------------> Falta implementar <--------------<<<*/
    }
}

function sectionEditais(datas) {
    document.querySelector('main .disabled').classList.remove('disabled');

    const formEditalCompleto = document.getElementById('edital-completo');
    const linkEditalCompleto = document.getElementById('link-edital-completo');
    const btnLinkEditalCompleto = document.getElementById('btn-link-edital-completo');
    const subjectForms = () => document.querySelectorAll('.subject-form');
    const subjectContentForms = () => document.querySelectorAll('.subject-content-form');
    const addLine = document.getElementById('add-line');

    formEditalCompleto.addEventListener('submit', e => {
        e.preventDefault();
        setReadOnly(linkEditalCompleto, btnLinkEditalCompleto);
    });

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

    function setReadOnly(fieldReadOnly, button) {
        if (fieldReadOnly.getAttribute('readonly')) {
            fieldReadOnly.removeAttribute('readonly');
        } else {
            fieldReadOnly.setAttribute('readonly', 'true');
            /* Nessa parte os elementos são salvos no backend >>>--------------> Falta implementar <--------------<<< */
        }
        button.value = button.value === '🗒' ? '✔' : '🗒';
    }

    /* Nessa parte os elementos são povoados pelo backend >>>--------------> Falta implementar <--------------<<< */
    function populateFields(dados) {
        linkEditalCompleto.value = 'dados.linkEditalCompleto';
    };
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

    return liMain;
}
