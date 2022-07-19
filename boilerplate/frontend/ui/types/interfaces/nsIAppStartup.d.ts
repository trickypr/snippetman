/**
 * The following flags may be passed as the aMode parameter to the quit
 * method.  One and only one of the "Quit" flags must be specified.  The
 * eRestart flag may be bit-wise combined with one of the "Quit" flags to
 * cause the application to restart after it quits.
 */
enum AppQuitMode {
  /**
   * Attempt to quit if all windows are closed.
   */
  eConsiderQuit = 0x01,

  /**
   * Try to close all windows, then quit if successful.
   */
  eAttemptQuit = 0x02,

  /**
   * Quit, damnit!
   */
  eForceQuit = 0x03,

  /**
   * Restart the application after quitting.  The application will be
   * restarted with the same profile and an empty command line.
   */
  eRestart = 0x10,

  /**
   * Only valid when combined with eRestart. Only relevant on macOS.
   *
   * On macOS, it is possible for Firefox to run with no windows open (the
   * icon in the dock will retain the little dot under it to indicate that
   * the application is still running). Normally, we never want to launch
   * Firefox into this state. But we do occasionally want it to restart this
   * way. Passing this flag prevents Firefox from opening any windows when it
   * restarts.
   *
   * Note that, if there is an application update pending, this also silences
   * the update. This means that no UI will be shown including elevation
   * dialogs (potentially preventing the update from being installed).
   */
  eSilently = 0x100,
}

enum IDLShutdownPhase {
  SHUTDOWN_PHASE_NOTINSHUTDOWN = 0,
  SHUTDOWN_PHASE_APPSHUTDOWNCONFIRMED,
  SHUTDOWN_PHASE_APPSHUTDOWNNETTEARDOWN,
  SHUTDOWN_PHASE_APPSHUTDOWNTEARDOWN,
  SHUTDOWN_PHASE_APPSHUTDOWN,
  SHUTDOWN_PHASE_APPSHUTDOWNQM,
  SHUTDOWN_PHASE_APPSHUTDOWNRELEMETRY,
  SHUTDOWN_PHASE_XPCOMWILLSHUTDOWN,
  SHUTDOWN_PHASE_XPCOMSHUTDOWN,
}

interface nsIAppStartup {
  /**
   * Create the hidden window.
   */
  createHiddenWindow(): void;

  /**
   * Destroys the hidden window. This will have no effect if the hidden window
   * has not yet been created.
   */
  destroyHiddenWindow(): void;

  /**
   * Runs an application event loop: normally the main event pump which
   * defines the lifetime of the application. If there are no windows open
   * and no outstanding calls to enterLastWindowClosingSurvivalArea this
   * method will exit immediately.
   *
   * @returnCode NS_SUCCESS_RESTART_APP
   *             This return code indicates that the application should be
   *             restarted because quit was called with the eRestart flag.
   */
  run(): void;

  /**
   * There are situations where all application windows will be
   * closed but we don't want to take this as a signal to quit the
   * app. Bracket the code where the last window could close with
   * these.
   */
  enterLastWindowClosingSurvivalArea(): void;
  exitLastWindowClosingSurvivalArea(): void;

  /**
   * Startup Crash Detection
   *
   * Keeps track of application startup begining and success using flags to
   * determine whether the application is crashing on startup.
   * When the number of crashes crosses the acceptable threshold, safe mode
   * or other repair procedures are performed.
   */

  /**
   * Whether automatic safe mode is necessary at this time.  This gets set
   * in trackStartupCrashBegin.
   *
   * @see trackStartupCrashBegin
   */
  readonly automaticSafeModeNecessary: boolean;

  /**
   * Restart the application in safe mode
   * @param aQuitMode
   *        This parameter modifies how the app is shutdown.
   * @see nsIAppStartup::quit
   */
  restartInSafeMode(aQuitMode: AppQuitMode);

  /**
   * Run a new instance of this app with a specified profile
   * @param aProfile
   *        The profile we want to use.
   * @see nsIAppStartup::quit
   */
  reateInstanceWithProfile(aProfile: nsIToolkitProfile);

  /**
   * If the last startup crashed then increment a counter.
   * Set a flag so on next startup we can detect whether TrackStartupCrashEnd
   * was called (and therefore the application crashed).
   * @return whether safe mode is necessary
   */
  trackStartupCrashBegin(): boolean;

  /**
   * We have succesfully started without crashing. Clear flags that were
   * tracking past crashes.
   */
  trackStartupCrashEnd();

