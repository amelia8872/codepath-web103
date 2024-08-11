
import { useState } from 'react';
import { supabase } from '../client';

function AddCreator() {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    const { data, error } = await supabase.from('creators').insert([{ name, url, description }]);

    if (error) {
      console.error('Error adding creator', error);
    } else {
      console.log('Creator added!', data);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Name" required />
      <input type="text" value={url} onChange={e => setUrl(e.target.value)} placeholder="URL" required />
      <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" />
      <button type="submit">Add Creator</button>
    </form>
  );
}

export default AddCreator;
