import React from 'react'

const Modal = ({ children, onClose }) => {
  
  return (
    <>
        {/* Modal 배경 흐릿한(blur) 부분 */}
        <div 
          onClick={onClose}
          data-cy="modal-backdrop" 
          className='fixed top-0 left-0 w-full h-full backdrop-blur-md z-1'></div>

        {/* Modal dialog 부분 */}
        <div className='fixed z-10 w-1/2 p-8 m-0 transform -translate-x-1/2 -translate-y-1/2 border-none rounded shadow-xl top-1/2 left-1/2 bg-slate-500'>
            {children}
        </div>
    </>
  )
}

export default Modal