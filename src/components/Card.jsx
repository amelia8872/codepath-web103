import { useNavigate } from 'react-router-dom';

function Card({ creator }) {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/view/${creator.id}`);
  };

  const handleEdit = () => {
    navigate(`/edit/${creator.id}`);
  };

  return (
    <div className="card">
      {creator.imageURL && <img src={creator.imageURL} alt={creator.name} />}
      <h4>{creator.name}</h4>
      <p>{creator.description}</p>
      <a href={creator.url}>Visit Website</a>
      <br />

      <button onClick={handleViewDetails}>View Detail</button>
      <button onClick={handleEdit}>Edit</button>
    </div>
  );
}

export default Card;
