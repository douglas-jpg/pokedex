const PokemonName = document.querySelector(".pokemon_name");
const PokemonNumber = document.querySelector(".pokemon_number");
const PokemonImage = document.querySelector(".pokemon__image");

const form = document.querySelector(".form");
const input = document.querySelector(".input_search");
const prev = document.querySelector(".btn-prev");
const next = document.querySelector(".btn-next");

let idPokemon = 1;

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if(APIResponse.status == 200){
        const data = await APIResponse.json();
        return data;
    }
}

const renderPokemon = async (pokemon) => {

    PokemonName.innerHTML = 'Carregando...';
    PokemonNumber.innerHTML = '';

    const data = await fetchPokemon(pokemon);

    if (data) {
        PokemonName.innerHTML = data.name;
        PokemonNumber.innerHTML = data.id;
        PokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        input.value = '';
        idPokemon = data.id;
    } else {
        PokemonImage.style.display = 'none'
        PokemonName.innerHTML = 'Não encontrado';
        PokemonNumber.innerHTML = '';
    }

}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
})

next.addEventListener('click', () => {
    idPokemon++;
    renderPokemon(idPokemon);
})

prev.addEventListener('click', () => {
    if(idPokemon > 1){
        idPokemon--;
        renderPokemon(idPokemon);
    }
})

renderPokemon(idPokemon);
