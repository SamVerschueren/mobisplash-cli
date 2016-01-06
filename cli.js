#!/usr/bin/env node
'use strict';
const path = require('path');
const meow = require('meow');
const updateNotifier = require('update-notifier');
const mobisplash = require('mobisplash');
const logSymbols = require('log-symbols');
const chalk = require('chalk');
const objClean = require('obj-clean');

const cli = meow(`
	Usage
	  $ mobisplash <file>

	Options
	  -p, --platform      Platform to generate icons for
	  -b, --background    Color of the icon background if the icon is transparant [Default: white]
	  -r, --contentRatio  Logo-icon ratio [Default: 0.8]
	  -o, --out           Output directory [Default: cwd]
	  --orientation       Orientation to generate the splash screens for [Default: both]
	  --9patch            9-patch the Android splash screens [Default: true]

	Examples
	  $ mobisplash icon.png -p=android
	    ✔  success
	  $ mobisplash icon.png -p=android --no-9patch
	    ✔  success
	  $ mobisplash icon.png -p=android -p=ios --orientation=landscape
	    ✔  success
	  $ mobisplash icon.svg -p=ios -o=resources
	    ✔  success
	  $ mobisplash icon.svg -p=blackberry10 -o=resources --orientation=portrait
	    ✔  success
`, {
	string: ['_'],
	boolean: ['9patch'],
	alias: {
		p: 'platform',
		b: 'background',
		r: 'contentRatio',
		o: 'out'
	},
	default: {
		'9patch': true
	}
});

updateNotifier({pkg: cli.pkg}).notify();

if (cli.input.length === 0) {
	console.error('Please provide an input file.');
	process.exit(1);
}

if (!cli.flags.platform) {
	console.error('Please provide at least one platform.');
	process.exit(1);
}

const platforms = [].concat(cli.flags.platform);

Promise.all(platforms.map(platform => {
	let dest = cli.flags.out;

	if (platforms.length > 1) {
		dest = path.join(dest, platform);
	}

	const opts = objClean({
		platform,
		dest,
		background: cli.flags.background,
		contentRatio: cli.flags.contentRatio,
		orientation: cli.flags.orientation,
		draw9patch: cli.flags['9patch']
	});

	return mobisplash(cli.input[0], opts);
})).then(() => {
	console.log(`  ${logSymbols.success}  success`);
}).catch(err => {
	console.log(`  ${logSymbols.error} ${chalk.bold.red('error')}  ${err.message}`);
});
