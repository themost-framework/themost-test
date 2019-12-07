/**
 * MOST Web Framework 2.0 Codename Blueshift
 * Copyright (c) 2017, THEMOST LP All rights reserved
 *
 * Use of this source code is governed by an BSD-3-Clause license that can be
 * found in the LICENSE file at https://themost.io/license
 */
import {Server} from "http";
import {Application} from "express";

export declare function serve(app: Application, port?: any, host?: any ): Promise<Server>;
export declare function getServerAddress(server: Server):string;
