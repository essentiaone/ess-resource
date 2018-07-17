// resolver.js

module.exports = class Resolver {

  constructor () {
    this._setDefaults()
  }

  static setTypes(types) {
    Resolver.types = types
  }

  _setDefaults () {

    this.ext = null
    this.filename = null
    this.optionsPath = null
    this.resourceType = null
    this.pathId = null

  }
 
  _parseOptions (optionsPath) {

    const resourceType = optionsPath.split('-')[0]

    if (!resourceType || !Resolver.types[resourceType]) {
      throw 'Unresolved resource type'
    }
    this.resourceType = Resolver.types[resourceType]
    this.optionsPath = optionsPath 

  }

  _parseName (name) {
    const parts = name.split('.')
    this.filename = parts[0]
    this.ext = parts[1]
  }

  resolve (path) {

    const parts = path.split('/')

    try {
      this._parseName(parts.pop())
      this._parseOptions(parts.pop())
      this.pathId = parts.join('-')
    } catch (err) {
      throw 'Unresolved path'
    }

    return this

  }

}