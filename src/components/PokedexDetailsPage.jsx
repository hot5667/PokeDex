import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styled from '@emotion/styled';
import { fetchPokemonStart, fetchPokemonSuccess, fetchPokemonFailure, setSelectedId } from '../features/pokemonSlice.js';
import ErrorPage from './ErrorPage';

const FullScreenContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #fff;
`;

const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 50%;
  padding: 20px;
  background-color: #fff;
  border-radius: 12px;
`;

const PokemonImage = styled.img`
  width: 480px;
  height: 480px;
  image-rendering: pixelated;
`;

const PokemonType = styled.div`
  font-size: 1.2rem;
  margin: 10px 0;
`;

const PokemonDescription = styled.p`
  font-size: 1rem;
  text-align: center;
  margin: 10px 0;
`;

const PokedexDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data, selectedId, isLoading, error } = useSelector(state => state.pokemon);
  const pokemon = data.find(p => p.id === parseInt(id, 10));

  useEffect(() => {
    dispatch(setSelectedId(id));
    const fetchPokemonDetails = async () => {
      dispatch(fetchPokemonStart());
      try {
        const numericId = id.replace(/^0+/, '');
        
        const pokemonResponse = await fetch(`${import.meta.env.VITE_REACT_APP_POKEMON_API}/pokemon/${numericId}`);
        if (!pokemonResponse.ok) throw new Error('포켓몬 상세 데이터를 불러오는 데 실패했습니다.');
        const pokemonData = await pokemonResponse.json();

        const speciesResponse = await fetch(`${import.meta.env.VITE_REACT_APP_POKEMON_API}/pokemon-species/${numericId}`);
        if (!speciesResponse.ok) throw new Error('포켓몬 설명 데이터를 불러오는 데 실패했습니다.');
        const speciesData = await speciesResponse.json();

        const koreanName = speciesData.names.find(name => name.language.name === 'ko')?.name || pokemonData.name;
        const types = pokemonData.types.map(typeInfo => typeInfo.type.name).join(', ');
        const flavorTextEntry = speciesData.flavor_text_entries.find(entry => entry.language.name === 'ko');
        const flavorText = flavorTextEntry ? flavorTextEntry.flavor_text : '설명 없음';

        dispatch(fetchPokemonSuccess({
          ...pokemonData,
          name: koreanName,
          types,
          description: flavorText,
        }));
      } catch (err) {
        dispatch(fetchPokemonFailure(err.message));
      }
    };

    fetchPokemonDetails();
  }, [id, dispatch]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <FullScreenContainer><ErrorPage errorCode={500} message={error} /></FullScreenContainer>;

  return (
    <DetailsContainer>
      <PokemonImage src={pokemon.sprites.front_default} alt={pokemon.name} />
      <h2>{pokemon.name}</h2>
      <div>타입: {pokemon.types}</div>
      <p>{pokemon.description}</p>
    </DetailsContainer>
  );
};

export default PokedexDetailsPage;