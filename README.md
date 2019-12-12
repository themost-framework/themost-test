[![npm](https://img.shields.io/npm/v/@themost%2Ftest.svg)](https://www.npmjs.com/package/@themost%2Ftest)
![](https://github.com/themost-framework/themost-test/workflows/test/badge.svg) 
![](https://img.shields.io/david/themost-framework/themost-test?path=modules%2Ftest) ![](https://img.shields.io/david/peer/themost-framework/themost-test?path=modules%2Ftest)
![](https://img.shields.io/david/dev/themost-framework/themost-test?path=modules%2Ftest)
![GitHub top language](https://img.shields.io/github/languages/top/themost-framework/themost-test)
[![License](https://img.shields.io/npm/l/@themost/test)](https://github.com/themost-framework/themost-test/blob/master/LICENSE)
![GitHub last commit](https://img.shields.io/github/last-commit/themost-framework/themost-test)
![GitHub Release Date](https://img.shields.io/github/release-date/themost-framework/themost-test)
[![npm](https://img.shields.io/npm/dw/@themost/test)](https://www.npmjs.com/package/@themost%2Ftest)
[![Snyk Vulnerabilities for npm package](https://img.shields.io/snyk/vulnerabilities/npm/@themost/test)](https://snyk.io/vuln/npm:%40themost%2Ftest)

## @themost/test
MOST Web Framework Codename Blueshift Test Api Server

This project contains a test api server for testing libraries and modules.

### Installation

        npm i @themost/test
        
### Usage

Create a jasmine test spec and start testing api server

        import { getApplication, serveApplication, getServerAddress } from "@themost/test";
        import fetch from "node-fetch";
        describe("TestApi", () => {
          let server;
          let server_uri;
          beforeAll(done => {
            const app = getApplication()
            serveApplication(app)
              .then(liveServer => {
                server = liveServer;
                server_uri = getServerAddress(server);
                return done();
              })
              .catch(err => {
                return done(err);
              });
          });
          afterAll(done => {
            if (server) {
              server.close(() => {
                return done();
              });
            }
          });
          it("should access server", async () => {
            expect(server).toBeTruthy();
            const response = await fetch(new URL("/", server_uri));
            expect(response.ok).toBeTruthy();
          });
        });
