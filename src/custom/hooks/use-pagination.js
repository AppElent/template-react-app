import { useCallback, useEffect, useMemo, useRef, useReducer } from 'react';

export const getPreviousEnabled = (currentPage) => currentPage > 0;

export const getNextEnabled = (currentPage, totalPages) => currentPage + 1 < totalPages;

export const getTotalPages = (totalItems, pageSize) => Math.ceil(totalItems / pageSize);

export const getStartIndex = (pageSize, currentPage) => pageSize * currentPage;

export const getEndIndex = (pageSize, currentPage, totalItems) => {
  const lastPageEndIndex = pageSize * (currentPage + 1);

  if (lastPageEndIndex > totalItems) {
    return totalItems - 1;
  }

  return lastPageEndIndex - 1;
};

export const limitPageBounds = (totalItems, pageSize) => (page) =>
  Math.min(Math.max(page, 0), getTotalPages(totalItems, pageSize) - 1);

export const getPaginationMeta = ({ totalItems, pageSize, currentPage }) => {
  const totalPages = getTotalPages(totalItems, pageSize);
  return {
    totalPages,
    startIndex: getStartIndex(pageSize, currentPage),
    endIndex: getEndIndex(pageSize, currentPage, totalItems),
    previousEnabled: getPreviousEnabled(currentPage),
    nextEnabled: getNextEnabled(currentPage, totalPages),
  };
};

const getCurrentPageReducer = (rootState) =>
  function currentPageReducer(state, action) {
    switch (action.type) {
      case 'SET_PAGE':
        return limitPageBounds(rootState.totalItems, rootState.pageSize)(action.page);
      case 'NEXT_PAGE':
        return limitPageBounds(rootState.totalItems, rootState.pageSize)(state + 1);
      case 'PREVIOUS_PAGE':
        return limitPageBounds(rootState.totalItems, rootState.pageSize)(state - 1);
      case 'SET_PAGESIZE':
        return limitPageBounds(rootState.totalItems, action.pageSize)(action.nextPage ?? state);
      case 'SET_TOTALITEMS':
        return limitPageBounds(action.totalItems, rootState.pageSize)(action.nextPage ?? state);
      /* istanbul ignore next */
      default:
        return state;
    }
  };

/**
 *Reduce total items
 * @param {any} state State
 * @param {any} action Action
 * @returns {any} Return reduced items
 */
function totalItemsReducer(state, action) {
  switch (action.type) {
    case 'SET_TOTALITEMS':
      return action.totalItems;
    default:
      return state;
  }
}

/**
 *
 * @param {any} state State
 * @param {any} action Action
 * @returns {any} Return reduced
 */
function pageSizeReducer(state, action) {
  switch (action.type) {
    case 'SET_PAGESIZE':
      return action.pageSize;
    default:
      return state;
  }
}

/**
 *
 * @param {any} state State
 * @param {any} action Action
 * @returns {any} Return reduced
 */
export function paginationStateReducer(state, action) {
  return {
    currentPage: getCurrentPageReducer(state)(state.currentPage, action),
    totalItems: totalItemsReducer(state.totalItems, action),
    pageSize: pageSizeReducer(state.pageSize, action),
  };
}

/**
 *
 * @param root0
 * @param root0.totalItems
 * @param root0.initialPage
 * @param root0.initialPageSize
 * @returns {any} Return pagination object
 */
export default function usePagination({ totalItems = 0, initialPage = 0, initialPageSize = 0 }) {
  const initialState = {
    totalItems,
    pageSize: initialPageSize,
    currentPage: initialPage,
  };

  const [paginationState, dispatch] = useReducer(paginationStateReducer, initialState);

  const totalItemsRef = useRef(totalItems);
  totalItemsRef.current = totalItems;

  useEffect(
    () => () => {
      if (typeof totalItemsRef.current !== 'number' || totalItems === totalItemsRef.current) {
        return;
      }

      dispatch({ type: 'SET_TOTALITEMS', totalItems: totalItemsRef.current });
    },
    [totalItems]
  );

  return {
    ...paginationState,
    ...useMemo(() => getPaginationMeta(paginationState), [paginationState]),
    setPage: useCallback((page) => {
      dispatch({
        type: 'SET_PAGE',
        page,
      });
    }, []),
    setNextPage: useCallback(() => {
      dispatch({ type: 'NEXT_PAGE' });
    }, []),
    setPreviousPage: useCallback(() => {
      dispatch({ type: 'PREVIOUS_PAGE' });
    }, []),
    setPageSize: useCallback((pageSize, nextPage = 0) => {
      dispatch({ type: 'SET_PAGESIZE', pageSize, nextPage });
    }, []),
  };
}
