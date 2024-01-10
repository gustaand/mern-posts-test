import { useState, useEffect, useContext, createContext } from "react"
import {
  getPostsRequests,
  createPostRequest,
  deletePostRequest,
  getPostRequest,
  updatePostRequest
} from "../api/posts"

const postContext = createContext()

export const usePost = () => {
  const context = useContext(postContext)
  return context
}

export const PostProvider = ({ children }) => {

  const [posts, setPosts] = useState([])

  const getPosts = async () => {
    const res = await getPostsRequests()
    setPosts(res.data)
  }

  const createPost = async (post) => {
    try {
      const res = await createPostRequest(post)
      // Actualizar el state del post con las nuevas publicaciones
      setPosts([...posts, res.data])
    } catch (error) {
      console.log(error);
    }
  }

  const deletePost = async (id) => {
    await deletePostRequest(id)
    const updatePosts = posts.filter(post => post._id !== id)
    setPosts(updatePosts)
  }

  const getPost = async (id) => {
    const res = await getPostRequest(id)
    return res.data
  }

  const updatePost = async (id, post) => {
    const res = await updatePostRequest(id, post)
    const updatePosts = posts.map(post => post._id === id ? res.data : post)
    setPosts(updatePosts)
  }

  useEffect(() => {
    getPosts()
  }, [])

  return (
    <postContext.Provider value={{
      posts,
      getPosts,
      createPost,
      deletePost,
      getPost,
      updatePost
    }}>
      {children}
    </postContext.Provider>
  )
}

