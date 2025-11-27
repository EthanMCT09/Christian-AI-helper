import React, { useState, useRef, useEffect } from 'react'
import assistantModule from '../assistant_v2'

const STORAGE_KEY = 'gospel_chat_messages_v1'

export default function Chat({ options }){
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const listRef = useRef(null)

  // Load persisted conversation on mount
  useEffect(()=>{
    try{
      const raw = localStorage.getItem(STORAGE_KEY)
      if(raw){
        const parsed = JSON.parse(raw)
        setMessages(parsed)
      } else {
        setMessages([{ role: 'assistant', content: 'Welcome — I am here to listen. If you feel in danger, please seek immediate help.', ts: Date.now() }])
      }
    }catch(e){
      console.warn('Failed to load messages', e)
      setMessages([{ role: 'assistant', content: 'Welcome — I am here to listen. If you feel in danger, please seek immediate help.', ts: Date.now() }])
    }
  }, [])

  // Persist on change
  useEffect(()=>{
    try{ localStorage.setItem(STORAGE_KEY, JSON.stringify(messages)) }catch(e){/* ignore */}
    if(listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight
  }, [messages])

  function recentContext(limit = 6){
    // provide last few messages as context
    return messages.slice(-limit)
  }

  function send(){
    if(!input.trim()) return
    const userMsg = { role: 'user', content: input, ts: Date.now() }
    setMessages(m=>[...m, userMsg])

    // Assistant processes with recent context
    const ctx = recentContext(8)
    setTyping(true)
    setTimeout(()=>{
      const resp = assistantModule.getResponse(input, options, ctx)
      const assistantText = formatAssistant(resp)
      const assistantMsg = { role: 'assistant', content: assistantText, ts: Date.now() }
      setMessages(m=>[...m, assistantMsg])
      setTyping(false)
    }, 600)

    setInput('')
  }

  function formatAssistant(resp){
    let parts = []
    parts.push('Support Message:\n' + resp.supportMessage)
    if(resp.bibleVerse) parts.push('\nBible Verse:\n"' + resp.bibleVerse + '"')
    parts.push('\n' + resp.safeNotice)
    if(resp.followUp) parts.push('\nFollow-up:\n' + resp.followUp)
    return parts.join('\n\n')
  }

  function onKey(e){ if(e.key === 'Enter' && !e.shiftKey){ e.preventDefault(); send() } }

  function exportConversation(){
    const payload = JSON.stringify(messages, null, 2)
    const blob = new Blob([payload], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `gospel-conversation-${Date.now()}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  function clearConversation(){
    if(!confirm('Clear the current conversation? This cannot be undone.')) return
    localStorage.removeItem(STORAGE_KEY)
    setMessages([{ role: 'assistant', content: 'Conversation cleared. I am here when you are ready to share.', ts: Date.now() }])
  }

  return (
    <div className="flex flex-col h-[560px]">
      <div className="flex items-center justify-between px-4 py-2 border-b bg-white">
        <div className="text-sm text-slate-600">Conversation</div>
        <div className="flex gap-2">
          <button onClick={exportConversation} className="px-2 py-1 rounded border text-sm">Export</button>
          <button onClick={clearConversation} className="px-2 py-1 rounded border text-sm">Clear</button>
        </div>
      </div>

      <div ref={listRef} className="flex-1 p-6 overflow-auto space-y-4 bg-gradient-to-b from-white to-slate-50">
        {messages.map((m,i)=> (
          <div key={i} className={`max-w-xl ${m.role==='user'?'ml-auto text-right':'mr-auto text-left'}`}>
            <div className={`${m.role==='user'?'bg-sky-600 text-white':'bg-white shadow'} inline-block p-4 rounded-lg`} style={{whiteSpace:'pre-wrap'}}>
              {m.content}
            </div>
            <div className="text-[10px] text-slate-400 mt-1">{m.ts? new Date(m.ts).toLocaleString():''}</div>
          </div>
        ))}
        {typing && (
          <div className="max-w-xl mr-auto text-left">
            <div className="bg-white shadow inline-block p-3 rounded-lg opacity-80">Listening...</div>
          </div>
        )}
      </div>

      <div className="p-4 border-t bg-white flex gap-3">
        <textarea aria-label="Type your message" value={input} onChange={e=>setInput(e.target.value)} onKeyDown={onKey}
          className="flex-1 rounded-md border px-3 py-2 focus:outline-none focus:ring" placeholder="Share what's on your heart..." />
        <button onClick={send} className="px-4 py-2 rounded bg-sky-600 text-white">Send</button>
      </div>
    </div>
  )
}
