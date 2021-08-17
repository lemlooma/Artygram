import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, NavLink } from 'react-router-dom';
import { createPost } from '../../store/post';

const PostForm = () => {
    const [errors, setErrors] = useState([]);
    const [caption,setCaption] = useState('');
    const [pic_url, setPic_Url] = useState('');

    const user = useSelector(state => state.session.user);

    const dispatch = useDispatch();

    if(!user){
        return <Redirect to='/login'/>;
    }

    const onSubmit = async (e) => {
        e.preventDefault()

       try{
           const data = await dispatch(createPost(caption, pic_url));
           if(data){
                return <Redirect to='/'/>
            }
       }catch(err){
        let data = await err.json();
        setErrors(data.errors)
       }
    }

    const cancel =() => {
        return <Redirect to='/'/>
    }

    return (
        <div>
            <div>Create Post</div>
            <form onSubmit={onSubmit}>
                <div>{errors.map(error => <li>{error}</li>)}</div>
                <div>
                    <label htmlFor='pic_url'>Picture Url</label>
                    <input type='text'
                        name='pic_url'
                        onChange={(e) => setPic_Url(e.target.value)}
                        value={pic_url}
                    >
                    </input>
                </div>
                <div>
                    <label htmlFor='caption'>Caption</label>
                    <input type='text'
                        name='caption'
                        onChange={(e) => setCaption(e.target.value)}
                        value={caption}
                    >
                    </input>
                </div>
                <button type='submit'>Create</button>
            </form>

            <div><button onClick={cancel}>Cancel</button></div>
        </div>
    )
}

export default PostForm;
