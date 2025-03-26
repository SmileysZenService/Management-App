import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <section className="hero">
        <h1>Welcome to Ultimate Task Manager</h1>
        <p>Where productivity meets artistry.</p>
        <a href="/tasks" className="cta-btn">View Your Tasks</a>
      </section>
    </div>
  );
};

export default Home;
