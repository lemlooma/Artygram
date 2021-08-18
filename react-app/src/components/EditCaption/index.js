import { useState } from "react";
import { updateCaption } from "../../store/post";
import { useDispatch } from 'react-redux'
const EditCaption = ({post, hideForm}) => {
    const [editCaption, setEditCaption] = useState(post.caption)
    const dispatch = useDispatch()

    const handleSubmit = async (e) => {

        e.preventDefault()
        await dispatch(updateCaption(post))

        hideForm()
    }


    return (
        <>
            <form onSubmit={handleSubmit}>
                <input
                    name='caption'
                    placeholder='Caption Edit'
                    value={editCaption}
                    onChange={(e) => setEditCaption(e.target.value)}
                ></input>

                <button type='submit'>update</button>
            </form>
            <button onClick={hideForm}>cancel</button>
        </>
    )
}

export default EditCaption;
