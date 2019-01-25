/* ============
 * Core Mutations
 * ============
 *
 * The mutations available to the core module.
 */

 import {
  SET_KEY,
} from './mutation-types';

export default {
  [SET_KEY](state, obj) {
    state[obj.key] = obj.value;
  },
};
