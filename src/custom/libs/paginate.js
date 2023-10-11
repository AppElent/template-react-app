/**
 *
 * @param {Array} array array
 * @param {number} page_size Page size
 * @param {number} page_number Page number
 * @returns {Array} paginated array
 */
export function paginate(array, page_size, page_number) {
  // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
  return array.slice((page_number - 1) * page_size, page_number * page_size);
}
