import React from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import TypeBadge from './TypeBadge';
import PokedexButton from './PokedexButton';
import 'nes.css/css/nes.min.css';

// 스타일 컴포넌트 정의
const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 50%;
  padding: 20px;
  background-color: #fff;
  border-radius: 12px;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: box-shadow 0.3s ease;
  
  &:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  }
`;

const PokemonImage = styled.img`
  width: 320px; 
  height: 320px; 
  object-fit: cover;
  image-rendering: pixelated;
  border-radius: 8px;
`;

const TypesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 16px;
`;

const ButtonContainer = styled.div`
  margin-top: 20px;
`;

const PokedexDetails = ({ number, name, image, types = [] }) => {
  const navigate = useNavigate();

  // 포켓몬 타입 배지 표시
  const typeNames = Array.isArray(types) && types.every(type => typeof type === 'string')
    ? types.map((type, index) => (
      <TypeBadge key={type} type={type} />
    ))
    : ' ';

  // 이미지 클릭 시 포켓몬 상세 페이지로 이동
  const handleImageClick = () => {
    navigate(`/pokemon/${number}`);
  };

  // 버튼 클릭 시 로컬스토리지에 포켓몬 정보 저장
  const handleButtonClick = (event) => {
    event.stopPropagation(); // 상위 이벤트 버블링 방지

    // 포켓몬에 대한 고유 ID 생성 (현재 포켓몬 번호를 고유 ID로 사용)
    const pokemonId = `pokemon-${number}`;

    // 로컬 스토리지에 저장할 데이터 형식
    const pokemonData = {
      id: pokemonId,
      number,
      name,
      image
    };

    let storedPokemons = JSON.parse(localStorage.getItem('savedPokemons')) || [];
    const isPokemonAlreadySaved = storedPokemons.some(pokemon => pokemon.id === pokemonId);

    if (storedPokemons.length >= 6) {
      alert('최대 6개의 포켓몬만 추가할 수 있습니다.');
      return;
    }

    if (!isPokemonAlreadySaved) {
      storedPokemons.push(pokemonData);
      localStorage.setItem('savedPokemons', JSON.stringify(storedPokemons));
      alert(`${name}이(가) 추가되었습니다!`);
    } else {
      alert(`${name}은(는) 이미 추가되었습니다.`);
    }
  };

  return (
    <DetailsContainer onClick={handleImageClick}>
      <PokemonImage className='nes-container is-rounded' src={image} alt={name} />
      <TypesContainer>
        {typeNames}
      </TypesContainer>
      <ButtonContainer >
        <PokedexButton onClick={handleButtonClick}>
          {`${name} 추가`}
        </PokedexButton>
      </ButtonContainer>
    </DetailsContainer>
  );
};

export default PokedexDetails;
