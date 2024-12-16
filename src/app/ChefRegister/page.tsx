"use client";
import React, { useState } from 'react';
import './ChefRegister.css';

const Profile: React.FC = () => {
  const defaultAvatar = 'https://via.placeholder.com/100'; 
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [Gender, setGender] = useState('');
  const [Country, setCountry] = useState('');
  const [email, setEmail] = useState('');
  const [Language, setLanguage] = useState('');
  const [Expertise, setExpertise] = useState('');
  const [bio, setBio] = useState('Type your BIOGRAPHY...');
  const [avatar, setAvatar] = useState(defaultAvatar); 

  const handleSave = () => {
    console.log({ firstName, lastName, Gender, Country, Language, Expertise, email, bio, avatar });
  };

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteAvatar = () => {
    setAvatar(defaultAvatar);
  };

  return (
    <div className="profile-container">
      <div className="profile-sidebar">
        <img src={avatar} alt="Profile Avatar" className="profile-avatar" />
        <h2>{`${firstName} ${lastName}`}</h2>
        <input 
          type="file" 
          id="avatar-upload" 
          style={{ display: 'none' }} 
          onChange={handleAvatarChange} 
        />
        <button 
          className="btn" 
          onClick={() => document.getElementById('avatar-upload')?.click()}
        >
          Upload Your Image
        </button>
        <button className="btn" onClick={handleDeleteAvatar}>Delete</button>
        <div className="bio">
          <p>{bio}</p>
        </div>
      </div>
      <div className="profile-main">
        <div className="basic-info">
          <h3> <strong> Basic Info </strong> </h3>
          <label>
            <strong> First Name: </strong>
            <input 
              type="text" 
              value={firstName} 
              onChange={(e) => setFirstName(e.target.value)} 
              placeholder="Enter your first name..." 
            />
          </label>
          <label>
            <strong> Last Name: </strong>
            <input 
              type="text" 
              value={lastName} 
              onChange={(e) => setLastName(e.target.value)} 
              placeholder="Enter your last name..." 
            />
          </label>
          <label>
            <strong> Gender: </strong>
            <input 
              type="text" 
              value={Gender} 
              onChange={(e) => setGender(e.target.value)} 
              placeholder=" " 
            />
          </label>
          <label>
            <strong> Country: </strong>
            <input 
              type="text" 
              value={Country} 
              onChange={(e) => setCountry(e.target.value)} 
              placeholder="Enter your country name... " 
            />
          </label>
          <label>
           <strong>  Email: </strong>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="Enter your email..." 
            />
          </label>
          <label>
            <strong> Languages: </strong>
            <input 
              type="text" 
              value={Language} 
              onChange={(e) => setLanguage(e.target.value)} 
              placeholder=" " 
            />
          </label>
          <label>
            <strong> Expertise: </strong>
            <input 
              type="text" 
              value={Expertise} 
              onChange={(e) => setExpertise(e.target.value)} 
              placeholder=" " 
            />
          </label>
        </div>
        <div className="about-me">
          <h3><strong> About Me </strong></h3>
          <textarea 
            value={bio} 
            onChange={(e) => setBio(e.target.value)} 
            placeholder="Type your BIOGRAPHY..."
          />
        </div>
        <button className="btn" onClick={handleSave}> Save </button>
      </div>
    </div>
  );
};

export default Profile;
