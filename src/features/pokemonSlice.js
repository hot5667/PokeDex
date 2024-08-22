import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { typeNamekr } from '../constants/typeName';

export const fetchPokemonDetails = createAsyncThunk(
  'pokemon/fetchPokemonDetails',
  async (id, thunkAPI) => {
    try {
      const numericId = id.replace(/^0+/, '');
      const pokemonResponse = await fetch(`${import.meta.env.VITE_REACT_APP_POKEMON_API}/pokemon/${numericId}`);
      if (!pokemonResponse.ok) throw new Error('포켓몬 상세 데이터를 가져오는 데 실패했습니다.');

      const pokemonData = await pokemonResponse.json();
      const speciesResponse = await fetch(`${import.meta.env.VITE_REACT_APP_POKEMON_API}/pokemon-species/${numericId}`);
      if (!speciesResponse.ok) throw new Error('포켓몬 종 데이터를 가져오는 데 실패했습니다.');
      const speciesData = await speciesResponse.json();

      // 한국어 이름 가져오기
      const koreanName = speciesData.names.find(name => name.language.name === 'ko')?.name || pokemonData.name;

      // 타입을 이름과 색상 정보로 매핑
      const types = pokemonData.types.map(typeInfo => {
        const type = typeInfo.type.name;
        return {
          name: typeNamekr[type]?.name || type,
          color: typeNamekr[type]?.color || '#ccc',
        };
      });

      // 한국어 설명 텍스트 가져오기
      const flavorTextEntry = speciesData.flavor_text_entries.find(entry => entry.language.name === 'ko');
      const flavorText = flavorTextEntry ? flavorTextEntry.flavor_text : '설명 없음';

      // 최종 데이터 구조 반환
      return {
        name: koreanName,
        types: types,
        description: flavorText,
        sprites: pokemonData.sprites,
        number: numericId 
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(`에러 발생: ${error.message}`);
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
        state.error = action.payload || '알 수 없는 오류가 발생했습니다.';
      });
  }
});

export default pokemonSlice.reducer;