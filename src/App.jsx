import { useRoutes, Link } from 'react-router-dom';

import AddCreator from './pages/AddCreator';
import EditCreator from './pages/EditCreator';
import ShowCreators from './pages/ShowCreators';
import ViewCreator from './pages/ViewCreator';

import './App.css';

const Header = () => (
  <header>
    <h1>Creatorverse</h1>
    <nav>
      <li>
        <Link to="/">View All Creators</Link>
      </li>
      <li>
        <Link to="/add">Add a Creator</Link>
      </li>
    </nav>
  </header>
);

const App = () => {
  let routes = useRoutes([
    { path: '/', element: <ShowCreators /> },
    { path: 'add', element: <AddCreator /> },
    { path: 'view/:id', element: <ViewCreator /> },
    { path: 'edit/:id', element: <EditCreator /> },
  ]);

  return (
    <div>
      <Header />
      {routes}
    </div>
  );
};

export default App;
