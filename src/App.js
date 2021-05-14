import "./App.css";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useState, useEffect } from "react";
import { pokemonRequest, genericPokemonAPIRequest } from "./api/pokemonRequest";
import PokemonCards from "./components/PokemonCards";

const App = () => {
  const enterPressed = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      onSearch(searchValue);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", enterPressed);
    return () => {
      window.removeEventListener("keydown", enterPressed);
    };
  });

  const pokeState = {
    pokeImg: undefined,
    pokeName: undefined,
    pokeDescription: undefined,
  };

  const [pokemon, setPokemon] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const updateValue = (e) => {
    setSearchValue(e.target.value);
  };

  const onSearch = async () => {
    if (!searchValue) {
      return;
    }
    const pokemonResult = await pokemonRequest(searchValue);
    if (pokemonResult.data.name && pokemonResult.data.sprites) {
      pokeState.pokeImg = pokemonResult.data.sprites.other["official-artwork"].front_default;
      pokeState.pokeName = pokemonResult.data.name;
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
    setPokemon([...pokemon, pokeState]);
    setSearchValue("");
  };

  return (
    <>
      <div className="App">
        <TextField
          style={{ margin: 0, paddingRight: 10, width: 300 }}
          id="outlined-search"
          value={searchValue}
          onChange={updateValue}
          label="Search pokemon"
          type="search"
          variant="outlined"
        />
        <Button style={{ height: 56 }} onClick={onSearch} variant="contained" color="primary">
          Search
        </Button>
      </div>
      <PokemonCards pokemon={pokemon} setPokemon={setPokemon} />
    </>
  );
};

export default App;
