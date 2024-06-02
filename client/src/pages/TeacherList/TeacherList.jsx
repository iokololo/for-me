import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TeacherCard from '../../modules/Teacher/Teacher';
import Pagination from '../../modules/Pagination/Pagination';
import AuthorService from '../../service/AuthorService';

export const TeachersList = () => {
  const [teachers, setTeachers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();


  useEffect(() => {
    const fetchTeachers = async () => {
        await new Promise(resolve => setTimeout(resolve, 1000));

        const data = await AuthorService.getAuthors(currentPage, 9, searchTerm).then(async (res) => {
          return res.data;
        });

        console.log("Authors: ", data)
      
        setTeachers(data.authors);
        setTotalPages(data.totalPages);
    };

    fetchTeachers();
  }, [currentPage, searchTerm]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleTeacherClick = (id) => {
    navigate(`/teachers/${id}`);
  };
  

  return (
    <div>
      <input
        type="text"
        placeholder="Search teachers..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-field"
      />
      <div className="teachers-container">
      {teachers.map(teacher => (
        <TeacherCard teacher={teacher} />
      ))}
      </div>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </div>
  );
};

