import * as api from '../utils/api';

export const LOAD_COMMENTS_SUCCESS = 'LOAD_COMMENTS_SUCCESS';
export const UPDATE_COMMENT_SUCCESS = 'UPDATE_COMMENT_SUCCESS';
export const REMOVE_COMMENT_SUCCESS = 'REMOVE_COMMENT_SUCCESS';

////////// ACTION CREATORS SYNC ////////////////

const receive_comments = ({ list, error }) => ({
    type: LOAD_COMMENTS_SUCCESS,
    list,
    error
});

const receive_comment = ({ comment, error }) => ({
    type: UPDATE_COMMENT_SUCCESS,
    comment,
    error
});

const remove_comment = ({ id, error }) => ({
    type: REMOVE_COMMENT_SUCCESS,
    id,
    error
});

////////// ACTION CREATORS ASYNC ////////////////

export const fetchComments = dispatch => postId => {
    api
        .fetchComments(postId)
        .then(data => {
            dispatch(receive_comments({ list: data, error: null }))
        });
}

export const upvoteComment = dispatch => commentId => {
    api
        .voteComment(commentId, { option: 'upVote' })
        .then(data => {
            dispatch(receive_comment({ comment: data, error: null }))
        });
}

export const downvoteComment = dispatch => commentId => {
    api
        .voteComment(commentId, { option: 'downVote' })
        .then(data => {
            dispatch(receive_comment({ comment: data, error: null }))
        });
}

export const addComment = dispatch => ({ body, author, parentId }) => (
    api
        .addComment({ body, author, parentId })
        .then(data => {
            return dispatch(receive_comment({ comment: data, error: null }))
        })
)

export const updateComment = dispatch => ({ id, body }) => (
    api
        .updateComment({ id, body })
        .then(data => {
            return dispatch(receive_comment({ comment: data, error: null }))
        })
)

export const deleteComment = dispatch => commentId => (
    api
        .deleteComment(commentId)
        .then(data => {
            return dispatch(remove_comment({ id: commentId, error: null }))
        })
)