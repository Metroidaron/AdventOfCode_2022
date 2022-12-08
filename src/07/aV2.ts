export const x = "";

const input: string = Deno.readTextFileSync("./src/07/input.txt");
const inputArr = input.split(`\n`);

interface iFSObject {
  type: 'file' | 'directory'
  name: string;
}

interface iDirectory extends iFSObject {
  // children: Array<iDirectory | iFile>;
  children: { [key: string]: iDirectory | iFile }
}

interface iFile extends iFSObject {
  size: number;
}

let allUniqueDirectories: { [key: string]: number } = {};
let fileSystem: {[key: string]: iDirectory | iFile} = { '/': { type: 'directory', name: '/', children: {} }}
let path: string[] = [];
let currentDir = '';

const navigateFileSystem = (directory: string, currentFolder: iDirectory | undefined) => {
  if(currentFolder) {
    return currentFolder.children[directory] as iDirectory;
  } else {
    let x = fileSystem['/'] as iDirectory;
    return x.children[directory] as iDirectory;
  }
}

const addFile = (currentDirectory: iDirectory, newFile: string) => {
  let fileName = newFile.split(' ')[1];
  let fileSize = newFile.split(' ')[0];

  let file: iFile = {
    type: 'file',
    name: fileName,
    size: parseInt(fileSize),
  }

  currentDirectory.children[fileName] = file;
}

const addDirectory = (currentDirectory: iDirectory, newDirectory: string) => {
  let dirName = newDirectory.split(' ')[1];
  
  let directory: iDirectory = {
    type: 'directory',
    name: dirName,
    children: {}
  }
  
  currentDirectory.children[dirName] = directory;
  let key = path.join('|') + `|${dirName}`;
  allUniqueDirectories[key] = 0;
}

const sumDirChildrenSizeRecursively = (currentDir: iDirectory) => {
  let totalSize = 0;
  
  let keys = Object.keys(currentDir.children);
  keys.forEach((key) => {
    let dirChild = currentDir.children[key];
    if(dirChild.type === 'directory') {
      let size = sumDirChildrenSizeRecursively(dirChild as iDirectory);
      totalSize = totalSize + size;
    }

    if(dirChild.type === 'file') {
      totalSize = totalSize + (dirChild as iFile).size;
    }
  })
  return totalSize;
}

const interpret = (input: string) => {
  if(input.startsWith('$')) {
    // User Input
    if(input.startsWith('$ cd')) {
      if(input.split(' ')[2] === '..') {
        // GO UP a dir
        currentDir = path.pop() as string;
      } else {
        // GO INTO a dir
        currentDir = input.split(' ')[2]
        path.push(currentDir);
      }
    }
    
  } else {
    // Machine Output
    if(input.startsWith('$ ls')) {
      // LISTING Contents
      // We don't need to do anything here
      // our other Machine outputs will ingest the files and dirs
    }
    if(input.startsWith('dir ')) {
      // NESTED DIR
      let tempPath = [...path];
      tempPath.shift();
      let fileExplorer: iDirectory = fileSystem['/'] as iDirectory;

      while(tempPath.length > 0) {
        let next = tempPath.shift() as string;
        fileExplorer = navigateFileSystem(next, fileExplorer);
      }

      addDirectory(fileExplorer, input);
    } else {
      // NESTED FILE
      let tempPath = [...path];
      tempPath.shift();
      let fileExplorer: iDirectory = fileSystem['/'] as iDirectory;

      while(tempPath.length > 0) {
        let next = tempPath.shift() as string;
        fileExplorer = navigateFileSystem(next, fileExplorer);
      };

      addFile(fileExplorer, input);
    }
  }
}

// Iterate through input commands, convert to tree structure
inputArr.forEach(i => interpret(i));

let underTenK: { [key: string]: string } = {};

// Gather All Unique directories sizes and associate the sizes with the existing object
Object.keys(allUniqueDirectories).forEach(uniqueDirKey => {
  let tempDirPath = uniqueDirKey.split('|');
  tempDirPath.shift();
  let fileExplorer = fileSystem['/'] as iDirectory;

  while(tempDirPath.length > 0) {
    let next = tempDirPath.shift() as string;
    fileExplorer = navigateFileSystem(next, fileExplorer);
  }

  let sum = sumDirChildrenSizeRecursively(fileExplorer);
  allUniqueDirectories[uniqueDirKey] = sum;
  if(sum < 100000) {
    underTenK[uniqueDirKey] = sum;
  }
});

console.log(JSON.stringify(fileSystem));
console.log();

console.log('All Unique Directories');
console.log(allUniqueDirectories);
console.log();

console.log('All Unique Directories Under 100,000 bytes in size');
console.log(underTenK)
console.log();

console.log('Sum of All Unique Directories Under 100,000 bytes in size');
let sum = 0;
Object.keys(underTenK).forEach(k => {sum = sum + underTenK[k]})
console.log(sum)
console.log();

console.log('Sum of all Directories contents');
console.log(sumDirChildrenSizeRecursively(fileSystem['/']))
console.log();

Deno.writeTextFile("./src/07/output.json", JSON.stringify(fileSystem, undefined, 2));