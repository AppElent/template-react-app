/**
 *
 * @param {boolean} guid If this returned string should be a GUID
 * @returns {string} guid
 */
export function createGuid(guid = true) {
  /**
   *
   * @param {boolean} s s
   * @returns {string} return value
   */
  function _p8(s) {
    var p = (Math.random().toString(16) + '000000000').substr(2, 8);
    return s ? '-' + p.substr(0, 4) + '-' + p.substr(4, 4) : p;
  }
  if (guid) {
    return _p8() + _p8(true) + _p8(true) + _p8();
  } else {
    return _p8(false) + _p8(false);
  }
}
