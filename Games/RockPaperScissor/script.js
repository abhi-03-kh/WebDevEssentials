let userScore = 0;
let compScore = 0;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");

const userScoreBoard = document.querySelector("#user-score");
const compScoreBoard = document.querySelector("#comp-score");

const genCompChoice = () => {
    const options = ["rock","paper","scissors"];
    const randIdx = Math.floor(Math.random() *3)
    return options [randIdx];

};

const drawGame = () => {
    console.log("game was draw");
    msg.innerHTML="Game was Draw, Play again.";
    msg.style.backgroundColor ="lemonchiffon";
    msg.style.color ="black";
}

const showWinner = (userWin,userChoice,compChoice) => {
    if (userWin) {
        userScore++;
        userScoreBoard.innerHTML = userScore;
        console.log("you win!");
        msg.innerHTML=`You win! Your ${userChoice} beats ${compChoice}`;
        msg.style.backgroundColor ="green";
    } else {
        compScore++;
        compScoreBoard.innerHTML = compScore;
        console.log("you loose");
        msg.innerHTML=`You loose...${compChoice} beats your ${userChoice}`;
        msg.style.backgroundColor ="red";
    }

}

const playGame =(userChoice) => {
    console.log("user choice =" , userChoice);
    const compChoice = genCompChoice();
    console.log("comp choice =" , compChoice);

    if (userChoice===compChoice) {
        drawGame();
    } else{
        let userWin = true;
        if (userChoice==="rock") {
            // scissor,paper
            userWin = compChoice ==="paper" ? false : true;
        } else if (userChoice=== "paper") {
            // rock , scissors
           userWin = compChoice === "scissors" ? false : true;
        } else{
            // rock, paper
            userWin = compChoice === "rock" ? false : true;
        }
        showWinner(userWin,userChoice,compChoice);
    }
}

choices.forEach((choice) => {
    choice.addEventListener("click", () => {
        const userChoice = choice.getAttribute("id")
        playGame (userChoice)
    })
});