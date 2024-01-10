import { v2 } from 'cloudinary';

// configurar el cloudinary
v2.config({
  cloud_name: "dseuopsm8",
  api_key: "642685588588888",
  api_secret: "dVhFgQ2gHCwGqcn_SK7r02-wKTI",
});

// Subir a cloudinary
export const uploadImage = async filePath => {
  return await v2.uploader.upload(filePath, {
    folder: 'posts'
  });
};

// Eliminar de Cloudinary
export const deleteImage = async id => {
  return await v2.uploader.destroy(id);
};

// ___ VER LA DOCUMENTACIÓN DE CLOUDINARY !!! ___
// El modulo v2 recibe el uploader.upload con filePath, {folder: 'nombreDeLaCarpeta'}
// Sirve para guardar los archivos en una carpeta de Cloudinary