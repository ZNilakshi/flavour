
const express = require('express');
//This is for chatbot


const multer = require('multer');

const mongoose = require('mongoose');
const path = require('path');
const axios = require('axios');
const cors = require('cors');
const fs = require('fs');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {json, urlencoded} = require("express");
const {log} = require("node:util");


const app = express();
const PORT = process.env.PORT || 5000;
app.use(json({ limit: '10mb' })); // or '50mb', etc.
app.use(urlencoded({ limit: '10mb', extended: true }));

const SECRET_KEY = '2101858565';
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect("mongodb+srv://nilakshisamarasekara0:ytXg68F2aApPsKTY@cluster0.o6ahwrk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Define the schemas and models
const recipeSchema = new mongoose.Schema({
    title: String,
    description: String,
    category: String,
    videoUrl: String,
    imageUrl: String,
    ingredients:[String]
});

const todaySpecialSchema = new mongoose.Schema({
    image: String,
    name: String,
    creator: String,
    profilePhoto: String,
});

const chefRecipeSchema = new mongoose.Schema({
    name: String,
    chefName: String,
    rating: Number,
    image: String,
});

const recentBlogSchema = new mongoose.Schema({
    image: String,
    name: String,
    creator: String,
    profilePhoto: String,
});

const mostPopularSchema = new mongoose.Schema({
    image: String,
    name: String,
    creater: String,
    ProfilePhoto: String,
});
// Define the User schema and model
const userSchema = new mongoose.Schema({
    email: { type: String, unique: true },
    password: String,
});

const chefProfileSchema = new mongoose.Schema({
    fullName: String,
    bio: String,
    specialty: String,
    email: { type: String, unique: true },
    workPlace: String,
    experience: String,
    photo: String,
    followers:Number,
});
const LatestrecipeSchema = new mongoose.Schema({
    category: String,
    title: String,
    description: String,
    time: String,
    rating: Number,
    image: String
});
const ingredientPairSchema = new mongoose.Schema({
    ingredients: [String],
    recipe: String
});
const IngredientPair = mongoose.model('IngredientPairs', ingredientPairSchema);

const LatestRecipe = mongoose.model('LatestRecipe', LatestrecipeSchema);


const User = mongoose.model('User', userSchema);
const ChefProfile = mongoose.model('ChefProfile', chefProfileSchema);
const Recipe = mongoose.model('Recipe', recipeSchema);
const TodaySpecial = mongoose.model('TodaySpecial', todaySpecialSchema);
const ChefRecipe = mongoose.model('ChefRecipe', chefRecipeSchema);
const RecentBlog = mongoose.model('RecentBlog', recentBlogSchema);
const MostPopular = mongoose.model('MostPopular', mostPopularSchema);

// Set up Multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage });

// Create the uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

// API endpoints
// API Endpoint to get the latest recipe
app.get('/api/latest-recipe', async (req, res) => {
    try {
        const latestRecipe = await LatestRecipe.findOne().sort({ _id: -1 });
        if (!latestRecipe) return res.status(404).json({ message: 'No recipe found' });
        res.json(latestRecipe);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});
// User registration endpoint
app.post('/api/register', async (req, res) => {
    const { email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ email, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to register user' });
    }
});

// User login endpoint
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }
        const token = jwt.sign({ email: user.email }, SECRET_KEY, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Failed to login user' });
    }
});

// Middleware to authenticate JWT token
const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

