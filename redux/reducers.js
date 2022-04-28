import { GET_MOVIES, ADD_FAVORITE_ITEM, REMOVE_FAVORITE_ITEM } from "./actions";

const initialState = {
    movies: [],
    favorites: []
};

const moviesReducer = (state = initialState, action) => {
    let nextState = state;

    switch (action.type) {
        case GET_MOVIES:
            nextState = {
                ...state,
                movies: action.payload
            };
            break;
        case ADD_FAVORITE_ITEM:
            nextState = {
                ...state,
                favorites: [...state.favorites, action.payload]
            };
            break;
        case REMOVE_FAVORITE_ITEM:
            nextState = {
                ...state,
                favorites: state.favorites.filter(movie => movie.id !== action.payload.id)
            };
            break;
    }

    return nextState;
};

export default moviesReducer;