'use strict';
var $ = require('../internals/export');
var IS_PURE = require('../internals/is-pure');
var anObject = require('../internals/an-object');
var aFunction = require('../internals/a-function');

// `Set.prototype.update` method
// https://github.com/tc39/proposal-collection-methods
$({ target: 'Map', proto: true, real: true, forced: IS_PURE }, {
  update: function update(key, callback /* , thunk */) {
    var map = anObject(this);
    aFunction(callback);
    var isPresentInMap = map.has(key);
    if (!isPresentInMap && arguments.length < 3) {
      throw TypeError('Updating absent value');
    }
    var value = isPresentInMap ? map.get(key) : aFunction(arguments[2])(key, map);
    map.set(key, callback(value, key, map));
    return map;
  }
});
