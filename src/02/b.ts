export const x = "";

const input: string = Deno.readTextFileSync("./src/02/input.txt");
const inputArr = input.split(`\n`);

// A = Rock (1pt)
// B = Paper (2pt)
// C = Scissors (3pt)

// X = lose (0pt)
// Y = tie (3pt)
// Z = win (6pt)

const toRPS: (i: "A" | "B" | "C") => "rock" | "paper" | "scissors" = (i) => {
  switch(i) {
    case "A" : return "rock";
    case "B" : return "paper";
    case "C" : return "scissors";
  }
}

const toLTW: (i: "X" | "Y" | "Z") => "lose" | "tie" | "win" = (i) => {
  switch(i) {
    case "X" : return "lose";
    case "Y" : return "tie";
    case "Z" : return "win";
  }
}

const determineMyHand = (theyThrow: "A" | "B" | "C", iNeedTo: "X" | "Y" | "Z") => {
  let myHand: "A" | "B" | "C" = "A";

  if(iNeedTo === "X") { // I need to Lose
    if(theyThrow === "A") myHand = "C";
    if(theyThrow === "B") myHand = "A";
    if(theyThrow === "C") myHand = "B"; 
  }

  if(iNeedTo === "Y") { // I need to Tie
    if(theyThrow === "A") myHand = "A";
    if(theyThrow === "B") myHand = "B";
    if(theyThrow === "C") myHand = "C"; 
  }

  if(iNeedTo === "Z") { // I need to Win
    if(theyThrow === "A") myHand = "B";
    if(theyThrow === "B") myHand = "C";
    if(theyThrow === "C") myHand = "A"; 
  }

  console.log(`They Throw ${toRPS(theyThrow)} and I throw ${toRPS(myHand)} so I should ${toLTW(iNeedTo)}`)
  return myHand;
}

const calculateScore = (myHand: "A" | "B" | "C", roundResult: "X" | "Y" | "Z") => {
  let score = 0;

  switch(myHand) {
    case "A" : score = score + 1; break;
    case "B" : score = score + 2; break;
    case "C" : score = score + 3; break;
  };

  switch(roundResult) {
    case "X" : score = score + 0; break;
    case "Y" : score = score + 3; break;
    case "Z" : score = score + 6; break;
  };

  return score;
}

let totalScore = 0;

inputArr.forEach((round, index) => {
  const theirHand = round.split(" ")[0] as "A" | "B" | "C";
  const resultGoal = round.split(" ")[1] as "X" | "Y" | "Z";

  const myHand = determineMyHand(theirHand, resultGoal);
  const score = calculateScore(myHand, resultGoal);
  totalScore = totalScore + score;
});

console.log(`Total Score: ${totalScore}`);