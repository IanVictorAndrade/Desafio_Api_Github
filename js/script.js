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
    let params = new URLSearchParams(window.location.search);
    let username = params.get("username");
    
    await fetch(`https://api.github.com/users/${username}/repos`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch((error) => {
            console.error('Erro:', error);
        });
 });
 