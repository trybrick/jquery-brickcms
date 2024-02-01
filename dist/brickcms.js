(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("BrickCms", [], factory);
	else if(typeof exports === 'object')
		exports["BrickCms"] = factory();
	else
		root["BrickCms"] = factory();
})(self, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/js-cookie/dist/js.cookie.js":
/*!**************************************************!*\
  !*** ./node_modules/js-cookie/dist/js.cookie.js ***!
  \**************************************************/
/***/ (function(module) {

/*! js-cookie v3.0.5 | MIT */
;
(function (global, factory) {
   true ? module.exports = factory() :
  0;
})(this, (function () { 'use strict';

  /* eslint-disable no-var */
  function assign (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        target[key] = source[key];
      }
    }
    return target
  }
  /* eslint-enable no-var */

  /* eslint-disable no-var */
  var defaultConverter = {
    read: function (value) {
      if (value[0] === '"') {
        value = value.slice(1, -1);
      }
      return value.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent)
    },
    write: function (value) {
      return encodeURIComponent(value).replace(
        /%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,
        decodeURIComponent
      )
    }
  };
  /* eslint-enable no-var */

  /* eslint-disable no-var */

  function init (converter, defaultAttributes) {
    function set (name, value, attributes) {
      if (typeof document === 'undefined') {
        return
      }

      attributes = assign({}, defaultAttributes, attributes);

      if (typeof attributes.expires === 'number') {
        attributes.expires = new Date(Date.now() + attributes.expires * 864e5);
      }
      if (attributes.expires) {
        attributes.expires = attributes.expires.toUTCString();
      }

      name = encodeURIComponent(name)
        .replace(/%(2[346B]|5E|60|7C)/g, decodeURIComponent)
        .replace(/[()]/g, escape);

      var stringifiedAttributes = '';
      for (var attributeName in attributes) {
        if (!attributes[attributeName]) {
          continue
        }

        stringifiedAttributes += '; ' + attributeName;

        if (attributes[attributeName] === true) {
          continue
        }

        // Considers RFC 6265 section 5.2:
        // ...
        // 3.  If the remaining unparsed-attributes contains a %x3B (";")
        //     character:
        // Consume the characters of the unparsed-attributes up to,
        // not including, the first %x3B (";") character.
        // ...
        stringifiedAttributes += '=' + attributes[attributeName].split(';')[0];
      }

      return (document.cookie =
        name + '=' + converter.write(value, name) + stringifiedAttributes)
    }

    function get (name) {
      if (typeof document === 'undefined' || (arguments.length && !name)) {
        return
      }

      // To prevent the for loop in the first place assign an empty array
      // in case there are no cookies at all.
      var cookies = document.cookie ? document.cookie.split('; ') : [];
      var jar = {};
      for (var i = 0; i < cookies.length; i++) {
        var parts = cookies[i].split('=');
        var value = parts.slice(1).join('=');

        try {
          var found = decodeURIComponent(parts[0]);
          jar[found] = converter.read(value, found);

          if (name === found) {
            break
          }
        } catch (e) {}
      }

      return name ? jar[name] : jar
    }

    return Object.create(
      {
        set,
        get,
        remove: function (name, attributes) {
          set(
            name,
            '',
            assign({}, attributes, {
              expires: -1
            })
          );
        },
        withAttributes: function (attributes) {
          return init(this.converter, assign({}, this.attributes, attributes))
        },
        withConverter: function (converter) {
          return init(assign({}, this.converter, converter), this.attributes)
        }
      },
      {
        attributes: { value: Object.freeze(defaultAttributes) },
        converter: { value: Object.freeze(converter) }
      }
    )
  }

  var api = init(defaultConverter, { path: '/' });
  /* eslint-enable no-var */

  return api;

}));


/***/ }),

/***/ "./src/brickcms.ts":
/*!*************************!*\
  !*** ./src/brickcms.ts ***!
  \*************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var Cookies = __webpack_require__(/*! js-cookie */ "./node_modules/js-cookie/dist/js.cookie.js");
