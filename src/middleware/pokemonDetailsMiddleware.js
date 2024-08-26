import { typeNamekr } from '../constants/typeName';
import { fetchPokemonDetailsFulfilled, fetchPokemonDetailsRejected } from '../features/pokemonDetailsSlice';

export const pokemonDetailsMiddleware = (store) => (next) => async (action) => {
  if (action.type === 'pokemon/fetchPokemonDetails') {
    try {
      const { id } = action.payload;
      const numericId = id.replace(/^0+/, '');
      console.log(`포켓몬 상세 정보 가져오는 중: ID = ${numericId}`);

      // 포켓몬 데이터 요청
      const pokemonResponse = await fetch(`${import.meta.env.VITE_REACT_APP_POKEMON_API}/pokemon/${numericId}`);
      if (!pokemonResponse.ok) {
        const errorText = await pokemonResponse.text();
        console.error(`포켓몬 데이터 가져오기 실패: ${pokemonResponse.status} - ${pokemonResponse.statusText}`);
        throw new Error(`포켓몬 데이터 가져오기 실패: ${errorText}`);
      }
      const pokemonData = await pokemonResponse.json();
      console.log('포켓몬 데이터:', pokemonData);

      // 포켓몬 종 데이터 요청
      const speciesResponse = await fetch(`${import.meta.env.VITE_REACT_APP_POKEMON_API}/pokemon-species/${numericId}`);
      if (!speciesResponse.ok) {
        const errorText = await speciesResponse.text();
        console.error(`포켓몬 종 데이터 가져오기 실패: ${speciesResponse.status} - ${speciesResponse.statusText}`);
        throw new Error(`포켓몬 종 데이터 가져오기 실패: ${errorText}`);
      }
      const speciesData = await speciesResponse.json();
      console.log('포켓몬 종 데이터:', speciesData);

      // 한국어 이름 및 타입 변환
      const koreanName = speciesData.names.find(name => name.language.name === 'ko')?.name || pokemonData.name;
      const types = pokemonData.types.map(typeInfo => {
        const type = typeInfo.type.name;
        return {
          name: typeNamekr[type]?.name || type,
          color: typeNamekr[type]?.color || '#ccc',
        };
      });
      console.log('한국어 이름:', koreanName);
      console.log('타입:', types);

      // 플레이버 텍스트
      const flavorTextEntry = speciesData.flavor_text_entries.find(entry => entry.language.name === 'ko');
      const flavorText = flavorTextEntry ? flavorTextEntry.flavor_text : '설명 없음';
      console.log('플레이버 텍스트:', flavorText);

      // 데이터 스토어에 디스패치
      store.dispatch(fetchPokemonDetailsFulfilled({
        name: koreanName,
        types: types,
        description: flavorText,
        sprites: pokemonData.sprites,
        number: numericId,
      }));

    } catch (error) {
      console.error('에러 발생:', error.message);
      store.dispatch(fetchPokemonDetailsRejected(`에러 발생: ${error.message}`));
    }
  }

  return next(action);
};