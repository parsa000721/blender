export default function Toolbar({ onAdd, onUpload, onSave }) {
  return (
    <div className="space-y-3">
      <div>
        <button className="w-full p-2 bg-indigo-600 rounded" onClick={()=>onAdd('box')}>Add Box</button>
        <button className="w-full p-2 mt-2 bg-indigo-600 rounded" onClick={()=>onAdd('sphere')}>Add Sphere</button>
        <button className="w-full p-2 mt-2 bg-indigo-600 rounded" onClick={()=>onAdd('plane')}>Add Plane</button>
      </div>

      <div>
        <label className="block text-sm mb-1">Upload Asset (glTF/obj)</label>
        <input type="file" accept=".gltf,.glb,.obj" className="w-full" onChange={(e)=>onUpload(e.target.files[0])} />
      </div>

      <div>
        <button className="w-full p-2 bg-emerald-600 rounded" onClick={onSave}>Save Project</button>
      </div>
    </div>
  )
}
