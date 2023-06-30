import { Route, Routes, BrowserRouter as Router, Navigate } from 'react-router-dom';

import { TasksPage } from '../pages/TasksPage';
import { AlbumsPage } from '../pages/AlbumsPage';
import { PostsPage } from '../pages/PostsPage';
import { Layout } from './Layout';
import { PhotosPage } from '../pages/PhotosPage';
import { ErrorPage } from '../pages/ErrorPage';

function App() {
  return (
    <div className="app bg-gray-700 text-slate-50 min-h-screen">
      <h1 className="visually-hidden">Demo for JSONPlaceholder API</h1>
      <Router>
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
      </Router>
    </div>
  );
}

export default App;
