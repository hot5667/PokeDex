import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { typeColors, koTypeNames } from '../constants/typeName';

export const fetchPokemonDetails = createAsyncThunk(
  'pokemon/fetchPokemonDetails',
  async (id, thunkAPI) => {
    try {
      const numericId = id.replace(/^0+/, '');
      const pokemonResponse = await fetch(`${import.meta.env.VITE_REACT_APP_POKEMON_API}/pokemon/${numericId}`);
      if (!pokemonResponse.ok) throw new Error('포켓몬 상세 데이터를 불러오는 데 실패했습니다.');

      const pokemonData = await pokemonResponse.json();
      const speciesResponse = await fetch(`${import.meta.env.VITE_REACT_APP_POKEMON_API}/pokemon-species/${numericId}`);
      if (!speciesResponse.ok) throw new Error('포켓몬 설명 데이터를 불러오는 데 실패했습니다.');
      const speciesData = await speciesResponse.json();

      const koreanName = speciesData.names.find(name => name.language.name === 'ko')?.name || pokemonData.name;
      const types = pokemonData.types.map(typeInfo => ({
        name: koTypeNames[typeInfo.type.name] || typeInfo.type.name,
        color: typeColors[typeInfo.type.name] || '#ccc' 
      }));
      const flavorTextEntry = speciesData.flavor_text_entries.find(entry => entry.language.name === 'ko');
      const flavorText = flavorTextEntry ? flavorTextEntry.flavor_text : '설명 없음';

      return {
        name: koreanName,
        types: types,
        description: flavorText,
        sprites: pokemonData.sprites,
        number: numericId 
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
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
        state.error = action.payload;
      });
  }
});

export default pokemonSlice.reducer;
