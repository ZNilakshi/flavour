"use client";
import React from 'react';
import './ChefPage.css';

interface Recipe {
  name: string;
  image: string;
  comments: number;
  likes: number;
  stars: number;
}

interface Chef {
  name: string;
  bio: string;
  image: string;
  recipes: Recipe[];
}

const ChefProfile: React.FC<Chef> = ({ name, bio, image, recipes }) => {
  return (
    <div className="chef-card">
      <div className="chef-info">
        <img src={image} alt={name} className="chef-image" />
        <div className="chef-details">
          <h3>{name}</h3>
          <p>{bio}</p>
          <button className="follow-btn">FOLLOW</button>
        </div>
      </div>
      <div className="recipes">
        {recipes.map((recipe, index) => (
          <div key={index} className="recipe">
            <img src={recipe.image} alt={recipe.name} className="recipe-image" />
            <div className="recipe-details">
              <h4>{recipe.name}</h4>
              <div className="recipe-stats">
                <span>💬 {recipe.comments}</span>
                <span>👍 {recipe.likes}</span>
                <span>⭐ {recipe.stars}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button className="view-all-recipes-btn">View All Recipes</button>
    </div>
  );
};

const chefs: Chef[] = [
  {
    name: 'Rio Salman',
    bio: 'Winner of Master Chef Season 2, consultant and author, culinary connoisseur for Tourism Australia.',
    image: 'images/profile.png',
    recipes: [
      { name: '', image: 'images/spaghetti.jpg', comments: 5, likes: 3, stars: 2 },
      { name: '', image: 'images/pizza.jpeg', comments: 0, likes: 50, stars: 3 },
    ],
  },
  {
    name: 'Lina McAdams',
    bio: 'Renowned pastry chef and author, known for her exquisite desserts and pastries.',
    image: 'images/profile.png',
    recipes: [
      { name: '', image: 'images/Chocolate Cake.jpg', comments: 8, likes: 60, stars: 5 },
      { name: '', image: 'images/Strawberry Tart.jpeg', comments: 4, likes: 35, stars: 4 },
    ],
  },
  {
    name: 'Marco Rossi',
    bio: 'Italian chef famous for his traditional Italian recipes and culinary expertise.',
    image: 'images/profile.png',
    recipes: [
      { name: '', image: 'images/Lasagna.jpeg', comments: 10, likes: 70, stars: 5 },
      { name: '', image: 'images/Risotto.jpg', comments: 6, likes: 40, stars: 4 },
    ],
  },
  {
    name: 'Sophie Martin',
    bio: 'French chef specializing in contemporary French cuisine and innovative cooking techniques.',
    image: 'images/profile.png',
    recipes: [
      { name: '', image: 'images/Ratatouille.jpg', comments: 2, likes: 25, stars: 3 },
      { name: '', image: 'images/Crepes.jpg', comments: 3, likes: 30, stars: 4 },
    ],
  },
  {
    name: 'John Doe',
    bio: 'Award-winning chef known for his fusion cuisine and creative approach to traditional dishes.',
    image: 'images/profile.png',
    recipes: [
      { name: '', image: 'images/sushi.jpeg', comments: 12, likes: 80, stars: 5 },
      { name: '', image: 'images/Ramen.jpg', comments: 5, likes: 45, stars: 4 },
    ],
  },
  {
    name: 'Anna Smith',
    bio: 'Vegan chef and food activist, famous for her delicious and innovative plant-based recipes.',
    image: 'images/profile.png',
    recipes: [
      { name: '', image: 'images/Veggie Burger.jpeg', comments: 15, likes: 90, stars: 5 },
      { name: '', image: 'images/Quinoa Salad.jpg', comments: 4, likes: 40, stars: 4 },
    ],
  },
];

const ChefPage: React.FC = () => {
  return (
    <div className="chef-page">
      <h2>The Chefs</h2>
      <div className="chef-list">
        {chefs.map((chef, index) => (
          <ChefProfile key={index} {...chef} />
        ))}
      </div>
    </div>
  );
};

export default ChefPage;
