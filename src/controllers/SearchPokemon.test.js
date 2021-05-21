import { searchPokemon } from "./SearchPokemon";

test("search pokemon api call - expect state values", () => {
  const expectedPokemonImage =
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png";
  const expectedPokemonDescriptionURL = "https://pokeapi.co/api/v2/pokemon-species/25/";

  const existingPokemon = [];
  const pokemonName = "pikachu";
  return searchPokemon(pokemonName, existingPokemon)
    .then((pokemonResult) => {
      expect(pokemonResult).toBeDefined();
      expect(pokemonResult.pokeState).toBeDefined();
      expect(pokemonResult.pokemonStatus).toBeDefined();
      expect(pokemonResult.pokeState.pokeImg).toBe(expectedPokemonImage);
      expect(pokemonResult.pokeState.pokeDescriptionURL).toBe(expectedPokemonDescriptionURL);
      expect(pokemonResult.pokeState.pokeName).toBe(pokemonName);
    })
    .catch((e) => expect(e).not.toBeTruthy());
});
