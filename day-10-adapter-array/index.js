
  function check_sum(sum, data) {
    let l = 0;
    let r = data.length - 1;

    data.sort((a, b) => {
      return a - b;
    });

    while (l < r) {
      if (+data[l] + +data[r] === sum) {
        return true;
      } else if (+data[l] + +data[r] > sum) {
        r--;
      } else {
        l++;
      }
    }

    return false;
  }

  const fs = require('fs');

  let input = fs.readFileSync('input.txt').toString().split('\n');

  input.forEach((value, index) => {
    input[index] = parseInt(value);
  });

  input.sort((a, b) => {
    return a - b;
  });

  let start = 0;
  let ones = 0;
  let twos = 0;
  let threes = 0;

  for (let i = 0; i < input.length; i++) {
    switch (input[i] - start) {
      case 1:
        ones++;
        break;
      case 2:
        twos++;
        break;
      case 3:
        threes++;
        break;
    }

    start = input[i];
  }

  threes++;

  console.log(ones * threes);

  let deltas = new String();

  input.unshift(0);

  for (let i = 0; i < input.length-1; i++) {
    deltas += new String(input[i + 1] - input[i]);
  }

  let groups = deltas.split('3');
  let ways = 1;

  groups.forEach((v, i) => {
    if(v.length === 2) ways *= 2;
    if(v.length === 3) ways *= 4;
    if(v.length === 4) ways *= 7;
  });

  console.log(ways);