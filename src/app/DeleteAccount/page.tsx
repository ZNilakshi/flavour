"use client"; 
import React, { useState } from 'react';
import './Delete.css';

const DeleteAccount: React.FC = () => {
  const [confirmed, setConfirmed] = useState(false);

  const handleDelete = () => {
    console.log('Account deleted!');
  };

  const handleConfirmation = () => {
    setConfirmed(true);
  };

  const handleCancel = () => {
    setConfirmed(false);
  };

  return (
    <div className="delete-account-container">
      <div className="confirmation-box">
        {!confirmed ? (
          <div className="confirmation">
            <h2><strong>Delete Account</strong></h2>
            <p>Are you sure you want to delete your account?</p>
            <div className="button-group">
              <button className="confirm-button" onClick={handleConfirmation}>Yes</button>
              <a href="/profile"><button className="no-button" onClick={handleCancel}>No</button></a>
            </div>
          </div>
        ) : (
          <div className="confirmation-modal">
            <div className="modal-content">
              <h2><strong>Delete Confirmation!</strong></h2>
              <p>Are you absolutely sure? This action cannot be undone.</p>
              <div className="button-group">
                <button className="delete-button" onClick={handleDelete}>Delete Account</button>
                <button className="cancel-button" onClick={handleCancel}>Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeleteAccount;
