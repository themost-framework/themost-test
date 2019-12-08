/**
 * MOST Web Framework 2.0 Codename Blueshift
 * Copyright (c) 2017, THEMOST LP All rights reserved
 *
 * Use of this source code is governed by an BSD-3-Clause license that can be
 * found in the LICENSE file at https://themost.io/license
 */
import fetch from 'node-fetch';
import {URL, URLSearchParams} from 'url';
import {HttpError} from '@themost/common';
/**
 * @param {string} server_uri
 * @param {string} username
 * @param {string} password
 * @return {Promise<TokenResBody>}
 */
async function testAuthenticate(server_uri, username, password) {
    const response = await fetch(new URL('/auth/token', server_uri), {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            client_id: '9165351833584149',
            client_secret: 'hTgqFBUhCfHs/quf/wnoB+UpDSfUusKA',
            username: username,
            password: password,
            grant_type: 'password',
            scope: 'profile'
        }).toString()
    });
    if (response.ok) {
        return await response.json();
    }
    throw new HttpError(response.status);
}

export {testAuthenticate};
