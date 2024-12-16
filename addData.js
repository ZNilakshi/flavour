const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://nilakshisamarasekara0:ytXg68F2aApPsKTY@cluster0.o6ahwrk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'; 
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

    
// const LatestrecipeSchema = new mongoose.Schema({
//     category: String,
//     title: String,
//     description: String,
//     time: String,
//     rating: Number,
//     image: String
// });

// const LatestRecipe = mongoose.model('LatestRecipes', LatestrecipeSchema);

// const LatestRecipes = [
//     { category: "APPETIZERS", title: "Breaded chicken breast in breadsticks", description: "Breaded chicken breast in breadsticks is a super crunchy version of the classic nuggets, excellent to accompany with a fresh yogurt sauce!",time: "50 min", rating:4.0, image: "/images/Breaded chicken breast in breadsticks.jpeg" },
//     { category: "SWEETS", title: "Eclair cream and chocolate", description: "The cream and chocolate eclairs are choux pasta sweets stuffed with custard and glazed with white or dark chocolate.",time: "1h 40min", rating:4.3, image: "/images/Eclair cream and chocolate.jpeg"},
//     { category: "FIRST COURSES", title: "Strawberry with clams and bottarga", description: " The fregola with clams and bottarga is a first course that celebrates Sardinian cuisine and that combines simplicity and refinement. Discover doses and procedure! ",time: "45 min", rating:4.8, image: "/images/Strawberry with clams and bottarga.jpeg" },
//     {category: "MAIN COURSES", title: "Grilled Salmon with Avocado Salsa", description: "A healthy and delicious main course featuring grilled salmon topped with a fresh avocado salsa. ",time: "30 min", rating:4.9, image: "/images/Grilled Salmon with Avocado Salsa.jpg"},
//     { category: "SALADS", title: "Greek Salad", description:"A refreshing salad made with cucumbers, tomatoes, olives, and feta cheese, dressed with olive oil and oregano.",time: "15 min", rating:4.7, image: "/images/Greek Salad.jpeg" },
//     { category: "DESSERTS", title: "Tiramisu", description: "A classic Italian dessert made with layers of coffee-soaked ladyfingers, mascarpone cheese, and cocoa powder.",time: "1h 20min", rating:4.8, image: "/images/Tiramisu.jpeg"}
// ];

// LatestRecipe.insertMany(LatestRecipes)
//     .then(() => {
//         console.log('Data inserted');
//         mongoose.connection.close();
//     })
//     .catch(err => console.log(err));

//     const todaySpecialSchema = new mongoose.Schema({
//         image: String,
//         name: String,
//         creator: String,
//         profilePhoto: String,
        
        
//     });
    
//     const todaySpecial = mongoose.model('todaySpecials', todaySpecialSchema);
    
//     const todaySpecials = [
//         { image: '/images/Dairy-Free Mac and Cheese.jpeg', name: 'Dairy-Free Cheese', creator: 'Malshika', profilePhoto: '/images/1.jfif'},
//         { image: '/images/pizza.png', name: 'Pizza', creator: 'Sajini', profilePhoto: '/images/3.jfif' },
//         { image: '/images/spaghetti.png', name: 'Spaghetti', creator: 'Sajini', profilePhoto: '/images/3.jfif' },
//         { image: '/images/Grilled Veggie Salad.jpeg', name: 'Grilled Veggie Salad', creator: 'Sajini', profilePhoto: '/images/3.jfif' },
// ];
       

    
//     todaySpecial.insertMany(todaySpecials)
//         .then(() => {
//             console.log('Data inserted');
//             mongoose.connection.close();
//         })
//         .catch(err => console.log(err));


//         const mostPopularSchema = new mongoose.Schema({
//                     image: String,
//                     name: String,
//                     creator: String,
//                     profilePhoto: String,
                    
                    
//                 });
        
//         const MostPopular = mongoose.model('MostPopular', mostPopularSchema);
        
