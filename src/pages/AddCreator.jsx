import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../client'

function AddCreator() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', url: '', description: '', imageURL: '' })

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    await supabase.from('creators').insert([form])
    navigate('/')
  }

  return (
    <div className="container">
      <h1>Add a Creator</h1>
      <form onSubmit={handleSubmit} className="creator-form">
        <label>Name</label>
        <input name="name" value={form.name} onChange={handleChange} required />
        <label>URL</label>
        <input name="url" value={form.url} onChange={handleChange} required />
        <label>Description</label>
        <textarea name="description" value={form.description} onChange={handleChange} required />
        <label>Image URL (optional)</label>
        <input name="imageURL" value={form.imageURL} onChange={handleChange} />
        <div className="form-actions">
          <button type="submit">Add Creator</button>
          <button type="button" onClick={() => navigate('/')}>Cancel</button>
        </div>
      </form>
    </div>
  )
}

export default AddCreator
