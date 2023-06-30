import { useState } from 'react';
import { IPhoto } from '../utils/types';
import { Modal } from './Modal';

export const Photo = ({ thumbnailUrl, url, title }: IPhoto) => {
  const [isModal, setIsModal] = useState(false);

  const closeModal = () => {
    setIsModal(false);
  };
  return (
    <li onClick={() => setIsModal(true)} className="thumb relative">
      <img src={thumbnailUrl} alt={title} className="block"></img>
      <p className="absolute inline-block bottom-0 max-w-[150px] min-w-full bg-gray-700 bg-opacity-80 text-ellipsis h-8 overflow-hidden whitespace-nowrap">
        {title}
      </p>
      {isModal && (
        <Modal title={title} close={closeModal}>
          <img src={url} alt={title} className="block bg-slate-400" width="600" height="600"></img>
        </Modal>
      )}
    </li>
  );
};
