export const x = "";

const input: string = Deno.readTextFileSync("./src/06/input.txt");
const inputArr = input.split(`\n`);
console.log(`Testing ${inputArr}`)

const checkForMarker = ((possibleMarker: string) => {
  let a = possibleMarker.split('');

  if(a[0] !== a[1] && a[0] !== a[2] && a[0] !== a[3]) {
    if(a[1] !== a[2] && a[1] !== a[3]) {
      if(a[2] !== a[3]) {
        return true
      }
    }
  }

  return false
})

let cursor = 0;
while(input.length - 4 > cursor) {
  let isMarker = checkForMarker(input.substring(cursor, cursor + 4));
  if(isMarker) {
    console.log(`Marker Found (${input.substring(cursor, cursor + 4)}) End Of Marker and start of Message: ${cursor + 4}`);
    break;
  }

  cursor = cursor + 1;
}