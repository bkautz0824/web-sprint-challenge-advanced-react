import React from 'react'
import axios from 'axios'

export default class AppClass extends React.Component {
  
  state = {
    message: '',
    steps: 0,
    x: 2,
    y: 2,
    grid: ['','','','','B','','','',''],
    emailInput: ''
  }

  setArrayByMove = (x, y) => {
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

  getCoordinates = () => {
    return `Coordinates (${[this.state.x, this.state.y]})`
  }


  handleLeft = (currentX, currentY) => {
    if(currentX === 1){
      this.setState({
        ...this.state,
        message: `You can't go left`,
      })
    }
    else {
      currentX -= 1;
      currentY = this.state.y;
      this.setState({
        ...this.state,
        steps: this.state.steps + 1,
        x: currentX,
        y: currentY,
        grid: this.setArrayByMove(currentX, currentY),
        message: null
      })
    }
  }

  handleRight = (currentX, currentY) => {
    if(currentX === 3){
      this.setState({
        ...this.state,
        message: `You can't go right`,
      })
    }
    else {
      currentX += 1;
      currentY = this.state.y;
      this.setState({
        ...this.state,
        steps: this.state.steps + 1,
        x: currentX,
        grid: this.setArrayByMove(currentX, currentY),
        message: null
      })
    }
  }

  handleUp = (currentX, currentY) => {
    if(currentY === 1){
      this.setState({
        ...this.state,
        message: `You can't go up`,
      })
    } else{
      currentY -= 1;
      currentX = this.state.x;
      this.setState({
        ...this.state,
        steps: this.state.steps + 1,
        y: currentY,
        grid: this.setArrayByMove(currentX, currentY),
        message: null
      })
    }
  }

  handleDown = (currentX, currentY) => {
    if(currentY === 3){
      this.setState({
        ...this.state,
        message: `You can't go down`,
      })
    } else{
      currentY += 1;
      currentX = this.state.x;
      this.setState({
        ...this.state,
        steps: this.state.steps + 1,
        y: currentY,
        grid: this.setArrayByMove(currentX, currentY),
        message: null
      })
    }
  }

  reset = () => {
    this.setState({
        currentBox: 'B',
        steps: 0,
        x: 2,
        y: 2,
        grid: ['','','','','B','','','',''],
        message: null,
        emailInput: ''
    })
  }

  submitHandler = e => {
    e.preventDefault()
    this.setState({
      ...this.state,
      emailInput: ''
    })
  }

  onChange = e => {
    const { value } = e.target;
    this.setState({
      ...this.state,
      emailInput: value
    })
  }
  

  sendData = () => {
    const newInput = {
      x: this.state.x,
      y: this.state.y,
      steps: this.state.steps,
      email: this.state.emailInput
    }
    axios.post('http://localhost:9000/api/result', newInput)
    .then(res => {
      this.setState({
        ...this.state, message: res.data.message
      })
    })
    .catch(err => {
      this.setState({
        ...this.state,
        message: err.response.data.message
      })
    })
   }

  render() {
    
    const { className } = this.props
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">{this.getCoordinates(this.state.grid)}</h3>
          <h3 id="steps">{`You moved ${this.state.steps} ${this.state.steps === 1 ? 'time' : 'times'}`}</h3>
        </div>
        <div id="grid">

            {this.state.grid.map((item, id) => <div key={id} className={`square ${item === 'B' ? 'active' : ''}`}>{item}</div>)}

        </div>
        <div className="info">
          <h3 id="message">{this.state.message}</h3>
        </div>
        <div id="keypad">
          <button id="left" onClick={() => this.handleLeft(this.state.x, this.state.y)}>LEFT</button>
          <button id="up" onClick={() => this.handleUp(this.state.x, this.state.y)} >UP</button>
          <button id="right" onClick={() => this.handleRight(this.state.x, this.state.y)}>RIGHT</button>
          <button id="down" onClick={() => this.handleDown(this.state.x, this.state.y)}>DOWN</button>
          <button id="reset" onClick={() => this.reset()}>reset</button>
        </div>
        <form onSubmit={this.submitHandler}>
          <input 
            id="email" 
            type="email" 
            placeholder="type email" 
            onChange={this.onChange} 
            value={this.state.emailInput}
            >
          </input>
          <input id="submit" type="submit" onClick={this.sendData}></input>
        </form>
      </div>
    )
  }
}
