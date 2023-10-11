import { useEffect, useRef } from 'react';

/**
 * @typedef KeyConfig
 * @property {string} key Key to press
 * @property {string} event Event to watch for
 */

/**
 * @callback KeyCallback
 */

/**
 *
 * @param {KeyConfig} keyConfig Key configuration
 * @param {KeyCallback} cb Callback function
 */
export function useKey(keyConfig, cb) {
  const callback = useRef(cb);

  //full list of event codes: https://www.freecodecamp.org/news/javascript-keycode-list-keypress-event-key-codes/
  // example keyconfig: {event: 'ctrlKey', key: 's'}

  useEffect(() => {
    callback.current = cb;
  });

  useEffect(() => {
    /**
     * Handle function connected to event listener
     * @param {any} event The event that fires after pressdown
     */
    function handle(event) {
      if (event && event[keyConfig.event] && keyConfig.key && keyConfig.key === event.key) {
        event.preventDefault();
        callback.current(event);
      }
      // else if (key === 'ctrls' && event.key === 's' && event.ctrlKey) {
      //   event.preventDefault();
      //   callback.current(event);
      // }
    }

    document.addEventListener('keydown', handle);
    return () => document.removeEventListener('keydown', handle);
  }, [keyConfig]);
}
