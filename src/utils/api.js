import { generateUUID } from './helper'

const API_TOKEN = process.env.REACT_APP_API_AUTH
const API_URL = process.env.REACT_APP_API_URL


////////// GENERICS /////////////////////////////

// Generic GET request.
const get = url => (
    fetch(url, {
        headers: {
            'Authorization': API_TOKEN,
            'Accept': 'application/json',
        }
    })
        .then(res => res.json())
)

// Generic POST request.
const post = (url, body) => (
    fetch(url, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Authorization': API_TOKEN,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())
)

// Generic PU request.
const put = (url, body) => (
    fetch(url, {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: {
            'Authorization': API_TOKEN,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())
)

// Generic DELETE request.
const del = url => (
    fetch(url, {
        method: 'DELETE',
        headers: {
            'Authorization': API_TOKEN,
            'Accept': 'application/json',
        }
    })
        .then(res => res.json())
)

////////// POSTS /////////////////////////////

// Fetch all categories.
// Returns a list of categories.
export const fetchCategories = () => (
    get(`${API_URL}/categories`)
)

// Fetch all posts (default) or only the posts of a given category.
// Returns a collection of posts.
export const fetchPosts = (category = null) => (
    get(`${API_URL}${category ? `/${category}` : ''}/posts`)
)

// Fetch a post by it's id.
// Returns a post.
export const fetchPost = (id) => (
    get(`${API_URL}/posts/${id}`)
)

// Vote on a post.
// Option in the form of { option: 'upVote' / 'downVote' }.
// Returns the post.
export const votePost = (id, option) => (
    post(`${API_URL}/posts/${id}`, option)
)


// Add a new Post.
export const addPost = ({ title, body, author, category }) => {
    const data = {
        id: generateUUID(),
        timestamp: Date.now(),
        title: title,
        body: body,
        author: author,
        category: category
    }
    return post(`${API_URL}/posts`, data)
}


// Updates a post.
export const updatePost = ({ title, body }) => {
    const data = {
        title: post.title,
        body: post.body
    }
    return put(`${API_URL}/posts/${post.id}`, data)
}


// Delete a post
export const deletePost = id => (
    del(`${API_URL}/posts/${id}`)
)


////////// COMMENTS /////////////////////////////

// Fetch comments by post id.
// Returns a list of comments.
export const fetchComments = (id) => (
    get(`${API_URL}/posts/${id}/comments`)
)

// Vote on a comment by comment id.
// Option in the form of { option: 'upVote' / 'downVote' }.
// Returns the comment.
export const voteComment = (id, option) => (
    post(`${API_URL}/comments/${id}`, option)
)


// Add a comment on a post.
// Option in the form of { option: 'upVote' / 'downVote' }.
// Returns the comment.
export const addComment = ({ body, author, parentId }) => {
    const id = generateUUID();
    const timestamp = Date.now();
    const comment = {
        id,
        timestamp,
        body,
        author,
        parentId
    }
    return post(`${API_URL}/comments`, comment);
}

// Updates a comment.
// Returns the comment.
export const updateComment = ({ id, body }) => {
    const update = {
        timestamp: Date.now(),
        body: body
    }
    return put(`${API_URL}/comments/${id}`, update);
}

// Delete a Comment
export const deleteComment = id => (
    del(`${API_URL}/comments/${id}`)
);