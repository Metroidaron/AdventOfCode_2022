export const x = "";

const input: string = Deno.readTextFileSync("./src/06/input.txt");
const inputArr = input.split(`\n`);
console.log(`Testing ${inputArr}`)

const checkForMarker = ((possibleMarker: string, cursor: number) => {
  let a = possibleMarker.split('');
  let flagged = false;

  a.forEach((a1, index1) => {
    a.forEach((a2, index2) => {
      console.log(`${(cursor)}. Comparing ${a1} to ${a2} out of ${a}; Current Flag Status = ${flagged ? 'True' : 'False'} ${(a1 === a2 && index1 !== index2) ? '<-- MATCHING DETECTED' : ''}`)
      if(a1 === a2 && index1 !== index2) flagged = true;
    });
  });

  return !flagged;
})

let cursor = 0;
while(input.length - 14 > cursor) {
  let isMarker = checkForMarker(input.substring(cursor, cursor + 14), cursor);
  if(isMarker) {
    console.log(`Marker Found (${input.substring(cursor, cursor + 14)}) End Of Marker and start of Message: ${cursor + 14}`);
    break;
  }

  cursor = cursor + 1;
}