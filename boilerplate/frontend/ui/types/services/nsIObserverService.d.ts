/**
 * Taken from: {@link https://udn.realityripple.com/docs/Mozilla/Tech/XPCOM/Reference/Interface/nsIObserverService}
 *
 * The XPCOM nsObserverService implements this interface to provide global notifications for a variety of subsystems.
 * Implemented by @mozilla.org/observer-service;1 as a service:
 */
interface nsIObserverService {
  /**
   * Registers a given listener for a notifications regarding the specified topic. See {@link nsIObserver} for a JavaScript example.
   * @param observer The nsIObserver object which will receive notifications.
   * @param topic The notification topic or subject.
   * @param weak If set to false, the nsIObserverService will hold a strong reference to anObserver. If set to true and anObserver supports the nsISupportsWeakReference interface, a weak reference will be held. Otherwise an error will be returned. (In most cases, you should use false.)
   */
  addObserver(observer: nsIObserver, topic: string, weak: boolean): void;

  /**
   * Called to enumerate all observers registered for a particular topic.
   * @param topic The notification topic or subject.
   * @return Returns an enumeration of all registered listeners. See {@link nsISimpleEnumerator}.
   */
  enumerateObservers(topic: string): nsISimpleEnumerator;

  /**
   * This method is called to notify all observers for a particular topic.
   * @param subject A notification specific interface pointer. This usually corresponds to the source of the notification, but could be defined differently depending on the notification topic and may even be null.
   * @param topic The notification topic. This string-valued key uniquely identifies the notification. This parameter must not be null.
   * @param data A notification specific string value. The meaning of this parameter is dependent on the topic. It may be null.
   * ## Example
   * ```typescript
   * const { Services } = ChromeUtils.import<"Services", Services>("resource://gre/modules/Services.jsm");
   *
   * Services.obs.notifyObservers(null, "myTopicID", "someAdditionalInformationPassedAs'Data'Parameter");
   * ```
   */
  notifyObservers(subject?: any, topic: string, data?: string): void;

  /**
   * This method is called to unregister an observer for a particular topic.
   * @param observer The {@link nsIObserver} instance to remove.
   * @param topic The notification topic or subject. This string-valued key uniquely identifies the notification. This parameter must not be null.
   */
  removeObserver(observer: nsIObserver, topic: string): void;
}
