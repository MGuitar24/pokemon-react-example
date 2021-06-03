import { useQuery } from "react-query";
import { pokemonRequest, genericPokemonAPIRequest } from "../api/pokemonRequest";

const searchPokemon = async (searchValue) => {
  const { status, data } = await pokemonRequest(searchValue);

  try {
    return {
      pokemonStatus: status,
      pokeState: {
        pokeImg: data.sprites.other["official-artwork"].front_default,
        pokeName: data.name,
        pokeDescriptionURL: data.species.url,
      },
    };
  } catch (e) {
    return { pokemonStatus: status };
  }
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
