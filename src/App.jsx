import { useEffect, useState } from 'react'
import hole from '../src/assets/hole.png'
import mole from '../src/assets/mole.png'
import './App.css'
import Modal from '@mui/material/Modal'
import EndGameModal from './components/EndGameModal'
import { Bounce, Zoom } from 'react-awesome-reveal'


function App() {
  const timerSeconds = 60;
  const [points, setPoints] = useState(0)
  const [moles, setMoles] = useState(new Array(12).fill(false))
  const [timer, setTimer] = useState(timerSeconds)
  const [bestScore, setBestScore] = useState(0)

  const [showGame, setShowGame] = useState(false)

  useEffect(() => {
    
    const getBestScore = localStorage.getItem('bestScore');
    getBestScore ? setBestScore(getBestScore) : localStorage.setItem('bestScore', bestScore)    

    const interval = setInterval(function(){
      let randomIndex = Math.floor(Math.random() * 12);
      const newMoles = [...moles];
      newMoles[randomIndex] = true;
      setMoles(newMoles)
      if(timer == 0){clearInterval(interval)}
    }, 600)

  }, [])


  function startGame() {
    setTimer(timerSeconds);
    setPoints(0);
    countDown();
    setShowGame(!showGame);
  }

  function endGame() {
    setShowGame(false);
    if(points > bestScore) {
      setBestScore(points)
    }

    setOpenEndMenu(true);
    
  }


  function countDown() {
    let seconds = timerSeconds;
    const timeInterval = setInterval(() => {
      setTimer(seconds)
      seconds -= 1;
      setTimer(seconds)
      if(seconds == 0) {   
        clearInterval(timeInterval);
        endGame();
        
    }
    }, 1000)
    
  }
  

  function whackMole(index) {
    const newMoles = [...moles];
    newMoles[index] = false;
    setMoles(newMoles);
    setPoints(points + 1);
  }

  const [openMenu, setOpenMenu] = useState(true);
  const [openEndMenu, setOpenEndMenu] = useState(false);

  return (
    <Zoom>
    <div className='container'>
      {showGame &&
      <div className='points-row'>
        <div className='points'>
          Score: {points}
        </div>
        <div className='timer'>
          Timer: {timer}
        </div>
      </div>
      }
      {showGame &&
      <Zoom>
        <div className='grid'>
          {moles.map((isMole, index) => { return(
            <img key={index} className='img' src={isMole ? mole : hole} onClick={() => isMole && whackMole(index)} draggable="false"/>
            )})}
        </div>
      </Zoom>
      }
      
      <Modal open={openMenu}>
        <>
        <Bounce>
        <div className='main-menu'>  
          <div>
            <p>Whack-A-Mole</p>
          </div>
          <div>
            <div className='btn' onClick={() => {setOpenMenu(false); startGame()}}>Start</div>
          </div>
        </div> 
        </Bounce>
        </>
      </Modal>
      
      {openEndMenu && <EndGameModal points={points} bestScore={bestScore} setBestScore={setBestScore} openEndMenu={openEndMenu} setOpenEndMenu={setOpenEndMenu} />}
    </div>
    </Zoom>
  )
}

export default App
