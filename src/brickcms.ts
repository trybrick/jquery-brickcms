/// <reference types='jquery'/>
import * as Cookies from 'js-cookie'

declare global {
  interface Window {
    $: JQueryStatic
    jQuery: JQueryStatic
  }

  interface Global {
    window: Window
    document: Document
    navigator: Navigator
  }
}

var undef: any,
 myRoot = { document: {}, navigator: { userAgent: '' }, location: { protocol: 'file', hostname: '' } }

// Establish the object that gets returned to break out of a loop iteration.
const breaker = {}

/**
 * if null return default, else return object
 *
 * @param  {any} obj
 * @param  {any} defaultValue
 * @return {any}
 */
function isNull(obj: any, defaultValue: any): any {
  return (obj === null || obj === undef || isNaN(obj)) ? defaultValue : obj
}

if (typeof (window) !== 'undefined') {
  myRoot = window
}

/**
 * Get object keys
 *
 * @type {Array<string>}
 */
const keys = (obj: any): Array<string> => {
  if (Object.keys) {
    return Object.keys(obj)
  }

  if (obj !== Object(obj)) {
    throw new TypeError('Invalid object')
  }

  var keys: Array<string> = [],
    key: any

  for (key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) keys.push(key)
  }

  return keys
}

const userAgent = myRoot.navigator.userAgent || ''

/**
 * @returns {boolean}  true if internet explorer
 */
function detectIe() {
  const ua: string = userAgent
  const msie: number = ua.indexOf('MSIE ');
  const trident: number = ua.indexOf('Trident/');
  const rv: number = ua.indexOf('rv:');

  if (msie > 0) {
    // IE 10 or older => return version number
    return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10)
  }

  if (trident > 0) {
    // IE 11 (or newer) => return version number
    return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10)
  }

  // other browser
  return false
}

// Defined namespace BrickCms
class BrickCms {
  private _name: string

  public cookies: any
  public win: any
  public doc: any
  public jq: JQueryStatic

  public myGeo: any
  public site: any

  public isNull: Function | undefined
  public keys: Function | undefined
  public uuid: Function | undefined

  constructor() {
    const that: any = this

    const hostname = that.trim(myRoot.location.hostname.toLowerCase())
    that.site = { hostname: hostname, domain: hostname.replace('www.', ''), config: {} }

    that.browser = {
      isIE: detectIe(),
      isMobile: /iP(hone|od|ad)|Android|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune/gi.test(userAgent),
      isAndroid: /(android)/gi.test(userAgent),
      isIOS: /iP(hone|od|ad)/gi.test(userAgent)
    }
    that.cookies = Cookies
    that.win = myRoot
    that.doc = myRoot.document
    that.jq  = jQuery || $

    that.keys = keys
    that.isNull = isNull

    // begin
    // 1. automatic geocode ip address and store it
    this.jq.getJSON('https://cdn2.brickinc.net/geoipme/?buster=' + (new Date().getTime()), (rst: any) => {
      if (rst.latitude) {
        that.myGeo = rst
      }
    })
  }

  /**
   * get the name of the library
   * @return {string} library name
   */
  get name() {
    return this._name;
  }

  /**
   * trim string
   *
   * @param  {string} str the string
   * @return {string}     trimmed result
   */
  trim(str: string): string {
    return (str.trim) ? str.trim() : str.replace(/^\s*|\s*$/g, '');
  }

  /**
   * group a list by some key attribute
   *
   * @param {Array<any>} list      list or array of objects
   * @param {string}     attribute object key property name
   * @param {any)    =>        void}        postProcessFunction do something on each group
   * @return {Array<any>}                      group result
   */
  groupBy(list: Array<any>, attribute: string, postProcessFunction: (rst:any) => void): Array<any> {
    if (isNull(list, null) === null) return []

    // First, reset declare result.
    const groups: Array<any> = [],
      grouper: any = {}

    // this make sure all elements are correctly sorted
    list.forEach((item: any) => {
      var groupKey: any = item[attribute],
        group: any = grouper[groupKey]

      if (isNull(group, null) === null) {
        group = {
          key: groupKey,
          items: []
        };
        grouper[groupKey] = group
      }
      group.items.push(item)
    });

    this.jq.each(grouper, (i: number, myGroup: any) => {
      myGroup.$idx = i
      groups.push(myGroup)

      if (postProcessFunction) postProcessFunction(myGroup)
    })

    return this.sortOn(groups, 'key')
  }

  /**
   * get current store id
   *
   * @return {string} the current store id
   */
  myStoreId(): string {
    return Cookies.get('myStoreId')
  }

