/**
 * MOST Web Framework 2.0 Codename Blueshift
 * Copyright (c) 2017, THEMOST LP All rights reserved
 *
 * Use of this source code is governed by an BSD-3-Clause license that can be
 * found in the LICENSE file at https://themost.io/license
 */
import {serve} from './serve';
import debug from 'debug';
import {app} from './app';
const log = debug('themost-framework:test');
(async function() {
    try {
        await serve(app, process.env.PORT, process.env.IP);
    }
    catch(err) {
        log(err);
        process.exit(1);
    }
})();
