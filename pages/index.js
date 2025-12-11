import dynamic from 'next/dynamic'
import Toolbar from '../components/Toolbar'
import { useState } from 'react'

const Viewport = dynamic(() => import('../components/Viewport'), { ssr: false })

export default function Home() {
  const [sceneObjects, setSceneObjects] = useState([])

  function addPrimitive(type) {
    const id = Date.now()
    setSceneObjects([...sceneObjects, { id, type, position: [0,0,0] }])
  }

  async function uploadAsset(file) {
    const form = new FormData()
    form.append('asset', file)
    const res = await fetch('/api/upload', { method: 'POST', body: form })
    const data = await res.json()
    if (data?.url) {
      alert('Uploaded: ' + data.url)
    } else {
      alert('Upload failed')
    }
  }

  async function saveProject() {
    const payload = { objects: sceneObjects, meta: { name: 'My Project' } }
    const res = await fetch('/api/saveProject', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    const json = await res.json()
    alert('Saved: ' + json.id)
  }

  return (
    <div className="flex h-screen">
      <div className="w-72 bg-slate-900 p-4">
        <h2 className="text-xl font-semibold mb-4">Blender-Lite</h2>
        <Toolbar onAdd={addPrimitive} onUpload={uploadAsset} onSave={saveProject} />
      </div>
      <div className="flex-1">
        <Viewport objects={sceneObjects} />
      </div>
    </div>
  )
}
