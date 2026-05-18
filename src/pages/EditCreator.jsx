import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '../client'

function EditCreator() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', url: '', description: '', imageURL: '' })

  useEffect(() => {
    async function fetchCreator() {
      const { data } = await supabase.from('creators').select().eq('id', id).single()
      if (data) setForm(data)
    }
    fetchCreator()
  }, [id])

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleUpdate(e) {
    e.preventDefault()
    const { name, url, description, imageURL } = form
    await supabase.from('creators').update({ name, url, description, imageURL }).eq('id', Number(id))
    navigate('/')
  }

  async function handleDelete() {
    const { error } = await supabase.from('creators').delete().eq('id', Number(id))
    if (error) { console.error('Delete error:', error); return }
    navigate('/')
  }

  return (
    <div className="container">
      <h1>Edit Creator</h1>
      <form onSubmit={handleUpdate} className="creator-form">
        <label>Name</label>
        <input name="name" value={form.name} onChange={handleChange} required />
        <label>URL</label>
        <input name="url" value={form.url} onChange={handleChange} required />
        <label>Description</label>
        <textarea name="description" value={form.description} onChange={handleChange} required />
        <label>Image URL (optional)</label>
        <input name="imageURL" value={form.imageURL} onChange={handleChange} />
        <div className="form-actions">
          <button type="submit">Save Changes</button>
          <button type="button" onClick={handleDelete} className="delete-btn">
            Delete Creator
          </button>
          <button type="button" onClick={() => navigate('/')}>Cancel</button>
        </div>
      </form>
    </div>
  )
}

export default EditCreator
