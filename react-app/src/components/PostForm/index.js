import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, useHistory } from 'react-router-dom';
import { createPost } from '../../store/post';
import './postForm.css'

const PostForm = () => {
    const [errors, setErrors] = useState([]);
    const [caption,setCaption] = useState('');
    const [pic_url, setPic_Url] = useState('');

    const user = useSelector(state => state.session.user);

    const dispatch = useDispatch();
    const history = useHistory()

    if(!user){
        return <Redirect to='/login'/>;
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
           dispatch(createPost(caption, pic_url));

            history.push('/')

    }

    const cancel = () => {
        history.push('/')
    }

    return (
        <div className="post-form__container">
            <h1 className='form-title'>Create Post</h1>
            <form onSubmit={handleSubmit} className='post-form'>
                <div>{errors.map(error => <li>{error}</li>)}</div>
                <div className='input__container'>
                    {/* <label htmlFor='pic_url'>Picture Url</label> */}
                    <input type='text'
                        className='input'
                        name='pic_url'
                        placeholder='Picture Url'
                        onChange={(e) => setPic_Url(e.target.value)}
                        value={pic_url}
                        required
                    >
                    </input>
                </div>
                <div className='input__container'>
                    {/* <label htmlFor='caption'>Caption</label> */}
                    <textarea type='text'
                        name='caption'
                        className='textarea'
                        placeholder='Caption here!!'
                        onChange={(e) => setCaption(e.target.value)}
                        value={caption}
                        required
                    >
                    </textarea>
                </div>
                <button className='create-button' type='submit'>Create</button>
            </form>

            <div><button className='cancel-button' onClick={cancel}>Cancel</button></div>
        </div>
    )
}

export default PostForm;
