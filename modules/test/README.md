[![npm](https://img.shields.io/npm/v/@themost%2Ftest.svg)](https://www.npmjs.com/package/@themost%2Ftest)
![](https://github.com/themost-framework/themost-test/workflows/test/badge.svg) 

## @themost/test
MOST Web Framework Codename Blueshift Test Api Server

This project contains a test api server for testing libraries and modules.

### Installation

        npm i @themost/test
        
### Usage

Create a jasmine test spec and start testing api server

        import { app, serve, getServerAddress } from "@themost/test";
        import fetch from "node-fetch";
        describe("TestApi", () => {
          let server;
          let server_uri;
          beforeAll(done => {
            serve(app)
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
