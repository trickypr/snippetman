import Reconciler, { HostConfig, OpaqueHandle } from "react-reconciler";

type Type = string;
type Props = { [key: string]: any };
type Container = Document | Element;
type Instance = Element;
type TextInstance = Text;

type SuspenseInstance = any;
type HydratableInstance = any;
type PublicInstance = any;
type HostContext = any;
type UpdatePayload = any;
type _ChildSet = any;
type TimeoutHandle = any;
type NoTimeout = number;

const defaultOnRecoverableError =
  typeof reportError === "function"
    ? // In modern browsers, reportError will dispatch an error event,
      // emulating an uncaught JavaScript error.
      reportError
    : (error: any) => {
        // In older browsers and test environments, fallback to console.error.
        // eslint-disable-next-line react-internal/no-production-logging
        console["error"](error);
      };

const hostConfig: HostConfig<
  Type,
  Props,
  Container,
  Instance,
  TextInstance,
  SuspenseInstance,
  HydratableInstance,
  PublicInstance,
  HostContext,
  UpdatePayload,
  _ChildSet,
  TimeoutHandle,
  NoTimeout
> = {
  createInstance(
    type,
    props,
    rootContainer: Container,
    hostContext: any,
    internalHandle: any
  ) {
    const element = document.createElement(type);

    for (const prop in props) {
      element.setAttribute(prop, props[prop]);
    }

    return element;
  },
  createTextInstance(text, rootContainer, hostContext, internalHandle) {
    return document.createTextNode(text);
  },

  supportsMutation: true,
  appendInitialChild(parentInstance, child) {
    parentInstance.appendChild(child);
  },
  appendChildToContainer(container, child) {
    container.appendChild(child);
  },
  appendChild(parentInstance, child) {
    parentInstance.appendChild(child);
  },
  removeChildFromContainer(container, child) {
    container.removeChild(child);
  },

  // Assorted mutation methods
  clearContainer(container) {
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
  },
  finalizeInitialChildren(instance, type, props, rootContainer, hostContext) {
    return false;
  },

  // We do not care about root host contexts
  getRootHostContext(rootContainer) {
    return null;
  },
  getChildHostContext(parentHostContext, type, rootContainer) {
    return null;
  },

  // Performance stuff that I do not care about at the moment
  shouldSetTextContent(type, props) {
    return false;
  },

  // We do not handle commits, so we are just going to pass everything through
  prepareForCommit(containerInfo) {
    return null;
  },
  resetAfterCommit(containerInfo) {
    return null;
  },
};

const renderer = Reconciler(hostConfig);

export function render(component: any, container: any) {
  let isStrictMode = false;
  let concurrentUpdatesByDefaultOverride = false;
  let identifierPrefix = "";
  let onRecoverableError = defaultOnRecoverableError;
  let transitionCallbacks = null;

  const root = renderer.createContainer(
    container,
    0,
    null,
    isStrictMode,
    concurrentUpdatesByDefaultOverride,
    identifierPrefix,
    onRecoverableError,
    transitionCallbacks
  );
  renderer.updateContainer(component, root, null);
}