  /**
   * safely decodeURIComponent the string
   *
   * @param  {string} str
   * @return {string}     decoded string
   */
  decode(str: string): string {
    try {
      return decodeURIComponent(str.replace(/\+/g, ' '))
    } catch (e) {
      return str
    }

  }

  /**
   * safely encodeURIComponent the string
   *
   * @param  {string} str
   * @return {string}     encoded string
   */
  encode(str: string): string {
    try {
      return encodeURIComponent(str)
    } catch (e) {
      return str
    }
  }

  /**
   * slugify a string
   *
   * @param  {string} str the string to slug
   * @return {string}     slug result
   */
  slugify(str) {
    str = str || '';
    if (str === '') return str;
    str = str.toLowerCase().replace(/[^0-9a-z\-\_]+/gi, '-').replace(/[\-]+/gi, '-');
    return str;
  }

  /**
   * helper method to parse querystring to object
   *
   * @param  {string} qstr the querystring
   * @return {any}         result object
   */
  queryParseString(qstr: string): any {
    qstr = (qstr || '').replace('?', '').replace('#', '')

    const pattern = /(\w+)\[(\d+)\]/
    const decode = this.decode,
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
  queryStringify(obj: any, prefix: string): string {
    const that   = this
    const encode = that.encode

    let str = [], p

    for (p in obj) {
      if (obj.hasOwnProperty(p)) {
        let k = prefix ? prefix + '[' + p + ']' : p, v = obj[p]

        str.push((v !== null && typeof v === 'object') ?
          that.queryStringify(v, k) :
          encode(k) + '=' + encode(v))
      }
    }

    return str.join('&')
  }

  /**
   * get distance between two points
   *
   * @param {number} latitude1
   * @param {number} longitude1
   * @param {number} latitude2
   * @param {number} longitude2
   * @param {any}    options
   */
  geoDistance(latitude1: number, longitude1: number, latitude2: number, longitude2: number, options:any) {
    options = options || {};

    function toRad(num: number) {
      return num * Math.PI / 180
    }

    const start: any = { latitude: latitude1, longitude: longitude1 }
    const end: any = { latitude: latitude2, longitude: longitude2 }
    const radii: any = { km: 6371, mile: 3960, meter: 6371000, nmi: 3440}
    const R: number = options.unit in radii ? radii[options.unit] : radii.km
    const dLat: number = toRad(end.latitude - start.latitude)
    const dLon: number = toRad(end.longitude - start.longitude)
    const lat1: number = toRad(start.latitude)
    const lat2: number = toRad(end.latitude)
    const a: number = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2)
    const c: number = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

    if (options.threshold) {
      return options.threshold > (R * c)
    }

    return R * c
  }

  /**
   * sort with nearest geopoint, expect object with two properties: Latitude and Longitude
   *
   * @param {Array<any>} points
   * @param {any}        origin
   * @param {any)    =>     void}        callback
   */
  geoOrderByOrigin(points: Array<any>, origin: any, callback: (rst:any) => void) {
    const results: Array<any> = []

    points.forEach((point) => {
      const d = this.geoDistance(origin.latitude, origin.longitude, point.latitude, point.longitude, { unit: 'mile' })
      const newPoint = { point: point, distance: d }

      results.push(newPoint)
    });

    this.sortOn(results, 'distance')
    callback({ origin: origin, results: results })
  }

  /**
   * put store selection in cookie
   *
   * @param {string} storeId the selected store id
   */
  storeSelect(storeId: string) {
    Cookies.set('myStoreId', storeId)

    // trigger event so client can reload page, if required
    this.jq("head").trigger('storeSelected', { store: storeId })
  }

  /**
   * sort a list of object base on some property name
   *
   * @param {Array<any>} collection list of objects
   * @param {string}     name       property name
   * @return {any} sorted list
   */
  sortOn(collection: Array<any>, name: string): any {
    if (! collection) return null
    if (collection.length <= 0) return []

    // detect attribute type, problem is if your first object is null or not string then this breaks
    if (typeof (collection[0][name]) === 'string') {
      collection.sort((a, b) => {
        if ((a[name] && a[name].toLowerCase()) < (b[name] && b[name].toLowerCase())) return -1
        if ((a[name] && a[name].toLowerCase()) > (b[name] && b[name].toLowerCase())) return 1
        return 0
      });
    } else {
      collection.sort((a, b) => {
        if (a[name] < b[name]) return -1
        if (a[name] > b[name]) return 1
        return 0
      });
    }

    return collection
  }
}

export = new BrickCms()
