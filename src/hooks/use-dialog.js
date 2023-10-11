import { useCallback, useState } from 'react';

/**
 * Use dialog hook
 * @returns {any} object
 */
export function useDialog() {
  const [state, setState] = useState({
    open: false,
    data: undefined,
  });

  const handleOpen = useCallback((data) => {
    setState({
      open: true,
      data,
    });
  }, []);

  const handleClose = useCallback(() => {
    setState({
      open: false,
    });
  }, []);

  return {
    data: state.data,
    handleClose,
    handleOpen,
    open: state.open,
  };
}
