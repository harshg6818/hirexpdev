import Vue from 'vue';
import {
  each,
  orderBy,
  sortBy,
  indexOf,
  find,
  findIndex,
  includes,
  reduce,
  isEqual,
  isObject,
  transform
} from 'lodash';

Object.defineProperty(Vue.prototype, '$lodash', {
  value: {
    each,
    orderBy,
    sortBy,
    indexOf,
    find,
    findIndex,
    includes,
    reduce,
    isEqual,
    isObject,
    transform
  }
});
