import { useState } from 'react';
import './App.css';
import { AddForm } from './components/AddForm';
import { EditForm } from './components/EditForm';

function App() {

  const [todos, setTodos] = useState([])
  const [id, setId] = useState(1)
  const [title, setTitle] = useState('')
  const [status, setStatus] = useState('未着手')
  const [detail, setDetail] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [todo, setTodo] = useState({})

  // inputに入力されたタイトルを取得
  const handleInputChange = (e) => {
    setTitle(e.target.value)
  }

  // selectで選択されたstatusを取得
  const handleSelectChange = (e) => {
    setStatus(e.target.value)
  }

  // textareaに入力されたdetailを取得
  const handleTextChange = (e) => {
    setDetail(e.target.value)
  }

  // 追加ボタンを押されたらtodosに加えてテキストボックスを初期化
  const handleSubmit = (e) => {
    e.preventDefault()

    setTodos([...todos, {
      id: id,
      title: title,
      status: status,
      detail: detail
    }])

    setTitle('')
    setStatus('未着手')
    setDetail('')
    setId((prevId) => prevId + 1)
  }

  // 削除ボタンを押されたときの処理
  const handleDeleteClick = (index) => {
    const newTodos = [...todos]
    newTodos.splice(index, 1)
    setTodos(newTodos)
  }

  // 編集ボタンを押された時の処理
  const handleEditClick = (index) => {
    setIsEditing(true)
    setTodo({ ...todos[index] })
  }

  // 編集後にOKボタンを押したときの処理
  const handleEditSubmit = (e) => {
    e.preventDefault()

    const updateTodo = {
      ...todo,
      title: title,
      status: status,
      detail: detail
    }

    const newTodos = todos.filter((item) => item.id !== todo.id)

    setTodos([...newTodos, updateTodo])

    setTitle('')
    setStatus('未着手')
    setDetail('')
    setIsEditing(false)
  }

  // // ↑ handleEditSubmit内に記述するとstateが反映されなかったためuseEffectで対応
  // useEffect(() => {
  //   const newTodos = todos.filter((item) => item.id !== todo.id)
  //   // 最初todoがない状態の時に実行しないようにif文
  //   if(id !== 1) setTodos([...newTodos, todo])
  // }, [todo])

  return (
    <>
      <div className='todo-item'>
        <h2>TODO</h2>
        <ul>
          {todos.map((todo, index) => {
            return (
              <li key={todo.id}>
                <div className='list-row'>
                  <p>{todo.id} :【{todo.status}】 <span>{todo.title}</span><br />　{todo.detail}</p>
                  <button onClick={() => handleEditClick(index)}>編集</button>
                  <button onClick={() => handleDeleteClick(index)}>削除</button>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
      {isEditing ? (
        <>
          <p className='edit-todo'>{todo.id} :【{todo.status}】 <span>{todo.title}</span><br />　{todo.detail}</p>
          <EditForm
            onSubmit={handleEditSubmit}
            onInputChange={handleInputChange}
            title={title}
            status={status}
            onSelectChange={handleSelectChange}
            detail={detail}
            onTextChange={handleTextChange} />
        </>
      ) : (
        <AddForm
          onSubmit={handleSubmit}
          onInputChange={handleInputChange}
          title={title}
          status={status}
          onSelectChange={handleSelectChange}
          detail={detail}
          onTextChange={handleTextChange}
        />
      )}
    </>
  );
}

export default App;
