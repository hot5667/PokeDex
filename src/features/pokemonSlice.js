import { createSlice } from '@reduxjs/toolkit';

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState: {
    data: [],
    selectedId: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    fetchPokemonStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchPokemonSuccess: (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
    },
    fetchPokemonFailure: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    setSelectedId: (state, action) => {
      state.selectedId = action.payload;
    },
  },
});

export const {
  fetchPokemonStart,
  fetchPokemonSuccess,
  fetchPokemonFailure,
  setSelectedId,
} = pokemonSlice.actions;

export default pokemonSlice.reducer;
