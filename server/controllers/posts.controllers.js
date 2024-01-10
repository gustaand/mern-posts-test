import Post from "../models/Post.js";
import { uploadImage, deleteImage } from "../libs/cloudinary.js";
import fs from 'fs-extra';

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.send(posts);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  try {
    const { title, description } = req.body;

    let image;

    // req.files : sirve igual que req.body y req.params, pero este es para ver archivos.
    if (req.files?.image) {
      // dentro de uploadImage, la ruta del archivo
      const result = await uploadImage(req.files.image.tempFilePath);
      // Despues de guardada la imagen en clodinary y la url en la base de datos, eliminar de nuestro servidor
      await fs.remove(req.files.image.tempFilePath);
      image = {
        url: result.secure_url,
        public_id: result.public_id
      }
    }

    const newPost = new Post({ title, description, image });
    await newPost.save();

    res.json(newPost);

  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  try {
    /* con este metodo findByIdAndUpdate(id, body, {new: true}) 
    el primer parametro es el ID de lo que queremos actualizar, el segundo elBODY y el tercero es el {new: true} que devuelve el objeto nuevo. */
    const updatePost = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
    return res.send(updatePost);

  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    const postRemoved = await Post.findByIdAndDelete(req.params.id);

    if (!postRemoved) return res.sendStatus(404);

    //Eliminar la imagen de cloudinary verificando si existe la imagen con el public_id
    if (postRemoved.image.public_id) {
      await deleteImage(postRemoved.image.public_id);
    }

    return res.sendStatus(204);

  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

export const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.sendStatus(404);
    return res.json(post);

  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};