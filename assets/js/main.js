
const pokemonList = document.getElementById("pokemonList");
const loadMoreButton = document.getElementById("loadMoreButton");
//DINAMISMO POPUP
//1-PEGAR OS ELEMENTOS HTML
const pokemonDetailsPopup = document.getElementById('pokemonDetailsPopup');
const closePopupBtn = document.getElementById('closePopupBtn');
const detailsNamePokemon = document.getElementById('detailsNamePokemon');
const detailsPhotoPokemon = document.getElementById('detailsPhotoPokemon');


const maxRecords = 151;
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
        //add data-id para guardar id do pokemon quando for clicado
        const newHtml = pokemons.map((pokemon) => `
            <li class="pokemon ${pokemon.type}" data-id="${pokemon.number}">
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

        //adicionar evento de click ao data-id para exibir detalhes
        document.querySelectorAll('.pokemon').forEach(card => { //seleciona todos os elementos de .pokemon -> para cada card irá 
            card.addEventListener('click', () => {             //adicionar o evento de click
                const pokemonId = card.getAttribute('data-id');
                fetchPokemonDetails(pokemonId);
            })
        })

        hideLoadingSpinner();
    }).catch((error) => {
        console.error("Erro ao carregar Pokemons:", error);
        hideLoadingSpinner();
    }) 
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit

    const qtdRecordsWithNextPage = offset + limit;

    if(qtdRecordsWithNextPage >= maxRecords) {
        const newLimit = maxRecords - offset;
        loadPokemonItens(offset, newLimit);

        loadMoreButton.parentElement.removeChild(loadMoreButton);

    } else {
        loadPokemonItens(offset, limit);
    }
})

function fetchPokemonDetails(id) {
    
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`) //faz um fetch na PokeAPI
    .then(response => response.json()) //converte o resultado em JSON
    .then(data => {
        console.log("Detalhes do Pokemon", data);

        //exibir dados de Nome e imagem do html no card
        detailsNamePokemon.textContent = data.name;
        detailsPhotoPokemon.src = data.sprites.other['official-artwork'].front_default || data.sprites.front_default; //tentar pegar melhor qualidade
        detailsNamePokemon.alt = data.name;

        //exibir detalhes de info
        document.getElementById('detailsSpecies').textContent = data.species.name;
        document.getElementById('detailsHeight').textContent = `${data.height / 10} m`; //dividido por 10 pois a pokeapi retorna em decimetros
        document.getElementById('detailsWeight').textContent = `${data.weight / 10} kg`; //dividido por 10 pois a pokeapi retorna em hectogramas
        document.getElementById('detailsAbility').textContent = data.abilities
            .map(item => item.ability.name).join(', '); //percorre as habilidades criando um array, .join junta todas em única string separada por ,

        //mostrar popup
        pokemonDetailsPopup.classList.add('show');
    })
    .catch(error => {
        console.error('Erro ao buscar detalhes do Pokemon', error);
    })
}

//fechar o popup
closePopupBtn.addEventListener('click', () => {
    pokemonDetailsPopup.classList.remove('show');
})








