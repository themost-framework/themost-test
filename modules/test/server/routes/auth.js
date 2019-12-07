/**
 * MOST Web Framework 2.0 Codename Blueshift
 * Copyright (c) 2017, THEMOST LP All rights reserved
 *
 * Use of this source code is governed by an BSD-3-Clause license that can be
 * found in the LICENSE file at https://themost.io/license
 */
import express from 'express';
import {Args, HttpBadRequestError, HttpForbiddenError, HttpNotFoundError, HttpUnauthorizedError} from '@themost/common';
const User = require('../models/user-model');

/**
 * @param {Authenticator} passport
 */
function authorize(passport) {

}

/**
 *
 */
function authRouter() {
    let router = express.Router();

    router.post('/token', async function postToken (req, res, next) {
        try {
            // noinspection JSValidateTypes
            /**
             * @type {TokenReqBody}
             */
            const body = req.body;
            // validate grant type
            Args.check(body.grant_type === 'password',
                new HttpBadRequestError('Invalid grant type. Expected grant type password'));
            // validate client
            const client = await req.context.model('AuthClient').where('client_id').equal(body.client_id)
                .silent()
                .getTypedItem();
            Args.check(client != null, new HttpBadRequestError('Invalid client.'));
            // validate client secret
            Args.check(client.client_secret === body.client_secret, new HttpUnauthorizedError('Invalid client credentials'));
            // validate scope
            const hasScope = await client.hasScope(body.scope);
            Args.check(hasScope, new HttpBadRequestError('Invalid client scope.'));
            // validate user
            const validateUser = await User.validateUser(req.context, body.username, body.password);
            Args.check(validateUser,
                new HttpUnauthorizedError('Invalid user credentials'));
            //get expiration timeout
            const expirationTimeout = parseInt(req.context.application.getConfiguration().getSourceAt('auth/timeout') || 480, 10)*60*1000;
            //calculate expiration time
            const expires = new Date().getTime() + expirationTimeout;
            //create new token or update an existing one
            let token = await req.context.model('AccessToken')
                .where('client_id').equal(body.client_id)
                .and('user_id').equal(body.username)
                .and('scope').equal(body.scope)
                .and('expires').lowerOrEqual(new Date())
                .silent()
                .getItem();
            if (token) {
                token.expires = new Date(expires);
            }
            else {
                token = {
                    client_id: body.client_id,
                    user_id: body.username,
                    scope: body.scope,
                    expires: new Date(expires)
                };
            }
            await req.context.model('AccessToken').silent().save(token);
            return res.json({
                access_token: token.access_token,
                token_type: 'bearer',
                expires_in: (expirationTimeout / 1000), // in seconds
                refresh_token: token.refresh_token,
                scope: token.scope
            });

        }
        catch (err) {
            return next(err);
        }
    });

    router.post('/token_info', async function postTokenInfo (req, res, next) {
        try {
            // noinspection JSValidateTypes
            /**
             * @type {TokenInfoReqBody}
             */
            const body = req.body;
            // get authorization header
            const authorizationHeader = req.header('Authorization');
            Args.check(authorizationHeader, new HttpUnauthorizedError('Missing client credentials.'));
            // convert base64 header to string
            let buff = new Buffer(authorizationHeader.replace(/^Basic\s+/,''), 'base64');
            let authorizationHeaderText = buff.toString('ascii');
            // split text and get client credentials
            let match = /^(.*?):(.*?)$/.exec(authorizationHeaderText);
            Args.check(match != null, new HttpBadRequestError('Invalid authorization header.'));
            let client_id = match[1];
            let client_secret = match[2];
            // validate client
            const client = await req.context.model('AuthClient').where('client_id').equal(client_id)
                .and('client_secret').equal(client_secret).silent().getItem();
            Args.check(client != null, new HttpUnauthorizedError('Invalid client credentials.'));
            const token = await req.context.model('AccessToken')
                .where('access_token').equal(body.token)
                .silent()
                .getItem();
            if (token == null) {
                // return non-active response
                return res.json({
                    active: false
                });
            }
            else {
                // if token has been expired
                if (new Date(token.expires).getTime() < new Date().getTime()) {
                    // return non-active response
                    return res.json({
                        active: false
                    });
                }// return token info
                return res.json({
                    active: true,
                    scope: token.scope,
                    client_id: token.client_id,
                    username: token.username,
                    exp: new Date(token.expires).getTime()
                });
            }
        }
        catch (err) {
            return next(err);
        }
    });

    router.get('/me', async function getMe(req, res, next){
        try {
            // get authorization header
            const authorizationHeader = req.header('Authorization');
            Args.check(authorizationHeader, new HttpBadRequestError('Missing authorization header.'));
            // split text and get client credentials
            let match = /^Bearer\s(.*?)$/i.exec(authorizationHeader);
            Args.check(match != null, new HttpBadRequestError('Invalid authorization header.'));
            let token = match[1];
            // get token info
            const item = await req.context.model('AccessToken')
                .where('access_token').equal(token)
                .silent()
                .getItem();
            Args.check(item, new HttpForbiddenError());
            // check active
            const active = new Date(item.expires).getTime() >= new Date().getTime();
            Args.check(active, new HttpForbiddenError());
            // get user
            const user = await req.context.model('User')
                .where('name').equal(item.user_id)
                .silent()
                .getItem();
            Args.check(user, new HttpNotFoundError());
            // and return
            return res.json(user);
        }
        catch (err) {
            return next(err);
        }

    });

    router.get('/login', function getLogin(req, res) {
        return res.status(405).send('Interactive login method not allowed by test api server');
    });

    router.get('/logout', function getLogout(req, res) {
        return res.status(405).send('Interactive logout method not allowed by test api server');
    });

    return router;
}

export {authorize, authRouter};
