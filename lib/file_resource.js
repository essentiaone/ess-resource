// file_resource.js
'use strict'

const Hashes = require('jshashes')
const _merge = require('lodash/merge')

module.exports = class FileResource {

  constructor (options) {
    
    this._setDefaults()
    this._mergeOptions(options)

  }

  _mergeOptions (options) {
    _merge(this._options, options)
  }

  _setDefaults () {

    this._options = {
      type: 'f',
      key: 'someRandomString',
      iterations: 3
    }

    this._alphabet = this._string36ToAlphabet()
    this._initMd5()

    this.ext = null
    this.pathId = null
    this.serverPath = null

    this.url = null
    this.path = null

  }

  _initMd5 () {
    const MD5 = new Hashes.MD5
    this.md5 = MD5.any_hmac
  }

  _string36ToAlphabet () {
    let alphabet = ''
    for (let i=0; i<36; i++) {
      alphabet += i.toString(36)
    }
    return alphabet
  }

  setPathId (pathId) {
    this.pathId = pathId
    return this
  }

  setExt (ext) {
    this.ext = ext
    return this
  }

  setServerPath (serverPath) {
    this.serverPath = serverPath
    return this
  }

  _checkRequirements () {
    if (!this.ext) throw 'Extension is not specified'
    if (!this.pathId) throw 'PathId is not specified'
  }

  _generateOptionsPath () {
    return this._options.type
  }

  _generatePath () {

    this._checkRequirements()

    const folderPath = this._pathIdToPath()
    const optionsPath = this._generateOptionsPath()
    const filename = this._generateName(this.pathId, optionsPath, this.ext)
    
    this.path = folderPath + '/' + optionsPath + '/' + filename + '.' + this.ext
    this.url = this.serverPath ? this.serverPath + '/' + this.path : null
  }

  _generateName (pathId, optionsPath, ext) {
    const iterations = this._options.iterations
    let hashingString = pathId + '/' + optionsPath + '/' + ext

    for (let i=0; i<iterations; i++) {
      hashingString = this.md5(this._options.key, hashingString, this._alphabet)
    }

    return hashingString
  }

  _pathIdToPath () {
    return this.pathId.split('-').join('/')
  }

  getUrl () {
    this._generatePath()
    return this.url
  }

  getPath () {
    this._generatePath()
    return this.path
  }

  parseOptionsPath (optionsPath) {
    return {}
  }

  verifyPathData (pathData) {
    const filename = this._generateName(pathData['pathId'], pathData['optionsPath'], pathData['ext'])
    return pathData.filename === filename
  }

}