import { v2 as cloudinary } from 'cloudinary'

// Configuration Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'dbqeavmgs',
  api_key: process.env.CLOUDINARY_API_KEY || '893774288135362',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'J7Pg9RMIw1_0bFRAxUvVVTbwp5c'
})

export default cloudinary

// Fonction utilitaire pour upload d'image
export async function uploadImage(file: Buffer, folder: string = 'oxelya-blog'): Promise<string> {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: 'auto',
        transformation: [
          { quality: 'auto:good' },
          { fetch_format: 'auto' }
        ]
      },
      (error, result) => {
        if (error) {
          reject(error)
        } else if (result) {
          resolve(result.secure_url)
        } else {
          reject(new Error('Upload failed'))
        }
      }
    )

    uploadStream.end(file)
  })
}

// Fonction pour supprimer une image
export async function deleteImage(publicId: string): Promise<void> {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(publicId, (error) => {
      if (error) {
        reject(error)
      } else {
        resolve()
      }
    })
  })
} 