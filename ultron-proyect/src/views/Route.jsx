import { Markers } from './Markers';
import Information from './Information';
import { MapContainer, TileLayer } from 'react-leaflet';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../asset/css/MapView.css'
import "leaflet/dist/leaflet.css"
import '../asset/css/Mapas.css';
import { useNavigate } from 'react-router-dom';


function Route() {
    const {origen,destino}=useParams();
    const navigate=useNavigate();
    console.log(origen)
    return <>
    <div className='titulos'>
        <div>
            <h1>Ultron LocationsX</h1>
        </div>
        <div className='boton'>
            <button className="btn btn-outline-secondary" 
                    type="button" 
                    id="button-addon2"
                    onClick={()=>navigate(`/`)}
            >Buscar Ruta
            </button>
        </div>
    </div>
    <div className='cuerpo'>
        <div className='informacion'>
            <div className='tituloInformacion'>
                <h2>Informacion</h2>
            </div>
            <div>
              <Information origen1={origen} destino2={destino}/>
            </div>
        </div>
        <div className='mapa'>
            <h2>Mapa</h2>
            <div className='verMapa'>
                <MapContainer 
                    center={{lat:'-17.405474',lng:'-66.147094'}}
                    //center={{lat:coordinates.latitude,lng:coordinates.longitude}}
                    zoom={14}
                    className='mapcontainer'
                >
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    >
                    </TileLayer>
                    <Markers origen={origen} destino={destino}/>
                </MapContainer>
            </div>
          </div>
        </div>  
    </>
}

export default Route;