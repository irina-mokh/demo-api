import { lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from 'shared/ui/Layout';

const AlbumsPage = lazy(() => import('./AlbumsPage'));
const ErrorPage = lazy(() => import('./ErrorPage'));
const PhotosPage = lazy(() => import('./PhotosPage'));
const PostsPage = lazy(() => import('./PostsPage'));
const TasksPage = lazy(() => import('./TasksPage'));

export const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="" element={<Navigate to="posts" replace />} />
        <Route path="posts" element={<PostsPage />} />
        <Route path="albums" element={<AlbumsPage />} />
        <Route path="albums/:id" element={<PhotosPage />} />
        <Route path="tasks" element={<TasksPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  );
};
