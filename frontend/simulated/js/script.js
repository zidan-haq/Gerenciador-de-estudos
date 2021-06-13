import { Backend } from '../../js/backendConnection.js';
import { createRow, getRegisterProof } from "./htmlElements.js";
import { initiate as initiateRP } from './registerProof.js';


(function bootControl() {
    getAllProofs();
    optionButtons();
})();

async function getAllProofs() {
    try {
        const backend = new Backend("performance/proofs");
        const response = await backend.promisseGET
        const json = await response.json();
        populateListProof(json);
    } catch (err) {
        console.log(err)
        alert("Não foi possível conectar com o banco de dados.");
    }
}

function optionButtons() {
    const insertProof = document.getElementById("insert-proof");
    const reload = document.getElementById("reload");
    const makeTxt = document.getElementById("make-txt");
    const correctTxt = document.getElementById("correct-txt");

    insertProof.addEventListener("click", e => {
        changeMain();
    });

    reload.addEventListener("click", e => {
        const local = location.href.replace("#proofs", "");
        location.href = local + "#proofs";
        getAllProofs();
    });

    makeTxt.addEventListener("click", e => {
        prompt("Quantas questões?");
    });
}

function populateListProof(list) {
    const proofsTable = document.getElementById("proofs-table");
    proofsTable.innerHTML = "";
    list.forEach(proof => {
        const row = proofsTableRow(proof);
        proofsTable.appendChild(row);
    });
}

function proofsTableRow(proof) {
    const type = proof.type.replaceAll("_", " ").toLowerCase();
    const date = new Date(proof.date).toLocaleString();

    return createRow("proofsTable", "td", proof.id, type, proof.name, date, proof.quantity, proof.result, proof.percentage);
}

function changeMain() {
    const main = document.querySelector("main");
    if(main.querySelector("#options-content")) {
        getRegisterProof(main)
        .then(response => initiateRP());
    } else {
        location.reload;
    }
}