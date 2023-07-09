import App from './App.svelte'

import './global.css'

var app = new App({
  target: document.body,
})

// let gMgr = Cc['@mozilla.org/memory-reporter-manager;1'].getService(
//   Ci.nsIMemoryReporterManager
// )

// // Minimize memory usage once a minute. This might need to be removed in the
// // future if it causes performance issues.
// setInterval(() => {
//   gMgr.minimizeMemoryUsage(() => {})
// }, 1000 * 60)
