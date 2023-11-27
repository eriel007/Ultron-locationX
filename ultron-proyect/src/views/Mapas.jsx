import '../asset/css/Mapas.css';
import React, { useRef, useState ,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

function Mapas() {
  const [destino,setDestino]=useState('');
  const [origen,setOrigen]=useState([-17.405474,-66.147094]);
  //const [origen,setOrigen]=useState([-17.394746,-66.144903]);
  const [mostrar,setMostrar]=useState(false);
  const navigate = useNavigate();

  const [coordinates, setCoordinates] = useState({
    longitude: -17.405474,
    latitude: -66.147094,
  });
  const [coordinatesReady, setCoordinatesReady] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        setCoordinates({
          longitude: position.coords.longitude,
          latitude: position.coords.latitude,
        });
        setCoordinatesReady(true);
      },
      function (error) {
        console.log('Error al obtener las coordenadas:', error.message);
        setCoordinatesReady(true);
      },
      { enableHighAccuracy: true }
    );
  },[]);

  const handleInputChange = (event) => {
    setDestino(event.target.value);
  };
  console.log('Cordenadas Capturadas', coordinates.latitude, coordinates.longitude);
  console.log(destino)

  return (
    <>
      <div className='ventanaPadre'>
        <div className='titulos'>
          <h1>Ultron LocationsX</h1>
        </div>
        <div className='contenido'>
          <div className='contenidoTitulo'>
            <h2>Ingrese el destino</h2>
          </div>
          <div className="input-group mb-3" id='contenidoCuerpo'>
            <input
              type="text"
              className="form-control"
              placeholder="destino"
              aria-label="Recipient's username" aria-describedby="button-addon2"
              value={destino}
              onChange={handleInputChange}  
            />
            <button className="btn btn-outline-secondary" 
                    type="button" 
                    id="button-addon1"
                    onClick={()=>navigate(`/route/${origen}/${destino}`)}
            >Ejecutar</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Mapas;
