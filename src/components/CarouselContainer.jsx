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

  ::-webkit-scrollbar {
    width: 16px;
    background-color: #c0c0c0; 
  }

  ::-webkit-scrollbar-track {
    background-color: #c0c0c0; 
  }

  ::-webkit-scrollbar-thumb {
    background-color: #808080; 
    border: 2px solid #c0c0c0; 
    border-radius: 4px; /* 테두리의 둥글기 */
    box-shadow: inset 1px 1px 2px #fff, inset -1px -1px 2px #000; 
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: #404040; /* 호버 시 thumb 색상 */
    box-shadow: inset 1px 1px 2px #000, inset -1px -1px 2px #fff; 
  }

  ::-webkit-scrollbar-button {
    background-color: #c0c0c0; 
    height: 16px; 
  }

  ::-webkit-scrollbar-corner {
    background-color: #c0c0c0; 
  }
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
  padding: 1.5rem;
  font-family: 'NeoDunggeunmoPro-Regular', cursive; 
  font-size: 20px; 
  letter-spacing: 1px;

  color: ${({ isActive }) => (isActive ? '#000' : '#333')}; 
  box-shadow: ${({ isActive }) => 
    isActive 
      ? 'inset 2px 2px 0 #000, inset -2px -2px 0 #000' 
      : '2px 2px 0 #000, -2px -2px 0 #000'};

  &.nes-btn {
    font-family: 'NeoDunggeunmoPro-Regular', cursive; 
    font-size: 20px; 
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
