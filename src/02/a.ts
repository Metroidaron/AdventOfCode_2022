export const x = "";

interface iGame {
  roundOne : string;
  roundTwo : string;
  roundThree : string;
  roundOneScore: number;
  roundTwoScore: number;
  roundThreeScore: number;
  gameScore : number
}

const input: string = Deno.readTextFileSync("./src/02/input.txt");
const inputArr = input.split(`\n`);

// A = Rock
// B = Paper
// C = Scissors

// X = Rock (1pt)
// Y = Paper (2pt)
// Z = Scissors (3pt)

// Loss = 0pt
// Draw = 3pt
// Wins = 6pt

const games: iGame[] = [];

const toRPS: (i: "A" | "B" | "C" | "X" | "Y" | "Z") => "rock" | "paper" | "scissors" = (i) => {
  switch(i) {
    case "A" : return "rock";
    case "B" : return "paper";
    case "C" : return "scissors";
    case "X" : return "rock";
    case "Y" : return "paper";
    case "Z" : return "scissors";
  }
}

const toPoints: (i: "X" | "Y" | "Z") => number = (i) => {
  switch(i) {
    case "X" : return 1;
    case "Y" : return 2;
    case "Z" : return 3;
  }
}

const evaluateRound: (theirHand: "A" | "B" | "C",  myHand: "X" | "Y" | "Z") => number = (theirHand, myHand) => {
  let myHandPoints = toPoints(myHand);
  const theirHandRPS = toRPS(theirHand);
  const myHandRPS = toRPS(myHand);
  console.log(`They play ${theirHandRPS} to my ${myHandRPS}`)

  // TIE
  if(theirHandRPS === myHandRPS) {
    console.log(`WE TIE THIS ROUND! (${myHandPoints} + 3)`)
    console.log("");
    return myHandPoints + 3;
  }
  
  // WIN
  if(
    theirHandRPS === "rock" && myHandRPS === "paper" ||
    theirHandRPS === "paper" && myHandRPS === "scissors" ||
    theirHandRPS === "scissors" && myHandRPS === "rock"
  ) {
    console.log(`I WIN ROUND!  (${myHandPoints} + 6)`)
    console.log("");
    return myHandPoints + 6;
  }
  else { // LOSE
    console.log(`I LOSE THIS ROUND! (${myHandPoints} + 0)`)
    console.log("");
    return myHandPoints + 0
  }

}

while(inputArr.length >= 4) {
  let newGame: iGame = {
    roundOne: inputArr.shift() as string,
    roundTwo: inputArr.shift() as string,
    roundThree: inputArr.shift() as string,
    roundOneScore: 0,
    roundTwoScore: 0,
    roundThreeScore: 0,
    gameScore: 0
  };

  newGame.roundOneScore = evaluateRound(newGame.roundOne.split(" ")[0] as "A" | "B" | "C", newGame.roundOne.split(" ")[1] as "X" | "Y" | "Z");
  newGame.roundTwoScore = evaluateRound(newGame.roundTwo.split(" ")[0] as "A" | "B" | "C", newGame.roundTwo.split(" ")[1] as "X" | "Y" | "Z");
  newGame.roundThreeScore = evaluateRound(newGame.roundThree.split(" ")[0] as "A" | "B" | "C", newGame.roundThree.split(" ")[1] as "X" | "Y" | "Z");
  newGame.gameScore = newGame.roundOneScore + newGame.roundTwoScore + newGame.roundThreeScore;

  console.log(newGame)

  games.push(newGame);
}

const sum = games.reduce((partial, game) => partial + game.gameScore, 0)

// console.log(games[0]);
console.log(`SUM: ${sum}`)