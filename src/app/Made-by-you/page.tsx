"use client";
import React, { useState } from 'react';
import './MadeByYou.css';

interface Recipe {
  title: string;
  description: string;
  category: string;
  videoUrl: string;
  imageUrl: string;
}

const RecipeForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [submittedRecipe, setSubmittedRecipe] = useState<Recipe | null>(null);

  const categories = ['SWEETS', 'APPETIZERS', 'FIRST COURSES', 'MAIN COURSES', 'SALADS', 'DESSERTS'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const recipe: Recipe = { title, description, category, videoUrl, imageUrl };
    setSubmittedRecipe(recipe);
    setTitle('');
    setDescription('');
    setCategory('');
    setVideoUrl('');
    setImageUrl('');
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="recipe-form-container">
      <form className="recipe-form" onSubmit={handleSubmit}>
        <h2><strong>Share Your Recipe</strong></h2>
        <label>
          Title:
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter recipe title" />
        </label>
        <label>
          Category:
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value=""> </option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </label>
        <label>
          Description:
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter recipe description" />
        </label>
        <label>
          Video URL:
          <input type="text" value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} placeholder="Enter video URL" />
        </label>
        <label>
          Recipe Photo:
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </label>
        <div className="button-container">
          <button className="btn" type="submit">Submit</button>
          <button className="btn" type="reset" onClick={() => {
            setTitle('');
            setDescription('');
            setCategory('');
            setVideoUrl('');
            setImageUrl('');
          }}>Reset</button>
        </div>
      </form>
      {submittedRecipe && (
        <div className="submitted-recipe">
          <h3>{submittedRecipe.title}</h3>
          <p>{submittedRecipe.description}</p>
          {submittedRecipe.imageUrl && <img src={submittedRecipe.imageUrl} alt="Recipe" className="submitted-image" />}
          <video controls src={submittedRecipe.videoUrl} />
        </div>
      )}
    </div>
  );
};

export default RecipeForm;
