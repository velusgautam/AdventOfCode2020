const fs = require('fs');

// Reading file and making it into an array by splitting on new line
function getFileContents() {
  return fs.readFileSync(__dirname + '/input.txt', 'utf8').split('\n');
}

// Creating a Map of value and index for single lookup
function getHashmapped(contents) {
  const hashMap = new Map();
  contents.forEach(function (d, i) {
    if (!hashMap.has(d)) {
      hashMap.set(+d, i);
    }
  });
  return hashMap;
}
// Complexity of Function O(n)
// Two unique numbers that addup to the sum number
function twoNumberSum(sum, contents, hashMap) {
  // getting contents if the contents is not passed in
  contents = contents ?? getFileContents();

  // craeting hashMap if its not passed in
  hashMap = hashMap ?? getHashmapped(contents);

  let find = false, // if find is true exit the loop, dont want to search further
    numbers = [], // to save the find numbers
    indexes = [], // to save the index of finded numbers
    i = 0;

  // if find is false and i < length of contents only loop
  while (!find && i < contents.length) {
    // finding the other number by negating from the sum
    const key = sum - +contents[i];

    // checking if other number is in the hashmap with single lookup
    if (hashMap.has(key)) {
      // if number is found getting index of number in hashmap to check if its the same number
      const index = hashMap.get(key);

      // if index is not same then we find that 2 unique numbers add to the sum.
      if (index !== i) {
        numbers = [key, +contents[i]];

        // saving the index of finded numbers
        indexes = [index, i];

        // setting find to true to exit the loop.
        find = true;
      }
    }
    // incrementing i to go to next content in while loop
    i = i + 1;
  }
  // returning numbers and its indexes
  return { indexes, numbers };
}

// Complexity of Function O(n^2)
// Finding 3 unique numbers add upto the sum number
function threeNumberSum(sum) {
  // getting contents from file
  const contents = getFileContents();
  // creating a Map of contents
  const hashMap = getHashmapped(contents);

  let find = false, // if find is true exit the loop, dont want to search further
    numbers = [], // to save the find numbers
    indexes = [], // to save the index of finded numbers
    j = 0;

  while (find === false && j < contents.length) {
    // get the diffence to and get a newSum that can be computed as twoNumberSum
    const newSum = sum - +contents[j];
    // passing newSum contents and hashMap to twoNumberSum
    const { indexes: twoIndexes, numbers: nums } = twoNumberSum(
      newSum,
      contents,
      hashMap
    );
    // if we find a newSum can be combuted based on 2 numbers then we check if the any of that index is same
    // as the 3 rd number. If not then we proceed
    if (nums.length > 0 && twoIndexes.every((index) => index !== j)) {
      // getting the 2 numbers of sum
      const [one, two] = nums;
      // creating the 3 numbers that add upto the sum
      numbers = [one, two, +contents[j]];
      // creating the indexes of all 3 numbers found
      indexes = [twoIndexes[0], twoIndexes[1], j];
      // setting find true to exit the loop
      find = true;
    }

    j = j + 1;
  }
  return { numbers, indexes };
}

function part1(sum) {
  const {
    numbers: [one, two],
  } = twoNumberSum(sum);
  if (one && two) {
    console.log(`Product of ${one} and ${two} is ${one * two}`);
  } else {
    console.log(`No two number sum found for ${sum}`);
  }
}

function part2(sum) {
  const {
    indexes,
    numbers: [one, two, three],
  } = threeNumberSum(sum);
  console.log(indexes);
  if (one && two && three) {
    console.log(
      `Product of ${one}, ${two} and ${three} is ${one * two * three}`
    );
  } else {
    console.log(`No three number sum found for ${sum}`);
  }
}

part1(2020);
part2(2020);
