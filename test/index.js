const Resource = require('../index')

// input parameters to testing
const inputParameters = {
  pathId: '5ab-s2e-fm4-s6g_9tmgc',
  key: 'mySecretKey',
  serverPath: 'https://myserver.dev/static',
  imageWidth: 240,
  imageHeight: 320,
  action: 'resize',
  iterations: 2,
  ext: 'jpg'
}

// expected parameters when finish test
const expectedParameters = {
  isVerified: true,
  resourceType: 'image',
  action: inputParameters.action,
  imageWidth: inputParameters.imageWidth,
  imageHeight: inputParameters.imageHeight
}

// Creating resource instance
const resource = new Resource({
  key: inputParameters.key,
  iterations: inputParameters.iterations
})

// Creating image resource
const image = resource.image()

// Filling image instance with testing data
const myImage = image
  // set image path id (required)
  .setPathId(inputParameters.pathId)
  // set image extension (required)
  .setExt(inputParameters.ext)
  // set server path (require for .getUrl() method)
  .setServerPath(inputParameters.serverPath)
  // set image size (for crop/resize options)
  .setWidth(inputParameters.imageWidth)
  .setHeight(inputParameters.imageHeight)
  // crop/resize
  .resize()

// Getting image path
const myImagePath = myImage.getPath()

// Parsing image path
const pathData = resource.resolve(myImagePath)

// Getting resource type
const resourceType = pathData.resourceType

// Verifying path data
const isVerified = image.verifyPathData(pathData)

// Getting image options
const imageOptions = image.parseOptionsPath(pathData.optionsPath)

let isTestPassed = true

if (isVerified !== expectedParameters.isVerified) {
  isTestPassed = false
  console.error('Verification failed')
}

if (resourceType !== expectedParameters.resourceType) {
  isTestPassed = false
  console.error('Resource type is invalid')
}

if (imageOptions.width !== expectedParameters.imageWidth) {
  isTestPassed = false
  console.error('Width does not match')
}

if (imageOptions.height !== expectedParameters.imageHeight) {
  isTestPassed = false
  console.error('Height does not match')
}

if (imageOptions.action !== expectedParameters.action) {
  isTestPassed = false
  console.error('Action does not match')
}

if (isTestPassed) {
  console.log('Test passed')
} else {
  console.error('Test failed')
}
