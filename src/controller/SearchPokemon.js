import { pokemonRequest, genericPokemonAPIRequest } from "../api/pokemonRequest";

const SearchPokemon = async (searchValue, pokemon) => {
  const pokeState = {
    pokeImg: undefined,
    pokeName: undefined,
    pokeDescription: undefined,
  };
  const pokemonResult = await pokemonRequest(searchValue);
  const pokemonStatus = pokemonResult.status;

  const dupe = pokemon.find((poke) => poke.pokeName === pokemonResult.data.name);
  if (dupe || pokemonStatus === 404) {
    return { pokemonStatus };
  }

  if (pokemonResult.data.name && pokemonResult.data.sprites) {
    pokeState.pokeName = pokemonResult.data.name;
    pokeState.pokeImg = pokemonResult.data.sprites.other["official-artwork"].front_default;
  }
  if (pokemonResult.data.species) {
    const speciesResult = await genericPokemonAPIRequest(pokemonResult.data.species.url);
    let descriptions = speciesResult.data.flavor_text_entries;
    descriptions = descriptions.filter((description) => description.language.name === "en");
    descriptions = descriptions.slice(0, 5);
    descriptions = descriptions.map((description) => description.flavor_text);
    descriptions = descriptions.filter((description, index) => descriptions.indexOf(description) === index);
    pokeState.pokeDescription = descriptions.join("");
  }
  return { pokeState, pokemonStatus };
};

export default SearchPokemon;
