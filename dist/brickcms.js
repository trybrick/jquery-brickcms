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
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
/// <reference types='jquery'/>
var Cookies = __importStar(__webpack_require__(/*! js-cookie */ "./node_modules/js-cookie/dist/js.cookie.js"));
var undef, myRoot = {
    document: {},
    navigator: { userAgent: '' },
    location: { protocol: 'file', hostname: '' },
    jQuery: {}
};
// Establish the object that gets returned to break out of a loop iteration.
var breaker = {};
/**
 * if null return default, else return object
 *
 * @param  {any} obj
 * @param  {any} defaultValue
 * @return {any}
 */
function isNull(obj, defaultValue) {
    return (obj === null || obj === undef || isNaN(obj)) ? defaultValue : obj;
}
if (typeof (window) !== 'undefined') {
    myRoot = window;
    myRoot.jQuery = window.jQuery || window.Zepto || window.$;
}
/**
 * Get object keys
 *
 * @type {Array<string>}
 */
var keys = function (obj) {
    if (Object.keys) {
        return Object.keys(obj);
    }
    if (obj !== Object(obj)) {
        throw new TypeError('Invalid object');
    }
    var keys = [], key;
    for (key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key))
            keys.push(key);
    }
    return keys;
};
var userAgent = myRoot.navigator.userAgent || '';
/**
 * @returns {boolean}  true if internet explorer
 */
function detectIe() {
    var ua = userAgent;
    var msie = ua.indexOf('MSIE ');
    var trident = ua.indexOf('Trident/');
    var rv = ua.indexOf('rv:');
    if (msie > 0) {
        // IE 10 or older => return version number
        return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
    }
    if (trident > 0) {
        // IE 11 (or newer) => return version number
        return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
    }
    // other browser
    return false;
}
/**
 * The BrickCms class
 */
