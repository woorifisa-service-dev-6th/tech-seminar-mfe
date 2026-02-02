import { useState, useRef, useEffect, version as reactVersion } from 'react'
import './App.css'

// Host App의 React 버전 확인
console.log('=== Host App ===');
console.log('Host React version:', reactVersion);
console.log('Module system check - React imported successfully');
if (window.React) console.log('Window.React exists:', window.React.version);

function App() {
  const [activeTab, setActiveTab] = useState('overview')
  const vanillaContainerRef = useRef(null)
  const reactContainerRef = useRef(null)
  const [loading, setLoading] = useState({ vanilla: false, react: false })
  const [error, setError] = useState({ vanilla: null, react: null })
  const unmountFuncsRef = useRef({})

  // Vanilla App 로드
  useEffect(() => {
    if (activeTab === 'vanilla') {
      setLoading(prev => ({ ...prev, vanilla: true }))
      setError(prev => ({ ...prev, vanilla: null }))
      
      import('remoteVanilla/bootstrap').then((module) => {
        const { mount } = module.default || module
        if (vanillaContainerRef.current) {
          const unmountFn = mount(vanillaContainerRef.current)
          unmountFuncsRef.current.vanilla = unmountFn
          setLoading(prev => ({ ...prev, vanilla: false }))
        }
      }).catch((err) => {
        console.error('Vanilla App 로드 실패:', err)
        setError(prev => ({ ...prev, vanilla: err.message }))
        setLoading(prev => ({ ...prev, vanilla: false }))
      })
    }
  }, [activeTab])

  // React App 로드
  useEffect(() => {
    if (activeTab === 'react') {
      // iframe 방식이므로 별도 로드 로직 불필요
      setLoading(prev => ({ ...prev, react: false }))
    }
  }, [activeTab])

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>🏠 MFE Host</h1>
        <p>Micro Frontend 서비스</p>
      </header>

      <nav className="app-nav">
        <button 
          className={activeTab === 'overview' ? 'active' : ''}
          onClick={() => setActiveTab('overview')}
        >
          개요
        </button>
        <button 
          className={activeTab === 'react' ? 'active' : ''}
          onClick={() => setActiveTab('react')}
        >
          React App
        </button>
        <button 
          className={activeTab === 'vanilla' ? 'active' : ''}
          onClick={() => setActiveTab('vanilla')}
        >
          Vanilla App
        </button>
        <button 
          className={activeTab === 'nextjs' ? 'active' : ''}
          onClick={() => setActiveTab('nextjs')}
        >
          Next.js App
        </button>
      </nav>

      <main className="app-main">
        {activeTab === 'overview' && (
          <section className="overview">
            <h2>MFE (Micro Frontend) 아키텍처</h2>
            <p>여러 독립적인 애플리케이션을 하나의 호스트에서 통합하여 운영합니다.</p>
            <div className="apps-info">
              <div className="app-info-card">
                <h3>⚛️ React App</h3>
                <p>포트: 5001</p>
                <p>React 풀스택 애플리케이션</p>
              </div>
              <div className="app-info-card">
                <h3>🎨 Vanilla App</h3>
                <p>포트: 5002</p>
                <p>순수 JavaScript로 구현된 SPA</p>
              </div>
              <div className="app-info-card">
                <h3>🚀 Next.js App</h3>
                <p>포트: 5003</p>
                <p>Next.js 풀스택 프레임워크</p>
              </div>
            </div>
          </section>
        )}

        {activeTab === 'react' && (
          <section className="app-section">
            <h2>⚛️ React App</h2>
            <div className="iframe-container">
              <iframe 
                src="http://localhost:5001" 
                title="React App"
                className="remote-iframe"
              />
            </div>
          </section>
        )}

        {activeTab === 'vanilla' && (
          <section className="app-section">
            <h2>🎨 Vanilla App</h2>
            {loading.vanilla && <p>로딩 중...</p>}
            {error.vanilla && <p style={{ color: 'red' }}>❌ 에러: {error.vanilla}</p>}
            <div ref={vanillaContainerRef} />
          </section>
        )}

        {activeTab === 'nextjs' && (
          <section className="app-section">
            <h2>🚀 Next.js App</h2>
            <div className="iframe-container">
              <iframe 
                src="http://localhost:5003" 
                title="Next.js App"
                className="remote-iframe"
              />
            </div>
          </section>
        )}
      </main>
    </div>
  )
}

export default App
