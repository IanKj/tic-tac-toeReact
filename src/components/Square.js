import React from 'react'
import '../styles.css'
import { motion } from 'framer-motion'

const Square = ({ value, onClick, winner, index }) => {
    return (
        <button
            className={`gridButton ${winner && winner[1].includes(index) ? 'winner' : ''} `}
            onClick={onClick}>
            {value}


        </button>
    )
}

export default Square