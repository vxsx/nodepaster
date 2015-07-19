#!/usr/bin/env node
// jshint esnext:true

import cli from 'cli';
import updateNotifier from 'update-notifier';
import Paster from './index.es5';
import pkg from './package.json';

// these are specific to dpaste.de, but
// engine theoretically allows for more
// there's also day-and-a-half (listed as month on the web)
// but it doesn't make much sense
const expirationTime = {
    onetime: 'onetime',
    hour: 3600,
    day: 86400,
    week: 604800
};

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
    type: ['t', 'Type of the snippet', 'string', 'python'],
    expires: ['e', 'Expiration time (onetime, hour, week)', 'string', 'week']
});

if (process.stdin.isTTY) {
    updateNotifier({ pkg: pkg }).notify({ defer: false });
    cli.getUsage();
} else {
    cli.withStdin((data) => {
        paster.upload(
            data,
            options.type,
            expirationTime[options.expires || 'week'] || options.expires
        );
    });
}
