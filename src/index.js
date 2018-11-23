import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
    return (
        <button className="square" onClick={props.onClick} style={props.style}>
            {props.value}
        </button>
    );
}

class Piece {
    constructor(color, symbol) {
        this.color = color;
        this.symbol = symbol; 
    }

    validMove(x, y, _x, _y) {
        if (_x === x-1 || _x === x+1) {
            return y === _y;
        } else if (_y === y-1 || _y === y+1) {
            return x === _x;
        }
        return false;
    }
}

class Rook {
    constructor(color) {
        this.color = color;
        if (this.color === "white") {
            this.symbol = '\u2656';
        } else {
            this.symbol = '\u265C';
        }
    }

    validMove(x, y, _x, _y, board) {
        var i;
        if (x === _x) {
            if (y < _y) {
                for (i = y+1; i < _y; i++) {
                    if (board[i][x] !== null) {
                        return false;
                    }
                } 
            } else if (_y < y) {
                for (i = y-1; i > _y; i--) {
                    if (board[i][x] !== null) {
                        return false;
                    }
                }
            }
            if (board[_y][_x] === null || board[_y][_x].color !== this.color) {
                return true;
            }
        } else if (y === _y) {
            if (x < _x) {
                for (i = x+1; i < _x; i++) {
                    if (board[y][i] !== null) {
                        return false;
                    }
                } 
            } else if (_x < x) {
                for (i = x-1; i > _x; i--) {
                    if (board[y][i] !== null) {
                        return false;
                    }
                }
            }
            if (board[_y][_x] === null || board[_y][_x].color !== this.color) {
                return true;
            }
        }
        return false;

    }
}

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: [
                [new Rook('white'), new Piece('white', 'Z'), null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [new Piece('black', '\u265A'), null, null, null, null, null, null, null],
            ],
            selected: null,
            moves: [],
            turn: "white",
        };
    }

    renderRow(y) {
        return (
            <div className="board-row">
                {this.renderSquare(0, y)}
                {this.renderSquare(1, y)}
                {this.renderSquare(2, y)}
                {this.renderSquare(3, y)}
                {this.renderSquare(4, y)}
                {this.renderSquare(5, y)}
                {this.renderSquare(6, y)}
                {this.renderSquare(7, y)}
            </div>
        );
    }

    renderSquare(x, y) {
        let style = null;
        if ((x % 2 === 0 && y % 2 === 0) || (x % 2 === 1 && y % 2 === 1)) {
            style = { background: 'white', color: 'black' };
        } else {
            style = { background: 'black', color: 'white' };
        }
        if (this.state.selected !== null) {
            if (this.state.selected.x ===x && this.state.selected.y === y) {
                style = { background: 'green' };
            }
            if (this.isAMove(x, y)) {
                style = { background: 'red' };
            }
        }

        let value = null;
        if (this.state.squares[y][x] !== null) {
            value = this.state.squares[y][x].symbol;
        }

        return ( 
            <Square 
                value={value} 
                style={style}
                onClick={() => this.handleClick(x, y)}
            />
        ); 
    }

    selectSquare(x, y) {
        let moves = [];
        if (this.state.squares[y][x] !== null) {
            if (this.state.squares[y][x].color === this.state.turn) {
                for (var i = 0; i < 8; i++) {
                    for (var j = 0; j < 8; j++) {
                        if (this.state.squares[y][x].validMove(x, y, j, i, this.state.squares)) {
                            if (this.state.squares[i][j] === null || this.state.squares[i][j].color !== this.state.squares[y][x].color) {
                                moves.push({x: j, y: i});
                            }
                        }
                    }
                }
            }
        } 
        const selected ={
            x: x,
            y: y
        };
        this.setState({selected, moves});
    }

    handleClick(x, y) {
        const board = this.state.squares.slice();
        if (this.isAMove(x, y)) {
            board[y][x] = board[this.state.selected.y][this.state.selected.x];
            board[this.state.selected.y][this.state.selected.x] = null;
            var turn = "white";
            if (this.state.turn === "white") {
                turn = "black";
            }
            this.setState({board, turn}, () => {
                this.selectSquare(x, y);
            });
        } else {
            this.selectSquare(x, y);
        }
    }

    isAMove(x, y) {
        for (var i = 0; i < this.state.moves.length; i++) {
            if (this.state.moves[i].x === x && this.state.moves[i].y === y) {
                return true;
            }
        }
        return false;
    }

    render() {
        console.log(this.state.moves);
        return (
            <div>
                {this.renderRow(0)}
                {this.renderRow(1)}
                {this.renderRow(2)}
                {this.renderRow(3)}
                {this.renderRow(4)}
                {this.renderRow(5)}
                {this.renderRow(6)}
                {this.renderRow(7)}
            </div>
        );
    }
}

class Game extends React.Component {
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);

