import * as api from '../utils/api'

export const LOAD_POSTS_SUCCESS = 'LOAD_POSTS_SUCCESS'
export const UPDATE_POST_SUCCESS = 'UPDATE_POST'
export const UPDATE_POST_SORTING = 'UPDATE_POST_SORTING'

export const receive_posts = posts => ({
    type: LOAD_POSTS_SUCCESS,
    posts
})

export const update_post = post => ({
    type: UPDATE_POST_SUCCESS,
    post
})

export const receive_sorting = sorting => ({
    type: UPDATE_POST_SORTING,
    sorting
})

export const fetchPosts = dispatch => _ => {
    api
        .fetchPosts()
        .then(posts => dispatch(receive_posts(posts)))
}

export const upvotePost = dispatch => id => {
    api.votePost(id, { option: 'upVote' })
    .then(post => {
        dispatch(update_post(post))
    })
}

export const downvotePost = dispatch => id => {
    api.votePost(id, { option: 'downVote' })
    .then(post => {
        dispatch(update_post(post))
    })
}
