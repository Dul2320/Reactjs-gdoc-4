import { useState } from 'react'
import './App.css'
import profilePic from './assets/profile.webp' 

function App() {

  const [isDarkMode, setIsDarkMode] = useState(false);

  const [inputText, setInputText] = useState('');

  const [tasks, setTasks] = useState([
    { id: 1, text: 'good', timestamp: Date.now() },
    { id: 2, text: 'morning', timestamp: Date.now() - 1000 }
  ]);

  const [isNewestFirst, setIsNewestFirst] = useState(true);



  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

 
  const addTask = () => {
    if (inputText.trim() === '') return;

    const newTask = {
      id: Date.now(), 
      text: inputText,
      timestamp: Date.now()
    };


    setTasks([...tasks, newTask]);
    setInputText(''); 
  };


  const deleteTask = (idToDelete) => {
   
    setTasks(tasks.filter((task) => task.id !== idToDelete));
  };

 
  const sortedTasks = [...tasks].sort((a, b) => {
    if (isNewestFirst) {
      return b.timestamp - a.timestamp;
    } else {
      return a.timestamp - b.timestamp; 
    }
  });


  return (
  
    <div className={`app-wrapper ${isDarkMode ? 'dark-mode' : ''}`}>
      
      <section className="app-container">
        
        
        <div className="card profile-section">
          <div className="profile-header">
            <img src={profilePic} alt="Avatar" className="avatar" />
            <div>
              <h2>Nama Saya</h2>
              <p className="role">Frontend Developer</p>
            </div>
          </div>
          <p className="bio">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorem
            voluptates eius nisi iusto error, quo illo, reprehenderit eum maiores
            facilis perspiciatis porro?
          </p>

          <button onClick={toggleTheme} className="btn btn-secondary">
            {isDarkMode ? '☀️ Switch to Light' : '🌙 Switch Mode'}
          </button>
        </div>

     
        <div className="card todo-section">
          <h3>My Tasks</h3>

          <div className="input-group">
            <input 
              type="text" 
              placeholder="Tulis tugas baru..." 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
             
              onKeyDown={(e) => e.key === 'Enter' && addTask()}
            />
            <button onClick={addTask} className="btn btn-primary">Add</button>
          </div>

          <button 
            onClick={() => setIsNewestFirst(!isNewestFirst)} 
            className="btn btn-secondary" 
            style={{ marginBottom: '15px', fontSize: '0.8rem' }}
          >
            Sort: {isNewestFirst ? 'Newest First' : 'Oldest First'}
          </button>

          <ul>
           
            {sortedTasks.map((task) => (
              <li key={task.id}>
                {task.text}
                <button 
                  onClick={() => deleteTask(task.id)} 
                  className="btn-delete"
                >
                  Delete
                </button>
              </li>
            ))}
            
           
            {sortedTasks.length === 0 && (
              <p style={{fontStyle: 'italic', color: 'var(--text-secondary)'}}>
                Tidak ada tugas.
              </p>
            )}
          </ul>
        </div>

      </section>
    </div>
  )
}

export default App