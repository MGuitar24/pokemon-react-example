import "./PokemonCards.css";
import PokeCard from "./PokeCard";

const PokemonCards = ({ pokemon, setPokemon }) => {

  const deletePokecb = (pokeIndexToRemove) => {
    pokemon.splice(pokeIndexToRemove, 1);
    setPokemon([...pokemon]);
  };

  const shiftPokemonLeftcb = (pokeIndexToMove) => {
    const pokemonToMove = pokemon[pokeIndexToMove];
    const pokemonMovedTo = pokemon[pokeIndexToMove - 1];
    pokemon[pokeIndexToMove - 1] = pokemonToMove;
    pokemon[pokeIndexToMove] = pokemonMovedTo;
    setPokemon([...pokemon]);
  };

  const shiftPokemonRightcb = (pokeIndexToMove) => {
    const pokemonToMove = pokemon[pokeIndexToMove];
    const pokemonMovedTo = pokemon[pokeIndexToMove + 1];
    pokemon[pokeIndexToMove + 1] = pokemonToMove;
    pokemon[pokeIndexToMove] = pokemonMovedTo;
    setPokemon([...pokemon]);
  };

  return (
    <div className="PokemonCards">
      {pokemon.map((pokemon, pokeindex) => {
        if (!pokemon.pokeImg || !pokemon.pokeName) {
          return null;
        }
        return (
          <div key={pokemon.pokeName} className="PokeCard">
            <PokeCard
              index={pokeindex}
              pokemon={pokemon}
              deletePokecb={deletePokecb}
              shiftPokemonLeftcb={shiftPokemonLeftcb}
              shiftPokemonRightcb={shiftPokemonRightcb}
            />
          </div>
        );
      })}
    </div>
  );
};

export default PokemonCards;
