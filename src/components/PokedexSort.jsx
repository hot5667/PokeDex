import React, { useState } from 'react';

const PokedexSort = ({ pokemonList, setPokemonList }) => {
  const [sortOption, setSortOption] = useState('');

  const handleSortChange = (e) => {
    const option = e.target.value;
    setSortOption(option);

    let sortedList = [...pokemonList];

    switch (option) {
      case 'name-asc':
        sortedList.sort((a, b) => a.name.localeCompare(b.name, 'ko'));
        break;
      case 'name-desc':
        sortedList.sort((a, b) => b.name.localeCompare(a.name, 'ko'));
        break;
      case 'number-asc':
        sortedList.sort((a, b) => a.number - b.number);
        break;
      case 'number-desc':
        sortedList.sort((a, b) => b.number - a.number);
        break;
      default:
        break;
    }

    setPokemonList(sortedList);
  };

  return (
    <div>
      <label htmlFor="sort">정렬 방식: </label>
      <select id="sort" value={sortOption} onChange={handleSortChange}>
        <option value="">선택하세요</option>
        <option value="name-asc">이름 오름차순</option>
        <option value="name-desc">이름 내림차순</option>
        <option value="number-asc">번호 오름차순</option>
        <option value="number-desc">번호 내림차순</option>
      </select>
    </div>
  );
};

export default PokedexSort;