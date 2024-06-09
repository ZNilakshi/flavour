const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

const recipeSchema = new mongoose.Schema({
    title: String,
    content: String,
    video: String,
    photos: [String],
    createdBy: String,
});

const blogSchema = new mongoose.Schema({
    title: String,
    content: String,
    createdBy: String,
});

const Recipe = mongoose.model('Recipe', recipeSchema);
const Blog = mongoose.model('Blog', blogSchema);

app.post('/api/recipes', async (req, res) => {
    const { title, content, video, photos, createdBy } = req.body;
    const recipe = new Recipe({ title, content, video, photos, createdBy });
    await recipe.save();
    res.send(recipe);
});

app.get('/api/recipes', async (req, res) => {
    const recipes = await Recipe.find();
    res.send(recipes);
});

app.post('/api/blogs', async (req, res) => {
    const { title, content, createdBy } = req.body;
    const blog = new Blog({ title, content, createdBy });
    await blog.save();
    res.send(blog);
});

app.get('/api/blogs', async (req, res) => {
    const blogs = await Blog.find();
    res.send(blogs);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
