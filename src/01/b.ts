export const x = "";

interface elf {
  id: number;
  totalCalories: number;
  totalSnacks: number;
};

const input: string = Deno.readTextFileSync("./src/01/input.txt");

let arr = input.split(`\n\n`);

const elfs: elf[] = arr.map((snacks, index) => {
  const arrSnacks = snacks.split("\n");
  const calSum = arrSnacks.reduce((partial, a) => parseInt(partial) + parseInt(a), 0);

  return {
    id: index,
    totalCalories: Number(calSum),
    totalSnacks: arrSnacks.length
  }
})

function sorter(a: elf, b: elf) {
  return b.totalCalories - a.totalCalories;
}

const sortedElfs = elfs.sort(sorter);

console.log(sortedElfs[0].totalCalories + sortedElfs[1].totalCalories + sortedElfs[2].totalCalories);