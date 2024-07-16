"use client"; 
import React, { useState, useRef } from 'react';
import './ProfileEdit.css';

const Profile: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [title, setTitle] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('Type your BIOGRAPHY...');
  const [profileImage, setProfileImage] = useState('https://via.placeholder.com/150'); 
  const fileInputRef = useRef<HTMLInputElement>(null); 

  const handleSave = () => {
    console.log({ firstName, lastName, title, email, bio });
  };
  const handleCancel = () => {
    console.log({ firstName, lastName, title, email, bio });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target && event.target.result) {
          setProfileImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleDeleteImage = () => {
    setProfileImage('https://via.placeholder.com/150'); 
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; 
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-sidebar">
        <img src={profileImage} alt=" " className="profile-avatar" />
        <h2>{`${firstName} ${lastName}`}</h2>
        <p>{title}</p>
        <input 
          type="file" 
          accept="image/*" 
          onChange={handleImageChange} 
          className="btn-upload"
          ref={fileInputRef} // Attach the ref to the file input
        />
        <button className="btn" onClick={handleDeleteImage}>Delete</button>
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
            <strong> Title: </strong>
            <input 
              type="text" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              placeholder="Enter your title..." 
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
        </div>
        <div className="about-me">
          <h3><strong> About Me </strong></h3>
          <textarea 
            value={bio} 
            onChange={(e) => setBio(e.target.value)} 
            placeholder="Type your BIOGRAPHY..."
          />
        </div>
        <button className="btn" onClick={handleSave}>Save</button>
        <button className="btn" onClick={handleCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default Profile;
