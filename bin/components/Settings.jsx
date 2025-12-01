import React from 'react'

export default function Settings({ options, setOptions }){
  return (
    <div className="p-4 border-b bg-white">
      <h3 className="font-semibold text-lg mb-4">Settings & Preferences</h3>
      
      <div className="space-y-4">
        {/* Tone Selection */}
        <div>
          <label className="block font-semibold text-sm mb-2">Tone Preference</label>
          <select value={options.tone} onChange={(e)=>setOptions({...options, tone: e.target.value})} className="px-3 py-2 border rounded w-full">
            <option value="encouraging">Encouraging</option>
            <option value="serious">Serious & Direct</option>
            <option value="casual">Casual & Friendly</option>
            <option value="gentle">Gentle & Compassionate</option>
          </select>
        </div>

        {/* Bible Version Selection */}
        <div>
          <label className="block font-semibold text-sm mb-2">Bible Version</label>
          <select value={options.bibleVersion || 'NIV'} onChange={(e)=>setOptions({...options, bibleVersion: e.target.value})} className="px-3 py-2 border rounded w-full">
            <option value="KJV">King James Version (KJV)</option>
            <option value="NIV">New International Version (NIV)</option>
            <option value="ESV">English Standard Version (ESV)</option>
            <option value="NKJV">New King James Version (NKJV)</option>
            <option value="NLT">New Living Translation (NLT)</option>
            <option value="NASB">New American Standard Bible (NASB)</option>
          </select>
        </div>

        {/* Background Theme Selection */}
        <div>
          <label className="block font-semibold text-sm mb-2">Background Theme</label>
          <select value={options.theme || 'nature'} onChange={(e)=>setOptions({...options, theme: e.target.value})} className="px-3 py-2 border rounded w-full">
            <option value="nature">Nature-Themed (Peaceful + Calming)</option>
            <option value="scripture">Scripture-Based Background</option>
            <option value="symbolic">Symbolic Christian Backgrounds</option>
            <option value="church">Welcoming Church (Peaceful & Christian-Centered)</option>
          </select>
        </div>

        {/* Additional Options */}
        <div>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={options.showVerses} onChange={(e)=>setOptions({...options, showVerses: e.target.checked})} />
            <span>Show Bible verses in responses</span>
          </label>
        </div>

        <div>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={options.music} onChange={(e)=>setOptions({...options, music: e.target.checked})} />
            <span>Recommend worship music</span>
          </label>
        </div>
      </div>
    </div>
  )
}
