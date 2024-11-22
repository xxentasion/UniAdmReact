import React, { useState, useEffect } from 'react';
import axiosInstance from '../axiosInstance';
import { useNavigate } from 'react-router-dom'; // Импортируем useNavigate

const ApplicationForm = () => {
  const [students, setStudents] = useState([]);
  const [faculties, setFaculties] = useState([]);
  const [faculty, setFaculty] = useState(null);
  const [studyForms, setStudyForms] = useState([]);
  const [financingForms, setFinancingForms] = useState([]);

  const [studentID, setStudentID] = useState('');
  const [facultyID, setFacultyID] = useState('');
  const [courseID, setProgramID] = useState('');
  const [studyFormID, setStudyFormID] = useState('');
  const [financingFormID, setFinancingFormID] = useState('');
  const [priorityOrder, setPriorityOrder] = useState(1);

  const navigate = useNavigate(); // Инициализируем navigate

  // Получение данных из бэкенда для выпадающих меню
  useEffect(() => {
    const fetch$values = async () => {
      try {
        const [studentsRes, facultiesRes, studyFormsRes, financingFormsRes] = await Promise.all([
          axiosInstance.get('/students'),
          axiosInstance.get('/faculties'),
          axiosInstance.get('/studyforms'),
          axiosInstance.get('/financingforms'),
        ]);

        setStudents(studentsRes ?? []);
        setFaculties(facultiesRes ?? []);
        setStudyForms(studyFormsRes ?? []);
        setFinancingForms(financingFormsRes ?? []);
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
      }
    };

    fetch$values();
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Дата должна быть в формате строки ISO
    const applicationDate = new Date().toISOString();
    
    // Все значения должны быть корректно заполнены
    if (!studentID || !facultyID || !courseID || !studyFormID || !financingFormID || !priorityOrder) {
      alert("Заполните все обязательные поля.");
      return;
    }

    const newApplication = {
      studentID,
      courseID,
      studyFormID,
      financingFormID,
      priorityOrder,
      applicationDate,
      status: "Pending"
    };

    try {
      console.log(newApplication);
      await axiosInstance.post('/applications', newApplication); // Добавляем новое заявление на сервер
      alert(`Заявление успешно создано`);
      navigate('/'); // Переход на страницу заявлений
    } catch (error) {
      console.error('Ошибка при создании заявления:', error);
      alert('Ошибка при создании заявления');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-1">Абитуриент</label>
        <select
          value={studentID}
          onChange={(e) => setStudentID(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="">Выберите абитуриента</option>
          {students.length > 0 ? (
            students.map((student) => (
              <option key={student.studentID} value={student.studentID}>
                {student.firstName} {student.lastName}
              </option>
            ))
          ) : (
            <option disabled>Нет доступных абитуриентов</option>
          )}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-1">Факультет</label>
        <select
          value={facultyID}
          onChange={(e) => setFacultyID(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded"
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
      {facultyID && <div className="mb-4">
        <label className="block text-sm font-semibold mb-1">Программа обучения</label>
        <select
          value={courseID}
          onChange={(e) => setProgramID(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="">Выберите программу</option>
          {faculty && faculty.courses && faculty.courses.length > 0 ? (
            faculty.courses.map((course) => (
              <option key={course.courseID} value={course.courseID}>
                {course.courseID} {course.courseName}
              </option>
            ))
          ) : (
            <option disabled>Нет доступных программ</option>
          )}
        </select>
      </div>}
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-1">Форма обучения</label>
        <select
          value={studyFormID}
          onChange={(e) => setStudyFormID(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="">Выберите форму обучения</option>
          {studyForms.length > 0 ? (
            studyForms.map((form) => (
              <option key={form.studyFormID} value={form.studyFormID}>
                {form.isFullForm ? 'Очная' : 'Заочная'}
              </option>
            ))
          ) : (
            <option disabled>Нет доступных форм обучения</option>
          )}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-1">Форма финансирования</label>
        <select
          value={financingFormID}
          onChange={(e) => setFinancingFormID(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="">Выберите форму финансирования</option>
          {financingForms.length > 0 ? (
            financingForms.map((form) => (
              <option key={form.financingFormID} value={form.financingFormID}>
                {form.isStateFunded ? 'Государственное финансирование' : 'Платное'}
              </option>
            ))
          ) : (
            <option disabled>Нет доступных форм финансирования</option>
          )}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-1">Приоритет</label>
        <input
          type="number"
          value={priorityOrder}
          onChange={(e) => setPriorityOrder(Number(e.target.value))}
          required
          min="1"
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
        Подать заявление
      </button>
    </form>
  );
};

export default ApplicationForm;
