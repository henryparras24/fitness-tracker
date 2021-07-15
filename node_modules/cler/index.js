const readline = require('readline');
const https = require('https');
const fs = require('fs');
const os = require('os');
// const url = require('url');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  crlfDelay: Infinity,
  prompt: '-> ',
  historySize: 100,
  removeHistoryDuplicates: true,
});

console.log('Hello! Paste links below.');

rl.prompt();

rl
.on('line', async link => {
	if (link === '') return rl.prompt();

	try {
		await download(link);
	} catch (err) {
		console.error(err);
	}

	rl.prompt();
})
.on('close', () => {
	console.log('\nBye, bye!')
});

async function download(link) {
	let downloadsFolder = '';

	const fileName = getFileName(link);

	// Mac os
	if (process.platform === 'darwin') {
		downloadsFolder = `${os.userInfo().homedir}/Downloads`;
	}

	const file = fs.createWriteStream(`${downloadsFolder}/${fileName}`);
	https.get(link, response => {
		response.pipe(file);
	});
}

function getFileName(link) {
  const pathname = new URL(link).pathname;
  const splittedPathname = pathname.split('/');

  return splittedPathname[splittedPathname.length-1];
}
