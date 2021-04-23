export function getMainSection(main) {

    return fetch("./editais main section.html")
        .then(response => response.text())
        .then(text => textToElement(text))

    function textToElement(text) {
        try {
            const parse = new DOMParser();
            const html = parse.parseFromString(text, 'text/html');
            const mainSection = html.getElementById('main-section');
            main.appendChild(mainSection)
        } catch (err) {
            alert("Houve um problema ao carregar os dados desse concurso.")
        }
    }

}

export function createLine(subjectData) {
    const liMain = newElement('li');
    const subjectForm = newElement('form', { id: subjectData.id, class: 'subject-form' });
    const divMainPart = newElement('div', {class: 'main-part'});
    const subjectName = newElement('input', { class: 'subject-name', type: 'text', placeholder: 'Nome da matéria', maxlength: '40', readonly: 'true' });
    const editSubjectName = newElement('input', { class: 'edit-subject-name', type: "submit", value: '🗒' });
    const deleteSubjectName = newElement('input', { class: "delete-subject-name", type: "submit", value: '🗑' });
    const showMore = newElement('input', { class: "show-more", type: "submit", value: '▼' });
    const divMore = newElement('div', {class: "more disabled"});
    const subjectContent = newElement('textarea', { class: "subject-content", rows: 10, placeholder: 'conteúdo', readonly: 'true' });
    const saveMore = newElement('input', { class: "edit-content", type: "submit", value: '🗒' });

    if(subjectData.name) subjectName.value = subjectData.name;
    if(subjectData.content) subjectContent.value = subjectData.content;

    appendChildren(divMainPart, subjectName, editSubjectName, deleteSubjectName, showMore);
    appendChildren(divMore, subjectContent, saveMore);
    appendChildren(subjectForm, divMainPart, divMore);
    appendChildren(liMain, subjectForm);

    return liMain;
}

export function newElement(type, attributes) {
    const element = document.createElement(type);
    for (let key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
    return element;
}

export function appendChildren(parent, ...children) {
    for (let child of children) {
        parent.appendChild(child);
    }
}
