export const x = "";

const input: string = Deno.readTextFileSync("./src/03/input.txt");
const inputArr = input.split(`\n`);

interface iGroup {
  1 : string;
  2 : string;
  3 : string;
}

const alphabetLower = 'abcdefghijklmnopqrstuvwxyz'; // 1-26
const alphabetUpper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'; // 27-52
const alphabetJoinedArr = (alphabetLower + alphabetUpper).split('');

// returns a number value for the input letter
const getLetterValue = (letter: string) => {
  let letterValue = alphabetJoinedArr.findIndex((value, index, obj) => {
    if(value === letter) return true;
  });

  return letterValue + 1;
}

// Returns an array of two items
const splitContents = (allRuckSackContents: string) => [
  allRuckSackContents.substring(0, allRuckSackContents.length / 2), 
  allRuckSackContents.substring(allRuckSackContents.length / 2)
];

// Returns an array of letters (Array in case there are multiple duplicates)
const findTheDups = (a: string, b: string) => {
  let results: string[] = [];

  a.split('').forEach((aLetter) => {
    b.split('').forEach((bLetter) => {
      if(aLetter === bLetter) results.push(aLetter);
    });
  });

  const uniqueResults = [...new Set(results)];
  return uniqueResults;
}

// Returns the ID carried by all three elfs
const findTheIdBadge = (a: string, b: string, c: string) => {
  let response = 'a';

  a.split('').forEach(aLetter => {
    b.split('').forEach(bLetter => {
      c.split('').forEach(cLetter => {
        if(aLetter === bLetter && bLetter === cLetter) response = aLetter;
      });
    });
  });

  return response;
}

// console.log(getLetterValue('Z'));
// console.log(splitContents(inputArr[0]));
// console.log(findTheDups('abcdefg', 'mnopcqrstufvwxyaz'))

let total = 0;
let groups: iGroup[] = [];

while(inputArr.length > 0) {
  const newGroup: iGroup = {
    1: inputArr.shift() as string,
    2: inputArr.shift() as string,
    3: inputArr.shift() as string
  };

  groups.push(newGroup);
}

groups.forEach(g => {
  const badge = findTheIdBadge(g[1], g[2], g[3]);
  const val = getLetterValue(badge);

  console.log(badge + ` (${val})`);

  total = total + val
});


console.log(total);