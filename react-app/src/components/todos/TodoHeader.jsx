import { useState } from "react";
import Modal from "../ui/Modal";
import TodoFilter from "./TodoFilter";
import TodoForm from './TodoForm';

import { createPortal } from 'react-dom';

const TodoHeader = () => {

    const [openModal, open] = useState(false);

    return (
        <div className="flex items-center justify-between mb-2" id="task-control">
            <button 
                onClick={() => open(true)}
                className="px-6 py-2 font-semibold text-gray-100 bg-gray-800 border-none rounded cursor-pointer"
                data-cy="add-todo-button">할일 등록
            </button>

            {openModal && createPortal(
                <Modal onClose={() => open(false)}>
                    <TodoForm actionTitle={'등록'} onClose={() => open(false)} />
                </Modal>,
                document.body
            )}

            <TodoFilter />
        </div>
    )
}

export default TodoHeader;