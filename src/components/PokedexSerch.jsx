import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from '@emotion/styled';
import { searchPokemon } from '../features/pokemonSerchSlice';

const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px;
`;

const SearchInput = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 300px;
`;

const PokedexSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
//   const dispatch = useDispatch();
//   const allPokemons = useSelector(state => state.pokemon.allPokemons); // 상태 경로 확인

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    // dispatch(searchPokemon(term)); // 업데이트된 액션 디스패치
  };

  return (
    <SearchContainer>
      <SearchInput
        type="text"
        placeholder="포켓몬 이름으로 검색하세요 (자음만으로 가능)"
        value={searchTerm}
        onChange={handleSearchChange}
      />
    </SearchContainer>
  );
};

export default PokedexSearch;