import React, { useEffect, useCallback, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import useEmblaCarousel from 'embla-carousel-react';
import 'nes.css/css/nes.min.css';

import PokedexHeader from './components/PokedexHeader';
import PokedexDetails from './components/PokedexDetails';
import CarouselContainer from './components/CarouselContainer';
import LoadingBar from './components/LodingBar';
import ErrorPage from './components/ErrorPage';

const FullScreenContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #fff;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #d1d1d1;
  font-family: 'NeoDunggeunmoPro-Regular', 'Press Start 2P', sans-serif; 
`;

const PokedexUI = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border: 4px solid #212529;
  border-radius: 8px;
  padding: 16px;
  width: 90%;
  max-width: 1200px;
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
  const [isLoading, setIsLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const [emblaRef, emblaApi] = useEmblaCarousel({
    axis: 'y',
    dragFree: true,
    containScroll: 'keepSnaps',
    slidesToScroll: 1,
  });

  const fetchPokemonData = useCallback(async () => {
    setIsLoading(true);
    setError(null); 
    try {
      const promises = Array.from({ length: 151 }, (_, i) => {
        const id = i + 1;
        return fetch(`${import.meta.env.VITE_REACT_APP_POKEMON_API}/pokemon-species/${id}`)
          .then((response) => response.json())
          .then((data) => {
            const koreanName = data.names.find((name) => name.language.name === 'ko').name;
            return fetch(`${import.meta.env.VITE_REACT_APP_POKEMON_API}/pokemon/${id}`)
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
    } catch (err) {
      setError('포켓몬 데이터를 가져오는 데 실패했습니다. 나중에 다시 시도해 주세요.');
    } finally {
      setIsLoading(false);
    }
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

  if (isLoading) {
    return (
      <FullScreenContainer>
        <LoadingBar />
      </FullScreenContainer>
    );
  }

  if (error) {
    return (
      <FullScreenContainer>
        <ErrorPage errorCode={500} /> {}
      </FullScreenContainer>
    );
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
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
          }
        />
        <Route path="/pokemon/:id" element={<PokedexDetails />} />
      </Routes>
    </Router>
  );
};

export default App;