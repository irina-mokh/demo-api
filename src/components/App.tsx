import { Route, Routes, BrowserRouter as Router, Navigate } from 'react-router-dom';
import { TasksPage } from '../pages/TasksPage';
import { PhotosPage } from '../pages/PhotosPage';
import { PostsPage } from '../pages/PostsPage';
import { Layout } from './Layout';

function App() {
  return (
    <div className="app bg-gray-700 text-slate-50 min-h-screen">
      <h1 className="visually-hidden">Demo for JSONPlaceholder API</h1>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="" element={<Navigate to="posts" replace />} />
            <Route path="posts" element={<PostsPage />} />
            <Route path="photos" element={<PhotosPage />} />
            <Route path="tasks" element={<TasksPage />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
