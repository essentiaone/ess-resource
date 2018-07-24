ess-resource-library
========

## Environments

- Browsers (ES6)
- node.js (>=8)
- io.js (>=3)


## Usage

This library used both on storage side and your server side for building, parsing and verifying your urls. Urls are generated based on your `pathId`s

```javascript

// import library
const Resource = require('ess-resource-library')

// new Resource instance
const resource = new Resource({
  // secret key to hashing
  key: 'yourSecretKey'
})

// create Image instance
const image = resource.image()

// generate image path
const myImagePath = image.
  // set image path id (required)
  setPathId('xxx-xxx-xxx-xxx_xxxxx').
  // set image extension (required)
  setExt('png').
  // set server path (require for .getUrl() method)
  setServerPath('https://myserver.dev/static').
  // set image size (for crop/resize options)
  setWidth(240).
  setHeight(320).
  // crop
  // read about gravity, and other details: https://github.com/rsms/node-imagemagick#cropoptions-callback
  crop('NorthWest').
  // getting path
  getPath()

// parse image path
const pathData = resource.resolve(myImagePath)

// get resource type
const resourceType = pathData.resourceType

// verify path data
const isVerified = image.verifyPathData(pathData)

// get image options from path
const imageOptions = image.parseOptionsPath(pathData.optionsPath)

```