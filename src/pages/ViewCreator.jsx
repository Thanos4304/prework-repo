import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '../client'

function ViewCreator() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [creator, setCreator] = useState(null)

  useEffect(() => {
    async function fetchCreator() {
      const { data } = await supabase.from('creators').select().eq('id', Number(id)).single()
      if (data) setCreator(data)
    }
    fetchCreator()
  }, [id])

  if (!creator) return <p>Loading...</p>

  return (
    <div className="container view-page">
      {creator.imageURL && (
        <img src={creator.imageURL} alt={creator.name} className="view-img" />
      )}
      <h1>{creator.name}</h1>
      <p>{creator.description}</p>
      <a href={creator.url} target="_blank" rel="noreferrer">
        {creator.url}
      </a>
      <div className="view-actions">
        <button onClick={() => navigate(`/edit/${creator.id}`)}>Edit</button>
        <button onClick={() => navigate('/')}>Back</button>
      </div>
    </div>
  )
}

export default ViewCreator