var BrickCms = /** @class */ (function () {
    function BrickCms() {
        var that = this;
        var hostname = that.trim(myRoot.location.hostname.toLowerCase());
        that.site = { hostname: hostname, domain: hostname.replace('www.', ''), config: {} };
        that.browser = {
            isIE: detectIe(),
            isMobile: /iP(hone|od|ad)|Android|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune/gi.test(userAgent),
            isAndroid: /(android)/gi.test(userAgent),
            isIOS: /iP(hone|od|ad)/gi.test(userAgent)
        };
        that.cookies = Cookies;
        that.win = myRoot;
        that.doc = myRoot.document;
        that.jq = myRoot.jQuery;
        that.keys = keys;
        that.isNull = isNull;
        // begin
        // 1. automatic geocode ip address and store it
        var url = 'https://cdn2.brickinc.net/geoipme/?buster=' + (new Date().getTime());
        fetch(url)
            .then(function (response) {
            if (!response.ok) {
                throw new Error("HTTP error! status: ".concat(response.status));
            }
            return response.json();
        })
            .then(function (rst) {
            if (rst.latitude) {
                that.myGeo = rst;
            }
        })
            .catch(function (error) {
            console.error('Error fetching geoip:', error);
        });
    }
    Object.defineProperty(BrickCms.prototype, "name", {
        /**
         * get the name of the library
         * @return {string} library name
         */
        get: function () {
            return this._name;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * our internal cache buster base on 10th of minutes
     *
     * yyyyMMddhhm
     * - this format allow us to cache every 10th minutes
     * Note: there is no need to worry about timezone
     * because it should return data base on client's timezone
     * which is already handled by the data returned here
     *
     * @param {Date} date optional date
     */
    BrickCms.prototype.gcb = function (date) {
        if (date === void 0) { date = new Date(); }
        var tzo = -date.getTimezoneOffset(), dif = tzo >= 0 ? '+' : '-', pad = function (num) {
            return (num < 10 ? '0' : '') + num;
        };
        return date.getFullYear() +
            '' + pad(date.getMonth() + 1) +
            '' + pad(date.getDate()) +
            '' + pad(date.getHours()) +
            '' + pad(date.getMinutes())[0];
    };
    /**
     * trim string
     *
     * @param  {string} str the string
     * @return {string}     trimmed result
     */
    BrickCms.prototype.trim = function (str) {
        return (str.trim) ? str.trim() : str.replace(/^\s*|\s*$/g, '');
    };
    /**
     * group a list by some key attribute
     *
     * @param {Array<any>} list      list or array of objects
     * @param {string}     attribute object key property name
     * @param {any)    =>        void}        postProcessFunction do something on each group
     * @return {Array<any>}                      group result
     */
    BrickCms.prototype.groupBy = function (list, attribute, postProcessFunction) {
        if (isNull(list, null) === null)
            return [];
        // First, reset declare result.
        var groups = [], grouper = {};
        // this make sure all elements are correctly sorted
        list.forEach(function (item) {
            var groupKey = item[attribute], group = grouper[groupKey];
            if (isNull(group, null) === null) {
                group = {
                    key: groupKey,
                    items: []
                };
                grouper[groupKey] = group;
            }
            group.items.push(item);
        });
        // let i = 0;
        for (var _i = 0, _a = Object.entries(grouper); _i < _a.length; _i++) {
            var _b = _a[_i], key = _b[0], value = _b[1];
            // value.$idx = i++;
            groups.push(value);
            if (postProcessFunction)
                postProcessFunction(value);
        }
        return this.sortOn(groups, 'key');
    };
    /**
     * get current store id
     *
     * @return {string} the current store id
     */
    BrickCms.prototype.myStoreId = function () {
        return Cookies.get('myStoreId');
    };
    /**
     * safely decodeURIComponent the string
     *
     * @param  {string} str
     * @return {string}     decoded string
     */
    BrickCms.prototype.decode = function (str) {
        try {
            return decodeURIComponent(str.replace(/\+/g, ' '));
        }
        catch (e) {
            return str;
        }
    };
    /**
     * safely encodeURIComponent the string
     *
     * @param  {string} str
     * @return {string}     encoded string
     */
    BrickCms.prototype.encode = function (str) {
        try {
            return encodeURIComponent(str);
        }
        catch (e) {
            return str;
        }
    };
    /**
     * slugify a string
     *
     * @param  {string} str the string to slug
     * @return {string}     slug result
     */
    BrickCms.prototype.slugify = function (str) {
        str = str || '';
        if (str === '')
            return str;
        str = str.toLowerCase().replace(/[^0-9a-z\-\_]+/gi, '-').replace(/[\-]+/gi, '-');
        return str;
    };
    /**
     * helper method to parse querystring to object
     *
     * @param  {string} qstr the querystring
     * @return {any}         result object
     */
    BrickCms.prototype.queryParseString = function (qstr) {
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
    /**
     * reverse object to query string
     *
     * queryStringify({ foo: bar });       // foo=bar
     * queryStringify({ foo: bar }, true); // ?foo=bar
     * queryStringify({ foo: bar }, '#');  // #foo=bar
     * queryStringify({ foo: '' }, '&');   // &foo=
     *
     * @param  {any}    obj    the object
     * @param  {string} prefix optional prefix
     * @return {string}
     */
    BrickCms.prototype.queryStringify = function (obj, prefix) {
        var that = this;
        var encode = that.encode;
        var str = [], p;
        for (p in obj) {
            if (obj.hasOwnProperty(p)) {
                var k = prefix ? prefix + '[' + p + ']' : p, v = obj[p];
                str.push((v !== null && typeof v === 'object') ?
                    that.queryStringify(v, k) :
                    encode(k) + '=' + encode(v));
            }
        }
        return str.join('&');
    };
    /**
     * get distance between two points
     *
     * @param {number} latitude1
     * @param {number} longitude1
     * @param {number} latitude2
     * @param {number} longitude2
     * @param {any}    options
     */
    BrickCms.prototype.geoDistance = function (latitude1, longitude1, latitude2, longitude2, options) {
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
    /**
     * sort with nearest geopoint, expect object with two properties: Latitude and Longitude
     *
     * @param {Array<any>} points
     * @param {any}        origin
     * @param {any)    =>     void}        callback
     */
    BrickCms.prototype.geoOrderByOrigin = function (points, origin, callback) {
        var _this = this;
        var results = [];
        points.forEach(function (point) {
            var d = _this.geoDistance(origin.latitude, origin.longitude, point.latitude, point.longitude, { unit: 'mile' });
            var newPoint = { point: point, distance: d };
            results.push(newPoint);
        });
        this.sortOn(results, 'distance');
        callback({ origin: origin, results: results });
    };
    /**
     * put store selection in cookie
     *
     * @param {string} storeId the selected store id
     */
    BrickCms.prototype.storeSelect = function (storeId) {
        Cookies.set('myStoreId', storeId);
        // trigger event so client can reload page, if required
        this.jq("head").trigger('storeSelected', { store: storeId });
    };
    /**
     * sort a list of object base on some property name
     *
     * @param {Array<any>} collection list of objects
     * @param {string}     name       property name
     * @return {any} sorted list
     */
    BrickCms.prototype.sortOn = function (collection, name) {
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
    return BrickCms;
}());
module.exports = new BrickCms();


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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ZSxZQUFZO0FBQzNCLGdCQUFnQixLQUFLO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDs7Ozs7OztVQ2paQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7O1VFdEJBO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vQnJpY2tDbXMvd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL0JyaWNrQ21zLy4vbm9kZV9tb2R1bGVzL2pzLWNvb2tpZS9kaXN0L2pzLmNvb2tpZS5qcyIsIndlYnBhY2s6Ly9Ccmlja0Ntcy8uL3NyYy9icmlja2Ntcy50cyIsIndlYnBhY2s6Ly9Ccmlja0Ntcy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9Ccmlja0Ntcy93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL0JyaWNrQ21zL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9Ccmlja0Ntcy93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoXCJCcmlja0Ntc1wiLCBbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJCcmlja0Ntc1wiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJCcmlja0Ntc1wiXSA9IGZhY3RvcnkoKTtcbn0pKHNlbGYsICgpID0+IHtcbnJldHVybiAiLCIvKiEganMtY29va2llIHYzLjAuNSB8IE1JVCAqL1xuO1xuKGZ1bmN0aW9uIChnbG9iYWwsIGZhY3RvcnkpIHtcbiAgdHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnID8gbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCkgOlxuICB0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgPyBkZWZpbmUoZmFjdG9yeSkgOlxuICAoZ2xvYmFsID0gdHlwZW9mIGdsb2JhbFRoaXMgIT09ICd1bmRlZmluZWQnID8gZ2xvYmFsVGhpcyA6IGdsb2JhbCB8fCBzZWxmLCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBjdXJyZW50ID0gZ2xvYmFsLkNvb2tpZXM7XG4gICAgdmFyIGV4cG9ydHMgPSBnbG9iYWwuQ29va2llcyA9IGZhY3RvcnkoKTtcbiAgICBleHBvcnRzLm5vQ29uZmxpY3QgPSBmdW5jdGlvbiAoKSB7IGdsb2JhbC5Db29raWVzID0gY3VycmVudDsgcmV0dXJuIGV4cG9ydHM7IH07XG4gIH0pKCkpO1xufSkodGhpcywgKGZ1bmN0aW9uICgpIHsgJ3VzZSBzdHJpY3QnO1xuXG4gIC8qIGVzbGludC1kaXNhYmxlIG5vLXZhciAqL1xuICBmdW5jdGlvbiBhc3NpZ24gKHRhcmdldCkge1xuICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldO1xuICAgICAgZm9yICh2YXIga2V5IGluIHNvdXJjZSkge1xuICAgICAgICB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGFyZ2V0XG4gIH1cbiAgLyogZXNsaW50LWVuYWJsZSBuby12YXIgKi9cblxuICAvKiBlc2xpbnQtZGlzYWJsZSBuby12YXIgKi9cbiAgdmFyIGRlZmF1bHRDb252ZXJ0ZXIgPSB7XG4gICAgcmVhZDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICBpZiAodmFsdWVbMF0gPT09ICdcIicpIHtcbiAgICAgICAgdmFsdWUgPSB2YWx1ZS5zbGljZSgxLCAtMSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdmFsdWUucmVwbGFjZSgvKCVbXFxkQS1GXXsyfSkrL2dpLCBkZWNvZGVVUklDb21wb25lbnQpXG4gICAgfSxcbiAgICB3cml0ZTogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KHZhbHVlKS5yZXBsYWNlKFxuICAgICAgICAvJSgyWzM0NkJGXXwzW0FDLUZdfDQwfDVbQkRFXXw2MHw3W0JDRF0pL2csXG4gICAgICAgIGRlY29kZVVSSUNvbXBvbmVudFxuICAgICAgKVxuICAgIH1cbiAgfTtcbiAgLyogZXNsaW50LWVuYWJsZSBuby12YXIgKi9cblxuICAvKiBlc2xpbnQtZGlzYWJsZSBuby12YXIgKi9cblxuICBmdW5jdGlvbiBpbml0IChjb252ZXJ0ZXIsIGRlZmF1bHRBdHRyaWJ1dGVzKSB7XG4gICAgZnVuY3Rpb24gc2V0IChuYW1lLCB2YWx1ZSwgYXR0cmlidXRlcykge1xuICAgICAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGF0dHJpYnV0ZXMgPSBhc3NpZ24oe30sIGRlZmF1bHRBdHRyaWJ1dGVzLCBhdHRyaWJ1dGVzKTtcblxuICAgICAgaWYgKHR5cGVvZiBhdHRyaWJ1dGVzLmV4cGlyZXMgPT09ICdudW1iZXInKSB7XG4gICAgICAgIGF0dHJpYnV0ZXMuZXhwaXJlcyA9IG5ldyBEYXRlKERhdGUubm93KCkgKyBhdHRyaWJ1dGVzLmV4cGlyZXMgKiA4NjRlNSk7XG4gICAgICB9XG4gICAgICBpZiAoYXR0cmlidXRlcy5leHBpcmVzKSB7XG4gICAgICAgIGF0dHJpYnV0ZXMuZXhwaXJlcyA9IGF0dHJpYnV0ZXMuZXhwaXJlcy50b1VUQ1N0cmluZygpO1xuICAgICAgfVxuXG4gICAgICBuYW1lID0gZW5jb2RlVVJJQ29tcG9uZW50KG5hbWUpXG4gICAgICAgIC5yZXBsYWNlKC8lKDJbMzQ2Ql18NUV8NjB8N0MpL2csIGRlY29kZVVSSUNvbXBvbmVudClcbiAgICAgICAgLnJlcGxhY2UoL1soKV0vZywgZXNjYXBlKTtcblxuICAgICAgdmFyIHN0cmluZ2lmaWVkQXR0cmlidXRlcyA9ICcnO1xuICAgICAgZm9yICh2YXIgYXR0cmlidXRlTmFtZSBpbiBhdHRyaWJ1dGVzKSB7XG4gICAgICAgIGlmICghYXR0cmlidXRlc1thdHRyaWJ1dGVOYW1lXSkge1xuICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgIH1cblxuICAgICAgICBzdHJpbmdpZmllZEF0dHJpYnV0ZXMgKz0gJzsgJyArIGF0dHJpYnV0ZU5hbWU7XG5cbiAgICAgICAgaWYgKGF0dHJpYnV0ZXNbYXR0cmlidXRlTmFtZV0gPT09IHRydWUpIHtcbiAgICAgICAgICBjb250aW51ZVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gQ29uc2lkZXJzIFJGQyA2MjY1IHNlY3Rpb24gNS4yOlxuICAgICAgICAvLyAuLi5cbiAgICAgICAgLy8gMy4gIElmIHRoZSByZW1haW5pbmcgdW5wYXJzZWQtYXR0cmlidXRlcyBjb250YWlucyBhICV4M0IgKFwiO1wiKVxuICAgICAgICAvLyAgICAgY2hhcmFjdGVyOlxuICAgICAgICAvLyBDb25zdW1lIHRoZSBjaGFyYWN0ZXJzIG9mIHRoZSB1bnBhcnNlZC1hdHRyaWJ1dGVzIHVwIHRvLFxuICAgICAgICAvLyBub3QgaW5jbHVkaW5nLCB0aGUgZmlyc3QgJXgzQiAoXCI7XCIpIGNoYXJhY3Rlci5cbiAgICAgICAgLy8gLi4uXG4gICAgICAgIHN0cmluZ2lmaWVkQXR0cmlidXRlcyArPSAnPScgKyBhdHRyaWJ1dGVzW2F0dHJpYnV0ZU5hbWVdLnNwbGl0KCc7JylbMF07XG4gICAgICB9XG5cbiAgICAgIHJldHVybiAoZG9jdW1lbnQuY29va2llID1cbiAgICAgICAgbmFtZSArICc9JyArIGNvbnZlcnRlci53cml0ZSh2YWx1ZSwgbmFtZSkgKyBzdHJpbmdpZmllZEF0dHJpYnV0ZXMpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0IChuYW1lKSB7XG4gICAgICBpZiAodHlwZW9mIGRvY3VtZW50ID09PSAndW5kZWZpbmVkJyB8fCAoYXJndW1lbnRzLmxlbmd0aCAmJiAhbmFtZSkpIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIC8vIFRvIHByZXZlbnQgdGhlIGZvciBsb29wIGluIHRoZSBmaXJzdCBwbGFjZSBhc3NpZ24gYW4gZW1wdHkgYXJyYXlcbiAgICAgIC8vIGluIGNhc2UgdGhlcmUgYXJlIG5vIGNvb2tpZXMgYXQgYWxsLlxuICAgICAgdmFyIGNvb2tpZXMgPSBkb2N1bWVudC5jb29raWUgPyBkb2N1bWVudC5jb29raWUuc3BsaXQoJzsgJykgOiBbXTtcbiAgICAgIHZhciBqYXIgPSB7fTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY29va2llcy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgcGFydHMgPSBjb29raWVzW2ldLnNwbGl0KCc9Jyk7XG4gICAgICAgIHZhciB2YWx1ZSA9IHBhcnRzLnNsaWNlKDEpLmpvaW4oJz0nKTtcblxuICAgICAgICB0cnkge1xuICAgICAgICAgIHZhciBmb3VuZCA9IGRlY29kZVVSSUNvbXBvbmVudChwYXJ0c1swXSk7XG4gICAgICAgICAgamFyW2ZvdW5kXSA9IGNvbnZlcnRlci5yZWFkKHZhbHVlLCBmb3VuZCk7XG5cbiAgICAgICAgICBpZiAobmFtZSA9PT0gZm91bmQpIHtcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlKSB7fVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gbmFtZSA/IGphcltuYW1lXSA6IGphclxuICAgIH1cblxuICAgIHJldHVybiBPYmplY3QuY3JlYXRlKFxuICAgICAge1xuICAgICAgICBzZXQsXG4gICAgICAgIGdldCxcbiAgICAgICAgcmVtb3ZlOiBmdW5jdGlvbiAobmFtZSwgYXR0cmlidXRlcykge1xuICAgICAgICAgIHNldChcbiAgICAgICAgICAgIG5hbWUsXG4gICAgICAgICAgICAnJyxcbiAgICAgICAgICAgIGFzc2lnbih7fSwgYXR0cmlidXRlcywge1xuICAgICAgICAgICAgICBleHBpcmVzOiAtMVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICApO1xuICAgICAgICB9LFxuICAgICAgICB3aXRoQXR0cmlidXRlczogZnVuY3Rpb24gKGF0dHJpYnV0ZXMpIHtcbiAgICAgICAgICByZXR1cm4gaW5pdCh0aGlzLmNvbnZlcnRlciwgYXNzaWduKHt9LCB0aGlzLmF0dHJpYnV0ZXMsIGF0dHJpYnV0ZXMpKVxuICAgICAgICB9LFxuICAgICAgICB3aXRoQ29udmVydGVyOiBmdW5jdGlvbiAoY29udmVydGVyKSB7XG4gICAgICAgICAgcmV0dXJuIGluaXQoYXNzaWduKHt9LCB0aGlzLmNvbnZlcnRlciwgY29udmVydGVyKSwgdGhpcy5hdHRyaWJ1dGVzKVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBhdHRyaWJ1dGVzOiB7IHZhbHVlOiBPYmplY3QuZnJlZXplKGRlZmF1bHRBdHRyaWJ1dGVzKSB9LFxuICAgICAgICBjb252ZXJ0ZXI6IHsgdmFsdWU6IE9iamVjdC5mcmVlemUoY29udmVydGVyKSB9XG4gICAgICB9XG4gICAgKVxuICB9XG5cbiAgdmFyIGFwaSA9IGluaXQoZGVmYXVsdENvbnZlcnRlciwgeyBwYXRoOiAnLycgfSk7XG4gIC8qIGVzbGludC1lbmFibGUgbm8tdmFyICovXG5cbiAgcmV0dXJuIGFwaTtcblxufSkpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19jcmVhdGVCaW5kaW5nID0gKHRoaXMgJiYgdGhpcy5fX2NyZWF0ZUJpbmRpbmcpIHx8IChPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgICB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IobSwgayk7XG4gICAgaWYgKCFkZXNjIHx8IChcImdldFwiIGluIGRlc2MgPyAhbS5fX2VzTW9kdWxlIDogZGVzYy53cml0YWJsZSB8fCBkZXNjLmNvbmZpZ3VyYWJsZSkpIHtcbiAgICAgIGRlc2MgPSB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBtW2tdOyB9IH07XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBrMiwgZGVzYyk7XG59KSA6IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gICAgb1trMl0gPSBtW2tdO1xufSkpO1xudmFyIF9fc2V0TW9kdWxlRGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19zZXRNb2R1bGVEZWZhdWx0KSB8fCAoT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCB2KSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIFwiZGVmYXVsdFwiLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2IH0pO1xufSkgOiBmdW5jdGlvbihvLCB2KSB7XG4gICAgb1tcImRlZmF1bHRcIl0gPSB2O1xufSk7XG52YXIgX19pbXBvcnRTdGFyID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydFN0YXIpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIG93bktleXMgPSBmdW5jdGlvbihvKSB7XG4gICAgICAgIG93bktleXMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyB8fCBmdW5jdGlvbiAobykge1xuICAgICAgICAgICAgdmFyIGFyID0gW107XG4gICAgICAgICAgICBmb3IgKHZhciBrIGluIG8pIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobywgaykpIGFyW2FyLmxlbmd0aF0gPSBrO1xuICAgICAgICAgICAgcmV0dXJuIGFyO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gb3duS2V5cyhvKTtcbiAgICB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAobW9kKSB7XG4gICAgICAgIGlmIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpIHJldHVybiBtb2Q7XG4gICAgICAgIHZhciByZXN1bHQgPSB7fTtcbiAgICAgICAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrID0gb3duS2V5cyhtb2QpLCBpID0gMDsgaSA8IGsubGVuZ3RoOyBpKyspIGlmIChrW2ldICE9PSBcImRlZmF1bHRcIikgX19jcmVhdGVCaW5kaW5nKHJlc3VsdCwgbW9kLCBrW2ldKTtcbiAgICAgICAgX19zZXRNb2R1bGVEZWZhdWx0KHJlc3VsdCwgbW9kKTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9O1xufSkoKTtcbi8vLyA8cmVmZXJlbmNlIHR5cGVzPSdqcXVlcnknLz5cbnZhciBDb29raWVzID0gX19pbXBvcnRTdGFyKHJlcXVpcmUoXCJqcy1jb29raWVcIikpO1xudmFyIHVuZGVmLCBteVJvb3QgPSB7XG4gICAgZG9jdW1lbnQ6IHt9LFxuICAgIG5hdmlnYXRvcjogeyB1c2VyQWdlbnQ6ICcnIH0sXG4gICAgbG9jYXRpb246IHsgcHJvdG9jb2w6ICdmaWxlJywgaG9zdG5hbWU6ICcnIH0sXG4gICAgalF1ZXJ5OiB7fVxufTtcbi8vIEVzdGFibGlzaCB0aGUgb2JqZWN0IHRoYXQgZ2V0cyByZXR1cm5lZCB0byBicmVhayBvdXQgb2YgYSBsb29wIGl0ZXJhdGlvbi5cbnZhciBicmVha2VyID0ge307XG4vKipcbiAqIGlmIG51bGwgcmV0dXJuIGRlZmF1bHQsIGVsc2UgcmV0dXJuIG9iamVjdFxuICpcbiAqIEBwYXJhbSAge2FueX0gb2JqXG4gKiBAcGFyYW0gIHthbnl9IGRlZmF1bHRWYWx1ZVxuICogQHJldHVybiB7YW55fVxuICovXG5mdW5jdGlvbiBpc051bGwob2JqLCBkZWZhdWx0VmFsdWUpIHtcbiAgICByZXR1cm4gKG9iaiA9PT0gbnVsbCB8fCBvYmogPT09IHVuZGVmIHx8IGlzTmFOKG9iaikpID8gZGVmYXVsdFZhbHVlIDogb2JqO1xufVxuaWYgKHR5cGVvZiAod2luZG93KSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBteVJvb3QgPSB3aW5kb3c7XG4gICAgbXlSb290LmpRdWVyeSA9IHdpbmRvdy5qUXVlcnkgfHwgd2luZG93LlplcHRvIHx8IHdpbmRvdy4kO1xufVxuLyoqXG4gKiBHZXQgb2JqZWN0IGtleXNcbiAqXG4gKiBAdHlwZSB7QXJyYXk8c3RyaW5nPn1cbiAqL1xudmFyIGtleXMgPSBmdW5jdGlvbiAob2JqKSB7XG4gICAgaWYgKE9iamVjdC5rZXlzKSB7XG4gICAgICAgIHJldHVybiBPYmplY3Qua2V5cyhvYmopO1xuICAgIH1cbiAgICBpZiAob2JqICE9PSBPYmplY3Qob2JqKSkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdJbnZhbGlkIG9iamVjdCcpO1xuICAgIH1cbiAgICB2YXIga2V5cyA9IFtdLCBrZXk7XG4gICAgZm9yIChrZXkgaW4gb2JqKSB7XG4gICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpKVxuICAgICAgICAgICAga2V5cy5wdXNoKGtleSk7XG4gICAgfVxuICAgIHJldHVybiBrZXlzO1xufTtcbnZhciB1c2VyQWdlbnQgPSBteVJvb3QubmF2aWdhdG9yLnVzZXJBZ2VudCB8fCAnJztcbi8qKlxuICogQHJldHVybnMge2Jvb2xlYW59ICB0cnVlIGlmIGludGVybmV0IGV4cGxvcmVyXG4gKi9cbmZ1bmN0aW9uIGRldGVjdEllKCkge1xuICAgIHZhciB1YSA9IHVzZXJBZ2VudDtcbiAgICB2YXIgbXNpZSA9IHVhLmluZGV4T2YoJ01TSUUgJyk7XG4gICAgdmFyIHRyaWRlbnQgPSB1YS5pbmRleE9mKCdUcmlkZW50LycpO1xuICAgIHZhciBydiA9IHVhLmluZGV4T2YoJ3J2OicpO1xuICAgIGlmIChtc2llID4gMCkge1xuICAgICAgICAvLyBJRSAxMCBvciBvbGRlciA9PiByZXR1cm4gdmVyc2lvbiBudW1iZXJcbiAgICAgICAgcmV0dXJuIHBhcnNlSW50KHVhLnN1YnN0cmluZyhtc2llICsgNSwgdWEuaW5kZXhPZignLicsIG1zaWUpKSwgMTApO1xuICAgIH1cbiAgICBpZiAodHJpZGVudCA+IDApIHtcbiAgICAgICAgLy8gSUUgMTEgKG9yIG5ld2VyKSA9PiByZXR1cm4gdmVyc2lvbiBudW1iZXJcbiAgICAgICAgcmV0dXJuIHBhcnNlSW50KHVhLnN1YnN0cmluZyhydiArIDMsIHVhLmluZGV4T2YoJy4nLCBydikpLCAxMCk7XG4gICAgfVxuICAgIC8vIG90aGVyIGJyb3dzZXJcbiAgICByZXR1cm4gZmFsc2U7XG59XG4vKipcbiAqIFRoZSBCcmlja0NtcyBjbGFzc1xuICovXG52YXIgQnJpY2tDbXMgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQnJpY2tDbXMoKSB7XG4gICAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgICAgdmFyIGhvc3RuYW1lID0gdGhhdC50cmltKG15Um9vdC5sb2NhdGlvbi5ob3N0bmFtZS50b0xvd2VyQ2FzZSgpKTtcbiAgICAgICAgdGhhdC5zaXRlID0geyBob3N0bmFtZTogaG9zdG5hbWUsIGRvbWFpbjogaG9zdG5hbWUucmVwbGFjZSgnd3d3LicsICcnKSwgY29uZmlnOiB7fSB9O1xuICAgICAgICB0aGF0LmJyb3dzZXIgPSB7XG4gICAgICAgICAgICBpc0lFOiBkZXRlY3RJZSgpLFxuICAgICAgICAgICAgaXNNb2JpbGU6IC9pUChob25lfG9kfGFkKXxBbmRyb2lkfEJsYWNrQmVycnl8SUVNb2JpbGV8S2luZGxlfE5ldEZyb250fFNpbGstQWNjZWxlcmF0ZWR8KGhwd3x3ZWIpT1N8RmVubmVjfE1pbmltb3xPcGVyYSBNKG9iaXxpbmkpfEJsYXplcnxEb2xmaW58RG9scGhpbnxTa3lmaXJlfFp1bmUvZ2kudGVzdCh1c2VyQWdlbnQpLFxuICAgICAgICAgICAgaXNBbmRyb2lkOiAvKGFuZHJvaWQpL2dpLnRlc3QodXNlckFnZW50KSxcbiAgICAgICAgICAgIGlzSU9TOiAvaVAoaG9uZXxvZHxhZCkvZ2kudGVzdCh1c2VyQWdlbnQpXG4gICAgICAgIH07XG4gICAgICAgIHRoYXQuY29va2llcyA9IENvb2tpZXM7XG4gICAgICAgIHRoYXQud2luID0gbXlSb290O1xuICAgICAgICB0aGF0LmRvYyA9IG15Um9vdC5kb2N1bWVudDtcbiAgICAgICAgdGhhdC5qcSA9IG15Um9vdC5qUXVlcnk7XG4gICAgICAgIHRoYXQua2V5cyA9IGtleXM7XG4gICAgICAgIHRoYXQuaXNOdWxsID0gaXNOdWxsO1xuICAgICAgICAvLyBiZWdpblxuICAgICAgICAvLyAxLiBhdXRvbWF0aWMgZ2VvY29kZSBpcCBhZGRyZXNzIGFuZCBzdG9yZSBpdFxuICAgICAgICB2YXIgdXJsID0gJ2h0dHBzOi8vY2RuMi5icmlja2luYy5uZXQvZ2VvaXBtZS8/YnVzdGVyPScgKyAobmV3IERhdGUoKS5nZXRUaW1lKCkpO1xuICAgICAgICBmZXRjaCh1cmwpXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgIGlmICghcmVzcG9uc2Uub2spIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJIVFRQIGVycm9yISBzdGF0dXM6IFwiLmNvbmNhdChyZXNwb25zZS5zdGF0dXMpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiByZXNwb25zZS5qc29uKCk7XG4gICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocnN0KSB7XG4gICAgICAgICAgICBpZiAocnN0LmxhdGl0dWRlKSB7XG4gICAgICAgICAgICAgICAgdGhhdC5teUdlbyA9IHJzdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGZldGNoaW5nIGdlb2lwOicsIGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShCcmlja0Ntcy5wcm90b3R5cGUsIFwibmFtZVwiLCB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBnZXQgdGhlIG5hbWUgb2YgdGhlIGxpYnJhcnlcbiAgICAgICAgICogQHJldHVybiB7c3RyaW5nfSBsaWJyYXJ5IG5hbWVcbiAgICAgICAgICovXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX25hbWU7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICAvKipcbiAgICAgKiBvdXIgaW50ZXJuYWwgY2FjaGUgYnVzdGVyIGJhc2Ugb24gMTB0aCBvZiBtaW51dGVzXG4gICAgICpcbiAgICAgKiB5eXl5TU1kZGhobVxuICAgICAqIC0gdGhpcyBmb3JtYXQgYWxsb3cgdXMgdG8gY2FjaGUgZXZlcnkgMTB0aCBtaW51dGVzXG4gICAgICogTm90ZTogdGhlcmUgaXMgbm8gbmVlZCB0byB3b3JyeSBhYm91dCB0aW1lem9uZVxuICAgICAqIGJlY2F1c2UgaXQgc2hvdWxkIHJldHVybiBkYXRhIGJhc2Ugb24gY2xpZW50J3MgdGltZXpvbmVcbiAgICAgKiB3aGljaCBpcyBhbHJlYWR5IGhhbmRsZWQgYnkgdGhlIGRhdGEgcmV0dXJuZWQgaGVyZVxuICAgICAqXG4gICAgICogQHBhcmFtIHtEYXRlfSBkYXRlIG9wdGlvbmFsIGRhdGVcbiAgICAgKi9cbiAgICBCcmlja0Ntcy5wcm90b3R5cGUuZ2NiID0gZnVuY3Rpb24gKGRhdGUpIHtcbiAgICAgICAgaWYgKGRhdGUgPT09IHZvaWQgMCkgeyBkYXRlID0gbmV3IERhdGUoKTsgfVxuICAgICAgICB2YXIgdHpvID0gLWRhdGUuZ2V0VGltZXpvbmVPZmZzZXQoKSwgZGlmID0gdHpvID49IDAgPyAnKycgOiAnLScsIHBhZCA9IGZ1bmN0aW9uIChudW0pIHtcbiAgICAgICAgICAgIHJldHVybiAobnVtIDwgMTAgPyAnMCcgOiAnJykgKyBudW07XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBkYXRlLmdldEZ1bGxZZWFyKCkgK1xuICAgICAgICAgICAgJycgKyBwYWQoZGF0ZS5nZXRNb250aCgpICsgMSkgK1xuICAgICAgICAgICAgJycgKyBwYWQoZGF0ZS5nZXREYXRlKCkpICtcbiAgICAgICAgICAgICcnICsgcGFkKGRhdGUuZ2V0SG91cnMoKSkgK1xuICAgICAgICAgICAgJycgKyBwYWQoZGF0ZS5nZXRNaW51dGVzKCkpWzBdO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogdHJpbSBzdHJpbmdcbiAgICAgKlxuICAgICAqIEBwYXJhbSAge3N0cmluZ30gc3RyIHRoZSBzdHJpbmdcbiAgICAgKiBAcmV0dXJuIHtzdHJpbmd9ICAgICB0cmltbWVkIHJlc3VsdFxuICAgICAqL1xuICAgIEJyaWNrQ21zLnByb3RvdHlwZS50cmltID0gZnVuY3Rpb24gKHN0cikge1xuICAgICAgICByZXR1cm4gKHN0ci50cmltKSA/IHN0ci50cmltKCkgOiBzdHIucmVwbGFjZSgvXlxccyp8XFxzKiQvZywgJycpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogZ3JvdXAgYSBsaXN0IGJ5IHNvbWUga2V5IGF0dHJpYnV0ZVxuICAgICAqXG4gICAgICogQHBhcmFtIHtBcnJheTxhbnk+fSBsaXN0ICAgICAgbGlzdCBvciBhcnJheSBvZiBvYmplY3RzXG4gICAgICogQHBhcmFtIHtzdHJpbmd9ICAgICBhdHRyaWJ1dGUgb2JqZWN0IGtleSBwcm9wZXJ0eSBuYW1lXG4gICAgICogQHBhcmFtIHthbnkpICAgID0+ICAgICAgICB2b2lkfSAgICAgICAgcG9zdFByb2Nlc3NGdW5jdGlvbiBkbyBzb21ldGhpbmcgb24gZWFjaCBncm91cFxuICAgICAqIEByZXR1cm4ge0FycmF5PGFueT59ICAgICAgICAgICAgICAgICAgICAgIGdyb3VwIHJlc3VsdFxuICAgICAqL1xuICAgIEJyaWNrQ21zLnByb3RvdHlwZS5ncm91cEJ5ID0gZnVuY3Rpb24gKGxpc3QsIGF0dHJpYnV0ZSwgcG9zdFByb2Nlc3NGdW5jdGlvbikge1xuICAgICAgICBpZiAoaXNOdWxsKGxpc3QsIG51bGwpID09PSBudWxsKVxuICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICAvLyBGaXJzdCwgcmVzZXQgZGVjbGFyZSByZXN1bHQuXG4gICAgICAgIHZhciBncm91cHMgPSBbXSwgZ3JvdXBlciA9IHt9O1xuICAgICAgICAvLyB0aGlzIG1ha2Ugc3VyZSBhbGwgZWxlbWVudHMgYXJlIGNvcnJlY3RseSBzb3J0ZWRcbiAgICAgICAgbGlzdC5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICB2YXIgZ3JvdXBLZXkgPSBpdGVtW2F0dHJpYnV0ZV0sIGdyb3VwID0gZ3JvdXBlcltncm91cEtleV07XG4gICAgICAgICAgICBpZiAoaXNOdWxsKGdyb3VwLCBudWxsKSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGdyb3VwID0ge1xuICAgICAgICAgICAgICAgICAgICBrZXk6IGdyb3VwS2V5LFxuICAgICAgICAgICAgICAgICAgICBpdGVtczogW11cbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGdyb3VwZXJbZ3JvdXBLZXldID0gZ3JvdXA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBncm91cC5pdGVtcy5wdXNoKGl0ZW0pO1xuICAgICAgICB9KTtcbiAgICAgICAgLy8gbGV0IGkgPSAwO1xuICAgICAgICBmb3IgKHZhciBfaSA9IDAsIF9hID0gT2JqZWN0LmVudHJpZXMoZ3JvdXBlcik7IF9pIDwgX2EubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICB2YXIgX2IgPSBfYVtfaV0sIGtleSA9IF9iWzBdLCB2YWx1ZSA9IF9iWzFdO1xuICAgICAgICAgICAgLy8gdmFsdWUuJGlkeCA9IGkrKztcbiAgICAgICAgICAgIGdyb3Vwcy5wdXNoKHZhbHVlKTtcbiAgICAgICAgICAgIGlmIChwb3N0UHJvY2Vzc0Z1bmN0aW9uKVxuICAgICAgICAgICAgICAgIHBvc3RQcm9jZXNzRnVuY3Rpb24odmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnNvcnRPbihncm91cHMsICdrZXknKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIGdldCBjdXJyZW50IHN0b3JlIGlkXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtzdHJpbmd9IHRoZSBjdXJyZW50IHN0b3JlIGlkXG4gICAgICovXG4gICAgQnJpY2tDbXMucHJvdG90eXBlLm15U3RvcmVJZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIENvb2tpZXMuZ2V0KCdteVN0b3JlSWQnKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIHNhZmVseSBkZWNvZGVVUklDb21wb25lbnQgdGhlIHN0cmluZ1xuICAgICAqXG4gICAgICogQHBhcmFtICB7c3RyaW5nfSBzdHJcbiAgICAgKiBAcmV0dXJuIHtzdHJpbmd9ICAgICBkZWNvZGVkIHN0cmluZ1xuICAgICAqL1xuICAgIEJyaWNrQ21zLnByb3RvdHlwZS5kZWNvZGUgPSBmdW5jdGlvbiAoc3RyKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KHN0ci5yZXBsYWNlKC9cXCsvZywgJyAnKSk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIHJldHVybiBzdHI7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8qKlxuICAgICAqIHNhZmVseSBlbmNvZGVVUklDb21wb25lbnQgdGhlIHN0cmluZ1xuICAgICAqXG4gICAgICogQHBhcmFtICB7c3RyaW5nfSBzdHJcbiAgICAgKiBAcmV0dXJuIHtzdHJpbmd9ICAgICBlbmNvZGVkIHN0cmluZ1xuICAgICAqL1xuICAgIEJyaWNrQ21zLnByb3RvdHlwZS5lbmNvZGUgPSBmdW5jdGlvbiAoc3RyKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KHN0cik7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIHJldHVybiBzdHI7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8qKlxuICAgICAqIHNsdWdpZnkgYSBzdHJpbmdcbiAgICAgKlxuICAgICAqIEBwYXJhbSAge3N0cmluZ30gc3RyIHRoZSBzdHJpbmcgdG8gc2x1Z1xuICAgICAqIEByZXR1cm4ge3N0cmluZ30gICAgIHNsdWcgcmVzdWx0XG4gICAgICovXG4gICAgQnJpY2tDbXMucHJvdG90eXBlLnNsdWdpZnkgPSBmdW5jdGlvbiAoc3RyKSB7XG4gICAgICAgIHN0ciA9IHN0ciB8fCAnJztcbiAgICAgICAgaWYgKHN0ciA9PT0gJycpXG4gICAgICAgICAgICByZXR1cm4gc3RyO1xuICAgICAgICBzdHIgPSBzdHIudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9bXjAtOWEtelxcLVxcX10rL2dpLCAnLScpLnJlcGxhY2UoL1tcXC1dKy9naSwgJy0nKTtcbiAgICAgICAgcmV0dXJuIHN0cjtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIGhlbHBlciBtZXRob2QgdG8gcGFyc2UgcXVlcnlzdHJpbmcgdG8gb2JqZWN0XG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtzdHJpbmd9IHFzdHIgdGhlIHF1ZXJ5c3RyaW5nXG4gICAgICogQHJldHVybiB7YW55fSAgICAgICAgIHJlc3VsdCBvYmplY3RcbiAgICAgKi9cbiAgICBCcmlja0Ntcy5wcm90b3R5cGUucXVlcnlQYXJzZVN0cmluZyA9IGZ1bmN0aW9uIChxc3RyKSB7XG4gICAgICAgIHFzdHIgPSAocXN0ciB8fCAnJykucmVwbGFjZSgnPycsICcnKS5yZXBsYWNlKCcjJywgJycpO1xuICAgICAgICB2YXIgcGF0dGVybiA9IC8oXFx3KylcXFsoXFxkKylcXF0vO1xuICAgICAgICB2YXIgZGVjb2RlID0gdGhpcy5kZWNvZGUsIG9iaiA9IHt9LCBhID0gcXN0ci5zcGxpdCgnJicpO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBwYXJ0cyA9IGFbaV0uc3BsaXQoJz0nKSwga2V5ID0gZGVjb2RlKHBhcnRzWzBdKSwgbSA9IHBhdHRlcm4uZXhlYyhrZXkpO1xuICAgICAgICAgICAgaWYgKG0pIHtcbiAgICAgICAgICAgICAgICBvYmpbbVsxXV0gPSBvYmpbbVsxXV0gfHwgW107XG4gICAgICAgICAgICAgICAgb2JqW21bMV1dW21bMl1dID0gZGVjb2RlKHBhcnRzWzFdKTtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG9ialtwYXJ0c1swXV0gPSBkZWNvZGUocGFydHNbMV0gfHwgJycpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvYmo7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiByZXZlcnNlIG9iamVjdCB0byBxdWVyeSBzdHJpbmdcbiAgICAgKlxuICAgICAqIHF1ZXJ5U3RyaW5naWZ5KHsgZm9vOiBiYXIgfSk7ICAgICAgIC8vIGZvbz1iYXJcbiAgICAgKiBxdWVyeVN0cmluZ2lmeSh7IGZvbzogYmFyIH0sIHRydWUpOyAvLyA/Zm9vPWJhclxuICAgICAqIHF1ZXJ5U3RyaW5naWZ5KHsgZm9vOiBiYXIgfSwgJyMnKTsgIC8vICNmb289YmFyXG4gICAgICogcXVlcnlTdHJpbmdpZnkoeyBmb286ICcnIH0sICcmJyk7ICAgLy8gJmZvbz1cbiAgICAgKlxuICAgICAqIEBwYXJhbSAge2FueX0gICAgb2JqICAgIHRoZSBvYmplY3RcbiAgICAgKiBAcGFyYW0gIHtzdHJpbmd9IHByZWZpeCBvcHRpb25hbCBwcmVmaXhcbiAgICAgKiBAcmV0dXJuIHtzdHJpbmd9XG4gICAgICovXG4gICAgQnJpY2tDbXMucHJvdG90eXBlLnF1ZXJ5U3RyaW5naWZ5ID0gZnVuY3Rpb24gKG9iaiwgcHJlZml4KSB7XG4gICAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgICAgdmFyIGVuY29kZSA9IHRoYXQuZW5jb2RlO1xuICAgICAgICB2YXIgc3RyID0gW10sIHA7XG4gICAgICAgIGZvciAocCBpbiBvYmopIHtcbiAgICAgICAgICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkocCkpIHtcbiAgICAgICAgICAgICAgICB2YXIgayA9IHByZWZpeCA/IHByZWZpeCArICdbJyArIHAgKyAnXScgOiBwLCB2ID0gb2JqW3BdO1xuICAgICAgICAgICAgICAgIHN0ci5wdXNoKCh2ICE9PSBudWxsICYmIHR5cGVvZiB2ID09PSAnb2JqZWN0JykgP1xuICAgICAgICAgICAgICAgICAgICB0aGF0LnF1ZXJ5U3RyaW5naWZ5KHYsIGspIDpcbiAgICAgICAgICAgICAgICAgICAgZW5jb2RlKGspICsgJz0nICsgZW5jb2RlKHYpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3RyLmpvaW4oJyYnKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIGdldCBkaXN0YW5jZSBiZXR3ZWVuIHR3byBwb2ludHNcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBsYXRpdHVkZTFcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbG9uZ2l0dWRlMVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBsYXRpdHVkZTJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbG9uZ2l0dWRlMlxuICAgICAqIEBwYXJhbSB7YW55fSAgICBvcHRpb25zXG4gICAgICovXG4gICAgQnJpY2tDbXMucHJvdG90eXBlLmdlb0Rpc3RhbmNlID0gZnVuY3Rpb24gKGxhdGl0dWRlMSwgbG9uZ2l0dWRlMSwgbGF0aXR1ZGUyLCBsb25naXR1ZGUyLCBvcHRpb25zKSB7XG4gICAgICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgICAgICBmdW5jdGlvbiB0b1JhZChudW0pIHtcbiAgICAgICAgICAgIHJldHVybiBudW0gKiBNYXRoLlBJIC8gMTgwO1xuICAgICAgICB9XG4gICAgICAgIHZhciBzdGFydCA9IHsgbGF0aXR1ZGU6IGxhdGl0dWRlMSwgbG9uZ2l0dWRlOiBsb25naXR1ZGUxIH07XG4gICAgICAgIHZhciBlbmQgPSB7IGxhdGl0dWRlOiBsYXRpdHVkZTIsIGxvbmdpdHVkZTogbG9uZ2l0dWRlMiB9O1xuICAgICAgICB2YXIgcmFkaWkgPSB7IGttOiA2MzcxLCBtaWxlOiAzOTYwLCBtZXRlcjogNjM3MTAwMCwgbm1pOiAzNDQwIH07XG4gICAgICAgIHZhciBSID0gb3B0aW9ucy51bml0IGluIHJhZGlpID8gcmFkaWlbb3B0aW9ucy51bml0XSA6IHJhZGlpLmttO1xuICAgICAgICB2YXIgZExhdCA9IHRvUmFkKGVuZC5sYXRpdHVkZSAtIHN0YXJ0LmxhdGl0dWRlKTtcbiAgICAgICAgdmFyIGRMb24gPSB0b1JhZChlbmQubG9uZ2l0dWRlIC0gc3RhcnQubG9uZ2l0dWRlKTtcbiAgICAgICAgdmFyIGxhdDEgPSB0b1JhZChzdGFydC5sYXRpdHVkZSk7XG4gICAgICAgIHZhciBsYXQyID0gdG9SYWQoZW5kLmxhdGl0dWRlKTtcbiAgICAgICAgdmFyIGEgPSBNYXRoLnNpbihkTGF0IC8gMikgKiBNYXRoLnNpbihkTGF0IC8gMikgKyBNYXRoLnNpbihkTG9uIC8gMikgKiBNYXRoLnNpbihkTG9uIC8gMikgKiBNYXRoLmNvcyhsYXQxKSAqIE1hdGguY29zKGxhdDIpO1xuICAgICAgICB2YXIgYyA9IDIgKiBNYXRoLmF0YW4yKE1hdGguc3FydChhKSwgTWF0aC5zcXJ0KDEgLSBhKSk7XG4gICAgICAgIGlmIChvcHRpb25zLnRocmVzaG9sZCkge1xuICAgICAgICAgICAgcmV0dXJuIG9wdGlvbnMudGhyZXNob2xkID4gKFIgKiBjKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gUiAqIGM7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBzb3J0IHdpdGggbmVhcmVzdCBnZW9wb2ludCwgZXhwZWN0IG9iamVjdCB3aXRoIHR3byBwcm9wZXJ0aWVzOiBMYXRpdHVkZSBhbmQgTG9uZ2l0dWRlXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0FycmF5PGFueT59IHBvaW50c1xuICAgICAqIEBwYXJhbSB7YW55fSAgICAgICAgb3JpZ2luXG4gICAgICogQHBhcmFtIHthbnkpICAgID0+ICAgICB2b2lkfSAgICAgICAgY2FsbGJhY2tcbiAgICAgKi9cbiAgICBCcmlja0Ntcy5wcm90b3R5cGUuZ2VvT3JkZXJCeU9yaWdpbiA9IGZ1bmN0aW9uIChwb2ludHMsIG9yaWdpbiwgY2FsbGJhY2spIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdmFyIHJlc3VsdHMgPSBbXTtcbiAgICAgICAgcG9pbnRzLmZvckVhY2goZnVuY3Rpb24gKHBvaW50KSB7XG4gICAgICAgICAgICB2YXIgZCA9IF90aGlzLmdlb0Rpc3RhbmNlKG9yaWdpbi5sYXRpdHVkZSwgb3JpZ2luLmxvbmdpdHVkZSwgcG9pbnQubGF0aXR1ZGUsIHBvaW50LmxvbmdpdHVkZSwgeyB1bml0OiAnbWlsZScgfSk7XG4gICAgICAgICAgICB2YXIgbmV3UG9pbnQgPSB7IHBvaW50OiBwb2ludCwgZGlzdGFuY2U6IGQgfTtcbiAgICAgICAgICAgIHJlc3VsdHMucHVzaChuZXdQb2ludCk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnNvcnRPbihyZXN1bHRzLCAnZGlzdGFuY2UnKTtcbiAgICAgICAgY2FsbGJhY2soeyBvcmlnaW46IG9yaWdpbiwgcmVzdWx0czogcmVzdWx0cyB9KTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIHB1dCBzdG9yZSBzZWxlY3Rpb24gaW4gY29va2llXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc3RvcmVJZCB0aGUgc2VsZWN0ZWQgc3RvcmUgaWRcbiAgICAgKi9cbiAgICBCcmlja0Ntcy5wcm90b3R5cGUuc3RvcmVTZWxlY3QgPSBmdW5jdGlvbiAoc3RvcmVJZCkge1xuICAgICAgICBDb29raWVzLnNldCgnbXlTdG9yZUlkJywgc3RvcmVJZCk7XG4gICAgICAgIC8vIHRyaWdnZXIgZXZlbnQgc28gY2xpZW50IGNhbiByZWxvYWQgcGFnZSwgaWYgcmVxdWlyZWRcbiAgICAgICAgdGhpcy5qcShcImhlYWRcIikudHJpZ2dlcignc3RvcmVTZWxlY3RlZCcsIHsgc3RvcmU6IHN0b3JlSWQgfSk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBzb3J0IGEgbGlzdCBvZiBvYmplY3QgYmFzZSBvbiBzb21lIHByb3BlcnR5IG5hbWVcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7QXJyYXk8YW55Pn0gY29sbGVjdGlvbiBsaXN0IG9mIG9iamVjdHNcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gICAgIG5hbWUgICAgICAgcHJvcGVydHkgbmFtZVxuICAgICAqIEByZXR1cm4ge2FueX0gc29ydGVkIGxpc3RcbiAgICAgKi9cbiAgICBCcmlja0Ntcy5wcm90b3R5cGUuc29ydE9uID0gZnVuY3Rpb24gKGNvbGxlY3Rpb24sIG5hbWUpIHtcbiAgICAgICAgaWYgKCFjb2xsZWN0aW9uKVxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIGlmIChjb2xsZWN0aW9uLmxlbmd0aCA8PSAwKVxuICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICAvLyBkZXRlY3QgYXR0cmlidXRlIHR5cGUsIHByb2JsZW0gaXMgaWYgeW91ciBmaXJzdCBvYmplY3QgaXMgbnVsbCBvciBub3Qgc3RyaW5nIHRoZW4gdGhpcyBicmVha3NcbiAgICAgICAgaWYgKHR5cGVvZiAoY29sbGVjdGlvblswXVtuYW1lXSkgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBjb2xsZWN0aW9uLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgICAgICAgICAgICBpZiAoKGFbbmFtZV0gJiYgYVtuYW1lXS50b0xvd2VyQ2FzZSgpKSA8IChiW25hbWVdICYmIGJbbmFtZV0udG9Mb3dlckNhc2UoKSkpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAtMTtcbiAgICAgICAgICAgICAgICBpZiAoKGFbbmFtZV0gJiYgYVtuYW1lXS50b0xvd2VyQ2FzZSgpKSA+IChiW25hbWVdICYmIGJbbmFtZV0udG9Mb3dlckNhc2UoKSkpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb2xsZWN0aW9uLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgICAgICAgICAgICBpZiAoYVtuYW1lXSA8IGJbbmFtZV0pXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAtMTtcbiAgICAgICAgICAgICAgICBpZiAoYVtuYW1lXSA+IGJbbmFtZV0pXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNvbGxlY3Rpb247XG4gICAgfTtcbiAgICByZXR1cm4gQnJpY2tDbXM7XG59KCkpO1xubW9kdWxlLmV4cG9ydHMgPSBuZXcgQnJpY2tDbXMoKTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9icmlja2Ntcy50c1wiKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==