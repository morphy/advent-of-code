const fs = require('fs');

let expenses = fs.readFileSync('input.txt').toString().split("\n");
expenses.pop();

function is_good(pass, char, min, max) {
  if(
    (pass[min-1] === char && pass[max-1] !== char) ||
    (pass[min-1] !== char && pass[max-1] === char)
  ) return true;

  return false;
}

let data, amounts, sum = 0;

for (let i = 0; i < expenses.length; i++) {
  data = expenses[i].split(' ');
  amounts = data[0].split('-');

  if(is_good(data[2], data[1].replace(':', ''), amounts[0], amounts[1])) sum++;
}

console.log(sum);
