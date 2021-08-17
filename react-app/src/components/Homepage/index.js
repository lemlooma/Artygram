import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { getAllPosts } from "../../store/post"



const HomePage = () => {

    const posts = useSelector(state => Object.values(state.posts))
    const dispatch = useDispatch();

    // const allPosts = posts.sort()
    console.log(posts)

    useEffect(() => {
        dispatch(getAllPosts())
    }, [])


    return (
        <div>
            <h1>This is my Home Page</h1>
            {posts?.map(post =>
            (<div key={post.id}>
                <div>
                    <img width="50px" src={`${post.user.profile_pic}.png`} />
                    <span> {post.user.username}</span>
                </div>
                <Link to={`post/${post.id}`}>
                    <div>
                        <img width="600px" src={post.pic_url} alt={`img-${post.id}`} />
                    </div>
                </Link>
                <button><i class="far fa-heart"></i></button>
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
