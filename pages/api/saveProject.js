import { v4 as uuidv4 } from 'uuid'
import fs from 'fs'
import path from 'path'

export default async function handler(req,res){
  if(req.method !== 'POST') return res.status(405).end()
  const body = req.body
  const id = uuidv4()
  // Save to /tmp for demo; in real app save to DB (Mongo/Postgres)
  const outPath = path.join('/tmp', `project_${id}.json`)
  fs.writeFileSync(outPath, JSON.stringify(body, null, 2))
  return res.status(200).json({ id, path: outPath })
}
