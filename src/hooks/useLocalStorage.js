import { useState } from 'react';

function useLocalStorage(key = 'key', initialValue) {
  const [privateValue, setPrivateValue] = useState(() => {
    // get stored value or start with initialValue
    try {
      const previousValue = window.localStorage.getItem(key);
      if (previousValue !== null) {
        return previousValue;
      }
      if (initialValue) {
        window.localStorage.setItem(key, initialValue);
      }
    } catch (error) {
      console.error('localStorage error:', error);
    }
    return initialValue || '';
  });

  // update privateValue and save to local storage
  function updateValue(value) {
    try {
      // allow functional updates, similar to useState
      const newValue = value instanceof Function ? value(privateValue) : value;

      window.localStorage.setItem(key, newValue);
      setPrivateValue(newValue);
    } catch (error) {
      console.error('localStorage error:', error);
    }
  }

  return [privateValue, updateValue];
}

export default useLocalStorage;
