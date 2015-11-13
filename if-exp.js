'use strict';

module.exports = function afterIff(cond, value, resolved) {
  function toValue(val){
    return typeof val === 'function' ? val() : val;
  }
  return {
    then: function afterThen(newValue) {
      value = resolved ? value : newValue;
      resolved = toValue(cond);
      return {
        elseIff: function (newCond) {
          return afterIff(resolved ? cond : newCond, value, resolved);
        },
        otherwise: function (defaultVal) {
          return resolved ? value : defaultVal;
        }
      };
    }
  };
};
