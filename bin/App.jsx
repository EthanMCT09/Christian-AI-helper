import React, { useState, useEffect, Suspense } from 'react'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from './firebase'
const Chat = React.lazy(() => import('./components/Chat'))
const Settings = React.lazy(() => import('./components/Settings'))
import Login from './components/Login'
import SignUp from './components/SignUp'
import Privacy from './components/Privacy'

export default function App(){
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [authPage, setAuthPage] = useState('login') // 'login', 'signup', 'chat', 'privacy'
  const [showSettings, setShowSettings] = useState(false)
  const [options, setOptions] = useState({ showVerses: true, tone: 'gentle', music: false, theme: 'nature', bibleVersion: 'NIV' })
  const [forceChat, setForceChat] = useState(false) // Force transition to chat after signup

  // Check if user is logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      if (currentUser || forceChat) {
        setAuthPage('chat')
      } else {
        setAuthPage('login')
      }
      setLoading(false)
    })

    return unsubscribe
  }, [forceChat])

  const handleLogout = async () => {
    try {
      await signOut(auth)
      setUser(null)
      setAuthPage('login')
    } catch (error) {
      // Log errors only in development
      // eslint-disable-next-line no-console
      import('./utils/logger').then(({ logger }) => logger.error('Logout failed:', error)).catch(() => {});
    }
  }

  const handleLoginSuccess = () => {
    setAuthPage('chat')
  }

  const handleSignUpSuccess = () => {
    setForceChat(true) // Force immediate transition to chat
    setAuthPage('chat')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 via-rose-300 to-sky-200">
        <div className="text-center">
          <div className="text-6xl mb-4">✝️</div>
          <p className="text-2xl text-white font-semibold">Loading FaithGPT...</p>
        </div>
      </div>
    )
  }

  // Privacy Policy Page
  if (authPage === 'privacy') {
    return (
      <div>
        <Privacy />
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <button
            onClick={() => setAuthPage('login')}
            style={{
              padding: '10px 20px',
              backgroundColor: '#667eea',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            Back to Login
          </button>
        </div>
      </div>
    )
  }

  // Login Page
  if (authPage === 'login') {
    return (
      <div>
        <Login
          onLoginSuccess={handleLoginSuccess}
          onSwitchToSignUp={() => setAuthPage('signup')}
        />
        <div style={{ textAlign: 'center', padding: '20px', color: 'white' }}>
          <button
            onClick={() => setAuthPage('privacy')}
            style={{
              background: 'none',
              border: 'none',
              color: 'white',
              textDecoration: 'underline',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            View Privacy Policy
          </button>
        </div>
      </div>
    )
  }

  // Sign Up Page
  if (authPage === 'signup') {
    return (
      <SignUp
        onSignUpSuccess={handleSignUpSuccess}
        onSwitchToLogin={() => setAuthPage('login')}
      />
    )
  }

  // Main Chat Page (logged in)
  return (
    <div className="min-h-screen flex flex-col faith-gpt-bg">
      <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-3xl">✝️</div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">FaithGPT</h1>
              <p className="text-xs text-slate-600 italic">"Everything is possible with God" — Mark 10:27</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {user && <span className="text-sm text-slate-700 hidden md:inline">Welcome, {user.displayName || user.email}</span>}
            <button onClick={()=>setShowSettings(s=>!s)} className="px-3 py-1.5 rounded-md bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-medium hover:from-blue-600 hover:to-blue-700 transition-all shadow-sm">{showSettings? 'Close':'Settings'}</button>
            <button onClick={handleLogout} className="px-3 py-1.5 rounded-md bg-gray-100 text-gray-700 text-sm font-medium hover:bg-gray-200 transition-all">Logout</button>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col px-4 py-4 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
        <div className="max-w-6xl w-full mx-auto flex-1 flex flex-col shadow-2xl rounded-xl overflow-hidden border border-gray-200" style={{height: 'calc(100vh - 140px)'}}>
          {showSettings && (
            <Suspense fallback={<div className="p-4 bg-white">Loading settings...</div>}>
              <Settings options={options} setOptions={setOptions} />
            </Suspense>
          )}
          <Suspense fallback={<div className="p-8 text-center bg-white">Loading FaithGPT...</div>}>
            <Chat options={options} user={user} />
          </Suspense>
        </div>
        <footer className="py-3 text-center text-xs text-slate-600 mt-2">
          <p className="font-medium">Made with faith & compassion</p>
          <p className="text-blue-600 mt-0.5">"For God so loved the world..." — John 3:16</p>
        </footer>
      </main>
    </div>
  )
}
