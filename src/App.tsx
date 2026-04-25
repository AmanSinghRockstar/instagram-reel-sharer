import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [instagramUrl, setInstagramUrl] = useState('')
  const [embedCode, setEmbedCode] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const validateInstagramUrl = (url: string): boolean => {
    // Match Instagram reel, post, or TV URLs, including optional trailing slash
    const instaRegex = /^(https?:\/\/)?(www\.)?instagram\.com\/(p|reel|tv)\/[\w-]+\/?(\?.*)?$/
    return instaRegex.test(url)
  }

  const getShareLink = (url: string) => {
    if (typeof window === 'undefined') return ''
    return `${window.location.origin}${window.location.pathname}?url=${encodeURIComponent(url)}`
  }

  const updateAddressBar = (url: string, replace = false) => {
    if (typeof window === 'undefined') return
    const shareUrl = getShareLink(url)
    const method = replace ? 'replaceState' : 'pushState'
    window.history[method]({}, '', shareUrl)
  }

  const generateEmbedCode = (urlValue?: string, replaceState = false) => {
    const urlToEmbed = urlValue ?? instagramUrl
    setError('')
    setEmbedCode('')
    setLoading(true)

    if (!urlToEmbed.trim()) {
      setError('Please enter an Instagram URL')
      setLoading(false)
      return
    }

    if (!validateInstagramUrl(urlToEmbed)) {
      setError('Invalid Instagram URL. Please enter a valid Instagram post, reel, or TV link.')
      setLoading(false)
      return
    }

    const html = `
      <blockquote class="instagram-media" data-instgrm-permalink="${urlToEmbed}" data-instgrm-version="14"></blockquote>
      <script async src="https://www.instagram.com/embed.js"></script>
    `

    setInstagramUrl(urlToEmbed)
    setEmbedCode(html)
    setLoading(false)
    updateAddressBar(urlToEmbed, replaceState)
  }

  const copyInstagramLink = () => {
    if (!instagramUrl.trim()) {
      setError('Please enter an Instagram URL to copy.')
      return
    }

    navigator.clipboard.writeText(instagramUrl)
    alert('Instagram link copied to clipboard!')
  }

  useEffect(() => {
    if (typeof window === 'undefined') return

    const params = new URLSearchParams(window.location.search)
    const urlParam = params.get('url')
    if (urlParam) {
      generateEmbedCode(urlParam, true)
    }

    const handlePopState = () => {
      const searchParams = new URLSearchParams(window.location.search)
      const nextUrl = searchParams.get('url')
      if (nextUrl) {
        generateEmbedCode(nextUrl, true)
      } else {
        setEmbedCode('')
        setInstagramUrl('')
      }
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  useEffect(() => {
    if (!embedCode) {
      return
    }

    const scriptId = 'instagram-embed-script'
    const existingScript = document.getElementById(scriptId)

    if (!existingScript) {
      const script = document.createElement('script')
      script.id = scriptId
      script.async = true
      script.src = 'https://www.instagram.com/embed.js'
      document.body.appendChild(script)
      return
    }

    const win = window as any
    if (win.instgrm?.Embeds?.process) {
      win.instgrm.Embeds.process()
    }
  }, [embedCode])

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      generateEmbedCode()
    }
  }

  return (
    <div className="container">
      <header className="header">
        <h1>Instagram Reel Sharer</h1>
        <p>Share Instagram reels with anyone, even without an account</p>
      </header>

      <main className="content">
        {embedCode && (
          <section className="embed-section">
            <h2>Preview</h2>
            <div 
              className="embed-container"
              dangerouslySetInnerHTML={{ __html: embedCode }}
            />

            <div className="share-link-section">
              <h3>Shareable Link</h3>
              <div className="share-link-box">
                <input
                  readOnly
                  value={getShareLink(instagramUrl)}
                  className="share-link-input"
                />
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(getShareLink(instagramUrl))
                    alert('Share link copied to clipboard!')
                  }}
                  className="copy-btn"
                >
                  Copy Link
                </button>
              </div>
            </div>
            
            <div className="copy-section">
              <h3>Embed Code</h3>
              <textarea
                readOnly
                value={embedCode}
                className="code-textarea"
              />
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(embedCode)
                  alert('Embed code copied to clipboard!')
                }}
                className="copy-btn"
              >
                Copy Embed Code
              </button>
            </div>
          </section>
        )}

        <section className="input-section">
          <div className="input-group">
            <label htmlFor="instagram-url">Instagram Link</label>
            <input
              id="instagram-url"
              type="text"
              placeholder="Paste Instagram reel, post, or TV link..."
              value={instagramUrl}
              onChange={(e) => setInstagramUrl(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={loading}
            />
            <div className="button-row">
              <button 
                onClick={() => generateEmbedCode()}
                disabled={loading}
                className="generate-btn"
              >
                {loading ? 'Loading...' : 'Embed Reel'}
              </button>
              <button
                onClick={copyInstagramLink}
                className="copy-btn"
              >
                Copy Instagram Link
              </button>
            </div>
          </div>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}
        </section>

        <section className="info-section">
          <h2>How it works</h2>
          <ul>
            <li>Paste any Instagram reel, post, or TV link</li>
            <li>The app generates an embeddable version using Instagram's official embed API</li>
            <li>Share the preview link or copy the embed code to use on your website</li>
            <li>No account needed to view the content</li>
          </ul>

          <h2>Supported Links</h2>
          <ul>
            <li>Reels: <code>https://www.instagram.com/reel/XXX/</code></li>
            <li>Posts: <code>https://www.instagram.com/p/XXX/</code></li>
            <li>TV: <code>https://www.instagram.com/tv/XXX/</code></li>
          </ul>

          <h2>Notes</h2>
          <ul>
            <li>The embedded content will respect the original post's privacy settings</li>
            <li>Private accounts will show limited information</li>
            <li>Some features like comments may not be available in the embed</li>
          </ul>
        </section>
      </main>

      <footer className="footer">
        <p>Instagram Reel Sharer | Deployed on GitHub Pages | Made for Sam </p>
      </footer>
    </div>
  )
}

export default App
