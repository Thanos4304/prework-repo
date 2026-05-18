import { useNavigate } from 'react-router-dom'

function Card({ creator }) {
  const navigate = useNavigate()

  return (
    <div className="card" onClick={() => navigate(`/creator/${creator.id}`)}>
      {creator.imageURL && (
        <img src={creator.imageURL} alt={creator.name} className="card-img" />
      )}
      <div className="card-body">
        <h2>{creator.name}</h2>
        <p>{creator.description}</p>
        <a
          href={creator.url}
          target="_blank"
          rel="noreferrer"
          onClick={(e) => e.stopPropagation()}
        >
          Visit Channel
        </a>
        <div className="card-actions">
          <button
            onClick={(e) => {
              e.stopPropagation()
              navigate(`/edit/${creator.id}`)
            }}
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  )
}

export default Card
