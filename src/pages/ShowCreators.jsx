import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../client'
import Card from '../components/Card'

function ShowCreators() {
  const [creators, setCreators] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchCreators() {
      const { data } = await supabase.from('creators').select()
      if (data) setCreators(data)
    }
    fetchCreators()
  }, [])

  return (
    <div>
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Creatorverse</h1>
          <p className="hero-subtitle">
            Discover and share the creators that inspire you — streamers, artists, educators, and more.
          </p>
          <button className="hero-btn" onClick={() => navigate('/add')}>
            + Add a Creator
          </button>
        </div>
      </div>

      <div className="container">
        {creators.length === 0 ? (
          <div className="empty-state">
            <p>No creators yet.</p>
            <span>Hit the button above to add your first one!</span>
          </div>
        ) : (
          <>
            <h2 className="section-title">Featured Creators</h2>
            <div className="grid">
              {creators.map((c) => (
                <Card key={c.id} creator={c} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default ShowCreators
