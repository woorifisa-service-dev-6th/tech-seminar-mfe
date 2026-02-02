import { useState } from "react";
import TodoBody from "./components/todos/TodoBody"
import TodoHeader from "./components/todos/TodoHeader"
import DefaultLayout from "./layouts/DefaultLayout"
import Logo from "./components/ui/Logo"
import { TodoProvider } from "./contexts/TodoContext"
import NewModal from '@/components/ui/NewModal'
import TodoForm from "./components/todos/TodoForm";

function App() {
  return (
    <>
      <DefaultLayout>
        <Logo />

      <TodoProvider>
        <TodoHeader />
        <TodoBody />
      </TodoProvider>

      <NewModal>
        <NewModal.Open>
          <button className="px-6 py-2 font-semibold text-gray-100 bg-green-500 border-none rounded cursor-pointer">
            새로운 모달
          </button>
        </NewModal.Open>
        <NewModal.Dialog>
            <TodoForm actionTitle={'등록'}/>
        </NewModal.Dialog>
        
      </NewModal>
      </DefaultLayout>
    </>
  )
}

export default App
