import React, { cloneElement, createContext, useContext, useState } from 'react'
import { createPortal } from 'react-dom';

const ModalContext = createContext();

const NewModal = ({ children }) => {

    const [isOpen, open] = useState(false);
    const close = () => open(false);

  return (
    <ModalContext.Provider value={{ isOpen, open, close }}>
        { children }
    </ModalContext.Provider>
  )
}

const Open = ({ children }) => {
    const { open } = useContext(ModalContext);
    return cloneElement(children, { onClick: () => open(true)});
}

// JS에서 함수는 객체로 취급됨(Function)
// NewModal이라는 함수 객체의 프로퍼티에 Open이라는 함수를 할당
NewModal.Open = Open;


const Dialog = ({ children }) => {
  const { close, isOpen } = useContext(ModalContext);

    if (isOpen) {    
        return createPortal(
            <>
                <div onClick={close} data-cy="modal-backdrop" className="fixed top-0 left-0 w-full h-full backdrop-blur-md z-1">
                </div>
                
                <div className="fixed z-10 w-1/2 p-8 m-0 transform -translate-x-1/2 -translate-y-1/2 border-none rounded shadow-xl top-1/2 left-1/2 bg-slate-600">
                    <div>{cloneElement(children, { onClose: close })}</div>
                </div>
            </>,
            document.body
        )
    } else {
        return;
    }
}

NewModal.Dialog = Dialog;

export default NewModal