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

document.addEventListener("DOMContentLoaded", async function() {
    const params = new URLSearchParams(window.location.search);
    const username = params.get("username");
    const userImage = document.getElementById("userImg");
    const userName = document.getElementById("userName");
    const repoList = document.getElementById("repoList");
    
    await fetch(`https://api.github.com/users/${username}/repos`)
        .then(response => response.json())
        .then(data => {
            userImage.src = data[0].owner.avatar_url;
            userName.innerHTML = data[0].owner.login;
            userName.href = data[0].owner.html_url;    
            // Iterar sobre cada repositório
            data.forEach(repo => {
                
                const repoName = repo.name;
                const repoDescription = repo.description;
                const linkRepo = repo.svn_url;
                const divNova = document.createElement("div");
                const title = document.createElement("p");
                const description = document.createElement("p");
                const button = document.createElement("button");
                const iconButton = document.createElement("img");

                title.innerHTML = repoName;
                description.innerHTML = repoDescription;
                button.innerHTML = "<img src='./assets/Vector.svg'> Abrir repositório";
                button.onclick = () => window.open(linkRepo);
                iconButton.src = "./assets/Vector.svg";
                button.className = "button";
                divNova.className = "card";
                title.className = "card-title";
                description.className = "card-description";
                

                divNova.appendChild(title);
                divNova.appendChild(description);
                divNova.appendChild(button);
                repoList.appendChild(divNova);

            });
        })
        .catch((error) => {
            console.error('Erro:', error);
        });
 });
 