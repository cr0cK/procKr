#!/usr/bin/env node

/**
 * This file is the procKr cli.
 *
 * Usage examples:
 * $ procKr start
 * $ procKr add-target 4000 http://jsonplaceholder.typicode.com jsonplaceholder
 * $ procKr list-targets
 * $ procKr enable-target jsonplaceholder
 * $ procKr mock-target jsonplaceholder
 *
 * See README.md for more informations.
 */

'use strict';

var program   = require('commander');

var //fs        = require('fs'),
    program      = require('commander'),
    procKr       = require('../procKr'),
    logHdlr      = require('./handler/log')(),
    alertHdlr    = require('./handler/alert')(),
    targetHdlr   = require('./handler/target')(),
    log          = function () { console.log.apply(this, arguments); };

// @FIxME
// program.version(JSON.parse(fs.readFileSync('package.json')).version);
program.version('0.0.1');

program
  .command('start')
  .description('Start the daemon.')
  .action(function () {
    procKr.start().then(logHdlr.log, alertHdlr.error);
  });

program
  .command('stop')
  .description('Stop procKr daemon.')
  .action(function () {
    procKr.stop().then(logHdlr.log, alertHdlr.error);
  });

program
  .command('status')
  .description('Check procKr status.')
  .action(function () {
    procKr.status().then(logHdlr.log, alertHdlr.error);
  });

program
  .command('hello')
  .description('Say hello to procKr to test websocket connexion.')
  .action(function () {
    procKr.sayHello().then(logHdlr.log, alertHdlr.error);
  });

program
  .command('start-http')
  .description('Start the procKr http server.')
  .action(function () {
    procKr.startHttp().then(logHdlr.log, alertHdlr.error);
  });

program
  .command('stop-http')
  .description('Stop the procKr http server.')
  .action(function () {
    procKr.stopHttp().then(logHdlr.log, alertHdlr.error);
  });

program
  .command('list-targets')
  .description('List the targets.')
  .action(function () {
    procKr.listTargets().then(targetHdlr.list, alertHdlr.error);
  });

program
  .command('add-target <port> <url>')
  .description('Add a target. Port is a number between 1 and 9999.')
  .action(function (port, url) {
    procKr.addTarget(port, url).then(targetHdlr.list, alertHdlr.error);
  });

program
  .command('remove-target <id>')
  .description('Remove a target.')
  .action(function (id) {
    procKr.removeTarget(id).then(targetHdlr.list, alertHdlr.error);
  });

program.parse(process.argv);

if (!program.args.length) {
  log(program.helpInformation());
  process.exit();
}
