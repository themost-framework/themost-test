import {app} from '../modules/test/dist/server'
describe('app', function () {
    it('should get app', function () {
        expect(app).toBeTruthy();
    });
});
