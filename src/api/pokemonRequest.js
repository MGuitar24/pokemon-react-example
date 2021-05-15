import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://pokeapi.co/api/v2",
  timeout: 3000,
  validateStatus: false,
});

export const pokemonRequest = async (name) => {
  const promise = axiosInstance.get(`/pokemon/${name}`, {});
  const { status, data } = await promise;
  return { status, data };
};

export const genericPokemonAPIRequest = async (url) => {
  const promise = axiosInstance.get(url, {});
  const { status, data } = await promise;
  return { status, data };
};
