import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchPokemonBasicData = createAsyncThunk(
  'pokemonBasic/fetchPokemonBasicData',
  async (_, thunkAPI) => {
    try {
      const promises = Array.from(
        { length: `${import.meta.env.VITE_REACT_APP_POKEMON_COUNT}` }, 
        (_, i) => {
          const id = i + 1;
          return fetch(`${import.meta.env.VITE_REACT_APP_POKEMON_API}/pokemon-species/${id}`)
            .then(response => response.json())
            .then(data => {
              const koreanName = data.names.find(name => name.language.name === 'ko').name;
              return fetch(`${import.meta.env.VITE_REACT_APP_POKEMON_API}/pokemon/${id}`)
                .then(spriteResponse => spriteResponse.json())
                .then(spriteData => ({
                  number: `00${id}`.slice(-3), 
                  name: koreanName, 
                  image: spriteData.sprites.front_default, 
                }));
            });
        }
      );

      const fetchedData = await Promise.all(promises);
      return fetchedData;
    } catch (error) {
      return thunkAPI.rejectWithValue('포켓몬 데이터를 가져오는 데 실패했습니다.');
    }
  }
);

const pokemonBasicSlice = createSlice({
  name: 'pokemonBasic',
  initialState: {
    data: [], 
    isLoading: false, 
    error: null 
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPokemonBasicData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPokemonBasicData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload; 
      })
      .addCase(fetchPokemonBasicData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload; 
      });
  }
});

export default pokemonBasicSlice.reducer;