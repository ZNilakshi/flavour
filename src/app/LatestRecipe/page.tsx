"use client";
import React from 'react';
import './LatestRecipe.css';

interface Recipe {
  category: string;
  title: string;
  description: string;
  time: string;
  rating: number;
  image: string;
}

const recipes: Recipe[] = [
  {
    category: 'APPETIZERS',
    title: 'Breaded chicken breast in breadsticks',
    description: 'Breaded chicken breast in breadsticks is a super crunchy version of the classic nuggets, excellent to accompany with a fresh yogurt sauce!',
    time: '50 min',
    rating: 5.0,
    image: '/images/Breaded chicken breast in breadsticks.jpeg'
  },
  {
    category: 'SWEETS',
    title: 'Eclair cream and chocolate',
    description: 'The cream and chocolate eclairs are choux pasta sweets stuffed with custard and glazed with white or dark chocolate.',
    time: '1h 40min',
    rating: 4.3,
    image: '/images/Eclair cream and chocolate.jpeg'
  },
  {
    category: 'FIRST COURSES',
    title: 'Strawberry with clams and bottarga',
    description: 'The fregola with clams and bottarga is a first course that celebrates Sardinian cuisine and that combines simplicity and refinement. Discover doses and procedure!',
    time: '45 min',
    rating: 4.8,
    image: '/images/Strawberry with clams and bottarga.jpeg'
  },
  {
    category: 'MAIN COURSES',
    title: 'Grilled Salmon with Avocado Salsa',
    description: 'A healthy and delicious main course featuring grilled salmon topped with a fresh avocado salsa.',
    time: '30 min',
    rating: 4.9,
    image: '/images/Grilled Salmon with Avocado Salsa.jpg'
  },
  {
    category: 'SALADS',
    title: 'Greek Salad',
    description: 'A refreshing salad made with cucumbers, tomatoes, olives, and feta cheese, dressed with olive oil and oregano.',
    time: '15 min',
    rating: 4.7,
    image: '/images/Greek Salad.jpeg'
  },
  {
    category: 'DESSERTS',
    title: 'Tiramisu',
    description: 'A classic Italian dessert made with layers of coffee-soaked ladyfingers, mascarpone cheese, and cocoa powder.',
    time: '1h 20min',
    rating: 4.8,
    image: '/images/Tiramisu.jpeg'
  }
];

const App: React.FC = () => {
  return (
    <div className="app">
      <header className="header">
        <h1>Latest Recipes</h1>
      </header>
      <main>
        <div className="recipes">
          {recipes.map((recipe, index) => (
            <div key={index} className="recipe-card">
              <img src={recipe.image} alt={recipe.title} />
              <div className="recipe-info">
                <span className="category">{recipe.category}</span>
                <h3>{recipe.title}</h3>
                <p>{recipe.description}</p>
                <div className="recipe-details">
                  <span className="time">{recipe.time}</span>
                  <span className="rating">{recipe.rating} ⭐</span>
                </div>
                <a href="#" className="read-recipe">READ RECIPE</a>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default App;
