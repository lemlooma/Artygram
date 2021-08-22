import { useState } from "react";
import { updateCaption } from "../../store/post";
import { useDispatch } from 'react-redux'
import "./editcaption.css"
const EditCaption = ({ post, hideForm }) => {
    // const [editCaption, setEditCaption] = useState(post.caption)
    const [editCaption, setEditCaption] = useState(post.caption)
    const dispatch = useDispatch()

    const handleSubmit = async (e) => {

        e.preventDefault()

        const payload = {
            id: post.id,
            caption: editCaption,
            pic_url: post.pic_url,
            user_id: post.user_id

        }

        await dispatch(updateCaption(payload))

        hideForm()
    }


    return (
      <>
        <form className="edit-form" onSubmit={handleSubmit}>
          <input
            className="edit-input-form"
            name="caption"
            placeholder="Caption Edit"
            value={editCaption}
            onChange={(e) => setEditCaption(e.target.value)}
          ></input>
         
            <button className="update-button" type="submit">
              Update Caption
            </button>
            <button className="cancel-edit-button" onClick={hideForm}>
              Cancel
            </button>
          
        </form>
      </>
    );
}

export default EditCaption;
