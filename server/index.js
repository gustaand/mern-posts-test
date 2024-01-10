import express from 'express';
import postRoutes from './routes/post.routes.js';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import fileUpload from 'express-fileupload';
import cors from 'cors';

// Conectar express y decir que use json siempre al inicio de la app
const app = express();
app.use(express.json());

// Usar fileUpload({}) para poder subir imagenes. Dentro van algunas opciones
// useTempFiles: Le dice que cuando se suba una imagen, que no lo mantenga en memoria, sino que guarde en una carpeta local.
// tempFileDir: Donde se vá a guardar las imagenes, en este caso en uploads
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: './upload'
}))

dotenv.config();

connectDB();

// Configure CORS
const whitelist = [process.env.FRONTEND_URL];

const corsOptions = {
  origin: function (origin, callback) {

    if (whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Error de CORS'));
    }
  }
}
app.use(cors(corsOptions));

// App Routes
app.use(postRoutes);

// Conect PORT
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});