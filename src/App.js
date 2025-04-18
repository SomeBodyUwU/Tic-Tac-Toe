import {useState} from 'react';


function Square({value, onSquareClick})
{
    return <button className="square" onClick={onSquareClick}>
            {value}
            </button>;
}

function Board({xIsNext, squares, onPlay, currentMove})
{
    function handleClick(i)
    {
        if(squares[i] || calculateWinner(squares))
        {
            return;
        }

        const nextSquares = squares.slice();
        xIsNext ? nextSquares[i] = "X" : nextSquares[i] = "O";
        onPlay(nextSquares);
    }

    const winner = calculateWinner(squares);
    let status = winner ? "Winner: " + winner : (currentMove === 9 ? "Tie" : "Next player: " + (xIsNext ? "X" : "O"));

    const boardRows = [];
    for(let row = 0; row < 3; row++)
    {
        const squaresRow = [];
        for(let col = 0; col < 3;  col++)
        {
            const index = row * 3 + col;
            squaresRow.push(<Square key={index} value={squares[index]} onSquareClick={() => handleClick(index)} />);
        }
        boardRows.push(<div key={row}className='board-row'>{squaresRow}</div>);

    }
    return (
        <>
        <div className="status">{status}</div>
        {boardRows}
        </>
    )
}

function calculateWinner(squares)
{
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (const element of lines)
    {
        const [a, b, c] = element;
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c])
        {
          return squares[a];
        }
    }
    return null;
}

export default function Game() 
{
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    const xIsNext = currentMove % 2 === 0;
    const currentSquares = history[currentMove];

    function handlePlay(nextSquares) 
    {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
    }

    function jumpTo(nextMove)
    {
        setCurrentMove(nextMove);
    }

    const moves = history.map((squares, move) =>{
        let description = move > 0 ? "Go to move #" + move : "Go to game start";
        return (
            <li key={move}>
                <button onClick={() => jumpTo(move)}>{description}</button>
            </li>
        )
    })
    return (
      <div className="game">
        <div className="game-board">
            <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} currentMove={currentMove}/>
        </div>
        <div className="game-info">
            <ol>{moves}</ol>
        </div>
      </div>
    );
  }