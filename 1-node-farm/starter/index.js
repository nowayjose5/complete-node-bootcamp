const fs = require('fs');

// // Blocking, synchronous way
// // read file input.txt and display content to console 
// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
// console.log(textIn);
// // wrote content to a file and saved it as output.txt
// const textOut = `This is what we know about the avacado: ${textIn}.\nCreated on ${Date.now()}`;
// fs.writeFileSync('./txt/output.txt', textOut);
// console.log('File has been written!');

// Non-blocking, asynchronous way
fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
  if (err) {
    return console.log('ERROR!!!');
  }
  fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
    console.log(data2);
    fs.readFile(`./txt/append.txt`, 'utf-8', (err, data3) => {
      console.log(data3);

      fs.writeFile('./txt/final.txt', `${data2}\n${data3}`, 'utf-8', err => {
        console.log('Your file has been wrriten!!');
      });
    });
  });
});
console.log('Will read file!');