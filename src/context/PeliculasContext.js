import { createContext, useEffect, useState } from "react";

export const PeliculasContext = createContext();

export const PeliculasProvider = ({children}) => {
    const [peliculas, setPeliculas] = useState([]);

    useEffect(() => {
        fetch('peliculas.json')
        .then(res => res.json())
        .then(data => {
            // Calculamos la puntuación media para cada película individualmente
            const peliculasConPuntuacion = data.map(pelicula => {
                const valoraciones = pelicula.valoraciones || [];
                const puntuacionMedia = valoraciones.length > 0
                    ? valoraciones.reduce((sum, val) => sum + val.puntuacion, 0) / valoraciones.length
                    : 0;
                
                return {
                    ...pelicula,
                    puntuacionMedia: puntuacionMedia.toFixed(1)
                };
            });
            
            setPeliculas(peliculasConPuntuacion);
        })
        .catch(error => console.error("Error al cargar el JSON:", error));
    }, []);
    

    

    const agregarComentario = (peliculaId, nuevoComentario) => {
        setPeliculas(peliculasActuales => 
          peliculasActuales.map(pelicula => {
            if (pelicula.id === peliculaId) {
              const valoracionesActualizadas = [
                ...(pelicula.valoraciones || []),
                nuevoComentario
              ];
              
              // Recalcular puntuación media
              const puntuacionMedia = valoracionesActualizadas.length > 0
                ? valoracionesActualizadas.reduce((sum, val) => sum + val.puntuacion, 0) / valoracionesActualizadas.length
                : 0;
              
              return {
                ...pelicula,
                valoraciones: valoracionesActualizadas,
                puntuacionMedia: puntuacionMedia.toFixed(1)
              };
            }
            return pelicula;
          })
        );
      };
    
      // Función para eliminar un comentario
      const eliminarComentario = (peliculaId, comentarioIndex) => {
        setPeliculas(peliculasActuales => 
          peliculasActuales.map(pelicula => {
            if (pelicula.id === peliculaId && pelicula.valoraciones) {
              const valoracionesActualizadas = pelicula.valoraciones.filter((_, index) => index !== comentarioIndex);
              
              // Recalcular puntuación media
              const puntuacionMedia = valoracionesActualizadas.length > 0
                ? valoracionesActualizadas.reduce((sum, val) => sum + val.puntuacion, 0) / valoracionesActualizadas.length
                : 0;
              
              return {
                ...pelicula,
                valoraciones: valoracionesActualizadas,
                puntuacionMedia: puntuacionMedia.toFixed(1)
              };
            }
            return pelicula;
          })
        );
      };


    return (
        <PeliculasContext.Provider value={{peliculas, agregarComentario, eliminarComentario}}>    
            {children}
        </PeliculasContext.Provider>
    )   

}
