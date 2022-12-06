export const x = "";

const input: string = Deno.readTextFileSync("./src/04/input.txt");
const inputArr = input.split(`\n`);
let groups: iGroup[] = [];

interface iGroup {
  one : string;
  oneStart: number;
  oneEnd: number;
  two : string;
  twoStart: number;
  twoEnd: number;
}

inputArr.forEach( input => {
  let temp1 = input.split(','); // ["1-1", "2-3"]

  let tempResult: iGroup = {
    one: temp1[0],
    oneStart: parseInt(temp1[0].split("-")[0], 0),
    oneEnd: parseInt(temp1[0].split("-")[1], 0),
    two: temp1[1],
    twoStart: parseInt(temp1[1].split("-")[0], 0),
    twoEnd: parseInt(temp1[1].split("-")[1], 0),
  }

  groups.push(tempResult);
});

let count = 0;

const visualizeGroup = (group: iGroup, groupIndex: number) => {
  // console.log('.'.repeat(100));
  // console.log('-'.repeat(100));
  // console.log('+'.repeat(100));

  let elfOne = ".".repeat(100).split('');
  let elfTwo = ".".repeat(100).split('');

  elfOne = elfOne.map((unused, campSiteIndex) => {
    if(campSiteIndex > group.oneStart && campSiteIndex < group.oneEnd) return '+';
    return unused;
  });

  elfTwo = elfTwo.map((unused, campSiteIndex) => {
    if(campSiteIndex > group.twoStart && campSiteIndex < group.twoEnd) return '+';
    return unused;
  });

  // console.log("GROUP #" + (groupIndex + 1));
  console.log(elfOne.join(''));
  console.log(elfTwo.join(''));
  console.log();
}

groups.forEach((group, index) => {
  let elf1TasksEcompasesElf2Tasks = false;
  let elf2TasksEcompasesElf1Tasks = false;
  // 1s < 2s and 1e > 2e = #1 encompases #2
  if(group.oneStart < group.twoStart && group.oneEnd > group.twoEnd) elf1TasksEcompasesElf2Tasks = true;

  // 1s > 2s and 1e < 2e = #2 encompases #1
  if(group.oneStart > group.twoStart && group.oneEnd < group.twoEnd) elf2TasksEcompasesElf1Tasks = true;

  if(elf1TasksEcompasesElf2Tasks) console.log('Elf 1 tasks cover Elf 2 tasks');
  if(elf2TasksEcompasesElf1Tasks) console.log('Elf 2 tasks cover Elf 1 tasks');
  console.log(group)
  visualizeGroup(group, index);
});

// groups.forEach((group, gIndex) => visualizeGroup(group, gIndex));

console.log(count)