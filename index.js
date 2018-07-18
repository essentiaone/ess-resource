/*!
 * Resource
 *
 * MIT Licensed
 */
'use strict'
/*
 * Module dependencies.
 */
const _merge = require('lodash/merge')
const FileResource = require('./lib/file_resource')
const ImageResource = require('./lib/image_resource')
const Resolver = require('./lib/resolver')
/**
 * Class for wroking with resources and resolver
 * @class
 */
class Resource {
  /**
   * Resource class constructor.
   * @param {Object}
   * @constructor
   */
  constructor (options) {
    // set default options
    this._setDefaults()
    // merge with user options
    this._mergeOptions(options)
    // add default data to Resolver class
    this._initResolver()
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
   * Set default data to resource object.
   * @private
   */
  _setDefaults () {
    // available resources types
    this.types = {
      i: 'image',
      f: 'file',
      v: 'video'
    }
    // default options
    this._options = {
      key: 'someDefaultKey'
    }
  }
  /**
   * Set default data into resolver class
   * @private
   */
  _initResolver () {
    Resolver.setTypes(this.types)
  }
  /**
   * Parse path, resolve and get type with other parameters
   * @param {String} path
   * @returns {Resolver}
   * @public
   */
  resolve (path) {
    const resolver = new Resolver()
    return resolver.resolve(path)
  }
  /**
   * Create new ImageResource instance and return
   * @returns {ImageResource}
   * @public
   */
  image () {
    return new ImageResource(this._options)
  }
  /**
   * Create new FileResource instance with type video and return
   * @returns {ImageResource}
   * @public
   */
  video () {
    return new FileResource ({
      type: 'v',
      ...this._options
    })
  }
  /**
   * Create new FileResource instance with type file and return
   * @returns {FileResource}
   * @public
   */
  file () {
    return new FileResource ({
      type: 'f',
      ...this._options
    })
  }
}
// exporting class
module.exports = Resource
