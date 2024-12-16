import nc from 'next-connect';
import { getSession } from 'next-auth/react';
import Recipe from '../../../models/Recipe';
import dbConnect from '../../../utils/db';
import upload from '../../../utils/multer';

const handler = nc()
  .use(upload.single('image'))
  .get(async (req, res) => {
    const session = await getSession({ req });
    if (!session) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
      await dbConnect();
      const recipes = await Recipe.find({ userId: session.user.id });
      res.status(200).json(recipes);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching recipes' });
    }
  })
  .post(async (req, res) => {
    const session = await getSession({ req });
    if (!session) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
      await dbConnect();
      const { title, content } = req.body;
      const recipe = new Recipe({
        userId: session.user.id,
        title,
        content,
        image: req.file ? `/uploads/${req.file.filename}` : null,
      });
      await recipe.save();
      res.status(201).json(recipe);
    } catch (error) {
      res.status(500).json({ message: 'Error creating recipe' });
    }
  });

export default handler;
