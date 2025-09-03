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
var Cookies = __importStar(require("js-cookie"));
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
