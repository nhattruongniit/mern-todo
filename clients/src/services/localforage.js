import localforage from "localforage";

const forageErrorLog = localforage.createInstance({
  name: "log_error",
});

forageErrorLog.config({
  driver: localforage.INDEXEDDB, // Force WebSQL; same as using setDriver()
  name: "log_error",
  storeName: "log", // Should be alphanumeric, with underscores.
});

export { forageErrorLog };
