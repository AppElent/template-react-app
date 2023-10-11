/**
 *
 * @param {any} a A
 * @param {any} b A
 * @param {any} sortBy Sort by
 * @returns {number} Comparator
 */
function descendingComparator(a, b, sortBy) {
  // When compared to something undefined, always returns false.
  // This means that if a field does not exist from either element ('a' or 'b') the return will be 0.

  if (b[sortBy] < a[sortBy]) {
    return -1;
  }

  if (b[sortBy] > a[sortBy]) {
    return 1;
  }

  return 0;
}

/**
 *
 * @param {('asc'|'desc')} sortDir sortDir
 * @param {any} sortBy sortBy
 * @returns {any} comparator
 */
function getComparator(sortDir, sortBy) {
  return sortDir === 'desc'
    ? (a, b) => descendingComparator(a, b, sortBy)
    : (a, b) => -descendingComparator(a, b, sortBy);
}

/**
 *
 * @param {Array} documents documents array
 * @param {any} sortBy sortBy
 * @param {('asc'|'desc')} sortDir sortDir
 * @returns {Array} sorted array
 */
export function applySort(documents, sortBy, sortDir) {
  const comparator = getComparator(sortDir, sortBy);
  const stabilizedThis = documents.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const newOrder = comparator(a[0], b[0]);

    if (newOrder !== 0) {
      return newOrder;
    }

    return a[1] - b[1];
  });

  return stabilizedThis.map((el) => el[0]);
}
