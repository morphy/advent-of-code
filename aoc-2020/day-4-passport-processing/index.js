
  function validate(p) {
    if(p.byr === null ||
      p.iyr === null ||
      p.eyr === null ||
      p.hgt === null ||
      p.hcl === null ||
      p.ecl === null ||
      p.pid === null
    ) {
      return false;
    }

    if(!(Number.isInteger(parseInt(p.byr)) && p.byr >= 1920 && p.byr <= 2002)) {
      return false;
    }

    if(!(Number.isInteger(parseInt(p.iyr)) && p.iyr >= 2010 && p.iyr <= 2020)) {
      return false;
    }

    if(!(Number.isInteger(parseInt(p.eyr)) && p.eyr >= 2020 && p.eyr <= 2030)) {
      return false;
    }

    let unit = p.hgt.substr(-2, 2);
    let height = p.hgt.slice(0, -2)

    if(
      !(
        (unit === 'cm' && height >= 150 && height <= 193) ||
        (unit === 'in' && height >= 59 && height <= 76)
      )
    ) {
      return false;
    }

    let regex = new RegExp("^#[0-9a-fA-F]{6}$");

    if(!regex.test(p.hcl)) {
      return false;
    }

    if(
      !(
        p.ecl === 'amb' ||
        p.ecl === 'blu' ||
        p.ecl === 'brn' ||
        p.ecl === 'gry' ||
        p.ecl === 'grn' ||
        p.ecl === 'hzl' ||
        p.ecl === 'oth'
      )
    ) {
      return false;
    }

    regex = new RegExp("^[0-9]{9}$");

    if(!regex.test(p.pid)) {
      return false;
    }

    return true;
  }

  const fs = require('fs');

  let pps = fs.readFileSync('input.txt').toString().split("\n\n");
  let passport_raw;
  let passport = new Object();
  let fields;
  let sum = 0;

  for (let line in pps) {
    passport.byr = null;
    passport.iyr = null;
    passport.eyr = null;
    passport.hgt = null;
    passport.hcl = null;
    passport.ecl = null;
    passport.pid = null;
    passport.cid = null;
    passport_raw = pps[line].replaceAll('\n', ' ').split(' ');

    for (let f in passport_raw) {
      fields = passport_raw[f].split(':');

      if(passport.hasOwnProperty(fields[0])) passport[fields[0]] = fields[1];
    }

    if(validate(passport)) sum ++;

    /*if(passport.byr != null &&
      passport.iyr != null &&
      passport.eyr != null &&
      passport.hgt != null &&
      passport.hcl != null &&
      passport.ecl != null &&
      passport.pid != null
    ) {
      sum++;
    }*/
  }

  console.log(sum);