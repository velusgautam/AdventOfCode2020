const fs = require('fs');

function getFileContents() {
  return fs.readFileSync(__dirname + '/input.txt', 'utf8').split('\n');
}

function getHashmapped(contents) {
  const hashMap = {};
  contents.forEach(function (d) {
    if (!hashMap[d]) {
      hashMap[d] = true;
    }
  });
  return hashMap;
}

function twoNumberSum(sum, contents) {
  contents = contents ?? getFileContents();
  const hashMap = getHashmapped(contents);

  let find = false,
    numbers = [],
    i = 0;
  while (!find && i < contents.length) {
    const key = sum - +contents[i];
    if (hashMap[key] === true) {
      numbers = [key, +contents[i]];
      find = true;
    }
    i = i + 1;
  }
  return numbers;
}

function threeNumberSum(sum) {
  const contents = getFileContents();
  let j = 0,
    find = false,
    numbers = [];
  while (find === false && j < contents.length) {
    const newSum = sum - +contents[j];
    const nums = twoNumberSum(newSum, contents);
    if (nums.length > 0) {
      const [one, two] = nums;
      numbers = [one, two, +contents[j]];
      find = true;
    }
    j = j + 1;
  }
  return numbers;
}

function part1(sum) {
  const [one, two] = twoNumberSum(sum);
  console.log(`Product of ${one} and ${two} is ${one * two}`);
}
function part2(sum) {
  const [one, two, three] = threeNumberSum(sum);
  console.log(`Product of ${one}, ${two} and ${three} is ${one * two * three}`);
}
part1(2020);
part2(2020);
