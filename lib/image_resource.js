// image_resource.js
'use strict'

const FileResource = require('./file_resource')

module.exports = class ImageResource extends FileResource {

  constructor (options) {

    options = {...options, type: 'i'}
    super(options)
    this._extendDefaults()

  }

  _extendDefaults () {

    this._functions = {
      original: 'o',
      resize: 'r',
      crop: 'c'
    }

    this.height = null
    this.width = null
    this.action = 'original'

  }

  setWidth (width) {
    this.width = width
    return this
  }

  setHeight (height) {
    this.height = height
    return this
  }

  setSize (width, height) {
    this.width = width
    this.height = height
    return this
  }

  resize () {
    this.action = 'resize'
    return this
  }

  crop () {
    this.action = 'crop'
    return this
  }

  _checkRequirements () {
    super._checkRequirements()
  }

  _generateOptionsPath () {
    const stringWidth = this.width ? Number(this.width).toString(36) : '0'
    const stringHeight = this.height ? Number(this.height).toString(36) : '0'
    const stringAction = this._functions[this.action]
    return this._options.type + '-' + stringAction + '-' + stringHeight + '-' + stringWidth
  }

  parseOptionsPath (optionsPath) {

    const parts = optionsPath.split('-')

    let action

    for (action in this._functions) {
      if (this._functions[action] == parts[1]) {
        break;
      }
      action = null
    }

    return {
      action: action,
      width: parseInt(parts[2], '36'),
      height: parseInt(parts[3], '36')
    }
  }

}