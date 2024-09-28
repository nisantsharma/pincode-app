
import React, { useState } from 'react';
import Card from './Cards';
import './App.css';

function App() {
  const [pincode, setPincode] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handlePincodeChange = (e) => {
    setPincode(e.target.value);
  };

  const fetchPincodeDetails = async () => {
    if (pincode.length !== 6 || isNaN(pincode)) {
      setError('Please enter a valid 6-digit pincode');
      setData(null);
      return;
    }

    setLoading(true);
    setError('');
    try {
      const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
      const result = await response.json();

      if (result[0].Status === 'Success') {
        setData(result[0].PostOffice);
      } else {
        setError('No data found for this pincode');
        setData(null);
      }
    } catch (err) {
      setError('Error fetching data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchPincodeDetails();
  };

  return (
    <div className="App">
      <h1>Pincode Lookup</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={pincode}
          onChange={handlePincodeChange}
          placeholder="Enter 6-digit pincode"
        />
        <button type="submit">Lookup</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div className="cards-container">
        {data && data.map((postOffice, index) => (
          <Card key={index} postOffice={postOffice} />
        ))}
      </div>
    </div>
  );
}

export default App;

