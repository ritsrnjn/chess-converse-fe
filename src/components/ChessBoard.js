// ChessBoard.js
import React from 'react';
// import axios from 'axios';
import Chessboard from 'chessboardjsx';
import { Chess } from 'chess.js';
import './ChessBoard.css';

class ChessBoard extends React.Component {
    constructor(props) {
        super(props);

        this.chess = new Chess();
        this.state = {
            fen: 'start',
            error: null
        };
    }

    // Function to handle a move
    handleMove = async ({ sourceSquare, targetSquare }) => {
        try {
            // Make a move
            let move = this.chess.move({
                from: sourceSquare,
                to: targetSquare,
                promotion: 'q', // Always promote to a queen for simplicity
            });

            // If invalid move, don't update state
            if (move === null) return;

            // Update the board
            this.setState({ fen: this.chess.fen() }, () => {
                this.props.sendMessage(`Move made. New position: ${this.state.fen}`);
            });

            // wait for 1 second before making the move
            await new Promise((resolve) => setTimeout(resolve, 1000));

            // Call the move API
            // const responseMove = await axios.post(`https://yourapi.com/game-id/move`, { move });
            // Mocked API response
            const responseMove = {
                data: {
                    success: true,
                    move: {
                        from: 'a7',
                        to: 'a6',
                    },
                },
            };

            // randomly update the move is a random number is even
            if (Math.floor(Math.random() * 10) % 2 === 0) {
                responseMove.data.move = {
                    from: 'b7',
                    to: 'b6',
                };
            }

            // If the move is successful, update the board
            if (responseMove.data.success) {
                let opponentMove = this.chess.move(responseMove.data.move);

                if (opponentMove === null) {
                    this.setState({ error: "Invalid move from server" });
                    return;
                }

                this.setState({ fen: this.chess.fen() }, () => {
                    this.props.sendMessage(`Move made. New position: ${this.state.fen}`);
                });

            } else {
                this.setState({ error: "Move failed." });
            }
        } catch (error) {
            this.setState({ error: error.toString() });
        }
    };

    render() {
        const { error } = this.state;
        return (
            <div className="chessboard-container">
                <div className="header">
                    <h1 className="title">ChessMaster 2023</h1>
                    {error && <div className="error">{error}</div>}
                </div>
                <Chessboard
                    // width={500} 
                    width={window.innerWidth * 0.3}
                    position={this.state.fen}
                    onDrop={(move) =>
                        this.handleMove({
                            sourceSquare: move.sourceSquare,
                            targetSquare: move.targetSquare,
                        })
                    }
                />
            </div>
        );
    }
}

export default ChessBoard;
