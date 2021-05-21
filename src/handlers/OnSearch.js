import { searchPokemon } from "../controllers/SearchPokemon";

const OnSearch = async (searchValue, setSearchValue, pokemon, setPokemon, setNoResultSearchValue, setSnackBarOpen) => {
  if (!searchValue) {
    return;
  }

  const pokemonResult = await searchPokemon(searchValue.toLowerCase(), pokemon);

  if (pokemonResult.pokemonStatus !== 200) {
    setNoResultSearchValue(searchValue);
    setSnackBarOpen(true);
  }

  if (pokemonResult.pokeState) {
    setPokemon([...pokemon, pokemonResult.pokeState]);
  }

  setSearchValue("");
};

export default OnSearch;
