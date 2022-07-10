import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Square from './Component/square/square';
import styled from 'styled-components';



function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [XPlayer, setXPlayer] = useState(true);
  const handlePlay = (index) => {
    const temp = board.slice();
    if (winner || temp[index]) {
      return
    }
    if (XPlayer) {
      temp[index] = "x";
    }
    else {
      temp[index] = "o";
    }
    setBoard(temp);
    setXPlayer(!XPlayer);
  }
  const winner = calculateWinner(board);


  return (
    <Container>
      <button className='reset' onClick={() => { setBoard(Array(9).fill(null)); setXPlayer(true) }}>Reset</button>
      <Board>
        {board.map((item, index) => <Square handlePlay={() => { handlePlay(index) }} key={index} winner={winner?.includes(index)} value={item} />)}
      </Board>
      {winner && <HeroText>The winner is {board[winner[0]]}</HeroText>}
      {!winner && board.flat().every((cell) => cell !== null) && <HeroText>Draw</HeroText>}
    </Container>
  );
}



function Box(props) {
  return (
    <div style={{ margin: "20px auto", backgroundColor: props.color, width: "50px", height: "50px", color: props.textColor, textAlign: "center" }} >
      <Text value={props.color} textColor={props.textColor} />
    </div>
  )
}

function Text({ value, textColor }) {
  return <h3 style={{ color: textColor }} >{value}</h3>
}




function calculateWinner(board) {
  const winLine = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let index = 0; index < winLine.length; index++) {
    const [a, b, c] = winLine[index];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return winLine[index];
    }
  }
  return null;
}
const HeroText = styled.h3`
  color: ${props => props.textColor};
  background: ${props => props.backgroundColor};
`;
const Container = styled.div`
  margin: 20vh auto;
  max-width: 200px;
  & .reset{
    margin-bottom: 20px;
    padding: 10px;
    color:white;
    background-color: black;
    font-weight: bold;
  }
`;
const Board = styled.div`
  display: grid;
  grid-template-columns: repeat(3,1fr);
  gap:10px;
  max-width: 200px;
`;

export default App;