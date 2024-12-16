"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import ChatBox from '../component/chat'; // Adjust the path if needed
import Section from '../component/Section';

const todaySpecials = [
  { image: '/images/pizza.png', name: 'Carbonara', rating: 4.5 },
  { image: '/images/pizza.png', name: 'Cheese Balls', rating: 4.0 },
  { image: '/images/spaghetti.png', name: 'Spaghetti', rating: 4.2 },
  { image: '/images/pizza.png', name: 'Pizza', rating: 4.8 },
];

const recommended = [
  { image: '/images/pizza.png', name: 'Carbonara', rating: 4.5 },
  { image: '/images/pizza.png', name: 'Cheese Balls', rating: 4.0 },
  { image: '/images/spaghetti.png', name: 'Spaghetti', rating: 4.2 },
  { image: '/images/pizza.png', name: 'Pizza', rating: 4.8 },
];

const mostPopular = [
  { image: '/images/pizza.png', name: 'Carbonara', rating: 4.5 },
  { image: '/images/pizza.png', name: 'Cheese Balls', rating: 4.0 },
  { image: '/images/spaghetti.png', name: 'Spaghetti', rating: 4.2 },
  { image: '/images/pizza.png', name: 'Pizza', rating: 4.8 },
];

const blogs = [
  { image: '/images/pizza.png', name: 'Carbonara', rating: 4.5 },
  { image: '/images/pizza.png', name: 'Cheese Balls', rating: 4.0 },
  { image: '/images/spaghetti.png', name: 'Spaghetti', rating: 4.2 },
  { image: '/images/pizza.png', name: 'Pizza', rating: 4.8 },
];

const chefs = [
  { image: '/images/pizza.png', name: 'Carbonara', rating: 4.5 },
  { image: '/images/pizza.png', name: 'Cheese Balls', rating: 4.0 },
  { image: '/images/spaghetti.png', name: 'Spaghetti', rating: 4.2 },
  { image: '/images/pizza.png', name: 'Pizza', rating: 4.8 },
];

const recipes = [...todaySpecials, ...recommended, ...mostPopular];

export default function Home() {
  const [showChat, setShowChat] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const toggleChatBox = () => {
    setShowChat(!showChat);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 3) % recipes.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-0 m-0">
      <div className="slide-container" style={{ width: '100%', overflow: 'hidden', padding: '0', margin: '0' }}>
        <div
          style={{
            display: 'flex',
            transition: 'transform 1s ease',
            transform: `translateX(-${(currentIndex / recipes.length) * 100}%)`,
          }}
        >
          {recipes.map((recipe, index) => (
            <div
              className="each-slide"
              key={index}
              style={{ minWidth: '45.33%', position: 'relative', boxSizing: 'border-box', margin: '0', padding: '0', borderRadius: '10px', }}
            >
              <img
                src={recipe.image}
                alt={recipe.name}
                style={{
                  width: '100%',
                  height: 'auto',
                  objectFit: 'cover',
                  margin: '0',
                  padding: '0',
                  borderRadius: '10px',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: '10px',
                  left: '10px',
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  color: 'white',
                  padding: '5px 10px',
                  borderRadius: '5px',
                }}
              >
                <h3>{recipe.name}</h3>
                <p>Rating: {recipe.rating} ⭐</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={toggleChatBox}
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '10px 20px',
          backgroundColor: '#FF6B6B',
          color: 'white',
          borderRadius: '11px',
          border: 'none',
          cursor: 'pointer',
          marginBottom: '1rem',
          marginTop: '1rem',
        }}
      >
        <img src="/path/to/chat-icon.png" alt="Chat Icon" style={{ width: '24px', height: '24px', marginRight: '10px' }} />
        {showChat ? 'Hide ChatBox' : 'Combine Multiple ingredients to get new ideas.'}
      </button>
      {showChat && <ChatBox />}
      <Section title="Today Specials" recipes={todaySpecials} highlightTitle centerTitle />
       <Section title="Most Popular" recipes={mostPopular} highlightTitle centerTitle />
      <Section title="Recent Blogs" recipes={blogs} highlightTitle centerTitle />
      <Section title="Chef's Recipes" recipes={chefs} highlightTitle centerTitle />
      
    </main>
  );
}


