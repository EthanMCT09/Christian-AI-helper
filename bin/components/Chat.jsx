import React, { useState, useRef, useEffect } from 'react'
import faithgpt from '../faithgpt'
import { encryptConversationHistory, decryptConversationHistory, storeEncryptedConversation, retrieveEncryptedConversation } from '../encryption'
import { contextModule } from '../contextModule'
import { analyticsModule } from '../analyticsModule'
import { securityModule } from '../securityModule'

const STORAGE_KEY = 'faithgpt_chat_messages_v2_encrypted'

export default function Chat({ options, user }){
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const [contextAware, setContextAware] = useState(false)
  const listRef = useRef(null)
  const textareaRef = useRef(null)

  // Load persisted conversation on mount
  useEffect(()=>{
    try{
      const decrypted = retrieveEncryptedConversation(STORAGE_KEY)
      if(decrypted && decrypted.length > 0){
        setMessages(decrypted)
        // Load context from messages
        decrypted.forEach(msg => {
          if (msg.role === 'user') {
            contextModule.addUserContext(msg.content)
          } else {
            contextModule.addAssistantContext(msg.content)
          }
        })
      } else {
        const welcomeMessage = { role: 'assistant', content: 'Welcome! How may I assist you today? I\'m here to listen and support you with faith, hope, and compassion. Share what\'s on your heart.', ts: Date.now() }
        setMessages([welcomeMessage])
        contextModule.addAssistantContext(welcomeMessage.content)
      }
      setContextAware(true)
    } catch(e){
      import('../utils/logger').then(({ logger }) => logger.warn('Failed to load messages', e)).catch(() => {})
      const fallbackMessage = { role: 'assistant', content: 'Welcome! How may I assist you today? I\'m here to listen and support you with faith, hope, and compassion. Share what\'s on your heart.', ts: Date.now() }
      setMessages([fallbackMessage])
    }
  }, [])

  // Persist on change with encryption
  useEffect(()=>{
    try{ 
      storeEncryptedConversation(STORAGE_KEY, messages)
    }catch(e){
      import('../utils/logger').then(({ logger }) => logger.error('Failed to store encrypted messages', e)).catch(() => {})
    }
    if(listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight
  }, [messages])

  // Auto-resize textarea as user types
  const handleInputChange = (e) => {
    setInput(e.target.value)
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 200) + 'px'
    }
  }

  function send(){
    if(!input.trim()) return

    // Security check: detect injection attempts
    if (securityModule.detectInjectionAttempt(input)) {
      alert('Invalid input detected. Please try again.');
      return;
    }

    // Rate limiting check
    if (!securityModule.checkRateLimit(`user_${user?.uid || 'anonymous'}`, 100, 60000)) {
      alert('Too many messages. Please wait before sending more.');
      return;
    }

    // Sanitize input
    const sanitizedInput = securityModule.sanitizeInput(input)

    const userMsg = { role: 'user', content: sanitizedInput, ts: Date.now() }
    setMessages(m=>[...m, userMsg])
    contextModule.addUserContext(sanitizedInput)

    // Track message analytics
    analyticsModule.trackMessageSent(sanitizedInput.length, 'pending')

    // FaithGPT processes the input with context awareness
    setTyping(true)
    const startTime = Date.now()

    setTimeout(()=>{
      const resp = faithgpt.getResponse(sanitizedInput)
      const assistantText = formatAssistant(resp)
      const assistantMsg = { role: 'assistant', content: assistantText, ts: Date.now() }
      setMessages(m=>[...m, assistantMsg])
      contextModule.addAssistantContext(assistantText)

      // Track response analytics
      const responseTime = Date.now() - startTime
      analyticsModule.trackResponseGenerated(resp.type, responseTime)

      setTyping(false)
    }, 700)

    setInput('')
    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
    }
  }

  function formatAssistant(resp){
    let text = ''
    
    if(resp.type === 'greeting') {
      text = resp.message
    } else if(resp.type === 'crisis') {
      text = `${resp.supportMessage}\n\n**Prayer for you:**\n${resp.prayer}\n\n**Bible Verses:**\n${resp.verses.join('\n')}\n\n**Resources:**\n${resp.resources.join('\n')}`
    } else if(resp.type === 'mentalHealth') {
      text = `${resp.supportMessage}\n\n**Bible Verse:**\n"${resp.verse}"\n\n${resp.musicRecommendation}\n\nMusic links:\n${resp.musicLinks.map((v, i) => `${i + 1}. ${v.title}: ${v.url}`).join('\n')}\n\n${resp.finalCheck}`
    } else if(resp.type === 'faith') {
      text = `${resp.supportMessage}\n\n**Scripture:**\n"${resp.verse}"\n\nAdditional verse:\n"${resp.additionalVerse}"\n\n${resp.biblicalExamples ? Object.entries(resp.biblicalExamples).map(([person, explanation]) => `**${person}**: ${explanation}`).join('\n\n') + '\n\n' : ''}${resp.finalQuestion}`
    } else if(resp.type === 'music') {
      text = `${resp.supportMessage}\n\n${resp.videos}\n\n${resp.suggestion}\n\nVerse: "${resp.verse}"`
    } else if(resp.type === 'preaching') {
      text = `${resp.supportMessage}\n${resp.longSermons}${resp.shortVideos}\n\nScripture: "${resp.verse}"`
    } else {
      text = `${resp.supportMessage}\n\nScripture: "${resp.verse}"\n\n${resp.suggestion}\n\n${resp.finalQuestion}`
    }
    
    return text
  }

  function onKey(e){ if(e.key === 'Enter' && !e.shiftKey){ e.preventDefault(); send() } }

  function exportConversation(){
    analyticsModule.trackUserAction('export_conversation')
    
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
    
    // Track analytics
    analyticsModule.trackUserAction('clear_conversation')
    analyticsModule.trackSessionEnd(messages.length, Date.now() - analyticsModule.sessionStart)
    
    localStorage.removeItem(STORAGE_KEY)
    contextModule.clearContext()
    const clearedMsg = { role: 'assistant', content: 'Conversation cleared. Welcome to FaithGPT — I\'m here when you\'re ready to share.', ts: Date.now() }
    setMessages([clearedMsg])
    contextModule.addAssistantContext(clearedMsg.content)
  }

  return (
    <div className="chat-container">
      {/* ChatGPT-style Header */}
      <div className="chat-header">
        <div className="chat-header-content">
          <div className="chat-title">
            <span className="cross-icon">✝</span>
            <span className="title-text">FaithGPT</span>
          </div>
          <div className="chat-actions">
            <button onClick={exportConversation} className="action-btn" title="Export conversation">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>
              </svg>
            </button>
            <button onClick={clearConversation} className="action-btn" title="Clear conversation">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* ChatGPT-style Messages Area */}
      <div ref={listRef} className="chat-messages">
        {messages.map((m,i)=> (
          <div key={i} className={`message-row ${m.role === 'assistant' ? 'assistant-row' : 'user-row'}`}>
            <div className="message-wrapper">
              <div className="message-avatar">
                {m.role === 'assistant' ? (
                  <div className="avatar-assistant">✝️</div>
                ) : (
                  <div className="avatar-user">
                    {user?.displayName?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || 'U'}
                  </div>
                )}
              </div>
              <div className="message-content">
                <div className="message-author">
                  {m.role === 'assistant' ? 'FaithGPT' : (user?.displayName || 'You')}
                </div>
                <div className="message-text" style={{whiteSpace:'pre-wrap'}}>
                  {m.content}
                </div>
                <div className="message-timestamp">{m.ts ? new Date(m.ts).toLocaleTimeString() : ''}</div>
              </div>
            </div>
          </div>
        ))}
        {typing && (
          <div className="message-row assistant-row">
            <div className="message-wrapper">
              <div className="message-avatar">
                <div className="avatar-assistant">✝️</div>
              </div>
              <div className="message-content">
                <div className="message-author">FaithGPT</div>
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ChatGPT-style Input Area */}
      <div className="chat-input-container">
        <div className="chat-input-wrapper">
          <textarea
            ref={textareaRef}
            aria-label="Type your message"
            value={input}
            onChange={handleInputChange}
            onKeyDown={onKey}
            className="chat-textarea"
            placeholder="Message FaithGPT..."
            rows="1"
          />
          <button
            onClick={send}
            className={`send-button ${input.trim() ? 'active' : ''}`}
            disabled={!input.trim()}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
            </svg>
          </button>
        </div>
        <div className="chat-footer-text">
          FaithGPT can make mistakes. Seek wisdom from scripture and spiritual counsel.
        </div>
      </div>
    </div>
  )
}
