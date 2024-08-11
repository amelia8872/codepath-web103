import {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../client';
import Card from '../components/Card';

function ViewCreator() {
  const { id } = useParams();
  const [creator, setCreator] = useState(null);

  useEffect(() => {
    async function fetchCreator() {
      const { data, error } = await supabase
        .from('creators')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching creator', error);
      } else {
        setCreator(data);
      }
    }

    fetchCreator();
  }, [id]);

  return (
    <div>
      {creator && <Card creator={creator} />}
    </div>
  )
}

export default ViewCreator;