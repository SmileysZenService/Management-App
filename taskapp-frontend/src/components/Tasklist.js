import React from 'react';
import { FaTrashAlt } from 'react-icons/fa';

function TaskList({ tasks, removeTask, selectedCategory }) {
  // Filter tasks by category if not "All"
  const filteredTasks = selectedCategory === 'All'
    ? tasks
    : tasks.filter(task => task.category === selectedCategory);

  if (filteredTasks.length === 0) {
    return <p className="no-tasks">No tasks available.</p>;
  }

  return (
    <div className="tasks-grid">
      {filteredTasks.map(task => (
        <div key={task.id} className="task-card">
          <div className="task-content">
            <h2>{task.title}</h2>
            <p>{task.description}</p>
            <p className="task-category">{task.category}</p>
          </div>
          <button className="remove-btn" onClick={() => removeTask(task.id)}>
            <FaTrashAlt />
          </button>
        </div>
      ))}
    </div>
  );
}

export default TaskList;
