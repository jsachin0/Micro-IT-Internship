import { useState } from 'react'
import './todo.css'

const TodoList = () => {
 const [value, setValue] = useState('')
  const [items, setItems] = useState([])
  const [isEdit, setIsEdit] = useState(null)

  const handleChange = (event) => {
    setValue(event.target.value)
  }

  const handleClick = () => {
    if(isEdit){
        setItems(prev => prev.map((e,i) => i+1 === isEdit ? value : e))
    }else{
        setItems(prev => ([...prev, value]))
    }
    setValue('');
    setIsEdit(null)
  }

  const handleDelete = (idx) => {
    setItems(prev => prev.map((e,i) => i === idx ? null : e).filter(e => e))
  }


  const handleEdit = (i) => {
    setIsEdit(i+1)
    setValue(items[i])
  }

  return (
    <div className="container">
        <div>
                <h1 className="todo_title">TODO APP</h1>
                <div className="input_container">
                 <input className="todo_input" type="text" placeholder="Enter Input" value={value} onChange={handleChange}/>
                 <button className="todo_button" onClick={handleClick}>{isEdit ? "Update" :"Add Todo"}  </button>
                </div>

                <div>
                    <ol className="todo_list_container">
                        {
                            items.filter(e => e).map((each,i) => {
                                return(
                                    <li key={each} className="todo_list_item">
                                        <div>{each}</div>
                                        <div className="todo_list_item_actions">
                                            <div><button onClick={() => handleEdit(i)}>Edit</button></div>
                                            <div><button onClick={() => handleDelete(i)}>Delete</button></div>
                                        </div>
                                    </li>
                                )
                            })
                        }

                    </ol>
                </div>
        </div>
    </div>
  )
}

export default TodoList