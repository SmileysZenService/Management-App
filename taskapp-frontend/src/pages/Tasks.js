import React, { useState, useEffect } from 'react';
import { FaTrashAlt, FaPlus, FaEdit, FaCheck } from 'react-icons/fa';
import './Tasks.css';

const Tasks = () => {
  // Lazy-load tasks from localStorage
  const [tasks, setTasks] = useState(() => {
    const stored = localStorage.getItem('tasks');
    return stored ? JSON.parse(stored) : [];
  });
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Work');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Modal state for editing a task
  const [editingTask, setEditingTask] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editCategory, setEditCategory] = useState('Work');

  // Save tasks to localStorage on change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (e) => {
    e.preventDefault();
    const newTask = { id: Date.now(), title, description, category, isCompleted: false };
    setTasks(prev => [...prev, newTask]);
    setTitle('');
    setDescription('');
    setCategory('Work');
  };

  const removeTask = (id) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const toggleComplete = (id) => {
    setTasks(prev =>
      prev.map(task => task.id === id ? { ...task, isCompleted: !task.isCompleted } : task)
    );
  };

  // Open modal for editing a task
  const openEditModal = (task) => {
    setEditingTask(task);
    setEditTitle(task.title);
    setEditDescription(task.description);
    setEditCategory(task.category);
  };

  const saveEdit = () => {
    setTasks(prev =>
      prev.map(task =>
        task.id === editingTask.id
          ? { ...task, title: editTitle, description: editDescription, category: editCategory }
          : task
      )
    );
    closeModal();
  };

  const closeModal = () => {
    setEditingTask(null);
    setEditTitle('');
    setEditDescription('');
    setEditCategory('Work');
  };

  const categories = ['All', 'Work', 'Personal', 'Urgent'];
  const filteredTasks = selectedCategory === 'All'
    ? tasks
    : tasks.filter(task => task.category === selectedCategory);

  return (
    <div className="tasks-page">
      <aside className="tasks-sidebar">
        <h2>Categories</h2>
        <ul>
          {categories.map(cat => (
            <li
              key={cat}
              className={selectedCategory === cat ? 'active' : ''}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </li>
          ))}
        </ul>
      </aside>
      <main className="tasks-main">
        <div className="tasks-list">
          {filteredTasks.length === 0 ? (
            <p className="no-tasks">No tasks available.</p>
          ) : (
            filteredTasks.map(task => (
              <div key={task.id} className="task-card">
                <div className="task-info">
                  <h3 style={{ textDecoration: task.isCompleted ? 'line-through' : 'none' }}>
                    {task.title}
                  </h3>
                  <p style={{ textDecoration: task.isCompleted ? 'line-through' : 'none' }}>
                    {task.description}
                  </p>
                  <span className="task-cat">{task.category}</span>
                </div>
                <div className="task-actions">
                  <button className="action-btn complete-btn" onClick={() => toggleComplete(task.id)}>
                    <FaCheck color={task.isCompleted ? 'green' : 'gray'} />
                  </button>
                  <button className="action-btn edit-btn" onClick={() => openEditModal(task)}>
                    <FaEdit />
                  </button>
                  <button className="action-btn remove-btn" onClick={() => removeTask(task.id)}>
                    <FaTrashAlt />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="tasks-form">
          <h2> </h2>
          <div className="task-form-container">
            <form onSubmit={addTask} className="task-form">
              <input 
                type="text" 
                placeholder="Task Title" 
                value={title} 
                onChange={e => setTitle(e.target.value)}
                required
              />
              <textarea 
                placeholder="Task Description" 
                value={description} 
                onChange={e => setDescription(e.target.value)}
                required
              ></textarea>
              <select value={category} onChange={e => setCategory(e.target.value)}>
                <option value="Work">Work</option>
                <option value="Personal">Personal</option>
                <option value="Urgent">Urgent</option>
              </select>
              <button type="submit" className="submit-btn">
                <FaPlus /> Add Task
              </button>
            </form>
          </div>
        </div>
      </main>

      {/* Modal for editing a task */}
      {editingTask && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h2>Edit Task</h2>
            <input 
              type="text" 
              value={editTitle}
              onChange={e => setEditTitle(e.target.value)}
              placeholder="Task Title"
              required
            />
            <textarea 
              value={editDescription}
              onChange={e => setEditDescription(e.target.value)}
              placeholder="Task Description"
              required
            ></textarea>
            <select value={editCategory} onChange={e => setEditCategory(e.target.value)}>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Urgent">Urgent</option>
            </select>
            <div className="modal-actions">
              <button onClick={saveEdit} className="modal-btn save-btn">Save</button>
              <button onClick={closeModal} className="modal-btn cancel-btn">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tasks;
