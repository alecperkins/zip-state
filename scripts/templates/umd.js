module.exports = function umdTemplate ({ header, name, code }) {
    return `${header ? header + '\n' : ''}"use strict";
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory); // AMD
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory(); // Node CommonJS
        module.exports.default = module.exports; // Transpiled Typescript
    } else {
        root.${ name } = factory(); // Browser window
  }
}(typeof self !== 'undefined' ? self : this, function () {
    ${code}
}));
`
};
