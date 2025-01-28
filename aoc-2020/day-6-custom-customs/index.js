
  function unique(str) {
    return str
      .split('')
      .filter((item, position, array) => {
        return array.indexOf(item) === position;
      })
      .join('');
  }

  function find_common(a, b) {
    let response = '';

    for (let char in a) {
      if(b.indexOf(a[char]) >= 0) response += a[char];
    }

    return response;
  }

  const fs = require('fs');

  let groups = fs.readFileSync('input.txt').toString().split("\n\n");
  let sum = 0;

  for (let x in groups) {
    sum += +unique(groups[x].split("\n").join('')).length;
    groups[x] = groups[x].split("\n");
  }

  let sum2 = 0;

  for (let x in groups) {
    let commons = groups[x][0];
    for (let i = 0; i < groups[x].length; i++) {
      commons = find_common(commons, groups[x][i]);
    }

    sum2 += commons.length;
  }

  console.log(sum2);