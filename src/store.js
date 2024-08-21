import { configureStore } from '@reduxjs/toolkit';
import pokemonReducer from './features/pokemonSlice';
import pokemonBasicReducer from './features/pokemonBasicSlice';

const store = configureStore({
  reducer: {
    pokemon: pokemonReducer,
    pokemonBasic: pokemonBasicReducer,
  },
});

export default store;
