import React, { useEffect } from 'react'
import Modal from '@mui/material/Modal';
import { Bounce } from 'react-awesome-reveal'

const EndGameModal = ({ points, bestScore, setOpenEndMenu, setBestScore, openEndMenu }) => {

    useEffect(() => {
        points > bestScore && setBestScore(points); localStorage.setItem('bestScore', points)
    }, [])

    function reload() {
        window.location.reload();
    }

  return (
    <Modal open={openEndMenu}>
        <>
        <Bounce>
        <div className='main-menu'>            
            <p>Score: {points}</p>
            <p>Best score: {points > bestScore ? points : bestScore}</p>
            <div>
                <div className='btn' onClick={() => {setOpenEndMenu(false); reload()}}>Restart</div>
            </div>  
        </div>
        </Bounce>
        </>
    </Modal>
  )
}

export default EndGameModal