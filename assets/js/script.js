/* offset = recuperar a posição atual de um elemento em relação ao documento, nesse caso posição 0*/
const offset = 0;

/*parâmetro de query usado para limitar a quantidade de resultados que o servidor vai retornar. Nesse caso trará 10 pokemons */
const limit = 10;

/*url que será utilizada para acessar os dados, colocando o offset e limit de forma dinâmica */
const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

/*fetch retorna uma promise que é usada para lidar com assincronismo no JS. Uma Promise é usada para evitar que a página trave enquanto o navegador espera alguma tarefa demorada terminar (tipo buscar dados de uma API). Quando essa tarefa termina, a Promise avisa se deu certo (resolve) ou se deu ruim (reject)*/
fetch(url)
    //caso a resposta(response) seja sucesso, você programa o que será feito com o then, nesse caso solicita o json da response
    .then((response) => response.json())
    //tendo sucesso no requisição anterior, define o que será feito com o retorno com um novo then
    .then((jsonBody) => console.log(jsonBody))
    //caso dê erro no carregamento, você trata com o catch
    .catch((error) => console.log(error))
    //caso deseje sinalizar, independente do sucesso ou do fracasso pode usar o finally
    .finally(() => console.log("Requisição concluida!"))
;
