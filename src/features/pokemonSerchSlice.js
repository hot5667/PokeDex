import { createSlice } from '@reduxjs/toolkit';

// 자음 및 모음 추출 함수
const extractConsonantsAndVowels = (str) => {
  const vowels = /[aeiouAEIOU]/g;
  const consonants = /[^aeiouAEIOU]/g;
  return {
    vowels: str.match(vowels)?.join('') || '',
    consonants: str.match(consonants)?.join('') || ''
  };
};

// 포켓몬 필터링 함수
const filterPokemonsByConsonantAndVowel = (pokemons, searchTerm) => {
  const { consonants: searchConsonants, vowels: searchVowels } = extractConsonantsAndVowels(searchTerm.toLowerCase());
  
  return pokemons.filter(pokemon => {
    const { consonants: pokemonConsonants, vowels: pokemonVowels } = extractConsonantsAndVowels(pokemon.name.toLowerCase());
    
    return (
      pokemonConsonants.includes(searchConsonants) &&
      pokemonVowels.includes(searchVowels)
    );
  });
};

const initialState = {
  allPokemons: [],  
  filteredPokemons: [], 
};

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    setPokemons: (state, action) => {
      state.allPokemons = action.payload;
      state.filteredPokemons = action.payload; // 처음에는 모든 포켓몬을 표시
    },
    searchPokemon: (state, action) => {
      const searchTerm = action.payload;
      state.filteredPokemons = filterPokemonsByConsonantAndVowel(state.allPokemons, searchTerm);
    },
  },
});

export const { setPokemons, searchPokemon } = pokemonSlice.actions;

export default pokemonSlice.reducer;