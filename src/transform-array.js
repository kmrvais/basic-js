const { NotImplementedError } = require('../extensions/index.js');
const CONTROLS = {
  DOUBLE_NEXT: '--double-next',
  DISCARD_PREV: '--discard-prev',
  DISCARD_NEXT: '--discard-next',
  DOUBLE_PREV: '--double-prev',
}

/**
 * Create transformed array based on the control sequences that original
 * array contains
 * 
 * @param {Array} arr initial array
 * @returns {Array} transformed array
 * 
 * @example
 * 
 * transform([1, 2, 3, '--double-next', 4, 5]) => [1, 2, 3, 4, 4, 5]
 * transform([1, 2, 3, '--discard-prev', 4, 5]) => [1, 2, 4, 5]
 * 
 */
function transform(arr) {

  if (!Array.isArray(arr)) {
    throw new Error("'arr' parameter must be an instance of the Array!")
  }

  let newArr = [];
  let allowAdd = true;
  let allowControls = Object.values(CONTROLS);

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === CONTROLS.DOUBLE_NEXT && i < arr.length - 1) {
      newArr.push(arr[i+1])
    }
    if (arr[i] === CONTROLS.DISCARD_PREV && i > 0) {
      newArr.splice(newArr.length - 1, 1)
    }
    if (arr[i] === CONTROLS.DISCARD_NEXT && i < arr.length - 1) {
      allowAdd = false
    }
    if (arr[i] === CONTROLS.DOUBLE_PREV && i > 0) {
      newArr.push(newArr[newArr.length - 1])
    }
    if (!allowControls.includes(arr[i]) && allowAdd) {
      newArr.push(arr[i])
    }
    allowAdd = true;
  }
  return newArr
}

module.exports = {
  transform
};
