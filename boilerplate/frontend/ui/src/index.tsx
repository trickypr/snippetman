/// <reference path="../types/Global.d.ts" />
/// <reference path="../types/DevtoolsServer.d.ts" />
/// <reference path="../types/services/index.d.ts" />

const { DevtoolsServer } = ChromeUtils.import<
  "DevtoolsServer",
  DevtoolsServerImport
>("resource://app/modules/DevtoolsServer.jsm");
const { Services } = ChromeUtils.import<"Services", Services>(
  "resource://gre/modules/Services.jsm"
);

import { FunctionalComponent, h } from "preact";
import { useEffect } from "preact/hooks";
import { Helmet } from "react-helmet";

import "./style";

export default function App() {
  useEffect(() => {
    console.log("starting devtools");

    const devtools = DevtoolsServer.get();
    devtools.start();
  }, []);

  return (
    <div>
      <Helmet>
        <title>Hello world!</title>
      </Helmet>
      <h1>Hello, trickypr!</h1>
      <button
        onClick={(e) => {
          Services.obs.notifyObservers(null, "startupcache-invalidate");

          let env = Cc["@mozilla.org/process/environment;1"].getService(
            Ci.nsIEnvironment
          );
          env.set("MOZ_DISABLE_SAFE_MODE_KEY", "1");

          Services.startup.quit(
            Ci.nsIAppStartup.eAttemptQuit | Ci.nsIAppStartup.eRestart
          );
        }}
      >
        Restart
      </button>
    </div>
  );
}
