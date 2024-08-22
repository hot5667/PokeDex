import { createSlice } from '@reduxjs/toolkit';

const pokemonBasicSlice = createSlice({
    name: 'pokemonBasic',
    initialState: {
        data: null, 
        isLoading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase('pokemonBasic/fetchPokemonBasicData/pending', (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase('pokemonBasic/fetchPokemonBasicData/fulfilled', (state, action) => {
                state.isLoading = false;
                state.data = action.payload; 
            })
            .addCase('pokemonBasic/fetchPokemonBasicData/rejected', (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export default pokemonBasicSlice.reducer;