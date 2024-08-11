import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../client';

function EditCreator() {
  const { id } = useParams(); // Get the id from the URL
  const navigate = useNavigate();
  const [creator, setCreator] = useState({ name: '', description: '', imageURL: '', url: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCreator();
  }, [id]);

  async function fetchCreator() {
    setLoading(true);
    try {
      let { data, error } = await supabase
        .from('creators')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;

      setCreator(data);
    } catch (error) {
      setError('Failed to fetch creator');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const handleChange = (e) => {
    setCreator({ ...creator, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from('creators')
        .update({
          name: creator.name,
          description: creator.description,
          imageURL: creator.imageURL,
          url: creator.url
        })
        .eq('id', id);

      if (error) throw error;

      navigate('/'); // Redirect after successful edit
    } catch (error) {
      setError('Failed to update creator');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    const confirm = window.confirm("Are you sure you want to delete this creator?");
    if (confirm) {
      setLoading(true);
      try {
        const { error } = await supabase
          .from('creators')
          .delete()
          .eq('id', id);

        if (error) throw error;
        navigate('/'); // Navigate back to the main page or wherever makes sense
      } catch (error) {
        setError('Failed to delete creator');
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name:</label>
      <input type="text" id="name" name="name" value={creator.name} onChange={handleChange} />

      <label htmlFor="description">Description:</label>
      <textarea id="description" name="description" value={creator.description} onChange={handleChange} />

      <label htmlFor="imageURL">Image URL:</label>
      <input type="text" id="imageURL" name="imageURL" value={creator.imageURL} onChange={handleChange} />

      <label htmlFor="url">Website URL:</label>
      <input type="text" id="url" name="url" value={creator.url} onChange={handleChange} />

      <button type="submit" disabled={loading}>Submit</button>
      <button type="button" onClick={handleDelete}>Delete</button>
      <button type="button" onClick={() => navigate('/')}>Cancel</button>
    </form>
  );
}

export default EditCreator;
