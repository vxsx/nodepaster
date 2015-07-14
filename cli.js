#!/usr/bin/env node
// jshint esnext:true

import cli from 'cli';
import updateNotifier from 'update-notifier';
import paster from './index.es5';
import pkg from './package.json';

updateNotifier({ pkg: pkg }).notify();

cli.enable('version');

const options = cli.parse({
    type: ['t', 'Type of the snippet', 'string', 'python']
});

cli.withStdin((data) => {
    paster.upload(data, options.type);
});
