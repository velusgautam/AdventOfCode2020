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

function part1(sum) {
  const contents = getFileContents();
  const hashMap = getHashmapped(contents);

  let find = false,
    i = 0;
  while (!find && i < contents.length) {
    const key = sum - +contents[i];
    if (hashMap[key] === true) {
      console.log(
        `Product of ${key} and ${+contents[i]} is ${key * +contents[i]}`
      );
      find = true;
    }
    i = i + 1;
  }
}

function part2(sum) {
  const contents = getFileContents();
  const hashMap = getHashmapped(contents);

  let find = false;
  for (let j = 0; j < contents.length; j++) {
    let i = 0;
    while (!find && i < contents.length) {
      const key = sum - (+contents[i] + +contents[j]);
      if (hashMap[key] === true) {
        console.log(
          `Product of ${key} and ${+contents[i]} and ${+contents[j]} is ${
            key * +contents[i] * +contents[j]
          }`
        );
        find = true;
      }
      i = i + 1;
    }
  }
}

part1(2020);
part2(2020);
