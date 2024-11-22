import React, { useState } from 'react';
import axios from 'axios';

const StudentForm = () => {
  const [student, setStudent] = useState({
    FirstName: '',
    LastName: '',
    BirthDate: '',
    Email: '',
    PhoneNumber: '',
    Address: ''
  });

  const handleChange = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://your-server.com/api/students', student)
      .then(response => alert('Студент успешно зарегистрирован!'))
      .catch(error => console.error('Ошибка при регистрации студента:', error));
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Register Student</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="FirstName"
          placeholder="First Name"
          value={student.FirstName}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
        <input
          type="text"
          name="LastName"
          placeholder="Last Name"
          value={student.LastName}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
        <input
          type="date"
          name="BirthDate"
          value={student.BirthDate}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
        <input
          type="email"
          name="Email"
          placeholder="Email"
          value={student.Email}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
        <input
          type="text"
          name="PhoneNumber"
          placeholder="Phone Number"
          value={student.PhoneNumber}
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <input
          type="text"
          name="Address"
          placeholder="Address"
          value={student.Address}
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Submit</button>
      </form>
    </div>
  );
};

export default StudentForm;
