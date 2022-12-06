export const x = "";

const input: string = Deno.readTextFileSync("./src/05/input.txt");
const inputArr = input.split(`\n`);

// 1: "abcdefghijklm" --> A is on bottom, M is on top
let crateStacks = {
  // 0: [], // CRANE TEMP SPACE (eg. in the air)
  1: "WRF".split(''),
  2: "THMCDVWP".split(''), 
  3: "PMZNL".split(''),
  4: "JCHR".split(''),
  5: "CPGHQTB".split(''),
  6: "GCWLFZ".split(''),
  7: "WVLQZJGC".split(''),
  8: "PNRFWTVC".split(''),
  9: "JWHGRSV".split(''),
}

const stacksToString = (stack) => {
  console.log(stack[1].join(' '));
  console.log(stack[2].join(' '));
  console.log(stack[3].join(' '));
  console.log(stack[4].join(' '));
  console.log(stack[5].join(' '));
  console.log(stack[6].join(' '));
  console.log(stack[7].join(' '));
  console.log(stack[8].join(' '));
  console.log(stack[9].join(' '));
  console.log();
  console.log('TOP ITEMS:');
  console.log(
    stack[1][stack[1].length-1] + 
    stack[2][stack[2].length-1] + 
    stack[3][stack[3].length-1] + 
    stack[4][stack[4].length-1] + 
    stack[5][stack[5].length-1] + 
    stack[6][stack[6].length-1] + 
    stack[7][stack[7].length-1] + 
    stack[8][stack[8].length-1] + 
    stack[9][stack[9].length-1])
}

console.log(stacksToString(crateStacks));

let instructions = inputArr.map(itm => itm.split(' '));
// [1] = the number of crates to move
// [3] = the from column
// [5] = the to column
// console.log(inputArr.map(itm => itm.split(' ')));
// console.log(instructions);

const move = (numOfCrates: number, from: number, to: number) => {
  let fromString: string = crateStacks[from].join('');
  let toString: string = crateStacks[to].join('');

  let fromStringFirstHalf = fromString.substring(0, fromString.length - numOfCrates);
  let fromStringSecondHalf = fromString.substring(fromString.length - numOfCrates);

  toString = toString + fromStringSecondHalf;

  crateStacks[from] = fromStringFirstHalf.split('');
  crateStacks[to] = toString.split('');
}

instructions.forEach((instruction, index) => {
  let numOfCratesToMove = parseInt(instruction[1]);
  const from = parseInt(instruction[3]);
  const to = parseInt(instruction[5]);

  move(numOfCratesToMove, from, to);
});

console.log();
console.log('AFTER CONVERSION');
console.log();
console.log(stacksToString(crateStacks));