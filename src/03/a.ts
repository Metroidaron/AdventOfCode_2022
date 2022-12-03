export const x = "";

const input: string = Deno.readTextFileSync("./src/03/input.txt");
const inputArr = input.split(`\n`);

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

// console.log(getLetterValue('Z'));
// console.log(splitContents(inputArr[0]));
// console.log(findTheDups('abcdefg', 'mnopcqrstufvwxyaz'))

let total = 0;

inputArr.forEach(ruckSack => {
  console.log('==========');

  const pockets = splitContents(ruckSack);
    console.log(pockets);
  const dups = findTheDups(pockets[0], pockets[1]);
    console.log(dups);
  const dupsVals = dups.map(temp => getLetterValue(temp));
  console.log(dupsVals);

  console.log(total);
  dupsVals.forEach(temp => total = total + temp);
});

console.log(total);