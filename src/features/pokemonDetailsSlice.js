import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

const initialState = {
  data: null,
  isLoading: false,
  error: null,
};

const pokemonDetailsSlice = createSlice({
  name: 'pokemonDetails',
  initialState,
  reducers: {
    fetchPokemonDetails: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchPokemonDetailsFulfilled: (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    },
    fetchPokemonDetailsRejected: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchPokemonDetails, fetchPokemonDetailsFulfilled, fetchPokemonDetailsRejected } = pokemonDetailsSlice.actions;

export default pokemonDetailsSlice.reducer;

// 셀렉터 정의
const selectPokemonDetailsState = (state) => state.pokemonDetails || {};

export const selectPokemonDetails = createSelector(
  [selectPokemonDetailsState],
  (pokemonDetailsState) => pokemonDetailsState?.data
);

export const selectPokemonDetailsLoading = createSelector(
  [selectPokemonDetailsState],
  (pokemonDetailsState) => pokemonDetailsState?.isLoading
);

export const selectPokemonDetailsError = createSelector(
  [selectPokemonDetailsState],
  (pokemonDetailsState) => pokemonDetailsState?.error
);