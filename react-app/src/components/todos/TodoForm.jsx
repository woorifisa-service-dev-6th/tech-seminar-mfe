import { TODO_CATEGORY_ICON } from '@/constants/icon'
import { useState } from 'react';
import { useTodosDispatch } from '../../contexts/TodoContext';

const TodoForm = ({ actionTitle, onClose, todo }) => {

    const isNewTodoForm = actionTitle.startsWith('등록') ? true : false;

    const [title, setTitle] = useState(isNewTodoForm ? '' : todo.title);
    const [summary, setSummary] = useState(isNewTodoForm ? '' : todo.summary);
    const [category, setCategory] = useState(isNewTodoForm ? 'TODO' : todo.category);

    // useTodosDispatch()를 통해 dispatch 함수 불러오기
    const dispatch = useTodosDispatch();

    const todoActionHandler = () => {
        
        const updateTodo = {
            title: title,
            summary,
            category
        }

        if (!isNewTodoForm) { // 할일 수정일 경우,
            updateTodo.id = todo.id; // 할일 객체에 id 추가
            dispatch({ type: 'UPDATE', updateTodo: { id: todo.id, title, summary, category } });
        } else { // 할일 추가 로직일 경우,
            dispatch({ type: 'ADD', newTodo: { id: self.crypto.randomUUID(), title, summary, category } });
        }


        // 모달창 닫기
        onClose();
    }
    
    return (
        <>
            <h3 data-cy='todo-form-title' className="text-3xl text-red-200">할일 {actionTitle}</h3>
            <form className='my-2'>
                <div>
                    <label className='block mb-2 text-xl text-white' htmlFor='title'>Title</label>
                    <input 
                           value={title}
                           onChange={event => setTitle(event.target.value)}
                           className='w-full p-2 border-[1px] border-gray-300 bg-gray-200 text-gray-900 rounded' 
                           type='text' id='title' />
                </div>
                <div>
                    <label className='block mb-2 text-xl text-white' htmlFor='summary'>Summary</label>
                    <textarea 
                              value={summary}
                              onChange={event => setSummary(event.target.value)}
                              className='w-full p-2 border-[1px] border-gray-300 bg-gray-200 text-gray-900 rounded' 
                              id='summary' rows='5' />
                </div>
                <div>
                    <label className='block mb-2 text-xl text-white' htmlFor='category'>Category</label>
                    <select 
                            value={category}
                            onChange={event => setCategory(event.target.value)}
                            className='w-full p-2 border-[1px] border-gray-300 bg-gray-200 text-gray-900 rounded' 
                            id='category' >
                        <option value='TODO'>{TODO_CATEGORY_ICON.TODO} To do</option>
                        <option value='PROGRESS'>{TODO_CATEGORY_ICON.PROGRESS} On progress</option>
                        <option value='DONE'>{TODO_CATEGORY_ICON.DONE} Done</option>
                    </select>
                </div>

                <div className='flex justify-end gap-4'>
                    <button onClick={onClose} className='text-xl text-white' type='button'>취소</button>
                    <button data-cy='process-add-or-update' onClick={todoActionHandler}className='px-6 py-3 text-xl text-red-200' type='button'>{actionTitle}</button>
                </div>
            </form>
        </>
    )
};

export default TodoForm;