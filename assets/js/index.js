const user = document.querySelector(".user");
const button = document.querySelector(".button");
const modal = document.querySelector("dialog");
const modalClose = document.querySelector(".modal-close");

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
            <img src="${responseJson.avatar_url}" alt="" />
            <h1>${responseJson.name}</h1>
            <p>${responseJson.bio}</p>
        </div>
    `)
        })

    fetch(`https://api.github.com/users/${inputValue}/repos`)
        .then(function (response) { return response.json(); })
        .then(function (responseJson) {
            responseJson.map(repository => modal.insertAdjacentHTML("beforeend", `
        <div class="repositorio">
            <h2>${repository.name}</h2>
            <a 
            href="${repository.html_url}"     
            target="_blank">
            Ver código
            </a>
        </div>`
            ))
        })

    modal.addEventListener('click', event => {
        const nomeDaClasseDoElementoClicado = event.target.classList[0];
        const classNames = ['modal-close'];
        const DeveFecharModal = classNames.some(classNames => classNames === nomeDaClasseDoElementoClicado);

        modal.insertAdjacentHTML("beforebegin", ``);

        if (DeveFecharModal) {
            modal.close();
        }

        user.value = "";
        user.focus();
    })

})