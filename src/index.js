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

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: [
                ['X', null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
            ],
            selected: null,
            moves: [],
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
            style = { background: 'blue' };
        } else {
            style = { background: 'yellow' };
        }
        if (this.state.selected !== null) {
            if (this.state.selected.x ===x && this.state.selected.y === y) {
                style = { background: 'green' };
            }
            if (this.isAMove(x, y)) {
                style = { background: 'red' };
            }
        }

        return ( 
            <Square 
                value={this.state.squares[y][x]} 
                style={style}
                onClick={() => this.handleClick(x, y)}
            />
        ); 
    }

    selectSquare(x, y) {
        this.setState({
            selected: {
                x: x,
                y: y
            }
        });
        if (this.state.squares[y][x] !== null) {
            const moves = [
                {
                    x: x - 1,
                    y: y,
                },
                {
                    x: x + 1,
                    y: y,
                },
                {
                    x: x,
                    y: y-1,
                },
                {
                    x: x,
                    y: y+1,
                },
            ];
            this.setState({moves});
        } else {
            this.setState({moves: []});
        }
    }

    handleClick(x, y) {
        const board = this.state.squares.slice();
        if (this.isAMove(x, y)) {
            board[y][x] = board[this.state.selected.y][this.state.selected.x];
            board[this.state.selected.y][this.state.selected.x] = null;
            this.setState({board});
            this.selectSquare(x, y);
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

