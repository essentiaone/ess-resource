/*!
 * Image Resource
 *
 * MIT Licensed
 */
'use strict'
/*
 * Module dependencies.
 */
const FileResource = require('./file_resource')
/**
 * Building, parsing and verifying urls based on pathId.
 * Specialized class for working with images.
 * @class
 */
class ImageResource extends FileResource {
  /**
   * Image Resource constructor.
   * @param {Object} options
   * @constructor
   */
  constructor (options) {
    // force set type to 'i' for Image Resource class
    options = {...options, type: 'i'}
    // call parent constructor
    super(options)
    // extend default parameters, setted with parent
    this._extendDefaults()
  }
  /**
   * Set default options specified to Image Resource.
   * @private
   */
  _extendDefaults () {
    // available methods to processing images
    this._functions = {
      original: 'o',
      resize: 'r',
      // crop options
      cropNorthWest: 'cnw',
      cropNorth: 'cn',
      cropNorthEast: 'cne',
      cropWest: 'cw',
      cropCenter: 'cc',
      cropEast: 'ce',
      cropSouthWest: 'csw',
      cropSouth: 'cs',
      cropSouthEast: 'cse'

    }
    // processing image options
    this.height = null
    this.width = null
    this.action = 'original'
  }
  /**
   * Set image width to processing image.
   * @param {String} width
   * @returns {ImageResource}
   * @public
   */
  setWidth (width) {
    this.width = width
    return this
  }
  /**
   * Set image height to processing image.
   * @param {String} height
   * @returns {ImageResource}
   * @public
   */
  setHeight (height) {
    this.height = height
    return this
  }
  /**
   * Set image size to processing image.
   * Set width and height.
   * @param {String} width
   * @param {String} height
   * @returns {ImageResource}
   * @public
   */
  setSize (width, height) {
    this.width = width
    this.height = height
    return this
  }
  /**
   * Set resize action to processing image.
   * @returns {ImageResource}
   * @public
   */
  resize () {
    this.action = 'resize'
    return this
  }
  /**
   * Set crop action to processing image.
   * @param {String} gravity
   * @returns {ImageResource}
   * @public
   */
  crop (gravity) {
    // default gravity
    if (!gravity) {
      gravity = 'Center'
    }
    // action name
    const action = `crop${gravity}`
    // check if action is valid
    if (!this._functions[this.action]) {
      throw new Error(`Gravity ${gravity} is invalid`)
    }
    // set
    this.action = action
    return this
  }
  /**
   * Checking if is enough parameters to generate an url or path.
   * By default call parent method, but can be expanded.
   * @private
   */
  _checkRequirements () {
    // call parent _checkRequirements
    super._checkRequirements()
  }
  /**
   * Generate part of the url with resource options.
   * Includes all parameters, needed to processing images, and encode it.
   * @returns {String}
   * @private
   */
  _generateOptionsPath () {
    // width to 36 numeral system
    const stringWidth = this.width ? Number(this.width).toString(36) : '0'
    // height to 36 numeral system
    const stringHeight = this.height ? Number(this.height).toString(36) : '0'
    // action to appropriate characetr
    const stringAction = this._functions[this.action]
    return this._options.type + '-' + stringAction + '-' + stringWidth + '-' + stringHeight
  }
  /**
   * Getting action by appropriate character.
   * @param {String} character
   * @returns {String}
   * @private
   */
  _getActionByCharacter (character) {
    let action
    for (action in this._functions) {
      if (this._functions[action] === character) {
        break
      }
      action = null
    }
    return action
  }
  /**
   * Parse part of the url with resource options and decode.
   * Get all parameters, needed to processing images, and decode it.
   * @returns {Object}
   * @public
   */
  parseOptionsPath (optionsPath) {
    // split path to encoded parameters
    const parts = optionsPath.split('-')
    return {
      action: this._getActionByCharacter(parts[1]),
      width: parseInt(parts[2], '36'),
      height: parseInt(parts[3], '36')
    }
  }
}
// exporting class
module.exports = ImageResource
