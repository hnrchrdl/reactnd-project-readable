import {
    LOAD_COMMENTS_SUCCESS,
    REMOVE_COMMENT_SUCCESS,
    UPDATE_COMMENT_SUCCESS
} from '../actions/comment'

const commentReducer = (state = { list: [], error: null }, action) => {
    console.log(action)
    switch (action.type) {
        case LOAD_COMMENTS_SUCCESS:
            return {
                ...state,
                list: action.list,
                error: null
            }

        case UPDATE_COMMENT_SUCCESS:
            // upsert
            // update if exists in current list
            if (state.list.find(comment => comment.id === action.comment.id)) {
                return {
                    ...state,
                    list: state.list.map(comment => {
                        if (comment.id === action.comment.id) {
                            return action.comment;

                        }
                        return comment;
                    })
                }
            }
            // insert if not existing
            return {
                ...state,
                list: [...state.list, action.comment]
            }
        case REMOVE_COMMENT_SUCCESS:
            // remove from list
            return {
                ...state,
                list: state.list.filter(comment => {
                    if (comment.id === action.id) {
                        return false;

                    }
                    return true;
                })
            }
        default:
            return state
    }
}

export default commentReducer