
  class Node {
    value;
    nodes;

    constructor(v) {
      this.value = v;
      this.nodes = Array()
    }

    get getValue() {
      return this.value;
    }

    get getNodes() {
      return this.nodes;
    }

    addNode(n) {
      this.nodes.push(n);
    }

    hasNodeWithValue(v) {
      let nodes = this.nodes.filter((element, _index, _self) => {
        if(element.getValue === v) return true;
        return false;
      });

      return nodes.length === 0 ? false : true;
    }

    addNodesToMatching(new_node, match_value) {
      this.nodes.forEach((_value, index) => {
        this.nodes[index].addNodesToMatching(new_node, match_value);
      });

      if(this.getValue === match_value && !this.hasNodeWithValue(new_node.getValue)) {
        this.addNode(new_node);
      }
    }

    findPathsToNodeWithValue(search_value, currentPath = '', paths = new Array()) {
      if(this.value === search_value) {
        paths.push(currentPath);
        currentPath = '';
      } else {
        this.nodes.forEach((v) => {
          v.findPathsToNodeWithValue(search_value, currentPath + '-' + v.value, paths);
        });
      }

      return paths;
    }
  }

  /* Process input */

  const fs = require('fs');

  let input = fs.readFileSync('input.txt')
    .toString()
    .replace(/\.| bags| bag/g, '')
    .split('\n');

  let rules = new Array();

  for (let line of input) {
    rules.push(line.split(' contain '));
  }

  rules.forEach((value, index) => {
    rules[index][1] = value[1].split(', ');

    rules[index][1].forEach((val, ind) => {
      if(val.split(' ').length !== 2) {
        rules[index][1][ind] = val.split(' ');
        rules[index][1][ind].shift();
        rules[index][1][ind] = rules[index][1][ind].join(' ');
      }
    });
  });

  /* Rewrite */

  let root = new Node(2137);

  rules.forEach((value, index) => {
    let outermost = true;

    for (let i = index+1; i < rules.length; i++) {
      if(rules[i][1].indexOf(value[0]) !== -1) {
        outermost = false;
      }
    }

    if(outermost && !root.hasNodeWithValue(value[0])) {
      root.addNode(new Node(value[0]));
    }
  });

  rules.forEach((value) => {
    value[1].forEach((v) => {
      root.addNodesToMatching(new Node(v), value[0]);
    });

    rules.forEach((v) => {
      v[1].forEach((val) => {
        root.addNodesToMatching(new Node(val), v[0]);
      });
    })
  });

  /* Search */

  function logNodes(n, prefix) {
    console.log(prefix, n.getValue);
    n.getNodes.forEach((value) => {
      logNodes(value, prefix + '-');
    });
  }

  let paths = root.findPathsToNodeWithValue('shiny gold');
  let sum = 0;
  let bags = new Array();

  paths.forEach((value) => {
    value = value.substring(1).split('-');
    value.pop();
    value.forEach((v) => {
      if(bags.indexOf(v) === -1) bags.push(v);
    });
  });

  console.log(paths);

  //console.log(bags);





