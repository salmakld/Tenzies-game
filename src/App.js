import React from 'react';
import './App.css';
import Die from './Components/Die';
import Confetti from 'react-confetti'

function App() {
  // Helper functions
  function RandomInt(){
    // Generate random number from 0 to 9
    return Math.ceil(Math.random() * 6)
  }
  function initTenzies(array){
    // Initilize the array values of the state tenziesArray
    // Generate random number only when value wasn't clicked
    for (let i=0; i<10; i++){
      array[i] = RandomInt()
    }
    return array
  }

  function handleDiceClick(index){
    // Update array chosen of the state tenziesArray
    // If die is clicked switch its value to true
    const newTenziesArray = [...tenziesArray.chosen];
    newTenziesArray[index] = !newTenziesArray[index];
    setTenziesArray(oldTenziesArray => (
      {...oldTenziesArray,
      "chosen": newTenziesArray
      }
    ))}

  function handleRoll(){
    // Update array values of the state tenziesArray
    // Generate random values except for the dice already clicked
    const newTenziesArray = [...tenziesArray.values];
    for (let i=0; i<10; i++){
      if (!tenziesArray.chosen[i]){
        newTenziesArray[i] = RandomInt()
      }
    } 
    setTenziesArray(oldTenziesArray => ({
      ...oldTenziesArray,
      "values": newTenziesArray,
      "numberClicks": oldTenziesArray.numberClicks + 1
  }))}
  function replay(){
    // Reload the page to replay
    return window.location.reload()
  }
  // End helper functions
  const initTenziesArray = initTenzies([])
  const initChoiceArray = Array(10).fill(false)
  const [tenziesArray, setTenziesArray] = React.useState({"values": initTenziesArray, 
                                                          "chosen": initChoiceArray,
                                                          "numberClicks": 0})
  
  const arrayEelements = tenziesArray.values.map(
    (value, index) => <Die key={index} 
                           clicked={tenziesArray.chosen[index]}
                           value={value}
                           handleDiceClick={() => handleDiceClick(index)}/>
  )

  const set = new Set(tenziesArray.chosen)

  return (
    <div className="app">
      <div className="board">
        <h1 className='title'>
          Tenzies
        </h1>
        {
          (set.size === 1 && tenziesArray.chosen[0]) 
          ? 
            <div>
              <Confetti/>
              <p className='game-description'>
                Congratulation! You won this game using {tenziesArray.numberClicks} clicks.
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
            <div>
              <p className='game-description'>
                Roll until all dice are the same. Click each die to freeze it at its current value between rolls.
              </p>
              <div className='grid-container'>
                <div className="grid vertical-center">
                  {arrayEelements}
                </div>
              </div>
              <p className='clicks'>Number of clicks: {tenziesArray.numberClicks} </p>
              <button onClick={handleRoll} className='roll'>Roll</button>
            </div>
        }
      </div>
    </div>
  );
}

export default App;
