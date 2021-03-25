import { useState } from 'react';

function useSessionStorage(key = 'key', initialValue = '') {
  const [privateValue, setPrivateValue] = useState(() => {
    // get stored value or start with initialValue
    try {
      const previousValue = window.sessionStorage.getItem(key);
      if (previousValue !== null) {
        return previousValue;
      }
      if (initialValue) {
        window.sessionStorage.setItem(key, initialValue);
      }
    } catch (error) {
      console.error('sessionStorage error:', error);
    }
    return initialValue || '';
  });

  // update privateValue and save to session storage
  function updateValue(value) {
    try {
      // allow functional updates, similar to useState
      const newValue = value instanceof Function ? value(privateValue) : value;

      window.sessionStorage.setItem(key, newValue);
      setPrivateValue(newValue);
    } catch (error) {
      console.error('sessionStorage error:', error);
    }
  }

  return [privateValue, updateValue];
}

export default useSessionStorage;
