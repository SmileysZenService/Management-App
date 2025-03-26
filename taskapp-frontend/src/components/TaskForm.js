import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';

function TaskForm({ addTask }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Work');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = { id: Date.now(), title, description, category };
    addTask(newTask);
    setTitle('');
    setDescription('');
    setCategory('Work');
  };

  return (
    <section className="form-section">
      <h2>Add New Task</h2>
      <form onSubmit={handleSubmit} className="task-form">
        <div className="input-group">
          <input 
            type="text" 
            placeholder="Task Title" 
            value={title} 
            onChange={e => setTitle(e.target.value)}
            required 
          />
        </div>
        <div className="input-group">
          <textarea 
            placeholder="Task Description" 
            value={description} 
            onChange={e => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="input-group">
          <select value={category} onChange={e => setCategory(e.target.value)}>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Urgent">Urgent</option>
          </select>
        </div>
        <button type="submit" className="submit-btn">
          <FaPlus /> Add Task
        </button>
      </form>
    </section>
  );
}

export default TaskForm;
