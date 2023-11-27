import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {URL_API} from '../service/EndPoint';

const Information = (props) => {
  const { origen1, destino2 } = props;
  const [apiKey, setApiKey] = useState('0F0eyIoqjep4wVwd7uLXp35JlOddUk3z'); // Reemplaza con tu clave de API de MapQuest
  const [origen, setOrigen] = useState(origen1);
  const [destino, setDestino] = useState(destino2);
  const [route, setRoute] = useState(null);
  const [nombre,setNombre] = useState('');
  console.log(origen1)

  useEffect(() => {
    axios
      .get(`${URL_API}key=${apiKey}&from=${origen}&to=${destino}`)
      .then(response => {
        setRoute(response.data.route);
      })
      .catch(error => {
        console.error('Error al obtener la ruta:', error);
      });
      console.log(origen1.lat,origen1[1])
      axios
      .get(`https://www.mapquestapi.com/geocoding/v1/reverse?key=${apiKey}&location=${origen1}`)
      .then((response) => {
        const lugarNombre = response.data.results[0]?.locations[0]?.street;
        console.log(lugarNombre)
        setNombre(lugarNombre);
      });
  }, [apiKey, origen, destino]);

  return (
    <div>
      {route && (
        <div className='information'>
          <h2>Ruta de {nombre} a {destino}</h2>
          <p>Distancia: {route.distance} km</p>
          <p>Duración: {route.formattedTime}</p>
          {/* Mostrar coordenadas de cada punto en la ruta */}
          <h3>Nombres de las rutas en Movil:</h3>
          <ul>
            {route.legs[0].maneuvers.map((point, index) => (
              <li key={index}>{`Punto ${index + 1}: ${point.narrative}`}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Information;