//         const MostPopulars = [
//             { image: '/images/falafel.jpg', name: 'falafel', creator: 'Kanchana', profilePhoto: '/images/1.jpg' },
//             { image: '/images/Lactose Free Pancakes.jpeg', name: 'Cheese Balls', creator: ' Sajini', profilePhoto: '/images/3.jfif' },
//             { image: '/images/spaghetti.png', name: 'Spaghetti', creator: 'Leo', profilePhoto: '/images/1.JFIF' },
//             { image: '/images/Lasagna.jpeg', name: 'Pizza', creator: 'Sajini', profilePhoto: '/images/3.jfif' },
//     ];
           
    
        
//         MostPopular.insertMany(MostPopulars)
//             .then(() => {
//                 console.log('Data inserted');
//                 mongoose.connection.close();
//             })
//             .catch(err => console.log(err));

// const IngredientPairsSchema = new mongoose.Schema({


//     ingredient1: String,
//     ingredient2: String,
//     recipe: String
// });

// const IngredientPair = mongoose.model('IngredientPairs', IngredientPairsSchema);

// const IngredientPairs = [
//     { ingredient1:
//         "tomato",
//         ingredient2:
//         "onion",
//         recipe:
//         "Tomato Onion Salad" },
//     { ingredient1:
//             "tomato",
//         ingredient2:
//             "onion",
//         recipe:
//             "Tomato Onion Salad" },
//     {ingredient1:
//             "Beef",
//         ingredient2:
//             "onion",
//         recipe:
//             " Onion Beef Pizza" },
//     {ingredient1:
//             "Fish",
//         ingredient2:
//             "onion",
//         recipe:
//             " Onion Fish Curry" },
//     {ingredient1:
//             "Tomato",
//         ingredient2:
//             "onion",
//         recipe:
//             " Onion Tomato soup" },
//     {ingredient1:
//             "Mutton",
//         ingredient2:
//             "onion",
//         recipe:
//             " Onion Mutton Soup" },
//     {ingredient1:
//             "tomato",
//         ingredient2:
//             "Chicken",
//         recipe:
//             "Tomato Chicken Curry" },

// ];

// IngredientPair.insertMany(IngredientPairs)
//     .then(() => {
//         console.log('Data inserted');
//         mongoose.connection.close();
//     })
//     .catch(err => console.log(err));

// const recentBlogSchema = new mongoose.Schema({
//     image: String,
//     name: String,
//     creator: String,
//     profilePhoto: String,
    
    
// });


// const RecentBlog = mongoose.model('RecentBlogs', recentBlogSchema);

// const RecentBlogs = [
// { image: '/images/Pasta with aubergines.jpeg', name: 'Pasta ', creator: 'Leo', profilePhoto: '/images/1.jpg' },
// { image: '/images/Ramen.jpg', name: 'Ramen', creator: 'Leo', profilePhoto: '/images/1.jpg' },
// { image: '/images/spaghetti.png', name: 'Spaghetti', creator: 'Alice', profilePhoto: '/images/1.JFIF' },
// { image: '/images/pizza.png', name: 'Pizza', creator: 'Alice', profilePhoto: '/images/1.JFIF' },
// ];



// RecentBlog.insertMany(RecentBlogs)
// .then(() => {
// console.log('Data inserted');
// mongoose.connection.close();
// })
// .catch(err => console.log(err));

const recentBlogSchema = new mongoose.Schema({
    image: String,
    name: String,
    creator: String,
    profilePhoto: String,
    
    
});


const RecentBlog = mongoose.model('RecentBlogs', recentBlogSchema);

const RecentBlogs = [
{ image: '/images/Pasta with aubergines.jpeg', name: 'Pasta ', creator: 'Leo', profilePhoto: '/images/1.jpg' },
{ image: '/images/Ramen.jpg', name: 'Ramen', creator: 'Leo', profilePhoto: '/images/1.jpg' },
{ image: '/images/spaghetti.png', name: 'Spaghetti', creator: 'Alice', profilePhoto: '/images/1.JFIF' },
{ image: '/images/pizza.png', name: 'Pizza', creator: 'Alice', profilePhoto: '/images/1.JFIF' },
];



RecentBlog.insertMany(RecentBlogs)
.then(() => {
console.log('Data inserted');
mongoose.connection.close();
})
.catch(err => console.log(err));

