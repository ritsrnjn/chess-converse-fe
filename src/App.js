import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import GamePage from './pages/GamePage';  
class App extends React.Component {
    render() {
        return (
            <Router>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/game/:gameId" element={<GamePage />} />  
                </Routes>
            </Router>
        );
    }
}

export default App;
