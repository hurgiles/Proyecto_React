import React, { useState } from 'react';
import { TextField, Button, Container, Typography, MenuItem, FormGroup, FormControlLabel, Checkbox,} from '@mui/material';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import { CssBaseline, Switch } from '@mui/material';
import * as yup from 'yup';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';

const clienteSchema = yup.object().shape({
  nombre: yup.string().required('El nombre es requerido'),
  correo: yup.string().email('Ingrese un correo válido').required('El correo es requerido'),
  telefono: yup.string().required('El teléfono es requerido'),
  identificacionFiscal: yup.string().required('La identificación fiscal es requerida'),
  tipoIdentificacion: yup.string().required('El tipo de identificación es requerido'),
});

const vehiculoSchema = yup.object().shape({
  marca: yup.string().required('La marca del vehículo es requerida'),
  modelo: yup.string().required('El modelo del vehículo es requerido'),
  placa: yup.string().required('La placa del vehículo es requerida'),
  nivelGasolina: yup.number().required('El nivel de gasolina es requerido'),
  detalles: yup.string().required('Ingrese los detalles sobre el estado exterior del vehículo'),
});

const tiposIdentificacion = [
  { value: 'cedula', label: 'Cédula' },
  { value: 'ruc', label: 'RUC' },
  { value: 'pasaporte', label: 'Pasaporte' },
];

const serviciosDisponibles = [
  { id: 'cambioAceite', label: 'Cambio de Aceite' },
  { id: 'cambioFrenos', label: 'Cambio de Frenos' },
  { id: 'alineacionBalanceo', label: 'Alineación y Balanceo' },
  { id: 'diagnosticoGeneral', label: 'Diagnóstico General' },
  { id: 'revisionSistemaElectrico', label: 'Revisión del Sistema Eléctrico' },
  { id: 'revisionSuspension', label: 'Revisión de la Suspensión' },
];

const styles = {
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '2rem',
  },
  textField: {
    marginBottom: '1rem',
  },
  button: {
    marginTop: '1rem',
  },
  checkboxGroup: {
    marginTop: '1rem',
  },
};

const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function ClienteForm() {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [identificacionFiscal, setIdentificacionFiscal] = useState('');
  const [tipoIdentificacion, setTipoIdentificacion] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await clienteSchema.validate(
        {
          nombre,
          correo,
          telefono,
          identificacionFiscal,
          tipoIdentificacion,
        },
        { abortEarly: false }
      );

      console.log('Datos del cliente:', {
        nombre,
        correo,
        telefono,
        identificacionFiscal,
        tipoIdentificacion,
      });

      // Redireccionar a la página del formulario de vehículo
      navigate('/vehiculo');
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const validationErrors = {};
        error.inner.forEach((err) => {
          validationErrors[err.path] = err.message;
        });
        setErrors(validationErrors);
      }
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4">Cliente</Typography>

      <form style={styles.formContainer} onSubmit={handleSubmit}>
        <TextField
          label="Nombre"
          variant="outlined"
          style={styles.textField}
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          error={!!errors.nombre}
          helperText={errors.nombre}
        />

        <TextField
          label="Correo Electrónico"
          variant="outlined"
          style={styles.textField}
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          error={!!errors.correo}
          helperText={errors.correo}
        />

        <TextField
          label="Teléfono"
          variant="outlined"
          style={styles.textField}
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
          error={!!errors.telefono}
          helperText={errors.telefono}
        />

        <TextField
          select
          label="Tipo de Identificación"
          variant="outlined"
          style={styles.textField}
          value={tipoIdentificacion}
          onChange={(e) => setTipoIdentificacion(e.target.value)}
          error={!!errors.tipoIdentificacion}
          helperText={errors.tipoIdentificacion}
        >
          {tiposIdentificacion.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label="Identificación Fiscal"
          variant="outlined"
          style={styles.textField}
          value={identificacionFiscal}
          onChange={(e) => setIdentificacionFiscal(e.target.value)}
          error={!!errors.identificacionFiscal}
          helperText={errors.identificacionFiscal}
        />

        <Button type="submit" variant="contained" color="primary" style={styles.button}>
          Siguiente
        </Button>
      </form>
    </Container>
  );
}

