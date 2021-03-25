/**
 * Opens an IndexedDB database or creates a new one
 * @param {String} dbName Name of the database
 * @param {String} storeName Name of the object store
 * @returns {Promise<IDBDatabase>}
 */
export function openDatabase(dbName, storeName) {
  return new Promise((resolve, reject) => {
    // Generic error handler for all uncatched requests
    // and transactions on this database
    function handleError(event) {
      reject(`Database error: ${event.target.errorCode}`);
    }

    // for indexedDB.open() request and event handlers
    const request = window.indexedDB.open(dbName, 1);
    request.onerror = () => {
      reject(
        'Cannot open database. Missing user permission or using private browsing.'
      );
    };
    request.onsuccess = (event) => {
      const db = event.target.result;
      db.onerror = handleError;
      resolve(db);
    };

    // On creation of a new database or after a version
    // number increase: define object store
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      db.onerror = handleError;

      const objectStore = db.createObjectStore(storeName);

      // Make sure the object store creation is
      // finished before adding data into it.
      objectStore.transaction.oncomplete = () => {
        resolve(db);
      };
    };
  });
}

/**
 * Adds or updates a key/value pair in the store.
 * @param {IDBDatabase} db The database interface
 * @param {String} storeName Name of the object store
 * @param {String} key Unique identifier
 * @param {*} value
 * @returns {Promise<String>}
 */
export function setItem(db, storeName, key, value) {
  return new Promise((resolve, reject) => {
    const request = db
      .transaction(storeName, 'readwrite')
      .objectStore(storeName)
      .put(value, key);

    request.onerror = () => {
      reject('setItem transaction failed');
    };
    request.onsuccess = () => {
      resolve('Success');
    };
  });
}

/**
 * Retrieves the value associated with a key in the object store
 * @param {IDBDatabase} db The database interface
 * @param {String} storeName Name of the object store
 * @param {String} key Entry's unique identifier
 * @returns {Promise}
 */
export function getItem(db, storeName, key) {
  return new Promise((resolve, reject) => {
    const request = db
      .transaction(storeName, 'readonly')
      .objectStore(storeName)
      .get(key);

    request.onerror = () => {
      reject('getItem transaction failed');
    };
    request.onsuccess = (event) => {
      resolve(event.target.result);
    };
  });
}
