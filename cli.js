#!/usr/bin/env node
// jshint esnext:true

import cli from 'cli';
import paster from './index.es5';

const options = cli.parse({
    type: ['t', 'Type of the snippet', 'string', 'python']
});

cli.withStdin((data) => {
    paster.upload(data, options.type);
});
