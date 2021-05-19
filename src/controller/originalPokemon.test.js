import axios from "axios";
import originalPokemon from "./originalPokemon";

test("static pokemon list contains valid results", async () => {
  for (const pokemon in originalPokemon) {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}`, { timeout: 3000 });
    expect(response.status).toEqual(200);
  }
});