function VehiculoForm() {
  const navigate = useNavigate();
  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [placa, setPlaca] = useState('');
  const [nivelGasolina, setNivelGasolina] = useState('');
  const [detalles, setDetalles] = useState('');
  const [serviciosSeleccionados, setServiciosSeleccionados] = useState([]);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await vehiculoSchema.validate(
        {
          marca,
          modelo,
          placa,
          nivelGasolina,
          detalles,
        },
        { abortEarly: false }
      );

      console.log('Datos del vehículo:', {
        marca,
        modelo,
        placa,
        nivelGasolina,
        detalles,
        serviciosSeleccionados,
      });

      // Redireccionar a la página de éxito/orden de trabajo
      navigate('/exito');
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const validationErrors = {};
        error.inner.forEach((err) => {
          validationErrors[err.path] = err.message;
        });
        setErrors(validationErrors);
      }
    }
  };

  const handleServicioCheckboxChange = (event) => {
    const servicioId = event.target.name;
    if (event.target.checked) {
      setServiciosSeleccionados((prevSelected) => [...prevSelected, servicioId]);
    } else {
      setServiciosSeleccionados((prevSelected) =>
        prevSelected.filter((selectedId) => selectedId !== servicioId)
      );
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4">Vehículo</Typography>

      <form style={styles.formContainer} onSubmit={handleSubmit}>
        <TextField
          label="Marca"
          variant="outlined"
          style={styles.textField}
          value={marca}
          onChange={(e) => setMarca(e.target.value)}
          error={!!errors.marca}
          helperText={errors.marca}
        />

        <TextField
          label="Modelo"
          variant="outlined"
          style={styles.textField}
          value={modelo}
          onChange={(e) => setModelo(e.target.value)}
          error={!!errors.modelo}
          helperText={errors.modelo}
        />

        <TextField
          label="Placa"
          variant="outlined"
          style={styles.textField}
          value={placa}
          onChange={(e) => setPlaca(e.target.value)}
          error={!!errors.placa}
          helperText={errors.placa}
        />

        <TextField
          label="Nivel de Gasolina"
          variant="outlined"
          style={styles.textField}
          value={nivelGasolina}
          onChange={(e) => setNivelGasolina(e.target.value)}
          error={!!errors.nivelGasolina}
          helperText={errors.nivelGasolina}
        />

        <TextField
          label="Detalles"
          variant="outlined"
          style={styles.textField}
          value={detalles}
          onChange={(e) => setDetalles(e.target.value)}
          error={!!errors.detalles}
          helperText={errors.detalles}
          multiline
          rows={4}
        />

        <FormGroup style={styles.checkboxGroup}>
          {serviciosDisponibles.map((servicio) => (
            <FormControlLabel
              key={servicio.id}
              control={
                <Checkbox
                  checked={serviciosSeleccionados.includes(servicio.id)}
                  onChange={handleServicioCheckboxChange}
                  name={servicio.id}
                />
              }
              label={servicio.label}
            />
          ))}
        </FormGroup>

        <Button type="submit" variant="contained" color="primary" style={styles.button}>
          Siguiente
        </Button>
      </form>
    </Container>
  );
}

function OrdenTrabajo() {
  const [fechaEntrega] = useState(new Date());
  return (
    <Container maxWidth="sm">
      <Typography variant="h4">Orden de Trabajo</Typography>

      <Typography variant="h5">Cliente:</Typography>
      <Typography>
        Nombre: <strong>Héctor Urgilés</strong>
      </Typography>
      <Typography>
        Correo Electrónico: <strong>hurgiles@example.com</strong>
      </Typography>
      <Typography>
        Teléfono: <strong>0942052143</strong>
      </Typography>
      <Typography>
        Tipo de Identificación: <strong>Cédula</strong>
      </Typography>
      <Typography>
        Identificación Fiscal: <strong>123456789</strong>
      </Typography>

      <Typography variant="h5" style={{ marginTop: '1.5rem' }}>
        Vehículo:
      </Typography>
      <Typography>
        Marca: <strong>Toyota</strong>
      </Typography>
      <Typography>
        Modelo: <strong>Corolla</strong>
      </Typography>
      <Typography>
        Placa: <strong>GQN-932</strong>
      </Typography>
      <Typography>
        Nivel de Gasolina: <strong>50%</strong>
      </Typography>
      <Typography>
        Detalles: <strong>Pequeños GOLPES en el parachoques trasero</strong>
      </Typography>

      <Typography variant="h5" style={{ marginTop: '1.5rem' }}>
        Servicios Solicitados:
        </Typography>
      <ul>
        <li>Cambio de Aceite</li>
        <li>Revisión del Sistema Eléctrico</li>
      </ul>

      <Typography variant="h6" style={{ marginTop: '1.5rem' }}>
        Fecha y Hora Estimada de Entrega: {fechaEntrega.toLocaleString()}
      </Typography>

      <Button
        variant="contained"
        color="primary"
        style={{ marginTop: '1.5rem' }}
        component={Link}
        to="/"
      >
        Volver
      </Button>
    </Container>
  );
}

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Switch checked={darkMode} onChange={toggleDarkMode} />
      <Router>
        <Routes>
          <Route path="/" element={<ClienteForm />} />
          <Route path="/vehiculo" element={<VehiculoForm />} />
          <Route path="/exito" element={<OrdenTrabajo />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;