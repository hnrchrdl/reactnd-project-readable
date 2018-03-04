import * as api from '../utils/api';

export const LOAD_CATEGORIES_SUCCESS = 'LOAD_CATEGORIES_SUCCESS'

////////// ACTION CREATORS SYNC ////////////////

const receive_categories = data => ({
    type: LOAD_CATEGORIES_SUCCESS,
    data
});


////////// ACTION CREATORS ASYNC ////////////////

export const fetchCategories = dispatch => {
    api
        .fetchCategories()
        .then(categories => dispatch(receive_categories(categories)));
}