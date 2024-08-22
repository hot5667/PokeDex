import { typeNamekr } from '../constants/typeName';

export const pokemonDetailsMiddleware = store => next => async action => {
    if (action.type === 'pokemon/fetchPokemonDetails') {
      try {
        const { id } = action.payload;
        const numericId = id.replace(/^0+/, '');
        
        const pokemonResponse = await fetch(`${import.meta.env.VITE_REACT_APP_POKEMON_API}/pokemon/${numericId}`);
        if (!pokemonResponse.ok) throw new Error('포켓몬 상세 데이터를 가져오는 데 실패했습니다.');
  
        const pokemonData = await pokemonResponse.json();
        const speciesResponse = await fetch(`${import.meta.env.VITE_REACT_APP_POKEMON_API}/pokemon-species/${numericId}`);
        if (!speciesResponse.ok) throw new Error('포켓몬 종 데이터를 가져오는 데 실패했습니다.');
        const speciesData = await speciesResponse.json();
  
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
  
        store.dispatch({
          type: 'pokemon/fetchPokemonDetails/fulfilled',
          payload: {
            name: koreanName,
            types: types,
            description: flavorText,
            sprites: pokemonData.sprites,
            number: numericId 
          }
        });
      } catch (error) {
        store.dispatch({
          type: 'pokemon/fetchPokemonDetails/rejected',
          payload: `에러 발생: ${error.message}`
        });
      }
    }
  
    return next(action);
  };