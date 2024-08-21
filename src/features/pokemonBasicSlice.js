import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// 비동기 API 요청을 위해 createAsyncThunk 사용
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
                  number: `00${id}`.slice(-3), // 포켓몬 번호 형식
                  name: koreanName, // 한국어 이름
                  image: spriteData.sprites.front_default, // 스프라이트 이미지
                }));
            });
        }
      );

      // 모든 포켓몬 데이터를 가져옴
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
    data: [], // 포켓몬 기본 정보 데이터
    isLoading: false, // 로딩 상태
    error: null // 오류 상태
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
        state.data = action.payload; // 불러온 포켓몬 데이터를 저장
      })
      .addCase(fetchPokemonBasicData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload; // 오류 메시지 저장
      });
  }
});

export default pokemonBasicSlice.reducer;