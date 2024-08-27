import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from '@emotion/styled';
import useEmblaCarousel from 'embla-carousel-react';

import PokedexHeader from '../components/PokedexHeader';
import PokedexDetails from '../components/PokedexDetails';
import CarouselContainer from '../components/CarouselContainer';
import PokedexSort from '../components/PokedexSort';
import PokemonSelect from '../components/PokedexSelect';
import LoadingPage from '../pages/LodingPage';
import ErrorPage from '../pages/ErrorPage';

const Sidebar = styled.div`
  width: 300px;
  height: 100%;
  position: fixed;
  left: 0;
  top: 2.7%;
  padding: 20px;
  max-height: 975px;
  display: flex;
  flex-direction: column;
  justify-content: center; 
  align-items: center; 
`;

const MainContent = styled.div`
  margin-left: 320px;
  padding: 20px;
  width: calc(100% - 320px);
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #d1d1d1;
  font-family: 'NeoDunggeunmoPro-Regular', sans-serif;
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

const ControlsWrapper = styled.div`
  display: flex;
  justify-content: flex-end;;
  align-items:center;
  padding: 0 16px;
  gap: 10px;
  margin-top: 1%;
`;

const MainPage = () => {
  const dispatch = useDispatch();
  const { data: pokemonData, isLoading, error } = useSelector(state => state.pokemonBasic);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [sortedPokemonData, setSortedPokemonData] = useState([]);
  const [filteredPokemonData, setFilteredPokemonData] = useState([]);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    axis: 'y',
    dragFree: true,
    containScroll: 'keepSnaps',
    slidesToScroll: 1,
  });

  const fetchPokemonData = useCallback(() => {
    dispatch({ type: 'pokemonBasic/fetchPokemonBasicData' });
  }, [dispatch]);

  useEffect(() => {
    fetchPokemonData();
  }, [fetchPokemonData]);

  useEffect(() => {
    if (pokemonData) {
      setSortedPokemonData(pokemonData);
      setFilteredPokemonData(pokemonData);
    }
  }, [pokemonData]);

  const handleSort = (sortedData) => {
    setSortedPokemonData(sortedData);
    setFilteredPokemonData(sortedData);
  };

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
    return <LoadingPage />;
  }

  if (error) {
    return <ErrorPage error={error} />;
  }

  return (
    <Container>
      <Sidebar>
        <PokemonSelect />
      </Sidebar>
      <MainContent>
        <PokedexUI className="nes-container is-rounded">
          <PokedexHeader />
          <ControlsWrapper>
            <PokedexSort pokemonList={sortedPokemonData} setPokemonList={handleSort} />
          </ControlsWrapper>
          <ContentWrapper>
            <PokedexDetails
              number={filteredPokemonData[selectedIndex]?.number}
              name={filteredPokemonData[selectedIndex]?.name}
              image={filteredPokemonData[selectedIndex]?.image}
            />
            <CarouselContainer
              pokemonData={filteredPokemonData}
              selectedIndex={selectedIndex}
              onSelect={handleSelect}
              emblaRef={emblaRef}
            />
          </ContentWrapper>
        </PokedexUI>
      </MainContent>
    </Container>
  );
};

export default MainPage;
