
  const fs = require('fs');

  let trees = fs.readFileSync('input.txt').toString().split("\n");
  trees.pop();

  function count_trees(data, down, right) {
    let count = 0;
    let width = data[0].length;

    for (let i = 0; i < data.length; i+=down) {
      if(data[i][(right*i/down % width)] === '#') count++;
    }

    return count;
  }

  console.log(
    count_trees(trees, 1, 1)
    * count_trees(trees, 1, 3)
    * count_trees(trees, 1, 5)
    * count_trees(trees, 1, 7)
    * count_trees(trees, 2, 1)
  );
