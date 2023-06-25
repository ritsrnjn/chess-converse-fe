// GamePage.js
import React from 'react';
import ChessBoard from '../components/ChessBoard';
import ChatRoom from '../components/ChatRoom';
import './GamePage.css';

class GamePage extends React.Component {

    chatRef = React.createRef();

    sendMessage = (message) => {
        this.chatRef.current.sendMessage(message);
    }
  render() {
    return (
      <div className="game-page">
        <div className="chess-section">
            <ChessBoard sendMessage={this.sendMessage} />
        </div>
        <div className="chat-section">
            <ChatRoom ref={this.chatRef} />
        </div>
      </div>
    );
  }
}

export default GamePage;
