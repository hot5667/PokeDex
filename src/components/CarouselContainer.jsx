import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import 'nes.css/css/nes.min.css';
import '../css/fonts.css'; 

const CarouselWrapper = styled.div`
  flex: 1;
  overflow: hidden;
`;

const CarouselViewport = styled.div`
  height: 100%;
  overflow-y: auto;
`;

const CarouselContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const PokemonItem = styled.button`
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-bottom: 5px;
  padding: 0.5rem;
  font-family: 'Press Start 2P', 'Noto Sans KR', sans-serif; 
  font-size: 14px; 
  letter-spacing: 1px; 

  color: ${({ isActive }) => (isActive ? '#000' : '#333')}; 
  box-shadow: ${({ isActive }) => 
    isActive 
      ? 'inset 2px 2px 0 #000, inset -2px -2px 0 #000' 
      : '2px 2px 0 #000, -2px -2px 0 #000'};

  &.nes-btn {
    font-family: 'NeoDunggeunmoPro-Regular','Press Start 2P', cursive; 
    font-size: 14px; 
    letter-spacing: 1px; 
    background-image: linear-gradient(to bottom, #ffffff, #e0e0e0);
    border-radius: 3px; 
  }
`;

const CarouselComponent = ({ pokemonData, selectedIndex, onSelect, emblaRef }) => {

  useEffect(() => {
    const viewport = emblaRef.current;

    if (viewport) {
      const handleScroll = (event) => {
        const { scrollTop, scrollHeight, clientHeight } = event.target;
        if (scrollTop + clientHeight >= scrollHeight) {
          event.target.scrollTop = scrollHeight - clientHeight;
        }
      };

      viewport.addEventListener('scroll', handleScroll);

      return () => {
        viewport.removeEventListener('scroll', handleScroll);
      };
    }
  }, [emblaRef]);

  return (
    <CarouselWrapper>
      <CarouselViewport className="embla__viewport" ref={emblaRef}>
        <CarouselContainer className="embla__container">
          {pokemonData.map((pokemon, index) => (
            <PokemonItem
              key={pokemon.number}
              isActive={index === selectedIndex}
              onClick={() => onSelect(index)}
              className={`nes-btn `}
            >
              {pokemon.number} {pokemon.name}
            </PokemonItem>
          ))}
        </CarouselContainer>
      </CarouselViewport>
    </CarouselWrapper>
  );
};

export default CarouselComponent;