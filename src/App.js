import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { useState } from "react";
import PokemonCards from "./components/PokemonCards";
import { QueryClient, QueryClientProvider } from "react-query";
import Search from "./components/Search";

const queryClient = new QueryClient();

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const App = () => {
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [noResultSearchValue, setNoResultSearchValue] = useState("");
  const [pokemon, setPokemon] = useState([]);

  const handleCloseSnackBar = () => {
    setSnackBarOpen(false);
    setNoResultSearchValue("");
  };

  return (
    <>
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
      <QueryClientProvider client={queryClient}>
        <Search
          pokemon={pokemon}
          setPokemon={setPokemon}
          setNoResultSearchValue={setNoResultSearchValue}
          setSnackBarOpen={setSnackBarOpen}
        />
        <PokemonCards pokemon={pokemon} setPokemon={setPokemon} />
      </QueryClientProvider>
    </>
  );
};

export default App;
