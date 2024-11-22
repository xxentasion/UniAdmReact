import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosInstance';
import CourseList from '../components/CourseList';

const Courses = () => {
  const [faculties, setFaculties] = useState([]);
  const [facultyID, setFacultyID] = useState('');
  const [faculty, setFaculty] = useState(null);

  useEffect(() => {
    const fetchFaculties = async () => {
        try {
            const data = await axiosInstance.get('/faculties');
            setFaculties(data);
        } catch (error) {
            console.error('Ошибка при получении данных:', error);
        }
    };

    fetchFaculties();
  }, []);

  useEffect(() => {
    const fetchFaculty = async () => {
      try {
        const response = await axiosInstance.get(`/faculties/${facultyID}`);
        setFaculty(response);
      } catch (error) {
        console.error('Ошибка при загрузке факультета:', error);
      }
    };
  
    if (facultyID) {
      fetchFaculty();
    }
  }, [facultyID]);

  return (
    <div className="flex flex-col gap-4">
      <div className='flex gap-2 items-center'>
        <span>Программы факультета:</span>
        <select
          value={facultyID}
          onChange={(e) => setFacultyID(e.target.value)}
          required
          className="p-2 border border-gray-300 rounded"
        >
          <option value="">Выберите факультет</option>
          {faculties.length > 0 ? (
            faculties.map((faculty) => (
              <option key={faculty.facultyID} value={faculty.facultyID}>
                {faculty.facultyName}
              </option>
            ))
          ) : (
            <option disabled>Нет доступных факультетов</option>
          )}
        </select>
      </div>
      {facultyID && faculty && <CourseList courses={faculty.courses} />}
    </div>
  );
};

export default Courses;
