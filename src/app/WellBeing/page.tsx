import React from 'react';
import './WellBeing.css'; 

interface Recipe {
  title: string;
  category: string;
  image: string;
  comments: number;
  rating: number;
}

const recipes: Recipe[] = [
  {
    title: 'Pasta and courgettes',
    category: 'Light',
    image: 'images/Pasta and courgettes.jpg',
    comments: 138,
    rating: 4.2
  },
  {
    title: 'Fryers in a pan',
    category: 'Light',
    image: 'images/Fryers in a pan.png',
    comments: 29,
    rating: 4.1
  },
  {
    title: 'Pasta with aubergines',
    category: 'Light',
    image: 'images/Pasta with aubergines.jpeg',
    comments: 150,
    rating: 4.3
  },
  {
    title: 'Vegetable couscous',
    category: 'Light',
    image: 'images/Vegetable couscous.jpeg',
    comments: 340,
    rating: 4.0,
  },
  {
    title: 'Zucchini Noodles',
    category: 'Light',
    image: 'images/Zucchini Noodles.jpeg',
    comments: 98,
    rating: 4.5
  },
  {
    title: 'Grilled Veggie Salad',
    category: 'Light',
    image: 'images/Grilled Veggie Salad.jpeg',
    comments: 67,
    rating: 4.4
  },
  
  {
    title: 'Quinoa Salad',
    category: 'Gluten Free',
    image: 'images/Quinoa Salad.jpg',
    comments: 200,
    rating: 4.5
  },
  {
    title: 'Grilled Chicken',
    category: 'Gluten Free',
    image: 'images/Grilled Chicken.jpg',
    comments: 150,
    rating: 4.4
  },
  {
    title: 'Baked Salmon',
    category: 'Gluten Free',
    image: 'images/Baked Salmon.jpg',
    comments: 175,
    rating: 4.7
  },
  {
    title: 'Stuffed Bell Peppers',
    category: 'Gluten Free',
    image: 'images/Stuffed Bell Peppers.jpg',
    comments: 89,
    rating: 4.3
  },
  {
    title: 'Cauliflower Rice',
    category: 'Gluten Free',
    image: 'images/Cauliflower Rice.jpg',
    comments: 120,
    rating: 4.2
  },
  {
    title: 'Sweet Potato Fries',
    category: 'Gluten Free',
    image: 'images/Sweet Potato Fries.jpg',
    comments: 140,
    rating: 4.5
  },
  
  {
    title: 'Lactose Free Smoothie',
    category: 'Lactose Free',
    image: 'images/Lactose Free Smoothie.jpg',
    comments: 90,
    rating: 4.3
  },
  {
    title: 'Lactose Free Pancakes',
    category: 'Lactose Free',
    image: 'images/Lactose Free Pancakes.jpeg',
    comments: 130,
    rating: 4.2
  },
  {
    title: 'Coconut Yogurt Parfait',
    category: 'Lactose Free',
    image: 'images/Coconut Yogurt Parfait.jpeg',
    comments: 80,
    rating: 4.1
  },
  {
    title: 'Almond Milk Latte',
    category: 'Lactose Free',
    image: 'images/Almond Milk Latte.jpg',
    comments: 110,
    rating: 4.4
  },
  {
    title: 'Dairy-Free Mac and Cheese',
    category: 'Lactose Free',
    image: 'images/Dairy-Free Mac and Cheese.jpeg',
    comments: 160,
    rating: 4.5
  },
  {
    title: 'Tofu Stir Fry',
    category: 'Lactose Free',
    image: 'images/Tofu Stir Fry.jpeg',
    comments: 140,
    rating: 4.6
  },
 
  {
    title: 'Vegetarian Pizza',
    category: 'Vegetarian',
    image: 'images/Vegetarian Pizza.jpg',
    comments: 250,
    rating: 4.6
  },
  {
    title: 'Stuffed Peppers',
    category: 'Vegetarian',
    image: 'images/Stuffed Peppers.jpg',
    comments: 175,
    rating: 4.4
  },
  {
    title: 'Veggie Burger',
    category: 'Vegetarian',
    image: 'images/Veggie Burger.jpeg',
    comments: 210,
    rating: 4.7
  },
  {
    title: 'Vegetarian Lasagna',
    category: 'Vegetarian',
    image: 'images/Vegetarian Lasagna.jpeg',
    comments: 195,
    rating: 4.6
  },
  {
    title: 'Chickpea Curry',
    category: 'Vegetarian',
    image: 'images/Chickpea Curry.jpg',
    comments: 180,
    rating: 4.5
  },
  {
    title: 'Caprese Salad',
    category: 'Vegetarian',
    image: 'images/Caprese Salad.jpg',
    comments: 160,
    rating: 4.4
  },
];

const RecipesPage: React.FC = () => {
  return (
    <div className="recipes-page">
      <CategorySection title="Light" recipes={recipes.filter(r => r.category === 'Light')} />
      <CategorySection title="Gluten Free" recipes={recipes.filter(r => r.category === 'Gluten Free')} />
      <CategorySection title="Lactose Free" recipes={recipes.filter(r => r.category === 'Lactose Free')} />
      <CategorySection title="Vegetarian" recipes={recipes.filter(r => r.category === 'Vegetarian')} />
    </div>
  );
};

interface CategorySectionProps {
  title: string;
  recipes: Recipe[];
}

const CategorySection: React.FC<CategorySectionProps> = ({ title, recipes }) => {
  return (
    <div className="category-section">
      <h2>{title}</h2>
      <div className="recipe-cards">
        {recipes.map((recipe, index) => (
          <RecipeCard key={index} recipe={recipe} />
        ))}
      </div>
    </div>
  );
};

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  return (
    <div className="recipe-card">
      <img src={recipe.image} alt={recipe.title} />
      <div className="recipe-details">
        <span className="category-label">{recipe.category}</span>
        <h3>{recipe.title}</h3>
        <div className="recipe-stats">
          <span className="comments">{recipe.comments} comments</span>
          <span className="rating">{recipe.rating} ★</span>
        </div>
      </div>
    </div>
  );
};

export default RecipesPage;
