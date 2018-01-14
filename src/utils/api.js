const AUTH_HEADER = process.env.REACT_APP_API_AUTH
const API_URL = process.env.REACT_APP_API_URL

export function fetchCategories() {
    return fetch(`${API_URL}/categories`, { headers: { 'Authorization': AUTH_HEADER }})
        .then((res) => res.json())
}