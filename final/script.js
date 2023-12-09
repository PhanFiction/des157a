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
  const messageContainer = document.getElementById('message-container');
  const rollDice = document.getElementById('rolldice');
  const gameOver = document.getElementById('gameover');

  const gameData = {
    dice: ['images/dice1.png', 'images/dice2.png', 'images/dice3.png', 'images/dice4.png', 'images/dice5.png', 'images/dice6.png'],
    players: [
      {
        player: 'player1',
        name: '',
      },
      {
        player: 'player2',
        name: '',
      }
    ],
    score: [0, 0],
    roll1: 0,
    roll2: 0,
    rollSum: 0,
    index: 0,
    maxScore: 30,
  };

  function gameForm(event) {
    event.preventDefault();

    const maxScore = document.getElementById('score').value;
    gameData.maxScore = maxScore;

    player1.innerText = player1Name.value;
    player2.innerText = player2Name.value;
    gameData.players[0].name = player1Name.value;
    gameData.players[1].name = player2Name.value;
    document.getElementById('game-overlay').style.display = 'none';
  }

  function addInfo(text, playerId) {
    const message = playerId == null ? `<span>${text}</span>`
      :`<span style="color:blue">${gameData.players[gameData.index]}</span>`;

    messageContainer.innerHTML += message;
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
  addInfo(`<span style="color:blue">${gameData.players[gameData.index].name}</span> turn`);
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
    game.innerHTML = `<img class="dice" src="${gameData.dice[gameData.roll1-1]}">
        <img class="dice" src="${gameData.dice[gameData.roll2-1]}">`;
    gameData.rollSum = gameData.roll1 + gameData.roll2;
    rollDice.play();
    if(gameData.rollSum === 2) {
        addInfo('Oh snap Snake eyes ');
        gameData.score[gameData.index] = 0;
        handleScore(gameData.index, 0);
        gameData.index ? gameData.index = 0 : gameData.index = 1;
        setTimeout(setUpTurn, 2000);
    }else if(gameData.roll1 === 1 || gameData.roll2 === 1){
        gameData.index ? gameData.index = 0 : gameData.index = 1;
        addInfo(`sorry, your roll was a one, switchting to ${gameData.players[gameData.index].name} `)
        setTimeout(setUpTurn, 2000);
    }else{
        const totalScore = gameData.score[gameData.index] + gameData.rollSum;
        gameData.score[gameData.index] = totalScore;
        handleScore(gameData.index, totalScore);
        actionArea.innerHTML = `
        <div class="btn-container">
          <button id="rollagain" class="btn">Roll</button>
          <button id="pass" class="btn">Pass</button>
        </div>
        `;
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
    if(gameData.score[gameData.index] > gameData.maxScore) {
      gameOver.play();
      addInfo(`${gameData.players[gameData.index].name} wins with ${gameData.score[gameData.index]} points!`);
      actionArea.innerHTML = '';
      document.getElementById('quit').innerHTML = "Reset";
    }else{
      showCurrentScore();
    }
}

function showCurrentScore() {
    addInfo(`Score for ${gameData.players[0].name} with
    ${gameData.score[0]} and ${gameData.players[1].name} with
    ${gameData.score[1]}`);
}

})();