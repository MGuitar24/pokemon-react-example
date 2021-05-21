import { render, fireEvent, act } from "@testing-library/react";

import Search from "./Search";
import originalPokemon from "../controllers/originalPokemon";
import OnSearch from "../handlers/OnSearch";

jest.mock("../handlers/OnSearch", () => ({
  __esModule: true,
  default: jest.fn(),
}));

beforeEach(() => {
  jest.clearAllMocks();
});

describe("search elements rendered", () => {
  it("searchTextField did render", () => {
    const { queryByTitle } = render(<Search />);
    const searchTextField = queryByTitle("searchTextField");
    expect(searchTextField).toBeTruthy();
  });

  it("searchAutoComplete did render", () => {
    const { queryByTitle } = render(<Search />);
    const searchAutoComplete = queryByTitle("searchAutoComplete");
    expect(searchAutoComplete).toBeTruthy();
  });

  it("searchButton did render", () => {
    const { queryByTitle } = render(<Search />);
    const searchButton = queryByTitle("searchButton");
    expect(searchButton).toBeTruthy();
  });
});

describe("searchAutoComplete", () => {
  it("updates on change", () => {
    const { queryByTitle } = render(<Search />);
    const searchAutoCompleteInput = queryByTitle("searchAutoComplete").querySelector("input");

    fireEvent.change(searchAutoCompleteInput, { target: { value: "pikachu" } });

    expect(searchAutoCompleteInput.value).toBe("pikachu");
  });

  it("has originalPokemon values as options", () => {
    const { queryByTitle } = render(<Search />);
    const searchAutoComplete = queryByTitle("searchAutoComplete");
    const searchAutoCompleteInput = queryByTitle("searchAutoComplete").querySelector("input");

    for (const pokemon of originalPokemon) {
      searchAutoCompleteInput.focus();
      fireEvent.change(searchAutoCompleteInput, { target: { value: pokemon } });
      fireEvent.keyDown(searchAutoComplete, { key: "ArrowDown" });
      fireEvent.keyDown(searchAutoComplete, { key: "Enter" });

      expect(searchAutoCompleteInput.value).toBe(pokemon);
    }

    expect(OnSearch.mock.calls.length).toBe(originalPokemon.length);
  });
});

describe("searchButton", () => {
  it("OnSearch handler is called when button is clicked", () => {
    const { queryByTitle } = render(<Search />);
    const searchButton = queryByTitle("searchButton");

    fireEvent.click(searchButton);

    expect(OnSearch.mock.calls.length).toBe(1);
  });
});
