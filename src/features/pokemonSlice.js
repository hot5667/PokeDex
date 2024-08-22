import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchPokemonDetails = createAsyncThunk(
  'pokemon/fetchPokemonDetails',
  async (id, thunkAPI) => {
    return { id };
  }
);

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState: {
    data: null, 
    isLoading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPokemonDetails.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPokemonDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload; 
      })
      .addCase(fetchPokemonDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || '알 수 없는 오류가 발생했습니다.';
      });
  }
});

export default pokemonSlice.reducer;