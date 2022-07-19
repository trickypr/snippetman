"use sloppy";

declare type ChromeUtilsType = {
  importESModule: <T>(path: string) => T;
  import: <K, T>(path: string) => Record<K, T>;
};

declare let ChromeUtils: ChromeUtilsType;
