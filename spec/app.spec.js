import {app, serve, getServerAddress} from '../modules/test/server';
import {promisify} from 'es6-promisify';
import {URL, URLSearchParams} from 'url';
import fetch from 'node-fetch';

describe('app', function () {

    it('should get app', () => {
        expect(app).toBeTruthy();
    });
    it('should serve app', async () => {
        // serve
        const server = await serve(app);
        expect(server).toBeTruthy();
        // get address info
        const addressInfo = server.address();
        expect(addressInfo).toBeTruthy();
        expect(addressInfo.address).toBeTruthy();
        expect(addressInfo.port).toBeTruthy();
        // close server
        await promisify(server.close).bind(server)();
    });
    it('should get /api/$metadata error', async () => {
        // serve
        const server = await serve(app);
        const base = getServerAddress(server);
        // get metadata
        const response = await fetch(new URL('/api/$metadata', base));
        expect(response).toBeTruthy();
        expect(response.ok).toBeFalsy();
        // close server
        await promisify(server.close).bind(server)();
    });

    it('should post /auth/token', async () => {
        // serve
        const server = await serve(app);
        const base = getServerAddress(server);
        // get metadata
        const response = await fetch(new URL('/auth/token', base), {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                client_id: '9165351833584149',
                client_secret: 'hTgqFBUhCfHs/quf/wnoB+UpDSfUusKA',
                username: 'alexis.rees@example.com',
                password: 'secret',
                grant_type: 'password',
                scope: 'profile'
            }).toString()
        });
        expect(response.ok).toBeTruthy();
        const body = await response.json();
        expect(body).toBeTruthy();
        // close server
        await promisify(server.close).bind(server)();
    });
    it('should post /auth/token_info', async () => {
        // serve
        const server = await serve(app);
        const base = getServerAddress(server);
        // get metadata
        let response = await fetch(new URL('/auth/token', base), {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                client_id: '9165351833584149',
                client_secret: 'hTgqFBUhCfHs/quf/wnoB+UpDSfUusKA',
                username: 'alexis.rees@example.com',
                password: 'secret',
                grant_type: 'password',
                scope: 'profile'
            }).toString()
        });
        expect(response.ok).toBeTruthy();
        const token = await response.json();
        expect(token).toBeTruthy();
        response = await fetch(new URL('/auth/token_info', base), {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Basic ${new Buffer('9165351833584149:hTgqFBUhCfHs/quf/wnoB+UpDSfUusKA').toString('base64')}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                token: token.access_token
            }).toString()
        });
        expect(response.ok).toBeTruthy();
        const token_info = await response.json();
        expect(token_info).toBeTruthy();
        expect(token_info.active).toBeTruthy();
        // close server
        await promisify(server.close).bind(server)();
    });

    it('should post /auth/me', async () => {
        // serve
        const server = await serve(app);
        const base = getServerAddress(server);
        // get metadata
        let response = await fetch(new URL('/auth/token', base), {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                client_id: '9165351833584149',
                client_secret: 'hTgqFBUhCfHs/quf/wnoB+UpDSfUusKA',
                username: 'alexis.rees@example.com',
                password: 'secret',
                grant_type: 'password',
                scope: 'profile'
            }).toString()
        });
        expect(response.ok).toBeTruthy();
        const token = await response.json();
        expect(token).toBeTruthy();
        response = await fetch(new URL('/auth/me', base), {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token.access_token}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        expect(response.ok).toBeTruthy();
        const me = await response.json();
        expect(me).toBeTruthy();
        expect(me.name).toBe('alexis.rees@example.com');
        // close server
        await promisify(server.close).bind(server)();
    });

});
