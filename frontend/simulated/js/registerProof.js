import { Backend } from "../../js/backendConnection.js"
import { newElement, appendChildren } from "./htmlElements.js";
import { constraintInteger, constraintIntSequences} from "./constraints.js"

export function initiate() {
    back();
    proofForm();
};

function back() {
    const btnBack = document.getElementById("img-back");

    btnBack.addEventListener('click', e => {
        if (confirm(
            "Todas as alterações realizadas serão descartadas.\nDeseja sair mesmo assim?"
        )) location.reload();
    });
}

function proofForm() {
    const form = document.getElementById("proof-form");
    const quantity = document.getElementById("field-quantity");
    const wrongs = document.getElementById("field-wrongs");
    const corrects = document.getElementById("field-corrects");
    const blank = document.getElementById("field-blank");

    constraintInteger(quantity, wrongs, corrects, blank);

    form.addEventListener("input", e => {
        showBtnNext(checkFields());
    });
}

function checkFields() {
    const form = document.getElementById("proof-form");
    const name = document.getElementById("field-name");
    const date = document.getElementById("field-date");
    const select = document.getElementById("field-type");
    const type = select.children[select.selectedIndex];
    const quantity = document.getElementById("field-quantity");
    const wrongs = document.getElementById("field-wrongs");
    const corrects = document.getElementById("field-corrects");
    const blank = document.getElementById("field-blank");

    const list = [name, date, type, quantity, wrongs, corrects, blank];

    const boolean1 = list.filter(x => x.value !== "").length === list.length;
    const boolean2 = quantityError(form, type, quantity, wrongs, corrects, blank);
    const object = {
        "type":type.value, 
        "wrongs": parseInt(wrongs.value),
        "corrects": parseInt(corrects.value),
        "blank": parseInt(blank.value)
    };
    const calc = calculate(form, object);

    boolean2 ? calc.compute() : calc.cleanFields();

    return boolean1 * boolean2;
}

function quantityError(form, type, quantity, wrongs, corrects, blank) {
    if (!quantity.value || !wrongs.value || !corrects.value || !blank.value) return false;

    let error = formError(form, type.parentElement, quantity, wrongs, corrects, blank);
    
    try {
        const sum = parseInt(wrongs.value) + parseInt(corrects.value) + parseInt(blank.value);
        const quant = parseInt(quantity.value);
        if (quant !== sum || quant.length > 0) {
            throw new Error("A quantidade de questões não coincide com a quantidade informada!");
        }
        else if (!type.value) {
            throw new Error("Você precisa selecionar um tipo de prova.")
        }
        error.hiddenFormError();
        return true;
    } catch (e) {
        error.showFormError(e);
        return false;
    }
}

function formError(form, ...fields) {
    return {
        showFormError(message) {
            const header = newElement("p", { "class": "form-error-added", "style": "color: red;" }, "Erro:")
            const paragraph = newElement("p", { "class": "form-error-added", "style": "color: red;" }, message);
            if (!form.querySelector(".form-error-added")) {
                appendChildren(form, header, paragraph);
                fields.forEach(x => x.setAttribute("style", "border-color: red;"));
            }
        },

        hiddenFormError() {
            document.querySelectorAll(".form-error-added").forEach(value => value.remove());
            fields.forEach(x => x.removeAttribute("style"));
        }
    }
}

function calculate(form, object) {
    const performance = document.getElementById("field-performance");
    const positives = document.getElementById("field-positives");
    const percentage = document.getElementById("field-percentage");
    
    return {
        compute() {
            postBackend(form, performance, positives, percentage, object)
        },
        
        cleanFields() {
            performance.value = "";
            positives.value = "";
            percentage.value = "";
        }
    }
}

function showBtnNext(boolean) {
    const arrow = document.getElementById("btn-next");
    const proofForm = document.getElementById("proof-form");

    if(boolean) {
        arrow.classList.remove("disabled")
        arrow.onclick = proofForm.classList.add("disabled");
    } else {
        arrow.classList.add("disabled");
    }
}

async function postBackend(form, performance, positives, percentage, object) {
    const backend = new Backend("performance/general-performance")
    try {
        const json = JSON.stringify(object);
        const response = await backend.promissePOST(json);
        const values = await response.json();
        performance.value = values.result;
        positives.value = values.points;
        percentage.value = `${values.percentage}%`;
    } catch (e) {
        const error = formError(form);
        error.showFormError(`Houve um erro ao conectar com o servidor.\n${e}`);
    }
}
