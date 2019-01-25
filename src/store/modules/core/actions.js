/* ============
 * Core Actions
 * ============
 *
 * The actions that are available on the
 * core module.
 */

import * as types from './mutation-types';

export const setKey = ({ commit }, obj) => {
  /**
   * If you need to modify/fetch some data before performing a mutation
   * this is where you would perform that action.
   */
  commit(types.SET_KEY, obj);
};

export default {
  setKey,
};
