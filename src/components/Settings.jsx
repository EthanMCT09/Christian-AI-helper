import React from 'react'

export default function Settings({ options, setOptions }){
  return (
    <div className="p-4 border-b bg-white">
      <h3 className="font-semibold">Settings</h3>
      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={options.showVerses} onChange={(e)=>setOptions({...options, showVerses: e.target.checked})} />
          <span>Show Bible verses</span>
        </label>
        <label className="flex items-center gap-2">
          <select value={options.tone} onChange={(e)=>setOptions({...options, tone: e.target.value})} className="px-2 py-1 border rounded">
            <option value="gentle">Gentle</option>
            <option value="encouraging">Encouraging</option>
          </select>
          <span>Tone</span>
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={options.music} onChange={(e)=>setOptions({...options, music: e.target.checked})} />
          <span>Background music (placeholder)</span>
        </label>
      </div>
    </div>
  )
}
