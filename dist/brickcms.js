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
// Defined namespace BrickCms
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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cmNlcyI6WyJ3ZWJwYWNrOi8vQnJpY2tDbXMvd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL0JyaWNrQ21zLy4vbm9kZV9tb2R1bGVzL2pzLWNvb2tpZS9kaXN0L2pzLmNvb2tpZS5qcyIsIndlYnBhY2s6Ly9Ccmlja0Ntcy8uL3NyYy9icmlja2Ntcy50cyIsIndlYnBhY2s6Ly9Ccmlja0Ntcy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9Ccmlja0Ntcy93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL0JyaWNrQ21zL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9Ccmlja0Ntcy93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoXCJCcmlja0Ntc1wiLCBbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJCcmlja0Ntc1wiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJCcmlja0Ntc1wiXSA9IGZhY3RvcnkoKTtcbn0pKHNlbGYsICgpID0+IHtcbnJldHVybiAiLCIvKiEganMtY29va2llIHYzLjAuNSB8IE1JVCAqL1xuO1xuKGZ1bmN0aW9uIChnbG9iYWwsIGZhY3RvcnkpIHtcbiAgdHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnID8gbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCkgOlxuICB0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgPyBkZWZpbmUoZmFjdG9yeSkgOlxuICAoZ2xvYmFsID0gdHlwZW9mIGdsb2JhbFRoaXMgIT09ICd1bmRlZmluZWQnID8gZ2xvYmFsVGhpcyA6IGdsb2JhbCB8fCBzZWxmLCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBjdXJyZW50ID0gZ2xvYmFsLkNvb2tpZXM7XG4gICAgdmFyIGV4cG9ydHMgPSBnbG9iYWwuQ29va2llcyA9IGZhY3RvcnkoKTtcbiAgICBleHBvcnRzLm5vQ29uZmxpY3QgPSBmdW5jdGlvbiAoKSB7IGdsb2JhbC5Db29raWVzID0gY3VycmVudDsgcmV0dXJuIGV4cG9ydHM7IH07XG4gIH0pKCkpO1xufSkodGhpcywgKGZ1bmN0aW9uICgpIHsgJ3VzZSBzdHJpY3QnO1xuXG4gIC8qIGVzbGludC1kaXNhYmxlIG5vLXZhciAqL1xuICBmdW5jdGlvbiBhc3NpZ24gKHRhcmdldCkge1xuICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldO1xuICAgICAgZm9yICh2YXIga2V5IGluIHNvdXJjZSkge1xuICAgICAgICB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGFyZ2V0XG4gIH1cbiAgLyogZXNsaW50LWVuYWJsZSBuby12YXIgKi9cblxuICAvKiBlc2xpbnQtZGlzYWJsZSBuby12YXIgKi9cbiAgdmFyIGRlZmF1bHRDb252ZXJ0ZXIgPSB7XG4gICAgcmVhZDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICBpZiAodmFsdWVbMF0gPT09ICdcIicpIHtcbiAgICAgICAgdmFsdWUgPSB2YWx1ZS5zbGljZSgxLCAtMSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdmFsdWUucmVwbGFjZSgvKCVbXFxkQS1GXXsyfSkrL2dpLCBkZWNvZGVVUklDb21wb25lbnQpXG4gICAgfSxcbiAgICB3cml0ZTogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KHZhbHVlKS5yZXBsYWNlKFxuICAgICAgICAvJSgyWzM0NkJGXXwzW0FDLUZdfDQwfDVbQkRFXXw2MHw3W0JDRF0pL2csXG4gICAgICAgIGRlY29kZVVSSUNvbXBvbmVudFxuICAgICAgKVxuICAgIH1cbiAgfTtcbiAgLyogZXNsaW50LWVuYWJsZSBuby12YXIgKi9cblxuICAvKiBlc2xpbnQtZGlzYWJsZSBuby12YXIgKi9cblxuICBmdW5jdGlvbiBpbml0IChjb252ZXJ0ZXIsIGRlZmF1bHRBdHRyaWJ1dGVzKSB7XG4gICAgZnVuY3Rpb24gc2V0IChuYW1lLCB2YWx1ZSwgYXR0cmlidXRlcykge1xuICAgICAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGF0dHJpYnV0ZXMgPSBhc3NpZ24oe30sIGRlZmF1bHRBdHRyaWJ1dGVzLCBhdHRyaWJ1dGVzKTtcblxuICAgICAgaWYgKHR5cGVvZiBhdHRyaWJ1dGVzLmV4cGlyZXMgPT09ICdudW1iZXInKSB7XG4gICAgICAgIGF0dHJpYnV0ZXMuZXhwaXJlcyA9IG5ldyBEYXRlKERhdGUubm93KCkgKyBhdHRyaWJ1dGVzLmV4cGlyZXMgKiA4NjRlNSk7XG4gICAgICB9XG4gICAgICBpZiAoYXR0cmlidXRlcy5leHBpcmVzKSB7XG4gICAgICAgIGF0dHJpYnV0ZXMuZXhwaXJlcyA9IGF0dHJpYnV0ZXMuZXhwaXJlcy50b1VUQ1N0cmluZygpO1xuICAgICAgfVxuXG4gICAgICBuYW1lID0gZW5jb2RlVVJJQ29tcG9uZW50KG5hbWUpXG4gICAgICAgIC5yZXBsYWNlKC8lKDJbMzQ2Ql18NUV8NjB8N0MpL2csIGRlY29kZVVSSUNvbXBvbmVudClcbiAgICAgICAgLnJlcGxhY2UoL1soKV0vZywgZXNjYXBlKTtcblxuICAgICAgdmFyIHN0cmluZ2lmaWVkQXR0cmlidXRlcyA9ICcnO1xuICAgICAgZm9yICh2YXIgYXR0cmlidXRlTmFtZSBpbiBhdHRyaWJ1dGVzKSB7XG4gICAgICAgIGlmICghYXR0cmlidXRlc1thdHRyaWJ1dGVOYW1lXSkge1xuICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgIH1cblxuICAgICAgICBzdHJpbmdpZmllZEF0dHJpYnV0ZXMgKz0gJzsgJyArIGF0dHJpYnV0ZU5hbWU7XG5cbiAgICAgICAgaWYgKGF0dHJpYnV0ZXNbYXR0cmlidXRlTmFtZV0gPT09IHRydWUpIHtcbiAgICAgICAgICBjb250aW51ZVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gQ29uc2lkZXJzIFJGQyA2MjY1IHNlY3Rpb24gNS4yOlxuICAgICAgICAvLyAuLi5cbiAgICAgICAgLy8gMy4gIElmIHRoZSByZW1haW5pbmcgdW5wYXJzZWQtYXR0cmlidXRlcyBjb250YWlucyBhICV4M0IgKFwiO1wiKVxuICAgICAgICAvLyAgICAgY2hhcmFjdGVyOlxuICAgICAgICAvLyBDb25zdW1lIHRoZSBjaGFyYWN0ZXJzIG9mIHRoZSB1bnBhcnNlZC1hdHRyaWJ1dGVzIHVwIHRvLFxuICAgICAgICAvLyBub3QgaW5jbHVkaW5nLCB0aGUgZmlyc3QgJXgzQiAoXCI7XCIpIGNoYXJhY3Rlci5cbiAgICAgICAgLy8gLi4uXG4gICAgICAgIHN0cmluZ2lmaWVkQXR0cmlidXRlcyArPSAnPScgKyBhdHRyaWJ1dGVzW2F0dHJpYnV0ZU5hbWVdLnNwbGl0KCc7JylbMF07XG4gICAgICB9XG5cbiAgICAgIHJldHVybiAoZG9jdW1lbnQuY29va2llID1cbiAgICAgICAgbmFtZSArICc9JyArIGNvbnZlcnRlci53cml0ZSh2YWx1ZSwgbmFtZSkgKyBzdHJpbmdpZmllZEF0dHJpYnV0ZXMpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0IChuYW1lKSB7XG4gICAgICBpZiAodHlwZW9mIGRvY3VtZW50ID09PSAndW5kZWZpbmVkJyB8fCAoYXJndW1lbnRzLmxlbmd0aCAmJiAhbmFtZSkpIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIC8vIFRvIHByZXZlbnQgdGhlIGZvciBsb29wIGluIHRoZSBmaXJzdCBwbGFjZSBhc3NpZ24gYW4gZW1wdHkgYXJyYXlcbiAgICAgIC8vIGluIGNhc2UgdGhlcmUgYXJlIG5vIGNvb2tpZXMgYXQgYWxsLlxuICAgICAgdmFyIGNvb2tpZXMgPSBkb2N1bWVudC5jb29raWUgPyBkb2N1bWVudC5jb29raWUuc3BsaXQoJzsgJykgOiBbXTtcbiAgICAgIHZhciBqYXIgPSB7fTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY29va2llcy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgcGFydHMgPSBjb29raWVzW2ldLnNwbGl0KCc9Jyk7XG4gICAgICAgIHZhciB2YWx1ZSA9IHBhcnRzLnNsaWNlKDEpLmpvaW4oJz0nKTtcblxuICAgICAgICB0cnkge1xuICAgICAgICAgIHZhciBmb3VuZCA9IGRlY29kZVVSSUNvbXBvbmVudChwYXJ0c1swXSk7XG4gICAgICAgICAgamFyW2ZvdW5kXSA9IGNvbnZlcnRlci5yZWFkKHZhbHVlLCBmb3VuZCk7XG5cbiAgICAgICAgICBpZiAobmFtZSA9PT0gZm91bmQpIHtcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlKSB7fVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gbmFtZSA/IGphcltuYW1lXSA6IGphclxuICAgIH1cblxuICAgIHJldHVybiBPYmplY3QuY3JlYXRlKFxuICAgICAge1xuICAgICAgICBzZXQsXG4gICAgICAgIGdldCxcbiAgICAgICAgcmVtb3ZlOiBmdW5jdGlvbiAobmFtZSwgYXR0cmlidXRlcykge1xuICAgICAgICAgIHNldChcbiAgICAgICAgICAgIG5hbWUsXG4gICAgICAgICAgICAnJyxcbiAgICAgICAgICAgIGFzc2lnbih7fSwgYXR0cmlidXRlcywge1xuICAgICAgICAgICAgICBleHBpcmVzOiAtMVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICApO1xuICAgICAgICB9LFxuICAgICAgICB3aXRoQXR0cmlidXRlczogZnVuY3Rpb24gKGF0dHJpYnV0ZXMpIHtcbiAgICAgICAgICByZXR1cm4gaW5pdCh0aGlzLmNvbnZlcnRlciwgYXNzaWduKHt9LCB0aGlzLmF0dHJpYnV0ZXMsIGF0dHJpYnV0ZXMpKVxuICAgICAgICB9LFxuICAgICAgICB3aXRoQ29udmVydGVyOiBmdW5jdGlvbiAoY29udmVydGVyKSB7XG4gICAgICAgICAgcmV0dXJuIGluaXQoYXNzaWduKHt9LCB0aGlzLmNvbnZlcnRlciwgY29udmVydGVyKSwgdGhpcy5hdHRyaWJ1dGVzKVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBhdHRyaWJ1dGVzOiB7IHZhbHVlOiBPYmplY3QuZnJlZXplKGRlZmF1bHRBdHRyaWJ1dGVzKSB9LFxuICAgICAgICBjb252ZXJ0ZXI6IHsgdmFsdWU6IE9iamVjdC5mcmVlemUoY29udmVydGVyKSB9XG4gICAgICB9XG4gICAgKVxuICB9XG5cbiAgdmFyIGFwaSA9IGluaXQoZGVmYXVsdENvbnZlcnRlciwgeyBwYXRoOiAnLycgfSk7XG4gIC8qIGVzbGludC1lbmFibGUgbm8tdmFyICovXG5cbiAgcmV0dXJuIGFwaTtcblxufSkpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19jcmVhdGVCaW5kaW5nID0gKHRoaXMgJiYgdGhpcy5fX2NyZWF0ZUJpbmRpbmcpIHx8IChPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgICB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IobSwgayk7XG4gICAgaWYgKCFkZXNjIHx8IChcImdldFwiIGluIGRlc2MgPyAhbS5fX2VzTW9kdWxlIDogZGVzYy53cml0YWJsZSB8fCBkZXNjLmNvbmZpZ3VyYWJsZSkpIHtcbiAgICAgIGRlc2MgPSB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBtW2tdOyB9IH07XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBrMiwgZGVzYyk7XG59KSA6IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gICAgb1trMl0gPSBtW2tdO1xufSkpO1xudmFyIF9fc2V0TW9kdWxlRGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19zZXRNb2R1bGVEZWZhdWx0KSB8fCAoT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCB2KSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIFwiZGVmYXVsdFwiLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2IH0pO1xufSkgOiBmdW5jdGlvbihvLCB2KSB7XG4gICAgb1tcImRlZmF1bHRcIl0gPSB2O1xufSk7XG52YXIgX19pbXBvcnRTdGFyID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydFN0YXIpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xuICAgIHZhciByZXN1bHQgPSB7fTtcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoayAhPT0gXCJkZWZhdWx0XCIgJiYgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vZCwgaykpIF9fY3JlYXRlQmluZGluZyhyZXN1bHQsIG1vZCwgayk7XG4gICAgX19zZXRNb2R1bGVEZWZhdWx0KHJlc3VsdCwgbW9kKTtcbiAgICByZXR1cm4gcmVzdWx0O1xufTtcbi8vLyA8cmVmZXJlbmNlIHR5cGVzPSdqcXVlcnknLz5cbnZhciBDb29raWVzID0gX19pbXBvcnRTdGFyKHJlcXVpcmUoXCJqcy1jb29raWVcIikpO1xudmFyIHVuZGVmLCBteVJvb3QgPSB7IGRvY3VtZW50OiB7fSwgbmF2aWdhdG9yOiB7IHVzZXJBZ2VudDogJycgfSwgbG9jYXRpb246IHsgcHJvdG9jb2w6ICdmaWxlJywgaG9zdG5hbWU6ICcnIH0gfTtcbi8vIEVzdGFibGlzaCB0aGUgb2JqZWN0IHRoYXQgZ2V0cyByZXR1cm5lZCB0byBicmVhayBvdXQgb2YgYSBsb29wIGl0ZXJhdGlvbi5cbnZhciBicmVha2VyID0ge307XG4vKipcbiAqIGlmIG51bGwgcmV0dXJuIGRlZmF1bHQsIGVsc2UgcmV0dXJuIG9iamVjdFxuICpcbiAqIEBwYXJhbSAge2FueX0gb2JqXG4gKiBAcGFyYW0gIHthbnl9IGRlZmF1bHRWYWx1ZVxuICogQHJldHVybiB7YW55fVxuICovXG5mdW5jdGlvbiBpc051bGwob2JqLCBkZWZhdWx0VmFsdWUpIHtcbiAgICByZXR1cm4gKG9iaiA9PT0gbnVsbCB8fCBvYmogPT09IHVuZGVmIHx8IGlzTmFOKG9iaikpID8gZGVmYXVsdFZhbHVlIDogb2JqO1xufVxuaWYgKHR5cGVvZiAod2luZG93KSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBteVJvb3QgPSB3aW5kb3c7XG59XG4vKipcbiAqIEdldCBvYmplY3Qga2V5c1xuICpcbiAqIEB0eXBlIHtBcnJheTxzdHJpbmc+fVxuICovXG52YXIga2V5cyA9IGZ1bmN0aW9uIChvYmopIHtcbiAgICBpZiAoT2JqZWN0LmtleXMpIHtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKG9iaik7XG4gICAgfVxuICAgIGlmIChvYmogIT09IE9iamVjdChvYmopKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ludmFsaWQgb2JqZWN0Jyk7XG4gICAgfVxuICAgIHZhciBrZXlzID0gW10sIGtleTtcbiAgICBmb3IgKGtleSBpbiBvYmopIHtcbiAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGtleSkpXG4gICAgICAgICAgICBrZXlzLnB1c2goa2V5KTtcbiAgICB9XG4gICAgcmV0dXJuIGtleXM7XG59O1xudmFyIHVzZXJBZ2VudCA9IG15Um9vdC5uYXZpZ2F0b3IudXNlckFnZW50IHx8ICcnO1xuLyoqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gIHRydWUgaWYgaW50ZXJuZXQgZXhwbG9yZXJcbiAqL1xuZnVuY3Rpb24gZGV0ZWN0SWUoKSB7XG4gICAgdmFyIHVhID0gdXNlckFnZW50O1xuICAgIHZhciBtc2llID0gdWEuaW5kZXhPZignTVNJRSAnKTtcbiAgICB2YXIgdHJpZGVudCA9IHVhLmluZGV4T2YoJ1RyaWRlbnQvJyk7XG4gICAgdmFyIHJ2ID0gdWEuaW5kZXhPZigncnY6Jyk7XG4gICAgaWYgKG1zaWUgPiAwKSB7XG4gICAgICAgIC8vIElFIDEwIG9yIG9sZGVyID0+IHJldHVybiB2ZXJzaW9uIG51bWJlclxuICAgICAgICByZXR1cm4gcGFyc2VJbnQodWEuc3Vic3RyaW5nKG1zaWUgKyA1LCB1YS5pbmRleE9mKCcuJywgbXNpZSkpLCAxMCk7XG4gICAgfVxuICAgIGlmICh0cmlkZW50ID4gMCkge1xuICAgICAgICAvLyBJRSAxMSAob3IgbmV3ZXIpID0+IHJldHVybiB2ZXJzaW9uIG51bWJlclxuICAgICAgICByZXR1cm4gcGFyc2VJbnQodWEuc3Vic3RyaW5nKHJ2ICsgMywgdWEuaW5kZXhPZignLicsIHJ2KSksIDEwKTtcbiAgICB9XG4gICAgLy8gb3RoZXIgYnJvd3NlclxuICAgIHJldHVybiBmYWxzZTtcbn1cbi8vIERlZmluZWQgbmFtZXNwYWNlIEJyaWNrQ21zXG52YXIgQnJpY2tDbXMgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQnJpY2tDbXMoKSB7XG4gICAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgICAgdmFyIGhvc3RuYW1lID0gdGhhdC50cmltKG15Um9vdC5sb2NhdGlvbi5ob3N0bmFtZS50b0xvd2VyQ2FzZSgpKTtcbiAgICAgICAgdGhhdC5zaXRlID0geyBob3N0bmFtZTogaG9zdG5hbWUsIGRvbWFpbjogaG9zdG5hbWUucmVwbGFjZSgnd3d3LicsICcnKSwgY29uZmlnOiB7fSB9O1xuICAgICAgICB0aGF0LmJyb3dzZXIgPSB7XG4gICAgICAgICAgICBpc0lFOiBkZXRlY3RJZSgpLFxuICAgICAgICAgICAgaXNNb2JpbGU6IC9pUChob25lfG9kfGFkKXxBbmRyb2lkfEJsYWNrQmVycnl8SUVNb2JpbGV8S2luZGxlfE5ldEZyb250fFNpbGstQWNjZWxlcmF0ZWR8KGhwd3x3ZWIpT1N8RmVubmVjfE1pbmltb3xPcGVyYSBNKG9iaXxpbmkpfEJsYXplcnxEb2xmaW58RG9scGhpbnxTa3lmaXJlfFp1bmUvZ2kudGVzdCh1c2VyQWdlbnQpLFxuICAgICAgICAgICAgaXNBbmRyb2lkOiAvKGFuZHJvaWQpL2dpLnRlc3QodXNlckFnZW50KSxcbiAgICAgICAgICAgIGlzSU9TOiAvaVAoaG9uZXxvZHxhZCkvZ2kudGVzdCh1c2VyQWdlbnQpXG4gICAgICAgIH07XG4gICAgICAgIHRoYXQuY29va2llcyA9IENvb2tpZXM7XG4gICAgICAgIHRoYXQud2luID0gbXlSb290O1xuICAgICAgICB0aGF0LmRvYyA9IG15Um9vdC5kb2N1bWVudDtcbiAgICAgICAgdGhhdC5qcSA9IGpRdWVyeSB8fCAkO1xuICAgICAgICB0aGF0LmtleXMgPSBrZXlzO1xuICAgICAgICB0aGF0LmlzTnVsbCA9IGlzTnVsbDtcbiAgICAgICAgLy8gYmVnaW5cbiAgICAgICAgLy8gMS4gYXV0b21hdGljIGdlb2NvZGUgaXAgYWRkcmVzcyBhbmQgc3RvcmUgaXRcbiAgICAgICAgdGhpcy5qcS5nZXRKU09OKCdodHRwczovL2NkbjIuYnJpY2tpbmMubmV0L2dlb2lwbWUvP2J1c3Rlcj0nICsgKG5ldyBEYXRlKCkuZ2V0VGltZSgpKSwgZnVuY3Rpb24gKHJzdCkge1xuICAgICAgICAgICAgaWYgKHJzdC5sYXRpdHVkZSkge1xuICAgICAgICAgICAgICAgIHRoYXQubXlHZW8gPSByc3Q7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQnJpY2tDbXMucHJvdG90eXBlLCBcIm5hbWVcIiwge1xuICAgICAgICAvKipcbiAgICAgICAgICogZ2V0IHRoZSBuYW1lIG9mIHRoZSBsaWJyYXJ5XG4gICAgICAgICAqIEByZXR1cm4ge3N0cmluZ30gbGlicmFyeSBuYW1lXG4gICAgICAgICAqL1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9uYW1lO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgLyoqXG4gICAgICogdHJpbSBzdHJpbmdcbiAgICAgKlxuICAgICAqIEBwYXJhbSAge3N0cmluZ30gc3RyIHRoZSBzdHJpbmdcbiAgICAgKiBAcmV0dXJuIHtzdHJpbmd9ICAgICB0cmltbWVkIHJlc3VsdFxuICAgICAqL1xuICAgIEJyaWNrQ21zLnByb3RvdHlwZS50cmltID0gZnVuY3Rpb24gKHN0cikge1xuICAgICAgICByZXR1cm4gKHN0ci50cmltKSA/IHN0ci50cmltKCkgOiBzdHIucmVwbGFjZSgvXlxccyp8XFxzKiQvZywgJycpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogZ3JvdXAgYSBsaXN0IGJ5IHNvbWUga2V5IGF0dHJpYnV0ZVxuICAgICAqXG4gICAgICogQHBhcmFtIHtBcnJheTxhbnk+fSBsaXN0ICAgICAgbGlzdCBvciBhcnJheSBvZiBvYmplY3RzXG4gICAgICogQHBhcmFtIHtzdHJpbmd9ICAgICBhdHRyaWJ1dGUgb2JqZWN0IGtleSBwcm9wZXJ0eSBuYW1lXG4gICAgICogQHBhcmFtIHthbnkpICAgID0+ICAgICAgICB2b2lkfSAgICAgICAgcG9zdFByb2Nlc3NGdW5jdGlvbiBkbyBzb21ldGhpbmcgb24gZWFjaCBncm91cFxuICAgICAqIEByZXR1cm4ge0FycmF5PGFueT59ICAgICAgICAgICAgICAgICAgICAgIGdyb3VwIHJlc3VsdFxuICAgICAqL1xuICAgIEJyaWNrQ21zLnByb3RvdHlwZS5ncm91cEJ5ID0gZnVuY3Rpb24gKGxpc3QsIGF0dHJpYnV0ZSwgcG9zdFByb2Nlc3NGdW5jdGlvbikge1xuICAgICAgICBpZiAoaXNOdWxsKGxpc3QsIG51bGwpID09PSBudWxsKVxuICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICAvLyBGaXJzdCwgcmVzZXQgZGVjbGFyZSByZXN1bHQuXG4gICAgICAgIHZhciBncm91cHMgPSBbXSwgZ3JvdXBlciA9IHt9O1xuICAgICAgICAvLyB0aGlzIG1ha2Ugc3VyZSBhbGwgZWxlbWVudHMgYXJlIGNvcnJlY3RseSBzb3J0ZWRcbiAgICAgICAgbGlzdC5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICB2YXIgZ3JvdXBLZXkgPSBpdGVtW2F0dHJpYnV0ZV0sIGdyb3VwID0gZ3JvdXBlcltncm91cEtleV07XG4gICAgICAgICAgICBpZiAoaXNOdWxsKGdyb3VwLCBudWxsKSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGdyb3VwID0ge1xuICAgICAgICAgICAgICAgICAgICBrZXk6IGdyb3VwS2V5LFxuICAgICAgICAgICAgICAgICAgICBpdGVtczogW11cbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGdyb3VwZXJbZ3JvdXBLZXldID0gZ3JvdXA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBncm91cC5pdGVtcy5wdXNoKGl0ZW0pO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5qcS5lYWNoKGdyb3VwZXIsIGZ1bmN0aW9uIChpLCBteUdyb3VwKSB7XG4gICAgICAgICAgICBteUdyb3VwLiRpZHggPSBpO1xuICAgICAgICAgICAgZ3JvdXBzLnB1c2gobXlHcm91cCk7XG4gICAgICAgICAgICBpZiAocG9zdFByb2Nlc3NGdW5jdGlvbilcbiAgICAgICAgICAgICAgICBwb3N0UHJvY2Vzc0Z1bmN0aW9uKG15R3JvdXApO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHRoaXMuc29ydE9uKGdyb3VwcywgJ2tleScpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogZ2V0IGN1cnJlbnQgc3RvcmUgaWRcbiAgICAgKlxuICAgICAqIEByZXR1cm4ge3N0cmluZ30gdGhlIGN1cnJlbnQgc3RvcmUgaWRcbiAgICAgKi9cbiAgICBCcmlja0Ntcy5wcm90b3R5cGUubXlTdG9yZUlkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gQ29va2llcy5nZXQoJ215U3RvcmVJZCcpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogc2FmZWx5IGRlY29kZVVSSUNvbXBvbmVudCB0aGUgc3RyaW5nXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtzdHJpbmd9IHN0clxuICAgICAqIEByZXR1cm4ge3N0cmluZ30gICAgIGRlY29kZWQgc3RyaW5nXG4gICAgICovXG4gICAgQnJpY2tDbXMucHJvdG90eXBlLmRlY29kZSA9IGZ1bmN0aW9uIChzdHIpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJldHVybiBkZWNvZGVVUklDb21wb25lbnQoc3RyLnJlcGxhY2UoL1xcKy9nLCAnICcpKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgcmV0dXJuIHN0cjtcbiAgICAgICAgfVxuICAgIH07XG4gICAgLyoqXG4gICAgICogc2FmZWx5IGVuY29kZVVSSUNvbXBvbmVudCB0aGUgc3RyaW5nXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtzdHJpbmd9IHN0clxuICAgICAqIEByZXR1cm4ge3N0cmluZ30gICAgIGVuY29kZWQgc3RyaW5nXG4gICAgICovXG4gICAgQnJpY2tDbXMucHJvdG90eXBlLmVuY29kZSA9IGZ1bmN0aW9uIChzdHIpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJldHVybiBlbmNvZGVVUklDb21wb25lbnQoc3RyKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgcmV0dXJuIHN0cjtcbiAgICAgICAgfVxuICAgIH07XG4gICAgLyoqXG4gICAgICogc2x1Z2lmeSBhIHN0cmluZ1xuICAgICAqXG4gICAgICogQHBhcmFtICB7c3RyaW5nfSBzdHIgdGhlIHN0cmluZyB0byBzbHVnXG4gICAgICogQHJldHVybiB7c3RyaW5nfSAgICAgc2x1ZyByZXN1bHRcbiAgICAgKi9cbiAgICBCcmlja0Ntcy5wcm90b3R5cGUuc2x1Z2lmeSA9IGZ1bmN0aW9uIChzdHIpIHtcbiAgICAgICAgc3RyID0gc3RyIHx8ICcnO1xuICAgICAgICBpZiAoc3RyID09PSAnJylcbiAgICAgICAgICAgIHJldHVybiBzdHI7XG4gICAgICAgIHN0ciA9IHN0ci50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoL1teMC05YS16XFwtXFxfXSsvZ2ksICctJykucmVwbGFjZSgvW1xcLV0rL2dpLCAnLScpO1xuICAgICAgICByZXR1cm4gc3RyO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogaGVscGVyIG1ldGhvZCB0byBwYXJzZSBxdWVyeXN0cmluZyB0byBvYmplY3RcbiAgICAgKlxuICAgICAqIEBwYXJhbSAge3N0cmluZ30gcXN0ciB0aGUgcXVlcnlzdHJpbmdcbiAgICAgKiBAcmV0dXJuIHthbnl9ICAgICAgICAgcmVzdWx0IG9iamVjdFxuICAgICAqL1xuICAgIEJyaWNrQ21zLnByb3RvdHlwZS5xdWVyeVBhcnNlU3RyaW5nID0gZnVuY3Rpb24gKHFzdHIpIHtcbiAgICAgICAgcXN0ciA9IChxc3RyIHx8ICcnKS5yZXBsYWNlKCc/JywgJycpLnJlcGxhY2UoJyMnLCAnJyk7XG4gICAgICAgIHZhciBwYXR0ZXJuID0gLyhcXHcrKVxcWyhcXGQrKVxcXS87XG4gICAgICAgIHZhciBkZWNvZGUgPSB0aGlzLmRlY29kZSwgb2JqID0ge30sIGEgPSBxc3RyLnNwbGl0KCcmJyk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIHBhcnRzID0gYVtpXS5zcGxpdCgnPScpLCBrZXkgPSBkZWNvZGUocGFydHNbMF0pLCBtID0gcGF0dGVybi5leGVjKGtleSk7XG4gICAgICAgICAgICBpZiAobSkge1xuICAgICAgICAgICAgICAgIG9ialttWzFdXSA9IG9ialttWzFdXSB8fCBbXTtcbiAgICAgICAgICAgICAgICBvYmpbbVsxXV1bbVsyXV0gPSBkZWNvZGUocGFydHNbMV0pO1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb2JqW3BhcnRzWzBdXSA9IGRlY29kZShwYXJ0c1sxXSB8fCAnJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG9iajtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIHJldmVyc2Ugb2JqZWN0IHRvIHF1ZXJ5IHN0cmluZ1xuICAgICAqXG4gICAgICogcXVlcnlTdHJpbmdpZnkoeyBmb286IGJhciB9KTsgICAgICAgLy8gZm9vPWJhclxuICAgICAqIHF1ZXJ5U3RyaW5naWZ5KHsgZm9vOiBiYXIgfSwgdHJ1ZSk7IC8vID9mb289YmFyXG4gICAgICogcXVlcnlTdHJpbmdpZnkoeyBmb286IGJhciB9LCAnIycpOyAgLy8gI2Zvbz1iYXJcbiAgICAgKiBxdWVyeVN0cmluZ2lmeSh7IGZvbzogJycgfSwgJyYnKTsgICAvLyAmZm9vPVxuICAgICAqXG4gICAgICogQHBhcmFtICB7YW55fSAgICBvYmogICAgdGhlIG9iamVjdFxuICAgICAqIEBwYXJhbSAge3N0cmluZ30gcHJlZml4IG9wdGlvbmFsIHByZWZpeFxuICAgICAqIEByZXR1cm4ge3N0cmluZ31cbiAgICAgKi9cbiAgICBCcmlja0Ntcy5wcm90b3R5cGUucXVlcnlTdHJpbmdpZnkgPSBmdW5jdGlvbiAob2JqLCBwcmVmaXgpIHtcbiAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgICB2YXIgZW5jb2RlID0gdGhhdC5lbmNvZGU7XG4gICAgICAgIHZhciBzdHIgPSBbXSwgcDtcbiAgICAgICAgZm9yIChwIGluIG9iaikge1xuICAgICAgICAgICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShwKSkge1xuICAgICAgICAgICAgICAgIHZhciBrID0gcHJlZml4ID8gcHJlZml4ICsgJ1snICsgcCArICddJyA6IHAsIHYgPSBvYmpbcF07XG4gICAgICAgICAgICAgICAgc3RyLnB1c2goKHYgIT09IG51bGwgJiYgdHlwZW9mIHYgPT09ICdvYmplY3QnKSA/XG4gICAgICAgICAgICAgICAgICAgIHRoYXQucXVlcnlTdHJpbmdpZnkodiwgaykgOlxuICAgICAgICAgICAgICAgICAgICBlbmNvZGUoaykgKyAnPScgKyBlbmNvZGUodikpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzdHIuam9pbignJicpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogZ2V0IGRpc3RhbmNlIGJldHdlZW4gdHdvIHBvaW50c1xuICAgICAqXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGxhdGl0dWRlMVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBsb25naXR1ZGUxXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGxhdGl0dWRlMlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBsb25naXR1ZGUyXG4gICAgICogQHBhcmFtIHthbnl9ICAgIG9wdGlvbnNcbiAgICAgKi9cbiAgICBCcmlja0Ntcy5wcm90b3R5cGUuZ2VvRGlzdGFuY2UgPSBmdW5jdGlvbiAobGF0aXR1ZGUxLCBsb25naXR1ZGUxLCBsYXRpdHVkZTIsIGxvbmdpdHVkZTIsIG9wdGlvbnMpIHtcbiAgICAgICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgICAgIGZ1bmN0aW9uIHRvUmFkKG51bSkge1xuICAgICAgICAgICAgcmV0dXJuIG51bSAqIE1hdGguUEkgLyAxODA7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHN0YXJ0ID0geyBsYXRpdHVkZTogbGF0aXR1ZGUxLCBsb25naXR1ZGU6IGxvbmdpdHVkZTEgfTtcbiAgICAgICAgdmFyIGVuZCA9IHsgbGF0aXR1ZGU6IGxhdGl0dWRlMiwgbG9uZ2l0dWRlOiBsb25naXR1ZGUyIH07XG4gICAgICAgIHZhciByYWRpaSA9IHsga206IDYzNzEsIG1pbGU6IDM5NjAsIG1ldGVyOiA2MzcxMDAwLCBubWk6IDM0NDAgfTtcbiAgICAgICAgdmFyIFIgPSBvcHRpb25zLnVuaXQgaW4gcmFkaWkgPyByYWRpaVtvcHRpb25zLnVuaXRdIDogcmFkaWkua207XG4gICAgICAgIHZhciBkTGF0ID0gdG9SYWQoZW5kLmxhdGl0dWRlIC0gc3RhcnQubGF0aXR1ZGUpO1xuICAgICAgICB2YXIgZExvbiA9IHRvUmFkKGVuZC5sb25naXR1ZGUgLSBzdGFydC5sb25naXR1ZGUpO1xuICAgICAgICB2YXIgbGF0MSA9IHRvUmFkKHN0YXJ0LmxhdGl0dWRlKTtcbiAgICAgICAgdmFyIGxhdDIgPSB0b1JhZChlbmQubGF0aXR1ZGUpO1xuICAgICAgICB2YXIgYSA9IE1hdGguc2luKGRMYXQgLyAyKSAqIE1hdGguc2luKGRMYXQgLyAyKSArIE1hdGguc2luKGRMb24gLyAyKSAqIE1hdGguc2luKGRMb24gLyAyKSAqIE1hdGguY29zKGxhdDEpICogTWF0aC5jb3MobGF0Mik7XG4gICAgICAgIHZhciBjID0gMiAqIE1hdGguYXRhbjIoTWF0aC5zcXJ0KGEpLCBNYXRoLnNxcnQoMSAtIGEpKTtcbiAgICAgICAgaWYgKG9wdGlvbnMudGhyZXNob2xkKSB7XG4gICAgICAgICAgICByZXR1cm4gb3B0aW9ucy50aHJlc2hvbGQgPiAoUiAqIGMpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBSICogYztcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIHNvcnQgd2l0aCBuZWFyZXN0IGdlb3BvaW50LCBleHBlY3Qgb2JqZWN0IHdpdGggdHdvIHByb3BlcnRpZXM6IExhdGl0dWRlIGFuZCBMb25naXR1ZGVcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7QXJyYXk8YW55Pn0gcG9pbnRzXG4gICAgICogQHBhcmFtIHthbnl9ICAgICAgICBvcmlnaW5cbiAgICAgKiBAcGFyYW0ge2FueSkgICAgPT4gICAgIHZvaWR9ICAgICAgICBjYWxsYmFja1xuICAgICAqL1xuICAgIEJyaWNrQ21zLnByb3RvdHlwZS5nZW9PcmRlckJ5T3JpZ2luID0gZnVuY3Rpb24gKHBvaW50cywgb3JpZ2luLCBjYWxsYmFjaykge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgcmVzdWx0cyA9IFtdO1xuICAgICAgICBwb2ludHMuZm9yRWFjaChmdW5jdGlvbiAocG9pbnQpIHtcbiAgICAgICAgICAgIHZhciBkID0gX3RoaXMuZ2VvRGlzdGFuY2Uob3JpZ2luLmxhdGl0dWRlLCBvcmlnaW4ubG9uZ2l0dWRlLCBwb2ludC5sYXRpdHVkZSwgcG9pbnQubG9uZ2l0dWRlLCB7IHVuaXQ6ICdtaWxlJyB9KTtcbiAgICAgICAgICAgIHZhciBuZXdQb2ludCA9IHsgcG9pbnQ6IHBvaW50LCBkaXN0YW5jZTogZCB9O1xuICAgICAgICAgICAgcmVzdWx0cy5wdXNoKG5ld1BvaW50KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuc29ydE9uKHJlc3VsdHMsICdkaXN0YW5jZScpO1xuICAgICAgICBjYWxsYmFjayh7IG9yaWdpbjogb3JpZ2luLCByZXN1bHRzOiByZXN1bHRzIH0pO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogcHV0IHN0b3JlIHNlbGVjdGlvbiBpbiBjb29raWVcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzdG9yZUlkIHRoZSBzZWxlY3RlZCBzdG9yZSBpZFxuICAgICAqL1xuICAgIEJyaWNrQ21zLnByb3RvdHlwZS5zdG9yZVNlbGVjdCA9IGZ1bmN0aW9uIChzdG9yZUlkKSB7XG4gICAgICAgIENvb2tpZXMuc2V0KCdteVN0b3JlSWQnLCBzdG9yZUlkKTtcbiAgICAgICAgLy8gdHJpZ2dlciBldmVudCBzbyBjbGllbnQgY2FuIHJlbG9hZCBwYWdlLCBpZiByZXF1aXJlZFxuICAgICAgICB0aGlzLmpxKFwiaGVhZFwiKS50cmlnZ2VyKCdzdG9yZVNlbGVjdGVkJywgeyBzdG9yZTogc3RvcmVJZCB9KTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIHNvcnQgYSBsaXN0IG9mIG9iamVjdCBiYXNlIG9uIHNvbWUgcHJvcGVydHkgbmFtZVxuICAgICAqXG4gICAgICogQHBhcmFtIHtBcnJheTxhbnk+fSBjb2xsZWN0aW9uIGxpc3Qgb2Ygb2JqZWN0c1xuICAgICAqIEBwYXJhbSB7c3RyaW5nfSAgICAgbmFtZSAgICAgICBwcm9wZXJ0eSBuYW1lXG4gICAgICogQHJldHVybiB7YW55fSBzb3J0ZWQgbGlzdFxuICAgICAqL1xuICAgIEJyaWNrQ21zLnByb3RvdHlwZS5zb3J0T24gPSBmdW5jdGlvbiAoY29sbGVjdGlvbiwgbmFtZSkge1xuICAgICAgICBpZiAoIWNvbGxlY3Rpb24pXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgaWYgKGNvbGxlY3Rpb24ubGVuZ3RoIDw9IDApXG4gICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIC8vIGRldGVjdCBhdHRyaWJ1dGUgdHlwZSwgcHJvYmxlbSBpcyBpZiB5b3VyIGZpcnN0IG9iamVjdCBpcyBudWxsIG9yIG5vdCBzdHJpbmcgdGhlbiB0aGlzIGJyZWFrc1xuICAgICAgICBpZiAodHlwZW9mIChjb2xsZWN0aW9uWzBdW25hbWVdKSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIGNvbGxlY3Rpb24uc29ydChmdW5jdGlvbiAoYSwgYikge1xuICAgICAgICAgICAgICAgIGlmICgoYVtuYW1lXSAmJiBhW25hbWVdLnRvTG93ZXJDYXNlKCkpIDwgKGJbbmFtZV0gJiYgYltuYW1lXS50b0xvd2VyQ2FzZSgpKSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgICAgICAgICAgIGlmICgoYVtuYW1lXSAmJiBhW25hbWVdLnRvTG93ZXJDYXNlKCkpID4gKGJbbmFtZV0gJiYgYltuYW1lXS50b0xvd2VyQ2FzZSgpKSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbGxlY3Rpb24uc29ydChmdW5jdGlvbiAoYSwgYikge1xuICAgICAgICAgICAgICAgIGlmIChhW25hbWVdIDwgYltuYW1lXSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgICAgICAgICAgIGlmIChhW25hbWVdID4gYltuYW1lXSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY29sbGVjdGlvbjtcbiAgICB9O1xuICAgIHJldHVybiBCcmlja0Ntcztcbn0oKSk7XG5tb2R1bGUuZXhwb3J0cyA9IG5ldyBCcmlja0NtcygpO1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2JyaWNrY21zLnRzXCIpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9