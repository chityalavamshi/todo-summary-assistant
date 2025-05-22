import React, { useState } from 'react';
import axios from 'axios';

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [summary, setSummary] = useState('');

  const handleAddTodo = () => {
    if (newTodo.trim() !== '') {
      setTodos([...todos, newTodo]);
      setNewTodo('');
    }
  };

  const handleSummarize = async () => {
    try {
      const response = await axios.post('http://localhost:5000/summarize', {
        todos,
      });
      setSummary(response.data.summary);
    } catch (error) {
      console.error('Error summarizing todos:', error);
      setSummary('Failed to get summary.');
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Todo Summary Assistant</h1>
      
      <div className="flex mb-4">
        <input
          type="text"
          className="flex-1 border p-2 mr-2 rounded"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Enter a new todo"
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleAddTodo}
        >
          Add
        </button>
      </div>

      <ul className="list-disc list-inside mb-4">
        {todos.map((todo, index) => (
          <li key={index}>{todo}</li>
        ))}
      </ul>

      <button
        className="bg-green-500 text-white px-4 py-2 rounded mb-4"
        onClick={handleSummarize}
      >
        Generate Summary
      </button>

      {summary && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <h2 className="font-semibold mb-2">Summary:</h2>
          <p>{summary}</p>
        </div>
      )}
    </div>
  );
};

export default TodoApp;

