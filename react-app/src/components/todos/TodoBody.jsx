import React from 'react'
import TodoItem from './TodoItem'
import { useTodos } from '../../contexts/TodoContext'

const TodoBody = () => {

    const todos = useTodos();
    const filterTodos = (todos, selectedCategory) => selectedCategory === 'ALL' ? todos : todos.filter(todo => todo.category === selectedCategory);
    const filteredTodos = filterTodos(todos.data, todos.category);

    const todoList = filteredTodos.map(todo => <TodoItem todo={todo} key={todo.id} />)

  return (
    <>
      {todoList}
    </>
  )
}

export default TodoBody