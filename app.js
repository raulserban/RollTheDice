/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

// Vars
var scores, roundScore, activePlayer, gamePlaying;

init();

// Roll Button functionality
document.querySelector(".btn-roll").addEventListener("click", function () {
  if (gamePlaying) {
    //1. Radom number
    var dice = Math.floor(Math.random() * 6) + 1;

    //2. Display the result
    var diceDisplayed = document.querySelector(".dice");
    diceDisplayed.style.display = "block";
    diceDisplayed.src = "dice-" + dice + ".png";

    //3.Update the round score if the rolled number was not a 1
    if (dice !== 1) {
      // Add to score
      roundScore += dice;
      document.querySelector(
        "#current-" + activePlayer
      ).textContent = roundScore;
    } else {
      nextPlayer();
    }
  }
});

// Hold Button functionality
document.querySelector(".btn-hold").addEventListener("click", function () {
  if (gamePlaying) {
    // Add current score to global score
    scores[activePlayer] += roundScore;
    // Update the UI
    document.querySelector("#score-" + activePlayer).textContent =
      scores[activePlayer];
    // Check if player won the game
    if (scores[activePlayer] >= 100) {
      document.querySelector("#name-" + activePlayer).textContent = "Winner!";
      document.querySelector(".dice").style.display = "none";
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.add("winner");
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.remove("active");
      gamePlaying = false;
    } else {
      // Next player
      nextPlayer();
    }
  }
});

// New Button functionality
document.querySelector(".btn-new").addEventListener("click", init);

// Changing the player
function nextPlayer() {
  //Change player and reset round score
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;

  // Change the UI also
  document.getElementById("current-0").innerText = "0";
  document.getElementById("current-1").innerText = "0";

  // Change the red dot from one player to another
  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");

  // Hide the dice
  document.querySelector(".dice").style.display = "none";
}

// Initializing the game
function init() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;

  document.querySelector(".dice").style.display = "none";

  document.getElementById("score-0").innerText = "0";
  document.getElementById("score-1").innerText = "0";
  document.getElementById("current-0").innerText = "0";
  document.getElementById("current-1").innerText = "0";

  document.getElementById("name-0").textContent = "Player1";
  document.getElementById("name-1").textContent = "Player2";

  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");
}
