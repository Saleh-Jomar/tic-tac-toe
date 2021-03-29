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

    //Bind Events

    board.addEventListener('click',playRound);

    //Functions and Methods

    function render(){
        for (let i=0; i<gameboard.length; i++){
            tiles[i].textContent = gameboard[i];
        }
    }
    
    function playRound(event) {
        const index = [...event.target.parentElement.children].indexOf(event.target);
        if (gameboard[index] != '') return;
        gameboard[index] = playerTurn.getMark();
        tiles[index].textContent = gameboard[index];
        if(checkWinner()){}
        playerTurn = playerTurn == player1? player2 : player1;
    }

    function checkWinner(){
        const winningCombinations = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
        for (var combination of winningCombinations){
            let p0 = combination[0];
            let p1 = combination[1];
            let p2 = combination[2];
            if (gameboard[p0]!=''&&gameboard[p0]==gameboard[p1]&&gameboard[p1]==gameboard[p2]){
                return true;
            } 
        }
        return false;
    }
})();