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
        var str = [];
        for (var p in obj) {
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
        var element = this.doc.getElementByTagName('head');
        var myCustomEvent = new CustomEvent('storeSelected', {
            bubbles: true,
            cancelable: true,
            detail: { storeId: storeId }
        });
        element.dispatchEvent(myCustomEvent);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO0FBQ0EsZUFBZSxZQUFZO0FBQzNCLGVBQWUsWUFBWTtBQUMzQixnQkFBZ0IsS0FBSztBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7Ozs7Ozs7VUN2WkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7OztVRXRCQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL0JyaWNrQ21zL3dlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIndlYnBhY2s6Ly9Ccmlja0Ntcy8uL25vZGVfbW9kdWxlcy9qcy1jb29raWUvZGlzdC9qcy5jb29raWUuanMiLCJ3ZWJwYWNrOi8vQnJpY2tDbXMvLi9zcmMvYnJpY2tjbXMudHMiLCJ3ZWJwYWNrOi8vQnJpY2tDbXMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vQnJpY2tDbXMvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9Ccmlja0Ntcy93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vQnJpY2tDbXMvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFwiQnJpY2tDbXNcIiwgW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiQnJpY2tDbXNcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiQnJpY2tDbXNcIl0gPSBmYWN0b3J5KCk7XG59KShzZWxmLCAoKSA9PiB7XG5yZXR1cm4gIiwiLyohIGpzLWNvb2tpZSB2My4wLjUgfCBNSVQgKi9cbjtcbihmdW5jdGlvbiAoZ2xvYmFsLCBmYWN0b3J5KSB7XG4gIHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyA/IG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpIDpcbiAgdHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kID8gZGVmaW5lKGZhY3RvcnkpIDpcbiAgKGdsb2JhbCA9IHR5cGVvZiBnbG9iYWxUaGlzICE9PSAndW5kZWZpbmVkJyA/IGdsb2JhbFRoaXMgOiBnbG9iYWwgfHwgc2VsZiwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgY3VycmVudCA9IGdsb2JhbC5Db29raWVzO1xuICAgIHZhciBleHBvcnRzID0gZ2xvYmFsLkNvb2tpZXMgPSBmYWN0b3J5KCk7XG4gICAgZXhwb3J0cy5ub0NvbmZsaWN0ID0gZnVuY3Rpb24gKCkgeyBnbG9iYWwuQ29va2llcyA9IGN1cnJlbnQ7IHJldHVybiBleHBvcnRzOyB9O1xuICB9KSgpKTtcbn0pKHRoaXMsIChmdW5jdGlvbiAoKSB7ICd1c2Ugc3RyaWN0JztcblxuICAvKiBlc2xpbnQtZGlzYWJsZSBuby12YXIgKi9cbiAgZnVuY3Rpb24gYXNzaWduICh0YXJnZXQpIHtcbiAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgIGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHtcbiAgICAgICAgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRhcmdldFxuICB9XG4gIC8qIGVzbGludC1lbmFibGUgbm8tdmFyICovXG5cbiAgLyogZXNsaW50LWRpc2FibGUgbm8tdmFyICovXG4gIHZhciBkZWZhdWx0Q29udmVydGVyID0ge1xuICAgIHJlYWQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgaWYgKHZhbHVlWzBdID09PSAnXCInKSB7XG4gICAgICAgIHZhbHVlID0gdmFsdWUuc2xpY2UoMSwgLTEpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHZhbHVlLnJlcGxhY2UoLyglW1xcZEEtRl17Mn0pKy9naSwgZGVjb2RlVVJJQ29tcG9uZW50KVxuICAgIH0sXG4gICAgd3JpdGU6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgcmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudCh2YWx1ZSkucmVwbGFjZShcbiAgICAgICAgLyUoMlszNDZCRl18M1tBQy1GXXw0MHw1W0JERV18NjB8N1tCQ0RdKS9nLFxuICAgICAgICBkZWNvZGVVUklDb21wb25lbnRcbiAgICAgIClcbiAgICB9XG4gIH07XG4gIC8qIGVzbGludC1lbmFibGUgbm8tdmFyICovXG5cbiAgLyogZXNsaW50LWRpc2FibGUgbm8tdmFyICovXG5cbiAgZnVuY3Rpb24gaW5pdCAoY29udmVydGVyLCBkZWZhdWx0QXR0cmlidXRlcykge1xuICAgIGZ1bmN0aW9uIHNldCAobmFtZSwgdmFsdWUsIGF0dHJpYnV0ZXMpIHtcbiAgICAgIGlmICh0eXBlb2YgZG9jdW1lbnQgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICBhdHRyaWJ1dGVzID0gYXNzaWduKHt9LCBkZWZhdWx0QXR0cmlidXRlcywgYXR0cmlidXRlcyk7XG5cbiAgICAgIGlmICh0eXBlb2YgYXR0cmlidXRlcy5leHBpcmVzID09PSAnbnVtYmVyJykge1xuICAgICAgICBhdHRyaWJ1dGVzLmV4cGlyZXMgPSBuZXcgRGF0ZShEYXRlLm5vdygpICsgYXR0cmlidXRlcy5leHBpcmVzICogODY0ZTUpO1xuICAgICAgfVxuICAgICAgaWYgKGF0dHJpYnV0ZXMuZXhwaXJlcykge1xuICAgICAgICBhdHRyaWJ1dGVzLmV4cGlyZXMgPSBhdHRyaWJ1dGVzLmV4cGlyZXMudG9VVENTdHJpbmcoKTtcbiAgICAgIH1cblxuICAgICAgbmFtZSA9IGVuY29kZVVSSUNvbXBvbmVudChuYW1lKVxuICAgICAgICAucmVwbGFjZSgvJSgyWzM0NkJdfDVFfDYwfDdDKS9nLCBkZWNvZGVVUklDb21wb25lbnQpXG4gICAgICAgIC5yZXBsYWNlKC9bKCldL2csIGVzY2FwZSk7XG5cbiAgICAgIHZhciBzdHJpbmdpZmllZEF0dHJpYnV0ZXMgPSAnJztcbiAgICAgIGZvciAodmFyIGF0dHJpYnV0ZU5hbWUgaW4gYXR0cmlidXRlcykge1xuICAgICAgICBpZiAoIWF0dHJpYnV0ZXNbYXR0cmlidXRlTmFtZV0pIHtcbiAgICAgICAgICBjb250aW51ZVxuICAgICAgICB9XG5cbiAgICAgICAgc3RyaW5naWZpZWRBdHRyaWJ1dGVzICs9ICc7ICcgKyBhdHRyaWJ1dGVOYW1lO1xuXG4gICAgICAgIGlmIChhdHRyaWJ1dGVzW2F0dHJpYnV0ZU5hbWVdID09PSB0cnVlKSB7XG4gICAgICAgICAgY29udGludWVcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIENvbnNpZGVycyBSRkMgNjI2NSBzZWN0aW9uIDUuMjpcbiAgICAgICAgLy8gLi4uXG4gICAgICAgIC8vIDMuICBJZiB0aGUgcmVtYWluaW5nIHVucGFyc2VkLWF0dHJpYnV0ZXMgY29udGFpbnMgYSAleDNCIChcIjtcIilcbiAgICAgICAgLy8gICAgIGNoYXJhY3RlcjpcbiAgICAgICAgLy8gQ29uc3VtZSB0aGUgY2hhcmFjdGVycyBvZiB0aGUgdW5wYXJzZWQtYXR0cmlidXRlcyB1cCB0byxcbiAgICAgICAgLy8gbm90IGluY2x1ZGluZywgdGhlIGZpcnN0ICV4M0IgKFwiO1wiKSBjaGFyYWN0ZXIuXG4gICAgICAgIC8vIC4uLlxuICAgICAgICBzdHJpbmdpZmllZEF0dHJpYnV0ZXMgKz0gJz0nICsgYXR0cmlidXRlc1thdHRyaWJ1dGVOYW1lXS5zcGxpdCgnOycpWzBdO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gKGRvY3VtZW50LmNvb2tpZSA9XG4gICAgICAgIG5hbWUgKyAnPScgKyBjb252ZXJ0ZXIud3JpdGUodmFsdWUsIG5hbWUpICsgc3RyaW5naWZpZWRBdHRyaWJ1dGVzKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldCAobmFtZSkge1xuICAgICAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gJ3VuZGVmaW5lZCcgfHwgKGFyZ3VtZW50cy5sZW5ndGggJiYgIW5hbWUpKSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICAvLyBUbyBwcmV2ZW50IHRoZSBmb3IgbG9vcCBpbiB0aGUgZmlyc3QgcGxhY2UgYXNzaWduIGFuIGVtcHR5IGFycmF5XG4gICAgICAvLyBpbiBjYXNlIHRoZXJlIGFyZSBubyBjb29raWVzIGF0IGFsbC5cbiAgICAgIHZhciBjb29raWVzID0gZG9jdW1lbnQuY29va2llID8gZG9jdW1lbnQuY29va2llLnNwbGl0KCc7ICcpIDogW107XG4gICAgICB2YXIgamFyID0ge307XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNvb2tpZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIHBhcnRzID0gY29va2llc1tpXS5zcGxpdCgnPScpO1xuICAgICAgICB2YXIgdmFsdWUgPSBwYXJ0cy5zbGljZSgxKS5qb2luKCc9Jyk7XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICB2YXIgZm91bmQgPSBkZWNvZGVVUklDb21wb25lbnQocGFydHNbMF0pO1xuICAgICAgICAgIGphcltmb3VuZF0gPSBjb252ZXJ0ZXIucmVhZCh2YWx1ZSwgZm91bmQpO1xuXG4gICAgICAgICAgaWYgKG5hbWUgPT09IGZvdW5kKSB7XG4gICAgICAgICAgICBicmVha1xuICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoZSkge31cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG5hbWUgPyBqYXJbbmFtZV0gOiBqYXJcbiAgICB9XG5cbiAgICByZXR1cm4gT2JqZWN0LmNyZWF0ZShcbiAgICAgIHtcbiAgICAgICAgc2V0LFxuICAgICAgICBnZXQsXG4gICAgICAgIHJlbW92ZTogZnVuY3Rpb24gKG5hbWUsIGF0dHJpYnV0ZXMpIHtcbiAgICAgICAgICBzZXQoXG4gICAgICAgICAgICBuYW1lLFxuICAgICAgICAgICAgJycsXG4gICAgICAgICAgICBhc3NpZ24oe30sIGF0dHJpYnV0ZXMsIHtcbiAgICAgICAgICAgICAgZXhwaXJlczogLTFcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgKTtcbiAgICAgICAgfSxcbiAgICAgICAgd2l0aEF0dHJpYnV0ZXM6IGZ1bmN0aW9uIChhdHRyaWJ1dGVzKSB7XG4gICAgICAgICAgcmV0dXJuIGluaXQodGhpcy5jb252ZXJ0ZXIsIGFzc2lnbih7fSwgdGhpcy5hdHRyaWJ1dGVzLCBhdHRyaWJ1dGVzKSlcbiAgICAgICAgfSxcbiAgICAgICAgd2l0aENvbnZlcnRlcjogZnVuY3Rpb24gKGNvbnZlcnRlcikge1xuICAgICAgICAgIHJldHVybiBpbml0KGFzc2lnbih7fSwgdGhpcy5jb252ZXJ0ZXIsIGNvbnZlcnRlciksIHRoaXMuYXR0cmlidXRlcylcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgYXR0cmlidXRlczogeyB2YWx1ZTogT2JqZWN0LmZyZWV6ZShkZWZhdWx0QXR0cmlidXRlcykgfSxcbiAgICAgICAgY29udmVydGVyOiB7IHZhbHVlOiBPYmplY3QuZnJlZXplKGNvbnZlcnRlcikgfVxuICAgICAgfVxuICAgIClcbiAgfVxuXG4gIHZhciBhcGkgPSBpbml0KGRlZmF1bHRDb252ZXJ0ZXIsIHsgcGF0aDogJy8nIH0pO1xuICAvKiBlc2xpbnQtZW5hYmxlIG5vLXZhciAqL1xuXG4gIHJldHVybiBhcGk7XG5cbn0pKTtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fY3JlYXRlQmluZGluZyA9ICh0aGlzICYmIHRoaXMuX19jcmVhdGVCaW5kaW5nKSB8fCAoT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gICAgdmFyIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG0sIGspO1xuICAgIGlmICghZGVzYyB8fCAoXCJnZXRcIiBpbiBkZXNjID8gIW0uX19lc01vZHVsZSA6IGRlc2Mud3JpdGFibGUgfHwgZGVzYy5jb25maWd1cmFibGUpKSB7XG4gICAgICBkZXNjID0geyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gbVtrXTsgfSB9O1xuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgazIsIGRlc2MpO1xufSkgOiAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICAgIG9bazJdID0gbVtrXTtcbn0pKTtcbnZhciBfX3NldE1vZHVsZURlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9fc2V0TW9kdWxlRGVmYXVsdCkgfHwgKE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgdikge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBcImRlZmF1bHRcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdiB9KTtcbn0pIDogZnVuY3Rpb24obywgdikge1xuICAgIG9bXCJkZWZhdWx0XCJdID0gdjtcbn0pO1xudmFyIF9faW1wb3J0U3RhciA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnRTdGFyKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBvd25LZXlzID0gZnVuY3Rpb24obykge1xuICAgICAgICBvd25LZXlzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMgfHwgZnVuY3Rpb24gKG8pIHtcbiAgICAgICAgICAgIHZhciBhciA9IFtdO1xuICAgICAgICAgICAgZm9yICh2YXIgayBpbiBvKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG8sIGspKSBhclthci5sZW5ndGhdID0gaztcbiAgICAgICAgICAgIHJldHVybiBhcjtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIG93bktleXMobyk7XG4gICAgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKG1vZCkge1xuICAgICAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xuICAgICAgICB2YXIgcmVzdWx0ID0ge307XG4gICAgICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayA9IG93bktleXMobW9kKSwgaSA9IDA7IGkgPCBrLmxlbmd0aDsgaSsrKSBpZiAoa1tpXSAhPT0gXCJkZWZhdWx0XCIpIF9fY3JlYXRlQmluZGluZyhyZXN1bHQsIG1vZCwga1tpXSk7XG4gICAgICAgIF9fc2V0TW9kdWxlRGVmYXVsdChyZXN1bHQsIG1vZCk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcbn0pKCk7XG4vLy8gPHJlZmVyZW5jZSB0eXBlcz0nanF1ZXJ5Jy8+XG52YXIgQ29va2llcyA9IF9faW1wb3J0U3RhcihyZXF1aXJlKFwianMtY29va2llXCIpKTtcbnZhciB1bmRlZiwgbXlSb290ID0ge1xuICAgIGRvY3VtZW50OiB7fSxcbiAgICBuYXZpZ2F0b3I6IHsgdXNlckFnZW50OiAnJyB9LFxuICAgIGxvY2F0aW9uOiB7IHByb3RvY29sOiAnZmlsZScsIGhvc3RuYW1lOiAnJyB9LFxuICAgIGpRdWVyeToge31cbn07XG4vLyBFc3RhYmxpc2ggdGhlIG9iamVjdCB0aGF0IGdldHMgcmV0dXJuZWQgdG8gYnJlYWsgb3V0IG9mIGEgbG9vcCBpdGVyYXRpb24uXG52YXIgYnJlYWtlciA9IHt9O1xuLyoqXG4gKiBpZiBudWxsIHJldHVybiBkZWZhdWx0LCBlbHNlIHJldHVybiBvYmplY3RcbiAqXG4gKiBAcGFyYW0gIHthbnl9IG9ialxuICogQHBhcmFtICB7YW55fSBkZWZhdWx0VmFsdWVcbiAqIEByZXR1cm4ge2FueX1cbiAqL1xuZnVuY3Rpb24gaXNOdWxsKG9iaiwgZGVmYXVsdFZhbHVlKSB7XG4gICAgcmV0dXJuIChvYmogPT09IG51bGwgfHwgb2JqID09PSB1bmRlZiB8fCBpc05hTihvYmopKSA/IGRlZmF1bHRWYWx1ZSA6IG9iajtcbn1cbmlmICh0eXBlb2YgKHdpbmRvdykgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgbXlSb290ID0gd2luZG93O1xuICAgIG15Um9vdC5qUXVlcnkgPSB3aW5kb3cualF1ZXJ5IHx8IHdpbmRvdy5aZXB0byB8fCB3aW5kb3cuJDtcbn1cbi8qKlxuICogR2V0IG9iamVjdCBrZXlzXG4gKlxuICogQHR5cGUge0FycmF5PHN0cmluZz59XG4gKi9cbnZhciBrZXlzID0gZnVuY3Rpb24gKG9iaikge1xuICAgIGlmIChPYmplY3Qua2V5cykge1xuICAgICAgICByZXR1cm4gT2JqZWN0LmtleXMob2JqKTtcbiAgICB9XG4gICAgaWYgKG9iaiAhPT0gT2JqZWN0KG9iaikpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignSW52YWxpZCBvYmplY3QnKTtcbiAgICB9XG4gICAgdmFyIGtleXMgPSBbXSwga2V5O1xuICAgIGZvciAoa2V5IGluIG9iaikge1xuICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KSlcbiAgICAgICAgICAgIGtleXMucHVzaChrZXkpO1xuICAgIH1cbiAgICByZXR1cm4ga2V5cztcbn07XG52YXIgdXNlckFnZW50ID0gbXlSb290Lm5hdmlnYXRvci51c2VyQWdlbnQgfHwgJyc7XG4vKipcbiAqIEByZXR1cm5zIHtib29sZWFufSAgdHJ1ZSBpZiBpbnRlcm5ldCBleHBsb3JlclxuICovXG5mdW5jdGlvbiBkZXRlY3RJZSgpIHtcbiAgICB2YXIgdWEgPSB1c2VyQWdlbnQ7XG4gICAgdmFyIG1zaWUgPSB1YS5pbmRleE9mKCdNU0lFICcpO1xuICAgIHZhciB0cmlkZW50ID0gdWEuaW5kZXhPZignVHJpZGVudC8nKTtcbiAgICB2YXIgcnYgPSB1YS5pbmRleE9mKCdydjonKTtcbiAgICBpZiAobXNpZSA+IDApIHtcbiAgICAgICAgLy8gSUUgMTAgb3Igb2xkZXIgPT4gcmV0dXJuIHZlcnNpb24gbnVtYmVyXG4gICAgICAgIHJldHVybiBwYXJzZUludCh1YS5zdWJzdHJpbmcobXNpZSArIDUsIHVhLmluZGV4T2YoJy4nLCBtc2llKSksIDEwKTtcbiAgICB9XG4gICAgaWYgKHRyaWRlbnQgPiAwKSB7XG4gICAgICAgIC8vIElFIDExIChvciBuZXdlcikgPT4gcmV0dXJuIHZlcnNpb24gbnVtYmVyXG4gICAgICAgIHJldHVybiBwYXJzZUludCh1YS5zdWJzdHJpbmcocnYgKyAzLCB1YS5pbmRleE9mKCcuJywgcnYpKSwgMTApO1xuICAgIH1cbiAgICAvLyBvdGhlciBicm93c2VyXG4gICAgcmV0dXJuIGZhbHNlO1xufVxuLyoqXG4gKiBUaGUgQnJpY2tDbXMgY2xhc3NcbiAqL1xudmFyIEJyaWNrQ21zID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEJyaWNrQ21zKCkge1xuICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICAgIHZhciBob3N0bmFtZSA9IHRoYXQudHJpbShteVJvb3QubG9jYXRpb24uaG9zdG5hbWUudG9Mb3dlckNhc2UoKSk7XG4gICAgICAgIHRoYXQuc2l0ZSA9IHsgaG9zdG5hbWU6IGhvc3RuYW1lLCBkb21haW46IGhvc3RuYW1lLnJlcGxhY2UoJ3d3dy4nLCAnJyksIGNvbmZpZzoge30gfTtcbiAgICAgICAgdGhhdC5icm93c2VyID0ge1xuICAgICAgICAgICAgaXNJRTogZGV0ZWN0SWUoKSxcbiAgICAgICAgICAgIGlzTW9iaWxlOiAvaVAoaG9uZXxvZHxhZCl8QW5kcm9pZHxCbGFja0JlcnJ5fElFTW9iaWxlfEtpbmRsZXxOZXRGcm9udHxTaWxrLUFjY2VsZXJhdGVkfChocHd8d2ViKU9TfEZlbm5lY3xNaW5pbW98T3BlcmEgTShvYml8aW5pKXxCbGF6ZXJ8RG9sZmlufERvbHBoaW58U2t5ZmlyZXxadW5lL2dpLnRlc3QodXNlckFnZW50KSxcbiAgICAgICAgICAgIGlzQW5kcm9pZDogLyhhbmRyb2lkKS9naS50ZXN0KHVzZXJBZ2VudCksXG4gICAgICAgICAgICBpc0lPUzogL2lQKGhvbmV8b2R8YWQpL2dpLnRlc3QodXNlckFnZW50KVxuICAgICAgICB9O1xuICAgICAgICB0aGF0LmNvb2tpZXMgPSBDb29raWVzO1xuICAgICAgICB0aGF0LndpbiA9IG15Um9vdDtcbiAgICAgICAgdGhhdC5kb2MgPSBteVJvb3QuZG9jdW1lbnQ7XG4gICAgICAgIHRoYXQuanEgPSBteVJvb3QualF1ZXJ5O1xuICAgICAgICB0aGF0LmtleXMgPSBrZXlzO1xuICAgICAgICB0aGF0LmlzTnVsbCA9IGlzTnVsbDtcbiAgICAgICAgLy8gYmVnaW5cbiAgICAgICAgLy8gMS4gYXV0b21hdGljIGdlb2NvZGUgaXAgYWRkcmVzcyBhbmQgc3RvcmUgaXRcbiAgICAgICAgdmFyIHVybCA9ICdodHRwczovL2NkbjIuYnJpY2tpbmMubmV0L2dlb2lwbWUvP2J1c3Rlcj0nICsgKG5ldyBEYXRlKCkuZ2V0VGltZSgpKTtcbiAgICAgICAgZmV0Y2godXJsKVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSFRUUCBlcnJvciEgc3RhdHVzOiBcIi5jb25jYXQocmVzcG9uc2Uuc3RhdHVzKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpO1xuICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJzdCkge1xuICAgICAgICAgICAgaWYgKHJzdC5sYXRpdHVkZSkge1xuICAgICAgICAgICAgICAgIHRoYXQubXlHZW8gPSByc3Q7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBmZXRjaGluZyBnZW9pcDonLCBlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQnJpY2tDbXMucHJvdG90eXBlLCBcIm5hbWVcIiwge1xuICAgICAgICAvKipcbiAgICAgICAgICogZ2V0IHRoZSBuYW1lIG9mIHRoZSBsaWJyYXJ5XG4gICAgICAgICAqIEByZXR1cm4ge3N0cmluZ30gbGlicmFyeSBuYW1lXG4gICAgICAgICAqL1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9uYW1lO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgLyoqXG4gICAgICogb3VyIGludGVybmFsIGNhY2hlIGJ1c3RlciBiYXNlIG9uIDEwdGggb2YgbWludXRlc1xuICAgICAqXG4gICAgICogeXl5eU1NZGRoaG1cbiAgICAgKiAtIHRoaXMgZm9ybWF0IGFsbG93IHVzIHRvIGNhY2hlIGV2ZXJ5IDEwdGggbWludXRlc1xuICAgICAqIE5vdGU6IHRoZXJlIGlzIG5vIG5lZWQgdG8gd29ycnkgYWJvdXQgdGltZXpvbmVcbiAgICAgKiBiZWNhdXNlIGl0IHNob3VsZCByZXR1cm4gZGF0YSBiYXNlIG9uIGNsaWVudCdzIHRpbWV6b25lXG4gICAgICogd2hpY2ggaXMgYWxyZWFkeSBoYW5kbGVkIGJ5IHRoZSBkYXRhIHJldHVybmVkIGhlcmVcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7RGF0ZX0gZGF0ZSBvcHRpb25hbCBkYXRlXG4gICAgICovXG4gICAgQnJpY2tDbXMucHJvdG90eXBlLmdjYiA9IGZ1bmN0aW9uIChkYXRlKSB7XG4gICAgICAgIGlmIChkYXRlID09PSB2b2lkIDApIHsgZGF0ZSA9IG5ldyBEYXRlKCk7IH1cbiAgICAgICAgdmFyIHR6byA9IC1kYXRlLmdldFRpbWV6b25lT2Zmc2V0KCksIGRpZiA9IHR6byA+PSAwID8gJysnIDogJy0nLCBwYWQgPSBmdW5jdGlvbiAobnVtKSB7XG4gICAgICAgICAgICByZXR1cm4gKG51bSA8IDEwID8gJzAnIDogJycpICsgbnVtO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gZGF0ZS5nZXRGdWxsWWVhcigpICtcbiAgICAgICAgICAgICcnICsgcGFkKGRhdGUuZ2V0TW9udGgoKSArIDEpICtcbiAgICAgICAgICAgICcnICsgcGFkKGRhdGUuZ2V0RGF0ZSgpKSArXG4gICAgICAgICAgICAnJyArIHBhZChkYXRlLmdldEhvdXJzKCkpICtcbiAgICAgICAgICAgICcnICsgcGFkKGRhdGUuZ2V0TWludXRlcygpKVswXTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIHRyaW0gc3RyaW5nXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtzdHJpbmd9IHN0ciB0aGUgc3RyaW5nXG4gICAgICogQHJldHVybiB7c3RyaW5nfSAgICAgdHJpbW1lZCByZXN1bHRcbiAgICAgKi9cbiAgICBCcmlja0Ntcy5wcm90b3R5cGUudHJpbSA9IGZ1bmN0aW9uIChzdHIpIHtcbiAgICAgICAgcmV0dXJuIChzdHIudHJpbSkgPyBzdHIudHJpbSgpIDogc3RyLnJlcGxhY2UoL15cXHMqfFxccyokL2csICcnKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIGdyb3VwIGEgbGlzdCBieSBzb21lIGtleSBhdHRyaWJ1dGVcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7QXJyYXk8YW55Pn0gbGlzdCAgICAgIGxpc3Qgb3IgYXJyYXkgb2Ygb2JqZWN0c1xuICAgICAqIEBwYXJhbSB7c3RyaW5nfSAgICAgYXR0cmlidXRlIG9iamVjdCBrZXkgcHJvcGVydHkgbmFtZVxuICAgICAqIEBwYXJhbSB7YW55KSAgICA9PiAgICAgICAgdm9pZH0gICAgICAgIHBvc3RQcm9jZXNzRnVuY3Rpb24gZG8gc29tZXRoaW5nIG9uIGVhY2ggZ3JvdXBcbiAgICAgKiBAcmV0dXJuIHtBcnJheTxhbnk+fSAgICAgICAgICAgICAgICAgICAgICBncm91cCByZXN1bHRcbiAgICAgKi9cbiAgICBCcmlja0Ntcy5wcm90b3R5cGUuZ3JvdXBCeSA9IGZ1bmN0aW9uIChsaXN0LCBhdHRyaWJ1dGUsIHBvc3RQcm9jZXNzRnVuY3Rpb24pIHtcbiAgICAgICAgaWYgKGlzTnVsbChsaXN0LCBudWxsKSA9PT0gbnVsbClcbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgLy8gRmlyc3QsIHJlc2V0IGRlY2xhcmUgcmVzdWx0LlxuICAgICAgICB2YXIgZ3JvdXBzID0gW10sIGdyb3VwZXIgPSB7fTtcbiAgICAgICAgLy8gdGhpcyBtYWtlIHN1cmUgYWxsIGVsZW1lbnRzIGFyZSBjb3JyZWN0bHkgc29ydGVkXG4gICAgICAgIGxpc3QuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgdmFyIGdyb3VwS2V5ID0gaXRlbVthdHRyaWJ1dGVdLCBncm91cCA9IGdyb3VwZXJbZ3JvdXBLZXldO1xuICAgICAgICAgICAgaWYgKGlzTnVsbChncm91cCwgbnVsbCkgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBncm91cCA9IHtcbiAgICAgICAgICAgICAgICAgICAga2V5OiBncm91cEtleSxcbiAgICAgICAgICAgICAgICAgICAgaXRlbXM6IFtdXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBncm91cGVyW2dyb3VwS2V5XSA9IGdyb3VwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZ3JvdXAuaXRlbXMucHVzaChpdGVtKTtcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIGxldCBpID0gMDtcbiAgICAgICAgZm9yICh2YXIgX2kgPSAwLCBfYSA9IE9iamVjdC5lbnRyaWVzKGdyb3VwZXIpOyBfaSA8IF9hLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgdmFyIF9iID0gX2FbX2ldLCBrZXkgPSBfYlswXSwgdmFsdWUgPSBfYlsxXTtcbiAgICAgICAgICAgIC8vIHZhbHVlLiRpZHggPSBpKys7XG4gICAgICAgICAgICBncm91cHMucHVzaCh2YWx1ZSk7XG4gICAgICAgICAgICBpZiAocG9zdFByb2Nlc3NGdW5jdGlvbilcbiAgICAgICAgICAgICAgICBwb3N0UHJvY2Vzc0Z1bmN0aW9uKHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5zb3J0T24oZ3JvdXBzLCAna2V5Jyk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBnZXQgY3VycmVudCBzdG9yZSBpZFxuICAgICAqXG4gICAgICogQHJldHVybiB7c3RyaW5nfSB0aGUgY3VycmVudCBzdG9yZSBpZFxuICAgICAqL1xuICAgIEJyaWNrQ21zLnByb3RvdHlwZS5teVN0b3JlSWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBDb29raWVzLmdldCgnbXlTdG9yZUlkJyk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBzYWZlbHkgZGVjb2RlVVJJQ29tcG9uZW50IHRoZSBzdHJpbmdcbiAgICAgKlxuICAgICAqIEBwYXJhbSAge3N0cmluZ30gc3RyXG4gICAgICogQHJldHVybiB7c3RyaW5nfSAgICAgZGVjb2RlZCBzdHJpbmdcbiAgICAgKi9cbiAgICBCcmlja0Ntcy5wcm90b3R5cGUuZGVjb2RlID0gZnVuY3Rpb24gKHN0cikge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudChzdHIucmVwbGFjZSgvXFwrL2csICcgJykpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICByZXR1cm4gc3RyO1xuICAgICAgICB9XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBzYWZlbHkgZW5jb2RlVVJJQ29tcG9uZW50IHRoZSBzdHJpbmdcbiAgICAgKlxuICAgICAqIEBwYXJhbSAge3N0cmluZ30gc3RyXG4gICAgICogQHJldHVybiB7c3RyaW5nfSAgICAgZW5jb2RlZCBzdHJpbmdcbiAgICAgKi9cbiAgICBCcmlja0Ntcy5wcm90b3R5cGUuZW5jb2RlID0gZnVuY3Rpb24gKHN0cikge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudChzdHIpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICByZXR1cm4gc3RyO1xuICAgICAgICB9XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBzbHVnaWZ5IGEgc3RyaW5nXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtzdHJpbmd9IHN0ciB0aGUgc3RyaW5nIHRvIHNsdWdcbiAgICAgKiBAcmV0dXJuIHtzdHJpbmd9ICAgICBzbHVnIHJlc3VsdFxuICAgICAqL1xuICAgIEJyaWNrQ21zLnByb3RvdHlwZS5zbHVnaWZ5ID0gZnVuY3Rpb24gKHN0cikge1xuICAgICAgICBzdHIgPSBzdHIgfHwgJyc7XG4gICAgICAgIGlmIChzdHIgPT09ICcnKVxuICAgICAgICAgICAgcmV0dXJuIHN0cjtcbiAgICAgICAgc3RyID0gc3RyLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvW14wLTlhLXpcXC1cXF9dKy9naSwgJy0nKS5yZXBsYWNlKC9bXFwtXSsvZ2ksICctJyk7XG4gICAgICAgIHJldHVybiBzdHI7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBoZWxwZXIgbWV0aG9kIHRvIHBhcnNlIHF1ZXJ5c3RyaW5nIHRvIG9iamVjdFxuICAgICAqXG4gICAgICogQHBhcmFtICB7c3RyaW5nfSBxc3RyIHRoZSBxdWVyeXN0cmluZ1xuICAgICAqIEByZXR1cm4ge2FueX0gICAgICAgICByZXN1bHQgb2JqZWN0XG4gICAgICovXG4gICAgQnJpY2tDbXMucHJvdG90eXBlLnF1ZXJ5UGFyc2VTdHJpbmcgPSBmdW5jdGlvbiAocXN0cikge1xuICAgICAgICBxc3RyID0gKHFzdHIgfHwgJycpLnJlcGxhY2UoJz8nLCAnJykucmVwbGFjZSgnIycsICcnKTtcbiAgICAgICAgdmFyIHBhdHRlcm4gPSAvKFxcdyspXFxbKFxcZCspXFxdLztcbiAgICAgICAgdmFyIGRlY29kZSA9IHRoaXMuZGVjb2RlLCBvYmogPSB7fSwgYSA9IHFzdHIuc3BsaXQoJyYnKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgcGFydHMgPSBhW2ldLnNwbGl0KCc9JyksIGtleSA9IGRlY29kZShwYXJ0c1swXSksIG0gPSBwYXR0ZXJuLmV4ZWMoa2V5KTtcbiAgICAgICAgICAgIGlmIChtKSB7XG4gICAgICAgICAgICAgICAgb2JqW21bMV1dID0gb2JqW21bMV1dIHx8IFtdO1xuICAgICAgICAgICAgICAgIG9ialttWzFdXVttWzJdXSA9IGRlY29kZShwYXJ0c1sxXSk7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBvYmpbcGFydHNbMF1dID0gZGVjb2RlKHBhcnRzWzFdIHx8ICcnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb2JqO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogcmV2ZXJzZSBvYmplY3QgdG8gcXVlcnkgc3RyaW5nXG4gICAgICpcbiAgICAgKiBxdWVyeVN0cmluZ2lmeSh7IGZvbzogYmFyIH0pOyAgICAgICAvLyBmb289YmFyXG4gICAgICogcXVlcnlTdHJpbmdpZnkoeyBmb286IGJhciB9LCB0cnVlKTsgLy8gP2Zvbz1iYXJcbiAgICAgKiBxdWVyeVN0cmluZ2lmeSh7IGZvbzogYmFyIH0sICcjJyk7ICAvLyAjZm9vPWJhclxuICAgICAqIHF1ZXJ5U3RyaW5naWZ5KHsgZm9vOiAnJyB9LCAnJicpOyAgIC8vICZmb289XG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHthbnl9ICAgIG9iaiAgICB0aGUgb2JqZWN0XG4gICAgICogQHBhcmFtICB7c3RyaW5nfSBwcmVmaXggb3B0aW9uYWwgcHJlZml4XG4gICAgICogQHJldHVybiB7c3RyaW5nfVxuICAgICAqL1xuICAgIEJyaWNrQ21zLnByb3RvdHlwZS5xdWVyeVN0cmluZ2lmeSA9IGZ1bmN0aW9uIChvYmosIHByZWZpeCkge1xuICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICAgIHZhciBlbmNvZGUgPSB0aGF0LmVuY29kZTtcbiAgICAgICAgdmFyIHN0ciA9IFtdO1xuICAgICAgICBmb3IgKHZhciBwIGluIG9iaikge1xuICAgICAgICAgICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShwKSkge1xuICAgICAgICAgICAgICAgIHZhciBrID0gcHJlZml4ID8gcHJlZml4ICsgJ1snICsgcCArICddJyA6IHAsIHYgPSBvYmpbcF07XG4gICAgICAgICAgICAgICAgc3RyLnB1c2goKHYgIT09IG51bGwgJiYgdHlwZW9mIHYgPT09ICdvYmplY3QnKSA/XG4gICAgICAgICAgICAgICAgICAgIHRoYXQucXVlcnlTdHJpbmdpZnkodiwgaykgOlxuICAgICAgICAgICAgICAgICAgICBlbmNvZGUoaykgKyAnPScgKyBlbmNvZGUodikpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzdHIuam9pbignJicpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogZ2V0IGRpc3RhbmNlIGJldHdlZW4gdHdvIHBvaW50c1xuICAgICAqXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGxhdGl0dWRlMVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBsb25naXR1ZGUxXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGxhdGl0dWRlMlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBsb25naXR1ZGUyXG4gICAgICogQHBhcmFtIHthbnl9ICAgIG9wdGlvbnNcbiAgICAgKi9cbiAgICBCcmlja0Ntcy5wcm90b3R5cGUuZ2VvRGlzdGFuY2UgPSBmdW5jdGlvbiAobGF0aXR1ZGUxLCBsb25naXR1ZGUxLCBsYXRpdHVkZTIsIGxvbmdpdHVkZTIsIG9wdGlvbnMpIHtcbiAgICAgICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgICAgIGZ1bmN0aW9uIHRvUmFkKG51bSkge1xuICAgICAgICAgICAgcmV0dXJuIG51bSAqIE1hdGguUEkgLyAxODA7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHN0YXJ0ID0geyBsYXRpdHVkZTogbGF0aXR1ZGUxLCBsb25naXR1ZGU6IGxvbmdpdHVkZTEgfTtcbiAgICAgICAgdmFyIGVuZCA9IHsgbGF0aXR1ZGU6IGxhdGl0dWRlMiwgbG9uZ2l0dWRlOiBsb25naXR1ZGUyIH07XG4gICAgICAgIHZhciByYWRpaSA9IHsga206IDYzNzEsIG1pbGU6IDM5NjAsIG1ldGVyOiA2MzcxMDAwLCBubWk6IDM0NDAgfTtcbiAgICAgICAgdmFyIFIgPSBvcHRpb25zLnVuaXQgaW4gcmFkaWkgPyByYWRpaVtvcHRpb25zLnVuaXRdIDogcmFkaWkua207XG4gICAgICAgIHZhciBkTGF0ID0gdG9SYWQoZW5kLmxhdGl0dWRlIC0gc3RhcnQubGF0aXR1ZGUpO1xuICAgICAgICB2YXIgZExvbiA9IHRvUmFkKGVuZC5sb25naXR1ZGUgLSBzdGFydC5sb25naXR1ZGUpO1xuICAgICAgICB2YXIgbGF0MSA9IHRvUmFkKHN0YXJ0LmxhdGl0dWRlKTtcbiAgICAgICAgdmFyIGxhdDIgPSB0b1JhZChlbmQubGF0aXR1ZGUpO1xuICAgICAgICB2YXIgYSA9IE1hdGguc2luKGRMYXQgLyAyKSAqIE1hdGguc2luKGRMYXQgLyAyKSArIE1hdGguc2luKGRMb24gLyAyKSAqIE1hdGguc2luKGRMb24gLyAyKSAqIE1hdGguY29zKGxhdDEpICogTWF0aC5jb3MobGF0Mik7XG4gICAgICAgIHZhciBjID0gMiAqIE1hdGguYXRhbjIoTWF0aC5zcXJ0KGEpLCBNYXRoLnNxcnQoMSAtIGEpKTtcbiAgICAgICAgaWYgKG9wdGlvbnMudGhyZXNob2xkKSB7XG4gICAgICAgICAgICByZXR1cm4gb3B0aW9ucy50aHJlc2hvbGQgPiAoUiAqIGMpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBSICogYztcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIHNvcnQgd2l0aCBuZWFyZXN0IGdlb3BvaW50LCBleHBlY3Qgb2JqZWN0IHdpdGggdHdvIHByb3BlcnRpZXM6IExhdGl0dWRlIGFuZCBMb25naXR1ZGVcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7QXJyYXk8YW55Pn0gcG9pbnRzXG4gICAgICogQHBhcmFtIHthbnl9ICAgICAgICBvcmlnaW5cbiAgICAgKiBAcGFyYW0ge2FueSkgICAgPT4gICAgIHZvaWR9ICAgICAgICBjYWxsYmFja1xuICAgICAqL1xuICAgIEJyaWNrQ21zLnByb3RvdHlwZS5nZW9PcmRlckJ5T3JpZ2luID0gZnVuY3Rpb24gKHBvaW50cywgb3JpZ2luLCBjYWxsYmFjaykge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgcmVzdWx0cyA9IFtdO1xuICAgICAgICBwb2ludHMuZm9yRWFjaChmdW5jdGlvbiAocG9pbnQpIHtcbiAgICAgICAgICAgIHZhciBkID0gX3RoaXMuZ2VvRGlzdGFuY2Uob3JpZ2luLmxhdGl0dWRlLCBvcmlnaW4ubG9uZ2l0dWRlLCBwb2ludC5sYXRpdHVkZSwgcG9pbnQubG9uZ2l0dWRlLCB7IHVuaXQ6ICdtaWxlJyB9KTtcbiAgICAgICAgICAgIHZhciBuZXdQb2ludCA9IHsgcG9pbnQ6IHBvaW50LCBkaXN0YW5jZTogZCB9O1xuICAgICAgICAgICAgcmVzdWx0cy5wdXNoKG5ld1BvaW50KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuc29ydE9uKHJlc3VsdHMsICdkaXN0YW5jZScpO1xuICAgICAgICBjYWxsYmFjayh7IG9yaWdpbjogb3JpZ2luLCByZXN1bHRzOiByZXN1bHRzIH0pO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogcHV0IHN0b3JlIHNlbGVjdGlvbiBpbiBjb29raWVcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzdG9yZUlkIHRoZSBzZWxlY3RlZCBzdG9yZSBpZFxuICAgICAqL1xuICAgIEJyaWNrQ21zLnByb3RvdHlwZS5zdG9yZVNlbGVjdCA9IGZ1bmN0aW9uIChzdG9yZUlkKSB7XG4gICAgICAgIENvb2tpZXMuc2V0KCdteVN0b3JlSWQnLCBzdG9yZUlkKTtcbiAgICAgICAgLy8gdHJpZ2dlciBldmVudCBzbyBjbGllbnQgY2FuIHJlbG9hZCBwYWdlLCBpZiByZXF1aXJlZFxuICAgICAgICB2YXIgZWxlbWVudCA9IHRoaXMuZG9jLmdldEVsZW1lbnRCeVRhZ05hbWUoJ2hlYWQnKTtcbiAgICAgICAgdmFyIG15Q3VzdG9tRXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoJ3N0b3JlU2VsZWN0ZWQnLCB7XG4gICAgICAgICAgICBidWJibGVzOiB0cnVlLFxuICAgICAgICAgICAgY2FuY2VsYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGRldGFpbDogeyBzdG9yZUlkOiBzdG9yZUlkIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGVsZW1lbnQuZGlzcGF0Y2hFdmVudChteUN1c3RvbUV2ZW50KTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIHNvcnQgYSBsaXN0IG9mIG9iamVjdCBiYXNlIG9uIHNvbWUgcHJvcGVydHkgbmFtZVxuICAgICAqXG4gICAgICogQHBhcmFtIHtBcnJheTxhbnk+fSBjb2xsZWN0aW9uIGxpc3Qgb2Ygb2JqZWN0c1xuICAgICAqIEBwYXJhbSB7c3RyaW5nfSAgICAgbmFtZSAgICAgICBwcm9wZXJ0eSBuYW1lXG4gICAgICogQHJldHVybiB7YW55fSBzb3J0ZWQgbGlzdFxuICAgICAqL1xuICAgIEJyaWNrQ21zLnByb3RvdHlwZS5zb3J0T24gPSBmdW5jdGlvbiAoY29sbGVjdGlvbiwgbmFtZSkge1xuICAgICAgICBpZiAoIWNvbGxlY3Rpb24pXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgaWYgKGNvbGxlY3Rpb24ubGVuZ3RoIDw9IDApXG4gICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIC8vIGRldGVjdCBhdHRyaWJ1dGUgdHlwZSwgcHJvYmxlbSBpcyBpZiB5b3VyIGZpcnN0IG9iamVjdCBpcyBudWxsIG9yIG5vdCBzdHJpbmcgdGhlbiB0aGlzIGJyZWFrc1xuICAgICAgICBpZiAodHlwZW9mIChjb2xsZWN0aW9uWzBdW25hbWVdKSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIGNvbGxlY3Rpb24uc29ydChmdW5jdGlvbiAoYSwgYikge1xuICAgICAgICAgICAgICAgIGlmICgoYVtuYW1lXSAmJiBhW25hbWVdLnRvTG93ZXJDYXNlKCkpIDwgKGJbbmFtZV0gJiYgYltuYW1lXS50b0xvd2VyQ2FzZSgpKSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgICAgICAgICAgIGlmICgoYVtuYW1lXSAmJiBhW25hbWVdLnRvTG93ZXJDYXNlKCkpID4gKGJbbmFtZV0gJiYgYltuYW1lXS50b0xvd2VyQ2FzZSgpKSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbGxlY3Rpb24uc29ydChmdW5jdGlvbiAoYSwgYikge1xuICAgICAgICAgICAgICAgIGlmIChhW25hbWVdIDwgYltuYW1lXSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgICAgICAgICAgIGlmIChhW25hbWVdID4gYltuYW1lXSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY29sbGVjdGlvbjtcbiAgICB9O1xuICAgIHJldHVybiBCcmlja0Ntcztcbn0oKSk7XG5tb2R1bGUuZXhwb3J0cyA9IG5ldyBCcmlja0NtcygpO1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2JyaWNrY21zLnRzXCIpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9