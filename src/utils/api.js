const API_TOKEN = process.env.REACT_APP_API_AUTH
const API_URL = process.env.REACT_APP_API_URL

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