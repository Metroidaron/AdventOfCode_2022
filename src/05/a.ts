export const x = "";

const input: string = Deno.readTextFileSync("./src/05/input.txt");
const inputArr = input.split(`\n`);

// 1: "abcdefghijklm" --> A is on bottom, M is on top
let crateStacks = {
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

const stacksToString = () => {
  console.log(crateStacks[1].join(' '));
  console.log(crateStacks[2].join(' '));
  console.log(crateStacks[3].join(' '));
  console.log(crateStacks[4].join(' '));
  console.log(crateStacks[5].join(' '));
  console.log(crateStacks[6].join(' '));
  console.log(crateStacks[7].join(' '));
  console.log(crateStacks[8].join(' '));
  console.log(crateStacks[9].join(' '));
}

console.log(stacksToString());

let instructions = inputArr.map(itm => itm.split(' '));
// [1] = the number of crates to move
// [3] = the from column
// [5] = the to column
// console.log(inputArr.map(itm => itm.split(' ')));
// console.log(instructions);

const move = (from: number, to: number) => {
  let crane = "";
  crane = crateStacks[from].pop();
  crateStacks[to].push(crane);
}

instructions.forEach((instruction, index) => {
  let numOfCratesToMove = parseInt(instruction[1]);
  const from = parseInt(instruction[3]);
  const to = parseInt(instruction[5]);

  while(numOfCratesToMove > 0) {
    move(from, to);
    numOfCratesToMove = numOfCratesToMove - 1;
  }
})

// console.log(crateStacks)
// await Deno.writeTextFile("./src/05/output.txt", crateStacks.)

console.log('AFTER CONVERSION');
console.log(stacksToString());

// cvcwcrtvq
// CVCWCRTVQ