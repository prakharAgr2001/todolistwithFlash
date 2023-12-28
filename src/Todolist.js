import React,{UseState, useState,useEffect} from 'react'
import { toast, ToastContainer } from 'react-toastify';
import './Todolist.css'

function Todolist() {
    const [newTask,setNewTask]=useState('');
    const [tasks,setTasks]=useState([]);
    const [flash, setFlash] = useState(false);
    
    useEffect(() => {

        if (flash) {
          document.body.style.backgroundColor = '#ffcc00'; // Flash color
          setTimeout(() => {
            document.body.style.backgroundColor = ''; 
            setFlash(false);
          }, 10); 
        }
      }, [flash])
      useEffect(() => {
        // Display a notification when tasks are updated
       {
          notify('Task updated!');
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
    <div>
      <h1>Todo List</h1>
      <div className='btnInp'>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      
      <ul>
        {tasks.map((task) => (
            <li key={task.id} className={task.completed ? 'completed' : ''}>
           
          <div className='tet'>{task.text}</div>
          <div className="buttons">
            <button onClick={() => deleteTask(task.id)}>Delete</button>
            <button onClick={() => toggleComplete(task.id)}>
              {task.completed ? 'Undo' : 'Complete'}
            </button>
            </div>
           
          </li>
        ))}
      </ul>
      
    </div>
  )
}

export default Todolist
