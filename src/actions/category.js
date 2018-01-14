import * as api from '../utils/api'

export const LOAD_CATEGORIES_SUCCESS = 'RECEIVE_CATEGORIES'

export const receive_categories = data => ({
    type: LOAD_CATEGORIES_SUCCESS,
    data
})

export const fetchCategories = _ => dispatch => {
    api
        .fetchCategories()
        .then(categories => dispatch(receive_categories(categories)))
}