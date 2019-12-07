import {app, serve, getServerAddress} from '../modules/test/server';
import {promisify} from 'es6-promisify';
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
    it('should get /api/$metadata app', async () => {
        // serve
        const server = await serve(app);
        const base = getServerAddress(server);
        // get metadata
        const response = await fetch(new URL('/api/$metadata', base));
        expect(response).toBeTruthy();
        expect(response.ok).toBeTruthy();
        const body = await response.text();
        expect(body).toBeTruthy();
        const contentType = response.headers.get('content-type');
        expect(contentType).toContain('application/xml');
        // close server
        await promisify(server.close).bind(server)();
    });
});
