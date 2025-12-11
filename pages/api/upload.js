import formidable from 'formidable'
import fs from 'fs'
import path from 'path'

export const config = {
  api: { bodyParser: false }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()
  const form = formidable({ multiples: false })
  form.parse(req, (err, fields, files) => {
    if (err) {
      console.error(err)
      return res.status(500).json({ error: 'Parse error' })
    }
    const file = files.asset
    if (!file) return res.status(400).json({ error: 'No file' })

    // In serverless env, /tmp is writeable on Vercel (briefly)
    const data = fs.readFileSync(file.filepath)
    const outPath = path.join('/tmp', path.basename(file.originalFilename || file.newFilename))
    fs.writeFileSync(outPath, data)

    // In production move to S3 or persistent storage and return public URL
    // For the demo return a pseudo URL
    const publicUrl = `/tmp/${path.basename(outPath)}`
    return res.status(200).json({ url: publicUrl, name: path.basename(outPath) })
  })
}
