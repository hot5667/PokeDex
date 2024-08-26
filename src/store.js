import { configureStore } from '@reduxjs/toolkit';
import pokemonBasicReducer from './features/pokemonBasicSlice';
import pokemonDetailsReducer from './features/pokemonDetailsSlice'; 
import pokemonSerchReducer from './features/pokemonSerchSlice';
import { pokemonDetailsMiddleware } from './middleware/pokemonDetailsMiddleware';
import { pokemonBasicMiddleware } from './middleware/pokemonBasicMiddleware';

const store = configureStore({
  reducer: {
    pokemonBasic: pokemonBasicReducer,
    pokemonDetails: pokemonDetailsReducer, 
    pokemonSerch : pokemonSerchReducer, 
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonBasicMiddleware, pokemonDetailsMiddleware),
});

export default store;
