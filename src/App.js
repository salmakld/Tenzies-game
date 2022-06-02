import React from 'react';
import './App.css';
import Die from './Components/Die';
import Confetti from 'react-confetti'
import {nanoid} from "nanoid"


function App() {
  // Helper functions
  function RandomInt(){
    // Generate random number from 1 to 6 inclusive
    return Math.ceil(Math.random() * 6)
  }
  function initTenzies(){
    // Generate random number only when value wasn't clicked
    const array = []
    for (let i=0; i<10; i++){
      array[i] = {
        "id": nanoid(),
        "value": RandomInt(), 
        "chosen": false,
      }
    }
    return array
  }

  function handleDiceClick(id){
    // If die is clicked switch its value
    const newTenziesArray = [...tenziesArray];
    for (let i=0; i<newTenziesArray.length; i++){
      if (newTenziesArray[i].id === id){
        newTenziesArray[i].chosen = !newTenziesArray[i].chosen
      }
    }
    setTenziesArray(newTenziesArray)
    }

  function handleRoll(){
    // Generate random values except for the dice already clicked
    const newTenziesArray = [...tenziesArray];
    for (let i=0; i<10; i++){
      if (!tenziesArray[i].chosen){
        newTenziesArray[i].value = RandomInt()
      }
    } 
    setTenziesArray(newTenziesArray)
    setNumberClicks(oldNumberClicks => oldNumberClicks+1)
  }
  function replay(){
    // Reset states
    setTenziesArray(initTenzies())
    setNumberClicks(0)
  }
  // End helper functions
  const [tenziesArray, setTenziesArray] = React.useState(initTenzies())
  const [numberClicks, setNumberClicks] = React.useState(0)
  const arrayEelements = tenziesArray.map(
                          die => <Die key={die.id} 
                                      clicked={die.chosen}
                                      value={die.value}
                                      handleDiceClick={() => handleDiceClick(die.id)}/>
  )
  let chosenArray = tenziesArray.map(die => die.chosen)
  const set = new Set(chosenArray)

  return (
    <div className="app">
      <div className="board">
        <h1 className='title'>
          Tenzies
        </h1>
        {
          (set.size === 1 && chosenArray[0]) 
          ? 
            // All dice hame the same value
            <div>
              <Confetti/>
              <p className='game-description'>
                Congratulation! You won this game using {numberClicks} clicks.
              </p>
              <div className='grid-container'>
                <div className="grid vertical-center">
                  {arrayEelements}
                </div>
              </div>
              <p className='clicks'> </p>
              <button onClick={replay} className='roll'>Replay</button>
            </div>
            
          :
            // Not all dice have the same value
            <div>
              <p className='game-description'>
                Roll until all dice are the same. Click each die to freeze it at its current value between rolls.
              </p>
              <div className='grid-container'>
                <div className="grid vertical-center">
                  {arrayEelements}
                </div>
              </div>
              <p className='clicks'>Number of clicks: {numberClicks} </p>
              <button onClick={handleRoll} className='roll'>Roll</button>
            </div>
        }
      </div>
    </div>
  );
}

export default App;
