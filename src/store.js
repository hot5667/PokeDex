import { configureStore } from '@reduxjs/toolkit';
import pokemonReducer from './features/pokemonSlice';
import pokemonBasicReducer from './features/pokemonBasicSlice';
import { pokemonDetailsMiddleware } from './middleware/pokemonDetailsMiddleware';
import { pokemonBasicMiddleware } from './middleware/pokemonBasicMiddleware';

const store = configureStore({
  reducer: {
    pokemon: pokemonReducer,
    pokemonBasic: pokemonBasicReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonBasicMiddleware, pokemonDetailsMiddleware),
});

export default store;
