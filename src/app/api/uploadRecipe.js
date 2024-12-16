// src/app/api/uploadRecipe.js
import { v4 as uuidv4 } from 'uuid';
import multer from 'multer';
import nextConnect from 'next-connect';
import { connectToDatabase } from '../../../utils/db';
import Recipe from '../../../models/Recipe';



const upload = multer({
  storage: multer.diskStorage({
    destination: './public/uploads',
    filename: (req, file, cb) => cb(null, `${uuidv4()}-${file.originalname}`),
  }),
});

const apiRoute = nextConnect({
  onError(error, req, res) {
    res.status(501).json({ error: `Sorry, something went wrong! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.use(upload.fields([{ name: 'video', maxCount: 1 }, { name: 'photo', maxCount: 1 }]));

apiRoute.post((req, res) => {
  const { title, content } = req.body;
  const video = req.files.video ? req.files.video[0].path.replace('public', '') : null;
  const photo = req.files.photo ? req.files.photo[0].path.replace('public', '') : null;

  const recipe = {
    title,
    content,
    video,
    photo,
  };

  res.status(200).json(recipe);
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false,
  },
};
