const fs = require('fs');
const server = require('http').createServer();

server.on('request', (req, res) => {
	// Solution 1 - naive solution. this is fine when handling small amounts
	// of data, but can be cumbersome when handling large amounts of data
	// fs.readFile('test-file.txt', (err, data) => {
	// 	if (err) {
	// 		console.log(err);
	// 	}
	// 	res.end(data);
	// });

	/* Solution 2: Using Streams - better solution but there's still a problem.
	  The problem is that fs.createReadStream is much faster than sending the
	  result with the response writable stream over the network. This will overwhelm
  	the response stream, cause it cannot handle so much incoming data.
	  This is called back pressure.
  */
	// const readable = fs.createReadStream('test-file.txt');
	// readable.on('data', chunk => {
	// 	res.write(chunk);
	// });
	// readable.on('end', () => {
	// 	res.end();
	// });
	// readable.on('error', err => {
	// 	console.log(err);
	// 	res.statusCode = 500;
	// 	res.end('File not found!');
	// });

	/*
  Solution 3: Using Pipes - 
  */
	const readable = fs.createReadStream('test-file.txt');
	// readableSource.pipe(writableDesination)
	readable.pipe(res);
});

server.listen(8000, '127.0.0.1', () => {
	console.log('Listening...');
});
