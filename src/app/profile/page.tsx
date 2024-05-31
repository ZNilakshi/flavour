"use client"; 
import React from 'react';
import styles from './profile.module.css';
import { useRouter } from 'next/navigation';

const Profile = ({ currentPage }) => {
  const router = useRouter();

  const handleAddChefClick = () => {
    router.push('/create-chef-profile');
  };

  const handleSettingsClick = () => {
    router.push('/settings');
  };
  const handleMadeByYouClick = () => {
    router.push('/MadeByYou');
  };

  const handleSavedByYouClick = () => {
    router.push('/saved-by-you');
  };

  const handleShoppingListClick = () => {
    router.push('/shopping-list');
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      padding: '50px',
    }}>
      <div style={{
        flex: 0.1,
        marginRight: '35px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'gray',
        borderRadius: '30px',
        padding: '20px',
      }}>
        <img
          src="/images/user.png" // Replace with actual photo URL
          alt="Profile"
          style={{
            width: '55px',
            height: '55px',
            marginBottom: '10px',
            borderRadius: '10px',
            objectFit: 'cover',
          }}
          onClick={() => {}}
        />
        <img
          src="/images/add.png" // Replace with actual photo URL
          alt="Chef"
          onClick={handleAddChefClick}
          style={{
            width: '55px',
            height: '55px',
            marginBottom: '10px',
            borderRadius: '10px',
            objectFit: 'cover',
            cursor: 'pointer',
          }}
        />
        <img
          src="/images/setting.png" // Replace with actual photo URL
          alt="Settings"
          onClick={handleSettingsClick}
          style={{
            width: '55px',
            height: '55px',
            borderRadius: '10px',
            objectFit: 'cover',
            cursor: 'pointer',
          }}
        />
      </div>
      <div style={{
        flex: 1.5,
        display: 'flex',
        justifyContent: 'space-between',
        gap: '10px',
      }}>
        <div style={{
          width: '30%',
          position: 'relative',
          textAlign: 'center',
          color: 'white',
          borderRadius: '30px',
          overflow: 'hidden',
        }}>
          <img
            src="/images/log.jpg"
            alt="Made by You"
            onClick={handleMadeByYouClick}
            style={{
              width: '300px',
              height: '190px',
              borderRadius: '30px',
              objectFit: 'cover',
              cursor: 'pointer',
              filter: 'blur(2px)',
            }}
           
          />
          <div style={{
            position: 'absolute',
            top: '10px',
            left: '50%',
            transform: 'translateX(-50%)',
            padding: '52px',
            borderRadius: '5px',
            cursor: 'pointer',
           
          }}>
            <p
            onClick={handleMadeByYouClick}
             >Made by You</p>
          </div>
        </div>
        <div style={{
          width: '30%',
          position: 'relative',
          textAlign: 'center',
          color: 'white',
          borderRadius: '30px',
          overflow: 'hidden',
          cursor: 'pointer',
         
        }}>
          <img
            src="/images/log.jpg"
            alt="Saved by You"
            onClick={handleSavedByYouClick}
            style={{
              width: '300px',
              height: '190px',
              borderRadius: '30px',
              objectFit: 'cover',
              filter: 'blur(2px)',
              cursor: 'pointer',
            }}
           
          />
          <div style={{
            position: 'absolute',
            top: '10px',
            left: '50%',
            transform: 'translateX(-50%)',
            padding: '52px',
            borderRadius: '5px',
            cursor: 'pointer',
          }}>
            <p>Saved by You</p>
          </div>
        </div>
        <div style={{
          width: '30%',
          position: 'relative',
          textAlign: 'center',
          color: 'white',
          borderRadius: '30px',
          overflow: 'hidden',
          cursor: 'pointer',
        }}>
          <img
            src="/images/log.jpg"
            alt="Shopping List"
            onClick={handleShoppingListClick}
            style={{
              width: '300px',
              height: '190px',
              borderRadius: '30px',
              objectFit: 'cover',
              filter: 'blur(2px)',
              cursor: 'pointer',
              
            }}
            
          />
          <div style={{
            position: 'absolute',
            top: '10px',
            left: '50%',
            transform: 'translateX(-50%)',
            padding: '52px',
            borderRadius: '5px',
            cursor: 'pointer',
          }}>
            <p>Shopping List</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
