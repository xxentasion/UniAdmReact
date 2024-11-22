import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosInstance';

const Student = () => {
  const { studentId } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [applications, setApplications] = useState([]);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    birthDate: '',
    email: '',
    phoneNumber: '',
    address: ''
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await axiosInstance.get(`/students/${studentId}`);
        setStudent(response);
        setFormData({
          firstName: response.firstName,
          lastName: response.lastName,
          birthDate: response.birthDate,
          email: response.email,
          phoneNumber: response.phoneNumber,
          address: response.address
        });
        setApplications(response.applications);
      } catch (error) {
        console.error('Ошибка при загрузке данных абитуриента:', error);
      }
    };

    fetchStudent();
  }, [studentId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handlePriorityChange = (applicationId, newPriority) => {
    setApplications((prevApplications) =>
      prevApplications.map((app) =>
        app.applicationID === applicationId ? { ...app, priorityOrder: newPriority } : app
      )
    );
  };

  const handleSaveChanges = async () => {
    try {
      // Обновление данных абитуриента
      await axiosInstance.put(`/students/${studentId}`, formData);

      // Обновление приоритетов заявлений на сервере
      for (const app of applications) {
        await axiosInstance.put(`/applications/${app.applicationID}`, {
          ...app,
          priorityOrder: app.priorityOrder
        });
      }

      // Перезапрашиваем данные после успешного редактирования
      const response = await axiosInstance.get(`/students/${studentId}`);
      setStudent(response);
      setFormData({
        firstName: response.firstName,
        lastName: response.lastName,
        birthDate: response.birthDate,
        email: response.email,
        phoneNumber: response.phoneNumber,
        address: response.address
      });
      setApplications(response.applications);

      alert('Данные успешно обновлены');
      setIsEditing(false);
    } catch (error) {
      console.error('Ошибка при обновлении данных:', error);
    }
  };

  if (!student) return <div>Загрузка данных...</div>;

  return (
    <div>
      <div className='mb-4 flex justify-between'>
        <h1 className="text-2xl font-semibold">
          Данные абитуриента: {student.firstName} {student.lastName}
        </h1>

        <div className='flex gap-2'>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-4 py-2 bg-gray-800 text-white rounded"
          >
            {isEditing ? 'Отменить' : 'Редактировать'}
          </button>
          {isEditing && (
            <button onClick={handleSaveChanges} className="px-4 py-2 bg-gray-800 text-white rounded">
              Сохранить
            </button>
          )}
        </div>
      </div>

      <div className="mb-4 flex w-full gap-2">
        <div>
          <label className="block">Имя:</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            disabled={!isEditing}
            onChange={handleInputChange}
            className="border p-2 rounded w-full"
          />
        </div>
        <div>
          <label className="block">Фамилия:</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            disabled={!isEditing}
            onChange={handleInputChange}
            className="border p-2 rounded w-full"
          />
        </div>
        <div>
          <label className="block">Дата рождения:</label>
          <input
            type="date"
            name="birthDate"
            value={formData.birthDate.split('T')[0]}
            disabled={!isEditing}
            onChange={handleInputChange}
            className="border p-2 rounded w-full"
          />
        </div>
        <div>
          <label className="block">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            disabled={!isEditing}
            onChange={handleInputChange}
            className="border p-2 rounded w-full"
          />
        </div>
      </div>

      <div className="mb-4 flex w-full gap-2">
        <div>
          <label className="block">Номер телефона:</label>
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            disabled={!isEditing}
            onChange={handleInputChange}
            className="border p-2 rounded w-full"
          />
        </div>
        <div>
          <label className="block">Адрес:</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            disabled={!isEditing}
            onChange={handleInputChange}
            className="border p-2 rounded w-full"
          />
        </div>
      </div>

      <h2 className="text-xl font-semibold mt-8 mb-4">Заявления абитуриента</h2>
      <table className="table-auto w-full text-left border-collapse border border-gray-400">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">Программа</th>
            <th className="border border-gray-300 px-4 py-2">Факультет</th>
            <th className="border border-gray-300 px-4 py-2">Приоритет</th>
            <th className="border border-gray-300 px-4 py-2">Подано</th>
            <th className="border border-gray-300 px-4 py-2">Статус</th>
            <th className="border border-gray-300 px-4 py-2">Действие</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((application) => (
            <tr key={application.applicationID}>
              <td className="border border-gray-300 px-4 py-2">
                {application.course.courseName}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {application.course.faculty.facultyName}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <input
                  type="number"
                  value={application.priorityOrder}
                  disabled={!isEditing}
                  onChange={(e) => handlePriorityChange(application.applicationID, e.target.value)}
                  className="border p-1 rounded w-full"
                />
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {new Date(application.applicationDate).toLocaleDateString()}
              </td>
              <td className="border border-gray-300 px-4 py-2">{application.status}</td>
              <td className="border border-gray-300 px-4 py-2">
                <div className='flex gap-2'>
                  <button
                    onClick={() => navigate(`/application/${application.applicationID}`)}
                    className="px-2 py-1 bg-gray-800 text-white rounded"
                  >
                    Редактировать
                  </button>
                  <button
                    onClick={() => navigate(`/application/${application.applicationID}`)}
                    className="px-2 py-1 bg-red-800 text-white rounded"
                  >
                    Удалить
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Student;
