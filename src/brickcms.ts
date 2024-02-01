// Defined namespace BrickCms
module BrickCms {
  // @ts-ignore
  const jQuery = window.jQuery || window.$

  // @ts-ignore
  const Cookies = window.Cookies

  function doGeoIP(jsonpUrl:string, callback: (rst:any) => void) {
    // this.jsonp(jsonpUrl || '//freegeoip.net/json/', callback);
    callback({latitude: 1, longitude: 1})
  }

  // Defined interface config for plugin
  export const myProperty: string = "Hello, world!"

  export var myGeo: any

  function myStoreId(): string {
    // @ts-ignore
    return Cookies.get('myStoreId');
  }

  export function decode(str: string): string {
    try {
      return decodeURIComponent(str.replace(/\+/g, ' '));
    } catch (e) {
      return str;
    }
  }

  export function encode(str: string): string {
    try {
      return encodeURIComponent(str);
    } catch (e) {
      return str;
    }
  }

  export function queryParseString(qstr: string): any {
    qstr = (qstr || '').replace('?', '').replace('#', '')

    const pattern = /(\w+)\[(\d+)\]/
    const decode = BrickCms.decode,
      obj: any = {},
      a = qstr.split('&')

    for (let i = 0; i < a.length; i++) {
      let parts = a[i].split('='),
        key = decode(parts[0]),
        m = pattern.exec(key)

      if (m) {
        obj[m[1]] = obj[m[1]] || []
        obj[m[1]][m[2]] = decode(parts[1])
        continue
      }

      obj[parts[0]] = decode(parts[1] || '')
    }

    return obj
  }

  export function queryStringify(obj: any, prefix: string): string {
    const encode = BrickCms.encode

    let str = [], p

    for (p in obj) {
      if (obj.hasOwnProperty(p)) {
        let k = prefix ? prefix + '[' + p + ']' : p, v = obj[p]

        str.push((v !== null && typeof v === 'object') ?
          BrickCms.queryStringify(v, k) :
          encode(k) + '=' + encode(v))
      }
    }

    return str.join('&')
  }

  export function geoDistance(latitude1: number, longitude1: number, latitude2: number, longitude2: number, options:any) {
    options = options || {};

    function toRad(num: number) {
      return num * Math.PI / 180;
    }

    const start: any = { latitude: latitude1, longitude: longitude1 };
    const end: any = { latitude: latitude2, longitude: longitude2 };
    const radii: any = { km: 6371, mile: 3960, meter: 6371000, nmi: 3440};
    const R: number = options.unit in radii ? radii[options.unit] : radii.km;
    const dLat: number = toRad(end.latitude - start.latitude);
    const dLon: number = toRad(end.longitude - start.longitude);
    const lat1: number = toRad(start.latitude);
    const lat2: number = toRad(end.latitude) ;
    const a: number = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c: number = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    if (options.threshold) {
      return options.threshold > (R * c);
    }

    return R * c;
  }

  export function geoOrderByOrigin(points: Array<any>, origin: any, callback: any) {
    const results: Array<any> = [];

    points.forEach((point) => {
      const d = BrickCms.geoDistance(origin.Latitude, origin.Longitude, point.Latitude, point.Longitude, { unit: 'mile' });
      const newPoint = { point: point, distance: d };

      results.push(newPoint);
    });

    BrickCms.sortOn(results, 'distance');
    callback({origin: origin, results: results });
  }

  export function sortOn(collection: Array<any>, name: string) {
    if (! collection) return null;
    if (collection.length <= 0) return [];

    // detect attribute type, problem is if your first object is null or not string then this breaks
    if (typeof (collection[0][name]) === 'string') {
      collection.sort((a, b) => {
        if ((a[name] && a[name].toLowerCase()) < (b[name] && b[name].toLowerCase())) return -1;
        if ((a[name] && a[name].toLowerCase()) > (b[name] && b[name].toLowerCase())) return 1;
        return 0;
      });
    } else {
      collection.sort((a, b) => {
        if (a[name] < b[name]) return -1;
        if (a[name] > b[name]) return 1;
        return 0;
      });
    }

    return collection;
  }

  export function storeSelect(storeId: string) {
    // @ts-ignore
    Cookies.set('myStoreId', storeId);
  }

  export function load() {
    // do loading
    // 1. automatic geocode ip address and store it on $brx.myGeo
    jQuery.getJSON('https://cdn2.brickinc.net/geoipme/?buster=' + (new Date().getTime()), (rst:any) => {
      BrickCms.myGeo = rst;
      debugger;
    })
  }
}
