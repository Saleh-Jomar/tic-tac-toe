"use strict"

const Player = function(name,mark){
    function getName() {
        return name
    }

    function getMark() {
        return mark
    }

    function setName(newName) {
        name = newName;
    }
    
    return {getName,getMark,setName}

}

const Game = (function(){
    //Variables

    const player1 = Player('Player1','X');
    const player2 = Player('Player2','O');
    let gameboard = ['','','','','','','','',''];
    let playerTurn = player1;
    //Dom Elements

    const tiles = document.getElementsByClassName('tiles');
    const board = document.getElementById('gameboard');
    const winnerPopup = document.querySelector('.winner-display');
    const winner = document.getElementById('winner');
    const overlay = document.querySelector('.overlay');
    const resetButton = document.getElementById('reset');
    const opponent = document.getElementById('opponent')
     
    //Bind Events

    board.addEventListener('click',playRound);
    resetButton.addEventListener('click',reset);
    opponent.addEventListener('click',()=>{
        playerTurn=player1;
        reset()
    });

    //Functions and Methods

    function render(){
        for (let i=0; i<gameboard.length; i++){
            tiles[i].textContent = gameboard[i];
        }
    }
    
    function playRound(event) {
        const index = typeof event == 'number' ? event : 
        [...event.target.parentElement.children].indexOf(event.target);
        if (gameboard[index] != '') return;
        gameboard[index] = playerTurn.getMark();
        tiles[index].textContent = gameboard[index];
        if (checkWinner()==playerTurn.getName()){
            winner.textContent = `${playerTurn.getName()} Wins!!!`
            winnerDisplay('on');
        }
        if (checkWinner()=='Draw'){
            winner.textContent = `It's a Draw!!!`
            winnerDisplay('on');
        }
        playerTurn = playerTurn == player1? player2 : player1;
        if (playerTurn==player2 && opponent.value=='Computer'){
            playRound(minimax(gameboard,0));
        }
    }

    function checkWinner(){
        const winningCombinations = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
        for (var combination of winningCombinations){
            let p0 = combination[0];
            let p1 = combination[1];
            let p2 = combination[2];
            if (gameboard[p0]!=''&&gameboard[p0]==gameboard[p1]&&gameboard[p1]==gameboard[p2]){
                return playerTurn.getName();
            } 
        }
        if (!gameboard.includes('')){
            return 'Draw'
        } 
    }

    function winnerDisplay(state){
        if (state=='on'){
            winnerPopup.classList.add('winner-display-active');
            overlay.classList.add('overlay-active');
        }
        if (state=='off'){
            winnerPopup.classList.remove('winner-display-active');
            overlay.classList.remove('overlay-active');
        }

    }

    function reset(){
        gameboard = ['','','','','','','','',''];
        winnerDisplay('off');
        if (playerTurn==player2 && opponent.value=='Computer'){
            playRound(minimax(gameboard,0));
        }
        render();
    }

    function minimax(board,depth){
        
        let result = checkWinner();
        if (!result==false){
            switch(true){
                case result==player1.getName():
                    return 10 - depth
                case result==player2.getName():
                    return -10 + depth
                case result=='Draw':
                    return 0
            }
        }
        let score
        let bestMove
        let bestScore = playerTurn == player2? -2 : 2;

        for (let i=0; i<gameboard.length;i++){
            if (gameboard[i]==''){
                gameboard[i] = playerTurn.getMark()
                playerTurn = playerTurn == player1? player2 : player1;
                score = minimax(gameboard,depth+1)
                gameboard[i]='';
                playerTurn = playerTurn == player1? player2 : player1;
                if (depth==0 && score > bestScore){
                    bestMove = i;
                }
                bestScore = playerTurn == player2 ? Math.max(score,bestScore) : Math.min(score,bestScore);
            }
        }
        if(depth==0){
            return bestMove;
        }
        return bestScore;

    }
    render()



    return {reset,playRound};
})();