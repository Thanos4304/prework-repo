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
    <div className="container">
      <div className="header">
        <h1>Creatorverse</h1>
        <button onClick={() => navigate('/add')}>+ Add Creator</button>
      </div>
      {creators.length === 0 ? (
        <p>No creators yet. Add some!</p>
      ) : (
        <div className="grid">
          {creators.map((c) => (
            <Card key={c.id} creator={c} />
          ))}
        </div>
      )}
    </div>
  )
}

export default ShowCreators
