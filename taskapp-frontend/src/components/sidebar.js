import React from 'react';

function Sidebar({ selectedCategory, setSelectedCategory }) {
  const categories = ['All', 'Work', 'Personal', 'Urgent'];

  return (
    <aside className="sidebar">
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
  );
}

export default Sidebar;
