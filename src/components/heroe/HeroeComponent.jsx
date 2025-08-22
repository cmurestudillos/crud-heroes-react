import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import Swal from 'sweetalert2';

const HeroeComponent = () => {
  const navigate = useNavigate();
  const endpoint = 'https://crud-heroes-service.vercel.app/api';
  const { id } = useParams();

  // Estados principales
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Estados del formulario
  const [formData, setFormData] = useState({
    nombre: '',
    poder: '',
    estado: true, // Por defecto "vivo"
  });

  useEffect(() => {
    // Determinar si estamos editando o creando
    if (id && id !== 'nuevo') {
      setIsEditing(true);
      getHeroeById(id);
    } else {
      setIsEditing(false);
      // Resetear formulario para nuevo héroe
      setFormData({
        nombre: '',
        poder: '',
        estado: true,
      });
    }
  }, [id]);

  const getHeroeById = async heroeId => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${endpoint}/heroes/${heroeId}`);

      if (response.status === 200 && response.data.heroe) {
        const heroe = response.data.heroe;
        setFormData({
          nombre: heroe.nombre || '',
          poder: heroe.poder || '',
          estado: heroe.estado !== undefined ? heroe.estado : true,
        });
      }
    } catch (error) {
      console.error('Error al obtener héroe:', error);
      setError('Error al cargar los datos del héroe');

      Swal.fire({
        title: 'Error',
        text: 'No se pudo cargar el héroe. Verifica que existe.',
        icon: 'error',
        confirmButtonText: 'Entendido',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEstadoChange = () => {
    setFormData(prev => ({
      ...prev,
      estado: !prev.estado,
    }));
  };

  const validateForm = () => {
    if (!formData.nombre.trim()) {
      Swal.fire({
        title: 'Validación',
        text: 'El nombre del héroe es obligatorio',
        icon: 'warning',
        confirmButtonText: 'Entendido',
      });
      return false;
    }

    if (!formData.poder.trim()) {
      Swal.fire({
        title: 'Validación',
        text: 'El poder del héroe es obligatorio',
        icon: 'warning',
        confirmButtonText: 'Entendido',
      });
      return false;
    }

    if (formData.nombre.length < 2) {
      Swal.fire({
        title: 'Validación',
        text: 'El nombre debe tener al menos 2 caracteres',
        icon: 'warning',
        confirmButtonText: 'Entendido',
      });
      return false;
    }

    return true;
  };

  const onSubmit = async e => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setError(null);

    try {
      let response;

      if (isEditing) {
        // Actualizar héroe existente
        response = await axios.put(`${endpoint}/heroes/${id}`, formData);

        if (response.status === 200 && response.data.message) {
          await Swal.fire({
            title: '¡Actualizado!',
            text: response.data.message,
            icon: 'success',
            timer: 2000,
            showConfirmButton: false,
          });
          navigate('/heroes');
        }
      } else {
        // Crear nuevo héroe
        response = await axios.post(`${endpoint}/heroes`, formData);

        if (response.status === 201 && response.data.message) {
          await Swal.fire({
            title: '¡Creado!',
            text: response.data.message,
            icon: 'success',
            timer: 2000,
            showConfirmButton: false,
          });
          navigate('/heroes');
        }
      }
    } catch (error) {
      console.error('Error al guardar héroe:', error);

      let errorMessage = 'Error al guardar el héroe';

      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response?.data?.errors) {
        errorMessage = error.response.data.errors.join(', ');
      }

      setError(errorMessage);

      Swal.fire({
        title: 'Error',
        text: errorMessage,
        icon: 'error',
        confirmButtonText: 'Entendido',
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading && isEditing) {
    return (
      <div className="text-center mt-5">
        <FontAwesomeIcon icon="spinner" className="fa-spin fa-3x text-primary" />
        <h4 className="mt-3">Cargando datos del héroe...</h4>
      </div>
    );
  }

  return (
    <div>
      <h1>
        {isEditing ? 'Editar' : 'Nuevo'} Héroe:
        <small className="text-muted">{formData.nombre || (isEditing ? 'Cargando...' : 'Nuevo héroe')}</small>
      </h1>
      <hr />

      <div className="row text-right mb-3">
        <div className="col">
          <Link to="/heroes" className="btn btn-outline-primary" title="Volver">
            <FontAwesomeIcon icon="arrow-left" /> Volver
          </Link>
        </div>
      </div>

      {error && (
        <div className="alert alert-danger">
          <FontAwesomeIcon icon="exclamation-triangle" className="me-2" />
          {error}
        </div>
      )}

      <div className="row">
        <div className="col-md-8 mx-auto">
          <form onSubmit={onSubmit}>
            {isEditing && (
              <div className="form-group mb-3">
                <label className="form-label">ID del Héroe</label>
                <input type="text" className="form-control" value={id} disabled />
                <small className="form-text text-muted">Este campo se genera automáticamente.</small>
              </div>
            )}

            <div className="form-group mb-3">
              <label className="form-label">Nombre *</label>
              <input
                type="text"
                className="form-control"
                placeholder="Ingresa el nombre del héroe"
                value={formData.nombre}
                onChange={handleInputChange}
                name="nombre"
                required
                maxLength="50"
                disabled={loading}
              />
              <small className="form-text text-muted">Mínimo 2 caracteres, máximo 50.</small>
            </div>

            <div className="form-group mb-3">
              <label className="form-label">Poder *</label>
              <input
                type="text"
                className="form-control"
                placeholder="Ingresa el poder del héroe"
                value={formData.poder}
                onChange={handleInputChange}
                name="poder"
                required
                maxLength="100"
                disabled={loading}
              />
              <small className="form-text text-muted">Mínimo 2 caracteres, máximo 100.</small>
            </div>

            <div className="form-group mb-4">
              <label className="form-label">Estado</label>
              <br />
              <button
                className={`btn ${formData.estado ? 'btn-success' : 'btn-outline-success'} mx-2`}
                type="button"
                onClick={handleEstadoChange}
                disabled={loading}>
                <FontAwesomeIcon icon="thumbs-up" className={formData.estado ? 'text-white' : 'text-success'} /> Vivo
              </button>

              <button
                className={`btn ${!formData.estado ? 'btn-danger' : 'btn-outline-danger'}`}
                type="button"
                onClick={handleEstadoChange}
                disabled={loading}>
                <FontAwesomeIcon icon="thumbs-down" className={!formData.estado ? 'text-white' : 'text-danger'} />{' '}
                Muerto
              </button>
            </div>

            <hr />

            <div className="form-group text-center">
              <button
                type="submit"
                className="btn btn-primary btn-lg px-5"
                disabled={loading}
                title={isEditing ? 'Actualizar héroe' : 'Crear héroe'}>
                {loading ? (
                  <>
                    <FontAwesomeIcon icon="spinner" className="fa-spin mx-2" />
                    {isEditing ? 'Actualizando...' : 'Creando...'}
                  </>
                ) : (
                  <>
                    <FontAwesomeIcon icon="save" className="mx-2" />
                    {isEditing ? 'Actualizar' : 'Crear'} Héroe
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HeroeComponent;
