import { createContext } from 'react';

// eslint-disable-next-line unused-imports/no-unused-vars
const noop = (...args) => {};

export const DropdownContext = createContext({
  anchorEl: null,
  onMenuEnter: noop,
  onMenuLeave: noop,
  onTriggerEnter: noop,
  onTriggerLeave: noop,
  open: false,
});
