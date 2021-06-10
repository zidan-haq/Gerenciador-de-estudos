export function proofsTableRow(proof) {
    const type = proof.type.replaceAll("_", " ").toLowerCase();
    const date = new Date(proof.date).toLocaleString();

    return createRow("proofsTable", "td", proof.id, type, proof.name, date, proof.quantity, proof.result, proof.percentage);
}

function createRow(tableType, cellType, ...cellText) {
    const row = document.createElement('tr');
    let columns
    if (tableType === "proofsTable") {
        columns = cellText.map(value => value = newElement(cellType, null, value));
        const cell = document.createElement(cellType);
        cell.appendChild(newElement("img", { src: "./images/remove.svg" }));
        columns.push(cell);
    }

    columns.forEach(column => row.appendChild(column));

    return row;
}

export function newElement(type, attributes, innerText) {
    const element = document.createElement(type);

    for (let key in attributes) {
        element.setAttribute(key, attributes[key]);
    }

    if (innerText) element.innerText = innerText;

    return element;
}

export function appendChildren(parent, ...children) {
    for (let child of children) {
        parent.appendChild(child);
    }
}

export async function getRegisterProof(main) {
    try {
        const parse = new DOMParser();
        const response = await fetch("./register proof.html");
        const text = await response.text();
        const html = parse.parseFromString(text, "text/html");
        main.replaceWith(html.querySelector("main"));
    } catch (err) {
        alert("Não foi possível pegar o campo de registro de prova.");
    }
}
