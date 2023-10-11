/**
 *
 * @param {Array} documents document array
 * @param {number} page page number
 * @param {number} rowsPerPage rows per page
 * @returns {Array} paginated array
 */
export function applyPagination(documents, page, rowsPerPage) {
  return documents.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}
