const Resource = require('../index')

const testingData = {
  pathId: '5ab-s2e-fm4-s6g_9tmgc',
  key: 'mySecretKey',
  serverPath: 'https://myserver.dev/static',
  imageWidth: 240,
  imageHeight: 320,
  action: 'resize',
  iterations: 2,
  ext: 'jpg'
}

// Creating resource instance
const resource = new Resource({
  key: testingData.key,
  iterations: testingData.iterations
})

// Creating image resource
const image = resource.image()

// Filling image instance with testing data
const myImage = image
  // set image path id (required)
  .setPathId(testingData.pathId)
  // set image extension (required)
  .setExt(testingData.ext)
  // set server path (require for .getUrl() method)
  .setServerPath(testingData.serverPath)
  // set image size (for crop/resize options)
  .setWidth(testingData.imageWidth)
  .setHeight(testingData.imageHeight)
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

const isTestPassed = (
  isVerified &&
  resourceType === 'image' &&
  imageOptions.action === testingData.action &&
  imageOptions.width === testingData.imageWidth &&
  imageOptions.height === testingData.imageHeight
)

if (isTestPassed) {
  console.log('Test passed')
} else {
  console.error('Test failed')
}
