// src/app/component/pages/MadeByYou.js
'use client';
import { useState } from 'react';
import axios from 'axios';
import styles from './MadeByYou.module.css';

const MadeByYou = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [video, setVideo] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [recipes, setRecipes] = useState([]);

  const handleFileChange = (e, setter) => {
    if (e.target.files) {
      setter(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    if (video) formData.append('video', video);
    if (photo) formData.append('photo', photo);

    try {
      const response = await axios.post('/api/uploadRecipe', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setRecipes([...recipes, response.data]);
      setTitle('');
      setContent('');
      setVideo(null);
      setPhoto(null);
    } catch (error) {
      console.error('Error uploading recipe:', error);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Made by You</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <input
          type="file"
          accept="video/*"
          onChange={(e) => handleFileChange(e, setVideo)}
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleFileChange(e, setPhoto)}
          required
        />
        <button type="submit">Upload Recipe</button>
      </form>
      <div className={styles.recipes}>
        <h2>Your Recipes</h2>
        {recipes.map((recipe, index) => (
          <div key={index} className={styles.recipe}>
            <h3>{recipe.title}</h3>
            <p>{recipe.content}</p>
            {recipe.video && <video src={recipe.video} controls className={styles.video} />}
            {recipe.photo && <img src={recipe.photo} alt="Recipe Photo" className={styles.photo} />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MadeByYou;
