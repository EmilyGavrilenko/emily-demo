import { useState, useCallback, useEffect, type FormEvent } from 'react'
import { supabase } from './supabaseClient'
import './App.css'

interface Attraction {
  id: number
  name: string
  category: string
  description: string
  image: string
}

type SortMode = 'top' | 'new' | 'controversial'
type VoteDirection = 'up' | 'down' | null

interface VoteState {
  [attractionId: number]: { score: number; userVote: VoteDirection }
}

function loadVotes(): VoteState {
  try {
    const stored = localStorage.getItem('sp-votes')
    if (stored) return JSON.parse(stored)
  } catch { /* localStorage unavailable */ }
  return {}
}

function saveVotes(votes: VoteState) {
  try {
    localStorage.setItem('sp-votes', JSON.stringify(votes))
  } catch { /* localStorage unavailable */ }
}

function App() {
  const [attractions, setAttractions] = useState<Attraction[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [votes, setVotes] = useState<VoteState>(loadVotes)
  const [sortMode, setSortMode] = useState<SortMode>('top')
  const [showPublishForm, setShowPublishForm] = useState(false)
  const [formName, setFormName] = useState('')
  const [formDescription, setFormDescription] = useState('')
  const [publishing, setPublishing] = useState(false)

  useEffect(() => {
    async function fetchAttractions() {
      const { data, error: fetchError } = await supabase
        .from('attractions')
        .select('id, name, category, description, image')
        .order('id')

      if (fetchError) {
        setError(fetchError.message)
      } else {
        setAttractions(data ?? [])
      }
      setLoading(false)
    }
    fetchAttractions()
  }, [])

  const handlePublish = async (e: FormEvent) => {
    e.preventDefault()
    const trimmedName = formName.trim()
    const trimmedDesc = formDescription.trim()
    if (!trimmedName || !trimmedDesc) return

    setPublishing(true)
    const { data, error: insertError } = await supabase
      .from('attractions')
      .insert({
        name: trimmedName,
        category: 'Recommendation',
        description: trimmedDesc,
        image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?w=400&q=80',
      })
      .select()

    if (insertError) {
      setError(insertError.message)
    } else if (data) {
      setAttractions((prev) => [...prev, ...data])
      setFormName('')
      setFormDescription('')
      setShowPublishForm(false)
    }
    setPublishing(false)
  }

  const getScore = useCallback(
    (id: number) => votes[id]?.score ?? 0,
    [votes],
  )

  const getUserVote = useCallback(
    (id: number): VoteDirection => votes[id]?.userVote ?? null,
    [votes],
  )

  const handleVote = useCallback(
    (id: number, direction: 'up' | 'down') => {
      setVotes((prev) => {
        const current = prev[id] || { score: 0, userVote: null }
        let newScore = current.score
        let newVote: VoteDirection = direction

        if (current.userVote === direction) {
          newScore += direction === 'up' ? -1 : 1
          newVote = null
        } else if (current.userVote === null) {
          newScore += direction === 'up' ? 1 : -1
        } else {
          newScore += direction === 'up' ? 2 : -2
        }

        const next = { ...prev, [id]: { score: newScore, userVote: newVote } }
        saveVotes(next)
        return next
      })
    },
    [],
  )

  const sorted = [...attractions].sort((a, b) => {
    if (sortMode === 'top') return getScore(b.id) - getScore(a.id)
    if (sortMode === 'new') return b.id - a.id
    return Math.abs(getScore(b.id)) - Math.abs(getScore(a.id))
  })

  return (
    <>
      <header className="hero">
        <div className="hero-content">
          <p className="hero-tagline">Your Ultimate City Guide</p>
          <h1 className="hero-title">São Paulo</h1>
          <p className="hero-subtitle">
            Discover the best of Brazil's vibrant megacity — voted on by
            travelers like you.
          </p>
          <a href="#attractions" className="hero-cta">
            Explore Top 20
          </a>
        </div>
      </header>

      <main className="main-content" id="attractions">
        <div className="section-header">
          <h2 className="section-title">Top Things To Do</h2>
          <p className="section-subtitle">
            Upvote your favorites to help fellow travelers
          </p>
        </div>

        <div className="sort-bar">
          {(['top', 'new', 'controversial'] as SortMode[]).map((mode) => (
            <button
              key={mode}
              className={`sort-btn ${sortMode === mode ? 'active' : ''}`}
              onClick={() => setSortMode(mode)}
            >
              {mode === 'top'
                ? '🔥 Top Rated'
                : mode === 'new'
                  ? '✨ Newest'
                  : '⚡ Controversial'}
            </button>
          ))}
          <button
            className="sort-btn publish-toggle-btn"
            onClick={() => setShowPublishForm((v) => !v)}
          >
            {showPublishForm ? '✕ Cancel' : '+ Add Recommendation'}
          </button>
        </div>

        {showPublishForm && (
          <form className="publish-form" onSubmit={handlePublish}>
            <h3 className="publish-form-title">Share a Recommendation</h3>
            <label className="publish-label" htmlFor="pub-name">
              Name
            </label>
            <input
              id="pub-name"
              className="publish-input"
              type="text"
              placeholder="e.g. Visit the Botanical Garden"
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
              maxLength={120}
              required
              disabled={publishing}
            />
            <label className="publish-label" htmlFor="pub-desc">
              Description
            </label>
            <textarea
              id="pub-desc"
              className="publish-textarea"
              placeholder="What makes this a must-do for travelers?"
              value={formDescription}
              onChange={(e) => setFormDescription(e.target.value)}
              maxLength={500}
              rows={3}
              required
              disabled={publishing}
            />
            <button
              type="submit"
              className="publish-submit-btn"
              disabled={publishing}
            >
              {publishing ? 'Publishing…' : 'Publish Recommendation'}
            </button>
          </form>
        )}

        {error && <p className="error-message">Error: {error}</p>}

        {loading ? (
          <p className="loading-message">Loading recommendations…</p>
        ) : (
          <div className="attractions-list">
            {sorted.map((attraction, index) => {
              const score = getScore(attraction.id)
              const userVote = getUserVote(attraction.id)

              return (
                <article key={attraction.id} className="attraction-card">
                  <div className="vote-column">
                    <button
                      className={`vote-btn upvote ${userVote === 'up' ? 'voted' : ''}`}
                      onClick={() => handleVote(attraction.id, 'up')}
                      aria-label="Upvote"
                    >
                      ▲
                    </button>
                    <span
                      className={`vote-score ${score > 0 ? 'positive' : score < 0 ? 'negative' : ''}`}
                    >
                      {score}
                    </span>
                    <button
                      className={`vote-btn downvote ${userVote === 'down' ? 'voted' : ''}`}
                      onClick={() => handleVote(attraction.id, 'down')}
                      aria-label="Downvote"
                    >
                      ▼
                    </button>
                  </div>
                  <img
                    className="attraction-image"
                    src={attraction.image}
                    alt={attraction.name}
                    loading="lazy"
                  />
                  <div className="attraction-body">
                    <span className="attraction-rank">#{index + 1}</span>
                    <h3 className="attraction-name">{attraction.name}</h3>
                    <span className="attraction-category">
                      {attraction.category}
                    </span>
                    <p className="attraction-desc">{attraction.description}</p>
                  </div>
                </article>
              )
            })}
          </div>
        )}
      </main>

      <footer className="footer">
        <p>
          São Paulo Travel Guide — Built with ❤️ for travelers everywhere
        </p>
      </footer>
    </>
  )
}

export default App
