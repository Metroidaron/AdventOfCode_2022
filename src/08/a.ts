export const x = "";

const input: string = Deno.readTextFileSync("./src/08/input.txt");
const inputArr = input.split(`\n`);
const strGrid: Array<Array<string>> = inputArr.map(i => i.split(''));
const numGrid: Array<Array<number>> = strGrid.map(a => a.map(b => parseInt(b)));
const output: Array<Array<string>> = JSON.parse(JSON.stringify(numGrid));

// const visible = '█'; // Visible from the outside in some direction
const hidden = '░'; // Hidden from the outside in all directions
const visible = 'V'; // Visible from the outside in some direction
// const hidden = 'H'; // Hidden from the outside in all directions

const writeGridToOutput = () => {
  let o = '';

  numGrid.forEach((yVal, y) => {
    numGrid[0].forEach((xVal, x) => {
      let n = getGrid(x+1, y+1, output);
      o = o + n;
    });
    o = o + `\r`;
  });

  Deno.writeTextFile('./src/08/output.txt', o)
}

// Interprets inputs as a geometry based grid
// 0,0 being the crosshair
// 1, 1 being the top left (first-most) element in the grid
const getGrid = (x: number, y: number, gridInput: Array<Array<number | string>>) => {
  return gridInput[y-1][x-1];
}

const setGrid = (x: number, y: number, gridInput: Array<Array<any>>, value: any) => {
  gridInput[y][x] = value;
}

// console.log(getGrid(2, 1, grid))

const isObscured = (coordX: number, coordY: number) => {
  if(coordX === 0 || coordX === numGrid[0].length-1 || coordY === 0 || coordY === numGrid.length-1) return visible;

  const currentPoint = getGrid(coordX, coordY, numGrid);

  // Check to the left of the primary coord
  let XToLeft = coordX - 1;
  console.log('Checking to the left');
  while(XToLeft > -1) {
    let PointToLeft = getGrid(XToLeft, coordY, numGrid);
    if(currentPoint > PointToLeft) {
      // console.log(' ' + currentPoint + ' ' + PointToLeft);
      return true;
    }
    XToLeft = XToLeft - 1;
  }

  // Check below the primary coord
  let YToRight = coordY + 1;
  console.log('Checking to the right');
  while(YToRight < 99) {
    let PointToRight = getGrid(coordX, YToRight, numGrid);
    if(currentPoint > PointToRight) {
      return true;
    }
    YToRight = YToRight + 1;
  }

  // Check above the primary coord
  let 

  return false;
}

numGrid.forEach((yVal, y) => {
  output.push([]);
  numGrid[0].forEach((xVal, x) => {
    getGrid(x+1, y+1, numGrid);
    if(isObscured(x, y)) {
      setGrid(x, y, output, visible)
    } else {
      setGrid(x, y, output, hidden)
    }
  });
});

// console.log(output);
writeGridToOutput();