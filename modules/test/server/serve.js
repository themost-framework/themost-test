/**
 * MOST Web Framework 2.0 Codename Blueshift
 * Copyright (c) 2017, THEMOST LP All rights reserved
 *
 * Use of this source code is governed by an BSD-3-Clause license that can be
 * found in the LICENSE file at https://themost.io/license
 */
import http from 'http';
import debug from 'debug';
import {Args} from '@themost/common';

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
// noinspection JSUnusedGlobalSymbols
/**
 *
 * @param {Application} app
 * @param {*=} port
 * @param {*=} host
 * @return Promise<Server>
 */
export function serve(app, port, host) {

    return new Promise((resolve, reject) => {
        // get port from environment
        let _port = normalizePort(port);
        // get bind address.
        let _host = host || '127.0.0.1';
        // noinspection JSUnresolvedFunction
        let server = http.createServer(app);
        // listen on provided port, on all network interfaces.
        server.on('error', err => {
            return reject(err);
            });
        server.on('close', () => {
            log(`Stopping the test api server from accepting new connections.`);
        });
        server.on('listening', () => {
            let addr = server.address();
            // eslint-disable-next-line no-console
            log(`Test api server starts listening on http://${addr.address}:${addr.port}`);
            return resolve(server);
        });
        server.listen(_port, _host);
    });
}

// noinspection JSUnusedGlobalSymbols
/**
 * @param {Server} server
 * @return {string}
 */
export function getServerAddress(server) {
    Args.notNull(server, 'server');
    // noinspection JSUnresolvedFunction
    const addressInfo = server.address();
    return `http://${addressInfo.address}:${addressInfo.port}/`;
}

