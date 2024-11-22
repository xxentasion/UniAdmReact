import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosInstance';

const Faculties = () => {
    const [faculties, setFaculties] = useState([]);
    const [newFacultyName, setNewFacultyName] = useState('');
    const [newFacultyDescription, setNewFacultyDescription] = useState('');

    // Получение данных
    useEffect(() => {
        const fetchFaculties = async () => {
            try {
                const response = await axiosInstance.get('/faculties');
                setFaculties(response);
            } catch (error) {
                console.error('Ошибка при получении данных:', error);
            }
        };

        fetchFaculties();
    }, []);

    // Отправка данных
    const handleAddFaculty = async (e) => {
        e.preventDefault();
        try {
            const newFaculty = {
                facultyName: newFacultyName,
                description: newFacultyDescription,
            };
            await axiosInstance.post('/faculties', newFaculty);
            setFaculties((prev) => [...prev, newFaculty]);
            setNewFacultyName('');
            setNewFacultyDescription('');
        } catch (error) {
            console.error('Ошибка при добавлении факультета:', error);
        }
    };

    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Добавить новый факультет</h2>
            <form onSubmit={handleAddFaculty} className="space-y-4 mb-6">
                <input
                    type="text"
                    value={newFacultyName}
                    onChange={(e) => setNewFacultyName(e.target.value)}
                    placeholder="Имя факультета"
                    required
                    className="border px-4 py-2 rounded w-full"
                />
                <input
                    type="text"
                    value={newFacultyDescription}
                    onChange={(e) => setNewFacultyDescription(e.target.value)}
                    placeholder="Описание"
                    required
                    className="border px-4 py-2 rounded w-full"
                />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    Добавить факультет
                </button>
            </form>
            <h1 className="text-2xl font-bold mb-4">Список Факультетов</h1>
            <table className="min-w-full bg-white border">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-100 text-left font-semibold text-gray-600">Имя Факультета</th>
                        <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-100 text-left font-semibold text-gray-600">Описание</th>
                    </tr>
                </thead>
                <tbody>
                    {faculties.map((faculty, index) => (
                        <tr key={index} className="border-b">
                            <td className="py-2 px-4">{faculty.facultyName}</td>
                            <td className="py-2 px-4">{faculty.description}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Faculties;
