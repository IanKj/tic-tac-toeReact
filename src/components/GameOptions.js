import React from 'react'

const GameOptions = ({ handleFormSubmission, players, handleGameType }) => {
    const { player1, player2 } = players
    const handleFormClick = (e) => {
        e.preventDefault()
        const { player1, player2 } = e.target.elements

        handleFormSubmission({ player1, player2 })
        player1.value = ''
        player2.value = ''
    }

    const handleButtonClick = (e) => {
        const isPlayingHuman = e.target.name === 'computer' ? false : true
        handleGameType(isPlayingHuman)
    }

    return (
        <div>
            <div>
                <button name="human" onClick={(e) => handleButtonClick(e)}>vs human</button>
                <button name="computer" onClick={(e) => handleButtonClick(e)}>vs computer</button>
            </div>

            <form onSubmit={(e) => handleFormClick(e)}>
                <label htmlFor='player1'>X:</label>
                <input id='player1' type="text" name="player1" placeholder={player1.name}></input>
                <label htmlFor='player2'>O:</label>
                <input id='player2' type="text" name="player2" placeholder={player2.name}></input>
                <button>Submit</button>
            </form>
            <div>
                <p>{`${player1.name} vs ${player2.name}`}</p>
            </div>
        </div>

    )
}

export default GameOptions