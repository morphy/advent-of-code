
  function fourier(x, t) {

    return (1 / x) * Math.sin(x*2*Math.PI*t)

  }

  let sum;
  let res = Array();

  for (let i = 0; i < 10; i += 0.01) {
    sum = 0;

    for (let n = 1; n < 50; n+=2) {
      sum += fourier(n, i);
    }

    console.log(sum);
    res.push(sum);
  }

  console.log(res);