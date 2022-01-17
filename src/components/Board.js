import React from 'react'
import Square from './Square'

const Board = ({ board, onClick }) => {

    const styles = {
        width: '300px',
        height: '300px',
        display: 'grid',
        gridTemplate: 'repeat(3, 1fr) / repeat(3, 1fr)'
    }
    return (
        <div style={styles}>
            {board.map((item, index) => (
                <Square
                    key={index}
                    value={item}
                    onClick={() => onClick(index)}
                ></Square>
            ))}
        </div>
    )
}

export default Board