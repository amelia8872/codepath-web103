import {useState, useEffect} from 'react';
import {supabase} from '../client';
import Card from '../components/Card';

function ShowCreators() {

  const [creators, setCreators] = useState([]);

  useEffect(() => {
    async function fetchCreators() {
      const {data, error} = await supabase
        .from('creators')
        .select('*');

      if (error) {
        console.error('Error fetching creators', error);
      } else {
        setCreators(data);
      }

    }

    fetchCreators();

  },[]);

  return (
    <div>
      {creators.map(creator =>
        <Card key={creator.id} creator={creator} />
        )}
    </div>
  );
}

export default ShowCreators;