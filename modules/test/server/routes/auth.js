import express from 'express';
/**
 * @param {Authenticator} passport
 */
function authRouter(passport) {
    let router = express.Router();
    return router;
}

module.exports = authRouter;
