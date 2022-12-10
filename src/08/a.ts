export const x = "";

const input: string = Deno.readTextFileSync("./src/08/input.txt");
const inputArr = input.split(`\n`);
const strGrid: Array<Array<string>> = inputArr.map(i => i.split(''));
const numGrid: Array<Array<number>> = strGrid.map(a => a.map(b => parseInt(b)));
const output: Array<Array<string>> = JSON.parse(JSON.stringify(numGrid));

const visible = '█'; // Visible from the outside in some direction
const hidden = '░'; // Hidden from the outside in all directions

// Interprets inputs as a geometry based grid
// 0,0 being the crosshair
// 1, 1 being the top left (first-most) element in the grid
const getGrid = (x: number, y: number, gridInput: Array<Array<number>>) => {
  return gridInput[y-1][x-1];
}

const setGrid = (x: number, y: number, gridInput: Array<Array<any>>, value: any) => {
  gridInput[y][x] = value;
}

// console.log(getGrid(2, 1, grid))

const isObscured = (coordX: number, coordY: number) => {
  if(coordX === 1 || coordX === numGrid[0].length || coordY === 1 || coordY === numGrid.length) return visible;

}

numGrid.forEach((yVal, y) => {
  output.push([]);
  numGrid[0].forEach((xVal, x) => {
    getGrid(x+1, y+1, numGrid);
    if(isObscured(x, y)) {
      setGrid(x, y, output, hidden)
    } else {
      setGrid(x, y, output, visible)
    }

  });
});

console.log(output);