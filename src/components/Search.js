import "./Search.css";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useState, useEffect } from "react";
import originalPokemon from "../controllers/originalPokemon";
import OnSearch from "../handlers/OnSearch";

const Search = ({ pokemon, setPokemon, setNoResultSearchValue, setSnackBarOpen }) => {
  const [searchValue, setSearchValue] = useState("");

  const updateValue = (event, value) => {
    setSearchValue(value);
  };

  const enterPressed = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      OnSearch(searchValue, setSearchValue, pokemon, setPokemon, setNoResultSearchValue, setSnackBarOpen);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", enterPressed);
    return () => {
      window.removeEventListener("keydown", enterPressed);
    };
  });

  return (
    <div className="Search">
      <Autocomplete
        title="searchAutoComplete"
        style={{ width: 300, display: "inline-block", verticalAlign: "top" }}
        freeSolo
        id="free-solo"
        inputValue={searchValue}
        onInputChange={updateValue}
        disableClearable
        openOnFocus
        options={originalPokemon.sort()}
        renderInput={(params) => (
          <TextField
            {...params}
            title="searchTextField"
            label="Search pokemon"
            variant="outlined"
            margin="normal"
            InputProps={{ ...params.InputProps, type: "search" }}
          />
        )}
      />
      <Button
        title="searchButton"
        style={{ height: 56, marginTop: 15, marginLeft: 15 }}
        onClick={() => {
          OnSearch(searchValue, setSearchValue, pokemon, setPokemon, setNoResultSearchValue, setSnackBarOpen);
        }}
        variant="contained"
        color="primary"
      >
        Search
      </Button>
    </div>
  );
};

export default Search;
