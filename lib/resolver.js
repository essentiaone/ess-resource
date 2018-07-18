/*!
 * Resolver
 *
 * MIT Licensed
 */
'use strict'
/**
 * Class for parse path and get path data.
  * @class
 */
class Resolver {
  /**
   * Resolver class constructor.
   * @constructor
   */
  constructor () {
    // set default options
    this._setDefaults()
  }
  /**
   * Set resource types and appropriate characters to resource class.
   * This data will be used in all instances.
   * @param {Object} types
   * @static
   * @public
   */
  static setTypes (types) {
    Resolver.types = types
  }
  /**
   * Set default data to resource object.
   * @private
   */
  _setDefaults () {
    this.ext = null
    this.filename = null
    this.optionsPath = null
    this.resourceType = null
    this.pathId = null
  }
  /**
   * Parse path with options and get all available parameters
   * Resource type is required to get.
   * @param {String} optionsPath
   * @private
   */
  _parseOptions (optionsPath) {
    const resourceType = optionsPath.split('-')[0]
    // if resource type not found - throw error
    if (!resourceType || !Resolver.types[resourceType]) {
      throw new Error('Unresolved resource type')
    }
    this.resourceType = Resolver.types[resourceType]
    this.optionsPath = optionsPath
  }
  /**
   * Split filename to name and extension, and set it into resource object
   * @param {String} name
   * @private
   */
  _parseName (name) {
    const parts = name.split('.')
    this.filename = parts[0]
    this.ext = parts[1]
  }
  /**
   * Parse url and get all available data.
   * Set data into the object and return
   * @param {String} path
   * @returns {Resolver}
   * @public
   */
  resolve (path) {
    // split path to parts
    const parts = path.split('/')
    try {
      // get filename part from path and remove
      this._parseName(parts.pop())
      // get options part from path and remove
      this._parseOptions(parts.pop())
      // parse other parts as pathId
      this.pathId = parts.join('-')
    } catch (err) {
      throw new Error('Unresolved path')
    }
    return this
  }
}
// exporting class
module.exports = Resolver
