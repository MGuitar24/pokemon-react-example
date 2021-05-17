import "./App.css";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useState, useEffect } from "react";
import SearchPokemon from "./controller/SearchPokemon";
import PokemonCards from "./components/PokemonCards";
import originalPokemon from "./controller/originalPokemon";

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const App = () => {
  const [pokemon, setPokemon] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [noResultSearchValue, setNoResultSearchValue] = useState("");

  const enterPressed = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      onSearch(searchValue);
    }
  };

  const handleCloseSnackBar = () => {
    setSnackBarOpen(false);
    setNoResultSearchValue("");
  };

  useEffect(() => {
    window.addEventListener("keydown", enterPressed);
    return () => {
      window.removeEventListener("keydown", enterPressed);
    };
  });

  const updateValue = (event, value, reason) => {
    setSearchValue(value.toLowerCase());
  };

  const onSearch = async () => {
    if (!searchValue) {
      return;
    }
    const pokemonResult = await SearchPokemon(searchValue, pokemon);
    if (pokemonResult.pokemonStatus === 404) {
      if (snackBarOpen) {
        setSnackBarOpen(false);
      }
      setNoResultSearchValue(searchValue);
      setSnackBarOpen(true);
      setSearchValue("");
      return;
    }

    if (pokemonResult.pokeState) {
      setPokemon([...pokemon, pokemonResult.pokeState]);
    }

    setSearchValue("");
  };

  return (
    <>
      <div className="App">
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={snackBarOpen}
          autoHideDuration={2000}
          onClose={handleCloseSnackBar}
        >
          <Alert onClose={handleCloseSnackBar} severity="error">
            No result found for search {noResultSearchValue}.
          </Alert>
        </Snackbar>
        <Autocomplete
          style={{ width: 300, display: "inline-block", verticalAlign: "top" }}
          freeSolo
          id="free-solo"
          inputValue={searchValue}
          onInputChange={updateValue}
          disableClearable
          options={originalPokemon}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search pokemon"
              variant="outlined"
              margin="normal"
              InputProps={{ ...params.InputProps, type: "search" }}
            />
          )}
        />
        <Button
          style={{ height: 56, marginTop: 15, marginLeft: 15 }}
          onClick={onSearch}
          variant="contained"
          color="primary"
        >
          Search
        </Button>
      </div>
      <PokemonCards pokemon={pokemon} setPokemon={setPokemon} />
    </>
  );
};

export default App;
