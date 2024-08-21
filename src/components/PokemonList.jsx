import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPokemonStart, fetchPokemonSuccess, fetchPokemonFailure } from '../features/pokemonSlice';

const PokemonList = () => {
  const dispatch = useDispatch();
  const { data, isLoading, error } = useSelector(state => state.pokemon);

  useEffect(() => {
    const fetchPokemonData = async () => {
      dispatch(fetchPokemonStart());
      try {
        const response = await fetch(`${import.meta.env.VITE_REACT_APP_POKEMON_API}/pokemon?limit=151`);
        if (!response.ok) throw new Error('포켓몬 데이터를 불러오는 데 실패했습니다.');
        const result = await response.json();
        dispatch(fetchPokemonSuccess(result.results));
      } catch (err) {
        dispatch(fetchPokemonFailure(err.message));
      }
    };

    fetchPokemonData();
  }, [dispatch]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Pokemon List</h2>
      <ul>
        {data.map(pokemon => (
          <li key={pokemon.name}>{pokemon.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default PokemonList;
