import React, { useEffect, useCallback, useState } from 'react';
import styled from '@emotion/styled';
import useEmblaCarousel from 'embla-carousel-react';
import 'nes.css/css/nes.min.css';

import PokedexHeader from './components/PokedexHeader';
import PokedexDetails from './components/PokedexDetails';
import CarouselContainer from './components/CarouselContainer';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color:#d1d1d1;
  font-family: 'NeoDunggeunmoPro-Regular','Press Start 2P', sans-serif; 
`;

const PokedexUI = styled.div`
  margin-top: 1.5%;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border: 4px solid #212529;
  border-radius: 8px;
  padding: 16px;
  width: 90%;
  max-width: 900px;
  height: 90vh;
  box-shadow: 0 0 16px rgba(0, 0, 0, 0.5);
  overflow: hidden;
  text-align: center; 
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-grow: 1;
  overflow: hidden;
`;

const App = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [pokemonData, setPokemonData] = useState([]);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    axis: 'y',
    dragFree: true,
    containScroll: 'keepSnaps',
    slidesToScroll: 1,
  });

  const fetchPokemonData = useCallback(async () => {
    const promises = Array.from({ length: 151 }, (_, i) => {
      const id = i + 1;
      return fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
        .then((response) => response.json())
        .then((data) => {
          const koreanName = data.names.find((name) => name.language.name === 'ko').name;
          return fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
            .then((spriteResponse) => spriteResponse.json())
            .then((spriteData) => ({
              number: `00${id}`.slice(-3),
              name: koreanName,
              image: spriteData.sprites.front_default,
            }));
        });
    });

    const fetchedData = await Promise.all(promises);
    setPokemonData(fetchedData);
    setSelectedIndex(0);
  }, []);

  useEffect(() => {
    fetchPokemonData();
  }, [fetchPokemonData]);

  const handleSelect = useCallback((index) => {
    setSelectedIndex(index);
    if (emblaApi) {
      emblaApi.scrollTo(index);
    }
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    
    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };
    
    emblaApi.on('select', onSelect);
    return () => emblaApi.off('select', onSelect);
  }, [emblaApi]);

  return (
    <Container>
      <PokedexUI className="nes-container is-rounded">
        <PokedexHeader />
        <ContentWrapper>
          <PokedexDetails
            number={pokemonData[selectedIndex]?.number}
            name={pokemonData[selectedIndex]?.name}
            image={pokemonData[selectedIndex]?.image}
          />
          <CarouselContainer
            pokemonData={pokemonData}
            selectedIndex={selectedIndex}
            onSelect={handleSelect}
            emblaRef={emblaRef}
          />
        </ContentWrapper>
      </PokedexUI>
    </Container>
  );
};

export default App;