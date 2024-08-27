const fetchPokemonSpecies = async (id) => {
    const response = await fetch(`${import.meta.env.VITE_REACT_APP_POKEMON_API}/pokemon-species/${id}`);
    if (!response.ok) {
        throw new Error('포켓몬 종 데이터 가져오기 실패');
    }
    const data = await response.json();
    const koreanName = data.names.find(name => name.language.name === 'ko')?.name;
    return koreanName;
};

// Define a function to fetch Pokemon sprite data by ID
const fetchPokemonSprite = async (id) => {
    const response = await fetch(`${import.meta.env.VITE_REACT_APP_POKEMON_API}/pokemon/${id}`);
    if (!response.ok) {
        throw new Error('포켓몬 스프라이트 데이터 가져오기 실패');
    }
    const data = await response.json();
    return data.sprites.front_default;
};

// Define the middleware
export const pokemonBasicMiddleware = store => next => async action => {
    if (action.type === 'pokemonBasic/fetchPokemonBasicData') {
        try {
            const pokemonCount = Number(import.meta.env.VITE_REACT_APP_POKEMON_COUNT);
            if (isNaN(pokemonCount) || pokemonCount <= 0) {
                throw new Error('유효하지 않은 포켓몬 수');
            }

            // Use map to create an array of promises for fetching data
            const promises = Array.from({ length: pokemonCount }, async (_, i) => {
                const id = i + 1;
                const [name, image] = await Promise.all([
                    fetchPokemonSpecies(id),
                    fetchPokemonSprite(id)
                ]);
                return {
                    number: `00${id}`.slice(-3),
                    name,
                    image
                };
            });

            const fetchedData = await Promise.all(promises);

            store.dispatch({
                type: 'pokemonBasic/fetchPokemonBasicData/fulfilled',
                payload: fetchedData
            });
        } catch (error) {
            store.dispatch({
                type: 'pokemonBasic/fetchPokemonBasicData/rejected',
                payload: error.message || '포켓몬 데이터를 가져오는 데 실패했습니다.'
            });
        }
    }

    return next(action);
};
