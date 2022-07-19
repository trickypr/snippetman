interface nsIEnvironment {
  /**
   * Set the value of an environment variable.
   *
   * @param aName   the variable name to set.
   * @param aValue  the value to set.
   */
  set(aName: string, aValue: string);

  /**
   * Get the value of an environment variable.
   *
   * @param aName   the variable name to retrieve.
   * @return        returns the value of the env variable. An empty string
   *                will be returned when the env variable does not exist or
   *                when the value itself is an empty string - please use
   *                |exists()| to probe whether the env variable exists
   *                or not.
   */
  get(name: string): string;

  /**
   * Check the existence of an environment variable.
   * This method checks whether an environment variable is present in
   * the environment or not.
   *
   * - For Unix/Linux platforms we follow the Unix definition:
   * An environment variable exists when |getenv()| returns a non-NULL value.
   * An environment variable does not exist when |getenv()| returns NULL.
   * - For non-Unix/Linux platforms we have to fall back to a
   * "portable" definition (which is incorrect for Unix/Linux!!!!)
   * which simply checks whether the string returned by |Get()| is empty
   * or not.
   *
   * @param aName   the variable name to probe.
   * @return        if the variable has been set, the value returned is
   *                PR_TRUE. If the variable was not defined in the
   *                environment PR_FALSE will be returned.
   */
  exists(name: string): boolean;
}
