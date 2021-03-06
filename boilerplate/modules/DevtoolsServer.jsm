/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */

"use strict";

const { useDistinctSystemPrincipalLoader } = ChromeUtils.import(
  "resource://devtools/shared/loader/Loader.jsm"
);

var EXPORTED_SYMBOLS = ["DevtoolsServer"];

/**
 * Opens a devtool server that can be inspected using Firefox's devtools.
 *
 * The port can be set either by passing it in to the function or setting the
 * appropriate preference value. If there is no port value provided, Gecko will
 * find a free port and use it instead
 *
 * To connect to the devtools server:
 * 1. Open 'about:debugging' in Firefox or Pulse Browser
 * 2. Open the setup tab
 * 3. Enter the following host inside of network locations 'localhost:${listener.port}' and click 'Add'
 * 4. Click 'Connect' in the left sidebar
 * 5. Click on the entry in the left sidebar
 * 6. Click 'Open in Browser Toolbox'
 */
class DevtoolsServer {
  /**
   * @param {?number} port The port you want to open the devtools on.
   * @param {?boolean} silent If true, instructions will not be logged to the console.
   */
  constructor(port, silent) {
    this.defaultPort = port;
    this.silent = silent || false;

    this.loader = useDistinctSystemPrincipalLoader(this);
  }

  /**
   * Starts the devtools server.
   * @returns {DevtoolsServer}
   */
  start() {
    const { DevToolsServer } = this.loader.require(
      "devtools/server/devtools-server"
    );
    const { SocketListener } = this.loader.require(
      "devtools/shared/security/socket"
    );

    this.devToolsServer = DevToolsServer;

    this.devToolsServer.init();
    // We mainly need a root actor and target actors for opening a toolbox, even
    // against chrome/content. But the "no auto hide" button uses the
    // preference actor, so also register the browser actors.
    this.devToolsServer.registerAllActors();
    this.devToolsServer.allowChromeProcess = true;

    const serverPort =
      this.defaultPort ||
      Services.prefs.getIntPref("devtools.debugger.server-port", -1);
    const socketOptions = {
      portOrPath: serverPort,
    };
    this.listener = new SocketListener(this.devToolsServer, socketOptions);
    this.listener.open();

    if (!this.silent) {
      dump(`Devtools opened on port ${this.port}`);
      this.logInstructions();
    }

    return this;
  }

  logInstructions() {
    dump(`
    To connect to the devtools server:
    1. Open 'about:debugging' in Firefox or Pulse Browser
    2. Open the setup tab
    3. Enter the following host inside of network locations 'localhost:${this.port}' and click 'Add'
    4. Click 'Connect' in the left sidebar
    5. Click on the entry in the left sidebar
    6. Click 'Open in Browser Toolbox'
`);
  }

  /**
   * Returns the port the devtools server is listening on. This will return
   * undefined if the server has not been started
   *
   * @return {?number} The port the devtools server is listening on.
   */
  get port() {
    if (!this.listener) {
      return;
    }

    return this.listener.port;
  }
}
