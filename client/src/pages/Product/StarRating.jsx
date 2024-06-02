const StarRating = ({ rating, setRating }) => {
    const changeRating = (newRating) => {
      setRating(newRating);
    };
  
    return (
      <div>
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            onClick={() => changeRating(star)}
            style={{ cursor: 'pointer', fontSize: '24px' }}
          >
            {rating >= star ? '★' : '☆'}
          </span>
        ))}
      </div>
    );
  };
  
  export default StarRating;
  