import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { selectAlbums } from '../store/albums/selectors';
import { selectPosts } from '../store/posts/selectors';
import { selectTasks } from '../store/tasks/selectors';

import { Header } from './Header';
import { Modal } from './Modal';

export const Layout = () => {
  const { error: albErr } = useSelector(selectAlbums);
  const { error: postErr } = useSelector(selectPosts);
  const { error: taskErr } = useSelector(selectTasks);

  const message = albErr || postErr || taskErr;
  const [isErr, setIsError] = useState(false);
  useEffect(() => {
    if (message) setIsError(true);
  }, [message]);
  return (
    <div className="layout flex flex-col min-h-screen mx-auto px-2 pt-2 max-w-6xl">
      {isErr && (
        <Modal
          title="error"
          close={() => {
            setIsError(false);
          }}
        >
          {message}
        </Modal>
      )}

      <Header></Header>
      <Outlet />
    </div>
  );
};
