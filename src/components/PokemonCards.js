import "./PokemonCards.css";
import PokeCard from "./PokeCard";
import { ErrorBoundary } from "react-error-boundary";

const ErrorCard = ({ error, resetErrorBoundary }) => {
  return <p>Error loading pokemon card.</p>;
};

const PokemonCards = ({ pokemon, setPokemon }) => {
  const deletePokecb = (pokeIndexToRemove) => {
    pokemon.splice(pokeIndexToRemove, 1);
    setPokemon([...pokemon]);
  };

  const shiftPokemonLeftcb = (pokeIndexToMove) => {
    const pokemonToMove = pokemon[pokeIndexToMove];
    const pokemonMovedTo = pokemon[pokeIndexToMove - 1];
    if (pokemonMovedTo) {
      pokemon[pokeIndexToMove - 1] = pokemonToMove;
      pokemon[pokeIndexToMove] = pokemonMovedTo;
    }
    setPokemon([...pokemon]);
  };

  const shiftPokemonRightcb = (pokeIndexToMove) => {
    const pokemonToMove = pokemon[pokeIndexToMove];
    const pokemonMovedTo = pokemon[pokeIndexToMove + 1];
    if (pokemonMovedTo) {
      pokemon[pokeIndexToMove + 1] = pokemonToMove;
      pokemon[pokeIndexToMove] = pokemonMovedTo;
    }
    setPokemon([...pokemon]);
  };

  return (
    <div className="PokemonCards">
      {pokemon.map((pokemon, pokeindex) => {
        return (
          <div key={pokemon.pokeName} className="PokeCard">
            <ErrorBoundary FallbackComponent={ErrorCard}>
              <PokeCard
                index={pokeindex}
                pokemon={pokemon}
                deletePokecb={deletePokecb}
                shiftPokemonLeftcb={shiftPokemonLeftcb}
                shiftPokemonRightcb={shiftPokemonRightcb}
              />
            </ErrorBoundary>
          </div>
        );
      })}
    </div>
  );
};

export default PokemonCards;
