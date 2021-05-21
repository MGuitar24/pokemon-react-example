import axios from "axios";
import originalPokemon from "./originalPokemon";

jest.setTimeout(50000);

test("static pokemon list contains valid results", async () => {
  for (const pokemon of originalPokemon) {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`, { timeout: 3000 });
      expect(response.status).toEqual(200);
    } catch (error) {
      expect(error).toBeNull();
    }
  }
});
