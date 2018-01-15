import { LOAD_POSTS_SUCCESS, UPDATE_POST_SUCCESS } from '../actions/post'

const postReducer = (state = { list: [], error: null }, action) => {
    switch(action.type) {
        case LOAD_POSTS_SUCCESS:
            return { 
                ...state,
                posts: action.posts,
                error: null
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
        default:
            return state
    }
}

export default postReducer