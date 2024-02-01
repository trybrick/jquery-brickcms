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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
/// <reference types='jquery'/>
var Cookies = __importStar(__webpack_require__(/*! js-cookie */ "./node_modules/js-cookie/dist/js.cookie.js"));
var undef, myRoot = { document: {}, navigator: { userAgent: '' }, location: { protocol: 'file', hostname: '' } };
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
        that.jq = jQuery || $;
        that.keys = keys;
        that.isNull = isNull;
        // begin
        // 1. automatic geocode ip address and store it
        this.jq.getJSON('https://cdn2.brickinc.net/geoipme/?buster=' + (new Date().getTime()), function (rst) {
            if (rst.latitude) {
                that.myGeo = rst;
            }
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
        this.jq.each(grouper, function (i, myGroup) {
            myGroup.$idx = i;
            groups.push(myGroup);
            if (postProcessFunction)
                postProcessFunction(myGroup);
        });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Ozs7Ozs7VUNwWEE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7OztVRXRCQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL0JyaWNrQ21zL3dlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIndlYnBhY2s6Ly9Ccmlja0Ntcy8uL25vZGVfbW9kdWxlcy9qcy1jb29raWUvZGlzdC9qcy5jb29raWUuanMiLCJ3ZWJwYWNrOi8vQnJpY2tDbXMvLi9zcmMvYnJpY2tjbXMudHMiLCJ3ZWJwYWNrOi8vQnJpY2tDbXMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vQnJpY2tDbXMvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9Ccmlja0Ntcy93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vQnJpY2tDbXMvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFwiQnJpY2tDbXNcIiwgW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiQnJpY2tDbXNcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiQnJpY2tDbXNcIl0gPSBmYWN0b3J5KCk7XG59KShzZWxmLCAoKSA9PiB7XG5yZXR1cm4gIiwiLyohIGpzLWNvb2tpZSB2My4wLjUgfCBNSVQgKi9cbjtcbihmdW5jdGlvbiAoZ2xvYmFsLCBmYWN0b3J5KSB7XG4gIHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyA/IG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpIDpcbiAgdHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kID8gZGVmaW5lKGZhY3RvcnkpIDpcbiAgKGdsb2JhbCA9IHR5cGVvZiBnbG9iYWxUaGlzICE9PSAndW5kZWZpbmVkJyA/IGdsb2JhbFRoaXMgOiBnbG9iYWwgfHwgc2VsZiwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgY3VycmVudCA9IGdsb2JhbC5Db29raWVzO1xuICAgIHZhciBleHBvcnRzID0gZ2xvYmFsLkNvb2tpZXMgPSBmYWN0b3J5KCk7XG4gICAgZXhwb3J0cy5ub0NvbmZsaWN0ID0gZnVuY3Rpb24gKCkgeyBnbG9iYWwuQ29va2llcyA9IGN1cnJlbnQ7IHJldHVybiBleHBvcnRzOyB9O1xuICB9KSgpKTtcbn0pKHRoaXMsIChmdW5jdGlvbiAoKSB7ICd1c2Ugc3RyaWN0JztcblxuICAvKiBlc2xpbnQtZGlzYWJsZSBuby12YXIgKi9cbiAgZnVuY3Rpb24gYXNzaWduICh0YXJnZXQpIHtcbiAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgIGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHtcbiAgICAgICAgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRhcmdldFxuICB9XG4gIC8qIGVzbGludC1lbmFibGUgbm8tdmFyICovXG5cbiAgLyogZXNsaW50LWRpc2FibGUgbm8tdmFyICovXG4gIHZhciBkZWZhdWx0Q29udmVydGVyID0ge1xuICAgIHJlYWQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgaWYgKHZhbHVlWzBdID09PSAnXCInKSB7XG4gICAgICAgIHZhbHVlID0gdmFsdWUuc2xpY2UoMSwgLTEpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHZhbHVlLnJlcGxhY2UoLyglW1xcZEEtRl17Mn0pKy9naSwgZGVjb2RlVVJJQ29tcG9uZW50KVxuICAgIH0sXG4gICAgd3JpdGU6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgcmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudCh2YWx1ZSkucmVwbGFjZShcbiAgICAgICAgLyUoMlszNDZCRl18M1tBQy1GXXw0MHw1W0JERV18NjB8N1tCQ0RdKS9nLFxuICAgICAgICBkZWNvZGVVUklDb21wb25lbnRcbiAgICAgIClcbiAgICB9XG4gIH07XG4gIC8qIGVzbGludC1lbmFibGUgbm8tdmFyICovXG5cbiAgLyogZXNsaW50LWRpc2FibGUgbm8tdmFyICovXG5cbiAgZnVuY3Rpb24gaW5pdCAoY29udmVydGVyLCBkZWZhdWx0QXR0cmlidXRlcykge1xuICAgIGZ1bmN0aW9uIHNldCAobmFtZSwgdmFsdWUsIGF0dHJpYnV0ZXMpIHtcbiAgICAgIGlmICh0eXBlb2YgZG9jdW1lbnQgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICBhdHRyaWJ1dGVzID0gYXNzaWduKHt9LCBkZWZhdWx0QXR0cmlidXRlcywgYXR0cmlidXRlcyk7XG5cbiAgICAgIGlmICh0eXBlb2YgYXR0cmlidXRlcy5leHBpcmVzID09PSAnbnVtYmVyJykge1xuICAgICAgICBhdHRyaWJ1dGVzLmV4cGlyZXMgPSBuZXcgRGF0ZShEYXRlLm5vdygpICsgYXR0cmlidXRlcy5leHBpcmVzICogODY0ZTUpO1xuICAgICAgfVxuICAgICAgaWYgKGF0dHJpYnV0ZXMuZXhwaXJlcykge1xuICAgICAgICBhdHRyaWJ1dGVzLmV4cGlyZXMgPSBhdHRyaWJ1dGVzLmV4cGlyZXMudG9VVENTdHJpbmcoKTtcbiAgICAgIH1cblxuICAgICAgbmFtZSA9IGVuY29kZVVSSUNvbXBvbmVudChuYW1lKVxuICAgICAgICAucmVwbGFjZSgvJSgyWzM0NkJdfDVFfDYwfDdDKS9nLCBkZWNvZGVVUklDb21wb25lbnQpXG4gICAgICAgIC5yZXBsYWNlKC9bKCldL2csIGVzY2FwZSk7XG5cbiAgICAgIHZhciBzdHJpbmdpZmllZEF0dHJpYnV0ZXMgPSAnJztcbiAgICAgIGZvciAodmFyIGF0dHJpYnV0ZU5hbWUgaW4gYXR0cmlidXRlcykge1xuICAgICAgICBpZiAoIWF0dHJpYnV0ZXNbYXR0cmlidXRlTmFtZV0pIHtcbiAgICAgICAgICBjb250aW51ZVxuICAgICAgICB9XG5cbiAgICAgICAgc3RyaW5naWZpZWRBdHRyaWJ1dGVzICs9ICc7ICcgKyBhdHRyaWJ1dGVOYW1lO1xuXG4gICAgICAgIGlmIChhdHRyaWJ1dGVzW2F0dHJpYnV0ZU5hbWVdID09PSB0cnVlKSB7XG4gICAgICAgICAgY29udGludWVcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIENvbnNpZGVycyBSRkMgNjI2NSBzZWN0aW9uIDUuMjpcbiAgICAgICAgLy8gLi4uXG4gICAgICAgIC8vIDMuICBJZiB0aGUgcmVtYWluaW5nIHVucGFyc2VkLWF0dHJpYnV0ZXMgY29udGFpbnMgYSAleDNCIChcIjtcIilcbiAgICAgICAgLy8gICAgIGNoYXJhY3RlcjpcbiAgICAgICAgLy8gQ29uc3VtZSB0aGUgY2hhcmFjdGVycyBvZiB0aGUgdW5wYXJzZWQtYXR0cmlidXRlcyB1cCB0byxcbiAgICAgICAgLy8gbm90IGluY2x1ZGluZywgdGhlIGZpcnN0ICV4M0IgKFwiO1wiKSBjaGFyYWN0ZXIuXG4gICAgICAgIC8vIC4uLlxuICAgICAgICBzdHJpbmdpZmllZEF0dHJpYnV0ZXMgKz0gJz0nICsgYXR0cmlidXRlc1thdHRyaWJ1dGVOYW1lXS5zcGxpdCgnOycpWzBdO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gKGRvY3VtZW50LmNvb2tpZSA9XG4gICAgICAgIG5hbWUgKyAnPScgKyBjb252ZXJ0ZXIud3JpdGUodmFsdWUsIG5hbWUpICsgc3RyaW5naWZpZWRBdHRyaWJ1dGVzKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldCAobmFtZSkge1xuICAgICAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gJ3VuZGVmaW5lZCcgfHwgKGFyZ3VtZW50cy5sZW5ndGggJiYgIW5hbWUpKSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICAvLyBUbyBwcmV2ZW50IHRoZSBmb3IgbG9vcCBpbiB0aGUgZmlyc3QgcGxhY2UgYXNzaWduIGFuIGVtcHR5IGFycmF5XG4gICAgICAvLyBpbiBjYXNlIHRoZXJlIGFyZSBubyBjb29raWVzIGF0IGFsbC5cbiAgICAgIHZhciBjb29raWVzID0gZG9jdW1lbnQuY29va2llID8gZG9jdW1lbnQuY29va2llLnNwbGl0KCc7ICcpIDogW107XG4gICAgICB2YXIgamFyID0ge307XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNvb2tpZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIHBhcnRzID0gY29va2llc1tpXS5zcGxpdCgnPScpO1xuICAgICAgICB2YXIgdmFsdWUgPSBwYXJ0cy5zbGljZSgxKS5qb2luKCc9Jyk7XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICB2YXIgZm91bmQgPSBkZWNvZGVVUklDb21wb25lbnQocGFydHNbMF0pO1xuICAgICAgICAgIGphcltmb3VuZF0gPSBjb252ZXJ0ZXIucmVhZCh2YWx1ZSwgZm91bmQpO1xuXG4gICAgICAgICAgaWYgKG5hbWUgPT09IGZvdW5kKSB7XG4gICAgICAgICAgICBicmVha1xuICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoZSkge31cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG5hbWUgPyBqYXJbbmFtZV0gOiBqYXJcbiAgICB9XG5cbiAgICByZXR1cm4gT2JqZWN0LmNyZWF0ZShcbiAgICAgIHtcbiAgICAgICAgc2V0LFxuICAgICAgICBnZXQsXG4gICAgICAgIHJlbW92ZTogZnVuY3Rpb24gKG5hbWUsIGF0dHJpYnV0ZXMpIHtcbiAgICAgICAgICBzZXQoXG4gICAgICAgICAgICBuYW1lLFxuICAgICAgICAgICAgJycsXG4gICAgICAgICAgICBhc3NpZ24oe30sIGF0dHJpYnV0ZXMsIHtcbiAgICAgICAgICAgICAgZXhwaXJlczogLTFcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgKTtcbiAgICAgICAgfSxcbiAgICAgICAgd2l0aEF0dHJpYnV0ZXM6IGZ1bmN0aW9uIChhdHRyaWJ1dGVzKSB7XG4gICAgICAgICAgcmV0dXJuIGluaXQodGhpcy5jb252ZXJ0ZXIsIGFzc2lnbih7fSwgdGhpcy5hdHRyaWJ1dGVzLCBhdHRyaWJ1dGVzKSlcbiAgICAgICAgfSxcbiAgICAgICAgd2l0aENvbnZlcnRlcjogZnVuY3Rpb24gKGNvbnZlcnRlcikge1xuICAgICAgICAgIHJldHVybiBpbml0KGFzc2lnbih7fSwgdGhpcy5jb252ZXJ0ZXIsIGNvbnZlcnRlciksIHRoaXMuYXR0cmlidXRlcylcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgYXR0cmlidXRlczogeyB2YWx1ZTogT2JqZWN0LmZyZWV6ZShkZWZhdWx0QXR0cmlidXRlcykgfSxcbiAgICAgICAgY29udmVydGVyOiB7IHZhbHVlOiBPYmplY3QuZnJlZXplKGNvbnZlcnRlcikgfVxuICAgICAgfVxuICAgIClcbiAgfVxuXG4gIHZhciBhcGkgPSBpbml0KGRlZmF1bHRDb252ZXJ0ZXIsIHsgcGF0aDogJy8nIH0pO1xuICAvKiBlc2xpbnQtZW5hYmxlIG5vLXZhciAqL1xuXG4gIHJldHVybiBhcGk7XG5cbn0pKTtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fY3JlYXRlQmluZGluZyA9ICh0aGlzICYmIHRoaXMuX19jcmVhdGVCaW5kaW5nKSB8fCAoT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gICAgdmFyIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG0sIGspO1xuICAgIGlmICghZGVzYyB8fCAoXCJnZXRcIiBpbiBkZXNjID8gIW0uX19lc01vZHVsZSA6IGRlc2Mud3JpdGFibGUgfHwgZGVzYy5jb25maWd1cmFibGUpKSB7XG4gICAgICBkZXNjID0geyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gbVtrXTsgfSB9O1xuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgazIsIGRlc2MpO1xufSkgOiAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICAgIG9bazJdID0gbVtrXTtcbn0pKTtcbnZhciBfX3NldE1vZHVsZURlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9fc2V0TW9kdWxlRGVmYXVsdCkgfHwgKE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgdikge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBcImRlZmF1bHRcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdiB9KTtcbn0pIDogZnVuY3Rpb24obywgdikge1xuICAgIG9bXCJkZWZhdWx0XCJdID0gdjtcbn0pO1xudmFyIF9faW1wb3J0U3RhciA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnRTdGFyKSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcbiAgICB2YXIgcmVzdWx0ID0ge307XG4gICAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrIGluIG1vZCkgaWYgKGsgIT09IFwiZGVmYXVsdFwiICYmIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSBfX2NyZWF0ZUJpbmRpbmcocmVzdWx0LCBtb2QsIGspO1xuICAgIF9fc2V0TW9kdWxlRGVmYXVsdChyZXN1bHQsIG1vZCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbn07XG4vLy8gPHJlZmVyZW5jZSB0eXBlcz0nanF1ZXJ5Jy8+XG52YXIgQ29va2llcyA9IF9faW1wb3J0U3RhcihyZXF1aXJlKFwianMtY29va2llXCIpKTtcbnZhciB1bmRlZiwgbXlSb290ID0geyBkb2N1bWVudDoge30sIG5hdmlnYXRvcjogeyB1c2VyQWdlbnQ6ICcnIH0sIGxvY2F0aW9uOiB7IHByb3RvY29sOiAnZmlsZScsIGhvc3RuYW1lOiAnJyB9IH07XG4vLyBFc3RhYmxpc2ggdGhlIG9iamVjdCB0aGF0IGdldHMgcmV0dXJuZWQgdG8gYnJlYWsgb3V0IG9mIGEgbG9vcCBpdGVyYXRpb24uXG52YXIgYnJlYWtlciA9IHt9O1xuLyoqXG4gKiBpZiBudWxsIHJldHVybiBkZWZhdWx0LCBlbHNlIHJldHVybiBvYmplY3RcbiAqXG4gKiBAcGFyYW0gIHthbnl9IG9ialxuICogQHBhcmFtICB7YW55fSBkZWZhdWx0VmFsdWVcbiAqIEByZXR1cm4ge2FueX1cbiAqL1xuZnVuY3Rpb24gaXNOdWxsKG9iaiwgZGVmYXVsdFZhbHVlKSB7XG4gICAgcmV0dXJuIChvYmogPT09IG51bGwgfHwgb2JqID09PSB1bmRlZiB8fCBpc05hTihvYmopKSA/IGRlZmF1bHRWYWx1ZSA6IG9iajtcbn1cbmlmICh0eXBlb2YgKHdpbmRvdykgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgbXlSb290ID0gd2luZG93O1xufVxuLyoqXG4gKiBHZXQgb2JqZWN0IGtleXNcbiAqXG4gKiBAdHlwZSB7QXJyYXk8c3RyaW5nPn1cbiAqL1xudmFyIGtleXMgPSBmdW5jdGlvbiAob2JqKSB7XG4gICAgaWYgKE9iamVjdC5rZXlzKSB7XG4gICAgICAgIHJldHVybiBPYmplY3Qua2V5cyhvYmopO1xuICAgIH1cbiAgICBpZiAob2JqICE9PSBPYmplY3Qob2JqKSkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdJbnZhbGlkIG9iamVjdCcpO1xuICAgIH1cbiAgICB2YXIga2V5cyA9IFtdLCBrZXk7XG4gICAgZm9yIChrZXkgaW4gb2JqKSB7XG4gICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpKVxuICAgICAgICAgICAga2V5cy5wdXNoKGtleSk7XG4gICAgfVxuICAgIHJldHVybiBrZXlzO1xufTtcbnZhciB1c2VyQWdlbnQgPSBteVJvb3QubmF2aWdhdG9yLnVzZXJBZ2VudCB8fCAnJztcbi8qKlxuICogQHJldHVybnMge2Jvb2xlYW59ICB0cnVlIGlmIGludGVybmV0IGV4cGxvcmVyXG4gKi9cbmZ1bmN0aW9uIGRldGVjdEllKCkge1xuICAgIHZhciB1YSA9IHVzZXJBZ2VudDtcbiAgICB2YXIgbXNpZSA9IHVhLmluZGV4T2YoJ01TSUUgJyk7XG4gICAgdmFyIHRyaWRlbnQgPSB1YS5pbmRleE9mKCdUcmlkZW50LycpO1xuICAgIHZhciBydiA9IHVhLmluZGV4T2YoJ3J2OicpO1xuICAgIGlmIChtc2llID4gMCkge1xuICAgICAgICAvLyBJRSAxMCBvciBvbGRlciA9PiByZXR1cm4gdmVyc2lvbiBudW1iZXJcbiAgICAgICAgcmV0dXJuIHBhcnNlSW50KHVhLnN1YnN0cmluZyhtc2llICsgNSwgdWEuaW5kZXhPZignLicsIG1zaWUpKSwgMTApO1xuICAgIH1cbiAgICBpZiAodHJpZGVudCA+IDApIHtcbiAgICAgICAgLy8gSUUgMTEgKG9yIG5ld2VyKSA9PiByZXR1cm4gdmVyc2lvbiBudW1iZXJcbiAgICAgICAgcmV0dXJuIHBhcnNlSW50KHVhLnN1YnN0cmluZyhydiArIDMsIHVhLmluZGV4T2YoJy4nLCBydikpLCAxMCk7XG4gICAgfVxuICAgIC8vIG90aGVyIGJyb3dzZXJcbiAgICByZXR1cm4gZmFsc2U7XG59XG4vKipcbiAqIFRoZSBCcmlja0NtcyBjbGFzc1xuICovXG52YXIgQnJpY2tDbXMgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQnJpY2tDbXMoKSB7XG4gICAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgICAgdmFyIGhvc3RuYW1lID0gdGhhdC50cmltKG15Um9vdC5sb2NhdGlvbi5ob3N0bmFtZS50b0xvd2VyQ2FzZSgpKTtcbiAgICAgICAgdGhhdC5zaXRlID0geyBob3N0bmFtZTogaG9zdG5hbWUsIGRvbWFpbjogaG9zdG5hbWUucmVwbGFjZSgnd3d3LicsICcnKSwgY29uZmlnOiB7fSB9O1xuICAgICAgICB0aGF0LmJyb3dzZXIgPSB7XG4gICAgICAgICAgICBpc0lFOiBkZXRlY3RJZSgpLFxuICAgICAgICAgICAgaXNNb2JpbGU6IC9pUChob25lfG9kfGFkKXxBbmRyb2lkfEJsYWNrQmVycnl8SUVNb2JpbGV8S2luZGxlfE5ldEZyb250fFNpbGstQWNjZWxlcmF0ZWR8KGhwd3x3ZWIpT1N8RmVubmVjfE1pbmltb3xPcGVyYSBNKG9iaXxpbmkpfEJsYXplcnxEb2xmaW58RG9scGhpbnxTa3lmaXJlfFp1bmUvZ2kudGVzdCh1c2VyQWdlbnQpLFxuICAgICAgICAgICAgaXNBbmRyb2lkOiAvKGFuZHJvaWQpL2dpLnRlc3QodXNlckFnZW50KSxcbiAgICAgICAgICAgIGlzSU9TOiAvaVAoaG9uZXxvZHxhZCkvZ2kudGVzdCh1c2VyQWdlbnQpXG4gICAgICAgIH07XG4gICAgICAgIHRoYXQuY29va2llcyA9IENvb2tpZXM7XG4gICAgICAgIHRoYXQud2luID0gbXlSb290O1xuICAgICAgICB0aGF0LmRvYyA9IG15Um9vdC5kb2N1bWVudDtcbiAgICAgICAgdGhhdC5qcSA9IGpRdWVyeSB8fCAkO1xuICAgICAgICB0aGF0LmtleXMgPSBrZXlzO1xuICAgICAgICB0aGF0LmlzTnVsbCA9IGlzTnVsbDtcbiAgICAgICAgLy8gYmVnaW5cbiAgICAgICAgLy8gMS4gYXV0b21hdGljIGdlb2NvZGUgaXAgYWRkcmVzcyBhbmQgc3RvcmUgaXRcbiAgICAgICAgdGhpcy5qcS5nZXRKU09OKCdodHRwczovL2NkbjIuYnJpY2tpbmMubmV0L2dlb2lwbWUvP2J1c3Rlcj0nICsgKG5ldyBEYXRlKCkuZ2V0VGltZSgpKSwgZnVuY3Rpb24gKHJzdCkge1xuICAgICAgICAgICAgaWYgKHJzdC5sYXRpdHVkZSkge1xuICAgICAgICAgICAgICAgIHRoYXQubXlHZW8gPSByc3Q7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQnJpY2tDbXMucHJvdG90eXBlLCBcIm5hbWVcIiwge1xuICAgICAgICAvKipcbiAgICAgICAgICogZ2V0IHRoZSBuYW1lIG9mIHRoZSBsaWJyYXJ5XG4gICAgICAgICAqIEByZXR1cm4ge3N0cmluZ30gbGlicmFyeSBuYW1lXG4gICAgICAgICAqL1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9uYW1lO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgLyoqXG4gICAgICogb3VyIGludGVybmFsIGNhY2hlIGJ1c3RlciBiYXNlIG9uIDEwdGggb2YgbWludXRlc1xuICAgICAqXG4gICAgICogeXl5eU1NZGRoaG1cbiAgICAgKiAtIHRoaXMgZm9ybWF0IGFsbG93IHVzIHRvIGNhY2hlIGV2ZXJ5IDEwdGggbWludXRlc1xuICAgICAqIE5vdGU6IHRoZXJlIGlzIG5vIG5lZWQgdG8gd29ycnkgYWJvdXQgdGltZXpvbmVcbiAgICAgKiBiZWNhdXNlIGl0IHNob3VsZCByZXR1cm4gZGF0YSBiYXNlIG9uIGNsaWVudCdzIHRpbWV6b25lXG4gICAgICogd2hpY2ggaXMgYWxyZWFkeSBoYW5kbGVkIGJ5IHRoZSBkYXRhIHJldHVybmVkIGhlcmVcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7RGF0ZX0gZGF0ZSBvcHRpb25hbCBkYXRlXG4gICAgICovXG4gICAgQnJpY2tDbXMucHJvdG90eXBlLmdjYiA9IGZ1bmN0aW9uIChkYXRlKSB7XG4gICAgICAgIGlmIChkYXRlID09PSB2b2lkIDApIHsgZGF0ZSA9IG5ldyBEYXRlKCk7IH1cbiAgICAgICAgdmFyIHR6byA9IC1kYXRlLmdldFRpbWV6b25lT2Zmc2V0KCksIGRpZiA9IHR6byA+PSAwID8gJysnIDogJy0nLCBwYWQgPSBmdW5jdGlvbiAobnVtKSB7XG4gICAgICAgICAgICByZXR1cm4gKG51bSA8IDEwID8gJzAnIDogJycpICsgbnVtO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gZGF0ZS5nZXRGdWxsWWVhcigpICtcbiAgICAgICAgICAgICcnICsgcGFkKGRhdGUuZ2V0TW9udGgoKSArIDEpICtcbiAgICAgICAgICAgICcnICsgcGFkKGRhdGUuZ2V0RGF0ZSgpKSArXG4gICAgICAgICAgICAnJyArIHBhZChkYXRlLmdldEhvdXJzKCkpICtcbiAgICAgICAgICAgICcnICsgcGFkKGRhdGUuZ2V0TWludXRlcygpKVswXTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIHRyaW0gc3RyaW5nXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtzdHJpbmd9IHN0ciB0aGUgc3RyaW5nXG4gICAgICogQHJldHVybiB7c3RyaW5nfSAgICAgdHJpbW1lZCByZXN1bHRcbiAgICAgKi9cbiAgICBCcmlja0Ntcy5wcm90b3R5cGUudHJpbSA9IGZ1bmN0aW9uIChzdHIpIHtcbiAgICAgICAgcmV0dXJuIChzdHIudHJpbSkgPyBzdHIudHJpbSgpIDogc3RyLnJlcGxhY2UoL15cXHMqfFxccyokL2csICcnKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIGdyb3VwIGEgbGlzdCBieSBzb21lIGtleSBhdHRyaWJ1dGVcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7QXJyYXk8YW55Pn0gbGlzdCAgICAgIGxpc3Qgb3IgYXJyYXkgb2Ygb2JqZWN0c1xuICAgICAqIEBwYXJhbSB7c3RyaW5nfSAgICAgYXR0cmlidXRlIG9iamVjdCBrZXkgcHJvcGVydHkgbmFtZVxuICAgICAqIEBwYXJhbSB7YW55KSAgICA9PiAgICAgICAgdm9pZH0gICAgICAgIHBvc3RQcm9jZXNzRnVuY3Rpb24gZG8gc29tZXRoaW5nIG9uIGVhY2ggZ3JvdXBcbiAgICAgKiBAcmV0dXJuIHtBcnJheTxhbnk+fSAgICAgICAgICAgICAgICAgICAgICBncm91cCByZXN1bHRcbiAgICAgKi9cbiAgICBCcmlja0Ntcy5wcm90b3R5cGUuZ3JvdXBCeSA9IGZ1bmN0aW9uIChsaXN0LCBhdHRyaWJ1dGUsIHBvc3RQcm9jZXNzRnVuY3Rpb24pIHtcbiAgICAgICAgaWYgKGlzTnVsbChsaXN0LCBudWxsKSA9PT0gbnVsbClcbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgLy8gRmlyc3QsIHJlc2V0IGRlY2xhcmUgcmVzdWx0LlxuICAgICAgICB2YXIgZ3JvdXBzID0gW10sIGdyb3VwZXIgPSB7fTtcbiAgICAgICAgLy8gdGhpcyBtYWtlIHN1cmUgYWxsIGVsZW1lbnRzIGFyZSBjb3JyZWN0bHkgc29ydGVkXG4gICAgICAgIGxpc3QuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgdmFyIGdyb3VwS2V5ID0gaXRlbVthdHRyaWJ1dGVdLCBncm91cCA9IGdyb3VwZXJbZ3JvdXBLZXldO1xuICAgICAgICAgICAgaWYgKGlzTnVsbChncm91cCwgbnVsbCkgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBncm91cCA9IHtcbiAgICAgICAgICAgICAgICAgICAga2V5OiBncm91cEtleSxcbiAgICAgICAgICAgICAgICAgICAgaXRlbXM6IFtdXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBncm91cGVyW2dyb3VwS2V5XSA9IGdyb3VwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZ3JvdXAuaXRlbXMucHVzaChpdGVtKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuanEuZWFjaChncm91cGVyLCBmdW5jdGlvbiAoaSwgbXlHcm91cCkge1xuICAgICAgICAgICAgbXlHcm91cC4kaWR4ID0gaTtcbiAgICAgICAgICAgIGdyb3Vwcy5wdXNoKG15R3JvdXApO1xuICAgICAgICAgICAgaWYgKHBvc3RQcm9jZXNzRnVuY3Rpb24pXG4gICAgICAgICAgICAgICAgcG9zdFByb2Nlc3NGdW5jdGlvbihteUdyb3VwKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB0aGlzLnNvcnRPbihncm91cHMsICdrZXknKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIGdldCBjdXJyZW50IHN0b3JlIGlkXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtzdHJpbmd9IHRoZSBjdXJyZW50IHN0b3JlIGlkXG4gICAgICovXG4gICAgQnJpY2tDbXMucHJvdG90eXBlLm15U3RvcmVJZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIENvb2tpZXMuZ2V0KCdteVN0b3JlSWQnKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIHNhZmVseSBkZWNvZGVVUklDb21wb25lbnQgdGhlIHN0cmluZ1xuICAgICAqXG4gICAgICogQHBhcmFtICB7c3RyaW5nfSBzdHJcbiAgICAgKiBAcmV0dXJuIHtzdHJpbmd9ICAgICBkZWNvZGVkIHN0cmluZ1xuICAgICAqL1xuICAgIEJyaWNrQ21zLnByb3RvdHlwZS5kZWNvZGUgPSBmdW5jdGlvbiAoc3RyKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KHN0ci5yZXBsYWNlKC9cXCsvZywgJyAnKSk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIHJldHVybiBzdHI7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8qKlxuICAgICAqIHNhZmVseSBlbmNvZGVVUklDb21wb25lbnQgdGhlIHN0cmluZ1xuICAgICAqXG4gICAgICogQHBhcmFtICB7c3RyaW5nfSBzdHJcbiAgICAgKiBAcmV0dXJuIHtzdHJpbmd9ICAgICBlbmNvZGVkIHN0cmluZ1xuICAgICAqL1xuICAgIEJyaWNrQ21zLnByb3RvdHlwZS5lbmNvZGUgPSBmdW5jdGlvbiAoc3RyKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KHN0cik7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIHJldHVybiBzdHI7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8qKlxuICAgICAqIHNsdWdpZnkgYSBzdHJpbmdcbiAgICAgKlxuICAgICAqIEBwYXJhbSAge3N0cmluZ30gc3RyIHRoZSBzdHJpbmcgdG8gc2x1Z1xuICAgICAqIEByZXR1cm4ge3N0cmluZ30gICAgIHNsdWcgcmVzdWx0XG4gICAgICovXG4gICAgQnJpY2tDbXMucHJvdG90eXBlLnNsdWdpZnkgPSBmdW5jdGlvbiAoc3RyKSB7XG4gICAgICAgIHN0ciA9IHN0ciB8fCAnJztcbiAgICAgICAgaWYgKHN0ciA9PT0gJycpXG4gICAgICAgICAgICByZXR1cm4gc3RyO1xuICAgICAgICBzdHIgPSBzdHIudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9bXjAtOWEtelxcLVxcX10rL2dpLCAnLScpLnJlcGxhY2UoL1tcXC1dKy9naSwgJy0nKTtcbiAgICAgICAgcmV0dXJuIHN0cjtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIGhlbHBlciBtZXRob2QgdG8gcGFyc2UgcXVlcnlzdHJpbmcgdG8gb2JqZWN0XG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtzdHJpbmd9IHFzdHIgdGhlIHF1ZXJ5c3RyaW5nXG4gICAgICogQHJldHVybiB7YW55fSAgICAgICAgIHJlc3VsdCBvYmplY3RcbiAgICAgKi9cbiAgICBCcmlja0Ntcy5wcm90b3R5cGUucXVlcnlQYXJzZVN0cmluZyA9IGZ1bmN0aW9uIChxc3RyKSB7XG4gICAgICAgIHFzdHIgPSAocXN0ciB8fCAnJykucmVwbGFjZSgnPycsICcnKS5yZXBsYWNlKCcjJywgJycpO1xuICAgICAgICB2YXIgcGF0dGVybiA9IC8oXFx3KylcXFsoXFxkKylcXF0vO1xuICAgICAgICB2YXIgZGVjb2RlID0gdGhpcy5kZWNvZGUsIG9iaiA9IHt9LCBhID0gcXN0ci5zcGxpdCgnJicpO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBwYXJ0cyA9IGFbaV0uc3BsaXQoJz0nKSwga2V5ID0gZGVjb2RlKHBhcnRzWzBdKSwgbSA9IHBhdHRlcm4uZXhlYyhrZXkpO1xuICAgICAgICAgICAgaWYgKG0pIHtcbiAgICAgICAgICAgICAgICBvYmpbbVsxXV0gPSBvYmpbbVsxXV0gfHwgW107XG4gICAgICAgICAgICAgICAgb2JqW21bMV1dW21bMl1dID0gZGVjb2RlKHBhcnRzWzFdKTtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG9ialtwYXJ0c1swXV0gPSBkZWNvZGUocGFydHNbMV0gfHwgJycpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvYmo7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiByZXZlcnNlIG9iamVjdCB0byBxdWVyeSBzdHJpbmdcbiAgICAgKlxuICAgICAqIHF1ZXJ5U3RyaW5naWZ5KHsgZm9vOiBiYXIgfSk7ICAgICAgIC8vIGZvbz1iYXJcbiAgICAgKiBxdWVyeVN0cmluZ2lmeSh7IGZvbzogYmFyIH0sIHRydWUpOyAvLyA/Zm9vPWJhclxuICAgICAqIHF1ZXJ5U3RyaW5naWZ5KHsgZm9vOiBiYXIgfSwgJyMnKTsgIC8vICNmb289YmFyXG4gICAgICogcXVlcnlTdHJpbmdpZnkoeyBmb286ICcnIH0sICcmJyk7ICAgLy8gJmZvbz1cbiAgICAgKlxuICAgICAqIEBwYXJhbSAge2FueX0gICAgb2JqICAgIHRoZSBvYmplY3RcbiAgICAgKiBAcGFyYW0gIHtzdHJpbmd9IHByZWZpeCBvcHRpb25hbCBwcmVmaXhcbiAgICAgKiBAcmV0dXJuIHtzdHJpbmd9XG4gICAgICovXG4gICAgQnJpY2tDbXMucHJvdG90eXBlLnF1ZXJ5U3RyaW5naWZ5ID0gZnVuY3Rpb24gKG9iaiwgcHJlZml4KSB7XG4gICAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgICAgdmFyIGVuY29kZSA9IHRoYXQuZW5jb2RlO1xuICAgICAgICB2YXIgc3RyID0gW10sIHA7XG4gICAgICAgIGZvciAocCBpbiBvYmopIHtcbiAgICAgICAgICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkocCkpIHtcbiAgICAgICAgICAgICAgICB2YXIgayA9IHByZWZpeCA/IHByZWZpeCArICdbJyArIHAgKyAnXScgOiBwLCB2ID0gb2JqW3BdO1xuICAgICAgICAgICAgICAgIHN0ci5wdXNoKCh2ICE9PSBudWxsICYmIHR5cGVvZiB2ID09PSAnb2JqZWN0JykgP1xuICAgICAgICAgICAgICAgICAgICB0aGF0LnF1ZXJ5U3RyaW5naWZ5KHYsIGspIDpcbiAgICAgICAgICAgICAgICAgICAgZW5jb2RlKGspICsgJz0nICsgZW5jb2RlKHYpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3RyLmpvaW4oJyYnKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIGdldCBkaXN0YW5jZSBiZXR3ZWVuIHR3byBwb2ludHNcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBsYXRpdHVkZTFcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbG9uZ2l0dWRlMVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBsYXRpdHVkZTJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbG9uZ2l0dWRlMlxuICAgICAqIEBwYXJhbSB7YW55fSAgICBvcHRpb25zXG4gICAgICovXG4gICAgQnJpY2tDbXMucHJvdG90eXBlLmdlb0Rpc3RhbmNlID0gZnVuY3Rpb24gKGxhdGl0dWRlMSwgbG9uZ2l0dWRlMSwgbGF0aXR1ZGUyLCBsb25naXR1ZGUyLCBvcHRpb25zKSB7XG4gICAgICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgICAgICBmdW5jdGlvbiB0b1JhZChudW0pIHtcbiAgICAgICAgICAgIHJldHVybiBudW0gKiBNYXRoLlBJIC8gMTgwO1xuICAgICAgICB9XG4gICAgICAgIHZhciBzdGFydCA9IHsgbGF0aXR1ZGU6IGxhdGl0dWRlMSwgbG9uZ2l0dWRlOiBsb25naXR1ZGUxIH07XG4gICAgICAgIHZhciBlbmQgPSB7IGxhdGl0dWRlOiBsYXRpdHVkZTIsIGxvbmdpdHVkZTogbG9uZ2l0dWRlMiB9O1xuICAgICAgICB2YXIgcmFkaWkgPSB7IGttOiA2MzcxLCBtaWxlOiAzOTYwLCBtZXRlcjogNjM3MTAwMCwgbm1pOiAzNDQwIH07XG4gICAgICAgIHZhciBSID0gb3B0aW9ucy51bml0IGluIHJhZGlpID8gcmFkaWlbb3B0aW9ucy51bml0XSA6IHJhZGlpLmttO1xuICAgICAgICB2YXIgZExhdCA9IHRvUmFkKGVuZC5sYXRpdHVkZSAtIHN0YXJ0LmxhdGl0dWRlKTtcbiAgICAgICAgdmFyIGRMb24gPSB0b1JhZChlbmQubG9uZ2l0dWRlIC0gc3RhcnQubG9uZ2l0dWRlKTtcbiAgICAgICAgdmFyIGxhdDEgPSB0b1JhZChzdGFydC5sYXRpdHVkZSk7XG4gICAgICAgIHZhciBsYXQyID0gdG9SYWQoZW5kLmxhdGl0dWRlKTtcbiAgICAgICAgdmFyIGEgPSBNYXRoLnNpbihkTGF0IC8gMikgKiBNYXRoLnNpbihkTGF0IC8gMikgKyBNYXRoLnNpbihkTG9uIC8gMikgKiBNYXRoLnNpbihkTG9uIC8gMikgKiBNYXRoLmNvcyhsYXQxKSAqIE1hdGguY29zKGxhdDIpO1xuICAgICAgICB2YXIgYyA9IDIgKiBNYXRoLmF0YW4yKE1hdGguc3FydChhKSwgTWF0aC5zcXJ0KDEgLSBhKSk7XG4gICAgICAgIGlmIChvcHRpb25zLnRocmVzaG9sZCkge1xuICAgICAgICAgICAgcmV0dXJuIG9wdGlvbnMudGhyZXNob2xkID4gKFIgKiBjKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gUiAqIGM7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBzb3J0IHdpdGggbmVhcmVzdCBnZW9wb2ludCwgZXhwZWN0IG9iamVjdCB3aXRoIHR3byBwcm9wZXJ0aWVzOiBMYXRpdHVkZSBhbmQgTG9uZ2l0dWRlXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0FycmF5PGFueT59IHBvaW50c1xuICAgICAqIEBwYXJhbSB7YW55fSAgICAgICAgb3JpZ2luXG4gICAgICogQHBhcmFtIHthbnkpICAgID0+ICAgICB2b2lkfSAgICAgICAgY2FsbGJhY2tcbiAgICAgKi9cbiAgICBCcmlja0Ntcy5wcm90b3R5cGUuZ2VvT3JkZXJCeU9yaWdpbiA9IGZ1bmN0aW9uIChwb2ludHMsIG9yaWdpbiwgY2FsbGJhY2spIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdmFyIHJlc3VsdHMgPSBbXTtcbiAgICAgICAgcG9pbnRzLmZvckVhY2goZnVuY3Rpb24gKHBvaW50KSB7XG4gICAgICAgICAgICB2YXIgZCA9IF90aGlzLmdlb0Rpc3RhbmNlKG9yaWdpbi5sYXRpdHVkZSwgb3JpZ2luLmxvbmdpdHVkZSwgcG9pbnQubGF0aXR1ZGUsIHBvaW50LmxvbmdpdHVkZSwgeyB1bml0OiAnbWlsZScgfSk7XG4gICAgICAgICAgICB2YXIgbmV3UG9pbnQgPSB7IHBvaW50OiBwb2ludCwgZGlzdGFuY2U6IGQgfTtcbiAgICAgICAgICAgIHJlc3VsdHMucHVzaChuZXdQb2ludCk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnNvcnRPbihyZXN1bHRzLCAnZGlzdGFuY2UnKTtcbiAgICAgICAgY2FsbGJhY2soeyBvcmlnaW46IG9yaWdpbiwgcmVzdWx0czogcmVzdWx0cyB9KTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIHB1dCBzdG9yZSBzZWxlY3Rpb24gaW4gY29va2llXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc3RvcmVJZCB0aGUgc2VsZWN0ZWQgc3RvcmUgaWRcbiAgICAgKi9cbiAgICBCcmlja0Ntcy5wcm90b3R5cGUuc3RvcmVTZWxlY3QgPSBmdW5jdGlvbiAoc3RvcmVJZCkge1xuICAgICAgICBDb29raWVzLnNldCgnbXlTdG9yZUlkJywgc3RvcmVJZCk7XG4gICAgICAgIC8vIHRyaWdnZXIgZXZlbnQgc28gY2xpZW50IGNhbiByZWxvYWQgcGFnZSwgaWYgcmVxdWlyZWRcbiAgICAgICAgdGhpcy5qcShcImhlYWRcIikudHJpZ2dlcignc3RvcmVTZWxlY3RlZCcsIHsgc3RvcmU6IHN0b3JlSWQgfSk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBzb3J0IGEgbGlzdCBvZiBvYmplY3QgYmFzZSBvbiBzb21lIHByb3BlcnR5IG5hbWVcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7QXJyYXk8YW55Pn0gY29sbGVjdGlvbiBsaXN0IG9mIG9iamVjdHNcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gICAgIG5hbWUgICAgICAgcHJvcGVydHkgbmFtZVxuICAgICAqIEByZXR1cm4ge2FueX0gc29ydGVkIGxpc3RcbiAgICAgKi9cbiAgICBCcmlja0Ntcy5wcm90b3R5cGUuc29ydE9uID0gZnVuY3Rpb24gKGNvbGxlY3Rpb24sIG5hbWUpIHtcbiAgICAgICAgaWYgKCFjb2xsZWN0aW9uKVxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIGlmIChjb2xsZWN0aW9uLmxlbmd0aCA8PSAwKVxuICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICAvLyBkZXRlY3QgYXR0cmlidXRlIHR5cGUsIHByb2JsZW0gaXMgaWYgeW91ciBmaXJzdCBvYmplY3QgaXMgbnVsbCBvciBub3Qgc3RyaW5nIHRoZW4gdGhpcyBicmVha3NcbiAgICAgICAgaWYgKHR5cGVvZiAoY29sbGVjdGlvblswXVtuYW1lXSkgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBjb2xsZWN0aW9uLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgICAgICAgICAgICBpZiAoKGFbbmFtZV0gJiYgYVtuYW1lXS50b0xvd2VyQ2FzZSgpKSA8IChiW25hbWVdICYmIGJbbmFtZV0udG9Mb3dlckNhc2UoKSkpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAtMTtcbiAgICAgICAgICAgICAgICBpZiAoKGFbbmFtZV0gJiYgYVtuYW1lXS50b0xvd2VyQ2FzZSgpKSA+IChiW25hbWVdICYmIGJbbmFtZV0udG9Mb3dlckNhc2UoKSkpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb2xsZWN0aW9uLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgICAgICAgICAgICBpZiAoYVtuYW1lXSA8IGJbbmFtZV0pXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAtMTtcbiAgICAgICAgICAgICAgICBpZiAoYVtuYW1lXSA+IGJbbmFtZV0pXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNvbGxlY3Rpb247XG4gICAgfTtcbiAgICByZXR1cm4gQnJpY2tDbXM7XG59KCkpO1xubW9kdWxlLmV4cG9ydHMgPSBuZXcgQnJpY2tDbXMoKTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9icmlja2Ntcy50c1wiKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==