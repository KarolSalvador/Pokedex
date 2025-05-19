
const pokemonList = document.getElementById("pokemonList");
const loadMoreButton = document.getElementById("loadMoreButton");
const limit = 8;
let offset = 0;

function showLoadingSpinner() {
    loadingSpinner.classList.remove('hidden');
}

function hideLoadingSpinner() {
    loadingSpinner.classList.add('hidden');
}


/*fetch retorna uma promise que é usada para lidar com assincronismo no JS. Uma Promise é usada para evitar que a página trave enquanto o navegador espera alguma tarefa demorada terminar (tipo buscar dados de uma API). Quando essa tarefa termina, a Promise avisa se deu certo (resolve) ou se deu ruim (reject)*/

function loadPokemonItens(offset, limit) {
    showLoadingSpinner();

    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map((pokemon) => `
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
        `).join(' ')
        pokemonList.innerHTML += newHtml;
        hideLoadingSpinner();
    }).catch((error) => {
        console.error("Erro ao carregar Pokemons:", error);
        hideLoadingSpinner();
    }) 
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    loadPokemonItens(offset, limit)
})

