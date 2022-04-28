import axios from "axios";

export const GET_MOVIES = "FETCH_MOVIES";
export const ADD_FAVORITE_ITEM = "ADD_FAVORITE_ITEM";
export const REMOVE_FAVORITE_ITEM = "REMOVE_FAVORITE_ITEM";

const API_URL = "https://api.themoviedb.org/3/movie/popular";
const API_KEY = "8be6195029c4eab2f451bc3d84e0d33a";
const PARAMS = "page=1";
const BASE_URL = `${API_URL}?api_key=${API_KEY}&${PARAMS}`;

export const getMovies = () => {
    try {
        return async dispatch => {
            const result = await axios.get(BASE_URL);

            if (result.data) {
                dispatch({
                    type: GET_MOVIES,
                    payload: result.data.results
                });
            } else {
                console.log('Unable to Fetch the API Data ...');
            }
        };
    } catch (error) {
        console.log(`Error Occurred, Details : ${JSON.stringify(error)}`);
    }
};

export const addFavorite = movie => {
    return (dispatch) => {
        dispatch({
            type: ADD_FAVORITE_ITEM,
            payload: movie
        });
    };
};

export const removeFavorite = movie => {
    return (dispatch) => {
        dispatch({
            type: REMOVE_FAVORITE_ITEM,
            payload: movie
        });
    };
};