/// <reference path="./ChromeUtils.d.ts" />

type XPCOMUtils = {
  defineLazyModuleGetters: (global, imports: Record<string, string>) => void;
};

type XPCOMUtilsExport = {
  XPCOMUtils: XPCOMUtils;
};
