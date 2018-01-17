import {
    LOAD_POSTS_SUCCESS,
    LOAD_POST_SUCCESS,
    RESET_POST_DETAILS,
    UPDATE_POST_SORTING,
    UPDATE_POST_SUCCESS
} from '../actions/post'

const postReducer = (state = { posts: [], error: null, sorting: {} }, action) => {
    switch(action.type) {
        case LOAD_POSTS_SUCCESS:
            return { 
                ...state,
                posts: action.posts,
                error: null
            }
        case LOAD_POST_SUCCESS:
            return {
                ...state,
                details: action.post
            }
        case RESET_POST_DETAILS:
            return {
                ...state,
                details: null
            }
        case UPDATE_POST_SUCCESS:
            return { 
                ...state,
                posts: state.posts.map(post => {
                    if (post.id === action.post.id) {
                        post = action.post
                    } 
                    return post
                })
            }
        case UPDATE_POST_SORTING:
            return {
                ...state,
                sorting: action.sorting
            }
        default:
            return state
    }
}

export default postReducer