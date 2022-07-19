declare class DevtoolsServer {
  defaultPort: number;
  silent: boolean;

  protected _loader: unknown;
  protected _listener: unknown;

  /**
   * Starts the devtools server.
   * @returns {DevtoolsServer}
   */
  start(): DevtoolsServer;
  logInstructions(): void;

  /**
   * Returns the port the devtools server is listening on. This will return
   * undefined if the server has not been started
   *
   * @return {?number} The port the devtools server is listening on.
   */
  get port(): number;
}

/**
 * Opens a devtool server that can be inspected using Firefox's devtools.
 * Construct using {@link DevtoolsServer.get}
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
 *
 * ## Usage
 * ```js
 * const { DevtoolsServer } = ChromeUtils.import("resource://app/modules/DevtoolsServer.jsm");
 *
 * const devtools = DevtoolsServer.get();
 * devtools.start();
 *
 * const port = devtools.port;
 * devtools.logInstructions();
 *
 * devtools.start(); // Will warn and do nothing
 * ```
 */
type DevtoolsServerImport = {
  /**
   * @param {number} [port] The port you want to open the devtools on.
   * @param {boolean} [silent] If true, instructions will not be logged to the console.
   */
  private constructor(port?: number, silent?: boolean);

  /**
   * @param {number} [port] The port you want to open the devtools on.
   * @param {boolean} [silent] If true, instructions will not be logged to the console.
   *
   * @returns {DevtoolsServer}
   */
  public get(port?: number, silent?: boolean): DevtoolsServer;
};
