import { LOAD_CATEGORIES_SUCCESS } from '../actions/category'

const categoryReducer = (state = { list: [], error: null }, action) => {
    switch(action.type) {
        case LOAD_CATEGORIES_SUCCESS:
            return { ...state,
                list: action.data.categories,
                error: null
            }
        default:
            return state
    }
}

export default categoryReducer