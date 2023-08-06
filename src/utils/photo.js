import fs from 'fs'
import gm from 'gm'
import nanoid from 'nanoid'
import path from 'path'

const cloudinary = require('cloudinary').v2

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export function uploadPhoto(
  createReadStream,
  filename,
  { width, height, x, y }
) {
  const stream = createReadStream()
  const id = nanoid(10)
  const dev = process.env.NODE_ENV === 'development'
  const filePath = dev
    ? path.join(__dirname, '..', 'uploads', `${id}.jpg`)
    : path.join(__dirname, '..', '..', '..', 'uploads', `${id}.jpg`)

  // cloudinary.image(filePath, { x, y, width, height, crop: 'crop' })

  return new Promise((resolve, reject) =>
    stream
      .on('error', error => {
        if (stream.truncated) {
          fs.unlinkSync(filePath)
        }
        reject(error)
      })
      .pipe(fs.createWriteStream(filePath))
      .on('error', error => reject(error))
      .on('finish', () => {
        gm(filePath)
          .crop(width, height, x, y)
          .resize(120, 120)
          .compress('JPEG')
          .write(filePath, error => {
            if (error) {
              reject(error)
            } else {
              cloudinary.uploader.upload(filePath, (error, result) => {
                if (error) {
                  reject(error)
                } else {
                  fs.unlinkSync(filePath)
                  resolve(result.secure_url)
                }
              })
            }
          })
      })
  )
}

export function removePhoto(url) {
  const { base, name } = path.parse(url)
  if (url.includes('cloudinary')) {
    cloudinary.uploader.destroy(name)
    return
  }
  const photoPath = path.join(__dirname, '..', 'uploads', base)
  try {
    fs.unlinkSync(photoPath)
  } catch (error) {
    // Nothing
  }
}
