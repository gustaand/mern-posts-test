import toast from 'react-hot-toast'
import { usePost } from '../context/postContext'
import { useNavigate } from 'react-router-dom'

const PostCard = ({ post }) => {

  const { deletePost } = usePost()
  const navigate = useNavigate()

  const handleDelete = (_id) => {
    toast((t) => (
      <div >
        <p className='text-white py-2'>Are you sure you want to delete the post?</p>
        <div className='flex justify-center'>
          <button
            className='bg-red-500 hover:bg-red-400 px-3 py-2 text-sm text-white rounded-sm mx-2'
            onClick={() => {
              deletePost(_id)
              toast.dismiss(t.id)
            }}
          >Delete</button>
          <button
            className='bg-slate-400 hover:bg-slate-500 px-3 py-2 text-white rounded-sm mx-2'
            onClick={() => toast.dismiss(t.id)}
          >Cancel</button>
        </div>
      </div>

    ), {
      style: {
        background: "#202020"
      }
    })
  }

  return (
    <div
      className="bg-zinc-800 text-white rounded-sm shadow-md shadow-black hover:bg-zinc-700 hover:cursor-pointer"
      onClick={() => navigate(`/posts/${post._id}`)}
    >
      <div className="px-4 py-7">

        <div className="flex justify-between">
          <h3>
            {post.title}
          </h3>

          <button
            className="bg-red-600 hover:bg-red-500 text-sm px-2 py-1 rounded-sm"
            onClick={(e) => {
              e.stopPropagation()
              handleDelete(post._id)
            }}
          >Delete
          </button>
        </div>

        {post.image &&
          <img
            src={post.image.url}
            alt={`image from ${post.title}`}
            className='w-full h-full object-cover'
          />
        }

        <p>{post.description}</p>

      </div>
    </div>
  )
}

export default PostCard