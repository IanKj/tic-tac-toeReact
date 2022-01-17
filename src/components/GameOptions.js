import React from 'react'

const GameOptions = ({ handleFormSubmission, players }) => {
    const { player1, player2 } = players
    const handleClick = (e) => {
        e.preventDefault()
        console.log(e.target.elements)
        const { player1, player2 } = e.target.elements
        handleFormSubmission({ player1, player2 })
    }
    return (
        <div>
            <form onSubmit={(e) => handleClick(e)}>
                <label htmlFor='player1'>X:</label>
                <input id='player1' type="text" name="player1" placeholder='enter name...'></input>
                <label htmlFor='player2'>O:</label>
                <input id='player2' type="text" name="player2" placeholder='enter name...'></input>
                <button>Submit</button>
            </form>
            <div>
                <p>{`${player1.name} vs ${player2.name}`}</p>
            </div>
        </div>

    )
}

export default GameOptions