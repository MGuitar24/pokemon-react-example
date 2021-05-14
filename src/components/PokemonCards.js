import "./PokemonCards.css";
import PokeCard from "./PokeCard";

const PokemonCards = ({ pokemon, setPokemon }) => {
  const deletePoke = (pokeStateToRemove) => {
    pokemon.splice(pokeStateToRemove, 1);
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
            <PokeCard index={pokeindex} pokemon={pokemon} deletePokeCallback={deletePoke} />
          </div>
        );
      })}
    </div>
  );
};

export default PokemonCards;
