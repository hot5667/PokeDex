import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 10px;
  background-color: #f5f5f5;
  overflow-y: auto;
`;

const ListItem = styled.div`
  padding: 10px;
  margin-bottom: 5px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 1px 2px rgba(0,0,0,0.1); /* 그림자 효과 */
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #e0e0e0;
  }
`;

const PokemonImage = styled.img`
  width: 50px;
  height: 50px;
  margin-right: 10px;
  object-fit: cover;
  border-radius: 4px;
`;

const DeleteButton = styled.button`
  background-color: #ff4d4d;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 5px 10px;
  cursor: pointer;
  font-size: 11px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #cc0000;
  }
`;

const PokemonSelect = ({ onSelect }) => {
  const [pokemonList, setPokemonList] = useState([]);

  const loadPokemonData = () => {
    const savedPokemons = JSON.parse(localStorage.getItem('savedPokemons')) || [];
    setPokemonList(savedPokemons);
  };

  const handleDelete = (pokemonId) => {
    const updatedPokemons = pokemonList.filter(pokemon => pokemon.id !== pokemonId);
    localStorage.setItem('savedPokemons', JSON.stringify(updatedPokemons));
    setPokemonList(updatedPokemons);
  };

  const handleOnDragEnd = (result) => {
    if (!result.destination) return; // 드래그가 놓일 위치가 없으면 아무 작업도 하지 않음

    const reorderedPokemons = Array.from(pokemonList);
    const [movedPokemon] = reorderedPokemons.splice(result.source.index, 1); // 이동할 항목 제거
    reorderedPokemons.splice(result.destination.index, 0, movedPokemon); // 새 위치에 항목 추가

    localStorage.setItem('savedPokemons', JSON.stringify(reorderedPokemons));
    setPokemonList(reorderedPokemons); // 상태 업데이트
  };

  useEffect(() => {
    loadPokemonData();
    const intervalId = setInterval(loadPokemonData, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <Container className='nes-container is-rounded'>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="droppable">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {pokemonList.length > 0 ? (
                pokemonList.map((pokemon, index) => (
                  <Draggable key={pokemon.id} draggableId={pokemon.id} index={index}>
                    {(provided) => (
                      <ListItem
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <PokemonImage src={pokemon.image} alt={pokemon.name} />
                          {pokemon.name}
                        </div>
                        <DeleteButton onClick={() => handleDelete(pokemon.id)}>삭제</DeleteButton>
                      </ListItem>
                    )}
                  </Draggable>
                ))
              ) : (
                <p>포켓몬 목록이 비어 있습니다.</p>
              )}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </Container>
  );
};

export default PokemonSelect;