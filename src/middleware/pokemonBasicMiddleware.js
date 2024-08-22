export const pokemonBasicMiddleware = store => next => async action => {
    if (action.type === 'pokemonBasic/fetchPokemonBasicData') {
        try {
            const promises = Array.from(
                { length: `${import.meta.env.VITE_REACT_APP_POKEMON_COUNT}` },
                (_, i) => {
                    const id = i + 1;
                    return fetch(`${import.meta.env.VITE_REACT_APP_POKEMON_API}/pokemon-species/${id}`)
                        .then(response => response.json())
                        .then(data => {
                            const koreanName = data.names.find(name => name.language.name === 'ko').name;
                            return fetch(`${import.meta.env.VITE_REACT_APP_POKEMON_API}/pokemon/${id}`)
                                .then(spriteResponse => spriteResponse.json())
                                .then(spriteData => ({
                                    number: `00${id}`.slice(-3),
                                    name: koreanName,
                                    image: spriteData.sprites.front_default,
                                }));
                        });
                }
            );

            const fetchedData = await Promise.all(promises);
            store.dispatch({
                type: 'pokemonBasic/fetchPokemonBasicData/fulfilled',
                payload: fetchedData
            });
        } catch (error) {
            store.dispatch({
                type: 'pokemonBasic/fetchPokemonBasicData/rejected',
                payload: '포켓몬 데이터를 가져오는 데 실패했습니다.'
            });
        }
    }

    return next(action);
};