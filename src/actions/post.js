import * as api from '../utils/api';

export const RESET_POST_DETAILS = 'RESET_POST_DETAILS';
export const LOAD_POSTS_SUCCESS = 'LOAD_POSTS_SUCCESS';
export const LOAD_POST_SUCCESS = 'LOAD_POST_SUCCESS';
export const UPDATE_POST_SUCCESS = 'UPDATE_POST';
export const UPDATE_POST_SORTING = 'UPDATE_POST_SORTING';
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';



////////// ACTION CREATORS SYNC ////////////////

// Receive a list of posts.
const receive_posts = posts => ({
    type: LOAD_POSTS_SUCCESS,
    posts
});

// Receive the details of a post.
const receive_post_details = post => ({
    type: LOAD_POST_SUCCESS,
    post
});

// Reset the post details.
// This can be run before fetching new details to avoid display flickering.
export const reset_post_details = post => ({
    type: LOAD_POST_SUCCESS,
    post
});

// Update a post.
const update_post = post => ({
    type: UPDATE_POST_SUCCESS,
    post
});

// ADd a post.
const add_post = post => ({
    type: ADD_POST_SUCCESS,
    post
});

// Remove a post.
const remove_post = id => ({
    type: REMOVE_POST_SUCCESS,
    id
});

// Receive new sorting options.
export const receive_sorting = sorting => ({
    type: UPDATE_POST_SORTING,
    sorting
});


////////// ACTION CREATORS ASYNC ////////////////

// Fetch all posts and dispatch async
export const fetchPosts = dispatch => _ => {
    api
        .fetchPosts()
        .then(posts => dispatch(
            receive_posts(posts)
        ));
}

// Fetch post by id and dispatch async
export const fetchPost = dispatch => id => {
    api
        .fetchPost(id)
        .then(post => dispatch(
            receive_post_details(post)
        ));
}

// Upvote post by id and dispatch async
export const upvotePost = dispatch => id => {
    api
        .votePost(id, { option: 'upVote' })
        .then(post => {
            dispatch(update_post(post))
        });
}

// downvote post by id and dispatch async
export const downvotePost = dispatch => id => {
    api.votePost(id, { option: 'downVote' })
        .then(post => {
            dispatch(update_post(post))
        });
}

// upsert post
// if post has id, update the post
// else add as new post
export const upsertPost = dispatch => post => {
    console.log(post)
    if (post.id) {
        api
            .updatePost(post).then(post => {
                dispatch(update_post(post))
            });
    } else {
        api.addPost(post)
            .then(post => {
                dispatch(add_post(post))
            });
    }
}

// upsert post
// if post has id, update the post
// else add as new post
export const deletePost = dispatch => id => {
    api
        .deletePost
        .then(_ => {
            dispatch(remove_post(id))
        });
}