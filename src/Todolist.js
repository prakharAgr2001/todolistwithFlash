import React,{UseState, useState,useEffect} from 'react'
import { toast, ToastContainer } from 'react-toastify';
import './Todolist.css'

function Todolist() {
    const [newTask,setNewTask]=useState('');
    const [tasks,setTasks]=useState([]);
    const [flash, setFlash] = useState(false);
    const [cnt, setCnt] = useState(0);
    useEffect(() => {
       
        const storedTasks = JSON.parse(localStorage.getItem('tasks'));
        console.log('Stored Tasks:', storedTasks); 
        if (storedTasks && storedTasks.length > 0) {
          setTasks(storedTasks);
        }
      }, []);
      useEffect(() => {
        
        localStorage.setItem('tasks', JSON.stringify(tasks));
        console.log('Tasks Saved:', tasks);
      }, [tasks]);
    
    useEffect(() => {

        if (flash) {
          document.body.style.backgroundColor = '#5cb85c'; 
          setTimeout(() => {
            document.body.style.backgroundColor = ''; 
            setFlash(false);
          }, 100); 
        }
      }, [flash])
      useEffect(() => {
        
       {
        const count= tasks.filter((task)=>task.completed===true);
         setCnt(count.length);
        }
      }, [tasks]);
    
    const addTask= ()=>{
        if (newTask.trim() !== '') {
        setTasks([...tasks,{id:Date.now(),text:newTask,completed:false}]);
        setNewTask('');
    setFlash(true);
    }
        };

    const deleteTask= (taskID)=>{

        const updatedTask= tasks.filter((task)=>task.id!==taskID);
        setTasks(updatedTask);
    }
    const toggleComplete = (taskId) => {
        const updatedTasks = tasks.map(task =>
          task.id === taskId ? { ...task, completed: !task.completed } : task
        );
        setTasks(updatedTasks);
      };
      const notify = (message) => {
        toast.info(message, {
          position: 'top-right',
          autoClose: 5000000, // Close the notification after 5 seconds
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      };
  return (
    <div className='container'>
    <div className='headline'>
      <h1>Todo List  {cnt}</h1>
      <p>Tasks:{tasks.length} | Completed:{cnt}</p>
      </div>
      <div className='btnInp'>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button className='Add' onClick={addTask}>Add</button>
      </div>
      
      <ul>
        {tasks.map((task) => (
            <li key={task.id} className={task.completed ? 'completed' : ''}>
          <div className='btntext'>
          <div className='tet'>{task.text}</div>
          <div className="buttons">
            <button onClick={() => deleteTask(task.id)}>Delete</button>
            <button onClick={() => toggleComplete(task.id)}>
              {task.completed ? 'Undo' : 'Complete'}
            </button>
            </div>
            </div> 
           
          </li>
        ))}
      </ul>
      
    </div>
  )
}

export default Todolist
