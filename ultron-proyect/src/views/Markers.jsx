import React, { useState, useEffect } from 'react';
import { Marker, Polyline } from 'react-leaflet';
import { IconLocation } from './IconLocation';
import axios from 'axios';
import { URL_API } from '../service/EndPoint';

export const Markers = (props) => {
  const { origen, destino } = props;
  const [apiKey, setApiKey] = useState('0F0eyIoqjep4wVwd7uLXp35JlOddUk3z');
  const [startLocation, setStartLocation] = useState(origen);
  const [endLocation, setEndLocation] = useState(destino);
  const [route, setRoute] = useState(null);

  useEffect(() => {
    axios
      .get(`${URL_API}key=${apiKey}&from=${startLocation}&to=${endLocation}`)
      .then((response) => {
        setRoute(response.data.route);
      })
      .catch((error) => {
        console.error('Error al obtener la ruta:', error);
      });
  }, [apiKey, startLocation, endLocation]);

  const showMarkers = route && route.legs && route.legs.length > 0 && route.legs[0].maneuvers;

  const polylinePoints = showMarkers
    ? route.legs[0].maneuvers.map((punto) => [punto.startPoint.lat, punto.startPoint.lng])
    : [];

  const markers = showMarkers
    ? route.legs[0].maneuvers.map((punto, index) => (
        <Marker
          key={index}
          position={{ lat: punto.startPoint.lat, lng: punto.startPoint.lng }}
          icon={IconLocation}
        />
      ))
    : null;

  return (
    <>
      {markers}
      {polylinePoints.length > 0 && (
        <Polyline positions={polylinePoints} color="blue" weight={3} />
      )}
    </>
  );
};
