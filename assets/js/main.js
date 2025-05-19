
function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join(' ')}
                </ol>

                <img src="${pokemon.photo}">

            </div>
        </li>
    `
}

/*fetch retorna uma promise que é usada para lidar com assincronismo no JS. Uma Promise é usada para evitar que a página trave enquanto o navegador espera alguma tarefa demorada terminar (tipo buscar dados de uma API). Quando essa tarefa termina, a Promise avisa se deu certo (resolve) ou se deu ruim (reject)*/

const pokemonList = document.getElementById("pokemonList")

pokeApi.getPokemons().then((pokemons = []) => {
    pokemonList.innerHTML += pokemons.map(convertPokemonToLi).join('')
})