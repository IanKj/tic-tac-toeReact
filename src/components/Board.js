import React from 'react'
import Square from './Square'
import NameErrorBox from './NameErrorBox'
import '../styles.css'

const Board = ({ board, onClick, winner, nameErrorStatus }) => {


    return (
        <div className='boardGrid'>
            {nameErrorStatus ? <NameErrorBox /> : ''}
            {board.map((item, index) => (
                <Square
                    winner={winner}
                    key={index}
                    index={index}
                    value={item}
                    onClick={() => onClick(index)}
                ></Square>
            ))}
        </div>
    )
}

export default Board