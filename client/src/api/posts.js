import axios from 'axios'

export const getPostsRequests = async () => {
  return await axios.get(`${import.meta.env.VITE_BACKEND_URL}/posts`)
}

export const createPostRequest = async (post) => {
  // Tendremos que pasar al backend como un formulário, yá que contiene lá imagen
  // Transformar el objeto en un formulário.
  const form = new FormData()

  for (let key in post) {          // Para cada key dentro del post, creamos un campo con el key (ej 'title:') y el valor (ej 'string')
    form.append(key, post[key])     // el form.append(key, post[key]) es lo mismo que un form{"title": "valor"}
  }

  return await axios.post(`${import.meta.env.VITE_BACKEND_URL}/posts`, form, {
    // Cambiar el tipo de contenido que se está enviando
    headers: {
      "Content-Type": "multipart/form-data"
    }
  })
}

export const deletePostRequest = async (id) => {
  return await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/posts/${id}`)
}

export const getPostRequest = async (id) => {
  return await axios.get(`${import.meta.env.VITE_BACKEND_URL}/posts/${id}`)
}

export const updatePostRequest = async (id, newFields) => {
  return await axios.put(`${import.meta.env.VITE_BACKEND_URL}/posts/${id}`, newFields)
}