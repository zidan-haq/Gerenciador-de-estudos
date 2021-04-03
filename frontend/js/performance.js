const card = document.querySelector("#cards .card");

card.addEventListener('click', () => {
    console.log('foi clicado')
    location.href = "#modal-window";
});
