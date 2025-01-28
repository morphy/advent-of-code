
  function execute(input) {
    let acc = 0;
    let line = 1;
    let lastline;

    while(true) {
      if(input[line - 1].executed === 1) {
        console.log('Attempt to execute instruction', input[line - 1].instruction, 'on line', line, 'for the second time');
        console.log('Accumulator value is', acc);
        console.log('Lastline value is', lastline);
        console.log('Terminating process');
        return false;
      } else {
        input[line - 1].executed++;
      }

      if(input[line - 1].instruction === 'acc') {
        acc += parseInt(input[line - 1].argument);
        lastline = line;
        line++;
      } else if(input[line - 1].instruction === 'nop') {
        lastline = line;
        line++;
      } else if(input[line - 1].instruction === 'jmp') {
        lastline = line;
        line += parseInt(input[line - 1].argument);
      }

      if(line > input.length) {
        console.log('\nAccumulator value is', acc);
        console.log('Process terminated correctly');
        return true;
      }
    }
  }

  function zero(input) {
    input.forEach((value, index) => {
      input[index].executed = 0;
    });
  }

  const fs = require('fs');

  let input = fs.readFileSync('input.txt').toString().split('\n');

  input.forEach((value, index) => {
    let s = value.split(' ');

    input[index] = {
      instruction: s[0],
      argument: s[1],
      executed: 0
    }
  });

  let result = execute(input);
  console.log('Execution finished, result:', result);

  for (let i = 0; i < input.length; i++) {
    if(input[i].instruction === 'jmp') {
      input[i].instruction = 'nop';
      zero(input);
      console.log('Attempt on line', i+1, 'with instruction changed to nop');

      if(execute(input)) {
        console.log('Fix successful');
        break;
      } else {
        input[i].instruction = 'jmp';
        console.log('Execution failed');
      }
    } else if(input[i].instruction === 'nop') {
      input[i].instruction = 'jmp';
      console.log('Attempt on line', i+1, 'with instruction changed to jmp');

      if(execute(input)) {
        console.log('Fix successful');
        break;
      } else {
        input[i].instruction = 'nop';
        console.log('Execution failed');
      }
    }
  }

  console.log('Diagnosis finished');