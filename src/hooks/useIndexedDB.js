import { useCallback, useEffect, useState } from 'react';

import * as IDB from '../api/indexedDB';

function useIndexedDB(key = 'key', initialValue) {
  const storeName = 'records';
  const [database, setDatabase] = useState();
  const [privateValue, setPrivateValue] = useState('');

  useEffect(() => {
    // open database and save interface
    async function connectToDatabase() {
      try {
        const db = await IDB.openDatabase('HooksDB', storeName);
        setDatabase(db);
      } catch (error) {
        console.error('connectToDatabase failed', error);
      }
    }
    connectToDatabase();
  }, []);

  useEffect(() => {
    // get previously stored value or start with initialValue
    async function getInitialValue() {
      try {
        const previousValue = await IDB.getItem(database, storeName, key);
        if (previousValue) {
          setPrivateValue(previousValue);
        } else if (initialValue) {
          await IDB.setItem(database, storeName, key, initialValue);
          setPrivateValue(initialValue);
        }
      } catch (error) {
        console.error('getInitialValue failed:', error);
      }
    }
    if (database) {
      getInitialValue();
    }
  }, [database, initialValue, key]);

  // update privateValue and database
  const updateValue = useCallback(
    async function (value) {
      try {
        // allow functional updates, similar to useState
        const newValue =
          value instanceof Function ? value(privateValue) : value;

        await IDB.setItem(database, storeName, key, newValue);
        setPrivateValue(newValue);
      } catch (error) {
        console.error('updateValue failed:', error);
      }
    },
    [database, key, privateValue]
  );

  return [privateValue, updateValue];
}

export default useIndexedDB;
