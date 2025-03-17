import { PeliculasProvider } from './context/PeliculasContext';
import PeliculasList from './components/PeliculasList';

function App() {
  return (
    <PeliculasProvider>
      <PeliculasList />
    </PeliculasProvider>
  );
}

export default App;
