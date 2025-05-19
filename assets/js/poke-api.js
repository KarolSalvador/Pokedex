const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types
    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    //faz uma requisição na API das urls dos pokemons
    return fetch(pokemon.url)
        //recebe o retorno da API e converte para JSON
        .then((response) => response.json()) 
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {

    /*url que será utilizada para acessar os dados, colocando o offset e limit de forma dinâmica */
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

    //pega a lista de pokemons no servidor
    return fetch(url)
        //converte a lista de pokemons em JSON e retorna uma nova Promise
        .then((response) => response.json())
        //acessa a propriedade results do corpo JSON e retorna uma nova Promise
        .then((jsonBody) => jsonBody.results)
        /*recebe a lista de Pokemons (objetos com um url cada). Mapeia cada Pokemon com sua url(fazendo várias requisições, uma para cada pokemon pegando os detalhes de cada) o resultado será um array de Promises já convertido para JSON*/
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        //recebe o array de JSON. E Promise.all() espera que todas asPromises sejam resolvidas, feito isso ela retorna um array com as respostas de cada requisição.
        .then((detailRequests) => Promise.all(detailRequests))
        //devolve a lista
        .then((pokemonsDetails) => pokemonsDetails)

        //caso der erro na requisição retorna um erro
        .catch((error) => console.error(error))
}