import React, {useState} from 'react'
import axios from 'axios'

export default function AppFunctional(props) {

  const [state, setState] = useState({
    message: '',
    steps: 0,
    x: 2,
    y: 2,
    grid: ['','','','','B','','','',''],
    emailInput: ''
  })

  const setArrayByMove = (x, y) => {
    if(x === 1 && y === 1){
      return ['B','','','','','','','','']
    }
    if(x === 2 && y === 1){
      return ['','B','','','','','','','']
    }
    if(x === 3 && y === 1){
      return ['','','B','','','','','','']
    }
    if(x === 1 && y === 2){
      return ['','','','B','','','','','']
    }
    if(x === 2 && y === 2){
      return ['','','','','B','','','','']
    }
    if(x === 3 && y === 2){
      return ['','','','','','B','','','']
    }
    if(x === 1 && y === 3){
      return ['','','','','','','B','','']
    }
    if(x === 2 && y === 3){
      return ['','','','','','','','B','']
    }
    if(x === 3 && y === 3){
      return ['','','','','','','','','B']
    }
  }


  const submitHandler = e => {
    e.preventDefault()
    setState({
      ...state,
      emailInput: ''
    })
  }


  const getCoordinates = () => {
    return `Coordinates (${[state.x, state.y]})`
  }

  const handleLeft = (currentX, currentY) => {
    if(currentX === 1){
      setState({
        ...state,
        message: `You can't go left`,
      })
    }
    else {
      currentX -= 1;
      currentY = state.y;
      setState({
        ...state,
        steps: state.steps + 1,
        x: currentX,
        y: currentY,
        grid: setArrayByMove(currentX, currentY),
        message: null
      })
    }
  }

  const handleRight = (currentX, currentY) => {
    if(currentX === 3){
      setState({
        ...state,
        message: `You can't go right`,
      })
    }
    else {
      currentX += 1;
      currentY = state.y;
      setState({
        ...state,
        steps: state.steps + 1,
        x: currentX,
        grid: setArrayByMove(currentX, currentY),
        message: null
      })
    }
  }

  const handleUp = (currentX, currentY) => {
    if(currentY === 1){
      setState({
        ...state,
        message: `You can't go up`,
      })
    } else{
      currentY -= 1;
      currentX = state.x;
      setState({
        ...state,
        steps: state.steps + 1,
        y: currentY,
        grid: setArrayByMove(currentX, currentY),
        message: null
      })
    }
  }

  const handleDown = (currentX, currentY) => {
    if(currentY === 3){
      setState({
        ...state,
        message: `You can't go down`,
      })
    } else{
      currentY += 1;
      currentX = state.x;
      setState({
        ...state,
        steps: state.steps + 1,
        y: currentY,
        grid: setArrayByMove(currentX, currentY),
        message: null
      })
    }
  }

  

  

  const onChange = e => {
    const { value } = e.target;
    setState({
      ...state,
      emailInput: value
    })
  }

  
  

  const sendData = () => {
    const newInput = {
      x: state.x,
      y: state.y,
      steps: state.steps,
      email: state.emailInput
    }
    axios.post('http://localhost:9000/api/result', newInput)
    .then(res => {
      setState({
        ...state, message: res.data.message, emailInput: ''
      })
    })
    .catch(err => {
      setState({
        ...state,
        message: err.response.data.message
      })
      
    })

   }

   const reset = () => {
    setState({
        currentBox: 'B',
        steps: 0,
        x: 2,
        y: 2,
        grid: ['','','','','B','','','',''],
        message: null,
        emailInput: ''
    })
  }

   
  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
          <h3 id="coordinates">{getCoordinates(state.grid)}</h3>
          <h3 id="steps">{`You moved ${state.steps} ${state.steps === 1 ? 'time' : 'times'}`}</h3>
        </div>
        <div id="grid">

            {state.grid.map((item, id) => <div key={id} className={`square ${item === 'B' ? 'active' : ''}`}>{item}</div>)}

        </div>
        <div className="info">
          <h3 id="message">{state.message}</h3>
        </div>
        <div id="keypad">
          <button id="left" onClick={() => handleLeft(state.x, state.y)}>LEFT</button>
          <button id="up" onClick={() => handleUp(state.x, state.y)} >UP</button>
          <button id="right" onClick={() => handleRight(state.x, state.y)}>RIGHT</button>
          <button id="down" onClick={() => handleDown(state.x, state.y)}>DOWN</button>
          <button id="reset" onClick={() => reset()}>reset</button>
        </div>
        <form onSubmit={submitHandler}>
          <input 
            id="email" 
            type="email" 
            placeholder="type email" 
            onChange={onChange} 
            value={state.emailInput}
            >
          </input>
          <input id="submit" type="submit" onClick={sendData}></input>
        </form>
    </div>
  )
}
