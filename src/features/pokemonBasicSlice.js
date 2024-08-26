// features/pokemonBasicSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchPokemonBasicData = createAsyncThunk(
  'pokemonBasic/fetchPokemonBasicData',
  async (_, thunkAPI) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_POKEMON_API}/pokemon?limit=151`);
      if (!response.ok) {
        throw new Error('네트워크 오류');
      }
      const data = await response.json();
      return data.results.map(pokemon => ({
        number: pokemon.url.split('/').slice(-2, -1)[0], // URL에서 포켓몬 번호 추출
        name: pokemon.name,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split('/').slice(-2, -1)[0]}.png`
      }));
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const pokemonBasicSlice = createSlice({
  name: 'pokemonBasic',
  initialState: {
    data: [],         
    isLoading: false, 
    error: null,      
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPokemonBasicData.pending, (state) => {
        state.isLoading = true;
        state.error = null; // 에러 초기화
      })
      .addCase(fetchPokemonBasicData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.map(pokemon => ({
          number: pokemon.number, 
          name: pokemon.name,      
          image: pokemon.image     
        })); 
      })
      .addCase(fetchPokemonBasicData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload; 
      });
  },
});

export default pokemonBasicSlice.reducer;

