export const x = "";

const input: string = Deno.readTextFileSync("./src/07/sampleInput.txt");
const inputArr = input.split(`\n`);
// console.log(inputArr);
// inputArr.forEach(i => console.log(i));

let memoryPath = '';
let files: string[] = [];
let dirSizes: { [key: string]: number; } = {};

const interpret = (input: string) => {
  if(input.startsWith('$')) {
    // User Input
    if(input.startsWith('$ cd')) {
      if(input.split(' ')[2] === '..') {
        let tempArr = memoryPath.split('/');
        tempArr.pop();
        memoryPath = tempArr.join('/');
      } else {
        // console.log(input.split(' '));
        memoryPath = memoryPath + input.split(' ')[2] + (input.split(' ')[2] === '/' ? '' : '/');
      }
    }
    
    if(input.startsWith('$ ls')) {
      
    }
    
  } else {
    // Machine Output
    if(input.startsWith('dir ')) {
      
    } else {
      // We assume we're listing a file 
      let filePath = memoryPath + input.split(' ')[1] + ' ' + input.split(' ')[0];
      // console.log(input.split(' ')[1])
      // console.log(memoryPath)
      files.push(filePath);
    }
  }
}

inputArr.forEach(i => {
  interpret(i);
  // console.log(memoryPath);
});

files = files.sort();

// files.forEach(file => { console.log(file) })

// Adds up the files in the dir and 
files.forEach(file => {
  let filePath = file.split(' ')[0];
  let filePathArr = filePath.split('/')
  let fileSize = parseInt(file.split(' ')[1]);
  let dirPath = filePathArr.slice(0, filePathArr.length-1);
  let curDir = dirPath[dirPath.length - 1];

  let dirPathString = dirPath.join('/');

  let x = dirSizes[dirPathString];
  x = x ? x : 0;
  dirSizes[dirPathString] = x + fileSize;
})

// add in subsiquent dirs into the current dir size
Object.keys(dirSizes).forEach(dirSizesKey => {
  let size = dirSizes[dirSizesKey];

  Object.keys(dirSizes).forEach(dirSizesKey2 => {
    if(dirSizesKey2.startsWith(dirSizesKey) && dirSizesKey2 !== dirSizesKey) {
      size = size + dirSizes[dirSizesKey2];
      console.log(`Adding ${dirSizesKey2} size into ${dirSizesKey}`)
    }
  })
})

// console.log(files);
console.log(dirSizes);

let total = 0;
Object.keys(dirSizes).forEach(dirKey => {
  if(dirSizes[dirKey] < 100000) {
    // console.log(dirKey + ' '+ dirSizes[dirKey]);
    total = total + dirSizes[dirKey];
  }
});

console.log(total);