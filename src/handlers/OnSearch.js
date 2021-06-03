import { searchPokemon } from "../controllers/SearchPokemon";

const OnSearch = async (searchValue, setSearchValue, pokemon, setPokemon, setNoResultSearchValue, setSnackBarOpen) => {
  if (!searchValue) {
    return;
  }

  const pokemonResult = await searchPokemon(searchValue.toLowerCase(), pokemon);

  const { pokemonStatus, pokeState } = pokemonResult;

  if (pokemonStatus !== 200) {
    setNoResultSearchValue(searchValue);
    setSnackBarOpen(true);
  }

  if (pokeState) {
    setPokemon([...pokemon, pokeState]);
  }

  setSearchValue("");
};

export default OnSearch;
