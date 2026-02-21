import { useState, useCallback } from 'react'
import './App.css'

interface Attraction {
  id: number
  name: string
  category: string
  description: string
  image: string
}

const ATTRACTIONS: Attraction[] = [
  {
    id: 1,
    name: 'Avenida Paulista',
    category: 'Landmark',
    description:
      'The cultural heart of São Paulo — stroll past museums, street performers, and iconic skyline views along this bustling boulevard.',
    image: 'https://images.unsplash.com/photo-1554168848-228452c09d60?w=400&q=80',
  },
  {
    id: 2,
    name: 'Pinacoteca do Estado',
    category: 'Museum',
    description:
      'The oldest art museum in São Paulo, housed in a stunning 19th-century building with an incredible Brazilian art collection.',
    image: 'https://images.unsplash.com/photo-1554907984-15263bfd63bd?w=400&q=80',
  },
  {
    id: 3,
    name: 'Mercado Municipal (Mercadão)',
    category: 'Food & Market',
    description:
      'A historic food hall famous for its mortadella sandwiches, fresh tropical fruits, and gorgeous stained-glass windows.',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&q=80',
  },
  {
    id: 4,
    name: 'Ibirapuera Park',
    category: 'Park',
    description:
      'São Paulo\'s answer to Central Park — a vast urban oasis with jogging trails, museums, and stunning modernist architecture by Niemeyer.',
    image: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=400&q=80',
  },
  {
    id: 5,
    name: 'MASP (Museu de Arte de São Paulo)',
    category: 'Museum',
    description:
      'An architectural icon on Paulista Avenue, housing the most important collection of European art in Latin America.',
    image: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=400&q=80',
  },
  {
    id: 6,
    name: 'Vila Madalena Street Art',
    category: 'Art & Culture',
    description:
      'Wander through Beco do Batman and the colorful streets of this bohemian neighborhood covered in jaw-dropping murals.',
    image: 'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=400&q=80',
  },
  {
    id: 7,
    name: 'Liberdade (Japanese Quarter)',
    category: 'Neighborhood',
    description:
      'Explore the largest Japanese community outside Japan — ramen shops, lantern-lit streets, and the vibrant Sunday street fair.',
    image: 'https://images.unsplash.com/photo-1528164344705-47542687000d?w=400&q=80',
  },
  {
    id: 8,
    name: 'São Paulo Cathedral (Catedral da Sé)',
    category: 'Landmark',
    description:
      'A massive neo-Gothic cathedral in the city center, one of the largest churches in the world with breathtaking interior domes.',
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=400&q=80',
  },
  {
    id: 9,
    name: 'Eat at a Traditional Churrascaria',
    category: 'Food',
    description:
      'Experience all-you-can-eat Brazilian barbecue — endless cuts of grilled meat carved tableside at legendary spots like Fogo de Chão.',
    image: 'https://images.unsplash.com/photo-1558030006-450675393462?w=400&q=80',
  },
  {
    id: 10,
    name: 'Edifício Itália Rooftop',
    category: 'Viewpoint',
    description:
      'Dine at the top of one of São Paulo\'s tallest skyscrapers for panoramic 360° views of the sprawling metropolis.',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&q=80',
  },
  {
    id: 11,
    name: 'Football Match at Neo Química Arena',
    category: 'Sports',
    description:
      'Feel the electric atmosphere of Brazilian football firsthand — cheer alongside passionate Corinthians fans at a live match.',
    image: 'https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=400&q=80',
  },
  {
    id: 12,
    name: 'Rua Augusta Nightlife',
    category: 'Nightlife',
    description:
      'From underground clubs to rooftop bars, this legendary street is the epicenter of São Paulo\'s world-class nightlife scene.',
    image: 'https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?w=400&q=80',
  },
  {
    id: 13,
    name: 'Instituto Butantan',
    category: 'Museum & Science',
    description:
      'A fascinating biomedical research center with museums showcasing venomous snakes, spiders, and the history of vaccine production.',
    image: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=400&q=80',
  },
  {
    id: 14,
    name: 'Take a Cooking Class',
    category: 'Experience',
    description:
      'Learn to make coxinhas, pão de queijo, and feijoada from local chefs — the tastiest souvenir you can bring home.',
    image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=400&q=80',
  },
  {
    id: 15,
    name: 'Pico do Jaraguá',
    category: 'Nature',
    description:
      'Hike to the highest point in São Paulo for sweeping views of the city and surrounding Atlantic Forest reserve.',
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=400&q=80',
  },
  {
    id: 16,
    name: 'Theatro Municipal',
    category: 'Landmark',
    description:
      'An opulent early-1900s opera house inspired by the Paris Opéra — catch a ballet, concert, or simply admire the architecture.',
    image: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=400&q=80',
  },
  {
    id: 17,
    name: 'Feira da Benedita (Benedito Calixto Fair)',
    category: 'Market',
    description:
      'A Saturday antique market in Pinheiros with vintage furniture, vinyl records, local art, and delicious street food.',
    image: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=400&q=80',
  },
  {
    id: 18,
    name: 'Museum of Football (Museu do Futebol)',
    category: 'Museum',
    description:
      'Located under the Pacaembu stadium stands, this interactive museum brings the passion and history of Brazilian football to life.',
    image: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=400&q=80',
  },
  {
    id: 19,
    name: 'Samba Night in Vila Madalena',
    category: 'Nightlife & Culture',
    description:
      'Join locals at a traditional roda de samba — live percussion, cold chopps, and dancing under the stars.',
    image: 'https://images.unsplash.com/photo-1504609813442-a8924e83f76e?w=400&q=80',
  },
  {
    id: 20,
    name: 'Day Trip to Embu das Artes',
    category: 'Day Trip',
    description:
      'A charming colonial town just 30 minutes away, famous for its weekend artisan fair, galleries, and craft beer scene.',
    image: 'https://images.unsplash.com/photo-1518639192441-8fce0a366e2e?w=400&q=80',
  },
]

type SortMode = 'top' | 'new' | 'controversial'
type VoteDirection = 'up' | 'down' | null

interface VoteState {
  [attractionId: number]: { score: number; userVote: VoteDirection }
}

function loadVotes(): VoteState {
  try {
    const stored = localStorage.getItem('sp-votes')
    if (stored) return JSON.parse(stored)
  } catch {}
  return {}
}

function saveVotes(votes: VoteState) {
  try {
    localStorage.setItem('sp-votes', JSON.stringify(votes))
  } catch {}
}

function App() {
  const [votes, setVotes] = useState<VoteState>(loadVotes)
  const [sortMode, setSortMode] = useState<SortMode>('top')

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

  const sorted = [...ATTRACTIONS].sort((a, b) => {
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
          <h2 className="section-title">Top 20 Things To Do</h2>
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
        </div>

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
