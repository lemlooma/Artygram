import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getAllPosts } from "../../store/post"



const HomePage = () => {

    const posts = useSelector(state => state.posts)
    const dispatch = useDispatch();

    console.log(posts.Posts)
    const allPosts = posts.Posts

    useEffect(() => {
        dispatch(getAllPosts())
    },[])


    return (
    <div>
        <h1>This is my Home Page</h1>
        {allPosts?.map(post =>
            (<div key={post.id}>
                <div>
                    <img width="300px" src={post.pic_url} alt={`img-${post.id}`} />
                </div>
                <div>User: {post.user_id}</div>
                <div>{post.caption}</div>
                <div>{post.timestamp}</div>
            </div>)
            )}
    </div>
    )
}

export default HomePage
