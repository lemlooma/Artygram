const GET_POSTS = 'posts/GET_POSTS'
const DELETE_POST = 'post/DELETE_POST'

const getPosts = (posts) => ({
    type: GET_POSTS,
    posts
})

const deletePost = id => ({
    type: DELETE_POST,
    id
})

export const getAllPosts = () => async dispatch => {
    const req = await fetch(`/api/posts/`);
    if (req.ok) {
        const posts = await req.json();
        console.log(posts)
        dispatch(getPosts(posts))
    }
    return req
}

export const deleteOnePost = (id) => async dispatch => {
    const res = await fetch(`/api/posts/${id}`, {
        method: 'DELETE'
    })

    if (res.ok) {
        const deleted = await res.json()
        dispatch(deletePost(id))
        return deleted
    }
}

const initialState = {};

export default function posts(state = initialState, action) {
    switch (action.type) {
        case GET_POSTS: {

            return { ...state, ...action.posts }
        }
        case DELETE_POST: {
            let afterState = { ...state }

            delete afterState[action.id]
            return afterState
        }
        default:
            return state;
    }
}
