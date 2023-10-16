import { useRoutes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import {routes} from './routes'


function App() {
  const element = useRoutes(routes)
  return (
    <div>
      
      <Home />
      {element}
    </div>
  );
}

export default App;


