//first select all button, and operands and other misclinears buttons
//to select them we use DATA-ATTRIBUTES .. instead of class attr to separate css and js

//classes are like FUNCTIONS:But don't have HOISTING capabilities...used for OOP(Object Oriented Programming)
// it takes an argument
/*class logger {
  constructor(message){//constructer is what takes the argumment
    this.message = message;// we use ' this ' to store the massage that was passed in at" "constructor(message)"
  }
  log() {// adding new methods
    console.log(this.message);
  }
}
const logger = new logger("hellow-passing an argument");// using NEW to create a new logger
logger.log();*/

class Calculator {
  constructor(previousOperandTextElement,currentOperandTextElement) {//takes all our inputs ...>> help us know where to place our display text
  this.previousOperandTextElement = previousOperandTextElement;
  this.currentOperandTextElement =currentOperandTextElement;
  // now we have a way to set text ellements inside calculator class
  this.clear() //calling the function clear..>> we call it now to ensure the screen is always in default as soon as we create new calculator
  this.updateDisplay();
  }
  // making functions for different jobs!!
  clear() {// clear the entire screen
    this.currentOperand = '' ;//set to default
    this.previousOperand = '';
    this.operation = undefined;

  }
  delete() {//remove a single number
    this.currentOperand =this.currentOperand.toString().slice(0,-1)

  }
  appendNumber(number) {// everytime we click on number and add to screen
    if (number === '.' && this.currentOperand.includes('.'))return
    this.currentOperand = this.currentOperand.toString() + number.toString()

  }
  chooseOperation(operation) {// allow we choose a operation sign
    if( this.currentOperand === '')return
    if(this.previousOperand !== '') {
      this.compute()
    }
    this.operation =operation
    this.previousOperand =this.currentOperand
    this.currentOperand =''

  }
  compute() {// for taking value inside the calculator and compute an answer for display
    let computation
    const prev = parseFloat(this.previousOperand)
    const current = parseFloat(this.currentOperand)
    if(isNaN(prev) || isNaN(current))return
    switch(this.operation) {
      case '+' :
        computation = prev + current
        break
      case '-' :
        computation = prev - current
        break
      case '*' :
        computation = prev * current
        break
      case '÷' :
        computation = prev / current
        break
      default :
      return
    }

    this.currentOperand = computation
    this.operation = undefined
    this.previousOperand = ''
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString()
    const integerDigit = parseFloat(stringNumber.split('.')[0])
    const decimalDigit = stringNumber.split('.')[1]
    let integerDisplay
    if (isNaN(integerDigit)){
      integerDisplay =''
    }else {
      integerDisplay = integerDigit.toLocaleString('en',{
        maximumFractionDigits : 0
      })
    }
    if(decimalDigit !== null){
      return `${integerDisplay}.${decimalDigit}`
    } else {
      return integerDisplay
    }

    /*<< shortest way to make commas for my numbers
    const floatnumber =parseFloat(number)
    if (isNaN(floatnumber))return ''
    return floatnumber.toLocaleString('en')*/
  }

  updateDisplay() { // will allow us to update the display
    this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand) || ''
    if(this.operation !== null){
      this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
    }else {
      this.previousOperandTextElement.innerText = ''
    }
    
  }
}


const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton =document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButtonButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operant]');
const currentOperandTextElement = document.querySelector('[data-current-operant]');
//we want to think: where will we store the values of output: we use CLASS(Above .^^^.)

// so lets creat a new calculator
const myCalculator = new Calculator (previousOperandTextElement,currentOperandTextElement)
myCalculator.updateDisplay();
// now we can use this calculator below ==>>

/*select the number buttons
then loop over all the button
for each button add an event listener
whenever we click the button we want to do sth
 we want to  toke the calculator and add the number inside  that button:APPENDNUMBER 
 once done we
 we call the calculator display fxn */
numberButtons.forEach(button => {
  button.addEventListener('click',() => {
    myCalculator.appendNumber(button.innerText)
    myCalculator.updateDisplay()
  })
})

operationButtons.forEach(button => {
  button.addEventListener('click',() => {
    myCalculator.chooseOperation(button.innerText)
    myCalculator.updateDisplay()
  })
})

equalsButton.addEventListener('click',button => {
  myCalculator.compute()
  myCalculator.updateDisplay()
})

allClearButtonButton.addEventListener('click',button => {
  myCalculator.clear()
  myCalculator.updateDisplay()
})

deleteButton.addEventListener('click',button => {
  myCalculator.delete()
  myCalculator.updateDisplay()
})