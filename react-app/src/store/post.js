const GET_POSTS = 'posts/GET_POSTS'
const CREATE_POST = 'posts/CREATE_POST'

const getPosts = (posts) => ({
    type:GET_POSTS,
    payload: posts
})

const newPost = (post) => ({
    type: CREATE_POST,
    payload: post
})

export const getAllPosts = () => async dispatch => {
    const req = await fetch(`/api/posts/`);
    if (req.ok){
        const posts = await req.json();
        dispatch(getPosts(posts))
    }
    return req
}


export const createPost = (caption, pic_url) => async dispatch => {

    const req = await fetch(`/api/posts/new`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            caption, pic_url
        })
    });

    if(req.ok){
        const data = await req.json();
        dispatch(newPost(data))


    }else if (req.status < 500) {
        const data = await req.json();
        if (data.errors) {
          return data.errors;
        }
    } else {
        return ['An error occurred. Please try again.']
      }
}



const initialState = {};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_POSTS: {
            return {...action.payload}
        }
        case CREATE_POST: {
            const newState = {...state, ...action.payload}
            return newState
        }
        default:
            return state;
    }
}
