var BrickCms;
(function (BrickCms) {
    var jQuery = window.jQuery || window.$;
    var Cookies = window.Cookies;
    function doGeoIP(jsonpUrl, callback) {
        callback({ latitude: 1, longitude: 1 });
    }
    BrickCms.myProperty = "Hello, world!";
    function myStoreId() {
        return Cookies.get('myStoreId');
    }
    function decode(str) {
        try {
            return decodeURIComponent(str.replace(/\+/g, ' '));
        }
        catch (e) {
            return str;
        }
    }
    BrickCms.decode = decode;
    function encode(str) {
        try {
            return encodeURIComponent(str);
        }
        catch (e) {
            return str;
        }
    }
    BrickCms.encode = encode;
    function queryParseString(qstr) {
        qstr = (qstr || '').replace('?', '').replace('#', '');
        var pattern = /(\w+)\[(\d+)\]/;
        var decode = BrickCms.decode, obj = {}, a = qstr.split('&');
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
    }
    BrickCms.queryParseString = queryParseString;
    function queryStringify(obj, prefix) {
        var encode = BrickCms.encode;
        var str = [], p;
        for (p in obj) {
            if (obj.hasOwnProperty(p)) {
                var k = prefix ? prefix + '[' + p + ']' : p, v = obj[p];
                str.push((v !== null && typeof v === 'object') ?
                    BrickCms.queryStringify(v, k) :
                    encode(k) + '=' + encode(v));
            }
        }
        return str.join('&');
    }
    BrickCms.queryStringify = queryStringify;
    function geoDistance(latitude1, longitude1, latitude2, longitude2, options) {
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
    }
    BrickCms.geoDistance = geoDistance;
    function geoOrderByOrigin(points, origin, callback) {
        var results = [];
        points.forEach(function (point) {
            var d = BrickCms.geoDistance(origin.Latitude, origin.Longitude, point.Latitude, point.Longitude, { unit: 'mile' });
            var newPoint = { point: point, distance: d };
            results.push(newPoint);
        });
        BrickCms.sortOn(results, 'distance');
        callback({ origin: origin, results: results });
    }
    BrickCms.geoOrderByOrigin = geoOrderByOrigin;
    function sortOn(collection, name) {
        if (!collection)
            return null;
        if (collection.length <= 0)
            return [];
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
    }
    BrickCms.sortOn = sortOn;
    function storeSelect(storeId) {
        Cookies.set('myStoreId', storeId);
    }
    BrickCms.storeSelect = storeSelect;
    function load() {
        jQuery.getJSON('https://cdn2.brickinc.net/geoipme/?buster=' + (new Date().getTime()), function (rst) {
            BrickCms.myGeo = rst;
            debugger;
        });
    }
    BrickCms.load = load;
})(BrickCms || (BrickCms = {}));
//# sourceMappingURL=brickcms.js.map