import React, { useState, useEffect } from 'react';
import axiosInstance from '../axiosInstance';
import { Link, useNavigate } from 'react-router-dom';

const Applications = () => {
  const [applications, setApplications] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [searchPassport, setSearchPassport] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axiosInstance.get('/applications');
        setApplications(response);
      } catch (error) {
        console.error('Ошибка при загрузке заявлений:', error);
      }
    };

    fetchApplications();
  }, []);

  // Сортировка по фамилии
  const sortedApplications = [...applications].sort((a, b) => {
    const lastNameA = a.student.lastName.toLowerCase();
    const lastNameB = b.student.lastName.toLowerCase();
    return lastNameA.localeCompare(lastNameB);
  });

  // Фильтрация заявлений по имени/фамилии и номеру паспорта (по одному или нескольким параметрам)
  const filteredApplications = sortedApplications.filter(application => {
    const fullName = `${application.student.lastName} ${application.student.firstName}`.toLowerCase();
    const passport = `${application.student.studentID}`.toLowerCase();

    // Фильтрация по имени/фамилии ИЛИ по номеру паспорта
    const matchesName = fullName.includes(searchName.toLowerCase());
    const matchesPassport = passport.includes(searchPassport.toLowerCase());

    // Показать заявление, если соответствует хотя бы одно условие
    return (matchesName && matchesPassport);
  });

  const navigateToStudent = (studentId) => {
    navigate(`/students/${studentId}`);
  };

  return (
    <div className='flex flex-col'>
      <div className='flex w-full justify-between mb-4'>
        <Link to='new-application' className='p-2 bg-gray-800 rounded-md text-white'>
          Новое заявление
        </Link>
        <div className='flex gap-2'>
          <input
            type="text"
            placeholder="Поиск по фамилии или имени"
            className='border border-gray-300 p-2 rounded-md w-60'
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Поиск по номеру паспорта"
            className='border border-gray-300 p-2 rounded-md w-56'
            value={searchPassport}
            onChange={(e) => setSearchPassport(e.target.value)}
          />
        </div>
      </div>

      <div className='overflow-x-auto'>
        <table className='table-auto w-full text-left border-collapse border border-gray-400'>
          <thead>
            <tr className='bg-gray-200'>
              <th className='border border-gray-300 px-4 py-2'>Абитуриент</th>
              <th className='border border-gray-300 px-4 py-2'>Факультет</th>
              <th className='border border-gray-300 px-4 py-2'>Программа</th>
              <th className='border border-gray-300 px-4 py-2'>Приоритет</th>
            </tr>
          </thead>
          <tbody>
            {filteredApplications.length > 0 ? (
              filteredApplications.map((application) => (
                <tr key={application.applicationID}>
                  <td className='border border-gray-300 px-4 py-2 hover:cursor-pointer hover:underline' onClick={() => navigateToStudent(application.student.studentID)}>
                    {application.student.lastName} {application.student.firstName}
                  </td>
                  <td className='border border-gray-300 px-4 py-2'>
                    {application.course.faculty.facultyName}
                  </td>
                  <td className='border border-gray-300 px-4 py-2'>
                    {application.course.courseName}
                  </td>
                  <td className='border border-gray-300 px-4 py-2'>
                    {application.priorityOrder}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className='border border-gray-300 px-4 py-2 text-center'>
                  Нет доступных заявлений
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Applications;
