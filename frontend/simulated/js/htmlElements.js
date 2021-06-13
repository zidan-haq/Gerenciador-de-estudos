export function createRow(tableType, cellType, ...cellText) {
    const row = document.createElement('tr');
    let columns
    if (tableType === "proofsTable") {
        columns = cellText.map(value => value = newElement(cellType, null, value));
        const cell = document.createElement(cellType);
        cell.appendChild(newElement("img", { src: "./images/remove.svg" }));
        columns.push(cell);
    }
    else if (tableType === "subjectsTable") {
        columns = [newElement("th", null, cellType)] // nesse cellType está o indíce da coluna th

        for (let x = 0; x < cellText; x++) { // nesse cellText está a quantidade de células td que serão criadas
            const td = document.createElement("td");
            const id = `${cellType}${x}`;
            
            if (id !== "00") {
                const select = createSelect(id);
                td.appendChild(select);
                listenerSelect(select, td);
            }
            
            columns.push(td);
        }
    }

    columns.forEach(column => row.appendChild(column));

    return row;
}

function createSelect(id) {
    const select = newElement("select", { id: id });
    const b = newElement("option", { value: " " }, "B");
    const c = newElement("option", { value: "correct" }, "C");
    const e = newElement("option", { value: "wrong" }, "E");
    appendChildren(select, b, c, e);
    return select;
}

function listenerSelect(select, td) {
    select.addEventListener("change", e => {
        if (select.options[select.selectedIndex].value === "correct") {
            td.setAttribute("class", "blue");
        }
        else if (select.options[select.selectedIndex].value === "wrong") {
            td.setAttribute("class", "red");
        }
        else {
            td.removeAttribute("class");
        }
    });
}

export function newElement(type, attributes, innerText) {
    const element = document.createElement(type);

    for (let key in attributes) {
        element.setAttribute(key, attributes[key]);
    }

    if (innerText || innerText === 0) element.innerText = innerText;

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
