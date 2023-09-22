import { withProviders } from './providers';
import { Routing } from 'pages';
import './styles/index.css';

const App = () => {
  return (
    <div className="app bg-gray-700 text-slate-50 min-h-screen">
      <h1 className="visually-hidden">Demo for JSONPlaceholder API</h1>
      <Routing />
    </div>
  );
};

export default withProviders(App);
