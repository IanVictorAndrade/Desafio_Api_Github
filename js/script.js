async function pegarUsername(event) {

    event.preventDefault();
    const username = document.getElementById("input-user").value.toLowerCase();
    const response = await fetch(`https://api.github.com/users/${username}/repos`)

    if (response.status === 200) {
    window.location.href = 'paginaRepositorios.html?username=' + username;
    } else {
        alert("Usuário não encontrado!");
    }

}

function voltar() {
    window.location.href = 'index.html';
}


document.addEventListener("DOMContentLoaded", async function() {
    const params = new URLSearchParams(window.location.search);
    const username = params.get("username");
    const userImage = document.getElementById("userImg");
    const userName = document.getElementById("userName");
    const tituloCard = document.getElementById("tituloCard");
    const descricaoCard = document.getElementById("descricaoCard");
    const button = document.getElementById("button");
    
    
    await fetch(`https://api.github.com/users/${username}/repos`)
        .then(response => response.json())
        .then(data => {
            // Iterar sobre cada repositório
            data.forEach(repo => {
                const owner = repo.owner;
                const avatarUrl = owner.avatar_url;
                const repoName = repo.name;
                const repoDescription = repo.description;
                const linkRepo = repo.svn_url;

                userName.innerHTML = owner.login;
                userImage.src = avatarUrl;
                tituloCard.innerHTML = repoName;
                descricaoCard.innerHTML = repoDescription;
                button.href = linkRepo;
            });
        })
        .catch((error) => {
            console.error('Erro:', error);
        });
 });
 