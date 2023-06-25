import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  async function startNewGame() {
    try {
      const simulatedResponse = { data: { gameId: 'sample-game-id' } };
      navigate(`/game/${simulatedResponse.data.gameId}`);
    } catch (error) {
      console.error('Failed to start new game', error);
      setErrorMessage('There was a problem starting a new game. Please try again.');
    }
  }

  return (
    <div className="home-page-container">
      <h1 className="title">ChessConverse: Your Digital Chess Companion</h1>
      <p className="description">
        ChessConverse is a unique platform that blends the intricate world of chess with real-time conversation. 
        Play your moves, chat about your strategies, and learn from an AI, all in one place. 
        Whether you're a seasoned chess enthusiast or a curious beginner, ChessConverse offers a fun and interactive 
        experience to enhance your chess skills. Let the game begin!
      </p>
      <button className="play-button" onClick={startNewGame}>PLAY NOW</button>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}

export default HomePage;
