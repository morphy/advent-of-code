
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

    return [col, row];
  }

  const fs = require('fs');

  let passes = fs.readFileSync('input.txt').toString().split("\n");

  let max = 0;
  let id;

  let p = Array();

  for (let pass in passes) {
    p.push(decode(passes[pass]));
  }

  p.sort((a, b) => {
    return (a[1] - b[1]) || (a[0] - b[0]);
  });

  if(p[p.length-1][0] !== 7) {
    let dels = p[p.length-1][0] + 1
    for (let i = 0; i < dels; i++) {
      p.pop();
    }
  }

  let m = p[0][1];

  for (let i = 0; i < 8; i++) {
    if(p[0][1] === m) {
      p.shift();
    }
  }

  let new_p = Array();

  for (let i = 0; i < p.length; i++) {
    if(typeof(new_p[p[i][1]]) === 'undefined') {
      new_p[p[i][1]] = new Array();
      new_p[p[i][1]].push(p[i][0]);
    } else {
      new_p[p[i][1]].push(p[i][0]);
    }
  }

  for (let pass in new_p) {
    if(new_p[pass].length !== 8) {
      for (let i = 0; i < 7; i++) {
        if(new_p[pass][i] !== i) {
          console.log(pass * 8 + i);
          break;
        }
      }
    }
  }