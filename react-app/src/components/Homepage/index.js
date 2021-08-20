import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { getAllPosts, getLoginPosts, likeOnePost } from "../../store/post"
import './homepage.css'


const HomePage = () => {
    const user = useSelector(state => state.session.user)
    const posts = useSelector(state => Object.values(state.posts))
    const dispatch = useDispatch();

    const [getPost, setPost] = useState(false);

    const Ids = user.follows.map(user => user.id)
    Ids.push(user.id)
    const filtered = posts.filter((post) => Ids.includes(post.user_id))

    const sortedPosts = filtered.reverse()


    useEffect(() => {
        dispatch(getAllPosts())
    }, [])

    useEffect(() => {
        if(getPost){
            dispatch(likeOnePost(getPost))
            // dispatch(getAllPosts())
        }
    }, [getPost])





    return (
        <div className='photo-feed__container'>
            {sortedPosts?.map(post =>
            (<div key={post.id} className='single-post__container'>
                <div className='icon-username__container'>
                    <img className='post-icon' id='post-icon' src={`${post.user?.profile_pic}`} />
                    <span className='post-username'> {post.user?.username}</span>
                </div>
                <div>
                    <Link to={`post/${post.id}`}>

                        <img className='post-img' src={post.pic_url} alt={`img-${post.id}`} />
                    </Link>
                </div>
                <div>
                    {post.postlikes.includes(user.id)
                    ? <button className='likebutton' onClick={() => setPost(post)} ><i class="fas liked fa-heart"></i></button>
                     :<button className='likebutton' onClick={() => setPost(post)} ><i className="far unliked fa-heart"></i></button>}

                </div>
                <div>likes: {post.likesnum}</div>
                <div>{post.caption}</div>
                <div>comments: {post.commentsnum}</div>
                <div>{post.timestamp}</div>
            </div>)
            )}
        </div>
    )
}

export default HomePage
