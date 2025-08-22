import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import Swal from 'sweetalert2';

const HeroesComponent = () => {
  const endpoint = 'https://crud-heroes-service.vercel.app/api';
  const [heroes, setHeroes] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    getHeroes();
  }, []);

  const getHeroes = async () => {
    setCargando(true);
    setError(null);

    try {
      const response = await axios.get(`${endpoint}/heroes`);

      if (response.status === 200) {
        // Asumiendo que tu backend devuelve un array de héroes directamente
        // o un objeto con una propiedad que contiene el array
        const heroesData = Array.isArray(response.data) ? response.data : response.data.heroes || [];
        setHeroes(heroesData);
      }
    } catch (error) {
      console.error('Error al obtener héroes:', error);
      setError('Error al cargar los héroes. Por favor, intenta de nuevo.');

      // Mostrar error con SweetAlert2
      Swal.fire({
        title: 'Error',
        text: 'No se pudieron cargar los héroes. Verifica tu conexión.',
        icon: 'error',
        confirmButtonText: 'Entendido',
      });
    } finally {
      setCargando(false);
    }
  };

  const borrarHeroe = async heroeId => {
    try {
      const result = await Swal.fire({
        title: '¿Estás seguro?',
        text: 'Una vez eliminado, no podrás recuperar este héroe.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar',
      });

      if (result.isConfirmed) {
        setCargando(true);

        // Llamada DELETE al endpoint correcto para tu backend
        const response = await axios.delete(`${endpoint}/heroes/${heroeId}`);

        if (response.status === 200 || response.status === 204) {
          // Mostrar mensaje de éxito
          await Swal.fire({
            title: '¡Eliminado!',
            text: 'El héroe ha sido eliminado correctamente.',
            icon: 'success',
            timer: 2000,
            showConfirmButton: false,
          });

          // Recargar la lista de héroes
          await getHeroes();
        }
      }
    } catch (error) {
      console.error('Error al eliminar héroe:', error);

      // Mostrar error
      Swal.fire({
        title: 'Error',
        text: 'No se pudo eliminar el héroe. Intenta de nuevo.',
        icon: 'error',
        confirmButtonText: 'Entendido',
      });
    } finally {
      setCargando(false);
    }
  };

  return (
    <>
      <h1>Listado de Héroes</h1>
      <hr />

      <div className="row">
        <div className="col text-right">
          <Link to="/heroe/nuevo" className="btn btn-outline-primary" title="Alta">
            <FontAwesomeIcon icon="plus" /> Nuevo
          </Link>
        </div>
      </div>

      {/* Mostrar error si existe */}
      {error && (
        <div className="alert alert-danger mt-3">
          <FontAwesomeIcon icon="exclamation-triangle" className="me-2" />
          {error}
        </div>
      )}

      {/* Tabla de héroes */}
      {!cargando && heroes.length > 0 && (
        <table className="table mt-3">
          <thead className="bg-custom">
            <tr>
              <th scope="col">Nombre</th>
              <th scope="col">Poder</th>
              <th scope="col">Estado</th>
              <th scope="col" colSpan="2" className="text-center">
                Opciones
              </th>
            </tr>
          </thead>
          <tbody>
            {heroes.map(heroe => (
              <tr key={heroe._id || heroe.id}>
                <td>{heroe.nombre}</td>
                <td>{heroe.poder}</td>
                <td>
                  {heroe.estado === true ? (
                    <FontAwesomeIcon icon="thumbs-up" className="text-success fa-2x" title="Vivo" />
                  ) : (
                    <FontAwesomeIcon icon="thumbs-down" className="text-danger fa-2x" title="Muerto" />
                  )}
                </td>
                <td className="text-center">
                  <Link
                    to={`/heroe/${heroe._id || heroe.id}`}
                    className="btn btn-outline-warning mx-1"
                    title="Modificar">
                    <FontAwesomeIcon icon="edit" />
                  </Link>
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => borrarHeroe(heroe._id || heroe.id)}
                    title="Eliminar"
                    disabled={cargando}>
                    <FontAwesomeIcon icon="trash" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="5" className="bg-custom">
                <span>
                  <i>Copyright© - Carlos Mur</i>
                </span>
              </td>
            </tr>
          </tfoot>
        </table>
      )}

      {/* Mensaje cuando no hay registros */}
      {!cargando && heroes.length === 0 && !error && (
        <div className="alert alert-warning text-center mt-3">
          <h4 className="alert-heading">No hay registros</h4>
          <p>
            <FontAwesomeIcon icon="exclamation" className="fa-2x" />
          </p>
          <p className="mb-0">No se encontraron héroes registrados.</p>
        </div>
      )}

      {/* Indicador de carga */}
      {cargando && (
        <div className="alert alert-info text-center mt-3">
          <h4 className="alert-heading">Cargando</h4>
          <p>
            <FontAwesomeIcon icon="spinner" className="fa-spin fa-2x" />
          </p>
          <p className="mb-0">Espere por favor...</p>
        </div>
      )}
    </>
  );
};

export default HeroesComponent;
