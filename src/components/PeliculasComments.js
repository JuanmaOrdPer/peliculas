import React, { useContext, useState } from 'react';
import { Card, Button, Form, Container, Row, Col } from 'react-bootstrap';
import { PeliculasContext } from '../context/PeliculasContext';

export const PeliculasComments = ({ pelicula, comentarios = [], onClose }) => {
  const { agregarComentario, eliminarComentario } = useContext(PeliculasContext);
  const [comentarioActual, setComentarioActual] = useState(0);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  
  // Estados para el formulario
  const [nombre, setNombre] = useState('');
  const [puntuacion, setPuntuacion] = useState(5);
  const [comentario, setComentario] = useState('');

  if (!pelicula) return null;

  const handleSiguiente = () => {
    if (comentarios.length > 0) {
      setComentarioActual((comentarioActual + 1) % comentarios.length);
    }
  };

  const handleEliminar = () => {
    if (comentarios.length > 0) {
      eliminarComentario(pelicula.id, comentarioActual);
      // Si era el último comentario, ajustar el índice actual
      if (comentarioActual >= comentarios.length - 1 && comentarioActual > 0) {
        setComentarioActual(comentarioActual - 1);
      }
    }
  };

  const handleSubmitComentario = (e) => {
    e.preventDefault();
    
    const nuevoComentario = {
      usuario: nombre,
      puntuacion: parseInt(puntuacion),
      comentario: comentario
    };
    
    agregarComentario(pelicula.id, nuevoComentario);
    
    // Resetear formulario
    setNombre('');
    setPuntuacion(5);
    setComentario('');
    setMostrarFormulario(false);
  };

  const mostrarOcultarFormulario = () => {
    setMostrarFormulario(!mostrarFormulario);
  };

  return (
    <Container className="my-4">
      <Card className="shadow">
        <Card.Header className="d-flex justify-content-between align-items-center bg-primary text-white">
          <h5 className="mb-0">Comentarios: {pelicula.titulo}</h5>
          <Button variant="light" size="sm" onClick={onClose}>✕</Button>
        </Card.Header>

        <Card.Body>
          {comentarios.length > 0 ? (
            <>
              <Card className="mb-3">
                <Card.Body>
                  <Card.Title className="d-flex justify-content-between">
                    <span>{comentarios[comentarioActual].usuario}</span>
                    <span className="text-warning">Puntuacion: {comentarios[comentarioActual].puntuacion}</span>
                  </Card.Title>
                  <Card.Text>{comentarios[comentarioActual].comentario}</Card.Text>
                  <div className="text-muted small">
                    Comentario {comentarioActual + 1} de {comentarios.length}
                  </div>
                </Card.Body>
              </Card>

              <Row className="mt-3">
                <Col>
                  <Button 
                    variant="outline-primary" 
                    onClick={handleSiguiente}
                    disabled={comentarios.length <= 1}
                    className="me-2"
                  >
                    Siguiente Comentario
                  </Button>
                  <Button 
                    variant="outline-danger" 
                    onClick={handleEliminar}
                    className="me-2"
                  >
                    Eliminar Comentario
                  </Button>
                </Col>
              </Row>
            </>
          ) : (
            <div className="text-center p-4 text-muted">
              No hay comentarios disponibles para esta película
            </div>
          )}

          <hr className="my-3" />

          {!mostrarFormulario ? (
            <Button 
              variant="success" 
              onClick={mostrarOcultarFormulario}
              className="w-100"
            >
              Añadir Comentario
            </Button>
          ) : (
            <Card className="mt-3">
              <Card.Header>Nuevo Comentario</Card.Header>
              <Card.Body>
                <Form onSubmit={handleSubmitComentario}>
                  <Form.Group className="mb-3">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control 
                      type="text" 
                      value={nombre} 
                      onChange={(e) => setNombre(e.target.value)} 
                      required 
                    />
                  </Form.Group>
                  
                  <Form.Group className="mb-3">
                    <Form.Label>Puntuación (1-10)</Form.Label>
                    <Form.Select 
                      value={puntuacion} 
                      onChange={(e) => setPuntuacion(e.target.value)}
                    >
                      <option value="1">1 - Muy malo</option>
                      <option value="2">2 - Muy Malo</option>
                      <option value="3">3 - Malo</option>
                      <option value="4">4 - Malo</option>
                      <option value="5">5 - Bueno</option>
                      <option value="6">6 - Bueno</option>
                      <option value="7">7 - Excelente</option>
                      <option value="8">8 - Excelente</option>
                      <option value="9">9 - Obra Maestra</option>
                      <option value="10">10 - Obra Maestra</option>
                    </Form.Select>
                  </Form.Group>
                  
                  <Form.Group className="mb-3">
                    <Form.Label>Comentario</Form.Label>
                    <Form.Control 
                      as="textarea" 
                      rows={3} 
                      value={comentario} 
                      onChange={(e) => setComentario(e.target.value)} 
                      required 
                    />
                  </Form.Group>
                  
                  <div className="d-flex justify-content-end gap-2">
                    <Button variant="secondary" onClick={mostrarOcultarFormulario}>
                      Cancelar
                    </Button>
                    <Button variant="primary" type="submit">
                      Enviar Comentario
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};