  /**
   * The following flags may be passed as the aMode parameter to the quit
   * method.  One and only one of the "Quit" flags must be specified.  The
   * eRestart flag may be bit-wise combined with one of the "Quit" flags to
   * cause the application to restart after it quits.
   */

  /**
   * Attempt to quit if all windows are closed.
   */
  aConsiderQuit: AppQuitMode.eConsiderQuit;

  /**
   * Try to close all windows, then quit if successful.
   */
  eAttemptQuit: AppQuitMode.eAttemptQuit;

  /**
   * Quit, damnit!
   */
  eForceQuit: AppQuitMode.eForceQuit;

  /**
   * Restart the application after quitting.  The application will be
   * restarted with the same profile and an empty command line.
   */
  eRestart: AppQuitMode.eRestart;

  /**
   * Only valid when combined with eRestart. Only relevant on macOS.
   *
   * On macOS, it is possible for Firefox to run with no windows open (the
   * icon in the dock will retain the little dot under it to indicate that
   * the application is still running). Normally, we never want to launch
   * Firefox into this state. But we do occasionally want it to restart this
   * way. Passing this flag prevents Firefox from opening any windows when it
   * restarts.
   *
   * Note that, if there is an application update pending, this also silences
   * the update. This means that no UI will be shown including elevation
   * dialogs (potentially preventing the update from being installed).
   */
  eSilently: AppQuitMode.eSilently;

  /**
   * Exit the event loop, and shut down the app.
   *
   * @param aMode
   *        This parameter modifies how the app is shutdown, and it is
   *        constructed from the constants defined above.
   * @param aExitCode
   *        The exit code to return from the process. The precise code
   *        returned by the process may vary depending on the platform. Only
   *        values 0-255 should generally be used. If not specified an exit
   *        code of 0 will be used.
   *
   * @return false if the shutdown was cancelled due to the presence
   *         of a hidden window or if the user disallowed a window
   *         to be closed.
   */
  quit(aMode: AppQuitMode, aExitCode?: number): boolean;

  /**
   * These values must match the xpcom/base/ShutdownPhase.h values.
   * We do not expose late XPCOM shutdown phases here, everything
   * after SHUTDOWN_PHASE_XPCOMSHUTDOWN is expected to be irrelevant
   * for JS.
   */
  IDLShutdownPhase: IDLShutdownPhase;

  /**
   * Wrapper for shutdown notifications that informs the terminator before
   * we notify other observers. Calls MaybeFastShutdown.
   * This function is supposed to be used only from some (xpcshell) tests
   * explicitely dealing with shutdown.
   *
   * @param aPhase
   *        The shutdown phase we want to advance to. Please note, that
   *        we cannot go back to earlier phases or abort shutdown once
   *        it started.
   */
  advanceShutdownPhase(aPhase: IDLShutdownPhase);

  /**
   * Check if we entered or passed a specific shutdown phase.
   *
   * @param aPhase
   *        The shutdown phase we want to check.
   *
   * @return true if we are in or beyond the given phase.
   */
  isInOrBeyondShutdownPhase(aPhase: IDLShutdownPhase): Boolean;

  /**
   * True if the application is in the process of shutting down.
   */
  readonly shuttingDown: boolean;

  /**
   * True if the application is in the process of starting up.
   *
   * Startup is complete once all observers of final-ui-startup have returned.
   */
  readonly startingUp: boolean;

  /**
   * Mark the startup as completed.
   *
   * Called at the end of startup by nsAppRunner.
   */
  doneStartingUp();

  /**
   * True if the application is being restarted
   */
  readonly restarting: boolean;

  /**
   * True if this is the startup following restart, i.e. if the application
   * was restarted using quit(eRestart*).
   */
  readonly wasRestarted: boolean;

  /**
   * True if this is the startup following a silent restart, i.e. if the
   * application was restarted using quit(eSilently*), or if the application
   * was started with the "silentmode" command line flag.
   */
  readonly wasSilentlyStarted: boolean;

  /**
   * The number of seconds since the OS was last rebooted
   */
  readonly secondsSinceLastOSRestart: number;

  /**
   * Whether or not we showed the startup skeleton UI.
   */
  readonly showedPreXULSkeletonUI: boolean;

  /**
   * Returns an object with main, process, firstPaint, sessionRestored properties.
   * Properties may not be available depending on platform or application
   */
  getStartupInfo(): jsVal;

  /**
   * True if startup was interrupted by an interactive prompt.
   */
  interrupted: boolean;
}
