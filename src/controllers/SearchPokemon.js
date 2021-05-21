import { useQuery } from "react-query";
import { pokemonRequest, genericPokemonAPIRequest } from "../api/pokemonRequest";

const searchPokemon = async (searchValue, pokemon) => {
  const pokeState = {
    pokeImg: undefined,
    pokeName: undefined,
    pokeDescription: undefined,
    pokeDescriptionURL: undefined,
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
    pokeState.pokeDescriptionURL = pokemonResult.data.species.url;
  }
  return { pokeState, pokemonStatus };
};

const loadDescription = async (url) => {
  const speciesResult = await genericPokemonAPIRequest(url);
  let descriptions = speciesResult.data.flavor_text_entries;
  descriptions = descriptions.filter((description) => description.language.name === "en");
  descriptions = descriptions.slice(0, 5);
  descriptions = descriptions.map((description) => description.flavor_text);
  descriptions = descriptions.filter((description, index) => descriptions.indexOf(description) === index);
  descriptions = descriptions.map((description) => description.replace(/[^a-z0-9]/gim, " ").trim());
  const description = descriptions.join(". ").concat(".");
  return description;
};

const useDescription = (descriptionURL) => {
  return useQuery(["descriptionURL", descriptionURL], () => loadDescription(descriptionURL));
};

export { useDescription, searchPokemon };
