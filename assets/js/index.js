//Abre modal com as informações do GitHub usando a API
const user = document.querySelector(".user");
const button = document.querySelector(".button");
const modal = document.querySelector("dialog");
const modalClose = document.querySelector(".modal-close");
const buttonRepository = document.querySelector(".button-repository");

button.onclick = function () {
    modal.showModal();
}

button.addEventListener("click", () => {
    const inputValue = user.value;

    fetch(`https://api.github.com/users/${inputValue}`)
        .then(function (response) { return response.json() })
        .then(function (responseJson) {
            modal.insertAdjacentHTML("beforeend", `
        <div class="informacoes">
            <img class="perfil" src="${responseJson.avatar_url}" alt="" />
            <h1>${responseJson.name}</h1>
            <div class="location">
                <img class="local-icon" src="assets/images/localizacao/local.png">
                <p>${responseJson.location}</p>
            </div>
            <p>${responseJson.bio}</p>
            <button onclick="showRepositories()" class="button-repository">View Repository</button>
        </div>
    `)
        })

})

function showRepositories() {
    const inputValue = user.value;
    fetch(`https://api.github.com/users/${inputValue}/repos`)
        .then(function (response) { return response.json(); })
        .then(function (responseJson) {
            responseJson.map(repository => modal.insertAdjacentHTML("beforeend", `
                <div class="repositorio">
                    <h2>${repository.name}</h2>
                    <p>< / > ${repository.language}</p>
                    <a class="button-code" href="${repository.html_url}" target="_blank">See Code</a>
                </div>`
            ))
        })
}

modal.addEventListener('click', event => {
    const nomeDaClasseDoElementoClicado = event.target.classList[0];
    const classNames = ['modal-close'];
    const DeveFecharModal = classNames.some(classNames => classNames === nomeDaClasseDoElementoClicado);

    if (DeveFecharModal) {
        modal.close();
        window.location.reload(true);
    }

    user.value = "";
    user.focus();
})