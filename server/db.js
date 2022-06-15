const Pool = require('pg').Pool;

var fs = require('fs');
var array;
array = fs.readFileSync('password.txt').toString().split("\n");
array[0]= array[0].substring(0,array[0].length-1);

const pool = new Pool({
  host: 'code.cs.uh.edu',
  user: array[0],
  password: array[1],
  port: 5432,
  database: 'COSC3380'
});

module.exports = pool;