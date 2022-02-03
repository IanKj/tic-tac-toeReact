import React from 'react'
import '../styles.css'

const GameOptions = ({ handleFormSubmission,
    players,
    handleGameType,
    vsHuman,
    gameIsActive,
    handleNameError
}) => {

    const { player1, player2 } = players
    const handleFormClick = (e) => {
        e.preventDefault()
        handleNameError()
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
        <div className='gameOptionsContainer'>
            <div className='buttonFormContainer'>
                <div className="buttonContainer">
                    <button
                        className={vsHuman ? 'active' : 'inactive'}
                        name="human"
                        onClick={(e) => handleButtonClick(e)}>vs human</button>

                    <button
                        className={vsHuman ? 'inactive' : 'active'}
                        name="computer"
                        onClick={(e) => handleButtonClick(e)}>vs computer</button>
                </div>
                <div className='formDisplayContainer'>
                    <fieldset
                        disabled={gameIsActive || !vsHuman || player1.name}
                        className={player1.name ? 'hidden' : ''}
                    >
                        <form onSubmit={(e) => handleFormClick(e)}>
                            <div>
                                <label htmlFor='player1'>X:</label>
                                <input
                                    id='player1'
                                    type="text"
                                    name="player1"
                                    placeholder={'enter name for player 1...'}
                                    required
                                ></input>
                            </div>
                            <div>
                                <label htmlFor='player2'>O:</label>
                                <input
                                    id='player2'
                                    type="text"
                                    name="player2"
                                    placeholder={'enter name for player 2...'}
                                    required
                                ></input>
                            </div>
                            <button>Submit</button>
                        </form>
                    </fieldset>


                    <p className={`versusDisplay ${player1.name ? '' : 'hidden'}`}>{`${player1.name} vs ${player2.name}`}</p>
                </div>
            </div>


        </div>

    )
}

export default GameOptions