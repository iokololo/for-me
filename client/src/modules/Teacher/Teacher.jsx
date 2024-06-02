import React from 'react';
import { useNavigate } from 'react-router-dom';

const TeacherCard = ({ teacher }) => {
 const name = teacher.name || '';

 const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/teachers/${teacher._id}`);
  };

    
  return (
    <div className="teacher-card" onClick={handleCardClick}>
      <img src={teacher.profilePicture} alt={name} className="teacher-image"/>
      <h3>{name}</h3>
      <p>{teacher.hourlyRate} per hour</p>
      <p>{teacher.skills.join(', ')}</p>
    </div>
  );
};

export default TeacherCard;
