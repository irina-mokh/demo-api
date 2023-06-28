import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { IconBtn } from './IconBtn';

type ModalProps = {
  close: () => void,
  title: string,
  children: React.ReactNode,
};

export const Modal = ({ close, children, title }: ModalProps) => {
  const closeModal = () => {
    // e.stopPropagation();
    close();
  };

  useEffect(() => {
    const closeEsc = (e: KeyboardEvent) => {
      if (e.code === 'Escape') {
        close();
      }
    };
    document.addEventListener('keydown', closeEsc);
    return () => document.removeEventListener('keydown', close);
  }, []);

  const modalContent = (
    <div className="overlay absolute top-0 left-0 flex justify-center items-start w-full h-full bg-slate-300 bg-opacity-20 z-10 text-gray-50" onClick={closeModal}>
      <div className="popup bg-slate-700 min-w-[30%] mt-20" onClick={(e) => e.stopPropagation()}>
        <header className="popup__header flex justify-between items-center pl-5 py-2 font-bold bg-slate-800">
          {title && <h2>{title}</h2>}
          <IconBtn type="cancel" handler={closeModal} aria-label="close" />
        </header>
        <div className="popup__body p-4">{children}</div>
      </div>
    </div>
  );
  // eslint-disable-next-line prettier/prettier
  const root = document.getElementById('modal-root') as Element;
  return ReactDOM.createPortal(modalContent, root);
};
