const net = require('net');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin
})

const connection = net.createConnection({
  host: 'localhost',
  port: 3000
});

connection.setEncoding('utf-8');

connection.on('data', (data) => {
  console.log(data);
});

rl.on('line', (input) => {
  connection.write(`${input}\n`)
});