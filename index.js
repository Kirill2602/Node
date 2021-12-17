const fs = require('fs');
const readline = require('readline');

const ACCESS_LOG = './access.log';
const IP_1_LOG = fs.createWriteStream( './IP_1.log');
const IP_2_LOG = fs.createWriteStream('./IP_2.log');
const IP_1 = '89.123.1.41';
const IP_2 = '34.48.240.111';

const readStream = fs.createReadStream(ACCESS_LOG);
const rl = readline.createInterface({
    input: readStream,
    terminal: true
})

rl.on('line', (line) => {
    if (line.includes(IP_1)) IP_1_LOG.write(line + '\n')
    if (line.includes(IP_2)) IP_2_LOG.write(line + '\n')
})