import { useMemo } from 'react';

export const useSelected = (array, id) => {
  const selected = useMemo(() => {
    if (array) {
      if (id) {
        const found = array?.find((factory) => factory.id === id);
        if (found) {
          return found;
        } else {
          return array[0];
        }
      } else {
        return array[0];
      }
    }
    return undefined;
  }, [array, id]);

  const selectedIndex = useMemo(() => {
    const index = array?.findIndex((factory) => factory.id === selected.id);
    if (!index) {
      return 0;
    }
    return index;
  }, [selected]);

  return [selected, selectedIndex];
};
