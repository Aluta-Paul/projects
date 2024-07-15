
//add an event listener to all the buttons inorder to identify which button i picked

/*document.querySelector('.js-rock').addEventListener('click', () => playermove = 'rock')*/

//instaed of the ABOVE , i should let the click pick a parameter
document.querySelector('.js-rock').addEventListener('click',() => {playGame('rock')});
document.querySelector('.js-paper').addEventListener('click',() => {playGame('paper')});
document.querySelector('.js-scissors').addEventListener('click',() => {playGame('scissors')});

//a fxn that shows rules of the game
//i also am using HOISING , ie using fxn b4 declare
function playGame(playerMove) {
  const computerMove = computerpick();
  let results = '';

  if(playerMove === 'rock'){
      if(computerMove === 'rock'){
        results = "it's a draw"
      }
      else if (computerMove === 'paper'){
        results = ' you lose'
      }
      else if( computerMove === 'scissors')
      results = 'you win'
    }

  else if( playerMove === 'paper'){
      if( computerMove === 'rock'){
        results = 'you win'
      }
      else if( computerMove === 'paper'){
        results = "it's a draw"
      }
      else if(computerMove === 'scissors')
      results = ' you loss'
    }

  else if( playerMove === 'scissors'){
      if( computerMove === 'rock'){
        results = 'lose'
      }
      else if( computerMove === 'paper'){
        results = 'you win'
      }
      else if(computerMove === 'scissors')
      results = "it's a draw"
    }
   //this function should be able to output the results and choicess cause it has them
   document.querySelector('.results').innerHTML = results

   document.querySelector('.picks').innerHTML = ` <img src ="images/${playerMove}-emoji.png" class = "move-icon"> Against <img src ="images/${computerMove}-emoji.png" class = "move-icon"> `;
}





//we create a function that returns the computer move
function computerpick() {

  const randomNumber = Math.random()
  let computerMove = ''
  if(randomNumber >= 0 && randomNumber < 1/3) {
    computerMove = 'rock';
  }
  else if(randomNumber >=1/3 && randomNumber < 2/3) {
    computerMove = 'paper'
  }
  else { computerMove= 'scissors'}

  return computerMove;
}