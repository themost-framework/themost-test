/**
 * MOST Web Framework 2.0 Codename Blueshift
 * Copyright (c) 2017, THEMOST LP All rights reserved
 *
 * Use of this source code is governed by an BSD-3-Clause license that can be
 * found in the LICENSE file at https://themost.io/license
 */
import http from 'http';
import {app} from './app';
import debug from 'debug';
// enable namespace
debug.enable('themost-framework:*');

const log = debug('themost-framework:test');
// normalize a port into a number, string, or false.
function normalizePort(val) {
    let port = parseInt(val, 10);
    if (isNaN(port)) {
        // named pipe
        return val;
    }
    if (port >= 0) {
        // port number
        return port;
    }
    return false;
}
// event listener for http server "error" event.
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }
    let bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            // eslint-disable-next-line no-console
            log(`${bind} requires elevated privileges`);
            process.exit(1);
            break;
        case 'EADDRINUSE':
            // eslint-disable-next-line no-console
            log('${bind} is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}
// event listener for http server "listening" event.
function onListening() {
    let addr = server.address();
    // eslint-disable-next-line no-console
    log(`Listening on ${addr.address}:${addr.port}`);
}
// get port from environment
let port = normalizePort(process.env.PORT);
// get bind address.
let host = process.env.IP || '127.0.0.1';
// noinspection JSUnresolvedFunction
let server = http.createServer(app);
// listen on provided port, on all network interfaces.
server.on('error', onError);
server.on('listening', onListening);
server.listen(port, host);
export {server};
