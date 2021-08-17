const GET_POSTS = 'posts/GET_POSTS'

const getPosts = (posts) => ({
    type:GET_POSTS,
    payload: posts
})

export const getAllPosts = () => async dispatch => {
    const req = await fetch(`/api/posts/`);
    if (req.ok){
        const posts = await req.json();
        dispatch(getPosts(posts))
    }
    return req
}


const initialState = { posts: null };

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_POSTS: {
            const posts = {
                ...action.payload
            }
            return posts
        }
        default:
            return state;
    }
}
