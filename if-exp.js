'use strict';

module.exports = function afterIff(cond, value, resolved) {
  return {
    then: function afterThen(newValue) {
      value = resolved ? value : newValue;
      resolved = cond;
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
