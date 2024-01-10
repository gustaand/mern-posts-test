import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { usePost } from "../context/postContext"
import { useNavigate, useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

const PostForm = () => {

  const { createPost, getPost, updatePost } = usePost()
  const navigate = useNavigate()
  const params = useParams()

  const [post, setPost] = useState({
    title: '',
    description: '',
    image: null
  })

  // Comprobar cuando cargue el componente si 'params' tiene un valor o no y pasarlo al estado para usar en el formulário
  useEffect(() => {
    // Llamada de una función dentro del useEffect
    (async () => {
      if (params.id) {
        const post = await getPost(params.id)
        setPost(post)
      }
    })() //Este () dispara la función automaticamente.
  }, [params.id])

  return (
    <div className='flex items-center justify-center '>
      <div className='bg-zinc-800 p-10 shadow-md shadow-black'>
        <header className='flex justify-between items-center py-4 text-white'>
          <h3 className='text-xl'>New Post</h3>
          <Link
            to="/"
            className='text-gray-400 text-sm hover:text-gray-300'
          >Go Back</Link>
        </header>
        <Formik
          initialValues={post}
          validationSchema={Yup.object({
            title: Yup.string().required("Title is Required"),
            description: Yup.string().required("Description is Required"),
          })}
          onSubmit={async (values, actions) => {

            if (params.id) {
              await updatePost(params.id, values)
            } else {
              await createPost(values)
            }

            actions.setSubmitting(false)
            navigate('/')
          }}
          enableReinitialize={true}
        >
          {({ handleSubmit, setFieldValue, isSubmitting }) => (
            <Form
              onSubmit={handleSubmit}
            >
              <label
                htmlFor="title"
                className='text-sm block font-bold text-gray-400 '
              >Title</label>
              <Field
                id='title'
                name='title'
                placeholder="title"
                className='px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full mb-4'
              />
              <ErrorMessage
                component="p"
                name='title'
                className='text-red-400 text-sm'
              />

              <label
                htmlFor="description"
                className='text-sm block font-bold text-gray-400 '
              >Description</label>
              <Field
                id='description'
                component='textarea'
                rows={3}
                name='description'
                placeholder="description"
                className='px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full'
              />
              <ErrorMessage
                component='p'
                name='description'
                className='text-red-400 text-sm'
              />

              <label
                htmlFor="image"
                className='text-sm block font-bold text-gray-400 '
              >Image</label>
              <input
                id='image'
                type="file"
                name='image'
                className='px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full'
                onChange={(e) => setFieldValue('image', e.target.files[0])}
              />

              <button
                type='submit'
                className='bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded mt-2 text-white focus:outline-none disabled:bg-indigo-400'
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <AiOutlineLoading3Quarters className='animate-spin h-5 w-5' />
                ) : 'Save'}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default PostForm