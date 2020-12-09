const fs = require('fs');

let expenses = fs.readFileSync('input.txt').toString().split("\n");
expenses.pop();

function find_and_multiply(sum, data) {
  let l, m, r, mysum, direction;
  l = 0;
  m = Math.floor(data.length/2);
  r = data.length - 1;

  if(+data[l] + +data[m] + +data[r] < sum) {
    direction = 'r';
  } else {
    direction = 'l';
  }

  data.sort((a, b) => a - b);

  while((l < m) && (m < r)) {
    mysum = +data[l] + +data[m] + +data[r];

    if(mysum === sum) {
      return data[l] * data[m] * data[r];
    }
    else {
      if(mysum > sum) {
        if(m > l+1) {
          if(direction === 'l') {
            m--;
          } else {
            r--;
            direction = 'r';
          }
        } else {
          r--;
          direction = 'r';
        }
      } else {
        if(m < r-1) {
          if(direction === 'r') {
            m++;
          } else {
            l++;
            direction = 'l';
          }
        } else {
          l++;
          direction = 'l';
        }
      }
    }
  }

  return 0;
}

console.log(find_and_multiply(2020, expenses));
