#!/usr/bin/env node
// jshint esnext:true

import cli from 'cli';
import updateNotifier from 'update-notifier';
import Paster from './index.es5';
import pkg from './package.json';

const paster = new Paster('https://dpaste.de/api/', {
    onBeforeUpload() {
        if (process.stdout.isTTY) {
            cli.spinner('Uploading...');
        }
    },
    onBeforeSuccess() {
        if (process.stdout.isTTY) {
            cli.spinner('', true);
        }
    },
    onFail() {
        cli.spinner('Sorry, there was a connection error.', true);
    }
});

cli.setApp('dpaster', pkg.version);
cli.enable('version');
cli.setUsage('echo "Output" | dpaster [OPTIONS]');

const options = cli.parse({
    type: ['t', 'Type of the snippet', 'string', 'python']
});

if (process.stdin.isTTY) {
    updateNotifier({ pkg: pkg }).notify({ defer: false });
    cli.getUsage();
} else {
    cli.withStdin((data) => {
        paster.upload(data, options.type);
    });
}
