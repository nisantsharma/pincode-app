import React from 'react';
import './Card.css'; // Optional: For styling the card component

const Card = ({ postOffice }) => {
  return (
    <div className="card">
      <h3>{postOffice.Name}</h3>
      <p><strong>Pincode:</strong> {postOffice.Pincode}</p>
      <p><strong>District:</strong> {postOffice.District}</p>
      <p><strong>State:</strong> {postOffice.State}</p>
    </div>
  );
};

export default Card;
