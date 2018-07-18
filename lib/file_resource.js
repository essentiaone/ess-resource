/*!
 * File Resource
 *
 * MIT Licensed
 */
'use strict'
/*
 * Module dependencies.
 */
const Hashes = require('jshashes')
const _merge = require('lodash/merge')
/**
 * Building, parsing and verifying urls based on pathId.
 * @class
 */
class FileResource {
  /**
   * File Resource constructor.
   * @param {Object} options
   * @constructor
   */
  constructor (options) {
    // set default options
    this._setDefaults()
    // merge with user options
    this._mergeOptions(options)
  }
  /**
   * Merge options with default object options.
   * @param {Object} options
   * @private
   */
  _mergeOptions (options) {
    _merge(this._options, options)
  }
  /**
   * Set default options and other default data in object.
   * @private
   */
  _setDefaults () {
    // set default options
    this._options = {
      // resource type
      type: 'f',
      // user secret key
      key: 'someRandomString',
      // quantity of iterations while hashing
      iterations: 3
    }
    // set string alphabet based on 36 numeral system
    this._alphabet = this._string36ToAlphabet()
    // set hashing function
    this._initMd5()
    // file data
    this.ext = null
    this.pathId = null
    this.serverPath = null
    this.url = null
    this.path = null
  }
  /**
   * Set function to quick hash generation based on jshashes library.
   * @private
   */
  _initMd5 () {
    const MD5 = new Hashes.MD5()
    // set needed md5 function
    this.md5 = MD5.any_hmac
  }
  /**
   * Return string alphabet based on 36 numeral system.
   * @returns {String}
   * @private
   */
  _string36ToAlphabet () {
    let alphabet = ''
    for (let i = 0; i < 36; i++) {
      alphabet += i.toString(36)
    }
    return alphabet
  }
  /**
   * Set pathId into object.
   * @param {String} pathId
   * @returns {FileResource}
   * @public
   */
  setPathId (pathId) {
    this.pathId = pathId
    return this
  }
  /**
   * Set file extension into object.
   * @param {String} ext
   * @returns {FileResource}
   * @public
   */
  setExt (ext) {
    this.ext = ext
    return this
  }
  /**
   * Set server domain with static path into object.
   * @param {String} serverPath
   * @returns {FileResource}
   * @public
   */
  setServerPath (serverPath) {
    this.serverPath = serverPath
    return this
  }
  /**
   * Checking if is enough parameters to generate an url or path.
   * @private
   */
  _checkRequirements () {
    if (!this.ext) throw new Error('Extension is not specified')
    if (!this.pathId) throw new Error('PathId is not specified')
  }
  /**
   * Generate part of the url with resource options.
   * As default only resource type.
   * @returns {String}
   * @private
   */
  _generateOptionsPath () {
    return this._options.type
  }
  /**
   * Generate full path with file name and extension.
   * Set path and url parameters into object.
   * @private
   */
  _generatePath () {
    // checking if is all required parameters
    this._checkRequirements()
    // build part of url, based on nested folders
    const folderPath = this._pathIdToPath()
    // build part of url, based on file options
    const optionsPath = this._generateOptionsPath()
    // generate filename hash based url parameters
    const filename = this._generateName(this.pathId, optionsPath, this.ext)
    // set path
    this.path = folderPath + '/' + optionsPath + '/' + filename + '.' + this.ext
    // set url if exists server path or null if not exists
    this.url = this.serverPath ? this.serverPath + '/' + this.path : null
  }
  /**
   * Generate filename hash based on file parameters and encrypted with user key.
   * @param {String} pathId
   * @param {String} optionsPath
   * @param {String} ext
   * @returns {String}
   * @private
   */
  _generateName (pathId, optionsPath, ext) {
    // quantity of iterations
    const iterations = this._options.iterations
    // get string that will be hashed
    let hashingString = pathId + '/' + optionsPath + '/' + ext
    // hashing with quantity of iterations
    for (let i = 0; i < iterations; i++) {
      hashingString = this.md5(this._options.key, hashingString, this._alphabet)
    }
    return hashingString
  }
  /**
   * Get pathId from object and return it converted to path.
   * @returns {String}
   * @private
   */
  _pathIdToPath () {
    return this.pathId.split('-').join('/')
  }
  /**
   * Generate and return file url.
   * @returns {String}
   * @public
   */
  getUrl () {
    this._generatePath()
    return this.url
  }
  /**
   * Generate and return file path.
   * @returns {String}
   * @public
   */
  getPath () {
    this._generatePath()
    return this.path
  }
  /**
   * Parse encoded part of url with options and return object.
   * Return empty object as default, but can be oberrided in children class.
   * @param {String} optionsPath
   * @returns {Object}
   * @public
   */
  parseOptionsPath (optionsPath) {
    return {}
  }
  /**
   * Verify if parsed data is compatible with user key and valid.
   * @param {Object} pathData
   * @returns {Boolean}
   * @public
   */
  verifyPathData (pathData) {
    // generate filename hash with input data
    const filename = this._generateName(pathData['pathId'], pathData['optionsPath'], pathData['ext'])
    // comparing hashes
    return pathData.filename === filename
  }
}
// exporting class
module.exports = FileResource
