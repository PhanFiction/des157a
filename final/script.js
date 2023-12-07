(function(){
  'use strict'
  console.log('reading JS');

  document.getElementById('game-form').addEventListener('submit', gameForm);
  const startGame = document.querySelector('#startgame');
  const gameControl = document.querySelector('#gamecontrol');
  const game = document.querySelector('#game');
  const player1Name = document.getElementById('player1Name');
  const player2Name = document.getElementById('player2Name');
  const player1 = document.getElementById('player1');
  const player2 = document.getElementById('player2');
  const player1Score = document.getElementById('player1-score');
  const player2Score = document.getElementById('player2-score');
  const actionArea = document.querySelector('#actions');
  const infoSection = document.querySelector('#info-container');
  const audio = document.getElementById('myAudio');

  const gameData = {
    dice: ['images/dice1.png', 'images/dice2.png', 'images/dice3.png', 'images/dice4.png', 'images/dice5.png', 'images/dice6.png'],
    players: ['player1', 'player2'],
    score: [0, 0],
    roll1: 0,
    roll2: 0,
    rollSum: 0,
    index: 0,
  };

  function gameForm(event) {
    event.preventDefault();

    const maxScore = document.getElementById('score').value;

    console.log('Player 1 Name:', player1.value);
    console.log('Player 2 Name:', player2.value);
    console.log('Max Score:', maxScore);

    document.getElementById('player1').innerText = player1.value;
    document.getElementById('game-overlay').style.display = 'none';
  }

  function addInfo(text) {
    document.getElementById('player1').innerText = player1.value;
    infoSection.innerHTML += `<span>${text}</span>`;
  }

  function handleScore(player, score) {
    if(player == 0) {
      player1Score.textContent = `Score: ${score}`;
    }else{
      player2Score.textContent = `Score: ${score}`;
    }
  }

  startGame.addEventListener('click', () => {
    addInfo('Game has started');
    gameControl.innerHTML += '<button class="btn" id="quit">Quit</button>';

    document.getElementById('quit').addEventListener('click', () => {
      location.reload();
    });
    setUpTurn();
})

function setUpTurn() {
  addInfo(`${gameData.players[gameData.index]} turn`);
  actionArea.innerHTML = '<button id="roll" class="btn">Roll</button>';
  document.getElementById('roll').addEventListener('click', ()=>{
    throwDice();
  })
}

function throwDice() {
    actionArea.innerHTML = '';
    gameData.roll1 = Math.floor(Math.random() * 6) + 1;
    gameData.roll2 = Math.floor(Math.random() * 6) + 1;
    game.innerHTML = `<p>${gameData.players[gameData.index]} Roll</p>`;
    game.innerHTML = `<img src="${gameData.dice[gameData.roll1-1]}">
        <img src="${gameData.dice[gameData.roll2-1]}">`;
    gameData.rollSum = gameData.roll1 + gameData.roll2;
    audio.play();
    if(gameData.rollSum === 2) {
        addInfo('Oh snap Snake eyes');
        gameData.score[gameData.index] = 0;
        handleScore(gameData.index, 0);
        gameData.index ? gameData.index = 0 : gameData.index = 1;
        setTimeout(setUpTurn, 2000);
    }else if(gameData.roll1 === 1 || gameData.roll2 === 1){
        gameData.index ? gameData.index = 0 : gameData.index = 1;
        addInfo(`sorry, your roll was a one, switchting to ${gameData.players[gameData.index]}`)
        setTimeout(setUpTurn, 2000);
    }else{
        const totalScore = gameData.score[gameData.index] + gameData.rollSum;
        gameData.score[gameData.index] = totalScore;
        handleScore(gameData.index, totalScore);
        actionArea.innerHTML = '<button id="rollagain" class="btn">Roll again</button> or <button id="pass" class="btn">Pass</button>';
        document.getElementById('rollagain').addEventListener('click', ()=>{
          setUpTurn();
        });
        document.getElementById('pass').addEventListener('click', ()=>{
          gameData.index ? gameData.index = 0 : gameData.index = 1;
          setUpTurn();
        })
    }
    checkWinningCondition();
}

function checkWinningCondition() {
    if(gameData.score[gameData.index] > gameData.gameEnd) {
      addInfo(`${gameData.players[gameData.index]} wins with ${gameData.score[gameData.index]} points!`);
      actionArea.innerHTML = '';
      document.getElementById('quit').innerHTML = "Start a new game";
    }else{
      showCurrentScore();
    }
}

function showCurrentScore() {
    addInfo(`Score for ${gameData.players[0]} with
    ${gameData.score[0]} and ${gameData.players[1]} with
    ${gameData.score[1]}`);
}

})();