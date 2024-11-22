import React from 'react';

const CourseList = ({ courses }) => {
  return (
    <div>
      <table className="w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600">Название курса</th>
            <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600">Описание</th>
            <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600">Продолжительность</th>
            <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600">Уровень</th>
          </tr>
        </thead>
        <tbody>
          {courses.map(course => (
            <tr key={course.courseID} className="border-b">
              <td className="py-2 px-4">{course.courseName}</td>
              <td className="py-2 px-4">{course.description}</td>
              <td className="py-2 px-4">{course.durationInYears} лет</td>
              <td className="py-2 px-4">{course.educationLevel}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CourseList;
