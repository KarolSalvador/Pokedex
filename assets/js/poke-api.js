const pokeApi = {}
pokeApi.getPokemons = (offset = 0, limit = 10) => {

    /*url que será utilizada para acessar os dados, colocando o offset e limit de forma dinâmica */
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

    return fetch(url)
        //caso a resposta(response) seja sucesso, você programa o que será feito com o then, nesse caso solicita o json da response
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .catch((error) => console.error(error))
}