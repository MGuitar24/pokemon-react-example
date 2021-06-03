import { searchPokemon } from "../controllers/SearchPokemon";

const OnSearch = async (searchValue, setSearchValue, pokemon, setPokemon, setNoResultSearchValue, setSnackBarOpen) => {
  if (!searchValue) {
    return;
  }

  const pokemonResult = await searchPokemon(searchValue.toLowerCase());

  const { pokeState, pokemonStatus } = pokemonResult;

  const dupe = pokemon.find((poke) => poke.pokeName === pokeState.pokeName);

  if (pokemonStatus !== 200) {
    setNoResultSearchValue(searchValue);
    setSnackBarOpen(true);
  } else if (!dupe) {
    setPokemon([...pokemon, pokeState]);
  }

  setSearchValue("");
};

export default OnSearch;
