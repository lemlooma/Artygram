

// constants
const SET_USER = 'session/SET_USER';
const REMOVE_USER = 'session/REMOVE_USER';
const DEMO_LOGIN = 'session/demoLogin';
const GET_FOLLOWING = 'followers/GET_FOLLOWING'


const setUser = (user) => ({
  type: SET_USER,
  payload: user
});

const removeUser = () => ({
  type: REMOVE_USER,
})

const demoLogin = (demoUser) => {
  return {
    type: DEMO_LOGIN,
    payload: demoUser
  }
}

const getFollowing = (user) => ({
  type: GET_FOLLOWING,
  payload: user
})


const initialState = { user: null };

export const authenticate = () => async (dispatch) => {
  const response = await fetch('/api/auth/', {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }

    dispatch(setUser(data));
  }
}

export const login = (email, password) => async (dispatch) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password
    })
  });


  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data))
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }

}

export const logout = () => async (dispatch) => {
  const response = await fetch('/api/auth/logout', {
    headers: {
      'Content-Type': 'application/json',
    }
  });

  if (response.ok) {
    dispatch(removeUser());
  }
};


export const signUp = (username, email, password) => async (dispatch) => {
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      email,
      password,
    }),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data))
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }
}

export const loginDemo = () => async (dispatch) => {

  const response = await fetch('/api/auth/demo', {
    method: 'POST',
  });

 if(response.ok){
   const data = await response.json()
  dispatch(demoLogin(data));
  return response;
 }
}

export const getAllFollowing = (id) => async (dispatch) => {
  const response = await fetch(`/api/users/${id}/following`);

  if (response.ok) {
    const user = await response.json();
    dispatch(setUser(user));
  }
};





export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { user: action.payload }
    case REMOVE_USER:
      return { user: null }
    case DEMO_LOGIN:
      return { user: action.payload }
    // case GET_FOLLOWING : {
    //     return {user: action.payload}
    // }
    default:
      return state;
  }
}