// Ingredient-related endpoints
app.get('/ingredients', async (req, res) => {
    try {
        const ingredientPairs = await Recipe.find();
        console.log(ingredientPairs);
        const allIngredients = new Set();
        console.log(allIngredients);
        ingredientPairs.forEach(pair => {
            pair.ingredients.forEach(ingredient => {
                allIngredients.add(ingredient.toLowerCase());
            });
        });

        res.json({ ingredients: Array.from(allIngredients) });
    } catch (error) {
        console.error('Error while retrieving ingredients', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});



app.get('/recipe/:ingredient1/:ingredient2', async (req, res) => {
    const { ingredient1, ingredient2 } = req.params;
    const normalizedIngredient1 = ingredient1.toLowerCase();
    const normalizedIngredient2 = ingredient2.toLowerCase();

    console.log('Normalized Ingredients:', normalizedIngredient1, normalizedIngredient2);

    try {
        // First, test with just one ingredient
        const testRecipes = await Recipe.find({
            ingredients: normalizedIngredient1
        });
        console.log('Test Recipes with one ingredient:', testRecipes);

        // If testRecipes is empty, there is likely an issue with data normalization
        if (testRecipes.length === 0) {
            return res.status(404).json({ message: 'No recipes found for one ingredient' });
        }

        // Now, test with both ingredients
        const recipes = await Recipe.find({
            ingredients: {
                $all: [normalizedIngredient1, normalizedIngredient2]
            }
        });

        console.log('Recipes found with both ingredients:', recipes);

        if (recipes.length === 0) {
            return res.status(404).json({ message: 'No recipes found' });
        }

        // Extracting and returning the titles of the recipes
        const recipeTitles = recipes.map(recipe => recipe.title);
        const recipeYoutubeLink = recipes.map(recipe => recipe.videoUrl);
        console.log('Recipe Titles:', recipeTitles);
        res.json({ recipes: recipeTitles,
            recipeYoutubeLink:recipeYoutubeLink});
    } catch (error) {
        console.error('Error while retrieving recipes', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});




// Delete user account endpoint
app.delete('/api/deleteAccount', authenticateToken, async (req, res) => {
    try {
        await User.deleteOne({ email: req.user.email });
        res.status(200).json({ message: 'User account deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete user account' });
    }
});
// Endpoint to handle requests to OpenAI Chat Completions API
app.post('/chat', async (req, res) => {
    try {

        const  prompt  = req.body.messages[0].content;

        const accessToken = 'sk-proj-NLW77jcD9lsAkAuliVYMT3BlbkFJlBiy7EYQkFPqVSPRjeII'; // Replace this with your actual OpenAI API key  sk-proj-b3AylHcPRLT0oVvr9e6hT3BlbkFJVHQK7ZbseSZzQGOxem9u

        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: 'gpt-3.5-turbo', // Specify the model you want to use
            messages: [{ role: 'user', content: prompt }],
            max_tokens: 150,
            temperature: 0.7
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        });

        res.json(response.data);
        console.log(response.data.choices[0].message.content)
    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'An error occurred while processing the request' });
    }
});
// Fetch and add chef profiles
app.get('/api/chefProfiles', async (req, res) => {
    try {
        const chefProfiles = await ChefProfile.find({});
        res.json(chefProfiles);
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
});
app.get('/api/chefProfileEmail', async (req, res) => {
    try {
        const { email } = req.query;

        if (email) {
            const chefProfile = await ChefProfile.findOne({ email });
            if (!chefProfile) {
                return res.status(404).json({ message: 'Chef profile not found' });
            }
            res.json(chefProfile);
        } else {
            const chefProfiles = await ChefProfile.find({});
            res.json(chefProfiles);
        }
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
});
// To save chef Profile
app.post('/api/saveProfile', async (req, res) => {
    try {
        const { fullName, specialty, workPlace, email, language, experience, bio, photo } = req.body;

        // Check if the profile already exists
        let profile = await ChefProfile.findOne({ email });
        if (profile) {
            // Update existing profile
            profile = await ChefProfile.findOneAndUpdate(
                { email },
                { fullName, specialty, workPlace, language, experience, bio, photo },
                { new: true }
            );
        } else {
            // Create new profile
            profile = new ChefProfile({ fullName, specialty, workPlace, language, experience, bio, photo ,email});
            await profile.save();
        }

        res.status(201).json(profile);
    } catch (error) {
        res.status(500).json({ error: 'Failed to save profile' });
    }
});
// Fetch and add today's specials
app.get('/api/todaySpecials', async (req, res) => {
    try {
        const todaySpecials = await TodaySpecial.find({});
        res.json(todaySpecials);
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
});

app.post('/api/todaySpecials', async (req, res) => {
    try {
        const { image,name,creator,profilePhoto } = req.body;
        const newSpecial = new TodaySpecial({ image,name,creator,profilePhoto });
        await newSpecial.save();
        res.status(201).json(newSpecial);
    } catch (error) {
        res.status(500).json({ error: 'Failed to add today\'s special' });
    }
});

// Fetch and add chef's recipes
app.get('/api/chefRecipes', async (req, res) => {
    try {
        const chefRecipes = await ChefRecipe.find({});
        res.json(chefRecipes);
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
});

app.post('/api/chefRecipes', async (req, res) => {
    try {
        const { name, chefName, rating, image } = req.body;
        const newChefRecipe = new ChefRecipe({ name, chefName, rating, image });
        await newChefRecipe.save();
        res.status(201).json(newChefRecipe);
    } catch (error) {
        res.status(500).json({ error: 'Failed to add chef\'s recipe' });
    }
});

// Fetch and add recent blogs
app.get('/api/recentBlogs', async (req, res) => {
    try {
        const recentBlogs = await RecentBlog.find({});
        res.json(recentBlogs);
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
});

app.post('/api/recentBlogs', async (req, res) => {
    try {
        const { image,name,creator,profilePhoto} = req.body;
        const newBlog = new RecentBlog({ image,name,creator,profilePhoto});
        await newBlog.save();
        res.status(201).json(newBlog);
    } catch (error) {
        res.status(500).json({ error: 'Failed to add recent blog' });
    }
});

// Fetch and add most popular
app.get('/api/mostPopular', async (req, res) => {
    try {
        const mostPopular = await MostPopular.find({});
        res.json(mostPopular);
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
});

app.post('/api/mostPopular', async (req, res) => {
    try {
        const { image,name,creator,profilePhoto} = req.body;
        const newPopular = new MostPopular({ image,name,creator,profilePhoto });
        await newPopular.save();
        res.status(201).json(newPopular);
    } catch (error) {
        res.status(500).json({ error: 'Failed to add most popular' });
    }
});

// Route to handle recipe uploads
app.post('/api/uploadRecipe', upload.single('image'), async (req, res) => {
    try {
        const { title, description, category, videoUrl, ingredients } = req.body;
        const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;
        const ingredientsArray = JSON.parse(ingredients);
        const newRecipe = new Recipe({ title, description, category, videoUrl, imageUrl, ingredients: ingredientsArray });
        await newRecipe.save();
        res.status(201).json(newRecipe);
    } catch (error) {
        res.status(500).json({ error: 'Failed to upload recipe' });
    }
});
// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
