import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from '@emotion/styled';
// import LoadingPage from '../pages/LoadingPage';  
// import ErrorPage from '../pages/ErrorPage';
import { 
  selectPokemonDetails, 
  selectPokemonDetailsLoading, 
  selectPokemonDetailsError 
} from '../features/pokemonDetailsSlice';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f8f9fa;
  padding: 20px;
`;

const PokemonDetailsCard = styled.div`
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 24px;
  max-width: 600px;
  text-align: center;
`;

const PokemonImage = styled.img`
  width: 150px;
  height: 150px;
`;

const PokemonName = styled.h1`
  font-size: 24px;
  font-weight: bold;
`;

const PokemonTypes = styled.div`
  margin-top: 16px;
  display: flex;
  justify-content: center;
  gap: 8px;
`;

const PokemonType = styled.div`
  background-color: ${props => props.color || '#ccc'};
  color: white;
  padding: 8px;
  border-radius: 8px;
  font-weight: bold;
`;

const PokemonDescription = styled.p`
  margin-top: 16px;
  font-size: 16px;
`;

const PokedexDetailsPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const pokemonDetails = useSelector(selectPokemonDetails);
  const isLoading = useSelector(selectPokemonDetailsLoading);
  const error = useSelector(selectPokemonDetailsError);

  useEffect(() => {
    if (id) {
      dispatch({ type: 'pokemon/fetchPokemonDetails', payload: { id } });
    }
  }, [dispatch, id]);

  // if (isLoading) {
  //   return (
  //     <Container>
  //       <LoadingPage />
  //     </Container>
  //   );
  // }

  // ErrorPage를 숨기고, 에러 발생 시 빈 화면을 렌더링
  if (error) {
    console.error(`Error: ${error}`); // 콘솔에 에러 메시지 출력
    return null; // 빈 화면을 반환
  }

  if (!pokemonDetails) {
    return null; // 데이터가 없을 때도 빈 화면을 반환
  }

  return (
    <Container>
      <PokemonDetailsCard>
        <PokemonImage src={pokemonDetails.sprites?.front_default} alt={pokemonDetails.name} />
        <PokemonName>{pokemonDetails.name}</PokemonName>
        <PokemonTypes>
          {pokemonDetails.types?.map((type, index) => (
            <PokemonType key={index} color={type.color || '#ccc'}>
              {type.name}
            </PokemonType>
          ))}
        </PokemonTypes>
        <PokemonDescription>{pokemonDetails.description}</PokemonDescription>
      </PokemonDetailsCard>
    </Container>
  );
};

export default PokedexDetailsPage;