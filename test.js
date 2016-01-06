import path from 'path';
import test from 'ava';
import execa from 'execa';
import tempfile from 'tempfile';
import pathExists from 'path-exists';

function exists(t, files) {
	[].concat(files).forEach(file => t.true(pathExists.sync(path.join(t.context.tmp, file))));
}

test.beforeEach(t => {
	t.context.tmp = tempfile();
});

test('error', async t => {
	await t.throws(execa('./cli.js'), /Please provide an input file/);
	await t.throws(execa('./cli.js', ['fixtures/icon.png']), /Please provide at least one platform/);
});

test('png input', async t => {
	await execa('./cli.js', ['fixtures/icon.png', '-p', 'android', '-o', t.context.tmp]);

	exists(t, [
		'drawable-ldpi-land/splash.9.png',
		'drawable-ldpi-port/splash.9.png'
	]);
});

test('svg input', async t => {
	await execa('./cli.js', ['fixtures/icon.svg', '-p', 'ios', '-o', t.context.tmp]);

	exists(t, [
		'Default~iphone.png',
		'Default@2x~iphone.png',
		'Default-Portrait~ipad.png'
	]);
});

test('multi platform', async t => {
	await execa('./cli.js', ['fixtures/icon.png', '-p', 'android', '-p', 'ios', '-o', t.context.tmp]);

	exists(t, [
		'android/drawable-ldpi-land/splash.9.png',
		'ios/Default~iphone.png'
	]);
});

test('no 9patch', async t => {
	await execa('./cli.js', ['fixtures/icon.png', '-p', 'android', '--no-9patch', '-o', t.context.tmp]);

	exists(t, [
		'drawable-ldpi-land/splash.png',
		'drawable-ldpi-port/splash.png'
	]);
});
