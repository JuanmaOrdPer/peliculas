import React, { useContext, useState } from 'react';
import { Button, Card, Container, Navbar, Badge } from 'react-bootstrap';
import { PeliculasContext } from '../context/PeliculasContext';
import { PeliculasComments } from './PeliculasComments';

function PeliculasList() {
  const { peliculas, loading } = useContext(PeliculasContext);
  const [peliculaSeleccionada, setPeliculaSeleccionada] = useState(null);
  const [comentarios, setComentarios] = useState([]);
  const [mostrarComentarios, setMostrarComentarios] = useState(false);

  const handleComentarios = (pelicula) => {
    setPeliculaSeleccionada(pelicula);
    setComentarios(pelicula.valoraciones || []);
    setMostrarComentarios(true);
  };

  const handleCerrarComentarios = () => {
    setMostrarComentarios(false);
    setPeliculaSeleccionada(null);
  };

  // Definimos las categorías que queremos mostrar
  const categoriasRequeridas = ["Comedia", "Thriller", "Drama", "Aventura", "Ciencia Ficción"];

  if (loading) {
    return <div className="text-center p-5">Cargando películas...</div>;
  }

  if (!peliculas || peliculas.length === 0) {
    return <div className="text-center p-5">No hay películas disponibles</div>;
  }

  return (
    <Container fluid className="mt-3">
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand className='fw-bold fs-3 text-primary text-uppercase'>
            Lista de Películas
          </Navbar.Brand>
        </Container>
      </Navbar>
      
      <div className="container mt-3">
        {categoriasRequeridas.map((categoria) => {
          const peliculasEnCategoria = peliculas.filter(pelicula => 
            Array.isArray(pelicula.categoria)
              ? pelicula.categoria.includes(categoria)
              : pelicula.categoria === categoria
          );

          if (peliculasEnCategoria.length === 0) {
            return null;
          }

          return (
            <Card key={categoria} className="mb-4">
              <Card.Header className="fw-bold bg-light">{categoria}</Card.Header>
              <Card.Body>
                {peliculasEnCategoria.map((pelicula) => (
                  <Card key={pelicula.id} className="mb-3 shadow-sm">
                    <Card.Body>
                      <div className="d-flex flex-wrap">
                        <div className="me-3 mb-3">
                          <Card.Img
                            style={{ width: '120px', height: '180px', objectFit: 'cover' }}
                            src={pelicula.foto}
                            className='img-thumbnail'
                          />
                        </div>
                        <div className="flex-grow-1">
                          <div className="d-flex justify-content-between align-items-start">
                            <Card.Title>{pelicula.titulo} ({pelicula.año})</Card.Title>
                            <Badge bg="warning" text="dark" className="fs-6">
                              Puntuación Media: {pelicula.puntuacionMedia}
                            </Badge>
                          </div>
                          <Card.Text><strong>Director:</strong> {pelicula.director}</Card.Text>
                          <Card.Text><strong>Actores:</strong> {pelicula.actoresPrincipales.join(', ')}</Card.Text>
                          <Card.Text><strong>Sinopsis:</strong> {pelicula.sinopsis}</Card.Text>
                          <Button 
                            variant="primary" 
                            onClick={() => handleComentarios(pelicula)}
                            className="mt-2"
                          >
                            Ver Comentarios
                          </Button>
                          {mostrarComentarios && peliculaSeleccionada && (
        <PeliculasComments
          pelicula={peliculaSeleccionada}
          comentarios={comentarios}
          onClose={handleCerrarComentarios}
        />
      )}
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                ))}
              </Card.Body>
            </Card>
          );
        })}
      </div>
    </Container>
  );
}

export default PeliculasList;