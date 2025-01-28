const fs = require('fs');

let expenses = fs.readFileSync('input.txt').toString().split("\n");


function find_and_multiply(sum, data) {
  let l = 0;
  let r = data.length - 1;
  data.sort();

  while(l < r) {
    if(+data[l] + +data[r] === sum) {
      return data[l] * data[r];
    }
    else if(+data[l] + +data[r] > sum) {
      r--;
    } else {
      l++;
    }
  }

  return 0;
}

console.log(find_and_multiply(2020, expenses));
