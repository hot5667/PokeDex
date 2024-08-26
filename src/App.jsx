import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch, Provider } from 'react-redux'; 
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import styled from '@emotion/styled';
import useEmblaCarousel from 'embla-carousel-react';
import 'nes.css/css/nes.min.css';

import PokedexHeader from './components/PokedexHeader';
import PokedexDetails from './components/PokedexDetails';
import PokedexDetailsPage from './components/PokedexDetailsPage';
import CarouselContainer from './components/CarouselContainer';
// import LoadingBar from './pages/LoadingPage';
// import ErrorPage from './pages/ErrorPage';
import PokedexSort from './components/PokedexSort';
import PokedexFilter from './components/PokedexFilter';
import store from './store'; 

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

  const [isFilterOpen, setIsFilterOpen] = useState(false);

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

  const handleFilter = (type) => {
    if (type) {
      const filteredData = sortedPokemonData.filter(pokemon =>
        pokemon.types.includes(type)
      );
      setFilteredPokemonData(filteredData);
    } else {
      setFilteredPokemonData(sortedPokemonData);
    }
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

  // if (isLoading) {
  //   return (
  //     <FullScreenContainer>
  //       <LoadingBar />
  //     </FullScreenContainer>
  //   );
  // }

  // if (error) {
  //   return (
  //     <FullScreenContainer>
  //       <ErrorPage errorCode={500} message={error} />
  //     </FullScreenContainer>
  //   );
  // }

  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Container>
                <PokedexUI className="nes-container is-rounded">
                  <PokedexHeader />
                  <PokedexSort pokemonList={sortedPokemonData} setPokemonList={handleSort} />
                  <button onClick={() => setIsFilterOpen(true)}>타입으로 필터링</button>
                  <PokedexFilter
                    isOpen={isFilterOpen}
                    onClose={() => setIsFilterOpen(false)}
                    onFilter={handleFilter}
                  />
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
              </Container>
            }
          />
          <Route path="/pokemon/:id" element={<PokedexDetailsPage />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
