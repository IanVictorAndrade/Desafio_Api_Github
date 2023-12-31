
async function buscarDadosApi(event) {

    event.preventDefault();
    try {

        const username = document.getElementById("input-user").value.toLowerCase();
        const response = await fetch(`https://api.github.com/users/${username}/repos`);

        if (!response.ok) {
            throw new Error("Não foi possível obter os dados da API");
        }

        const data = await response.json();
        console.log(data);

    } catch (error) {
        console.error(error);
    }
}