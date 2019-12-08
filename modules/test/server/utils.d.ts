/**
 * MOST Web Framework 2.0 Codename Blueshift
 * Copyright (c) 2017, THEMOST LP All rights reserved
 *
 * Use of this source code is governed by an BSD-3-Clause license that can be
 * found in the LICENSE file at https://themost.io/license
 */
import {TokenInfoResBody, TokenResBody} from "./routes/auth";

declare function getToken(server_uri: string, username: string, password: string): Promise<TokenResBody>;
declare function getTokenInfo(server_uri: string, token: string): Promise<TokenInfoResBody>;

export {getToken, getTokenInfo};
