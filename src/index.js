import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
    return (
        <button className="square" style={props.style}>
            {props.value}
        </button>
    );
}

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: [
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
            ],
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

        return ( 
            <Square 
                value={this.state.squares[y][x]} 
                style={style}
            />
        ); 
    }

    render() {
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