// @ts-ignore
var jQuery = window.jQuery || window.$;
// Defined namespace BrickCms
var BrickCmsClass = /** @class */ (function () {
    function BrickCmsClass() {
    }
    BrickCmsClass.prototype.doGeoIP = function (jsonpUrl, callback) {
        // this.jsonp(jsonpUrl || '//freegeoip.net/json/', callback);
        callback({ latitude: 1, longitude: 1 });
    };
    BrickCmsClass.prototype.myStoreId = function () {
        // @ts-ignore
        return Cookies.get('myStoreId');
    };
    BrickCmsClass.prototype.decode = function (str) {
        try {
            return decodeURIComponent(str.replace(/\+/g, ' '));
        }
        catch (e) {
            return str;
        }
    };
    BrickCmsClass.prototype.encode = function (str) {
        try {
            return encodeURIComponent(str);
        }
        catch (e) {
            return str;
        }
    };
    BrickCmsClass.prototype.queryParseString = function (qstr) {
        qstr = (qstr || '').replace('?', '').replace('#', '');
        var pattern = /(\w+)\[(\d+)\]/;
        var decode = this.decode, obj = {}, a = qstr.split('&');
        for (var i = 0; i < a.length; i++) {
            var parts = a[i].split('='), key = decode(parts[0]), m = pattern.exec(key);
            if (m) {
                obj[m[1]] = obj[m[1]] || [];
                obj[m[1]][m[2]] = decode(parts[1]);
                continue;
            }
            obj[parts[0]] = decode(parts[1] || '');
        }
        return obj;
    };
    BrickCmsClass.prototype.queryStringify = function (obj, prefix) {
        var encode = this.encode;
        var str = [], p;
        for (p in obj) {
            if (obj.hasOwnProperty(p)) {
                var k = prefix ? prefix + '[' + p + ']' : p, v = obj[p];
                str.push((v !== null && typeof v === 'object') ?
                    this.queryStringify(v, k) :
                    encode(k) + '=' + encode(v));
            }
        }
        return str.join('&');
    };
    BrickCmsClass.prototype.geoDistance = function (latitude1, longitude1, latitude2, longitude2, options) {
        options = options || {};
        function toRad(num) {
            return num * Math.PI / 180;
        }
        var start = { latitude: latitude1, longitude: longitude1 };
        var end = { latitude: latitude2, longitude: longitude2 };
        var radii = { km: 6371, mile: 3960, meter: 6371000, nmi: 3440 };
        var R = options.unit in radii ? radii[options.unit] : radii.km;
        var dLat = toRad(end.latitude - start.latitude);
        var dLon = toRad(end.longitude - start.longitude);
        var lat1 = toRad(start.latitude);
        var lat2 = toRad(end.latitude);
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        if (options.threshold) {
            return options.threshold > (R * c);
        }
        return R * c;
    };
    BrickCmsClass.prototype.geoOrderByOrigin = function (points, origin, callback) {
        var _this = this;
        var results = [];
        points.forEach(function (point) {
            var d = _this.geoDistance(origin.Latitude, origin.Longitude, point.Latitude, point.Longitude, { unit: 'mile' });
            var newPoint = { point: point, distance: d };
            results.push(newPoint);
        });
        this.sortOn(results, 'distance');
        callback({ origin: origin, results: results });
    };
    BrickCmsClass.prototype.storeSelect = function (storeId) {
        // @ts-ignore
        Cookies.set('myStoreId', storeId);
    };
    BrickCmsClass.prototype.sortOn = function (collection, name) {
        if (!collection)
            return null;
        if (collection.length <= 0)
            return [];
        // detect attribute type, problem is if your first object is null or not string then this breaks
        if (typeof (collection[0][name]) === 'string') {
            collection.sort(function (a, b) {
                if ((a[name] && a[name].toLowerCase()) < (b[name] && b[name].toLowerCase()))
                    return -1;
                if ((a[name] && a[name].toLowerCase()) > (b[name] && b[name].toLowerCase()))
                    return 1;
                return 0;
            });
        }
        else {
            collection.sort(function (a, b) {
                if (a[name] < b[name])
                    return -1;
                if (a[name] > b[name])
                    return 1;
                return 0;
            });
        }
        return collection;
    };
    BrickCmsClass.prototype.load = function () {
        var that = this;
        // do loading
        // 1. automatic geocode ip address and store it on $brx.myGeo
        jQuery.getJSON('https://cdn2.brickinc.net/geoipme/?buster=' + (new Date().getTime()), function (rst) {
            that.myGeo = rst;
        });
    };
    return BrickCmsClass;
}());
module.exports = new BrickCmsClass();


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/brickcms.ts");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7OztVRXRCQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL0JyaWNrQ21zL3dlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIndlYnBhY2s6Ly9Ccmlja0Ntcy8uL25vZGVfbW9kdWxlcy9qcy1jb29raWUvZGlzdC9qcy5jb29raWUuanMiLCJ3ZWJwYWNrOi8vQnJpY2tDbXMvLi9zcmMvYnJpY2tjbXMudHMiLCJ3ZWJwYWNrOi8vQnJpY2tDbXMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vQnJpY2tDbXMvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9Ccmlja0Ntcy93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vQnJpY2tDbXMvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFwiQnJpY2tDbXNcIiwgW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiQnJpY2tDbXNcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiQnJpY2tDbXNcIl0gPSBmYWN0b3J5KCk7XG59KShzZWxmLCAoKSA9PiB7XG5yZXR1cm4gIiwiLyohIGpzLWNvb2tpZSB2My4wLjUgfCBNSVQgKi9cbjtcbihmdW5jdGlvbiAoZ2xvYmFsLCBmYWN0b3J5KSB7XG4gIHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyA/IG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpIDpcbiAgdHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kID8gZGVmaW5lKGZhY3RvcnkpIDpcbiAgKGdsb2JhbCA9IHR5cGVvZiBnbG9iYWxUaGlzICE9PSAndW5kZWZpbmVkJyA/IGdsb2JhbFRoaXMgOiBnbG9iYWwgfHwgc2VsZiwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgY3VycmVudCA9IGdsb2JhbC5Db29raWVzO1xuICAgIHZhciBleHBvcnRzID0gZ2xvYmFsLkNvb2tpZXMgPSBmYWN0b3J5KCk7XG4gICAgZXhwb3J0cy5ub0NvbmZsaWN0ID0gZnVuY3Rpb24gKCkgeyBnbG9iYWwuQ29va2llcyA9IGN1cnJlbnQ7IHJldHVybiBleHBvcnRzOyB9O1xuICB9KSgpKTtcbn0pKHRoaXMsIChmdW5jdGlvbiAoKSB7ICd1c2Ugc3RyaWN0JztcblxuICAvKiBlc2xpbnQtZGlzYWJsZSBuby12YXIgKi9cbiAgZnVuY3Rpb24gYXNzaWduICh0YXJnZXQpIHtcbiAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgIGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHtcbiAgICAgICAgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRhcmdldFxuICB9XG4gIC8qIGVzbGludC1lbmFibGUgbm8tdmFyICovXG5cbiAgLyogZXNsaW50LWRpc2FibGUgbm8tdmFyICovXG4gIHZhciBkZWZhdWx0Q29udmVydGVyID0ge1xuICAgIHJlYWQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgaWYgKHZhbHVlWzBdID09PSAnXCInKSB7XG4gICAgICAgIHZhbHVlID0gdmFsdWUuc2xpY2UoMSwgLTEpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHZhbHVlLnJlcGxhY2UoLyglW1xcZEEtRl17Mn0pKy9naSwgZGVjb2RlVVJJQ29tcG9uZW50KVxuICAgIH0sXG4gICAgd3JpdGU6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgcmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudCh2YWx1ZSkucmVwbGFjZShcbiAgICAgICAgLyUoMlszNDZCRl18M1tBQy1GXXw0MHw1W0JERV18NjB8N1tCQ0RdKS9nLFxuICAgICAgICBkZWNvZGVVUklDb21wb25lbnRcbiAgICAgIClcbiAgICB9XG4gIH07XG4gIC8qIGVzbGludC1lbmFibGUgbm8tdmFyICovXG5cbiAgLyogZXNsaW50LWRpc2FibGUgbm8tdmFyICovXG5cbiAgZnVuY3Rpb24gaW5pdCAoY29udmVydGVyLCBkZWZhdWx0QXR0cmlidXRlcykge1xuICAgIGZ1bmN0aW9uIHNldCAobmFtZSwgdmFsdWUsIGF0dHJpYnV0ZXMpIHtcbiAgICAgIGlmICh0eXBlb2YgZG9jdW1lbnQgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICBhdHRyaWJ1dGVzID0gYXNzaWduKHt9LCBkZWZhdWx0QXR0cmlidXRlcywgYXR0cmlidXRlcyk7XG5cbiAgICAgIGlmICh0eXBlb2YgYXR0cmlidXRlcy5leHBpcmVzID09PSAnbnVtYmVyJykge1xuICAgICAgICBhdHRyaWJ1dGVzLmV4cGlyZXMgPSBuZXcgRGF0ZShEYXRlLm5vdygpICsgYXR0cmlidXRlcy5leHBpcmVzICogODY0ZTUpO1xuICAgICAgfVxuICAgICAgaWYgKGF0dHJpYnV0ZXMuZXhwaXJlcykge1xuICAgICAgICBhdHRyaWJ1dGVzLmV4cGlyZXMgPSBhdHRyaWJ1dGVzLmV4cGlyZXMudG9VVENTdHJpbmcoKTtcbiAgICAgIH1cblxuICAgICAgbmFtZSA9IGVuY29kZVVSSUNvbXBvbmVudChuYW1lKVxuICAgICAgICAucmVwbGFjZSgvJSgyWzM0NkJdfDVFfDYwfDdDKS9nLCBkZWNvZGVVUklDb21wb25lbnQpXG4gICAgICAgIC5yZXBsYWNlKC9bKCldL2csIGVzY2FwZSk7XG5cbiAgICAgIHZhciBzdHJpbmdpZmllZEF0dHJpYnV0ZXMgPSAnJztcbiAgICAgIGZvciAodmFyIGF0dHJpYnV0ZU5hbWUgaW4gYXR0cmlidXRlcykge1xuICAgICAgICBpZiAoIWF0dHJpYnV0ZXNbYXR0cmlidXRlTmFtZV0pIHtcbiAgICAgICAgICBjb250aW51ZVxuICAgICAgICB9XG5cbiAgICAgICAgc3RyaW5naWZpZWRBdHRyaWJ1dGVzICs9ICc7ICcgKyBhdHRyaWJ1dGVOYW1lO1xuXG4gICAgICAgIGlmIChhdHRyaWJ1dGVzW2F0dHJpYnV0ZU5hbWVdID09PSB0cnVlKSB7XG4gICAgICAgICAgY29udGludWVcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIENvbnNpZGVycyBSRkMgNjI2NSBzZWN0aW9uIDUuMjpcbiAgICAgICAgLy8gLi4uXG4gICAgICAgIC8vIDMuICBJZiB0aGUgcmVtYWluaW5nIHVucGFyc2VkLWF0dHJpYnV0ZXMgY29udGFpbnMgYSAleDNCIChcIjtcIilcbiAgICAgICAgLy8gICAgIGNoYXJhY3RlcjpcbiAgICAgICAgLy8gQ29uc3VtZSB0aGUgY2hhcmFjdGVycyBvZiB0aGUgdW5wYXJzZWQtYXR0cmlidXRlcyB1cCB0byxcbiAgICAgICAgLy8gbm90IGluY2x1ZGluZywgdGhlIGZpcnN0ICV4M0IgKFwiO1wiKSBjaGFyYWN0ZXIuXG4gICAgICAgIC8vIC4uLlxuICAgICAgICBzdHJpbmdpZmllZEF0dHJpYnV0ZXMgKz0gJz0nICsgYXR0cmlidXRlc1thdHRyaWJ1dGVOYW1lXS5zcGxpdCgnOycpWzBdO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gKGRvY3VtZW50LmNvb2tpZSA9XG4gICAgICAgIG5hbWUgKyAnPScgKyBjb252ZXJ0ZXIud3JpdGUodmFsdWUsIG5hbWUpICsgc3RyaW5naWZpZWRBdHRyaWJ1dGVzKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldCAobmFtZSkge1xuICAgICAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gJ3VuZGVmaW5lZCcgfHwgKGFyZ3VtZW50cy5sZW5ndGggJiYgIW5hbWUpKSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICAvLyBUbyBwcmV2ZW50IHRoZSBmb3IgbG9vcCBpbiB0aGUgZmlyc3QgcGxhY2UgYXNzaWduIGFuIGVtcHR5IGFycmF5XG4gICAgICAvLyBpbiBjYXNlIHRoZXJlIGFyZSBubyBjb29raWVzIGF0IGFsbC5cbiAgICAgIHZhciBjb29raWVzID0gZG9jdW1lbnQuY29va2llID8gZG9jdW1lbnQuY29va2llLnNwbGl0KCc7ICcpIDogW107XG4gICAgICB2YXIgamFyID0ge307XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNvb2tpZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIHBhcnRzID0gY29va2llc1tpXS5zcGxpdCgnPScpO1xuICAgICAgICB2YXIgdmFsdWUgPSBwYXJ0cy5zbGljZSgxKS5qb2luKCc9Jyk7XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICB2YXIgZm91bmQgPSBkZWNvZGVVUklDb21wb25lbnQocGFydHNbMF0pO1xuICAgICAgICAgIGphcltmb3VuZF0gPSBjb252ZXJ0ZXIucmVhZCh2YWx1ZSwgZm91bmQpO1xuXG4gICAgICAgICAgaWYgKG5hbWUgPT09IGZvdW5kKSB7XG4gICAgICAgICAgICBicmVha1xuICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoZSkge31cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG5hbWUgPyBqYXJbbmFtZV0gOiBqYXJcbiAgICB9XG5cbiAgICByZXR1cm4gT2JqZWN0LmNyZWF0ZShcbiAgICAgIHtcbiAgICAgICAgc2V0LFxuICAgICAgICBnZXQsXG4gICAgICAgIHJlbW92ZTogZnVuY3Rpb24gKG5hbWUsIGF0dHJpYnV0ZXMpIHtcbiAgICAgICAgICBzZXQoXG4gICAgICAgICAgICBuYW1lLFxuICAgICAgICAgICAgJycsXG4gICAgICAgICAgICBhc3NpZ24oe30sIGF0dHJpYnV0ZXMsIHtcbiAgICAgICAgICAgICAgZXhwaXJlczogLTFcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgKTtcbiAgICAgICAgfSxcbiAgICAgICAgd2l0aEF0dHJpYnV0ZXM6IGZ1bmN0aW9uIChhdHRyaWJ1dGVzKSB7XG4gICAgICAgICAgcmV0dXJuIGluaXQodGhpcy5jb252ZXJ0ZXIsIGFzc2lnbih7fSwgdGhpcy5hdHRyaWJ1dGVzLCBhdHRyaWJ1dGVzKSlcbiAgICAgICAgfSxcbiAgICAgICAgd2l0aENvbnZlcnRlcjogZnVuY3Rpb24gKGNvbnZlcnRlcikge1xuICAgICAgICAgIHJldHVybiBpbml0KGFzc2lnbih7fSwgdGhpcy5jb252ZXJ0ZXIsIGNvbnZlcnRlciksIHRoaXMuYXR0cmlidXRlcylcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgYXR0cmlidXRlczogeyB2YWx1ZTogT2JqZWN0LmZyZWV6ZShkZWZhdWx0QXR0cmlidXRlcykgfSxcbiAgICAgICAgY29udmVydGVyOiB7IHZhbHVlOiBPYmplY3QuZnJlZXplKGNvbnZlcnRlcikgfVxuICAgICAgfVxuICAgIClcbiAgfVxuXG4gIHZhciBhcGkgPSBpbml0KGRlZmF1bHRDb252ZXJ0ZXIsIHsgcGF0aDogJy8nIH0pO1xuICAvKiBlc2xpbnQtZW5hYmxlIG5vLXZhciAqL1xuXG4gIHJldHVybiBhcGk7XG5cbn0pKTtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIENvb2tpZXMgPSByZXF1aXJlKFwianMtY29va2llXCIpO1xuLy8gQHRzLWlnbm9yZVxudmFyIGpRdWVyeSA9IHdpbmRvdy5qUXVlcnkgfHwgd2luZG93LiQ7XG4vLyBEZWZpbmVkIG5hbWVzcGFjZSBCcmlja0Ntc1xudmFyIEJyaWNrQ21zQ2xhc3MgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQnJpY2tDbXNDbGFzcygpIHtcbiAgICB9XG4gICAgQnJpY2tDbXNDbGFzcy5wcm90b3R5cGUuZG9HZW9JUCA9IGZ1bmN0aW9uIChqc29ucFVybCwgY2FsbGJhY2spIHtcbiAgICAgICAgLy8gdGhpcy5qc29ucChqc29ucFVybCB8fCAnLy9mcmVlZ2VvaXAubmV0L2pzb24vJywgY2FsbGJhY2spO1xuICAgICAgICBjYWxsYmFjayh7IGxhdGl0dWRlOiAxLCBsb25naXR1ZGU6IDEgfSk7XG4gICAgfTtcbiAgICBCcmlja0Ntc0NsYXNzLnByb3RvdHlwZS5teVN0b3JlSWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgcmV0dXJuIENvb2tpZXMuZ2V0KCdteVN0b3JlSWQnKTtcbiAgICB9O1xuICAgIEJyaWNrQ21zQ2xhc3MucHJvdG90eXBlLmRlY29kZSA9IGZ1bmN0aW9uIChzdHIpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJldHVybiBkZWNvZGVVUklDb21wb25lbnQoc3RyLnJlcGxhY2UoL1xcKy9nLCAnICcpKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgcmV0dXJuIHN0cjtcbiAgICAgICAgfVxuICAgIH07XG4gICAgQnJpY2tDbXNDbGFzcy5wcm90b3R5cGUuZW5jb2RlID0gZnVuY3Rpb24gKHN0cikge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudChzdHIpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICByZXR1cm4gc3RyO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBCcmlja0Ntc0NsYXNzLnByb3RvdHlwZS5xdWVyeVBhcnNlU3RyaW5nID0gZnVuY3Rpb24gKHFzdHIpIHtcbiAgICAgICAgcXN0ciA9IChxc3RyIHx8ICcnKS5yZXBsYWNlKCc/JywgJycpLnJlcGxhY2UoJyMnLCAnJyk7XG4gICAgICAgIHZhciBwYXR0ZXJuID0gLyhcXHcrKVxcWyhcXGQrKVxcXS87XG4gICAgICAgIHZhciBkZWNvZGUgPSB0aGlzLmRlY29kZSwgb2JqID0ge30sIGEgPSBxc3RyLnNwbGl0KCcmJyk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIHBhcnRzID0gYVtpXS5zcGxpdCgnPScpLCBrZXkgPSBkZWNvZGUocGFydHNbMF0pLCBtID0gcGF0dGVybi5leGVjKGtleSk7XG4gICAgICAgICAgICBpZiAobSkge1xuICAgICAgICAgICAgICAgIG9ialttWzFdXSA9IG9ialttWzFdXSB8fCBbXTtcbiAgICAgICAgICAgICAgICBvYmpbbVsxXV1bbVsyXV0gPSBkZWNvZGUocGFydHNbMV0pO1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb2JqW3BhcnRzWzBdXSA9IGRlY29kZShwYXJ0c1sxXSB8fCAnJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG9iajtcbiAgICB9O1xuICAgIEJyaWNrQ21zQ2xhc3MucHJvdG90eXBlLnF1ZXJ5U3RyaW5naWZ5ID0gZnVuY3Rpb24gKG9iaiwgcHJlZml4KSB7XG4gICAgICAgIHZhciBlbmNvZGUgPSB0aGlzLmVuY29kZTtcbiAgICAgICAgdmFyIHN0ciA9IFtdLCBwO1xuICAgICAgICBmb3IgKHAgaW4gb2JqKSB7XG4gICAgICAgICAgICBpZiAob2JqLmhhc093blByb3BlcnR5KHApKSB7XG4gICAgICAgICAgICAgICAgdmFyIGsgPSBwcmVmaXggPyBwcmVmaXggKyAnWycgKyBwICsgJ10nIDogcCwgdiA9IG9ialtwXTtcbiAgICAgICAgICAgICAgICBzdHIucHVzaCgodiAhPT0gbnVsbCAmJiB0eXBlb2YgdiA9PT0gJ29iamVjdCcpID9cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5xdWVyeVN0cmluZ2lmeSh2LCBrKSA6XG4gICAgICAgICAgICAgICAgICAgIGVuY29kZShrKSArICc9JyArIGVuY29kZSh2KSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHN0ci5qb2luKCcmJyk7XG4gICAgfTtcbiAgICBCcmlja0Ntc0NsYXNzLnByb3RvdHlwZS5nZW9EaXN0YW5jZSA9IGZ1bmN0aW9uIChsYXRpdHVkZTEsIGxvbmdpdHVkZTEsIGxhdGl0dWRlMiwgbG9uZ2l0dWRlMiwgb3B0aW9ucykge1xuICAgICAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICAgICAgZnVuY3Rpb24gdG9SYWQobnVtKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVtICogTWF0aC5QSSAvIDE4MDtcbiAgICAgICAgfVxuICAgICAgICB2YXIgc3RhcnQgPSB7IGxhdGl0dWRlOiBsYXRpdHVkZTEsIGxvbmdpdHVkZTogbG9uZ2l0dWRlMSB9O1xuICAgICAgICB2YXIgZW5kID0geyBsYXRpdHVkZTogbGF0aXR1ZGUyLCBsb25naXR1ZGU6IGxvbmdpdHVkZTIgfTtcbiAgICAgICAgdmFyIHJhZGlpID0geyBrbTogNjM3MSwgbWlsZTogMzk2MCwgbWV0ZXI6IDYzNzEwMDAsIG5taTogMzQ0MCB9O1xuICAgICAgICB2YXIgUiA9IG9wdGlvbnMudW5pdCBpbiByYWRpaSA/IHJhZGlpW29wdGlvbnMudW5pdF0gOiByYWRpaS5rbTtcbiAgICAgICAgdmFyIGRMYXQgPSB0b1JhZChlbmQubGF0aXR1ZGUgLSBzdGFydC5sYXRpdHVkZSk7XG4gICAgICAgIHZhciBkTG9uID0gdG9SYWQoZW5kLmxvbmdpdHVkZSAtIHN0YXJ0LmxvbmdpdHVkZSk7XG4gICAgICAgIHZhciBsYXQxID0gdG9SYWQoc3RhcnQubGF0aXR1ZGUpO1xuICAgICAgICB2YXIgbGF0MiA9IHRvUmFkKGVuZC5sYXRpdHVkZSk7XG4gICAgICAgIHZhciBhID0gTWF0aC5zaW4oZExhdCAvIDIpICogTWF0aC5zaW4oZExhdCAvIDIpICsgTWF0aC5zaW4oZExvbiAvIDIpICogTWF0aC5zaW4oZExvbiAvIDIpICogTWF0aC5jb3MobGF0MSkgKiBNYXRoLmNvcyhsYXQyKTtcbiAgICAgICAgdmFyIGMgPSAyICogTWF0aC5hdGFuMihNYXRoLnNxcnQoYSksIE1hdGguc3FydCgxIC0gYSkpO1xuICAgICAgICBpZiAob3B0aW9ucy50aHJlc2hvbGQpIHtcbiAgICAgICAgICAgIHJldHVybiBvcHRpb25zLnRocmVzaG9sZCA+IChSICogYyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFIgKiBjO1xuICAgIH07XG4gICAgQnJpY2tDbXNDbGFzcy5wcm90b3R5cGUuZ2VvT3JkZXJCeU9yaWdpbiA9IGZ1bmN0aW9uIChwb2ludHMsIG9yaWdpbiwgY2FsbGJhY2spIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdmFyIHJlc3VsdHMgPSBbXTtcbiAgICAgICAgcG9pbnRzLmZvckVhY2goZnVuY3Rpb24gKHBvaW50KSB7XG4gICAgICAgICAgICB2YXIgZCA9IF90aGlzLmdlb0Rpc3RhbmNlKG9yaWdpbi5MYXRpdHVkZSwgb3JpZ2luLkxvbmdpdHVkZSwgcG9pbnQuTGF0aXR1ZGUsIHBvaW50LkxvbmdpdHVkZSwgeyB1bml0OiAnbWlsZScgfSk7XG4gICAgICAgICAgICB2YXIgbmV3UG9pbnQgPSB7IHBvaW50OiBwb2ludCwgZGlzdGFuY2U6IGQgfTtcbiAgICAgICAgICAgIHJlc3VsdHMucHVzaChuZXdQb2ludCk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnNvcnRPbihyZXN1bHRzLCAnZGlzdGFuY2UnKTtcbiAgICAgICAgY2FsbGJhY2soeyBvcmlnaW46IG9yaWdpbiwgcmVzdWx0czogcmVzdWx0cyB9KTtcbiAgICB9O1xuICAgIEJyaWNrQ21zQ2xhc3MucHJvdG90eXBlLnN0b3JlU2VsZWN0ID0gZnVuY3Rpb24gKHN0b3JlSWQpIHtcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICBDb29raWVzLnNldCgnbXlTdG9yZUlkJywgc3RvcmVJZCk7XG4gICAgfTtcbiAgICBCcmlja0Ntc0NsYXNzLnByb3RvdHlwZS5zb3J0T24gPSBmdW5jdGlvbiAoY29sbGVjdGlvbiwgbmFtZSkge1xuICAgICAgICBpZiAoIWNvbGxlY3Rpb24pXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgaWYgKGNvbGxlY3Rpb24ubGVuZ3RoIDw9IDApXG4gICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIC8vIGRldGVjdCBhdHRyaWJ1dGUgdHlwZSwgcHJvYmxlbSBpcyBpZiB5b3VyIGZpcnN0IG9iamVjdCBpcyBudWxsIG9yIG5vdCBzdHJpbmcgdGhlbiB0aGlzIGJyZWFrc1xuICAgICAgICBpZiAodHlwZW9mIChjb2xsZWN0aW9uWzBdW25hbWVdKSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIGNvbGxlY3Rpb24uc29ydChmdW5jdGlvbiAoYSwgYikge1xuICAgICAgICAgICAgICAgIGlmICgoYVtuYW1lXSAmJiBhW25hbWVdLnRvTG93ZXJDYXNlKCkpIDwgKGJbbmFtZV0gJiYgYltuYW1lXS50b0xvd2VyQ2FzZSgpKSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgICAgICAgICAgIGlmICgoYVtuYW1lXSAmJiBhW25hbWVdLnRvTG93ZXJDYXNlKCkpID4gKGJbbmFtZV0gJiYgYltuYW1lXS50b0xvd2VyQ2FzZSgpKSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbGxlY3Rpb24uc29ydChmdW5jdGlvbiAoYSwgYikge1xuICAgICAgICAgICAgICAgIGlmIChhW25hbWVdIDwgYltuYW1lXSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgICAgICAgICAgIGlmIChhW25hbWVdID4gYltuYW1lXSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY29sbGVjdGlvbjtcbiAgICB9O1xuICAgIEJyaWNrQ21zQ2xhc3MucHJvdG90eXBlLmxvYWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgICAgLy8gZG8gbG9hZGluZ1xuICAgICAgICAvLyAxLiBhdXRvbWF0aWMgZ2VvY29kZSBpcCBhZGRyZXNzIGFuZCBzdG9yZSBpdCBvbiAkYnJ4Lm15R2VvXG4gICAgICAgIGpRdWVyeS5nZXRKU09OKCdodHRwczovL2NkbjIuYnJpY2tpbmMubmV0L2dlb2lwbWUvP2J1c3Rlcj0nICsgKG5ldyBEYXRlKCkuZ2V0VGltZSgpKSwgZnVuY3Rpb24gKHJzdCkge1xuICAgICAgICAgICAgdGhhdC5teUdlbyA9IHJzdDtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICByZXR1cm4gQnJpY2tDbXNDbGFzcztcbn0oKSk7XG5tb2R1bGUuZXhwb3J0cyA9IG5ldyBCcmlja0Ntc0NsYXNzKCk7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvYnJpY2tjbXMudHNcIik7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=