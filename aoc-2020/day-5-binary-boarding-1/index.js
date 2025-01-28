
  function decode(seat) {
    let row=127;

    for (let i = 0; i < 7; i++) {
      if(seat[i] === 'F') {
        row -= Math.pow(2, 6 - i);
      }
    }

    let col=7;

    for (let i = 0; i < 3; i++) {
      if(seat[i+7] === 'L') {
        col -= Math.pow(2, 2 - i);
      }
    }

    return col + row * 8;
  }

  const fs = require('fs');

  let passes = fs.readFileSync('input.txt').toString().split("\n");

  let max = 0;
  let id;

  for (let pass in passes) {
    id = decode(passes[pass]);
    if(id > max) max = id;
  }

  console.log(max);