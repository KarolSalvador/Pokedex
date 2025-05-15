/* offset = recuperar a posição atual de um elemento em relação ao documento, nesse caso posição 0*/
const offset = 0;

/*parâmetro de query usado para limitar a quantidade de resultados que o servidor vai retornar. Nesse caso trará 10 pokemons */
const limit = 10;

/*url que será utilizada para acessar os dados, colocando o offset e limit de forma dinâmica */
const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon">
            <span class="number">#001</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    <li class="type">Grass</li>
                    <li class="type">Poison</li>
                </ol>

                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg" alt="${pokemon.name}">

            </div>
        </li>
    `
}

/*fetch retorna uma promise que é usada para lidar com assincronismo no JS. Uma Promise é usada para evitar que a página trave enquanto o navegador espera alguma tarefa demorada terminar (tipo buscar dados de uma API). Quando essa tarefa termina, a Promise avisa se deu certo (resolve) ou se deu ruim (reject)*/

const pokemonList = document.getElementById("pokemonList")

pokeApi.getPokemons().then((pokemons = []) => {
    pokemonList.innerHTML += pokemons.map(convertPokemonToLi).join('')
})