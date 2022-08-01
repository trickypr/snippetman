import { diff } from "deep-object-diff";
import Reconciler, { HostConfig, OpaqueHandle } from "react-reconciler";
import { xulElements } from "./xulElements";

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
  supportsMicrotask: true,

  createInstance(
    type,
    props,
    rootContainer: Container,
    hostContext: any,
    internalHandle: any
  ) {
    if (xulElements.includes(type)) {
      return document.createXULElement(type);
    }

    return document.createElement(type);
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
    return true;
  },
  commitMount(instance, type, props, internalInstanceHandle) {
    for (const prop in props) {
      if (typeof props[prop] === "function") {
        instance.addEventListener(
          prop.replace("on", "").toLowerCase(),
          props[prop]
        );

        continue;
      }

      let propName = prop.toLowerCase();

      // We should not handle children here
      if (prop == "children") continue;
      if (prop == "classname") propName = "class";

      instance.setAttribute(propName, props[prop]);
    }
  },
  detachDeletedInstance(node) {
    node.remove();
    return null;
  },
  commitTextUpdate(textInstance, oldText, newText) {
    textInstance.nodeValue = newText;
  },
  prepareUpdate(
    instance,
    type,
    oldPropsImut,
    newPropsImut,
    rootContainer,
    hostContext
  ) {
    let oldProps = { ...oldPropsImut, children: undefined };
    let newProps = { ...newPropsImut, children: undefined };

    const diffs = diff(oldProps, newProps);

    if (Object.keys(diffs).length === 0) {
      return null;
    }

    return diffs;
  },
  commitUpdate(
    instance,
    updatePayload,
    type,
    prevProps,
    nextProps,
    internalHandle
  ) {
    for (const updated in updatePayload) {
      let propName = updated.toLowerCase();

      if (propName == "classname") {
        propName = "class";
      }

      if (typeof updatePayload[updated] === "undefined") {
        instance.removeAttribute(propName);
        continue;
      }

      const newVal = nextProps[updated];

      if (typeof newVal === "function") {
        instance.removeEventListener(
          propName.replace("on", "").toLowerCase(),
          prevProps[updated]
        );
        instance.addEventListener(
          propName.replace("on", "").toLowerCase(),
          newVal
        );

        continue;
      }

      instance.setAttribute(propName, newVal);
    }
  },
  removeChild(parentInstance, child) {
    parentInstance.removeChild(child);
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
