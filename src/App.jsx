import { useRef, useState } from 'react'
import './App.css'

function App() {
  const numbersRef= useRef(Array.from({ length: 10 }, (_, index) => index))
  const operationsRef= useRef(['+','-','*','/','='])
  const [total, setTotal] = useState('')
  const [currentValue, setCurrentValue] = useState('0')
  const [previousValue, setPreviousValue]= useState('0')
  const [selectedOperator, setSelectedOperator] = useState('')

  const randomizeValue=(arr, context)=>{
    const shuffledElements = [...arr];
    for (let i = shuffledElements.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledElements[i], shuffledElements[j]] = [shuffledElements[j], shuffledElements[i]];
    }
    switch(context){
      case('numbers'):
        numbersRef.current=[...shuffledElements]
        break
      case('operations'):
        operationsRef.current=[...shuffledElements]
        break
      default:
        break
    }
  }

const addToCurrentValue=(e)=>{
  const {value}= e.target
  if(currentValue==='0'){
    setCurrentValue(value)
  }else {
    setCurrentValue(currentValue.concat(value))
  }
 }

  const selectOperator=(e)=>{
    const {innerText:operator } = e.target
    if(currentValue==='0')setSelectedOperator(operator)
    if(operator==='=') calculate()
    else{
  setSelectedOperator(operator)
  setCurrentValue('0')
  if(total){
    setPreviousValue(total)
    setTotal('')
  } else setPreviousValue(currentValue)
} 
  }

  const calculate= ()=>{
    setTotal(eval( currentValue + selectedOperator+ previousValue))
    setPreviousValue('0')
    setCurrentValue('0')
  }



  randomizeValue(numbersRef.current, 'numbers')
  randomizeValue(operationsRef.current, 'operations')

  return (
    <>
     <h1>Worlds Best Calculator</h1>
     <div style={{borderRadius:'.5rem',height:'initial', border:'rgba(0,0,0,0.5) solid 1px', backgroundColor:'rgba(0,0,0,0.10)'}}>{total}<br/> {currentValue}<br/>{selectedOperator} <br/>{previousValue} </div>
     {operationsRef.current.map((el,i)=>{
          return (
            <button onClick={selectOperator} key={i}>{el}</button>
          )
      })}
     <div style={{width:'100%',display:'grid',gridTemplateColumns:`repeat(${ Math.floor(Math.random() * (8 - 2) + 2)}, 1fr)`}}>
      { 
        numbersRef.current.map((el,i)=>{
          return (
            <button value={el}onClick={(addToCurrentValue)} key={i}>{el}</button>
          )
      })}
     </div>
     </>

  )
}

export default App
