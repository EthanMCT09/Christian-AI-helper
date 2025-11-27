import React, { useState } from 'react'
import Chat from './components/Chat'
import Settings from './components/Settings'

export default function App(){
  const [showSettings, setShowSettings] = useState(false)
  const [options, setOptions] = useState({ showVerses: true, tone: 'gentle', music: false })

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white/70 backdrop-blur-sm py-6 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src="/public/assets/cross.svg" alt="cross" className="w-10 h-10" />
            <div>
              <h1 className="text-2xl font-semibold">Gospel Assistant</h1>
              <p className="text-sm text-slate-600">John 3:16 — "For God so loved the world..."</p>
            </div>
          </div>
          <div>
            <button onClick={()=>setShowSettings(s=>!s)} className="px-3 py-1 rounded bg-sky-600 text-white">{showSettings? 'Close Settings':'Settings'}</button>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-8" style={{backgroundImage: 'url(/public/assets/placeholder-bg.svg)', backgroundSize: 'cover'}}>
        <div className="max-w-3xl w-full bg-white/80 shadow-lg rounded-lg overflow-hidden">
          {showSettings && <Settings options={options} setOptions={setOptions} />}
          <Chat options={options} />
        </div>
      </main>

      <footer className="py-4 text-center text-sm text-slate-500">Made with care — Gospel Assistant</footer>
    </div>
  )
}
