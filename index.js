// index.js
'use strict'

const _merge = require('lodash/merge')
const File = require('./lib/file_resource')
const Image = require('./lib/image_resource')
const Resolver = require('./lib/resolver')

module.exports = class Resource {

  constructor (options) {

    this._setDefaults()
    this._mergeOptions(options)
    this._initResolver()

  }

  _mergeOptions (options) {
    _merge(this._options, options)
  }

  _setDefaults () {

    this.types = {
      i: 'image',
      f: 'file',
      v: 'video'
    }

    this._options = {
      key: 'someDefaultKey'
    }
    
  }

  _initResolver () {
    Resolver.setTypes(this.types)
  }

  resolve (path) {
    const resolver = new Resolver
    return resolver.resolve(path)
  }

  image () {
    return new Image(this._options)
  }

  video () {
    return new File({
      type: 'v',
      ...this._options
    })
  }
  
  file () {
    return new File({
      type: 'f',
      ...this._options
    })
  }

}