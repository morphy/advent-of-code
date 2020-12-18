
  function check_sum(sum, data) {
    let l = 0;
    let r = data.length - 1;

    data.sort((a, b) => {
      return a - b;
    });

    while(l < r) {
      if(+data[l] + +data[r] === sum) {
        return true;
      } else if(+data[l] + +data[r] > sum) {
        r--;
      } else {
        l++;
      }
    }

    return false;
  }

  function find_sub(sum, input) {
    for (let i = 0; i < input.length; i++) {
      let s = input[i];

      for (let j = i + 1; j < input.length; j++) {
        s += input[j];

        if(s === sum) return input.slice(i, j + 1);

        if(s > sum) break;
      }
    }

    return false;
  }

  const fs = require('fs');

  let input = fs.readFileSync('input.txt').toString().split('\n');

  input.forEach((value, index) => {
    input[index] = parseInt(value);
  });

  let error;

  for (let i = 25; i < input.length; i++) {
    let pre = input.slice(i - 25, i);

    if(!check_sum(input[i], pre)) {
      error = input[i];
      break;
    }
  }

  console.log(error);

  let sub = find_sub(error, input).sort((a, b) => {
    return a - b;
  });

  console.log(sub[0] + sub[sub.length - 1]);