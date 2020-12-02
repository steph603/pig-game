/* eslint-disable semi */
/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, lastRoll0, lastRoll1, activePlayer, gamePlaying, winValue, dice0, dice1;

function init () {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  lastRoll0 = 0;
  lastRoll1 = 1;
  document.getElementById('win-score').value >= 1 ? winValue =  document.getElementById('win-score').value : winValue = 100  
  document.querySelector('.dice0').style.display = 'none';
  document.querySelector('.dice1').style.display = 'none';
  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');
  gamePlaying = true
}

init();

document.getElementById('win-score').addEventListener('change', function(){
  winValue = document.getElementById('win-score').value
})
console.log('The default winning score is', winValue, 'points.')

document.getElementById('current-1').textContent = '0'

document.querySelector('.btn-roll').addEventListener('click', function () {
  if (gamePlaying) {
    // 1. Random number

    dice0 = Math.floor(Math.random() * 6 + 1);
    dice1 = Math.floor(Math.random() * 6 + 1);
    var diceTotal = dice0 + dice1;

    // 2. Display the result

    var diceDOM = document.querySelector('.dice0')
    diceDOM.style.display = 'block'; // DAN - What is this one pls??
    diceDOM.src = 'dice-' + dice0 + '.png'

    var diceDOM = document.querySelector('.dice1')
    diceDOM.style.display = 'block'; // DAN - What is this one pls??
    diceDOM.src = 'dice-' + dice1 + '.png'

    // 3. Update the round score IF the rolled number is NOT a 1, AND if there have not been two consecutive 6's Rolled

    if (dice0 === 1 && dice1 === 1) {
      lastRoll0 = dice0;
      lastRoll1 = dice1;
      console.log(lastRoll0, lastRoll1)
      console.log('Snake Eyes!')
      alert('Snake Eyes!')
      nextPlayer()
    } else if (dice0 === 6 && dice1 === 6) {
      roundScore = 0;
      lastRoll0 = dice0;
      lastRoll1 = dice1;
      console.log(lastRoll0, lastRoll1, 'Two Sixes')
      document.querySelector('#current-' + activePlayer).textContent = roundScore;
      scores[activePlayer] = 0;
      document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
      alert('Piggy! - Rolled 2 6s')
      console.log('Piggy! - Rolled 2 6s')
      nextPlayer()
    } else if (lastRoll0 === 6 && dice0 === 6 || lastRoll1 ===6 && dice1 === 6) {
      roundScore = 0;
      lastRoll0 = dice0;
      lastRoll1 = dice1;
      console.log(lastRoll0, lastRoll1, 'Two Sixes')
      document.querySelector('#current-' + activePlayer).textContent = roundScore;
      scores[activePlayer] = 0;
      document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
      alert('This dice rolled a 6 last turn!')
      console.log('This dice rolled a 6 last turn!')
    } else if (lastRoll0 === 1 && dice0 === 1 || lastRoll1 === 1 && dice1 === 1) {
      lastRoll0 = dice0;
      lastRoll1 = dice1;
      console.log(lastRoll0, lastRoll1)
      console.log('This dice rolled a 1 last turn!')
      alert('This dice rolled a 1 last turn!')
      nextPlayer()
    } else {
      roundScore += diceTotal;
      lastRoll0 = dice0;
      lastRoll1 = dice1;
      console.log(lastRoll0, lastRoll1)
      document.querySelector('#current-' + activePlayer).textContent = roundScore
    }
  }
})

//     if (dice0 || dice1 !== 1 && lastRoll !== 6) {
//       roundScore += diceTotal;
//       lastRoll0 = dice0;
//       lastRoll1 = dice1;
//       console.log(lastRoll0, lastRoll1)
//       document.querySelector('#current-' + activePlayer).textContent = roundScore
//     } else if (dice0 || dice1 !== 1 && dice0 || dice1 !== 6 && lastRoll === 6) {
//       roundScore += diceTotal;
//       lastRoll0 = dice0;
//       lastRoll1 = dice1;
//       console.log(lastRoll0, lastRoll1)
//       document.querySelector('#current-' + activePlayer).textContent = roundScore
//     } else if (dice0 || dice1 === 6 && lastRoll0 || lastRoll1 === 6) {
//       roundScore = 0;
//       lastRoll0 = dice0;
//       lastRoll1 = dice1;
//       console.log(lastRoll0, lastRoll1)
//       document.querySelector('#current-' + activePlayer).textContent = roundScore;
//       scores[activePlayer] = 0;
//       document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
//       alert('Next Player - Rolled 2 6s')
//       console.log('Next Player - Rolled 2 6s')
//       nextPlayer()
//     } else {
//         lastRoll0 = dice0;
//         lastRoll1 = dice1;
//         console.log(lastRoll0, lastRoll1)
//       console.log('Next Player - Rolled a 1')
//       alert('Next Player - Rolled a 1')
//       nextPlayer()
//       console.log(winValue)
//     }
//   }})

document.querySelector('.btn-hold').addEventListener('click', function () {
  if (gamePlaying) {
    // Add current score to global score
    scores[activePlayer] += roundScore;
    document.querySelector('#current-' + activePlayer).textContent = roundScore;

    // Update UI
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer]
    //  Check win conditions
    if (scores[activePlayer] >= winValue) {
      document.querySelector('#name-' + activePlayer).textContent = 'WINNER!';
      document.querySelector('.dice0').style.display = 'none';
      document.querySelector('.dice1').style.display = 'none';
      document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
      document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
      gamePlaying = false
    } else {
      console.log('Player', (activePlayer + 1), 'HOLD')
      nextPlayer()
    }
  }
});

function nextPlayer () {
  roundScore = 0;
  lastRoll0 = 0;
  lastRoll1 = 1;
  document.querySelector('#current-' + activePlayer).textContent = roundScore;
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');
  document.querySelector('.dice0').style.display = 'none';
  document.querySelector('.dice1').style.display = 'none';
}


document.querySelector('.btn-new').addEventListener('click', init)