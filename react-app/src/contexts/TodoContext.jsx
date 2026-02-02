// 할일관리(Todo) 도메인과 관련된 컨텍스트들을 별도의 파일로 모아놓은 곳

import { createContext, useContext, useReducer } from "react";

// 더미 할일 데이터
const dummyTodos = [
  {
    id: 1,
    title: 'React 공부',
    summary: 'React를 공부한다.',
    category: 'TODO',
  },
  {
    id: 2,
    title: '점심 먹기',
    summary: '점심을 먹는다.',
    category: 'PROGRESS',
  },
  {
    id: 3,
    title: '커피 마시기',
    summary: '커피를 마신다.',
    category: 'DONE',
  }
];

// TODO: reducer 함수 구현
const reducer = (todos, action) => {
  const { data, category } = todos;
  
  switch (action.type) {
    case 'ADD': 
      const { newTodo } = action;
      return { data: [...data, newTodo], category };

    case 'UPDATE':
      const { updateTodo } = action;
      const updatedTodos = data.map(todo => todo.id === updateTodo.id ? { ...updateTodo } : todo);
      return { data: updatedTodos, category }

    case 'DELETE': 
      const { id } = action;
      const deletedTodos = data.filter(todo => todo.id !== id);
      return { data: deletedTodos, category } 

    case 'FILTER':  
      return { data, category: action.selectedCategory }
  }
}

// 1. 할일 데이터를 제공하는 컨텍스트 (객체 생성)
export const TodoContext = createContext();
// 2. 할일 관련 이벤트 처리 함수를 제공하는 컨텍스트 (객체 생성)
export const TodoDispatchContext = createContext();

// TodoContext를 한번 감싸준(Wrapping) 컴포넌트(추상화 맥락)
export const TodoProvider = ({ children }) => {

    const [todos, dispatch] 
      = useReducer(reducer, { data: dummyTodos, category: 'ALL' });

    return (
        <TodoContext.Provider value={todos}>
          <TodoDispatchContext.Provider value={dispatch}>
            { children }
            {/* DefaultLayout과 동일한 방식(children props) */}
          </TodoDispatchContext.Provider>
        </TodoContext.Provider>
    )
}

// 외부에서 컨텍스트를 사용하기 편하게 추상화
  // useTodos - 할일 데이터만 제공받는 함수
export const useTodos = () => useContext(TodoContext);
  // useTodosDispatch - 할일과 관련된 이벤트 처리(dispatch)를 제공하는 함수
export const useTodosDispatch = () => useContext(TodoDispatchContext);